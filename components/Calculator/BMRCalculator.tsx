'use client';

import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, Flame, Heart, Scale, User } from 'lucide-react';

interface BMRResult {
  bmr: number;
  tdee: {
    sedentary: number;
    light: number;
    moderate: number;
    active: number;
    veryActive: number;
  };
  macros: {
    protein: { grams: number; calories: number };
    carbs: { grams: number; calories: number };
    fats: { grams: number; calories: number };
  };
  weightGoal: {
    loss: { calories: number; deficit: number };
    maintain: { calories: number };
    gain: { calories: number; surplus: number };
  };
}

export function BMRCalculator() {
  const [system, setSystem] = useState<'imperial' | 'metric'>('imperial');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('30');
  const [weight, setWeight] = useState<string>('180');
  const [height, setHeight] = useState<string>('70');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [formula, setFormula] = useState<'mifflin' | 'harris'>('mifflin');
  
  const [result, setResult] = useState<BMRResult | null>(null);

  // Calculate BMR
  const calculateBMR = () => {
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!ageNum || !weightNum || !heightNum) return null;

    // Convert to metric if needed
    let weightKg = weightNum;
    let heightCm = heightNum;

    if (system === 'imperial') {
      weightKg = weightNum * 0.453592; // lbs to kg
      heightCm = heightNum * 2.54; // inches to cm
    }

    let bmr = 0;

    if (formula === 'mifflin') {
      // Mifflin-St Jeor Equation (more accurate for modern populations)
      if (gender === 'male') {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) + 5;
      } else {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) - 161;
      }
    } else {
      // Harris-Benedict Equation (original)
      if (gender === 'male') {
        bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageNum);
      } else {
        bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * ageNum);
      }
    }

    return bmr;
  };

  // Calculate TDEE
  const calculateTDEE = (bmr: number) => {
    const multipliers = {
      sedentary: 1.2,      // Little or no exercise
      light: 1.375,        // Light exercise 1-3 days/week
      moderate: 1.55,      // Moderate exercise 3-5 days/week
      active: 1.725,       // Hard exercise 6-7 days/week
      veryActive: 1.9      // Very hard exercise, physical job
    };

    return {
      sedentary: bmr * multipliers.sedentary,
      light: bmr * multipliers.light,
      moderate: bmr * multipliers.moderate,
      active: bmr * multipliers.active,
      veryActive: bmr * multipliers.veryActive,
    };
  };

  // Calculate macros (based on selected activity level)
  const calculateMacros = (calories: number) => {
    // Standard macro split: 30% protein, 40% carbs, 30% fats
    const proteinCalories = calories * 0.30;
    const carbsCalories = calories * 0.40;
    const fatsCalories = calories * 0.30;

    return {
      protein: {
        calories: proteinCalories,
        grams: proteinCalories / 4, // 4 cal/gram
      },
      carbs: {
        calories: carbsCalories,
        grams: carbsCalories / 4, // 4 cal/gram
      },
      fats: {
        calories: fatsCalories,
        grams: fatsCalories / 9, // 9 cal/gram
      },
    };
  };

  useEffect(() => {
    const bmr = calculateBMR();
    if (bmr) {
      const tdee = calculateTDEE(bmr);
      
      // Get TDEE for selected activity level
      const selectedTDEE = tdee[activityLevel as keyof typeof tdee];
      
      const macros = calculateMacros(selectedTDEE);
      
      const weightGoal = {
        loss: {
          calories: selectedTDEE - 500, // 500 cal deficit = 1 lb/week loss
          deficit: 500,
        },
        maintain: {
          calories: selectedTDEE,
        },
        gain: {
          calories: selectedTDEE + 300, // 300 cal surplus = ~0.6 lb/week gain
          surplus: 300,
        },
      };

      setResult({
        bmr,
        tdee,
        macros,
        weightGoal,
      });
    }
  }, [system, gender, age, weight, height, activityLevel, formula]);

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
    { value: 'light', label: 'Light', description: 'Exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderate', description: 'Exercise 3-5 days/week' },
    { value: 'active', label: 'Active', description: 'Exercise 6-7 days/week' },
    { value: 'veryActive', label: 'Very Active', description: 'Physical job + exercise' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4 md:space-y-6">
      {/* Unit System Toggle */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Calculator Settings</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSystem('imperial')}
              className={`px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] rounded-lg font-medium transition-colors ${
                system === 'imperial'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Imperial (lbs, in)
            </button>
            <button
              onClick={() => setSystem('metric')}
              className={`px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] rounded-lg font-medium transition-colors ${
                system === 'metric'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Metric (kg, cm)
            </button>
          </div>
        </div>

        {/* Formula Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">BMR Formula</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFormula('mifflin')}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                formula === 'mifflin'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="font-semibold text-sm">Mifflin-St Jeor</div>
              <div className="text-xs text-gray-600 mt-1">Recommended (more accurate)</div>
            </button>
            <button
              onClick={() => setFormula('harris')}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                formula === 'harris'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="font-semibold text-sm">Harris-Benedict</div>
              <div className="text-xs text-gray-600 mt-1">Classic formula</div>
            </button>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Calculate Your BMR</h3>

        <div className="space-y-6">
          {/* Gender */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Gender *</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setGender('male')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  gender === 'male'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <User className={`w-6 h-6 mx-auto mb-2 ${gender === 'male' ? 'text-blue-600' : 'text-gray-400'}`} />
                <div className="font-semibold text-center">Male</div>
              </button>
              <button
                onClick={() => setGender('female')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  gender === 'female'
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <User className={`w-6 h-6 mx-auto mb-2 ${gender === 'female' ? 'text-pink-600' : 'text-gray-400'}`} />
                <div className="font-semibold text-center">Female</div>
              </button>
            </div>
          </div>

          {/* Age, Weight, Height */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Age (years) *</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="30"
                className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Weight ({system === 'imperial' ? 'lbs' : 'kg'}) *
              </label>
              <div className="relative">
                <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={system === 'imperial' ? '180' : '82'}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Height ({system === 'imperial' ? 'inches' : 'cm'}) *
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={system === 'imperial' ? '70' : '178'}
                className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Activity Level */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Activity Level *</label>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {activityLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setActivityLevel(level.value)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    activityLevel === level.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <Activity className={`w-5 h-5 mx-auto mb-1 ${
                    activityLevel === level.value ? 'text-green-600' : 'text-gray-400'
                  }`} />
                  <div className="font-semibold text-xs">{level.label}</div>
                  <div className="text-xs text-gray-600 mt-1">{level.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <>
          {/* BMR & TDEE */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Metabolic Rate</h3>

            <div className="grid xl:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-sm text-blue-600 font-medium">BMR (Basal Metabolic Rate)</div>
                    <div className="text-xs text-blue-500">Calories burned at rest</div>
                  </div>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-700 mb-2 break-all">
                  {result.bmr.toFixed(0)} <span className="text-sm sm:text-lg md:text-xl lg:text-2xl">cal/day</span>
                </div>
                <p className="text-xs text-blue-600">
                  This is the minimum calories your body needs to function
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <Flame className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-sm text-green-600 font-medium">TDEE (Total Daily Energy)</div>
                    <div className="text-xs text-green-500">Calories burned with activity</div>
                  </div>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 mb-2 break-all">
                  {result.tdee[activityLevel as keyof typeof result.tdee].toFixed(0)} <span className="text-sm sm:text-lg md:text-xl lg:text-2xl">cal/day</span>
                </div>
                <p className="text-xs text-green-600">
                  Based on your {activityLevel} lifestyle
                </p>
              </div>
            </div>

            {/* All Activity Levels */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">TDEE by Activity Level:</h4>
              <div className="space-y-2 text-sm">
                {activityLevels.map((level) => (
                  <div key={level.value} className="flex justify-between items-center">
                    <span className={level.value === activityLevel ? 'font-bold text-green-700' : 'text-gray-700'}>
                      {level.label} - {level.description}
                    </span>
                    <span className={`font-semibold ${level.value === activityLevel ? 'text-green-700' : 'text-gray-900'}`}>
                      {result.tdee[level.value as keyof typeof result.tdee].toFixed(0)} cal/day
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weight Goals */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Calorie Goals by Objective</h3>
            
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-6 h-6 text-red-600 transform rotate-180" />
                  <div className="font-bold text-red-900">Weight Loss</div>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-red-700 mb-2 break-all">
                  {result.weightGoal.loss.calories.toFixed(0)} <span className="text-sm sm:text-lg md:text-xl">cal/day</span>
                </div>
                <div className="text-xs text-red-600 mb-3">
                  {result.weightGoal.loss.deficit} cal deficit per day
                </div>
                <div className="bg-white p-2 rounded text-xs text-gray-700">
                  <strong>Expected:</strong> ~1 lb (0.5 kg) loss per week
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="w-6 h-6 text-blue-600" />
                  <div className="font-bold text-blue-900">Maintain Weight</div>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-2 break-all">
                  {result.weightGoal.maintain.calories.toFixed(0)} <span className="text-sm sm:text-lg md:text-xl">cal/day</span>
                </div>
                <div className="text-xs text-blue-600 mb-3">
                  Balanced intake and expenditure
                </div>
                <div className="bg-white p-2 rounded text-xs text-gray-700">
                  <strong>Expected:</strong> Stable weight
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <div className="font-bold text-green-900">Weight Gain</div>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-2 break-all">
                  {result.weightGoal.gain.calories.toFixed(0)} <span className="text-sm sm:text-lg md:text-xl">cal/day</span>
                </div>
                <div className="text-xs text-green-600 mb-3">
                  {result.weightGoal.gain.surplus} cal surplus per day
                </div>
                <div className="bg-white p-2 rounded text-xs text-gray-700">
                  <strong>Expected:</strong> ~0.5 lb (0.25 kg) gain per week
                </div>
              </div>
            </div>
          </div>

          {/* Macros */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Recommended Macronutrients</h3>
            <p className="text-sm text-gray-600 mb-6">
              Based on {result.tdee[activityLevel as keyof typeof result.tdee].toFixed(0)} calories per day (30/40/30 split)
            </p>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-lg border border-red-200">
                <div className="font-bold text-red-900 mb-2">Protein (30%)</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-red-700 mb-1 break-all">
                  {result.macros.protein.grams.toFixed(0)}g
                </div>
                <div className="text-xs text-red-600">
                  {result.macros.protein.calories.toFixed(0)} calories
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-lg border border-yellow-200">
                <div className="font-bold text-yellow-900 mb-2">Carbohydrates (40%)</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-700 mb-1 break-all">
                  {result.macros.carbs.grams.toFixed(0)}g
                </div>
                <div className="text-xs text-yellow-600">
                  {result.macros.carbs.calories.toFixed(0)} calories
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg border border-purple-200">
                <div className="font-bold text-purple-900 mb-2">Fats (30%)</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-700 mb-1 break-all">
                  {result.macros.fats.grams.toFixed(0)}g
                </div>
                <div className="text-xs text-purple-600">
                  {result.macros.fats.calories.toFixed(0)} calories
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

