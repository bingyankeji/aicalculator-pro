'use client';

import { useState, useRef, useEffect } from 'react';
import { Share2, Save, Printer, Shapes, Circle, Square, Triangle, Minus } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

type ShapeType = 'rectangle' | 'circle' | 'triangle' | 'trapezoid' | 'parallelogram' | 'ellipse' | 'polygon' | 'irregular';

interface ShapeInputs {
  shape: ShapeType;
  // Rectangle/Parallelogram
  length?: number;
  width?: number;
  // Circle/Ellipse
  radius?: number;
  radiusA?: number;
  radiusB?: number;
  // Triangle
  base?: number;
  triangleHeight?: number;
  sideA?: number;
  sideB?: number;
  sideC?: number;
  // Trapezoid
  base1?: number;
  base2?: number;
  trapezoidHeight?: number;
  // Polygon
  polygonSides?: number;
  polygonSideLength?: number;
  // Irregular shape (coordinates)
  coordinates?: { x: number; y: number }[];
  // Material calculations
  materialType?: 'flooring' | 'paint' | 'grass' | 'concrete';
  materialCostPerUnit?: number;
  // Unit
  unit: 'feet' | 'meters' | 'inches' | 'yards';
}

interface AreaResult {
  area: number;
  areaSqFt: number;
  areaSqM: number;
  shape: ShapeType;
  formula: string;
  explanation: string;
  recommendations: string[];
  // Material calculations
  materialCalculations?: {
    materialType: string;
    quantity: number;
    unit: string;
    totalCost?: number;
    wastageAllowance: number;
    finalQuantity: number;
  };
}

