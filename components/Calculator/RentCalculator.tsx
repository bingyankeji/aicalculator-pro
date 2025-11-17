'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Info, Download, Printer, Share2, DollarSign, TrendingUp, Home, Calculator, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import html2canvas from 'html2canvas';

interface RentInputs {
  monthlyIncome: string;
  monthlyRent: string;
  utilities: string;
  rentersInsurance: string;
  parkingFee: string;
  petFee: string;
  securityDeposit: string;
  movingCosts: string;
  rentInflation: string;
  homePrice: string;
  downPayment: string;
  mortgageRate: string;
  propertyTax: string;
  homeInsurance: string;
  hoaFees: string;
  maintenance: string;
  homeAppreciation: string;
}

interface RentResults {
  // Rent Affordability
  monthlyRentBudget: number;
  rentToIncomeRatio: number;
  affordabilityStatus: 'excellent' | 'good' | 'stretched' | 'overextended';
  
  // Annual Rent Costs
  annualRent: number;
  annualUtilities: number;
  annualInsurance: number;
  annualParking: number;
  annualPetFee: number;
  totalAnnualRentCost: number;
  
  // Move-in Costs
  firstMonthRent: number;
  lastMonthRent: number;
  securityDeposit: number;
  movingCosts: number;
  totalMoveInCost: number;
  
  // 5-Year Projection
  year1RentCost: number;
  year2RentCost: number;
  year3RentCost: number;
  year4RentCost: number;
  year5RentCost: number;
  total5YearRentCost: number;
  
  // Buy vs Rent Comparison
  monthlyMortgagePayment: number;
  monthlyHomeOwnershipCost: number;
  total5YearBuyCost: number;
  homeEquityAfter5Years: number;
  homeValueAfter5Years: number;
  breakEvenYear: number;
  
  // Savings Analysis
  monthlySavings: number;
  annual5YearSavings: number;
  investmentGrowth5Years: number;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function RentCalculator() {
  // 渐进式披露状态管理
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showBuyComparison, setShowBuyComparison] = useState(false);

  const [inputs, setInputs] = useState<RentInputs>({
    // 基础字段（必需）
    monthlyIncome: '5000',
    monthlyRent: '1500',
    
    // 高级字段（可选，有默认值）
    utilities: '150',
    rentersInsurance: '20',
    parkingFee: '0',
    petFee: '0',
    securityDeposit: '1500',
    movingCosts: '500',
    rentInflation: '3.5',
    
    // 买房对比字段（可选）
    homePrice: '350000',
    downPayment: '70000',
    mortgageRate: '7.0',
    propertyTax: '1.2',
    homeInsurance: '1200',
    hoaFees: '0',
    maintenance: '1.0',
    homeAppreciation: '3.0',
  });

  const [results, setResults] = useState<RentResults | null>(null);

