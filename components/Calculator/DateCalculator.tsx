'use client';

import { useState, useMemo } from "react";
import { Calendar, RotateCcw, Share2 } from "lucide-react";
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface DateDifference {
  years: number;
  months: number;
  weeks: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  weekdays: number;
  weekendDays: number;
}

export function DateCalculator() {
  // Date Difference Calculator
  const [startDate1, setStartDate1] = useState(new Date().toISOString().split('T')[0]);
  const [endDate1, setEndDate1] = useState(new Date().toISOString().split('T')[0]);
  const [includeEndDay, setIncludeEndDay] = useState(false);

  // Add/Subtract Calculator
  const [startDate2, setStartDate2] = useState(new Date().toISOString().split('T')[0]);
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [years, setYears] = useState('0');
  const [months, setMonths] = useState('0');
  const [weeks, setWeeks] = useState('0');
  const [days, setDays] = useState('1');

  // Weekday Finder
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/date-calculator',
    getShareParams: () => ({
      sd1: startDate1,
      ed1: endDate1,
      inc: includeEndDay.toString(),
      sd2: startDate2,
      op: operation,
      y: years,
      m: months,
      w: weeks,
      d: days,
    }),
    getShareText: () => {
      const diff = calculateDateDiff();
      return diff 
        ? `Date Calculation: ${diff.years}y ${diff.months}m ${diff.days}d (${diff.totalDays} total days)`
        : 'Calculate date differences!';
    },
  });

  // Clear functions
  const clearDateDiff = () => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate1(today);
    setEndDate1(today);
    setIncludeEndDay(false);
  };

  const clearAddSubtract = () => {
    setStartDate2(new Date().toISOString().split('T')[0]);
    setYears('0');
    setMonths('0');
    setWeeks('0');
    setDays('1');
  };

  const clearWeekday = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  // Calculate date difference
  const calculateDateDiff = (): DateDifference | null => {
    try {
      const start = new Date(startDate1);
      const end = new Date(endDate1);
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

      let days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      if (includeEndDay) days += 1;

      if (days < 0) return null;

      // Calculate weekdays and weekend days
      let weekdays = 0;
      let weekendDays = 0;
      const tempDate = new Date(start);
      
      for (let i = 0; i <= days - (includeEndDay ? 1 : 0); i++) {
        const dayOfWeek = tempDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          weekendDays++;
        } else {
          weekdays++;
        }
        tempDate.setDate(tempDate.getDate() + 1);
      }

      // Calculate years, months, days breakdown
      let years = 0;
      let months = 0;
      let remainingDays = days;

      const tempStart = new Date(start);
      const tempEnd = new Date(end);

      // Calculate years
      years = tempEnd.getFullYear() - tempStart.getFullYear();
      tempStart.setFullYear(tempStart.getFullYear() + years);
      if (tempStart > tempEnd) {
        years--;
        tempStart.setFullYear(tempStart.getFullYear() - 1);
      }

      // Calculate months
      months = tempEnd.getMonth() - tempStart.getMonth();
      if (months < 0) {
        months += 12;
      }
      tempStart.setMonth(tempStart.getMonth() + months);
      if (tempStart > tempEnd) {
        months--;
        tempStart.setMonth(tempStart.getMonth() - 1);
      }

      // Calculate remaining days
      remainingDays = Math.floor((tempEnd.getTime() - tempStart.getTime()) / (1000 * 60 * 60 * 24));

      return {
        years,
        months,
        weeks: Math.floor(days / 7),
        days: remainingDays,
        totalDays: days,
        totalWeeks: parseFloat((days / 7).toFixed(2)),
        totalMonths: parseFloat((days / 30.44).toFixed(2)),
        weekdays,
        weekendDays
      };
    } catch {
      return null;
    }
  };

  // Calculate add/subtract date
  const calculateAddSubtract = () => {
    try {
      const start = new Date(startDate2);
      if (isNaN(start.getTime())) return null;

      const y = parseInt(years) || 0;
      const m = parseInt(months) || 0;
      const w = parseInt(weeks) || 0;
      const d = parseInt(days) || 0;

      const multiplier = operation === 'add' ? 1 : -1;

      const result = new Date(start);
      result.setFullYear(result.getFullYear() + y * multiplier);
      result.setMonth(result.getMonth() + m * multiplier);
      result.setDate(result.getDate() + (w * 7 + d) * multiplier);

      const totalDays = Math.abs(Math.floor((result.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

      return {
        date: result,
        totalDays,
        years: y,
        months: m,
        weeks: w,
        days: d
      };
    } catch {
      return null;
    }
  };

  // Get weekday info
  const getWeekdayInfo = () => {
    try {
      const date = new Date(selectedDate);
      if (isNaN(date.getTime())) return null;

      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      // Calculate week number
      const startOfYear = new Date(date.getFullYear(), 0, 1);
      const days = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
      const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);

      // Calculate day of year
      const dayOfYear = days + 1;

      return {
        weekday: weekdays[date.getDay()],
        month: months[date.getMonth()],
        day: date.getDate(),
        year: date.getFullYear(),
        weekNumber,
        dayOfYear,
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        quarter: Math.floor(date.getMonth() / 3) + 1
      };
    } catch {
      return null;
    }
  };

  const dateDiff = useMemo(() => calculateDateDiff(), [startDate1, endDate1, includeEndDay]);
  const addSubtractResult = useMemo(() => calculateAddSubtract(), [startDate2, years, months, weeks, days, operation]);
  const weekdayInfo = useMemo(() => getWeekdayInfo(), [selectedDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* 1. Date Difference Calculator */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Date Difference Calculator</h3>
          </div>
          <button
            onClick={clearDateDiff}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Start Date</label>
              <input
                type="date"
                value={startDate1}
                onChange={(e) => setStartDate1(e.target.value)}
                lang="en"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">End Date</label>
              <input
                type="date"
                value={endDate1}
                onChange={(e) => setEndDate1(e.target.value)}
                lang="en"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="includeEndDay"
                checked={includeEndDay}
                onChange={(e) => setIncludeEndDay(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="includeEndDay" className="text-sm text-gray-700 cursor-pointer">
                Include end day (add 1 day)
              </label>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            {dateDiff ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Time Difference</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {dateDiff.years}y {dateDiff.months}m {dateDiff.days}d
                  </div>
                  <div className="text-sm text-gray-500">
                    or {dateDiff.totalDays.toLocaleString()} days
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500">Total Weeks</div>
                    <div className="text-lg font-semibold text-gray-900">{dateDiff.totalWeeks}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500">Total Months</div>
                    <div className="text-lg font-semibold text-gray-900">{dateDiff.totalMonths}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500">Weekdays</div>
                    <div className="text-lg font-semibold text-gray-900">{dateDiff.weekdays}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500">Weekend Days</div>
                    <div className="text-lg font-semibold text-gray-900">{dateDiff.weekendDays}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Select dates to calculate</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Add/Subtract Date Calculator */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Add or Subtract Date</h3>
          </div>
          <button
            onClick={clearAddSubtract}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Start Date</label>
              <input
                type="date"
                value={startDate2}
                onChange={(e) => setStartDate2(e.target.value)}
                lang="en"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setOperation('add')}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  operation === 'add'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Add (+)
              </button>
              <button
                onClick={() => setOperation('subtract')}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  operation === 'subtract'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Subtract (−)
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Years</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-center"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Months</label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-center"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Weeks</label>
                <input
                  type="number"
                  value={weeks}
                  onChange={(e) => setWeeks(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-center"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Days</label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-center"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-center">
            {addSubtractResult ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Result Date</div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {formatDate(addSubtractResult.date)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {addSubtractResult.totalDays.toLocaleString()} days {operation === 'add' ? 'later' : 'earlier'}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500 mb-2">Duration Added/Subtracted</div>
                  <div className="text-base font-semibold text-gray-900">
                    {addSubtractResult.years}y {addSubtractResult.months}m {addSubtractResult.weeks}w {addSubtractResult.days}d
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Enter values to calculate</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Weekday Finder */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Weekday & Date Information</h3>
          </div>
          <button
            onClick={clearWeekday}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              lang="en"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            {weekdayInfo ? (
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">Weekday</div>
                  <div className="text-2xl font-bold text-gray-900">{weekdayInfo.weekday}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {weekdayInfo.month} {weekdayInfo.day}, {weekdayInfo.year}
                  </div>
                  {weekdayInfo.isWeekend && (
                    <div className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      Weekend
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500">Week #</div>
                    <div className="text-sm font-semibold text-gray-900">{weekdayInfo.weekNumber}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500">Day of Year</div>
                    <div className="text-sm font-semibold text-gray-900">{weekdayInfo.dayOfYear}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500">Quarter</div>
                    <div className="text-sm font-semibold text-gray-900">Q{weekdayInfo.quarter}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-6">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Select a date</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Date Calculator"
      />
    </div>
  );
}

