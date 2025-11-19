'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface TireSize {
  width: string;
  aspectRatio: string;
  diameter: string;
  construction: string;
}

interface TireCalculation {
  sidewallHeight: number;
  totalDiameter: number;
  circumference: number;
  revolutionsPerMile: number;
  revolutionsPerKm: number;
}

interface ComparisonResult {
  tire1: TireCalculation;
  tire2: TireCalculation;
  diameterDiff: number;
  circumferenceDiff: number;
  speedometerError: number;
  odometerError: number;
  clearanceChange: number;
  compatible: boolean;
}

export default function TireSizeCalculator() {
  const [tire1, setTire1] = useState<TireSize>({
    width: '265',
    aspectRatio: '70',
    diameter: '17',
    construction: 'R',
  });

  const [tire2, setTire2] = useState<TireSize>({
    width: '265',
    aspectRatio: '40',
    diameter: '23',
    construction: 'R',
  });

  const [compareMode, setCompareMode] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/tire-size-calculator',
    getShareParams: () => ({
      w1: tire1.width,
      a1: tire1.aspectRatio,
      d1: tire1.diameter,
      w2: tire2.width,
      a2: tire2.aspectRatio,
      d2: tire2.diameter,
      c: compareMode ? '1' : '0',
    }),
    getShareText: () => {
      return "Calculate tire size, compare dimensions, and check speedometer accuracy with our Tire Size Calculator";
    },
  });

  const calculateTireSpecs = (tire: TireSize): TireCalculation => {
    const width = parseFloat(tire.width);
    const aspectRatio = parseFloat(tire.aspectRatio);
    const diameter = parseFloat(tire.diameter);

    // Sidewall height in mm
    const sidewallHeight = (width * aspectRatio) / 100;
    
    // Total diameter in mm
    const totalDiameter = (sidewallHeight * 2) + (diameter * 25.4);
    
    // Circumference in mm
    const circumference = Math.PI * totalDiameter;
    
    // Revolutions per mile
    const revolutionsPerMile = 1609344 / circumference;
    
    // Revolutions per km
    const revolutionsPerKm = 1000000 / circumference;

    return {
      sidewallHeight,
      totalDiameter,
      circumference,
      revolutionsPerMile,
      revolutionsPerKm,
    };
  };

  const handleCalculate = () => {
    // Validate tire 1
    if (!tire1.width || !tire1.aspectRatio || !tire1.diameter) {
      alert('Please enter all tire 1 dimensions.');
      return;
    }

    const width1 = parseFloat(tire1.width);
    const aspect1 = parseFloat(tire1.aspectRatio);
    const diam1 = parseFloat(tire1.diameter);

    if (isNaN(width1) || isNaN(aspect1) || isNaN(diam1) || width1 <= 0 || aspect1 <= 0 || diam1 <= 0) {
      alert('Please enter valid positive numbers for tire 1.');
      return;
    }

    // Calculate tire 1 specs
    const tire1Calc = calculateTireSpecs(tire1);

    if (compareMode) {
      // Validate tire 2
      if (!tire2.width || !tire2.aspectRatio || !tire2.diameter) {
        alert('Please enter all tire 2 dimensions.');
        return;
      }

      const width2 = parseFloat(tire2.width);
      const aspect2 = parseFloat(tire2.aspectRatio);
      const diam2 = parseFloat(tire2.diameter);

      if (isNaN(width2) || isNaN(aspect2) || isNaN(diam2) || width2 <= 0 || aspect2 <= 0 || diam2 <= 0) {
        alert('Please enter valid positive numbers for tire 2.');
        return;
      }

      // Calculate tire 2 specs
      const tire2Calc = calculateTireSpecs(tire2);

      // Calculate differences
      const diameterDiff = tire2Calc.totalDiameter - tire1Calc.totalDiameter;
      const circumferenceDiff = tire2Calc.circumference - tire1Calc.circumference;
      
      // Speedometer error: if new tire is larger, speedometer reads slower than actual
      const speedometerError = ((tire2Calc.circumference / tire1Calc.circumference) - 1) * 100;
      
      // Odometer error (same as speedometer)
      const odometerError = speedometerError;
      
      // Clearance change (half of diameter difference)
      const clearanceChange = diameterDiff / 2;

      // Compatibility check (typically within 3% is acceptable)
      const compatible = Math.abs(speedometerError) <= 3;

      setResult({
        tire1: tire1Calc,
        tire2: tire2Calc,
        diameterDiff,
        circumferenceDiff,
        speedometerError,
        odometerError,
        clearanceChange,
        compatible,
      });
    } else {
      // Single tire calculation
      setResult({
        tire1: tire1Calc,
        tire2: tire1Calc,
        diameterDiff: 0,
        circumferenceDiff: 0,
        speedometerError: 0,
        odometerError: 0,
        clearanceChange: 0,
        compatible: true,
      });
    }
  };

  const handleReset = () => {
    setTire1({ width: '265', aspectRatio: '70', diameter: '17', construction: 'R' });
    setTire2({ width: '265', aspectRatio: '40', diameter: '23', construction: 'R' });
    setCompareMode(false);
    setResult(null);
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
      link.download = `tire-size-calculator-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Tire Size Calculator Results</title>
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

  const TireInput = ({ 
    tire, 
    setTire, 
    label 
  }: { 
    tire: TireSize; 
    setTire: React.Dispatch<React.SetStateAction<TireSize>>; 
    label: string;
  }) => (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-lg text-gray-900">{label}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1">
            <Label className="text-xs text-gray-600 mb-1 block">Width (mm)</Label>
            <input
              type="number"
              value={tire.width}
              onChange={(e) => setTire(prev => ({ ...prev, width: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
              placeholder="265"
            />
          </div>
          <span className="text-2xl text-gray-400 mt-6">/</span>
          <div className="flex-1">
            <Label className="text-xs text-gray-600 mb-1 block">Aspect Ratio</Label>
            <input
              type="number"
              value={tire.aspectRatio}
              onChange={(e) => setTire(prev => ({ ...prev, aspectRatio: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
              placeholder="70"
            />
          </div>
          <div className="w-12 mt-6">
            <select
              value={tire.construction}
              onChange={(e) => setTire(prev => ({ ...prev, construction: e.target.value }))}
              className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
            >
              <option value="R">R</option>
              <option value="D">D</option>
              <option value="B">B</option>
            </select>
          </div>
          <div className="flex-1">
            <Label className="text-xs text-gray-600 mb-1 block">Rim (inches)</Label>
            <input
              type="number"
              value={tire.diameter}
              onChange={(e) => setTire(prev => ({ ...prev, diameter: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
              placeholder="17"
            />
          </div>
        </div>
        <div className="text-center text-sm text-gray-600">
          <span className="font-mono font-semibold text-blue-700">
            {tire.width}/{tire.aspectRatio} {tire.construction} {tire.diameter}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-2 space-y-6">
          <TireInput tire={tire1} setTire={setTire1} label="Original Tire Size" />

          {/* Comparison Toggle */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">
                  Compare with New Tire Size?
                </Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!compareMode}
                      onChange={() => setCompareMode(false)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={compareMode}
                      onChange={() => setCompareMode(true)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {compareMode && (
            <TireInput tire={tire2} setTire={setTire2} label="New Tire Size" />
          )}

          {/* Calculate & Reset Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={handleCalculate}
              className="flex-1 bg-green-600 hover:bg-green-700 gap-2 py-6 text-lg"
            >
              <Calculator className="h-5 w-5" />
              Calculate
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="gap-2 py-6"
            >
              <RotateCcw className="h-5 w-5" />
              Clear
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-3">
          <div ref={resultRef}>
            {result ? (
              <div className="space-y-6">
                {/* Tire 1 Specifications with Visualization */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">
                      Original Tire: {tire1.width}/{tire1.aspectRatio} {tire1.construction} {tire1.diameter}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Specifications Table */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Specifications</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Tire Height (Diameter):</span>
                            <div className="text-right">
                              <span className="font-bold text-gray-900">{(result.tire1.totalDiameter / 25.4).toFixed(1)} in</span>
                              <span className="text-gray-500 ml-2">{result.tire1.totalDiameter.toFixed(0)} mm</span>
                            </div>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Wheel Size:</span>
                            <div className="text-right">
                              <span className="font-bold text-gray-900">{tire1.diameter} in</span>
                              <span className="text-gray-500 ml-2">{(parseFloat(tire1.diameter) * 25.4).toFixed(0)} mm</span>
                            </div>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Sidewall Height:</span>
                            <div className="text-right">
                              <span className="font-bold text-gray-900">{(result.tire1.sidewallHeight / 25.4).toFixed(1)} in</span>
                              <span className="text-gray-500 ml-2">{result.tire1.sidewallHeight.toFixed(0)} mm</span>
                            </div>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Tire Width:</span>
                            <div className="text-right">
                              <span className="font-bold text-gray-900">{(parseFloat(tire1.width) / 25.4).toFixed(1)} in</span>
                              <span className="text-gray-500 ml-2">{tire1.width} mm</span>
                            </div>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Tire Circumference:</span>
                            <div className="text-right">
                              <span className="font-bold text-gray-900">{(result.tire1.circumference / 25.4).toFixed(1)} in</span>
                              <span className="text-gray-500 ml-2">{result.tire1.circumference.toFixed(0)} mm</span>
                            </div>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Revolutions per Mile:</span>
                            <span className="font-bold text-gray-900">{result.tire1.revolutionsPerMile.toFixed(1)}</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-gray-600">Revolutions per Kilometer:</span>
                            <span className="font-bold text-gray-900">{result.tire1.revolutionsPerKm.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tire Visualization */}
                      <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4">
                        <svg viewBox="0 0 300 300" className="w-full max-w-[280px]">
                          {/* Tire */}
                          <circle cx="150" cy="150" r="120" fill="#2d3748" stroke="#1a202c" strokeWidth="2"/>
                          <circle cx="150" cy="150" r="100" fill="#4a5568"/>
                          {/* Rim */}
                          <circle cx="150" cy="150" r="60" fill="#cbd5e0" stroke="#a0aec0" strokeWidth="2"/>
                          <circle cx="150" cy="150" r="50" fill="#e2e8f0"/>
                          {/* Rim spokes */}
                          {[0, 72, 144, 216, 288].map((angle, i) => (
                            <line 
                              key={i}
                              x1="150" 
                              y1="150" 
                              x2={150 + 50 * Math.cos((angle * Math.PI) / 180)} 
                              y2={150 + 50 * Math.sin((angle * Math.PI) / 180)}
                              stroke="#a0aec0" 
                              strokeWidth="3"
                            />
                          ))}
                          
                          {/* Dimension lines and labels */}
                          {/* Total Diameter */}
                          <line x1="30" y1="150" x2="270" y2="150" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowblue)"/>
                          <line x1="30" y1="145" x2="30" y2="155" stroke="#3b82f6" strokeWidth="2"/>
                          <line x1="270" y1="145" x2="270" y2="155" stroke="#3b82f6" strokeWidth="2"/>
                          <text x="150" y="140" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">
                            {(result.tire1.totalDiameter / 25.4).toFixed(1)} in
                          </text>
                          <text x="150" y="170" textAnchor="middle" fill="#64748b" fontSize="10">
                            {result.tire1.totalDiameter.toFixed(0)} mm
                          </text>
                          
                          {/* Sidewall Height (right) */}
                          <line x1="275" y1="90" x2="275" y2="150" stroke="#10b981" strokeWidth="2"/>
                          <text x="285" y="120" fill="#047857" fontSize="11" fontWeight="bold">
                            {(result.tire1.sidewallHeight / 25.4).toFixed(1)} in
                          </text>
                          <text x="285" y="132" fill="#64748b" fontSize="9">
                            {result.tire1.sidewallHeight.toFixed(0)} mm
                          </text>
                          
                          {/* Width */}
                          <line x1="150" y1="20" x2="150" y2="280" stroke="#f59e0b" strokeWidth="2"/>
                          <line x1="145" y1="20" x2="155" y2="20" stroke="#f59e0b" strokeWidth="2"/>
                          <line x1="145" y1="280" x2="155" y2="280" stroke="#f59e0b" strokeWidth="2"/>
                          <text x="160" y="150" fill="#d97706" fontSize="11" fontWeight="bold">
                            {(parseFloat(tire1.width) / 25.4).toFixed(1)} in
                          </text>
                          <text x="160" y="162" fill="#64748b" fontSize="9">
                            {tire1.width} mm
                          </text>
                          
                          {/* Arrow marker definition */}
                          <defs>
                            <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
                            </marker>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comparison Results */}
                {compareMode && (
                  <>
                    {/* Tire 2 Specifications with Visualization */}
                    <Card className="shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <CardTitle className="text-xl text-gray-900">
                          New Tire: {tire2.width}/{tire2.aspectRatio} {tire2.construction} {tire2.diameter}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Specifications Table */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Specifications</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Tire Height (Diameter):</span>
                                <div className="text-right">
                                  <span className="font-bold text-gray-900">{(result.tire2.totalDiameter / 25.4).toFixed(1)} in</span>
                                  <span className="text-gray-500 ml-2">{result.tire2.totalDiameter.toFixed(0)} mm</span>
                                </div>
                              </div>
                              <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Wheel Size:</span>
                                <div className="text-right">
                                  <span className="font-bold text-gray-900">{tire2.diameter} in</span>
                                  <span className="text-gray-500 ml-2">{(parseFloat(tire2.diameter) * 25.4).toFixed(0)} mm</span>
                                </div>
                              </div>
                              <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Sidewall Height:</span>
                                <div className="text-right">
                                  <span className="font-bold text-gray-900">{(result.tire2.sidewallHeight / 25.4).toFixed(1)} in</span>
                                  <span className="text-gray-500 ml-2">{result.tire2.sidewallHeight.toFixed(0)} mm</span>
                                </div>
                              </div>
                              <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Tire Width:</span>
                                <div className="text-right">
                                  <span className="font-bold text-gray-900">{(parseFloat(tire2.width) / 25.4).toFixed(1)} in</span>
                                  <span className="text-gray-500 ml-2">{tire2.width} mm</span>
                                </div>
                              </div>
                              <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Tire Circumference:</span>
                                <div className="text-right">
                                  <span className="font-bold text-gray-900">{(result.tire2.circumference / 25.4).toFixed(1)} in</span>
                                  <span className="text-gray-500 ml-2">{result.tire2.circumference.toFixed(0)} mm</span>
                                </div>
                              </div>
                              <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Revolutions per Mile:</span>
                                <span className="font-bold text-gray-900">{result.tire2.revolutionsPerMile.toFixed(1)}</span>
                              </div>
                              <div className="flex justify-between py-2">
                                <span className="text-gray-600">Revolutions per Kilometer:</span>
                                <span className="font-bold text-gray-900">{result.tire2.revolutionsPerKm.toFixed(1)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Tire Visualization */}
                          <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4">
                            <svg viewBox="0 0 300 300" className="w-full max-w-[280px]">
                              {/* Tire */}
                              <circle cx="150" cy="150" r="120" fill="#2d3748" stroke="#1a202c" strokeWidth="2"/>
                              <circle cx="150" cy="150" r="100" fill="#4a5568"/>
                              {/* Rim */}
                              <circle cx="150" cy="150" r="60" fill="#cbd5e0" stroke="#a0aec0" strokeWidth="2"/>
                              <circle cx="150" cy="150" r="50" fill="#e2e8f0"/>
                              {/* Rim spokes */}
                              {[0, 72, 144, 216, 288].map((angle, i) => (
                                <line 
                                  key={i}
                                  x1="150" 
                                  y1="150" 
                                  x2={150 + 50 * Math.cos((angle * Math.PI) / 180)} 
                                  y2={150 + 50 * Math.sin((angle * Math.PI) / 180)}
                                  stroke="#a0aec0" 
                                  strokeWidth="3"
                                />
                              ))}
                              
                              {/* Dimension lines and labels */}
                              {/* Total Diameter */}
                              <line x1="30" y1="150" x2="270" y2="150" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowblue2)"/>
                              <line x1="30" y1="145" x2="30" y2="155" stroke="#3b82f6" strokeWidth="2"/>
                              <line x1="270" y1="145" x2="270" y2="155" stroke="#3b82f6" strokeWidth="2"/>
                              <text x="150" y="140" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">
                                {(result.tire2.totalDiameter / 25.4).toFixed(1)} in
                              </text>
                              <text x="150" y="170" textAnchor="middle" fill="#64748b" fontSize="10">
                                {result.tire2.totalDiameter.toFixed(0)} mm
                              </text>
                              
                              {/* Sidewall Height (right) */}
                              <line x1="275" y1="90" x2="275" y2="150" stroke="#10b981" strokeWidth="2"/>
                              <text x="285" y="120" fill="#047857" fontSize="11" fontWeight="bold">
                                {(result.tire2.sidewallHeight / 25.4).toFixed(1)} in
                              </text>
                              <text x="285" y="132" fill="#64748b" fontSize="9">
                                {result.tire2.sidewallHeight.toFixed(0)} mm
                              </text>
                              
                              {/* Width */}
                              <line x1="150" y1="20" x2="150" y2="280" stroke="#f59e0b" strokeWidth="2"/>
                              <line x1="145" y1="20" x2="155" y2="20" stroke="#f59e0b" strokeWidth="2"/>
                              <line x1="145" y1="280" x2="155" y2="280" stroke="#f59e0b" strokeWidth="2"/>
                              <text x="160" y="150" fill="#d97706" fontSize="11" fontWeight="bold">
                                {(parseFloat(tire2.width) / 25.4).toFixed(1)} in
                              </text>
                              <text x="160" y="162" fill="#64748b" fontSize="9">
                                {tire2.width} mm
                              </text>
                              
                              {/* Arrow marker definition */}
                              <defs>
                                <marker id="arrowblue2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                  <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
                                </marker>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Compatibility Check */}
                    <Card className={`shadow-lg ${result.compatible ? 'border-2 border-green-500' : 'border-2 border-orange-500'}`}>
                      <CardHeader className={result.compatible ? 'bg-green-50' : 'bg-orange-50'}>
                        <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                          {result.compatible ? (
                            <>
                              <CheckCircle2 className="h-6 w-6 text-green-600" />
                              <span>Compatible Size Change</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="h-6 w-6 text-orange-600" />
                              <span>Size Change Exceeds Recommended Limit</span>
                            </>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Dimension Changes</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Diameter Difference:</span>
                                <span className={`font-bold ${Math.abs(result.diameterDiff) > 0 ? 'text-blue-700' : 'text-gray-900'}`}>
                                  {result.diameterDiff >= 0 ? '+' : ''}{result.diameterDiff.toFixed(1)} mm
                                  ({(result.diameterDiff / 25.4).toFixed(2)}")
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Circumference Difference:</span>
                                <span className={`font-bold ${Math.abs(result.circumferenceDiff) > 0 ? 'text-blue-700' : 'text-gray-900'}`}>
                                  {result.circumferenceDiff >= 0 ? '+' : ''}{result.circumferenceDiff.toFixed(1)} mm
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Ground Clearance Change:</span>
                                <span className={`font-bold ${Math.abs(result.clearanceChange) > 0 ? 'text-blue-700' : 'text-gray-900'}`}>
                                  {result.clearanceChange >= 0 ? '+' : ''}{result.clearanceChange.toFixed(1)} mm
                                  ({(result.clearanceChange / 25.4).toFixed(2)}")
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Speedometer & Odometer Impact</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Speedometer Error:</span>
                                <span className={`font-bold text-lg ${Math.abs(result.speedometerError) > 3 ? 'text-orange-600' : 'text-green-600'}`}>
                                  {result.speedometerError >= 0 ? '+' : ''}{result.speedometerError.toFixed(2)}%
                                </span>
                              </div>
                              <div className="bg-gray-50 p-3 rounded">
                                <p className="text-xs text-gray-600 mb-2">Example at 60 mph indicated:</p>
                                <p className="font-semibold text-gray-900">
                                  Actual speed: {(60 * (1 + result.speedometerError / 100)).toFixed(1)} mph
                                </p>
                              </div>
                              <div className="flex justify-between items-center mt-3">
                                <span className="text-gray-600">Odometer Error:</span>
                                <span className={`font-bold ${Math.abs(result.odometerError) > 3 ? 'text-orange-600' : 'text-green-600'}`}>
                                  {result.odometerError >= 0 ? '+' : ''}{result.odometerError.toFixed(2)}%
                                </span>
                              </div>
                              <div className="bg-gray-50 p-3 rounded">
                                <p className="text-xs text-gray-600 mb-2">Example after 10,000 miles shown:</p>
                                <p className="font-semibold text-gray-900">
                                  Actual distance: {(10000 * (1 + result.odometerError / 100)).toFixed(0)} miles
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className={`${result.compatible ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'} border rounded-lg p-4`}>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {result.compatible ? '✓ Recommended' : '⚠️ Caution'}
                            </h4>
                            <p className="text-sm text-gray-700">
                              {result.compatible 
                                ? 'This tire size change is within the recommended ±3% tolerance. Your speedometer and odometer readings will remain reasonably accurate.'
                                : `This tire size change exceeds the recommended ±3% tolerance (${Math.abs(result.speedometerError).toFixed(2)}%). Consider that your speedometer and odometer will have significant errors. Additionally, clearance issues may occur.`
                              }
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">🚗</div>
                  <p className="text-gray-500 text-lg mb-2">No results yet</p>
                  <p className="text-gray-400 text-sm">
                    Enter tire dimensions and click Calculate to see specifications
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

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
        calculatorName="Tire Size Calculator"
      />
    </div>
  );
}

