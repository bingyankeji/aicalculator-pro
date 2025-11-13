'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calculator, Building2, TrendingUp, DollarSign, AlertTriangle, CheckCircle, Share2, BarChart3, PieChart as PieChartIcon, Target } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type LoanType = 'term' | 'sba' | 'equipment' | 'working-capital' | 'real-estate';

interface BusinessLoanInputs {
  principal: number;
  annualRate: number;
  termYears: number;
  loanType: LoanType;
  originationFeePercent: number;
  processingFee: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  existingDebtPayments: number;
}

interface LoanResult {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  totalFees: number;
  debtServiceCoverageRatio: number;
  debtToIncomeRatio: number;
  effectiveAPR: number;
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
  chartData: {
    costBreakdown: Array<{ name: string; value: number; color: string }>;
    paymentSchedule: Array<{ month: number; principal: number; interest: number; balance: number }>;
  };
}

// Enhanced business scenarios with more details
const businessScenarios = [
  {
    id: 'restaurant',
    name: "🍽️ Restaurant Startup",
    description: "Equipment financing for new restaurant",
    details: "Kitchen equipment, furniture, POS systems",
    loanType: 'equipment' as LoanType,
    principal: 150000,
    annualRate: 9.5,
    termYears: 7,
    monthlyRevenue: 45000,
    monthlyExpenses: 38000,
    industry: "Food & Beverage",
    riskProfile: "Medium",
    benefits: ["Lower rates for equipment", "Equipment as collateral", "Longer terms available"]
  },
  {
    id: 'sba',
    name: "🏛️ SBA Working Capital",
    description: "SBA 7(a) loan for business operations",
    details: "Inventory, payroll, marketing expansion",
    loanType: 'sba' as LoanType,
    principal: 250000,
    annualRate: 8.0,
    termYears: 5,
    monthlyRevenue: 75000,
    monthlyExpenses: 62000,
    industry: "General Business",
    riskProfile: "Low",
    benefits: ["Government backing", "Lower down payment", "Competitive rates"]
  },
  {
    id: 'realestate',
    name: "🏢 Commercial Real Estate",
    description: "Property acquisition financing",
    details: "Office building, warehouse, retail space",
    loanType: 'real-estate' as LoanType,
    principal: 800000,
    annualRate: 6.5,
    termYears: 20,
    monthlyRevenue: 95000,
    monthlyExpenses: 72000,
    industry: "Real Estate",
    riskProfile: "Low",
    benefits: ["Property appreciation", "Tax benefits", "Long-term financing"]
  },
  {
    id: 'tech',
    name: "💻 Tech Startup Growth",
    description: "Working capital for scaling",
    details: "Hiring, software development, marketing",
    loanType: 'working-capital' as LoanType,
    principal: 100000,
    annualRate: 12.0,
    termYears: 3,
    monthlyRevenue: 35000,
    monthlyExpenses: 28000,
    industry: "Technology",
    riskProfile: "High",
    benefits: ["Fast approval", "Flexible use", "Growth funding"]
  },
  {
    id: 'manufacturing',
    name: "🏭 Manufacturing Expansion",
    description: "Equipment for production scaling",
    details: "New machinery, facility upgrades",
    loanType: 'equipment' as LoanType,
    principal: 500000,
    annualRate: 7.5,
    termYears: 10,
    monthlyRevenue: 120000,
    monthlyExpenses: 95000,
    industry: "Manufacturing",
    riskProfile: "Medium",
    benefits: ["Equipment collateral", "Tax depreciation", "Production efficiency"]
  },
  {
    id: 'retail',
    name: "🛍️ Retail Store Expansion",
    description: "New location opening",
    details: "Lease deposits, inventory, fixtures",
    loanType: 'term' as LoanType,
    principal: 200000,
    annualRate: 8.75,
    termYears: 5,
    monthlyRevenue: 55000,
    monthlyExpenses: 42000,
    industry: "Retail",
    riskProfile: "Medium",
    benefits: ["Revenue diversification", "Market expansion", "Brand growth"]
  }
];

