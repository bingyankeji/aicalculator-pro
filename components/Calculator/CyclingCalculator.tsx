'use client';

import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Bike, Activity, TrendingUp, Flame, Info, Zap, Mountain } from 'lucide-react';

type CalculationMode = 'speed' | 'time' | 'distance';
type SpeedUnit = 'kph' | 'mph';
type DistanceUnit = 'km' | 'mi';

interface CyclingInputs {
  mode: CalculationMode;
  distance: string;
  distanceUnit: DistanceUnit;
  hours: string;
  minutes: string;
  seconds: string;
  speed: string;
  speedUnit: SpeedUnit;
  weight: string; // kg
  bikeWeight: string; // kg
  power: string; // watts (optional, for manual input)
  cadence: string; // rpm
  grade: string; // percentage (0 = flat, positive = uphill, negative = downhill)
  windSpeed: string; // kph
  age: string;
  restingHeartRate: string;
}

interface CyclingResult {
  speed: {
    kph: number;
    mph: number;
  };
  time: {
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  };
  distance: {
    km: number;
    mi: number;
  };
  power: {
    estimated: number;
    normalized: number;
    wPerKg: number;
  };
  powerZones: {
    activeRecovery: { watts: string; percentage: string };
    endurance: { watts: string; percentage: string };
    tempo: { watts: string; percentage: string };
    threshold: { watts: string; percentage: string };
    vo2max: { watts: string; percentage: string };
    anaerobic: { watts: string; percentage: string };
  };
  heartRateZones: {
    zone1: { bpm: string; name: string };
    zone2: { bpm: string; name: string };
    zone3: { bpm: string; name: string };
    zone4: { bpm: string; name: string };
    zone5: { bpm: string; name: string };
  };
  calories: number;
  cadenceRecommendation: {
    optimal: number;
    range: string;
    status: string;
  };
  gearing: {
    recommended: string;
    cadence: number;
  };
  climbing: {
    elevation: number;
    vam: number; // Vertical Ascent Meters per hour
    category: string;
  };
}

