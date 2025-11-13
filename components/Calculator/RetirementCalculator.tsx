'use client';

import React, { useState, useEffect } from 'react';
import { Banknote, TrendingUp, Calendar, AlertCircle, Share2, Save, Printer, Target } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  currentSavings: number;
  monthlyContribution: number;
  employerMatch: number;
  annualReturn: number;
  inflationRate: number;
  desiredMonthlyIncome: number;
  socialSecurityMonthly: number;
  pensionMonthly: number;
}

interface RetirementResult {
  totalSavingsAtRetirement: number;
  monthlyIncomeFromSavings: number;
  totalMonthlyIncome: number;
  shortfall: number;
  yearsOfRetirement: number;
  totalNeeded: number;
  onTrack: boolean;
  savingsGrowth: { age: number; balance: number; contributions: number; earnings: number }[];
  retirementIncome: { year: number; savings: number; income: number; balance: number }[];
  additionalMonthlySavingsNeeded: number;
}

export function RetirementCalculator() {
  const [inputs, setInputs] = useState<RetirementInputs>({
    currentAge: 30,
    retirementAge: 65,
    lifeExpectancy: 85,
    currentSavings: 50000,
    monthlyContribution: 500,
    employerMatch: 50,
    annualReturn: 7,
    inflationRate: 3,
    desiredMonthlyIncome: 5000,
    socialSecurityMonthly: 1800,
    pensionMonthly: 0,
  });

  const [result, setResult] = useState<RetirementResult | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'growth' | 'income'>('summary');

  const calculateRetirement = () => {
    const {
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentSavings,
      monthlyContribution,
      employerMatch,
      annualReturn,
      inflationRate,
      desiredMonthlyIncome,
      socialSecurityMonthly,
      pensionMonthly,
    } = inputs;

    const yearsToRetirement = retirementAge - currentAge;
    const yearsOfRetirement = lifeExpectancy - retirementAge;
    const monthlyRate = annualReturn / 100 / 12;
    const totalMonthlyContribution = monthlyContribution + employerMatch;

    // Calculate savings at retirement (Future Value of current savings + annuity)
    const fvCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, yearsToRetirement * 12);
    const fvContributions = totalMonthlyContribution * 
      ((Math.pow(1 + monthlyRate, yearsToRetirement * 12) - 1) / monthlyRate);
    
    const totalSavingsAtRetirement = fvCurrentSavings + fvContributions;

    // Growth schedule
    const savingsGrowth: RetirementResult['savingsGrowth'] = [];
    let balance = currentSavings;
    let totalContributions = currentSavings;
    
    for (let age = currentAge; age <= retirementAge; age++) {
      const monthsInYear = age === currentAge ? 0 : 12;
      const yearlyContribution = totalMonthlyContribution * monthsInYear;
      totalContributions += yearlyContribution;
      balance = balance * Math.pow(1 + monthlyRate, monthsInYear) + 
                yearlyContribution * ((Math.pow(1 + monthlyRate, monthsInYear) - 1) / monthlyRate);
      
      savingsGrowth.push({
        age,
        balance: Math.round(balance),
        contributions: Math.round(totalContributions),
        earnings: Math.round(balance - totalContributions),
      });
    }

    // Calculate income needed in retirement (adjusted for inflation)
    const inflationMultiplier = Math.pow(1 + inflationRate / 100, yearsToRetirement);
    const adjustedDesiredIncome = desiredMonthlyIncome * inflationMultiplier;

    // Calculate safe withdrawal (4% rule, adjusted monthly)
    const safeWithdrawalRate = 0.04 / 12;
    const monthlyIncomeFromSavings = totalSavingsAtRetirement * safeWithdrawalRate;

    // Total income sources
    const totalMonthlyIncome = monthlyIncomeFromSavings + socialSecurityMonthly + pensionMonthly;
    const shortfall = adjustedDesiredIncome - totalMonthlyIncome;

    // Retirement income schedule
    const retirementIncome: RetirementResult['retirementIncome'] = [];
    let retirementBalance = totalSavingsAtRetirement;
    const retirementWithdrawalRate = 0.04; // Annual
    const retirementReturnRate = 0.05; // Conservative return during retirement
    
    for (let year = 0; year <= yearsOfRetirement; year++) {
      const annualWithdrawal = retirementBalance * retirementWithdrawalRate;
      const annualIncome = annualWithdrawal + (socialSecurityMonthly * 12) + (pensionMonthly * 12);
      retirementBalance = retirementBalance * (1 + retirementReturnRate) - annualWithdrawal;
      
      retirementIncome.push({
        year: retirementAge + year,
        savings: Math.round(retirementBalance),
        income: Math.round(annualIncome),
        balance: Math.round(retirementBalance),
      });
    }

    // Calculate additional savings needed if shortfall exists
    let additionalMonthlySavingsNeeded = 0;
    if (shortfall > 0) {
      const additionalCapitalNeeded = shortfall / safeWithdrawalRate;
      additionalMonthlySavingsNeeded = 
        additionalCapitalNeeded / ((Math.pow(1 + monthlyRate, yearsToRetirement * 12) - 1) / monthlyRate);
    }

    // Total needed for retirement
    const totalNeeded = adjustedDesiredIncome / safeWithdrawalRate;

    setResult({
      totalSavingsAtRetirement,
      monthlyIncomeFromSavings,
      totalMonthlyIncome,
      shortfall,
      yearsOfRetirement,
      totalNeeded,
      onTrack: shortfall <= 0,
      savingsGrowth,
      retirementIncome,
      additionalMonthlySavingsNeeded,
    });
  };

  useEffect(() => {
    if (inputs.retirementAge > inputs.currentAge && inputs.lifeExpectancy > inputs.retirementAge) {
      calculateRetirement();
    }
  }, [inputs]);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/retirement-calculator',
    getShareParams: () => ({
      ca: inputs.currentAge.toString(),
      ra: inputs.retirementAge.toString(),
      le: inputs.lifeExpectancy.toString(),
      cs: inputs.currentSavings.toString(),
      mc: inputs.monthlyContribution.toString(),
      em: inputs.employerMatch.toString(),
      ar: inputs.annualReturn.toString(),
      ir: inputs.inflationRate.toString(),
      di: inputs.desiredMonthlyIncome.toString(),
      ss: inputs.socialSecurityMonthly.toString(),
      pm: inputs.pensionMonthly.toString(),
    }),
    getShareText: () =>
      result
        ? `Retirement Plan: ${result.onTrack ? '✅ On Track!' : '⚠ Needs Adjustment'} | Projected: $${(result.totalSavingsAtRetirement / 1000000).toFixed(1)}M at age ${inputs.retirementAge}`
        : 'Check out my retirement calculation!',
  });

  const handleSaveImage = async () => {
    const element = document.getElementById('retirement-result');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'retirement-calculation.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-5 gap-6">
        {/* Input Section - 3 columns */}
        <div className="md:col-span-3 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Personal Information
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Age
                </label>
                <input
                  type="number"
                  value={inputs.currentAge || ''}
                  onChange={(e) => setInputs({ ...inputs, currentAge: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                  placeholder="30"
                  min="18"
                  max="80"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retirement Age
                </label>
                <input
                  type="number"
                  value={inputs.retirementAge || ''}
                  onChange={(e) => setInputs({ ...inputs, retirementAge: parseInt(e.target.value) || 65 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                  placeholder="65"
                  min="50"
                  max="80"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Life Expectancy
                </label>
                <input
                  type="number"
                  value={inputs.lifeExpectancy || ''}
                  onChange={(e) => setInputs({ ...inputs, lifeExpectancy: parseInt(e.target.value) || 85 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                  placeholder="85"
                  min="60"
                  max="100"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Average US life expectancy: 76 (men), 81 (women). Plan for longer to be safe.
            </p>
          </div>

          {/* Current Savings & Contributions */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Banknote className="w-5 h-5 text-green-600" />
              Current Savings & Contributions
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Retirement Savings ($)
                </label>
                <input
                  type="number"
                  value={inputs.currentSavings || ''}
                  onChange={(e) => setInputs({ ...inputs, currentSavings: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold"
                  placeholder="50000"
                  step="5000"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Total in 401(k), IRA, and other retirement accounts
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Monthly Contribution ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.monthlyContribution || ''}
                    onChange={(e) => setInputs({ ...inputs, monthlyContribution: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold"
                    placeholder="500"
                    step="50"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Aim for 15% of gross income
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employer Match ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.employerMatch || ''}
                    onChange={(e) => setInputs({ ...inputs, employerMatch: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold"
                    placeholder="50"
                    step="25"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Free money - always max out!
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Total Monthly Savings:</span>
                  <span className="font-bold text-blue-600">
                    ${(inputs.monthlyContribution + inputs.employerMatch).toLocaleString()}/month
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-700">Annual Savings:</span>
                  <span className="font-bold text-blue-600">
                    ${((inputs.monthlyContribution + inputs.employerMatch) * 12).toLocaleString()}/year
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Investment & Economic Assumptions */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Investment & Economic Assumptions
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Annual Return (%)
                </label>
                <input
                  type="number"
                  value={inputs.annualReturn || ''}
                  onChange={(e) => setInputs({ ...inputs, annualReturn: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold"
                  placeholder="7"
                  step="0.5"
                  min="0"
                  max="15"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Historical average: 7-10% (stocks), 3-5% (bonds)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inflation Rate (%)
                </label>
                <input
                  type="number"
                  value={inputs.inflationRate || ''}
                  onChange={(e) => setInputs({ ...inputs, inflationRate: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold"
                  placeholder="3"
                  step="0.1"
                  min="0"
                  max="10"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Historical average: 2-3% per year
                </p>
              </div>
            </div>
          </div>

          {/* Retirement Income Needs */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              Retirement Income Needs
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Monthly Income (Today's Dollars) ($)
                </label>
                <input
                  type="number"
                  value={inputs.desiredMonthlyIncome || ''}
                  onChange={(e) => setInputs({ ...inputs, desiredMonthlyIncome: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg font-semibold"
                  placeholder="5000"
                  step="100"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Rule of thumb: 70-80% of pre-retirement income
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Social Security ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.socialSecurityMonthly || ''}
                    onChange={(e) => setInputs({ ...inputs, socialSecurityMonthly: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="1800"
                    step="100"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Average: $1,800/month (check <a href="https://www.ssa.gov" target="_blank" rel="noopener" className="text-blue-600 underline">SSA.gov</a>)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Pension ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.pensionMonthly || ''}
                    onChange={(e) => setInputs({ ...inputs, pensionMonthly: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0"
                    step="100"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter 0 if you don't have a pension
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section - 2 columns */}
        <div className="md:col-span-2 space-y-6">
          {result && (
            <>
              <div id="retirement-result" className={`rounded-xl shadow-lg border p-6 ${
                result.onTrack 
                  ? 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200' 
                  : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'
              }`}>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  {result.onTrack ? (
                    <>
                      <span className="text-2xl">✅</span>
                      <span>On Track!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      <span>Needs Adjustment</span>
                    </>
                  )}
                </h3>

                {/* Savings at Retirement */}
                <div className="bg-white rounded-lg p-6 mb-4 border border-gray-200 text-center">
                  <div className="text-sm text-gray-600 mb-2">Projected Savings at Age {inputs.retirementAge}</div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    ${(result.totalSavingsAtRetirement / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-sm text-gray-500">
                    In {inputs.retirementAge - inputs.currentAge} years
                  </div>
                </div>

                {/* Income Breakdown */}
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-3 font-semibold">
                      Monthly Income in Retirement:
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">From Savings (4% rule):</span>
                        <span className="font-semibold">
                          ${result.monthlyIncomeFromSavings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      {inputs.socialSecurityMonthly > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-700">Social Security:</span>
                          <span className="font-semibold">
                            ${inputs.socialSecurityMonthly.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {inputs.pensionMonthly > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-700">Pension:</span>
                          <span className="font-semibold">
                            ${inputs.pensionMonthly.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between">
                        <span className="text-gray-900 font-bold">Total Monthly Income:</span>
                        <span className="font-bold text-blue-600">
                          ${result.totalMonthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs pt-1">
                        <span className="text-gray-600">Desired Income (inflation-adjusted):</span>
                        <span className="font-semibold">
                          ${(inputs.desiredMonthlyIncome * Math.pow(1 + inputs.inflationRate / 100, inputs.retirementAge - inputs.currentAge)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Gap Analysis */}
                  {result.shortfall > 0 ? (
                    <div className="bg-orange-50 border border-orange-300 rounded-lg p-4">
                      <div className="font-semibold text-orange-900 mb-2 text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Monthly Shortfall:
                      </div>
                      <div className="text-2xl font-bold text-orange-600 mb-3">
                        ${result.shortfall.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-xs text-gray-700 space-y-2">
                        <p><strong>To close the gap, you need to save an additional:</strong></p>
                        <div className="bg-white rounded px-3 py-2 font-bold text-orange-600">
                          ${result.additionalMonthlySavingsNeeded.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/month
                        </div>
                        <p className="pt-2">Alternative strategies:</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Work {Math.ceil(result.shortfall / result.monthlyIncomeFromSavings)} more years</li>
                          <li>Reduce retirement expenses by {((result.shortfall / (inputs.desiredMonthlyIncome * Math.pow(1 + inputs.inflationRate / 100, inputs.retirementAge - inputs.currentAge))) * 100).toFixed(0)}%</li>
                          <li>Increase investment returns</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                      <div className="font-semibold text-green-900 mb-2 text-sm flex items-center gap-2">
                        <span className="text-lg">🎉</span>
                        Monthly Surplus:
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        ${Math.abs(result.shortfall).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </div>
                      <p className="text-xs text-gray-700">
                        Great job! You're on track to exceed your retirement income goal. Consider:
                        retiring early, increasing lifestyle, or leaving a legacy.
                      </p>
                    </div>
                  )}

                  {/* Retirement Duration */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-2">Retirement Duration:</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {result.yearsOfRetirement} years
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      From age {inputs.retirementAge} to {inputs.lifeExpectancy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleShare}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Plan
                  </button>
                  <button
                    onClick={handleSaveImage}
                    className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save as Image
                  </button>
                  <button
                    onClick={handlePrint}
                    className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                </div>
              </div>

              {/* Key Insights */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg border border-blue-200 p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">💡 Key Insights</h3>
                <div className="space-y-2 text-xs text-gray-700">
                  <p>
                    <strong>Time is your advantage:</strong> You have {inputs.retirementAge - inputs.currentAge} years 
                    for compound growth. Starting early is more powerful than saving more later.
                  </p>
                  <p>
                    <strong>Employer match:</strong> Your employer contributes ${inputs.employerMatch}/month 
                    = ${(inputs.employerMatch * 12 * (inputs.retirementAge - inputs.currentAge)).toLocaleString()} 
                    free money over your career!
                  </p>
                  <p>
                    <strong>4% rule:</strong> Historically, withdrawing 4% annually from a balanced portfolio 
                    lasts 30+ years in retirement.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Charts */}
      {result && (
        <div className="mt-6 space-y-6">
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 flex gap-2">
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'summary'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab('growth')}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'growth'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Savings Growth
            </button>
            <button
              onClick={() => setActiveTab('income')}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'income'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Retirement Income
            </button>
          </div>

          {/* Growth Chart */}
          {activeTab === 'growth' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Savings Growth to Retirement</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={result.savingsGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" label={{ value: 'Age', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Balance ($)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} name="Total Balance" />
                  <Line type="monotone" dataKey="contributions" stroke="#10b981" strokeWidth={2} name="Total Contributions" />
                  <Line type="monotone" dataKey="earnings" stroke="#f59e0b" strokeWidth={2} name="Investment Earnings" />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-600 mt-4 text-center">
                Shows how your retirement savings grow over time from contributions and investment returns
              </p>
            </div>
          )}

          {/* Income Chart */}
          {activeTab === 'income' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Retirement Income & Balance</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={result.retirementIncome.filter((_, i) => i % 2 === 0)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: 'Age', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="income" fill="#10b981" name="Annual Income" />
                  <Bar dataKey="balance" fill="#3b82f6" name="Remaining Balance" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-600 mt-4 text-center">
                Shows your annual retirement income and how your savings balance changes during retirement
              </p>
            </div>
          )}

          {/* Summary Table */}
          {activeTab === 'summary' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Retirement Plan Summary</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Savings Phase (Now - Age {inputs.retirementAge})</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Years to retirement:</span>
                      <span className="font-semibold">{inputs.retirementAge - inputs.currentAge} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current savings:</span>
                      <span className="font-semibold">${inputs.currentSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly contribution:</span>
                      <span className="font-semibold">${(inputs.monthlyContribution + inputs.employerMatch).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total contributions:</span>
                      <span className="font-semibold">
                        ${((inputs.monthlyContribution + inputs.employerMatch) * 12 * (inputs.retirementAge - inputs.currentAge)).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-900 font-bold">Projected at {inputs.retirementAge}:</span>
                      <span className="font-bold text-blue-600">
                        ${(result.totalSavingsAtRetirement / 1000000).toFixed(2)}M
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Retirement Phase (Age {inputs.retirementAge} - {inputs.lifeExpectancy})</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Retirement duration:</span>
                      <span className="font-semibold">{result.yearsOfRetirement} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">From savings:</span>
                      <span className="font-semibold">
                        ${result.monthlyIncomeFromSavings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">From Social Security:</span>
                      <span className="font-semibold">${inputs.socialSecurityMonthly.toLocaleString()}/mo</span>
                    </div>
                    {inputs.pensionMonthly > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">From pension:</span>
                        <span className="font-semibold">${inputs.pensionMonthly.toLocaleString()}/mo</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-900 font-bold">Total income:</span>
                      <span className="font-bold text-green-600">
                        ${result.totalMonthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Retirement Calculator"
      />
    </div>
  );
}

