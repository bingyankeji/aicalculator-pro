'use client';

import { useState } from 'react';
import { AmortizationSchedule } from './AmortizationSchedule';
import { ExtraPaymentComparison } from './ExtraPaymentComparison';
import { BiweeklyPaymentComparison } from './BiweeklyPaymentComparison';

interface MortgageInputs {
  homePrice: number;
  downPayment: number;
  downPaymentType: 'dollar' | 'percent';
  interestRate: number;
  loanTerm: number;
  startMonth: number;
  startYear: number;
  propertyTax: number;
  pmiRate: number;
  homeInsurance: number;
  hoaFees: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda';
  purpose: 'purchase' | 'refinance';
}

interface MortgageResult {
  monthlyPayment: number;
  principalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  loanAmount: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  totalInterest: number;
  totalCost: number;
  payoffDate: string;
  totalTaxPaid: number;
  totalInsurancePaid: number;
  totalPMIPaid: number;
  annualPayment: number;
  totalOfPayments: number;
}

export function MortgageCalculatorBasic() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  const [inputs, setInputs] = useState<MortgageInputs>({
    homePrice: 400000,
    downPayment: 80000,
    downPaymentType: 'dollar',
    interestRate: 5.98,
    loanTerm: 30,
    startMonth: currentMonth,
    startYear: currentYear,
    propertyTax: 3000,
    pmiRate: 0.5,
    homeInsurance: 1500,
    hoaFees: 0,
    loanType: 'conventional',
    purpose: 'purchase',
  });

  // Smart Analysis Inputs (Optional)
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisInputs, setAnalysisInputs] = useState({
    annualIncome: 75000,
    monthlyDebts: 500,
    monthlyExpenses: 2000,
    currentSavings: 20000,
  });

  // Extra Payments
  const [extraPayments, setExtraPayments] = useState({
    monthlyExtra: 0,
    yearlyExtra: 0,
    oneTimeAmount: 0,
    oneTimeMonth: 12,
  });

  // Calculate down payment based on type
  const getDownPaymentAmount = (): number => {
    if (inputs.downPaymentType === 'dollar') {
      return inputs.downPayment;
    } else {
      return (inputs.homePrice * inputs.downPayment) / 100;
    }
  };

  const getDownPaymentPercent = (): number => {
    if (inputs.downPaymentType === 'percent') {
      return inputs.downPayment;
    } else {
      return (inputs.downPayment / inputs.homePrice) * 100;
    }
  };

  // Calculate mortgage results
  const calculateMortgage = (): MortgageResult => {
    const downPaymentAmount = getDownPaymentAmount();
    const downPaymentPercent = getDownPaymentPercent();
    const loanAmount = inputs.homePrice - downPaymentAmount;
    const monthlyRate = inputs.interestRate / 100 / 12;
    const numberOfPayments = inputs.loanTerm * 12;

    // Principal and Interest (P&I)
    const principalAndInterest =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // PMI (if down payment < 20% and not VA loan)
    const monthlyPMI =
      downPaymentPercent < 20 && inputs.loanType !== 'va'
        ? (loanAmount * (inputs.pmiRate / 100)) / 12
        : 0;

    // Monthly costs
    const monthlyPropertyTax = inputs.propertyTax / 12;
    const monthlyHomeInsurance = inputs.homeInsurance / 12;

    // Total monthly payment
    const monthlyPayment =
      principalAndInterest +
      monthlyPropertyTax +
      monthlyHomeInsurance +
      monthlyPMI +
      inputs.hoaFees;

    // Total interest over life of loan
    const totalInterest = principalAndInterest * numberOfPayments - loanAmount;

    // Calculate payoff date
    const payoffDate = new Date(inputs.startYear, inputs.startMonth + numberOfPayments);
    const payoffDateString = payoffDate.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });

    // Total costs
    const totalTaxPaid = inputs.propertyTax * inputs.loanTerm;
    const totalInsurancePaid = inputs.homeInsurance * inputs.loanTerm;
    const totalPMIPaid = monthlyPMI * numberOfPayments;
    const annualPayment = monthlyPayment * 12;
    const totalOfPayments = monthlyPayment * numberOfPayments;

    // Total cost (home price + all costs)
    const totalCost =
      inputs.homePrice +
      totalInterest +
      totalTaxPaid +
      totalInsurancePaid +
      totalPMIPaid +
      inputs.hoaFees * numberOfPayments;

    return {
      monthlyPayment,
      principalAndInterest,
      monthlyPropertyTax,
      monthlyHomeInsurance,
      monthlyPMI,
      monthlyHOA: inputs.hoaFees,
      loanAmount,
      downPaymentAmount,
      downPaymentPercent,
      totalInterest,
      totalCost,
      payoffDate: payoffDateString,
      totalTaxPaid,
      totalInsurancePaid,
      totalPMIPaid,
      annualPayment,
      totalOfPayments,
    };
  };

  const result = calculateMortgage();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCurrencyDecimals = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Generate URL for sharing with parameters
  const getShareURL = () => {
    const params = new URLSearchParams({
      homePrice: inputs.homePrice.toString(),
      downPayment: inputs.downPayment.toString(),
      downPaymentType: inputs.downPaymentType,
      interestRate: inputs.interestRate.toString(),
      loanTerm: inputs.loanTerm.toString(),
      propertyTax: inputs.propertyTax.toString(),
      pmiRate: inputs.pmiRate.toString(),
      homeInsurance: inputs.homeInsurance.toString(),
      hoaFees: inputs.hoaFees.toString(),
      loanType: inputs.loanType,
      purpose: inputs.purpose,
    });
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  };

  const handleShare = async () => {
    const url = getShareURL();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mortgage Calculation Results',
          text: `Monthly Payment: ${formatCurrencyDecimals(result.monthlyPayment)}`,
          url: url,
        });
      } catch (err) {
        // Fallback to copy
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate affordability analysis
  const calculateAffordability = () => {
    const monthlyIncome = analysisInputs.annualIncome / 12;
    const frontEndRatio = (result.monthlyPayment / monthlyIncome) * 100;
    const backEndRatio = ((result.monthlyPayment + analysisInputs.monthlyDebts) / monthlyIncome) * 100;

    // Max affordable based on 28% rule
    const maxAffordablePayment = monthlyIncome * 0.28;
    const monthlyRate = inputs.interestRate / 100 / 12;
    const numberOfPayments = inputs.loanTerm * 12;
    const maxLoanAmount =
      maxAffordablePayment /
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1));
    const maxAffordablePrice = maxLoanAmount / 0.8;

    let affordabilityGrade: 'A' | 'B' | 'C' | 'D' | 'F';
    let affordabilityLevel: string;
    let isAffordable: boolean;

    if (frontEndRatio <= 25 && backEndRatio <= 33) {
      affordabilityGrade = 'A';
      affordabilityLevel = 'Comfortable';
      isAffordable = true;
    } else if (frontEndRatio <= 28 && backEndRatio <= 36) {
      affordabilityGrade = 'B';
      affordabilityLevel = 'Manageable';
      isAffordable = true;
    } else if (frontEndRatio <= 32 && backEndRatio <= 40) {
      affordabilityGrade = 'C';
      affordabilityLevel = 'Tight';
      isAffordable = true;
    } else if (frontEndRatio <= 36 && backEndRatio <= 43) {
      affordabilityGrade = 'D';
      affordabilityLevel = 'Risky';
      isAffordable = false;
    } else {
      affordabilityGrade = 'F';
      affordabilityLevel = 'Unaffordable';
      isAffordable = false;
    }

    return {
      maxAffordablePrice,
      frontEndRatio,
      backEndRatio,
      affordabilityGrade,
      affordabilityLevel,
      isAffordable,
    };
  };

  // Calculate risk assessment
  const calculateRiskAssessment = () => {
    const downPaymentPercent = result.downPaymentPercent;
    const monthlyIncome = analysisInputs.annualIncome / 12;
    const backEndRatio = ((result.monthlyPayment + analysisInputs.monthlyDebts) / monthlyIncome) * 100;
    const priceToIncomeRatio = inputs.homePrice / analysisInputs.annualIncome;
    const monthsOfSavings = analysisInputs.currentSavings / result.monthlyPayment;

    let downPaymentRisk = 0;
    let downPaymentDesc = '';
    if (downPaymentPercent < 10) {
      downPaymentRisk = 25;
      downPaymentDesc = 'Very low down payment increases foreclosure risk';
    } else if (downPaymentPercent < 15) {
      downPaymentRisk = 18;
      downPaymentDesc = 'Low down payment requires PMI';
    } else if (downPaymentPercent < 20) {
      downPaymentRisk = 10;
      downPaymentDesc = 'Good, but PMI still required';
    } else {
      downPaymentRisk = 0;
      downPaymentDesc = 'Excellent down payment, no PMI needed';
    }

    let dtiRisk = 0;
    let dtiDesc = '';
    if (backEndRatio > 43) {
      dtiRisk = 30;
      dtiDesc = 'Debt burden is too high, may struggle with payments';
    } else if (backEndRatio > 36) {
      dtiRisk = 20;
      dtiDesc = 'High debt-to-income ratio, limited financial flexibility';
    } else if (backEndRatio > 28) {
      dtiRisk = 10;
      dtiDesc = 'Moderate DTI, manageable but tight';
    } else {
      dtiRisk = 0;
      dtiDesc = 'Healthy DTI ratio, plenty of financial cushion';
    }

    let savingsRisk = 0;
    let savingsDesc = '';
    if (monthsOfSavings < 2) {
      savingsRisk = 20;
      savingsDesc = 'Insufficient emergency fund for unexpected costs';
    } else if (monthsOfSavings < 4) {
      savingsRisk = 12;
      savingsDesc = 'Limited emergency fund, need more buffer';
    } else if (monthsOfSavings < 6) {
      savingsRisk = 5;
      savingsDesc = 'Adequate savings, but more is recommended';
    } else {
      savingsRisk = 0;
      savingsDesc = 'Excellent emergency fund, well-prepared';
    }

    let priceToIncomeRisk = 0;
    let priceToIncomeDesc = '';
    if (priceToIncomeRatio > 5) {
      priceToIncomeRisk = 25;
      priceToIncomeDesc = 'Home price is too high relative to income';
    } else if (priceToIncomeRatio > 4) {
      priceToIncomeRisk = 15;
      priceToIncomeDesc = 'Home price is high, may strain finances';
    } else if (priceToIncomeRatio > 3) {
      priceToIncomeRisk = 8;
      priceToIncomeDesc = 'Home price is reasonable but on the higher end';
    } else {
      priceToIncomeRisk = 0;
      priceToIncomeDesc = 'Home price is well within your means';
    }

    const totalRiskScore = downPaymentRisk + dtiRisk + savingsRisk + priceToIncomeRisk;

    let riskLevel: string;
    if (totalRiskScore <= 20) riskLevel = 'Low';
    else if (totalRiskScore <= 40) riskLevel = 'Moderate';
    else if (totalRiskScore <= 60) riskLevel = 'High';
    else riskLevel = 'Very High';

    return {
      totalRiskScore,
      riskLevel,
      riskFactors: {
        downPaymentRisk: { score: downPaymentRisk, description: downPaymentDesc },
        dtiRisk: { score: dtiRisk, description: dtiDesc },
        savingsRisk: { score: savingsRisk, description: savingsDesc },
        priceToIncomeRisk: { score: priceToIncomeRisk, description: priceToIncomeDesc },
      },
    };
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mb-6 print:hidden">
        <button
          onClick={handleShare}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center gap-2"
        >
          <span>🔗</span>
          Share
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center gap-2"
        >
          <span>🖨️</span>
          Print
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form - Left Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24 print:static print:break-inside-avoid">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Loan Details</h2>
              <span className="text-2xl" title="Mortgage Calculator">🏠</span>
            </div>

            <div className="space-y-4">
              {/* Home Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Value
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.homePrice}
                    onChange={(e) => setInputs({ ...inputs, homePrice: Number(e.target.value) })}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment ({formatPercent(result.downPaymentPercent)})
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    {inputs.downPaymentType === 'dollar' && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    )}
                    {inputs.downPaymentType === 'percent' && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    )}
                    <input
                      type="number"
                      value={inputs.downPayment}
                      onChange={(e) => setInputs({ ...inputs, downPayment: Number(e.target.value) })}
                      className={`w-full ${inputs.downPaymentType === 'dollar' ? 'pl-8' : 'pr-8'} px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        const currentAmount = getDownPaymentAmount();
                        setInputs({
                          ...inputs,
                          downPayment: currentAmount,
                          downPaymentType: 'dollar',
                        });
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        inputs.downPaymentType === 'dollar'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      $
                    </button>
                    <button
                      onClick={() => {
                        const currentPercent = getDownPaymentPercent();
                        setInputs({
                          ...inputs,
                          downPayment: currentPercent,
                          downPaymentType: 'percent',
                        });
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        inputs.downPaymentType === 'percent'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      %
                    </button>
                  </div>
                </div>
              </div>

              {/* Loan Amount (calculated) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount
                </label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-semibold">
                  {formatCurrency(result.loanAmount)}
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={inputs.interestRate}
                    onChange={(e) => setInputs({ ...inputs, interestRate: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term
                </label>
                <select
                  value={inputs.loanTerm}
                  onChange={(e) => setInputs({ ...inputs, loanTerm: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={10}>10 years</option>
                  <option value={15}>15 years</option>
                  <option value={20}>20 years</option>
                  <option value={25}>25 years</option>
                  <option value={30}>30 years</option>
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={inputs.startMonth}
                    onChange={(e) => setInputs({ ...inputs, startMonth: Number(e.target.value) })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {months.map((month, index) => (
                      <option key={index} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={inputs.startYear}
                    onChange={(e) => setInputs({ ...inputs, startYear: Number(e.target.value) })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Property Tax */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Tax (Annual)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.propertyTax}
                    onChange={(e) => setInputs({ ...inputs, propertyTax: Number(e.target.value) })}
                    className="w-full pl-8 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">/yr</span>
                </div>
              </div>

              {/* PMI */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PMI (if &lt;20% down)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.pmiRate}
                    onChange={(e) => setInputs({ ...inputs, pmiRate: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              {/* Home Insurance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Insurance (Annual)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.homeInsurance}
                    onChange={(e) => setInputs({ ...inputs, homeInsurance: Number(e.target.value) })}
                    className="w-full pl-8 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">/yr</span>
                </div>
              </div>

              {/* HOA Fees */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly HOA Fees
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.hoaFees}
                    onChange={(e) => setInputs({ ...inputs, hoaFees: Number(e.target.value) })}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Loan Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Type
                </label>
                <select
                  value={inputs.loanType}
                  onChange={(e) => setInputs({ ...inputs, loanType: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="conventional">Conventional</option>
                  <option value="fha">FHA</option>
                  <option value="va">VA</option>
                  <option value="usda">USDA</option>
                </select>
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose
                </label>
                <select
                  value={inputs.purpose}
                  onChange={(e) => setInputs({ ...inputs, purpose: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="purchase">Purchase</option>
                  <option value="refinance">Refinance</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results - Right 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Monthly Payment Card */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-xl p-8 text-white print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-4">Mortgage Repayment Summary</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div className="text-sm opacity-90 mb-1">Total Monthly Payment</div>
                <div className="text-4xl font-bold">
                  {formatCurrencyDecimals(result.monthlyPayment)}
                </div>
              </div>
              <div>
                <div className="text-sm opacity-90 mb-1">PMI</div>
                <div className="text-2xl font-semibold">
                  {result.monthlyPMI > 0 ? formatCurrencyDecimals(result.monthlyPMI) : 'not required'}
                </div>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm border-t border-white/20 pt-4">
              <div>
                <div className="opacity-75">Principal & Interest</div>
                <div className="font-semibold">{formatCurrencyDecimals(result.principalAndInterest)}</div>
              </div>
              <div>
                <div className="opacity-75">Property Tax</div>
                <div className="font-semibold">{formatCurrencyDecimals(result.monthlyPropertyTax)}</div>
              </div>
              <div>
                <div className="opacity-75">Home Insurance</div>
                <div className="font-semibold">{formatCurrencyDecimals(result.monthlyHomeInsurance)}</div>
              </div>
              {result.monthlyPMI > 0 && (
                <div>
                  <div className="opacity-75">PMI</div>
                  <div className="font-semibold">{formatCurrencyDecimals(result.monthlyPMI)}</div>
                </div>
              )}
              {result.monthlyHOA > 0 && (
                <div>
                  <div className="opacity-75">HOA Fees</div>
                  <div className="font-semibold">{formatCurrencyDecimals(result.monthlyHOA)}</div>
                </div>
              )}
            </div>
          </div>

          {/* Key Numbers - 2x4 Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:break-inside-avoid">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <div className="text-xs text-gray-600 mb-1">Down Payment Amount</div>
              <div className="text-lg font-bold text-gray-900">{formatCurrency(result.downPaymentAmount)}</div>
            </div>
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <div className="text-xs text-gray-600 mb-1">Down Payment %</div>
              <div className="text-lg font-bold text-gray-900">{formatPercent(result.downPaymentPercent)}</div>
            </div>
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <div className="text-xs text-gray-600 mb-1">Loan Pay-off Date</div>
              <div className="text-lg font-bold text-gray-900">{result.payoffDate}</div>
            </div>
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <div className="text-xs text-gray-600 mb-1">Total Interest Paid</div>
              <div className="text-lg font-bold text-gray-900">{formatCurrency(result.totalInterest)}</div>
            </div>
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <div className="text-xs text-gray-600 mb-1">Monthly Tax Paid</div>
              <div className="text-lg font-bold text-gray-900">{formatCurrencyDecimals(result.monthlyPropertyTax)}</div>
            </div>
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <div className="text-xs text-gray-600 mb-1">Total Tax Paid</div>
              <div className="text-lg font-bold text-gray-900">{formatCurrency(result.totalTaxPaid)}</div>
            </div>
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <div className="text-xs text-gray-600 mb-1">Monthly Home Insurance</div>
              <div className="text-lg font-bold text-gray-900">{formatCurrencyDecimals(result.monthlyHomeInsurance)}</div>
            </div>
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <div className="text-xs text-gray-600 mb-1">Total Home Insurance</div>
              <div className="text-lg font-bold text-gray-900">{formatCurrency(result.totalInsurancePaid)}</div>
            </div>
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <div className="text-xs text-gray-600 mb-1">Annual Payment Amount</div>
              <div className="text-lg font-bold text-gray-900">{formatCurrency(result.annualPayment)}</div>
            </div>
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <div className="text-xs text-gray-600 mb-1">Total of {inputs.loanTerm * 12} Payments</div>
              <div className="text-lg font-bold text-gray-900">{formatCurrency(result.totalOfPayments)}</div>
            </div>
          </div>

          {/* Smart Analysis Section */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-blue-300 overflow-hidden print:break-inside-avoid">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 cursor-pointer hover:from-purple-700 hover:to-blue-700 transition-all"
              onClick={() => setShowAnalysis(!showAnalysis)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🤖</span>
                  <div>
                    <h3 className="text-xl font-bold">AI Affordability Analysis</h3>
                    <p className="text-sm text-white/90">Can you afford this home? Get AI-powered insights</p>
                  </div>
                </div>
                <button className="text-2xl transform transition-transform print:hidden" style={{ transform: showAnalysis ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▼
                </button>
              </div>
            </div>

            {showAnalysis && (
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Analysis Input Form */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Your Financial Information</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Annual Gross Income
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          value={analysisInputs.annualIncome}
                          onChange={(e) => setAnalysisInputs({ ...analysisInputs, annualIncome: Number(e.target.value) })}
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Debt Payments
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          value={analysisInputs.monthlyDebts}
                          onChange={(e) => setAnalysisInputs({ ...analysisInputs, monthlyDebts: Number(e.target.value) })}
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Car, student loans, credit cards, etc.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Living Expenses
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          value={analysisInputs.monthlyExpenses}
                          onChange={(e) => setAnalysisInputs({ ...analysisInputs, monthlyExpenses: Number(e.target.value) })}
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Food, utilities, transportation, etc.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Savings/Emergency Fund
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          value={analysisInputs.currentSavings}
                          onChange={(e) => setAnalysisInputs({ ...analysisInputs, currentSavings: Number(e.target.value) })}
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Analysis Results */}
                  <div className="space-y-4">
                    {(() => {
                      const affordability = calculateAffordability();
                      const riskAssessment = calculateRiskAssessment();

                      return (
                        <>
                          {/* Affordability Grade */}
                          <div className={`p-4 rounded-lg ${
                            affordability.isAffordable
                              ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                              : 'bg-gradient-to-br from-red-500 to-pink-500'
                          } text-white`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Affordability</span>
                              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold">
                                Grade: {affordability.affordabilityGrade}
                              </span>
                            </div>
                            <div className="text-2xl font-bold">{affordability.affordabilityLevel}</div>
                          </div>

                          {/* DTI Ratios */}
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-700">Front-End Ratio</span>
                                <span className="font-semibold">{formatPercent(affordability.frontEndRatio)}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    affordability.frontEndRatio <= 28 ? 'bg-green-500' :
                                    affordability.frontEndRatio <= 32 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${Math.min(affordability.frontEndRatio * 2, 100)}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5">Recommended: ≤ 28%</p>
                            </div>

                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-700">Back-End Ratio</span>
                                <span className="font-semibold">{formatPercent(affordability.backEndRatio)}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    affordability.backEndRatio <= 36 ? 'bg-green-500' :
                                    affordability.backEndRatio <= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${Math.min(affordability.backEndRatio * 1.5, 100)}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5">Recommended: ≤ 36%</p>
                            </div>
                          </div>

                          {/* Max Affordable */}
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="text-xs text-gray-600 mb-1">Max Affordable Price</div>
                            <div className="text-xl font-bold text-blue-900">{formatCurrency(affordability.maxAffordablePrice)}</div>
                          </div>

                          {/* Risk Score */}
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-700 font-medium">Risk Score</span>
                              <span className={`font-bold ${
                                riskAssessment.totalRiskScore <= 20 ? 'text-green-600' :
                                riskAssessment.totalRiskScore <= 40 ? 'text-yellow-600' :
                                riskAssessment.totalRiskScore <= 60 ? 'text-orange-600' : 'text-red-600'
                              }`}>
                                {riskAssessment.totalRiskScore}/100 - {riskAssessment.riskLevel}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  riskAssessment.totalRiskScore <= 20 ? 'bg-green-500' :
                                  riskAssessment.totalRiskScore <= 40 ? 'bg-yellow-500' :
                                  riskAssessment.totalRiskScore <= 60 ? 'bg-orange-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${riskAssessment.totalRiskScore}%` }}
                              ></div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Detailed Risk Factors & Recommendations */}
                <div className="grid md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
                  {/* Risk Factors */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Risk Breakdown</h4>
                    <div className="space-y-2">
                      {(() => {
                        const riskAssessment = calculateRiskAssessment();
                        return Object.entries(riskAssessment.riskFactors).map(([key, factor]) => (
                          <div key={key} className="p-2 bg-gray-50 rounded text-xs">
                            <div className="flex justify-between items-center mb-0.5">
                              <span className="font-medium text-gray-700">
                                {key === 'downPaymentRisk' ? 'Down Payment' :
                                 key === 'dtiRisk' ? 'DTI Ratio' :
                                 key === 'savingsRisk' ? 'Emergency Fund' :
                                 'Price-to-Income'}
                              </span>
                              <span className={`font-semibold ${
                                factor.score === 0 ? 'text-green-600' :
                                factor.score <= 10 ? 'text-yellow-600' :
                                factor.score <= 20 ? 'text-orange-600' : 'text-red-600'
                              }`}>
                                {factor.score === 0 ? '✓' : '⚠️'} {factor.score}
                              </span>
                            </div>
                            <p className="text-gray-600">{factor.description}</p>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">💡 Recommendations</h4>
                    <ul className="space-y-2 text-xs text-gray-700">
                      {(() => {
                        const affordability = calculateAffordability();
                        const recommendations = [];

                        if (affordability.frontEndRatio > 28) {
                          recommendations.push(
                            <li key="front" className="flex items-start gap-1.5">
                              <span className="text-orange-600">⚠️</span>
                              <span>Housing costs exceed 28%. Consider a home ≤ {formatCurrency(affordability.maxAffordablePrice)}</span>
                            </li>
                          );
                        }

                        if (affordability.backEndRatio > 36) {
                          recommendations.push(
                            <li key="back" className="flex items-start gap-1.5">
                              <span className="text-red-600">❌</span>
                              <span>Total debt is too high. Pay down debts before buying</span>
                            </li>
                          );
                        }

                        if (result.downPaymentPercent < 20) {
                          recommendations.push(
                            <li key="down" className="flex items-start gap-1.5">
                              <span className="text-blue-600">💰</span>
                              <span>Save {formatCurrency(inputs.homePrice * 0.2 - result.downPaymentAmount)} more for 20% down to eliminate PMI</span>
                            </li>
                          );
                        }

                        if (analysisInputs.currentSavings < result.monthlyPayment * 6) {
                          recommendations.push(
                            <li key="savings" className="flex items-start gap-1.5">
                              <span className="text-yellow-600">🏦</span>
                              <span>Build emergency fund to 6 months ({formatCurrency(result.monthlyPayment * 6)})</span>
                            </li>
                          );
                        }

                        if (affordability.isAffordable && affordability.affordabilityGrade === 'A') {
                          recommendations.push(
                            <li key="good" className="flex items-start gap-1.5">
                              <span className="text-green-600">✅</span>
                              <span>Excellent! This home is well within your budget</span>
                            </li>
                          );
                        }

                        return recommendations.length > 0 ? recommendations : (
                          <li className="flex items-start gap-1.5">
                            <span className="text-blue-600">ℹ️</span>
                            <span>Enter your financial information above to get personalized recommendations</span>
                          </li>
                        );
                      })()}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Extra Payment Calculator */}
          <div className="lg:col-span-3">
            <ExtraPaymentComparison
              loanAmount={result.loanAmount}
              interestRate={inputs.interestRate}
              loanTerm={inputs.loanTerm}
              monthlyPayment={result.principalAndInterest}
              extraPayments={extraPayments}
              onExtraPaymentsChange={setExtraPayments}
            />
          </div>

          {/* Biweekly Payment Comparison */}
          <div className="lg:col-span-3">
            <BiweeklyPaymentComparison
              loanAmount={result.loanAmount}
              interestRate={inputs.interestRate}
              loanTerm={inputs.loanTerm}
              monthlyPayment={result.principalAndInterest}
            />
          </div>

          {/* Amortization Schedule */}
          <div className="lg:col-span-3">
            <AmortizationSchedule
              loanAmount={result.loanAmount}
              interestRate={inputs.interestRate}
              loanTerm={inputs.loanTerm}
              monthlyPayment={result.principalAndInterest}
            />
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
          .print\\:static {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}

