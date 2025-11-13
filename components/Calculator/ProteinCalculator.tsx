'use client';

import { useState, useRef, useEffect } from 'react';
import { Share2, Save, Printer, Beef, Target, Utensils } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

interface ProteinInputs {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'cutting' | 'maintenance' | 'bulking';
  unitSystem: 'imperial' | 'metric';
  mealsPerDay: number;
}

interface ProteinResult {
  // Protein requirements
  proteinPerKg: number;
  proteinPerLb: number;
  dailyProtein: number;
  
  // Meal distribution
  proteinPerMeal: number;
  
  // Weekly & Monthly totals
  weeklyProtein: number;
  monthlyProtein: number;
  
  // Protein sources breakdown
  proteinSources: {
    chicken: number; // grams of chicken breast
    eggs: number; // number of eggs
    fish: number; // grams of salmon
    beef: number; // grams of lean beef
    tofu: number; // grams of tofu
    beans: number; // grams of black beans
    wheyProtein: number; // scoops of whey protein
    greekYogurt: number; // cups of Greek yogurt
  };
  
  // Enhanced timing analysis
  proteinTiming: {
    preWorkout: number; // grams 30-60 min before workout
    postWorkout: number; // grams within 30 min after workout
    beforeBed: number; // grams before sleep (casein)
    morningProtein: number; // grams upon waking
  };
  
  // Absorption efficiency analysis
  absorptionAnalysis: {
    maxPerMeal: number; // maximum protein per meal for optimal absorption
    optimalSpacing: number; // hours between protein meals
    absorptionRate: string; // fast/medium/slow based on sources
    leucineContent: number; // leucine per day for muscle protein synthesis
  };
  
  // Recommendations
  recommendations: string[];
}

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary', multiplier: 1.0, description: 'Little or no exercise' },
  { value: 'light', label: 'Light Activity', multiplier: 1.1, description: 'Exercise 1-3 days/week' },
  { value: 'moderate', label: 'Moderate Activity', multiplier: 1.2, description: 'Exercise 3-5 days/week' },
  { value: 'active', label: 'Active', multiplier: 1.3, description: 'Exercise 6-7 days/week' },
  { value: 'very-active', label: 'Very Active', multiplier: 1.4, description: 'Intense exercise daily' },
];

const goals = [
  { value: 'cutting', label: 'Cutting (Fat Loss)', proteinMultiplier: 2.2, description: 'Preserve muscle while losing fat' },
  { value: 'maintenance', label: 'Maintenance', proteinMultiplier: 2.0, description: 'Maintain current muscle mass' },
  { value: 'bulking', label: 'Bulking (Muscle Gain)', proteinMultiplier: 1.8, description: 'Support muscle growth' },
];

// Protein content per 100g (and leucine content)
const proteinContentPer100g = {
  chicken: 31, // chicken breast
  eggs: 13, // per egg (50g)
  fish: 25, // salmon
  beef: 26, // lean beef
  tofu: 17, // firm tofu
  beans: 21, // black beans
  wheyProtein: 80, // per scoop (30g)
  greekYogurt: 20, // per cup (200g)
};

// Leucine content (grams per 100g protein)
const leucineContent = {
  chicken: 8.2,
  eggs: 8.8,
  fish: 8.1,
  beef: 8.2,
  tofu: 7.8,
  beans: 7.5,
  wheyProtein: 11.0, // highest leucine content
  greekYogurt: 9.5,
};

