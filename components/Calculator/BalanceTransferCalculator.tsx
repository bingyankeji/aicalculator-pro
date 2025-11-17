'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, CreditCard, TrendingDown, CheckCircle, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface TransferResults {
  currentCard: {
    monthsToPayoff: number;
    totalInterest: number;
    totalPaid: number;
    monthlyPayment: number;
  };
  transferCard: {
    transferFee: number;
    monthsToPayoff: number;
    totalInterest: number;
    totalPaid: number;
    monthlyPayment: number;
  };
  savings: {
    interestSaved: number;
    totalSaved: number;
    timeSaved: number;
    breakEvenMonths: number;
    worthIt: boolean;
  };
  paymentSchedule: Array<{
    month: number;
    currentBalance: number;
    transferBalance: number;
    currentInterest: number;
    transferInterest: number;
  }>;
  recommendations: string[];
}

export default function BalanceTransferCalculator() {
  const [inputs, setInputs] = useState({
    currentBalance: '5000',
    currentAPR: '18.99',
    monthlyPayment: '200',
    transferFee: '3',
    promoAPR: '0',
    promoMonths: '15',
    regularAPR: '16.99',
  });

  const [results, setResults] = useState<TransferResults | null>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/balance-transfer-calculator',
    getShareParams: () => ({
      balance: inputs.currentBalance,
      apr: inputs.currentAPR,
      promo: inputs.promoMonths,
    }),
    getShareText: () => 
      results 
        ? `Balance Transfer Savings: ${results.savings.interestSaved.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} saved! ${results.savings.worthIt ? '✅ Worth it!' : '⚠️ Review carefully'}`
        : 'Check out my balance transfer calculation!',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newInputs = { ...inputs };
    let hasParams = false;

    params.forEach((value, key) => {
      if (key in inputs) {
        newInputs[key as keyof typeof inputs] = value;
        hasParams = true;
      }
    });

    if (hasParams) {
      setInputs(newInputs);
      setTimeout(calculateTransfer, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateTransfer = () => {
    const currentBalance = parseFloat(inputs.currentBalance) || 0;
    const currentAPR = parseFloat(inputs.currentAPR) || 0;
    const monthlyPayment = parseFloat(inputs.monthlyPayment) || 0;
    const transferFeePercent = parseFloat(inputs.transferFee) || 0;
    const promoAPR = parseFloat(inputs.promoAPR) || 0;
    const promoMonths = parseInt(inputs.promoMonths) || 0;
    const regularAPR = parseFloat(inputs.regularAPR) || 0;

    if (currentBalance <= 0 || currentAPR <= 0 || monthlyPayment <= 0) {
      alert('Please enter valid balance, APR, and monthly payment');
      return;
    }

    const currentMonthlyRate = (currentAPR / 100) / 12;
    const promoMonthlyRate = (promoAPR / 100) / 12;
    const regularMonthlyRate = (regularAPR / 100) / 12;

    // Calculate transfer fee
    const transferFee = currentBalance * (transferFeePercent / 100);
    const transferBalance = currentBalance + transferFee;

    // Scenario 1: Stay with current card
    let currBalance = currentBalance;
    let currTotalInterest = 0;
    let currMonths = 0;
    const maxMonths = 600;
    const paymentSchedule = [];

    while (currBalance > 0.01 && currMonths < maxMonths) {
      currMonths++;
      const interest = currBalance * currentMonthlyRate;
      const payment = Math.min(monthlyPayment, currBalance + interest);
      const principal = payment - interest;
      
      currBalance -= principal;
      currTotalInterest += interest;

      if (currMonths <= 120) {
        paymentSchedule.push({
          month: currMonths,
          currentBalance: currBalance,
          transferBalance: 0, // Will be filled later
          currentInterest: interest,
          transferInterest: 0 // Will be filled later
        });
      }
    }

    const currTotalPaid = currentBalance + currTotalInterest;

    // Scenario 2: Balance transfer
    let transBalance = transferBalance;
    let transTotalInterest = 0;
    let transMonths = 0;
    let inPromo = true;

    while (transBalance > 0.01 && transMonths < maxMonths) {
      transMonths++;
      
      // Switch to regular APR after promo period
      if (transMonths > promoMonths) {
        inPromo = false;
      }
      
      const rate = inPromo ? promoMonthlyRate : regularMonthlyRate;
      const interest = transBalance * rate;
      const payment = Math.min(monthlyPayment, transBalance + interest);
      const principal = payment - interest;
      
      transBalance -= principal;
      transTotalInterest += interest;

      if (transMonths <= 120 && paymentSchedule[transMonths - 1]) {
        paymentSchedule[transMonths - 1].transferBalance = transBalance;
        paymentSchedule[transMonths - 1].transferInterest = interest;
      }
    }

    const transTotalPaid = transferBalance + transTotalInterest;

    // Calculate savings
    const interestSaved = currTotalInterest - transTotalInterest;
    const totalSaved = currTotalPaid - transTotalPaid;
    const timeSaved = currMonths - transMonths;

    // Calculate break-even point (when transfer savings > transfer fee)
    let breakEvenBalance = transferBalance;
    let breakEvenInterest = 0;
    let breakEvenMonths = 0;
    inPromo = true;

    while (breakEvenInterest < transferFee && breakEvenMonths < maxMonths) {
      breakEvenMonths++;
      
      if (breakEvenMonths > promoMonths) {
        inPromo = false;
      }
      
      const rate = inPromo ? promoMonthlyRate : regularMonthlyRate;
      const interest = breakEvenBalance * rate;
      const payment = Math.min(monthlyPayment, breakEvenBalance + interest);
      const principal = payment - interest;
      
      breakEvenBalance -= principal;
      
      // Calculate what interest would have been on current card
      const wouldBeInterest = (currentBalance - (breakEvenMonths * (monthlyPayment - (currentBalance * currentMonthlyRate)))) * currentMonthlyRate;
      const savedThisMonth = wouldBeInterest - interest;
      breakEvenInterest += savedThisMonth;
    }

    const worthIt = totalSaved > 0;

    // Generate recommendations
    const recommendations: string[] = [];

    if (worthIt) {
      recommendations.push(`✅ Balance transfer saves you ${interestSaved.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} in interest!`);
      recommendations.push(`🎯 You break even after ${breakEvenMonths} months (transfer fee paid off).`);
    } else {
      recommendations.push(`⚠️ Balance transfer may not be worth it. You save only ${totalSaved.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}.`);
    }

    if (promoMonths > 0) {
      const paidDuringPromo = Math.min(monthlyPayment * promoMonths, transferBalance);
      const remainingAfterPromo = Math.max(0, transferBalance - paidDuringPromo);
      
      if (remainingAfterPromo > transferBalance * 0.5) {
        recommendations.push(`⚠️ You'll only pay off ${((paidDuringPromo / transferBalance) * 100).toFixed(0)}% during 0% APR period.`);
        recommendations.push(`💡 Consider increasing monthly payment to ${(transferBalance / promoMonths).toFixed(0)} to pay off during promo.`);
      } else if (remainingAfterPromo > 0) {
        recommendations.push(`📊 After promo: ${remainingAfterPromo.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} will be subject to ${regularAPR}% APR.`);
      } else {
        recommendations.push(`🎉 Great! You'll pay off the entire balance during the 0% APR period!`);
      }
    }

    if (transferFeePercent >= 5) {
      recommendations.push(`⚠️ Transfer fee is high (${transferFeePercent}%). Look for cards with lower fees (3% or less).`);
    }

    if (regularAPR >= currentAPR) {
      recommendations.push(`⚠️ Post-promo APR (${regularAPR}%) is similar to or higher than current rate (${currentAPR}%).`);
      recommendations.push(`💡 Focus on paying off during promo period to maximize savings.`);
    }

    if (monthlyPayment < currentBalance / 24) {
      recommendations.push(`💡 Your payment is low. Increase it to pay off faster and save more on interest.`);
    }

    setResults({
      currentCard: {
        monthsToPayoff: currMonths,
        totalInterest: currTotalInterest,
        totalPaid: currTotalPaid,
        monthlyPayment
      },
      transferCard: {
        transferFee,
        monthsToPayoff: transMonths,
        totalInterest: transTotalInterest,
        totalPaid: transTotalPaid,
        monthlyPayment
      },
      savings: {
        interestSaved,
        totalSaved,
        timeSaved,
        breakEvenMonths,
        worthIt
      },
      paymentSchedule,
      recommendations
    });

    // Update URL
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleSaveAsImage = async () => {
    const element = document.getElementById('transfer-results');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = 'balance-transfer-results.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving as image:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CreditCard className="h-5 w-5 text-red-600" />
                Current Card
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentBalance" className="text-sm font-medium">
                  Current Balance ($) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="currentBalance"
                  type="number"
                  value={inputs.currentBalance}
                  onChange={(e) => handleInputChange('currentBalance', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5000"
                  min="0"
                  step="100"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentAPR" className="text-sm font-medium">
                  Current APR (%) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="currentAPR"
                  type="number"
                  value={inputs.currentAPR}
                  onChange={(e) => handleInputChange('currentAPR', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="18.99"
                  min="0"
                  max="36"
                  step="0.01"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyPayment" className="text-sm font-medium">
                  Monthly Payment ($) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="monthlyPayment"
                  type="number"
                  value={inputs.monthlyPayment}
                  onChange={(e) => handleInputChange('monthlyPayment', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="200"
                  min="0"
                  step="10"
                  required
                />
                <p className="text-xs text-gray-500">What you can pay each month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CreditCard className="h-5 w-5 text-blue-600" />
                New Transfer Card
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transferFee" className="text-sm font-medium">
                  Balance Transfer Fee (%) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="transferFee"
                  type="number"
                  value={inputs.transferFee}
                  onChange={(e) => handleInputChange('transferFee', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3"
                  min="0"
                  max="10"
                  step="0.1"
                  required
                />
                <p className="text-xs text-gray-500">Typically 3-5% (or $5-$10 minimum)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="promoAPR" className="text-sm font-medium">
                  Promotional APR (%) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="promoAPR"
                  type="number"
                  value={inputs.promoAPR}
                  onChange={(e) => handleInputChange('promoAPR', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  max="10"
                  step="0.01"
                  required
                />
                <p className="text-xs text-gray-500">Usually 0% for intro period</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="promoMonths" className="text-sm font-medium">
                  Promotional Period (months) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="promoMonths"
                  type="number"
                  value={inputs.promoMonths}
                  onChange={(e) => handleInputChange('promoMonths', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="15"
                  min="0"
                  max="36"
                  step="1"
                  required
                />
                <p className="text-xs text-gray-500">Typically 12-21 months</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="regularAPR" className="text-sm font-medium">
                  Regular APR After Promo (%) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="regularAPR"
                  type="number"
                  value={inputs.regularAPR}
                  onChange={(e) => handleInputChange('regularAPR', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="16.99"
                  min="0"
                  max="36"
                  step="0.01"
                  required
                />
                <p className="text-xs text-gray-500">Rate after promo expires</p>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculateTransfer}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Savings
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" id="transfer-results">
          {results && (
            <div className="space-y-6">
              {/* Decision Banner */}
              <Card className={`shadow-lg border-l-4 ${results.savings.worthIt ? 'border-l-green-500 bg-green-50' : 'border-l-orange-500 bg-orange-50'}`}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    {results.savings.worthIt ? (
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold mb-2 ${results.savings.worthIt ? 'text-green-900' : 'text-orange-900'}`}>
                        {results.savings.worthIt ? '✅ Balance Transfer Recommended!' : '⚠️ Review Carefully'}
                      </h3>
                      <div className="space-y-2">
                        {results.recommendations.map((rec, index) => (
                          <p key={index} className="text-sm text-gray-700">{rec}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-lg border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Interest Saved</p>
                    <p className="text-2xl font-bold text-green-600">
                      {results.savings.interestSaved.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Saved</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {results.savings.totalSaved.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Time Saved</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {results.savings.timeSaved} months
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Break Even</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {results.savings.breakEvenMonths} months
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Card */}
                <Card className="shadow-lg border-2 border-red-200">
                  <CardHeader className="bg-red-50">
                    <CardTitle className="text-red-900">Stay with Current Card</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-3">
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Time to Pay Off</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {results.currentCard.monthsToPayoff} months
                      </p>
                      <p className="text-sm text-gray-600">
                        ({(results.currentCard.monthsToPayoff / 12).toFixed(1)} years)
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                      <p className="text-2xl font-bold text-red-600">
                        {results.currentCard.totalInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Paid</p>
                      <p className="text-xl font-bold text-gray-900">
                        {results.currentCard.totalPaid.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Transfer Card */}
                <Card className="shadow-lg border-2 border-green-200">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="text-green-900">Balance Transfer</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-3">
                    <div className="p-3 bg-white rounded-lg border border-orange-200">
                      <p className="text-sm text-gray-600 mb-1">Transfer Fee</p>
                      <p className="text-xl font-bold text-orange-600">
                        {results.transferCard.transferFee.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Time to Pay Off</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {results.transferCard.monthsToPayoff} months
                      </p>
                      <p className="text-sm text-gray-600">
                        ({(results.transferCard.monthsToPayoff / 12).toFixed(1)} years)
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                      <p className="text-2xl font-bold text-green-600">
                        {results.transferCard.totalInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg border-2 border-green-500">
                      <p className="text-sm text-gray-600 mb-1">Total Paid</p>
                      <p className="text-xl font-bold text-green-600">
                        {results.transferCard.totalPaid.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Balance Comparison Chart */}
              {results.paymentSchedule.length > 0 && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle>Balance Payoff Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={results.paymentSchedule}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="month" 
                          label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis 
                          label={{ value: 'Balance ($)', angle: -90, position: 'insideLeft' }}
                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip 
                          formatter={(value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="currentBalance" 
                          stroke="#ef4444" 
                          strokeWidth={2} 
                          name="Current Card" 
                          dot={false}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="transferBalance" 
                          stroke="#10b981" 
                          strokeWidth={2} 
                          name="Balance Transfer" 
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* Export Actions */}
              <Card className="shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleSaveAsImage} variant="outline" className="flex-1 sm:flex-none min-h-[44px]">
                      <Download className="h-4 w-4 mr-2" />
                      Save as Image
                    </Button>
                    <Button onClick={handlePrint} variant="outline" className="flex-1 sm:flex-none min-h-[44px]">
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <Button onClick={handleShare} variant="outline" className="flex-1 sm:flex-none min-h-[44px]">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!results && (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <TrendingDown className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">
                  Compare your current card with a balance transfer offer!
                </p>
                <p className="text-sm text-gray-500">
                  See if a 0% APR balance transfer can save you money.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Balance Transfer Calculator"
      />
    </div>
  );
}

