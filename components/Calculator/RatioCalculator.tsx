'use client';

import { useState, useEffect } from 'react';
import { Share2, Calculator, TrendingUp, BarChart3, Sparkles, CheckCircle } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface RatioInputs {
  a: number;
  b: number;
  c: number;
  d: number;
  calculationType: 'solve' | 'simplify' | 'compare';
  solveFor: 'c' | 'd';
}

interface RatioResult {
  originalRatio: string;
  simplifiedRatio: string;
  decimal: number;
  percentage: string;
  solvedValue?: number;
  analysis: RatioAnalysis;
  examples: RatioExample[];
  steps: CalculationStep[];
}

interface RatioAnalysis {
  ratioType: string;
  relationship: string;
  interpretation: string[];
  realWorldApplications: string[];
  mathematicalProperties: {
    isProportional: boolean;
    crossProduct: number;
    gcd: number;
    reciprocal: string;
  };
}

interface RatioExample {
  scenario: string;
  description: string;
  calculation: string;
}

interface CalculationStep {
  step: number;
  description: string;
  formula: string;
  result: string;
}

export function RatioCalculator() {
  const [inputs, setInputs] = useState<RatioInputs>({
    a: 3,
    b: 4,
    c: 6,
    d: 8,
    calculationType: 'simplify',
    solveFor: 'c',
  });

  const [result, setResult] = useState<RatioResult | null>(null);

  // URL parameter handling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const a = params.get('a');
    const b = params.get('b');
    const c = params.get('c');
    const d = params.get('d');
    const type = params.get('type');

    if (a && b) {
      const newInputs: RatioInputs = {
        a: parseFloat(a),
        b: parseFloat(b),
        c: c ? parseFloat(c) : inputs.c,
        d: d ? parseFloat(d) : inputs.d,
        calculationType: (type as any) || 'simplify',
        solveFor: inputs.solveFor,
      };
      setInputs(newInputs);
      
      setTimeout(() => {
        const calculatedResult = calculateRatio(newInputs);
        setResult(calculatedResult);
      }, 100);
    }
  }, []);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/ratio-calculator',
    getShareParams: () => ({
      a: inputs.a.toString(),
      b: inputs.b.toString(),
      c: inputs.c.toString(),
      d: inputs.d.toString(),
      type: inputs.calculationType,
    }),
    getShareText: () => result ? `Ratio ${inputs.a}:${inputs.b} = ${result.simplifiedRatio} (${result.percentage})` : 'Calculate ratios and proportions!',
  });

  const gcd = (a: number, b: number): number => {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
  };

  const simplifyRatio = (num1: number, num2: number): [number, number] => {
    const divisor = gcd(num1, num2);
    return [num1 / divisor, num2 / divisor];
  };

  const generateAnalysis = (a: number, b: number, c: number, d: number, type: string): RatioAnalysis => {
    const [simpleA, simpleB] = simplifyRatio(a, b);
    const ratio = a / b;
    const gcdValue = gcd(a, b);
    
    let ratioType = '';
    let relationship = '';
    
    if (ratio === 1) {
      ratioType = 'Equal Ratio (1:1)';
      relationship = 'Both quantities are equal';
    } else if (ratio > 1) {
      ratioType = 'Greater Than Ratio';
      relationship = `First quantity is ${ratio.toFixed(2)} times the second`;
    } else {
      ratioType = 'Less Than Ratio';
      relationship = `First quantity is ${(ratio * 100).toFixed(1)}% of the second`;
    }

    const interpretation = [
      `For every ${simpleA} units of the first quantity, there are ${simpleB} units of the second`,
      `The ratio represents a ${ratio > 1 ? 'positive' : 'inverse'} relationship`,
      `Simplified form reduces complexity while maintaining proportional relationship`,
      `Cross multiplication can verify proportional equivalence`
    ];

    const realWorldApplications = [
      `Recipe scaling: ${a} cups flour to ${b} cups water`,
      `Map scale: ${a} cm represents ${b} km in reality`,
      `Financial ratio: ${a} dollars profit per ${b} dollars investment`,
      `Speed ratio: ${a} miles in ${b} minutes`,
      `Mixing ratio: ${a} parts solution A to ${b} parts solution B`
    ];

    return {
      ratioType,
      relationship,
      interpretation,
      realWorldApplications,
      mathematicalProperties: {
        isProportional: Math.abs((a * d) - (b * c)) < 0.001,
        crossProduct: a * d,
        gcd: gcdValue,
        reciprocal: `${simpleB}:${simpleA}`
      }
    };
  };

  const generateExamples = (a: number, b: number): RatioExample[] => {
    const ratio = a / b;
    return [
      {
        scenario: 'Recipe Scaling',
        description: `Scale a recipe that uses ${a} cups flour and ${b} cups sugar`,
        calculation: `For double recipe: ${a * 2} cups flour, ${b * 2} cups sugar`
      },
      {
        scenario: 'Map Reading',
        description: `If ${a} cm on map = ${b} km in reality`,
        calculation: `Then 10 cm on map = ${(10 * b / a).toFixed(1)} km in reality`
      },
      {
        scenario: 'Investment Returns',
        description: `Investment ratio of ${a}:${b} (profit:investment)`,
        calculation: `$1000 investment yields $${(1000 * ratio).toFixed(2)} profit`
      },
      {
        scenario: 'Speed Calculation',
        description: `Travel ${a} miles in ${b} minutes`,
        calculation: `Speed = ${(a / b * 60).toFixed(1)} miles per hour`
      }
    ];
  };

  const generateSteps = (inputs: RatioInputs): CalculationStep[] => {
    const { a, b, c, d, calculationType, solveFor } = inputs;
    
    if (calculationType === 'simplify') {
      const gcdValue = gcd(a, b);
      const [simpleA, simpleB] = simplifyRatio(a, b);
      
      return [
        {
          step: 1,
          description: 'Find the Greatest Common Divisor (GCD)',
          formula: `GCD(${a}, ${b})`,
          result: gcdValue.toString()
        },
        {
          step: 2,
          description: 'Divide both terms by the GCD',
          formula: `${a} ÷ ${gcdValue} : ${b} ÷ ${gcdValue}`,
          result: `${simpleA}:${simpleB}`
        },
        {
          step: 3,
          description: 'Convert to decimal',
          formula: `${simpleA} ÷ ${simpleB}`,
          result: (a / b).toFixed(4)
        }
      ];
    } else if (calculationType === 'solve') {
      if (solveFor === 'c') {
        const result = (a * c) / b;
        return [
          {
            step: 1,
            description: 'Set up the proportion',
            formula: `${a}:${b} = ${c}:x`,
            result: `${a}/${b} = ${c}/x`
          },
          {
            step: 2,
            description: 'Cross multiply',
            formula: `${a} × x = ${b} × ${c}`,
            result: `${a}x = ${b * c}`
          },
          {
            step: 3,
            description: 'Solve for x',
            formula: `x = ${b * c} ÷ ${a}`,
            result: result.toFixed(4)
          }
        ];
      } else {
        const result = (b * c) / a;
        return [
          {
            step: 1,
            description: 'Set up the proportion',
            formula: `${a}:${b} = x:${d}`,
            result: `${a}/${b} = x/${d}`
          },
          {
            step: 2,
            description: 'Cross multiply',
            formula: `${a} × ${d} = ${b} × x`,
            result: `${a * d} = ${b}x`
          },
          {
            step: 3,
            description: 'Solve for x',
            formula: `x = ${a * d} ÷ ${b}`,
            result: result.toFixed(4)
          }
        ];
      }
    } else {
      // compare
      const ratio1 = a / b;
      const ratio2 = c / d;
      const difference = Math.abs(ratio1 - ratio2);
      
      return [
        {
          step: 1,
          description: 'Convert first ratio to decimal',
          formula: `${a} ÷ ${b}`,
          result: ratio1.toFixed(4)
        },
        {
          step: 2,
          description: 'Convert second ratio to decimal',
          formula: `${c} ÷ ${d}`,
          result: ratio2.toFixed(4)
        },
        {
          step: 3,
          description: 'Compare the ratios',
          formula: `|${ratio1.toFixed(4)} - ${ratio2.toFixed(4)}|`,
          result: `Difference: ${difference.toFixed(4)}`
        }
      ];
    }
  };

  const calculateRatio = (inputData: RatioInputs): RatioResult => {
    const { a, b, c, d, calculationType, solveFor } = inputData;
    
    const [simpleA, simpleB] = simplifyRatio(a, b);
    const decimal = a / b;
    const percentage = (decimal * 100).toFixed(2) + '%';
    
    let solvedValue: number | undefined;
    
    if (calculationType === 'solve') {
      if (solveFor === 'c') {
        solvedValue = (a * c) / b;
      } else {
        solvedValue = (b * c) / a;
      }
    }

    const analysis = generateAnalysis(a, b, c, d, calculationType);
    const examples = generateExamples(a, b);
    const steps = generateSteps(inputData);

    return {
      originalRatio: `${a}:${b}`,
      simplifiedRatio: `${simpleA}:${simpleB}`,
      decimal,
      percentage,
      solvedValue,
      analysis,
      examples,
      steps
    };
  };

  const handleCalculate = () => {
    if (inputs.a <= 0 || inputs.b <= 0) {
      alert('Please enter positive numbers for the ratio');
      return;
    }
    
    if (inputs.calculationType === 'solve' && (inputs.c <= 0 || inputs.d <= 0)) {
      alert('Please enter positive numbers for the proportion');
      return;
    }
    
    if (inputs.calculationType === 'compare' && (inputs.c <= 0 || inputs.d <= 0)) {
      alert('Please enter positive numbers for both ratios');
      return;
    }
    
    setResult(calculateRatio(inputs));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT: Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              Ratio Calculator
            </h3>
            
            {/* Calculation Type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Calculation Type</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'simplify', label: 'Simplify Ratio', desc: 'Reduce ratio to lowest terms' },
                  { value: 'solve', label: 'Solve Proportion', desc: 'Find missing value in proportion' },
                  { value: 'compare', label: 'Compare Ratios', desc: 'Compare two different ratios' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setInputs({...inputs, calculationType: option.value as any})}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      inputs.calculationType === option.value 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Ratio Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">
                {inputs.calculationType === 'compare' ? 'First Ratio' : 'Ratio'}
              </label>
              <div className="grid grid-cols-3 gap-3 items-center">
                <input
                  type="number"
                  value={inputs.a}
                  onChange={e => setInputs({...inputs, a: parseFloat(e.target.value) || 0})}
                  className="px-4 py-3 border rounded-lg text-center font-semibold"
                  placeholder="A"
                  min="0"
                  step="0.1"
                />
                <div className="text-center text-2xl font-bold text-gray-600">:</div>
                <input
                  type="number"
                  value={inputs.b}
                  onChange={e => setInputs({...inputs, b: parseFloat(e.target.value) || 0})}
                  className="px-4 py-3 border rounded-lg text-center font-semibold"
                  placeholder="B"
                  min="0"
                  step="0.1"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Enter the ratio as A:B (e.g., 3:4)
              </p>
            </div>

            {/* Secondary Ratio/Proportion Input */}
            {(inputs.calculationType === 'solve' || inputs.calculationType === 'compare') && (
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">
                  {inputs.calculationType === 'solve' ? 'Proportion' : 'Second Ratio'}
                </label>
                
                {inputs.calculationType === 'solve' && (
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-2">Solve for:</label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setInputs({...inputs, solveFor: 'c'})}
                        className={`px-4 py-2 rounded-lg border-2 ${
                          inputs.solveFor === 'c' 
                            ? 'border-blue-500 bg-blue-50 font-semibold' 
                            : 'border-gray-200'
                        }`}
                      >
                        Third term (C)
                      </button>
                      <button
                        onClick={() => setInputs({...inputs, solveFor: 'd'})}
                        className={`px-4 py-2 rounded-lg border-2 ${
                          inputs.solveFor === 'd' 
                            ? 'border-blue-500 bg-blue-50 font-semibold' 
                            : 'border-gray-200'
                        }`}
                      >
                        Fourth term (D)
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-3 gap-3 items-center">
                  <input
                    type="number"
                    value={inputs.c}
                    onChange={e => setInputs({...inputs, c: parseFloat(e.target.value) || 0})}
                    className={`px-4 py-3 border rounded-lg text-center font-semibold ${
                      inputs.calculationType === 'solve' && inputs.solveFor === 'c' 
                        ? 'bg-yellow-50 border-yellow-300' 
                        : ''
                    }`}
                    placeholder={inputs.calculationType === 'solve' && inputs.solveFor === 'c' ? '?' : 'C'}
                    min="0"
                    step="0.1"
                    disabled={inputs.calculationType === 'solve' && inputs.solveFor === 'c'}
                  />
                  <div className="text-center text-2xl font-bold text-gray-600">:</div>
                  <input
                    type="number"
                    value={inputs.d}
                    onChange={e => setInputs({...inputs, d: parseFloat(e.target.value) || 0})}
                    className={`px-4 py-3 border rounded-lg text-center font-semibold ${
                      inputs.calculationType === 'solve' && inputs.solveFor === 'd' 
                        ? 'bg-yellow-50 border-yellow-300' 
                        : ''
                    }`}
                    placeholder={inputs.calculationType === 'solve' && inputs.solveFor === 'd' ? '?' : 'D'}
                    min="0"
                    step="0.1"
                    disabled={inputs.calculationType === 'solve' && inputs.solveFor === 'd'}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {inputs.calculationType === 'solve' 
                    ? `Finding the missing value in proportion A:B = C:D`
                    : 'Enter the second ratio to compare'
                  }
                </p>
              </div>
            )}

            <button 
              onClick={handleCalculate} 
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-semibold"
            >
              <Calculator className="w-5 h-5" />
              Calculate Ratio
            </button>
          </div>
        </div>

        {/* RIGHT: Results Section */}
        <div className="space-y-6">
          {result ? (<>
            {/* Main Result Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-200 p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Result</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Original Ratio</p>
                    <p className="text-3xl font-bold text-blue-600">{result.originalRatio}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Simplified Ratio</p>
                    <p className="text-2xl font-bold text-indigo-600">{result.simplifiedRatio}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-purple-600">{result.decimal.toFixed(4)}</p>
                      <p className="text-xs text-gray-600">Decimal</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-green-600">{result.percentage}</p>
                      <p className="text-xs text-gray-600">Percentage</p>
                    </div>
                  </div>
                  {result.solvedValue && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                      <p className="text-sm text-gray-600 mb-1">Solved Value</p>
                      <p className="text-2xl font-bold text-yellow-700">{result.solvedValue.toFixed(4)}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Smart Analysis Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg border border-purple-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Smart Analysis
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    {result.analysis.ratioType}
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">{result.analysis.relationship}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">GCD:</span> {result.analysis.mathematicalProperties.gcd}
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Reciprocal:</span> {result.analysis.mathematicalProperties.reciprocal}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Key Insights
                  </h4>
                  <ul className="space-y-2">
                    {result.analysis.interpretation.slice(0, 3).map((insight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span className="text-gray-700">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Calculation Steps */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Step-by-Step Solution
              </h3>
              <div className="space-y-4">
                {result.steps.map((step, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{step.description}</h4>
                      <p className="text-sm text-gray-600 mb-2">{step.formula}</p>
                      <p className="text-sm font-bold text-blue-600">{step.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-World Examples */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Real-World Applications</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.examples.slice(0, 4).map((example, i) => (
                  <div key={i} className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">{example.scenario}</h4>
                    <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                    <p className="text-sm font-medium text-blue-700">{example.calculation}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={handleShare} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold"
              >
                <Share2 className="w-4 h-4" />
                Share Results
              </button>
            </div>
          </>) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
              <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Enter your ratio values and click "Calculate Ratio" to see detailed results</p>
            </div>
          )}
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal} 
        onClose={closeShareModal} 
        shareUrl={shareUrl} 
        shareText={shareText} 
        calculatorName="Ratio Calculator" 
      />
    </div>
  );
}
