'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, Ruler, Save } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface ShoeSizeData {
  us: number;
  uk: number;
  eu: number;
  cm: number;
  inches: number;
  jp: number;
  cn: number;
}

interface SavedSize {
  name: string;
  gender: string;
  us: number;
  uk: number;
  eu: number;
  cm: number;
}

// Comprehensive shoe size conversion data
const MEN_SIZES: ShoeSizeData[] = [
  { us: 6, uk: 5.5, eu: 39, cm: 24.1, inches: 9.5, jp: 24, cn: 39 },
  { us: 6.5, uk: 6, eu: 39.5, cm: 24.5, inches: 9.625, jp: 24.5, cn: 40 },
  { us: 7, uk: 6.5, eu: 40, cm: 24.8, inches: 9.75, jp: 25, cn: 40.5 },
  { us: 7.5, uk: 7, eu: 40.5, cm: 25.1, inches: 9.875, jp: 25.5, cn: 41 },
  { us: 8, uk: 7.5, eu: 41, cm: 25.4, inches: 10, jp: 26, cn: 42 },
  { us: 8.5, uk: 8, eu: 42, cm: 25.7, inches: 10.125, jp: 26.5, cn: 42.5 },
  { us: 9, uk: 8.5, eu: 42.5, cm: 26, inches: 10.25, jp: 27, cn: 43 },
  { us: 9.5, uk: 9, eu: 43, cm: 26.7, inches: 10.5, jp: 27.5, cn: 44 },
  { us: 10, uk: 9.5, eu: 44, cm: 27, inches: 10.625, jp: 28, cn: 44.5 },
  { us: 10.5, uk: 10, eu: 44.5, cm: 27.3, inches: 10.75, jp: 28.5, cn: 45 },
  { us: 11, uk: 10.5, eu: 45, cm: 27.9, inches: 11, jp: 29, cn: 46 },
  { us: 11.5, uk: 11, eu: 45.5, cm: 28.3, inches: 11.125, jp: 29.5, cn: 46.5 },
  { us: 12, uk: 11.5, eu: 46, cm: 28.6, inches: 11.25, jp: 30, cn: 47 },
  { us: 13, uk: 12.5, eu: 47.5, cm: 29.4, inches: 11.563, jp: 31, cn: 48 },
  { us: 14, uk: 13.5, eu: 49, cm: 30.2, inches: 11.875, jp: 32, cn: 49 },
  { us: 15, uk: 14.5, eu: 50, cm: 31, inches: 12.188, jp: 33, cn: 50 },
];

const WOMEN_SIZES: ShoeSizeData[] = [
  { us: 5, uk: 2.5, eu: 35, cm: 21.6, inches: 8.5, jp: 21.5, cn: 35 },
  { us: 5.5, uk: 3, eu: 35.5, cm: 22.2, inches: 8.75, jp: 22, cn: 35.5 },
  { us: 6, uk: 3.5, eu: 36, cm: 22.5, inches: 8.875, jp: 22.5, cn: 36 },
  { us: 6.5, uk: 4, eu: 37, cm: 23, inches: 9.0625, jp: 23, cn: 37 },
  { us: 7, uk: 4.5, eu: 37.5, cm: 23.5, inches: 9.25, jp: 23.5, cn: 37.5 },
  { us: 7.5, uk: 5, eu: 38, cm: 23.8, inches: 9.375, jp: 24, cn: 38 },
  { us: 8, uk: 5.5, eu: 38.5, cm: 24.1, inches: 9.5, jp: 24.5, cn: 39 },
  { us: 8.5, uk: 6, eu: 39, cm: 24.6, inches: 9.6875, jp: 25, cn: 39.5 },
  { us: 9, uk: 6.5, eu: 40, cm: 25.1, inches: 9.875, jp: 25.5, cn: 40 },
  { us: 9.5, uk: 7, eu: 40.5, cm: 25.4, inches: 10, jp: 26, cn: 41 },
  { us: 10, uk: 7.5, eu: 41, cm: 25.9, inches: 10.1875, jp: 26.5, cn: 41.5 },
  { us: 10.5, uk: 8, eu: 42, cm: 26.2, inches: 10.3125, jp: 27, cn: 42 },
  { us: 11, uk: 8.5, eu: 42.5, cm: 26.7, inches: 10.5, jp: 27.5, cn: 43 },
  { us: 12, uk: 9.5, eu: 43, cm: 27.6, inches: 10.875, jp: 28.5, cn: 44 },
];

