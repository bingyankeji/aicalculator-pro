'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Share2, Printer } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

// 2024 Federal Tax Brackets (Single)
const federalTaxBrackets = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

// State tax rates (simplified average)
const stateTaxRates: { [key: string]: number } = {
  'AK': 0, 'FL': 0, 'NV': 0, 'SD': 0, 'TN': 0, 'TX': 0, 'WA': 0, 'WY': 0,
  'CA': 0.093, 'NY': 0.065, 'NJ': 0.0637, 'HI': 0.11, 'OR': 0.099,
  'MN': 0.0985, 'DC': 0.0975, 'VT': 0.0875, 'IA': 0.0853, 'WI': 0.0765,
  'ME': 0.075, 'CT': 0.07, 'ID': 0.06, 'SC': 0.07, 'WV': 0.065,
  'VA': 0.0575, 'GA': 0.0575, 'OK': 0.05, 'MO': 0.054, 'MT': 0.0675,
  'KS': 0.057, 'NM': 0.059, 'UT': 0.0495, 'NC': 0.0499, 'IL': 0.0495,
  'RI': 0.0599, 'AR': 0.055, 'KY': 0.05, 'MS': 0.05, 'LA': 0.0425,
  'AL': 0.05, 'MI': 0.0425, 'AZ': 0.045, 'OH': 0.0399, 'IN': 0.0323,
  'ND': 0.029, 'PA': 0.0307, 'CO': 0.044, 'MA': 0.05, 'NH': 0,
  'DE': 0.066, 'MD': 0.0575, 'NE': 0.0684,
};

const states = Object.keys(stateTaxRates).sort();

