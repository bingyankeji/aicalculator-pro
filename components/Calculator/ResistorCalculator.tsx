'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, RotateCcw, Info } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface ColorBand {
  color: string;
  digit?: number;
  multiplier?: number;
  tolerance?: number;
  tempCoeff?: number;
  displayColor: string;
  multiplierText?: string;
  toleranceText?: string;
}

const COLORS: Record<string, ColorBand> = {
  black: { color: 'Black', digit: 0, multiplier: 1, displayColor: '#000000', multiplierText: '×1' },
  brown: { color: 'Brown', digit: 1, multiplier: 10, tolerance: 1, tempCoeff: 100, displayColor: '#8B4513', multiplierText: '×10', toleranceText: '±1% (F)' },
  red: { color: 'Red', digit: 2, multiplier: 100, tolerance: 2, tempCoeff: 50, displayColor: '#FF0000', multiplierText: '×100', toleranceText: '±2% (G)' },
  orange: { color: 'Orange', digit: 3, multiplier: 1000, tolerance: 0.05, tempCoeff: 15, displayColor: '#FFA500', multiplierText: '×1K', toleranceText: '±0.05% (W)' },
  yellow: { color: 'Yellow', digit: 4, multiplier: 10000, tolerance: 0.02, tempCoeff: 25, displayColor: '#FFFF00', multiplierText: '×10K', toleranceText: '±0.02% (P)' },
  green: { color: 'Green', digit: 5, multiplier: 100000, tolerance: 0.5, displayColor: '#008000', multiplierText: '×100K', toleranceText: '±0.5% (D)' },
  blue: { color: 'Blue', digit: 6, multiplier: 1000000, tolerance: 0.25, tempCoeff: 10, displayColor: '#0000FF', multiplierText: '×1M', toleranceText: '±0.25% (C)' },
  violet: { color: 'Violet', digit: 7, multiplier: 10000000, tolerance: 0.1, tempCoeff: 5, displayColor: '#9400D3', multiplierText: '×10M', toleranceText: '±0.1% (B)' },
  gray: { color: 'Gray', digit: 8, multiplier: 100000000, tolerance: 0.01, displayColor: '#808080', multiplierText: '×100M', toleranceText: '±0.01% (L)' },
  white: { color: 'White', digit: 9, multiplier: 1000000000, displayColor: '#FFFFFF', multiplierText: '×1G' },
  gold: { color: 'Gold', multiplier: 0.1, tolerance: 5, displayColor: '#FFD700', multiplierText: '×0.1', toleranceText: '±5% (J)' },
  silver: { color: 'Silver', multiplier: 0.01, tolerance: 10, displayColor: '#C0C0C0', multiplierText: '×0.01', toleranceText: '±10% (K)' },
  none: { color: 'None', tolerance: 20, displayColor: '#F3F4F6', toleranceText: '±20%' },
};

