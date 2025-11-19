'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

// Horsepower conversion factors (to watts)
const POWER_UNITS = {
  'Mechanical Horsepower': { factor: 745.699872, symbol: 'hp' },
  'Metric Horsepower': { factor: 735.49875, symbol: 'PS' },
  'Kilowatt': { factor: 1000, symbol: 'kW' },
  'Watt': { factor: 1, symbol: 'W' },
  'BTU/hour': { factor: 0.29307107, symbol: 'BTU/h' },
  'Foot-pound/second': { factor: 1.3558179483, symbol: 'ft⋅lb/s' },
};

// Force units (to newtons)
const FORCE_UNITS = {
  'newton': 1,
  'kilonewton': 1000,
  'pound-force': 4.4482216152605,
  'kilogram-force': 9.80665,
};

// Distance units (to meters)
const DISTANCE_UNITS = {
  'meter': 1,
  'kilometer': 1000,
  'foot': 0.3048,
  'mile': 1609.344,
  'yard': 0.9144,
};

// Time units (to seconds)
const TIME_UNITS = {
  'second': 1,
  'minute': 60,
  'hour': 3600,
};

interface DefinitionInputs {
  force: string;
  forceUnit: keyof typeof FORCE_UNITS;
  distance: string;
  distanceUnit: keyof typeof DISTANCE_UNITS;
  time: string;
  timeUnit: keyof typeof TIME_UNITS;
}

interface ConversionInputs {
  amount: string;
  fromUnit: keyof typeof POWER_UNITS;
  toUnit: keyof typeof POWER_UNITS;
}

interface TorqueInputs {
  torque: string;
  rpm: string;
}

