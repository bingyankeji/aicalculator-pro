'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calculator, TrendingDown, TrendingUp, Activity, Utensils, Share2, Download, Printer, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
type Goal = 'lose-2' | 'lose-1' | 'lose-0.5' | 'maintain' | 'gain-0.5' | 'gain-1';
type UnitSystem = 'imperial' | 'metric';
type Formula = 'mifflin' | 'harris';

interface CalorieInputs {
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  unitSystem: UnitSystem;
  formula: Formula;
}

interface CalorieResult {
  bmr: number;
  tdee: number;
  goalCalories: number;
  weeklyChange: number;
  timeToGoal: number | null;
  macros: {
    protein: { grams: number; calories: number; percentage: number };
    carbs: { grams: number; calories: number; percentage: number };
    fats: { grams: number; calories: number; percentage: number };
  };
  analysis: {
    healthStatus: 'healthy' | 'caution' | 'warning';
    recommendations: string[];
    insights: string[];
  };
}

const activityLevels = {
  sedentary: { label: 'Sedentary (little or no exercise)', multiplier: 1.2 },
  light: { label: 'Light (exercise 1-3 days/week)', multiplier: 1.375 },
  moderate: { label: 'Moderate (exercise 4-5 days/week)', multiplier: 1.55 },
  active: { label: 'Active (exercise 6-7 days/week)', multiplier: 1.725 },
  'very-active': { label: 'Very Active (intense exercise daily)', multiplier: 1.9 },
};

const goals = {
  'lose-2': { label: 'Lose 2 lbs/week (Aggressive)', deficit: -1000, weeklyChange: -0.91 },
  'lose-1': { label: 'Lose 1 lb/week (Moderate)', deficit: -500, weeklyChange: -0.45 },
  'lose-0.5': { label: 'Lose 0.5 lb/week (Mild)', deficit: -250, weeklyChange: -0.23 },
  maintain: { label: 'Maintain Weight', deficit: 0, weeklyChange: 0 },
  'gain-0.5': { label: 'Gain 0.5 lb/week (Mild)', deficit: 250, weeklyChange: 0.23 },
  'gain-1': { label: 'Gain 1 lb/week (Moderate)', deficit: 500, weeklyChange: 0.45 },
};

