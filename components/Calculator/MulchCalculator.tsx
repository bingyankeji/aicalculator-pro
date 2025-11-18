'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, Plus, Trash2, AlertCircle, Info } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface MulchArea {
  id: string;
  name: string;
  shape: 'rectangle' | 'circle' | 'triangle';
  length?: number;
  width?: number;
  radius?: number;
  base?: number;
  height?: number;
  area: number;
}

interface MulchMaterial {
  name: string;
  type: 'wood-chips' | 'bark' | 'rubber' | 'stone' | 'straw' | 'cocoa';
  pricePerCubicYard: number;
  weightPerCubicYard: number;
  description: string;
  pros: string[];
  cons: string[];
  lifespan: string;
  bestFor: string[];
}

const MULCH_MATERIALS: MulchMaterial[] = [
  {
    name: 'Wood Chips',
    type: 'wood-chips',
    pricePerCubicYard: 35,
    weightPerCubicYard: 600,
    description: 'Shredded wood from trees, available in various colors',
    pros: ['Affordable', 'Natural appearance', 'Good moisture retention', 'Decomposes to enrich soil'],
    cons: ['Needs annual replenishment', 'Can attract termites', 'May rob nitrogen from soil initially'],
    lifespan: '1-2 years',
    bestFor: ['Garden beds', 'Around trees', 'General landscaping', 'Slopes (stays in place)'],
  },
  {
    name: 'Bark Mulch',
    type: 'bark',
    pricePerCubicYard: 45,
    weightPerCubicYard: 400,
    description: 'Shredded or chipped tree bark, longer lasting than wood chips',
    pros: ['Long-lasting', 'Attractive appearance', 'Excellent weed suppression', 'Stays in place'],
    cons: ['More expensive', 'Slower to decompose', 'Can float in heavy rain'],
    lifespan: '2-3 years',
    bestFor: ['Flower beds', 'Around shrubs', 'Decorative areas', 'High-visibility zones'],
  },
  {
    name: 'Rubber Mulch',
    type: 'rubber',
    pricePerCubicYard: 85,
    weightPerCubicYard: 1100,
    description: 'Recycled rubber from tires, highly durable',
    pros: ['Lasts 10+ years', 'No decomposition', 'Excellent safety cushion', 'No pests'],
    cons: ['Expensive', 'Not natural', 'Can heat up in sun', 'Does not enrich soil'],
    lifespan: '10+ years',
    bestFor: ['Playgrounds', 'High-traffic areas', 'Under swing sets', 'Commercial spaces'],
  },
  {
    name: 'Stone/Rock',
    type: 'stone',
    pricePerCubicYard: 60,
    weightPerCubicYard: 2700,
    description: 'River rock, pea gravel, or decorative stone',
    pros: ['Permanent', 'No decomposition', 'Modern look', 'No maintenance'],
    cons: ['Expensive', 'Hard to remove', 'Heats up soil', 'No soil enrichment'],
    lifespan: 'Permanent',
    bestFor: ['Modern landscapes', 'Around AC units', 'Xeriscape gardens', 'Pathways'],
  },
  {
    name: 'Straw',
    type: 'straw',
    pricePerCubicYard: 25,
    weightPerCubicYard: 200,
    description: 'Dried grass stems, lightweight and affordable',
    pros: ['Very affordable', 'Lightweight', 'Great for vegetable gardens', 'Easy to spread'],
    cons: ['Short lifespan', 'Can blow away', 'May contain weed seeds', 'Less attractive'],
    lifespan: '1 season',
    bestFor: ['Vegetable gardens', 'Annual beds', 'Temporary coverage', 'Winter protection'],
  },
  {
    name: 'Cocoa Hulls',
    type: 'cocoa',
    pricePerCubicYard: 75,
    weightPerCubicYard: 300,
    description: 'Byproduct of chocolate production, dark brown color',
    pros: ['Chocolate aroma', 'Rich color', 'Fine texture', 'Good for acid-loving plants'],
    cons: ['Expensive', 'Can blow away', 'Toxic to dogs', 'Prone to mold'],
    lifespan: '1 year',
    bestFor: ['Flower beds', 'Around azaleas/rhododendrons', 'Decorative areas', 'Small gardens'],
  },
];

