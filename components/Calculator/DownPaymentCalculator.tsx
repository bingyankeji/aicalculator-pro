'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Info, Download, Printer, Share2, DollarSign, TrendingUp, Home, Calculator, AlertCircle, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import html2canvas from 'html2canvas';

interface DownPaymentInputs {
  homePrice: string;
  downPaymentPercent: string;
  downPaymentAmount: string;
  currentSavings: string;
  monthlySavings: string;
  savingsInterestRate: string;
  closingCostPercent: string;
  movingCosts: string;
  emergencyFundMonths: string;
  monthlyExpenses: string;
  investmentReturn: string;
  mortgageRate: string;
  loanTerm: string;
  pmiRate: string;
  propertyTax: string;
  homeInsurance: string;
}

interface DownPaymentResults {
  // Down Payment
  downPaymentAmount: number;
  downPaymentPercent: number;
  loanAmount: number;
  
  // Closing Costs
  closingCosts: number;
  
  // Emergency Fund
  emergencyFund: number;
  
  // Total Cash Needed
  totalCashNeeded: number;
  
  // Savings Timeline
  stillNeedToSave: number;
  monthsToSave: number;
  yearsToSave: number;
  targetDate: string;
  
  // PMI Analysis
  needsPMI: boolean;
  monthlyPMI: number;
  annualPMI: number;
  totalPMIOver5Years: number;
  amountNeededToAvoidPMI: number;
  
  // Monthly Payment Comparison
  monthlyPaymentWith20Down: number;
  monthlyPaymentWithCurrentDown: number;
  monthlyDifference: number;
  
  // Investment Opportunity Cost
  investmentGrowth5Years: number;
  investmentGrowth10Years: number;
  investmentGrowth30Years: number;
  
  // Savings Growth
  savingsGrowthTimeline: Array<{month: number; savings: number; target: number}>;
  
