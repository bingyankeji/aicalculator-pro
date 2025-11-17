'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Info, Download, Printer, Share2, DollarSign, TrendingUp, AlertCircle, Calculator } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import html2canvas from 'html2canvas';

interface AffordabilityInputs {
  annualIncome: string;
  monthlyDebt: string;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
  propertyTax: string;
  homeInsurance: string;
  hoaFees: string;
  creditScore: string;
}

interface AffordabilityResults {
  maxHomePrice: number;
  maxMonthlyPayment: number;
  maxLoanAmount: number;
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  frontEndDTI: number;
  backEndDTI: number;
  recommendedDownPayment: number;
  closingCosts: number;
  emergencyFund: number;
  totalCashNeeded: number;
  monthlyIncome: number;
  remainingMonthlyIncome: number;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function HomeAffordabilityCalculator() {
  const [inputs, setInputs] = useState<AffordabilityInputs>({
    annualIncome: '75000',
    monthlyDebt: '500',
    downPayment: '15000',
    interestRate: '7.0',
    loanTerm: '30',
    propertyTax: '1.2',
    homeInsurance: '1200',
    hoaFees: '0',
    creditScore: '700',
  });

  const [results, setResults] = useState<AffordabilityResults | null>(null);

  const calculateAffordability = () => {
    const annualIncome = parseFloat(inputs.annualIncome) || 0;
    const monthlyDebt = parseFloat(inputs.monthlyDebt) || 0;
    const downPayment = parseFloat(inputs.downPayment) || 0;
    const interestRate = parseFloat(inputs.interestRate) || 0;
    const loanTerm = parseFloat(inputs.loanTerm) || 30;
    const propertyTax = parseFloat(inputs.propertyTax) || 0;
    const homeInsurance = parseFloat(inputs.homeInsurance) || 0;
    const hoaFees = parseFloat(inputs.hoaFees) || 0;

    const monthlyIncome = annualIncome / 12;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    // 28/36 Rule: Front-end ratio (housing) <= 28%, Back-end ratio (total debt) <= 36%
    const maxFrontEndPayment = monthlyIncome * 0.28;
    const maxBackEndPayment = monthlyIncome * 0.36;
    
    // Maximum monthly payment considering existing debt
    const maxMonthlyPayment = Math.min(maxFrontEndPayment, maxBackEndPayment - monthlyDebt);

    // Calculate monthly property tax and insurance
    const estimatedHomePrice = 300000; // Initial estimate for calculation
    const monthlyPropertyTax = (estimatedHomePrice * (propertyTax / 100)) / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyHOA = hoaFees;

    // Available for principal & interest
    const availableForPI = maxMonthlyPayment - monthlyPropertyTax - monthlyInsurance - monthlyHOA;

    // Calculate maximum loan amount using mortgage formula
    let maxLoanAmount = 0;
    if (monthlyRate > 0) {
      maxLoanAmount = availableForPI * ((Math.pow(1 + monthlyRate, numPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, numPayments)));
    } else {
      maxLoanAmount = availableForPI * numPayments;
    }

    // Maximum home price
    const maxHomePrice = maxLoanAmount + downPayment;

    // Recalculate with actual home price
    const actualMonthlyPropertyTax = (maxHomePrice * (propertyTax / 100)) / 12;
    const actualAvailableForPI = maxMonthlyPayment - actualMonthlyPropertyTax - monthlyInsurance - monthlyHOA;

    let actualMaxLoanAmount = 0;
    if (monthlyRate > 0) {
      actualMaxLoanAmount = actualAvailableForPI * ((Math.pow(1 + monthlyRate, numPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, numPayments)));
    } else {
      actualMaxLoanAmount = actualAvailableForPI * numPayments;
    }

    const actualMaxHomePrice = actualMaxLoanAmount + downPayment;

    // Calculate monthly P&I
    let monthlyPI = 0;
    if (monthlyRate > 0) {
      monthlyPI = actualMaxLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      monthlyPI = actualMaxLoanAmount / numPayments;
    }

    const totalMonthlyPayment = monthlyPI + actualMonthlyPropertyTax + monthlyInsurance + monthlyHOA;

    // DTI calculations
    const frontEndDTI = (totalMonthlyPayment / monthlyIncome) * 100;
    const backEndDTI = ((totalMonthlyPayment + monthlyDebt) / monthlyIncome) * 100;

    // Recommended down payment (20% to avoid PMI)
    const recommendedDownPayment = actualMaxHomePrice * 0.20;

    // Closing costs (2-5% of home price, average 3.5%)
    const closingCosts = actualMaxHomePrice * 0.035;

    // Emergency fund (3-6 months of expenses, use 6 months)
    const emergencyFund = totalMonthlyPayment * 6;

    // Total cash needed
    const totalCashNeeded = downPayment + closingCosts + emergencyFund;

    // Remaining monthly income
    const remainingMonthlyIncome = monthlyIncome - totalMonthlyPayment - monthlyDebt;

    setResults({
      maxHomePrice: actualMaxHomePrice,
      maxMonthlyPayment,
      maxLoanAmount: actualMaxLoanAmount,
      monthlyPrincipalInterest: monthlyPI,
      monthlyPropertyTax: actualMonthlyPropertyTax,
      monthlyInsurance,
      monthlyHOA,
      totalMonthlyPayment,
      frontEndDTI,
      backEndDTI,
      recommendedDownPayment,
      closingCosts,
      emergencyFund,
      totalCashNeeded,
      monthlyIncome,
      remainingMonthlyIncome,
    });
  };

  const handleInputChange = (field: keyof AffordabilityInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  const shareCalculation = () => {
    const params = new URLSearchParams({
      income: inputs.annualIncome,
      debt: inputs.monthlyDebt,
      down: inputs.downPayment,
      rate: inputs.interestRate,
      term: inputs.loanTerm,
    });
    
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Home Affordability Calculator Results',
        text: `I can afford a home up to ${formatCurrency(results?.maxHomePrice || 0)}`,
        url: url,
      }).catch(() => {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const saveAsImage = async () => {
    const element = document.getElementById('affordability-results');
    if (element) {
      const canvas = await html2canvas(element, { scale: 2 });
      const link = document.createElement('a');
      link.download = 'home-affordability-results.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const printResults = () => {
    window.print();
  };

  const getDTIStatus = (dti: number) => {
    if (dti <= 28) return { text: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' };
    if (dti <= 36) return { text: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (dti <= 43) return { text: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { text: 'High Risk', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const monthlyBreakdownData = results ? [
    { name: 'Principal & Interest', value: results.monthlyPrincipalInterest },
    { name: 'Property Tax', value: results.monthlyPropertyTax },
    { name: 'Home Insurance', value: results.monthlyInsurance },
    { name: 'HOA Fees', value: results.monthlyHOA },
  ].filter(item => item.value > 0) : [];

  const budgetComparisonData = results ? [
    { name: 'Conservative', price: results.maxHomePrice * 0.8 },
    { name: 'Moderate', price: results.maxHomePrice * 0.9 },
    { name: 'Maximum', price: results.maxHomePrice },
  ] : [];

  const frontEndStatus = results ? getDTIStatus(results.frontEndDTI) : null;
  const backEndStatus = results ? getDTIStatus(results.backEndDTI) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 直接开始计算器内容，标题在page.tsx中用sr-only隐藏 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                Your Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Annual Income - 按照CLAUDE.md规范 */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="annualIncome" className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                  Annual Income
                  <Info className="h-3 w-3 ml-1 text-gray-400" />
                </Label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="annualIncome"
                    type="number"
                    inputMode="decimal"
                    value={inputs.annualIncome}
                    onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                    className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Monthly Debt */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="monthlyDebt" className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                  Monthly Debt
                  <Info className="h-3 w-3 ml-1 text-gray-400" />
                </Label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="monthlyDebt"
                    type="number"
                    inputMode="decimal"
                    value={inputs.monthlyDebt}
                    onChange={(e) => handleInputChange('monthlyDebt', e.target.value)}
                    className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Down Payment */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="downPayment" className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                  Down Payment
                  <Info className="h-3 w-3 ml-1 text-gray-400" />
                </Label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="downPayment"
                    type="number"
                    inputMode="decimal"
                    value={inputs.downPayment}
                    onChange={(e) => handleInputChange('downPayment', e.target.value)}
                    className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Interest Rate */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="interestRate" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                  Interest Rate
                </Label>
                <div className="relative w-full">
                  <Input
                    id="interestRate"
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    value={inputs.interestRate}
                    onChange={(e) => handleInputChange('interestRate', e.target.value)}
                    className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              {/* Loan Term */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="loanTerm" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                  Loan Term
                </Label>
                <select
                  id="loanTerm"
                  value={inputs.loanTerm}
                  onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="30">30 years</option>
                </select>
              </div>

              {/* Property Tax Rate */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="propertyTax" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                  Property Tax
                </Label>
                <div className="relative w-full">
                  <Input
                    id="propertyTax"
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    value={inputs.propertyTax}
                    onChange={(e) => handleInputChange('propertyTax', e.target.value)}
                    className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              {/* Home Insurance */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="homeInsurance" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                  Insurance/Year
                </Label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="homeInsurance"
                    type="number"
                    inputMode="decimal"
                    value={inputs.homeInsurance}
                    onChange={(e) => handleInputChange('homeInsurance', e.target.value)}
                    className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* HOA Fees */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="hoaFees" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                  HOA Fees
                </Label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="hoaFees"
                    type="number"
                    inputMode="decimal"
                    value={inputs.hoaFees}
                    onChange={(e) => handleInputChange('hoaFees', e.target.value)}
                    className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Credit Score */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="creditScore" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                  Credit Score
                </Label>
                <Input
                  id="creditScore"
                  type="number"
                  inputMode="decimal"
                  value={inputs.creditScore}
                  onChange={(e) => handleInputChange('creditScore', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Calculate Button */}
              <Button 
                onClick={calculateAffordability}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 text-sm sm:text-base min-h-[44px] font-medium"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Affordability
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          {!results ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Calculate</h3>
                <p className="text-gray-500">Enter your financial information and click "Calculate Affordability" to see your results.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div id="affordability-results">
                {/* Maximum Home Price */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Your Home Buying Budget</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-center mb-6">
                      <p className="text-sm sm:text-base text-gray-600 mb-2">Maximum Home Price You Can Afford</p>
                      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-green-600 break-all">
                        {formatCurrency(results.maxHomePrice)}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-2">
                        With {formatCurrency(parseFloat(inputs.downPayment))} down payment
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Maximum Loan Amount</p>
                        <p className="text-xl sm:text-2xl font-bold text-blue-600 break-all">
                          {formatCurrency(results.maxLoanAmount)}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Monthly Payment</p>
                        <p className="text-xl sm:text-2xl font-bold text-purple-600 break-all">
                          {formatCurrency(results.totalMonthlyPayment)}
                        </p>
                      </div>
                    </div>

                    {/* Budget Range Chart */}
                    <div className="mb-6">
                      <h3 className="text-base sm:text-lg font-semibold mb-3">Budget Range Recommendations</h3>
                      <ResponsiveContainer width="100%" height={200} minHeight={180}>
                        <BarChart data={budgetComparisonData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Bar dataKey="price" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* DTI Ratios */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                      Debt-to-Income Ratios (28/36 Rule)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className={`p-4 rounded-lg ${frontEndStatus?.bg}`}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-gray-700">Front-End DTI</p>
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${frontEndStatus?.color} bg-white`}>
                            {frontEndStatus?.text}
                          </span>
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold">{formatPercent(results.frontEndDTI)}</p>
                        <p className="text-xs text-gray-600 mt-1">Housing costs / Income (Target: ≤28%)</p>
                      </div>
                      <div className={`p-4 rounded-lg ${backEndStatus?.bg}`}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-gray-700">Back-End DTI</p>
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${backEndStatus?.color} bg-white`}>
                            {backEndStatus?.text}
                          </span>
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold">{formatPercent(results.backEndDTI)}</p>
                        <p className="text-xs text-gray-600 mt-1">All debts / Income (Target: ≤36%)</p>
                      </div>
                    </div>

                    {(results.frontEndDTI > 28 || results.backEndDTI > 36) && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-red-800 mb-1">DTI Warning</p>
                          <p className="text-xs text-red-700">
                            Your debt-to-income ratio exceeds recommended limits. Consider reducing debt or increasing income before buying.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Monthly Payment Breakdown */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Monthly Payment Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <ResponsiveContainer width="100%" height={200} minHeight={180}>
                          <PieChart>
                            <Pie
                              data={monthlyBreakdownData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={(entry) => `${entry.name}: ${formatCurrency(entry.value)}`}
                              outerRadius={60}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {monthlyBreakdownData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-sm text-gray-600">Principal & Interest</span>
                          <span className="font-semibold">{formatCurrency(results.monthlyPrincipalInterest)}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-sm text-gray-600">Property Tax</span>
                          <span className="font-semibold">{formatCurrency(results.monthlyPropertyTax)}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-sm text-gray-600">Home Insurance</span>
                          <span className="font-semibold">{formatCurrency(results.monthlyInsurance)}</span>
                        </div>
                        {results.monthlyHOA > 0 && (
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm text-gray-600">HOA Fees</span>
                            <span className="font-semibold">{formatCurrency(results.monthlyHOA)}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center pt-2 border-t-2 border-gray-300">
                          <span className="font-semibold text-gray-900">Total Monthly</span>
                          <span className="font-bold text-lg text-blue-600">{formatCurrency(results.totalMonthlyPayment)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Remaining Monthly Income</span>
                        <span className="font-semibold text-green-600">{formatCurrency(results.remainingMonthlyIncome)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">After housing and debt payments</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Cash Needed */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Total Cash Needed to Buy</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600 mb-2">Total Cash Required</p>
                      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-600 break-all">
                        {formatCurrency(results.totalCashNeeded)}
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Down Payment</span>
                        <span className="font-semibold">{formatCurrency(parseFloat(inputs.downPayment))}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Closing Costs (3.5%)</span>
                        <span className="font-semibold">{formatCurrency(results.closingCosts)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Emergency Fund (6 months)</span>
                        <span className="font-semibold">{formatCurrency(results.emergencyFund)}</span>
                      </div>
                    </div>

                    {parseFloat(inputs.downPayment) < results.recommendedDownPayment && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm font-semibold text-yellow-800 mb-1">💡 Tip: Increase Down Payment</p>
                        <p className="text-xs text-yellow-700">
                          Consider saving {formatCurrency(results.recommendedDownPayment)} (20%) to avoid PMI and get better rates.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <Card className="shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={saveAsImage} className="flex-1 sm:flex-none min-h-[44px]">
                      <Download className="h-4 w-4 mr-2" />
                      Save as Image
                    </Button>
                    <Button onClick={printResults} variant="outline" className="flex-1 sm:flex-none min-h-[44px]">
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <Button onClick={shareCalculation} variant="outline" className="flex-1 sm:flex-none min-h-[44px]">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
