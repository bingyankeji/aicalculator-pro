'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, Calendar, Heart, Sparkles, Star } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

// 星座数据
const zodiacData = {
  aries: {
    name: 'Aries',
    symbol: '♈',
    emoji: '🐏',
    dates: 'March 21 - April 19',
    element: 'Fire',
    quality: 'Cardinal',
    rulingPlanet: 'Mars',
    personality: 'Bold, ambitious, and confident. Aries are natural-born leaders who love taking on challenges and pioneering new paths. They are energetic, passionate, and always ready for action.',
    strengths: 'Courageous, determined, confident, enthusiastic, optimistic, honest, passionate',
    weaknesses: 'Impatient, moody, short-tempered, impulsive, aggressive',
    luckyNumbers: [1, 8, 17],
    luckyColors: ['Red', 'Scarlet'],
    luckyStone: 'Diamond',
    compatibility: {
      best: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
      challenging: ['Cancer', 'Capricorn']
    }
  },
  taurus: {
    name: 'Taurus',
    symbol: '♉',
    emoji: '🐂',
    dates: 'April 20 - May 20',
    element: 'Earth',
    quality: 'Fixed',
    rulingPlanet: 'Venus',
    personality: 'Reliable, patient, and devoted. Taurus individuals are grounded, practical, and appreciate the finer things in life. They value stability and are known for their determination.',
    strengths: 'Reliable, patient, practical, devoted, responsible, stable',
    weaknesses: 'Stubborn, possessive, uncompromising, materialistic',
    luckyNumbers: [2, 6, 9, 12, 24],
    luckyColors: ['Green', 'Pink'],
    luckyStone: 'Emerald',
    compatibility: {
      best: ['Cancer', 'Virgo', 'Capricorn', 'Pisces'],
      challenging: ['Leo', 'Aquarius']
    }
  },
  gemini: {
    name: 'Gemini',
    symbol: '♊',
    emoji: '👯',
    dates: 'May 21 - June 20',
    element: 'Air',
    quality: 'Mutable',
    rulingPlanet: 'Mercury',
    personality: 'Curious, adaptable, and communicative. Geminis are social butterflies who love learning and sharing information. They are witty, versatile, and always seeking new experiences.',
    strengths: 'Gentle, affectionate, curious, adaptable, quick learner, witty',
    weaknesses: 'Nervous, inconsistent, indecisive, superficial',
    luckyNumbers: [5, 7, 14, 23],
    luckyColors: ['Yellow', 'Light Green'],
    luckyStone: 'Agate',
    compatibility: {
      best: ['Aries', 'Leo', 'Libra', 'Aquarius'],
      challenging: ['Virgo', 'Pisces']
    }
  },
  cancer: {
    name: 'Cancer',
    symbol: '♋',
    emoji: '🦀',
    dates: 'June 21 - July 22',
    element: 'Water',
    quality: 'Cardinal',
    rulingPlanet: 'Moon',
    personality: 'Intuitive, emotional, and nurturing. Cancers are deeply caring individuals who value home and family. They are protective, loyal, and have strong emotional intelligence.',
    strengths: 'Tenacious, highly imaginative, loyal, emotional, sympathetic, persuasive',
    weaknesses: 'Moody, pessimistic, suspicious, manipulative, insecure',
    luckyNumbers: [2, 3, 15, 20],
    luckyColors: ['White', 'Silver'],
    luckyStone: 'Pearl',
    compatibility: {
      best: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
      challenging: ['Aries', 'Libra']
    }
  },
  leo: {
    name: 'Leo',
    symbol: '♌',
    emoji: '🦁',
    dates: 'July 23 - August 22',
    element: 'Fire',
    quality: 'Fixed',
    rulingPlanet: 'Sun',
    personality: 'Confident, charismatic, and generous. Leos are natural performers who love being in the spotlight. They are warm-hearted, creative, and inspire others with their enthusiasm.',
    strengths: 'Creative, passionate, generous, warm-hearted, cheerful, humorous',
    weaknesses: 'Arrogant, stubborn, self-centered, lazy, inflexible',
    luckyNumbers: [1, 3, 10, 19],
    luckyColors: ['Gold', 'Yellow', 'Orange'],
    luckyStone: 'Ruby',
    compatibility: {
      best: ['Aries', 'Gemini', 'Libra', 'Sagittarius'],
      challenging: ['Taurus', 'Scorpio']
    }
  },
  virgo: {
    name: 'Virgo',
    symbol: '♍',
    emoji: '👧',
    dates: 'August 23 - September 22',
    element: 'Earth',
    quality: 'Mutable',
    rulingPlanet: 'Mercury',
    personality: 'Analytical, practical, and detail-oriented. Virgos are perfectionists who excel at organization and problem-solving. They are helpful, reliable, and always striving to improve.',
    strengths: 'Loyal, analytical, kind, hardworking, practical, meticulous',
    weaknesses: 'Shyness, worry, overly critical, perfectionist, conservative',
    luckyNumbers: [5, 14, 15, 23, 32],
    luckyColors: ['Grey', 'Beige', 'Pale Yellow'],
    luckyStone: 'Sapphire',
    compatibility: {
      best: ['Taurus', 'Cancer', 'Scorpio', 'Capricorn'],
      challenging: ['Gemini', 'Sagittarius']
    }
  },
  libra: {
    name: 'Libra',
    symbol: '♎',
    emoji: '⚖️',
    dates: 'September 23 - October 22',
    element: 'Air',
    quality: 'Cardinal',
    rulingPlanet: 'Venus',
    personality: 'Diplomatic, fair-minded, and social. Libras seek balance and harmony in all aspects of life. They are charming, cooperative, and have a strong sense of justice.',
    strengths: 'Cooperative, diplomatic, gracious, fair-minded, social',
    weaknesses: 'Indecisive, avoids confrontations, self-pity, carries grudges',
    luckyNumbers: [4, 6, 13, 15, 24],
    luckyColors: ['Pink', 'Green'],
    luckyStone: 'Opal',
    compatibility: {
      best: ['Gemini', 'Leo', 'Sagittarius', 'Aquarius'],
      challenging: ['Cancer', 'Capricorn']
    }
  },
  scorpio: {
    name: 'Scorpio',
    symbol: '♏',
    emoji: '🦂',
    dates: 'October 23 - November 21',
    element: 'Water',
    quality: 'Fixed',
    rulingPlanet: 'Pluto',
    personality: 'Passionate, resourceful, and determined. Scorpios are intense individuals with strong willpower and emotional depth. They are loyal, brave, and unafraid of transformation.',
    strengths: 'Resourceful, brave, passionate, stubborn, true friend, determined',
    weaknesses: 'Distrusting, jealous, secretive, violent, manipulative',
    luckyNumbers: [8, 11, 18, 22],
    luckyColors: ['Scarlet', 'Red', 'Rust'],
    luckyStone: 'Topaz',
    compatibility: {
      best: ['Cancer', 'Virgo', 'Capricorn', 'Pisces'],
      challenging: ['Leo', 'Aquarius']
    }
  },
  sagittarius: {
    name: 'Sagittarius',
    symbol: '♐',
    emoji: '🏹',
    dates: 'November 22 - December 21',
    element: 'Fire',
    quality: 'Mutable',
    rulingPlanet: 'Jupiter',
    personality: 'Optimistic, adventurous, and philosophical. Sagittarians are free spirits who love exploring new ideas and places. They are honest, enthusiastic, and always seeking truth.',
    strengths: 'Generous, idealistic, great sense of humor, optimistic',
    weaknesses: 'Promises more than can deliver, impatient, tactless',
    luckyNumbers: [3, 7, 9, 12, 21],
    luckyColors: ['Blue', 'Purple'],
    luckyStone: 'Turquoise',
    compatibility: {
      best: ['Aries', 'Leo', 'Libra', 'Aquarius'],
      challenging: ['Virgo', 'Pisces']
    }
  },
  capricorn: {
    name: 'Capricorn',
    symbol: '♑',
    emoji: '🐐',
    dates: 'December 22 - January 19',
    element: 'Earth',
    quality: 'Cardinal',
    rulingPlanet: 'Saturn',
    personality: 'Ambitious, disciplined, and responsible. Capricorns are hardworking individuals who value tradition and achievement. They are patient, practical, and excellent at long-term planning.',
    strengths: 'Responsible, disciplined, self-control, good managers',
    weaknesses: 'Know-it-all, unforgiving, condescending, pessimistic',
    luckyNumbers: [4, 8, 13, 22],
    luckyColors: ['Brown', 'Black'],
    luckyStone: 'Garnet',
    compatibility: {
      best: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
      challenging: ['Aries', 'Libra']
    }
  },
  aquarius: {
    name: 'Aquarius',
    symbol: '♒',
    emoji: '🏺',
    dates: 'January 20 - February 18',
    element: 'Air',
    quality: 'Fixed',
    rulingPlanet: 'Uranus',
    personality: 'Progressive, original, and independent. Aquarians are visionaries who think outside the box. They are humanitarian, intellectual, and value freedom and individuality.',
    strengths: 'Progressive, original, independent, humanitarian, innovative',
    weaknesses: 'Runs from emotional expression, temperamental, uncompromising, aloof',
    luckyNumbers: [4, 7, 11, 22, 29],
    luckyColors: ['Light Blue', 'Silver'],
    luckyStone: 'Amethyst',
    compatibility: {
      best: ['Aries', 'Gemini', 'Libra', 'Sagittarius'],
      challenging: ['Taurus', 'Scorpio']
    }
  },
  pisces: {
    name: 'Pisces',
    symbol: '♓',
    emoji: '🐟',
    dates: 'February 19 - March 20',
    element: 'Water',
    quality: 'Mutable',
    rulingPlanet: 'Neptune',
    personality: 'Compassionate, artistic, and intuitive. Pisces are dreamers with deep emotional sensitivity. They are empathetic, imaginative, and have a strong connection to the spiritual realm.',
    strengths: 'Compassionate, artistic, intuitive, gentle, wise, musical',
    weaknesses: 'Fearful, overly trusting, sad, desire to escape reality, victim mentality',
    luckyNumbers: [3, 9, 12, 15, 18, 24],
    luckyColors: ['Mauve', 'Lilac', 'Purple', 'Sea Green'],
    luckyStone: 'Aquamarine',
    compatibility: {
      best: ['Taurus', 'Cancer', 'Scorpio', 'Capricorn'],
      challenging: ['Gemini', 'Sagittarius']
    }
  }
};