  // Down Payment Comparison
  downPaymentOptions: Array<{
    percent: number;
    amount: number;
    loanAmount: number;
    monthlyPayment: number;
    totalInterest: number;
    pmi: number;
  }>;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function DownPaymentCalculator() {
  // 渐进式披露状态管理
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [inputs, setInputs] = useState<DownPaymentInputs>({
    // 基础字段（必需）
    homePrice: '350000',
    downPaymentPercent: '10',
    downPaymentAmount: '35000',
    
    // 高级字段（可选，有默认值）
    currentSavings: '0',
    monthlySavings: '1000',
    savingsInterestRate: '4.5',
    closingCostPercent: '3',
    movingCosts: '2000',
    emergencyFundMonths: '6',
    monthlyExpenses: '3000',
    investmentReturn: '7',
    mortgageRate: '7.0',
    loanTerm: '30',
    pmiRate: '0.5',
    propertyTax: '1.2',
    homeInsurance: '1200',
  });

  const [results, setResults] = useState<DownPaymentResults | null>(null);
  const [inputMode, setInputMode] = useState<'percent' | 'amount'>('percent');

  const calculateDownPayment = () => {
    const homePrice = parseFloat(inputs.homePrice) || 0;
    let downPaymentPercent = parseFloat(inputs.downPaymentPercent) || 0;
    let downPaymentAmount = parseFloat(inputs.downPaymentAmount) || 0;
    
    // Sync percent and amount based on input mode
    if (inputMode === 'percent') {
      downPaymentAmount = homePrice * (downPaymentPercent / 100);
    } else {
      downPaymentPercent = (downPaymentAmount / homePrice) * 100;
    }
    
    const currentSavings = parseFloat(inputs.currentSavings) || 0;
    const monthlySavings = parseFloat(inputs.monthlySavings) || 0;
    const savingsInterestRate = parseFloat(inputs.savingsInterestRate) / 100 || 0;
    const closingCostPercent = parseFloat(inputs.closingCostPercent) / 100 || 0;
    const movingCosts = parseFloat(inputs.movingCosts) || 0;
    const emergencyFundMonths = parseFloat(inputs.emergencyFundMonths) || 0;
    const monthlyExpenses = parseFloat(inputs.monthlyExpenses) || 0;
    const investmentReturn = parseFloat(inputs.investmentReturn) / 100 || 0;
    const mortgageRate = parseFloat(inputs.mortgageRate) / 100 || 0;
    const loanTerm = parseFloat(inputs.loanTerm) || 30;
    const pmiRate = parseFloat(inputs.pmiRate) / 100 || 0;
    const propertyTax = parseFloat(inputs.propertyTax) / 100 || 0;
    const homeInsurance = parseFloat(inputs.homeInsurance) || 0;

    const loanAmount = homePrice - downPaymentAmount;
    const closingCosts = homePrice * closingCostPercent;
    const emergencyFund = monthlyExpenses * emergencyFundMonths;
    const totalCashNeeded = downPaymentAmount + closingCosts + movingCosts + emergencyFund;
    
    // Savings Timeline
    const stillNeedToSave = Math.max(0, totalCashNeeded - currentSavings);
    let monthsToSave = 0;
    let savingsGrowthTimeline: Array<{month: number; savings: number; target: number}> = [];
    
    if (stillNeedToSave > 0 && monthlySavings > 0) {
      let currentAmount = currentSavings;
      const monthlyRate = savingsInterestRate / 12;
      
      while (currentAmount < totalCashNeeded && monthsToSave < 600) { // Max 50 years
        monthsToSave++;
        currentAmount = currentAmount * (1 + monthlyRate) + monthlySavings;
        
        if (monthsToSave <= 120) { // Store first 10 years for chart
          savingsGrowthTimeline.push({
            month: monthsToSave,
            savings: currentAmount,
            target: totalCashNeeded,
          });
        }
      }
    }
    
    const yearsToSave = monthsToSave / 12;
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + monthsToSave);
    const targetDateString = targetDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    
    // PMI Analysis
    const needsPMI = downPaymentPercent < 20;
    const monthlyPMI = needsPMI ? (loanAmount * pmiRate) / 12 : 0;
    const annualPMI = monthlyPMI * 12;
    const totalPMIOver5Years = monthlyPMI * 60; // Assume PMI for 5 years
    const amountNeededToAvoidPMI = Math.max(0, (homePrice * 0.20) - downPaymentAmount);
    
    // Monthly Payment Calculation
    const monthlyRate = mortgageRate / 12;
    const numPayments = loanTerm * 12;
    
    const calculateMonthlyPayment = (principal: number, includePMI: boolean = false) => {
      let payment = 0;
      if (monthlyRate > 0) {
        payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      } else {
        payment = principal / numPayments;
      }
      
      const monthlyPropertyTax = (homePrice * propertyTax) / 12;
      const monthlyHomeInsurance = homeInsurance / 12;
      const pmi = includePMI ? monthlyPMI : 0;
      
      return payment + monthlyPropertyTax + monthlyHomeInsurance + pmi;
    };
    
    const loanAmountWith20Down = homePrice * 0.80;
    const monthlyPaymentWith20Down = calculateMonthlyPayment(loanAmountWith20Down, false);
    const monthlyPaymentWithCurrentDown = calculateMonthlyPayment(loanAmount, needsPMI);
    const monthlyDifference = monthlyPaymentWithCurrentDown - monthlyPaymentWith20Down;
    
    // Investment Opportunity Cost
    const calculateInvestmentGrowth = (years: number) => {
      const monthlyReturn = investmentReturn / 12;
      const months = years * 12;
      let growth = downPaymentAmount;
      
      for (let i = 0; i < months; i++) {
        growth = growth * (1 + monthlyReturn);
      }
      
      return growth - downPaymentAmount;
    };
    
    const investmentGrowth5Years = calculateInvestmentGrowth(5);
    const investmentGrowth10Years = calculateInvestmentGrowth(10);
    const investmentGrowth30Years = calculateInvestmentGrowth(30);
    
    // Down Payment Options Comparison
    const downPaymentOptions = [3, 5, 10, 15, 20].map(percent => {
      const amount = homePrice * (percent / 100);
      const loan = homePrice - amount;
      const needsPMIOption = percent < 20;
      const monthlyPayment = calculateMonthlyPayment(loan, needsPMIOption);
      
      // Calculate total interest over loan term
      const totalPaid = monthlyPayment * numPayments;
      const totalInterest = totalPaid - loan - (homePrice * propertyTax * loanTerm) - (homeInsurance * loanTerm) - (needsPMIOption ? totalPMIOver5Years : 0);
      
      return {
        percent,
        amount,
        loanAmount: loan,
        monthlyPayment,
        totalInterest,
        pmi: needsPMIOption ? monthlyPMI : 0,
      };
    });

    setResults({
      downPaymentAmount,
      downPaymentPercent,
      loanAmount,
      closingCosts,
      emergencyFund,
      totalCashNeeded,
      stillNeedToSave,
      monthsToSave,
      yearsToSave,
      targetDate: targetDateString,
      needsPMI,
      monthlyPMI,
      annualPMI,
      totalPMIOver5Years,
      amountNeededToAvoidPMI,
      monthlyPaymentWith20Down,
      monthlyPaymentWithCurrentDown,
      monthlyDifference,
      investmentGrowth5Years,
      investmentGrowth10Years,
      investmentGrowth30Years,
      savingsGrowthTimeline,
      downPaymentOptions,
    });
  };

