'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Copy, Share2, Printer } from 'lucide-react';

interface ConversionResult {
  binary: string;
  decimal: string;
  octal: string;
  hexadecimal: string;
}

interface BitwiseResult {
  operation: string;
  result: string;
}

export function BinaryCalculator() {
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState<'binary' | 'decimal' | 'octal' | 'hex'>('binary');
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [arithmeticOperation, setArithmeticOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [arithmeticResult, setArithmeticResult] = useState('');
  
  const [bitwiseNum1, setBitwiseNum1] = useState('');
  const [bitwiseNum2, setBitwiseNum2] = useState('');
  const [bitwiseOperation, setBitwiseOperation] = useState<'and' | 'or' | 'xor' | 'not'>('and');
  const [bitwiseResult, setBitwiseResult] = useState<BitwiseResult | null>(null);

  // 验证输入
  const validateInput = (value: string, type: string): boolean => {
    if (!value) return false;
    
    switch (type) {
      case 'binary':
        return /^[01]+$/.test(value);
      case 'decimal':
        return /^\d+$/.test(value);
      case 'octal':
        return /^[0-7]+$/.test(value);
      case 'hex':
        return /^[0-9A-Fa-f]+$/.test(value);
      default:
        return false;
    }
  };

  // 转换函数
  const convertToDecimal = (value: string, type: string): number => {
    switch (type) {
      case 'binary':
        return parseInt(value, 2);
      case 'decimal':
        return parseInt(value, 10);
      case 'octal':
        return parseInt(value, 8);
      case 'hex':
        return parseInt(value, 16);
      default:
        return 0;
    }
  };

  const decimalToBinary = (num: number): string => {
    return num.toString(2);
  };

  const decimalToOctal = (num: number): string => {
    return num.toString(8);
  };

  const decimalToHex = (num: number): string => {
    return num.toString(16).toUpperCase();
  };

  // 进制转换计算
  const handleConversion = () => {
    if (!validateInput(inputValue, inputType)) {
      alert(`Invalid ${inputType} input!`);
      return;
    }

    const decimal = convertToDecimal(inputValue, inputType);
    
    const result: ConversionResult = {
      binary: decimalToBinary(decimal),
      decimal: decimal.toString(),
      octal: decimalToOctal(decimal),
      hexadecimal: decimalToHex(decimal),
    };

    setConversionResult(result);
  };

  // 二进制算术运算
  const handleArithmetic = () => {
    if (!validateInput(num1, 'binary') || !validateInput(num2, 'binary')) {
      alert('Invalid binary input!');
      return;
    }

    const dec1 = parseInt(num1, 2);
    const dec2 = parseInt(num2, 2);
    let result = 0;

    switch (arithmeticOperation) {
      case 'add':
        result = dec1 + dec2;
        break;
      case 'subtract':
        result = dec1 - dec2;
        break;
      case 'multiply':
        result = dec1 * dec2;
        break;
      case 'divide':
        result = Math.floor(dec1 / dec2);
        break;
    }

    setArithmeticResult(result >= 0 ? decimalToBinary(result) : 'Negative result');
  };

  // 位运算
  const handleBitwise = () => {
    if (!validateInput(bitwiseNum1, 'binary')) {
      alert('Invalid binary input for first number!');
      return;
    }

    const dec1 = parseInt(bitwiseNum1, 2);
    let result = 0;
    let operation = '';

    if (bitwiseOperation === 'not') {
      // NOT operation (one's complement)
      const bits = bitwiseNum1.length;
      result = (~dec1) & ((1 << bits) - 1);
      operation = `NOT ${bitwiseNum1}`;
    } else {
      if (!validateInput(bitwiseNum2, 'binary')) {
        alert('Invalid binary input for second number!');
        return;
      }

      const dec2 = parseInt(bitwiseNum2, 2);

      switch (bitwiseOperation) {
        case 'and':
          result = dec1 & dec2;
          operation = `${bitwiseNum1} AND ${bitwiseNum2}`;
          break;
        case 'or':
          result = dec1 | dec2;
          operation = `${bitwiseNum1} OR ${bitwiseNum2}`;
          break;
        case 'xor':
          result = dec1 ^ dec2;
          operation = `${bitwiseNum1} XOR ${bitwiseNum2}`;
          break;
      }
    }

    setBitwiseResult({
      operation,
      result: decimalToBinary(result),
    });
  };

  // 复制到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // 打印
  const handlePrint = () => {
    window.print();
  };

  // 分享
  const handleShare = async () => {
    const shareData = {
      title: 'Binary Calculator',
      text: 'Check out this Binary Calculator for number system conversion and bitwise operations!',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // 复制链接到剪贴板
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Tabs for different calculators */}
      <Tabs defaultValue="conversion" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 h-auto">
          <TabsTrigger value="conversion" className="py-3 px-2 text-sm sm:text-base">
            🔢 Number Conversion
          </TabsTrigger>
          <TabsTrigger value="arithmetic" className="py-3 px-2 text-sm sm:text-base">
            ➕ Binary Arithmetic
          </TabsTrigger>
          <TabsTrigger value="bitwise" className="py-3 px-2 text-sm sm:text-base">
            ⚙️ Bitwise Operations
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Number System Conversion */}
        <TabsContent value="conversion">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Input Section */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl">Input</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inputValue" className="text-sm font-medium">
                Input Value <span className="text-red-500">*</span>
              </Label>
              <input
                id="inputValue"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                placeholder="Enter value"
                required
              />
              <p className="text-xs text-gray-500">Enter the number you want to convert</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inputType" className="text-sm font-medium">
                Input Type <span className="text-red-500">*</span>
              </Label>
              <select
                id="inputType"
                value={inputType}
                onChange={(e) => setInputType(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="binary">Binary (Base 2)</option>
                <option value="decimal">Decimal (Base 10)</option>
                <option value="octal">Octal (Base 8)</option>
                <option value="hex">Hexadecimal (Base 16)</option>
              </select>
              <p className="text-xs text-gray-500">Select the number system of your input</p>
            </div>
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

            {/* Right: Results Section */}
            {conversionResult && (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl">Conversion Results</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                      <span className="font-medium text-gray-700 mb-2 sm:mb-0">Binary (Base 2):</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-blue-600 break-all">
                          {conversionResult.binary}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(conversionResult.binary)}
                          className="flex-shrink-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                      <span className="font-medium text-gray-700 mb-2 sm:mb-0">Decimal (Base 10):</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-blue-600 break-all">
                          {conversionResult.decimal}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(conversionResult.decimal)}
                          className="flex-shrink-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                      <span className="font-medium text-gray-700 mb-2 sm:mb-0">Octal (Base 8):</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-blue-600 break-all">
                          {conversionResult.octal}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(conversionResult.octal)}
                          className="flex-shrink-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                      <span className="font-medium text-gray-700 mb-2 sm:mb-0">Hexadecimal (Base 16):</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-blue-600 break-all">
                          {conversionResult.hexadecimal}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(conversionResult.hexadecimal)}
                          className="flex-shrink-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Tab 2: Binary Arithmetic */}
        <TabsContent value="arithmetic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Input Section */}
            <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="text-xl">Binary Arithmetic</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="num1" className="text-sm font-medium">
                First Binary Number <span className="text-red-500">*</span>
              </Label>
              <input
                id="num1"
                type="text"
                value={num1}
                onChange={(e) => setNum1(e.target.value.replace(/[^01]/g, ''))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                placeholder="e.g., 1010"
                required
              />
              <p className="text-xs text-gray-500">Enter first binary number (only 0 and 1)</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="num2" className="text-sm font-medium">
                Second Binary Number <span className="text-red-500">*</span>
              </Label>
              <input
                id="num2"
                type="text"
                value={num2}
                onChange={(e) => setNum2(e.target.value.replace(/[^01]/g, ''))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                placeholder="e.g., 0110"
                required
              />
              <p className="text-xs text-gray-500">Enter second binary number (only 0 and 1)</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Operation <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Button
                  variant={arithmeticOperation === 'add' ? 'default' : 'outline'}
                  onClick={() => setArithmeticOperation('add')}
                  className="w-full min-h-[44px]"
                >
                  Add (+)
                </Button>
                <Button
                  variant={arithmeticOperation === 'subtract' ? 'default' : 'outline'}
                  onClick={() => setArithmeticOperation('subtract')}
                  className="w-full min-h-[44px]"
                >
                  Subtract (-)
                </Button>
                <Button
                  variant={arithmeticOperation === 'multiply' ? 'default' : 'outline'}
                  onClick={() => setArithmeticOperation('multiply')}
                  className="w-full min-h-[44px]"
                >
                  Multiply (×)
                </Button>
                <Button
                  variant={arithmeticOperation === 'divide' ? 'default' : 'outline'}
                  onClick={() => setArithmeticOperation('divide')}
                  className="w-full min-h-[44px]"
                >
                  Divide (÷)
                </Button>
              </div>
              <p className="text-xs text-gray-500">Select the arithmetic operation to perform</p>
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

            {/* Right: Results Section */}
            {arithmeticResult && (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="text-xl">Arithmetic Result</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="bg-green-50 rounded-lg border border-green-200 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="font-semibold text-lg mb-2 sm:mb-0">Binary Result:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-green-700 break-all">
                          {arithmeticResult}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(arithmeticResult)}
                          className="flex-shrink-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-green-300">
                      <span className="text-sm text-gray-600">
                        Decimal: {parseInt(arithmeticResult === 'Negative result' ? '0' : arithmeticResult, 2) || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Tab 3: Bitwise Operations */}
        <TabsContent value="bitwise">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Input Section */}
            <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="text-xl">Bitwise Operations</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bitwiseNum1" className="text-sm font-medium">
                First Binary Number <span className="text-red-500">*</span>
              </Label>
              <input
                id="bitwiseNum1"
                type="text"
                value={bitwiseNum1}
                onChange={(e) => setBitwiseNum1(e.target.value.replace(/[^01]/g, ''))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                placeholder="e.g., 1010"
                required
              />
              <p className="text-xs text-gray-500">Enter first binary number (only 0 and 1)</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bitwiseNum2" className="text-sm font-medium">
                Second Binary Number <span className="text-gray-500 text-xs">- Optional (not needed for NOT)</span>
              </Label>
              <input
                id="bitwiseNum2"
                type="text"
                value={bitwiseNum2}
                onChange={(e) => setBitwiseNum2(e.target.value.replace(/[^01]/g, ''))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="e.g., 0110"
                disabled={bitwiseOperation === 'not'}
              />
              <p className="text-xs text-gray-500">
                {bitwiseOperation === 'not' 
                  ? 'NOT operation only needs one number' 
                  : 'Enter second binary number for AND, OR, XOR operations'}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Bitwise Operation <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Button
                  variant={bitwiseOperation === 'and' ? 'default' : 'outline'}
                  onClick={() => setBitwiseOperation('and')}
                  className="w-full min-h-[44px]"
                >
                  AND
                </Button>
                <Button
                  variant={bitwiseOperation === 'or' ? 'default' : 'outline'}
                  onClick={() => setBitwiseOperation('or')}
                  className="w-full min-h-[44px]"
                >
                  OR
                </Button>
                <Button
                  variant={bitwiseOperation === 'xor' ? 'default' : 'outline'}
                  onClick={() => setBitwiseOperation('xor')}
                  className="w-full min-h-[44px]"
                >
                  XOR
                </Button>
                <Button
                  variant={bitwiseOperation === 'not' ? 'default' : 'outline'}
                  onClick={() => setBitwiseOperation('not')}
                  className="w-full min-h-[44px]"
                >
                  NOT
                </Button>
              </div>
              <p className="text-xs text-gray-500">Select the bitwise operation to perform</p>
            </div>
          </div>

          <Button
            onClick={handleBitwise}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 min-h-[44px]"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate
          </Button>
            </CardContent>
          </Card>

            {/* Right: Results Section */}
            {bitwiseResult && (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="text-xl">Bitwise Operation Result</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="bg-purple-50 rounded-lg border border-purple-200 p-4 sm:p-6">
                    <div className="mb-4">
                      <span className="font-semibold text-gray-700">Operation:</span>
                      <div className="font-mono text-sm sm:text-base mt-1 text-gray-900">
                        {bitwiseResult.operation}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-3 border-t border-purple-300">
                      <span className="font-semibold text-lg mb-2 sm:mb-0">Binary Result:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-purple-700 break-all">
                          {bitwiseResult.result}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(bitwiseResult.result)}
                          className="flex-shrink-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-purple-300">
                      <span className="text-sm text-gray-600">
                        Decimal: {parseInt(bitwiseResult.result, 2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Reference - Outside of tabs, always visible */}
      <Card className="shadow-lg mt-6">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardTitle className="text-xl">Quick Reference</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Number Systems</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>Binary (Base 2):</strong> Uses digits 0-1</li>
                <li>• <strong>Octal (Base 8):</strong> Uses digits 0-7</li>
                <li>• <strong>Decimal (Base 10):</strong> Uses digits 0-9</li>
                <li>• <strong>Hexadecimal (Base 16):</strong> Uses 0-9, A-F</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Bitwise Operations</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>AND:</strong> Both bits must be 1</li>
                <li>• <strong>OR:</strong> At least one bit must be 1</li>
                <li>• <strong>XOR:</strong> Bits must be different</li>
                <li>• <strong>NOT:</strong> Inverts all bits</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
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
  );
}

