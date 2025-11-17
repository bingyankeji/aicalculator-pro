'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calculator, TrendingUp, Share2, BarChart3, Target, Save, Trash2, Copy, X, DollarSign, Percent } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface ProfitMarginInputs {
  // Core Business Metrics
  revenue: number;           // Total revenue/sales
  costOfGoodsSold: number;   // COGS (direct costs)
  operatingExpenses: number; // Operating expenses
  otherExpenses: number;     // Other expenses (interest, taxes, etc.)
  
  // Alternative Input Method
  sellingPrice: number;      // Price per unit
  costPerUnit: number;       // Cost per unit
  unitsSold: number;        // Number of units sold
  
  // Analysis Settings
  inputMethod: 'total' | 'perunit';
  analysisType: 'basic' | 'advanced';
  industry: string;
}

interface SavedScenario {
  id: string;
  name: string;
  inputs: ProfitMarginInputs;
  result: ProfitMarginResult;
  createdAt: Date;
}

interface ProfitMarginResult {
  // Core Profit Margins
  grossProfit: number;
  grossMargin: number;
  operatingProfit: number;
  operatingMargin: number;
  netProfit: number;
  netMargin: number;
  
  // Pricing Analysis
  markupPercentage: number;
  priceOptimization: {
    currentPrice: number;
    recommendedPrice: number;
    priceIncrease: number;
    revenueImpact: number;
  };
  
  // Industry Comparison
  industryBenchmark: {
    averageGrossMargin: number;
    averageNetMargin: number;
    performance: 'above' | 'average' | 'below';
    ranking: string;
  };
  
  // Business Insights
  profitabilityAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    recommendations: string[];
  };
  
  // Summary
  summary: {
    status: 'excellent' | 'good' | 'average' | 'poor';
    keyMessage: string;
    priorityActions: string[];
  };
}

// Industry benchmarks data
const industryBenchmarks = {
  'retail': { grossMargin: 25, netMargin: 5 },
  'restaurant': { grossMargin: 60, netMargin: 8 },
  'software': { grossMargin: 80, netMargin: 20 },
  'manufacturing': { grossMargin: 35, netMargin: 10 },
  'ecommerce': { grossMargin: 40, netMargin: 12 },
  'consulting': { grossMargin: 70, netMargin: 15 },
  'healthcare': { grossMargin: 45, netMargin: 18 },
  'construction': { grossMargin: 20, netMargin: 6 },
  'automotive': { grossMargin: 15, netMargin: 4 },
  'technology': { grossMargin: 75, netMargin: 22 }
};

