"use client";

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

interface VAMortgageInputs {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTaxRate: number;
  homeInsurance: number;
  hoaFee: number;
  militaryStatus: 'active' | 'veteran' | 'reserve' | 'national-guard' | 'disabled-veteran';
  disabilityRating: number;
  firstTimeUse: boolean;
  countyType: 'standard' | 'high-cost';
}

interface VAMortgageResult {
  // Loan Details
  loanAmount: number;
  vaFundingFee: number;
  vaFundingFeeRate: number;
  totalLoanAmount: number;
  
  // Monthly Payments
  monthlyPI: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  
  // Totals
  totalInterest: number;
  totalPayments: number;
  
  // VA Benefits
  fundingFeeWaived: boolean;
  noPMI: boolean;
  maxLoanLimit: number;
  
  // Comparison with Conventional
  conventionalDownPayment: number;
  conventionalPMI: number;
  conventionalMonthly: number;
  monthlySavings: number;
  totalSavings: number;
}

export function VAMortgageCalculator() {
  const [inputs, setInputs] = useState<VAMortgageInputs>({
    homePrice: 350000,
    downPayment: 0,
    interestRate: 6.5,
    loanTerm: 30,
    propertyTaxRate: 1.25,
    homeInsurance: 1200,
    hoaFee: 0,
    militaryStatus: 'veteran',
    disabilityRating: 0,
    firstTimeUse: true,
    countyType: 'standard',
  });

  const [result, setResult] = useState<VAMortgageResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Calculate VA Funding Fee Rate
  const getVAFundingFeeRate = (): number => {
    // Disabled veterans (10%+) are exempt
    if (inputs.disabilityRating >= 10) return 0;
    
    // Reserve/National Guard rates
    if (inputs.militaryStatus === 'reserve' || inputs.militaryStatus === 'national-guard') {
      if (inputs.firstTimeUse) {
        return inputs.downPayment >= 5 ? 1.5 : inputs.downPayment >= 10 ? 1.25 : 2.15;
      } else {
        return 3.3;
      }
    }
    
    // Regular military rates
    if (inputs.firstTimeUse) {
      if (inputs.downPayment >= 10) return 1.25;
      if (inputs.downPayment >= 5) return 1.5;
      return 2.15;
    } else {
      return 3.3;
    }
  };

  // Get VA Loan Limits
  const getVALoanLimit = (): number => {
    return inputs.countyType === 'high-cost' ? 1149250 : 766550;
  };

  // Calculate monthly payment
  const calculateMonthlyPayment = (principal: number, rate: number, years: number): number => {
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    
    if (monthlyRate === 0) return principal / numPayments;
    
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  const handleCalculate = () => {
    // Calculate down payment
    const downPaymentAmount = (inputs.homePrice * inputs.downPayment) / 100;
    const loanAmount = inputs.homePrice - downPaymentAmount;
    
    // Calculate VA Funding Fee
    const fundingFeeRate = getVAFundingFeeRate();
    const vaFundingFee = loanAmount * (fundingFeeRate / 100);
    const fundingFeeWaived = inputs.disabilityRating >= 10;
    
    // Total loan amount (funding fee is typically financed)
    const totalLoanAmount = loanAmount + (fundingFeeWaived ? 0 : vaFundingFee);
    
    // Monthly P&I
    const monthlyPI = calculateMonthlyPayment(totalLoanAmount, inputs.interestRate, inputs.loanTerm);
    
    // Other monthly costs
    const monthlyTax = (inputs.homePrice * inputs.propertyTaxRate / 100) / 12;
    const monthlyInsurance = inputs.homeInsurance / 12;
    const monthlyHOA = inputs.hoaFee;
    
    // Total monthly payment (NO PMI for VA loans!)
    const totalMonthlyPayment = monthlyPI + monthlyTax + monthlyInsurance + monthlyHOA;
    
    // Total costs
    const totalPayments = totalMonthlyPayment * inputs.loanTerm * 12;
    const totalInterest = (monthlyPI * inputs.loanTerm * 12) - totalLoanAmount;
    
    // Conventional loan comparison (20% down)
    const conventionalDownPayment = inputs.homePrice * 0.20;
    const conventionalLoanAmount = inputs.homePrice - conventionalDownPayment;
    const conventionalMonthlyPI = calculateMonthlyPayment(conventionalLoanAmount, inputs.interestRate, inputs.loanTerm);
    
    // PMI for conventional (if less than 20% down, but we're comparing to 20% down)
    const conventionalPMI = 0; // No PMI with 20% down
    const conventionalMonthly = conventionalMonthlyPI + conventionalPMI + monthlyTax + monthlyInsurance + monthlyHOA;
    
    // Savings
    const monthlySavings = conventionalMonthly - totalMonthlyPayment;
    const downPaymentSavings = conventionalDownPayment - downPaymentAmount;
    const totalSavings = (monthlySavings * inputs.loanTerm * 12) + downPaymentSavings;
    
    const calculatedResult: VAMortgageResult = {
      loanAmount,
      vaFundingFee: fundingFeeWaived ? 0 : vaFundingFee,
      vaFundingFeeRate: fundingFeeRate,
      totalLoanAmount,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyHOA,
      totalMonthlyPayment,
      totalInterest,
      totalPayments,
      fundingFeeWaived,
      noPMI: true,
      maxLoanLimit: getVALoanLimit(),
      conventionalDownPayment,
      conventionalPMI,
      conventionalMonthly,
      monthlySavings,
      totalSavings,
    };
    
    setResult(calculatedResult);
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = `va-mortgage-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🎖️</span>
              <h2 className="text-2xl font-bold text-gray-900">VA Mortgage Calculator</h2>
            </div>
            
            <div className="space-y-4">
              {/* Home Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.homePrice}
                    onChange={(e) => setInputs({ ...inputs, homePrice: Number(e.target.value) })}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment (VA allows 0%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={inputs.downPayment}
                    onChange={(e) => setInputs({ ...inputs, downPayment: Number(e.target.value) })}
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
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
                    step="0.125"
                    value={inputs.interestRate}
                    onChange={(e) => setInputs({ ...inputs, interestRate: Number(e.target.value) })}
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value={15}>15 years</option>
                  <option value={30}>30 years</option>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active Duty</option>
                  <option value="veteran">Veteran</option>
                  <option value="reserve">Reserves</option>
                  <option value="national-guard">National Guard</option>
                  <option value="disabled-veteran">Disabled Veteran</option>
                </select>
              </div>

              {/* Disability Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disability Rating (10%+ waives funding fee)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={inputs.disabilityRating}
                    onChange={(e) => setInputs({ ...inputs, disabilityRating: Number(e.target.value) })}
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              {/* First Time Use */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={inputs.firstTimeUse}
                    onChange={(e) => setInputs({ ...inputs, firstTimeUse: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">First-time VA loan use</span>
                </label>
              </div>

              {/* Property Tax */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Tax Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.propertyTaxRate}
                    onChange={(e) => setInputs({ ...inputs, propertyTaxRate: Number(e.target.value) })}
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* HOA Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HOA Fee (Monthly)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.hoaFee}
                    onChange={(e) => setInputs({ ...inputs, hoaFee: Number(e.target.value) })}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* County Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  County Type
                </label>
                <select
                  value={inputs.countyType}
                  onChange={(e) => setInputs({ ...inputs, countyType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="standard">Standard ($766,550 limit)</option>
                  <option value="high-cost">High-Cost ($1,149,250 limit)</option>
                </select>
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Calculate VA Loan
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="xl:col-span-2">
          {result ? (
            <div ref={resultRef} className="space-y-6">
              {/* Main Result Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border-2 border-blue-200 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your VA Loan Benefits</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Monthly Payment</div>
                    <div className="text-3xl font-bold text-blue-600">{formatCurrency(result.totalMonthlyPayment)}</div>
                    <div className="text-xs text-gray-500 mt-2">✓ No PMI Required</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">VA Funding Fee</div>
                    <div className="text-3xl font-bold text-green-600">
                      {result.fundingFeeWaived ? 'WAIVED' : formatCurrency(result.vaFundingFee)}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {result.fundingFeeWaived ? '✓ Disability Exemption' : `${result.vaFundingFeeRate}% of loan amount`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Breakdown */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Payment Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-700">Principal & Interest</span>
                    <span className="font-semibold">{formatCurrency(result.monthlyPI)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-700">Property Tax</span>
                    <span className="font-semibold">{formatCurrency(result.monthlyTax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-700">Home Insurance</span>
                    <span className="font-semibold">{formatCurrency(result.monthlyInsurance)}</span>
                  </div>
                  {result.monthlyHOA > 0 && (
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-700">HOA Fee</span>
                      <span className="font-semibold">{formatCurrency(result.monthlyHOA)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-700 font-bold">PMI</span>
                    <span className="font-semibold text-green-600">$0 ✓</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-blue-50 rounded-lg px-3 mt-2">
                    <span className="text-gray-900 font-bold">Total Monthly Payment</span>
                    <span className="font-bold text-xl text-blue-600">{formatCurrency(result.totalMonthlyPayment)}</span>
                  </div>
                </div>
              </div>

              {/* VA vs Conventional Comparison */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">VA Loan vs Conventional Loan</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                    <div className="text-sm font-semibold text-green-800 mb-2">VA Loan</div>
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(result.totalMonthlyPayment)}</div>
                    <div className="text-xs text-green-700 mt-1">0% down payment</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                    <div className="text-sm font-semibold text-gray-800 mb-2">Conventional Loan</div>
                    <div className="text-2xl font-bold text-gray-600">{formatCurrency(result.conventionalMonthly)}</div>
                    <div className="text-xs text-gray-700 mt-1">20% down payment required</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Your Total Savings with VA Loan</div>
                  <div className="text-3xl font-bold text-green-600 mb-2">{formatCurrency(result.totalSavings)}</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Monthly Savings:</span>
                      <span className="font-semibold ml-2">{formatCurrency(result.monthlySavings)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Down Payment Savings:</span>
                      <span className="font-semibold ml-2">{formatCurrency(result.conventionalDownPayment)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loan Summary */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Loan Summary</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Loan Amount</div>
                    <div className="text-xl font-bold text-gray-900">{formatCurrency(result.loanAmount)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Total Interest</div>
                    <div className="text-xl font-bold text-gray-900">{formatCurrency(result.totalInterest)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Total Payments</div>
                    <div className="text-xl font-bold text-gray-900">{formatCurrency(result.totalPayments)}</div>
                  </div>
                </div>
              </div>

              {/* Export Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveAsImage}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Save as Image
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">🎖️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Calculate</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Enter your home details and military service information, then click "Calculate VA Loan" to see your benefits and potential savings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Export with compatibility name
export const VAMortgageCalculatorNew = VAMortgageCalculator;
