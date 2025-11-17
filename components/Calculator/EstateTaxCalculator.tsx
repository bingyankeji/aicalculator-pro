'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, TrendingUp, AlertCircle, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface EstateTaxResults {
  totalEstateValue: number;
  federalExemption: number;
  stateExemption: number;
  taxableEstateFederal: number;
  taxableEstateState: number;
  federalEstateTax: number;
  stateEstateTax: number;
  totalEstateTax: number;
  effectiveTaxRate: number;
  netEstateValue: number;
  beneficiaryInheritance: number;
  charitableDeduction: number;
  maritalDeduction: number;
  totalDeductions: number;
  portabilityAvailable: number;
  taxSavingsStrategies: Array<{ strategy: string; potentialSavings: number; description: string }>;
}

export default function EstateTaxCalculator() {
  const [inputs, setInputs] = useState({
    estateValue: '15000000',
    realEstate: '5000000',
    investments: '7000000',
    businessAssets: '2000000',
    otherAssets: '1000000',
    debts: '500000',
    funeralExpenses: '50000',
    maritalStatus: 'married',
    spouseUSCitizen: 'yes',
    charitableDonations: '0',
    state: 'NY',
    priorGifts: '0',
    deceasedSpouseExemption: '0',
  });

  const [results, setResults] = useState<EstateTaxResults | null>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/estate-tax-calculator',
    getShareParams: () => ({
      ev: inputs.estateValue,
      re: inputs.realEstate,
      inv: inputs.investments,
      ba: inputs.businessAssets,
      oa: inputs.otherAssets,
      d: inputs.debts,
      fe: inputs.funeralExpenses,
      ms: inputs.maritalStatus,
      cd: inputs.charitableDonations,
      st: inputs.state,
    }),
    getShareText: () => 
      results 
        ? `Estate Tax Analysis: Total tax ${results.totalEstateTax.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} | Net estate: ${results.netEstateValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}`
        : 'Check out my estate tax calculation!',
  });

  // State estate tax rates and exemptions (2024)
  const stateEstateTaxData: { [key: string]: { exemption: number; hasEstateTax: boolean; topRate: number } } = {
    'CT': { exemption: 13610000, hasEstateTax: true, topRate: 0.12 },
    'HI': { exemption: 5490000, hasEstateTax: true, topRate: 0.20 },
    'IL': { exemption: 4000000, hasEstateTax: true, topRate: 0.16 },
    'ME': { exemption: 6410000, hasEstateTax: true, topRate: 0.12 },
    'MD': { exemption: 5000000, hasEstateTax: true, topRate: 0.16 },
    'MA': { exemption: 2000000, hasEstateTax: true, topRate: 0.16 },
    'MN': { exemption: 3000000, hasEstateTax: true, topRate: 0.16 },
    'NY': { exemption: 6940000, hasEstateTax: true, topRate: 0.16 },
    'OR': { exemption: 1000000, hasEstateTax: true, topRate: 0.16 },
    'RI': { exemption: 1733264, hasEstateTax: true, topRate: 0.16 },
    'VT': { exemption: 5000000, hasEstateTax: true, topRate: 0.16 },
    'WA': { exemption: 2193000, hasEstateTax: true, topRate: 0.20 },
  };

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

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
      setTimeout(calculateEstateTax, 100);
    }
  }, []);

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateFederalEstateTax = (taxableAmount: number): number => {
    // 2024 Federal Estate Tax Rates (progressive brackets)
    const brackets = [
      { limit: 10000, rate: 0.18 },
      { limit: 20000, rate: 0.20 },
      { limit: 40000, rate: 0.22 },
      { limit: 60000, rate: 0.24 },
      { limit: 80000, rate: 0.26 },
      { limit: 100000, rate: 0.28 },
      { limit: 150000, rate: 0.30 },
      { limit: 250000, rate: 0.32 },
      { limit: 500000, rate: 0.34 },
      { limit: 750000, rate: 0.37 },
      { limit: 1000000, rate: 0.39 },
      { limit: Infinity, rate: 0.40 },
    ];

    let tax = 0;
    let previousLimit = 0;

    for (const bracket of brackets) {
      if (taxableAmount <= previousLimit) break;
      
      const taxableInBracket = Math.min(taxableAmount, bracket.limit) - previousLimit;
      tax += taxableInBracket * bracket.rate;
      previousLimit = bracket.limit;
      
      if (taxableAmount <= bracket.limit) break;
    }

    return tax;
  };

  const calculateEstateTax = () => {
    const estateValue = parseFloat(inputs.estateValue) || 0;
    const realEstate = parseFloat(inputs.realEstate) || 0;
    const investments = parseFloat(inputs.investments) || 0;
    const businessAssets = parseFloat(inputs.businessAssets) || 0;
    const otherAssets = parseFloat(inputs.otherAssets) || 0;
    const debts = parseFloat(inputs.debts) || 0;
    const funeralExpenses = parseFloat(inputs.funeralExpenses) || 0;
    const charitableDonations = parseFloat(inputs.charitableDonations) || 0;
    const priorGifts = parseFloat(inputs.priorGifts) || 0;
    const deceasedSpouseExemption = parseFloat(inputs.deceasedSpouseExemption) || 0;

    // Calculate total gross estate
    const totalGrossEstate = estateValue > 0 ? estateValue : (realEstate + investments + businessAssets + otherAssets);

    // Federal exemption (2024: $13.61M per person)
    const federalExemption = 13610000;
    
    // Portability: deceased spouse's unused exemption
    const portabilityAvailable = deceasedSpouseExemption;
    const totalFederalExemption = federalExemption + portabilityAvailable;

    // Marital deduction (unlimited for US citizen spouse)
    let maritalDeduction = 0;
    if (inputs.maritalStatus === 'married' && inputs.spouseUSCitizen === 'yes') {
      maritalDeduction = totalGrossEstate; // Unlimited marital deduction
    }

    // Charitable deduction
    const charitableDeduction = charitableDonations;

    // Total deductions
    const totalDeductions = debts + funeralExpenses + maritalDeduction + charitableDeduction;

    // Adjusted gross estate
    const adjustedGrossEstate = Math.max(0, totalGrossEstate - debts - funeralExpenses);

    // Taxable estate (after marital and charitable deductions)
    const taxableEstateBeforeExemption = Math.max(0, adjustedGrossEstate - maritalDeduction - charitableDeduction);

    // Add back prior taxable gifts
    const taxableEstateWithGifts = taxableEstateBeforeExemption + priorGifts;

    // Federal taxable estate (after exemption)
    const taxableEstateFederal = Math.max(0, taxableEstateWithGifts - totalFederalExemption);

    // Calculate federal estate tax
    const federalEstateTax = calculateFederalEstateTax(taxableEstateFederal);

    // State estate tax
    const stateData = stateEstateTaxData[inputs.state];
    let stateEstateTax = 0;
    let stateExemption = 0;
    let taxableEstateState = 0;

    if (stateData && stateData.hasEstateTax) {
      stateExemption = stateData.exemption;
      taxableEstateState = Math.max(0, taxableEstateBeforeExemption - stateExemption);
      
      // Simplified state tax calculation (progressive, similar to federal)
      if (taxableEstateState > 0) {
        stateEstateTax = taxableEstateState * stateData.topRate;
      }
    }

    // Total estate tax
    const totalEstateTax = federalEstateTax + stateEstateTax;

    // Net estate value
    const netEstateValue = Math.max(0, totalGrossEstate - totalEstateTax - debts - funeralExpenses);

    // Effective tax rate
    const effectiveTaxRate = totalGrossEstate > 0 ? (totalEstateTax / totalGrossEstate) * 100 : 0;

    // Beneficiary inheritance (after all taxes and expenses)
    const beneficiaryInheritance = netEstateValue - charitableDeduction;

    // Tax savings strategies
    const taxSavingsStrategies = [
      {
        strategy: 'Spousal Transfer (Marital Deduction)',
        potentialSavings: inputs.maritalStatus === 'married' && inputs.spouseUSCitizen === 'yes' 
          ? totalEstateTax 
          : (taxableEstateBeforeExemption > 0 ? calculateFederalEstateTax(Math.max(0, taxableEstateBeforeExemption - federalExemption)) : 0),
        description: 'Transfer assets to spouse tax-free (unlimited marital deduction)'
      },
      {
        strategy: 'Charitable Donations',
        potentialSavings: charitableDonations > 0 
          ? calculateFederalEstateTax(Math.max(0, taxableEstateBeforeExemption - federalExemption)) - federalEstateTax
          : (taxableEstateBeforeExemption * 0.40 * 0.20),
        description: `Donate ${charitableDonations > 0 ? charitableDonations.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : '20%'} to qualified charities`
      },
      {
        strategy: 'Lifetime Gifting',
        potentialSavings: totalGrossEstate * 0.10 * 0.40,
        description: 'Annual gift tax exclusion ($18,000/person in 2024) reduces estate'
      },
      {
        strategy: 'Irrevocable Life Insurance Trust (ILIT)',
        potentialSavings: totalGrossEstate * 0.05 * 0.40,
        description: 'Remove life insurance proceeds from taxable estate'
      },
      {
        strategy: 'Grantor Retained Annuity Trust (GRAT)',
        potentialSavings: totalGrossEstate * 0.15 * 0.40,
        description: 'Transfer appreciating assets with minimal gift tax'
      },
    ];

    setResults({
      totalEstateValue: totalGrossEstate,
      federalExemption: totalFederalExemption,
      stateExemption,
      taxableEstateFederal,
      taxableEstateState,
      federalEstateTax,
      stateEstateTax,
      totalEstateTax,
      effectiveTaxRate,
      netEstateValue,
      beneficiaryInheritance,
      charitableDeduction,
      maritalDeduction,
      totalDeductions,
      portabilityAvailable,
      taxSavingsStrategies,
    });

    // Update URL with current inputs
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleSaveAsImage = async () => {
    const element = document.getElementById('estate-tax-results');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = 'estate-tax-calculator-results.png';
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
                <DollarSign className="h-5 w-5 text-blue-600" />
                Estate Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="estateValue" className="text-sm font-medium">
                  Total Estate Value ($) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="estateValue"
                  type="number"
                  value={inputs.estateValue}
                  onChange={(e) => handleInputChange('estateValue', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="15000000"
                  min="0"
                  step="100000"
                  required
                />
                <p className="text-xs text-gray-500">Or enter asset breakdown below</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="realEstate" className="text-sm font-medium">
                  Real Estate ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="realEstate"
                  type="number"
                  value={inputs.realEstate}
                  onChange={(e) => handleInputChange('realEstate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5000000"
                  min="0"
                  step="100000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="investments" className="text-sm font-medium">
                  Investments ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="investments"
                  type="number"
                  value={inputs.investments}
                  onChange={(e) => handleInputChange('investments', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="7000000"
                  min="0"
                  step="100000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessAssets" className="text-sm font-medium">
                  Business Assets ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="businessAssets"
                  type="number"
                  value={inputs.businessAssets}
                  onChange={(e) => handleInputChange('businessAssets', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2000000"
                  min="0"
                  step="100000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherAssets" className="text-sm font-medium">
                  Other Assets ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="otherAssets"
                  type="number"
                  value={inputs.otherAssets}
                  onChange={(e) => handleInputChange('otherAssets', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1000000"
                  min="0"
                  step="100000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="debts" className="text-sm font-medium">
                  Debts & Liabilities ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="debts"
                  type="number"
                  value={inputs.debts}
                  onChange={(e) => handleInputChange('debts', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="500000"
                  min="0"
                  step="10000"
                />
                <p className="text-xs text-gray-500">Default: $500,000</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="funeralExpenses" className="text-sm font-medium">
                  Funeral & Admin Expenses ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="funeralExpenses"
                  type="number"
                  value={inputs.funeralExpenses}
                  onChange={(e) => handleInputChange('funeralExpenses', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="50000"
                  min="0"
                  step="10000"
                />
                <p className="text-xs text-gray-500">Default: $50,000</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maritalStatus" className="text-sm font-medium">
                  Marital Status <span className="text-red-500">*</span>
                </Label>
                <select
                  id="maritalStatus"
                  value={inputs.maritalStatus}
                  onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="widowed">Widowed</option>
                  <option value="divorced">Divorced</option>
                </select>
              </div>

              {inputs.maritalStatus === 'married' && (
                <div className="space-y-2">
                  <Label htmlFor="spouseUSCitizen" className="text-sm font-medium">
                    Spouse US Citizen? <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="spouseUSCitizen"
                    value={inputs.spouseUSCitizen}
                    onChange={(e) => handleInputChange('spouseUSCitizen', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  <p className="text-xs text-gray-500">Unlimited marital deduction for US citizen spouse</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="charitableDonations" className="text-sm font-medium">
                  Charitable Donations ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="charitableDonations"
                  type="number"
                  value={inputs.charitableDonations}
                  onChange={(e) => handleInputChange('charitableDonations', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  step="100000"
                />
                <p className="text-xs text-gray-500">Reduces taxable estate (unlimited deduction)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium">
                  State <span className="text-red-500">*</span>
                </Label>
                <select
                  id="state"
                  value={inputs.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {states.map(state => (
                    <option key={state} value={state}>
                      {state} {stateEstateTaxData[state]?.hasEstateTax ? '(Has Estate Tax)' : ''}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500">12 states have estate tax</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priorGifts" className="text-sm font-medium">
                  Prior Taxable Gifts ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="priorGifts"
                  type="number"
                  value={inputs.priorGifts}
                  onChange={(e) => handleInputChange('priorGifts', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  step="100000"
                />
                <p className="text-xs text-gray-500">Lifetime gifts above annual exclusion</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deceasedSpouseExemption" className="text-sm font-medium">
                  Deceased Spouse's Unused Exemption ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="deceasedSpouseExemption"
                  type="number"
                  value={inputs.deceasedSpouseExemption}
                  onChange={(e) => handleInputChange('deceasedSpouseExemption', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  max="13610000"
                  step="100000"
                />
                <p className="text-xs text-gray-500">Portability: transfer deceased spouse's unused exemption</p>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculateEstateTax}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Estate Tax
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" id="estate-tax-results">
          {results && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="shadow-lg border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Estate Value</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {results.totalEstateValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Estate Tax</p>
                    <p className="text-2xl font-bold text-red-600">
                      {results.totalEstateTax.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{results.effectiveTaxRate.toFixed(2)}% effective rate</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Net Estate to Heirs</p>
                    <p className="text-2xl font-bold text-green-600">
                      {results.beneficiaryInheritance.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Tax Breakdown */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                  <CardTitle>Estate Tax Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Federal Estate Tax</span>
                      <span className="text-lg font-bold text-gray-900">
                        {results.federalEstateTax.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    
                    {results.stateEstateTax > 0 && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">State Estate Tax ({inputs.state})</span>
                        <span className="text-lg font-bold text-gray-900">
                          {results.stateEstateTax.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-t-2 border-blue-500">
                      <span className="text-gray-900 font-bold">Total Estate Tax</span>
                      <span className="text-xl font-bold text-blue-600">
                        {results.totalEstateTax.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Exemptions & Deductions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Federal Exemption (2024)</span>
                        <span className="font-medium text-gray-900">
                          {results.federalExemption.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      {results.stateExemption > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">State Exemption ({inputs.state})</span>
                          <span className="font-medium text-gray-900">
                            {results.stateExemption.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      )}
                      {results.maritalDeduction > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Marital Deduction</span>
                          <span className="font-medium text-green-600">
                            {results.maritalDeduction.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      )}
                      {results.charitableDeduction > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Charitable Deduction</span>
                          <span className="font-medium text-green-600">
                            {results.charitableDeduction.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tax Savings Strategies */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Tax Minimization Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    {results.taxSavingsStrategies.map((strategy, index) => (
                      <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{strategy.strategy}</h4>
                          <span className="text-green-600 font-bold">
                            {strategy.potentialSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{strategy.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Total Potential Savings:</strong> {' '}
                      {results.taxSavingsStrategies.reduce((sum, s) => sum + s.potentialSavings, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      Consult with an estate planning attorney to implement these strategies.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Important Alerts */}
              {results.totalEstateTax > 5000000 && (
                <Card className="shadow-lg border-l-4 border-l-red-500">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-3">
                      <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-red-900 mb-2">High Estate Tax Alert</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          Your estate tax exceeds $5 million. Consider immediate estate planning strategies:
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1 ml-4">
                          <li>• Set up irrevocable trusts to remove assets from taxable estate</li>
                          <li>• Maximize annual gift tax exclusions ($18,000/person in 2024)</li>
                          <li>• Consider family limited partnerships (FLPs)</li>
                          <li>• Use qualified personal residence trusts (QPRTs)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

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
                  Enter your estate information and click "Calculate Estate Tax" to see your tax liability and savings strategies.
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
        calculatorName="Estate Tax Calculator"
      />
    </div>
  );
}

