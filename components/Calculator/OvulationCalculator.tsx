'use client';

import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Calendar, Heart, TrendingUp, Info, Sparkles } from 'lucide-react';

interface OvulationInputs {
  lastPeriodDate: string;
  cycleLength: string;
  periodLength: string;
}

interface OvulationResult {
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  nextPeriodDate: Date;
  pregnancyTestDate: Date;
  peakFertilityDays: Date[];
  calendar: Array<{
    month: string;
    ovulationDate: Date;
    fertileStart: Date;
    fertileEnd: Date;
    periodDate: Date;
  }>;
  cyclePhases: {
    menstrual: { start: Date; end: Date };
    follicular: { start: Date; end: Date };
    ovulation: { start: Date; end: Date };
    luteal: { start: Date; end: Date };
  };
}

export default function OvulationCalculator() {
  const [inputs, setInputs] = useState<OvulationInputs>({
    lastPeriodDate: '',
    cycleLength: '28',
    periodLength: '5',
  });

  const [result, setResult] = useState<OvulationResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Load data from URL parameters
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const d = params.get('d');
    const c = params.get('c');

    if (d && c) {
      const newInputs: Partial<OvulationInputs> = {
        lastPeriodDate: d,
        cycleLength: c,
      };

      setInputs(prev => ({ ...prev, ...newInputs }));
      
      setTimeout(() => {
        calculate({ ...inputs, ...newInputs } as OvulationInputs);
      }, 100);
    }
  }, []);

  const handleInputChange = (field: keyof OvulationInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!inputs.lastPeriodDate) {
      newErrors.lastPeriodDate = 'Please enter the first day of your last period';
    } else {
      const lpDate = new Date(inputs.lastPeriodDate);
      const today = new Date();
      const maxPast = new Date();
      maxPast.setMonth(maxPast.getMonth() - 3);
      
      if (lpDate > today) {
        newErrors.lastPeriodDate = 'Date cannot be in the future';
      } else if (lpDate < maxPast) {
        newErrors.lastPeriodDate = 'Date seems too far in the past';
      }
    }

    const cycleLength = parseInt(inputs.cycleLength);
    if (!inputs.cycleLength || isNaN(cycleLength) || cycleLength < 21 || cycleLength > 35) {
      newErrors.cycleLength = 'Cycle length should be between 21 and 35 days';
    }

    const periodLength = parseInt(inputs.periodLength);
    if (!inputs.periodLength || isNaN(periodLength) || periodLength < 2 || periodLength > 10) {
      newErrors.periodLength = 'Period length should be between 2 and 10 days';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = (inputData?: OvulationInputs) => {
    const data = inputData || inputs;
    
    if (!validate() && !inputData) return;

    const lastPeriodDate = new Date(data.lastPeriodDate);
    const cycleLength = parseInt(data.cycleLength);
    const periodLength = parseInt(data.periodLength);

    // Ovulation typically occurs 14 days before next period
    const daysToOvulation = cycleLength - 14;
    const ovulationDate = new Date(lastPeriodDate);
    ovulationDate.setDate(ovulationDate.getDate() + daysToOvulation);

    // Fertile window: 5 days before ovulation to 1 day after
    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);
    
    const fertileWindowEnd = new Date(ovulationDate);
    fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 1);

    // Peak fertility: 2 days before ovulation to ovulation day
    const peakFertilityDays = [
      new Date(ovulationDate.getTime() - 2 * 24 * 60 * 60 * 1000),
      new Date(ovulationDate.getTime() - 1 * 24 * 60 * 60 * 1000),
      new Date(ovulationDate.getTime()),
    ];

    // Next period date
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

    // Best time to take pregnancy test: first day of missed period
    const pregnancyTestDate = new Date(nextPeriodDate);

    // Calculate 6 cycles ahead for calendar
    const calendar = [];
    for (let i = 0; i < 6; i++) {
      const cycleStart = new Date(lastPeriodDate);
      cycleStart.setDate(cycleStart.getDate() + (cycleLength * i));
      
      const cycleOvulation = new Date(cycleStart);
      cycleOvulation.setDate(cycleOvulation.getDate() + daysToOvulation);
      
      const cycleFertileStart = new Date(cycleOvulation);
      cycleFertileStart.setDate(cycleFertileStart.getDate() - 5);
      
      const cycleFertileEnd = new Date(cycleOvulation);
      cycleFertileEnd.setDate(cycleFertileEnd.getDate() + 1);
      
      const cyclePeriod = new Date(cycleStart);
      cyclePeriod.setDate(cyclePeriod.getDate() + cycleLength);

      calendar.push({
        month: cycleStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        ovulationDate: cycleOvulation,
        fertileStart: cycleFertileStart,
        fertileEnd: cycleFertileEnd,
        periodDate: cyclePeriod,
      });
    }

    // Cycle phases
    const menstrualEnd = new Date(lastPeriodDate);
    menstrualEnd.setDate(menstrualEnd.getDate() + periodLength - 1);

    const follicularEnd = new Date(ovulationDate);
    follicularEnd.setDate(follicularEnd.getDate() - 1);

    const ovulationPhaseEnd = new Date(ovulationDate);
    ovulationPhaseEnd.setDate(ovulationPhaseEnd.getDate() + 1);

    const lutealEnd = new Date(nextPeriodDate);
    lutealEnd.setDate(lutealEnd.getDate() - 1);

    const cyclePhases = {
      menstrual: { start: lastPeriodDate, end: menstrualEnd },
      follicular: { start: new Date(menstrualEnd.getTime() + 24 * 60 * 60 * 1000), end: follicularEnd },
      ovulation: { start: ovulationDate, end: ovulationPhaseEnd },
      luteal: { start: new Date(ovulationPhaseEnd.getTime() + 24 * 60 * 60 * 1000), end: lutealEnd },
    };

    const resultData: OvulationResult = {
      ovulationDate,
      fertileWindowStart,
      fertileWindowEnd,
      nextPeriodDate,
      pregnancyTestDate,
      peakFertilityDays,
      calendar,
      cyclePhases,
    };

    setResult(resultData);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDateLong = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    
    const params = new URLSearchParams({
      d: inputs.lastPeriodDate,
      c: inputs.cycleLength,
    });
    
    const url = `${baseUrl}/ovulation-calculator?${params.toString()}`;
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
      ? `My ovulation date is ${formatDate(result.ovulationDate)}!`
      : 'Calculate your ovulation date';
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
        url = `mailto:?subject=${encodeURIComponent('Ovulation Calculator')}&body=${encodedText}%20${encodedUrl}`;
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
      link.download = `ovulation-calendar-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Ovulation Calendar</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="Ovulation Calendar" /></body>
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
            <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-pink-600" />
                Ovulation Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Last Period Date */}
              <div className="space-y-2">
                <Label htmlFor="lastPeriodDate" className="text-sm font-medium">
                  First Day of Last Period <span className="text-red-500">*</span>
                </Label>
                <input
                  id="lastPeriodDate"
                  type="date"
                  value={inputs.lastPeriodDate}
                  onChange={(e) => handleInputChange('lastPeriodDate', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.lastPeriodDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.lastPeriodDate && (
                  <p className="text-sm text-red-600">{errors.lastPeriodDate}</p>
                )}
              </div>

              {/* Cycle Length */}
              <div className="space-y-2">
                <Label htmlFor="cycleLength" className="text-sm font-medium">
                  Average Cycle Length (days) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="cycleLength"
                  type="number"
                  value={inputs.cycleLength}
                  onChange={(e) => handleInputChange('cycleLength', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.cycleLength ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="28"
                  min="21"
                  max="35"
                />
                {errors.cycleLength && (
                  <p className="text-sm text-red-600">{errors.cycleLength}</p>
                )}
                <p className="text-xs text-gray-500">Typical range: 21-35 days (average 28)</p>
              </div>

              {/* Period Length */}
              <div className="space-y-2">
                <Label htmlFor="periodLength" className="text-sm font-medium">
                  Period Duration (days) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="periodLength"
                  type="number"
                  value={inputs.periodLength}
                  onChange={(e) => handleInputChange('periodLength', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.periodLength ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="5"
                  min="2"
                  max="10"
                />
                {errors.periodLength && (
                  <p className="text-sm text-red-600">{errors.periodLength}</p>
                )}
                <p className="text-xs text-gray-500">Typical range: 3-7 days (average 5)</p>
              </div>

              {/* Info Box */}
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-pink-900">
                    <p className="font-medium mb-1">About Ovulation</p>
                    <p className="text-xs">
                      Ovulation typically occurs 12-16 days before your next period. The fertile window is 5-6 days, with peak fertility in the 2 days before ovulation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={() => calculate()}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Ovulation
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Ovulation Calendar</h2>
                  <p className="text-sm text-gray-600">
                    Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                {/* Main Ovulation Date */}
                <Card className="shadow-lg border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50">
                  <CardContent className="p-8 text-center">
                    <Sparkles className="h-16 w-16 text-pink-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Ovulation Date</h3>
                    <p className="text-4xl font-bold text-pink-600 mb-4">{formatDateLong(result.ovulationDate)}</p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Fertile Window Starts</p>
                        <p className="text-lg font-bold text-gray-900">{formatDate(result.fertileWindowStart)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Fertile Window Ends</p>
                        <p className="text-lg font-bold text-gray-900">{formatDate(result.fertileWindowEnd)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Peak Fertility Days */}
                <Card className="shadow-lg border-2 border-rose-200">
                  <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50">
                    <CardTitle className="flex items-center gap-2 text-rose-900">
                      <Heart className="h-6 w-6" />
                      Peak Fertility Days
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600 mb-4">
                      Your highest chance of conception is during these days:
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {result.peakFertilityDays.map((day, index) => (
                        <div key={index} className="text-center p-4 bg-rose-50 rounded-lg border border-rose-200">
                          <p className="text-xs text-gray-600 mb-1">Day {index + 1}</p>
                          <p className="text-sm font-bold text-gray-900">{formatDate(day)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-rose-100 rounded-lg">
                      <p className="text-sm text-rose-900">
                        💡 <strong>Tip:</strong> The 2 days before ovulation and ovulation day itself offer the best chance for conception.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Period & Pregnancy Test */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="shadow-lg border-2 border-purple-200">
                    <CardContent className="p-6 text-center">
                      <Calendar className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-2">Next Period Expected</p>
                      <p className="text-2xl font-bold text-gray-900">{formatDate(result.nextPeriodDate)}</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-blue-200">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-2">Pregnancy Test Date</p>
                      <p className="text-2xl font-bold text-gray-900">{formatDate(result.pregnancyTestDate)}</p>
                      <p className="text-xs text-gray-500 mt-2">First day of missed period</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Cycle Phases */}
                <Card className="shadow-lg border-2 border-indigo-200">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <CardTitle className="flex items-center gap-2 text-indigo-900">
                      <TrendingUp className="h-6 w-6" />
                      Menstrual Cycle Phases
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <p className="font-medium text-gray-900 mb-1">Menstrual Phase</p>
                      <p className="text-sm text-gray-700">
                        {formatDate(result.cyclePhases.menstrual.start)} - {formatDate(result.cyclePhases.menstrual.end)}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Period days - shedding of uterine lining</p>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="font-medium text-gray-900 mb-1">Follicular Phase</p>
                      <p className="text-sm text-gray-700">
                        {formatDate(result.cyclePhases.follicular.start)} - {formatDate(result.cyclePhases.follicular.end)}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Egg matures in ovarian follicle</p>
                    </div>

                    <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                      <p className="font-medium text-gray-900 mb-1">Ovulation Phase</p>
                      <p className="text-sm text-gray-700">
                        {formatDate(result.cyclePhases.ovulation.start)} - {formatDate(result.cyclePhases.ovulation.end)}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Egg is released - most fertile time</p>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="font-medium text-gray-900 mb-1">Luteal Phase</p>
                      <p className="text-sm text-gray-700">
                        {formatDate(result.cyclePhases.luteal.start)} - {formatDate(result.cyclePhases.luteal.end)}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Uterine lining thickens for possible pregnancy</p>
                    </div>
                  </CardContent>
                </Card>

                {/* 6-Month Calendar */}
                <Card className="shadow-lg border-2 border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardTitle className="flex items-center gap-2 text-green-900">
                      <Calendar className="h-6 w-6" />
                      6-Month Fertility Calendar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {result.calendar.map((cycle, index) => (
                        <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="font-bold text-gray-900 mb-3">{cycle.month}</p>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600 mb-1">Ovulation:</p>
                              <p className="font-semibold text-gray-900">{formatDate(cycle.ovulationDate)}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1">Next Period:</p>
                              <p className="font-semibold text-gray-900">{formatDate(cycle.periodDate)}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-gray-600 mb-1">Fertile Window:</p>
                              <p className="font-semibold text-gray-900">
                                {formatDate(cycle.fertileStart)} - {formatDate(cycle.fertileEnd)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center text-gray-500">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Enter your cycle information and click "Calculate Ovulation" to see your fertile window, peak fertility days, and 6-month calendar</p>
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
              <h3 className="text-2xl font-bold text-gray-900">Share Your Calendar</h3>
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
              Share your ovulation calendar with your partner or save for reference.
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

