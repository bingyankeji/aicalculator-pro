'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Copy, Share2, Printer, TrendingUp, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

type FormulaType = 'epley' | 'brzycki' | 'lander' | 'lombardi' | 'mayhew' | 'oconner' | 'wathan';

interface OneRepMaxResult {
  weight: number;
  reps: number;
  weightUnit: string;
  displayUnit: string;
  
  // 1RM estimates from different formulas
  epley: number;
  brzycki: number;
  lander: number;
  lombardi: number;
  mayhew: number;
  oconner: number;
  wathan: number;
  
  // Selected formula result
  selected: number;
  selectedFormula: FormulaType;
  
  // Average
  average: number;
  
  // Training percentages (in display unit)
  trainingWeights: {
    percentage: number;
    weight: number;
    reps: string;
    purpose: string;
  }[];
  
  // Strength standards
  bodyweight?: number;
  strengthRatio?: number;
  strengthLevel?: string;
  strengthLevelColor?: string;
}

export default function OneRepMaxCalculator() {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');
  const [displayUnit, setDisplayUnit] = useState<'lbs' | 'kg'>('lbs');
  const [selectedFormula, setSelectedFormula] = useState<FormulaType>('epley');
  const [exercise, setExercise] = useState('bench_press');
  const [bodyweight, setBodyweight] = useState('');
  const [bodyweightUnit, setBodyweightUnit] = useState<'lbs' | 'kg'>('lbs');
  const [showAllFormulas, setShowAllFormulas] = useState(false);
  
  const [result, setResult] = useState<OneRepMaxResult | null>(null);

  // Different 1RM formulas
  const calculateEpley = (w: number, r: number) => w * (1 + r / 30);
  const calculateBrzycki = (w: number, r: number) => w * (36 / (37 - r));
  const calculateLander = (w: number, r: number) => (100 * w) / (101.3 - 2.67123 * r);
  const calculateLombardi = (w: number, r: number) => w * Math.pow(r, 0.1);
  const calculateMayhew = (w: number, r: number) => (100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * r));
  const calculateOConner = (w: number, r: number) => w * (1 + r / 40);
  const calculateWathan = (w: number, r: number) => (100 * w) / (48.8 + 53.8 * Math.exp(-0.075 * r));

  const getFormulaName = (formula: FormulaType): string => {
    const names: { [key in FormulaType]: string } = {
      epley: 'Epley',
      brzycki: 'Brzycki',
      lander: 'Lander',
      lombardi: 'Lombardi',
      mayhew: 'Mayhew',
      oconner: "O'Conner",
      wathan: 'Wathan',
    };
    return names[formula];
  };

  const getFormulaDescription = (formula: FormulaType): string => {
    const descriptions: { [key in FormulaType]: string } = {
      epley: 'Most popular. Best for 1-6 reps.',
      brzycki: 'Conservative. Best for 7-12 reps.',
      lander: 'Middle ground between Epley and Brzycki.',
      lombardi: 'Uses exponential calculation. Conservative.',
      mayhew: 'Complex formula. Accurate across all rep ranges.',
      oconner: 'Most conservative. Good for beginners.',
      wathan: 'Similar to Mayhew with different coefficients.',
    };
    return descriptions[formula];
  };

  const getExerciseName = (key: string): string => {
    const names: { [key: string]: string } = {
      bench_press: 'Bench Press',
      squat: 'Squat',
      deadlift: 'Deadlift',
      overhead_press: 'Overhead Press',
      barbell_row: 'Barbell Row',
    };
    return names[key] || key;
  };

  const convertWeight = (weight: number, from: 'lbs' | 'kg', to: 'lbs' | 'kg'): number => {
    if (from === to) return weight;
    if (from === 'lbs' && to === 'kg') return weight * 0.453592;
    if (from === 'kg' && to === 'lbs') return weight / 0.453592;
    return weight;
  };

  const getStrengthLevel = (exercise: string, ratio: number): { level: string; color: string } => {
    const standards: { [key: string]: { [level: string]: number } } = {
      bench_press: {
        beginner: 0.5,
        novice: 0.75,
        intermediate: 1.0,
        advanced: 1.5,
        elite: 2.0,
      },
      squat: {
        beginner: 0.75,
        novice: 1.0,
        intermediate: 1.5,
        advanced: 2.0,
        elite: 2.5,
      },
      deadlift: {
        beginner: 1.0,
        novice: 1.25,
        intermediate: 1.75,
        advanced: 2.5,
        elite: 3.0,
      },
      overhead_press: {
        beginner: 0.35,
        novice: 0.5,
        intermediate: 0.75,
        advanced: 1.0,
        elite: 1.5,
      },
      barbell_row: {
        beginner: 0.5,
        novice: 0.75,
        intermediate: 1.0,
        advanced: 1.25,
        elite: 1.75,
      },
    };

    const std = standards[exercise] || standards.bench_press;

    if (ratio >= std.elite) return { level: 'Elite', color: 'purple' };
    if (ratio >= std.advanced) return { level: 'Advanced', color: 'blue' };
    if (ratio >= std.intermediate) return { level: 'Intermediate', color: 'green' };
    if (ratio >= std.novice) return { level: 'Novice', color: 'yellow' };
    if (ratio >= std.beginner) return { level: 'Beginner', color: 'orange' };
    return { level: 'Untrained', color: 'gray' };
  };

  const calculate = () => {
    const w = parseFloat(weight) || 0;
    const r = parseInt(reps) || 0;

    if (w <= 0) {
      alert('Please enter a valid weight.');
      return;
    }

    if (r <= 0 || r > 12) {
      alert('Please enter reps between 1-12. For higher reps, the estimate becomes less accurate.');
      return;
    }

    // Convert input weight to kg for calculation
    const weightKg = weightUnit === 'lbs' ? w * 0.453592 : w;

    // If reps = 1, that's already the 1RM
    if (r === 1) {
      const oneRMInKg = weightKg;
      const oneRMInDisplay = displayUnit === 'kg' ? oneRMInKg : oneRMInKg / 0.453592;
      const trainingWeights = generateTrainingWeights(oneRMInDisplay);
      
      setResult({
        weight: w,
        reps: r,
        weightUnit,
        displayUnit,
        epley: oneRMInDisplay,
        brzycki: oneRMInDisplay,
        lander: oneRMInDisplay,
        lombardi: oneRMInDisplay,
        mayhew: oneRMInDisplay,
        oconner: oneRMInDisplay,
        wathan: oneRMInDisplay,
        selected: oneRMInDisplay,
        selectedFormula,
        average: oneRMInDisplay,
        trainingWeights,
        ...calculateStrengthData(oneRMInKg),
      });
      return;
    }

    // Calculate using all formulas (in kg)
    const epleyKg = calculateEpley(weightKg, r);
    const brzyckiKg = calculateBrzycki(weightKg, r);
    const landerKg = calculateLander(weightKg, r);
    const lombardiKg = calculateLombardi(weightKg, r);
    const mayhewKg = calculateMayhew(weightKg, r);
    const oconnerKg = calculateOConner(weightKg, r);
    const wathanKg = calculateWathan(weightKg, r);

    // Convert all results to display unit
    const epley = displayUnit === 'kg' ? epleyKg : epleyKg / 0.453592;
    const brzycki = displayUnit === 'kg' ? brzyckiKg : brzyckiKg / 0.453592;
    const lander = displayUnit === 'kg' ? landerKg : landerKg / 0.453592;
    const lombardi = displayUnit === 'kg' ? lombardiKg : lombardiKg / 0.453592;
    const mayhew = displayUnit === 'kg' ? mayhewKg : mayhewKg / 0.453592;
    const oconner = displayUnit === 'kg' ? oconnerKg : oconnerKg / 0.453592;
    const wathan = displayUnit === 'kg' ? wathanKg : wathanKg / 0.453592;

    // Get selected formula result
    const formulaMap = {
      epley, brzycki, lander, lombardi, mayhew, oconner, wathan
    };
    const selected = formulaMap[selectedFormula];

    // Calculate average
    const average = (epley + brzycki + lander + lombardi + mayhew + oconner + wathan) / 7;

    // Generate training weights using selected formula
    const trainingWeights = generateTrainingWeights(selected);

    // Get selected formula result in kg for strength calculation
    const selectedKg = displayUnit === 'kg' ? selected : selected * 0.453592;

    setResult({
      weight: w,
      reps: r,
      weightUnit,
      displayUnit,
      epley,
      brzycki,
      lander,
      lombardi,
      mayhew,
      oconner,
      wathan,
      selected,
      selectedFormula,
      average,
      trainingWeights,
      ...calculateStrengthData(selectedKg),
    });
  };

  const calculateStrengthData = (oneRMKg: number) => {
    if (!bodyweight) return {};
    
    const bw = parseFloat(bodyweight);
    const bwKg = bodyweightUnit === 'lbs' ? bw * 0.453592 : bw;
    const ratio = oneRMKg / bwKg;
    const strengthLevel = getStrengthLevel(exercise, ratio);
    
    return {
      bodyweight: bw,
      strengthRatio: ratio,
      strengthLevel: strengthLevel.level,
      strengthLevelColor: strengthLevel.color,
    };
  };

  const generateTrainingWeights = (oneRM: number) => {
    return [
      { percentage: 95, weight: oneRM * 0.95, reps: '1-2', purpose: 'Max Strength / Competition' },
      { percentage: 90, weight: oneRM * 0.90, reps: '2-3', purpose: 'Max Strength / Peaking' },
      { percentage: 85, weight: oneRM * 0.85, reps: '3-5', purpose: 'Strength Training' },
      { percentage: 80, weight: oneRM * 0.80, reps: '5-6', purpose: 'Strength / Power' },
      { percentage: 75, weight: oneRM * 0.75, reps: '6-8', purpose: 'Hypertrophy (Muscle Growth)' },
      { percentage: 70, weight: oneRM * 0.70, reps: '8-10', purpose: 'Hypertrophy / Endurance' },
      { percentage: 65, weight: oneRM * 0.65, reps: '10-12', purpose: 'Muscular Endurance' },
      { percentage: 60, weight: oneRM * 0.60, reps: '12-15', purpose: 'Endurance / Warm-up' },
      { percentage: 50, weight: oneRM * 0.50, reps: '15-20', purpose: 'Warm-up / Recovery' },
    ];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'One Rep Max Calculator',
          text: 'Check out this 1RM Calculator!',
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Left: Input Area (1 column) */}
        <div className="xl:col-span-1">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
              <CardTitle className="text-xl">Lift Details</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Enter your lift information</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Exercise Selection */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm">🏋️ Exercise Type</h3>
                <div>
                  <Label htmlFor="exercise" className="text-xs">Select Exercise</Label>
                  <select
                    id="exercise"
                    value={exercise}
                    onChange={(e) => setExercise(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="bench_press">💪 Bench Press</option>
                    <option value="squat">🦵 Squat</option>
                    <option value="deadlift">🏋️ Deadlift</option>
                    <option value="overhead_press">💪 Overhead Press</option>
                    <option value="barbell_row">🔄 Barbell Row</option>
                  </select>
                </div>
              </div>

              {/* Weight Lifted */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-gray-900 text-sm">⚖️ Weight & Reps</h3>
                <div>
                  <Label htmlFor="weight" className="text-xs">
                    Weight Lifted <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      placeholder="e.g., 225"
                      min="0"
                      step="5"
                    />
                    <select
                      value={weightUnit}
                      onChange={(e) => setWeightUnit(e.target.value as 'lbs' | 'kg')}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
                    >
                      <option value="lbs">lbs</option>
                      <option value="kg">kg</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Weight you successfully lifted</p>
                </div>

                <div>
                  <Label htmlFor="reps" className="text-xs">
                    Repetitions <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="reps"
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="e.g., 5"
                    min="1"
                    max="12"
                  />
                  <p className="text-xs text-gray-500 mt-1">How many reps did you complete? (1-12 for best accuracy)</p>
                </div>
              </div>

              {/* Formula Selection */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-gray-900 text-sm">📐 1RM Estimation Formula</h3>
                <div className="space-y-2">
                  {(['epley', 'brzycki', 'lander', 'lombardi', 'mayhew', 'oconner', 'wathan'] as FormulaType[]).map((formula) => (
                    <label key={formula} className="flex items-start gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="formula"
                        value={formula}
                        checked={selectedFormula === formula}
                        onChange={(e) => setSelectedFormula(e.target.value as FormulaType)}
                        className="mt-0.5 text-red-600 focus:ring-red-500"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900 group-hover:text-red-600">
                          {getFormulaName(formula)}
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {getFormulaDescription(formula)}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Display Unit Selection */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-gray-900 text-sm">📊 Display Results In</h3>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="displayUnit"
                      value="lbs"
                      checked={displayUnit === 'lbs'}
                      onChange={(e) => setDisplayUnit(e.target.value as 'lbs' | 'kg')}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-gray-900">Pounds (lbs)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="displayUnit"
                      value="kg"
                      checked={displayUnit === 'kg'}
                      onChange={(e) => setDisplayUnit(e.target.value as 'lbs' | 'kg')}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-gray-900">Kilograms (kg)</span>
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  Results and training weights will be shown in this unit
                </p>
              </div>

              {/* Optional: Bodyweight */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-gray-900 text-sm">📊 Strength Level (Optional)</h3>
                <div>
                  <Label htmlFor="bodyweight" className="text-xs">Your Bodyweight</Label>
                  <div className="flex gap-2">
                    <input
                      id="bodyweight"
                      type="number"
                      value={bodyweight}
                      onChange={(e) => setBodyweight(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      placeholder="e.g., 180"
                      min="0"
                      step="1"
                    />
                    <select
                      value={bodyweightUnit}
                      onChange={(e) => setBodyweightUnit(e.target.value as 'lbs' | 'kg')}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
                    >
                      <option value="lbs">lbs</option>
                      <option value="kg">kg</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Used to calculate your strength level</p>
                </div>
              </div>

              <Button
                onClick={calculate}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 min-h-[44px]"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate 1RM
              </Button>

              {/* Safety Warning */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-700">
                    <p className="font-semibold mb-1">Safety First!</p>
                    <p>Never attempt 1RM without proper warm-up, spotter, and technique. Use calculated values for training planning, not actual 1RM testing.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Results Area (2 columns) */}
        <div className="xl:col-span-2">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
              <CardTitle className="text-xl">One Rep Max Results</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result ? (
                <div className="space-y-4">
                  {/* Main 1RM Result */}
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-2 border-red-400 p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm text-gray-600">Estimated One Rep Max (1RM):</p>
                        <p className="text-xs text-gray-500">Using {getFormulaName(result.selectedFormula)} formula</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(result.selected.toFixed(1))}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-12 w-12 text-red-600" />
                      <div>
                        <p className="font-mono text-4xl font-bold text-red-700">
                          {result.selected.toFixed(1)} {result.displayUnit}
                        </p>
                        <p className="text-sm text-gray-600">
                          Based on {result.weight} {result.weightUnit} × {result.reps} reps
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Strength Level */}
                  {result.strengthLevel && (
                    <div className={`rounded-lg border-2 p-4 ${
                      result.strengthLevelColor === 'purple' ? 'bg-purple-50 border-purple-400' :
                      result.strengthLevelColor === 'blue' ? 'bg-blue-50 border-blue-400' :
                      result.strengthLevelColor === 'green' ? 'bg-green-50 border-green-400' :
                      result.strengthLevelColor === 'yellow' ? 'bg-yellow-50 border-yellow-400' :
                      result.strengthLevelColor === 'orange' ? 'bg-orange-50 border-orange-400' :
                      'bg-gray-50 border-gray-400'
                    }`}>
                      <h3 className="font-semibold text-gray-900 mb-2">💪 Your Strength Level</h3>
                      <p className={`text-2xl font-bold ${
                        result.strengthLevelColor === 'purple' ? 'text-purple-700' :
                        result.strengthLevelColor === 'blue' ? 'text-blue-700' :
                        result.strengthLevelColor === 'green' ? 'text-green-700' :
                        result.strengthLevelColor === 'yellow' ? 'text-yellow-700' :
                        result.strengthLevelColor === 'orange' ? 'text-orange-700' :
                        'text-gray-700'
                      }`}>
                        {result.strengthLevel}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {getExerciseName(exercise)}: {result.strengthRatio?.toFixed(2)}x bodyweight
                      </p>
                    </div>
                  )}

                  {/* Formula Comparison - Collapsible */}
                  <div className="bg-white rounded-lg border-2 border-gray-200">
                    <button
                      onClick={() => setShowAllFormulas(!showAllFormulas)}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900">📐 All Formula Comparison</h3>
                      {showAllFormulas ? (
                        <ChevronUp className="h-5 w-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                    
                    {showAllFormulas && (
                      <div className="p-4 pt-0 border-t">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                          <div className={result.selectedFormula === 'epley' ? 'bg-red-50 p-2 rounded border-2 border-red-400' : 'p-2'}>
                            <p className="text-gray-600 text-xs">Epley:</p>
                            <p className="font-mono font-bold">{result.epley.toFixed(1)}</p>
                          </div>
                          <div className={result.selectedFormula === 'brzycki' ? 'bg-red-50 p-2 rounded border-2 border-red-400' : 'p-2'}>
                            <p className="text-gray-600 text-xs">Brzycki:</p>
                            <p className="font-mono font-bold">{result.brzycki.toFixed(1)}</p>
                          </div>
                          <div className={result.selectedFormula === 'lander' ? 'bg-red-50 p-2 rounded border-2 border-red-400' : 'p-2'}>
                            <p className="text-gray-600 text-xs">Lander:</p>
                            <p className="font-mono font-bold">{result.lander.toFixed(1)}</p>
                          </div>
                          <div className={result.selectedFormula === 'lombardi' ? 'bg-red-50 p-2 rounded border-2 border-red-400' : 'p-2'}>
                            <p className="text-gray-600 text-xs">Lombardi:</p>
                            <p className="font-mono font-bold">{result.lombardi.toFixed(1)}</p>
                          </div>
                          <div className={result.selectedFormula === 'mayhew' ? 'bg-red-50 p-2 rounded border-2 border-red-400' : 'p-2'}>
                            <p className="text-gray-600 text-xs">Mayhew:</p>
                            <p className="font-mono font-bold">{result.mayhew.toFixed(1)}</p>
                          </div>
                          <div className={result.selectedFormula === 'oconner' ? 'bg-red-50 p-2 rounded border-2 border-red-400' : 'p-2'}>
                            <p className="text-gray-600 text-xs">O'Conner:</p>
                            <p className="font-mono font-bold">{result.oconner.toFixed(1)}</p>
                          </div>
                          <div className={result.selectedFormula === 'wathan' ? 'bg-red-50 p-2 rounded border-2 border-red-400' : 'p-2'}>
                            <p className="text-gray-600 text-xs">Wathan:</p>
                            <p className="font-mono font-bold">{result.wathan.toFixed(1)}</p>
                          </div>
                          <div className="p-2 bg-blue-50 rounded">
                            <p className="text-gray-600 text-xs">Average:</p>
                            <p className="font-mono font-bold">{result.average.toFixed(1)}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                          ✓ All values in {result.displayUnit}. Selected formula is highlighted.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Training Weight Table */}
                  <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">🎯 Training Weights (Based on {getFormulaName(result.selectedFormula)})</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 text-left">% of 1RM</th>
                            <th className="p-2 text-right">Weight</th>
                            <th className="p-2 text-center">Reps</th>
                            <th className="p-2 text-left">Training Purpose</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.trainingWeights.map((tw) => (
                            <tr key={tw.percentage} className="border-t hover:bg-gray-50">
                              <td className="p-2 font-bold text-red-700">{tw.percentage}%</td>
                              <td className="p-2 text-right font-mono">{tw.weight.toFixed(1)} {result.displayUnit}</td>
                              <td className="p-2 text-center text-gray-600">{tw.reps}</td>
                              <td className="p-2 text-gray-700 text-xs">{tw.purpose}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Training Tips */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">💡 Training Tips</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• <strong>85-95% 1RM:</strong> Use for max strength (1-5 reps). Long rest (3-5 min).</li>
                      <li>• <strong>70-85% 1RM:</strong> Best for hypertrophy/muscle growth (6-12 reps). 2-3 min rest.</li>
                      <li>• <strong>50-70% 1RM:</strong> For muscular endurance (12+ reps). 1-2 min rest.</li>
                      <li>• <strong>Progressive overload:</strong> Increase weight 2.5-5% when you can do 2+ extra reps.</li>
                      <li>• <strong>Deload:</strong> Every 4-6 weeks, reduce weight to 60-70% for recovery.</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center text-gray-500">
                    <Calculator className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Enter your lift details and select a formula</p>
                    <p className="text-sm mt-2">Choose your preferred 1RM calculation method</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reference Card */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
          <CardTitle className="text-xl">Understanding 1RM & Training</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border-2 border-red-200 p-4">
              <h3 className="text-lg font-semibold text-red-700 mb-3">🎯 What is 1RM?</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>One Repetition Maximum (1RM)</strong> is the maximum weight you can lift for one complete repetition with proper form.
              </p>
              <p className="text-xs text-gray-600">
                It's the gold standard for measuring maximum strength and programming progressive overload in strength training.
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-orange-200 p-4">
              <h3 className="text-lg font-semibold text-orange-700 mb-3">📐 Calculation Methods</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Common Formulas:</strong>
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• <strong>Epley:</strong> Best for low reps (1-6)</li>
                <li>• <strong>Brzycki:</strong> Best for high reps (7-12)</li>
                <li>• <strong>Others:</strong> Lander, Lombardi, etc.</li>
                <li>• <strong>Accuracy:</strong> ±5-10% for 1-6 reps</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border-2 border-yellow-200 p-4">
              <h3 className="text-lg font-semibold text-yellow-700 mb-3">⚠️ Safety Tips</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Always use a spotter for heavy lifts</li>
                <li>• Warm up thoroughly (10-15 min)</li>
                <li>• Use proper technique, not ego</li>
                <li>• Don't test 1RM frequently (every 8-12 weeks)</li>
                <li>• Use calculated values, not actual maxes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
        <Button onClick={handlePrint} variant="outline" className="gap-2">
          <Printer className="h-4 w-4" />
          Print Training Plan
        </Button>
        <Button onClick={handleShare} variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Calculator
        </Button>
      </div>
    </div>
  );
}
