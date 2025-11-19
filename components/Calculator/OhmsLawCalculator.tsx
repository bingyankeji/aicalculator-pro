'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, RotateCcw, Zap, AlertTriangle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface OhmsLawInputs {
  voltage: string;
  current: string;
  resistance: string;
  power: string;
}

interface OhmsLawResult {
  voltage: number;
  current: number;
  resistance: number;
  power: number;
  calculatedFrom: string[];
  isValid: boolean;
  viRelationship: Array<{ voltage: number; current: number }>;
  powerLevels: Array<{ level: string; power: number; color: string }>;
}

export default function OhmsLawCalculator() {
  const [inputs, setInputs] = useState<OhmsLawInputs>({
    voltage: '',
    current: '',
    resistance: '',
    power: '',
  });

  const [result, setResult] = useState<OhmsLawResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/ohms-law-calculator',
    getShareParams: () => ({
      v: inputs.voltage,
      i: inputs.current,
      r: inputs.resistance,
      p: inputs.power,
    }),
    getShareText: () => {
      if (result) {
        return `Ohm's Law: V=${result.voltage.toFixed(2)}V, I=${result.current.toFixed(2)}A, R=${result.resistance.toFixed(2)}Ω, P=${result.power.toFixed(2)}W - Calculate yours at`;
      }
      return "Calculate voltage, current, resistance, and power with Ohm's Law Calculator";
    },
  });

  const handleInputChange = (field: keyof OhmsLawInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = () => {
    const v = parseFloat(inputs.voltage);
    const i = parseFloat(inputs.current);
    const r = parseFloat(inputs.resistance);
    const p = parseFloat(inputs.power);

    // Count how many values are provided
    const provided = [
      { name: 'voltage', value: v },
      { name: 'current', value: i },
      { name: 'resistance', value: r },
      { name: 'power', value: p },
    ].filter(item => !isNaN(item.value) && item.value > 0);

    if (provided.length < 2) {
      alert('Please enter at least 2 values to calculate the others.');
      return;
    }

    let voltage = v;
    let current = i;
    let resistance = r;
    let power = p;
    const calculatedFrom: string[] = [];

    // V = I × R
    if (!isNaN(i) && i > 0 && !isNaN(r) && r > 0 && (isNaN(v) || v === 0)) {
      voltage = i * r;
      calculatedFrom.push('V = I × R');
    }

    // I = V / R
    if (!isNaN(v) && v > 0 && !isNaN(r) && r > 0 && (isNaN(i) || i === 0)) {
      current = v / r;
      calculatedFrom.push('I = V / R');
    }

    // R = V / I
    if (!isNaN(v) && v > 0 && !isNaN(i) && i > 0 && (isNaN(r) || r === 0)) {
      resistance = v / i;
      calculatedFrom.push('R = V / I');
    }

    // P = V × I
    if (!isNaN(v) && v > 0 && !isNaN(i) && i > 0 && (isNaN(p) || p === 0)) {
      power = v * i;
      calculatedFrom.push('P = V × I');
    }

    // P = V² / R
    if (!isNaN(v) && v > 0 && !isNaN(r) && r > 0 && (isNaN(p) || p === 0) && calculatedFrom.length === 0) {
      power = (v * v) / r;
      calculatedFrom.push('P = V² / R');
    }

    // P = I² × R
    if (!isNaN(i) && i > 0 && !isNaN(r) && r > 0 && (isNaN(p) || p === 0) && calculatedFrom.length === 0) {
      power = i * i * r;
      calculatedFrom.push('P = I² × R');
    }

    // Calculate from Power
    if (!isNaN(p) && p > 0) {
      if (!isNaN(v) && v > 0 && (isNaN(i) || i === 0)) {
        current = p / v;
        calculatedFrom.push('I = P / V');
      }
      if (!isNaN(i) && i > 0 && (isNaN(v) || v === 0)) {
        voltage = p / i;
        calculatedFrom.push('V = P / I');
      }
      if (!isNaN(v) && v > 0 && (isNaN(r) || r === 0)) {
        resistance = (v * v) / p;
        calculatedFrom.push('R = V² / P');
      }
      if (!isNaN(i) && i > 0 && (isNaN(r) || r === 0)) {
        resistance = p / (i * i);
        calculatedFrom.push('R = P / I²');
      }
    }

    // Ensure all values are calculated
    if (voltage > 0 && current > 0) {
      if (resistance === 0 || isNaN(resistance)) {
        resistance = voltage / current;
      }
      if (power === 0 || isNaN(power)) {
        power = voltage * current;
      }
    }

    // Generate V-I relationship curve
    const viRelationship: Array<{ voltage: number; current: number }> = [];
    if (resistance > 0) {
      for (let v = 0; v <= voltage * 2; v += voltage / 10) {
        viRelationship.push({
          voltage: v,
          current: v / resistance,
        });
      }
    }

    // Power level indicators
    const powerLevels = [
      { level: '1/8W (0.125W)', power: 0.125, color: '#10b981' },
      { level: '1/4W (0.25W)', power: 0.25, color: '#3b82f6' },
      { level: '1/2W (0.5W)', power: 0.5, color: '#f59e0b' },
      { level: '1W', power: 1.0, color: '#ef4444' },
      { level: '2W+', power: 2.0, color: '#dc2626' },
    ];

    setResult({
      voltage,
      current,
      resistance,
      power,
      calculatedFrom,
      isValid: true,
      viRelationship,
      powerLevels,
    });
  };

  const handleReset = () => {
    setInputs({
      voltage: '',
      current: '',
      resistance: '',
      power: '',
    });
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
      link.download = `ohms-law-result-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Ohm's Law Calculator Results</title>
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

  // Get recommended power rating
  const getRecommendedPowerRating = () => {
    if (!result) return null;
    const safetyFactor = 2;
    const requiredPower = result.power * safetyFactor;
    
    if (requiredPower <= 0.125) return '1/8W (0.125W)';
    if (requiredPower <= 0.25) return '1/4W (0.25W)';
    if (requiredPower <= 0.5) return '1/2W (0.5W)';
    if (requiredPower <= 1.0) return '1W';
    if (requiredPower <= 2.0) return '2W';
    return `${Math.ceil(requiredPower)}W or higher`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* Quick Result Display */}
          {result && (
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">Quick Results</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-gray-600">Voltage</p>
                      <p className="text-lg font-bold text-blue-700">{result.voltage.toFixed(2)} V</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-gray-600">Current</p>
                      <p className="text-lg font-bold text-blue-700">{result.current.toFixed(2)} A</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-gray-600">Resistance</p>
                      <p className="text-lg font-bold text-blue-700">{result.resistance.toFixed(2)} Ω</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-gray-600">Power</p>
                      <p className="text-lg font-bold text-blue-700">{result.power.toFixed(2)} W</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Input Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Ohm's Law Calculator
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Enter any 2 values to calculate the other 2 values. Leave the unknown fields empty.
              </p>

              {/* Voltage */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Voltage (V)
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.voltage}
                    onChange={(e) => handleInputChange('voltage', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="110"
                    step="0.01"
                  />
                  <div className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-medium min-w-[60px] text-center">
                    V
                  </div>
                </div>
              </div>

              {/* Current */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Current (I)
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.current}
                    onChange={(e) => handleInputChange('current', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.2"
                    step="0.001"
                  />
                  <div className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-medium min-w-[60px] text-center">
                    A
                  </div>
                </div>
              </div>

              {/* Resistance */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Resistance (R)
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.resistance}
                    onChange={(e) => handleInputChange('resistance', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="550"
                    step="0.01"
                  />
                  <div className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-medium min-w-[60px] text-center">
                    Ω
                  </div>
                </div>
              </div>

              {/* Power */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Power (P)
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.power}
                    onChange={(e) => handleInputChange('power', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="22"
                    step="0.01"
                  />
                  <div className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-medium min-w-[60px] text-center">
                    W
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calculate & Reset Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={calculate}
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
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-3 space-y-6">
          <div ref={resultRef}>
            {/* Circuit Diagram and Formulas */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Ohm's Law Relationships</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Circuit Diagram */}
                <div className="flex items-center justify-center py-8 mb-6">
                  <svg width="200" height="180" viewBox="0 0 200 180" className="mx-auto">
                    {/* Circuit box */}
                    <rect x="50" y="40" width="100" height="100" fill="none" stroke="#3b82f6" strokeWidth="3" rx="8"/>
                    
                    {/* Voltage source (left) */}
                    <circle cx="30" cy="90" r="15" fill="none" stroke="#1e40af" strokeWidth="2"/>
                    <text x="30" y="95" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">V</text>
                    
                    {/* Current arrow (top) */}
                    <line x1="80" y1="20" x2="120" y2="20" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    <text x="100" y="15" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#059669">I</text>
                    
                    {/* Resistance (center) */}
                    <path d="M 70 90 L 80 80 L 90 100 L 100 80 L 110 100 L 120 80 L 130 90" fill="none" stroke="#ef4444" strokeWidth="2"/>
                    <text x="100" y="75" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ef4444">R</text>
                    
                    {/* Connecting lines */}
                    <line x1="45" y1="90" x2="50" y2="90" stroke="#64748b" strokeWidth="2"/>
                    <line x1="150" y1="90" x2="170" y2="90" stroke="#64748b" strokeWidth="2"/>
                    <line x1="170" y1="90" x2="170" y2="160" stroke="#64748b" strokeWidth="2"/>
                    <line x1="30" y1="105" x2="30" y2="160" stroke="#64748b" strokeWidth="2"/>
                    <line x1="30" y1="160" x2="170" y2="160" stroke="#64748b" strokeWidth="2"/>
                    <line x1="100" y1="20" x2="100" y2="40" stroke="#64748b" strokeWidth="2"/>
                    
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="#059669"/>
                      </marker>
                    </defs>
                  </svg>
                </div>

                {/* Formula Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Voltage</p>
                    <p className="font-mono text-sm font-bold text-blue-700">V = I × R</p>
                    <p className="font-mono text-xs text-blue-600 mt-1">V = P / I</p>
                    <p className="font-mono text-xs text-blue-600">V = √(P × R)</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Current</p>
                    <p className="font-mono text-sm font-bold text-green-700">I = V / R</p>
                    <p className="font-mono text-xs text-green-600 mt-1">I = P / V</p>
                    <p className="font-mono text-xs text-green-600">I = √(P / R)</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Resistance</p>
                    <p className="font-mono text-sm font-bold text-orange-700">R = V / I</p>
                    <p className="font-mono text-xs text-orange-600 mt-1">R = V² / P</p>
                    <p className="font-mono text-xs text-orange-600">R = P / I²</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Power</p>
                    <p className="font-mono text-sm font-bold text-red-700">P = V × I</p>
                    <p className="font-mono text-xs text-red-600 mt-1">P = V² / R</p>
                    <p className="font-mono text-xs text-red-600">P = I² × R</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            {result && (
              <>
                <Card className="shadow-lg mt-6">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Calculation Results</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {/* Formula Steps */}
                    {result.calculatedFrom.length > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm font-semibold text-gray-900 mb-2">
                          <Zap className="h-4 w-4 inline mr-1 text-blue-600" />
                          Formulas Used:
                        </p>
                        <ul className="space-y-1">
                          {result.calculatedFrom.map((formula, idx) => (
                            <li key={idx} className="font-mono text-sm text-blue-700">
                              • {formula}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* All Values Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Voltage (V)</p>
                        <p className="text-2xl font-bold text-blue-700">{result.voltage.toFixed(3)} V</p>
                        <p className="text-xs text-gray-500 mt-1">{(result.voltage / 1000).toFixed(3)} kV</p>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Current (I)</p>
                        <p className="text-2xl font-bold text-green-700">{result.current.toFixed(3)} A</p>
                        <p className="text-xs text-gray-500 mt-1">{(result.current * 1000).toFixed(1)} mA</p>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Resistance (R)</p>
                        <p className="text-2xl font-bold text-orange-700">{result.resistance.toFixed(3)} Ω</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {result.resistance >= 1000 
                            ? `${(result.resistance / 1000).toFixed(2)} kΩ`
                            : `${result.resistance.toFixed(2)} Ω`}
                        </p>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Power (P)</p>
                        <p className="text-2xl font-bold text-red-700">{result.power.toFixed(3)} W</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {result.power >= 1000 
                            ? `${(result.power / 1000).toFixed(2)} kW`
                            : `${(result.power * 1000).toFixed(1)} mW`}
                        </p>
                      </div>
                    </div>

                    {/* Power Safety Warning */}
                    {result.power > 0 && (
                      <div className={`border-2 rounded-lg p-4 ${
                        result.power > 2 
                          ? 'bg-red-50 border-red-300' 
                          : result.power > 0.5 
                          ? 'bg-amber-50 border-amber-300' 
                          : 'bg-green-50 border-green-300'
                      }`}>
                        <p className="text-sm font-semibold flex items-center gap-2">
                          {result.power > 2 ? (
                            <>
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                              <span className="text-red-700">High Power Warning!</span>
                            </>
                          ) : result.power > 0.5 ? (
                            <>
                              <AlertTriangle className="h-4 w-4 text-amber-600" />
                              <span className="text-amber-700">Moderate Power</span>
                            </>
                          ) : (
                            <>
                              <Zap className="h-4 w-4 text-green-600" />
                              <span className="text-green-700">Safe Power Level</span>
                            </>
                          )}
                        </p>
                        <p className="text-sm mt-2 text-gray-700">
                          <strong>Recommended Resistor Rating:</strong> {getRecommendedPowerRating()}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          (2× safety factor applied: {(result.power * 2).toFixed(3)}W minimum)
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* V-I Relationship Chart */}
                {result.viRelationship.length > 0 && (
                  <Card className="shadow-lg mt-6">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">V-I Characteristic Curve</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={result.viRelationship}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="voltage" 
                            label={{ value: 'Voltage (V)', position: 'insideBottom', offset: -5 }}
                          />
                          <YAxis label={{ value: 'Current (A)', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="current" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            name="Current (A)"
                            dot={{ fill: '#3b82f6', r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                      <p className="text-xs text-gray-600 text-center mt-4">
                        Linear relationship: I = V / R (R = {result.resistance.toFixed(2)} Ω)
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Common Applications */}
                <Card className="shadow-lg mt-6">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Practical Applications</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* LED Example */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 LED Circuit</h4>
                        <p className="text-xs text-gray-700 mb-2">
                          For a 5V supply with 20mA LED (2V forward voltage):
                        </p>
                        <p className="font-mono text-xs text-blue-700">
                          R = (5V - 2V) / 0.02A = 150Ω<br/>
                          P = 0.02A × 3V = 0.06W<br/>
                          <span className="text-gray-600">Use: 1/4W 150Ω resistor</span>
                        </p>
                      </div>

                      {/* Motor Example */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">⚡ DC Motor</h4>
                        <p className="text-xs text-gray-700 mb-2">
                          12V motor drawing 2A:
                        </p>
                        <p className="font-mono text-xs text-green-700">
                          R = 12V / 2A = 6Ω<br/>
                          P = 12V × 2A = 24W<br/>
                          <span className="text-gray-600">Internal resistance: 6Ω</span>
                        </p>
                      </div>

                      {/* Heater Example */}
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">🔥 Heater Element</h4>
                        <p className="text-xs text-gray-700 mb-2">
                          1500W heater on 120V:
                        </p>
                        <p className="font-mono text-xs text-orange-700">
                          I = 1500W / 120V = 12.5A<br/>
                          R = 120V / 12.5A = 9.6Ω<br/>
                          <span className="text-gray-600">Requires 15A circuit breaker</span>
                        </p>
                      </div>

                      {/* USB Charging */}
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">🔌 USB Charging</h4>
                        <p className="text-xs text-gray-700 mb-2">
                          5V USB charging at 2A:
                        </p>
                        <p className="font-mono text-xs text-purple-700">
                          P = 5V × 2A = 10W<br/>
                          R = 5V / 2A = 2.5Ω<br/>
                          <span className="text-gray-600">Fast charging power</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Action Buttons */}
          {result && (
            <div className="flex flex-wrap gap-3 justify-center print:hidden">
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
        calculatorName="Ohm's Law Calculator"
      />
    </div>
  );
}

