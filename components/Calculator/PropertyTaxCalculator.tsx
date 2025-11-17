'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Share2, Printer, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

// State property tax rates (average effective rates %)
const stateTaxRates: { [key: string]: number } = {
  'AL': 0.41, 'AK': 1.04, 'AZ': 0.62, 'AR': 0.61, 'CA': 0.73,
  'CO': 0.51, 'CT': 2.14, 'DE': 0.57, 'FL': 0.86, 'GA': 0.83,
  'HI': 0.28, 'ID': 0.63, 'IL': 2.27, 'IN': 0.81, 'IA': 1.53,
  'KS': 1.33, 'KY': 0.85, 'LA': 0.55, 'ME': 1.36, 'MD': 1.09,
  'MA': 1.23, 'MI': 1.54, 'MN': 1.12, 'MS': 0.79, 'MO': 0.97,
  'MT': 0.84, 'NE': 1.73, 'NV': 0.60, 'NH': 2.18, 'NJ': 2.49,
  'NM': 0.80, 'NY': 1.72, 'NC': 0.84, 'ND': 0.98, 'OH': 1.56,
  'OK': 0.90, 'OR': 0.97, 'PA': 1.58, 'RI': 1.63, 'SC': 0.57,
  'SD': 1.31, 'TN': 0.67, 'TX': 1.80, 'UT': 0.60, 'VT': 1.90,
  'VA': 0.82, 'WA': 0.92, 'WV': 0.58, 'WI': 1.85, 'WY': 0.61,
  'DC': 0.56,
};

const states = Object.keys(stateTaxRates).sort();

// Common exemptions
const exemptionTypes = [
  { name: 'None', amount: 0 },
  { name: 'Homestead (Standard)', amount: 25000 },
  { name: 'Homestead (Enhanced)', amount: 50000 },
  { name: 'Senior Citizen', amount: 35000 },
  { name: 'Veteran', amount: 40000 },
  { name: 'Disabled Veteran (100%)', amount: 100000 },
];

