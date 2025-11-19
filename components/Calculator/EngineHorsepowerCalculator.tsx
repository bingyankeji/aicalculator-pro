'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

// Weight units to pounds
const WEIGHT_UNITS = {
  'pound': 1,
  'kilogram': 2.20462,
  'ton (US)': 2000,
  'ton (metric)': 2204.62,
};

// Time units to seconds
const TIME_UNITS = {
  'second': 1,
  'millisecond': 0.001,
};

// Speed units to mph
const SPEED_UNITS = {
  'miles per hour': 1,
  'kilometers per hour': 0.621371,
  'feet per second': 0.681818,
  'meters per second': 2.23694,
};

interface ETInputs {
  weight: string;
  weightUnit: keyof typeof WEIGHT_UNITS;
  et: string;
  etUnit: keyof typeof TIME_UNITS;
}

interface TrapSpeedInputs {
  weight: string;
  weightUnit: keyof typeof WEIGHT_UNITS;
  speed: string;
  speedUnit: keyof typeof SPEED_UNITS;
}

interface CalculationResult {
  horsepower: number;
  method: string;
  weightLbs: number;
  etSeconds?: number;
  speedMph?: number;
}

export default function EngineHorsepowerCalculator() {
  const [etInputs, setETInputs] = useState<ETInputs>({
    weight: '5000',
    weightUnit: 'pound',
    et: '20',
    etUnit: 'second',
  });

  const [trapInputs, setTrapInputs] = useState<TrapSpeedInputs>({
    weight: '5000',
    weightUnit: 'pound',
    speed: '70',
    speedUnit: 'miles per hour',
  });

  const [etResult, setETResult] = useState<CalculationResult | null>(null);
  const [trapResult, setTrapResult] = useState<CalculationResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/engine-horsepower-calculator',
    getShareParams: () => ({}),
    getShareText: () => {
      return "Calculate engine horsepower from quarter-mile performance with our Engine Horsepower Calculator";
    },
  });

  const calculateET = () => {
    const weight = parseFloat(etInputs.weight);
    const et = parseFloat(etInputs.et);

    if (isNaN(weight) || isNaN(et) || weight <= 0 || et <= 0) {
      alert('Please enter valid positive numbers for weight and ET.');
      return;
    }

    // Convert to standard units
    const weightLbs = weight * WEIGHT_UNITS[etInputs.weightUnit];
    const etSeconds = et * TIME_UNITS[etInputs.etUnit];

    // Formula: HP = Weight / (ET/5.825)³
    const horsepower = weightLbs / Math.pow(etSeconds / 5.825, 3);

    setETResult({
      horsepower,
      method: 'Elapsed Time (ET)',
      weightLbs,
      etSeconds,
    });
  };

  const calculateTrapSpeed = () => {
    const weight = parseFloat(trapInputs.weight);
    const speed = parseFloat(trapInputs.speed);

    if (isNaN(weight) || isNaN(speed) || weight <= 0 || speed <= 0) {
      alert('Please enter valid positive numbers for weight and speed.');
      return;
    }

    // Convert to standard units
    const weightLbs = weight * WEIGHT_UNITS[trapInputs.weightUnit];
    const speedMph = speed * SPEED_UNITS[trapInputs.speedUnit];

    // Formula: HP = Weight × (Speed/234)³
    const horsepower = weightLbs * Math.pow(speedMph / 234, 3);

    setTrapResult({
      horsepower,
      method: 'Trap-Speed',
      weightLbs,
      speedMph,
    });
  };

  const handleReset = () => {
    setETInputs({
      weight: '5000',
      weightUnit: 'pound',
      et: '20',
      etUnit: 'second',
    });
    setTrapInputs({
      weight: '5000',
      weightUnit: 'pound',
      speed: '70',
      speedUnit: 'miles per hour',
    });
    setETResult(null);
    setTrapResult(null);
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
      link.download = `engine-horsepower-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Engine Horsepower Calculator Results</title>
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
          {/* ET Method Calculator */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">The Elapsed Time (ET) Method</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-xs text-gray-600 mb-4">
                This method uses the vehicle weight and the elapsed time (ET) to finish a quarter mile (402.3 meters) on the formula of
              </p>
              <div className="bg-gray-100 p-3 rounded-lg mb-4 text-center">
                <p className="text-sm font-mono">Horsepower = Weight / (ET/5.825)³</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Vehicle Weight:</Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={etInputs.weight}
                    onChange={(e) => setETInputs(prev => ({ ...prev, weight: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5000"
                    step="1"
                  />
                  <select
                    value={etInputs.weightUnit}
                    onChange={(e) => setETInputs(prev => ({ ...prev, weightUnit: e.target.value as keyof typeof WEIGHT_UNITS }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(WEIGHT_UNITS).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Time to Finish Quarter Mile (ET):</Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={etInputs.et}
                    onChange={(e) => setETInputs(prev => ({ ...prev, et: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="20"
                    step="0.01"
                  />
                  <select
                    value={etInputs.etUnit}
                    onChange={(e) => setETInputs(prev => ({ ...prev, etUnit: e.target.value as keyof typeof TIME_UNITS }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(TIME_UNITS).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button 
                onClick={calculateET}
                className="w-full bg-green-600 hover:bg-green-700 gap-2"
              >
                <Calculator className="h-4 w-4" />
                Calculate
              </Button>
            </CardContent>
          </Card>

          {/* Trap-Speed Method Calculator */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">The Trap-Speed Method</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-xs text-gray-600 mb-4">
                This method uses the vehicle weight and the speed at which the vehicle finished a quarter mile (402.3 meters) on the formula of
              </p>
              <div className="bg-gray-100 p-3 rounded-lg mb-4 text-center">
                <p className="text-sm font-mono">Horsepower = Weight×(Speed/234)³</p>
              </div>
              <p className="text-xs text-gray-500">
                The speed used should be the speed attained at the quarter-mile point, not the average speed.
              </p>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Vehicle Weight:</Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={trapInputs.weight}
                    onChange={(e) => setTrapInputs(prev => ({ ...prev, weight: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5000"
                    step="1"
                  />
                  <select
                    value={trapInputs.weightUnit}
                    onChange={(e) => setTrapInputs(prev => ({ ...prev, weightUnit: e.target.value as keyof typeof WEIGHT_UNITS }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(WEIGHT_UNITS).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Speed When Finishing Quarter Mile:</Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={trapInputs.speed}
                    onChange={(e) => setTrapInputs(prev => ({ ...prev, speed: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="70"
                    step="0.1"
                  />
                  <select
                    value={trapInputs.speedUnit}
                    onChange={(e) => setTrapInputs(prev => ({ ...prev, speedUnit: e.target.value as keyof typeof SPEED_UNITS }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(SPEED_UNITS).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button 
                onClick={calculateTrapSpeed}
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
            {(etResult || trapResult) ? (
              <div className="space-y-6">
                {/* ET Method Result */}
                {etResult && (
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">Elapsed Time (ET) Method Result</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6 text-center">
                        <p className="text-sm text-gray-600 mb-2">Estimated Engine Horsepower:</p>
                        <p className="text-5xl font-bold text-blue-700 mb-2">{etResult.horsepower.toFixed(2)} hp</p>
                        <p className="text-lg text-gray-700">
                          {(etResult.horsepower * 0.745699872).toFixed(2)} kW
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Calculation Details</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span>Vehicle Weight:</span>
                            <span className="font-semibold">{etResult.weightLbs.toFixed(2)} lbs</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span>Elapsed Time (ET):</span>
                            <span className="font-semibold">{etResult.etSeconds?.toFixed(3)} seconds</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span>Quarter Mile:</span>
                            <span className="font-semibold">402.3 meters (1,320 feet)</span>
                          </div>
                          <div className="pt-2">
                            <p className="font-semibold text-gray-900 mb-1">Formula:</p>
                            <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                              HP = Weight / (ET/5.825)³
                            </p>
                            <p className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">
                              HP = {etResult.weightLbs.toFixed(2)} / ({etResult.etSeconds?.toFixed(3)}/5.825)³ = {etResult.horsepower.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4 rounded-r-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Note:</strong> This is an estimation based on quarter-mile performance. Actual engine horsepower may vary due to drivetrain losses, traction, aerodynamics, and driver skill.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Trap-Speed Method Result */}
                {trapResult && (
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">Trap-Speed Method Result</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6 text-center">
                        <p className="text-sm text-gray-600 mb-2">Estimated Engine Horsepower:</p>
                        <p className="text-5xl font-bold text-green-700 mb-2">{trapResult.horsepower.toFixed(2)} hp</p>
                        <p className="text-lg text-gray-700">
                          {(trapResult.horsepower * 0.745699872).toFixed(2)} kW
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Calculation Details</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span>Vehicle Weight:</span>
                            <span className="font-semibold">{trapResult.weightLbs.toFixed(2)} lbs</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span>Trap Speed:</span>
                            <span className="font-semibold">{trapResult.speedMph?.toFixed(2)} mph</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span>Quarter Mile:</span>
                            <span className="font-semibold">402.3 meters (1,320 feet)</span>
                          </div>
                          <div className="pt-2">
                            <p className="font-semibold text-gray-900 mb-1">Formula:</p>
                            <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                              HP = Weight×(Speed/234)³
                            </p>
                            <p className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">
                              HP = {trapResult.weightLbs.toFixed(2)}×({trapResult.speedMph?.toFixed(2)}/234)³ = {trapResult.horsepower.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4 rounded-r-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Note:</strong> Trap speed should be the terminal velocity at the end of the quarter mile, not average speed. This method accounts for aerodynamic efficiency better than the ET method.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Comparison if both calculated */}
                {etResult && trapResult && (
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                      <CardTitle className="text-xl text-gray-900">Method Comparison</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold text-gray-900">Method</th>
                              <th className="px-4 py-3 text-right font-semibold text-gray-900">Horsepower</th>
                              <th className="px-4 py-3 text-right font-semibold text-gray-900">Kilowatts</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 text-gray-700">ET Method</td>
                              <td className="px-4 py-3 text-right font-semibold text-blue-700">{etResult.horsepower.toFixed(2)} hp</td>
                              <td className="px-4 py-3 text-right text-gray-700">{(etResult.horsepower * 0.745699872).toFixed(2)} kW</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-gray-700">Trap-Speed Method</td>
                              <td className="px-4 py-3 text-right font-semibold text-green-700">{trapResult.horsepower.toFixed(2)} hp</td>
                              <td className="px-4 py-3 text-right text-gray-700">{(trapResult.horsepower * 0.745699872).toFixed(2)} kW</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="px-4 py-3 font-semibold text-gray-900">Difference</td>
                              <td className="px-4 py-3 text-right font-semibold text-purple-700">
                                {Math.abs(etResult.horsepower - trapResult.horsepower).toFixed(2)} hp
                              </td>
                              <td className="px-4 py-3 text-right text-gray-700">
                                {Math.abs((etResult.horsepower - trapResult.horsepower) * 0.745699872).toFixed(2)} kW
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-4 rounded-r-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Why the difference?</strong> The ET method is sensitive to traction and launch efficiency, while the trap-speed method better reflects aerodynamic performance. A well-tuned car with good traction shows similar results, while a high-power car with poor traction or aerodynamic drag shows greater differences.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">🏎️</div>
                  <p className="text-gray-500 text-lg mb-2">No results yet</p>
                  <p className="text-gray-400 text-sm">
                    Use either the ET method or Trap-Speed method to calculate engine horsepower
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          {(etResult || trapResult) && (
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
        calculatorName="Engine Horsepower Calculator"
      />
    </div>
  );
}

