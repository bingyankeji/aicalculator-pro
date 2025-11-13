'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Download, DollarSign, Percent, Calculator, Users } from 'lucide-react';
import html2canvas from 'html2canvas';

interface PayrollInputs {
  grossSalary: number;
  payFrequency: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'annually';
  state: string;
  filingStatus: 'single' | 'married' | 'head_of_household';
  allowances: number;
  additionalWithholding: number;
  retirement401k: number;
  healthInsurance: number;
  otherDeductions: number;
}

interface PayrollResult {
  grossPay: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  stateDisability: number;
  unemployment: number;
  retirement401k: number;
  healthInsurance: number;
  otherDeductions: number;
  totalDeductions: number;
  netPay: number;
  takeHomePercentage: number;
  annualGross: number;
  annualNet: number;
}

// US State tax rates (simplified - in reality these are more complex)
const stateTaxRates: { [key: string]: number } = {
  'AL': 0.05, 'AK': 0.00, 'AZ': 0.045, 'AR': 0.065, 'CA': 0.093, 'CO': 0.0463,
  'CT': 0.0699, 'DE': 0.066, 'FL': 0.00, 'GA': 0.0575, 'HI': 0.11, 'ID': 0.0695,
  'IL': 0.0495, 'IN': 0.0323, 'IA': 0.0853, 'KS': 0.057, 'KY': 0.05, 'LA': 0.06,
  'ME': 0.0715, 'MD': 0.0575, 'MA': 0.05, 'MI': 0.0425, 'MN': 0.0985, 'MS': 0.05,
  'MO': 0.054, 'MT': 0.0675, 'NE': 0.0684, 'NV': 0.00, 'NH': 0.00, 'NJ': 0.1075,
  'NM': 0.059, 'NY': 0.0882, 'NC': 0.0525, 'ND': 0.029, 'OH': 0.0399, 'OK': 0.05,
  'OR': 0.099, 'PA': 0.0307, 'RI': 0.0599, 'SC': 0.07, 'SD': 0.00, 'TN': 0.00,
  'TX': 0.00, 'UT': 0.0495, 'VT': 0.0875, 'VA': 0.0575, 'WA': 0.00, 'WV': 0.065,
  'WI': 0.0765, 'WY': 0.00
};

const calculatePayroll = (inputs: PayrollInputs): PayrollResult | null => {
  if (inputs.grossSalary <= 0) return null;

  // Convert to annual salary for calculations
  let annualGross = inputs.grossSalary;
  let payPeriodsPerYear = 1;

  switch (inputs.payFrequency) {
    case 'weekly':
      payPeriodsPerYear = 52;
      annualGross = inputs.grossSalary * 52;
      break;
    case 'biweekly':
      payPeriodsPerYear = 26;
      annualGross = inputs.grossSalary * 26;
      break;
    case 'semimonthly':
      payPeriodsPerYear = 24;
      annualGross = inputs.grossSalary * 24;
      break;
    case 'monthly':
      payPeriodsPerYear = 12;
      annualGross = inputs.grossSalary * 12;
      break;
    case 'annually':
      payPeriodsPerYear = 1;
      annualGross = inputs.grossSalary;
      break;
  }

  const grossPay = inputs.grossSalary;

  // Pre-tax deductions
  const retirement401k = (inputs.retirement401k / 100) * grossPay;
  const healthInsurance = inputs.healthInsurance;
  const otherDeductions = inputs.otherDeductions;

  // Taxable income after pre-tax deductions
  const taxableIncome = grossPay - retirement401k - healthInsurance - otherDeductions;

  // Federal tax calculation (simplified progressive tax)
  let federalTax = 0;
  const annualTaxableIncome = taxableIncome * payPeriodsPerYear;
  
  // 2024 tax brackets (single filer, simplified)
  if (inputs.filingStatus === 'single') {
    if (annualTaxableIncome > 609350) federalTax = annualTaxableIncome * 0.37;
    else if (annualTaxableIncome > 243725) federalTax = annualTaxableIncome * 0.35;
    else if (annualTaxableIncome > 191950) federalTax = annualTaxableIncome * 0.32;
    else if (annualTaxableIncome > 100525) federalTax = annualTaxableIncome * 0.24;
    else if (annualTaxableIncome > 47150) federalTax = annualTaxableIncome * 0.22;
    else if (annualTaxableIncome > 11000) federalTax = annualTaxableIncome * 0.12;
    else federalTax = annualTaxableIncome * 0.10;
  } else {
    // Married filing jointly (simplified)
    if (annualTaxableIncome > 731200) federalTax = annualTaxableIncome * 0.37;
    else if (annualTaxableIncome > 487450) federalTax = annualTaxableIncome * 0.35;
    else if (annualTaxableIncome > 383900) federalTax = annualTaxableIncome * 0.32;
    else if (annualTaxableIncome > 201050) federalTax = annualTaxableIncome * 0.24;
    else if (annualTaxableIncome > 94300) federalTax = annualTaxableIncome * 0.22;
    else if (annualTaxableIncome > 22000) federalTax = annualTaxableIncome * 0.12;
    else federalTax = annualTaxableIncome * 0.10;
  }

  federalTax = (federalTax / payPeriodsPerYear) + inputs.additionalWithholding;

  // State tax
  const stateRate = stateTaxRates[inputs.state] || 0;
  const stateTax = taxableIncome * stateRate;

  // FICA taxes
  const socialSecurity = Math.min(grossPay * 0.062, (160200 / payPeriodsPerYear) * 0.062); // 2024 SS wage base
  const medicare = grossPay * 0.0145;

  // State disability (CA example)
  const stateDisability = inputs.state === 'CA' ? grossPay * 0.009 : 0;

  // Unemployment (SUTA - employer pays, but showing for completeness)
  const unemployment = 0; // Typically employer-paid

  const totalDeductions = federalTax + stateTax + socialSecurity + medicare + 
                         stateDisability + unemployment + retirement401k + 
                         healthInsurance + otherDeductions;

  const netPay = grossPay - totalDeductions;
  const takeHomePercentage = (netPay / grossPay) * 100;
  const annualNet = netPay * payPeriodsPerYear;

  return {
    grossPay,
    federalTax,
    stateTax,
    socialSecurity,
    medicare,
    stateDisability,
    unemployment,
    retirement401k,
    healthInsurance,
    otherDeductions,
    totalDeductions,
    netPay,
    takeHomePercentage,
    annualGross,
    annualNet
  };
};

