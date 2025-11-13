'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calculator, TrendingUp, DollarSign, Share2, BarChart3, Save, Trash2, Copy, X } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface CompoundInterestInputs {
  principal: number;
  annualRate: number;
  years: number;
  compoundingFrequency: 'annually' | 'semi-annually' | 'quarterly' | 'monthly' | 'weekly' | 'daily';
  additionalContribution: number;
  contributionFrequency: 'monthly' | 'quarterly' | 'annually';
  contributionTiming: 'beginning' | 'end';
}

interface SavedScenario {
  id: string;
  name: string;
  inputs: CompoundInterestInputs;
  result: CompoundInterestResult;
  createdAt: Date;
}

interface CompoundInterestResult {
  finalAmount: number;
  totalInterest: number;
  totalContributions: number;
  yearlyBreakdown: Array<{
    year: number;
    startingAmount: number;
    interestEarned: number;
    contributions: number;
    endingAmount: number;
  }>;
  effectiveAnnualRate: number;
}

const compoundingFrequencies = [
  { value: 'annually', label: 'Annually (1x/year)', periods: 1 },
  { value: 'semi-annually', label: 'Semi-Annually (2x/year)', periods: 2 },
  { value: 'quarterly', label: 'Quarterly (4x/year)', periods: 4 },
  { value: 'monthly', label: 'Monthly (12x/year)', periods: 12 },
  { value: 'weekly', label: 'Weekly (52x/year)', periods: 52 },
  { value: 'daily', label: 'Daily (365x/year)', periods: 365 }
];

const contributionFrequencies = [
  { value: 'monthly', label: 'Monthly', periods: 12 },
  { value: 'quarterly', label: 'Quarterly', periods: 4 },
  { value: 'annually', label: 'Annually', periods: 1 }
];

const investmentPresets = [
  {
    name: 'Conservative Savings',
    inputs: { principal: 10000, annualRate: 3, years: 10, compoundingFrequency: 'monthly' as const, additionalContribution: 200, contributionFrequency: 'monthly' as const, contributionTiming: 'end' as const }
  },
  {
    name: 'Balanced Investment',
    inputs: { principal: 25000, annualRate: 7, years: 15, compoundingFrequency: 'monthly' as const, additionalContribution: 500, contributionFrequency: 'monthly' as const, contributionTiming: 'end' as const }
  },
  {
    name: 'Aggressive Growth',
    inputs: { principal: 50000, annualRate: 10, years: 20, compoundingFrequency: 'monthly' as const, additionalContribution: 1000, contributionFrequency: 'monthly' as const, contributionTiming: 'end' as const }
  },
  {
    name: 'Retirement Planning',
    inputs: { principal: 100000, annualRate: 8, years: 30, compoundingFrequency: 'monthly' as const, additionalContribution: 1500, contributionFrequency: 'monthly' as const, contributionTiming: 'end' as const }
  }
];