const KIDS_SIZES: ShoeSizeData[] = [
  { us: 1, uk: 0.5, eu: 16, cm: 9.4, inches: 3.6875, jp: 9.5, cn: 16 },
  { us: 2, uk: 1.5, eu: 17, cm: 10.2, inches: 4, jp: 10.5, cn: 17 },
  { us: 3, uk: 2.5, eu: 18, cm: 11, inches: 4.3125, jp: 11.5, cn: 18 },
  { us: 4, uk: 3.5, eu: 19, cm: 11.7, inches: 4.625, jp: 12, cn: 19 },
  { us: 5, uk: 4.5, eu: 20, cm: 12.2, inches: 4.8125, jp: 12.5, cn: 20 },
  { us: 6, uk: 5.5, eu: 22, cm: 13.1, inches: 5.125, jp: 13.5, cn: 22 },
  { us: 7, uk: 6.5, eu: 23, cm: 14, inches: 5.5, jp: 14.5, cn: 23 },
  { us: 8, uk: 7, eu: 24, cm: 14.6, inches: 5.75, jp: 15, cn: 24 },
  { us: 9, uk: 8, eu: 25, cm: 15.2, inches: 6, jp: 15.5, cn: 25 },
  { us: 10, uk: 9, eu: 27, cm: 16.2, inches: 6.375, jp: 16.5, cn: 27 },
  { us: 11, uk: 10, eu: 28, cm: 17, inches: 6.6875, jp: 17.5, cn: 28 },
  { us: 12, uk: 11, eu: 30, cm: 18.1, inches: 7.125, jp: 18.5, cn: 30 },
  { us: 13, uk: 12, eu: 31, cm: 19, inches: 7.5, jp: 19.5, cn: 31 },
];

