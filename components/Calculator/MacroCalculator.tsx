'use client';

import { useState, useRef } from 'react';
import { Share2 } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

interface MacroInputs {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  activityLevel: string;
  goal: 'cutting' | 'maintenance' | 'bulking';
  unitSystem: 'imperial' | 'metric';
  mealsPerDay: number;
}

interface MacroResult {
  // BMR & TDEE
  bmr: number;
  tdee: number;
  
  // Calories
  targetCalories: number;
  
  // Macros (grams)
  protein: number;
  carbs: number;
  fats: number;
  
  // Macros (calories)
  proteinCalories: number;
  carbsCalories: number;
  fatsCalories: number;
  
  // Macros (percentages)
  proteinPercent: number;
  carbsPercent: number;
  fatsPercent: number;
  
  // Per meal breakdown
  perMeal: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  
  // Weekly & Monthly totals
  weekly: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  
  monthly: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  
  // Recommendations
  recommendations: string[];
}

const activityLevels = [
  { value: '1.2', label: 'Sedentary', description: 'Little or no exercise' },
  { value: '1.375', label: 'Lightly Active', description: 'Exercise 1-3 days/week' },
  { value: '1.55', label: 'Moderately Active', description: 'Exercise 3-5 days/week' },
  { value: '1.725', label: 'Very Active', description: 'Exercise 6-7 days/week' },
  { value: '1.9', label: 'Extra Active', description: 'Hard exercise 2x/day' },
];

const goals = [
  { value: 'cutting', label: 'Cutting (Fat Loss)', deficit: -500, description: 'Lose 1 lb/week' },
  { value: 'maintenance', label: 'Maintenance', deficit: 0, description: 'Maintain weight' },
  { value: 'bulking', label: 'Bulking (Muscle Gain)', deficit: 300, description: 'Gain 0.5 lb/week' },
];

