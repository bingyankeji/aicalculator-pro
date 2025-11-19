'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Share2, Printer, Download, Thermometer, ArrowRightLeft } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin' | 'rankine';

interface TemperatureConversion {
  celsius: number;
  fahrenheit: number;
  kelvin: number;
  rankine: number;
}

const referenceTemperatures = [
  { name: 'Absolute Zero', celsius: -273.15, description: 'Lowest possible temperature' },
  { name: 'Freezing Point of Water', celsius: 0, description: 'Water turns to ice' },
  { name: 'Room Temperature', celsius: 20, description: 'Comfortable indoor temperature' },
  { name: 'Human Body Temperature', celsius: 37, description: 'Normal body temperature' },
  { name: 'Boiling Point of Water', celsius: 100, description: 'Water turns to steam' },
];

export default function TemperatureConverter() {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState<TemperatureUnit>('celsius');
  const [result, setResult] = useState<TemperatureConversion | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/temperature-converter',
    getShareParams: () => ({
      v: inputValue,
      u: inputUnit,
    }),
    getShareText: () => 
      result 
        ? `${inputValue}°${inputUnit[0].toUpperCase()} = ${result.fahrenheit.toFixed(1)}°F = ${result.celsius.toFixed(1)}°C`
        : 'Convert temperatures instantly!',
  });

  const convertTemperature = (value: number, from: TemperatureUnit): TemperatureConversion => {
    let celsius: number;

    // Convert input to Celsius first
    switch (from) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5 / 9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      case 'rankine':
        celsius = (value - 491.67) * 5 / 9;
        break;
    }

    // Convert Celsius to all other units
    return {
      celsius,
      fahrenheit: celsius * 9 / 5 + 32,
      kelvin: celsius + 273.15,
      rankine: (celsius + 273.15) * 9 / 5,
    };
  };

  const handleConvert = () => {
    if (!inputValue || isNaN(parseFloat(inputValue))) {
      setResult(null);
      return;
    }

    const value = parseFloat(inputValue);
    const conversion = convertTemperature(value, inputUnit);
    setResult(conversion);
  };

  const handleQuickConvert = (celsius: number) => {
    const conversion = convertTemperature(celsius, 'celsius');
    setResult(conversion);
    setInputValue(celsius.toString());
    setInputUnit('celsius');
  };

  const handleSwap = () => {
    // Swap between Celsius and Fahrenheit (most common)
    if (inputUnit === 'celsius') {
      setInputUnit('fahrenheit');
      if (result) {
        setInputValue(result.fahrenheit.toFixed(2));
      }
    } else {
      setInputUnit('celsius');
      if (result) {
        setInputValue(result.celsius.toFixed(2));
      }
    }
  };

  const getUnitSymbol = (unit: TemperatureUnit): string => {
    switch (unit) {
      case 'celsius': return '°C';
      case 'fahrenheit': return '°F';
      case 'kelvin': return 'K';
      case 'rankine': return '°R';
    }
  };

  const getUnitName = (unit: TemperatureUnit): string => {
    switch (unit) {
      case 'celsius': return 'Celsius';
      case 'fahrenheit': return 'Fahrenheit';
      case 'kelvin': return 'Kelvin';
      case 'rankine': return 'Rankine';
    }
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
      link.download = `temperature-conversion-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Temperature Conversion</title>
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                <Thermometer className="h-5 w-5 text-blue-600" />
                Temperature Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Input Value */}
              <div className="space-y-2">
                <Label htmlFor="temperature" className="text-sm font-medium text-gray-700">
                  Temperature Value
                </Label>
                <input
                  id="temperature"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleConvert()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter temperature"
                  step="any"
                />
              </div>

              {/* Unit Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">From Unit</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(['celsius', 'fahrenheit', 'kelvin', 'rankine'] as TemperatureUnit[]).map((unit) => (
                    <Button
                      key={unit}
                      onClick={() => setInputUnit(unit)}
                      variant={inputUnit === unit ? 'default' : 'outline'}
                      className="text-sm"
                    >
                      {getUnitName(unit)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleSwap}
                  variant="outline"
                  className="gap-2"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  Swap C ↔ F
                </Button>
              </div>

              {/* Convert Button */}
              <Button 
                onClick={handleConvert}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Thermometer className="h-5 w-5 mr-2" />
                Convert Temperature
              </Button>

              {/* Conversion Formulas */}
              <div className="pt-3 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Conversion Formulas</h3>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>°F = (°C × 9/5) + 32</p>
                  <p>°C = (°F - 32) × 5/9</p>
                  <p>K = °C + 273.15</p>
                  <p>°R = (°C + 273.15) × 9/5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reference Temperatures */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="text-lg text-gray-900">Quick Reference</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {referenceTemperatures.map((temp, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickConvert(temp.celsius)}
                  className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <p className="text-sm font-semibold text-gray-900">{temp.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{temp.description}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    {temp.celsius}°C = {(temp.celsius * 9/5 + 32).toFixed(1)}°F
                  </p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          {result ? (
            <div ref={resultRef}>
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                    <Thermometer className="h-5 w-5 text-blue-600" />
                    Conversion Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-6">
                    {/* Main Result */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-600 mb-2">Converting from {getUnitName(inputUnit)}</p>
                      <p className="text-4xl font-bold text-blue-700 mb-2">
                        {inputValue} {getUnitSymbol(inputUnit)}
                      </p>
                    </div>

                    {/* All Conversions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className={`border-2 rounded-lg p-4 ${inputUnit === 'celsius' ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-200'}`}>
                        <p className="text-xs text-gray-600 mb-1">Celsius</p>
                        <p className="text-3xl font-bold text-gray-900">{result.celsius.toFixed(2)}</p>
                        <p className="text-sm text-gray-600 mt-1">°C</p>
                      </div>

                      <div className={`border-2 rounded-lg p-4 ${inputUnit === 'fahrenheit' ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-200'}`}>
                        <p className="text-xs text-gray-600 mb-1">Fahrenheit</p>
                        <p className="text-3xl font-bold text-gray-900">{result.fahrenheit.toFixed(2)}</p>
                        <p className="text-sm text-gray-600 mt-1">°F</p>
                      </div>

                      <div className={`border-2 rounded-lg p-4 ${inputUnit === 'kelvin' ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-200'}`}>
                        <p className="text-xs text-gray-600 mb-1">Kelvin</p>
                        <p className="text-3xl font-bold text-gray-900">{result.kelvin.toFixed(2)}</p>
                        <p className="text-sm text-gray-600 mt-1">K</p>
                      </div>

                      <div className={`border-2 rounded-lg p-4 ${inputUnit === 'rankine' ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-200'}`}>
                        <p className="text-xs text-gray-600 mb-1">Rankine</p>
                        <p className="text-3xl font-bold text-gray-900">{result.rankine.toFixed(2)}</p>
                        <p className="text-sm text-gray-600 mt-1">°R</p>
                      </div>
                    </div>

                    {/* Temperature Context */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Temperature Context</h4>
                      <p className="text-sm text-gray-700">
                        {result.celsius < -200 && "Extremely cold - approaching absolute zero"}
                        {result.celsius >= -200 && result.celsius < -50 && "Extremely cold - Arctic conditions"}
                        {result.celsius >= -50 && result.celsius < 0 && "Very cold - below freezing"}
                        {result.celsius >= 0 && result.celsius < 10 && "Cold - refrigerator temperature"}
                        {result.celsius >= 10 && result.celsius < 20 && "Cool - comfortable for some"}
                        {result.celsius >= 20 && result.celsius < 30 && "Comfortable - room temperature"}
                        {result.celsius >= 30 && result.celsius < 40 && "Warm - summer weather"}
                        {result.celsius >= 40 && result.celsius < 60 && "Hot - very warm weather"}
                        {result.celsius >= 60 && result.celsius < 100 && "Very hot - approaching boiling"}
                        {result.celsius >= 100 && "Extremely hot - water boils at 100°C"}
                      </p>
                    </div>

                    {/* Comparison Table */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Common Comparisons</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300 text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="border border-gray-300 px-3 py-2 text-left">Reference</th>
                              <th className="border border-gray-300 px-3 py-2 text-right">°C</th>
                              <th className="border border-gray-300 px-3 py-2 text-right">°F</th>
                              <th className="border border-gray-300 px-3 py-2 text-right">K</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white">
                              <td className="border border-gray-300 px-3 py-2">Absolute Zero</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">-273.15</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">-459.67</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">0</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-3 py-2">Water Freezes</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">0</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">32</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">273.15</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="border border-gray-300 px-3 py-2">Room Temp</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">20</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">68</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">293.15</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-3 py-2">Body Temp</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">37</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">98.6</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">310.15</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="border border-gray-300 px-3 py-2">Water Boils</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">100</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">212</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">373.15</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">💡 Temperature Tips</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Celsius is used worldwide for everyday temperatures</li>
                        <li>• Fahrenheit is primarily used in the United States</li>
                        <li>• Kelvin is the SI unit used in scientific applications</li>
                        <li>• Rankine is rarely used, mainly in engineering</li>
                        <li>• 0 K (absolute zero) is the coldest possible temperature</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Thermometer className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Enter a temperature value to convert</p>
                <p className="text-gray-400 text-sm mt-2">Or click a reference temperature for quick conversion</p>
              </CardContent>
            </Card>
          )}

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

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Temperature Converter"
      />
    </div>
  );
}

