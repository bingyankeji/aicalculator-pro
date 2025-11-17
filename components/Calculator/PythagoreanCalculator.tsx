'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calculator, Triangle, Share2 } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type CalculationMode = 'find-c' | 'find-a' | 'find-b' | 'verify';

interface PythagoreanInputs {
  mode: CalculationMode;
  a?: number;
  b?: number;
  c?: number;
}

interface PythagoreanResult {
  a: number;
  b: number;
  c: number;
  isRightTriangle: boolean;
  calculations: string[];
  formula: string;
  area: number;
  perimeter: number;
  angles: {
    A: number;
    B: number;
    C: number;
  };
}

const calculationModes = [
  { 
    value: 'find-c', 
    label: 'Find Hypotenuse (c)', 
    description: 'Calculate c when a and b are known',
    formula: 'c = √(a² + b²)',
    icon: '📐'
  },
  { 
    value: 'find-a', 
    label: 'Find Side a', 
    description: 'Calculate a when b and c are known',
    formula: 'a = √(c² - b²)',
    icon: '📏'
  },
  { 
    value: 'find-b', 
    label: 'Find Side b', 
    description: 'Calculate b when a and c are known',
    formula: 'b = √(c² - a²)',
    icon: '📏'
  },
  { 
    value: 'verify', 
    label: 'Verify Triangle', 
    description: 'Check if a² + b² = c²',
    formula: 'a² + b² = c²',
    icon: '✓'
  }
];

function calculatePythagorean(inputs: PythagoreanInputs): PythagoreanResult | null {
  const { mode } = inputs;
  let a: number, b: number, c: number;
  const calculations: string[] = [];

  try {
    switch (mode) {
      case 'find-c':
        if (!inputs.a || !inputs.b) return null;
        a = inputs.a;
        b = inputs.b;
        c = Math.sqrt(a * a + b * b);
        calculations.push(`Given: a = ${a}, b = ${b}`);
        calculations.push(`Using Pythagorean theorem: c² = a² + b²`);
        calculations.push(`c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}`);
        calculations.push(`c = √${a * a + b * b} = ${c.toFixed(4)}`);
        break;

      case 'find-a':
        if (!inputs.b || !inputs.c) return null;
        b = inputs.b;
        c = inputs.c;
        if (c <= b) {
          throw new Error('Hypotenuse must be longer than the other side');
        }
        a = Math.sqrt(c * c - b * b);
        calculations.push(`Given: b = ${b}, c = ${c}`);
        calculations.push(`Using Pythagorean theorem: a² = c² - b²`);
        calculations.push(`a² = ${c}² - ${b}² = ${c * c} - ${b * b} = ${c * c - b * b}`);
        calculations.push(`a = √${c * c - b * b} = ${a.toFixed(4)}`);
        break;

      case 'find-b':
        if (!inputs.a || !inputs.c) return null;
        a = inputs.a;
        c = inputs.c;
        if (c <= a) {
          throw new Error('Hypotenuse must be longer than the other side');
        }
        b = Math.sqrt(c * c - a * a);
        calculations.push(`Given: a = ${a}, c = ${c}`);
        calculations.push(`Using Pythagorean theorem: b² = c² - a²`);
        calculations.push(`b² = ${c}² - ${a}² = ${c * c} - ${a * a} = ${c * c - a * a}`);
        calculations.push(`b = √${c * c - a * a} = ${b.toFixed(4)}`);
        break;

      case 'verify':
        if (!inputs.a || !inputs.b || !inputs.c) return null;
        a = inputs.a;
        b = inputs.b;
        c = inputs.c;
        const leftSide = a * a + b * b;
        const rightSide = c * c;
        const difference = Math.abs(leftSide - rightSide);
        const isRightTriangle = difference < 0.0001;
        
        calculations.push(`Given: a = ${a}, b = ${b}, c = ${c}`);
        calculations.push(`Checking: a² + b² = c²`);
        calculations.push(`Left side: ${a}² + ${b}² = ${a * a} + ${b * b} = ${leftSide}`);
        calculations.push(`Right side: ${c}² = ${c * c}`);
        calculations.push(`Difference: |${leftSide} - ${rightSide}| = ${difference.toFixed(6)}`);
        calculations.push(`Result: ${isRightTriangle ? 'This IS a right triangle' : 'This is NOT a right triangle'}`);
        break;

      default:
        return null;
    }

    // Calculate additional properties
    const area = (a * b) / 2;
    const perimeter = a + b + c;
    
    // Calculate angles (in degrees)
    const angleA = Math.asin(a / c) * (180 / Math.PI);
    const angleB = Math.asin(b / c) * (180 / Math.PI);
    const angleC = 90; // Right angle

    // Check if it's a right triangle
    const isRightTriangle = mode === 'verify' ? 
      Math.abs((a * a + b * b) - (c * c)) < 0.0001 : 
      true; // For other modes, we're constructing a right triangle

    return {
      a,
      b,
      c,
      isRightTriangle,
      calculations,
      formula: calculationModes.find(m => m.value === mode)?.formula || '',
      area,
      perimeter,
      angles: {
        A: angleA,
        B: angleB,
        C: angleC
      }
    };

  } catch (error) {
    return {
      a: 0, b: 0, c: 0,
      isRightTriangle: false,
      calculations: [error instanceof Error ? error.message : 'Invalid input'],
      formula: '',
      area: 0,
      perimeter: 0,
      angles: { A: 0, B: 0, C: 0 }
    };
  }
}

