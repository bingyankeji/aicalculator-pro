'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, TrendingUp, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

interface AmortizationRow {
  year: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

// CMHC insurance rates based on down payment percentage
const getCMHCRate = (downPaymentPercent: number): number => {
  if (downPaymentPercent >= 20) return 0;
  if (downPaymentPercent >= 15) return 2.8;
  if (downPaymentPercent >= 10) return 3.1;
  if (downPaymentPercent >= 5) return 4.0;
  return 0; // Below 5% not allowed
};

// Provincial land transfer tax rates (average estimates)
const PROVINCIAL_TAX_RATES: { [key: string]: { rate: number; rebate: number } } = {
  'ON': { rate: 0.02, rebate: 4000 }, // Ontario
  'BC': { rate: 0.02, rebate: 8000 }, // British Columbia
  'AB': { rate: 0, rebate: 0 }, // Alberta (no land transfer tax)
  'QC': { rate: 0.015, rebate: 0 }, // Quebec
  'MB': { rate: 0.02, rebate: 0 }, // Manitoba
  'SK': { rate: 0.003, rebate: 0 }, // Saskatchewan
  'NS': { rate: 0.015, rebate: 0 }, // Nova Scotia
  'NB': { rate: 0.01, rebate: 0 }, // New Brunswick
  'NL': { rate: 0.004, rebate: 0 }, // Newfoundland and Labrador
  'PE': { rate: 0.01, rebate: 0 }, // Prince Edward Island
};

export default function CanadianMortgageCalculator() {
  const [homePrice, setHomePrice] = useState('800000');
  const [downPayment, setDownPayment] = useState('20');
  const [downPaymentType, setDownPaymentType] = useState<'percent' | 'dollar'>('percent');
  const [interestRate, setInterestRate] = useState('5');
  const [amortization, setAmortization] = useState('25');
  const [paymentFrequency, setPaymentFrequency] = useState<'monthly' | 'biweekly' | 'weekly' | 'accelerated-biweekly' | 'accelerated-weekly'>('monthly');
  const [province, setProvince] = useState('ON');
  const [propertyTax, setPropertyTax] = useState('0.3');
  const [homeInsurance, setHomeInsurance] = useState('2500');
  const [condoFee, setCondoFee] = useState('0');
  const [otherCosts, setOtherCosts] = useState('6000');
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);
  const [includeOptionals, setIncludeOptionals] = useState(true);
  
