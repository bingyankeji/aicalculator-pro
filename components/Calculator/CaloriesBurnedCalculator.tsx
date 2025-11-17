'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Copy, Share2, Printer, Download, Flame, Activity } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

// MET values for different activities and intensities
const ACTIVITY_METS: { [key: string]: { low: number; moderate: number; high: number } } = {
  running: { low: 6.0, moderate: 9.8, high: 12.8 },
  cycling: { low: 4.0, moderate: 8.0, high: 12.0 },
  swimming: { low: 5.8, moderate: 8.3, high: 10.0 },
  walking: { low: 2.5, moderate: 3.5, high: 5.0 },
  weightlifting: { low: 3.0, moderate: 5.0, high: 6.0 },
  yoga: { low: 2.5, moderate: 3.3, high: 4.0 },
  dancing: { low: 3.0, moderate: 5.0, high: 7.5 },
  basketball: { low: 6.0, moderate: 7.5, high: 9.0 },
  tennis: { low: 5.0, moderate: 7.0, high: 8.5 },
  soccer: { low: 7.0, moderate: 9.0, high: 11.0 },
  hiking: { low: 4.5, moderate: 6.0, high: 7.5 },
  rowing: { low: 4.8, moderate: 7.0, high: 12.0 },
  boxing: { low: 6.0, moderate: 9.0, high: 12.0 },
  jumping_rope: { low: 8.0, moderate: 11.0, high: 13.0 },
  elliptical: { low: 4.5, moderate: 6.5, high: 8.0 },
};

interface CaloriesResult {
  caloriesBurned: number;
  met: number;
  intensity: string;
  activity: string;
  duration: number;
  weight: number;
  
  // Distance mode specific
  distance?: number;
  speed?: number;
  pace?: string;
  
  // Additional insights
  fatBurned: number;
  weeklyCalories: number;
  monthlyCalories: number;
  foodEquivalents: {
    apples: number;
    bananas: number;
    rice: number;
    pizza: number;
    soda: number;
  };
  
  caloriesPerMinute: number;
  intensityRating: string;
  healthBenefits: string[];
}

