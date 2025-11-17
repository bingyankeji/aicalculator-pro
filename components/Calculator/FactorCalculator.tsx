'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Copy, Share2, Printer, Download, TreePine, Hash } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface FactorResult {
  number: number;
  
  // Basic classification
  isPrime: boolean;
  isComposite: boolean;
  isPerfectSquare: boolean;
  isPerfectCube: boolean;
  
  // All factors
  factors: number[];
  factorPairs: [number, number][];
  factorCount: number;
  
  // Prime factorization
  primeFactors: number[];
  primeFactorization: { prime: number; exponent: number }[];
  primeFactorizationString: string;
  
  // Sum of factors
  sumOfFactors: number;
  sumOfProperDivisors: number; // excluding the number itself
  
  // Number classification
  numberType: 'perfect' | 'abundant' | 'deficient';
  numberTypeExplanation: string;
  
  // Additional properties
  isEven: boolean;
  isOdd: boolean;
  
  // Insights
  insights: string[];
}

export default function FactorCalculator() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<FactorResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/factor-calculator',
    getShareParams: () => ({
      n: number || '',
    }),
    getShareText: () => {
      return result
        ? `Factor Calculator: ${result.number} has ${result.factorCount} factors. ${result.isPrime ? 'It is a prime number!' : `Prime factorization: ${result.primeFactorizationString}`}`
        : 'Calculate factors and prime factorization with this free calculator!';
    },
  });

  // Find all factors of a number
  const findFactors = (n: number): number[] => {
    const factors: number[] = [];
    const sqrt = Math.sqrt(n);
    
    for (let i = 1; i <= sqrt; i++) {
      if (n % i === 0) {
        factors.push(i);
        if (i !== n / i) {
          factors.push(n / i);
        }
      }
    }
    
    return factors.sort((a, b) => a - b);
  };

  // Check if a number is prime
  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    const sqrt = Math.sqrt(n);
    for (let i = 3; i <= sqrt; i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };

  // Prime factorization
  const primeFactorize = (n: number): { prime: number; exponent: number }[] => {
    const factorization: { prime: number; exponent: number }[] = [];
    let num = n;
    
    // Check for 2
    let count = 0;
    while (num % 2 === 0) {
      count++;
      num /= 2;
    }
    if (count > 0) {
      factorization.push({ prime: 2, exponent: count });
    }
    
    // Check for odd factors
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      count = 0;
      while (num % i === 0) {
        count++;
        num /= i;
      }
      if (count > 0) {
        factorization.push({ prime: i, exponent: count });
      }
    }
    
    // If num is still > 1, it's a prime factor
    if (num > 1) {
      factorization.push({ prime: num, exponent: 1 });
    }
    
    return factorization;
  };

  // Get all prime factors (with repetition)
  const getAllPrimeFactors = (n: number): number[] => {
    const primes: number[] = [];
    let num = n;
    
    while (num % 2 === 0) {
      primes.push(2);
      num /= 2;
    }
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      while (num % i === 0) {
        primes.push(i);
        num /= i;
      }
    }
    
    if (num > 1) {
      primes.push(num);
    }
    
    return primes;
  };

  const calculate = () => {
    const n = parseInt(number);
    
    if (isNaN(n) || n < 1) {
      alert('Please enter a positive integer greater than 0.');
      return;
    }
    
    if (n > 10000000) {
      alert('Please enter a number less than or equal to 10,000,000 for optimal performance.');
      return;
    }

    // Find all factors
    const factors = findFactors(n);
    const factorCount = factors.length;
    
    // Create factor pairs
    const factorPairs: [number, number][] = [];
    const halfCount = Math.ceil(factorCount / 2);
    for (let i = 0; i < halfCount; i++) {
      factorPairs.push([factors[i], factors[factorCount - 1 - i]]);
    }
    
    // Prime factorization
    const primeFactorization = primeFactorize(n);
    const primeFactors = getAllPrimeFactors(n);
    
    // Create prime factorization string
    let primeFactorizationString = '';
    if (primeFactorization.length === 0) {
      primeFactorizationString = '1';
    } else {
      primeFactorizationString = primeFactorization
        .map(({ prime, exponent }) => exponent === 1 ? `${prime}` : `${prime}^${exponent}`)
        .join(' × ');
    }
    
    // Sum of factors
    const sumOfFactors = factors.reduce((sum, f) => sum + f, 0);
    const sumOfProperDivisors = sumOfFactors - n;
    
    // Number classification
    let numberType: 'perfect' | 'abundant' | 'deficient';
    let numberTypeExplanation = '';
    
    if (sumOfProperDivisors === n) {
      numberType = 'perfect';
      numberTypeExplanation = `Perfect number: sum of proper divisors (${sumOfProperDivisors}) equals the number itself (${n}).`;
    } else if (sumOfProperDivisors > n) {
      numberType = 'abundant';
      numberTypeExplanation = `Abundant number: sum of proper divisors (${sumOfProperDivisors}) is greater than the number (${n}).`;
    } else {
      numberType = 'deficient';
      numberTypeExplanation = `Deficient number: sum of proper divisors (${sumOfProperDivisors}) is less than the number (${n}).`;
    }
    
    // Basic classifications
    const isPrimeNum = isPrime(n);
    const isComposite = n > 1 && !isPrimeNum;
    const isPerfectSquare = Math.sqrt(n) === Math.floor(Math.sqrt(n));
    const isPerfectCube = Math.cbrt(n) === Math.floor(Math.cbrt(n));
    const isEven = n % 2 === 0;
    const isOdd = n % 2 !== 0;
    
    // Generate insights
    const insights: string[] = [];
    
    if (isPrimeNum) {
      insights.push(`✨ ${n} is a prime number! It has exactly 2 factors: 1 and ${n}.`);
    } else if (isComposite) {
      insights.push(`✨ ${n} is a composite number with ${factorCount} factors.`);
    }
    
    if (isPerfectSquare) {
      const sqrt = Math.sqrt(n);
      insights.push(`📐 ${n} is a perfect square: ${sqrt} × ${sqrt} = ${n}.`);
    }
    
    if (isPerfectCube) {
      const cbrt = Math.cbrt(n);
      insights.push(`📦 ${n} is a perfect cube: ${cbrt} × ${cbrt} × ${cbrt} = ${n}.`);
    }
    
    if (numberType === 'perfect') {
      insights.push(`💎 ${n} is a perfect number! Perfect numbers are rare and special.`);
    }
    
    if (factorCount === 2 && !isPrimeNum) {
      insights.push(`🔢 ${n} has exactly 2 factors, making it prime.`);
    }
    
    if (factorCount % 2 !== 0) {
      insights.push(`🎯 ${n} has an odd number of factors, which means it's a perfect square.`);
    }
    
    if (primeFactorization.length === 1 && primeFactorization[0].exponent > 1) {
      insights.push(`💪 ${n} is a prime power: ${primeFactorization[0].prime}^${primeFactorization[0].exponent}.`);
    }
    
    if (n > 1 && factorCount === 2) {
      insights.push(`🔒 Prime numbers like ${n} are the building blocks of all other numbers.`);
    }
    
    // Special numbers
    if ([6, 28, 496, 8128].includes(n)) {
      insights.push(`⭐ ${n} is one of the first perfect numbers known since ancient times!`);
    }
    
    if (insights.length === 0) {
      insights.push(`📊 ${n} is a composite number with ${factorCount} factors and ${primeFactorization.length} distinct prime factors.`);
    }

    setResult({
      number: n,
      isPrime: isPrimeNum,
      isComposite,
      isPerfectSquare,
      isPerfectCube,
      factors,
      factorPairs,
      factorCount,
      primeFactors,
      primeFactorization,
      primeFactorizationString,
      sumOfFactors,
      sumOfProperDivisors,
      numberType,
      numberTypeExplanation,
      isEven,
      isOdd,
      insights,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Save as Image
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
      link.download = `factor-calculator-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  // Print Results
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
              <title>Factor Calculator Results</title>
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Left: Input Area (1 column) */}
        <div className="xl:col-span-1">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl">Enter Number</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Find all factors and prime factorization</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-6">
              <div>
                <Label htmlFor="number" className="text-xs">
                  Number <span className="text-red-500">*</span>
                </Label>
                <input
                  id="number"
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="e.g., 24"
                  min="1"
                  max="10000000"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Enter a positive integer (1 to 10,000,000)
                </p>
              </div>

              <Button
                onClick={calculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Factors
              </Button>

              {/* Quick Examples */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-gray-900 text-sm mb-3">📚 Try These Examples:</h3>
                <div className="flex flex-wrap gap-2">
                  {[12, 24, 28, 36, 100, 144].map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setNumber(ex.toString())}
                      className="px-3 py-1 bg-white border border-blue-300 rounded-lg text-sm hover:bg-blue-100 transition-colors"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Results Area (2 columns) */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl">Factorization Results</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result ? (
                <div className="space-y-4">
                  {/* Number Classification */}
                  <div className={`rounded-lg border-2 p-5 ${
                    result.isPrime ? 'bg-purple-50 border-purple-400' :
                    result.numberType === 'perfect' ? 'bg-green-50 border-green-400' :
                    'bg-blue-50 border-blue-400'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm text-gray-600">Number Classification:</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {result.isEven ? 'Even' : 'Odd'} • 
                          {result.isPrime ? ' Prime' : result.isComposite ? ' Composite' : ' Unit'}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(result.number.toString())}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Hash className="h-10 w-10 text-blue-600" />
                      <div>
                        <p className="font-mono text-3xl font-bold text-blue-700">
                          {result.number.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {result.factorCount} factor{result.factorCount !== 1 ? 's' : ''} total
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Insights */}
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">✨ Number Insights</h3>
                    <div className="space-y-2">
                      {result.insights.map((insight, index) => (
                        <p key={index} className="text-sm text-gray-700 leading-relaxed">
                          {insight}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* All Factors */}
                  <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">🔢 All Factors ({result.factorCount})</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {result.factors.map((factor) => (
                        <span
                          key={factor}
                          className={`px-3 py-1 rounded-lg font-mono text-sm ${
                            isPrime(factor)
                              ? 'bg-purple-100 text-purple-700 border border-purple-300'
                              : 'bg-blue-100 text-blue-700 border border-blue-300'
                          }`}
                        >
                          {factor}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Purple badges indicate prime factors
                    </p>
                  </div>

                  {/* Factor Pairs */}
                  <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">🔗 Factor Pairs</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {result.factorPairs.map((pair, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                        >
                          <p className="font-mono text-center">
                            <span className="font-bold text-blue-600">{pair[0]}</span>
                            {' × '}
                            <span className="font-bold text-blue-600">{pair[1]}</span>
                            {' = '}
                            <span className="text-gray-600">{result.number}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prime Factorization */}
                  {!result.isPrime && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-300 p-4">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <TreePine className="h-5 w-5 text-purple-600" />
                        Prime Factorization
                      </h3>
                      <div className="bg-white rounded-lg p-4 mb-3">
                        <p className="font-mono text-lg text-center">
                          <span className="font-bold text-purple-700">{result.number}</span>
                          {' = '}
                          <span className="font-bold text-purple-700">{result.primeFactorizationString}</span>
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-800">Prime Factor Breakdown:</h4>
                        {result.primeFactorization.map(({ prime, exponent }) => (
                          <div key={prime} className="flex items-center gap-2 text-sm">
                            <span className="font-mono bg-purple-100 px-2 py-1 rounded border border-purple-300">
                              {prime}
                            </span>
                            <span className="text-gray-600">appears</span>
                            <span className="font-bold text-purple-700">{exponent}</span>
                            <span className="text-gray-600">time{exponent !== 1 ? 's' : ''}</span>
                            <span className="text-gray-400">
                              ({prime}{exponent > 1 ? `^${exponent}` : ''} = {Math.pow(prime, exponent)})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sum of Factors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg border border-green-200 p-4">
                      <p className="text-xs text-gray-600 mb-1">Sum of All Factors:</p>
                      <p className="font-mono text-2xl font-bold text-green-700">
                        {result.sumOfFactors}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {result.factors.join(' + ')} = {result.sumOfFactors}
                      </p>
                    </div>
                    <div className="bg-orange-50 rounded-lg border border-orange-200 p-4">
                      <p className="text-xs text-gray-600 mb-1">Sum of Proper Divisors:</p>
                      <p className="font-mono text-2xl font-bold text-orange-700">
                        {result.sumOfProperDivisors}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        (Excluding {result.number} itself)
                      </p>
                    </div>
                  </div>

                  {/* Number Type */}
                  <div className={`rounded-lg border-2 p-4 ${
                    result.numberType === 'perfect' ? 'bg-green-50 border-green-400' :
                    result.numberType === 'abundant' ? 'bg-blue-50 border-blue-400' :
                    'bg-gray-50 border-gray-400'
                  }`}>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      🏷️ Number Type: <span className={`${
                        result.numberType === 'perfect' ? 'text-green-700' :
                        result.numberType === 'abundant' ? 'text-blue-700' :
                        'text-gray-700'
                      }`}>
                        {result.numberType.charAt(0).toUpperCase() + result.numberType.slice(1)}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-700">
                      {result.numberTypeExplanation}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center text-gray-500">
                    <Calculator className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Enter a number to see its factors</p>
                    <p className="text-sm mt-2">Get complete factorization and analysis</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reference Card */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardTitle className="text-xl">Understanding Factors & Prime Numbers</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">🔢 What are Factors?</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Factors</strong> are whole numbers that divide evenly into another number without a remainder.
              </p>
              <p className="text-xs text-gray-600">
                Example: Factors of 12 are 1, 2, 3, 4, 6, and 12, because each divides 12 evenly.
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-purple-200 p-4">
              <h3 className="text-lg font-semibold text-purple-700 mb-3">🌟 Prime Numbers</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Prime numbers</strong> have exactly 2 factors: 1 and themselves. They can't be divided evenly by any other number.
              </p>
              <p className="text-xs text-gray-600">
                Examples: 2, 3, 5, 7, 11, 13, 17, 19, 23...
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-green-200 p-4">
              <h3 className="text-lg font-semibold text-green-700 mb-3">💎 Perfect Numbers</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Perfect numbers</strong> equal the sum of their proper divisors (factors excluding the number itself).
              </p>
              <p className="text-xs text-gray-600">
                Examples: 6 (1+2+3), 28 (1+2+4+7+14), 496, 8128
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
        <Button 
          onClick={handleSaveAsImage} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Download className="h-4 w-4" />
          Save as Image
        </Button>
        
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
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

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Factor Calculator"
      />
    </div>
  );
}

