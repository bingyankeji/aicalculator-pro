'use client';

import React, { useState, useMemo } from 'react';
import { DollarSign, Calculator, TrendingDown, Calendar, Share2, Download, Printer, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

type PaymentFrequency = 'monthly' | 'bi-weekly' | 'weekly';
type PaymentType = 'standard' | 'interest-only' | 'balloon';

interface PaymentInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  paymentFrequency: PaymentFrequency;
  paymentType: PaymentType;
  balloonAmount?: number;
  extraPayment?: number;
}

interface PaymentResult {
  regularPayment: number;
  totalPayments: number;
  totalInterest: number;
  totalPaid: number;
  payoffDate: string;
  // With extra payments
  withExtraPayment?: {
    payment: number;
    totalPayments: number;
    totalInterest: number;
    totalPaid: number;
    payoffDate: string;
    timeSaved: string;
    interestSaved: number;
  };
}

export function PaymentCalculator() {
  const [inputs, setInputs] = useState<PaymentInputs>({
    loanAmount: 25000,
    interestRate: 6.5,
    loanTerm: 5,
    paymentFrequency: 'monthly',
    paymentType: 'standard',
    extraPayment: 0,
  });

  const [result, setResult] = useState<PaymentResult | null>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/payment-calculator',
    getShareParams: () => ({
      la: inputs.loanAmount.toString(),
      ir: inputs.interestRate.toString(),
      lt: inputs.loanTerm.toString(),
      pf: inputs.paymentFrequency,
      pt: inputs.paymentType,
      ep: (inputs.extraPayment || 0).toString(),
      ba: (inputs.balloonAmount || 0).toString(),
    }),
    getShareText: () => 
      result 
        ? `My Payment: $${result.regularPayment.toLocaleString('en-US')}/month | Total Interest: $${result.totalInterest.toLocaleString('en-US')}`
        : 'Calculate your payment schedule!',
  });

  // Calculate payment
  const calculatePayment = useMemo((): PaymentResult | null => {
    if (inputs.loanAmount <= 0 || inputs.interestRate < 0 || inputs.loanTerm <= 0) {
      return null;
    }

    // Convert annual rate to period rate
    const annualRate = inputs.interestRate / 100;
    const paymentsPerYear = inputs.paymentFrequency === 'monthly' ? 12 : inputs.paymentFrequency === 'bi-weekly' ? 26 : 52;
    const periodRate = annualRate / paymentsPerYear;
    const totalPayments = inputs.loanTerm * paymentsPerYear;

    let regularPayment: number;
    let totalInterest: number;
    let totalPaid: number;

    if (inputs.paymentType === 'standard') {
      // Standard amortized loan
      if (periodRate === 0) {
        regularPayment = inputs.loanAmount / totalPayments;
      } else {
        regularPayment = inputs.loanAmount * (periodRate * Math.pow(1 + periodRate, totalPayments)) / 
                        (Math.pow(1 + periodRate, totalPayments) - 1);
      }
      totalPaid = regularPayment * totalPayments;
      totalInterest = totalPaid - inputs.loanAmount;
    } else if (inputs.paymentType === 'interest-only') {
      // Interest-only payments
      regularPayment = inputs.loanAmount * periodRate;
      totalInterest = regularPayment * totalPayments;
      totalPaid = totalInterest + inputs.loanAmount;
    } else {
      // Balloon payment
      const balloonAmount = inputs.balloonAmount || 0;
      const financeAmount = inputs.loanAmount - balloonAmount;
      
      if (periodRate === 0) {
        regularPayment = financeAmount / totalPayments;
      } else {
        regularPayment = financeAmount * (periodRate * Math.pow(1 + periodRate, totalPayments)) / 
                        (Math.pow(1 + periodRate, totalPayments) - 1);
      }
      totalPaid = (regularPayment * totalPayments) + balloonAmount;
      totalInterest = totalPaid - inputs.loanAmount;
    }

    // Calculate payoff date
    const today = new Date();
    const monthsToAdd = inputs.loanTerm * 12;
    const payoffDate = new Date(today.setMonth(today.getMonth() + monthsToAdd));
    const payoffDateStr = payoffDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    // Calculate with extra payments if provided
    let withExtraPayment: PaymentResult['withExtraPayment'] | undefined;
    if (inputs.extraPayment && inputs.extraPayment > 0 && inputs.paymentType === 'standard') {
      const extraPaymentAmount = inputs.extraPayment;
      const paymentWithExtra = regularPayment + extraPaymentAmount;
      
      let balance = inputs.loanAmount;
      let paymentsCount = 0;
      let totalInterestWithExtra = 0;

      while (balance > 0 && paymentsCount < totalPayments * 2) { // safety limit
        const interestCharge = balance * periodRate;
        const principalPayment = paymentWithExtra - interestCharge;
        
        totalInterestWithExtra += interestCharge;
        balance -= principalPayment;
        paymentsCount++;

        if (balance <= 0) break;
      }

      const totalPaidWithExtra = (paymentWithExtra * paymentsCount) + (balance < 0 ? balance : 0);
      const monthsSavedApprox = (totalPayments - paymentsCount) / (paymentsPerYear / 12);
      const yearsSaved = Math.floor(monthsSavedApprox / 12);
      const monthsSaved = Math.round(monthsSavedApprox % 12);
      const timeSavedStr = yearsSaved > 0 ? `${yearsSaved} year${yearsSaved > 1 ? 's' : ''} ${monthsSaved} month${monthsSaved > 1 ? 's' : ''}` : `${monthsSaved} month${monthsSaved > 1 ? 's' : ''}`;
      
      const payoffWithExtraDate = new Date();
      const monthsWithExtra = paymentsCount / (paymentsPerYear / 12);
      payoffWithExtraDate.setMonth(payoffWithExtraDate.getMonth() + Math.ceil(monthsWithExtra));
      const payoffWithExtraDateStr = payoffWithExtraDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      withExtraPayment = {
        payment: paymentWithExtra,
        totalPayments: paymentsCount,
        totalInterest: totalInterestWithExtra,
        totalPaid: totalPaidWithExtra,
        payoffDate: payoffWithExtraDateStr,
        timeSaved: timeSavedStr,
        interestSaved: totalInterest - totalInterestWithExtra,
      };
    }

    return {
      regularPayment,
      totalPayments,
      totalInterest,
      totalPaid,
      payoffDate: payoffDateStr,
      withExtraPayment,
    };
  }, [inputs]);

  const handleCalculate = () => {
    const calculated = calculatePayment;
    setResult(calculated);
  };

  const handleReset = () => {
    setInputs({
      loanAmount: 25000,
      interestRate: 6.5,
      loanTerm: 5,
      paymentFrequency: 'monthly',
      paymentType: 'standard',
      extraPayment: 0,
    });
    setResult(null);
  };

  const handleSaveAsImage = async () => {
    const element = document.getElementById('payment-result');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = 'payment-calculation.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const frequencyLabel = inputs.paymentFrequency === 'monthly' ? 'month' : 
                        inputs.paymentFrequency === 'bi-weekly' ? 'bi-week' : 'week';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6 hidden lg:block">
          <DollarSign className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Payment Calculator</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount ($)
            </label>
            <input
              type="number"
              value={inputs.loanAmount}
              onChange={(e) => setInputs({ ...inputs, loanAmount: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="25000"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={inputs.interestRate}
              onChange={(e) => setInputs({ ...inputs, interestRate: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="6.5"
            />
          </div>

          {/* Loan Term */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term (years)
            </label>
            <input
              type="number"
              value={inputs.loanTerm}
              onChange={(e) => setInputs({ ...inputs, loanTerm: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="5"
            />
          </div>

          {/* Payment Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Frequency
            </label>
            <select
              value={inputs.paymentFrequency}
              onChange={(e) => setInputs({ ...inputs, paymentFrequency: e.target.value as PaymentFrequency })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="monthly">Monthly</option>
              <option value="bi-weekly">Bi-Weekly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          {/* Payment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Type
            </label>
            <select
              value={inputs.paymentType}
              onChange={(e) => setInputs({ ...inputs, paymentType: e.target.value as PaymentType })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="standard">Standard Amortized</option>
              <option value="interest-only">Interest Only</option>
              <option value="balloon">Balloon Payment</option>
            </select>
          </div>

          {/* Balloon Amount (conditional) */}
          {inputs.paymentType === 'balloon' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Balloon Amount ($)
              </label>
              <input
                type="number"
                value={inputs.balloonAmount || 0}
                onChange={(e) => setInputs({ ...inputs, balloonAmount: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="5000"
              />
            </div>
          )}

          {/* Extra Payment (conditional) */}
          {inputs.paymentType === 'standard' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extra Payment per Period ($) <span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <input
                type="number"
                value={inputs.extraPayment || 0}
                onChange={(e) => setInputs({ ...inputs, extraPayment: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCalculate}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calculate Payment
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium shadow-md flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div id="payment-result" className="space-y-6">
          {/* Main Payment Result */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Your Payment Schedule</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-gray-600 mb-1">Payment Amount</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 break-all">
                  ${result.regularPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-gray-500 mt-1">per {frequencyLabel}</div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-gray-600 mb-1">Total Interest</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600 break-all">
                  ${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-gray-500 mt-1">over loan term</div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-gray-600 mb-1">Total Paid</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-all">
                  ${result.totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-gray-500 mt-1">principal + interest</div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-gray-600 mb-1">Payoff Date</div>
                <div className="text-xl font-bold text-green-600 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {result.payoffDate}
                </div>
                <div className="text-xs text-gray-500 mt-1">{result.totalPayments} payments</div>
              </div>
            </div>

            {/* Payment Type Info */}
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                {inputs.paymentType === 'standard' && 'Standard Amortized Loan'}
                {inputs.paymentType === 'interest-only' && '⚠️ Interest-Only Loan'}
                {inputs.paymentType === 'balloon' && '⚠️ Balloon Payment Loan'}
              </h4>
              <p className="text-blue-800 text-sm">
                {inputs.paymentType === 'standard' && 
                  `Each payment includes both principal and interest. Your loan will be fully paid off by ${result.payoffDate}.`
                }
                {inputs.paymentType === 'interest-only' && 
                  `You're only paying interest now. The full principal of $${inputs.loanAmount.toLocaleString('en-US')} is due at the end of the term.`
                }
                {inputs.paymentType === 'balloon' && 
                  `Lower monthly payments, but a large balloon payment of $${(inputs.balloonAmount || 0).toLocaleString('en-US')} is due at the end.`
                }
              </p>
            </div>
          </div>

          {/* Extra Payment Comparison */}
          {result.withExtraPayment && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingDown className="w-6 h-6 text-green-600" />
                Impact of Extra Payments
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Without Extra Payment */}
                <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Regular Schedule</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment:</span>
                      <span className="font-semibold text-gray-900">
                        ${result.regularPayment.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-semibold text-orange-600">
                        ${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payoff Date:</span>
                      <span className="font-semibold text-gray-900">{result.payoffDate}</span>
                    </div>
                  </div>
                </div>

                {/* With Extra Payment */}
                <div className="bg-green-50 rounded-lg p-6 border-2 border-green-300">
                  <h4 className="font-semibold text-green-900 mb-4">
                    With ${inputs.extraPayment?.toFixed(2)} Extra
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-700">Payment:</span>
                      <span className="font-semibold text-green-900">
                        ${result.withExtraPayment.payment.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Total Interest:</span>
                      <span className="font-semibold text-green-900">
                        ${result.withExtraPayment.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Payoff Date:</span>
                      <span className="font-semibold text-green-900">
                        {result.withExtraPayment.payoffDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Summary */}
              <div className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-6 text-white">
                <h4 className="font-bold text-lg mb-3">💰 Your Savings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Interest Saved</div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold break-all">
                      ${result.withExtraPayment.interestSaved.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90 mb-1">Time Saved</div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold break-all">{result.withExtraPayment.timeSaved}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cost Breakdown */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cost Breakdown</h3>

            <div className="space-y-4">
              {/* Principal */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Principal Amount</span>
                  <span className="font-semibold text-gray-900">
                    ${inputs.loanAmount.toLocaleString('en-US')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${(inputs.loanAmount / result.totalPaid) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Interest */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Total Interest</span>
                  <span className="font-semibold text-orange-600">
                    ${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-orange-500 h-3 rounded-full"
                    style={{ width: `${(result.totalInterest / result.totalPaid) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t-2 border-gray-200">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total Amount Paid</span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-all">
                    ${result.totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-xs font-medium">Share</span>
              </button>
              <button
                onClick={handleSaveAsImage}
                className="flex flex-col items-center gap-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span className="text-xs font-medium">Save</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex flex-col items-center gap-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span className="text-xs font-medium">Print</span>
              </button>
              <button
                onClick={handleReset}
                className="flex flex-col items-center gap-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-xs font-medium">Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Payment Calculator"
      />
    </div>
  );
}