export default function CyclingCalculator() {
  const [inputs, setInputs] = useState<CyclingInputs>({
    mode: 'speed',
    distance: '',
    distanceUnit: 'km',
    hours: '0',
    minutes: '',
    seconds: '',
    speed: '',
    speedUnit: 'kph',
    weight: '',
    bikeWeight: '10',
    power: '',
    cadence: '',
    grade: '0',
    windSpeed: '0',
    age: '',
    restingHeartRate: '',
  });

  const [result, setResult] = useState<CyclingResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Load data from URL parameters
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const m = params.get('m');
    const d = params.get('d');
    const u = params.get('u');
    const t = params.get('t');
    const s = params.get('s');

    if (m && d) {
      const newInputs: Partial<CyclingInputs> = {
        mode: (m as CalculationMode) || 'speed',
        distance: d,
        distanceUnit: (u as DistanceUnit) || 'km',
      };

      if (t) {
        const totalSeconds = parseInt(t);
        newInputs.hours = Math.floor(totalSeconds / 3600).toString();
        newInputs.minutes = Math.floor((totalSeconds % 3600) / 60).toString();
        newInputs.seconds = (totalSeconds % 60).toString();
      }

      if (s) {
        newInputs.speed = s;
      }

      setInputs(prev => ({ ...prev, ...newInputs }));
      
      setTimeout(() => {
        calculate({ ...inputs, ...newInputs } as CyclingInputs);
      }, 100);
    }
  }, []);

  const handleInputChange = (field: keyof CyclingInputs, value: string | CalculationMode | SpeedUnit | DistanceUnit) => {
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

    if (inputs.mode === 'speed' || inputs.mode === 'distance') {
      const hours = parseInt(inputs.hours) || 0;
      const minutes = parseInt(inputs.minutes) || 0;
      const seconds = parseInt(inputs.seconds) || 0;
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      
      if (totalSeconds <= 0) {
        newErrors.time = 'Please enter a valid time';
      }
    }

    if (inputs.mode === 'time') {
      const speed = parseFloat(inputs.speed);
      if (!inputs.speed || isNaN(speed) || speed <= 0) {
        newErrors.speed = 'Please enter a valid speed';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = (inputData?: CyclingInputs) => {
    const data = inputData || inputs;
    
    if (!validate() && !inputData) return;

    let distanceKm = parseFloat(data.distance);
    if (data.distanceUnit === 'mi') {
      distanceKm = distanceKm * 1.60934;
    }
    const distanceMi = distanceKm / 1.60934;

    let totalSeconds = 0;
    let speedKph = 0;

    if (data.mode === 'speed') {
      const hours = parseInt(data.hours) || 0;
      const minutes = parseInt(data.minutes) || 0;
      const seconds = parseInt(data.seconds) || 0;
      totalSeconds = hours * 3600 + minutes * 60 + seconds;
      speedKph = (distanceKm / totalSeconds) * 3600;
    } else if (data.mode === 'time') {
      let inputSpeed = parseFloat(data.speed);
      if (data.speedUnit === 'mph') {
        speedKph = inputSpeed * 1.60934;
      } else {
        speedKph = inputSpeed;
      }
      totalSeconds = (distanceKm / speedKph) * 3600;
    } else {
      const hours = parseInt(data.hours) || 0;
      const minutes = parseInt(data.minutes) || 0;
      const seconds = parseInt(data.seconds) || 0;
      totalSeconds = hours * 3600 + minutes * 60 + seconds;
      
      let inputSpeed = parseFloat(data.speed);
      if (data.speedUnit === 'mph') {
        speedKph = inputSpeed * 1.60934;
      } else {
        speedKph = inputSpeed;
      }
      
      distanceKm = (speedKph * totalSeconds) / 3600;
    }

    const speedMph = speedKph / 1.60934;
    const speedMs = speedKph / 3.6;

    // Power estimation using simplified model
    const weight = parseFloat(data.weight) || 75;
    const bikeWeight = parseFloat(data.bikeWeight) || 10;
    const totalWeight = weight + bikeWeight;
    const grade = parseFloat(data.grade) || 0;
    const windSpeed = parseFloat(data.windSpeed) || 0;
    
    // Power = (Rolling Resistance + Air Resistance + Climbing) × Velocity
    const Crr = 0.005; // Rolling resistance coefficient
    const CdA = 0.324; // Drag coefficient × frontal area (m²)
    const rho = 1.225; // Air density (kg/m³)
    const g = 9.81; // Gravity
    
    const rollingPower = Crr * totalWeight * g * speedMs;
    const windSpeedMs = (windSpeed / 3.6);
    const relativeWindSpeed = speedMs + windSpeedMs;
    const airPower = 0.5 * CdA * rho * Math.pow(relativeWindSpeed, 3);
    const climbingPower = totalWeight * g * Math.sin(Math.atan(grade / 100)) * speedMs;
    
    const estimatedPower = Math.max(50, Math.round(rollingPower + airPower + climbingPower));
    const normalizedPower = Math.round(estimatedPower * 1.05);
    const wPerKg = parseFloat((estimatedPower / weight).toFixed(1));

    // Power zones (based on FTP = Functional Threshold Power)
    const ftp = estimatedPower; // Using estimated power as approximation
    const powerZones = {
      activeRecovery: { 
        watts: `${Math.round(ftp * 0.55)}-${Math.round(ftp * 0.75)}`, 
        percentage: '55-75%' 
      },
      endurance: { 
        watts: `${Math.round(ftp * 0.75)}-${Math.round(ftp * 0.90)}`, 
        percentage: '75-90%' 
      },
      tempo: { 
        watts: `${Math.round(ftp * 0.90)}-${Math.round(ftp * 1.05)}`, 
        percentage: '90-105%' 
      },
      threshold: { 
        watts: `${Math.round(ftp * 1.05)}-${Math.round(ftp * 1.20)}`, 
        percentage: '105-120%' 
      },
      vo2max: { 
        watts: `${Math.round(ftp * 1.20)}-${Math.round(ftp * 1.50)}`, 
        percentage: '120-150%' 
      },
      anaerobic: { 
        watts: `${Math.round(ftp * 1.50)}+`, 
        percentage: '150%+' 
      },
    };

    // Heart rate zones (Karvonen method)
    const age = parseInt(data.age) || 30;
    const restingHR = parseInt(data.restingHeartRate) || 60;
    const maxHR = 220 - age;
    const hrReserve = maxHR - restingHR;
    
    const calculateHR = (percentage: number) => {
      return Math.round(restingHR + hrReserve * percentage);
    };

    const heartRateZones = {
      zone1: { bpm: `${calculateHR(0.50)}-${calculateHR(0.60)}`, name: 'Recovery' },
      zone2: { bpm: `${calculateHR(0.60)}-${calculateHR(0.70)}`, name: 'Endurance' },
      zone3: { bpm: `${calculateHR(0.70)}-${calculateHR(0.80)}`, name: 'Tempo' },
      zone4: { bpm: `${calculateHR(0.80)}-${calculateHR(0.90)}`, name: 'Threshold' },
      zone5: { bpm: `${calculateHR(0.90)}-${calculateHR(1.00)}`, name: 'Max' },
    };

    // Calorie calculation
    const hours = totalSeconds / 3600;
    const MET = speedKph < 16 ? 4.0 : speedKph < 20 ? 6.8 : speedKph < 25 ? 8.0 : speedKph < 30 ? 10.0 : 12.0;
    const adjustedMET = MET * (1 + Math.abs(grade) / 100);
    const calories = Math.round(adjustedMET * weight * hours);

    // Cadence recommendation
    const inputCadence = parseInt(data.cadence) || 0;
    const optimalCadence = speedKph < 20 ? 70 : speedKph < 30 ? 85 : 95;
    let cadenceStatus = 'Not provided';
    if (inputCadence > 0) {
      if (inputCadence >= 80 && inputCadence <= 100) {
        cadenceStatus = 'Optimal';
      } else if (inputCadence >= 70 && inputCadence < 80) {
        cadenceStatus = 'Slightly low';
      } else if (inputCadence > 100 && inputCadence <= 110) {
        cadenceStatus = 'Slightly high';
      } else {
        cadenceStatus = 'Needs adjustment';
      }
    }

    // Climbing metrics
    const elevation = (distanceKm * 1000) * (grade / 100);
    const vam = elevation * (3600 / totalSeconds); // VAM = meters climbed per hour
    let climbCategory = 'Flat';
    if (grade > 0) {
      if (grade < 3) climbCategory = 'Rolling hills';
      else if (grade < 6) climbCategory = 'Moderate climb';
      else if (grade < 10) climbCategory = 'Steep climb';
      else climbCategory = 'Very steep climb';
    } else if (grade < 0) {
      climbCategory = 'Descent';
    }

    const resultData: CyclingResult = {
      speed: {
        kph: parseFloat(speedKph.toFixed(1)),
        mph: parseFloat(speedMph.toFixed(1)),
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
      power: {
        estimated: estimatedPower,
        normalized: normalizedPower,
        wPerKg: wPerKg,
      },
      powerZones,
      heartRateZones,
      calories,
      cadenceRecommendation: {
        optimal: optimalCadence,
        range: '80-100 rpm',
        status: cadenceStatus,
      },
      gearing: {
        recommended: speedKph < 15 ? 'Easy gear (34/28)' : speedKph < 25 ? 'Mid gear (50/19)' : 'Big gear (50/14)',
        cadence: inputCadence || optimalCadence,
      },
      climbing: {
        elevation: Math.round(elevation),
        vam: Math.round(vam),
        category: climbCategory,
      },
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
    
    if (inputs.speed) {
      params.set('s', inputs.speed);
    }
    
    const url = `${baseUrl}/cycling-calculator?${params.toString()}`;
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
      ? `My cycling stats: ${result.speed.kph} km/h | Power: ${result.power.estimated}W`
      : 'Check out my cycling stats';
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
        url = `mailto:?subject=${encodeURIComponent('My Cycling Stats')}&body=${encodedText}%20${encodedUrl}`;
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
      link.download = `cycling-stats-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Cycling Stats</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="Cycling Stats" /></body>
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
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
              <CardTitle className="flex items-center gap-2">
                <Bike className="h-5 w-5 text-orange-600" />
                Cycling Inputs
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="speed">Speed (from distance & time)</option>
                  <option value="time">Time (from distance & speed)</option>
                  <option value="distance">Distance (from time & speed)</option>
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
                      className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.distance ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="40"
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
                        placeholder="1"
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
                        placeholder="30"
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
                        placeholder="0"
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

              {/* Speed */}
              {inputs.mode === 'time' || inputs.mode === 'distance' ? (
                <div className="space-y-2">
                  <Label htmlFor="speed" className="text-sm font-medium">
                    Speed <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <input
                      id="speed"
                      type="number"
                      value={inputs.speed}
                      onChange={(e) => handleInputChange('speed', e.target.value)}
                      className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.speed ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="25"
                      step="0.1"
                      min="1"
                      max="100"
                    />
                    <select
                      value={inputs.speedUnit}
                      onChange={(e) => handleInputChange('speedUnit', e.target.value as SpeedUnit)}
                      className="px-4 py-3 border border-gray-300 rounded-lg"
                    >
                      <option value="kph">km/h</option>
                      <option value="mph">mph</option>
                    </select>
                  </div>
                  {errors.speed && (
                    <p className="text-sm text-red-600">{errors.speed}</p>
                  )}
                </div>
              ) : null}

              {/* Weight */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-medium">
                  Rider Weight (kg) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="weight"
                  type="number"
                  value={inputs.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="75"
                  min="40"
                  max="150"
                />
                <p className="text-xs text-gray-500">For power and calorie calculation (default: 75 kg)</p>
              </div>

              {/* Bike Weight */}
              <div className="space-y-2">
                <Label htmlFor="bikeWeight" className="text-sm font-medium">
                  Bike Weight (kg) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="bikeWeight"
                  type="number"
                  value={inputs.bikeWeight}
                  onChange={(e) => handleInputChange('bikeWeight', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="10"
                  min="5"
                  max="20"
                />
                <p className="text-xs text-gray-500">Typical road bike: 7-10 kg</p>
              </div>

              {/* Grade */}
              <div className="space-y-2">
                <Label htmlFor="grade" className="text-sm font-medium">
                  Grade (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="grade"
                  type="number"
                  value={inputs.grade}
                  onChange={(e) => handleInputChange('grade', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="0"
                  min="-20"
                  max="25"
                  step="0.5"
                />
                <p className="text-xs text-gray-500">0 = flat, positive = uphill, negative = downhill</p>
              </div>

              {/* Cadence */}
              <div className="space-y-2">
                <Label htmlFor="cadence" className="text-sm font-medium">
                  Cadence (rpm) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="cadence"
                  type="number"
                  value={inputs.cadence}
                  onChange={(e) => handleInputChange('cadence', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="85"
                  min="40"
                  max="150"
                />
                <p className="text-xs text-gray-500">Optimal: 80-100 rpm</p>
              </div>

              {/* Wind Speed */}
              <div className="space-y-2">
                <Label htmlFor="windSpeed" className="text-sm font-medium">
                  Headwind Speed (km/h) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="windSpeed"
                  type="number"
                  value={inputs.windSpeed}
                  onChange={(e) => handleInputChange('windSpeed', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="0"
                  min="0"
                  max="50"
                />
                <p className="text-xs text-gray-500">For power calculation (0 = no wind)</p>
              </div>

              {/* Age & Resting HR for Heart Rate Zones */}
              <div className="grid grid-cols-2 gap-3">
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restingHeartRate" className="text-sm font-medium">
                    Resting HR <span className="text-gray-500 text-xs">- Optional</span>
                  </Label>
                  <input
                    id="restingHeartRate"
                    type="number"
                    value={inputs.restingHeartRate}
                    onChange={(e) => handleInputChange('restingHeartRate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="60"
                    min="30"
                    max="100"
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-orange-900">
                    <p className="font-medium mb-1">Pro Tips:</p>
                    <p className="text-xs">Enter ride data for power estimation, training zones, and performance insights. Grade affects power calculation significantly.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={() => calculate()}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Cycling Performance</h2>
                  <p className="text-sm text-gray-600">
                    Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-600">
                    Distance: {result.distance.km} km ({result.distance.mi} mi)
                  </p>
                </div>

                {/* Main Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="shadow-lg border-2 border-orange-200">
                    <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                      <CardTitle className="flex items-center gap-2 text-orange-900">
                        <Bike className="h-6 w-6" />
                        Speed
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 text-center">
                      <p className="text-5xl font-bold text-gray-900 mb-2">{result.speed.kph}</p>
                      <p className="text-sm text-gray-600 mb-1">km/h</p>
                      <p className="text-2xl font-semibold text-gray-700">{result.speed.mph}</p>
                      <p className="text-xs text-gray-500">mph</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-yellow-200">
                    <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
                      <CardTitle className="flex items-center gap-2 text-yellow-900">
                        <Zap className="h-6 w-6" />
                        Power
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 text-center">
                      <p className="text-5xl font-bold text-gray-900 mb-2">{result.power.estimated}</p>
                      <p className="text-sm text-gray-600 mb-1">watts</p>
                      <p className="text-lg font-semibold text-gray-700">{result.power.wPerKg} W/kg</p>
                      <p className="text-xs text-gray-500">power-to-weight</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-red-200">
                    <CardContent className="p-6 text-center flex flex-col justify-center h-full">
                      <Flame className="h-12 w-12 text-red-600 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-2">Calories Burned</p>
                      <p className="text-5xl font-bold text-gray-900">{result.calories}</p>
                      <p className="text-xs text-gray-500 mt-2">kcal</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Power Zones */}
                <Card className="shadow-lg border-2 border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                    <CardTitle className="flex items-center gap-2 text-purple-900">
                      <TrendingUp className="h-6 w-6" />
                      Power Training Zones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Zone 1: Active Recovery</p>
                          <p className="text-xs text-gray-600">{result.powerZones.activeRecovery.percentage} FTP</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{result.powerZones.activeRecovery.watts}W</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Zone 2: Endurance</p>
                          <p className="text-xs text-gray-600">{result.powerZones.endurance.percentage} FTP</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{result.powerZones.endurance.watts}W</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Zone 3: Tempo</p>
                          <p className="text-xs text-gray-600">{result.powerZones.tempo.percentage} FTP</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{result.powerZones.tempo.watts}W</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Zone 4: Threshold</p>
                          <p className="text-xs text-gray-600">{result.powerZones.threshold.percentage} FTP</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{result.powerZones.threshold.watts}W</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Zone 5: VO2 Max</p>
                          <p className="text-xs text-gray-600">{result.powerZones.vo2max.percentage} FTP</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{result.powerZones.vo2max.watts}W</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Zone 6: Anaerobic</p>
                          <p className="text-xs text-gray-600">{result.powerZones.anaerobic.percentage} FTP</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{result.powerZones.anaerobic.watts}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Heart Rate Zones */}
                <Card className="shadow-lg border-2 border-red-200">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
                    <CardTitle className="flex items-center gap-2 text-red-900">
                      <Activity className="h-6 w-6" />
                      Heart Rate Training Zones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {Object.entries(result.heartRateZones).map(([key, zone]) => (
                        <div key={key} className="p-3 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg border border-red-200">
                          <p className="text-sm font-semibold text-gray-900">{zone.name}</p>
                          <p className="text-xl font-bold text-red-600">{zone.bpm}</p>
                          <p className="text-xs text-gray-600">bpm</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="shadow-lg border-2 border-indigo-200">
                    <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                      <CardTitle className="text-indigo-900">Cadence</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="text-center mb-3">
                        <p className="text-sm text-gray-600 mb-1">Your Cadence</p>
                        <p className="text-3xl font-bold text-gray-900">{result.gearing.cadence} rpm</p>
                        <p className="text-sm font-medium text-indigo-600 mt-1">{result.cadenceRecommendation.status}</p>
                      </div>
                      <div className="border-t pt-3">
                        <p className="text-xs text-gray-600">Optimal Range</p>
                        <p className="text-lg font-bold text-gray-900">{result.cadenceRecommendation.range}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-green-200">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                      <CardTitle className="flex items-center gap-2 text-green-900">
                        <Mountain className="h-6 w-6" />
                        Climbing
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-600">Category</p>
                          <p className="text-lg font-bold text-gray-900">{result.climbing.category}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Elevation Gain</p>
                          <p className="text-2xl font-bold text-gray-900">{result.climbing.elevation}m</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">VAM (m/h)</p>
                          <p className="text-xl font-semibold text-gray-900">{result.climbing.vam}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center text-gray-500">
                <Bike className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Enter your cycling data and click "Calculate" to see speed, power, training zones, and performance metrics</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Share Modal - same as before */}
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
              Share your cycling performance with friends and training partners.
            </p>

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

