'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Gauge, Clock, MapPin, Plus, Download, Share2, Printer, TrendingUp, Zap } from 'lucide-react';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';
import html2canvas from 'html2canvas';

type CalculationMode = 'speed' | 'distance' | 'time';

interface SpeedResult {
  value: number;
  unit: string;
  conversions: {
    kmh: number;
    mph: number;
    ms: number;
    knots: number;
  };
  comparisons: Array<{
    name: string;
    speed: string;
    icon: string;
  }>;
  tips: string[];
}

interface DistanceResult {
  value: number;
  unit: string;
  conversions: {
    km: number;
    miles: number;
    meters: number;
  };
}

interface TimeResult {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export default function SpeedCalculator() {
  const [mode, setMode] = useState<CalculationMode>('speed');
  
  // Speed calculation inputs
  const [speedInputs, setSpeedInputs] = useState({
    distance: '',
    distanceUnit: 'km',
    timeHours: '',
    timeMinutes: '',
    timeSeconds: '',
  });

  // Distance calculation inputs
  const [distanceInputs, setDistanceInputs] = useState({
    speed: '',
    speedUnit: 'kmh',
    timeHours: '',
    timeMinutes: '',
    timeSeconds: '',
  });

  // Time calculation inputs
  const [timeInputs, setTimeInputs] = useState({
    distance: '',
    distanceUnit: 'km',
    speed: '',
    speedUnit: 'kmh',
  });

  // Speed converter
  const [converterValue, setConverterValue] = useState('');
  const [converterFrom, setConverterFrom] = useState('kmh');
  const [converterTo, setConverterTo] = useState('mph');
  const [converterResult, setConverterResult] = useState<number | null>(null);

  const [result, setResult] = useState<SpeedResult | DistanceResult | TimeResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const { showShareModal, setShowShareModal, shareUrl, shareTitle, shareDescription, handleShare } = useShare({
    title: 'Speed Calculator - Calculate Speed, Distance & Time',
    description: 'Free speed calculator for accurate speed, distance, and time calculations with multiple units.',
  });

  // Speed unit conversion factors (to km/h)
  const speedUnits: Record<string, { label: string; toKmh: number }> = {
    kmh: { label: 'km/h', toKmh: 1 },
    mph: { label: 'mph', toKmh: 1.60934 },
    ms: { label: 'm/s', toKmh: 3.6 },
    knots: { label: 'knots', toKmh: 1.852 },
  };

  // Distance unit conversion factors (to km)
  const distanceUnits: Record<string, { label: string; toKm: number }> = {
    km: { label: 'kilometers', toKm: 1 },
    miles: { label: 'miles', toKm: 1.60934 },
    meters: { label: 'meters', toKm: 0.001 },
    feet: { label: 'feet', toKm: 0.0003048 },
  };

  const calculateSpeed = () => {
    const distance = parseFloat(speedInputs.distance);
    const hours = parseFloat(speedInputs.timeHours || '0');
    const minutes = parseFloat(speedInputs.timeMinutes || '0');
    const seconds = parseFloat(speedInputs.timeSeconds || '0');

    if (isNaN(distance) || distance <= 0) {
      alert('Please enter a valid distance.');
      return;
    }

    const totalHours = hours + minutes / 60 + seconds / 3600;
    
    if (totalHours <= 0) {
      alert('Please enter a valid time greater than 0.');
      return;
    }

    // Convert distance to km
    const distanceInKm = distance * distanceUnits[speedInputs.distanceUnit].toKm;
    
    // Calculate speed in km/h
    const speedKmh = distanceInKm / totalHours;

    const speedResult: SpeedResult = {
      value: speedKmh,
      unit: 'km/h',
      conversions: {
        kmh: speedKmh,
        mph: speedKmh / 1.60934,
        ms: speedKmh / 3.6,
        knots: speedKmh / 1.852,
      },
      comparisons: getSpeedComparisons(speedKmh),
      tips: getSpeedTips(speedKmh),
    };

    setResult(speedResult);
  };

