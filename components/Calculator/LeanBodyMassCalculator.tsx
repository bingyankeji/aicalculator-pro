'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Share2, Printer, TrendingUp, Activity } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

interface LeanBodyMassInputs {
  gender: 'male' | 'female';
  weight: string;
  weightUnit: 'kg' | 'lbs';
  height: string;
  heightUnit: 'cm' | 'in';
  waist: string;
  hip: string;
  neck: string;
  measurementUnit: 'cm' | 'in';
}

interface LeanBodyMassResult {
  lbmBoer: number;
  lbmJames: number;
  lbmHume: number;
  averageLbm: number;
  bodyFatPercentage: number;
  fatMass: number;
  musclePercentage: number;
  bmi: number;
  idealWeightMin: number;
  idealWeightMax: number;
  rating: string;
  recommendations: string[];
}

export default function LeanBodyMassCalculator() {
  const [inputs, setInputs] = useState<LeanBodyMassInputs>({
    gender: 'male',
    weight: '75',
    weightUnit: 'kg',
    height: '175',
    heightUnit: 'cm',
    waist: '85',
    hip: '95',
    neck: '38',
    measurementUnit: 'cm',
  });

  const [result, setResult] = useState<LeanBodyMassResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/lean-body-mass-calculator',
    getShareParams: () => ({
      g: inputs.gender === 'male' ? 'm' : 'f',
      w: inputs.weight,
      wu: inputs.weightUnit,
      h: inputs.height,
      hu: inputs.heightUnit,
    }),
    getShareText: () => {
      if (result) {
        return `My lean body mass is ${result.averageLbm.toFixed(1)} ${inputs.weightUnit} with ${result.bodyFatPercentage.toFixed(1)}% body fat. Calculate yours!`;
      }
      return 'Calculate your lean body mass and body composition with multiple formulas!';
    },
  });

  const handleInputChange = (field: keyof LeanBodyMassInputs, value: string | 'male' | 'female' | 'kg' | 'lbs' | 'cm' | 'in') => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const convertToMetric = (value: number, fromUnit: string, toUnit: string): number => {
    if (fromUnit === toUnit) return value;
    
    if (fromUnit === 'lbs' && toUnit === 'kg') return value * 0.453592;
    if (fromUnit === 'kg' && toUnit === 'lbs') return value * 2.20462;
    if (fromUnit === 'in' && toUnit === 'cm') return value * 2.54;
    if (fromUnit === 'cm' && toUnit === 'in') return value / 2.54;
    
    return value;
  };

  const calculateBodyFat = (
    gender: string,
    weight: number,
    height: number,
    waist: number,
    hip: number,
    neck: number
  ): number => {
    // U.S. Navy method for body fat percentage
    if (gender === 'male') {
      return (
        495 /
          (1.0324 -
            0.19077 * Math.log10(waist - neck) +
            0.15456 * Math.log10(height)) -
        450
      );
    } else {
      return (
        495 /
          (1.29579 -
            0.35004 * Math.log10(waist + hip - neck) +
            0.221 * Math.log10(height)) -
        450
      );
    }
  };

  const calculate = () => {
    const weight = parseFloat(inputs.weight);
    const height = parseFloat(inputs.height);
    const waist = parseFloat(inputs.waist);
    const hip = parseFloat(inputs.hip);
    const neck = parseFloat(inputs.neck);

    if (!weight || !height || !waist || !neck || (inputs.gender === 'female' && !hip)) {
      alert('Please fill in all required fields with valid values.');
      return;
    }

    // Convert all measurements to metric for calculations
    const weightKg = convertToMetric(weight, inputs.weightUnit, 'kg');
    const heightCm = convertToMetric(height, inputs.heightUnit, 'cm');
    const waistCm = convertToMetric(waist, inputs.measurementUnit, 'cm');
    const hipCm = convertToMetric(hip, inputs.measurementUnit, 'cm');
    const neckCm = convertToMetric(neck, inputs.measurementUnit, 'cm');

    // Calculate LBM using different formulas
    
    // Boer Formula
    const lbmBoer =
      inputs.gender === 'male'
        ? 0.407 * weightKg + 0.267 * heightCm - 19.2
        : 0.252 * weightKg + 0.473 * heightCm - 48.3;

    // James Formula
    const heightM = heightCm / 100;
    const lbmJames =
      inputs.gender === 'male'
        ? 1.1 * weightKg - 128 * Math.pow(weightKg / heightM / heightM, 2)
        : 1.07 * weightKg - 148 * Math.pow(weightKg / heightM / heightM, 2);

    // Hume Formula
    const lbmHume =
      inputs.gender === 'male'
        ? 0.3281 * weightKg + 0.33929 * heightCm - 29.5336
        : 0.29569 * weightKg + 0.41813 * heightCm - 43.2933;

    // Average LBM
    const averageLbm = (lbmBoer + lbmJames + lbmHume) / 3;

    // Calculate body fat percentage using U.S. Navy method
    const bodyFatPercentage = calculateBodyFat(
      inputs.gender,
      weightKg,
      heightCm,
      waistCm,
      hipCm,
      neckCm
    );

    // Calculate fat mass
    const fatMass = weightKg * (bodyFatPercentage / 100);

    // Calculate muscle percentage (approximate)
    const musclePercentage = (averageLbm / weightKg) * 100;

    // Calculate BMI
    const bmi = weightKg / Math.pow(heightM, 2);

    // Calculate ideal weight range (based on BMI 18.5-24.9)
    const idealWeightMin = 18.5 * Math.pow(heightM, 2);
    const idealWeightMax = 24.9 * Math.pow(heightM, 2);

    // Determine rating
    let rating = '';
    if (inputs.gender === 'male') {
      if (bodyFatPercentage < 6) rating = 'Essential Fat';
      else if (bodyFatPercentage < 14) rating = 'Excellent (Athletes)';
      else if (bodyFatPercentage < 18) rating = 'Good (Fitness)';
      else if (bodyFatPercentage < 25) rating = 'Average (Acceptable)';
      else rating = 'Needs Improvement';
    } else {
      if (bodyFatPercentage < 14) rating = 'Essential Fat';
      else if (bodyFatPercentage < 21) rating = 'Excellent (Athletes)';
      else if (bodyFatPercentage < 25) rating = 'Good (Fitness)';
      else if (bodyFatPercentage < 32) rating = 'Average (Acceptable)';
      else rating = 'Needs Improvement';
    }

    // Generate recommendations
    const recommendations: string[] = [];

    if (rating === 'Needs Improvement') {
      recommendations.push(
        'Consider a structured exercise program combining cardio and strength training.'
      );
      recommendations.push('Focus on a balanced diet with adequate protein intake (1.6-2.2g per kg of body weight).');
      recommendations.push('Consult with a healthcare provider or registered dietitian for personalized guidance.');
    } else if (rating === 'Average (Acceptable)') {
      recommendations.push('Maintain regular physical activity (150 minutes per week of moderate exercise).');
      recommendations.push('Include strength training 2-3 times per week to maintain muscle mass.');
      recommendations.push('Monitor your body composition regularly to track progress.');
    } else if (rating.includes('Good') || rating.includes('Excellent')) {
      recommendations.push('Great work! Continue your current fitness routine.');
      recommendations.push('Focus on progressive overload in strength training to build lean muscle.');
      recommendations.push('Ensure adequate recovery time between intense workouts.');
    } else if (rating === 'Essential Fat') {
      recommendations.push(
        '⚠️ Your body fat percentage is very low. This may affect hormone function and health.'
      );
      recommendations.push('Consult with a healthcare provider to ensure this is healthy for you.');
      recommendations.push('Consider increasing caloric intake if maintaining this level is challenging.');
    }

    // Convert results to display unit if needed
    const displayUnit = inputs.weightUnit;
    const avgLbmDisplay = convertToMetric(averageLbm, 'kg', displayUnit);
    const fatMassDisplay = convertToMetric(fatMass, 'kg', displayUnit);
    const idealMinDisplay = convertToMetric(idealWeightMin, 'kg', displayUnit);
    const idealMaxDisplay = convertToMetric(idealWeightMax, 'kg', displayUnit);

    setResult({
      lbmBoer: convertToMetric(lbmBoer, 'kg', displayUnit),
      lbmJames: convertToMetric(lbmJames, 'kg', displayUnit),
      lbmHume: convertToMetric(lbmHume, 'kg', displayUnit),
      averageLbm: avgLbmDisplay,
      bodyFatPercentage,
      fatMass: fatMassDisplay,
      musclePercentage,
      bmi,
      idealWeightMin: idealMinDisplay,
      idealWeightMax: idealMaxDisplay,
      rating,
      recommendations,
    });
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.download = `lean-body-mass-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

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
              <title>Lean Body Mass Analysis Results</title>
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

  // Prepare pie chart data
  const pieData = result
    ? [
        { name: 'Lean Body Mass', value: result.averageLbm, color: '#3b82f6' },
        { name: 'Body Fat', value: result.fatMass, color: '#f59e0b' },
      ]
    : [];

  // Prepare comparison chart data
  const comparisonData = result
    ? [
        { formula: 'Boer', value: result.lbmBoer },
        { formula: 'James', value: result.lbmJames },
        { formula: 'Hume', value: result.lbmHume },
        { formula: 'Average', value: result.averageLbm },
      ]
    : [];

  const getRatingColor = (rating: string) => {
    if (rating.includes('Excellent')) return 'text-green-700 bg-green-50 border-green-200';
    if (rating.includes('Good')) return 'text-blue-700 bg-blue-50 border-blue-200';
    if (rating.includes('Average')) return 'text-amber-700 bg-amber-50 border-amber-200';
    if (rating.includes('Essential')) return 'text-purple-700 bg-purple-50 border-purple-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleInputChange('gender', 'male')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                      inputs.gender === 'male'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => handleInputChange('gender', 'female')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                      inputs.gender === 'female'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
                  Weight <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={inputs.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="75"
                    required
                  />
                  <select
                    value={inputs.weightUnit}
                    onChange={(e) => handleInputChange('weightUnit', e.target.value as 'kg' | 'lbs')}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="text-sm font-medium text-gray-700">
                  Height <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    id="height"
                    type="number"
                    step="0.1"
                    value={inputs.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="175"
                    required
                  />
                  <select
                    value={inputs.heightUnit}
                    onChange={(e) => handleInputChange('heightUnit', e.target.value as 'cm' | 'in')}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="cm">cm</option>
                    <option value="in">in</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Body Measurements</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="flex justify-end mb-2">
                <select
                  value={inputs.measurementUnit}
                  onChange={(e) => handleInputChange('measurementUnit', e.target.value as 'cm' | 'in')}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="cm">Centimeters (cm)</option>
                  <option value="in">Inches (in)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="waist" className="text-sm font-medium text-gray-700">
                  Waist Circumference <span className="text-red-500">*</span>
                </Label>
                <input
                  id="waist"
                  type="number"
                  step="0.1"
                  value={inputs.waist}
                  onChange={(e) => handleInputChange('waist', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="85"
                  required
                />
                <p className="text-xs text-gray-500">Measure at navel level</p>
              </div>

              {inputs.gender === 'female' && (
                <div className="space-y-2">
                  <Label htmlFor="hip" className="text-sm font-medium text-gray-700">
                    Hip Circumference <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="hip"
                    type="number"
                    step="0.1"
                    value={inputs.hip}
                    onChange={(e) => handleInputChange('hip', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="95"
                    required
                  />
                  <p className="text-xs text-gray-500">Measure at widest point</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="neck" className="text-sm font-medium text-gray-700">
                  Neck Circumference <span className="text-red-500">*</span>
                </Label>
                <input
                  id="neck"
                  type="number"
                  step="0.1"
                  value={inputs.neck}
                  onChange={(e) => handleInputChange('neck', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="38"
                  required
                />
                <p className="text-xs text-gray-500">Measure below Adam's apple</p>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Body Composition
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          <div className="space-y-6">
            {result ? (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                    <CardContent className="p-6">
                      <p className="text-sm text-blue-600 font-medium mb-1">Lean Body Mass</p>
                      <p className="text-3xl sm:text-4xl font-bold text-blue-700 break-all">
                        {result.averageLbm.toFixed(1)} {inputs.weightUnit}
                      </p>
                      <p className="text-xs text-blue-600 mt-2">
                        {result.musclePercentage.toFixed(1)}% of body weight
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200">
                    <CardContent className="p-6">
                      <p className="text-sm text-amber-600 font-medium mb-1">Body Fat</p>
                      <p className="text-3xl sm:text-4xl font-bold text-amber-700 break-all">
                        {result.bodyFatPercentage.toFixed(1)}%
                      </p>
                      <p className="text-xs text-amber-600 mt-2">
                        {result.fatMass.toFixed(1)} {inputs.weightUnit} fat mass
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                    <CardContent className="p-6">
                      <p className="text-sm text-green-600 font-medium mb-1">BMI</p>
                      <p className="text-3xl sm:text-4xl font-bold text-green-700">
                        {result.bmi.toFixed(1)}
                      </p>
                      <p className="text-xs text-green-600 mt-2">
                        {result.bmi < 18.5
                          ? 'Underweight'
                          : result.bmi < 25
                          ? 'Normal'
                          : result.bmi < 30
                          ? 'Overweight'
                          : 'Obese'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`shadow-lg border-2 ${getRatingColor(result.rating)}`}
                  >
                    <CardContent className="p-6">
                      <p className="text-sm font-medium mb-1">Health Rating</p>
                      <p className="text-2xl sm:text-3xl font-bold break-words">
                        {result.rating}
                      </p>
                      <p className="text-xs mt-2">Based on body fat %</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Body Composition Pie Chart */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">
                      🎨 Body Composition Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300} minHeight={250}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(1)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) =>
                            `${value.toFixed(1)} ${inputs.weightUnit}`
                          }
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Formula Comparison Chart */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">
                      📊 Formula Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300} minHeight={250}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="formula"
                          stroke="#6b7280"
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis
                          stroke="#6b7280"
                          tick={{ fontSize: 12 }}
                          label={{
                            value: `LBM (${inputs.weightUnit})`,
                            angle: -90,
                            position: 'insideLeft',
                          }}
                        />
                        <Tooltip
                          formatter={(value: number) =>
                            `${value.toFixed(1)} ${inputs.weightUnit}`
                          }
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 text-sm text-gray-600 space-y-1">
                      <p>
                        • <strong>Boer Formula:</strong> Based on weight and height (most
                        commonly used)
                      </p>
                      <p>
                        • <strong>James Formula:</strong> Considers BMI in calculation
                      </p>
                      <p>
                        • <strong>Hume Formula:</strong> Alternative weight-height method
                      </p>
                      <p>
                        • <strong>Average:</strong> Mean of all three formulas for accuracy
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Ideal Weight Range */}
                <Card className="shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Ideal Weight Range
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Minimum (BMI 18.5)</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {result.idealWeightMin.toFixed(1)} {inputs.weightUnit}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Maximum (BMI 24.9)</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {result.idealWeightMax.toFixed(1)} {inputs.weightUnit}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Based on healthy BMI range for your height
                    </p>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="shadow-lg border-2 border-blue-200 bg-blue-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
                      💡 Personalized Recommendations
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Body Fat Categories */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">
                      📋 Body Fat Percentage Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto overflow-y-hidden">
                      <table className="w-full min-w-[400px] text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-300">
                            <th className="px-2 sm:px-4 py-3 text-left font-semibold text-gray-900">
                              Category
                            </th>
                            <th className="px-2 sm:px-4 py-3 text-center font-semibold text-gray-900">
                              Men
                            </th>
                            <th className="px-2 sm:px-4 py-3 text-center font-semibold text-gray-900">
                              Women
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200 hover:bg-blue-50">
                            <td className="px-2 sm:px-4 py-3 text-gray-900 font-medium">
                              Essential Fat
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center text-gray-700">
                              2-5%
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center text-gray-700">
                              10-13%
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-blue-50">
                            <td className="px-2 sm:px-4 py-3 text-gray-900 font-medium">
                              Athletes
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center text-gray-700">
                              6-13%
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center text-gray-700">
                              14-20%
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-blue-50">
                            <td className="px-2 sm:px-4 py-3 text-gray-900 font-medium">
                              Fitness
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center text-gray-700">
                              14-17%
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center text-gray-700">
                              21-24%
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-blue-50">
                            <td className="px-2 sm:px-4 py-3 text-gray-900 font-medium">
                              Acceptable
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center text-gray-700">
                              18-24%
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center text-gray-700">
                              25-31%
                            </td>
                          </tr>
                          <tr className="hover:bg-blue-50">
                            <td className="px-2 sm:px-4 py-3 text-gray-900 font-medium">
                              Obese
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center text-gray-700">
                              25%+
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center text-gray-700">
                              32%+
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Important Note */}
                <Card className="shadow-lg border-2 border-amber-200 bg-amber-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
                      ⚠️ Important Notes
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>Accuracy:</strong> Body composition calculations are estimates
                        based on formulas. For most accurate results, consider DEXA scans,
                        hydrostatic weighing, or bioelectrical impedance analysis.
                      </p>
                      <p>
                        <strong>Variations:</strong> Body fat distribution, bone density, and
                        muscle mass vary significantly among individuals of the same height and
                        weight.
                      </p>
                      <p>
                        <strong>Health Context:</strong> These measurements should be considered
                        alongside other health markers. Consult healthcare professionals for
                        comprehensive health assessment.
                      </p>
                      <p>
                        <strong>Athletic Populations:</strong> Athletes, especially bodybuilders
                        and strength athletes, may have higher muscle mass and require
                        specialized assessment methods.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Results</CardTitle>
                </CardHeader>
                <CardContent className="p-12">
                  <div className="text-center text-gray-500">
                    <Activity className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">
                      Enter your measurements and click "Calculate Body Composition" to see
                      results
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {result && (
        <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
          <Button onClick={handleSaveAsImage} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Save as Image
          </Button>

          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print Results
          </Button>

          <Button onClick={handleShare} variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Calculator
          </Button>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Lean Body Mass Calculator"
      />
    </div>
  );
}

