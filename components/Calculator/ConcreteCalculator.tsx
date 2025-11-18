'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ConcreteResult {
  volumeCubicFeet: number;
  volumeCubicYards: number;
  volumeCubicMeters: number;
  weightKg: number;
  bags60lb: number;
  bags80lb: number;
}

export default function ConcreteCalculator() {
  const [result, setResult] = useState<ConcreteResult | null>(null);

  // Slab inputs
  const [slabLength, setSlabLength] = useState('6');
  const [slabWidth, setSlabWidth] = useState('2.5');
  const [slabThickness, setSlabThickness] = useState('5');
  const [slabLengthUnit, setSlabLengthUnit] = useState('meters');
  const [slabThicknessUnit, setSlabThicknessUnit] = useState('centimeters');
  const [slabQuantity, setSlabQuantity] = useState('1');

  // Column inputs
  const [columnDiameter, setColumnDiameter] = useState('2.5');
  const [columnHeight, setColumnHeight] = useState('6');
  const [columnUnit, setColumnUnit] = useState('meters');
  const [columnQuantity, setColumnQuantity] = useState('1');

  // Circular inputs
  const [circularOuter, setCircularOuter] = useState('5');
  const [circularInner, setCircularInner] = useState('4');
  const [circularHeight, setCircularHeight] = useState('6');
  const [circularDiameterUnit, setCircularDiameterUnit] = useState('meters');
  const [circularHeightUnit, setCircularHeightUnit] = useState('centimeters');
  const [circularQuantity, setCircularQuantity] = useState('1');

  // Curb inputs
  const [curbDepth, setCurbDepth] = useState('4');
  const [curbGutterWidth, setCurbGutterWidth] = useState('10');
  const [curbHeight, setCurbHeight] = useState('4');
  const [curbFlagThickness, setCurbFlagThickness] = useState('5');
  const [curbLength, setCurbLength] = useState('10');
  const [curbSmallUnit, setCurbSmallUnit] = useState('centimeters');
  const [curbLengthUnit, setCurbLengthUnit] = useState('meters');
  const [curbQuantity, setCurbQuantity] = useState('1');


  const calculateConcrete = (type: string) => {
    let volumeM3 = 0;

    if (type === 'slab') {
      const l = parseFloat(slabLength);
      const w = parseFloat(slabWidth);
      const h = parseFloat(slabThickness);
      const q = parseFloat(slabQuantity);
      
      const lengthM = slabLengthUnit === 'meters' ? l : l * 0.3048;
      const widthM = slabLengthUnit === 'meters' ? w : w * 0.3048;
      const heightM = slabThicknessUnit === 'centimeters' ? h / 100 : h * 0.0254;
      
      volumeM3 = lengthM * widthM * heightM * q;
    } else if (type === 'column') {
      const d = parseFloat(columnDiameter);
      const h = parseFloat(columnHeight);
      const q = parseFloat(columnQuantity);
      
      const diameterM = columnUnit === 'meters' ? d : d * 0.3048;
      const heightM = columnUnit === 'meters' ? h : h * 0.3048;
      
      volumeM3 = Math.PI * Math.pow(diameterM / 2, 2) * heightM * q;
    } else if (type === 'circular') {
      const d1 = parseFloat(circularOuter);
      const d2 = parseFloat(circularInner) || 0;
      const h = parseFloat(circularHeight);
      const q = parseFloat(circularQuantity);
      
      const outerM = circularDiameterUnit === 'meters' ? d1 : d1 * 0.3048;
      const innerM = circularDiameterUnit === 'meters' ? d2 : d2 * 0.3048;
      const heightM = circularHeightUnit === 'centimeters' ? h / 100 : h * 0.0254;
      
      const outerVol = Math.PI * Math.pow(outerM / 2, 2) * heightM;
      const innerVol = d2 > 0 ? Math.PI * Math.pow(innerM / 2, 2) * heightM : 0;
      volumeM3 = (outerVol - innerVol) * q;
    } else if (type === 'curb') {
      const depth = parseFloat(curbDepth);
      const gutter = parseFloat(curbGutterWidth);
      const height = parseFloat(curbHeight);
      const flag = parseFloat(curbFlagThickness);
      const length = parseFloat(curbLength);
      const q = parseFloat(curbQuantity);
      
      const depthM = curbSmallUnit === 'centimeters' ? depth / 100 : depth * 0.0254;
      const gutterM = curbSmallUnit === 'centimeters' ? gutter / 100 : gutter * 0.0254;
      const heightM = curbSmallUnit === 'centimeters' ? height / 100 : height * 0.0254;
      const flagM = curbSmallUnit === 'centimeters' ? flag / 100 : flag * 0.0254;
      const lengthM = curbLengthUnit === 'meters' ? length : length * 0.3048;
      
      // Curb vertical part: depth × height × length
      const curbVol = depthM * heightM * lengthM;
      // Gutter horizontal part: (depth + gutter_width) × flag_thickness × length
      // The horizontal slab covers the entire curb top plus the gutter extension
      const gutterVol = (depthM + gutterM) * flagM * lengthM;
      volumeM3 = (curbVol + gutterVol) * q;
    }

    const volumeFt3 = volumeM3 * 35.314666721;
    const volumeYd3 = volumeFt3 / 27;
    const weightKg = volumeM3 * 2130;
    const bags60lb = Math.ceil(volumeYd3 * 60);
    const bags80lb = Math.ceil(volumeYd3 * 45);

    setResult({
      volumeCubicFeet: volumeFt3,
      volumeCubicYards: volumeYd3,
      volumeCubicMeters: volumeM3,
      weightKg,
      bags60lb,
      bags80lb,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Calculator */}
        <div className="lg:col-span-2 space-y-6">
          {/* Slab Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="bg-gray-100 px-6 py-3 border-b">
              <h2 className="text-lg font-bold text-gray-900">Slabs, Square Footings, or Walls</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr,200px] gap-8">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-[140px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Length (l)</Label>
                      <input type="number" value={slabLength} onChange={(e) => setSlabLength(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <select value={slabLengthUnit} onChange={(e) => setSlabLengthUnit(e.target.value)} className="px-3 py-2 border rounded bg-white text-sm w-full">
                        <option>meters</option>
                        <option>feet</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-[140px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Width (w)</Label>
                      <input type="number" value={slabWidth} onChange={(e) => setSlabWidth(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <select value={slabLengthUnit} onChange={(e) => setSlabLengthUnit(e.target.value)} className="px-3 py-2 border rounded bg-white text-sm w-full">
                        <option>meters</option>
                        <option>feet</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-[140px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Thickness or Height (h)</Label>
                      <input type="number" value={slabThickness} onChange={(e) => setSlabThickness(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <select value={slabThicknessUnit} onChange={(e) => setSlabThicknessUnit(e.target.value)} className="px-3 py-2 border rounded bg-white text-sm w-full">
                        <option>centimeters</option>
                        <option>inches</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-[140px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Quantity</Label>
                      <input type="number" value={slabQuantity} onChange={(e) => setSlabQuantity(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <div></div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-3 pl-[152px]">
                    <Button onClick={() => calculateConcrete('slab')} className="bg-green-700 hover:bg-green-800 text-white px-8 py-2">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate
                    </Button>
                    <Button onClick={() => setResult(null)} variant="outline" className="px-8 py-2">Clear</Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <svg width="180" height="140" viewBox="0 0 180 140">
                    <defs>
                      <pattern id="dots" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="0.5" fill="#999"/>
                      </pattern>
                      <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#0066cc" />
                      </marker>
                    </defs>
                    {/* 3D box */}
                    <polygon points="30,45 110,45 130,30 50,30" fill="#e8e8e8" stroke="#333" strokeWidth="1.5"/>
                    <polygon points="30,45 30,100 110,100 110,45" fill="url(#dots)" stroke="#333" strokeWidth="1.5"/>
                    <polygon points="110,45 130,30 130,85 110,100" fill="#d0d0d0" stroke="#333" strokeWidth="1.5"/>
                    
                    {/* Length (l) annotation */}
                    <line x1="30" y1="110" x2="110" y2="110" stroke="#0066cc" strokeWidth="1.5" markerEnd="url(#arrowblue)"/>
                    <line x1="110" y1="110" x2="30" y2="110" stroke="#0066cc" strokeWidth="1.5" markerEnd="url(#arrowblue)"/>
                    <text x="70" y="125" textAnchor="middle" fontSize="13" fill="#0066cc" fontWeight="bold">l (Length)</text>
                    
                    {/* Width (w) annotation */}
                    <line x1="115" y1="100" x2="135" y2="85" stroke="#0066cc" strokeWidth="1.5" markerEnd="url(#arrowblue)"/>
                    <line x1="135" y1="85" x2="115" y2="100" stroke="#0066cc" strokeWidth="1.5" markerEnd="url(#arrowblue)"/>
                    <text x="145" y="93" fontSize="13" fill="#0066cc" fontWeight="bold">w</text>
                    <text x="140" y="105" fontSize="10" fill="#0066cc">(Width)</text>
                    
                    {/* Height (h) annotation */}
                    <line x1="18" y1="45" x2="18" y2="100" stroke="#0066cc" strokeWidth="1.5" markerEnd="url(#arrowblue)"/>
                    <line x1="18" y1="100" x2="18" y2="45" stroke="#0066cc" strokeWidth="1.5" markerEnd="url(#arrowblue)"/>
                    <text x="8" y="75" fontSize="13" fill="#0066cc" fontWeight="bold">h</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Column Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="bg-gray-100 px-6 py-3 border-b">
              <h2 className="text-lg font-bold text-gray-900">Hole, Column, or Round Footings</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr,200px] gap-8">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-[140px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Diameter (d)</Label>
                      <input type="number" value={columnDiameter} onChange={(e) => setColumnDiameter(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <select value={columnUnit} onChange={(e) => setColumnUnit(e.target.value)} className="px-3 py-2 border rounded bg-white text-sm w-full">
                        <option>meters</option>
                        <option>feet</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-[140px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Depth or Height (h)</Label>
                      <input type="number" value={columnHeight} onChange={(e) => setColumnHeight(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <select value={columnUnit} onChange={(e) => setColumnUnit(e.target.value)} className="px-3 py-2 border rounded bg-white text-sm w-full">
                        <option>meters</option>
                        <option>feet</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-[140px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Quantity</Label>
                      <input type="number" value={columnQuantity} onChange={(e) => setColumnQuantity(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <div></div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-3 pl-[152px]">
                    <Button onClick={() => calculateConcrete('column')} className="bg-green-700 hover:bg-green-800 text-white px-8 py-2">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate
                    </Button>
                    <Button onClick={() => setResult(null)} variant="outline" className="px-8 py-2">Clear</Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <svg width="180" height="140" viewBox="0 0 180 140">
                    {/* Top ellipse (dashed) */}
                    <ellipse cx="90" cy="30" rx="45" ry="14" fill="none" stroke="#333" strokeWidth="1.5" strokeDasharray="4,4"/>
                    
                    {/* Cylinder sides */}
                    <line x1="45" y1="30" x2="45" y2="100" stroke="#333" strokeWidth="1.5"/>
                    <line x1="135" y1="30" x2="135" y2="100" stroke="#333" strokeWidth="1.5"/>
                    
                    {/* Bottom ellipse (solid) */}
                    <ellipse cx="90" cy="100" rx="45" ry="14" fill="#e8e8e8" stroke="#333" strokeWidth="1.5"/>
                    
                    {/* Diameter (d) annotation */}
                    <line x1="45" y1="20" x2="135" y2="20" stroke="#0066cc" strokeWidth="1.5" markerStart="url(#arrowblue2)" markerEnd="url(#arrowblue2)"/>
                    <text x="90" y="15" textAnchor="middle" fontSize="13" fill="#0066cc" fontWeight="bold">d (Diameter)</text>
                    
                    {/* Height (h) annotation */}
                    <line x1="148" y1="30" x2="148" y2="100" stroke="#0066cc" strokeWidth="1.5" markerStart="url(#arrowblue2)" markerEnd="url(#arrowblue2)"/>
                    <text x="165" y="68" fontSize="13" fill="#0066cc" fontWeight="bold">h</text>
                    <text x="157" y="82" fontSize="10" fill="#0066cc">(Height)</text>
                    
                    <defs>
                      <marker id="arrowblue2" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#0066cc" />
                      </marker>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Circular Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="bg-gray-100 px-6 py-3 border-b">
              <h2 className="text-lg font-bold text-gray-900">Circular Slab or Tube</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr,220px] gap-8">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-[150px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Outer Diameter (d₁)</Label>
                      <input type="number" value={circularOuter} onChange={(e) => setCircularOuter(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <select value={circularDiameterUnit} onChange={(e) => setCircularDiameterUnit(e.target.value)} className="px-3 py-2 border rounded bg-white text-sm w-full">
                        <option>meters</option>
                        <option>feet</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-[150px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Inner Diameter (d₂)</Label>
                      <input type="number" value={circularInner} onChange={(e) => setCircularInner(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <select value={circularDiameterUnit} onChange={(e) => setCircularDiameterUnit(e.target.value)} className="px-3 py-2 border rounded bg-white text-sm w-full">
                        <option>meters</option>
                        <option>feet</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-[150px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Length or Height (h)</Label>
                      <input type="number" value={circularHeight} onChange={(e) => setCircularHeight(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <select value={circularHeightUnit} onChange={(e) => setCircularHeightUnit(e.target.value)} className="px-3 py-2 border rounded bg-white text-sm w-full">
                        <option>centimeters</option>
                        <option>inches</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-[150px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Quantity</Label>
                      <input type="number" value={circularQuantity} onChange={(e) => setCircularQuantity(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <div></div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-3 pl-[162px]">
                    <Button onClick={() => calculateConcrete('circular')} className="bg-green-700 hover:bg-green-800 text-white px-8 py-2">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate
                    </Button>
                    <Button onClick={() => setResult(null)} variant="outline" className="px-8 py-2">Clear</Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <svg width="200" height="140" viewBox="0 0 200 140">
                    {/* Top ellipses (dashed) */}
                    <ellipse cx="100" cy="30" rx="50" ry="14" fill="none" stroke="#333" strokeWidth="1.5" strokeDasharray="4,4"/>
                    <ellipse cx="100" cy="30" rx="32" ry="9" fill="none" stroke="#333" strokeWidth="1.5" strokeDasharray="4,4"/>
                    
                    {/* Outer cylinder sides */}
                    <line x1="50" y1="30" x2="50" y2="95" stroke="#333" strokeWidth="1.5"/>
                    <line x1="150" y1="30" x2="150" y2="95" stroke="#333" strokeWidth="1.5"/>
                    
                    {/* Inner cylinder sides (dashed) */}
                    <line x1="68" y1="30" x2="68" y2="95" stroke="#333" strokeWidth="1.5" strokeDasharray="4,4"/>
                    <line x1="132" y1="30" x2="132" y2="95" stroke="#333" strokeWidth="1.5" strokeDasharray="4,4"/>
                    
                    {/* Bottom ellipses */}
                    <ellipse cx="100" cy="95" rx="50" ry="14" fill="#e8e8e8" stroke="#333" strokeWidth="1.5"/>
                    <ellipse cx="100" cy="95" rx="32" ry="9" fill="white" stroke="#333" strokeWidth="1.5"/>
                    
                    {/* d₁ (Outer Diameter) annotation */}
                    <line x1="50" y1="18" x2="150" y2="18" stroke="#0066cc" strokeWidth="1.5" markerStart="url(#arrowblue3)" markerEnd="url(#arrowblue3)"/>
                    <text x="100" y="13" textAnchor="middle" fontSize="13" fill="#0066cc" fontWeight="bold">d₁ (Outer)</text>
                    
                    {/* d₂ (Inner Diameter) annotation */}
                    <line x1="68" y1="115" x2="132" y2="115" stroke="#0066cc" strokeWidth="1.5" markerStart="url(#arrowblue3)" markerEnd="url(#arrowblue3)"/>
                    <text x="100" y="128" textAnchor="middle" fontSize="13" fill="#0066cc" fontWeight="bold">d₂ (Inner)</text>
                    
                    {/* Height (h) annotation */}
                    <line x1="165" y1="30" x2="165" y2="95" stroke="#0066cc" strokeWidth="1.5" markerStart="url(#arrowblue3)" markerEnd="url(#arrowblue3)"/>
                    <text x="180" y="66" fontSize="13" fill="#0066cc" fontWeight="bold">h</text>
                    
                    <defs>
                      <marker id="arrowblue3" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#0066cc" />
                      </marker>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Curb Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="bg-gray-100 px-6 py-3 border-b">
              <h2 className="text-lg font-bold text-gray-900">Curb and Gutter Barrier</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr,240px] gap-8">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-[140px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Curb Depth</Label>
                      <input type="number" value={curbDepth} onChange={(e) => setCurbDepth(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <select value={curbSmallUnit} onChange={(e) => setCurbSmallUnit(e.target.value)} className="px-3 py-2 border rounded bg-white text-sm w-full">
                        <option>centimeters</option>
                        <option>inches</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-[140px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Gutter Width</Label>
                      <input type="number" value={curbGutterWidth} onChange={(e) => setCurbGutterWidth(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <select value={curbSmallUnit} onChange={(e) => setCurbSmallUnit(e.target.value)} className="px-3 py-2 border rounded bg-white text-sm w-full">
                        <option>centimeters</option>
                        <option>inches</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-[140px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Curb Height</Label>
                      <input type="number" value={curbHeight} onChange={(e) => setCurbHeight(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <select value={curbSmallUnit} onChange={(e) => setCurbSmallUnit(e.target.value)} className="px-3 py-2 border rounded bg-white text-sm w-full">
                        <option>centimeters</option>
                        <option>inches</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-[140px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Flag Thickness</Label>
                      <input type="number" value={curbFlagThickness} onChange={(e) => setCurbFlagThickness(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <select value={curbSmallUnit} onChange={(e) => setCurbSmallUnit(e.target.value)} className="px-3 py-2 border rounded bg-white text-sm w-full">
                        <option>centimeters</option>
                        <option>inches</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-[140px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Length</Label>
                      <input type="number" value={curbLength} onChange={(e) => setCurbLength(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <select value={curbLengthUnit} onChange={(e) => setCurbLengthUnit(e.target.value)} className="px-3 py-2 border rounded bg-white text-sm w-full">
                        <option>meters</option>
                        <option>feet</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-[140px,1fr,120px] gap-3 items-center">
                      <Label className="text-right text-sm font-medium">Quantity</Label>
                      <input type="number" value={curbQuantity} onChange={(e) => setCurbQuantity(e.target.value)} className="px-3 py-2 border rounded w-full" />
                      <div></div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-3 pl-[152px]">
                    <Button onClick={() => calculateConcrete('curb')} className="bg-green-700 hover:bg-green-800 text-white px-8 py-2">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate
                    </Button>
                    <Button onClick={() => setResult(null)} variant="outline" className="px-8 py-2">Clear</Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <svg width="220" height="160" viewBox="0 0 220 160">
                    <defs>
                      <marker id="arrowblue4" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#0066cc" />
                      </marker>
                    </defs>
                    
                    {/* 3D L-shape structure */}
                    {/* Front face of curb */}
                    <rect x="30" y="55" width="25" height="50" fill="#d0d0d0" stroke="#333" strokeWidth="1.5"/>
                    {/* Gutter/flag horizontal part */}
                    <rect x="55" y="90" width="90" height="15" fill="#e0e0e0" stroke="#333" strokeWidth="1.5"/>
                    
                    {/* 3D depth faces */}
                    <polygon points="30,55 50,45 75,45 55,55" fill="#b8b8b8" stroke="#333" strokeWidth="1.5"/>
                    <polygon points="55,55 75,45 75,95 55,105" fill="#c8c8c8" stroke="#333" strokeWidth="1.5"/>
                    <polygon points="55,90 145,90 165,80 75,80 75,95 55,105" fill="#d8d8d8" stroke="#333" strokeWidth="1.5"/>
                    <polygon points="145,90 165,80 165,95 145,105" fill="#c0c0c0" stroke="#333" strokeWidth="1.5"/>
                    
                    {/* Curb Depth annotation */}
                    <line x1="30" y1="45" x2="55" y2="45" stroke="#0066cc" strokeWidth="1.5" markerStart="url(#arrowblue4)" markerEnd="url(#arrowblue4)"/>
                    <text x="42" y="38" textAnchor="middle" fontSize="11" fill="#0066cc" fontWeight="bold">Curb</text>
                    <text x="42" y="50" textAnchor="middle" fontSize="11" fill="#0066cc" fontWeight="bold">Depth</text>
                    
                    {/* Gutter Width annotation */}
                    <line x1="75" y1="75" x2="165" y2="75" stroke="#0066cc" strokeWidth="1.5" markerStart="url(#arrowblue4)" markerEnd="url(#arrowblue4)"/>
                    <text x="120" y="70" textAnchor="middle" fontSize="11" fill="#0066cc" fontWeight="bold">Gutter Width</text>
                    
                    {/* Curb Height annotation */}
                    <line x1="18" y1="55" x2="18" y2="105" stroke="#0066cc" strokeWidth="1.5" markerStart="url(#arrowblue4)" markerEnd="url(#arrowblue4)"/>
                    <text x="8" y="78" fontSize="11" fill="#0066cc" fontWeight="bold">Curb</text>
                    <text x="8" y="90" fontSize="11" fill="#0066cc" fontWeight="bold">Height</text>
                    
                    {/* Flag Thickness annotation */}
                    <line x1="145" y1="90" x2="145" y2="105" stroke="#0066cc" strokeWidth="1.5" markerStart="url(#arrowblue4)" markerEnd="url(#arrowblue4)"/>
                    <text x="152" y="98" fontSize="11" fill="#0066cc" fontWeight="bold">Flag</text>
                    <text x="152" y="109" fontSize="11" fill="#0066cc" fontWeight="bold">Thickness</text>
                    
                    {/* Length annotation */}
                    <line x1="55" y1="125" x2="145" y2="125" stroke="#0066cc" strokeWidth="1.5" markerStart="url(#arrowblue4)" markerEnd="url(#arrowblue4)"/>
                    <text x="100" y="140" textAnchor="middle" fontSize="12" fill="#0066cc" fontWeight="bold">Length</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right - Results */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-20 self-start">
            {result ? (
              <>
                <div className="bg-green-700 text-white p-4 rounded-t-lg">
                  <h2 className="text-xl font-bold">Result</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-gray-700 text-sm mb-1">Volume:</p>
                    <p className="text-3xl font-bold text-gray-900">{result.volumeCubicFeet.toFixed(2)}</p>
                    <p className="text-gray-600 text-sm">cubic feet</p>
                  </div>
                  <div className="pl-4 border-l-2 border-gray-300 space-y-2">
                    <div>
                      <p className="text-gray-700 text-sm">or</p>
                      <p className="text-xl font-bold text-gray-900">{result.volumeCubicYards.toFixed(2)}</p>
                      <p className="text-gray-600 text-xs">cubic yards</p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm">or</p>
                      <p className="text-xl font-bold text-gray-900">{result.volumeCubicMeters.toFixed(2)}</p>
                      <p className="text-gray-600 text-xs">cubic meters</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-3">If using pre-mixed concrete with density of 2,130 kg/m³ or 133 lbs/ft³:</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-700 text-sm">Weight needed:</p>
                        <p className="font-semibold text-gray-900">{result.weightKg.toFixed(2)} kg</p>
                        <p className="text-xs text-gray-600">or {(result.weightKg * 2.20462).toFixed(2)} lbs</p>
                      </div>
                      <div>
                        <p className="text-gray-700 text-sm">Using 60-lb bags:</p>
                        <p className="text-2xl font-bold text-green-700">{result.bags60lb}</p>
                        <p className="text-xs text-gray-600">bags</p>
                      </div>
                      <div>
                        <p className="text-gray-700 text-sm">Using 80-lb bags:</p>
                        <p className="text-2xl font-bold text-green-700">{result.bags80lb}</p>
                        <p className="text-xs text-gray-600">bags</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 italic pt-3 border-t border-gray-200">* Different types of concrete can have very different densities.</p>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🏗️</div>
                <p className="text-gray-500">Enter dimensions and click Calculate to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
