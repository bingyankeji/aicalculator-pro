'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Info, Download, Printer, Share2, DollarSign, TrendingUp, Calculator, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import html2canvas from 'html2canvas';

interface Debt {
  id: string;
  name: string;
  balance: string;
  rate: string;
  minPayment: string;
}

interface ConsolidationInputs {
  consolidationRate: string;
  consolidationTerm: string;
  consolidationFee: string;
}

interface ConsolidationResults {
  // Current Debts
  totalCurrentDebt: number;
  totalMinPayment: number;
  weightedAvgRate: number;
  totalInterestCurrent: number;
  payoffTimeCurrent: number;
  
  // Consolidated Loan
  consolidatedPayment: number;
  consolidationFee: number;
  totalInterestConsolidated: number;
  payoffTimeConsolidated: number;
  
  // Savings
  monthlyPaymentSavings: number;
  totalInterestSavings: number;
  timeSavings: number;
  breakEvenMonths: number;
  
  // Comparison
  total5YearCostCurrent: number;
  total5YearCostConsolidated: number;
  netSavings5Year: number;
  
  // Credit Score Impact
  creditScoreImpact: string;
  utilizationChange: number;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function DebtConsolidationCalculator() {
  // 渐进式披露状态管理
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card 1', balance: '5000', rate: '18.99', minPayment: '150' },
    { id: '2', name: 'Credit Card 2', balance: '3000', rate: '22.99', minPayment: '90' },
  ]);

  const [inputs, setInputs] = useState<ConsolidationInputs>({
    // 高级字段（有默认值）
    consolidationRate: '10.5',
    consolidationTerm: '5',
    consolidationFee: '3',
  });

  const [results, setResults] = useState<ConsolidationResults | null>(null);

  const addDebt = () => {
    const newDebt: Debt = {
      id: Date.now().toString(),
      name: `Debt ${debts.length + 1}`,
      balance: '',
      rate: '',
      minPayment: '',
    };
    setDebts([...debts, newDebt]);
  };

  const removeDebt = (id: string) => {
    if (debts.length > 1) {
      setDebts(debts.filter(debt => debt.id !== id));
    }
  };

  const updateDebt = (id: string, field: keyof Debt, value: string) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  const calculateConsolidation = () => {
    // Calculate current debts total
    const totalCurrentDebt = debts.reduce((sum, debt) => 
      sum + (parseFloat(debt.balance) || 0), 0
    );
    
    const totalMinPayment = debts.reduce((sum, debt) => 
      sum + (parseFloat(debt.minPayment) || 0), 0
    );
    
    // Calculate weighted average rate
    const weightedSum = debts.reduce((sum, debt) => {
      const balance = parseFloat(debt.balance) || 0;
      const rate = parseFloat(debt.rate) || 0;
      return sum + (balance * rate);
    }, 0);
    const weightedAvgRate = totalCurrentDebt > 0 ? weightedSum / totalCurrentDebt : 0;
    
    // Calculate current scenario (using minimum payments)
    const monthlyRateCurrent = weightedAvgRate / 100 / 12;
    let remainingBalanceCurrent = totalCurrentDebt;
    let monthsCurrent = 0;
    let totalInterestCurrent = 0;
    
    while (remainingBalanceCurrent > 0 && monthsCurrent < 600) {
      const interestCharge = remainingBalanceCurrent * monthlyRateCurrent;
      const principalPayment = Math.min(totalMinPayment - interestCharge, remainingBalanceCurrent);
      
      if (principalPayment <= 0) {
        monthsCurrent = 600; // Never pays off
        break;
      }
      
      totalInterestCurrent += interestCharge;
      remainingBalanceCurrent -= principalPayment;
      monthsCurrent++;
    }
    
    // Consolidation loan calculations
    const consolidationRate = parseFloat(inputs.consolidationRate) || 0;
    const consolidationTerm = parseFloat(inputs.consolidationTerm) || 5;
    const consolidationFeePercent = parseFloat(inputs.consolidationFee) || 0;
    
    const consolidationFee = totalCurrentDebt * (consolidationFeePercent / 100);
    const totalLoanAmount = totalCurrentDebt + consolidationFee;
    
    const monthlyRateConsolidated = consolidationRate / 100 / 12;
    const numPayments = consolidationTerm * 12;
    
    const consolidatedPayment = totalLoanAmount * 
      (monthlyRateConsolidated * Math.pow(1 + monthlyRateConsolidated, numPayments)) /
      (Math.pow(1 + monthlyRateConsolidated, numPayments) - 1);
    
    const totalInterestConsolidated = (consolidatedPayment * numPayments) - totalCurrentDebt;
    
    // Savings calculations
    const monthlyPaymentSavings = totalMinPayment - consolidatedPayment;
    const totalInterestSavings = totalInterestCurrent - totalInterestConsolidated;
    const timeSavings = monthsCurrent - numPayments;
    const breakEvenMonths = consolidationFee / Math.max(monthlyPaymentSavings, 1);
    
    // 5-year comparison
    const months5Year = 60;
    const total5YearCostCurrent = Math.min(
      totalMinPayment * months5Year,
      totalCurrentDebt + totalInterestCurrent
    );
    const total5YearCostConsolidated = Math.min(
      consolidatedPayment * months5Year,
      totalLoanAmount + totalInterestConsolidated
    );
    const netSavings5Year = total5YearCostCurrent - total5YearCostConsolidated;
    
    // Credit score impact
    let creditScoreImpact = 'Neutral';
    if (consolidationFeePercent === 0 && monthlyPaymentSavings > 0) {
      creditScoreImpact = 'Positive';
    } else if (consolidationFeePercent > 5) {
      creditScoreImpact = 'Slightly Negative';
    }
    
    const utilizationChange = -15; // Typically improves by closing revolving accounts
    
    setResults({
      totalCurrentDebt,
      totalMinPayment,
      weightedAvgRate,
      totalInterestCurrent,
      payoffTimeCurrent: monthsCurrent,
      consolidatedPayment,
      consolidationFee,
      totalInterestConsolidated,
      payoffTimeConsolidated: numPayments,
      monthlyPaymentSavings,
      totalInterestSavings,
      timeSavings,
      breakEvenMonths,
      total5YearCostCurrent,
      total5YearCostConsolidated,
      netSavings5Year,
      creditScoreImpact,
      utilizationChange,
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

  const formatMonths = (months: number): string => {
    const years = Math.floor(months / 12);
    const remainingMonths = Math.round(months % 12);
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years} years ${remainingMonths} months`;
  };

  const shareCalculation = () => {
    const totalDebt = debts.reduce((sum, debt) => sum + (parseFloat(debt.balance) || 0), 0);
    const url = `${window.location.origin}${window.location.pathname}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Debt Consolidation Calculator Results',
        text: `Total Debt: ${formatCurrency(totalDebt)}`,
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
    const element = document.getElementById('consolidation-results');
    if (element) {
      const canvas = await html2canvas(element, { scale: 2 });
      const link = document.createElement('a');
      link.download = 'debt-consolidation-results.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const printResults = () => {
    window.print();
  };

  const comparisonData = results ? [
    { name: 'Current Debts', payment: results.totalMinPayment, interest: results.totalInterestCurrent },
    { name: 'Consolidated', payment: results.consolidatedPayment, interest: results.totalInterestConsolidated },
  ] : [];

  const savingsData = results ? [
    { category: 'Monthly Payment', amount: results.monthlyPaymentSavings },
    { category: 'Total Interest', amount: results.totalInterestSavings },
    { category: '5-Year Net', amount: results.netSavings5Year },
  ] : [];

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
                Your Debts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {debts.map((debt, index) => (
                <div key={debt.id} className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <Input
                      type="text"
                      value={debt.name}
                      onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                      className="font-medium text-sm w-2/3"
                      placeholder="Debt name"
                    />
                    {debts.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDebt(debt.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <Label className="text-xs text-gray-600">Balance</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <Input
                          type="number"
                          inputMode="decimal"
                          value={debt.balance}
                          onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)}
                          className="pl-7"
                          placeholder="5000"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-gray-600">Interest Rate</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          inputMode="decimal"
                          step="0.1"
                          value={debt.rate}
                          onChange={(e) => updateDebt(debt.id, 'rate', e.target.value)}
                          className="pr-7"
                          placeholder="18.99"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-gray-600">Min Payment</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <Input
                          type="number"
                          inputMode="decimal"
                          value={debt.minPayment}
                          onChange={(e) => updateDebt(debt.id, 'minPayment', e.target.value)}
                          className="pl-7"
                          placeholder="150"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={addDebt}
                className="w-full text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Debt
              </Button>

              {/* Show Advanced Options Button */}
              <Button 
                variant="outline"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full text-sm font-medium py-3 min-h-[44px]"
              >
                {showAdvanced ? (
                  <>Hide Consolidation Options ▲</>
                ) : (
                  <>Show Consolidation Options ▼</>
                )}
              </Button>

              {/* Hint for Advanced Features */}
              {!showAdvanced && results && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Want to customize?</strong> Click "Show Consolidation Options" to adjust interest rate, loan term, and fees.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ⚡ 高级选项 - 条件显示 */}
          {showAdvanced && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Consolidation Loan Details (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <Label htmlFor="consolidationRate" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                    Interest Rate
                  </Label>
                  <div className="relative w-full">
                    <Input
                      id="consolidationRate"
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      value={inputs.consolidationRate}
                      onChange={(e) => setInputs({ ...inputs, consolidationRate: e.target.value })}
                      className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="10.5"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <Label htmlFor="consolidationTerm" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                    Loan Term
                  </Label>
                  <select
                    id="consolidationTerm"
                    value={inputs.consolidationTerm}
                    onChange={(e) => setInputs({ ...inputs, consolidationTerm: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                    <option value="4">4 years</option>
                    <option value="5">5 years</option>
                    <option value="7">7 years</option>
                    <option value="10">10 years</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <Label htmlFor="consolidationFee" className="text-sm font-medium text-gray-700 sm:w-32 sm:flex-shrink-0">
                    Origination Fee
                  </Label>
                  <div className="relative w-full">
                    <Input
                      id="consolidationFee"
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      value={inputs.consolidationFee}
                      onChange={(e) => setInputs({ ...inputs, consolidationFee: e.target.value })}
                      className="pr-7 w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="3"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Calculate Button - 始终在最底部 */}
          <Button 
            onClick={calculateConsolidation}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Consolidation
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          {!results ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Calculate</h3>
                <p className="text-gray-500">Enter your debts and click "Calculate Consolidation" to see your savings potential.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div id="consolidation-results">
                {/* Summary Card */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Consolidation Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Current Total Debt</p>
                        <p className="text-2xl sm:text-3xl font-bold text-red-600 break-all">
                          {formatCurrency(results.totalCurrentDebt)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Avg Rate: {results.weightedAvgRate.toFixed(2)}%</p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Monthly Payment Savings</p>
                        <p className="text-2xl sm:text-3xl font-bold text-green-600 break-all">
                          {formatCurrency(results.monthlyPaymentSavings)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {results.monthlyPaymentSavings > 0 ? 'Lower payment' : 'Higher payment'}
                        </p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Total Interest Savings</p>
                        <p className="text-2xl sm:text-3xl font-bold text-blue-600 break-all">
                          {formatCurrency(results.totalInterestSavings)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Over loan lifetime</p>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Time Savings</p>
                        <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                          {formatMonths(Math.abs(results.timeSavings))}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {results.timeSavings > 0 ? 'Faster payoff' : 'Longer term'}
                        </p>
                      </div>
                    </div>

                    {results.breakEvenMonths > 0 && (
                      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-800">Break-Even Point</p>
                            <p className="text-sm text-yellow-700 mt-1">
                              You'll break even on the origination fee in {Math.ceil(results.breakEvenMonths)} months.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Comparison Chart */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Payment & Interest Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="payment" fill="#3b82f6" name="Monthly Payment" />
                        <Bar dataKey="interest" fill="#10b981" name="Total Interest" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Detailed Comparison Table */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Detailed Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[500px] text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-2 font-semibold text-gray-700">Metric</th>
                            <th className="text-right py-3 px-2 font-semibold text-gray-700">Current Debts</th>
                            <th className="text-right py-3 px-2 font-semibold text-gray-700">Consolidated</th>
                            <th className="text-right py-3 px-2 font-semibold text-green-700">Difference</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 px-2 text-gray-700">Monthly Payment</td>
                            <td className="text-right py-3 px-2">{formatCurrency(results.totalMinPayment)}</td>
                            <td className="text-right py-3 px-2">{formatCurrency(results.consolidatedPayment)}</td>
                            <td className="text-right py-3 px-2 font-semibold text-green-600">
                              {formatCurrency(results.monthlyPaymentSavings)}
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 px-2 text-gray-700">Interest Rate</td>
                            <td className="text-right py-3 px-2">{results.weightedAvgRate.toFixed(2)}%</td>
                            <td className="text-right py-3 px-2">{inputs.consolidationRate}%</td>
                            <td className="text-right py-3 px-2 font-semibold text-green-600">
                              {(results.weightedAvgRate - parseFloat(inputs.consolidationRate)).toFixed(2)}%
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 px-2 text-gray-700">Payoff Time</td>
                            <td className="text-right py-3 px-2">{formatMonths(results.payoffTimeCurrent)}</td>
                            <td className="text-right py-3 px-2">{formatMonths(results.payoffTimeConsolidated)}</td>
                            <td className="text-right py-3 px-2 font-semibold text-green-600">
                              {formatMonths(Math.abs(results.timeSavings))}
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 px-2 text-gray-700">Total Interest</td>
                            <td className="text-right py-3 px-2">{formatCurrency(results.totalInterestCurrent)}</td>
                            <td className="text-right py-3 px-2">{formatCurrency(results.totalInterestConsolidated)}</td>
                            <td className="text-right py-3 px-2 font-semibold text-green-600">
                              {formatCurrency(results.totalInterestSavings)}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 px-2 text-gray-700">5-Year Total Cost</td>
                            <td className="text-right py-3 px-2">{formatCurrency(results.total5YearCostCurrent)}</td>
                            <td className="text-right py-3 px-2">{formatCurrency(results.total5YearCostConsolidated)}</td>
                            <td className="text-right py-3 px-2 font-semibold text-green-600">
                              {formatCurrency(results.netSavings5Year)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Credit Score Impact */}
                <Card className="shadow-lg mb-6">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-200">
                    <CardTitle className="text-lg sm:text-xl">Credit Score Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Expected Impact</span>
                        <span className={`text-lg font-bold ${
                          results.creditScoreImpact === 'Positive' ? 'text-green-600' :
                          results.creditScoreImpact === 'Neutral' ? 'text-blue-600' :
                          'text-yellow-600'
                        }`}>
                          {results.creditScoreImpact}
                        </span>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">How Consolidation Affects Your Credit:</h4>
                        <ul className="space-y-2 text-sm text-blue-800">
                          <li className="flex items-start">
                            <span className="mr-2">✓</span>
                            <span><strong>Hard Inquiry:</strong> Temporary 5-10 point drop when applying</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">✓</span>
                            <span><strong>Credit Mix:</strong> Adding an installment loan can improve your mix</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">✓</span>
                            <span><strong>Utilization:</strong> Paying off credit cards lowers utilization (~30% of score)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">⚠</span>
                            <span><strong>Account Age:</strong> Closing old accounts may reduce average age</span>
                          </li>
                        </ul>
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

