'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calculator, Heart, User, Share2, BarChart3, Target, Save, Trash2, Copy, X } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type Gender = 'male' | 'female';
type Unit = 'metric' | 'imperial';

interface IdealWeightInputs {
  height: number;
  gender: Gender;
  unit: Unit;
  age?: number;
  frameSize?: 'small' | 'medium' | 'large';
}

interface SavedScenario {
  id: string;
  name: string;
  inputs: IdealWeightInputs;
  result: IdealWeightResult;
  createdAt: Date;
}

interface FormulaResult {
  name: string;
  weight: number;
  description: string;
  source: string;
}

interface IdealWeightResult {
  formulas: FormulaResult[];
  averageWeight: number;
  weightRange: {
    min: number;
    max: number;
  };
  bmiRange: {
    min: number;
    max: number;
  };
  bodyTypeAnalysis: {
    category: string;
    description: string;
    recommendations: string[];
  };
  healthAssessment: {
    status: 'underweight' | 'normal' | 'overweight' | 'obese';
    message: string;
    tips: string[];
  };
}

// Ideal weight formulas
const calculateIdealWeight = (inputs: IdealWeightInputs): IdealWeightResult | null => {
  const { height, gender, unit, age, frameSize } = inputs;
  
  if (height <= 0) return null;
  
  // Convert height to centimeters if needed
  const heightCm = unit === 'imperial' ? height * 2.54 : height;
  const heightInches = unit === 'metric' ? height / 2.54 : height;
  
  if (heightCm < 100 || heightCm > 250) return null;
  
  const formulas: FormulaResult[] = [];
  
  // Robinson Formula (1983)
  const robinsonBase = gender === 'male' ? 52 : 49;
  const robinsonIncrement = gender === 'male' ? 1.9 : 1.7;
  const robinsonWeight = robinsonBase + (Math.max(0, heightInches - 60) * robinsonIncrement);
  formulas.push({
    name: 'Robinson Formula',
    weight: robinsonWeight,
    description: 'Widely used in clinical settings, based on height and gender',
    source: 'Robinson et al. (1983)'
  });
  
  // Miller Formula (1983)
  const millerBase = gender === 'male' ? 56.2 : 53.1;
  const millerIncrement = gender === 'male' ? 1.41 : 1.36;
  const millerWeight = millerBase + (Math.max(0, heightInches - 60) * millerIncrement);
  formulas.push({
    name: 'Miller Formula',
    weight: millerWeight,
    description: 'Modified version of Devine formula with updated coefficients',
    source: 'Miller et al. (1983)'
  });
  
  // Devine Formula (1974)
  const devineBase = gender === 'male' ? 50 : 45.5;
  const devineIncrement = gender === 'male' ? 2.3 : 2.3;
  const devineWeight = devineBase + (Math.max(0, heightInches - 60) * devineIncrement);
  formulas.push({
    name: 'Devine Formula',
    weight: devineWeight,
    description: 'Classic formula used in medical dosing calculations',
    source: 'Devine (1974)'
  });
  
  // Hamwi Formula (1964)
  const hamwiBase = gender === 'male' ? 48 : 45.5;
  const hamwiIncrement = gender === 'male' ? 2.7 : 2.2;
  const hamwiWeight = hamwiBase + (Math.max(0, heightInches - 60) * hamwiIncrement);
  formulas.push({
    name: 'Hamwi Formula',
    weight: hamwiWeight,
    description: 'Traditional formula used in nutrition and dietetics',
    source: 'Hamwi (1964)'
  });
  
  // Broca Formula (Modified)
  const brocaWeight = (heightCm - 100) - ((heightCm - 150) / (gender === 'male' ? 4 : 2.5));
  formulas.push({
    name: 'Broca Formula',
    weight: brocaWeight,
    description: 'European formula based on height minus 100, adjusted for gender',
    source: 'Broca (Modified)'
  });
  
  // Lorentz Formula
  const lorentzWeight = (heightCm - 100) - ((heightCm - 150) / (gender === 'male' ? 4 : 2));
  formulas.push({
    name: 'Lorentz Formula',
    weight: lorentzWeight,
    description: 'Similar to Broca but with different gender adjustments',
    source: 'Lorentz'
  });
  
  // Calculate average and range
  const weights = formulas.map(f => f.weight);
  const averageWeight = weights.reduce((sum, w) => sum + w, 0) / weights.length;
  const minWeight = Math.min(...weights);
  const maxWeight = Math.max(...weights);
  
  // Adjust for frame size
  let frameAdjustment = 1;
  if (frameSize === 'small') frameAdjustment = 0.9;
  else if (frameSize === 'large') frameAdjustment = 1.1;
  
  const adjustedMin = minWeight * frameAdjustment;
  const adjustedMax = maxWeight * frameAdjustment;
  const adjustedAverage = averageWeight * frameAdjustment;
  
  // Calculate BMI range
  const heightM = heightCm / 100;
  const minBMI = adjustedMin / (heightM * heightM);
  const maxBMI = adjustedMax / (heightM * heightM);
  
  // Body type analysis
  const getBodyTypeAnalysis = () => {
    const avgBMI = adjustedAverage / (heightM * heightM);
    
    if (avgBMI < 18.5) {
      return {
        category: 'Ectomorph Tendency',
        description: 'Naturally lean build with fast metabolism',
        recommendations: [
          'Focus on strength training to build muscle mass',
          'Eat frequent, nutrient-dense meals',
          'Include healthy fats and complex carbohydrates',
          'Consider working with a nutritionist for weight gain strategies'
        ]
      };
    } else if (avgBMI >= 18.5 && avgBMI < 25) {
      return {
        category: 'Mesomorph Tendency',
        description: 'Balanced build with moderate metabolism',
        recommendations: [
          'Maintain current healthy weight with balanced diet',
          'Combine cardio and strength training',
          'Focus on whole foods and portion control',
          'Regular health check-ups to monitor wellness'
        ]
      };
    } else {
      return {
        category: 'Endomorph Tendency',
        description: 'Larger frame with slower metabolism',
        recommendations: [
          'Emphasize cardiovascular exercise for weight management',
          'Choose low-glycemic foods and control portions',
          'Include strength training to boost metabolism',
          'Consider consulting healthcare providers for personalized plans'
        ]
      };
    }
  };
  
  // Health assessment
  const getHealthAssessment = () => {
    const avgBMI = adjustedAverage / (heightM * heightM);
    
    if (avgBMI < 18.5) {
      return {
        status: 'underweight' as const,
        message: 'Your ideal weight suggests you may be underweight',
        tips: [
          'Consult with a healthcare provider about healthy weight gain',
          'Focus on nutrient-dense, calorie-rich foods',
          'Consider strength training to build muscle mass',
          'Monitor your health regularly'
        ]
      };
    } else if (avgBMI >= 18.5 && avgBMI < 25) {
      return {
        status: 'normal' as const,
        message: 'Your ideal weight falls within the healthy range',
        tips: [
          'Maintain your current healthy lifestyle',
          'Continue regular exercise and balanced nutrition',
          'Stay hydrated and get adequate sleep',
          'Regular health screenings are recommended'
        ]
      };
    } else if (avgBMI >= 25 && avgBMI < 30) {
      return {
        status: 'overweight' as const,
        message: 'Your ideal weight suggests you may be overweight',
        tips: [
          'Consider a balanced approach to weight management',
          'Increase physical activity gradually',
          'Focus on whole foods and portion control',
          'Consult with healthcare providers for guidance'
        ]
      };
    } else {
      return {
        status: 'obese' as const,
        message: 'Your ideal weight suggests significant weight management may be needed',
        tips: [
          'Consult with healthcare providers for a comprehensive plan',
          'Consider working with registered dietitians',
          'Start with gentle, sustainable lifestyle changes',
          'Focus on overall health, not just weight loss'
        ]
      };
    }
  };
  
  return {
    formulas: formulas.map(f => ({
      ...f,
      weight: f.weight * frameAdjustment
    })),
    averageWeight: adjustedAverage,
    weightRange: {
      min: adjustedMin,
      max: adjustedMax
    },
    bmiRange: {
      min: minBMI,
      max: maxBMI
    },
    bodyTypeAnalysis: getBodyTypeAnalysis(),
    healthAssessment: getHealthAssessment()
  };
};

