'use client';

import { useState, useRef } from 'react';
import { Share2, CreditCard } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

interface CardInputs {
  balance: number;
  interestRate: number;
  minimumPaymentType: 'percentage' | 'fixed';
  minimumPaymentValue: number;
  monthlyPayment: number;
}

interface PaymentStrategy {
  type: 'minimum' | 'custom' | 'payoff3' | 'payoff1';
  label: string;
  monthlyPayment: number;
  totalMonths: number;
  totalInterest: number;
  totalPaid: number;
}

interface CardResult {
  strategies: PaymentStrategy[];
  recommendations: string[];
  interestSaved: number;
  timeSaved: number;
}

export function CreditCardCalculator() {
  const [inputs, setInputs] = useState<CardInputs>({
    balance: 5000,
    interestRate: 18.99,
    minimumPaymentType: 'percentage',
    minimumPaymentValue: 2,
    monthlyPayment: 200,
  });

  const [result, setResult] = useState<CardResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/credit-card-calculator',
    getShareParams: () => ({
      b: inputs.balance.toString(),
      ir: inputs.interestRate.toString(),
      mpt: inputs.minimumPaymentType,
      mpv: inputs.minimumPaymentValue.toString(),
      mp: inputs.monthlyPayment.toString(),
    }),
    getShareText: () =>
      result
        ? `Credit Card Payoff: ${result.strategies[0].totalMonths} months | Interest: $${result.strategies[0].totalInterest.toFixed(0)} | Save: $${result.interestSaved.toFixed(0)}`
        : 'Calculate your credit card payoff strategy!',
  });

  const handleInputChange = (field: keyof CardInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculatePayoff = (balance: number, monthlyPayment: number, annualRate: number): { months: number; totalInterest: number; totalPaid: number } => {
    if (monthlyPayment <= 0) {
      return { months: 999, totalInterest: balance * 10, totalPaid: balance * 11 };
    }

    const monthlyRate = annualRate / 100 / 12;
    let remainingBalance = balance;
    let totalInterest = 0;
    let months = 0;
    const maxMonths = 600; // 50 years max

    while (remainingBalance > 0.01 && months < maxMonths) {
      const interestCharge = remainingBalance * monthlyRate;
      const principalPayment = Math.min(monthlyPayment - interestCharge, remainingBalance);
      
      if (principalPayment <= 0) {
        // Payment doesn't cover interest
        return { months: 999, totalInterest: balance * 10, totalPaid: balance * 11 };
      }

      totalInterest += interestCharge;
      remainingBalance -= principalPayment;
      months++;
    }

    const totalPaid = balance + totalInterest;
    return { months, totalInterest, totalPaid };
  };

  const calculateCreditCard = () => {
    const { balance, interestRate, minimumPaymentType, minimumPaymentValue, monthlyPayment } = inputs;

    // Calculate minimum payment
    let minPayment: number;
    if (minimumPaymentType === 'percentage') {
      minPayment = Math.max(balance * (minimumPaymentValue / 100), 25); // Min $25
    } else {
      minPayment = minimumPaymentValue;
    }

    // Strategy 1: Minimum Payment Only
    const minStrategy = calculatePayoff(balance, minPayment, interestRate);

    // Strategy 2: Custom Monthly Payment
    const customStrategy = calculatePayoff(balance, monthlyPayment, interestRate);

    // Strategy 3: Pay off in 3 years (36 months)
    const targetMonths36 = 36;
    const monthlyRate = interestRate / 100 / 12;
    let payment36 = balance / 36; // Start estimate
    // Iterate to find correct payment for 36 months
    for (let i = 0; i < 20; i++) {
      const test = calculatePayoff(balance, payment36, interestRate);
      if (Math.abs(test.months - targetMonths36) < 1) break;
      if (test.months > targetMonths36) {
        payment36 *= 1.1;
      } else {
        payment36 *= 0.95;
      }
    }
    const strategy36 = calculatePayoff(balance, payment36, interestRate);

    // Strategy 4: Pay off in 1 year (12 months)
    const targetMonths12 = 12;
    let payment12 = balance / 12; // Start estimate
    // Iterate to find correct payment for 12 months
    for (let i = 0; i < 20; i++) {
      const test = calculatePayoff(balance, payment12, interestRate);
      if (Math.abs(test.months - targetMonths12) < 1) break;
      if (test.months > targetMonths12) {
        payment12 *= 1.1;
      } else {
        payment12 *= 0.95;
      }
    }
    const strategy12 = calculatePayoff(balance, payment12, interestRate);

    const strategies: PaymentStrategy[] = [
      {
        type: 'minimum',
        label: 'Minimum Payment Only',
        monthlyPayment: minPayment,
        totalMonths: minStrategy.months,
        totalInterest: minStrategy.totalInterest,
        totalPaid: minStrategy.totalPaid,
      },
      {
        type: 'custom',
        label: `$${monthlyPayment}/month`,
        monthlyPayment: monthlyPayment,
        totalMonths: customStrategy.months,
        totalInterest: customStrategy.totalInterest,
        totalPaid: customStrategy.totalPaid,
      },
      {
        type: 'payoff3',
        label: 'Pay off in 3 Years',
        monthlyPayment: payment36,
        totalMonths: strategy36.months,
        totalInterest: strategy36.totalInterest,
        totalPaid: strategy36.totalPaid,
      },
      {
        type: 'payoff1',
        label: 'Pay off in 1 Year',
        monthlyPayment: payment12,
        totalMonths: strategy12.months,
        totalInterest: strategy12.totalInterest,
        totalPaid: strategy12.totalPaid,
      },
    ];

    // Calculate interest saved vs minimum payment
    const interestSaved = minStrategy.totalInterest - customStrategy.totalInterest;
    const timeSaved = minStrategy.months - customStrategy.months;

    // Generate recommendations
    const recommendations: string[] = [];

    if (interestRate > 20) {
      recommendations.push('⚠️ Your interest rate is very high (>20%). Consider balance transfer to a lower rate card or debt consolidation.');
    } else if (interestRate > 15) {
      recommendations.push('💡 Your interest rate is above average. Look for balance transfer offers with 0% APR promotional periods.');
    }

    if (minStrategy.months > 120) {
      recommendations.push('❌ Paying only the minimum will take over 10 years! Increase your monthly payment to save thousands in interest.');
    } else if (minStrategy.months > 60) {
      recommendations.push('⚠️ Paying only the minimum will take over 5 years. Even a small increase can save significant interest.');
    }

    if (interestSaved > 1000) {
      recommendations.push(`✅ By paying $${monthlyPayment}/month instead of the minimum, you'll save $${interestSaved.toFixed(0)} in interest and pay off ${(timeSaved / 12).toFixed(1)} years earlier!`);
    }

    const paymentToBalanceRatio = monthlyPayment / balance;
    if (paymentToBalanceRatio < 0.02) {
      recommendations.push('💰 Your payment is less than 2% of the balance. Try to pay at least 2-3% monthly to make meaningful progress.');
    } else if (paymentToBalanceRatio > 0.10) {
      recommendations.push('🎉 Excellent payment amount! You\'re paying over 10% of the balance monthly, which will eliminate debt quickly.');
    }

    if (balance > 5000 && interestRate > 15) {
      recommendations.push('🔄 Consider debt consolidation loan. Personal loans often have lower rates (8-12%) than credit cards (15-25%).');
    }

    recommendations.push('📊 Tip: Pay more than the minimum whenever possible. Even an extra $50/month can save hundreds in interest.');

    setResult({
      strategies,
      recommendations,
      interestSaved,
      timeSaved,
    });
  };

  const handleReset = () => {
    setInputs({
      balance: 5000,
      interestRate: 18.99,
      minimumPaymentType: 'percentage',
      minimumPaymentValue: 2,
      monthlyPayment: 200,
    });
    setResult(null);
  };

  // Save as Image
  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = 'credit-card-payoff-results.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  // Print Results
  const handlePrint = async () => {
    if (!resultRef.current) return;
    
    try {
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
              <title>Credit Card Payoff Results</title>
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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-blue-600" />
              Credit Card Details
            </h2>

            <div className="space-y-5">
              {/* Current Balance */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Balance <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.balance}
                    onChange={(e) => handleInputChange('balance', parseFloat(e.target.value) || 0)}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="5000"
                    min="0"
                    step="100"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Your total credit card debt</p>
              </div>

              {/* Interest Rate (APR) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interest Rate (APR) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={inputs.interestRate}
                    onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
                    className="w-full pl-4 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="18.99"
                    min="0"
                    max="36"
                    step="0.01"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Annual percentage rate on your card</p>
              </div>

              {/* Minimum Payment */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Payment Calculation
                </label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleInputChange('minimumPaymentType', 'percentage')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      inputs.minimumPaymentType === 'percentage'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    % of Balance
                  </button>
                  <button
                    onClick={() => handleInputChange('minimumPaymentType', 'fixed')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      inputs.minimumPaymentType === 'fixed'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Fixed $
                  </button>
                </div>
                <div className="relative">
                  {inputs.minimumPaymentType === 'percentage' ? (
                    <>
                      <input
                        type="number"
                        value={inputs.minimumPaymentValue}
                        onChange={(e) => handleInputChange('minimumPaymentValue', parseFloat(e.target.value) || 0)}
                        className="w-full pl-4 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="2"
                        min="1"
                        max="10"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </>
                  ) : (
                    <>
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={inputs.minimumPaymentValue}
                        onChange={(e) => handleInputChange('minimumPaymentValue', parseFloat(e.target.value) || 0)}
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="25"
                        min="25"
                        step="5"
                      />
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {inputs.minimumPaymentType === 'percentage' 
                    ? 'Percentage of balance (typically 2-3%)'
                    : 'Fixed minimum payment amount'}
                </p>
              </div>

              {/* Monthly Payment */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Monthly Payment <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.monthlyPayment}
                    onChange={(e) => handleInputChange('monthlyPayment', parseFloat(e.target.value) || 0)}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="200"
                    min="0"
                    step="10"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">How much you plan to pay each month</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={calculateCreditCard}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Calculate Payoff
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {result ? (
            <div className="space-y-4">
              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleSaveAsImage}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Save as Image
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md font-medium"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Results Content (for export) */}
              <div ref={resultRef} className="space-y-4 bg-white p-6 rounded-xl">
                {/* Export Header */}
                <div className="border-b-2 border-gray-200 pb-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Credit Card Payoff Analysis</h2>
                  <p className="text-sm text-gray-600">
                    Balance: ${inputs.balance.toLocaleString()} • APR: {inputs.interestRate}% • Payment: ${inputs.monthlyPayment}/mo
                  </p>
                </div>

                {/* Payment Strategies Comparison */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span>📊</span>
                    Payment Strategies Comparison
                  </h3>
                  
                  <div className="space-y-4">
                    {result.strategies.map((strategy, index) => (
                      <div
                        key={strategy.type}
                        className={`p-5 rounded-lg border-2 ${
                          strategy.type === 'custom'
                            ? 'bg-white border-green-400 shadow-md'
                            : strategy.type === 'minimum'
                            ? 'bg-red-50 border-red-200'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{strategy.label}</h4>
                            {strategy.type === 'custom' && (
                              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Your Plan</span>
                            )}
                            {strategy.type === 'minimum' && (
                              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">Not Recommended</span>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              ${strategy.monthlyPayment.toFixed(0)}<span className="text-sm">/mo</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                          <div>
                            <div className="text-xs text-gray-600">Payoff Time</div>
                            <div className="text-lg font-bold text-gray-900">
                              {strategy.totalMonths > 999 ? '50+ years' : `${Math.floor(strategy.totalMonths / 12)}y ${strategy.totalMonths % 12}m`}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600">Total Interest</div>
                            <div className="text-lg font-bold text-red-600">
                              ${strategy.totalInterest > 999999 ? '999K+' : strategy.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600">Total Paid</div>
                            <div className="text-lg font-bold text-gray-900">
                              ${strategy.totalPaid > 999999 ? '999K+' : strategy.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Savings Highlight */}
                {result.interestSaved > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span>💰</span>
                      Your Savings vs Minimum Payment
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-sm text-gray-600 mb-2">Interest Saved</div>
                        <div className="text-3xl font-bold text-green-600">
                          ${result.interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-sm text-gray-600 mb-2">Time Saved</div>
                        <div className="text-3xl font-bold text-blue-600">
                          {Math.floor(result.timeSaved / 12)} years {result.timeSaved % 12} months
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>💡</span>
                    Personalized Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-indigo-500 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> {/* End of Results Content for export */}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
              <div className="text-6xl mb-4">💳</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Analyze Your Credit Card Debt?</h3>
              <p className="text-gray-600 mb-4">
                Enter your credit card details and click "Calculate Payoff" to see your payoff strategies
              </p>
              <p className="text-sm text-gray-500">
                Compare minimum payment vs custom payment and discover how much you can save
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Credit Card Calculator"
      />
    </div>
  );
}

