'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Copy, Share2, Printer } from 'lucide-react';

interface RootResult {
  result: number;
  decimal: string;
  exact: string;
  exponentForm: string;
  steps: string[];
  explanation: string;
}

interface OperationResult {
  result: number;
  decimal: string;
  simplified: string;
  steps: string[];
}

export default function RootCalculator() {
  const [activeTab, setActiveTab] = useState('root');
  
  // Root Calculation
  const [radicand, setRadicand] = useState('');
  const [rootIndex, setRootIndex] = useState('2');
  const [rootResult, setRootResult] = useState<RootResult | null>(null);
  
  // Root Operations
  const [operation, setOperation] = useState<'multiply' | 'divide' | 'add' | 'subtract'>('multiply');
  const [root1Radicand, setRoot1Radicand] = useState('');
  const [root1Index, setRoot1Index] = useState('2');
  const [root2Radicand, setRoot2Radicand] = useState('');
  const [root2Index, setRoot2Index] = useState('2');
  const [operationResult, setOperationResult] = useState<OperationResult | null>(null);

  // Calculate nth root
  const calculateRoot = () => {
    const x = parseFloat(radicand);
    const n = parseFloat(rootIndex);

    if (isNaN(x) || isNaN(n)) {
      alert('Please enter valid numbers.');
      return;
    }

    if (n === 0) {
      alert('Root index cannot be zero!');
      return;
    }

    if (x < 0 && n % 2 === 0) {
      alert('Cannot calculate even root of negative number! (Result would be complex)');
      return;
    }

    const result = x < 0 ? -Math.pow(Math.abs(x), 1/n) : Math.pow(x, 1/n);
    
    const steps: string[] = [];
    let exact = '';
    let explanation = '';

    // Generate steps based on root type
    if (n === 2) {
      steps.push(`Step 1: Calculate the square root of ${x}`);
      steps.push(`√${x} = ${result}`);
      exact = `√${x}`;
      explanation = `The square root (√) is the number that, when multiplied by itself, equals ${x}. So ${result} × ${result} = ${x}.`;
    } else if (n === 3) {
      steps.push(`Step 1: Calculate the cube root of ${x}`);
      steps.push(`∛${x} = ${result}`);
      exact = `∛${x}`;
      explanation = `The cube root (∛) is the number that, when multiplied by itself three times, equals ${x}. So ${result} × ${result} × ${result} ≈ ${x}.`;
    } else {
      steps.push(`Step 1: Calculate the ${n}th root of ${x}`);
      steps.push(`${n}√${x} = ${x}^(1/${n}) = ${result}`);
      exact = `${n}√${x}`;
      explanation = `The ${n}th root of ${x} is the number that, when raised to the power of ${n}, equals ${x}.`;
    }

    // Check if result is a perfect root
    const isInteger = Math.abs(result - Math.round(result)) < 0.0000001;
    if (isInteger) {
      const intResult = Math.round(result);
      steps.push(`Step 2: Verify: ${intResult}^${n} = ${Math.pow(intResult, n)}`);
      exact = intResult.toString();
      explanation += ` This is a perfect ${n === 2 ? 'square' : n === 3 ? 'cube' : `${n}th power`}.`;
    }

    setRootResult({
      result,
      decimal: result.toLocaleString('en-US', { maximumFractionDigits: 10 }),
      exact,
      exponentForm: `${x}^(1/${n})`,
      steps,
      explanation,
    });
  };

  // Calculate root operations
  const calculateOperation = () => {
    const r1 = parseFloat(root1Radicand);
    const n1 = parseFloat(root1Index);
    const r2 = parseFloat(root2Radicand);
    const n2 = parseFloat(root2Index);

    if (isNaN(r1) || isNaN(n1) || isNaN(r2) || isNaN(n2)) {
      alert('Please enter valid numbers for all fields.');
      return;
    }

    const val1 = Math.pow(r1, 1/n1);
    const val2 = Math.pow(r2, 1/n2);
    
    let result: number;
    let operationSymbol: string;
    let steps: string[] = [];
    let simplified = '';

    switch (operation) {
      case 'multiply':
        operationSymbol = '×';
        if (n1 === n2) {
          // Same index: √a × √b = √(a×b)
          result = Math.pow(r1 * r2, 1/n1);
          steps.push(`Step 1: When multiplying roots with same index, multiply the radicands`);
          steps.push(`${n1}√${r1} × ${n1}√${r2} = ${n1}√(${r1} × ${r2})`);
          steps.push(`= ${n1}√${r1 * r2}`);
          steps.push(`Step 2: Calculate the result`);
          steps.push(`= ${result}`);
          simplified = `${n1}√${r1 * r2}`;
        } else {
          // Different index: convert to decimal
          result = val1 * val2;
          steps.push(`Step 1: Convert each root to decimal`);
          steps.push(`${n1}√${r1} ≈ ${val1}`);
          steps.push(`${n2}√${r2} ≈ ${val2}`);
          steps.push(`Step 2: Multiply the decimal values`);
          steps.push(`${val1} × ${val2} = ${result}`);
          simplified = result.toFixed(6);
        }
        break;

      case 'divide':
        operationSymbol = '÷';
        if (n1 === n2) {
          // Same index: √a ÷ √b = √(a÷b)
          result = Math.pow(r1 / r2, 1/n1);
          steps.push(`Step 1: When dividing roots with same index, divide the radicands`);
          steps.push(`${n1}√${r1} ÷ ${n1}√${r2} = ${n1}√(${r1} ÷ ${r2})`);
          steps.push(`= ${n1}√${r1 / r2}`);
          steps.push(`Step 2: Calculate the result`);
          steps.push(`= ${result}`);
          simplified = `${n1}√${(r1 / r2).toFixed(2)}`;
        } else {
          result = val1 / val2;
          steps.push(`Step 1: Convert each root to decimal`);
          steps.push(`${n1}√${r1} ≈ ${val1}`);
          steps.push(`${n2}√${r2} ≈ ${val2}`);
          steps.push(`Step 2: Divide the decimal values`);
          steps.push(`${val1} ÷ ${val2} = ${result}`);
          simplified = result.toFixed(6);
        }
        break;

      case 'add':
        operationSymbol = '+';
        result = val1 + val2;
        if (n1 === n2 && r1 === r2) {
          // Like terms: √a + √a = 2√a
          steps.push(`Step 1: These are like terms (same root)`);
          steps.push(`${n1}√${r1} + ${n1}√${r1} = 2(${n1}√${r1})`);
          simplified = `2(${n1}√${r1})`;
        } else {
          steps.push(`Step 1: Convert each root to decimal`);
          steps.push(`${n1}√${r1} ≈ ${val1}`);
          steps.push(`${n2}√${r2} ≈ ${val2}`);
          steps.push(`Step 2: Add the decimal values`);
          steps.push(`${val1} + ${val2} = ${result}`);
          simplified = result.toFixed(6);
        }
        break;

      case 'subtract':
        operationSymbol = '-';
        result = val1 - val2;
        if (n1 === n2 && r1 === r2) {
          steps.push(`Step 1: These are like terms (same root)`);
          steps.push(`${n1}√${r1} - ${n1}√${r1} = 0`);
          simplified = '0';
        } else {
          steps.push(`Step 1: Convert each root to decimal`);
          steps.push(`${n1}√${r1} ≈ ${val1}`);
          steps.push(`${n2}√${r2} ≈ ${val2}`);
          steps.push(`Step 2: Subtract the decimal values`);
          steps.push(`${val1} - ${val2} = ${result}`);
          simplified = result.toFixed(6);
        }
        break;

      default:
        return;
    }

    setOperationResult({
      result,
      decimal: result.toLocaleString('en-US', { maximumFractionDigits: 10 }),
      simplified,
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
          title: 'Root Calculator',
          text: 'Check out this Root Calculator!',
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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Left: Calculator Input Area (1 column) */}
        <div className="xl:col-span-1">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 gap-3 h-auto bg-transparent p-0">
                  <TabsTrigger 
                    value="root" 
                    className="py-3 px-4 text-sm font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Root Calculation
                  </TabsTrigger>
                  <TabsTrigger 
                    value="operations" 
                    className="py-3 px-4 text-sm font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Root Operations
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6">
              {activeTab === 'root' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="radicand" className="text-sm font-medium">
                      Number (Radicand) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="radicand"
                      type="number"
                      value={radicand}
                      onChange={(e) => setRadicand(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 16"
                      step="any"
                      required
                    />
                    <p className="text-xs text-gray-500">The number under the radical sign</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rootIndex" className="text-sm font-medium">
                      Root Index (n) <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="rootIndex"
                      value={rootIndex}
                      onChange={(e) => setRootIndex(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="2">2 (Square Root √)</option>
                      <option value="3">3 (Cube Root ∛)</option>
                      <option value="4">4 (Fourth Root)</option>
                      <option value="5">5 (Fifth Root)</option>
                      <option value="custom">Custom...</option>
                    </select>
                    {rootIndex === 'custom' && (
                      <input
                        type="number"
                        value={rootIndex}
                        onChange={(e) => setRootIndex(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mt-2"
                        placeholder="Enter custom root index"
                        min="1"
                        step="1"
                      />
                    )}
                    <p className="text-xs text-gray-500">The index of the root (2 for square root, 3 for cube root, etc.)</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm font-semibold text-blue-900 mb-2">Common Roots:</p>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• √16 = 4 (square root)</li>
                      <li>• ∛27 = 3 (cube root)</li>
                      <li>• 4√16 = 2 (fourth root)</li>
                      <li>• √(-9) = undefined (even root of negative)</li>
                    </ul>
                  </div>

                  <Button
                    onClick={calculateRoot}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate Root
                  </Button>
                </div>
              )}

              {activeTab === 'operations' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Operation <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 'multiply', label: 'Multiply', icon: '×' },
                        { value: 'divide', label: 'Divide', icon: '÷' },
                        { value: 'add', label: 'Add', icon: '+' },
                        { value: 'subtract', label: 'Subtract', icon: '-' },
                      ].map((op) => (
                        <button
                          key={op.value}
                          onClick={() => setOperation(op.value as any)}
                          className={`p-3 rounded-lg border-2 transition-all text-sm ${
                            operation === op.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          {op.icon} {op.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">First Root:</p>
                    <div className="space-y-2">
                      <input
                        type="number"
                        value={root1Radicand}
                        onChange={(e) => setRoot1Radicand(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Radicand"
                      />
                      <select
                        value={root1Index}
                        onChange={(e) => setRoot1Index(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="2">√ (Square Root)</option>
                        <option value="3">∛ (Cube Root)</option>
                        <option value="4">4√ (Fourth Root)</option>
                        <option value="5">5√ (Fifth Root)</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Second Root:</p>
                    <div className="space-y-2">
                      <input
                        type="number"
                        value={root2Radicand}
                        onChange={(e) => setRoot2Radicand(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Radicand"
                      />
                      <select
                        value={root2Index}
                        onChange={(e) => setRoot2Index(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="2">√ (Square Root)</option>
                        <option value="3">∛ (Cube Root)</option>
                        <option value="4">4√ (Fourth Root)</option>
                        <option value="5">5√ (Fifth Root)</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    onClick={calculateOperation}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Results Area (2 columns) */}
        <div className="xl:col-span-2">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl">
                {activeTab === 'root' ? 'Root Calculation Result' : 'Operation Result'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {activeTab === 'root' && rootResult && (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg border-2 border-blue-400 p-4">
                    <p className="text-sm text-gray-600 mb-2">Decimal Result:</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl sm:text-3xl font-bold text-blue-700 break-all">
                        {rootResult.decimal}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(rootResult.result.toString())}
                        className="flex-shrink-0 ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-600 mb-1">Exact Form:</p>
                      <p className="font-mono text-lg font-bold text-gray-900">
                        {rootResult.exact}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-600 mb-1">Exponent Form:</p>
                      <p className="font-mono text-lg font-bold text-gray-900">
                        {rootResult.exponentForm}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Explanation:</p>
                    <p className="text-sm text-gray-700">{rootResult.explanation}</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Step-by-Step:</p>
                    <ol className="space-y-2">
                      {rootResult.steps.map((step, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

              {activeTab === 'operations' && operationResult && (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg border-2 border-blue-400 p-4">
                    <p className="text-sm text-gray-600 mb-2">Result:</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl sm:text-3xl font-bold text-blue-700 break-all">
                        {operationResult.decimal}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(operationResult.result.toString())}
                        className="flex-shrink-0 ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-2">Simplified Form:</p>
                    <p className="font-mono text-xl font-bold text-gray-900">
                      {operationResult.simplified}
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Step-by-Step:</p>
                    <ol className="space-y-2">
                      {operationResult.steps.map((step, index) => (
                        <li key={index} className="text-sm text-gray-700 font-mono">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

              {!rootResult && !operationResult && (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center text-gray-500">
                    <Calculator className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Enter values and click Calculate to see results</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Reference */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardTitle className="text-xl">Root Properties & Rules</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Rule</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">ⁿ√a × ⁿ√b = ⁿ√(a×b)</p>
                <p className="text-gray-700">Multiply roots with same index</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    √2 × √8 = √(2×8) = √16 = 4
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quotient Rule</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">ⁿ√a ÷ ⁿ√b = ⁿ√(a÷b)</p>
                <p className="text-gray-700">Divide roots with same index</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    √50 ÷ √2 = √(50÷2) = √25 = 5
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Power Rule</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">(ⁿ√a)^m = ⁿ√(a^m)</p>
                <p className="text-gray-700">Power of a root</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    (√2)^2 = 2<br />
                    (∛8)^3 = 8
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Exponent Form</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">ⁿ√a = a^(1/n)</p>
                <p className="text-gray-700">Root as fractional exponent</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    √16 = 16^(1/2) = 4<br />
                    ∛27 = 27^(1/3) = 3
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
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

