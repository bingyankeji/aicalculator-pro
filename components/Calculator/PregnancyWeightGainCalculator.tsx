'use client';

import { useState, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, AlertCircle, Info, TrendingUp } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface PregnancyResult {
  prePregnancyBMI: number;
  bmiCategory: string;
  recommendedGain: { min: number; max: number };
  currentWeightGain: number;
  currentWeekRecommendation: { min: number; max: number };
  weeklyRate: { min: number; max: number };
  status: 'below' | 'within' | 'above';
  statusMessage: string;
  trimester: 1 | 2 | 3;
  milestones: { week: number; minWeight: number; maxWeight: number }[];
  recommendations: {
    nutrition: string[];
    exercise: string[];
    warnings: string[];
  };
}

export default function PregnancyWeightGainCalculator() {
  const [prePregnancyWeight, setPrePregnancyWeight] = useState('65');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [height, setHeight] = useState('165');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'inches'>('cm');
  const [currentWeight, setCurrentWeight] = useState('70');
  const [currentWeek, setCurrentWeek] = useState('20');
  const [pregnancyType, setPregnancyType] = useState<'single' | 'twins'>('single');
  
  const [result, setResult] = useState<PregnancyResult | null>(null);
  const [error, setError] = useState('');
  
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/pregnancy-weight-gain-calculator',
    getShareParams: () => ({
      preWeight: prePregnancyWeight,
      week: currentWeek,
      type: pregnancyType,
    }),
    getShareText: () => {
      if (result) {
        return `Pregnancy Week ${currentWeek}: Weight gain ${result.currentWeightGain.toFixed(1)}kg (${result.status})`;
      }
      return 'Track your pregnancy weight gain!';
    },
  });

  // BMI-based weight gain recommendations (Institute of Medicine guidelines)
  const getRecommendedGain = (bmi: number, twins: boolean) => {
    if (twins) {
      if (bmi < 18.5) return { min: 17, max: 25 };
      if (bmi < 25) return { min: 17, max: 25 };
      if (bmi < 30) return { min: 14, max: 23 };
      return { min: 11, max: 19 };
    } else {
      if (bmi < 18.5) return { min: 12.5, max: 18 };
      if (bmi < 25) return { min: 11.5, max: 16 };
      if (bmi < 30) return { min: 7, max: 11.5 };
      return { min: 5, max: 9 };
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal Weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const getTrimester = (week: number): 1 | 2 | 3 => {
    if (week <= 13) return 1;
    if (week <= 27) return 2;
    return 3;
  };

  const calculate = () => {
    setError('');
    
    const preWeightNum = parseFloat(prePregnancyWeight);
    const currentWeightNum = parseFloat(currentWeight);
    const heightNum = parseFloat(height);
    const weekNum = parseInt(currentWeek);
    
    if (!preWeightNum || preWeightNum <= 0) {
      setError('Please enter a valid pre-pregnancy weight');
      return;
    }
    
    if (!currentWeightNum || currentWeightNum <= 0) {
      setError('Please enter a valid current weight');
      return;
    }
    
    if (!heightNum || heightNum <= 0) {
      setError('Please enter a valid height');
      return;
    }
    
    if (!weekNum || weekNum < 1 || weekNum > 42) {
      setError('Please enter a valid pregnancy week (1-42)');
      return;
    }

    // Convert to kg and cm
    const preWeightKg = weightUnit === 'lbs' ? preWeightNum * 0.453592 : preWeightNum;
    const currentWeightKg = weightUnit === 'lbs' ? currentWeightNum * 0.453592 : currentWeightNum;
    const heightCm = heightUnit === 'inches' ? heightNum * 2.54 : heightNum;
    
    // Calculate BMI
    const heightM = heightCm / 100;
    const bmi = preWeightKg / (heightM * heightM);
    const bmiCategory = getBMICategory(bmi);
    
    // Get recommendations
    const isTwins = pregnancyType === 'twins';
    const recommendedGain = getRecommendedGain(bmi, isTwins);
    
    // Calculate current weight gain
    const currentWeightGain = currentWeightKg - preWeightKg;
    
    // Calculate expected weight gain for current week
    // First trimester: minimal gain (0.5-2 kg total)
    // Second & third trimester: steady gain
    let expectedMin, expectedMax;
    const trimester = getTrimester(weekNum);
    
    if (weekNum <= 13) {
      // First trimester: 0.5-2 kg total
      expectedMin = 0.5 * (weekNum / 13);
      expectedMax = 2 * (weekNum / 13);
    } else {
      // After first trimester
      const firstTrimesterGain = 1.25; // average
      const remainingWeeks = weekNum - 13;
      const totalWeeksRemaining = 27; // weeks 14-40
      const remainingGain = (recommendedGain.min + recommendedGain.max) / 2 - firstTrimesterGain;
      const weeklyGain = remainingGain / totalWeeksRemaining;
      
      expectedMin = firstTrimesterGain + (weeklyGain * 0.7 * remainingWeeks);
      expectedMax = firstTrimesterGain + (weeklyGain * 1.3 * remainingWeeks);
    }
    
    // Determine status
    let status: 'below' | 'within' | 'above';
    let statusMessage: string;
    
    if (currentWeightGain < expectedMin) {
      status = 'below';
      statusMessage = 'Your weight gain is below the recommended range. Consult your healthcare provider.';
    } else if (currentWeightGain > expectedMax) {
      status = 'above';
      statusMessage = 'Your weight gain is above the recommended range. Consult your healthcare provider.';
    } else {
      status = 'within';
      statusMessage = 'Your weight gain is within the healthy range. Keep up the good work!';
    }
    
    // Calculate weekly rate (for 2nd & 3rd trimester)
    const weeklyRate = weekNum > 13 ? {
      min: (recommendedGain.min - 1.25) / 27,
      max: (recommendedGain.max - 1.25) / 27,
    } : { min: 0, max: 0.2 };
    
    // Generate milestones (every 4 weeks)
    const milestones = [];
    for (let week = 4; week <= 40; week += 4) {
      let minWeight, maxWeight;
      if (week <= 13) {
        minWeight = preWeightKg + 0.5 * (week / 13);
        maxWeight = preWeightKg + 2 * (week / 13);
      } else {
        const firstTrimGain = 1.25;
        const weeksAfter13 = week - 13;
        const totalWeeksRemain = 27;
        const remainGain = (recommendedGain.min + recommendedGain.max) / 2 - firstTrimGain;
        const wkGain = remainGain / totalWeeksRemain;
        
        minWeight = preWeightKg + firstTrimGain + (wkGain * 0.7 * weeksAfter13);
        maxWeight = preWeightKg + firstTrimGain + (wkGain * 1.3 * weeksAfter13);
      }
      
      milestones.push({
        week,
        minWeight: weightUnit === 'lbs' ? minWeight / 0.453592 : minWeight,
        maxWeight: weightUnit === 'lbs' ? maxWeight / 0.453592 : maxWeight,
      });
    }
    
    // Recommendations
    const recommendations = {
      nutrition: [],
      exercise: [],
      warnings: [],
    };
    
    if (trimester === 1) {
      recommendations.nutrition.push(
        'Focus on nutrient-dense foods despite morning sickness',
        'Take prenatal vitamins with folic acid (400-800 mcg)',
        'Stay hydrated - drink 8-10 glasses of water daily',
        'Eat small, frequent meals to manage nausea'
      );
      recommendations.exercise.push(
        'Continue pre-pregnancy exercise routine (if approved by doctor)',
        'Start with 20-30 minutes of moderate activity daily',
        'Walking, swimming, prenatal yoga are excellent choices',
        'Avoid contact sports and activities with fall risk'
      );
    } else if (trimester === 2) {
      recommendations.nutrition.push(
        'Increase calorie intake by 300-350 calories per day',
        'Focus on protein, calcium, iron, and omega-3 fatty acids',
        'Eat iron-rich foods (lean meat, spinach, fortified cereals)',
        'Include calcium sources (dairy, leafy greens, fortified foods)'
      );
      recommendations.exercise.push(
        'Aim for 30 minutes of moderate exercise most days',
        'Pelvic floor exercises (Kegels) to prepare for delivery',
        'Prenatal strength training with light weights',
        'Avoid lying flat on your back after 20 weeks'
      );
    } else {
      recommendations.nutrition.push(
        'Continue 300-350 extra calories per day',
        'Eat smaller, more frequent meals as baby grows',
        'Focus on complex carbs, protein, and healthy fats',
        'Reduce sodium to minimize swelling'
      );
      recommendations.exercise.push(
        'Continue safe, moderate exercise if comfortable',
        'Walking and swimming are ideal in late pregnancy',
        'Practice breathing and relaxation techniques',
        'Stop exercising if you experience contractions or pain'
      );
    }
    
    if (status === 'below') {
      recommendations.warnings.push(
        '⚠️ Inadequate weight gain may affect fetal growth',
        '⚠️ Increase nutrient-dense food intake',
        '⚠️ Consult your healthcare provider immediately'
      );
    } else if (status === 'above') {
      recommendations.warnings.push(
        '⚠️ Excessive weight gain increases risk of gestational diabetes',
        '⚠️ May lead to delivery complications',
        '⚠️ Focus on portion control and regular physical activity',
        '⚠️ Consult your healthcare provider for guidance'
      );
    }
    
    setResult({
      prePregnancyBMI: bmi,
      bmiCategory,
      recommendedGain,
      currentWeightGain: weightUnit === 'lbs' ? currentWeightGain / 0.453592 : currentWeightGain,
      currentWeekRecommendation: {
        min: weightUnit === 'lbs' ? expectedMin / 0.453592 : expectedMin,
        max: weightUnit === 'lbs' ? expectedMax / 0.453592 : expectedMax,
      },
      weeklyRate: {
        min: weightUnit === 'lbs' ? weeklyRate.min / 0.453592 : weeklyRate.min,
        max: weightUnit === 'lbs' ? weeklyRate.max / 0.453592 : weeklyRate.max,
      },
      status,
      statusMessage,
      trimester,
      milestones,
      recommendations,
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
      link.download = `pregnancy-weight-week${currentWeek}.png`;
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
            <head><title>Pregnancy Weight Tracker - Week ${currentWeek}</title>
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
  const chartData = useMemo(() => {
    if (!result) return null;
    
    const preWeightNum = parseFloat(prePregnancyWeight);
    const preWeightKg = weightUnit === 'lbs' ? preWeightNum * 0.453592 : preWeightNum;
    const weekNum = parseInt(currentWeek);
    
    const weeks = Array.from({ length: 41 }, (_, i) => i);
    const minLine = weeks.map(week => {
      if (week === 0) return weightUnit === 'lbs' ? preWeightNum : preWeightKg;
      if (week <= 13) {
        const gain = 0.5 * (week / 13);
        return weightUnit === 'lbs' ? (preWeightKg + gain) / 0.453592 : preWeightKg + gain;
      } else {
        const firstTrimGain = 1.25;
        const weeksAfter = week - 13;
        const totalWeeks = 27;
        const remainGain = result.recommendedGain.min - firstTrimGain;
        const weeklyGain = remainGain / totalWeeks;
        const totalGain = firstTrimGain + weeklyGain * weeksAfter;
        return weightUnit === 'lbs' ? (preWeightKg + totalGain) / 0.453592 : preWeightKg + totalGain;
      }
    });
    
    const maxLine = weeks.map(week => {
      if (week === 0) return weightUnit === 'lbs' ? preWeightNum : preWeightKg;
      if (week <= 13) {
        const gain = 2 * (week / 13);
        return weightUnit === 'lbs' ? (preWeightKg + gain) / 0.453592 : preWeightKg + gain;
      } else {
        const firstTrimGain = 1.25;
        const weeksAfter = week - 13;
        const totalWeeks = 27;
        const remainGain = result.recommendedGain.max - firstTrimGain;
        const weeklyGain = remainGain / totalWeeks;
        const totalGain = firstTrimGain + weeklyGain * weeksAfter;
        return weightUnit === 'lbs' ? (preWeightKg + totalGain) / 0.453592 : preWeightKg + totalGain;
      }
    });
    
    const currentWeightNum = parseFloat(currentWeight);
    const actualPoints = weeks.map(w => w === weekNum ? currentWeightNum : null);
    
    return {
      labels: weeks,
      datasets: [
        {
          label: 'Recommended Min',
          data: minLine,
          borderColor: '#94a3b8',
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointRadius: 0,
          borderDash: [5, 5],
        },
        {
          label: 'Recommended Max',
          data: maxLine,
          borderColor: '#94a3b8',
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointRadius: 0,
          borderDash: [5, 5],
        },
        {
          label: 'Healthy Range',
          data: minLine,
          fill: '+1',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 0,
          pointRadius: 0,
        },
        {
          label: 'Your Current Weight',
          data: actualPoints,
          borderColor: result.status === 'within' ? '#10b981' : result.status === 'above' ? '#ef4444' : '#f59e0b',
          backgroundColor: result.status === 'within' ? '#10b981' : result.status === 'above' ? '#ef4444' : '#f59e0b',
          pointRadius: 8,
          pointHoverRadius: 10,
        },
      ],
    };
  }, [result, prePregnancyWeight, currentWeight, currentWeek, weightUnit]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1">
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">Track Your Weight Gain</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="preWeight" className="text-sm font-medium text-gray-700">
                  Pre-Pregnancy Weight <span className="text-red-600">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    id="preWeight"
                    type="number"
                    value={prePregnancyWeight}
                    onChange={(e) => setPrePregnancyWeight(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="65"
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
                    placeholder="165"
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
                <Label htmlFor="currentWeight" className="text-sm font-medium text-gray-700">
                  Current Weight <span className="text-red-600">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    id="currentWeight"
                    type="number"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="70"
                    min="1"
                  />
                  <div className="px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600 text-sm flex items-center">
                    {weightUnit}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="week" className="text-sm font-medium text-gray-700">
                  Current Pregnancy Week <span className="text-red-600">*</span>
                </Label>
                <input
                  id="week"
                  type="number"
                  value={currentWeek}
                  onChange={(e) => setCurrentWeek(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="20"
                  min="1"
                  max="42"
                />
                <p className="text-xs text-gray-500">Enter week 1-42</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Pregnancy Type</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="single"
                      checked={pregnancyType === 'single'}
                      onChange={(e) => setPregnancyType(e.target.value as 'single' | 'twins')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Single Baby</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="twins"
                      checked={pregnancyType === 'twins'}
                      onChange={(e) => setPregnancyType(e.target.value as 'single' | 'twins')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Twins</span>
                  </label>
                </div>
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
              {/* Status Overview */}
              <Card className="border-gray-200">
                <CardHeader className={`border-b ${
                  result.status === 'within' ? 'bg-green-50' :
                  result.status === 'above' ? 'bg-red-50' : 'bg-yellow-50'
                }`}>
                  <CardTitle className="text-xl text-gray-900">
                    Week {currentWeek} - Trimester {result.trimester}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-700 mb-1">Pre-Pregnancy BMI</p>
                      <p className="text-3xl font-bold text-gray-900">{result.prePregnancyBMI.toFixed(1)}</p>
                      <p className="text-xs text-gray-600 mt-1">{result.bmiCategory}</p>
                    </div>
                    <div className={`border p-4 rounded-lg text-center ${
                      result.status === 'within' ? 'bg-green-50 border-green-200' :
                      result.status === 'above' ? 'bg-red-50 border-red-200' :
                      'bg-yellow-50 border-yellow-200'
                    }`}>
                      <p className="text-sm text-gray-700 mb-1">Current Gain</p>
                      <p className={`text-3xl font-bold ${
                        result.status === 'within' ? 'text-green-900' :
                        result.status === 'above' ? 'text-red-900' : 'text-yellow-900'
                      }`}>
                        {result.currentWeightGain >= 0 ? '+' : ''}{result.currentWeightGain.toFixed(1)} {weightUnit}
                      </p>
                      <p className="text-xs text-gray-600 mt-1 capitalize">{result.status} range</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-700 mb-1">Total Goal</p>
                      <p className="text-3xl font-bold text-blue-900">
                        {result.recommendedGain.min.toFixed(1)}-{result.recommendedGain.max.toFixed(1)}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{weightUnit} by week 40</p>
                    </div>
                  </div>

                  <div className={`border-l-4 p-4 rounded-r-lg ${
                    result.status === 'within' ? 'bg-green-50 border-green-500' :
                    result.status === 'above' ? 'bg-red-50 border-red-500' :
                    'bg-yellow-50 border-yellow-500'
                  }`}>
                    <div className="flex gap-2">
                      <Info className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                        result.status === 'within' ? 'text-green-700' :
                        result.status === 'above' ? 'text-red-700' : 'text-yellow-700'
                      }`} />
                      <div>
                        <p className={`font-semibold mb-1 ${
                          result.status === 'within' ? 'text-green-900' :
                          result.status === 'above' ? 'text-red-900' : 'text-yellow-900'
                        }`}>
                          {result.statusMessage}
                        </p>
                        <p className="text-sm text-gray-700">
                          Recommended for week {currentWeek}: {result.currentWeekRecommendation.min.toFixed(1)}-
                          {result.currentWeekRecommendation.max.toFixed(1)} {weightUnit} gain
                        </p>
                        {parseInt(currentWeek) > 13 && (
                          <p className="text-sm text-gray-700 mt-1">
                            Weekly rate goal: {result.weeklyRate.min.toFixed(2)}-{result.weeklyRate.max.toFixed(2)} {weightUnit}/week
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weight Progression Chart */}
              {chartData && (
                <Card className="border-gray-200">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-base text-gray-900">
                      <TrendingUp className="inline h-5 w-5 mr-2" />
                      Weight Progression Chart
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Line
                      data={chartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        interaction: { mode: 'index', intersect: false },
                        plugins: {
                          legend: { display: true, position: 'top' },
                          tooltip: { enabled: true },
                        },
                        scales: {
                          x: {
                            title: { display: true, text: 'Pregnancy Week' },
                            ticks: { maxTicksLimit: 10 },
                          },
                          y: {
                            title: { display: true, text: `Weight (${weightUnit})` },
                          },
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Milestones */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">🎯 Weight Milestones</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {result.milestones.map((milestone) => (
                      <div
                        key={milestone.week}
                        className={`p-3 rounded-lg border text-center ${
                          parseInt(currentWeek) >= milestone.week
                            ? 'bg-blue-50 border-blue-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <p className="text-xs text-gray-600 mb-1">Week {milestone.week}</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {milestone.minWeight.toFixed(1)}-{milestone.maxWeight.toFixed(1)}
                        </p>
                        <p className="text-xs text-gray-500">{weightUnit}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">💡 Trimester {result.trimester} Guidance</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">🍽️ Nutrition</h4>
                      <ul className="space-y-2">
                        {result.recommendations.nutrition.map((tip, idx) => (
                          <li key={idx} className="text-sm text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-600">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">💪 Exercise</h4>
                      <ul className="space-y-2">
                        {result.recommendations.exercise.map((tip, idx) => (
                          <li key={idx} className="text-sm text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-green-600">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {result.recommendations.warnings.length > 0 && (
                    <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2">⚠️ Important Notices</h4>
                      <ul className="space-y-1">
                        {result.recommendations.warnings.map((warning, idx) => (
                          <li key={idx} className="text-sm text-red-800">
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                <p className="text-sm mt-2">Track your pregnancy weight gain progress!</p>
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
        calculatorName="Pregnancy Weight Gain Calculator"
      />
    </div>
  );
}

