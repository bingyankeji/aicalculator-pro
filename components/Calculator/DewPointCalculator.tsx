'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, RotateCcw, Droplets, Thermometer, Home } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

// Temperature units
const TEMP_UNITS = ['Celsius °C', 'Fahrenheit °F'];

interface DewPointResult {
  airTemp: number;
  humidity: number;
  dewPoint: number;
  airTempF: number;
  dewPointF: number;
  comfortLevel: string;
  comfortColor: string;
  comfortDescription: string;
  condensationRisk: string;
  condensationDescription: string;
  healthEffects: string[];
  recommendations: string[];
  perception: string;
}

export default function DewPointCalculator() {
  const [airTemp, setAirTemp] = useState('20');
  const [humidity, setHumidity] = useState('65');
  const [dewPoint, setDewPoint] = useState('');
  const [tempUnit, setTempUnit] = useState('Celsius °C');
  
  const [result, setResult] = useState<DewPointResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/dew-point-calculator',
    getShareParams: () => ({
      t: airTemp,
      h: humidity,
      d: dewPoint,
      u: tempUnit,
    }),
    getShareText: () => {
      return result
        ? `Dew Point: ${result.dewPoint.toFixed(1)}°${tempUnit === 'Celsius °C' ? 'C' : 'F'} (Comfort: ${result.comfortLevel})`
        : 'Calculate dew point temperature and assess comfort level';
    },
  });

  const calculateDewPoint = () => {
    const temp = parseFloat(airTemp);
    const rh = parseFloat(humidity);
    const dp = parseFloat(dewPoint);

    // Count how many values are provided
    const provided = [!isNaN(temp), !isNaN(rh) && rh >= 0 && rh <= 100, !isNaN(dp)].filter(Boolean).length;

    if (provided < 2) {
      alert('Please provide any two of the three variables (Air Temperature, Relative Humidity, or Dew Point Temperature).');
      return;
    }

    if (provided === 3) {
      alert('Please provide exactly two variables. Leave one field empty to calculate it.');
      return;
    }

    // Convert to Celsius for calculations
    const tempC = tempUnit === 'Celsius °C' ? temp : (temp - 32) * 5 / 9;
    const dpC = tempUnit === 'Celsius °C' ? dp : (dp - 32) * 5 / 9;

    let calculatedTempC: number;
    let calculatedHumidity: number;
    let calculatedDpC: number;

    // Case 1: Air temp and humidity provided, calculate dew point
    if (!isNaN(temp) && !isNaN(rh) && isNaN(dp)) {
      calculatedTempC = tempC;
      calculatedHumidity = rh;
      
      // Magnus formula for dew point
      const a = 17.27;
      const b = 237.7;
      const alpha = ((a * tempC) / (b + tempC)) + Math.log(rh / 100);
      calculatedDpC = (b * alpha) / (a - alpha);
    }
    // Case 2: Air temp and dew point provided, calculate humidity
    else if (!isNaN(temp) && isNaN(rh) && !isNaN(dp)) {
      if (dpC > tempC) {
        alert('Dew point cannot be higher than air temperature.');
        return;
      }
      
      calculatedTempC = tempC;
      calculatedDpC = dpC;
      
      // Magnus formula for relative humidity
      const a = 17.27;
      const b = 237.7;
      const numerator = Math.exp((a * dpC) / (b + dpC));
      const denominator = Math.exp((a * tempC) / (b + tempC));
      calculatedHumidity = 100 * (numerator / denominator);
    }
    // Case 3: Humidity and dew point provided, calculate air temp
    else if (isNaN(temp) && !isNaN(rh) && !isNaN(dp)) {
      calculatedDpC = dpC;
      calculatedHumidity = rh;
      
      // Magnus formula for air temperature
      const a = 17.27;
      const b = 237.7;
      const alpha = ((a * dpC) / (b + dpC)) - Math.log(rh / 100);
      calculatedTempC = (b * alpha) / (a - alpha);
    } else {
      alert('Invalid input combination.');
      return;
    }

    // Convert to Fahrenheit
    const calculatedTempF = (calculatedTempC * 9 / 5) + 32;
    const calculatedDpF = (calculatedDpC * 9 / 5) + 32;

    // Determine comfort level based on dew point
    let comfortLevel = '';
    let comfortColor = '';
    let comfortDescription = '';
    let perception = '';

    if (calculatedDpF < 50) {
      comfortLevel = 'Dry';
      comfortColor = 'blue';
      comfortDescription = 'Air feels very dry and comfortable';
      perception = 'Very comfortable, perhaps too dry for some';
    } else if (calculatedDpF < 55) {
      comfortLevel = 'Very Comfortable';
      comfortColor = 'green';
      comfortDescription = 'Most people find this very comfortable';
      perception = 'Pleasant and comfortable for most activities';
    } else if (calculatedDpF < 60) {
      comfortLevel = 'Comfortable';
      comfortColor = 'green';
      comfortDescription = 'Pleasant for most people';
      perception = 'Comfortable for indoor and outdoor activities';
    } else if (calculatedDpF < 65) {
      comfortLevel = 'Slightly Humid';
      comfortColor = 'yellow';
      comfortDescription = 'Slightly sticky feeling, still comfortable';
      perception = 'Slightly muggy but generally tolerable';
    } else if (calculatedDpF < 70) {
      comfortLevel = 'Humid';
      comfortColor = 'orange';
      comfortDescription = 'Noticeably humid and somewhat uncomfortable';
      perception = 'Becoming uncomfortable, sticky feeling';
    } else if (calculatedDpF < 75) {
      comfortLevel = 'Very Humid';
      comfortColor = 'red';
      comfortDescription = 'Very uncomfortable, oppressive feeling';
      perception = 'Quite uncomfortable, difficult outdoor activities';
    } else {
      comfortLevel = 'Extremely Humid';
      comfortColor = 'purple';
      comfortDescription = 'Extremely uncomfortable, tropical conditions';
      perception = 'Oppressive, dangerous for prolonged exposure';
    }

    // Condensation risk
    let condensationRisk = '';
    let condensationDescription = '';
    
    const tempDifference = calculatedTempC - calculatedDpC;
    
    if (tempDifference < 2) {
      condensationRisk = 'Very High Risk';
      condensationDescription = 'Condensation highly likely on cold surfaces. Windows, walls, and pipes will fog/drip.';
    } else if (tempDifference < 4) {
      condensationRisk = 'High Risk';
      condensationDescription = 'Condensation likely on cold surfaces like windows and poorly insulated walls.';
    } else if (tempDifference < 6) {
      condensationRisk = 'Moderate Risk';
      condensationDescription = 'Some condensation possible on very cold surfaces like single-pane windows.';
    } else if (tempDifference < 8) {
      condensationRisk = 'Low Risk';
      condensationDescription = 'Minimal condensation risk except on extremely cold surfaces.';
    } else {
      condensationRisk = 'Very Low Risk';
      condensationDescription = 'Condensation unlikely under normal conditions.';
    }

    // Health effects
    let healthEffects: string[] = [];
    let recommendations: string[] = [];

    if (calculatedDpF < 40) {
      healthEffects = [
        'Dry skin and irritated respiratory passages',
        'Increased static electricity',
        'Potential for dry eyes and throat',
      ];
      recommendations = [
        'Consider using a humidifier to add moisture',
        'Drink plenty of water to stay hydrated',
        'Use moisturizer for dry skin',
        'Ideal dew point range is 50-60°F for comfort',
      ];
    } else if (calculatedDpF < 60) {
      healthEffects = [
        'Optimal comfort level',
        'Reduced risk of mold and dust mites',
        'Good for respiratory health',
      ];
      recommendations = [
        'Maintain current humidity levels',
        'This is the ideal comfort range',
        'No special action needed',
      ];
    } else if (calculatedDpF < 70) {
      healthEffects = [
        'Slight discomfort and stickiness',
        'Increased perception of heat',
        'Mold growth becomes possible',
      ];
      recommendations = [
        'Consider using air conditioning or dehumidifier',
        'Ensure proper ventilation',
        'Monitor for mold in damp areas',
        'Increase air circulation with fans',
      ];
    } else {
      healthEffects = [
        'Significant discomfort and fatigue',
        'High mold and dust mite risk',
        'Worsens asthma and allergies',
        'Increased heat stress risk',
      ];
      recommendations = [
        'Use dehumidifier to reduce moisture',
        'Run air conditioning to lower humidity',
        'Check for and remediate mold growth',
        'Improve ventilation and air circulation',
        'Monitor indoor air quality closely',
        'Limit strenuous activity in these conditions',
      ];
    }

    setResult({
      airTemp: tempUnit === 'Celsius °C' ? calculatedTempC : calculatedTempF,
      humidity: calculatedHumidity,
      dewPoint: tempUnit === 'Celsius °C' ? calculatedDpC : calculatedDpF,
      airTempF: calculatedTempF,
      dewPointF: calculatedDpF,
      comfortLevel,
      comfortColor,
      comfortDescription,
      condensationRisk,
      condensationDescription,
      healthEffects,
      recommendations,
      perception,
    });
  };

  const handleReset = () => {
    setAirTemp('20');
    setHumidity('65');
    setDewPoint('');
    setTempUnit('Celsius °C');
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
      link.download = `dew-point-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Dew Point Calculator Results</title>
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

  const getComfortBgColor = (color: string) => {
    const colors: { [key: string]: string } = {
      'blue': 'bg-blue-50 border-blue-200',
      'green': 'bg-green-50 border-green-200',
      'yellow': 'bg-yellow-50 border-yellow-300',
      'orange': 'bg-orange-50 border-orange-300',
      'red': 'bg-red-50 border-red-300',
      'purple': 'bg-purple-50 border-purple-300',
    };
    return colors[color] || 'bg-gray-50 border-gray-200';
  };

  const getComfortTextColor = (color: string) => {
    const colors: { [key: string]: string } = {
      'blue': 'text-blue-700',
      'green': 'text-green-700',
      'yellow': 'text-yellow-700',
      'orange': 'text-orange-700',
      'red': 'text-red-700',
      'purple': 'text-purple-700',
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
                <Droplets className="h-5 w-5" />
                Dew Point Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                This calculator estimates the temperature to which air must be cooled to become saturated with water vapor and form dew.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded-r-lg mb-4">
                <p className="text-xs text-gray-700">
                  <strong>Please provide any two</strong> of the three variables below to calculate the third.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Air Temperature:
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={airTemp}
                    onChange={(e) => setAirTemp(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="20"
                    step="0.1"
                  />
                  <select
                    value={tempUnit}
                    onChange={(e) => setTempUnit(e.target.value)}
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
                  Relative Humidity:
                </Label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={humidity}
                    onChange={(e) => setHumidity(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="65"
                    min="0"
                    max="100"
                    step="1"
                  />
                  <span className="text-gray-700 font-medium">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Dew Point Temperature:
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={dewPoint}
                    onChange={(e) => setDewPoint(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Leave blank to calculate"
                    step="0.1"
                  />
                  <select
                    value={tempUnit}
                    disabled
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  >
                    {TEMP_UNITS.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  onClick={calculateDewPoint}
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
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-3">
          <div ref={resultRef}>
            {result ? (
              <div className="space-y-6">
                {/* Calculated Values */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Calculated Values</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Thermometer className="h-5 w-5 text-gray-600" />
                          <p className="text-xs text-gray-600">Air Temperature:</p>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {result.airTemp.toFixed(1)}°{tempUnit === 'Celsius °C' ? 'C' : 'F'}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Droplets className="h-5 w-5 text-gray-600" />
                          <p className="text-xs text-gray-600">Relative Humidity:</p>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {result.humidity.toFixed(1)}%
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Droplets className="h-5 w-5 text-blue-600" />
                          <p className="text-xs text-blue-600 font-semibold">Dew Point:</p>
                        </div>
                        <p className="text-2xl font-bold text-blue-700">
                          {result.dewPoint.toFixed(1)}°{tempUnit === 'Celsius °C' ? 'C' : 'F'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comfort Level */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Comfort Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className={`${getComfortBgColor(result.comfortColor)} border-2 rounded-lg p-6 mb-6`}>
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-600 mb-2">Comfort Level:</p>
                        <p className={`text-3xl font-bold ${getComfortTextColor(result.comfortColor)}`}>
                          {result.comfortLevel}
                        </p>
                        <p className="text-sm text-gray-700 mt-2">{result.comfortDescription}</p>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-gray-700">Perception:</span>
                          <span className={`font-semibold text-sm ${getComfortTextColor(result.comfortColor)}`}>
                            {result.perception}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        Condensation Risk:
                      </h4>
                      <p className="text-sm font-semibold text-gray-900 mb-2">{result.condensationRisk}</p>
                      <p className="text-sm text-gray-700">{result.condensationDescription}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Health & Recommendations */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Health Effects & Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Health Effects:</h4>
                      <ul className="space-y-2">
                        {result.healthEffects.map((effect, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-amber-600 mt-0.5">•</span>
                            <span>{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Recommendations:</h4>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Dew Point Reference Chart */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Dew Point Comfort Scale</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs sm:text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b">Dew Point Range</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b">Comfort Level</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-3 py-2 text-gray-700">Below 50°F (10°C)</td>
                            <td className="px-3 py-2 text-blue-700 font-medium">Dry</td>
                            <td className="px-3 py-2 text-gray-700">Very dry, comfortable</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 text-gray-700">50-60°F (10-16°C)</td>
                            <td className="px-3 py-2 text-green-700 font-medium">Comfortable</td>
                            <td className="px-3 py-2 text-gray-700">Ideal comfort range</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 text-gray-700">60-65°F (16-18°C)</td>
                            <td className="px-3 py-2 text-yellow-700 font-medium">Slightly Humid</td>
                            <td className="px-3 py-2 text-gray-700">Slightly sticky</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 text-gray-700">65-70°F (18-21°C)</td>
                            <td className="px-3 py-2 text-orange-700 font-medium">Humid</td>
                            <td className="px-3 py-2 text-gray-700">Uncomfortable, muggy</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 text-gray-700">70-75°F (21-24°C)</td>
                            <td className="px-3 py-2 text-red-700 font-medium">Very Humid</td>
                            <td className="px-3 py-2 text-gray-700">Very uncomfortable</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 text-gray-700">Above 75°F (24°C)</td>
                            <td className="px-3 py-2 text-purple-700 font-medium">Extremely Humid</td>
                            <td className="px-3 py-2 text-gray-700">Oppressive, tropical</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">💧</div>
                  <p className="text-gray-500 text-lg mb-2">No results yet</p>
                  <p className="text-gray-400 text-sm">
                    Provide any two values to calculate the third
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
        calculatorName="Dew Point Calculator"
      />
    </div>
  );
}