export function MacroCalculator() {
  const [inputs, setInputs] = useState<MacroInputs>({
    age: 30,
    gender: 'male',
    weight: 180,
    height: 70,
    activityLevel: '1.55',
    goal: 'maintenance',
    unitSystem: 'imperial',
    mealsPerDay: 3,
  });

  const [result, setResult] = useState<MacroResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/macro-calculator',
    getShareParams: () => ({
      a: inputs.age.toString(),
      g: inputs.gender,
      w: inputs.weight.toString(),
      h: inputs.height.toString(),
      al: inputs.activityLevel,
      go: inputs.goal,
      u: inputs.unitSystem,
      m: inputs.mealsPerDay.toString(),
    }),
    getShareText: () =>
      result
        ? `My Daily Macros: ${result.targetCalories} cal | Protein: ${result.protein}g | Carbs: ${result.carbs}g | Fats: ${result.fats}g`
        : 'Check out my macro calculation!',
  });

  const handleInputChange = (field: keyof MacroInputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);
  };

  const handleUnitSystemChange = (system: 'imperial' | 'metric') => {
    const newInputs = { ...inputs, unitSystem: system };
    
    if (system === 'metric' && inputs.unitSystem === 'imperial') {
      // Convert Imperial to Metric
      newInputs.weight = Math.round(inputs.weight * 0.453592);
      newInputs.height = Math.round(inputs.height * 2.54);
    } else if (system === 'imperial' && inputs.unitSystem === 'metric') {
      // Convert Metric to Imperial
      newInputs.weight = Math.round(inputs.weight / 0.453592);
      newInputs.height = Math.round(inputs.height / 2.54);
    }
    
    setInputs(newInputs);
  };

  const calculateMacros = () => {
    // Convert to metric for calculation
    const weightKg = inputs.unitSystem === 'imperial' 
      ? inputs.weight * 0.453592 
      : inputs.weight;
    const heightCm = inputs.unitSystem === 'imperial' 
      ? inputs.height * 2.54 
      : inputs.height;

    // Calculate BMR using Mifflin-St Jeor
    let bmr: number;
    if (inputs.gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * inputs.age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * inputs.age - 161;
    }

    // Calculate TDEE
    const tdee = bmr * parseFloat(inputs.activityLevel);

    // Calculate target calories based on goal
    const goalData = goals.find(g => g.value === inputs.goal)!;
    const targetCalories = Math.round(tdee + goalData.deficit);

    // Calculate macros based on goal
    let proteinGramsPerKg: number;
    let targetFatsPercent: number;

    if (inputs.goal === 'cutting') {
      // Cutting: High protein to preserve muscle
      proteinGramsPerKg = 2.2;
      targetFatsPercent = 25;
    } else if (inputs.goal === 'bulking') {
      // Bulking: Moderate protein, high carbs
      proteinGramsPerKg = 1.8;
      targetFatsPercent = 25;
    } else {
      // Maintenance: Balanced
      proteinGramsPerKg = 2.0;
      targetFatsPercent = 30;
    }

    // Calculate protein (grams and calories)
    const protein = Math.round(weightKg * proteinGramsPerKg);
    const proteinCalories = protein * 4;

    // Calculate fats (calories and grams)
    const fatsCalories = Math.round(targetCalories * (targetFatsPercent / 100));
    const fats = Math.round(fatsCalories / 9);

    // Calculate carbs (remainder)
    const carbsCalories = targetCalories - proteinCalories - fatsCalories;
    const carbs = Math.round(carbsCalories / 4);

    // Calculate actual percentages
    const totalCalories = proteinCalories + carbsCalories + fatsCalories;
    const proteinPercent = Math.round((proteinCalories / totalCalories) * 100);
    const carbsPercent = Math.round((carbsCalories / totalCalories) * 100);
    const fatsPercent = 100 - proteinPercent - carbsPercent;

    // Per meal breakdown
    const perMeal = {
      calories: Math.round(targetCalories / inputs.mealsPerDay),
      protein: Math.round(protein / inputs.mealsPerDay),
      carbs: Math.round(carbs / inputs.mealsPerDay),
      fats: Math.round(fats / inputs.mealsPerDay),
    };

    // Weekly totals
    const weekly = {
      calories: targetCalories * 7,
      protein: protein * 7,
      carbs: carbs * 7,
      fats: fats * 7,
    };

    // Monthly totals
    const monthly = {
      calories: targetCalories * 30,
      protein: protein * 30,
      carbs: carbs * 30,
      fats: fats * 30,
    };

    // Recommendations
    const recommendations: string[] = [];

    if (inputs.goal === 'cutting') {
      recommendations.push('💪 High protein intake helps preserve muscle mass during fat loss');
      recommendations.push('🥗 Focus on nutrient-dense, high-volume foods to stay full');
      recommendations.push('⏰ Consider intermittent fasting to manage hunger');
      recommendations.push('🏋️ Maintain strength training to preserve muscle');
      recommendations.push('💧 Drink at least ' + Math.round(weightKg * 0.033) + 'L of water daily');
    } else if (inputs.goal === 'bulking') {
      recommendations.push('🍗 Spread protein intake across all meals for optimal muscle synthesis');
      recommendations.push('🍚 Prioritize carbs around workouts for energy and recovery');
      recommendations.push('🥑 Include healthy fats for hormone production');
      recommendations.push('📈 Increase calories gradually if not gaining 0.5-1 lb/week');
      recommendations.push('💪 Focus on progressive overload in training');
    } else {
      recommendations.push('⚖️ Monitor weight weekly - adjust calories if weight changes');
      recommendations.push('🍎 Focus on whole foods and balanced meals');
      recommendations.push('🏃 Stay consistent with your exercise routine');
      recommendations.push('😴 Prioritize 7-9 hours of sleep for recovery');
      recommendations.push('📊 Track your intake for 1-2 weeks to ensure accuracy');
    }

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories,
      protein,
      carbs,
      fats,
      proteinCalories,
      carbsCalories,
      fatsCalories,
      proteinPercent,
      carbsPercent,
      fatsPercent,
      perMeal,
      weekly,
      monthly,
      recommendations,
    });
  };

  const handleReset = () => {
    setInputs({
      age: 30,
      gender: 'male',
      weight: 180,
      height: 70,
      activityLevel: '1.55',
      goal: 'maintenance',
      unitSystem: 'imperial',
      mealsPerDay: 3,
    });
    setResult(null);
  };

  // Save as Image
  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = 'macro-calculator-results.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  // Print Results
  const handlePrint = async () => {
    if (!resultRef.current) return;
    
    try {
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
              <title>Macro Calculator Results</title>
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
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-4">
          {/* Basic Info Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h3>
            
            {/* Unit System Toggle */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleUnitSystemChange('imperial')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    inputs.unitSystem === 'imperial'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Imperial
                </button>
                <button
                  onClick={() => handleUnitSystemChange('metric')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    inputs.unitSystem === 'metric'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Metric
                </button>
              </div>
            </div>

            {/* Age */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age (years)
              </label>
              <input
                type="number"
                value={inputs.age}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="15"
                max="100"
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleInputChange('gender', 'male')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    inputs.gender === 'male'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => handleInputChange('gender', 'female')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    inputs.gender === 'female'
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Weight */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight ({inputs.unitSystem === 'imperial' ? 'lbs' : 'kg'})
              </label>
              <input
                type="number"
                value={inputs.weight}
                onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.1"
              />
            </div>

            {/* Height */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height ({inputs.unitSystem === 'imperial' ? 'inches' : 'cm'})
              </label>
              <input
                type="number"
                value={inputs.height}
                onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.1"
              />
            </div>
          </div>

          {/* Activity & Goal Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Activity & Goals</h3>
            
            {/* Activity Level */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Level
              </label>
              <select
                value={inputs.activityLevel}
                onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {activityLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label} - {level.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Goal */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fitness Goal
              </label>
              <select
                value={inputs.goal}
                onChange={(e) => handleInputChange('goal', e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {goals.map((goal) => (
                  <option key={goal.value} value={goal.value}>
                    {goal.label} - {goal.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Meals Per Day */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meals Per Day
              </label>
              <input
                type="number"
                value={inputs.mealsPerDay}
                onChange={(e) => handleInputChange('mealsPerDay', parseInt(e.target.value) || 3)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="3"
                max="8"
              />
              <p className="text-xs text-gray-500 mt-1">Typically 3-6 meals for most people</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={calculateMacros}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md font-medium"
            >
              Calculate Macros
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {result ? (
            <div className="space-y-4">
              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleSaveAsImage}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Save as Image
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md font-medium"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Results Content (for export) */}
              <div ref={resultRef} className="space-y-4 bg-white p-6 rounded-xl">
                {/* Export Header */}
                <div className="border-b-2 border-gray-200 pb-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Macro Calculator Results</h2>
                  <p className="text-sm text-gray-600">
                    {inputs.age} years old • {inputs.gender === 'male' ? 'Male' : 'Female'} • {inputs.weight} {inputs.unitSystem === 'imperial' ? 'lbs' : 'kg'} • Goal: {inputs.goal.charAt(0).toUpperCase() + inputs.goal.slice(1)}
                  </p>
                </div>

              {/* Daily Targets Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>🎯</span>
                  Daily Macro Targets
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Calories</div>
                    <div className="text-2xl font-bold text-blue-600">{result.targetCalories}</div>
                    <div className="text-xs text-gray-500">kcal/day</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="text-sm text-gray-600 mb-1">Protein</div>
                    <div className="text-2xl font-bold text-red-600">{result.protein}g</div>
                    <div className="text-xs text-gray-500">{result.proteinPercent}%</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <div className="text-sm text-gray-600 mb-1">Carbs</div>
                    <div className="text-2xl font-bold text-yellow-600">{result.carbs}g</div>
                    <div className="text-xs text-gray-500">{result.carbsPercent}%</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <div className="text-sm text-gray-600 mb-1">Fats</div>
                    <div className="text-2xl font-bold text-orange-600">{result.fats}g</div>
                    <div className="text-xs text-gray-500">{result.fatsPercent}%</div>
                  </div>
                </div>

                {/* Macro Breakdown Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Macro Distribution</span>
                    <span className="text-xs text-gray-500">Click legend to view details</span>
                  </div>
                  <div className="h-8 flex rounded-lg overflow-hidden">
                    <div
                      className="bg-red-500 flex items-center justify-center text-white text-xs font-bold"
                      style={{ width: `${result.proteinPercent}%` }}
                      title={`Protein: ${result.protein}g (${result.proteinCalories} cal)`}
                    >
                      {result.proteinPercent}%
                    </div>
                    <div
                      className="bg-yellow-500 flex items-center justify-center text-white text-xs font-bold"
                      style={{ width: `${result.carbsPercent}%` }}
                      title={`Carbs: ${result.carbs}g (${result.carbsCalories} cal)`}
                    >
                      {result.carbsPercent}%
                    </div>
                    <div
                      className="bg-orange-500 flex items-center justify-center text-white text-xs font-bold"
                      style={{ width: `${result.fatsPercent}%` }}
                      title={`Fats: ${result.fats}g (${result.fatsCalories} cal)`}
                    >
                      {result.fatsPercent}%
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-600">
                    <span>🔴 Protein: {result.proteinCalories} cal</span>
                    <span>🟡 Carbs: {result.carbsCalories} cal</span>
                    <span>🟠 Fats: {result.fatsCalories} cal</span>
                  </div>
                </div>

                {/* BMR & TDEE Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">BMR (Base Metabolic Rate)</div>
                    <div className="text-lg font-bold text-gray-900">{result.bmr} cal/day</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">TDEE (Total Daily Energy)</div>
                    <div className="text-lg font-bold text-gray-900">{result.tdee} cal/day</div>
                  </div>
                </div>
              </div>

              {/* Per Meal Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🍽️</span>
                  Per Meal Breakdown ({inputs.mealsPerDay} meals/day)
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Calories</div>
                    <div className="text-xl font-bold text-blue-600">{result.perMeal.calories}</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Protein</div>
                    <div className="text-xl font-bold text-red-600">{result.perMeal.protein}g</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Carbs</div>
                    <div className="text-xl font-bold text-yellow-600">{result.perMeal.carbs}g</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Fats</div>
                    <div className="text-xl font-bold text-orange-600">{result.perMeal.fats}g</div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  💡 Aim to hit these targets in each meal for optimal nutrient distribution
                </p>
              </div>

              {/* Weekly & Monthly Totals */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-xl border border-purple-200 p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">📅 Weekly Totals</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Calories:</span>
                      <span className="font-bold">{result.weekly.calories.toLocaleString()} kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Protein:</span>
                      <span className="font-bold text-red-600">{result.weekly.protein.toLocaleString()}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Carbs:</span>
                      <span className="font-bold text-yellow-600">{result.weekly.carbs.toLocaleString()}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fats:</span>
                      <span className="font-bold text-orange-600">{result.weekly.fats.toLocaleString()}g</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl border border-green-200 p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">📊 Monthly Totals</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Calories:</span>
                      <span className="font-bold">{result.monthly.calories.toLocaleString()} kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Protein:</span>
                      <span className="font-bold text-red-600">{result.monthly.protein.toLocaleString()}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Carbs:</span>
                      <span className="font-bold text-yellow-600">{result.monthly.carbs.toLocaleString()}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fats:</span>
                      <span className="font-bold text-orange-600">{result.monthly.fats.toLocaleString()}g</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>💡</span>
                  Personalized Recommendations
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              </div> {/* End of Results Content for export */}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
              <div className="text-6xl mb-4">🍗</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Calculate Your Macros?</h3>
              <p className="text-gray-600 mb-4">
                Enter your information and click "Calculate Macros" to get your personalized macro targets
              </p>
              <p className="text-sm text-gray-500">
                We'll calculate your optimal protein, carbs, and fats based on your goal
              </p>
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
        calculatorName="Macro Calculator"
      />
    </div>
  );
}