  const calculateRent = () => {
    const monthlyIncome = parseFloat(inputs.monthlyIncome) || 0;
    const monthlyRent = parseFloat(inputs.monthlyRent) || 0;
    const utilities = parseFloat(inputs.utilities) || 0;
    const rentersInsurance = parseFloat(inputs.rentersInsurance) || 0;
    const parkingFee = parseFloat(inputs.parkingFee) || 0;
    const petFee = parseFloat(inputs.petFee) || 0;
    const securityDeposit = parseFloat(inputs.securityDeposit) || 0;
    const movingCosts = parseFloat(inputs.movingCosts) || 0;
    const rentInflation = parseFloat(inputs.rentInflation) / 100 || 0;
    const homePrice = parseFloat(inputs.homePrice) || 0;
    const downPayment = parseFloat(inputs.downPayment) || 0;
    const mortgageRate = parseFloat(inputs.mortgageRate) / 100 || 0;
    const propertyTax = parseFloat(inputs.propertyTax) / 100 || 0;
    const homeInsurance = parseFloat(inputs.homeInsurance) || 0;
    const hoaFees = parseFloat(inputs.hoaFees) || 0;
    const maintenance = parseFloat(inputs.maintenance) / 100 || 0;
    const homeAppreciation = parseFloat(inputs.homeAppreciation) / 100 || 0;

    // Rent Affordability (30% rule)
    const monthlyRentBudget = monthlyIncome * 0.30;
    const rentToIncomeRatio = (monthlyRent / monthlyIncome) * 100;
    
    let affordabilityStatus: 'excellent' | 'good' | 'stretched' | 'overextended';
    if (rentToIncomeRatio <= 25) affordabilityStatus = 'excellent';
    else if (rentToIncomeRatio <= 30) affordabilityStatus = 'good';
    else if (rentToIncomeRatio <= 40) affordabilityStatus = 'stretched';
    else affordabilityStatus = 'overextended';

    // Annual Rent Costs
    const annualRent = monthlyRent * 12;
    const annualUtilities = utilities * 12;
    const annualInsurance = rentersInsurance * 12;
    const annualParking = parkingFee * 12;
    const annualPetFee = petFee * 12;
    const totalAnnualRentCost = annualRent + annualUtilities + annualInsurance + annualParking + annualPetFee;

    // Move-in Costs
    const firstMonthRent = monthlyRent;
    const lastMonthRent = monthlyRent;
    const totalMoveInCost = firstMonthRent + lastMonthRent + securityDeposit + movingCosts;

    // 5-Year Rent Projection with Inflation
    const year1RentCost = totalAnnualRentCost;
    const year2RentCost = totalAnnualRentCost * Math.pow(1 + rentInflation, 1);
    const year3RentCost = totalAnnualRentCost * Math.pow(1 + rentInflation, 2);
    const year4RentCost = totalAnnualRentCost * Math.pow(1 + rentInflation, 3);
    const year5RentCost = totalAnnualRentCost * Math.pow(1 + rentInflation, 4);
    const total5YearRentCost = year1RentCost + year2RentCost + year3RentCost + year4RentCost + year5RentCost;

    // Buy vs Rent Comparison
    const loanAmount = homePrice - downPayment;
    const monthlyRate = mortgageRate / 12;
    const numPayments = 30 * 12;
    
    let monthlyMortgagePayment = 0;
    if (monthlyRate > 0) {
      monthlyMortgagePayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      monthlyMortgagePayment = loanAmount / numPayments;
    }

    const monthlyPropertyTax = (homePrice * propertyTax) / 12;
    const monthlyHomeInsurance = homeInsurance / 12;
    const monthlyMaintenance = (homePrice * maintenance) / 12;
    const monthlyHomeOwnershipCost = monthlyMortgagePayment + monthlyPropertyTax + monthlyHomeInsurance + hoaFees + monthlyMaintenance;

    // 5-Year Buy Costs
    const annualHomeOwnershipCost = monthlyHomeOwnershipCost * 12;
    const total5YearBuyCost = downPayment + (annualHomeOwnershipCost * 5);

    // Home Equity and Appreciation
    const homeValueAfter5Years = homePrice * Math.pow(1 + homeAppreciation, 5);
    
    // Calculate principal paid in 5 years
    let remainingBalance = loanAmount;
    let totalPrincipalPaid = 0;
    for (let month = 1; month <= 60; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyMortgagePayment - interestPayment;
      totalPrincipalPaid += principalPayment;
      remainingBalance -= principalPayment;
    }
    
    const homeEquityAfter5Years = downPayment + totalPrincipalPaid + (homeValueAfter5Years - homePrice);

    // Break-even Analysis
    let breakEvenYear = 0;
    let cumulativeRentCost = 0;
    let cumulativeBuyCost = downPayment;
    
    for (let year = 1; year <= 10; year++) {
      const yearRentCost = totalAnnualRentCost * Math.pow(1 + rentInflation, year - 1);
      cumulativeRentCost += yearRentCost;
      cumulativeBuyCost += annualHomeOwnershipCost;
      
      const homeValueThisYear = homePrice * Math.pow(1 + homeAppreciation, year);
      const netBuyCost = cumulativeBuyCost - (homeValueThisYear - homePrice);
      
      if (breakEvenYear === 0 && netBuyCost <= cumulativeRentCost) {
        breakEvenYear = year;
      }
    }

    // Savings Analysis
    const monthlySavings = monthlyHomeOwnershipCost - (monthlyRent + utilities + rentersInsurance + parkingFee + petFee);
    const annual5YearSavings = (total5YearBuyCost - total5YearRentCost) / 5;
    
    // If renting is cheaper, calculate investment growth
    let investmentGrowth5Years = 0;
    if (monthlySavings < 0) {
      const monthlySavingsAmount = Math.abs(monthlySavings);
      const investmentReturn = 0.07 / 12; // 7% annual return
      for (let month = 1; month <= 60; month++) {
        investmentGrowth5Years = (investmentGrowth5Years + monthlySavingsAmount) * (1 + investmentReturn);
      }
    }

    setResults({
      monthlyRentBudget,
      rentToIncomeRatio,
      affordabilityStatus,
      annualRent,
      annualUtilities,
      annualInsurance,
      annualParking,
      annualPetFee,
      totalAnnualRentCost,
      firstMonthRent,
      lastMonthRent,
      securityDeposit,
      movingCosts,
      totalMoveInCost,
      year1RentCost,
      year2RentCost,
      year3RentCost,
      year4RentCost,
      year5RentCost,
      total5YearRentCost,
      monthlyMortgagePayment,
      monthlyHomeOwnershipCost,
      total5YearBuyCost,
      homeEquityAfter5Years,
      homeValueAfter5Years,
      breakEvenYear,
      monthlySavings,
      annual5YearSavings,
      investmentGrowth5Years,
    });
  };

