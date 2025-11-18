'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, AlertTriangle, Info } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface GFRInputs {
  mode: 'adult' | 'pediatric';
  serumCreatinine: string;
  creatinineUnit: 'mg/dL' | 'umol/L';
  age: string;
  gender: 'male' | 'female';
  race: 'black' | 'nonBlack';
  height: string;
  heightUnit: 'cm' | 'inches';
}

interface GFRResult {
  ckdEpi: number;
  mdrd: number;
  cockcroftGault: number;
  schwartz?: number; // Pediatric only
  ckdStage: number;
  stageName: string;
  riskLevel: 'normal' | 'mild' | 'moderate' | 'severe' | 'kidney-failure';
  needsDialysis: boolean;
  interpretation: string;
  recommendations: string[];
  medicationWarnings: string[];
  lifestyle: string[];
}

export default function GFRCalculator() {
  const [inputs, setInputs] = useState<GFRInputs>({
    mode: 'adult',
    serumCreatinine: '',
    creatinineUnit: 'mg/dL',
    age: '',
    gender: 'male',
    race: 'nonBlack',
    height: '',
    heightUnit: 'cm',
  });

  const [result, setResult] = useState<GFRResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/gfr-calculator',
    getShareParams: () => ({
      m: inputs.mode === 'adult' ? 'a' : 'p',
      sc: inputs.serumCreatinine || '',
      u: inputs.creatinineUnit === 'mg/dL' ? 'm' : 'u',
      a: inputs.age || '',
      g: inputs.gender === 'male' ? 'm' : 'f',
      r: inputs.race === 'black' ? 'b' : 'n',
      h: inputs.height || '',
      hu: inputs.heightUnit === 'cm' ? 'c' : 'i',
    }),
    getShareText: () => {
      return result
        ? `My eGFR: ${result.ckdEpi.toFixed(1)} mL/min/1.73m² - CKD Stage ${result.ckdStage}`
        : 'Calculate your Glomerular Filtration Rate (GFR) for kidney function assessment!';
    },
  });

  const handleInputChange = (field: keyof GFRInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const convertCreatinineToMgDL = (value: number, unit: 'mg/dL' | 'umol/L'): number => {
    return unit === 'umol/L' ? value / 88.4 : value;
  };

  const convertHeightToCm = (height: number, unit: 'cm' | 'inches'): number => {
    return unit === 'inches' ? height * 2.54 : height;
  };

  const calculateGFR = () => {
    const creatinine = parseFloat(inputs.serumCreatinine);
    const age = parseFloat(inputs.age);

    if (!creatinine || creatinine <= 0) {
      alert('Please enter a valid serum creatinine value.');
      return;
    }

    if (inputs.mode === 'adult') {
      if (!age || age < 18 || age > 120) {
        alert('Please enter a valid age for adults (18-120 years).');
        return;
      }
    } else {
      if (!age || age < 0 || age > 18) {
        alert('Please enter a valid age for pediatric patients (0-18 years).');
        return;
      }
      const height = parseFloat(inputs.height);
      if (!height || height <= 0) {
        alert('Please enter a valid height for pediatric calculation.');
        return;
      }
    }

    // Convert creatinine to mg/dL if needed
    const creatinineMgDL = convertCreatinineToMgDL(creatinine, inputs.creatinineUnit);

    let ckdEpi = 0;
    let mdrd = 0;
    let cockcroftGault = 0;
    let schwartz: number | undefined;

    if (inputs.mode === 'adult') {
      // CKD-EPI Formula (2009)
      const kappa = inputs.gender === 'female' ? 0.7 : 0.9;
      const alpha = inputs.gender === 'female' ? -0.329 : -0.411;
      const minRatio = Math.min(creatinineMgDL / kappa, 1);
      const maxRatio = Math.max(creatinineMgDL / kappa, 1);
      
      ckdEpi = 141 * Math.pow(minRatio, alpha) * Math.pow(maxRatio, -1.209) * Math.pow(0.993, age);
      if (inputs.gender === 'female') {
        ckdEpi *= 1.018;
      }
      if (inputs.race === 'black') {
        ckdEpi *= 1.159;
      }

      // MDRD Formula (Modification of Diet in Renal Disease)
      mdrd = 175 * Math.pow(creatinineMgDL, -1.154) * Math.pow(age, -0.203);
      if (inputs.gender === 'female') {
        mdrd *= 0.742;
      }
      if (inputs.race === 'black') {
        mdrd *= 1.212;
      }

      // Cockcroft-Gault Formula (needs weight, using estimated 70kg for demonstration)
      // In real application, should ask for weight
      const estimatedWeight = inputs.gender === 'male' ? 75 : 65; // kg
      cockcroftGault = ((140 - age) * estimatedWeight) / (72 * creatinineMgDL);
      if (inputs.gender === 'female') {
        cockcroftGault *= 0.85;
      }
      // Normalize to 1.73 m²
      const estimatedBSA = inputs.gender === 'male' ? 1.9 : 1.6;
      cockcroftGault = (cockcroftGault * 1.73) / estimatedBSA;
    } else {
      // Pediatric calculation
      const heightCm = convertHeightToCm(parseFloat(inputs.height), inputs.heightUnit);
      
      // Schwartz Formula (Pediatric)
      const k = age < 1 ? 0.33 : (age < 13 ? 0.413 : (inputs.gender === 'male' ? 0.7 : 0.55));
      schwartz = (k * heightCm) / creatinineMgDL;
      
      // For pediatric, use Schwartz as main value
      ckdEpi = schwartz;
      mdrd = schwartz; // Same for display purposes
      cockcroftGault = schwartz;
    }

    // Determine CKD Stage
    let ckdStage = 1;
    let stageName = '';
    let riskLevel: GFRResult['riskLevel'] = 'normal';
    let needsDialysis = false;

    const gfr = ckdEpi;

    if (gfr >= 90) {
      ckdStage = 1;
      stageName = 'G1 - Normal or High';
      riskLevel = 'normal';
    } else if (gfr >= 60) {
      ckdStage = 2;
      stageName = 'G2 - Mildly Decreased';
      riskLevel = 'mild';
    } else if (gfr >= 45) {
      ckdStage = 3;
      stageName = 'G3a - Mild to Moderate';
      riskLevel = 'moderate';
    } else if (gfr >= 30) {
      ckdStage = 3;
      stageName = 'G3b - Moderate to Severe';
      riskLevel = 'moderate';
    } else if (gfr >= 15) {
      ckdStage = 4;
      stageName = 'G4 - Severely Decreased';
      riskLevel = 'severe';
      needsDialysis = false; // Not yet, but approaching
    } else {
      ckdStage = 5;
      stageName = 'G5 - Kidney Failure';
      riskLevel = 'kidney-failure';
      needsDialysis = true;
    }

    // Interpretation
    let interpretation = '';
    if (inputs.mode === 'adult') {
      if (gfr >= 90) {
        interpretation = 'Your kidney function is normal or high. However, if you have signs of kidney damage (protein in urine, structural abnormalities), you may still have CKD Stage 1. Maintain healthy lifestyle and regular check-ups.';
      } else if (gfr >= 60) {
        interpretation = 'Your kidney function is mildly decreased. This is common with aging. Monitor regularly and manage risk factors like blood pressure and diabetes. Most people at this stage don\'t experience symptoms.';
      } else if (gfr >= 45) {
        interpretation = 'Your kidney function is moderately decreased. You should be under nephrology care. Managing underlying conditions and medications is crucial. May start to experience some symptoms like fatigue and mild swelling.';
      } else if (gfr >= 30) {
        interpretation = 'Your kidney function is significantly decreased. Specialist nephrology care is essential. You may experience symptoms like fatigue, swelling, and changes in urination. Begin preparing for possible kidney replacement therapy.';
      } else if (gfr >= 15) {
        interpretation = 'Your kidney function is severely decreased. You need specialized nephrology care and should prepare for dialysis or kidney transplant. Symptoms are usually present including fatigue, nausea, swelling, and difficulty concentrating.';
      } else {
        interpretation = 'You have kidney failure. Dialysis or kidney transplant is necessary to sustain life. You are experiencing significant symptoms and require immediate medical attention and ongoing specialized care.';
      }
    } else {
      interpretation = `Pediatric eGFR: ${gfr.toFixed(1)} mL/min/1.73m². Normal pediatric GFR varies by age: infants ~40-80, children ~80-140, adolescents approach adult values. Consult pediatric nephrology for interpretation and management.`;
    }

    // Recommendations
    const recommendations: string[] = [];
    if (gfr >= 60) {
      recommendations.push('Maintain healthy blood pressure (target <130/80 mmHg)');
      recommendations.push('Control blood sugar if diabetic (HbA1c <7%)');
      recommendations.push('Annual kidney function monitoring');
      recommendations.push('Maintain healthy weight (BMI 18.5-25)');
    } else if (gfr >= 30) {
      recommendations.push('See nephrologist regularly (every 3-6 months)');
      recommendations.push('Strict blood pressure control (<130/80 mmHg)');
      recommendations.push('Tight diabetes control if applicable');
      recommendations.push('Monitor kidney function every 3-6 months');
      recommendations.push('Consider ACE inhibitor or ARB if not contraindicated');
      recommendations.push('Correct anemia if present (target Hb 10-11 g/dL)');
    } else {
      recommendations.push('Specialized nephrology care required');
      recommendations.push('Prepare for kidney replacement therapy (dialysis or transplant)');
      recommendations.push('Create vascular access for dialysis (AV fistula preferred)');
      recommendations.push('Consider kidney transplant evaluation');
      recommendations.push('Manage complications (anemia, bone disease, acidosis)');
      recommendations.push('Nutritionist consultation for kidney-friendly diet');
    }

    // Medication Warnings
    const medicationWarnings: string[] = [];
    if (gfr < 60) {
      medicationWarnings.push('⚠️ Many medications require dose adjustment at GFR <60');
      medicationWarnings.push('Avoid NSAIDs (ibuprofen, naproxen) - can worsen kidney function');
      medicationWarnings.push('Use contrast dyes cautiously (CT/MRI) - risk of contrast nephropathy');
    }
    if (gfr < 45) {
      medicationWarnings.push('Metformin dose adjustment or discontinuation may be needed');
      medicationWarnings.push('Some antibiotics need dose reduction (fluoroquinolones, aminoglycosides)');
      medicationWarnings.push('Avoid magnesium-containing antacids and laxatives');
    }
    if (gfr < 30) {
      medicationWarnings.push('Most medications require dose adjustment - consult pharmacist');
      medicationWarnings.push('Avoid potassium supplements and salt substitutes (high K⁺)');
      medicationWarnings.push('Monitor digoxin levels closely if prescribed');
      medicationWarnings.push('Avoid direct oral anticoagulants (DOACs) - warfarin preferred');
    }

    // Lifestyle
    const lifestyle: string[] = [];
    if (gfr >= 60) {
      lifestyle.push('🥗 Balanced diet with moderate protein intake');
      lifestyle.push('💧 Stay hydrated (8-10 glasses water/day)');
      lifestyle.push('🏃 Regular exercise (30 min, 5 days/week)');
      lifestyle.push('🚭 Quit smoking');
      lifestyle.push('🍷 Limit alcohol (≤1 drink/day women, ≤2 men)');
    } else if (gfr >= 30) {
      lifestyle.push('🥗 Low-salt diet (<2000 mg sodium/day)');
      lifestyle.push('🍖 Moderate protein restriction (0.8 g/kg/day)');
      lifestyle.push('💧 Fluid intake as directed by doctor (may be restricted)');
      lifestyle.push('🍌 Monitor potassium intake (avoid high-K⁺ foods if elevated)');
      lifestyle.push('🥛 Limit phosphorus intake');
      lifestyle.push('🏃 Light to moderate exercise as tolerated');
    } else {
      lifestyle.push('🥗 Strict low-salt diet (<2000 mg sodium/day)');
      lifestyle.push('🍖 Protein restriction (0.6-0.8 g/kg/day)');
      lifestyle.push('💧 Fluid restriction (500mL + previous day urine output)');
      lifestyle.push('🍌 Low-potassium diet (avoid bananas, oranges, tomatoes, potatoes)');
      lifestyle.push('🥛 Low-phosphorus diet with phosphate binders');
      lifestyle.push('🧂 No salt substitutes (contain potassium)');
      lifestyle.push('⚡ Conserve energy, rest when fatigued');
    }

    setResult({
      ckdEpi,
      mdrd,
      cockcroftGault,
      schwartz,
      ckdStage,
      stageName,
      riskLevel,
      needsDialysis,
      interpretation,
      recommendations,
      medicationWarnings,
      lifestyle,
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
      link.download = `gfr-result-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>GFR Results</title>
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

  const getRiskLevelColor = (level: GFRResult['riskLevel']) => {
    switch (level) {
      case 'normal': return 'from-green-50 to-emerald-50 border-green-200';
      case 'mild': return 'from-yellow-50 to-amber-50 border-yellow-200';
      case 'moderate': return 'from-orange-50 to-amber-50 border-orange-200';
      case 'severe': return 'from-red-50 to-orange-50 border-red-300';
      case 'kidney-failure': return 'from-red-100 to-red-50 border-red-400';
      default: return 'from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const getRiskLevelText = (level: GFRResult['riskLevel']) => {
    switch (level) {
      case 'normal': return { text: 'Normal Function', color: 'text-green-800', icon: '✅' };
      case 'mild': return { text: 'Mild Decrease', color: 'text-yellow-800', icon: '⚠️' };
      case 'moderate': return { text: 'Moderate Decrease', color: 'text-orange-800', icon: '⚠️' };
      case 'severe': return { text: 'Severe Decrease', color: 'text-red-800', icon: '🚨' };
      case 'kidney-failure': return { text: 'Kidney Failure', color: 'text-red-900', icon: '🚨' };
      default: return { text: 'Unknown', color: 'text-gray-800', icon: '❓' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Mode Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Patient Type <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleInputChange('mode', 'adult')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                      inputs.mode === 'adult'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    👨 Adult (≥18y)
                  </button>
                  <button
                    onClick={() => handleInputChange('mode', 'pediatric')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                      inputs.mode === 'pediatric'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-purple-300'
                    }`}
                  >
                    👶 Pediatric (&lt;18y)
                  </button>
                </div>
              </div>

              {/* Serum Creatinine */}
              <div className="space-y-2">
                <Label htmlFor="creatinine" className="text-sm font-medium text-gray-700">
                  Serum Creatinine (S<sub>Cr</sub>) <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-3">
                  <input
                    id="creatinine"
                    type="number"
                    value={inputs.serumCreatinine}
                    onChange={(e) => handleInputChange('serumCreatinine', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.9"
                    min="0"
                    step="0.1"
                  />
                  <select
                    value={inputs.creatinineUnit}
                    onChange={(e) => handleInputChange('creatinineUnit', e.target.value as 'mg/dL' | 'umol/L')}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="mg/dL">mg/dL</option>
                    <option value="umol/L">µmol/L</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500">
                  Normal range: 0.6-1.2 mg/dL (53-106 µmol/L)
                </p>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                  Age (years) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="age"
                  type="number"
                  value={inputs.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={inputs.mode === 'adult' ? '50' : '10'}
                  min="0"
                  max={inputs.mode === 'adult' ? '120' : '18'}
                  step="1"
                />
              </div>

              {inputs.mode === 'adult' ? (
                <>
                  {/* Gender */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Gender <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleInputChange('gender', 'male')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                          inputs.gender === 'male'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        👨 Male
                      </button>
                      <button
                        onClick={() => handleInputChange('gender', 'female')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                          inputs.gender === 'female'
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                        }`}
                      >
                        👩 Female
                      </button>
                    </div>
                  </div>

                  {/* Race */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Race <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleInputChange('race', 'nonBlack')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                          inputs.race === 'nonBlack'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        Non-Black
                      </button>
                      <button
                        onClick={() => handleInputChange('race', 'black')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                          inputs.race === 'black'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        Black
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Race affects GFR calculation due to differences in muscle mass
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Gender for pediatric */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Gender <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleInputChange('gender', 'male')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                          inputs.gender === 'male'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        👦 Male
                      </button>
                      <button
                        onClick={() => handleInputChange('gender', 'female')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                          inputs.gender === 'female'
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                        }`}
                      >
                        👧 Female
                      </button>
                    </div>
                  </div>

                  {/* Height for pediatric */}
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-sm font-medium text-gray-700">
                      Height <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-3">
                      <input
                        id="height"
                        type="number"
                        value={inputs.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={inputs.heightUnit === 'cm' ? '110' : '43'}
                        min="0"
                        step="0.1"
                      />
                      <select
                        value={inputs.heightUnit}
                        onChange={(e) => handleInputChange('heightUnit', e.target.value as 'cm' | 'inches')}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="cm">cm</option>
                        <option value="inches">inches</option>
                      </select>
                    </div>
                    <p className="text-xs text-gray-500">
                      Standing height measurement required for pediatric calculation
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Calculate Button */}
          <Button
            onClick={calculateGFR}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate GFR
          </Button>

          {/* Info Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">What is GFR?</p>
                  <p className="text-xs">
                    Glomerular Filtration Rate (GFR) measures how well your kidneys filter waste from blood. 
                    Normal GFR is 90-120 mL/min/1.73m². Lower GFR indicates reduced kidney function.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warning for Severe */}
          {result && result.riskLevel === 'severe' && (
            <Card className="bg-red-50 border-red-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-900">
                    <p className="font-semibold mb-1">🚨 Urgent Medical Attention Required</p>
                    <p className="text-xs">
                      Your GFR indicates severely reduced kidney function. Please consult a nephrologist 
                      immediately. You may need to prepare for dialysis or kidney transplant.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">GFR Calculation Results</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Main Result */}
                    <div className={`bg-gradient-to-r ${getRiskLevelColor(result.riskLevel)} border-2 rounded-xl p-6`}>
                      <div className="text-center mb-4">
                        <div className="text-6xl mb-3">🩺</div>
                        <h3 className="text-sm text-gray-600 mb-2">Estimated GFR (CKD-EPI Formula)</h3>
                        <p className="text-5xl font-bold text-blue-900 mb-2">
                          {result.ckdEpi.toFixed(1)}
                        </p>
                        <p className="text-lg text-gray-700 mb-4">mL/min/1.73m²</p>
                        
                        <div className="flex flex-col items-center gap-3">
                          <div className="bg-white border-2 border-blue-300 rounded-lg px-6 py-3">
                            <p className="text-sm text-gray-600 mb-1">CKD Stage</p>
                            <p className="text-2xl font-bold text-blue-900">{result.stageName}</p>
                          </div>
                          
                          <div className={`inline-flex items-center px-6 py-3 rounded-full font-semibold border-2 ${
                            result.riskLevel === 'normal' ? 'bg-green-100 text-green-800 border-green-300' :
                            result.riskLevel === 'mild' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                            result.riskLevel === 'moderate' ? 'bg-orange-100 text-orange-800 border-orange-300' :
                            result.riskLevel === 'severe' ? 'bg-red-100 text-red-800 border-red-300' :
                            'bg-red-200 text-red-900 border-red-400'
                          }`}>
                            {getRiskLevelText(result.riskLevel).icon} {getRiskLevelText(result.riskLevel).text}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Formula Comparison */}
                    {inputs.mode === 'adult' && (
                      <div className="bg-white border border-gray-200 rounded-lg p-5">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <span className="text-xl">📊</span> Formula Comparison
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div>
                              <p className="font-semibold text-gray-900">CKD-EPI (2009)</p>
                              <p className="text-xs text-gray-600">Most accurate, recommended by KDIGO</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-blue-700">{result.ckdEpi.toFixed(1)}</p>
                              <p className="text-xs text-gray-600">mL/min/1.73m²</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-semibold text-gray-900">MDRD</p>
                              <p className="text-xs text-gray-600">Older formula, less accurate at high GFR</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-700">{result.mdrd.toFixed(1)}</p>
                              <p className="text-xs text-gray-600">mL/min/1.73m²</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-semibold text-gray-900">Cockcroft-Gault</p>
                              <p className="text-xs text-gray-600">Estimates using age and weight</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-700">{result.cockcroftGault.toFixed(1)}</p>
                              <p className="text-xs text-gray-600">mL/min/1.73m²</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Interpretation */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                      <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">💡</span> Clinical Interpretation
                      </h4>
                      <p className="text-sm text-blue-800">
                        {result.interpretation}
                      </p>
                    </div>

                    {/* Dialysis Assessment */}
                    {result.needsDialysis && (
                      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5">
                        <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                          <span className="text-xl">🏥</span> Dialysis Evaluation Required
                        </h4>
                        <p className="text-sm text-red-800 mb-3">
                          Your GFR indicates kidney failure. Dialysis or kidney transplant is necessary to sustain life. 
                          Please consult with a nephrologist immediately to discuss kidney replacement therapy options.
                        </p>
                        <div className="bg-white border border-red-200 rounded-lg p-4">
                          <p className="text-sm font-semibold text-red-900 mb-2">Kidney Replacement Options:</p>
                          <ul className="text-xs text-red-800 space-y-1">
                            <li>• <strong>Hemodialysis:</strong> 3 times per week at dialysis center</li>
                            <li>• <strong>Peritoneal Dialysis:</strong> Daily at home via catheter</li>
                            <li>• <strong>Kidney Transplant:</strong> Best long-term option if eligible</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                      <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">✅</span> Medical Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-green-800 flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Medication Warnings */}
                    {result.medicationWarnings.length > 0 && (
                      <div className="bg-amber-50 border border-amber-300 rounded-lg p-5">
                        <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                          <span className="text-xl">💊</span> Medication Adjustments Required
                        </h4>
                        <ul className="space-y-2">
                          {result.medicationWarnings.map((warning, idx) => (
                            <li key={idx} className="text-sm text-amber-900 flex items-start gap-2">
                              <span className="text-amber-600 mt-0.5">•</span>
                              <span>{warning}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-amber-800 mt-3 font-semibold">
                          ⚠️ Always consult your doctor or pharmacist before taking any medications with reduced kidney function.
                        </p>
                      </div>
                    )}

                    {/* Lifestyle */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                      <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">🌟</span> Lifestyle & Diet Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {result.lifestyle.map((item, idx) => (
                          <li key={idx} className="text-sm text-purple-800 flex items-start gap-2">
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CKD Stage Reference */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                      <h4 className="font-bold text-gray-900 mb-4">📋 CKD Stage Reference Guide</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="text-left py-2 px-3 text-gray-700 font-semibold">Stage</th>
                              <th className="text-left py-2 px-3 text-gray-700 font-semibold">GFR (mL/min/1.73m²)</th>
                              <th className="text-left py-2 px-3 text-gray-700 font-semibold">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr className={result.ckdStage === 1 ? 'bg-green-50' : ''}>
                              <td className="py-2 px-3 font-medium">G1</td>
                              <td className="py-2 px-3">≥90</td>
                              <td className="py-2 px-3">Normal or High (with kidney damage)</td>
                            </tr>
                            <tr className={result.ckdStage === 2 ? 'bg-yellow-50' : ''}>
                              <td className="py-2 px-3 font-medium">G2</td>
                              <td className="py-2 px-3">60-89</td>
                              <td className="py-2 px-3">Mildly Decreased</td>
                            </tr>
                            <tr className={result.ckdStage === 3 && result.ckdEpi >= 45 ? 'bg-orange-50' : ''}>
                              <td className="py-2 px-3 font-medium">G3a</td>
                              <td className="py-2 px-3">45-59</td>
                              <td className="py-2 px-3">Mild to Moderate Decrease</td>
                            </tr>
                            <tr className={result.ckdStage === 3 && result.ckdEpi < 45 ? 'bg-orange-50' : ''}>
                              <td className="py-2 px-3 font-medium">G3b</td>
                              <td className="py-2 px-3">30-44</td>
                              <td className="py-2 px-3">Moderate to Severe Decrease</td>
                            </tr>
                            <tr className={result.ckdStage === 4 ? 'bg-red-50' : ''}>
                              <td className="py-2 px-3 font-medium">G4</td>
                              <td className="py-2 px-3">15-29</td>
                              <td className="py-2 px-3">Severely Decreased</td>
                            </tr>
                            <tr className={result.ckdStage === 5 ? 'bg-red-100' : ''}>
                              <td className="py-2 px-3 font-medium">G5</td>
                              <td className="py-2 px-3">&lt;15</td>
                              <td className="py-2 px-3">Kidney Failure (dialysis/transplant needed)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🩺</div>
                    <p className="text-gray-500 text-lg">
                      Enter patient information and click "Calculate GFR" to see results
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
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
        calculatorName="GFR Calculator"
      />
    </div>
  );
}

