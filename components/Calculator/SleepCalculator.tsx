'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, Clock, Info, Download, Share2, Settings as SettingsIcon } from 'lucide-react';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';

interface SleepTime {
  time: string;
  cycles: number;
  hours: number;
}

const SleepCalculator = () => {
  const [wakeHour, setWakeHour] = useState('7');
  const [wakeMinute, setWakeMinute] = useState('00');
  const [wakePeriod, setWakePeriod] = useState('AM');
  const [bedHour, setBedHour] = useState('11');
  const [bedMinute, setBedMinute] = useState('00');
  const [bedPeriod, setBedPeriod] = useState('PM');
  const [sleepHours, setSleepHours] = useState('7');
  const [sleepMinutes, setSleepMinutes] = useState('30');
  const [calculationType, setCalculationType] = useState<'wake' | 'bed'>('wake');
  const [calculatorMode, setCalculatorMode] = useState<'cycle' | 'length'>('cycle');
  const [cycleResults, setCycleResults] = useState<SleepTime[]>([]);
  const [lengthResult, setLengthResult] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [sleepCycleMins, setSleepCycleMins] = useState(90);
  const [fallAsleepMins, setFallAsleepMins] = useState(15);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/sleep-calculator',
    getShareParams: () => ({}),
    getShareText: () => {
      if (cycleResults.length > 0 || lengthResult) {
        return `Sleep Calculator: Calculated optimal sleep times based on sleep cycles`;
      }
      return 'Check out this Sleep Calculator!';
    },
  });

  // Format time for display
  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  // Parse time string to Date
  const parseTime = (hour: string, minute: string, period: string): Date => {
    let hours = parseInt(hour);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    const date = new Date();
    date.setHours(hours, parseInt(minute), 0, 0);
    return date;
  };

  // Calculate bed times based on wake time (Sleep Cycle Calculator)
  const calculateCycleBedTimes = () => {
    const wake = parseTime(wakeHour, wakeMinute, wakePeriod);
    const times: SleepTime[] = [];
    
    // Calculate for 3-7 sleep cycles
    for (let cycles = 3; cycles <= 7; cycles++) {
      const totalMinutes = cycles * sleepCycleMins + fallAsleepMins;
      const bedtime = new Date(wake.getTime() - totalMinutes * 60 * 1000);
      const hours = (cycles * sleepCycleMins) / 60;
      
      times.push({
        time: formatTime(bedtime),
        cycles,
        hours
      });
    }
    
    setCycleResults(times);
  };

  // Calculate wake times based on bed time (Sleep Cycle Calculator)
  const calculateCycleWakeTimes = () => {
    const bed = parseTime(bedHour, bedMinute, bedPeriod);
    const times: SleepTime[] = [];
    
    // Add fall asleep time
    const actualSleep = new Date(bed.getTime() + fallAsleepMins * 60 * 1000);
    
    // Calculate for 3-7 sleep cycles
    for (let cycles = 3; cycles <= 7; cycles++) {
      const totalMinutes = cycles * sleepCycleMins;
      const waketime = new Date(actualSleep.getTime() + totalMinutes * 60 * 1000);
      const hours = (cycles * sleepCycleMins) / 60;
      
      times.push({
        time: formatTime(waketime),
        cycles,
        hours
      });
    }
    
    setCycleResults(times);
  };

  // Calculate based on sleep length
  const calculateSleepLength = () => {
    const totalSleepMins = parseInt(sleepHours) * 60 + parseInt(sleepMinutes);
    
    if (calculationType === 'wake') {
      // Calculate bedtime
      const wake = parseTime(wakeHour, wakeMinute, wakePeriod);
      const bedtime = new Date(wake.getTime() - (totalSleepMins + fallAsleepMins) * 60 * 1000);
      setLengthResult(`You should go to bed at ${formatTime(bedtime)}`);
    } else {
      // Calculate wake time
      const bed = parseTime(bedHour, bedMinute, bedPeriod);
      const waketime = new Date(bed.getTime() + (totalSleepMins + fallAsleepMins) * 60 * 1000);
      setLengthResult(`You should wake up at ${formatTime(waketime)}`);
    }
  };

  // Handle calculation
  const handleCalculate = () => {
    if (calculatorMode === 'cycle') {
      if (calculationType === 'wake') {
        calculateCycleBedTimes();
      } else {
        calculateCycleWakeTimes();
      }
    } else {
      calculateSleepLength();
    }
  };

  // Handle clear
  const handleClear = () => {
    setCycleResults([]);
    setLengthResult('');
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
      link.download = `sleep-calculator-${new Date().getTime()}.png`;
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
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-b border-gray-200 py-4">
          <div className="flex flex-col space-y-4">
            {/* Calculator Mode Tabs */}
            <div className="flex justify-center">
              <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
                <button
                  onClick={() => {
                    setCalculatorMode('cycle');
                    handleClear();
                  }}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    calculatorMode === 'cycle'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Sleep Cycle Calculator
                </button>
                <button
                  onClick={() => {
                    setCalculatorMode('length');
                    handleClear();
                  }}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    calculatorMode === 'length'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Sleep Length Calculator
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {calculatorMode === 'cycle' ? 'Sleep Cycle Calculator' : 'Sleep Length Calculator'}
              </CardTitle>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </button>
            </div>
          </div>
          {calculatorMode === 'cycle' && (
            <p className="text-sm text-gray-600 mt-2">
              Use this calculator to compute what time to go to bed or get up to wake up refreshed between sleep cycles.
            </p>
          )}
          {calculatorMode === 'length' && (
            <p className="text-sm text-gray-600 mt-2">
              Use this calculator to compute what time to wake up or go to bed to get a given number of hours of sleep.
            </p>
          )}
        </CardHeader>

        <CardContent className="p-6">
          {/* Settings Panel */}
          {showSettings && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Sleep Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-700 mb-1">Sleep cycle length (minutes)</Label>
                  <Input
                    type="number"
                    value={sleepCycleMins}
                    onChange={(e) => setSleepCycleMins(parseInt(e.target.value) || 90)}
                    className="h-9 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-700 mb-1">Time to fall asleep (minutes)</Label>
                  <Input
                    type="number"
                    value={fallAsleepMins}
                    onChange={(e) => setFallAsleepMins(parseInt(e.target.value) || 15)}
                    className="h-9 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-gray-700 mb-2 block">I want to</Label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="calculationType"
                    checked={calculationType === 'wake'}
                    onChange={() => setCalculationType('wake')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-900">wake up at</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="calculationType"
                    checked={calculationType === 'bed'}
                    onChange={() => setCalculationType('bed')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-900">go to bed at</span>
                </label>
              </div>
            </div>

            {/* Time Input */}
            {calculationType === 'wake' ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={wakeHour}
                  onChange={(e) => setWakeHour(e.target.value)}
                  className="w-16 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                />
                <span className="text-gray-500">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={wakeMinute}
                  onChange={(e) => setWakeMinute(e.target.value.padStart(2, '0'))}
                  className="w-16 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                />
                <select
                  value={wakePeriod}
                  onChange={(e) => setWakePeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={bedHour}
                  onChange={(e) => setBedHour(e.target.value)}
                  className="w-16 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                />
                <span className="text-gray-500">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={bedMinute}
                  onChange={(e) => setBedMinute(e.target.value.padStart(2, '0'))}
                  className="w-16 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                />
                <select
                  value={bedPeriod}
                  onChange={(e) => setBedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            )}

            {/* Sleep Length Input (only for length calculator) */}
            {calculatorMode === 'length' && (
              <div>
                <Label className="text-sm text-gray-700 mb-2 block">I want to sleep for</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(e.target.value)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                  />
                  <span className="text-sm text-gray-700">hours</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={sleepMinutes}
                    onChange={(e) => setSleepMinutes(e.target.value)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                  />
                  <span className="text-sm text-gray-700">minutes</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleCalculate}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 font-semibold"
              >
                Calculate
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="px-6 py-2"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                {calculatorMode === 'cycle' ? (
                  <>
                    <p className="font-semibold mb-1">Sleep Cycles</p>
                    <p className="text-xs">
                      Sleep happens in 90-minute cycles. Waking up between cycles (rather than during a cycle) 
                      helps you feel more refreshed and alert.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold mb-1">Sleep Duration</p>
                    <p className="text-xs">
                      Most adults need 7-9 hours of sleep per night. The calculator adds {fallAsleepMins} minutes 
                      for the time it takes to fall asleep.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

        {/* Right Panel - Results */}
        <div>
          {(cycleResults.length > 0 || lengthResult) ? (
            <Card ref={resultsRef} className="shadow-sm border border-gray-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-50/50 border-b border-gray-200 py-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {calculatorMode === 'cycle'
                  ? calculationType === 'wake'
                    ? 'Optimal Bedtimes'
                    : 'Optimal Wake Times'
                  : 'Result'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {calculatorMode === 'cycle' ? (
                <>
                  <div className="space-y-3">
                    {cycleResults.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                      >
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{result.time}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {result.cycles} sleep cycles ({result.hours.toFixed(1)} hours)
                          </p>
                        </div>
                        <Clock className="h-6 w-6 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                    <p className="text-xs text-yellow-900">
                      <strong>💡 Tip:</strong> It takes the average person about {fallAsleepMins} minutes to fall asleep, 
                      which is already factored into these times.
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-700">{lengthResult}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Based on {sleepHours}h {sleepMinutes}m of sleep
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
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
                  <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No Results Yet</p>
                  <p className="text-gray-400 text-sm">
                    Enter your {calculationType === 'wake' ? 'wake time' : 'bedtime'} and click "Calculate"
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

export default SleepCalculator;
