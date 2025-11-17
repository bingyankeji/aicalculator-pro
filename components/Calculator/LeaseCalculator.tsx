'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calculator, Car, Home, TrendingUp, Share2, BarChart3, Target, Save, Trash2, Copy, X } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type LeaseType = 'auto' | 'equipment' | 'real-estate';
type AnalysisMode = 'lease-only' | 'lease-vs-buy';

interface LeaseInputs {
  // Asset Information
  assetValue: number;
  leaseType: LeaseType;
  analysisMode: AnalysisMode;
  
  // Lease Terms
  leaseTerm: number; // months
  monthlyPayment: number;
  downPayment: number;
  securityDeposit: number;
  residualValue: number; // percentage of original value
  
  // Purchase Option (for comparison)
  purchasePrice: number;
  loanTerm: number; // months
  interestRate: number; // annual percentage
  purchaseDownPayment: number;
  
  // Additional Costs
  maintenanceCost: number; // monthly
  insuranceCost: number; // monthly
  taxRate: number; // annual percentage
  
  // Advanced Options
  moneyFactor?: number; // lease interest rate equivalent
  acquisitionFee?: number;
  dispositionFee?: number;
  excessMileageFee?: number;
  wearTearFee?: number;
}

interface SavedScenario {
  id: string;
  name: string;
  inputs: LeaseInputs;
  result: LeaseResult;
  createdAt: Date;
}

interface LeaseResult {
  // Lease Analysis
  totalLeasePayments: number;
  totalLeaseCost: number;
  effectiveMonthlyRate: number;
  
  // Purchase Analysis (if applicable)
  loanMonthlyPayment?: number;
  totalLoanPayments?: number;
  totalPurchaseCost?: number;
  totalInterestPaid?: number;
  
  // Comparison Analysis
  costDifference?: number;
  recommendation: 'lease' | 'buy' | 'neutral';
  breakEvenPoint?: number; // months
  
  // Financial Metrics
  leaseToValueRatio: number;
  residualValueAmount: number;
  depreciation: number;
  
  // Decision Factors
  advantages: {
    lease: string[];
    buy: string[];
  };
  
  // Risk Assessment
  riskFactors: {
    lease: string[];
    buy: string[];
  };
  
  // Summary
  summary: {
    recommendation: string;
    reasoning: string;
    keyFactors: string[];
  };
}