// Profit margin calculation function
const calculateProfitMargin = (inputs: ProfitMarginInputs): ProfitMarginResult | null => {
  let revenue, cogs, operatingExpenses, otherExpenses;
  
  if (inputs.inputMethod === 'perunit') {
    revenue = inputs.sellingPrice * inputs.unitsSold;
    cogs = inputs.costPerUnit * inputs.unitsSold;
    operatingExpenses = inputs.operatingExpenses;
    otherExpenses = inputs.otherExpenses;
  } else {
    revenue = inputs.revenue;
    cogs = inputs.costOfGoodsSold;
    operatingExpenses = inputs.operatingExpenses;
    otherExpenses = inputs.otherExpenses;
  }
  
  if (revenue <= 0) return null;
  
  // Core calculations
  const grossProfit = revenue - cogs;
  const grossMargin = (grossProfit / revenue) * 100;
  const operatingProfit = grossProfit - operatingExpenses;
  const operatingMargin = (operatingProfit / revenue) * 100;
  const netProfit = operatingProfit - otherExpenses;
  const netMargin = (netProfit / revenue) * 100;
  
  // Markup calculation
  const markupPercentage = cogs > 0 ? ((revenue - cogs) / cogs) * 100 : 0;
  
  // Price optimization
  const currentPrice = inputs.inputMethod === 'perunit' ? inputs.sellingPrice : revenue / (inputs.unitsSold || 1);
  const targetGrossMargin = 0.4; // 40% target
  const recommendedPrice = cogs > 0 ? (inputs.costPerUnit || (cogs / (inputs.unitsSold || 1))) / (1 - targetGrossMargin) : currentPrice;
  const priceIncrease = ((recommendedPrice - currentPrice) / currentPrice) * 100;
  const revenueImpact = (recommendedPrice - currentPrice) * (inputs.unitsSold || 1);
  
  // Industry comparison
  const benchmark = industryBenchmarks[inputs.industry as keyof typeof industryBenchmarks] || { grossMargin: 30, netMargin: 10 };
  let performance: 'above' | 'average' | 'below' = 'average';
  if (grossMargin > benchmark.grossMargin + 5) performance = 'above';
  else if (grossMargin < benchmark.grossMargin - 5) performance = 'below';
  
  const ranking = performance === 'above' ? 'Top 25%' : performance === 'below' ? 'Bottom 25%' : 'Average 50%';
  
  // Business insights
  const generateInsights = () => {
    const insights = {
      strengths: [] as string[],
      weaknesses: [] as string[],
      opportunities: [] as string[],
      recommendations: [] as string[]
    };
    
    // Strengths
    if (grossMargin > 50) insights.strengths.push('Excellent gross margin indicates strong pricing power');
    if (netMargin > 15) insights.strengths.push('Strong net profitability demonstrates efficient operations');
    if (grossMargin > benchmark.grossMargin) insights.strengths.push('Above-industry-average gross margins');
    
    // Weaknesses
    if (grossMargin < 20) insights.weaknesses.push('Low gross margin limits profitability potential');
    if (netMargin < 5) insights.weaknesses.push('Thin net margins indicate high operational costs');
    if (operatingExpenses / revenue > 0.3) insights.weaknesses.push('High operating expense ratio');
    
    // Opportunities
    if (grossMargin < benchmark.grossMargin) insights.opportunities.push('Opportunity to improve pricing or reduce COGS');
    if (operatingExpenses > grossProfit * 0.5) insights.opportunities.push('Potential to optimize operational efficiency');
    if (priceIncrease > 0) insights.opportunities.push(`Price optimization could increase revenue by ${formatCurrency(revenueImpact)}`);
    
    // Recommendations
    if (grossMargin < 25) insights.recommendations.push('Focus on improving gross margin through pricing or cost reduction');
    if (netMargin < 10) insights.recommendations.push('Review and optimize operating expenses');
    if (performance === 'below') insights.recommendations.push('Benchmark against industry leaders for improvement opportunities');
    
    return insights;
  };
  
  // Summary
  const generateSummary = () => {
    let status: 'excellent' | 'good' | 'average' | 'poor' = 'average';
    if (netMargin > 20) status = 'excellent';
    else if (netMargin > 10) status = 'good';
    else if (netMargin < 5) status = 'poor';
    
    const keyMessage = `${status === 'excellent' ? 'Excellent' : status === 'good' ? 'Good' : status === 'average' ? 'Average' : 'Poor'} profitability with ${formatPercentage(netMargin)} net margin`;
    
    const priorityActions = [];
    if (grossMargin < 30) priorityActions.push('Improve gross margin through pricing optimization');
    if (operatingMargin < netMargin + 5) priorityActions.push('Reduce operating expenses');
    if (performance === 'below') priorityActions.push('Benchmark against industry best practices');
    
    return { status, keyMessage, priorityActions };
  };
  
  return {
    grossProfit,
    grossMargin,
    operatingProfit,
    operatingMargin,
    netProfit,
    netMargin,
    markupPercentage,
    priceOptimization: {
      currentPrice,
      recommendedPrice,
      priceIncrease,
      revenueImpact
    },
    industryBenchmark: {
      averageGrossMargin: benchmark.grossMargin,
      averageNetMargin: benchmark.netMargin,
      performance,
      ranking
    },
    profitabilityAnalysis: generateInsights(),
    summary: generateSummary()
  };
};

