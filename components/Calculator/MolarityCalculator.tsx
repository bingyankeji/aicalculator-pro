'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, Plus, Trash2, Search } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface CommonCompound {
  name: string;
  formula: string;
  molarMass: number;
  category: string;
}

interface PreparationStep {
  step: number;
  description: string;
}

interface CalculationResult {
  molarity: number;
  moles: number;
  mass: number;
  volume: number;
  steps: PreparationStep[];
}

interface DilutionResult {
  initialMolarity: number;
  initialVolume: number;
  finalMolarity: number;
  finalVolume: number;
  solventToAdd: number;
}

const COMMON_COMPOUNDS: CommonCompound[] = [
  { name: 'Sodium Chloride', formula: 'NaCl', molarMass: 58.44, category: 'Salt' },
  { name: 'Hydrochloric Acid', formula: 'HCl', molarMass: 36.46, category: 'Acid' },
  { name: 'Sulfuric Acid', formula: 'H₂SO₄', molarMass: 98.08, category: 'Acid' },
  { name: 'Sodium Hydroxide', formula: 'NaOH', molarMass: 40.00, category: 'Base' },
  { name: 'Glucose', formula: 'C₆H₁₂O₆', molarMass: 180.16, category: 'Organic' },
  { name: 'Sucrose', formula: 'C₁₂H₂₂O₁₁', molarMass: 342.30, category: 'Organic' },
  { name: 'Acetic Acid', formula: 'CH₃COOH', molarMass: 60.05, category: 'Acid' },
  { name: 'Potassium Chloride', formula: 'KCl', molarMass: 74.55, category: 'Salt' },
  { name: 'Calcium Chloride', formula: 'CaCl₂', molarMass: 110.98, category: 'Salt' },
  { name: 'Ammonia', formula: 'NH₃', molarMass: 17.03, category: 'Base' },
  { name: 'Ethanol', formula: 'C₂H₅OH', molarMass: 46.07, category: 'Organic' },
  { name: 'Magnesium Sulfate', formula: 'MgSO₄', molarMass: 120.37, category: 'Salt' },
  { name: 'Sodium Bicarbonate', formula: 'NaHCO₃', molarMass: 84.01, category: 'Salt' },
  { name: 'Phosphoric Acid', formula: 'H₃PO₄', molarMass: 98.00, category: 'Acid' },
  { name: 'Urea', formula: 'CH₄N₂O', molarMass: 60.06, category: 'Organic' },
];

