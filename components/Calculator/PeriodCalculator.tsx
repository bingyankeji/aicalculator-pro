'use client';

import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Calendar, AlertCircle, Info, TrendingUp, Heart } from 'lucide-react';

interface PeriodInputs {
  lastPeriodDate: string;
  cycleLength: string;
  periodLength: string;
}

interface PeriodResult {
  nextPeriodDate: Date;
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  pmsStartDate: Date;
  calendar: Array<{
    month: string;
    periodStart: Date;
    periodEnd: Date;
    ovulationDate: Date;
    fertileStart: Date;
    fertileEnd: Date;
    pmsStart: Date;
  }>;
  cycleRegularity: 'regular' | 'slightly-irregular' | 'irregular';
  averageCycleLength: number;
  daysUntilNextPeriod: number;
}

export default function PeriodCalculator() {
  const [inputs, setInputs] = useState<PeriodInputs>({
    lastPeriodDate: '',
    cycleLength: '28',
    periodLength: '5',
  });

  const [result, setResult] = useState<PeriodResult | null>(null);
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
    const p = params.get('p');

    if (d) {
      const newInputs: Partial<PeriodInputs> = {
        lastPeriodDate: d,
      };
      if (c) newInputs.cycleLength = c;
      if (p) newInputs.periodLength = p;

      setInputs(prev => ({ ...prev, ...newInputs }));
      
      setTimeout(() => {
        calculate({ ...inputs, ...newInputs } as PeriodInputs);
      }, 100);
    }
  }, []);

  const handleInputChange = (field: keyof PeriodInputs, value: string) => {
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
      maxPast.setMonth(maxPast.getMonth() - 6);
      
      if (lpDate > today) {
        newErrors.lastPeriodDate = 'Date cannot be in the future';
      } else if (lpDate < maxPast) {
        newErrors.lastPeriodDate = 'Date seems too far in the past (max 6 months)';
      }
    }

    const cycleLength = parseInt(inputs.cycleLength);
    if (!inputs.cycleLength || isNaN(cycleLength) || cycleLength < 21 || cycleLength > 45) {
      newErrors.cycleLength = 'Cycle length should be between 21 and 45 days';
    }

    const periodLength = parseInt(inputs.periodLength);
    if (!inputs.periodLength || isNaN(periodLength) || periodLength < 2 || periodLength > 10) {
      newErrors.periodLength = 'Period length should be between 2 and 10 days';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getCycleRegularity = (cycleLength: number): 'regular' | 'slightly-irregular' | 'irregular' => {
    if (cycleLength >= 24 && cycleLength <= 32) {
      return 'regular';
    } else if (cycleLength >= 21 && cycleLength <= 35) {
      return 'slightly-irregular';
    } else {
      return 'irregular';
    }
  };

  const calculate = (inputData?: PeriodInputs) => {
    const data = inputData || inputs;
    
    if (!validate() && !inputData) return;

    const lastPeriodDate = new Date(data.lastPeriodDate);
    const cycleLength = parseInt(data.cycleLength);
    const periodLength = parseInt(data.periodLength);

    // Next period date
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

    // Days until next period
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysUntilNextPeriod = Math.ceil((nextPeriodDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Ovulation (typically 14 days before next period)
    const ovulationDate = new Date(nextPeriodDate);
    ovulationDate.setDate(ovulationDate.getDate() - 14);

    // Fertile window (5 days before ovulation to 1 day after)
    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);
    
    const fertileWindowEnd = new Date(ovulationDate);
    fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 1);

    // PMS symptoms typically start 5-11 days before period
    const pmsStartDate = new Date(nextPeriodDate);
    pmsStartDate.setDate(pmsStartDate.getDate() - 7);

    // Calculate 6 cycles ahead for calendar
    const calendar = [];
    for (let i = 0; i < 6; i++) {
      const cycleStart = new Date(lastPeriodDate);
      cycleStart.setDate(cycleStart.getDate() + (cycleLength * i));
      
      const cycleEnd = new Date(cycleStart);
      cycleEnd.setDate(cycleEnd.getDate() + periodLength - 1);

      const nextPeriod = new Date(cycleStart);
      nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
      
      const cycleOvulation = new Date(nextPeriod);
      cycleOvulation.setDate(cycleOvulation.getDate() - 14);
      
      const cycleFertileStart = new Date(cycleOvulation);
      cycleFertileStart.setDate(cycleFertileStart.getDate() - 5);
      
      const cycleFertileEnd = new Date(cycleOvulation);
      cycleFertileEnd.setDate(cycleFertileEnd.getDate() + 1);

      const cyclePmsStart = new Date(nextPeriod);
      cyclePmsStart.setDate(cyclePmsStart.getDate() - 7);

      calendar.push({
        month: cycleStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        periodStart: cycleStart,
        periodEnd: cycleEnd,
        ovulationDate: cycleOvulation,
        fertileStart: cycleFertileStart,
        fertileEnd: cycleFertileEnd,
        pmsStart: cyclePmsStart,
      });
    }

    const cycleRegularity = getCycleRegularity(cycleLength);

    const resultData: PeriodResult = {
      nextPeriodDate,
      ovulationDate,
      fertileWindowStart,
      fertileWindowEnd,
      pmsStartDate,
      calendar,
      cycleRegularity,
      averageCycleLength: cycleLength,
      daysUntilNextPeriod,
    };

    setResult(resultData);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDateLong = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getRegularityLabel = (regularity: string) => {
    switch (regularity) {
      case 'regular':
        return { text: 'Regular Cycle', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
      case 'slightly-irregular':
        return { text: 'Slightly Irregular', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' };
      case 'irregular':
        return { text: 'Irregular Cycle', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
      default:
        return { text: 'Unknown', color: 'text-gray-600', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' };
    }
  };

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    
    const params = new URLSearchParams({
      d: inputs.lastPeriodDate,
      c: inputs.cycleLength,
      p: inputs.periodLength,
    });
    
    const url = `${baseUrl}/period-calculator?${params.toString()}`;
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
      ? `My next period is predicted for ${formatDate(result.nextPeriodDate)}`
      : 'Track your menstrual cycle';
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
        url = `mailto:?subject=${encodeURIComponent('Period Calendar')}&body=${encodedText}%20${encodedUrl}`;
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
      link.download = `period-calendar-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Period Calendar</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="Period Calendar" /></body>
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
            <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-rose-600" />
                Period Calculator
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent ${
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent ${
                    errors.cycleLength ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="28"
                  min="21"
                  max="45"
                />
                {errors.cycleLength && (
                  <p className="text-sm text-red-600">{errors.cycleLength}</p>
                )}
                <p className="text-xs text-gray-500">Typical range: 21-35 days (average 28)</p>
              </div>

              {/* Period Length */}
              <div className="space-y-2">
                <Label htmlFor="periodLength" className="text-sm font-medium">
                  Period Duration (days) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="periodLength"
                  type="number"
                  value={inputs.periodLength}
                  onChange={(e) => handleInputChange('periodLength', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent ${
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
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-rose-900">
                    <p className="font-medium mb-1">Track Your Cycle</p>
                    <p className="text-xs">
                      Understanding your menstrual cycle helps you predict periods, fertile days, and PMS symptoms. A regular cycle is typically 24-32 days.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={() => calculate()}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Next Period
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Period Calendar</h2>
                  <p className="text-sm text-gray-600">
                    Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                {/* Main Next Period Date */}
                <Card className="shadow-lg border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50">
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-16 w-16 text-rose-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Next Period</h3>
                    <p className="text-4xl font-bold text-rose-600 mb-2">{formatDateLong(result.nextPeriodDate)}</p>
                    <p className="text-lg text-gray-600">
                      {result.daysUntilNextPeriod > 0 
                        ? `in ${result.daysUntilNextPeriod} day${result.daysUntilNextPeriod > 1 ? 's' : ''}`
                        : result.daysUntilNextPeriod === 0
                        ? 'Today!'
                        : `${Math.abs(result.daysUntilNextPeriod)} day${Math.abs(result.daysUntilNextPeriod) > 1 ? 's' : ''} overdue`
                      }
                    </p>
                  </CardContent>
                </Card>

                {/* Cycle Regularity Status */}
                <Card className={`shadow-lg border-2 ${getRegularityLabel(result.cycleRegularity).borderColor}`}>
                  <CardContent className={`p-6 ${getRegularityLabel(result.cycleRegularity).bgColor}`}>
                    <div className="flex items-center gap-4">
                      <TrendingUp className={`h-10 w-10 ${getRegularityLabel(result.cycleRegularity).color}`} />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Cycle Analysis</h3>
                        <p className={`text-sm font-semibold ${getRegularityLabel(result.cycleRegularity).color}`}>
                          {getRegularityLabel(result.cycleRegularity).text} • {result.averageCycleLength} days
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {result.cycleRegularity === 'regular' && 'Your cycle is within the normal range (24-32 days).'}
                          {result.cycleRegularity === 'slightly-irregular' && 'Your cycle is slightly outside the typical range but still normal for many women.'}
                          {result.cycleRegularity === 'irregular' && 'Your cycle length is outside the typical range. Consider tracking for a few months or consulting a healthcare provider.'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Dates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="shadow-lg border-2 border-pink-200">
                    <CardContent className="p-6 text-center">
                      <Heart className="h-10 w-10 text-pink-600 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-2">Fertile Window</p>
                      <p className="text-lg font-bold text-gray-900">{formatDate(result.fertileWindowStart)}</p>
                      <p className="text-xs text-gray-500">to</p>
                      <p className="text-lg font-bold text-gray-900">{formatDate(result.fertileWindowEnd)}</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-purple-200">
                    <CardContent className="p-6 text-center">
                      <Calendar className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-2">Ovulation Day</p>
                      <p className="text-xl font-bold text-gray-900">{formatDate(result.ovulationDate)}</p>
                      <p className="text-xs text-gray-500 mt-1">Most fertile day</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-orange-200">
                    <CardContent className="p-6 text-center">
                      <AlertCircle className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-2">PMS Symptoms May Start</p>
                      <p className="text-xl font-bold text-gray-900">{formatDate(result.pmsStartDate)}</p>
                      <p className="text-xs text-gray-500 mt-1">5-11 days before period</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-blue-200">
                    <CardContent className="p-6 text-center">
                      <Info className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-2">Period Length</p>
                      <p className="text-xl font-bold text-gray-900">{inputs.periodLength} days</p>
                      <p className="text-xs text-gray-500 mt-1">Typical: 3-7 days</p>
                    </CardContent>
                  </Card>
                </div>

                {/* 6-Month Calendar */}
                <Card className="shadow-lg border-2 border-indigo-200">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <CardTitle className="flex items-center gap-2 text-indigo-900">
                      <Calendar className="h-6 w-6" />
                      6-Month Period Calendar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {result.calendar.map((cycle, index) => (
                        <div key={index} className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                          <p className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">Cycle {index + 1}</span>
                            {cycle.month}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div className="p-3 bg-white rounded-lg">
                              <p className="text-gray-600 mb-1 font-medium">🩸 Period:</p>
                              <p className="font-semibold text-gray-900">
                                {formatDate(cycle.periodStart)} - {formatDate(cycle.periodEnd)}
                              </p>
                            </div>
                            <div className="p-3 bg-white rounded-lg">
                              <p className="text-gray-600 mb-1 font-medium">💗 Ovulation:</p>
                              <p className="font-semibold text-gray-900">{formatDate(cycle.ovulationDate)}</p>
                            </div>
                            <div className="p-3 bg-white rounded-lg">
                              <p className="text-gray-600 mb-1 font-medium">🌸 Fertile Window:</p>
                              <p className="font-semibold text-gray-900">
                                {formatDate(cycle.fertileStart)} - {formatDate(cycle.fertileEnd)}
                              </p>
                            </div>
                            <div className="p-3 bg-white rounded-lg">
                              <p className="text-gray-600 mb-1 font-medium">⚠️ PMS May Start:</p>
                              <p className="font-semibold text-gray-900">{formatDate(cycle.pmsStart)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Health Tips */}
                <Card className="shadow-lg border-2 border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardTitle className="flex items-center gap-2 text-green-900">
                      <Info className="h-6 w-6" />
                      Menstrual Health Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                        <span><strong>Track consistently:</strong> Record your cycle for at least 3 months for accurate predictions.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                        <span><strong>Stay hydrated:</strong> Drink plenty of water to reduce bloating and cramps.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                        <span><strong>Exercise regularly:</strong> Physical activity can help reduce PMS symptoms.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                        <span><strong>Manage stress:</strong> Practice relaxation techniques like yoga or meditation.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                        <span><strong>Eat balanced meals:</strong> Focus on iron-rich foods and reduce caffeine/salt before your period.</span>
                      </li>
                    </ul>
                    
                    {result.cycleRegularity === 'irregular' && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-900">
                          <strong>⚠️ Note:</strong> Irregular cycles can be caused by stress, weight changes, hormonal imbalances, or underlying conditions. If irregularity persists, consult a healthcare provider.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center text-gray-500">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Enter your cycle information and click "Calculate Next Period" to see your personalized menstrual calendar and predictions</p>
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
              Share your period calendar or save the link for future reference.
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

