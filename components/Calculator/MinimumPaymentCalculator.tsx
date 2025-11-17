'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, CreditCard, AlertTriangle, DollarSign, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface PaymentResults {
  minimumPayment: {
    monthsToPayoff: number;
    totalInterest: number;
    totalPaid: number;
    effectiveAPR: number;
  };
  recommendedPayment: {
    payment: number;
    monthsToPayoff: number;
    totalInterest: number;
    totalPaid: number;
    savings: number;
    timeSaved: number;
  };
  comparison: {
    interestRatio: number;
    timeMultiplier: number;
    monthlySavings: number;
  };
  paymentSchedule: Array<{
    month: number;
    minimumBalance: number;
    recommendedBalance: number;
    minimumInterest: number;
    recommendedInterest: number;
  }>;
  warnings: string[];
}

export default function MinimumPaymentCalculator() {
  const [inputs, setInputs] = useState({
    balance: '5000',
    apr: '18.99',
    minimumPaymentType: 'percentage' as 'percentage' | 'fixed',
    minimumPercentage: '2',
    minimumFixed: '25',
    fixedPayment: '200',
  });

  const [results, setResults] = useState<PaymentResults | null>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/minimum-payment-calculator',
    getShareParams: () => ({
      balance: inputs.balance,
      apr: inputs.apr,
    }),
    getShareText: () => 
      results 
        ? `Credit Card Alert: Paying only minimum takes ${results.minimumPayment.monthsToPayoff} months! Extra $${(parseFloat(inputs.fixedPayment) - results.minimumPayment.monthsToPayoff).toFixed(0)}/month saves ${results.recommendedPayment.savings.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} 💰`
        : 'Check out this minimum payment warning!',
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
      setTimeout(calculatePayment, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculatePayment = () => {
    const balance = parseFloat(inputs.balance) || 0;
    const apr = parseFloat(inputs.apr) || 0;
    const minimumPercentage = parseFloat(inputs.minimumPercentage) || 2;
    const minimumFixed = parseFloat(inputs.minimumFixed) || 25;
    const fixedPayment = parseFloat(inputs.fixedPayment) || 0;

    if (balance <= 0 || apr <= 0) {
      alert('Please enter valid balance and APR');
      return;
    }

    const monthlyRate = (apr / 100) / 12;

    // Calculate minimum payment
    const calculateMinimumPayment = (currentBalance: number): number => {
      if (inputs.minimumPaymentType === 'percentage') {
        const percentagePayment = currentBalance * (minimumPercentage / 100);
        return Math.max(percentagePayment, minimumFixed);
      } else {
        return minimumFixed;
      }
    };

    // Scenario 1: Minimum payments only
    let minBalance = balance;
    let minTotalInterest = 0;
    let minMonths = 0;
    const maxMonths = 600; // 50 years cap
    const paymentSchedule = [];

    while (minBalance > 0.01 && minMonths < maxMonths) {
      minMonths++;
      const interest = minBalance * monthlyRate;
      const minPayment = Math.min(calculateMinimumPayment(minBalance), minBalance + interest);
      const principal = minPayment - interest;
      
      minBalance -= principal;
      minTotalInterest += interest;

      if (minMonths <= 120) { // Store first 10 years
        paymentSchedule.push({
          month: minMonths,
          minimumBalance: minBalance,
          recommendedBalance: 0, // Will be filled later
          minimumInterest: interest,
          recommendedInterest: 0 // Will be filled later
        });
      }
    }

    const minTotalPaid = balance + minTotalInterest;
    const effectiveAPR = minTotalInterest > 0 ? ((minTotalInterest / balance) / (minMonths / 12)) * 100 : apr;

    // Scenario 2: Recommended fixed payment
    let recBalance = balance;
    let recTotalInterest = 0;
    let recMonths = 0;
    const recPayment = fixedPayment > 0 ? fixedPayment : calculateMinimumPayment(balance) * 2;

    // Validate recommended payment
    const initialMinPayment = calculateMinimumPayment(balance);
    if (recPayment < initialMinPayment) {
      alert(`Recommended payment must be at least $${initialMinPayment.toFixed(2)} (current minimum payment)`);
      return;
    }

    while (recBalance > 0.01 && recMonths < maxMonths) {
      recMonths++;
      const interest = recBalance * monthlyRate;
      const payment = Math.min(recPayment, recBalance + interest);
      const principal = payment - interest;
      
      recBalance -= principal;
      recTotalInterest += interest;

      if (recMonths <= 120 && paymentSchedule[recMonths - 1]) {
        paymentSchedule[recMonths - 1].recommendedBalance = recBalance;
        paymentSchedule[recMonths - 1].recommendedInterest = interest;
      }
    }

    const recTotalPaid = balance + recTotalInterest;
    const savings = minTotalInterest - recTotalInterest;
    const timeSaved = minMonths - recMonths;

    // Comparison metrics
    const interestRatio = minTotalInterest > 0 ? minTotalInterest / balance : 0;
    const timeMultiplier = recMonths > 0 ? minMonths / recMonths : 1;
    const monthlySavings = savings / (recMonths || 1);

    // Generate warnings
    const warnings: string[] = [];
    
    if (minMonths > 120) {
      warnings.push(`⚠️ DANGER: Paying only the minimum will take ${(minMonths / 12).toFixed(1)} YEARS to pay off!`);
    }
    
    if (interestRatio > 1) {
      warnings.push(`💸 You'll pay ${interestRatio.toFixed(1)}× the original balance in interest (${(interestRatio * 100).toFixed(0)}% extra)!`);
    }
    
    if (minTotalInterest > balance) {
      warnings.push(`🚨 Total interest (${minTotalInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}) exceeds your original balance!`);
    }
    
    if (apr > 20) {
      warnings.push(`⚠️ Your APR (${apr}%) is very high. Consider balance transfer or debt consolidation.`);
    }

    if (savings > balance * 0.5) {
      warnings.push(`💰 By paying just $${(recPayment - initialMinPayment).toFixed(0)} extra per month, you save ${savings.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}!`);
    }

    setResults({
      minimumPayment: {
        monthsToPayoff: minMonths,
        totalInterest: minTotalInterest,
        totalPaid: minTotalPaid,
        effectiveAPR
      },
      recommendedPayment: {
        payment: recPayment,
        monthsToPayoff: recMonths,
        totalInterest: recTotalInterest,
        totalPaid: recTotalPaid,
        savings,
        timeSaved
      },
      comparison: {
        interestRatio,
        timeMultiplier,
        monthlySavings
      },
      paymentSchedule,
      warnings
    });

    // Update URL
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleSaveAsImage = async () => {
    const element = document.getElementById('payment-results');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = 'minimum-payment-results.png';
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
                Credit Card Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="balance" className="text-sm font-medium">
                  Current Balance ($) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="balance"
                  type="number"
                  value={inputs.balance}
                  onChange={(e) => handleInputChange('balance', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5000"
                  min="0"
                  step="100"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apr" className="text-sm font-medium">
                  APR (%) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="apr"
                  type="number"
                  value={inputs.apr}
                  onChange={(e) => handleInputChange('apr', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="18.99"
                  min="0"
                  max="36"
                  step="0.01"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Minimum Payment Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="minimumPaymentType" className="text-sm font-medium">
                  Payment Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="minimumPaymentType"
                  value={inputs.minimumPaymentType}
                  onChange={(e) => handleInputChange('minimumPaymentType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="percentage">Percentage of Balance (typical)</option>
                  <option value="fixed">Fixed Dollar Amount</option>
                </select>
              </div>

              {inputs.minimumPaymentType === 'percentage' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="minimumPercentage" className="text-sm font-medium">
                      Minimum Percentage (%) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="minimumPercentage"
                      type="number"
                      value={inputs.minimumPercentage}
                      onChange={(e) => handleInputChange('minimumPercentage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="2"
                      min="1"
                      max="10"
                      step="0.1"
                      required
                    />
                    <p className="text-xs text-gray-500">Typically 1-3% of balance</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minimumFixed" className="text-sm font-medium">
                      Minimum Floor ($) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="minimumFixed"
                      type="number"
                      value={inputs.minimumFixed}
                      onChange={(e) => handleInputChange('minimumFixed', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="25"
                      min="10"
                      step="5"
                      required
                    />
                    <p className="text-xs text-gray-500">Minimum amount charged (usually $25)</p>
                  </div>
                </>
              )}

              {inputs.minimumPaymentType === 'fixed' && (
                <div className="space-y-2">
                  <Label htmlFor="minimumFixed" className="text-sm font-medium">
                    Fixed Minimum Payment ($) <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="minimumFixed"
                    type="number"
                    value={inputs.minimumFixed}
                    onChange={(e) => handleInputChange('minimumFixed', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="25"
                    min="10"
                    step="5"
                    required
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <DollarSign className="h-5 w-5 text-green-600" />
                Recommended Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fixedPayment" className="text-sm font-medium">
                  Monthly Payment ($) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="fixedPayment"
                  type="number"
                  value={inputs.fixedPayment}
                  onChange={(e) => handleInputChange('fixedPayment', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="200"
                  min="0"
                  step="10"
                  required
                />
                <p className="text-xs text-gray-500">
                  What you can actually pay each month
                </p>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculatePayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate & Compare
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" id="payment-results">
          {results && (
            <div className="space-y-6">
              {/* Warning Banner */}
              {results.warnings.length > 0 && (
                <Card className="shadow-lg border-l-4 border-l-red-500 bg-red-50">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-red-900 mb-2">⚠️ MINIMUM PAYMENT WARNING</h3>
                        <div className="space-y-2">
                          {results.warnings.map((warning, index) => (
                            <p key={index} className="text-sm text-red-800 font-medium">{warning}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Minimum Payment Scenario */}
                <Card className="shadow-lg border-2 border-red-200 bg-red-50">
                  <CardHeader className="bg-red-100 border-b-2 border-red-200">
                    <CardTitle className="text-red-900 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Minimum Payments Only
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4">
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Time to Pay Off</p>
                      <p className="text-3xl font-bold text-red-600">
                        {results.minimumPayment.monthsToPayoff} months
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        ({(results.minimumPayment.monthsToPayoff / 12).toFixed(1)} years)
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Interest Paid</p>
                      <p className="text-2xl font-bold text-red-600">
                        {results.minimumPayment.totalInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Amount Paid</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {results.minimumPayment.totalPaid.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommended Payment Scenario */}
                <Card className="shadow-lg border-2 border-green-200 bg-green-50">
                  <CardHeader className="bg-green-100 border-b-2 border-green-200">
                    <CardTitle className="text-green-900 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Recommended Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4">
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
                      <p className="text-3xl font-bold text-green-600">
                        {results.recommendedPayment.payment.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Time to Pay Off</p>
                      <p className="text-2xl font-bold text-green-600">
                        {results.recommendedPayment.monthsToPayoff} months
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        ({(results.recommendedPayment.monthsToPayoff / 12).toFixed(1)} years)
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Interest Paid</p>
                      <p className="text-2xl font-bold text-green-600">
                        {results.recommendedPayment.totalInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg border-2 border-green-500">
                      <p className="text-sm text-gray-600 mb-1">💰 You Save</p>
                      <p className="text-3xl font-bold text-green-600">
                        {results.recommendedPayment.savings.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-sm text-green-700 mt-1 font-medium">
                        {results.recommendedPayment.timeSaved} months faster!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Insights */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle>Key Insights</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white border border-gray-200 rounded-lg text-center">
                      <p className="text-sm text-gray-600 mb-2">Interest vs Principal</p>
                      <p className="text-3xl font-bold text-purple-600">
                        {(results.comparison.interestRatio * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        of original balance paid in interest
                      </p>
                    </div>

                    <div className="p-4 bg-white border border-gray-200 rounded-lg text-center">
                      <p className="text-sm text-gray-600 mb-2">Time Multiplier</p>
                      <p className="text-3xl font-bold text-orange-600">
                        {results.comparison.timeMultiplier.toFixed(1)}×
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Minimum takes {results.comparison.timeMultiplier.toFixed(1)}× longer
                      </p>
                    </div>

                    <div className="p-4 bg-white border border-gray-200 rounded-lg text-center">
                      <p className="text-sm text-gray-600 mb-2">Monthly Savings</p>
                      <p className="text-3xl font-bold text-green-600">
                        {results.comparison.monthlySavings.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        per month over payoff period
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Balance Over Time Chart */}
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
                          dataKey="minimumBalance" 
                          stroke="#ef4444" 
                          strokeWidth={2} 
                          name="Minimum Payments" 
                          dot={false}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="recommendedBalance" 
                          stroke="#10b981" 
                          strokeWidth={2} 
                          name="Recommended Payment" 
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-600 text-center mt-2">
                      Red line shows the slow payoff with minimum payments. Green line shows faster payoff with recommended payment.
                    </p>
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
                <AlertTriangle className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">
                  Enter your credit card details to see the shocking truth about minimum payments!
                </p>
                <p className="text-sm text-gray-500">
                  Discover how much extra you'll pay and how long it will actually take.
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
        calculatorName="Minimum Payment Calculator"
      />
    </div>
  );
}