export default function MolarityCalculator() {
  const [calculationMode, setCalculationMode] = useState<'molarity' | 'dilution'>('molarity');
  
  // Molarity calculation inputs
  const [molarMass, setMolarMass] = useState('');
  const [mass, setMass] = useState('');
  const [volume, setVolume] = useState('');
  const [molarity, setMolarity] = useState('');
  const [selectedCompound, setSelectedCompound] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dilution calculation inputs
  const [m1, setM1] = useState('');
  const [v1, setV1] = useState('');
  const [m2, setM2] = useState('');
  const [v2, setV2] = useState('');
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [dilutionResult, setDilutionResult] = useState<DilutionResult | null>(null);
  const [solveFor, setSolveFor] = useState<'molarity' | 'mass' | 'volume' | 'moles'>('molarity');
  
  const resultRef = useRef<HTMLDivElement>(null);
  
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/molarity-calculator',
    getShareParams: () => ({
      mm: molarMass,
      m: mass,
      v: volume,
      mo: molarity,
      sf: solveFor,
    }),
    getShareText: () => {
      if (result) {
        return `Molarity Calculator Result: ${result.molarity.toFixed(4)} M solution`;
      }
      return 'Calculate molarity and prepare solutions with this free molarity calculator!';
    },
  });

  // Load selected compound
  useEffect(() => {
    if (selectedCompound) {
      const compound = COMMON_COMPOUNDS.find(c => c.formula === selectedCompound);
      if (compound) {
        setMolarMass(compound.molarMass.toString());
        setSearchQuery('');
      }
    }
  }, [selectedCompound]);

  const filteredCompounds = COMMON_COMPOUNDS.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.formula.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateMolarity = () => {
    const mm = parseFloat(molarMass);
    const m = parseFloat(mass);
    const v = parseFloat(volume);
    const mo = parseFloat(molarity);

    if (isNaN(mm) || mm <= 0) {
      alert('Please enter a valid molar mass.');
      return;
    }

    let calcMolarity = 0;
    let calcMoles = 0;
    let calcMass = 0;
    let calcVolume = 0;

    if (solveFor === 'molarity') {
      if (isNaN(m) || isNaN(v) || v <= 0) {
        alert('Please enter valid mass and volume.');
        return;
      }
      calcMoles = m / mm;
      calcVolume = v;
      calcMolarity = calcMoles / calcVolume;
      calcMass = m;
    } else if (solveFor === 'mass') {
      if (isNaN(mo) || isNaN(v) || v <= 0 || mo <= 0) {
        alert('Please enter valid molarity and volume.');
        return;
      }
      calcMolarity = mo;
      calcVolume = v;
      calcMoles = calcMolarity * calcVolume;
      calcMass = calcMoles * mm;
    } else if (solveFor === 'volume') {
      if (isNaN(mo) || isNaN(m) || mo <= 0) {
        alert('Please enter valid molarity and mass.');
        return;
      }
      calcMolarity = mo;
      calcMoles = m / mm;
      calcVolume = calcMoles / calcMolarity;
      calcMass = m;
    } else if (solveFor === 'moles') {
      if (isNaN(mo) || isNaN(v) || v <= 0 || mo <= 0) {
        alert('Please enter valid molarity and volume.');
        return;
      }
      calcMolarity = mo;
      calcVolume = v;
      calcMoles = calcMolarity * calcVolume;
      calcMass = calcMoles * mm;
    }

    // Generate preparation steps
    const steps: PreparationStep[] = [
      {
        step: 1,
        description: `Weigh ${calcMass.toFixed(3)} g of the compound using an analytical balance.`,
      },
      {
        step: 2,
        description: `Transfer the weighed compound to a clean, dry volumetric flask.`,
      },
      {
        step: 3,
        description: `Add distilled water to approximately 3/4 of the flask volume.`,
      },
      {
        step: 4,
        description: `Swirl the flask gently to dissolve the compound completely.`,
      },
      {
        step: 5,
        description: `Fill the flask with distilled water up to the ${calcVolume.toFixed(2)} L mark.`,
      },
      {
        step: 6,
        description: `Cap the flask and invert several times to ensure thorough mixing.`,
      },
      {
        step: 7,
        description: `Label the solution with: compound name, molarity (${calcMolarity.toFixed(4)} M), date, and your initials.`,
      },
    ];

    setResult({
      molarity: calcMolarity,
      moles: calcMoles,
      mass: calcMass,
      volume: calcVolume,
      steps,
    });
  };

  const calculateDilution = () => {
    const M1 = parseFloat(m1);
    const V1 = parseFloat(v1);
    const M2 = parseFloat(m2);
    const V2 = parseFloat(v2);

    let solvedM1 = M1;
    let solvedV1 = V1;
    let solvedM2 = M2;
    let solvedV2 = V2;

    // Check which parameter is missing and calculate it
    const provided = [!isNaN(M1), !isNaN(V1), !isNaN(M2), !isNaN(V2)];
    const missingCount = provided.filter(p => !p).length;

    if (missingCount !== 1) {
      alert('Please provide exactly 3 values (leave one blank to solve for it).');
      return;
    }

    // M1V1 = M2V2
    if (isNaN(M1)) {
      solvedM1 = (M2 * V2) / V1;
    } else if (isNaN(V1)) {
      solvedV1 = (M2 * V2) / M1;
    } else if (isNaN(M2)) {
      solvedM2 = (M1 * V1) / V2;
    } else if (isNaN(V2)) {
      solvedV2 = (M1 * V1) / M2;
    }

    const solventToAdd = solvedV2 - solvedV1;

    if (solventToAdd < 0) {
      alert('Final volume must be greater than initial volume for dilution.');
      return;
    }

    setDilutionResult({
      initialMolarity: solvedM1,
      initialVolume: solvedV1,
      finalMolarity: solvedM2,
      finalVolume: solvedV2,
      solventToAdd,
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
      link.download = `molarity-calculator-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Molarity Calculator Results</title>
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
          {/* Mode Selection */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Calculation Mode</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => setCalculationMode('molarity')}
                  className={calculationMode === 'molarity' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                >
                  Molarity
                </Button>
                <Button
                  onClick={() => setCalculationMode('dilution')}
                  className={calculationMode === 'dilution' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                >
                  Dilution
                </Button>
              </div>
            </CardContent>
          </Card>

          {calculationMode === 'molarity' ? (
            <>
              {/* Compound Selection */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Compound Library</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Search Compounds
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Search by name or formula..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Select Compound
                    </Label>
                    <select
                      value={selectedCompound}
                      onChange={(e) => setSelectedCompound(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Manual Entry</option>
                      {filteredCompounds.map((compound) => (
                        <option key={compound.formula} value={compound.formula}>
                          {compound.name} ({compound.formula}) - {compound.molarMass} g/mol
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Molarity Calculation */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Molarity Calculation</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Solve For
                    </Label>
                    <select
                      value={solveFor}
                      onChange={(e) => setSolveFor(e.target.value as any)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="molarity">Molarity (M)</option>
                      <option value="mass">Mass (g)</option>
                      <option value="volume">Volume (L)</option>
                      <option value="moles">Moles (mol)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="molarMass" className="text-sm font-medium text-gray-700">
                      Molar Mass (g/mol) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="molarMass"
                      type="number"
                      step="0.01"
                      value={molarMass}
                      onChange={(e) => setMolarMass(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="58.44"
                    />
                  </div>

                  {solveFor !== 'mass' && (
                    <div className="space-y-2">
                      <Label htmlFor="mass" className="text-sm font-medium text-gray-700">
                        Mass (g) <span className="text-red-500">*</span>
                      </Label>
                      <input
                        id="mass"
                        type="number"
                        step="0.001"
                        value={mass}
                        onChange={(e) => setMass(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="5.844"
                      />
                    </div>
                  )}

                  {solveFor !== 'volume' && (
                    <div className="space-y-2">
                      <Label htmlFor="volume" className="text-sm font-medium text-gray-700">
                        Volume (L) <span className="text-red-500">*</span>
                      </Label>
                      <input
                        id="volume"
                        type="number"
                        step="0.001"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1.0"
                      />
                    </div>
                  )}

                  {solveFor !== 'molarity' && (
                    <div className="space-y-2">
                      <Label htmlFor="molarity" className="text-sm font-medium text-gray-700">
                        Molarity (M) <span className="text-red-500">*</span>
                      </Label>
                      <input
                        id="molarity"
                        type="number"
                        step="0.0001"
                        value={molarity}
                        onChange={(e) => setMolarity(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.1"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button 
                onClick={calculateMolarity}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate
              </Button>
            </>
          ) : (
            <>
              {/* Dilution Calculation */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Dilution (M₁V₁ = M₂V₂)</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-gray-700">
                      Enter 3 values and leave one blank to solve for it
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="m1" className="text-sm font-medium text-gray-700">
                      Initial Molarity (M₁)
                    </Label>
                    <input
                      id="m1"
                      type="number"
                      step="0.0001"
                      value={m1}
                      onChange={(e) => setM1(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1.0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="v1" className="text-sm font-medium text-gray-700">
                      Initial Volume (V₁) in L
                    </Label>
                    <input
                      id="v1"
                      type="number"
                      step="0.001"
                      value={v1}
                      onChange={(e) => setV1(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="m2" className="text-sm font-medium text-gray-700">
                      Final Molarity (M₂)
                    </Label>
                    <input
                      id="m2"
                      type="number"
                      step="0.0001"
                      value={m2}
                      onChange={(e) => setM2(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="v2" className="text-sm font-medium text-gray-700">
                      Final Volume (V₂) in L
                    </Label>
                    <input
                      id="v2"
                      type="number"
                      step="0.001"
                      value={v2}
                      onChange={(e) => setV2(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1.0"
                    />
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={calculateDilution}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Dilution
              </Button>
            </>
          )}
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6" ref={resultRef}>
          {calculationMode === 'molarity' && result ? (
            <>
              {/* Main Results */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Calculation Results</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Molarity</p>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-700 break-all">
                        {result.molarity.toFixed(4)} M
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Moles</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900 break-all">
                        {result.moles.toFixed(4)} mol
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Mass Required</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900 break-all">
                        {result.mass.toFixed(3)} g
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Final Volume</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900 break-all">
                        {result.volume.toFixed(3)} L
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preparation Steps */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Solution Preparation Steps</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    {result.steps.map((step) => (
                      <div key={step.step} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>⚠️</span> Safety Precautions
                    </h4>
                    <ul className="text-xs text-amber-900 space-y-1 ml-6 list-disc">
                      <li>Always wear appropriate PPE (lab coat, gloves, safety goggles)</li>
                      <li>Work in a well-ventilated area or fume hood when required</li>
                      <li>Add acid to water, never water to acid</li>
                      <li>Check chemical safety data sheets (SDS) before use</li>
                      <li>Dispose of chemicals according to institutional guidelines</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : calculationMode === 'dilution' && dilutionResult ? (
            <>
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Dilution Results</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Initial Molarity (M₁)</p>
                        <p className="text-2xl font-bold text-blue-700">
                          {dilutionResult.initialMolarity.toFixed(4)} M
                        </p>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Initial Volume (V₁)</p>
                        <p className="text-2xl font-bold text-blue-700">
                          {dilutionResult.initialVolume.toFixed(4)} L
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Final Molarity (M₂)</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {dilutionResult.finalMolarity.toFixed(4)} M
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Final Volume (V₂)</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {dilutionResult.finalVolume.toFixed(4)} L
                        </p>
                      </div>
                    </div>

                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700 mb-2">Solvent to Add:</p>
                      <p className="text-3xl font-bold text-green-700">
                        {dilutionResult.solventToAdd.toFixed(4)} L
                      </p>
                      <p className="text-xs text-gray-600 mt-2">
                        ({(dilutionResult.solventToAdd * 1000).toFixed(2)} mL)
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-3">Dilution Instructions:</h4>
                      <ol className="text-sm text-gray-700 space-y-2 ml-4 list-decimal">
                        <li>Measure {(dilutionResult.initialVolume * 1000).toFixed(2)} mL of the {dilutionResult.initialMolarity.toFixed(4)} M stock solution</li>
                        <li>Transfer to a {(dilutionResult.finalVolume * 1000).toFixed(0)} mL volumetric flask</li>
                        <li>Add distilled water to approximately 3/4 of the flask volume</li>
                        <li>Swirl gently to mix</li>
                        <li>Fill with distilled water to the {(dilutionResult.finalVolume * 1000).toFixed(0)} mL mark</li>
                        <li>Cap and invert several times to ensure thorough mixing</li>
                        <li>Label: {dilutionResult.finalMolarity.toFixed(4)} M, {new Date().toLocaleDateString()}</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {calculationMode === 'molarity' 
                    ? 'Enter the required values and click Calculate to see results'
                    : 'Enter 3 dilution parameters to calculate the fourth'}
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
          disabled={!result && !dilutionResult}
        >
          <Download className="h-4 w-4" />
          Save as Image
        </Button>
        
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="gap-2"
          disabled={!result && !dilutionResult}
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
        calculatorName="Molarity Calculator"
      />
    </div>
  );
}

