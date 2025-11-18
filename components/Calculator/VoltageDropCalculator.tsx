'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

// NEC Wire data (AWG/kcmil with resistance at 75°C)
interface WireData {
  awg: string;
  kcmil?: number;
  mm2: number;
  resistance: { copper: number; aluminum: number }; // ohms per 1000 feet
}

const WIRE_DATA: WireData[] = [
  { awg: '14', mm2: 2.08, resistance: { copper: 3.07, aluminum: 5.06 } },
  { awg: '12', mm2: 3.31, resistance: { copper: 1.93, aluminum: 3.18 } },
  { awg: '10', mm2: 5.26, resistance: { copper: 1.21, aluminum: 1.99 } },
  { awg: '8', mm2: 8.37, resistance: { copper: 0.764, aluminum: 1.26 } },
  { awg: '6', mm2: 13.3, resistance: { copper: 0.491, aluminum: 0.808 } },
  { awg: '4', mm2: 21.2, resistance: { copper: 0.308, aluminum: 0.508 } },
  { awg: '3', mm2: 26.7, resistance: { copper: 0.245, aluminum: 0.403 } },
  { awg: '2', mm2: 33.6, resistance: { copper: 0.194, aluminum: 0.319 } },
  { awg: '1', kcmil: 83.7, mm2: 42.4, resistance: { copper: 0.154, aluminum: 0.253 } },
  { awg: '1/0', kcmil: 105.6, mm2: 53.5, resistance: { copper: 0.122, aluminum: 0.201 } },
  { awg: '2/0', kcmil: 133.1, mm2: 67.4, resistance: { copper: 0.0967, aluminum: 0.159 } },
  { awg: '3/0', kcmil: 167.8, mm2: 85.0, resistance: { copper: 0.0766, aluminum: 0.126 } },
  { awg: '4/0', kcmil: 211.6, mm2: 107, resistance: { copper: 0.0608, aluminum: 0.100 } },
  { awg: '250 kcmil', kcmil: 250, mm2: 127, resistance: { copper: 0.0515, aluminum: 0.0847 } },
  { awg: '300 kcmil', kcmil: 300, mm2: 152, resistance: { copper: 0.0429, aluminum: 0.0707 } },
  { awg: '350 kcmil', kcmil: 350, mm2: 177, resistance: { copper: 0.0367, aluminum: 0.0605 } },
  { awg: '400 kcmil', kcmil: 400, mm2: 203, resistance: { copper: 0.0321, aluminum: 0.0529 } },
  { awg: '500 kcmil', kcmil: 500, mm2: 253, resistance: { copper: 0.0258, aluminum: 0.0424 } },
  { awg: '600 kcmil', kcmil: 600, mm2: 304, resistance: { copper: 0.0214, aluminum: 0.0353 } },
  { awg: '750 kcmil', kcmil: 750, mm2: 380, resistance: { copper: 0.0171, aluminum: 0.0282 } },
  { awg: '1000 kcmil', kcmil: 1000, mm2: 507, resistance: { copper: 0.0129, aluminum: 0.0212 } },
];

