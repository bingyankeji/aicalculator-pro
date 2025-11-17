'use client';

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Share2, Download, Printer } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface StudentLoanInputs {
  // Basic Info
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  gracePeriod: number;

  // Repayment Plan
  repaymentPlan: 'standard' | 'extended' | 'graduated' | 'income-driven' | 'pslf';

  // Income-Driven Plan Settings
  annualIncome: number;
  familySize: number;
  povertyGuideline: number;
  discretionaryIncomeRate: number;

  // Advanced Settings
  extraMonthlyPayment: number;
  interestSubsidy: boolean;
  loanType: 'subsidized' | 'unsubsidized' | 'plus' | 'refinance';

  // PSLF Settings
  publicServiceJob: boolean;
  qualifyingPayments: number;
  forgivenessApplications: number;
}

interface RepaymentPlan {
  name: string;
  description: string;
  monthlyPayment: number;
  totalInterest: number;
  totalPayments: number;
  payoffTime: number;
  forgivenessAmount: number;
  paymentsUntilForgiveness?: number;
}

interface CalculationResult {
  currentBalance: number;
  interestDuringSchool: number;
  totalLoanAmount: number;

  // Standard Plan
  standardPlan: RepaymentPlan;

  // Extended Plan
  extendedPlan: RepaymentPlan;

  // Graduated Plan
  graduatedPlan: RepaymentPlan;

  // Income-Driven Plan
  incomeDrivenPlan: RepaymentPlan;

  // PSLF Plan
  pslfPlan: RepaymentPlan;

  // Extra Payments Impact
  extraPaymentsImpact: {
    interestSaved: number;
    timeSaved: number;
    newPayoffTime: number;
  };

  // Comparison
  bestPlan: RepaymentPlan;
  monthlySavings: number;
  totalSavings: number;

  // Projections
  monthlyProjections: {
    month: number;
    balance: number;
    payment: number;
    interest: number;
    principal: number;
  }[];
}

