'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heart, DollarSign, AlertCircle, Download, Share2 } from 'lucide-react';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';

interface SpouseData {
  salary: number;
  interest: number;
  rental: number;
  shortTermGain: number;
  longTermGain: number;
  qualifiedDividends: number;
  retirement: number;
  filingStatus: string;
  dependents: number;
  useStandardDeduction: boolean;
  stateTaxRate: number;
  selfEmployed: boolean;
}

interface DetailedTaxResult {
  allIncome: number;
  federalIncomeTax: number;
  marginalTaxRate: number;
  socialSecurityTax: number;
  medicareTax: number;
  stateCityTax: number;
  retirement: number;
  finalTakeHome: number;
}

const MarriageTaxCalculator = () => {
  const [spouse1, setSpouse1] = useState<SpouseData>({
    salary: 65000,
    interest: 0,
    rental: 0,
    shortTermGain: 0,
    longTermGain: 0,
    qualifiedDividends: 0,
    retirement: 10000,
    filingStatus: 'single',
    dependents: 0,
    useStandardDeduction: true,
    stateTaxRate: 5,
    selfEmployed: false,
  });

  const [spouse2, setSpouse2] = useState<SpouseData>({
    salary: 45000,
    interest: 0,
    rental: 0,
    shortTermGain: 0,
    longTermGain: 0,
    qualifiedDividends: 0,
    retirement: 6000,
    filingStatus: 'single',
    dependents: 0,
    useStandardDeduction: true,
    stateTaxRate: 5,
    selfEmployed: false,
  });

  const [singleResults, setSingleResults] = useState<{ spouse1: DetailedTaxResult; spouse2: DetailedTaxResult } | null>(null);
  const [marriedResult, setMarriedResult] = useState<DetailedTaxResult | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/marriage-tax-calculator',
    getShareParams: () => ({}),
    getShareText: () => {
      return 'Marriage Tax Calculator - Compare tax filing as single vs married';
    },
  });

  // 2025 Tax brackets
  const taxBrackets = {
    single: [
      { limit: 11600, rate: 0.10 },
      { limit: 47150, rate: 0.12 },
      { limit: 100525, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243725, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ],
    married: [
      { limit: 23200, rate: 0.10 },
      { limit: 94300, rate: 0.12 },
      { limit: 201050, rate: 0.22 },
      { limit: 383900, rate: 0.24 },
      { limit: 487450, rate: 0.32 },
      { limit: 731200, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ],
  };

  const standardDeduction = {
    single: 14600,
    married: 29200,
  };

  // Social Security and Medicare rates
  const SOCIAL_SECURITY_RATE = 0.062;
  const SOCIAL_SECURITY_MAX = 168600; // 2025 limit
  const MEDICARE_RATE = 0.0145;

  // Calculate federal tax and marginal rate
  const calculateFederalTax = (taxableIncome: number, filingStatus: 'single' | 'married'): { tax: number; marginalRate: number } => {
    const brackets = taxBrackets[filingStatus];
    let tax = 0;
    let previousLimit = 0;
    let marginalRate = 0;

    for (const bracket of brackets) {
      if (taxableIncome <= previousLimit) break;
      
      const taxableInBracket = Math.min(taxableIncome, bracket.limit) - previousLimit;
      tax += taxableInBracket * bracket.rate;
      
      if (taxableIncome > previousLimit) {
        marginalRate = bracket.rate;
      }
      
      previousLimit = bracket.limit;
      
      if (taxableIncome <= bracket.limit) break;
    }

    return { tax, marginalRate };
  };

  // Calculate Social Security and Medicare taxes
  const calculatePayrollTaxes = (income: number, selfEmployed: boolean): { socialSecurity: number; medicare: number } => {
    const ssWages = Math.min(income, SOCIAL_SECURITY_MAX);
    const socialSecurity = ssWages * SOCIAL_SECURITY_RATE * (selfEmployed ? 2 : 1);
    const medicare = income * MEDICARE_RATE * (selfEmployed ? 2 : 1);
    
    return { socialSecurity, medicare };
  };

  // Calculate detailed tax for one person
  const calculateDetailedTax = (spouse: SpouseData, filingStatus: 'single' | 'married'): DetailedTaxResult => {
    const allIncome = spouse.salary + spouse.interest + spouse.rental + 
                     spouse.shortTermGain + spouse.longTermGain + spouse.qualifiedDividends;
    
    const { socialSecurity, medicare } = calculatePayrollTaxes(spouse.salary, spouse.selfEmployed);
    
    const adjustedIncome = Math.max(0, allIncome - spouse.retirement);
    const deduction = filingStatus === 'single' ? standardDeduction.single : standardDeduction.married;
    const taxableIncome = Math.max(0, adjustedIncome - deduction);
    
    const { tax: federalIncomeTax, marginalRate } = calculateFederalTax(taxableIncome, filingStatus);
    const stateCityTax = taxableIncome * (spouse.stateTaxRate / 100);
    
    const totalTax = federalIncomeTax + socialSecurity + medicare + stateCityTax;
    const finalTakeHome = allIncome - totalTax - spouse.retirement;

    return {
      allIncome,
      federalIncomeTax,
      marginalTaxRate: marginalRate * 100,
      socialSecurityTax: socialSecurity,
      medicareTax: medicare,
      stateCityTax,
      retirement: spouse.retirement,
      finalTakeHome,
    };
  };

  // Calculate married filing jointly
  const calculateMarriedTax = (): DetailedTaxResult => {
    const allIncome1 = spouse1.salary + spouse1.interest + spouse1.rental + 
                      spouse1.shortTermGain + spouse1.longTermGain + spouse1.qualifiedDividends;
    const allIncome2 = spouse2.salary + spouse2.interest + spouse2.rental + 
                      spouse2.shortTermGain + spouse2.longTermGain + spouse2.qualifiedDividends;
    
    const totalIncome = allIncome1 + allIncome2;
    const totalRetirement = spouse1.retirement + spouse2.retirement;
    
    const { socialSecurity: ss1, medicare: med1 } = calculatePayrollTaxes(spouse1.salary, spouse1.selfEmployed);
    const { socialSecurity: ss2, medicare: med2 } = calculatePayrollTaxes(spouse2.salary, spouse2.selfEmployed);
    const totalSocialSecurity = ss1 + ss2;
    const totalMedicare = med1 + med2;
    
    const adjustedIncome = Math.max(0, totalIncome - totalRetirement);
    const taxableIncome = Math.max(0, adjustedIncome - standardDeduction.married);
    
    const { tax: federalIncomeTax, marginalRate } = calculateFederalTax(taxableIncome, 'married');
    const avgStateTax = (spouse1.stateTaxRate + spouse2.stateTaxRate) / 2;
    const stateCityTax = taxableIncome * (avgStateTax / 100);
    
    const totalTax = federalIncomeTax + totalSocialSecurity + totalMedicare + stateCityTax;
    const finalTakeHome = totalIncome - totalTax - totalRetirement;

    return {
      allIncome: totalIncome,
      federalIncomeTax,
      marginalTaxRate: marginalRate * 100,
      socialSecurityTax: totalSocialSecurity,
      medicareTax: totalMedicare,
      stateCityTax,
      retirement: totalRetirement,
      finalTakeHome,
    };
  };

  const handleCalculate = () => {
    const single1 = calculateDetailedTax(spouse1, 'single');
    const single2 = calculateDetailedTax(spouse2, 'single');
    setSingleResults({ spouse1: single1, spouse2: single2 });

    const married = calculateMarriedTax();
    setMarriedResult(married);
  };

  const handleClear = () => {
    setSpouse1({
      salary: 65000,
      interest: 0,
      rental: 0,
      shortTermGain: 0,
      longTermGain: 0,
      qualifiedDividends: 0,
      retirement: 10000,
      filingStatus: 'single',
      dependents: 0,
      useStandardDeduction: true,
      stateTaxRate: 5,
      selfEmployed: false,
    });
    setSpouse2({
      salary: 45000,
      interest: 0,
      rental: 0,
      shortTermGain: 0,
      longTermGain: 0,
      qualifiedDividends: 0,
      retirement: 6000,
      filingStatus: 'single',
      dependents: 0,
      useStandardDeduction: true,
      stateTaxRate: 5,
      selfEmployed: false,
    });
    setSingleResults(null);
    setMarriedResult(null);
  };

  const handleSaveAsImage = async () => {
    if (!resultsRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `marriage-tax-${new Date().getTime()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(0)}%`;
  };

  const SpouseInputs = ({ spouse, setSpouse, label, headerColor }: { 
    spouse: SpouseData; 
    setSpouse: (data: SpouseData) => void;
    label: string;
    headerColor: string;
  }) => (
    <div className="space-y-2 p-3 bg-white rounded-lg border border-gray-200">
      <h3 className={`font-semibold text-center text-sm py-2 rounded ${headerColor}`}>{label}</h3>
      
      <div className="flex items-center gap-3">
        <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Salary+Business Income</Label>
        <Input
          type="number"
          value={spouse.salary}
          onChange={(e) => setSpouse({ ...spouse, salary: Number(e.target.value) })}
          className="h-8 text-sm flex-1 bg-white border-gray-300"
        />
      </div>

      <div className="flex items-center gap-3">
        <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Interest+Dividends Income</Label>
        <Input
          type="number"
          value={spouse.interest}
          onChange={(e) => setSpouse({ ...spouse, interest: Number(e.target.value) })}
          className="h-8 text-sm flex-1 bg-white border-gray-300"
        />
      </div>

      <div className="flex items-center gap-3">
        <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Rental, Royalty, Passive Income</Label>
        <Input
          type="number"
          value={spouse.rental}
          onChange={(e) => setSpouse({ ...spouse, rental: Number(e.target.value) })}
          className="h-8 text-sm flex-1 bg-white border-gray-300"
        />
      </div>

      <div className="flex items-center gap-3">
        <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Short Term Capital Gain</Label>
        <Input
          type="number"
          value={spouse.shortTermGain}
          onChange={(e) => setSpouse({ ...spouse, shortTermGain: Number(e.target.value) })}
          className="h-8 text-sm flex-1 bg-white border-gray-300"
        />
      </div>

      <div className="flex items-center gap-3">
        <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Long Term Capital Gain</Label>
        <Input
          type="number"
          value={spouse.longTermGain}
          onChange={(e) => setSpouse({ ...spouse, longTermGain: Number(e.target.value) })}
          className="h-8 text-sm flex-1 bg-white border-gray-300"
        />
      </div>

      <div className="flex items-center gap-3">
        <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Qualified Dividends</Label>
        <Input
          type="number"
          value={spouse.qualifiedDividends}
          onChange={(e) => setSpouse({ ...spouse, qualifiedDividends: Number(e.target.value) })}
          className="h-8 text-sm flex-1 bg-white border-gray-300"
        />
      </div>

      <div className="flex items-center gap-3">
        <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">401K, IRA... Savings</Label>
        <Input
          type="number"
          value={spouse.retirement}
          onChange={(e) => setSpouse({ ...spouse, retirement: Number(e.target.value) })}
          className="h-8 text-sm flex-1 bg-white border-gray-300"
        />
      </div>

      <div className="flex items-center gap-3">
        <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">File Status (Before Marriage)</Label>
        <select
          value={spouse.filingStatus}
          onChange={(e) => setSpouse({ ...spouse, filingStatus: e.target.value })}
          className="flex-1 h-8 px-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="single">Single</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">No. of Dependents</Label>
        <Input
          type="number"
          value={spouse.dependents}
          onChange={(e) => setSpouse({ ...spouse, dependents: Number(e.target.value) })}
          className="h-8 text-sm flex-1 bg-white border-gray-300"
        />
      </div>

      <div className="border-t pt-2">
        <Label className="text-xs font-medium text-gray-700 block mb-1">Deductions:</Label>
        <div className="text-xs text-gray-500 mb-2 leading-relaxed">
          Mortgage Interest, Charitable Donations, Student Loan Interest ($2,500 Max), Child Care Expenses ($3,000 Max), Education Tuition ($4,000 Max)
        </div>
        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name={`deduction-${label}`}
              checked={spouse.useStandardDeduction}
              onChange={() => setSpouse({ ...spouse, useStandardDeduction: true })}
              className="w-3.5 h-3.5"
            />
            <span className="text-xs text-gray-700">Use Standard Deduction?</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name={`deduction-${label}`}
              checked={!spouse.useStandardDeduction}
              onChange={() => setSpouse({ ...spouse, useStandardDeduction: false })}
              className="w-3.5 h-3.5"
            />
            <span className="text-xs text-gray-700">no</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">State+City Tax Rate (%)</Label>
        <Input
          type="number"
          value={spouse.stateTaxRate}
          onChange={(e) => setSpouse({ ...spouse, stateTaxRate: Number(e.target.value) })}
          className="h-8 text-sm flex-1 bg-white border-gray-300"
          step="0.1"
        />
      </div>

      <div className="flex items-center gap-3">
        <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Self-Employed</Label>
        <div className="flex items-center gap-4 text-sm flex-1">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name={`employed-${label}`}
              checked={!spouse.selfEmployed}
              onChange={() => setSpouse({ ...spouse, selfEmployed: false })}
              className="w-3.5 h-3.5"
            />
            <span className="text-xs text-gray-700">no</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name={`employed-${label}`}
              checked={spouse.selfEmployed}
              onChange={() => setSpouse({ ...spouse, selfEmployed: true })}
              className="w-3.5 h-3.5"
            />
            <span className="text-xs text-gray-700">yes</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Input */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Heart className="h-5 w-5 text-blue-600" />
              Marriage Tax Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <SpouseInputs
                spouse={spouse1}
                setSpouse={setSpouse1}
                label="Spouse 1"
                headerColor="bg-blue-50 text-blue-900"
              />
              <SpouseInputs
                spouse={spouse2}
                setSpouse={setSpouse2}
                label="Spouse 2"
                headerColor="bg-gray-100 text-gray-900"
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                onClick={handleCalculate}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Calculate
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="flex-1"
              >
                Clear
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-gray-600">
              <AlertCircle className="h-3.5 w-3.5 inline mr-1 text-blue-600" />
              The results above are estimation only. They are based on many assumptions to balance accuracy and simplicity.
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Results */}
        <div>
          {singleResults && marriedResult ? (
            <Card ref={resultsRef} className="shadow-sm border border-gray-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  Tax Comparison Results
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-2 py-2 text-left font-semibold"></th>
                        <th className="border border-gray-300 px-2 py-2 text-center font-semibold bg-gray-600 text-white" colSpan={3}>
                          If Not Married
                        </th>
                        <th className="border border-gray-300 px-2 py-2 text-center font-semibold">If Married</th>
                      </tr>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-2 py-2 text-left text-xs"></th>
                        <th className="border border-gray-300 px-2 py-2 text-center text-xs bg-blue-100">Spouse 1</th>
                        <th className="border border-gray-300 px-2 py-2 text-center text-xs bg-green-100">Spouse 2</th>
                        <th className="border border-gray-300 px-2 py-2 text-center text-xs">Combined</th>
                        <th className="border border-gray-300 px-2 py-2 text-center text-xs">If Married</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1.5 font-medium text-xs">All Income</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse1.allIncome)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse2.allIncome)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse1.allIncome + singleResults.spouse2.allIncome)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(marriedResult.allIncome)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1.5 font-medium text-xs">Federal Income Tax</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse1.federalIncomeTax)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse2.federalIncomeTax)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse1.federalIncomeTax + singleResults.spouse2.federalIncomeTax)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(marriedResult.federalIncomeTax)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1.5 font-medium text-xs">Marginal Tax Rate</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatPercent(singleResults.spouse1.marginalTaxRate)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatPercent(singleResults.spouse2.marginalTaxRate)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs"></td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatPercent(marriedResult.marginalTaxRate)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1.5 font-medium text-xs">Social Security Tax</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse1.socialSecurityTax)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse2.socialSecurityTax)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse1.socialSecurityTax + singleResults.spouse2.socialSecurityTax)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(marriedResult.socialSecurityTax)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1.5 font-medium text-xs">Medicare Tax</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse1.medicareTax)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse2.medicareTax)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse1.medicareTax + singleResults.spouse2.medicareTax)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(marriedResult.medicareTax)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1.5 font-medium text-xs">State+City Income Tax</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse1.stateCityTax)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse2.stateCityTax)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse1.stateCityTax + singleResults.spouse2.stateCityTax)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(marriedResult.stateCityTax)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1.5 font-medium text-xs">401K, IRA...</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse1.retirement)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse2.retirement)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse1.retirement + singleResults.spouse2.retirement)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(marriedResult.retirement)}</td>
                      </tr>
                      <tr className="bg-blue-50 font-semibold">
                        <td className="border border-gray-300 px-2 py-1.5 text-xs">Final Take Home</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse1.finalTakeHome)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse2.finalTakeHome)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(singleResults.spouse1.finalTakeHome + singleResults.spouse2.finalTakeHome)}</td>
                        <td className="border border-gray-300 px-2 py-1.5 text-right text-xs">{formatCurrency(marriedResult.finalTakeHome)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                  <Button
                    onClick={handleSaveAsImage}
                    variant="outline"
                    className="flex-1 text-sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Save as Image
                  </Button>
                  <Button
                    onClick={handlePrint}
                    variant="outline"
                    className="flex-1 text-sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1 text-sm"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="p-12 flex items-center justify-center min-h-[600px]">
                <div className="text-center">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No Results Yet</p>
                  <p className="text-gray-400 text-sm">
                    Enter income information and click "Calculate" to see tax comparison
                  </p>
                </div>
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
      />
    </div>
  );
};

export default MarriageTaxCalculator;
