'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calculator, Triangle, Share2 } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type TriangleType = 'sss' | 'sas' | 'asa' | 'aas' | 'rhs';

interface TriangleInputs {
  type: TriangleType;
  // Sides
  sideA?: number;
  sideB?: number;
  sideC?: number;
  // Angles (in degrees)
  angleA?: number;
  angleB?: number;
  angleC?: number;
}

interface TriangleResult {
  sideA: number;
  sideB: number;
  sideC: number;
  angleA: number;
  angleB: number;
  angleC: number;
  area: number;
  perimeter: number;
  triangleType: string;
  isValid: boolean;
  calculations: string[];
}

const triangleTypes = [
  { value: 'sss', label: 'SSS - Three Sides', description: 'All three sides known' },
  { value: 'sas', label: 'SAS - Side-Angle-Side', description: 'Two sides and included angle' },
  { value: 'asa', label: 'ASA - Angle-Side-Angle', description: 'Two angles and included side' },
  { value: 'aas', label: 'AAS - Angle-Angle-Side', description: 'Two angles and non-included side' },
  { value: 'rhs', label: 'RHS - Right-Hypotenuse-Side', description: 'Right triangle with hypotenuse and side' }
];

function calculateTriangle(inputs: TriangleInputs): TriangleResult | null {
  const { type } = inputs;
  let result: Partial<TriangleResult> = {
    calculations: [],
    isValid: true
  };

  try {
    switch (type) {
      case 'sss':
        if (!inputs.sideA || !inputs.sideB || !inputs.sideC) return null;
        return calculateSSS(inputs.sideA, inputs.sideB, inputs.sideC);
      
      case 'sas':
        if (!inputs.sideA || !inputs.angleB || !inputs.sideC) return null;
        return calculateSAS(inputs.sideA, inputs.angleB, inputs.sideC);
      
      default:
        return null;
    }
  } catch (error) {
    return {
      sideA: 0, sideB: 0, sideC: 0,
      angleA: 0, angleB: 0, angleC: 0,
      area: 0, perimeter: 0,
      triangleType: 'Invalid',
      isValid: false,
      calculations: ['Invalid triangle - check your inputs']
    };
  }
}

function calculateSSS(a: number, b: number, c: number): TriangleResult {
  // Check triangle inequality
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error('Invalid triangle');
  }

  // Calculate angles using law of cosines
  const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
  const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
  const angleC = 180 - angleA - angleB;

  // Calculate area using Heron's formula
  const s = (a + b + c) / 2;
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

  const calculations = [
    `Semi-perimeter: s = (${a} + ${b} + ${c}) / 2 = ${s.toFixed(2)}`,
    `Area = √[s(s-a)(s-b)(s-c)] = ${area.toFixed(2)}`,
    `Angle A = arccos[(b²+c²-a²)/(2bc)] = ${angleA.toFixed(1)}°`,
    `Angle B = arccos[(a²+c²-b²)/(2ac)] = ${angleB.toFixed(1)}°`,
    `Angle C = 180° - A - B = ${angleC.toFixed(1)}°`
  ];

  return {
    sideA: a, sideB: b, sideC: c,
    angleA, angleB, angleC,
    area, perimeter: a + b + c,
    triangleType: getTriangleType(a, b, c, angleA, angleB, angleC),
    isValid: true,
    calculations
  };
}

function calculateSAS(a: number, angleB: number, c: number): TriangleResult {
  const B = angleB * (Math.PI / 180); // Convert to radians
  
  // Calculate third side using law of cosines
  const b = Math.sqrt(a * a + c * c - 2 * a * c * Math.cos(B));
  
  // Calculate other angles
  const angleA = Math.asin((a * Math.sin(B)) / b) * (180 / Math.PI);
  const angleC = 180 - angleA - angleB;
  
  // Calculate area
  const area = 0.5 * a * c * Math.sin(B);

  const calculations = [
    `Side b = √(a² + c² - 2ac·cos(B)) = ${b.toFixed(2)}`,
    `Area = ½ac·sin(B) = ${area.toFixed(2)}`,
    `Angle A = arcsin[(a·sin(B))/b] = ${angleA.toFixed(1)}°`,
    `Angle C = 180° - A - B = ${angleC.toFixed(1)}°`
  ];

  return {
    sideA: a, sideB: b, sideC: c,
    angleA, angleB, angleC,
    area, perimeter: a + b + c,
    triangleType: getTriangleType(a, b, c, angleA, angleB, angleC),
    isValid: true,
    calculations
  };
}

function getTriangleType(a: number, b: number, c: number, angleA: number, angleB: number, angleC: number): string {
  const maxAngle = Math.max(angleA, angleB, angleC);
  
  if (Math.abs(maxAngle - 90) < 0.1) return 'Right Triangle';
  if (maxAngle > 90) return 'Obtuse Triangle';
  
  // Check if equilateral
  if (Math.abs(a - b) < 0.01 && Math.abs(b - c) < 0.01) return 'Equilateral Triangle';
  
  // Check if isosceles
  if (Math.abs(a - b) < 0.01 || Math.abs(b - c) < 0.01 || Math.abs(a - c) < 0.01) {
    return 'Isosceles Triangle';
  }
  
  return 'Scalene Triangle';
}

