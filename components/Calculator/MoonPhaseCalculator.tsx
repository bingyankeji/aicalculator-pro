'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, Moon, Calendar } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface MoonPhaseResult {
  date: Date;
  phaseName: string;
  phaseEmoji: string;
  illumination: number;
  age: number;
  phaseDescription: string;
  nextNewMoon: Date;
  nextFullMoon: Date;
  nextFirstQuarter: Date;
  nextLastQuarter: Date;
  zodiacSign: string;
  bestViewingTime: string;
  tidalInfluence: string;
}

export default function MoonPhaseCalculator() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [result, setResult] = useState<MoonPhaseResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Set default to today
  useEffect(() => {
    const today = new Date();
    setMonth((today.getMonth() + 1).toString());
    setDay(today.getDate().toString());
    setYear(today.getFullYear().toString());
  }, []);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/moon-phase-calculator',
    getShareParams: () => ({
      m: month,
      d: day,
      y: year,
    }),
    getShareText: () => {
      return result
        ? `The moon phase on ${formatDate(result.date)} is ${result.phaseName} ${result.phaseEmoji} (${result.illumination.toFixed(1)}% illuminated)`
        : 'Discover the moon phase for any date!';
    },
  });

  // Calculate moon phase using astronomical algorithms
  const calculateMoonPhase = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    let c, e, jd, b;
    
    if (month < 3) {
      const y = year - 1;
      const m = month + 12;
      c = Math.floor(y / 100);
      jd = Math.floor(365.25 * y) + Math.floor(30.6001 * (m + 1)) + day + 1720994.5;
    } else {
      c = Math.floor(year / 100);
      jd = Math.floor(365.25 * year) + Math.floor(30.6001 * (month + 1)) + day + 1720994.5;
    }
    
    // Julian day correction
    if (jd >= 2299160.5) {
      b = 2 - c + Math.floor(c / 4);
      jd += b;
    }
    
    // Calculate moon phase
    const daysSinceNewMoon = jd - 2451549.5;
    const newMoons = daysSinceNewMoon / 29.53058867;
    const phase = (newMoons - Math.floor(newMoons));
    
    return phase;
  };

  const getMoonAge = (phase: number): number => {
    return phase * 29.53058867;
  };

  const getIllumination = (phase: number): number => {
    // Calculate illumination percentage
    const angle = phase * 2 * Math.PI;
    const illumination = (1 - Math.cos(angle)) / 2 * 100;
    return illumination;
  };

  const getPhaseName = (phase: number): { name: string; emoji: string; description: string } => {
    if (phase < 0.033 || phase >= 0.967) {
      return {
        name: 'New Moon',
        emoji: '🌑',
        description: 'The moon is not visible as it is positioned between the Earth and the Sun. This is the beginning of the lunar cycle, a time for new beginnings and setting intentions.'
      };
    } else if (phase < 0.216) {
      return {
        name: 'Waxing Crescent',
        emoji: '🌒',
        description: 'A thin crescent of light appears on the right side. The moon is growing (waxing) towards the first quarter. A time for planning and building momentum.'
      };
    } else if (phase < 0.283) {
      return {
        name: 'First Quarter',
        emoji: '🌓',
        description: 'Half of the moon is illuminated on the right side. This is a time of action, decision-making, and overcoming challenges. The moon rises around noon and sets around midnight.'
      };
    } else if (phase < 0.467) {
      return {
        name: 'Waxing Gibbous',
        emoji: '🌔',
        description: 'More than half of the moon is illuminated and continuing to grow. A time for refinement, adjustment, and preparation for completion. Energy is building towards the full moon.'
      };
    } else if (phase < 0.533) {
      return {
        name: 'Full Moon',
        emoji: '🌕',
        description: 'The entire face of the moon is illuminated. The moon is opposite the Sun, rising at sunset and setting at sunrise. A time of culmination, celebration, and heightened emotions.'
      };
    } else if (phase < 0.717) {
      return {
        name: 'Waning Gibbous',
        emoji: '🌖',
        description: 'More than half illuminated but decreasing. Also called the Disseminating Moon. A time for sharing knowledge, gratitude, and beginning to release what no longer serves you.'
      };
    } else if (phase < 0.783) {
      return {
        name: 'Last Quarter',
        emoji: '🌗',
        description: 'Half of the moon is illuminated on the left side. A time for reflection, letting go, and releasing old patterns. The moon rises around midnight and sets around noon.'
      };
    } else {
      return {
        name: 'Waning Crescent',
        emoji: '🌘',
        description: 'A thin crescent on the left side, shrinking towards the new moon. A time for rest, surrender, and preparing for renewal. The cycle is completing.'
      };
    }
  };

  const getNextPhaseDate = (currentDate: Date, targetPhase: number): Date => {
    const currentPhase = calculateMoonPhase(currentDate);
    let daysToAdd;
    
    if (targetPhase > currentPhase) {
      daysToAdd = (targetPhase - currentPhase) * 29.53058867;
    } else {
      daysToAdd = (1 - currentPhase + targetPhase) * 29.53058867;
    }
    
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + Math.round(daysToAdd));
    
    return nextDate;
  };

  const getZodiacSign = (date: Date): string => {
    // Simplified zodiac calculation (actual moon zodiac changes every 2-3 days)
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    const signs = [
      'Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋', 
      'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Scorpio ♏',
      'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'
    ];
    const signIndex = Math.floor((dayOfYear % 365) / 30.4) % 12;
    return signs[signIndex];
  };

  const getTidalInfluence = (phaseName: string): string => {
    if (phaseName === 'New Moon' || phaseName === 'Full Moon') {
      return 'Spring Tides (High) - Expect higher than normal high tides and lower than normal low tides due to the alignment of the Sun, Moon, and Earth.';
    } else if (phaseName === 'First Quarter' || phaseName === 'Last Quarter') {
      return 'Neap Tides (Low) - Tidal ranges are at their minimum. High tides are lower and low tides are higher than average.';
    } else {
      return 'Moderate Tides - Tidal ranges are transitioning between spring and neap tides.';
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatShortDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const calculate = () => {
    const m = parseInt(month);
    const d = parseInt(day);
    const y = parseInt(year);
    
    if (!month || !day || !year || isNaN(m) || isNaN(d) || isNaN(y)) {
      alert('Please enter a complete date.');
      return;
    }

    if (m < 1 || m > 12) {
      alert('Please enter a valid month (1-12).');
      return;
    }

    if (d < 1 || d > 31) {
      alert('Please enter a valid day (1-31).');
      return;
    }

    if (y < 1900 || y > 2100) {
      alert('Please enter a year between 1900 and 2100.');
      return;
    }

    const selectedDate = new Date(y, m - 1, d);
    const phase = calculateMoonPhase(selectedDate);
    const age = getMoonAge(phase);
    const illumination = getIllumination(phase);
    const phaseInfo = getPhaseName(phase);
    
    // Calculate next major phases
    const nextNewMoon = getNextPhaseDate(selectedDate, 0);
    const nextFirstQuarter = getNextPhaseDate(selectedDate, 0.25);
    const nextFullMoon = getNextPhaseDate(selectedDate, 0.5);
    const nextLastQuarter = getNextPhaseDate(selectedDate, 0.75);
    
    const zodiacSign = getZodiacSign(selectedDate);
    const tidalInfluence = getTidalInfluence(phaseInfo.name);
    
    // Best viewing time based on phase
    let bestViewingTime = '';
    if (phaseInfo.name === 'New Moon') {
      bestViewingTime = 'Not visible - Moon is too close to the Sun';
    } else if (phaseInfo.name === 'Full Moon') {
      bestViewingTime = 'All night - Rises at sunset, sets at sunrise';
    } else if (phaseInfo.name.includes('Waxing')) {
      bestViewingTime = 'Evening - Look west after sunset';
    } else {
      bestViewingTime = 'Morning - Look east before sunrise';
    }

    setResult({
      date: selectedDate,
      phaseName: phaseInfo.name,
      phaseEmoji: phaseInfo.emoji,
      illumination,
      age,
      phaseDescription: phaseInfo.description,
      nextNewMoon,
      nextFullMoon,
      nextFirstQuarter,
      nextLastQuarter,
      zodiacSign,
      bestViewingTime,
      tidalInfluence
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
      link.download = `moon-phase-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Moon Phase Results</title>
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
        <div className="xl:col-span-1">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="month" className="text-sm font-medium text-gray-700">
                  Month <span className="text-red-500">*</span>
                </Label>
                <select
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select month...</option>
                  {months.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="day" className="text-sm font-medium text-gray-700">
                  Day <span className="text-red-500">*</span>
                </Label>
                <input
                  id="day"
                  type="number"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 15"
                  min="1"
                  max="31"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-medium text-gray-700">
                  Year <span className="text-red-500">*</span>
                </Label>
                <input
                  id="year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
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
                Calculate Moon Phase
              </Button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
                <p className="font-semibold text-blue-900 mb-2">💡 About Moon Phases</p>
                <p>The moon completes a full cycle approximately every 29.5 days, transitioning through eight distinct phases from new moon to full moon and back again.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <Moon className="h-5 w-5" />
                  Moon Phase Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Main Phase Display */}
                    <div className="text-center bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8 border-2 border-blue-200">
                      <div className="text-8xl mb-4">{result.phaseEmoji}</div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{result.phaseName}</h3>
                      <p className="text-gray-600 mb-4">{formatDate(result.date)}</p>
                      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="text-2xl font-bold text-blue-600">{result.illumination.toFixed(1)}%</div>
                          <div className="text-xs text-gray-600">Illuminated</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="text-2xl font-bold text-blue-600">{result.age.toFixed(1)}</div>
                          <div className="text-xs text-gray-600">Days Old</div>
                        </div>
                      </div>
                    </div>

                    {/* Phase Description */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span>📖</span>
                        Phase Description
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{result.phaseDescription}</p>
                    </div>

                    {/* Viewing Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                          <span>🔭</span>
                          Best Viewing Time
                        </h4>
                        <p className="text-sm text-gray-700">{result.bestViewingTime}</p>
                      </div>

                      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                        <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                          <span>✨</span>
                          Moon in Zodiac
                        </h4>
                        <p className="text-sm text-gray-700">{result.zodiacSign}</p>
                      </div>
                    </div>

                    {/* Tidal Influence */}
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                      <h4 className="font-semibold text-cyan-900 mb-2 flex items-center gap-2">
                        <span>🌊</span>
                        Tidal Influence
                      </h4>
                      <p className="text-sm text-gray-700">{result.tidalInfluence}</p>
                    </div>

                    {/* Next Major Phases */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span>📅</span>
                        Upcoming Moon Phases
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🌑</span>
                            <span className="text-sm font-medium text-gray-700">New Moon</span>
                          </div>
                          <span className="text-xs text-gray-600">{formatShortDate(result.nextNewMoon)}</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🌓</span>
                            <span className="text-sm font-medium text-gray-700">First Quarter</span>
                          </div>
                          <span className="text-xs text-gray-600">{formatShortDate(result.nextFirstQuarter)}</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🌕</span>
                            <span className="text-sm font-medium text-gray-700">Full Moon</span>
                          </div>
                          <span className="text-xs text-gray-600">{formatShortDate(result.nextFullMoon)}</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🌗</span>
                            <span className="text-sm font-medium text-gray-700">Last Quarter</span>
                          </div>
                          <span className="text-xs text-gray-600">{formatShortDate(result.nextLastQuarter)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Moon Phase Calendar */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-5">
                      <h4 className="font-semibold text-gray-900 mb-3">🌙 Complete Lunar Cycle</h4>
                      <div className="flex items-center justify-between text-center">
                        <div className="flex-1">
                          <div className="text-3xl mb-1">🌑</div>
                          <div className="text-xs text-gray-600">New</div>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="flex-1">
                          <div className="text-3xl mb-1">🌒</div>
                          <div className="text-xs text-gray-600">Crescent</div>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="flex-1">
                          <div className="text-3xl mb-1">🌓</div>
                          <div className="text-xs text-gray-600">Quarter</div>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="flex-1">
                          <div className="text-3xl mb-1">🌔</div>
                          <div className="text-xs text-gray-600">Gibbous</div>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="flex-1">
                          <div className="text-3xl mb-1">🌕</div>
                          <div className="text-xs text-gray-600">Full</div>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="flex-1">
                          <div className="text-3xl mb-1">🌖</div>
                          <div className="text-xs text-gray-600">Gibbous</div>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="flex-1">
                          <div className="text-3xl mb-1">🌗</div>
                          <div className="text-xs text-gray-600">Quarter</div>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="flex-1">
                          <div className="text-3xl mb-1">🌘</div>
                          <div className="text-xs text-gray-600">Crescent</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Moon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Select a date to see the moon phase</p>
                    <p className="text-sm mt-2">Discover the lunar cycle for any date in history or future!</p>
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
        calculatorName="Moon Phase Calculator"
      />
    </div>
  );
}

