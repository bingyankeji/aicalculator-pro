'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Copy, Share2, Printer, Download, TrendingUp, PieChart, AlertTriangle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import {
  LineChart, Line, PieChart as RePieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface CDInputs {
  depositAmount: string;
  annualRate: string;
  termYears: string;
  termMonths: string;
  compoundingFrequency: 'daily' | 'monthly' | 'quarterly' | 'annually' | 'continuously';
  earlyWithdrawalPenaltyMonths: string;
  marginalTaxRate: string;
  stateTaxRate: string;
}

interface CalculationResult {
  depositAmount: number;
  annualRate: number;
  termMonths: number;
  termYears: number;
  maturityValue: number;
  totalInterest: number;
  apy: number;
  effectiveRate: number;
  monthlyBreakdown: Array<{
    month: number;
    balance: number;
    interestEarned: number;
    totalInterest: number;
  }>;
  yearlyBreakdown: Array<{
    year: number;
    deposit: number;
    interest: number;
    endingBalance: number;
  }>;
  earlyWithdrawalPenalty: number;
  maturityDate: string;
  taxCalculation?: {
    marginalTaxRate: number;
    stateTaxRate: number;
    federalTax: number;
    stateTax: number;
    totalTax: number;
    afterTaxInterest: number;
    afterTaxMaturityValue: number;
    effectiveAfterTaxRate: number;
  };
}

