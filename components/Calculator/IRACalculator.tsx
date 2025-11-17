'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Info, Download, Printer, Share2, DollarSign, TrendingUp, Calculator, AlertCircle, PiggyBank } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import html2canvas from 'html2canvas';

interface IRAInputs {
  currentAge: string;
  retirementAge: string;
  currentBalance: string;
  annualContribution: string;
  expectedReturn: string;
  // Advanced options
  iraType: string;
  currentTaxRate: string;
  retirementTaxRate: string;
  has401k: string;
}

interface IRAResults {
  // Basic projections
  retirementBalance: number;
  totalContributions: number;
  totalGrowth: number;
  yearsToRetirement: number;
  
  // Traditional IRA specifics
  traditionalTaxSavingsNow: number;
  traditionalTaxOwedLater: number;
  traditionalNetBalance: number;
  
  // Roth IRA specifics
  rothTaxPaidNow: number;
  rothNetBalance: number;
  
  // Comparison
  rothAdvantage: number;
  breakEvenYear: number;
  
  // RMD calculations (Traditional only)
  rmdAge: number;
  firstRMD: number;
  
  // Projections
  yearlyProjections: Array<{
    year: number;
    age: number;
    contribution: number;
    balance: number;
    taxSavings: number;
  }>;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

// 2024 IRA contribution limits
const CONTRIBUTION_LIMITS = {
  under50: 7000,
  over50: 8000,
  catchUpAge: 50,
};

export default function IRACalculator() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [inputs, setInputs] = useState<IRAInputs>({
    // Basic fields
    currentAge: '30',
    retirementAge: '65',
    currentBalance: '10000',
    annualContribution: '7000',
    expectedReturn: '8',
    // Advanced fields (with defaults)
    iraType: 'roth',
    currentTaxRate: '24',
    retirementTaxRate: '22',
    has401k: 'no',
  });

  const [results, setResults] = useState<IRAResults | null>(null);

