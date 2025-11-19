'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, Calendar, Heart, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

// 生肖数据
const zodiacData = {
  rat: {
    name: 'Rat (鼠)',
    emoji: '🐀',
    years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020, 2032],
    element: 'Water',
    personality: 'Quick-witted, resourceful, versatile, kind, smart, and adaptable. Rats are natural leaders with strong intuition and excellent problem-solving abilities.',
    strengths: 'Intelligent, adaptable, quick-witted, charming, artistic, sociable',
    weaknesses: 'Timid, unstable, stubborn, picky, lack of persistence',
    luckyNumbers: [2, 3],
    luckyColors: ['Blue', 'Gold', 'Green'],
    luckyFlowers: ['Lily', 'African Violet'],
    compatibility: {
      best: ['Dragon', 'Monkey', 'Ox'],
      avoid: ['Horse', 'Rooster']
    }
  },
  ox: {
    name: 'Ox (牛)',
    emoji: '🐂',
    years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021, 2033],
    element: 'Earth',
    personality: 'Diligent, dependable, strong, determined, honest, and patient. Oxen are hardworking individuals who value tradition and stability.',
    strengths: 'Honest, industrious, patient, cautious, level-headed, persistent',
    weaknesses: 'Obstinate, inarticulate, prudish, distant',
    luckyNumbers: [1, 9],
    luckyColors: ['White', 'Yellow', 'Green'],
    luckyFlowers: ['Tulip', 'Peach Blossom'],
    compatibility: {
      best: ['Rat', 'Snake', 'Rooster'],
      avoid: ['Tiger', 'Dragon', 'Horse', 'Sheep']
    }
  },
  tiger: {
    name: 'Tiger (虎)',
    emoji: '🐅',
    years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022, 2034],
    element: 'Wood',
    personality: 'Brave, confident, competitive, unpredictable, and charismatic. Tigers are natural leaders who love adventure and challenges.',
    strengths: 'Enthusiastic, courageous, ambitious, leadership, confidence',
    weaknesses: 'Indecisive, suspicious, vain, restless',
    luckyNumbers: [1, 3, 4],
    luckyColors: ['Blue', 'Gray', 'Orange'],
    luckyFlowers: ['Yellow Lily', 'Cineraria'],
    compatibility: {
      best: ['Dragon', 'Horse', 'Pig'],
      avoid: ['Ox', 'Tiger', 'Snake', 'Monkey']
    }
  },
  rabbit: {
    name: 'Rabbit (兔)',
    emoji: '🐇',
    years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023, 2035],
    element: 'Wood',
    personality: 'Quiet, elegant, kind, responsible, and cautious. Rabbits are gentle souls who value peace and harmony.',
    strengths: 'Trustworthy, empathic, modest, diplomatic, sincere, sociable',
    weaknesses: 'Oversensitive, escapist, indecisive, easily frightened',
    luckyNumbers: [3, 4, 9],
    luckyColors: ['Red', 'Pink', 'Purple', 'Blue'],
    luckyFlowers: ['Plantain Lily', 'Jasmine'],
    compatibility: {
      best: ['Sheep', 'Monkey', 'Dog', 'Pig'],
      avoid: ['Snake', 'Rooster']
    }
  },
  dragon: {
    name: 'Dragon (龙)',
    emoji: '🐉',
    years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024, 2036],
    element: 'Earth',
    personality: 'Confident, intelligent, enthusiastic, and ambitious. Dragons are natural leaders with strong charisma and determination.',
    strengths: 'Decisive, pioneering, ambitious, energetic, loyal, responsible',
    weaknesses: 'Arrogant, impatient, impetuous, quick-tempered',
    luckyNumbers: [1, 6, 7],
    luckyColors: ['Gold', 'Silver', 'Grayish White'],
    luckyFlowers: ['Bleeding-heart Glory Bower', 'Dragon Flowers'],
    compatibility: {
      best: ['Rooster', 'Rat', 'Monkey'],
      avoid: ['Ox', 'Sheep', 'Dog']
    }
  },
  snake: {
    name: 'Snake (蛇)',
    emoji: '🐍',
    years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025, 2037],
    element: 'Fire',
    personality: 'Enigmatic, intelligent, wise, and intuitive. Snakes are deep thinkers with excellent judgment and strong determination.',
    strengths: 'Soft-spoken, humorous, sympathetic, determined, passionate',
    weaknesses: 'Jealous, suspicious, cunning, self-centered',
    luckyNumbers: [2, 8, 9],
    luckyColors: ['Black', 'Red', 'Yellow'],
    luckyFlowers: ['Orchid', 'Cactus'],
    compatibility: {
      best: ['Dragon', 'Rooster'],
      avoid: ['Tiger', 'Rabbit', 'Snake', 'Sheep', 'Pig']
    }
  },
  horse: {
    name: 'Horse (马)',
    emoji: '🐴',
    years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026, 2038],
    element: 'Fire',
    personality: 'Animated, active, energetic, and freedom-loving. Horses are independent spirits who love travel and new experiences.',
    strengths: 'Adaptable, loyal, courageous, ambitious, intelligent, adventurous',
    weaknesses: 'Impatient, hot-blooded, reckless, self-centered',
    luckyNumbers: [2, 3, 7],
    luckyColors: ['Yellow', 'Green'],
    luckyFlowers: ['Calla Lily', 'Jasmine'],
    compatibility: {
      best: ['Tiger', 'Sheep', 'Dog'],
      avoid: ['Rat', 'Ox', 'Horse', 'Rooster']
    }
  },
  sheep: {
    name: 'Sheep (羊)',
    emoji: '🐑',
    years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027, 2039],
    element: 'Earth',
    personality: 'Calm, gentle, sympathetic, and creative. Sheep are kind-hearted individuals who value art and beauty.',
    strengths: 'Imaginative, considerate, sensitive, compassionate, artistic',
    weaknesses: 'Moody, pessimistic, hesitant, over-sensitive',
    luckyNumbers: [2, 7],
    luckyColors: ['Brown', 'Red', 'Purple'],
    luckyFlowers: ['Carnation', 'Primrose'],
    compatibility: {
      best: ['Rabbit', 'Horse', 'Pig'],
      avoid: ['Ox', 'Dragon', 'Snake', 'Dog']
    }
  },
  monkey: {
    name: 'Monkey (猴)',
    emoji: '🐵',
    years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028, 2040],
    element: 'Metal',
    personality: 'Sharp, smart, curious, and mischievous. Monkeys are clever problem-solvers with great wit and charm.',
    strengths: 'Enthusiastic, self-assured, sociable, innovative, intelligent',
    weaknesses: 'Jealous, suspicious, cunning, selfish, arrogant',
    luckyNumbers: [1, 7, 8],
    luckyColors: ['White', 'Blue', 'Gold'],
    luckyFlowers: ['Chrysanthemum', 'Crape-myrtle'],
    compatibility: {
      best: ['Ox', 'Rabbit', 'Dragon'],
      avoid: ['Tiger', 'Snake', 'Pig']
    }
  },
  rooster: {
    name: 'Rooster (鸡)',
    emoji: '🐓',
    years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029, 2041],
    element: 'Metal',
    personality: 'Observant, hardworking, courageous, and talented. Roosters are confident individuals who are always punctual and organized.',
    strengths: 'Honest, energetic, intelligent, flexible, confident',
    weaknesses: 'Critical, eccentric, narrow-minded, selfish',
    luckyNumbers: [5, 7, 8],
    luckyColors: ['Gold', 'Brown', 'Yellow'],
    luckyFlowers: ['Gladiola', 'Cockscomb'],
    compatibility: {
      best: ['Ox', 'Dragon', 'Snake'],
      avoid: ['Rat', 'Rabbit', 'Horse', 'Rooster', 'Dog']
    }
  },
  dog: {
    name: 'Dog (狗)',
    emoji: '🐕',
    years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030, 2042],
    element: 'Earth',
    personality: 'Loyal, honest, amiable, kind, and prudent. Dogs are faithful companions who value justice and fairness.',
    strengths: 'Valiant, loyal, responsible, clever, courageous, lively',
    weaknesses: 'Sensitive, conservative, stubborn, emotional',
    luckyNumbers: [3, 4, 9],
    luckyColors: ['Red', 'Green', 'Purple'],
    luckyFlowers: ['Rose', 'Cymbidium Orchids'],
    compatibility: {
      best: ['Rabbit', 'Horse', 'Tiger'],
      avoid: ['Dragon', 'Sheep', 'Rooster']
    }
  },
  pig: {
    name: 'Pig (猪)',
    emoji: '🐖',
    years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031, 2043],
    element: 'Water',
    personality: 'Compassionate, generous, diligent, and optimistic. Pigs are kind-hearted individuals who enjoy life and value relationships.',
    strengths: 'Honorable, philanthropic, determined, optimistic, sincere',
    weaknesses: 'Naive, gullible, sluggish, short-tempered',
    luckyNumbers: [2, 5, 8],
    luckyColors: ['Yellow', 'Gray', 'Brown', 'Gold'],
    luckyFlowers: ['Hydrangea', 'Pitcher Plant'],
    compatibility: {
      best: ['Tiger', 'Rabbit', 'Sheep'],
      avoid: ['Snake', 'Monkey', 'Pig']
    }
  }
};