  const calculateDistance = () => {
    const speed = parseFloat(distanceInputs.speed);
    const hours = parseFloat(distanceInputs.timeHours || '0');
    const minutes = parseFloat(distanceInputs.timeMinutes || '0');
    const seconds = parseFloat(distanceInputs.timeSeconds || '0');

    if (isNaN(speed) || speed <= 0) {
      alert('Please enter a valid speed.');
      return;
    }

    const totalHours = hours + minutes / 60 + seconds / 3600;
    
    if (totalHours <= 0) {
      alert('Please enter a valid time greater than 0.');
      return;
    }

    // Convert speed to km/h
    const speedKmh = speed * speedUnits[distanceInputs.speedUnit].toKmh;
    
    // Calculate distance in km
    const distanceKm = speedKmh * totalHours;

    const distanceResult: DistanceResult = {
      value: distanceKm,
      unit: 'km',
      conversions: {
        km: distanceKm,
        miles: distanceKm / 1.60934,
        meters: distanceKm * 1000,
      },
    };

    setResult(distanceResult);
  };

  const calculateTime = () => {
    const distance = parseFloat(timeInputs.distance);
    const speed = parseFloat(timeInputs.speed);

    if (isNaN(distance) || distance <= 0) {
      alert('Please enter a valid distance.');
      return;
    }

    if (isNaN(speed) || speed <= 0) {
      alert('Please enter a valid speed.');
      return;
    }

    // Convert to km and km/h
    const distanceKm = distance * distanceUnits[timeInputs.distanceUnit].toKm;
    const speedKmh = speed * speedUnits[timeInputs.speedUnit].toKmh;
    
    // Calculate time in hours
    const totalHours = distanceKm / speedKmh;
    const hours = Math.floor(totalHours);
    const remainingMinutes = (totalHours - hours) * 60;
    const minutes = Math.floor(remainingMinutes);
    const seconds = Math.round((remainingMinutes - minutes) * 60);

    const timeResult: TimeResult = {
      hours,
      minutes,
      seconds,
      totalSeconds: Math.round(totalHours * 3600),
    };

    setResult(timeResult);
  };

  const handleCalculate = () => {
    switch (mode) {
      case 'speed':
        calculateSpeed();
        break;
      case 'distance':
        calculateDistance();
        break;
      case 'time':
        calculateTime();
        break;
    }
  };

  const handleClear = () => {
    setSpeedInputs({
      distance: '',
      distanceUnit: 'km',
      timeHours: '',
      timeMinutes: '',
      timeSeconds: '',
    });
    setDistanceInputs({
      speed: '',
      speedUnit: 'kmh',
      timeHours: '',
      timeMinutes: '',
      timeSeconds: '',
    });
    setTimeInputs({
      distance: '',
      distanceUnit: 'km',
      speed: '',
      speedUnit: 'kmh',
    });
    setResult(null);
  };

  const convertSpeed = () => {
    const value = parseFloat(converterValue);
    if (isNaN(value)) {
      alert('Please enter a valid number.');
      return;
    }

    // Convert to km/h first
    const valueInKmh = value * speedUnits[converterFrom].toKmh;
    // Then convert to target unit
    const result = valueInKmh / speedUnits[converterTo].toKmh;
    
    setConverterResult(result);
  };

  const getSpeedComparisons = (speedKmh: number): Array<{ name: string; speed: string; icon: string }> => {
    const comparisons = [
      { name: 'Walking', speedKmh: 5, icon: '🚶' },
      { name: 'Running', speedKmh: 15, icon: '🏃' },
      { name: 'Cycling', speedKmh: 25, icon: '🚴' },
      { name: 'City Traffic', speedKmh: 40, icon: '🚗' },
      { name: 'Highway', speedKmh: 100, icon: '🛣️' },
      { name: 'High-Speed Train', speedKmh: 300, icon: '🚄' },
      { name: 'Commercial Jet', speedKmh: 900, icon: '✈️' },
      { name: 'Sound', speedKmh: 1235, icon: '💨' },
    ];

    return comparisons
      .filter(c => Math.abs(c.speedKmh - speedKmh) / speedKmh < 2)
      .slice(0, 3)
      .map(c => ({
        name: c.name,
        speed: `${c.speedKmh} km/h`,
        icon: c.icon,
      }));
  };