  const handleInputChange = (field: keyof RentInputs, value: string) => {
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
      income: inputs.monthlyIncome,
      rent: inputs.monthlyRent,
      utilities: inputs.utilities,
      homePrice: inputs.homePrice,
    });
    
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Rent Calculator Results',
        text: `My rent is ${formatCurrency(parseFloat(inputs.monthlyRent))}/month`,
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
    const element = document.getElementById('rent-results');
    if (element) {
      const canvas = await html2canvas(element, { scale: 2 });
      const link = document.createElement('a');
      link.download = 'rent-calculator-results.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const printResults = () => {
    window.print();
  };

  const getAffordabilityStatus = (status: string) => {
    switch (status) {
      case 'excellent':
        return { text: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' };
      case 'good':
        return { text: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' };
      case 'stretched':
        return { text: 'Stretched', color: 'text-yellow-600', bg: 'bg-yellow-50' };
      case 'overextended':
        return { text: 'Overextended', color: 'text-red-600', bg: 'bg-red-50' };
      default:
        return { text: 'Unknown', color: 'text-gray-600', bg: 'bg-gray-50' };
    }
  };

  const annualCostsData = results ? [
    { name: 'Rent', value: results.annualRent },
    { name: 'Utilities', value: results.annualUtilities },
    { name: 'Insurance', value: results.annualInsurance },
    { name: 'Parking', value: results.annualParking },
    { name: 'Pet Fee', value: results.annualPetFee },
  ].filter(item => item.value > 0) : [];

  const fiveYearProjectionData = results ? [
    { year: 'Year 1', rent: results.year1RentCost },
    { year: 'Year 2', rent: results.year2RentCost },
    { year: 'Year 3', rent: results.year3RentCost },
    { year: 'Year 4', rent: results.year4RentCost },
    { year: 'Year 5', rent: results.year5RentCost },
  ] : [];

  const buyVsRentData = results ? [
    { category: 'Renting', cost: results.total5YearRentCost },
    { category: 'Buying', cost: results.total5YearBuyCost - results.homeEquityAfter5Years },
  ] : [];

  const affordabilityStatusInfo = results ? getAffordabilityStatus(results.affordabilityStatus) : null;

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
              {/* Monthly Income */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="monthlyIncome" className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                  Monthly Income
                  <Info className="h-3 w-3 ml-1 text-gray-400" />
                </Label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    inputMode="decimal"
                    value={inputs.monthlyIncome}
                    onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                    className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="5000"
                  />
                </div>
              </div>

              {/* Monthly Rent */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="monthlyRent" className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                  Monthly Rent
                  <Info className="h-3 w-3 ml-1 text-gray-400" />
                </Label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="monthlyRent"
                    type="number"
                    inputMode="decimal"
                    value={inputs.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                    className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="1500"
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
                    💡 <strong>Want more insights?</strong> Click "Show Advanced Options" to include utilities, insurance, move-in costs, and rent vs. buy comparison.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ⚡ 高级选项 - 条件显示 */}
          {showAdvanced && (
            <>
              {/* Additional Monthly Costs */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                    Additional Monthly Costs (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="utilities" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Utilities
                    </Label>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="utilities"
                        type="number"
                        inputMode="decimal"
                        value={inputs.utilities}
                        onChange={(e) => handleInputChange('utilities', e.target.value)}
                        className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="150"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="rentersInsurance" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Insurance
                    </Label>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="rentersInsurance"
                        type="number"
                        inputMode="decimal"
                        value={inputs.rentersInsurance}
                        onChange={(e) => handleInputChange('rentersInsurance', e.target.value)}
                        className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="20"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="parkingFee" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Parking Fee
                    </Label>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="parkingFee"
                        type="number"
                        inputMode="decimal"
                        value={inputs.parkingFee}
                        onChange={(e) => handleInputChange('parkingFee', e.target.value)}
                        className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="petFee" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Pet Fee
                    </Label>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="petFee"
                        type="number"
                        inputMode="decimal"
                        value={inputs.petFee}
                        onChange={(e) => handleInputChange('petFee', e.target.value)}
                        className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Move-in Costs */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Home className="h-5 w-5 mr-2 text-purple-600" />
                    Move-in Costs (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="securityDeposit" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Security Deposit
                    </Label>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="securityDeposit"
                        type="number"
                        inputMode="decimal"
                        value={inputs.securityDeposit}
                        onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                        className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="1500"
                      />
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
                        placeholder="500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="rentInflation" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Rent Inflation
                    </Label>
                    <div className="relative w-full">
                      <Input
                        id="rentInflation"
                        type="number"
                        inputMode="decimal"
                        step="0.1"
                        value={inputs.rentInflation}
                        onChange={(e) => handleInputChange('rentInflation', e.target.value)}
                        className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="3.5"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Show Buy Comparison Button */}
              <Button 
                variant="outline"
                onClick={() => setShowBuyComparison(!showBuyComparison)}
                className="w-full text-sm font-medium py-3 min-h-[44px]"
              >
                {showBuyComparison ? (
                  <>Hide Buy Comparison ▲</>
                ) : (
                  <>Show Buy Comparison ▼</>
                )}
              </Button>
            </>
          )}

          {/* 🔄 买房对比 - 独立控制 */}
          {showAdvanced && showBuyComparison && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-200">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                  Buy Comparison (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <Label htmlFor="homePrice" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                    Home Price
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

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <Label htmlFor="downPayment" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                    Down Payment
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
                      placeholder="70000"
                    />
                  </div>
                </div>

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
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <Label htmlFor="maintenance" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                    Maintenance
                  </Label>
                  <div className="relative w-full">
                    <Input
                      id="maintenance"
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      value={inputs.maintenance}
                      onChange={(e) => handleInputChange('maintenance', e.target.value)}
                      className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="1.0"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <Label htmlFor="homeAppreciation" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                    Appreciation
                  </Label>
                  <div className="relative w-full">
                    <Input
                      id="homeAppreciation"
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      value={inputs.homeAppreciation}
                      onChange={(e) => handleInputChange('homeAppreciation', e.target.value)}
                      className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="3.0"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Calculate Button - 始终在最底部 */}
          <Button 
            onClick={calculateRent}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Rent Affordability
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          {!results ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Calculate</h3>
                <p className="text-gray-500">Enter your rent and income information, then click "Calculate Rent Analysis" to see your results.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div id="rent-results">
                {/* Rent Affordability */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Rent Affordability Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className={`p-4 rounded-lg ${affordabilityStatusInfo?.bg}`}>
                        <p className="text-sm text-gray-600 mb-1">Affordability Status</p>
                        <p className={`text-2xl sm:text-3xl font-bold ${affordabilityStatusInfo?.color}`}>
                          {affordabilityStatusInfo?.text}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Rent-to-Income: {formatPercent(results.rentToIncomeRatio)}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Recommended Budget (30% Rule)</p>
                        <p className="text-2xl sm:text-3xl font-bold text-green-600 break-all">
                          {formatCurrency(results.monthlyRentBudget)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Maximum monthly rent</p>
                      </div>
                    </div>

                    {results.rentToIncomeRatio > 30 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-yellow-800 mb-1">Rent Burden Warning</p>
                          <p className="text-xs text-yellow-700">
                            Your rent exceeds the recommended 30% of income. Consider finding a more affordable place or increasing income.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Annual Costs */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Annual Rent Costs</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600 mb-2">Total Annual Cost</p>
                      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 break-all">
                        {formatCurrency(results.totalAnnualRentCost)}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <ResponsiveContainer width="100%" height={200} minHeight={180}>
                          <PieChart>
                            <Pie
                              data={annualCostsData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={(entry) => `${entry.name}`}
                              outerRadius={60}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {annualCostsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-sm text-gray-600">Annual Rent</span>
                          <span className="font-semibold">{formatCurrency(results.annualRent)}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-sm text-gray-600">Utilities</span>
                          <span className="font-semibold">{formatCurrency(results.annualUtilities)}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-sm text-gray-600">Insurance</span>
                          <span className="font-semibold">{formatCurrency(results.annualInsurance)}</span>
                        </div>
                        {results.annualParking > 0 && (
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm text-gray-600">Parking</span>
                            <span className="font-semibold">{formatCurrency(results.annualParking)}</span>
                          </div>
                        )}
                        {results.annualPetFee > 0 && (
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm text-gray-600">Pet Fee</span>
                            <span className="font-semibold">{formatCurrency(results.annualPetFee)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Move-in Costs */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Move-in Costs</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600 mb-2">Total Move-in Cost</p>
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600 break-all">
                        {formatCurrency(results.totalMoveInCost)}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">First Month Rent</span>
                        <span className="font-semibold">{formatCurrency(results.firstMonthRent)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Last Month Rent</span>
                        <span className="font-semibold">{formatCurrency(results.lastMonthRent)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Security Deposit</span>
                        <span className="font-semibold">{formatCurrency(results.securityDeposit)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Moving Costs</span>
                        <span className="font-semibold">{formatCurrency(results.movingCosts)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 5-Year Projection */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">5-Year Rent Projection</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600 mb-2">Total 5-Year Cost</p>
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 break-all">
                        {formatCurrency(results.total5YearRentCost)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">With {formatPercent(parseFloat(inputs.rentInflation))} annual inflation</p>
                    </div>

                    <ResponsiveContainer width="100%" height={250} minHeight={200}>
                      <LineChart data={fiveYearProjectionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Line type="monotone" dataKey="rent" stroke="#8b5cf6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Buy vs Rent */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Buy vs Rent Comparison (5 Years)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Total Renting Cost</p>
                        <p className="text-xl sm:text-2xl font-bold text-blue-600 break-all">
                          {formatCurrency(results.total5YearRentCost)}
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Total Buying Cost (Net)</p>
                        <p className="text-xl sm:text-2xl font-bold text-green-600 break-all">
                          {formatCurrency(results.total5YearBuyCost - results.homeEquityAfter5Years)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">After equity: {formatCurrency(results.homeEquityAfter5Years)}</p>
                      </div>
                    </div>

                    <ResponsiveContainer width="100%" height={200} minHeight={180}>
                      <BarChart data={buyVsRentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Bar dataKey="cost" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>

                    <div className="mt-6 space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Monthly Mortgage Payment</span>
                        <span className="font-semibold">{formatCurrency(results.monthlyMortgagePayment)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Monthly Ownership Cost</span>
                        <span className="font-semibold">{formatCurrency(results.monthlyHomeOwnershipCost)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Home Value After 5 Years</span>
                        <span className="font-semibold">{formatCurrency(results.homeValueAfter5Years)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Equity After 5 Years</span>
                        <span className="font-semibold text-green-600">{formatCurrency(results.homeEquityAfter5Years)}</span>
                      </div>
                      {results.breakEvenYear > 0 && (
                        <div className="flex justify-between items-center pt-2 border-t-2 border-gray-300">
                          <span className="font-semibold text-gray-900">Break-Even Point</span>
                          <span className="font-bold text-lg text-blue-600">Year {results.breakEvenYear}</span>
                        </div>
                      )}
                    </div>

                    {results.total5YearRentCost < (results.total5YearBuyCost - results.homeEquityAfter5Years) && results.investmentGrowth5Years > 0 && (
                      <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm font-semibold text-green-800 mb-1">💡 Renting Advantage</p>
                        <p className="text-xs text-green-700">
                          If you invest the difference ({formatCurrency(Math.abs(results.monthlySavings))}/month) at 7% annual return, 
                          you could have {formatCurrency(results.investmentGrowth5Years)} after 5 years.
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

