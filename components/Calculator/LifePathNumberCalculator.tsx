'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, Calendar, Sparkles, Star, Heart } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

// 生命灵数数据
const lifePathData = {
  1: {
    number: 1,
    title: 'The Leader',
    emoji: '👑',
    personality: 'Independent, ambitious, and pioneering. Life Path 1 individuals are natural-born leaders with strong willpower and determination. You are innovative, courageous, and not afraid to forge your own path. Your independent nature drives you to achieve great things.',
    strengths: 'Leadership, independence, innovation, courage, determination, originality, self-reliance',
    weaknesses: 'Stubbornness, arrogance, impatience, self-centeredness, aggression, domineering',
    lifePurpose: 'To develop independence and leadership skills while learning to balance self-reliance with cooperation. Your mission is to pioneer new ideas and inspire others through your courage and determination.',
    careerPaths: ['Entrepreneur', 'CEO', 'Manager', 'Inventor', 'Designer', 'Architect', 'Military Leader', 'Pioneer'],
    luckyNumbers: [1, 10, 19, 28],
    compatibility: {
      best: [2, 3, 9],
      challenging: [4, 8]
    },
    challenges: 'Learning to work with others, overcoming ego, accepting help, being patient with those who move slower'
  },
  2: {
    number: 2,
    title: 'The Peacemaker',
    emoji: '🕊️',
    personality: 'Diplomatic, cooperative, and sensitive. Life Path 2 individuals are natural peacemakers who excel at bringing people together. You are intuitive, empathetic, and skilled at understanding others\' perspectives. Your gentle nature and diplomatic skills make you an excellent mediator.',
    strengths: 'Diplomacy, cooperation, sensitivity, intuition, patience, harmony-seeking, supportive',
    weaknesses: 'Oversensitivity, indecisiveness, dependency, passive-aggressiveness, self-doubt',
    lifePurpose: 'To develop cooperation and partnership skills while learning to balance giving with receiving. Your mission is to create harmony and help others find common ground.',
    careerPaths: ['Counselor', 'Mediator', 'Diplomat', 'Teacher', 'Therapist', 'Social Worker', 'Artist', 'Musician'],
    luckyNumbers: [2, 11, 20, 29],
    compatibility: {
      best: [1, 6, 8, 9],
      challenging: [5, 7]
    },
    challenges: 'Building self-confidence, making decisions independently, setting boundaries, avoiding people-pleasing'
  },
  3: {
    number: 3,
    title: 'The Creative Communicator',
    emoji: '🎨',
    personality: 'Creative, expressive, and optimistic. Life Path 3 individuals are natural communicators with artistic talents. You are charming, sociable, and have a gift for inspiring others through words and creativity. Your enthusiasm and joy are contagious.',
    strengths: 'Creativity, communication, optimism, charm, artistic talent, enthusiasm, social skills',
    weaknesses: 'Scattered energy, superficiality, mood swings, exaggeration, lack of focus',
    lifePurpose: 'To develop creative expression and communication skills while learning to focus your abundant energy. Your mission is to inspire and uplift others through your artistic gifts.',
    careerPaths: ['Writer', 'Artist', 'Performer', 'Speaker', 'Designer', 'Entertainer', 'Marketing', 'Public Relations'],
    luckyNumbers: [3, 12, 21, 30],
    compatibility: {
      best: [1, 5, 6, 9],
      challenging: [4, 7]
    },
    challenges: 'Maintaining focus, following through on projects, managing finances, taking life seriously when needed'
  },
  4: {
    number: 4,
    title: 'The Builder',
    emoji: '🏗️',
    personality: 'Practical, disciplined, and hardworking. Life Path 4 individuals are master builders who create solid foundations. You are reliable, organized, and excel at turning ideas into reality through systematic effort. Your dedication and persistence are unmatched.',
    strengths: 'Discipline, reliability, organization, practicality, hard work, loyalty, patience',
    weaknesses: 'Rigidity, stubbornness, resistance to change, workaholic tendencies, narrow-mindedness',
    lifePurpose: 'To build solid foundations and create lasting structures while learning to embrace flexibility. Your mission is to bring order and stability to the world through dedicated effort.',
    careerPaths: ['Engineer', 'Accountant', 'Builder', 'Manager', 'Analyst', 'Programmer', 'Organizer', 'Administrator'],
    luckyNumbers: [4, 13, 22, 31],
    compatibility: {
      best: [2, 7, 8],
      challenging: [1, 3, 5]
    },
    challenges: 'Embracing change, being flexible, avoiding rigidity, balancing work with play, trusting intuition'
  },
  5: {
    number: 5,
    title: 'The Freedom Seeker',
    emoji: '🦅',
    personality: 'Adventurous, versatile, and freedom-loving. Life Path 5 individuals are dynamic explorers who crave variety and change. You are adaptable, curious, and thrive on new experiences. Your progressive thinking and love of freedom inspire others.',
    strengths: 'Adaptability, versatility, curiosity, freedom-loving, progressive, adventurous, resourceful',
    weaknesses: 'Restlessness, impulsiveness, irresponsibility, addiction-prone, scattered focus',
    lifePurpose: 'To experience freedom and variety while learning responsible use of freedom. Your mission is to explore life fully and help others embrace positive change.',
    careerPaths: ['Travel Writer', 'Sales', 'Marketing', 'Entrepreneur', 'Journalist', 'Photographer', 'Pilot', 'Adventurer'],
    luckyNumbers: [5, 14, 23, 32],
    compatibility: {
      best: [1, 3, 7, 9],
      challenging: [2, 4, 6]
    },
    challenges: 'Commitment, following through, avoiding excess, finding stability, being responsible'
  },
  6: {
    number: 6,
    title: 'The Nurturer',
    emoji: '❤️',
    personality: 'Caring, responsible, and family-oriented. Life Path 6 individuals are natural nurturers who create harmony and beauty. You are compassionate, protective, and have a strong sense of responsibility toward others. Your loving nature heals and supports.',
    strengths: 'Compassion, responsibility, nurturing, harmony-seeking, artistic, protective, supportive',
    weaknesses: 'Martyrdom, worry, perfectionism, controlling, self-righteousness, interference',
    lifePurpose: 'To nurture and serve others while learning to balance giving with self-care. Your mission is to create harmony and beauty in the world through love and service.',
    careerPaths: ['Teacher', 'Nurse', 'Counselor', 'Interior Designer', 'Chef', 'Social Worker', 'Healer', 'Parent'],
    luckyNumbers: [6, 15, 24, 33],
    compatibility: {
      best: [2, 3, 9],
      challenging: [5, 7]
    },
    challenges: 'Avoiding martyrdom, setting boundaries, accepting imperfection, allowing others to help, self-care'
  },
  7: {
    number: 7,
    title: 'The Seeker',
    emoji: '🔍',
    personality: 'Analytical, spiritual, and introspective. Life Path 7 individuals are deep thinkers who seek truth and wisdom. You are intuitive, philosophical, and drawn to mysteries. Your analytical mind and spiritual nature lead to profound insights.',
    strengths: 'Analytical thinking, intuition, wisdom-seeking, spirituality, introspection, perfectionism',
    weaknesses: 'Aloofness, cynicism, secretiveness, isolation, overthinking, critical nature',
    lifePurpose: 'To seek truth and develop spiritual wisdom while learning to share your insights. Your mission is to uncover hidden knowledge and help others understand deeper truths.',
    careerPaths: ['Researcher', 'Scientist', 'Philosopher', 'Analyst', 'Investigator', 'Spiritual Teacher', 'Writer', 'Psychologist'],
    luckyNumbers: [7, 16, 25, 34],
    compatibility: {
      best: [4, 5, 9],
      challenging: [2, 6, 8]
    },
    challenges: 'Connecting with others, trusting emotions, avoiding isolation, sharing feelings, practical application'
  },
  8: {
    number: 8,
    title: 'The Powerhouse',
    emoji: '💎',
    personality: 'Ambitious, authoritative, and material-focused. Life Path 8 individuals are natural executives who understand power and success. You are confident, efficient, and excel at managing resources and people. Your business acumen and leadership create abundance.',
    strengths: 'Leadership, business acumen, efficiency, ambition, authority, confidence, material success',
    weaknesses: 'Materialism, workaholism, controlling nature, impatience, ruthlessness, power struggles',
    lifePurpose: 'To achieve material success and power while learning to use them wisely. Your mission is to create abundance and teach others about prosperity and ethical leadership.',
    careerPaths: ['Executive', 'Banker', 'Investor', 'Real Estate', 'Business Owner', 'Attorney', 'Politician', 'Financial Advisor'],
    luckyNumbers: [8, 17, 26, 35],
    compatibility: {
      best: [2, 4, 6],
      challenging: [1, 7, 9]
    },
    challenges: 'Balancing work and life, avoiding materialism, using power ethically, showing vulnerability, patience'
  },
  9: {
    number: 9,
    title: 'The Humanitarian',
    emoji: '🌍',
    personality: 'Compassionate, idealistic, and humanitarian. Life Path 9 individuals are old souls who care deeply about humanity. You are generous, tolerant, and have a global perspective. Your wisdom and compassion inspire positive change in the world.',
    strengths: 'Compassion, idealism, wisdom, tolerance, generosity, humanitarian, artistic',
    weaknesses: 'Martyrdom, emotional volatility, impracticality, resentment, difficulty letting go',
    lifePurpose: 'To serve humanity and promote universal love while learning to let go and forgive. Your mission is to make the world a better place through compassion and wisdom.',
    careerPaths: ['Humanitarian Worker', 'Artist', 'Teacher', 'Healer', 'Counselor', 'Activist', 'Philanthropist', 'Writer'],
    luckyNumbers: [9, 18, 27, 36],
    compatibility: {
      best: [1, 2, 3, 6],
      challenging: [5, 8]
    },
    challenges: 'Setting boundaries, practical matters, avoiding martyrdom, accepting endings, self-care'
  },
  11: {
    number: 11,
    title: 'The Spiritual Messenger',
    emoji: '✨',
    personality: 'Intuitive, inspirational, and spiritually aware. Master Number 11 individuals are spiritual messengers with heightened intuition. You are visionary, idealistic, and have the ability to inspire and enlighten others. Your spiritual insights illuminate the path for many.',
    strengths: 'Intuition, inspiration, spiritual awareness, idealism, vision, charisma, enlightenment',
    weaknesses: 'Nervous tension, impracticality, extremism, self-doubt, oversensitivity, anxiety',
    lifePurpose: 'To inspire and enlighten others through spiritual wisdom while staying grounded. Your mission is to be a beacon of light and help humanity evolve spiritually.',
    careerPaths: ['Spiritual Teacher', 'Motivational Speaker', 'Artist', 'Healer', 'Counselor', 'Writer', 'Inventor', 'Visionary'],
    luckyNumbers: [11, 2, 29, 38],
    compatibility: {
      best: [2, 6, 22],
      challenging: [4, 8]
    },
    challenges: 'Staying grounded, managing nervous energy, practical application, avoiding escapism, self-confidence'
  },
  22: {
    number: 22,
    title: 'The Master Builder',
    emoji: '🏛️',
    personality: 'Visionary, practical, and powerful. Master Number 22 individuals combine spiritual vision with practical ability. You are the master builder who can turn dreams into reality on a grand scale. Your unique blend of idealism and practicality creates lasting impact.',
    strengths: 'Vision, practicality, leadership, building, manifestation, power, discipline',
    weaknesses: 'Overwhelming pressure, anxiety, self-doubt, workaholic tendencies, controlling',
    lifePurpose: 'To build something of lasting value that benefits humanity while balancing spiritual and material. Your mission is to manifest grand visions into concrete reality.',
    careerPaths: ['Architect', 'Builder', 'CEO', 'Politician', 'Diplomat', 'Engineer', 'Planner', 'Visionary Leader'],
    luckyNumbers: [22, 4, 31, 40],
    compatibility: {
      best: [4, 8, 11],
      challenging: [5, 7]
    },
    challenges: 'Managing pressure, avoiding burnout, staying humble, accepting limitations, work-life balance'
  },
  33: {
    number: 33,
    title: 'The Master Teacher',
    emoji: '🌟',
    personality: 'Nurturing, selfless, and devoted to service. Master Number 33 individuals are master teachers who embody unconditional love. You are the ultimate nurturer with the ability to heal and uplift humanity. Your compassion and wisdom guide others toward enlightenment.',
    strengths: 'Unconditional love, healing, teaching, compassion, wisdom, selflessness, nurturing',
    weaknesses: 'Martyrdom, emotional overwhelm, unrealistic expectations, burnout, inability to say no',
    lifePurpose: 'To teach and heal through unconditional love while maintaining healthy boundaries. Your mission is to raise consciousness and help humanity evolve through compassionate service.',
    careerPaths: ['Master Teacher', 'Healer', 'Spiritual Guide', 'Counselor', 'Humanitarian', 'Artist', 'Caregiver', 'Mentor'],
    luckyNumbers: [33, 6, 15, 24],
    compatibility: {
      best: [6, 9, 11, 22],
      challenging: [1, 8]
    },
    challenges: 'Setting boundaries, avoiding burnout, accepting human limitations, practical matters, self-care'
  }
};

type LifePathNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 22 | 33;

interface LifePathResult {
  lifePathNumber: LifePathNumber;
  data: typeof lifePathData[LifePathNumber];
  calculationSteps: string[];
}

export default function LifePathNumberCalculator() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [result, setResult] = useState<LifePathResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/life-path-number-calculator',
    getShareParams: () => ({
      m: month,
      d: day,
      y: year,
    }),
    getShareText: () => {
      return result
        ? `My Life Path Number is ${result.lifePathNumber} - ${result.data.title} ${result.data.emoji}! Calculate yours:`
        : 'Discover your Life Path Number and life purpose!';
    },
  });

  const reduceToSingleDigit = (num: number): { result: number; steps: string[] } => {
    const steps: string[] = [];
    let current = num;
    
    while (current > 9 && current !== 11 && current !== 22 && current !== 33) {
      const digits = current.toString().split('').map(Number);
      const sum = digits.reduce((a, b) => a + b, 0);
      steps.push(`${current} = ${digits.join(' + ')} = ${sum}`);
      current = sum;
    }
    
    return { result: current, steps };
  };

  const calculateLifePathNumber = (m: number, d: number, y: number): LifePathResult => {
    const steps: string[] = [];
    steps.push(`Birth Date: ${m}/${d}/${y}`);
    
    // Reduce month
    const monthReduction = reduceToSingleDigit(m);
    if (monthReduction.steps.length > 0) {
      steps.push(`Month: ${monthReduction.steps.join(' → ')}`);
    } else {
      steps.push(`Month: ${m}`);
    }
    
    // Reduce day
    const dayReduction = reduceToSingleDigit(d);
    if (dayReduction.steps.length > 0) {
      steps.push(`Day: ${dayReduction.steps.join(' → ')}`);
    } else {
      steps.push(`Day: ${d}`);
    }
    
    // Reduce year
    const yearReduction = reduceToSingleDigit(y);
    if (yearReduction.steps.length > 0) {
      steps.push(`Year: ${yearReduction.steps.join(' → ')}`);
    } else {
      steps.push(`Year: ${y}`);
    }
    
    // Sum all reduced numbers
    const sum = monthReduction.result + dayReduction.result + yearReduction.result;
    steps.push(`Sum: ${monthReduction.result} + ${dayReduction.result} + ${yearReduction.result} = ${sum}`);
    
    // Final reduction
    const finalReduction = reduceToSingleDigit(sum);
    if (finalReduction.steps.length > 0) {
      steps.push(`Final: ${finalReduction.steps.join(' → ')}`);
    }
    
    const lifePathNumber = finalReduction.result as LifePathNumber;
    steps.push(`Life Path Number: ${lifePathNumber}`);
    
    return {
      lifePathNumber,
      data: lifePathData[lifePathNumber],
      calculationSteps: steps
    };
  };

  const calculate = () => {
    const m = parseInt(month);
    const d = parseInt(day);
    const y = parseInt(year);
    
    if (!month || !day || !year || isNaN(m) || isNaN(d) || isNaN(y)) {
      alert('Please enter a complete birth date.');
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
      alert('Please enter a valid year (1900-2100).');
      return;
    }

    const calculatedResult = calculateLifePathNumber(m, d, y);
    setResult(calculatedResult);
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
      link.download = `life-path-number-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Life Path Number Results</title>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-medium text-gray-700">
                  Birth Year <span className="text-red-500">*</span>
                </Label>
                <input
                  id="year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 1990"
                  min="1900"
                  max="2100"
                />
              </div>

              <Button 
                onClick={calculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Life Path Number
              </Button>
            </CardContent>
          </Card>

          {/* Life Path Numbers Reference */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">Life Path Numbers</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2 text-sm">
                {Object.entries(lifePathData).map(([num, data]) => (
                  <div key={num} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span className="text-xl">{data.emoji}</span>
                    <div>
                      <span className="font-bold text-blue-700">{num}</span>
                      <span className="text-gray-600"> - {data.title}</span>
                    </div>
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
                  Your Life Path Number
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Main Number Display */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                      <div className="text-8xl mb-4">{result.data.emoji}</div>
                      <div className="text-6xl font-bold text-blue-700 mb-2">{result.lifePathNumber}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{result.data.title}</h3>
                      
                      {/* Calculation Steps */}
                      <div className="bg-white rounded-lg p-4 mt-4">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Calculation Steps:</h4>
                        <div className="text-xs text-gray-600 space-y-1 text-left">
                          {result.calculationSteps.map((step, idx) => (
                            <div key={idx}>{step}</div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Personality */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
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

                    {/* Life Purpose */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                        <span className="text-lg">🎯</span>
                        Life Purpose & Mission
                      </h4>
                      <p className="text-sm text-purple-700 leading-relaxed">{result.data.lifePurpose}</p>
                    </div>

                    {/* Career Paths */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="text-lg">💼</span>
                        Ideal Career Paths
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {result.data.careerPaths.map((career, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Lucky Numbers */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="text-lg">🍀</span>
                        Lucky Numbers
                      </h4>
                      <div className="flex gap-3 mt-2">
                        {result.data.luckyNumbers.map((num, idx) => (
                          <div key={idx} className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-md">
                            {num}
                          </div>
                        ))}
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

                    {/* Challenges */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                        <span className="text-lg">🎓</span>
                        Life Challenges & Lessons
                      </h4>
                      <p className="text-sm text-orange-700 leading-relaxed">{result.data.challenges}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Sparkles className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Enter your birth date to discover your Life Path Number</p>
                    <p className="text-sm mt-2">Learn about your life purpose, talents, and destiny!</p>
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
        calculatorName="Life Path Number Calculator"
      />
    </div>
  );
}

