"use client";

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Share2, Download, Printer, Home, Shield, Calculator, TrendingDown, DollarSign } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface FHALoanInputs {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  annualIncome: number;
  monthlyDebts: number;
  propertyTaxRate: number;
  homeownersInsurance: number;
  hoaFee: number;
  county: string;
  creditScore: number;
  firstTimeBuyer: boolean;
}

interface FHALoanResult {
  // FHA Loan Details
  downPaymentAmount: number;
  downPaymentPercent: number;
  baseLoanAmount: number;
  upfrontMIP: number;
  totalLoanAmount: number;

  // Monthly Payments
  principalAndInterest: number;
  monthlyMIP: number;
  propertyTaxMonthly: number;
  homeownersInsuranceMonthly: number;
  hoaFeeMonthly: number;
  totalMonthlyPayment: number;

  // Costs and Fees
  closingCosts: number;
  cashNeededAtClosing: number;
  totalInterestPaid: number;
  totalOfAllPayments: number;

  // Qualification Analysis
  frontEndRatio: number;
  backEndRatio: number;
  maxFHALoanAmount: number;
  qualifiesForFHA: boolean;

  // Comparison
  conventionalPayment: number;
  monthlySavings: number;
  totalSavings: number;
}

interface CountyLoanLimits {
  [county: string]: number;
}

