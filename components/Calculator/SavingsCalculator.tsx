'use client';

import React, { useState, useEffect } from 'react';
import { PiggyBank, Target, TrendingUp, Calendar, DollarSign, Share2, Save, Printer, AlertCircle } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface SavingsInputs {
  initialDeposit: number;
  monthlyDeposit: number;
  annualInterestRate: number;
  years: number;
  inflationRate: number;
  compoundingFrequency: 'monthly' | 'quarterly' | 'annually';
}

interface SavingsResult {
  futureValue: number;
  totalDeposits: number;
  totalInterest: number;
  realValue: number;
  monthlyBreakdown: { month: number; balance: number; deposits: number; interest: number; realValue: number }[];
  yearlyBreakdown: { year: number; balance: number; deposits: number; interest: number }[];
}

interface TargetGoal {
  targetAmount: number;
  monthsRequired: number;
  requiredMonthlyDeposit: number;
  achievable: boolean;
}

export function SavingsCalculator() {
  // 渐进式披露状态管理
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const [inputs, setInputs] = useState<SavingsInputs>({
    initialDeposit: 1000,
    monthlyDeposit: 500,
    annualInterestRate: 5,
    years: 10,
    inflationRate: 2.5,
    compoundingFrequency: 'monthly',
  });

  const [result, setResult] = useState<SavingsResult | null>(null);
  const [showTargetGoal, setShowTargetGoal] = useState(false);
  const [targetAmount, setTargetAmount] = useState(50000);
  const [targetGoal, setTargetGoal] = useState<TargetGoal | null>(null);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('yearly');

  const calculateSavings = () => {
    const { initialDeposit, monthlyDeposit, annualInterestRate, years, inflationRate, compoundingFrequency } = inputs;
    
    const monthlyRate = annualInterestRate / 100 / 12;
    const totalMonths = years * 12;
    const monthlyInflationRate = inflationRate / 100 / 12;

    let balance = initialDeposit;
    let totalDeposits = initialDeposit;
    const monthlyBreakdown: SavingsResult['monthlyBreakdown'] = [];
    const yearlyBreakdown: SavingsResult['yearlyBreakdown'] = [];

    // Calculate month by month
    for (let month = 1; month <= totalMonths; month++) {
      // Add monthly deposit
      balance += monthlyDeposit;
      totalDeposits += monthlyDeposit;
      
      // Calculate interest
      let interest = 0;
      if (compoundingFrequency === 'monthly' || 
          (compoundingFrequency === 'quarterly' && month % 3 === 0) ||
          (compoundingFrequency === 'annually' && month % 12 === 0)) {
        interest = balance * monthlyRate;
        balance += interest;
      }

      // Calculate real value (inflation-adjusted)
      const realValue = balance / Math.pow(1 + monthlyInflationRate, month);

      monthlyBreakdown.push({
        month,
        balance,
        deposits: totalDeposits,
        interest: balance - totalDeposits,
        realValue,
      });

      // Yearly summary
      if (month % 12 === 0) {
        yearlyBreakdown.push({
          year: month / 12,
          balance,
          deposits: totalDeposits,
          interest: balance - totalDeposits,
        });
      }
    }

    const futureValue = balance;
    const totalInterest = futureValue - totalDeposits;
    const realValue = futureValue / Math.pow(1 + inflationRate / 100, years);

    setResult({
      futureValue,
      totalDeposits,
      totalInterest,
      realValue,
      monthlyBreakdown,
      yearlyBreakdown,
    });
  };

  const calculateTargetGoal = () => {
    if (!inputs.monthlyDeposit || inputs.monthlyDeposit <= 0) {
      setTargetGoal({
        targetAmount,
        monthsRequired: 0,
        requiredMonthlyDeposit: 0,
        achievable: false,
      });
      return;
    }

    const monthlyRate = inputs.annualInterestRate / 100 / 12;
    let balance = inputs.initialDeposit;
    let months = 0;
    const maxMonths = 600; // 50 years max

    // Calculate months required with current monthly deposit
    while (balance < targetAmount && months < maxMonths) {
      balance += inputs.monthlyDeposit;
      balance += balance * monthlyRate;
      months++;
    }

    const achievable = months < maxMonths;

    // Calculate required monthly deposit to reach goal in specified years
    const targetMonths = inputs.years * 12;
    let requiredMonthly = 0;
    
    if (monthlyRate > 0) {
      // Future value of annuity formula solved for payment
      const fv = targetAmount - inputs.initialDeposit * Math.pow(1 + monthlyRate, targetMonths);
      requiredMonthly = fv / (((Math.pow(1 + monthlyRate, targetMonths) - 1) / monthlyRate));
    } else {
      requiredMonthly = (targetAmount - inputs.initialDeposit) / targetMonths;
    }

    setTargetGoal({
      targetAmount,
      monthsRequired: achievable ? months : maxMonths,
      requiredMonthlyDeposit: Math.max(0, requiredMonthly),
      achievable,
    });
  };

  // 移除自动计算 - 改为手动点击计算按钮

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/savings-calculator',
    getShareParams: () => ({
      i: inputs.initialDeposit.toString(),
      m: inputs.monthlyDeposit.toString(),
      r: inputs.annualInterestRate.toString(),
      y: inputs.years.toString(),
      inf: inputs.inflationRate.toString(),
      cf: inputs.compoundingFrequency,
    }),
    getShareText: () =>
      result
        ? `Savings Goal: $${result.futureValue.toLocaleString()} in ${inputs.years} years | Total Deposits: $${result.totalDeposits.toLocaleString()} | Interest Earned: $${result.totalInterest.toLocaleString()}`
        : 'Check out my savings plan!',
  });

  const handleSaveImage = async () => {
    const element = document.getElementById('savings-result');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'savings-plan.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const chartData = viewMode === 'yearly' ? result?.yearlyBreakdown.map(item => ({
    period: `Year ${item.year}`,
    'Total Balance': Math.round(item.balance),
    'Total Deposits': Math.round(item.deposits),
    'Interest Earned': Math.round(item.interest),
  })) : result?.monthlyBreakdown.filter((_, i) => i % 3 === 0).map(item => ({
    period: `Month ${item.month}`,
    'Total Balance': Math.round(item.balance),
    'Total Deposits': Math.round(item.deposits),
    'Interest Earned': Math.round(item.interest),
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-5 xl:grid-cols-5 gap-4 sm:gap-6">
        {/* Input Section - 3 columns */}
        <div className="md:col-span-3 space-y-6">
          {/* ✅ 基础信息卡片 - 始终显示 */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-blue-600" />
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Deposit ($)
                </label>
                <input
                  type="number"
                  value={inputs.initialDeposit || ''}
                  onChange={(e) => setInputs({ ...inputs, initialDeposit: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                  placeholder="1000"
                  step="100"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-2">One-time starting deposit</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Deposit ($)
                </label>
                <input
                  type="number"
                  value={inputs.monthlyDeposit || ''}
                  onChange={(e) => setInputs({ ...inputs, monthlyDeposit: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                  placeholder="500"
                  step="50"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-2">Regular monthly contribution</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={inputs.annualInterestRate || ''}
                  onChange={(e) => setInputs({ ...inputs, annualInterestRate: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                  placeholder="5"
                  step="0.1"
                  min="0"
                  max="30"
                />
                <p className="text-xs text-gray-500 mt-2">Expected annual return (typical: 3-5%)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Savings Period (Years)
                </label>
                <input
                  type="number"
                  value={inputs.years || ''}
                  onChange={(e) => setInputs({ ...inputs, years: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                  placeholder="10"
                  min="1"
                  max="50"
                />
                <p className="text-xs text-gray-500 mt-2">How long to save</p>
              </div>

              {/* 展开高级选项按钮 */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-sm font-medium text-gray-700 hover:text-blue-700 flex items-center justify-center gap-2"
              >
                {showAdvanced ? (
                  <>
                    <span>Hide Advanced Options</span>
                    <span className="text-lg">▲</span>
                  </>
                ) : (
                  <>
                    <span>Show Advanced Options</span>
                    <span className="text-lg">▼</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ⚡ 高级选项 - 条件显示 */}
          {showAdvanced && (
            <>
              {/* Advanced Settings */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Advanced Settings (Optional)
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Compounding Frequency
                    </label>
                    <select
                      value={inputs.compoundingFrequency}
                      onChange={(e) => setInputs({ ...inputs, compoundingFrequency: e.target.value as any })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="monthly">Monthly (Most Common)</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Inflation Rate (%)
                    </label>
                    <input
                      type="number"
                      value={inputs.inflationRate || ''}
                      onChange={(e) => setInputs({ ...inputs, inflationRate: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="2.5"
                      step="0.1"
                      min="0"
                      max="10"
                    />
                    <p className="text-xs text-gray-500 mt-2">US historical average: 2-3%</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 🎯 计算按钮 - 始终在底部 */}
          <button
            onClick={calculateSavings}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <DollarSign className="h-5 w-5" />
            Calculate Savings
          </button>
        </div>

        {/* Results Section - 2 columns */}
        <div className="md:col-span-2 space-y-6">
          {result && (
            <>
              <div id="savings-result" className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg border border-green-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Savings Projection
                </h3>

                {/* Future Value */}
                <div className="bg-white rounded-lg p-6 mb-4 border border-green-200 text-center">
                  <div className="text-sm text-gray-600 mb-2">Future Value</div>
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-600 mb-2 break-all">
                    ${result.futureValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-gray-500">In {inputs.years} years</div>
                </div>

                {/* Breakdown */}
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Total Deposits:</span>
                      <span className="font-bold text-blue-600">
                        ${result.totalDeposits.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      ${inputs.initialDeposit.toLocaleString()} initial + ${(inputs.monthlyDeposit * inputs.years * 12).toLocaleString()} monthly
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Interest Earned:</span>
                      <span className="font-bold text-green-600">
                        ${result.totalInterest.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {((result.totalInterest / result.totalDeposits) * 100).toFixed(1)}% return on deposits
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Real Value (Inflation-Adjusted):</span>
                      <span className="font-bold text-orange-600">
                        ${result.realValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Purchasing power in today's dollars
                    </div>
                  </div>
                </div>

                {/* Monthly Summary */}
                <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-sm font-semibold text-gray-900 mb-2">💰 Monthly Summary</div>
                  <div className="space-y-2 text-xs text-gray-700">
                    <div className="flex justify-between">
                      <span>Monthly deposit:</span>
                      <span className="font-semibold">${inputs.monthlyDeposit}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily savings needed:</span>
                      <span className="font-semibold">${(inputs.monthlyDeposit / 30).toFixed(2)}/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual deposits:</span>
                      <span className="font-semibold">${(inputs.monthlyDeposit * 12).toLocaleString()}/year</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Goal Calculator */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <button
                  onClick={() => setShowTargetGoal(!showTargetGoal)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    Target Goal Calculator
                  </h3>
                  <span className="text-gray-400">{showTargetGoal ? '▼' : '▶'}</span>
                </button>

                {showTargetGoal && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Amount ($)
                      </label>
                      <input
                        type="number"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        step="1000"
                        min="0"
                      />
                    </div>

                    {targetGoal && (
                      <div className="space-y-3">
                        <div className={`rounded-lg p-4 ${
                          targetGoal.requiredMonthlyDeposit > inputs.monthlyDeposit * 3
                            ? 'bg-red-100 border border-red-300'
                            : targetGoal.requiredMonthlyDeposit > inputs.monthlyDeposit
                            ? 'bg-orange-100 border border-orange-300'
                            : 'bg-green-100 border border-green-300'
                        }`}>
                          <div className="text-sm text-gray-700 mb-2">
                            To reach <strong>${targetGoal.targetAmount.toLocaleString()}</strong> in {inputs.years} years:
                          </div>
                          <div className="text-2xl font-bold text-gray-900">
                            ${targetGoal.requiredMonthlyDeposit.toFixed(2)}/month
                          </div>
                          <div className="text-xs text-gray-600 mt-2">
                            At {inputs.annualInterestRate}% annual return
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="text-xs text-gray-700">
                            <strong>With current savings rate (${inputs.monthlyDeposit}/month):</strong>
                          </div>
                          <div className="text-sm font-semibold text-gray-900 mt-1">
                            {targetGoal.achievable 
                              ? `You'll reach your goal in ${Math.ceil(targetGoal.monthsRequired / 12)} years ${targetGoal.monthsRequired % 12} months`
                              : 'Target not achievable at current rate - increase monthly deposits'
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleShare}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md font-medium flex items-center justify-center gap-2"
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
            </>
          )}
        </div>
      </div>

      {/* Growth Chart */}
      {result && (
        <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Savings Growth Over Time</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('monthly')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  viewMode === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setViewMode('yearly')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  viewMode === 'yearly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Legend />
              <Area type="monotone" dataKey="Total Balance" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="Interest Earned" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Savings Calculator"
      />
    </div>
  );
}