// Lease calculation functions
const calculateLease = (inputs: LeaseInputs): LeaseResult | null => {
  const {
    assetValue,
    leaseTerm,
    monthlyPayment,
    downPayment,
    securityDeposit,
    residualValue,
    purchasePrice,
    loanTerm,
    interestRate,
    purchaseDownPayment,
    maintenanceCost,
    insuranceCost,
    taxRate,
    analysisMode,
    acquisitionFee = 0,
    dispositionFee = 0
  } = inputs;
  
  if (assetValue <= 0 || leaseTerm <= 0) return null;
  
  // Lease Calculations
  const residualValueAmount = assetValue * (residualValue / 100);
  const depreciation = assetValue - residualValueAmount;
  const totalLeasePayments = monthlyPayment * leaseTerm;
  const totalLeaseCost = totalLeasePayments + downPayment + securityDeposit + acquisitionFee + dispositionFee;
  const effectiveMonthlyRate = ((totalLeaseCost - securityDeposit) / leaseTerm) / assetValue * 100;
  const leaseToValueRatio = totalLeaseCost / assetValue;
  
  let loanMonthlyPayment: number | undefined;
  let totalLoanPayments: number | undefined;
  let totalPurchaseCost: number | undefined;
  let totalInterestPaid: number | undefined;
  let costDifference: number | undefined;
  let breakEvenPoint: number | undefined;
  
  // Purchase Analysis (if comparing)
  if (analysisMode === 'lease-vs-buy') {
    const loanAmount = purchasePrice - purchaseDownPayment;
    const monthlyRate = interestRate / 100 / 12;
    
    if (monthlyRate > 0) {
      loanMonthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                          (Math.pow(1 + monthlyRate, loanTerm) - 1);
    } else {
      loanMonthlyPayment = loanAmount / loanTerm;
    }
    
    totalLoanPayments = loanMonthlyPayment * loanTerm;
    totalInterestPaid = totalLoanPayments - loanAmount;
    totalPurchaseCost = totalLoanPayments + purchaseDownPayment;
    
    costDifference = totalLeaseCost - totalPurchaseCost;
    
    // Break-even analysis
    const monthlyDifference = monthlyPayment - loanMonthlyPayment;
    if (monthlyDifference !== 0) {
      breakEvenPoint = Math.abs((downPayment - purchaseDownPayment) / monthlyDifference);
    }
  }
  
  // Decision Logic
  let recommendation: 'lease' | 'buy' | 'neutral' = 'neutral';
  if (analysisMode === 'lease-vs-buy' && costDifference !== undefined) {
    if (costDifference > assetValue * 0.1) {
      recommendation = 'buy';
    } else if (costDifference < -assetValue * 0.05) {
      recommendation = 'lease';
    }
  } else {
    // For lease-only analysis, evaluate based on lease terms
    if (leaseToValueRatio < 0.4) {
      recommendation = 'lease';
    } else if (leaseToValueRatio > 0.6) {
      recommendation = 'buy';
    }
  }
  
  // Advantages Analysis
  const advantages = {
    lease: [
      'Lower monthly payments',
      'Minimal down payment required',
      'Warranty coverage during lease term',
      'No depreciation risk',
      'Easier to upgrade to newer models',
      'Potential tax benefits for business use'
    ],
    buy: [
      'Build equity and ownership',
      'No mileage restrictions',
      'Freedom to modify',
      'No wear and tear charges',
      'Long-term cost savings',
      'Asset can be sold anytime'
    ]
  };
  
  // Risk Factors
  const riskFactors = {
    lease: [
      'No equity building',
      'Mileage restrictions and penalties',
      'Wear and tear charges',
      'Early termination fees',
      'Continuous monthly payments',
      'Gap insurance may be needed'
    ],
    buy: [
      'Higher upfront costs',
      'Depreciation risk',
      'Maintenance costs after warranty',
      'Loan interest payments',
      'Resale value uncertainty',
      'Technology obsolescence risk'
    ]
  };
  
  // Summary Generation
  const generateSummary = () => {
    if (analysisMode === 'lease-vs-buy') {
      if (recommendation === 'lease') {
        return {
          recommendation: 'Leasing is recommended',
          reasoning: `Leasing saves approximately ${formatCurrency(Math.abs(costDifference!))} over ${leaseTerm} months with lower monthly payments and reduced upfront costs.`,
          keyFactors: [
            `Monthly payment: ${formatCurrency(monthlyPayment)} vs ${formatCurrency(loanMonthlyPayment!)} (purchase)`,
            `Total cost difference: ${formatCurrency(Math.abs(costDifference!))} in favor of leasing`,
            'Lower upfront investment required',
            'Warranty coverage throughout lease term'
          ]
        };
      } else if (recommendation === 'buy') {
        return {
          recommendation: 'Purchasing is recommended',
          reasoning: `Buying saves approximately ${formatCurrency(costDifference!)} over the long term and builds equity in the asset.`,
          keyFactors: [
            `Total savings: ${formatCurrency(costDifference!)} by purchasing`,
            'Build equity and ownership',
            'No restrictions on usage',
            'Long-term financial benefits'
          ]
        };
      } else {
        return {
          recommendation: 'Both options are comparable',
          reasoning: 'The financial difference between leasing and buying is minimal. Consider personal preferences and usage patterns.',
          keyFactors: [
            `Cost difference: ${formatCurrency(Math.abs(costDifference!))}`,
            'Decision should be based on lifestyle factors',
            'Consider usage patterns and preferences',
            'Evaluate tax implications for your situation'
          ]
        };
      }
    } else {
      return {
        recommendation: `Lease analysis for ${inputs.leaseType}`,
        reasoning: `Monthly payment of ${formatCurrency(monthlyPayment)} for ${leaseTerm} months with ${(residualValue)}% residual value.`,
        keyFactors: [
          `Total lease cost: ${formatCurrency(totalLeaseCost)}`,
          `Effective monthly rate: ${effectiveMonthlyRate.toFixed(2)}%`,
          `Lease-to-value ratio: ${(leaseToValueRatio * 100).toFixed(1)}%`,
          `Depreciation coverage: ${formatCurrency(depreciation)}`
        ]
      };
    }
  };
  
  return {
    totalLeasePayments,
    totalLeaseCost,
    effectiveMonthlyRate,
    loanMonthlyPayment,
    totalLoanPayments,
    totalPurchaseCost,
    totalInterestPaid,
    costDifference,
    recommendation,
    breakEvenPoint,
    leaseToValueRatio,
    residualValueAmount,
    depreciation,
    advantages,
    riskFactors,
    summary: generateSummary()
  };
};

