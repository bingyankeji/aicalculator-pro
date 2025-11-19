'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, RotateCcw, AlertTriangle, Wind } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

// Wind speed units to mph
const WIND_SPEED_UNITS = {
  'km/h': 0.621371,
  'mph': 1,
  'm/s': 2.23694,
  'knots': 1.15078,
};

// Temperature units
const TEMP_UNITS = ['Celsius °C', 'Fahrenheit °F'];

interface WindChillResult {
  windChill: number;
  windChillF: number;
  windChillC: number;
  riskLevel: string;
  riskColor: string;
  frostbiteTime: string;
  safetyAdvice: string[];
  valid: boolean;
  message?: string;
}

export default function WindChillCalculator() {
  const [windSpeed, setWindSpeed] = useState('15');
  const [windSpeedUnit, setWindSpeedUnit] = useState<keyof typeof WIND_SPEED_UNITS>('km/h');
  const [temperature, setTemperature] = useState('10');
  const [tempUnit, setTempUnit] = useState('Celsius °C');
  const [result, setResult] = useState<WindChillResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/wind-chill-calculator',
    getShareParams: () => ({
      ws: windSpeed,
      wsu: windSpeedUnit,
      t: temperature,
      tu: tempUnit,
    }),
    getShareText: () => {
      return result
        ? `Wind Chill: ${result.windChill.toFixed(1)}°${tempUnit === 'Celsius °C' ? 'C' : 'F'} (Risk: ${result.riskLevel})`
        : 'Calculate wind chill temperature with our Wind Chill Calculator';
    },
  });

  const calculateWindChill = () => {
    const ws = parseFloat(windSpeed);
    const temp = parseFloat(temperature);

    if (isNaN(ws) || isNaN(temp) || ws < 0 || temp === 0) {
      alert('Please enter valid numbers for wind speed and temperature.');
      return;
    }

    // Convert to imperial units (mph and °F) for calculation
    const windSpeedMph = ws * WIND_SPEED_UNITS[windSpeedUnit];
    const tempF = tempUnit === 'Celsius °C' ? (temp * 9 / 5) + 32 : temp;

    // Check if wind chill calculation is valid
    // Wind chill is only defined for temperatures at or below 50°F and wind speeds above 3 mph
    if (tempF > 50) {
      setResult({
        windChill: temp,
        windChillF: tempF,
        windChillC: tempUnit === 'Celsius °C' ? temp : (tempF - 32) * 5 / 9,
        riskLevel: 'Not Applicable',
        riskColor: 'gray',
        frostbiteTime: 'N/A',
        safetyAdvice: ['Temperature is too warm for wind chill to be a factor.', 'Wind chill only applies at temperatures at or below 50°F (10°C).'],
        valid: false,
        message: 'Wind chill is not applicable at this temperature.',
      });
      return;
    }

    if (windSpeedMph < 3) {
      setResult({
        windChill: temp,
        windChillF: tempF,
        windChillC: tempUnit === 'Celsius °C' ? temp : (tempF - 32) * 5 / 9,
        riskLevel: 'Not Applicable',
        riskColor: 'gray',
        frostbiteTime: 'N/A',
        safetyAdvice: ['Wind speed is too low for wind chill to be a factor.', 'Wind chill requires wind speeds of at least 3 mph.'],
        valid: false,
        message: 'Wind chill is not applicable at this wind speed.',
      });
      return;
    }

    // Calculate wind chill using the North American formula (2001)
    // WC = 35.74 + 0.6215T - 35.75(V^0.16) + 0.4275T(V^0.16)
    const windChillF = 35.74 + 
                       (0.6215 * tempF) - 
                       (35.75 * Math.pow(windSpeedMph, 0.16)) + 
                       (0.4275 * tempF * Math.pow(windSpeedMph, 0.16));
    
    const windChillC = (windChillF - 32) * 5 / 9;

    // Determine risk level and frostbite time
    let riskLevel = '';
    let riskColor = '';
    let frostbiteTime = '';
    let safetyAdvice: string[] = [];

    if (windChillF >= 32) {
      riskLevel = 'Low Risk';
      riskColor = 'green';
      frostbiteTime = 'Low risk of frostbite';
      safetyAdvice = [
        'Uncomfortable, but low risk of frostbite.',
        'Dress warmly for outdoor activities.',
        'Monitor for signs of discomfort.',
      ];
    } else if (windChillF >= 15) {
      riskLevel = 'Moderate Risk';
      riskColor = 'blue';
      frostbiteTime = '30 minutes or more';
      safetyAdvice = [
        'Frostbite possible on exposed skin in 30+ minutes.',
        'Wear insulated clothing, hat, and gloves.',
        'Limit time outdoors for vulnerable groups.',
      ];
    } else if (windChillF >= 0) {
      riskLevel = 'High Risk';
      riskColor = 'orange';
      frostbiteTime = '10 to 30 minutes';
      safetyAdvice = [
        'Frostbite can occur in 10-30 minutes on exposed skin.',
        'Dress in layers with windproof outer layer.',
        'Cover all exposed skin.',
        'Limit outdoor exposure time.',
      ];
    } else if (windChillF >= -20) {
      riskLevel = 'Very High Risk';
      riskColor: 'red';
      frostbiteTime = '5 to 10 minutes';
      safetyAdvice = [
        'Frostbite can occur in 5-10 minutes on exposed skin.',
        'Avoid outdoor activities if possible.',
        'If you must go outside, cover all skin completely.',
        'Frequently check for signs of frostbite.',
      ];
    } else {
      riskLevel = 'Extreme Danger';
      riskColor = 'purple';
      frostbiteTime = 'Less than 5 minutes';
      safetyAdvice = [
        'Frostbite can occur in less than 5 minutes!',
        'Avoid going outdoors.',
        'Extremely dangerous conditions.',
        'If outside is necessary, full face and body coverage required.',
        'Seek shelter immediately if experiencing numbness or pain.',
      ];
    }

    setResult({
      windChill: tempUnit === 'Celsius °C' ? windChillC : windChillF,
      windChillF,
      windChillC,
      riskLevel,
      riskColor,
      frostbiteTime,
      safetyAdvice,
      valid: true,
    });
  };

  const handleReset = () => {
    setWindSpeed('15');
    setWindSpeedUnit('km/h');
    setTemperature('10');
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
      link.download = `wind-chill-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Wind Chill Calculator Results</title>
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
      'green': 'bg-green-50 border-green-200',
      'blue': 'bg-blue-50 border-blue-200',
      'orange': 'bg-orange-50 border-orange-200',
      'red': 'bg-red-50 border-red-200',
      'purple': 'bg-purple-50 border-purple-200',
      'gray': 'bg-gray-50 border-gray-200',
    };
    return colors[color] || 'bg-gray-50 border-gray-200';
  };

  const getRiskTextColor = (color: string) => {
    const colors: { [key: string]: string } = {
      'green': 'text-green-700',
      'blue': 'text-blue-700',
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
                <Wind className="h-5 w-5" />
                Wind Chill Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                This calculator estimates the temperature felt by the body as a result of wind speed and actual air temperature. 
                The calculator works for air temperatures between -50°F and 50°F.
              </p>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Wind Speed: <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={windSpeed}
                    onChange={(e) => setWindSpeed(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="15"
                    step="0.1"
                  />
                  <select
                    value={windSpeedUnit}
                    onChange={(e) => setWindSpeedUnit(e.target.value as keyof typeof WIND_SPEED_UNITS)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(WIND_SPEED_UNITS).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Air Temperature: <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10"
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

              <div className="flex gap-3">
                <Button 
                  onClick={calculateWindChill}
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
                  <strong>Note:</strong> Wind chill is only defined for temperatures at or below 50°F (10°C) and wind speeds above 3 mph (4.8 km/h).
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
                {/* Wind Chill Result */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Wind Chill Temperature</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {result.valid ? (
                      <>
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6 text-center">
                          <p className="text-sm text-gray-600 mb-2">Feels Like:</p>
                          <p className="text-5xl font-bold text-blue-700 mb-2">
                            {result.windChill.toFixed(1)}°{tempUnit === 'Celsius °C' ? 'C' : 'F'}
                          </p>
                          <p className="text-sm text-gray-600">
                            ({tempUnit === 'Celsius °C' 
                              ? `${result.windChillF.toFixed(1)}°F` 
                              : `${result.windChillC.toFixed(1)}°C`})
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <p className="text-xs text-gray-600 mb-1">Actual Temperature:</p>
                            <p className="text-2xl font-bold text-gray-900">
                              {temperature}°{tempUnit === 'Celsius °C' ? 'C' : 'F'}
                            </p>
                          </div>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <p className="text-xs text-gray-600 mb-1">Wind Speed:</p>
                            <p className="text-2xl font-bold text-gray-900">
                              {windSpeed} {windSpeedUnit}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                        <p className="text-lg font-semibold text-gray-900 mb-2">{result.message}</p>
                        <p className="text-sm text-gray-600">
                          Actual Temperature: {temperature}°{tempUnit === 'Celsius °C' ? 'C' : 'F'}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Risk Assessment */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className={`${getRiskBgColor(result.riskColor)} border-2 rounded-lg p-6 mb-6`}>
                      <div className="flex items-center gap-3 mb-4">
                        {result.riskLevel !== 'Not Applicable' && result.riskLevel !== 'Low Risk' && (
                          <AlertTriangle className={`h-8 w-8 ${getRiskTextColor(result.riskColor)}`} />
                        )}
                        <div>
                          <p className="text-sm text-gray-600">Risk Level:</p>
                          <p className={`text-3xl font-bold ${getRiskTextColor(result.riskColor)}`}>
                            {result.riskLevel}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center py-2 border-t border-gray-200">
                          <span className="text-sm text-gray-700">Frostbite Time:</span>
                          <span className={`font-semibold ${getRiskTextColor(result.riskColor)}`}>
                            {result.frostbiteTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Safety Advice:</h4>
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

                {/* Wind Chill Chart Reference */}
                {result.valid && (
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">Understanding Wind Chill</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b">Risk Level</th>
                              <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b">Wind Chill Range</th>
                              <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b">Frostbite Time</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="px-3 py-2 text-green-700 font-medium">Low Risk</td>
                              <td className="px-3 py-2 text-gray-700">Above 32°F (0°C)</td>
                              <td className="px-3 py-2 text-gray-700">Low risk</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 text-blue-700 font-medium">Moderate Risk</td>
                              <td className="px-3 py-2 text-gray-700">15°F to 32°F (-9°C to 0°C)</td>
                              <td className="px-3 py-2 text-gray-700">30+ minutes</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 text-orange-700 font-medium">High Risk</td>
                              <td className="px-3 py-2 text-gray-700">0°F to 15°F (-18°C to -9°C)</td>
                              <td className="px-3 py-2 text-gray-700">10-30 minutes</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 text-red-700 font-medium">Very High Risk</td>
                              <td className="px-3 py-2 text-gray-700">-20°F to 0°F (-29°C to -18°C)</td>
                              <td className="px-3 py-2 text-gray-700">5-10 minutes</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 text-purple-700 font-medium">Extreme Danger</td>
                              <td className="px-3 py-2 text-gray-700">Below -20°F (-29°C)</td>
                              <td className="px-3 py-2 text-gray-700">&lt;5 minutes</td>
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
                  <div className="text-6xl mb-4">🌬️</div>
                  <p className="text-gray-500 text-lg mb-2">No results yet</p>
                  <p className="text-gray-400 text-sm">
                    Enter wind speed and air temperature to calculate wind chill
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
        calculatorName="Wind Chill Calculator"
      />
    </div>
  );
}

