'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calculator, TrendingDown, Share2, Download, Printer, RotateCcw, PieChart, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface EMIInputs {
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
  tenureType: 'months' | 'years';
  monthlyIncome: number; // For DTI calculation
}

interface EMIResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  loanAmount: number;
  monthsTotal: number;
  dtiRatio: number;
  dtiCategory: 'excellent' | 'good' | 'fair' | 'poor';
}

interface AmortizationRow {
  month: number;
  emiAmount: number;
  principal: number;
  interest: number;
  balance: number;
}

export function EMICalculator() {
  const resultRef = useRef<HTMLDivElement>(null);

  const [inputs, setInputs] = useState<EMIInputs>({
    loanAmount: 300000, // $300,000 (typical home loan)
    interestRate: 6.5,
    loanTenure: 30,
    tenureType: 'years',
    monthlyIncome: 8000, // $8,000/month
  });

  const [result, setResult] = useState<EMIResult | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/emi-calculator',
    getShareParams: () => ({
      la: inputs.loanAmount.toString(),
      ir: inputs.interestRate.toString(),
      lt: inputs.loanTenure.toString(),
      tt: inputs.tenureType,
      mi: inputs.monthlyIncome.toString(),
    }),
    getShareText: () => 
      result 
        ? `My EMI Calculation: EMI $${result.emi.toLocaleString('en-US')} | Total Interest $${result.totalInterest.toLocaleString('en-US')}`
        : 'Check out my EMI calculation!',
  });

  // Calculate EMI using formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
  const calculateEMI = useMemo(() => {
    const P = inputs.loanAmount;
    const annualRate = inputs.interestRate;
    const R = annualRate / 12 / 100; // Monthly interest rate
    const N = inputs.loanTenure * 12; // Always in years now, convert to months

    if (P <= 0 || annualRate <= 0 || N <= 0) {
      return null;
    }

    // EMI Formula
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    // DTI Calculation
    const dtiRatio = inputs.monthlyIncome > 0 ? (emi / inputs.monthlyIncome) * 100 : 0;
    let dtiCategory: 'excellent' | 'good' | 'fair' | 'poor' = 'excellent';
    
    if (dtiRatio > 43) {
      dtiCategory = 'poor';
    } else if (dtiRatio > 36) {
      dtiCategory = 'fair';
    } else if (dtiRatio > 28) {
      dtiCategory = 'good';
    }

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      loanAmount: P,
      monthsTotal: N,
      dtiRatio: Math.round(dtiRatio * 10) / 10,
      dtiCategory,
    };
  }, [inputs]);

  // Generate amortization schedule
  const amortizationSchedule = useMemo((): AmortizationRow[] => {
    if (!result) return [];

    const schedule: AmortizationRow[] = [];
    let balance = inputs.loanAmount;
    const R = inputs.interestRate / 12 / 100;
    const N = result.monthsTotal;

    for (let month = 1; month <= N; month++) {
      const interestPayment = balance * R;
      const principalPayment = result.emi - interestPayment;
      balance = balance - principalPayment;

      schedule.push({
        month,
        emiAmount: result.emi,
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(Math.max(0, balance)),
      });
    }

    return schedule;
  }, [result, inputs]);

  const handleCalculate = () => {
    const calculatedResult = calculateEMI;
    if (calculatedResult) {
      setResult(calculatedResult);
    }
  };

  const handleReset = () => {
    setInputs({
      loanAmount: 1000000,
      interestRate: 8.5,
      loanTenure: 20,
      tenureType: 'years',
      monthlyIncome: 50000,
    });
    setResult(null);
    setShowSchedule(false);
  };


  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;

    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `emi-calculation-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Load from URL params
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('la')) {
      const newInputs: EMIInputs = {
        loanAmount: parseFloat(params.get('la') || '1000000'),
        interestRate: parseFloat(params.get('ir') || '8.5'),
        loanTenure: parseFloat(params.get('lt') || '20'),
        tenureType: (params.get('tt') || 'years') as 'months' | 'years',
        monthlyIncome: parseFloat(params.get('mi') || '50000'),
      };
      setInputs(newInputs);
      setTimeout(() => {
        handleCalculate();
      }, 100);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Left: Input Form (3 columns) */}
        <div className="xl:col-span-3 space-y-4 sm:space-y-6">
          {/* Loan Details Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Loan Details</h3>
            
            {/* Loan Amount */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount ($)
              </label>
              <input
                type="number"
                value={inputs.loanAmount}
                onChange={(e) => setInputs({ ...inputs, loanAmount: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="300000"
                min="0"
                step="1000"
              />
              <p className="text-xs text-gray-500 mt-1">Enter the total loan amount in US Dollars</p>
            </div>

            {/* Interest Rate */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                value={inputs.interestRate}
                onChange={(e) => setInputs({ ...inputs, interestRate: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="6.5"
                min="0"
                max="30"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">Current home loan rates: 6-8%, Personal loan: 8-15%</p>
            </div>

            {/* Loan Tenure */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Tenure (years)
              </label>
              <input
                type="number"
                value={inputs.tenureType === 'years' ? inputs.loanTenure : (inputs.loanTenure / 12)}
                onChange={(e) => setInputs({
                  ...inputs,
                  loanTenure: inputs.tenureType === 'years' ? parseFloat(e.target.value) || 0 : (parseFloat(e.target.value) || 0) * 12,
                  tenureType: 'years'
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="20"
                min="1"
                max="30"
                step="1"
              />
              <p className="text-xs text-gray-500 mt-1">Home loans: 15-30 years, Car loans: 3-7 years</p>
            </div>

            {/* Monthly Income (for DTI) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Income ($) <span className="text-gray-500 text-xs">(Optional - for affordability analysis)</span>
              </label>
              <input
                type="number"
                value={inputs.monthlyIncome}
                onChange={(e) => setInputs({ ...inputs, monthlyIncome: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="8000"
                min="0"
                step="100"
              />
              <p className="text-xs text-gray-500 mt-1">Used to calculate Debt-to-Income (DTI) ratio</p>
            </div>
          </div>

          {/* Calculate Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleCalculate}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md font-medium text-lg"
            >
              <Calculator className="w-5 h-5" />
              Calculate EMI
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>

        {/* Right: Results (2 columns) */}
        <div className="xl:col-span-2">
          <div className="sticky top-4 space-y-4 sm:space-y-6">
            {!result ? (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">
                  Enter your loan details and click "Calculate EMI" to see your monthly payment and detailed breakup.
                </p>
              </div>
            ) : (
              <div ref={resultRef} className="space-y-6">
                {/* Main EMI Result */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Your EMI Details</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                      <span className="text-white font-bold">Monthly EMI</span>
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white break-all">${result.emi.toLocaleString('en-US')}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">Principal Amount</span>
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-all">${result.loanAmount.toLocaleString('en-US')}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">Total Interest</span>
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-red-600 break-all">${result.totalInterest.toLocaleString('en-US')}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">Total Payment</span>
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-all">${result.totalPayment.toLocaleString('en-US')}</span>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Loan Tenure:</span> {result.monthsTotal} months 
                        ({Math.floor(result.monthsTotal / 12)} years {result.monthsTotal % 12} months)
                      </p>
                    </div>
                  </div>
                </div>

                {/* DTI Analysis */}
                {inputs.monthlyIncome > 0 && (
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Affordability Analysis</h3>

                    <div
                      className={`p-4 rounded-lg mb-4 ${
                        result.dtiCategory === 'excellent'
                          ? 'bg-green-50 border border-green-200'
                          : result.dtiCategory === 'good'
                          ? 'bg-blue-50 border border-blue-200'
                          : result.dtiCategory === 'fair'
                          ? 'bg-yellow-50 border border-yellow-200'
                          : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">Debt-to-Income Ratio</span>
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-all">{result.dtiRatio}%</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        {result.dtiCategory === 'excellent' && '✅ Excellent! Your EMI is well within affordable range.'}
                        {result.dtiCategory === 'good' && '👍 Good! Your loan is affordable with your income.'}
                        {result.dtiCategory === 'fair' && '⚠️ Fair. EMI is manageable but leaves less room for savings.'}
                        {result.dtiCategory === 'poor' && '🚨 High! EMI exceeds 43% of income. Consider lower loan amount.'}
                      </p>
                    </div>

                    <div className="text-sm text-gray-700 space-y-2">
                      <p>• <strong>Ideal DTI:</strong> Below 28% (Excellent affordability)</p>
                      <p>• <strong>Acceptable DTI:</strong> 28-36% (Good affordability)</p>
                      <p>• <strong>Risky DTI:</strong> Above 43% (May strain finances)</p>
                    </div>
                  </div>
                )}

                {/* Principal vs Interest Breakdown */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Breakdown</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Principal ({((result.loanAmount / result.totalPayment) * 100).toFixed(1)}%)</span>
                        <span className="font-semibold">${result.loanAmount.toLocaleString('en-US')}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full"
                          style={{ width: `${(result.loanAmount / result.totalPayment) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Interest ({((result.totalInterest / result.totalPayment) * 100).toFixed(1)}%)</span>
                        <span className="font-semibold">${result.totalInterest.toLocaleString('en-US')}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-red-500 h-3 rounded-full"
                          style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Amortization Schedule */}
      {result && (
        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Amortization Schedule</h3>
            </div>
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              {showSchedule ? 'Hide' : 'Show'} Schedule
            </button>
          </div>

          {showSchedule && (
            <div className="overflow-x-auto overflow-y-hidden">
              <table className="w-full text-left text-xs sm:text-sm min-w-[350px]">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-2 sm:px-4 py-3 font-bold text-gray-900">Month</th>
                    <th className="px-2 sm:px-4 py-3 font-bold text-gray-900">EMI</th>
                    <th className="px-2 sm:px-4 py-3 font-bold text-gray-900">Principal</th>
                    <th className="px-2 sm:px-4 py-3 font-bold text-gray-900">Interest</th>
                    <th className="px-2 sm:px-4 py-3 font-bold text-gray-900">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {amortizationSchedule.slice(0, 12).map((row) => (
                    <tr key={row.month} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-2 sm:px-4 py-3 text-gray-700">{row.month}</td>
                      <td className="px-2 sm:px-4 py-3 text-gray-700">${row.emiAmount.toLocaleString('en-US')}</td>
                      <td className="px-2 sm:px-4 py-3 text-blue-700 font-semibold">${row.principal.toLocaleString('en-US')}</td>
                      <td className="px-2 sm:px-4 py-3 text-red-600 font-semibold">${row.interest.toLocaleString('en-US')}</td>
                      <td className="px-2 sm:px-4 py-3 text-gray-900 font-semibold">${row.balance.toLocaleString('en-US')}</td>
                    </tr>
                  ))}
                  {amortizationSchedule.length > 12 && (
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td colSpan={5} className="px-2 sm:px-4 py-3 text-center text-gray-600 italic">
                        ... showing first 12 months of {result.monthsTotal} months ...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="EMI Calculator"
      />
    </div>
  );
}

