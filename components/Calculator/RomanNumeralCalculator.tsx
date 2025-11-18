'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeftRight, BookOpen, History, Download, Share2, TrendingUp } from 'lucide-react';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';

interface ConversionHistory {
  input: string;
  output: string;
  type: 'toRoman' | 'toArabic';
  timestamp: Date;
}

const RomanNumeralCalculator = () => {
  const [arabicInput, setArabicInput] = useState('');
  const [romanInput, setRomanInput] = useState('');
  const [arabicResult, setArabicResult] = useState('');
  const [romanResult, setRomanResult] = useState('');
  const [error, setError] = useState('');
  const [conversionSteps, setConversionSteps] = useState<string[]>([]);
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/roman-numeral-converter',
    getShareParams: () => ({}),
    getShareText: () => {
      if (arabicResult && romanInput) {
        return `Converted Roman Numeral ${romanInput} to ${arabicResult}`;
      } else if (romanResult && arabicInput) {
        return `Converted ${arabicInput} to Roman Numeral ${romanResult}`;
      }
      return 'Check out this Roman Numeral Converter!';
    },
  });

  // Roman numeral mapping
  const romanMap: { [key: string]: number } = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };

  const valueMap: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];

  // Convert Arabic to Roman with steps
  const arabicToRoman = (num: number): { roman: string; steps: string[] } => {
    if (num < 1 || num > 3999) {
      throw new Error('Number must be between 1 and 3999');
    }

    let result = '';
    let remaining = num;
    const steps: string[] = [];

    for (const [value, numeral] of valueMap) {
      while (remaining >= value) {
        result += numeral;
        steps.push(`${remaining} - ${value} = ${remaining - value} (add ${numeral})`);
        remaining -= value;
      }
    }

    return { roman: result, steps };
  };

  // Validate Roman numeral
  const isValidRoman = (roman: string): boolean => {
    const pattern = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    return pattern.test(roman);
  };

  // Convert Roman to Arabic with steps
  const romanToArabic = (roman: string): { arabic: number; steps: string[] } => {
    roman = roman.toUpperCase();
    
    if (!isValidRoman(roman)) {
      throw new Error('Invalid Roman numeral');
    }

    let result = 0;
    const steps: string[] = [];

    for (let i = 0; i < roman.length; i++) {
      const current = romanMap[roman[i]];
      const next = romanMap[roman[i + 1]];

      if (next && current < next) {
        const subtractValue = next - current;
        result += subtractValue;
        steps.push(`${roman[i]}${roman[i + 1]} = ${subtractValue} (subtraction rule)`);
        i++; // Skip next character
      } else {
        result += current;
        steps.push(`${roman[i]} = ${current}`);
      }
    }

    return { arabic: result, steps };
  };

  // Handle Arabic to Roman conversion
  const handleArabicConversion = () => {
    setError('');
    setRomanResult('');
    setConversionSteps([]);

    try {
      const num = parseInt(arabicInput);
      
      if (isNaN(num)) {
        throw new Error('Please enter a valid number');
      }

      const { roman, steps } = arabicToRoman(num);
      setRomanResult(roman);
      setConversionSteps(steps);

      // Add to history
      const newEntry: ConversionHistory = {
        input: arabicInput,
        output: roman,
        type: 'toRoman',
        timestamp: new Date()
      };
      setHistory(prev => [newEntry, ...prev.slice(0, 9)]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle Roman to Arabic conversion
  const handleRomanConversion = () => {
    setError('');
    setArabicResult('');
    setConversionSteps([]);

    try {
      if (!romanInput.trim()) {
        throw new Error('Please enter a Roman numeral');
      }

      const { arabic, steps } = romanToArabic(romanInput);
      setArabicResult(arabic.toString());
      setConversionSteps(steps);

      // Add to history
      const newEntry: ConversionHistory = {
        input: romanInput.toUpperCase(),
        output: arabic.toString(),
        type: 'toArabic',
        timestamp: new Date()
      };
      setHistory(prev => [newEntry, ...prev.slice(0, 9)]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Common conversions reference table
  const commonConversions = [
    { arabic: 1, roman: 'I' }, { arabic: 5, roman: 'V' },
    { arabic: 10, roman: 'X' }, { arabic: 50, roman: 'L' },
    { arabic: 100, roman: 'C' }, { arabic: 500, roman: 'D' },
    { arabic: 1000, roman: 'M' }, { arabic: 4, roman: 'IV' },
    { arabic: 9, roman: 'IX' }, { arabic: 40, roman: 'XL' },
    { arabic: 90, roman: 'XC' }, { arabic: 400, roman: 'CD' },
    { arabic: 900, roman: 'CM' }
  ];

  // Handle print
  const handlePrint = () => {
    if (resultRef.current) {
      const printContent = resultRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Roman Numeral Conversion Results</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .result { margin: 20px 0; }
              </style>
            </head>
            <body>
              <h1>Roman Numeral Conversion</h1>
              ${printContent}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Converters */}
        <div className="space-y-6">
          {/* Arabic to Roman */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Arabic to Roman
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Enter Number (1-3999)</Label>
                <Input
                  type="number"
                  min="1"
                  max="3999"
                  value={arabicInput}
                  onChange={(e) => setArabicInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleArabicConversion()}
                  placeholder="e.g., 2024"
                  className="w-full text-lg"
                />
              </div>
              <Button
                onClick={handleArabicConversion}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Convert to Roman
              </Button>
              {romanResult && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Result:</p>
                  <p className="text-3xl font-bold text-blue-700">{romanResult}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Roman to Arabic */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600 rotate-180" />
                Roman to Arabic
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Enter Roman Numeral</Label>
                <Input
                  type="text"
                  value={romanInput}
                  onChange={(e) => setRomanInput(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === 'Enter' && handleRomanConversion()}
                  placeholder="e.g., MMXXIV"
                  className="w-full text-lg font-mono uppercase"
                />
              </div>
              <Button
                onClick={handleRomanConversion}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Convert to Arabic
              </Button>
              {arabicResult && (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <p className="text-sm text-gray-600 mb-1">Result:</p>
                  <p className="text-3xl font-bold text-purple-700">{arabicResult}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Right Panel - Results & Info */}
        <div className="space-y-6">
          {/* Conversion Steps */}
          {conversionSteps.length > 0 && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-cyan-50">
                <CardTitle className="text-lg text-gray-800">Conversion Steps</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6" ref={resultRef}>
                <div className="space-y-2">
                  {conversionSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-sm font-semibold text-gray-500 min-w-[24px]">
                        {index + 1}.
                      </span>
                      <span className="text-sm text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reference Table */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-amber-600" />
                Common Conversions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {commonConversions.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-center hover:bg-gray-100 transition-colors"
                  >
                    <p className="text-lg font-bold text-gray-900">{item.arabic}</p>
                    <p className="text-sm text-gray-600 font-mono">{item.roman}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conversion History */}
          {history.length > 0 && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <History className="h-5 w-5 text-gray-600" />
                  Recent Conversions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-gray-900">
                          {item.input}
                        </span>
                        <ArrowLeftRight className="h-4 w-4 text-gray-400" />
                        <span className="font-mono font-bold text-gray-900">
                          {item.output}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {(romanResult || arabicResult) && (
            <div className="flex gap-3">
              <Button
                onClick={handlePrint}
                variant="outline"
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex-1"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
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
      />
    </div>
  );
};

export default RomanNumeralCalculator;

