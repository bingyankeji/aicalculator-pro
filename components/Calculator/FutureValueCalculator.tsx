'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calculator, TrendingUp, DollarSign, Share2, BarChart3, Target, Save, Trash2, Copy, X } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type CalculationMode = 'lump-sum' | 'annuity' | 'mixed';

interface FutureValueInputs {
  mode: CalculationMode;
  presentValue: number;
  annualRate: number;
  years: number;
  periodicPayment: number;
  paymentFrequency: 'monthly' | 'quarterly' | 'annually';
  paymentTiming: 'beginning' | 'end';
  inflationRate: number;
  includeInflation: boolean;
}

interface SavedScenario {
  id: string;
  name: string;
  inputs: FutureValueInputs;
  result: FutureValueResult;
  createdAt: Date;
}

interface FutureValueResult {
  futureValue: number;
  totalInterest: number;
  totalPayments: number;
  realValue: number; // Inflation-adjusted
  purchasingPower: number;
  yearlyBreakdown: Array<{
    year: number;
    startingBalance: number;
    interest: number;
    payments: number;
    endingBalance: number;
    realValue: number;
  }>;
  summary: {
    totalInvested: number;
    nominalGrowth: number;
    realGrowth: number;
    averageAnnualReturn: number;
    inflationImpact: number;
  };
}

const calculationModes = [
  {
    value: 'lump-sum',
    label: 'Lump Sum Investment',
    description: 'Single one-time investment',
    icon: '💰',
    formula: 'FV = PV × (1 + r)^n'
  },
  {
    value: 'annuity',
    label: 'Regular Payments Only',
    description: 'Periodic payments without initial investment',
    icon: '📅',
    formula: 'FV = PMT × [((1 + r)^n - 1) / r]'
  },
  {
    value: 'mixed',
    label: 'Mixed Investment',
    description: 'Initial investment + regular payments',
    icon: '🔄',
    formula: 'FV = PV × (1 + r)^n + PMT × [((1 + r)^n - 1) / r]'
  }
];

const paymentFrequencies = [
  { value: 'monthly', label: 'Monthly', periods: 12 },
  { value: 'quarterly', label: 'Quarterly', periods: 4 },
  { value: 'annually', label: 'Annually', periods: 1 }
];

const investmentPresets = [
  {
    name: 'Retirement Planning',
    inputs: { 
      mode: 'mixed' as const, 
      presentValue: 50000, 
      annualRate: 7, 
      years: 30, 
      periodicPayment: 1000, 
      paymentFrequency: 'monthly' as const, 
      paymentTiming: 'end' as const, 
      inflationRate: 3, 
      includeInflation: true 
    }
  },
  {
    name: 'Education Fund',
    inputs: { 
      mode: 'mixed' as const, 
      presentValue: 10000, 
      annualRate: 6, 
      years: 15, 
      periodicPayment: 300, 
      paymentFrequency: 'monthly' as const, 
      paymentTiming: 'end' as const, 
      inflationRate: 3, 
      includeInflation: true 
    }
  },
  {
    name: 'Emergency Fund',
    inputs: { 
      mode: 'mixed' as const, 
      presentValue: 5000, 
      annualRate: 4, 
      years: 5, 
      periodicPayment: 500, 
      paymentFrequency: 'monthly' as const, 
      paymentTiming: 'end' as const, 
      inflationRate: 2.5, 
      includeInflation: true 
    }
  },
  {
    name: 'House Down Payment',
    inputs: { 
      mode: 'mixed' as const, 
      presentValue: 25000, 
      annualRate: 5, 
      years: 10, 
      periodicPayment: 800, 
      paymentFrequency: 'monthly' as const, 
      paymentTiming: 'end' as const, 
      inflationRate: 3, 
      includeInflation: true 
    }
  }
];

