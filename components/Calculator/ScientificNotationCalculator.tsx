'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Copy, Share2, Printer } from 'lucide-react';

interface ConversionResult {
  standard: string;
  scientific: string;
  engineering: string;
  significantFigures: number;
  explanation: string;
}

interface ArithmeticResult {
  operation: string;
  result: string;
  scientific: string;
  steps: string[];
}

export default function ScientificNotationCalculator() {
  const [inputNumber, setInputNumber] = useState('');
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  const [sciNum1, setSciNum1] = useState('');
  const [sciNum2, setSciNum2] = useState('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [arithmeticResult, setArithmeticResult] = useState<ArithmeticResult | null>(null);

  const parseScientific = (str: string): number => {
    const cleaned = str.trim().toUpperCase().replace(/\s/g, '');
    
    if (!isNaN(Number(cleaned))) {
      return Number(cleaned);
    }
    
    const eMatch = cleaned.match(/^([+-]?\d*\.?\d+)[E]([+-]?\d+)$/);
    if (eMatch) {
      const mantissa = parseFloat(eMatch[1]);
      const exponent = parseInt(eMatch[2]);
      return mantissa * Math.pow(10, exponent);
    }
    
    const timesMatch = cleaned.match(/^([+-]?\d*\.?\d+)[×X]\s*10\^([+-]?\d+)$/);
    if (timesMatch) {
      const mantissa = parseFloat(timesMatch[1]);
      const exponent = parseInt(timesMatch[2]);
      return mantissa * Math.pow(10, exponent);
    }
    
    return NaN;
  };

  const toScientific = (num: number, sigFigs: number = 6): { mantissa: number; exponent: number } => {
    if (num === 0) return { mantissa: 0, exponent: 0 };
    
    const exponent = Math.floor(Math.log10(Math.abs(num)));
    const mantissa = num / Math.pow(10, exponent);
    
    const factor = Math.pow(10, sigFigs - 1);
    const roundedMantissa = Math.round(mantissa * factor) / factor;
    
    return { mantissa: roundedMantissa, exponent };
  };

  const toEngineering = (num: number, sigFigs: number = 6): { mantissa: number; exponent: number } => {
    if (num === 0) return { mantissa: 0, exponent: 0 };
    
    const sciExponent = Math.floor(Math.log10(Math.abs(num)));
    const engExponent = Math.floor(sciExponent / 3) * 3;
    const mantissa = num / Math.pow(10, engExponent);
    
    const factor = Math.pow(10, sigFigs - 1);
    const roundedMantissa = Math.round(mantissa * factor) / factor;
    
    return { mantissa: roundedMantissa, exponent: engExponent };
  };

  const countSigFigs = (numStr: string): number => {
    const cleaned = numStr.trim().replace(/[eE][+-]?\d+$/, '');
    const withoutSign = cleaned.replace(/^[+-]/, '');
    const significant = withoutSign.replace(/^0+\.?0*/, '');
    
    if (significant === '') return 1;
    
    if (!significant.includes('.')) {
      return significant.replace(/0+$/, '').length;
    }
    
    return significant.replace('.', '').length;
  };

  const handleConversion = () => {
    const num = parseScientific(inputNumber);
    
    if (isNaN(num)) {
      alert('Invalid input! Please enter a valid number.');
      return;
    }

    if (!isFinite(num)) {
      alert('Number is too large or too small!');
      return;
    }

    const sigFigs = countSigFigs(inputNumber);
    const sci = toScientific(num, 6);
    const eng = toEngineering(num, 6);

    const result: ConversionResult = {
      standard: num.toLocaleString('en-US', { maximumFractionDigits: 20 }),
      scientific: `${sci.mantissa} × 10^${sci.exponent}`,
      engineering: `${eng.mantissa} × 10^${eng.exponent}`,
      significantFigures: sigFigs,
      explanation: `The number ${inputNumber} has ${sigFigs} significant figure${sigFigs !== 1 ? 's' : ''}. Scientific notation expresses it as ${sci.mantissa} × 10^${sci.exponent}, where the mantissa is between 1 and 10. Engineering notation uses exponents that are multiples of 3 (${eng.exponent}) for easier metric prefix conversion.`,
    };

    setConversionResult(result);
  };

  const handleArithmetic = () => {
    const num1 = parseScientific(sciNum1);
    const num2 = parseScientific(sciNum2);

    if (isNaN(num1) || isNaN(num2)) {
      alert('Invalid input! Please enter valid numbers in scientific notation.');
      return;
    }

    let result: number;
    let operationSymbol: string;
    let steps: string[] = [];

    const sci1 = toScientific(num1);
    const sci2 = toScientific(num2);

    switch (operation) {
      case 'add':
        result = num1 + num2;
        operationSymbol = '+';
        steps = [
          'Step 1: Convert both to standard form',
          `${sci1.mantissa} × 10^${sci1.exponent} = ${num1}`,
          `${sci2.mantissa} × 10^${sci2.exponent} = ${num2}`,
          'Step 2: Add the numbers',
          `${num1} + ${num2} = ${result}`,
          'Step 3: Convert back to scientific notation',
        ];
        break;
      case 'subtract':
        result = num1 - num2;
        operationSymbol = '-';
        steps = [
          'Step 1: Convert both to standard form',
          `${sci1.mantissa} × 10^${sci1.exponent} = ${num1}`,
          `${sci2.mantissa} × 10^${sci2.exponent} = ${num2}`,
          'Step 2: Subtract the numbers',
          `${num1} - ${num2} = ${result}`,
          'Step 3: Convert back to scientific notation',
        ];
        break;
      case 'multiply':
        result = num1 * num2;
        operationSymbol = '×';
        steps = [
          'Step 1: Multiply mantissas',
          `${sci1.mantissa} × ${sci2.mantissa} = ${sci1.mantissa * sci2.mantissa}`,
          'Step 2: Add exponents',
          `${sci1.exponent} + ${sci2.exponent} = ${sci1.exponent + sci2.exponent}`,
          'Step 3: Combine and adjust if needed',
        ];
        break;
      case 'divide':
        if (num2 === 0) {
          alert('Cannot divide by zero!');
          return;
        }
        result = num1 / num2;
        operationSymbol = '÷';
        steps = [
          'Step 1: Divide mantissas',
          `${sci1.mantissa} ÷ ${sci2.mantissa} = ${sci1.mantissa / sci2.mantissa}`,
          'Step 2: Subtract exponents',
          `${sci1.exponent} - ${sci2.exponent} = ${sci1.exponent - sci2.exponent}`,
          'Step 3: Combine and adjust if needed',
        ];
        break;
      default:
        return;
    }

    const finalSci = toScientific(result);

    setArithmeticResult({
      operation: `(${sci1.mantissa} × 10^${sci1.exponent}) ${operationSymbol} (${sci2.mantissa} × 10^${sci2.exponent})`,
      result: result.toLocaleString('en-US', { maximumFractionDigits: 20 }),
      scientific: `${finalSci.mantissa} × 10^${finalSci.exponent}`,
      steps,
    });
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
          title: 'Scientific Notation Calculator',
          text: 'Check out this Scientific Notation Calculator!',
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Tabs defaultValue="conversion" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 h-auto">
          <TabsTrigger value="conversion" className="py-3 px-2 text-sm sm:text-base">
            🔄 Conversion
          </TabsTrigger>
          <TabsTrigger value="arithmetic" className="py-3 px-2 text-sm sm:text-base">
            ➗ Arithmetic
          </TabsTrigger>
        </TabsList>

        <TabsContent value="conversion">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="text-xl">Input</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inputNumber" className="text-sm font-medium">
                    Number <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="inputNumber"
                    type="text"
                    value={inputNumber}
                    onChange={(e) => setInputNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                    placeholder="e.g., 123000 or 1.23E+5"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Enter a number in standard or scientific notation (E notation supported)
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Supported Formats:</p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Standard: 123000, 0.000123</li>
                    <li>• E notation: 1.23E+5, 1.23E-4</li>
                    <li>• Scientific: 1.23×10^5 (or 1.23×10^-4)</li>
                  </ul>
                </div>

                <Button
                  onClick={handleConversion}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Convert
                </Button>
              </CardContent>
            </Card>

            {conversionResult && (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="text-xl">Conversion Results</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-600 mb-2">Standard Notation:</p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-lg font-bold text-gray-900 break-all">
                          {conversionResult.standard}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(conversionResult.standard)}
                          className="flex-shrink-0 ml-2"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                      <p className="text-sm text-gray-600 mb-2">Scientific Notation:</p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-lg font-bold text-blue-700 break-all">
                          {conversionResult.scientific}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(conversionResult.scientific)}
                          className="flex-shrink-0 ml-2"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        E notation: {conversionResult.scientific.replace('×', 'E').replace('10^', '').replace(' ', '')}
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-lg border border-green-200 p-4">
                      <p className="text-sm text-gray-600 mb-2">Engineering Notation:</p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-lg font-bold text-green-700 break-all">
                          {conversionResult.engineering}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(conversionResult.engineering)}
                          className="flex-shrink-0 ml-2"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
                      <p className="text-sm text-gray-600 mb-2">Significant Figures:</p>
                      <span className="font-bold text-2xl text-purple-700">
                        {conversionResult.significantFigures}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-900 mb-2">Explanation:</p>
                      <p className="text-sm text-gray-700">{conversionResult.explanation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="arithmetic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-xl">Scientific Notation Arithmetic</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sciNum1" className="text-sm font-medium">
                    First Number <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="sciNum1"
                    type="text"
                    value={sciNum1}
                    onChange={(e) => setSciNum1(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
                    placeholder="e.g., 1.5E+10"
                    required
                  />
                  <p className="text-xs text-gray-500">Enter number in scientific notation</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sciNum2" className="text-sm font-medium">
                    Second Number <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="sciNum2"
                    type="text"
                    value={sciNum2}
                    onChange={(e) => setSciNum2(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
                    placeholder="e.g., 2.5E+8"
                    required
                  />
                  <p className="text-xs text-gray-500">Enter number in scientific notation</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Operation <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'add', label: 'Addition', icon: '➕' },
                      { value: 'subtract', label: 'Subtraction', icon: '➖' },
                      { value: 'multiply', label: 'Multiplication', icon: '✖️' },
                      { value: 'divide', label: 'Division', icon: '➗' },
                    ].map((op) => (
                      <button
                        key={op.value}
                        onClick={() => setOperation(op.value as any)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          operation === op.value
                            ? 'border-green-500 bg-green-50 text-green-700 font-semibold'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <span className="text-lg mr-1">{op.icon}</span>
                        {op.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleArithmetic}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 min-h-[44px]"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate
                </Button>
              </CardContent>
            </Card>

            {arithmeticResult && (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="text-xl">Result</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-2">Operation:</p>
                      <p className="font-mono text-sm text-gray-900 break-all">
                        {arithmeticResult.operation}
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-lg border-2 border-green-400 p-4">
                      <p className="text-sm text-gray-600 mb-2">Scientific Notation:</p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-green-700 break-all">
                          {arithmeticResult.scientific}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(arithmeticResult.scientific)}
                          className="flex-shrink-0 ml-2"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-600 mb-2">Standard Notation:</p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-lg font-bold text-gray-900 break-all">
                          {arithmeticResult.result}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(arithmeticResult.result)}
                          className="flex-shrink-0 ml-2"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-900 mb-3">Step-by-Step:</p>
                      <ol className="space-y-2">
                        {arithmeticResult.steps.map((step, index) => (
                          <li key={index} className="text-sm text-gray-700 font-mono">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="shadow-lg mt-6">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardTitle className="text-xl">Quick Reference</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-gray-900">Scientific Notation Rules</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Mantissa must be between 1 and 10</li>
                <li>• Format: a × 10^n where 1 ≤ |a| &lt; 10</li>
                <li>• Positive exponent: large numbers</li>
                <li>• Negative exponent: small numbers</li>
                <li>• E notation: 1.5E+10 = 1.5 × 10^10</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-gray-900">Engineering Notation</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Exponent is always a multiple of 3</li>
                <li>• Matches SI prefixes (k, M, G, m, μ, n)</li>
                <li>• Example: 1500 = 1.5 × 10^3 (1.5 k)</li>
                <li>• Easier for metric conversions</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-gray-900">Multiplication Rule</h4>
              <ul className="space-y-2 text-sm text-gray-700 font-mono">
                <li>• (a × 10^m) × (b × 10^n)</li>
                <li>• = (a × b) × 10^(m+n)</li>
                <li>• Example: (2×10^3) × (3×10^4)</li>
                <li>• = 6 × 10^7</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-gray-900">Division Rule</h4>
              <ul className="space-y-2 text-sm text-gray-700 font-mono">
                <li>• (a × 10^m) ÷ (b × 10^n)</li>
                <li>• = (a ÷ b) × 10^(m-n)</li>
                <li>• Example: (6×10^8) ÷ (2×10^3)</li>
                <li>• = 3 × 10^5</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

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

