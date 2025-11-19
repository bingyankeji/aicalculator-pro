'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, Heart, Users } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface CompatibilityResult {
  person1Name: string;
  person2Name: string;
  person1Zodiac: string;
  person2Zodiac: string;
  person1ChineseZodiac: string;
  person2ChineseZodiac: string;
  overallScore: number;
  nameCompatibility: number;
  zodiacCompatibility: number;
  chineseZodiacCompatibility: number;
  communicationScore: number;
  trustScore: number;
  emotionalScore: number;
  longTermScore: number;
  strengths: string[];
  challenges: string[];
  advice: string[];
  compatibilityLevel: string;
}

export default function LoveCompatibilityCalculator() {
  const [person1Name, setPerson1Name] = useState('');
  const [person1Month, setPerson1Month] = useState('');
  const [person1Day, setPerson1Day] = useState('');
  const [person1Year, setPerson1Year] = useState('');
  const [person2Name, setPerson2Name] = useState('');
  const [person2Month, setPerson2Month] = useState('');
  const [person2Day, setPerson2Day] = useState('');
  const [person2Year, setPerson2Year] = useState('');
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/love-compatibility-calculator',
    getShareParams: () => ({
      n1: person1Name,
      n2: person2Name,
    }),
    getShareText: () => {
      return result
        ? `${result.person1Name} and ${result.person2Name} have ${result.overallScore}% love compatibility! 💕`
        : 'Calculate your love compatibility score!';
    },
  });

  const getZodiacSign = (month: number, day: number): string => {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    return 'Pisces';
  };

  const getChineseZodiac = (year: number): string => {
    const animals = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Sheep'];
    return animals[year % 12];
  };

  const calculateNameCompatibility = (name1: string, name2: string): number => {
    const cleanName1 = name1.toLowerCase().replace(/[^a-z]/g, '');
    const cleanName2 = name2.toLowerCase().replace(/[^a-z]/g, '');
    
    // Count common letters
    const letters1 = cleanName1.split('');
    const letters2 = cleanName2.split('');
    let commonCount = 0;
    
    const counted = new Set();
    letters1.forEach(letter => {
      if (letters2.includes(letter) && !counted.has(letter)) {
        commonCount++;
        counted.add(letter);
      }
    });
    
    // Calculate based on name length and common letters
    const totalLength = cleanName1.length + cleanName2.length;
    const score = ((commonCount * 2) / totalLength) * 100;
    
    // Add bonus for name length similarity
    const lengthDiff = Math.abs(cleanName1.length - cleanName2.length);
    const lengthBonus = Math.max(0, 20 - lengthDiff * 2);
    
    return Math.min(100, Math.round(score + lengthBonus));
  };

  const getZodiacCompatibility = (sign1: string, sign2: string): number => {
    const compatibility: { [key: string]: { [key: string]: number } } = {
      'Aries': { 'Aries': 75, 'Taurus': 60, 'Gemini': 85, 'Cancer': 55, 'Leo': 95, 'Virgo': 50, 'Libra': 80, 'Scorpio': 65, 'Sagittarius': 90, 'Capricorn': 55, 'Aquarius': 85, 'Pisces': 60 },
      'Taurus': { 'Aries': 60, 'Taurus': 80, 'Gemini': 55, 'Cancer': 90, 'Leo': 65, 'Virgo': 95, 'Libra': 70, 'Scorpio': 85, 'Sagittarius': 50, 'Capricorn': 95, 'Aquarius': 55, 'Pisces': 85 },
      'Gemini': { 'Aries': 85, 'Taurus': 55, 'Gemini': 75, 'Cancer': 60, 'Leo': 85, 'Virgo': 70, 'Libra': 95, 'Scorpio': 55, 'Sagittarius': 85, 'Capricorn': 50, 'Aquarius': 95, 'Pisces': 60 },
      'Cancer': { 'Aries': 55, 'Taurus': 90, 'Gemini': 60, 'Cancer': 80, 'Leo': 70, 'Virgo': 85, 'Libra': 65, 'Scorpio': 95, 'Sagittarius': 55, 'Capricorn': 85, 'Aquarius': 50, 'Pisces': 95 },
      'Leo': { 'Aries': 95, 'Taurus': 65, 'Gemini': 85, 'Cancer': 70, 'Leo': 75, 'Virgo': 60, 'Libra': 90, 'Scorpio': 70, 'Sagittarius': 95, 'Capricorn': 55, 'Aquarius': 85, 'Pisces': 65 },
      'Virgo': { 'Aries': 50, 'Taurus': 95, 'Gemini': 70, 'Cancer': 85, 'Leo': 60, 'Virgo': 80, 'Libra': 75, 'Scorpio': 85, 'Sagittarius': 55, 'Capricorn': 95, 'Aquarius': 60, 'Pisces': 80 },
      'Libra': { 'Aries': 80, 'Taurus': 70, 'Gemini': 95, 'Cancer': 65, 'Leo': 90, 'Virgo': 75, 'Libra': 80, 'Scorpio': 70, 'Sagittarius': 85, 'Capricorn': 60, 'Aquarius': 95, 'Pisces': 70 },
      'Scorpio': { 'Aries': 65, 'Taurus': 85, 'Gemini': 55, 'Cancer': 95, 'Leo': 70, 'Virgo': 85, 'Libra': 70, 'Scorpio': 80, 'Sagittarius': 60, 'Capricorn': 90, 'Aquarius': 55, 'Pisces': 95 },
      'Sagittarius': { 'Aries': 90, 'Taurus': 50, 'Gemini': 85, 'Cancer': 55, 'Leo': 95, 'Virgo': 55, 'Libra': 85, 'Scorpio': 60, 'Sagittarius': 80, 'Capricorn': 60, 'Aquarius': 90, 'Pisces': 65 },
      'Capricorn': { 'Aries': 55, 'Taurus': 95, 'Gemini': 50, 'Cancer': 85, 'Leo': 55, 'Virgo': 95, 'Libra': 60, 'Scorpio': 90, 'Sagittarius': 60, 'Capricorn': 80, 'Aquarius': 65, 'Pisces': 85 },
      'Aquarius': { 'Aries': 85, 'Taurus': 55, 'Gemini': 95, 'Cancer': 50, 'Leo': 85, 'Virgo': 60, 'Libra': 95, 'Scorpio': 55, 'Sagittarius': 90, 'Capricorn': 65, 'Aquarius': 75, 'Pisces': 70 },
      'Pisces': { 'Aries': 60, 'Taurus': 85, 'Gemini': 60, 'Cancer': 95, 'Leo': 65, 'Virgo': 80, 'Libra': 70, 'Scorpio': 95, 'Sagittarius': 65, 'Capricorn': 85, 'Aquarius': 70, 'Pisces': 80 }
    };
    
    return compatibility[sign1]?.[sign2] || 70;
  };

  const getChineseZodiacCompatibility = (animal1: string, animal2: string): number => {
    const compatibility: { [key: string]: { [key: string]: number } } = {
      'Rat': { 'Rat': 75, 'Ox': 90, 'Tiger': 60, 'Rabbit': 70, 'Dragon': 95, 'Snake': 65, 'Horse': 50, 'Sheep': 60, 'Monkey': 90, 'Rooster': 55, 'Dog': 65, 'Pig': 80 },
      'Ox': { 'Rat': 90, 'Ox': 70, 'Tiger': 55, 'Rabbit': 65, 'Dragon': 70, 'Snake': 95, 'Horse': 60, 'Sheep': 50, 'Monkey': 65, 'Rooster': 90, 'Dog': 60, 'Pig': 75 },
      'Tiger': { 'Rat': 60, 'Ox': 55, 'Tiger': 70, 'Rabbit': 75, 'Dragon': 80, 'Snake': 50, 'Horse': 90, 'Sheep': 65, 'Monkey': 55, 'Rooster': 60, 'Dog': 85, 'Pig': 90 },
      'Rabbit': { 'Rat': 70, 'Ox': 65, 'Tiger': 75, 'Rabbit': 70, 'Dragon': 65, 'Snake': 75, 'Horse': 80, 'Sheep': 95, 'Monkey': 70, 'Rooster': 50, 'Dog': 90, 'Pig': 95 },
      'Dragon': { 'Rat': 95, 'Ox': 70, 'Tiger': 80, 'Rabbit': 65, 'Dragon': 75, 'Snake': 85, 'Horse': 70, 'Sheep': 65, 'Monkey': 90, 'Rooster': 95, 'Dog': 50, 'Pig': 80 },
      'Snake': { 'Rat': 65, 'Ox': 95, 'Tiger': 50, 'Rabbit': 75, 'Dragon': 85, 'Snake': 70, 'Horse': 75, 'Sheep': 70, 'Monkey': 90, 'Rooster': 95, 'Dog': 60, 'Pig': 55 },
      'Horse': { 'Rat': 50, 'Ox': 60, 'Tiger': 90, 'Rabbit': 80, 'Dragon': 70, 'Snake': 75, 'Horse': 70, 'Sheep': 85, 'Monkey': 65, 'Rooster': 70, 'Dog': 90, 'Pig': 75 },
      'Sheep': { 'Rat': 60, 'Ox': 50, 'Tiger': 65, 'Rabbit': 95, 'Dragon': 65, 'Snake': 70, 'Horse': 85, 'Sheep': 75, 'Monkey': 70, 'Rooster': 60, 'Dog': 65, 'Pig': 95 },
      'Monkey': { 'Rat': 90, 'Ox': 65, 'Tiger': 55, 'Rabbit': 70, 'Dragon': 90, 'Snake': 90, 'Horse': 65, 'Sheep': 70, 'Monkey': 75, 'Rooster': 70, 'Dog': 60, 'Pig': 75 },
      'Rooster': { 'Rat': 55, 'Ox': 90, 'Tiger': 60, 'Rabbit': 50, 'Dragon': 95, 'Snake': 95, 'Horse': 70, 'Sheep': 60, 'Monkey': 70, 'Rooster': 70, 'Dog': 55, 'Pig': 65 },
      'Dog': { 'Rat': 65, 'Ox': 60, 'Tiger': 85, 'Rabbit': 90, 'Dragon': 50, 'Snake': 60, 'Horse': 90, 'Sheep': 65, 'Monkey': 60, 'Rooster': 55, 'Dog': 70, 'Pig': 80 },
      'Pig': { 'Rat': 80, 'Ox': 75, 'Tiger': 90, 'Rabbit': 95, 'Dragon': 80, 'Snake': 55, 'Horse': 75, 'Sheep': 95, 'Monkey': 75, 'Rooster': 65, 'Dog': 80, 'Pig': 75 }
    };
    
    return compatibility[animal1]?.[animal2] || 70;
  };

  const getCompatibilityLevel = (score: number): string => {
    if (score >= 90) return 'Perfect Match';
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Very Good';
    if (score >= 60) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Challenging';
  };

  const getStrengths = (zodiac1: string, zodiac2: string, chineseZodiac1: string, chineseZodiac2: string): string[] => {
    const strengths = [
      'Strong emotional connection',
      'Excellent communication',
      'Shared values and goals',
      'Mutual respect and trust',
      'Complementary personalities',
      'Great chemistry',
      'Similar life perspectives',
      'Supportive partnership'
    ];
    
    // Randomly select 3-4 strengths based on compatibility
    const count = Math.floor(Math.random() * 2) + 3;
    return strengths.sort(() => Math.random() - 0.5).slice(0, count);
  };

  const getChallenges = (zodiac1: string, zodiac2: string): string[] => {
    const challenges = [
      'Different communication styles',
      'Need to work on compromise',
      'Balancing independence and togetherness',
      'Managing different emotional needs',
      'Aligning long-term goals',
      'Respecting personal space',
      'Handling conflicts constructively'
    ];
    
    // Randomly select 2-3 challenges
    const count = Math.floor(Math.random() * 2) + 2;
    return challenges.sort(() => Math.random() - 0.5).slice(0, count);
  };

  const getAdvice = (score: number): string[] => {
    if (score >= 80) {
      return [
        'Continue nurturing your strong connection',
        'Keep communication open and honest',
        'Celebrate your differences as strengths',
        'Support each other\'s individual growth',
        'Make time for quality moments together'
      ];
    } else if (score >= 60) {
      return [
        'Focus on understanding each other better',
        'Practice active listening',
        'Find common interests to share',
        'Be patient with differences',
        'Work on building trust gradually'
      ];
    } else {
      return [
        'Take time to understand each other\'s perspectives',
        'Communicate openly about expectations',
        'Focus on building a strong friendship first',
        'Be willing to compromise',
        'Seek common ground and shared values'
      ];
    }
  };

  const calculate = () => {
    if (!person1Name || !person2Name) {
      alert('Please enter both names.');
      return;
    }

    const m1 = parseInt(person1Month);
    const d1 = parseInt(person1Day);
    const y1 = parseInt(person1Year);
    const m2 = parseInt(person2Month);
    const d2 = parseInt(person2Day);
    const y2 = parseInt(person2Year);

    if (!person1Month || !person1Day || !person1Year || isNaN(m1) || isNaN(d1) || isNaN(y1)) {
      alert('Please enter complete birth date for Person 1.');
      return;
    }

    if (!person2Month || !person2Day || !person2Year || isNaN(m2) || isNaN(d2) || isNaN(y2)) {
      alert('Please enter complete birth date for Person 2.');
      return;
    }

    const zodiac1 = getZodiacSign(m1, d1);
    const zodiac2 = getZodiacSign(m2, d2);
    const chineseZodiac1 = getChineseZodiac(y1);
    const chineseZodiac2 = getChineseZodiac(y2);

    const nameCompat = calculateNameCompatibility(person1Name, person2Name);
    const zodiacCompat = getZodiacCompatibility(zodiac1, zodiac2);
    const chineseZodiacCompat = getChineseZodiacCompatibility(chineseZodiac1, chineseZodiac2);

    // Calculate overall score (weighted average)
    const overallScore = Math.round(
      nameCompat * 0.2 +
      zodiacCompat * 0.4 +
      chineseZodiacCompat * 0.4
    );

    // Calculate individual scores
    const communicationScore = Math.round((zodiacCompat + nameCompat) / 2);
    const trustScore = Math.round((chineseZodiacCompat + zodiacCompat) / 2);
    const emotionalScore = Math.round((zodiacCompat + overallScore) / 2);
    const longTermScore = Math.round((chineseZodiacCompat + overallScore) / 2);

    const compatibilityLevel = getCompatibilityLevel(overallScore);
    const strengths = getStrengths(zodiac1, zodiac2, chineseZodiac1, chineseZodiac2);
    const challenges = getChallenges(zodiac1, zodiac2);
    const advice = getAdvice(overallScore);

    setResult({
      person1Name,
      person2Name,
      person1Zodiac: zodiac1,
      person2Zodiac: zodiac2,
      person1ChineseZodiac: chineseZodiac1,
      person2ChineseZodiac: chineseZodiac2,
      overallScore,
      nameCompatibility: nameCompat,
      zodiacCompatibility: zodiacCompat,
      chineseZodiacCompatibility: chineseZodiacCompat,
      communicationScore,
      trustScore,
      emotionalScore,
      longTermScore,
      strengths,
      challenges,
      advice,
      compatibilityLevel
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
      link.download = `love-compatibility-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Love Compatibility Results</title>
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

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getScoreBg = (score: number): string => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-blue-50 border-blue-200';
    if (score >= 40) return 'bg-yellow-50 border-yellow-200';
    return 'bg-orange-50 border-orange-200';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-500" />
                Person 1
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="person1Name" className="text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </Label>
                <input
                  id="person1Name"
                  type="text"
                  value={person1Name}
                  onChange={(e) => setPerson1Name(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter name"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Birth Date <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={person1Month}
                    onChange={(e) => setPerson1Month(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  >
                    <option value="">Month</option>
                    {months.map(m => (
                      <option key={m.value} value={m.value}>{m.label.slice(0, 3)}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={person1Day}
                    onChange={(e) => setPerson1Day(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                    placeholder="Day"
                    min="1"
                    max="31"
                  />
                  <input
                    type="number"
                    value={person1Year}
                    onChange={(e) => setPerson1Year(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                    placeholder="Year"
                    min="1900"
                    max="2100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <Heart className="h-5 w-5 text-purple-500" />
                Person 2
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="person2Name" className="text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </Label>
                <input
                  id="person2Name"
                  type="text"
                  value={person2Name}
                  onChange={(e) => setPerson2Name(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter name"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Birth Date <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={person2Month}
                    onChange={(e) => setPerson2Month(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  >
                    <option value="">Month</option>
                    {months.map(m => (
                      <option key={m.value} value={m.value}>{m.label.slice(0, 3)}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={person2Day}
                    onChange={(e) => setPerson2Day(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="Day"
                    min="1"
                    max="31"
                  />
                  <input
                    type="number"
                    value={person2Year}
                    onChange={(e) => setPerson2Year(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="Year"
                    min="1900"
                    max="2100"
                  />
                </div>
              </div>

              <Button 
                onClick={calculate}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Compatibility
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Compatibility Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Overall Score */}
                    <div className={`text-center rounded-xl p-8 border-2 ${getScoreBg(result.overallScore)}`}>
                      <div className="text-6xl mb-4">💕</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {result.person1Name} & {result.person2Name}
                      </h3>
                      <div className={`text-5xl font-bold mb-2 ${getScoreColor(result.overallScore)}`}>
                        {result.overallScore}%
                      </div>
                      <div className="text-lg font-semibold text-gray-700">{result.compatibilityLevel}</div>
                    </div>

                    {/* Zodiac Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 text-center">
                        <h4 className="font-semibold text-pink-900 mb-2">{result.person1Name}</h4>
                        <p className="text-sm text-gray-700 mb-1">♈ {result.person1Zodiac}</p>
                        <p className="text-sm text-gray-700">🐉 {result.person1ChineseZodiac}</p>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                        <h4 className="font-semibold text-purple-900 mb-2">{result.person2Name}</h4>
                        <p className="text-sm text-gray-700 mb-1">♈ {result.person2Zodiac}</p>
                        <p className="text-sm text-gray-700">🐉 {result.person2ChineseZodiac}</p>
                      </div>
                    </div>

                    {/* Detailed Scores */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                      <h4 className="font-semibold text-gray-900 mb-4">Compatibility Breakdown</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-700">Communication</span>
                            <span className={`text-sm font-semibold ${getScoreColor(result.communicationScore)}`}>
                              {result.communicationScore}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all"
                              style={{ width: `${result.communicationScore}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-700">Trust</span>
                            <span className={`text-sm font-semibold ${getScoreColor(result.trustScore)}`}>
                              {result.trustScore}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all"
                              style={{ width: `${result.trustScore}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-700">Emotional Connection</span>
                            <span className={`text-sm font-semibold ${getScoreColor(result.emotionalScore)}`}>
                              {result.emotionalScore}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all"
                              style={{ width: `${result.emotionalScore}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-700">Long-term Potential</span>
                            <span className={`text-sm font-semibold ${getScoreColor(result.longTermScore)}`}>
                              {result.longTermScore}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all"
                              style={{ width: `${result.longTermScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Compatibility Sources */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">Name</p>
                        <p className="text-lg font-bold text-blue-700">{result.nameCompatibility}%</p>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">Zodiac</p>
                        <p className="text-lg font-bold text-purple-700">{result.zodiacCompatibility}%</p>
                      </div>
                      <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">Chinese</p>
                        <p className="text-lg font-bold text-pink-700">{result.chineseZodiacCompatibility}%</p>
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                      <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                        <span>✨</span>
                        Relationship Strengths
                      </h4>
                      <ul className="space-y-2">
                        {result.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Challenges */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                      <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                        <span>⚠️</span>
                        Areas to Work On
                      </h4>
                      <ul className="space-y-2">
                        {result.challenges.map((challenge, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-amber-600 mt-0.5">•</span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Advice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                      <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <span>💡</span>
                        Relationship Advice
                      </h4>
                      <ul className="space-y-2">
                        {result.advice.map((tip, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-600">
                        This compatibility analysis is for entertainment purposes only. Real relationships require effort, communication, and mutual respect regardless of astrological compatibility.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Enter both names and birth dates to calculate compatibility</p>
                    <p className="text-sm mt-2">Discover your love compatibility score! 💕</p>
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
        calculatorName="Love Compatibility Calculator"
      />
    </div>
  );
}

