'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, RotateCcw } from 'lucide-react';
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
}

const COLORS: Record<string, ColorBand> = {
  black: { color: 'Black', digit: 0, multiplier: 1, displayColor: '#000000' },
  brown: { color: 'Brown', digit: 1, multiplier: 10, tolerance: 1, tempCoeff: 100, displayColor: '#8B4513' },
  red: { color: 'Red', digit: 2, multiplier: 100, tolerance: 2, tempCoeff: 50, displayColor: '#FF0000' },
  orange: { color: 'Orange', digit: 3, multiplier: 1000, tolerance: 0.05, tempCoeff: 15, displayColor: '#FFA500' },
  yellow: { color: 'Yellow', digit: 4, multiplier: 10000, tolerance: 0.02, tempCoeff: 25, displayColor: '#FFFF00' },
  green: { color: 'Green', digit: 5, multiplier: 100000, tolerance: 0.5, displayColor: '#008000' },
  blue: { color: 'Blue', digit: 6, multiplier: 1000000, tolerance: 0.25, tempCoeff: 10, displayColor: '#0000FF' },
  violet: { color: 'Violet', digit: 7, multiplier: 10000000, tolerance: 0.1, tempCoeff: 5, displayColor: '#9400D3' },
  gray: { color: 'Gray', digit: 8, multiplier: 100000000, tolerance: 0.01, displayColor: '#808080' },
  white: { color: 'White', digit: 9, multiplier: 1000000000, displayColor: '#FFFFFF' },
  gold: { color: 'Gold', multiplier: 0.1, tolerance: 5, displayColor: '#FFD700' },
  silver: { color: 'Silver', multiplier: 0.01, tolerance: 10, displayColor: '#C0C0C0' },
  none: { color: 'None', tolerance: 20, displayColor: '#F3F4F6' },
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          {/* Band Count Selection */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Resistor Type</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Number of Bands</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={() => setBandCount(4)}
                    variant={bandCount === 4 ? "default" : "outline"}
                    className={bandCount === 4 ? "bg-blue-600" : ""}
                  >
                    4 Bands
                  </Button>
                  <Button
                    onClick={() => setBandCount(5)}
                    variant={bandCount === 5 ? "default" : "outline"}
                    className={bandCount === 5 ? "bg-blue-600" : ""}
                  >
                    5 Bands
                  </Button>
                  <Button
                    onClick={() => setBandCount(6)}
                    variant={bandCount === 6 ? "default" : "outline"}
                    className={bandCount === 6 ? "bg-blue-600" : ""}
                  >
                    6 Bands
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Band Selection */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Color Bands</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Band 1 */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Band 1 (1st Digit)
                </Label>
                <select
                  value={band1}
                  onChange={(e) => setBand1(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {getColorOptions(1).map(([key, color]) => (
                    <option key={key} value={key}>{color.color}</option>
                  ))}
                </select>
              </div>

              {/* Band 2 */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Band 2 (2nd Digit)
                </Label>
                <select
                  value={band2}
                  onChange={(e) => setBand2(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {getColorOptions(2).map(([key, color]) => (
                    <option key={key} value={key}>{color.color}</option>
                  ))}
                </select>
              </div>

              {/* Band 3 */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  {bandCount === 4 ? 'Band 3 (Multiplier)' : 'Band 3 (3rd Digit)'}
                </Label>
                <select
                  value={band3}
                  onChange={(e) => setBand3(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {getColorOptions(bandCount === 4 ? 4 : 3).map(([key, color]) => (
                    <option key={key} value={key}>{color.color}</option>
                  ))}
                </select>
              </div>

              {/* Band 4 */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  {bandCount === 4 ? 'Band 4 (Tolerance)' : 'Band 4 (Multiplier)'}
                </Label>
                <select
                  value={band4}
                  onChange={(e) => setBand4(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {getColorOptions(bandCount === 4 ? 5 : 4).map(([key, color]) => (
                    <option key={key} value={key}>{color.color}</option>
                  ))}
                </select>
              </div>

              {/* Band 5 (for 5 and 6 band resistors) */}
              {bandCount >= 5 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Band 5 (Tolerance)
                  </Label>
                  <select
                    value={band5}
                    onChange={(e) => setBand5(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {getColorOptions(5).map(([key, color]) => (
                      <option key={key} value={key}>{color.color}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Band 6 (for 6 band resistors) */}
              {bandCount === 6 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Band 6 (Temp. Coefficient)
                  </Label>
                  <select
                    value={band6}
                    onChange={(e) => setBand6(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {getColorOptions(6).map(([key, color]) => (
                      <option key={key} value={key}>{color.color}</option>
                    ))}
                  </select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reset Button */}
          <Button 
            onClick={handleReset}
            variant="outline"
            className="w-full gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          <div ref={resultRef}>
            {/* Visual Resistor Display */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Visual Representation</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-center py-8">
                  <div className="relative">
                    {/* Resistor body */}
                    <div className="w-64 h-20 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg border-2 border-gray-400 relative">
                      {/* Color bands */}
                      <div className="absolute inset-0 flex items-center justify-around px-4">
                        <div 
                          className="w-6 h-full rounded-sm border border-gray-600"
                          style={{ backgroundColor: COLORS[band1].displayColor }}
                        />
                        <div 
                          className="w-6 h-full rounded-sm border border-gray-600"
                          style={{ backgroundColor: COLORS[band2].displayColor }}
                        />
                        <div 
                          className="w-6 h-full rounded-sm border border-gray-600"
                          style={{ backgroundColor: COLORS[band3].displayColor }}
                        />
                        <div 
                          className="w-6 h-full rounded-sm border border-gray-600"
                          style={{ backgroundColor: COLORS[band4].displayColor }}
                        />
                        {bandCount >= 5 && (
                          <div 
                            className="w-6 h-full rounded-sm border border-gray-600"
                            style={{ backgroundColor: COLORS[band5].displayColor }}
                          />
                        )}
                        {bandCount === 6 && (
                          <div 
                            className="w-6 h-full rounded-sm border border-gray-600"
                            style={{ backgroundColor: COLORS[band6].displayColor }}
                          />
                        )}
                      </div>
                      {/* Leads */}
                      <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-1 bg-gray-400" />
                      <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-1 bg-gray-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resistance Value */}
            <Card className="shadow-lg mt-6">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Calculated Values</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Resistance:</p>
                  <p className="text-3xl sm:text-4xl font-bold text-blue-700 break-all">
                    {formatResistance(resistance.value)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Tolerance: ±{resistance.tolerance}%
                  </p>
                  {resistance.tempCoeff && (
                    <p className="text-sm text-gray-600 mt-1">
                      Temperature Coefficient: {resistance.tempCoeff} ppm/°C
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-600 mb-1">Min Value</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatResistance(resistance.value * (1 - resistance.tolerance / 100))}
                    </p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-600 mb-1">Nominal</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatResistance(resistance.value)}
                    </p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-600 mb-1">Max Value</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatResistance(resistance.value * (1 + resistance.tolerance / 100))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Standard Series */}
            <Card className="shadow-lg mt-6">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Standard Series Values</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">E12 Series (±10%)</p>
                      <p className="text-xs text-gray-600">12 values per decade</p>
                    </div>
                    <p className="font-semibold text-blue-700">
                      {formatResistance(findNearestStandardValue(resistance.value, 'E12'))}
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">E24 Series (±5%)</p>
                      <p className="text-xs text-gray-600">24 values per decade</p>
                    </div>
                    <p className="font-semibold text-blue-700">
                      {formatResistance(findNearestStandardValue(resistance.value, 'E24'))}
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">E96 Series (±1%)</p>
                      <p className="text-xs text-gray-600">96 values per decade</p>
                    </div>
                    <p className="font-semibold text-blue-700">
                      {formatResistance(findNearestStandardValue(resistance.value, 'E96'))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Power Calculator */}
            <Card className="shadow-lg mt-6">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Power Calculator</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Voltage (V) <span className="text-gray-500 text-xs">- Optional</span>
                    </Label>
                    <input
                      type="number"
                      value={voltage}
                      onChange={(e) => setVoltage(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="12"
                      step="0.1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Current (A) <span className="text-gray-500 text-xs">- Optional</span>
                    </Label>
                    <input
                      type="number"
                      value={current}
                      onChange={(e) => setCurrent(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="0.01"
                      step="0.001"
                    />
                  </div>
                </div>

                {powerCalc && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Power Dissipation</p>
                      <p className="text-xl font-bold text-green-700">
                        {powerCalc.power.toFixed(3)} W
                      </p>
                    </div>
                    {powerCalc.current && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Current</p>
                        <p className="text-xl font-bold text-blue-700">
                          {powerCalc.current.toFixed(3)} A
                        </p>
                      </div>
                    )}
                    {powerCalc.voltage && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Voltage</p>
                        <p className="text-xl font-bold text-blue-700">
                          {powerCalc.voltage.toFixed(2)} V
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-amber-800">
                    <strong>Power Rating Guidelines:</strong>
                  </p>
                  <ul className="text-xs text-amber-700 mt-2 space-y-1 ml-4">
                    <li>• 1/8W (0.125W) - Small signal circuits</li>
                    <li>• 1/4W (0.25W) - General purpose</li>
                    <li>• 1/2W (0.5W) - Power circuits</li>
                    <li>• 1W+ - High power applications</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Series/Parallel Calculator */}
            <Card className="shadow-lg mt-6">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Series & Parallel</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Series */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Series Connection</h3>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="number"
                      value={newSeriesValue}
                      onChange={(e) => setNewSeriesValue(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter resistance (Ω)"
                    />
                    <Button
                      onClick={() => {
                        if (newSeriesValue) {
                          setSeriesResistors([...seriesResistors, parseFloat(newSeriesValue)]);
                          setNewSeriesValue('');
                        }
                      }}
                      className="bg-blue-600"
                    >
                      Add
                    </Button>
                  </div>
                  {seriesResistors.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {seriesResistors.map((r, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-sm"
                          >
                            {formatResistance(r)}
                            <button
                              onClick={() => setSeriesResistors(seriesResistors.filter((_, idx) => idx !== i))}
                              className="text-red-600 hover:text-red-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-gray-600">Total Series Resistance:</p>
                        <p className="text-xl font-bold text-blue-700">
                          {formatResistance(calculateSeries())}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Parallel */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Parallel Connection</h3>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="number"
                      value={newParallelValue}
                      onChange={(e) => setNewParallelValue(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter resistance (Ω)"
                    />
                    <Button
                      onClick={() => {
                        if (newParallelValue) {
                          setParallelResistors([...parallelResistors, parseFloat(newParallelValue)]);
                          setNewParallelValue('');
                        }
                      }}
                      className="bg-blue-600"
                    >
                      Add
                    </Button>
                  </div>
                  {parallelResistors.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {parallelResistors.map((r, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-sm"
                          >
                            {formatResistance(r)}
                            <button
                              onClick={() => setParallelResistors(parallelResistors.filter((_, idx) => idx !== i))}
                              className="text-red-600 hover:text-red-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-gray-600">Total Parallel Resistance:</p>
                        <p className="text-xl font-bold text-blue-700">
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

