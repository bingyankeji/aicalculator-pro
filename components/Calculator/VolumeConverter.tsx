'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Share2, Printer, Download, Droplet, ArrowRightLeft } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type VolumeUnit = 
  | 'liter' | 'milliliter' | 'cubicMeter'
  | 'gallon' | 'quart' | 'pint' | 'cup' | 'fluidOunce' | 'tablespoon' | 'teaspoon'
  | 'imperialGallon' | 'imperialPint'
  | 'cubicInch' | 'cubicFoot' | 'cubicYard';

interface VolumeConversion {
  [key: string]: number;
}

const volumeUnits: Record<VolumeUnit, { name: string; symbol: string; toML: number; category: string }> = {
  // Metric
  liter: { name: 'Liter', symbol: 'L', toML: 1000, category: 'Metric' },
  milliliter: { name: 'Milliliter', symbol: 'mL', toML: 1, category: 'Metric' },
  cubicMeter: { name: 'Cubic Meter', symbol: 'm³', toML: 1000000, category: 'Metric' },
  
  // US Liquid
  gallon: { name: 'Gallon (US)', symbol: 'gal', toML: 3785.41, category: 'US Liquid' },
  quart: { name: 'Quart (US)', symbol: 'qt', toML: 946.353, category: 'US Liquid' },
  pint: { name: 'Pint (US)', symbol: 'pt', toML: 473.176, category: 'US Liquid' },
  cup: { name: 'Cup (US)', symbol: 'cup', toML: 236.588, category: 'US Liquid' },
  fluidOunce: { name: 'Fluid Ounce (US)', symbol: 'fl oz', toML: 29.5735, category: 'US Liquid' },
  tablespoon: { name: 'Tablespoon (US)', symbol: 'tbsp', toML: 14.7868, category: 'US Liquid' },
  teaspoon: { name: 'Teaspoon (US)', symbol: 'tsp', toML: 4.92892, category: 'US Liquid' },
  
  // Imperial
  imperialGallon: { name: 'Gallon (UK)', symbol: 'gal (UK)', toML: 4546.09, category: 'Imperial' },
  imperialPint: { name: 'Pint (UK)', symbol: 'pt (UK)', toML: 568.261, category: 'Imperial' },
  
  // Cubic
  cubicInch: { name: 'Cubic Inch', symbol: 'in³', toML: 16.3871, category: 'Cubic' },
  cubicFoot: { name: 'Cubic Foot', symbol: 'ft³', toML: 28316.8, category: 'Cubic' },
  cubicYard: { name: 'Cubic Yard', symbol: 'yd³', toML: 764555, category: 'Cubic' },
};