function calculateMonthlyPayment(principal: number, annualRate: number, termYears: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = termYears * 12;
  
  if (monthlyRate === 0) return principal / totalPayments;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
         (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function generatePaymentSchedule(principal: number, annualRate: number, termYears: number, monthlyPayment: number) {
  const schedule = [];
  const monthlyRate = annualRate / 100 / 12;
  let balance = principal;
  
  for (let month = 1; month <= Math.min(termYears * 12, 60); month++) { // Show first 5 years max
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance = Math.max(0, balance - principalPayment);
    
    schedule.push({
      month,
      principal: principalPayment,
      interest: interestPayment,
      balance
    });
    
    if (balance <= 0) break;
  }
  
  return schedule;
}

export default function BusinessLoanCalculator() {
  const [inputs, setInputs] = useState<BusinessLoanInputs>({
    principal: 250000,
    annualRate: 8.5,
    termYears: 5,
    loanType: 'term',
    originationFeePercent: 2.0,
    processingFee: 500,
    monthlyRevenue: 75000,
    monthlyExpenses: 60000,
    existingDebtPayments: 2500,
  });

  const resultRef = useRef<HTMLDivElement>(null);

  // Calculate loan results with enhanced analytics
  const result = useMemo(() => {
    const monthlyPayment = calculateMonthlyPayment(inputs.principal, inputs.annualRate, inputs.termYears);
    const totalPayments = inputs.termYears * 12;
    const totalInterest = (monthlyPayment * totalPayments) - inputs.principal;
    
    const originationFee = inputs.principal * (inputs.originationFeePercent / 100);
    const totalFees = originationFee + inputs.processingFee;
    const totalCost = inputs.principal + totalInterest + totalFees;
    
    const monthlyNetIncome = inputs.monthlyRevenue - inputs.monthlyExpenses;
    const totalMonthlyDebt = monthlyPayment + inputs.existingDebtPayments;
    const debtServiceCoverageRatio = monthlyNetIncome / monthlyPayment;
    const debtToIncomeRatio = (totalMonthlyDebt / inputs.monthlyRevenue) * 100;
    
    const effectiveAPR = ((totalInterest + totalFees) / inputs.principal / inputs.termYears) * 100;
    
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (debtServiceCoverageRatio < 1.25 || debtToIncomeRatio > 40) {
      riskLevel = 'high';
    } else if (debtServiceCoverageRatio < 1.5 || debtToIncomeRatio > 30) {
      riskLevel = 'medium';
    }
    
    const recommendations: string[] = [];
    
    if (debtServiceCoverageRatio < 1.25) {
      recommendations.push('⚠️ Low debt service coverage ratio. Consider increasing revenue or reducing expenses.');
    } else if (debtServiceCoverageRatio > 2.0) {
      recommendations.push('✅ Excellent debt service coverage ratio. Strong ability to service debt.');
    }
    
    if (debtToIncomeRatio > 40) {
      recommendations.push('🔴 High debt-to-income ratio. May face difficulty qualifying for additional credit.');
    } else if (debtToIncomeRatio < 25) {
      recommendations.push('💚 Conservative debt-to-income ratio. Good financial position.');
    }
    
    if (inputs.loanType === 'sba' && inputs.principal <= 500000) {
      recommendations.push('🏛️ SBA loan may offer better terms and lower down payment requirements.');
    }

    if (inputs.loanType === 'equipment') {
      recommendations.push('🔧 Equipment loans typically offer lower rates as equipment serves as collateral.');
    }

    // Generate chart data
    const costBreakdown = [
      { name: 'Principal', value: inputs.principal, color: '#3B82F6' },
      { name: 'Interest', value: totalInterest, color: '#10B981' },
      { name: 'Fees', value: totalFees, color: '#F59E0B' }
    ];

    const paymentSchedule = generatePaymentSchedule(inputs.principal, inputs.annualRate, inputs.termYears, monthlyPayment);

    return {
      monthlyPayment,
      totalInterest,
      totalCost,
      totalFees,
      debtServiceCoverageRatio,
      debtToIncomeRatio,
      effectiveAPR,
      recommendations,
      riskLevel,
      chartData: {
        costBreakdown,
        paymentSchedule
      }
    } as LoanResult;
  }, [inputs]);

  const loadScenario = (scenario: typeof businessScenarios[0]) => {
    setInputs(prev => ({
      ...prev,
      loanType: scenario.loanType,
      principal: scenario.principal,
      annualRate: scenario.annualRate,
      termYears: scenario.termYears,
      monthlyRevenue: scenario.monthlyRevenue,
      monthlyExpenses: scenario.monthlyExpenses,
    }));
  };

  const updateInput = (field: keyof BusinessLoanInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/business-loan-calculator',
    getShareParams: () => ({
      principal: inputs.principal.toString(),
      rate: inputs.annualRate.toString(),
      term: inputs.termYears.toString(),
      type: inputs.loanType,
    }),
    getShareText: () => {
      const payment = formatCurrency(result.monthlyPayment);
      return `Business Loan: ${formatCurrency(inputs.principal)} at ${inputs.annualRate}% for ${inputs.termYears} years = ${payment}/month`;
    },
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              Business Loan Calculator
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
                <input
                  type="number"
                  value={inputs.principal}
                  onChange={(e) => updateInput('principal', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={0}
                  step="1000"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Rate (%)</label>
                  <input
                    type="number"
                    value={inputs.annualRate}
                    onChange={(e) => updateInput('annualRate', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={0}
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Term (years)</label>
                  <input
                    type="number"
                    value={inputs.termYears}
                    onChange={(e) => updateInput('termYears', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={0.5}
                    step="0.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Type</label>
                <select
                  value={inputs.loanType}
                  onChange={(e) => updateInput('loanType', e.target.value as LoanType)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="term">Term Loan</option>
                  <option value="sba">SBA Loan</option>
                  <option value="equipment">Equipment Loan</option>
                  <option value="working-capital">Working Capital</option>
                  <option value="real-estate">Real Estate Loan</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Origination Fee (%)</label>
                  <input
                    type="number"
                    value={inputs.originationFeePercent}
                    onChange={(e) => updateInput('originationFeePercent', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={0}
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Processing Fee</label>
                  <input
                    type="number"
                    value={inputs.processingFee}
                    onChange={(e) => updateInput('processingFee', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={0}
                    step="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Revenue</label>
                  <input
                    type="number"
                    value={inputs.monthlyRevenue}
                    onChange={(e) => updateInput('monthlyRevenue', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={0}
                    step="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Expenses</label>
                  <input
                    type="number"
                    value={inputs.monthlyExpenses}
                    onChange={(e) => updateInput('monthlyExpenses', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={0}
                    step="1000"
                  />
                </div>
              </div>

              <div className="flex gap-3 flex-wrap pt-4">
                <button
                  onClick={() => setInputs({
                    principal: 250000,
                    annualRate: 8.5,
                    termYears: 5,
                    loanType: 'term',
                    originationFeePercent: 2.0,
                    processingFee: 500,
                    monthlyRevenue: 75000,
                    monthlyExpenses: 60000,
                    existingDebtPayments: 2500,
                  })}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Reset
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Business Scenarios */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              🎯 Industry Scenarios
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Select a business scenario to instantly load realistic loan parameters and see industry-specific insights.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {businessScenarios.map((scenario, index) => (
                <div 
                  key={index} 
                  className="group bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer" 
                  onClick={() => loadScenario(scenario)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold text-indigo-900">{scenario.name}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      scenario.riskProfile === 'Low' ? 'bg-green-100 text-green-700' :
                      scenario.riskProfile === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {scenario.riskProfile} Risk
                    </div>
                  </div>
                  <div className="text-sm text-indigo-700 mb-2">{scenario.description}</div>
                  <div className="text-xs text-indigo-600 font-mono mb-2 bg-white px-2 py-1 rounded">
                    {formatCurrency(scenario.principal)} • {scenario.annualRate}% • {scenario.termYears}y
                  </div>
                  <div className="text-xs text-indigo-600">
                    <strong>Industry:</strong> {scenario.industry}
                  </div>
                  <div className="text-xs text-indigo-600 mt-1">
                    <strong>Benefits:</strong> {scenario.benefits.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Results Section */}
        <div className="space-y-6">
          <div ref={resultRef} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-green-600" />
              Loan Analysis Results
            </h4>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-700 font-medium mb-1">Monthly Payment</div>
                <div className="text-2xl font-bold text-blue-900">{formatCurrency(result.monthlyPayment)}</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <div className="text-sm text-green-700 font-medium mb-1">Total Interest</div>
                <div className="text-2xl font-bold text-green-900">{formatCurrency(result.totalInterest)}</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                <div className="text-sm text-purple-700 font-medium mb-1">Total Cost</div>
                <div className="text-2xl font-bold text-purple-900">{formatCurrency(result.totalCost)}</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                <div className="text-sm text-orange-700 font-medium mb-1">Effective APR</div>
                <div className="text-2xl font-bold text-orange-900">{result.effectiveAPR.toFixed(2)}%</div>
              </div>
            </div>

            {/* Cost Breakdown Chart */}
            <div className="mb-6">
              <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <PieChartIcon className="w-4 h-4" />
                Cost Breakdown
              </h5>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  {result.chartData.costBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(item.value)}</div>
                        <div className="text-xs text-gray-500">
                          {((item.value / result.totalCost) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Financial Ratios */}
            <div className="mb-6">
              <h5 className="text-lg font-bold text-gray-900 mb-4">💼 Financial Analysis</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border ${result.riskLevel === 'low' ? 'bg-green-50 border-green-200' : result.riskLevel === 'medium' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="text-sm font-medium mb-1">Debt Service Coverage</div>
                  <div className="text-2xl font-bold">{result.debtServiceCoverageRatio.toFixed(2)}</div>
                  <div className="text-xs mt-1">
                    {result.debtServiceCoverageRatio >= 1.5 ? '✅ Strong' : result.debtServiceCoverageRatio >= 1.25 ? '⚠️ Adequate' : '🔴 Weak'}
                  </div>
                </div>
                <div className={`p-4 rounded-lg border ${result.debtToIncomeRatio <= 25 ? 'bg-green-50 border-green-200' : result.debtToIncomeRatio <= 40 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="text-sm font-medium mb-1">Debt-to-Income</div>
                  <div className="text-2xl font-bold">{result.debtToIncomeRatio.toFixed(1)}%</div>
                  <div className="text-xs mt-1">
                    {result.debtToIncomeRatio <= 25 ? '✅ Conservative' : result.debtToIncomeRatio <= 40 ? '⚠️ Moderate' : '🔴 High'}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Schedule Preview */}
            <div className="mb-6">
              <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Payment Schedule (First 12 Months)
              </h5>
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                <div className="space-y-2">
                  {result.chartData.paymentSchedule.slice(0, 12).map((payment, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div className="font-medium">Month {payment.month}</div>
                      <div className="flex gap-4 text-xs">
                        <span>Principal: {formatCurrency(payment.principal)}</span>
                        <span>Interest: {formatCurrency(payment.interest)}</span>
                        <span className="font-medium">Balance: {formatCurrency(payment.balance)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-4">💡 Smart Recommendations</h5>
                <div className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-blue-700 text-sm">{rec}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal} 
        onClose={closeShareModal} 
        shareUrl={shareUrl} 
        shareText={shareText} 
        calculatorName="Business Loan Calculator" 
      />
    </div>
  );
}
