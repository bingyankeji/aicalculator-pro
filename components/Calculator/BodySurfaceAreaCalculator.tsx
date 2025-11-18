'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, Info, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface BSAInputs {
  height: string;
  heightUnit: 'cm' | 'inches';
  weight: string;
  weightUnit: 'kg' | 'lbs';
  age: string;
  gender: 'male' | 'female';
}

interface BSAResult {
  duBois: number;
  mosteller: number;
  haycock: number;
  gehanGeorge: number;
  boyd: number;
  fujimoto: number;
  takahira: number;
  schlich: number;
  average: number;
  bmi: number;
  ageGroup: 'infant' | 'child' | 'adolescent' | 'adult';
  isNormalBSA: boolean;
  medicalApplications: {
    chemotherapyDose: string;
    dialysisFlow: string;
    burnArea: string;
  };
  interpretation: string;
}

export default function BodySurfaceAreaCalculator() {
  const [inputs, setInputs] = useState<BSAInputs>({
    height: '',
    heightUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
    age: '',
    gender: 'male',
  });

  const [result, setResult] = useState<BSAResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/body-surface-area-calculator',
    getShareParams: () => ({
      h: inputs.height || '',
      hu: inputs.heightUnit === 'cm' ? 'c' : 'i',
      w: inputs.weight || '',
      wu: inputs.weightUnit === 'kg' ? 'k' : 'l',
      a: inputs.age || '',
      g: inputs.gender === 'male' ? 'm' : 'f',
    }),
    getShareText: () => {
      return result
        ? `My Body Surface Area: ${result.average.toFixed(2)} m² (BSA Calculator)`
        : 'Calculate your Body Surface Area for medical applications!';
    },
  });

  const handleInputChange = (field: keyof BSAInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const convertToCm = (height: number, unit: 'cm' | 'inches'): number => {
    return unit === 'inches' ? height * 2.54 : height;
  };

  const convertToKg = (weight: number, unit: 'kg' | 'lbs'): number => {
    return unit === 'lbs' ? weight * 0.453592 : weight;
  };

  const calculateBSA = () => {
    const height = parseFloat(inputs.height);
    const weight = parseFloat(inputs.weight);
    const age = parseFloat(inputs.age);

    if (!height || !weight || height <= 0 || weight <= 0) {
      alert('Please enter valid height and weight.');
      return;
    }

    if (!age || age < 0 || age > 120) {
      alert('Please enter a valid age (0-120 years).');
      return;
    }

    // Convert to metric units
    const heightCm = convertToCm(height, inputs.heightUnit);
    const weightKg = convertToKg(weight, inputs.weightUnit);

    // Du Bois Formula: BSA = 0.007184 × Height^0.725 × Weight^0.425
    const duBois = 0.007184 * Math.pow(heightCm, 0.725) * Math.pow(weightKg, 0.425);

    // Mosteller Formula: BSA = √((Height × Weight) / 3600)
    const mosteller = Math.sqrt((heightCm * weightKg) / 3600);

    // Haycock Formula: BSA = 0.024265 × Height^0.3964 × Weight^0.5378
    const haycock = 0.024265 * Math.pow(heightCm, 0.3964) * Math.pow(weightKg, 0.5378);

    // Gehan & George Formula: BSA = 0.0235 × Height^0.42246 × Weight^0.51456
    const gehanGeorge = 0.0235 * Math.pow(heightCm, 0.42246) * Math.pow(weightKg, 0.51456);

    // Boyd Formula: BSA = 0.0003207 × Height^0.3 × Weight^(0.7285 - 0.0188 × log10(Weight))
    const boyd = 0.0003207 * Math.pow(heightCm, 0.3) * Math.pow(weightKg, 0.7285 - 0.0188 * Math.log10(weightKg));

    // Fujimoto Formula: BSA = 0.008883 × Height^0.663 × Weight^0.444
    const fujimoto = 0.008883 * Math.pow(heightCm, 0.663) * Math.pow(weightKg, 0.444);

    // Takahira Formula: BSA = 0.007241 × Height^0.725 × Weight^0.425
    const takahira = 0.007241 * Math.pow(heightCm, 0.725) * Math.pow(weightKg, 0.425);

    // Schlich Formula (gender-specific)
    let schlich: number;
    if (inputs.gender === 'male') {
      schlich = 0.000579479 * Math.pow(heightCm, 0.38) * Math.pow(weightKg, 0.93);
    } else {
      schlich = 0.000975482 * Math.pow(heightCm, 0.46) * Math.pow(weightKg, 0.78);
    }

    // Calculate average BSA
    const average = (duBois + mosteller + haycock + gehanGeorge + boyd + fujimoto + takahira + schlich) / 8;

    // Calculate BMI
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    // Determine age group
    let ageGroup: 'infant' | 'child' | 'adolescent' | 'adult';
    if (age < 2) {
      ageGroup = 'infant';
    } else if (age < 12) {
      ageGroup = 'child';
    } else if (age < 18) {
      ageGroup = 'adolescent';
    } else {
      ageGroup = 'adult';
    }

    // Check if BSA is in normal range
    let isNormalBSA = true;
    if (ageGroup === 'adult') {
      isNormalBSA = average >= 1.5 && average <= 2.5;
    } else if (ageGroup === 'adolescent') {
      isNormalBSA = average >= 1.0 && average <= 2.0;
    } else if (ageGroup === 'child') {
      isNormalBSA = average >= 0.5 && average <= 1.5;
    } else {
      isNormalBSA = average >= 0.2 && average <= 0.6;
    }

    // Medical applications (examples based on average BSA)
    const chemotherapyDose = `Example: Doxorubicin 50-60 mg/m² → ${(50 * average).toFixed(1)}-${(60 * average).toFixed(1)} mg`;
    const dialysisFlow = `Blood flow: ${(250 * average).toFixed(0)}-${(300 * average).toFixed(0)} mL/min`;
    const burnArea = `For ${(average * 100 / 2).toFixed(0)}% burns → BSA affected: ${(average * 0.5).toFixed(2)} m²`;

    let interpretation = '';
    if (ageGroup === 'adult') {
      if (average < 1.5) {
        interpretation = 'Below normal adult BSA range. May indicate very small frame or low body mass.';
      } else if (average > 2.5) {
        interpretation = 'Above normal adult BSA range. May indicate large frame or high body mass.';
      } else {
        interpretation = 'BSA is within normal adult range (1.5-2.5 m²).';
      }
    } else if (ageGroup === 'adolescent') {
      interpretation = 'Adolescent BSA. Use age-appropriate reference ranges for clinical decisions.';
    } else if (ageGroup === 'child') {
      interpretation = 'Pediatric BSA. Always use age and weight-adjusted dosing protocols.';
    } else {
      interpretation = 'Infant BSA. Extremely careful dosing required. Always consult pediatric guidelines.';
    }

    setResult({
      duBois,
      mosteller,
      haycock,
      gehanGeorge,
      boyd,
      fujimoto,
      takahira,
      schlich,
      average,
      bmi,
      ageGroup,
      isNormalBSA,
      medicalApplications: {
        chemotherapyDose,
        dialysisFlow,
        burnArea,
      },
      interpretation,
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
      link.download = `bsa-result-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>BSA Results</title>
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

  const getAgeGroupLabel = (ageGroup: string) => {
    switch (ageGroup) {
      case 'infant': return '👶 Infant (0-2 years)';
      case 'child': return '🧒 Child (2-12 years)';
      case 'adolescent': return '🧑 Adolescent (12-18 years)';
      case 'adult': return '👨 Adult (18+ years)';
      default: return 'Unknown';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Body Measurements</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
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
                  placeholder="25"
                  min="0"
                  max="120"
                  step="1"
                />
                <p className="text-xs text-gray-500">
                  Enter age for appropriate BSA reference ranges
                </p>
              </div>

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

              {/* Height */}
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
                    placeholder={inputs.heightUnit === 'cm' ? '170' : '67'}
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
                  Standing height measurement
                </p>
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
                  Weight <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-3">
                  <input
                    id="weight"
                    type="number"
                    value={inputs.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={inputs.weightUnit === 'kg' ? '70' : '154'}
                    min="0"
                    step="0.1"
                  />
                  <select
                    value={inputs.weightUnit}
                    onChange={(e) => handleInputChange('weightUnit', e.target.value as 'kg' | 'lbs')}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500">
                  Body weight measurement
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Calculate Button */}
          <Button
            onClick={calculateBSA}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate BSA
          </Button>

          {/* Info Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">What is BSA?</p>
                  <p className="text-xs">
                    Body Surface Area (BSA) is the measured or calculated surface area of a human body. 
                    It's used in medicine to calculate drug dosages, medical indicators, and other clinical measures.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warning Card for Pediatric */}
          {inputs.age && parseFloat(inputs.age) < 18 && (
            <Card className="bg-amber-50 border-amber-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-900">
                    <p className="font-semibold mb-1">⚠️ Pediatric Patient</p>
                    <p className="text-xs">
                      Age under 18 detected. Always use age and weight-adjusted dosing protocols. 
                      Consult pediatric guidelines for all medical calculations.
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
                <CardTitle className="text-xl text-gray-900">BSA Calculation Results</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Main Result */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                      <div className="text-6xl mb-3">📏</div>
                      <h3 className="text-sm text-gray-600 mb-2">Average Body Surface Area</h3>
                      <p className="text-5xl font-bold text-blue-900 mb-2">
                        {result.average.toFixed(2)}
                      </p>
                      <p className="text-2xl text-blue-700 mb-3">m²</p>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {getAgeGroupLabel(result.ageGroup)}
                        </span>
                      </div>
                      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                        result.isNormalBSA 
                          ? 'bg-green-100 text-green-800 border border-green-300' 
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {result.isNormalBSA ? '✓ Normal Range' : '⚠ Outside Typical Range'}
                      </div>
                    </div>

                    {/* Secondary Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <div className="text-xs text-gray-600 mb-1">BMI</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {result.bmi.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">kg/m²</div>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <div className="text-xs text-gray-600 mb-1">BSA (sq ft)</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {(result.average * 10.7639).toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">ft²</div>
                      </div>
                    </div>

                    {/* Interpretation */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                      <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <span className="text-xl">💡</span> Clinical Interpretation
                      </h4>
                      <p className="text-sm text-blue-800">
                        {result.interpretation}
                      </p>
                    </div>

                    {/* Formula Comparison Table */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-xl">📊</span> BSA by Formula (Comparison)
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="text-left py-2 px-3 text-gray-700 font-semibold">Formula</th>
                              <th className="text-right py-2 px-3 text-gray-700 font-semibold">BSA (m²)</th>
                              <th className="text-right py-2 px-3 text-gray-700 font-semibold">BSA (ft²)</th>
                              <th className="text-right py-2 px-3 text-gray-700 font-semibold">BSA (in²)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                              <td className="py-2 px-3 text-gray-900">Du Bois</td>
                              <td className="py-2 px-3 text-right font-semibold text-blue-700">{result.duBois.toFixed(3)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.duBois * 10.7639).toFixed(2)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.duBois * 1550).toFixed(0)}</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="py-2 px-3 text-gray-900">Mosteller</td>
                              <td className="py-2 px-3 text-right font-semibold text-blue-700">{result.mosteller.toFixed(3)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.mosteller * 10.7639).toFixed(2)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.mosteller * 1550).toFixed(0)}</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="py-2 px-3 text-gray-900">Haycock</td>
                              <td className="py-2 px-3 text-right font-semibold text-blue-700">{result.haycock.toFixed(3)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.haycock * 10.7639).toFixed(2)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.haycock * 1550).toFixed(0)}</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="py-2 px-3 text-gray-900">Gehan & George</td>
                              <td className="py-2 px-3 text-right font-semibold text-blue-700">{result.gehanGeorge.toFixed(3)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.gehanGeorge * 10.7639).toFixed(2)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.gehanGeorge * 1550).toFixed(0)}</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="py-2 px-3 text-gray-900">Boyd</td>
                              <td className="py-2 px-3 text-right font-semibold text-blue-700">{result.boyd.toFixed(3)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.boyd * 10.7639).toFixed(2)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.boyd * 1550).toFixed(0)}</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="py-2 px-3 text-gray-900">Fujimoto</td>
                              <td className="py-2 px-3 text-right font-semibold text-blue-700">{result.fujimoto.toFixed(3)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.fujimoto * 10.7639).toFixed(2)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.fujimoto * 1550).toFixed(0)}</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="py-2 px-3 text-gray-900">Takahira</td>
                              <td className="py-2 px-3 text-right font-semibold text-blue-700">{result.takahira.toFixed(3)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.takahira * 10.7639).toFixed(2)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.takahira * 1550).toFixed(0)}</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="py-2 px-3 text-gray-900">Schlich ({inputs.gender === 'male' ? 'Male' : 'Female'})</td>
                              <td className="py-2 px-3 text-right font-semibold text-blue-700">{result.schlich.toFixed(3)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.schlich * 10.7639).toFixed(2)}</td>
                              <td className="py-2 px-3 text-right text-gray-600">{(result.schlich * 1550).toFixed(0)}</td>
                            </tr>
                            <tr className="bg-blue-50 font-semibold">
                              <td className="py-2 px-3 text-gray-900">Average</td>
                              <td className="py-2 px-3 text-right text-blue-900">{result.average.toFixed(3)}</td>
                              <td className="py-2 px-3 text-right text-blue-900">{(result.average * 10.7639).toFixed(2)}</td>
                              <td className="py-2 px-3 text-right text-blue-900">{(result.average * 1550).toFixed(0)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        * Multiple formulas are shown for comparison. Clinical decisions should use the most appropriate 
                        formula for the patient population.
                      </p>
                    </div>

                    {/* Medical Applications */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                      <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">🏥</span> Medical Applications
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-white border border-green-200 rounded-lg p-4">
                          <h5 className="font-semibold text-green-900 mb-2">💊 Chemotherapy Dosing</h5>
                          <p className="text-sm text-green-800">{result.medicalApplications.chemotherapyDose}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            Note: Always verify dosing with oncology protocols. BSA-based dosing is standard for most chemotherapy agents.
                          </p>
                        </div>
                        <div className="bg-white border border-green-200 rounded-lg p-4">
                          <h5 className="font-semibold text-green-900 mb-2">🩸 Dialysis Parameters</h5>
                          <p className="text-sm text-green-800">{result.medicalApplications.dialysisFlow}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            Recommended blood flow rates during hemodialysis based on patient BSA.
                          </p>
                        </div>
                        <div className="bg-white border border-green-200 rounded-lg p-4">
                          <h5 className="font-semibold text-green-900 mb-2">🔥 Burn Assessment</h5>
                          <p className="text-sm text-green-800">{result.medicalApplications.burnArea}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            Example calculation for burn area assessment using Rule of Nines and BSA.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Clinical Notes */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                      <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">⚕️</span> Clinical Use Cases
                      </h4>
                      <ul className="space-y-2 text-sm text-purple-800">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-0.5">•</span>
                          <span><strong>Oncology:</strong> Calculate chemotherapy doses (most antineoplastic agents dosed in mg/m²)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-0.5">•</span>
                          <span><strong>Nephrology:</strong> Adjust medication doses in renal failure, calculate dialysis adequacy</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-0.5">•</span>
                          <span><strong>Cardiology:</strong> Calculate cardiac index (CI = Cardiac Output / BSA)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-0.5">•</span>
                          <span><strong>Critical Care:</strong> Burn resuscitation (Parkland formula uses BSA and % burn area)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-0.5">•</span>
                          <span><strong>Pediatrics:</strong> Age and weight-appropriate medication dosing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-0.5">•</span>
                          <span><strong>Research:</strong> Normalize physiologic measurements across different body sizes</span>
                        </li>
                      </ul>
                    </div>

                    {/* Reference Ranges */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                      <h4 className="font-bold text-gray-900 mb-3">📐 Normal BSA Reference Ranges</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">By Age Group:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Infants (0-2 years): 0.2-0.6 m²</li>
                            <li>• Children (2-12 years): 0.5-1.5 m²</li>
                            <li>• Adolescents (12-18 years): 1.0-2.0 m²</li>
                            <li>• Adults (18+ years): 1.5-2.5 m²</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">By Gender (Adult):</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Average Male: 1.9 m²</li>
                            <li>• Average Female: 1.6 m²</li>
                            <li>• Range (Both): 1.5-2.5 m²</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📏</div>
                    <p className="text-gray-500 text-lg">
                      Enter your measurements and click "Calculate BSA" to see your results
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
        calculatorName="Body Surface Area Calculator"
      />
    </div>
  );
}

