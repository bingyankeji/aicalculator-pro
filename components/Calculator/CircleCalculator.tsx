'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calculator, Circle, Share2 } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type CircleInputType = 'radius' | 'diameter' | 'circumference' | 'area';

interface CircleInputs {
  inputType: CircleInputType;
  value: number;
}

interface CircleResult {
  radius: number;
  diameter: number;
  circumference: number;
  area: number;
  calculations: string[];
  formulas: {
    area: string;
    circumference: string;
    diameter: string;
  };
}

const inputTypes = [
  { value: 'radius', label: 'Radius (r)', description: 'Distance from center to edge', icon: '📏' },
  { value: 'diameter', label: 'Diameter (d)', description: 'Distance across the circle', icon: '↔️' },
  { value: 'circumference', label: 'Circumference (C)', description: 'Distance around the circle', icon: '⭕' },
  { value: 'area', label: 'Area (A)', description: 'Space inside the circle', icon: '🔵' }
];

function calculateCircle(inputs: CircleInputs): CircleResult | null {
  if (!inputs.value || inputs.value <= 0) return null;

  let radius: number;
  const calculations: string[] = [];

  // Convert input to radius first
  switch (inputs.inputType) {
    case 'radius':
      radius = inputs.value;
      calculations.push(`Given radius: r = ${inputs.value}`);
      break;
    case 'diameter':
      radius = inputs.value / 2;
      calculations.push(`Given diameter: d = ${inputs.value}`);
      calculations.push(`Radius: r = d/2 = ${inputs.value}/2 = ${radius}`);
      break;
    case 'circumference':
      radius = inputs.value / (2 * Math.PI);
      calculations.push(`Given circumference: C = ${inputs.value}`);
      calculations.push(`Radius: r = C/(2π) = ${inputs.value}/(2π) = ${radius.toFixed(4)}`);
      break;
    case 'area':
      radius = Math.sqrt(inputs.value / Math.PI);
      calculations.push(`Given area: A = ${inputs.value}`);
      calculations.push(`Radius: r = √(A/π) = √(${inputs.value}/π) = ${radius.toFixed(4)}`);
      break;
    default:
      return null;
  }

  // Calculate all other properties
  const diameter = 2 * radius;
  const circumference = 2 * Math.PI * radius;
  const area = Math.PI * radius * radius;

  // Add calculation steps
  calculations.push(`Diameter: d = 2r = 2 × ${radius.toFixed(4)} = ${diameter.toFixed(4)}`);
  calculations.push(`Circumference: C = 2πr = 2π × ${radius.toFixed(4)} = ${circumference.toFixed(4)}`);
  calculations.push(`Area: A = πr² = π × ${radius.toFixed(4)}² = ${area.toFixed(4)}`);

  return {
    radius,
    diameter,
    circumference,
    area,
    calculations,
    formulas: {
      area: 'A = πr²',
      circumference: 'C = 2πr',
      diameter: 'd = 2r'
    }
  };
}

function formatNumber(num: number): string {
  if (num < 0.01) return num.toExponential(4);
  if (num < 1) return num.toFixed(6);
  if (num < 100) return num.toFixed(4);
  return num.toFixed(2);
}

