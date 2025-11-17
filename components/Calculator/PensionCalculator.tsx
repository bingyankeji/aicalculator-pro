'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, TrendingUp, DollarSign, Users } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface PensionResults {
  monthlyPension: number;
  annualPension: number;
  pensionFormula: string;
  earlyRetirementReduction: number;
  colaAdjustedPension: number;
  lumpSumValue: number;
  survivorBenefit: number;
  pensionVs401k: {
    pensionLifetimeValue: number;
    pension401kEquivalent: number;
    breakEvenAge: number;
  };
  taxImpact: {
    grossPension: number;
    federalTax: number;
    stateTax: number;
    netPension: number;
  };
  projections: Array<{
    age: number;
    year: number;
    pensionAmount: number;
    cumulativePayments: number;
  }>;
}

export default function PensionCalculator() {
  const [inputs, setInputs] = useState({
    pensionType: 'defined-benefit',
    yearsOfService: '30',
    finalAverageSalary: '75000',
    benefitMultiplier: '1.5',
    currentAge: '55',
    retirementAge: '65',
    normalRetirementAge: '65',
    cola: '2',
    lifeExpectancy: '85',
    payoutOption: 'single-life',
    survivorPercentage: '50',
    lumpSumOption: 'no',
    lumpSumAmount: '500000',
    filingStatus: 'single',
    stateWithholding: '5',
  });

  const [results, setResults] = useState<PensionResults | null>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/pension-calculator',
    getShareParams: () => ({
      ys: inputs.yearsOfService,
      fas: inputs.finalAverageSalary,
      bm: inputs.benefitMultiplier,
      ra: inputs.retirementAge,
      cola: inputs.cola,
    }),
    getShareText: () => 
      results 
        ? `Pension Analysis: Monthly benefit ${results.monthlyPension.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} | Lifetime value: ${results.pensionVs401k.pensionLifetimeValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}`
        : 'Check out my pension calculation!',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newInputs = { ...inputs };
    let hasParams = false;

    params.forEach((value, key) => {
      if (key in inputs) {
        newInputs[key as keyof typeof inputs] = value;
        hasParams = true;
      }
    });

    if (hasParams) {
      setInputs(newInputs);
      setTimeout(calculatePension, 100);
    }
  }, []);

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculatePension = () => {
    const yearsOfService = parseFloat(inputs.yearsOfService) || 0;
    const finalAverageSalary = parseFloat(inputs.finalAverageSalary) || 0;
    const benefitMultiplier = parseFloat(inputs.benefitMultiplier) || 1.5;
    const currentAge = parseInt(inputs.currentAge) || 55;
    const retirementAge = parseInt(inputs.retirementAge) || 65;
    const normalRetirementAge = parseInt(inputs.normalRetirementAge) || 65;
    const cola = parseFloat(inputs.cola) || 0;
    const lifeExpectancy = parseInt(inputs.lifeExpectancy) || 85;
    const survivorPercentage = parseFloat(inputs.survivorPercentage) || 50;
    const stateWithholding = parseFloat(inputs.stateWithholding) || 0;

    // Calculate base pension using typical formula: Years × Multiplier × Final Average Salary
    const basePensionAnnual = (yearsOfService * (benefitMultiplier / 100) * finalAverageSalary);
    let annualPension = basePensionAnnual;

    // Early retirement reduction (typically 5-6% per year before normal retirement age)
    let earlyRetirementReduction = 0;
    if (retirementAge < normalRetirementAge) {
      const yearsEarly = normalRetirementAge - retirementAge;
      earlyRetirementReduction = yearsEarly * 0.05; // 5% per year
      annualPension = basePensionAnnual * (1 - earlyRetirementReduction);
    }

    // Survivor benefit adjustment (Joint & Survivor options reduce pension by ~10-15%)
    if (inputs.payoutOption === 'joint-100') {
      annualPension *= 0.90; // 10% reduction for 100% survivor benefit
    } else if (inputs.payoutOption === 'joint-50') {
      annualPension *= 0.95; // 5% reduction for 50% survivor benefit
    }

    const monthlyPension = annualPension / 12;

    // COLA adjusted pension (future value at life expectancy)
    const yearsInRetirement = lifeExpectancy - retirementAge;
    const colaAdjustedPension = annualPension * Math.pow(1 + cola / 100, yearsInRetirement);

    // Lump sum value (estimate: present value of lifetime payments)
    const lumpSumValue = inputs.lumpSumOption === 'yes' && inputs.lumpSumAmount 
      ? parseFloat(inputs.lumpSumAmount)
      : calculatePresentValue(annualPension, yearsInRetirement, 4); // 4% discount rate

    // Survivor benefit
    const survivorBenefit = inputs.payoutOption === 'single-life' 
      ? 0 
      : annualPension * (survivorPercentage / 100);

    // Pension vs 401k equivalent
    const pensionLifetimeValue = calculateLifetimeValue(annualPension, retirementAge, lifeExpectancy, cola / 100);
    const pension401kEquivalent = calculatePresentValue(annualPension, yearsInRetirement, 6); // 6% assumed return
    const breakEvenAge = calculateBreakEvenAge(lumpSumValue, annualPension, retirementAge, cola / 100);

    // Tax impact (federal + state)
    const federalTax = calculateFederalTax(annualPension, inputs.filingStatus);
    const stateTax = annualPension * (stateWithholding / 100);
    const netAnnualPension = annualPension - federalTax - stateTax;

    // Projections
    const projections = [];
    let cumulativePayments = 0;
    for (let age = retirementAge; age <= lifeExpectancy; age++) {
      const yearsFromRetirement = age - retirementAge;
      const pensionWithCola = annualPension * Math.pow(1 + cola / 100, yearsFromRetirement);
      cumulativePayments += pensionWithCola;
      
      projections.push({
        age,
        year: new Date().getFullYear() + (age - currentAge),
        pensionAmount: pensionWithCola,
        cumulativePayments
      });
    }

    setResults({
      monthlyPension,
      annualPension,
      pensionFormula: `${yearsOfService} years × ${benefitMultiplier}% × $${finalAverageSalary.toLocaleString()}`,
      earlyRetirementReduction: earlyRetirementReduction * 100,
      colaAdjustedPension: colaAdjustedPension / 12,
      lumpSumValue,
      survivorBenefit: survivorBenefit / 12,
      pensionVs401k: {
        pensionLifetimeValue,
        pension401kEquivalent,
        breakEvenAge
      },
      taxImpact: {
        grossPension: annualPension,
        federalTax,
        stateTax,
        netPension: netAnnualPension
      },
      projections
    });

    // Update URL
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const calculatePresentValue = (annualPayment: number, years: number, discountRate: number): number => {
    let pv = 0;
    for (let i = 1; i <= years; i++) {
      pv += annualPayment / Math.pow(1 + discountRate / 100, i);
    }
    return pv;
  };

  const calculateLifetimeValue = (annualPension: number, retirementAge: number, lifeExpectancy: number, cola: number): number => {
    let totalValue = 0;
    const years = lifeExpectancy - retirementAge;
    for (let i = 0; i < years; i++) {
      totalValue += annualPension * Math.pow(1 + cola, i);
    }
    return totalValue;
  };

  const calculateBreakEvenAge = (lumpSum: number, annualPension: number, retirementAge: number, cola: number): number => {
    let cumulative = 0;
    for (let age = retirementAge; age <= 100; age++) {
      const yearsFromRetirement = age - retirementAge;
      cumulative += annualPension * Math.pow(1 + cola, yearsFromRetirement);
      if (cumulative >= lumpSum) {
        return age;
      }
    }
    return 100;
  };

  const calculateFederalTax = (income: number, filingStatus: string): number => {
    // Simplified 2024 federal tax brackets
    const brackets = filingStatus === 'married' 
      ? [
          { limit: 22000, rate: 0.10 },
          { limit: 89075, rate: 0.12 },
          { limit: 190750, rate: 0.22 },
          { limit: 364200, rate: 0.24 },
          { limit: 462500, rate: 0.32 },
          { limit: 693750, rate: 0.35 },
          { limit: Infinity, rate: 0.37 }
        ]
      : [
          { limit: 11000, rate: 0.10 },
          { limit: 44725, rate: 0.12 },
          { limit: 95375, rate: 0.22 },
          { limit: 182100, rate: 0.24 },
          { limit: 231250, rate: 0.32 },
          { limit: 578125, rate: 0.35 },
          { limit: Infinity, rate: 0.37 }
        ];

    let tax = 0;
    let previousLimit = 0;

    for (const bracket of brackets) {
      if (income <= previousLimit) break;
      
      const taxableInBracket = Math.min(income, bracket.limit) - previousLimit;
      tax += taxableInBracket * bracket.rate;
      previousLimit = bracket.limit;
      
      if (income <= bracket.limit) break;
    }

    return tax;
  };

  const handleSaveAsImage = async () => {
    const element = document.getElementById('pension-results');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = 'pension-calculator-results.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving as image:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="h-5 w-5 text-blue-600" />
                Pension Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="yearsOfService" className="text-sm font-medium">
                  Years of Service <span className="text-red-500">*</span>
                </Label>
                <input
                  id="yearsOfService"
                  type="number"
                  value={inputs.yearsOfService}
                  onChange={(e) => handleInputChange('yearsOfService', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="30"
                  min="0"
                  max="50"
                  step="0.5"
                  required
                />
                <p className="text-xs text-gray-500">Total years worked for employer</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="finalAverageSalary" className="text-sm font-medium">
                  Final Average Salary ($) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="finalAverageSalary"
                  type="number"
                  value={inputs.finalAverageSalary}
                  onChange={(e) => handleInputChange('finalAverageSalary', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="75000"
                  min="0"
                  step="1000"
                  required
                />
                <p className="text-xs text-gray-500">Average of highest 3-5 years (typically)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefitMultiplier" className="text-sm font-medium">
                  Benefit Multiplier (%) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="benefitMultiplier"
                  type="number"
                  value={inputs.benefitMultiplier}
                  onChange={(e) => handleInputChange('benefitMultiplier', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1.5"
                  min="0"
                  max="5"
                  step="0.1"
                  required
                />
                <p className="text-xs text-gray-500">Typical: 1.5% to 2.5% per year of service</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentAge" className="text-sm font-medium">
                  Current Age <span className="text-red-500">*</span>
                </Label>
                <input
                  id="currentAge"
                  type="number"
                  value={inputs.currentAge}
                  onChange={(e) => handleInputChange('currentAge', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="55"
                  min="18"
                  max="100"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retirementAge" className="text-sm font-medium">
                  Planned Retirement Age <span className="text-red-500">*</span>
                </Label>
                <input
                  id="retirementAge"
                  type="number"
                  value={inputs.retirementAge}
                  onChange={(e) => handleInputChange('retirementAge', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="65"
                  min="50"
                  max="75"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="normalRetirementAge" className="text-sm font-medium">
                  Normal Retirement Age <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="normalRetirementAge"
                  type="number"
                  value={inputs.normalRetirementAge}
                  onChange={(e) => handleInputChange('normalRetirementAge', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="65"
                  min="50"
                  max="75"
                />
                <p className="text-xs text-gray-500">Age for unreduced benefits (Default: 65)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cola" className="text-sm font-medium">
                  COLA - Cost of Living Adjustment (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="cola"
                  type="number"
                  value={inputs.cola}
                  onChange={(e) => handleInputChange('cola', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2"
                  min="0"
                  max="10"
                  step="0.1"
                />
                <p className="text-xs text-gray-500">Annual increase (Default: 2%)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lifeExpectancy" className="text-sm font-medium">
                  Life Expectancy <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="lifeExpectancy"
                  type="number"
                  value={inputs.lifeExpectancy}
                  onChange={(e) => handleInputChange('lifeExpectancy', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="85"
                  min="60"
                  max="110"
                />
                <p className="text-xs text-gray-500">For lifetime value calculation (Default: 85)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <DollarSign className="h-5 w-5 text-green-600" />
                Payout Options
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payoutOption" className="text-sm font-medium">
                  Payout Option <span className="text-red-500">*</span>
                </Label>
                <select
                  id="payoutOption"
                  value={inputs.payoutOption}
                  onChange={(e) => handleInputChange('payoutOption', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="single-life">Single Life (highest payment, no survivor)</option>
                  <option value="joint-100">Joint & 100% Survivor (~10% reduction)</option>
                  <option value="joint-50">Joint & 50% Survivor (~5% reduction)</option>
                </select>
              </div>

              {inputs.payoutOption !== 'single-life' && (
                <div className="space-y-2">
                  <Label htmlFor="survivorPercentage" className="text-sm font-medium">
                    Survivor Benefit Percentage (%) <span className="text-gray-500 text-xs">- Optional</span>
                  </Label>
                  <input
                    id="survivorPercentage"
                    type="number"
                    value={inputs.survivorPercentage}
                    onChange={(e) => handleInputChange('survivorPercentage', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="50"
                    min="0"
                    max="100"
                    step="5"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="lumpSumOption" className="text-sm font-medium">
                  Lump Sum Option Available?
                </Label>
                <select
                  id="lumpSumOption"
                  value={inputs.lumpSumOption}
                  onChange={(e) => handleInputChange('lumpSumOption', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="no">No - Annuity Only</option>
                  <option value="yes">Yes - Compare with Lump Sum</option>
                </select>
              </div>

              {inputs.lumpSumOption === 'yes' && (
                <div className="space-y-2">
                  <Label htmlFor="lumpSumAmount" className="text-sm font-medium">
                    Lump Sum Amount ($)
                  </Label>
                  <input
                    id="lumpSumAmount"
                    type="number"
                    value={inputs.lumpSumAmount}
                    onChange={(e) => handleInputChange('lumpSumAmount', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="500000"
                    min="0"
                    step="10000"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="text-xl">Tax Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="filingStatus" className="text-sm font-medium">
                  Filing Status <span className="text-red-500">*</span>
                </Label>
                <select
                  id="filingStatus"
                  value={inputs.filingStatus}
                  onChange={(e) => handleInputChange('filingStatus', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="single">Single</option>
                  <option value="married">Married Filing Jointly</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stateWithholding" className="text-sm font-medium">
                  State Tax Rate (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="stateWithholding"
                  type="number"
                  value={inputs.stateWithholding}
                  onChange={(e) => handleInputChange('stateWithholding', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5"
                  min="0"
                  max="15"
                  step="0.1"
                />
                <p className="text-xs text-gray-500">Default: 5%</p>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculatePension}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Pension
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" id="pension-results">
          {results && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="shadow-lg border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Monthly Pension</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {results.monthlyPension.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {results.annualPension.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}/year
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Lifetime Value</p>
                    <p className="text-2xl font-bold text-green-600">
                      {results.pensionVs401k.pensionLifetimeValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">With COLA adjustments</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Net After Tax</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {(results.taxImpact.netPension / 12).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}/mo
                    </p>
                    <p className="text-xs text-gray-600 mt-1">After federal & state tax</p>
                  </CardContent>
                </Card>
              </div>

              {/* Formula & Details */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle>Pension Calculation Details</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Pension Formula:</p>
                      <p className="font-mono text-lg font-semibold text-gray-900">{results.pensionFormula}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        = {results.annualPension.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} annually
                      </p>
                    </div>

                    {results.earlyRetirementReduction > 0 && (
                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <p className="text-sm text-orange-900 font-semibold">Early Retirement Reduction</p>
                        <p className="text-sm text-orange-800 mt-1">
                          {results.earlyRetirementReduction.toFixed(1)}% reduction applied for retiring before normal retirement age
                        </p>
                      </div>
                    )}

                    {results.survivorBenefit > 0 && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-900 font-semibold">Survivor Benefit</p>
                        <p className="text-sm text-green-800 mt-1">
                          Spouse will receive {results.survivorBenefit.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}/month after your death
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tax Impact */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle>Tax Impact Analysis</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Gross Annual Pension</span>
                      <span className="font-semibold text-gray-900">
                        {results.taxImpact.grossPension.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-gray-700">Federal Tax</span>
                      <span className="font-semibold text-red-600">
                        -{results.taxImpact.federalTax.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-gray-700">State Tax</span>
                      <span className="font-semibold text-red-600">
                        -{results.taxImpact.stateTax.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 border-t-2 border-green-500 rounded-lg">
                      <span className="text-gray-900 font-bold">Net Annual Pension</span>
                      <span className="text-xl font-bold text-green-600">
                        {results.taxImpact.netPension.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pension vs 401k */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Pension vs 401(k) Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-white border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">401(k) Equivalent Value</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {results.pensionVs401k.pension401kEquivalent.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-gray-600 mt-2">
                        Amount needed in 401(k) to generate same income (assuming 6% return)
                      </p>
                    </div>

                    {inputs.lumpSumOption === 'yes' && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-900 font-semibold">Break-Even Age</p>
                        <p className="text-3xl font-bold text-blue-600 my-2">{results.pensionVs401k.breakEvenAge} years old</p>
                        <p className="text-sm text-blue-800">
                          Age when cumulative annuity payments equal lump sum value. 
                          {results.pensionVs401k.breakEvenAge < parseInt(inputs.lifeExpectancy) 
                            ? ` Annuity is better if you live past ${results.pensionVs401k.breakEvenAge}.`
                            : ' Lump sum may be better value.'}
                        </p>
                      </div>
                    )}

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 mb-3 font-semibold">Key Differences:</p>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span><strong>Pension:</strong> Guaranteed income for life, no investment risk, survivor benefits, COLA protection</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">✓</span>
                          <span><strong>401(k):</strong> Flexibility, inheritance to heirs, control over investments, potentially higher returns</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Projections Chart */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle>Pension Income Projection</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.projections}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" label={{ value: 'Age', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Annual Pension ($)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
                        <Legend />
                        <Line type="monotone" dataKey="pensionAmount" stroke="#3b82f6" strokeWidth={2} name="Annual Pension (with COLA)" />
                        <Line type="monotone" dataKey="cumulativePayments" stroke="#10b981" strokeWidth={2} name="Cumulative Payments" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Export Actions */}
              <Card className="shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleSaveAsImage} variant="outline" className="flex-1 sm:flex-none min-h-[44px]">
                      <Download className="h-4 w-4 mr-2" />
                      Save as Image
                    </Button>
                    <Button onClick={handlePrint} variant="outline" className="flex-1 sm:flex-none min-h-[44px]">
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <Button onClick={handleShare} variant="outline" className="flex-1 sm:flex-none min-h-[44px]">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!results && (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  Enter your pension information and click "Calculate Pension" to see your retirement income analysis.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Pension Calculator"
      />
    </div>
  );
}