export default function MulchCalculator() {
  const [areas, setAreas] = useState<MulchArea[]>([]);
  const [currentArea, setCurrentArea] = useState({
    name: '',
    shape: 'rectangle' as 'rectangle' | 'circle' | 'triangle',
    length: '',
    width: '',
    radius: '',
    base: '',
    height: '',
  });
  const [depth, setDepth] = useState('3');
  const [depthUnit, setDepthUnit] = useState<'inches' | 'cm'>('inches');
  const [selectedMaterial, setSelectedMaterial] = useState<MulchMaterial>(MULCH_MATERIALS[0]);
  const [customPrice, setCustomPrice] = useState('');
  const [useCustomPrice, setUseCustomPrice] = useState(false);
  
  const [result, setResult] = useState<{
    totalArea: number;
    totalVolumeCubicYards: number;
    totalVolumeCubicMeters: number;
    totalVolumeCubicFeet: number;
    totalBags: number;
    totalCost: number;
    totalWeight: number;
    areasBreakdown: { name: string; area: number; volume: number }[];
  } | null>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);
  
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/mulch-calculator',
    getShareParams: () => ({
      d: depth,
      t: selectedMaterial.type,
    }),
    getShareText: () => {
      if (result) {
        return `Mulch needed: ${result.totalVolumeCubicYards.toFixed(2)} cubic yards for ${result.totalArea.toFixed(0)} sq ft`;
      }
      return 'Calculate mulch needed for your garden!';
    },
  });

  const calculateArea = (): number => {
    const { shape, length, width, radius, base, height } = currentArea;
    
    switch (shape) {
      case 'rectangle':
        const l = parseFloat(length);
        const w = parseFloat(width);
        if (l && w) return l * w;
        break;
      case 'circle':
        const r = parseFloat(radius);
        if (r) return Math.PI * r * r;
        break;
      case 'triangle':
        const b = parseFloat(base);
        const h = parseFloat(height);
        if (b && h) return (b * h) / 2;
        break;
    }
    return 0;
  };

  const handleAddArea = () => {
    const area = calculateArea();
    
    if (area <= 0) {
      alert('Please enter valid dimensions for the area.');
      return;
    }
    
    if (!currentArea.name.trim()) {
      alert('Please enter a name for this area.');
      return;
    }
    
    const newArea: MulchArea = {
      id: Date.now().toString(),
      name: currentArea.name,
      shape: currentArea.shape,
      length: currentArea.length ? parseFloat(currentArea.length) : undefined,
      width: currentArea.width ? parseFloat(currentArea.width) : undefined,
      radius: currentArea.radius ? parseFloat(currentArea.radius) : undefined,
      base: currentArea.base ? parseFloat(currentArea.base) : undefined,
      height: currentArea.height ? parseFloat(currentArea.height) : undefined,
      area,
    };
    
    setAreas([...areas, newArea]);
    setCurrentArea({
      name: '',
      shape: 'rectangle',
      length: '',
      width: '',
      radius: '',
      base: '',
      height: '',
    });
  };

  const handleDeleteArea = (id: string) => {
    setAreas(areas.filter(a => a.id !== id));
  };

  const handleCalculate = () => {
    if (areas.length === 0) {
      alert('Please add at least one area.');
      return;
    }
    
    const d = parseFloat(depth);
    if (!d || d <= 0) {
      alert('Please enter a valid depth.');
      return;
    }
    
    // Convert depth to feet
    const depthInFeet = depthUnit === 'inches' ? d / 12 : (d / 100) / 0.3048;
    
    // Calculate totals
    const totalArea = areas.reduce((sum, area) => sum + area.area, 0);
    const totalVolumeCubicFeet = totalArea * depthInFeet;
    const totalVolumeCubicYards = totalVolumeCubicFeet / 27; // 1 cubic yard = 27 cubic feet
    const totalVolumeCubicMeters = totalVolumeCubicYards * 0.764555; // 1 cubic yard = 0.764555 cubic meters
    
    // Calculate bags (assuming 2 cubic feet per bag)
    const totalBags = Math.ceil(totalVolumeCubicFeet / 2);
    
    // Calculate cost
    const pricePerYard = useCustomPrice && customPrice ? parseFloat(customPrice) : selectedMaterial.pricePerCubicYard;
    const totalCost = totalVolumeCubicYards * pricePerYard;
    
    // Calculate weight
    const totalWeight = totalVolumeCubicYards * selectedMaterial.weightPerCubicYard;
    
    // Areas breakdown
    const areasBreakdown = areas.map(area => ({
      name: area.name,
      area: area.area,
      volume: (area.area * depthInFeet) / 27,
    }));
    
    setResult({
      totalArea,
      totalVolumeCubicYards,
      totalVolumeCubicMeters,
      totalVolumeCubicFeet,
      totalBags,
      totalCost,
      totalWeight,
      areasBreakdown,
    });
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `mulch-calculation-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
              <title>Mulch Calculation</title>
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

  const getDepthRecommendation = () => {
    const d = parseFloat(depth);
    const unit = depthUnit;
    const inInches = unit === 'inches' ? d : d / 2.54;
    
    if (inInches < 2) return { text: 'Too thin - will not suppress weeds effectively', color: 'text-red-700' };
    if (inInches < 3) return { text: 'Minimum acceptable for weed control', color: 'text-amber-700' };
    if (inInches <= 4) return { text: 'Ideal depth for most applications', color: 'text-green-700' };
    if (inInches <= 6) return { text: 'Good for high-traffic areas', color: 'text-blue-700' };
    return { text: 'May be too deep - can suffocate plant roots', color: 'text-red-700' };
  };

  const CHART_COLORS = ['#1e40af', '#059669', '#0891b2', '#dc2626', '#7c3aed', '#ea580c'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          {/* Add Area Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Add Coverage Area</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Area Name */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Area Name <span className="text-red-500">*</span>
                </Label>
                <input
                  type="text"
                  value={currentArea.name}
                  onChange={(e) => setCurrentArea({ ...currentArea, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Front garden"
                />
              </div>

              {/* Shape Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Area Shape <span className="text-red-500">*</span>
                </Label>
                <select
                  value={currentArea.shape}
                  onChange={(e) => setCurrentArea({ ...currentArea, shape: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="rectangle">Rectangle</option>
                  <option value="circle">Circle</option>
                  <option value="triangle">Triangle</option>
                </select>
              </div>

              {/* Dimensions based on shape */}
              {currentArea.shape === 'rectangle' && (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Length (ft) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      type="number"
                      step="0.1"
                      value={currentArea.length}
                      onChange={(e) => setCurrentArea({ ...currentArea, length: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Width (ft) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      type="number"
                      step="0.1"
                      value={currentArea.width}
                      onChange={(e) => setCurrentArea({ ...currentArea, width: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="10"
                    />
                  </div>
                </>
              )}

              {currentArea.shape === 'circle' && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Radius (ft) <span className="text-red-500">*</span>
                  </Label>
                  <input
                    type="number"
                    step="0.1"
                    value={currentArea.radius}
                    onChange={(e) => setCurrentArea({ ...currentArea, radius: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="5"
                  />
                  <p className="text-xs text-gray-500">Radius is half the diameter</p>
                </div>
              )}

              {currentArea.shape === 'triangle' && (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Base (ft) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      type="number"
                      step="0.1"
                      value={currentArea.base}
                      onChange={(e) => setCurrentArea({ ...currentArea, base: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="15"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Height (ft) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      type="number"
                      step="0.1"
                      value={currentArea.height}
                      onChange={(e) => setCurrentArea({ ...currentArea, height: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="10"
                    />
                  </div>
                </>
              )}

              <Button 
                onClick={handleAddArea}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 min-h-[44px]"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Area
              </Button>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Mulch Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Depth */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Mulch Depth <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.5"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="3"
                  />
                  <select
                    value={depthUnit}
                    onChange={(e) => setDepthUnit(e.target.value as 'inches' | 'cm')}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="inches">inches</option>
                    <option value="cm">cm</option>
                  </select>
                </div>
                {depth && (
                  <p className={`text-xs ${getDepthRecommendation().color}`}>
                    {getDepthRecommendation().text}
                  </p>
                )}
              </div>

              {/* Material Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Mulch Material
                </Label>
                <select
                  value={selectedMaterial.type}
                  onChange={(e) => {
                    const material = MULCH_MATERIALS.find(m => m.type === e.target.value);
                    if (material) setSelectedMaterial(material);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {MULCH_MATERIALS.map((material) => (
                    <option key={material.type} value={material.type}>
                      {material.name} - ${material.pricePerCubicYard}/yd³
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-600">{selectedMaterial.description}</p>
              </div>

              {/* Custom Price */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="useCustomPrice"
                  checked={useCustomPrice}
                  onChange={(e) => setUseCustomPrice(e.target.checked)}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="useCustomPrice" className="text-sm text-gray-700">
                  Use custom price per cubic yard
                </label>
              </div>

              {useCustomPrice && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Custom Price per Cubic Yard
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="50.00"
                    />
                  </div>
                </div>
              )}

              <Button 
                onClick={handleCalculate}
                disabled={areas.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Mulch Needed
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6" ref={resultRef}>
          {/* Areas List */}
          {areas.length > 0 && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Areas to Cover ({areas.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3">
                  {areas.map((area) => (
                    <div key={area.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{area.name}</h4>
                        <p className="text-sm text-gray-600">
                          {area.shape === 'rectangle' && `${area.length}' × ${area.width}'`}
                          {area.shape === 'circle' && `Radius: ${area.radius}'`}
                          {area.shape === 'triangle' && `Base: ${area.base}', Height: ${area.height}'`}
                          {' '}- <span className="font-semibold">{area.area.toFixed(1)} sq ft</span>
                        </p>
                      </div>
                      <Button
                        onClick={() => handleDeleteArea(area.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {result ? (
            <>
              {/* Main Results */}
              <Card className="shadow-lg border-2 border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Mulch Required</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Cubic Yards</p>
                      <p className="text-3xl font-bold text-blue-700">{result.totalVolumeCubicYards.toFixed(2)}</p>
                      <p className="text-xs text-gray-600 mt-1">Main unit</p>
                    </div>

                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Cubic Meters</p>
                      <p className="text-3xl font-bold text-green-700">{result.totalVolumeCubicMeters.toFixed(2)}</p>
                      <p className="text-xs text-gray-600 mt-1">Metric</p>
                    </div>

                    <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">2 cu ft Bags</p>
                      <p className="text-3xl font-bold text-amber-700">{result.totalBags}</p>
                      <p className="text-xs text-gray-600 mt-1">Approx.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Total Coverage Area</span>
                      <span className="text-lg font-bold text-gray-900">{result.totalArea.toFixed(0)} sq ft</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Estimated Cost</span>
                      <span className="text-lg font-bold text-green-700">${result.totalCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Estimated Weight</span>
                      <span className="text-lg font-bold text-gray-900">{result.totalWeight.toFixed(0)} lbs</span>
                    </div>
                  </div>

                  {/* Pie Chart */}
                  {result.areasBreakdown.length > 1 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Volume Distribution by Area</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={result.areasBreakdown.map(area => ({
                              name: area.name,
                              value: area.volume,
                            }))}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {result.areasBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => `${value.toFixed(2)} yd³`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Material Info */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Material Information: {selectedMaterial.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-700 mb-2">{selectedMaterial.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          Lifespan: {selectedMaterial.lifespan}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          ${selectedMaterial.pricePerCubicYard}/yd³
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                          <span className="text-lg">✓</span> Pros
                        </h4>
                        <ul className="text-sm text-green-900 space-y-1 list-disc ml-5">
                          {selectedMaterial.pros.map((pro, idx) => (
                            <li key={idx}>{pro}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                        <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                          <span className="text-lg">✗</span> Cons
                        </h4>
                        <ul className="text-sm text-red-900 space-y-1 list-disc ml-5">
                          {selectedMaterial.cons.map((con, idx) => (
                            <li key={idx}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Best For:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMaterial.bestFor.map((use, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white text-blue-700 text-xs rounded-lg border border-blue-200">
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shopping List */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Shopping List</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <input type="checkbox" className="h-5 w-5" readOnly />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {selectedMaterial.name} - {result.totalVolumeCubicYards.toFixed(2)} cubic yards
                        </p>
                        <p className="text-sm text-gray-600">
                          Or approximately {result.totalBags} bags (2 cu ft each)
                        </p>
                      </div>
                      <p className="font-bold text-green-700">${result.totalCost.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <input type="checkbox" className="h-5 w-5" readOnly />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Landscape Fabric (Optional)</p>
                        <p className="text-sm text-gray-600">
                          {result.totalArea.toFixed(0)} sq ft - for better weed control
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <input type="checkbox" className="h-5 w-5" readOnly />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Edging Material (Optional)</p>
                        <p className="text-sm text-gray-600">
                          To keep mulch in place and define borders
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-900">Pro Tip</h4>
                        <p className="text-sm text-amber-800 mt-1">
                          Order 10-15% extra mulch to account for settling and uneven areas. It's better to have a little extra than to run short!
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">
                  Add areas and click Calculate
                </p>
                <p className="text-sm text-gray-400">
                  Support for rectangles, circles, and triangles
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
        <Button 
          onClick={handleSaveAsImage} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Download className="h-4 w-4" />
          Save as Image
        </Button>
        
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Printer className="h-4 w-4" />
          Print Results
        </Button>
        
        <Button 
          onClick={handleShare} 
          variant="outline" 
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share Calculator
        </Button>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Mulch Calculator"
      />
    </div>
  );
}