type ZodiacSign = keyof typeof zodiacData;

interface ZodiacResult {
  sign: ZodiacSign;
  data: typeof zodiacData[ZodiacSign];
  birthYear: number;
  currentAge: number;
  nextBenMingYear: number;
  isBenMingYear: boolean;
}

export default function ChineseZodiacCalculator() {
  const [birthYear, setBirthYear] = useState('');
  const [result, setResult] = useState<ZodiacResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/chinese-zodiac-calculator',
    getShareParams: () => ({
      y: birthYear,
    }),
    getShareText: () => {
      return result
        ? `I'm a ${result.data.name} ${result.data.emoji}! Find your Chinese Zodiac sign:`
        : 'Discover your Chinese Zodiac sign and personality traits!';
    },
  });

  const getZodiacSign = (year: number): ZodiacSign => {
    const zodiacCycle: ZodiacSign[] = ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'sheep', 'monkey', 'rooster', 'dog', 'pig'];
    const baseYear = 1924; // Year of the Rat
    const index = (year - baseYear) % 12;
    return zodiacCycle[index < 0 ? index + 12 : index];
  };

  const calculate = () => {
    const year = parseInt(birthYear);
    
    if (!birthYear || isNaN(year)) {
      alert('Please enter a valid birth year.');
      return;
    }

    if (year < 1900 || year > 2100) {
      alert('Please enter a year between 1900 and 2100.');
      return;
    }

    const sign = getZodiacSign(year);
    const data = zodiacData[sign];
    const currentYear = new Date().getFullYear();
    const currentAge = currentYear - year;
    
    // Calculate next Ben Ming Year (本命年)
    let nextBenMingYear = year;
    while (nextBenMingYear <= currentYear) {
      nextBenMingYear += 12;
    }
    
    const isBenMingYear = (currentYear - year) % 12 === 0;

    setResult({
      sign,
      data,
      birthYear: year,
      currentAge,
      nextBenMingYear,
      isBenMingYear
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
      link.download = `chinese-zodiac-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Chinese Zodiac Results</title>
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
                <Calendar className="h-5 w-5" />
                Birth Year Input
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="birthYear" className="text-sm font-medium text-gray-700">
                  Birth Year <span className="text-red-500">*</span>
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
                <p className="text-xs text-gray-500">Enter your birth year (1900-2100)</p>
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

          {/* Zodiac Cycle Reference */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">12 Zodiac Signs</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                {Object.entries(zodiacData).map(([key, data]) => (
                  <div key={key} className="p-2 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-1">{data.emoji}</div>
                    <div className="text-xs font-medium text-gray-700">{data.name.split(' ')[0]}</div>
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
                  <Sparkles className="h-5 w-5" />
                  Your Chinese Zodiac
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Main Zodiac Display */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                      <div className="text-8xl mb-4">{result.data.emoji}</div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{result.data.name}</h3>
                      <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                        <span>Birth Year: <strong>{result.birthYear}</strong></span>
                        <span>•</span>
                        <span>Element: <strong>{result.data.element}</strong></span>
                        <span>•</span>
                        <span>Age: <strong>{result.currentAge}</strong></span>
                      </div>
                      
                      {result.isBenMingYear && (
                        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-red-700 font-semibold">🎊 This is your Ben Ming Year (本命年)!</p>
                          <p className="text-xs text-red-600 mt-1">Your zodiac year - traditionally wear red for good luck!</p>
                        </div>
                      )}
                    </div>

                    {/* Personality */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="text-lg">🌟</span>
                        Personality Traits
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
                          <p className="text-gray-600 font-medium mb-1">Lucky Flowers:</p>
                          <p className="text-blue-700 font-semibold">{result.data.luckyFlowers.join(', ')}</p>
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
                          <p className="text-green-900 font-medium mb-1">💚 Best Matches:</p>
                          <p className="text-green-700">{result.data.compatibility.best.join(', ')}</p>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded p-3">
                          <p className="text-red-900 font-medium mb-1">💔 Avoid:</p>
                          <p className="text-red-700">{result.data.compatibility.avoid.join(', ')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Next Ben Ming Year */}
                    {!result.isBenMingYear && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-700">
                          Your next <strong>Ben Ming Year (本命年)</strong> will be in <strong className="text-blue-700">{result.nextBenMingYear}</strong>
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          ({result.nextBenMingYear - new Date().getFullYear()} years from now)
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Enter your birth year to discover your Chinese Zodiac sign</p>
                    <p className="text-sm mt-2">Learn about your personality, lucky elements, and compatibility!</p>
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
        calculatorName="Chinese Zodiac Calculator"
      />
    </div>
  );
}