export default function VoltageDropCalculator() {
  // Tab mode
  const [mode, setMode] = useState<'nec' | 'estimated' | 'custom'>('nec');
  
  // Common inputs
  const [voltage, setVoltage] = useState('120');
  const [phase, setPhase] = useState<'single' | 'three'>('single');
  const [conductors, setConductors] = useState<'single' | 'parallel'>('single');
  const [distance, setDistance] = useState('500');
  const [distanceUnit, setDistanceUnit] = useState<'meters' | 'feet'>('meters');
  const [current, setCurrent] = useState('1');
  
  // NEC mode inputs
  const [wireMaterial, setWireMaterial] = useState<'copper' | 'aluminum'>('copper');
  const [wireSize, setWireSize] = useState('3');
  
  // Estimated resistance mode
  const [estimatedResistance, setEstimatedResistance] = useState('');
  
  // Custom impedance mode
  const [customImpedance, setCustomImpedance] = useState('1.2');
  const [impedanceUnit, setImpedanceUnit] = useState<'ohm_per_km' | 'ohm_per_1000ft'>('ohm_per_km');
  
  const [result, setResult] = useState<{
    voltageDrop: number;
    voltageDropPercent: number;
    voltageAtLoad: number;
    powerLoss: number;
    efficiency: number;
    necCompliant: boolean;
    resistance: number;
  } | null>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);
  
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/voltage-drop-calculator',
    getShareParams: () => ({
      v: voltage,
      p: phase,
      d: distance,
      i: current,
    }),
    getShareText: () => {
      if (result) {
        return `Voltage drop: ${result.voltageDropPercent.toFixed(2)}% (${result.voltageDrop.toFixed(2)}V) over ${distance}${distanceUnit}`;
      }
      return 'Calculate voltage drop for your electrical circuit!';
    },
  });

  const calculateVoltageDrop = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const D = parseFloat(distance);
    
    if (!V || !I || !D || V <= 0 || I <= 0 || D <= 0) {
      alert('Please enter valid values for voltage, current, and distance.');
      return;
    }
    
    let resistanceOhms = 0;
    
    // Calculate resistance based on mode
    if (mode === 'nec') {
      // NEC data mode
      const wire = WIRE_DATA.find(w => w.awg === wireSize);
      if (!wire) {
        alert('Invalid wire size selected.');
        return;
      }
      
      // Get resistance per 1000 feet
      const resistancePer1000ft = wire.resistance[wireMaterial];
      
      // Convert distance to feet if needed
      const distanceInFeet = distanceUnit === 'meters' ? D * 3.28084 : D;
      
      // Calculate resistance for the given distance (one-way)
      // Standard formula: R = (Resistance per 1000ft / 1000) × Distance
      const oneWayResistance = (resistancePer1000ft / 1000) * distanceInFeet;
      
      // For single phase: we need round trip resistance (2 conductors)
      // For three phase: distance is for line-to-line (already accounts for conductor path)
      resistanceOhms = phase === 'single' ? oneWayResistance * 2 : oneWayResistance;
      
    } else if (mode === 'estimated') {
      // Estimated resistance mode
      // User inputs total circuit resistance (already includes conductor length considerations)
      const R = parseFloat(estimatedResistance);
      if (!R || R <= 0) {
        alert('Please enter a valid resistance value.');
        return;
      }
      resistanceOhms = R;
      
    } else {
      // Custom impedance mode
      const Z = parseFloat(customImpedance);
      if (!Z || Z <= 0) {
        alert('Please enter a valid impedance value.');
        return;
      }
      
      // Convert impedance to ohms for the distance
      const distanceInKm = distanceUnit === 'meters' ? D / 1000 : D / 3280.84;
      const distanceIn1000ft = distanceUnit === 'feet' ? D / 1000 : D / 304.8;
      
      if (impedanceUnit === 'ohm_per_km') {
        resistanceOhms = Z * distanceInKm;
      } else {
        resistanceOhms = Z * distanceIn1000ft;
      }
      
      // For single phase, double for round trip
      if (phase === 'single') {
        resistanceOhms *= 2;
      }
    }
    
    // Calculate voltage drop
    // Standard NEC formula for voltage drop calculation
    let voltageDrop = 0;
    
    if (phase === 'single') {
      // Single-phase voltage drop: Vd = I × R
      // (R already includes round trip distance: 2 conductors)
      voltageDrop = I * resistanceOhms;
    } else {
      // Three-phase voltage drop: Vd = √3 × I × R
      // For balanced three-phase systems
      voltageDrop = Math.sqrt(3) * I * resistanceOhms;
    }
    
    // Note: Power factor affects power consumption, not voltage drop itself
    // Voltage drop is primarily resistive for copper/aluminum conductors
    // Reactance effects are minimal for typical branch circuits
    
    const voltageDropPercent = (voltageDrop / V) * 100;
    const voltageAtLoad = V - voltageDrop;
    const powerLoss = I * voltageDrop; // P = I * Vd
    const efficiency = ((V - voltageDrop) / V) * 100;
    
    // NEC compliance: voltage drop should be ≤3% for branch circuits, ≤5% total
    const necCompliant = voltageDropPercent <= 3.0;
    
    setResult({
      voltageDrop,
      voltageDropPercent,
      voltageAtLoad,
      powerLoss,
      efficiency,
      necCompliant,
      resistance: resistanceOhms,
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
      link.download = `voltage-drop-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Voltage Drop Calculation</title>
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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Voltage Drop Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setMode('nec')}
                  className={`px-3 py-2 font-medium text-xs sm:text-sm transition-colors ${
                    mode === 'nec'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  NEC data
                </button>
                <button
                  onClick={() => setMode('estimated')}
                  className={`px-3 py-2 font-medium text-xs sm:text-sm transition-colors ${
                    mode === 'estimated'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Estimated resistance
                </button>
                <button
                  onClick={() => setMode('custom')}
                  className={`px-3 py-2 font-medium text-xs sm:text-sm transition-colors ${
                    mode === 'custom'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Other
                </button>
              </div>

              <div className="space-y-3">
                {/* NEC Data Mode */}
                {mode === 'nec' && (
                  <>
                    <div className="flex items-center gap-2">
                      <Label className="text-xs sm:text-sm font-medium text-gray-700 w-32 sm:w-36 flex-shrink-0">
                        Wire material
                      </Label>
                      <select
                        value={wireMaterial}
                        onChange={(e) => setWireMaterial(e.target.value as 'copper' | 'aluminum')}
                        className="flex-1 min-w-0 px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="copper">Copper</option>
                        <option value="aluminum">Aluminum</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <Label className="text-xs sm:text-sm font-medium text-gray-700 w-32 sm:w-36 flex-shrink-0">
                        Wire size
                      </Label>
                      <select
                        value={wireSize}
                        onChange={(e) => setWireSize(e.target.value)}
                        className="flex-1 min-w-0 px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {WIRE_DATA.map((wire) => (
                          <option key={wire.awg} value={wire.awg}>
                            {wire.awg} AWG{wire.kcmil ? ` (${wire.kcmil} kcmil)` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {/* Estimated Resistance Mode */}
                {mode === 'estimated' && (
                  <div className="flex items-center gap-2">
                    <Label className="text-xs sm:text-sm font-medium text-gray-700 w-32 sm:w-36 flex-shrink-0">
                      Total resistance (Ω)
                    </Label>
                    <input
                      type="number"
                      step="0.001"
                      value={estimatedResistance}
                      onChange={(e) => setEstimatedResistance(e.target.value)}
                      className="flex-1 min-w-0 px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter total resistance"
                    />
                  </div>
                )}

                {/* Custom Impedance Mode (Other) */}
                {mode === 'custom' && (
                  <div className="flex items-center gap-2">
                    <Label className="text-xs sm:text-sm font-medium text-gray-700 w-32 sm:w-36 flex-shrink-0">
                      Wire impedance or resistance
                    </Label>
                    <div className="flex-1 min-w-0 flex gap-1">
                      <input
                        type="number"
                        step="0.01"
                        value={customImpedance}
                        onChange={(e) => setCustomImpedance(e.target.value)}
                        className="flex-1 min-w-0 px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="1.2"
                      />
                      <select
                        value={impedanceUnit}
                        onChange={(e) => setImpedanceUnit(e.target.value as any)}
                        className="px-2 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="ohm_per_km">Ω/km</option>
                        <option value="ohm_per_1000ft">Ω/1000ft</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Common Inputs */}
                <div className="flex items-center gap-2">
                  <Label className="text-xs sm:text-sm font-medium text-gray-700 w-32 sm:w-36 flex-shrink-0">
                    Voltage
                  </Label>
                  <input
                    type="number"
                    step="1"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                    className="flex-1 min-w-0 px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="120"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Label className="text-xs sm:text-sm font-medium text-gray-700 w-32 sm:w-36 flex-shrink-0">
                    Phase
                  </Label>
                  <select
                    value={phase}
                    onChange={(e) => setPhase(e.target.value as 'single' | 'three')}
                    className="flex-1 min-w-0 px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="single">AC single phase</option>
                    <option value="three">AC three phase</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <Label className="text-xs sm:text-sm font-medium text-gray-700 w-32 sm:w-36 flex-shrink-0">
                    Number of conductors
                  </Label>
                  <select
                    value={conductors}
                    onChange={(e) => setConductors(e.target.value as any)}
                    className="flex-1 min-w-0 px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="single">single set of conductors</option>
                    <option value="parallel">parallel conductors</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <Label className="text-xs sm:text-sm font-medium text-gray-700 w-32 sm:w-36 flex-shrink-0">
                    Distance (one-way)
                  </Label>
                  <div className="flex-1 min-w-0 flex gap-1">
                    <input
                      type="number"
                      step="1"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="flex-1 min-w-0 px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="500"
                    />
                    <select
                      value={distanceUnit}
                      onChange={(e) => setDistanceUnit(e.target.value as 'meters' | 'feet')}
                      className="px-2 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="meters">meters</option>
                      <option value="feet">feet</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Label className="text-xs sm:text-sm font-medium text-gray-700 w-32 sm:w-36 flex-shrink-0">
                    Load current
                  </Label>
                  <div className="flex-1 min-w-0 flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      value={current}
                      onChange={(e) => setCurrent(e.target.value)}
                      className="flex-1 min-w-0 px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="1"
                    />
                    <span className="text-gray-700 text-xs sm:text-sm flex-shrink-0">Amps</span>
                  </div>
                </div>

                <Button 
                  onClick={calculateVoltageDrop}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate
                </Button>

                <Button 
                  onClick={() => {
                    setVoltage('120');
                    setPhase('single');
                    setConductors('single');
                    setDistance('500');
                    setDistanceUnit('meters');
                    setCurrent('1');
                    setWireMaterial('copper');
                    setWireSize('3');
                    setEstimatedResistance('');
                    setCustomImpedance('1.2');
                    setResult(null);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6" ref={resultRef}>
          {result ? (
            <>
              {/* Main Results */}
              <Card className="shadow-lg border-2 border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Voltage Drop Results</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Voltage Drop</p>
                      <p className="text-3xl font-bold text-blue-700">{result.voltageDrop.toFixed(3)} V</p>
                      <p className="text-sm text-gray-600 mt-1">{result.voltageDropPercent.toFixed(2)}%</p>
                    </div>

                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Voltage at Load</p>
                      <p className="text-3xl font-bold text-green-700">{result.voltageAtLoad.toFixed(2)} V</p>
                      <p className="text-sm text-gray-600 mt-1">{result.efficiency.toFixed(2)}% efficiency</p>
                    </div>
                  </div>

                  {/* NEC Compliance */}
                  <div className={`p-4 rounded-lg border-l-4 mb-4 ${
                    result.necCompliant
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}>
                    <div className="flex items-start gap-3">
                      {result.necCompliant ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
                      )}
                      <div>
                        <h4 className={`font-semibold ${
                          result.necCompliant ? 'text-green-900' : 'text-red-900'
                        }`}>
                          {result.necCompliant ? 'NEC Compliant' : 'NEC Non-Compliant'}
                        </h4>
                        <p className={`text-sm mt-1 ${
                          result.necCompliant ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {result.necCompliant
                            ? 'Voltage drop is within NEC recommendations (≤3% for branch circuits).'
                            : 'Voltage drop exceeds NEC recommendations (>3%). Consider larger wire size or shorter distance.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Circuit Resistance</span>
                      <span className="text-lg font-bold text-gray-900">{result.resistance.toFixed(4)} Ω</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Power Loss</span>
                      <span className="text-lg font-bold text-red-700">{result.powerLoss.toFixed(2)} W</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Circuit Details */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Circuit Details</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">System Voltage</p>
                      <p className="text-xl font-bold text-gray-900">{voltage} V</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Load Current</p>
                      <p className="text-xl font-bold text-gray-900">{current} A</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Distance</p>
                      <p className="text-xl font-bold text-gray-900">{distance} {distanceUnit}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Phase</p>
                      <p className="text-xl font-bold text-gray-900">{phase === 'single' ? 'Single' : 'Three'}-phase</p>
                    </div>
                    {mode === 'nec' && (
                      <>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Wire Size</p>
                          <p className="text-xl font-bold text-gray-900">{wireSize} AWG</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Material</p>
                          <p className="text-xl font-bold text-gray-900 capitalize">{wireMaterial}</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">NEC Standards</h4>
                      <ul className="text-sm text-blue-800 space-y-1 list-disc ml-5">
                        <li>Branch circuits: Maximum 3% voltage drop</li>
                        <li>Feeders: Maximum 2% voltage drop</li>
                        <li>Total (feeder + branch): Maximum 5% voltage drop</li>
                        <li>Measured from service entrance to farthest outlet</li>
                      </ul>
                    </div>

                    {!result.necCompliant && (
                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                        <h4 className="font-semibold text-amber-900 mb-2">How to Reduce Voltage Drop</h4>
                        <ul className="text-sm text-amber-800 space-y-1 list-disc ml-5">
                          <li>Increase wire size (lower AWG number)</li>
                          <li>Reduce circuit distance</li>
                          <li>Reduce load current</li>
                          <li>Increase system voltage</li>
                          <li>Use copper instead of aluminum</li>
                          <li>Consider three-phase power for large loads</li>
                        </ul>
                      </div>
                    )}

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Important Notes</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• This calculator uses NEC Chapter 9, Table 8 resistance values at 75°C</li>
                        <li>• Actual voltage drop may vary with temperature and installation conditions</li>
                        <li>• For AC circuits, reactance adds to total impedance</li>
                        <li>• Always verify calculations with a licensed electrician</li>
                        <li>• Follow all local electrical codes and regulations</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">
                  Enter circuit parameters and click Calculate
                </p>
                <p className="text-sm text-gray-400">
                  Choose from NEC data, estimated resistance, or custom impedance
                </p>
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
        calculatorName="Voltage Drop Calculator"
      />
    </div>
  );
}
