'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calculator, TrendingUp, Share2, BarChart3, Target, Save, Trash2, Copy, X, DollarSign } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface BreakevenInputs {
  // Core Business Metrics
  fixedCosts: number;        // Monthly fixed costs
  variableCostPerUnit: number; // Variable cost per unit
  sellingPricePerUnit: number; // Selling price per unit
  
  // Advanced Analysis
  targetProfit: number;      // Desired monthly profit
  currentSalesVolume: number; // Current monthly sales volume
  
  // Scenario Analysis
  analysisType: 'basic' | 'advanced';
  timeFrame: 'monthly' | 'yearly';
}

interface SavedScenario {
  id: string;
  name: string;
  inputs: BreakevenInputs;
  result: BreakevenResult;
  createdAt: Date;
}

interface BreakevenResult {
  // Core Calculations
  breakevenUnits: number;
  breakevenRevenue: number;
  contributionMargin: number;
  contributionMarginRatio: number;
  
  // Profit Analysis
  targetProfitUnits?: number;
  targetProfitRevenue?: number;
  currentProfit?: number;
  profitMargin?: number;
  
  // Business Insights
  marginOfSafety?: number;
  marginOfSafetyRatio?: number;
  operatingLeverage?: number;
  
  // Recommendations
  pricingStrategy: {
    recommendation: string;
    reasoning: string;
    alternatives: string[];
  };
  
  businessInsights: {
    strengths: string[];
    risks: string[];
    opportunities: string[];
  };
  
  // Decision Support
  summary: {
    status: 'profitable' | 'breakeven' | 'loss';
    keyMessage: string;
    actionItems: string[];
  };
}