function calculateFutureValue(inputs: FutureValueInputs): FutureValueResult | null {
  const { mode, presentValue, annualRate, years, periodicPayment, paymentFrequency, paymentTiming, inflationRate, includeInflation } = inputs;
  
  if (annualRate < 0 || years <= 0) return null;
  
  const rate = annualRate / 100;
  const inflation = inflationRate / 100;
  const periodsPerYear = paymentFrequencies.find(f => f.value === paymentFrequency)?.periods || 12;
  const totalPeriods = years * periodsPerYear;
  const ratePerPeriod = rate / periodsPerYear;
  
  let balance = mode === 'annuity' ? 0 : presentValue;
  const yearlyBreakdown: Array<{
    year: number;
    startingBalance: number;
    interest: number;
    payments: number;
    endingBalance: number;
    realValue: number;
  }> = [];

  // Calculate year by year
  for (let year = 1; year <= years; year++) {
    const startingBalance = balance;
    let yearInterest = 0;
    let yearPayments = 0;

    // Calculate for each period in the year
    for (let period = 1; period <= periodsPerYear; period++) {
      // Add payment at beginning of period if specified
      if (paymentTiming === 'beginning' && (mode === 'annuity' || mode === 'mixed')) {
        balance += periodicPayment;
        yearPayments += periodicPayment;
      }

      // Calculate interest for this period
      const periodInterest = balance * ratePerPeriod;
      balance += periodInterest;
      yearInterest += periodInterest;

      // Add payment at end of period if specified
      if (paymentTiming === 'end' && (mode === 'annuity' || mode === 'mixed')) {
        balance += periodicPayment;
        yearPayments += periodicPayment;
      }
    }

    // Calculate real value (inflation-adjusted)
    const realValue = includeInflation ? balance / Math.pow(1 + inflation, year) : balance;

    yearlyBreakdown.push({
      year,
      startingBalance,
      interest: yearInterest,
      payments: yearPayments,
      endingBalance: balance,
      realValue
    });
  }

  const futureValue = balance;
  const totalPayments = (mode === 'annuity' || mode === 'mixed') ? periodicPayment * totalPeriods : 0;
  const totalInvested = (mode === 'lump-sum' ? presentValue : 0) + totalPayments;
  const totalInterest = futureValue - totalInvested;
  const realValue = includeInflation ? futureValue / Math.pow(1 + inflation, years) : futureValue;
  const purchasingPower = (realValue / totalInvested) * 100;

  // Calculate summary statistics
  const nominalGrowth = ((futureValue / totalInvested) - 1) * 100;
  const realGrowth = ((realValue / totalInvested) - 1) * 100;
  const averageAnnualReturn = (Math.pow(futureValue / totalInvested, 1 / years) - 1) * 100;
  const inflationImpact = futureValue - realValue;

  return {
    futureValue,
    totalInterest,
    totalPayments,
    realValue,
    purchasingPower,
    yearlyBreakdown,
    summary: {
      totalInvested,
      nominalGrowth,
      realGrowth,
      averageAnnualReturn,
      inflationImpact
    }
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

export default function FutureValueCalculator() {
  const [inputs, setInputs] = useState<FutureValueInputs>({
    mode: 'mixed',
    presentValue: 10000,
    annualRate: 7,
    years: 10,
    periodicPayment: 500,
    paymentFrequency: 'monthly',
    paymentTiming: 'end',
    inflationRate: 3,
    includeInflation: true
  });

  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [scenarioName, setScenarioName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => {
    return calculateFutureValue(inputs);
  }, [inputs]);

  const updateInput = (field: keyof FutureValueInputs, value: string | number | boolean) => {
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
    calculatorPath: '/future-value-calculator',
    getShareParams: () => ({
      mode: inputs.mode,
      pv: inputs.presentValue.toString(),
      rate: inputs.annualRate.toString(),
      years: inputs.years.toString(),
      payment: inputs.periodicPayment.toString(),
      frequency: inputs.paymentFrequency,
      timing: inputs.paymentTiming,
      inflation: inputs.inflationRate.toString(),
      includeInflation: inputs.includeInflation.toString()
    }),
    getShareText: () => {
      if (!result) return 'Check out this future value calculation!';
      return `Future Value: ${formatCurrency(inputs.presentValue)} grows to ${formatCurrency(result.futureValue)} over ${inputs.years} years`;
    },
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Input Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Future Value Calculator
          </h3>

          <div className="space-y-6">
            {/* Calculation Mode Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Investment Type</label>
              <div className="grid grid-cols-1 gap-3">
                {calculationModes.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateInput('mode', option.value as CalculationMode)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      inputs.mode === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{option.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{option.label}</div>
                        <div className="text-xs opacity-75 mb-2">{option.description}</div>
                        <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{option.formula}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Investment Parameters */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">💰 Investment Parameters</h4>
              
              {(inputs.mode === 'lump-sum' || inputs.mode === 'mixed') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Present Value (Initial Investment)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={inputs.presentValue}
                      onChange={(e) => updateInput('presentValue', Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="100"
                      placeholder="10000"
                    />
                  </div>
                </div>
              )}

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
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Period (Years)</label>
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
            </div>

            {/* Payment Parameters */}
            {(inputs.mode === 'annuity' || inputs.mode === 'mixed') && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">📅 Payment Parameters</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Periodic Payment Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={inputs.periodicPayment}
                      onChange={(e) => updateInput('periodicPayment', Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="50"
                      placeholder="500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Frequency</label>
                  <select
                    value={inputs.paymentFrequency}
                    onChange={(e) => updateInput('paymentFrequency', e.target.value as 'monthly' | 'quarterly' | 'annually')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {paymentFrequencies.map((freq) => (
                      <option key={freq.value} value={freq.value}>
                        {freq.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Timing</label>
                  <select
                    value={inputs.paymentTiming}
                    onChange={(e) => updateInput('paymentTiming', e.target.value as 'beginning' | 'end')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="end">End of Period</option>
                    <option value="beginning">Beginning of Period</option>
                  </select>
                </div>
              </div>
            )}

            {/* Inflation Adjustment */}
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">📊 Inflation Adjustment</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Inflation Rate (%)</label>
                  <input
                    type="number"
                    value={inputs.inflationRate}
                    onChange={(e) => updateInput('inflationRate', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    min="0"
                    max="20"
                    step="0.1"
                    placeholder="3.0"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inputs.includeInflation}
                      onChange={(e) => updateInput('includeInflation', e.target.checked)}
                      className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Include inflation adjustment</span>
                  </label>
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
                      {formatCurrency(preset.inputs.presentValue)} @ {preset.inputs.annualRate}%
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
                  mode: 'mixed',
                  presentValue: 10000,
                  annualRate: 7,
                  years: 10,
                  periodicPayment: 500,
                  paymentFrequency: 'monthly',
                  paymentTiming: 'end',
                  inflationRate: 3,
                  includeInflation: true
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
                <Calculator className="w-5 h-5 text-blue-600" />
                Future Value Results
              </h4>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">Future Value</div>
                  <div className="text-2xl font-bold text-blue-900">{formatCurrency(result.futureValue)}</div>
                  <div className="text-xs text-blue-600">Nominal value after {inputs.years} years</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700 font-medium mb-1">Total Interest</div>
                  <div className="text-2xl font-bold text-green-900">{formatCurrency(result.totalInterest)}</div>
                  <div className="text-xs text-green-600">Earnings from growth</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-700 font-medium mb-1">Total Invested</div>
                  <div className="text-2xl font-bold text-purple-900">{formatCurrency(result.summary.totalInvested)}</div>
                  <div className="text-xs text-purple-600">Your total contributions</div>
                </div>
                
                {inputs.includeInflation && (
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                    <div className="text-sm text-orange-700 font-medium mb-1">Real Value</div>
                    <div className="text-2xl font-bold text-orange-900">{formatCurrency(result.realValue)}</div>
                    <div className="text-xs text-orange-600">Inflation-adjusted value</div>
                  </div>
                )}
              </div>

              {/* Performance Metrics */}
              <div className="mb-6">
                <h5 className="text-lg font-bold text-gray-900 mb-4">📈 Performance Analysis</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-700 font-medium mb-1">Nominal Growth</div>
                    <div className="text-xl font-bold text-gray-900">{formatPercentage(result.summary.nominalGrowth)}</div>
                    <div className="text-xs text-gray-600">Total return without inflation</div>
                  </div>
                  
                  {inputs.includeInflation && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-sm text-gray-700 font-medium mb-1">Real Growth</div>
                      <div className="text-xl font-bold text-gray-900">{formatPercentage(result.summary.realGrowth)}</div>
                      <div className="text-xs text-gray-600">Inflation-adjusted return</div>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-700 font-medium mb-1">Avg Annual Return</div>
                    <div className="text-xl font-bold text-gray-900">{formatPercentage(result.summary.averageAnnualReturn)}</div>
                    <div className="text-xs text-gray-600">Compound annual growth rate</div>
                  </div>

                  {inputs.includeInflation && (
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <div className="text-sm text-red-700 font-medium mb-1">Inflation Impact</div>
                      <div className="text-xl font-bold text-red-900">{formatCurrency(result.summary.inflationImpact)}</div>
                      <div className="text-xs text-red-600">Value lost to inflation</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Growth Visualization */}
              <div className="mb-6">
                <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Investment Growth Over Time
                </h5>
                <div className="space-y-2">
                  {result.yearlyBreakdown.slice(0, Math.min(10, result.yearlyBreakdown.length)).map((year) => {
                    const maxAmount = result.futureValue;
                    const percentage = (year.endingBalance / maxAmount) * 100;
                    const realPercentage = inputs.includeInflation ? (year.realValue / maxAmount) * 100 : percentage;
                    
                    return (
                      <div key={year.year} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700">Year {year.year}</span>
                          <div className="flex gap-4">
                            <span className="text-blue-600">Nominal: {formatCurrency(year.endingBalance)}</span>
                            {inputs.includeInflation && (
                              <span className="text-orange-600">Real: {formatCurrency(year.realValue)}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          {inputs.includeInflation && (
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${realPercentage}%` }}
                              />
                            </div>
                          )}
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
                        <th className="px-3 py-2 text-right font-semibold text-gray-900 border-b">Payments</th>
                        <th className="px-3 py-2 text-right font-semibold text-gray-900 border-b">Ending</th>
                        {inputs.includeInflation && (
                          <th className="px-3 py-2 text-right font-semibold text-gray-900 border-b">Real Value</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyBreakdown.slice(0, 5).map((year) => (
                        <tr key={year.year} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium text-gray-900">{year.year}</td>
                          <td className="px-3 py-2 text-right text-gray-700">{formatCurrency(year.startingBalance)}</td>
                          <td className="px-3 py-2 text-right text-green-600 font-medium">{formatCurrency(year.interest)}</td>
                          <td className="px-3 py-2 text-right text-blue-600 font-medium">{formatCurrency(year.payments)}</td>
                          <td className="px-3 py-2 text-right text-gray-900 font-bold">{formatCurrency(year.endingBalance)}</td>
                          {inputs.includeInflation && (
                            <td className="px-3 py-2 text-right text-orange-600 font-medium">{formatCurrency(year.realValue)}</td>
                          )}
                        </tr>
                      ))}
                      {result.yearlyBreakdown.length > 5 && (
                        <tr>
                          <td colSpan={inputs.includeInflation ? 6 : 5} className="px-3 py-2 text-center text-gray-500 italic">
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
            <h3 className="text-2xl font-bold text-gray-900">📊 Compare Future Value Scenarios</h3>
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
                  <th className="px-4 py-3 text-left font-semibold">Investment Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Initial Amount</th>
                  <th className="px-4 py-3 text-left font-semibold">Periodic Payment</th>
                  <th className="px-4 py-3 text-left font-semibold">Future Value</th>
                  <th className="px-4 py-3 text-left font-semibold">Real Value</th>
                  <th className="px-4 py-3 text-left font-semibold">ROI</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {savedScenarios.map((scenario) => {
                  const roi = ((scenario.result.futureValue / scenario.result.summary.totalInvested) - 1) * 100;
                  
                  return (
                    <tr key={scenario.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{scenario.name}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {scenario.inputs.mode === 'lump-sum' ? 'Lump Sum' : 
                           scenario.inputs.mode === 'annuity' ? 'Annuity' : 'Mixed'}
                        </span>
                      </td>
                      <td className="px-4 py-3">{formatCurrency(scenario.inputs.presentValue)}</td>
                      <td className="px-4 py-3">{formatCurrency(scenario.inputs.periodicPayment)}</td>
                      <td className="px-4 py-3 text-green-600 font-bold">
                        {formatCurrency(scenario.result.futureValue)}
                      </td>
                      <td className="px-4 py-3 text-orange-600 font-bold">
                        {formatCurrency(scenario.result.realValue)}
                      </td>
                      <td className="px-4 py-3 font-bold">
                        {formatPercentage(roi)}
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
              <h3 className="text-xl font-bold text-gray-900">Save Future Value Scenario</h3>
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
                  placeholder="e.g., Retirement Plan, Education Fund"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              {result && (
                <div className="bg-blue-50 p-4 rounded-lg text-sm">
                  <div className="font-semibold text-blue-900 mb-2">This scenario will achieve:</div>
                  <div className="text-blue-800 space-y-1">
                    <div>• Future Value: <span className="font-bold">{formatCurrency(result.futureValue)}</span></div>
                    {inputs.includeInflation && (
                      <div>• Real Value: <span className="font-bold">{formatCurrency(result.realValue)}</span></div>
                    )}
                    <div>• Total Interest: <span className="font-bold">{formatCurrency(result.totalInterest)}</span></div>
                    <div>• Investment Period: <span className="font-bold">{inputs.years} years</span></div>
                    <div>• Investment Type: <span className="font-bold">
                      {inputs.mode === 'lump-sum' ? 'Lump Sum' : 
                       inputs.mode === 'annuity' ? 'Regular Payments' : 'Mixed Investment'}
                    </span></div>
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
        calculatorName="Future Value Calculator" 
      />
    </div>
  );
}