function formatNumber(num: number): string {
  return num.toFixed(2);
}

export default function TriangleCalculator() {
  const [inputs, setInputs] = useState<TriangleInputs>({
    type: 'sss',
    sideA: 3,
    sideB: 4,
    sideC: 5
  });

  const resultRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => {
    return calculateTriangle(inputs);
  }, [inputs]);

  const updateInput = (field: keyof TriangleInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleTypeChange = (newType: TriangleType) => {
    const defaultInputs: TriangleInputs = { type: newType };
    
    switch (newType) {
      case 'sss':
        defaultInputs.sideA = 3;
        defaultInputs.sideB = 4;
        defaultInputs.sideC = 5;
        break;
      case 'sas':
        defaultInputs.sideA = 3;
        defaultInputs.angleB = 90;
        defaultInputs.sideC = 4;
        break;
    }
    
    setInputs(defaultInputs);
  };

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/triangle-calculator',
    getShareParams: () => ({
      type: inputs.type,
      ...(inputs.sideA && { sideA: inputs.sideA.toString() }),
      ...(inputs.sideB && { sideB: inputs.sideB.toString() }),
      ...(inputs.sideC && { sideC: inputs.sideC.toString() }),
    }),
    getShareText: () => {
      if (!result) return 'Check out this triangle calculation!';
      return `Triangle: Area = ${formatNumber(result.area)}, Perimeter = ${formatNumber(result.perimeter)}`;
    },
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Triangle className="w-6 h-6 text-blue-600" />
          Triangle Calculator
        </h3>

        <div className="space-y-6">
          {/* Triangle Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Triangle Type</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {triangleTypes.slice(0, 2).map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleTypeChange(option.value as TriangleType)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    inputs.type === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold mb-1">{option.label}</div>
                  <div className="text-sm opacity-75">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Inputs */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Enter Values</h4>
            {inputs.type === 'sss' && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Side A</label>
                  <input
                    type="number"
                    value={inputs.sideA || ''}
                    onChange={(e) => updateInput('sideA', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Side B</label>
                  <input
                    type="number"
                    value={inputs.sideB || ''}
                    onChange={(e) => updateInput('sideB', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Side C</label>
                  <input
                    type="number"
                    value={inputs.sideC || ''}
                    onChange={(e) => updateInput('sideC', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            )}

            {inputs.type === 'sas' && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Side A</label>
                  <input
                    type="number"
                    value={inputs.sideA || ''}
                    onChange={(e) => updateInput('sideA', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Angle B (degrees)</label>
                  <input
                    type="number"
                    value={inputs.angleB || ''}
                    onChange={(e) => updateInput('angleB', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="180"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Side C</label>
                  <input
                    type="number"
                    value={inputs.sideC || ''}
                    onChange={(e) => updateInput('sideC', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => handleTypeChange(inputs.type)}
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
            Triangle Analysis Results
          </h4>

          {result.isValid ? (
            <>
              {/* Main Results */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">Area</div>
                  <div className="text-2xl font-bold text-blue-900">{formatNumber(result.area)}</div>
                  <div className="text-xs text-blue-600">square units</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700 font-medium mb-1">Perimeter</div>
                  <div className="text-2xl font-bold text-green-900">{formatNumber(result.perimeter)}</div>
                  <div className="text-xs text-green-600">units</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-700 font-medium mb-1">Type</div>
                  <div className="text-lg font-bold text-purple-900">{result.triangleType}</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                  <div className="text-sm text-orange-700 font-medium mb-1">Sum of Angles</div>
                  <div className="text-2xl font-bold text-orange-900">180°</div>
                </div>
              </div>

              {/* Detailed Measurements */}
              <div className="mb-6">
                <h5 className="text-lg font-bold text-gray-900 mb-4">📐 Complete Measurements</h5>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h6 className="font-semibold text-gray-900 mb-3">Sides</h6>
                    <div className="space-y-2 text-sm">
                      <div>Side A: <span className="font-mono font-bold">{formatNumber(result.sideA)}</span> units</div>
                      <div>Side B: <span className="font-mono font-bold">{formatNumber(result.sideB)}</span> units</div>
                      <div>Side C: <span className="font-mono font-bold">{formatNumber(result.sideC)}</span> units</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h6 className="font-semibold text-gray-900 mb-3">Angles</h6>
                    <div className="space-y-2 text-sm">
                      <div>Angle A: <span className="font-mono font-bold">{formatNumber(result.angleA)}°</span></div>
                      <div>Angle B: <span className="font-mono font-bold">{formatNumber(result.angleB)}°</span></div>
                      <div>Angle C: <span className="font-mono font-bold">{formatNumber(result.angleC)}°</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Calculations */}
              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-4">🧮 Step-by-Step Calculations</h5>
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
              <div className="text-red-600 text-lg font-semibold mb-2">Invalid Triangle</div>
              <div className="text-gray-600">Please check your input values and try again.</div>
            </div>
          )}
        </div>
      )}

      <ShareModal 
        isOpen={showShareModal} 
        onClose={closeShareModal} 
        shareUrl={shareUrl} 
        shareText={shareText} 
        calculatorName="Triangle Calculator" 
      />
    </div>
  );
}