export default function CircleCalculator() {
  const [inputs, setInputs] = useState<CircleInputs>({
    inputType: 'radius',
    value: 5
  });

  const resultRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => {
    return calculateCircle(inputs);
  }, [inputs]);

  const updateInput = (field: keyof CircleInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleTypeChange = (newType: CircleInputType) => {
    setInputs({
      inputType: newType,
      value: newType === 'radius' ? 5 : newType === 'diameter' ? 10 : newType === 'circumference' ? 31.416 : 78.54
    });
  };

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/circle-calculator',
    getShareParams: () => ({
      type: inputs.inputType,
      value: inputs.value.toString(),
    }),
    getShareText: () => {
      if (!result) return 'Check out this circle calculation!';
      return `Circle: Area = ${formatNumber(result.area)}, Circumference = ${formatNumber(result.circumference)}`;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4 md:space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Circle className="w-6 h-6 text-blue-600" />
          Circle Calculator
        </h3>

        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Input Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">What do you know about the circle?</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {inputTypes.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleTypeChange(option.value as CircleInputType)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    inputs.inputType === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-2">{option.icon}</div>
                  <div className="font-semibold mb-1">{option.label}</div>
                  <div className="text-xs opacity-75">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Value Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter {inputTypes.find(t => t.value === inputs.inputType)?.label}
            </label>
            <input
              type="number"
              value={inputs.value || ''}
              onChange={(e) => updateInput('value', Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              step="0.1"
              placeholder={`Enter ${inputs.inputType} value`}
            />
            <p className="text-xs text-gray-500 mt-1">
              {inputs.inputType === 'area' ? 'Square units (e.g., cm², m², ft²)' : 
               'Linear units (e.g., cm, m, ft, in)'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => handleTypeChange(inputs.inputType)}
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
        <div ref={resultRef} className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-green-600" />
            Circle Calculation Results
          </h4>

          {/* Main Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-700 font-medium mb-1">Radius</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-900 break-all">{formatNumber(result.radius)}</div>
              <div className="text-xs text-blue-600">units</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 rounded-lg border border-green-200">
              <div className="text-sm text-green-700 font-medium mb-1">Diameter</div>
              <div className="text-xl sm:text-2xl font-bold text-green-900 break-all">{formatNumber(result.diameter)}</div>
              <div className="text-xs text-green-600">units</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 rounded-lg border border-purple-200">
              <div className="text-sm text-purple-700 font-medium mb-1">Circumference</div>
              <div className="text-xl sm:text-2xl font-bold text-purple-900 break-all">{formatNumber(result.circumference)}</div>
              <div className="text-xs text-purple-600">units</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 sm:p-4 rounded-lg border border-orange-200">
              <div className="text-sm text-orange-700 font-medium mb-1">Area</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-900 break-all">{formatNumber(result.area)}</div>
              <div className="text-xs text-orange-600">square units</div>
            </div>
          </div>

          {/* Circle Visualization */}
          <div className="mb-3 sm:mb-6">
            <h5 className="text-lg font-bold text-gray-900 mb-3 sm:mb-4">🔵 Circle Visualization</h5>
            <div className="bg-gray-50 rounded-lg p-3 sm:p-6 flex justify-center">
              <div className="relative">
                <svg width="200" height="200" viewBox="0 0 200 200" className="border border-gray-300 rounded">
                  {/* Circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="rgba(59, 130, 246, 0.1)"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="2"
                  />
                  {/* Radius line */}
                  <line
                    x1="100"
                    y1="100"
                    x2="180"
                    y2="100"
                    stroke="rgb(239, 68, 68)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  {/* Diameter line */}
                  <line
                    x1="20"
                    y1="100"
                    x2="180"
                    y2="100"
                    stroke="rgb(34, 197, 94)"
                    strokeWidth="2"
                  />
                  {/* Center point */}
                  <circle cx="100" cy="100" r="3" fill="rgb(239, 68, 68)" />
                  {/* Labels */}
                  <text x="140" y="95" fontSize="12" fill="rgb(239, 68, 68)" fontWeight="bold">r</text>
                  <text x="95" y="115" fontSize="12" fill="rgb(239, 68, 68)" fontWeight="bold">•</text>
                  <text x="100" y="130" fontSize="10" fill="rgb(34, 197, 94)" textAnchor="middle">diameter</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Formulas */}
          <div className="mb-3 sm:mb-6">
            <h5 className="text-lg font-bold text-gray-900 mb-3 sm:mb-4">📐 Circle Formulas</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
                <div className="font-semibold text-blue-900 mb-2">Area Formula</div>
                <div className="font-mono text-lg text-blue-800">{result.formulas.area}</div>
                <div className="text-xs text-blue-600 mt-1">π ≈ 3.14159</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
                <div className="font-semibold text-green-900 mb-2">Circumference Formula</div>
                <div className="font-mono text-lg text-green-800">{result.formulas.circumference}</div>
                <div className="text-xs text-green-600 mt-1">Perimeter of circle</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 sm:p-4 border border-purple-200">
                <div className="font-semibold text-purple-900 mb-2">Diameter Formula</div>
                <div className="font-mono text-lg text-purple-800">{result.formulas.diameter}</div>
                <div className="text-xs text-purple-600 mt-1">Twice the radius</div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Calculations */}
          <div className="mb-3 sm:mb-6">
            <h5 className="text-lg font-bold text-gray-900 mb-3 sm:mb-4">🧮 Step-by-Step Calculations</h5>
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <ol className="space-y-2">
                {result.calculations.map((step, index) => (
                  <li key={index} className="text-sm font-mono text-gray-700">
                    <span className="font-bold text-blue-600">{index + 1}.</span> {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Quick Conversions */}
          <div>
            <h5 className="text-lg font-bold text-gray-900 mb-3 sm:mb-4">🔄 Quick Conversions</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 border border-yellow-200">
                <h6 className="font-semibold text-yellow-900 mb-3">Area Relationships</h6>
                <div className="space-y-1 text-sm text-yellow-800">
                  <div>• Circle area = {formatNumber(result.area)} square units</div>
                  <div>• Square with same area: side = {formatNumber(Math.sqrt(result.area))}</div>
                  <div>• Rectangle (2:1 ratio): {formatNumber(Math.sqrt(2 * result.area))} × {formatNumber(Math.sqrt(result.area / 2))}</div>
                </div>
              </div>
              <div className="bg-cyan-50 rounded-lg p-3 sm:p-4 border border-cyan-200">
                <h6 className="font-semibold text-cyan-900 mb-3">Circumference Relationships</h6>
                <div className="space-y-1 text-sm text-cyan-800">
                  <div>• Circle circumference = {formatNumber(result.circumference)} units</div>
                  <div>• Square with same perimeter: side = {formatNumber(result.circumference / 4)}</div>
                  <div>• Ratio to diameter: C/d = π ≈ {formatNumber(result.circumference / result.diameter)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ShareModal 
        isOpen={showShareModal} 
        onClose={closeShareModal} 
        shareUrl={shareUrl} 
        shareText={shareText} 
        calculatorName="Circle Calculator" 
      />
    </div>
  );
}
