'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Share2, Printer, Download, Shirt, Ruler } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface SizeConversion {
  US: string;
  UK: string;
  EU: string;
  CN: string;
  JP: string;
}

export default function DressSizeConverter() {
  const [clothingType, setClothingType] = useState<'women-tops' | 'women-bottoms' | 'men-tops' | 'men-bottoms'>('women-tops');
  const [sourceRegion, setSourceRegion] = useState<'US' | 'UK' | 'EU' | 'CN' | 'JP'>('US');
  const [sourceSize, setSourceSize] = useState('');
  const [result, setResult] = useState<SizeConversion | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/dress-size-converter',
    getShareParams: () => ({
      t: clothingType,
      r: sourceRegion,
      s: sourceSize,
    }),
    getShareText: () => 
      result 
        ? `Size Converter: ${sourceRegion} ${sourceSize}`
        : 'Convert clothing sizes between countries!',
  });

  // Size conversion tables
  const sizeCharts = {
    'women-tops': [
      { US: 'XS/0-2', UK: '4-6', EU: '32-34', CN: '155/80A', JP: '5-7' },
      { US: 'S/4-6', UK: '8-10', EU: '36-38', CN: '160/84A', JP: '9-11' },
      { US: 'M/8-10', UK: '12-14', EU: '40-42', CN: '165/88A', JP: '13-15' },
      { US: 'L/12-14', UK: '16-18', EU: '44-46', CN: '170/92A', JP: '17-19' },
      { US: 'XL/16-18', UK: '20-22', EU: '48-50', CN: '175/96A', JP: '21-23' },
      { US: 'XXL/20-22', UK: '24-26', EU: '52-54', CN: '180/100A', JP: '25-27' },
    ],
    'women-bottoms': [
      { US: '0-2', UK: '4-6', EU: '32-34', CN: '155/64A', JP: '5-7' },
      { US: '4-6', UK: '8-10', EU: '36-38', CN: '160/68A', JP: '9-11' },
      { US: '8-10', UK: '12-14', EU: '40-42', CN: '165/72A', JP: '13-15' },
      { US: '12-14', UK: '16-18', EU: '44-46', CN: '170/76A', JP: '17-19' },
      { US: '16-18', UK: '20-22', EU: '48-50', CN: '175/80A', JP: '21-23' },
      { US: '20-22', UK: '24-26', EU: '52-54', CN: '180/84A', JP: '25-27' },
    ],
    'men-tops': [
      { US: 'XS/34', UK: '34', EU: '44', CN: '165/88A', JP: 'S' },
      { US: 'S/36', UK: '36', EU: '46', CN: '170/92A', JP: 'M' },
      { US: 'M/38-40', UK: '38-40', EU: '48-50', CN: '175/96A', JP: 'L' },
      { US: 'L/42-44', UK: '42-44', EU: '52-54', CN: '180/100A', JP: 'LL' },
      { US: 'XL/46-48', UK: '46-48', EU: '56-58', CN: '185/104A', JP: '3L' },
      { US: 'XXL/50-52', UK: '50-52', EU: '60-62', CN: '190/108A', JP: '4L' },
    ],
    'men-bottoms': [
      { US: '28-29', UK: '28-29', EU: '38-39', CN: '70-72', JP: 'S' },
      { US: '30-31', UK: '30-31', EU: '40-41', CN: '74-76', JP: 'M' },
      { US: '32-33', UK: '32-33', EU: '42-43', CN: '78-80', JP: 'L' },
      { US: '34-36', UK: '34-36', EU: '44-46', CN: '82-86', JP: 'LL' },
      { US: '38-40', UK: '38-40', EU: '48-50', CN: '88-92', JP: '3L' },
      { US: '42-44', UK: '42-44', EU: '52-54', CN: '94-98', JP: '4L' },
    ],
  };

  const convertSize = () => {
    if (!sourceSize.trim()) {
      alert('Please enter a size to convert.');
      return;
    }

    const chart = sizeCharts[clothingType];
    const normalizedInput = sourceSize.trim().toUpperCase();

    // Find matching size
    const match = chart.find(row => {
      const regionSize = row[sourceRegion].toUpperCase();
      return regionSize === normalizedInput || 
             regionSize.includes(normalizedInput) ||
             normalizedInput.includes(regionSize.split('/')[0]);
    });

    if (match) {
      setResult(match);
    } else {
      alert('Size not found. Please check your input and try again.');
      setResult(null);
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
      link.download = `size-conversion-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Size Conversion Results</title>
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

  const clothingTypeLabels = {
    'women-tops': "Women's Tops/Dresses",
    'women-bottoms': "Women's Bottoms",
    'men-tops': "Men's Tops/Shirts",
    'men-bottoms': "Men's Bottoms/Pants",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                <Shirt className="h-5 w-5 text-blue-600" />
                Size Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Clothing Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Clothing Type</Label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(clothingTypeLabels).map(([key, label]) => (
                    <Button
                      key={key}
                      onClick={() => {
                        setClothingType(key as any);
                        setResult(null);
                      }}
                      variant={clothingType === key ? 'default' : 'outline'}
                      className="text-sm justify-start"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Source Region */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Your Size Region</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['US', 'UK', 'EU', 'CN', 'JP'].map(region => (
                    <Button
                      key={region}
                      onClick={() => setSourceRegion(region as any)}
                      variant={sourceRegion === region ? 'default' : 'outline'}
                      className="text-sm"
                    >
                      {region}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Source Size Input */}
              <div className="space-y-2">
                <Label htmlFor="sourceSize" className="text-sm font-medium text-gray-700">
                  Your Size <span className="text-red-500">*</span>
                </Label>
                <input
                  id="sourceSize"
                  type="text"
                  value={sourceSize}
                  onChange={(e) => setSourceSize(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={sourceRegion === 'US' ? 'e.g., S, M, 8-10' : sourceRegion === 'EU' ? 'e.g., 38, 40' : 'Enter your size'}
                />
                <p className="text-xs text-gray-500">
                  Enter your size in {sourceRegion} format
                </p>
              </div>

              <Button 
                onClick={convertSize}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Ruler className="h-5 w-5 mr-2" />
                Convert Size
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                  <Ruler className="h-5 w-5 text-blue-600" />
                  Size Conversions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Converted Sizes */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        {clothingTypeLabels[clothingType]} - Size Equivalents
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(result).map(([region, size]) => (
                          <div
                            key={region}
                            className={`rounded-lg p-4 ${
                              region === sourceRegion
                                ? 'bg-blue-50 border-2 border-blue-500'
                                : 'bg-gray-50 border border-gray-200'
                            }`}
                          >
                            <p className="text-xs text-gray-600 mb-1">{region}</p>
                            <p className="text-xl font-bold text-gray-900">{size}</p>
                            {region === sourceRegion && (
                              <p className="text-xs text-blue-600 font-semibold mt-1">Your Size</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Size Chart */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Complete Size Chart</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[500px] text-sm border-collapse">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="border border-gray-300 px-3 py-2 text-left">US</th>
                              <th className="border border-gray-300 px-3 py-2 text-left">UK</th>
                              <th className="border border-gray-300 px-3 py-2 text-left">EU</th>
                              <th className="border border-gray-300 px-3 py-2 text-left">CN</th>
                              <th className="border border-gray-300 px-3 py-2 text-left">JP</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizeCharts[clothingType].map((row, index) => (
                              <tr 
                                key={index}
                                className={
                                  row[sourceRegion] === result[sourceRegion]
                                    ? 'bg-blue-50 font-semibold'
                                    : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                }
                              >
                                <td className="border border-gray-300 px-3 py-2">{row.US}</td>
                                <td className="border border-gray-300 px-3 py-2">{row.UK}</td>
                                <td className="border border-gray-300 px-3 py-2">{row.EU}</td>
                                <td className="border border-gray-300 px-3 py-2">{row.CN}</td>
                                <td className="border border-gray-300 px-3 py-2">{row.JP}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Measurement Tips */}
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Measurement Tips:</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Measure yourself in the morning for most accurate results</li>
                        <li>• Use a soft measuring tape and keep it parallel to the floor</li>
                        <li>• Wear minimal clothing when measuring</li>
                        <li>• Sizes can vary between brands—always check brand-specific charts</li>
                        <li>• When between sizes, size up for a more comfortable fit</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Shirt className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Select clothing type and enter your size</p>
                  </div>
                )}
              </CardContent>
            </Card>
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

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Dress Size Converter"
      />
    </div>
  );
}

