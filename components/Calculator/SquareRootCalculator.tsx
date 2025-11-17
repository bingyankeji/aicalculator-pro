'use client';

import { useState, useEffect } from 'react';
import { Share2, Calculator, Sparkles, TrendingUp, CheckCircle, Square } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface SquareRootInputs {
  number: number;
  calculationType: 'square-root' | 'nth-root' | 'perfect-square';
  nthRoot: number;
}

interface SquareRootResult {
  input: number;
  result: number;
  isPerfectSquare: boolean;
  analysis: RootAnalysis;
  steps: CalculationStep[];
  relatedValues: RelatedValue[];
}

interface RootAnalysis {
  rootType: string;
  approximation: string;
  exactForm?: string;
  properties: {
    isRational: boolean;
    isInteger: boolean;
    decimalPlaces: number;
  };
  applications: string[];
  mathematicalFacts: string[];
}

interface CalculationStep {
  step: number;
  description: string;
  calculation: string;
  result: string;
}

interface RelatedValue {
  label: string;
  value: string;
  description: string;
}

export function SquareRootCalculator() {
  const [inputs, setInputs] = useState<SquareRootInputs>({
    number: 16,
    calculationType: 'square-root',
    nthRoot: 3,
  });

  const [result, setResult] = useState<SquareRootResult | null>(null);

  // URL parameter handling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const num = params.get('n');
    const type = params.get('type');
    const root = params.get('root');

    if (num) {
      const newInputs: SquareRootInputs = {
        number: parseFloat(num),
        calculationType: (type as any) || 'square-root',
        nthRoot: root ? parseInt(root) : 3,
      };
      setInputs(newInputs);
      
      setTimeout(() => {
        const calculatedResult = calculateSquareRoot(newInputs);
        setResult(calculatedResult);
      }, 100);
    }
  }, []);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/square-root-calculator',
    getShareParams: () => ({
      n: inputs.number.toString(),
      type: inputs.calculationType,
      root: inputs.nthRoot.toString(),
    }),
    getShareText: () => result ? `√${inputs.number} = ${result.result.toFixed(6)}` : 'Calculate square roots and nth roots!',
  });

  const isPerfectSquare = (n: number): boolean => {
    if (n < 0) return false;
    const sqrt = Math.sqrt(n);
    return sqrt === Math.floor(sqrt);
  };

  const isPerfectNthRoot = (n: number, root: number): boolean => {
    if (n < 0 && root % 2 === 0) return false;
    const result = Math.pow(Math.abs(n), 1/root);
    return Math.abs(result - Math.round(result)) < 1e-10;
  };

  const generateAnalysis = (num: number, result: number, type: string, nthRoot?: number): RootAnalysis => {
    const isInteger = Math.abs(result - Math.round(result)) < 1e-10;
    const isRational = isInteger || isPerfectSquare(num);
    const decimalPlaces = result.toString().split('.')[1]?.length || 0;

    let rootType = '';
    let approximation = '';
    let exactForm = '';

    if (type === 'square-root') {
      rootType = isPerfectSquare(num) ? 'Perfect Square Root' : 'Irrational Square Root';
      approximation = `√${num} ≈ ${result.toFixed(6)}`;
      if (!isPerfectSquare(num)) {
        exactForm = `√${num}`;
      }
    } else if (type === 'nth-root') {
      rootType = isPerfectNthRoot(num, nthRoot!) ? `Perfect ${nthRoot}th Root` : `Irrational ${nthRoot}th Root`;
      approximation = `${nthRoot}√${num} ≈ ${result.toFixed(6)}`;
      if (!isPerfectNthRoot(num, nthRoot!)) {
        exactForm = `${nthRoot}√${num}`;
      }
    } else {
      rootType = 'Perfect Square Check';
      approximation = isPerfectSquare(num) ? `${num} is a perfect square` : `${num} is not a perfect square`;
    }

    const applications = [
      `Geometry: Side length of square with area ${num}`,
      `Physics: RMS calculations and wave analysis`,
      `Statistics: Standard deviation calculations`,
      `Engineering: Distance and magnitude calculations`,
      `Finance: Volatility and risk measurements`
    ];

    const mathematicalFacts = [
      `The square root function is the inverse of squaring`,
      `√(ab) = √a × √b for positive numbers`,
      `√(a²) = |a| (absolute value of a)`,
      `Square roots of non-perfect squares are irrational`,
      `The principal square root is always non-negative`
    ];

    return {
      rootType,
      approximation,
      exactForm,
      properties: {
        isRational,
        isInteger,
        decimalPlaces: Math.min(decimalPlaces, 10)
      },
      applications,
      mathematicalFacts
    };
  };

  const generateSteps = (inputs: SquareRootInputs): CalculationStep[] => {
    const { number, calculationType, nthRoot } = inputs;
    
    if (calculationType === 'square-root') {
      const result = Math.sqrt(number);
      
      return [
        {
          step: 1,
          description: 'Identify the number under the square root',
          calculation: `√${number}`,
          result: `Finding the square root of ${number}`
        },
        {
          step: 2,
          description: 'Check if it\'s a perfect square',
          calculation: `Is ${number} = n² for some integer n?`,
          result: isPerfectSquare(number) ? `Yes, ${Math.sqrt(number)}² = ${number}` : 'No, this is not a perfect square'
        },
        {
          step: 3,
          description: 'Calculate the square root',
          calculation: `√${number}`,
          result: result.toFixed(10)
        }
      ];
    } else if (calculationType === 'nth-root') {
      const result = Math.pow(number, 1/nthRoot);
      
      return [
        {
          step: 1,
          description: `Find the ${nthRoot}th root`,
          calculation: `${nthRoot}√${number} = ${number}^(1/${nthRoot})`,
          result: `Calculating ${number} to the power of 1/${nthRoot}`
        },
        {
          step: 2,
          description: 'Check if it\'s a perfect nth root',
          calculation: `Is ${number} = n^${nthRoot} for some number n?`,
          result: isPerfectNthRoot(number, nthRoot) ? `Yes, ${result.toFixed(0)}^${nthRoot} = ${number}` : 'No, this is not a perfect nth root'
        },
        {
          step: 3,
          description: 'Calculate the result',
          calculation: `${nthRoot}√${number}`,
          result: result.toFixed(10)
        }
      ];
    } else {
      // perfect-square check
      const sqrt = Math.sqrt(number);
      const isPerfect = isPerfectSquare(number);
      
      return [
        {
          step: 1,
          description: 'Calculate the square root',
          calculation: `√${number}`,
          result: sqrt.toFixed(10)
        },
        {
          step: 2,
          description: 'Check if the result is an integer',
          calculation: `Is ${sqrt.toFixed(6)} a whole number?`,
          result: isPerfect ? 'Yes, it is an integer' : 'No, it has decimal places'
        },
        {
          step: 3,
          description: 'Conclusion',
          calculation: `${number} ${isPerfect ? 'is' : 'is not'} a perfect square`,
          result: isPerfect ? `${number} = ${Math.round(sqrt)}²` : `${number} is between ${Math.floor(sqrt)}² and ${Math.ceil(sqrt)}²`
        }
      ];
    }
  };

  const generateRelatedValues = (num: number, result: number, type: string): RelatedValue[] => {
    const values: RelatedValue[] = [
      {
        label: 'Square',
        value: (result * result).toFixed(6),
        description: `(√${num})² = ${num}`
      },
      {
        label: 'Cube Root',
        value: Math.pow(num, 1/3).toFixed(6),
        description: `∛${num}`
      },
      {
        label: 'Reciprocal',
        value: (1/result).toFixed(6),
        description: `1/√${num}`
      }
    ];

    if (type === 'square-root') {
      values.push({
        label: 'Fourth Root',
        value: Math.pow(num, 1/4).toFixed(6),
        description: `⁴√${num}`
      });
    }

    return values;
  };

  const calculateSquareRoot = (inputData: SquareRootInputs): SquareRootResult => {
    const { number, calculationType, nthRoot } = inputData;
    
    let result: number;
    
    if (calculationType === 'square-root' || calculationType === 'perfect-square') {
      result = Math.sqrt(Math.abs(number));
    } else {
      result = Math.pow(Math.abs(number), 1/nthRoot);
      if (number < 0 && nthRoot % 2 === 1) {
        result = -result;
      }
    }

    const analysis = generateAnalysis(number, result, calculationType, nthRoot);
    const steps = generateSteps(inputData);
    const relatedValues = generateRelatedValues(number, result, calculationType);

    return {
      input: number,
      result,
      isPerfectSquare: isPerfectSquare(number),
      analysis,
      steps,
      relatedValues
    };
  };

  const handleCalculate = () => {
    if (inputs.number < 0 && inputs.calculationType === 'square-root') {
      alert('Square root of negative numbers requires complex numbers. Please enter a positive number.');
      return;
    }
    
    if (inputs.calculationType === 'nth-root' && inputs.nthRoot <= 0) {
      alert('Please enter a positive root value.');
      return;
    }
    
    setResult(calculateSquareRoot(inputs));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* LEFT: Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg border p-4 sm:p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 hidden lg:block">
              <Square className="w-5 h-5 text-purple-600" />
              Square Root Calculator
            </h3>
            
            {/* Calculation Type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Calculation Type</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'square-root', label: 'Square Root (√)', desc: 'Calculate √n' },
                  { value: 'nth-root', label: 'Nth Root (ⁿ√)', desc: 'Calculate ⁿ√n for any root' },
                  { value: 'perfect-square', label: 'Perfect Square Check', desc: 'Check if n is a perfect square' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setInputs({...inputs, calculationType: option.value as any})}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      inputs.calculationType === option.value 
                        ? 'border-purple-500 bg-purple-50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Number Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">
                {inputs.calculationType === 'perfect-square' ? 'Number to Check' : 'Number'}
              </label>
              <input
                type="number"
                value={inputs.number}
                onChange={e => setInputs({...inputs, number: parseFloat(e.target.value) || 0})}
                className="w-full px-4 py-3 border rounded-lg text-center text-xl font-semibold"
                placeholder="Enter number"
                step="0.000001"
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                {inputs.calculationType === 'square-root' 
                  ? 'Enter a positive number for real square root'
                  : inputs.calculationType === 'nth-root'
                  ? 'Negative numbers allowed for odd roots'
                  : 'Enter any positive number to check'
                }
              </p>
            </div>

            {/* Nth Root Input */}
            {inputs.calculationType === 'nth-root' && (
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Root Value (n)</label>
                <input
                  type="number"
                  value={inputs.nthRoot}
                  onChange={e => setInputs({...inputs, nthRoot: parseInt(e.target.value) || 2})}
                  className="w-full px-4 py-3 border rounded-lg text-center font-semibold"
                  placeholder="Root value"
                  min="1"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  2 = square root, 3 = cube root, etc.
                </p>
              </div>
            )}

            <button 
              onClick={handleCalculate} 
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 font-semibold"
            >
              <Calculator className="w-5 h-5" />
              Calculate Root
            </button>
          </div>
        </div>

        {/* RIGHT: Results Section */}
        <div className="space-y-6">
          {result ? (<>
            {/* Main Result Card */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg border border-purple-200 p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Result</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Input</p>
                    <p className="text-2xl font-bold text-gray-800">{result.input}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      {inputs.calculationType === 'square-root' ? 'Square Root' : 
                       inputs.calculationType === 'nth-root' ? `${inputs.nthRoot}th Root` : 
                       'Perfect Square Check'}
                    </p>
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-purple-600 break-all">
                      {inputs.calculationType === 'perfect-square' 
                        ? (result.isPerfectSquare ? 'YES' : 'NO')
                        : result.result.toFixed(6)
                      }
                    </p>
                  </div>
                  {result.isPerfectSquare && inputs.calculationType !== 'perfect-square' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800 font-semibold">Perfect Square!</p>
                      <p className="text-xs text-green-700">This is an exact result</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Smart Analysis Card */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg border border-blue-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Mathematical Analysis
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">{result.analysis.rootType}</h4>
                  <p className="text-sm text-gray-700 mb-3">{result.analysis.approximation}</p>
                  {result.analysis.exactForm && (
                    <p className="text-sm text-blue-700 font-medium">Exact form: {result.analysis.exactForm}</p>
                  )}
                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Rational:</span> {result.analysis.properties.isRational ? 'Yes' : 'No'}
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Integer:</span> {result.analysis.properties.isInteger ? 'Yes' : 'No'}
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Decimals:</span> {result.analysis.properties.decimalPlaces}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Key Mathematical Facts
                  </h4>
                  <ul className="space-y-2">
                    {result.analysis.mathematicalFacts.slice(0, 3).map((fact, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span className="text-gray-700">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Calculation Steps */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Step-by-Step Solution
              </h3>
              <div className="space-y-4">
                {result.steps.map((step, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{step.description}</h4>
                      <p className="text-sm text-gray-600 mb-2">{step.calculation}</p>
                      <p className="text-sm font-bold text-purple-600">{step.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Values */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Related Values</h3>
              <div className="grid grid-cols-2 gap-4">
                {result.relatedValues.map((value, i) => (
                  <div key={i} className="p-4 bg-gradient-to-br from-gray-50 to-purple-50 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-1">{value.label}</h4>
                    <p className="text-lg font-bold text-purple-600 mb-1">{value.value}</p>
                    <p className="text-xs text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={handleShare} 
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 font-semibold"
              >
                <Share2 className="w-4 h-4" />
                Share Results
              </button>
            </div>
          </>) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
              <Square className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Enter a number and click "Calculate Root" to see detailed results</p>
            </div>
          )}
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal} 
        onClose={closeShareModal} 
        shareUrl={shareUrl} 
        shareText={shareText} 
        calculatorName="Square Root Calculator" 
      />
    </div>
  );
}