export default function HorsepowerCalculator() {
  const [definitionInputs, setDefinitionInputs] = useState<DefinitionInputs>({
    force: '10',
    forceUnit: 'newton',
    distance: '3',
    distanceUnit: 'meter',
    time: '2',
    timeUnit: 'second',
  });

  const [conversionInputs, setConversionInputs] = useState<ConversionInputs>({
    amount: '1',
    fromUnit: 'Mechanical Horsepower',
    toUnit: 'Watt',
  });

  const [torqueInputs, setTorqueInputs] = useState<TorqueInputs>({
    torque: '100',
    rpm: '5000',
  });

  const [definitionResult, setDefinitionResult] = useState<number | null>(null);
  const [conversionResult, setConversionResult] = useState<number | null>(null);
  const [torqueResult, setTorqueResult] = useState<number | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/horsepower-calculator',
    getShareParams: () => ({}),
    getShareText: () => {
      return "Calculate horsepower, convert power units, and analyze torque with our Horsepower Calculator";
    },
  });

  const calculateFromDefinition = () => {
    const force = parseFloat(definitionInputs.force);
    const distance = parseFloat(definitionInputs.distance);
    const time = parseFloat(definitionInputs.time);

    if (isNaN(force) || isNaN(distance) || isNaN(time) || force <= 0 || distance <= 0 || time <= 0) {
      alert('Please enter valid positive numbers for force, distance, and time.');
      return;
    }

    // Convert to SI units
    const forceN = force * FORCE_UNITS[definitionInputs.forceUnit];
    const distanceM = distance * DISTANCE_UNITS[definitionInputs.distanceUnit];
    const timeS = time * TIME_UNITS[definitionInputs.timeUnit];

    // Power = Force × Distance / Time (watts)
    const powerW = (forceN * distanceM) / timeS;

    setDefinitionResult(powerW);
  };

  const calculateConversion = () => {
    const amount = parseFloat(conversionInputs.amount);

    if (isNaN(amount) || amount < 0) {
      alert('Please enter a valid non-negative number.');
      return;
    }

    // Convert to watts first, then to target unit
    const watts = amount * POWER_UNITS[conversionInputs.fromUnit].factor;
    const result = watts / POWER_UNITS[conversionInputs.toUnit].factor;

    setConversionResult(result);
  };

  const calculateFromTorque = () => {
    const torque = parseFloat(torqueInputs.torque);
    const rpm = parseFloat(torqueInputs.rpm);

    if (isNaN(torque) || isNaN(rpm) || torque <= 0 || rpm <= 0) {
      alert('Please enter valid positive numbers for torque and RPM.');
      return;
    }

    // HP = (Torque × RPM) / 5252
    const horsepower = (torque * rpm) / 5252;

    setTorqueResult(horsepower);
  };

  const handleReset = () => {
    setDefinitionInputs({
      force: '10',
      forceUnit: 'newton',
      distance: '3',
      distanceUnit: 'meter',
      time: '2',
      timeUnit: 'second',
    });
    setConversionInputs({
      amount: '1',
      fromUnit: 'Mechanical Horsepower',
      toUnit: 'Watt',
    });
    setTorqueInputs({
      torque: '100',
      rpm: '5000',
    });
    setDefinitionResult(null);
    setConversionResult(null);
    setTorqueResult(null);
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
      link.download = `horsepower-calculator-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Horsepower Calculator Results</title>
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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* Definition-Based Calculator */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">Horsepower Calculation Based on Definition</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-xs text-gray-600 mb-4">
                By definition: Power = force × distance / time
              </p>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Force:</Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={definitionInputs.force}
                    onChange={(e) => setDefinitionInputs(prev => ({ ...prev, force: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10"
                    step="0.01"
                  />
                  <select
                    value={definitionInputs.forceUnit}
                    onChange={(e) => setDefinitionInputs(prev => ({ ...prev, forceUnit: e.target.value as keyof typeof FORCE_UNITS }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(FORCE_UNITS).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Distance:</Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={definitionInputs.distance}
                    onChange={(e) => setDefinitionInputs(prev => ({ ...prev, distance: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="3"
                    step="0.01"
                  />
                  <select
                    value={definitionInputs.distanceUnit}
                    onChange={(e) => setDefinitionInputs(prev => ({ ...prev, distanceUnit: e.target.value as keyof typeof DISTANCE_UNITS }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(DISTANCE_UNITS).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Time:</Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={definitionInputs.time}
                    onChange={(e) => setDefinitionInputs(prev => ({ ...prev, time: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2"
                    step="0.01"
                  />
                  <select
                    value={definitionInputs.timeUnit}
                    onChange={(e) => setDefinitionInputs(prev => ({ ...prev, timeUnit: e.target.value as keyof typeof TIME_UNITS }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(TIME_UNITS).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button 
                onClick={calculateFromDefinition}
                className="w-full bg-green-600 hover:bg-green-700 gap-2"
              >
                <Calculator className="h-4 w-4" />
                Calculate
              </Button>
            </CardContent>
          </Card>

          {/* Conversion Calculator */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">Horsepower Converter</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-xs text-gray-600 mb-4">
                Converts between different units of power.
              </p>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Amount:</Label>
                <input
                  type="number"
                  value={conversionInputs.amount}
                  onChange={(e) => setConversionInputs(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Convert From:</Label>
                <select
                  value={conversionInputs.fromUnit}
                  onChange={(e) => setConversionInputs(prev => ({ ...prev, fromUnit: e.target.value as keyof typeof POWER_UNITS }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.keys(POWER_UNITS).map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Convert To:</Label>
                <select
                  value={conversionInputs.toUnit}
                  onChange={(e) => setConversionInputs(prev => ({ ...prev, toUnit: e.target.value as keyof typeof POWER_UNITS }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.keys(POWER_UNITS).map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <Button 
                onClick={calculateConversion}
                className="w-full bg-green-600 hover:bg-green-700 gap-2"
              >
                <Calculator className="h-4 w-4" />
                Calculate
              </Button>
            </CardContent>
          </Card>

          {/* Torque to HP Calculator */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">Torque to Horsepower</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-xs text-gray-600 mb-4">
                Calculate horsepower from torque and RPM
              </p>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Torque (lb-ft):</Label>
                <input
                  type="number"
                  value={torqueInputs.torque}
                  onChange={(e) => setTorqueInputs(prev => ({ ...prev, torque: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="100"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">RPM (Revolutions per Minute):</Label>
                <input
                  type="number"
                  value={torqueInputs.rpm}
                  onChange={(e) => setTorqueInputs(prev => ({ ...prev, rpm: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5000"
                  step="1"
                />
              </div>

              <Button 
                onClick={calculateFromTorque}
                className="w-full bg-green-600 hover:bg-green-700 gap-2"
              >
                <Calculator className="h-4 w-4" />
                Calculate
              </Button>
            </CardContent>
          </Card>

          {/* Reset Button */}
          <Button 
            onClick={handleReset}
            variant="outline"
            className="w-full gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Clear All
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-3">
          <div ref={resultRef}>
            {(definitionResult !== null || conversionResult !== null || torqueResult !== null) ? (
              <div className="space-y-6">
                {/* Definition Result */}
                {definitionResult !== null && (
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">Power Calculation Result</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6 text-center">
                        <p className="text-sm text-gray-600 mb-2">Power:</p>
                        <p className="text-4xl font-bold text-blue-700 mb-1">{definitionResult.toFixed(2)} W</p>
                        <p className="text-lg text-gray-700">
                          {(definitionResult / 745.699872).toFixed(4)} hp (Mechanical)
                        </p>
                        <p className="text-lg text-gray-700">
                          {(definitionResult / 735.49875).toFixed(4)} PS (Metric)
                        </p>
                        <p className="text-lg text-gray-700">
                          {(definitionResult / 1000).toFixed(4)} kW
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Calculation Details</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p><strong>Force:</strong> {definitionInputs.force} {definitionInputs.forceUnit}</p>
                          <p><strong>Distance:</strong> {definitionInputs.distance} {definitionInputs.distanceUnit}</p>
                          <p><strong>Time:</strong> {definitionInputs.time} {definitionInputs.timeUnit}</p>
                          <p className="pt-2 border-t border-gray-300"><strong>Formula:</strong> Power = Force × Distance / Time</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Conversion Result */}
                {conversionResult !== null && (
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">Conversion Result</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
                        <p className="text-2xl font-bold text-gray-900 mb-2">
                          {conversionInputs.amount} {POWER_UNITS[conversionInputs.fromUnit].symbol} =
                        </p>
                        <p className="text-4xl font-bold text-green-700">
                          {conversionResult.toFixed(6)} {POWER_UNITS[conversionInputs.toUnit].symbol}
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                        <h4 className="font-semibold text-gray-900 mb-3">All Conversions</h4>
                        <div className="space-y-2 text-sm">
                          {Object.entries(POWER_UNITS).map(([unit, data]) => {
                            const watts = parseFloat(conversionInputs.amount) * POWER_UNITS[conversionInputs.fromUnit].factor;
                            const value = watts / data.factor;
                            return (
                              <div key={unit} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                                <span className="text-gray-600">{unit}:</span>
                                <span className="font-semibold text-gray-900">{value.toFixed(6)} {data.symbol}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Torque Result */}
                {torqueResult !== null && (
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">Horsepower from Torque</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 mb-6 text-center">
                        <p className="text-sm text-gray-600 mb-2">Horsepower:</p>
                        <p className="text-4xl font-bold text-orange-700 mb-1">{torqueResult.toFixed(2)} hp</p>
                        <p className="text-lg text-gray-700">
                          {(torqueResult * 745.699872).toFixed(2)} W
                        </p>
                        <p className="text-lg text-gray-700">
                          {(torqueResult * 0.745699872).toFixed(4)} kW
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Calculation Details</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p><strong>Torque:</strong> {torqueInputs.torque} lb-ft</p>
                          <p><strong>RPM:</strong> {torqueInputs.rpm}</p>
                          <p className="pt-2 border-t border-gray-300"><strong>Formula:</strong> HP = (Torque × RPM) / 5252</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Note: 5252 is a constant derived from converting rotational speed to power
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">⚡</div>
                  <p className="text-gray-500 text-lg mb-2">No results yet</p>
                  <p className="text-gray-400 text-sm">
                    Use any calculator above to see results
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          {(definitionResult !== null || conversionResult !== null || torqueResult !== null) && (
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
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Horsepower Calculator"
      />
    </div>
  );
}

