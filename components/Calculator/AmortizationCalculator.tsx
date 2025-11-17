'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Download, DollarSign, Calendar, TrendingDown, Calculator, FileText, PiggyBank } from 'lucide-react';
import html2canvas from 'html2canvas';

interface AmortizationInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  extraPayment: number;
  startDate: string;
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly';
}

interface PaymentPeriod {
  period: number;
  date: string;
  payment: number;
  principal: number;
  interest: number;
  extraPayment: number;
  totalPayment: number;
  balance: number;
}

interface AmortizationResult {
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  totalCost: number;
  payoffDate: string;
  schedule: PaymentPeriod[];
  extraPaymentBenefits: {
    timeSaved: string;
    interestSaved: number;
    newPayoffDate: string;
  };
  summary: {
    principalPaid: number;
    interestPaid: number;
    extraPaid: number;
    remainingBalance: number;
  };
}

const calculateAmortization = (inputs: AmortizationInputs): AmortizationResult | null => {
  if (inputs.loanAmount <= 0 || inputs.interestRate < 0 || inputs.loanTerm <= 0) {
    return null;
  }

  // Convert annual rate to period rate
  let periodsPerYear = 12;
  if (inputs.paymentFrequency === 'biweekly') periodsPerYear = 26;
  if (inputs.paymentFrequency === 'weekly') periodsPerYear = 52;

  const periodRate = inputs.interestRate / 100 / periodsPerYear;
  const totalPeriods = inputs.loanTerm * periodsPerYear;

  // Calculate base payment using PMT formula
  const monthlyPayment = periodRate > 0 
    ? (inputs.loanAmount * periodRate * Math.pow(1 + periodRate, totalPeriods)) / 
      (Math.pow(1 + periodRate, totalPeriods) - 1)
    : inputs.loanAmount / totalPeriods;

  // Generate amortization schedule
  const schedule: PaymentPeriod[] = [];
  let remainingBalance = inputs.loanAmount;
  let totalInterestPaid = 0;
  let totalExtraPaid = 0;
  const startDate = new Date(inputs.startDate);

  for (let period = 1; period <= totalPeriods && remainingBalance > 0.01; period++) {
    const interestPayment = remainingBalance * periodRate;
    let principalPayment = monthlyPayment - interestPayment;
    
    // Handle final payment
    if (principalPayment > remainingBalance) {
      principalPayment = remainingBalance;
    }

    let extraPayment = inputs.extraPayment;
    // Don't allow extra payment to exceed remaining balance
    if (extraPayment > remainingBalance - principalPayment) {
      extraPayment = Math.max(0, remainingBalance - principalPayment);
    }

    const totalPayment = principalPayment + interestPayment + extraPayment;
    remainingBalance -= (principalPayment + extraPayment);

    // Calculate payment date
    const paymentDate = new Date(startDate);
    if (inputs.paymentFrequency === 'monthly') {
      paymentDate.setMonth(paymentDate.getMonth() + period - 1);
    } else if (inputs.paymentFrequency === 'biweekly') {
      paymentDate.setDate(paymentDate.getDate() + (period - 1) * 14);
    } else if (inputs.paymentFrequency === 'weekly') {
      paymentDate.setDate(paymentDate.getDate() + (period - 1) * 7);
    }

    schedule.push({
      period,
      date: paymentDate.toLocaleDateString(),
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      extraPayment,
      totalPayment,
      balance: Math.max(0, remainingBalance)
    });

    totalInterestPaid += interestPayment;
    totalExtraPaid += extraPayment;

    if (remainingBalance <= 0.01) break;
  }

  // Calculate without extra payments for comparison
  let regularSchedule: PaymentPeriod[] = [];
  let regularBalance = inputs.loanAmount;
  for (let period = 1; period <= totalPeriods && regularBalance > 0.01; period++) {
    const interestPayment = regularBalance * periodRate;
    let principalPayment = monthlyPayment - interestPayment;
    
    if (principalPayment > regularBalance) {
      principalPayment = regularBalance;
    }

    regularBalance -= principalPayment;

    const paymentDate = new Date(startDate);
    if (inputs.paymentFrequency === 'monthly') {
      paymentDate.setMonth(paymentDate.getMonth() + period - 1);
    } else if (inputs.paymentFrequency === 'biweekly') {
      paymentDate.setDate(paymentDate.getDate() + (period - 1) * 14);
    } else if (inputs.paymentFrequency === 'weekly') {
      paymentDate.setDate(paymentDate.getDate() + (period - 1) * 7);
    }

    regularSchedule.push({
      period,
      date: paymentDate.toLocaleDateString(),
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      extraPayment: 0,
      totalPayment: monthlyPayment,
      balance: Math.max(0, regularBalance)
    });

    if (regularBalance <= 0.01) break;
  }

  const totalPayments = schedule.length * monthlyPayment + totalExtraPaid;
  const totalCost = inputs.loanAmount + totalInterestPaid;
  const payoffDate = schedule.length > 0 ? schedule[schedule.length - 1].date : '';

  // Calculate extra payment benefits
  const regularTotalInterest = regularSchedule.reduce((sum, payment) => sum + payment.interest, 0);
  const interestSaved = regularTotalInterest - totalInterestPaid;
  const timeSaved = regularSchedule.length - schedule.length;
  const newPayoffDate = payoffDate;

  let timeSavedText = '';
  if (inputs.paymentFrequency === 'monthly') {
    const years = Math.floor(timeSaved / 12);
    const months = timeSaved % 12;
    timeSavedText = years > 0 ? `${years} years ${months} months` : `${months} months`;
  } else if (inputs.paymentFrequency === 'biweekly') {
    const years = Math.floor(timeSaved / 26);
    const periods = timeSaved % 26;
    timeSavedText = years > 0 ? `${years} years ${periods} periods` : `${periods} periods`;
  } else {
    const years = Math.floor(timeSaved / 52);
    const weeks = timeSaved % 52;
    timeSavedText = years > 0 ? `${years} years ${weeks} weeks` : `${weeks} weeks`;
  }

  return {
    monthlyPayment,
    totalPayments,
    totalInterest: totalInterestPaid,
    totalCost,
    payoffDate,
    schedule: schedule.slice(0, 360), // Limit display to first 30 years
    extraPaymentBenefits: {
      timeSaved: timeSavedText,
      interestSaved,
      newPayoffDate
    },
    summary: {
      principalPaid: inputs.loanAmount - (schedule.length > 0 ? schedule[schedule.length - 1].balance : inputs.loanAmount),
      interestPaid: totalInterestPaid,
      extraPaid: totalExtraPaid,
      remainingBalance: schedule.length > 0 ? schedule[schedule.length - 1].balance : inputs.loanAmount
    }
  };
};

