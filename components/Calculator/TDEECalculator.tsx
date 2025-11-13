'use client';

import { useState, useEffect } from 'react';
import { Flame, Activity, Target, TrendingUp, TrendingDown, Minus, Share2, Download, Printer } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

interface TDEEResult {
  bmr: {
    mifflinStJeor: number;
    harrisBenedict: number;
  };
  tdee: {
    sedentary: number;
    light: number;
    moderate: number;
    active: number;
    veryActive: number;
  };
  selectedTDEE: number;
  goals: {
    cutting: {
      calories: number;
      deficit: number;
      expectedLoss: string;
      weeklyCalories: number;
    };
    maintain: {
      calories: number;
      weeklyCalories: number;
    };
    bulking: {
      calories: number;
      surplus: number;
      expectedGain: string;
      weeklyCalories: number;
    };
  };
  macros: {
    cutting: { protein: number; carbs: number; fats: number };
    maintain: { protein: number; carbs: number; fats: number };
    bulking: { protein: number; carbs: number; fats: number };
  };
  weightInKg: number;
}

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary', multiplier: 1.2, description: 'Little or no exercise, desk job' },
  { value: 'light', label: 'Lightly Active', multiplier: 1.375, description: 'Light exercise 1-3 days/week' },
  { value: 'moderate', label: 'Moderately Active', multiplier: 1.55, description: 'Moderate exercise 3-5 days/week' },
  { value: 'active', label: 'Very Active', multiplier: 1.725, description: 'Hard exercise 6-7 days/week' },
  { value: 'veryActive', label: 'Extra Active', multiplier: 1.9, description: 'Very hard exercise, physical job' },
];