export default function VolumeConverter() {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState<VolumeUnit>('liter');
  const [result, setResult] = useState<VolumeConversion | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/volume-converter',
    getShareParams: () => ({
      v: inputValue,
      u: inputUnit,
    }),
    getShareText: () => 
      result 
        ? `${inputValue} ${volumeUnits[inputUnit].symbol} = ${result.gallon?.toFixed(2)} gal = ${result.liter?.toFixed(2)} L`
        : 'Convert volumes instantly!',
  });

  const convertVolume = (value: number, from: VolumeUnit): VolumeConversion => {
    const mlValue = value * volumeUnits[from].toML;
    
    const conversion: VolumeConversion = {};
    Object.entries(volumeUnits).forEach(([key, unit]) => {
      conversion[key] = mlValue / unit.toML;
    });
    
    return conversion;
  };

  const handleConvert = () => {
    if (!inputValue || isNaN(parseFloat(inputValue))) {
      setResult(null);
      return;
    }

    const value = parseFloat(inputValue);
    const conversion = convertVolume(value, inputUnit);
    setResult(conversion);
  };

  const handleSwap = () => {
    // Swap between Liter and Gallon (most common)
    if (inputUnit === 'liter') {
      setInputUnit('gallon');
      if (result) {
        setInputValue(result.gallon.toFixed(4));
      }
    } else {
      setInputUnit('liter');
      if (result) {
        setInputValue(result.liter.toFixed(4));
      }
    }
  };

  const categories = ['All', 'Metric', 'US Liquid', 'Imperial', 'Cubic'];

  const getFilteredUnits = () => {
    if (selectedCategory === 'All') {
      return Object.entries(volumeUnits);
    }
    return Object.entries(volumeUnits).filter(([_, unit]) => unit.category === selectedCategory);
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
      link.download = `volume-conversion-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Volume Conversion</title>
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
                <Droplet className="h-5 w-5 text-blue-600" />
                Volume Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Input Value */}
              <div className="space-y-2">
                <Label htmlFor="volume" className="text-sm font-medium text-gray-700">
                  Volume Value
                </Label>
                <input
                  id="volume"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleConvert()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter volume"
                  step="any"
                />
              </div>

              {/* Unit Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">From Unit</Label>
                <select
                  value={inputUnit}
                  onChange={(e) => setInputUnit(e.target.value as VolumeUnit)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  {Object.entries(volumeUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleSwap}
                  variant="outline"
                  className="gap-2"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  Swap L ↔ Gal
                </Button>
              </div>

              {/* Convert Button */}
              <Button 
                onClick={handleConvert}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Droplet className="h-5 w-5 mr-2" />
                Convert Volume
              </Button>

              {/* Common Conversions */}
              <div className="pt-3 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Quick Reference</h3>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>1 L = 0.264 gal (US)</p>
                  <p>1 gal (US) = 3.785 L</p>
                  <p>1 cup = 236.6 mL</p>
                  <p>1 tbsp = 14.8 mL</p>
                  <p>1 tsp = 4.9 mL</p>
                </div>
              </div>
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
                    <Droplet className="h-5 w-5 text-blue-600" />
                    Conversion Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-6">
                    {/* Main Result */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-600 mb-2">Converting from {volumeUnits[inputUnit].name}</p>
                      <p className="text-4xl font-bold text-blue-700 mb-2">
                        {inputValue} {volumeUnits[inputUnit].symbol}
                      </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {categories.map((cat) => (
                        <Button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          variant={selectedCategory === cat ? 'default' : 'outline'}
                          size="sm"
                        >
                          {cat}
                        </Button>
                      ))}
                    </div>

                    {/* All Conversions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {getFilteredUnits().map(([key, unit]) => (
                        <div
                          key={key}
                          className={`border-2 rounded-lg p-3 ${
                            key === inputUnit
                              ? 'bg-green-50 border-green-500'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <p className="text-xs text-gray-600 mb-1">{unit.name}</p>
                          <p className="text-xl font-bold text-gray-900 break-all">
                            {result[key].toFixed(6).replace(/\.?0+$/, '')}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">{unit.symbol}</p>
                        </div>
                      ))}
                    </div>

                    {/* Common Kitchen Conversions */}
                    {(inputUnit === 'cup' || inputUnit === 'tablespoon' || inputUnit === 'teaspoon' || 
                      inputUnit === 'fluidOunce' || inputUnit === 'milliliter') && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Kitchen Measurements</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cups:</span>
                            <span className="font-semibold">{result.cup.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tablespoons:</span>
                            <span className="font-semibold">{result.tablespoon.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Teaspoons:</span>
                            <span className="font-semibold">{result.teaspoon.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Fluid Ounces:</span>
                            <span className="font-semibold">{result.fluidOunce.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Milliliters:</span>
                            <span className="font-semibold">{result.milliliter.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Liters:</span>
                            <span className="font-semibold">{result.liter.toFixed(4)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Comparison Table */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Common Comparisons</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300 text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="border border-gray-300 px-3 py-2 text-left">Unit</th>
                              <th className="border border-gray-300 px-3 py-2 text-right">Liters</th>
                              <th className="border border-gray-300 px-3 py-2 text-right">Gallons (US)</th>
                              <th className="border border-gray-300 px-3 py-2 text-right">Milliliters</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white">
                              <td className="border border-gray-300 px-3 py-2">1 Teaspoon</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">0.0049</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">0.0013</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">4.93</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-3 py-2">1 Tablespoon</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">0.0148</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">0.0039</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">14.79</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="border border-gray-300 px-3 py-2">1 Cup</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">0.237</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">0.0625</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">236.6</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-3 py-2">1 Pint</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">0.473</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">0.125</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">473.2</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="border border-gray-300 px-3 py-2">1 Quart</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">0.946</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">0.25</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">946.4</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-3 py-2">1 Gallon</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">3.785</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">1</td>
                              <td className="border border-gray-300 px-3 py-2 text-right">3785.4</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">💡 Volume Tips</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• 1 liter ≈ 4.2 cups (US)</li>
                        <li>• 1 gallon (US) = 128 fluid ounces</li>
                        <li>• 3 teaspoons = 1 tablespoon</li>
                        <li>• 16 tablespoons = 1 cup</li>
                        <li>• UK gallon is 20% larger than US gallon</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Droplet className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Enter a volume value to convert</p>
                <p className="text-gray-400 text-sm mt-2">Supports metric, US, imperial, and cubic units</p>
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
        calculatorName="Volume Converter"
      />
    </div>
  );
}

