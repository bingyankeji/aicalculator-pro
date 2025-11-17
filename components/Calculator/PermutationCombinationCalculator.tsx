'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Copy, Share2, Printer, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface CalculationResult {
  type: 'permutation' | 'combination' | 'factorial';
  n: number;
  r?: number;
  result: string;
  formula: string;
  steps: string[];
  explanation: string;
  insights: string[];
}

export default function PermutationCombinationCalculator() {
  const [activeTab, setActiveTab] = useState('permutation');
  const [n, setN] = useState('');
  const [r, setR] = useState('');
  const [factorialN, setFactorialN] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/permutation-combination-calculator',
    getShareParams: () => ({
      t: activeTab,
      n: n || '',
      r: r || '',
      fn: factorialN || '',
    }),
    getShareText: () => {
      if (!result) return 'Calculate permutations, combinations, and factorials!';
      if (result.type === 'permutation') {
        return `Permutation: P(${result.n},${result.r}) = ${result.result}`;
      } else if (result.type === 'combination') {
        return `Combination: C(${result.n},${result.r}) = ${result.result}`;
      } else {
        return `Factorial: ${result.n}! = ${result.result}`;
      }
    },
  });

  // Calculate factorial
  const factorial = (num: number): bigint => {
    if (num === 0 || num === 1) return BigInt(1);
    let result = BigInt(1);
    for (let i = 2; i <= num; i++) {
      result *= BigInt(i);
    }
    return result;
  };

  // Calculate permutation P(n, r) = n! / (n-r)!
  const calculatePermutation = () => {
    const nVal = parseInt(n);
    const rVal = parseInt(r);

    if (isNaN(nVal) || isNaN(rVal)) {
      alert('Please enter valid numbers for n and r.');
      return;
    }

    if (nVal < 0 || rVal < 0) {
      alert('n and r must be non-negative integers.');
      return;
    }

    if (rVal > nVal) {
      alert('r cannot be greater than n.');
      return;
    }

    if (nVal > 170) {
      alert('n is too large (max 170 for accurate calculation).');
      return;
    }

    const nFactorial = factorial(nVal);
    const nMinusRFactorial = factorial(nVal - rVal);
    const permutationResult = nFactorial / nMinusRFactorial;

    const steps = [
      `Formula: P(n, r) = n! / (n - r)!`,
      `P(${nVal}, ${rVal}) = ${nVal}! / (${nVal} - ${rVal})!`,
      `P(${nVal}, ${rVal}) = ${nVal}! / ${nVal - rVal}!`,
      `${nVal}! = ${nFactorial.toString()}`,
      `${nVal - rVal}! = ${nMinusRFactorial.toString()}`,
      `P(${nVal}, ${rVal}) = ${nFactorial.toString()} / ${nMinusRFactorial.toString()}`,
      `P(${nVal}, ${rVal}) = ${permutationResult.toString()}`,
    ];

    const insights = generatePermutationInsights(nVal, rVal, permutationResult);

    setResult({
      type: 'permutation',
      n: nVal,
      r: rVal,
      result: permutationResult.toString(),
      formula: `P(${nVal}, ${rVal}) = ${nVal}! / (${nVal} - ${rVal})!`,
      steps,
      explanation: `A permutation counts the number of ways to arrange ${rVal} items from a set of ${nVal} items, where order matters. For example, "ABC" and "CBA" are different arrangements.`,
      insights,
    });
  };

  // Calculate combination C(n, r) = n! / ((n-r)! * r!)
  const calculateCombination = () => {
    const nVal = parseInt(n);
    const rVal = parseInt(r);

    if (isNaN(nVal) || isNaN(rVal)) {
      alert('Please enter valid numbers for n and r.');
      return;
    }

    if (nVal < 0 || rVal < 0) {
      alert('n and r must be non-negative integers.');
      return;
    }

    if (rVal > nVal) {
      alert('r cannot be greater than n.');
      return;
    }

    if (nVal > 170) {
      alert('n is too large (max 170 for accurate calculation).');
      return;
    }

    const nFactorial = factorial(nVal);
    const rFactorial = factorial(rVal);
    const nMinusRFactorial = factorial(nVal - rVal);
    const combinationResult = nFactorial / (nMinusRFactorial * rFactorial);

    const steps = [
      `Formula: C(n, r) = n! / ((n - r)! × r!)`,
      `C(${nVal}, ${rVal}) = ${nVal}! / ((${nVal} - ${rVal})! × ${rVal}!)`,
      `C(${nVal}, ${rVal}) = ${nVal}! / (${nVal - rVal}! × ${rVal}!)`,
      `${nVal}! = ${nFactorial.toString()}`,
      `${nVal - rVal}! = ${nMinusRFactorial.toString()}`,
      `${rVal}! = ${rFactorial.toString()}`,
      `C(${nVal}, ${rVal}) = ${nFactorial.toString()} / (${nMinusRFactorial.toString()} × ${rFactorial.toString()})`,
      `C(${nVal}, ${rVal}) = ${nFactorial.toString()} / ${(nMinusRFactorial * rFactorial).toString()}`,
      `C(${nVal}, ${rVal}) = ${combinationResult.toString()}`,
    ];

    const insights = generateCombinationInsights(nVal, rVal, combinationResult);

    setResult({
      type: 'combination',
      n: nVal,
      r: rVal,
      result: combinationResult.toString(),
      formula: `C(${nVal}, ${rVal}) = ${nVal}! / ((${nVal} - ${rVal})! × ${rVal}!)`,
      steps,
      explanation: `A combination counts the number of ways to choose ${rVal} items from a set of ${nVal} items, where order does NOT matter. For example, "ABC" and "CBA" are considered the same selection.`,
      insights,
    });
  };

  // Calculate factorial
  const calculateFactorial = () => {
    const nVal = parseInt(factorialN);

    if (isNaN(nVal)) {
      alert('Please enter a valid number.');
      return;
    }

    if (nVal < 0) {
      alert('n must be a non-negative integer.');
      return;
    }

    if (nVal > 170) {
      alert('n is too large (max 170 for accurate calculation).');
      return;
    }

    const factorialResult = factorial(nVal);

    const steps = [
      `Formula: n! = n × (n-1) × (n-2) × ... × 2 × 1`,
      `${nVal}! = ${Array.from({ length: nVal }, (_, i) => nVal - i).join(' × ')}${nVal > 0 ? '' : '1 (by definition)'}`,
      `${nVal}! = ${factorialResult.toString()}`,
    ];

    const insights = generateFactorialInsights(nVal, factorialResult);

    setResult({
      type: 'factorial',
      n: nVal,
      result: factorialResult.toString(),
      formula: `${nVal}! = ${factorialResult.toString()}`,
      steps,
      explanation: `The factorial of ${nVal} is the product of all positive integers from 1 to ${nVal}. It represents the number of ways to arrange ${nVal} distinct items.`,
      insights,
    });
  };

  const generatePermutationInsights = (n: number, r: number, result: bigint): string[] => {
    const insights: string[] = [];

    if (r === n) {
      insights.push(`✨ Full permutation: You're arranging all ${n} items, so P(${n},${n}) = ${n}!`);
    }

    if (r === 1) {
      insights.push(`📌 Selecting 1 item from ${n}: There are exactly ${n} ways (P(${n},1) = ${n})`);
    }

    if (r === 2 && n > 2) {
      insights.push(`🔗 Ordered pairs: You're creating ${result.toString()} different ordered pairs from ${n} items.`);
    }

    const combination = factorial(n) / (factorial(n - r) * factorial(r));
    const ratio = Number(result) / Number(combination);
    if (ratio > 1) {
      insights.push(`📊 Permutations vs Combinations: P(${n},${r}) is ${ratio.toFixed(0)}× larger than C(${n},${r}) because order matters.`);
    }

    if (Number(result) > 1000000) {
      insights.push(`🌟 That's over ${(Number(result) / 1000000).toFixed(1)} million different arrangements!`);
    }

    return insights;
  };

  const generateCombinationInsights = (n: number, r: number, result: bigint): string[] => {
    const insights: string[] = [];

    if (r === 1) {
      insights.push(`📌 Selecting 1 item from ${n}: There are exactly ${n} ways (C(${n},1) = ${n})`);
    }

    if (r === n) {
      insights.push(`✨ Selecting all items: There's only 1 way to choose all ${n} items (C(${n},${n}) = 1)`);
    }

    if (r === n - 1) {
      insights.push(`🎯 Selecting all but one: Same as leaving out 1 item, so C(${n},${n - 1}) = C(${n},1) = ${n}`);
    }

    const symmetric = factorial(n) / (factorial(r) * factorial(n - r));
    if (r !== n - r) {
      insights.push(`🔄 Symmetry property: C(${n},${r}) = C(${n},${n - r}) = ${symmetric.toString()}`);
    }

    if (Number(result) > 1000) {
      insights.push(`📚 Real-world: Like choosing ${r} books from ${n} books, or forming a team of ${r} from ${n} people.`);
    }

    return insights;
  };

  const generateFactorialInsights = (n: number, result: bigint): string[] => {
    const insights: string[] = [];

    if (n === 0) {
      insights.push(`📐 Special case: 0! = 1 by mathematical definition (empty product).`);
    }

    if (n <= 5) {
      insights.push(`🎯 Small factorial: Easy to verify by hand: ${n}! = ${result.toString()}`);
    }

    if (n === 10) {
      insights.push(`⏰ 10! = 3,628,800 seconds is approximately 42 days!`);
    }

    if (n > 10) {
      insights.push(`🚀 Large factorial: ${n}! has ${result.toString().length} digits!`);
    }

    if (Number(result) > 1000000) {
      insights.push(`📊 Huge number: That's over ${(Number(result) / 1000000).toFixed(0)} million arrangements!`);
    }

    insights.push(`🔢 Real-world: ${n}! is the number of ways to arrange ${n} distinct items in a row.`);

    return insights;
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
      link.download = `permutation-combination-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Permutation & Combination Results</title>
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
              <CardTitle className="text-xl text-gray-900">Select Calculation Type</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Tab Selection */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger
                    value="permutation"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-600 rounded-md py-2 transition-all"
                  >
                    Permutation
                  </TabsTrigger>
                  <TabsTrigger
                    value="combination"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-600 rounded-md py-2 transition-all"
                  >
                    Combination
                  </TabsTrigger>
                  <TabsTrigger
                    value="factorial"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-600 rounded-md py-2 transition-all"
                  >
                    Factorial
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="permutation" className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="perm-n" className="text-sm font-medium text-gray-700">
                      Total Items (n) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="perm-n"
                      type="number"
                      value={n}
                      onChange={(e) => setN(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 10"
                      min="0"
                      max="170"
                    />
                    <p className="text-xs text-gray-500 mt-1">Total number of items available</p>
                  </div>

                  <div>
                    <Label htmlFor="perm-r" className="text-sm font-medium text-gray-700">
                      Items to Arrange (r) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="perm-r"
                      type="number"
                      value={r}
                      onChange={(e) => setR(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 3"
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">Number of items to arrange (r ≤ n)</p>
                  </div>

                  <Button
                    onClick={calculatePermutation}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate P(n, r)
                  </Button>
                </TabsContent>

                <TabsContent value="combination" className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="comb-n" className="text-sm font-medium text-gray-700">
                      Total Items (n) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="comb-n"
                      type="number"
                      value={n}
                      onChange={(e) => setN(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 10"
                      min="0"
                      max="170"
                    />
                    <p className="text-xs text-gray-500 mt-1">Total number of items available</p>
                  </div>

                  <div>
                    <Label htmlFor="comb-r" className="text-sm font-medium text-gray-700">
                      Items to Choose (r) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="comb-r"
                      type="number"
                      value={r}
                      onChange={(e) => setR(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 3"
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">Number of items to choose (r ≤ n)</p>
                  </div>

                  <Button
                    onClick={calculateCombination}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate C(n, r)
                  </Button>
                </TabsContent>

                <TabsContent value="factorial" className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="factorial-n" className="text-sm font-medium text-gray-700">
                      Number (n) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="factorial-n"
                      type="number"
                      value={factorialN}
                      onChange={(e) => setFactorialN(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 5"
                      min="0"
                      max="170"
                    />
                    <p className="text-xs text-gray-500 mt-1">Calculate n! (factorial of n)</p>
                  </div>

                  <Button
                    onClick={calculateFactorial}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate n!
                  </Button>
                </TabsContent>
              </Tabs>

              {/* Quick Examples */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-gray-900 text-sm mb-3">📚 Quick Examples:</h3>
                <div className="space-y-2 text-xs text-gray-700">
                  <p><strong>P(5,2)</strong>: Arrange 2 from 5 = 20 ways</p>
                  <p><strong>C(5,2)</strong>: Choose 2 from 5 = 10 ways</p>
                  <p><strong>5!</strong>: Arrange 5 items = 120 ways</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Results Area (2 columns) */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Calculation Results</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result ? (
                <div className="space-y-4">
                  {/* Main Result */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">
                        {result.type === 'permutation' && 'Permutation Result:'}
                        {result.type === 'combination' && 'Combination Result:'}
                        {result.type === 'factorial' && 'Factorial Result:'}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(result.result)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-mono text-3xl font-bold text-blue-700 break-all">
                      {result.result}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 font-mono">{result.formula}</p>
                  </div>

                  {/* Explanation */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">📖 Explanation</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{result.explanation}</p>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">🔢 Step-by-Step Solution</h3>
                    <div className="space-y-2">
                      {result.steps.map((step, index) => (
                        <div key={index} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          <p className="text-sm text-gray-700 font-mono pt-0.5">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Insights */}
                  {result.insights.length > 0 && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">✨ Insights</h3>
                      <div className="space-y-2">
                        {result.insights.map((insight, index) => (
                          <p key={index} className="text-sm text-gray-700 leading-relaxed">
                            {insight}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center text-gray-500">
                    <Calculator className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Select a calculation type and enter values</p>
                    <p className="text-sm mt-2">Results will appear here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reference Card */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-xl text-gray-900">Formulas & Key Concepts</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">📊 Permutation</h3>
              <p className="text-sm text-gray-700 mb-2 font-mono">P(n, r) = n! / (n - r)!</p>
              <p className="text-xs text-gray-600">
                <strong>Order matters.</strong> Number of ways to arrange r items from n items.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Example: Arranging 3 letters from ABC gives 6 results: ABC, ACB, BAC, BCA, CAB, CBA
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">🎯 Combination</h3>
              <p className="text-sm text-gray-700 mb-2 font-mono">C(n, r) = n! / ((n - r)! × r!)</p>
              <p className="text-xs text-gray-600">
                <strong>Order doesn't matter.</strong> Number of ways to choose r items from n items.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Example: Choosing 3 letters from ABC gives 1 result: {'{A, B, C}'}
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">🔢 Factorial</h3>
              <p className="text-sm text-gray-700 mb-2 font-mono">n! = n × (n-1) × ... × 2 × 1</p>
              <p className="text-xs text-gray-600">
                <strong>Total arrangements.</strong> Number of ways to arrange n distinct items.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Example: 5! = 5 × 4 × 3 × 2 × 1 = 120
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🔑 Key Difference</h3>
            <p className="text-sm text-gray-700">
              <strong>Permutation (P):</strong> Used when the order of selection matters (e.g., race winners, passwords, seating arrangements).
            </p>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Combination (C):</strong> Used when the order doesn't matter (e.g., lottery numbers, team selection, card hands).
            </p>
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
        calculatorName="Permutation & Combination Calculator"
      />
    </div>
  );
}