  const getSpeedTips = (speedKmh: number): string[] => {
    const tips: string[] = [];
    
    if (speedKmh < 10) {
      tips.push('Perfect for leisurely walking or jogging pace');
      tips.push('Ideal for sightseeing and enjoying surroundings');
    } else if (speedKmh < 30) {
      tips.push('Good cycling or running speed');
      tips.push('Suitable for residential areas with traffic');
    } else if (speedKmh < 60) {
      tips.push('Typical city driving speed');
      tips.push('Stay alert for pedestrians and traffic signals');
    } else if (speedKmh < 120) {
      tips.push('Highway cruising speed');
      tips.push('Maintain safe following distance');
      tips.push('Check speed limits for your area');
    } else {
      tips.push('High-speed travel requires maximum attention');
      tips.push('Ensure vehicle is suitable for this speed');
      tips.push('Follow all safety regulations');
    }

    return tips;
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;

    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `speed-calculator-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          {/* Input Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-3">
              <CardTitle className="text-xl text-gray-900 mb-3">Speed Calculator</CardTitle>
              {/* Mode Selector Tabs */}
              <div className="flex gap-2 bg-white p-1 rounded-lg">
                <Button
                  onClick={() => { setMode('speed'); setResult(null); }}
                  variant={mode === 'speed' ? 'default' : 'ghost'}
                  className={`flex-1 ${mode === 'speed' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Gauge className="h-4 w-4 mr-1" />
                  Speed
                </Button>
                <Button
                  onClick={() => { setMode('distance'); setResult(null); }}
                  variant={mode === 'distance' ? 'default' : 'ghost'}
                  className={`flex-1 ${mode === 'distance' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Distance
                </Button>
                <Button
                  onClick={() => { setMode('time'); setResult(null); }}
                  variant={mode === 'time' ? 'default' : 'ghost'}
                  className={`flex-1 ${mode === 'time' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Time
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Speed Mode */}
              {mode === 'speed' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="speed-distance" className="text-sm font-medium">
                      Distance <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <input
                        id="speed-distance"
                        type="number"
                        value={speedInputs.distance}
                        onChange={(e) => setSpeedInputs({ ...speedInputs, distance: e.target.value })}
                        className="w-full px-4 py-3 pr-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="100"
                        step="0.1"
                        min="0"
                      />
                      <select
                        value={speedInputs.distanceUnit}
                        onChange={(e) => setSpeedInputs({ ...speedInputs, distanceUnit: e.target.value })}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm border-0 bg-transparent focus:ring-0"
                      >
                        {Object.entries(distanceUnits).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Time <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="relative">
                        <input
                          type="number"
                          value={speedInputs.timeHours}
                          onChange={(e) => setSpeedInputs({ ...speedInputs, timeHours: e.target.value })}
                          className="w-full px-3 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0"
                          min="0"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">hr</span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          value={speedInputs.timeMinutes}
                          onChange={(e) => setSpeedInputs({ ...speedInputs, timeMinutes: e.target.value })}
                          className="w-full px-3 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0"
                          min="0"
                          max="59"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">min</span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          value={speedInputs.timeSeconds}
                          onChange={(e) => setSpeedInputs({ ...speedInputs, timeSeconds: e.target.value })}
                          className="w-full px-3 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0"
                          min="0"
                          max="59"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">sec</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Distance Mode */}
              {mode === 'distance' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="distance-speed" className="text-sm font-medium">
                      Speed <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <input
                        id="distance-speed"
                        type="number"
                        value={distanceInputs.speed}
                        onChange={(e) => setDistanceInputs({ ...distanceInputs, speed: e.target.value })}
                        className="w-full px-4 py-3 pr-24 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="60"
                        step="0.1"
                        min="0"
                      />
                      <select
                        value={distanceInputs.speedUnit}
                        onChange={(e) => setDistanceInputs({ ...distanceInputs, speedUnit: e.target.value })}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm border-0 bg-transparent focus:ring-0"
                      >
                        {Object.entries(speedUnits).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Time <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="relative">
                        <input
                          type="number"
                          value={distanceInputs.timeHours}
                          onChange={(e) => setDistanceInputs({ ...distanceInputs, timeHours: e.target.value })}
                          className="w-full px-3 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0"
                          min="0"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">hr</span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          value={distanceInputs.timeMinutes}
                          onChange={(e) => setDistanceInputs({ ...distanceInputs, timeMinutes: e.target.value })}
                          className="w-full px-3 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0"
                          min="0"
                          max="59"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">min</span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          value={distanceInputs.timeSeconds}
                          onChange={(e) => setDistanceInputs({ ...distanceInputs, timeSeconds: e.target.value })}
                          className="w-full px-3 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0"
                          min="0"
                          max="59"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">sec</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Time Mode */}
              {mode === 'time' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="time-distance" className="text-sm font-medium">
                      Distance <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <input
                        id="time-distance"
                        type="number"
                        value={timeInputs.distance}
                        onChange={(e) => setTimeInputs({ ...timeInputs, distance: e.target.value })}
                        className="w-full px-4 py-3 pr-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="100"
                        step="0.1"
                        min="0"
                      />
                      <select
                        value={timeInputs.distanceUnit}
                        onChange={(e) => setTimeInputs({ ...timeInputs, distanceUnit: e.target.value })}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm border-0 bg-transparent focus:ring-0"
                      >
                        {Object.entries(distanceUnits).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time-speed" className="text-sm font-medium">
                      Speed <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <input
                        id="time-speed"
                        type="number"
                        value={timeInputs.speed}
                        onChange={(e) => setTimeInputs({ ...timeInputs, speed: e.target.value })}
                        className="w-full px-4 py-3 pr-24 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="60"
                        step="0.1"
                        min="0"
                      />
                      <select
                        value={timeInputs.speedUnit}
                        onChange={(e) => setTimeInputs({ ...timeInputs, speedUnit: e.target.value })}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm border-0 bg-transparent focus:ring-0"
                      >
                        {Object.entries(speedUnits).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleCalculate}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="flex-1 text-gray-600 border-gray-300 hover:bg-gray-50 font-medium py-3 min-h-[44px]"
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Speed Converter */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="text-lg text-gray-900">Speed Converter</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="converter-value" className="text-sm font-medium">Amount</Label>
                <input
                  id="converter-value"
                  type="number"
                  value={converterValue}
                  onChange={(e) => setConverterValue(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="1"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="converter-from" className="text-sm font-medium">From</Label>
                <select
                  id="converter-from"
                  value={converterFrom}
                  onChange={(e) => setConverterFrom(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(speedUnits).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="converter-to" className="text-sm font-medium">To</Label>
                <select
                  id="converter-to"
                  value={converterTo}
                  onChange={(e) => setConverterTo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(speedUnits).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <Button
                onClick={convertSpeed}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3"
              >
                <Zap className="h-5 w-5 mr-2" />
                Convert
              </Button>

              {converterResult !== null && (
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-gray-600 mb-1">Result:</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {converterResult.toFixed(2)} {speedUnits[converterTo].label}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Calculation Results</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Speed Result */}
                    {mode === 'speed' && 'conversions' in result && (
                      <>
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 sm:p-6">
                          <p className="text-sm text-gray-600 mb-2">Average Speed:</p>
                          <p className="text-4xl sm:text-5xl font-bold text-blue-700 mb-4">
                            {result.value.toFixed(2)} <span className="text-2xl">km/h</span>
                          </p>
                        </div>

                        {/* Unit Conversions */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Speed in Different Units</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                              <p className="text-xs text-gray-600 mb-1">km/h</p>
                              <p className="text-xl font-bold text-gray-900">{result.conversions.kmh.toFixed(2)}</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                              <p className="text-xs text-gray-600 mb-1">mph</p>
                              <p className="text-xl font-bold text-gray-900">{result.conversions.mph.toFixed(2)}</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                              <p className="text-xs text-gray-600 mb-1">m/s</p>
                              <p className="text-xl font-bold text-gray-900">{result.conversions.ms.toFixed(2)}</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                              <p className="text-xs text-gray-600 mb-1">knots</p>
                              <p className="text-xl font-bold text-gray-900">{result.conversions.knots.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>

                        {/* Speed Comparisons */}
                        {result.comparisons.length > 0 && (
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <TrendingUp className="h-5 w-5 text-blue-600" />
                              Speed Comparisons
                            </h3>
                            <div className="space-y-2">
                              {result.comparisons.map((comp, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 bg-white rounded">
                                  <span className="flex items-center gap-2">
                                    <span className="text-2xl">{comp.icon}</span>
                                    <span className="font-medium">{comp.name}</span>
                                  </span>
                                  <span className="text-gray-600">{comp.speed}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tips */}
                        {result.tips.length > 0 && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-3">💡 Tips & Insights</h3>
                            <ul className="space-y-2">
                              {result.tips.map((tip, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                  <span className="text-amber-500 mt-0.5">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}

                    {/* Distance Result */}
                    {mode === 'distance' && 'conversions' in result && !('comparisons' in result) && (
                      <>
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 sm:p-6">
                          <p className="text-sm text-gray-600 mb-2">Total Distance:</p>
                          <p className="text-4xl sm:text-5xl font-bold text-green-700 mb-4">
                            {result.value.toFixed(2)} <span className="text-2xl">km</span>
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Distance in Different Units</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                              <p className="text-xs text-gray-600 mb-1">Kilometers</p>
                              <p className="text-2xl font-bold text-gray-900">{result.conversions.km.toFixed(2)}</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                              <p className="text-xs text-gray-600 mb-1">Miles</p>
                              <p className="text-2xl font-bold text-gray-900">{result.conversions.miles.toFixed(2)}</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                              <p className="text-xs text-gray-600 mb-1">Meters</p>
                              <p className="text-2xl font-bold text-gray-900">{result.conversions.meters.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Time Result */}
                    {mode === 'time' && 'totalSeconds' in result && (
                      <>
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 sm:p-6">
                          <p className="text-sm text-gray-600 mb-2">Travel Time:</p>
                          <div className="flex items-baseline gap-2 flex-wrap">
                            {result.hours > 0 && (
                              <span className="text-4xl sm:text-5xl font-bold text-purple-700">
                                {result.hours}<span className="text-2xl ml-1">h</span>
                              </span>
                            )}
                            {result.minutes > 0 && (
                              <span className="text-4xl sm:text-5xl font-bold text-purple-700">
                                {result.minutes}<span className="text-2xl ml-1">m</span>
                              </span>
                            )}
                            {result.seconds > 0 && (
                              <span className="text-4xl sm:text-5xl font-bold text-purple-700">
                                {result.seconds}<span className="text-2xl ml-1">s</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-3">Time Breakdown</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total seconds:</span>
                              <span className="font-semibold">{result.totalSeconds.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total minutes:</span>
                              <span className="font-semibold">{(result.totalSeconds / 60).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total hours:</span>
                              <span className="font-semibold">{(result.totalSeconds / 3600).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Gauge className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter values and click Calculate to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Share and Export */}
          {result && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-lg text-gray-900">Share & Export</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    onClick={handleSaveAsImage}
                    variant="outline"
                    className="w-full text-green-600 border-green-200 hover:bg-green-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Save as Image
                  </Button>
                  <Button
                    onClick={handlePrint}
                    variant="outline"
                    className="w-full text-purple-600 border-purple-200 hover:bg-purple-50"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={shareTitle}
        description={shareDescription}
        url={shareUrl}
      />
    </div>
  );
}

