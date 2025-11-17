'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Copy, Share2, Printer, Download, Plus, Minus } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface GCFResult {
  gcf: number;
  lcm: number;
  numbers: number[];
  primeFactorization: { [key: number]: { [prime: number]: number } };
  commonFactors: number[];
  euclideanSteps: string[];
  steps: string[];
  relationship: string;
  simplifiedFraction?: { numerator: number; denominator: number };
}

export default function GCFCalculator() {
  const [numbers, setNumbers] = useState<string[]>(['', '']);
  const [result, setResult] = useState<GCFResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/gcf-calculator',
    getShareParams: () => ({
      nums: numbers.filter(n => n).join(','),
    }),
    getShareText: () => {
      return result
        ? `GCF of ${result.numbers.join(', ')}: ${result.gcf} | LCM: ${result.lcm}`
        : 'Calculate Greatest Common Factor (GCF) and Least Common Multiple (LCM) for 2-10 numbers!';
    },
  });

  // Add number field
  const addNumber = () => {
    if (numbers.length < 10) {
      setNumbers([...numbers, '']);
    }
  };

  // Remove number field
  const removeNumber = (index: number) => {
    if (numbers.length > 2) {
      const newNumbers = numbers.filter((_, i) => i !== index);
      setNumbers(newNumbers);
    }
  };

  // Update number value
  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  // Calculate GCF using Euclidean algorithm with steps
  const calculateGCFWithSteps = (a: number, b: number): { gcf: number; steps: string[] } => {
    const steps: string[] = [];
    let x = Math.max(a, b);
    let y = Math.min(a, b);
    
    steps.push(`Euclidean Algorithm for GCF(${a}, ${b}):`);
    steps.push(`Start with ${x} and ${y}`);
    
    while (y !== 0) {
      const quotient = Math.floor(x / y);
      const remainder = x % y;
      steps.push(`${x} = ${y} × ${quotient} + ${remainder}`);
      x = y;
      y = remainder;
    }
    
    steps.push(`GCF = ${x}`);
    
    return { gcf: x, steps };
  };

  // Simple GCF calculation
  const calculateGCF = (a: number, b: number): number => {
    if (b === 0) return a;
    return calculateGCF(b, a % b);
  };

  // Calculate LCM using formula: LCM(a,b) = (a * b) / GCF(a,b)
  const calculateLCM = (a: number, b: number): number => {
    return Math.abs(a * b) / calculateGCF(a, b);
  };

  // Get prime factorization
  const getPrimeFactors = (n: number): { [prime: number]: number } => {
    const factors: { [prime: number]: number } = {};
    let num = n;
    
    for (let i = 2; i <= num; i++) {
      while (num % i === 0) {
        factors[i] = (factors[i] || 0) + 1;
        num = num / i;
      }
    }
    
    return factors;
  };

  // Get all factors (divisors) of a number
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

  // Get common factors of all numbers
  const getCommonFactors = (nums: number[]): number[] => {
    if (nums.length === 0) return [];
    
    const firstFactors = getAllFactors(nums[0]);
    const common = firstFactors.filter(factor => 
      nums.every(num => num % factor === 0)
    );
    
    return common;
  };

  const calculate = () => {
    // Validate inputs
    const validNumbers = numbers
      .filter(n => n.trim() !== '')
      .map(n => parseInt(n))
      .filter(n => !isNaN(n) && n > 0);

    if (validNumbers.length < 2) {
      alert('Please enter at least 2 positive integers.');
      return;
    }

    // Calculate GCF for all numbers
    let gcf = validNumbers[0];
    for (let i = 1; i < validNumbers.length; i++) {
      gcf = calculateGCF(gcf, validNumbers[i]);
    }

    // Calculate LCM for all numbers
    let lcm = validNumbers[0];
    for (let i = 1; i < validNumbers.length; i++) {
      lcm = calculateLCM(lcm, validNumbers[i]);
    }

    // Get prime factorizations
    const primeFactorization: { [key: number]: { [prime: number]: number } } = {};
    validNumbers.forEach(num => {
      primeFactorization[num] = getPrimeFactors(num);
    });

    // Get common factors
    const commonFactors = getCommonFactors(validNumbers);

    // Get Euclidean algorithm steps (for 2 numbers)
    let euclideanSteps: string[] = [];
    if (validNumbers.length === 2) {
      const result = calculateGCFWithSteps(validNumbers[0], validNumbers[1]);
      euclideanSteps = result.steps;
    }

    // Generate general calculation steps
    const steps: string[] = [];
    
    if (validNumbers.length === 2) {
      const [a, b] = validNumbers;
      steps.push('Method 1: Euclidean Algorithm (see detailed steps below)');
      steps.push('');
      steps.push('Method 2: Prime Factorization');
      steps.push(`Step 1: Factor each number`);
      
      Object.entries(primeFactorization).forEach(([num, factors]) => {
        const factorStr = Object.entries(factors)
          .map(([prime, exp]) => exp > 1 ? `${prime}^${exp}` : prime)
          .join(' × ');
        steps.push(`${num} = ${factorStr}`);
      });
      
      steps.push('Step 2: Find common prime factors with lowest powers');
      const gcfFactors = getPrimeFactors(gcf);
      if (Object.keys(gcfFactors).length > 0) {
        const gcfStr = Object.entries(gcfFactors)
          .map(([prime, exp]) => exp > 1 ? `${prime}^${exp}` : prime)
          .join(' × ');
        steps.push(`Common factors: ${gcfStr}`);
        steps.push(`GCF = ${gcf}`);
      } else {
        steps.push(`No common prime factors (coprime)`);
        steps.push(`GCF = 1`);
      }
      
      steps.push('');
      steps.push('✓ Verification using LCM relationship:');
      steps.push(`GCF × LCM = ${gcf} × ${lcm} = ${gcf * lcm}`);
      steps.push(`a × b = ${a} × ${b} = ${a * b}`);
      steps.push(`${gcf * lcm} = ${a * b} ✓`);
    } else {
      steps.push('Progressive GCF Calculation:');
      let currentGCF = validNumbers[0];
      for (let i = 1; i < validNumbers.length; i++) {
        const nextGCF = calculateGCF(currentGCF, validNumbers[i]);
        steps.push(`GCF(${currentGCF}, ${validNumbers[i]}) = ${nextGCF}`);
        currentGCF = nextGCF;
      }
      steps.push(`Final GCF = ${gcf}`);
    }

    // Determine relationship
    let relationship = '';
    if (validNumbers.length === 2) {
      const [a, b] = validNumbers;
      if (gcf === 1) {
        relationship = `${a} and ${b} are coprime (relatively prime). They share no common factors except 1.`;
      } else if (a % b === 0 || b % a === 0) {
        relationship = `One number divides the other. The GCF is the smaller number: ${gcf}.`;
      } else {
        relationship = `The numbers share ${commonFactors.length} common factor(s). The greatest is ${gcf}.`;
      }
    } else {
      relationship = `All ${validNumbers.length} numbers share ${commonFactors.length} common factor(s). The greatest is ${gcf}.`;
    }

    // Simplified fraction (for 2 numbers)
    let simplifiedFraction: { numerator: number; denominator: number } | undefined;
    if (validNumbers.length === 2) {
      simplifiedFraction = {
        numerator: validNumbers[0] / gcf,
        denominator: validNumbers[1] / gcf
      };
    }

    setResult({
      gcf,
      lcm,
      numbers: validNumbers,
      primeFactorization,
      commonFactors,
      euclideanSteps,
      steps,
      relationship,
      simplifiedFraction
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
      link.download = `gcf-calculator-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>GCF Calculator Results</title>
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
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-xl">Enter Numbers</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Enter 2-10 positive integers</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {numbers.map((num, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`number-${index}`} className="text-xs">
                      Number {index + 1} <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id={`number-${index}`}
                      type="number"
                      value={num}
                      onChange={(e) => updateNumber(index, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder={`e.g., ${(index + 1) * 12}`}
                      min="1"
                      step="1"
                    />
                  </div>
                  {numbers.length > 2 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeNumber(index)}
                      className="mt-5 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              {numbers.length < 10 && (
                <Button
                  variant="outline"
                  onClick={addNumber}
                  className="w-full border-dashed border-2 text-green-600 hover:bg-green-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Number (up to 10)
                </Button>
              )}

              <Button
                onClick={calculate}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 min-h-[44px]"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate GCF
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right: Results Area (2 columns) */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-xl">GCF Results</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result ? (
                <div className="space-y-4">
                  {/* Main Result */}
                  <div className="bg-green-50 rounded-lg border-2 border-green-400 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Greatest Common Factor (GCF):</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(result.gcf.toString())}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-mono text-3xl font-bold text-green-700">
                      {result.gcf.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      GCF of {result.numbers.join(', ')}
                    </p>
                  </div>

                  {/* LCM and Relationship */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-xs text-gray-600 mb-1">Least Common Multiple:</p>
                      <p className="font-mono text-2xl font-bold text-gray-900">
                        LCM = {result.lcm.toLocaleString()}
                      </p>
                    </div>
                    {result.numbers.length === 2 && (
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <p className="text-xs text-gray-600 mb-1">Verification:</p>
                        <p className="font-mono text-sm text-gray-900">
                          GCF × LCM = {result.gcf} × {result.lcm}
                        </p>
                        <p className="font-mono text-sm text-gray-900">
                          = {result.gcf * result.lcm} ✓
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Relationship */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200 p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">🔍 Relationship:</p>
                    <p className="text-sm text-gray-700">{result.relationship}</p>
                  </div>

                  {/* Common Factors List */}
                  <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">📊 All Common Factors ({result.commonFactors.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {result.commonFactors.map(factor => (
                        <span
                          key={factor}
                          className={`px-3 py-1 rounded text-sm font-mono ${
                            factor === result.gcf
                              ? 'bg-green-600 text-white font-bold'
                              : 'bg-white border border-purple-200 text-gray-700'
                          }`}
                        >
                          {factor}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-green-700 font-semibold mt-3">
                      ✓ {result.gcf} is the greatest common factor
                    </p>
                  </div>

                  {/* Simplified Fraction */}
                  {result.simplifiedFraction && result.gcf > 1 && (
                    <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
                      <p className="text-sm font-semibold text-gray-900 mb-2">📐 Fraction Simplification:</p>
                      <div className="flex items-center gap-3 text-gray-700">
                        <span className="font-mono text-lg">
                          {result.numbers[0]}/{result.numbers[1]}
                        </span>
                        <span>→</span>
                        <span className="font-mono text-lg font-bold text-yellow-700">
                          {result.simplifiedFraction.numerator}/{result.simplifiedFraction.denominator}
                        </span>
                        <span className="text-xs">
                          (divided by {result.gcf})
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Prime Factorization */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Prime Factorization:</p>
                    <div className="space-y-2">
                      {result.numbers.map(num => {
                        const factors = result.primeFactorization[num];
                        const factorStr = Object.entries(factors)
                          .map(([prime, exp]) => exp > 1 ? `${prime}^${exp}` : prime)
                          .join(' × ');
                        return (
                          <div key={num} className="text-sm font-mono">
                            <span className="font-bold text-green-700">{num}</span> = {factorStr}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Euclidean Algorithm Steps (for 2 numbers) */}
                  {result.euclideanSteps.length > 0 && (
                    <div className="bg-indigo-50 rounded-lg border border-indigo-200 p-4">
                      <p className="text-sm font-semibold text-gray-900 mb-3">🔄 Euclidean Algorithm (Step-by-Step):</p>
                      <div className="space-y-1 text-sm font-mono text-gray-700">
                        {result.euclideanSteps.map((step, index) => (
                          <p key={index} className={index === 0 ? 'font-bold text-indigo-700' : ''}>
                            {step}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* General Calculation Steps */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">📐 Calculation Steps:</p>
                    <div className="space-y-1 text-sm font-mono text-gray-700">
                      {result.steps.map((step, index) => (
                        <p key={index} className={step === '' ? 'h-2' : ''}>
                          {step}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center text-gray-500">
                    <Calculator className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Enter numbers and click Calculate</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reference Card */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
          <CardTitle className="text-xl">GCF & LCM Reference</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What is GCF?</h3>
              <p className="text-sm text-gray-700 mb-2">
                The <strong>Greatest Common Factor (GCF)</strong>, also called Greatest Common Divisor (GCD), is the largest positive integer that divides all given numbers evenly.
              </p>
              <p className="text-sm text-gray-700">
                <strong>Example:</strong> GCF(12, 18) = 6
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Applications</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Simplifying fractions (divide by GCF)</li>
                <li>• Dividing objects into equal groups</li>
                <li>• Finding largest tile size for floors</li>
                <li>• Reducing ratios to simplest form</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">GCF Properties</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• GCF(a,b) ≤ min(a,b)</li>
                <li>• GCF(a,0) = a</li>
                <li>• If a divides b, then GCF(a,b) = a</li>
                <li>• GCF(a,b) × LCM(a,b) = a × b</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Special Cases</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Coprime:</strong> GCF = 1 (no common factors)</li>
                <li>• <strong>One divides other:</strong> GCF = smaller number</li>
                <li>• <strong>Identical numbers:</strong> GCF = the number itself</li>
                <li>• <strong>Consecutive numbers:</strong> GCF = 1</li>
              </ul>
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
        calculatorName="GCF Calculator"
      />
    </div>
  );
}

