'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Share2, Printer, Download, Scroll, Plus, Minus, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface Door {
  id: string;
  width: number;
  height: number;
}

interface Window {
  id: string;
  width: number;
  height: number;
}

interface Wall {
  id: string;
  length: number;
  height: number;
  doors: Door[];
  windows: Window[];
}

interface WallpaperResult {
  totalWallArea: number;
  doorWindowArea: number;
  netWallArea: number;
  rollsNeeded: number;
  totalCost: number;
  wastePercentage: number;
}

export default function WallpaperCalculator() {
  const [walls, setWalls] = useState<Wall[]>([
    { id: '1', length: 0, height: 0, doors: [], windows: [] }
  ]);
  const [rollWidth, setRollWidth] = useState(20.5); // inches
  const [rollLength, setRollLength] = useState(33); // feet
  const [patternRepeat, setPatternRepeat] = useState(0); // inches
  const [matchType, setMatchType] = useState<'straight' | 'offset'>('straight');
  const [wasteRate, setWasteRate] = useState(10); // percentage
  const [costPerRoll, setCostPerRoll] = useState(35);
  const [unit, setUnit] = useState<'feet' | 'meters'>('feet');
  const [result, setResult] = useState<WallpaperResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/wallpaper-calculator',
    getShareParams: () => ({}),
    getShareText: () => 
      result 
        ? `Wallpaper needed: ${result.rollsNeeded} rolls for ${result.netWallArea.toFixed(0)} sq ft`
        : 'Calculate wallpaper needed for your walls!',
  });

  const addWall = () => {
    setWalls([...walls, { 
      id: Date.now().toString(), 
      length: 0, 
      height: 0, 
      doors: [],
      windows: []
    }]);
  };

  const removeWall = (id: string) => {
    if (walls.length > 1) {
      setWalls(walls.filter(wall => wall.id !== id));
    }
  };

  const updateWall = (id: string, field: keyof Omit<Wall, 'doors' | 'windows' | 'id'>, value: number) => {
    setWalls(walls.map(wall => 
      wall.id === id ? { ...wall, [field]: Math.max(0, value) } : wall
    ));
  };

  const addDoor = (wallId: string) => {
    setWalls(walls.map(wall => 
      wall.id === wallId 
        ? { ...wall, doors: [...wall.doors, { id: Date.now().toString(), width: 3, height: 7 }] }
        : wall
    ));
  };

  const removeDoor = (wallId: string, doorId: string) => {
    setWalls(walls.map(wall => 
      wall.id === wallId 
        ? { ...wall, doors: wall.doors.filter(door => door.id !== doorId) }
        : wall
    ));
  };

  const updateDoor = (wallId: string, doorId: string, field: 'width' | 'height', value: number) => {
    setWalls(walls.map(wall => 
      wall.id === wallId 
        ? { 
            ...wall, 
            doors: wall.doors.map(door => 
              door.id === doorId ? { ...door, [field]: Math.max(0, value) } : door
            )
          }
        : wall
    ));
  };

  const addWindow = (wallId: string) => {
    setWalls(walls.map(wall => 
      wall.id === wallId 
        ? { ...wall, windows: [...wall.windows, { id: Date.now().toString(), width: 3, height: 4 }] }
        : wall
    ));
  };

  const removeWindow = (wallId: string, windowId: string) => {
    setWalls(walls.map(wall => 
      wall.id === wallId 
        ? { ...wall, windows: wall.windows.filter(window => window.id !== windowId) }
        : wall
    ));
  };

  const updateWindow = (wallId: string, windowId: string, field: 'width' | 'height', value: number) => {
    setWalls(walls.map(wall => 
      wall.id === wallId 
        ? { 
            ...wall, 
            windows: wall.windows.map(window => 
              window.id === windowId ? { ...window, [field]: Math.max(0, value) } : window
            )
          }
        : wall
    ));
  };

  const calculateWallpaper = () => {
    let totalWallArea = 0;
    let totalDoorWindowArea = 0;

    walls.forEach(wall => {
      if (wall.length && wall.height) {
        const wallArea = wall.length * wall.height;
        totalWallArea += wallArea;

        // Calculate door areas
        wall.doors.forEach(door => {
          if (door.width && door.height) {
            totalDoorWindowArea += door.width * door.height;
          }
        });

        // Calculate window areas
        wall.windows.forEach(window => {
          if (window.width && window.height) {
            totalDoorWindowArea += window.width * window.height;
          }
        });
      }
    });

    if (totalWallArea === 0) {
      setResult(null);
      return;
    }

    // Convert to sq ft if using meters
    const wallAreaInSqFt = unit === 'meters' ? totalWallArea * 10.764 : totalWallArea;
    const doorWindowAreaInSqFt = unit === 'meters' ? totalDoorWindowArea * 10.764 : totalDoorWindowArea;

    // Net area after deducting doors and windows
    const netArea = Math.max(0, wallAreaInSqFt - doorWindowAreaInSqFt);

    // Calculate roll coverage
    const rollWidthFt = rollWidth / 12; // Convert inches to feet
    const rollAreaSqFt = rollWidthFt * rollLength;

    // Adjust for pattern repeat
    let effectiveRollLength = rollLength;
    if (patternRepeat > 0) {
      const repeatFt = patternRepeat / 12;
      const usableDrops = Math.floor(rollLength / repeatFt);
      effectiveRollLength = usableDrops * repeatFt;
    }

    const effectiveRollArea = rollWidthFt * effectiveRollLength;

    // Calculate waste
    const wasteMultiplier = 1 + (wasteRate / 100);
    const adjustedArea = netArea * wasteMultiplier;

    // Calculate rolls needed
    const rollsNeeded = Math.ceil(adjustedArea / effectiveRollArea);

    // Calculate actual waste percentage
    const actualWastePercentage = ((rollsNeeded * rollAreaSqFt - netArea) / netArea) * 100;

    // Calculate cost
    const totalCost = rollsNeeded * costPerRoll;

    setResult({
      totalWallArea: wallAreaInSqFt,
      doorWindowArea: doorWindowAreaInSqFt,
      netWallArea: netArea,
      rollsNeeded,
      totalCost,
      wastePercentage: actualWastePercentage,
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
      link.download = `wallpaper-estimate-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Wallpaper Estimate</title>
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                <Scroll className="h-5 w-5 text-blue-600" />
                Wallpaper Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Unit Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Measurement Unit</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => setUnit('feet')}
                    variant={unit === 'feet' ? 'default' : 'outline'}
                    className="text-sm"
                  >
                    Feet
                  </Button>
                  <Button
                    onClick={() => setUnit('meters')}
                    variant={unit === 'meters' ? 'default' : 'outline'}
                    className="text-sm"
                  >
                    Meters
                  </Button>
                </div>
              </div>

              {/* Walls */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">Walls</Label>
                  <Button onClick={addWall} size="sm" variant="outline" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add Wall
                  </Button>
                </div>

                {walls.map((wall, index) => (
                  <div key={wall.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Wall {index + 1}</span>
                      {walls.length > 1 && (
                        <Button
                          onClick={() => removeWall(wall.id)}
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {/* Wall Dimensions */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs text-gray-600">Length ({unit === 'feet' ? 'ft' : 'm'})</Label>
                        <input
                          type="number"
                          value={wall.length || ''}
                          onChange={(e) => updateWall(wall.id, 'length', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0"
                          step="0.1"
                          min="0"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Height ({unit === 'feet' ? 'ft' : 'm'})</Label>
                        <input
                          type="number"
                          value={wall.height || ''}
                          onChange={(e) => updateWall(wall.id, 'height', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0"
                          step="0.1"
                          min="0"
                        />
                      </div>
                    </div>

                    {/* Doors */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-semibold text-gray-700">Doors</Label>
                        <Button
                          onClick={() => addDoor(wall.id)}
                          size="sm"
                          variant="ghost"
                          className="h-6 text-xs gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Plus className="h-3 w-3" />
                          Add
                        </Button>
                      </div>
                      {wall.doors.map((door, doorIndex) => (
                        <div key={door.id} className="flex items-center gap-2 bg-white p-2 rounded border border-gray-200">
                          <span className="text-xs text-gray-600 min-w-[50px]">Door {doorIndex + 1}</span>
                          <input
                            type="number"
                            value={door.width || ''}
                            onChange={(e) => updateDoor(wall.id, door.id, 'width', parseFloat(e.target.value) || 0)}
                            className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                            placeholder="W"
                            step="0.1"
                            min="0"
                          />
                          <span className="text-xs text-gray-400">×</span>
                          <input
                            type="number"
                            value={door.height || ''}
                            onChange={(e) => updateDoor(wall.id, door.id, 'height', parseFloat(e.target.value) || 0)}
                            className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                            placeholder="H"
                            step="0.1"
                            min="0"
                          />
                          <Button
                            onClick={() => removeDoor(wall.id, door.id)}
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 ml-auto text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Windows */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-semibold text-gray-700">Windows</Label>
                        <Button
                          onClick={() => addWindow(wall.id)}
                          size="sm"
                          variant="ghost"
                          className="h-6 text-xs gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Plus className="h-3 w-3" />
                          Add
                        </Button>
                      </div>
                      {wall.windows.map((window, windowIndex) => (
                        <div key={window.id} className="flex items-center gap-2 bg-white p-2 rounded border border-gray-200">
                          <span className="text-xs text-gray-600 min-w-[50px]">Window {windowIndex + 1}</span>
                          <input
                            type="number"
                            value={window.width || ''}
                            onChange={(e) => updateWindow(wall.id, window.id, 'width', parseFloat(e.target.value) || 0)}
                            className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                            placeholder="W"
                            step="0.1"
                            min="0"
                          />
                          <span className="text-xs text-gray-400">×</span>
                          <input
                            type="number"
                            value={window.height || ''}
                            onChange={(e) => updateWindow(wall.id, window.id, 'height', parseFloat(e.target.value) || 0)}
                            className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                            placeholder="H"
                            step="0.1"
                            min="0"
                          />
                          <Button
                            onClick={() => removeWindow(wall.id, window.id)}
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 ml-auto text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Wallpaper Settings */}
              <div className="space-y-3 pt-3 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="rollWidth" className="text-xs text-gray-600">Roll Width (in)</Label>
                    <input
                      id="rollWidth"
                      type="number"
                      value={rollWidth}
                      onChange={(e) => setRollWidth(Math.max(1, parseFloat(e.target.value) || 20.5))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      step="0.1"
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rollLength" className="text-xs text-gray-600">Roll Length (ft)</Label>
                    <input
                      id="rollLength"
                      type="number"
                      value={rollLength}
                      onChange={(e) => setRollLength(Math.max(1, parseFloat(e.target.value) || 33))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      step="0.1"
                      min="1"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">Standard: 20.5" × 33 ft</p>

                <div className="space-y-2">
                  <Label htmlFor="patternRepeat" className="text-sm font-medium text-gray-700">
                    Pattern Repeat (inches)
                  </Label>
                  <input
                    id="patternRepeat"
                    type="number"
                    value={patternRepeat}
                    onChange={(e) => setPatternRepeat(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    step="0.1"
                    min="0"
                  />
                  <p className="text-xs text-gray-500">Enter 0 for no pattern</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Match Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => setMatchType('straight')}
                      variant={matchType === 'straight' ? 'default' : 'outline'}
                      className="text-sm"
                    >
                      Straight
                    </Button>
                    <Button
                      onClick={() => setMatchType('offset')}
                      variant={matchType === 'offset' ? 'default' : 'outline'}
                      className="text-sm"
                    >
                      Offset
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="waste" className="text-sm font-medium text-gray-700">
                    Waste Rate (%)
                  </Label>
                  <input
                    id="waste"
                    type="number"
                    value={wasteRate}
                    onChange={(e) => setWasteRate(Math.max(0, Math.min(50, parseInt(e.target.value) || 10)))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="50"
                  />
                  <p className="text-xs text-gray-500">Typical: 10-20%</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cost" className="text-sm font-medium text-gray-700">
                    Cost per Roll ($)
                  </Label>
                  <input
                    id="cost"
                    type="number"
                    value={costPerRoll}
                    onChange={(e) => setCostPerRoll(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <Button 
                onClick={calculateWallpaper}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Scroll className="h-5 w-5 mr-2" />
                Calculate Wallpaper Needed
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          {result ? (
            <div ref={resultRef}>
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                    <Scroll className="h-5 w-5 text-blue-600" />
                    Wallpaper Estimate
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-6">
                    {/* Area Summary */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Wall Area Breakdown</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-600">Total Wall Area</p>
                          <p className="text-xl font-bold text-blue-700">
                            {result.totalWallArea.toFixed(0)} sq ft
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Doors & Windows</p>
                          <p className="text-xl font-bold text-red-700">
                            -{result.doorWindowArea.toFixed(0)} sq ft
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Net Coverage Area</p>
                          <p className="text-xl font-bold text-green-700">
                            {result.netWallArea.toFixed(0)} sq ft
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        ({(result.netWallArea / 10.764).toFixed(1)} m²)
                      </p>
                    </div>

                    {/* Rolls Needed */}
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-600 mb-2">Rolls Needed</p>
                      <p className="text-5xl font-bold text-green-700">{result.rollsNeeded}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {rollWidth}" × {rollLength}' rolls
                      </p>
                    </div>

                    {/* Roll Details */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Roll Specifications</h3>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Roll Size:</span>
                          <span className="font-semibold">{rollWidth}" × {rollLength}'</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pattern Repeat:</span>
                          <span className="font-semibold">
                            {patternRepeat > 0 ? `${patternRepeat}"` : 'None'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Match Type:</span>
                          <span className="font-semibold capitalize">{matchType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Waste Factor:</span>
                          <span className="font-semibold">{result.wastePercentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Cost Estimate */}
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Cost Estimate</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Wallpaper ({result.rollsNeeded} rolls × ${costPerRoll})</span>
                          <span className="font-semibold">${result.totalCost.toFixed(2)}</span>
                        </div>
                        <div className="pt-2 border-t border-amber-300 flex justify-between">
                          <span className="font-semibold text-gray-900">Total Materials Cost</span>
                          <span className="text-2xl font-bold text-amber-700">${result.totalCost.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">💡 Wallpaper Tips</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Always order 1-2 extra rolls for mistakes and future repairs</li>
                        <li>• {matchType === 'straight' ? 'Straight match patterns are easier to install' : 'Offset match patterns require more waste'}</li>
                        <li>• {patternRepeat > 0 ? 'Large pattern repeats increase waste' : 'No pattern repeat minimizes waste'}</li>
                        <li>• Check dye lot numbers - buy all rolls from the same batch</li>
                        <li>• Measure doors and windows accurately for precise calculations</li>
                      </ul>
                    </div>

                    {/* Installation Guide */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">📋 What You'll Need</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                        <div>
                          <p className="font-semibold mb-1">Tools:</p>
                          <ul className="space-y-1">
                            <li>• Wallpaper paste/adhesive</li>
                            <li>• Smoothing brush</li>
                            <li>• Seam roller</li>
                            <li>• Utility knife</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Supplies:</p>
                          <ul className="space-y-1">
                            <li>• Measuring tape</li>
                            <li>• Level</li>
                            <li>• Sponge and bucket</li>
                            <li>• Drop cloths</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Scroll className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Enter wall dimensions to calculate wallpaper needed</p>
                <p className="text-gray-400 text-sm mt-2">Add doors and windows with their exact dimensions for accurate results</p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {result && (
            <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
              <Button 
                onClick={handleSaveAsImage} 
                variant="outline" 
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Save as Image
              </Button>
              
              <Button 
                onClick={handlePrint} 
                variant="outline" 
                className="gap-2"
              >
                <Printer className="h-4 w-4" />
                Print Estimate
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
          )}
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Wallpaper Calculator"
      />
    </div>
  );
}
