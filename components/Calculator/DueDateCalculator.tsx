'use client';

import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Calendar, Baby, Heart, Info, Clock, Activity } from 'lucide-react';

type CalculationMethod = 'lmp' | 'conception' | 'ultrasound';

interface DueDateInputs {
  method: CalculationMethod;
  lmpDate: string;
  conceptionDate: string;
  ultrasoundDate: string;
  ultrasoundWeeks: string;
  ultrasoundDays: string;
}

interface PregnancyResult {
  dueDate: Date;
  currentWeeks: number;
  currentDays: number;
  totalDays: number;
  daysRemaining: number;
  dueDateRange: {
    early: Date;
    late: Date;
  };
  trimester: {
    current: number;
    name: string;
  };
  trimesters: {
    first: { start: Date; end: Date };
    second: { start: Date; end: Date };
    third: { start: Date; end: Date };
  };
  keyDates: {
    firstMovement: { start: Date; end: Date };
    fullTerm: Date;
    deliveryWindow: { start: Date; end: Date };
  };
  checkupSchedule: Array<{
    weeks: string;
    date: Date;
    description: string;
  }>;
  milestones: Array<{
    week: number;
    description: string;
    completed: boolean;
  }>;
}

export default function DueDateCalculator() {
  const [inputs, setInputs] = useState<DueDateInputs>({
    method: 'lmp',
    lmpDate: '',
    conceptionDate: '',
    ultrasoundDate: '',
    ultrasoundWeeks: '',
    ultrasoundDays: '',
  });

  const [result, setResult] = useState<PregnancyResult | null>(null);
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

    if (m && d) {
      const newInputs: Partial<DueDateInputs> = {
        method: (m as CalculationMethod) || 'lmp',
      };

      if (m === 'lmp') {
        newInputs.lmpDate = d;
      } else if (m === 'conception') {
        newInputs.conceptionDate = d;
      }

      setInputs(prev => ({ ...prev, ...newInputs }));
      
      setTimeout(() => {
        calculate({ ...inputs, ...newInputs } as DueDateInputs);
      }, 100);
    }
  }, []);

  const handleInputChange = (field: keyof DueDateInputs, value: string | CalculationMethod) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (inputs.method === 'lmp') {
      if (!inputs.lmpDate) {
        newErrors.lmpDate = 'Please enter your last menstrual period date';
      } else {
        const lmpDate = new Date(inputs.lmpDate);
        const today = new Date();
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() - 10);
        
        if (lmpDate > today) {
          newErrors.lmpDate = 'LMP date cannot be in the future';
        } else if (lmpDate < maxDate) {
          newErrors.lmpDate = 'LMP date seems too far in the past';
        }
      }
    } else if (inputs.method === 'conception') {
      if (!inputs.conceptionDate) {
        newErrors.conceptionDate = 'Please enter your conception date';
      } else {
        const conceptionDate = new Date(inputs.conceptionDate);
        const today = new Date();
        
        if (conceptionDate > today) {
          newErrors.conceptionDate = 'Conception date cannot be in the future';
        }
      }
    } else if (inputs.method === 'ultrasound') {
      if (!inputs.ultrasoundDate) {
        newErrors.ultrasoundDate = 'Please enter ultrasound date';
      }
      const weeks = parseInt(inputs.ultrasoundWeeks);
      const days = parseInt(inputs.ultrasoundDays) || 0;
      
      if (!inputs.ultrasoundWeeks || isNaN(weeks) || weeks < 4 || weeks > 42) {
        newErrors.ultrasoundWeeks = 'Please enter weeks between 4 and 42';
      }
      if (days < 0 || days > 6) {
        newErrors.ultrasoundDays = 'Days must be between 0 and 6';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = (inputData?: DueDateInputs) => {
    const data = inputData || inputs;
    
    if (!validate() && !inputData) return;

    let dueDate: Date;
    let conceptionDate: Date;

    if (data.method === 'lmp') {
      // Naegele's Rule: LMP + 280 days (40 weeks)
      const lmpDate = new Date(data.lmpDate);
      dueDate = new Date(lmpDate);
      dueDate.setDate(dueDate.getDate() + 280);
      
      conceptionDate = new Date(lmpDate);
      conceptionDate.setDate(conceptionDate.getDate() + 14); // Ovulation typically day 14
    } else if (data.method === 'conception') {
      // Conception + 266 days (38 weeks)
      conceptionDate = new Date(data.conceptionDate);
      dueDate = new Date(conceptionDate);
      dueDate.setDate(dueDate.getDate() + 266);
    } else {
      // Ultrasound method
      const ultrasoundDate = new Date(data.ultrasoundDate);
      const weeks = parseInt(data.ultrasoundWeeks);
      const days = parseInt(data.ultrasoundDays) || 0;
      const totalDaysAtUltrasound = weeks * 7 + days;
      
      // Calculate how many days until 40 weeks
      const daysUntilDue = 280 - totalDaysAtUltrasound;
      dueDate = new Date(ultrasoundDate);
      dueDate.setDate(dueDate.getDate() + daysUntilDue);
      
      // Estimate conception date (2 weeks before LMP)
      const estimatedLMP = new Date(ultrasoundDate);
      estimatedLMP.setDate(estimatedLMP.getDate() - totalDaysAtUltrasound);
      conceptionDate = new Date(estimatedLMP);
      conceptionDate.setDate(conceptionDate.getDate() + 14);
    }

    // Calculate current pregnancy stage
    const today = new Date();
    const startDate = new Date(conceptionDate);
    startDate.setDate(startDate.getDate() - 14); // Back to LMP
    
    const totalDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const currentWeeks = Math.floor(totalDays / 7);
    const currentDays = totalDays % 7;
    
    const daysRemaining = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Due date range (±2 weeks)
    const dueDateRange = {
      early: new Date(dueDate.getTime() - 14 * 24 * 60 * 60 * 1000),
      late: new Date(dueDate.getTime() + 14 * 24 * 60 * 60 * 1000),
    };

    // Trimester calculation
    let currentTrimester = 1;
    let trimesterName = 'First Trimester';
    if (currentWeeks >= 27) {
      currentTrimester = 3;
      trimesterName = 'Third Trimester';
    } else if (currentWeeks >= 14) {
      currentTrimester = 2;
      trimesterName = 'Second Trimester';
    }

    const trimesters = {
      first: {
        start: new Date(startDate),
        end: new Date(startDate.getTime() + 13 * 7 * 24 * 60 * 60 * 1000),
      },
      second: {
        start: new Date(startDate.getTime() + 14 * 7 * 24 * 60 * 60 * 1000),
        end: new Date(startDate.getTime() + 26 * 7 * 24 * 60 * 60 * 1000),
      },
      third: {
        start: new Date(startDate.getTime() + 27 * 7 * 24 * 60 * 60 * 1000),
        end: dueDate,
      },
    };

    // Key dates
    const keyDates = {
      firstMovement: {
        start: new Date(startDate.getTime() + 18 * 7 * 24 * 60 * 60 * 1000),
        end: new Date(startDate.getTime() + 25 * 7 * 24 * 60 * 60 * 1000),
      },
      fullTerm: new Date(startDate.getTime() + 37 * 7 * 24 * 60 * 60 * 1000),
      deliveryWindow: {
        start: new Date(startDate.getTime() + 37 * 7 * 24 * 60 * 60 * 1000),
        end: new Date(startDate.getTime() + 42 * 7 * 24 * 60 * 60 * 1000),
      },
    };

    // Checkup schedule
    const checkupSchedule = [
      { weeks: '8-12', date: new Date(startDate.getTime() + 10 * 7 * 24 * 60 * 60 * 1000), description: 'First prenatal visit & dating ultrasound' },
      { weeks: '16', date: new Date(startDate.getTime() + 16 * 7 * 24 * 60 * 60 * 1000), description: 'Maternal serum screening' },
      { weeks: '18-22', date: new Date(startDate.getTime() + 20 * 7 * 24 * 60 * 60 * 1000), description: 'Anatomy scan ultrasound' },
      { weeks: '24-28', date: new Date(startDate.getTime() + 26 * 7 * 24 * 60 * 60 * 1000), description: 'Glucose screening test' },
      { weeks: '28', date: new Date(startDate.getTime() + 28 * 7 * 24 * 60 * 60 * 1000), description: 'Rhogam injection (if needed)' },
      { weeks: '32', date: new Date(startDate.getTime() + 32 * 7 * 24 * 60 * 60 * 1000), description: 'Regular checkup' },
      { weeks: '36', date: new Date(startDate.getTime() + 36 * 7 * 24 * 60 * 60 * 1000), description: 'Group B strep test' },
      { weeks: '37-40', date: new Date(startDate.getTime() + 38 * 7 * 24 * 60 * 60 * 1000), description: 'Weekly checkups' },
    ];

    // Developmental milestones
    const milestones = [
      { week: 4, description: 'Implantation complete', completed: currentWeeks >= 4 },
      { week: 8, description: 'All major organs forming', completed: currentWeeks >= 8 },
      { week: 12, description: 'First trimester complete', completed: currentWeeks >= 12 },
      { week: 16, description: 'Gender may be visible on ultrasound', completed: currentWeeks >= 16 },
      { week: 20, description: 'Halfway through pregnancy!', completed: currentWeeks >= 20 },
      { week: 24, description: 'Baby can hear sounds', completed: currentWeeks >= 24 },
      { week: 28, description: 'Third trimester begins', completed: currentWeeks >= 28 },
      { week: 32, description: 'Baby practices breathing', completed: currentWeeks >= 32 },
      { week: 37, description: 'Full term - baby ready to be born', completed: currentWeeks >= 37 },
      { week: 40, description: 'Due date!', completed: currentWeeks >= 40 },
    ];

    const resultData: PregnancyResult = {
      dueDate,
      currentWeeks,
      currentDays,
      totalDays,
      daysRemaining,
      dueDateRange,
      trimester: {
        current: currentTrimester,
        name: trimesterName,
      },
      trimesters,
      keyDates,
      checkupSchedule,
      milestones,
    };

    setResult(resultData);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    
    let dateParam = '';
    if (inputs.method === 'lmp' && inputs.lmpDate) {
      dateParam = inputs.lmpDate;
    } else if (inputs.method === 'conception' && inputs.conceptionDate) {
      dateParam = inputs.conceptionDate;
    }
    
    const params = new URLSearchParams({
      m: inputs.method,
      d: dateParam,
    });
    
    const url = `${baseUrl}/due-date-calculator?${params.toString()}`;
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
      ? `My due date is ${formatDate(result.dueDate)}! 🤰`
      : 'Calculate your due date';
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
        url = `mailto:?subject=${encodeURIComponent('My Due Date')}&body=${encodedText}%20${encodedUrl}`;
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
      link.download = `due-date-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Due Date Information</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="Due Date Information" /></body>
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
            <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
              <CardTitle className="flex items-center gap-2">
                <Baby className="h-5 w-5 text-pink-600" />
                Due Date Inputs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Calculation Method */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Calculation Method <span className="text-red-500">*</span>
                </Label>
                <select
                  value={inputs.method}
                  onChange={(e) => handleInputChange('method', e.target.value as CalculationMethod)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="lmp">Last Menstrual Period (LMP)</option>
                  <option value="conception">Conception Date</option>
                  <option value="ultrasound">Ultrasound Date</option>
                </select>
              </div>

              {/* LMP Method */}
              {inputs.method === 'lmp' && (
                <div className="space-y-2">
                  <Label htmlFor="lmpDate" className="text-sm font-medium">
                    First Day of Last Period <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="lmpDate"
                    type="date"
                    value={inputs.lmpDate}
                    onChange={(e) => handleInputChange('lmpDate', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                      errors.lmpDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.lmpDate && (
                    <p className="text-sm text-red-600">{errors.lmpDate}</p>
                  )}
                  <p className="text-xs text-gray-500">The first day of your last menstrual period</p>
                </div>
              )}

              {/* Conception Method */}
              {inputs.method === 'conception' && (
                <div className="space-y-2">
                  <Label htmlFor="conceptionDate" className="text-sm font-medium">
                    Conception Date <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="conceptionDate"
                    type="date"
                    value={inputs.conceptionDate}
                    onChange={(e) => handleInputChange('conceptionDate', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                      errors.conceptionDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.conceptionDate && (
                    <p className="text-sm text-red-600">{errors.conceptionDate}</p>
                  )}
                  <p className="text-xs text-gray-500">The date when you conceived</p>
                </div>
              )}

              {/* Ultrasound Method */}
              {inputs.method === 'ultrasound' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="ultrasoundDate" className="text-sm font-medium">
                      Ultrasound Date <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="ultrasoundDate"
                      type="date"
                      value={inputs.ultrasoundDate}
                      onChange={(e) => handleInputChange('ultrasoundDate', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors.ultrasoundDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      max={new Date().toISOString().split('T')[0]}
                    />
                    {errors.ultrasoundDate && (
                      <p className="text-sm text-red-600">{errors.ultrasoundDate}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Gestational Age at Ultrasound <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="number"
                          value={inputs.ultrasoundWeeks}
                          onChange={(e) => handleInputChange('ultrasoundWeeks', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            errors.ultrasoundWeeks ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="20"
                          min="4"
                          max="42"
                        />
                        <p className="text-xs text-gray-500 mt-1">Weeks</p>
                      </div>
                      <div>
                        <input
                          type="number"
                          value={inputs.ultrasoundDays}
                          onChange={(e) => handleInputChange('ultrasoundDays', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg ${
                            errors.ultrasoundDays ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="3"
                          min="0"
                          max="6"
                        />
                        <p className="text-xs text-gray-500 mt-1">Days</p>
                      </div>
                    </div>
                    {(errors.ultrasoundWeeks || errors.ultrasoundDays) && (
                      <p className="text-sm text-red-600">{errors.ultrasoundWeeks || errors.ultrasoundDays}</p>
                    )}
                  </div>
                </>
              )}

              {/* Info Box */}
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-pink-900">
                    <p className="font-medium mb-1">About Due Date Calculation</p>
                    <p className="text-xs">
                      {inputs.method === 'lmp' && 'Naegele\'s Rule: adds 280 days (40 weeks) to your LMP date.'}
                      {inputs.method === 'conception' && 'Adds 266 days (38 weeks) to your conception date.'}
                      {inputs.method === 'ultrasound' && 'Uses ultrasound measurements for the most accurate dating.'}
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
            Calculate Due Date
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Pregnancy Information</h2>
                  <p className="text-sm text-gray-600">
                    Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                {/* Main Due Date */}
                <Card className="shadow-lg border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50">
                  <CardContent className="p-8 text-center">
                    <Baby className="h-16 w-16 text-pink-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Due Date</h3>
                    <p className="text-4xl font-bold text-pink-600 mb-2">{formatDate(result.dueDate)}</p>
                    <p className="text-sm text-gray-600 mb-4">
                      {result.daysRemaining > 0 
                        ? `${result.daysRemaining} days remaining`
                        : result.daysRemaining === 0
                        ? 'Due today!'
                        : `${Math.abs(result.daysRemaining)} days overdue`
                      }
                    </p>
                    <div className="bg-white rounded-lg p-4 inline-block">
                      <p className="text-sm text-gray-600 mb-1">You are currently</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {result.currentWeeks}<span className="text-lg">w</span> {result.currentDays}<span className="text-lg">d</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{result.trimester.name}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Due Date Range */}
                <Card className="shadow-lg border-2 border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                    <CardTitle className="flex items-center gap-2 text-purple-900">
                      <Calendar className="h-6 w-6" />
                      Due Date Range
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600 mb-4">Most babies arrive within 2 weeks of their due date:</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Earliest (38 weeks)</p>
                        <p className="text-lg font-bold text-gray-900">{formatDate(result.dueDateRange.early)}</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Latest (42 weeks)</p>
                        <p className="text-lg font-bold text-gray-900">{formatDate(result.dueDateRange.late)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Trimesters */}
                <Card className="shadow-lg border-2 border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                    <CardTitle className="flex items-center gap-2 text-blue-900">
                      <Clock className="h-6 w-6" />
                      Trimester Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-3">
                    <div className={`p-4 rounded-lg ${result.trimester.current === 1 ? 'bg-blue-100 border-2 border-blue-400' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900">First Trimester</p>
                          <p className="text-sm text-gray-600">Weeks 1-13</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Ends</p>
                          <p className="text-sm font-semibold">{formatDate(result.trimesters.first.end)}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${result.trimester.current === 2 ? 'bg-blue-100 border-2 border-blue-400' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900">Second Trimester</p>
                          <p className="text-sm text-gray-600">Weeks 14-26</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Ends</p>
                          <p className="text-sm font-semibold">{formatDate(result.trimesters.second.end)}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${result.trimester.current === 3 ? 'bg-blue-100 border-2 border-blue-400' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900">Third Trimester</p>
                          <p className="text-sm text-gray-600">Weeks 27-40</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Ends</p>
                          <p className="text-sm font-semibold">{formatDate(result.trimesters.third.end)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Dates */}
                <Card className="shadow-lg border-2 border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardTitle className="flex items-center gap-2 text-green-900">
                      <Heart className="h-6 w-6" />
                      Important Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">First Baby Movement</p>
                        <p className="text-xs text-gray-600">Quickening (18-25 weeks)</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-700">
                        {formatDate(result.keyDates.firstMovement.start).split(',')[0]} - {formatDate(result.keyDates.firstMovement.end).split(',')[0]}
                      </p>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Full Term</p>
                        <p className="text-xs text-gray-600">37 weeks - baby ready to be born</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-700">{formatDate(result.keyDates.fullTerm)}</p>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Delivery Window</p>
                        <p className="text-xs text-gray-600">37-42 weeks (safe delivery period)</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-700">
                        {formatDate(result.keyDates.deliveryWindow.start).split(',')[0]} - {formatDate(result.keyDates.deliveryWindow.end).split(',')[0]}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Checkup Schedule */}
                <Card className="shadow-lg border-2 border-orange-200">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                    <CardTitle className="flex items-center gap-2 text-orange-900">
                      <Calendar className="h-6 w-6" />
                      Prenatal Checkup Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {result.checkupSchedule.map((checkup, index) => (
                        <div key={index} className="flex justify-between items-start p-3 bg-orange-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Week {checkup.weeks}</p>
                            <p className="text-xs text-gray-600 mt-1">{checkup.description}</p>
                          </div>
                          <p className="text-sm font-semibold text-gray-700 ml-4">{formatDate(checkup.date)}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-4">* Schedule may vary based on your healthcare provider's recommendations</p>
                  </CardContent>
                </Card>

                {/* Milestones */}
                <Card className="shadow-lg border-2 border-indigo-200">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <CardTitle className="flex items-center gap-2 text-indigo-900">
                      <Activity className="h-6 w-6" />
                      Baby Development Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      {result.milestones.map((milestone, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center gap-3 p-3 rounded-lg ${
                            milestone.completed ? 'bg-indigo-100 border border-indigo-300' : 'bg-gray-50'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            milestone.completed ? 'bg-indigo-600' : 'bg-gray-300'
                          }`}>
                            {milestone.completed && (
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${milestone.completed ? 'text-indigo-900' : 'text-gray-700'}`}>
                              Week {milestone.week}: {milestone.description}
                            </p>
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
                <Baby className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Enter your information and click "Calculate Due Date" to see your pregnancy timeline, checkup schedule, and important milestones</p>
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
              <h3 className="text-2xl font-bold text-gray-900">Share Your Due Date</h3>
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
              Share your pregnancy timeline with family and friends.
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

