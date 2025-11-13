'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Minus, X, Divide, Calculator, TrendingUp } from 'lucide-react';

interface FractionResult {
  numerator: number;
  denominator: number;
  decimal: number;
  mixed?: {
    whole: number;
    numerator: number;
    denominator: number;
  };
  simplified: {
    numerator: number;
    denominator: number;
  };
}

export function FractionCalculator() {
  const [operation, setOperation] = useState<'+' | '-' | '*' | '/'>('+');
  
  // First fraction
  const [num1, setNum1] = useState<string>('1');
  const [den1, setDen1] = useState<string>('2');
  
  // Second fraction
  const [num2, setNum2] = useState<string>('1');
  const [den2, setDen2] = useState<string>('3');
  
  const [result, setResult] = useState<FractionResult | null>(null);

  // Calculate GCD (Greatest Common Divisor)
  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Calculate LCM (Least Common Multiple)
  const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b);
  };

  // Simplify fraction
  const simplify = (numerator: number, denominator: number): { numerator: number; denominator: number } => {
    if (denominator === 0) {
      return { numerator: 0, denominator: 1 };
    }
    
    const divisor = gcd(numerator, denominator);
    let simplifiedNum = numerator / divisor;
    let simplifiedDen = denominator / divisor;
    
    // Keep denominator positive
    if (simplifiedDen < 0) {
      simplifiedNum = -simplifiedNum;
      simplifiedDen = -simplifiedDen;
    }
    
    return { numerator: simplifiedNum, denominator: simplifiedDen };
  };

  // Convert improper fraction to mixed number
  const toMixed = (numerator: number, denominator: number) => {
    if (denominator === 0) return null;
    
    const isNegative = (numerator < 0) !== (denominator < 0);
    const absNum = Math.abs(numerator);
    const absDen = Math.abs(denominator);
    
    const whole = Math.floor(absNum / absDen);
    const remainder = absNum % absDen;
    
    if (whole === 0) return null;
    
    return {
      whole: isNegative ? -whole : whole,
      numerator: remainder,
      denominator: absDen,
    };
  };

  // Perform fraction operation
  const calculate = () => {
    const n1 = parseFloat(num1);
    const d1 = parseFloat(den1);
    const n2 = parseFloat(num2);
    const d2 = parseFloat(den2);
    
    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2)) return null;
    if (d1 === 0 || d2 === 0) return null;
    
    let resultNum = 0;
    let resultDen = 1;
    
    switch (operation) {
      case '+':
        // a/b + c/d = (ad + bc) / bd
        resultNum = n1 * d2 + n2 * d1;
        resultDen = d1 * d2;
        break;
      case '-':
        // a/b - c/d = (ad - bc) / bd
        resultNum = n1 * d2 - n2 * d1;
        resultDen = d1 * d2;
        break;
      case '*':
        // a/b * c/d = ac / bd
        resultNum = n1 * n2;
        resultDen = d1 * d2;
        break;
      case '/':
        // a/b / c/d = ad / bc
        if (n2 === 0) return null;
        resultNum = n1 * d2;
        resultDen = d1 * n2;
        break;
    }
    
    const simplified = simplify(resultNum, resultDen);
    const decimal = resultNum / resultDen;
    const mixed = toMixed(simplified.numerator, simplified.denominator);
    
    return {
      numerator: resultNum,
      denominator: resultDen,
      decimal,
      mixed: mixed || undefined,
      simplified,
    };
  };

  useEffect(() => {
    const res = calculate();
    setResult(res);
  }, [num1, den1, num2, den2, operation]);

  const formatFraction = (num: number, den: number): string => {
    if (den === 1) return num.toString();
    return `${num}/${den}`;
  };

  const operations = [
    { symbol: '+', label: 'Add', icon: Plus, color: 'blue' },
    { symbol: '-', label: 'Subtract', icon: Minus, color: 'green' },
    { symbol: '*', label: 'Multiply', icon: X, color: 'purple' },
    { symbol: '/', label: 'Divide', icon: Divide, color: 'orange' },
  ] as const;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Operation Selection */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Select Operation</h3>
        <div className="grid grid-cols-4 gap-3">
          {operations.map((op) => {
            const Icon = op.icon;
            const isActive = operation === op.symbol;
            return (
              <button
                key={op.symbol}
                onClick={() => setOperation(op.symbol as any)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isActive
                    ? `border-${op.color}-500 bg-${op.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${
                  isActive ? `text-${op.color}-600` : 'text-gray-400'
                }`} />
                <div className="font-semibold text-sm">{op.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Enter Fractions</h3>
        
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* First Fraction */}
          <div className="flex flex-col items-center">
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="1"
              className="w-24 px-3 py-2 border-b-2 border-gray-300 text-center text-2xl font-bold focus:outline-none focus:border-blue-500"
            />
            <div className="w-24 h-0.5 bg-gray-900 my-1"></div>
            <input
              type="number"
              value={den1}
              onChange={(e) => setDen1(e.target.value)}
              placeholder="2"
              className="w-24 px-3 py-2 border-b-2 border-gray-300 text-center text-2xl font-bold focus:outline-none focus:border-blue-500"
            />
            <div className="text-xs text-gray-600 mt-2">First Fraction</div>
          </div>

          {/* Operation Symbol */}
          <div className="text-5xl font-bold text-gray-700 mx-4">
            {operation}
          </div>

          {/* Second Fraction */}
          <div className="flex flex-col items-center">
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="1"
              className="w-24 px-3 py-2 border-b-2 border-gray-300 text-center text-2xl font-bold focus:outline-none focus:border-blue-500"
            />
            <div className="w-24 h-0.5 bg-gray-900 my-1"></div>
            <input
              type="number"
              value={den2}
              onChange={(e) => setDen2(e.target.value)}
              placeholder="3"
              className="w-24 px-3 py-2 border-b-2 border-gray-300 text-center text-2xl font-bold focus:outline-none focus:border-blue-500"
            />
            <div className="text-xs text-gray-600 mt-2">Second Fraction</div>
          </div>

          {/* Equals */}
          <div className="text-5xl font-bold text-gray-700 mx-4">=</div>

          {/* Result Preview */}
          {result && (
            <div className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-300">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-blue-700">{result.simplified.numerator}</div>
                <div className="w-20 h-0.5 bg-blue-700 my-1"></div>
                <div className="text-3xl font-bold text-blue-700">{result.simplified.denominator}</div>
              </div>
              <div className="text-xs text-blue-600 mt-2">Result (Simplified)</div>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Results */}
      {result && (
        <>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Results</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Original Result */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-2">Original Answer:</div>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-gray-900">{result.numerator}</div>
                    <div className="w-full h-1 bg-gray-900 my-1"></div>
                    <div className="text-4xl font-bold text-gray-900">{result.denominator}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center mt-3">
                  (Before simplification)
                </div>
              </div>

              {/* Simplified Result */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-600 mb-2">Simplified:</div>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-blue-700">{result.simplified.numerator}</div>
                    <div className="w-full h-1 bg-blue-700 my-1"></div>
                    <div className="text-4xl font-bold text-blue-700">{result.simplified.denominator}</div>
                  </div>
                </div>
                {result.simplified.denominator === 1 && (
                  <div className="text-xs text-blue-600 text-center mt-3">
                    (Whole number)
                  </div>
                )}
              </div>

              {/* Mixed Number */}
              {result.mixed && (
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border border-green-200">
                  <div className="text-sm text-green-600 mb-2">Mixed Number:</div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="text-5xl font-bold text-green-700">{result.mixed.whole}</div>
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-green-700">{result.mixed.numerator}</div>
                      <div className="w-12 h-0.5 bg-green-700 my-0.5"></div>
                      <div className="text-2xl font-bold text-green-700">{result.mixed.denominator}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Decimal */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg border border-purple-200">
                <div className="text-sm text-purple-600 mb-2">Decimal:</div>
                <div className="text-5xl font-bold text-purple-700 text-center">
                  {result.decimal.toFixed(6).replace(/\.?0+$/, '')}
                </div>
                {!Number.isInteger(result.decimal) && (
                  <div className="text-xs text-purple-600 text-center mt-3">
                    {result.decimal > 0 && result.decimal < 1 ? '(Between 0 and 1)' : ''}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Step-by-Step Solution */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-blue-600" />
              Step-by-Step Solution
            </h3>
            
            <div className="space-y-3 text-sm bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-600">1.</span>
                <div>
                  <strong>Original problem:</strong>
                  <div className="font-mono mt-1">
                    {formatFraction(parseFloat(num1), parseFloat(den1))} {operation} {formatFraction(parseFloat(num2), parseFloat(den2))}
                  </div>
                </div>
              </div>

              {operation === '+' || operation === '-' ? (
                <>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">2.</span>
                    <div>
                      <strong>Find common denominator:</strong>
                      <div className="font-mono mt-1">
                        Common denominator = {result.denominator}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">3.</span>
                    <div>
                      <strong>Convert fractions:</strong>
                      <div className="font-mono mt-1">
                        {formatFraction(parseFloat(num1) * parseFloat(den2), result.denominator)} {operation} {formatFraction(parseFloat(num2) * parseFloat(den1), result.denominator)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">4.</span>
                    <div>
                      <strong>{operation === '+' ? 'Add' : 'Subtract'} numerators:</strong>
                      <div className="font-mono mt-1">
                        {formatFraction(result.numerator, result.denominator)}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">2.</span>
                    <div>
                      <strong>{operation === '*' ? 'Multiply numerators and denominators:' : 'Multiply by reciprocal:'}</strong>
                      <div className="font-mono mt-1">
                        {operation === '*' 
                          ? `(${num1} × ${num2}) / (${den1} × ${den2})`
                          : `${formatFraction(parseFloat(num1), parseFloat(den1))} × ${formatFraction(parseFloat(den2), parseFloat(num2))}`
                        }
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">3.</span>
                    <div>
                      <strong>Calculate:</strong>
                      <div className="font-mono mt-1">
                        {formatFraction(result.numerator, result.denominator)}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-600">{operation === '+' || operation === '-' ? '5' : '4'}.</span>
                <div>
                  <strong>Simplify (GCD = {gcd(result.numerator, result.denominator)}):</strong>
                  <div className="font-mono mt-1">
                    {formatFraction(result.simplified.numerator, result.simplified.denominator)}
                  </div>
                </div>
              </div>

              {result.mixed && (
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">{operation === '+' || operation === '-' ? '6' : '5'}.</span>
                  <div>
                    <strong>Convert to mixed number:</strong>
                    <div className="font-mono mt-1">
                      {result.mixed.whole} {formatFraction(result.mixed.numerator, result.mixed.denominator)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Examples */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Try These Examples</h3>
            <div className="grid md:grid-cols-4 gap-3">
              <button
                onClick={() => { setNum1('1'); setDen1('2'); setNum2('1'); setDen2('4'); setOperation('+'); }}
                className="p-3 bg-white rounded-lg border hover:shadow-md transition text-sm"
              >
                <div className="font-semibold">1/2 + 1/4</div>
                <div className="text-xs text-gray-600 mt-1">= 3/4</div>
              </button>
              <button
                onClick={() => { setNum1('3'); setDen1('4'); setNum2('1'); setDen2('2'); setOperation('-'); }}
                className="p-3 bg-white rounded-lg border hover:shadow-md transition text-sm"
              >
                <div className="font-semibold">3/4 - 1/2</div>
                <div className="text-xs text-gray-600 mt-1">= 1/4</div>
              </button>
              <button
                onClick={() => { setNum1('2'); setDen1('3'); setNum2('3'); setDen2('4'); setOperation('*'); }}
                className="p-3 bg-white rounded-lg border hover:shadow-md transition text-sm"
              >
                <div className="font-semibold">2/3 × 3/4</div>
                <div className="text-xs text-gray-600 mt-1">= 1/2</div>
              </button>
              <button
                onClick={() => { setNum1('1'); setDen1('2'); setNum2('1'); setDen2('4'); setOperation('/'); }}
                className="p-3 bg-white rounded-lg border hover:shadow-md transition text-sm"
              >
                <div className="font-semibold">1/2 ÷ 1/4</div>
                <div className="text-xs text-gray-600 mt-1">= 2</div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

