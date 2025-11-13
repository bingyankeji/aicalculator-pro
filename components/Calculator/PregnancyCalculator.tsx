'use client';

import { useState, useEffect } from 'react';
import { Share2, Calendar, Baby, Heart, AlertCircle, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface PregnancyInputs {
  lmpDate: string;
  cycleLength: number;
  calculationMethod: 'lmp' | 'conception' | 'ultrasound';
  conceptionDate?: string;
  ultrasoundDate?: string;
  ultrasoundWeeks?: number;
  ultrasoundDays?: number;
}

interface PregnancyResult {
  dueDate: string;
  currentWeek: number;
  currentDay: number;
  daysPregnant: number;
  daysRemaining: number;
  percentComplete: number;
  trimester: 1 | 2 | 3;
  conceptionDate: string;
  firstTrimesterEnd: string;
  secondTrimesterEnd: string;
  milestones: Milestone[];
  keyDates: KeyDate[];
  analysis: PregnancyAnalysis;
}

interface Milestone {
  week: number;
  title: string;
  description: string;
  completed: boolean;
}

interface KeyDate {
  date: string;
  week: number;
  title: string;
  description: string;
  type: 'test' | 'milestone' | 'appointment';
}

interface PregnancyAnalysis {
  trimesterPhase: string;
  currentFocus: string[];
  recommendations: string[];
  babySize: {
    comparison: string;
    length: string;
    weight: string;
  };
  symptoms: string[];
  nextMilestone: {
    week: number;
    title: string;
    daysUntil: number;
  };
}

export function PregnancyCalculator() {
  const [inputs, setInputs] = useState<PregnancyInputs>({
    lmpDate: '',
    cycleLength: 28,
    calculationMethod: 'lmp',
  });

  const [result, setResult] = useState<PregnancyResult | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const lmp = params.get('lmp');
    const cl = params.get('cl');
    if (lmp) {
      const newInputs: PregnancyInputs = { lmpDate: lmp, cycleLength: cl ? parseInt(cl) : 28, calculationMethod: 'lmp' };
      setInputs(newInputs);
      setTimeout(() => setResult(calculatePregnancy(newInputs)), 100);
    }
  }, []);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/pregnancy-calculator',
    getShareParams: () => ({ lmp: inputs.lmpDate, cl: inputs.cycleLength.toString(), m: inputs.calculationMethod }),
    getShareText: () => result ? `My due date: ${result.dueDate} | ${result.currentWeek}w ${result.currentDay}d pregnant` : 'Calculate your pregnancy due date!',
  });

  const calculatePregnancy = (inputData: PregnancyInputs): PregnancyResult => {
    let estimatedDueDate: Date, conceptionDate: Date;
    if (inputData.calculationMethod === 'lmp') {
      const lmpDate = new Date(inputData.lmpDate);
      estimatedDueDate = new Date(lmpDate.getTime() + (280 + inputData.cycleLength - 28) * 24 * 60 * 60 * 1000);
      conceptionDate = new Date(lmpDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    } else if (inputData.calculationMethod === 'conception' && inputData.conceptionDate) {
      conceptionDate = new Date(inputData.conceptionDate);
      estimatedDueDate = new Date(conceptionDate.getTime() + 266 * 24 * 60 * 60 * 1000);
    } else {
      const ultrasoundDate = new Date(inputData.ultrasoundDate!);
      const weeksAtUltrasound = inputData.ultrasoundWeeks! + (inputData.ultrasoundDays || 0) / 7;
      const daysRemaining = 280 - weeksAtUltrasound * 7;
      estimatedDueDate = new Date(ultrasoundDate.getTime() + daysRemaining * 24 * 60 * 60 * 1000);
      const lmpDate = new Date(ultrasoundDate.getTime() - weeksAtUltrasound * 7 * 24 * 60 * 60 * 1000);
      conceptionDate = new Date(lmpDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    }

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const lmpDate = inputData.calculationMethod === 'lmp' ? new Date(inputData.lmpDate) : new Date(conceptionDate.getTime() - 14 * 24 * 60 * 60 * 1000);
    const daysPregnant = Math.floor((today.getTime() - lmpDate.getTime()) / (24 * 60 * 60 * 1000));
    const currentWeek = Math.floor(daysPregnant / 7);
    const currentDay = daysPregnant % 7;
    const daysRemaining = Math.floor((estimatedDueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
    const percentComplete = Math.min(100, Math.max(0, (daysPregnant / 280) * 100));
    let trimester: 1 | 2 | 3 = currentWeek < 13 ? 1 : currentWeek < 27 ? 2 : 3;
    const firstTrimesterEnd = new Date(lmpDate.getTime() + 13 * 7 * 24 * 60 * 60 * 1000);
    const secondTrimesterEnd = new Date(lmpDate.getTime() + 27 * 7 * 24 * 60 * 60 * 1000);

    const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const addWeeks = (weeks: number) => formatDate(new Date(lmpDate.getTime() + weeks * 7 * 24 * 60 * 60 * 1000));

    const milestones = [
      { week: 4, title: 'Positive Test', description: 'hCG detectable' },
      { week: 6, title: 'Heartbeat', description: 'Heart starts beating' },
      { week: 12, title: 'End 1st Trimester', description: 'Miscarriage risk decreases' },
      { week: 20, title: 'Halfway Point', description: 'Anatomy scan' },
      { week: 24, title: 'Viability', description: 'Could survive with help' },
      { week: 28, title: '3rd Trimester', description: 'Eyes can open' },
      { week: 37, title: 'Full Term', description: 'Baby is full term' },
      { week: 40, title: 'Due Date', description: 'Expected delivery' },
    ].map(m => ({ ...m, completed: currentWeek >= m.week }));

    const keyDates = [
      { date: addWeeks(10), week: 10, title: 'First Prenatal Visit', description: 'Initial checkup', type: 'appointment' as const },
      { date: addWeeks(11), week: 11, title: 'NT Scan', description: 'Nuchal translucency (11-14w)', type: 'test' as const },
      { date: addWeeks(20), week: 20, title: 'Anatomy Scan', description: 'Detailed ultrasound', type: 'milestone' as const },
      { date: addWeeks(24), week: 24, title: 'Glucose Test', description: 'Gestational diabetes test', type: 'test' as const },
      { date: addWeeks(35), week: 35, title: 'Group B Strep', description: 'Swab test', type: 'test' as const },
    ].filter(kd => kd.week >= currentWeek);

    const analysis = generateAnalysis(currentWeek, trimester, daysPregnant, milestones);

    return {
      dueDate: formatDate(estimatedDueDate), currentWeek, currentDay, daysPregnant, daysRemaining: Math.max(0, daysRemaining),
      percentComplete: Math.round(percentComplete), trimester, conceptionDate: formatDate(conceptionDate),
      firstTrimesterEnd: formatDate(firstTrimesterEnd), secondTrimesterEnd: formatDate(secondTrimesterEnd),
      milestones, keyDates, analysis,
    };
  };

  const handleCalculate = () => {
    if (!inputs.lmpDate && inputs.calculationMethod === 'lmp') { alert('Please select your last menstrual period date'); return; }
    if (inputs.calculationMethod === 'conception' && !inputs.conceptionDate) { alert('Please select conception date'); return; }
    if (inputs.calculationMethod === 'ultrasound' && (!inputs.ultrasoundDate || inputs.ultrasoundWeeks === undefined)) { alert('Please enter ultrasound details'); return; }
    setResult(calculatePregnancy(inputs));
  };

  const generateAnalysis = (week: number, tri: number, days: number, milestones: Milestone[]): PregnancyAnalysis => {
    const babySizeData: Record<number, {comparison: string, length: string, weight: string}> = {
      4: {comparison: 'Poppy seed', length: '2mm', weight: '<1g'},
      6: {comparison: 'Sweet pea', length: '5mm', weight: '<1g'},
      8: {comparison: 'Raspberry', length: '16mm', weight: '1g'},
      10: {comparison: 'Strawberry', length: '31mm', weight: '4g'},
      12: {comparison: 'Lime', length: '54mm', weight: '14g'},
      14: {comparison: 'Lemon', length: '87mm', weight: '43g'},
      16: {comparison: 'Avocado', length: '116mm', weight: '100g'},
      18: {comparison: 'Bell pepper', length: '141mm', weight: '190g'},
      20: {comparison: 'Banana', length: '166mm', weight: '300g'},
      24: {comparison: 'Corn', length: '300mm', weight: '600g'},
      28: {comparison: 'Eggplant', length: '375mm', weight: '1kg'},
      32: {comparison: 'Coconut', length: '425mm', weight: '1.7kg'},
      36: {comparison: 'Honeydew melon', length: '475mm', weight: '2.6kg'},
      40: {comparison: 'Small pumpkin', length: '510mm', weight: '3.4kg'},
    };
    const closestWeek = Object.keys(babySizeData).map(Number).reduce((prev, curr) => 
      Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev
    );
    const babySize = babySizeData[closestWeek];

    const trimesterPhases: Record<1 | 2 | 3, string> = {
      1: 'First Trimester - Critical Development',
      2: 'Second Trimester - Growth & Movement',
      3: 'Third Trimester - Final Preparation'
    };

    const focusByTrimester: Record<1 | 2 | 3, string[]> = {
      1: ['Organ formation', 'Neural tube development', 'Prenatal vitamins', 'Morning sickness management'],
      2: ['Baby movement tracking', 'Nutrition & weight gain', 'Glucose screening', 'Anatomy scan review'],
      3: ['Birth plan preparation', 'Hospital bag packing', 'Baby positioning', 'Weekly checkups']
    };

    const recommendationsByTri: Record<1 | 2 | 3, string[]> = {
      1: ['Take folic acid (400-800mcg daily)', 'Avoid alcohol, smoking, raw foods', 'Rest when tired - fatigue is normal', 'Stay hydrated (8-10 glasses water/day)'],
      2: ['Monitor baby kicks (10+ movements/2hrs)', 'Maintain balanced diet (300 extra calories/day)', 'Start gentle pregnancy exercises', 'Sleep on your left side for better circulation'],
      3: ['Practice breathing & relaxation techniques', 'Watch for labor signs (contractions, water breaking)', 'Prepare freezer meals for postpartum', 'Install car seat and check hospital route']
    };

    const symptomsByTri: Record<1 | 2 | 3, string[]> = {
      1: ['Morning sickness & nausea', 'Fatigue & drowsiness', 'Tender breasts', 'Frequent urination', 'Food aversions'],
      2: ['Increased energy', 'Baby movements (quickening)', 'Round ligament pain', 'Skin changes', 'Heartburn'],
      3: ['Back pain & pelvic pressure', 'Braxton Hicks contractions', 'Shortness of breath', 'Swelling (edema)', 'Frequent urination returns']
    };

    const nextMilestone = milestones.find(m => !m.completed) || milestones[milestones.length - 1];
    const daysUntil = (nextMilestone.week * 7) - days;
    
    const triKey = tri as 1 | 2 | 3;
    return {
      trimesterPhase: trimesterPhases[triKey],
      currentFocus: focusByTrimester[triKey],
      recommendations: recommendationsByTri[triKey],
      babySize,
      symptoms: symptomsByTri[triKey],
      nextMilestone: {
        week: nextMilestone.week,
        title: nextMilestone.title,
        daysUntil: Math.max(0, daysUntil)
      }
    };
  };

  const getTrimesterColor = (t: number) => t === 1 ? 'text-pink-600 bg-pink-50' : t === 2 ? 'text-purple-600 bg-purple-50' : 'text-blue-600 bg-blue-50';

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT: Input Section */}
        <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border p-6 mb-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Baby className="w-5 h-5 text-pink-600" />Pregnancy Calculator</h3>
        <div className="mb-4"><label className="block text-sm font-semibold mb-2">Calculation Method</label>
          <div className="grid grid-cols-3 gap-3">
            {['lmp', 'conception', 'ultrasound'].map(m => (
              <button key={m} onClick={() => setInputs({...inputs, calculationMethod: m as any})}
                className={`px-4 py-3 rounded-lg border-2 ${inputs.calculationMethod === m ? 'border-pink-500 bg-pink-50 font-semibold' : 'border-gray-200'}`}>
                {m === 'lmp' ? 'Last Period' : m === 'conception' ? 'Conception' : 'Ultrasound'}
              </button>
            ))}
          </div>
        </div>
        {inputs.calculationMethod === 'lmp' && (
          <><div className="mb-4"><label className="block text-sm font-semibold mb-2">First Day of Last Period (LMP)</label>
            <input type="date" value={inputs.lmpDate} onChange={e => setInputs({...inputs, lmpDate: e.target.value})}
              max={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border rounded-lg" /></div>
          <div className="mb-4"><label className="block text-sm font-semibold mb-2">Cycle Length (days)</label>
            <input type="number" value={inputs.cycleLength} onChange={e => setInputs({...inputs, cycleLength: parseInt(e.target.value) || 28})}
              min="21" max="35" className="w-full px-4 py-3 border rounded-lg" />
            <p className="text-xs text-gray-500 mt-1">Typical: 21-35 days (28 average)</p></div></>
        )}
        {inputs.calculationMethod === 'conception' && (
          <div className="mb-4"><label className="block text-sm font-semibold mb-2">Conception Date</label>
            <input type="date" value={inputs.conceptionDate || ''} onChange={e => setInputs({...inputs, conceptionDate: e.target.value})}
              max={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border rounded-lg" /></div>
        )}
        {inputs.calculationMethod === 'ultrasound' && (
          <><div className="mb-4"><label className="block text-sm font-semibold mb-2">Ultrasound Date</label>
            <input type="date" value={inputs.ultrasoundDate || ''} onChange={e => setInputs({...inputs, ultrasoundDate: e.target.value})}
              max={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border rounded-lg" /></div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div><label className="block text-sm font-semibold mb-2">Weeks at Ultrasound</label>
              <input type="number" value={inputs.ultrasoundWeeks || ''} onChange={e => setInputs({...inputs, ultrasoundWeeks: parseInt(e.target.value)})}
                min="0" max="42" className="w-full px-4 py-3 border rounded-lg" /></div>
            <div><label className="block text-sm font-semibold mb-2">Days</label>
              <input type="number" value={inputs.ultrasoundDays || ''} onChange={e => setInputs({...inputs, ultrasoundDays: parseInt(e.target.value)})}
                min="0" max="6" className="w-full px-4 py-3 border rounded-lg" /></div>
          </div></>
        )}
            <button onClick={handleCalculate} className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />Calculate Due Date</button>
          </div>
        </div>

        {/* RIGHT: Results Section */}
        <div className="space-y-6">
          {result ? (<>
            {/* Main Due Date Card */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-lg border border-pink-200 p-6">
              <div className="text-center mb-4">
                <div className={`inline-block px-4 py-2 rounded-lg border-2 mb-3 ${getTrimesterColor(result.trimester)}`}>
                  <span className="text-sm font-bold">Trimester {result.trimester}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Your Due Date</h3>
                <p className="text-4xl font-bold text-pink-600 mb-2">{result.dueDate}</p>
                <p className="text-lg text-gray-700">
                  <span className="font-bold text-pink-600">{result.currentWeek} weeks</span> and{' '}
                  <span className="font-bold text-pink-600">{result.currentDay} days</span> pregnant
                </p>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Pregnancy Progress</span>
                  <span className="font-bold">{result.percentComplete}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-1000" style={{width: `${result.percentComplete}%`}} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-pink-600">{result.daysPregnant}</p>
                  <p className="text-xs text-gray-600">Days Pregnant</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-purple-600">{result.daysRemaining}</p>
                  <p className="text-xs text-gray-600">Days Remaining</p>
                </div>
              </div>
            </div>

            {/* Smart Analysis Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Smart Pregnancy Insights
              </h3>
              
              {/* Baby Size */}
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Baby className="w-5 h-5 text-pink-600" />
                  <h4 className="font-bold text-gray-900">Your Baby This Week</h4>
                </div>
                <p className="text-2xl font-bold text-pink-600 mb-1">{result.analysis.babySize.comparison}</p>
                <p className="text-sm text-gray-600">Length: {result.analysis.babySize.length} • Weight: {result.analysis.babySize.weight}</p>
              </div>

              {/* Next Milestone */}
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <h4 className="font-bold text-gray-900">Next Milestone</h4>
                </div>
                <p className="text-lg font-bold text-purple-600 mb-1">{result.analysis.nextMilestone.title}</p>
                <p className="text-sm text-gray-600">Week {result.analysis.nextMilestone.week} • 
                  {result.analysis.nextMilestone.daysUntil > 0 
                    ? ` ${result.analysis.nextMilestone.daysUntil} days to go` 
                    : ' Reached!'}
                </p>
              </div>

              {/* Key Recommendations */}
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-bold text-gray-900">Top Recommendations</h4>
                </div>
                <ul className="space-y-2">
                  {result.analysis.recommendations.slice(0, 3).map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Current Focus */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-600" />
                {result.analysis.trimesterPhase}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {result.analysis.currentFocus.map((focus, i) => (
                  <div key={i} className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700">
                    {focus}
                  </div>
                ))}
              </div>
            </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-pink-600" />Important Dates</h3>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg"><span className="text-sm font-medium">Conception:</span><span className="text-sm font-semibold">{result.conceptionDate}</span></div>
              <div className="flex justify-between p-3 bg-pink-50 rounded-lg"><span className="text-sm font-medium">1st Tri Ends:</span><span className="text-sm font-semibold text-pink-700">{result.firstTrimesterEnd}</span></div>
              <div className="flex justify-between p-3 bg-purple-50 rounded-lg"><span className="text-sm font-medium">2nd Tri Ends:</span><span className="text-sm font-semibold text-purple-700">{result.secondTrimesterEnd}</span></div>
              <div className="flex justify-between p-3 bg-blue-50 rounded-lg"><span className="text-sm font-medium">Due Date:</span><span className="text-sm font-semibold text-blue-700">{result.dueDate}</span></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Heart className="w-5 h-5 text-pink-600" />Upcoming</h3>
            <div className="space-y-3">
              {result.keyDates.slice(0,4).map((kd,i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-1"><span className="text-sm font-semibold">{kd.title}</span>
                    <span className="text-xs font-medium text-pink-600 bg-pink-100 px-2 py-1 rounded">Week {kd.week}</span></div>
                  <p className="text-xs text-gray-600">{kd.description}</p></div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border p-6 mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Baby className="w-5 h-5 text-pink-600" />Milestones</h3>
          <div className="space-y-3">
            {result.milestones.map((m,i) => (
              <div key={i} className={`flex gap-3 p-3 rounded-lg ${m.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50'} border`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${m.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                  {m.completed && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1"><span className="text-sm font-semibold">{m.title}</span><span className="text-xs font-medium text-gray-600">Week {m.week}</span></div>
                  <p className="text-xs text-gray-600">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex gap-3"><AlertCircle className="w-6 h-6 text-blue-600 mt-0.5" />
            <div><h4 className="font-bold text-blue-900 mb-2">Important Note</h4>
              <p className="text-sm text-blue-800 mb-2">This calculator provides an estimated due date. Only 5% of babies are born on their exact due date. Most arrive between 38-42 weeks.</p>
              <p className="text-sm text-blue-800">Always consult your healthcare provider for personalized prenatal care.</p>
            </div>
          </div>
        </div>

            <div className="flex justify-center gap-4">
              <button onClick={handleShare} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Share2 className="w-4 h-4" />Share Results
              </button>
            </div>
          </>) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
              <Baby className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Enter your information and click "Calculate Due Date" to see your results</p>
            </div>
          )}
        </div>
      </div>

      <ShareModal isOpen={showShareModal} onClose={closeShareModal} shareUrl={shareUrl} shareText={shareText} calculatorName="Pregnancy Calculator" />
    </div>
  );
}
