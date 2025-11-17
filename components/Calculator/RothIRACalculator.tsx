'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Info, Download, Printer, Share2, DollarSign, TrendingUp, Calculator, AlertCircle, PiggyBank } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import html2canvas from 'html2canvas';

interface RothIRAInputs {
  currentAge: string;
  retirementAge: string;
  currentBalance: string;
  annualContribution: string;
  expectedReturn: string;
  // Advanced options
  magi: string;
  filingStatus: string;
  employerMatch: string;
  catchUpAge: string;
}

interface RothIRAResults {
  // Contribution limits
  annualLimit: number;
  catchUpContribution: number;
  totalAllowedContribution: number;
  isEligible: boolean;
  phaseOutMessage: string;
  
  // Growth projections
  retirementBalance: number;
  totalContributions: number;
  totalGrowth: number;
  yearsToRetirement: number;
  
  // Tax benefits
  taxFreeWithdrawals: number;
  traditionalTaxOwed: number;
  rothAdvantage: number;
  
  // Comparison
  rothVsTraditional: {
    rothBalance: number;
    traditionalBalance: number;
    rothAfterTax: number;
    traditionalAfterTax: number;
  };
  
  // Projections
  yearlyProjections: Array<{
    year: number;
    age: number;
    contribution: number;
    balance: number;
    growth: number;
  }>;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

// 2024 Roth IRA contribution limits and income phase-out ranges
const CONTRIBUTION_LIMITS = {
  under50: 7000,
  over50: 8000,
  catchUpAge: 50,
};

const INCOME_LIMITS_2024 = {
  single: { min: 146000, max: 161000 },
  married: { min: 230000, max: 240000 },
  marriedSeparate: { min: 0, max: 10000 },
};

export default function RothIRACalculator() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [inputs, setInputs] = useState<RothIRAInputs>({
    // Basic fields
    currentAge: '30',
    retirementAge: '65',
    currentBalance: '10000',
    annualContribution: '7000',
    expectedReturn: '8',
    // Advanced fields (with defaults)
    magi: '100000',
    filingStatus: 'single',
    employerMatch: '0',
    catchUpAge: '50',
  });

  const [results, setResults] = useState<RothIRAResults | null>(null);

