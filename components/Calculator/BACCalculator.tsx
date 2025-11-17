'use client';

import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, AlertTriangle, Clock, Info, TrendingDown } from 'lucide-react';

interface Drink {
  type: 'beer' | 'wine' | 'liquor' | 'custom';
  volume: number; // in ml
  abv: number; // alcohol by volume percentage
  count: number;
}

interface BACInputs {
  gender: 'male' | 'female';
  weight: string;
  weightUnit: 'kg' | 'lbs';
  drinks: Drink[];
  drinkingDuration: string; // in hours
}

interface BACResult {
  currentBAC: number;
  peakBAC: number;
  timeTillSober: number; // hours
  soberTime: Date;
  totalAlcoholGrams: number;
  standardDrinks: number;
  legalStatus: 'under' | 'at' | 'over';
  impairmentLevel: string;
  canDriveSafely: boolean;
  metabolismRate: number; // BAC reduction per hour
}

export default function BACCalculator() {
  const [inputs, setInputs] = useState<BACInputs>({
    gender: 'male',
    weight: '',
    weightUnit: 'kg',
    drinks: [],
    drinkingDuration: '1',
  });

  const [result, setResult] = useState<BACResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Drink presets
  const drinkPresets = {
    beer: { volume: 355, abv: 5 },
    wine: { volume: 148, abv: 12 },
    liquor: { volume: 44, abv: 40 },
  };

  const addDrink = (type: 'beer' | 'wine' | 'liquor') => {
    const preset = drinkPresets[type];
    setInputs(prev => ({
      ...prev,
      drinks: [...prev.drinks, { type, volume: preset.volume, abv: preset.abv, count: 1 }],
    }));
  };

  const updateDrink = (index: number, field: keyof Drink, value: number | string) => {
    setInputs(prev => ({
      ...prev,
      drinks: prev.drinks.map((drink, i) => 
        i === index ? { ...drink, [field]: value } : drink
      ),
    }));
  };

  const removeDrink = (index: number) => {
    setInputs(prev => ({
      ...prev,
      drinks: prev.drinks.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (field: keyof BACInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    const weight = parseFloat(inputs.weight);
    const minWeight = inputs.weightUnit === 'kg' ? 30 : 66;
    const maxWeight = inputs.weightUnit === 'kg' ? 300 : 661;
    
    if (!inputs.weight || isNaN(weight) || weight < minWeight || weight > maxWeight) {
      newErrors.weight = `Weight should be between ${minWeight} and ${maxWeight} ${inputs.weightUnit}`;
    }

    if (inputs.drinks.length === 0) {
      newErrors.drinks = 'Please add at least one drink';
    }

    const duration = parseFloat(inputs.drinkingDuration);
    if (!inputs.drinkingDuration || isNaN(duration) || duration < 0.25 || duration > 24) {
      newErrors.drinkingDuration = 'Drinking duration should be between 0.25 and 24 hours';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    if (!validate()) return;

    // Convert weight to grams
    const weightKg = inputs.weightUnit === 'kg' 
      ? parseFloat(inputs.weight)
      : parseFloat(inputs.weight) * 0.453592;
    const weightGrams = weightKg * 1000;

    // Body water constant (Widmark factor)
    const r = inputs.gender === 'male' ? 0.68 : 0.55;

    // Calculate total alcohol consumed in grams
    let totalAlcoholGrams = 0;
    inputs.drinks.forEach(drink => {
      const volumeL = drink.volume / 1000;
      const alcoholVolume = volumeL * (drink.abv / 100);
      const alcoholGrams = alcoholVolume * 789.24; // density of ethanol in g/L
      totalAlcoholGrams += alcoholGrams * drink.count;
    });

    // Standard drinks (14g = 1 standard drink)
    const standardDrinks = totalAlcoholGrams / 14;

    // Peak BAC (Widmark formula) - immediately after drinking
    const peakBAC = (totalAlcoholGrams / (weightGrams * r)) * 100;

    // Time since drinking started
    const drinkingDuration = parseFloat(inputs.drinkingDuration);

    // Metabolism rate (typically 0.015% per hour)
    const metabolismRate = 0.015;

    // Current BAC after metabolism
    const metabolized = metabolismRate * drinkingDuration;
    const currentBAC = Math.max(0, peakBAC - metabolized);

    // Time until sober (BAC = 0)
    const timeTillSober = currentBAC > 0 ? currentBAC / metabolismRate : 0;

    // Sober time
    const soberTime = new Date();
    soberTime.setHours(soberTime.getHours() + timeTillSober);

    // Legal status (0.08% is the limit in most US states)
    const legalLimit = 0.08;
    let legalStatus: 'under' | 'at' | 'over' = 'under';
    if (currentBAC >= legalLimit + 0.01) {
      legalStatus = 'over';
    } else if (currentBAC >= legalLimit - 0.01) {
      legalStatus = 'at';
    }

    // Impairment level
    let impairmentLevel = '';
    if (currentBAC < 0.02) {
      impairmentLevel = 'No visible effects';
    } else if (currentBAC < 0.05) {
      impairmentLevel = 'Mild impairment';
    } else if (currentBAC < 0.08) {
      impairmentLevel = 'Moderate impairment';
    } else if (currentBAC < 0.10) {
      impairmentLevel = 'Significant impairment';
    } else if (currentBAC < 0.15) {
      impairmentLevel = 'Severe impairment';
    } else if (currentBAC < 0.30) {
      impairmentLevel = 'Extreme impairment';
    } else {
      impairmentLevel = 'Life-threatening';
    }

    // Can drive safely (should be well under legal limit)
    const canDriveSafely = currentBAC < 0.02;

    const resultData: BACResult = {
      currentBAC,
      peakBAC,
      timeTillSober,
      soberTime,
      totalAlcoholGrams,
      standardDrinks,
      legalStatus,
      impairmentLevel,
      canDriveSafely,
      metabolismRate,
    };

    setResult(resultData);
  };

  const formatBAC = (bac: number) => {
    return bac.toFixed(3);
  };

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h} hr`;
    return `${h} hr ${m} min`;
  };

  const getDrinkIcon = (type: string) => {
    switch (type) {
      case 'beer': return '🍺';
      case 'wine': return '🍷';
      case 'liquor': return '🥃';
      default: return '🍹';
    }
  };

  const getDrinkName = (type: string) => {
    switch (type) {
      case 'beer': return 'Beer';
      case 'wine': return 'Wine';
      case 'liquor': return 'Liquor';
      default: return 'Custom Drink';
    }
  };

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    const url = `${baseUrl}/bac-calculator`;
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
    const text = 'Calculate your Blood Alcohol Content (BAC) and find out when it\'s safe to drive';
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
        url = `mailto:?subject=${encodeURIComponent('BAC Calculator')}&body=${encodedText}%20${encodedUrl}`;
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
      link.download = `bac-results-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>BAC Results</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="BAC Results" /></body>
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
                <Calculator className="h-5 w-5 text-orange-600" />
                BAC Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Gender */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Gender <span className="text-red-500">*</span></Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleInputChange('gender', 'male')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                      inputs.gender === 'male'
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => handleInputChange('gender', 'female')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                      inputs.gender === 'female'
                        ? 'border-pink-600 bg-pink-50 text-pink-900'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-medium">
                  Body Weight <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    id="weight"
                    type="number"
                    value={inputs.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.weight ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="70"
                  />
                  <select
                    value={inputs.weightUnit}
                    onChange={(e) => handleInputChange('weightUnit', e.target.value as 'kg' | 'lbs')}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
                {errors.weight && (
                  <p className="text-sm text-red-600">{errors.weight}</p>
                )}
              </div>

              {/* Drinks */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Drinks Consumed <span className="text-red-500">*</span></Label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <button
                    onClick={() => addDrink('beer')}
                    className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg font-medium transition-colors text-sm"
                  >
                    🍺 Beer
                  </button>
                  <button
                    onClick={() => addDrink('wine')}
                    className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-lg font-medium transition-colors text-sm"
                  >
                    🍷 Wine
                  </button>
                  <button
                    onClick={() => addDrink('liquor')}
                    className="px-3 py-2 bg-orange-100 hover:bg-orange-200 text-orange-900 rounded-lg font-medium transition-colors text-sm"
                  >
                    🥃 Liquor
                  </button>
                </div>

                {inputs.drinks.length === 0 ? (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center text-sm text-gray-600">
                    Click a button above to add drinks
                  </div>
                ) : (
                  <div className="space-y-2">
                    {inputs.drinks.map((drink, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">
                            {getDrinkIcon(drink.type)} {getDrinkName(drink.type)}
                          </span>
                          <button
                            onClick={() => removeDrink(index)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <label className="text-gray-600">Count</label>
                            <input
                              type="number"
                              value={drink.count}
                              onChange={(e) => updateDrink(index, 'count', parseInt(e.target.value) || 1)}
                              className="w-full px-2 py-1 border border-gray-300 rounded mt-1"
                              min="1"
                            />
                          </div>
                          <div>
                            <label className="text-gray-600">Vol (ml)</label>
                            <input
                              type="number"
                              value={drink.volume}
                              onChange={(e) => updateDrink(index, 'volume', parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1 border border-gray-300 rounded mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-gray-600">ABV %</label>
                            <input
                              type="number"
                              value={drink.abv}
                              onChange={(e) => updateDrink(index, 'abv', parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1 border border-gray-300 rounded mt-1"
                              step="0.1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {errors.drinks && (
                  <p className="text-sm text-red-600">{errors.drinks}</p>
                )}
              </div>

              {/* Drinking Duration */}
              <div className="space-y-2">
                <Label htmlFor="drinkingDuration" className="text-sm font-medium">
                  Time Spent Drinking (hours) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="drinkingDuration"
                  type="number"
                  value={inputs.drinkingDuration}
                  onChange={(e) => handleInputChange('drinkingDuration', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.drinkingDuration ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1"
                  step="0.25"
                  min="0.25"
                  max="24"
                />
                {errors.drinkingDuration && (
                  <p className="text-sm text-red-600">{errors.drinkingDuration}</p>
                )}
                <p className="text-xs text-gray-500">Enter time from first drink to now</p>
              </div>

              {/* Warning Box */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-900">
                    <p className="font-medium mb-1">Important Disclaimer</p>
                    <p className="text-xs">
                      This calculator provides estimates only. Results may vary based on individual factors. Never drink and drive.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculate}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate BAC
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">BAC Results</h2>
                  <p className="text-sm text-gray-600">
                    Calculated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {/* Main BAC Display */}
                <Card className={`shadow-lg border-2 ${
                  result.currentBAC >= 0.08 ? 'border-red-200 bg-gradient-to-br from-red-50 to-orange-50' :
                  result.currentBAC >= 0.05 ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50' :
                  'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50'
                }`}>
                  <CardContent className="p-8 text-center">
                    <AlertTriangle className={`h-16 w-16 mx-auto mb-4 ${
                      result.currentBAC >= 0.08 ? 'text-red-600' :
                      result.currentBAC >= 0.05 ? 'text-yellow-600' :
                      'text-green-600'
                    }`} />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Current BAC</h3>
                    <p className={`text-5xl font-bold mb-4 ${
                      result.currentBAC >= 0.08 ? 'text-red-600' :
                      result.currentBAC >= 0.05 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {formatBAC(result.currentBAC)}%
                    </p>
                    <p className="text-lg font-semibold text-gray-700 mb-2">{result.impairmentLevel}</p>
                    
                    {!result.canDriveSafely && (
                      <div className="mt-4 p-4 bg-red-100 border-2 border-red-300 rounded-lg">
                        <p className="text-red-900 font-bold text-lg">⚠️ DO NOT DRIVE</p>
                        <p className="text-red-800 text-sm mt-1">You are not safe to operate a vehicle</p>
                      </div>
                    )}
                    
                    {result.canDriveSafely && (
                      <div className="mt-4 p-4 bg-green-100 border-2 border-green-300 rounded-lg">
                        <p className="text-green-900 font-bold">✓ Below Legal Limit</p>
                        <p className="text-green-800 text-sm mt-1">Always use caution and designated drivers when possible</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="shadow-lg border-2 border-orange-200">
                    <CardContent className="p-6">
                      <TrendingDown className="h-10 w-10 text-orange-600 mb-3" />
                      <p className="text-sm text-gray-600 mb-1">Peak BAC (at end of drinking)</p>
                      <p className="text-2xl font-bold text-gray-900">{formatBAC(result.peakBAC)}%</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-blue-200">
                    <CardContent className="p-6">
                      <Clock className="h-10 w-10 text-blue-600 mb-3" />
                      <p className="text-sm text-gray-600 mb-1">Time Until Sober (BAC = 0%)</p>
                      <p className="text-2xl font-bold text-gray-900">{formatTime(result.timeTillSober)}</p>
                      <p className="text-xs text-gray-500 mt-1">Around {result.soberTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-purple-200">
                    <CardContent className="p-6">
                      <Info className="h-10 w-10 text-purple-600 mb-3" />
                      <p className="text-sm text-gray-600 mb-1">Total Alcohol Consumed</p>
                      <p className="text-2xl font-bold text-gray-900">{result.totalAlcoholGrams.toFixed(1)}g</p>
                      <p className="text-xs text-gray-500 mt-1">{result.standardDrinks.toFixed(1)} standard drinks</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-indigo-200">
                    <CardContent className="p-6">
                      <TrendingDown className="h-10 w-10 text-indigo-600 mb-3" />
                      <p className="text-sm text-gray-600 mb-1">Metabolism Rate</p>
                      <p className="text-2xl font-bold text-gray-900">{result.metabolismRate.toFixed(3)}%/hr</p>
                      <p className="text-xs text-gray-500 mt-1">Typical rate for most people</p>
                    </CardContent>
                  </Card>
                </div>

                {/* BAC Effects Chart */}
                <Card className="shadow-lg border-2 border-gray-200">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50">
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <Info className="h-6 w-6" />
                      BAC Effects and Impairment Levels
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className={`p-4 rounded-lg border-2 ${result.currentBAC < 0.02 ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                        <p className="font-bold text-gray-900 mb-1">0.00 - 0.02%: No Visible Effects</p>
                        <p className="text-sm text-gray-700">No noticeable impairment. Normal behavior and coordination.</p>
                      </div>

                      <div className={`p-4 rounded-lg border-2 ${result.currentBAC >= 0.02 && result.currentBAC < 0.05 ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-gray-50'}`}>
                        <p className="font-bold text-gray-900 mb-1">0.02 - 0.05%: Mild Impairment</p>
                        <p className="text-sm text-gray-700">Slight relaxation, talkativeness, decreased judgment. Minor impairment of reasoning and memory.</p>
                      </div>

                      <div className={`p-4 rounded-lg border-2 ${result.currentBAC >= 0.05 && result.currentBAC < 0.08 ? 'border-orange-300 bg-orange-50' : 'border-gray-200 bg-gray-50'}`}>
                        <p className="font-bold text-gray-900 mb-1">0.05 - 0.08%: Moderate Impairment</p>
                        <p className="text-sm text-gray-700">Reduced coordination, slowed reaction time, impaired judgment. Difficulty steering and maintaining lane position.</p>
                      </div>

                      <div className={`p-4 rounded-lg border-2 ${result.currentBAC >= 0.08 && result.currentBAC < 0.10 ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                        <p className="font-bold text-gray-900 mb-1">0.08 - 0.10%: Significant Impairment (ILLEGAL)</p>
                        <p className="text-sm text-gray-700">Reduced concentration, short-term memory loss, impaired perception, poor muscle coordination. <strong>Legally intoxicated in all US states.</strong></p>
                      </div>

                      <div className={`p-4 rounded-lg border-2 ${result.currentBAC >= 0.10 && result.currentBAC < 0.15 ? 'border-red-400 bg-red-100' : 'border-gray-200 bg-gray-50'}`}>
                        <p className="font-bold text-gray-900 mb-1">0.10 - 0.15%: Severe Impairment</p>
                        <p className="text-sm text-gray-700">Slurred speech, poor coordination, slowed thinking. Significant impairment of motor control and judgment.</p>
                      </div>

                      <div className={`p-4 rounded-lg border-2 ${result.currentBAC >= 0.15 && result.currentBAC < 0.30 ? 'border-red-500 bg-red-100' : 'border-gray-200 bg-gray-50'}`}>
                        <p className="font-bold text-gray-900 mb-1">0.15 - 0.30%: Extreme Impairment</p>
                        <p className="text-sm text-gray-700">Loss of balance, vomiting, memory blackouts. Risk of falling and injury. Medical attention may be needed.</p>
                      </div>

                      <div className={`p-4 rounded-lg border-2 ${result.currentBAC >= 0.30 ? 'border-red-600 bg-red-200' : 'border-gray-200 bg-gray-50'}`}>
                        <p className="font-bold text-gray-900 mb-1">&gt; 0.30%: Life-Threatening</p>
                        <p className="text-sm text-gray-700">Risk of unconsciousness, respiratory failure, coma, and death. <strong>SEEK IMMEDIATE MEDICAL HELP.</strong></p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Legal Notice */}
                <Card className="shadow-lg border-2 border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-red-900 text-lg mb-2">Important Legal & Safety Information</h3>
                        <ul className="text-sm text-red-900 space-y-2">
                          <li>• <strong>This calculator provides estimates only.</strong> Actual BAC can vary based on many factors including metabolism, food intake, medications, and health conditions.</li>
                          <li>• <strong>Never drink and drive.</strong> Even small amounts of alcohol impair driving ability. Always use designated drivers, taxis, or rideshare services.</li>
                          <li>• <strong>Legal limits vary by jurisdiction.</strong> In the US, 0.08% is the limit for drivers 21+, but 0.02% for drivers under 21 and commercial drivers may have 0.04% limits.</li>
                          <li>• <strong>Impairment begins before legal limits.</strong> You can be impaired and arrested for DUI even below 0.08%.</li>
                          <li>• <strong>Seek medical help if needed.</strong> High BAC levels can be life-threatening. Call 911 if someone is unconscious or has trouble breathing.</li>
                          <li>• <strong>This tool is for educational purposes only</strong> and should not be used to determine fitness to drive or operate machinery.</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center text-gray-500">
                <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Enter your information and drinks consumed, then click "Calculate BAC" to see your estimated blood alcohol content and when it's safe to drive</p>
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left max-w-md mx-auto">
                  <p className="text-sm text-yellow-900">
                    <strong>⚠️ Remember:</strong> This calculator provides estimates only. Never rely solely on calculators to determine if you're safe to drive. When in doubt, don't drive.
                  </p>
                </div>
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
              <h3 className="text-2xl font-bold text-gray-900">Share BAC Calculator</h3>
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
              Share this BAC calculator to help others understand alcohol's effects and promote responsible drinking.
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

