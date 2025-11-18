'use client';

import { useState } from 'react';
import { Save, Share2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';
import html2canvas from 'html2canvas';

interface TileResult {
  roomArea: number;
  tileArea: number;
  tilesNeeded: number;
  tilesWithWaste: number;
  boxes: number;
  groutAmount: number;
  adhesiveAmount: number;
  totalCost: number;
  wastePercentage: number;
}

export default function TileCalculator() {
  // Input mode selection
  const [inputMode, setInputMode] = useState<'dimensions' | 'area'>('dimensions');
  
  // Room dimensions (for dimensions mode)
  const [roomLength, setRoomLength] = useState('20');
  const [roomWidth, setRoomWidth] = useState('15');
  const [roomUnit, setRoomUnit] = useState('meters');
  
  // Total area (for area mode)
  const [totalArea, setTotalArea] = useState('300');
  const [areaUnit, setAreaUnit] = useState('square meters');

  // Tile dimensions
  const [tileLength, setTileLength] = useState('12');
  const [tileWidth, setTileWidth] = useState('12');
  const [tileUnit, setTileUnit] = useState('cm');
  
  // Gap/Spacing
  const [gapSize, setGapSize] = useState('0.25');
  const [gapUnit, setGapUnit] = useState('cm');
  
  // Installation pattern
  const [pattern, setPattern] = useState<'straight' | 'diagonal' | 'herringbone' | 'brick'>('straight');

  // Packaging and cost
  const [tilesPerBox, setTilesPerBox] = useState('12');
  const [tilePrice, setTilePrice] = useState('0');

  const [result, setResult] = useState<TileResult | null>(null);
  
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/tile-calculator',
    getShareParams: () => ({
      rl: roomLength,
      rw: roomWidth,
      ru: roomUnit === 'meters' ? 'm' : 'f',
      tl: tileLength,
      tw: tileWidth,
      tu: tileUnit === 'cm' ? 'c' : tileUnit === 'inches' ? 'i' : 'm',
      gap: gapSize,
      gu: gapUnit === 'cm' ? 'c' : 'i',
      pb: tilesPerBox,
      p: tilePrice,
    }),
    getShareText: () => {
      if (result) {
        return `Tile Calculator: ${result.tilesNeeded.toLocaleString()} tiles needed (${result.boxes} boxes) for ${result.roomArea.toFixed(1)}m²`;
      }
      return 'Calculate your tile requirements with our free Tile Calculator!';
    },
  });

  const calculateTiles = () => {
    const tL = parseFloat(tileLength);
    const tW = parseFloat(tileWidth);
    const gap = parseFloat(gapSize);
    const perBox = parseFloat(tilesPerBox);
    const price = parseFloat(tilePrice);

    // Calculate room area based on input mode
    let roomAreaM2 = 0;
    if (inputMode === 'dimensions') {
      const rL = parseFloat(roomLength);
      const rW = parseFloat(roomWidth);
      roomAreaM2 = rL * rW;
      if (roomUnit === 'feet') {
        roomAreaM2 = roomAreaM2 / 10.764; // ft² to m²
      }
    } else {
      // area mode
      const area = parseFloat(totalArea);
      if (areaUnit === 'square feet') {
        roomAreaM2 = area / 10.764; // ft² to m²
      } else {
        roomAreaM2 = area;
      }
    }

    // Convert tile dimensions to meters including gap
    let tileLengthM = tL;
    let tileWidthM = tW;
    let gapM = gap;

    if (tileUnit === 'cm') {
      tileLengthM = tL / 100;
      tileWidthM = tW / 100;
    } else if (tileUnit === 'inches') {
      tileLengthM = tL * 0.0254;
      tileWidthM = tW * 0.0254;
    }

    if (gapUnit === 'cm') {
      gapM = gap / 100;
    } else if (gapUnit === 'inches') {
      gapM = gap * 0.0254;
    }

    // Tile area including gap
    const effectiveTileLength = tileLengthM + gapM;
    const effectiveTileWidth = tileWidthM + gapM;
    const effectiveTileArea = effectiveTileLength * effectiveTileWidth;

    // Waste percentage based on installation pattern (per requirements)
    const wasteMap = {
      straight: 5,      // 直铺 5%
      diagonal: 10,     // 斜铺 10%
      herringbone: 15,  // 人字拼 15%
      brick: 8,         // 砖形拼 8%
    };
    const wastePercent = wasteMap[pattern];

    // Calculate tiles needed
    const tilesExact = roomAreaM2 / effectiveTileArea;
    const tilesWithWaste = Math.ceil(tilesExact * (1 + wastePercent / 100));
    const boxes = Math.ceil(tilesWithWaste / perBox);

    // Material calculations
    // Grout: ~0.5 kg per 10 m²
    const groutAmount = (roomAreaM2 / 10) * 0.5;
    // Adhesive: ~5 kg per m²
    const adhesiveAmount = roomAreaM2 * 5;

    // Cost calculation
    const tileCost = price > 0 ? tilesWithWaste * price : 0;

    setResult({
      roomArea: roomAreaM2,
      tileArea: effectiveTileArea,
      tilesNeeded: Math.ceil(tilesExact),
      tilesWithWaste,
      boxes,
      groutAmount,
      adhesiveAmount,
      totalCost: tileCost,
      wastePercentage: wastePercent,
    });
  };

  const handleSaveImage = async () => {
    const element = document.getElementById('tile-calculator-result');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
      });

      const link = document.createElement('a');
      link.download = `tile-calculation-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Input Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tile Size */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tile Size</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tileLength" className="text-gray-700">Length</Label>
                  <div className="flex gap-2 mt-1">
                    <input
                      id="tileLength"
                      type="number"
                      value={tileLength}
                      onChange={(e) => setTileLength(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      step="0.1"
                      min="0"
                    />
                    <select
                      value={tileUnit}
                      onChange={(e) => setTileUnit(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="cm">cm</option>
                      <option value="inches">inches</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="tileWidth" className="text-gray-700">Width</Label>
                  <div className="flex gap-2 mt-1">
                    <input
                      id="tileWidth"
                      type="number"
                      value={tileWidth}
                      onChange={(e) => setTileWidth(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      step="0.1"
                      min="0"
                    />
                    <select
                      value={tileUnit}
                      onChange={(e) => setTileUnit(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="cm">cm</option>
                      <option value="inches">inches</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Area to Cover */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Area to Cover</h3>
              
              {/* Mode Selection */}
              <div className="flex gap-4 mb-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="inputMode"
                    checked={inputMode === 'dimensions'}
                    onChange={() => setInputMode('dimensions')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Use Dimensions</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="inputMode"
                    checked={inputMode === 'area'}
                    onChange={() => setInputMode('area')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Use Total Area</span>
                </label>
              </div>

              {inputMode === 'dimensions' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="roomLength" className="text-gray-700">Length</Label>
                    <div className="flex gap-2 mt-1">
                      <input
                        id="roomLength"
                        type="number"
                        value={roomLength}
                        onChange={(e) => setRoomLength(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        step="0.1"
                        min="0"
                      />
                      <select
                        value={roomUnit}
                        onChange={(e) => setRoomUnit(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="meters">meters</option>
                        <option value="feet">feet</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="roomWidth" className="text-gray-700">Width</Label>
                    <div className="flex gap-2 mt-1">
                      <input
                        id="roomWidth"
                        type="number"
                        value={roomWidth}
                        onChange={(e) => setRoomWidth(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        step="0.1"
                        min="0"
                      />
                      <select
                        value={roomUnit}
                        onChange={(e) => setRoomUnit(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="meters">meters</option>
                        <option value="feet">feet</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Label htmlFor="totalArea" className="text-gray-700">Total Area</Label>
                  <div className="flex gap-2 mt-1">
                    <input
                      id="totalArea"
                      type="number"
                      value={totalArea}
                      onChange={(e) => setTotalArea(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      step="0.1"
                      min="0"
                    />
                    <select
                      value={areaUnit}
                      onChange={(e) => setAreaUnit(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="square meters">square meters</option>
                      <option value="square feet">square feet</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Installation Pattern & Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Installation Details</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pattern" className="text-gray-700">Installation Pattern</Label>
                  <select
                    id="pattern"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="straight">Straight (5% waste)</option>
                    <option value="diagonal">Diagonal (10% waste)</option>
                    <option value="herringbone">Herringbone (15% waste)</option>
                    <option value="brick">Brick/Offset (8% waste)</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gapSize" className="text-gray-700">Gap Size</Label>
                    <div className="flex gap-2 mt-1">
                      <input
                        id="gapSize"
                        type="number"
                        value={gapSize}
                        onChange={(e) => setGapSize(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        step="0.01"
                        min="0"
                      />
                      <select
                        value={gapUnit}
                        onChange={(e) => setGapUnit(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="cm">cm</option>
                        <option value="inches">inches</option>
                      </select>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Grout spacing between tiles</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="tilesPerBox" className="text-gray-700">Tiles per Box</Label>
                    <input
                      id="tilesPerBox"
                      type="number"
                      value={tilesPerBox}
                      onChange={(e) => setTilesPerBox(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="tilePrice" className="text-gray-700">Price per Tile (optional)</Label>
                  <div className="flex gap-2 mt-1">
                    <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">$</span>
                    <input
                      id="tilePrice"
                      type="number"
                      value={tilePrice}
                      onChange={(e) => setTilePrice(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="flex gap-3">
              <Button
                onClick={calculateTiles}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                Calculate Tiles
              </Button>
              <Button
                onClick={() => setResult(null)}
                variant="outline"
                className="px-8"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Right - Results */}
          <div className="lg:col-span-1">
            <div id="tile-calculator-result" className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-20">
              {result ? (
                <div className="p-6 space-y-6">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-b-2 border-blue-500">
                    <h3 className="text-xl font-bold text-gray-900">Calculation Results</h3>
                  </div>

                  {/* Main Results */}
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-sm text-gray-600">Tiles Needed (exact):</span>
                        <span className="text-2xl font-bold text-blue-700">
                          {result.tilesNeeded.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm text-gray-600">With {result.wastePercentage}% waste:</span>
                        <span className="text-3xl font-bold text-gray-900">
                          {result.tilesWithWaste.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Boxes Needed</p>
                        <p className="text-2xl font-bold text-gray-900">{result.boxes.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Total Area</p>
                        <p className="text-lg font-semibold text-gray-900">{result.roomArea.toFixed(1)}m²</p>
                      </div>
                    </div>
                  </div>

                  {/* Materials */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Materials Needed</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Grout:</span>
                        <span className="text-sm font-medium text-gray-900">{result.groutAmount.toFixed(1)} kg</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Adhesive:</span>
                        <span className="text-sm font-medium text-gray-900">{result.adhesiveAmount.toFixed(1)} kg</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                    <p className="text-sm text-gray-800">
                      💡 <strong>Pro tip:</strong> Purchase 5-10% extra ({Math.round(result.tilesNeeded * 1.05)} - {Math.round(result.tilesNeeded * 1.10)} tiles) for cutting waste and future repairs.
                    </p>
                  </div>

                  {/* Cost */}
                  {result.totalCost > 0 && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-t-2 border-blue-500">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Estimated Total Cost:</span>
                        <span className="text-2xl font-bold text-blue-700">
                          ${result.totalCost.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                    <Button onClick={handleSaveImage} variant="outline" className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save as Image
                    </Button>
                    <Button onClick={handleShare} variant="outline" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Result
                    </Button>
                    <Button onClick={handlePrint} variant="outline" className="w-full">
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="text-6xl mb-4">🏠</div>
                  <p className="text-gray-500">Enter your room dimensions and tile details to calculate requirements</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Tile Calculator"
      />
    </>
  );
}

