"use client";

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Share2, Download, Printer, Shield, Home, Calculator, TrendingDown, DollarSign, Flag } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface VAMortgageInputs {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  annualIncome: number;
  monthlyDebts: number;
  propertyTaxRate: number;
  homeownersInsurance: number;
  hoaFee: number;
  militaryStatus: 'active' | 'reserve' | 'national-guard' | 'retired' | 'disabled-veteran' | 'surviving-spouse';
  serviceTime: string;
  disabilityRating: number;
  firstTimeUse: boolean;
  countyType: string;
}

interface VAMortgageResult {
  // VA Loan Details
  downPaymentAmount: number;
  downPaymentPercent: number;
  baseLoanAmount: number;
  vaFundingFee: number;
  totalLoanAmount: number;

  // Monthly Payments
  principalAndInterest: number;
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
  maxVALoanAmount: number;
  qualifiesForVA: boolean;

  // Benefits Comparison
  conventionalDownPayment: number;
  conventionalMonthlyPayment: number;
  monthlySavings: number;
  downPaymentSavings: number;
  totalSavings: number;

  // Entitlement Analysis
  remainingEntitlement: number;
  fullEntitlementAvailable: boolean;
}

export function VAMortgageCalculator() {
  const [inputs, setInputs] = useState<VAMortgageInputs>({
    homePrice: 350000,
    downPayment: 0,
    interestRate: 6.0,
    loanTerm: 30,
    annualIncome: 80000,
    monthlyDebts: 400,
    propertyTaxRate: 1.2,
    homeownersInsurance: 1200,
    hoaFee: 0,
    militaryStatus: 'active',
    serviceTime: '6+ years',
    disabilityRating: 0,
    firstTimeUse: true,
    countyType: 'standard',
  });

  const [result, setResult] = useState<VAMortgageResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/va-mortgage-calculator',
    getShareParams: () => ({
      hp: inputs.homePrice,
      dp: inputs.downPayment,
      ir: inputs.interestRate,
      ai: inputs.annualIncome,
      md: inputs.monthlyDebts,
      ms: inputs.militaryStatus,
    }),
    getShareText: () =>
      result
        ? `VA Loan: $${inputs.homePrice.toLocaleString()} home | Monthly: $${result.totalMonthlyPayment.toFixed(0)} | ${(result.qualifiesForVA ? '✓ VA Qualified' : '✗ Check Requirements')}`
        : 'Calculate your VA loan benefits!',
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
    const ms = params.get('ms');

    if (hp || dp || ir || ai || md || ms) {
      const newInputs: VAMortgageInputs = {
        ...inputs,
        homePrice: hp ? parseFloat(hp) : inputs.homePrice,
        downPayment: dp ? parseFloat(dp) : inputs.downPayment,
        interestRate: ir ? parseFloat(ir) : inputs.interestRate,
        annualIncome: ai ? parseFloat(ai) : inputs.annualIncome,
        monthlyDebts: md ? parseFloat(md) : inputs.monthlyDebts,
        militaryStatus: (ms as any) || inputs.militaryStatus,
      };
      setInputs(newInputs);

      setTimeout(() => {
        const calculatedResult = calculateVAMortgage(newInputs);
        setResult(calculatedResult);
      }, 100);
    }
  }, []);

  const getVALoanLimits = (): { [type: string]: number } => {
    return {
      'standard': 766550,
      'high-cost': 1149250,
      'alaska-hawaii': 1150850,
    };
  };

  const getVAFundingFeeRate = (): number => {
    // VA funding fee rates for 2024
    if (inputs.disabilityRating >= 10) return 0; // Exempt for disabled veterans
    if (!inputs.firstTimeUse) {
      if (inputs.loanTerm <= 15) return 0.014; // 1.4% for subsequent use, 15-year
      return 0.035; // 3.5% for subsequent use, 30-year
    }
    if (inputs.loanTerm <= 15) return 0.0115; // 1.15% for first use, 15-year
    return 0.023; // 2.3% for first use, 30-year
  };

  const getVAFundingFeeForReserveNationalGuard = (): number => {
    if (inputs.disabilityRating >= 10) return 0;
    if (!inputs.firstTimeUse) {
      if (inputs.loanTerm <= 15) return 0.014; // 1.4% for subsequent use, 15-year
      return 0.035; // 3.5% for subsequent use, 30-year
    }
    if (inputs.loanTerm <= 15) return 0.015; // 1.5% for first use, 15-year
    return 0.025; // 2.5% for first use, 30-year
  };

  const calculateMonthlyPayment = (principal: number, annualRate: number, termYears: number): number => {
    const monthlyRate = annualRate / 100 / 12;
    const termMonths = termYears * 12;

    if (monthlyRate === 0) return principal / termMonths;

    return principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
           (Math.pow(1 + monthlyRate, termMonths) - 1);
  };

  const qualifiesForVALoan = (): boolean => {
    // Basic eligibility checks
    const isReserveOrNationalGuard = inputs.militaryStatus === 'reserve' || inputs.militaryStatus === 'national-guard';

    // Check service requirements
    let serviceRequirementMet = false;
    switch (inputs.militaryStatus) {
      case 'active':
      case 'retired':
      case 'disabled-veteran':
        serviceRequirementMet = true; // Simplified - would normally check specific service time
        break;
      case 'reserve':
      case 'national-guard':
        serviceRequirementMet = inputs.serviceTime === '6+ years' || inputs.serviceTime === '90+ days active';
        break;
      case 'surviving-spouse':
        serviceRequirementMet = true;
        break;
    }

    return serviceRequirementMet;
  };

  const calculateVAMortgage = (inputData: VAMortgageInputs): VAMortgageResult => {
    // Basic loan calculations
    const downPaymentAmount = (inputData.homePrice * inputData.downPayment) / 100;
    const baseLoanAmount = inputData.homePrice - downPaymentAmount;

    // VA Funding Fee calculation
    let fundingFeeRate;
    if (inputData.militaryStatus === 'reserve' || inputData.militaryStatus === 'national-guard') {
      fundingFeeRate = getVAFundingFeeForReserveNationalGuard() / 100;
    } else {
      fundingFeeRate = getVAFundingFeeRate() / 100;
    }

    const vaFundingFee = baseLoanAmount * fundingFeeRate;
    const totalLoanAmount = baseLoanAmount + vaFundingFee; // Funding fee can be financed

    // Monthly payment calculations
    const principalAndInterest = calculateMonthlyPayment(totalLoanAmount, inputData.interestRate, inputData.loanTerm);
    const propertyTaxMonthly = (inputData.homePrice * inputData.propertyTaxRate) / 100 / 12;
    const homeownersInsuranceMonthly = inputData.homeownersInsurance / 12;
    const hoaFeeMonthly = inputData.hoaFee;

    const totalMonthlyPayment = principalAndInterest + propertyTaxMonthly +
                                homeownersInsuranceMonthly + hoaFeeMonthly;

    // Closing costs (typically 2-5% of home price, but VA has limits on what buyer can pay)
    const closingCosts = (inputData.homePrice * 3) / 100; // Using 3% average
    const cashNeededAtClosing = downPaymentAmount + closingCosts; // Funding fee financed

    // Total costs over loan term
    const totalInterestPaid = (principalAndInterest * inputData.loanTerm * 12) - totalLoanAmount;
    const totalOfAllPayments = totalMonthlyPayment * inputData.loanTerm * 12;

    // Qualification analysis (VA ratios are more flexible)
    const monthlyIncome = inputData.annualIncome / 12;
    const frontEndRatio = (totalMonthlyPayment / monthlyIncome) * 100;
    const backEndRatio = ((totalMonthlyPayment + inputData.monthlyDebts) / monthlyIncome) * 100;

    // Check VA loan limits
    const loanLimits = getVALoanLimits();
    const maxVALoanAmount = loanLimits[inputData.countyType] || loanLimits['standard'];
    const qualifiesForVA = qualifiesForVALoan();

    // Compare with conventional loan (typically 20% down)
    const conventionalDownPayment = (inputData.homePrice * 20) / 100;
    const conventionalLoanAmount = inputData.homePrice - conventionalDownPayment;
    const conventionalPrincipalAndInterest = calculateMonthlyPayment(conventionalLoanAmount, inputData.interestRate, inputData.loanTerm);
    const conventionalPMI = conventionalLoanAmount > 0 ? (conventionalLoanAmount * 0.5) / 100 / 12 : 0; // PMI if < 20% down
    const conventionalTotalPayment = conventionalPrincipalAndInterest + conventionalPMI +
                                    propertyTaxMonthly + homeownersInsuranceMonthly + hoaFeeMonthly;

    const monthlySavings = conventionalTotalPayment - totalMonthlyPayment;
    const downPaymentSavings = conventionalDownPayment - downPaymentAmount;
    const totalSavings = monthlySavings * inputData.loanTerm * 12 + downPaymentSavings;

    // VA Entitlement analysis
    const baseEntitlement = 48000; // Basic entitlement 2024
    const bonusEntitlement = Math.max(0, maxVALoanAmount - (4 * baseEntitlement));
    const totalEntitlement = baseEntitlement + bonusEntitlement;
    const remainingEntitlement = Math.max(0, totalEntitlement - baseLoanAmount / 4);
    const fullEntitlementAvailable = baseLoanAmount <= maxVALoanAmount || remainingEntitlement >= baseEntitlement;

    return {
      downPaymentAmount,
      downPaymentPercent: inputData.downPayment,
      baseLoanAmount,
      vaFundingFee,
      totalLoanAmount,
      principalAndInterest,
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
      maxVALoanAmount,
      qualifiesForVA,
      conventionalDownPayment,
      conventionalMonthlyPayment: conventionalTotalPayment,
      monthlySavings,
      downPaymentSavings,
      totalSavings,
      remainingEntitlement,
      fullEntitlementAvailable,
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
      const result = calculateVAMortgage(inputs);
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
      link.download = `va-mortgage-analysis-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>VA Mortgage Analysis Report</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="VA Mortgage Analysis Report" /></body>
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
          <Flag className="h-8 w-8 text-red-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">VA Mortgage Calculator</h2>
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
              placeholder="e.g., 350000"
              min="50000"
              max="2000000"
              step="10000"
            />
          </div>

          {/* Down Payment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down Payment (VA loans can be $0 down)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={inputs.downPayment}
                onChange={(e) => setInputs({ ...inputs, downPayment: parseFloat(e.target.value) || 0 })}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 0"
                min="0"
                max="30"
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
              placeholder="e.g., 6.0"
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

          {/* Military Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Military Status
            </label>
            <select
              value={inputs.militaryStatus}
              onChange={(e) => setInputs({ ...inputs, militaryStatus: e.target.value as any })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Active Duty</option>
              <option value="reserve">Reserves</option>
              <option value="national-guard">National Guard</option>
              <option value="retired">Retired Veteran</option>
              <option value="disabled-veteran">Disabled Veteran</option>
              <option value="surviving-spouse">Surviving Spouse</option>
            </select>
          </div>

          {/* Service Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Time
            </label>
            <select
              value={inputs.serviceTime}
              onChange={(e) => setInputs({ ...inputs, serviceTime: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="90+ days active">90+ days active duty</option>
              <option value="6+ years">6+ years reserves/guard</option>
              <option value="less than 6 years">Less than 6 years reserves/guard</option>
              <option value="discharged">Discharged for service-connected disability</option>
            </select>
          </div>

          {/* Disability Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service-Connected Disability Rating (%)
            </label>
            <input
              type="number"
              value={inputs.disabilityRating}
              onChange={(e) => setInputs({ ...inputs, disabilityRating: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 0"
              min="0"
              max="100"
              step="10"
            />
            <p className="text-xs text-gray-500 mt-1">10%+ exempts VA funding fee</p>
          </div>

          {/* First Time Use */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Time Using VA Loan Benefit?
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setInputs({ ...inputs, firstTimeUse: true })}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  inputs.firstTimeUse
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setInputs({ ...inputs, firstTimeUse: false })}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  !inputs.firstTimeUse
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                No
              </button>
            </div>
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
              placeholder="e.g., 80000"
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
              placeholder="e.g., 400"
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

          {/* County Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              County Type (for loan limits)
            </label>
            <select
              value={inputs.countyType}
              onChange={(e) => setInputs({ ...inputs, countyType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="standard">Standard County ($766,550 limit)</option>
              <option value="high-cost">High-Cost Area ($1,149,250 limit)</option>
              <option value="alaska-hawaii">Alaska/Hawaii ($1,150,850 limit)</option>
            </select>
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
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="w-full py-3 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:shadow-none"
          aria-label="Calculate VA Mortgage"
          aria-busy={isCalculating}
        >
          {isCalculating ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Calculating...
            </div>
          ) : (
            'Calculate VA Mortgage Benefits'
          )}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div ref={resultRef} className="space-y-6">
          {/* Qualification Status */}
          <div className={`rounded-xl p-6 border-2 ${
            result.qualifiesForVA
              ? 'bg-green-50 border-green-500'
              : 'bg-yellow-50 border-yellow-500'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {result.qualifiesForVA ? (
                  <Shield className="h-8 w-8 text-green-600 mr-3" />
                ) : (
                  <Flag className="h-8 w-8 text-yellow-600 mr-3" />
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {result.qualifiesForVA ? '✓ You Qualify for VA Loan Benefits' : '⚠ Check VA Eligibility Requirements'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {result.qualifiesForVA
                      ? 'Your military service qualifies you for VA loan benefits'
                      : 'Please verify your eligibility with the VA or a VA-approved lender'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Monthly Payment</h3>
              </div>
              <div className="text-3xl font-bold text-red-600 break-all">
                ${result.totalMonthlyPayment.toFixed(0)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Down Payment</h3>
              <div className="text-3xl font-bold text-blue-600 break-all">
                ${result.downPaymentAmount.toFixed(0)}
              </div>
              <p className="text-sm text-gray-600 mt-1">{result.downPaymentPercent}%</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">VA Funding Fee</h3>
              <div className="text-3xl font-bold text-green-600 break-all">
                ${result.vaFundingFee.toFixed(0)}
              </div>
              <p className="text-sm text-gray-600 mt-1">Can be financed</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cash at Closing</h3>
              <div className="text-3xl font-bold text-purple-600 break-all">
                ${result.cashNeededAtClosing.toFixed(0)}
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

          {/* VA Benefits Summary */}
          <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-xl border-2 border-red-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Flag className="h-6 w-6 text-red-600 mr-2" />
              VA Loan Benefits Summary
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-red-600 mb-2">No Down Payment</h4>
                <p className="text-sm text-gray-700">Save ${result.downPaymentSavings.toLocaleString()} compared to conventional 20% down</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">No Private Mortgage Insurance</h4>
                <p className="text-sm text-gray-700">Save ${result.monthlySavings.toFixed(0)} per month on PMI</p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-600 mb-2">Competitive Interest Rates</h4>
                <p className="text-sm text-gray-700">VA loans typically offer lower rates than conventional loans</p>
              </div>
            </div>
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
              <div className="flex justify-between items-center text-green-600">
                <span>Private Mortgage Insurance (PMI)</span>
                <span className="font-bold">$0.00</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Monthly Payment</span>
                  <span className="text-2xl font-bold text-red-600">${result.totalMonthlyPayment.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* VA vs Conventional Comparison */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">VA vs Conventional Loan Comparison</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-red-600">VA Loan</h4>
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
                    <span>VA Funding Fee:</span>
                    <span className="font-semibold">${result.vaFundingFee.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PMI:</span>
                    <span className="font-semibold">None</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-600">Conventional Loan (20% down)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Down Payment:</span>
                    <span className="font-semibold">20% (${result.conventionalDownPayment.toFixed(0)})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Payment:</span>
                    <span className="font-semibold">${result.conventionalMonthlyPayment.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Funding Fee:</span>
                    <span className="font-semibold">None</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PMI (if < 20% down):</span>
                    <span className="font-semibold">Required</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  Total VA Loan Savings: ${result.totalSavings.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">
                  ${result.downPaymentSavings.toLocaleString()} down payment savings + ${(result.monthlySavings * inputs.loanTerm * 12).toLocaleString()} payment savings
                </p>
              </div>
            </div>
          </div>

          {/* Qualification Analysis */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Qualification Analysis</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Debt-to-Income Ratios</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Front-End Ratio</span>
                      <span className={`font-semibold ${
                        result.frontEndRatio <= 41 ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {result.frontEndRatio.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          result.frontEndRatio <= 41 ? 'bg-green-600' : 'bg-yellow-600'
                        }`}
                        style={{ width: `${Math.min(result.frontEndRatio, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">VA guideline: ~41%</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Back-End Ratio</span>
                      <span className={`font-semibold ${
                        result.backEndRatio <= 50 ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {result.backEndRatio.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          result.backEndRatio <= 50 ? 'bg-green-600' : 'bg-yellow-600'
                        }`}
                        style={{ width: `${Math.min(result.backEndRatio, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">VA guideline: ~50%</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">VA Entitlement Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Full Entitlement Available</span>
                    <span className={`font-semibold ${
                      result.fullEntitlementAvailable ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {result.fullEntitlementAvailable ? 'Yes' : 'Limited'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Max VA Loan Amount</span>
                    <span className="font-semibold">${result.maxVALoanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Loan Amount</span>
                    <span className={`font-semibold ${
                      result.totalLoanAmount <= result.maxVALoanAmount ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${result.totalLoanAmount.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Disability Rating</span>
                    <span className={`font-semibold ${
                      inputs.disabilityRating >= 10 ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {inputs.disabilityRating}% {inputs.disabilityRating >= 10 && '(Funding fee exempt)'}
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
          <div className="text-4xl mb-4">🇺🇸</div>
          <div className="text-xl font-semibold text-gray-900 mb-2">Calculate Your VA Mortgage Benefits</div>
          <p className="text-gray-600 max-w-md mx-auto">
            Enter your home and military service details to see your VA loan benefits and potential savings
          </p>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="VA Mortgage Calculator"
      />
    </div>
  );
}