export default function TakeHomePaycheckCalculator() {
  const [inputs, setInputs] = useState({
    grossSalary: '80000',
    payPeriod: 'annual',
    state: 'CA',
    filingStatus: 'single',
    contribution401k: '6',
    hsaContribution: '0',
    healthInsurance: '200',
    otherDeductions: '0',
  });

  const [results, setResults] = useState<any>(null);

  const calculatePaycheck = () => {
    const grossSalary = parseFloat(inputs.grossSalary) || 0;
    const _401kPercent = parseFloat(inputs.contribution401k) || 0;
    const hsaContribution = parseFloat(inputs.hsaContribution) || 0;
    const healthInsurance = parseFloat(inputs.healthInsurance) || 0;
    const otherDeductions = parseFloat(inputs.otherDeductions) || 0;
    const stateTaxRate = stateTaxRates[inputs.state] || 0;

    // Calculate 401k contribution
    const _401kAnnual = grossSalary * (_401kPercent / 100);

    // Calculate taxable income (gross - 401k - HSA)
    const taxableIncome = grossSalary - _401kAnnual - hsaContribution;

    // Federal Tax (progressive)
    let federalTax = 0;
    let remainingIncome = taxableIncome;
    
    for (let i = 0; i < federalTaxBrackets.length; i++) {
      const bracket = federalTaxBrackets[i];
      if (remainingIncome <= 0) break;
      
      const taxableInBracket = Math.min(
        remainingIncome,
        bracket.max - bracket.min
      );
      
      federalTax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
    }

    // FICA (Social Security + Medicare)
    const socialSecurityTax = Math.min(grossSalary * 0.062, 168600 * 0.062);
    const medicareTax = grossSalary * 0.0145;
    const additionalMedicareTax = grossSalary > 200000 ? (grossSalary - 200000) * 0.009 : 0;
    const ficaTax = socialSecurityTax + medicareTax + additionalMedicareTax;

    // State Tax
    const stateTax = taxableIncome * stateTaxRate;

    // Total Deductions
    const totalTax = federalTax + ficaTax + stateTax;
    const totalPreTaxDeductions = _401kAnnual + hsaContribution;
    const totalPostTaxDeductions = (healthInsurance * 12) + (otherDeductions * 12);
    const totalDeductions = totalTax + totalPreTaxDeductions + totalPostTaxDeductions;

    // Net Pay
    const netPayAnnual = grossSalary - totalDeductions;
    const netPayMonthly = netPayAnnual / 12;
    const netPayBiweekly = netPayAnnual / 26;
    const netPayWeekly = netPayAnnual / 52;

    // Effective Tax Rate
    const effectiveTaxRate = (totalTax / grossSalary) * 100;

    setResults({
      grossSalary,
      netPayAnnual,
      netPayMonthly,
      netPayBiweekly,
      netPayWeekly,
      federalTax,
      stateTax,
      ficaTax,
      socialSecurityTax,
      medicareTax,
      additionalMedicareTax,
      _401kAnnual,
      hsaContribution,
      totalPreTaxDeductions,
      totalPostTaxDeductions,
      totalDeductions,
      effectiveTaxRate,
    });
  };

  useEffect(() => {
    if (inputs.grossSalary) {
      calculatePaycheck();
    }
  }, [inputs]);

  const chartData = results ? [
    { name: 'Net Pay', value: results.netPayAnnual, color: '#10b981' },
    { name: 'Federal Tax', value: results.federalTax, color: '#ef4444' },
    { name: 'State Tax', value: results.stateTax, color: '#f59e0b' },
    { name: 'FICA Tax', value: results.ficaTax, color: '#3b82f6' },
    { name: '401(k)', value: results._401kAnnual, color: '#8b5cf6' },
    { name: 'Other', value: results.totalPostTaxDeductions + results.hsaContribution, color: '#6b7280' },
  ] : [];

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const { shareUrl, shareText } = useShare({
    title: 'Take-Home Paycheck Calculator',
    text: results ? `Gross Salary: $${results.grossSalary.toLocaleString()}, Net Pay: $${results.netPayAnnual.toLocaleString()}/year` : '',
  });

  const handleSave = async () => {
    const element = document.getElementById('paycheck-results');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'paycheck-calculation.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          {/* Basic Inputs */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl sm:text-2xl">Salary Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="grossSalary" className="text-sm font-medium">Annual Gross Salary</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="grossSalary"
                    type="number"
                    value={inputs.grossSalary}
                    onChange={(e) => handleInputChange('grossSalary', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="80000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium">State</Label>
                <select
                  id="state"
                  value={inputs.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {states.map(state => (
                    <option key={state} value={state}>{state} ({(stateTaxRates[state] * 100).toFixed(2)}%)</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="filingStatus" className="text-sm font-medium">Filing Status</Label>
                <select
                  id="filingStatus"
                  value={inputs.filingStatus}
                  onChange={(e) => handleInputChange('filingStatus', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="single">Single</option>
                  <option value="married">Married Filing Jointly</option>
                  <option value="head">Head of Household</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Pre-Tax Deductions */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-lg sm:text-xl">Pre-Tax Deductions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contribution401k" className="text-sm font-medium">
                  401(k) Contribution (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <div className="relative">
                  <input
                    id="contribution401k"
                    type="number"
                    value={inputs.contribution401k}
                    onChange={(e) => handleInputChange('contribution401k', e.target.value)}
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="6"
                    min="0"
                    max="100"
                    step="0.5"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500">Default: 6% (2024 Limit: $23,000 or $30,500 if age 50+)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hsaContribution" className="text-sm font-medium">
                  HSA Annual Contribution <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="hsaContribution"
                    type="number"
                    value={inputs.hsaContribution}
                    onChange={(e) => handleInputChange('hsaContribution', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-gray-500">Default: $0 (2024 Limit: $4,150 Individual / $8,300 Family)</p>
              </div>
            </CardContent>
          </Card>

          {/* Post-Tax Deductions */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="text-lg sm:text-xl">Post-Tax Deductions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="healthInsurance" className="text-sm font-medium">
                  Health Insurance (Monthly) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="healthInsurance"
                    type="number"
                    value={inputs.healthInsurance}
                    onChange={(e) => handleInputChange('healthInsurance', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="200"
                  />
                </div>
                <p className="text-xs text-gray-500">Default: $200/month</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherDeductions" className="text-sm font-medium">
                  Other Deductions (Monthly) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="otherDeductions"
                    type="number"
                    value={inputs.otherDeductions}
                    onChange={(e) => handleInputChange('otherDeductions', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-gray-500">Default: $0 (FSA, Commuter Benefits, Union Dues, etc.)</p>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={calculatePaycheck}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Paycheck
          </Button>
        </div>

        {/* Results Section */}
        {results && (
          <div className="xl:col-span-2 space-y-6" id="paycheck-results">
            {/* Net Pay Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Annual Net Pay</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 break-all">
                    ${results.netPayAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Monthly Net Pay</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 break-all">
                    ${results.netPayMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Bi-Weekly Net Pay</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 break-all">
                    ${results.netPayBiweekly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Weekly Net Pay</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 break-all">
                    ${results.netPayWeekly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tax Breakdown */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                <CardTitle className="text-xl sm:text-2xl">Tax Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">Federal Income Tax</span>
                    <span className="text-sm sm:text-base font-semibold text-red-600">
                      ${results.federalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">State Income Tax</span>
                    <span className="text-sm sm:text-base font-semibold text-orange-600">
                      ${results.stateTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">Social Security (6.2%)</span>
                    <span className="text-sm sm:text-base font-semibold text-blue-600">
                      ${results.socialSecurityTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">Medicare (1.45%)</span>
                    <span className="text-sm sm:text-base font-semibold text-blue-600">
                      ${results.medicareTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  {results.additionalMedicareTax > 0 && (
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm sm:text-base text-gray-700">Additional Medicare (0.9%)</span>
                      <span className="text-sm sm:text-base font-semibold text-blue-600">
                        ${results.additionalMedicareTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-3 border-t-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">Total Taxes</span>
                    <span className="text-base sm:text-lg font-bold text-red-600">
                      ${(results.federalTax + results.stateTax + results.ficaTax).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Effective Tax Rate</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {results.effectiveTaxRate.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deductions Breakdown */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="text-xl sm:text-2xl">Deductions Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">401(k) Contribution</span>
                    <span className="text-sm sm:text-base font-semibold text-purple-600">
                      ${results._401kAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">HSA Contribution</span>
                    <span className="text-sm sm:text-base font-semibold text-purple-600">
                      ${results.hsaContribution.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">Post-Tax Deductions</span>
                    <span className="text-sm sm:text-base font-semibold text-pink-600">
                      ${results.totalPostTaxDeductions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">Total Deductions</span>
                    <span className="text-base sm:text-lg font-bold text-purple-600">
                      ${results.totalDeductions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl sm:text-2xl">Income Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleSave} variant="outline" className="flex-1 min-w-[120px]">
                <Download className="h-4 w-4 mr-2" />
                Save Image
              </Button>
              <Button onClick={handlePrint} variant="outline" className="flex-1 min-w-[120px]">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button onClick={() => window.navigator.share?.({ title: shareText, url: shareUrl })} variant="outline" className="flex-1 min-w-[120px]">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

