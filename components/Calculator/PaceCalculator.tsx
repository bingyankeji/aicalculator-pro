'use client';

import React, { useState, useEffect } from 'react';
import { Timer, TrendingUp, Target, Zap, Award, Activity } from 'lucide-react';

interface PaceResult {
  pace: {
    minutesPerMile: number;
    minutesPerKm: number;
    mphSpeed: number;
    kmhSpeed: number;
  };
  splits: {
    distance: string;
    time: string;
  }[];
  predictions: {
    distance: string;
    time: string;
  }[];
}

export function PaceCalculator() {
  const [mode, setMode] = useState<'pace' | 'time' | 'distance'>('pace');
  const [unit, setUnit] = useState<'miles' | 'km'>('miles');
  
  // For calculating pace
  const [distance, setDistance] = useState<string>('5');
  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('30');
  const [seconds, setSeconds] = useState<string>('0');
  
  // For calculating time
  const [timeDistance, setTimeDistance] = useState<string>('10');
  const [paceMinutes, setPaceMinutes] = useState<string>('8');
  const [paceSeconds, setPaceSeconds] = useState<string>('30');
  
  // For calculating distance
  const [distanceHours, setDistanceHours] = useState<string>('1');
  const [distanceMinutes, setDistanceMinutes] = useState<string>('0');
  const [distanceSeconds, setDistanceSeconds] = useState<string>('0');
  const [distancePaceMin, setDistancePaceMin] = useState<string>('9');
  const [distancePaceSec, setDistancePaceSec] = useState<string>('0');
  
  const [result, setResult] = useState<PaceResult | null>(null);

  // Calculate pace from distance and time
  const calculatePace = () => {
    const dist = parseFloat(distance);
    const h = parseFloat(hours) || 0;
    const m = parseFloat(minutes) || 0;
    const s = parseFloat(seconds) || 0;
    
    if (!dist || dist <= 0) return null;
    
    const totalSeconds = h * 3600 + m * 60 + s;
    if (totalSeconds <= 0) return null;
    
    // Calculate pace per mile/km
    const paceSecondsPerUnit = totalSeconds / dist;
    const paceMinutesPerUnit = paceSecondsPerUnit / 60;
    
    // Convert between units
    let minutesPerMile: number, minutesPerKm: number;
    if (unit === 'miles') {
      minutesPerMile = paceMinutesPerUnit;
      minutesPerKm = paceMinutesPerUnit / 1.60934;
    } else {
      minutesPerKm = paceMinutesPerUnit;
      minutesPerMile = paceMinutesPerUnit * 1.60934;
    }
    
    // Calculate speeds
    const mphSpeed = 60 / minutesPerMile;
    const kmhSpeed = 60 / minutesPerKm;
    
    return {
      minutesPerMile,
      minutesPerKm,
      mphSpeed,
      kmhSpeed,
      totalSeconds,
      totalDistance: dist,
    };
  };

  // Calculate time from distance and pace
  const calculateTime = () => {
    const dist = parseFloat(timeDistance);
    const pm = parseFloat(paceMinutes) || 0;
    const ps = parseFloat(paceSeconds) || 0;
    
    if (!dist || dist <= 0) return null;
    
    const paceSecondsPerUnit = pm * 60 + ps;
    if (paceSecondsPerUnit <= 0) return null;
    
    const totalSeconds = paceSecondsPerUnit * dist;
    
    // Calculate pace per mile/km
    let minutesPerMile: number, minutesPerKm: number;
    const paceMinutesPerUnit = paceSecondsPerUnit / 60;
    
    if (unit === 'miles') {
      minutesPerMile = paceMinutesPerUnit;
      minutesPerKm = paceMinutesPerUnit / 1.60934;
    } else {
      minutesPerKm = paceMinutesPerUnit;
      minutesPerMile = paceMinutesPerUnit * 1.60934;
    }
    
    const mphSpeed = 60 / minutesPerMile;
    const kmhSpeed = 60 / minutesPerKm;
    
    return {
      minutesPerMile,
      minutesPerKm,
      mphSpeed,
      kmhSpeed,
      totalSeconds,
      totalDistance: dist,
    };
  };

  // Calculate distance from time and pace
  const calculateDistance = () => {
    const h = parseFloat(distanceHours) || 0;
    const m = parseFloat(distanceMinutes) || 0;
    const s = parseFloat(distanceSeconds) || 0;
    const pm = parseFloat(distancePaceMin) || 0;
    const ps = parseFloat(distancePaceSec) || 0;
    
    const totalSeconds = h * 3600 + m * 60 + s;
    const paceSecondsPerUnit = pm * 60 + ps;
    
    if (totalSeconds <= 0 || paceSecondsPerUnit <= 0) return null;
    
    const dist = totalSeconds / paceSecondsPerUnit;
    
    // Calculate pace per mile/km
    let minutesPerMile: number, minutesPerKm: number;
    const paceMinutesPerUnit = paceSecondsPerUnit / 60;
    
    if (unit === 'miles') {
      minutesPerMile = paceMinutesPerUnit;
      minutesPerKm = paceMinutesPerUnit / 1.60934;
    } else {
      minutesPerKm = paceMinutesPerUnit;
      minutesPerMile = paceMinutesPerUnit * 1.60934;
    }
    
    const mphSpeed = 60 / minutesPerMile;
    const kmhSpeed = 60 / minutesPerKm;
    
    return {
      minutesPerMile,
      minutesPerKm,
      mphSpeed,
      kmhSpeed,
      totalSeconds,
      totalDistance: dist,
    };
  };

  // Generate splits
  const generateSplits = (totalDistance: number, paceSecondsPerUnit: number) => {
    const splits = [];
    const commonDistances = [1, 5, 10, 13.1, 26.2]; // miles or km
    
    for (const dist of commonDistances) {
      if (dist <= totalDistance * 1.5) {
        const time = dist * paceSecondsPerUnit;
        splits.push({
          distance: `${dist} ${unit}`,
          time: formatTime(time),
        });
      }
    }
    
    return splits;
  };

  // Generate race predictions
  const generatePredictions = (paceSecondsPerMile: number) => {
    const races = [
      { name: '5K', miles: 3.107 },
      { name: '10K', miles: 6.214 },
      { name: 'Half Marathon', miles: 13.1 },
      { name: 'Marathon', miles: 26.2 },
      { name: '50K', miles: 31.07 },
    ];
    
    return races.map(race => ({
      distance: race.name,
      time: formatTime(race.miles * paceSecondsPerMile),
    }));
  };

  const formatTime = (totalSeconds: number): string => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);
    
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const formatPace = (minutes: number): string => {
    const m = Math.floor(minutes);
    const s = Math.floor((minutes - m) * 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let calc;
    if (mode === 'pace') {
      calc = calculatePace();
    } else if (mode === 'time') {
      calc = calculateTime();
    } else {
      calc = calculateDistance();
    }
    
    if (calc) {
      const paceSecondsPerUnit = calc.totalSeconds / calc.totalDistance;
      const paceSecondsPerMile = unit === 'miles' ? paceSecondsPerUnit : paceSecondsPerUnit * 1.60934;
      
      setResult({
        pace: {
          minutesPerMile: calc.minutesPerMile,
          minutesPerKm: calc.minutesPerKm,
          mphSpeed: calc.mphSpeed,
          kmhSpeed: calc.kmhSpeed,
        },
        splits: generateSplits(calc.totalDistance, paceSecondsPerUnit),
        predictions: generatePredictions(paceSecondsPerMile),
      });
    }
  }, [mode, unit, distance, hours, minutes, seconds, timeDistance, paceMinutes, paceSeconds, 
      distanceHours, distanceMinutes, distanceSeconds, distancePaceMin, distancePaceSec]);

  const commonPaces = [
    { label: 'Easy Run', pace: 10, description: '10:00/mi' },
    { label: 'Marathon', pace: 9, description: '9:00/mi' },
    { label: 'Tempo', pace: 7.5, description: '7:30/mi' },
    { label: '5K Race', pace: 6.5, description: '6:30/mi' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4 md:space-y-6">
      {/* Mode & Unit Selection */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">What do you want to calculate?</h3>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <button
            onClick={() => setMode('pace')}
            className={`p-3 sm:p-4 rounded-lg border-2 transition-all min-h-[44px] ${
              mode === 'pace'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <Timer className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 ${mode === 'pace' ? 'text-blue-600' : 'text-gray-400'}`} />
            <div className="font-semibold text-sm">Calculate Pace</div>
            <div className="text-xs text-gray-600 mt-1">From distance & time</div>
          </button>
          
          <button
            onClick={() => setMode('time')}
            className={`p-3 sm:p-4 rounded-lg border-2 transition-all min-h-[44px] ${
              mode === 'time'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <Target className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 ${mode === 'time' ? 'text-green-600' : 'text-gray-400'}`} />
            <div className="font-semibold text-sm">Calculate Time</div>
            <div className="text-xs text-gray-600 mt-1">From distance & pace</div>
          </button>
          
          <button
            onClick={() => setMode('distance')}
            className={`p-3 sm:p-4 rounded-lg border-2 transition-all min-h-[44px] ${
              mode === 'distance'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <TrendingUp className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 ${mode === 'distance' ? 'text-purple-600' : 'text-gray-400'}`} />
            <div className="font-semibold text-sm">Calculate Distance</div>
            <div className="text-xs text-gray-600 mt-1">From time & pace</div>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setUnit('miles')}
            className={`px-4 sm:px-6 py-3 min-h-[44px] rounded-lg font-medium transition-colors ${
              unit === 'miles'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Miles
          </button>
          <button
            onClick={() => setUnit('km')}
            className={`px-4 sm:px-6 py-3 min-h-[44px] rounded-lg font-medium transition-colors ${
              unit === 'km'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Kilometers
          </button>
        </div>
      </div>

      {/* Calculate Pace */}
      {mode === 'pace' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Pace</h3>
          
          <div className="grid xl:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Distance ({unit})</label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder={unit === 'miles' ? '5' : '8'}
                step="0.01"
                className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                />
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  placeholder="30"
                  className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                />
                <input
                  type="number"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 text-center">
                <span>Hours</span>
                <span>Minutes</span>
                <span>Seconds</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calculate Time */}
      {mode === 'time' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Calculate Finish Time</h3>
          
          <div className="grid xl:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Distance ({unit})</label>
              <input
                type="number"
                value={timeDistance}
                onChange={(e) => setTimeDistance(e.target.value)}
                placeholder={unit === 'miles' ? '10' : '16'}
                step="0.01"
                className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Pace (per {unit === 'miles' ? 'mile' : 'km'})</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={paceMinutes}
                  onChange={(e) => setPaceMinutes(e.target.value)}
                  placeholder="8"
                  className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                />
                <input
                  type="number"
                  value={paceSeconds}
                  onChange={(e) => setPaceSeconds(e.target.value)}
                  placeholder="30"
                  className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 text-center">
                <span>Minutes</span>
                <span>Seconds</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calculate Distance */}
      {mode === 'distance' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Calculate Distance Covered</h3>
          
          <div className="grid xl:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  value={distanceHours}
                  onChange={(e) => setDistanceHours(e.target.value)}
                  placeholder="1"
                  className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                />
                <input
                  type="number"
                  value={distanceMinutes}
                  onChange={(e) => setDistanceMinutes(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                />
                <input
                  type="number"
                  value={distanceSeconds}
                  onChange={(e) => setDistanceSeconds(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 text-center">
                <span>Hours</span>
                <span>Minutes</span>
                <span>Seconds</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Pace (per {unit === 'miles' ? 'mile' : 'km'})</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={distancePaceMin}
                  onChange={(e) => setDistancePaceMin(e.target.value)}
                  placeholder="9"
                  className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                />
                <input
                  type="number"
                  value={distancePaceSec}
                  onChange={(e) => setDistancePaceSec(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 text-center">
                <span>Minutes</span>
                <span>Seconds</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <>
          {/* Main Results */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Results</h3>
            
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-5 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-600 mb-1">Pace per Mile</div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-700 break-all">
                  {formatPace(result.pace.minutesPerMile)}
                  <span className="text-sm sm:text-lg ml-1">/mi</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-5 rounded-lg border border-green-200">
                <div className="text-sm text-green-600 mb-1">Pace per Kilometer</div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 break-all">
                  {formatPace(result.pace.minutesPerKm)}
                  <span className="text-sm sm:text-lg ml-1">/km</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-5 rounded-lg border border-purple-200">
                <div className="text-sm text-purple-600 mb-1">Speed (mph)</div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-700 break-all">
                  {result.pace.mphSpeed.toFixed(2)}
                  <span className="text-sm sm:text-lg ml-1">mph</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-5 rounded-lg border border-orange-200">
                <div className="text-sm text-orange-600 mb-1">Speed (km/h)</div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-700 break-all">
                  {result.pace.kmhSpeed.toFixed(2)}
                  <span className="text-sm sm:text-lg ml-1">km/h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Splits */}
          {result.splits.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-600" />
                Split Times
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                {result.splits.map((split, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="font-bold text-gray-900 text-lg">{split.distance}</div>
                    <div className="text-sm text-gray-600 mt-1">{split.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Race Predictions */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-600" />
              Race Time Predictions
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Estimated finish times at your current pace
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {result.predictions.map((pred, idx) => (
                <div key={idx} className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200 text-center">
                  <div className="font-bold text-yellow-900 text-sm">{pred.distance}</div>
                  <div className="text-lg font-bold text-yellow-700 mt-1">{pred.time}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

