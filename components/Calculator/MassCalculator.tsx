'use client';

import { useState, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, Search, Plus, Trash2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface Material {
  name: string;
  density: number; // kg/m³
  category: string;
}

interface CalculationItem {
  id: string;
  shape: string;
  material: string;
  density: number;
  volume: number; // m³
  mass: number; // kg
  dimensions: string;
}

// Comprehensive material database
const MATERIALS: Material[] = [
  // Metals
  { name: 'Aluminum', density: 2700, category: 'Metal' },
  { name: 'Steel (Carbon)', density: 7850, category: 'Metal' },
  { name: 'Stainless Steel', density: 8000, category: 'Metal' },
  { name: 'Copper', density: 8960, category: 'Metal' },
  { name: 'Brass', density: 8500, category: 'Metal' },
  { name: 'Bronze', density: 8800, category: 'Metal' },
  { name: 'Iron (Cast)', density: 7200, category: 'Metal' },
  { name: 'Lead', density: 11340, category: 'Metal' },
  { name: 'Zinc', density: 7140, category: 'Metal' },
  { name: 'Titanium', density: 4500, category: 'Metal' },
  { name: 'Nickel', density: 8900, category: 'Metal' },
  { name: 'Gold', density: 19300, category: 'Metal' },
  { name: 'Silver', density: 10500, category: 'Metal' },
  
  // Wood
  { name: 'Oak', density: 750, category: 'Wood' },
  { name: 'Pine', density: 550, category: 'Wood' },
  { name: 'Maple', density: 700, category: 'Wood' },
  { name: 'Birch', density: 670, category: 'Wood' },
  { name: 'Mahogany', density: 720, category: 'Wood' },
  { name: 'Teak', density: 630, category: 'Wood' },
  { name: 'Cedar', density: 380, category: 'Wood' },
  { name: 'Plywood', density: 550, category: 'Wood' },
  { name: 'MDF', density: 750, category: 'Wood' },
  
  // Plastics
  { name: 'ABS Plastic', density: 1040, category: 'Plastic' },
  { name: 'Acrylic (PMMA)', density: 1180, category: 'Plastic' },
  { name: 'PVC', density: 1380, category: 'Plastic' },
  { name: 'Polypropylene (PP)', density: 900, category: 'Plastic' },
  { name: 'Polyethylene (PE)', density: 950, category: 'Plastic' },
  { name: 'Polystyrene (PS)', density: 1050, category: 'Plastic' },
  { name: 'Nylon', density: 1150, category: 'Plastic' },
  { name: 'Polycarbonate (PC)', density: 1200, category: 'Plastic' },
  { name: 'Teflon (PTFE)', density: 2200, category: 'Plastic' },
  
  // Stone & Concrete
  { name: 'Concrete', density: 2400, category: 'Stone' },
  { name: 'Granite', density: 2750, category: 'Stone' },
  { name: 'Marble', density: 2700, category: 'Stone' },
  { name: 'Limestone', density: 2600, category: 'Stone' },
  { name: 'Sandstone', density: 2300, category: 'Stone' },
  { name: 'Brick', density: 1920, category: 'Stone' },
  
  // Glass & Ceramics
  { name: 'Glass', density: 2500, category: 'Glass' },
  { name: 'Ceramic', density: 2400, category: 'Ceramic' },
  { name: 'Porcelain', density: 2400, category: 'Ceramic' },
  
  // Other
  { name: 'Rubber', density: 1200, category: 'Other' },
  { name: 'Ice', density: 917, category: 'Other' },
  { name: 'Water', density: 1000, category: 'Other' },
  { name: 'Sand (Dry)', density: 1600, category: 'Other' },
  { name: 'Gravel', density: 1750, category: 'Other' },
];

export default function MassCalculator() {
  const [shape, setShape] = useState('rectangular');
  const [materialSearch, setMaterialSearch] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [customDensity, setCustomDensity] = useState('');
  const [useCustomDensity, setUseCustomDensity] = useState(false);
  
  // Dimensions
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [radius, setRadius] = useState('');
  const [diameter, setDiameter] = useState('');
  
  const [calculations, setCalculations] = useState<CalculationItem[]>([]);
  const [result, setResult] = useState<{ volume: number; mass: number; dimensions: string } | null>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);
  
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/mass-calculator',
    getShareParams: () => ({
      s: shape,
      m: selectedMaterial?.name || 'custom',
    }),
    getShareText: () => {
      const total = calculations.reduce((sum, item) => sum + item.mass, 0);
      if (total > 0) {
        return `Total Mass Calculated: ${total.toFixed(2)} kg using Mass Calculator`;
      }
      return 'Calculate mass and weight for various materials and shapes!';
    },
  });

  // Filter materials based on search
  const filteredMaterials = useMemo(() => {
    if (!materialSearch) return MATERIALS;
    const search = materialSearch.toLowerCase();
    return MATERIALS.filter(m => 
      m.name.toLowerCase().includes(search) || 
      m.category.toLowerCase().includes(search)
    );
  }, [materialSearch]);

  // Group materials by category
  const materialsByCategory = useMemo(() => {
    const groups: { [key: string]: Material[] } = {};
    filteredMaterials.forEach(material => {
      if (!groups[material.category]) {
        groups[material.category] = [];
      }
      groups[material.category].push(material);
    });
    return groups;
  }, [filteredMaterials]);

  const calculateVolume = (): number | null => {
    try {
      switch (shape) {
        case 'rectangular': {
          const l = parseFloat(length);
          const w = parseFloat(width);
          const h = parseFloat(height);
          if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) return null;
          return l * w * h;
        }
        case 'cylinder': {
          const r = parseFloat(radius);
          const h = parseFloat(height);
          if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) return null;
          return Math.PI * r * r * h;
        }
        case 'sphere': {
          const r = parseFloat(radius);
          if (isNaN(r) || r <= 0) return null;
          return (4 / 3) * Math.PI * r * r * r;
        }
        case 'cone': {
          const r = parseFloat(radius);
          const h = parseFloat(height);
          if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) return null;
          return (1 / 3) * Math.PI * r * r * h;
        }
        case 'cube': {
          const l = parseFloat(length);
          if (isNaN(l) || l <= 0) return null;
          return l * l * l;
        }
        case 'tube': {
          const outerR = parseFloat(radius);
          const innerR = parseFloat(diameter); // Using diameter field for inner radius
          const h = parseFloat(height);
          if (isNaN(outerR) || isNaN(innerR) || isNaN(h) || outerR <= 0 || innerR < 0 || innerR >= outerR || h <= 0) return null;
          return Math.PI * (outerR * outerR - innerR * innerR) * h;
        }
        default:
          return null;
      }
    } catch {
      return null;
    }
  };

  const getDimensionsString = (): string => {
    switch (shape) {
      case 'rectangular':
        return `${length} × ${width} × ${height} m`;
      case 'cylinder':
        return `r=${radius}m, h=${height}m`;
      case 'sphere':
        return `r=${radius}m`;
      case 'cone':
        return `r=${radius}m, h=${height}m`;
      case 'cube':
        return `${length} × ${length} × ${length} m`;
      case 'tube':
        return `outer r=${radius}m, inner r=${diameter}m, h=${height}m`;
      default:
        return '';
    }
  };

  const handleCalculate = () => {
    const volume = calculateVolume();
    
    if (volume === null) {
      alert('Please enter valid dimensions.');
      return;
    }
    
    const density = useCustomDensity 
      ? parseFloat(customDensity)
      : selectedMaterial?.density;
    
    if (!density || density <= 0) {
      alert('Please select a material or enter custom density.');
      return;
    }
    
    const mass = volume * density;
    const dimensions = getDimensionsString();
    
    setResult({ volume, mass, dimensions });
  };

  const handleAddToList = () => {
    if (!result) {
      alert('Please calculate first.');
      return;
    }
    
    const materialName = useCustomDensity 
      ? `Custom (${customDensity} kg/m³)`
      : selectedMaterial?.name || 'Unknown';
    
    const density = useCustomDensity 
      ? parseFloat(customDensity)
      : selectedMaterial?.density || 0;
    
    const newItem: CalculationItem = {
      id: Date.now().toString(),
      shape: shape.charAt(0).toUpperCase() + shape.slice(1),
      material: materialName,
      density,
      volume: result.volume,
      mass: result.mass,
      dimensions: result.dimensions,
    };
    
    setCalculations(prev => [...prev, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Delete this item?')) {
      setCalculations(prev => prev.filter(item => item.id !== id));
    }
  };

  const convertMass = (kg: number, unit: string): number => {
    switch (unit) {
      case 'kg': return kg;
      case 'g': return kg * 1000;
      case 'lb': return kg * 2.20462;
      case 'oz': return kg * 35.274;
      case 'ton': return kg / 1000;
      case 'ton-us': return kg / 907.185;
      default: return kg;
    }
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
      link.download = `mass-calculation-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Mass Calculation Results</title>
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

  const totalMass = calculations.reduce((sum, item) => sum + item.mass, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Mass Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Shape Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Shape <span className="text-red-500">*</span>
                </Label>
                <select
                  value={shape}
                  onChange={(e) => setShape(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rectangular">Rectangular Prism (Box)</option>
                  <option value="cube">Cube</option>
                  <option value="cylinder">Cylinder</option>
                  <option value="sphere">Sphere</option>
                  <option value="cone">Cone</option>
                  <option value="tube">Hollow Cylinder (Tube)</option>
                </select>
              </div>

              {/* Dimensions */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  Dimensions (meters) <span className="text-red-500">*</span>
                </Label>
                
                {(shape === 'rectangular') && (
                  <>
                    <input
                      type="number"
                      step="0.01"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Length (m)"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Width (m)"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Height (m)"
                    />
                  </>
                )}
                
                {shape === 'cube' && (
                  <input
                    type="number"
                    step="0.01"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Side Length (m)"
                  />
                )}
                
                {(shape === 'cylinder' || shape === 'cone') && (
                  <>
                    <input
                      type="number"
                      step="0.01"
                      value={radius}
                      onChange={(e) => setRadius(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Radius (m)"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Height (m)"
                    />
                  </>
                )}
                
                {shape === 'sphere' && (
                  <input
                    type="number"
                    step="0.01"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Radius (m)"
                  />
                )}
                
                {shape === 'tube' && (
                  <>
                    <input
                      type="number"
                      step="0.01"
                      value={radius}
                      onChange={(e) => setRadius(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Outer Radius (m)"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={diameter}
                      onChange={(e) => setDiameter(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Inner Radius (m)"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Height/Length (m)"
                    />
                  </>
                )}
              </div>

              {/* Material Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Material <span className="text-red-500">*</span>
                </Label>
                
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    id="useCustom"
                    checked={useCustomDensity}
                    onChange={(e) => setUseCustomDensity(e.target.checked)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label htmlFor="useCustom" className="text-sm text-gray-700">
                    Use Custom Density
                  </label>
                </div>
                
                {useCustomDensity ? (
                  <input
                    type="number"
                    step="0.1"
                    value={customDensity}
                    onChange={(e) => setCustomDensity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Density (kg/m³)"
                  />
                ) : (
                  <>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={materialSearch}
                        onChange={(e) => setMaterialSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Search materials..."
                      />
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg">
                      {Object.entries(materialsByCategory).map(([category, materials]) => (
                        <div key={category}>
                          <div className="sticky top-0 bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700">
                            {category}
                          </div>
                          {materials.map((material) => (
                            <button
                              key={material.name}
                              onClick={() => setSelectedMaterial(material)}
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 ${
                                selectedMaterial?.name === material.name ? 'bg-blue-100 font-semibold' : ''
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span>{material.name}</span>
                                <span className="text-xs text-gray-500">{material.density} kg/m³</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {selectedMaterial && !useCustomDensity && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm font-semibold text-blue-900">{selectedMaterial.name}</p>
                  <p className="text-xs text-blue-700">Density: {selectedMaterial.density} kg/m³</p>
                  <p className="text-xs text-blue-700">Category: {selectedMaterial.category}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={handleCalculate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculate
            </Button>
            
            <Button 
              onClick={handleAddToList}
              disabled={!result}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add to List
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6" ref={resultRef}>
          {result ? (
            <>
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Calculation Result</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Volume</p>
                      <p className="text-3xl font-bold text-blue-700">{result.volume.toFixed(4)} m³</p>
                      <p className="text-xs text-gray-600 mt-1">{(result.volume * 1000).toFixed(2)} L</p>
                    </div>

                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Mass</p>
                      <p className="text-3xl font-bold text-green-700">{result.mass.toFixed(2)} kg</p>
                      <p className="text-xs text-gray-600 mt-1">{convertMass(result.mass, 'lb').toFixed(2)} lb</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Grams</span>
                      <span className="text-lg font-bold text-gray-900">{convertMass(result.mass, 'g').toFixed(2)} g</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Pounds</span>
                      <span className="text-lg font-bold text-gray-900">{convertMass(result.mass, 'lb').toFixed(2)} lb</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Ounces</span>
                      <span className="text-lg font-bold text-gray-900">{convertMass(result.mass, 'oz').toFixed(2)} oz</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Metric Tons</span>
                      <span className="text-lg font-bold text-gray-900">{convertMass(result.mass, 'ton').toFixed(4)} t</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">US Tons</span>
                      <span className="text-lg font-bold text-gray-900">{convertMass(result.mass, 'ton-us').toFixed(4)} ton</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Select a shape, enter dimensions, choose a material, and click Calculate
                </p>
              </CardContent>
            </Card>
          )}

          {/* Calculations List */}
          {calculations.length > 0 && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">
                  Calculations List ({calculations.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3">
                  {calculations.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{item.shape} - {item.material}</p>
                          <p className="text-xs text-gray-600">{item.dimensions}</p>
                        </div>
                        <Button
                          onClick={() => handleDeleteItem(item.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Volume:</span>
                          <p className="font-semibold">{item.volume.toFixed(4)} m³</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Density:</span>
                          <p className="font-semibold">{item.density} kg/m³</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Mass:</span>
                          <p className="font-semibold text-green-700">{item.mass.toFixed(2)} kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total Mass:</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-700">{totalMass.toFixed(2)} kg</p>
                      <p className="text-sm text-gray-600">{convertMass(totalMass, 'lb').toFixed(2)} lb</p>
                    </div>
                  </div>
                </div>
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
        calculatorName="Mass Calculator"
      />
    </div>
  );
}