const leasePresets = [
  {
    name: 'New Car Lease',
    inputs: {
      assetValue: 30000,
      leaseType: 'auto' as const,
      analysisMode: 'lease-vs-buy' as const,
      leaseTerm: 36,
      monthlyPayment: 350,
      downPayment: 2000,
      securityDeposit: 0,
      residualValue: 60,
      purchasePrice: 30000,
      loanTerm: 60,
      interestRate: 4.5,
      purchaseDownPayment: 5000,
      maintenanceCost: 50,
      insuranceCost: 150,
      taxRate: 8.25
    }
  },
  {
    name: 'Equipment Lease',
    inputs: {
      assetValue: 50000,
      leaseType: 'equipment' as const,
      analysisMode: 'lease-only' as const,
      leaseTerm: 48,
      monthlyPayment: 1200,
      downPayment: 5000,
      securityDeposit: 2400,
      residualValue: 25,
      purchasePrice: 50000,
      loanTerm: 60,
      interestRate: 6.0,
      purchaseDownPayment: 10000,
      maintenanceCost: 200,
      insuranceCost: 100,
      taxRate: 8.25
    }
  },
  {
    name: 'Commercial Real Estate',
    inputs: {
      assetValue: 500000,
      leaseType: 'real-estate' as const,
      analysisMode: 'lease-vs-buy' as const,
      leaseTerm: 120,
      monthlyPayment: 8500,
      downPayment: 25000,
      securityDeposit: 17000,
      residualValue: 80,
      purchasePrice: 500000,
      loanTerm: 240,
      interestRate: 5.5,
      purchaseDownPayment: 100000,
      maintenanceCost: 1500,
      insuranceCost: 800,
      taxRate: 8.25
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
  return `${rate.toFixed(2)}%`;
}

export default function LeaseCalculator() {
  const [inputs, setInputs] = useState<LeaseInputs>({
    assetValue: 30000,
    leaseType: 'auto',
    analysisMode: 'lease-vs-buy',
    leaseTerm: 36,
    monthlyPayment: 350,
    downPayment: 2000,
    securityDeposit: 0,
    residualValue: 60,
    purchasePrice: 30000,
    loanTerm: 60,
    interestRate: 4.5,
    purchaseDownPayment: 5000,
    maintenanceCost: 50,
    insuranceCost: 150,
    taxRate: 8.25
  });

  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [scenarioName, setScenarioName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => {
    return calculateLease(inputs);
  }, [inputs]);

  const updateInput = (field: keyof LeaseInputs, value: string | number | LeaseType | AnalysisMode) => {
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
    calculatorPath: '/lease-calculator',
    getShareParams: () => ({
      asset: inputs.assetValue.toString(),
      term: inputs.leaseTerm.toString(),
      payment: inputs.monthlyPayment.toString(),
      type: inputs.leaseType,
      mode: inputs.analysisMode
    }),
    getShareText: () => {
      if (!result) return 'Check out this lease analysis!';
      if (inputs.analysisMode === 'lease-vs-buy') {
        return `Lease vs Buy Analysis: ${result.recommendation === 'lease' ? 'Leasing' : 'Buying'} recommended. Cost difference: ${formatCurrency(Math.abs(result.costDifference || 0))}`;
      }
      return `Lease Analysis: ${formatCurrency(result.totalLeaseCost)} total cost over ${inputs.leaseTerm} months`;
    },
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid xl:grid-cols-2 gap-8">
        {/* Left Side - Input Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Car className="w-6 h-6 text-blue-500" />
            Lease Calculator
          </h3>

          <div className="space-y-6">
            {/* Asset Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Asset Type</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => updateInput('leaseType', 'auto')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    inputs.leaseType === 'auto'
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Car className="w-5 h-5 mx-auto mb-1" />
                  <div className="font-semibold text-sm">Auto</div>
                </button>
                <button
                  onClick={() => updateInput('leaseType', 'equipment')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    inputs.leaseType === 'equipment'
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Target className="w-5 h-5 mx-auto mb-1" />
                  <div className="font-semibold text-sm">Equipment</div>
                </button>
                <button
                  onClick={() => updateInput('leaseType', 'real-estate')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    inputs.leaseType === 'real-estate'
                      ? 'border-purple-500 bg-purple-50 text-purple-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Home className="w-5 h-5 mx-auto mb-1" />
                  <div className="font-semibold text-sm">Real Estate</div>
                </button>
              </div>
            </div>

            {/* Analysis Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Analysis Mode</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => updateInput('analysisMode', 'lease-only')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    inputs.analysisMode === 'lease-only'
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">Lease Only</div>
                  <div className="text-xs opacity-75">Analyze lease terms</div>
                </button>
                <button
                  onClick={() => updateInput('analysisMode', 'lease-vs-buy')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    inputs.analysisMode === 'lease-vs-buy'
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">Lease vs Buy</div>
                  <div className="text-xs opacity-75">Compare options</div>
                </button>
              </div>
            </div>

            {/* Asset Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asset Value
              </label>
              <input
                type="number"
                value={inputs.assetValue}
                onChange={(e) => updateInput('assetValue', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1000"
                step="1000"
                placeholder="30000"
              />
            </div>

            {/* Lease Terms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lease Term (months)
                </label>
                <input
                  type="number"
                  value={inputs.leaseTerm}
                  onChange={(e) => updateInput('leaseTerm', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="12"
                  max="120"
                  placeholder="36"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Payment
                </label>
                <input
                  type="number"
                  value={inputs.monthlyPayment}
                  onChange={(e) => updateInput('monthlyPayment', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="50"
                  placeholder="350"
                />
              </div>
            </div>

            {/* Down Payment & Fees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment
                </label>
                <input
                  type="number"
                  value={inputs.downPayment}
                  onChange={(e) => updateInput('downPayment', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="500"
                  placeholder="2000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Residual Value (%)
                </label>
                <input
                  type="number"
                  value={inputs.residualValue}
                  onChange={(e) => updateInput('residualValue', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="10"
                  max="90"
                  placeholder="60"
                />
              </div>
            </div>

            {/* Purchase Comparison (if enabled) */}
            {inputs.analysisMode === 'lease-vs-buy' && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Purchase Option</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purchase Price
                    </label>
                    <input
                      type="number"
                      value={inputs.purchasePrice}
                      onChange={(e) => updateInput('purchasePrice', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1000"
                      step="1000"
                      placeholder="30000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      value={inputs.interestRate}
                      onChange={(e) => updateInput('interestRate', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      max="30"
                      step="0.1"
                      placeholder="4.5"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Term (months)
                    </label>
                    <input
                      type="number"
                      value={inputs.loanTerm}
                      onChange={(e) => updateInput('loanTerm', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="12"
                      max="84"
                      placeholder="60"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purchase Down Payment
                    </label>
                    <input
                      type="number"
                      value={inputs.purchaseDownPayment}
                      onChange={(e) => updateInput('purchaseDownPayment', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="500"
                      placeholder="5000"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Presets */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">🎯 Quick Examples</h4>
              <div className="grid grid-cols-1 gap-2">
                {leasePresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setInputs(preset.inputs)}
                    className="p-3 text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-medium text-gray-900">{preset.name}</div>
                    <div className="text-xs text-gray-600">
                      {formatCurrency(preset.inputs.assetValue)} • {preset.inputs.leaseTerm} months • {formatCurrency(preset.inputs.monthlyPayment)}/month
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
                  assetValue: 30000,
                  leaseType: 'auto',
                  analysisMode: 'lease-vs-buy',
                  leaseTerm: 36,
                  monthlyPayment: 350,
                  downPayment: 2000,
                  securityDeposit: 0,
                  residualValue: 60,
                  purchasePrice: 30000,
                  loanTerm: 60,
                  interestRate: 4.5,
                  purchaseDownPayment: 5000,
                  maintenanceCost: 50,
                  insuranceCost: 150,
                  taxRate: 8.25
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
                <Calculator className="w-5 h-5 text-green-600" />
                {inputs.analysisMode === 'lease-vs-buy' ? 'Lease vs Buy Analysis' : 'Lease Analysis'}
              </h4>

              {/* Main Results Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">Monthly Lease Payment</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 break-all">{formatCurrency(inputs.monthlyPayment)}</div>
                  <div className="text-xs text-blue-600">For {inputs.leaseTerm} months</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700 font-medium mb-1">Total Lease Cost</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-900 break-all">{formatCurrency(result.totalLeaseCost)}</div>
                  <div className="text-xs text-green-600">Including all fees</div>
                </div>
              </div>

              {/* Lease vs Buy Comparison */}
              {inputs.analysisMode === 'lease-vs-buy' && result.loanMonthlyPayment && (
                <div className="mb-6">
                  <h5 className="text-lg font-bold text-gray-900 mb-4">💰 Cost Comparison</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h6 className="font-bold text-blue-900 mb-3">🚗 Leasing</h6>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Monthly Payment:</span>
                          <span className="font-bold">{formatCurrency(inputs.monthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Down Payment:</span>
                          <span className="font-bold">{formatCurrency(inputs.downPayment)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Total Cost:</span>
                          <span className="font-bold text-blue-900">{formatCurrency(result.totalLeaseCost)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h6 className="font-bold text-green-900 mb-3">🏦 Buying</h6>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Monthly Payment:</span>
                          <span className="font-bold">{formatCurrency(result.loanMonthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Down Payment:</span>
                          <span className="font-bold">{formatCurrency(inputs.purchaseDownPayment)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Total Cost:</span>
                          <span className="font-bold text-green-900">{formatCurrency(result.totalPurchaseCost!)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recommendation */}
                  <div className="mt-4 p-4 rounded-lg border-2 bg-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                        result.recommendation === 'lease' ? 'bg-blue-600 text-white' :
                        result.recommendation === 'buy' ? 'bg-green-600 text-white' :
                        'bg-yellow-600 text-white'
                      }`}>
                        {result.recommendation === 'lease' ? '🚗 LEASE RECOMMENDED' :
                         result.recommendation === 'buy' ? '🏦 BUY RECOMMENDED' :
                         '⚖️ BOTH OPTIONS VIABLE'}
                      </div>
                      {result.costDifference && (
                        <div className="text-lg font-bold">
                          {result.costDifference > 0 ? 
                            `Buying saves ${formatCurrency(result.costDifference)}` :
                            `Leasing saves ${formatCurrency(Math.abs(result.costDifference))}`
                          }
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 text-sm">{result.summary.reasoning}</p>
                  </div>
                </div>
              )}

              {/* Key Metrics */}
              <div className="mb-6">
                <h5 className="text-lg font-bold text-gray-900 mb-4">📊 Key Metrics</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-700 font-medium mb-1">Residual Value</div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(result.residualValueAmount)}
                    </div>
                    <div className="text-xs text-gray-600">{inputs.residualValue}% of original value</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-700 font-medium mb-1">Total Depreciation</div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(result.depreciation)}
                    </div>
                    <div className="text-xs text-gray-600">Value lost during lease</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-700 font-medium mb-1">Effective Rate</div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatPercentage(result.effectiveMonthlyRate)}
                    </div>
                    <div className="text-xs text-gray-600">Monthly cost rate</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-700 font-medium mb-1">Lease-to-Value</div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatPercentage(result.leaseToValueRatio * 100)}
                    </div>
                    <div className="text-xs text-gray-600">Total cost vs asset value</div>
                  </div>
                </div>
              </div>

              {/* Pros and Cons */}
              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-4">⚖️ Pros & Cons</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h6 className="font-bold text-green-900 mb-2">✅ Leasing Advantages</h6>
                    <ul className="text-green-800 text-sm space-y-1">
                      {result.advantages.lease.slice(0, 4).map((advantage, index) => (
                        <li key={index}>• {advantage}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h6 className="font-bold text-blue-900 mb-2">✅ Buying Advantages</h6>
                    <ul className="text-blue-800 text-sm space-y-1">
                      {result.advantages.buy.slice(0, 4).map((advantage, index) => (
                        <li key={index}>• {advantage}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!result && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-600" />
                Lease Analysis Results
              </h4>
              <div className="text-center text-gray-500 py-8">
                <Car className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p>Enter your lease details to see the analysis</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
