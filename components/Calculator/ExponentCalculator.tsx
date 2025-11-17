'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Copy, Share2, Printer } from 'lucide-react';

interface PowerResult {
  result: string;
  decimal: string;
  scientific: string;
  steps: string[];
  explanation: string;
}

interface GrowthResult {
  finalAmount: number;
  totalGrowth: number;
  growthPercentage: number;
  steps: string[];
}

export default function ExponentCalculator() {
  const [activeTab, setActiveTab] = useState('power');
  const [base, setBase] = useState('');
  const [exponent, setExponent] = useState('');
  const [powerResult, setPowerResult] = useState<PowerResult | null>(null);
  
  const [initialValue, setInitialValue] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundingPeriods, setCompoundingPeriods] = useState('1');
  const [calculationType, setCalculationType] = useState<'growth' | 'decay'>('growth');
  const [growthResult, setGrowthResult] = useState<GrowthResult | null>(null);

  const calculatePower = () => {
    const b = parseFloat(base);
    const e = parseFloat(exponent);

    if (isNaN(b) || isNaN(e)) {
      alert('Please enter valid numbers for base and exponent.');
      return;
    }

    const result = Math.pow(b, e);
    
    if (!isFinite(result)) {
      alert('Result is too large or invalid!');
      return;
    }

    const steps: string[] = [];
    let explanation = '';

    if (e === 0) {
      steps.push(`Step 1: Any number to the power of 0 equals 1`);
      steps.push(`${b}^0 = 1`);
      explanation = `The zero exponent rule states that any non-zero number raised to the power of 0 equals 1.`;
    } else if (e === 1) {
      steps.push(`Step 1: Any number to the power of 1 equals itself`);
      steps.push(`${b}^1 = ${b}`);
      explanation = `The identity exponent rule: any number raised to the power of 1 equals itself.`;
    } else if (e < 0) {
      const positiveExp = Math.abs(e);
      const positiveResult = Math.pow(b, positiveExp);
      steps.push(`Step 1: Negative exponent means reciprocal`);
      steps.push(`${b}^${e} = 1 / ${b}^${positiveExp}`);
      steps.push(`Step 2: Calculate ${b}^${positiveExp} = ${positiveResult}`);
      steps.push(`Step 3: Take reciprocal: 1 / ${positiveResult} = ${result}`);
      explanation = `Negative exponents represent reciprocals: x^(-n) = 1 / x^n.`;
    } else if (Number.isInteger(e) && e > 0 && e <= 10) {
      steps.push(`Step 1: Multiply ${b} by itself ${e} times`);
      let calculation = b.toString();
      for (let i = 1; i < e; i++) {
        calculation += ` × ${b}`;
      }
      steps.push(`${calculation} = ${result}`);
      explanation = `${b}^${e} means multiplying ${b} by itself ${e} times, which equals ${result}.`;
    } else {
      steps.push(`Step 1: Calculate ${b}^${e}`);
      steps.push(`Result = ${result}`);
      explanation = `Using the exponential function: ${b}^${e} = ${result}.`;
    }

    const absResult = Math.abs(result);
    let scientific = '';
    if (absResult >= 1000 || (absResult < 0.001 && absResult > 0)) {
      const exponent = Math.floor(Math.log10(absResult));
      const mantissa = result / Math.pow(10, exponent);
      scientific = `${mantissa.toFixed(3)} × 10^${exponent}`;
    } else {
      scientific = result.toString();
    }

    setPowerResult({
      result: result.toString(),
      decimal: result.toLocaleString('en-US', { maximumFractionDigits: 10 }),
      scientific,
      steps,
      explanation,
    });
  };

  const calculateGrowth = () => {
    const p = parseFloat(initialValue);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    const n = parseFloat(compoundingPeriods);

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n)) {
      alert('Please enter valid numbers for all fields.');
      return;
    }

    if (p <= 0 || r <= 0 || t <= 0 || n <= 0) {
      alert('All values must be positive numbers.');
      return;
    }

    const rateDecimal = calculationType === 'growth' ? r / 100 : -r / 100;
    const finalAmount = p * Math.pow(1 + rateDecimal / n, n * t);
    const totalGrowth = finalAmount - p;
    const growthPercentage = (totalGrowth / p) * 100;

    const steps: string[] = [];
    steps.push(`Formula: A = P(1 + r/n)^(nt)`);
    steps.push(`Where:`);
    steps.push(`  P = Initial value = ${p}`);
    steps.push(`  r = Rate per period = ${r}% = ${rateDecimal}`);
    steps.push(`  n = Compounding periods per unit time = ${n}`);
    steps.push(`  t = Time = ${t}`);
    steps.push(``);
    steps.push(`Step 1: Calculate (1 + r/n)`);
    steps.push(`  (1 + ${rateDecimal}/${n}) = ${(1 + rateDecimal / n).toFixed(6)}`);
    steps.push(``);
    steps.push(`Step 2: Calculate the exponent (nt)`);
    steps.push(`  ${n} × ${t} = ${n * t}`);
    steps.push(``);
    steps.push(`Step 3: Calculate (1 + r/n)^(nt)`);
    steps.push(`  ${(1 + rateDecimal / n).toFixed(6)}^${n * t} = ${Math.pow(1 + rateDecimal / n, n * t).toFixed(6)}`);
    steps.push(``);
    steps.push(`Step 4: Multiply by P`);
    steps.push(`  ${p} × ${Math.pow(1 + rateDecimal / n, n * t).toFixed(6)} = ${finalAmount.toFixed(2)}`);

    setGrowthResult({
      finalAmount,
      totalGrowth,
      growthPercentage,
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
          title: 'Exponent Calculator',
          text: 'Check out this Exponent Calculator!',
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
                    value="power" 
                    className="py-3 px-4 text-sm font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Power Calculator
                  </TabsTrigger>
                  <TabsTrigger 
                    value="growth" 
                    className="py-3 px-4 text-sm font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Growth & Decay
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6">
              {activeTab === 'power' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="base" className="text-sm font-medium">
                      Base (x) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="base"
                      type="number"
                      value={base}
                      onChange={(e) => setBase(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 2"
                      step="any"
                      required
                    />
                    <p className="text-xs text-gray-500">The number being raised to a power</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exponent" className="text-sm font-medium">
                      Exponent (y) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="exponent"
                      type="number"
                      value={exponent}
                      onChange={(e) => setExponent(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 3"
                      step="any"
                      required
                    />
                    <p className="text-xs text-gray-500">The power to which the base is raised</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm font-semibold text-blue-900 mb-2">Examples:</p>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• Positive exponent: 2^3 = 8</li>
                      <li>• Negative exponent: 2^(-2) = 0.25</li>
                      <li>• Fractional exponent: 8^(1/3) = 2</li>
                      <li>• Zero exponent: 5^0 = 1</li>
                    </ul>
                  </div>

                  <Button
                    onClick={calculatePower}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate x^y
                  </Button>
                </div>
              )}

              {activeTab === 'growth' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Calculation Type <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setCalculationType('growth')}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          calculationType === 'growth'
                            ? 'border-green-500 bg-green-50 text-green-700 font-semibold'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        📈 Growth
                      </button>
                      <button
                        onClick={() => setCalculationType('decay')}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          calculationType === 'decay'
                            ? 'border-red-500 bg-red-50 text-red-700 font-semibold'
                            : 'border-gray-200 hover:border-red-300'
                        }`}
                      >
                        📉 Decay
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="initialValue" className="text-sm font-medium">
                      Initial Value (P) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="initialValue"
                      type="number"
                      value={initialValue}
                      onChange={(e) => setInitialValue(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 1000"
                      min="0"
                      step="any"
                      required
                    />
                    <p className="text-xs text-gray-500">Starting amount or population</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rate" className="text-sm font-medium">
                      Rate (%) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="rate"
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 5"
                      min="0"
                      step="any"
                      required
                    />
                    <p className="text-xs text-gray-500">{calculationType === 'growth' ? 'Growth' : 'Decay'} rate per period</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm font-medium">
                      Time (t) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="time"
                      type="number"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 10"
                      min="0"
                      step="any"
                      required
                    />
                    <p className="text-xs text-gray-500">Number of time periods</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="compoundingPeriods" className="text-sm font-medium">
                      Compounding Periods (n) <span className="text-gray-500 text-xs">- Optional</span>
                    </Label>
                    <input
                      id="compoundingPeriods"
                      type="number"
                      value={compoundingPeriods}
                      onChange={(e) => setCompoundingPeriods(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="1"
                      min="1"
                      step="1"
                    />
                    <p className="text-xs text-gray-500">Default: 1 (annual). Use 12 for monthly</p>
                  </div>

                  <Button
                    onClick={calculateGrowth}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 min-h-[44px]"
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
                {activeTab === 'power' ? 'Power Calculation Result' : 'Growth/Decay Result'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {activeTab === 'power' && powerResult && (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg border-2 border-blue-400 p-4">
                    <p className="text-sm text-gray-600 mb-2">Result:</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl sm:text-3xl font-bold text-blue-700 break-all">
                        {powerResult.decimal}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(powerResult.result)}
                        className="flex-shrink-0 ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-2">Scientific Notation:</p>
                    <span className="font-mono text-lg text-gray-900">
                      {powerResult.scientific}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Explanation:</p>
                    <p className="text-sm text-gray-700">{powerResult.explanation}</p>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Step-by-Step:</p>
                    <ol className="space-y-2">
                      {powerResult.steps.map((step, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

              {activeTab === 'growth' && growthResult && (
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg border-2 border-green-400 p-4">
                    <p className="text-sm text-gray-600 mb-2">Final Amount:</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-3xl text-green-700">
                        ${growthResult.finalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(growthResult.finalAmount.toFixed(2))}
                        className="flex-shrink-0 ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-600 mb-1">Total {calculationType === 'growth' ? 'Growth' : 'Decay'}:</p>
                      <p className="font-bold text-xl text-gray-900">
                        ${Math.abs(growthResult.totalGrowth).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-600 mb-1">Percentage:</p>
                      <p className="font-bold text-xl text-gray-900">
                        {Math.abs(growthResult.growthPercentage).toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Calculation Steps:</p>
                    <div className="space-y-1">
                      {growthResult.steps.map((step, index) => (
                        <p key={index} className="text-xs text-gray-700 font-mono">
                          {step}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {!powerResult && !growthResult && (
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

      {/* Exponent Rules Reference */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="text-xl">Exponent Rules Reference</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border-2 border-purple-200 p-4">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Product Rule</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">x^a × x^b = x^(a+b)</p>
                <p className="text-gray-700">When multiplying same bases, add exponents</p>
                <div className="bg-purple-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    2^3 × 2^4 = 2^(3+4) = 2^7 = 128
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-pink-200 p-4">
              <h3 className="text-lg font-semibold text-pink-900 mb-3">Quotient Rule</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">x^a ÷ x^b = x^(a-b)</p>
                <p className="text-gray-700">When dividing same bases, subtract exponents</p>
                <div className="bg-pink-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    5^6 ÷ 5^2 = 5^(6-2) = 5^4 = 625
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Power Rule</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">(x^a)^b = x^(a×b)</p>
                <p className="text-gray-700">Power of a power: multiply exponents</p>
                <div className="bg-blue-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    (3^2)^3 = 3^(2×3) = 3^6 = 729
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-green-200 p-4">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Zero Exponent</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">x^0 = 1</p>
                <p className="text-gray-700">Any non-zero number to power 0 equals 1</p>
                <div className="bg-green-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    999^0 = 1<br />
                    (-5)^0 = 1
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-orange-200 p-4">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">Negative Exponent</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">x^(-a) = 1 / x^a</p>
                <p className="text-gray-700">Negative exponent means reciprocal</p>
                <div className="bg-orange-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    2^(-3) = 1/2^3 = 1/8 = 0.125
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-teal-200 p-4">
              <h3 className="text-lg font-semibold text-teal-900 mb-3">Fractional Exponent</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">x^(1/n) = ⁿ√x</p>
                <p className="text-gray-700">Fractional exponent means root</p>
                <div className="bg-teal-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    16^(1/2) = √16 = 4<br />
                    8^(1/3) = ³√8 = 2
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-indigo-200 p-4">
              <h3 className="text-lg font-semibold text-indigo-900 mb-3">Power of Product</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">(xy)^a = x^a × y^a</p>
                <p className="text-gray-700">Distribute exponent to each factor</p>
                <div className="bg-indigo-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    (2×3)^2 = 2^2 × 3^2 = 4 × 9 = 36
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-red-200 p-4">
              <h3 className="text-lg font-semibold text-red-900 mb-3">Power of Quotient</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">(x/y)^a = x^a / y^a</p>
                <p className="text-gray-700">Distribute exponent to numerator and denominator</p>
                <div className="bg-red-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    (6/3)^2 = 6^2 / 3^2 = 36/9 = 4
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

