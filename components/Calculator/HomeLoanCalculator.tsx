'use client';

import { useState, useRef, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Share2, Save, Printer, Home, Calculator, TrendingUp, AlertTriangle, CheckCircle, Percent, DollarSign } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

interface HomeLoanInputs {
  // Basic Info
  homePrice: number;
  downPayment: number;
  downPaymentType: 'dollar' | 'percent';
  loanAmount: number;
  interestRate: number;
  loanTerm: number;

  // Financial Info
  monthlyIncome: number;
  monthlyDebts: number;
  creditScore: number;
  employmentType: 'salaried' | 'self-employed' | 'freelance' | 'retired';
  employmentYears: number;

  // Property Info
  propertyType: 'single-family' | 'condo' | 'townhouse' | 'multi-family' | 'manufactured';
  propertyUse: 'primary' | 'secondary' | 'investment';
  location: string;

  // Loan Preferences
  loanType: 'conventional' | 'fha' | 'va' | 'usda';
  armType: 'fixed' | 'arm-3-1' | 'arm-5-1' | 'arm-7-1';
  includeTaxesInsurance: boolean;
  propertyTaxRate: number;
  homeInsuranceRate: number;
  pmiRate: number;
  hoaFees: number;
}

interface LoanProgram {
  name: string;
  minDownPayment: number;
  maxLoanAmount: number;
  minCreditScore: number;
  interestRateAdjustment: number;
  pmiRequirement: boolean;
  mortgageInsurance: number;
  eligibilityCriteria: string[];
  pros: string[];
  eligibilityScore?: number;
  adjustedRate?: number;
  cons: string[];
}

interface LoanAnalysis {
  recommendedProgram: LoanProgram;
  alternativePrograms: LoanProgram[];
  eligibilityScore: number;
  approvalProbability: number;
  monthlyPayment: number;
  totalInterest: number;
  dti: number;
  loanAmount: number;
  downPaymentPercent: number;
  pmi: number;
  totalMonthlyPayment: number;
  affordabilityScore: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  recommendations: string[];
  warnings: string[];
}

const LOAN_PROGRAMS: Record<string, LoanProgram> = {
  conventional: {
    name: 'Conventional Loan',
    minDownPayment: 3,
    maxLoanAmount: 726200,
    minCreditScore: 620,
    interestRateAdjustment: 0,
    pmiRequirement: true,
    mortgageInsurance: 0.5,
    eligibilityCriteria: ['Stable employment', 'Good credit history', 'Adequate income'],
    pros: ['No upfront funding fee', 'No mortgage insurance with 20% down', 'Wide property acceptance'],
    cons: ['Higher credit requirements', 'PMI required with <20% down', 'Limited loan amounts'],
  },
  fha: {
    name: 'FHA Loan',
    minDownPayment: 3.5,
    maxLoanAmount: 420680,
    minCreditScore: 580,
    interestRateAdjustment: 0.25,
    pmiRequirement: true,
    mortgageInsurance: 0.85,
    eligibilityCriteria: ['Primary residence', 'Stable employment', 'Debt-to-income ratio <43%'],
    pros: ['Lower credit requirements', 'Lower down payment', 'More flexible debt ratios'],
    cons: ['Upfront mortgage insurance', 'Lifetime mortgage insurance', 'Lower loan limits'],
  },
  va: {
    name: 'VA Loan',
    minDownPayment: 0,
    maxLoanAmount: 726200,
    minCreditScore: 620,
    interestRateAdjustment: -0.25,
    pmiRequirement: false,
    mortgageInsurance: 0,
    eligibilityCriteria: ['Military service', 'Primary residence', 'Certificate of Eligibility'],
    pros: ['No down payment required', 'No mortgage insurance', 'Competitive rates'],
    cons: ['Funding fee required', 'Eligibility requirements', 'Primary residence only'],
  },
  usda: {
    name: 'USDA Loan',
    minDownPayment: 0,
    maxLoanAmount: 338000,
    minCreditScore: 640,
    interestRateAdjustment: 0,
    pmiRequirement: true,
    mortgageInsurance: 0.35,
    eligibilityCriteria: ['Rural location', 'Income limits', 'Primary residence'],
    pros: ['No down payment', 'Flexible credit requirements', 'Guaranteed by government'],
    cons: ['Location restrictions', 'Income limits', 'Property eligibility requirements'],
  },
};

