'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, AlertCircle, Download, Share2 } from 'lucide-react';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';

interface DayInfo {
  date: Date;
  dayOfWeek: string;
  dayNumber: number; // 0-6 (Sunday-Saturday)
  formattedDate: string;
}

interface CalendarDay {
  date: number;
  dayOfWeek: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

const DayOfWeekCalculator = () => {
  const [selectedDate, setSelectedDate] = useState('2025-11-18');
  const [result, setResult] = useState<DayInfo | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const resultsRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/day-of-week-calculator',
    getShareParams: () => ({}),
    getShareText: () => {
      if (result) {
        return `${result.formattedDate} is a ${result.dayOfWeek}`;
      }
      return 'Day of the Week Calculator - Find out what day any date falls on';
    },
  });

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Calculate day of week for a given date
  const calculateDayOfWeek = () => {
    const date = new Date(selectedDate);
    
    if (isNaN(date.getTime())) {
      return;
    }

    const dayNumber = date.getDay();
    const dayOfWeek = dayNames[dayNumber];
    const formattedDate = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    setResult({
      date,
      dayOfWeek,
      dayNumber,
      formattedDate,
    });

    // Update calendar to show the selected date's month
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  // Generate calendar days for current month
  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const selectedDateObj = result ? new Date(result.date) : null;
    if (selectedDateObj) {
      selectedDateObj.setHours(0, 0, 0, 0);
    }

    const days: CalendarDay[] = [];

    // Previous month's days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        dayOfWeek: (startingDayOfWeek - 1 - i) % 7,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      });
    }

    // Current month's days
    for (let date = 1; date <= daysInMonth; date++) {
      const currentDate = new Date(year, month, date);
      currentDate.setHours(0, 0, 0, 0);
      
      days.push({
        date,
        dayOfWeek: currentDate.getDay(),
        isCurrentMonth: true,
        isToday: currentDate.getTime() === today.getTime(),
        isSelected: selectedDateObj ? currentDate.getTime() === selectedDateObj.getTime() : false,
      });
    }

    // Next month's days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let date = 1; date <= remainingDays; date++) {
      days.push({
        date,
        dayOfWeek: (startingDayOfWeek + daysInMonth + date - 1) % 7,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      });
    }

    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleClear = () => {
    setSelectedDate('2025-11-18');
    setResult(null);
    setCurrentMonth(new Date());
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
      link.download = `day-of-week-${new Date().getTime()}.png`;
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

  const calendarDays = generateCalendarDays();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Calculator Input */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Find Day of Week
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Date Input */}
            <div className="space-y-2">
              <Label htmlFor="selectedDate" className="text-sm font-medium text-gray-700">
                Select Date
              </Label>
              <Input
                id="selectedDate"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min="1900-01-01"
                max="2100-12-31"
                className="w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={calculateDayOfWeek}
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

            {/* Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">About This Calculator</p>
                  <p className="text-gray-600">
                    Find out what day of the week any date falls on. Supports dates from 1900 to 2100.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Results */}
        <div>
          {result ? (
            <Card ref={resultsRef} className="shadow-sm border border-gray-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Day of Week Result
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Main Result */}
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="text-sm text-blue-600 font-medium mb-2">Day of the Week</div>
                  <div className="text-4xl font-bold text-blue-900 mb-2">
                    {result.dayOfWeek}
                  </div>
                  <div className="text-sm text-gray-600">
                    {result.formattedDate}
                  </div>
                </div>

                {/* Calendar Month View */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={handlePreviousMonth}
                      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                      aria-label="Previous month"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="text-lg font-semibold text-gray-900">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </div>
                    <button
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                      aria-label="Next month"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Day headers */}
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                      <div
                        key={day}
                        className="text-center text-xs font-semibold text-gray-600 py-2"
                      >
                        {day}
                      </div>
                    ))}

                    {/* Calendar days */}
                    {calendarDays.map((day, index) => (
                      <div
                        key={index}
                        className={`
                          text-center py-2 text-sm rounded-md
                          ${!day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
                          ${day.isToday ? 'bg-blue-100 font-semibold' : ''}
                          ${day.isSelected ? 'bg-blue-600 text-white font-semibold' : ''}
                          ${day.dayOfWeek === 0 || day.dayOfWeek === 6 ? 'bg-gray-50' : ''}
                        `}
                      >
                        {day.date}
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex gap-4 mt-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                      <span>Selected</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-blue-100 rounded"></div>
                      <span>Today</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded"></div>
                      <span>Weekend</span>
                    </div>
                  </div>
                </div>

                {/* Day Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-700 mb-3">Date Information</div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Year:</span>
                      <span className="font-semibold text-gray-900">{result.date.getFullYear()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Month:</span>
                      <span className="font-semibold text-gray-900">{monthNames[result.date.getMonth()]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Day:</span>
                      <span className="font-semibold text-gray-900">{result.date.getDate()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Day Type:</span>
                      <span className="font-semibold text-gray-900">
                        {result.dayNumber === 0 || result.dayNumber === 6 ? 'Weekend' : 'Weekday'}
                      </span>
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
                    Select a date and click "Calculate" to find out what day of the week it is
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

export default DayOfWeekCalculator;