export function AreaCalculator() {
  const [inputs, setInputs] = useState<ShapeInputs>({
    shape: 'rectangle',
    length: 10,
    width: 8,
    unit: 'feet',
  });

  const [result, setResult] = useState<AreaResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Load from URL parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const shape = params.get('s') as ShapeType;
      const unit = params.get('u') as 'feet' | 'meters' | 'inches' | 'yards';
      const length = params.get('l');
      const width = params.get('w');
      const radius = params.get('r');
      const radiusA = params.get('ra');
      const radiusB = params.get('rb');
      const base = params.get('b');
      const height = params.get('h');
      const base1 = params.get('b1');
      const base2 = params.get('b2');

      if (shape) {
        const customInputs: ShapeInputs = {
          shape: shape || 'rectangle',
          unit: unit || 'feet',
          length: length ? parseFloat(length) : undefined,
          width: width ? parseFloat(width) : undefined,
          radius: radius ? parseFloat(radius) : undefined,
          radiusA: radiusA ? parseFloat(radiusA) : undefined,
          radiusB: radiusB ? parseFloat(radiusB) : undefined,
          base: base ? parseFloat(base) : undefined,
          triangleHeight: height ? parseFloat(height) : undefined,
          trapezoidHeight: height ? parseFloat(height) : undefined,
          base1: base1 ? parseFloat(base1) : undefined,
          base2: base2 ? parseFloat(base2) : undefined,
        };
        setInputs(customInputs);
        // Calculate after a short delay to ensure state is set
        setTimeout(() => {
          calculateAreaWithInputs(customInputs);
        }, 100);
      }
    }
  }, []);

  const handleInputChange = (field: keyof ShapeInputs, value: any) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const calculateAreaWithInputs = (customInputs: ShapeInputs) => {
    const { shape, unit } = customInputs;
    let area = 0;
    let formula = '';
    let explanation = '';

    // Convert all inputs to feet for calculation
    const toFeet = (value: number): number => {
      if (unit === 'meters') return value * 3.28084;
      if (unit === 'inches') return value / 12;
      if (unit === 'yards') return value * 3;
      return value;
    };

    const fromFeet = (value: number): number => {
      if (unit === 'meters') return value / 3.28084;
      if (unit === 'inches') return value * 12;
      if (unit === 'yards') return value / 3;
      return value;
    };

    switch (shape) {
      case 'rectangle':
        if (!customInputs.length || !customInputs.width) {
          alert('Please enter both length and width');
          return;
        }
        const lengthFt = toFeet(customInputs.length);
        const widthFt = toFeet(customInputs.width);
        area = lengthFt * widthFt;
        formula = `Area = Length × Width = ${customInputs.length} × ${customInputs.width} = ${fromFeet(area).toFixed(2)} ${unit === 'feet' ? 'sq ft' : unit === 'meters' ? 'sq m' : unit === 'inches' ? 'sq in' : 'sq yd'}`;
        explanation = `A rectangle with length ${customInputs.length} ${unit} and width ${customInputs.width} ${unit} has an area of ${fromFeet(area).toFixed(2)} square ${unit === 'feet' ? 'feet' : unit === 'meters' ? 'meters' : unit === 'inches' ? 'inches' : 'yards'}.`;
        break;

      case 'circle':
        if (!customInputs.radius) {
          alert('Please enter the radius');
          return;
        }
        const radiusFt = toFeet(customInputs.radius);
        area = Math.PI * radiusFt * radiusFt;
        formula = `Area = π × r² = π × ${customInputs.radius}² = ${fromFeet(area).toFixed(2)} ${unit === 'feet' ? 'sq ft' : unit === 'meters' ? 'sq m' : unit === 'inches' ? 'sq in' : 'sq yd'}`;
        explanation = `A circle with radius ${customInputs.radius} ${unit} has an area of ${fromFeet(area).toFixed(2)} square ${unit === 'feet' ? 'feet' : unit === 'meters' ? 'meters' : unit === 'inches' ? 'inches' : 'yards'}.`;
        break;

      case 'triangle':
        if (!customInputs.base || !customInputs.triangleHeight) {
          alert('Please enter both base and height');
          return;
        }
        const baseFt = toFeet(customInputs.base);
        const heightFt = toFeet(customInputs.triangleHeight);
        area = (baseFt * heightFt) / 2;
        formula = `Area = (Base × Height) ÷ 2 = (${customInputs.base} × ${customInputs.triangleHeight}) ÷ 2 = ${fromFeet(area).toFixed(2)} ${unit === 'feet' ? 'sq ft' : unit === 'meters' ? 'sq m' : unit === 'inches' ? 'sq in' : 'sq yd'}`;
        explanation = `A triangle with base ${customInputs.base} ${unit} and height ${customInputs.triangleHeight} ${unit} has an area of ${fromFeet(area).toFixed(2)} square ${unit === 'feet' ? 'feet' : unit === 'meters' ? 'meters' : unit === 'inches' ? 'inches' : 'yards'}.`;
        break;

      case 'trapezoid':
        if (!customInputs.base1 || !customInputs.base2 || !customInputs.trapezoidHeight) {
          alert('Please enter both bases and height');
          return;
        }
        const base1Ft = toFeet(customInputs.base1);
        const base2Ft = toFeet(customInputs.base2);
        const trapHeightFt = toFeet(customInputs.trapezoidHeight);
        area = ((base1Ft + base2Ft) * trapHeightFt) / 2;
        formula = `Area = ((Base₁ + Base₂) × Height) ÷ 2 = ((${customInputs.base1} + ${customInputs.base2}) × ${customInputs.trapezoidHeight}) ÷ 2 = ${fromFeet(area).toFixed(2)} ${unit === 'feet' ? 'sq ft' : unit === 'meters' ? 'sq m' : unit === 'inches' ? 'sq in' : 'sq yd'}`;
        explanation = `A trapezoid with bases ${customInputs.base1} ${unit} and ${customInputs.base2} ${unit}, and height ${customInputs.trapezoidHeight} ${unit} has an area of ${fromFeet(area).toFixed(2)} square ${unit === 'feet' ? 'feet' : unit === 'meters' ? 'meters' : unit === 'inches' ? 'inches' : 'yards'}.`;
        break;

      case 'parallelogram':
        if (!customInputs.length || !customInputs.width) {
          alert('Please enter both base and height');
          return;
        }
        const paraBaseFt = toFeet(customInputs.length);
        const paraHeightFt = toFeet(customInputs.width);
        area = paraBaseFt * paraHeightFt;
        formula = `Area = Base × Height = ${customInputs.length} × ${customInputs.width} = ${fromFeet(area).toFixed(2)} ${unit === 'feet' ? 'sq ft' : unit === 'meters' ? 'sq m' : unit === 'inches' ? 'sq in' : 'sq yd'}`;
        explanation = `A parallelogram with base ${customInputs.length} ${unit} and height ${customInputs.width} ${unit} has an area of ${fromFeet(area).toFixed(2)} square ${unit === 'feet' ? 'feet' : unit === 'meters' ? 'meters' : unit === 'inches' ? 'inches' : 'yards'}.`;
        break;

      case 'ellipse':
        if (!customInputs.radiusA || !customInputs.radiusB) {
          alert('Please enter both radii (semi-major and semi-minor axes)');
          return;
        }
        const radiusAFt = toFeet(customInputs.radiusA);
        const radiusBFt = toFeet(customInputs.radiusB);
        area = Math.PI * radiusAFt * radiusBFt;
        formula = `Area = π × a × b = π × ${customInputs.radiusA} × ${customInputs.radiusB} = ${fromFeet(area).toFixed(2)} ${unit === 'feet' ? 'sq ft' : unit === 'meters' ? 'sq m' : unit === 'inches' ? 'sq in' : 'sq yd'}`;
        explanation = `An ellipse with semi-major axis ${customInputs.radiusA} ${unit} and semi-minor axis ${customInputs.radiusB} ${unit} has an area of ${fromFeet(area).toFixed(2)} square ${unit === 'feet' ? 'feet' : unit === 'meters' ? 'meters' : unit === 'inches' ? 'inches' : 'yards'}.`;
        break;

      case 'polygon':
        if (!customInputs.polygonSides || !customInputs.polygonSideLength) {
          alert('Please enter number of sides and side length');
          return;
        }
        const sides = customInputs.polygonSides;
        const sideLength = toFeet(customInputs.polygonSideLength);
        // Regular polygon area formula: (n × s²) / (4 × tan(π/n))
        area = (sides * sideLength * sideLength) / (4 * Math.tan(Math.PI / sides));
        formula = `Area = (n × s²) / (4 × tan(π/n)) = (${sides} × ${customInputs.polygonSideLength}²) / (4 × tan(π/${sides})) = ${fromFeet(area).toFixed(2)} ${unit === 'feet' ? 'sq ft' : unit === 'meters' ? 'sq m' : unit === 'inches' ? 'sq in' : 'sq yd'}`;
        explanation = `A regular ${sides}-sided polygon with side length ${customInputs.polygonSideLength} ${unit} has an area of ${fromFeet(area).toFixed(2)} square ${unit === 'feet' ? 'feet' : unit === 'meters' ? 'meters' : unit === 'inches' ? 'inches' : 'yards'}.`;
        break;

      case 'irregular':
        if (!customInputs.coordinates || customInputs.coordinates.length < 3) {
          alert('Please enter at least 3 coordinate points');
          return;
        }
        
        // Check if points are collinear (would result in zero area)
        const coords = customInputs.coordinates.map(coord => ({
          x: toFeet(coord.x),
          y: toFeet(coord.y)
        }));
        
        // Shoelace formula for irregular polygon
        let shoelaceSum = 0;
        for (let i = 0; i < coords.length; i++) {
          const j = (i + 1) % coords.length;
          shoelaceSum += coords[i].x * coords[j].y - coords[j].x * coords[i].y;
        }
        area = Math.abs(shoelaceSum) / 2;
        
        // Check for zero or very small area
        if (area < 0.001) {
          alert('⚠️ The points you entered form a line or very small area. Please ensure the points form a proper polygon with distinct vertices that are not collinear.');
          return;
        }
        
        formula = `Area = |Σ(xi × yi+1 - xi+1 × yi)| / 2 (Shoelace formula)`;
        explanation = `An irregular polygon with ${customInputs.coordinates.length} vertices has an area of ${fromFeet(area).toFixed(2)} square ${unit === 'feet' ? 'feet' : unit === 'meters' ? 'meters' : unit === 'inches' ? 'inches' : 'yards'}.`;
        break;
    }

    // Convert to square feet and square meters
    const areaSqFt = area;
    const areaSqM = area * 0.092903;

    // Generate recommendations
    const recommendations: string[] = [];
    if (areaSqFt < 50) {
      recommendations.push('📏 Small area (< 50 sq ft). Perfect for small projects like closets, bathrooms, or patios.');
    } else if (areaSqFt < 200) {
      recommendations.push('🏠 Medium area (50-200 sq ft). Typical for bedrooms, kitchens, or small offices.');
    } else if (areaSqFt < 500) {
      recommendations.push('🏡 Large area (200-500 sq ft). Suitable for living rooms, large bedrooms, or open spaces.');
    } else {
      recommendations.push('🏢 Very large area (> 500 sq ft). Great for commercial spaces, warehouses, or large open areas.');
    }

    if (shape === 'circle' || shape === 'ellipse') {
      recommendations.push('⭕ Circular/elliptical shapes are efficient for space usage. Consider this for patios, pools, or decorative areas.');
    }

    if (shape === 'triangle') {
      recommendations.push('🔺 Triangular areas are common in attics, gable ends, or corner spaces. Remember: area = (base × height) ÷ 2.');
    }

    recommendations.push('💡 Tip: For irregular shapes, break them into basic shapes (rectangles, triangles, circles) and calculate each separately, then add together.');

    // Material calculations
    let materialCalculations;
    if (customInputs.materialType) {
      const materialData = {
        flooring: { unit: 'sq ft', wastage: 0.1, costPerUnit: 3.5 }, // 10% wastage, $3.5/sq ft
        paint: { unit: 'gallons', wastage: 0.05, costPerUnit: 35, coverage: 350 }, // 5% wastage, $35/gallon, 350 sq ft/gallon
        grass: { unit: 'sq ft', wastage: 0.15, costPerUnit: 0.8 }, // 15% wastage, $0.8/sq ft
        concrete: { unit: 'cubic yards', wastage: 0.1, costPerUnit: 120, thickness: 4 }, // 10% wastage, $120/cubic yard, 4 inches thick
      };

      const material = materialData[customInputs.materialType];
      let quantity = areaSqFt;
      let unit = material.unit;

      // Special calculations for different materials
      if (customInputs.materialType === 'paint') {
        const paintMaterial = material as any;
        quantity = areaSqFt / paintMaterial.coverage; // Convert to gallons
      } else if (customInputs.materialType === 'concrete') {
        const concreteMaterial = material as any;
        quantity = (areaSqFt * (concreteMaterial.thickness / 12)) / 27; // Convert to cubic yards (4 inches thick)
      }

      const wastageAllowance = quantity * material.wastage;
      const finalQuantity = quantity + wastageAllowance;
      const totalCost = customInputs.materialCostPerUnit 
        ? finalQuantity * customInputs.materialCostPerUnit
        : finalQuantity * material.costPerUnit;

      materialCalculations = {
        materialType: customInputs.materialType,
        quantity: parseFloat(quantity.toFixed(2)),
        unit,
        totalCost: parseFloat(totalCost.toFixed(2)),
        wastageAllowance: parseFloat(wastageAllowance.toFixed(2)),
        finalQuantity: parseFloat(finalQuantity.toFixed(2)),
      };

      // Add material-specific recommendations
      recommendations.push(`🏗️ ${customInputs.materialType.charAt(0).toUpperCase() + customInputs.materialType.slice(1)} needed: ${finalQuantity.toFixed(2)} ${unit} (including ${(material.wastage * 100).toFixed(0)}% wastage)`);
      recommendations.push(`💰 Estimated cost: $${totalCost.toFixed(2)} ${customInputs.materialCostPerUnit ? '(custom price)' : '(average price)'}`);
    }

    setResult({
      area: fromFeet(area),
      areaSqFt,
      areaSqM,
      shape,
      formula,
      explanation,
      recommendations,
      materialCalculations,
    });
  };

  const calculateArea = () => {
    calculateAreaWithInputs(inputs);
  };

  const handleReset = () => {
    setInputs({
      shape: 'rectangle',
      length: 10,
      width: 8,
      unit: 'feet',
    });
    setResult(null);
  };

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/area-calculator',
    getShareParams: () => ({
      s: inputs.shape,
      l: inputs.length?.toString() || '',
      w: inputs.width?.toString() || '',
      r: inputs.radius?.toString() || '',
      ra: inputs.radiusA?.toString() || '',
      rb: inputs.radiusB?.toString() || '',
      b: inputs.base?.toString() || '',
      h: inputs.triangleHeight?.toString() || inputs.trapezoidHeight?.toString() || '',
      b1: inputs.base1?.toString() || '',
      b2: inputs.base2?.toString() || '',
      u: inputs.unit,
    }),
    getShareText: () =>
      result
        ? `Area Calculation: ${result.area.toFixed(2)} ${inputs.unit === 'feet' ? 'sq ft' : inputs.unit === 'meters' ? 'sq m' : inputs.unit === 'inches' ? 'sq in' : 'sq yd'} (${result.shape})`
        : 'Calculate area for various shapes!',
  });

  const handleSaveImage = async () => {
    if (!resultRef.current) return;
    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const link = document.createElement('a');
      link.download = 'area-calculator-results.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current) return;
    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Area Calculator Results</title>
              <style>
                body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print {
                  body { padding: 0; }
                  img { max-width: 100%; page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" onload="window.print();"/>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
      alert('Failed to print. Please try again.');
    }
  };

  const getShapeIcon = (shape: ShapeType) => {
    switch (shape) {
      case 'rectangle':
        return <Square className="w-5 h-5" />;
      case 'circle':
        return <Circle className="w-5 h-5" />;
      case 'triangle':
        return <Triangle className="w-5 h-5" />;
      default:
        return <Shapes className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 sticky top-6 space-y-4 sm:space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Shapes className="w-6 h-6 text-blue-600" />
              Area Calculator
            </h2>

            <div className="space-y-5">
              {/* Shape Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Shape <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['rectangle', 'circle', 'triangle', 'trapezoid', 'parallelogram', 'ellipse', 'polygon', 'irregular'] as ShapeType[]).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => {
                        setInputs((prev) => ({
                          ...prev,
                          shape,
                          length: prev.length || 10,
                          width: prev.width || 8,
                          radius: prev.radius || 5,
                          radiusA: prev.radiusA || 5,
                          radiusB: prev.radiusB || 3,
                          base: prev.base || 10,
                          triangleHeight: prev.triangleHeight || 8,
                          trapezoidHeight: prev.trapezoidHeight || 8,
                          base1: prev.base1 || 10,
                          base2: prev.base2 || 8,
                        }));
                        setResult(null);
                      }}
                      className={`px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm ${
                        inputs.shape === shape
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {getShapeIcon(shape)}
                        <span className="capitalize">{shape}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Unit Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Unit <span className="text-red-500">*</span>
                </label>
                <select
                  value={inputs.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="feet">Feet</option>
                  <option value="meters">Meters</option>
                  <option value="inches">Inches</option>
                  <option value="yards">Yards</option>
                </select>
              </div>

              {/* Dynamic Inputs based on shape */}
              {inputs.shape === 'rectangle' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Length <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={inputs.length || ''}
                      onChange={(e) => handleInputChange('length', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="10"
                      step="0.1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Width <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={inputs.width || ''}
                      onChange={(e) => handleInputChange('width', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="8"
                      step="0.1"
                      min="0"
                    />
                  </div>
                </>
              )}

              {inputs.shape === 'circle' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Radius <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={inputs.radius || ''}
                    onChange={(e) => handleInputChange('radius', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="5"
                    step="0.1"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Radius is half the diameter
                  </p>
                </div>
              )}

              {inputs.shape === 'triangle' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Base <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={inputs.base || ''}
                      onChange={(e) => handleInputChange('base', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="10"
                      step="0.1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Height <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={inputs.triangleHeight || ''}
                      onChange={(e) => handleInputChange('triangleHeight', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="8"
                      step="0.1"
                      min="0"
                    />
                  </div>
                </>
              )}

              {inputs.shape === 'trapezoid' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Base 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={inputs.base1 || ''}
                      onChange={(e) => handleInputChange('base1', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="10"
                      step="0.1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Base 2 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={inputs.base2 || ''}
                      onChange={(e) => handleInputChange('base2', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="8"
                      step="0.1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Height <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={inputs.trapezoidHeight || ''}
                      onChange={(e) => handleInputChange('trapezoidHeight', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="6"
                      step="0.1"
                      min="0"
                    />
                  </div>
                </>
              )}

              {inputs.shape === 'parallelogram' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Base <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={inputs.length || ''}
                      onChange={(e) => handleInputChange('length', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="10"
                      step="0.1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Height <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={inputs.width || ''}
                      onChange={(e) => handleInputChange('width', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="8"
                      step="0.1"
                      min="0"
                    />
                  </div>
                </>
              )}

              {inputs.shape === 'ellipse' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Semi-Major Axis (a) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={inputs.radiusA || ''}
                      onChange={(e) => handleInputChange('radiusA', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="5"
                      step="0.1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Semi-Minor Axis (b) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={inputs.radiusB || ''}
                      onChange={(e) => handleInputChange('radiusB', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="3"
                      step="0.1"
                      min="0"
                    />
                  </div>
                </>
              )}

              {inputs.shape === 'polygon' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Sides <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={inputs.polygonSides || 5}
                      onChange={(e) => handleInputChange('polygonSides', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value={3}>Triangle (3 sides)</option>
                      <option value={4}>Square (4 sides)</option>
                      <option value={5}>Pentagon (5 sides)</option>
                      <option value={6}>Hexagon (6 sides)</option>
                      <option value={7}>Heptagon (7 sides)</option>
                      <option value={8}>Octagon (8 sides)</option>
                      <option value={10}>Decagon (10 sides)</option>
                      <option value={12}>Dodecagon (12 sides)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Side Length <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={inputs.polygonSideLength || ''}
                      onChange={(e) => handleInputChange('polygonSideLength', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="5"
                      step="0.1"
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Length of each side (all sides equal in regular polygon)
                    </p>
                  </div>
                </>
              )}

              {inputs.shape === 'irregular' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Coordinate Points <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {(inputs.coordinates || []).map((coord, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="number"
                          value={coord.x}
                          onChange={(e) => {
                            const newCoords = [...(inputs.coordinates || [])];
                            newCoords[index] = { ...coord, x: parseFloat(e.target.value) || 0 };
                            handleInputChange('coordinates', newCoords);
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="X"
                          step="0.1"
                        />
                        <input
                          type="number"
                          value={coord.y}
                          onChange={(e) => {
                            const newCoords = [...(inputs.coordinates || [])];
                            newCoords[index] = { ...coord, y: parseFloat(e.target.value) || 0 };
                            handleInputChange('coordinates', newCoords);
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Y"
                          step="0.1"
                        />
                        <button
                          onClick={() => {
                            const newCoords = (inputs.coordinates || []).filter((_, i) => i !== index);
                            handleInputChange('coordinates', newCoords);
                          }}
                          className="px-2 py-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newCoords = [...(inputs.coordinates || []), { x: 0, y: 0 }];
                        handleInputChange('coordinates', newCoords);
                      }}
                      className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all"
                    >
                      + Add Point
                    </button>
                  </div>
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-800 font-semibold mb-1">💡 How to use:</p>
                    <p className="text-xs text-blue-700 mb-2">
                      Add at least 3 points that form a proper polygon. Points will be connected in order.
                    </p>
                    <div className="space-y-1">
                      <p className="text-xs text-blue-700">
                        <strong>Example 1 (Square):</strong> (0,0) → (4,0) → (4,4) → (0,4)
                        <button
                          onClick={() => {
                            handleInputChange('coordinates', [
                              { x: 0, y: 0 },
                              { x: 4, y: 0 },
                              { x: 4, y: 4 },
                              { x: 0, y: 4 }
                            ]);
                          }}
                          className="ml-2 text-blue-600 hover:text-blue-800 underline"
                        >
                          Use
                        </button>
                      </p>
                      <p className="text-xs text-blue-700">
                        <strong>Example 2 (Triangle):</strong> (0,0) → (6,0) → (3,4)
                        <button
                          onClick={() => {
                            handleInputChange('coordinates', [
                              { x: 0, y: 0 },
                              { x: 6, y: 0 },
                              { x: 3, y: 4 }
                            ]);
                          }}
                          className="ml-2 text-blue-600 hover:text-blue-800 underline"
                        >
                          Use
                        </button>
                      </p>
                      <p className="text-xs text-blue-700">
                        <strong>Example 3 (L-Shape):</strong> (0,0) → (4,0) → (4,2) → (2,2) → (2,4) → (0,4)
                        <button
                          onClick={() => {
                            handleInputChange('coordinates', [
                              { x: 0, y: 0 },
                              { x: 4, y: 0 },
                              { x: 4, y: 2 },
                              { x: 2, y: 2 },
                              { x: 2, y: 4 },
                              { x: 0, y: 4 }
                            ]);
                          }}
                          className="ml-2 text-blue-600 hover:text-blue-800 underline"
                        >
                          Use
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Material Calculation Options */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Material Calculator (Optional)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Material Type
                    </label>
                    <select
                      value={inputs.materialType || ''}
                      onChange={(e) => handleInputChange('materialType', e.target.value || undefined)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select material (optional)</option>
                      <option value="flooring">Flooring (sq ft)</option>
                      <option value="paint">Paint (gallons)</option>
                      <option value="grass">Grass/Sod (sq ft)</option>
                      <option value="concrete">Concrete (cubic yards)</option>
                    </select>
                  </div>
                  {inputs.materialType && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cost per Unit (optional)
                      </label>
                      <input
                        type="number"
                        value={inputs.materialCostPerUnit || ''}
                        onChange={(e) => handleInputChange('materialCostPerUnit', parseFloat(e.target.value) || undefined)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter custom price (uses average if empty)"
                        step="0.01"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Leave empty to use average market prices
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={calculateArea}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Calculate Area
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          {result ? (
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleSaveImage}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save as Image
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md font-medium"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Results Content */}
              <div ref={resultRef} className="space-y-4 bg-white p-4 sm:p-6 rounded-xl">
                {/* Main Result */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-4 sm:p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    {getShapeIcon(result.shape)}
                    <span className="capitalize">{result.shape} Area</span>
                  </h3>

                  <div className="bg-white rounded-lg p-6 mb-4 border-2 border-blue-300">
                    <div className="text-sm text-gray-600 mb-2 font-semibold">Area</div>
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-2 break-all">
                      {result.area.toFixed(2)}
                    </div>
                    <div className="text-lg text-gray-700">
                      {inputs.unit === 'feet' ? 'sq ft' : inputs.unit === 'meters' ? 'sq m' : inputs.unit === 'inches' ? 'sq in' : 'sq yd'}
                    </div>
                  </div>

                  {/* Conversions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-600 mb-1">Square Feet</div>
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-all">
                        {result.areaSqFt.toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-600 mb-1">Square Meters</div>
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-all">
                        {result.areaSqM.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formula */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-3 sm:p-4 md:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">📐 Calculation Formula</h3>
                  <div className="bg-white rounded-lg p-3 sm:p-4 border border-purple-200">
                    <code className="text-xs sm:text-sm font-mono text-gray-800 break-all">{result.formula}</code>
                  </div>
                  <p className="text-sm text-gray-700 mt-3">{result.explanation}</p>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-3 sm:p-4 md:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>💡</span>
                    Tips & Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Material Calculations */}
                {result.materialCalculations && (
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-200 p-3 sm:p-4 md:p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      🏗️ Material Calculator Results
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-orange-200">
                        <div className="text-sm text-gray-600 mb-1">Material Needed</div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-all">
                          {result.materialCalculations.quantity}
                        </div>
                        <div className="text-sm text-gray-500">{result.materialCalculations.unit}</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-orange-200">
                        <div className="text-sm text-gray-600 mb-1">With Wastage</div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-all">
                          {result.materialCalculations.finalQuantity}
                        </div>
                        <div className="text-sm text-gray-500">{result.materialCalculations.unit}</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-orange-200">
                        <div className="text-sm text-gray-600 mb-1">Estimated Cost</div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 break-all">
                          ${result.materialCalculations.totalCost}
                        </div>
                        <div className="text-sm text-gray-500">Total project cost</div>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded-lg border border-orange-200">
                      <div className="text-sm text-gray-700">
                        <strong>Material:</strong> {result.materialCalculations.materialType.charAt(0).toUpperCase() + result.materialCalculations.materialType.slice(1)} • 
                        <strong> Wastage Allowance:</strong> {result.materialCalculations.wastageAllowance} {result.materialCalculations.unit}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
              <div className="text-6xl mb-4">📐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 hidden lg:block">Ready to Calculate Area?</h3>
              <p className="text-gray-600 mb-4">
                Select a shape, enter dimensions, and click "Calculate Area" to get instant results
              </p>
              <p className="text-sm text-gray-500">
                Supports rectangle, circle, triangle, trapezoid, parallelogram, ellipse, regular polygons, and irregular shapes with material calculator
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Area Calculator"
      />
    </div>
  );
}

