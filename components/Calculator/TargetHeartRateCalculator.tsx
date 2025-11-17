'use client';

import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Heart, Activity, Info } from 'lucide-react';

interface HeartRateInputs {
  age: string;
  restingHeartRate: string;
}

interface HeartRateZone {
  name: string;
  percentage: string;
  min: number;
  max: number;
  description: string;
  benefits: string;
  color: string;
}

export default function TargetHeartRateCalculator() {
  const [inputs, setInputs] = useState<HeartRateInputs>({
    age: '',
    restingHeartRate: '70',
  });

  const [results, setResults] = useState<{
    maxHeartRate: number;
    zones: HeartRateZone[];
  } | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof HeartRateInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    const age = parseFloat(inputs.age);
    const rhr = parseFloat(inputs.restingHeartRate);

    if (!inputs.age || isNaN(age) || age < 10 || age > 100) {
      newErrors.age = 'Please enter a valid age between 10 and 100';
    }

    if (!inputs.restingHeartRate || isNaN(rhr) || rhr < 30 || rhr > 120) {
      newErrors.restingHeartRate = 'Please enter a valid resting heart rate between 30 and 120 bpm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    if (!validate()) return;

    const age = parseFloat(inputs.age);
    const rhr = parseFloat(inputs.restingHeartRate);

    // Maximum Heart Rate using simple formula: 220 - age
    const maxHeartRate = 220 - age;

    // Heart Rate Reserve (HRR) = Max HR - Resting HR
    const hrr = maxHeartRate - rhr;

    // Calculate zones using Karvonen formula: (HRR × %Intensity) + Resting HR
    const zones: HeartRateZone[] = [
      {
        name: 'Zone 1: Warm-up',
        percentage: '50-60%',
        min: Math.round(hrr * 0.50 + rhr),
        max: Math.round(hrr * 0.60 + rhr),
        description: 'Very light intensity - comfortable conversation pace',
        benefits: 'Recovery, warm-up, cool-down, beginners starting exercise',
        color: 'bg-gray-100 border-gray-300',
      },
      {
        name: 'Zone 2: Fat Burning',
        percentage: '60-70%',
        min: Math.round(hrr * 0.60 + rhr),
        max: Math.round(hrr * 0.70 + rhr),
        description: 'Light to moderate intensity - can still talk comfortably',
        benefits: 'Fat burning, building aerobic endurance, improving metabolism',
        color: 'bg-green-100 border-green-300',
      },
      {
        name: 'Zone 3: Aerobic',
        percentage: '70-80%',
        min: Math.round(hrr * 0.70 + rhr),
        max: Math.round(hrr * 0.80 + rhr),
        description: 'Moderate to vigorous intensity - breathing harder but can speak in short sentences',
        benefits: 'Cardiovascular fitness, improved aerobic capacity, endurance',
        color: 'bg-blue-100 border-blue-300',
      },
      {
        name: 'Zone 4: Anaerobic',
        percentage: '80-90%',
        min: Math.round(hrr * 0.80 + rhr),
        max: Math.round(hrr * 0.90 + rhr),
        description: 'Hard intensity - difficult to speak more than a few words',
        benefits: 'Speed and power training, improved lactate threshold, performance',
        color: 'bg-orange-100 border-orange-300',
      },
      {
        name: 'Zone 5: Maximum Effort',
        percentage: '90-100%',
        min: Math.round(hrr * 0.90 + rhr),
        max: Math.round(hrr * 1.00 + rhr),
        description: 'Maximum intensity - cannot speak, only sustainable for short bursts',
        benefits: 'Maximum effort training, anaerobic capacity, peak performance',
        color: 'bg-red-100 border-red-300',
      },
    ];

    setResults({ maxHeartRate, zones });
  };

  // Load data from URL parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const a = params.get('a'); // age
    const r = params.get('r'); // resting heart rate

    if (a && r) {
      const newInputs: HeartRateInputs = {
        age: a,
        restingHeartRate: r,
      };
      setInputs(newInputs);
      
      // Auto-calculate after a short delay
      setTimeout(() => {
        const age = parseFloat(a);
        const rhr = parseFloat(r);
        
        if (!isNaN(age) && !isNaN(rhr)) {
          const maxHeartRate = 220 - age;
          const hrr = maxHeartRate - rhr;

          const zones: HeartRateZone[] = [
            {
              name: 'Zone 1: Warm-up',
              percentage: '50-60%',
              min: Math.round(hrr * 0.50 + rhr),
              max: Math.round(hrr * 0.60 + rhr),
              description: 'Very light intensity - comfortable conversation pace',
              benefits: 'Recovery, warm-up, cool-down, beginners starting exercise',
              color: 'bg-gray-100 border-gray-300',
            },
            {
              name: 'Zone 2: Fat Burning',
              percentage: '60-70%',
              min: Math.round(hrr * 0.60 + rhr),
              max: Math.round(hrr * 0.70 + rhr),
              description: 'Light to moderate intensity - can still talk comfortably',
              benefits: 'Fat burning, building aerobic endurance, improving metabolism',
              color: 'bg-green-100 border-green-300',
            },
            {
              name: 'Zone 3: Aerobic',
              percentage: '70-80%',
              min: Math.round(hrr * 0.70 + rhr),
              max: Math.round(hrr * 0.80 + rhr),
              description: 'Moderate to vigorous intensity - breathing harder but can speak in short sentences',
              benefits: 'Cardiovascular fitness, improved aerobic capacity, endurance',
              color: 'bg-blue-100 border-blue-300',
            },
            {
              name: 'Zone 4: Anaerobic',
              percentage: '80-90%',
              min: Math.round(hrr * 0.80 + rhr),
              max: Math.round(hrr * 0.90 + rhr),
              description: 'Hard intensity - difficult to speak more than a few words',
              benefits: 'Speed and power training, improved lactate threshold, performance',
              color: 'bg-orange-100 border-orange-300',
            },
            {
              name: 'Zone 5: Maximum Effort',
              percentage: '90-100%',
              min: Math.round(hrr * 0.90 + rhr),
              max: Math.round(hrr * 1.00 + rhr),
              description: 'Maximum intensity - cannot speak, only sustainable for short bursts',
              benefits: 'Maximum effort training, anaerobic capacity, peak performance',
              color: 'bg-red-100 border-red-300',
            },
          ];

          setResults({ maxHeartRate, zones });
        }
      }, 100);
    }
  }, []);

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    const params = new URLSearchParams({
      a: inputs.age.toString(),
      r: inputs.restingHeartRate.toString(),
    });
    
    const url = `${baseUrl}/target-heart-rate-calculator?${params.toString()}`;
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
    const text = `Check out my heart rate training zones: Max HR ${results?.maxHeartRate} bpm, Zone 2 (Fat Burning) ${results?.zones[1].min}-${results?.zones[1].max} bpm`;
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
        url = `mailto:?subject=${encodeURIComponent('My Heart Rate Training Zones')}&body=${encodedText}%20${encodedUrl}`;
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
      link.download = `heart-rate-zones-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Heart Rate Training Zones Report</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="Heart Rate Training Zones Report" /></body>
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

  const getAgeSpecificAdvice = () => {
    const age = parseFloat(inputs.age);
    if (isNaN(age)) return '';

    if (age < 20) {
      return 'As a younger individual, your cardiovascular system recovers quickly. Focus on building aerobic base with zones 2-3.';
    } else if (age < 30) {
      return 'You\'re in your prime fitness years. Mix all training zones for optimal fitness and performance.';
    } else if (age < 40) {
      return 'Focus on maintaining cardiovascular health. Include regular aerobic training (zones 2-3) with occasional high-intensity work.';
    } else if (age < 50) {
      return 'Prioritize heart health with consistent aerobic exercise. Warm-up and cool-down become increasingly important.';
    } else if (age < 60) {
      return 'Moderate intensity training (zones 2-3) provides excellent health benefits. Consult your doctor before high-intensity training.';
    } else {
      return 'Focus on gentle to moderate exercise. Always consult your healthcare provider before starting a new exercise program.';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Heart Rate Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium flex items-center gap-2">
                  Age (years) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="age"
                  type="number"
                  value={inputs.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
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

              {/* Resting Heart Rate */}
              <div className="space-y-2">
                <Label htmlFor="restingHeartRate" className="text-sm font-medium flex items-center gap-2">
                  Resting Heart Rate (bpm) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="restingHeartRate"
                  type="number"
                  value={inputs.restingHeartRate}
                  onChange={(e) => handleInputChange('restingHeartRate', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.restingHeartRate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="70"
                  min="30"
                  max="120"
                />
                {errors.restingHeartRate && (
                  <p className="text-sm text-red-600">{errors.restingHeartRate}</p>
                )}
                <p className="text-xs text-gray-500">
                  Default: 70 bpm (average adult). Measure first thing in the morning before getting out of bed.
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">How to measure resting heart rate:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Measure first thing in the morning</li>
                      <li>• Before getting out of bed</li>
                      <li>• Count pulse for 60 seconds</li>
                      <li>• Use wrist or neck pulse point</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculate}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Heart Rate Zones
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          {results ? (
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Heart Rate Training Zones Report</h2>
                  <p className="text-sm text-gray-600">
                    Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-600">
                    Age {inputs.age}, Resting HR {inputs.restingHeartRate} bpm
                  </p>
                </div>

              {/* Maximum Heart Rate */}
              <Card className="shadow-lg border-2 border-red-200">
                <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2 text-red-900">
                    <Heart className="h-6 w-6" />
                    Maximum Heart Rate
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-5xl sm:text-6xl font-bold text-red-600 mb-2">
                      {results.maxHeartRate}
                    </div>
                    <div className="text-lg text-gray-600">beats per minute (bpm)</div>
                    <p className="text-sm text-gray-500 mt-3">
                      Based on the formula: 220 - Age
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Heart Rate Zones */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-6 w-6 text-red-600" />
                    Training Heart Rate Zones (Karvonen Formula)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  {results.zones.map((zone, index) => (
                    <div
                      key={index}
                      className={`border-2 rounded-lg p-4 ${zone.color}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{zone.name}</h3>
                          <p className="text-sm text-gray-600">{zone.percentage} of max HR</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {zone.min}-{zone.max}
                          </div>
                          <div className="text-sm text-gray-600">bpm</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Intensity:</strong> {zone.description}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Benefits:</strong> {zone.benefits}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Age-Specific Advice */}
              {inputs.age && (
                <Card className="shadow-lg border-2 border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="flex items-center gap-2 text-blue-900">
                      <Info className="h-6 w-6" />
                      Personalized Training Advice
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700">{getAgeSpecificAdvice()}</p>
                  </CardContent>
                </Card>
              )}

              {/* Training Recommendations */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2 text-green-900">
                    <Activity className="h-6 w-6" />
                    Training Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">Beginner Training</h4>
                      <p className="text-sm text-gray-700">
                        Focus 80% of training in Zones 1-2 (warm-up and fat burning). Gradually increase duration before intensity.
                        Start with 20-30 minutes, 3-4 times per week.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">Intermediate Training</h4>
                      <p className="text-sm text-gray-700">
                        Mix 70% in Zones 2-3 (aerobic base) with 20% in Zone 4 (threshold work) and 10% easy recovery.
                        Include 1-2 high-intensity sessions per week.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">Advanced Training</h4>
                      <p className="text-sm text-gray-700">
                        Periodize training with 60-70% Zone 2-3, 20-25% Zone 4, and 5-10% Zone 5. Include proper recovery
                        and periodization for peak performance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Heart Rate Monitoring Tips */}
              <Card className="shadow-lg border-2 border-purple-200">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="text-purple-900">Heart Rate Monitoring Tips</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <Heart className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Use a Heart Rate Monitor:</strong> Chest straps are most accurate. Wrist-based monitors are convenient
                        but may be less accurate during high-intensity exercise.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Heart className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Individual Variation:</strong> These zones are estimates. Listen to your body and adjust based on how
                        you feel. Some people have naturally higher or lower heart rates.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Heart className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Factors Affecting Heart Rate:</strong> Heat, humidity, altitude, stress, caffeine, medications, and
                        illness can all affect your heart rate during exercise.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Heart className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>When to See a Doctor:</strong> If your resting heart rate is consistently above 100 or below 40 (unless
                        you're a trained athlete), or if you experience chest pain, dizziness, or irregular heartbeat during exercise.
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              </div>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center text-gray-500">
                <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Enter your information and click "Calculate Heart Rate Zones" to see your personalized training zones</p>
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
              Share your heart rate training zones with friends and training partners. They'll see your inputs and can calculate their own zones.
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
                <strong className="text-blue-600">💡 Tip:</strong> The link will auto-fill your training partner's calculator with your data. They can then adjust and calculate their own zones.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