export default function AmortizationCalculator() {
  const [inputs, setInputs] = useState<AmortizationInputs>({
    loanAmount: 300000,
    interestRate: 6.5,
    loanTerm: 30,
    extraPayment: 0,
    startDate: new Date().toISOString().split('T')[0],
    paymentFrequency: 'monthly'
  });

  const [result, setResult] = useState<AmortizationResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    const calculatedResult = calculateAmortization(inputs);
    setResult(calculatedResult);
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current || !result) return;
    
    try {
      const canvas = await html2canvas(resultRef.current);
      
      const link = document.createElement('a');
      link.download = `amortization-schedule-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const getCalculationSummary = (): string => {
    if (!result) return '';
    
    const loan = inputs.loanAmount.toLocaleString();
    const payment = result.monthlyPayment.toLocaleString();
    const total = result.totalCost.toLocaleString();
    const interest = result.totalInterest.toLocaleString();
    
    return `$${loan} loan at ${inputs.interestRate}% for ${inputs.loanTerm} years requires ${inputs.paymentFrequency} payments of $${payment}, totaling $${total} with $${interest} in interest.`;
  };

  const handleInputChange = (field: keyof AmortizationInputs, value: number | string) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Number(value)
    }));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6 lg:items-start">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
            {/* Loan Details */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount ($)
                </label>
                <input
                  type="number"
                  value={inputs.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter loan amount"
                  min="0"
                  step="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={inputs.interestRate}
                  onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter interest rate"
                  min="0"
                  max="30"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term (Years)
                </label>
                <input
                  type="number"
                  value={inputs.loanTerm}
                  onChange={(e) => handleInputChange('loanTerm', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter loan term"
                  min="1"
                  max="50"
                  step="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Frequency
                </label>
                <select
                  value={inputs.paymentFrequency}
                  onChange={(e) => handleInputChange('paymentFrequency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>

            {/* Extra Payment */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extra Payment ($)
                </label>
                <input
                  type="number"
                  value={inputs.extraPayment}
                  onChange={(e) => handleInputChange('extraPayment', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter extra payment"
                  min="0"
                  step="50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={inputs.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 mb-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg min-h-[44px]"
            >
              <Calculator className="w-5 h-5" />
              Calculate Amortization
            </button>

            {/* Save as Image Button */}
            <button
              onClick={handleSaveAsImage}
              disabled={!result}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Save as Image
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          <div ref={resultRef} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            {result ? (
              <div className="space-y-6">
                {/* Calculation Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800 text-center font-medium">
                    {getCalculationSummary()}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Payment Amount</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      ${result.monthlyPayment.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-700 mt-1">
                      {inputs.paymentFrequency} payment
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Total Interest</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      ${result.totalInterest.toLocaleString()}
                    </div>
                    <div className="text-xs text-blue-700 mt-1">
                      Over life of loan
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Payoff Date</span>
                    </div>
                    <div className="text-lg font-bold text-purple-900">
                      {result.payoffDate}
                    </div>
                    <div className="text-xs text-purple-700 mt-1">
                      Final payment date
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Total Cost</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-900">
                      ${result.totalCost.toLocaleString()}
                    </div>
                    <div className="text-xs text-orange-700 mt-1">
                      Principal + Interest
                    </div>
                  </div>
                </div>

                {/* Extra Payment Benefits */}
                {inputs.extraPayment > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                      <PiggyBank className="w-4 h-4" />
                      Extra Payment Benefits
                    </h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-green-800">Time Saved:</span>
                        <span className="font-semibold text-green-900 ml-2">
                          {result.extraPaymentBenefits.timeSaved}
                        </span>
                      </div>
                      <div>
                        <span className="text-green-800">Interest Saved:</span>
                        <span className="font-semibold text-green-900 ml-2">
                          ${result.extraPaymentBenefits.interestSaved.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-green-800">New Payoff:</span>
                        <span className="font-semibold text-green-900 ml-2">
                          {result.extraPaymentBenefits.newPayoffDate}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Payment Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Principal Paid:</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        ${result.summary.principalPaid.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Interest Paid:</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        ${result.summary.interestPaid.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Extra Payments:</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        ${result.summary.extraPaid.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Remaining Balance:</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        ${result.summary.remainingBalance.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amortization Schedule */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Amortization Schedule (First 12 Payments)
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left">Payment</th>
                          <th className="px-3 py-2 text-left">Date</th>
                          <th className="px-3 py-2 text-right">Payment</th>
                          <th className="px-3 py-2 text-right">Principal</th>
                          <th className="px-3 py-2 text-right">Interest</th>
                          {inputs.extraPayment > 0 && (
                            <th className="px-3 py-2 text-right">Extra</th>
                          )}
                          <th className="px-3 py-2 text-right">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {result.schedule.slice(0, 12).map((payment, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-3 py-2 font-medium">{payment.period}</td>
                            <td className="px-3 py-2">{payment.date}</td>
                            <td className="px-3 py-2 text-right">
                              ${payment.payment.toLocaleString()}
                            </td>
                            <td className="px-3 py-2 text-right text-green-600">
                              ${payment.principal.toLocaleString()}
                            </td>
                            <td className="px-3 py-2 text-right text-red-600">
                              ${payment.interest.toLocaleString()}
                            </td>
                            {inputs.extraPayment > 0 && (
                              <td className="px-3 py-2 text-right text-blue-600">
                                ${payment.extraPayment.toLocaleString()}
                              </td>
                            )}
                            <td className="px-3 py-2 text-right">
                              ${payment.balance.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {result.schedule.length > 12 && (
                    <p className="text-xs text-gray-500 mt-2">
                      Showing first 12 payments of {result.schedule.length} total payments.
                    </p>
                  )}
                </div>

                {/* Payment Frequency Info */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Payment Frequency Benefits</h4>
                  <div className="text-blue-800 text-sm">
                    {inputs.paymentFrequency === 'biweekly' && (
                      <p>Bi-weekly payments result in 26 payments per year (equivalent to 13 monthly payments), 
                      which can save significant interest and reduce loan term.</p>
                    )}
                    {inputs.paymentFrequency === 'weekly' && (
                      <p>Weekly payments result in 52 payments per year, providing maximum interest savings 
                      and fastest loan payoff, but require careful budgeting.</p>
                    )}
                    {inputs.paymentFrequency === 'monthly' && (
                      <p>Monthly payments are the most common and easiest to budget for, with 12 payments per year 
                      aligned with most income schedules.</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">📊</div>
                <p className="text-gray-500">Enter loan details to generate amortization schedule</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