export function HomeLoanCalculator() {
  const [inputs, setInputs] = useState<HomeLoanInputs>({
    homePrice: 400000,
    downPayment: 80000,
    downPaymentType: 'dollar',
    loanAmount: 320000,
    interestRate: 6.5,
    loanTerm: 30,

    monthlyIncome: 8000,
    monthlyDebts: 500,
    creditScore: 720,
    employmentType: 'salaried',
    employmentYears: 5,

    propertyType: 'single-family',
    propertyUse: 'primary',
    location: '',

    loanType: 'conventional',
    armType: 'fixed',
    includeTaxesInsurance: true,
    propertyTaxRate: 1.2,
    homeInsuranceRate: 0.4,
    pmiRate: 0.5,
    hoaFees: 150,
  });

  const [analysis, setAnalysis] = useState<LoanAnalysis | null>(null);
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Load from URL parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const price = params.get('hp');
      const down = params.get('dp');
      const rate = params.get('ir');
      const income = params.get('inc');
      const creditscore = params.get('cs');
      const type = params.get('lt');

      if (price && down) {
        const customInputs: HomeLoanInputs = {
          ...inputs,
          homePrice: parseFloat(price) || 400000,
          downPayment: parseFloat(down) || 80000,
          interestRate: rate ? parseFloat(rate) : 6.5,
          monthlyIncome: income ? parseFloat(income) : 8000,
          creditScore: creditscore ? parseInt(creditscore) : 720,
          loanType: (type as any) || 'conventional',
        };
        // Calculate loan amount
        customInputs.loanAmount = customInputs.homePrice - customInputs.downPayment;
        setInputs(customInputs);
        setTimeout(() => {
          calculateLoanAnalysis(customInputs);
        }, 100);
      }
    }
  }, []);

  const handleInputChange = (field: keyof HomeLoanInputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };

    // Auto-calculate related fields
    if (field === 'homePrice' && inputs.downPaymentType === 'percent') {
      newInputs.downPayment = newInputs.homePrice * (inputs.downPayment / 100);
      newInputs.loanAmount = newInputs.homePrice - newInputs.downPayment;
    } else if (field === 'downPayment' && inputs.downPaymentType === 'percent') {
      newInputs.loanAmount = inputs.homePrice - newInputs.downPayment;
    } else if (field === 'downPaymentType') {
      if (value === 'percent') {
        newInputs.downPayment = (newInputs.downPayment / newInputs.homePrice) * 100;
      } else {
        newInputs.downPayment = Math.min(newInputs.downPayment, newInputs.homePrice * 0.5);
      }
      newInputs.loanAmount = newInputs.homePrice - newInputs.downPayment;
    } else if (field === 'loanAmount') {
      newInputs.downPayment = inputs.homePrice - value;
    }

    setInputs(newInputs);
  };

  const calculateLoanAnalysis = (customInputs?: HomeLoanInputs) => {
    const currentInputs = customInputs || inputs;
    const programs = Object.values(LOAN_PROGRAMS);

    // Calculate eligibility for each program
    const eligiblePrograms = programs.map(program => {
      let eligibilityScore = 100;

      // Check down payment requirement
      const downPaymentPercent = (currentInputs.downPayment / currentInputs.homePrice) * 100;
      if (downPaymentPercent < program.minDownPayment) {
        eligibilityScore -= 50;
      }

      // Check credit score
      if (currentInputs.creditScore < program.minCreditScore) {
        eligibilityScore -= 40;
      } else if (currentInputs.creditScore < program.minCreditScore + 50) {
        eligibilityScore -= 20;
      }

      // Check loan amount
      if (currentInputs.loanAmount > program.maxLoanAmount) {
        eligibilityScore -= 50;
      }

      // Check property type eligibility
      if (currentInputs.propertyType === 'manufactured' && program.name !== 'FHA Loan') {
        eligibilityScore -= 20;
      }

      // Check employment stability
      if (currentInputs.employmentYears < 2 && program.name !== 'FHA Loan') {
        eligibilityScore -= 30;
      }

      // Check VA eligibility
      if (program.name === 'VA Loan' && !currentInputs.location.includes('VA')) {
        eligibilityScore -= 80; // Assume not eligible without verification
      }

      // Check USDA location
      if (program.name === 'USDA Loan' && !currentInputs.location.includes('rural')) {
        eligibilityScore -= 80; // Assume not eligible without verification
      }

      return {
        ...program,
        eligibilityScore: Math.max(0, eligibilityScore),
        adjustedRate: currentInputs.interestRate + program.interestRateAdjustment,
      };
    }).sort((a, b) => b.eligibilityScore - a.eligibilityScore);

    const recommended = eligiblePrograms[0];
    const alternatives = eligiblePrograms.slice(1, 3);

    // Calculate loan details
    const monthlyRate = recommended.adjustedRate / 100 / 12;
    const numPayments = currentInputs.loanTerm * 12;
    const monthlyPI = currentInputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                     (Math.pow(1 + monthlyRate, numPayments) - 1);

    // Calculate additional costs
    let monthlyTax = 0, monthlyInsurance = 0, monthlyPMI = 0;

    if (currentInputs.includeTaxesInsurance) {
      monthlyTax = (currentInputs.homePrice * currentInputs.propertyTaxRate / 100) / 12;
      monthlyInsurance = (currentInputs.homePrice * currentInputs.homeInsuranceRate / 100) / 12;

      const ltv = (currentInputs.loanAmount / currentInputs.homePrice) * 100;
      if (ltv >= 80 && recommended.pmiRequirement) {
        monthlyPMI = (currentInputs.loanAmount * recommended.mortgageInsurance / 100) / 12;
      }
    }

    const totalMonthlyPayment = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI + currentInputs.hoaFees;
    const dti = (totalMonthlyPayment + currentInputs.monthlyDebts) / currentInputs.monthlyIncome * 100;

    // Calculate down payment percentage
    const downPaymentAmount = currentInputs.homePrice - currentInputs.loanAmount;
    const downPaymentPercent = (downPaymentAmount / currentInputs.homePrice) * 100;

    // Calculate total interest
    const totalPayments = monthlyPI * numPayments;
    const totalInterest = totalPayments - currentInputs.loanAmount;

    // Generate recommendations
    const recommendations: string[] = [];
    const warnings: string[] = [];

    if (recommended.eligibilityScore >= 80) {
      recommendations.push(`✅ Excellent match with ${recommended.name}`);
      recommendations.push(`💡 Consider increasing down payment to ${recommended.minDownPayment}% minimum if possible`);
    } else if (recommended.eligibilityScore >= 60) {
      recommendations.push(`⚠️ ${recommended.name} could work with some improvements`);
      if (currentInputs.creditScore < recommended.minCreditScore + 50) {
        recommendations.push(`📈 Improve credit score to ${recommended.minCreditScore + 50}+ for better rates`);
      }
    } else {
      warnings.push(`❌ ${recommended.name} may not be suitable for your situation`);
      if (downPaymentPercent < recommended.minDownPayment) {
        warnings.push(`💰 Increase down payment to ${recommended.minDownPayment}% or consider FHA/VA options`);
      }
    }

    if (dti > 43) {
      warnings.push(`🚨 DTI ratio is ${dti.toFixed(1)}%. Target is <43% for most loans`);
      recommendations.push(`📉 Reduce monthly debts to $${(currentInputs.monthlyIncome * 0.43 - currentInputs.monthlyDebts).toFixed(0)} or increase income`);
    } else if (dti > 36) {
      recommendations.push(`💡 DTI ratio is ${dti.toFixed(1)}%. Consider keeping it under 36% for better rates`);
    }

    if (monthlyPMI > 0) {
      recommendations.push(`🏠 PMI costs $${monthlyPMI.toFixed(0)}/month. Consider 20% down payment to eliminate PMI`);
    }

    // Affordability score
    let affordabilityScore: 'Excellent' | 'Good' | 'Fair' | 'Poor' = 'Poor';
    if (recommended.eligibilityScore >= 80 && dti <= 36) {
      affordabilityScore = 'Excellent';
    } else if (recommended.eligibilityScore >= 60 && dti <= 43) {
      affordabilityScore = 'Good';
    } else if (recommended.eligibilityScore >= 40 && dti <= 50) {
      affordabilityScore = 'Fair';
    }

    // Approval probability based on factors
    let approvalProbability = 50;
    approvalProbability += (recommended.eligibilityScore / 100) * 30;
    if (dti <= 36) approvalProbability += 20;
    else if (dti <= 43) approvalProbability += 10;
    else if (dti > 50) approvalProbability -= 20;

    if (currentInputs.employmentYears >= 3) approvalProbability += 10;
    else if (currentInputs.employmentYears < 2) approvalProbability -= 10;

    approvalProbability = Math.min(95, Math.max(5, approvalProbability));

    setAnalysis({
      recommendedProgram: recommended,
      alternativePrograms: alternatives,
      eligibilityScore: recommended.eligibilityScore,
      approvalProbability,
      monthlyPayment: monthlyPI,
      totalInterest,
      dti,
      loanAmount: currentInputs.loanAmount,
      downPaymentPercent: (currentInputs.downPayment / currentInputs.homePrice) * 100,
      pmi: monthlyPMI,
      totalMonthlyPayment,
      affordabilityScore,
      recommendations,
      warnings,
    });
  };

  const calculateHomeLoan = () => {
    calculateLoanAnalysis();
  };

  const handleReset = () => {
    setInputs({
      homePrice: 400000,
      downPayment: 80000,
      downPaymentType: 'dollar',
      loanAmount: 320000,
      interestRate: 6.5,
      loanTerm: 30,

      monthlyIncome: 8000,
      monthlyDebts: 500,
      creditScore: 720,
      employmentType: 'salaried',
      employmentYears: 5,

      propertyType: 'single-family',
      propertyUse: 'primary',
      location: '',

      loanType: 'conventional',
      armType: 'fixed',
      includeTaxesInsurance: true,
      propertyTaxRate: 1.2,
      homeInsuranceRate: 0.4,
      pmiRate: 0.5,
      hoaFees: 150,
    });
    setAnalysis(null);
  };

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/home-loan-calculator',
    getShareParams: () => ({
      hp: inputs.homePrice.toString(),
      dp: inputs.downPayment.toString(),
      ir: inputs.interestRate.toString(),
      inc: inputs.monthlyIncome.toString(),
      cs: inputs.creditScore.toString(),
      lt: inputs.loanType,
    }),
    getShareText: () => {
      const currentAnalysis = analysis; // 确保使用当前的 analysis 状态
      if (!currentAnalysis) return 'Calculate your home loan options!';
      return `Home Loan Analysis: ${currentAnalysis.recommendedProgram.name} | Monthly: $${currentAnalysis.totalMonthlyPayment.toFixed(0)} | Approval: ${currentAnalysis.approvalProbability}%`;
    },
  });

  const handleSaveImage = async () => {
    if (!resultRef.current) return;
    try {
      const canvas = await html2canvas(resultRef.current, {
        width: resultRef.current.offsetWidth * 2,
        height: resultRef.current.offsetHeight * 2,
        background: '#ffffff',
        logging: false,
      } as any);
      const link = document.createElement('a');
      link.download = 'home-loan-analysis.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current) return;
    try {
      const canvas = await html2canvas(resultRef.current, {
        width: resultRef.current.offsetWidth * 2,
        height: resultRef.current.offsetHeight * 2,
        background: '#ffffff',
        logging: false,
      } as any);
      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Home Loan Analysis Results</title>
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

  const getAffordabilityColor = (score: string) => {
    switch (score) {
      case 'Excellent': return 'text-green-600 bg-green-50';
      case 'Good': return 'text-blue-600 bg-blue-50';
      case 'Fair': return 'text-yellow-600 bg-yellow-50';
      case 'Poor': return 'text-red-600 bg-red-50';
    }
  };

  const getApprovalColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    if (probability >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const chartData = analysis ? [
    { name: 'Principal & Interest', value: analysis.monthlyPayment, fill: '#3b82f6' },
    { name: 'Property Tax', value: inputs.includeTaxesInsurance ? (inputs.homePrice * inputs.propertyTaxRate / 100) / 12 : 0, fill: '#10b981' },
    { name: 'Home Insurance', value: inputs.includeTaxesInsurance ? (inputs.homePrice * inputs.homeInsuranceRate / 100) / 12 : 0, fill: '#f59e0b' },
    { name: 'PMI', value: analysis.pmi, fill: '#ef4444' },
    { name: 'HOA Fees', value: inputs.hoaFees, fill: '#8b5cf6' },
  ].filter(item => item.value > 0) : [];

  const comparisonData = analysis ? [analysis.recommendedProgram, ...analysis.alternativePrograms].map(program => ({
    name: program.name.replace(' Loan', ''),
    eligibilityScore: program.eligibilityScore,
    adjustedRate: program.adjustedRate,
    downPaymentMin: program.minDownPayment,
  })) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 sticky top-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 hidden lg:block">
              <Home className="w-6 h-6 text-blue-600" />
              Home Loan Calculator
            </h2>

            <div className="space-y-5">
              {/* Property Information */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Home Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={inputs.homePrice}
                        onChange={(e) => handleInputChange('homePrice', parseFloat(e.target.value) || 0)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="400,000"
                        min="0"
                        step="1000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Down Payment <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <button
                        onClick={() => handleInputChange('downPaymentType', 'dollar')}
                        className={`px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                          inputs.downPaymentType === 'dollar'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        Amount
                      </button>
                      <button
                        onClick={() => handleInputChange('downPaymentType', 'percent')}
                        className={`px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                          inputs.downPaymentType === 'percent'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        Percentage
                      </button>
                    </div>
                    <div className="relative">
                      {inputs.downPaymentType === 'dollar' ? (
                        <>
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={inputs.downPayment}
                            onChange={(e) => handleInputChange('downPayment', parseFloat(e.target.value) || 0)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="80,000"
                            min="0"
                            max={inputs.homePrice * 0.5}
                            step="1000"
                          />
                        </>
                      ) : (
                        <>
                          <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={inputs.downPayment}
                            onChange={(e) => handleInputChange('downPayment', parseFloat(e.target.value) || 0)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="20"
                            min="0"
                            max="50"
                            step="0.5"
                          />
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Down Payment: {((inputs.downPayment / inputs.homePrice) * 100).toFixed(1)}% |
                      Loan Amount: ${(inputs.homePrice - inputs.downPayment).toLocaleString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Interest Rate (%)
                      </label>
                      <input
                        type="number"
                        value={inputs.interestRate}
                        onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="6.5"
                        min="0"
                        max="20"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Loan Term (years)
                      </label>
                      <select
                        value={inputs.loanTerm}
                        onChange={(e) => handleInputChange('loanTerm', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value={15}>15 years</option>
                        <option value={30}>30 years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      value={inputs.propertyType}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="single-family">Single Family Home</option>
                      <option value="condo">Condominium</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="multi-family">Multi-Family</option>
                      <option value="manufactured">Manufactured Home</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Property Use
                    </label>
                    <select
                      value={inputs.propertyUse}
                      onChange={(e) => handleInputChange('propertyUse', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="primary">Primary Residence</option>
                      <option value="secondary">Secondary Home</option>
                      <option value="investment">Investment Property</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Information</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Monthly Gross Income <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={inputs.monthlyIncome}
                        onChange={(e) => handleInputChange('monthlyIncome', parseFloat(e.target.value) || 0)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="8,000"
                        min="0"
                        step="100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Monthly Debt Payments
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={inputs.monthlyDebts}
                        onChange={(e) => handleInputChange('monthlyDebts', parseFloat(e.target.value) || 0)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="500"
                        min="0"
                        step="50"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Car loans, credit cards, student loans</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Credit Score <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={inputs.creditScore}
                      onChange={(e) => handleInputChange('creditScore', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="720"
                      min="300"
                      max="850"
                      step="10"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Employment Type
                      </label>
                      <select
                        value={inputs.employmentType}
                        onChange={(e) => handleInputChange('employmentType', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="salaried">Salaried</option>
                        <option value="self-employed">Self-Employed</option>
                        <option value="freelance">Freelance</option>
                        <option value="retired">Retired</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Years Employed
                      </label>
                      <input
                        type="number"
                        value={inputs.employmentYears}
                        onChange={(e) => handleInputChange('employmentYears', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="5"
                        min="0"
                        max="50"
                        step="0.5"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Loan Preferences */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Preferences</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Interested Loan Types
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.keys(LOAN_PROGRAMS).map((type) => (
                        <button
                          key={type}
                          onClick={() => handleInputChange('loanType', type)}
                          className={`px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium capitalize ${
                            inputs.loanType === type
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                          }`}
                        >
                          {type.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <input
                        type="checkbox"
                        checked={inputs.includeTaxesInsurance}
                        onChange={(e) => handleInputChange('includeTaxesInsurance', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      Include Taxes & Insurance
                    </label>
                  </div>

                  {inputs.includeTaxesInsurance && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Property Tax Rate (%)
                          </label>
                          <input
                            type="number"
                            value={inputs.propertyTaxRate}
                            onChange={(e) => handleInputChange('propertyTaxRate', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="1.2"
                            min="0"
                            max="5"
                            step="0.1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Home Insurance Rate (%)
                          </label>
                          <input
                            type="number"
                            value={inputs.homeInsuranceRate}
                            onChange={(e) => handleInputChange('homeInsuranceRate', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0.4"
                            min="0"
                            max="2"
                            step="0.1"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Monthly HOA Fees
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={inputs.hoaFees}
                            onChange={(e) => handleInputChange('hoaFees', parseFloat(e.target.value) || 0)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="150"
                            min="0"
                            step="25"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={calculateHomeLoan}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Analyze Loan Options
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
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          {analysis ? (
            <div className="space-y-4 sm:space-y-6">
              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleSaveImage}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save as Image
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium"
                >
                  <Printer className="w-4 h-4" />
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

              {/* Results Content */}
              <div ref={resultRef} className="space-y-4">
                {/* Recommended Program */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    Recommended Loan Program
                  </h3>

                  <div className="bg-white rounded-lg p-6 mb-4 border-2 border-blue-300">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-2xl font-bold text-blue-600">{analysis.recommendedProgram.name}</h4>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAffordabilityColor(analysis.affordabilityScore)}`}>
                        {analysis.affordabilityScore}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Adjusted Interest Rate</p>
                        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 break-all">{(analysis.recommendedProgram.adjustedRate || 0).toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Minimum Down Payment</p>
                        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 break-all">{analysis.recommendedProgram.minDownPayment}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Eligibility Score</p>
                        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 break-all">{analysis.eligibilityScore}/100</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Approval Probability</p>
                        <p className={`text-lg sm:text-xl md:text-2xl font-semibold break-all ${getApprovalColor(analysis.approvalProbability)}`}>
                          {analysis.approvalProbability.toFixed(0)}%
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Why This Program?</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-green-600 mb-1">Pros:</p>
                          <ul className="space-y-1">
                            {analysis.recommendedProgram.pros.slice(0, 2).map((pro, idx) => (
                              <li key={idx} className="text-gray-700">• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-red-600 mb-1">Cons:</p>
                          <ul className="space-y-1">
                            {analysis.recommendedProgram.cons.slice(0, 2).map((con, idx) => (
                              <li key={idx} className="text-gray-700">• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monthly Payment Breakdown */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Payment Breakdown</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 break-all">
                        ${analysis.totalMonthlyPayment.toFixed(0)}
                      </div>
                      <div className="text-sm text-gray-600">Total Monthly Payment</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-2 break-all">
                        {analysis.dti.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">Debt-to-Income Ratio</div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 h-48 sm:h-56 md:h-64">
                    <ResponsiveContainer width="100%" height={180} minHeight={200}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          label={false}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => `$${value.toFixed(0)}`}
                          contentStyle={{ fontSize: '12px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-600 mb-1">Principal & Interest</div>
                      <div className="text-base sm:text-lg md:text-xl font-semibold text-blue-900 break-all">
                        ${analysis.monthlyPayment.toFixed(0)}
                      </div>
                    </div>
                    {analysis.pmi > 0 && (
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-sm text-red-600 mb-1">PMI</div>
                        <div className="text-base sm:text-lg md:text-xl font-semibold text-red-900 break-all">
                          ${analysis.pmi.toFixed(0)}
                        </div>
                      </div>
                    )}
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-600 mb-1">Total Interest</div>
                      <div className="text-base sm:text-lg md:text-xl font-semibold text-green-900 break-all">
                        ${analysis.totalInterest.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Program Comparison */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Program Comparison</h3>
                    <button
                      onClick={() => setShowAllPrograms(!showAllPrograms)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {showAllPrograms ? 'Show Less' : 'Show All Programs'}
                    </button>
                  </div>

                  <div className="overflow-x-auto overflow-y-hidden">
                    <table className="w-full text-xs sm:text-sm min-w-[350px]">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-900">Program</th>
                          <th className="text-center py-3 px-2 sm:px-4 font-semibold text-gray-900">Eligibility</th>
                          <th className="text-center py-3 px-2 sm:px-4 font-semibold text-gray-900">Rate</th>
                          <th className="text-center py-3 px-2 sm:px-4 font-semibold text-gray-900">Down %</th>
                          <th className="text-center py-3 px-2 sm:px-4 font-semibold text-gray-900">PMI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(showAllPrograms ? comparisonData : comparisonData.slice(0, 3)).map((program, idx) => (
                          <tr key={idx} className={`border-b border-gray-100 ${idx === 0 ? 'bg-blue-50' : ''}`}>
                            <td className="py-3 px-2 sm:px-4 font-medium text-gray-900">{program.name}</td>
                            <td className="py-3 px-2 sm:px-4 text-center">
                              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                (program.eligibilityScore || 0) >= 80 ? 'bg-green-100 text-green-800' :
                                (program.eligibilityScore || 0) >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {program.eligibilityScore || 0}%
                              </div>
                            </td>
                            <td className="py-3 px-2 sm:px-4 text-center">{(program.adjustedRate || 0).toFixed(2)}%</td>
                            <td className="py-3 px-2 sm:px-4 text-center">{program.downPaymentMin}%</td>
                            <td className="py-3 px-2 sm:px-4 text-center">{program.name === 'VA' ? 'No' : 'Yes'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    Recommendations & Tips
                  </h3>

                  <div className="space-y-3">
                    {analysis.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{rec}</span>
                      </div>
                    ))}

                    {analysis.warnings.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-green-200">
                        {analysis.warnings.map((warning, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{warning}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Analyze Your Home Loan Options?</h3>
              <p className="text-gray-600 mb-4">
                Enter your property and financial information to get personalized loan recommendations
              </p>
              <p className="text-sm text-gray-500">
                We'll analyze multiple loan programs and find the best fit for your situation
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
        calculatorName="Home Loan Calculator"
      />
    </div>
  );
}