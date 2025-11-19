'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, RotateCcw, AlertTriangle, Thermometer, Droplets } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

// Temperature units
const TEMP_UNITS = ['Celsius °C', 'Fahrenheit °F'];

type CalculationMethod = 'humidity' | 'dewpoint';

interface HeatIndexResult {
  heatIndex: number;
  heatIndexF: number;
  heatIndexC: number;
  riskLevel: string;
  riskColor: string;
  symptoms: string[];
  safetyAdvice: string[];
  hydrationNeeds: string;
  valid: boolean;
  message?: string;
}

export default function HeatIndexCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('humidity');
  
  // Relative Humidity Method
  const [tempHumidity, setTempHumidity] = useState('30');
  const [humidity, setHumidity] = useState('70');
  const [tempUnitHumidity, setTempUnitHumidity] = useState('Celsius °C');
  
  // Dew Point Method
  const [tempDewpoint, setTempDewpoint] = useState('30');
  const [dewpoint, setDewpoint] = useState('22');
  const [tempUnitDewpoint, setTempUnitDewpoint] = useState('Celsius °C');
  const [dewpointUnit, setDewpointUnit] = useState('Celsius °C');
  
  const [result, setResult] = useState<HeatIndexResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/heat-index-calculator',
    getShareParams: () => {
      if (method === 'humidity') {
        return {
          m: 'h',
          t: tempHumidity,
          h: humidity,
          tu: tempUnitHumidity,
        };
      } else {
        return {
          m: 'd',
          t: tempDewpoint,
          d: dewpoint,
          tu: tempUnitDewpoint,
          du: dewpointUnit,
        };
      }
    },
    getShareText: () => {
      return result
        ? `Heat Index: ${result.heatIndex.toFixed(1)}°${method === 'humidity' ? (tempUnitHumidity === 'Celsius °C' ? 'C' : 'F') : (tempUnitDewpoint === 'Celsius °C' ? 'C' : 'F')} (Risk: ${result.riskLevel})`
        : 'Calculate heat index and assess heat-related health risks';
    },
  });

  const calculateHeatIndexFromHumidity = () => {
    const temp = parseFloat(tempHumidity);
    const rh = parseFloat(humidity);

    if (isNaN(temp) || isNaN(rh) || rh < 0 || rh > 100) {
      alert('Please enter valid temperature and humidity (0-100%).');
      return;
    }

    // Convert to Fahrenheit for calculation
    const tempF = tempUnitHumidity === 'Celsius °C' ? (temp * 9 / 5) + 32 : temp;

    // Heat index only applies above 80°F (27°C) and 40% humidity
    if (tempF < 80 || rh < 40) {
      setResult({
        heatIndex: temp,
        heatIndexF: tempF,
        heatIndexC: tempUnitHumidity === 'Celsius °C' ? temp : (tempF - 32) * 5 / 9,
        riskLevel: 'Not Applicable',
        riskColor: 'gray',
        symptoms: [],
        safetyAdvice: ['Heat index is not a concern at this temperature and humidity level.', 'Heat index calculations are most relevant above 80°F (27°C) with humidity above 40%.'],
        hydrationNeeds: 'Normal hydration recommended',
        valid: false,
        message: 'Heat index is not applicable at this temperature and humidity.',
      });
      return;
    }

    // Steadman's heat index formula (simplified Rothfusz regression)
    let hi = -42.379 + 
             2.04901523 * tempF + 
             10.14333127 * rh - 
             0.22475541 * tempF * rh - 
             6.83783e-3 * tempF * tempF - 
             5.481717e-2 * rh * rh + 
             1.22874e-3 * tempF * tempF * rh + 
             8.5282e-4 * tempF * rh * rh - 
             1.99e-6 * tempF * tempF * rh * rh;

    // Adjustments for low/high humidity
    if (rh < 13 && tempF >= 80 && tempF <= 112) {
      hi -= ((13 - rh) / 4) * Math.sqrt((17 - Math.abs(tempF - 95)) / 17);
    } else if (rh > 85 && tempF >= 80 && tempF <= 87) {
      hi += ((rh - 85) / 10) * ((87 - tempF) / 5);
    }

    const hiC = (hi - 32) * 5 / 9;

    processResult(hi, hiC, tempUnitHumidity === 'Celsius °C' ? temp : tempF);
  };

  const calculateHeatIndexFromDewpoint = () => {
    const temp = parseFloat(tempDewpoint);
    const dp = parseFloat(dewpoint);

    if (isNaN(temp) || isNaN(dp)) {
      alert('Please enter valid temperature and dew point.');
      return;
    }

    // Convert to Fahrenheit
    const tempF = tempUnitDewpoint === 'Celsius °C' ? (temp * 9 / 5) + 32 : temp;
    const dpF = dewpointUnit === 'Celsius °C' ? (dp * 9 / 5) + 32 : dp;

    // Calculate relative humidity from dew point
    // Using Magnus formula approximation
    const rh = 100 * Math.exp((17.625 * dpF / (243.04 + dpF)) - (17.625 * tempF / (243.04 + tempF)));

    if (tempF < 80 || rh < 40) {
      setResult({
        heatIndex: temp,
        heatIndexF: tempF,
        heatIndexC: tempUnitDewpoint === 'Celsius °C' ? temp : (tempF - 32) * 5 / 9,
        riskLevel: 'Not Applicable',
        riskColor: 'gray',
        symptoms: [],
        safetyAdvice: ['Heat index is not a concern at this temperature and dew point level.', 'Heat index calculations are most relevant above 80°F (27°C) with humidity above 40%.'],
        hydrationNeeds: 'Normal hydration recommended',
        valid: false,
        message: 'Heat index is not applicable at this temperature and dew point.',
      });
      return;
    }

    // Calculate heat index
    let hi = -42.379 + 
             2.04901523 * tempF + 
             10.14333127 * rh - 
             0.22475541 * tempF * rh - 
             6.83783e-3 * tempF * tempF - 
             5.481717e-2 * rh * rh + 
             1.22874e-3 * tempF * tempF * rh + 
             8.5282e-4 * tempF * rh * rh - 
             1.99e-6 * tempF * tempF * rh * rh;

    if (rh < 13 && tempF >= 80 && tempF <= 112) {
      hi -= ((13 - rh) / 4) * Math.sqrt((17 - Math.abs(tempF - 95)) / 17);
    } else if (rh > 85 && tempF >= 80 && tempF <= 87) {
      hi += ((rh - 85) / 10) * ((87 - tempF) / 5);
    }

    const hiC = (hi - 32) * 5 / 9;

    processResult(hi, hiC, tempF);
  };

  const processResult = (heatIndexF: number, heatIndexC: number, tempF: number) => {
    let riskLevel = '';
    let riskColor = '';
    let symptoms: string[] = [];
    let safetyAdvice: string[] = [];
    let hydrationNeeds = '';

    if (heatIndexF < 80) {
      riskLevel = 'Caution';
      riskColor = 'yellow';
      symptoms = ['Fatigue possible with prolonged exposure and physical activity'];
      safetyAdvice = [
        'Stay hydrated during outdoor activities.',
        'Take breaks in shade when exercising.',
      ];
      hydrationNeeds = '8-10 glasses of water per day';
    } else if (heatIndexF < 90) {
      riskLevel = 'Extreme Caution';
      riskColor = 'orange';
      symptoms = [
        'Heat cramps possible',
        'Heat exhaustion possible with prolonged exposure',
      ];
      safetyAdvice = [
        'Drink plenty of fluids.',
        'Limit outdoor activities during peak heat hours (10am-4pm).',
        'Wear light-colored, loose-fitting clothing.',
        'Take frequent rest breaks in shade or air-conditioned areas.',
      ];
      hydrationNeeds = '10-12 glasses of water per day';
    } else if (heatIndexF < 103) {
      riskLevel = 'Danger';
      riskColor = 'red';
      symptoms = [
        'Heat cramps likely',
        'Heat exhaustion likely',
        'Heat stroke possible with prolonged exposure',
      ];
      safetyAdvice = [
        'Minimize outdoor activity, especially midday.',
        'Stay in air-conditioned spaces when possible.',
        'Drink water every 15-20 minutes even if not thirsty.',
        'Wear sunscreen and protective clothing.',
        'Check on elderly neighbors and those without AC.',
        'Never leave children or pets in vehicles.',
      ];
      hydrationNeeds = '12-16 glasses of water per day';
    } else if (heatIndexF < 125) {
      riskLevel = 'Extreme Danger';
      riskColor = 'purple';
      symptoms = [
        'Heat stroke highly likely',
        'Heat exhaustion and cramps very likely',
        'Organ damage possible',
      ];
      safetyAdvice = [
        'Avoid all outdoor activities.',
        'Stay in air-conditioned buildings.',
        'Drink water constantly throughout the day.',
        'Monitor for signs of heat illness: confusion, rapid pulse, hot dry skin.',
        'Seek immediate medical attention if symptoms occur.',
        'High-risk groups should relocate to cooling centers.',
      ];
      hydrationNeeds = '16+ glasses of water per day';
    } else {
      riskLevel = 'Extreme Danger',
      riskColor = 'purple';
      symptoms = [
        'Heat stroke imminent',
        'Severe organ damage risk',
        'Life-threatening conditions',
      ];
      safetyAdvice = [
        'STAY INDOORS in air conditioning.',
        'DO NOT go outside.',
        'Life-threatening heat conditions.',
        'Drink water constantly.',
        'Monitor for any heat illness symptoms and seek immediate medical help.',
        'Check on vulnerable individuals frequently.',
      ];
      hydrationNeeds = '20+ glasses of water per day';
    }

    const currentTempUnit = method === 'humidity' ? tempUnitHumidity : tempUnitDewpoint;

    setResult({
      heatIndex: currentTempUnit === 'Celsius °C' ? heatIndexC : heatIndexF,
      heatIndexF,
      heatIndexC,
      riskLevel,
      riskColor,
      symptoms,
      safetyAdvice,
      hydrationNeeds,
      valid: true,
    });
  };

  const handleCalculate = () => {
    if (method === 'humidity') {
      calculateHeatIndexFromHumidity();
    } else {
      calculateHeatIndexFromDewpoint();
    }
  };

  const handleReset = () => {
    if (method === 'humidity') {
      setTempHumidity('30');
      setHumidity('70');
      setTempUnitHumidity('Celsius °C');
    } else {
      setTempDewpoint('30');
      setDewpoint('22');
      setTempUnitDewpoint('Celsius °C');
      setDewpointUnit('Celsius °C');
    }
    setResult(null);
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `heat-index-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Heat Index Calculator Results</title>
              <style>
                body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print {
                  body { padding: 0; }
                  img { max-width: 100%; page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" onload="window.print();"/>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
      alert('Failed to print. Please try again.');
    }
  };

  const getRiskBgColor = (color: string) => {
    const colors: { [key: string]: string } = {
      'yellow': 'bg-yellow-50 border-yellow-300',
      'orange': 'bg-orange-50 border-orange-300',
      'red': 'bg-red-50 border-red-300',
      'purple': 'bg-purple-50 border-purple-300',
      'gray': 'bg-gray-50 border-gray-200',
    };
    return colors[color] || 'bg-gray-50 border-gray-200';
  };

  const getRiskTextColor = (color: string) => {
    const colors: { [key: string]: string } = {
      'yellow': 'text-yellow-700',
      'orange': 'text-orange-700',
      'red': 'text-red-700',
      'purple': 'text-purple-700',
      'gray': 'text-gray-700',
    };
    return colors[color] || 'text-gray-700';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Heat Index Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                This calculator estimates the temperature felt by the body as a result of air temperature and relative humidity.
              </p>

              {/* Method Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Calculation Method:</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="method"
                      value="humidity"
                      checked={method === 'humidity'}
                      onChange={() => {
                        setMethod('humidity');
                        setResult(null);
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700 flex items-center gap-1">
                      <Droplets className="h-4 w-4" />
                      Use Relative Humidity
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="method"
                      value="dewpoint"
                      checked={method === 'dewpoint'}
                      onChange={() => {
                        setMethod('dewpoint');
                        setResult(null);
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700 flex items-center gap-1">
                      <Thermometer className="h-4 w-4" />
                      Use Dew Point Temperature
                    </span>
                  </label>
                </div>
              </div>

              {/* Relative Humidity Method */}
              {method === 'humidity' && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Air Temperature: <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={tempHumidity}
                        onChange={(e) => setTempHumidity(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="30"
                        step="0.1"
                      />
                      <select
                        value={tempUnitHumidity}
                        onChange={(e) => setTempUnitHumidity(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {TEMP_UNITS.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Relative Humidity: <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        value={humidity}
                        onChange={(e) => setHumidity(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="70"
                        min="0"
                        max="100"
                        step="1"
                      />
                      <span className="text-gray-700 font-medium">%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Dew Point Method */}
              {method === 'dewpoint' && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Air Temperature: <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={tempDewpoint}
                        onChange={(e) => setTempDewpoint(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="30"
                        step="0.1"
                      />
                      <select
                        value={tempUnitDewpoint}
                        onChange={(e) => setTempUnitDewpoint(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {TEMP_UNITS.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Dew Point Temperature: <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={dewpoint}
                        onChange={(e) => setDewpoint(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="22"
                        step="0.1"
                      />
                      <select
                        value={dewpointUnit}
                        onChange={(e) => setDewpointUnit(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {TEMP_UNITS.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button 
                  onClick={handleCalculate}
                  className="flex-1 bg-green-600 hover:bg-green-700 gap-2"
                >
                  <Calculator className="h-4 w-4" />
                  Calculate
                </Button>
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Clear
                </Button>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded-r-lg">
                <p className="text-xs text-gray-700">
                  <strong>Note:</strong> Heat index is most relevant above 80°F (27°C) with humidity above 40%.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-3">
          <div ref={resultRef}>
            {result ? (
              <div className="space-y-6">
                {/* Heat Index Result */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Heat Index</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {result.valid ? (
                      <>
                        <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6 mb-6 text-center">
                          <p className="text-sm text-gray-600 mb-2">Feels Like:</p>
                          <p className="text-5xl font-bold text-orange-700 mb-2">
                            {result.heatIndex.toFixed(1)}°{method === 'humidity' ? (tempUnitHumidity === 'Celsius °C' ? 'C' : 'F') : (tempUnitDewpoint === 'Celsius °C' ? 'C' : 'F')}
                          </p>
                          <p className="text-sm text-gray-600">
                            ({method === 'humidity' 
                              ? (tempUnitHumidity === 'Celsius °C' ? `${result.heatIndexF.toFixed(1)}°F` : `${result.heatIndexC.toFixed(1)}°C`)
                              : (tempUnitDewpoint === 'Celsius °C' ? `${result.heatIndexF.toFixed(1)}°F` : `${result.heatIndexC.toFixed(1)}°C`)
                            })
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <p className="text-xs text-gray-600 mb-1">Actual Temperature:</p>
                            <p className="text-2xl font-bold text-gray-900">
                              {method === 'humidity' ? tempHumidity : tempDewpoint}°{method === 'humidity' ? (tempUnitHumidity === 'Celsius °C' ? 'C' : 'F') : (tempUnitDewpoint === 'Celsius °C' ? 'C' : 'F')}
                            </p>
                          </div>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <p className="text-xs text-gray-600 mb-1">
                              {method === 'humidity' ? 'Relative Humidity:' : 'Dew Point:'}
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {method === 'humidity' ? `${humidity}%` : `${dewpoint}°${dewpointUnit === 'Celsius °C' ? 'C' : 'F'}`}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                        <p className="text-lg font-semibold text-gray-900 mb-2">{result.message}</p>
                        <p className="text-sm text-gray-600">
                          Actual Temperature: {method === 'humidity' ? tempHumidity : tempDewpoint}°{method === 'humidity' ? (tempUnitHumidity === 'Celsius °C' ? 'C' : 'F') : (tempUnitDewpoint === 'Celsius °C' ? 'C' : 'F')}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Risk Assessment */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Health Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className={`${getRiskBgColor(result.riskColor)} border-2 rounded-lg p-6 mb-6`}>
                      <div className="flex items-center gap-3 mb-4">
                        {result.valid && result.riskLevel !== 'Caution' && (
                          <AlertTriangle className={`h-8 w-8 ${getRiskTextColor(result.riskColor)}`} />
                        )}
                        <div>
                          <p className="text-sm text-gray-600">Risk Level:</p>
                          <p className={`text-3xl font-bold ${getRiskTextColor(result.riskColor)}`}>
                            {result.riskLevel}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-gray-700">Hydration Needs:</span>
                          <span className={`font-semibold ${getRiskTextColor(result.riskColor)}`}>
                            {result.hydrationNeeds}
                          </span>
                        </div>
                      </div>
                    </div>

                    {result.valid && result.symptoms.length > 0 && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Possible Symptoms:</h4>
                        <ul className="space-y-2">
                          {result.symptoms.map((symptom, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-orange-600 mt-0.5">•</span>
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Safety Recommendations:</h4>
                      <ul className="space-y-2">
                        {result.safetyAdvice.map((advice, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span>{advice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Heat Index Reference Chart */}
                {result.valid && (
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">Heat Index Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b">Category</th>
                              <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b">Heat Index Range</th>
                              <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b">Health Concerns</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="px-3 py-2 text-yellow-700 font-medium">Caution</td>
                              <td className="px-3 py-2 text-gray-700">80-90°F (27-32°C)</td>
                              <td className="px-3 py-2 text-gray-700">Fatigue possible</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 text-orange-700 font-medium">Extreme Caution</td>
                              <td className="px-3 py-2 text-gray-700">90-103°F (32-39°C)</td>
                              <td className="px-3 py-2 text-gray-700">Heat cramps & exhaustion possible</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 text-red-700 font-medium">Danger</td>
                              <td className="px-3 py-2 text-gray-700">103-125°F (39-52°C)</td>
                              <td className="px-3 py-2 text-gray-700">Heat stroke likely</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 text-purple-700 font-medium">Extreme Danger</td>
                              <td className="px-3 py-2 text-gray-700">Above 125°F (52°C)</td>
                              <td className="px-3 py-2 text-gray-700">Heat stroke imminent</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">☀️</div>
                  <p className="text-gray-500 text-lg mb-2">No results yet</p>
                  <p className="text-gray-400 text-sm">
                    Select a calculation method and enter values to calculate heat index
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          {result && (
            <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
              <Button 
                onClick={handleSaveAsImage} 
                variant="outline" 
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Save as Image
              </Button>
              
              <Button 
                onClick={handlePrint} 
                variant="outline" 
                className="gap-2"
              >
                <Printer className="h-4 w-4" />
                Print Results
              </Button>
              
              <Button 
                onClick={handleShare} 
                variant="outline" 
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Calculator
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Heat Index Calculator"
      />
    </div>
  );
}