// Preset scenarios
const profitMarginPresets = [
  {
    name: 'E-commerce Store',
    inputs: {
      revenue: 100000,
      costOfGoodsSold: 60000,
      operatingExpenses: 25000,
      otherExpenses: 5000,
      sellingPrice: 50,
      costPerUnit: 30,
      unitsSold: 2000,
      inputMethod: 'total' as const,
      analysisType: 'basic' as const,
      industry: 'ecommerce'
    }
  },
  {
    name: 'SaaS Business',
    inputs: {
      revenue: 500000,
      costOfGoodsSold: 100000,
      operatingExpenses: 200000,
      otherExpenses: 50000,
      sellingPrice: 99,
      costPerUnit: 20,
      unitsSold: 5050,
      inputMethod: 'total' as const,
      analysisType: 'advanced' as const,
      industry: 'software'
    }
  },
  {
    name: 'Restaurant Business',
    inputs: {
      revenue: 200000,
      costOfGoodsSold: 80000,
      operatingExpenses: 90000,
      otherExpenses: 15000,
      sellingPrice: 25,
      costPerUnit: 10,
      unitsSold: 8000,
      inputMethod: 'total' as const,
      analysisType: 'advanced' as const,
      industry: 'restaurant'
    }
  }
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatPercentage(rate: number): string {
  return `${rate.toFixed(1)}%`;
}

export default function ProfitMarginCalculator() {
  const [inputs, setInputs] = useState<ProfitMarginInputs>({
    revenue: 100000,
    costOfGoodsSold: 60000,
    operatingExpenses: 25000,
    otherExpenses: 5000,
    sellingPrice: 50,
    costPerUnit: 30,
    unitsSold: 2000,
    inputMethod: 'total',
    analysisType: 'basic',
    industry: 'ecommerce'
  });

  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [scenarioName, setScenarioName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => {
    return calculateProfitMargin(inputs);
  }, [inputs]);

  const updateInput = (field: keyof ProfitMarginInputs, value: string | number) => {
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

  const loadScenario = (scenario: SavedScenario) => {
    setInputs(scenario.inputs);
    setShowComparison(false);
  };

  const deleteScenario = (id: string) => {
    setSavedScenarios(prev => prev.filter(s => s.id !== id));
  };

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/profit-margin-calculator',
    getShareParams: () => ({
      revenue: inputs.revenue.toString(),
      cogs: inputs.costOfGoodsSold.toString(),
      opex: inputs.operatingExpenses.toString(),
      method: inputs.inputMethod,
      industry: inputs.industry
    }),
    getShareText: () => {
      if (!result) return 'Check out this profit margin analysis!';
      return `Profit Margin Analysis: ${formatPercentage(result.grossMargin)} gross margin, ${formatPercentage(result.netMargin)} net margin. Status: ${result.summary.status}`;
    },
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid xl:grid-cols-2 gap-8">
        {/* Left Side - Input Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2 hidden lg:block">
            <Percent className="w-6 h-6 text-blue-500" />
            Profit Margin Calculator
          </h3>

          <div className="space-y-6">
            {/* Input Method Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Input Method</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => updateInput('inputMethod', 'total')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    inputs.inputMethod === 'total'
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">Total Amounts</div>
                  <div className="text-xs opacity-75">Revenue & total costs</div>
                </button>
                <button
                  onClick={() => updateInput('inputMethod', 'perunit')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    inputs.inputMethod === 'perunit'
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">Per Unit</div>
                  <div className="text-xs opacity-75">Price & cost per unit</div>
                </button>
              </div>
            </div>

            {/* Industry Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry Type</label>
              <select
                value={inputs.industry}
                onChange={(e) => updateInput('industry', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ecommerce">E-commerce</option>
                <option value="retail">Retail</option>
                <option value="restaurant">Restaurant</option>
                <option value="software">Software/SaaS</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="consulting">Consulting</option>
                <option value="healthcare">Healthcare</option>
                <option value="construction">Construction</option>
                <option value="automotive">Automotive</option>
                <option value="technology">Technology</option>
              </select>
            </div>

            {/* Total Amounts Input */}
            {inputs.inputMethod === 'total' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Revenue/Sales
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={inputs.revenue || ''}
                      onChange={(e) => updateInput('revenue', parseFloat(e.target.value) || 0)}
                      placeholder="100,000"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost of Goods Sold (COGS)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={inputs.costOfGoodsSold || ''}
                      onChange={(e) => updateInput('costOfGoodsSold', parseFloat(e.target.value) || 0)}
                      placeholder="60,000"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operating Expenses
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={inputs.operatingExpenses || ''}
                      onChange={(e) => updateInput('operatingExpenses', parseFloat(e.target.value) || 0)}
                      placeholder="25,000"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Expenses (Interest, Taxes, etc.)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={inputs.otherExpenses || ''}
                      onChange={(e) => updateInput('otherExpenses', parseFloat(e.target.value) || 0)}
                      placeholder="5,000"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Per Unit Input */}
            {inputs.inputMethod === 'perunit' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selling Price per Unit
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={inputs.sellingPrice || ''}
                      onChange={(e) => updateInput('sellingPrice', parseFloat(e.target.value) || 0)}
                      placeholder="50"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost per Unit
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={inputs.costPerUnit || ''}
                      onChange={(e) => updateInput('costPerUnit', parseFloat(e.target.value) || 0)}
                      placeholder="30"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Units Sold
                  </label>
                  <input
                    type="number"
                    value={inputs.unitsSold || ''}
                    onChange={(e) => updateInput('unitsSold', parseFloat(e.target.value) || 0)}
                    placeholder="2,000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operating Expenses (Total)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={inputs.operatingExpenses || ''}
                      onChange={(e) => updateInput('operatingExpenses', parseFloat(e.target.value) || 0)}
                      placeholder="25,000"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Expenses (Total)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={inputs.otherExpenses || ''}
                      onChange={(e) => updateInput('otherExpenses', parseFloat(e.target.value) || 0)}
                      placeholder="5,000"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Presets */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Quick Presets</label>
              <div className="grid grid-cols-1 gap-2">
                {profitMarginPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setInputs(preset.inputs)}
                    className="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <div className="font-medium text-gray-900">{preset.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Revenue: {formatCurrency(preset.inputs.revenue)} • 
                      Industry: {preset.inputs.industry}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Saved Scenarios */}
            {savedScenarios.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Saved Scenarios</label>
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    {showComparison ? 'Hide' : 'Compare'}
                  </button>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {savedScenarios.map((scenario) => (
                    <div key={scenario.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{scenario.name}</div>
                        <div className="text-xs text-gray-500">
                          {formatPercentage(scenario.result.netMargin)} net margin
                        </div>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={() => loadScenario(scenario)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                          title="Load scenario"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => deleteScenario(scenario.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                          title="Delete scenario"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleShare}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Analysis
              </button>
              {result && (
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
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
                <BarChart3 className="w-5 h-5 text-green-600" />
                Profit Margin Analysis
              </h4>
              
              {/* Core Profit Margins */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">Gross Margin</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 break-all">{formatPercentage(result.grossMargin)}</div>
                  <div className="text-sm text-blue-700">{formatCurrency(result.grossProfit)} profit</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-600 font-medium">Operating Margin</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-900 break-all">{formatPercentage(result.operatingMargin)}</div>
                  <div className="text-sm text-green-700">{formatCurrency(result.operatingProfit)} profit</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm text-purple-600 font-medium">Net Margin</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-900 break-all">{formatPercentage(result.netMargin)}</div>
                  <div className="text-sm text-purple-700">{formatCurrency(result.netProfit)} profit</div>
                </div>
              </div>

              {/* Status Summary */}
              <div className={`p-4 rounded-lg mb-6 ${
                result.summary.status === 'excellent' ? 'bg-green-50 border border-green-200' :
                result.summary.status === 'good' ? 'bg-blue-50 border border-blue-200' :
                result.summary.status === 'average' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Target className={`w-5 h-5 ${
                    result.summary.status === 'excellent' ? 'text-green-600' :
                    result.summary.status === 'good' ? 'text-blue-600' :
                    result.summary.status === 'average' ? 'text-yellow-600' :
                    'text-red-600'
                  }`} />
                  <span className={`font-bold text-lg ${
                    result.summary.status === 'excellent' ? 'text-green-900' :
                    result.summary.status === 'good' ? 'text-blue-900' :
                    result.summary.status === 'average' ? 'text-yellow-900' :
                    'text-red-900'
                  }`}>
                    {result.summary.status.charAt(0).toUpperCase() + result.summary.status.slice(1)} Profitability
                  </span>
                </div>
                <p className={`${
                  result.summary.status === 'excellent' ? 'text-green-800' :
                  result.summary.status === 'good' ? 'text-blue-800' :
                  result.summary.status === 'average' ? 'text-yellow-800' :
                  'text-red-800'
                }`}>
                  {result.summary.keyMessage}
                </p>
              </div>

              {/* Industry Comparison */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Industry Comparison
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Your Gross Margin</div>
                    <div className="text-lg font-bold text-gray-900">{formatPercentage(result.grossMargin)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Industry Average</div>
                    <div className="text-lg font-bold text-gray-900">{formatPercentage(result.industryBenchmark.averageGrossMargin)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Your Net Margin</div>
                    <div className="text-lg font-bold text-gray-900">{formatPercentage(result.netMargin)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Industry Average</div>
                    <div className="text-lg font-bold text-gray-900">{formatPercentage(result.industryBenchmark.averageNetMargin)}</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    result.industryBenchmark.performance === 'above' ? 'bg-green-100 text-green-800' :
                    result.industryBenchmark.performance === 'average' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {result.industryBenchmark.ranking} Performance
                  </span>
                </div>
              </div>

              {/* Price Optimization */}
              {result.priceOptimization.priceIncrease > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h5 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Price Optimization Opportunity
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Current Price:</span>
                      <span className="font-bold text-blue-900">{formatCurrency(result.priceOptimization.currentPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Recommended Price:</span>
                      <span className="font-bold text-blue-900">{formatCurrency(result.priceOptimization.recommendedPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Price Increase:</span>
                      <span className="font-bold text-green-600">+{formatPercentage(result.priceOptimization.priceIncrease)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Revenue Impact:</span>
                      <span className="font-bold text-green-600">+{formatCurrency(result.priceOptimization.revenueImpact)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Business Insights */}
              <div className="space-y-4">
                {result.profitabilityAnalysis.strengths.length > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-bold text-green-900 mb-2">💪 Strengths</h5>
                    <ul className="text-sm text-green-800 space-y-1">
                      {result.profitabilityAnalysis.strengths.map((strength, index) => (
                        <li key={index}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.profitabilityAnalysis.opportunities.length > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-bold text-blue-900 mb-2">🚀 Opportunities</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      {result.profitabilityAnalysis.opportunities.map((opportunity, index) => (
                        <li key={index}>• {opportunity}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.profitabilityAnalysis.weaknesses.length > 0 && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h5 className="font-bold text-red-900 mb-2">⚠️ Areas for Improvement</h5>
                    <ul className="text-sm text-red-800 space-y-1">
                      {result.profitabilityAnalysis.weaknesses.map((weakness, index) => (
                        <li key={index}>• {weakness}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.profitabilityAnalysis.recommendations.length > 0 && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h5 className="font-bold text-purple-900 mb-2">📋 Recommendations</h5>
                    <ul className="text-sm text-purple-800 space-y-1">
                      {result.profitabilityAnalysis.recommendations.map((recommendation, index) => (
                        <li key={index}>• {recommendation}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Additional Metrics */}
              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <h5 className="font-bold text-gray-900 mb-3">Additional Metrics</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Markup Percentage:</span>
                    <span className="font-bold text-gray-900">{formatPercentage(result.markupPercentage)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industry:</span>
                    <span className="font-bold text-gray-900 capitalize">{inputs.industry}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!result && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Profit Margin Analysis
              </h4>
              <div className="text-center text-gray-500 py-8">
                <Percent className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p>Enter your business data to analyze profit margins</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison View */}
      {showComparison && savedScenarios.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">📊 Compare Profit Scenarios</h3>
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
                  <th className="px-4 py-3 text-left font-semibold">Revenue</th>
                  <th className="px-4 py-3 text-left font-semibold">Gross Margin</th>
                  <th className="px-4 py-3 text-left font-semibold">Operating Margin</th>
                  <th className="px-4 py-3 text-left font-semibold">Net Margin</th>
                  <th className="px-4 py-3 text-left font-semibold">Industry</th>
                  <th className="px-4 py-3 text-left font-semibold">Performance</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {savedScenarios.map((scenario) => (
                  <tr key={scenario.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{scenario.name}</td>
                    <td className="px-4 py-3">
                      {formatCurrency(scenario.inputs.inputMethod === 'perunit' 
                        ? scenario.inputs.sellingPrice * scenario.inputs.unitsSold 
                        : scenario.inputs.revenue)}
                    </td>
                    <td className="px-4 py-3 text-blue-600 font-bold">
                      {formatPercentage(scenario.result.grossMargin)}
                    </td>
                    <td className="px-4 py-3 text-green-600 font-bold">
                      {formatPercentage(scenario.result.operatingMargin)}
                    </td>
                    <td className="px-4 py-3 text-purple-600 font-bold">
                      {formatPercentage(scenario.result.netMargin)}
                    </td>
                    <td className="px-4 py-3 capitalize">{scenario.inputs.industry}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        scenario.result.summary.status === 'excellent' ? 'bg-green-100 text-green-700' :
                        scenario.result.summary.status === 'good' ? 'bg-blue-100 text-blue-700' :
                        scenario.result.summary.status === 'average' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {scenario.result.summary.status.toUpperCase()}
                      </span>
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
              <h3 className="text-xl font-bold text-gray-900">Save Profit Analysis</h3>
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
                  placeholder="e.g., Current Business Model, Optimized Pricing"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              {result && (
                <div className="bg-blue-50 p-4 rounded-lg text-sm">
                  <div className="font-semibold text-blue-900 mb-2">This analysis shows:</div>
                  <div className="text-blue-800 space-y-1">
                    <div>• Gross Margin: <span className="font-bold">{formatPercentage(result.grossMargin)}</span></div>
                    <div>• Operating Margin: <span className="font-bold">{formatPercentage(result.operatingMargin)}</span></div>
                    <div>• Net Margin: <span className="font-bold">{formatPercentage(result.netMargin)}</span></div>
                    <div>• Status: <span className="font-bold capitalize">{result.summary.status}</span></div>
                    <div>• Industry: <span className="font-bold capitalize">{inputs.industry}</span></div>
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
        calculatorName="Profit Margin Calculator" 
      />
    </div>
  );
}