export function ProteinCalculator() {
  const [inputs, setInputs] = useState<ProteinInputs>({
    age: 30,
    gender: 'male',
    weight: 180,
    height: 70,
    activityLevel: 'moderate',
    goal: 'maintenance',
    unitSystem: 'imperial',
    mealsPerDay: 3,
  });

  const [result, setResult] = useState<ProteinResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Load from URL parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const age = params.get('a');
      const gender = params.get('g');
      const weight = params.get('w');
      const height = params.get('h');
      const activityLevel = params.get('al');
      const goal = params.get('go');
      const unitSystem = params.get('u');
      const mealsPerDay = params.get('m');

      if (weight && goal) {
        const customInputs: ProteinInputs = {
          age: age ? parseInt(age) : 30,
          gender: (gender === 'female' ? 'female' : 'male') as 'male' | 'female',
          weight: parseFloat(weight),
          height: height ? parseFloat(height) : 70,
          activityLevel: (activityLevel || 'moderate') as ProteinInputs['activityLevel'],
          goal: goal as 'cutting' | 'maintenance' | 'bulking',
          unitSystem: (unitSystem || 'imperial') as 'imperial' | 'metric',
          mealsPerDay: mealsPerDay ? parseInt(mealsPerDay) : 3,
        };
        setInputs(customInputs);
        setTimeout(() => {
          calculateProteinWithInputs(customInputs);
        }, 100);
      }
    }
  }, []);

  const handleInputChange = (field: keyof ProteinInputs, value: any) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const calculateProteinWithInputs = (customInputs: ProteinInputs) => {
    const { weight, goal, unitSystem, mealsPerDay } = customInputs;
    
    // Convert weight to kg
    const weightKg = unitSystem === 'imperial' ? weight * 0.453592 : weight;
    const weightLb = unitSystem === 'imperial' ? weight : weight * 2.20462;

    // Get protein multiplier based on goal
    const goalData = goals.find((g) => g.value === goal);
    const proteinMultiplier = goalData?.proteinMultiplier || 2.0;

    // Calculate daily protein requirement (grams per kg body weight)
    const proteinPerKg = proteinMultiplier;
    const proteinPerLb = proteinMultiplier * 0.453592; // Convert to per lb
    const dailyProtein = weightKg * proteinPerKg;

    // Calculate protein per meal
    const proteinPerMeal = dailyProtein / mealsPerDay;

    // Weekly and monthly totals
    const weeklyProtein = dailyProtein * 7;
    const monthlyProtein = dailyProtein * 30;

    // Calculate protein sources (how much of each food to reach daily protein)
    const proteinSources = {
      chicken: (dailyProtein / proteinContentPer100g.chicken) * 100, // grams of chicken breast
      eggs: (dailyProtein / proteinContentPer100g.eggs), // number of eggs
      fish: (dailyProtein / proteinContentPer100g.fish) * 100, // grams of salmon
      beef: (dailyProtein / proteinContentPer100g.beef) * 100, // grams of lean beef
      tofu: (dailyProtein / proteinContentPer100g.tofu) * 100, // grams of tofu
      beans: (dailyProtein / proteinContentPer100g.beans) * 100, // grams of black beans
      wheyProtein: dailyProtein / (proteinContentPer100g.wheyProtein * 0.3), // scoops (30g each)
      greekYogurt: dailyProtein / (proteinContentPer100g.greekYogurt * 2), // cups (200g each)
    };

    // Enhanced protein timing analysis
    const proteinTiming = {
      preWorkout: Math.min(25, dailyProtein * 0.15), // 15% of daily protein, max 25g
      postWorkout: Math.min(40, dailyProtein * 0.25), // 25% of daily protein, max 40g
      beforeBed: Math.min(30, dailyProtein * 0.2), // 20% of daily protein, max 30g (casein ideal)
      morningProtein: Math.min(35, dailyProtein * 0.2), // 20% of daily protein, max 35g
    };

    // Absorption efficiency analysis
    const maxPerMeal = Math.min(40, dailyProtein / 3); // Research shows ~40g max absorption per meal
    const optimalSpacing = Math.max(3, 16 / mealsPerDay); // Minimum 3 hours between meals
    const absorptionRate = dailyProtein > 150 ? 'Consider slower proteins like casein' : 
                          dailyProtein > 100 ? 'Mix of fast and slow proteins optimal' : 
                          'Fast proteins like whey are sufficient';
    
    // Calculate daily leucine (minimum 2.5g needed for muscle protein synthesis)
    const avgLeucineContent = (leucineContent.chicken + leucineContent.wheyProtein) / 2; // Average of high-leucine sources
    const dailyLeucine = (dailyProtein * avgLeucineContent) / 100;

    const absorptionAnalysis = {
      maxPerMeal,
      optimalSpacing,
      absorptionRate,
      leucineContent: dailyLeucine,
    };

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (goal === 'cutting') {
      recommendations.push('🔥 Cutting phase: Higher protein (2.2g/kg) helps preserve muscle mass during calorie deficit.');
      recommendations.push('💪 Focus on lean protein sources: chicken breast, fish, egg whites, and plant-based proteins.');
    } else if (goal === 'bulking') {
      recommendations.push('📈 Bulking phase: Moderate protein (1.8g/kg) allows room for more carbs and fats for energy.');
      recommendations.push('🍖 Include a mix of protein sources: lean meats, whole eggs, dairy, and legumes.');
    } else {
      recommendations.push('⚖️ Maintenance: Standard protein (2.0g/kg) supports muscle maintenance and recovery.');
      recommendations.push('🥗 Balance protein intake across all meals for optimal muscle protein synthesis.');
    }

    if (dailyProtein > 200) {
      recommendations.push('⚠️ Very high protein intake (>200g/day). Ensure adequate hydration and consider spreading intake across 4-6 meals.');
    } else if (dailyProtein < 100) {
      recommendations.push('📊 Moderate protein intake. Consider increasing if you\'re very active or trying to build muscle.');
    }

    recommendations.push(`🍽️ Distribute ${proteinPerMeal.toFixed(0)}g protein across ${mealsPerDay} meals for optimal absorption.`);
    recommendations.push('⏰ Aim to consume protein within 2 hours post-workout for optimal muscle recovery.');
    recommendations.push('💧 Drink plenty of water - high protein diets require increased hydration.');
    
    // Add enhanced timing recommendations
    recommendations.push(`🏋️ Pre-workout: ${proteinTiming.preWorkout.toFixed(0)}g protein 30-60 min before training.`);
    recommendations.push(`💪 Post-workout: ${proteinTiming.postWorkout.toFixed(0)}g protein within 30 min after training.`);
    recommendations.push(`🌙 Before bed: ${proteinTiming.beforeBed.toFixed(0)}g slow-digesting protein (casein ideal).`);
    
    // Add leucine-specific recommendations
    if (dailyLeucine < 2.5) {
      recommendations.push('⚠️ Consider adding leucine-rich proteins (whey, eggs) to reach 2.5g+ leucine daily for optimal muscle protein synthesis.');
    } else {
      recommendations.push(`✅ Excellent leucine intake: ${dailyLeucine.toFixed(1)}g/day supports muscle protein synthesis.`);
    }

    setResult({
      proteinPerKg,
      proteinPerLb,
      dailyProtein,
      proteinPerMeal,
      weeklyProtein,
      monthlyProtein,
      proteinSources,
      proteinTiming,
      absorptionAnalysis,
      recommendations,
    });
  };

  const calculateProtein = () => {
    calculateProteinWithInputs(inputs);
  };

  const handleReset = () => {
    setInputs({
      age: 30,
      gender: 'male',
      weight: 180,
      height: 70,
      activityLevel: 'moderate',
      goal: 'maintenance',
      unitSystem: 'imperial',
      mealsPerDay: 3,
    });
    setResult(null);
  };

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/protein-calculator',
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
        ? `My Protein Calculation: ${result.dailyProtein.toFixed(0)}g/day (${result.proteinPerKg.toFixed(1)}g/kg) for ${inputs.goal}`
        : 'Calculate your daily protein needs!',
  });

  const handleSaveImage = async () => {
    if (!resultRef.current) return;
    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const link = document.createElement('a');
      link.download = 'protein-calculator-results.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

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
              <title>Protein Calculator Results</title>
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
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Beef className="w-6 h-6 text-red-600" />
              Protein Calculator
            </h2>

            <div className="space-y-5">
              {/* Unit System */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Unit System <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      const newWeight = inputs.unitSystem === 'imperial' 
                        ? inputs.weight * 2.20462 
                        : inputs.weight * 0.453592;
                      const newHeight = inputs.unitSystem === 'imperial'
                        ? inputs.height * 0.393701
                        : inputs.height * 2.54;
                      handleInputChange('unitSystem', 'imperial');
                      handleInputChange('weight', Math.round(newWeight));
                      handleInputChange('height', Math.round(newHeight));
                    }}
                    className={`px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm ${
                      inputs.unitSystem === 'imperial'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    Imperial (lbs, in)
                  </button>
                  <button
                    onClick={() => {
                      const newWeight = inputs.unitSystem === 'imperial'
                        ? inputs.weight * 0.453592
                        : inputs.weight * 2.20462;
                      const newHeight = inputs.unitSystem === 'imperial'
                        ? inputs.height * 2.54
                        : inputs.height * 0.393701;
                      handleInputChange('unitSystem', 'metric');
                      handleInputChange('weight', Math.round(newWeight));
                      handleInputChange('height', Math.round(newHeight));
                    }}
                    className={`px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm ${
                      inputs.unitSystem === 'metric'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    Metric (kg, cm)
                  </button>
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleInputChange('gender', 'male')}
                    className={`px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm ${
                      inputs.gender === 'male'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => handleInputChange('gender', 'female')}
                    className={`px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm ${
                      inputs.gender === 'female'
                        ? 'bg-pink-600 text-white border-pink-600 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-pink-400 hover:bg-pink-50'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={inputs.age || ''}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="30"
                  min="1"
                  max="120"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Weight <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={inputs.weight || ''}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={inputs.unitSystem === 'imperial' ? '180' : '82'}
                  step="0.1"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {inputs.unitSystem === 'imperial' ? 'lbs' : 'kg'}
                </p>
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Height <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={inputs.height || ''}
                  onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={inputs.unitSystem === 'imperial' ? '70' : '178'}
                  step="0.1"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {inputs.unitSystem === 'imperial' ? 'inches' : 'cm'}
                </p>
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Activity Level <span className="text-red-500">*</span>
                </label>
                <select
                  value={inputs.activityLevel}
                  onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {activityLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label} - {level.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Goal <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {goals.map((goal) => (
                    <button
                      key={goal.value}
                      onClick={() => handleInputChange('goal', goal.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-left ${
                        inputs.goal === goal.value
                          ? 'bg-green-600 text-white border-green-600 shadow-md'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-green-400 hover:bg-green-50'
                      }`}
                    >
                      <div className="font-semibold">{goal.label}</div>
                      <div className="text-xs opacity-90">{goal.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Meals Per Day */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meals Per Day <span className="text-red-500">*</span>
                </label>
                <select
                  value={inputs.mealsPerDay}
                  onChange={(e) => handleInputChange('mealsPerDay', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {[3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} meals
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={calculateProtein}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Calculate Protein
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {result ? (
            <div className="space-y-4">
              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleSaveImage}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save as Image
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium"
                >
                  <Printer className="w-4 h-4" />
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

              {/* Results Content */}
              <div ref={resultRef} className="space-y-4 bg-white p-6 rounded-xl">
                {/* Main Result */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border-2 border-red-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-red-600" />
                    Daily Protein Requirement
                  </h3>

                  <div className="bg-white rounded-lg p-6 mb-4 border-2 border-red-300">
                    <div className="text-sm text-gray-600 mb-2 font-semibold">Daily Protein</div>
                    <div className="text-5xl font-bold text-red-600 mb-2">
                      {result.dailyProtein.toFixed(0)}g
                    </div>
                    <div className="text-lg text-gray-700">
                      {result.proteinPerKg.toFixed(1)}g per kg body weight
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      ({result.proteinPerLb.toFixed(1)}g per lb)
                    </div>
                  </div>

                  {/* Per Meal */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-600 mb-1">Per Meal</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {result.proteinPerMeal.toFixed(0)}g
                      </div>
                      <div className="text-xs text-gray-500">
                        {inputs.mealsPerDay} meals/day
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-600 mb-1">Weekly Total</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {result.weeklyProtein.toFixed(0)}g
                      </div>
                    </div>
                  </div>
                </div>

                {/* Protein Sources */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-blue-600" />
                    Protein Sources (to reach daily goal)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="text-xs text-gray-600 mb-1">🍗 Chicken Breast</div>
                      <div className="text-lg font-bold text-gray-900">
                        {result.proteinSources.chicken.toFixed(0)}g
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="text-xs text-gray-600 mb-1">🥚 Eggs</div>
                      <div className="text-lg font-bold text-gray-900">
                        {result.proteinSources.eggs.toFixed(1)} eggs
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="text-xs text-gray-600 mb-1">🐟 Salmon</div>
                      <div className="text-lg font-bold text-gray-900">
                        {result.proteinSources.fish.toFixed(0)}g
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="text-xs text-gray-600 mb-1">🥩 Lean Beef</div>
                      <div className="text-lg font-bold text-gray-900">
                        {result.proteinSources.beef.toFixed(0)}g
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="text-xs text-gray-600 mb-1">🧈 Tofu</div>
                      <div className="text-lg font-bold text-gray-900">
                        {result.proteinSources.tofu.toFixed(0)}g
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="text-xs text-gray-600 mb-1">🫘 Black Beans</div>
                      <div className="text-lg font-bold text-gray-900">
                        {result.proteinSources.beans.toFixed(0)}g
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="text-xs text-gray-600 mb-1">🥤 Whey Protein</div>
                      <div className="text-lg font-bold text-gray-900">
                        {result.proteinSources.wheyProtein.toFixed(1)} scoops
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="text-xs text-gray-600 mb-1">🥛 Greek Yogurt</div>
                      <div className="text-lg font-bold text-gray-900">
                        {result.proteinSources.greekYogurt.toFixed(1)} cups
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Protein Timing Analysis */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    ⏰ Optimal Protein Timing
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="text-xs text-gray-600 mb-1">🌅 Morning</div>
                      <div className="text-lg font-bold text-gray-900">
                        {result.proteinTiming.morningProtein.toFixed(0)}g
                      </div>
                      <div className="text-xs text-gray-500">Upon waking</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="text-xs text-gray-600 mb-1">🏋️ Pre-Workout</div>
                      <div className="text-lg font-bold text-gray-900">
                        {result.proteinTiming.preWorkout.toFixed(0)}g
                      </div>
                      <div className="text-xs text-gray-500">30-60 min before</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="text-xs text-gray-600 mb-1">💪 Post-Workout</div>
                      <div className="text-lg font-bold text-gray-900">
                        {result.proteinTiming.postWorkout.toFixed(0)}g
                      </div>
                      <div className="text-xs text-gray-500">Within 30 min</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="text-xs text-gray-600 mb-1">🌙 Before Bed</div>
                      <div className="text-lg font-bold text-gray-900">
                        {result.proteinTiming.beforeBed.toFixed(0)}g
                      </div>
                      <div className="text-xs text-gray-500">Casein ideal</div>
                    </div>
                  </div>
                </div>

                {/* Absorption Efficiency Analysis */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    🧬 Absorption Efficiency Analysis
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-yellow-200">
                      <div className="text-sm text-gray-600 mb-2">Max Protein Per Meal</div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {result.absorptionAnalysis.maxPerMeal.toFixed(0)}g
                      </div>
                      <div className="text-xs text-gray-500">Optimal absorption limit</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-yellow-200">
                      <div className="text-sm text-gray-600 mb-2">Optimal Meal Spacing</div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {result.absorptionAnalysis.optimalSpacing.toFixed(1)}h
                      </div>
                      <div className="text-xs text-gray-500">Between protein meals</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-yellow-200">
                      <div className="text-sm text-gray-600 mb-2">Daily Leucine</div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {result.absorptionAnalysis.leucineContent.toFixed(1)}g
                      </div>
                      <div className="text-xs text-gray-500">
                        {result.absorptionAnalysis.leucineContent >= 2.5 ? '✅ Optimal for MPS' : '⚠️ Consider increasing'}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-yellow-200">
                      <div className="text-sm text-gray-600 mb-2">Absorption Strategy</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {result.absorptionAnalysis.absorptionRate}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>💡</span>
                    Tips & Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
              <div className="text-6xl mb-4">🥩</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Calculate Protein Needs?</h3>
              <p className="text-gray-600 mb-4">
                Enter your details and goal, then click "Calculate Protein" to get personalized protein recommendations
              </p>
              <p className="text-sm text-gray-500">
                Based on your weight, activity level, and fitness goals
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
        calculatorName="Protein Calculator"
      />
    </div>
  );
}

