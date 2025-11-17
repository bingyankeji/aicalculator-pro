'use client';

import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Timer, Activity, TrendingUp, Flame, Info } from 'lucide-react';

type CalculationMode = 'pace' | 'time' | 'distance';
type DistanceUnit = 'km' | 'mi';
type PaceUnit = 'min/km' | 'min/mi';

interface RunningInputs {
  mode: CalculationMode;
  distance: string;
  distanceUnit: DistanceUnit;
  hours: string;
  minutes: string;
  seconds: string;
  paceMinutes: string;
  paceSeconds: string;
  paceUnit: PaceUnit;
  weight: string; // kg for calorie calculation
  age: string; // for recovery time
  gender: 'male' | 'female';
}

interface RunningResult {
  pace: {
    perKm: string;
    perMi: string;
  };
  speed: {
    kph: number;
    mph: number;
  };
  time: {
    hours: number;
    minutes: number;
    seconds: number;
    total: number; // in seconds
  };
  distance: {
    km: number;
    mi: number;
  };
  raceTimePredictions: {
    '5K': string;
    '10K': string;
    'Half Marathon': string;
    'Marathon': string;
  };
  trainingPaces: {
    easy: { perKm: string; perMi: string };
    tempo: { perKm: string; perMi: string };
    interval: { perKm: string; perMi: string };
    long: { perKm: string; perMi: string };
  };
  calories: number;
  recoveryDays: number;
  cadence: {
    recommended: number;
    range: string;
  };
  splitTimes: Array<{
    km: number;
    mi: number;
    time: string;
  }>;
}

