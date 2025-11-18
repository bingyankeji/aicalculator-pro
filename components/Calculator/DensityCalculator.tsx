'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Layers, Box, Weight, Download, Share2, Printer } from 'lucide-react';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';
import html2canvas from 'html2canvas';

type CalculationMode = 'density' | 'volume' | 'mass';

interface CalculationResult {
  density?: number;
  volume?: number;
  mass?: number;
  densityUnit: string;
  volumeUnit: string;
  massUnit: string;
}

export default function DensityCalculator() {
  const [mode, setMode] = useState<CalculationMode>('density');
  
  // Density calculation inputs
  const [densityInputs, setDensityInputs] = useState({
    mass: '',
    massUnit: 'kg',
    volume: '',
    volumeUnit: 'm3',
  });

  // Volume calculation inputs
  const [volumeInputs, setVolumeInputs] = useState({
    mass: '',
    massUnit: 'kg',
    density: '',
    densityUnit: 'kg/m3',
  });

  // Mass calculation inputs
  const [massInputs, setMassInputs] = useState({
    density: '',
    densityUnit: 'kg/m3',
    volume: '',
    volumeUnit: 'm3',
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const { showShareModal, setShowShareModal, shareUrl, shareTitle, shareDescription, handleShare } = useShare({
    title: 'Density Calculator - Calculate Density, Volume & Mass',
    description: 'Free density calculator for accurate density, volume, and mass calculations with multiple units.',
  });

  // Unit conversion factors
  const densityUnits: Record<string, { label: string; toKgM3: number }> = {
    'kg/m3': { label: 'kg/m³', toKgM3: 1 },
    'g/cm3': { label: 'g/cm³', toKgM3: 1000 },
    'lb/ft3': { label: 'lb/ft³', toKgM3: 16.0185 },
    'kg/L': { label: 'kg/L', toKgM3: 1000 },
  };

  const massUnits: Record<string, { label: string; toKg: number }> = {
    'kg': { label: 'kilogram', toKg: 1 },
    'g': { label: 'gram', toKg: 0.001 },
    'lb': { label: 'pound', toKg: 0.453592 },
    'oz': { label: 'ounce', toKg: 0.0283495 },
  };

  const volumeUnits: Record<string, { label: string; toM3: number }> = {
    'm3': { label: 'cubic meter', toM3: 1 },
    'cm3': { label: 'cubic centimeter', toM3: 0.000001 },
    'L': { label: 'liter', toM3: 0.001 },
    'mL': { label: 'milliliter', toM3: 0.000001 },
    'ft3': { label: 'cubic foot', toM3: 0.0283168 },
  };

  const calculateDensity = () => {
    const mass = parseFloat(densityInputs.mass);
    const volume = parseFloat(densityInputs.volume);

    if (isNaN(mass) || isNaN(volume)) {
      alert('Please enter valid numbers.');
      return;
    }

    if (volume === 0) {
      alert('Volume cannot be zero.');
      return;
    }

    // Convert to standard units (kg, m³)
    const massInKg = mass * massUnits[densityInputs.massUnit].toKg;
    const volumeInM3 = volume * volumeUnits[densityInputs.volumeUnit].toM3;

    // Calculate density in kg/m³
    const densityKgM3 = massInKg / volumeInM3;

    setResult({
      density: densityKgM3,
      densityUnit: 'kg/m³',
      volumeUnit: densityInputs.volumeUnit,
      massUnit: densityInputs.massUnit,
    });
  };

  const calculateVolume = () => {
    const mass = parseFloat(volumeInputs.mass);
    const density = parseFloat(volumeInputs.density);

    if (isNaN(mass) || isNaN(density)) {
      alert('Please enter valid numbers.');
      return;
    }

    if (density === 0) {
      alert('Density cannot be zero.');
      return;
    }

    // Convert to standard units
    const massInKg = mass * massUnits[volumeInputs.massUnit].toKg;
    const densityInKgM3 = density * densityUnits[volumeInputs.densityUnit].toKgM3;

    // Calculate volume in m³
    const volumeM3 = massInKg / densityInKgM3;

    setResult({
      volume: volumeM3,
      volumeUnit: 'm³',
      massUnit: volumeInputs.massUnit,
      densityUnit: volumeInputs.densityUnit,
    });
  };

  const calculateMass = () => {
    const density = parseFloat(massInputs.density);
    const volume = parseFloat(massInputs.volume);

    if (isNaN(density) || isNaN(volume)) {
      alert('Please enter valid numbers.');
      return;
    }

    // Convert to standard units
    const densityInKgM3 = density * densityUnits[massInputs.densityUnit].toKgM3;
    const volumeInM3 = volume * volumeUnits[massInputs.volumeUnit].toM3;

    // Calculate mass in kg
    const massKg = densityInKgM3 * volumeInM3;

    setResult({
      mass: massKg,
      massUnit: 'kg',
      densityUnit: massInputs.densityUnit,
      volumeUnit: massInputs.volumeUnit,
    });
  };

  const handleCalculate = () => {
    if (mode === 'density') {
      calculateDensity();
    } else if (mode === 'volume') {
      calculateVolume();
    } else {
      calculateMass();
    }
  };

  const clearInputs = () => {
    if (mode === 'density') {
      setDensityInputs({ mass: '', massUnit: 'kg', volume: '', volumeUnit: 'm3' });
    } else if (mode === 'volume') {
      setVolumeInputs({ mass: '', massUnit: 'kg', density: '', densityUnit: 'kg/m3' });
    } else {
      setMassInputs({ density: '', densityUnit: 'kg/m3', volume: '', volumeUnit: 'm3' });
    }
    setResult(null);
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;

    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `density-calculator-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          {/* Input Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-3">
              <CardTitle className="text-xl text-gray-900 mb-3">Density Calculator</CardTitle>
              {/* Mode Selector Tabs */}
              <div className="flex gap-2 bg-white p-1 rounded-lg">
                <Button
                  onClick={() => { setMode('density'); setResult(null); }}
                  variant={mode === 'density' ? 'default' : 'ghost'}
                  className={`flex-1 ${mode === 'density' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Layers className="h-4 w-4 mr-1" />
                  Density
                </Button>
                <Button
                  onClick={() => { setMode('volume'); setResult(null); }}
                  variant={mode === 'volume' ? 'default' : 'ghost'}
                  className={`flex-1 ${mode === 'volume' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Box className="h-4 w-4 mr-1" />
                  Volume
                </Button>
                <Button
                  onClick={() => { setMode('mass'); setResult(null); }}
                  variant={mode === 'mass' ? 'default' : 'ghost'}
                  className={`flex-1 ${mode === 'mass' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Weight className="h-4 w-4 mr-1" />
                  Mass
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Density Mode */}
              {mode === 'density' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="density-mass" className="text-sm font-medium">
                      Mass <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <input
                        id="density-mass"
                        type="number"
                        value={densityInputs.mass}
                        onChange={(e) => setDensityInputs({ ...densityInputs, mass: e.target.value })}
                        className="w-full px-4 py-3 pr-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="8900"
                        step="0.01"
                        min="0"
                      />
                      <select
                        value={densityInputs.massUnit}
                        onChange={(e) => setDensityInputs({ ...densityInputs, massUnit: e.target.value })}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm border-0 bg-transparent focus:ring-0"
                      >
                        {Object.entries(massUnits).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="density-volume" className="text-sm font-medium">
                      Volume <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <input
                        id="density-volume"
                        type="number"
                        value={densityInputs.volume}
                        onChange={(e) => setDensityInputs({ ...densityInputs, volume: e.target.value })}
                        className="w-full px-4 py-3 pr-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1"
                        step="0.01"
                        min="0"
                      />
                      <select
                        value={densityInputs.volumeUnit}
                        onChange={(e) => setDensityInputs({ ...densityInputs, volumeUnit: e.target.value })}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm border-0 bg-transparent focus:ring-0"
                      >
                        {Object.entries(volumeUnits).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Volume Mode */}
              {mode === 'volume' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="volume-mass" className="text-sm font-medium">
                      Mass <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <input
                        id="volume-mass"
                        type="number"
                        value={volumeInputs.mass}
                        onChange={(e) => setVolumeInputs({ ...volumeInputs, mass: e.target.value })}
                        className="w-full px-4 py-3 pr-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="8900"
                        step="0.01"
                        min="0"
                      />
                      <select
                        value={volumeInputs.massUnit}
                        onChange={(e) => setVolumeInputs({ ...volumeInputs, massUnit: e.target.value })}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm border-0 bg-transparent focus:ring-0"
                      >
                        {Object.entries(massUnits).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="volume-density" className="text-sm font-medium">
                      Density <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <input
                        id="volume-density"
                        type="number"
                        value={volumeInputs.density}
                        onChange={(e) => setVolumeInputs({ ...volumeInputs, density: e.target.value })}
                        className="w-full px-4 py-3 pr-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="8900"
                        step="0.01"
                        min="0"
                      />
                      <select
                        value={volumeInputs.densityUnit}
                        onChange={(e) => setVolumeInputs({ ...volumeInputs, densityUnit: e.target.value })}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm border-0 bg-transparent focus:ring-0"
                      >
                        {Object.entries(densityUnits).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Mass Mode */}
              {mode === 'mass' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="mass-density" className="text-sm font-medium">
                      Density <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <input
                        id="mass-density"
                        type="number"
                        value={massInputs.density}
                        onChange={(e) => setMassInputs({ ...massInputs, density: e.target.value })}
                        className="w-full px-4 py-3 pr-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="8900"
                        step="0.01"
                        min="0"
                      />
                      <select
                        value={massInputs.densityUnit}
                        onChange={(e) => setMassInputs({ ...massInputs, densityUnit: e.target.value })}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm border-0 bg-transparent focus:ring-0"
                      >
                        {Object.entries(densityUnits).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mass-volume" className="text-sm font-medium">
                      Volume <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <input
                        id="mass-volume"
                        type="number"
                        value={massInputs.volume}
                        onChange={(e) => setMassInputs({ ...massInputs, volume: e.target.value })}
                        className="w-full px-4 py-3 pr-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1"
                        step="0.01"
                        min="0"
                      />
                      <select
                        value={massInputs.volumeUnit}
                        onChange={(e) => setMassInputs({ ...massInputs, volumeUnit: e.target.value })}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm border-0 bg-transparent focus:ring-0"
                      >
                        {Object.entries(volumeUnits).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleCalculate}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 min-h-[44px]"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate
                </Button>
                <Button
                  onClick={clearInputs}
                  variant="outline"
                  className="flex-1 text-gray-600 border-gray-300 hover:bg-gray-50 font-medium py-3 min-h-[44px]"
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Calculation Results</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
                      <p className="text-sm text-gray-600 mb-2">Result:</p>
                      {result.density !== undefined && (
                        <p className="text-3xl font-bold text-blue-700">
                          {result.density.toFixed(2)} {result.densityUnit}
                        </p>
                      )}
                      {result.volume !== undefined && (
                        <p className="text-3xl font-bold text-blue-700">
                          {result.volume.toFixed(6)} {result.volumeUnit}
                        </p>
                      )}
                      {result.mass !== undefined && (
                        <p className="text-3xl font-bold text-blue-700">
                          {result.mass.toFixed(2)} {result.massUnit}
                        </p>
                      )}
                    </div>

                    {/* Unit Conversions */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Unit Conversions</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {result.density !== undefined && Object.entries(densityUnits).map(([key, unit]) => {
                          const converted = result.density! / unit.toKgM3;
                          return (
                            <div key={key} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                              <p className="text-sm text-gray-600">{unit.label}</p>
                              <p className="text-lg font-semibold text-gray-900">{converted.toFixed(4)}</p>
                            </div>
                          );
                        })}
                        {result.volume !== undefined && Object.entries(volumeUnits).map(([key, unit]) => {
                          const volumeInM3 = result.volume! * (key === 'm3' ? 1 : 1);
                          const converted = volumeInM3 / unit.toM3;
                          return (
                            <div key={key} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                              <p className="text-sm text-gray-600">{unit.label}</p>
                              <p className="text-lg font-semibold text-gray-900">{converted.toFixed(6)}</p>
                            </div>
                          );
                        })}
                        {result.mass !== undefined && Object.entries(massUnits).map(([key, unit]) => {
                          const converted = result.mass! / unit.toKg;
                          return (
                            <div key={key} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                              <p className="text-sm text-gray-600">{unit.label}</p>
                              <p className="text-lg font-semibold text-gray-900">{converted.toFixed(2)}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Share and Export Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      <Button
                        onClick={handleShare}
                        className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button
                        onClick={handleSaveAsImage}
                        className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Save as Image
                      </Button>
                      <Button
                        onClick={handlePrint}
                        className="flex-1 sm:flex-none bg-gray-600 hover:bg-gray-700 text-white"
                      >
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Enter values and click Calculate to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareUrl={shareUrl}
        shareTitle={shareTitle}
        shareDescription={shareDescription}
      />
    </div>
  );
}