type ZodiacSign = keyof typeof zodiacData;

interface ZodiacResult {
  sign: ZodiacSign;
  data: typeof zodiacData[ZodiacSign];
}

export default function ZodiacSignCalculator() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [result, setResult] = useState<ZodiacResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/zodiac-sign-calculator',
    getShareParams: () => ({
      m: month,
      d: day,
    }),
    getShareText: () => {
      return result
        ? `I'm a ${result.data.name} ${result.data.symbol}! Find your zodiac sign:`
        : 'Discover your zodiac sign and personality traits!';
    },
  });

  const getZodiacSign = (month: number, day: number): ZodiacSign | null => {
    if (month === 3 && day >= 21 || month === 4 && day <= 19) return 'aries';
    if (month === 4 && day >= 20 || month === 5 && day <= 20) return 'taurus';
    if (month === 5 && day >= 21 || month === 6 && day <= 20) return 'gemini';
    if (month === 6 && day >= 21 || month === 7 && day <= 22) return 'cancer';
    if (month === 7 && day >= 23 || month === 8 && day <= 22) return 'leo';
    if (month === 8 && day >= 23 || month === 9 && day <= 22) return 'virgo';
    if (month === 9 && day >= 23 || month === 10 && day <= 22) return 'libra';
    if (month === 10 && day >= 23 || month === 11 && day <= 21) return 'scorpio';
    if (month === 11 && day >= 22 || month === 12 && day <= 21) return 'sagittarius';
    if (month === 12 && day >= 22 || month === 1 && day <= 19) return 'capricorn';
    if (month === 1 && day >= 20 || month === 2 && day <= 18) return 'aquarius';
    if (month === 2 && day >= 19 || month === 3 && day <= 20) return 'pisces';
    return null;
  };

  const calculate = () => {
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    
    if (!month || !day || isNaN(monthNum) || isNaN(dayNum)) {
      alert('Please enter both month and day.');
      return;
    }

    if (monthNum < 1 || monthNum > 12) {
      alert('Please enter a valid month (1-12).');
      return;
    }

    const daysInMonth = new Date(2024, monthNum, 0).getDate();
    if (dayNum < 1 || dayNum > daysInMonth) {
      alert(`Please enter a valid day (1-${daysInMonth}) for the selected month.`);
      return;
    }

    const sign = getZodiacSign(monthNum, dayNum);
    if (!sign) {
      alert('Unable to determine zodiac sign. Please check your input.');
      return;
    }

    const data = zodiacData[sign];
    setResult({ sign, data });
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
      link.download = `zodiac-sign-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Zodiac Sign Results</title>
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
                Birth Date Input
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="month" className="text-sm font-medium text-gray-700">
                  Birth Month <span className="text-red-500">*</span>
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
                  Birth Day <span className="text-red-500">*</span>
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
                <p className="text-xs text-gray-500">Enter the day of your birth (1-31)</p>
              </div>

              <Button 
                onClick={calculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Find My Zodiac Sign
              </Button>
            </CardContent>
          </Card>

          {/* Zodiac Signs Reference */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">12 Zodiac Signs</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {Object.entries(zodiacData).map(([key, data]) => (
                  <div key={key} className="p-2 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-1">{data.symbol}</div>
                    <div className="font-medium text-gray-700">{data.name}</div>
                  </div>
                ))}
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
                  <Star className="h-5 w-5" />
                  Your Zodiac Sign
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Main Sign Display */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                      <div className="text-8xl mb-4">{result.data.symbol}</div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{result.data.name}</h3>
                      <p className="text-lg text-gray-600 mb-4">{result.data.dates}</p>
                      <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                        <span>Element: <strong>{result.data.element}</strong></span>
                        <span>•</span>
                        <span>Quality: <strong>{result.data.quality}</strong></span>
                        <span>•</span>
                        <span>Ruling Planet: <strong>{result.data.rulingPlanet}</strong></span>
                      </div>
                    </div>

                    {/* Personality */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-yellow-500" />
                        Personality Overview
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{result.data.personality}</p>
                    </div>

                    {/* Strengths & Weaknesses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                          <span>✅</span>
                          Strengths
                        </h4>
                        <p className="text-sm text-green-700">{result.data.strengths}</p>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                          <span>⚠️</span>
                          Weaknesses
                        </h4>
                        <p className="text-sm text-amber-700">{result.data.weaknesses}</p>
                      </div>
                    </div>

                    {/* Lucky Elements */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-lg">🍀</span>
                        Lucky Elements
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600 font-medium mb-1">Lucky Numbers:</p>
                          <p className="text-blue-700 font-semibold">{result.data.luckyNumbers.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium mb-1">Lucky Colors:</p>
                          <p className="text-blue-700 font-semibold">{result.data.luckyColors.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium mb-1">Lucky Stone:</p>
                          <p className="text-blue-700 font-semibold">{result.data.luckyStone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Compatibility */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        Compatibility
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                          <p className="text-green-900 font-medium mb-1">💚 Most Compatible:</p>
                          <p className="text-green-700">{result.data.compatibility.best.join(', ')}</p>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded p-3">
                          <p className="text-red-900 font-medium mb-1">💔 Challenging:</p>
                          <p className="text-red-700">{result.data.compatibility.challenging.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Star className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Enter your birth date to discover your zodiac sign</p>
                    <p className="text-sm mt-2">Learn about your personality, strengths, and compatibility!</p>
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
        calculatorName="Zodiac Sign Calculator"
      />
    </div>
  );
}

