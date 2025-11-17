"use client";

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Share2, Download, Printer, DollarSign, TrendingDown, Calendar, Percent } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface PersonalLoanInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  creditScore: string;
  loanPurpose: string;
  originationFee: number;
  monthlyPayment: number;
  extraPayment: number;
  paymentFrequency: 'monthly' | 'bi-weekly' | 'weekly';
}

interface LoanOffer {
  lender: string;
  apr: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  fees: number;
  minCreditScore: number;
  maxLoanAmount: number;
  termOptions: number[];
}

interface CalculationResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  effectiveAPR: number;
  amortizationSchedule: {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
  comparisonLoans: LoanOffer[];
  earlyPayoffAnalysis: {
    timeSaved: number;
    interestSaved: number;
    newPayoffDate: string;
  };
  affordabilityScore: number;
  debtToIncomeRatio: number;
}

export function PersonalLoanCalculator() {
  const [inputs, setInputs] = useState<PersonalLoanInputs>({
    loanAmount: 15000,
    interestRate: 9.5,
    loanTerm: 3,
    creditScore: 'good',
    loanPurpose: 'debt-consolidation',
    originationFee: 3,
    monthlyPayment: 0,
    extraPayment: 0,
    paymentFrequency: 'monthly',
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/personal-loan-calculator',
    getShareParams: () => ({
      la: inputs.loanAmount,
      ir: inputs.interestRate,
      lt: inputs.loanTerm,
      cs: inputs.creditScore,
      ep: inputs.extraPayment,
    }),
    getShareText: () =>
      result
        ? `Personal Loan: $${inputs.loanAmount.toLocaleString()} at ${inputs.interestRate}% | Monthly: $${result.monthlyPayment.toFixed(0)}`
        : 'Calculate your personal loan payments!',
  });

  // Load data from URL parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const la = params.get('la');
    const ir = params.get('ir');
    const lt = params.get('lt');
    const cs = params.get('cs');
    const ep = params.get('ep');

    if (la || ir || lt || cs || ep) {
      const newInputs: PersonalLoanInputs = {
        ...inputs,
        loanAmount: la ? parseFloat(la) : inputs.loanAmount,
        interestRate: ir ? parseFloat(ir) : inputs.interestRate,
        loanTerm: lt ? parseInt(lt) : inputs.loanTerm,
        creditScore: cs || inputs.creditScore,
        extraPayment: ep ? parseFloat(ep) : inputs.extraPayment,
      };
      setInputs(newInputs);

      setTimeout(() => {
        const calculatedResult = calculatePersonalLoan(newInputs);
        setResult(calculatedResult);
      }, 100);
    }
  }, []);

  const getLoanOffers = (): LoanOffer[] => {
    const baseLoanAmount = inputs.loanAmount;
    const baseTerm = inputs.loanTerm;

    const creditScoreRanges = {
      excellent: { min: 750, rateMultiplier: 0.8 },
      good: { min: 700, rateMultiplier: 1.0 },
      fair: { min: 650, rateMultiplier: 1.3 },
      poor: { min: 600, rateMultiplier: 1.8 },
    };

    const userScore = creditScoreRanges[inputs.creditScore as keyof typeof creditScoreRanges] || creditScoreRanges.good;

    return [
      {
        lender: 'LightStream',
        apr: 7.99 * userScore.rateMultiplier,
        monthlyPayment: 0,
        totalInterest: 0,
        totalPayment: 0,
        fees: 0,
        minCreditScore: 660,
        maxLoanAmount: 100000,
        termOptions: [2, 3, 4, 5, 6, 7],
      },
      {
        lender: 'SoFi',
        apr: 8.99 * userScore.rateMultiplier,
        monthlyPayment: 0,
        totalInterest: 0,
        totalPayment: 0,
        fees: 0,
        minCreditScore: 680,
        maxLoanAmount: 100000,
        termOptions: [2, 3, 5, 7],
      },
      {
        lender: 'Marcus by Goldman Sachs',
        apr: 8.24 * userScore.rateMultiplier,
        monthlyPayment: 0,
        totalInterest: 0,
        totalPayment: 0,
        fees: 0,
        minCreditScore: 660,
        maxLoanAmount: 40000,
        termOptions: [3, 4, 5, 6],
      },
      {
        lender: 'Discover',
        apr: 9.49 * userScore.rateMultiplier,
        monthlyPayment: 0,
        totalInterest: 0,
        totalPayment: 0,
        fees: 5,
        minCreditScore: 660,
        maxLoanAmount: 35000,
        termOptions: [3, 4, 5, 6, 7],
      },
      {
        lender: 'Wells Fargo',
        apr: 8.49 * userScore.rateMultiplier,
        monthlyPayment: 0,
        totalInterest: 0,
        totalPayment: 0,
        fees: 0,
        minCreditScore: 660,
        maxLoanAmount: 100000,
        termOptions: [1, 2, 3, 4, 5],
      },
    ].map(offer => {
      const totalFees = (baseLoanAmount * offer.fees) / 100;
      const totalLoanAmount = baseLoanAmount + totalFees;
      const termMonths = baseTerm * 12;
      const monthlyPayment = calculateMonthlyPayment(totalLoanAmount, offer.apr, termMonths);
      const totalPayment = monthlyPayment * termMonths;
      const totalInterest = totalPayment - baseLoanAmount;

      return {
        ...offer,
        monthlyPayment,
        totalInterest,
        totalPayment,
        fees: totalFees,
      };
    });
  };

  const calculateMonthlyPayment = (principal: number, annualRate: number, termMonths: number): number => {
    const monthlyRate = annualRate / 100 / 12;
    if (monthlyRate === 0) return principal / termMonths;

    return principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
           (Math.pow(1 + monthlyRate, termMonths) - 1);
  };

  const calculateEarlyPayoff = (monthlyPayment: number): CalculationResult['earlyPayoffAnalysis'] => {
    if (inputs.extraPayment <= 0) {
      return {
        timeSaved: 0,
        interestSaved: 0,
        newPayoffDate: new Date(Date.now() + inputs.loanTerm * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      };
    }

    const principal = inputs.loanAmount;
    const monthlyRate = inputs.interestRate / 100 / 12;
    const enhancedPayment = monthlyPayment + inputs.extraPayment;

    let balance = principal;
    let monthsPaid = 0;
    let totalInterestPaid = 0;

    while (balance > 0) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = Math.min(enhancedPayment - interestPayment, balance);

      totalInterestPaid += interestPayment;
      balance -= principalPayment;
      monthsPaid++;

      if (monthsPaid > inputs.loanTerm * 12 * 2) break; // Safety limit
    }

    const originalTotalInterest = (monthlyPayment * inputs.loanTerm * 12) - principal;
    const interestSaved = Math.max(0, originalTotalInterest - totalInterestPaid);
    const timeSaved = Math.max(0, (inputs.loanTerm * 12) - monthsPaid);
    const newPayoffDate = new Date(Date.now() + monthsPaid * 30 * 24 * 60 * 60 * 1000).toLocaleDateString();

    return {
      timeSaved: Math.ceil(timeSaved / 12),
      interestSaved,
      newPayoffDate,
    };
  };

  const calculateAffordabilityScore = (): number => {
    // Simplified affordability calculation
    const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm * 12);
    const assumedMonthlyIncome = 5000; // Simplified assumption
    const paymentToIncomeRatio = monthlyPayment / assumedMonthlyIncome;

    if (paymentToIncomeRatio < 0.1) return 95;
    if (paymentToIncomeRatio < 0.15) return 85;
    if (paymentToIncomeRatio < 0.2) return 75;
    if (paymentToIncomeRatio < 0.25) return 65;
    if (paymentToIncomeRatio < 0.3) return 55;
    return 45;
  };

  const calculatePersonalLoan = (inputData: PersonalLoanInputs): CalculationResult => {
    const originationFeeAmount = (inputData.loanAmount * inputData.originationFee) / 100;
    const totalLoanAmount = inputData.loanAmount + originationFeeAmount;
    const termMonths = inputData.loanTerm * 12;

    const monthlyPayment = calculateMonthlyPayment(totalLoanAmount, inputData.interestRate, termMonths);
    const totalPayment = monthlyPayment * termMonths;
    const totalInterest = totalPayment - inputData.loanAmount;
    const effectiveAPR = ((totalPayment - inputData.loanAmount) / inputData.loanAmount) * (12 / termMonths) * 100;

    // Generate amortization schedule (first 24 months)
    const amortizationSchedule = [];
    let balance = totalLoanAmount;
    const monthlyRate = inputData.interestRate / 100 / 12;

    for (let month = 1; month <= Math.min(24, termMonths); month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = Math.min(monthlyPayment - interestPayment, balance);

      amortizationSchedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance - principalPayment),
      });

      balance -= principalPayment;
      if (balance <= 0) break;
    }

    const comparisonLoans = getLoanOffers();
    const earlyPayoffAnalysis = calculateEarlyPayoff(monthlyPayment);
    const affordabilityScore = calculateAffordabilityScore();
    const debtToIncomeRatio = (monthlyPayment / 5000) * 100; // Simplified DTI calculation

    return {
      monthlyPayment,
      totalInterest,
      totalPayment,
      effectiveAPR,
      amortizationSchedule,
      comparisonLoans,
      earlyPayoffAnalysis,
      affordabilityScore,
      debtToIncomeRatio,
    };
  };

  const handleCalculate = async () => {
    if (inputs.loanAmount <= 0 || inputs.interestRate < 0 || inputs.loanTerm <= 0) {
      alert('Please enter valid loan amount, interest rate, and loan term.');
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 400));

    try {
      const result = calculatePersonalLoan(inputs);
      setResult(result);
    } catch (error) {
      console.error('Calculation error:', error);
      alert('An error occurred during calculation. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.download = `personal-loan-analysis-${new Date().toISOString().split('T')[0]}.png`;
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
      await new Promise(resolve => setTimeout(resolve, 800));

      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const imageUrl = canvas.toDataURL('image/png', 1.0);
      const printWindow = window.open('', '_blank');

      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Personal Loan Analysis Report</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="Personal Loan Analysis Report" /></body>
          </html>
        `);
        printWindow.document.close();

        const img = printWindow.document.querySelector('img');
        if (img) {
          img.onload = () => {
            setTimeout(() => printWindow.print(), 250);
          };
        }
      }
    } catch (error) {
      console.error('Error printing:', error);
      alert('Failed to print. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Calculator Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 hidden lg:block">Personal Loan Calculator</h2>

        {/* Input Fields */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount ($)
            </label>
            <input
              type="number"
              value={inputs.loanAmount}
              onChange={(e) => setInputs({ ...inputs, loanAmount: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 15000"
              min="1000"
              max="100000"
              step="1000"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (%)
            </label>
            <input
              type="number"
              value={inputs.interestRate}
              onChange={(e) => setInputs({ ...inputs, interestRate: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 9.5"
              min="1"
              max="36"
              step="0.1"
            />
          </div>

          {/* Loan Term */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term (Years)
            </label>
            <select
              value={inputs.loanTerm}
              onChange={(e) => setInputs({ ...inputs, loanTerm: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>1 Year</option>
              <option value={2}>2 Years</option>
              <option value={3}>3 Years</option>
              <option value={4}>4 Years</option>
              <option value={5}>5 Years</option>
              <option value={6}>6 Years</option>
              <option value={7}>7 Years</option>
            </select>
          </div>

          {/* Credit Score */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Credit Score Range
            </label>
            <select
              value={inputs.creditScore}
              onChange={(e) => setInputs({ ...inputs, creditScore: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="excellent">Excellent (750+)</option>
              <option value="good">Good (700-749)</option>
              <option value="fair">Fair (650-699)</option>
              <option value="poor">Poor (600-649)</option>
            </select>
          </div>

          {/* Loan Purpose */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Purpose
            </label>
            <select
              value={inputs.loanPurpose}
              onChange={(e) => setInputs({ ...inputs, loanPurpose: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="debt-consolidation">Debt Consolidation</option>
              <option value="home-improvement">Home Improvement</option>
              <option value="medical-expenses">Medical Expenses</option>
              <option value="major-purchase">Major Purchase</option>
              <option value="vacation">Vacation</option>
              <option value="wedding">Wedding</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Origination Fee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Origination Fee (%)
            </label>
            <input
              type="number"
              value={inputs.originationFee}
              onChange={(e) => setInputs({ ...inputs, originationFee: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 3"
              min="0"
              max="10"
              step="0.5"
            />
          </div>

          {/* Extra Payment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extra Monthly Payment ($)
            </label>
            <input
              type="number"
              value={inputs.extraPayment}
              onChange={(e) => setInputs({ ...inputs, extraPayment: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 100"
              min="0"
              step="50"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:shadow-none"
          aria-label="Calculate Personal Loan"
          aria-busy={isCalculating}
        >
          {isCalculating ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Calculating...
            </div>
          ) : (
            'Calculate Personal Loan'
          )}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div ref={resultRef} className="space-y-6">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Monthly Payment</h3>
              </div>
              <div className="text-3xl font-bold text-blue-600 break-all">
                ${result.monthlyPayment.toFixed(0)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-center mb-2">
                <Percent className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Total Interest</h3>
              </div>
              <div className="text-3xl font-bold text-green-600 break-all">
                ${result.totalInterest.toFixed(0)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Total Payment</h3>
              </div>
              <div className="text-3xl font-bold text-purple-600 break-all">
                ${result.totalPayment.toFixed(0)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6">
              <div className="flex items-center mb-2">
                <TrendingDown className="h-5 w-5 text-orange-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Effective APR</h3>
              </div>
              <div className="text-3xl font-bold text-orange-600 break-all">
                {result.effectiveAPR.toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center print:hidden">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share Results
            </button>
            <button
              onClick={handleSaveAsImage}
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Save as Image
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>

          {/* Loan Comparison */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Compare Loan Offers</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <th className="py-3 px-4 text-left rounded-tl-lg">Lender</th>
                    <th className="py-3 px-4 text-center">APR</th>
                    <th className="py-3 px-4 text-center">Monthly Payment</th>
                    <th className="py-3 px-4 text-center">Total Interest</th>
                    <th className="py-3 px-4 text-center">Fees</th>
                    <th className="py-3 px-4 text-center rounded-tr-lg">Min Credit Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50 border-2 border-green-500">
                    <td className="py-3 px-4 font-semibold">Current Loan</td>
                    <td className="py-3 px-4 text-center">{result.effectiveAPR.toFixed(2)}%</td>
                    <td className="py-3 px-4 text-center">${result.monthlyPayment.toFixed(0)}</td>
                    <td className="py-3 px-4 text-center">${result.totalInterest.toFixed(0)}</td>
                    <td className="py-3 px-4 text-center">${(inputs.loanAmount * inputs.originationFee / 100).toFixed(0)}</td>
                    <td className="py-3 px-4 text-center">-</td>
                  </tr>
                  {result.comparisonLoans.map((loan, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold">{loan.lender}</td>
                      <td className="py-3 px-4 text-center">{loan.apr.toFixed(2)}%</td>
                      <td className="py-3 px-4 text-center">${loan.monthlyPayment.toFixed(0)}</td>
                      <td className="py-3 px-4 text-center">${loan.totalInterest.toFixed(0)}</td>
                      <td className="py-3 px-4 text-center">${loan.fees.toFixed(0)}</td>
                      <td className="py-3 px-4 text-center">{loan.minCreditScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Early Payoff Analysis */}
          {inputs.extraPayment > 0 && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Early Payoff Analysis</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${result.earlyPayoffAnalysis.interestSaved.toFixed(0)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Interest Saved</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {result.earlyPayoffAnalysis.timeSaved} years
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Time Saved</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {result.earlyPayoffAnalysis.newPayoffDate}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">New Payoff Date</p>
                </div>
              </div>
            </div>
          )}

          {/* Amortization Schedule */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Amortization Schedule (First 24 Months)</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 text-left">Month</th>
                    <th className="py-2 px-3 text-center">Payment</th>
                    <th className="py-2 px-3 text-center">Principal</th>
                    <th className="py-2 px-3 text-center">Interest</th>
                    <th className="py-2 px-3 text-center">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.amortizationSchedule.map((payment) => (
                    <tr key={payment.month} className="hover:bg-gray-50">
                      <td className="py-2 px-3">{payment.month}</td>
                      <td className="py-2 px-3 text-center">${payment.payment.toFixed(0)}</td>
                      <td className="py-2 px-3 text-center">${payment.principal.toFixed(0)}</td>
                      <td className="py-2 px-3 text-center">${payment.interest.toFixed(0)}</td>
                      <td className="py-2 px-3 text-center">${payment.balance.toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Loan Affordability */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Loan Affordability Analysis</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Affordability Score</h4>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold text-blue-600">{result.affordabilityScore}/100</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: `${result.affordabilityScore}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {result.affordabilityScore >= 80 && 'Excellent - This loan is very affordable'}
                  {result.affordabilityScore >= 60 && result.affordabilityScore < 80 && 'Good - This loan is affordable'}
                  {result.affordabilityScore >= 40 && result.affordabilityScore < 60 && 'Fair - Consider reducing loan amount'}
                  {result.affordabilityScore < 40 && 'Poor - This loan may be difficult to afford'}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Debt-to-Income Ratio</h4>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold text-purple-600">{result.debtToIncomeRatio.toFixed(1)}%</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        result.debtToIncomeRatio <= 20 ? 'bg-green-600' :
                        result.debtToIncomeRatio <= 36 ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${Math.min(result.debtToIncomeRatio, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {result.debtToIncomeRatio <= 20 && 'Excellent - Well below recommended limit'}
                  {result.debtToIncomeRatio <= 36 && result.debtToIncomeRatio > 20 && 'Good - Within acceptable range'}
                  {result.debtToIncomeRatio > 36 && 'High - Consider reducing loan amount'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prompt when no calculation */}
      {!result && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <div className="text-4xl mb-4">💰</div>
          <div className="text-xl font-semibold text-gray-900 mb-2">Calculate Your Personal Loan</div>
          <p className="text-gray-600 max-w-md mx-auto">
            Enter your loan details above to see monthly payments, compare offers, and analyze affordability
          </p>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Personal Loan Calculator"
      />
    </div>
  );
}