  const handleInputChange = (field: keyof DownPaymentInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleDownPaymentPercentChange = (value: string) => {
    setInputMode('percent');
    handleInputChange('downPaymentPercent', value);
    const homePrice = parseFloat(inputs.homePrice) || 0;
    const percent = parseFloat(value) || 0;
    const amount = homePrice * (percent / 100);
    handleInputChange('downPaymentAmount', amount.toString());
  };

  const handleDownPaymentAmountChange = (value: string) => {
    setInputMode('amount');
    handleInputChange('downPaymentAmount', value);
    const homePrice = parseFloat(inputs.homePrice) || 0;
    const amount = parseFloat(value) || 0;
    const percent = (amount / homePrice) * 100;
    handleInputChange('downPaymentPercent', percent.toFixed(2));
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
      price: inputs.homePrice,
      down: inputs.downPaymentPercent,
      savings: inputs.currentSavings,
    });
    
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Down Payment Calculator Results',
        text: `I need ${formatCurrency(results?.totalCashNeeded || 0)} total cash for a ${formatCurrency(parseFloat(inputs.homePrice))} home`,
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
    const element = document.getElementById('downpayment-results');
    if (element) {
      const canvas = await html2canvas(element, { scale: 2 });
      const link = document.createElement('a');
      link.download = 'down-payment-calculator-results.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const printResults = () => {
    window.print();
  };

  const cashNeededData = results ? [
    { name: 'Down Payment', value: results.downPaymentAmount },
    { name: 'Closing Costs', value: results.closingCosts },
    { name: 'Moving Costs', value: parseFloat(inputs.movingCosts) },
    { name: 'Emergency Fund', value: results.emergencyFund },
  ].filter(item => item.value > 0) : [];