const weightPresets = [
  {
    name: 'Average Male',
    inputs: { height: 175, gender: 'male' as const, unit: 'metric' as const, frameSize: 'medium' as const }
  },
  {
    name: 'Average Female',
    inputs: { height: 162, gender: 'female' as const, unit: 'metric' as const, frameSize: 'medium' as const }
  },
  {
    name: 'Tall Male',
    inputs: { height: 185, gender: 'male' as const, unit: 'metric' as const, frameSize: 'large' as const }
  },
  {
    name: 'Petite Female',
    inputs: { height: 155, gender: 'female' as const, unit: 'metric' as const, frameSize: 'small' as const }
  }
];

function formatWeight(weight: number, unit: Unit): string {
  if (unit === 'imperial') {
    return `${weight.toFixed(1)} lbs`;
  }
  return `${weight.toFixed(1)} kg`;
}

function formatHeight(height: number, unit: Unit): string {
  if (unit === 'imperial') {
    const feet = Math.floor(height / 12);
    const inches = Math.round(height % 12);
    return `${feet}'${inches}"`;
  }
  return `${height} cm`;
}

function formatBMI(bmi: number): string {
  return bmi.toFixed(1);
}

export default function IdealWeightCalculator() {
  const [inputs, setInputs] = useState<IdealWeightInputs>({
    height: 170,
    gender: 'male',
    unit: 'metric',
    frameSize: 'medium'
  });

  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [scenarioName, setScenarioName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => {
    return calculateIdealWeight(inputs);
  }, [inputs]);

  const updateInput = (field: keyof IdealWeightInputs, value: string | number | Gender | Unit) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const saveScenario = () => {
    if (!result || !scenarioName.trim()) return;
    
    const newScenario: SavedScenario = {
      id: Date.now().toString(),
      name: scenarioName.trim(),
      inputs: { ...inputs },
      result: { ...result },
      createdAt: new Date()
    };
    
    setSavedScenarios(prev => [...prev, newScenario]);
    setScenarioName('');
    setShowSaveModal(false);
  };

  const deleteScenario = (id: string) => {
    setSavedScenarios(prev => prev.filter(s => s.id !== id));
  };

  const loadScenario = (scenario: SavedScenario) => {
    setInputs(scenario.inputs);
  };

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/ideal-weight-calculator',
    getShareParams: () => ({
      height: inputs.height.toString(),
      gender: inputs.gender,
      unit: inputs.unit,
      frame: inputs.frameSize || 'medium'
    }),
    getShareText: () => {
      if (!result) return 'Check out this ideal weight calculation!';
      return `Ideal Weight Analysis: ${formatWeight(result.averageWeight, inputs.unit)} (Range: ${formatWeight(result.weightRange.min, inputs.unit)} - ${formatWeight(result.weightRange.max, inputs.unit)})`;
    },
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Input Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Ideal Weight Calculator
          </h3>

          <div className="space-y-6">
            {/* Unit Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Measurement Unit</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateInput('unit', 'metric')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    inputs.unit === 'metric'
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">Metric</div>
                  <div className="text-xs opacity-75">cm, kg</div>
                </button>
                <button
                  onClick={() => updateInput('unit', 'imperial')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    inputs.unit === 'imperial'
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">Imperial</div>
                  <div className="text-xs opacity-75">ft/in, lbs</div>
                </button>
              </div>
            </div>

            {/* Height Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height {inputs.unit === 'metric' ? '(cm)' : '(inches)'}
              </label>
              <input
                type="number"
                value={inputs.height}
                onChange={(e) => updateInput('height', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={inputs.unit === 'metric' ? 100 : 39}
                max={inputs.unit === 'metric' ? 250 : 98}
                step={inputs.unit === 'metric' ? 1 : 0.5}
                placeholder={inputs.unit === 'metric' ? '170' : '67'}
              />
              {inputs.unit === 'imperial' && (
                <div className="text-xs text-gray-600 mt-1">
                  Current: {formatHeight(inputs.height, inputs.unit)}
                </div>
              )}
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateInput('gender', 'male')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    inputs.gender === 'male'
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">Male</div>
                  <div className="text-xs opacity-75">♂</div>
                </button>
                <button
                  onClick={() => updateInput('gender', 'female')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    inputs.gender === 'female'
                      ? 'border-pink-500 bg-pink-50 text-pink-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">Female</div>
                  <div className="text-xs opacity-75">♀</div>
                </button>
              </div>
            </div>

            {/* Frame Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Body Frame Size</label>
              <div className="grid grid-cols-3 gap-2">
                {['small', 'medium', 'large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => updateInput('frameSize', size as 'small' | 'medium' | 'large')}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      inputs.frameSize === size
                        ? 'border-green-500 bg-green-50 text-green-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="font-semibold capitalize">{size}</div>
                    <div className="text-xs opacity-75">
                      {size === 'small' ? '-10%' : size === 'large' ? '+10%' : 'Standard'}
                    </div>
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-600 mt-2">
                Frame size adjusts the ideal weight range by ±10%
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">🎯 Quick Presets</h4>
              <div className="grid grid-cols-2 gap-2">
                {weightPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setInputs(preset.inputs)}
                    className="p-3 text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-medium text-gray-900">{preset.name}</div>
                    <div className="text-xs text-gray-600">
                      {formatHeight(preset.inputs.height, preset.inputs.unit)} • {preset.inputs.gender}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Save Scenario */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">💾 Save This Analysis</h4>
              <button
                onClick={() => setShowSaveModal(true)}
                disabled={!result}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Save className="w-4 h-4" />
                Save Current Analysis
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setInputs({
                  height: 170,
                  gender: 'male',
                  unit: 'metric',
                  frameSize: 'medium'
                })}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Reset to Default
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Share2 className="w-4 h-4" />
                Share Results
              </button>
              {savedScenarios.length > 0 && (
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  <BarChart3 className="w-4 h-4" />
                  {showComparison ? 'Hide' : 'Compare'} Analyses ({savedScenarios.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Results Section */}
        <div className="space-y-6">
          {result && (
            <div ref={resultRef} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-600" />
                Ideal Weight Analysis
              </h4>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700 font-medium mb-1">Average Ideal Weight</div>
                  <div className="text-2xl font-bold text-green-900">{formatWeight(result.averageWeight, inputs.unit)}</div>
                  <div className="text-xs text-green-600">Based on 6 formulas</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">Weight Range</div>
                  <div className="text-lg font-bold text-blue-900">
                    {formatWeight(result.weightRange.min, inputs.unit)} - {formatWeight(result.weightRange.max, inputs.unit)}
                  </div>
                  <div className="text-xs text-blue-600">Healthy range for your frame</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-700 font-medium mb-1">BMI Range</div>
                  <div className="text-lg font-bold text-purple-900">
                    {formatBMI(result.bmiRange.min)} - {formatBMI(result.bmiRange.max)}
                  </div>
                  <div className="text-xs text-purple-600">Corresponding BMI values</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                  <div className="text-sm text-orange-700 font-medium mb-1">Body Type</div>
                  <div className="text-lg font-bold text-orange-900">{result.bodyTypeAnalysis.category}</div>
                  <div className="text-xs text-orange-600">Based on ideal weight analysis</div>
                </div>
              </div>

              {/* Health Assessment */}
              <div className="mb-6">
                <h5 className="text-lg font-bold text-gray-900 mb-4">🏥 Health Assessment</h5>
                <div className={`p-4 rounded-lg border-2 ${
                  result.healthAssessment.status === 'normal' ? 'bg-green-50 border-green-300' :
                  result.healthAssessment.status === 'underweight' ? 'bg-blue-50 border-blue-300' :
                  result.healthAssessment.status === 'overweight' ? 'bg-yellow-50 border-yellow-300' :
                  'bg-red-50 border-red-300'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                      result.healthAssessment.status === 'normal' ? 'bg-green-600 text-white' :
                      result.healthAssessment.status === 'underweight' ? 'bg-blue-600 text-white' :
                      result.healthAssessment.status === 'overweight' ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {result.healthAssessment.status.toUpperCase()}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{result.healthAssessment.message}</p>
                  <div className="space-y-1">
                    {result.healthAssessment.tips.map((tip, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Body Type Analysis */}
              <div className="mb-6">
                <h5 className="text-lg font-bold text-gray-900 mb-4">💪 Body Type Analysis</h5>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h6 className="font-bold text-gray-900 mb-2">{result.bodyTypeAnalysis.category}</h6>
                  <p className="text-gray-700 text-sm mb-3">{result.bodyTypeAnalysis.description}</p>
                  <div className="space-y-1">
                    {result.bodyTypeAnalysis.recommendations.map((rec, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Formula Breakdown */}
              <div className="mb-6">
                <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Formula Breakdown
                </h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b">Formula</th>
                        <th className="px-3 py-2 text-right font-semibold text-gray-900 border-b">Ideal Weight</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b">Description</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b">Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.formulas.map((formula, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium text-gray-900">{formula.name}</td>
                          <td className="px-3 py-2 text-right text-green-600 font-bold">
                            {formatWeight(formula.weight, inputs.unit)}
                          </td>
                          <td className="px-3 py-2 text-gray-700 text-xs">{formula.description}</td>
                          <td className="px-3 py-2 text-gray-600 text-xs">{formula.source}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Information */}
              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-4">📊 Analysis Details</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-700 font-medium mb-1">Height</div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatHeight(inputs.height, inputs.unit)}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-700 font-medium mb-1">Gender</div>
                    <div className="text-lg font-bold text-gray-900 capitalize">{inputs.gender}</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-700 font-medium mb-1">Frame Size</div>
                    <div className="text-lg font-bold text-gray-900 capitalize">{inputs.frameSize}</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-700 font-medium mb-1">Formulas Used</div>
                    <div className="text-lg font-bold text-gray-900">{result.formulas.length} Methods</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!result && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-600" />
                Ideal Weight Analysis
              </h4>
              <div className="text-center text-gray-500 py-8">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p>Enter your height and select your gender to see your ideal weight analysis</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison View */}
      {showComparison && savedScenarios.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">📊 Compare Weight Analyses</h3>
            <button
              onClick={() => setShowComparison(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Close comparison"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Analysis Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Height</th>
                  <th className="px-4 py-3 text-left font-semibold">Gender</th>
                  <th className="px-4 py-3 text-left font-semibold">Frame Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Ideal Weight</th>
                  <th className="px-4 py-3 text-left font-semibold">Weight Range</th>
                  <th className="px-4 py-3 text-left font-semibold">Body Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {savedScenarios.map((scenario) => (
                  <tr key={scenario.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{scenario.name}</td>
                    <td className="px-4 py-3">{formatHeight(scenario.inputs.height, scenario.inputs.unit)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        scenario.inputs.gender === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                      }`}>
                        {scenario.inputs.gender.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 capitalize">{scenario.inputs.frameSize}</td>
                    <td className="px-4 py-3 text-green-600 font-bold">
                      {formatWeight(scenario.result.averageWeight, scenario.inputs.unit)}
                    </td>
                    <td className="px-4 py-3 text-blue-600 font-medium">
                      {formatWeight(scenario.result.weightRange.min, scenario.inputs.unit)} - {formatWeight(scenario.result.weightRange.max, scenario.inputs.unit)}
                    </td>
                    <td className="px-4 py-3 text-orange-600 font-medium text-xs">
                      {scenario.result.bodyTypeAnalysis.category}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => loadScenario(scenario)}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => deleteScenario(scenario.id)}
                          className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Save Analysis Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Save Weight Analysis</h3>
              <button
                onClick={() => setShowSaveModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Name</label>
                <input
                  type="text"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  placeholder="e.g., Current Goal, Target Weight"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              {result && (
                <div className="bg-green-50 p-4 rounded-lg text-sm">
                  <div className="font-semibold text-green-900 mb-2">This analysis shows:</div>
                  <div className="text-green-800 space-y-1">
                    <div>• Ideal Weight: <span className="font-bold">{formatWeight(result.averageWeight, inputs.unit)}</span></div>
                    <div>• Weight Range: <span className="font-bold">
                      {formatWeight(result.weightRange.min, inputs.unit)} - {formatWeight(result.weightRange.max, inputs.unit)}
                    </span></div>
                    <div>• BMI Range: <span className="font-bold">
                      {formatBMI(result.bmiRange.min)} - {formatBMI(result.bmiRange.max)}
                    </span></div>
                    <div>• Body Type: <span className="font-bold">{result.bodyTypeAnalysis.category}</span></div>
                    <div>• Height: <span className="font-bold">{formatHeight(inputs.height, inputs.unit)}</span></div>
                    <div>• Gender: <span className="font-bold capitalize">{inputs.gender}</span></div>
                    <div>• Frame Size: <span className="font-bold capitalize">{inputs.frameSize}</span></div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={saveScenario}
                  disabled={!scenarioName.trim()}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Analysis
                </button>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ShareModal 
        isOpen={showShareModal} 
        onClose={closeShareModal} 
        shareUrl={shareUrl} 
        shareText={shareText} 
        calculatorName="Ideal Weight Calculator" 
      />
    </div>
  );
}
