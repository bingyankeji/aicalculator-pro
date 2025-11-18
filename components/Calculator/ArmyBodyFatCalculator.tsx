'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Gender = 'male' | 'female';
type MeasurementSystem = 'metric' | 'imperial';
type Branch = 'army' | 'navy' | 'marines';

interface BodyFatResult {
  bodyFatPercentage: number;
  status: 'pass' | 'fail';
  maxAllowed: number;
  category: string;
  toReachGoal: number;
  healthRisk: string;
}

interface AgeStandard {
  age: string;
  maleMax: number;
  femaleMax: number;
}

const ageStandards: AgeStandard[] = [
  { age: '17-20', maleMax: 20, femaleMax: 30 },
  { age: '21-27', maleMax: 22, femaleMax: 32 },
  { age: '28-39', maleMax: 24, femaleMax: 34 },
  { age: '40+', maleMax: 26, femaleMax: 36 },
];

const bodyFatCategories = [
  { category: 'Essential Fat', male: [2, 5], female: [10, 13], description: 'Minimum for basic physiological functions' },
  { category: 'Athletic', male: [6, 13], female: [14, 20], description: 'Optimal for athletic performance' },
  { category: 'Fitness', male: [14, 17], female: [21, 24], description: 'Fit and healthy range' },
  { category: 'Average', male: [18, 24], female: [25, 31], description: 'Acceptable for general population' },
  { category: 'Obese', male: [25, 100], female: [32, 100], description: 'High health risk' },
];

