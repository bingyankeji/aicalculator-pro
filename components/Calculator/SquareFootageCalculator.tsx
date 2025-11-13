'use client';

import React, { useState, useEffect } from 'react';
import { Home, Plus, Trash2, Calculator, Package, DollarSign, Share2, Save, Printer } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

interface Room {
  id: string;
  name: string;
  length: number;
  width: number;
  unit: 'feet' | 'meters';
}

interface MaterialEstimate {
  flooring: {
    sqft: number;
    tiles: number;
    boxes: number;
    wasteFactor: number;
  };
  paint: {
    wallArea: number;
    gallons: number;
    coats: number;
  };
  carpet: {
    sqft: number;
    sqyards: number;
    rolls: number;
  };
}

export function SquareFootageCalculator() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', name: 'Living Room', length: 15, width: 12, unit: 'feet' },
  ]);
  const [ceilingHeight, setCeilingHeight] = useState<number>(8);
  const [wasteFactor, setWasteFactor] = useState<number>(10);
  const [paintCoats, setPaintCoats] = useState<number>(2);
  const [paintCoverage, setPaintCoverage] = useState<number>(350);
  const [materialPrices, setMaterialPrices] = useState({
    flooringPerSqFt: 3.5,
    paintPerGallon: 35,
    carpetPerSqYd: 25,
  });

  const [totalArea, setTotalArea] = useState<number>(0);
  const [materials, setMaterials] = useState<MaterialEstimate | null>(null);

  const addRoom = () => {
    const newId = (Math.max(...rooms.map(r => parseInt(r.id)), 0) + 1).toString();
    setRooms([...rooms, { id: newId, name: `Room ${newId}`, length: 10, width: 10, unit: 'feet' }]);
  };

  const removeRoom = (id: string) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter(r => r.id !== id));
    }
  };

  const updateRoom = (id: string, field: keyof Room, value: any) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const calculateTotals = () => {
    // Calculate total square footage
    let total = 0;
    rooms.forEach(room => {
      const area = room.length * room.width;
      // Convert to square feet if in meters
      const sqft = room.unit === 'meters' ? area * 10.764 : area;
      total += sqft;
    });
    setTotalArea(total);

    // Calculate material estimates
    const wasteMultiplier = 1 + (wasteFactor / 100);
    
    // Flooring (tiles, laminate, hardwood)
    const flooringSqFt = total * wasteMultiplier;
    const tilesNeeded = Math.ceil(flooringSqFt / 1.33); // Assuming 16"x16" tiles (1.33 sqft each)
    const boxesNeeded = Math.ceil(tilesNeeded / 10); // 10 tiles per box typically

    // Paint (walls only)
    const perimeter = rooms.reduce((sum, room) => {
      const p = 2 * (room.length + room.width);
      return sum + (room.unit === 'meters' ? p * 3.281 : p);
    }, 0);
    const wallArea = perimeter * ceilingHeight;
    const paintableArea = wallArea * paintCoats;
    const gallonsNeeded = Math.ceil(paintableArea / paintCoverage);

    // Carpet
    const carpetSqFt = total * wasteMultiplier;
    const carpetSqYards = carpetSqFt / 9;
    const carpetRolls = Math.ceil(carpetSqYards / 45); // Assuming 45 sq yd per roll

    setMaterials({
      flooring: {
        sqft: flooringSqFt,
        tiles: tilesNeeded,
        boxes: boxesNeeded,
        wasteFactor,
      },
      paint: {
        wallArea,
        gallons: gallonsNeeded,
        coats: paintCoats,
      },
      carpet: {
        sqft: carpetSqFt,
        sqyards: carpetSqYards,
        rolls: carpetRolls,
      },
    });
  };

  useEffect(() => {
    calculateTotals();
  }, [rooms, wasteFactor, paintCoats, paintCoverage, ceilingHeight]);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/square-footage-calculator',
    getShareParams: () => {
      const params: any = {
        ta: totalArea.toFixed(0),
        rc: rooms.length.toString(),
      };
      rooms.forEach((room, index) => {
        params[`r${index}n`] = room.name;
        params[`r${index}l`] = room.length.toString();
        params[`r${index}w`] = room.width.toString();
        params[`r${index}u`] = room.unit;
      });
      return params;
    },
    getShareText: () =>
      `Total Area: ${totalArea.toFixed(0)} sq ft | ${rooms.length} room${rooms.length > 1 ? 's' : ''} | Materials estimated`,
  });

  const handleSaveImage = async () => {
    const element = document.getElementById('sqft-result');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'square-footage-calculation.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-5 gap-6">
        {/* Input Section - 3 columns */}
        <div className="md:col-span-3 space-y-6">
          {/* Rooms */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Home className="w-5 h-5 text-blue-600" />
                Rooms ({rooms.length})
              </h3>
              <button
                onClick={addRoom}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Room
              </button>
            </div>

            <div className="space-y-4">
              {rooms.map((room, index) => (
                <div key={room.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="text"
                      value={room.name}
                      onChange={(e) => updateRoom(room.id, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold"
                      placeholder="Room name"
                    />
                    {rooms.length > 1 && (
                      <button
                        onClick={() => removeRoom(room.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove room"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Length
                      </label>
                      <input
                        type="number"
                        value={room.length || ''}
                        onChange={(e) => updateRoom(room.id, 'length', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="15"
                        step="0.1"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Width
                      </label>
                      <input
                        type="number"
                        value={room.width || ''}
                        onChange={(e) => updateRoom(room.id, 'width', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="12"
                        step="0.1"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Unit
                      </label>
                      <select
                        value={room.unit}
                        onChange={(e) => updateRoom(room.id, 'unit', e.target.value as 'feet' | 'meters')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="feet">Feet</option>
                        <option value="meters">Meters</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-600">
                    Area: <span className="font-bold text-gray-900">
                      {(room.length * room.width).toFixed(1)} {room.unit === 'feet' ? 'sq ft' : 'sq m'}
                    </span>
                    {room.unit === 'meters' && (
                      <span className="text-xs text-gray-500 ml-2">
                        ({(room.length * room.width * 10.764).toFixed(1)} sq ft)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Material Settings */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-green-600" />
              Material Settings
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Waste Factor (%)
                  </label>
                  <input
                    type="number"
                    value={wasteFactor || ''}
                    onChange={(e) => setWasteFactor(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="10"
                    step="1"
                    min="0"
                    max="50"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: 10-15% for tiles, 5-10% for carpet
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ceiling Height (ft)
                  </label>
                  <input
                    type="number"
                    value={ceilingHeight || ''}
                    onChange={(e) => setCeilingHeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="8"
                    step="0.5"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For paint calculation
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paint Coats
                  </label>
                  <input
                    type="number"
                    value={paintCoats || ''}
                    onChange={(e) => setPaintCoats(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="2"
                    min="1"
                    max="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paint Coverage (sq ft/gallon)
                  </label>
                  <input
                    type="number"
                    value={paintCoverage || ''}
                    onChange={(e) => setPaintCoverage(parseInt(e.target.value) || 350)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="350"
                    min="200"
                    max="500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Typical: 350-400 sq ft per gallon
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Material Prices */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              Material Prices (Optional)
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flooring ($/sq ft)
                </label>
                <input
                  type="number"
                  value={materialPrices.flooringPerSqFt || ''}
                  onChange={(e) => setMaterialPrices({ ...materialPrices, flooringPerSqFt: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="3.50"
                  step="0.1"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paint ($/gallon)
                </label>
                <input
                  type="number"
                  value={materialPrices.paintPerGallon || ''}
                  onChange={(e) => setMaterialPrices({ ...materialPrices, paintPerGallon: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="35"
                  step="1"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Carpet ($/sq yd)
                </label>
                <input
                  type="number"
                  value={materialPrices.carpetPerSqYd || ''}
                  onChange={(e) => setMaterialPrices({ ...materialPrices, carpetPerSqYd: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="25"
                  step="1"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section - 2 columns */}
        <div className="md:col-span-2 space-y-6">
          {materials && (
            <>
              <div id="sqft-result" className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg border border-blue-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Total Area & Materials
                </h3>

                {/* Total Area */}
                <div className="bg-white rounded-lg p-5 mb-4 border-2 border-blue-300">
                  <div className="text-xs text-gray-600 mb-2 font-semibold">Total Square Footage</div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {totalArea.toFixed(0)} sq ft
                  </div>
                  <div className="text-sm text-gray-600">
                    {(totalArea * 0.092903).toFixed(1)} square meters
                  </div>
                </div>

                {/* Flooring Estimate */}
                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                  <div className="text-sm font-bold text-gray-900 mb-3">Flooring (Tile/Laminate/Hardwood)</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Required Area:</span>
                      <span className="font-semibold">{materials.flooring.sqft.toFixed(0)} sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tiles (16"×16"):</span>
                      <span className="font-semibold">{materials.flooring.tiles} tiles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Boxes (10/box):</span>
                      <span className="font-semibold">{materials.flooring.boxes} boxes</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-600">Estimated Cost:</span>
                      <span className="font-bold text-green-600">
                        ${(materials.flooring.sqft * materialPrices.flooringPerSqFt).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Paint Estimate */}
                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                  <div className="text-sm font-bold text-gray-900 mb-3">Paint (Walls)</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wall Area:</span>
                      <span className="font-semibold">{materials.paint.wallArea.toFixed(0)} sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coats:</span>
                      <span className="font-semibold">{materials.paint.coats}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gallons Needed:</span>
                      <span className="font-semibold">{materials.paint.gallons} gallons</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-600">Estimated Cost:</span>
                      <span className="font-bold text-green-600">
                        ${(materials.paint.gallons * materialPrices.paintPerGallon).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Carpet Estimate */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-sm font-bold text-gray-900 mb-3">Carpet</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Required Area:</span>
                      <span className="font-semibold">{materials.carpet.sqft.toFixed(0)} sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Square Yards:</span>
                      <span className="font-semibold">{materials.carpet.sqyards.toFixed(1)} sq yd</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rolls (45 sq yd/roll):</span>
                      <span className="font-semibold">{materials.carpet.rolls} rolls</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-600">Estimated Cost:</span>
                      <span className="font-bold text-green-600">
                        ${(materials.carpet.sqyards * materialPrices.carpetPerSqYd).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total Cost Summary */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border-2 border-green-300 mt-4">
                  <div className="text-sm font-bold text-gray-900 mb-2">Total Material Costs</div>
                  <div className="space-y-1 text-xs text-gray-700 mb-3">
                    <div className="flex justify-between">
                      <span>Flooring:</span>
                      <span>${(materials.flooring.sqft * materialPrices.flooringPerSqFt).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Paint:</span>
                      <span>${(materials.paint.gallons * materialPrices.paintPerGallon).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carpet:</span>
                      <span>${(materials.carpet.sqyards * materialPrices.carpetPerSqYd).toFixed(0)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-green-300">
                    <span className="font-bold text-gray-900">Grand Total:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${(
                        materials.flooring.sqft * materialPrices.flooringPerSqFt +
                        materials.paint.gallons * materialPrices.paintPerGallon +
                        materials.carpet.sqyards * materialPrices.carpetPerSqYd
                      ).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleShare}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Results
                  </button>
                  <button
                    onClick={handleSaveImage}
                    className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save as Image
                  </button>
                  <button
                    onClick={handlePrint}
                    className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg border border-yellow-200 p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">💡 Pro Tips</h3>
                <div className="space-y-2 text-xs text-gray-700">
                  <p><strong>Waste Factor:</strong> Always order 10-15% extra material to account for cuts, mistakes, and irregular room shapes.</p>
                  <p><strong>Room Shape:</strong> For L-shaped or irregular rooms, break them into rectangles and measure separately.</p>
                  <p><strong>Pattern Matching:</strong> Patterned tiles or carpet may require 15-20% waste factor for proper alignment.</p>
                  <p><strong>Paint Estimate:</strong> Assumes 2 coats. Darker colors or poor surfaces may need 3+ coats.</p>
                  <p><strong>Professional Installation:</strong> Add $2-8/sq ft for labor costs depending on material complexity.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Square Footage Calculator"
      />
    </div>
  );
}