export default function ResistorCalculator() {
  const [bandCount, setBandCount] = useState<4 | 5 | 6>(4);
  const [band1, setBand1] = useState('brown');
  const [band2, setBand2] = useState('black');
  const [band3, setBand3] = useState('red');
  const [band4, setBand4] = useState('gold');
  const [band5, setBand5] = useState('brown');
  const [band6, setBand6] = useState('brown');
  
  // Series calculation
  const [seriesResistors, setSeriesResistors] = useState<number[]>([]);
  const [parallelResistors, setParallelResistors] = useState<number[]>([]);
  const [newSeriesValue, setNewSeriesValue] = useState('');
  const [newParallelValue, setNewParallelValue] = useState('');
  
  // Power calculation
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');

  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/resistor-calculator',
    getShareParams: () => ({
      bc: bandCount.toString(),
      b1: band1,
      b2: band2,
      b3: band3,
      b4: band4,
      ...(bandCount >= 5 && { b5: band5 }),
      ...(bandCount === 6 && { b6: band6 }),
    }),
    getShareText: () => {
      const resistance = calculateResistance();
      return `Resistor: ${formatResistance(resistance.value)} ±${resistance.tolerance}% - Calculate yours at`;
    },
  });

  const calculateResistance = () => {
    let value = 0;
    let tolerance = 20;
    let tempCoeff: number | null = null;

    if (bandCount === 4) {
      const digit1 = COLORS[band1].digit ?? 0;
      const digit2 = COLORS[band2].digit ?? 0;
      const multiplier = COLORS[band3].multiplier ?? 1;
      tolerance = COLORS[band4].tolerance ?? 20;
      value = (digit1 * 10 + digit2) * multiplier;
    } else if (bandCount === 5) {
      const digit1 = COLORS[band1].digit ?? 0;
      const digit2 = COLORS[band2].digit ?? 0;
      const digit3 = COLORS[band3].digit ?? 0;
      const multiplier = COLORS[band4].multiplier ?? 1;
      tolerance = COLORS[band5].tolerance ?? 20;
      value = (digit1 * 100 + digit2 * 10 + digit3) * multiplier;
    } else if (bandCount === 6) {
      const digit1 = COLORS[band1].digit ?? 0;
      const digit2 = COLORS[band2].digit ?? 0;
      const digit3 = COLORS[band3].digit ?? 0;
      const multiplier = COLORS[band4].multiplier ?? 1;
      tolerance = COLORS[band5].tolerance ?? 20;
      tempCoeff = COLORS[band6].tempCoeff ?? null;
      value = (digit1 * 100 + digit2 * 10 + digit3) * multiplier;
    }

    return { value, tolerance, tempCoeff };
  };

  const formatResistance = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)} MΩ`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} kΩ`;
    } else {
      return `${value.toFixed(2)} Ω`;
    }
  };

  const calculatePower = () => {
    const resistance = calculateResistance().value;
    const V = parseFloat(voltage);
    const I = parseFloat(current);

    if (V && resistance) {
      return {
        power: (V * V) / resistance,
        current: V / resistance,
      };
    } else if (I && resistance) {
      return {
        power: I * I * resistance,
        voltage: I * resistance,
      };
    }
    return null;
  };

  const calculateSeries = () => {
    return seriesResistors.reduce((sum, r) => sum + r, 0);
  };

  const calculateParallel = () => {
    if (parallelResistors.length === 0) return 0;
    const reciprocalSum = parallelResistors.reduce((sum, r) => sum + 1 / r, 0);
    return 1 / reciprocalSum;
  };

  const getColorOptions = (bandIndex: number) => {
    if (bandIndex <= 3) {
      // Digit bands - all colors except gold, silver, none
      return Object.entries(COLORS).filter(([key]) => 
        !['gold', 'silver', 'none'].includes(key)
      );
    } else if (bandIndex === 4 && bandCount === 4) {
      // Multiplier band for 4-band
      return Object.entries(COLORS).filter(([key]) => 
        !['none'].includes(key)
      );
    } else if (bandIndex === 4 && bandCount >= 5) {
      // Multiplier band for 5/6-band
      return Object.entries(COLORS).filter(([key]) => 
        !['none'].includes(key)
      );
    } else if (bandIndex === 5) {
      // Tolerance band
      return Object.entries(COLORS).filter(([key]) => 
        ['brown', 'red', 'gold', 'silver', 'green', 'blue', 'violet', 'gray', 'none'].includes(key)
      );
    } else if (bandIndex === 6) {
      // Temperature coefficient
      return Object.entries(COLORS).filter(([key]) => 
        ['brown', 'red', 'orange', 'yellow', 'blue', 'violet'].includes(key)
      );
    }
    return Object.entries(COLORS);
  };

  const findNearestStandardValue = (value: number, series: 'E12' | 'E24' | 'E96') => {
    const E12 = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
    const E24 = [10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, 43, 47, 51, 56, 62, 68, 75, 82, 91];
    const E96 = [100, 102, 105, 107, 110, 113, 115, 118, 121, 124, 127, 130, 133, 137, 140, 143, 147, 150, 154, 158, 162, 165, 169, 174, 178, 182, 187, 191, 196, 200, 205, 210, 215, 221, 226, 232, 237, 243, 249, 255, 261, 267, 274, 280, 287, 294, 301, 309, 316, 324, 332, 340, 348, 357, 365, 374, 383, 392, 402, 412, 422, 432, 442, 453, 464, 475, 487, 499, 511, 523, 536, 549, 562, 576, 590, 604, 619, 634, 649, 665, 681, 698, 715, 732, 750, 768, 787, 806, 825, 845, 866, 887, 909, 931, 953, 976];
    
    const seriesValues = series === 'E12' ? E12 : series === 'E24' ? E24 : E96.map(v => v / 10);
    
    // Determine the decade
    let decade = 1;
    let normalizedValue = value;
    while (normalizedValue >= 100) {
      normalizedValue /= 10;
      decade *= 10;
    }
    while (normalizedValue < 10) {
      normalizedValue *= 10;
      decade /= 10;
    }
    
    // Find nearest value
    const nearest = seriesValues.reduce((prev, curr) => 
      Math.abs(curr - normalizedValue) < Math.abs(prev - normalizedValue) ? curr : prev
    );
    
    return nearest * decade;
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
      link.download = `resistor-calculator-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Resistor Calculator Results</title>
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

  const handleReset = () => {
    setBandCount(4);
    setBand1('brown');
    setBand2('black');
    setBand3('red');
    setBand4('gold');
    setBand5('brown');
    setBand6('brown');
    setSeriesResistors([]);
    setParallelResistors([]);
    setNewSeriesValue('');
    setNewParallelValue('');
    setVoltage('');
    setCurrent('');
  };

  const resistance = calculateResistance();
  const powerCalc = calculatePower();

  // Helper to render color radio button
  const ColorRadioButton = ({ 
    color, 
    colorKey, 
    isSelected, 
    onChange, 
    showDigit = false 
  }: { 
    color: ColorBand; 
    colorKey: string; 
    isSelected: boolean; 
    onChange: () => void;
    showDigit?: boolean;
  }) => (
    <label className={`
      flex items-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition-all
      ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}
    `}>
      <input 
        type="radio" 
        checked={isSelected} 
        onChange={onChange}
        className="w-4 h-4 text-blue-600"
      />
      <div 
        className="w-8 h-8 rounded border-2 border-gray-400" 
        style={{ backgroundColor: color.displayColor }}
      />
      <span className="text-sm font-medium text-gray-900">{color.color}</span>
      {showDigit && color.digit !== undefined && (
        <span className="text-xs text-gray-500 ml-auto">({color.digit})</span>
      )}
    </label>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* Result at Top */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Result</p>
                <p className="text-4xl font-bold text-blue-700">
                  {formatResistance(resistance.value)}
                </p>
                <p className="text-lg text-gray-700 mt-2">
                  ±{resistance.tolerance}% {COLORS[bandCount === 4 ? band4 : band5].toleranceText && 
                    `(${COLORS[bandCount === 4 ? band4 : band5].toleranceText?.match(/\(([^)]+)\)/)?.[1] || ''})`}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Visual Resistor Display */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-center py-4">
                <div className="relative">
                  {/* Resistor body */}
                  <div className="w-64 h-24 bg-gradient-to-b from-amber-100 to-amber-200 rounded-xl border-2 border-gray-400 relative shadow-md">
                    {/* Color bands */}
                    <div className="absolute inset-0 flex items-center justify-around px-4">
                      <div 
                        className="w-7 h-full rounded-sm border-2 border-gray-600"
                        style={{ backgroundColor: COLORS[band1].displayColor }}
                      />
                      <div 
                        className="w-7 h-full rounded-sm border-2 border-gray-600"
                        style={{ backgroundColor: COLORS[band2].displayColor }}
                      />
                      <div 
                        className="w-7 h-full rounded-sm border-2 border-gray-600"
                        style={{ backgroundColor: COLORS[band3].displayColor }}
                      />
                      <div 
                        className="w-7 h-full rounded-sm border-2 border-gray-600"
                        style={{ backgroundColor: COLORS[band4].displayColor }}
                      />
                      {bandCount >= 5 && (
                        <div 
                          className="w-7 h-full rounded-sm border-2 border-gray-600"
                          style={{ backgroundColor: COLORS[band5].displayColor }}
                        />
                      )}
                      {bandCount === 6 && (
                        <div 
                          className="w-7 h-full rounded-sm border-2 border-gray-600"
                          style={{ backgroundColor: COLORS[band6].displayColor }}
                        />
                      )}
                    </div>
                    {/* Leads */}
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-10 h-1.5 bg-gray-500 rounded-l" />
                    <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-10 h-1.5 bg-gray-500 rounded-r" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Band Count Selection */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">Number of Bands</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <select
                value={bandCount}
                onChange={(e) => setBandCount(Number(e.target.value) as 4 | 5 | 6)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
              >
                <option value={4}>4 Band</option>
                <option value={5}>5 Band</option>
                <option value={6}>6 Band</option>
              </select>
            </CardContent>
          </Card>

          {/* Color Band Selection with Radio Buttons */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">Color Bands Selection</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-5">
              {/* Band 1 */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 border-b pb-1 block">
                  1st Band Color (First Digit)
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {getColorOptions(1).map(([key, color]) => (
                    <ColorRadioButton
                      key={key}
                      color={color}
                      colorKey={key}
                      isSelected={band1 === key}
                      onChange={() => setBand1(key)}
                      showDigit={true}
                    />
                  ))}
                </div>
              </div>

              {/* Band 2 */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 border-b pb-1 block">
                  2nd Band Color (Second Digit)
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {getColorOptions(2).map(([key, color]) => (
                    <ColorRadioButton
                      key={key}
                      color={color}
                      colorKey={key}
                      isSelected={band2 === key}
                      onChange={() => setBand2(key)}
                      showDigit={true}
                    />
                  ))}
                </div>
              </div>

              {/* Band 3 */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 border-b pb-1 block">
                  {bandCount === 4 ? 'Multiplier Color' : '3rd Band Color (Third Digit)'}
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {getColorOptions(bandCount === 4 ? 4 : 3).map(([key, color]) => (
                    <ColorRadioButton
                      key={key}
                      color={color}
                      colorKey={key}
                      isSelected={band3 === key}
                      onChange={() => setBand3(key)}
                      showDigit={bandCount !== 4}
                    />
                  ))}
                </div>
              </div>

              {/* Band 4 */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 border-b pb-1 block">
                  {bandCount === 4 ? 'Tolerance Color' : 'Multiplier Color'}
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {getColorOptions(bandCount === 4 ? 5 : 4).map(([key, color]) => (
                    <ColorRadioButton
                      key={key}
                      color={color}
                      colorKey={key}
                      isSelected={band4 === key}
                      onChange={() => setBand4(key)}
                    />
                  ))}
                </div>
              </div>

              {/* Band 5 (for 5 and 6 band resistors) */}
              {bandCount >= 5 && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700 border-b pb-1 block">
                    Tolerance Color
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {getColorOptions(5).map(([key, color]) => (
                      <ColorRadioButton
                        key={key}
                        color={color}
                        colorKey={key}
                        isSelected={band5 === key}
                        onChange={() => setBand5(key)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Band 6 (for 6 band resistors) */}
              {bandCount === 6 && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700 border-b pb-1 block">
                    Temperature Coefficient
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {getColorOptions(6).map(([key, color]) => (
                      <ColorRadioButton
                        key={key}
                        color={color}
                        colorKey={key}
                        isSelected={band6 === key}
                        onChange={() => setBand6(key)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Calculate & Reset Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={() => {/* Real-time calculation, this is just visual */}}
              className="flex-1 bg-green-600 hover:bg-green-700 gap-2 py-6 text-lg"
            >
              <Calculator className="h-5 w-5" />
              Calculate
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="gap-2 py-6"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-3 space-y-6">
          <div ref={resultRef}>
            {/* Color Code Reference Table */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Color Code Reference</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border-b-2 border-gray-300">
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Color</th>
                        <th className="px-4 py-2 text-center font-semibold text-gray-700">1st & 2nd Band<br/>Significant Figures</th>
                        <th className="px-4 py-2 text-center font-semibold text-gray-700">Multiplier</th>
                        <th className="px-4 py-2 text-center font-semibold text-gray-700">Tolerance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(COLORS).filter(([key]) => key !== 'none').map(([key, color]) => (
                        <tr key={key} className="hover:bg-gray-50">
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-6 h-6 rounded border-2 border-gray-400" 
                                style={{ backgroundColor: color.displayColor }}
                              />
                              <span className="font-medium">{color.color}</span>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-center">
                            {color.digit !== undefined ? (
                              <span className="font-semibold text-blue-600">{color.digit}</span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {color.multiplierText ? (
                              <span className="font-semibold text-orange-600">{color.multiplierText}</span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {color.toleranceText ? (
                              <span className="font-semibold text-green-600">{color.toleranceText}</span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded border-2 border-gray-400 bg-white" />
                            <span className="font-medium">None</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-center text-gray-400">-</td>
                        <td className="px-4 py-2 text-center text-gray-400">-</td>
                        <td className="px-4 py-2 text-center">
                          <span className="font-semibold text-green-600">±20%</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <Card className="shadow-lg mt-6">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Detailed Results</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-600 mb-1">Min Value</p>
                    <p className="text-lg font-semibold text-amber-700">
                      {formatResistance(resistance.value * (1 - resistance.tolerance / 100))}
                    </p>
                  </div>
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-600 mb-1">Nominal Value</p>
                    <p className="text-xl font-bold text-blue-700">
                      {formatResistance(resistance.value)}
                    </p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-600 mb-1">Max Value</p>
                    <p className="text-lg font-semibold text-amber-700">
                      {formatResistance(resistance.value * (1 + resistance.tolerance / 100))}
                    </p>
                  </div>
                </div>

                {resistance.tempCoeff && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Temperature Coefficient:</span> {resistance.tempCoeff} ppm/°C
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Standard Series */}
            <Card className="shadow-lg mt-6">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Nearest Standard Values</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">E12 (±10%)</p>
                    <p className="font-bold text-blue-700 text-lg">
                      {formatResistance(findNearestStandardValue(resistance.value, 'E12'))}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">E24 (±5%)</p>
                    <p className="font-bold text-blue-700 text-lg">
                      {formatResistance(findNearestStandardValue(resistance.value, 'E24'))}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">E96 (±1%)</p>
                    <p className="font-bold text-blue-700 text-lg">
                      {formatResistance(findNearestStandardValue(resistance.value, 'E96'))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Power Calculator */}
            <Card className="shadow-lg mt-6">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">
                  <div className="flex items-center gap-2">
                    Power Calculator
                    <span className="text-xs font-normal text-gray-500">(Optional)</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-700">Voltage (V)</Label>
                    <input
                      type="number"
                      value={voltage}
                      onChange={(e) => setVoltage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="12"
                      step="0.1"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-700">Current (A)</Label>
                    <input
                      type="number"
                      value={current}
                      onChange={(e) => setCurrent(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="0.01"
                      step="0.001"
                    />
                  </div>
                </div>

                {powerCalc && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-600 mb-1">Power</p>
                      <p className="text-lg font-bold text-green-700">
                        {powerCalc.power.toFixed(3)} W
                      </p>
                    </div>
                    {powerCalc.current && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">Current</p>
                        <p className="text-lg font-bold text-blue-700">
                          {powerCalc.current.toFixed(3)} A
                        </p>
                      </div>
                    )}
                    {powerCalc.voltage && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">Voltage</p>
                        <p className="text-lg font-bold text-blue-700">
                          {powerCalc.voltage.toFixed(2)} V
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Series/Parallel Calculator */}
            <Card className="shadow-lg mt-6">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">
                  <div className="flex items-center gap-2">
                    Series & Parallel Calculator
                    <span className="text-xs font-normal text-gray-500">(Optional)</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {/* Series */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Series Connection (R_total = R1 + R2 + ...)</h3>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="number"
                      value={newSeriesValue}
                      onChange={(e) => setNewSeriesValue(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter resistance (Ω)"
                    />
                    <Button
                      onClick={() => {
                        if (newSeriesValue) {
                          setSeriesResistors([...seriesResistors, parseFloat(newSeriesValue)]);
                          setNewSeriesValue('');
                        }
                      }}
                      className="bg-blue-600 px-4"
                      size="sm"
                    >
                      Add
                    </Button>
                  </div>
                  {seriesResistors.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {seriesResistors.map((r, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded text-xs"
                          >
                            {formatResistance(r)}
                            <button
                              onClick={() => setSeriesResistors(seriesResistors.filter((_, idx) => idx !== i))}
                              className="text-red-600 hover:text-red-800 font-bold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 text-center">
                        <p className="text-xs text-gray-600">Total:</p>
                        <p className="text-lg font-bold text-blue-700">
                          {formatResistance(calculateSeries())}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Parallel */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Parallel Connection (1/R_total = 1/R1 + 1/R2 + ...)</h3>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="number"
                      value={newParallelValue}
                      onChange={(e) => setNewParallelValue(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter resistance (Ω)"
                    />
                    <Button
                      onClick={() => {
                        if (newParallelValue) {
                          setParallelResistors([...parallelResistors, parseFloat(newParallelValue)]);
                          setNewParallelValue('');
                        }
                      }}
                      className="bg-blue-600 px-4"
                      size="sm"
                    >
                      Add
                    </Button>
                  </div>
                  {parallelResistors.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {parallelResistors.map((r, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded text-xs"
                          >
                            {formatResistance(r)}
                            <button
                              onClick={() => setParallelResistors(parallelResistors.filter((_, idx) => idx !== i))}
                              className="text-red-600 hover:text-red-800 font-bold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 text-center">
                        <p className="text-xs text-gray-600">Total:</p>
                        <p className="text-lg font-bold text-blue-700">
                          {formatResistance(calculateParallel())}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center print:hidden">
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
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Resistor Calculator"
      />
    </div>
  );
}

