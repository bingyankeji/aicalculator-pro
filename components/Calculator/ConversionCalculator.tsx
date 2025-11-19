'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Share2, Printer, Download, ArrowRightLeft } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type ConversionCategory = 'length' | 'weight' | 'volume' | 'temperature' | 'area' | 'speed' | 'pressure' | 'energy';

interface ConversionUnit {
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

const conversionData: Record<ConversionCategory, { units: Record<string, ConversionUnit> }> = {
  length: {
    units: {
      meter: { name: 'Meter', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
      kilometer: { name: 'Kilometer', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      centimeter: { name: 'Centimeter', symbol: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      millimeter: { name: 'Millimeter', symbol: 'mm', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      mile: { name: 'Mile', symbol: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      yard: { name: 'Yard', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      foot: { name: 'Foot', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      inch: { name: 'Inch', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    },
  },
  weight: {
    units: {
      kilogram: { name: 'Kilogram', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
      gram: { name: 'Gram', symbol: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      milligram: { name: 'Milligram', symbol: 'mg', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      ton: { name: 'Metric Ton', symbol: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      pound: { name: 'Pound', symbol: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      ounce: { name: 'Ounce', symbol: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    },
  },
  volume: {
    units: {
      liter: { name: 'Liter', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
      milliliter: { name: 'Milliliter', symbol: 'mL', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      cubicMeter: { name: 'Cubic Meter', symbol: 'm³', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      gallon: { name: 'Gallon (US)', symbol: 'gal', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      quart: { name: 'Quart (US)', symbol: 'qt', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
      pint: { name: 'Pint (US)', symbol: 'pt', toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
      cup: { name: 'Cup (US)', symbol: 'cup', toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
      fluidOunce: { name: 'Fluid Ounce (US)', symbol: 'fl oz', toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
    },
  },
  temperature: {
    units: {
      celsius: { 
        name: 'Celsius', 
        symbol: '°C', 
        toBase: (v) => v, 
        fromBase: (v) => v 
      },
      fahrenheit: { 
        name: 'Fahrenheit', 
        symbol: '°F', 
        toBase: (v) => (v - 32) * 5/9, 
        fromBase: (v) => v * 9/5 + 32 
      },
      kelvin: { 
        name: 'Kelvin', 
        symbol: 'K', 
        toBase: (v) => v - 273.15, 
        fromBase: (v) => v + 273.15 
      },
    },
  },
  area: {
    units: {
      squareMeter: { name: 'Square Meter', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
      squareKilometer: { name: 'Square Kilometer', symbol: 'km²', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      squareFoot: { name: 'Square Foot', symbol: 'ft²', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      squareYard: { name: 'Square Yard', symbol: 'yd²', toBase: (v) => v * 0.836127, fromBase: (v) => v / 0.836127 },
      acre: { name: 'Acre', symbol: 'ac', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
      hectare: { name: 'Hectare', symbol: 'ha', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
    },
  },
  speed: {
    units: {
      meterPerSecond: { name: 'Meter/Second', symbol: 'm/s', toBase: (v) => v, fromBase: (v) => v },
      kilometerPerHour: { name: 'Kilometer/Hour', symbol: 'km/h', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      milePerHour: { name: 'Mile/Hour', symbol: 'mph', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      knot: { name: 'Knot', symbol: 'kn', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    },
  },
  pressure: {
    units: {
      pascal: { name: 'Pascal', symbol: 'Pa', toBase: (v) => v, fromBase: (v) => v },
      kilopascal: { name: 'Kilopascal', symbol: 'kPa', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      bar: { name: 'Bar', symbol: 'bar', toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
      psi: { name: 'PSI', symbol: 'psi', toBase: (v) => v * 6894.76, fromBase: (v) => v / 6894.76 },
      atmosphere: { name: 'Atmosphere', symbol: 'atm', toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
    },
  },
  energy: {
    units: {
      joule: { name: 'Joule', symbol: 'J', toBase: (v) => v, fromBase: (v) => v },
      kilojoule: { name: 'Kilojoule', symbol: 'kJ', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      calorie: { name: 'Calorie', symbol: 'cal', toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
      kilocalorie: { name: 'Kilocalorie', symbol: 'kcal', toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
      wattHour: { name: 'Watt-hour', symbol: 'Wh', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      kilowattHour: { name: 'Kilowatt-hour', symbol: 'kWh', toBase: (v) => v * 3600000, fromBase: (v) => v / 3600000 },
    },
  },
};

export default function ConversionCalculator() {
  const [category, setCategory] = useState<ConversionCategory>('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/conversion-calculator',
    getShareParams: () => ({
      c: category,
      f: fromUnit,
      t: toUnit,
      v: fromValue,
    }),
    getShareText: () => 
      toValue 
        ? `${fromValue} ${conversionData[category].units[fromUnit].symbol} = ${toValue} ${conversionData[category].units[toUnit].symbol}`
        : 'Convert units instantly!',
  });

  const handleCategoryChange = (newCategory: ConversionCategory) => {
    setCategory(newCategory);
    const units = Object.keys(conversionData[newCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setFromValue('');
    setToValue('');
  };

  const convert = (value: string, from: string, to: string) => {
    if (!value || isNaN(parseFloat(value))) {
      setToValue('');
      return;
    }

    const numValue = parseFloat(value);
    const fromUnitData = conversionData[category].units[from];
    const toUnitData = conversionData[category].units[to];

    const baseValue = fromUnitData.toBase(numValue);
    const result = toUnitData.fromBase(baseValue);

    setToValue(result.toFixed(6).replace(/\.?0+$/, ''));
  };

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    convert(value, fromUnit, toUnit);
  };

  const handleSwapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setFromValue(toValue);
    convert(toValue, toUnit, tempUnit);
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
      link.download = `conversion-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Conversion Results</title>
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

  const categoryLabels: Record<ConversionCategory, string> = {
    length: 'Length',
    weight: 'Weight',
    volume: 'Volume',
    temperature: 'Temperature',
    area: 'Area',
    speed: 'Speed',
    pressure: 'Pressure',
    energy: 'Energy',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                <ArrowRightLeft className="h-5 w-5 text-blue-600" />
                Unit Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Category Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Category</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(categoryLabels) as ConversionCategory[]).map((cat) => (
                    <Button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      variant={category === cat ? 'default' : 'outline'}
                      className="text-sm"
                    >
                      {categoryLabels[cat]}
                    </Button>
                  ))}
                </div>
              </div>

              {/* From Unit */}
              <div className="space-y-2">
                <Label htmlFor="fromValue" className="text-sm font-medium text-gray-700">From</Label>
                <div className="flex gap-2">
                  <input
                    id="fromValue"
                    type="number"
                    value={fromValue}
                    onChange={(e) => handleFromValueChange(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter value"
                    step="any"
                  />
                  <select
                    value={fromUnit}
                    onChange={(e) => {
                      setFromUnit(e.target.value);
                      convert(fromValue, e.target.value, toUnit);
                    }}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    {Object.entries(conversionData[category].units).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.symbol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleSwapUnits}
                  variant="outline"
                  className="gap-2"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  Swap
                </Button>
              </div>

              {/* To Unit */}
              <div className="space-y-2">
                <Label htmlFor="toValue" className="text-sm font-medium text-gray-700">To</Label>
                <div className="flex gap-2">
                  <input
                    id="toValue"
                    type="text"
                    value={toValue}
                    readOnly
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-semibold text-gray-900"
                    placeholder="Result"
                  />
                  <select
                    value={toUnit}
                    onChange={(e) => {
                      setToUnit(e.target.value);
                      convert(fromValue, fromUnit, e.target.value);
                    }}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    {Object.entries(conversionData[category].units).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.symbol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                  <ArrowRightLeft className="h-5 w-5 text-blue-600" />
                  Conversion Result
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {toValue ? (
                  <div className="space-y-6">
                    {/* Result Display */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-600 mb-2">Conversion Result:</p>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-700 break-all">
                        {fromValue} {conversionData[category].units[fromUnit].symbol} = {toValue} {conversionData[category].units[toUnit].symbol}
                      </p>
                    </div>

                    {/* Conversion Table */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        {fromValue} {conversionData[category].units[fromUnit].name} equals:
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(conversionData[category].units).map(([key, unit]) => {
                          const baseValue = conversionData[category].units[fromUnit].toBase(parseFloat(fromValue));
                          const convertedValue = unit.fromBase(baseValue);
                          return (
                            <div
                              key={key}
                              className={`flex justify-between items-center p-3 rounded-lg ${
                                key === toUnit ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50 border border-gray-200'
                              }`}
                            >
                              <span className="text-sm font-medium text-gray-700">{unit.name}</span>
                              <span className="text-sm font-bold text-gray-900">
                                {convertedValue.toFixed(6).replace(/\.?0+$/, '')} {unit.symbol}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ArrowRightLeft className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Enter a value to convert</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          {toValue && (
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
        calculatorName="Conversion Calculator"
      />
    </div>
  );
}

