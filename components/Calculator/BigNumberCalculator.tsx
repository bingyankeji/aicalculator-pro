'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, AlertCircle, Info } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface BigNumberResult {
  result: string;
  resultLength: number;
  scientificNotation: string;
  calculationTime: number;
  operation: string;
  operand1: string;
  operand2?: string;
  isPrime?: boolean;
  properties: string[];
}

export default function BigNumberCalculator() {
  const [x, setX] = useState('22');
  const [y, setY] = useState('12');
  const [precision, setPrecision] = useState('20');
  
  const [result, setResult] = useState<BigNumberResult | null>(null);
  const [error, setError] = useState('');
  
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/big-number-calculator',
    getShareParams: () => ({ x, y }),
    getShareText: () => result ? `Result: ${result.result}` : 'Calculate with big numbers!',
  });

  // BigInt operations
  const addBigInt = (a: string, b: string): string => {
    return (BigInt(a) + BigInt(b)).toString();
  };

  const subtractBigInt = (a: string, b: string): string => {
    return (BigInt(a) - BigInt(b)).toString();
  };

  const multiplyBigInt = (a: string, b: string): string => {
    return (BigInt(a) * BigInt(b)).toString();
  };

  const divideBigInt = (a: string, b: string): string => {
    const quotient = BigInt(a) / BigInt(b);
    const remainder = BigInt(a) % BigInt(b);
    return remainder === 0n ? quotient.toString() : `${quotient} R ${remainder}`;
  };

  const powerBigInt = (base: string, exp: string): string => {
    const expNum = parseInt(exp);
    if (isNaN(expNum) || expNum < 0) throw new Error('Invalid exponent');
    if (expNum === 0) return '1';
    if (expNum === 1) return base;
    if (expNum > 1000) throw new Error('Exponent too large (> 1000)');
    
    let result = BigInt(base);
    for (let i = 1; i < expNum; i++) {
      result *= BigInt(base);
      if (result.toString().length > 100000) {
        throw new Error('Result too large (> 100,000 digits)');
      }
    }
    return result.toString();
  };

  const sqrtBigInt = (n: string): string => {
    const num = BigInt(n);
    if (num < 0n) throw new Error('Cannot calculate square root of negative number');
    if (num === 0n) return '0';
    if (num === 1n) return '1';
    
    // Newton's method for integer square root
    let x = num;
    let y = (x + 1n) / 2n;
    
    while (y < x) {
      x = y;
      y = (x + num / x) / 2n;
    }
    
    return x.toString();
  };

  const modBigInt = (a: string, b: string): string => {
    return (BigInt(a) % BigInt(b)).toString();
  };

  const factorialBigInt = (n: number): string => {
    if (n < 0) throw new Error('Factorial not defined for negative numbers');
    if (n === 0 || n === 1) return '1';
    if (n > 10000) throw new Error('Factorial too large (n > 10,000)');
    
    let result = BigInt(1);
    for (let i = 2; i <= n; i++) {
      result *= BigInt(i);
    }
    return result.toString();
  };

  const gcdBigInt = (a: string, b: string): string => {
    let x = BigInt(a);
    let y = BigInt(b);
    
    while (y !== 0n) {
      const temp = y;
      y = x % y;
      x = temp;
    }
    return x.toString();
  };

  const lcmBigInt = (a: string, b: string): string => {
    const gcd = BigInt(gcdBigInt(a, b));
    return ((BigInt(a) * BigInt(b)) / gcd).toString();
  };

  const toScientificNotation = (numStr: string): string => {
    if (numStr.length <= 10) return numStr;
    
    const isNegative = numStr.startsWith('-');
    const absNum = isNegative ? numStr.substring(1) : numStr;
    const exponent = absNum.length - 1;
    const mantissa = absNum[0] + '.' + absNum.substring(1, 6);
    
    return `${isNegative ? '-' : ''}${mantissa} × 10^${exponent}`;
  };

  const formatResult = (numStr: string, maxLength: number = 100): string => {
    if (numStr.length <= maxLength) return numStr;
    const half = Math.floor(maxLength / 2);
    return `${numStr.substring(0, half)}...${numStr.substring(numStr.length - half)}`;
  };

  const performOperation = (op: string) => {
    setError('');
    const startTime = performance.now();
    
    try {
      const cleanX = x.replace(/[^0-9-]/g, '');
      const cleanY = y.replace(/[^0-9-]/g, '');
      
      if (!cleanX) {
        setError('Please enter X value');
        return;
      }
      
      let resultValue: string;
      let operationName: string;
      
      switch (op) {
        case 'add':
          if (!cleanY) { setError('Please enter Y value'); return; }
          resultValue = addBigInt(cleanX, cleanY);
          operationName = 'X + Y';
          break;
        case 'subtract':
          if (!cleanY) { setError('Please enter Y value'); return; }
          resultValue = subtractBigInt(cleanX, cleanY);
          operationName = 'X - Y';
          break;
        case 'multiply':
          if (!cleanY) { setError('Please enter Y value'); return; }
          resultValue = multiplyBigInt(cleanX, cleanY);
          operationName = 'X × Y';
          break;
        case 'divide':
          if (!cleanY) { setError('Please enter Y value'); return; }
          if (cleanY === '0') { setError('Cannot divide by zero'); return; }
          resultValue = divideBigInt(cleanX, cleanY);
          operationName = 'X / Y';
          break;
        case 'power':
          if (!cleanY) { setError('Please enter Y value'); return; }
          resultValue = powerBigInt(cleanX, cleanY);
          operationName = 'X^Y';
          break;
        case 'sqrt':
          resultValue = sqrtBigInt(cleanX);
          operationName = '√X';
          break;
        case 'square':
          resultValue = powerBigInt(cleanX, '2');
          operationName = 'X²';
          break;
        case 'factorial':
          const n = parseInt(cleanX);
          if (isNaN(n) || n < 0 || n > 10000) {
            setError('Factorial requires 0 ≤ n ≤ 10,000');
            return;
          }
          resultValue = factorialBigInt(n);
          operationName = 'X!';
          break;
        case 'mod':
          if (!cleanY) { setError('Please enter Y value'); return; }
          if (cleanY === '0') { setError('Cannot mod by zero'); return; }
          resultValue = modBigInt(cleanX, cleanY);
          operationName = 'X MOD Y';
          break;
        case 'gcd':
          if (!cleanY) { setError('Please enter Y value'); return; }
          resultValue = gcdBigInt(cleanX, cleanY);
          operationName = 'GCD(X, Y)';
          break;
        case 'lcm':
          if (!cleanY) { setError('Please enter Y value'); return; }
          resultValue = lcmBigInt(cleanX, cleanY);
          operationName = 'LCM(X, Y)';
          break;
        default:
          setError('Invalid operation');
          return;
      }
      
      const endTime = performance.now();
      setResult({
        result: resultValue,
        resultLength: resultValue.replace(/[^0-9]/g, '').length,
        scientificNotation: toScientificNotation(resultValue.split(' ')[0]),
        calculationTime: endTime - startTime,
        operation: operationName,
        operand1: cleanX,
        operand2: cleanY,
        properties: [],
      });
    } catch (err: any) {
      setError(err.message || 'Calculation error');
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
      });
      const link = document.createElement('a');
      link.download = `big-number-${operation}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
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
            <head><title>Big Number Calculation</title>
              <style>body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print { body { padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imgData}" onload="window.print();"/></body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1">
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">Big Number Operation</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* X Input */}
              <div className="space-y-2">
                <Label htmlFor="x" className="text-sm font-medium text-gray-700">
                  X =
                </Label>
                <input
                  id="x"
                  type="text"
                  value={x}
                  onChange={(e) => setX(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-lg"
                  placeholder="22"
                />
              </div>

              {/* Y Input */}
              <div className="space-y-2">
                <Label htmlFor="y" className="text-sm font-medium text-gray-700">
                  Y =
                </Label>
                <input
                  id="y"
                  type="text"
                  value={y}
                  onChange={(e) => setY(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-lg"
                  placeholder="12"
                />
              </div>

              {/* Precision Control */}
              <div className="space-y-2">
                <Label htmlFor="precision" className="text-sm font-medium text-gray-700">
                  Precision: <span className="font-mono">{precision}</span> digits
                </Label>
                <input
                  id="precision"
                  type="number"
                  value={precision}
                  onChange={(e) => setPrecision(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="100"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Operation Buttons */}
              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-gray-700 mb-3">Click the buttons below to calculate</p>
                
                <div className="grid grid-cols-3 gap-2">
                  {/* Row 1: Basic Operations */}
                  <Button onClick={() => performOperation('add')} className="bg-gray-700 hover:bg-gray-800 text-white">
                    X + Y
                  </Button>
                  <Button onClick={() => performOperation('subtract')} className="bg-gray-700 hover:bg-gray-800 text-white">
                    X - Y
                  </Button>
                  <Button onClick={() => performOperation('multiply')} className="bg-gray-700 hover:bg-gray-800 text-white">
                    X × Y
                  </Button>

                  {/* Row 2: Division & Power */}
                  <Button onClick={() => performOperation('divide')} className="bg-gray-700 hover:bg-gray-800 text-white">
                    X / Y
                  </Button>
                  <Button onClick={() => performOperation('power')} className="bg-gray-700 hover:bg-gray-800 text-white">
                    X^Y
                  </Button>
                  <Button onClick={() => performOperation('sqrt')} className="bg-gray-700 hover:bg-gray-800 text-white">
                    √X
                  </Button>

                  {/* Row 3: Special Operations */}
                  <Button onClick={() => performOperation('square')} className="bg-gray-700 hover:bg-gray-800 text-white">
                    X²
                  </Button>
                  <Button onClick={() => performOperation('factorial')} className="bg-gray-700 hover:bg-gray-800 text-white">
                    X!
                  </Button>
                  <Button onClick={() => performOperation('mod')} className="bg-gray-700 hover:bg-gray-800 text-white">
                    MOD
                  </Button>

                  {/* Row 4: GCD & LCM */}
                  <Button onClick={() => performOperation('gcd')} className="bg-gray-700 hover:bg-gray-800 text-white">
                    GCD
                  </Button>
                  <Button onClick={() => performOperation('lcm')} className="bg-gray-700 hover:bg-gray-800 text-white">
                    LCM
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          {result ? (
            <div className="space-y-6">
              {/* Result Display */}
              <Card className="border-gray-200">
                <CardHeader className="bg-blue-50 border-b border-blue-200">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900">Result</CardTitle>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{result.operation}</p>
                      <p className="text-xs text-gray-500">
                        {result.resultLength.toLocaleString()} digits · {result.calculationTime.toFixed(2)}ms
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Main Result */}
                  <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-4">
                    {result.resultLength <= 100 ? (
                      <p className="font-mono text-2xl text-gray-900 break-all text-center">
                        {result.result}
                      </p>
                    ) : (
                      <>
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-2">First 50 digits:</p>
                          <p className="font-mono text-base text-gray-900 break-all">
                            {result.result.substring(0, 50)}...
                          </p>
                        </div>
                        <div className="pt-4 border-t border-gray-300">
                          <p className="text-xs text-gray-500 mb-2">Last 50 digits:</p>
                          <p className="font-mono text-base text-gray-900 break-all">
                            ...{result.result.substring(result.result.length - 50)}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Scientific Notation */}
                  {result.resultLength > 10 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700 mb-1">Scientific Notation:</p>
                      <p className="font-mono text-lg text-blue-900">{result.scientificNotation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">ℹ️ About Big Numbers</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600">🔐</span>
                      <div>
                        <p className="font-semibold">Cryptography</p>
                        <p className="text-xs text-gray-600">RSA keys, blockchain</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">🔢</span>
                      <div>
                        <p className="font-semibold">Mathematics</p>
                        <p className="text-xs text-gray-600">Factorials, number theory</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-600">🌌</span>
                      <div>
                        <p className="font-semibold">Science</p>
                        <p className="text-xs text-gray-600">Astronomy, statistics</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600">💻</span>
                      <div>
                        <p className="font-semibold">Computing</p>
                        <p className="text-xs text-gray-600">Finance, databases</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={handleSaveAsImage} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Save Image
                </Button>
                <Button onClick={handlePrint} variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button onClick={handleShare} variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          ) : (
            <Card className="border-gray-200">
              <CardContent className="p-12 text-center text-gray-500">
                <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Enter numbers and select operation</p>
                <p className="text-sm mt-2">Handle numbers with millions of digits!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Big Number Calculator"
      />
    </div>
  );
}