export default function PropertyTaxCalculator() {
  const [inputs, setInputs] = useState({
    homeValue: '400000',
    state: 'CA',
    assessmentRatio: '100',
    customTaxRate: '',
    exemption: '0',
    customExemption: '0',
    yearsToProject: '10',
  });

  const [results, setResults] = useState<any>(null);

  const calculatePropertyTax = () => {
    const homeValue = parseFloat(inputs.homeValue) || 0;
    const assessmentRatio = parseFloat(inputs.assessmentRatio) || 100;
    const taxRate = inputs.customTaxRate ? parseFloat(inputs.customTaxRate) : stateTaxRates[inputs.state] || 0;
    const exemptionAmount = parseFloat(inputs.exemption) + parseFloat(inputs.customExemption);
    const yearsToProject = parseInt(inputs.yearsToProject) || 10;

    // Calculate assessed value
    const assessedValue = homeValue * (assessmentRatio / 100);

    // Apply exemption
    const taxableValue = Math.max(0, assessedValue - exemptionAmount);

    // Annual property tax
    const annualTax = taxableValue * (taxRate / 100);
    const monthlyEscrow = annualTax / 12;
    const quarterlyPayment = annualTax / 4;

    // Calculate tax as percentage of home value
    const effectiveTaxRate = (annualTax / homeValue) * 100;

    // SALT deduction limit
    const saltDeductionLimit = 10000;
    const saltDeductible = Math.min(annualTax, saltDeductionLimit);
    const nonDeductible = Math.max(0, annualTax - saltDeductionLimit);

    // Tax savings (assuming 24% marginal tax rate)
    const federalTaxSavings = saltDeductible * 0.24;

    // Historical projection (2% annual increase)
    const taxProjection = [];
    let projectedHomeValue = homeValue;
    let cumulativeTax = 0;
    
    for (let year = 1; year <= yearsToProject; year++) {
      projectedHomeValue *= 1.02; // 2% annual appreciation
      const projectedAssessed = projectedHomeValue * (assessmentRatio / 100);
      const projectedTaxable = Math.max(0, projectedAssessed - exemptionAmount);
      const projectedTax = projectedTaxable * (taxRate / 100);
      cumulativeTax += projectedTax;
      
      taxProjection.push({
        year,
        tax: projectedTax,
        homeValue: projectedHomeValue,
        cumulativeTax,
      });
    }

    // Calculate lifetime property tax (30 years with 2% increases)
    let lifetimeTax = 0;
    let tempValue = homeValue;
    for (let year = 1; year <= 30; year++) {
      tempValue *= 1.02;
      const tempAssessed = tempValue * (assessmentRatio / 100);
      const tempTaxable = Math.max(0, tempAssessed - exemptionAmount);
      lifetimeTax += tempTaxable * (taxRate / 100);
    }

    setResults({
      homeValue,
      assessedValue,
      taxableValue,
      annualTax,
      monthlyEscrow,
      quarterlyPayment,
      effectiveTaxRate,
      taxRate,
      exemptionAmount,
      saltDeductionLimit,
      saltDeductible,
      nonDeductible,
      federalTaxSavings,
      netAnnualTax: annualTax - federalTaxSavings,
      taxProjection,
      lifetimeTax,
    });
  };

  useEffect(() => {
    if (inputs.homeValue) {
      calculatePropertyTax();
    }
  }, [inputs]);

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const { shareUrl, shareText } = useShare({
    title: 'Property Tax Calculator',
    text: results ? `Home Value: $${results.homeValue.toLocaleString()}, Annual Tax: $${results.annualTax.toLocaleString()}` : '',
  });

  const handleSave = async () => {
    const element = document.getElementById('property-tax-results');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'property-tax-calculation.png';
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
              <CardTitle className="text-xl sm:text-2xl">Property Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="homeValue" className="text-sm font-medium">Home Value</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="homeValue"
                    type="number"
                    value={inputs.homeValue}
                    onChange={(e) => handleInputChange('homeValue', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="400000"
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
                    <option key={state} value={state}>
                      {state} ({stateTaxRates[state].toFixed(2)}% avg rate)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="exemption" className="text-sm font-medium">Exemption Type</Label>
                <select
                  id="exemption"
                  value={inputs.exemption}
                  onChange={(e) => handleInputChange('exemption', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {exemptionTypes.map(type => (
                    <option key={type.name} value={type.amount}>
                      {type.name} {type.amount > 0 && `($${type.amount.toLocaleString()})`}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-lg sm:text-xl">Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assessmentRatio" className="text-sm font-medium">
                  Assessment Ratio (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <div className="relative">
                  <input
                    id="assessmentRatio"
                    type="number"
                    value={inputs.assessmentRatio}
                    onChange={(e) => handleInputChange('assessmentRatio', e.target.value)}
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100"
                    min="0"
                    max="100"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500">Default: 100% of home value</p>
              </div>

                  <div className="space-y-2">
                    <Label htmlFor="customTaxRate" className="text-sm font-medium">Custom Tax Rate (%) - Optional</Label>
                    <div className="relative">
                      <input
                        id="customTaxRate"
                        type="number"
                        value={inputs.customTaxRate}
                        onChange={(e) => handleInputChange('customTaxRate', e.target.value)}
                        className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`${stateTaxRates[inputs.state].toFixed(2)} (state avg)`}
                        step="0.01"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                    <p className="text-xs text-gray-500">Leave blank to use state average</p>
                  </div>

              <div className="space-y-2">
                <Label htmlFor="customExemption" className="text-sm font-medium">
                  Additional Exemption <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="customExemption"
                    type="number"
                    value={inputs.customExemption}
                    onChange={(e) => handleInputChange('customExemption', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-gray-500">Default: $0 (any additional exemptions you qualify for)</p>
              </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="text-lg sm:text-xl">Projection Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="yearsToProject" className="text-sm font-medium">
                  Years to Project <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="yearsToProject"
                  type="number"
                  value={inputs.yearsToProject}
                  onChange={(e) => handleInputChange('yearsToProject', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10"
                  min="1"
                  max="30"
                />
                <p className="text-xs text-gray-500">Default: 10 years (assumes 2% annual home value increase)</p>
              </div>
                </CardContent>
              </Card>

          <Button
            onClick={calculatePropertyTax}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Property Tax
          </Button>
        </div>

        {/* Results Section */}
        {results && (
          <div className="xl:col-span-2 space-y-6" id="property-tax-results">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Annual Tax</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl sm:text-3xl font-bold text-red-600 break-all">
                    ${results.annualTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Monthly Escrow</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl sm:text-3xl font-bold text-orange-600 break-all">
                    ${results.monthlyEscrow.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Effective Tax Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                    {results.effectiveTaxRate.toFixed(2)}%
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
                    <span className="text-sm sm:text-base text-gray-700">Home Value</span>
                    <span className="text-sm sm:text-base font-semibold">
                      ${results.homeValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">Assessed Value</span>
                    <span className="text-sm sm:text-base font-semibold">
                      ${results.assessedValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">Exemption Amount</span>
                    <span className="text-sm sm:text-base font-semibold text-green-600">
                      -${results.exemptionAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">Taxable Value</span>
                    <span className="text-sm sm:text-base font-semibold">
                      ${results.taxableValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">Tax Rate</span>
                    <span className="text-sm sm:text-base font-semibold">
                      {results.taxRate.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">Annual Property Tax</span>
                    <span className="text-base sm:text-lg font-bold text-red-600">
                      ${results.annualTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Quarterly Payment</span>
                    <span className="text-sm font-semibold">
                      ${results.quarterlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SALT Deduction */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="text-xl sm:text-2xl">Federal Tax Deduction (SALT)</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">SALT Deduction Limit</span>
                    <span className="text-sm sm:text-base font-semibold">
                      ${results.saltDeductionLimit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">Deductible Amount</span>
                    <span className="text-sm sm:text-base font-semibold text-green-600">
                      ${results.saltDeductible.toLocaleString()}
                    </span>
                  </div>
                  {results.nonDeductible > 0 && (
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm sm:text-base text-gray-700">Non-Deductible</span>
                      <span className="text-sm sm:text-base font-semibold text-red-600">
                        ${results.nonDeductible.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">Federal Tax Savings (est.)</span>
                    <span className="text-sm sm:text-base font-semibold text-green-600">
                      -${results.federalTaxSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">Net Annual Tax Cost</span>
                    <span className="text-base sm:text-lg font-bold text-blue-600">
                      ${results.netAnnualTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
                {results.nonDeductible > 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-800">
                      Your property tax exceeds the $10,000 SALT deduction limit. You cannot deduct the full amount on your federal taxes.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tax Projection Chart */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl sm:text-2xl">Tax Projection ({inputs.yearsToProject} Years)</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={results.taxProjection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'Tax ($)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Line type="monotone" dataKey="tax" stroke="#ef4444" name="Annual Tax" strokeWidth={2} />
                    <Line type="monotone" dataKey="cumulativeTax" stroke="#3b82f6" name="Cumulative Tax" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Tax ({inputs.yearsToProject} years)</p>
                    <p className="text-xl font-bold text-blue-600">
                      ${results.taxProjection[results.taxProjection.length - 1]?.cumulativeTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">30-Year Lifetime Tax</p>
                    <p className="text-xl font-bold text-purple-600">
                      ${results.lifetimeTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
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

