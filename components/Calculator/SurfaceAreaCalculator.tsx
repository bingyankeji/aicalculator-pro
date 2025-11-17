'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Copy, Share2, Printer } from 'lucide-react';

interface SurfaceAreaResult {
  surfaceArea: number;
  formula: string;
  steps: string[];
  explanation: string;
}

export default function SurfaceAreaCalculator() {
  const [activeTab, setActiveTab] = useState('cube');
  
  // Common dimensions
  const [side, setSide] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [radius, setRadius] = useState('');
  const [slantHeight, setSlantHeight] = useState('');
  
  const [result, setResult] = useState<SurfaceAreaResult | null>(null);

  const calculateCube = () => {
    const a = parseFloat(side);
    if (isNaN(a) || a <= 0) {
      alert('Please enter a valid positive number for side length.');
      return;
    }

    const surfaceArea = 6 * a * a;
    setResult({
      surfaceArea,
      formula: 'SA = 6a²',
      steps: [
        'Step 1: Use the cube surface area formula',
        `SA = 6a²`,
        `Step 2: Substitute a = ${a}`,
        `SA = 6 × ${a}² = 6 × ${a * a}`,
        `Step 3: Calculate the result`,
        `SA = ${surfaceArea} square units`
      ],
      explanation: `A cube has 6 identical square faces. Each face has an area of a². Therefore, the total surface area is 6a² = ${surfaceArea} square units.`
    });
  };

  const calculateRectangularPrism = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    
    if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) {
      alert('Please enter valid positive numbers for all dimensions.');
      return;
    }

    const surfaceArea = 2 * (l * w + l * h + w * h);
    setResult({
      surfaceArea,
      formula: 'SA = 2(lw + lh + wh)',
      steps: [
        'Step 1: Use the rectangular prism surface area formula',
        `SA = 2(lw + lh + wh)`,
        `Step 2: Substitute l = ${l}, w = ${w}, h = ${h}`,
        `SA = 2(${l} × ${w} + ${l} × ${h} + ${w} × ${h})`,
        `SA = 2(${l * w} + ${l * h} + ${w * h})`,
        `SA = 2(${l * w + l * h + w * h})`,
        `Step 3: Calculate the result`,
        `SA = ${surfaceArea} square units`
      ],
      explanation: `A rectangular prism has 6 faces: 2 faces of area lw, 2 faces of area lh, and 2 faces of area wh. The total surface area is 2(lw + lh + wh) = ${surfaceArea} square units.`
    });
  };

  const calculateSphere = () => {
    const r = parseFloat(radius);
    if (isNaN(r) || r <= 0) {
      alert('Please enter a valid positive number for radius.');
      return;
    }

    const surfaceArea = 4 * Math.PI * r * r;
    setResult({
      surfaceArea,
      formula: 'SA = 4πr²',
      steps: [
        'Step 1: Use the sphere surface area formula',
        `SA = 4πr²`,
        `Step 2: Substitute r = ${r}`,
        `SA = 4 × π × ${r}²`,
        `SA = 4 × π × ${r * r}`,
        `Step 3: Calculate the result`,
        `SA = 4 × ${Math.PI.toFixed(4)} × ${r * r}`,
        `SA = ${surfaceArea.toFixed(2)} square units`
      ],
      explanation: `A sphere has a surface area of 4πr². With radius ${r}, the surface area is ${surfaceArea.toFixed(2)} square units.`
    });
  };

  const calculateCylinder = () => {
    const r = parseFloat(radius);
    const h = parseFloat(height);
    
    if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) {
      alert('Please enter valid positive numbers for radius and height.');
      return;
    }

    const surfaceArea = 2 * Math.PI * r * (r + h);
    setResult({
      surfaceArea,
      formula: 'SA = 2πr(r + h)',
      steps: [
        'Step 1: Use the cylinder surface area formula',
        `SA = 2πr(r + h) = 2πr² + 2πrh`,
        `Step 2: Substitute r = ${r}, h = ${h}`,
        `SA = 2 × π × ${r} × (${r} + ${h})`,
        `SA = 2 × π × ${r} × ${r + h}`,
        `Step 3: Calculate the result`,
        `SA = 2 × ${Math.PI.toFixed(4)} × ${r} × ${r + h}`,
        `SA = ${surfaceArea.toFixed(2)} square units`
      ],
      explanation: `A cylinder has two circular bases (area πr² each) and a curved surface (area 2πrh). The total surface area is 2πr² + 2πrh = 2πr(r + h) = ${surfaceArea.toFixed(2)} square units.`
    });
  };

  const calculateCone = () => {
    const r = parseFloat(radius);
    const l = parseFloat(slantHeight);
    
    if (isNaN(r) || isNaN(l) || r <= 0 || l <= 0) {
      alert('Please enter valid positive numbers for radius and slant height.');
      return;
    }

    const surfaceArea = Math.PI * r * (r + l);
    setResult({
      surfaceArea,
      formula: 'SA = πr(r + l)',
      steps: [
        'Step 1: Use the cone surface area formula',
        `SA = πr(r + l) = πr² + πrl`,
        `Step 2: Substitute r = ${r}, l = ${l}`,
        `SA = π × ${r} × (${r} + ${l})`,
        `SA = π × ${r} × ${r + l}`,
        `Step 3: Calculate the result`,
        `SA = ${Math.PI.toFixed(4)} × ${r} × ${r + l}`,
        `SA = ${surfaceArea.toFixed(2)} square units`
      ],
      explanation: `A cone has a circular base (area πr²) and a curved surface (area πrl, where l is the slant height). The total surface area is πr² + πrl = πr(r + l) = ${surfaceArea.toFixed(2)} square units.`
    });
  };

  const calculatePyramid = () => {
    const b = parseFloat(side);
    const l = parseFloat(slantHeight);
    
    if (isNaN(b) || isNaN(l) || b <= 0 || l <= 0) {
      alert('Please enter valid positive numbers for base side and slant height.');
      return;
    }

    const surfaceArea = b * b + 2 * b * l;
    setResult({
      surfaceArea,
      formula: 'SA = b² + 2bl',
      steps: [
        'Step 1: Use the square pyramid surface area formula',
        `SA = b² + 2bl`,
        `where b is the base side length and l is the slant height`,
        `Step 2: Substitute b = ${b}, l = ${l}`,
        `SA = ${b}² + 2 × ${b} × ${l}`,
        `SA = ${b * b} + ${2 * b * l}`,
        `Step 3: Calculate the result`,
        `SA = ${surfaceArea} square units`
      ],
      explanation: `A square pyramid has a square base (area b²) and 4 triangular faces (total area 2bl). The total surface area is b² + 2bl = ${surfaceArea} square units.`
    });
  };

  const handleCalculate = () => {
    switch (activeTab) {
      case 'cube':
        calculateCube();
        break;
      case 'rectangular':
        calculateRectangularPrism();
        break;
      case 'sphere':
        calculateSphere();
        break;
      case 'cylinder':
        calculateCylinder();
        break;
      case 'cone':
        calculateCone();
        break;
      case 'pyramid':
        calculatePyramid();
        break;
    }
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
          title: 'Surface Area Calculator',
          text: 'Check out this Surface Area Calculator!',
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
                <TabsList className="grid w-full grid-cols-3 gap-2 h-auto bg-transparent p-0">
                  <TabsTrigger 
                    value="cube" 
                    className="py-2 px-2 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Cube
                  </TabsTrigger>
                  <TabsTrigger 
                    value="rectangular" 
                    className="py-2 px-2 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Rectangle
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sphere" 
                    className="py-2 px-2 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Sphere
                  </TabsTrigger>
                </TabsList>
                <TabsList className="grid w-full grid-cols-3 gap-2 h-auto bg-transparent p-0 mt-2">
                  <TabsTrigger 
                    value="cylinder" 
                    className="py-2 px-2 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Cylinder
                  </TabsTrigger>
                  <TabsTrigger 
                    value="cone" 
                    className="py-2 px-2 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Cone
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pyramid" 
                    className="py-2 px-2 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Pyramid
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6">
              {activeTab === 'cube' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="side" className="text-sm font-medium">
                      Side Length (a) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="side"
                      type="number"
                      value={side}
                      onChange={(e) => setSide(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 5"
                      min="0"
                      step="any"
                      required
                    />
                    <p className="text-xs text-gray-500">Length of one side of the cube</p>
                  </div>
                </div>
              )}

              {activeTab === 'rectangular' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="length" className="text-sm font-medium">
                      Length (l) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="length"
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 10"
                      min="0"
                      step="any"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width" className="text-sm font-medium">
                      Width (w) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="width"
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 5"
                      min="0"
                      step="any"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height-rect" className="text-sm font-medium">
                      Height (h) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="height-rect"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 3"
                      min="0"
                      step="any"
                      required
                    />
                  </div>
                </div>
              )}

              {activeTab === 'sphere' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="radius-sphere" className="text-sm font-medium">
                      Radius (r) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="radius-sphere"
                      type="number"
                      value={radius}
                      onChange={(e) => setRadius(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 7"
                      min="0"
                      step="any"
                      required
                    />
                    <p className="text-xs text-gray-500">Distance from center to surface</p>
                  </div>
                </div>
              )}

              {activeTab === 'cylinder' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="radius-cylinder" className="text-sm font-medium">
                      Radius (r) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="radius-cylinder"
                      type="number"
                      value={radius}
                      onChange={(e) => setRadius(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 3"
                      min="0"
                      step="any"
                      required
                    />
                    <p className="text-xs text-gray-500">Radius of the circular base</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height-cylinder" className="text-sm font-medium">
                      Height (h) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="height-cylinder"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 10"
                      min="0"
                      step="any"
                      required
                    />
                    <p className="text-xs text-gray-500">Height of the cylinder</p>
                  </div>
                </div>
              )}

              {activeTab === 'cone' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="radius-cone" className="text-sm font-medium">
                      Base Radius (r) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="radius-cone"
                      type="number"
                      value={radius}
                      onChange={(e) => setRadius(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 4"
                      min="0"
                      step="any"
                      required
                    />
                    <p className="text-xs text-gray-500">Radius of the circular base</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slant-cone" className="text-sm font-medium">
                      Slant Height (l) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="slant-cone"
                      type="number"
                      value={slantHeight}
                      onChange={(e) => setSlantHeight(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 8"
                      min="0"
                      step="any"
                      required
                    />
                    <p className="text-xs text-gray-500">Distance from base edge to apex</p>
                  </div>
                </div>
              )}

              {activeTab === 'pyramid' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="side-pyramid" className="text-sm font-medium">
                      Base Side (b) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="side-pyramid"
                      type="number"
                      value={side}
                      onChange={(e) => setSide(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 6"
                      min="0"
                      step="any"
                      required
                    />
                    <p className="text-xs text-gray-500">Length of one side of the square base</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slant-pyramid" className="text-sm font-medium">
                      Slant Height (l) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="slant-pyramid"
                      type="number"
                      value={slantHeight}
                      onChange={(e) => setSlantHeight(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 8"
                      min="0"
                      step="any"
                      required
                    />
                    <p className="text-xs text-gray-500">Slant height of triangular face</p>
                  </div>
                </div>
              )}

              <Button
                onClick={handleCalculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] mt-4"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Surface Area
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right: Results Area (2 columns) */}
        <div className="xl:col-span-2">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl">Surface Area Result</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result && (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg border-2 border-blue-400 p-4">
                    <p className="text-sm text-gray-600 mb-2">Surface Area:</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl sm:text-3xl font-bold text-blue-700 break-all">
                        {result.surfaceArea.toFixed(2)} units²
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(result.surfaceArea.toFixed(2))}
                        className="flex-shrink-0 ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-2">Formula:</p>
                    <p className="font-mono text-lg font-bold text-gray-900">
                      {result.formula}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Explanation:</p>
                    <p className="text-sm text-gray-700">{result.explanation}</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Step-by-Step:</p>
                    <ol className="space-y-2">
                      {result.steps.map((step, index) => (
                        <li key={index} className="text-sm text-gray-700 font-mono">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

              {!result && (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center text-gray-500">
                    <Calculator className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Select a shape and enter dimensions to calculate</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Reference */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardTitle className="text-xl">Surface Area Formulas Reference</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Cube</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">SA = 6a²</p>
                <p className="text-gray-700">Where a is the side length</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    Side = 5<br />
                    SA = 6 × 5² = 150 units²
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Rectangular Prism</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">SA = 2(lw + lh + wh)</p>
                <p className="text-gray-700">Where l, w, h are dimensions</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    l=10, w=5, h=3<br />
                    SA = 2(50+30+15) = 190 units²
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Sphere</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">SA = 4πr²</p>
                <p className="text-gray-700">Where r is the radius</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    Radius = 7<br />
                    SA = 4π × 7² ≈ 615.75 units²
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Cylinder</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">SA = 2πr(r + h)</p>
                <p className="text-gray-700">Where r is radius, h is height</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    r=3, h=10<br />
                    SA = 2π×3×13 ≈ 245.04 units²
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Cone</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">SA = πr(r + l)</p>
                <p className="text-gray-700">Where r is radius, l is slant height</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    r=4, l=8<br />
                    SA = π×4×12 ≈ 150.80 units²
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Square Pyramid</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">SA = b² + 2bl</p>
                <p className="text-gray-700">Where b is base side, l is slant height</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    b=6, l=8<br />
                    SA = 36 + 96 = 132 units²
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