  const [result, setResult] = useState<{
    mortgageAmount: number;
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    cmhcInsurance: number;
    landTransferTax: number;
    monthlyPropertyTax: number;
    monthlyInsurance: number;
    monthlyCondoFee: number;
    monthlyOtherCosts: number;
    totalMonthlyPayment: number;
    downPaymentAmount: number;
    downPaymentPercent: number;
    totalUpfrontCosts: number;
    amortizationSchedule: AmortizationRow[];
    stressTestRate: number;
    stressTestPayment: number;
    qualifyingIncome: number;
  } | null>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);
  
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/canadian-mortgage-calculator',
    getShareParams: () => ({
      p: homePrice,
      d: downPayment,
      r: interestRate,
      a: amortization,
    }),
    getShareText: () => {
      if (result) {
        return `Canadian Mortgage: $${result.monthlyPayment.toFixed(2)}/month for $${parseInt(homePrice).toLocaleString()} home`;
      }
      return 'Calculate your Canadian mortgage with CMHC insurance and provincial taxes!';
    },
  });

  const calculateMortgage = () => {
    const price = parseFloat(homePrice);
    const rate = parseFloat(interestRate);
    const years = parseFloat(amortization);
    
    if (!price || !rate || !years) {
      alert('Please enter valid values for home price, interest rate, and amortization period.');
      return;
    }
    
    if (price <= 0 || rate <= 0 || years <= 0) {
      alert('Values must be greater than zero.');
      return;
    }
    
    // Calculate down payment
    let downPaymentAmount: number;
    let downPaymentPercent: number;
    
    if (downPaymentType === 'percent') {
      downPaymentPercent = parseFloat(downPayment);
      downPaymentAmount = (price * downPaymentPercent) / 100;
    } else {
      downPaymentAmount = parseFloat(downPayment);
      downPaymentPercent = (downPaymentAmount / price) * 100;
    }
    
    // Validate down payment (minimum 5% in Canada)
    if (downPaymentPercent < 5) {
      alert('Minimum down payment in Canada is 5%.');
      return;
    }
    
    // Calculate CMHC insurance
    const loanAmount = price - downPaymentAmount;
    const cmhcRate = getCMHCRate(downPaymentPercent);
    const cmhcInsurance = loanAmount * (cmhcRate / 100);
    
    // Total mortgage amount (loan + CMHC insurance)
    const mortgageAmount = loanAmount + cmhcInsurance;
    
    // Calculate mortgage payment based on frequency
    const annualRate = rate / 100;
    let periodsPerYear: number;
    let effectiveRate: number;
    
    switch (paymentFrequency) {
      case 'monthly':
        periodsPerYear = 12;
        effectiveRate = annualRate / 12;
        break;
      case 'biweekly':
        periodsPerYear = 26;
        effectiveRate = annualRate / 26;
        break;
      case 'weekly':
        periodsPerYear = 52;
        effectiveRate = annualRate / 52;
        break;
      case 'accelerated-biweekly':
        periodsPerYear = 26;
        effectiveRate = annualRate / 26;
        break;
      case 'accelerated-weekly':
        periodsPerYear = 52;
        effectiveRate = annualRate / 52;
        break;
      default:
        periodsPerYear = 12;
        effectiveRate = annualRate / 12;
    }
    
    const totalPayments = years * periodsPerYear;
    
    // Calculate payment using Canadian mortgage formula (semi-annual compounding)
    const semiAnnualRate = Math.pow(1 + annualRate / 2, 2) - 1;
    const periodRate = Math.pow(1 + semiAnnualRate, 1 / periodsPerYear) - 1;
    
    let payment: number;
    if (paymentFrequency === 'accelerated-biweekly' || paymentFrequency === 'accelerated-weekly') {
      // Accelerated payments: take monthly payment and divide by frequency
      const monthlyRate = Math.pow(1 + semiAnnualRate, 1 / 12) - 1;
      const monthlyPayment = mortgageAmount * (monthlyRate * Math.pow(1 + monthlyRate, years * 12)) / (Math.pow(1 + monthlyRate, years * 12) - 1);
      payment = paymentFrequency === 'accelerated-biweekly' ? monthlyPayment / 2 : monthlyPayment / 4;
    } else {
      payment = mortgageAmount * (periodRate * Math.pow(1 + periodRate, totalPayments)) / (Math.pow(1 + periodRate, totalPayments) - 1);
    }
    
    const totalPayment = payment * totalPayments;
    const totalInterest = totalPayment - mortgageAmount;
    
    // Convert to monthly for display
    const monthlyPayment = paymentFrequency === 'monthly' ? payment :
                          paymentFrequency === 'biweekly' ? (payment * 26) / 12 :
                          paymentFrequency === 'weekly' ? (payment * 52) / 12 :
                          paymentFrequency === 'accelerated-biweekly' ? (payment * 26) / 12 :
                          (payment * 52) / 12;
    
    // Calculate land transfer tax
    const taxInfo = PROVINCIAL_TAX_RATES[province] || { rate: 0.015, rebate: 0 };
    let landTransferTax = price * taxInfo.rate;
    if (isFirstTimeBuyer) {
      landTransferTax = Math.max(0, landTransferTax - taxInfo.rebate);
    }
    
    // Calculate other monthly costs
    const monthlyPropertyTax = (price * parseFloat(propertyTax) / 100) / 12;
    const monthlyInsurance = parseFloat(homeInsurance) / 12;
    const monthlyCondoFee = parseFloat(condoFee) / 12;
    const monthlyOtherCosts = parseFloat(otherCosts) / 12;
    
    const totalMonthlyPayment = monthlyPayment + 
      (includeOptionals ? (monthlyPropertyTax + monthlyInsurance + monthlyCondoFee + monthlyOtherCosts) : 0);
    
    // Total upfront costs
    const totalUpfrontCosts = downPaymentAmount + cmhcInsurance + landTransferTax + parseFloat(homeInsurance);
    
    // Generate amortization schedule (annual)
    const amortizationSchedule: AmortizationRow[] = [];
    let balance = mortgageAmount;
    const monthlyRate = Math.pow(1 + semiAnnualRate, 1 / 12) - 1;
    const actualMonthlyPayment = mortgageAmount * (monthlyRate * Math.pow(1 + monthlyRate, years * 12)) / (Math.pow(1 + monthlyRate, years * 12) - 1);
    
    for (let year = 1; year <= years && balance > 0; year++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      
      for (let month = 1; month <= 12 && balance > 0; month++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = Math.min(actualMonthlyPayment - interestPayment, balance);
        
        yearPrincipal += principalPayment;
        yearInterest += interestPayment;
        balance -= principalPayment;
      }
      
      amortizationSchedule.push({
        year,
        payment: yearPrincipal + yearInterest,
        principal: yearPrincipal,
        interest: yearInterest,
        balance: Math.max(0, balance),
      });
    }
    
    // Stress test calculation (qualifying rate is higher of contract rate + 2% or 5.25%)
    const stressTestRate = Math.max(rate + 2, 5.25);
    const stressAnnualRate = stressTestRate / 100;
    const stressSemiAnnualRate = Math.pow(1 + stressAnnualRate / 2, 2) - 1;
    const stressMonthlyRate = Math.pow(1 + stressSemiAnnualRate, 1 / 12) - 1;
    const stressTestPayment = mortgageAmount * (stressMonthlyRate * Math.pow(1 + stressMonthlyRate, years * 12)) / (Math.pow(1 + stressMonthlyRate, years * 12) - 1);
    
    // Qualifying income (GDS ratio should be ≤39% for conventional mortgages)
    const totalMonthlyHousingCost = stressTestPayment + monthlyPropertyTax + monthlyInsurance + monthlyCondoFee;
    const qualifyingIncome = (totalMonthlyHousingCost / 0.39) * 12;
    
    setResult({
      mortgageAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
      cmhcInsurance,
      landTransferTax,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyCondoFee,
      monthlyOtherCosts,
      totalMonthlyPayment,
      downPaymentAmount,
      downPaymentPercent,
      totalUpfrontCosts,
      amortizationSchedule,
      stressTestRate,
      stressTestPayment,
      qualifyingIncome,
    });
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `canadian-mortgage-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Canadian Mortgage Calculation</title>
              <style>
                body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print {
                  body { padding: 0; }
                  img { max-width: 100%; page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" onload="window.print();"/>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
      alert('Failed to print. Please try again.');
    }
  };

  const pieData = result ? [
    { name: 'Mortgage Payment', value: result.monthlyPayment, color: '#1e40af' },
    { name: 'Property Tax', value: includeOptionals ? result.monthlyPropertyTax : 0, color: '#059669' },
    { name: 'Home Insurance', value: includeOptionals ? result.monthlyInsurance : 0, color: '#0891b2' },
    { name: 'Other Costs', value: includeOptionals ? (result.monthlyCondoFee + result.monthlyOtherCosts) : 0, color: '#dc2626' },
  ].filter(item => item.value > 0) : [];

  const CHART_COLORS = ['#1e40af', '#059669', '#0891b2', '#dc2626', '#7c3aed'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Canadian Mortgage Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Home Price */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Home Price <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    step="1000"
                    value={homePrice}
                    onChange={(e) => setHomePrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="800000"
                  />
                </div>
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Down Payment <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    {downPaymentType === 'dollar' && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    )}
                    <input
                      type="number"
                      step={downPaymentType === 'percent' ? '0.1' : '1000'}
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      className={`w-full ${downPaymentType === 'dollar' ? 'pl-8' : 'pl-4'} pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500`}
                      placeholder={downPaymentType === 'percent' ? '20' : '160000'}
                    />
                    {downPaymentType === 'percent' && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    )}
                  </div>
                  <select
                    value={downPaymentType}
                    onChange={(e) => setDownPaymentType(e.target.value as 'percent' | 'dollar')}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="percent">%</option>
                    <option value="dollar">$</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500">Minimum 5% required in Canada</p>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Annual Interest Rate <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="5"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              {/* Amortization Period */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Amortization Period <span className="text-red-500">*</span>
                </Label>
                <select
                  value={amortization}
                  onChange={(e) => setAmortization(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="5">5 years</option>
                  <option value="10">10 years</option>
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="25">25 years</option>
                  <option value="30">30 years</option>
                </select>
                <p className="text-xs text-gray-500">Maximum 25 years if down payment {'<'} 20%</p>
              </div>

              {/* Payment Frequency */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Payment Frequency
                </Label>
                <select
                  value={paymentFrequency}
                  onChange={(e) => setPaymentFrequency(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="monthly">Monthly</option>
                  <option value="biweekly">Bi-weekly (26 payments/year)</option>
                  <option value="weekly">Weekly (52 payments/year)</option>
                  <option value="accelerated-biweekly">Accelerated Bi-weekly</option>
                  <option value="accelerated-weekly">Accelerated Weekly</option>
                </select>
                <p className="text-xs text-gray-500">Accelerated payments save interest</p>
              </div>

              {/* Province */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Province
                </Label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ON">Ontario</option>
                  <option value="BC">British Columbia</option>
                  <option value="AB">Alberta</option>
                  <option value="QC">Quebec</option>
                  <option value="MB">Manitoba</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="PE">Prince Edward Island</option>
                </select>
                <p className="text-xs text-gray-500">Affects land transfer tax calculation</p>
              </div>

              {/* First Time Buyer */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="firstTimeBuyer"
                  checked={isFirstTimeBuyer}
                  onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="firstTimeBuyer" className="text-sm text-gray-700">
                  First-time home buyer (eligible for rebates)
                </label>
              </div>

              {/* Include Optionals */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeOptionals"
                  checked={includeOptionals}
                  onChange={(e) => setIncludeOptionals(e.target.checked)}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="includeOptionals" className="text-sm font-semibold text-gray-900">
                  Include Optional Costs
                </label>
              </div>

              {includeOptionals && (
                <>
                  {/* Property Tax */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Property Tax Rate <span className="text-gray-500 text-xs">- Optional</span>
                    </Label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={propertyTax}
                        onChange={(e) => setPropertyTax(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="0.3"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%/year</span>
                    </div>
                  </div>

                  {/* Home Insurance */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Home Insurance <span className="text-gray-500 text-xs">- Optional</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        step="100"
                        value={homeInsurance}
                        onChange={(e) => setHomeInsurance(e.target.value)}
                        className="w-full pl-8 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="2500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">/year</span>
                    </div>
                  </div>

                  {/* Condo/HOA Fee */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Condo/HOA Fee <span className="text-gray-500 text-xs">- Optional</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        step="50"
                        value={condoFee}
                        onChange={(e) => setCondoFee(e.target.value)}
                        className="w-full pl-8 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">/month</span>
                    </div>
                  </div>

                  {/* Other Costs */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Other Costs <span className="text-gray-500 text-xs">- Optional</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        step="100"
                        value={otherCosts}
                        onChange={(e) => setOtherCosts(e.target.value)}
                        className="w-full pl-8 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="6000"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">/year</span>
                    </div>
                  </div>
                </>
              )}

              <Button 
                onClick={calculateMortgage}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6" ref={resultRef}>
          {result ? (
            <>
              {/* Monthly Payment Summary */}
              <Card className="shadow-lg border-2 border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900 flex items-center justify-between">
                    <span>Monthly Payment</span>
                    <span className="text-3xl font-bold text-blue-700">
                      ${result.totalMonthlyPayment.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Monthly</p>
                      <p className="text-2xl font-bold text-blue-700">
                        ${result.totalMonthlyPayment.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${(result.totalPayment + (includeOptionals ? (result.monthlyPropertyTax + result.monthlyInsurance + result.monthlyCondoFee + result.monthlyOtherCosts) * 12 * parseFloat(amortization) : 0)).toLocaleString('en-CA', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Mortgage Payment</span>
                      <span className="text-lg font-bold text-blue-700">
                        ${result.monthlyPayment.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    {includeOptionals && (
                      <>
                        {result.monthlyPropertyTax > 0 && (
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">Property Tax</span>
                            <span className="text-lg font-bold text-gray-900">
                              ${result.monthlyPropertyTax.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        )}
                        {result.monthlyInsurance > 0 && (
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">Home Insurance</span>
                            <span className="text-lg font-bold text-gray-900">
                              ${result.monthlyInsurance.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        )}
                        {result.monthlyCondoFee > 0 && (
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">Condo/HOA Fee</span>
                            <span className="text-lg font-bold text-gray-900">
                              ${result.monthlyCondoFee.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        )}
                        {result.monthlyOtherCosts > 0 && (
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">Other Costs</span>
                            <span className="text-lg font-bold text-gray-900">
                              ${result.monthlyOtherCosts.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Pie Chart */}
                  {pieData.length > 1 && (
                    <div className="mt-6">
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => `$${value.toLocaleString('en-CA', { minimumFractionDigits: 2 })}`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Mortgage Details */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Mortgage Details</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Home Price</p>
                      <p className="text-xl font-bold text-gray-900">${parseInt(homePrice).toLocaleString('en-CA')}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Down Payment</p>
                      <p className="text-xl font-bold text-gray-900">
                        ${result.downPaymentAmount.toLocaleString('en-CA', { maximumFractionDigits: 0 })} ({result.downPaymentPercent.toFixed(1)}%)
                      </p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Loan Amount</p>
                      <p className="text-xl font-bold text-gray-900">
                        ${(parseInt(homePrice) - result.downPaymentAmount).toLocaleString('en-CA', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Total Interest</p>
                      <p className="text-xl font-bold text-red-700">
                        ${result.totalInterest.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CMHC Insurance & Costs */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">CMHC Insurance & Upfront Costs</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {result.cmhcInsurance > 0 ? (
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-900">CMHC Insurance Required</h4>
                          <p className="text-sm text-amber-800 mt-1">
                            Down payment is less than 20%. CMHC mortgage default insurance is required and added to your mortgage.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-900">No CMHC Insurance Required</h4>
                          <p className="text-sm text-green-800 mt-1">
                            Down payment is 20% or more. No mortgage default insurance needed.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Down Payment</span>
                      <span className="text-lg font-bold text-gray-900">
                        ${result.downPaymentAmount.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    {result.cmhcInsurance > 0 && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">CMHC Insurance</span>
                        <span className="text-lg font-bold text-gray-900">
                          ${result.cmhcInsurance.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Land Transfer Tax ({province})</span>
                      <span className="text-lg font-bold text-gray-900">
                        ${result.landTransferTax.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Home Insurance (First Year)</span>
                      <span className="text-lg font-bold text-gray-900">
                        ${parseFloat(homeInsurance).toLocaleString('en-CA', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-100 border-2 border-blue-300 rounded-lg">
                      <span className="text-sm font-bold text-blue-900">Total Upfront Costs</span>
                      <span className="text-xl font-bold text-blue-700">
                        ${result.totalUpfrontCosts.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stress Test */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Mortgage Stress Test</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                    <p className="text-sm text-blue-900">
                      Canadian mortgage stress test requires you to qualify at the higher of your contract rate + 2% or 5.25%.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Contract Rate</span>
                      <span className="text-lg font-bold text-gray-900">{parseFloat(interestRate).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Qualifying Rate</span>
                      <span className="text-lg font-bold text-amber-700">{result.stressTestRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Qualifying Payment</span>
                      <span className="text-lg font-bold text-amber-700">
                        ${result.stressTestPayment.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-100 border-2 border-blue-300 rounded-lg">
                      <span className="text-sm font-bold text-blue-900">Minimum Annual Income Required</span>
                      <span className="text-xl font-bold text-blue-700">
                        ${result.qualifyingIncome.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 mt-4">
                    * Based on GDS ratio ≤39%. Actual qualifying criteria may vary by lender.
                  </p>
                </CardContent>
              </Card>

              {/* Amortization Schedule */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Amortization Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {/* Amortization Chart */}
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={result.amortizationSchedule}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value: number) => `$${value.toLocaleString('en-CA', { maximumFractionDigits: 0 })}`} />
                      <Legend />
                      <Line type="monotone" dataKey="balance" stroke="#1e40af" strokeWidth={2} name="Balance" />
                      <Line type="monotone" dataKey="interest" stroke="#dc2626" strokeWidth={2} name="Interest" />
                      <Line type="monotone" dataKey="principal" stroke="#059669" strokeWidth={2} name="Principal" />
                    </LineChart>
                  </ResponsiveContainer>

                  {/* Amortization Table */}
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Year</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">Principal</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">Interest</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {result.amortizationSchedule.slice(0, 10).map((row) => (
                          <tr key={row.year} className="hover:bg-gray-50">
                            <td className="px-4 py-3">{row.year}</td>
                            <td className="px-4 py-3 text-right text-green-700 font-semibold">
                              ${row.principal.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
                            </td>
                            <td className="px-4 py-3 text-right text-red-700">
                              ${row.interest.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold">
                              ${row.balance.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {result.amortizationSchedule.length > 10 && (
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Showing first 10 years of {result.amortizationSchedule.length} year schedule
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">
                  Enter your mortgage details and click Calculate
                </p>
                <p className="text-sm text-gray-400">
                  Includes CMHC insurance, land transfer tax, and stress test
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
        <Button 
          onClick={handleSaveAsImage} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Download className="h-4 w-4" />
          Save as Image
        </Button>
        
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Printer className="h-4 w-4" />
          Print Results
        </Button>
        
        <Button 
          onClick={handleShare} 
          variant="outline" 
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share Calculator
        </Button>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Canadian Mortgage Calculator"
      />
    </div>
  );
}

