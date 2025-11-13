'use client';

import React, { useState, useMemo } from 'react';
import { Scale, TrendingDown, TrendingUp, Activity, Share2, Download, Printer, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type Gender = 'male' | 'female';
type UnitSystem = 'imperial' | 'metric';
type FrameSize = 'small' | 'medium' | 'large';

interface WeightInputs {
  height: number;
  heightFeet?: number;
  heightInches?: number;
  currentWeight: number;
  gender: Gender;
  unitSystem: UnitSystem;
  frameSize: FrameSize;
}

interface IdealWeightResult {
  robinson: number;
  miller: number;
  devine: number;
  hamwi: number;
  average: number;
  healthyRange: { min: number; max: number };
  currentWeight: number;
  difference: number;
  bmi: number;
  analysis: {
    status: 'underweight' | 'healthy' | 'overweight' | 'obese';
    message: string;
    recommendations: string[];
  };
}

export function WeightCalculator() {
  const [inputs, setInputs] = useState<WeightInputs>({
    height: 170,
    heightFeet: 5,
    heightInches: 7,
    currentWeight: 70,
    gender: 'male',
    unitSystem: 'metric',
    frameSize: 'medium',
  });

  const [result, setResult] = useState<IdealWeightResult | null>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/weight-calculator',
    getShareParams: () => ({
      h: inputs.unitSystem === 'metric' ? inputs.height.toString() : `${inputs.heightFeet}-${inputs.heightInches}`,
      cw: inputs.currentWeight.toString(),
      g: inputs.gender,
      u: inputs.unitSystem,
      f: inputs.frameSize,
    }),
    getShareText: () => 
      result 
        ? `My Ideal Weight: ${result.average.toFixed(1)} ${inputs.unitSystem === 'metric' ? 'kg' : 'lbs'} | Current: ${result.currentWeight.toFixed(1)} ${inputs.unitSystem === 'metric' ? 'kg' : 'lbs'}`
        : 'Calculate your ideal weight!',
  });

  // Convert height to cm
  const getHeightInCm = (): number => {
    if (inputs.unitSystem === 'metric') {
      return inputs.height;
    } else {
      const feet = inputs.heightFeet || 0;
      const inches = inputs.heightInches || 0;
      return (feet * 12 + inches) * 2.54;
    }
  };

  // Convert weight to kg
  const getWeightInKg = (): number => {
    if (inputs.unitSystem === 'metric') {
      return inputs.currentWeight;
    } else {
      return inputs.currentWeight * 0.453592;
    }
  };

  // Calculate ideal weight using multiple formulas
  const calculateIdealWeight = useMemo((): IdealWeightResult | null => {
    const heightCm = getHeightInCm();
    const currentWeightKg = getWeightInKg();
    
    if (heightCm < 100 || heightCm > 250 || currentWeightKg <= 0) {
      return null;
    }

    const heightInches = heightCm / 2.54;
    const baseHeight = inputs.gender === 'male' ? 60 : 60; // 5 feet base

    // Robinson Formula (1983)
    let robinson = inputs.gender === 'male' 
      ? 52 + 1.9 * (heightInches - 60)
      : 49 + 1.7 * (heightInches - 60);

    // Miller Formula (1983)
    let miller = inputs.gender === 'male'
      ? 56.2 + 1.41 * (heightInches - 60)
      : 53.1 + 1.36 * (heightInches - 60);

    // Devine Formula (1974)
    let devine = inputs.gender === 'male'
      ? 50 + 2.3 * (heightInches - 60)
      : 45.5 + 2.3 * (heightInches - 60);

    // Hamwi Formula (1964)
    let hamwi = inputs.gender === 'male'
      ? 48 + 2.7 * (heightInches - 60)
      : 45.5 + 2.2 * (heightInches - 60);

    // Adjust for frame size
    const frameAdjustment = inputs.frameSize === 'small' ? 0.9 : inputs.frameSize === 'large' ? 1.1 : 1.0;
    robinson *= frameAdjustment;
    miller *= frameAdjustment;
    devine *= frameAdjustment;
    hamwi *= frameAdjustment;

    // Calculate average
    const average = (robinson + miller + devine + hamwi) / 4;

    // Calculate healthy weight range based on BMI (18.5-24.9)
    const heightM = heightCm / 100;
    const minWeight = 18.5 * heightM * heightM;
    const maxWeight = 24.9 * heightM * heightM;

    // Calculate current BMI
    const bmi = currentWeightKg / (heightM * heightM);

    // Analyze current vs ideal
    const difference = currentWeightKg - average;

    // Generate analysis
    let status: 'underweight' | 'healthy' | 'overweight' | 'obese';
    let message: string;
    let recommendations: string[];

    if (bmi < 18.5) {
      status = 'underweight';
      message = `Your current weight is ${Math.abs(difference).toFixed(1)} kg below your ideal weight. Focus on healthy weight gain.`;
      recommendations = [
        'Increase calorie intake with nutrient-dense foods',
        'Include more protein in your diet (lean meats, eggs, legumes)',
        'Eat more frequently (5-6 small meals per day)',
        'Strength training to build muscle mass',
        'Consult a healthcare provider to rule out underlying conditions',
      ];
    } else if (bmi >= 18.5 && bmi < 25) {
      status = 'healthy';
      message = `Great! Your current weight is within the healthy range${difference > 0 ? `, just ${difference.toFixed(1)} kg above` : `, ${Math.abs(difference).toFixed(1)} kg below`} your ideal weight.`;
      recommendations = [
        'Maintain your current healthy lifestyle',
        'Continue balanced diet with variety of nutrients',
        'Regular physical activity (150 minutes/week)',
        'Stay hydrated (8 glasses of water daily)',
        'Get adequate sleep (7-9 hours per night)',
      ];
    } else if (bmi >= 25 && bmi < 30) {
      status = 'overweight';
      message = `Your current weight is ${difference.toFixed(1)} kg above your ideal weight. A modest weight loss can improve your health.`;
      recommendations = [
        `Target weight loss: ${difference.toFixed(1)} kg over ${Math.ceil(difference / 2)} months`,
        'Reduce daily calorie intake by 500-750 calories',
        'Increase physical activity (cardio + strength training)',
        'Limit processed foods and sugary drinks',
        'Practice portion control and mindful eating',
        'Consider consulting a nutritionist for personalized plan',
      ];
    } else {
      status = 'obese';
      message = `Your current weight is ${difference.toFixed(1)} kg above your ideal weight. Losing weight can significantly improve your health.`;
      recommendations = [
        `Initial target: Lose 5-10% of body weight (${(currentWeightKg * 0.05).toFixed(1)}-${(currentWeightKg * 0.10).toFixed(1)} kg)`,
        'Consult healthcare provider before starting weight loss program',
        'Set realistic goals: 0.5-1 kg per week is healthy',
        'Combine diet and exercise for best results',
        'Consider working with a registered dietitian',
        'Focus on sustainable lifestyle changes, not quick fixes',
        'Track your progress weekly',
      ];
    }

    // Convert to display units if imperial
    if (inputs.unitSystem === 'imperial') {
      robinson /= 0.453592;
      miller /= 0.453592;
      devine /= 0.453592;
      hamwi /= 0.453592;
      const avgLbs = average / 0.453592;
      const minLbs = minWeight / 0.453592;
      const maxLbs = maxWeight / 0.453592;
      const currentLbs = currentWeightKg / 0.453592;
      const diffLbs = difference / 0.453592;

      return {
        robinson,
        miller,
        devine,
        hamwi,
        average: avgLbs,
        healthyRange: { min: minLbs, max: maxLbs },
        currentWeight: currentLbs,
        difference: diffLbs,
        bmi,
        analysis: { status, message: message.replace(/kg/g, 'lbs'), recommendations },
      };
    }

    return {
      robinson,
      miller,
      devine,
      hamwi,
      average,
      healthyRange: { min: minWeight, max: maxWeight },
      currentWeight: currentWeightKg,
      difference,
      bmi,
      analysis: { status, message, recommendations },
    };
  }, [inputs]);

  const handleCalculate = () => {
    const calculated = calculateIdealWeight;
    setResult(calculated);
  };

  const handleReset = () => {
    setInputs({
      height: 170,
      heightFeet: 5,
      heightInches: 7,
      currentWeight: 70,
      gender: 'male',
      unitSystem: 'metric',
      frameSize: 'medium',
    });
    setResult(null);
  };

  const handleUnitSystemChange = (newUnit: UnitSystem) => {
    if (newUnit === inputs.unitSystem) return;

    if (newUnit === 'imperial') {
      // Convert cm to feet/inches
      const totalInches = inputs.height / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      // Convert kg to lbs
      const lbs = inputs.currentWeight * 2.20462;
      
      setInputs({
        ...inputs,
        unitSystem: newUnit,
        heightFeet: feet,
        heightInches: inches,
        currentWeight: Math.round(lbs * 10) / 10,
      });
    } else {
      // Convert feet/inches to cm
      const totalInches = (inputs.heightFeet || 0) * 12 + (inputs.heightInches || 0);
      const cm = totalInches * 2.54;
      // Convert lbs to kg
      const kg = inputs.currentWeight * 0.453592;
      
      setInputs({
        ...inputs,
        unitSystem: newUnit,
        height: Math.round(cm),
        currentWeight: Math.round(kg * 10) / 10,
      });
    }
  };

  const handleSaveAsImage = async () => {
    const element = document.getElementById('weight-result');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = 'ideal-weight-calculation.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const unit = inputs.unitSystem === 'metric' ? 'kg' : 'lbs';
  const heightUnit = inputs.unitSystem === 'metric' ? 'cm' : 'ft/in';

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Scale className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Calculate Your Ideal Weight</h2>
        </div>

        {/* Unit System Toggle */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
          <div className="flex gap-3">
            <button
              onClick={() => handleUnitSystemChange('metric')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                inputs.unitSystem === 'metric'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Metric (cm, kg)
            </button>
            <button
              onClick={() => handleUnitSystemChange('imperial')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                inputs.unitSystem === 'imperial'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Imperial (ft/in, lbs)
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Height Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height {inputs.unitSystem === 'metric' ? '(cm)' : '(feet & inches)'}
            </label>
            {inputs.unitSystem === 'metric' ? (
              <input
                type="number"
                value={inputs.height}
                onChange={(e) => setInputs({ ...inputs, height: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="170"
              />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={inputs.heightFeet}
                  onChange={(e) => setInputs({ ...inputs, heightFeet: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5"
                />
                <input
                  type="number"
                  value={inputs.heightInches}
                  onChange={(e) => setInputs({ ...inputs, heightInches: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="7"
                />
              </div>
            )}
          </div>

          {/* Current Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Weight ({unit})
            </label>
            <input
              type="number"
              value={inputs.currentWeight}
              onChange={(e) => setInputs({ ...inputs, currentWeight: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={inputs.unitSystem === 'metric' ? '70' : '154'}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="flex gap-3">
              <button
                onClick={() => setInputs({ ...inputs, gender: 'male' })}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  inputs.gender === 'male'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setInputs({ ...inputs, gender: 'female' })}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  inputs.gender === 'female'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Frame Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Body Frame Size</label>
            <select
              value={inputs.frameSize}
              onChange={(e) => setInputs({ ...inputs, frameSize: e.target.value as FrameSize })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="small">Small Frame</option>
              <option value="medium">Medium Frame</option>
              <option value="large">Large Frame</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCalculate}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md flex items-center justify-center gap-2"
          >
            <Scale className="w-5 h-5" />
            Calculate Ideal Weight
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium shadow-md flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div id="weight-result" className="space-y-6">
          {/* Ideal Weight by Formula */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-600" />
              Your Ideal Weight Results
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-gray-600 mb-1">Robinson Formula (1983)</div>
                <div className="text-2xl font-bold text-blue-600">{result.robinson.toFixed(1)} {unit}</div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-gray-600 mb-1">Miller Formula (1983)</div>
                <div className="text-2xl font-bold text-blue-600">{result.miller.toFixed(1)} {unit}</div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-gray-600 mb-1">Devine Formula (1974)</div>
                <div className="text-2xl font-bold text-blue-600">{result.devine.toFixed(1)} {unit}</div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-gray-600 mb-1">Hamwi Formula (1964)</div>
                <div className="text-2xl font-bold text-blue-600">{result.hamwi.toFixed(1)} {unit}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
              <div className="text-sm mb-1">Average Ideal Weight</div>
              <div className="text-4xl font-bold">{result.average.toFixed(1)} {unit}</div>
              <div className="text-sm mt-2 opacity-90">
                Based on all four formulas and your {inputs.frameSize} frame size
              </div>
            </div>
          </div>

          {/* Current vs Ideal Analysis */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Weight Analysis</h3>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Current Weight</div>
                <div className="text-2xl font-bold text-gray-900">{result.currentWeight.toFixed(1)} {unit}</div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Ideal Weight</div>
                <div className="text-2xl font-bold text-blue-600">{result.average.toFixed(1)} {unit}</div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Difference</div>
                <div className={`text-2xl font-bold flex items-center justify-center gap-1 ${
                  result.difference > 0 ? 'text-red-600' : result.difference < 0 ? 'text-green-600' : 'text-gray-900'
                }`}>
                  {result.difference > 0 && <TrendingUp className="w-5 h-5" />}
                  {result.difference < 0 && <TrendingDown className="w-5 h-5" />}
                  {Math.abs(result.difference).toFixed(1)} {unit}
                </div>
              </div>
            </div>

            {/* Healthy Weight Range */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="font-semibold text-green-900 mb-2">Healthy Weight Range (BMI 18.5-24.9)</div>
              <div className="text-lg text-green-700">
                {result.healthyRange.min.toFixed(1)} - {result.healthyRange.max.toFixed(1)} {unit}
              </div>
              <div className="text-sm text-green-600 mt-1">
                Current BMI: {result.bmi.toFixed(1)}
              </div>
            </div>

            {/* Status Message */}
            <div className={`p-4 rounded-lg border-2 ${
              result.analysis.status === 'healthy' 
                ? 'bg-green-50 border-green-300'
                : result.analysis.status === 'underweight'
                ? 'bg-yellow-50 border-yellow-300'
                : result.analysis.status === 'overweight'
                ? 'bg-orange-50 border-orange-300'
                : 'bg-red-50 border-red-300'
            }`}>
              <p className={`font-medium ${
                result.analysis.status === 'healthy' 
                  ? 'text-green-900'
                  : result.analysis.status === 'underweight'
                  ? 'text-yellow-900'
                  : result.analysis.status === 'overweight'
                  ? 'text-orange-900'
                  : 'text-red-900'
              }`}>
                {result.analysis.message}
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Personalized Recommendations</h3>
            <ul className="space-y-3">
              {result.analysis.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 flex-1">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-xs font-medium">Share</span>
              </button>
              <button
                onClick={handleSaveAsImage}
                className="flex flex-col items-center gap-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span className="text-xs font-medium">Save</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex flex-col items-center gap-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span className="text-xs font-medium">Print</span>
              </button>
              <button
                onClick={handleReset}
                className="flex flex-col items-center gap-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-xs font-medium">Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Weight Calculator"
      />
    </div>
  );
}