export default function RunningCalculator() {
  const [inputs, setInputs] = useState<RunningInputs>({
    mode: 'pace',
    distance: '',
    distanceUnit: 'km',
    hours: '0',
    minutes: '',
    seconds: '',
    paceMinutes: '',
    paceSeconds: '',
    paceUnit: 'min/km',
    weight: '',
    age: '',
    gender: 'male',
  });

  const [result, setResult] = useState<RunningResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Load data from URL parameters
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const m = params.get('m'); // mode
    const d = params.get('d'); // distance
    const u = params.get('u'); // unit
    const t = params.get('t'); // time (seconds)
    const p = params.get('p'); // pace (seconds)

    if (m && d) {
      const newInputs: Partial<RunningInputs> = {
        mode: (m as CalculationMode) || 'pace',
        distance: d,
        distanceUnit: (u as DistanceUnit) || 'km',
      };

      if (t) {
        const totalSeconds = parseInt(t);
        newInputs.hours = Math.floor(totalSeconds / 3600).toString();
        newInputs.minutes = Math.floor((totalSeconds % 3600) / 60).toString();
        newInputs.seconds = (totalSeconds % 60).toString();
      }

      if (p) {
        const paceSeconds = parseInt(p);
        newInputs.paceMinutes = Math.floor(paceSeconds / 60).toString();
        newInputs.paceSeconds = (paceSeconds % 60).toString();
      }

      setInputs(prev => ({ ...prev, ...newInputs }));
      
      setTimeout(() => {
        calculate({ ...inputs, ...newInputs } as RunningInputs);
      }, 100);
    }
  }, []);

  const handleInputChange = (field: keyof RunningInputs, value: string | CalculationMode | DistanceUnit | PaceUnit) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    const distance = parseFloat(inputs.distance);
    if (!inputs.distance || isNaN(distance) || distance <= 0 || distance > 1000) {
      newErrors.distance = 'Please enter a valid distance (0.1 - 1000)';
    }

    if (inputs.mode === 'pace' || inputs.mode === 'distance') {
      const hours = parseInt(inputs.hours) || 0;
      const minutes = parseInt(inputs.minutes) || 0;
      const seconds = parseInt(inputs.seconds) || 0;
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      
      if (totalSeconds <= 0) {
        newErrors.time = 'Please enter a valid time';
      }
    }

    if (inputs.mode === 'time') {
      const paceMin = parseInt(inputs.paceMinutes) || 0;
      const paceSec = parseInt(inputs.paceSeconds) || 0;
      const totalPaceSeconds = paceMin * 60 + paceSec;
      
      if (totalPaceSeconds <= 0) {
        newErrors.pace = 'Please enter a valid pace';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = (inputData?: RunningInputs) => {
    const data = inputData || inputs;
    
    if (!validate() && !inputData) return;

    let distanceKm = parseFloat(data.distance);
    if (data.distanceUnit === 'mi') {
      distanceKm = distanceKm * 1.60934;
    }
    const distanceMi = distanceKm / 1.60934;

    let totalSeconds = 0;
    let paceSecondsPerKm = 0;

    if (data.mode === 'pace') {
      // Calculate pace from distance and time
      const hours = parseInt(data.hours) || 0;
      const minutes = parseInt(data.minutes) || 0;
      const seconds = parseInt(data.seconds) || 0;
      totalSeconds = hours * 3600 + minutes * 60 + seconds;
      paceSecondsPerKm = totalSeconds / distanceKm;
    } else if (data.mode === 'time') {
      // Calculate time from distance and pace
      const paceMin = parseInt(data.paceMinutes) || 0;
      const paceSec = parseInt(data.paceSeconds) || 0;
      const paceSeconds = paceMin * 60 + paceSec;
      
      if (data.paceUnit === 'min/mi') {
        paceSecondsPerKm = paceSeconds / 1.60934;
      } else {
        paceSecondsPerKm = paceSeconds;
      }
      
      totalSeconds = paceSecondsPerKm * distanceKm;
    } else {
      // Calculate distance from time and pace
      const hours = parseInt(data.hours) || 0;
      const minutes = parseInt(data.minutes) || 0;
      const seconds = parseInt(data.seconds) || 0;
      totalSeconds = hours * 3600 + minutes * 60 + seconds;
      
      const paceMin = parseInt(data.paceMinutes) || 0;
      const paceSec = parseInt(data.paceSeconds) || 0;
      const paceSeconds = paceMin * 60 + paceSec;
      
      if (data.paceUnit === 'min/mi') {
        paceSecondsPerKm = paceSeconds / 1.60934;
      } else {
        paceSecondsPerKm = paceSeconds;
      }
      
      distanceKm = totalSeconds / paceSecondsPerKm;
    }

    const paceSecondsPerMi = paceSecondsPerKm * 1.60934;
    
    const formatPace = (seconds: number) => {
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    const formatTime = (seconds: number) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      if (h > 0) {
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      }
      return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // Speed calculation
    const kph = (distanceKm / totalSeconds) * 3600;
    const mph = (distanceMi / totalSeconds) * 3600;

    // Race time predictions (Riegel formula)
    const predictRaceTime = (targetDistanceKm: number) => {
      const fatigueFactor = 1.06;
      const predictedSeconds = totalSeconds * Math.pow(targetDistanceKm / distanceKm, fatigueFactor);
      return formatTime(predictedSeconds);
    };

    // Training paces (Jack Daniels' running formula)
    const trainingPaces = {
      easy: {
        perKm: formatPace(paceSecondsPerKm * 1.20), // 20% slower
        perMi: formatPace(paceSecondsPerMi * 1.20),
      },
      tempo: {
        perKm: formatPace(paceSecondsPerKm * 0.95), // 5% faster
        perMi: formatPace(paceSecondsPerMi * 0.95),
      },
      interval: {
        perKm: formatPace(paceSecondsPerKm * 0.85), // 15% faster
        perMi: formatPace(paceSecondsPerMi * 0.85),
      },
      long: {
        perKm: formatPace(paceSecondsPerKm * 1.15), // 15% slower
        perMi: formatPace(paceSecondsPerMi * 1.15),
      },
    };

    // Calorie calculation
    const weight = parseFloat(data.weight) || 70;
    const MET = kph < 8 ? 8.0 : kph < 10 ? 9.8 : kph < 12 ? 11.0 : 12.3;
    const calories = Math.round((MET * weight * (totalSeconds / 3600)));

    // Recovery time (simplified formula)
    const recoveryDays = Math.max(1, Math.round(distanceKm / 16));

    // Split times
    const splitTimes: Array<{ km: number; mi: number; time: string }> = [];
    const maxSplits = Math.min(Math.floor(distanceKm), 42);
    for (let i = 1; i <= maxSplits; i++) {
      const splitSeconds = paceSecondsPerKm * i;
      splitTimes.push({
        km: i,
        mi: parseFloat((i / 1.60934).toFixed(2)),
        time: formatTime(splitSeconds),
      });
    }

    const resultData: RunningResult = {
      pace: {
        perKm: formatPace(paceSecondsPerKm),
        perMi: formatPace(paceSecondsPerMi),
      },
      speed: {
        kph: parseFloat(kph.toFixed(2)),
        mph: parseFloat(mph.toFixed(2)),
      },
      time: {
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: Math.floor(totalSeconds % 60),
        total: totalSeconds,
      },
      distance: {
        km: parseFloat(distanceKm.toFixed(2)),
        mi: parseFloat(distanceMi.toFixed(2)),
      },
      raceTimePredictions: {
        '5K': predictRaceTime(5),
        '10K': predictRaceTime(10),
        'Half Marathon': predictRaceTime(21.0975),
        'Marathon': predictRaceTime(42.195),
      },
      trainingPaces,
      calories,
      recoveryDays,
      cadence: {
        recommended: 180,
        range: '170-190 spm',
      },
      splitTimes: splitTimes.slice(0, 10), // Show first 10 splits
    };

    setResult(resultData);
  };

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    
    const hours = parseInt(inputs.hours) || 0;
    const minutes = parseInt(inputs.minutes) || 0;
    const seconds = parseInt(inputs.seconds) || 0;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    const params = new URLSearchParams({
      m: inputs.mode,
      d: inputs.distance,
      u: inputs.distanceUnit,
      t: totalSeconds.toString(),
    });
    
    const url = `${baseUrl}/running-calculator?${params.toString()}`;
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
    const text = result 
      ? `My running pace: ${result.pace.perKm} per km | Distance: ${result.distance.km} km`
      : 'Check out my running stats';
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
        url = `mailto:?subject=${encodeURIComponent('My Running Stats')}&body=${encodedText}%20${encodedUrl}`;
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
      link.download = `running-stats-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Running Stats</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="Running Stats" /></body>
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Running Inputs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Calculation Mode */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Calculate <span className="text-red-500">*</span>
                </Label>
                <select
                  value={inputs.mode}
                  onChange={(e) => handleInputChange('mode', e.target.value as CalculationMode)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pace">Pace (from distance & time)</option>
                  <option value="time">Time (from distance & pace)</option>
                  <option value="distance">Distance (from time & pace)</option>
                </select>
              </div>

              {/* Distance */}
              {inputs.mode !== 'distance' && (
                <div className="space-y-2">
                  <Label htmlFor="distance" className="text-sm font-medium">
                    Distance <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <input
                      id="distance"
                      type="number"
                      value={inputs.distance}
                      onChange={(e) => handleInputChange('distance', e.target.value)}
                      className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.distance ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="10"
                      step="0.1"
                      min="0.1"
                      max="1000"
                    />
                    <select
                      value={inputs.distanceUnit}
                      onChange={(e) => handleInputChange('distanceUnit', e.target.value as DistanceUnit)}
                      className="px-4 py-3 border border-gray-300 rounded-lg"
                    >
                      <option value="km">km</option>
                      <option value="mi">mi</option>
                    </select>
                  </div>
                  {errors.distance && (
                    <p className="text-sm text-red-600">{errors.distance}</p>
                  )}
                </div>
              )}

              {/* Time */}
              {inputs.mode !== 'time' && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Time <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <input
                        type="number"
                        value={inputs.hours}
                        onChange={(e) => handleInputChange('hours', e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg"
                        placeholder="0"
                        min="0"
                        max="23"
                      />
                      <p className="text-xs text-gray-500 mt-1">Hours</p>
                    </div>
                    <div>
                      <input
                        type="number"
                        value={inputs.minutes}
                        onChange={(e) => handleInputChange('minutes', e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg"
                        placeholder="45"
                        min="0"
                        max="59"
                      />
                      <p className="text-xs text-gray-500 mt-1">Minutes</p>
                    </div>
                    <div>
                      <input
                        type="number"
                        value={inputs.seconds}
                        onChange={(e) => handleInputChange('seconds', e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg"
                        placeholder="30"
                        min="0"
                        max="59"
                      />
                      <p className="text-xs text-gray-500 mt-1">Seconds</p>
                    </div>
                  </div>
                  {errors.time && (
                    <p className="text-sm text-red-600">{errors.time}</p>
                  )}
                </div>
              )}

              {/* Pace */}
              {inputs.mode === 'time' || inputs.mode === 'distance' ? (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Pace <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.paceMinutes}
                      onChange={(e) => handleInputChange('paceMinutes', e.target.value)}
                      className="w-20 px-3 py-3 border border-gray-300 rounded-lg"
                      placeholder="5"
                      min="0"
                    />
                    <span className="flex items-center">:</span>
                    <input
                      type="number"
                      value={inputs.paceSeconds}
                      onChange={(e) => handleInputChange('paceSeconds', e.target.value)}
                      className="w-20 px-3 py-3 border border-gray-300 rounded-lg"
                      placeholder="30"
                      min="0"
                      max="59"
                    />
                    <select
                      value={inputs.paceUnit}
                      onChange={(e) => handleInputChange('paceUnit', e.target.value as PaceUnit)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
                    >
                      <option value="min/km">min/km</option>
                      <option value="min/mi">min/mi</option>
                    </select>
                  </div>
                  {errors.pace && (
                    <p className="text-sm text-red-600">{errors.pace}</p>
                  )}
                </div>
              ) : null}

              {/* Optional: Weight for calorie calculation */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-medium">
                  Weight (kg) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="weight"
                  type="number"
                  value={inputs.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="70"
                  min="30"
                  max="200"
                />
                <p className="text-xs text-gray-500">For calorie calculation (default: 70 kg)</p>
              </div>

              {/* Optional: Age for recovery */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">
                  Age <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="age"
                  type="number"
                  value={inputs.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="30"
                  min="10"
                  max="100"
                />
                <p className="text-xs text-gray-500">For recovery time estimation</p>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Gender <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={inputs.gender === 'male'}
                      onChange={(e) => handleInputChange('gender', e.target.value as 'male' | 'female')}
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
                      onChange={(e) => handleInputChange('gender', e.target.value as 'male' | 'female')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">Female</span>
                  </label>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">Quick Tips:</p>
                    <p className="text-xs">Enter your run data to calculate pace, predict race times, and get personalized training recommendations.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={() => calculate()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate
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
              <div ref={resultRef} className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg">
                {/* Export Header */}
                <div className="border-b-2 border-gray-200 pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Running Stats</h2>
                  <p className="text-sm text-gray-600">
                    Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-600">
                    Distance: {result.distance.km} km ({result.distance.mi} mi)
                  </p>
                </div>

                {/* Main Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="shadow-lg border-2 border-blue-200">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="flex items-center gap-2 text-blue-900">
                        <Timer className="h-6 w-6" />
                        Pace
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Per Kilometer</p>
                          <p className="text-3xl font-bold text-gray-900">{result.pace.perKm}</p>
                          <p className="text-xs text-gray-500">min/km</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Per Mile</p>
                          <p className="text-3xl font-bold text-gray-900">{result.pace.perMi}</p>
                          <p className="text-xs text-gray-500">min/mi</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-green-200">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                      <CardTitle className="flex items-center gap-2 text-green-900">
                        <Activity className="h-6 w-6" />
                        Speed
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Kilometers per Hour</p>
                          <p className="text-3xl font-bold text-gray-900">{result.speed.kph}</p>
                          <p className="text-xs text-gray-500">km/h</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Miles per Hour</p>
                          <p className="text-3xl font-bold text-gray-900">{result.speed.mph}</p>
                          <p className="text-xs text-gray-500">mph</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Race Predictions */}
                <Card className="shadow-lg border-2 border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                    <CardTitle className="flex items-center gap-2 text-purple-900">
                      <TrendingUp className="h-6 w-6" />
                      Race Time Predictions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600 mb-4">Based on your current performance (Riegel formula)</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-1">5K</p>
                        <p className="text-xl font-bold text-purple-900">{result.raceTimePredictions['5K']}</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-1">10K</p>
                        <p className="text-xl font-bold text-purple-900">{result.raceTimePredictions['10K']}</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-1">Half Marathon</p>
                        <p className="text-xl font-bold text-purple-900">{result.raceTimePredictions['Half Marathon']}</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-1">Marathon</p>
                        <p className="text-xl font-bold text-purple-900">{result.raceTimePredictions['Marathon']}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Training Paces */}
                <Card className="shadow-lg border-2 border-orange-200">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                    <CardTitle className="flex items-center gap-2 text-orange-900">
                      <Activity className="h-6 w-6" />
                      Training Paces
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Easy Run</p>
                          <p className="text-xs text-gray-600">Recovery & long runs</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{result.trainingPaces.easy.perKm}</p>
                          <p className="text-xs text-gray-600">min/km</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Tempo Run</p>
                          <p className="text-xs text-gray-600">Lactate threshold</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{result.trainingPaces.tempo.perKm}</p>
                          <p className="text-xs text-gray-600">min/km</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Interval Training</p>
                          <p className="text-xs text-gray-600">VO2 max improvement</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{result.trainingPaces.interval.perKm}</p>
                          <p className="text-xs text-gray-600">min/km</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Long Run</p>
                          <p className="text-xs text-gray-600">Endurance building</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{result.trainingPaces.long.perKm}</p>
                          <p className="text-xs text-gray-600">min/km</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="shadow-lg border-2 border-red-200">
                    <CardContent className="p-6 text-center">
                      <Flame className="h-8 w-8 text-red-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Calories Burned</p>
                      <p className="text-3xl font-bold text-gray-900">{result.calories}</p>
                      <p className="text-xs text-gray-500">kcal</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-indigo-200">
                    <CardContent className="p-6 text-center">
                      <Timer className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Recovery Time</p>
                      <p className="text-3xl font-bold text-gray-900">{result.recoveryDays}</p>
                      <p className="text-xs text-gray-500">days</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-teal-200">
                    <CardContent className="p-6 text-center">
                      <Activity className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Cadence</p>
                      <p className="text-3xl font-bold text-gray-900">{result.cadence.recommended}</p>
                      <p className="text-xs text-gray-500">{result.cadence.range}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Split Times */}
                {result.splitTimes.length > 0 && (
                  <Card className="shadow-lg border-2 border-gray-200">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50">
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <Timer className="h-6 w-6" />
                        Split Times
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Kilometer</th>
                              <th className="text-left p-2">Mile</th>
                              <th className="text-left p-2">Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.splitTimes.map((split, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-2">{split.km} km</td>
                                <td className="p-2">{split.mi} mi</td>
                                <td className="p-2 font-mono">{split.time}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center text-gray-500">
                <Activity className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Enter your running data and click "Calculate" to see your stats, pace, race predictions, and training recommendations</p>
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
              <h3 className="text-2xl font-bold text-gray-900">Share Your Stats</h3>
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
              Share your running stats with friends and training partners.
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
          </div>
        </div>
      )}
    </div>
  );
}

