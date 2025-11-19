'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, User, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface NumerologyResult {
  fullName: string;
  expressionNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  expressionMeaning: string;
  soulUrgeMeaning: string;
  personalityMeaning: string;
  strengths: string[];
  challenges: string[];
  careerPaths: string[];
  luckyColors: string[];
  luckyNumbers: number[];
}

export default function NameNumerologyCalculator() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/name-numerology-calculator',
    getShareParams: () => ({
      fn: firstName,
      ln: lastName,
    }),
    getShareText: () => {
      return result
        ? `My name numerology: Expression ${result.expressionNumber}, Soul Urge ${result.soulUrgeNumber}, Personality ${result.personalityNumber}`
        : 'Discover your name numerology numbers!';
    },
  });

  // Pythagorean numerology chart
  const letterValues: { [key: string]: number } = {
    'A': 1, 'J': 1, 'S': 1,
    'B': 2, 'K': 2, 'T': 2,
    'C': 3, 'L': 3, 'U': 3,
    'D': 4, 'M': 4, 'V': 4,
    'E': 5, 'N': 5, 'W': 5,
    'F': 6, 'O': 6, 'X': 6,
    'G': 7, 'P': 7, 'Y': 7,
    'H': 8, 'Q': 8, 'Z': 8,
    'I': 9, 'R': 9,
  };

  const vowels = ['A', 'E', 'I', 'O', 'U'];

  const reduceToSingleDigit = (num: number): number => {
    // Keep master numbers 11, 22, 33
    if (num === 11 || num === 22 || num === 33) return num;
    
    while (num > 9) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
      if (num === 11 || num === 22 || num === 33) return num;
    }
    return num;
  };

  const calculateNameNumber = (name: string, useVowelsOnly: boolean = false, useConsonantsOnly: boolean = false): number => {
    const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
    let sum = 0;

    for (const letter of cleanName) {
      const isVowel = vowels.includes(letter);
      
      if (useVowelsOnly && !isVowel) continue;
      if (useConsonantsOnly && isVowel) continue;
      
      sum += letterValues[letter] || 0;
    }

    return reduceToSingleDigit(sum);
  };

  const getNumberMeaning = (number: number, type: 'expression' | 'soul' | 'personality'): string => {
    const meanings: { [key: number]: { [key: string]: string } } = {
      1: {
        expression: 'Independent, ambitious, and a natural leader. You have strong willpower and determination to achieve your goals.',
        soul: 'You desire independence, leadership, and the freedom to pursue your own path. You want to be number one.',
        personality: 'You appear confident, assertive, and independent. Others see you as a natural leader and pioneer.'
      },
      2: {
        expression: 'Diplomatic, cooperative, and sensitive. You excel at bringing people together and creating harmony.',
        soul: 'You desire peace, harmony, and meaningful relationships. You want to be a peacemaker and mediator.',
        personality: 'You appear gentle, diplomatic, and approachable. Others see you as a team player and good listener.'
      },
      3: {
        expression: 'Creative, expressive, and optimistic. You have a gift for communication and artistic expression.',
        soul: 'You desire self-expression, creativity, and joy. You want to inspire and entertain others.',
        personality: 'You appear charming, creative, and fun-loving. Others see you as entertaining and socially gifted.'
      },
      4: {
        expression: 'Practical, organized, and hardworking. You build strong foundations and value stability.',
        soul: 'You desire security, order, and tangible results. You want to create something lasting and meaningful.',
        personality: 'You appear reliable, practical, and grounded. Others see you as dependable and trustworthy.'
      },
      5: {
        expression: 'Adventurous, versatile, and freedom-loving. You thrive on change and new experiences.',
        soul: 'You desire freedom, adventure, and variety. You want to experience all that life has to offer.',
        personality: 'You appear dynamic, exciting, and unpredictable. Others see you as adventurous and magnetic.'
      },
      6: {
        expression: 'Nurturing, responsible, and caring. You have a strong sense of duty to family and community.',
        soul: 'You desire harmony, beauty, and the ability to help others. You want to create a loving environment.',
        personality: 'You appear warm, caring, and responsible. Others see you as nurturing and trustworthy.'
      },
      7: {
        expression: 'Analytical, introspective, and spiritual. You seek truth and deeper understanding.',
        soul: 'You desire knowledge, wisdom, and spiritual understanding. You want to uncover life\'s mysteries.',
        personality: 'You appear mysterious, intellectual, and reserved. Others see you as wise and contemplative.'
      },
      8: {
        expression: 'Ambitious, authoritative, and business-minded. You have strong organizational and leadership abilities.',
        soul: 'You desire success, recognition, and material abundance. You want to achieve and make an impact.',
        personality: 'You appear powerful, successful, and authoritative. Others see you as capable and ambitious.'
      },
      9: {
        expression: 'Compassionate, humanitarian, and idealistic. You have a global perspective and desire to help humanity.',
        soul: 'You desire to serve humanity and make the world better. You want to live with compassion and wisdom.',
        personality: 'You appear compassionate, understanding, and worldly. Others see you as humanitarian and wise.'
      },
      11: {
        expression: 'Intuitive, inspirational, and spiritually aware. You are a master teacher and visionary (Master Number).',
        soul: 'You desire spiritual enlightenment and to inspire others. You want to be a beacon of light (Master Number).',
        personality: 'You appear charismatic, inspiring, and spiritually aware. Others see you as enlightened (Master Number).'
      },
      22: {
        expression: 'Master builder with the ability to turn dreams into reality. You can achieve great things (Master Number).',
        soul: 'You desire to build something of lasting value that benefits humanity. You want to be a master builder (Master Number).',
        personality: 'You appear powerful, capable, and visionary. Others see you as someone who can achieve the impossible (Master Number).'
      },
      33: {
        expression: 'Master teacher with unconditional love and healing abilities. You uplift humanity (Master Number).',
        soul: 'You desire to heal, teach, and love unconditionally. You want to be a spiritual guide (Master Number).',
        personality: 'You appear nurturing, wise, and spiritually evolved. Others see you as a master healer (Master Number).'
      }
    };

    return meanings[number]?.[type] || 'A unique and special vibration.';
  };

  const getStrengths = (expression: number, soul: number, personality: number): string[] => {
    const allStrengths: { [key: number]: string[] } = {
      1: ['Leadership', 'Independence', 'Determination', 'Innovation'],
      2: ['Diplomacy', 'Cooperation', 'Sensitivity', 'Patience'],
      3: ['Creativity', 'Communication', 'Optimism', 'Social skills'],
      4: ['Organization', 'Reliability', 'Practicality', 'Hard work'],
      5: ['Adaptability', 'Versatility', 'Freedom-loving', 'Adventurous'],
      6: ['Nurturing', 'Responsibility', 'Harmony', 'Compassion'],
      7: ['Analytical thinking', 'Spirituality', 'Wisdom', 'Introspection'],
      8: ['Ambition', 'Authority', 'Business acumen', 'Success-oriented'],
      9: ['Compassion', 'Humanitarian', 'Wisdom', 'Idealism'],
      11: ['Intuition', 'Inspiration', 'Spiritual awareness', 'Visionary'],
      22: ['Master building', 'Practical idealism', 'Leadership', 'Achievement'],
      33: ['Unconditional love', 'Healing', 'Teaching', 'Spiritual guidance']
    };

    const strengths = new Set<string>();
    [expression, soul, personality].forEach(num => {
      allStrengths[num]?.forEach(s => strengths.add(s));
    });

    return Array.from(strengths).slice(0, 6);
  };

  const getChallenges = (expression: number, soul: number, personality: number): string[] => {
    const allChallenges: { [key: number]: string[] } = {
      1: ['Can be overly aggressive', 'May struggle with teamwork', 'Tendency to dominate'],
      2: ['Can be overly sensitive', 'May avoid confrontation', 'Tendency to be indecisive'],
      3: ['Can scatter energy', 'May be superficial', 'Tendency to avoid responsibility'],
      4: ['Can be rigid', 'May resist change', 'Tendency to be workaholic'],
      5: ['Can be restless', 'May lack commitment', 'Tendency to be impulsive'],
      6: ['Can be controlling', 'May neglect self', 'Tendency to worry excessively'],
      7: ['Can be aloof', 'May be overly critical', 'Tendency to isolate'],
      8: ['Can be materialistic', 'May be workaholic', 'Tendency to be controlling'],
      9: ['Can be impractical', 'May be overly idealistic', 'Tendency to be emotionally distant'],
      11: ['Can be overly sensitive', 'May feel misunderstood', 'Tendency to be anxious'],
      22: ['Can feel overwhelmed', 'May have high expectations', 'Tendency to be stressed'],
      33: ['Can be self-sacrificing', 'May feel burdened', 'Tendency to take on too much']
    };

    const challenges = new Set<string>();
    [expression, soul, personality].forEach(num => {
      allChallenges[num]?.forEach(c => challenges.add(c));
    });

    return Array.from(challenges).slice(0, 4);
  };

  const getCareerPaths = (expression: number): string[] => {
    const careers: { [key: number]: string[] } = {
      1: ['Entrepreneur', 'CEO', 'Manager', 'Independent consultant', 'Inventor'],
      2: ['Diplomat', 'Counselor', 'Mediator', 'Teacher', 'Therapist'],
      3: ['Artist', 'Writer', 'Performer', 'Designer', 'Marketing professional'],
      4: ['Accountant', 'Engineer', 'Builder', 'Administrator', 'Analyst'],
      5: ['Travel agent', 'Salesperson', 'Journalist', 'Promoter', 'Entertainer'],
      6: ['Nurse', 'Social worker', 'Teacher', 'Interior designer', 'Counselor'],
      7: ['Researcher', 'Scientist', 'Analyst', 'Philosopher', 'Spiritual teacher'],
      8: ['Business executive', 'Banker', 'Real estate developer', 'Politician', 'Attorney'],
      9: ['Humanitarian worker', 'Artist', 'Teacher', 'Healer', 'Counselor'],
      11: ['Spiritual teacher', 'Psychic', 'Inspirational speaker', 'Artist', 'Counselor'],
      22: ['Architect', 'Master builder', 'International business', 'Visionary leader', 'Diplomat'],
      33: ['Spiritual healer', 'Master teacher', 'Counselor', 'Humanitarian leader', 'Artist']
    };

    return careers[expression] || ['Various fields where your unique talents shine'];
  };

  const getLuckyColors = (expression: number): string[] => {
    const colors: { [key: number]: string[] } = {
      1: ['Red', 'Orange', 'Gold'],
      2: ['Orange', 'Salmon', 'Peach'],
      3: ['Yellow', 'Rose', 'Amber'],
      4: ['Green', 'Emerald', 'Brown'],
      5: ['Turquoise', 'Light blue', 'Silver'],
      6: ['Blue', 'Indigo', 'Rose'],
      7: ['Purple', 'Violet', 'Lavender'],
      8: ['Pink', 'Black', 'Dark blue'],
      9: ['Gold', 'Red', 'Crimson'],
      11: ['Silver', 'White', 'Pale yellow'],
      22: ['Coral', 'Crimson', 'Gold'],
      33: ['Sea green', 'Aqua', 'Turquoise']
    };

    return colors[expression] || ['All colors'];
  };

  const getLuckyNumbers = (expression: number, soul: number, personality: number): number[] => {
    return [expression, soul, personality].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b);
  };

  const calculate = () => {
    if (!firstName || !lastName) {
      alert('Please enter at least first name and last name.');
      return;
    }

    const fullName = `${firstName} ${middleName} ${lastName}`.trim();
    
    // Expression Number (full name, all letters)
    const expressionNumber = calculateNameNumber(fullName);
    
    // Soul Urge Number (vowels only)
    const soulUrgeNumber = calculateNameNumber(fullName, true, false);
    
    // Personality Number (consonants only)
    const personalityNumber = calculateNameNumber(fullName, false, true);

    const expressionMeaning = getNumberMeaning(expressionNumber, 'expression');
    const soulUrgeMeaning = getNumberMeaning(soulUrgeNumber, 'soul');
    const personalityMeaning = getNumberMeaning(personalityNumber, 'personality');

    const strengths = getStrengths(expressionNumber, soulUrgeNumber, personalityNumber);
    const challenges = getChallenges(expressionNumber, soulUrgeNumber, personalityNumber);
    const careerPaths = getCareerPaths(expressionNumber);
    const luckyColors = getLuckyColors(expressionNumber);
    const luckyNumbers = getLuckyNumbers(expressionNumber, soulUrgeNumber, personalityNumber);

    setResult({
      fullName,
      expressionNumber,
      soulUrgeNumber,
      personalityNumber,
      expressionMeaning,
      soulUrgeMeaning,
      personalityMeaning,
      strengths,
      challenges,
      careerPaths,
      luckyColors,
      luckyNumbers
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
      link.download = `name-numerology-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Name Numerology Results</title>
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
        <div className="xl:col-span-1">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5" />
                Your Name
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., John"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="middleName" className="text-sm font-medium text-gray-700">
                  Middle Name (Optional)
                </Label>
                <input
                  id="middleName"
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Michael"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Smith"
                />
              </div>

              <Button 
                onClick={calculate}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Numerology
              </Button>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm text-gray-700">
                <p className="font-semibold text-purple-900 mb-2">💡 Tip</p>
                <p>Use your full birth name as it appears on your birth certificate for the most accurate reading.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Your Numerology Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Name Display */}
                    <div className="text-center bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200">
                      <div className="text-5xl mb-3">✨</div>
                      <h3 className="text-2xl font-bold text-gray-900">{result.fullName}</h3>
                    </div>

                    {/* Core Numbers */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-5 text-center">
                        <h4 className="font-semibold text-purple-900 mb-2">Expression Number</h4>
                        <div className="text-4xl font-bold text-purple-700 mb-2">{result.expressionNumber}</div>
                        <p className="text-xs text-gray-600">Your Life Path & Destiny</p>
                      </div>

                      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-5 text-center">
                        <h4 className="font-semibold text-indigo-900 mb-2">Soul Urge Number</h4>
                        <div className="text-4xl font-bold text-indigo-700 mb-2">{result.soulUrgeNumber}</div>
                        <p className="text-xs text-gray-600">Your Inner Desires</p>
                      </div>

                      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5 text-center">
                        <h4 className="font-semibold text-blue-900 mb-2">Personality Number</h4>
                        <div className="text-4xl font-bold text-blue-700 mb-2">{result.personalityNumber}</div>
                        <p className="text-xs text-gray-600">How Others See You</p>
                      </div>
                    </div>

                    {/* Meanings */}
                    <div className="space-y-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-5">
                        <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                          <span>🎯</span>
                          Expression Number {result.expressionNumber}
                        </h4>
                        <p className="text-sm text-gray-700">{result.expressionMeaning}</p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-5">
                        <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                          <span>💖</span>
                          Soul Urge Number {result.soulUrgeNumber}
                        </h4>
                        <p className="text-sm text-gray-700">{result.soulUrgeMeaning}</p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-5">
                        <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                          <span>👤</span>
                          Personality Number {result.personalityNumber}
                        </h4>
                        <p className="text-sm text-gray-700">{result.personalityMeaning}</p>
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                      <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                        <span>💪</span>
                        Your Strengths
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {result.strengths.map((strength, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-2 text-sm text-gray-700">
                            • {strength}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Challenges */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                      <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                        <span>⚠️</span>
                        Potential Challenges
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

                    {/* Career Paths */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                      <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <span>💼</span>
                        Ideal Career Paths
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {result.careerPaths.map((career, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-2 text-sm text-gray-700">
                            • {career}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lucky Elements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-pink-50 border border-pink-200 rounded-lg p-5">
                        <h4 className="font-semibold text-pink-900 mb-3 flex items-center gap-2">
                          <span>🎨</span>
                          Lucky Colors
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {result.luckyColors.map((color, idx) => (
                            <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
                        <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                          <span>🔢</span>
                          Lucky Numbers
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {result.luckyNumbers.map((number, idx) => (
                            <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                              {number}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-600">
                        Numerology is for entertainment and self-reflection purposes. Your name carries energy, but you create your own destiny through your choices and actions.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Sparkles className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Enter your name to discover your numerology profile</p>
                    <p className="text-sm mt-2">Unlock the hidden meanings in your name!</p>
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
        calculatorName="Name Numerology Calculator"
      />
    </div>
  );
}

