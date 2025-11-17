'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, TrendingUp, DollarSign, Calendar, Percent, Users } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnnuityInputs {
  annuityType: 'fixed' | 'variable' | 'indexed';
  investmentType: 'lumpSum' | 'periodic';
  initialInvestment: string;
  periodicContribution: string;
  contributionFrequency: 'monthly' | 'quarterly' | 'annually';
  expectedGrowthRate: string;
  annuitizationOption: 'lifetime' | 'periodCertain' | 'jointSurvivor';
  annuitizationAge: string;
  periodCertainYears: string;
  jointAge: string;
  managementFee: string;
  mortgageExpenseFee: string;
  surrenderPeriod: string;
  taxRate: string;
  currentAge: string;
}

interface AnnuityResults {
  accumulationPhase: {
    totalContributions: number;
    totalValue: number;
    totalGrowth: number;
    totalFees: number;
    netValue: number;
    yearsOfGrowth: number;
  };
  distributionPhase: {
    monthlyPayment: number;
    annualPayment: number;
    totalPayments: number;
    expectedLifetimeValue: number;
    taxableAmount: number;
    afterTaxPayment: number;
  };
  comparison: {
    annuityValue: number;
    traditionalInvestmentValue: number;
    taxAdvantage: number;
    breakEvenAge: number;
  };
  yearlyBreakdown: Array<{
    year: number;
    age: number;
    contribution: number;
    growth: number;
    fees: number;
    balance: number;
  }>;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function AnnuityCalculator() {
  const [inputs, setInputs] = useState<AnnuityInputs>({
    annuityType: 'fixed',
    investmentType: 'lumpSum',
    initialInvestment: '',
    periodicContribution: '',
    contributionFrequency: 'monthly',
    expectedGrowthRate: '5',
    annuitizationOption: 'lifetime',
    annuitizationAge: '',
    periodCertainYears: '20',
    jointAge: '',
    managementFee: '1.25',
    mortgageExpenseFee: '1.35',
    surrenderPeriod: '7',
    taxRate: '24',
    currentAge: '',
  });

  const [results, setResults] = useState<AnnuityResults | null>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/annuity-calculator',
    getShareParams: () => {
      const params: Record<string, string> = {};
      if (inputs.annuityType) params.type = inputs.annuityType;
      if (inputs.investmentType) params.investmentType = inputs.investmentType;
      if (inputs.initialInvestment) params.initial = inputs.initialInvestment;
      if (inputs.periodicContribution) params.periodic = inputs.periodicContribution;
      if (inputs.expectedGrowthRate) params.growth = inputs.expectedGrowthRate;
      if (inputs.annuitizationOption) params.option = inputs.annuitizationOption;
      if (inputs.annuitizationAge) params.annAge = inputs.annuitizationAge;
      if (inputs.currentAge) params.currentAge = inputs.currentAge;
      return params;
    },
    getShareText: () => {
      if (!results) return 'Check out my annuity analysis!';
      return `My annuity will grow to $${results.accumulationPhase.netValue.toLocaleString()} and provide $${results.distributionPhase.monthlyPayment.toLocaleString()}/month in retirement. Annuity Calculator`;
    },
  });

  const handleInputChange = (field: keyof AnnuityInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateAnnuity = () => {
    const initial = parseFloat(inputs.initialInvestment) || 0;
    const periodic = parseFloat(inputs.periodicContribution) || 0;
    const growthRate = parseFloat(inputs.expectedGrowthRate) / 100 || 0;
    const managementFee = parseFloat(inputs.managementFee) / 100 || 0;
    const meFee = parseFloat(inputs.mortgageExpenseFee) / 100 || 0;
    const totalFeeRate = managementFee + meFee;
    const netGrowthRate = growthRate - totalFeeRate;
    const taxRate = parseFloat(inputs.taxRate) / 100 || 0;
    const currentAge = parseInt(inputs.currentAge) || 30;
    const annuitizationAge = parseInt(inputs.annuitizationAge) || 65;
    const yearsToGrow = Math.max(0, annuitizationAge - currentAge);

    // Accumulation Phase Calculation
    let balance = initial;
    let totalContributions = initial;
    let totalGrowth = 0;
    let totalFees = 0;
    const yearlyBreakdown: Array<{
      year: number;
      age: number;
      contribution: number;
      growth: number;
      fees: number;
      balance: number;
    }> = [];

    const contributionsPerYear = 
      inputs.contributionFrequency === 'monthly' ? 12 :
      inputs.contributionFrequency === 'quarterly' ? 4 : 1;

    for (let year = 1; year <= yearsToGrow; year++) {
      let yearContribution = 0;
      let yearGrowth = 0;
      let yearFees = 0;

      // Add periodic contributions throughout the year
      if (inputs.investmentType === 'periodic') {
        for (let i = 0; i < contributionsPerYear; i++) {
          balance += periodic;
          yearContribution += periodic;
          
          // Growth on balance including new contribution
          const periodGrowth = balance * (netGrowthRate / contributionsPerYear);
          balance += periodGrowth;
          yearGrowth += periodGrowth + (balance * (totalFeeRate / contributionsPerYear));
          
          // Calculate fees
          const periodFees = balance * (totalFeeRate / contributionsPerYear);
          yearFees += periodFees;
        }
      } else {
        // Lump sum: grow entire balance
        const growth = balance * netGrowthRate;
        yearGrowth = growth + (balance * totalFeeRate);
        balance += growth;
        
        const fees = balance * totalFeeRate;
        yearFees = fees;
      }

      totalContributions += yearContribution;
      totalGrowth += yearGrowth;
      totalFees += yearFees;

      yearlyBreakdown.push({
        year,
        age: currentAge + year,
        contribution: yearContribution,
        growth: yearGrowth,
        fees: yearFees,
        balance: balance,
      });
    }

    const netValue = balance;
    const totalValue = balance + totalFees;

    // Distribution Phase Calculation
    let monthlyPayment = 0;
    let totalPayments = 0;
    let expectedLifetimeValue = 0;

    if (inputs.annuitizationOption === 'lifetime') {
      // Lifetime annuity (single life)
      // Using simplified actuarial calculation
      const lifeExpectancy = 85; // Simplified
      const yearsOfPayments = lifeExpectancy - annuitizationAge;
      const monthsOfPayments = yearsOfPayments * 12;
      
      // Calculate monthly payment using present value of annuity formula
      const monthlyRate = growthRate / 12;
      if (monthlyRate > 0) {
        monthlyPayment = (netValue * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -monthsOfPayments));
      } else {
        monthlyPayment = netValue / monthsOfPayments;
      }
      
      totalPayments = monthsOfPayments;
      expectedLifetimeValue = monthlyPayment * totalPayments;
    } else if (inputs.annuitizationOption === 'periodCertain') {
      // Period certain annuity
      const years = parseInt(inputs.periodCertainYears) || 20;
      const monthsOfPayments = years * 12;
      
      const monthlyRate = growthRate / 12;
      if (monthlyRate > 0) {
        monthlyPayment = (netValue * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -monthsOfPayments));
      } else {
        monthlyPayment = netValue / monthsOfPayments;
      }
      
      totalPayments = monthsOfPayments;
      expectedLifetimeValue = monthlyPayment * totalPayments;
    } else {
      // Joint and survivor annuity
      const jointAge = parseInt(inputs.jointAge) || annuitizationAge;
      const lifeExpectancy = Math.max(85, 85 + (jointAge - annuitizationAge));
      const yearsOfPayments = lifeExpectancy - annuitizationAge;
      const monthsOfPayments = yearsOfPayments * 12;
      
      const monthlyRate = growthRate / 12;
      if (monthlyRate > 0) {
        monthlyPayment = (netValue * monthlyRate * 0.9) / (1 - Math.pow(1 + monthlyRate, -monthsOfPayments));
      } else {
        monthlyPayment = (netValue / monthsOfPayments) * 0.9;
      }
      
      totalPayments = monthsOfPayments;
      expectedLifetimeValue = monthlyPayment * totalPayments;
    }

    const annualPayment = monthlyPayment * 12;

    // Tax calculation on distributions
    // Exclusion ratio: (Total contributions / Expected total payments)
    const exclusionRatio = totalContributions / expectedLifetimeValue;
    const taxableAmount = monthlyPayment * (1 - exclusionRatio);
    const afterTaxPayment = monthlyPayment - (taxableAmount * taxRate);

    // Comparison with traditional taxable investment
    let traditionalBalance = initial;
    for (let year = 1; year <= yearsToGrow; year++) {
      if (inputs.investmentType === 'periodic') {
        for (let i = 0; i < contributionsPerYear; i++) {
          traditionalBalance += periodic;
          const periodGrowth = traditionalBalance * (growthRate / contributionsPerYear);
          // Tax on growth each year in taxable account
          const taxOnGrowth = periodGrowth * taxRate;
          traditionalBalance += periodGrowth - taxOnGrowth;
        }
      } else {
        const growth = traditionalBalance * growthRate;
        const taxOnGrowth = growth * taxRate;
        traditionalBalance += growth - taxOnGrowth;
      }
    }

    const taxAdvantage = netValue - traditionalBalance;

    // Calculate break-even age (simplified)
    const monthlyFromTraditional = (traditionalBalance * (growthRate / 12)) / (1 - Math.pow(1 + (growthRate / 12), -240)); // 20 years
    const extraMonthsNeeded = taxAdvantage / (monthlyPayment - monthlyFromTraditional);
    const breakEvenAge = annuitizationAge + (extraMonthsNeeded / 12);

    setResults({
      accumulationPhase: {
        totalContributions,
        totalValue,
        totalGrowth,
        totalFees,
        netValue,
        yearsOfGrowth: yearsToGrow,
      },
      distributionPhase: {
        monthlyPayment,
        annualPayment,
        totalPayments,
        expectedLifetimeValue,
        taxableAmount,
        afterTaxPayment,
      },
      comparison: {
        annuityValue: netValue,
        traditionalInvestmentValue: traditionalBalance,
        taxAdvantage,
        breakEvenAge,
      },
      yearlyBreakdown: yearlyBreakdown.slice(0, 30), // Limit to 30 years for display
    });
  };

  const handleSaveImage = async () => {
    const element = document.getElementById('annuity-results');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `annuity-analysis-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const canCalculate = inputs.initialInvestment && inputs.expectedGrowthRate && 
                       inputs.annuitizationAge && inputs.currentAge &&
                       (inputs.investmentType === 'lumpSum' || inputs.periodicContribution);

  // Prepare data for charts
  const valueBreakdownData = results ? [
    { name: 'Contributions', value: results.accumulationPhase.totalContributions },
    { name: 'Growth', value: results.accumulationPhase.totalGrowth },
    { name: 'Fees', value: -results.accumulationPhase.totalFees },
  ] : [];

  const comparisonData = results ? [
    { name: 'Tax-Deferred Annuity', value: results.comparison.annuityValue },
    { name: 'Taxable Investment', value: results.comparison.traditionalInvestmentValue },
  ] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Annuity Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Annuity Type */}
              <div className="space-y-2">
                <Label htmlFor="annuityType" className="text-sm font-medium flex items-center gap-1">
                  Annuity Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="annuityType"
                  value={inputs.annuityType}
                  onChange={(e) => handleInputChange('annuityType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="fixed">Fixed Annuity</option>
                  <option value="variable">Variable Annuity</option>
                  <option value="indexed">Indexed Annuity</option>
                </select>
                <p className="text-xs text-gray-500">
                  {inputs.annuityType === 'fixed' && 'Guaranteed fixed return rate'}
                  {inputs.annuityType === 'variable' && 'Returns tied to market performance'}
                  {inputs.annuityType === 'indexed' && 'Returns tied to market index with downside protection'}
                </p>
              </div>

              {/* Investment Type */}
              <div className="space-y-2">
                <Label htmlFor="investmentType" className="text-sm font-medium flex items-center gap-1">
                  Investment Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="investmentType"
                  value={inputs.investmentType}
                  onChange={(e) => handleInputChange('investmentType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="lumpSum">Lump Sum</option>
                  <option value="periodic">Periodic Contributions</option>
                </select>
              </div>

              {/* Initial Investment */}
              <div className="space-y-2">
                <Label htmlFor="initialInvestment" className="text-sm font-medium flex items-center gap-1">
                  Initial Investment ($) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="initialInvestment"
                  type="number"
                  value={inputs.initialInvestment}
                  onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="100000"
                  min="0"
                  step="1000"
                />
              </div>

              {/* Periodic Contribution (if applicable) */}
              {inputs.investmentType === 'periodic' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="periodicContribution" className="text-sm font-medium flex items-center gap-1">
                      Periodic Contribution ($) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="periodicContribution"
                      type="number"
                      value={inputs.periodicContribution}
                      onChange={(e) => handleInputChange('periodicContribution', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="500"
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contributionFrequency" className="text-sm font-medium">
                      Contribution Frequency
                    </Label>
                    <select
                      id="contributionFrequency"
                      value={inputs.contributionFrequency}
                      onChange={(e) => handleInputChange('contributionFrequency', e.target.value as any)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                    </select>
                  </div>
                </>
              )}

              {/* Ages */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="currentAge" className="text-sm font-medium flex items-center gap-1">
                    Current Age <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="currentAge"
                    type="number"
                    value={inputs.currentAge}
                    onChange={(e) => handleInputChange('currentAge', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="30"
                    min="18"
                    max="100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annuitizationAge" className="text-sm font-medium flex items-center gap-1">
                    Annuitization Age <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="annuitizationAge"
                    type="number"
                    value={inputs.annuitizationAge}
                    onChange={(e) => handleInputChange('annuitizationAge', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="65"
                    min="50"
                    max="100"
                  />
                </div>
              </div>

              {/* Expected Growth Rate */}
              <div className="space-y-2">
                <Label htmlFor="expectedGrowthRate" className="text-sm font-medium flex items-center gap-1">
                  Expected Annual Growth Rate (%) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="expectedGrowthRate"
                  type="number"
                  value={inputs.expectedGrowthRate}
                  onChange={(e) => handleInputChange('expectedGrowthRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="5"
                  min="0"
                  max="20"
                  step="0.1"
                />
                <p className="text-xs text-gray-500">Typical range: 4-8% for conservative to aggressive</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Calendar className="h-5 w-5 text-blue-600" />
                Annuitization Options
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Annuitization Option */}
              <div className="space-y-2">
                <Label htmlFor="annuitizationOption" className="text-sm font-medium flex items-center gap-1">
                  Payout Option <span className="text-red-500">*</span>
                </Label>
                <select
                  id="annuitizationOption"
                  value={inputs.annuitizationOption}
                  onChange={(e) => handleInputChange('annuitizationOption', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="lifetime">Lifetime (Single Life)</option>
                  <option value="periodCertain">Period Certain</option>
                  <option value="jointSurvivor">Joint and Survivor</option>
                </select>
                <p className="text-xs text-gray-500">
                  {inputs.annuitizationOption === 'lifetime' && 'Payments for your lifetime'}
                  {inputs.annuitizationOption === 'periodCertain' && 'Guaranteed payments for fixed period'}
                  {inputs.annuitizationOption === 'jointSurvivor' && 'Payments continue for two lives'}
                </p>
              </div>

              {/* Period Certain Years */}
              {inputs.annuitizationOption === 'periodCertain' && (
                <div className="space-y-2">
                  <Label htmlFor="periodCertainYears" className="text-sm font-medium">
                    Period Certain (Years)
                  </Label>
                  <input
                    id="periodCertainYears"
                    type="number"
                    value={inputs.periodCertainYears}
                    onChange={(e) => handleInputChange('periodCertainYears', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="20"
                    min="5"
                    max="40"
                  />
                  <p className="text-xs text-gray-500">Typical range: 10-30 years</p>
                </div>
              )}

              {/* Joint Age */}
              {inputs.annuitizationOption === 'jointSurvivor' && (
                <div className="space-y-2">
                  <Label htmlFor="jointAge" className="text-sm font-medium">
                    Joint Annuitant Age
                  </Label>
                  <input
                    id="jointAge"
                    type="number"
                    value={inputs.jointAge}
                    onChange={(e) => handleInputChange('jointAge', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="65"
                    min="18"
                    max="100"
                  />
                  <p className="text-xs text-gray-500">Age of spouse or co-annuitant</p>
                </div>
              )}

              {/* Tax Rate */}
              <div className="space-y-2">
                <Label htmlFor="taxRate" className="text-sm font-medium">
                  Tax Rate (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="taxRate"
                  type="number"
                  value={inputs.taxRate}
                  onChange={(e) => handleInputChange('taxRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="24"
                  min="0"
                  max="50"
                  step="1"
                />
                <p className="text-xs text-gray-500">Default: 24% (federal ordinary income rate)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Percent className="h-5 w-5 text-orange-600" />
                Fees & Expenses
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Management Fee */}
              <div className="space-y-2">
                <Label htmlFor="managementFee" className="text-sm font-medium">
                  Management Fee (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="managementFee"
                  type="number"
                  value={inputs.managementFee}
                  onChange={(e) => handleInputChange('managementFee', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="1.25"
                  min="0"
                  max="5"
                  step="0.05"
                />
                <p className="text-xs text-gray-500">Default: 1.25% (typical for variable annuities)</p>
              </div>

              {/* Mortality & Expense Fee */}
              <div className="space-y-2">
                <Label htmlFor="mortgageExpenseFee" className="text-sm font-medium">
                  Mortality & Expense Fee (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="mortgageExpenseFee"
                  type="number"
                  value={inputs.mortgageExpenseFee}
                  onChange={(e) => handleInputChange('mortgageExpenseFee', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="1.35"
                  min="0"
                  max="5"
                  step="0.05"
                />
                <p className="text-xs text-gray-500">Default: 1.35% (M&E charge for insurance features)</p>
              </div>

              {/* Surrender Period */}
              <div className="space-y-2">
                <Label htmlFor="surrenderPeriod" className="text-sm font-medium">
                  Surrender Period (Years) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="surrenderPeriod"
                  type="number"
                  value={inputs.surrenderPeriod}
                  onChange={(e) => handleInputChange('surrenderPeriod', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="7"
                  min="0"
                  max="15"
                />
                <p className="text-xs text-gray-500">Default: 7 years (period with surrender charges)</p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-xs text-gray-700">
                  <strong>Total Annual Fees:</strong> {(parseFloat(inputs.managementFee) + parseFloat(inputs.mortgageExpenseFee)).toFixed(2)}%
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Average annuity fees: 2-3% annually
                </p>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={calculateAnnuity}
            disabled={!canCalculate}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 min-h-[44px] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Annuity
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          {!results ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Enter your annuity details and click Calculate to see your analysis
                </p>
              </CardContent>
            </Card>
          ) : (
            <div id="annuity-results" className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="shadow-lg border-l-4 border-purple-500">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Accumulation Value</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900 break-all">
                          ${results.accumulationPhase.netValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          After {results.accumulationPhase.yearsOfGrowth} years
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-purple-500 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-blue-500">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900 break-all">
                          ${results.distributionPhase.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          ${results.distributionPhase.annualPayment.toLocaleString()} annually
                        </p>
                      </div>
                      <Calendar className="h-8 w-8 text-blue-500 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-green-500">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">After-Tax Payment</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900 break-all">
                          ${results.distributionPhase.afterTaxPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Per month after taxes
                        </p>
                      </div>
                      <Percent className="h-8 w-8 text-green-500 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-orange-500">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tax Advantage</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900 break-all">
                          ${results.comparison.taxAdvantage.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          vs. taxable investment
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-orange-500 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Accumulation Phase Details */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
                  <CardTitle className="text-lg sm:text-xl">Accumulation Phase (Growth Period)</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">Total Contributions</p>
                      <p className="text-xl font-bold text-gray-900">
                        ${results.accumulationPhase.totalContributions.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Growth</p>
                      <p className="text-xl font-bold text-green-600">
                        ${results.accumulationPhase.totalGrowth.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Fees</p>
                      <p className="text-xl font-bold text-red-600">
                        -${results.accumulationPhase.totalFees.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Net Value</p>
                      <p className="text-xl font-bold text-purple-600">
                        ${results.accumulationPhase.netValue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={valueBreakdownData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: $${Math.abs(value).toLocaleString()}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {valueBreakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `$${Math.abs(value).toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Distribution Phase Details */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="text-lg sm:text-xl">Distribution Phase (Payout Period)</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Monthly Payment</span>
                      <span className="text-lg font-bold text-blue-600">
                        ${results.distributionPhase.monthlyPayment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Taxable Amount (per month)</span>
                      <span className="text-lg font-bold text-gray-900">
                        ${results.distributionPhase.taxableAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">After-Tax Payment</span>
                      <span className="text-lg font-bold text-green-600">
                        ${results.distributionPhase.afterTaxPayment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Total Payment Months</span>
                      <span className="text-lg font-bold text-purple-600">
                        {results.distributionPhase.totalPayments.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Expected Lifetime Value</span>
                      <span className="text-lg font-bold text-indigo-600">
                        ${results.distributionPhase.expectedLifetimeValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comparison with Traditional Investment */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                  <CardTitle className="text-lg sm:text-xl">Annuity vs. Taxable Investment</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="h-64 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                        <Bar dataKey="value" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Tax-Deferred Annuity Value</span>
                      <span className="text-lg font-bold text-purple-600">
                        ${results.comparison.annuityValue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Taxable Investment Value</span>
                      <span className="text-lg font-bold text-gray-900">
                        ${results.comparison.traditionalInvestmentValue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Tax Advantage</span>
                      <span className="text-lg font-bold text-green-600">
                        ${results.comparison.taxAdvantage.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Break-Even Age</span>
                      <span className="text-lg font-bold text-blue-600">
                        {results.comparison.breakEvenAge.toFixed(1)} years
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Growth Chart */}
              {results.yearlyBreakdown.length > 0 && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <CardTitle className="text-lg sm:text-xl">Annuity Growth Over Time</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={results.yearlyBreakdown}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="age" label={{ value: 'Age', position: 'insideBottom', offset: -5 }} />
                          <YAxis />
                          <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                          <Legend />
                          <Line type="monotone" dataKey="balance" stroke="#8b5cf6" strokeWidth={2} name="Balance" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <Card className="shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleSaveImage}
                      variant="outline"
                      className="flex-1 min-h-[44px]"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Save as Image
                    </Button>
                    <Button
                      onClick={handlePrint}
                      variant="outline"
                      className="flex-1 min-h-[44px]"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <Button
                      onClick={handleShare}
                      variant="outline"
                      className="flex-1 min-h-[44px]"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
      />
    </div>
  );
}

