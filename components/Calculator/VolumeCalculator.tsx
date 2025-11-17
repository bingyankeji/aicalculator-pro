'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calculator, Box, Circle, Cylinder, Triangle, Square, Share2, Save, Printer } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

type VolumeShape = 'cube' | 'sphere' | 'cylinder' | 'cone' | 'rectangular-prism' | 'triangular-prism' | 'pyramid' | 'ellipsoid' | 'torus' | 'hemisphere';

interface VolumeInputs {
  shape: VolumeShape;
  // Cube
  side?: number;
  // Sphere
  radius?: number;
  // Cylinder
  cylinderRadius?: number;
  height?: number;
  // Cone
  coneRadius?: number;
  coneHeight?: number;
  // Rectangular Prism
  length?: number;
  width?: number;
  rectHeight?: number;
  // Triangular Prism
  baseLength?: number;
  triangleHeight?: number;
  prismHeight?: number;
  // Pyramid
  baseArea?: number;
  pyramidHeight?: number;
  // Ellipsoid
  semiAxisA?: number;
  semiAxisB?: number;
  semiAxisC?: number;
}

interface VolumeResult {
  volume: number;
  surfaceArea: number;
  formula: string;
  explanation: string;
  materialEstimate: {
    concrete: number; // cubic yards
    water: number; // gallons
    paint: number; // square feet coverage
  };
  applications: string[];
}

const shapeOptions = [
  { value: 'cube', label: '📦 Cube', icon: '🧊' },
  { value: 'sphere', label: '⚽ Sphere', icon: '🌍' },
  { value: 'cylinder', label: '🥫 Cylinder', icon: '🛢️' },
  { value: 'cone', label: '🍦 Cone', icon: '📐' },
  { value: 'rectangular-prism', label: '📦 Rectangular Prism', icon: '📦' },
  { value: 'triangular-prism', label: '🔺 Triangular Prism', icon: '⛰️' },
  { value: 'pyramid', label: '🔺 Pyramid', icon: '🏛️' },
  { value: 'ellipsoid', label: '🥚 Ellipsoid', icon: '🥚' },
  { value: 'hemisphere', label: '🌗 Hemisphere', icon: '🌗' }
];