export default function CDCalculator() {
  const [inputs, setInputs] = useState<CDInputs>({
    depositAmount: '10000',
    annualRate: '4.5',
    termYears: '3',
    termMonths: '0',
    compoundingFrequency: 'monthly',
    earlyWithdrawalPenaltyMonths: '3',
    marginalTaxRate: '22',
    stateTaxRate: '5',
  });

  const [activeTab, setActiveTab] = useState<'charts' | 'annual' | 'monthly'>('charts');

  const [result, setResult] = useState<CalculationResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/cd-calculator',
    getShareParams: () => ({
      d: inputs.depositAmount,
      r: inputs.annualRate,
      ty: inputs.termYears,
      tm: inputs.termMonths,
      f: inputs.compoundingFrequency.charAt(0),
    }),
    getShareText: () => {
      if (result) {
        const years = Math.floor(result.termYears);
        const months = result.termMonths % 12;
        const termStr = years > 0 ? `${years}y ${months}m` : `${months}m`;
        return `CD Calculator: $${result.depositAmount.toLocaleString()} at ${result.annualRate}% for ${termStr} = $${result.maturityValue.toLocaleString()} (APY: ${result.apy.toFixed(2)}%)`;
      }
      return 'Calculate your CD (Certificate of Deposit) returns with tax impact analysis!';
    },
  });

  // Load from URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get('d');
    const r = params.get('r');
    const ty = params.get('ty');
    const tm = params.get('tm');
    const f = params.get('f');

    if (d || r || ty || tm || f) {
      setInputs(prev => ({
        ...prev,
        depositAmount: d || prev.depositAmount,
        annualRate: r || prev.annualRate,
        termYears: ty || prev.termYears,
        termMonths: tm || prev.termMonths,
        compoundingFrequency: f === 'd' ? 'daily' : f === 'm' ? 'monthly' : f === 'q' ? 'quarterly' : f === 'a' ? 'annually' : f === 'c' ? 'continuously' : prev.compoundingFrequency,
      }));
    }
  }, []);

  const handleInputChange = (field: keyof CDInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = () => {
    const depositAmount = parseFloat(inputs.depositAmount) || 0;
    const annualRate = parseFloat(inputs.annualRate) || 0;
    const termYears = parseFloat(inputs.termYears) || 0;
    const termMonths = parseFloat(inputs.termMonths) || 0;
    const totalMonths = termYears * 12 + termMonths;
    const penaltyMonths = parseFloat(inputs.earlyWithdrawalPenaltyMonths) || 0;
    const marginalTaxRate = parseFloat(inputs.marginalTaxRate) || 0;
    const stateTaxRate = parseFloat(inputs.stateTaxRate) || 0;

    if (depositAmount <= 0 || annualRate <= 0 || totalMonths <= 0) {
      alert('Please enter valid positive numbers for all required fields.');
      return;
    }

    const rateDecimal = annualRate / 100;
    const totalYears = totalMonths / 12;

    let maturityValue: number;
    let apy: number;

    // Calculate based on compounding frequency
    if (inputs.compoundingFrequency === 'continuously') {
      // Continuous compounding: A = Pe^(rt)
      maturityValue = depositAmount * Math.exp(rateDecimal * totalYears);
      apy = (Math.exp(rateDecimal) - 1) * 100;
    } else {
      // Regular compounding: A = P(1 + r/n)^(nt)
      const compoundingPerYear = inputs.compoundingFrequency === 'daily' ? 365 :
                                  inputs.compoundingFrequency === 'monthly' ? 12 :
                                  inputs.compoundingFrequency === 'quarterly' ? 4 : 1;
      
      maturityValue = depositAmount * Math.pow(1 + rateDecimal / compoundingPerYear, compoundingPerYear * totalYears);
      apy = (Math.pow(1 + rateDecimal / compoundingPerYear, compoundingPerYear) - 1) * 100;
    }

    const totalInterest = maturityValue - depositAmount;

    // Monthly breakdown
    const monthlyBreakdown: Array<{
      month: number;
      balance: number;
      interestEarned: number;
      totalInterest: number;
    }> = [];

    for (let month = 0; month <= totalMonths; month++) {
      const monthsYears = month / 12;
      let balance: number;
      
      if (inputs.compoundingFrequency === 'continuously') {
        balance = depositAmount * Math.exp(rateDecimal * monthsYears);
      } else {
        const compoundingPerYear = inputs.compoundingFrequency === 'daily' ? 365 :
                                    inputs.compoundingFrequency === 'monthly' ? 12 :
                                    inputs.compoundingFrequency === 'quarterly' ? 4 : 1;
        balance = depositAmount * Math.pow(1 + rateDecimal / compoundingPerYear, compoundingPerYear * monthsYears);
      }
      
      const prevBalance = month > 0 ? monthlyBreakdown[month - 1].balance : depositAmount;
      const interestEarned = balance - prevBalance;
      const totalInterestSoFar = balance - depositAmount;

      monthlyBreakdown.push({
        month,
        balance: Math.round(balance * 100) / 100,
        interestEarned: Math.round(interestEarned * 100) / 100,
        totalInterest: Math.round(totalInterestSoFar * 100) / 100,
      });
    }

    // Yearly breakdown
    const yearlyBreakdown: Array<{
      year: number;
      deposit: number;
      interest: number;
      endingBalance: number;
    }> = [];

    for (let year = 1; year <= Math.ceil(totalYears); year++) {
      const monthIndex = Math.min(year * 12, totalMonths);
      const data = monthlyBreakdown[monthIndex];
      const prevYearData = year > 1 ? monthlyBreakdown[(year - 1) * 12] : { balance: depositAmount, totalInterest: 0 };
      
      yearlyBreakdown.push({
        year,
        deposit: year === 1 ? depositAmount : 0,
        interest: data.totalInterest - prevYearData.totalInterest,
        endingBalance: data.balance,
      });
    }

    // Tax calculation
    let taxCalculation = undefined;
    if (marginalTaxRate > 0 || stateTaxRate > 0) {
      const federalTax = totalInterest * (marginalTaxRate / 100);
      const stateTax = totalInterest * (stateTaxRate / 100);
      const totalTax = federalTax + stateTax;
      const afterTaxInterest = totalInterest - totalTax;
      const afterTaxMaturityValue = depositAmount + afterTaxInterest;
      const effectiveAfterTaxRate = (afterTaxInterest / depositAmount / totalYears) * 100;

      taxCalculation = {
        marginalTaxRate,
        stateTaxRate,
        federalTax: Math.round(federalTax * 100) / 100,
        stateTax: Math.round(stateTax * 100) / 100,
        totalTax: Math.round(totalTax * 100) / 100,
        afterTaxInterest: Math.round(afterTaxInterest * 100) / 100,
        afterTaxMaturityValue: Math.round(afterTaxMaturityValue * 100) / 100,
        effectiveAfterTaxRate: Math.round(effectiveAfterTaxRate * 100) / 100,
      };
    }

    // Calculate early withdrawal penalty
    const monthlyInterestRate = rateDecimal / 12;
    const earlyWithdrawalPenalty = depositAmount * monthlyInterestRate * penaltyMonths;

    // Calculate maturity date
    const today = new Date();
    const maturityDate = new Date(today.getFullYear(), today.getMonth() + totalMonths, today.getDate());

    setResult({
      depositAmount,
      annualRate,
      termMonths: totalMonths,
      termYears: totalYears,
      maturityValue: Math.round(maturityValue * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      apy: Math.round(apy * 100) / 100,
      effectiveRate: apy,
      monthlyBreakdown,
      yearlyBreakdown,
      earlyWithdrawalPenalty: Math.round(earlyWithdrawalPenalty * 100) / 100,
      maturityDate: maturityDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      taxCalculation,
    });
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.download = `cd-calculator-result-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>CD Calculator Results</title>
              <style>
                body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print {
                  body { padding: 0; }
                  img { max-width: 100%; page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" onload="window.print();"/>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
      alert('Failed to print. Please try again.');
    }
  };

  const handleCopyResult = () => {
    if (!result) return;
    
    const years = Math.floor(result.termYears);
    const months = result.termMonths % 12;
    const termStr = years > 0 ? `${years} years ${months} months` : `${months} months`;
    
    let text = `CD Calculator Results:\n\nDeposit Amount: $${result.depositAmount.toLocaleString()}
Annual Rate: ${result.annualRate}%
Term: ${termStr}
Compounding: ${inputs.compoundingFrequency}
APY: ${result.apy.toFixed(2)}%

Maturity Value: $${result.maturityValue.toLocaleString()}
Total Interest: $${result.totalInterest.toLocaleString()}
Maturity Date: ${result.maturityDate}`;

    if (result.taxCalculation) {
      text += `\n\nTax Impact:
Federal Tax (${result.taxCalculation.marginalTaxRate}%): -$${result.taxCalculation.federalTax.toLocaleString()}
State Tax (${result.taxCalculation.stateTaxRate}%): -$${result.taxCalculation.stateTax.toLocaleString()}
Total Tax: -$${result.taxCalculation.totalTax.toLocaleString()}

After-Tax Interest: $${result.taxCalculation.afterTaxInterest.toLocaleString()}
After-Tax Maturity Value: $${result.taxCalculation.afterTaxMaturityValue.toLocaleString()}
Effective After-Tax Rate: ${result.taxCalculation.effectiveAfterTaxRate.toFixed(2)}% per year`;
    }

    navigator.clipboard.writeText(text).then(() => {
      alert('Results copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy results.');
    });
  };

  // Prepare chart data
  const growthChartData = result?.monthlyBreakdown.filter((_, idx) => idx % Math.max(1, Math.floor(result.monthlyBreakdown.length / 20)) === 0) || [];

  const breakdownPieData = result ? [
    { name: 'Principal', value: result.depositAmount, color: '#3B82F6' },
    { name: 'Interest Earned', value: result.totalInterest, color: '#10B981' },
  ] : [];

  // Interest rate sensitivity analysis (±0.5%)
  const sensitivityData = result ? [
    { rate: result.annualRate - 0.5, earnings: result.depositAmount * Math.pow(1 + (result.annualRate - 0.5) / 100 / 12, 12 * result.termMonths / 12) - result.depositAmount },
    { rate: result.annualRate, earnings: result.totalInterest },
    { rate: result.annualRate + 0.5, earnings: result.depositAmount * Math.pow(1 + (result.annualRate + 0.5) / 100 / 12, 12 * result.termMonths / 12) - result.depositAmount },
  ] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">CD Calculator Inputs</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Deposit Amount */}
              <div className="space-y-2">
                <Label htmlFor="depositAmount" className="text-sm font-medium text-gray-700">
                  Deposit Amount ($) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="depositAmount"
                  type="number"
                  value={inputs.depositAmount}
                  onChange={(e) => handleInputChange('depositAmount', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10000"
                  min="0"
                  step="1000"
                />
                <p className="text-xs text-gray-500">Enter the amount you want to deposit</p>
              </div>

              {/* Annual Interest Rate */}
              <div className="space-y-2">
                <Label htmlFor="annualRate" className="text-sm font-medium text-gray-700">
                  Annual Interest Rate (%) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="annualRate"
                  type="number"
                  value={inputs.annualRate}
                  onChange={(e) => handleInputChange('annualRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="4.5"
                  min="0"
                  step="0.1"
                />
                <p className="text-xs text-gray-500">Annual interest rate offered by the bank</p>
              </div>

              {/* Term - Years and Months */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Deposit Term <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      id="termYears"
                      type="number"
                      value={inputs.termYears}
                      onChange={(e) => handleInputChange('termYears', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="3"
                      min="0"
                      step="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Years</p>
                  </div>
                  <div>
                    <input
                      id="termMonths"
                      type="number"
                      value={inputs.termMonths}
                      onChange={(e) => handleInputChange('termMonths', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      min="0"
                      max="11"
                      step="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Months</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Common CD terms: 6m, 1y, 2y, 3y, 5y</p>
              </div>

              {/* Compounding Frequency */}
              <div className="space-y-2">
                <Label htmlFor="compoundingFrequency" className="text-sm font-medium text-gray-700">
                  Compounding Frequency <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <select
                  id="compoundingFrequency"
                  value={inputs.compoundingFrequency}
                  onChange={(e) => handleInputChange('compoundingFrequency', e.target.value as 'daily' | 'monthly' | 'quarterly' | 'annually' | 'continuously')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="daily">Daily (365/year) - Highest APY</option>
                  <option value="monthly">Monthly (12/year)</option>
                  <option value="quarterly">Quarterly (4/year)</option>
                  <option value="annually">Annually (1/year)</option>
                  <option value="continuously">Continuously (e^rt)</option>
                </select>
                <p className="text-xs text-gray-500">Daily compounding yields highest returns</p>
              </div>

              {/* Early Withdrawal Penalty */}
              <div className="space-y-2">
                <Label htmlFor="earlyWithdrawalPenaltyMonths" className="text-sm font-medium text-gray-700">
                  Early Withdrawal Penalty (months of interest) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="earlyWithdrawalPenaltyMonths"
                  type="number"
                  value={inputs.earlyWithdrawalPenaltyMonths}
                  onChange={(e) => handleInputChange('earlyWithdrawalPenaltyMonths', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3"
                  min="0"
                  step="1"
                />
                <p className="text-xs text-gray-500">Typical penalty: 3-6 months of interest (default: 3)</p>
              </div>

              {/* Marginal Tax Rate */}
              <div className="space-y-2">
                <Label htmlFor="marginalTaxRate" className="text-sm font-medium text-gray-700">
                  Federal Marginal Tax Rate (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="marginalTaxRate"
                  type="number"
                  value={inputs.marginalTaxRate}
                  onChange={(e) => handleInputChange('marginalTaxRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="22"
                  min="0"
                  max="37"
                  step="1"
                />
                <p className="text-xs text-gray-500">Your federal tax bracket (10%, 12%, 22%, 24%, 32%, 35%, 37%)</p>
              </div>

              {/* State Tax Rate */}
              <div className="space-y-2">
                <Label htmlFor="stateTaxRate" className="text-sm font-medium text-gray-700">
                  State Tax Rate (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="stateTaxRate"
                  type="number"
                  value={inputs.stateTaxRate}
                  onChange={(e) => handleInputChange('stateTaxRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5"
                  min="0"
                  max="13.3"
                  step="0.1"
                />
                <p className="text-xs text-gray-500">Your state income tax rate (0% in TX, FL, etc.)</p>
              </div>
            </CardContent>
          </Card>

          {/* Calculate Button */}
          <Button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate CD Returns
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Calculation Results</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result ? (
                <div className="space-y-6">
                  {/* Key Results */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Maturity Value (Before Tax)</p>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-700 break-all">
                        ${result.maturityValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Total Interest Earned</p>
                      <p className="text-2xl sm:text-3xl font-bold text-green-700 break-all">
                        ${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Annual Percentage Yield (APY)</p>
                      <p className="text-2xl sm:text-3xl font-bold text-indigo-700 break-all">
                        {result.apy.toFixed(2)}%
                      </p>
                    </div>

                    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Maturity Date</p>
                      <p className="text-lg sm:text-xl font-bold text-gray-700">
                        {result.maturityDate}
                      </p>
                    </div>
                  </div>

                  {/* Tax Calculation Results */}
                  {result.taxCalculation && (
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Tax Impact on Returns</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gross Interest:</span>
                          <span className="font-semibold text-gray-900">${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Federal Tax ({result.taxCalculation.marginalTaxRate}%):</span>
                          <span className="font-semibold text-red-600">-${result.taxCalculation.federalTax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        {result.taxCalculation.stateTaxRate > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">State Tax ({result.taxCalculation.stateTaxRate}%):</span>
                            <span className="font-semibold text-red-600">-${result.taxCalculation.stateTax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Tax:</span>
                          <span className="font-semibold text-red-600">-${result.taxCalculation.totalTax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-amber-300">
                          <span className="text-gray-700 font-semibold">After-Tax Interest:</span>
                          <span className="font-bold text-green-700">${result.taxCalculation.afterTaxInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-amber-300">
                          <span className="text-gray-700 font-semibold">After-Tax Maturity Value:</span>
                          <span className="font-bold text-blue-700">${result.taxCalculation.afterTaxMaturityValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between sm:col-span-2 pt-2 border-t border-amber-300">
                          <span className="text-gray-700 font-semibold">Effective After-Tax Rate:</span>
                          <span className="font-bold text-indigo-700">{result.taxCalculation.effectiveAfterTaxRate.toFixed(2)}% per year (vs {result.annualRate}% nominal)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Early Withdrawal Warning */}
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-amber-800 mb-1">Early Withdrawal Penalty</h4>
                        <p className="text-sm text-amber-700">
                          If you withdraw early, you may forfeit approximately{' '}
                          <span className="font-bold">${result.earlyWithdrawalPenalty.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>{' '}
                          in interest ({inputs.earlyWithdrawalPenaltyMonths} months of interest).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tabs for Charts and Tables */}
                  <div className="border-b border-gray-200 mb-4">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                      <button
                        onClick={() => setActiveTab('charts')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'charts'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        📊 Charts
                      </button>
                      <button
                        onClick={() => setActiveTab('annual')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'annual'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        📅 Annual Schedule
                      </button>
                      <button
                        onClick={() => setActiveTab('monthly')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'monthly'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        📆 Monthly Schedule
                      </button>
                    </nav>
                  </div>

                  {/* Charts View */}
                  {activeTab === 'charts' && (
                    <>
                      {/* Growth Chart */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                          Balance Growth Over Time
                        </h3>
                    <ResponsiveContainer width="100%" height={250} minHeight={200}>
                      <LineChart data={growthChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="month"
                          label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
                          stroke="#6b7280"
                          style={{ fontSize: '12px' }}
                        />
                        <YAxis
                          stroke="#6b7280"
                          style={{ fontSize: '12px' }}
                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                          formatter={(value: any) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Balance']}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="balance" stroke="#3B82F6" strokeWidth={2} name="Account Balance" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Breakdown Pie Chart */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <PieChart className="h-5 w-5 mr-2 text-blue-600" />
                      Earnings Breakdown
                    </h3>
                    <ResponsiveContainer width="100%" height={250} minHeight={200}>
                      <RePieChart>
                        <Pie
                          data={breakdownPieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: $${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {breakdownPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                          formatter={(value: any) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                        />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Interest Rate Sensitivity */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Interest Rate Sensitivity Analysis</h3>
                    <p className="text-sm text-gray-600 mb-3">How a ±0.5% rate change affects your earnings</p>
                    <ResponsiveContainer width="100%" height={200} minHeight={180}>
                      <BarChart data={sensitivityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="rate"
                          label={{ value: 'Interest Rate (%)', position: 'insideBottom', offset: -5 }}
                          stroke="#6b7280"
                          style={{ fontSize: '12px' }}
                          tickFormatter={(value) => `${value.toFixed(1)}%`}
                        />
                        <YAxis
                          stroke="#6b7280"
                          style={{ fontSize: '12px' }}
                          tickFormatter={(value) => `$${value.toFixed(0)}`}
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                          formatter={(value: any) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Interest Earned']}
                        />
                        <Bar dataKey="earnings" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                      {/* Detailed Summary */}
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Detailed Summary</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Deposit Amount:</span>
                            <span className="font-semibold text-gray-900">${result.depositAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Annual Rate:</span>
                            <span className="font-semibold text-gray-900">{result.annualRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Term:</span>
                            <span className="font-semibold text-gray-900">{Math.floor(result.termYears)} years {result.termMonths % 12} months</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Compounding:</span>
                            <span className="font-semibold text-gray-900 capitalize">{inputs.compoundingFrequency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">APY:</span>
                            <span className="font-semibold text-gray-900">{result.apy.toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Return:</span>
                            <span className="font-semibold text-green-600">{((result.totalInterest / result.depositAmount) * 100).toFixed(2)}%</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Annual Schedule View */}
                  {activeTab === 'annual' && (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[350px] text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="bg-blue-50 border-b-2 border-blue-200">
                            <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-900">Year</th>
                            <th className="px-3 sm:px-4 py-3 text-right font-semibold text-gray-900">Deposit</th>
                            <th className="px-3 sm:px-4 py-3 text-right font-semibold text-gray-900">Interest</th>
                            <th className="px-3 sm:px-4 py-3 text-right font-semibold text-gray-900">Ending Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.yearlyBreakdown.map((row) => (
                            <tr key={row.year} className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="px-3 sm:px-4 py-3 font-medium text-gray-900">{row.year}</td>
                              <td className="px-3 sm:px-4 py-3 text-right text-gray-700">
                                ${row.deposit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                              <td className="px-3 sm:px-4 py-3 text-right text-green-700 font-semibold">
                                ${row.interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                              <td className="px-3 sm:px-4 py-3 text-right text-blue-700 font-semibold">
                                ${row.endingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-gray-100 border-t-2 border-gray-300 font-bold">
                            <td className="px-3 sm:px-4 py-3 text-left">Total</td>
                            <td className="px-3 sm:px-4 py-3 text-right">
                              ${result.depositAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-3 sm:px-4 py-3 text-right text-green-700">
                              ${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-3 sm:px-4 py-3 text-right text-blue-700">
                              ${result.maturityValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}

                  {/* Monthly Schedule View */}
                  {activeTab === 'monthly' && (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[350px] text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="bg-blue-50 border-b-2 border-blue-200">
                            <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-900">Month</th>
                            <th className="px-3 sm:px-4 py-3 text-right font-semibold text-gray-900">Interest Earned</th>
                            <th className="px-3 sm:px-4 py-3 text-right font-semibold text-gray-900">Total Interest</th>
                            <th className="px-3 sm:px-4 py-3 text-right font-semibold text-gray-900">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.monthlyBreakdown.map((row) => (
                            <tr key={row.month} className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="px-3 sm:px-4 py-3 font-medium text-gray-900">{row.month}</td>
                              <td className="px-3 sm:px-4 py-3 text-right text-green-700">
                                ${row.interestEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                              <td className="px-3 sm:px-4 py-3 text-right text-green-700 font-semibold">
                                ${row.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                              <td className="px-3 sm:px-4 py-3 text-right text-blue-700 font-semibold">
                                ${row.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">Enter your CD details and click "Calculate CD Returns"</p>
                  <p className="text-sm mt-2">Get detailed analysis of your CD investment returns</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
        <Button
          onClick={handleSaveAsImage}
          variant="outline"
          className="gap-2"
          disabled={!result}
        >
          <Download className="h-4 w-4" />
          Save as Image
        </Button>

        <Button
          onClick={handlePrint}
          variant="outline"
          className="gap-2"
          disabled={!result}
        >
          <Printer className="h-4 w-4" />
          Print Results
        </Button>

        <Button
          onClick={handleCopyResult}
          variant="outline"
          className="gap-2"
          disabled={!result}
        >
          <Copy className="h-4 w-4" />
          Copy Results
        </Button>

        <Button
          onClick={handleShare}
          variant="outline"
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share Calculator
        </Button>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="CD Calculator"
      />
    </div>
  );
}