export function CalorieCalculator() {
  const resultRef = useRef<HTMLDivElement>(null);

  const [inputs, setInputs] = useState<CalorieInputs>({
    age: 30,
    gender: 'male',
    weight: 180,
    height: 70,
    activityLevel: 'moderate',
    goal: 'maintain',
    unitSystem: 'imperial',
    formula: 'mifflin',
  });

  const [targetWeight, setTargetWeight] = useState<number | null>(null);
  const [result, setResult] = useState<CalorieResult | null>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/calorie-calculator',
    getShareParams: () => ({
      a: inputs.age.toString(),
      g: inputs.gender,
      w: inputs.weight.toString(),
      h: inputs.height.toString(),
      al: inputs.activityLevel,
      go: inputs.goal,
      u: inputs.unitSystem,
      f: inputs.formula,
    }),
    getShareText: () => 
      result 
        ? `My Calorie Calculation: BMR ${result.bmr} cal/day | TDEE ${result.tdee} cal/day | Goal ${result.goalCalories} cal/day`
        : 'Check out my calorie calculation!',
  });

  // Smart analysis function (defined before calculateCalories to avoid hoisting issues)
  const analyzeCalories = (
    bmr: number,
    tdee: number,
    goalCalories: number,
    inputs: CalorieInputs,
    weeklyChange: number,
    proteinGrams: number
  ) => {
    const recommendations: string[] = [];
    const insights: string[] = [];
    let healthStatus: 'healthy' | 'caution' | 'warning' = 'healthy';

    // Check if calories are too low
    const minCalories = inputs.gender === 'male' ? 1500 : 1200;
    if (goalCalories < minCalories) {
      healthStatus = 'warning';
      recommendations.push(
        `⚠️ Daily calorie intake below ${minCalories} calories is not recommended without medical supervision.`
      );
      recommendations.push(`Consider a less aggressive weight loss goal for sustainable results.`);
    }

    // Aggressive weight loss check
    if (weeklyChange < -0.9) {
      healthStatus = healthStatus === 'warning' ? 'warning' : 'caution';
      recommendations.push(
        `Losing more than 2 lbs per week may lead to muscle loss and nutritional deficiencies.`
      );
    }

    // Activity level insights
    if (inputs.activityLevel === 'sedentary') {
      recommendations.push(
        `💡 Increasing physical activity can boost metabolism and improve weight management.`
      );
      insights.push(`Your current activity level is sedentary. Even light exercise 3x/week can increase TDEE by 15%.`);
    }

    // BMR insights
    insights.push(
      `Your BMR (${Math.round(bmr)} cal) is the energy your body needs at complete rest. This represents ${Math.round((bmr / tdee) * 100)}% of your total daily energy expenditure.`
    );

    // Calorie deficit/surplus insights
    const difference = Math.abs(tdee - goalCalories);
    if (weeklyChange < 0) {
      insights.push(
        `You're aiming for a daily deficit of ${difference} calories, which should result in losing ${Math.abs(weeklyChange).toFixed(1)} lbs per week.`
      );
    } else if (weeklyChange > 0) {
      insights.push(
        `You're aiming for a daily surplus of ${difference} calories, which should result in gaining ${weeklyChange.toFixed(1)} lbs per week.`
      );
    }

    // Protein recommendations
    const proteinPerKg = inputs.unitSystem === 'imperial' 
      ? (proteinGrams / (inputs.weight * 0.453592)).toFixed(1)
      : (proteinGrams / inputs.weight).toFixed(1);
    
    recommendations.push(
      `🥩 Aim for ${proteinGrams}g of protein daily (${proteinPerKg}g/kg body weight) to preserve muscle mass.`
    );

    // Hydration
    const waterIntake = Math.round((inputs.weight * (inputs.unitSystem === 'imperial' ? 0.5 : 0.033)));
    recommendations.push(
      `💧 Drink at least ${waterIntake} ${inputs.unitSystem === 'imperial' ? 'oz' : 'liters'} of water daily for optimal metabolism.`
    );

    // Meal frequency
    if (goalCalories > 2500) {
      recommendations.push(
        `🍽️ Consider splitting your intake into 5-6 smaller meals for better nutrient absorption.`
      );
    } else {
      recommendations.push(
        `🍽️ Eating 3-4 balanced meals per day can help you reach your calorie goals consistently.`
      );
    }

    return { healthStatus, recommendations, insights };
  };

  // Calculate BMR using selected formula
  const calculateBMR = (inputs: CalorieInputs): number => {
    const { age, gender, weight, height, unitSystem, formula } = inputs;

    // Convert to metric if needed
    let weightKg = unitSystem === 'imperial' ? weight * 0.453592 : weight;
    let heightCm = unitSystem === 'imperial' ? height * 2.54 : height;

    if (formula === 'mifflin') {
      // Mifflin-St Jeor Equation (more accurate)
      if (gender === 'male') {
        return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
      } else {
        return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
      }
    } else {
      // Harris-Benedict Equation (original)
      if (gender === 'male') {
        return 13.397 * weightKg + 4.799 * heightCm - 5.677 * age + 88.362;
      } else {
        return 9.247 * weightKg + 3.098 * heightCm - 4.330 * age + 447.593;
      }
    }
  };

  // Calculate full results
  const calculateCalories = useMemo(() => {
    const bmr = calculateBMR(inputs);
    const tdee = bmr * activityLevels[inputs.activityLevel].multiplier;
    const goalCalories = tdee + goals[inputs.goal].deficit;
    const weeklyChange = goals[inputs.goal].weeklyChange;

    // Calculate time to goal
    let timeToGoal: number | null = null;
    if (targetWeight !== null && weeklyChange !== 0) {
      const currentWeight = inputs.weight;
      const weightToLoseOrGain = Math.abs(targetWeight - currentWeight);
      timeToGoal = weightToLoseOrGain / Math.abs(weeklyChange);
    }

    // Calculate macros (40% carbs, 30% protein, 30% fats as default)
    const proteinCalories = goalCalories * 0.3;
    const carbsCalories = goalCalories * 0.4;
    const fatsCalories = goalCalories * 0.3;

    const macros = {
      protein: {
        grams: Math.round(proteinCalories / 4),
        calories: Math.round(proteinCalories),
        percentage: 30,
      },
      carbs: {
        grams: Math.round(carbsCalories / 4),
        calories: Math.round(carbsCalories),
        percentage: 40,
      },
      fats: {
        grams: Math.round(fatsCalories / 9),
        calories: Math.round(fatsCalories),
        percentage: 30,
      },
    };

    // Smart analysis
    const analysis = analyzeCalories(bmr, tdee, goalCalories, inputs, weeklyChange, Math.round(proteinCalories / 4));

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      weeklyChange,
      timeToGoal,
      macros,
      analysis,
    };
  }, [inputs, targetWeight]);

  const handleCalculate = () => {
    setResult(calculateCalories);
  };

  const handleReset = () => {
    setInputs({
      age: 30,
      gender: 'male',
      weight: 180,
      height: 70,
      activityLevel: 'moderate',
      goal: 'maintain',
      unitSystem: 'imperial',
      formula: 'mifflin',
    });
    setTargetWeight(null);
    setResult(null);
  };


  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;

    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `calorie-calculation-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Load from URL params
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('a')) {
      const newInputs: CalorieInputs = {
        age: parseInt(params.get('a') || '30'),
        gender: (params.get('g') || 'male') as Gender,
        weight: parseFloat(params.get('w') || '180'),
        height: parseFloat(params.get('h') || '70'),
        activityLevel: (params.get('al') || 'moderate') as ActivityLevel,
        goal: (params.get('go') || 'maintain') as Goal,
        unitSystem: (params.get('u') || 'imperial') as UnitSystem,
        formula: (params.get('f') || 'mifflin') as Formula,
      };
      setInputs(newInputs);
      setTimeout(() => {
        const calculatedResult = calculateCalories;
        setResult(calculatedResult);
      }, 100);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Input Form (3 columns) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h3>
            
            {/* Unit System & Formula */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit System
                </label>
                <select
                  value={inputs.unitSystem}
                  onChange={(e) => {
                    const newSystem = e.target.value as UnitSystem;
                    setInputs((prev) => {
                      if (newSystem === 'metric' && prev.unitSystem === 'imperial') {
                        return {
                          ...prev,
                          unitSystem: newSystem,
                          weight: Math.round(prev.weight * 0.453592 * 10) / 10,
                          height: Math.round(prev.height * 2.54),
                        };
                      } else if (newSystem === 'imperial' && prev.unitSystem === 'metric') {
                        return {
                          ...prev,
                          unitSystem: newSystem,
                          weight: Math.round(prev.weight / 0.453592),
                          height: Math.round(prev.height / 2.54),
                        };
                      }
                      return { ...prev, unitSystem: newSystem };
                    });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="imperial">Imperial (lbs, inches)</option>
                  <option value="metric">Metric (kg, cm)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BMR Formula
                </label>
                <select
                  value={inputs.formula}
                  onChange={(e) => setInputs({ ...inputs, formula: e.target.value as Formula })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="mifflin">Mifflin-St Jeor (Recommended)</option>
                  <option value="harris">Harris-Benedict (Original)</option>
                </select>
              </div>
            </div>

            {/* Age & Gender */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age (years)
                </label>
                <input
                  type="number"
                  value={inputs.age}
                  onChange={(e) => setInputs({ ...inputs, age: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="30"
                  min="15"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="flex gap-4 pt-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value="male"
                      checked={inputs.gender === 'male'}
                      onChange={(e) => setInputs({ ...inputs, gender: e.target.value as Gender })}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value="female"
                      checked={inputs.gender === 'female'}
                      onChange={(e) => setInputs({ ...inputs, gender: e.target.value as Gender })}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Weight & Height */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight ({inputs.unitSystem === 'imperial' ? 'lbs' : 'kg'})
                </label>
                <input
                  type="number"
                  value={inputs.weight}
                  onChange={(e) => setInputs({ ...inputs, weight: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={inputs.unitSystem === 'imperial' ? '180' : '82'}
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height ({inputs.unitSystem === 'imperial' ? 'inches' : 'cm'})
                </label>
                <input
                  type="number"
                  value={inputs.height}
                  onChange={(e) => setInputs({ ...inputs, height: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={inputs.unitSystem === 'imperial' ? '70' : '178'}
                  step="0.1"
                />
              </div>
            </div>
          </div>

          {/* Activity & Goals Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Activity & Goals</h3>

            {/* Activity Level */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Level
              </label>
              <select
                value={inputs.activityLevel}
                onChange={(e) =>
                  setInputs({ ...inputs, activityLevel: e.target.value as ActivityLevel })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {Object.entries(activityLevels).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Goal */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Goal
              </label>
              <select
                value={inputs.goal}
                onChange={(e) => setInputs({ ...inputs, goal: e.target.value as Goal })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {Object.entries(goals).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Weight (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Weight ({inputs.unitSystem === 'imperial' ? 'lbs' : 'kg'}) (Optional)
              </label>
              <input
                type="number"
                value={targetWeight || ''}
                onChange={(e) => setTargetWeight(parseFloat(e.target.value) || null)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={inputs.unitSystem === 'imperial' ? '170' : '77'}
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your target weight to calculate time to reach your goal
              </p>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex gap-4">
            <button
              onClick={handleCalculate}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md font-medium text-lg"
            >
              <Calculator className="w-5 h-5" />
              Calculate Calories
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>

        {/* Right: Results (2 columns) */}
        <div className="lg:col-span-2">
          <div className="sticky top-4 space-y-6">
            {!result ? (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">
                  Enter your information and click "Calculate Calories" to see your personalized daily calorie needs and macronutrient breakdown.
                </p>
              </div>
            ) : (
              <div ref={resultRef} className="space-y-6">
                {/* Main Results */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Your Daily Calorie Needs</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">BMR (Basal Metabolic Rate)</span>
                      <span className="text-xl font-bold text-gray-900">{result.bmr} cal/day</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">TDEE (Total Daily Energy)</span>
                      <span className="text-xl font-bold text-gray-900">{result.tdee} cal/day</span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
                      <span className="text-white font-bold">Goal Calories</span>
                      <span className="text-2xl font-bold text-white">{result.goalCalories} cal/day</span>
                    </div>

                    {result.weeklyChange !== 0 && (
                      <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                        {result.weeklyChange < 0 ? (
                          <TrendingDown className="w-5 h-5 text-red-600" />
                        ) : (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        )}
                        <span className="text-gray-700">
                          {Math.abs(result.weeklyChange).toFixed(1)} lbs/week
                        </span>
                      </div>
                    )}

                    {result.timeToGoal && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Time to Goal:</span> {Math.ceil(result.timeToGoal)} weeks
                          ({Math.ceil(result.timeToGoal / 4.33)} months)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Macros Breakdown */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Utensils className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-bold text-gray-900">Daily Macronutrient Goals</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-gray-900">Protein</span>
                        <span className="text-lg font-bold text-gray-900">
                          {result.macros.protein.grams}g
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {result.macros.protein.calories} calories ({result.macros.protein.percentage}%)
                      </p>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-gray-900">Carbohydrates</span>
                        <span className="text-lg font-bold text-gray-900">
                          {result.macros.carbs.grams}g
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {result.macros.carbs.calories} calories ({result.macros.carbs.percentage}%)
                      </p>
                    </div>

                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-gray-900">Fats</span>
                        <span className="text-lg font-bold text-gray-900">{result.macros.fats.grams}g</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {result.macros.fats.calories} calories ({result.macros.fats.percentage}%)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Smart Analysis */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Smart Analysis & Recommendations</h3>

                  {/* Health Status */}
                  <div
                    className={`p-3 rounded-lg mb-4 ${
                      result.analysis.healthStatus === 'healthy'
                        ? 'bg-green-50 border border-green-200'
                        : result.analysis.healthStatus === 'caution'
                        ? 'bg-yellow-50 border border-yellow-200'
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">
                      {result.analysis.healthStatus === 'healthy'
                        ? '✅ Healthy Calorie Range'
                        : result.analysis.healthStatus === 'caution'
                        ? '⚠️ Proceed with Caution'
                        : '🚨 Consult Healthcare Professional'}
                    </p>
                  </div>

                  {/* Insights */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Insights</h4>
                    <div className="space-y-2">
                      {result.analysis.insights.map((insight, index) => (
                        <p key={index} className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                          {insight}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
                    <div className="space-y-2">
                      {result.analysis.recommendations.map((rec, index) => (
                        <p key={index} className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                          {rec}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Calorie Calculator"
      />
    </div>
  );
}

