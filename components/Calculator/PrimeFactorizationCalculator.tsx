'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface PrimeFactor {
  factor: number;
  exponent: number;
}

interface FactorTreeNode {
  value: number;
  isPrime: boolean;
  children?: FactorTreeNode[];
}

interface CalculationResult {
  number: number;
  isPrime: boolean;
  primeFactors: PrimeFactor[];
  standardForm: string;
  allFactors: number[];
  factorCount: number;
  totalPrimeFactors: number; // 质因数总个数（含重复）
  uniquePrimeCount: number; // 不同质因数的个数
  isPerfectSquare: boolean; // 是否为完全平方数
  factorTree: FactorTreeNode;
  steps: string[];
}

export default function PrimeFactorizationCalculator() {
  const [inputNumber, setInputNumber] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState('');
  
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/prime-factorization-calculator',
    getShareParams: () => ({
      n: inputNumber,
    }),
    getShareText: () => {
      if (result) {
        if (result.isPrime) {
          return `${result.number} is a prime number!`;
        }
        return `Prime factorization of ${result.number} = ${result.standardForm}`;
      }
      return 'Calculate prime factorization!';
    },
  });

  // Check if a number is prime
  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };

  // Find all prime factors with their exponents
  const getPrimeFactorization = (n: number): PrimeFactor[] => {
    const factors: PrimeFactor[] = [];
    let num = n;

    // Handle factor 2
    let count = 0;
    while (num % 2 === 0) {
      count++;
      num = num / 2;
    }
    if (count > 0) {
      factors.push({ factor: 2, exponent: count });
    }

    // Handle odd factors
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      count = 0;
      while (num % i === 0) {
        count++;
        num = num / i;
      }
      if (count > 0) {
        factors.push({ factor: i, exponent: count });
      }
    }

    // If num is still greater than 2, it's a prime factor
    if (num > 2) {
      factors.push({ factor: num, exponent: 1 });
    }

    return factors;
  };

  // Build factor tree
  const buildFactorTree = (n: number): FactorTreeNode => {
    if (isPrime(n)) {
      return { value: n, isPrime: true };
    }

    // Find first factor
    let factor = 2;
    if (n % 2 !== 0) {
      factor = 3;
      while (factor <= Math.sqrt(n)) {
        if (n % factor === 0) break;
        factor += 2;
      }
      if (factor > Math.sqrt(n)) factor = n;
    }

    if (factor === n) {
      return { value: n, isPrime: true };
    }

    const complement = n / factor;
    return {
      value: n,
      isPrime: false,
      children: [buildFactorTree(factor), buildFactorTree(complement)],
    };
  };

  // Get all divisors
  const getAllFactors = (n: number): number[] => {
    const factors: number[] = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        factors.push(i);
        if (i !== n / i) {
          factors.push(n / i);
        }
      }
    }
    return factors.sort((a, b) => a - b);
  };

  // Calculate
  const calculate = () => {
    setError('');
    const num = parseInt(inputNumber);

    if (!inputNumber || isNaN(num)) {
      setError('Please enter a valid number');
      return;
    }

    if (num < 1) {
      setError('Please enter a positive integer');
      return;
    }

    if (num > 1000000000) {
      setError('Number too large. Please enter a number less than 1,000,000,000');
      return;
    }

    const isNumberPrime = isPrime(num);
    const primeFactors = isNumberPrime ? [{ factor: num, exponent: 1 }] : getPrimeFactorization(num);
    const allFactors = getAllFactors(num);
    
    // Generate standard form
    const standardForm = primeFactors
      .map(pf => pf.exponent === 1 ? `${pf.factor}` : `${pf.factor}^${pf.exponent}`)
      .join(' × ');

    // Calculate statistics
    const totalPrimeFactors = primeFactors.reduce((sum, pf) => sum + pf.exponent, 0);
    const uniquePrimeCount = primeFactors.length;
    
    // Check if perfect square (all exponents are even)
    const isPerfectSquare = primeFactors.every(pf => pf.exponent % 2 === 0);

    // Generate steps
    const steps: string[] = [];
    if (isNumberPrime) {
      steps.push(`${num} is a prime number`);
      steps.push('It cannot be factored further');
    } else {
      let current = num;
      steps.push(`Starting with: ${num}`);
      
      for (const pf of primeFactors) {
        for (let i = 0; i < pf.exponent; i++) {
          const quotient = current / pf.factor;
          steps.push(`${current} ÷ ${pf.factor} = ${quotient}`);
          current = quotient;
        }
      }
    }

    setResult({
      number: num,
      isPrime: isNumberPrime,
      primeFactors,
      standardForm,
      allFactors,
      factorCount: allFactors.length,
      totalPrimeFactors,
      uniquePrimeCount,
      isPerfectSquare,
      factorTree: buildFactorTree(num),
      steps,
    });
  };

  // Render factor tree
  const renderFactorTree = (node: FactorTreeNode, level: number = 0): JSX.Element => {
    const indent = level * 40;
    
    return (
      <div key={`${node.value}-${level}`} style={{ marginLeft: `${indent}px` }} className="my-2">
        <div className={`inline-flex items-center px-4 py-2 rounded-lg border-2 ${
          node.isPrime 
            ? 'bg-green-50 border-green-500 text-green-900 font-semibold' 
            : 'bg-blue-50 border-blue-500 text-blue-900'
        }`}>
          {node.value}
          {node.isPrime && <span className="ml-2 text-xs">(prime)</span>}
        </div>
        {node.children && (
          <div className="ml-4 border-l-2 border-gray-300 pl-4 mt-2">
            {node.children.map((child, idx) => (
              <div key={idx}>
                {renderFactorTree(child, level + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
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
      link.download = `prime-factorization-${inputNumber}-${new Date().toISOString().split('T')[0]}.png`;
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
            <head><title>Prime Factorization Results</title>
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
              <CardTitle className="text-lg text-gray-900">Enter Number</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="number" className="text-sm font-medium text-gray-700">
                  Number <span className="text-red-600">*</span>
                </Label>
                <input
                  id="number"
                  type="number"
                  value={inputNumber}
                  onChange={(e) => setInputNumber(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && calculate()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter a positive integer"
                  min="1"
                />
                <p className="text-xs text-gray-500">
                  Enter any positive integer up to 1 billion
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <Button
                onClick={calculate}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>

              {/* Quick Examples */}
              <div className="pt-4 border-t">
                <p className="text-xs font-semibold text-gray-700 mb-2">Quick Examples:</p>
                <div className="flex flex-wrap gap-2">
                  {[12, 60, 100, 360, 1024].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setInputNumber(num.toString());
                        setError('');
                      }}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          {result ? (
            <div className="space-y-6">
              {/* Main Result Card */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                  <CardTitle className="text-xl text-gray-900">
                    {result.isPrime ? '✨ Prime Number!' : '🔢 Prime Factorization'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {result.isPrime ? (
                    <div className="text-center py-8">
                      <div className="text-6xl font-bold text-blue-700 mb-4">
                        {result.number}
                      </div>
                      <p className="text-xl text-gray-700 mb-2">is a <strong>PRIME NUMBER</strong></p>
                      <p className="text-sm text-gray-600">
                        It can only be divided by 1 and itself
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">Prime Factorization:</p>
                        <div className="text-3xl font-mono font-bold text-blue-700 bg-blue-50 p-4 rounded-lg text-center">
                          {result.standardForm}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <p className="text-xs text-blue-700 mb-1">Unique Primes</p>
                          <p className="text-2xl font-bold text-blue-900">{result.uniquePrimeCount}</p>
                          <p className="text-xs text-blue-600 mt-1">different</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                          <p className="text-xs text-green-700 mb-1">Total Prime Factors</p>
                          <p className="text-2xl font-bold text-green-900">{result.totalPrimeFactors}</p>
                          <p className="text-xs text-green-600 mt-1">with repeats</p>
                        </div>
                        <div className={`p-3 rounded-lg border ${result.isPerfectSquare ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
                          <p className={`text-xs mb-1 ${result.isPerfectSquare ? 'text-purple-700' : 'text-gray-600'}`}>Perfect Square?</p>
                          <p className={`text-2xl font-bold ${result.isPerfectSquare ? 'text-purple-900' : 'text-gray-900'}`}>
                            {result.isPerfectSquare ? '✓ Yes' : '✗ No'}
                          </p>
                          {result.isPerfectSquare && (
                            <p className="text-xs text-purple-600 mt-1">√{result.number} = {Math.sqrt(result.number)}</p>
                          )}
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-600 mb-1">All Divisors</p>
                          <p className="text-2xl font-bold text-gray-900">{result.factorCount}</p>
                          <p className="text-xs text-gray-600 mt-1">total</p>
                        </div>
                      </div>

                      {/* Prime Factors Detail */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Prime Factors with Exponents:</h4>
                        <div className="flex flex-wrap gap-3">
                          {result.primeFactors.map((pf, idx) => (
                            <div key={idx} className="bg-green-50 border-2 border-green-500 rounded-lg px-4 py-3">
                              <span className="text-2xl font-bold text-green-900">
                                {pf.factor}
                                {pf.exponent > 1 && (
                                  <sup className="text-lg ml-1">{pf.exponent}</sup>
                                )}
                              </span>
                              <p className="text-xs text-green-700 mt-1">
                                {pf.exponent === 1 ? 'appears once' : `appears ${pf.exponent} times`}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Factor Tree */}
              {!result.isPrime && (
                <Card className="border-gray-200">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-base text-gray-900">🌳 Factor Tree</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      {renderFactorTree(result.factorTree)}
                    </div>
                    <p className="text-xs text-gray-600 mt-4">
                      Green boxes are prime numbers. Blue boxes are composite numbers that can be factored further.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* All Factors */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">
                    All Factors of {result.number}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {result.allFactors.map((factor, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 bg-blue-50 border border-blue-200 rounded text-blue-900 font-medium"
                      >
                        {factor}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    These are all the numbers that divide {result.number} evenly.
                  </p>
                </CardContent>
              </Card>

              {/* Steps */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">📝 Calculation Steps</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ol className="space-y-2">
                    {result.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-semibold">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700 font-mono text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
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
                <p className="text-lg">Enter a number and click Calculate</p>
                <p className="text-sm mt-2">Get prime factorization, factor tree, and more!</p>
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
        calculatorName="Prime Factorization Calculator"
      />
    </div>
  );
}

