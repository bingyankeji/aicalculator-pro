'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, RotateCcw, Ruler, ArrowLeftRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

// Measurement units
const UNITS = ['centimeters', 'inches'];

// Cup size progression
const CUP_SIZES = ['AA', 'A', 'B', 'C', 'D', 'DD/E', 'DDD/F', 'G', 'H', 'I', 'J', 'K'];

// Regions for converter
const REGIONS = ['US/CA', 'UK', 'EU', 'FR', 'AU', 'JP'];

// Band sizes for converter
const BAND_SIZES_US = [28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50];

type TabType = 'calculate' | 'convert';

interface BraSize {
  bandSize: number;
  cupSize: string;
  sizeUS: string;
  sizeUK: string;
  sizeEU: string;
  sizeFR: string;
  sizeAU: string;
  sizeJP: string;
  difference: number;
  sisterSizes: { smaller: string; larger: string }[];
}

export default function BraSizeCalculator() {
  const [activeTab, setActiveTab] = useState<TabType>('calculate');
  
  // Calculate tab state
  const [bustSize, setBustSize] = useState('98');
  const [bandSize, setBandSize] = useState('88');
  const [unit, setUnit] = useState('centimeters');
  
  // Convert tab state
  const [fromRegion, setFromRegion] = useState('US/CA');
  const [convertBandSize, setConvertBandSize] = useState('34');
  const [convertCupSize, setConvertCupSize] = useState('C');
  
  const [result, setResult] = useState<BraSize | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/bra-size-calculator',
    getShareParams: () => ({
      bust: bustSize,
      band: bandSize,
      unit: unit,
    }),
    getShareText: () => {
      return result
        ? `My Bra Size: ${result.sizeUS} (US), ${result.sizeUK} (UK), ${result.sizeEU} (EU)`
        : 'Calculate your perfect bra size with international size conversions';
    },
  });

  const calculateBraSize = () => {
    const bust = parseFloat(bustSize);
    const band = parseFloat(bandSize);

    if (isNaN(bust) || isNaN(band)) {
      alert('Please enter valid measurements.');
      return;
    }

    if (bust <= band) {
      alert('Bust size must be larger than band size. Please check your measurements.');
      return;
    }

    // Convert to inches for calculation
    let bustInches = unit === 'centimeters' ? bust / 2.54 : bust;
    let bandInches = unit === 'centimeters' ? band / 2.54 : band;

    // Round band size to nearest even number
    let roundedBandSize = Math.round(bandInches);
    if (roundedBandSize % 2 !== 0) {
      roundedBandSize += 1;
    }

    // Calculate cup size based on difference
    const difference = bustInches - roundedBandSize;
    
    let cupSize = 'AA';
    if (difference < 1) {
      cupSize = 'AA';
    } else if (difference < 2) {
      cupSize = 'A';
    } else if (difference < 3) {
      cupSize = 'B';
    } else if (difference < 4) {
      cupSize = 'C';
    } else if (difference < 5) {
      cupSize = 'D';
    } else if (difference < 6) {
      cupSize = 'DD/E';
    } else if (difference < 7) {
      cupSize = 'DDD/F';
    } else if (difference < 8) {
      cupSize = 'G';
    } else if (difference < 9) {
      cupSize = 'H';
    } else if (difference < 10) {
      cupSize = 'I';
    } else if (difference < 11) {
      cupSize = 'J';
    } else {
      cupSize = 'K';
    }

    // International size conversions
    const sizeUS = `${roundedBandSize}${cupSize}`;
    
    // UK sizing (same band, cup progression)
    const ukBand = roundedBandSize;
    const sizeUK = `${ukBand}${cupSize}`;
    
    // EU sizing (band size + 10-15cm)
    const euBand = Math.round(roundedBandSize * 2.54 + 10);
    const roundedEUBand = Math.round(euBand / 5) * 5; // Round to nearest 5
    const sizeEU = `${roundedEUBand}${cupSize}`;
    
    // FR sizing (band size + 15cm)
    const frBand = Math.round(roundedBandSize * 2.54 + 15);
    const roundedFRBand = Math.round(frBand / 5) * 5;
    const sizeFR = `${roundedFRBand}${cupSize}`;
    
    // AU sizing (same as US/UK)
    const sizeAU = sizeUS;
    
    // JP sizing (band in cm + 65)
    const jpBand = Math.round(roundedBandSize * 2.54) + 65;
    const sizeJP = `${jpBand}${cupSize}`;

    // Calculate sister sizes
    const cupIndex = CUP_SIZES.indexOf(cupSize);
    const sisterSizes: { smaller: string; larger: string }[] = [];
    
    // Smaller band, larger cup
    if (roundedBandSize > 30 && cupIndex < CUP_SIZES.length - 1) {
      sisterSizes.push({
        smaller: `${roundedBandSize - 2}${CUP_SIZES[cupIndex + 1]}`,
        larger: `${roundedBandSize + 2}${cupIndex > 0 ? CUP_SIZES[cupIndex - 1] : 'AA'}`,
      });
    }

    setResult({
      bandSize: roundedBandSize,
      cupSize,
      sizeUS,
      sizeUK,
      sizeEU,
      sizeFR,
      sizeAU,
      sizeJP,
      difference,
      sisterSizes,
    });
  };

  const convertBraSize = () => {
    const bandSizeNum = parseInt(convertBandSize);
    const cupSize = convertCupSize;

    // Create result object with conversions
    const sizeUS = `${bandSizeNum}${cupSize}`;
    const sizeUK = `${bandSizeNum}${cupSize}`;
    
    // EU sizing (band size + 10-15cm)
    const euBand = Math.round(bandSizeNum * 2.54 + 10);
    const roundedEUBand = Math.round(euBand / 5) * 5;
    const sizeEU = `${roundedEUBand}${cupSize}`;
    
    // FR sizing (band size + 15cm)
    const frBand = Math.round(bandSizeNum * 2.54 + 15);
    const roundedFRBand = Math.round(frBand / 5) * 5;
    const sizeFR = `${roundedFRBand}${cupSize}`;
    
    // AU sizing (same as US/UK)
    const sizeAU = sizeUS;
    
    // JP sizing (band in cm + 65)
    const jpBand = Math.round(bandSizeNum * 2.54) + 65;
    const sizeJP = `${jpBand}${cupSize}`;

    // Calculate sister sizes
    const cupIndex = CUP_SIZES.indexOf(cupSize);
    const sisterSizes: { smaller: string; larger: string }[] = [];
    
    if (bandSizeNum > 30 && cupIndex < CUP_SIZES.length - 1) {
      sisterSizes.push({
        smaller: `${bandSizeNum - 2}${CUP_SIZES[cupIndex + 1]}`,
        larger: `${bandSizeNum + 2}${cupIndex > 0 ? CUP_SIZES[cupIndex - 1] : 'AA'}`,
      });
    }

    setResult({
      bandSize: bandSizeNum,
      cupSize,
      sizeUS,
      sizeUK,
      sizeEU,
      sizeFR,
      sizeAU,
      sizeJP,
      difference: 0, // Not applicable for converter
      sisterSizes,
    });
  };

  const handleReset = () => {
    if (activeTab === 'calculate') {
      setBustSize('98');
      setBandSize('88');
      setUnit('centimeters');
    } else {
      setFromRegion('US/CA');
      setConvertBandSize('34');
      setConvertCupSize('C');
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
      link.download = `bra-size-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Bra Size Calculator Results</title>
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
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
              <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                <Ruler className="h-5 w-5" />
                Bra Size Calculator & Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* Tab Selection */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => {
                    setActiveTab('calculate');
                    setResult(null);
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    activeTab === 'calculate'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Calculator className="h-4 w-4" />
                    <span>Calculate from Measurements</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('convert');
                    setResult(null);
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    activeTab === 'convert'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <ArrowLeftRight className="h-4 w-4" />
                    <span>Convert Between Regions</span>
                  </div>
                </button>
              </div>
              {/* Calculate Tab Content */}
              {activeTab === 'calculate' && (
                <>
                  <p className="text-sm text-gray-600 mb-4">
                    Calculate your bra size from bust and band measurements. 
                    Measure to the nearest ¼ inch or ½ cm for accuracy.
                  </p>

                  <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Bust Size: <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={bustSize}
                    onChange={(e) => setBustSize(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="98"
                    step="0.5"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    {UNITS.map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-gray-500">
                  Measure around the fullest part of your bust
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Band Size: <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={bandSize}
                    onChange={(e) => setBandSize(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="88"
                    step="0.5"
                  />
                  <select
                    value={unit}
                    disabled
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  >
                    {UNITS.map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-gray-500">
                  Measure directly under your bust (underbust)
                </p>
              </div>

                  <div className="flex gap-3 pt-2">
                    <Button 
                      onClick={calculateBraSize}
                      className="flex-1 bg-pink-600 hover:bg-pink-700 gap-2"
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

                  <div className="bg-pink-50 border-l-4 border-pink-600 p-3 rounded-r-lg">
                    <p className="text-xs text-gray-700">
                      <strong>Measurement Tips:</strong> Measure while wearing a non-padded bra. 
                      Stand straight with arms at your sides. Use a soft measuring tape.
                    </p>
                  </div>
                </>
              )}

              {/* Convert Tab Content */}
              {activeTab === 'convert' && (
                <>
                  <p className="text-sm text-gray-600 mb-4">
                    Convert your existing bra size between different international sizing systems.
                  </p>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      From Region:
                    </Label>
                    <select
                      value={fromRegion}
                      onChange={(e) => setFromRegion(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      {REGIONS.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Band Size: <span className="text-red-500">*</span>
                    </Label>
                    <select
                      value={convertBandSize}
                      onChange={(e) => setConvertBandSize(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      {BAND_SIZES_US.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Cup Size: <span className="text-red-500">*</span>
                    </Label>
                    <select
                      value={convertCupSize}
                      onChange={(e) => setConvertCupSize(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      {CUP_SIZES.map(cup => (
                        <option key={cup} value={cup}>{cup}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button 
                      onClick={convertBraSize}
                      className="flex-1 bg-pink-600 hover:bg-pink-700 gap-2"
                    >
                      <ArrowLeftRight className="h-4 w-4" />
                      Convert
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

                  <div className="bg-purple-50 border-l-4 border-purple-600 p-3 rounded-r-lg">
                    <p className="text-xs text-gray-700">
                      <strong>Conversion Note:</strong> Sizing may vary between brands. 
                      These conversions are standard guidelines. Always try before buying.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Measurement Guide Visual - Only show in Calculate tab */}
          {activeTab === 'calculate' && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
                <CardTitle className="text-lg text-gray-900">How to Measure</CardTitle>
              </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-6">
                <svg viewBox="0 0 300 300" className="w-full max-w-xs mx-auto">
                  {/* Body outline */}
                  <path
                    d="M 150 50 Q 120 80 120 130 L 120 200 Q 120 220 130 230 L 150 250 L 170 230 Q 180 220 180 200 L 180 130 Q 180 80 150 50"
                    fill="#fef3f8"
                    stroke="#ec4899"
                    strokeWidth="2"
                  />
                  
                  {/* Bust line */}
                  <line x1="90" y1="130" x2="210" y2="130" stroke="#ec4899" strokeWidth="3" strokeDasharray="5,5"/>
                  <text x="220" y="135" fill="#ec4899" fontSize="14" fontWeight="bold">Bust Size</text>
                  
                  {/* Band line */}
                  <line x1="90" y1="170" x2="210" y2="170" stroke="#9333ea" strokeWidth="3" strokeDasharray="5,5"/>
                  <text x="220" y="175" fill="#9333ea" fontSize="14" fontWeight="bold">Band Size</text>
                  
                  {/* Measuring points */}
                  <circle cx="90" cy="130" r="4" fill="#ec4899"/>
                  <circle cx="210" cy="130" r="4" fill="#ec4899"/>
                  <circle cx="90" cy="170" r="4" fill="#9333ea"/>
                  <circle cx="210" cy="170" r="4" fill="#9333ea"/>
                </svg>
                
                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold">1.</span>
                    <span><strong className="text-pink-600">Bust Size:</strong> Measure around the fullest part of your bust while wearing a non-padded bra</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">2.</span>
                    <span><strong className="text-purple-600">Band Size:</strong> Measure snugly around your ribcage, directly under your bust</span>
                  </div>
                </div>
              </div>
            </CardContent>
            </Card>
          )}
        </div>

        {/* Results Section */}
        <div className="xl:col-span-3">
          <div ref={resultRef}>
            {result ? (
              <div className="space-y-6">
                {/* Your Bra Size */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
                    <CardTitle className="text-xl text-gray-900">Your Bra Size</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-lg p-8 text-center mb-6">
                      <p className="text-sm text-gray-600 mb-2">US Size:</p>
                      <p className="text-5xl font-bold text-pink-700 mb-4">
                        {result.sizeUS}
                      </p>
                      <div className="flex justify-center gap-4 text-sm text-gray-700">
                        <div>
                          <span className="font-semibold">Band:</span> {result.bandSize}"
                        </div>
                        <div>
                          <span className="font-semibold">Cup:</span> {result.cupSize}
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                      <p className="text-xs text-gray-700">
                        <strong>Note:</strong> This is an estimate. Bra sizing varies by brand and style. 
                        Try on bras to find your perfect fit. The band should be snug but comfortable, 
                        and the cups should fully contain your breasts without spillage or gaps.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* International Size Conversions */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
                    <CardTitle className="text-xl text-gray-900">International Size Conversions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Region</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Size</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">System</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr className="hover:bg-pink-50">
                            <td className="px-4 py-3 font-medium text-gray-900">United States (US)</td>
                            <td className="px-4 py-3 text-pink-700 font-bold">{result.sizeUS}</td>
                            <td className="px-4 py-3 text-gray-600">Inches</td>
                          </tr>
                          <tr className="hover:bg-pink-50">
                            <td className="px-4 py-3 font-medium text-gray-900">United Kingdom (UK)</td>
                            <td className="px-4 py-3 text-pink-700 font-bold">{result.sizeUK}</td>
                            <td className="px-4 py-3 text-gray-600">Inches</td>
                          </tr>
                          <tr className="hover:bg-pink-50">
                            <td className="px-4 py-3 font-medium text-gray-900">European Union (EU)</td>
                            <td className="px-4 py-3 text-pink-700 font-bold">{result.sizeEU}</td>
                            <td className="px-4 py-3 text-gray-600">Centimeters</td>
                          </tr>
                          <tr className="hover:bg-pink-50">
                            <td className="px-4 py-3 font-medium text-gray-900">France (FR)</td>
                            <td className="px-4 py-3 text-pink-700 font-bold">{result.sizeFR}</td>
                            <td className="px-4 py-3 text-gray-600">Centimeters</td>
                          </tr>
                          <tr className="hover:bg-pink-50">
                            <td className="px-4 py-3 font-medium text-gray-900">Australia (AU)</td>
                            <td className="px-4 py-3 text-pink-700 font-bold">{result.sizeAU}</td>
                            <td className="px-4 py-3 text-gray-600">Inches</td>
                          </tr>
                          <tr className="hover:bg-pink-50">
                            <td className="px-4 py-3 font-medium text-gray-900">Japan (JP)</td>
                            <td className="px-4 py-3 text-pink-700 font-bold">{result.sizeJP}</td>
                            <td className="px-4 py-3 text-gray-600">Centimeters</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Sister Sizes */}
                {result.sisterSizes.length > 0 && (
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
                      <CardTitle className="text-xl text-gray-900">Sister Sizes</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-sm text-gray-700 mb-4">
                        Sister sizes have the same cup volume but different band sizes. They can be useful alternatives 
                        if your calculated size is unavailable or uncomfortable.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Smaller Band, Larger Cup</h4>
                          <p className="text-2xl font-bold text-blue-700">{result.sisterSizes[0].smaller}</p>
                          <p className="text-xs text-gray-600 mt-2">Tighter band, more coverage</p>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Larger Band, Smaller Cup</h4>
                          <p className="text-2xl font-bold text-green-700">{result.sisterSizes[0].larger}</p>
                          <p className="text-xs text-gray-600 mt-2">Looser band, same volume</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Fit Guide */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
                    <CardTitle className="text-xl text-gray-900">Perfect Fit Checklist</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-700 text-xs font-bold">✓</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Band fits snugly</p>
                          <p className="text-sm text-gray-600">The band should be level around your body and fit snugly without riding up</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-700 text-xs font-bold">✓</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Cups contain breasts fully</p>
                          <p className="text-sm text-gray-600">No spillage over the top or sides, and no gaps between breast and cup</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-700 text-xs font-bold">✓</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Center gore lies flat</p>
                          <p className="text-sm text-gray-600">The center piece between cups should sit flat against your sternum</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-700 text-xs font-bold">✓</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Straps stay in place</p>
                          <p className="text-sm text-gray-600">Straps should not dig in or slip off your shoulders</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-700 text-xs font-bold">✓</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Comfortable movement</p>
                          <p className="text-sm text-gray-600">You should be able to move freely without discomfort or adjusting</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">👗</div>
                  <p className="text-gray-500 text-lg mb-2">No results yet</p>
                  <p className="text-gray-400 text-sm">
                    Enter your measurements to calculate your bra size
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
        calculatorName="Bra Size Calculator"
      />
    </div>
  );
}

