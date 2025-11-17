'use client';

import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Activity, TrendingUp, Info, Award } from 'lucide-react';

type TestMethod = 'cooper' | 'mile' | 'rockport' | 'harvard';
type Gender = 'male' | 'female';
type FitnessLevel = 'poor' | 'fair' | 'good' | 'excellent' | 'superior';

interface VO2MaxInputs {
  testMethod: TestMethod;
  age: string;
  gender: Gender;
  weight: string; // kg
  
  // Cooper 12-minute test
  distance12min: string; // meters
  
  // 1.5 mile test
  time15mile: string; // minutes
  
  // Rockport walk test
  walkTime: string; // minutes
  walkHeartRate: string; // bpm
  
  // Harvard step test
  recoveryHeartRate: string; // bpm
}

interface VO2MaxResult {
  vo2max: number;
  fitnessLevel: FitnessLevel;
  fitnessLabel: string;
  percentile: number;
  athleteComparison: string;
  healthRisk: string;
  recommendations: string[];
  improvements: {
    trainingPlan: string;
    expectedGain: string;
    timeframe: string;
  };
}

export default function VO2MaxCalculator() {
  const [inputs, setInputs] = useState<VO2MaxInputs>({
    testMethod: 'cooper',
    age: '',
    gender: 'male',
    weight: '',
    distance12min: '',
    time15mile: '',
    walkTime: '',
    walkHeartRate: '',
    recoveryHeartRate: '',
  });

  const [result, setResult] = useState<VO2MaxResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Load data from URL parameters
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const t = params.get('t'); // test method
    const a = params.get('a'); // age
    const g = params.get('g'); // gender
    const w = params.get('w'); // weight
    const d = params.get('d'); // distance/time data

    if (t && a && g && w && d) {
      const newInputs: VO2MaxInputs = {
        testMethod: (t as TestMethod) || 'cooper',
        age: a,
        gender: (g === 'f' ? 'female' : 'male'),
        weight: w,
        distance12min: t === 'cooper' ? d : '',
        time15mile: t === 'mile' ? d : '',
        walkTime: t === 'rockport' ? d.split(',')[0] : '',
        walkHeartRate: t === 'rockport' ? d.split(',')[1] : '',
        recoveryHeartRate: t === 'harvard' ? d : '',
      };
      setInputs(newInputs);
      
      setTimeout(() => {
        calculateVO2Max(newInputs);
      }, 100);
    }
  }, []);

  const handleInputChange = (field: keyof VO2MaxInputs, value: string | TestMethod | Gender) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    const age = parseFloat(inputs.age);
    const weight = parseFloat(inputs.weight);

    if (!inputs.age || isNaN(age) || age < 10 || age > 100) {
      newErrors.age = 'Please enter a valid age between 10 and 100';
    }

    if (!inputs.weight || isNaN(weight) || weight < 20 || weight > 300) {
      newErrors.weight = 'Please enter a valid weight between 20 and 300 kg';
    }

    // Validate based on test method
    switch (inputs.testMethod) {
      case 'cooper':
        const distance = parseFloat(inputs.distance12min);
        if (!inputs.distance12min || isNaN(distance) || distance < 500 || distance > 5000) {
          newErrors.distance12min = 'Please enter a valid distance between 500 and 5000 meters';
        }
        break;
      case 'mile':
        const time = parseFloat(inputs.time15mile);
        if (!inputs.time15mile || isNaN(time) || time < 5 || time > 30) {
          newErrors.time15mile = 'Please enter a valid time between 5 and 30 minutes';
        }
        break;
      case 'rockport':
        const walkTime = parseFloat(inputs.walkTime);
        const walkHR = parseFloat(inputs.walkHeartRate);
        if (!inputs.walkTime || isNaN(walkTime) || walkTime < 5 || walkTime > 30) {
          newErrors.walkTime = 'Please enter a valid walk time between 5 and 30 minutes';
        }
        if (!inputs.walkHeartRate || isNaN(walkHR) || walkHR < 60 || walkHR > 200) {
          newErrors.walkHeartRate = 'Please enter a valid heart rate between 60 and 200 bpm';
        }
        break;
      case 'harvard':
        const recoveryHR = parseFloat(inputs.recoveryHeartRate);
        if (!inputs.recoveryHeartRate || isNaN(recoveryHR) || recoveryHR < 40 || recoveryHR > 200) {
          newErrors.recoveryHeartRate = 'Please enter a valid recovery heart rate between 40 and 200 bpm';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateVO2Max = (inputData?: VO2MaxInputs) => {
    const data = inputData || inputs;
    
    if (!validate() && !inputData) return;

    const age = parseFloat(data.age);
    const weight = parseFloat(data.weight);
    let vo2max = 0;

    // Calculate VO2 Max based on test method
    switch (data.testMethod) {
      case 'cooper':
        // Cooper Formula: VO2max = (Distance in meters - 504.9) / 44.73
        const distance = parseFloat(data.distance12min);
        vo2max = (distance - 504.9) / 44.73;
        break;
        
      case 'mile':
        // 1.5 Mile Run Formula: VO2max = 483 / time + 3.5
        const time = parseFloat(data.time15mile);
        vo2max = (483 / time) + 3.5;
        break;
        
      case 'rockport':
        // Rockport Walk Test Formula
        const walkTime = parseFloat(data.walkTime);
        const walkHR = parseFloat(data.walkHeartRate);
        const genderFactor = data.gender === 'male' ? 1 : 0;
        vo2max = 132.853 
          - (0.0769 * weight) 
          - (0.3877 * age) 
          + (6.315 * genderFactor) 
          - (3.2649 * walkTime) 
          - (0.1565 * walkHR);
        break;
        
      case 'harvard':
        // Harvard Step Test (simplified estimation)
        const recoveryHR = parseFloat(data.recoveryHeartRate);
        // Lower recovery HR = better fitness
        vo2max = 111 - (0.42 * recoveryHR);
        break;
    }

    // Round to 1 decimal
    vo2max = Math.round(vo2max * 10) / 10;

    // Determine fitness level based on age and gender
    const fitnessLevel = getFitnessLevel(vo2max, age, data.gender);
    const percentile = getPercentile(vo2max, age, data.gender);

    const resultData: VO2MaxResult = {
      vo2max,
      fitnessLevel: fitnessLevel.level,
      fitnessLabel: fitnessLevel.label,
      percentile,
      athleteComparison: getAthleteComparison(vo2max),
      healthRisk: getHealthRisk(fitnessLevel.level),
      recommendations: getRecommendations(fitnessLevel.level, age),
      improvements: getImprovementPlan(fitnessLevel.level),
    };

    setResult(resultData);
  };

  const getFitnessLevel = (vo2max: number, age: number, gender: Gender): { level: FitnessLevel; label: string } => {
    // Fitness level standards based on age and gender
    // Source: American Heart Association / Cooper Institute
    
    const standards = {
      male: {
        '20-29': { poor: 0, fair: 42, good: 47, excellent: 52, superior: 56 },
        '30-39': { poor: 0, fair: 40, good: 44, excellent: 48, superior: 53 },
        '40-49': { poor: 0, fair: 37, good: 42, excellent: 46, superior: 51 },
        '50-59': { poor: 0, fair: 35, good: 39, excellent: 43, superior: 48 },
        '60+': { poor: 0, fair: 31, good: 35, excellent: 40, superior: 44 },
      },
      female: {
        '20-29': { poor: 0, fair: 34, good: 38, excellent: 43, superior: 49 },
        '30-39': { poor: 0, fair: 32, good: 36, excellent: 41, superior: 45 },
        '40-49': { poor: 0, fair: 30, good: 34, excellent: 38, superior: 43 },
        '50-59': { poor: 0, fair: 27, good: 31, excellent: 35, superior: 40 },
        '60+': { poor: 0, fair: 25, good: 29, excellent: 32, superior: 37 },
      },
    };

    const ageGroup = age < 30 ? '20-29' : age < 40 ? '30-39' : age < 50 ? '40-49' : age < 60 ? '50-59' : '60+';
    const ranges = standards[gender][ageGroup];

    if (vo2max >= ranges.superior) {
      return { level: 'superior', label: 'Superior' };
    } else if (vo2max >= ranges.excellent) {
      return { level: 'excellent', label: 'Excellent' };
    } else if (vo2max >= ranges.good) {
      return { level: 'good', label: 'Good' };
    } else if (vo2max >= ranges.fair) {
      return { level: 'fair', label: 'Fair' };
    } else {
      return { level: 'poor', label: 'Poor' };
    }
  };

  const getPercentile = (vo2max: number, age: number, gender: Gender): number => {
    // Simplified percentile calculation
    const ageGroup = age < 30 ? '20-29' : age < 40 ? '30-39' : age < 50 ? '40-49' : age < 60 ? '50-59' : '60+';
    
    const averages = {
      male: { '20-29': 45, '30-39': 42, '40-49': 40, '50-59': 37, '60+': 33 },
      female: { '20-29': 36, '30-39': 34, '40-49': 32, '50-59': 29, '60+': 27 },
    };

    const avg = averages[gender][ageGroup];
    const diff = vo2max - avg;
    
    // Rough percentile estimation
    let percentile = 50 + (diff * 3);
    percentile = Math.max(5, Math.min(95, percentile));
    
    return Math.round(percentile);
  };

  const getAthleteComparison = (vo2max: number): string => {
    if (vo2max >= 70) {
      return 'Elite endurance athlete level (e.g., Olympic distance runners, Tour de France cyclists)';
    } else if (vo2max >= 60) {
      return 'Competitive endurance athlete level (e.g., college cross-country runners, serious marathoners)';
    } else if (vo2max >= 50) {
      return 'Recreational athlete level with consistent training (e.g., regular runners, triathletes)';
    } else if (vo2max >= 40) {
      return 'Active individual with moderate fitness (e.g., casual joggers, gym-goers)';
    } else if (vo2max >= 30) {
      return 'Below average fitness - limited regular physical activity';
    } else {
      return 'Sedentary lifestyle - significant room for improvement';
    }
  };

  const getHealthRisk = (level: FitnessLevel): string => {
    const risks = {
      superior: 'Very low risk of cardiovascular disease. Excellent heart health and longevity indicators.',
      excellent: 'Low risk of cardiovascular disease. Very good heart health and metabolic function.',
      good: 'Moderate-low risk. Good cardiovascular health with room for improvement.',
      fair: 'Moderate risk. Should focus on improving cardiovascular fitness to reduce health risks.',
      poor: 'Higher risk of cardiovascular disease, obesity, and metabolic syndrome. Prioritize fitness improvement.',
    };
    return risks[level];
  };

  const getRecommendations = (level: FitnessLevel, age: number): string[] => {
    const baseRecommendations = {
      superior: [
        'Maintain current training regimen with periodized high-intensity intervals',
        'Focus on injury prevention and recovery optimization',
        'Consider sport-specific training to maximize performance',
        'Monitor training load to avoid overtraining',
      ],
      excellent: [
        'Continue consistent aerobic training 4-5 times per week',
        'Add 1-2 high-intensity interval sessions per week',
        'Incorporate strength training to support aerobic capacity',
        'Set challenging fitness goals (races, endurance events)',
      ],
      good: [
        'Increase training frequency to 4-5 times per week',
        'Mix moderate intensity (60-70% max HR) and vigorous (70-85% max HR) exercise',
        'Add interval training once per week',
        'Consider joining running or cycling groups for motivation',
      ],
      fair: [
        'Start with 3-4 aerobic sessions per week, 30-45 minutes each',
        'Begin at moderate intensity and gradually increase',
        'Focus on consistency over intensity initially',
        'Consider activities you enjoy: cycling, swimming, brisk walking',
      ],
      poor: [
        'Consult with healthcare provider before starting exercise program',
        'Start with 20-30 minutes of low-intensity activity 3 times per week',
        'Gradually increase duration before increasing intensity',
        'Focus on building an exercise habit and enjoy the process',
      ],
    };

    const recommendations = [...baseRecommendations[level]];
    
    if (age > 50) {
      recommendations.push('Include flexibility and balance training to prevent falls');
    }

    return recommendations;
  };

  const getImprovementPlan = (level: FitnessLevel): { trainingPlan: string; expectedGain: string; timeframe: string } => {
    const plans = {
      superior: {
        trainingPlan: 'Periodized high-intensity training with adequate recovery. Focus on sport-specific performance.',
        expectedGain: '2-3 ml/kg/min improvement possible with optimized training',
        timeframe: '6-12 months of structured training',
      },
      excellent: {
        trainingPlan: '4-5 days/week: 3 moderate aerobic + 1-2 high-intensity interval sessions',
        expectedGain: '3-5 ml/kg/min improvement with consistent training',
        timeframe: '4-6 months of progressive training',
      },
      good: {
        trainingPlan: '4-5 days/week: Mix of moderate (30-45 min) and vigorous (20-30 min) sessions',
        expectedGain: '5-7 ml/kg/min improvement achievable',
        timeframe: '3-6 months of regular training',
      },
      fair: {
        trainingPlan: '3-4 days/week: Start with 30 minutes moderate intensity, progress gradually',
        expectedGain: '7-10 ml/kg/min improvement possible',
        timeframe: '3-6 months of consistent training',
      },
      poor: {
        trainingPlan: 'Begin with 20-30 minutes low-intensity, 3x/week. Build to 150 min/week moderate activity.',
        expectedGain: '10-15 ml/kg/min improvement achievable with dedication',
        timeframe: '6-12 months of progressive training',
      },
    };

    return plans[level];
  };

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    
    let dataParam = '';
    switch (inputs.testMethod) {
      case 'cooper':
        dataParam = inputs.distance12min;
        break;
      case 'mile':
        dataParam = inputs.time15mile;
        break;
      case 'rockport':
        dataParam = `${inputs.walkTime},${inputs.walkHeartRate}`;
        break;
      case 'harvard':
        dataParam = inputs.recoveryHeartRate;
        break;
    }
    
    const params = new URLSearchParams({
      t: inputs.testMethod,
      a: inputs.age,
      g: inputs.gender === 'female' ? 'f' : 'm',
      w: inputs.weight,
      d: dataParam,
    });
    
    const url = `${baseUrl}/vo2-max-calculator?${params.toString()}`;
    setShareUrl(url);
    setShowShareModal(true);
    setCopySuccess(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy link. Please copy manually.');
    }
  };

  const handleSocialShare = (platform: 'facebook' | 'twitter' | 'whatsapp' | 'email') => {
    const text = `Check out my VO2 Max: ${result?.vo2max} ml/kg/min - ${result?.fitnessLabel} fitness level`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent('My VO2 Max Results')}&body=${encodedText}%20${encodedUrl}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `vo2max-results-${new Date().toISOString().split('T')[0]}.png`;
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
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const imageUrl = canvas.toDataURL('image/png', 1.0);
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>VO2 Max Test Results</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="VO2 Max Test Results" /></body>
          </html>
        `);
        printWindow.document.close();
        
        const img = printWindow.document.querySelector('img');
        if (img) {
          img.onload = () => {
            setTimeout(() => printWindow.print(), 250);
          };
        }
      }
    } catch (error) {
      console.error('Error printing:', error);
      alert('Failed to print. Please try again.');
    }
  };

  const getFitnessLevelColor = (level: FitnessLevel) => {
    const colors = {
      poor: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-900', gradient: 'from-red-50 to-red-100' },
      fair: { bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-900', gradient: 'from-orange-50 to-orange-100' },
      good: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-900', gradient: 'from-yellow-50 to-yellow-100' },
      excellent: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-900', gradient: 'from-green-50 to-green-100' },
      superior: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-900', gradient: 'from-blue-50 to-blue-100' },
    };
    return colors[level];
  };

  const getTestMethodLabel = (method: TestMethod) => {
    const labels = {
      cooper: 'Cooper 12-Minute Run Test',
      mile: '1.5 Mile Run Test',
      rockport: 'Rockport Walk Test',
      harvard: 'Harvard Step Test',
    };
    return labels[method];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Test Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Test Method */}
              <div className="space-y-2">
                <Label htmlFor="testMethod" className="text-sm font-medium">
                  Test Method <span className="text-red-500">*</span>
                </Label>
                <select
                  id="testMethod"
                  value={inputs.testMethod}
                  onChange={(e) => handleInputChange('testMethod', e.target.value as TestMethod)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="cooper">Cooper 12-Minute Run</option>
                  <option value="mile">1.5 Mile Run</option>
                  <option value="rockport">Rockport Walk Test</option>
                  <option value="harvard">Harvard Step Test</option>
                </select>
                <p className="text-xs text-gray-500">
                  Choose the test method you performed
                </p>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">
                  Age (years) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="age"
                  type="number"
                  value={inputs.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="30"
                  min="10"
                  max="100"
                />
                {errors.age && (
                  <p className="text-sm text-red-600">{errors.age}</p>
                )}
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={inputs.gender === 'male'}
                      onChange={(e) => handleInputChange('gender', e.target.value as Gender)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={inputs.gender === 'female'}
                      onChange={(e) => handleInputChange('gender', e.target.value as Gender)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">Female</span>
                  </label>
                </div>
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-medium">
                  Weight (kg) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="weight"
                  type="number"
                  value={inputs.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.weight ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="70"
                  min="20"
                  max="300"
                  step="0.1"
                />
                {errors.weight && (
                  <p className="text-sm text-red-600">{errors.weight}</p>
                )}
              </div>

              {/* Conditional Test-Specific Inputs */}
              {inputs.testMethod === 'cooper' && (
                <div className="space-y-2">
                  <Label htmlFor="distance12min" className="text-sm font-medium">
                    Distance in 12 Minutes (meters) <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="distance12min"
                    type="number"
                    value={inputs.distance12min}
                    onChange={(e) => handleInputChange('distance12min', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.distance12min ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="2400"
                    min="500"
                    max="5000"
                  />
                  {errors.distance12min && (
                    <p className="text-sm text-red-600">{errors.distance12min}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    How far you ran in 12 minutes
                  </p>
                </div>
              )}

              {inputs.testMethod === 'mile' && (
                <div className="space-y-2">
                  <Label htmlFor="time15mile" className="text-sm font-medium">
                    1.5 Mile Time (minutes) <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="time15mile"
                    type="number"
                    value={inputs.time15mile}
                    onChange={(e) => handleInputChange('time15mile', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.time15mile ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="12.5"
                    min="5"
                    max="30"
                    step="0.1"
                  />
                  {errors.time15mile && (
                    <p className="text-sm text-red-600">{errors.time15mile}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Time to complete 1.5 miles (2.4 km)
                  </p>
                </div>
              )}

              {inputs.testMethod === 'rockport' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="walkTime" className="text-sm font-medium">
                      1 Mile Walk Time (minutes) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="walkTime"
                      type="number"
                      value={inputs.walkTime}
                      onChange={(e) => handleInputChange('walkTime', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.walkTime ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="15"
                      min="5"
                      max="30"
                      step="0.1"
                    />
                    {errors.walkTime && (
                      <p className="text-sm text-red-600">{errors.walkTime}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="walkHeartRate" className="text-sm font-medium">
                      Heart Rate After Walk (bpm) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="walkHeartRate"
                      type="number"
                      value={inputs.walkHeartRate}
                      onChange={(e) => handleInputChange('walkHeartRate', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.walkHeartRate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="120"
                      min="60"
                      max="200"
                    />
                    {errors.walkHeartRate && (
                      <p className="text-sm text-red-600">{errors.walkHeartRate}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Immediately after completing the walk
                    </p>
                  </div>
                </>
              )}

              {inputs.testMethod === 'harvard' && (
                <div className="space-y-2">
                  <Label htmlFor="recoveryHeartRate" className="text-sm font-medium">
                    Recovery Heart Rate (bpm) <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="recoveryHeartRate"
                    type="number"
                    value={inputs.recoveryHeartRate}
                    onChange={(e) => handleInputChange('recoveryHeartRate', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.recoveryHeartRate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="100"
                    min="40"
                    max="200"
                  />
                  {errors.recoveryHeartRate && (
                    <p className="text-sm text-red-600">{errors.recoveryHeartRate}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    1 minute after stopping the step test
                  </p>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">Test Instructions:</p>
                    {inputs.testMethod === 'cooper' && (
                      <p className="text-xs">Run as far as possible in 12 minutes on a flat surface. Record the distance in meters.</p>
                    )}
                    {inputs.testMethod === 'mile' && (
                      <p className="text-xs">Run 1.5 miles (2.4 km) as fast as possible. Record your time in minutes.</p>
                    )}
                    {inputs.testMethod === 'rockport' && (
                      <p className="text-xs">Walk 1 mile (1.6 km) as fast as possible. Record time and heart rate immediately after.</p>
                    )}
                    {inputs.testMethod === 'harvard' && (
                      <p className="text-xs">Step up and down on a 20-inch platform for 5 minutes at 30 steps/min. Measure heart rate 1 minute after stopping.</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={() => calculateVO2Max()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate VO2 Max
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          {result ? (
            <div className="space-y-4 sm:space-y-6">
              {/* Export & Share Buttons */}
              <div className="flex gap-3 justify-end mb-4 flex-wrap">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md font-medium text-sm sm:text-base min-h-[44px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
                <button
                  onClick={handleSaveAsImage}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium text-sm sm:text-base min-h-[44px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Save as Image
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium text-sm sm:text-base min-h-[44px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
              </div>

              {/* Result Content */}
              <div ref={resultRef} className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg" style={{ width: '900px', maxWidth: '100%' }}>
                {/* Export Header */}
                <div className="border-b-2 border-gray-200 pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">VO2 Max Test Results</h2>
                  <p className="text-sm text-gray-600">
                    Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {inputs.gender === 'male' ? 'Male' : 'Female'}, Age {inputs.age} | Test: {getTestMethodLabel(inputs.testMethod)}
                  </p>
                </div>

                {/* VO2 Max Result Card */}
                <Card className={`shadow-lg border-2 ${getFitnessLevelColor(result.fitnessLevel).border}`}>
                  <CardHeader className={`bg-gradient-to-r ${getFitnessLevelColor(result.fitnessLevel).gradient}`}>
                    <CardTitle className={`flex items-center gap-2 ${getFitnessLevelColor(result.fitnessLevel).text}`}>
                      <TrendingUp className="h-6 w-6" />
                      Your VO2 Max
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-600 mb-2">VO2 Max Score</div>
                        <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">{result.vo2max}</div>
                        <div className="text-sm text-gray-600 mb-4">ml/kg/min</div>
                        <div className="flex items-center gap-3">
                          <Award className={`h-8 w-8 ${getFitnessLevelColor(result.fitnessLevel).text}`} />
                          <div>
                            <div className="text-xl font-bold text-gray-900">{result.fitnessLabel}</div>
                            <div className="text-sm text-gray-600">Fitness Level</div>
                          </div>
                        </div>
                      </div>
                      <div className={`${getFitnessLevelColor(result.fitnessLevel).bg} rounded-xl p-6 text-center`}>
                        <div className="text-sm font-medium text-gray-600 mb-2">Percentile Rank</div>
                        <div className={`text-5xl font-bold ${getFitnessLevelColor(result.fitnessLevel).text}`}>
                          {result.percentile}
                          <span className="text-2xl">th</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-2">For your age & gender</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Athlete Comparison */}
                <Card className="shadow-lg border-2 border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                    <CardTitle className="flex items-center gap-2 text-purple-900">
                      <Activity className="h-6 w-6" />
                      Athlete Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700">{result.athleteComparison}</p>
                  </CardContent>
                </Card>

                {/* Health Risk Assessment */}
                <Card className="shadow-lg border-2 border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="flex items-center gap-2 text-blue-900">
                      <Info className="h-6 w-6" />
                      Health Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700">{result.healthRisk}</p>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="shadow-lg border-2 border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardTitle className="flex items-center gap-2 text-green-900">
                      <TrendingUp className="h-6 w-6" />
                      Personalized Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-green-600 font-bold text-sm">{index + 1}</span>
                          </div>
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Improvement Plan */}
                <Card className="shadow-lg border-2 border-orange-200">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                    <CardTitle className="flex items-center gap-2 text-orange-900">
                      <Calculator className="h-6 w-6" />
                      Your Improvement Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Training Plan</h4>
                      <p className="text-gray-700">{result.improvements.trainingPlan}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4">
                        <h4 className="font-bold text-gray-900 mb-1">Expected Gain</h4>
                        <p className="text-sm text-gray-700">{result.improvements.expectedGain}</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4">
                        <h4 className="font-bold text-gray-900 mb-1">Timeframe</h4>
                        <p className="text-sm text-gray-700">{result.improvements.timeframe}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center text-gray-500">
                <Activity className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Enter your test results and click "Calculate VO2 Max" to see your cardiovascular fitness assessment</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Share Your Results</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-4 text-sm">
              Share your VO2 Max results with friends and training partners. They'll see your test data and can calculate their own VO2 Max.
            </p>

            {/* Copy Link */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Share Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    copySuccess
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copySuccess ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
              {copySuccess && (
                <p className="text-green-600 text-xs mt-2 font-medium">✓ Link copied to clipboard!</p>
              )}
            </div>

            {/* Social Share Buttons */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Share via</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors font-medium text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
                
                <button
                  onClick={() => handleSocialShare('twitter')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1A91DA] transition-colors font-medium text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </button>
                
                <button
                  onClick={() => handleSocialShare('whatsapp')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#22C55E] transition-colors font-medium text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </button>
                
                <button
                  onClick={() => handleSocialShare('email')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600">
                <strong className="text-blue-600">💡 Tip:</strong> The link will auto-fill your test data. Your friends can then perform the same test and compare results.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

