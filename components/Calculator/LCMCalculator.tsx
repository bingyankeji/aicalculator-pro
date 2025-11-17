'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Copy, Share2, Printer, Download, Plus, Minus } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface LCMResult {
  lcm: number;
  gcf: number;
  numbers: number[];
  primeFactorization: { [key: number]: { [prime: number]: number } };
  steps: string[];
  multiples: { [key: number]: number[] };
  relationship: string;
}

export default function LCMCalculator() {
  const [numbers, setNumbers] = useState<string[]>(['', '']);
  const [result, setResult] = useState<LCMResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/lcm-calculator',
    getShareParams: () => ({
      nums: numbers.filter(n => n).join(','),
    }),
    getShareText: () => {
      return result
        ? `LCM of ${result.numbers.join(', ')}: ${result.lcm} | GCF: ${result.gcf}`
        : 'Calculate Least Common Multiple (LCM) and Greatest Common Factor (GCF) for 2-10 numbers!';
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

  // Calculate GCF using Euclidean algorithm
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

  // Get first few multiples
  const getMultiples = (n: number, count: number = 10): number[] => {
    return Array.from({ length: count }, (_, i) => n * (i + 1));
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

    // Calculate LCM for all numbers
    let lcm = validNumbers[0];
    for (let i = 1; i < validNumbers.length; i++) {
      lcm = calculateLCM(lcm, validNumbers[i]);
    }

    // Calculate GCF for all numbers
    let gcf = validNumbers[0];
    for (let i = 1; i < validNumbers.length; i++) {
      gcf = calculateGCF(gcf, validNumbers[i]);
    }

    // Get prime factorizations
    const primeFactorization: { [key: number]: { [prime: number]: number } } = {};
    validNumbers.forEach(num => {
      primeFactorization[num] = getPrimeFactors(num);
    });

    // Get multiples for visualization
    const multiples: { [key: number]: number[] } = {};
    validNumbers.forEach(num => {
      multiples[num] = getMultiples(num, 10);
    });

    // Generate steps
    const steps: string[] = [];
    
    if (validNumbers.length === 2) {
      const [a, b] = validNumbers;
      steps.push('Method 1: Using GCF Formula');
      steps.push(`Step 1: Find GCF(${a}, ${b})`);
      steps.push(`GCF(${a}, ${b}) = ${gcf}`);
      steps.push(`Step 2: Apply LCM formula`);
      steps.push(`LCM(a, b) = (a × b) / GCF(a, b)`);
      steps.push(`LCM(${a}, ${b}) = (${a} × ${b}) / ${gcf}`);
      steps.push(`LCM(${a}, ${b}) = ${a * b} / ${gcf}`);
      steps.push(`LCM(${a}, ${b}) = ${lcm}`);
      steps.push('');
      steps.push('✓ Verification: LCM × GCF = a × b');
      steps.push(`${lcm} × ${gcf} = ${a} × ${b}`);
      steps.push(`${lcm * gcf} = ${a * b} ✓`);
    } else {
      steps.push('Step 1: Calculate LCM progressively');
      let currentLCM = validNumbers[0];
      for (let i = 1; i < validNumbers.length; i++) {
        const nextLCM = calculateLCM(currentLCM, validNumbers[i]);
        steps.push(`LCM(${currentLCM}, ${validNumbers[i]}) = ${nextLCM}`);
        currentLCM = nextLCM;
      }
      steps.push(`Final LCM = ${lcm}`);
    }

    // Determine relationship
    let relationship = '';
    if (validNumbers.length === 2) {
      const [a, b] = validNumbers;
      if (gcf === 1) {
        relationship = `${a} and ${b} are coprime (relatively prime). Their LCM equals their product: ${lcm} = ${a} × ${b}.`;
      } else if (a % b === 0 || b % a === 0) {
        relationship = `One number is a multiple of the other. The LCM is the larger number: ${lcm}.`;
      } else {
        relationship = `The numbers share common factors. GCF = ${gcf}, which helps find LCM efficiently.`;
      }
    } else {
      relationship = `Computing LCM for ${validNumbers.length} numbers using progressive calculation.`;
    }

    setResult({
      lcm,
      gcf,
      numbers: validNumbers,
      primeFactorization,
      steps,
      multiples,
      relationship
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
      link.download = `lcm-calculator-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>LCM Calculator Results</title>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder={`e.g., ${(index + 1) * 6}`}
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
                  className="w-full border-dashed border-2 text-blue-600 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Number (up to 10)
                </Button>
              )}

              <Button
                onClick={calculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate LCM
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right: Results Area (2 columns) */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl">LCM Results</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result ? (
                <div className="space-y-4">
                  {/* Main Result */}
                  <div className="bg-blue-50 rounded-lg border-2 border-blue-400 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Least Common Multiple (LCM):</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(result.lcm.toString())}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-mono text-3xl font-bold text-blue-700">
                      {result.lcm.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      LCM of {result.numbers.join(', ')}
                    </p>
                  </div>

                  {/* GCF and Relationship */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-xs text-gray-600 mb-1">Greatest Common Factor:</p>
                      <p className="font-mono text-2xl font-bold text-gray-900">
                        GCF = {result.gcf}
                      </p>
                    </div>
                    {result.numbers.length === 2 && (
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <p className="text-xs text-gray-600 mb-1">Verification:</p>
                        <p className="font-mono text-sm text-gray-900">
                          LCM × GCF = {result.lcm} × {result.gcf}
                        </p>
                        <p className="font-mono text-sm text-gray-900">
                          = {result.lcm * result.gcf} ✓
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Relationship */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">🔍 Relationship:</p>
                    <p className="text-sm text-gray-700">{result.relationship}</p>
                  </div>

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
                            <span className="font-bold text-blue-700">{num}</span> = {factorStr}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Multiples Visualization (for 2 numbers) */}
                  {result.numbers.length === 2 && (
                    <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
                      <p className="text-sm font-semibold text-gray-900 mb-3">📊 First 10 Multiples:</p>
                      {result.numbers.map(num => (
                        <div key={num} className="mb-3">
                          <p className="text-xs text-gray-600 mb-1">Multiples of {num}:</p>
                          <div className="flex flex-wrap gap-2">
                            {result.multiples[num].map(multiple => (
                              <span
                                key={multiple}
                                className={`px-2 py-1 rounded text-xs font-mono ${
                                  multiple === result.lcm
                                    ? 'bg-green-600 text-white font-bold'
                                    : 'bg-white border border-purple-200 text-gray-700'
                                }`}
                              >
                                {multiple}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                      <p className="text-xs text-green-700 font-semibold mt-2">
                        ✓ {result.lcm} is the smallest common multiple
                      </p>
                    </div>
                  )}

                  {/* Calculation Steps */}
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
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="text-xl">LCM & GCF Reference</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What is LCM?</h3>
              <p className="text-sm text-gray-700 mb-2">
                The <strong>Least Common Multiple (LCM)</strong> is the smallest positive integer that is divisible by all given numbers.
              </p>
              <p className="text-sm text-gray-700">
                <strong>Formula:</strong> LCM(a,b) = (a × b) / GCF(a,b)
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Applications</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Adding/subtracting fractions (finding common denominator)</li>
                <li>• Scheduling problems (events occurring together)</li>
                <li>• Music rhythm synchronization</li>
                <li>• Gear rotation cycles</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">LCM Properties</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• LCM(a,b) ≥ max(a,b)</li>
                <li>• If a divides b, then LCM(a,b) = b</li>
                <li>• LCM(a,b) × GCF(a,b) = a × b</li>
                <li>• LCM of coprime numbers = their product</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Special Cases</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Coprime:</strong> GCF = 1, LCM = a × b</li>
                <li>• <strong>One divides other:</strong> LCM = larger number</li>
                <li>• <strong>Identical numbers:</strong> LCM = the number itself</li>
                <li>• <strong>Powers of same base:</strong> LCM = highest power</li>
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
        calculatorName="LCM Calculator"
      />
    </div>
  );
}

