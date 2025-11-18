'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, AlertCircle, Download, Share2 } from 'lucide-react';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';

interface DayCountResult {
  totalDays: number;
  weekdays: number;
  weekends: number;
  years: number;
  months: number;
  weeks: number;
  days: number;
  startDate: string;
  endDate: string;
}

const DayCounterCalculator = () => {
  const [calculatorMode, setCalculatorMode] = useState<'range' | 'addsubtract'>('range');
  
  // Date Range Mode
  const [startDate, setStartDate] = useState('2025-02-18');
  const [endDate, setEndDate] = useState('2025-11-18');
  const [includeEndDay, setIncludeEndDay] = useState(false);
  
  // Add/Subtract Mode
  const [baseDate, setBaseDate] = useState('2025-11-18');
  const [daysToAddSubtract, setDaysToAddSubtract] = useState('15');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [countBusinessDaysOnly, setCountBusinessDaysOnly] = useState(false);
  
  // Results
  const [result, setResult] = useState<DayCountResult | null>(null);
  const [calculatedDate, setCalculatedDate] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/day-counter',
    getShareParams: () => ({}),
    getShareText: () => {
      if (result) {
        return `Day Counter: ${result.totalDays} days between ${result.startDate} and ${result.endDate}`;
      }
      return 'Day Counter - Calculate days between dates';
    },
  });

  // Check if date is weekend (Saturday or Sunday)
  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
  };

  // Calculate days between two dates
  const calculateDateRange = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return;
    }

    if (start > end) {
      return;
    }

    // Calculate total days
    let totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (includeEndDay) {
      totalDays += 1;
    }

    // Count weekdays and weekends
    let weekdays = 0;
    let weekends = 0;
    const currentDate = new Date(start);
    
    for (let i = 0; i < totalDays; i++) {
      if (isWeekend(currentDate)) {
        weekends++;
      } else {
        weekdays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Calculate years, months, weeks, days breakdown
    const years = Math.floor(totalDays / 365);
    const remainingAfterYears = totalDays % 365;
    const months = Math.floor(remainingAfterYears / 30);
    const remainingAfterMonths = remainingAfterYears % 30;
    const weeks = Math.floor(remainingAfterMonths / 7);
    const days = remainingAfterMonths % 7;

    setResult({
      totalDays,
      weekdays,
      weekends,
      years,
      months,
      weeks,
      days,
      startDate: start.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      endDate: end.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    });
    setCalculatedDate(null);
  };

  // Add or subtract days from a date
  const calculateAddSubtract = () => {
    const base = new Date(baseDate);
    const daysNum = parseInt(daysToAddSubtract) || 0;
    
    if (isNaN(base.getTime())) {
      return;
    }

    let targetDate = new Date(base);
    let daysProcessed = 0;

    if (countBusinessDaysOnly) {
      // Skip weekends when counting
      while (daysProcessed < Math.abs(daysNum)) {
        if (operation === 'add') {
          targetDate.setDate(targetDate.getDate() + 1);
        } else {
          targetDate.setDate(targetDate.getDate() - 1);
        }
        
        if (!isWeekend(targetDate)) {
          daysProcessed++;
        }
      }
    } else {
      // Include all days
      if (operation === 'add') {
        targetDate.setDate(targetDate.getDate() + daysNum);
      } else {
        targetDate.setDate(targetDate.getDate() - daysNum);
      }
    }

    setCalculatedDate(targetDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    setResult(null);
  };

  const handleClear = () => {
    setStartDate('2025-02-18');
    setEndDate('2025-11-18');
    setIncludeEndDay(false);
    setBaseDate('2025-11-18');
    setDaysToAddSubtract('15');
    setOperation('add');
    setCountBusinessDaysOnly(false);
    setResult(null);
    setCalculatedDate(null);
  };

  // Handle save as image
  const handleSaveAsImage = async () => {
    if (!resultsRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `day-counter-${new Date().getTime()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Calculator Input */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-b border-gray-200">
            {/* Calculator Mode Tabs inside CardHeader */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
                <button
                  onClick={() => {
                    setCalculatorMode('range');
                    handleClear();
                  }}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    calculatorMode === 'range'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Date Range
                </button>
                <button
                  onClick={() => {
                    setCalculatorMode('addsubtract');
                    handleClear();
                  }}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    calculatorMode === 'addsubtract'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Add/Subtract Days
                </button>
              </div>
            </div>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              {calculatorMode === 'range' ? 'Calculate Days Between Dates' : 'Add or Subtract Days'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {calculatorMode === 'range' ? (
              <>
                {/* Start Date */}
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Include End Day Option */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="includeEndDay"
                    checked={includeEndDay}
                    onChange={(e) => setIncludeEndDay(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Label htmlFor="includeEndDay" className="text-sm text-gray-700 cursor-pointer">
                    Include end day (add 1 day)
                  </Label>
                </div>
              </>
            ) : (
              <>
                {/* Base Date */}
                <div className="space-y-2">
                  <Label htmlFor="baseDate" className="text-sm font-medium text-gray-700">
                    Start Date
                  </Label>
                  <Input
                    id="baseDate"
                    type="date"
                    value={baseDate}
                    onChange={(e) => setBaseDate(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Operation */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Operation</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="operation"
                        value="add"
                        checked={operation === 'add'}
                        onChange={(e) => setOperation(e.target.value as 'add' | 'subtract')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Add (+)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="operation"
                        value="subtract"
                        checked={operation === 'subtract'}
                        onChange={(e) => setOperation(e.target.value as 'add' | 'subtract')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Subtract (-)</span>
                    </label>
                  </div>
                </div>

                {/* Number of Days */}
                <div className="space-y-2">
                  <Label htmlFor="daysToAddSubtract" className="text-sm font-medium text-gray-700">
                    Number of Days
                  </Label>
                  <Input
                    id="daysToAddSubtract"
                    type="number"
                    min="0"
                    value={daysToAddSubtract}
                    onChange={(e) => setDaysToAddSubtract(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Count Business Days Only Option */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="countBusinessDaysOnly"
                    checked={countBusinessDaysOnly}
                    onChange={(e) => setCountBusinessDaysOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Label htmlFor="countBusinessDaysOnly" className="text-sm text-gray-700 cursor-pointer">
                    Count business days only (exclude weekends)
                  </Label>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={calculatorMode === 'range' ? calculateDateRange : calculateAddSubtract}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Calculate
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="flex-1"
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Results */}
        <div>
          {(result || calculatedDate) ? (
            <Card ref={resultsRef} className="shadow-sm border border-gray-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  {calculatorMode === 'range' ? 'Date Range Result' : 'Calculated Date'}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {result && (
                  <>
                    {/* Main Result */}
                    <div className="bg-blue-50 rounded-lg p-6 text-center">
                      <div className="text-sm text-blue-600 font-medium mb-2">Total Days</div>
                      <div className="text-5xl font-bold text-blue-900">
                        {result.totalDays}
                      </div>
                      <div className="text-sm text-blue-600 mt-2">days</div>
                    </div>

                    {/* Date Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">Between:</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {result.startDate}
                      </div>
                      <div className="text-sm text-gray-600 my-1">and</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {result.endDate}
                      </div>
                    </div>

                    {/* Weekday/Weekend Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="text-xs text-gray-600 mb-1">Weekdays</div>
                        <div className="text-2xl font-semibold text-gray-900">
                          {result.weekdays}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">business days</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="text-xs text-gray-600 mb-1">Weekends</div>
                        <div className="text-2xl font-semibold text-gray-900">
                          {result.weekends}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">weekend days</div>
                      </div>
                    </div>

                    {/* Time Breakdown */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-700 mb-3">Time Breakdown</div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Years:</span>
                          <span className="font-semibold text-gray-900">{result.years}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Months:</span>
                          <span className="font-semibold text-gray-900">{result.months}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Weeks:</span>
                          <span className="font-semibold text-gray-900">{result.weeks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Days:</span>
                          <span className="font-semibold text-gray-900">{result.days}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-xs text-gray-600">
                          Approximately {result.years} year{result.years !== 1 ? 's' : ''}, {result.months} month{result.months !== 1 ? 's' : ''}, {result.weeks} week{result.weeks !== 1 ? 's' : ''}, and {result.days} day{result.days !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {calculatedDate && (
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="text-sm text-blue-600 font-medium mb-2 text-center">
                      {operation === 'add' ? 'Adding' : 'Subtracting'} {daysToAddSubtract} {countBusinessDaysOnly ? 'business' : ''} day{parseInt(daysToAddSubtract) !== 1 ? 's' : ''}
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-900">
                        {calculatedDate}
                      </div>
                    </div>
                  </div>
                )}

                {/* Information */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex gap-2">
                    <AlertCircle className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p className="font-medium mb-1">Note</p>
                      <p className="text-gray-600">
                        {calculatorMode === 'range' 
                          ? 'This calculator counts calendar days. Weekdays exclude Saturdays and Sundays. Holidays are not considered in this calculation.'
                          : countBusinessDaysOnly
                            ? 'Business days exclude weekends (Saturday and Sunday). Holidays are not considered.'
                            : 'This calculation includes all calendar days (weekdays and weekends).'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button
                    onClick={handleSaveAsImage}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Save as Image
                  </Button>
                  <Button
                    onClick={handlePrint}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="p-12 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No Results Yet</p>
                  <p className="text-gray-400 text-sm">
                    {calculatorMode === 'range' 
                      ? 'Enter start and end dates, then click "Calculate"'
                      : 'Enter a date and number of days, then click "Calculate"'}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
      />
    </div>
  );
};

export default DayCounterCalculator;

