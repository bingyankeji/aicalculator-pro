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
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface CarbResult {
  dailyCarbsGrams: number;
  dailyCarbsCalories: number;
  percentageOfTotalCalories: number;
  mealDistribution: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snacks: number;
  };
  timingRecommendations: {
    preworkout: number;
    postworkout: number;
  };
  carbType: string;
  giRecommendation: string;
  foodExamples: {
    complex: string[];
    simple: string[];
    avoid: string[];
  };
}

export default function CarbohydrateCalculator() {
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
  const [workoutFrequency, setWorkoutFrequency] = useState('3-4');
  
  const [result, setResult] = useState<CarbResult | null>(null);
  const [error, setError] = useState('');
  
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/carbohydrate-calculator',
    getShareParams: () => ({
      weight,
      unit: weightUnit,
      activity: activityLevel,
      goal,
    }),
    getShareText: () => {
      if (result) {
        return `My daily carb needs: ${result.dailyCarbsGrams}g (${result.percentageOfTotalCalories}% of calories)`;
      }
      return 'Calculate your daily carbohydrate needs!';
    },
  });

  const activityMultipliers = {
    sedentary: { tdee: 1.2, carbs: 3 },
    light: { tdee: 1.375, carbs: 4 },
    moderate: { tdee: 1.55, carbs: 5 },
    active: { tdee: 1.725, carbs: 6 },
    veryActive: { tdee: 1.9, carbs: 7 },
    extraActive: { tdee: 2.0, carbs: 8 },
  };

  const goalAdjustments = {
    lose: -500,
    maintain: 0,
    gain: 500,
  };

  const dietTypeCarbs = {
    lowCarb: 0.25,
    balanced: 0.50,
    highCarb: 0.60,
    keto: 0.05,
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
    // Men: BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) + 5
    // Women: BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) - 161
    const bmr = gender === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    
    // Calculate TDEE
    const activityMult = activityMultipliers[activityLevel as keyof typeof activityMultipliers];
    const tdee = bmr * activityMult.tdee;
    
    // Adjust for goal
    const goalAdjustment = goalAdjustments[goal as keyof typeof goalAdjustments];
    const targetCalories = tdee + goalAdjustment;
    
    // Calculate carbs based on diet type
    const carbPercentage = dietTypeCarbs[dietType as keyof typeof dietTypeCarbs];
    const dailyCarbsCalories = targetCalories * carbPercentage;
    const dailyCarbsGrams = Math.round(dailyCarbsCalories / 4); // 4 calories per gram of carbs
    
    // Meal distribution (percentage of daily carbs)
    const mealDistribution = {
      breakfast: Math.round(dailyCarbsGrams * 0.25),
      lunch: Math.round(dailyCarbsGrams * 0.30),
      dinner: Math.round(dailyCarbsGrams * 0.30),
      snacks: Math.round(dailyCarbsGrams * 0.15),
    };

    // Workout timing
    const isActiveWorkout = workoutFrequency !== 'none';
    const timingRecommendations = {
      preworkout: isActiveWorkout ? Math.round(dailyCarbsGrams * 0.15) : 0,
      postworkout: isActiveWorkout ? Math.round(dailyCarbsGrams * 0.25) : 0,
    };

    // Carb type recommendation
    let carbType = '';
    let giRecommendation = '';
    
    if (dietType === 'keto') {
      carbType = 'Very Low Carb (Ketogenic)';
      giRecommendation = 'Focus on fibrous vegetables and minimal net carbs';
    } else if (dietType === 'lowCarb') {
      carbType = 'Low Carb';
      giRecommendation = 'Prioritize low-GI, high-fiber carbs';
    } else if (dietType === 'highCarb') {
      carbType = 'High Carb';
      giRecommendation = 'Mix of low and moderate GI carbs, time high-GI around workouts';
    } else {
      carbType = 'Balanced';
      giRecommendation = 'Focus on complex carbs, moderate GI foods';
    }

    const foodExamples = {
      complex: [
        'Oatmeal (Low GI: 55)',
        'Brown Rice (Medium GI: 68)',
        'Sweet Potato (Low GI: 63)',
        'Quinoa (Low GI: 53)',
        'Whole Wheat Bread (Medium GI: 69)',
        'Lentils (Low GI: 32)',
      ],
      simple: [
        'Banana (Medium GI: 51)',
        'Apple (Low GI: 36)',
        'Berries (Low GI: 25-40)',
        'Honey (Medium GI: 61)',
        'Dates (High GI: 103)',
      ],
      avoid: [
        'White Bread (High GI: 75)',
        'White Rice (High GI: 73)',
        'Sugary Cereals (High GI: 80+)',
        'Candy and Sweets (High GI: 70+)',
        'Soda and Juice (High GI: 65+)',
      ],
    };

    setResult({
      dailyCarbsGrams,
      dailyCarbsCalories,
      percentageOfTotalCalories: Math.round(carbPercentage * 100),
      mealDistribution,
      timingRecommendations,
      carbType,
      giRecommendation,
      foodExamples,
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
      link.download = `carb-intake-plan-${new Date().toISOString().split('T')[0]}.png`;
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
            <head><title>Carbohydrate Intake Plan</title>
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
  const mealDistributionData = result ? {
    labels: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
    datasets: [{
      data: [
        result.mealDistribution.breakfast,
        result.mealDistribution.lunch,
        result.mealDistribution.dinner,
        result.mealDistribution.snacks,
      ],
      backgroundColor: ['#3b82f6', '#1e40af', '#64748b', '#cbd5e1'],
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
              <CardTitle className="text-lg text-gray-900">Calculate Your Carb Needs</CardTitle>
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
                <p className="text-xs text-gray-500">Ages 18-80</p>
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
                  <option value="sedentary">Sedentary: little or no exercise</option>
                  <option value="light">Light: exercise 1-3 times/week</option>
                  <option value="moderate">Moderate: exercise 4-5 times/week</option>
                  <option value="active">Active: daily exercise or intense 3-4 times/week</option>
                  <option value="veryActive">Very Active: intense exercise 6-7 times/week</option>
                  <option value="extraActive">Extra Active: very intense daily or physical job</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Goal</Label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="lose">Lose Weight (Fat Loss)</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Gain Weight (Muscle)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Diet Type</Label>
                <select
                  value={dietType}
                  onChange={(e) => setDietType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="keto">Keto (5% carbs)</option>
                  <option value="lowCarb">Low Carb (25% carbs)</option>
                  <option value="balanced">Balanced (50% carbs)</option>
                  <option value="highCarb">High Carb (60% carbs)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Workout Frequency</Label>
                <select
                  value={workoutFrequency}
                  onChange={(e) => setWorkoutFrequency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="none">No workout</option>
                  <option value="1-2">1-2 times/week</option>
                  <option value="3-4">3-4 times/week</option>
                  <option value="5+">5+ times/week</option>
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
                  <CardTitle className="text-xl text-gray-900">Your Daily Carb Needs</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-700 mb-1">Daily Carbs</p>
                      <p className="text-4xl font-bold text-blue-900">{result.dailyCarbsGrams}g</p>
                      <p className="text-xs text-gray-600 mt-1">{result.dailyCarbsCalories} calories</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-700 mb-1">% of Calories</p>
                      <p className="text-4xl font-bold text-gray-900">{result.percentageOfTotalCalories}%</p>
                      <p className="text-xs text-gray-600 mt-1">from carbohydrates</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-700 mb-1">Diet Type</p>
                      <p className="text-2xl font-bold text-blue-900">{result.carbType}</p>
                      <p className="text-xs text-gray-600 mt-1">approach</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <div className="flex gap-2">
                      <Info className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-blue-900 mb-1">GI Recommendation:</p>
                        <p className="text-sm text-blue-800">{result.giRecommendation}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Meal Distribution */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">📅 Meal Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">Breakfast</span>
                          <span className="text-xl font-bold text-blue-900">{result.mealDistribution.breakfast}g</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">Lunch</span>
                          <span className="text-xl font-bold text-blue-900">{result.mealDistribution.lunch}g</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">Dinner</span>
                          <span className="text-xl font-bold text-blue-900">{result.mealDistribution.dinner}g</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">Snacks</span>
                          <span className="text-xl font-bold text-gray-600">{result.mealDistribution.snacks}g</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      {mealDistributionData && (
                        <div className="w-64 h-64">
                          <Pie data={mealDistributionData} options={{ maintainAspectRatio: true }} />
                        </div>
                      )}
                    </div>
                  </div>

                  {result.timingRecommendations.preworkout > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">🏋️ Workout Timing:</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                          <p className="text-sm text-gray-700 mb-1">Pre-Workout</p>
                          <p className="text-2xl font-bold text-blue-900">{result.timingRecommendations.preworkout}g</p>
                          <p className="text-xs text-gray-600 mt-1">30-60 min before</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                          <p className="text-sm text-gray-700 mb-1">Post-Workout</p>
                          <p className="text-2xl font-bold text-blue-900">{result.timingRecommendations.postworkout}g</p>
                          <p className="text-xs text-gray-600 mt-1">within 2 hours</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Food Examples */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">🥗 Food Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-3">✅ Complex Carbs (Best)</h4>
                      <ul className="space-y-2">
                        {result.foodExamples.complex.map((food, idx) => (
                          <li key={idx} className="text-sm text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-600">
                            {food}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">⚡ Simple Carbs (Moderate)</h4>
                      <ul className="space-y-2">
                        {result.foodExamples.simple.map((food, idx) => (
                          <li key={idx} className="text-sm text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-gray-600">
                            {food}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-900 mb-3">❌ Avoid/Limit</h4>
                      <ul className="space-y-2">
                        {result.foodExamples.avoid.map((food, idx) => (
                          <li key={idx} className="text-sm text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-red-600">
                            {food}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong className="text-gray-900">GI Scale:</strong> Low (55 or less) | Medium (56-69) | High (70+)
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      Lower GI foods provide sustained energy and better blood sugar control.
                    </p>
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
                <p className="text-sm mt-2">Get personalized carbohydrate recommendations!</p>
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
        calculatorName="Carbohydrate Calculator"
      />
    </div>
  );
}

