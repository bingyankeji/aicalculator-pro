'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Copy, Share2, Printer } from 'lucide-react';

interface LogResult {
  result: number;
  decimal: string;
  steps: string[];
  explanation: string;
  logForm: string;
  expForm: string;
}

interface ConversionResult {
  result: string;
  steps: string[];
  explanation: string;
}

export default function LogarithmCalculator() {
  const [activeTab, setActiveTab] = useState('logarithm');
  
  // Logarithm Calculation
  const [logBase, setLogBase] = useState('10');
  const [logValue, setLogValue] = useState('');
  const [logResult, setLogResult] = useState<LogResult | null>(null);
  
  // Exponential to Logarithm & vice versa
  const [conversionType, setConversionType] = useState<'exp-to-log' | 'log-to-exp'>('exp-to-log');
  const [expBase, setExpBase] = useState('');
  const [expExponent, setExpExponent] = useState('');
  const [expResult, setExpResult] = useState('');
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);

  const calculateLogarithm = () => {
    const base = parseFloat(logBase);
    const value = parseFloat(logValue);

    if (isNaN(base) || isNaN(value)) {
      alert('Please enter valid numbers.');
      return;
    }

    if (value <= 0) {
      alert('Logarithm is only defined for positive numbers!');
      return;
    }

    if (base <= 0 || base === 1) {
      alert('Base must be positive and not equal to 1!');
      return;
    }

    const result = Math.log(value) / Math.log(base);
    const steps: string[] = [];
    let explanation = '';
    let logForm = '';
    let expForm = '';

    if (base === 10) {
      steps.push(`Step 1: Calculate common logarithm (log₁₀)`);
      steps.push(`log₁₀(${value}) = ${result}`);
      logForm = `log₁₀(${value}) = ${result.toFixed(6)}`;
      expForm = `10^${result.toFixed(6)} = ${value}`;
      explanation = `The common logarithm (base 10) of ${value} is ${result.toFixed(6)}. This means 10 raised to the power of ${result.toFixed(6)} equals ${value}.`;
    } else if (base === Math.E) {
      steps.push(`Step 1: Calculate natural logarithm (ln)`);
      steps.push(`ln(${value}) = ${result}`);
      logForm = `ln(${value}) = ${result.toFixed(6)}`;
      expForm = `e^${result.toFixed(6)} = ${value}`;
      explanation = `The natural logarithm (base e ≈ 2.71828) of ${value} is ${result.toFixed(6)}. This means e raised to the power of ${result.toFixed(6)} equals ${value}.`;
    } else {
      steps.push(`Step 1: Use change of base formula`);
      steps.push(`log_${base}(${value}) = ln(${value}) / ln(${base})`);
      steps.push(`Step 2: Calculate ln(${value}) = ${Math.log(value)}`);
      steps.push(`Step 3: Calculate ln(${base}) = ${Math.log(base)}`);
      steps.push(`Step 4: Divide: ${Math.log(value)} / ${Math.log(base)} = ${result}`);
      logForm = `log_${base}(${value}) = ${result.toFixed(6)}`;
      expForm = `${base}^${result.toFixed(6)} = ${value}`;
      explanation = `The logarithm base ${base} of ${value} is ${result.toFixed(6)}. This means ${base} raised to the power of ${result.toFixed(6)} equals ${value}.`;
    }

    setLogResult({
      result,
      decimal: result.toLocaleString('en-US', { maximumFractionDigits: 10 }),
      steps,
      explanation,
      logForm,
      expForm,
    });
  };

  const performConversion = () => {
    if (conversionType === 'exp-to-log') {
      // Convert a^b = c to log_a(c) = b
      const a = parseFloat(expBase);
      const b = parseFloat(expExponent);
      const c = parseFloat(expResult);

      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alert('Please enter valid numbers for all fields.');
        return;
      }

      const steps: string[] = [];
      steps.push(`Given exponential form: ${a}^${b} = ${c}`);
      steps.push(`Step 1: Apply the definition of logarithm`);
      steps.push(`If a^b = c, then log_a(c) = b`);
      steps.push(`Step 2: Convert to logarithmic form`);
      steps.push(`log_${a}(${c}) = ${b}`);

      const verification = Math.pow(a, b);
      steps.push(``);
      steps.push(`Verification: ${a}^${b} = ${verification.toFixed(6)}`);
      if (Math.abs(verification - c) < 0.01) {
        steps.push(`✓ The conversion is correct!`);
      } else {
        steps.push(`⚠ Note: ${a}^${b} ≈ ${verification.toFixed(6)}, not exactly ${c}`);
      }

      setConversionResult({
        result: `log_${a}(${c}) = ${b}`,
        steps,
        explanation: `The exponential equation ${a}^${b} = ${c} can be rewritten in logarithmic form as log_${a}(${c}) = ${b}. This states that the logarithm base ${a} of ${c} equals ${b}.`,
      });
    } else {
      // Convert log_a(c) = b to a^b = c
      const a = parseFloat(expBase);
      const c = parseFloat(expResult);
      const b = parseFloat(expExponent);

      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alert('Please enter valid numbers for all fields.');
        return;
      }

      const steps: string[] = [];
      steps.push(`Given logarithmic form: log_${a}(${c}) = ${b}`);
      steps.push(`Step 1: Apply the definition of logarithm`);
      steps.push(`If log_a(c) = b, then a^b = c`);
      steps.push(`Step 2: Convert to exponential form`);
      steps.push(`${a}^${b} = ${c}`);

      const verification = Math.pow(a, b);
      steps.push(``);
      steps.push(`Verification: ${a}^${b} = ${verification.toFixed(6)}`);
      if (Math.abs(verification - c) < 0.01) {
        steps.push(`✓ The conversion is correct!`);
      } else {
        steps.push(`⚠ Note: ${a}^${b} ≈ ${verification.toFixed(6)}, not exactly ${c}`);
      }

      setConversionResult({
        result: `${a}^${b} = ${c}`,
        steps,
        explanation: `The logarithmic equation log_${a}(${c}) = ${b} can be rewritten in exponential form as ${a}^${b} = ${c}. This states that ${a} raised to the power of ${b} equals ${c}.`,
      });
    }
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
          title: 'Logarithm Calculator',
          text: 'Check out this Logarithm Calculator!',
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
                    value="logarithm" 
                    className="py-3 px-4 text-sm font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Logarithm Calculator
                  </TabsTrigger>
                  <TabsTrigger 
                    value="conversion" 
                    className="py-3 px-4 text-sm font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Form Conversion
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6">
              {activeTab === 'logarithm' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="logBase" className="text-sm font-medium">
                      Base (a) <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="logBase"
                      value={logBase}
                      onChange={(e) => setLogBase(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="10">10 (Common log - log₁₀)</option>
                      <option value={Math.E.toString()}>e ≈ 2.71828 (Natural log - ln)</option>
                      <option value="2">2 (Binary log - log₂)</option>
                      <option value="custom">Custom base...</option>
                    </select>
                    {logBase === 'custom' && (
                      <input
                        type="number"
                        value={logBase}
                        onChange={(e) => setLogBase(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                        placeholder="Enter custom base"
                        min="0"
                        step="any"
                      />
                    )}
                    <p className="text-xs text-gray-500">The base of the logarithm (must be positive and ≠ 1)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logValue" className="text-sm font-medium">
                      Value (x) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="logValue"
                      type="number"
                      value={logValue}
                      onChange={(e) => setLogValue(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 100"
                      min="0"
                      step="any"
                      required
                    />
                    <p className="text-xs text-gray-500">The number for which to find the logarithm (must be positive)</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm font-semibold text-blue-900 mb-2">Common Logarithms:</p>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• log₁₀(100) = 2</li>
                      <li>• ln(e) = 1</li>
                      <li>• log₂(8) = 3</li>
                      <li>• log₁₀(1) = 0 (any base)</li>
                    </ul>
                  </div>

                  <Button
                    onClick={calculateLogarithm}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate Logarithm
                  </Button>
                </div>
              )}

              {activeTab === 'conversion' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Conversion Type <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => setConversionType('exp-to-log')}
                        className={`p-3 rounded-lg border-2 transition-all text-sm ${
                          conversionType === 'exp-to-log'
                            ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        Exponential → Logarithm<br />
                        <span className="text-xs">(a^b = c → log_a(c) = b)</span>
                      </button>
                      <button
                        onClick={() => setConversionType('log-to-exp')}
                        className={`p-3 rounded-lg border-2 transition-all text-sm ${
                          conversionType === 'log-to-exp'
                            ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        Logarithm → Exponential<br />
                        <span className="text-xs">(log_a(c) = b → a^b = c)</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-xs font-semibold text-gray-700 mb-3">
                      {conversionType === 'exp-to-log' ? 'Enter Exponential Form (a^b = c):' : 'Enter Logarithmic Form (log_a(c) = b):'}
                    </p>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="expBase" className="text-xs text-gray-600">
                          {conversionType === 'exp-to-log' ? 'Base (a)' : 'Base (a)'}
                        </Label>
                        <input
                          id="expBase"
                          type="number"
                          value={expBase}
                          onChange={(e) => setExpBase(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="e.g., 10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expExponent" className="text-xs text-gray-600">
                          {conversionType === 'exp-to-log' ? 'Exponent (b)' : 'Result (b)'}
                        </Label>
                        <input
                          id="expExponent"
                          type="number"
                          value={expExponent}
                          onChange={(e) => setExpExponent(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="e.g., 2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expResult" className="text-xs text-gray-600">
                          {conversionType === 'exp-to-log' ? 'Result (c)' : 'Value (c)'}
                        </Label>
                        <input
                          id="expResult"
                          type="number"
                          value={expResult}
                          onChange={(e) => setExpResult(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="e.g., 100"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={performConversion}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Convert
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
                {activeTab === 'logarithm' ? 'Logarithm Result' : 'Conversion Result'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {activeTab === 'logarithm' && logResult && (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg border-2 border-blue-400 p-4">
                    <p className="text-sm text-gray-600 mb-2">Result:</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl sm:text-3xl font-bold text-blue-700 break-all">
                        {logResult.decimal}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(logResult.result.toString())}
                        className="flex-shrink-0 ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-600 mb-1">Logarithmic Form:</p>
                      <p className="font-mono text-base font-bold text-gray-900">
                        {logResult.logForm}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-600 mb-1">Exponential Form:</p>
                      <p className="font-mono text-base font-bold text-gray-900">
                        {logResult.expForm}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Explanation:</p>
                    <p className="text-sm text-gray-700">{logResult.explanation}</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Step-by-Step:</p>
                    <ol className="space-y-2">
                      {logResult.steps.map((step, index) => (
                        <li key={index} className="text-sm text-gray-700 font-mono">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

              {activeTab === 'conversion' && conversionResult && (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg border-2 border-blue-400 p-4">
                    <p className="text-sm text-gray-600 mb-2">Converted Form:</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xl sm:text-2xl font-bold text-blue-700 break-all">
                        {conversionResult.result}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(conversionResult.result)}
                        className="flex-shrink-0 ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Explanation:</p>
                    <p className="text-sm text-gray-700">{conversionResult.explanation}</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Step-by-Step:</p>
                    <ol className="space-y-2">
                      {conversionResult.steps.map((step, index) => (
                        <li key={index} className="text-sm text-gray-700 font-mono">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

              {!logResult && !conversionResult && (
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

      {/* Logarithm Rules Reference */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardTitle className="text-xl">Logarithm Properties & Rules</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Rule</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">log_a(xy) = log_a(x) + log_a(y)</p>
                <p className="text-gray-700">The log of a product equals the sum of the logs</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    log₁₀(100) = log₁₀(10 × 10)<br />
                    = log₁₀(10) + log₁₀(10)<br />
                    = 1 + 1 = 2
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quotient Rule</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">log_a(x/y) = log_a(x) - log_a(y)</p>
                <p className="text-gray-700">The log of a quotient equals the difference of the logs</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    log₁₀(100/10) = log₁₀(100) - log₁₀(10)<br />
                    = 2 - 1 = 1
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Power Rule</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">log_a(x^n) = n × log_a(x)</p>
                <p className="text-gray-700">The log of a power equals the exponent times the log</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    log₁₀(100²) = 2 × log₁₀(100)<br />
                    = 2 × 2 = 4
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Change of Base</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">log_a(x) = log_b(x) / log_b(a)</p>
                <p className="text-gray-700">Convert logarithm to any base</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    log₂(8) = log₁₀(8) / log₁₀(2)<br />
                    = 0.903 / 0.301 ≈ 3
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Special Values</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-base">log_a(1) = 0</p>
                <p className="font-mono text-base">log_a(a) = 1</p>
                <p className="text-gray-700">Important identities</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Examples:</p>
                  <p className="font-mono text-xs">
                    log₁₀(1) = 0<br />
                    log₁₀(10) = 1<br />
                    ln(1) = 0<br />
                    ln(e) = 1
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Inverse Property</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-base">a^(log_a(x)) = x</p>
                <p className="font-mono text-base">log_a(a^x) = x</p>
                <p className="text-gray-700">Logarithm and exponent are inverses</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Examples:</p>
                  <p className="font-mono text-xs">
                    10^(log₁₀(5)) = 5<br />
                    log₁₀(10³) = 3
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