export default function CaloriesBurnedCalculator() {
  const [calculationMode, setCalculationMode] = useState<'time' | 'distance'>('time');
  
  // User Info
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('lbs');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  
  // By Time Mode
  const [activity, setActivity] = useState('running');
  const [intensity, setIntensity] = useState<'low' | 'moderate' | 'high'>('moderate');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('');
  const [frequency, setFrequency] = useState('3');
  
  // By Distance Mode
  const [distanceActivity, setDistanceActivity] = useState<'walking' | 'running' | 'cycling'>('running');
  const [distance, setDistance] = useState('');
  const [distanceUnit, setDistanceUnit] = useState<'km' | 'miles'>('miles');
  const [speed, setSpeed] = useState('');
  const [speedPreset, setSpeedPreset] = useState('');

  const [result, setResult] = useState<CaloriesResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/calories-burned-calculator',
    getShareParams: () => ({
      a: activity || distanceActivity,
      w: weight || '',
      d: calculationMode === 'distance' ? distance : '',
      t: calculationMode === 'time' ? `${hours}:${minutes}` : '',
    }),
    getShareText: () => {
      return result
        ? `Calories Burned: ${result.activity} | ${result.caloriesBurned.toFixed(0)} calories | ${result.fatBurned.toFixed(1)}g fat burned | ${result.intensity} intensity`
        : 'Calculate calories burned for various activities and get personalized fitness insights!';
    },
  });

  const calculateByTime = () => {
    const weightValue = parseFloat(weight) || 0;
    const hoursValue = parseInt(hours) || 0;
    const minutesValue = parseInt(minutes) || 0;
    const totalMinutes = hoursValue * 60 + minutesValue;

    if (weightValue <= 0 || weightValue < 35 || weightValue > 350) {
      alert('Please enter a valid weight (80-350 lbs or 35-160 kg).');
      return;
    }

    if (totalMinutes <= 0) {
      alert('Please enter a valid duration.');
      return;
    }

    const weightKg = weightUnit === 'lbs' ? weightValue * 0.453592 : weightValue;
    const met = ACTIVITY_METS[activity][intensity];
    const durationHours = totalMinutes / 60;
    const caloriesBurned = met * weightKg * durationHours;

    setResult(generateResult(caloriesBurned, met, intensity, activity, totalMinutes, weightKg));
  };

  const calculateByDistance = () => {
    const weightValue = parseFloat(weight) || 0;
    const distanceValue = parseFloat(distance) || 0;
    const speedValue = parseFloat(speed) || 0;

    if (weightValue <= 0 || weightValue < 35 || weightValue > 350) {
      alert('Please enter a valid weight (80-350 lbs or 35-160 kg).');
      return;
    }

    if (distanceValue <= 0) {
      alert('Please enter a valid distance.');
      return;
    }

    if (speedValue <= 0) {
      alert('Please enter a valid speed.');
      return;
    }

    const weightKg = weightUnit === 'lbs' ? weightValue * 0.453592 : weightValue;
    const distanceKm = distanceUnit === 'miles' ? distanceValue * 1.60934 : distanceValue;
    const speedKmh = distanceUnit === 'miles' ? speedValue * 1.60934 : speedValue;
    
    // Calculate duration
    const durationHours = distanceKm / speedKmh;
    const durationMinutes = durationHours * 60;

    // Calculate MET based on activity and speed
    let met = 0;
    let intensityLevel: 'low' | 'moderate' | 'high' = 'moderate';
    
    if (distanceActivity === 'walking') {
      if (speedKmh < 4) {
        met = 2.5; // slow
        intensityLevel = 'low';
      } else if (speedKmh < 5.5) {
        met = 3.5; // moderate
        intensityLevel = 'moderate';
      } else {
        met = 5.0; // fast
        intensityLevel = 'high';
      }
    } else if (distanceActivity === 'running') {
      if (speedKmh < 8) {
        met = 6.0; // jogging
        intensityLevel = 'low';
      } else if (speedKmh < 11) {
        met = 9.8; // moderate pace
        intensityLevel = 'moderate';
      } else {
        met = 12.8; // fast
        intensityLevel = 'high';
      }
    } else if (distanceActivity === 'cycling') {
      if (speedKmh < 16) {
        met = 4.0; // leisurely
        intensityLevel = 'low';
      } else if (speedKmh < 22) {
        met = 8.0; // moderate
        intensityLevel = 'moderate';
      } else {
        met = 12.0; // vigorous
        intensityLevel = 'high';
      }
    }

    const caloriesBurned = met * weightKg * durationHours;
    
    // Calculate pace (min/km or min/mile)
    const paceMinPerUnit = 60 / speedValue;
    const paceMin = Math.floor(paceMinPerUnit);
    const paceSec = Math.round((paceMinPerUnit - paceMin) * 60);
    const paceString = `${paceMin}:${paceSec.toString().padStart(2, '0')} min/${distanceUnit === 'km' ? 'km' : 'mi'}`;

    const resultData = generateResult(caloriesBurned, met, intensityLevel, distanceActivity, durationMinutes, weightKg);
    resultData.distance = distanceValue;
    resultData.speed = speedValue;
    resultData.pace = paceString;

    setResult(resultData);
  };

  const generateResult = (
    caloriesBurned: number,
    met: number,
    intensity: string,
    activity: string,
    durationMinutes: number,
    weightKg: number
  ): CaloriesResult => {
    const fatBurned = caloriesBurned / 7.7;
    const weeklyCalories = caloriesBurned * parseInt(frequency);
    const monthlyCalories = weeklyCalories * 4.33;

    const foodEquivalents = {
      apples: Math.round(caloriesBurned / 95 * 10) / 10,
      bananas: Math.round(caloriesBurned / 105 * 10) / 10,
      rice: Math.round(caloriesBurned / 206 * 10) / 10,
      pizza: Math.round(caloriesBurned / 285 * 10) / 10,
      soda: Math.round(caloriesBurned / 150 * 10) / 10,
    };

    const caloriesPerMinute = caloriesBurned / durationMinutes;

    let intensityRating = '';
    if (met < 3) intensityRating = 'Light Activity';
    else if (met < 6) intensityRating = 'Moderate Activity';
    else if (met < 9) intensityRating = 'Vigorous Activity';
    else intensityRating = 'Very Vigorous Activity';

    const healthBenefits: string[] = [];
    if (caloriesBurned >= 200) {
      healthBenefits.push('✅ Excellent workout! Burns significant calories for weight management.');
    }
    if (met >= 6) {
      healthBenefits.push('✅ High intensity improves cardiovascular fitness and endurance.');
    }
    if (durationMinutes >= 30) {
      healthBenefits.push('✅ Meets recommended 30+ minutes of daily exercise for heart health.');
    }
    if (activity === 'weightlifting' || activity === 'rowing' || activity === 'swimming') {
      healthBenefits.push('✅ Full-body workout builds muscle strength and bone density.');
    }
    if (weeklyCalories >= 2000) {
      healthBenefits.push('✅ Weekly calorie burn supports 0.5-1 lb fat loss per week when combined with diet.');
    }
    if (healthBenefits.length === 0) {
      healthBenefits.push('💡 Consider increasing duration or intensity for greater health benefits.');
    }

    return {
      caloriesBurned,
      met,
      intensity,
      activity,
      duration: durationMinutes,
      weight: weightKg,
      fatBurned,
      weeklyCalories,
      monthlyCalories,
      foodEquivalents,
      caloriesPerMinute,
      intensityRating,
      healthBenefits,
    };
  };

  const handleSpeedPresetChange = (preset: string) => {
    setSpeedPreset(preset);
    if (!preset) return;
    
    const presets: { [key: string]: { [unit: string]: number } } = {
      walking: {
        slow: distanceUnit === 'km' ? 3 : 1.9,
        moderate: distanceUnit === 'km' ? 5 : 3.1,
        fast: distanceUnit === 'km' ? 6 : 3.7,
      },
      running: {
        slow: distanceUnit === 'km' ? 8 : 5,
        moderate: distanceUnit === 'km' ? 10 : 6.2,
        fast: distanceUnit === 'km' ? 13 : 8.1,
        very_fast: distanceUnit === 'km' ? 16 : 9.9,
      },
      cycling: {
        slow: distanceUnit === 'km' ? 15 : 9.3,
        moderate: distanceUnit === 'km' ? 20 : 12.4,
        fast: distanceUnit === 'km' ? 25 : 15.5,
        very_fast: distanceUnit === 'km' ? 30 : 18.6,
      },
    };

    const speedVal = presets[distanceActivity]?.[preset];
    if (speedVal) {
      setSpeed(speedVal.toString());
    }
  };

  const getActivityName = (key: string): string => {
    const names: { [key: string]: string } = {
      running: 'Running',
      cycling: 'Cycling',
      swimming: 'Swimming',
      walking: 'Walking',
      weightlifting: 'Weight Lifting',
      yoga: 'Yoga',
      dancing: 'Dancing',
      basketball: 'Basketball',
      tennis: 'Tennis',
      soccer: 'Soccer',
      hiking: 'Hiking',
      rowing: 'Rowing',
      boxing: 'Boxing',
      jumping_rope: 'Jumping Rope',
      elliptical: 'Elliptical Trainer',
    };
    return names[key] || key;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Save as Image
  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `calories-burned-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  // Print Results
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
            <head>
              <title>Calories Burned Calculator Results</title>
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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Left: Input Area (1 column) */}
        <div className="xl:col-span-1">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
              <CardTitle className="text-xl">Activity Details</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Calculate by time or distance</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Calculation Mode Tabs */}
              <div className="space-y-3">
                <Label className="text-xs font-semibold text-gray-900">Calculation Mode:</Label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCalculationMode('time')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                      calculationMode === 'time'
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    By Time
                  </button>
                  <button
                    onClick={() => setCalculationMode('distance')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                      calculationMode === 'distance'
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    By Distance
                  </button>
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-gray-900 text-sm">👤 Your Information</h3>
                <div>
                  <Label htmlFor="weight" className="text-xs">
                    Body Weight <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      placeholder="e.g., 150"
                      min="35"
                      max="350"
                      step="0.1"
                    />
                    <select
                      value={weightUnit}
                      onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lbs')}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm"
                    >
                      <option value="lbs">lbs</option>
                      <option value="kg">kg</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Range: 80-350 lbs or 35-160 kg
                  </p>
                </div>
              </div>

              {/* By Time Mode */}
              {calculationMode === 'time' && (
                <>
                  <div className="space-y-3 border-t pt-4">
                    <h3 className="font-semibold text-gray-900 text-sm">🏃 Activity Type</h3>
                    <div>
                      <Label htmlFor="activity" className="text-xs">
                        Exercise/Sport <span className="text-red-500">*</span>
                      </Label>
                      <select
                        id="activity"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      >
                        <option value="running">🏃 Running</option>
                        <option value="walking">🚶 Walking</option>
                        <option value="cycling">🚴 Cycling</option>
                        <option value="swimming">🏊 Swimming</option>
                        <option value="weightlifting">🏋️ Weight Lifting</option>
                        <option value="yoga">🧘 Yoga</option>
                        <option value="dancing">💃 Dancing</option>
                        <option value="basketball">🏀 Basketball</option>
                        <option value="tennis">🎾 Tennis</option>
                        <option value="soccer">⚽ Soccer</option>
                        <option value="hiking">🥾 Hiking</option>
                        <option value="rowing">🚣 Rowing</option>
                        <option value="boxing">🥊 Boxing</option>
                        <option value="jumping_rope">🪢 Jumping Rope</option>
                        <option value="elliptical">🔄 Elliptical Trainer</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="intensity" className="text-xs">
                        Intensity <span className="text-red-500">*</span>
                      </Label>
                      <select
                        id="intensity"
                        value={intensity}
                        onChange={(e) => setIntensity(e.target.value as 'low' | 'moderate' | 'high')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      >
                        <option value="low">Low (Easy pace, can talk easily)</option>
                        <option value="moderate">Moderate (Breathing faster, can talk)</option>
                        <option value="high">High (Hard to talk, breathing hard)</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        MET value: {ACTIVITY_METS[activity][intensity]}
                      </p>
                    </div>

                    <div>
                      <Label className="text-xs">
                        Duration <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex gap-2 items-center">
                        <div className="flex-1">
                          <input
                            type="number"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                            placeholder="0"
                            min="0"
                            max="24"
                          />
                          <p className="text-xs text-gray-500 mt-1">hours 小时</p>
                        </div>
                        <div className="flex-1">
                          <input
                            type="number"
                            value={minutes}
                            onChange={(e) => setMinutes(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                            placeholder="30"
                            min="0"
                            max="59"
                          />
                          <p className="text-xs text-gray-500 mt-1">minutes 分钟</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* By Distance Mode */}
              {calculationMode === 'distance' && (
                <>
                  <div className="space-y-3 border-t pt-4">
                    <h3 className="font-semibold text-gray-900 text-sm">🏃 Activity Type</h3>
                    <div>
                      <Label htmlFor="distanceActivity" className="text-xs">
                        Activity <span className="text-red-500">*</span>
                      </Label>
                      <select
                        id="distanceActivity"
                        value={distanceActivity}
                        onChange={(e) => {
                          setDistanceActivity(e.target.value as 'walking' | 'running' | 'cycling');
                          setSpeed('');
                          setSpeedPreset('');
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      >
                        <option value="walking">🚶 Walking 步行</option>
                        <option value="running">🏃 Running 跑步</option>
                        <option value="cycling">🚴 Cycling 骑行</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="distance" className="text-xs">
                        Distance <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex gap-2">
                        <input
                          id="distance"
                          type="number"
                          value={distance}
                          onChange={(e) => setDistance(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                          placeholder="e.g., 5"
                          min="0"
                          step="0.1"
                        />
                        <select
                          value={distanceUnit}
                          onChange={(e) => {
                            setDistanceUnit(e.target.value as 'km' | 'miles');
                            setSpeed('');
                            setSpeedPreset('');
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm"
                        >
                          <option value="miles">miles</option>
                          <option value="km">km</option>
                        </select>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Distance 距离</p>
                    </div>

                    <div>
                      <Label htmlFor="speedPreset" className="text-xs">
                        Speed/Pace (optional preset)
                      </Label>
                      <select
                        id="speedPreset"
                        value={speedPreset}
                        onChange={(e) => handleSpeedPresetChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      >
                        <option value="">-- Select Speed --</option>
                        <option value="slow">Slow 慢速</option>
                        <option value="moderate">Moderate 中速</option>
                        <option value="fast">Fast 快速</option>
                        {(distanceActivity === 'running' || distanceActivity === 'cycling') && (
                          <option value="very_fast">Very Fast 极快</option>
                        )}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="speed" className="text-xs">
                        Speed <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex gap-2 items-center">
                        <input
                          id="speed"
                          type="number"
                          value={speed}
                          onChange={(e) => {
                            setSpeed(e.target.value);
                            setSpeedPreset('');
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                          placeholder="e.g., 6"
                          min="0"
                          step="0.1"
                        />
                        <span className="text-sm text-gray-600">
                          {distanceUnit === 'km' ? 'km/h' : 'mph'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Your average speed 速度/节奏
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Frequency */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-gray-900 text-sm">📅 Workout Frequency</h3>
                <div>
                  <Label htmlFor="frequency" className="text-xs">Times per Week</Label>
                  <select
                    id="frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  >
                    <option value="1">1 time/week</option>
                    <option value="2">2 times/week</option>
                    <option value="3">3 times/week</option>
                    <option value="4">4 times/week</option>
                    <option value="5">5 times/week</option>
                    <option value="6">6 times/week</option>
                    <option value="7">7 times/week (daily)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">For weekly/monthly projections</p>
                </div>
              </div>

              <Button
                onClick={calculationMode === 'time' ? calculateByTime : calculateByDistance}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 min-h-[44px]"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Calories
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right: Results Area (2 columns) */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
              <CardTitle className="text-xl">Calories Burned</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result ? (
                <div className="space-y-4">
                  {/* Main Result */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-400 p-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Calories Burned:</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(result.caloriesBurned.toFixed(0))}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Flame className="h-12 w-12 text-orange-600" />
                      <div>
                        <p className="font-mono text-4xl font-bold text-orange-700">
                          {result.caloriesBurned.toFixed(0)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {result.caloriesPerMinute.toFixed(1)} cal/min • {result.intensityRating}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Activity Summary */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">🏃 Workout Summary</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600 text-xs">Activity:</p>
                        <p className="font-semibold">{getActivityName(result.activity)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Duration:</p>
                        <p className="font-semibold">{result.duration.toFixed(0)} min</p>
                      </div>
                      {result.distance && (
                        <div>
                          <p className="text-gray-600 text-xs">Distance:</p>
                          <p className="font-semibold">{result.distance} {distanceUnit}</p>
                        </div>
                      )}
                      {result.speed && (
                        <div>
                          <p className="text-gray-600 text-xs">Speed:</p>
                          <p className="font-semibold">{result.speed} {distanceUnit === 'km' ? 'km/h' : 'mph'}</p>
                        </div>
                      )}
                      {result.pace && (
                        <div>
                          <p className="text-gray-600 text-xs">Pace:</p>
                          <p className="font-semibold">{result.pace}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-gray-600 text-xs">Intensity:</p>
                        <p className="font-semibold capitalize">{result.intensity}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">MET Value:</p>
                        <p className="font-semibold">{result.met.toFixed(1)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Fat Burned & Projections */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-red-50 rounded-lg border border-red-200 p-4">
                      <p className="text-xs text-gray-600 mb-1">Fat Burned:</p>
                      <p className="font-mono text-2xl font-bold text-red-700">
                        {result.fatBurned.toFixed(1)}g
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Approx. body fat</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg border border-orange-200 p-4">
                      <p className="text-xs text-gray-600 mb-1">Weekly Total:</p>
                      <p className="font-mono text-2xl font-bold text-orange-700">
                        {result.weeklyCalories.toFixed(0)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{frequency}x per week</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
                      <p className="text-xs text-gray-600 mb-1">Monthly Total:</p>
                      <p className="font-mono text-2xl font-bold text-yellow-700">
                        {result.monthlyCalories.toFixed(0)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">~{(result.monthlyCalories / 7700).toFixed(1)} kg fat</p>
                    </div>
                  </div>

                  {/* Food Equivalents */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">🍎 Food Equivalents</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      You burned the equivalent of:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-2xl mb-1">🍎</p>
                        <p className="font-bold text-green-700">{result.foodEquivalents.apples}</p>
                        <p className="text-xs text-gray-600">Apples</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-2xl mb-1">🍌</p>
                        <p className="font-bold text-green-700">{result.foodEquivalents.bananas}</p>
                        <p className="text-xs text-gray-600">Bananas</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-2xl mb-1">🍚</p>
                        <p className="font-bold text-green-700">{result.foodEquivalents.rice}</p>
                        <p className="text-xs text-gray-600">Cups Rice</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-2xl mb-1">🍕</p>
                        <p className="font-bold text-green-700">{result.foodEquivalents.pizza}</p>
                        <p className="text-xs text-gray-600">Pizza Slices</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-2xl mb-1">🥤</p>
                        <p className="font-bold text-green-700">{result.foodEquivalents.soda}</p>
                        <p className="text-xs text-gray-600">Sodas</p>
                      </div>
                    </div>
                  </div>

                  {/* Health Benefits */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Health Benefits
                    </h3>
                    <div className="space-y-2">
                      {result.healthBenefits.map((benefit, index) => (
                        <p key={index} className="text-sm text-gray-700 leading-relaxed">
                          {benefit}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Weight Loss Estimate */}
                  {result.weeklyCalories >= 500 && (
                    <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">⚖️ Weight Loss Potential</h3>
                      <p className="text-sm text-gray-700 mb-2">
                        With consistent exercise at this level:
                      </p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>1 week:</strong> Burn {result.weeklyCalories.toFixed(0)} calories = ~{(result.weeklyCalories / 7700).toFixed(2)} kg fat loss</li>
                        <li>• <strong>1 month:</strong> Burn {result.monthlyCalories.toFixed(0)} calories = ~{(result.monthlyCalories / 7700).toFixed(2)} kg fat loss</li>
                        <li>• <strong>3 months:</strong> Burn {(result.monthlyCalories * 3).toFixed(0)} calories = ~{(result.monthlyCalories * 3 / 7700).toFixed(1)} kg fat loss</li>
                      </ul>
                      <p className="text-xs text-gray-500 mt-3">
                        * Assumes calorie deficit maintained. Actual weight loss depends on diet and metabolism. 1 kg fat ≈ 7,700 calories.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center text-gray-500">
                    <Calculator className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Select calculation mode and enter your details</p>
                    <p className="text-sm mt-2">Choose between Time-based or Distance-based calculation</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reference Card */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
          <CardTitle className="text-xl">Understanding MET & Calorie Burn</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border-2 border-orange-200 p-4">
              <h3 className="text-lg font-semibold text-orange-700 mb-3">📊 What is MET?</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>MET (Metabolic Equivalent of Task)</strong> measures exercise intensity:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 1.0 MET = Resting</li>
                <li>• 1-3 METs = Light activity</li>
                <li>• 3-6 METs = Moderate</li>
                <li>• 6+ METs = Vigorous</li>
                <li>• 10+ METs = Very vigorous</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border-2 border-red-200 p-4">
              <h3 className="text-lg font-semibold text-red-700 mb-3">🔥 Calorie Formula</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Calories Burned Formula:</strong>
              </p>
              <div className="bg-gray-50 rounded p-3 mb-2">
                <p className="font-mono text-sm text-center">
                  Calories = MET × Weight(kg) × Hours
                </p>
              </div>
              <p className="text-xs text-gray-600">
                Example: 70kg person, running (MET 9.8), 30 min = 9.8 × 70 × 0.5 = 343 calories
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-yellow-200 p-4">
              <h3 className="text-lg font-semibold text-yellow-700 mb-3">💡 Tips for Max Burn</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Higher intensity = more calories</li>
                <li>• Longer duration compounds effect</li>
                <li>• Heavier people burn more</li>
                <li>• Mix cardio + strength training</li>
                <li>• Stay consistent (3-5x/week)</li>
                <li>• Pair with healthy diet</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
        <Button 
          onClick={handleSaveAsImage} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Download className="h-4 w-4" />
          Save as Image
        </Button>
        
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Printer className="h-4 w-4" />
          Print Results
        </Button>
        
        <Button 
          onClick={handleShare} 
          variant="outline" 
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share Calculator
        </Button>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Calories Burned Calculator"
      />
    </div>
  );
}
