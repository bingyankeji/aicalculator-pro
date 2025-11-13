'use client';

import React, { useState, useEffect } from 'react';
import { User, Ruler, Scale, TrendingDown, Share2, Save, Printer, Activity } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

interface BodyFatInputs {
  gender: 'male' | 'female';
  age: number;
  weight: number;
  height: number;
  neck: number;
  waist: number;
  hip: number; // Only for females
  unitSystem: 'imperial' | 'metric';
}

interface BodyFatResult {
  navyMethod: {
    bodyFatPercentage: number;
    fatMass: number;
    leanMass: number;
    category: string;
    categoryColor: string;
  };
  ymcaMethod: {
    bodyFatPercentage: number;
    fatMass: number;
    leanMass: number;
    category: string;
    categoryColor: string;
  } | null;
  bmiMethod: {
    bodyFatPercentage: number;
    fatMass: number;
    leanMass: number;
    category: string;
    categoryColor: string;
  };
  healthyRange: {
    min: number;
    max: number;
  };
  analysis: {
    status: 'excellent' | 'good' | 'fair' | 'high' | 'very-high';
    recommendations: string[];
  };
}

export function BodyFatCalculator() {
  const [inputs, setInputs] = useState<BodyFatInputs>({
    gender: 'male',
    age: 30,
    weight: 180,
    height: 70,
    neck: 15,
    waist: 35,
    hip: 38,
    unitSystem: 'imperial',
  });

  const [result, setResult] = useState<BodyFatResult | null>(null);

  const calculateBodyFat = () => {
    const { gender, age, weight, height, neck, waist, hip, unitSystem } = inputs;

    // Convert to metric if needed
    let weightKg = weight;
    let heightCm = height;
    let neckCm = neck;
    let waistCm = waist;
    let hipCm = hip;

    if (unitSystem === 'imperial') {
      weightKg = weight * 0.453592;
      heightCm = height * 2.54;
      neckCm = neck * 2.54;
      waistCm = waist * 2.54;
      hipCm = hip * 2.54;
    }

    // Navy Method (Most Accurate with Measurements)
    let navyBF = 0;
    if (gender === 'male') {
      navyBF = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
      navyBF = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
    }
    
    const navyFatMass = (navyBF / 100) * weightKg;
    const navyLeanMass = weightKg - navyFatMass;

    // YMCA Method (Age-based estimation, less accurate but common)
    let ymcaBF = null;
    if (gender === 'male' && age >= 18) {
      // YMCA formula for men based on waist
      ymcaBF = -98.42 + 4.15 * waistCm - 0.082 * weightKg;
    } else if (gender === 'female' && age >= 18) {
      // YMCA formula for women based on waist
      ymcaBF = -76.76 + 4.15 * waistCm - 0.082 * weightKg;
    }
    
    let ymcaResult = null;
    if (ymcaBF !== null && ymcaBF > 0 && ymcaBF < 60) {
      const ymcaFatMass = (ymcaBF / 100) * weightKg;
      const ymcaLeanMass = weightKg - ymcaFatMass;
      
      ymcaResult = {
        bodyFatPercentage: ymcaBF,
        fatMass: ymcaFatMass,
        leanMass: ymcaLeanMass,
        category: getBodyFatCategory(ymcaBF, gender, age).category,
        categoryColor: getBodyFatCategory(ymcaBF, gender, age).color,
      };
    }

    // BMI-based Method (Least accurate but useful for comparison)
    const bmi = weightKg / Math.pow(heightCm / 100, 2);
    let bmiBF = 0;
    if (gender === 'male') {
      bmiBF = (1.20 * bmi) + (0.23 * age) - 16.2;
    } else {
      bmiBF = (1.20 * bmi) + (0.23 * age) - 5.4;
    }
    
    const bmiFatMass = (bmiBF / 100) * weightKg;
    const bmiLeanMass = weightKg - bmiFatMass;

    // Get category and color
    const navyCategory = getBodyFatCategory(navyBF, gender, age);
    const bmiCategory = getBodyFatCategory(bmiBF, gender, age);

    // Healthy range
    const healthyRange = getHealthyRange(gender, age);

    // Analysis and recommendations
    const analysis = getAnalysisAndRecommendations(navyBF, gender, age, weightKg, heightCm);

    setResult({
      navyMethod: {
        bodyFatPercentage: navyBF,
        fatMass: navyFatMass,
        leanMass: navyLeanMass,
        category: navyCategory.category,
        categoryColor: navyCategory.color,
      },
      ymcaMethod: ymcaResult,
      bmiMethod: {
        bodyFatPercentage: bmiBF,
        fatMass: bmiFatMass,
        leanMass: bmiLeanMass,
        category: bmiCategory.category,
        categoryColor: bmiCategory.color,
      },
      healthyRange,
      analysis,
    });
  };

  const getBodyFatCategory = (bf: number, gender: string, age: number) => {
    // Age and gender-specific categories
    let ranges;
    
    if (gender === 'male') {
      if (age < 30) {
        ranges = [
          { max: 8, category: 'Essential (Athletic)', color: 'blue' },
          { max: 14, category: 'Fitness', color: 'green' },
          { max: 20, category: 'Average', color: 'yellow' },
          { max: 25, category: 'Above Average', color: 'orange' },
          { max: 100, category: 'High', color: 'red' },
        ];
      } else if (age < 50) {
        ranges = [
          { max: 11, category: 'Essential (Athletic)', color: 'blue' },
          { max: 17, category: 'Fitness', color: 'green' },
          { max: 22, category: 'Average', color: 'yellow' },
          { max: 27, category: 'Above Average', color: 'orange' },
          { max: 100, category: 'High', color: 'red' },
        ];
      } else {
        ranges = [
          { max: 13, category: 'Essential (Athletic)', color: 'blue' },
          { max: 19, category: 'Fitness', color: 'green' },
          { max: 25, category: 'Average', color: 'yellow' },
          { max: 30, category: 'Above Average', color: 'orange' },
          { max: 100, category: 'High', color: 'red' },
        ];
      }
    } else {
      if (age < 30) {
        ranges = [
          { max: 14, category: 'Essential (Athletic)', color: 'blue' },
          { max: 21, category: 'Fitness', color: 'green' },
          { max: 25, category: 'Average', color: 'yellow' },
          { max: 31, category: 'Above Average', color: 'orange' },
          { max: 100, category: 'High', color: 'red' },
        ];
      } else if (age < 50) {
        ranges = [
          { max: 15, category: 'Essential (Athletic)', color: 'blue' },
          { max: 23, category: 'Fitness', color: 'green' },
          { max: 27, category: 'Average', color: 'yellow' },
          { max: 33, category: 'Above Average', color: 'orange' },
          { max: 100, category: 'High', color: 'red' },
        ];
      } else {
        ranges = [
          { max: 16, category: 'Essential (Athletic)', color: 'blue' },
          { max: 25, category: 'Fitness', color: 'green' },
          { max: 30, category: 'Average', color: 'yellow' },
          { max: 35, category: 'Above Average', color: 'orange' },
          { max: 100, category: 'High', color: 'red' },
        ];
      }
    }

    return ranges.find(r => bf <= r.max) || ranges[ranges.length - 1];
  };

  const getHealthyRange = (gender: string, age: number) => {
    if (gender === 'male') {
      if (age < 30) return { min: 8, max: 20 };
      if (age < 50) return { min: 11, max: 22 };
      return { min: 13, max: 25 };
    } else {
      if (age < 30) return { min: 14, max: 25 };
      if (age < 50) return { min: 15, max: 27 };
      return { min: 16, max: 30 };
    }
  };

  const getAnalysisAndRecommendations = (bf: number, gender: string, age: number, weightKg: number, heightCm: number) => {
    const healthyRange = getHealthyRange(gender, age);
    const recommendations: string[] = [];
    
    let status: 'excellent' | 'good' | 'fair' | 'high' | 'very-high' = 'good';

    if (bf < healthyRange.min) {
      status = 'excellent';
      recommendations.push('You have an athletic body fat percentage. Maintain with balanced diet and regular exercise.');
      recommendations.push('Ensure adequate essential fat for hormonal function and organ protection.');
      if (gender === 'female') {
        recommendations.push('Women need higher essential body fat (10-13%) for reproductive health.');
      }
      recommendations.push('Focus on strength training to preserve lean muscle mass.');
    } else if (bf <= healthyRange.max) {
      status = 'good';
      recommendations.push('Your body fat is in the healthy range for your age and gender.');
      recommendations.push('Maintain current lifestyle with regular exercise (150 minutes/week).');
      recommendations.push('Eat a balanced diet with adequate protein (0.8g per kg body weight).');
      recommendations.push('Include both cardio and strength training in your routine.');
    } else if (bf <= healthyRange.max + 5) {
      status = 'fair';
      recommendations.push('Your body fat is slightly above the healthy range.');
      recommendations.push('Create a modest calorie deficit (300-500 cal/day) through diet and exercise.');
      recommendations.push('Increase physical activity to 200-300 minutes per week.');
      recommendations.push('Focus on resistance training to preserve lean muscle while losing fat.');
      recommendations.push('Track your progress with measurements every 2-4 weeks.');
    } else if (bf <= healthyRange.max + 10) {
      status = 'high';
      recommendations.push('Your body fat is elevated. Consider medical consultation for a health check.');
      recommendations.push('Start with moderate exercise: 30 minutes walking daily.');
      recommendations.push('Reduce calorie intake by 500-750 calories per day for steady fat loss.');
      recommendations.push('Focus on whole foods: lean proteins, vegetables, fruits, whole grains.');
      recommendations.push('Consider working with a registered dietitian and personal trainer.');
      recommendations.push('Set realistic goals: 1-2 pounds per week fat loss.');
    } else {
      status = 'very-high';
      recommendations.push('Your body fat is significantly elevated. Medical consultation recommended.');
      recommendations.push('Start slowly: low-impact exercises like walking, swimming, or cycling.');
      recommendations.push('Consider consulting with healthcare provider before starting exercise program.');
      recommendations.push('Work with registered dietitian for personalized nutrition plan.');
      recommendations.push('Focus on sustainable lifestyle changes, not crash diets.');
      recommendations.push('Track progress with body measurements and how you feel, not just scale.');
      recommendations.push('Join support groups or work with health coach for accountability.');
    }

    return { status, recommendations };
  };

  useEffect(() => {
    calculateBodyFat();
  }, [inputs]);

  const toggleUnit = () => {
    const newUnit = inputs.unitSystem === 'imperial' ? 'metric' : 'imperial';
    
    if (newUnit === 'metric') {
      setInputs({
        ...inputs,
        weight: parseFloat((inputs.weight * 0.453592).toFixed(1)),
        height: parseFloat((inputs.height * 2.54).toFixed(1)),
        neck: parseFloat((inputs.neck * 2.54).toFixed(1)),
        waist: parseFloat((inputs.waist * 2.54).toFixed(1)),
        hip: parseFloat((inputs.hip * 2.54).toFixed(1)),
        unitSystem: newUnit,
      });
    } else {
      setInputs({
        ...inputs,
        weight: parseFloat((inputs.weight / 0.453592).toFixed(1)),
        height: parseFloat((inputs.height / 2.54).toFixed(1)),
        neck: parseFloat((inputs.neck / 2.54).toFixed(1)),
        waist: parseFloat((inputs.waist / 2.54).toFixed(1)),
        hip: parseFloat((inputs.hip / 2.54).toFixed(1)),
        unitSystem: newUnit,
      });
    }
  };

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/body-fat-calculator',
    getShareParams: () => ({
      g: inputs.gender,
      a: inputs.age.toString(),
      w: inputs.weight.toString(),
      h: inputs.height.toString(),
      n: inputs.neck.toString(),
      wa: inputs.waist.toString(),
      hi: inputs.hip.toString(),
      u: inputs.unitSystem,
    }),
    getShareText: () =>
      result
        ? `My Body Fat: ${result.navyMethod.bodyFatPercentage.toFixed(1)}% (Navy Method) | Category: ${result.navyMethod.category}`
        : 'Check out my body fat calculation!',
  });

  const handleSaveImage = async () => {
    const element = document.getElementById('bodyfat-result');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'body-fat-calculation.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-5 gap-6">
        {/* Input Section - 3 columns */}
        <div className="md:col-span-3 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Basic Information
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setInputs({ ...inputs, gender: 'male' })}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        inputs.gender === 'male'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      onClick={() => setInputs({ ...inputs, gender: 'female' })}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        inputs.gender === 'female'
                          ? 'bg-pink-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit System
                  </label>
                  <button
                    onClick={toggleUnit}
                    className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-all"
                  >
                    {inputs.unitSystem === 'imperial' ? '🇺🇸 Imperial' : '🌍 Metric'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={inputs.age || ''}
                    onChange={(e) => setInputs({ ...inputs, age: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="30"
                    min="18"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight ({inputs.unitSystem === 'imperial' ? 'lbs' : 'kg'})
                  </label>
                  <input
                    type="number"
                    value={inputs.weight || ''}
                    onChange={(e) => setInputs({ ...inputs, weight: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={inputs.unitSystem === 'imperial' ? '180' : '82'}
                    step="0.1"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Body Measurements */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-green-600" />
              Body Measurements
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height ({inputs.unitSystem === 'imperial' ? 'inches' : 'cm'})
                </label>
                <input
                  type="number"
                  value={inputs.height || ''}
                  onChange={(e) => setInputs({ ...inputs, height: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold"
                  placeholder={inputs.unitSystem === 'imperial' ? '70' : '178'}
                  step="0.1"
                  min="0"
                />
                {inputs.unitSystem === 'imperial' && (
                  <p className="text-xs text-gray-500 mt-2">
                    Example: 5'10" = 70 inches
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Neck ({inputs.unitSystem === 'imperial' ? 'inches' : 'cm'})
                  </label>
                  <input
                    type="number"
                    value={inputs.neck || ''}
                    onChange={(e) => setInputs({ ...inputs, neck: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={inputs.unitSystem === 'imperial' ? '15' : '38'}
                    step="0.1"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Just below Adam's apple
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Waist ({inputs.unitSystem === 'imperial' ? 'inches' : 'cm'})
                  </label>
                  <input
                    type="number"
                    value={inputs.waist || ''}
                    onChange={(e) => setInputs({ ...inputs, waist: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={inputs.unitSystem === 'imperial' ? '35' : '89'}
                    step="0.1"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    At navel level
                  </p>
                </div>
              </div>

              {inputs.gender === 'female' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hip ({inputs.unitSystem === 'imperial' ? 'inches' : 'cm'})
                  </label>
                  <input
                    type="number"
                    value={inputs.hip || ''}
                    onChange={(e) => setInputs({ ...inputs, hip: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={inputs.unitSystem === 'imperial' ? '38' : '97'}
                    step="0.1"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    At widest point around hips
                  </p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-gray-700">
                <strong>Measurement Tips:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Measure in the morning before eating</li>
                  <li>Stand relaxed, don't suck in or flex</li>
                  <li>Use flexible tape measure (not metal)</li>
                  <li>Take 2-3 measurements and use average</li>
                  <li>Keep tape snug but not tight</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section - 2 columns */}
        <div className="md:col-span-2 space-y-6">
          {result && (
            <>
              <div id="bodyfat-result" className={`rounded-xl shadow-lg border p-6 ${
                result.analysis.status === 'excellent' || result.analysis.status === 'good'
                  ? 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200'
                  : result.analysis.status === 'fair'
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
                  : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'
              }`}>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Body Fat Analysis
                </h3>

                {/* Navy Method (Primary Result) */}
                <div className="bg-white rounded-lg p-5 mb-4 border-2 border-blue-300">
                  <div className="text-xs text-gray-600 mb-2 font-semibold">US Navy Method (Most Accurate)</div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {result.navyMethod.bodyFatPercentage.toFixed(1)}%
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${
                    result.navyMethod.categoryColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                    result.navyMethod.categoryColor === 'green' ? 'bg-green-100 text-green-800' :
                    result.navyMethod.categoryColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                    result.navyMethod.categoryColor === 'orange' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {result.navyMethod.category}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fat Mass:</span>
                      <span className="font-semibold">
                        {result.navyMethod.fatMass.toFixed(1)} {inputs.unitSystem === 'imperial' ? 'lbs' : 'kg'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lean Mass:</span>
                      <span className="font-semibold text-green-600">
                        {result.navyMethod.leanMass.toFixed(1)} {inputs.unitSystem === 'imperial' ? 'lbs' : 'kg'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* YMCA Method */}
                {result.ymcaMethod && (
                  <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-2 font-semibold">YMCA Method</div>
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      {result.ymcaMethod.bodyFatPercentage.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      Difference from Navy: {Math.abs(result.navyMethod.bodyFatPercentage - result.ymcaMethod.bodyFatPercentage).toFixed(1)}%
                    </div>
                  </div>
                )}

                {/* BMI-based Method */}
                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                  <div className="text-xs text-gray-600 mb-2 font-semibold">BMI-based Method (Estimate)</div>
                  <div className="text-2xl font-bold text-gray-600 mb-2">
                    {result.bmiMethod.bodyFatPercentage.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500">
                    Difference from Navy: {Math.abs(result.navyMethod.bodyFatPercentage - result.bmiMethod.bodyFatPercentage).toFixed(1)}%
                  </div>
                </div>

                {/* Healthy Range */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-xs text-gray-600 mb-2 font-semibold">
                    Healthy Range for {inputs.gender === 'male' ? 'Men' : 'Women'} (Age {inputs.age})
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {result.healthyRange.min}% - {result.healthyRange.max}%
                  </div>
                  {result.navyMethod.bodyFatPercentage < result.healthyRange.min ? (
                    <p className="text-xs text-blue-600 mt-2">Below healthy range (athletic level)</p>
                  ) : result.navyMethod.bodyFatPercentage <= result.healthyRange.max ? (
                    <p className="text-xs text-green-600 mt-2">✓ Within healthy range</p>
                  ) : (
                    <p className="text-xs text-orange-600 mt-2">Above healthy range</p>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-blue-600" />
                  Recommendations
                </h3>
                <div className="space-y-2">
                  {result.analysis.recommendations.map((rec, index) => (
                    <div key={index} className="flex gap-2 text-xs text-gray-700">
                      <span className="text-blue-600 flex-shrink-0">•</span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleShare}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Results
                  </button>
                  <button
                    onClick={handleSaveImage}
                    className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save as Image
                  </button>
                  <button
                    onClick={handlePrint}
                    className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Body Fat Calculator"
      />
    </div>
  );
}

