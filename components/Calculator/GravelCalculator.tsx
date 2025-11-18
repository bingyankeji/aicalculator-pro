'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, Plus, Trash2, AlertCircle, TrendingUp, Truck } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface GravelArea {
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

interface GravelMaterial {
  name: string;
  type: 'crushed-stone' | 'pea-gravel' | 'river-rock' | 'crushed-granite' | 'limestone' | 'lava-rock';
  pricePerTon: number;
  weightPerCubicYard: number; // pounds
  description: string;
  sizes: string[];
  pros: string[];
  cons: string[];
  bestFor: string[];
}

const GRAVEL_MATERIALS: GravelMaterial[] = [
  {
    name: 'Crushed Stone',
    type: 'crushed-stone',
    pricePerTon: 40,
    weightPerCubicYard: 2700,
    description: 'Angular crushed rock, excellent compaction and drainage',
    sizes: ['3/8"', '1/2"', '3/4"', '1"', '1.5"'],
    pros: ['Excellent drainage', 'Locks together well', 'Great for driveways', 'Affordable', 'Durable'],
    cons: ['Can be dusty', 'Sharp edges', 'Not ideal for bare feet', 'May need edging'],
    bestFor: ['Driveways', 'Pathways', 'Base layers', 'Drainage', 'Parking areas'],
  },
  {
    name: 'Pea Gravel',
    type: 'pea-gravel',
    pricePerTon: 50,
    weightPerCubicYard: 2400,
    description: 'Small smooth stones, comfortable to walk on',
    sizes: ['1/4"', '3/8"', '1/2"'],
    pros: ['Smooth and comfortable', 'Attractive appearance', 'Good drainage', 'Easy to work with', 'Pet-friendly'],
    cons: ['Can migrate/scatter', 'Needs edging', 'Not for heavy vehicles', 'Higher cost'],
    bestFor: ['Walkways', 'Garden paths', 'Decorative areas', 'Dog runs', 'Play areas'],
  },
  {
    name: 'River Rock',
    type: 'river-rock',
    pricePerTon: 60,
    weightPerCubicYard: 2800,
    description: 'Large smooth river stones, decorative and natural',
    sizes: ['1"-2"', '2"-4"', '4"-8"'],
    pros: ['Beautiful appearance', 'Natural look', 'No decomposition', 'Low maintenance', 'Unique colors'],
    cons: ['Expensive', 'Heavy', 'Can roll/shift', 'Hard to walk on', 'Installation difficult'],
    bestFor: ['Decorative landscaping', 'Water features', 'Large planters', 'Modern designs', 'Erosion control'],
  },
  {
    name: 'Crushed Granite',
    type: 'crushed-granite',
    pricePerTon: 45,
    weightPerCubicYard: 2700,
    description: 'Decomposed granite, compacts well with fine texture',
    sizes: ['1/4"', 'Fines (stabilizer)'],
    pros: ['Compacts firm', 'Natural look', 'Wheelchair accessible', 'Good for slopes', 'Permeable'],
    cons: ['Can wash away', 'Dusty when dry', 'Needs stabilizer', 'Annual maintenance'],
    bestFor: ['Pathways', 'Patios', 'Modern landscaping', 'Slopes', 'Wheelchair access'],
  },
  {
    name: 'Limestone',
    type: 'limestone',
    pricePerTon: 35,
    weightPerCubicYard: 2700,
    description: 'Light-colored crushed limestone, great for bases',
    sizes: ['1/2"', '3/4"', '1"', '2"'],
    pros: ['Affordable', 'Bright color', 'Excellent base', 'Compacts well', 'Readily available'],
    cons: ['Can be alkaline', 'Dusty', 'May stain', 'Less decorative'],
    bestFor: ['Driveway base', 'Road base', 'Parking areas', 'Drainage', 'Construction'],
  },
  {
    name: 'Lava Rock',
    type: 'lava-rock',
    pricePerTon: 70,
    weightPerCubicYard: 1400,
    description: 'Lightweight volcanic rock, excellent drainage',
    sizes: ['1/2"', '3/4"', '1"-2"'],
    pros: ['Lightweight', 'Excellent drainage', 'Insulates soil', 'Natural look', 'Doesn\'t decompose'],
    cons: ['Expensive', 'Can float in floods', 'Porous (holds dust)', 'Limited colors'],
    bestFor: ['Drainage', 'Decorative beds', 'Container gardens', 'Xeriscape', 'Lightweight needs'],
  },
];