function calculateVolume(inputs: VolumeInputs): VolumeResult | null {
  const { shape } = inputs;
  
  switch (shape) {
    case 'cube': {
      if (!inputs.side) return null;
      const volume = Math.pow(inputs.side, 3);
      const surfaceArea = 6 * Math.pow(inputs.side, 2);
      return {
        volume,
        surfaceArea,
        formula: `V = s³ = ${inputs.side}³`,
        explanation: `Volume of a cube with side length ${inputs.side} units`,
        materialEstimate: {
          concrete: volume / 27, // cubic feet to cubic yards
          water: volume * 7.48, // cubic feet to gallons
          paint: surfaceArea
        },
        applications: ['Storage containers', 'Building blocks', 'Dice', 'Ice cubes']
      };
    }
    
    case 'sphere': {
      if (!inputs.radius) return null;
      const volume = (4/3) * Math.PI * Math.pow(inputs.radius, 3);
      const surfaceArea = 4 * Math.PI * Math.pow(inputs.radius, 2);
      return {
        volume,
        surfaceArea,
        formula: `V = (4/3)πr³ = (4/3)π(${inputs.radius})³`,
        explanation: `Volume of a sphere with radius ${inputs.radius} units`,
        materialEstimate: {
          concrete: volume / 27,
          water: volume * 7.48,
          paint: surfaceArea
        },
        applications: ['Balls', 'Planets', 'Bubbles', 'Tank spheres']
      };
    }
    
    case 'cylinder': {
      if (!inputs.cylinderRadius || !inputs.height) return null;
      const volume = Math.PI * Math.pow(inputs.cylinderRadius, 2) * inputs.height;
      const surfaceArea = 2 * Math.PI * inputs.cylinderRadius * (inputs.cylinderRadius + inputs.height);
      return {
        volume,
        surfaceArea,
        formula: `V = πr²h = π(${inputs.cylinderRadius})²(${inputs.height})`,
        explanation: `Volume of a cylinder with radius ${inputs.cylinderRadius} and height ${inputs.height} units`,
        materialEstimate: {
          concrete: volume / 27,
          water: volume * 7.48,
          paint: surfaceArea
        },
        applications: ['Cans', 'Pipes', 'Tanks', 'Columns']
      };
    }
    
    case 'cone': {
      if (!inputs.coneRadius || !inputs.coneHeight) return null;
      const volume = (1/3) * Math.PI * Math.pow(inputs.coneRadius, 2) * inputs.coneHeight;
      const slantHeight = Math.sqrt(Math.pow(inputs.coneRadius, 2) + Math.pow(inputs.coneHeight, 2));
      const surfaceArea = Math.PI * inputs.coneRadius * (inputs.coneRadius + slantHeight);
      return {
        volume,
        surfaceArea,
        formula: `V = (1/3)πr²h = (1/3)π(${inputs.coneRadius})²(${inputs.coneHeight})`,
        explanation: `Volume of a cone with radius ${inputs.coneRadius} and height ${inputs.coneHeight} units`,
        materialEstimate: {
          concrete: volume / 27,
          water: volume * 7.48,
          paint: surfaceArea
        },
        applications: ['Ice cream cones', 'Traffic cones', 'Funnels', 'Roof peaks']
      };
    }
    
    case 'rectangular-prism': {
      if (!inputs.length || !inputs.width || !inputs.rectHeight) return null;
      const volume = inputs.length * inputs.width * inputs.rectHeight;
      const surfaceArea = 2 * (inputs.length * inputs.width + inputs.width * inputs.rectHeight + inputs.rectHeight * inputs.length);
      return {
        volume,
        surfaceArea,
        formula: `V = l×w×h = ${inputs.length}×${inputs.width}×${inputs.rectHeight}`,
        explanation: `Volume of a rectangular prism with dimensions ${inputs.length}×${inputs.width}×${inputs.rectHeight} units`,
        materialEstimate: {
          concrete: volume / 27,
          water: volume * 7.48,
          paint: surfaceArea
        },
        applications: ['Boxes', 'Rooms', 'Swimming pools', 'Containers']
      };
    }
    
    case 'hemisphere': {
      if (!inputs.radius) return null;
      const volume = (2/3) * Math.PI * Math.pow(inputs.radius, 3);
      const surfaceArea = 3 * Math.PI * Math.pow(inputs.radius, 2);
      return {
        volume,
        surfaceArea,
        formula: `V = (2/3)πr³ = (2/3)π(${inputs.radius})³`,
        explanation: `Volume of a hemisphere with radius ${inputs.radius} units`,
        materialEstimate: {
          concrete: volume / 27,
          water: volume * 7.48,
          paint: surfaceArea
        },
        applications: ['Domes', 'Bowl shapes', 'Planetarium', 'Half spheres']
      };
    }
    
    default:
      return null;
  }
}

