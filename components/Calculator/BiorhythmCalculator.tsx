'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, Calendar, Activity, TrendingUp } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface BiorhythmData {
  date: string;
  physical: number;
  emotional: number;
  intellectual: number;
  day: number;
}

interface BiorhythmResult {
  birthDate: Date;
  targetDate: Date;
  daysAlive: number;
  currentPhysical: number;
  currentEmotional: number;
  currentIntellectual: number;
  physicalPhase: string;
  emotionalPhase: string;
  intellectualPhase: string;
  criticalDays: string[];
  chartData: BiorhythmData[];
  nextPeaks: {
    physical: string;
    emotional: string;
    intellectual: string;
  };
}

export default function BiorhythmCalculator() {
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [targetMonth, setTargetMonth] = useState('');
  const [targetDay, setTargetDay] = useState('');
  const [targetYear, setTargetYear] = useState('');
  const [result, setResult] = useState<BiorhythmResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Set default target date to today
  useEffect(() => {
    const today = new Date();
    setTargetMonth((today.getMonth() + 1).toString());
    setTargetDay(today.getDate().toString());
    setTargetYear(today.getFullYear().toString());
  }, []);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/biorhythm-calculator',
    getShareParams: () => ({
      bm: birthMonth,
      bd: birthDay,
      by: birthYear,
    }),
    getShareText: () => {
      return result
        ? `Check out my biorhythm analysis! Physical: ${result.currentPhysical.toFixed(0)}%, Emotional: ${result.currentEmotional.toFixed(0)}%, Intellectual: ${result.currentIntellectual.toFixed(0)}%`
        : 'Discover your biorhythm cycles and optimal days!';
    },
  });

  const calculateBiorhythm = (birthDate: Date, targetDate: Date, cycle: number): number => {
    const msPerDay = 24 * 60 * 60 * 1000;
    const days = Math.floor((targetDate.getTime() - birthDate.getTime()) / msPerDay);
    return Math.sin((2 * Math.PI * days) / cycle) * 100;
  };

  const getPhase = (value: number): string => {
    if (value > 50) return 'High Peak';
    if (value > 0) return 'Rising';
    if (value > -50) return 'Declining';
    return 'Low Point';
  };

  const getDaysUntilNextPeak = (birthDate: Date, targetDate: Date, cycle: number): number => {
    const msPerDay = 24 * 60 * 60 * 1000;
    const currentDays = Math.floor((targetDate.getTime() - birthDate.getTime()) / msPerDay);
    const currentPhase = (currentDays % cycle) / cycle;
    
    // Peak is at 0.25 of the cycle (90 degrees)
    let daysToNextPeak;
    if (currentPhase < 0.25) {
      daysToNextPeak = Math.ceil((0.25 - currentPhase) * cycle);
    } else {
      daysToNextPeak = Math.ceil((1.25 - currentPhase) * cycle);
    }
    
    return daysToNextPeak;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const calculate = () => {
    const bm = parseInt(birthMonth);
    const bd = parseInt(birthDay);
    const by = parseInt(birthYear);
    const tm = parseInt(targetMonth);
    const td = parseInt(targetDay);
    const ty = parseInt(targetYear);
    
    if (!birthMonth || !birthDay || !birthYear || isNaN(bm) || isNaN(bd) || isNaN(by)) {
      alert('Please enter your complete birth date.');
      return;
    }

    if (!targetMonth || !targetDay || !targetYear || isNaN(tm) || isNaN(td) || isNaN(ty)) {
      alert('Please enter the target date.');
      return;
    }

    const birthDate = new Date(by, bm - 1, bd);
    const targetDate = new Date(ty, tm - 1, td);

    if (birthDate >= targetDate) {
      alert('Target date must be after birth date.');
      return;
    }

    const msPerDay = 24 * 60 * 60 * 1000;
    const daysAlive = Math.floor((targetDate.getTime() - birthDate.getTime()) / msPerDay);

    // Calculate current values
    const currentPhysical = calculateBiorhythm(birthDate, targetDate, 23);
    const currentEmotional = calculateBiorhythm(birthDate, targetDate, 28);
    const currentIntellectual = calculateBiorhythm(birthDate, targetDate, 33);

    // Generate chart data (30 days: 15 before and 15 after target date)
    const chartData: BiorhythmData[] = [];
    for (let i = -15; i <= 15; i++) {
      const date = new Date(targetDate);
      date.setDate(date.getDate() + i);
      
      const physical = calculateBiorhythm(birthDate, date, 23);
      const emotional = calculateBiorhythm(birthDate, date, 28);
      const intellectual = calculateBiorhythm(birthDate, date, 33);
      
      chartData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        physical: Math.round(physical),
        emotional: Math.round(emotional),
        intellectual: Math.round(intellectual),
        day: i
      });
    }

    // Find critical days (when cycles cross zero)
    const criticalDays: string[] = [];
    for (let i = 0; i <= 7; i++) {
      const date = new Date(targetDate);
      date.setDate(date.getDate() + i);
      
      const physical = calculateBiorhythm(birthDate, date, 23);
      const emotional = calculateBiorhythm(birthDate, date, 28);
      const intellectual = calculateBiorhythm(birthDate, date, 33);
      
      if (Math.abs(physical) < 10) {
        criticalDays.push(`${formatDate(date)}: Physical Critical Day`);
      }
      if (Math.abs(emotional) < 10) {
        criticalDays.push(`${formatDate(date)}: Emotional Critical Day`);
      }
      if (Math.abs(intellectual) < 10) {
        criticalDays.push(`${formatDate(date)}: Intellectual Critical Day`);
      }
    }

    // Calculate next peaks
    const physicalDays = getDaysUntilNextPeak(birthDate, targetDate, 23);
    const emotionalDays = getDaysUntilNextPeak(birthDate, targetDate, 28);
    const intellectualDays = getDaysUntilNextPeak(birthDate, targetDate, 33);

    const nextPhysicalPeak = new Date(targetDate);
    nextPhysicalPeak.setDate(nextPhysicalPeak.getDate() + physicalDays);
    
    const nextEmotionalPeak = new Date(targetDate);
    nextEmotionalPeak.setDate(nextEmotionalPeak.getDate() + emotionalDays);
    
    const nextIntellectualPeak = new Date(targetDate);
    nextIntellectualPeak.setDate(nextIntellectualPeak.getDate() + intellectualDays);

    setResult({
      birthDate,
      targetDate,
      daysAlive,
      currentPhysical,
      currentEmotional,
      currentIntellectual,
      physicalPhase: getPhase(currentPhysical),
      emotionalPhase: getPhase(currentEmotional),
      intellectualPhase: getPhase(currentIntellectual),
      criticalDays: criticalDays.slice(0, 5),
      chartData,
      nextPeaks: {
        physical: formatDate(nextPhysicalPeak),
        emotional: formatDate(nextEmotionalPeak),
        intellectual: formatDate(nextIntellectualPeak)
      }
    });
  };

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
      link.download = `biorhythm-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Biorhythm Results</title>
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

  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Birth Date
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="birthMonth" className="text-sm font-medium text-gray-700">
                  Month <span className="text-red-500">*</span>
                </Label>
                <select
                  id="birthMonth"
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select month...</option>
                  {months.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDay" className="text-sm font-medium text-gray-700">
                  Day <span className="text-red-500">*</span>
                </Label>
                <input
                  id="birthDay"
                  type="number"
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 15"
                  min="1"
                  max="31"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthYear" className="text-sm font-medium text-gray-700">
                  Year <span className="text-red-500">*</span>
                </Label>
                <input
                  id="birthYear"
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 1990"
                  min="1900"
                  max="2100"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Target Date
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="targetMonth" className="text-sm font-medium text-gray-700">
                  Month <span className="text-red-500">*</span>
                </Label>
                <select
                  id="targetMonth"
                  value={targetMonth}
                  onChange={(e) => setTargetMonth(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select month...</option>
                  {months.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetDay" className="text-sm font-medium text-gray-700">
                  Day <span className="text-red-500">*</span>
                </Label>
                <input
                  id="targetDay"
                  type="number"
                  value={targetDay}
                  onChange={(e) => setTargetDay(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 15"
                  min="1"
                  max="31"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetYear" className="text-sm font-medium text-gray-700">
                  Year <span className="text-red-500">*</span>
                </Label>
                <input
                  id="targetYear"
                  type="number"
                  value={targetYear}
                  onChange={(e) => setTargetYear(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 2024"
                  min="1900"
                  max="2100"
                />
              </div>

              <Button 
                onClick={calculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Biorhythm
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Your Biorhythm Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Summary */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-4">
                        <p><strong>Birth Date:</strong> {formatDate(result.birthDate)}</p>
                        <p><strong>Target Date:</strong> {formatDate(result.targetDate)}</p>
                        <p><strong>Days Alive:</strong> {result.daysAlive.toLocaleString()} days</p>
                      </div>
                    </div>

                    {/* Current Status */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <h4 className="font-semibold text-red-900">Physical</h4>
                        </div>
                        <div className="text-3xl font-bold text-red-700 mb-1">
                          {result.currentPhysical.toFixed(0)}%
                        </div>
                        <p className="text-xs text-red-600">{result.physicalPhase}</p>
                        <p className="text-xs text-gray-600 mt-2">23-day cycle</p>
                      </div>

                      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <h4 className="font-semibold text-green-900">Emotional</h4>
                        </div>
                        <div className="text-3xl font-bold text-green-700 mb-1">
                          {result.currentEmotional.toFixed(0)}%
                        </div>
                        <p className="text-xs text-green-600">{result.emotionalPhase}</p>
                        <p className="text-xs text-gray-600 mt-2">28-day cycle</p>
                      </div>

                      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <h4 className="font-semibold text-blue-900">Intellectual</h4>
                        </div>
                        <div className="text-3xl font-bold text-blue-700 mb-1">
                          {result.currentIntellectual.toFixed(0)}%
                        </div>
                        <p className="text-xs text-blue-600">{result.intellectualPhase}</p>
                        <p className="text-xs text-gray-600 mt-2">33-day cycle</p>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        30-Day Biorhythm Chart
                      </h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={result.chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 11 }}
                            interval={2}
                          />
                          <YAxis 
                            domain={[-100, 100]}
                            ticks={[-100, -50, 0, 50, 100]}
                          />
                          <Tooltip />
                          <Legend />
                          <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
                          <Line 
                            type="monotone" 
                            dataKey="physical" 
                            stroke="#ef4444" 
                            strokeWidth={2}
                            dot={false}
                            name="Physical"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="emotional" 
                            stroke="#22c55e" 
                            strokeWidth={2}
                            dot={false}
                            name="Emotional"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="intellectual" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            dot={false}
                            name="Intellectual"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Next Peaks */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Next Peak Days</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                          <span className="text-red-900 font-medium">Physical Peak:</span>
                          <span className="text-red-700">{result.nextPeaks.physical}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="text-green-900 font-medium">Emotional Peak:</span>
                          <span className="text-green-700">{result.nextPeaks.emotional}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span className="text-blue-900 font-medium">Intellectual Peak:</span>
                          <span className="text-blue-700">{result.nextPeaks.intellectual}</span>
                        </div>
                      </div>
                    </div>

                    {/* Critical Days */}
                    {result.criticalDays.length > 0 && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                          <span>⚠️</span>
                          Critical Days (Next 7 Days)
                        </h4>
                        <div className="space-y-1 text-sm text-amber-700">
                          {result.criticalDays.map((day, idx) => (
                            <div key={idx} className="p-2 bg-white rounded">
                              {day}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-amber-600 mt-3">
                          Critical days occur when a cycle crosses zero. Extra caution is advised on these days.
                        </p>
                      </div>
                    )}

                    {/* Interpretation */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-3">Understanding Your Biorhythm</h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p><strong>Physical Cycle (23 days):</strong> Affects strength, coordination, and overall physical well-being. High phases are best for sports and physical activities.</p>
                        <p><strong>Emotional Cycle (28 days):</strong> Influences mood, creativity, and sensitivity. High phases enhance relationships and artistic pursuits.</p>
                        <p><strong>Intellectual Cycle (33 days):</strong> Governs mental clarity, memory, and analytical thinking. High phases are ideal for learning and problem-solving.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Activity className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Enter your birth date and target date to calculate your biorhythm</p>
                    <p className="text-sm mt-2">Discover your physical, emotional, and intellectual cycles!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
            <Button 
              onClick={handleSaveAsImage} 
              variant="outline" 
              className="gap-2"
              disabled={!result}
            >
              <Download className="h-4 w-4" />
              Save as Image
            </Button>
            
            <Button 
              onClick={handlePrint} 
              variant="outline" 
              className="gap-2"
              disabled={!result}
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
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Biorhythm Calculator"
      />
    </div>
  );
}

