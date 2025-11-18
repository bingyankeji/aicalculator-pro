'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, Info } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface BodyTypeInputs {
  gender: 'female' | 'male';
  bustChest: string;
  waist: string;
  hips: string;
  shoulders: string;
  unit: 'cm' | 'inches';
}

interface BodyTypeResult {
  bodyShape: string;
  bodyShapeType: string;
  waistHipRatio: number;
  shoulderWaistRatio: number;
  bustWaistRatio: number;
  description: string;
  strengths: string[];
  challenges: string[];
  clothingTips: string[];
  exerciseTips: string[];
  celebrityExamples: string[];
}

export default function BodyTypeCalculator() {
  const [inputs, setInputs] = useState<BodyTypeInputs>({
    gender: 'female',
    bustChest: '',
    waist: '',
    hips: '',
    shoulders: '',
    unit: 'cm',
  });

  const [result, setResult] = useState<BodyTypeResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/body-type-calculator',
    getShareParams: () => ({
      g: inputs.gender === 'female' ? 'f' : 'm',
      b: inputs.bustChest || '',
      w: inputs.waist || '',
      h: inputs.hips || '',
      s: inputs.shoulders || '',
      u: inputs.unit === 'cm' ? 'c' : 'i',
    }),
    getShareText: () => {
      return result
        ? `My body shape is ${result.bodyShape}! Calculate yours with Body Type Calculator.`
        : 'Calculate your body type and get personalized style recommendations!';
    },
  });

  const handleInputChange = (field: keyof BodyTypeInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateBodyType = () => {
    const bust = parseFloat(inputs.bustChest);
    const waist = parseFloat(inputs.waist);
    const hips = parseFloat(inputs.hips);
    const shoulders = parseFloat(inputs.shoulders);

    if (!bust || !waist || !hips || !shoulders || bust <= 0 || waist <= 0 || hips <= 0 || shoulders <= 0) {
      alert('Please enter valid measurements for all fields.');
      return;
    }

    // Calculate ratios
    const waistHipRatio = waist / hips;
    const shoulderWaistRatio = shoulders / waist;
    const bustWaistRatio = bust / waist;
    const shoulderHipRatio = shoulders / hips;
    const bustHipRatio = bust / hips;

    let bodyShape = '';
    let bodyShapeType = '';
    let description = '';
    let strengths: string[] = [];
    let challenges: string[] = [];
    let clothingTips: string[] = [];
    let exerciseTips: string[] = [];
    let celebrityExamples: string[] = [];

    if (inputs.gender === 'female') {
      // Female body types
      if (Math.abs(bust - hips) <= 2 && waist < bust * 0.75) {
        // Hourglass
        bodyShape = 'Hourglass';
        bodyShapeType = 'X-Shape';
        description = 'Well-defined waist with bust and hips nearly equal in size. Considered the most balanced and proportionate body shape.';
        strengths = [
          'Naturally balanced proportions',
          'Well-defined waistline',
          'Curves in all the right places',
          'Most clothing styles are flattering',
        ];
        challenges = [
          'May gain weight proportionally all over',
          'Finding fitted clothing that fits both waist and curves',
          'Belts and waist definition are essential',
        ];
        clothingTips = [
          'Emphasize your waist with belts and fitted styles',
          'Wrap dresses and fitted blazers work beautifully',
          'V-necks and scoop necks balance your proportions',
          'High-waisted bottoms accentuate your curves',
          'Avoid boxy, shapeless clothing',
        ];
        exerciseTips = [
          'Full-body workouts to maintain balance',
          'Cardio to maintain overall fitness',
          'Core exercises to strengthen the waist',
          'Yoga for flexibility and posture',
        ];
        celebrityExamples = ['Marilyn Monroe', 'Scarlett Johansson', 'Beyoncé', 'Sofia Vergara'];
      } else if (hips > bust * 1.05 && waistHipRatio < 0.75) {
        // Pear / Triangle
        bodyShape = 'Pear (Triangle)';
        bodyShapeType = 'A-Shape';
        description = 'Hips wider than bust and shoulders. Weight tends to accumulate in the hips, thighs, and buttocks.';
        strengths = [
          'Well-defined waist',
          'Feminine curves',
          'Strong lower body',
          'Upper body stays slim',
        ];
        challenges = [
          'Hip area may accumulate fat easily',
          'Finding pants that fit both waist and hips',
          'Balancing proportions between upper and lower body',
        ];
        clothingTips = [
          'Draw attention upward with statement necklaces and earrings',
          'Wear brighter colors and patterns on top',
          'A-line skirts and dresses are very flattering',
          'Darker colors on bottom to minimize hips',
          'Structured shoulders and boat necks balance proportions',
          'Avoid tight-fitting pants and overly detailed bottoms',
        ];
        exerciseTips = [
          'Upper body strength training to balance proportions',
          'Cardio focusing on lower body fat burning',
          'Shoulder and arm exercises',
          'Core strengthening for overall balance',
        ];
        celebrityExamples = ['Jennifer Lopez', 'Shakira', 'Rihanna', 'Kim Kardashian'];
      } else if (bust > hips * 1.05 && shoulderWaistRatio > 1.3) {
        // Inverted Triangle
        bodyShape = 'Inverted Triangle';
        bodyShapeType = 'V-Shape';
        description = 'Shoulders and bust broader than hips. Athletic build with wider upper body.';
        strengths = [
          'Athletic and strong appearance',
          'Slim hips and legs',
          'Great for athletic wear',
          'Defined shoulders',
        ];
        challenges = [
          'Upper body appears larger',
          'Finding tops that fit shoulders and waist',
          'May lack waist definition',
        ];
        clothingTips = [
          'Draw attention to your lower body with bold colors and patterns',
          'A-line and flared skirts balance proportions',
          'V-necks and scoop necks minimize shoulder width',
          'Avoid shoulder pads and cap sleeves',
          'Dark colors on top, bright colors on bottom',
          'Wide-leg pants add volume to lower body',
        ];
        exerciseTips = [
          'Lower body exercises to add curves to hips',
          'Squats and lunges for lower body development',
          'Cardio to maintain upper body leanness',
          'Core work for waist definition',
        ];
        celebrityExamples = ['Angelina Jolie', 'Demi Moore', 'Renée Zellweger', 'Naomi Campbell'];
      } else if (Math.abs(bust - waist) < 2 && Math.abs(waist - hips) < 2) {
        // Rectangle
        bodyShape = 'Rectangle (Banana)';
        bodyShapeType = 'H-Shape';
        description = 'Bust, waist, and hips are nearly the same width. Straight up and down with minimal curves.';
        strengths = [
          'Lean and athletic appearance',
          'Can wear many styles',
          'Tends to stay slim',
          'Modern, model-like figure',
        ];
        challenges = [
          'Lack of waist definition',
          'May appear boxy in wrong styles',
          'Creating curves where there are few',
        ];
        clothingTips = [
          'Create waist definition with belts and peplum styles',
          'Layering adds dimension',
          'Ruffles and embellishments create curves',
          'Fit and flare dresses add shape',
          'Avoid shapeless, boxy clothing',
          'Color blocking can create curves',
        ];
        exerciseTips = [
          'Focus on building glutes and shoulders',
          'Oblique exercises for waist definition',
          'Squats and deadlifts for lower body curves',
          'Shoulder exercises for upper body definition',
        ];
        celebrityExamples = ['Cameron Diaz', 'Kate Hudson', 'Natalie Portman', 'Keira Knightley'];
      } else {
        // Apple / Oval
        bodyShape = 'Apple (Oval)';
        bodyShapeType = 'O-Shape';
        description = 'Weight concentrated around the midsection. Bust may be larger than hips, with less waist definition.';
        strengths = [
          'Often have great legs',
          'Slim arms and shoulders',
          'Balanced upper body',
          'Youthful appearance',
        ];
        challenges = [
          'Weight accumulates in midsection',
          'Lack of waist definition',
          'Finding flattering tops',
        ];
        clothingTips = [
          'Empire waist and A-line dresses are very flattering',
          'Show off your legs with skirts and dresses',
          'V-necks elongate the torso',
          'Avoid tight waistbands and belts',
          'Structured jackets create definition',
          'Dark, solid colors on top work well',
        ];
        exerciseTips = [
          'Cardio to reduce overall body fat',
          'Core exercises to strengthen midsection',
          'Full-body strength training',
          'Avoid spot reduction - focus on overall fitness',
        ];
        celebrityExamples = ['Drew Barrymore', 'Catherine Zeta-Jones', 'Queen Latifah', 'Rebel Wilson'];
      }
    } else {
      // Male body types
      if (shoulderWaistRatio >= 1.6 && waistHipRatio < 0.9) {
        // V-Shape / Inverted Triangle
        bodyShape = 'V-Shape (Inverted Triangle)';
        bodyShapeType = 'Athletic Build';
        description = 'Wide shoulders and chest tapering to a narrow waist. Classic athletic, masculine build.';
        strengths = [
          'Athletic and strong appearance',
          'Broad shoulders and chest',
          'Natural V-taper',
          'Most masculine body shape',
        ];
        challenges = [
          'Finding shirts that fit shoulders and waist',
          'Maintaining proportion with leg development',
          'May look top-heavy if legs are underdeveloped',
        ];
        clothingTips = [
          'Fitted shirts show off your build',
          'Slim-fit jeans balance proportions',
          'Avoid overly baggy clothing',
          'V-neck shirts emphasize shoulder width',
          'Blazers should be well-fitted at shoulders',
        ];
        exerciseTips = [
          'Maintain upper body with regular training',
          'Don\'t neglect leg day',
          'Core work for waist maintenance',
          'Balanced full-body routine',
        ];
        celebrityExamples = ['Chris Hemsworth', 'Dwayne Johnson', 'Michael B. Jordan', 'Hugh Jackman'];
      } else if (shoulderWaistRatio < 1.2 && Math.abs(shoulders - waist) < 5) {
        // Rectangle
        bodyShape = 'Rectangle';
        bodyShapeType = 'Straight Build';
        description = 'Shoulders, waist, and hips are similar in width. Straight up and down with minimal taper.';
        strengths = [
          'Lean appearance',
          'Easy to find clothes',
          'Modern, streamlined look',
          'Natural runner\'s build',
        ];
        challenges = [
          'May appear thin or lacking muscle',
          'Creating shoulder width',
          'Building muscle definition',
        ];
        clothingTips = [
          'Layering adds dimension',
          'Structured jackets create shape',
          'Horizontal stripes add width',
          'Fitted clothing shows your lean build',
          'Avoid overly loose clothing',
        ];
        exerciseTips = [
          'Focus on building shoulders and chest',
          'Compound lifts for overall mass',
          'Progressive overload for muscle growth',
          'Higher calorie diet for muscle building',
        ];
        celebrityExamples = ['Bradley Cooper', 'Ryan Gosling', 'David Beckham', 'Zac Efron'];
      } else if (waistHipRatio >= 0.95) {
        // Oval / Round
        bodyShape = 'Oval (Round)';
        bodyShapeType = 'Round Build';
        description = 'Weight concentrated around the midsection. Wider waist relative to shoulders and hips.';
        strengths = [
          'Strong and solid build',
          'Often have good strength',
          'Approachable appearance',
        ];
        challenges = [
          'Weight accumulates in midsection',
          'May lack definition',
          'Finding well-fitting shirts',
        ];
        clothingTips = [
          'Vertical stripes elongate the torso',
          'Dark, solid colors are slimming',
          'Well-fitted (not tight) clothing',
          'Structured jackets create definition',
          'Avoid horizontal stripes and tight shirts',
        ];
        exerciseTips = [
          'Cardio for overall fat loss',
          'Core strengthening exercises',
          'Full-body strength training',
          'Diet is crucial for body composition',
        ];
        celebrityExamples = ['Jack Black', 'Seth Rogen', 'James Corden', 'Jonah Hill'];
      } else {
        // Trapezoid
        bodyShape = 'Trapezoid';
        bodyShapeType = 'Balanced Athletic';
        description = 'Wide shoulders with a proportionate waist and hips. Balanced, athletic build.';
        strengths = [
          'Balanced proportions',
          'Athletic appearance',
          'Most clothing fits well',
          'Strong and capable look',
        ];
        challenges = [
          'Maintaining balance',
          'Avoiding over-development of one area',
        ];
        clothingTips = [
          'Most styles work well',
          'Fitted clothing shows your build',
          'Classic cuts are very flattering',
          'Both casual and formal wear suits you',
        ];
        exerciseTips = [
          'Balanced full-body training',
          'Mix of strength and cardio',
          'Maintain proportions',
          'Focus on overall fitness',
        ];
        celebrityExamples = ['Chris Evans', 'Henry Cavill', 'Jason Momoa', 'Idris Elba'];
      }
    }

    setResult({
      bodyShape,
      bodyShapeType,
      waistHipRatio,
      shoulderWaistRatio,
      bustWaistRatio,
      description,
      strengths,
      challenges,
      clothingTips,
      exerciseTips,
      celebrityExamples,
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
      link.download = `body-type-result-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Body Type Results</title>
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
              <CardTitle className="text-xl text-gray-900">Body Measurements</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Gender */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleInputChange('gender', 'female')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                      inputs.gender === 'female'
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                    }`}
                  >
                    👩 Female
                  </button>
                  <button
                    onClick={() => handleInputChange('gender', 'male')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                      inputs.gender === 'male'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    👨 Male
                  </button>
                </div>
              </div>

              {/* Unit */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Unit <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleInputChange('unit', 'cm')}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all ${
                      inputs.unit === 'cm'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    cm
                  </button>
                  <button
                    onClick={() => handleInputChange('unit', 'inches')}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all ${
                      inputs.unit === 'inches'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    inches
                  </button>
                </div>
              </div>

              {/* Bust/Chest */}
              <div className="space-y-2">
                <Label htmlFor="bustChest" className="text-sm font-medium text-gray-700">
                  {inputs.gender === 'female' ? 'Bust' : 'Chest'} ({inputs.unit}) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="bustChest"
                  type="number"
                  value={inputs.bustChest}
                  onChange={(e) => handleInputChange('bustChest', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={inputs.unit === 'cm' ? '90' : '35'}
                  min="0"
                  step="0.1"
                />
                <p className="text-xs text-gray-500">
                  Measure around the fullest part of your {inputs.gender === 'female' ? 'bust' : 'chest'}
                </p>
              </div>

              {/* Waist */}
              <div className="space-y-2">
                <Label htmlFor="waist" className="text-sm font-medium text-gray-700">
                  Waist ({inputs.unit}) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="waist"
                  type="number"
                  value={inputs.waist}
                  onChange={(e) => handleInputChange('waist', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={inputs.unit === 'cm' ? '70' : '27'}
                  min="0"
                  step="0.1"
                />
                <p className="text-xs text-gray-500">
                  Measure at the narrowest part of your waist
                </p>
              </div>

              {/* Hips */}
              <div className="space-y-2">
                <Label htmlFor="hips" className="text-sm font-medium text-gray-700">
                  Hips ({inputs.unit}) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="hips"
                  type="number"
                  value={inputs.hips}
                  onChange={(e) => handleInputChange('hips', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={inputs.unit === 'cm' ? '95' : '37'}
                  min="0"
                  step="0.1"
                />
                <p className="text-xs text-gray-500">
                  Measure around the fullest part of your hips
                </p>
              </div>

              {/* Shoulders */}
              <div className="space-y-2">
                <Label htmlFor="shoulders" className="text-sm font-medium text-gray-700">
                  Shoulders ({inputs.unit}) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="shoulders"
                  type="number"
                  value={inputs.shoulders}
                  onChange={(e) => handleInputChange('shoulders', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={inputs.unit === 'cm' ? '92' : '36'}
                  min="0"
                  step="0.1"
                />
                <p className="text-xs text-gray-500">
                  Measure across the widest part of your shoulders
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Calculate Button */}
          <Button
            onClick={calculateBodyType}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Body Type
          </Button>

          {/* Info Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">How to Measure:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Use a flexible measuring tape</li>
                    <li>• Stand straight and relaxed</li>
                    <li>• Don't pull the tape too tight</li>
                    <li>• Measure over thin clothing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Your Body Type Results</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Main Result */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                      <div className="text-6xl mb-3">
                        {inputs.gender === 'female' ? '👗' : '👔'}
                      </div>
                      <h3 className="text-3xl font-bold text-blue-900 mb-2">
                        {result.bodyShape}
                      </h3>
                      <p className="text-sm text-blue-700 font-medium mb-3">
                        {result.bodyShapeType}
                      </p>
                      <p className="text-gray-700">
                        {result.description}
                      </p>
                    </div>

                    {/* Body Ratios */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <div className="text-xs text-gray-600 mb-1">Waist-Hip Ratio</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {result.waistHipRatio.toFixed(2)}
                        </div>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <div className="text-xs text-gray-600 mb-1">Shoulder-Waist Ratio</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {result.shoulderWaistRatio.toFixed(2)}
                        </div>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <div className="text-xs text-gray-600 mb-1">
                          {inputs.gender === 'female' ? 'Bust-Waist' : 'Chest-Waist'} Ratio
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {result.bustWaistRatio.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                      <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">✨</span> Your Strengths
                      </h4>
                      <ul className="space-y-2">
                        {result.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-green-800 flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Challenges */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                      <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">⚡</span> Common Challenges
                      </h4>
                      <ul className="space-y-2">
                        {result.challenges.map((challenge, idx) => (
                          <li key={idx} className="text-sm text-amber-800 flex items-start gap-2">
                            <span className="text-amber-600 mt-0.5">•</span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Clothing Tips */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                      <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">👗</span> Style & Clothing Tips
                      </h4>
                      <ul className="space-y-2">
                        {result.clothingTips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-purple-800 flex items-start gap-2">
                            <span className="text-purple-600 mt-0.5">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exercise Tips */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                      <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">💪</span> Exercise & Fitness Tips
                      </h4>
                      <ul className="space-y-2">
                        {result.exerciseTips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-blue-800 flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Celebrity Examples */}
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-5">
                      <h4 className="font-bold text-pink-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">⭐</span> Celebrity Examples
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.celebrityExamples.map((celeb, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium"
                          >
                            {celeb}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📏</div>
                    <p className="text-gray-500 text-lg">
                      Enter your measurements and click "Calculate Body Type" to see your results
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          {result && (
            <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
              <Button
                onClick={handleSaveAsImage}
                variant="outline"
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Save as Image
              </Button>

              <Button
                onClick={handlePrint}
                variant="outline"
                className="gap-2"
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
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Body Type Calculator"
      />
    </div>
  );
}