// Break-even calculation functions
const calculateBreakeven = (inputs: BreakevenInputs): BreakevenResult | null => {
  const {
    fixedCosts,
    variableCostPerUnit,
    sellingPricePerUnit,
    targetProfit,
    currentSalesVolume,
    timeFrame
  } = inputs;
  
  if (sellingPricePerUnit <= 0 || sellingPricePerUnit <= variableCostPerUnit) return null;
  
  // Adjust for time frame
  const timeMultiplier = timeFrame === 'yearly' ? 12 : 1;
  const adjustedFixedCosts = fixedCosts * timeMultiplier;
  const adjustedTargetProfit = targetProfit * timeMultiplier;
  const adjustedCurrentVolume = currentSalesVolume * timeMultiplier;
  
  // Core Calculations
  const contributionMargin = sellingPricePerUnit - variableCostPerUnit;
  const contributionMarginRatio = contributionMargin / sellingPricePerUnit;
  const breakevenUnits = adjustedFixedCosts / contributionMargin;
  const breakevenRevenue = breakevenUnits * sellingPricePerUnit;
  
  // Target Profit Analysis
  const targetProfitUnits = (adjustedFixedCosts + adjustedTargetProfit) / contributionMargin;
  const targetProfitRevenue = targetProfitUnits * sellingPricePerUnit;
  
  // Current Performance Analysis
  const currentRevenue = adjustedCurrentVolume * sellingPricePerUnit;
  const currentVariableCosts = adjustedCurrentVolume * variableCostPerUnit;
  const currentProfit = currentRevenue - currentVariableCosts - adjustedFixedCosts;
  const profitMargin = currentRevenue > 0 ? (currentProfit / currentRevenue) * 100 : 0;
  
  // Safety and Risk Analysis
  const marginOfSafety = Math.max(0, adjustedCurrentVolume - breakevenUnits);
  const marginOfSafetyRatio = adjustedCurrentVolume > 0 ? (marginOfSafety / adjustedCurrentVolume) * 100 : 0;
  const operatingLeverage = currentProfit > 0 ? (contributionMargin * adjustedCurrentVolume) / currentProfit : 0;
  
  // Business Status
  let status: 'profitable' | 'breakeven' | 'loss' = 'loss';
  if (currentProfit > 0) status = 'profitable';
  else if (Math.abs(currentProfit) < contributionMargin * 0.1) status = 'breakeven';
  
  // Pricing Strategy Analysis
  const generatePricingStrategy = () => {
    const currentMarginRatio = contributionMarginRatio * 100;
    
    if (currentMarginRatio < 20) {
      return {
        recommendation: 'Increase pricing or reduce variable costs',
        reasoning: `Low contribution margin (${currentMarginRatio.toFixed(1)}%) makes profitability challenging`,
        alternatives: [
          'Reduce variable costs through supplier negotiation',
          'Add value to justify higher prices',
          'Focus on premium market segments'
        ]
      };
    } else if (currentMarginRatio > 60) {
      return {
        recommendation: 'Consider competitive pricing strategy',
        reasoning: `High contribution margin (${currentMarginRatio.toFixed(1)}%) provides pricing flexibility`,
        alternatives: [
          'Lower prices to increase market share',
          'Maintain premium positioning',
          'Invest savings in marketing and growth'
        ]
      };
    } else {
      return {
        recommendation: 'Optimize current pricing strategy',
        reasoning: `Healthy contribution margin (${currentMarginRatio.toFixed(1)}%) with room for improvement`,
        alternatives: [
          'Test price increases in small increments',
          'Bundle products for higher perceived value',
          'Implement value-based pricing'
        ]
      };
    }
  };
  
  // Business Insights
  const generateBusinessInsights = () => {
    const insights = {
      strengths: [] as string[],
      risks: [] as string[],
      opportunities: [] as string[]
    };
    
    // Strengths
    if (contributionMarginRatio > 0.4) {
      insights.strengths.push('Strong contribution margin provides good profit potential');
    }
    if (marginOfSafetyRatio > 20) {
      insights.strengths.push('Healthy margin of safety reduces business risk');
    }
    if (currentProfit > 0) {
      insights.strengths.push('Currently profitable operations');
    }
    
    // Risks
    if (contributionMarginRatio < 0.2) {
      insights.risks.push('Low contribution margin limits profitability');
    }
    if (marginOfSafetyRatio < 10) {
      insights.risks.push('Low margin of safety increases vulnerability to sales drops');
    }
    if (operatingLeverage > 5) {
      insights.risks.push('High operating leverage amplifies profit volatility');
    }
    
    // Opportunities
    if (adjustedCurrentVolume < breakevenUnits) {
      insights.opportunities.push('Increase sales volume to reach breakeven point');
    }
    if (contributionMarginRatio < 0.5) {
      insights.opportunities.push('Improve contribution margin through cost reduction or pricing');
    }
    if (targetProfitUnits > breakevenUnits * 1.5) {
      insights.opportunities.push('Significant growth potential to reach profit targets');
    }
    
    return insights;
  };
  
  // Summary and Action Items
  const generateSummary = () => {
    const actionItems = [];
    
    if (status === 'loss') {
      actionItems.push(`Increase sales by ${Math.ceil(breakevenUnits - adjustedCurrentVolume)} units to break even`);
      actionItems.push('Review and reduce fixed costs where possible');
      actionItems.push('Analyze pricing strategy and market positioning');
    } else if (status === 'breakeven') {
      actionItems.push('Focus on increasing sales volume for profitability');
      actionItems.push('Monitor costs closely to maintain breakeven position');
      actionItems.push('Explore opportunities to improve contribution margin');
    } else {
      actionItems.push(`Increase sales by ${Math.ceil(targetProfitUnits - adjustedCurrentVolume)} units to reach profit target`);
      actionItems.push('Consider reinvesting profits for growth');
      actionItems.push('Evaluate expansion opportunities');
    }
    
    let keyMessage = '';
    if (status === 'profitable') {
      keyMessage = `Business is profitable with ${formatCurrency(currentProfit)} ${timeFrame === 'yearly' ? 'annual' : 'monthly'} profit`;
    } else if (status === 'breakeven') {
      keyMessage = `Business is at breakeven point - focus on growth for profitability`;
    } else {
      keyMessage = `Need ${Math.ceil(breakevenUnits - adjustedCurrentVolume)} more unit sales to break even`;
    }
    
    return {
      status,
      keyMessage,
      actionItems
    };
  };
  
  return {
    breakevenUnits,
    breakevenRevenue,
    contributionMargin,
    contributionMarginRatio,
    targetProfitUnits,
    targetProfitRevenue,
    currentProfit,
    profitMargin,
    marginOfSafety,
    marginOfSafetyRatio,
    operatingLeverage,
    pricingStrategy: generatePricingStrategy(),
    businessInsights: generateBusinessInsights(),
    summary: generateSummary()
  };
};

