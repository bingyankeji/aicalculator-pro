'use client';

import { useState, useMemo } from "react";
import { Share2, Download, Clock, RotateCcw } from "lucide-react";
import html2canvas from "html2canvas";
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type Operation = 'add' | 'subtract';

interface TimeInput {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface DateTimeInput {
  date: string;
  time: string;
}

interface TimeResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
  totalDays: number;
}

export function TimeCalculator() {
  const [operation1, setOperation1] = useState<Operation>('add');
  
  // Add/Subtract Mode
  const [time1, setTime1] = useState<TimeInput>({ days: '2', hours: '5', minutes: '30', seconds: '15' });
  const [time2, setTime2] = useState<TimeInput>({ days: '1', hours: '3', minutes: '45', seconds: '30' });
  
  // Date + Time Mode
  const [operation2, setOperation2] = useState<Operation>('add');
  const [startDateTime, setStartDateTime] = useState<DateTimeInput>({
    date: new Date().toISOString().split('T')[0],
    time: '10:30'
  });
  const [duration, setDuration] = useState<TimeInput>({ days: '5', hours: '2', minutes: '30', seconds: '0' });
  
  // Unit Converter Mode
  const [convertValue, setConvertValue] = useState('10000');
  const [convertFrom, setConvertFrom] = useState<'seconds' | 'minutes' | 'hours' | 'days'>('seconds');
  
  // Expression Mode
  const [expression, setExpression] = useState('2d 5h 30m + 3h 45m - 1h 15m');

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/time-calculator',
    getShareParams: () => ({
      t1d: time1.days,
      t1h: time1.hours,
      t1m: time1.minutes,
      t1s: time1.seconds,
      t2d: time2.days,
      t2h: time2.hours,
      t2m: time2.minutes,
      t2s: time2.seconds,
      op: operation1,
    }),
    getShareText: () => {
      const result = calculateAddSubtract();
      return result 
        ? `Time Calculation: ${result.days}d ${result.hours}h ${result.minutes}m ${result.seconds}s`
        : 'Calculate time durations!';
    },
  });

  // Clear functions
  const clearAddSubtract = () => {
    setTime1({ days: '', hours: '', minutes: '', seconds: '' });
    setTime2({ days: '', hours: '', minutes: '', seconds: '' });
  };

  const clearDateTime = () => {
    setStartDateTime({
      date: new Date().toISOString().split('T')[0],
      time: '00:00'
    });
    setDuration({ days: '', hours: '', minutes: '', seconds: '' });
  };

  const clearConverter = () => {
    setConvertValue('');
  };

  const clearExpression = () => {
    setExpression('');
  };

  // Calculate Add/Subtract Time
  const calculateAddSubtract = (): TimeResult | null => {
    try {
      const totalSeconds1 = 
        (parseInt(time1.days) || 0) * 86400 +
        (parseInt(time1.hours) || 0) * 3600 +
        (parseInt(time1.minutes) || 0) * 60 +
        (parseInt(time1.seconds) || 0);
      
      const totalSeconds2 = 
        (parseInt(time2.days) || 0) * 86400 +
        (parseInt(time2.hours) || 0) * 3600 +
        (parseInt(time2.minutes) || 0) * 60 +
        (parseInt(time2.seconds) || 0);
      
      const resultSeconds = operation1 === 'add' 
        ? totalSeconds1 + totalSeconds2 
        : totalSeconds1 - totalSeconds2;
      
      if (resultSeconds < 0) return null;
      
      const days = Math.floor(resultSeconds / 86400);
      const hours = Math.floor((resultSeconds % 86400) / 3600);
      const minutes = Math.floor((resultSeconds % 3600) / 60);
      const seconds = resultSeconds % 60;
      
      return {
        days,
        hours,
        minutes,
        seconds,
        totalSeconds: resultSeconds,
        totalMinutes: resultSeconds / 60,
        totalHours: resultSeconds / 3600,
        totalDays: resultSeconds / 86400
      };
    } catch {
      return null;
    }
  };

  // Calculate Date + Time
  const calculateDateTime = (): { result: Date; duration: TimeResult } | null => {
    try {
      const [startHours, startMinutes] = startDateTime.time.split(':').map(Number);
      const startDate = new Date(startDateTime.date);
      startDate.setHours(startHours, startMinutes, 0, 0);
      
      const durationSeconds = 
        (parseInt(duration.days) || 0) * 86400 +
        (parseInt(duration.hours) || 0) * 3600 +
        (parseInt(duration.minutes) || 0) * 60 +
        (parseInt(duration.seconds) || 0);
      
      const resultDate = new Date(startDate.getTime() + (operation2 === 'add' ? 1 : -1) * durationSeconds * 1000);
      
      const days = Math.floor(durationSeconds / 86400);
      const hours = Math.floor((durationSeconds % 86400) / 3600);
      const minutes = Math.floor((durationSeconds % 3600) / 60);
      const seconds = durationSeconds % 60;
      
      return {
        result: resultDate,
        duration: {
          days,
          hours,
          minutes,
          seconds,
          totalSeconds: durationSeconds,
          totalMinutes: durationSeconds / 60,
          totalHours: durationSeconds / 3600,
          totalDays: durationSeconds / 86400
        }
      };
    } catch {
      return null;
    }
  };

  // Calculate Unit Conversion
  const calculateConversion = () => {
    const value = parseFloat(convertValue) || 0;
    let totalSeconds = 0;
    
    switch (convertFrom) {
      case 'seconds':
        totalSeconds = value;
        break;
      case 'minutes':
        totalSeconds = value * 60;
        break;
      case 'hours':
        totalSeconds = value * 3600;
        break;
      case 'days':
        totalSeconds = value * 86400;
        break;
    }
    
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    return {
      days,
      hours,
      minutes,
      seconds,
      totalSeconds,
      totalMinutes: totalSeconds / 60,
      totalHours: totalSeconds / 3600,
      totalDays: totalSeconds / 86400,
      milliseconds: totalSeconds * 1000
    };
  };

  // Parse Expression
  const calculateExpression = (): TimeResult | null => {
    try {
      let totalSeconds = 0;
      const tokens = expression.toLowerCase().match(/[+-]?\s*\d+[dhms]/g);
      
      if (!tokens) return null;
      
      for (const token of tokens) {
        const isNegative = token.trim().startsWith('-');
        const match = token.match(/(\d+)([dhms])/);
        if (!match) continue;
        
        const value = parseInt(match[1]);
        const unit = match[2];
        
        let seconds = 0;
        switch (unit) {
          case 'd':
            seconds = value * 86400;
            break;
          case 'h':
            seconds = value * 3600;
            break;
          case 'm':
            seconds = value * 60;
            break;
          case 's':
            seconds = value;
            break;
        }
        
        totalSeconds += isNegative ? -seconds : seconds;
      }
      
      if (totalSeconds < 0) return null;
      
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      return {
        days,
        hours,
        minutes,
        seconds,
        totalSeconds,
        totalMinutes: totalSeconds / 60,
        totalHours: totalSeconds / 3600,
        totalDays: totalSeconds / 86400
      };
    } catch {
      return null;
    }
  };

  const result1 = useMemo(() => calculateAddSubtract(), [time1, time2, operation1]);
  const dateTimeResult = useMemo(() => calculateDateTime(), [startDateTime, duration, operation2]);
  const conversionResult = useMemo(() => calculateConversion(), [convertValue, convertFrom]);
  const result4 = useMemo(() => calculateExpression(), [expression]);

  // Share functionality

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* 1. Add/Subtract Time */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Add or Subtract Time</h3>
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
              <label className="text-sm font-medium text-gray-700 mb-2 block">Time 1</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: 'days', label: 'Days' },
                  { key: 'hours', label: 'Hours' },
                  { key: 'minutes', label: 'Min' },
                  { key: 'seconds', label: 'Sec' }
                ].map(({ key, label }) => (
                  <div key={key}>
                    <input
                      type="number"
                      value={time1[key as keyof TimeInput]}
                      onChange={(e) => setTime1({ ...time1, [key]: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center"
                      placeholder="0"
                    />
                    <div className="text-xs text-gray-500 mt-1 text-center">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setOperation1('add')}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  operation1 === 'add'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Add (+)
              </button>
              <button
                onClick={() => setOperation1('subtract')}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  operation1 === 'subtract'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Subtract (−)
              </button>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Time 2</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: 'days', label: 'Days' },
                  { key: 'hours', label: 'Hours' },
                  { key: 'minutes', label: 'Min' },
                  { key: 'seconds', label: 'Sec' }
                ].map(({ key, label }) => (
                  <div key={key}>
                    <input
                      type="number"
                      value={time2[key as keyof TimeInput]}
                      onChange={(e) => setTime2({ ...time2, [key]: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center"
                      placeholder="0"
                    />
                    <div className="text-xs text-gray-500 mt-1 text-center">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-center">
            {result1 ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Result</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {result1.days}d {result1.hours}h {result1.minutes}m {result1.seconds}s
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-xs text-gray-500">Total Seconds</div>
                    <div className="text-lg font-semibold text-gray-900">{result1.totalSeconds.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Total Hours</div>
                    <div className="text-lg font-semibold text-gray-900">{result1.totalHours.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Enter values to calculate</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Date + Time Calculator */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Date + Time Calculator</h3>
          </div>
          <button
            onClick={clearDateTime}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Start Date & Time</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={startDateTime.date}
                  onChange={(e) => setStartDateTime({ ...startDateTime, date: e.target.value })}
                  lang="en"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
                <input
                  type="time"
                  value={startDateTime.time}
                  onChange={(e) => setStartDateTime({ ...startDateTime, time: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setOperation2('add')}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  operation2 === 'add'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Add (+)
              </button>
              <button
                onClick={() => setOperation2('subtract')}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  operation2 === 'subtract'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Subtract (−)
              </button>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Duration</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: 'days', label: 'Days' },
                  { key: 'hours', label: 'Hours' },
                  { key: 'minutes', label: 'Min' },
                  { key: 'seconds', label: 'Sec' }
                ].map(({ key, label }) => (
                  <div key={key}>
                    <input
                      type="number"
                      value={duration[key as keyof TimeInput]}
                      onChange={(e) => setDuration({ ...duration, [key]: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-center"
                      placeholder="0"
                    />
                    <div className="text-xs text-gray-500 mt-1 text-center">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-center">
            {dateTimeResult ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Result Date & Time</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatDateTime(dateTimeResult.result)}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-xs text-gray-500">Duration (Hours)</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {dateTimeResult.duration.totalHours.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Duration (Days)</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {dateTimeResult.duration.totalDays.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Enter values to calculate</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Unit Converter */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Time Unit Converter</h3>
          </div>
          <button
            onClick={clearConverter}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Convert From</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={convertValue}
                onChange={(e) => setConvertValue(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="Enter value"
              />
              <select
                value={convertFrom}
                onChange={(e) => setConvertFrom(e.target.value as any)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
              >
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            {conversionResult && convertValue ? (
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Standard Format</div>
                  <div className="text-xl font-bold text-gray-900">
                    {conversionResult.days}d {conversionResult.hours}h {conversionResult.minutes}m {conversionResult.seconds}s
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500">Seconds</div>
                    <div className="text-sm font-semibold text-gray-900">{conversionResult.totalSeconds.toLocaleString()}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500">Minutes</div>
                    <div className="text-sm font-semibold text-gray-900">{conversionResult.totalMinutes.toFixed(2)}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500">Hours</div>
                    <div className="text-sm font-semibold text-gray-900">{conversionResult.totalHours.toFixed(2)}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500">Days</div>
                    <div className="text-sm font-semibold text-gray-900">{conversionResult.totalDays.toFixed(3)}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-6">
                <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Enter value to convert</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Expression Calculator */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Expression Calculator</h3>
          </div>
          <button
            onClick={clearExpression}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Time Expression</label>
            <textarea
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-mono text-sm resize-none"
              rows={4}
              placeholder="e.g., 2d 5h 30m + 3h 45m - 1h 15m"
            />
            <div className="text-xs text-gray-500 mt-2">
              Format: d (days), h (hours), m (minutes), s (seconds). Use + and - operators.
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-center">
            {result4 ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Result</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {result4.days}d {result4.hours}h {result4.minutes}m {result4.seconds}s
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-xs text-gray-500">Total Seconds</div>
                    <div className="text-lg font-semibold text-gray-900">{result4.totalSeconds.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Total Hours</div>
                    <div className="text-lg font-semibold text-gray-900">{result4.totalHours.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Enter expression to calculate</p>
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
        calculatorName="Time Calculator"
      />
    </div>
  );
}
