'use client';

import React, { useState, useEffect } from 'react';
import { Car, DollarSign, TrendingDown, Calendar, RefreshCw, Share2, Save, Printer } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AutoLoanInputs {
  vehiclePrice: number;
  downPayment: number;
  tradeInValue: number;
  taxRate: number;
  interestRate: number;
  loanTerm: number;
  vehicleAge: number;
}

interface AutoLoanResult {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  totalCost: number;
  depreciationSchedule: { year: number; value: number; depreciation: number }[];
  amortizationSchedule: { month: number; payment: number; principal: number; interest: number; balance: number }[];
}

export function AutoLoanCalculator() {
  const [inputs, setInputs] = useState<AutoLoanInputs>({
    vehiclePrice: 30000,
    downPayment: 6000,
    tradeInValue: 0,
    taxRate: 7,
    interestRate: 6.5,
    loanTerm: 60,
    vehicleAge: 0,
  });

  const [result, setResult] = useState<AutoLoanResult | null>(null);
  const [showDepreciation, setShowDepreciation] = useState(true);

  const calculateAutoLoan = () => {
    const { vehiclePrice, downPayment, tradeInValue, taxRate, interestRate, loanTerm, vehicleAge } = inputs;

    // Calculate loan amount
    const taxAmount = vehiclePrice * (taxRate / 100);
    const totalPrice = vehiclePrice + taxAmount;
    const loanAmount = totalPrice - downPayment - tradeInValue;

    // Calculate monthly payment
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                       (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
      monthlyPayment = loanAmount / numberOfPayments;
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
    const totalCost = totalPrice + totalInterest;

    // Depreciation schedule (typical car depreciation)
    const depreciationSchedule: AutoLoanResult['depreciationSchedule'] = [];
    let currentValue = vehiclePrice;
    const years = Math.ceil(loanTerm / 12);
    
    // Year 0 (new car loses ~20% driving off lot, used car ~15%)
    const firstYearDep = vehicleAge === 0 ? 0.20 : 0.15;
    
    for (let year = 0; year <= years + 5; year++) {
      if (year === 0) {
        depreciationSchedule.push({
          year: 0,
          value: currentValue,
          depreciation: 0,
        });
      } else {
        let depRate;
        if (vehicleAge === 0) {
          // New car depreciation schedule
          if (year === 1) depRate = firstYearDep;
          else if (year === 2) depRate = 0.15;
          else if (year === 3) depRate = 0.15;
          else if (year <= 5) depRate = 0.10;
          else depRate = 0.05;
        } else {
          // Used car depreciation (slower)
          if (year === 1) depRate = firstYearDep;
          else if (year <= 3) depRate = 0.12;
          else depRate = 0.08;
        }
        
        const depreciation = currentValue * depRate;
        currentValue -= depreciation;
        
        depreciationSchedule.push({
          year,
          value: Math.max(currentValue, vehiclePrice * 0.10), // Floor at 10% of original
          depreciation,
        });
      }
    }

    // Amortization schedule
    const amortizationSchedule: AutoLoanResult['amortizationSchedule'] = [];
    let balance = loanAmount;
    
    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      
      amortizationSchedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(balance, 0),
      });
    }

    setResult({
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
      totalCost,
      depreciationSchedule,
      amortizationSchedule,
    });
  };

  useEffect(() => {
    if (inputs.vehiclePrice > 0) {
      calculateAutoLoan();
    }
  }, [inputs]);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/auto-loan-calculator',
    getShareParams: () => ({
      vp: inputs.vehiclePrice.toString(),
      dp: inputs.downPayment.toString(),
      ti: inputs.tradeInValue.toString(),
      tr: inputs.taxRate.toString(),
      ir: inputs.interestRate.toString(),
      lt: inputs.loanTerm.toString(),
      va: inputs.vehicleAge.toString(),
    }),
    getShareText: () =>
      result
        ? `Car Loan: $${result.monthlyPayment.toFixed(2)}/month | Total: $${result.totalCost.toLocaleString()} | ${inputs.loanTerm} months at ${inputs.interestRate}%`
        : 'Check out my auto loan calculation!',
  });

  const handleSaveImage = async () => {
    const element = document.getElementById('auto-loan-result');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'auto-loan-calculation.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const loanTermOptions = [
    { months: 36, label: '3 years' },
    { months: 48, label: '4 years' },
    { months: 60, label: '5 years' },
    { months: 72, label: '6 years' },
    { months: 84, label: '7 years' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-5 gap-6">
        {/* Input Section - 3 columns */}
        <div className="md:col-span-3 space-y-6">
          {/* Vehicle Details */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-600" />
              Vehicle Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Price ($)
                </label>
                <input
                  type="number"
                  value={inputs.vehiclePrice || ''}
                  onChange={(e) => setInputs({ ...inputs, vehiclePrice: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                  placeholder="30000"
                  step="1000"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Condition
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setInputs({ ...inputs, vehicleAge: 0 })}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                      inputs.vehicleAge === 0
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    New Car
                  </button>
                  <button
                    onClick={() => setInputs({ ...inputs, vehicleAge: 3 })}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                      inputs.vehicleAge > 0
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Used Car
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sales Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={inputs.taxRate || ''}
                  onChange={(e) => setInputs({ ...inputs, taxRate: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="7"
                  step="0.1"
                  min="0"
                  max="15"
                />
                <p className="text-xs text-gray-500 mt-2">Varies by state (0-10%)</p>
              </div>
            </div>
          </div>

          {/* Down Payment & Trade-In */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Down Payment & Trade-In
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment ($)
                </label>
                <input
                  type="number"
                  value={inputs.downPayment || ''}
                  onChange={(e) => setInputs({ ...inputs, downPayment: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold"
                  placeholder="6000"
                  step="500"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Recommended: 20% (${(inputs.vehiclePrice * 0.20).toLocaleString()})
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trade-In Value ($)
                </label>
                <input
                  type="number"
                  value={inputs.tradeInValue || ''}
                  onChange={(e) => setInputs({ ...inputs, tradeInValue: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                  step="500"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-2">Value of your current vehicle (if any)</p>
              </div>
            </div>
          </div>

          {/* Loan Terms */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Loan Terms
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={inputs.interestRate || ''}
                  onChange={(e) => setInputs({ ...inputs, interestRate: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold"
                  placeholder="6.5"
                  step="0.1"
                  min="0"
                  max="30"
                />
                <p className="text-xs text-gray-500 mt-2">Average new car: 5-7%, used car: 7-10%</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {loanTermOptions.map((option) => (
                    <button
                      key={option.months}
                      onClick={() => setInputs({ ...inputs, loanTerm: option.months })}
                      className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                        inputs.loanTerm === option.months
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <input
                    type="number"
                    value={inputs.loanTerm || ''}
                    onChange={(e) => setInputs({ ...inputs, loanTerm: parseInt(e.target.value) || 60 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="60"
                    min="12"
                    max="84"
                  />
                  <p className="text-xs text-gray-500 mt-1">Custom term (months)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section - 2 columns */}
        <div className="md:col-span-2 space-y-6">
          {result && (
            <>
              <div id="auto-loan-result" className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg border border-blue-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-blue-600" />
                  Loan Summary
                </h3>

                {/* Monthly Payment */}
                <div className="bg-white rounded-lg p-6 mb-4 border border-blue-200 text-center">
                  <div className="text-sm text-gray-600 mb-2">Monthly Payment</div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    ${result.monthlyPayment.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">For {inputs.loanTerm} months</div>
                </div>

                {/* Breakdown */}
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Vehicle Price:</span>
                      <span className="font-semibold">${inputs.vehiclePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Sales Tax ({inputs.taxRate}%):</span>
                      <span className="font-semibold">${(inputs.vehiclePrice * inputs.taxRate / 100).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Down Payment:</span>
                      <span className="font-semibold text-green-600">-${inputs.downPayment.toLocaleString()}</span>
                    </div>
                    {inputs.tradeInValue > 0 && (
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Trade-In:</span>
                        <span className="font-semibold text-green-600">-${inputs.tradeInValue.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between text-sm">
                      <span className="text-gray-900 font-bold">Loan Amount:</span>
                      <span className="font-bold text-blue-600">${result.loanAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-bold text-orange-600">
                        ${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Cost:</span>
                      <span className="font-bold text-gray-900">
                        ${result.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Down Payment Analysis */}
                  <div className={`rounded-lg p-4 ${
                    (inputs.downPayment / inputs.vehiclePrice) >= 0.20
                      ? 'bg-green-100 border border-green-300'
                      : (inputs.downPayment / inputs.vehiclePrice) >= 0.10
                      ? 'bg-yellow-100 border border-yellow-300'
                      : 'bg-red-100 border border-red-300'
                  }`}>
                    <div className="text-sm font-semibold text-gray-900 mb-2">
                      Down Payment: {((inputs.downPayment / inputs.vehiclePrice) * 100).toFixed(1)}%
                    </div>
                    <p className="text-xs text-gray-700">
                      {(inputs.downPayment / inputs.vehiclePrice) >= 0.20
                        ? '✓ Excellent! 20%+ down payment helps you avoid being upside-down on the loan.'
                        : (inputs.downPayment / inputs.vehiclePrice) >= 0.10
                        ? '⚠ Consider increasing to 20% to avoid negative equity as car depreciates.'
                        : '⚠ Low down payment increases risk of owing more than car is worth.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Depreciation Warning */}
              {showDepreciation && result.depreciationSchedule.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-orange-600" />
                      Vehicle Depreciation
                    </h3>
                    <button
                      onClick={() => setShowDepreciation(!showDepreciation)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      {showDepreciation ? 'Hide' : 'Show'}
                    </button>
                  </div>

                  <div className="space-y-2">
                    {result.depreciationSchedule.slice(0, 6).map((item) => (
                      <div key={item.year} className="flex justify-between text-sm">
                        <span className="text-gray-600">Year {item.year}:</span>
                        <span className="font-semibold">${item.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-xs text-gray-700">
                      <strong>Note:</strong> {inputs.vehicleAge === 0 ? 'New cars' : 'Used cars'} depreciate{' '}
                      {inputs.vehicleAge === 0 ? '~20%' : '~15%'} in the first year. 
                      By year 5, expect {inputs.vehicleAge === 0 ? '50-60%' : '40-50%'} depreciation.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleShare}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Calculation
                  </button>
                  <button
                    onClick={handleSaveImage}
                    className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save as Image
                  </button>
                  <button
                    onClick={handlePrint}
                    className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Depreciation Chart */}
      {result && result.depreciationSchedule.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Vehicle Value Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={result.depreciationSchedule.slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} name="Vehicle Value" />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-600 mt-4 text-center">
            Shows estimated depreciation based on typical {inputs.vehicleAge === 0 ? 'new' : 'used'} car depreciation rates
          </p>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Auto Loan Calculator"
      />
    </div>
  );
}