const breakevenPresets = [
  {
    name: 'Small Retail Business',
    inputs: {
      fixedCosts: 5000,
      variableCostPerUnit: 15,
      sellingPricePerUnit: 25,
      targetProfit: 2000,
      currentSalesVolume: 600,
      analysisType: 'basic' as const,
      timeFrame: 'monthly' as const
    }
  },
  {
    name: 'SaaS Startup',
    inputs: {
      fixedCosts: 15000,
      variableCostPerUnit: 5,
      sellingPricePerUnit: 50,
      targetProfit: 10000,
      currentSalesVolume: 400,
      analysisType: 'advanced' as const,
      timeFrame: 'monthly' as const
    }
  },
  {
    name: 'Manufacturing Company',
    inputs: {
      fixedCosts: 25000,
      variableCostPerUnit: 30,
      sellingPricePerUnit: 75,
      targetProfit: 15000,
      currentSalesVolume: 800,
      analysisType: 'advanced' as const,
      timeFrame: 'monthly' as const
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

function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

function formatPercentage(rate: number): string {
  return `${rate.toFixed(1)}%`;
}

export default function BreakevenCalculator() {
  const [inputs, setInputs] = useState<BreakevenInputs>({
    fixedCosts: 5000,
    variableCostPerUnit: 15,
    sellingPricePerUnit: 25,
    targetProfit: 2000,
    currentSalesVolume: 600,
    analysisType: 'basic',
    timeFrame: 'monthly'
  });

  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [scenarioName, setScenarioName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => {
    return calculateBreakeven(inputs);
  }, [inputs]);

  const updateInput = (field: keyof BreakevenInputs, value: string | number) => {
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
    calculatorPath: '/breakeven-calculator',
    getShareParams: () => ({
      fixed: inputs.fixedCosts.toString(),
      variable: inputs.variableCostPerUnit.toString(),
      price: inputs.sellingPricePerUnit.toString(),
      target: inputs.targetProfit.toString(),
      timeframe: inputs.timeFrame
    }),
    getShareText: () => {
      if (!result) return 'Check out this break-even analysis!';
      return `Break-even Analysis: Need ${formatNumber(result.breakevenUnits)} units to break even. Current status: ${result.summary.status}`;
    },
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Input Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-500" />
            Break-even Calculator
          </h3>

          <div className="space-y-6">
            {/* Analysis Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Analysis Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateInput('analysisType', 'basic')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    inputs.analysisType === 'basic'
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">Basic Analysis</div>
                  <div className="text-xs opacity-75">Core break-even metrics</div>
                </button>
                <button
                  onClick={() => updateInput('analysisType', 'advanced')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    inputs.analysisType === 'advanced'
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">Advanced Analysis</div>
                  <div className="text-xs opacity-75">Full business insights</div>
                </button>
              </div>
            </div>

            {/* Time Frame */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Time Frame</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateInput('timeFrame', 'monthly')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    inputs.timeFrame === 'monthly'
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">Monthly</div>
                </button>
                <button
                  onClick={() => updateInput('timeFrame', 'yearly')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    inputs.timeFrame === 'yearly'
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">Yearly</div>
                </button>
              </div>
            </div>

            {/* Core Business Metrics */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">📊 Core Business Metrics</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fixed Costs ({inputs.timeFrame})
                  </label>
                  <input
                    type="number"
                    value={inputs.fixedCosts}
                    onChange={(e) => updateInput('fixedCosts', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="100"
                    placeholder="5000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Rent, salaries, insurance, etc.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Variable Cost per Unit
                    </label>
                    <input
                      type="number"
                      value={inputs.variableCostPerUnit}
                      onChange={(e) => updateInput('variableCostPerUnit', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="0.01"
                      placeholder="15.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selling Price per Unit
                    </label>
                    <input
                      type="number"
                      value={inputs.sellingPricePerUnit}
                      onChange={(e) => updateInput('sellingPricePerUnit', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="0.01"
                      placeholder="25.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Profit ({inputs.timeFrame})
                    </label>
                    <input
                      type="number"
                      value={inputs.targetProfit}
                      onChange={(e) => updateInput('targetProfit', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="100"
                      placeholder="2000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Sales Volume ({inputs.timeFrame})
                    </label>
                    <input
                      type="number"
                      value={inputs.currentSalesVolume}
                      onChange={(e) => updateInput('currentSalesVolume', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="1"
                      placeholder="600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">🎯 Business Examples</h4>
              <div className="grid grid-cols-1 gap-2">
                {breakevenPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setInputs(preset.inputs)}
                    className="p-3 text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-medium text-gray-900">{preset.name}</div>
                    <div className="text-xs text-gray-600">
                      Fixed: {formatCurrency(preset.inputs.fixedCosts)} • Price: {formatCurrency(preset.inputs.sellingPricePerUnit)} • Variable: {formatCurrency(preset.inputs.variableCostPerUnit)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setInputs({
                  fixedCosts: 5000,
                  variableCostPerUnit: 15,
                  sellingPricePerUnit: 25,
                  targetProfit: 2000,
                  currentSalesVolume: 600,
                  analysisType: 'basic',
                  timeFrame: 'monthly'
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
                Break-even Analysis Results
              </h4>

              {/* Status Banner */}
              <div className={`p-4 rounded-lg border-2 mb-6 ${
                result.summary.status === 'profitable' ? 'bg-green-50 border-green-200' :
                result.summary.status === 'breakeven' ? 'bg-yellow-50 border-yellow-200' :
                'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                    result.summary.status === 'profitable' ? 'bg-green-600 text-white' :
                    result.summary.status === 'breakeven' ? 'bg-yellow-600 text-white' :
                    'bg-red-600 text-white'
                  }`}>
                    {result.summary.status === 'profitable' ? '✅ PROFITABLE' :
                     result.summary.status === 'breakeven' ? '⚖️ BREAK-EVEN' :
                     '⚠️ LOSS'}
                  </div>
                </div>
                <p className={`text-sm font-medium ${
                  result.summary.status === 'profitable' ? 'text-green-800' :
                  result.summary.status === 'breakeven' ? 'text-yellow-800' :
                  'text-red-800'
                }`}>
                  {result.summary.keyMessage}
                </p>
              </div>

              {/* Core Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">Break-even Units</div>
                  <div className="text-3xl font-bold text-blue-900">{formatNumber(result.breakevenUnits)}</div>
                  <div className="text-xs text-blue-600">{inputs.timeFrame} sales needed</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700 font-medium mb-1">Break-even Revenue</div>
                  <div className="text-3xl font-bold text-green-900">{formatCurrency(result.breakevenRevenue)}</div>
                  <div className="text-xs text-green-600">{inputs.timeFrame} revenue target</div>
                </div>
              </div>

              {/* Detailed Analysis */}
              {inputs.analysisType === 'advanced' && (
                <div className="space-y-6">
                  {/* Contribution Margin Analysis */}
                  <div>
                    <h5 className="text-lg font-bold text-gray-900 mb-4">📊 Contribution Analysis</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="text-sm text-gray-700 font-medium mb-1">Contribution Margin</div>
                        <div className="text-lg font-bold text-gray-900">
                          {formatCurrency(result.contributionMargin)}
                        </div>
                        <div className="text-xs text-gray-600">per unit sold</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="text-sm text-gray-700 font-medium mb-1">Contribution Margin Ratio</div>
                        <div className="text-lg font-bold text-gray-900">
                          {formatPercentage(result.contributionMarginRatio * 100)}
                        </div>
                        <div className="text-xs text-gray-600">of each sale</div>
                      </div>
                    </div>
                  </div>

                  {/* Target Profit Analysis */}
                  {result.targetProfitUnits && (
                    <div>
                      <h5 className="text-lg font-bold text-gray-900 mb-4">🎯 Target Profit Analysis</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <div className="text-sm text-purple-700 font-medium mb-1">Units for Target Profit</div>
                          <div className="text-lg font-bold text-purple-900">
                            {formatNumber(result.targetProfitUnits)}
                          </div>
                          <div className="text-xs text-purple-600">{inputs.timeFrame} sales needed</div>
                        </div>
                        
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <div className="text-sm text-purple-700 font-medium mb-1">Revenue for Target Profit</div>
                          <div className="text-lg font-bold text-purple-900">
                            {formatCurrency(result.targetProfitRevenue!)}
                          </div>
                          <div className="text-xs text-purple-600">{inputs.timeFrame} revenue target</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Current Performance */}
                  {result.currentProfit !== undefined && (
                    <div>
                      <h5 className="text-lg font-bold text-gray-900 mb-4">📈 Current Performance</h5>
                      <div className="grid grid-cols-3 gap-4">
                        <div className={`rounded-lg p-4 border ${
                          result.currentProfit > 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                        }`}>
                          <div className={`text-sm font-medium mb-1 ${
                            result.currentProfit > 0 ? 'text-green-700' : 'text-red-700'
                          }`}>Current Profit</div>
                          <div className={`text-lg font-bold ${
                            result.currentProfit > 0 ? 'text-green-900' : 'text-red-900'
                          }`}>
                            {formatCurrency(result.currentProfit)}
                          </div>
                          <div className={`text-xs ${
                            result.currentProfit > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>{inputs.timeFrame} profit/loss</div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="text-sm text-gray-700 font-medium mb-1">Profit Margin</div>
                          <div className="text-lg font-bold text-gray-900">
                            {formatPercentage(result.profitMargin!)}
                          </div>
                          <div className="text-xs text-gray-600">of total revenue</div>
                        </div>
                        
                        <div className={`rounded-lg p-4 border ${
                          result.marginOfSafetyRatio! > 20 ? 'bg-green-50 border-green-200' : 
                          result.marginOfSafetyRatio! > 10 ? 'bg-yellow-50 border-yellow-200' :
                          'bg-red-50 border-red-200'
                        }`}>
                          <div className={`text-sm font-medium mb-1 ${
                            result.marginOfSafetyRatio! > 20 ? 'text-green-700' : 
                            result.marginOfSafetyRatio! > 10 ? 'text-yellow-700' :
                            'text-red-700'
                          }`}>Margin of Safety</div>
                          <div className={`text-lg font-bold ${
                            result.marginOfSafetyRatio! > 20 ? 'text-green-900' : 
                            result.marginOfSafetyRatio! > 10 ? 'text-yellow-900' :
                            'text-red-900'
                          }`}>
                            {formatPercentage(result.marginOfSafetyRatio!)}
                          </div>
                          <div className={`text-xs ${
                            result.marginOfSafetyRatio! > 20 ? 'text-green-600' : 
                            result.marginOfSafetyRatio! > 10 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>safety cushion</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pricing Strategy */}
                  <div>
                    <h5 className="text-lg font-bold text-gray-900 mb-4">💡 Pricing Strategy</h5>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h6 className="font-bold text-blue-900 mb-2">{result.pricingStrategy.recommendation}</h6>
                      <p className="text-blue-800 text-sm mb-3">{result.pricingStrategy.reasoning}</p>
                      <div>
                        <div className="text-sm font-medium text-blue-900 mb-2">Alternative Strategies:</div>
                        <ul className="text-blue-800 text-sm space-y-1">
                          {result.pricingStrategy.alternatives.map((alt, index) => (
                            <li key={index}>• {alt}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Business Insights */}
                  <div>
                    <h5 className="text-lg font-bold text-gray-900 mb-4">🔍 Business Insights</h5>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h6 className="font-bold text-green-900 mb-2">✅ Strengths</h6>
                        <ul className="text-green-800 text-sm space-y-1">
                          {result.businessInsights.strengths.map((strength, index) => (
                            <li key={index}>• {strength}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                        <h6 className="font-bold text-red-900 mb-2">⚠️ Risks</h6>
                        <ul className="text-red-800 text-sm space-y-1">
                          {result.businessInsights.risks.map((risk, index) => (
                            <li key={index}>• {risk}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h6 className="font-bold text-yellow-900 mb-2">🚀 Opportunities</h6>
                        <ul className="text-yellow-800 text-sm space-y-1">
                          {result.businessInsights.opportunities.map((opp, index) => (
                            <li key={index}>• {opp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Action Items */}
                  <div>
                    <h5 className="text-lg font-bold text-gray-900 mb-4">📋 Recommended Actions</h5>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <ul className="text-gray-700 space-y-2">
                        {result.summary.actionItems.map((action, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Analysis Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save This Analysis
                </button>
              </div>
            </div>
          )}

          {!result && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-600" />
                Break-even Analysis Results
              </h4>
              <div className="text-center text-gray-500 py-8">
                <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p>Enter your business metrics to see the break-even analysis</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison View */}
      {showComparison && savedScenarios.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">📊 Compare Business Scenarios</h3>
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
                  <th className="px-4 py-3 text-left font-semibold">Fixed Costs</th>
                  <th className="px-4 py-3 text-left font-semibold">Price/Unit</th>
                  <th className="px-4 py-3 text-left font-semibold">Variable Cost</th>
                  <th className="px-4 py-3 text-left font-semibold">Break-even Units</th>
                  <th className="px-4 py-3 text-left font-semibold">Break-even Revenue</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {savedScenarios.map((scenario) => (
                  <tr key={scenario.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{scenario.name}</td>
                    <td className="px-4 py-3">{formatCurrency(scenario.inputs.fixedCosts)}</td>
                    <td className="px-4 py-3">{formatCurrency(scenario.inputs.sellingPricePerUnit)}</td>
                    <td className="px-4 py-3">{formatCurrency(scenario.inputs.variableCostPerUnit)}</td>
                    <td className="px-4 py-3 text-blue-600 font-bold">
                      {formatNumber(scenario.result.breakevenUnits)}
                    </td>
                    <td className="px-4 py-3 text-green-600 font-bold">
                      {formatCurrency(scenario.result.breakevenRevenue)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        scenario.result.summary.status === 'profitable' ? 'bg-green-100 text-green-700' :
                        scenario.result.summary.status === 'breakeven' ? 'bg-yellow-100 text-yellow-700' :
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
              <h3 className="text-xl font-bold text-gray-900">Save Business Analysis</h3>
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
                  placeholder="e.g., Current Business Plan, Optimistic Scenario"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              {result && (
                <div className="bg-blue-50 p-4 rounded-lg text-sm">
                  <div className="font-semibold text-blue-900 mb-2">This analysis shows:</div>
                  <div className="text-blue-800 space-y-1">
                    <div>• Break-even Point: <span className="font-bold">{formatNumber(result.breakevenUnits)} units</span></div>
                    <div>• Break-even Revenue: <span className="font-bold">{formatCurrency(result.breakevenRevenue)}</span></div>
                    <div>• Contribution Margin: <span className="font-bold">{formatCurrency(result.contributionMargin)} per unit</span></div>
                    <div>• Status: <span className="font-bold capitalize">{result.summary.status}</span></div>
                    <div>• Time Frame: <span className="font-bold capitalize">{inputs.timeFrame}</span></div>
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
        calculatorName="Break-even Calculator" 
      />
    </div>
  );
}
