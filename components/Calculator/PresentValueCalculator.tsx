'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calculator, TrendingDown, DollarSign, Share2, BarChart3, Target, Save, Trash2, Copy, X } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type CalculationMode = 'single-pv' | 'cash-flows' | 'annuity-pv';

interface PresentValueInputs {
  mode: CalculationMode;
  futureValue: number;
  discountRate: number;
  periods: number;
  // For cash flows
  cashFlows: number[];
  // For annuity
  paymentAmount: number;
  paymentTiming: 'beginning' | 'end';
  // For NPV analysis
  initialInvestment: number;
  includeNPV: boolean;
}

interface SavedScenario {
  id: string;
  name: string;
  inputs: PresentValueInputs;
  result: PresentValueResult;
  createdAt: Date;
}

interface PresentValueResult {
  presentValue: number;
  totalDiscountedValue: number;
  netPresentValue: number;
  profitabilityIndex: number;
  discountFactor: number;
  yearlyBreakdown: Array<{
    year: number;
    cashFlow: number;
    discountFactor: number;
    presentValue: number;
    cumulativePV: number;
  }>;
  investmentDecision: {
    recommendation: 'accept' | 'reject' | 'neutral';
    reasoning: string;
    riskLevel: 'low' | 'medium' | 'high';
  };
}

const calculationModes = [
  {
    value: 'single-pv',
    label: 'Single Present Value',
    description: 'Calculate PV of a single future amount',
    icon: '💰',
    formula: 'PV = FV / (1 + r)^n'
  },
  {
    value: 'cash-flows',
    label: 'Cash Flow Analysis',
    description: 'NPV of multiple cash flows',
    icon: '📊',
    formula: 'NPV = Σ [CFt / (1 + r)^t] - Initial Investment'
  },
  {
    value: 'annuity-pv',
    label: 'Annuity Present Value',
    description: 'PV of regular payment series',
    icon: '📅',
    formula: 'PV = PMT × [(1 - (1 + r)^-n) / r]'
  }
];

const investmentPresets = [
  {
    name: 'Bond Valuation',
    inputs: { 
      mode: 'single-pv' as const, 
      futureValue: 1000, 
      discountRate: 5, 
      periods: 10, 
      cashFlows: [], 
      paymentAmount: 0, 
      paymentTiming: 'end' as const, 
      initialInvestment: 0, 
      includeNPV: false 
    }
  },
  {
    name: 'Project Investment',
    inputs: { 
      mode: 'cash-flows' as const, 
      futureValue: 0, 
      discountRate: 8, 
      periods: 5, 
      cashFlows: [20000, 25000, 30000, 35000, 40000], 
      paymentAmount: 0, 
      paymentTiming: 'end' as const, 
      initialInvestment: 100000, 
      includeNPV: true 
    }
  },
  {
    name: 'Pension Valuation',
    inputs: { 
      mode: 'annuity-pv' as const, 
      futureValue: 0, 
      discountRate: 6, 
      periods: 20, 
      cashFlows: [], 
      paymentAmount: 5000, 
      paymentTiming: 'end' as const, 
      initialInvestment: 0, 
      includeNPV: false 
    }
  },
  {
    name: 'Real Estate Deal',
    inputs: { 
      mode: 'cash-flows' as const, 
      futureValue: 0, 
      discountRate: 10, 
      periods: 7, 
      cashFlows: [15000, 18000, 20000, 22000, 25000, 28000, 200000], 
      paymentAmount: 0, 
      paymentTiming: 'end' as const, 
      initialInvestment: 250000, 
      includeNPV: true 
    }
  }
];

