'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Copy, Share2, Printer, RefreshCw } from 'lucide-react';

interface RoundingResult {
  original: string;
  rounded: string;
  method: string;
  decimalPlaces?: number;
  significantFigures?: number;
  explanation: string;
}

type RoundingMethod = 'round' | 'ceil' | 'floor' | 'truncate' | 'bankers' | 'significant';

export default function RoundingCalculator() {
  const [inputNumber, setInputNumber] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState('2');
  const [significantFigures, setSignificantFigures] = useState('3');
  const [selectedMethod, setSelectedMethod] = useState<RoundingMethod>('round');
  const [result, setResult] = useState<RoundingResult | null>(null);
  const [batchInput, setBatchInput] = useState('');
  const [batchResults, setBatchResults] = useState<RoundingResult[]>([]);

  // Rounding methods
  const standardRound = (num: number, decimals: number): number => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  };

  const ceilingRound = (num: number, decimals: number): number => {
    return Math.ceil(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  };

  const floorRound = (num: number, decimals: number): number => {
    return Math.floor(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  };

  const truncateRound = (num: number, decimals: number): number => {
    const factor = Math.pow(10, decimals);
    return Math.trunc(num * factor) / factor;
  };

  const bankersRound = (num: number, decimals: number): number => {
    const factor = Math.pow(10, decimals);
    const shifted = num * factor;
    const floor = Math.floor(shifted);
    const decimal = shifted - floor;
    
    // If decimal is exactly 0.5, round to even
    if (Math.abs(decimal - 0.5) < Number.EPSILON) {
      return (floor % 2 === 0 ? floor : floor + 1) / factor;
    }
    
    // Otherwise, standard rounding
    return Math.round(shifted) / factor;
  };

  const significantFiguresRound = (num: number, sigFigs: number): number => {
    if (num === 0) return 0;
    const magnitude = Math.floor(Math.log10(Math.abs(num)));
    const scale = Math.pow(10, magnitude - sigFigs + 1);
    return Math.round(num / scale) * scale;
  };

  const handleCalculate = () => {
    const num = parseFloat(inputNumber);
    
    if (isNaN(num)) {
      alert('Please enter a valid number!\n\n请输入有效的数字！');
      return;
    }

    const decimals = parseInt(decimalPlaces);
    const sigFigs = parseInt(significantFigures);

    if (selectedMethod !== 'significant' && (isNaN(decimals) || decimals < 0)) {
      alert('Please enter a valid number of decimal places (0 or greater)!\n\n请输入有效的小数位数（0或更大）！');
      return;
    }

    if (selectedMethod === 'significant' && (isNaN(sigFigs) || sigFigs < 1)) {
      alert('Please enter a valid number of significant figures (1 or greater)!\n\n请输入有效的有效数字位数（1或更大）！');
      return;
    }

    let roundedValue: number;
    let methodName: string;
    let explanation: string;

    switch (selectedMethod) {
      case 'round':
        roundedValue = standardRound(num, decimals);
        methodName = 'Standard Round (Half Up)';
        explanation = `Rounds ${num} to ${decimals} decimal place${decimals !== 1 ? 's' : ''} using the standard "half up" rule: if the digit after the rounding position is 5 or greater, round up; otherwise, round down.`;
        break;
      case 'ceil':
        roundedValue = ceilingRound(num, decimals);
        methodName = 'Ceiling (Round Up)';
        explanation = `Always rounds ${num} up to ${decimals} decimal place${decimals !== 1 ? 's' : ''}. The result is never less than the original number.`;
        break;
      case 'floor':
        roundedValue = floorRound(num, decimals);
        methodName = 'Floor (Round Down)';
        explanation = `Always rounds ${num} down to ${decimals} decimal place${decimals !== 1 ? 's' : ''}. The result is never greater than the original number.`;
        break;
      case 'truncate':
        roundedValue = truncateRound(num, decimals);
        methodName = 'Truncate (Chop)';
        explanation = `Truncates ${num} to ${decimals} decimal place${decimals !== 1 ? 's' : ''} by simply removing all digits after the specified position, without any rounding.`;
        break;
      case 'bankers':
        roundedValue = bankersRound(num, decimals);
        methodName = "Banker's Round (Round Half to Even)";
        explanation = `Rounds ${num} to ${decimals} decimal place${decimals !== 1 ? 's' : ''} using banker's rounding: when the digit is exactly 5, rounds to the nearest even number. This method reduces cumulative rounding errors in financial calculations.`;
        break;
      case 'significant':
        roundedValue = significantFiguresRound(num, sigFigs);
        methodName = 'Significant Figures';
        explanation = `Rounds ${num} to ${sigFigs} significant figure${sigFigs !== 1 ? 's' : ''}. Significant figures count all meaningful digits starting from the first non-zero digit.`;
        break;
      default:
        return;
    }

    setResult({
      original: num.toString(),
      rounded: roundedValue.toString(),
      method: methodName,
      decimalPlaces: selectedMethod !== 'significant' ? decimals : undefined,
      significantFigures: selectedMethod === 'significant' ? sigFigs : undefined,
      explanation,
    });
  };

  const handleBatchRound = () => {
    if (!batchInput.trim()) {
      alert('Please enter numbers to round!\n\n请输入要舍入的数字！');
      return;
    }

    const decimals = parseInt(decimalPlaces);
    if (isNaN(decimals) || decimals < 0) {
      alert('Please enter a valid number of decimal places!\n\n请输入有效的小数位数！');
      return;
    }

    const numbers = batchInput
      .split(/[\n,;]+/)
      .map(n => n.trim())
      .filter(n => n.length > 0);

    const results: RoundingResult[] = [];

    for (const numStr of numbers) {
      const num = parseFloat(numStr);
      if (isNaN(num)) continue;

      const roundedValue = standardRound(num, decimals);
      results.push({
        original: num.toString(),
        rounded: roundedValue.toString(),
        method: 'Standard Round',
        decimalPlaces: decimals,
        explanation: `Rounded to ${decimals} decimal places`,
      });
    }

    setBatchResults(results);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Rounding Calculator',
          text: 'Check out this Rounding Calculator!',
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const roundingMethods = [
    {
      id: 'round' as RoundingMethod,
      name: 'Standard Round',
      icon: '🔵',
      desc: 'Half Up (0.5 rounds up)',
      example: '3.5 → 4',
    },
    {
      id: 'ceil' as RoundingMethod,
      name: 'Ceiling',
      icon: '⬆️',
      desc: 'Always round up',
      example: '3.1 → 4',
    },
    {
      id: 'floor' as RoundingMethod,
      name: 'Floor',
      icon: '⬇️',
      desc: 'Always round down',
      example: '3.9 → 3',
    },
    {
      id: 'truncate' as RoundingMethod,
      name: 'Truncate',
      icon: '✂️',
      desc: 'Chop off decimals',
      example: '3.999 → 3',
    },
    {
      id: 'bankers' as RoundingMethod,
      name: "Banker's Round",
      icon: '🏦',
      desc: 'Round half to even',
      example: '2.5 → 2, 3.5 → 4',
    },
    {
      id: 'significant' as RoundingMethod,
      name: 'Significant Figures',
      icon: '🔬',
      desc: 'Meaningful digits',
      example: '1234 (3 sig figs) → 1230',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Input Section */}
        <div className="space-y-6">
          {/* Single Number Rounding */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="text-xl flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Single Number Rounding
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inputNumber" className="text-sm font-medium">
                    Number to Round <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="inputNumber"
                    type="text"
                    value={inputNumber}
                    onChange={(e) => setInputNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 3.14159"
                    required
                  />
                  <p className="text-xs text-gray-500">Enter the number you want to round</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Rounding Method <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {roundingMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          selectedMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{method.icon}</span>
                          <span className="font-semibold text-sm">{method.name}</span>
                        </div>
                        <p className="text-xs text-gray-600">{method.desc}</p>
                        <p className="text-xs text-blue-600 font-mono mt-1">{method.example}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedMethod === 'significant' ? (
                  <div className="space-y-2">
                    <Label htmlFor="significantFigures" className="text-sm font-medium">
                      Significant Figures <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="significantFigures"
                      type="number"
                      min="1"
                      max="15"
                      value={significantFigures}
                      onChange={(e) => setSignificantFigures(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500">Number of significant figures to keep</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="decimalPlaces" className="text-sm font-medium">
                      Decimal Places <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="decimalPlaces"
                      type="number"
                      min="0"
                      max="10"
                      value={decimalPlaces}
                      onChange={(e) => setDecimalPlaces(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500">Number of decimal places (0-10)</p>
                  </div>
                )}
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Round Number
              </Button>
            </CardContent>
          </Card>

          {/* Batch Rounding */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-xl flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Batch Rounding
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="batchInput" className="text-sm font-medium">
                    Numbers to Round <span className="text-gray-500 text-xs">- Optional</span>
                  </Label>
                  <textarea
                    id="batchInput"
                    value={batchInput}
                    onChange={(e) => setBatchInput(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[120px] font-mono text-sm"
                    placeholder="Enter numbers separated by commas or new lines:&#10;3.14159&#10;2.71828&#10;1.41421"
                  />
                  <p className="text-xs text-gray-500">Separate numbers with commas, semicolons, or new lines</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-900">
                    <strong>Note:</strong> Batch rounding uses Standard Round method with the specified decimal places.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleBatchRound}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 min-h-[44px]"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Round All Numbers
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Results Section */}
        <div className="space-y-6">
          {/* Single Result */}
          {result && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="text-xl">Result</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 sm:p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Original Number:</p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-lg font-semibold text-gray-900">
                          {result.original}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <span className="text-3xl text-blue-600">↓</span>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Rounded Result:</p>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3 border-2 border-blue-400">
                        <span className="font-mono text-2xl font-bold text-blue-600">
                          {result.rounded}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(result.rounded)}
                          className="flex-shrink-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-blue-300">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Method:</p>
                      <p className="text-sm text-gray-700">{result.method}</p>
                      {result.decimalPlaces !== undefined && (
                        <p className="text-xs text-gray-600 mt-1">
                          Decimal Places: {result.decimalPlaces}
                        </p>
                      )}
                      {result.significantFigures !== undefined && (
                        <p className="text-xs text-gray-600 mt-1">
                          Significant Figures: {result.significantFigures}
                        </p>
                      )}
                    </div>

                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Explanation:</p>
                      <p className="text-sm text-gray-700">{result.explanation}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Batch Results */}
          {batchResults.length > 0 && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-xl">Batch Results ({batchResults.length} numbers)</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {batchResults.map((res, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 font-mono w-8">{index + 1}.</span>
                        <span className="font-mono text-gray-700">{res.original}</span>
                        <span className="text-green-600">→</span>
                        <span className="font-mono font-bold text-green-700">{res.rounded}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(res.rounded)}
                        className="flex-shrink-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-green-200">
                  <Button
                    onClick={() => {
                      const allResults = batchResults.map(r => r.rounded).join('\n');
                      copyToClipboard(allResults);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All Results
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Quick Reference */}
      <Card className="shadow-lg mt-6">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardTitle className="text-xl">Rounding Methods Quick Reference</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-gray-900">Basic Methods</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold text-blue-700">Standard Round (Half Up)</p>
                  <p className="text-gray-700 mt-1">3.14 → 3.1 (1 decimal)</p>
                  <p className="text-gray-700">3.15 → 3.2 (1 decimal)</p>
                  <p className="text-xs text-gray-600 mt-1">Most common: 0.5 rounds up</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold text-blue-700">Ceiling (Round Up)</p>
                  <p className="text-gray-700 mt-1">3.14 → 3.2 (1 decimal)</p>
                  <p className="text-gray-700">3.01 → 3.1 (1 decimal)</p>
                  <p className="text-xs text-gray-600 mt-1">Always rounds toward positive infinity</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold text-blue-700">Floor (Round Down)</p>
                  <p className="text-gray-700 mt-1">3.99 → 3.9 (1 decimal)</p>
                  <p className="text-gray-700">3.14 → 3.1 (1 decimal)</p>
                  <p className="text-xs text-gray-600 mt-1">Always rounds toward negative infinity</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-gray-900">Advanced Methods</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold text-blue-700">Truncate (Chop)</p>
                  <p className="text-gray-700 mt-1">3.99 → 3 (0 decimals)</p>
                  <p className="text-gray-700">-3.99 → -3 (0 decimals)</p>
                  <p className="text-xs text-gray-600 mt-1">Removes decimals without rounding</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold text-blue-700">Banker's Round</p>
                  <p className="text-gray-700 mt-1">2.5 → 2 (rounds to even)</p>
                  <p className="text-gray-700">3.5 → 4 (rounds to even)</p>
                  <p className="text-xs text-gray-600 mt-1">Reduces cumulative error in finance</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold text-blue-700">Significant Figures</p>
                  <p className="text-gray-700 mt-1">1234 → 1230 (3 sig figs)</p>
                  <p className="text-gray-700">0.001234 → 0.00123 (3 sig figs)</p>
                  <p className="text-xs text-gray-600 mt-1">Used in science and engineering</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
        <Button onClick={handlePrint} variant="outline" className="gap-2">
          <Printer className="h-4 w-4" />
          Print Results
        </Button>
        <Button onClick={handleShare} variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Calculator
        </Button>
      </div>
    </div>
  );
}