export default function PayrollCalculator() {
  const [inputs, setInputs] = useState<PayrollInputs>({
    grossSalary: 5000,
    payFrequency: 'monthly',
    state: 'CA',
    filingStatus: 'single',
    allowances: 1,
    additionalWithholding: 0,
    retirement401k: 6,
    healthInsurance: 200,
    otherDeductions: 0
  });

  const result = useMemo(() => calculatePayroll(inputs), [inputs]);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSaveAsImage = async () => {
    if (!resultRef.current || !result) return;
    
    try {
      const canvas = await html2canvas(resultRef.current);
      
      const link = document.createElement('a');
      link.download = `payroll-calculation-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const getCalculationSummary = (): string => {
    if (!result) return '';
    
    const frequency = inputs.payFrequency === 'annually' ? 'annual' : inputs.payFrequency;
    return `Your ${frequency} gross pay of $${result.grossPay.toFixed(2)} results in a net pay of $${result.netPay.toFixed(2)} (${result.takeHomePercentage.toFixed(1)}% take-home rate) after $${result.totalDeductions.toFixed(2)} in total deductions.`;
  };

  const handleInputChange = (field: keyof PayrollInputs, value: number | string) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Number(value)
    }));
  };

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 
    'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 
    'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6 lg:items-start">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gross Salary ($)
                </label>
                <input
                  type="number"
                  value={inputs.grossSalary}
                  onChange={(e) => handleInputChange('grossSalary', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter gross salary"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pay Frequency
                </label>
                <select
                  value={inputs.payFrequency}
                  onChange={(e) => handleInputChange('payFrequency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="semimonthly">Semi-monthly</option>
                  <option value="monthly">Monthly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select
                  value={inputs.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {usStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filing Status
                </label>
                <select
                  value={inputs.filingStatus}
                  onChange={(e) => handleInputChange('filingStatus', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="single">Single</option>
                  <option value="married">Married Filing Jointly</option>
                  <option value="head_of_household">Head of Household</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  401(k) Contribution (%)
                </label>
                <input
                  type="number"
                  value={inputs.retirement401k}
                  onChange={(e) => handleInputChange('retirement401k', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter 401k percentage"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Health Insurance ($)
                </label>
                <input
                  type="number"
                  value={inputs.healthInsurance}
                  onChange={(e) => handleInputChange('healthInsurance', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter health insurance cost"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Withholding ($)
                </label>
                <input
                  type="number"
                  value={inputs.additionalWithholding}
                  onChange={(e) => handleInputChange('additionalWithholding', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter additional withholding"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <button
              onClick={handleSaveAsImage}
              disabled={!result}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Save as Image
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          <div ref={resultRef} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            {result ? (
              <div className="space-y-6">
                {/* Calculation Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800 text-center font-medium">
                    {getCalculationSummary()}
                  </p>
                </div>

                {/* Net Pay Highlight */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <div className="text-center">
                    <div className="text-sm font-medium text-green-800 mb-2">Net Pay</div>
                    <div className="text-3xl font-bold text-green-900">
                      ${result.netPay.toFixed(2)}
                    </div>
                    <div className="text-sm text-green-700 mt-1">
                      {result.takeHomePercentage.toFixed(1)}% take-home rate
                    </div>
                  </div>
                </div>

                {/* Deductions Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Federal Tax</span>
                    </div>
                    <div className="text-xl font-bold text-red-900">
                      ${result.federalTax.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">State Tax</span>
                    </div>
                    <div className="text-xl font-bold text-orange-900">
                      ${result.stateTax.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Social Security</span>
                    </div>
                    <div className="text-xl font-bold text-purple-900">
                      ${result.socialSecurity.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-pink-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-4 h-4 text-pink-600" />
                      <span className="text-sm font-medium text-pink-800">Medicare</span>
                    </div>
                    <div className="text-xl font-bold text-pink-900">
                      ${result.medicare.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">401(k)</span>
                    </div>
                    <div className="text-xl font-bold text-blue-900">
                      ${result.retirement401k.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-800">Health Insurance</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      ${result.healthInsurance.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Annual Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Annual Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Annual Gross:</span>
                      <span className="font-semibold text-gray-900 ml-2">${result.annualGross.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Annual Net:</span>
                      <span className="font-semibold text-gray-900 ml-2">${result.annualNet.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">💰</div>
                <p className="text-gray-500">Enter salary information to calculate payroll</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
