'use client';

import React, { useState, useEffect } from 'react';
import { PiggyBank, TrendingUp, DollarSign, Target, Share2, Save, Printer, Percent } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface FourZeroOneKInputs {
  accountType: 'traditional' | 'roth';
  currentAge: number;
  retirementAge: number;
  currentBalance: number;
  annualContribution: number;
  employerMatch: number;
  employerMatchLimit: number;
  annualReturn: number;
  currentTaxRate: number;
  retirementTaxRate: number;
  annualSalary: number;
}

interface FourZeroOneKResult {
  traditional: {
    futureValue: number;
    totalContributions: number;
    employerContributions: number;
    investmentGains: number;
    afterTaxValue: number;
  };
  roth: {
    futureValue: number;
    totalContributions: number;
    employerContributions: number;
    investmentGains: number;
    afterTaxValue: number;
  };
  comparison: {
    winner: 'traditional' | 'roth' | 'tie';
    difference: number;
    percentageDifference: number;
    taxSavings: number;
  };
  growthData: { year: number; traditional: number; roth: number; contributions: number }[];
  contributionLimits: {
    annual2024: number;
    catchUp50Plus: number;
    maxEmployee: number;
    maxEmployer: number;
  };
}

export function FourZeroOneKCalculator() {
  const [inputs, setInputs] = useState<FourZeroOneKInputs>({
    accountType: 'traditional',
    currentAge: 30,
    retirementAge: 65,
    currentBalance: 10000,
    annualContribution: 10000,
    employerMatch: 50,
    employerMatchLimit: 6,
    annualReturn: 7,
    currentTaxRate: 22,
    retirementTaxRate: 15,
    annualSalary: 75000,
  });

  const [result, setResult] = useState<FourZeroOneKResult | null>(null);
  const [activeTab, setActiveTab] = useState<'comparison' | 'growth' | 'breakdown'>('comparison');

  const calculateFourZeroOneK = () => {
    const {
      currentAge,
      retirementAge,
      currentBalance,
      annualContribution,
      employerMatch,
      employerMatchLimit,
      annualReturn,
      currentTaxRate,
      retirementTaxRate,
      annualSalary,
    } = inputs;

    const years = retirementAge - currentAge;
    const monthlyReturn = annualReturn / 100 / 12;
    const months = years * 12;

    // Calculate employer match
    const matchableContribution = Math.min(annualContribution, annualSalary * (employerMatchLimit / 100));
    const employerContribution = matchableContribution * (employerMatch / 100);
    const totalAnnualContribution = annualContribution + employerContribution;

    // Traditional 401k Calculation (Pre-tax contributions)
    let traditionalBalance = currentBalance;
    let traditionalContributions = 0;
    let traditionalEmployerContributions = 0;

    for (let year = 0; year < years; year++) {
      const monthlyContribution = annualContribution / 12;
      const monthlyEmployerContribution = employerContribution / 12;
      
      for (let month = 0; month < 12; month++) {
        traditionalBalance += monthlyContribution + monthlyEmployerContribution;
        traditionalBalance *= (1 + monthlyReturn);
        traditionalContributions += monthlyContribution;
        traditionalEmployerContributions += monthlyEmployerContribution;
      }
    }

    const traditionalGains = traditionalBalance - traditionalContributions - traditionalEmployerContributions - currentBalance;
    const traditionalAfterTax = traditionalBalance * (1 - retirementTaxRate / 100);

    // Roth 401k Calculation (After-tax contributions)
    const rothAnnualContribution = annualContribution * (1 - currentTaxRate / 100);
    const rothMonthlyContribution = rothAnnualContribution / 12;
    
    let rothBalance = currentBalance;
    let rothContributions = 0;
    let rothEmployerContributions = 0;

    for (let year = 0; year < years; year++) {
      const monthlyEmployerContribution = employerContribution / 12;
      
      for (let month = 0; month < 12; month++) {
        rothBalance += rothMonthlyContribution + monthlyEmployerContribution;
        rothBalance *= (1 + monthlyReturn);
        rothContributions += rothMonthlyContribution;
        rothEmployerContributions += monthlyEmployerContribution;
      }
    }

    const rothGains = rothBalance - rothContributions - rothEmployerContributions - currentBalance;
    // Roth: Contributions already taxed, employer match taxed at withdrawal
    const rothEmployerAfterTax = rothEmployerContributions * (1 - retirementTaxRate / 100);
    const rothAfterTax = rothBalance - rothEmployerContributions + rothEmployerAfterTax;

    // Growth data
    const growthData: FourZeroOneKResult['growthData'] = [];
    let tBalance = currentBalance;
    let rBalance = currentBalance;
    let totalContrib = 0;

    for (let year = 0; year <= years; year++) {
      growthData.push({
        year: currentAge + year,
        traditional: Math.round(tBalance),
        roth: Math.round(rBalance),
        contributions: Math.round(totalContrib),
      });

      if (year < years) {
        // Grow balances for next year
        for (let month = 0; month < 12; month++) {
          tBalance += (annualContribution / 12) + (employerContribution / 12);
          tBalance *= (1 + monthlyReturn);
          
          rBalance += rothMonthlyContribution + (employerContribution / 12);
          rBalance *= (1 + monthlyReturn);
          
          totalContrib += (annualContribution / 12);
        }
      }
    }

    // Comparison
    const difference = traditionalAfterTax - rothAfterTax;
    const percentageDifference = (Math.abs(difference) / rothAfterTax) * 100;
    const taxSavings = (annualContribution * currentTaxRate / 100) * years;

    // Contribution limits for 2024
    const contributionLimits = {
      annual2024: 23000,
      catchUp50Plus: 7500,
      maxEmployee: currentAge >= 50 ? 30500 : 23000,
      maxEmployer: 69000,
    };

    setResult({
      traditional: {
        futureValue: traditionalBalance,
        totalContributions: traditionalContributions,
        employerContributions: traditionalEmployerContributions,
        investmentGains: traditionalGains,
        afterTaxValue: traditionalAfterTax,
      },
      roth: {
        futureValue: rothBalance,
        totalContributions: rothContributions,
        employerContributions: rothEmployerContributions,
        investmentGains: rothGains,
        afterTaxValue: rothAfterTax,
      },
      comparison: {
        winner: difference > 5000 ? 'traditional' : difference < -5000 ? 'roth' : 'tie',
        difference: Math.abs(difference),
        percentageDifference,
        taxSavings,
      },
      growthData,
      contributionLimits,
    });
  };

  useEffect(() => {
    calculateFourZeroOneK();
  }, [inputs]);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/401k-calculator',
    getShareParams: () => ({
      at: inputs.accountType,
      ca: inputs.currentAge.toString(),
      ra: inputs.retirementAge.toString(),
      cb: inputs.currentBalance.toString(),
      ac: inputs.annualContribution.toString(),
      em: inputs.employerMatch.toString(),
      eml: inputs.employerMatchLimit.toString(),
      ar: inputs.annualReturn.toString(),
      ctr: inputs.currentTaxRate.toString(),
      rtr: inputs.retirementTaxRate.toString(),
    }),
    getShareText: () =>
      result
        ? `401k Analysis: Traditional = $${(result.traditional.afterTaxValue / 1000).toFixed(0)}K vs Roth = $${(result.roth.afterTaxValue / 1000).toFixed(0)}K (after-tax at retirement)`
        : 'Check out my 401k retirement analysis!',
  });

  const handleSaveImage = async () => {
    const element = document.getElementById('401k-result');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = '401k-analysis.png';
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
          {/* Account Type Selection */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-blue-600" />
              401k Account Type
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button
                onClick={() => setInputs({ ...inputs, accountType: 'traditional' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  inputs.accountType === 'traditional'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-bold text-gray-900 mb-1">Traditional 401k</div>
                <div className="text-xs text-gray-600">
                  Tax deduction now, pay tax later
                </div>
              </button>
              <button
                onClick={() => setInputs({ ...inputs, accountType: 'roth' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  inputs.accountType === 'roth'
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-bold text-gray-900 mb-1">Roth 401k</div>
                <div className="text-xs text-gray-600">
                  Pay tax now, tax-free withdrawals
                </div>
              </button>
            </div>
            <p className="text-xs text-gray-600">
              <strong>Key Difference:</strong> Traditional = pre-tax contributions (reduce taxable income now). Roth = after-tax contributions (tax-free growth).
            </p>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Timeline & Balance
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Age
                </label>
                <input
                  type="number"
                  value={inputs.currentAge || ''}
                  onChange={(e) => setInputs({ ...inputs, currentAge: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="30"
                  min="18"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retirement Age
                </label>
                <input
                  type="number"
                  value={inputs.retirementAge || ''}
                  onChange={(e) => setInputs({ ...inputs, retirementAge: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="65"
                  min="50"
                  max="80"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current 401k Balance ($)
                </label>
                <input
                  type="number"
                  value={inputs.currentBalance || ''}
                  onChange={(e) => setInputs({ ...inputs, currentBalance: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold"
                  placeholder="10000"
                  step="1000"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Contributions */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Contributions
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Salary ($)
                </label>
                <input
                  type="number"
                  value={inputs.annualSalary || ''}
                  onChange={(e) => setInputs({ ...inputs, annualSalary: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="75000"
                  step="1000"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Annual Contribution ($)
                </label>
                <input
                  type="number"
                  value={inputs.annualContribution || ''}
                  onChange={(e) => setInputs({ ...inputs, annualContribution: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold"
                  placeholder="10000"
                  step="500"
                  min="0"
                  max="23000"
                />
                <p className="text-xs text-gray-500 mt-2">
                  2024 limit: $23,000 (under 50) | $30,500 (50+)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employer Match (%)
                  </label>
                  <input
                    type="number"
                    value={inputs.employerMatch || ''}
                    onChange={(e) => setInputs({ ...inputs, employerMatch: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="50"
                    step="5"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Match Up To (% of salary)
                  </label>
                  <input
                    type="number"
                    value={inputs.employerMatchLimit || ''}
                    onChange={(e) => setInputs({ ...inputs, employerMatchLimit: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="6"
                    step="1"
                    min="0"
                    max="15"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded p-3">
                <strong>Example:</strong> 50% match up to 6% of salary = If you contribute 6% ($4,500), employer adds 3% ($2,250)
              </p>
            </div>
          </div>

          {/* Returns & Taxes */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Percent className="w-5 h-5 text-orange-600" />
              Returns & Tax Rates
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Annual Return (%)
                </label>
                <input
                  type="number"
                  value={inputs.annualReturn || ''}
                  onChange={(e) => setInputs({ ...inputs, annualReturn: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="7"
                  step="0.5"
                  min="0"
                  max="20"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Historical average: 7-10% for diversified portfolios
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    value={inputs.currentTaxRate || ''}
                    onChange={(e) => setInputs({ ...inputs, currentTaxRate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="22"
                    step="1"
                    min="0"
                    max="37"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Your marginal rate now
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Retirement Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    value={inputs.retirementTaxRate || ''}
                    onChange={(e) => setInputs({ ...inputs, retirementTaxRate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="15"
                    step="1"
                    min="0"
                    max="37"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Expected rate at withdrawal
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-xs text-gray-700">
                <strong>Tax Rate Guidance:</strong> 10%, 12%, 22%, 24%, 32%, 35%, 37% are current federal brackets. Most retirees are in 12-22% range.
              </div>
            </div>
          </div>
        </div>

        {/* Results Section - 2 columns */}
        <div className="md:col-span-2 space-y-6">
          {result && (
            <>
              <div id="401k-result" className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg border border-blue-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Retirement Analysis
                </h3>

                {/* Traditional 401k */}
                <div className="bg-white rounded-lg p-5 mb-4 border-2 border-blue-300">
                  <div className="text-xs text-gray-600 mb-2 font-semibold">Traditional 401k</div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${result.traditional.futureValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <strong>After-tax:</strong> ${result.traditional.afterTaxValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Your contributions:</span>
                      <span className="font-semibold">${result.traditional.totalContributions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Employer match:</span>
                      <span className="font-semibold text-green-600">${result.traditional.employerContributions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment gains:</span>
                      <span className="font-semibold text-purple-600">${result.traditional.investmentGains.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Roth 401k */}
                <div className="bg-white rounded-lg p-5 mb-4 border-2 border-green-300">
                  <div className="text-xs text-gray-600 mb-2 font-semibold">Roth 401k</div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ${result.roth.futureValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <strong>After-tax:</strong> ${result.roth.afterTaxValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Your contributions:</span>
                      <span className="font-semibold">${result.roth.totalContributions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Employer match:</span>
                      <span className="font-semibold text-green-600">${result.roth.employerContributions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment gains:</span>
                      <span className="font-semibold text-purple-600">${result.roth.investmentGains.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Winner */}
                {result.comparison.winner !== 'tie' && (
                  <div className={`rounded-lg p-4 border-2 ${
                    result.comparison.winner === 'traditional'
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-green-50 border-green-300'
                  }`}>
                    <div className="text-sm font-bold text-gray-900 mb-2">
                      🏆 {result.comparison.winner === 'traditional' ? 'Traditional' : 'Roth'} Wins
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      ${result.comparison.difference.toLocaleString()} more
                    </div>
                    <p className="text-xs text-gray-700">
                      {result.comparison.percentageDifference.toFixed(1)}% higher after-tax value at retirement
                    </p>
                  </div>
                )}

                {result.comparison.winner === 'tie' && (
                  <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                    <div className="text-sm font-bold text-gray-900">
                      🤝 Nearly Identical Results
                    </div>
                    <p className="text-xs text-gray-700 mt-2">
                      Both options produce similar after-tax outcomes. Choose based on your tax situation preference.
                    </p>
                  </div>
                )}

                {/* Contribution Limits */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 mt-4">
                  <div className="text-xs font-bold text-gray-900 mb-2">2024 Contribution Limits</div>
                  <div className="space-y-1 text-xs text-gray-700">
                    <div className="flex justify-between">
                      <span>Employee max (under 50):</span>
                      <span className="font-semibold">${result.contributionLimits.annual2024.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Catch-up (50+):</span>
                      <span className="font-semibold">+${result.contributionLimits.catchUp50Plus.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-1">
                      <span>Total max (50+):</span>
                      <span className="font-bold">${result.contributionLimits.maxEmployee.toLocaleString()}</span>
                    </div>
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
                    Share Results
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
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg border border-yellow-200 p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">💡 Key Insights</h3>
                <div className="space-y-2 text-xs text-gray-700">
                  <p>
                    <strong>Tax now vs later:</strong> Traditional defers ${(inputs.annualContribution * inputs.currentTaxRate / 100).toFixed(0)} in taxes annually.
                  </p>
                  <p>
                    <strong>Lifetime tax savings:</strong> Traditional saves ${result.comparison.taxSavings.toLocaleString()} in upfront taxes over {inputs.retirementAge - inputs.currentAge} years.
                  </p>
                  <p>
                    <strong>Employer match:</strong> Free money! Worth ${result.traditional.employerContributions.toLocaleString()} over career.
                  </p>
                  <p>
                    <strong>Best choice:</strong> {
                      inputs.currentTaxRate > inputs.retirementTaxRate 
                        ? 'Traditional may be better (higher tax rate now)'
                        : inputs.currentTaxRate < inputs.retirementTaxRate
                        ? 'Roth may be better (lower tax rate now)'
                        : 'Similar tax rates = similar outcomes'
                    }
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
              onClick={() => setActiveTab('comparison')}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'comparison'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Comparison
            </button>
            <button
              onClick={() => setActiveTab('growth')}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'growth'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Growth Chart
            </button>
            <button
              onClick={() => setActiveTab('breakdown')}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'breakdown'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Breakdown
            </button>
          </div>

          {/* Growth Chart */}
          {activeTab === 'growth' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">401k Growth Over Time</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={result.growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: 'Age', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Balance ($)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="traditional" stroke="#3b82f6" strokeWidth={3} name="Traditional 401k" />
                  <Line type="monotone" dataKey="roth" stroke="#10b981" strokeWidth={3} name="Roth 401k" />
                  <Line type="monotone" dataKey="contributions" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" name="Total Contributions" />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-600 mt-4 text-center">
                Shows pre-tax account values. After-tax values differ based on withdrawal tax rates.
              </p>
            </div>
          )}

          {/* Comparison */}
          {activeTab === 'comparison' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Side-by-Side Comparison</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3">Traditional 401k</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pre-tax balance:</span>
                      <span className="font-bold">${result.traditional.futureValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. taxes ({inputs.retirementTaxRate}%):</span>
                      <span className="font-semibold text-red-600">
                        -${(result.traditional.futureValue - result.traditional.afterTaxValue).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-bold">After-tax value:</span>
                      <span className="font-bold text-blue-600">
                        ${result.traditional.afterTaxValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-600 mb-3">Roth 401k</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account balance:</span>
                      <span className="font-bold">${result.roth.futureValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. taxes on match:</span>
                      <span className="font-semibold text-red-600">
                        -${(result.roth.futureValue - result.roth.afterTaxValue).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-bold">After-tax value:</span>
                      <span className="font-bold text-green-600">
                        ${result.roth.afterTaxValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Breakdown */}
          {activeTab === 'breakdown' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contribution Breakdown</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={[
                  {
                    name: 'Traditional',
                    Contributions: result.traditional.totalContributions,
                    'Employer Match': result.traditional.employerContributions,
                    Gains: result.traditional.investmentGains,
                  },
                  {
                    name: 'Roth',
                    Contributions: result.roth.totalContributions,
                    'Employer Match': result.roth.employerContributions,
                    Gains: result.roth.investmentGains,
                  },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="Contributions" fill="#3b82f6" />
                  <Bar dataKey="Employer Match" fill="#10b981" />
                  <Bar dataKey="Gains" fill="#a855f7" />
                </BarChart>
              </ResponsiveContainer>
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
        calculatorName="401k Calculator"
      />
    </div>
  );
}