export function TDEECalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('30');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');
  const [weight, setWeight] = useState('170');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [result, setResult] = useState<TDEEResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Calculate BMR using Mifflin-St Jeor and Harris-Benedict
  const calculateBMR = () => {
    const ageNum = parseInt(age);
    let weightKg: number;
    let heightCm: number;

    if (unitSystem === 'imperial') {
      weightKg = parseFloat(weight) * 0.453592;
      heightCm = (parseInt(heightFt) * 12 + parseInt(heightIn)) * 2.54;
    } else {
      weightKg = parseFloat(weight);
      heightCm = (parseInt(heightFt) * 100 + parseInt(heightIn));
    }

    if (!ageNum || !weightKg || !heightCm) return null;

    // Mifflin-St Jeor (Most accurate for general population)
    let mifflinStJeor: number;
    if (gender === 'male') {
      mifflinStJeor = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
    } else {
      mifflinStJeor = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    }

    // Harris-Benedict (Original formula, still widely used)
    let harrisBenedict: number;
    if (gender === 'male') {
      harrisBenedict = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageNum);
    } else {
      harrisBenedict = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * ageNum);
    }

    return {
      mifflinStJeor: Math.round(mifflinStJeor),
      harrisBenedict: Math.round(harrisBenedict),
      weightKg
    };
  };

  // Calculate TDEE for all activity levels
  const calculateTDEE = (bmr: number) => {
    return {
      sedentary: Math.round(bmr * 1.2),
      light: Math.round(bmr * 1.375),
      moderate: Math.round(bmr * 1.55),
      active: Math.round(bmr * 1.725),
      veryActive: Math.round(bmr * 1.9),
    };
  };

  // Calculate macros (40/30/30 split for cutting, 40/40/20 for maintain, 30/50/20 for bulking)
  const calculateMacros = (calories: number, goal: 'cutting' | 'maintain' | 'bulking') => {
    let proteinPercent, carbsPercent, fatsPercent;

    if (goal === 'cutting') {
      proteinPercent = 0.40; // Higher protein to preserve muscle
      carbsPercent = 0.30;
      fatsPercent = 0.30;
    } else if (goal === 'maintain') {
      proteinPercent = 0.30;
      carbsPercent = 0.40;
      fatsPercent = 0.30;
    } else { // bulking
      proteinPercent = 0.30;
      carbsPercent = 0.50; // Higher carbs for energy
      fatsPercent = 0.20;
    }

    return {
      protein: Math.round((calories * proteinPercent) / 4), // 4 cal/g
      carbs: Math.round((calories * carbsPercent) / 4), // 4 cal/g
      fats: Math.round((calories * fatsPercent) / 9), // 9 cal/g
    };
  };

  useEffect(() => {
    const bmrData = calculateBMR();
    if (bmrData) {
      const bmr = bmrData.mifflinStJeor; // Use Mifflin-St Jeor as primary
      const tdee = calculateTDEE(bmr);
      const selectedTDEE = tdee[activityLevel as keyof typeof tdee];

      // Cutting: 20% deficit (max 500 cal for safety)
      const cuttingDeficit = Math.min(Math.round(selectedTDEE * 0.20), 500);
      const cuttingCalories = selectedTDEE - cuttingDeficit;

      // Bulking: 10-15% surplus (max 300 cal for lean gains)
      const bulkingSurplus = Math.min(Math.round(selectedTDEE * 0.15), 300);
      const bulkingCalories = selectedTDEE + bulkingSurplus;

      setResult({
        bmr: {
          mifflinStJeor: bmrData.mifflinStJeor,
          harrisBenedict: bmrData.harrisBenedict,
        },
        tdee,
        selectedTDEE,
        goals: {
          cutting: {
            calories: cuttingCalories,
            deficit: cuttingDeficit,
            expectedLoss: '1-2 lbs/week',
            weeklyCalories: cuttingCalories * 7,
          },
          maintain: {
            calories: selectedTDEE,
            weeklyCalories: selectedTDEE * 7,
          },
          bulking: {
            calories: bulkingCalories,
            surplus: bulkingSurplus,
            expectedGain: '0.5-1 lb/week',
            weeklyCalories: bulkingCalories * 7,
          },
        },
        macros: {
          cutting: calculateMacros(cuttingCalories, 'cutting'),
          maintain: calculateMacros(selectedTDEE, 'maintain'),
          bulking: calculateMacros(bulkingCalories, 'bulking'),
        },
        weightInKg: bmrData.weightKg,
      });
    }
  }, [gender, age, heightFt, heightIn, weight, activityLevel, unitSystem]);

  const { showShareModal, shareUrl, shareText, handleShare: triggerShare, closeShareModal } = useShare({
    calculatorPath: '/tdee-calculator',
    getShareParams: () => ({
      g: gender,
      a: age,
      hf: heightFt,
      hi: heightIn,
      w: weight,
      al: activityLevel,
      u: unitSystem,
    }),
    getShareText: () => 
      result ? `My TDEE is ${result.selectedTDEE} calories/day! Calculate yours:` : '',
  });

  const handleSaveImage = async () => {
    if (resultRef.current) {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = 'tdee-calculator-results.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Interactive Guide */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Flame className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Calculate Your TDEE</h2>
        </div>
        <p className="text-orange-100">
          Total Daily Energy Expenditure = Your metabolism + daily activities. Perfect for planning your diet!
        </p>
      </div>

      {/* Main Calculator */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* LEFT: Input Form */}
        <div className="space-y-4">
          {/* Unit System */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Unit System</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setUnitSystem('imperial')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  unitSystem === 'imperial'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Imperial (lb, ft)
              </button>
              <button
                onClick={() => setUnitSystem('metric')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  unitSystem === 'metric'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Metric (kg, cm)
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setGender('male')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      gender === 'male'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      gender === 'female'
                        ? 'bg-pink-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="30"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height {unitSystem === 'imperial' ? '(feet, inches)' : '(meters, cm)'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    placeholder={unitSystem === 'imperial' ? '5' : '1'}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    placeholder={unitSystem === 'imperial' ? '9' : '75'}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight ({unitSystem === 'imperial' ? 'lbs' : 'kg'})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unitSystem === 'imperial' ? '170' : '77'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Activity Level */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Activity Level</h3>
            <div className="space-y-2">
              {activityLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setActivityLevel(level.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activityLevel === level.value
                      ? 'bg-orange-100 border-2 border-orange-600'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{level.label}</div>
                      <div className="text-xs text-gray-600">{level.description}</div>
                    </div>
                    <div className="text-sm font-medium text-orange-600">
                      ×{level.multiplier}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Results */}
        <div className="space-y-4">
          {result ? (
            <div ref={resultRef} className="space-y-4">
              {/* Main TDEE Result */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-300 p-6 sticky top-6 z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Flame className="w-10 h-10 text-orange-600" />
                    <div>
                      <div className="text-sm text-orange-600 font-medium">Your TDEE</div>
                      <div className="text-3xl font-bold text-gray-900">
                        {result.selectedTDEE.toLocaleString()} <span className="text-lg">cal/day</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={triggerShare}
                      className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                      title="Share"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleSaveImage}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      title="Save as Image"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handlePrint}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      title="Print"
                    >
                      <Printer className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 bg-white rounded-lg p-3">
                  <div className="font-medium mb-1">Activity Level:</div>
                  <div>{activityLevels.find(l => l.value === activityLevel)?.label}</div>
                </div>
              </div>

              {/* BMR Reference */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
                <h4 className="font-bold text-gray-900 mb-3">Your BMR (Basal Metabolic Rate)</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xs text-blue-600 mb-1">Mifflin-St Jeor</div>
                    <div className="text-lg font-bold text-blue-900">{result.bmr.mifflinStJeor} cal</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-xs text-purple-600 mb-1">Harris-Benedict</div>
                    <div className="text-lg font-bold text-purple-900">{result.bmr.harrisBenedict} cal</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  BMR = calories burned at rest (sleeping, breathing, organ function)
                </p>
              </div>

              {/* Goal Calories */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
                <h4 className="font-bold text-gray-900 mb-4">🎯 Calorie Goals Based on Your TDEE</h4>
                
                {/* Cutting */}
                <div className="mb-4 bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    <h5 className="font-bold text-red-900">Cutting (Fat Loss)</h5>
                  </div>
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {result.goals.cutting.calories.toLocaleString()} cal/day
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div>• Deficit: <strong>{result.goals.cutting.deficit} cal/day</strong></div>
                    <div>• Expected loss: <strong>{result.goals.cutting.expectedLoss}</strong></div>
                    <div>• Weekly intake: <strong>{result.goals.cutting.weeklyCalories.toLocaleString()} cal</strong></div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-red-200">
                    <div className="text-xs text-gray-600 mb-1">Daily Macros (40/30/30):</div>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-red-100 px-2 py-1 rounded">Protein: {result.macros.cutting.protein}g</span>
                      <span className="bg-orange-100 px-2 py-1 rounded">Carbs: {result.macros.cutting.carbs}g</span>
                      <span className="bg-yellow-100 px-2 py-1 rounded">Fats: {result.macros.cutting.fats}g</span>
                    </div>
                  </div>
                </div>

                {/* Maintenance */}
                <div className="mb-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Minus className="w-5 h-5 text-blue-600" />
                    <h5 className="font-bold text-blue-900">Maintenance</h5>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {result.goals.maintain.calories.toLocaleString()} cal/day
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div>• Maintain current weight</div>
                    <div>• Weekly intake: <strong>{result.goals.maintain.weeklyCalories.toLocaleString()} cal</strong></div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <div className="text-xs text-gray-600 mb-1">Daily Macros (30/40/30):</div>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-blue-100 px-2 py-1 rounded">Protein: {result.macros.maintain.protein}g</span>
                      <span className="bg-cyan-100 px-2 py-1 rounded">Carbs: {result.macros.maintain.carbs}g</span>
                      <span className="bg-teal-100 px-2 py-1 rounded">Fats: {result.macros.maintain.fats}g</span>
                    </div>
                  </div>
                </div>

                {/* Bulking */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <h5 className="font-bold text-green-900">Bulking (Muscle Gain)</h5>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {result.goals.bulking.calories.toLocaleString()} cal/day
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div>• Surplus: <strong>{result.goals.bulking.surplus} cal/day</strong></div>
                    <div>• Expected gain: <strong>{result.goals.bulking.expectedGain}</strong></div>
                    <div>• Weekly intake: <strong>{result.goals.bulking.weeklyCalories.toLocaleString()} cal</strong></div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <div className="text-xs text-gray-600 mb-1">Daily Macros (30/50/20):</div>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-green-100 px-2 py-1 rounded">Protein: {result.macros.bulking.protein}g</span>
                      <span className="bg-lime-100 px-2 py-1 rounded">Carbs: {result.macros.bulking.carbs}g</span>
                      <span className="bg-emerald-100 px-2 py-1 rounded">Fats: {result.macros.bulking.fats}g</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Activity Levels */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
                <h4 className="font-bold text-gray-900 mb-3">📊 TDEE by Activity Level</h4>
                <div className="space-y-2 text-sm">
                  {activityLevels.map((level) => (
                    <div
                      key={level.value}
                      className={`flex justify-between items-center p-3 rounded-lg ${
                        activityLevel === level.value ? 'bg-orange-100 border border-orange-300' : 'bg-gray-50'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-gray-900">{level.label}</div>
                        <div className="text-xs text-gray-600">{level.description}</div>
                      </div>
                      <div className="text-lg font-bold text-orange-600">
                        {result.tdee[level.value as keyof typeof result.tdee].toLocaleString()} cal
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Recommendations */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200 p-5">
                <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  💡 Smart Recommendations
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="bg-white rounded-lg p-3">
                    <strong>Protein Goal:</strong> Aim for {Math.round(result.weightInKg * 2.2)}g-{Math.round(result.weightInKg * 2.4)}g per day 
                    (1.0-1.1g per lb of body weight) to maintain/build muscle.
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <strong>Timing:</strong> Don't cut more than 500 cal below TDEE. Slow and steady = sustainable results!
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <strong>Adjustment:</strong> Track your weight weekly. If no change after 2 weeks, adjust calories by 100-200.
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <strong>Hydration:</strong> Drink at least {Math.round(result.weightInKg * 0.033)} liters ({Math.round(result.weightInKg * 0.033 * 33.8)} oz) of water daily.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-dashed border-orange-300 p-12 text-center">
              <Activity className="w-16 h-16 text-orange-400 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-600 font-medium">Enter your information to calculate TDEE</p>
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
        calculatorName="TDEE Calculator"
      />
    </div>
  );
}

