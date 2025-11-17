'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Calendar, Target, Share2, Save, Printer, BarChart3 } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface InvestmentInputs {
  investmentType: 'lump-sum' | 'dca' | 'both';
  initialInvestment: number;
  monthlyContribution: number;
  investmentPeriod: number;
  expectedReturn: number;
  inflationRate: number;
}

interface InvestmentResult {
  lumpSum: {
    futureValue: number;
    totalContributions: number;
    totalEarnings: number;
    realValue: number;
  } | null;
  dca: {
    futureValue: number;
    totalContributions: number;
    totalEarnings: number;
    realValue: number;
  } | null;
  growthData: { year: number; lumpSum: number; dca: number; contributions: number }[];
  yearlyBreakdown: { year: number; lumpSumValue: number; dcaValue: number; lumpSumEarnings: number; dcaEarnings: number }[];
  comparison: {
    winner: 'lump-sum' | 'dca' | 'tie';
    difference: number;
    percentageDifference: number;
  } | null;
}

export function InvestmentCalculator() {
  // 渐进式披露状态管理
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const [inputs, setInputs] = useState<InvestmentInputs>({
    investmentType: 'both',
    initialInvestment: 10000,
    monthlyContribution: 500,
    investmentPeriod: 20,
    expectedReturn: 8,
    inflationRate: 3,
  });

  const [result, setResult] = useState<InvestmentResult | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'growth' | 'breakdown'>('summary');

  const calculateInvestment = () => {
    const { investmentType, initialInvestment, monthlyContribution, investmentPeriod, expectedReturn, inflationRate } = inputs;

    const monthlyRate = expectedReturn / 100 / 12;
    const months = investmentPeriod * 12;
    const inflationMultiplier = Math.pow(1 + inflationRate / 100, investmentPeriod);

    let lumpSumData = null;
    let dcaData = null;

    // Lump Sum Calculation
    if (investmentType === 'lump-sum' || investmentType === 'both') {
      const futureValue = initialInvestment * Math.pow(1 + monthlyRate, months);
      const totalContributions = initialInvestment;
      const totalEarnings = futureValue - totalContributions;
      const realValue = futureValue / inflationMultiplier;

      lumpSumData = {
        futureValue,
        totalContributions,
        totalEarnings,
        realValue,
      };
    }

    // Dollar-Cost Averaging (DCA) Calculation
    if (investmentType === 'dca' || investmentType === 'both') {
      // Initial investment grows
      const initialGrowth = initialInvestment * Math.pow(1 + monthlyRate, months);
      
      // Monthly contributions grow
      const contributionsGrowth = monthlyContribution * 
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      
      const futureValue = initialGrowth + contributionsGrowth;
      const totalContributions = initialInvestment + (monthlyContribution * months);
      const totalEarnings = futureValue - totalContributions;
      const realValue = futureValue / inflationMultiplier;

      dcaData = {
        futureValue,
        totalContributions,
        totalEarnings,
        realValue,
      };
    }

    // Growth Data (Year by Year)
    const growthData: InvestmentResult['growthData'] = [];
    const yearlyBreakdown: InvestmentResult['yearlyBreakdown'] = [];
    
    for (let year = 0; year <= investmentPeriod; year++) {
      const monthsElapsed = year * 12;
      
      // Lump Sum growth
      let lumpSumValue = 0;
      if (lumpSumData) {
        lumpSumValue = initialInvestment * Math.pow(1 + monthlyRate, monthsElapsed);
      }
      
      // DCA growth
      let dcaValue = 0;
      let totalContributionsAtYear = 0;
      if (dcaData) {
        const initialGrowth = initialInvestment * Math.pow(1 + monthlyRate, monthsElapsed);
        const contributionsGrowth = monthsElapsed > 0
          ? monthlyContribution * ((Math.pow(1 + monthlyRate, monthsElapsed) - 1) / monthlyRate)
          : 0;
        dcaValue = initialGrowth + contributionsGrowth;
        totalContributionsAtYear = initialInvestment + (monthlyContribution * monthsElapsed);
      }
      
      growthData.push({
        year,
        lumpSum: Math.round(lumpSumValue),
        dca: Math.round(dcaValue),
        contributions: Math.round(totalContributionsAtYear),
      });

      // Yearly breakdown
      yearlyBreakdown.push({
        year,
        lumpSumValue: Math.round(lumpSumValue),
        dcaValue: Math.round(dcaValue),
        lumpSumEarnings: Math.round(lumpSumValue - initialInvestment),
        dcaEarnings: Math.round(dcaValue - totalContributionsAtYear),
      });
    }

    // Comparison
    type Comparison = { winner: 'tie' | 'lump-sum' | 'dca'; difference: number; percentageDifference: number };
    let comparison: Comparison | null = null;
    if (investmentType === 'both' && lumpSumData && dcaData) {
      const difference = lumpSumData.futureValue - dcaData.futureValue;
      const percentageDifference = (Math.abs(difference) / dcaData.futureValue) * 100;
      
      comparison = {
        winner: (difference > 1000 ? 'lump-sum' : difference < -1000 ? 'dca' : 'tie') as 'lump-sum' | 'dca' | 'tie',
        difference: Math.abs(difference),
        percentageDifference,
      };
    }

    setResult({
      lumpSum: lumpSumData,
      dca: dcaData,
      growthData,
      yearlyBreakdown,
      comparison,
    });
  };

  // 移除自动计算 - 改为手动点击计算按钮

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/investment-calculator',
    getShareParams: () => ({
      it: inputs.investmentType,
      ii: inputs.initialInvestment.toString(),
      mc: inputs.monthlyContribution.toString(),
      ip: inputs.investmentPeriod.toString(),
      er: inputs.expectedReturn.toString(),
      ir: inputs.inflationRate.toString(),
    }),
    getShareText: () => {
      if (result && inputs.investmentType === 'both' && result.lumpSum && result.dca) {
        return `Investment Analysis: Lump Sum = $${(result.lumpSum.futureValue / 1000).toFixed(0)}K vs DCA = $${(result.dca.futureValue / 1000).toFixed(0)}K over ${inputs.investmentPeriod} years`;
      } else if (result && result.lumpSum) {
        return `Lump Sum Investment: $${(result.lumpSum.futureValue / 1000).toFixed(0)}K in ${inputs.investmentPeriod} years`;
      } else if (result && result.dca) {
        return `DCA Investment: $${(result.dca.futureValue / 1000).toFixed(0)}K in ${inputs.investmentPeriod} years`;
      }
      return 'Check out my investment calculation!';
    },
  });

  const handleSaveImage = async () => {
    const element = document.getElementById('investment-result');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'investment-calculation.png';
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
          {/* ✅ 基础信息卡片 - 始终显示 */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Investment ($)
                </label>
                <input
                  type="number"
                  value={inputs.initialInvestment || ''}
                  onChange={(e) => setInputs({ ...inputs, initialInvestment: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                  placeholder="10000"
                  step="1000"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Amount you can invest today
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Period (Years)
                </label>
                <input
                  type="number"
                  value={inputs.investmentPeriod || ''}
                  onChange={(e) => setInputs({ ...inputs, investmentPeriod: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                  placeholder="20"
                  min="1"
                  max="50"
                />
                <div className="flex gap-2 mt-2">
                  {[10, 20, 30].map((years) => (
                    <button
                      key={years}
                      onClick={() => setInputs({ ...inputs, investmentPeriod: years })}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition"
                    >
                      {years}y
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Annual Return (%)
                </label>
                <input
                  type="number"
                  value={inputs.expectedReturn || ''}
                  onChange={(e) => setInputs({ ...inputs, expectedReturn: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                  placeholder="8"
                  step="0.5"
                  min="0"
                  max="30"
                />
                <p className="text-xs text-gray-500 mt-2">
                  S&P 500 historical: ~10% | Conservative: 6-7%
                </p>
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
              {/* Investment Strategy & DCA */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Investment Strategy (Optional)
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Compare Strategy
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setInputs({ ...inputs, investmentType: 'lump-sum' })}
                        className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                          inputs.investmentType === 'lump-sum'
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Lump Sum
                      </button>
                      <button
                        onClick={() => setInputs({ ...inputs, investmentType: 'dca' })}
                        className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                          inputs.investmentType === 'dca'
                            ? 'bg-green-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        DCA
                      </button>
                      <button
                        onClick={() => setInputs({ ...inputs, investmentType: 'both' })}
                        className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                          inputs.investmentType === 'both'
                            ? 'bg-purple-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Both
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Lump Sum: Invest all at once | DCA: Invest monthly
                    </p>
                  </div>

                  {(inputs.investmentType === 'dca' || inputs.investmentType === 'both') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Contribution ($)
                      </label>
                      <input
                        type="number"
                        value={inputs.monthlyContribution || ''}
                        onChange={(e) => setInputs({ ...inputs, monthlyContribution: parseFloat(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="500"
                        step="50"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Amount to invest each month (Dollar-Cost Averaging)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Inflation Adjustment */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Inflation Adjustment (Optional)
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Inflation Rate (%)
                  </label>
                  <input
                    type="number"
                    value={inputs.inflationRate || ''}
                    onChange={(e) => setInputs({ ...inputs, inflationRate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
            </>
          )}

          {/* 🎯 计算按钮 - 始终在底部 */}
          <button
            onClick={calculateInvestment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <BarChart3 className="h-5 w-5" />
            Calculate Investment
          </button>
        </div>

        {/* Results Section - 2 columns */}
        <div className="md:col-span-2 space-y-6">
          {result && (
            <>
              <div id="investment-result" className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg border border-blue-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Investment Results
                </h3>

                {/* Lump Sum Results */}
                {result.lumpSum && (
                  <div className="bg-white rounded-lg p-4 mb-4 border border-blue-200">
                    <div className="text-xs text-gray-600 mb-2 font-semibold">Lump Sum Investment</div>
                    <div className="text-3xl font-bold text-blue-600 mb-3">
                      ${result.lumpSum.futureValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Invested:</span>
                        <span className="font-semibold">${result.lumpSum.totalContributions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Earnings:</span>
                        <span className="font-semibold text-green-600">
                          ${result.lumpSum.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs pt-2 border-t">
                        <span className="text-gray-500">Real Value (inflation-adjusted):</span>
                        <span className="font-semibold text-gray-700">
                          ${result.lumpSum.realValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* DCA Results */}
                {result.dca && (
                  <div className="bg-white rounded-lg p-4 mb-4 border border-green-200">
                    <div className="text-xs text-gray-600 mb-2 font-semibold">Dollar-Cost Averaging (DCA)</div>
                    <div className="text-3xl font-bold text-green-600 mb-3">
                      ${result.dca.futureValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Invested:</span>
                        <span className="font-semibold">${result.dca.totalContributions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Earnings:</span>
                        <span className="font-semibold text-green-600">
                          ${result.dca.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs pt-2 border-t">
                        <span className="text-gray-500">Real Value (inflation-adjusted):</span>
                        <span className="font-semibold text-gray-700">
                          ${result.dca.realValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Comparison */}
                {result.comparison && result.lumpSum && result.dca && (
                  <div className={`rounded-lg p-4 border-2 ${
                    result.comparison.winner === 'lump-sum' 
                      ? 'bg-blue-50 border-blue-300' 
                      : result.comparison.winner === 'dca'
                      ? 'bg-green-50 border-green-300'
                      : 'bg-gray-50 border-gray-300'
                  }`}>
                    <div className="text-sm font-semibold text-gray-900 mb-2">
                      {result.comparison.winner === 'tie' 
                        ? '🤝 Nearly Identical Results' 
                        : result.comparison.winner === 'lump-sum'
                        ? '🏆 Lump Sum Wins'
                        : '🏆 DCA Wins'}
                    </div>
                    {result.comparison.winner !== 'tie' && (
                      <>
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          ${result.comparison.difference.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </div>
                        <p className="text-xs text-gray-700">
                          {result.comparison.winner === 'lump-sum' ? 'Lump Sum' : 'DCA'} advantage: {result.comparison.percentageDifference.toFixed(1)}% more
                        </p>
                      </>
                    )}
                    <div className="mt-3 pt-3 border-t border-gray-300">
                      <p className="text-xs text-gray-700">
                        <strong>Key Insight:</strong> {result.comparison.winner === 'lump-sum' 
                          ? 'Investing all at once typically outperforms when markets trend upward, as your money has more time to compound.'
                          : result.comparison.winner === 'dca'
                          ? 'Dollar-cost averaging can outperform in volatile or declining markets, as it reduces timing risk.'
                          : 'Both strategies produce similar results for this scenario. Consider your risk tolerance and market timing concerns.'}
                      </p>
                    </div>
                  </div>
                )}
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

              {/* Quick Insights */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg border border-blue-200 p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  Quick Insights
                </h3>
                <div className="space-y-2 text-xs text-gray-700">
                  {result.lumpSum && (
                    <p>
                      <strong>Lump Sum ROI:</strong> {((result.lumpSum.totalEarnings / result.lumpSum.totalContributions) * 100).toFixed(0)}% total return
                    </p>
                  )}
                  {result.dca && (
                    <p>
                      <strong>DCA ROI:</strong> {((result.dca.totalEarnings / result.dca.totalContributions) * 100).toFixed(0)}% total return
                    </p>
                  )}
                  <p>
                    <strong>Power of compounding:</strong> Your money grows exponentially over time. The longer you invest, the more you benefit from compound returns.
                  </p>
                  <p>
                    <strong>Inflation impact:</strong> After {inputs.investmentPeriod} years of {inputs.inflationRate}% inflation, you need {((inputs.inflationRate / 100 + 1) ** inputs.investmentPeriod).toFixed(2)}x more money to maintain purchasing power.
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
              Yearly Breakdown
            </button>
          </div>

          {/* Growth Chart */}
          {activeTab === 'growth' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Investment Growth Over Time</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={result.growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Portfolio Value ($)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Legend />
                  {result.lumpSum && (
                    <Line type="monotone" dataKey="lumpSum" stroke="#3b82f6" strokeWidth={3} name="Lump Sum" />
                  )}
                  {result.dca && (
                    <>
                      <Line type="monotone" dataKey="dca" stroke="#10b981" strokeWidth={3} name="DCA" />
                      <Line type="monotone" dataKey="contributions" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" name="Total Contributions (DCA)" />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-600 mt-4 text-center">
                Shows how your investment grows over {inputs.investmentPeriod} years with {inputs.expectedReturn}% annual return
              </p>
            </div>
          )}

          {/* Yearly Breakdown */}
          {activeTab === 'breakdown' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Yearly Breakdown</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={result.yearlyBreakdown.filter((_, i) => i % (inputs.investmentPeriod > 20 ? 2 : 1) === 0)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Legend />
                  {result.lumpSum && (
                    <Bar dataKey="lumpSumValue" fill="#3b82f6" name="Lump Sum Value" />
                  )}
                  {result.dca && (
                    <Bar dataKey="dcaValue" fill="#10b981" name="DCA Value" />
                  )}
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-600 mt-4 text-center">
                Year-by-year comparison of portfolio values
              </p>
            </div>
          )}

          {/* Summary Table */}
          {activeTab === 'summary' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Investment Summary</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {result.lumpSum && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-blue-600">Lump Sum Strategy</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Initial Investment:</span>
                        <span className="font-semibold">${inputs.initialInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time Period:</span>
                        <span className="font-semibold">{inputs.investmentPeriod} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expected Return:</span>
                        <span className="font-semibold">{inputs.expectedReturn}% annual</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-900 font-bold">Future Value:</span>
                        <span className="font-bold text-blue-600">
                          ${result.lumpSum.futureValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Earnings:</span>
                        <span className="font-bold text-green-600">
                          ${result.lumpSum.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Real Value (after inflation):</span>
                        <span className="font-semibold">
                          ${result.lumpSum.realValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {result.dca && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-green-600">Dollar-Cost Averaging (DCA)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Initial Investment:</span>
                        <span className="font-semibold">${inputs.initialInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Contribution:</span>
                        <span className="font-semibold">${inputs.monthlyContribution.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time Period:</span>
                        <span className="font-semibold">{inputs.investmentPeriod} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Invested:</span>
                        <span className="font-semibold">${result.dca.totalContributions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-900 font-bold">Future Value:</span>
                        <span className="font-bold text-green-600">
                          ${result.dca.futureValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Earnings:</span>
                        <span className="font-bold text-green-600">
                          ${result.dca.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Real Value (after inflation):</span>
                        <span className="font-semibold">
                          ${result.dca.realValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
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
        calculatorName="Investment Calculator"
      />
    </div>
  );
}