  const calculateIRA = () => {
    const currentAge = parseInt(inputs.currentAge) || 0;
    const retirementAge = parseInt(inputs.retirementAge) || 65;
    const currentBalance = parseFloat(inputs.currentBalance) || 0;
    const annualContribution = parseFloat(inputs.annualContribution) || 0;
    const expectedReturn = parseFloat(inputs.expectedReturn) || 8;
    const currentTaxRate = parseFloat(inputs.currentTaxRate) / 100 || 0.24;
    const retirementTaxRate = parseFloat(inputs.retirementTaxRate) / 100 || 0.22;
    const iraType = inputs.iraType;

    const yearsToRetirement = retirementAge - currentAge;

    // Calculate growth projections
    const yearlyProjections: IRAResults['yearlyProjections'] = [];
    let balance = currentBalance;
    let totalContributions = currentBalance;
    const monthlyReturn = expectedReturn / 100 / 12;

    for (let year = 0; year <= yearsToRetirement; year++) {
      const age = currentAge + year;
      const yearContribution = year === 0 ? 0 : annualContribution;
      
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
      
      totalContributions += yearContribution;

      // Tax savings for Traditional IRA
      const taxSavings = iraType === 'traditional' ? yearContribution * currentTaxRate : 0;

      yearlyProjections.push({
        year,
        age,
        contribution: yearContribution,
        balance: Math.round(balance),
        taxSavings: Math.round(taxSavings),
      });
    }

    const retirementBalance = balance;
    const totalGrowth = retirementBalance - totalContributions;

    // Traditional IRA calculations
    const traditionalTaxSavingsNow = totalContributions * currentTaxRate;
    const traditionalTaxOwedLater = retirementBalance * retirementTaxRate;
    const traditionalNetBalance = retirementBalance - traditionalTaxOwedLater;

    // Roth IRA calculations
    const rothTaxPaidNow = 0; // Already paid taxes on contributions
    const rothNetBalance = retirementBalance; // No tax on withdrawals

    // Comparison
    const rothAdvantage = rothNetBalance - traditionalNetBalance;

    // Break-even calculation
    let breakEvenYear = 0;
    if (currentTaxRate > retirementTaxRate) {
      // Traditional might be better initially
      breakEvenYear = Math.ceil((traditionalTaxSavingsNow) / ((currentTaxRate - retirementTaxRate) * annualContribution));
    } else {
      // Roth is better from the start
      breakEvenYear = 0;
    }

    // RMD calculations (Traditional IRA only, starting at age 73)
    const rmdAge = 73;
    const rmdFactor = 26.5; // Approximate factor for age 73
    const firstRMD = retirementBalance / rmdFactor;

    setResults({
      retirementBalance,
      totalContributions,
      totalGrowth,
      yearsToRetirement,
      traditionalTaxSavingsNow,
      traditionalTaxOwedLater,
      traditionalNetBalance,
      rothTaxPaidNow,
      rothNetBalance,
      rothAdvantage,
      breakEvenYear,
      rmdAge,
      firstRMD,
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
        title: 'IRA Calculator Results',
        text: `Projected IRA Balance at Retirement: ${results ? formatCurrency(results.retirementBalance) : 'Calculate now'}`,
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
    const element = document.getElementById('ira-results');
    if (element) {
      const canvas = await html2canvas(element, { scale: 2 });
      const link = document.createElement('a');
      link.download = 'ira-results.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const printResults = () => {
    window.print();
  };

  const comparisonData = results ? [
    { 
      name: 'Traditional IRA', 
      gross: results.retirementBalance,
      afterTax: results.traditionalNetBalance,
      taxOwed: results.traditionalTaxOwedLater,
    },
    { 
      name: 'Roth IRA', 
      gross: results.retirementBalance,
      afterTax: results.rothNetBalance,
      taxOwed: 0,
    },
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
                    💡 <strong>Want more insights?</strong> Click &quot;Show Advanced Options&quot; to compare Traditional vs Roth IRA and see tax implications.
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
                    IRA Type & Tax Rates (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="iraType" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      IRA Type
                    </Label>
                    <select
                      id="iraType"
                      value={inputs.iraType}
                      onChange={(e) => setInputs({ ...inputs, iraType: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="roth">Roth IRA</option>
                      <option value="traditional">Traditional IRA</option>
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="currentTaxRate" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Current Tax Rate
                    </Label>
                    <div className="relative w-full">
                      <Input
                        id="currentTaxRate"
                        type="number"
                        inputMode="decimal"
                        step="0.1"
                        value={inputs.currentTaxRate}
                        onChange={(e) => setInputs({ ...inputs, currentTaxRate: e.target.value })}
                        className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="24"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="retirementTaxRate" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Retirement Tax Rate
                    </Label>
                    <div className="relative w-full">
                      <Input
                        id="retirementTaxRate"
                        type="number"
                        inputMode="decimal"
                        step="0.1"
                        value={inputs.retirementTaxRate}
                        onChange={(e) => setInputs({ ...inputs, retirementTaxRate: e.target.value })}
                        className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="22"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-xs text-yellow-800">
                      <strong>Tax brackets 2024:</strong> 10%, 12%, 22%, 24%, 32%, 35%, 37%
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

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="has401k" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                      Have 401(k)?
                    </Label>
                    <select
                      id="has401k"
                      value={inputs.has401k}
                      onChange={(e) => setInputs({ ...inputs, has401k: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>

                  {inputs.has401k === 'yes' && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-xs text-orange-800">
                        <strong>Note:</strong> If you have a 401(k), Traditional IRA contributions may not be tax-deductible depending on your income.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* Calculate Button - Always at bottom */}
          <Button 
            onClick={calculateIRA}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate IRA
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          {!results ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Calculate</h3>
                <p className="text-gray-500">Enter your information and click &quot;Calculate IRA&quot; to see your retirement projections.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div id="ira-results">
                {/* Summary Cards */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Retirement Projection</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">IRA Balance at {inputs.retirementAge}</p>
                        <p className="text-2xl sm:text-3xl font-bold text-green-600 break-all">
                          {formatCurrency(results.retirementBalance)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Before taxes</p>
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
                        <p className="text-xs text-gray-600 mt-1">Tax-deferred earnings</p>
                      </div>

                      <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Roth IRA Advantage</p>
                        <p className="text-2xl sm:text-3xl font-bold text-orange-600 break-all">
                          {formatCurrency(results.rothAdvantage)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">vs Traditional IRA</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Traditional vs Roth Comparison */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Traditional IRA vs Roth IRA</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="afterTax" fill="#10b981" name="After-Tax Value" />
                        <Bar dataKey="taxOwed" fill="#ef4444" name="Tax Owed" />
                      </BarChart>
                    </ResponsiveContainer>

                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b-2 border-gray-300">
                            <th className="text-left py-3 px-2 font-semibold text-gray-700">Feature</th>
                            <th className="text-right py-3 px-2 font-semibold text-gray-700">Traditional IRA</th>
                            <th className="text-right py-3 px-2 font-semibold text-gray-700">Roth IRA</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-3 px-2 text-gray-700">Tax Savings Now</td>
                            <td className="text-right py-3 px-2 font-semibold text-green-600">
                              {formatCurrency(results.traditionalTaxSavingsNow)}
                            </td>
                            <td className="text-right py-3 px-2 text-gray-500">$0</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-3 px-2 text-gray-700">Tax Owed in Retirement</td>
                            <td className="text-right py-3 px-2 font-semibold text-red-600">
                              {formatCurrency(results.traditionalTaxOwedLater)}
                            </td>
                            <td className="text-right py-3 px-2 font-semibold text-green-600">$0</td>
                          </tr>
                          <tr className="border-b border-gray-200 bg-gray-50">
                            <td className="py-3 px-2 text-gray-900 font-bold">Net Balance</td>
                            <td className="text-right py-3 px-2 font-bold text-blue-600">
                              {formatCurrency(results.traditionalNetBalance)}
                            </td>
                            <td className="text-right py-3 px-2 font-bold text-green-600">
                              {formatCurrency(results.rothNetBalance)}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 px-2 text-gray-700">RMDs Required?</td>
                            <td className="text-right py-3 px-2 text-red-600">Yes (age {results.rmdAge})</td>
                            <td className="text-right py-3 px-2 text-green-600">No</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Balance Breakdown */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
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
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-200">
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

                {/* RMD Information (Traditional IRA) */}
                {inputs.iraType === 'traditional' && (
                  <Card className="shadow-lg mb-6">
                    <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-gray-200">
                      <CardTitle className="text-lg sm:text-xl">Required Minimum Distributions (RMDs)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-yellow-900 mb-2">Traditional IRA RMD Requirements</p>
                              <p className="text-sm text-yellow-800 mb-2">
                                Starting at age {results.rmdAge}, you must withdraw a minimum amount each year.
                              </p>
                              <p className="text-sm text-yellow-800">
                                <strong>Your first RMD (estimated):</strong> {formatCurrency(results.firstRMD)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Why RMDs Matter:</h4>
                          <ul className="space-y-1 text-sm text-blue-800">
                            <li>• Forces you to withdraw and pay taxes</li>
                            <li>• Can push you into higher tax bracket</li>
                            <li>• May affect Social Security taxation</li>
                            <li>• Penalty for missing RMD: 25% of required amount</li>
                            <li>• Roth IRAs have NO RMDs during your lifetime</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
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

