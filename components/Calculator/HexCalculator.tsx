'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Copy, Share2, Printer, Palette } from 'lucide-react';

interface ConversionResult {
  hex: string;
  decimal: string;
  binary: string;
  octal: string;
}

interface ColorResult {
  hex: string;
  r: number;
  g: number;
  b: number;
}

interface BitwiseResult {
  operation: string;
  result: string;
}

export default function HexCalculator() {
  // Number System Conversion
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState<'hex' | 'decimal' | 'binary' | 'octal'>('hex');
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);

  // Hex Arithmetic
  const [hexNum1, setHexNum1] = useState('');
  const [hexNum2, setHexNum2] = useState('');
  const [arithmeticOperation, setArithmeticOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [arithmeticResult, setArithmeticResult] = useState('');

  // Color Converter
  const [colorMode, setColorMode] = useState<'hex-to-rgb' | 'rgb-to-hex'>('hex-to-rgb');
  const [hexColor, setHexColor] = useState('');
  const [rgbR, setRgbR] = useState('');
  const [rgbG, setRgbG] = useState('');
  const [rgbB, setRgbB] = useState('');
  const [colorResult, setColorResult] = useState<ColorResult | null>(null);

  // Bitwise Operations
  const [bitwiseHex1, setBitwiseHex1] = useState('');
  const [bitwiseHex2, setBitwiseHex2] = useState('');
  const [bitwiseOperation, setBitwiseOperation] = useState<'and' | 'or' | 'xor' | 'not'>('and');
  const [bitwiseResult, setBitwiseResult] = useState<BitwiseResult | null>(null);

  // Validation functions
  const validateInput = (value: string, type: string): boolean => {
    if (!value) return false;
    
    switch (type) {
      case 'hex':
        return /^[0-9A-Fa-f]+$/.test(value);
      case 'decimal':
        return /^\d+$/.test(value);
      case 'binary':
        return /^[01]+$/.test(value);
      case 'octal':
        return /^[0-7]+$/.test(value);
      default:
        return false;
    }
  };

  // Conversion functions
  const convertToDecimal = (value: string, type: string): number => {
    switch (type) {
      case 'hex':
        return parseInt(value, 16);
      case 'decimal':
        return parseInt(value, 10);
      case 'binary':
        return parseInt(value, 2);
      case 'octal':
        return parseInt(value, 8);
      default:
        return 0;
    }
  };

  const decimalToHex = (num: number): string => {
    return num.toString(16).toUpperCase();
  };

  const decimalToBinary = (num: number): string => {
    return num.toString(2);
  };

  const decimalToOctal = (num: number): string => {
    return num.toString(8);
  };

  // Number System Conversion
  const handleConversion = () => {
    if (!validateInput(inputValue, inputType)) {
      alert(`Invalid ${inputType} input! ${getInputHelp(inputType)}`);
      return;
    }

    const decimal = convertToDecimal(inputValue, inputType);
    
    const result: ConversionResult = {
      hex: decimalToHex(decimal),
      decimal: decimal.toString(),
      binary: decimalToBinary(decimal),
      octal: decimalToOctal(decimal),
    };

    setConversionResult(result);
  };

  const getInputHelp = (type: string): string => {
    switch (type) {
      case 'hex':
        return '\n\nHexadecimal can only contain 0-9 and A-F.\n十六进制只能包含 0-9 和 A-F。\n\nExample: 1A2B, FF00, CAFE';
      case 'decimal':
        return '\n\nDecimal can only contain digits 0-9.\n十进制只能包含数字 0-9。\n\nExample: 123, 456, 789';
      case 'binary':
        return '\n\nBinary can only contain 0 and 1.\n二进制只能包含 0 和 1。\n\nExample: 1100, 1010';
      case 'octal':
        return '\n\nOctal can only contain digits 0-7.\n八进制只能包含数字 0-7。\n\nExample: 123, 456, 701';
      default:
        return '';
    }
  };

  // Hex Arithmetic
  const handleArithmetic = () => {
    if (!validateInput(hexNum1, 'hex') || !validateInput(hexNum2, 'hex')) {
      alert('Invalid hexadecimal input!\n\n无效的十六进制输入！\n\nHex numbers can only contain 0-9 and A-F.');
      return;
    }

    const dec1 = parseInt(hexNum1, 16);
    const dec2 = parseInt(hexNum2, 16);
    let result: number;

    switch (arithmeticOperation) {
      case 'add':
        result = dec1 + dec2;
        break;
      case 'subtract':
        result = dec1 - dec2;
        if (result < 0) {
          setArithmeticResult('Negative result');
          return;
        }
        break;
      case 'multiply':
        result = dec1 * dec2;
        break;
      case 'divide':
        if (dec2 === 0) {
          alert('Cannot divide by zero!');
          return;
        }
        result = Math.floor(dec1 / dec2);
        break;
      default:
        result = 0;
    }

    setArithmeticResult(decimalToHex(result));
  };

  // Color Converter
  const handleColorConversion = () => {
    if (colorMode === 'hex-to-rgb') {
      const cleanHex = hexColor.replace('#', '');
      if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
        alert('Invalid hex color! Must be 6 characters (RRGGBB).\n\n无效的十六进制颜色！必须是6个字符（RRGGBB）。\n\nExample: FF0000, 00FF00, 0000FF');
        return;
      }

      const r = parseInt(cleanHex.substring(0, 2), 16);
      const g = parseInt(cleanHex.substring(2, 4), 16);
      const b = parseInt(cleanHex.substring(4, 6), 16);

      setColorResult({
        hex: '#' + cleanHex.toUpperCase(),
        r,
        g,
        b,
      });
    } else {
      const r = parseInt(rgbR);
      const g = parseInt(rgbG);
      const b = parseInt(rgbB);

      if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        alert('Invalid RGB values! Each value must be between 0 and 255.\n\n无效的RGB值！每个值必须在0到255之间。');
        return;
      }

      const hex = '#' + 
        r.toString(16).padStart(2, '0').toUpperCase() +
        g.toString(16).padStart(2, '0').toUpperCase() +
        b.toString(16).padStart(2, '0').toUpperCase();

      setColorResult({
        hex,
        r,
        g,
        b,
      });
    }
  };

  // Bitwise Operations
  const handleBitwise = () => {
    if (!validateInput(bitwiseHex1, 'hex')) {
      alert('Invalid first hexadecimal input!');
      return;
    }

    if (bitwiseOperation !== 'not' && !validateInput(bitwiseHex2, 'hex')) {
      alert('Invalid second hexadecimal input!');
      return;
    }

    const dec1 = parseInt(bitwiseHex1, 16);
    const dec2 = bitwiseOperation !== 'not' ? parseInt(bitwiseHex2, 16) : 0;
    let result: number;
    let operationText: string;

    switch (bitwiseOperation) {
      case 'and':
        result = dec1 & dec2;
        operationText = `${bitwiseHex1} AND ${bitwiseHex2} = ${decimalToHex(result)}`;
        break;
      case 'or':
        result = dec1 | dec2;
        operationText = `${bitwiseHex1} OR ${bitwiseHex2} = ${decimalToHex(result)}`;
        break;
      case 'xor':
        result = dec1 ^ dec2;
        operationText = `${bitwiseHex1} XOR ${bitwiseHex2} = ${decimalToHex(result)}`;
        break;
      case 'not':
        result = ~dec1 >>> 0; // Use unsigned right shift to get positive result
        operationText = `NOT ${bitwiseHex1} = ${decimalToHex(result)}`;
        break;
      default:
        result = 0;
        operationText = '';
    }

    setBitwiseResult({
      operation: operationText,
      result: decimalToHex(result),
    });
  };

  // Utility functions
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
          title: 'Hex Calculator',
          text: 'Check out this Hex Calculator!',
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
      {/* Tabs for different calculators */}
      <Tabs defaultValue="conversion" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6 h-auto">
          <TabsTrigger value="conversion" className="py-3 px-2 text-xs sm:text-sm md:text-base">
            🔢 Conversion
          </TabsTrigger>
          <TabsTrigger value="arithmetic" className="py-3 px-2 text-xs sm:text-sm md:text-base">
            ➕ Arithmetic
          </TabsTrigger>
          <TabsTrigger value="color" className="py-3 px-2 text-xs sm:text-sm md:text-base">
            🎨 Color
          </TabsTrigger>
          <TabsTrigger value="bitwise" className="py-3 px-2 text-xs sm:text-sm md:text-base">
            ⚙️ Bitwise
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Number System Conversion */}
        <TabsContent value="conversion">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Input Section */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="hex">Hexadecimal (Base 16)</option>
                      <option value="decimal">Decimal (Base 10)</option>
                      <option value="binary">Binary (Base 2)</option>
                      <option value="octal">Octal (Base 8)</option>
                    </select>
                    <p className="text-xs text-gray-500">Select the number system of your input</p>
                  </div>
                </div>

                <Button
                  onClick={handleConversion}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 min-h-[44px]"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Convert
                </Button>
              </CardContent>
            </Card>

            {/* Right: Results Section */}
            {conversionResult && (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
                  <CardTitle className="text-xl">Conversion Results</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                      <span className="font-medium text-gray-700 mb-2 sm:mb-0">Hexadecimal (Base 16):</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-purple-600 break-all">
                          {conversionResult.hex}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(conversionResult.hex)}
                          className="flex-shrink-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                      <span className="font-medium text-gray-700 mb-2 sm:mb-0">Decimal (Base 10):</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-purple-600 break-all">
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
                      <span className="font-medium text-gray-700 mb-2 sm:mb-0">Binary (Base 2):</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-purple-600 break-all">
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
                      <span className="font-medium text-gray-700 mb-2 sm:mb-0">Octal (Base 8):</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-purple-600 break-all">
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
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Tab 2: Hex Arithmetic */}
        <TabsContent value="arithmetic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Input Section */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-xl">Hex Arithmetic</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hexNum1" className="text-sm font-medium">
                      First Hex Number <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="hexNum1"
                      type="text"
                      value={hexNum1}
                      onChange={(e) => setHexNum1(e.target.value.toUpperCase().replace(/[^0-9A-F]/g, ''))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
                      placeholder="e.g., 1A2B"
                      required
                    />
                    <p className="text-xs text-gray-500">Enter first hexadecimal number (0-9, A-F)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hexNum2" className="text-sm font-medium">
                      Second Hex Number <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="hexNum2"
                      type="text"
                      value={hexNum2}
                      onChange={(e) => setHexNum2(e.target.value.toUpperCase().replace(/[^0-9A-F]/g, ''))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
                      placeholder="e.g., FF00"
                      required
                    />
                    <p className="text-xs text-gray-500">Enter second hexadecimal number (0-9, A-F)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="arithmeticOp" className="text-sm font-medium">
                      Operation <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 'add', label: '+ Addition', icon: '➕' },
                        { value: 'subtract', label: '− Subtraction', icon: '➖' },
                        { value: 'multiply', label: '× Multiplication', icon: '✖️' },
                        { value: 'divide', label: '÷ Division', icon: '➗' },
                      ].map((op) => (
                        <button
                          key={op.value}
                          onClick={() => setArithmeticOperation(op.value as any)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            arithmeticOperation === op.value
                              ? 'border-green-500 bg-green-50 text-green-700 font-semibold'
                              : 'border-gray-200 hover:border-green-300'
                          }`}
                        >
                          <span className="text-lg mr-1">{op.icon}</span>
                          {op.label}
                        </button>
                      ))}
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
                      <span className="font-semibold text-lg mb-2 sm:mb-0">Hex Result:</span>
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
                        Decimal: {arithmeticResult === 'Negative result' ? 'N/A' : parseInt(arithmeticResult, 16)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Tab 3: Color Converter */}
        <TabsContent value="color">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Input Section */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Color Converter
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Conversion Mode</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setColorMode('hex-to-rgb')}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          colorMode === 'hex-to-rgb'
                            ? 'border-pink-500 bg-pink-50 text-pink-700 font-semibold'
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        Hex → RGB
                      </button>
                      <button
                        onClick={() => setColorMode('rgb-to-hex')}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          colorMode === 'rgb-to-hex'
                            ? 'border-pink-500 bg-pink-50 text-pink-700 font-semibold'
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        RGB → Hex
                      </button>
                    </div>
                  </div>

                  {colorMode === 'hex-to-rgb' ? (
                    <div className="space-y-2">
                      <Label htmlFor="hexColor" className="text-sm font-medium">
                        Hex Color Code <span className="text-red-500">*</span>
                      </Label>
                      <input
                        id="hexColor"
                        type="text"
                        value={hexColor}
                        onChange={(e) => setHexColor(e.target.value.toUpperCase())}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-mono"
                        placeholder="#FF0000 or FF0000"
                        required
                      />
                      <p className="text-xs text-gray-500">Enter 6-character hex color (with or without #)</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="rgbR" className="text-sm font-medium">
                          Red (R) <span className="text-red-500">*</span>
                        </Label>
                        <input
                          id="rgbR"
                          type="number"
                          min="0"
                          max="255"
                          value={rgbR}
                          onChange={(e) => setRgbR(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="0-255"
                          required
                        />
                        <p className="text-xs text-gray-500">Red value (0-255)</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rgbG" className="text-sm font-medium">
                          Green (G) <span className="text-red-500">*</span>
                        </Label>
                        <input
                          id="rgbG"
                          type="number"
                          min="0"
                          max="255"
                          value={rgbG}
                          onChange={(e) => setRgbG(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="0-255"
                          required
                        />
                        <p className="text-xs text-gray-500">Green value (0-255)</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rgbB" className="text-sm font-medium">
                          Blue (B) <span className="text-red-500">*</span>
                        </Label>
                        <input
                          id="rgbB"
                          type="number"
                          min="0"
                          max="255"
                          value={rgbB}
                          onChange={(e) => setRgbB(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="0-255"
                          required
                        />
                        <p className="text-xs text-gray-500">Blue value (0-255)</p>
                      </div>
                    </>
                  )}
                </div>

                <Button
                  onClick={handleColorConversion}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 min-h-[44px]"
                >
                  <Palette className="h-5 w-5 mr-2" />
                  Convert Color
                </Button>
              </CardContent>
            </Card>

            {/* Right: Results Section */}
            {colorResult && (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
                  <CardTitle className="text-xl">Color Result</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    {/* Color Preview */}
                    <div className="relative">
                      <div
                        className="w-full h-32 rounded-lg border-2 border-gray-200 shadow-inner"
                        style={{ backgroundColor: colorResult.hex }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-white/90 px-4 py-2 rounded-lg font-mono font-bold text-lg shadow">
                          {colorResult.hex}
                        </span>
                      </div>
                    </div>

                    {/* Values */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-700">Hex:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-pink-600">{colorResult.hex}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(colorResult.hex)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-700">RGB:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-pink-600">
                            rgb({colorResult.r}, {colorResult.g}, {colorResult.b})
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(`rgb(${colorResult.r}, ${colorResult.g}, ${colorResult.b})`)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-center">
                          <div className="text-xs text-gray-600 mb-1">Red</div>
                          <div className="font-mono font-bold text-red-700">{colorResult.r}</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-center">
                          <div className="text-xs text-gray-600 mb-1">Green</div>
                          <div className="font-mono font-bold text-green-700">{colorResult.g}</div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                          <div className="text-xs text-gray-600 mb-1">Blue</div>
                          <div className="font-mono font-bold text-blue-700">{colorResult.b}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Tab 4: Bitwise Operations */}
        <TabsContent value="bitwise">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Input Section */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                <CardTitle className="text-xl">Bitwise Operations</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bitwiseHex1" className="text-sm font-medium">
                      First Hex Number <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="bitwiseHex1"
                      type="text"
                      value={bitwiseHex1}
                      onChange={(e) => setBitwiseHex1(e.target.value.toUpperCase().replace(/[^0-9A-F]/g, ''))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono"
                      placeholder="e.g., FF"
                      required
                    />
                    <p className="text-xs text-gray-500">Enter first hexadecimal number</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bitwiseHex2" className="text-sm font-medium">
                      Second Hex Number <span className="text-gray-500 text-xs">- Optional (not needed for NOT)</span>
                    </Label>
                    <input
                      id="bitwiseHex2"
                      type="text"
                      value={bitwiseHex2}
                      onChange={(e) => setBitwiseHex2(e.target.value.toUpperCase().replace(/[^0-9A-F]/g, ''))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="e.g., 0F"
                      disabled={bitwiseOperation === 'not'}
                    />
                    <p className="text-xs text-gray-500">
                      {bitwiseOperation === 'not'
                        ? 'NOT operation only needs one number'
                        : 'Enter second hexadecimal number for AND, OR, XOR operations'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Operation <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 'and', label: 'AND', desc: 'Both bits 1' },
                        { value: 'or', label: 'OR', desc: 'Any bit 1' },
                        { value: 'xor', label: 'XOR', desc: 'Different bits' },
                        { value: 'not', label: 'NOT', desc: 'Invert bits' },
                      ].map((op) => (
                        <button
                          key={op.value}
                          onClick={() => setBitwiseOperation(op.value as any)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            bitwiseOperation === op.value
                              ? 'border-orange-500 bg-orange-50 text-orange-700 font-semibold'
                              : 'border-gray-200 hover:border-orange-300'
                          }`}
                        >
                          <div className="font-bold text-lg">{op.label}</div>
                          <div className="text-xs text-gray-600">{op.desc}</div>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Select the bitwise operation to perform</p>
                  </div>
                </div>

                <Button
                  onClick={handleBitwise}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 min-h-[44px]"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate
                </Button>
              </CardContent>
            </Card>

            {/* Right: Results Section */}
            {bitwiseResult && (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                  <CardTitle className="text-xl">Bitwise Operation Result</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="bg-orange-50 rounded-lg border border-orange-200 p-4 sm:p-6">
                    <div className="mb-4">
                      <span className="font-semibold text-gray-700">Operation:</span>
                      <div className="font-mono text-sm sm:text-base mt-1 text-gray-900">
                        {bitwiseResult.operation}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-3 border-t border-orange-300">
                      <span className="font-semibold text-lg mb-2 sm:mb-0">Hex Result:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-orange-700 break-all">
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
                    <div className="mt-3 pt-3 border-t border-orange-300">
                      <span className="text-sm text-gray-600">
                        Decimal: {parseInt(bitwiseResult.result, 16)}
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
              <h4 className="font-semibold mb-2">Number Systems</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>Hexadecimal (Base 16):</strong> Uses digits 0-9, A-F</li>
                <li>• <strong>Decimal (Base 10):</strong> Uses digits 0-9</li>
                <li>• <strong>Binary (Base 2):</strong> Uses digits 0-1</li>
                <li>• <strong>Octal (Base 8):</strong> Uses digits 0-7</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Bitwise Operations</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>AND:</strong> Both bits must be 1</li>
                <li>• <strong>OR:</strong> At least one bit must be 1</li>
                <li>• <strong>XOR:</strong> Bits must be different</li>
                <li>• <strong>NOT:</strong> Inverts all bits</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Common Hex Values</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>FF:</strong> 255 (decimal)</li>
                <li>• <strong>100:</strong> 256 (decimal)</li>
                <li>• <strong>FFFF:</strong> 65535 (decimal)</li>
                <li>• <strong>1000:</strong> 4096 (decimal)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Color Codes</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>#FF0000:</strong> Red</li>
                <li>• <strong>#00FF00:</strong> Green</li>
                <li>• <strong>#0000FF:</strong> Blue</li>
                <li>• <strong>#FFFFFF:</strong> White</li>
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

