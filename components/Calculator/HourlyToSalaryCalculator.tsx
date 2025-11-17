'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface ConversionResults {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
  annualSalary: number;
  monthlySalary: number;
  biweeklySalary: number;
  weeklySalary: number;
  dailySalary: number;
  overtimeRate: number;
  doubleTimeRate: number;
  withBenefits: {
    benefitsValue: number;
    totalCompensation: number;
    effectiveHourlyRate: number;
  };
  afterTax: {
    federalTax: number;
    stateTax: number;
    ficaTax: number;
    netAnnual: number;
    netHourly: number;
  };
  comparison: {
    standardFullTime: number;
    difference: number;
    percentDifference: number;
  };
}

export default function HourlyToSalaryCalculator() {
  const [inputs, setInputs] = useState({
    hourlyRate: '25',
    hoursPerWeek: '40',
    weeksPerYear: '52',
    vacationWeeks: '2',
    overtimeHours: '0',
    holidayPay: '0',
    benefits: '0',
    filingStatus: 'single',
    stateWithholding: '5',
  });

  const [results, setResults] = useState<ConversionResults | null>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/hourly-to-salary-calculator',
    getShareParams: () => ({
      rate: inputs.hourlyRate,
      hours: inputs.hoursPerWeek,
      weeks: inputs.weeksPerYear,
    }),
    getShareText: () => 
      results 
        ? `Salary Conversion: $${inputs.hourlyRate}/hr = ${results.annualSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}/year | Net: ${results.afterTax.netAnnual.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}`
        : 'Check out my hourly to salary calculation!',
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
      setTimeout(calculateSalary, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateFederalTax = (income: number, filingStatus: string): number => {
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

  const calculateSalary = () => {
    const hourlyRate = parseFloat(inputs.hourlyRate) || 0;
    const hoursPerWeek = parseFloat(inputs.hoursPerWeek) || 40;
    const weeksPerYear = parseFloat(inputs.weeksPerYear) || 52;
    const vacationWeeks = parseFloat(inputs.vacationWeeks) || 0;
    const overtimeHours = parseFloat(inputs.overtimeHours) || 0;
    const holidayPay = parseFloat(inputs.holidayPay) || 0;
    const benefits = parseFloat(inputs.benefits) || 0;
    const stateWithholding = parseFloat(inputs.stateWithholding) || 0;

    // Calculate work weeks (excluding vacation)
    const workWeeks = weeksPerYear - vacationWeeks;

    // Calculate base annual salary
    const regularAnnualSalary = hourlyRate * hoursPerWeek * workWeeks;
    
    // Add overtime (if any)
    const overtimeRate = hourlyRate * 1.5;
    const overtimeAnnualPay = overtimeRate * overtimeHours * workWeeks;
    
    // Total annual salary (including overtime and holiday pay)
    const annualSalary = regularAnnualSalary + overtimeAnnualPay + holidayPay;

    // Calculate other periods
    const monthlySalary = annualSalary / 12;
    const biweeklySalary = annualSalary / 26;
    const weeklySalary = annualSalary / weeksPerYear;
    const dailySalary = weeklySalary / 5; // Assuming 5-day work week

    // Calculate overtime rates
    const doubleTimeRate = hourlyRate * 2;

    // Benefits calculation
    const benefitsValue = benefits;
    const totalCompensation = annualSalary + benefitsValue;
    const totalHoursWorked = hoursPerWeek * workWeeks;
    const effectiveHourlyRate = totalHoursWorked > 0 ? totalCompensation / totalHoursWorked : hourlyRate;

    // Tax calculations
    const federalTax = calculateFederalTax(annualSalary, inputs.filingStatus);
    const stateTax = annualSalary * (stateWithholding / 100);
    const ficaTax = Math.min(annualSalary * 0.0765, 168600 * 0.062 + annualSalary * 0.0145); // Social Security cap
    const netAnnual = annualSalary - federalTax - stateTax - ficaTax;
    const netHourly = totalHoursWorked > 0 ? netAnnual / totalHoursWorked : 0;

    // Comparison with standard full-time (40 hrs/week, 52 weeks)
    const standardFullTime = hourlyRate * 40 * 52;
    const difference = annualSalary - standardFullTime;
    const percentDifference = standardFullTime > 0 ? (difference / standardFullTime) * 100 : 0;

    setResults({
      hourlyRate,
      hoursPerWeek,
      weeksPerYear: workWeeks,
      annualSalary,
      monthlySalary,
      biweeklySalary,
      weeklySalary,
      dailySalary,
      overtimeRate,
      doubleTimeRate,
      withBenefits: {
        benefitsValue,
        totalCompensation,
        effectiveHourlyRate
      },
      afterTax: {
        federalTax,
        stateTax,
        ficaTax,
        netAnnual,
        netHourly
      },
      comparison: {
        standardFullTime,
        difference,
        percentDifference
      }
    });

    // Update URL
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleSaveAsImage = async () => {
    const element = document.getElementById('salary-results');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = 'hourly-to-salary-results.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving as image:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Clock className="h-5 w-5 text-blue-600" />
                Hourly Rate Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate" className="text-sm font-medium">
                  Hourly Rate ($) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="hourlyRate"
                  type="number"
                  value={inputs.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="25"
                  min="0"
                  step="0.5"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoursPerWeek" className="text-sm font-medium">
                  Hours Per Week <span className="text-red-500">*</span>
                </Label>
                <input
                  id="hoursPerWeek"
                  type="number"
                  value={inputs.hoursPerWeek}
                  onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="40"
                  min="0"
                  max="168"
                  step="0.5"
                  required
                />
                <p className="text-xs text-gray-500">Standard full-time: 40 hours</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weeksPerYear" className="text-sm font-medium">
                  Weeks Per Year <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="weeksPerYear"
                  type="number"
                  value={inputs.weeksPerYear}
                  onChange={(e) => handleInputChange('weeksPerYear', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="52"
                  min="1"
                  max="52"
                  step="1"
                />
                <p className="text-xs text-gray-500">Default: 52 weeks (full year)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vacationWeeks" className="text-sm font-medium">
                  Vacation Weeks <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="vacationWeeks"
                  type="number"
                  value={inputs.vacationWeeks}
                  onChange={(e) => handleInputChange('vacationWeeks', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2"
                  min="0"
                  max="52"
                  step="0.5"
                />
                <p className="text-xs text-gray-500">Unpaid vacation/time off (Default: 2 weeks)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <DollarSign className="h-5 w-5 text-green-600" />
                Additional Compensation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="overtimeHours" className="text-sm font-medium">
                  Overtime Hours Per Week <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="overtimeHours"
                  type="number"
                  value={inputs.overtimeHours}
                  onChange={(e) => handleInputChange('overtimeHours', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  max="40"
                  step="0.5"
                />
                <p className="text-xs text-gray-500">Paid at 1.5x rate (Default: 0)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="holidayPay" className="text-sm font-medium">
                  Annual Holiday/Bonus Pay ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="holidayPay"
                  type="number"
                  value={inputs.holidayPay}
                  onChange={(e) => handleInputChange('holidayPay', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  step="100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits" className="text-sm font-medium">
                  Annual Benefits Value ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="benefits"
                  type="number"
                  value={inputs.benefits}
                  onChange={(e) => handleInputChange('benefits', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  step="100"
                />
                <p className="text-xs text-gray-500">Health insurance, 401k match, etc.</p>
              </div>
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
            onClick={calculateSalary}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Salary
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" id="salary-results">
          {results && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-lg border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Hourly Rate</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${results.hourlyRate.toFixed(2)}/hr
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Annual Salary</p>
                    <p className="text-2xl font-bold text-green-600">
                      {results.annualSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Monthly Salary</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {results.monthlySalary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Net After Tax</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {results.afterTax.netAnnual.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Pay Period Breakdown */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle>Pay Period Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Annual</p>
                      <p className="text-xl font-bold text-gray-900">
                        {results.annualSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Monthly</p>
                      <p className="text-xl font-bold text-gray-900">
                        {results.monthlySalary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Biweekly (Every 2 weeks)</p>
                      <p className="text-xl font-bold text-gray-900">
                        {results.biweeklySalary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Weekly</p>
                      <p className="text-xl font-bold text-gray-900">
                        {results.weeklySalary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Daily</p>
                      <p className="text-xl font-bold text-gray-900">
                        {results.dailySalary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Hourly</p>
                      <p className="text-xl font-bold text-gray-900">
                        ${results.hourlyRate.toFixed(2)}/hr
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Overtime Rates */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                  <CardTitle>Overtime Rates</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Regular Time</p>
                      <p className="text-2xl font-bold text-gray-900">${results.hourlyRate.toFixed(2)}/hr</p>
                      <p className="text-xs text-gray-500 mt-1">Standard hourly rate</p>
                    </div>
                    <div className="p-4 bg-white border border-orange-200 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Time & Half (OT)</p>
                      <p className="text-2xl font-bold text-orange-600">${results.overtimeRate.toFixed(2)}/hr</p>
                      <p className="text-xs text-gray-500 mt-1">1.5× regular rate</p>
                    </div>
                    <div className="p-4 bg-white border border-red-200 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Double Time</p>
                      <p className="text-2xl font-bold text-red-600">${results.doubleTimeRate.toFixed(2)}/hr</p>
                      <p className="text-xs text-gray-500 mt-1">2× regular rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits & Total Compensation */}
              {results.withBenefits.benefitsValue > 0 && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Total Compensation (with Benefits)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Base Salary</span>
                        <span className="font-semibold text-gray-900">
                          {results.annualSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-700">Benefits Value</span>
                        <span className="font-semibold text-green-600">
                          +{results.withBenefits.benefitsValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-100 border-t-2 border-green-500 rounded-lg">
                        <span className="text-gray-900 font-bold">Total Compensation</span>
                        <span className="text-xl font-bold text-green-600">
                          {results.withBenefits.totalCompensation.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Effective Hourly Rate:</strong> ${results.withBenefits.effectiveHourlyRate.toFixed(2)}/hr
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Your true hourly value including benefits
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tax Breakdown */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                  <CardTitle>Tax & Net Income</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Gross Annual Salary</span>
                      <span className="font-semibold text-gray-900">
                        {results.annualSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-gray-700">Federal Tax</span>
                      <span className="font-semibold text-red-600">
                        -{results.afterTax.federalTax.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-gray-700">State Tax</span>
                      <span className="font-semibold text-red-600">
                        -{results.afterTax.stateTax.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-gray-700">FICA (Social Security + Medicare)</span>
                      <span className="font-semibold text-red-600">
                        -{results.afterTax.ficaTax.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 border-t-2 border-green-500 rounded-lg">
                      <span className="text-gray-900 font-bold">Net Annual Income</span>
                      <span className="text-xl font-bold text-green-600">
                        {results.afterTax.netAnnual.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Net Hourly Rate:</strong> ${results.afterTax.netHourly.toFixed(2)}/hr after taxes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comparison with Standard Full-Time */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle>Comparison vs Standard Full-Time (40 hrs/week)</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Your Annual Salary</span>
                      <span className="font-semibold text-gray-900">
                        {results.annualSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Standard Full-Time</span>
                      <span className="font-semibold text-gray-900">
                        {results.comparison.standardFullTime.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className={`flex justify-between items-center p-3 rounded-lg ${results.comparison.difference >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                      <span className="text-gray-700 font-semibold">Difference</span>
                      <div className="text-right">
                        <span className={`text-xl font-bold ${results.comparison.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {results.comparison.difference >= 0 ? '+' : ''}{results.comparison.difference.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                        </span>
                        <p className="text-sm text-gray-600">
                          ({results.comparison.percentDifference >= 0 ? '+' : ''}{results.comparison.percentDifference.toFixed(1)}%)
                        </p>
                      </div>
                    </div>
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
                  Enter your hourly rate and working hours, then click "Calculate Salary" to see your annual earnings breakdown.
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
        calculatorName="Hourly to Salary Calculator"
      />
    </div>
  );
}