export function FHALoanCalculator() {
  const [inputs, setInputs] = useState<FHALoanInputs>({
    homePrice: 300000,
    downPayment: 3.5,
    interestRate: 6.5,
    loanTerm: 30,
    annualIncome: 75000,
    monthlyDebts: 500,
    propertyTaxRate: 1.2,
    homeownersInsurance: 1200,
    hoaFee: 0,
    county: 'standard',
    creditScore: 680,
    firstTimeBuyer: true,
  });

  const [result, setResult] = useState<FHALoanResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/fha-loan-calculator',
    getShareParams: () => ({
      hp: inputs.homePrice,
      dp: inputs.downPayment,
      ir: inputs.interestRate,
      ai: inputs.annualIncome,
      md: inputs.monthlyDebts,
    }),
    getShareText: () =>
      result
        ? `FHA Loan: $${inputs.homePrice.toLocaleString()} home | Monthly: $${result.totalMonthlyPayment.toFixed(0)} | ${(result.qualifiesForFHA ? '✓ Qualified' : '✗ Not Qualified')}`
        : 'Calculate your FHA loan options!',
  });

  // Load data from URL parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const hp = params.get('hp');
    const dp = params.get('dp');
    const ir = params.get('ir');
    const ai = params.get('ai');
    const md = params.get('md');

    if (hp || dp || ir || ai || md) {
      const newInputs: FHALoanInputs = {
        ...inputs,
        homePrice: hp ? parseFloat(hp) : inputs.homePrice,
        downPayment: dp ? parseFloat(dp) : inputs.downPayment,
        interestRate: ir ? parseFloat(ir) : inputs.interestRate,
        annualIncome: ai ? parseFloat(ai) : inputs.annualIncome,
        monthlyDebts: md ? parseFloat(md) : inputs.monthlyDebts,
      };
      setInputs(newInputs);

      setTimeout(() => {
        const calculatedResult = calculateFHALoan(newInputs);
        setResult(calculatedResult);
      }, 100);
    }
  }, []);

  const getCountyLoanLimits = (): CountyLoanLimits => {
    return {
      'standard': 420680, // Most counties
      'high-cost': 970800, // High-cost areas
      'alaska-hawaii': 1089600, // Alaska, Hawaii, Guam
      'special': 1472562, // Special exception areas
    };
  };

  const calculateMonthlyPayment = (principal: number, annualRate: number, termYears: number): number => {
    const monthlyRate = annualRate / 100 / 12;
    const termMonths = termYears * 12;

    if (monthlyRate === 0) return principal / termMonths;

    return principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
           (Math.pow(1 + monthlyRate, termMonths) - 1);
  };

  const calculateFHALoan = (inputData: FHALoanInputs): FHALoanResult => {
    // Basic FHA loan calculations
    const downPaymentAmount = (inputData.homePrice * inputData.downPayment) / 100;
    const baseLoanAmount = inputData.homePrice - downPaymentAmount;

    // FHA Mortgage Insurance Premium (MIP)
    // Upfront MIP: 1.75% of base loan amount
    const upfrontMIP = (baseLoanAmount * 1.75) / 100;

    // Monthly MIP: 0.45% to 1.05% annually based on loan term and LTV
    let annualMIPRate = 0.55; // Default for 30-year loans with < 95% LTV
    if (inputData.loanTerm <= 15) {
      annualMIPRate = 0.40; // 15-year loans have lower MIP
    } else if ((baseLoanAmount / inputData.homePrice) > 0.95) {
      annualMIPRate = 0.85; // Higher LTV loans have higher MIP
    }

    const monthlyMIP = (baseLoanAmount * annualMIPRate) / 100 / 12;

    // Total loan amount including upfront MIP (can be financed)
    const totalLoanAmount = baseLoanAmount + upfrontMIP;

    // Monthly payment calculations
    const principalAndInterest = calculateMonthlyPayment(totalLoanAmount, inputData.interestRate, inputData.loanTerm);
    const propertyTaxMonthly = (inputData.homePrice * inputData.propertyTaxRate) / 100 / 12;
    const homeownersInsuranceMonthly = inputData.homeownersInsurance / 12;
    const hoaFeeMonthly = inputData.hoaFee;

    const totalMonthlyPayment = principalAndInterest + monthlyMIP + propertyTaxMonthly +
                                homeownersInsuranceMonthly + hoaFeeMonthly;

    // Closing costs (typically 3-6% of home price)
    const closingCosts = (inputData.homePrice * 4) / 100; // Using 4% average
    const cashNeededAtClosing = downPaymentAmount + closingCosts;

    // Total costs over loan term
    const totalInterestPaid = (principalAndInterest * inputData.loanTerm * 12) - totalLoanAmount;
    const totalOfAllPayments = totalMonthlyPayment * inputData.loanTerm * 12;

    // Qualification analysis (FHA ratios)
    const monthlyIncome = inputData.annualIncome / 12;
    const frontEndRatio = (totalMonthlyPayment / monthlyIncome) * 100;
    const backEndRatio = ((totalMonthlyPayment + inputData.monthlyDebts) / monthlyIncome) * 100;

    // Check county loan limits
    const countyLimits = getCountyLoanLimits();
    const maxFHALoanAmount = countyLimits[inputData.county] || countyLimits['standard'];
    const qualifiesForFHA = totalLoanAmount <= maxFHALoanAmount &&
                           frontEndRatio <= 31 &&
                           backEndRatio <= 43 &&
                           inputData.creditScore >= 580;

    // Compare with conventional loan (typically 20% down, no MIP)
    const conventionalDownPayment = (inputData.homePrice * 20) / 100;
    const conventionalLoanAmount = inputData.homePrice - conventionalDownPayment;
    const conventionalPrincipalAndInterest = calculateMonthlyPayment(conventionalLoanAmount, inputData.interestRate, inputData.loanTerm);
    const conventionalPMI = conventionalLoanAmount > 0 ? (conventionalLoanAmount * 0.5) / 100 / 12 : 0; // PMI if < 20% down
    const conventionalTotalPayment = conventionalPrincipalAndInterest + conventionalPMI +
                                    propertyTaxMonthly + homeownersInsuranceMonthly + hoaFeeMonthly;

    const monthlySavings = conventionalTotalPayment - totalMonthlyPayment;
    const totalSavings = monthlySavings * inputData.loanTerm * 12;

    return {
      downPaymentAmount,
      downPaymentPercent: inputData.downPayment,
      baseLoanAmount,
      upfrontMIP,
      totalLoanAmount,
      principalAndInterest,
      monthlyMIP,
      propertyTaxMonthly,
      homeownersInsuranceMonthly,
      hoaFeeMonthly,
      totalMonthlyPayment,
      closingCosts,
      cashNeededAtClosing,
      totalInterestPaid,
      totalOfAllPayments,
      frontEndRatio,
      backEndRatio,
      maxFHALoanAmount,
      qualifiesForFHA,
      conventionalPayment: conventionalTotalPayment,
      monthlySavings,
      totalSavings,
    };
  };

  const handleCalculate = async () => {
    if (inputs.homePrice <= 0 || inputs.interestRate < 0 || inputs.loanTerm <= 0) {
      alert('Please enter valid home price, interest rate, and loan term.');
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 400));

    try {
      const result = calculateFHALoan(inputs);
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
      link.download = `fha-loan-analysis-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>FHA Loan Analysis Report</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="FHA Loan Analysis Report" /></body>
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
        <div className="flex items-center mb-6">
          <Home className="h-8 w-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">FHA Loan Calculator</h2>
        </div>

        {/* Input Fields */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Home Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Price ($)
            </label>
            <input
              type="number"
              value={inputs.homePrice}
              onChange={(e) => setInputs({ ...inputs, homePrice: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 300000"
              min="50000"
              max="2000000"
              step="10000"
            />
          </div>

          {/* Down Payment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down Payment (FHA minimum is 3.5%)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={inputs.downPayment}
                onChange={(e) => setInputs({ ...inputs, downPayment: parseFloat(e.target.value) || 0 })}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 3.5"
                min="3.5"
                max="100"
                step="0.1"
              />
              <span className="flex items-center px-3 bg-gray-100 rounded-lg">%</span>
            </div>
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
              placeholder="e.g., 6.5"
              min="1"
              max="15"
              step="0.1"
            />
          </div>

          {/* Loan Term */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term
            </label>
            <select
              value={inputs.loanTerm}
              onChange={(e) => setInputs({ ...inputs, loanTerm: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={15}>15 Years</option>
              <option value={30}>30 Years</option>
            </select>
          </div>

          {/* Annual Income */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Household Income ($)
            </label>
            <input
              type="number"
              value={inputs.annualIncome}
              onChange={(e) => setInputs({ ...inputs, annualIncome: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 75000"
              min="20000"
              max="500000"
              step="5000"
            />
          </div>

          {/* Monthly Debts */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Debt Payments ($)
            </label>
            <input
              type="number"
              value={inputs.monthlyDebts}
              onChange={(e) => setInputs({ ...inputs, monthlyDebts: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 500"
              min="0"
              max="10000"
              step="50"
            />
          </div>

          {/* Property Tax Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Property Tax Rate (%)
            </label>
            <input
              type="number"
              value={inputs.propertyTaxRate}
              onChange={(e) => setInputs({ ...inputs, propertyTaxRate: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 1.2"
              min="0"
              max="5"
              step="0.1"
            />
          </div>

          {/* Homeowners Insurance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Homeowners Insurance ($)
            </label>
            <input
              type="number"
              value={inputs.homeownersInsurance}
              onChange={(e) => setInputs({ ...inputs, homeownersInsurance: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 1200"
              min="300"
              max="5000"
              step="100"
            />
          </div>

          {/* HOA Fee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly HOA Fee ($)
            </label>
            <input
              type="number"
              value={inputs.hoaFee}
              onChange={(e) => setInputs({ ...inputs, hoaFee: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 0"
              min="0"
              max="1000"
              step="25"
            />
          </div>

          {/* County */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              County Type (for loan limits)
            </label>
            <select
              value={inputs.county}
              onChange={(e) => setInputs({ ...inputs, county: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="standard">Standard County ($420,680 limit)</option>
              <option value="high-cost">High-Cost Area ($970,800 limit)</option>
              <option value="alaska-hawaii">Alaska/Hawaii ($1,089,600 limit)</option>
              <option value="special">Special Exception ($1,472,562 limit)</option>
            </select>
          </div>

          {/* Credit Score */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Credit Score (FHA minimum is 580 for 3.5% down)
            </label>
            <input
              type="number"
              value={inputs.creditScore}
              onChange={(e) => setInputs({ ...inputs, creditScore: parseInt(e.target.value) || 580 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 680"
              min="500"
              max="850"
              step="10"
            />
          </div>

          {/* First Time Buyer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First-Time Home Buyer?
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setInputs({ ...inputs, firstTimeBuyer: true })}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  inputs.firstTimeBuyer
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setInputs({ ...inputs, firstTimeBuyer: false })}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  !inputs.firstTimeBuyer
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:shadow-none"
          aria-label="Calculate FHA Loan"
          aria-busy={isCalculating}
        >
          {isCalculating ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Calculating...
            </div>
          ) : (
            'Calculate FHA Loan'
          )}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div ref={resultRef} className="space-y-6">
          {/* Qualification Status */}
          <div className={`rounded-xl p-6 border-2 ${
            result.qualifiesForFHA
              ? 'bg-green-50 border-green-500'
              : 'bg-red-50 border-red-500'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {result.qualifiesForFHA ? (
                  <Shield className="h-8 w-8 text-green-600 mr-3" />
                ) : (
                  <Calculator className="h-8 w-8 text-red-600 mr-3" />
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {result.qualifiesForFHA ? '✓ You Qualify for FHA Loan' : '✗ FHA Loan Issues Detected'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {result.qualifiesForFHA
                      ? 'Your profile meets FHA loan requirements'
                      : 'Some requirements may not be met - see analysis below'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Monthly Payment</h3>
              </div>
              <div className="text-3xl font-bold text-blue-600 break-all">
                ${result.totalMonthlyPayment.toFixed(0)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Down Payment</h3>
              <div className="text-3xl font-bold text-green-600 break-all">
                ${result.downPaymentAmount.toFixed(0)}
              </div>
              <p className="text-sm text-gray-600 mt-1">{result.downPaymentPercent}%</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cash at Closing</h3>
              <div className="text-3xl font-bold text-purple-600 break-all">
                ${result.cashNeededAtClosing.toFixed(0)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">FHA Loan Amount</h3>
              <div className="text-3xl font-bold text-orange-600 break-all">
                ${result.totalLoanAmount.toFixed(0)}
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

          {/* Monthly Payment Breakdown */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Payment Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Principal & Interest</span>
                <span className="font-semibold">${result.principalAndInterest.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">FHA Mortgage Insurance (MIP)</span>
                <span className="font-semibold">${result.monthlyMIP.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Property Tax</span>
                <span className="font-semibold">${result.propertyTaxMonthly.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Homeowners Insurance</span>
                <span className="font-semibold">${result.homeownersInsuranceMonthly.toFixed(2)}</span>
              </div>
              {result.hoaFeeMonthly > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">HOA Fee</span>
                  <span className="font-semibold">${result.hoaFeeMonthly.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Monthly Payment</span>
                  <span className="text-2xl font-bold text-blue-600">${result.totalMonthlyPayment.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* FHA vs Conventional Comparison */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">FHA vs Conventional Loan Comparison</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-600">FHA Loan</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Down Payment:</span>
                    <span className="font-semibold">{result.downPaymentPercent}% (${result.downPaymentAmount.toFixed(0)})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Payment:</span>
                    <span className="font-semibold">${result.totalMonthlyPayment.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Upfront MIP:</span>
                    <span className="font-semibold">${result.upfrontMIP.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly MIP:</span>
                    <span className="font-semibold">${result.monthlyMIP.toFixed(0)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-600">Conventional Loan (20% down)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Down Payment:</span>
                    <span className="font-semibold">20% (${(inputs.homePrice * 0.2).toFixed(0)})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Payment:</span>
                    <span className="font-semibold">${result.conventionalPayment.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PMI:</span>
                    <span className="font-semibold">None</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Savings:</span>
                    <span className="font-semibold text-green-600">${result.monthlySavings.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Qualification Analysis */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">FHA Qualification Analysis</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Debt-to-Income Ratios</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Front-End Ratio</span>
                      <span className={`font-semibold ${
                        result.frontEndRatio <= 31 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.frontEndRatio.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          result.frontEndRatio <= 31 ? 'bg-green-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${Math.min(result.frontEndRatio, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">FHA limit: 31%</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Back-End Ratio</span>
                      <span className={`font-semibold ${
                        result.backEndRatio <= 43 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.backEndRatio.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          result.backEndRatio <= 43 ? 'bg-green-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${Math.min(result.backEndRatio, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">FHA limit: 43%</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Other Requirements</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Credit Score</span>
                    <span className={`font-semibold ${
                      inputs.creditScore >= 580 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {inputs.creditScore} (min: 580)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Loan Amount</span>
                    <span className={`font-semibold ${
                      result.totalLoanAmount <= result.maxFHALoanAmount ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${result.totalLoanAmount.toFixed(0)} (max: ${result.maxFHALoanAmount.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Down Payment</span>
                    <span className={`font-semibold ${
                      inputs.downPayment >= 3.5 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {inputs.downPayment}% (min: 3.5%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cost Summary</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  ${result.totalInterestPaid.toFixed(0)}
                </div>
                <p className="text-sm text-gray-600 mt-1">Total Interest Paid</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${result.closingCosts.toFixed(0)}
                </div>
                <p className="text-sm text-gray-600 mt-1">Estimated Closing Costs</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  ${result.totalOfAllPayments.toFixed(0)}
                </div>
                <p className="text-sm text-gray-600 mt-1">Total of All Payments</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prompt when no calculation */}
      {!result && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <div className="text-4xl mb-4">🏠</div>
          <div className="text-xl font-semibold text-gray-900 mb-2">Calculate Your FHA Loan Options</div>
          <p className="text-gray-600 max-w-md mx-auto">
            Enter your home and financial details above to see if you qualify for an FHA loan and compare costs
          </p>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="FHA Loan Calculator"
      />
    </div>
  );
}