  const calculateRothIRA = () => {
    const currentAge = parseInt(inputs.currentAge) || 0;
    const retirementAge = parseInt(inputs.retirementAge) || 65;
    const currentBalance = parseFloat(inputs.currentBalance) || 0;
    const annualContribution = parseFloat(inputs.annualContribution) || 0;
    const expectedReturn = parseFloat(inputs.expectedReturn) || 8;
    const magi = parseFloat(inputs.magi) || 0;
    const filingStatus = inputs.filingStatus;
    const catchUpAge = parseInt(inputs.catchUpAge) || 50;

    const yearsToRetirement = retirementAge - currentAge;

    // Determine contribution limits
    const baseLimit = currentAge >= catchUpAge ? CONTRIBUTION_LIMITS.over50 : CONTRIBUTION_LIMITS.under50;
    const catchUpContribution = currentAge >= catchUpAge ? 1000 : 0;

    // Check income eligibility
    const limits = INCOME_LIMITS_2024[filingStatus as keyof typeof INCOME_LIMITS_2024];
    let isEligible = true;
    let phaseOutMessage = 'Fully eligible for Roth IRA contributions';
    let contributionReduction = 0;

    if (magi >= limits.max) {
      isEligible = false;
      phaseOutMessage = `Income exceeds limit ($${limits.max.toLocaleString()}). Consider Backdoor Roth IRA.`;
      contributionReduction = 1;
    } else if (magi >= limits.min) {
      const phaseOutRange = limits.max - limits.min;
      const excessIncome = magi - limits.min;
      contributionReduction = excessIncome / phaseOutRange;
      phaseOutMessage = `Partial eligibility (${Math.round((1 - contributionReduction) * 100)}% of limit) due to income phase-out.`;
    }

    const totalAllowedContribution = Math.round(baseLimit * (1 - contributionReduction));
    const effectiveContribution = Math.min(annualContribution, totalAllowedContribution);

    // Calculate growth projections
    const yearlyProjections: RothIRAResults['yearlyProjections'] = [];
    let balance = currentBalance;
    let totalContributions = currentBalance;
    const monthlyReturn = expectedReturn / 100 / 12;

    for (let year = 0; year <= yearsToRetirement; year++) {
      const age = currentAge + year;
      const yearContribution = year === 0 ? 0 : effectiveContribution;
      
      // Calculate monthly compounding
      let yearStartBalance = balance;
      for (let month = 0; month < 12; month++) {
        balance += balance * monthlyReturn;
        if (month === 0 && year > 0) {
          balance += yearContribution / 12;
        } else if (year > 0) {
          balance += yearContribution / 12;
        }
      }
      
      const yearGrowth = balance - yearStartBalance - yearContribution;
      totalContributions += yearContribution;

      yearlyProjections.push({
        year,
        age,
        contribution: yearContribution,
        balance: Math.round(balance),
        growth: Math.round(yearGrowth),
      });
    }

    const retirementBalance = balance;
    const totalGrowth = retirementBalance - totalContributions;

    // Tax calculations (assuming 24% tax bracket)
    const taxRate = 0.24;
    const taxFreeWithdrawals = retirementBalance;
    const traditionalTaxOwed = retirementBalance * taxRate;
    const rothAdvantage = traditionalTaxOwed;

    // Roth vs Traditional comparison
    const traditionalBalance = retirementBalance; // Same growth
    const rothAfterTax = retirementBalance; // No tax on withdrawal
    const traditionalAfterTax = traditionalBalance * (1 - taxRate);

    setResults({
      annualLimit: baseLimit,
      catchUpContribution,
      totalAllowedContribution,
      isEligible,
      phaseOutMessage,
      retirementBalance,
      totalContributions,
      totalGrowth,
      yearsToRetirement,
      taxFreeWithdrawals,
      traditionalTaxOwed,
      rothAdvantage,
      rothVsTraditional: {
        rothBalance: retirementBalance,
        traditionalBalance,
        rothAfterTax,
        traditionalAfterTax,
      },
      yearlyProjections,
    });
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const shareCalculation = () => {
    const url = `${window.location.origin}${window.location.pathname}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Roth IRA Calculator Results',
        text: `Projected Roth IRA Balance at Retirement: ${results ? formatCurrency(results.retirementBalance) : 'Calculate now'}`,
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
    const element = document.getElementById('roth-ira-results');
    if (element) {
      const canvas = await html2canvas(element, { scale: 2 });
      const link = document.createElement('a');
      link.download = 'roth-ira-results.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const printResults = () => {
    window.print();
  };

  const comparisonData = results ? [
    { name: 'Roth IRA', value: results.rothVsTraditional.rothAfterTax },
    { name: 'Traditional IRA', value: results.rothVsTraditional.traditionalAfterTax },
  ] : [];

  const breakdownData = results ? [
    { name: 'Contributions', value: results.totalContributions, color: '#3b82f6' },
    { name: 'Investment Growth', value: results.totalGrowth, color: '#10b981' },
  ] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          {/* Basic Information Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <PiggyBank className="h-5 w-5 mr-2 text-blue-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="currentAge" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                  Current Age
                </Label>
                <Input
                  id="currentAge"
                  type="number"
                  inputMode="decimal"
                  value={inputs.currentAge}
                  onChange={(e) => setInputs({ ...inputs, currentAge: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="30"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="retirementAge" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                  Retirement Age
                </Label>
                <Input
                  id="retirementAge"
                  type="number"
                  inputMode="decimal"
                  value={inputs.retirementAge}
                  onChange={(e) => setInputs({ ...inputs, retirementAge: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="65"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="currentBalance" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                  Current Balance
                </Label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="currentBalance"
                    type="number"
                    inputMode="decimal"
                    value={inputs.currentBalance}
                    onChange={(e) => setInputs({ ...inputs, currentBalance: e.target.value })}
                    className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="10000"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Label htmlFor="annualContribution" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                  Annual Contribution
                </Label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="annualContribution"
                    type="number"
                    inputMode="decimal"
                    value={inputs.annualContribution}
                    onChange={(e) => setInputs({ ...inputs, annualContribution: e.target.value })}
                    className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="7000"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>2024 Limit:</strong> $7,000 (under 50) or $8,000 (50+)
                </p>
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
                    💡 <strong>Want more insights?</strong> Click "Show Advanced Options" to check income eligibility and compare Roth vs Traditional IRA.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Advanced Options */}
          {showAdvanced && (
            <>
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                    Income & Eligibility (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="magi" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      MAGI
                    </Label>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="magi"
                        type="number"
                        inputMode="decimal"
                        value={inputs.magi}
                        onChange={(e) => setInputs({ ...inputs, magi: e.target.value })}
                        className="pl-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="100000"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="filingStatus" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Filing Status
                    </Label>
                    <select
                      id="filingStatus"
                      value={inputs.filingStatus}
                      onChange={(e) => setInputs({ ...inputs, filingStatus: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="single">Single</option>
                      <option value="married">Married Filing Jointly</option>
                      <option value="marriedSeparate">Married Filing Separately</option>
                    </select>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-xs text-yellow-800">
                      <strong>MAGI</strong> = Modified Adjusted Gross Income. Used to determine Roth IRA eligibility.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                    Investment Details (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="expectedReturn" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Expected Return
                    </Label>
                    <div className="relative w-full">
                      <Input
                        id="expectedReturn"
                        type="number"
                        inputMode="decimal"
                        step="0.1"
                        value={inputs.expectedReturn}
                        onChange={(e) => setInputs({ ...inputs, expectedReturn: e.target.value })}
                        className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="text-xs text-gray-700">
                      <strong>Historical average:</strong> S&P 500 returns ~10% annually. Conservative estimate: 6-8%.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Calculate Button - Always at bottom */}
          <Button 
            onClick={calculateRothIRA}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Roth IRA
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          {!results ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Calculate</h3>
                <p className="text-gray-500">Enter your information and click "Calculate Roth IRA" to see your retirement projections.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div id="roth-ira-results">
                {/* Eligibility Status */}
                {!results.isEligible && (
                  <Card className="shadow-lg mb-6 border-2 border-red-300">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-red-900 mb-2">Income Limit Exceeded</h3>
                          <p className="text-red-800 mb-3">{results.phaseOutMessage}</p>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-red-900 mb-2">Consider Backdoor Roth IRA:</p>
                            <ol className="text-sm text-red-800 space-y-1 ml-4">
                              <li>1. Contribute to Traditional IRA (non-deductible)</li>
                              <li>2. Immediately convert to Roth IRA</li>
                              <li>3. Pay taxes only on earnings (minimal if immediate)</li>
                              <li>4. Consult a tax professional for guidance</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {results.totalAllowedContribution < results.annualLimit && results.isEligible && (
                  <Card className="shadow-lg mb-6 border-2 border-yellow-300">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <Info className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-yellow-900 mb-2">Partial Eligibility</h3>
                          <p className="text-yellow-800">{results.phaseOutMessage}</p>
                          <p className="text-sm text-yellow-700 mt-2">
                            Maximum contribution: <strong>{formatCurrency(results.totalAllowedContribution)}</strong> (instead of {formatCurrency(results.annualLimit)})
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Summary Cards */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Retirement Projection</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Roth IRA Balance at {inputs.retirementAge}</p>
                        <p className="text-2xl sm:text-3xl font-bold text-green-600 break-all">
                          {formatCurrency(results.retirementBalance)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">100% Tax-Free</p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Total Contributions</p>
                        <p className="text-2xl sm:text-3xl font-bold text-blue-600 break-all">
                          {formatCurrency(results.totalContributions)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Over {results.yearsToRetirement} years</p>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Investment Growth</p>
                        <p className="text-2xl sm:text-3xl font-bold text-purple-600 break-all">
                          {formatCurrency(results.totalGrowth)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Tax-Free Earnings</p>
                      </div>

                      <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Roth IRA Advantage</p>
                        <p className="text-2xl sm:text-3xl font-bold text-orange-600 break-all">
                          {formatCurrency(results.rothAdvantage)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">vs Traditional IRA (24% tax)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Balance Breakdown */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Balance Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={breakdownData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {breakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Growth Over Time */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Growth Over Time</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={results.yearlyProjections.filter((_, i) => i % 5 === 0 || i === results.yearlyProjections.length - 1)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" label={{ value: 'Age', position: 'insideBottom', offset: -5 }} />
                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} name="Balance" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Roth vs Traditional Comparison */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Roth IRA vs Traditional IRA</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="value" fill="#10b981" name="After-Tax Value at Retirement" />
                      </BarChart>
                    </ResponsiveContainer>

                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-3">Key Differences:</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-blue-300">
                              <th className="text-left py-2 px-2">Feature</th>
                              <th className="text-left py-2 px-2">Roth IRA</th>
                              <th className="text-left py-2 px-2">Traditional IRA</th>
                            </tr>
                          </thead>
                          <tbody className="text-blue-900">
                            <tr className="border-b border-blue-200">
                              <td className="py-2 px-2">Contributions</td>
                              <td className="py-2 px-2">After-tax (no deduction)</td>
                              <td className="py-2 px-2">Pre-tax (tax deduction)</td>
                            </tr>
                            <tr className="border-b border-blue-200">
                              <td className="py-2 px-2">Withdrawals</td>
                              <td className="py-2 px-2 font-bold text-green-700">100% Tax-Free</td>
                              <td className="py-2 px-2">Fully Taxed</td>
                            </tr>
                            <tr className="border-b border-blue-200">
                              <td className="py-2 px-2">RMDs (age 73)</td>
                              <td className="py-2 px-2 font-bold text-green-700">None</td>
                              <td className="py-2 px-2">Required</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-2">Income Limits</td>
                              <td className="py-2 px-2">Yes (phase-out)</td>
                              <td className="py-2 px-2">No (for contributions)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Export Buttons */}
              <Card className="shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={saveAsImage} variant="outline" className="flex-1 min-w-[140px]">
                      <Download className="h-4 w-4 mr-2" />
                      Save as Image
                    </Button>
                    <Button onClick={printResults} variant="outline" className="flex-1 min-w-[140px]">
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <Button onClick={shareCalculation} variant="outline" className="flex-1 min-w-[140px]">
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