function calculatePresentValue(inputs: PresentValueInputs): PresentValueResult | null {
  const { mode, futureValue, discountRate, periods, cashFlows, paymentAmount, paymentTiming, initialInvestment, includeNPV } = inputs;
  
  if (discountRate < 0 || periods <= 0) return null;
  
  const rate = discountRate / 100;
  let presentValue = 0;
  let totalDiscountedValue = 0;
  const yearlyBreakdown: Array<{
    year: number;
    cashFlow: number;
    discountFactor: number;
    presentValue: number;
    cumulativePV: number;
  }> = [];

  if (mode === 'single-pv') {
    // Single present value calculation
    const discountFactor = 1 / Math.pow(1 + rate, periods);
    presentValue = futureValue * discountFactor;
    totalDiscountedValue = presentValue;
    
    yearlyBreakdown.push({
      year: periods,
      cashFlow: futureValue,
      discountFactor,
      presentValue,
      cumulativePV: presentValue
    });
  } else if (mode === 'annuity-pv') {
    // Annuity present value calculation
    if (rate === 0) {
      presentValue = paymentAmount * periods;
    } else {
      const annuityFactor = (1 - Math.pow(1 + rate, -periods)) / rate;
      presentValue = paymentAmount * annuityFactor;
      
      if (paymentTiming === 'beginning') {
        presentValue *= (1 + rate);
      }
    }
    
    totalDiscountedValue = presentValue;
    
    // Create yearly breakdown for annuity
    let cumulativePV = 0;
    for (let year = 1; year <= periods; year++) {
      const discountFactor = 1 / Math.pow(1 + rate, paymentTiming === 'beginning' ? year - 1 : year);
      const yearPV = paymentAmount * discountFactor;
      cumulativePV += yearPV;
      
      yearlyBreakdown.push({
        year,
        cashFlow: paymentAmount,
        discountFactor,
        presentValue: yearPV,
        cumulativePV
      });
    }
  } else if (mode === 'cash-flows') {
    // Multiple cash flows NPV calculation
    let cumulativePV = 0;
    
    for (let year = 1; year <= Math.min(periods, cashFlows.length); year++) {
      const cashFlow = cashFlows[year - 1] || 0;
      const discountFactor = 1 / Math.pow(1 + rate, year);
      const yearPV = cashFlow * discountFactor;
      cumulativePV += yearPV;
      
      yearlyBreakdown.push({
        year,
        cashFlow,
        discountFactor,
        presentValue: yearPV,
        cumulativePV
      });
    }
    
    presentValue = cumulativePV;
    totalDiscountedValue = cumulativePV;
  }

  // NPV and investment analysis
  const netPresentValue = includeNPV ? totalDiscountedValue - initialInvestment : 0;
  const profitabilityIndex = includeNPV && initialInvestment > 0 ? totalDiscountedValue / initialInvestment : 0;
  
  // Investment decision logic
  let recommendation: 'accept' | 'reject' | 'neutral' = 'neutral';
  let reasoning = '';
  let riskLevel: 'low' | 'medium' | 'high' = 'medium';
  
  if (includeNPV) {
    if (netPresentValue > 0) {
      recommendation = 'accept';
      reasoning = `Positive NPV of ${formatCurrency(netPresentValue)} indicates value creation. `;
    } else if (netPresentValue < 0) {
      recommendation = 'reject';
      reasoning = `Negative NPV of ${formatCurrency(netPresentValue)} indicates value destruction. `;
    } else {
      recommendation = 'neutral';
      reasoning = 'NPV is zero, indicating break-even. ';
    }
    
    if (profitabilityIndex > 1.2) {
      reasoning += 'High profitability index suggests strong returns.';
      riskLevel = 'low';
    } else if (profitabilityIndex > 1.0) {
      reasoning += 'Moderate profitability index suggests acceptable returns.';
      riskLevel = 'medium';
    } else {
      reasoning += 'Low profitability index suggests poor returns.';
      riskLevel = 'high';
    }
  }

  return {
    presentValue,
    totalDiscountedValue,
    netPresentValue,
    profitabilityIndex,
    discountFactor: yearlyBreakdown[0]?.discountFactor || 0,
    yearlyBreakdown,
    investmentDecision: {
      recommendation,
      reasoning,
      riskLevel
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

export default function PresentValueCalculator() {
  const [inputs, setInputs] = useState<PresentValueInputs>({
    mode: 'single-pv',
    futureValue: 10000,
    discountRate: 8,
    periods: 5,
    cashFlows: [],
    paymentAmount: 1000,
    paymentTiming: 'end',
    initialInvestment: 0,
    includeNPV: false
  });

  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [scenarioName, setScenarioName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => {
    return calculatePresentValue(inputs);
  }, [inputs]);

  const updateInput = (field: keyof PresentValueInputs, value: string | number | boolean | number[]) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const updateCashFlow = (index: number, value: number) => {
    const newCashFlows = [...inputs.cashFlows];
    newCashFlows[index] = value;
    updateInput('cashFlows', newCashFlows);
  };

  const addCashFlow = () => {
    updateInput('cashFlows', [...inputs.cashFlows, 0]);
    updateInput('periods', inputs.cashFlows.length + 1);
  };

  const removeCashFlow = (index: number) => {
    const newCashFlows = inputs.cashFlows.filter((_, i) => i !== index);
    updateInput('cashFlows', newCashFlows);
    updateInput('periods', newCashFlows.length);
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
    calculatorPath: '/present-value-calculator',
    getShareParams: () => ({
      mode: inputs.mode,
      fv: inputs.futureValue.toString(),
      rate: inputs.discountRate.toString(),
      periods: inputs.periods.toString(),
      payment: inputs.paymentAmount.toString(),
      timing: inputs.paymentTiming,
      investment: inputs.initialInvestment.toString(),
      npv: inputs.includeNPV.toString()
    }),
    getShareText: () => {
      if (!result) return 'Check out this present value calculation!';
      return `Present Value Analysis: ${formatCurrency(result.presentValue)} ${inputs.includeNPV ? `(NPV: ${formatCurrency(result.netPresentValue)})` : ''}`;
    },
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid xl:grid-cols-2 gap-8">
        {/* Left Side - Input Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Present Value Calculator
          </h3>

          <div className="space-y-6">
            {/* Calculation Mode Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Analysis Type</label>
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

            {/* Basic Parameters */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">📊 Analysis Parameters</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Rate (%)</label>
                <input
                  type="number"
                  value={inputs.discountRate}
                  onChange={(e) => updateInput('discountRate', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="8.0"
                />
              </div>

              {inputs.mode === 'single-pv' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Future Value</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={inputs.futureValue}
                        onChange={(e) => updateInput('futureValue', Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        step="100"
                        placeholder="10000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Periods (Years)</label>
                    <input
                      type="number"
                      value={inputs.periods}
                      onChange={(e) => updateInput('periods', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                      max="50"
                      step="1"
                      placeholder="5"
                    />
                  </div>
                </>
              )}

              {inputs.mode === 'annuity-pv' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Amount</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={inputs.paymentAmount}
                        onChange={(e) => updateInput('paymentAmount', Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        step="50"
                        placeholder="1000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Payments</label>
                    <input
                      type="number"
                      value={inputs.periods}
                      onChange={(e) => updateInput('periods', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                      max="50"
                      step="1"
                      placeholder="10"
                    />
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
                </>
              )}

              {inputs.mode === 'cash-flows' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">Cash Flows by Year</label>
                    <button
                      onClick={addCashFlow}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Add Year
                    </button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {inputs.cashFlows.map((cashFlow, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600 w-16">Year {index + 1}:</span>
                        <div className="relative flex-1">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={cashFlow}
                            onChange={(e) => updateCashFlow(index, Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0"
                          />
                        </div>
                        <button
                          onClick={() => removeCashFlow(index)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {inputs.cashFlows.length === 0 && (
                      <div className="text-center text-gray-500 py-4">
                        Click "Add Year" to start adding cash flows
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* NPV Analysis Toggle */}
            {(inputs.mode === 'cash-flows' || inputs.mode === 'annuity-pv') && (
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">💼 Investment Analysis</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inputs.includeNPV}
                        onChange={(e) => updateInput('includeNPV', e.target.checked)}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Include NPV Analysis</span>
                    </label>
                  </div>
                  
                  {inputs.includeNPV && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Initial Investment</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          value={inputs.initialInvestment}
                          onChange={(e) => updateInput('initialInvestment', Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          min="0"
                          step="1000"
                          placeholder="50000"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Presets */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">🎯 Quick Presets</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {investmentPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setInputs(preset.inputs)}
                    className="p-3 text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-medium text-gray-900">{preset.name}</div>
                    <div className="text-xs text-gray-600">
                      {preset.inputs.mode === 'single-pv' ? `${formatCurrency(preset.inputs.futureValue)}` :
                       preset.inputs.mode === 'annuity-pv' ? `${formatCurrency(preset.inputs.paymentAmount)}/period` :
                       'Cash Flow Analysis'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Save Scenario */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">💾 Save This Analysis</h4>
              <button
                onClick={() => setShowSaveModal(true)}
                disabled={!result}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Save className="w-4 h-4" />
                Save Current Analysis
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setInputs({
                  mode: 'single-pv',
                  futureValue: 10000,
                  discountRate: 8,
                  periods: 5,
                  cashFlows: [],
                  paymentAmount: 1000,
                  paymentTiming: 'end',
                  initialInvestment: 0,
                  includeNPV: false
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
                  {showComparison ? 'Hide' : 'Compare'} Analyses ({savedScenarios.length})
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
                Present Value Analysis
              </h4>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">Present Value</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 break-all">{formatCurrency(result.presentValue)}</div>
                  <div className="text-xs text-blue-600">Discounted value today</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700 font-medium mb-1">Discount Rate</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-900 break-all">{formatPercentage(inputs.discountRate)}</div>
                  <div className="text-xs text-green-600">Required rate of return</div>
                </div>
                
                {inputs.includeNPV && (
                  <>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                      <div className="text-sm text-purple-700 font-medium mb-1">Net Present Value</div>
                      <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${result.netPresentValue >= 0 ? 'text-green-900' : 'text-red-900'} break-all`}>
                        {formatCurrency(result.netPresentValue)}
                      </div>
                      <div className="text-xs text-purple-600">NPV after initial investment</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                      <div className="text-sm text-orange-700 font-medium mb-1">Profitability Index</div>
                      <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${result.profitabilityIndex >= 1 ? 'text-green-900' : 'text-red-900'} break-all`}>
                        {result.profitabilityIndex.toFixed(2)}
                      </div>
                      <div className="text-xs text-orange-600">Return per dollar invested</div>
                    </div>
                  </>
                )}
              </div>

              {/* Investment Decision */}
              {inputs.includeNPV && (
                <div className="mb-6">
                  <h5 className="text-lg font-bold text-gray-900 mb-4">💼 Investment Decision</h5>
                  <div className={`p-4 rounded-lg border-2 ${
                    result.investmentDecision.recommendation === 'accept' ? 'bg-green-50 border-green-300' :
                    result.investmentDecision.recommendation === 'reject' ? 'bg-red-50 border-red-300' :
                    'bg-yellow-50 border-yellow-300'
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        result.investmentDecision.recommendation === 'accept' ? 'bg-green-600 text-white' :
                        result.investmentDecision.recommendation === 'reject' ? 'bg-red-600 text-white' :
                        'bg-yellow-600 text-white'
                      }`}>
                        {result.investmentDecision.recommendation.toUpperCase()}
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        result.investmentDecision.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                        result.investmentDecision.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {result.investmentDecision.riskLevel.toUpperCase()} RISK
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{result.investmentDecision.reasoning}</p>
                  </div>
                </div>
              )}

              {/* Cash Flow Breakdown */}
              {result.yearlyBreakdown.length > 0 && (
                <div className="mb-6">
                  <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Cash Flow Analysis
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b">Year</th>
                          <th className="px-3 py-2 text-right font-semibold text-gray-900 border-b">Cash Flow</th>
                          <th className="px-3 py-2 text-right font-semibold text-gray-900 border-b">Discount Factor</th>
                          <th className="px-3 py-2 text-right font-semibold text-gray-900 border-b">Present Value</th>
                          <th className="px-3 py-2 text-right font-semibold text-gray-900 border-b">Cumulative PV</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.yearlyBreakdown.slice(0, 10).map((year) => (
                          <tr key={year.year} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-3 py-2 font-medium text-gray-900">{year.year}</td>
                            <td className="px-3 py-2 text-right text-gray-700">{formatCurrency(year.cashFlow)}</td>
                            <td className="px-3 py-2 text-right text-blue-600">{year.discountFactor.toFixed(4)}</td>
                            <td className="px-3 py-2 text-right text-green-600 font-medium">{formatCurrency(year.presentValue)}</td>
                            <td className="px-3 py-2 text-right text-gray-900 font-bold">{formatCurrency(year.cumulativePV)}</td>
                          </tr>
                        ))}
                        {result.yearlyBreakdown.length > 10 && (
                          <tr>
                            <td colSpan={5} className="px-3 py-2 text-center text-gray-500 italic">
                              ... and {result.yearlyBreakdown.length - 10} more years
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Key Metrics */}
              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-4">📊 Key Metrics</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-700 font-medium mb-1">Analysis Type</div>
                    <div className="text-lg font-bold text-gray-900">
                      {inputs.mode === 'single-pv' ? 'Single Present Value' :
                       inputs.mode === 'annuity-pv' ? 'Annuity Present Value' :
                       'Cash Flow Analysis'}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-700 font-medium mb-1">Time Horizon</div>
                    <div className="text-lg font-bold text-gray-900">
                      {inputs.mode === 'single-pv' ? `${inputs.periods} years` :
                       inputs.mode === 'annuity-pv' ? `${inputs.periods} payments` :
                       `${result.yearlyBreakdown.length} years`}
                    </div>
                  </div>
                  
                  {inputs.includeNPV && (
                    <>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="text-sm text-gray-700 font-medium mb-1">Initial Investment</div>
                        <div className="text-lg font-bold text-gray-900">{formatCurrency(inputs.initialInvestment)}</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="text-sm text-gray-700 font-medium mb-1">Total Cash Inflows PV</div>
                        <div className="text-lg font-bold text-gray-900">{formatCurrency(result.totalDiscountedValue)}</div>
                      </div>
                    </>
                  )}
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
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">📊 Compare Present Value Analyses</h3>
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
                  <th className="px-4 py-3 text-left font-semibold">Analysis Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Discount Rate</th>
                  <th className="px-4 py-3 text-left font-semibold">Present Value</th>
                  <th className="px-4 py-3 text-left font-semibold">NPV</th>
                  <th className="px-4 py-3 text-left font-semibold">PI</th>
                  <th className="px-4 py-3 text-left font-semibold">Decision</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {savedScenarios.map((scenario) => (
                  <tr key={scenario.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{scenario.name}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {scenario.inputs.mode === 'single-pv' ? 'Single PV' : 
                         scenario.inputs.mode === 'annuity-pv' ? 'Annuity' : 'Cash Flow'}
                      </span>
                    </td>
                    <td className="px-4 py-3">{formatPercentage(scenario.inputs.discountRate)}</td>
                    <td className="px-4 py-3 text-blue-600 font-bold">
                      {formatCurrency(scenario.result.presentValue)}
                    </td>
                    <td className="px-4 py-3">
                      {scenario.inputs.includeNPV ? (
                        <span className={`font-bold ${scenario.result.netPresentValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(scenario.result.netPresentValue)}
                        </span>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {scenario.inputs.includeNPV ? (
                        <span className={`font-bold ${scenario.result.profitabilityIndex >= 1 ? 'text-green-600' : 'text-red-600'}`}>
                          {scenario.result.profitabilityIndex.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {scenario.inputs.includeNPV ? (
                        <span className={`text-xs px-2 py-1 rounded font-bold ${
                          scenario.result.investmentDecision.recommendation === 'accept' ? 'bg-green-100 text-green-800' :
                          scenario.result.investmentDecision.recommendation === 'reject' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {scenario.result.investmentDecision.recommendation.toUpperCase()}
                        </span>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Save Analysis Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Save Present Value Analysis</h3>
              <button
                onClick={() => setShowSaveModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Name</label>
                <input
                  type="text"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  placeholder="e.g., Bond Investment, Project Alpha"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              {result && (
                <div className="bg-blue-50 p-4 rounded-lg text-sm">
                  <div className="font-semibold text-blue-900 mb-2">This analysis shows:</div>
                  <div className="text-blue-800 space-y-1">
                    <div>• Present Value: <span className="font-bold">{formatCurrency(result.presentValue)}</span></div>
                    {inputs.includeNPV && (
                      <>
                        <div>• Net Present Value: <span className={`font-bold ${result.netPresentValue >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                          {formatCurrency(result.netPresentValue)}
                        </span></div>
                        <div>• Profitability Index: <span className="font-bold">{result.profitabilityIndex.toFixed(2)}</span></div>
                        <div>• Recommendation: <span className={`font-bold ${
                          result.investmentDecision.recommendation === 'accept' ? 'text-green-700' :
                          result.investmentDecision.recommendation === 'reject' ? 'text-red-700' : 'text-yellow-700'
                        }`}>
                          {result.investmentDecision.recommendation.toUpperCase()}
                        </span></div>
                      </>
                    )}
                    <div>• Discount Rate: <span className="font-bold">{formatPercentage(inputs.discountRate)}</span></div>
                    <div>• Analysis Type: <span className="font-bold">
                      {inputs.mode === 'single-pv' ? 'Single Present Value' :
                       inputs.mode === 'annuity-pv' ? 'Annuity Present Value' :
                       'Cash Flow Analysis'}
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
                  Save Analysis
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
        calculatorName="Present Value Calculator" 
      />
    </div>
  );
}
