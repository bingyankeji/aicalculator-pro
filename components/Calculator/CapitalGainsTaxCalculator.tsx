'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import html2canvas from 'html2canvas';

export default function CapitalGainsTaxCalculator() {
  const [inputs, setInputs] = useState({
    purchasePrice: '100000',
    salePrice: '150000',
    purchaseDate: '2020-01-01',
    saleDate: '2024-01-01',
    annualIncome: '80000',
    filingStatus: 'single',
    state: 'CA',
    costBasisAdjustments: '0', // improvements, fees, etc.
    capitalLosses: '0', // capital losses to offset
    niitExempt: 'no', // whether exempt from NIIT
  });

  const [results, setResults] = useState<any>(null);

  // State capital gains tax rates (approximate)
  const stateCapitalGainsTaxRates: { [key: string]: number } = {
    'AL': 0.05, 'AK': 0, 'AZ': 0.045, 'AR': 0.059, 'CA': 0.133,
    'CO': 0.045, 'CT': 0.0699, 'DE': 0.066, 'FL': 0, 'GA': 0.0575,
    'HI': 0.11, 'ID': 0.06, 'IL': 0.0495, 'IN': 0.0323, 'IA': 0.0853,
    'KS': 0.057, 'KY': 0.05, 'LA': 0.0425, 'ME': 0.0715, 'MD': 0.0575,
    'MA': 0.05, 'MI': 0.0425, 'MN': 0.0985, 'MS': 0.05, 'MO': 0.054,
    'MT': 0.0675, 'NE': 0.0684, 'NV': 0, 'NH': 0, 'NJ': 0.1075,
    'NM': 0.059, 'NY': 0.109, 'NC': 0.0499, 'ND': 0.029, 'OH': 0.0399,
    'OK': 0.05, 'OR': 0.099, 'PA': 0.0307, 'RI': 0.0599, 'SC': 0.07,
    'SD': 0, 'TN': 0, 'TX': 0, 'UT': 0.0485, 'VT': 0.0875,
    'VA': 0.0575, 'WA': 0, 'WV': 0.065, 'WI': 0.0765, 'WY': 0
  };

  const states = Object.keys(stateCapitalGainsTaxRates).sort();

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateCapitalGainsTax = () => {
    const purchasePrice = parseFloat(inputs.purchasePrice) || 0;
    const salePrice = parseFloat(inputs.salePrice) || 0;
    const costBasisAdjustments = parseFloat(inputs.costBasisAdjustments) || 0;
    const capitalLosses = parseFloat(inputs.capitalLosses) || 0;
    const annualIncome = parseFloat(inputs.annualIncome) || 0;

    // Calculate holding period
    const purchaseDate = new Date(inputs.purchaseDate);
    const saleDate = new Date(inputs.saleDate);
    const holdingDays = Math.floor((saleDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
    const holdingYears = (holdingDays / 365).toFixed(2);
    const isLongTerm = holdingDays > 365;

    // Calculate capital gain
    const adjustedCostBasis = purchasePrice + costBasisAdjustments;
    const capitalGain = salePrice - adjustedCostBasis;

    // Apply capital losses (max $3,000 against ordinary income)
    const lossDeduction = Math.min(capitalLosses, 3000);
    const netCapitalGain = Math.max(0, capitalGain - capitalLosses);

    // Federal capital gains tax rates
    let federalTaxRate = 0;
    if (!isLongTerm) {
      // Short-term: ordinary income tax rates
      if (inputs.filingStatus === 'single') {
        if (annualIncome <= 11000) federalTaxRate = 0.10;
        else if (annualIncome <= 44725) federalTaxRate = 0.12;
        else if (annualIncome <= 95375) federalTaxRate = 0.22;
        else if (annualIncome <= 182100) federalTaxRate = 0.24;
        else if (annualIncome <= 231250) federalTaxRate = 0.32;
        else if (annualIncome <= 578125) federalTaxRate = 0.35;
        else federalTaxRate = 0.37;
      } else { // married
        if (annualIncome <= 22000) federalTaxRate = 0.10;
        else if (annualIncome <= 89050) federalTaxRate = 0.12;
        else if (annualIncome <= 190750) federalTaxRate = 0.22;
        else if (annualIncome <= 364200) federalTaxRate = 0.24;
        else if (annualIncome <= 462500) federalTaxRate = 0.32;
        else if (annualIncome <= 693750) federalTaxRate = 0.35;
        else federalTaxRate = 0.37;
      }
    } else {
      // Long-term: 0%, 15%, or 20%
      if (inputs.filingStatus === 'single') {
        if (annualIncome <= 44625) federalTaxRate = 0;
        else if (annualIncome <= 492300) federalTaxRate = 0.15;
        else federalTaxRate = 0.20;
      } else { // married
        if (annualIncome <= 89250) federalTaxRate = 0;
        else if (annualIncome <= 553850) federalTaxRate = 0.15;
        else federalTaxRate = 0.20;
      }
    }

    const federalTax = netCapitalGain * federalTaxRate;

    // Net Investment Income Tax (NIIT) - 3.8%
    let niitTax = 0;
    if (inputs.niitExempt === 'no') {
      const niitThreshold = inputs.filingStatus === 'single' ? 200000 : 250000;
      if (annualIncome > niitThreshold) {
        niitTax = netCapitalGain * 0.038;
      }
    }

    // State tax
    const stateTaxRate = stateCapitalGainsTaxRates[inputs.state] || 0;
    const stateTax = netCapitalGain * stateTaxRate;

    // Total tax
    const totalTax = federalTax + niitTax + stateTax;
    const netProfit = capitalGain - totalTax;
    const effectiveTaxRate = capitalGain > 0 ? (totalTax / capitalGain) * 100 : 0;

    // Tax savings strategies
    const longTermFederalRate = inputs.filingStatus === 'single' 
      ? (annualIncome <= 44625 ? 0 : annualIncome <= 492300 ? 0.15 : 0.20)
      : (annualIncome <= 89250 ? 0 : annualIncome <= 553850 ? 0.15 : 0.20);
    
    const potentialSavings = isLongTerm ? 0 : netCapitalGain * (federalTaxRate - longTermFederalRate);

    // Scenario comparison data
    const scenarios = [
      {
        name: 'Current',
        tax: totalTax,
        netProfit: netProfit,
      },
      {
        name: 'Hold 1 Year+',
        tax: isLongTerm ? totalTax : netCapitalGain * longTermFederalRate + stateTax + (inputs.niitExempt === 'no' && annualIncome > (inputs.filingStatus === 'single' ? 200000 : 250000) ? netCapitalGain * 0.038 : 0),
        netProfit: isLongTerm ? netProfit : capitalGain - (netCapitalGain * longTermFederalRate + stateTax + (inputs.niitExempt === 'no' && annualIncome > (inputs.filingStatus === 'single' ? 200000 : 250000) ? netCapitalGain * 0.038 : 0)),
      },
      {
        name: 'Tax-Loss Harvest',
        tax: capitalLosses > 0 ? Math.max(0, totalTax - (Math.min(capitalLosses, 3000) * federalTaxRate)) : totalTax,
        netProfit: capitalLosses > 0 ? netProfit + (Math.min(capitalLosses, 3000) * federalTaxRate) : netProfit,
      },
    ];

    setResults({
      purchasePrice,
      salePrice,
      adjustedCostBasis,
      capitalGain,
      netCapitalGain,
      isLongTerm,
      holdingDays,
      holdingYears,
      federalTaxRate: federalTaxRate * 100,
      federalTax,
      niitTax,
      stateTaxRate: stateTaxRate * 100,
      stateTax,
      totalTax,
      netProfit,
      effectiveTaxRate,
      lossDeduction,
      potentialSavings,
      scenarios,
    });
  };

  const handleSave = async () => {
    const element = document.getElementById('calculator-results');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'capital-gains-tax-calculation.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const shareText = `Capital Gains Tax: $${results?.totalTax.toLocaleString()} on $${results?.capitalGain.toLocaleString()} gain`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          {/* Asset Information */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl sm:text-2xl">Asset Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="purchasePrice" className="text-sm font-medium">
                  Purchase Price <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="purchasePrice"
                    type="number"
                    value={inputs.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salePrice" className="text-sm font-medium">
                  Sale Price <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="salePrice"
                    type="number"
                    value={inputs.salePrice}
                    onChange={(e) => handleInputChange('salePrice', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="150000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaseDate" className="text-sm font-medium">
                  Purchase Date <span className="text-red-500">*</span>
                </Label>
                <input
                  id="purchaseDate"
                  type="date"
                  value={inputs.purchaseDate}
                  onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="saleDate" className="text-sm font-medium">
                  Sale Date <span className="text-red-500">*</span>
                </Label>
                <input
                  id="saleDate"
                  type="date"
                  value={inputs.saleDate}
                  onChange={(e) => handleInputChange('saleDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costBasisAdjustments" className="text-sm font-medium">
                  Cost Basis Adjustments <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="costBasisAdjustments"
                    type="number"
                    value={inputs.costBasisAdjustments}
                    onChange={(e) => handleInputChange('costBasisAdjustments', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-gray-500">Default: $0 (improvements, fees, commissions)</p>
              </div>
            </CardContent>
          </Card>

          {/* Tax Information */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-lg sm:text-xl">Tax Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="annualIncome" className="text-sm font-medium">
                  Annual Income <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="annualIncome"
                    type="number"
                    value={inputs.annualIncome}
                    onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="80000"
                  />
                </div>
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
                </select>
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
                    <option key={state} value={state}>{state} ({(stateCapitalGainsTaxRates[state] * 100).toFixed(2)}%)</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capitalLosses" className="text-sm font-medium">
                  Capital Losses to Offset <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="capitalLosses"
                    type="number"
                    value={inputs.capitalLosses}
                    onChange={(e) => handleInputChange('capitalLosses', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-gray-500">Default: $0 (max $3,000 deduction against ordinary income)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="niitExempt" className="text-sm font-medium">
                  NIIT Exempt <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <select
                  id="niitExempt"
                  value={inputs.niitExempt}
                  onChange={(e) => handleInputChange('niitExempt', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="no">No - Subject to NIIT</option>
                  <option value="yes">Yes - Exempt from NIIT</option>
                </select>
                <p className="text-xs text-gray-500">3.8% Net Investment Income Tax applies if income exceeds thresholds</p>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={calculateCapitalGainsTax}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Capital Gains Tax
          </Button>
        </div>

        {/* Results Section */}
        {results && (
          <div className="xl:col-span-2 space-y-6" id="calculator-results">
            {/* Summary Card */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl sm:text-2xl">Capital Gains Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                    <p className="text-sm text-gray-600">Capital Gain</p>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                      ${results.capitalGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {results.isLongTerm ? '🟢 Long-Term' : '🔴 Short-Term'} ({results.holdingYears} years)
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-red-200">
                    <p className="text-sm text-gray-600">Total Tax</p>
                    <p className="text-2xl sm:text-3xl font-bold text-red-600">
                      ${results.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Effective Rate: {results.effectiveTaxRate.toFixed(2)}%
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                    <p className="text-sm text-gray-600">Net Profit</p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-600">
                      ${results.netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">After all taxes</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                    <p className="text-sm text-gray-600">Adjusted Cost Basis</p>
                    <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                      ${results.adjustedCostBasis.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Including adjustments</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Breakdown */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="text-xl sm:text-2xl">Tax Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">Federal Capital Gains Tax ({results.federalTaxRate.toFixed(1)}%)</span>
                    <span className="text-sm sm:text-base font-semibold text-purple-600">
                      ${results.federalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">Net Investment Income Tax (NIIT 3.8%)</span>
                    <span className="text-sm sm:text-base font-semibold text-pink-600">
                      ${results.niitTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm sm:text-base text-gray-700">State Tax ({results.stateTaxRate.toFixed(2)}%)</span>
                    <span className="text-sm sm:text-base font-semibold text-orange-600">
                      ${results.stateTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">Total Tax</span>
                    <span className="text-base sm:text-lg font-bold text-red-600">
                      ${results.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scenario Comparison */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-xl sm:text-2xl">Strategy Comparison</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={results.scenarios}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="tax" fill="#ef4444" name="Tax" />
                    <Bar dataKey="netProfit" fill="#10b981" name="Net Profit" />
                  </BarChart>
                </ResponsiveContainer>

                {!results.isLongTerm && results.potentialSavings > 0 && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-semibold text-yellow-800">💡 Tax Savings Opportunity</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      By holding this asset for more than 1 year, you could save approximately <strong>${results.potentialSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> in federal taxes due to long-term capital gains rates.
                    </p>
                  </div>
                )}

                {results.lossDeduction > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-semibold text-blue-800">📊 Capital Loss Deduction</p>
                    <p className="text-sm text-blue-700 mt-1">
                      You can deduct up to <strong>${results.lossDeduction.toLocaleString()}</strong> of capital losses against ordinary income this year.
                    </p>
                  </div>
                )}
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

