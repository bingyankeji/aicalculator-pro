'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface SocialSecurityResults {
  fullRetirementAge: { years: number; months: number };
  monthlyBenefitAtFRA: number;
  earlyRetirementAge: number;
  earlyRetirementBenefit: number;
  earlyRetirementReduction: number;
  delayedRetirementAge: number;
  delayedRetirementBenefit: number;
  delayedRetirementIncrease: number;
  spouseBenefit: number;
  survivorBenefit: number;
  workCredits: number;
  isEligible: boolean;
  earningsTestLimit: number;
  taxablePercentage: number;
  estimatedTax: number;
  netBenefit: number;
  lifetimeEarnings: number;
  bestClaimingAge: number;
  bestClaimingReason: string;
  ageComparison: Array<{ age: number; monthlyBenefit: number; lifetimeBenefit: number }>;
}

export default function SocialSecurityCalculator() {
  const [inputs, setInputs] = useState({
    birthYear: '1960',
    averageAnnualEarnings: '60000',
    yearsWorked: '35',
    retirementAge: '67',
    filingStatus: 'single',
    spouseAge: '55',
    spouseBenefit: '1500',
    combinedIncome: '0',
    lifeExpectancy: '85',
  });

  // 自动计算当前年龄
  const currentAge = new Date().getFullYear() - parseInt(inputs.birthYear || '1960');

  const [results, setResults] = useState<SocialSecurityResults | null>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/social-security-calculator',
    getShareParams: () => ({
      by: inputs.birthYear,
      ae: inputs.averageAnnualEarnings,
      yw: inputs.yearsWorked,
      fs: inputs.filingStatus,
      sa: inputs.spouseAge,
      sb: inputs.spouseBenefit,
      ci: inputs.combinedIncome,
      le: inputs.lifeExpectancy,
    }),
    getShareText: () => 
      results 
        ? `My Social Security Analysis: Best claiming age is ${results.bestClaimingAge} | FRA benefit: $${Math.round(results.monthlyBenefitAtFRA)}/mo`
        : 'Check out my Social Security benefits analysis!',
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
      setTimeout(calculateBenefits, 100);
    }
  }, []);

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const getFullRetirementAge = (birthYear: number): { years: number; months: number } => {
    if (birthYear <= 1937) return { years: 65, months: 0 };
    if (birthYear >= 1960) return { years: 67, months: 0 };
    
    const monthsToAdd = (birthYear - 1937) * 2;
    const years = 65 + Math.floor(monthsToAdd / 12);
    const months = monthsToAdd % 12;
    return { years, months };
  };

  const calculatePrimaryInsuranceAmount = (averageEarnings: number, yearsWorked: number): number => {
    // Simplified AIME calculation based on average indexed monthly earnings
    const aime = (averageEarnings * yearsWorked) / (35 * 12);
    
    // 2024 bend points for PIA calculation
    const bendPoint1 = 1174;
    const bendPoint2 = 7078;
    
    let pia = 0;
    if (aime <= bendPoint1) {
      pia = aime * 0.90;
    } else if (aime <= bendPoint2) {
      pia = (bendPoint1 * 0.90) + ((aime - bendPoint1) * 0.32);
    } else {
      pia = (bendPoint1 * 0.90) + ((bendPoint2 - bendPoint1) * 0.32) + ((aime - bendPoint2) * 0.15);
    }
    
    return Math.max(pia, 0);
  };

  const calculateBenefits = () => {
    const birthYear = parseInt(inputs.birthYear);
    const currentAgeValue = currentAge;
    const averageEarnings = parseFloat(inputs.averageAnnualEarnings);
    const yearsWorked = parseInt(inputs.yearsWorked);
    const retirementAge = parseInt(inputs.retirementAge);
    const spouseAge = parseInt(inputs.spouseAge);
    const spouseBenefit = parseFloat(inputs.spouseBenefit);
    const combinedIncome = parseFloat(inputs.combinedIncome);
    const lifeExpectancy = parseInt(inputs.lifeExpectancy);

    // Calculate Full Retirement Age
    const fra = getFullRetirementAge(birthYear);
    const fraInYears = fra.years + fra.months / 12;

    // Calculate Primary Insurance Amount (PIA)
    const pia = calculatePrimaryInsuranceAmount(averageEarnings, yearsWorked);

    // Early Retirement (62)
    const earlyRetirementAge = 62;
    const earlyMonthsEarly = (fraInYears - earlyRetirementAge) * 12;
    const earlyReductionPercent = Math.min(earlyMonthsEarly * (5/9), 36) + Math.max(0, earlyMonthsEarly - 36) * (5/12);
    const earlyRetirementBenefit = pia * (1 - earlyReductionPercent / 100);

    // Delayed Retirement (70)
    const delayedRetirementAge = 70;
    const delayMonthsLate = (delayedRetirementAge - fraInYears) * 12;
    const delayIncreasePercent = delayMonthsLate * (2/3);
    const delayedRetirementBenefit = pia * (1 + delayIncreasePercent / 100);

    // Spouse Benefit (50% of worker's PIA at FRA)
    const spouseBenefitAmount = inputs.filingStatus === 'married' ? Math.min(spouseBenefit, pia * 0.5) : 0;

    // Survivor Benefit (100% of worker's benefit)
    const survivorBenefitAmount = inputs.filingStatus === 'married' ? pia : 0;

    // Work Credits (need 40 quarters = 10 years)
    const workCredits = Math.min(yearsWorked * 4, 40);
    const isEligible = workCredits >= 40;

    // Earnings Test Limit (before FRA)
    const earningsTestLimit = 22320; // 2024 limit

    // Tax Calculation
    const totalIncome = combinedIncome + pia * 12;
    let taxablePercentage = 0;
    
    if (inputs.filingStatus === 'single') {
      if (totalIncome > 34000) taxablePercentage = 85;
      else if (totalIncome > 25000) taxablePercentage = 50;
    } else {
      if (totalIncome > 44000) taxablePercentage = 85;
      else if (totalIncome > 32000) taxablePercentage = 50;
    }

    const taxableBenefit = pia * 12 * (taxablePercentage / 100);
    const taxRate = totalIncome > 100000 ? 0.24 : totalIncome > 50000 ? 0.22 : 0.12;
    const estimatedTax = taxableBenefit * taxRate;
    const netBenefit = pia * 12 - estimatedTax;

    // Lifetime Earnings
    const lifetimeEarnings = averageEarnings * yearsWorked;

    // Age Comparison Analysis
    const ageComparison: Array<{ age: number; monthlyBenefit: number; lifetimeBenefit: number }> = [];
    
    for (let age = 62; age <= 70; age++) {
      let monthlyBenefit = pia;
      
      if (age < fraInYears) {
        const monthsEarly = (fraInYears - age) * 12;
        const reductionPercent = Math.min(monthsEarly * (5/9), 36) + Math.max(0, monthsEarly - 36) * (5/12);
        monthlyBenefit = pia * (1 - reductionPercent / 100);
      } else if (age > fraInYears) {
        const monthsLate = (age - fraInYears) * 12;
        const increasePercent = monthsLate * (2/3);
        monthlyBenefit = pia * (1 + increasePercent / 100);
      }
      
      const yearsCollecting = Math.max(0, lifeExpectancy - age);
      const lifetimeBenefit = monthlyBenefit * 12 * yearsCollecting;
      
      ageComparison.push({ age, monthlyBenefit, lifetimeBenefit });
    }

    // Find best claiming age (highest lifetime benefit)
    const bestAge = ageComparison.reduce((prev, current) => 
      current.lifetimeBenefit > prev.lifetimeBenefit ? current : prev
    );

    let bestClaimingReason = '';
    if (bestAge.age === 62) {
      bestClaimingReason = 'Early claiming maximizes lifetime benefits given your life expectancy';
    } else if (bestAge.age === fraInYears) {
      bestClaimingReason = 'Claiming at Full Retirement Age balances monthly benefit and lifetime value';
    } else if (bestAge.age === 70) {
      bestClaimingReason = 'Delaying maximizes lifetime benefits with higher monthly payments';
    } else {
      bestClaimingReason = `Age ${bestAge.age} optimizes lifetime benefits for your situation`;
    }

    setResults({
      fullRetirementAge: fra,
      monthlyBenefitAtFRA: pia,
      earlyRetirementAge,
      earlyRetirementBenefit,
      earlyRetirementReduction: earlyReductionPercent,
      delayedRetirementAge,
      delayedRetirementBenefit,
      delayedRetirementIncrease: delayIncreasePercent,
      spouseBenefit: spouseBenefitAmount,
      survivorBenefit: survivorBenefitAmount,
      workCredits,
      isEligible,
      earningsTestLimit,
      taxablePercentage,
      estimatedTax,
      netBenefit,
      lifetimeEarnings,
      bestClaimingAge: bestAge.age,
      bestClaimingReason,
      ageComparison,
    });

    // Update URL with current inputs
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleSaveAsImage = async () => {
    const element = document.getElementById('social-security-results');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = 'social-security-calculator-results.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving as image:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const benefitBreakdownData = results ? [
    { name: 'Monthly Benefit', value: results.monthlyBenefitAtFRA },
    { name: 'Annual Benefit', value: results.monthlyBenefitAtFRA * 12 },
    { name: 'Estimated Tax', value: results.estimatedTax },
  ] : [];

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
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="birthYear" className="text-sm font-medium">
                  Birth Year <span className="text-red-500">*</span>
                </Label>
                <input
                  id="birthYear"
                  type="number"
                  value={inputs.birthYear}
                  onChange={(e) => handleInputChange('birthYear', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1960"
                  min="1900"
                  max="2010"
                  required
                />
                <p className="text-xs text-gray-500">Current age: {currentAge} years old</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="averageAnnualEarnings" className="text-sm font-medium">
                  Average Annual Earnings ($) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="averageAnnualEarnings"
                  type="number"
                  value={inputs.averageAnnualEarnings}
                  onChange={(e) => handleInputChange('averageAnnualEarnings', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="60000"
                  min="0"
                  step="1000"
                  required
                />
                <p className="text-xs text-gray-500">Your average indexed earnings over your career</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsWorked" className="text-sm font-medium">
                  Years Worked <span className="text-red-500">*</span>
                </Label>
                <input
                  id="yearsWorked"
                  type="number"
                  value={inputs.yearsWorked}
                  onChange={(e) => handleInputChange('yearsWorked', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="35"
                  min="0"
                  max="50"
                  required
                />
                <p className="text-xs text-gray-500">Need 10 years (40 credits) minimum for eligibility</p>
              </div>

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
                  <option value="married">Married</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              {inputs.filingStatus === 'married' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="spouseAge" className="text-sm font-medium">
                      Spouse Age <span className="text-gray-500 text-xs">- Optional</span>
                    </Label>
                    <input
                      id="spouseAge"
                      type="number"
                      value={inputs.spouseAge}
                      onChange={(e) => handleInputChange('spouseAge', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="55"
                      min="18"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="spouseBenefit" className="text-sm font-medium">
                      Spouse Monthly Benefit ($) <span className="text-gray-500 text-xs">- Optional</span>
                    </Label>
                    <input
                      id="spouseBenefit"
                      type="number"
                      value={inputs.spouseBenefit}
                      onChange={(e) => handleInputChange('spouseBenefit', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1500"
                      min="0"
                      step="100"
                    />
                    <p className="text-xs text-gray-500">Default: $1,500/month</p>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="combinedIncome" className="text-sm font-medium">
                  Combined Income ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="combinedIncome"
                  type="number"
                  value={inputs.combinedIncome}
                  onChange={(e) => handleInputChange('combinedIncome', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  step="1000"
                />
                <p className="text-xs text-gray-500">Other income (pension, wages, etc.) - affects taxation</p>
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
                  max="120"
                />
                <p className="text-xs text-gray-500">Default: 85 years (average US life expectancy)</p>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculateBenefits}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Social Security Benefits
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" id="social-security-results">
          {results && (
            <div className="space-y-6">
              {/* Eligibility Status */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                    Eligibility Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${results.isEligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                      <p className="text-sm text-gray-600 mb-1">Work Credits</p>
                      <p className={`text-2xl font-bold ${results.isEligible ? 'text-green-600' : 'text-red-600'}`}>
                        {results.workCredits} / 40
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {results.isEligible ? '✓ Eligible for benefits' : '✗ Need more work credits'}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-sm text-gray-600 mb-1">Full Retirement Age</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {results.fullRetirementAge.years} years {results.fullRetirementAge.months > 0 ? `${results.fullRetirementAge.months} months` : ''}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Based on your birth year</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Benefit Analysis */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Monthly Benefit Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                      <p className="text-sm text-gray-600 mb-1">Early Retirement (Age {results.earlyRetirementAge})</p>
                      <p className="text-xl sm:text-2xl font-bold text-orange-600">
                        ${results.earlyRetirementBenefit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                      </p>
                      <p className="text-xs text-red-600 mt-1">
                        -{results.earlyRetirementReduction.toFixed(1)}% reduction
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-sm text-gray-600 mb-1">Full Retirement Age</p>
                      <p className="text-xl sm:text-2xl font-bold text-blue-600">
                        ${results.monthlyBenefitAtFRA.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        100% of benefit (baseline)
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-sm text-gray-600 mb-1">Delayed Retirement (Age {results.delayedRetirementAge})</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-600">
                        ${results.delayedRetirementBenefit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        +{results.delayedRetirementIncrease.toFixed(1)}% increase
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Annual Benefits</h4>
                      <div className="overflow-x-auto">
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={results.ageComparison.slice(0, 9)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="age" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                            <Bar dataKey="monthlyBenefit" fill="#3b82f6" name="Monthly Benefit" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Lifetime Benefits</h4>
                      <div className="overflow-x-auto">
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={results.ageComparison}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="age" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                            <Line type="monotone" dataKey="lifetimeBenefit" stroke="#10b981" strokeWidth={2} name="Lifetime Benefit" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Best Claiming Age */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle>Best Claiming Age Recommendation</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center mb-4">
                    <p className="text-5xl font-bold text-purple-600 mb-2">
                      Age {results.bestClaimingAge}
                    </p>
                    <p className="text-gray-700">{results.bestClaimingReason}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="p-3 rounded-lg bg-gray-50">
                      <p className="text-xs text-gray-600 mb-1">Monthly Benefit</p>
                      <p className="text-lg font-bold text-gray-900">
                        ${results.ageComparison.find(a => a.age === results.bestClaimingAge)?.monthlyBenefit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50">
                      <p className="text-xs text-gray-600 mb-1">Lifetime Benefit</p>
                      <p className="text-lg font-bold text-gray-900">
                        ${results.ageComparison.find(a => a.age === results.bestClaimingAge)?.lifetimeBenefit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Spousal & Survivor Benefits */}
              {inputs.filingStatus === 'married' && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
                    <CardTitle>Spousal & Survivor Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-pink-50 border border-pink-200">
                        <p className="text-sm text-gray-600 mb-1">Spousal Benefit</p>
                        <p className="text-2xl font-bold text-pink-600">
                          ${results.spouseBenefit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Up to 50% of your benefit</p>
                      </div>
                      <div className="p-4 rounded-lg bg-rose-50 border border-rose-200">
                        <p className="text-sm text-gray-600 mb-1">Survivor Benefit</p>
                        <p className="text-2xl font-bold text-rose-600">
                          ${results.survivorBenefit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                        </p>
                        <p className="text-xs text-gray-600 mt-1">100% of your benefit</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tax & Net Benefit */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
                  <CardTitle>Tax Impact & Net Benefit</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-sm text-gray-600 mb-1">Annual Benefit</p>
                      <p className="text-xl font-bold text-blue-600">
                        ${(results.monthlyBenefitAtFRA * 12).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-sm text-gray-600 mb-1">Estimated Tax</p>
                      <p className="text-xl font-bold text-red-600">
                        -${results.estimatedTax.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{results.taxablePercentage}% taxable</p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-sm text-gray-600 mb-1">Net Annual Benefit</p>
                      <p className="text-xl font-bold text-green-600">
                        ${results.netBenefit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Earnings Test:</strong> If you claim before Full Retirement Age and continue working, 
                      you may face benefit reductions if you earn over ${results.earningsTestLimit.toLocaleString()}/year.
                    </p>
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
                  Enter your information and click "Calculate Social Security Benefits" to see your estimated benefits.
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
        calculatorName="Social Security Calculator"
      />
    </div>
  );
}