function formatNumber(num: number): string {
  if (num < 0.01) return num.toExponential(2);
  if (num < 1) return num.toFixed(4);
  if (num < 100) return num.toFixed(2);
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export default function VolumeCalculator() {
  const [inputs, setInputs] = useState<VolumeInputs>({
    shape: 'cube',
    side: 5
  });

  const resultRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => {
    return calculateVolume(inputs);
  }, [inputs]);

  const updateInput = (field: keyof VolumeInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleShapeChange = (newShape: VolumeShape) => {
    // Reset inputs when shape changes
    const defaultInputs: VolumeInputs = { shape: newShape };
    
    switch (newShape) {
      case 'cube':
        defaultInputs.side = 5;
        break;
      case 'sphere':
      case 'hemisphere':
        defaultInputs.radius = 3;
        break;
      case 'cylinder':
        defaultInputs.cylinderRadius = 3;
        defaultInputs.height = 8;
        break;
      case 'cone':
        defaultInputs.coneRadius = 3;
        defaultInputs.coneHeight = 6;
        break;
      case 'rectangular-prism':
        defaultInputs.length = 6;
        defaultInputs.width = 4;
        defaultInputs.rectHeight = 3;
        break;
    }
    
    setInputs(defaultInputs);
  };

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/volume-calculator',
    getShareParams: () => ({
      shape: inputs.shape,
      ...(inputs.side && { side: inputs.side.toString() }),
      ...(inputs.radius && { radius: inputs.radius.toString() }),
      ...(inputs.cylinderRadius && { cylinderRadius: inputs.cylinderRadius.toString() }),
      ...(inputs.height && { height: inputs.height.toString() }),
    }),
    getShareText: () => {
      if (!result) return 'Check out this volume calculation!';
      return `${inputs.shape} volume: ${formatNumber(result.volume)} cubic units`;
    },
  });

  const renderInputs = () => {
    switch (inputs.shape) {
      case 'cube':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Side Length</label>
            <input
              type="number"
              value={inputs.side || ''}
              onChange={(e) => updateInput('side', Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              step="0.1"
              placeholder="Enter side length"
            />
          </div>
        );
      
      case 'sphere':
      case 'hemisphere':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Radius</label>
            <input
              type="number"
              value={inputs.radius || ''}
              onChange={(e) => updateInput('radius', Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              step="0.1"
              placeholder="Enter radius"
            />
          </div>
        );
      
      case 'cylinder':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Radius</label>
              <input
                type="number"
                value={inputs.cylinderRadius || ''}
                onChange={(e) => updateInput('cylinderRadius', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter radius"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
              <input
                type="number"
                value={inputs.height || ''}
                onChange={(e) => updateInput('height', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter height"
              />
            </div>
          </div>
        );
      
      case 'cone':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Base Radius</label>
              <input
                type="number"
                value={inputs.coneRadius || ''}
                onChange={(e) => updateInput('coneRadius', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter base radius"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
              <input
                type="number"
                value={inputs.coneHeight || ''}
                onChange={(e) => updateInput('coneHeight', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter height"
              />
            </div>
          </div>
        );
      
      case 'rectangular-prism':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
              <input
                type="number"
                value={inputs.length || ''}
                onChange={(e) => updateInput('length', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter length"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
              <input
                type="number"
                value={inputs.width || ''}
                onChange={(e) => updateInput('width', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter width"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
              <input
                type="number"
                value={inputs.rectHeight || ''}
                onChange={(e) => updateInput('rectHeight', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
                placeholder="Enter height"
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
          <Box className="w-6 h-6 text-blue-600" />
          Volume Calculator
        </h3>

        <div className="space-y-6">
          {/* Shape Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Shape</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {shapeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleShapeChange(option.value as VolumeShape)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    inputs.shape === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{option.icon}</div>
                  <div className="text-sm font-medium">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Inputs */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Dimensions</h4>
            {renderInputs()}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => handleShapeChange(inputs.shape)}
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
            Volume Calculation Results
          </h4>

          {/* Main Results */}
          <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-700 font-medium mb-2">Volume</div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 break-all">{formatNumber(result.volume)}</div>
              <div className="text-sm text-blue-600 mt-1">cubic units</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <div className="text-sm text-green-700 font-medium mb-2">Surface Area</div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-900 break-all">{formatNumber(result.surfaceArea)}</div>
              <div className="text-sm text-green-600 mt-1">square units</div>
            </div>
          </div>

          {/* Formula and Explanation */}
          <div className="mb-6">
            <h5 className="text-lg font-bold text-gray-900 mb-4">📐 Formula & Calculation</h5>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="font-mono text-lg text-gray-900 mb-2">{result.formula}</div>
              <div className="text-sm text-gray-600">{result.explanation}</div>
            </div>
          </div>

          {/* Material Estimates */}
          <div className="mb-6">
            <h5 className="text-lg font-bold text-gray-900 mb-4">🏗️ Material Estimates</h5>
            <div className="grid md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                <div className="text-sm text-orange-700 font-medium mb-1">Concrete Needed</div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-orange-900 break-all">{formatNumber(result.materialEstimate.concrete)}</div>
                <div className="text-xs text-orange-600">cubic yards</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-lg border border-cyan-200">
                <div className="text-sm text-cyan-700 font-medium mb-1">Water Capacity</div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-900 break-all">{formatNumber(result.materialEstimate.water)}</div>
                <div className="text-xs text-cyan-600">gallons</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                <div className="text-sm text-purple-700 font-medium mb-1">Paint Coverage</div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-900 break-all">{formatNumber(result.materialEstimate.paint)}</div>
                <div className="text-xs text-purple-600">square feet</div>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div>
            <h5 className="text-lg font-bold text-gray-900 mb-4">🎯 Real-World Applications</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {result.applications.map((app, index) => (
                <div key={index} className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
                  <div className="text-sm font-medium text-indigo-900">{app}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ShareModal 
        isOpen={showShareModal} 
        onClose={closeShareModal} 
        shareUrl={shareUrl} 
        shareText={shareText} 
        calculatorName="Volume Calculator" 
      />
    </div>
  );
}
