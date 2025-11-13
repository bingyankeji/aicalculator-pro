'use client';

import { useState, useEffect } from 'react';
import { Share2, Download, Printer } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  nextBirthday: {
    date: Date;
    daysUntil: number;
    dayOfWeek: string;
  };
  birthDayOfWeek: string;
  zodiacSign: string;
  chineseZodiac: string;
  lifeStage: string;
  heartbeats: number;
  breaths: number;
}

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<AgeResult | null>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/age-calculator',
    getShareParams: () => ({
      bd: birthDate,
      cd: currentDate,
    }),
    getShareText: () => 
      result 
        ? `My Age: ${result.years} years, ${result.months} months, ${result.days} days | Zodiac: ${result.zodiacSign} | Chinese: ${result.chineseZodiac}`
        : 'Calculate your exact age!',
  });

  // Load from URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bd = params.get('bd');
    if (bd) {
      setBirthDate(bd);
      calculateAge(bd, currentDate);
    }
  }, []);

  const getZodiacSign = (month: number, day: number): string => {
    const zodiacSigns = [
      { sign: 'Capricorn ♑', endDay: 19 },
      { sign: 'Aquarius ♒', endDay: 18 },
      { sign: 'Pisces ♓', endDay: 20 },
      { sign: 'Aries ♈', endDay: 19 },
      { sign: 'Taurus ♉', endDay: 20 },
      { sign: 'Gemini ♊', endDay: 20 },
      { sign: 'Cancer ♋', endDay: 22 },
      { sign: 'Leo ♌', endDay: 22 },
      { sign: 'Virgo ♍', endDay: 22 },
      { sign: 'Libra ♎', endDay: 22 },
      { sign: 'Scorpio ♏', endDay: 21 },
      { sign: 'Sagittarius ♐', endDay: 21 },
    ];

    const idx = day <= zodiacSigns[month - 1].endDay ? month - 1 : month % 12;
    return zodiacSigns[idx].sign;
  };

  const getChineseZodiac = (year: number): string => {
    const animals = ['Monkey 🐵', 'Rooster 🐔', 'Dog 🐶', 'Pig 🐷', 'Rat 🐭', 'Ox 🐂', 'Tiger 🐯', 'Rabbit 🐰', 'Dragon 🐉', 'Snake 🐍', 'Horse 🐴', 'Goat 🐐'];
    return animals[year % 12];
  };

  const getDayOfWeek = (date: Date): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const getLifeStage = (years: number): string => {
    if (years < 2) return 'Infant';
    if (years < 13) return 'Child';
    if (years < 18) return 'Teenager';
    if (years < 30) return 'Young Adult';
    if (years < 50) return 'Adult';
    if (years < 65) return 'Middle-Aged';
    return 'Senior';
  };

  const calculateAge = (birth: string, current: string) => {
    if (!birth) {
      alert('Please enter your birth date');
      return;
    }

    const birthDateTime = new Date(birth);
    const currentDateTime = new Date(current);

    if (birthDateTime > currentDateTime) {
      alert('Birth date cannot be in the future');
      return;
    }

    // Calculate exact age
    let years = currentDateTime.getFullYear() - birthDateTime.getFullYear();
    let months = currentDateTime.getMonth() - birthDateTime.getMonth();
    let days = currentDateTime.getDate() - birthDateTime.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate hours and minutes
    const timeDiff = currentDateTime.getTime() - birthDateTime.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor(timeDiff / (1000 * 60));

    // Calculate totals
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = hours;

    // Calculate next birthday
    let nextBirthday = new Date(currentDateTime.getFullYear(), birthDateTime.getMonth(), birthDateTime.getDate());
    if (nextBirthday < currentDateTime) {
      nextBirthday = new Date(currentDateTime.getFullYear() + 1, birthDateTime.getMonth(), birthDateTime.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - currentDateTime.getTime()) / (1000 * 60 * 60 * 24));

    // Get zodiac and other info
    const zodiacSign = getZodiacSign(birthDateTime.getMonth() + 1, birthDateTime.getDate());
    const chineseZodiac = getChineseZodiac(birthDateTime.getFullYear());
    const birthDayOfWeek = getDayOfWeek(birthDateTime);
    const lifeStage = getLifeStage(years);

    // Calculate fun statistics (approximate)
    const heartbeats = Math.floor(minutes * 75); // Average 75 beats per minute
    const breaths = Math.floor(minutes * 16); // Average 16 breaths per minute

    setResult({
      years,
      months,
      days,
      hours,
      minutes,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      nextBirthday: {
        date: nextBirthday,
        daysUntil: daysUntilBirthday,
        dayOfWeek: getDayOfWeek(nextBirthday),
      },
      birthDayOfWeek,
      zodiacSign,
      chineseZodiac,
      lifeStage,
      heartbeats,
      breaths,
    });
  };

  const handleCalculate = () => {
    calculateAge(birthDate, currentDate);
  };


  const handleSaveImage = async () => {
    const html2canvas = (await import('html2canvas')).default;
    const element = document.getElementById('age-result');
    if (element) {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `age-calculation-${new Date().getTime()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Calculator Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Age</h2>
        
        {/* Input Fields */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              lang="en"
              placeholder="mm/dd/yyyy"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculate Age As Of
            </label>
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              lang="en"
              placeholder="mm/dd/yyyy"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
        >
          Calculate Age
        </button>
      </div>

      {/* Results */}
      {result && (
        <div id="age-result" className="space-y-6">
          {/* Main Age Result */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Exact Age</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">{result.years}</div>
                <div className="text-sm text-gray-600 mt-1">Years</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">{result.months}</div>
                <div className="text-sm text-gray-600 mt-1">Months</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">{result.days}</div>
                <div className="text-sm text-gray-600 mt-1">Days</div>
              </div>
            </div>
            <p className="text-center text-gray-700 text-lg">
              You are <span className="font-bold">{result.years}</span> years, <span className="font-bold">{result.months}</span> months, and <span className="font-bold">{result.days}</span> days old
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center print:hidden">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share Result
            </button>
            <button
              onClick={handleSaveImage}
              className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Save as Image
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>

          {/* Detailed Statistics */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Total Time Lived */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Total Time Lived</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Days:</span>
                  <span className="font-bold text-gray-900">{result.totalDays.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Weeks:</span>
                  <span className="font-bold text-gray-900">{result.totalWeeks.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Months:</span>
                  <span className="font-bold text-gray-900">{result.totalMonths.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Hours:</span>
                  <span className="font-bold text-gray-900">{result.totalHours.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Next Birthday */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Next Birthday</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Days Until:</span>
                  <span className="font-bold text-blue-600 text-xl">{result.nextBirthday.daysUntil}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-bold text-gray-900">{result.nextBirthday.date.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Day of Week:</span>
                  <span className="font-bold text-gray-900">{result.nextBirthday.dayOfWeek}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Turning Age:</span>
                  <span className="font-bold text-gray-900">{result.years + 1}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Birth Information */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Birth Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Born on:</span>
                  <span className="font-bold text-gray-900">{result.birthDayOfWeek}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Zodiac Sign:</span>
                  <span className="font-bold text-gray-900">{result.zodiacSign}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Chinese Zodiac:</span>
                  <span className="font-bold text-gray-900">{result.chineseZodiac}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Life Stage:</span>
                  <span className="font-bold text-gray-900">{result.lifeStage}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fun Statistics */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🎉 Fun Statistics (Approximate)</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {result.heartbeats.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mt-1">Heartbeats 💓</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {result.breaths.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mt-1">Breaths 🫁</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.floor(result.totalDays / 365)}
                </div>
                <div className="text-sm text-gray-600 mt-1">Trips Around the Sun 🌍</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prompt when no calculation */}
      {!result && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-600 text-lg">
            Enter your birth date above and click "Calculate Age" to see your exact age with detailed statistics
          </p>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Age Calculator"
      />
    </div>
  );
}

