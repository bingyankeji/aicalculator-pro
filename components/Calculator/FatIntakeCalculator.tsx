'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, AlertCircle, Info } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface FatResult {
  totalFatGrams: number;
  totalFatCalories: number;
  percentageOfTotalCalories: number;
  fatTypes: {
    saturated: { grams: number; percentage: number };
    monounsaturated: { grams: number; percentage: number };
    polyunsaturated: { grams: number; percentage: number };
    omega3: { grams: number; percentage: number };
    omega6: { grams: number; percentage: number };
  };
  omega3to6Ratio: string;
  healthScore: {
    score: number;
    rating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    message: string;
  };
  foodRecommendations: {
    healthy: string[];
    moderate: string[];
    avoid: string[];
  };
}

export default function FatIntakeCalculator() {
  // Input states
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState('170');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'inches'>('cm');
  const [weight, setWeight] = useState('70');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [dietType, setDietType] = useState('balanced');
  const [healthFocus, setHealthFocus] = useState('general');
  
  const [result, setResult] = useState<FatResult | null>(null);
  const [error, setError] = useState('');
  
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/fat-intake-calculator',
    getShareParams: () => ({
      weight,
      unit: weightUnit,
      activity: activityLevel,
      goal,
    }),
    getShareText: () => {
      if (result) {
        return `My daily fat intake: ${result.totalFatGrams}g (${result.percentageOfTotalCalories}% of calories)`;
      }
      return 'Calculate your daily fat intake needs!';
    },
  });

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
    extraActive: 2.0,
  };

  const goalAdjustments = {
    lose: -500,
    maintain: 0,
    gain: 500,
  };

  const dietTypeFat = {
    lowFat: 0.20,
    balanced: 0.30,
    mediterranean: 0.35,
    keto: 0.70,
  };

  const calculate = () => {
    setError('');
    
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    
    if (!ageNum || ageNum < 18 || ageNum > 80) {
      setError('Please enter a valid age (18-80)');
      return;
    }
    
    if (!weightNum || weightNum <= 0) {
      setError('Please enter a valid weight');
      return;
    }
    
    if (!heightNum || heightNum <= 0) {
      setError('Please enter a valid height');
      return;
    }

    // Convert to kg and cm if needed
    const weightKg = weightUnit === 'lbs' ? weightNum * 0.453592 : weightNum;
    const heightCm = heightUnit === 'inches' ? heightNum * 2.54 : heightNum;
    
    // Calculate BMR (Mifflin-St Jeor Equation)
    const bmr = gender === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    
    // Calculate TDEE
    const activityMult = activityMultipliers[activityLevel as keyof typeof activityMultipliers];
    const tdee = bmr * activityMult;
    
    // Adjust for goal
    const goalAdjustment = goalAdjustments[goal as keyof typeof goalAdjustments];
    const targetCalories = tdee + goalAdjustment;
    
    // Calculate fat based on diet type
    const fatPercentage = dietTypeFat[dietType as keyof typeof dietTypeFat];
    const totalFatCalories = targetCalories * fatPercentage;
    const totalFatGrams = Math.round(totalFatCalories / 9); // 9 calories per gram of fat
    
    // Fat type distribution
    let saturatedPct, monoPct, polyPct, omega3Pct, omega6Pct;
    
    if (dietType === 'keto') {
      saturatedPct = 0.35; monoPct = 0.45; polyPct = 0.20; omega3Pct = 0.05; omega6Pct = 0.15;
    } else if (dietType === 'mediterranean') {
      saturatedPct = 0.20; monoPct = 0.55; polyPct = 0.25; omega3Pct = 0.10; omega6Pct = 0.15;
    } else if (dietType === 'lowFat') {
      saturatedPct = 0.25; monoPct = 0.40; polyPct = 0.35; omega3Pct = 0.15; omega6Pct = 0.20;
    } else { // balanced
      saturatedPct = 0.30; monoPct = 0.45; polyPct = 0.25; omega3Pct = 0.08; omega6Pct = 0.17;
    }

    const fatTypes = {
      saturated: {
        grams: Math.round(totalFatGrams * saturatedPct),
        percentage: Math.round(saturatedPct * 100),
      },
      monounsaturated: {
        grams: Math.round(totalFatGrams * monoPct),
        percentage: Math.round(monoPct * 100),
      },
      polyunsaturated: {
        grams: Math.round(totalFatGrams * polyPct),
        percentage: Math.round(polyPct * 100),
      },
      omega3: {
        grams: Math.round(totalFatGrams * omega3Pct),
        percentage: Math.round(omega3Pct * 100),
      },
      omega6: {
        grams: Math.round(totalFatGrams * omega6Pct),
        percentage: Math.round(omega6Pct * 100),
      },
    };

    // Calculate Omega-3 to Omega-6 ratio
    const ratioValue = fatTypes.omega6.grams / fatTypes.omega3.grams;
    const omega3to6Ratio = `1:${ratioValue.toFixed(1)}`;

    // Health score
    let score = 100;
    let rating: 'Excellent' | 'Good' | 'Fair' | 'Poor' = 'Excellent';
    let message = '';

    // Penalize high saturated fat
    if (saturatedPct > 0.35) score -= 20;
    else if (saturatedPct > 0.30) score -= 10;

    // Reward omega-3
    if (omega3Pct >= 0.10) score += 0;
    else if (omega3Pct >= 0.05) score -= 5;
    else score -= 15;

    // Check ratio
    if (ratioValue <= 4) score += 0; // Ideal
    else if (ratioValue <= 10) score -= 10;
    else score -= 20;

    if (score >= 90) {
      rating = 'Excellent';
      message = 'Excellent fat profile! Great balance for heart health.';
    } else if (score >= 75) {
      rating = 'Good';
      message = 'Good fat intake. Minor improvements possible.';
    } else if (score >= 60) {
      rating = 'Fair';
      message = 'Fair balance. Consider more omega-3 and less saturated fat.';
    } else {
      rating = 'Poor';
      message = 'Needs improvement. Focus on healthy fat sources.';
    }

    const foodRecommendations = {
      healthy: [
        '🥑 Avocado (Monounsaturated)',
        '🐟 Fatty Fish (Omega-3: EPA, DHA)',
        '🌰 Nuts (Almonds, Walnuts)',
        '🫒 Olive Oil (Monounsaturated)',
        '🥜 Natural Nut Butters',
        '🌱 Chia & Flax Seeds (Omega-3: ALA)',
      ],
      moderate: [
        '🥩 Lean Red Meat (Saturated)',
        '🧈 Butter (Saturated, limited)',
        '🥥 Coconut Oil (Saturated, MCT)',
        '🥚 Egg Yolks (Mixed fats)',
        '🧀 Cheese (Saturated, moderate)',
      ],
      avoid: [
        '🍟 Trans Fats (Partially hydrogenated oils)',
        '🍰 Fried Foods (High in damaged fats)',
        '🍔 Fast Food (Trans + Saturated)',
        '🥐 Commercial Baked Goods (Trans)',
        '🍕 Processed Snacks (Trans + Omega-6)',
      ],
    };

    setResult({
      totalFatGrams,
      totalFatCalories,
      percentageOfTotalCalories: Math.round(fatPercentage * 100),
      fatTypes,
      omega3to6Ratio,
      healthScore: { score, rating, message },
      foodRecommendations,
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
      });
      const link = document.createElement('a');
      link.download = `fat-intake-plan-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
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
            <head><title>Fat Intake Plan</title>
              <style>body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print { body { padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imgData}" onload="window.print();"/></body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
    }
  };

  // Chart data
  const fatDistributionData = result ? {
    labels: ['Saturated', 'Monounsaturated', 'Polyunsaturated'],
    datasets: [{
      data: [
        result.fatTypes.saturated.grams,
        result.fatTypes.monounsaturated.grams,
        result.fatTypes.polyunsaturated.grams,
      ],
      backgroundColor: ['#ef4444', '#3b82f6', '#10b981'],
      borderWidth: 2,
      borderColor: '#fff',
    }],
  } : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1">
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">Calculate Fat Intake</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                  Age <span className="text-red-600">*</span>
                </Label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="30"
                  min="18"
                  max="80"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Gender</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="male"
                      checked={gender === 'male'}
                      onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="female"
                      checked={gender === 'female'}
                      onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Female</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="text-sm font-medium text-gray-700">
                  Height <span className="text-red-600">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="170"
                    min="1"
                  />
                  <select
                    value={heightUnit}
                    onChange={(e) => setHeightUnit(e.target.value as 'cm' | 'inches')}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="cm">cm</option>
                    <option value="inches">inches</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
                  Weight <span className="text-red-600">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="70"
                    min="1"
                  />
                  <select
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lbs')}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Activity Level</Label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="active">Active</option>
                  <option value="veryActive">Very Active</option>
                  <option value="extraActive">Extra Active</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Goal</Label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="lose">Lose Weight</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Gain Weight</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Diet Type</Label>
                <select
                  value={dietType}
                  onChange={(e) => setDietType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="lowFat">Low Fat (20%)</option>
                  <option value="balanced">Balanced (30%)</option>
                  <option value="mediterranean">Mediterranean (35%)</option>
                  <option value="keto">Keto (70%)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Health Focus</Label>
                <select
                  value={healthFocus}
                  onChange={(e) => setHealthFocus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">General Health</option>
                  <option value="heart">Heart Health</option>
                  <option value="brain">Brain Health</option>
                  <option value="inflammation">Anti-Inflammatory</option>
                </select>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <Button
                onClick={calculate}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          {result ? (
            <div className="space-y-6">
              {/* Main Results */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-gray-50 border-b">
                  <CardTitle className="text-xl text-gray-900">Your Daily Fat Needs</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-700 mb-1">Daily Fat</p>
                      <p className="text-4xl font-bold text-blue-900">{result.totalFatGrams}g</p>
                      <p className="text-xs text-gray-600 mt-1">{result.totalFatCalories} calories</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-700 mb-1">% of Calories</p>
                      <p className="text-4xl font-bold text-gray-900">{result.percentageOfTotalCalories}%</p>
                      <p className="text-xs text-gray-600 mt-1">from fats</p>
                    </div>
                    <div className={`border p-4 rounded-lg text-center ${
                      result.healthScore.rating === 'Excellent' ? 'bg-green-50 border-green-200' :
                      result.healthScore.rating === 'Good' ? 'bg-blue-50 border-blue-200' :
                      result.healthScore.rating === 'Fair' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-red-50 border-red-200'
                    }`}>
                      <p className="text-sm text-gray-700 mb-1">Health Score</p>
                      <p className={`text-4xl font-bold ${
                        result.healthScore.rating === 'Excellent' ? 'text-green-900' :
                        result.healthScore.rating === 'Good' ? 'text-blue-900' :
                        result.healthScore.rating === 'Fair' ? 'text-yellow-900' :
                        'text-red-900'
                      }`}>{result.healthScore.score}</p>
                      <p className="text-xs text-gray-600 mt-1">{result.healthScore.rating}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <div className="flex gap-2">
                      <Info className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-blue-900 mb-1">{result.healthScore.message}</p>
                        <p className="text-sm text-blue-800">Omega-3:6 Ratio: {result.omega3to6Ratio} (Ideal: 1:1-4)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fat Type Distribution */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">🥑 Fat Type Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">Saturated Fat</span>
                          <span className="text-xl font-bold text-red-900">{result.fatTypes.saturated.grams}g</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{result.fatTypes.saturated.percentage}% of total fat</p>
                      </div>

                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">Monounsaturated</span>
                          <span className="text-xl font-bold text-blue-900">{result.fatTypes.monounsaturated.grams}g</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{result.fatTypes.monounsaturated.percentage}% of total fat</p>
                      </div>

                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">Polyunsaturated</span>
                          <span className="text-xl font-bold text-green-900">{result.fatTypes.polyunsaturated.grams}g</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{result.fatTypes.polyunsaturated.percentage}% of total fat</p>
                      </div>

                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">Omega-3 (EPA/DHA)</span>
                          <span className="text-xl font-bold text-blue-900">{result.fatTypes.omega3.grams}g</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Anti-inflammatory</p>
                      </div>

                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">Omega-6</span>
                          <span className="text-xl font-bold text-gray-900">{result.fatTypes.omega6.grams}g</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Balance with Omega-3</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      {fatDistributionData && (
                        <div className="w-64 h-64">
                          <Pie data={fatDistributionData} options={{ maintainAspectRatio: true }} />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Food Recommendations */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">🍽️ Food Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-900 mb-3">✅ Healthy Fats (Prioritize)</h4>
                      <ul className="space-y-2">
                        {result.foodRecommendations.healthy.map((food, idx) => (
                          <li key={idx} className="text-sm text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-green-600">
                            {food}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">⚠️ Moderate (Limited)</h4>
                      <ul className="space-y-2">
                        {result.foodRecommendations.moderate.map((food, idx) => (
                          <li key={idx} className="text-sm text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-gray-600">
                            {food}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-900 mb-3">❌ Avoid</h4>
                      <ul className="space-y-2">
                        {result.foodRecommendations.avoid.map((food, idx) => (
                          <li key={idx} className="text-sm text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-red-600">
                            {food}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={handleSaveAsImage} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Save Image
                </Button>
                <Button onClick={handlePrint} variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button onClick={handleShare} variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          ) : (
            <Card className="border-gray-200">
              <CardContent className="p-12 text-center text-gray-500">
                <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Enter your information and click Calculate</p>
                <p className="text-sm mt-2">Get personalized fat intake recommendations!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Fat Intake Calculator"
      />
    </div>
  );
}

