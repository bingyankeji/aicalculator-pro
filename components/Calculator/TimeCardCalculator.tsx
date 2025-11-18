'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  Download, 
  Printer, 
  Share2,
  Copy,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface TimeEntry {
  id: string;
  day: string;
  from: string;
  to: string;
  breakDeduction: string;
}

interface DailyResult {
  day: string;
  summary: string;
  breakText?: string;
  hours: number;
  hoursDisplay: string;
}

interface CalculationResult {
  totalHours: number;
  totalHoursDisplay: string;
  dailyResults: DailyResult[];
  // 高级功能
  regularHours?: number;
  overtimeHours?: number;
  doubleTimeHours?: number;
  regularPay?: number;
  overtimePay?: number;
  doubleTimePay?: number;
  totalPay?: number;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function TimeCardCalculator() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    { id: '1', day: 'Monday', from: '8:30AM', to: '5:00PM', breakDeduction: '0:30' },
  ]);
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // 高级设置
  const [hourlyRate, setHourlyRate] = useState('20');
  const [overtimeRate, setOvertimeRate] = useState('1.5');
  const [doubleTimeRate, setDoubleTimeRate] = useState('2');
  const [regularHoursLimit, setRegularHoursLimit] = useState('40');
  const [overtimeLimit, setOvertimeLimit] = useState('50');
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/time-card-calculator',
    getShareParams: () => ({}),
    getShareText: () => {
      if (!result) return 'Check out this Time Card Calculator!';
      
      // If advanced pay calculation is enabled and available
      if (result.totalPay !== undefined) {
        return `My work hours: ${result.totalHours.toFixed(2)} hours, Total pay: $${result.totalPay.toFixed(2)}`;
      }
      
      // Basic time calculation only
      return `My work hours: ${result.totalHoursDisplay}`;
    },
  });

  // Add new time entry
  const handleAddEntry = () => {
    const usedDays = timeEntries.map(e => e.day);
    const availableDay = DAYS.find(d => !usedDays.includes(d)) || DAYS[0];
    
    setTimeEntries([
      ...timeEntries,
      { 
        id: Date.now().toString(), 
        day: availableDay, 
        from: '8:30AM', 
        to: '5:00PM', 
        breakDeduction: '0:30' 
      }
    ]);
  };

  // Delete time entry
  const handleDeleteEntry = (id: string) => {
    if (timeEntries.length === 1) {
      alert('At least one entry is required.');
      return;
    }
    setTimeEntries(timeEntries.filter(e => e.id !== id));
  };

  // Update time entry
  const handleUpdateEntry = (id: string, field: keyof TimeEntry, value: string) => {
    setTimeEntries(timeEntries.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  // Copy first row data down
  const handleCopyFirstRow = () => {
    if (timeEntries.length === 0) return;
    const first = timeEntries[0];
    setTimeEntries(timeEntries.map((e, idx) => 
      idx === 0 ? e : { ...e, from: first.from, to: first.to, breakDeduction: first.breakDeduction }
    ));
  };

  // Clear all
  const handleClearAll = () => {
    setTimeEntries([
      { id: '1', day: 'Monday', from: '8:30AM', to: '5:00PM', breakDeduction: '0:30' }
    ]);
    setResult(null);
  };

  // Parse time string to minutes
  const parseTime = (timeStr: string): number | null => {
    if (!timeStr || !timeStr.trim()) return null;
    
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)?/i);
    if (!match) return null;
    
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3]?.toUpperCase();
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return hours * 60 + minutes;
  };

  // Parse duration string (like "0:30") to minutes
  const parseDuration = (durationStr: string): number => {
    if (!durationStr || !durationStr.trim()) return 0;
    
    const match = durationStr.match(/(\d+):(\d+)/);
    if (!match) return 0;
    
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    
    return hours * 60 + minutes;
  };

  // Format hours to display string (e.g., "8h" or "7h 25m")
  const formatHours = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (minutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${minutes}m`;
  };

  // Calculate work hours
  const calculate = () => {
    let totalMinutes = 0;
    const dailyResults: DailyResult[] = [];

    // Calculate each day
    timeEntries.forEach(entry => {
      const fromMinutes = parseTime(entry.from);
      const toMinutes = parseTime(entry.to);
      
      if (fromMinutes === null || toMinutes === null) {
        if (entry.from || entry.to) {
          dailyResults.push({
            day: entry.day,
            summary: entry.from && entry.to ? `${entry.from}-${entry.to}` : '-',
            breakText: '',
            hours: 0,
            hoursDisplay: '0h'
          });
        }
        return;
      }

      let workedMinutes = toMinutes - fromMinutes;
      if (workedMinutes < 0) workedMinutes += 24 * 60; // Next day

      const breakMinutes = parseDuration(entry.breakDeduction);
      workedMinutes = Math.max(0, workedMinutes - breakMinutes);
      
      totalMinutes += workedMinutes;

      // Build summary string with better formatting
      let summary = `${entry.from}-${entry.to}`;
      const breakText = breakMinutes > 0 ? ` (${formatHours(breakMinutes)} break)` : '';

      dailyResults.push({
        day: entry.day,
        summary: summary,
        breakText: breakText,
        hours: workedMinutes,
        hoursDisplay: formatHours(workedMinutes)
      });
    });

    const totalHours = totalMinutes / 60;
    const resultData: CalculationResult = {
      totalHours,
      totalHoursDisplay: formatHours(totalMinutes),
      dailyResults
    };

    // 如果开启高级模式，计算薪酬
    if (showAdvanced && hourlyRate && parseFloat(hourlyRate) > 0) {
      const rate = parseFloat(hourlyRate);
      const overtimeMultiplier = parseFloat(overtimeRate);
      const doubleTimeMultiplier = parseFloat(doubleTimeRate);
      const regularLimit = parseFloat(regularHoursLimit);
      const overtimeUpperLimit = parseFloat(overtimeLimit);

      let regularHours = Math.min(totalHours, regularLimit);
      let overtimeHours = 0;
      let doubleTimeHours = 0;

      if (totalHours > regularLimit) {
        const excessHours = totalHours - regularLimit;
        overtimeHours = Math.min(excessHours, overtimeUpperLimit - regularLimit);
        doubleTimeHours = Math.max(0, totalHours - overtimeUpperLimit);
      }

      const regularPay = regularHours * rate;
      const overtimePay = overtimeHours * rate * overtimeMultiplier;
      const doubleTimePay = doubleTimeHours * rate * doubleTimeMultiplier;
      const totalPay = regularPay + overtimePay + doubleTimePay;

      resultData.regularHours = regularHours;
      resultData.overtimeHours = overtimeHours;
      resultData.doubleTimeHours = doubleTimeHours;
      resultData.regularPay = regularPay;
      resultData.overtimePay = overtimePay;
      resultData.doubleTimePay = doubleTimePay;
      resultData.totalPay = totalPay;
    }

    setResult(resultData);
  };

  // Save as Image
  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `timecard-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  // Print
  const handlePrint = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Time Card Report</title>
              <style>
                body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print {
                  body { padding: 0; }
                  img { max-width: 100%; page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" onload="window.print();"/>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
      alert('Failed to print. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Time Entries
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Time Entries */}
              <div className="space-y-3">
                {timeEntries.map((entry, index) => (
                  <div key={entry.id} className="border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-gray-900">
                        {entry.day}
                      </Label>
                      <Button
                        onClick={() => handleDeleteEntry(entry.id)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs text-gray-600">From</Label>
                        <input
                          type="text"
                          value={entry.from}
                          onChange={(e) => handleUpdateEntry(entry.id, 'from', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="8:30AM"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-xs text-gray-600">To</Label>
                        <input
                          type="text"
                          value={entry.to}
                          onChange={(e) => handleUpdateEntry(entry.id, 'to', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="5:00PM"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-600">Break Deduction</Label>
                      <input
                        type="text"
                        value={entry.breakDeduction}
                        onChange={(e) => handleUpdateEntry(entry.id, 'breakDeduction', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0:30"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleAddEntry}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  disabled={timeEntries.length >= 7}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Day
                </Button>
                <Button 
                  onClick={handleCopyFirstRow}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy First
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings Toggle */}
          <Card className="shadow-lg">
            <CardHeader 
              className="bg-gradient-to-r from-gray-50 to-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-gray-700 flex items-center gap-2">
                  💰 Advanced: Pay Calculation
                </CardTitle>
                {showAdvanced ? (
                  <ChevronUp className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Optional salary & overtime calculation</p>
            </CardHeader>
            {showAdvanced && (
              <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate" className="text-sm font-medium">
                  Hourly Rate ($) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="hourlyRate"
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="20"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="overtimeRate" className="text-sm font-medium">
                  Overtime Multiplier <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="overtimeRate"
                  type="number"
                  value={overtimeRate}
                  onChange={(e) => setOvertimeRate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1.5"
                  min="1"
                  step="0.1"
                />
                <p className="text-xs text-gray-500">Default: 1.5× (time and a half)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="doubleTimeRate" className="text-sm font-medium">
                  Double Time Multiplier <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="doubleTimeRate"
                  type="number"
                  value={doubleTimeRate}
                  onChange={(e) => setDoubleTimeRate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2"
                  min="1"
                  step="0.1"
                />
                <p className="text-xs text-gray-500">Default: 2× (double time)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="regularHoursLimit" className="text-sm font-medium">
                  Regular Hours Limit <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="regularHoursLimit"
                  type="number"
                  value={regularHoursLimit}
                  onChange={(e) => setRegularHoursLimit(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="40"
                  min="0"
                  step="1"
                />
                <p className="text-xs text-gray-500">Default: 40 hours/week</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="overtimeLimit" className="text-sm font-medium">
                  Overtime Limit (Double Time Starts) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="overtimeLimit"
                  type="number"
                  value={overtimeLimit}
                  onChange={(e) => setOvertimeLimit(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="50"
                  min="0"
                  step="1"
                />
                <p className="text-xs text-gray-500">Default: 50 hours (double time after 50h)</p>
              </div>
              </CardContent>
            )}
          </Card>

          {/* Calculate Button */}
          <Button 
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Hours
          </Button>

          <Button 
            onClick={handleClearAll}
            variant="outline"
            className="w-full"
          >
            Clear All
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Time Card Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Simple Table - like the image */}
                    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-blue-600 text-white">
                            <th className="text-left py-3 px-4 font-semibold">Date</th>
                            <th className="text-left py-3 px-4 font-semibold">Summary</th>
                            <th className="text-right py-3 px-4 font-semibold">Hours</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.dailyResults.map((item, idx) => (
                            <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="py-3 px-4 text-gray-900">{item.day}</td>
                              <td className="py-3 px-4">
                                <div className="text-gray-900 font-medium">{item.summary}</div>
                                {item.breakText && (
                                  <div className="text-xs text-gray-500 mt-1">{item.breakText}</div>
                                )}
                              </td>
                              <td className="py-3 px-4 text-right font-semibold text-gray-900">
                                {item.hoursDisplay}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-gray-100 font-bold">
                            <td className="py-4 px-4" colSpan={2}>Total:</td>
                            <td className="py-4 px-4 text-right text-blue-700 text-lg">
                              {result.totalHoursDisplay}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Advanced Pay Calculation Results */}
                    {showAdvanced && result.totalPay !== undefined && (
                      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                        <CardHeader>
                          <CardTitle className="text-lg text-green-900 flex items-center gap-2">
                            💰 Pay Calculation
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg p-4 border border-green-200">
                              <p className="text-xs text-gray-600 mb-1">Regular Hours</p>
                              <p className="text-2xl font-bold text-gray-900">
                                {result.regularHours?.toFixed(2)}h
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                ${result.regularPay?.toFixed(2)}
                              </p>
                            </div>

                            {result.overtimeHours! > 0 && (
                              <div className="bg-white rounded-lg p-4 border border-amber-200">
                                <p className="text-xs text-gray-600 mb-1">Overtime</p>
                                <p className="text-2xl font-bold text-amber-700">
                                  {result.overtimeHours?.toFixed(2)}h
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  ${result.overtimePay?.toFixed(2)}
                                </p>
                              </div>
                            )}

                            {result.doubleTimeHours! > 0 && (
                              <div className="bg-white rounded-lg p-4 border border-red-200">
                                <p className="text-xs text-gray-600 mb-1">Double Time</p>
                                <p className="text-2xl font-bold text-red-700">
                                  {result.doubleTimeHours?.toFixed(2)}h
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  ${result.doubleTimePay?.toFixed(2)}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="bg-white rounded-lg p-6 border-2 border-green-300">
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-semibold text-gray-900">Total Pay:</span>
                              <span className="text-3xl font-bold text-green-700">
                                ${result.totalPay?.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-2">No Results Yet</p>
                    <p className="text-gray-400 text-sm">Enter your time entries and click "Calculate Hours"</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          {result && (
            <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
              <Button 
                onClick={handleSaveAsImage} 
                variant="outline" 
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Save as Image
              </Button>
              
              <Button 
                onClick={handlePrint} 
                variant="outline" 
                className="gap-2"
              >
                <Printer className="h-4 w-4" />
                Print Results
              </Button>
              
              <Button 
                onClick={handleShare} 
                variant="outline" 
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Calculator
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Time Card Calculator"
      />
    </div>
  );
}