function calculateCompoundInterest(inputs: CompoundInterestInputs): CompoundInterestResult | null {
  const { principal, annualRate, years, compoundingFrequency, additionalContribution, contributionFrequency, contributionTiming } = inputs;
  
  if (principal < 0 || annualRate < 0 || years <= 0) return null;
  
  const rate = annualRate / 100;
  const compoundingPeriodsPerYear = compoundingFrequencies.find(f => f.value === compoundingFrequency)?.periods || 12;
  const contributionPeriodsPerYear = contributionFrequencies.find(f => f.value === contributionFrequency)?.periods || 12;
  
  let balance = principal;
  const yearlyBreakdown: Array<{
    year: number;
    startingAmount: number;
    interestEarned: number;
    contributions: number;
    endingAmount: number;
  }> = [];

  for (let year = 1; year <= years; year++) {
    const startingAmount = balance;
    let yearInterest = 0;
    let yearContributions = 0;

    // Calculate contributions for this year
    const contributionsThisYear = additionalContribution * contributionPeriodsPerYear;
    yearContributions = contributionsThisYear;

    // Add contributions at beginning of year if specified
    if (contributionTiming === 'beginning') {
      balance += contributionsThisYear;
    }

    // Calculate compound interest for the year
    const periodsThisYear = compoundingPeriodsPerYear;
    const ratePerPeriod = rate / compoundingPeriodsPerYear;
    
    for (let period = 1; period <= periodsThisYear; period++) {
      const periodInterest = balance * ratePerPeriod;
      balance += periodInterest;
      yearInterest += periodInterest;
      
      // Add proportional contributions during the year if end timing
      if (contributionTiming === 'end') {
        const contributionThisPeriod = contributionsThisYear / periodsThisYear;
        balance += contributionThisPeriod;
      }
    }

    // Add contributions at end of year if specified and not already added
    if (contributionTiming === 'end' && compoundingPeriodsPerYear === 1) {
      balance += contributionsThisYear;
    }

    yearlyBreakdown.push({
      year,
      startingAmount,
      interestEarned: yearInterest,
      contributions: yearContributions,
      endingAmount: balance
    });
  }

  const totalContributions = additionalContribution * contributionPeriodsPerYear * years;
  const totalInterest = balance - principal - totalContributions;
  const effectiveAnnualRate = Math.pow(balance / principal, 1 / years) - 1;

  return {
    finalAmount: balance,
    totalInterest,
    totalContributions,
    yearlyBreakdown,
    effectiveAnnualRate: effectiveAnnualRate * 100
  };
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

function formatPercentage(num: number): string {
  return `${num.toFixed(2)}%`;
}

export default function CompoundInterestCalculator() {
  const [inputs, setInputs] = useState<CompoundInterestInputs>({
    principal: 10000,
    annualRate: 7,
    years: 10,
    compoundingFrequency: 'monthly',
    additionalContribution: 500,
    contributionFrequency: 'monthly',
    contributionTiming: 'end'
  });

  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [scenarioName, setScenarioName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => {
    return calculateCompoundInterest(inputs);
  }, [inputs]);

  // Calculate simple interest for comparison
  const simpleInterestAmount = useMemo(() => {
    if (!result) return 0;
    const simpleInterest = inputs.principal * (inputs.annualRate / 100) * inputs.years;
    return inputs.principal + simpleInterest + result.totalContributions;
  }, [inputs, result]);

  const compoundAdvantage = result ? result.finalAmount - simpleInterestAmount : 0;

  const updateInput = (field: keyof CompoundInterestInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const saveScenario = () => {
    if (!result || !scenarioName.trim()) return;
    
    const newScenario: SavedScenario = {
      id: Date.now().toString(),
      name: scenarioName.trim(),
      inputs: { ...inputs },
      result: { ...result },
      createdAt: new Date()
    };
    
    setSavedScenarios(prev => [...prev, newScenario]);
    setScenarioName('');
    setShowSaveModal(false);
  };

  const deleteScenario = (id: string) => {
    setSavedScenarios(prev => prev.filter(s => s.id !== id));
  };

  const loadScenario = (scenario: SavedScenario) => {
    setInputs(scenario.inputs);
  };

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/compound-interest-calculator',
    getShareParams: () => ({
      principal: inputs.principal.toString(),
      rate: inputs.annualRate.toString(),
      years: inputs.years.toString(),
      frequency: inputs.compoundingFrequency,
      contribution: inputs.additionalContribution.toString(),
      contributionFreq: inputs.contributionFrequency,
      timing: inputs.contributionTiming
    }),
    getShareText: () => {
      if (!result) return 'Check out this compound interest calculation!';
      return `${formatCurrency(inputs.principal)} grows to ${formatCurrency(result.finalAmount)} over ${inputs.years} years with compound interest!`;
    },
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Input Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Compound Interest Calculator
          </h3>

          <div className="space-y-6">
            {/* Investment Details */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">💰 Investment Details</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Initial Principal Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={inputs.principal}
                      onChange={(e) => updateInput('principal', Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="100"
                      placeholder="10000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Interest Rate (%)</label>
                  <input
                    type="number"
                    value={inputs.annualRate}
                    onChange={(e) => updateInput('annualRate', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="7.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                  <input
                    type="number"
                    value={inputs.years}
                    onChange={(e) => updateInput('years', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="50"
                    step="1"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Compounding Frequency</label>
                  <select
                    value={inputs.compoundingFrequency}
                    onChange={(e) => updateInput('compoundingFrequency', e.target.value as any)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {compoundingFrequencies.map((freq) => (
                      <option key={freq.value} value={freq.value}>
                        {freq.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Contributions */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">📅 Additional Contributions</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Regular Contribution Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={inputs.additionalContribution}
                      onChange={(e) => updateInput('additionalContribution', Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="50"
                      placeholder="500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contribution Frequency</label>
                  <select
                    value={inputs.contributionFrequency}
                    onChange={(e) => updateInput('contributionFrequency', e.target.value as any)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {contributionFrequencies.map((freq) => (
                      <option key={freq.value} value={freq.value}>
                        {freq.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contribution Timing</label>
                  <select
                    value={inputs.contributionTiming}
                    onChange={(e) => updateInput('contributionTiming', e.target.value as any)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="end">End of Period</option>
                    <option value="beginning">Beginning of Period</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">🎯 Quick Presets</h4>
              <div className="grid grid-cols-2 gap-2">
                {investmentPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setInputs(preset.inputs)}
                    className="p-3 text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-medium text-gray-900">{preset.name}</div>
                    <div className="text-xs text-gray-600">
                      {formatCurrency(preset.inputs.principal)} @ {preset.inputs.annualRate}%
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Save Scenario */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">💾 Save This Scenario</h4>
              <button
                onClick={() => setShowSaveModal(true)}
                disabled={!result}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Save className="w-4 h-4" />
                Save Current Scenario
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setInputs({
                  principal: 10000,
                  annualRate: 7,
                  years: 10,
                  compoundingFrequency: 'monthly',
                  additionalContribution: 500,
                  contributionFrequency: 'monthly',
                  contributionTiming: 'end'
                })}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Reset to Default
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Share2 className="w-4 h-4" />
                Share Results
              </button>
              {savedScenarios.length > 0 && (
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  <BarChart3 className="w-4 h-4" />
                  {showComparison ? 'Hide' : 'Compare'} Scenarios ({savedScenarios.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Results Section */}
        <div className="space-y-6">
          {result && (
            <div ref={resultRef} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-600" />
                Investment Results
              </h4>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700 font-medium mb-1">Final Amount</div>
                  <div className="text-2xl font-bold text-green-900">{formatCurrency(result.finalAmount)}</div>
                  <div className="text-xs text-green-600">After {inputs.years} years</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">Total Interest</div>
                  <div className="text-2xl font-bold text-blue-900">{formatCurrency(result.totalInterest)}</div>
                  <div className="text-xs text-blue-600">Interest earned</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-700 font-medium mb-1">Total Invested</div>
                  <div className="text-2xl font-bold text-purple-900">{formatCurrency(inputs.principal + result.totalContributions)}</div>
                  <div className="text-xs text-purple-600">Your contributions</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                  <div className="text-sm text-orange-700 font-medium mb-1">Compound Advantage</div>
                  <div className="text-2xl font-bold text-orange-900">{formatCurrency(compoundAdvantage)}</div>
                  <div className="text-xs text-orange-600">vs Simple Interest</div>
                </div>
              </div>

              {/* Growth Visualization */}
              <div className="mb-6">
                <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Investment Growth
                </h5>
                <div className="space-y-2">
                  {result.yearlyBreakdown.slice(0, Math.min(10, result.yearlyBreakdown.length)).map((year) => {
                    const percentage = (year.endingAmount / result.finalAmount) * 100;
                    
                    return (
                      <div key={year.year} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700">Year {year.year}</span>
                          <span className="text-green-600 font-medium">{formatCurrency(year.endingAmount)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {result.yearlyBreakdown.length > 10 && (
                    <div className="text-center text-sm text-gray-500 mt-4">
                      Showing first 10 years. Total period: {inputs.years} years
                    </div>
                  )}
                </div>
              </div>

              {/* Yearly Breakdown Table */}
              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-4">📊 Year-by-Year Breakdown</h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b">Year</th>
                        <th className="px-3 py-2 text-right font-semibold text-gray-900 border-b">Starting</th>
                        <th className="px-3 py-2 text-right font-semibold text-gray-900 border-b">Interest</th>
                        <th className="px-3 py-2 text-right font-semibold text-gray-900 border-b">Contributions</th>
                        <th className="px-3 py-2 text-right font-semibold text-gray-900 border-b">Ending</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyBreakdown.slice(0, 5).map((year) => (
                        <tr key={year.year} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium text-gray-900">{year.year}</td>
                          <td className="px-3 py-2 text-right text-gray-700">{formatCurrency(year.startingAmount)}</td>
                          <td className="px-3 py-2 text-right text-green-600 font-medium">{formatCurrency(year.interestEarned)}</td>
                          <td className="px-3 py-2 text-right text-blue-600 font-medium">{formatCurrency(year.contributions)}</td>
                          <td className="px-3 py-2 text-right text-gray-900 font-bold">{formatCurrency(year.endingAmount)}</td>
                        </tr>
                      ))}
                      {result.yearlyBreakdown.length > 5 && (
                        <tr>
                          <td colSpan={5} className="px-3 py-2 text-center text-gray-500 italic">
                            ... and {result.yearlyBreakdown.length - 5} more years
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Comparison View */}
      {showComparison && savedScenarios.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">📊 Compare Investment Scenarios</h3>
            <button
              onClick={() => setShowComparison(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Close comparison"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Scenario Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Initial Investment</th>
                  <th className="px-4 py-3 text-left font-semibold">Monthly Contribution</th>
                  <th className="px-4 py-3 text-left font-semibold">Final Amount</th>
                  <th className="px-4 py-3 text-left font-semibold">Total Interest</th>
                  <th className="px-4 py-3 text-left font-semibold">ROI</th>
                  <th className="px-4 py-3 text-left font-semibold">Effective Rate</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {savedScenarios.map((scenario) => {
                  const totalInvested = scenario.inputs.principal + scenario.result.totalContributions;
                  const roi = ((scenario.result.finalAmount / totalInvested) - 1) * 100;
                  
                  return (
                    <tr key={scenario.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{scenario.name}</td>
                      <td className="px-4 py-3">{formatCurrency(scenario.inputs.principal)}</td>
                      <td className="px-4 py-3">{formatCurrency(scenario.inputs.additionalContribution)}</td>
                      <td className="px-4 py-3 text-green-600 font-bold">
                        {formatCurrency(scenario.result.finalAmount)}
                      </td>
                      <td className="px-4 py-3 text-blue-600 font-bold">
                        {formatCurrency(scenario.result.totalInterest)}
                      </td>
                      <td className="px-4 py-3 font-bold">
                        {formatPercentage(roi)}
                      </td>
                      <td className="px-4 py-3">
                        {formatPercentage(scenario.result.effectiveAnnualRate)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => loadScenario(scenario)}
                            className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => deleteScenario(scenario.id)}
                            className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Save Scenario Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Save Investment Scenario</h3>
              <button
                onClick={() => setShowSaveModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scenario Name</label>
                <input
                  type="text"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  placeholder="e.g., Conservative Growth, Aggressive Savings"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              {result && (
                <div className="bg-green-50 p-4 rounded-lg text-sm">
                  <div className="font-semibold text-green-900 mb-2">This scenario will achieve:</div>
                  <div className="text-green-800 space-y-1">
                    <div>• Final Amount: <span className="font-bold">{formatCurrency(result.finalAmount)}</span></div>
                    <div>• Total Interest: <span className="font-bold">{formatCurrency(result.totalInterest)}</span></div>
                    <div>• Effective Rate: <span className="font-bold">{formatPercentage(result.effectiveAnnualRate)}</span></div>
                    <div>• Investment Period: <span className="font-bold">{inputs.years} years</span></div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={saveScenario}
                  disabled={!scenarioName.trim()}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Scenario
                </button>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ShareModal 
        isOpen={showShareModal} 
        onClose={closeShareModal} 
        shareUrl={shareUrl} 
        shareText={shareText} 
        calculatorName="Compound Interest Calculator" 
      />
    </div>
  );
}