export default function ShoeSizeConverter() {
  const [gender, setGender] = useState<'men' | 'women' | 'kids'>('men');
  const [inputType, setInputType] = useState<'us' | 'uk' | 'eu' | 'cm' | 'cn' | 'jp'>('us');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<ShoeSizeData | null>(null);
  const [savedSizes, setSavedSizes] = useState<SavedSize[]>([]);
  const [saveName, setSaveName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  
  const resultRef = useRef<HTMLDivElement>(null);
  
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/shoe-size-conversion',
    getShareParams: () => ({
      g: gender,
      t: inputType,
      v: inputValue,
    }),
    getShareText: () => {
      if (result) {
        return `Shoe Size Conversion: US ${result.us} = EU ${result.eu} = UK ${result.uk} = ${result.cm} cm`;
      }
      return 'Convert shoe sizes between US, EU, UK, CN, JP standards!';
    },
  });

  // Load saved sizes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('shoeSizes');
    if (saved) {
      setSavedSizes(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (savedSizes.length > 0) {
      localStorage.setItem('shoeSizes', JSON.stringify(savedSizes));
    }
  }, [savedSizes]);

  const getSizeData = () => {
    switch (gender) {
      case 'men':
        return MEN_SIZES;
      case 'women':
        return WOMEN_SIZES;
      case 'kids':
        return KIDS_SIZES;
      default:
        return MEN_SIZES;
    }
  };

  const findClosestSize = (value: number, type: keyof ShoeSizeData): ShoeSizeData | null => {
    const data = getSizeData();
    
    // Find exact match or closest
    let closest = data[0];
    let minDiff = Math.abs(data[0][type] - value);
    
    for (const size of data) {
      const diff = Math.abs(size[type] - value);
      if (diff < minDiff) {
        minDiff = diff;
        closest = size;
      }
      if (diff === 0) break;
    }
    
    return minDiff < 2 ? closest : null;
  };

  const handleConvert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) {
      alert('Please enter a valid size value.');
      return;
    }

    const converted = findClosestSize(value, inputType);
    if (converted) {
      setResult(converted);
    } else {
      alert('Size not found. Please enter a value within the standard range.');
    }
  };

  const handleSaveSize = () => {
    if (!result) return;
    if (!saveName.trim()) {
      alert('Please enter a name for this size.');
      return;
    }

    const newSize: SavedSize = {
      name: saveName.trim(),
      gender,
      us: result.us,
      uk: result.uk,
      eu: result.eu,
      cm: result.cm,
    };

    setSavedSizes(prev => [...prev, newSize]);
    setSaveName('');
    setShowSaveDialog(false);
  };

  const handleDeleteSize = (index: number) => {
    if (confirm('Delete this saved size?')) {
      setSavedSizes(prev => prev.filter((_, i) => i !== index));
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
      link.download = `shoe-size-conversion-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Shoe Size Conversion</title>
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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Shoe Size Converter</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Gender/Category <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={() => setGender('men')}
                    className={gender === 'men' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  >
                    Men
                  </Button>
                  <Button
                    onClick={() => setGender('women')}
                    className={gender === 'women' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  >
                    Women
                  </Button>
                  <Button
                    onClick={() => setGender('kids')}
                    className={gender === 'kids' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  >
                    Kids
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Size Standard <span className="text-red-500">*</span>
                </Label>
                <select
                  value={inputType}
                  onChange={(e) => setInputType(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="us">US (United States)</option>
                  <option value="uk">UK (United Kingdom)</option>
                  <option value="eu">EU (European Union)</option>
                  <option value="cm">CM (Centimeters)</option>
                  <option value="cn">CN (China)</option>
                  <option value="jp">JP (Japan)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sizeInput" className="text-sm font-medium text-gray-700">
                  Your Size <span className="text-red-500">*</span>
                </Label>
                <input
                  id="sizeInput"
                  type="number"
                  step="0.5"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Enter ${inputType.toUpperCase()} size`}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Ruler className="h-4 w-4" />
                  How to Measure Your Foot
                </h4>
                <ol className="text-xs text-blue-900 space-y-1 ml-4 list-decimal">
                  <li>Stand on paper with heel against wall</li>
                  <li>Mark the longest toe position</li>
                  <li>Measure from wall to mark in cm</li>
                  <li>Add 0.5-1 cm for comfort space</li>
                  <li>Measure both feet, use larger size</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleConvert}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Convert Size
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6" ref={resultRef}>
          {result ? (
            <>
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">
                    Conversion Results ({gender === 'men' ? "Men's" : gender === 'women' ? "Women's" : "Kids'"} Sizes)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">US Size</p>
                      <p className="text-3xl font-bold text-blue-700">{result.us}</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">UK Size</p>
                      <p className="text-3xl font-bold text-gray-900">{result.uk}</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">EU Size</p>
                      <p className="text-3xl font-bold text-gray-900">{result.eu}</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Length (CM)</p>
                      <p className="text-3xl font-bold text-gray-900">{result.cm}</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">China (CN)</p>
                      <p className="text-3xl font-bold text-gray-900">{result.cn}</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Japan (JP)</p>
                      <p className="text-3xl font-bold text-gray-900">{result.jp}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      onClick={() => setShowSaveDialog(true)}
                      variant="outline"
                      className="w-full gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save This Size
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Size Tips */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Fitting Tips</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <p><strong>Try in afternoon:</strong> Feet swell during the day, measure when largest</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <p><strong>Wear proper socks:</strong> Measure with socks you will wear with the shoes</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <p><strong>Check width:</strong> Length is not everything—width matters for comfort</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <p><strong>Brand variations:</strong> Sizes can vary by brand—check specific brand charts</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <p><strong>Room for toes:</strong> Leave 0.5-1 cm space between longest toe and shoe end</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Select gender, enter your size, and click Convert to see results
                </p>
              </CardContent>
            </Card>
          )}

          {/* Save Size Dialog */}
          {showSaveDialog && (
            <Card className="shadow-lg border-2 border-blue-300">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg text-gray-900">Save This Size</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="saveName" className="text-sm font-medium">
                    Name (e.g., "My Size", "John", "Daughter")
                  </Label>
                  <input
                    id="saveName"
                    type="text"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter a name"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveSize} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Save
                  </Button>
                  <Button onClick={() => setShowSaveDialog(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Saved Sizes */}
      {savedSizes.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Saved Sizes ({savedSizes.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {savedSizes.map((size, index) => (
              <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{size.name}</h4>
                      <p className="text-xs text-gray-500 capitalize">{size.gender}</p>
                    </div>
                    <Button
                      onClick={() => handleDeleteSize(index)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      ×
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-600">US:</span>
                      <span className="font-semibold ml-1">{size.us}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">UK:</span>
                      <span className="font-semibold ml-1">{size.uk}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">EU:</span>
                      <span className="font-semibold ml-1">{size.eu}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">CM:</span>
                      <span className="font-semibold ml-1">{size.cm}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
        <Button 
          onClick={handleSaveAsImage} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Download className="h-4 w-4" />
          Save as Image
        </Button>
        
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
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
          Share Converter
        </Button>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Shoe Size Conversion"
      />
    </div>
  );
}