function formatNumber(num: number): string {
  if (num < 0.01) return num.toExponential(4);
  if (num < 1) return num.toFixed(6);
  if (num < 100) return num.toFixed(4);
  return num.toFixed(2);
}

export default function PythagoreanCalculator() {
  const [inputs, setInputs] = useState<PythagoreanInputs>({
    mode: 'find-c',
    a: 3,
    b: 4
  });

  const resultRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => {
    return calculatePythagorean(inputs);
  }, [inputs]);

  const updateInput = (field: keyof PythagoreanInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleModeChange = (newMode: CalculationMode) => {
    const defaultInputs: PythagoreanInputs = { mode: newMode };
    
    switch (newMode) {
      case 'find-c':
        defaultInputs.a = 3;
        defaultInputs.b = 4;
        break;
      case 'find-a':
        defaultInputs.b = 4;
        defaultInputs.c = 5;
        break;
      case 'find-b':
        defaultInputs.a = 3;
        defaultInputs.c = 5;
        break;
      case 'verify':
        defaultInputs.a = 3;
        defaultInputs.b = 4;
        defaultInputs.c = 5;
        break;
    }
    
    setInputs(defaultInputs);
  };

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/pythagorean-calculator',
    getShareParams: () => ({
      mode: inputs.mode,
      ...(inputs.a && { a: inputs.a.toString() }),
      ...(inputs.b && { b: inputs.b.toString() }),
      ...(inputs.c && { c: inputs.c.toString() }),
    }),
    getShareText: () => {
      if (!result) return 'Check out this Pythagorean theorem calculation!';
      return `Right Triangle: a=${formatNumber(result.a)}, b=${formatNumber(result.b)}, c=${formatNumber(result.c)}`;
    },
  });

  const renderInputs = () => {
    switch (inputs.mode) {
      case 'find-c':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Side a</label>
              <input
                type="number"
                value={inputs.a || ''}
                onChange={(e) => updateInput('a', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter side a"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Side b</label>
              <input
                type="number"
                value={inputs.b || ''}
                onChange={(e) => updateInput('b', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter side b"
              />
            </div>
          </div>
        );

      case 'find-a':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Side b</label>
              <input
                type="number"
                value={inputs.b || ''}
                onChange={(e) => updateInput('b', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter side b"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hypotenuse c</label>
              <input
                type="number"
                value={inputs.c || ''}
                onChange={(e) => updateInput('c', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter hypotenuse c"
              />
            </div>
          </div>
        );

      case 'find-b':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Side a</label>
              <input
                type="number"
                value={inputs.a || ''}
                onChange={(e) => updateInput('a', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter side a"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hypotenuse c</label>
              <input
                type="number"
                value={inputs.c || ''}
                onChange={(e) => updateInput('c', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter hypotenuse c"
              />
            </div>
          </div>
        );

      case 'verify':
        return (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Side a</label>
              <input
                type="number"
                value={inputs.a || ''}
                onChange={(e) => updateInput('a', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter side a"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Side b</label>
              <input
                type="number"
                value={inputs.b || ''}
                onChange={(e) => updateInput('b', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter side b"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hypotenuse c</label>
              <input
                type="number"
                value={inputs.c || ''}
                onChange={(e) => updateInput('c', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter hypotenuse c"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4 md:space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Triangle className="w-6 h-6 text-blue-600" />
          Pythagorean Theorem Calculator
        </h3>

        <div className="space-y-6">
          {/* Calculation Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">What do you want to calculate?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {calculationModes.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleModeChange(option.value as CalculationMode)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    inputs.mode === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-2">{option.icon}</div>
                  <div className="font-semibold mb-1">{option.label}</div>
                  <div className="text-xs opacity-75 mb-2">{option.description}</div>
                  <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{option.formula}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Inputs */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Enter Known Values</h4>
            {renderInputs()}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => handleModeChange(inputs.mode)}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Reset
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div ref={resultRef} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-green-600" />
            Pythagorean Theorem Results
          </h4>

          {result.calculations[0] !== 'Invalid input' && result.calculations[0] !== 'Hypotenuse must be longer than the other side' ? (
            <>
              {/* Triangle Visualization */}
              <div className="mb-6">
                <h5 className="text-lg font-bold text-gray-900 mb-4">📐 Right Triangle Visualization</h5>
                <div className="bg-gray-50 rounded-lg p-6 flex justify-center">
                  <div className="relative">
                    <svg width="300" height="200" viewBox="0 0 300 200" className="border border-gray-300 rounded">
                      {/* Triangle */}
                      <polygon
                        points="50,150 200,150 200,50"
                        fill="rgba(59, 130, 246, 0.1)"
                        stroke="rgb(59, 130, 246)"
                        strokeWidth="2"
                      />
                      {/* Right angle indicator */}
                      <path
                        d="M 180,150 L 180,130 L 200,130"
                        fill="none"
                        stroke="rgb(239, 68, 68)"
                        strokeWidth="2"
                      />
                      {/* Side labels */}
                      <text x="125" y="170" fontSize="14" fill="rgb(34, 197, 94)" textAnchor="middle" fontWeight="bold">
                        a = {formatNumber(result.a)}
                      </text>
                      <text x="210" y="100" fontSize="14" fill="rgb(34, 197, 94)" textAnchor="middle" fontWeight="bold">
                        b = {formatNumber(result.b)}
                      </text>
                      <text x="115" y="95" fontSize="14" fill="rgb(239, 68, 68)" textAnchor="middle" fontWeight="bold">
                        c = {formatNumber(result.c)}
                      </text>
                      {/* Angle labels */}
                      <text x="65" y="145" fontSize="12" fill="rgb(147, 51, 234)" fontWeight="bold">
                        {formatNumber(result.angles.A)}°
                      </text>
                      <text x="185" y="145" fontSize="12" fill="rgb(147, 51, 234)" fontWeight="bold">
                        90°
                      </text>
                      <text x="190" y="65" fontSize="12" fill="rgb(147, 51, 234)" fontWeight="bold">
                        {formatNumber(result.angles.B)}°
                      </text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Main Results */}
              <div className="grid md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700 font-medium mb-1">Side a</div>
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-900 break-all">{formatNumber(result.a)}</div>
                  <div className="text-xs text-green-600">units</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700 font-medium mb-1">Side b</div>
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-900 break-all">{formatNumber(result.b)}</div>
                  <div className="text-xs text-green-600">units</div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                  <div className="text-sm text-red-700 font-medium mb-1">Hypotenuse c</div>
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-900 break-all">{formatNumber(result.c)}</div>
                  <div className="text-xs text-red-600">units</div>
                </div>
              </div>

              {/* Additional Properties */}
              <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">Area</div>
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 break-all">{formatNumber(result.area)}</div>
                  <div className="text-xs text-blue-600">square units</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-700 font-medium mb-1">Perimeter</div>
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-900 break-all">{formatNumber(result.perimeter)}</div>
                  <div className="text-xs text-purple-600">units</div>
                </div>
              </div>

              {/* Verification Status */}
              {inputs.mode === 'verify' && (
                <div className="mb-6">
                  <div className={`p-4 rounded-lg border-2 ${
                    result.isRightTriangle 
                      ? 'bg-green-50 border-green-200 text-green-800' 
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{result.isRightTriangle ? '✅' : '❌'}</span>
                      <span className="font-bold text-lg">
                        {result.isRightTriangle ? 'Right Triangle Confirmed' : 'Not a Right Triangle'}
                      </span>
                    </div>
                    <p className="text-sm">
                      {result.isRightTriangle 
                        ? 'The given sides satisfy the Pythagorean theorem: a² + b² = c²'
                        : 'The given sides do not satisfy the Pythagorean theorem'
                      }
                    </p>
                  </div>
                </div>
              )}

              {/* Step-by-Step Calculations */}
              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-4">🧮 Step-by-Step Calculation</h5>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <ol className="space-y-2">
                    {result.calculations.map((step, index) => (
                      <li key={index} className="text-sm font-mono text-gray-700">
                        <span className="font-bold text-blue-600">{index + 1}.</span> {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-red-600 text-lg font-semibold mb-2">Invalid Input</div>
              <div className="text-gray-600">{result.calculations[0]}</div>
            </div>
          )}
        </div>
      )}

      <ShareModal 
        isOpen={showShareModal} 
        onClose={closeShareModal} 
        shareUrl={shareUrl} 
        shareText={shareText} 
        calculatorName="Pythagorean Theorem Calculator" 
      />
    </div>
  );
}
