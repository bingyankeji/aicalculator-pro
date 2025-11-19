'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Share2, Printer, Download, Paintbrush, Plus, Minus, X } from 'lucide-react';
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

interface Room {
  id: string;
  length: number;
  width: number;
  height: number;
  doors: Door[];
  windows: Window[];
}

interface PaintResult {
  totalWallArea: number;
  doorWindowArea: number;
  netWallArea: number;
  paintGallons: number;
  paintLiters: number;
  primerGallons: number;
  primerLiters: number;
  totalCost: number;
}

export default function PaintCalculator() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', length: 0, width: 0, height: 0, doors: [], windows: [] }
  ]);
  const [coats, setCoats] = useState(2);
  const [paintType, setPaintType] = useState<'latex' | 'oil'>('latex');
  const [coverageRate, setCoverageRate] = useState(350); // sq ft per gallon
  const [needPrimer, setNeedPrimer] = useState(true);
  const [paintCost, setPaintCost] = useState(30); // per gallon
  const [primerCost, setPrimerCost] = useState(25); // per gallon
  const [unit, setUnit] = useState<'feet' | 'meters'>('feet');
  const [result, setResult] = useState<PaintResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/paint-calculator',
    getShareParams: () => ({}),
    getShareText: () => 
      result 
        ? `Paint needed: ${result.paintGallons.toFixed(1)} gallons for ${result.netWallArea.toFixed(0)} sq ft`
        : 'Calculate paint needed for your project!',
  });

  const addRoom = () => {
    setRooms([...rooms, { 
      id: Date.now().toString(), 
      length: 0, 
      width: 0, 
      height: 0, 
      doors: [],
      windows: []
    }]);
  };

  const removeRoom = (id: string) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  const updateRoom = (id: string, field: keyof Omit<Room, 'doors' | 'windows' | 'id'>, value: number) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, [field]: Math.max(0, value) } : room
    ));
  };

  const addDoor = (roomId: string) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, doors: [...room.doors, { id: Date.now().toString(), width: 3, height: 7 }] }
        : room
    ));
  };

  const removeDoor = (roomId: string, doorId: string) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, doors: room.doors.filter(door => door.id !== doorId) }
        : room
    ));
  };

  const updateDoor = (roomId: string, doorId: string, field: 'width' | 'height', value: number) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { 
            ...room, 
            doors: room.doors.map(door => 
              door.id === doorId ? { ...door, [field]: Math.max(0, value) } : door
            )
          }
        : room
    ));
  };

  const addWindow = (roomId: string) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, windows: [...room.windows, { id: Date.now().toString(), width: 3, height: 4 }] }
        : room
    ));
  };

  const removeWindow = (roomId: string, windowId: string) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, windows: room.windows.filter(window => window.id !== windowId) }
        : room
    ));
  };

  const updateWindow = (roomId: string, windowId: string, field: 'width' | 'height', value: number) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { 
            ...room, 
            windows: room.windows.map(window => 
              window.id === windowId ? { ...window, [field]: Math.max(0, value) } : window
            )
          }
        : room
    ));
  };

  const calculatePaint = () => {
    let totalWallArea = 0;
    let totalDoorWindowArea = 0;

    rooms.forEach(room => {
      if (room.length && room.width && room.height) {
        // Calculate wall area (perimeter × height)
        const perimeter = 2 * (room.length + room.width);
        const wallArea = perimeter * room.height;
        totalWallArea += wallArea;
        
        // Calculate door areas
        room.doors.forEach(door => {
          if (door.width && door.height) {
            totalDoorWindowArea += door.width * door.height;
          }
        });

        // Calculate window areas
        room.windows.forEach(window => {
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

    // Calculate paint needed
    const paintNeededSqFt = netArea * coats;
    const paintGallons = paintNeededSqFt / coverageRate;
    const paintLiters = paintGallons * 3.78541;

    // Calculate primer needed (1 coat)
    const primerGallons = needPrimer ? netArea / coverageRate : 0;
    const primerLiters = primerGallons * 3.78541;

    // Calculate cost
    const totalCost = (paintGallons * paintCost) + (primerGallons * primerCost);

    setResult({
      totalWallArea: wallAreaInSqFt,
      doorWindowArea: doorWindowAreaInSqFt,
      netWallArea: netArea,
      paintGallons: Math.ceil(paintGallons * 10) / 10, // Round up to 0.1
      paintLiters: Math.ceil(paintLiters * 10) / 10,
      primerGallons: Math.ceil(primerGallons * 10) / 10,
      primerLiters: Math.ceil(primerLiters * 10) / 10,
      totalCost,
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
      link.download = `paint-estimate-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Paint Estimate</title>
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
                <Paintbrush className="h-5 w-5 text-blue-600" />
                Paint Calculator
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

              {/* Rooms */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">Rooms</Label>
                  <Button onClick={addRoom} size="sm" variant="outline" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add Room
                  </Button>
                </div>

                {rooms.map((room, index) => (
                  <div key={room.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Room {index + 1}</span>
                      {rooms.length > 1 && (
                        <Button
                          onClick={() => removeRoom(room.id)}
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {/* Room Dimensions */}
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs text-gray-600">Length</Label>
                        <input
                          type="number"
                          value={room.length || ''}
                          onChange={(e) => updateRoom(room.id, 'length', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0"
                          step="0.1"
                          min="0"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Width</Label>
                        <input
                          type="number"
                          value={room.width || ''}
                          onChange={(e) => updateRoom(room.id, 'width', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0"
                          step="0.1"
                          min="0"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Height</Label>
                        <input
                          type="number"
                          value={room.height || ''}
                          onChange={(e) => updateRoom(room.id, 'height', parseFloat(e.target.value) || 0)}
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
                          onClick={() => addDoor(room.id)}
                          size="sm"
                          variant="ghost"
                          className="h-6 text-xs gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Plus className="h-3 w-3" />
                          Add
                        </Button>
                      </div>
                      {room.doors.map((door, doorIndex) => (
                        <div key={door.id} className="flex items-center gap-2 bg-white p-2 rounded border border-gray-200">
                          <span className="text-xs text-gray-600 min-w-[50px]">Door {doorIndex + 1}</span>
                          <input
                            type="number"
                            value={door.width || ''}
                            onChange={(e) => updateDoor(room.id, door.id, 'width', parseFloat(e.target.value) || 0)}
                            className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                            placeholder="W"
                            step="0.1"
                            min="0"
                          />
                          <span className="text-xs text-gray-400">×</span>
                          <input
                            type="number"
                            value={door.height || ''}
                            onChange={(e) => updateDoor(room.id, door.id, 'height', parseFloat(e.target.value) || 0)}
                            className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                            placeholder="H"
                            step="0.1"
                            min="0"
                          />
                          <Button
                            onClick={() => removeDoor(room.id, door.id)}
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
                          onClick={() => addWindow(room.id)}
                          size="sm"
                          variant="ghost"
                          className="h-6 text-xs gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Plus className="h-3 w-3" />
                          Add
                        </Button>
                      </div>
                      {room.windows.map((window, windowIndex) => (
                        <div key={window.id} className="flex items-center gap-2 bg-white p-2 rounded border border-gray-200">
                          <span className="text-xs text-gray-600 min-w-[50px]">Window {windowIndex + 1}</span>
                          <input
                            type="number"
                            value={window.width || ''}
                            onChange={(e) => updateWindow(room.id, window.id, 'width', parseFloat(e.target.value) || 0)}
                            className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                            placeholder="W"
                            step="0.1"
                            min="0"
                          />
                          <span className="text-xs text-gray-400">×</span>
                          <input
                            type="number"
                            value={window.height || ''}
                            onChange={(e) => updateWindow(room.id, window.id, 'height', parseFloat(e.target.value) || 0)}
                            className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                            placeholder="H"
                            step="0.1"
                            min="0"
                          />
                          <Button
                            onClick={() => removeWindow(room.id, window.id)}
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

              {/* Paint Settings */}
              <div className="space-y-3 pt-3 border-t border-gray-200">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Number of Coats</Label>
                  <select
                    value={coats}
                    onChange={(e) => setCoats(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value={1}>1 Coat</option>
                    <option value={2}>2 Coats (Recommended)</option>
                    <option value={3}>3 Coats</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Paint Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => setPaintType('latex')}
                      variant={paintType === 'latex' ? 'default' : 'outline'}
                      className="text-sm"
                    >
                      Latex
                    </Button>
                    <Button
                      onClick={() => setPaintType('oil')}
                      variant={paintType === 'oil' ? 'default' : 'outline'}
                      className="text-sm"
                    >
                      Oil-Based
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverage" className="text-sm font-medium text-gray-700">
                    Coverage Rate (sq ft/gallon)
                  </Label>
                  <input
                    id="coverage"
                    type="number"
                    value={coverageRate}
                    onChange={(e) => setCoverageRate(Math.max(100, parseInt(e.target.value) || 350))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="100"
                    max="500"
                  />
                  <p className="text-xs text-gray-500">Typical: 350-400 sq ft/gallon</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="primer"
                    checked={needPrimer}
                    onChange={(e) => setNeedPrimer(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Label htmlFor="primer" className="text-sm text-gray-700 cursor-pointer">
                    Include Primer
                  </Label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="paintCost" className="text-xs text-gray-600">Paint Cost/Gal ($)</Label>
                    <input
                      id="paintCost"
                      type="number"
                      value={paintCost}
                      onChange={(e) => setPaintCost(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="primerCost" className="text-xs text-gray-600">Primer Cost/Gal ($)</Label>
                    <input
                      id="primerCost"
                      type="number"
                      value={primerCost}
                      onChange={(e) => setPrimerCost(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={calculatePaint}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Paintbrush className="h-5 w-5 mr-2" />
                Calculate Paint Needed
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
                    <Paintbrush className="h-5 w-5 text-blue-600" />
                    Paint Estimate
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
                          <p className="text-xs text-gray-600">Net Paintable Area</p>
                          <p className="text-xl font-bold text-green-700">
                            {result.netWallArea.toFixed(0)} sq ft
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        ({(result.netWallArea / 10.764).toFixed(1)} m²)
                      </p>
                    </div>

                    {/* Paint Needed */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Paint Required ({coats} coat{coats > 1 ? 's' : ''})</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Gallons</p>
                          <p className="text-3xl font-bold text-green-700">{result.paintGallons}</p>
                          <p className="text-xs text-gray-500 mt-1">US Gallons</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Liters</p>
                          <p className="text-3xl font-bold text-green-700">{result.paintLiters}</p>
                          <p className="text-xs text-gray-500 mt-1">Liters</p>
                        </div>
                      </div>
                    </div>

                    {/* Primer Needed */}
                    {needPrimer && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Primer Required (1 coat)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <p className="text-xs text-gray-600 mb-1">Gallons</p>
                            <p className="text-3xl font-bold text-purple-700">{result.primerGallons}</p>
                            <p className="text-xs text-gray-500 mt-1">US Gallons</p>
                          </div>
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <p className="text-xs text-gray-600 mb-1">Liters</p>
                            <p className="text-3xl font-bold text-purple-700">{result.primerLiters}</p>
                            <p className="text-xs text-gray-500 mt-1">Liters</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cost Estimate */}
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Estimated Cost</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Paint ({result.paintGallons} gal × ${paintCost})</span>
                          <span className="font-semibold">${(result.paintGallons * paintCost).toFixed(2)}</span>
                        </div>
                        {needPrimer && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Primer ({result.primerGallons} gal × ${primerCost})</span>
                            <span className="font-semibold">${(result.primerGallons * primerCost).toFixed(2)}</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-amber-300 flex justify-between">
                          <span className="font-semibold text-gray-900">Total Materials Cost</span>
                          <span className="text-2xl font-bold text-amber-700">${result.totalCost.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">💡 Painting Tips</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Always buy 10-15% extra paint for touch-ups</li>
                        <li>• Use primer on new drywall or when changing colors dramatically</li>
                        <li>• {paintType === 'latex' ? 'Latex paint is easier to clean and has less odor' : 'Oil-based paint is more durable but takes longer to dry'}</li>
                        <li>• Two thin coats are better than one thick coat</li>
                        <li>• Measure doors and windows accurately for precise calculations</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Paintbrush className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Enter room dimensions to calculate paint needed</p>
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
        calculatorName="Paint Calculator"
      />
    </div>
  );
}