export function StudentLoanCalculator() {
  const [inputs, setInputs] = useState<StudentLoanInputs>({
    loanAmount: 30000,
    interestRate: 4.99,
    loanTerm: 10,
    gracePeriod: 6,
    repaymentPlan: 'standard',
    annualIncome: 50000,
    familySize: 1,
    povertyGuideline: 14580,
    discretionaryIncomeRate: 0.10,
    extraMonthlyPayment: 0,
    interestSubsidy: false,
    loanType: 'unsubsidized',
    publicServiceJob: false,
    qualifyingPayments: 0,
    forgivenessApplications: 0,
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/student-loan-calculator',
    getShareParams: () => ({
      la: inputs.loanAmount,
      ir: inputs.interestRate,
      lt: inputs.loanTerm,
      rp: inputs.repaymentPlan,
      ai: inputs.annualIncome,
    }),
    getShareText: () =>
      result
        ? `Student Loan: $${inputs.loanAmount.toLocaleString()} at ${inputs.interestRate}% | Best: ${result.bestPlan.name} | Monthly: $${result.bestPlan.monthlyPayment.toFixed(0)}`
        : 'Calculate your student loan options!',
  });

  // Load data from URL parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const la = params.get('la'); // loan amount
    const ir = params.get('ir'); // interest rate
    const lt = params.get('lt'); // loan term
    const rp = params.get('rp'); // repayment plan
    const ai = params.get('ai'); // annual income

    if (la || ir || lt || rp || ai) {
      const newInputs: StudentLoanInputs = {
        ...inputs,
        loanAmount: la ? parseFloat(la) : inputs.loanAmount,
        interestRate: ir ? parseFloat(ir) : inputs.interestRate,
        loanTerm: lt ? parseInt(lt) : inputs.loanTerm,
        repaymentPlan: (rp as any) || inputs.repaymentPlan,
        annualIncome: ai ? parseFloat(ai) : inputs.annualIncome,
      };
      setInputs(newInputs);

      // Auto-calculate after a short delay
      setTimeout(() => {
        const calculatedResult = calculateStudentLoan(newInputs);
        setResult(calculatedResult);
      }, 100);
    }
  }, []);

  const calculateMonthlyPayment = (principal: number, annualRate: number, termMonths: number): number => {
    const monthlyRate = annualRate / 100 / 12;
    if (monthlyRate === 0) return principal / termMonths;

    return principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
           (Math.pow(1 + monthlyRate, termMonths) - 1);
  };

  const calculateInterestDuringSchool = (): number => {
    const yearsInSchool = 4; // Assuming 4 years
    const monthlyRate = inputs.interestRate / 100 / 12;

    if (inputs.loanType === 'subsidized' || inputs.interestSubsidy) {
      return 0; // No interest accrues for subsidized loans
    }

    // Simple interest calculation for in-school period
    return inputs.loanAmount * inputs.interestRate / 100 * yearsInSchool;
  };

  const calculateStandardPlan = (principal: number): RepaymentPlan => {
    const termMonths = inputs.loanTerm * 12;
    const monthlyPayment = calculateMonthlyPayment(principal, inputs.interestRate, termMonths);
    const totalPayments = monthlyPayment * termMonths;
    const totalInterest = totalPayments - principal;

    return {
      name: 'Standard Repayment',
      description: 'Fixed monthly payments for 10 years',
      monthlyPayment,
      totalInterest,
      totalPayments,
      payoffTime: inputs.loanTerm,
      forgivenessAmount: 0,
    };
  };

  const calculateExtendedPlan = (principal: number): RepaymentPlan => {
    const termMonths = 25 * 12; // Extended to 25 years
    const monthlyPayment = calculateMonthlyPayment(principal, inputs.interestRate, termMonths);
    const totalPayments = monthlyPayment * termMonths;
    const totalInterest = totalPayments - principal;

    return {
      name: 'Extended Repayment',
      description: 'Fixed monthly payments for up to 25 years',
      monthlyPayment,
      totalInterest,
      totalPayments,
      payoffTime: 25,
      forgivenessAmount: 0,
    };
  };

  const calculateGraduatedPlan = (principal: number): RepaymentPlan => {
    // Graduated payments start low and increase every 2 years
    const termMonths = inputs.loanTerm * 12;
    const monthlyRate = inputs.interestRate / 100 / 12;

    let balance = principal;
    let totalInterest = 0;
    let totalPayments = 0;

    // Calculate average payment for the plan
    const standardPayment = calculateMonthlyPayment(principal, inputs.interestRate, termMonths);
    const initialPayment = standardPayment * 0.5; // Start at 50% of standard
    const finalPayment = standardPayment * 1.5;   // End at 150% of standard

    // Average graduated payment
    const avgPayment = (initialPayment + finalPayment) / 2;

    // Recalculate with average payment
    const adjustedTerm = Math.ceil(Math.log(1 + (balance * monthlyRate) / avgPayment) / Math.log(1 + monthlyRate));
    const actualTotalPayments = avgPayment * adjustedTerm;
    const actualTotalInterest = Math.max(0, actualTotalPayments - principal);

    return {
      name: 'Graduated Repayment',
      description: 'Payments start low and increase every 2 years',
      monthlyPayment: avgPayment,
      totalInterest: actualTotalInterest,
      totalPayments: actualTotalPayments,
      payoffTime: Math.ceil(adjustedTerm / 12),
      forgivenessAmount: 0,
    };
  };

  const calculateIncomeDrivenPlan = (principal: number): RepaymentPlan => {
    // Calculate discretionary income
    const discretionaryIncome = Math.max(0, inputs.annualIncome - (inputs.povertyGuideline * inputs.familySize * 1.5));
    const monthlyDiscretionary = discretionaryIncome / 12;

    // Income-driven payment (10-20% of discretionary income)
    const monthlyPayment = monthlyDiscretionary * inputs.discretionaryIncomeRate;

    // Calculate forgiveness after 20-25 years
    const forgivenessYears = inputs.repaymentPlan === 'income-driven' ? 20 : 25;
    const forgivenessMonths = forgivenessYears * 12;

    // Calculate total payments and interest
    const maxPayments = monthlyPayment * forgivenessMonths;
    let balance = principal;
    let totalInterest = 0;
    let monthsPaid = 0;

    const monthlyRate = inputs.interestRate / 100 / 12;

    while (balance > 0 && monthsPaid < forgivenessMonths) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = Math.min(monthlyPayment - interestPayment, balance);

      totalInterest += interestPayment;
      balance -= principalPayment;
      monthsPaid++;
    }

    const forgivenessAmount = Math.max(0, balance);
    const totalPayments = monthlyPayment * monthsPaid + (forgivenessAmount > 0 ? 0 : balance);

    return {
      name: 'Income-Driven Repayment',
      description: `Payments based on ${inputs.discretionaryIncomeRate * 100}% of discretionary income`,
      monthlyPayment,
      totalInterest,
      totalPayments,
      payoffTime: forgivenessYears,
      forgivenessAmount,
      paymentsUntilForgiveness: monthsPaid,
    };
  };

  const calculatePSLFPlan = (principal: number): RepaymentPlan => {
    // PSLF forgives remaining balance after 120 qualifying payments (10 years)
    const forgivenessMonths = 120;
    const monthlyRate = inputs.interestRate / 100 / 12;

    // Use income-driven payment calculation
    const discretionaryIncome = Math.max(0, inputs.annualIncome - (inputs.povertyGuideline * inputs.familySize * 1.5));
    const monthlyPayment = Math.min(
      (discretionaryIncome / 12) * inputs.discretionaryIncomeRate,
      calculateMonthlyPayment(principal, inputs.interestRate, 10 * 12)
    );

    let balance = principal;
    let totalInterest = 0;
    let monthsPaid = 0;

    while (balance > 0 && monthsPaid < forgivenessMonths) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = Math.min(monthlyPayment - interestPayment, balance);

      totalInterest += interestPayment;
      balance -= principalPayment;
      monthsPaid++;

      if (balance <= 0) break;
    }

    const forgivenessAmount = Math.max(0, balance);
    const totalPayments = (monthlyPayment * monthsPaid) + (balance > 0 ? 0 : balance);

    return {
      name: 'PSLF (Public Service Loan Forgiveness)',
      description: 'Forgiveness after 120 qualifying payments (10 years)',
      monthlyPayment,
      totalInterest,
      totalPayments,
      payoffTime: 10,
      forgivenessAmount,
      paymentsUntilForgiveness: 120,
    };
  };

  const calculateExtraPaymentsImpact = (principal: number) => {
    if (inputs.extraMonthlyPayment <= 0) {
      return {
        interestSaved: 0,
        timeSaved: 0,
        newPayoffTime: inputs.loanTerm,
      };
    }

    const baseMonthlyPayment = calculateMonthlyPayment(principal, inputs.interestRate, inputs.loanTerm * 12);
    const enhancedMonthlyPayment = baseMonthlyPayment + inputs.extraMonthlyPayment;

    // Calculate time to payoff with extra payments
    const monthlyRate = inputs.interestRate / 100 / 12;
    const monthsToPayoff = Math.ceil(
      Math.log(1 + (principal * monthlyRate) / enhancedMonthlyPayment) /
      Math.log(1 + monthlyRate)
    );

    const baseTotalInterest = (baseMonthlyPayment * inputs.loanTerm * 12) - principal;
    const newTotalInterest = (enhancedMonthlyPayment * monthsToPayoff) - principal;
    const interestSaved = Math.max(0, baseTotalInterest - newTotalInterest);

    return {
      interestSaved,
      timeSaved: inputs.loanTerm - Math.ceil(monthsToPayoff / 12),
      newPayoffTime: Math.ceil(monthsToPayoff / 12),
    };
  };

  const calculateStudentLoan = (inputData: StudentLoanInputs): CalculationResult => {
    const interestDuringSchool = calculateInterestDuringSchool();
    const totalLoanAmount = inputs.loanAmount + interestDuringSchool;
    const currentBalance = totalLoanAmount - (inputs.qualifyingPayments * 100); // Simplified

    // Calculate all repayment plans
    const standardPlan = calculateStandardPlan(totalLoanAmount);
    const extendedPlan = calculateExtendedPlan(totalLoanAmount);
    const graduatedPlan = calculateGraduatedPlan(totalLoanAmount);
    const incomeDrivenPlan = calculateIncomeDrivenPlan(totalLoanAmount);
    const pslfPlan = inputs.publicServiceJob ? calculatePSLFPlan(totalLoanAmount) : incomeDrivenPlan;

    // Determine best plan based on total cost
    const allPlans = [standardPlan, extendedPlan, graduatedPlan, incomeDrivenPlan, pslfPlan];
    const bestPlan = allPlans.reduce((best, current) =>
      current.totalPayments < best.totalPayments ? current : best
    );

    // Calculate savings
    const monthlySavings = standardPlan.monthlyPayment - bestPlan.monthlyPayment;
    const totalSavings = standardPlan.totalPayments - bestPlan.totalPayments;

    // Extra payments impact
    const extraPaymentsImpact = calculateExtraPaymentsImpact(totalLoanAmount);

    // Generate monthly projections for the first 5 years
    const monthlyProjections = [];
    let projectionBalance = totalLoanAmount;
    const monthlyRate = inputs.interestRate / 100 / 12;

    for (let month = 1; month <= 60; month++) {
      const interestPayment = projectionBalance * monthlyRate;
      const principalPayment = Math.min(bestPlan.monthlyPayment - interestPayment, projectionBalance);

      monthlyProjections.push({
        month,
        balance: Math.max(0, projectionBalance - principalPayment),
        payment: bestPlan.monthlyPayment,
        interest: interestPayment,
        principal: principalPayment,
      });

      projectionBalance -= principalPayment;
      if (projectionBalance <= 0) break;
    }

    return {
      currentBalance,
      interestDuringSchool,
      totalLoanAmount,
      standardPlan,
      extendedPlan,
      graduatedPlan,
      incomeDrivenPlan,
      pslfPlan,
      extraPaymentsImpact,
      bestPlan,
      monthlySavings,
      totalSavings,
      monthlyProjections,
    };
  };

  const handleCalculate = async () => {
    if (inputs.loanAmount <= 0 || inputs.interestRate < 0 || inputs.loanTerm <= 0) {
      alert('Please enter valid loan amount, interest rate, and loan term.');
      return;
    }

    setIsCalculating(true);

    // Simulate calculation time for better UX
    await new Promise(resolve => setTimeout(resolve, 400));

    try {
      const result = calculateStudentLoan(inputs);
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
      link.download = `student-loan-analysis-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Student Loan Analysis Report</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="Student Loan Analysis Report" /></body>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6 hidden lg:block">Student Loan Calculator</h2>

        {/* Input Fields */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Loan Amount ($)
            </label>
            <input
              type="number"
              value={inputs.loanAmount}
              onChange={(e) => setInputs({ ...inputs, loanAmount: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 30000"
              min="0"
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
              placeholder="e.g., 4.99"
              min="0"
              max="20"
              step="0.01"
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
              <option value={10}>10 Years</option>
              <option value={15}>15 Years</option>
              <option value={20}>20 Years</option>
              <option value={25}>25 Years</option>
            </select>
          </div>

          {/* Loan Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Type
            </label>
            <select
              value={inputs.loanType}
              onChange={(e) => setInputs({ ...inputs, loanType: e.target.value as any })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="unsubsidized">Unsubsidized</option>
              <option value="subsidized">Subsidized</option>
              <option value="plus">PLUS Loan</option>
              <option value="refinance">Refinance</option>
            </select>
          </div>

          {/* Annual Income */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Income ($)
            </label>
            <input
              type="number"
              value={inputs.annualIncome}
              onChange={(e) => setInputs({ ...inputs, annualIncome: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 50000"
              min="0"
              step="1000"
            />
          </div>

          {/* Family Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Family Size
            </label>
            <input
              type="number"
              value={inputs.familySize}
              onChange={(e) => setInputs({ ...inputs, familySize: parseInt(e.target.value) || 1 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 1"
              min="1"
              max="10"
            />
          </div>

          {/* Extra Monthly Payment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extra Monthly Payment ($)
            </label>
            <input
              type="number"
              value={inputs.extraMonthlyPayment}
              onChange={(e) => setInputs({ ...inputs, extraMonthlyPayment: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 100"
              min="0"
              step="10"
            />
          </div>

          {/* Public Service Job */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Public Service Job (PSLF Eligible)
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setInputs({ ...inputs, publicServiceJob: true })}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  inputs.publicServiceJob
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setInputs({ ...inputs, publicServiceJob: false })}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  !inputs.publicServiceJob
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
          aria-label="Calculate Student Loan"
          aria-busy={isCalculating}
        >
          {isCalculating ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Calculating...
            </div>
          ) : (
            'Calculate Student Loan Options'
          )}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div id="student-loan-result" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Total Loan Amount</h3>
              <div className="text-3xl font-bold text-blue-600">
                ${result.totalLoanAmount.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Includes ${result.interestDuringSchool.toFixed(0)} interest during school
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Best Plan</h3>
              <div className="text-xl font-bold text-green-600">
                {result.bestPlan.name}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Monthly: ${result.bestPlan.monthlyPayment.toFixed(0)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Total Savings</h3>
              <div className="text-3xl font-bold text-purple-600">
                ${result.totalSavings.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                vs Standard repayment plan
              </p>
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

          {/* Repayment Plans Comparison */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Repayment Plan Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <th className="py-3 px-4 text-left rounded-tl-lg">Plan</th>
                    <th className="py-3 px-4 text-center">Monthly Payment</th>
                    <th className="py-3 px-4 text-center">Total Interest</th>
                    <th className="py-3 px-4 text-center">Total Payments</th>
                    <th className="py-3 px-4 text-center">Payoff Time</th>
                    <th className="py-3 px-4 text-center rounded-tr-lg">Forgiveness</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={result.bestPlan.name === result.standardPlan.name ? 'bg-green-50 border-2 border-green-500' : 'hover:bg-gray-50'}>
                    <td className="py-3 px-4 font-semibold">{result.standardPlan.name}</td>
                    <td className="py-3 px-4 text-center">${result.standardPlan.monthlyPayment.toFixed(0)}</td>
                    <td className="py-3 px-4 text-center">${result.standardPlan.totalInterest.toFixed(0)}</td>
                    <td className="py-3 px-4 text-center">${result.standardPlan.totalPayments.toFixed(0)}</td>
                    <td className="py-3 px-4 text-center">{result.standardPlan.payoffTime} years</td>
                    <td className="py-3 px-4 text-center">-</td>
                  </tr>
                  <tr className={result.bestPlan.name === result.extendedPlan.name ? 'bg-green-50 border-2 border-green-500' : 'hover:bg-gray-50'}>
                    <td className="py-3 px-4 font-semibold">{result.extendedPlan.name}</td>
                    <td className="py-3 px-4 text-center">${result.extendedPlan.monthlyPayment.toFixed(0)}</td>
                    <td className="py-3 px-4 text-center">${result.extendedPlan.totalInterest.toFixed(0)}</td>
                    <td className="py-3 px-4 text-center">${result.extendedPlan.totalPayments.toFixed(0)}</td>
                    <td className="py-3 px-4 text-center">{result.extendedPlan.payoffTime} years</td>
                    <td className="py-3 px-4 text-center">-</td>
                  </tr>
                  <tr className={result.bestPlan.name === result.graduatedPlan.name ? 'bg-green-50 border-2 border-green-500' : 'hover:bg-gray-50'}>
                    <td className="py-3 px-4 font-semibold">{result.graduatedPlan.name}</td>
                    <td className="py-3 px-4 text-center">${result.graduatedPlan.monthlyPayment.toFixed(0)}</td>
                    <td className="py-3 px-4 text-center">${result.graduatedPlan.totalInterest.toFixed(0)}</td>
                    <td className="py-3 px-4 text-center">${result.graduatedPlan.totalPayments.toFixed(0)}</td>
                    <td className="py-3 px-4 text-center">{result.graduatedPlan.payoffTime} years</td>
                    <td className="py-3 px-4 text-center">-</td>
                  </tr>
                  <tr className={result.bestPlan.name === result.incomeDrivenPlan.name ? 'bg-green-50 border-2 border-green-500' : 'hover:bg-gray-50'}>
                    <td className="py-3 px-4 font-semibold">{result.incomeDrivenPlan.name}</td>
                    <td className="py-3 px-4 text-center">${result.incomeDrivenPlan.monthlyPayment.toFixed(0)}</td>
                    <td className="py-3 px-4 text-center">${result.incomeDrivenPlan.totalInterest.toFixed(0)}</td>
                    <td className="py-3 px-4 text-center">${result.incomeDrivenPlan.totalPayments.toFixed(0)}</td>
                    <td className="py-3 px-4 text-center">{result.incomeDrivenPlan.payoffTime} years</td>
                    <td className="py-3 px-4 text-center text-green-600 font-bold">
                      ${result.incomeDrivenPlan.forgivenessAmount.toFixed(0)}
                    </td>
                  </tr>
                  {inputs.publicServiceJob && (
                    <tr className={result.bestPlan.name === result.pslfPlan.name ? 'bg-green-50 border-2 border-green-500' : 'hover:bg-gray-50'}>
                      <td className="py-3 px-4 font-semibold">{result.pslfPlan.name}</td>
                      <td className="py-3 px-4 text-center">${result.pslfPlan.monthlyPayment.toFixed(0)}</td>
                      <td className="py-3 px-4 text-center">${result.pslfPlan.totalInterest.toFixed(0)}</td>
                      <td className="py-3 px-4 text-center">${result.pslfPlan.totalPayments.toFixed(0)}</td>
                      <td className="py-3 px-4 text-center">{result.pslfPlan.payoffTime} years</td>
                      <td className="py-3 px-4 text-center text-green-600 font-bold">
                        ${result.pslfPlan.forgivenessAmount.toFixed(0)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Extra Payments Impact */}
          {inputs.extraMonthlyPayment > 0 && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Extra Payments Impact</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    ${result.extraPaymentsImpact.interestSaved.toFixed(0)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Interest Saved</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {result.extraPaymentsImpact.timeSaved} years
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Time Saved</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {result.extraPaymentsImpact.newPayoffTime} years
                  </div>
                  <p className="text-sm text-gray-600 mt-1">New Payoff Time</p>
                </div>
              </div>
            </div>
          )}

          {/* Monthly Projections Chart */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">5-Year Projection</h3>
            <div className="space-y-2">
              {result.monthlyProjections.slice(0, 12).map((projection, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">Month {projection.month}</div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>Payment: <span className="font-semibold">${projection.payment.toFixed(0)}</span></div>
                    <div>Balance: <span className="font-semibold">${projection.balance.toFixed(0)}</span></div>
                    <div>Interest: <span className="text-red-600">${projection.interest.toFixed(0)}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Prompt when no calculation */}
      {!result && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <div className="text-4xl mb-4">🎓</div>
          <div className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate Your Student Loan</div>
          <p className="text-gray-600 max-w-md mx-auto">
            Enter your loan details above to compare different repayment plans and find the best option for your situation
          </p>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Student Loan Calculator"
      />
    </div>
  );
}