export default function ArmyBodyFatCalculator() {
  const [gender, setGender] = useState<Gender>('male');
  const [system, setSystem] = useState<MeasurementSystem>('imperial');
  const [branch, setBranch] = useState<Branch>('army');
  const [age, setAge] = useState('25');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState<BodyFatResult | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [exportEnabled, setExportEnabled] = useState(false);
  const calculatorRef = useRef<HTMLDivElement>(null);
  
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = result 
    ? `My Army Body Fat: ${result.bodyFatPercentage}% (${result.status.toUpperCase()}) - Check your military body composition!`
    : 'Calculate your military body fat percentage';

  // Convert measurements to inches if needed
  const toInches = (value: number): number => {
    return system === 'metric' ? value / 2.54 : value;
  };

  const calculateBodyFat = () => {
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const hi = gender === 'female' ? parseFloat(hip) : 0;
    const ageNum = parseFloat(age);

    if (!h || !n || !w || (gender === 'female' && !hi)) {
      alert('Please fill in all required fields');
      return;
    }

    // Convert to inches
    const heightInches = toInches(h);
    const neckInches = toInches(n);
    const waistInches = toInches(w);
    const hipInches = gender === 'female' ? toInches(hi) : 0;

    // Calculate body fat percentage using US Army formula
    let bodyFat: number;
    if (gender === 'male') {
      bodyFat = 86.010 * Math.log10(waistInches - neckInches) - 70.041 * Math.log10(heightInches) + 36.76;
    } else {
      bodyFat = 163.205 * Math.log10(waistInches + hipInches - neckInches) - 97.684 * Math.log10(heightInches) - 78.387;
    }

    // Determine max allowed based on age and gender
    let maxAllowed = 26; // Default for male 40+
    const ageStandard = ageStandards.find(std => {
      const [min, max] = std.age.includes('+') ? [40, 100] : std.age.split('-').map(Number);
      return ageNum >= min && (max === 100 || ageNum <= max);
    });

    if (ageStandard) {
      maxAllowed = gender === 'male' ? ageStandard.maleMax : ageStandard.femaleMax;
    }

    // Determine category
    const categories = bodyFatCategories.filter(cat => {
      const [min, max] = gender === 'male' ? cat.male : cat.female;
      return bodyFat >= min && bodyFat <= max;
    });
    const category = categories.length > 0 ? categories[0].category : 'Unknown';

    // Calculate improvement needed
    const toReachGoal = bodyFat > maxAllowed ? bodyFat - maxAllowed : 0;

    // Health risk assessment
    let healthRisk = 'Low Risk';
    if (bodyFat > maxAllowed + 5) {
      healthRisk = 'High Risk';
    } else if (bodyFat > maxAllowed) {
      healthRisk = 'Moderate Risk';
    }

    setResult({
      bodyFatPercentage: Math.round(bodyFat * 10) / 10,
      status: bodyFat <= maxAllowed ? 'pass' : 'fail',
      maxAllowed,
      category,
      toReachGoal: Math.round(toReachGoal * 10) / 10,
      healthRisk,
    });

    setExportEnabled(true);
  };

  const reset = () => {
    setHeight('');
    setNeck('');
    setWaist('');
    setHip('');
    setResult(null);
    setExportEnabled(false);
  };

  const exportAsImage = async () => {
    if (calculatorRef.current) {
      const canvas = await html2canvas(calculatorRef.current);
      const link = document.createElement('a');
      link.download = 'army-body-fat-result.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Data for visualization
  const standardsData = ageStandards.map(std => ({
    age: std.age,
    male: std.maleMax,
    female: std.femaleMax,
  }));

  const categoryData = bodyFatCategories.map(cat => {
    const [min, max] = gender === 'male' ? cat.male : cat.female;
    const avg = max === 100 ? min + 10 : (min + max) / 2;
    return {
      category: cat.category,
      range: avg,
      current: result && cat.category === result.category ? result.bodyFatPercentage : 0,
    };
  });

  return (
    <div ref={calculatorRef} className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Side: Inputs */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                <Calculator className="h-6 w-6 text-blue-600" />
                🎖️ Calculator Inputs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Gender Selection */}
              <div>
                <Label className="text-sm font-semibold mb-2 block text-gray-900">Gender</Label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setGender('male')}
                    className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
                      gender === 'male'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    👨 Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
                      gender === 'female'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    👩 Female
                  </button>
                </div>
              </div>

              {/* Measurement System */}
              <div>
                <Label className="text-sm font-semibold mb-2 block text-gray-900">Measurement System</Label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSystem('imperial')}
                    className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
                      system === 'imperial'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    📏 Imperial
                  </button>
                  <button
                    onClick={() => setSystem('metric')}
                    className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
                      system === 'metric'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    📐 Metric
                  </button>
                </div>
              </div>

              {/* Branch */}
              <div>
                <Label className="text-sm font-semibold mb-2 block text-gray-900">Military Branch</Label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setBranch('army')}
                    className={`py-2 rounded-lg font-medium text-xs transition-all ${
                      branch === 'army'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🪖 Army
                  </button>
                  <button
                    onClick={() => setBranch('navy')}
                    className={`py-2 rounded-lg font-medium text-xs transition-all ${
                      branch === 'navy'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ⚓ Navy
                  </button>
                  <button
                    onClick={() => setBranch('marines')}
                    className={`py-2 rounded-lg font-medium text-xs transition-all ${
                      branch === 'marines'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🦅 Marines
                  </button>
                </div>
              </div>

              {/* Age */}
              <div>
                <Label htmlFor="age" className="text-sm font-medium text-gray-900">
                  Age (years) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="25"
                />
              </div>

              {/* Height */}
              <div>
                <Label htmlFor="height" className="text-sm font-medium text-gray-900">
                  Height ({system === 'metric' ? 'cm' : 'in'}) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="height"
                  type="number"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder={system === 'metric' ? '175' : '69'}
                />
              </div>

              {/* Neck */}
              <div>
                <Label htmlFor="neck" className="text-sm font-medium text-gray-900">
                  Neck ({system === 'metric' ? 'cm' : 'in'}) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="neck"
                  type="number"
                  step="0.1"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder={system === 'metric' ? '38' : '15'}
                />
              </div>

              {/* Waist */}
              <div>
                <Label htmlFor="waist" className="text-sm font-medium text-gray-900">
                  Waist ({system === 'metric' ? 'cm' : 'in'}) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="waist"
                  type="number"
                  step="0.1"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder={system === 'metric' ? '85' : '33.5'}
                />
              </div>

              {/* Hip (Female only) */}
              {gender === 'female' && (
                <div>
                  <Label htmlFor="hip" className="text-sm font-medium text-gray-900">
                    Hip ({system === 'metric' ? 'cm' : 'in'}) <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="hip"
                    type="number"
                    step="0.1"
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder={system === 'metric' ? '100' : '39.5'}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Button
            onClick={calculateBodyFat}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Calculate Body Fat
          </Button>

          <Button
            onClick={reset}
            variant="outline"
            className="w-full border-2"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset
          </Button>

          {/* Export Buttons */}
          {exportEnabled && (
            <div className="flex flex-col gap-2">
              <Button
                onClick={exportAsImage}
                variant="outline"
                className="w-full border-2"
              >
                <Download className="mr-2 h-4 w-4" />
                Save as Image
              </Button>
              <Button onClick={handlePrint} variant="outline" className="w-full border-2">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button
                onClick={() => setIsShareModalOpen(true)}
                variant="outline"
                className="w-full border-2"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          )}
        </div>

        {/* Right Side: Results */}
        <div className="xl:col-span-2">
          {/* Results Section */}
          {result ? (
            <div className="space-y-6">
              {/* Main Result */}
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-6xl font-bold mb-2 text-blue-700">
                      {result.bodyFatPercentage}%
                    </div>
                    <div className="text-2xl font-semibold mb-2 text-gray-900">
                      {result.status === 'pass' ? '✅ PASS' : '❌ FAIL'}
                    </div>
                    <div className="text-xl text-gray-700">
                      Category: {result.category}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">Maximum Allowed</div>
                      <div className="text-2xl font-bold text-blue-700">{result.maxAllowed}%</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">To Reach Goal</div>
                      <div className="text-2xl font-bold text-blue-700">
                        {result.toReachGoal > 0 ? `-${result.toReachGoal}%` : 'On Target'}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">Health Risk</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {result.healthRisk}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Standards Table */}
              <Card>
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    🎖️ Military Body Fat Standards by Age
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-300">
                          <th className="text-left p-3 text-gray-900">Age Range</th>
                          <th className="text-center p-3 text-gray-900">Male Max %</th>
                          <th className="text-center p-3 text-gray-900">Female Max %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ageStandards.map((std, idx) => (
                          <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="p-3 font-medium text-gray-900">{std.age}</td>
                            <td className="text-center p-3 font-semibold text-blue-700">{std.maleMax}%</td>
                            <td className="text-center p-3 font-semibold text-blue-700">{std.femaleMax}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={standardsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" />
                        <YAxis label={{ value: 'Body Fat %', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="male" fill="#3b82f6" name="Male Max %" />
                        <Bar dataKey="female" fill="#60a5fa" name="Female Max %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card>
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    📊 Body Fat Category Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {bodyFatCategories.map((cat, idx) => {
                      const [min, max] = gender === 'male' ? cat.male : cat.female;
                      const isCurrentCategory = cat.category === result.category;
                      return (
                        <div key={idx} className={`p-4 rounded-lg ${isCurrentCategory ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50 border border-gray-200'}`}>
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-semibold text-gray-900">{cat.category}</div>
                            <div className="text-sm text-gray-700">
                              {max === 100 ? `${min}%+` : `${min}-${max}%`}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">{cat.description}</div>
                          {isCurrentCategory && (
                            <div className="flex items-center gap-2 text-blue-700 font-medium">
                              <span>👉</span>
                              <span>Your Current Category: {result.bodyFatPercentage}%</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" angle={-15} textAnchor="end" height={80} />
                        <YAxis label={{ value: 'Body Fat %', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="range" fill="#94a3b8" name="Category Range" />
                        <Bar dataKey="current" fill="#3b82f6" name="Your Level" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Improvement Recommendations */}
              {result.toReachGoal > 0 && (
                <Card className="border-2 border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      🎯 Recommendations to Meet Standards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-semibold mb-2 text-gray-900">Body Fat Reduction Needed</h3>
                        <p className="text-sm text-gray-700">
                          You need to reduce your body fat by approximately <strong>{result.toReachGoal}%</strong> to meet military standards.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <h3 className="font-semibold mb-2 text-gray-900">💪 Training Recommendations</h3>
                        <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
                          <li>Increase cardiovascular exercise (running, swimming, cycling)</li>
                          <li>Incorporate strength training 3-4 times per week</li>
                          <li>High-Intensity Interval Training (HIIT) for fat burning</li>
                          <li>Maintain consistency in your workout routine</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <h3 className="font-semibold mb-2 text-gray-900">🍎 Nutrition Recommendations</h3>
                        <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
                          <li>Create a moderate caloric deficit (300-500 calories/day)</li>
                          <li>Increase protein intake to preserve muscle mass</li>
                          <li>Reduce processed foods and added sugars</li>
                          <li>Stay hydrated (8-10 glasses of water daily)</li>
                          <li>Focus on whole foods: vegetables, lean proteins, complex carbs</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <h3 className="font-semibold mb-2 text-gray-900">📈 Measurement Improvements</h3>
                        <p className="text-sm mb-2 text-gray-700">Estimated circumference changes needed:</p>
                        <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
                          <li>Waist: Reduce by approximately {Math.round(result.toReachGoal * 0.5)} {system === 'metric' ? 'cm' : 'inches'}</li>
                          <li>Neck: Maintain or increase slightly to improve ratio</li>
                          {gender === 'female' && (
                            <li>Hip: Focus on overall body fat reduction</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Health Risk Assessment */}
              <Card>
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    ⚠️ Health Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                      <h3 className="font-semibold mb-2 text-gray-900">Current Risk Level: {result.healthRisk}</h3>
                      {result.healthRisk === 'Low Risk' && (
                        <p className="text-sm text-gray-700">Your body fat percentage is within healthy limits. Continue maintaining a balanced diet and regular exercise.</p>
                      )}
                      {result.healthRisk === 'Moderate Risk' && (
                        <p className="text-sm text-gray-700">Your body fat is slightly elevated. Consider implementing lifestyle changes to reduce health risks associated with excess body fat.</p>
                      )}
                      {result.healthRisk === 'High Risk' && (
                        <p className="text-sm text-gray-700">Your body fat percentage indicates elevated health risks. Consult with a healthcare professional and consider significant lifestyle modifications.</p>
                      )}
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h3 className="font-semibold mb-2 text-gray-900">💡 Important Notes</h3>
                      <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
                        <li>Body fat percentage is just one measure of health</li>
                        <li>Military standards are designed for operational readiness</li>
                        <li>Individual variations in body composition are normal</li>
                        <li>Consult healthcare professionals for personalized advice</li>
                        <li>Regular assessment helps track progress over time</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comparison with BMI */}
              <Card>
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    🔄 Army Body Fat Method vs BMI
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-semibold mb-2 text-gray-900">🎖️ Army Body Fat Method</h3>
                        <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
                          <li>Uses body circumference measurements</li>
                          <li>Estimates actual body fat percentage</li>
                          <li>More accurate for muscular individuals</li>
                          <li>Military standard for fitness assessment</li>
                          <li>Accounts for body composition differences</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <h3 className="font-semibold mb-2 text-gray-900">📊 BMI Method</h3>
                        <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
                          <li>Uses only height and weight</li>
                          <li>Calculates weight-to-height ratio</li>
                          <li>May misclassify athletic individuals</li>
                          <li>Simple but less precise</li>
                          <li>Doesn't distinguish muscle from fat</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-semibold mb-2 text-gray-900">✅ Why Army Method is Better for Military Assessment</h3>
                      <p className="text-sm text-gray-700">
                        The Army body fat calculation provides a more accurate assessment of physical readiness because it accounts for 
                        body composition rather than just weight. This method is especially important for military personnel who often 
                        have higher muscle mass, which could incorrectly classify them as overweight using BMI alone.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Results</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-500 py-12">
                  <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p>Enter your measurements and click Calculate to see your results</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Army Body Fat Calculator"
      />
    </div>
  );
}
