'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Copy, Share2, Printer } from 'lucide-react';

interface DistanceResult {
  distance: number;
  formula: string;
  steps: string[];
  explanation: string;
  midpoint?: string;
  units?: string;
}

export default function DistanceCalculator() {
  const [activeTab, setActiveTab] = useState('2d');
  
  // 2D coordinates
  const [x1, setX1] = useState('');
  const [y1, setY1] = useState('');
  const [x2, setX2] = useState('');
  const [y2, setY2] = useState('');
  
  // 3D coordinates
  const [z1, setZ1] = useState('');
  const [z2, setZ2] = useState('');
  
  // Geographic coordinates
  const [lat1, setLat1] = useState('');
  const [lon1, setLon1] = useState('');
  const [lat2, setLat2] = useState('');
  const [lon2, setLon2] = useState('');
  const [geoUnit, setGeoUnit] = useState<'km' | 'mi'>('km');
  
  const [result, setResult] = useState<DistanceResult | null>(null);

  const calculate2D = () => {
    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);

    if (isNaN(x1Val) || isNaN(y1Val) || isNaN(x2Val) || isNaN(y2Val)) {
      alert('Please enter valid numbers for all coordinates.');
      return;
    }

    const dx = x2Val - x1Val;
    const dy = y2Val - y1Val;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const midX = (x1Val + x2Val) / 2;
    const midY = (y1Val + y2Val) / 2;

    setResult({
      distance,
      formula: 'd = √[(x₂-x₁)² + (y₂-y₁)²]',
      steps: [
        'Step 1: Calculate the differences',
        `Δx = x₂ - x₁ = ${x2Val} - ${x1Val} = ${dx}`,
        `Δy = y₂ - y₁ = ${y2Val} - ${y1Val} = ${dy}`,
        'Step 2: Square the differences',
        `(Δx)² = ${dx}² = ${dx * dx}`,
        `(Δy)² = ${dy}² = ${dy * dy}`,
        'Step 3: Sum the squares',
        `(Δx)² + (Δy)² = ${dx * dx} + ${dy * dy} = ${dx * dx + dy * dy}`,
        'Step 4: Take the square root',
        `d = √${dx * dx + dy * dy} = ${distance.toFixed(4)}`
      ],
      explanation: `The Euclidean distance between points (${x1Val}, ${y1Val}) and (${x2Val}, ${y2Val}) is ${distance.toFixed(4)} units.`,
      midpoint: `(${midX}, ${midY})`
    });
  };

  const calculate3D = () => {
    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const z1Val = parseFloat(z1);
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);
    const z2Val = parseFloat(z2);

    if (isNaN(x1Val) || isNaN(y1Val) || isNaN(z1Val) || isNaN(x2Val) || isNaN(y2Val) || isNaN(z2Val)) {
      alert('Please enter valid numbers for all coordinates.');
      return;
    }

    const dx = x2Val - x1Val;
    const dy = y2Val - y1Val;
    const dz = z2Val - z1Val;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const midX = (x1Val + x2Val) / 2;
    const midY = (y1Val + y2Val) / 2;
    const midZ = (z1Val + z2Val) / 2;

    setResult({
      distance,
      formula: 'd = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]',
      steps: [
        'Step 1: Calculate the differences',
        `Δx = ${x2Val} - ${x1Val} = ${dx}`,
        `Δy = ${y2Val} - ${y1Val} = ${dy}`,
        `Δz = ${z2Val} - ${z1Val} = ${dz}`,
        'Step 2: Square the differences',
        `(Δx)² = ${dx * dx}`,
        `(Δy)² = ${dy * dy}`,
        `(Δz)² = ${dz * dz}`,
        'Step 3: Sum the squares',
        `Sum = ${dx * dx} + ${dy * dy} + ${dz * dz} = ${dx * dx + dy * dy + dz * dz}`,
        'Step 4: Take the square root',
        `d = √${dx * dx + dy * dy + dz * dz} = ${distance.toFixed(4)}`
      ],
      explanation: `The 3D Euclidean distance between points (${x1Val}, ${y1Val}, ${z1Val}) and (${x2Val}, ${y2Val}, ${z2Val}) is ${distance.toFixed(4)} units.`,
      midpoint: `(${midX}, ${midY}, ${midZ})`
    });
  };

  const calculateGeographic = () => {
    const lat1Val = parseFloat(lat1);
    const lon1Val = parseFloat(lon1);
    const lat2Val = parseFloat(lat2);
    const lon2Val = parseFloat(lon2);

    if (isNaN(lat1Val) || isNaN(lon1Val) || isNaN(lat2Val) || isNaN(lon2Val)) {
      alert('Please enter valid numbers for all coordinates.');
      return;
    }

    // Haversine formula
    const R = geoUnit === 'km' ? 6371 : 3959; // Earth radius in km or miles
    const dLat = (lat2Val - lat1Val) * Math.PI / 180;
    const dLon = (lon2Val - lon1Val) * Math.PI / 180;
    const lat1Rad = lat1Val * Math.PI / 180;
    const lat2Rad = lat2Val * Math.PI / 180;

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;

    setResult({
      distance,
      formula: 'Haversine Formula',
      steps: [
        'Step 1: Convert coordinates to radians',
        `φ₁ = ${lat1Val}° = ${lat1Rad.toFixed(6)} rad`,
        `φ₂ = ${lat2Val}° = ${lat2Rad.toFixed(6)} rad`,
        `Δφ = ${dLat.toFixed(6)} rad`,
        `Δλ = ${dLon.toFixed(6)} rad`,
        'Step 2: Calculate Haversine',
        `a = sin²(Δφ/2) + cos(φ₁)·cos(φ₂)·sin²(Δλ/2)`,
        `a = ${a.toFixed(6)}`,
        'Step 3: Calculate angular distance',
        `c = 2·atan2(√a, √(1-a)) = ${c.toFixed(6)}`,
        'Step 4: Calculate distance',
        `d = R × c = ${R} × ${c.toFixed(6)} = ${distance.toFixed(2)} ${geoUnit}`
      ],
      explanation: `The great-circle distance between (${lat1Val}°, ${lon1Val}°) and (${lat2Val}°, ${lon2Val}°) is ${distance.toFixed(2)} ${geoUnit}.`,
      units: geoUnit
    });
  };

  const calculateManhattan = () => {
    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);

    if (isNaN(x1Val) || isNaN(y1Val) || isNaN(x2Val) || isNaN(y2Val)) {
      alert('Please enter valid numbers for all coordinates.');
      return;
    }

    const dx = Math.abs(x2Val - x1Val);
    const dy = Math.abs(y2Val - y1Val);
    const distance = dx + dy;

    setResult({
      distance,
      formula: 'd = |x₂-x₁| + |y₂-y₁|',
      steps: [
        'Step 1: Calculate absolute differences',
        `|x₂-x₁| = |${x2Val} - ${x1Val}| = ${dx}`,
        `|y₂-y₁| = |${y2Val} - ${y1Val}| = ${dy}`,
        'Step 2: Sum the absolute differences',
        `d = ${dx} + ${dy} = ${distance}`
      ],
      explanation: `The Manhattan distance (taxicab distance) between (${x1Val}, ${y1Val}) and (${x2Val}, ${y2Val}) is ${distance} units. This represents the distance if you can only move horizontally and vertically.`
    });
  };

  const handleCalculate = () => {
    switch (activeTab) {
      case '2d':
        calculate2D();
        break;
      case '3d':
        calculate3D();
        break;
      case 'geographic':
        calculateGeographic();
        break;
      case 'manhattan':
        calculateManhattan();
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
          title: 'Distance Calculator',
          text: 'Check out this Distance Calculator!',
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
                <TabsList className="grid w-full grid-cols-2 gap-2 h-auto bg-transparent p-0">
                  <TabsTrigger 
                    value="2d" 
                    className="py-2 px-2 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    2D Distance
                  </TabsTrigger>
                  <TabsTrigger 
                    value="3d" 
                    className="py-2 px-2 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    3D Distance
                  </TabsTrigger>
                </TabsList>
                <TabsList className="grid w-full grid-cols-2 gap-2 h-auto bg-transparent p-0 mt-2">
                  <TabsTrigger 
                    value="geographic" 
                    className="py-2 px-2 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Geographic
                  </TabsTrigger>
                  <TabsTrigger 
                    value="manhattan" 
                    className="py-2 px-2 text-xs font-semibold rounded-lg bg-white text-gray-600 border border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Manhattan
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6">
              {(activeTab === '2d' || activeTab === 'manhattan') && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Point 1 (x₁, y₁):</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="x1" className="text-xs">x₁</Label>
                        <input
                          id="x1"
                          type="number"
                          value={x1}
                          onChange={(e) => setX1(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="0"
                          step="any"
                        />
                      </div>
                      <div>
                        <Label htmlFor="y1" className="text-xs">y₁</Label>
                        <input
                          id="y1"
                          type="number"
                          value={y1}
                          onChange={(e) => setY1(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="0"
                          step="any"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Point 2 (x₂, y₂):</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="x2" className="text-xs">x₂</Label>
                        <input
                          id="x2"
                          type="number"
                          value={x2}
                          onChange={(e) => setX2(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="0"
                          step="any"
                        />
                      </div>
                      <div>
                        <Label htmlFor="y2" className="text-xs">y₂</Label>
                        <input
                          id="y2"
                          type="number"
                          value={y2}
                          onChange={(e) => setY2(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="0"
                          step="any"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '3d' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Point 1 (x₁, y₁, z₁):</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label htmlFor="x1-3d" className="text-xs">x₁</Label>
                        <input
                          id="x1-3d"
                          type="number"
                          value={x1}
                          onChange={(e) => setX1(e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="0"
                          step="any"
                        />
                      </div>
                      <div>
                        <Label htmlFor="y1-3d" className="text-xs">y₁</Label>
                        <input
                          id="y1-3d"
                          type="number"
                          value={y1}
                          onChange={(e) => setY1(e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="0"
                          step="any"
                        />
                      </div>
                      <div>
                        <Label htmlFor="z1" className="text-xs">z₁</Label>
                        <input
                          id="z1"
                          type="number"
                          value={z1}
                          onChange={(e) => setZ1(e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="0"
                          step="any"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Point 2 (x₂, y₂, z₂):</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label htmlFor="x2-3d" className="text-xs">x₂</Label>
                        <input
                          id="x2-3d"
                          type="number"
                          value={x2}
                          onChange={(e) => setX2(e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="0"
                          step="any"
                        />
                      </div>
                      <div>
                        <Label htmlFor="y2-3d" className="text-xs">y₂</Label>
                        <input
                          id="y2-3d"
                          type="number"
                          value={y2}
                          onChange={(e) => setY2(e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="0"
                          step="any"
                        />
                      </div>
                      <div>
                        <Label htmlFor="z2" className="text-xs">z₂</Label>
                        <input
                          id="z2"
                          type="number"
                          value={z2}
                          onChange={(e) => setZ2(e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="0"
                          step="any"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'geographic' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Unit</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setGeoUnit('km')}
                        className={`py-2 px-4 rounded-lg border-2 transition-all text-sm ${
                          geoUnit === 'km'
                            ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        Kilometers
                      </button>
                      <button
                        onClick={() => setGeoUnit('mi')}
                        className={`py-2 px-4 rounded-lg border-2 transition-all text-sm ${
                          geoUnit === 'mi'
                            ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        Miles
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Location 1:</p>
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="lat1" className="text-xs">Latitude</Label>
                        <input
                          id="lat1"
                          type="number"
                          value={lat1}
                          onChange={(e) => setLat1(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="e.g., 40.7128"
                          step="any"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lon1" className="text-xs">Longitude</Label>
                        <input
                          id="lon1"
                          type="number"
                          value={lon1}
                          onChange={(e) => setLon1(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="e.g., -74.0060"
                          step="any"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Location 2:</p>
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="lat2" className="text-xs">Latitude</Label>
                        <input
                          id="lat2"
                          type="number"
                          value={lat2}
                          onChange={(e) => setLat2(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="e.g., 34.0522"
                          step="any"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lon2" className="text-xs">Longitude</Label>
                        <input
                          id="lon2"
                          type="number"
                          value={lon2}
                          onChange={(e) => setLon2(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="e.g., -118.2437"
                          step="any"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleCalculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] mt-4"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Distance
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right: Results Area (2 columns) */}
        <div className="xl:col-span-2">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl">Distance Result</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result && (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg border-2 border-blue-400 p-4">
                    <p className="text-sm text-gray-600 mb-2">Distance:</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl sm:text-3xl font-bold text-blue-700 break-all">
                        {result.distance.toFixed(4)} {result.units || 'units'}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(result.distance.toFixed(4))}
                        className="flex-shrink-0 ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {result.midpoint && (
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-600 mb-2">Midpoint:</p>
                      <p className="font-mono text-lg font-bold text-gray-900">
                        {result.midpoint}
                      </p>
                    </div>
                  )}

                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-2">Formula:</p>
                    <p className="font-mono text-base text-gray-900">
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
                    <p className="text-lg">Enter coordinates and click Calculate</p>
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
          <CardTitle className="text-xl">Distance Formulas Reference</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2D Euclidean Distance</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">d = √[(x₂-x₁)² + (y₂-y₁)²]</p>
                <p className="text-gray-700">Distance between two points in a plane</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    (0,0) to (3,4)<br />
                    d = √(9 + 16) = 5 units
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3D Euclidean Distance</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">d = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]</p>
                <p className="text-gray-700">Distance between two points in space</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    (0,0,0) to (1,2,2)<br />
                    d = √(1 + 4 + 4) = 3 units
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Manhattan Distance</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-lg">d = |x₂-x₁| + |y₂-y₁|</p>
                <p className="text-gray-700">Grid-based distance (taxicab)</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    (0,0) to (3,4)<br />
                    d = 3 + 4 = 7 units
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Geographic Distance</h3>
              <div className="space-y-2 text-sm">
                <p className="font-mono text-base">Haversine Formula</p>
                <p className="text-gray-700">Great-circle distance on Earth</p>
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <p className="font-semibold mb-1">Example:</p>
                  <p className="font-mono text-xs">
                    NYC to LA<br />
                    ≈ 3,944 km or 2,451 mi
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