export default function GravelCalculator() {
  const [areas, setAreas] = useState<GravelArea[]>([]);
  const [currentArea, setCurrentArea] = useState({
    name: '',
    shape: 'rectangle' as 'rectangle' | 'circle' | 'triangle',
    length: '',
    width: '',
    radius: '',
    base: '',
    height: '',
  });
  const [depth, setDepth] = useState('4');
  const [depthUnit, setDepthUnit] = useState<'inches' | 'cm'>('inches');
  const [selectedMaterial, setSelectedMaterial] = useState<GravelMaterial>(GRAVEL_MATERIALS[0]);
  const [customPrice, setCustomPrice] = useState('');
  const [useCustomPrice, setUseCustomPrice] = useState(false);
  const [deliveryDistance, setDeliveryDistance] = useState('10');
  const [deliveryFee, setDeliveryFee] = useState('75');
  
  const [result, setResult] = useState<{
    totalArea: number;
    totalVolumeCubicYards: number;
    totalVolumeCubicMeters: number;
    totalVolumeCubicFeet: number;
    totalTons: number;
    totalPounds: number;
    materialCost: number;
    deliveryCost: number;
    totalCost: number;
    truckLoads: number;
    areasBreakdown: { name: string; area: number; volume: number; weight: number }[];
  } | null>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);
  
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/gravel-calculator',
    getShareParams: () => ({
      d: depth,
      t: selectedMaterial.type,
    }),
    getShareText: () => {
      if (result) {
        return `Gravel needed: ${result.totalTons.toFixed(2)} tons (${result.totalVolumeCubicYards.toFixed(2)} cubic yards) for ${result.totalArea.toFixed(0)} sq ft`;
      }
      return 'Calculate gravel needed for your project!';
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
    
    const newArea: GravelArea = {
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
    
    // Calculate weight
    const totalPounds = totalVolumeCubicYards * selectedMaterial.weightPerCubicYard;
    const totalTons = totalPounds / 2000; // Convert pounds to tons
    
    // Calculate cost
    const pricePerTon = useCustomPrice && customPrice ? parseFloat(customPrice) : selectedMaterial.pricePerTon;
    const materialCost = totalTons * pricePerTon;
    const deliveryCost = parseFloat(deliveryFee);
    const totalCost = materialCost + deliveryCost;
    
    // Calculate truck loads (typical dump truck = 10-12 tons)
    const truckLoads = Math.ceil(totalTons / 10);
    
    // Areas breakdown
    const areasBreakdown = areas.map(area => {
      const volume = (area.area * depthInFeet) / 27;
      const weight = volume * selectedMaterial.weightPerCubicYard;
      return {
        name: area.name,
        area: area.area,
        volume,
        weight,
      };
    });
    
    setResult({
      totalArea,
      totalVolumeCubicYards,
      totalVolumeCubicMeters,
      totalVolumeCubicFeet,
      totalTons,
      totalPounds,
      materialCost,
      deliveryCost,
      totalCost,
      truckLoads,
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
      link.download = `gravel-calculation-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Gravel Calculation</title>
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
    
    if (inInches < 2) return { text: 'Too thin - not suitable for most applications', color: 'text-red-700', usage: 'Decorative only' };
    if (inInches < 3) return { text: 'Minimum for light foot traffic', color: 'text-amber-700', usage: 'Garden paths' };
    if (inInches <= 4) return { text: 'Ideal for walkways and patios', color: 'text-green-700', usage: 'Standard depth' };
    if (inInches <= 6) return { text: 'Good for driveways and parking', color: 'text-blue-700', usage: 'Heavy use' };
    return { text: 'Extra depth for heavy vehicles', color: 'text-purple-700', usage: 'Commercial/RV' };
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
                  placeholder="Driveway"
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
                      placeholder="30"
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
                      placeholder="12"
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
                    placeholder="10"
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
                      placeholder="20"
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
                      placeholder="15"
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
              <CardTitle className="text-xl text-gray-900">Gravel Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Depth */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Gravel Depth <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.5"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="4"
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
                  <div>
                    <p className={`text-xs font-semibold ${getDepthRecommendation().color}`}>
                      {getDepthRecommendation().text}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Best for: {getDepthRecommendation().usage}
                    </p>
                  </div>
                )}
              </div>

              {/* Material Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Gravel Material
                </Label>
                <select
                  value={selectedMaterial.type}
                  onChange={(e) => {
                    const material = GRAVEL_MATERIALS.find(m => m.type === e.target.value);
                    if (material) setSelectedMaterial(material);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {GRAVEL_MATERIALS.map((material) => (
                    <option key={material.type} value={material.type}>
                      {material.name} - ${material.pricePerTon}/ton
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
                  Use custom price per ton
                </label>
              </div>

              {useCustomPrice && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Custom Price per Ton
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

              {/* Delivery Settings */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Delivery Distance (miles) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  type="number"
                  step="1"
                  value={deliveryDistance}
                  onChange={(e) => setDeliveryDistance(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="10"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Delivery Fee <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    step="1"
                    value={deliveryFee}
                    onChange={(e) => setDeliveryFee(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="75"
                  />
                </div>
                <p className="text-xs text-gray-500">Typical: $50-150 depending on distance</p>
              </div>

              <Button 
                onClick={handleCalculate}
                disabled={areas.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Gravel Needed
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
                  <CardTitle className="text-xl text-gray-900">Gravel Required</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Tons</p>
                      <p className="text-3xl font-bold text-blue-700">{result.totalTons.toFixed(2)}</p>
                      <p className="text-xs text-gray-600 mt-1">Weight</p>
                    </div>

                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Cubic Yards</p>
                      <p className="text-3xl font-bold text-green-700">{result.totalVolumeCubicYards.toFixed(2)}</p>
                      <p className="text-xs text-gray-600 mt-1">Volume</p>
                    </div>

                    <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Truck Loads</p>
                      <p className="text-3xl font-bold text-amber-700">{result.truckLoads}</p>
                      <p className="text-xs text-gray-600 mt-1">~10 tons/load</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Total Coverage Area</span>
                      <span className="text-lg font-bold text-gray-900">{result.totalArea.toFixed(0)} sq ft</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Total Weight (lbs)</span>
                      <span className="text-lg font-bold text-gray-900">{result.totalPounds.toFixed(0)} lbs</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Material Cost</span>
                      <span className="text-lg font-bold text-blue-700">${result.materialCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Delivery Cost</span>
                      <span className="text-lg font-bold text-gray-900">${result.deliveryCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-100 border-2 border-green-300 rounded-lg">
                      <span className="text-sm font-bold text-green-900">Total Cost</span>
                      <span className="text-xl font-bold text-green-700">${result.totalCost.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Pie Chart */}
                  {result.areasBreakdown.length > 1 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Weight Distribution by Area</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={result.areasBreakdown.map(area => ({
                              name: area.name,
                              value: area.weight,
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
                          <Tooltip formatter={(value: number) => `${value.toFixed(0)} lbs`} />
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
                          ${selectedMaterial.pricePerTon}/ton
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          {selectedMaterial.weightPerCubicYard} lbs/yd³
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Available Sizes:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMaterial.sizes.map((size, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg border border-gray-200">
                            {size}
                          </span>
                        ))}
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

              {/* Delivery Info */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-900">Truck Access Required</h4>
                          <p className="text-sm text-amber-800 mt-1">
                            Standard dump trucks need at least 10 feet wide clearance and 14 feet vertical clearance. 
                            Confirm access before ordering {result.truckLoads} truck load{result.truckLoads > 1 ? 's' : ''}.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Delivery Details</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Distance: {deliveryDistance} miles</li>
                          <li>• Truck loads: {result.truckLoads}</li>
                          <li>• Total weight: {result.totalTons.toFixed(2)} tons</li>
                          <li>• Delivery fee: ${result.deliveryCost.toFixed(2)}</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Pro Tips</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Order 5-10% extra for settling</li>
                          <li>• Have wheelbarrow ready</li>
                          <li>• Mark dump location clearly</li>
                          <li>• Use within 2-3 days if possible</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Installation Guide */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Installation Guide</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    {[
                      {
                        step: 1,
                        title: 'Prepare the Area',
                        description: 'Remove grass, weeds, and debris. Excavate to proper depth (gravel depth + 2" for base). Compact the soil.'
                      },
                      {
                        step: 2,
                        title: 'Install Landscape Fabric',
                        description: 'Lay weed barrier fabric over compacted soil. Overlap seams by 6-12 inches. Secure with landscape staples.'
                      },
                      {
                        step: 3,
                        title: 'Add Base Layer (Optional)',
                        description: 'For driveways, add 2-3" compacted stone base. This provides stability and improves drainage.'
                      },
                      {
                        step: 4,
                        title: 'Spread Gravel',
                        description: `Spread ${selectedMaterial.name} evenly to ${depth} ${depthUnit} depth. Use rake to level. Work in sections for large areas.`
                      },
                      {
                        step: 5,
                        title: 'Compact and Edge',
                        description: 'Compact gravel with tamper or roller. Install edging (metal, plastic, or stone) to contain gravel and prevent migration.'
                      },
                      {
                        step: 6,
                        title: 'Final Grading',
                        description: 'Create 2% slope away from buildings for drainage. Add more gravel to low spots. Water lightly to help settling.'
                      },
                    ].map((step) => (
                      <div key={step.step} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                          <p className="text-sm text-gray-700">{step.description}</p>
                        </div>
                      </div>
                    ))}
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
        calculatorName="Gravel Calculator"
      />
    </div>
  );
}

