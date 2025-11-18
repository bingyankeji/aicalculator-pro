'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Share2, Printer, Dices, Trash2, Copy, RefreshCw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface RandomNumberInputs {
  type: 'integer' | 'decimal' | 'normal' | 'uniform';
  min: string;
  max: string;
  count: string;
  decimals: string;
  unique: boolean;
  mean: string;
  stdDev: string;
}

interface GeneratedNumber {
  id: string;
  value: number;
  timestamp: Date;
}

export default function RandomNumberGenerator() {
  const [inputs, setInputs] = useState<RandomNumberInputs>({
    type: 'integer',
    min: '1',
    max: '100',
    count: '1',
    decimals: '2',
    unique: false,
    mean: '50',
    stdDev: '15',
  });

  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const [history, setHistory] = useState<GeneratedNumber[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/random-number-generator',
    getShareParams: () => ({
      t: inputs.type,
      min: inputs.min,
      max: inputs.max,
      n: inputs.count,
    }),
    getShareText: () => {
      return 'Generate random numbers with custom ranges and distributions!';
    },
  });

  const handleInputChange = (field: keyof RandomNumberInputs, value: any) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  // Box-Muller transform for normal distribution
  const generateNormal = (mean: number, stdDev: number): number => {
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return z0 * stdDev + mean;
  };

  const generateNumbers = async () => {
    const count = parseInt(inputs.count);
    const min = parseFloat(inputs.min);
    const max = parseFloat(inputs.max);

    if (isNaN(count) || count < 1 || count > 10000) {
      alert('Please enter a valid count (1-10000).');
      return;
    }

    if (inputs.type !== 'normal' && (isNaN(min) || isNaN(max) || min >= max)) {
      alert('Please enter valid min and max values (min < max).');
      return;
    }

    if (inputs.unique && count > (max - min + 1) && inputs.type === 'integer') {
      alert('Cannot generate more unique integers than the range allows.');
      return;
    }

    setIsAnimating(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    let numbers: number[] = [];

    if (inputs.type === 'integer') {
      if (inputs.unique) {
        const range = Array.from({ length: max - min + 1 }, (_, i) => min + i);
        for (let i = range.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [range[i], range[j]] = [range[j], range[i]];
        }
        numbers = range.slice(0, count);
      } else {
        numbers = Array.from({ length: count }, () =>
          Math.floor(Math.random() * (max - min + 1)) + min
        );
      }
    } else if (inputs.type === 'decimal') {
      const decimals = parseInt(inputs.decimals) || 2;
      numbers = Array.from({ length: count }, () => {
        const num = Math.random() * (max - min) + min;
        return parseFloat(num.toFixed(decimals));
      });
    } else if (inputs.type === 'normal') {
      const mean = parseFloat(inputs.mean);
      const stdDev = parseFloat(inputs.stdDev);
      if (isNaN(mean) || isNaN(stdDev) || stdDev <= 0) {
        alert('Please enter valid mean and standard deviation (SD > 0).');
        setIsAnimating(false);
        return;
      }
      const decimals = parseInt(inputs.decimals) || 2;
      numbers = Array.from({ length: count }, () => {
        const num = generateNormal(mean, stdDev);
        return parseFloat(num.toFixed(decimals));
      });
    } else if (inputs.type === 'uniform') {
      const decimals = parseInt(inputs.decimals) || 2;
      numbers = Array.from({ length: count }, () => {
        const num = Math.random() * (max - min) + min;
        return parseFloat(num.toFixed(decimals));
      });
    }

    setGeneratedNumbers(numbers);

    // Add to history
    const newHistory = numbers.map((value) => ({
      id: Math.random().toString(36).substr(2, 9),
      value,
      timestamp: new Date(),
    }));
    setHistory((prev) => [...newHistory, ...prev].slice(0, 100)); // Keep last 100

    setIsAnimating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const clearHistory = () => {
    if (confirm('Clear all history?')) {
      setHistory([]);
    }
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `random-numbers-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current) return;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const canvas = await html2canvas(resultRef.current, { scale: 2, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html><head><title>Random Numbers</title>
          <style>body{margin:0;padding:20px;display:flex;justify-content:center;}
          img{max-width:100%;height:auto;}
          @media print{body{padding:0;}img{page-break-inside:avoid;}}</style>
          </head><body><img src="${imgData}" onload="window.print();"/></body></html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
    }
  };

  // Calculate distribution for chart
  const getDistributionData = () => {
    if (generatedNumbers.length === 0) return [];

    const min = Math.min(...generatedNumbers);
    const max = Math.max(...generatedNumbers);
    const bins = Math.min(20, Math.ceil(Math.sqrt(generatedNumbers.length)));
    const binSize = (max - min) / bins;

    const distribution = Array.from({ length: bins }, (_, i) => ({
      range: `${(min + i * binSize).toFixed(1)}-${(min + (i + 1) * binSize).toFixed(1)}`,
      count: 0,
    }));

    generatedNumbers.forEach((num) => {
      const binIndex = Math.min(Math.floor((num - min) / binSize), bins - 1);
      distribution[binIndex].count++;
    });

    return distribution;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <Dices className="h-5 w-5 text-blue-600" />
                Generator Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Number Type</Label>
                <select
                  value={inputs.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="integer">Integer (Whole Numbers)</option>
                  <option value="decimal">Decimal (Float)</option>
                  <option value="normal">Normal Distribution</option>
                  <option value="uniform">Uniform Distribution</option>
                </select>
              </div>

              {inputs.type === 'normal' ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="mean" className="text-sm font-medium text-gray-700">
                      Mean (μ) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="mean"
                      type="number"
                      step="any"
                      value={inputs.mean}
                      onChange={(e) => handleInputChange('mean', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stdDev" className="text-sm font-medium text-gray-700">
                      Standard Deviation (σ) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="stdDev"
                      type="number"
                      step="any"
                      min="0.01"
                      value={inputs.stdDev}
                      onChange={(e) => handleInputChange('stdDev', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="15"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="min" className="text-sm font-medium text-gray-700">
                      Minimum Value <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="min"
                      type="number"
                      step={inputs.type === 'integer' ? '1' : 'any'}
                      value={inputs.min}
                      onChange={(e) => handleInputChange('min', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max" className="text-sm font-medium text-gray-700">
                      Maximum Value <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="max"
                      type="number"
                      step={inputs.type === 'integer' ? '1' : 'any'}
                      value={inputs.max}
                      onChange={(e) => handleInputChange('max', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="100"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="count" className="text-sm font-medium text-gray-700">
                  How Many Numbers? <span className="text-red-500">*</span>
                </Label>
                <input
                  id="count"
                  type="number"
                  min="1"
                  max="10000"
                  value={inputs.count}
                  onChange={(e) => handleInputChange('count', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="1"
                />
                <p className="text-xs text-gray-500">Max: 10,000 numbers</p>
              </div>

              {(inputs.type === 'decimal' || inputs.type === 'uniform' || inputs.type === 'normal') && (
                <div className="space-y-2">
                  <Label htmlFor="decimals" className="text-sm font-medium text-gray-700">
                    Decimal Places <span className="text-gray-500 text-xs">- Optional</span>
                  </Label>
                  <input
                    id="decimals"
                    type="number"
                    min="0"
                    max="10"
                    value={inputs.decimals}
                    onChange={(e) => handleInputChange('decimals', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="2"
                  />
                  <p className="text-xs text-gray-500">Default: 2 decimal places</p>
                </div>
              )}

              {inputs.type === 'integer' && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    id="unique"
                    type="checkbox"
                    checked={inputs.unique}
                    onChange={(e) => handleInputChange('unique', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Label htmlFor="unique" className="text-sm text-gray-700 cursor-pointer">
                    Generate unique numbers only (no duplicates)
                  </Label>
                </div>
              )}
            </CardContent>
          </Card>

          <Button
            onClick={generateNumbers}
            disabled={isAnimating}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            {isAnimating ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Dices className="h-5 w-5 mr-2" />
                Generate Random Numbers
              </>
            )}
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          <div className="space-y-6">
            {generatedNumbers.length > 0 ? (
              <>
                {/* Generated Numbers Display */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-gray-900">
                        Generated Numbers ({generatedNumbers.length})
                      </CardTitle>
                      <Button
                        onClick={() => copyToClipboard(generatedNumbers.join(', '))}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {generatedNumbers.map((num, index) => (
                        <div
                          key={index}
                          className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 text-center hover:bg-blue-100 transition-colors"
                        >
                          <p className="text-lg font-bold text-blue-700">{num}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Distribution Chart */}
                {generatedNumbers.length >= 10 && (
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={getDistributionData()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="range" stroke="#6b7280" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
                          <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
                          <Tooltip />
                          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Results</CardTitle>
                </CardHeader>
                <CardContent className="p-12">
                  <div className="text-center text-gray-500">
                    <Dices className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg mb-2">No numbers generated yet</p>
                    <p className="text-sm text-gray-400">
                      Configure your settings and click "Generate Random Numbers"
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {generatedNumbers.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
          <Button onClick={handleSaveAsImage} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Save as Image
          </Button>
          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print Results
          </Button>
          <Button onClick={handleShare} variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Calculator
          </Button>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Random Number Generator"
      />
    </div>
  );
}