  const downPaymentComparisonData = results?.downPaymentOptions || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          {/* ✅ 基础卡片 - 始终显示 */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Home Price */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="homePrice" className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                  Home Price
                  <Info className="h-3 w-3 ml-1 text-gray-400" />
                </Label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="homePrice"
                    type="number"
                    inputMode="decimal"
                    value={inputs.homePrice}
                    onChange={(e) => handleInputChange('homePrice', e.target.value)}
                    className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="350000"
                  />
                </div>
              </div>

              {/* Down Payment % */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="downPaymentPercent" className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                  Down Payment %
                  <Info className="h-3 w-3 ml-1 text-gray-400" />
                </Label>
                <div className="relative w-full">
                  <Input
                    id="downPaymentPercent"
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    value={inputs.downPaymentPercent}
                    onChange={(e) => handleDownPaymentPercentChange(e.target.value)}
                    className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              {/* Down Payment $ */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="downPaymentAmount" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                  Down Payment $
                </Label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="downPaymentAmount"
                    type="number"
                    inputMode="decimal"
                    value={inputs.downPaymentAmount}
                    onChange={(e) => handleDownPaymentAmountChange(e.target.value)}
                    className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="35000"
                  />
                </div>
              </div>

              {/* Show Advanced Options Button */}
              <Button 
                variant="outline"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full text-sm font-medium py-3 min-h-[44px]"
              >
                {showAdvanced ? (
                  <>Hide Advanced Options ▲</>
                ) : (
                  <>Show Advanced Options ▼</>
                )}
              </Button>

              {/* Hint for Advanced Features */}
              {!showAdvanced && results && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Want more insights?</strong> Click "Show Advanced Options" to see savings timeline, PMI analysis, monthly payment comparison, and investment opportunity cost.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ⚡ 高级选项 - 条件显示 */}
          {showAdvanced && (
            <>
              {/* Savings & Timeline */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                    Savings & Timeline (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="currentSavings" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Current Savings
                    </Label>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="currentSavings"
                        type="number"
                        inputMode="decimal"
                        value={inputs.currentSavings}
                        onChange={(e) => handleInputChange('currentSavings', e.target.value)}
                        className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="monthlySavings" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Monthly Savings
                    </Label>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="monthlySavings"
                        type="number"
                        inputMode="decimal"
                        value={inputs.monthlySavings}
                        onChange={(e) => handleInputChange('monthlySavings', e.target.value)}
                        className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="1000"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="savingsInterestRate" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Savings APY
                    </Label>
                    <div className="relative w-full">
                      <Input
                        id="savingsInterestRate"
                        type="number"
                        inputMode="decimal"
                        step="0.1"
                        value={inputs.savingsInterestRate}
                        onChange={(e) => handleInputChange('savingsInterestRate', e.target.value)}
                        className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="4.5"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Costs */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Target className="h-5 w-5 mr-2 text-purple-600" />
                    Additional Costs (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="closingCostPercent" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Closing Costs
                    </Label>
                    <div className="relative w-full">
                      <Input
                        id="closingCostPercent"
                        type="number"
                        inputMode="decimal"
                        step="0.1"
                        value={inputs.closingCostPercent}
                        onChange={(e) => handleInputChange('closingCostPercent', e.target.value)}
                        className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="3"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="movingCosts" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Moving Costs
                    </Label>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="movingCosts"
                        type="number"
                        inputMode="decimal"
                        value={inputs.movingCosts}
                        onChange={(e) => handleInputChange('movingCosts', e.target.value)}
                        className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="2000"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="emergencyFundMonths" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Emergency Fund
                    </Label>
                    <div className="relative w-full">
                      <Input
                        id="emergencyFundMonths"
                        type="number"
                        inputMode="decimal"
                        value={inputs.emergencyFundMonths}
                        onChange={(e) => handleInputChange('emergencyFundMonths', e.target.value)}
                        className="pr-16 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="6"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">months</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="monthlyExpenses" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Monthly Expenses
                    </Label>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="monthlyExpenses"
                        type="number"
                        inputMode="decimal"
                        value={inputs.monthlyExpenses}
                        onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                        className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="3000"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mortgage Details */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-200">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                    Mortgage Details (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="mortgageRate" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Mortgage Rate
                    </Label>
                    <div className="relative w-full">
                      <Input
                        id="mortgageRate"
                        type="number"
                        inputMode="decimal"
                        step="0.1"
                        value={inputs.mortgageRate}
                        onChange={(e) => handleInputChange('mortgageRate', e.target.value)}
                        className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="7.0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>

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

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="pmiRate" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      PMI Rate
                    </Label>
                    <div className="relative w-full">
                      <Input
                        id="pmiRate"
                        type="number"
                        inputMode="decimal"
                        step="0.1"
                        value={inputs.pmiRate}
                        onChange={(e) => handleInputChange('pmiRate', e.target.value)}
                        className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="0.5"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>

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
                        placeholder="1.2"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>

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
                        placeholder="1200"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="investmentReturn" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Investment Return
                    </Label>
                    <div className="relative w-full">
                      <Input
                        id="investmentReturn"
                        type="number"
                        inputMode="decimal"
                        step="0.1"
                        value={inputs.investmentReturn}
                        onChange={(e) => handleInputChange('investmentReturn', e.target.value)}
                        className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="7"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Calculate Button - 始终在最底部 */}
          <Button 
            onClick={calculateDownPayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Down Payment
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          {!results ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Calculate</h3>
                <p className="text-gray-500">Enter your home price and down payment details, then click "Calculate Down Payment" to see your results.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div id="downpayment-results">
                {/* Total Cash Needed */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Total Cash Needed</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600 mb-2">Total Cash Required to Buy</p>
                      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 break-all">
                        {formatCurrency(results.totalCashNeeded)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Down payment + Closing costs + Moving + Emergency fund
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <ResponsiveContainer width="100%" height={200} minHeight={180}>
                          <PieChart>
                            <Pie
                              data={cashNeededData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={(entry) => `${entry.name}`}
                              outerRadius={60}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {cashNeededData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-sm text-gray-600">Down Payment ({formatPercent(results.downPaymentPercent)})</span>
                          <span className="font-semibold">{formatCurrency(results.downPaymentAmount)}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-sm text-gray-600">Closing Costs ({inputs.closingCostPercent}%)</span>
                          <span className="font-semibold">{formatCurrency(results.closingCosts)}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-sm text-gray-600">Moving Costs</span>
                          <span className="font-semibold">{formatCurrency(parseFloat(inputs.movingCosts))}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-sm text-gray-600">Emergency Fund ({inputs.emergencyFundMonths} months)</span>
                          <span className="font-semibold">{formatCurrency(results.emergencyFund)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t-2 border-gray-300">
                          <span className="font-semibold text-gray-900">Loan Amount</span>
                          <span className="font-bold text-lg text-blue-600">{formatCurrency(results.loanAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Savings Timeline */}
                {results.stillNeedToSave > 0 && (
                  <Card className="shadow-lg mb-6">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                      <CardTitle className="text-lg sm:text-xl">Savings Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Still Need to Save</p>
                          <p className="text-xl sm:text-2xl font-bold text-blue-600 break-all">
                            {formatCurrency(results.stillNeedToSave)}
                          </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Time to Save</p>
                          <p className="text-xl sm:text-2xl font-bold text-green-600">
                            {results.yearsToSave.toFixed(1)} years
                          </p>
                          <p className="text-xs text-gray-600 mt-1">{results.monthsToSave} months</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Target Date</p>
                          <p className="text-lg sm:text-xl font-bold text-purple-600">
                            {results.targetDate}
                          </p>
                        </div>
                      </div>

                      {results.savingsGrowthTimeline.length > 0 && (
                        <ResponsiveContainer width="100%" height={250} minHeight={200}>
                          <LineChart data={results.savingsGrowthTimeline}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
                            <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={2} name="Your Savings" />
                            <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* PMI Analysis */}
                {results.needsPMI && (
                  <Card className="shadow-lg mb-6">
                    <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-gray-200">
                      <CardTitle className="text-lg sm:text-xl">PMI Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-yellow-800 mb-1">PMI Required</p>
                          <p className="text-xs text-yellow-700">
                            Your down payment is less than 20%. You'll need to pay Private Mortgage Insurance (PMI).
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-red-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Monthly PMI</p>
                          <p className="text-xl sm:text-2xl font-bold text-red-600 break-all">
                            {formatCurrency(results.monthlyPMI)}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">Annual: {formatCurrency(results.annualPMI)}</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Total PMI (5 years)</p>
                          <p className="text-xl sm:text-2xl font-bold text-orange-600 break-all">
                            {formatCurrency(results.totalPMIOver5Years)}
                          </p>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm font-semibold text-green-800 mb-1">💡 To Avoid PMI</p>
                        <p className="text-xs text-green-700">
                          Save an additional {formatCurrency(results.amountNeededToAvoidPMI)} to reach 20% down payment 
                          and avoid {formatCurrency(results.totalPMIOver5Years)} in PMI over 5 years.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Monthly Payment Comparison */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Monthly Payment Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">With 20% Down (No PMI)</p>
                        <p className="text-xl sm:text-2xl font-bold text-green-600 break-all">
                          {formatCurrency(results.monthlyPaymentWith20Down)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Monthly payment</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">With {formatPercent(results.downPaymentPercent)} Down</p>
                        <p className="text-xl sm:text-2xl font-bold text-blue-600 break-all">
                          {formatCurrency(results.monthlyPaymentWithCurrentDown)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {results.needsPMI ? `Includes ${formatCurrency(results.monthlyPMI)} PMI` : 'No PMI'}
                        </p>
                      </div>
                    </div>

                    {results.monthlyDifference > 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm font-semibold text-yellow-800 mb-1">Monthly Difference</p>
                        <p className="text-xs text-yellow-700">
                          You'll pay {formatCurrency(results.monthlyDifference)} more per month compared to 20% down. 
                          Over 5 years, that's {formatCurrency(results.monthlyDifference * 60)} extra.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Down Payment Options Comparison */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Down Payment Options Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="overflow-x-auto overflow-y-hidden mb-6">
                      <table className="w-full min-w-[600px] text-xs sm:text-sm border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="border border-gray-300 px-2 sm:px-3 py-2 text-left">Down %</th>
                            <th className="border border-gray-300 px-2 sm:px-3 py-2 text-left">Amount</th>
                            <th className="border border-gray-300 px-2 sm:px-3 py-2 text-left">Loan</th>
                            <th className="border border-gray-300 px-2 sm:px-3 py-2 text-left">Monthly</th>
                            <th className="border border-gray-300 px-2 sm:px-3 py-2 text-left">PMI</th>
                          </tr>
                        </thead>
                        <tbody>
                          {downPaymentComparisonData.map((option, index) => (
                            <tr key={index} className={option.percent === Math.round(results.downPaymentPercent) ? 'bg-blue-50 font-semibold' : ''}>
                              <td className="border border-gray-300 px-2 sm:px-3 py-2">{option.percent}%</td>
                              <td className="border border-gray-300 px-2 sm:px-3 py-2">{formatCurrency(option.amount)}</td>
                              <td className="border border-gray-300 px-2 sm:px-3 py-2">{formatCurrency(option.loanAmount)}</td>
                              <td className="border border-gray-300 px-2 sm:px-3 py-2">{formatCurrency(option.monthlyPayment)}</td>
                              <td className="border border-gray-300 px-2 sm:px-3 py-2">
                                {option.pmi > 0 ? formatCurrency(option.pmi) : 'None'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <ResponsiveContainer width="100%" height={250} minHeight={200}>
                      <BarChart data={downPaymentComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="percent" tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}%`} />
                        <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Bar dataKey="monthlyPayment" fill="#3b82f6" name="Monthly Payment" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Investment Opportunity Cost */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Investment Opportunity Cost</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <p className="text-sm text-gray-600 mb-4">
                      If you invested your {formatCurrency(results.downPaymentAmount)} down payment at {inputs.investmentReturn}% annual return instead:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">After 5 Years</p>
                        <p className="text-xl sm:text-2xl font-bold text-blue-600 break-all">
                          {formatCurrency(results.investmentGrowth5Years)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Growth</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">After 10 Years</p>
                        <p className="text-xl sm:text-2xl font-bold text-green-600 break-all">
                          {formatCurrency(results.investmentGrowth10Years)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Growth</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">After 30 Years</p>
                        <p className="text-xl sm:text-2xl font-bold text-purple-600 break-all">
                          {formatCurrency(results.investmentGrowth30Years)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Growth</p>
                      </div>
                    </div>

                    <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-700">
                        <strong>Note:</strong> This shows the opportunity cost of using cash for a down payment vs investing it. 
                        However, homeownership builds equity and provides housing stability, which aren't captured in this comparison.
                      </p>
                    </div>
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

