'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, TrendingUp, DollarSign, Percent, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface APRInputs {
  loanType: 'personal' | 'auto' | 'mortgage' | 'creditCard';
  loanAmount: string;
  nominalRate: string;
  loanTerm: string;
  termUnit: 'months' | 'years';
  originationFee: string;
  applicationFee: string;
  processingFee: string;
  closingCosts: string;
  annualFee: string;
  pointsPaid: string;
  compoundingFrequency: 'monthly' | 'daily';
  
  // Credit Card Specific
  purchaseAPR: string;
  balanceTransferAPR: string;
  cashAdvanceAPR: string;
  balanceTransferFee: string;
  cashAdvanceFee: string;
}

interface APRResults {
  trueAPR: number;
  nominalRate: number;
  effectiveAPR: number;
  totalLoanCost: number;
  totalFeesIncluded: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPaid: number;
  aprVsNominalDifference: number;
  costBreakdown: {
    principal: number;
    interest: number;
    fees: number;
  };
  creditCardAPRs?: {
    purchase: number;
    balanceTransfer: number;
    balanceTransferWithFee: number;
    cashAdvance: number;
    cashAdvanceWithFee: number;
  };
  comparisonData: Array<{
    scenario: string;
    apr: number;
    totalCost: number;
    monthlyCost: number;
  }>;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function APRCalculator() {
  const [inputs, setInputs] = useState<APRInputs>({
    loanType: 'personal',
    loanAmount: '',
    nominalRate: '',
    loanTerm: '',
    termUnit: 'months',
    originationFee: '0',
    applicationFee: '0',
    processingFee: '0',
    closingCosts: '0',
    annualFee: '0',
    pointsPaid: '0',
    compoundingFrequency: 'monthly',
    purchaseAPR: '',
    balanceTransferAPR: '',
    cashAdvanceAPR: '',
    balanceTransferFee: '3',
    cashAdvanceFee: '5',
  });

  const [results, setResults] = useState<APRResults | null>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/apr-calculator',
    getShareParams: () => {
      const params: Record<string, string> = {};
      if (inputs.loanType) params.type = inputs.loanType;
      if (inputs.loanAmount) params.amount = inputs.loanAmount;
      if (inputs.nominalRate) params.rate = inputs.nominalRate;
      if (inputs.loanTerm) params.term = inputs.loanTerm;
      return params;
    },
    getShareText: () => {
      if (!results) return 'Check out my APR analysis!';
      return `True APR: ${results.trueAPR.toFixed(2)}% (vs nominal ${results.nominalRate.toFixed(2)}%). Total cost: $${results.totalPaid.toLocaleString()}. APR Calculator`;
    },
  });

  const handleInputChange = (field: keyof APRInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateAPR = () => {
    const amount = parseFloat(inputs.loanAmount) || 0;
    const nominalRate = parseFloat(inputs.nominalRate) / 100 || 0;
    const termMonths = inputs.termUnit === 'years' 
      ? (parseFloat(inputs.loanTerm) || 0) * 12 
      : parseFloat(inputs.loanTerm) || 0;
    
    // Calculate all fees
    const originationFee = (parseFloat(inputs.originationFee) / 100) * amount || 0;
    const applicationFee = parseFloat(inputs.applicationFee) || 0;
    const processingFee = parseFloat(inputs.processingFee) || 0;
    const closingCosts = parseFloat(inputs.closingCosts) || 0;
    const annualFee = parseFloat(inputs.annualFee) || 0;
    const pointsPaid = (parseFloat(inputs.pointsPaid) / 100) * amount || 0;
    
    const totalUpfrontFees = originationFee + applicationFee + processingFee + closingCosts + pointsPaid;
    const totalAnnualFees = annualFee * (termMonths / 12);
    const totalFees = totalUpfrontFees + totalAnnualFees;

    // Calculate monthly payment using standard loan formula
    const monthlyRate = nominalRate / 12;
    let monthlyPayment = 0;
    
    if (monthlyRate > 0) {
      monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    } else {
      monthlyPayment = amount / termMonths;
    }

    const totalInterest = (monthlyPayment * termMonths) - amount;
    const totalPaid = monthlyPayment * termMonths + totalFees;

    // Calculate True APR using iterative method (Newton-Raphson)
    // True APR accounts for all fees as part of the financing cost
    const netLoanAmount = amount - totalUpfrontFees; // Amount actually received
    let aprGuess = nominalRate;
    let iterations = 0;
    const maxIterations = 100;
    const tolerance = 0.0001;

    while (iterations < maxIterations) {
      const monthlyAPR = aprGuess / 12;
      let pv = 0;
      
      // Calculate present value of all payments
      for (let i = 1; i <= termMonths; i++) {
        pv += monthlyPayment / Math.pow(1 + monthlyAPR, i);
        // Add annual fees to payments
        if (annualFee > 0 && i % 12 === 0) {
          pv += annualFee / Math.pow(1 + monthlyAPR, i);
        }
      }
      
      const diff = pv - netLoanAmount;
      
      if (Math.abs(diff) < tolerance) {
        break;
      }
      
      // Adjust guess
      if (diff > 0) {
        aprGuess += 0.0001;
      } else {
        aprGuess -= 0.0001;
      }
      
      iterations++;
    }

    const trueAPR = aprGuess;

    // Calculate effective APR (with compounding)
    const effectiveAPR = inputs.compoundingFrequency === 'daily'
      ? Math.pow(1 + trueAPR / 365, 365) - 1
      : Math.pow(1 + trueAPR / 12, 12) - 1;

    // Credit Card APRs
    let creditCardAPRs;
    if (inputs.loanType === 'creditCard') {
      const purchaseAPR = parseFloat(inputs.purchaseAPR) / 100 || 0;
      const balanceTransferAPR = parseFloat(inputs.balanceTransferAPR) / 100 || 0;
      const cashAdvanceAPR = parseFloat(inputs.cashAdvanceAPR) / 100 || 0;
      const btFee = parseFloat(inputs.balanceTransferFee) / 100 || 0;
      const caFee = parseFloat(inputs.cashAdvanceFee) / 100 || 0;

      // Calculate effective APR with fees
      const btEffectiveAPR = balanceTransferAPR + (btFee * 12 / termMonths);
      const caEffectiveAPR = cashAdvanceAPR + (caFee * 12 / termMonths);

      creditCardAPRs = {
        purchase: purchaseAPR * 100,
        balanceTransfer: balanceTransferAPR * 100,
        balanceTransferWithFee: btEffectiveAPR * 100,
        cashAdvance: cashAdvanceAPR * 100,
        cashAdvanceWithFee: caEffectiveAPR * 100,
      };
    }

    // Comparison scenarios
    const comparisonData = [
      {
        scenario: 'With All Fees',
        apr: trueAPR * 100,
        totalCost: totalPaid,
        monthlyCost: (totalPaid / termMonths),
      },
      {
        scenario: 'Nominal Rate Only',
        apr: nominalRate * 100,
        totalCost: amount + totalInterest,
        monthlyCost: monthlyPayment,
      },
      {
        scenario: '1% Lower APR',
        apr: (nominalRate - 0.01) * 100,
        totalCost: amount + (totalInterest * 0.85),
        monthlyCost: monthlyPayment * 0.95,
      },
      {
        scenario: '2% Lower APR',
        apr: (nominalRate - 0.02) * 100,
        totalCost: amount + (totalInterest * 0.70),
        monthlyCost: monthlyPayment * 0.90,
      },
    ];

    setResults({
      trueAPR: trueAPR * 100,
      nominalRate: nominalRate * 100,
      effectiveAPR: effectiveAPR * 100,
      totalLoanCost: totalPaid,
      totalFeesIncluded: totalFees,
      monthlyPayment,
      totalInterest,
      totalPaid,
      aprVsNominalDifference: (trueAPR - nominalRate) * 100,
      costBreakdown: {
        principal: amount,
        interest: totalInterest,
        fees: totalFees,
      },
      creditCardAPRs,
      comparisonData,
    });
  };

  const handleSaveImage = async () => {
    const element = document.getElementById('apr-results');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `apr-analysis-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const canCalculate = inputs.loanAmount && inputs.nominalRate && inputs.loanTerm;

  const getAPRRating = (apr: number): { text: string; color: string } => {
    if (apr < 5) return { text: 'Excellent', color: 'text-green-600' };
    if (apr < 10) return { text: 'Good', color: 'text-blue-600' };
    if (apr < 15) return { text: 'Fair', color: 'text-yellow-600' };
    if (apr < 20) return { text: 'High', color: 'text-orange-600' };
    return { text: 'Very High', color: 'text-red-600' };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Calculator className="h-5 w-5 text-blue-600" />
                Loan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Loan Type */}
              <div className="space-y-2">
                <Label htmlFor="loanType" className="text-sm font-medium flex items-center gap-1">
                  Loan Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="loanType"
                  value={inputs.loanType}
                  onChange={(e) => handleInputChange('loanType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="personal">Personal Loan</option>
                  <option value="auto">Auto Loan</option>
                  <option value="mortgage">Mortgage</option>
                  <option value="creditCard">Credit Card</option>
                </select>
              </div>

              {/* Loan Amount */}
              <div className="space-y-2">
                <Label htmlFor="loanAmount" className="text-sm font-medium flex items-center gap-1">
                  Loan Amount ($) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="loanAmount"
                  type="number"
                  value={inputs.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10000"
                  min="0"
                  step="100"
                />
              </div>

              {/* Nominal Interest Rate */}
              <div className="space-y-2">
                <Label htmlFor="nominalRate" className="text-sm font-medium flex items-center gap-1">
                  Nominal Interest Rate (%) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="nominalRate"
                  type="number"
                  value={inputs.nominalRate}
                  onChange={(e) => handleInputChange('nominalRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="8.99"
                  min="0"
                  max="50"
                  step="0.01"
                />
                <p className="text-xs text-gray-500">The stated interest rate (not including fees)</p>
              </div>

              {/* Loan Term */}
              <div className="space-y-2">
                <Label htmlFor="loanTerm" className="text-sm font-medium flex items-center gap-1">
                  Loan Term <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    id="loanTerm"
                    type="number"
                    value={inputs.loanTerm}
                    onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="36"
                    min="1"
                  />
                  <select
                    value={inputs.termUnit}
                    onChange={(e) => handleInputChange('termUnit', e.target.value as any)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
              </div>

              {/* Compounding Frequency */}
              <div className="space-y-2">
                <Label htmlFor="compoundingFrequency" className="text-sm font-medium">
                  Compounding Frequency <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <select
                  id="compoundingFrequency"
                  value={inputs.compoundingFrequency}
                  onChange={(e) => handleInputChange('compoundingFrequency', e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="daily">Daily</option>
                </select>
                <p className="text-xs text-gray-500">Default: Monthly compounding</p>
              </div>
            </CardContent>
          </Card>

          {inputs.loanType !== 'creditCard' ? (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                  Fees & Costs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {/* Origination Fee */}
                <div className="space-y-2">
                  <Label htmlFor="originationFee" className="text-sm font-medium">
                    Origination Fee (%) <span className="text-gray-500 text-xs">- Optional</span>
                  </Label>
                  <input
                    id="originationFee"
                    type="number"
                    value={inputs.originationFee}
                    onChange={(e) => handleInputChange('originationFee', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                    max="10"
                    step="0.25"
                  />
                  <p className="text-xs text-gray-500">Typical: 1-8% of loan amount</p>
                </div>

                {/* Application Fee */}
                <div className="space-y-2">
                  <Label htmlFor="applicationFee" className="text-sm font-medium">
                    Application Fee ($) <span className="text-gray-500 text-xs">- Optional</span>
                  </Label>
                  <input
                    id="applicationFee"
                    type="number"
                    value={inputs.applicationFee}
                    onChange={(e) => handleInputChange('applicationFee', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>

                {/* Processing Fee */}
                <div className="space-y-2">
                  <Label htmlFor="processingFee" className="text-sm font-medium">
                    Processing Fee ($) <span className="text-gray-500 text-xs">- Optional</span>
                  </Label>
                  <input
                    id="processingFee"
                    type="number"
                    value={inputs.processingFee}
                    onChange={(e) => handleInputChange('processingFee', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>

                {inputs.loanType === 'mortgage' && (
                  <>
                    {/* Closing Costs */}
                    <div className="space-y-2">
                      <Label htmlFor="closingCosts" className="text-sm font-medium">
                        Closing Costs ($) <span className="text-gray-500 text-xs">- Optional</span>
                      </Label>
                      <input
                        id="closingCosts"
                        type="number"
                        value={inputs.closingCosts}
                        onChange={(e) => handleInputChange('closingCosts', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="0"
                        min="0"
                      />
                      <p className="text-xs text-gray-500">Typical: 2-5% of loan amount</p>
                    </div>

                    {/* Points Paid */}
                    <div className="space-y-2">
                      <Label htmlFor="pointsPaid" className="text-sm font-medium">
                        Discount Points (%) <span className="text-gray-500 text-xs">- Optional</span>
                      </Label>
                      <input
                        id="pointsPaid"
                        type="number"
                        value={inputs.pointsPaid}
                        onChange={(e) => handleInputChange('pointsPaid', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="0"
                        min="0"
                        max="5"
                        step="0.125"
                      />
                      <p className="text-xs text-gray-500">1 point = 1% of loan amount</p>
                    </div>
                  </>
                )}

                {/* Annual Fee */}
                <div className="space-y-2">
                  <Label htmlFor="annualFee" className="text-sm font-medium">
                    Annual Fee ($) <span className="text-gray-500 text-xs">- Optional</span>
                  </Label>
                  <input
                    id="annualFee"
                    type="number"
                    value={inputs.annualFee}
                    onChange={(e) => handleInputChange('annualFee', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Percent className="h-5 w-5 text-purple-600" />
                  Credit Card APR Types
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="purchaseAPR" className="text-sm font-medium">
                    Purchase APR (%)
                  </Label>
                  <input
                    id="purchaseAPR"
                    type="number"
                    value={inputs.purchaseAPR}
                    onChange={(e) => handleInputChange('purchaseAPR', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="18.99"
                    min="0"
                    max="35"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="balanceTransferAPR" className="text-sm font-medium">
                    Balance Transfer APR (%)
                  </Label>
                  <input
                    id="balanceTransferAPR"
                    type="number"
                    value={inputs.balanceTransferAPR}
                    onChange={(e) => handleInputChange('balanceTransferAPR', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                    max="35"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="balanceTransferFee" className="text-sm font-medium">
                    Balance Transfer Fee (%)
                  </Label>
                  <input
                    id="balanceTransferFee"
                    type="number"
                    value={inputs.balanceTransferFee}
                    onChange={(e) => handleInputChange('balanceTransferFee', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="3"
                    min="0"
                    max="5"
                    step="0.5"
                  />
                  <p className="text-xs text-gray-500">Typical: 3-5% of transferred amount</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cashAdvanceAPR" className="text-sm font-medium">
                    Cash Advance APR (%)
                  </Label>
                  <input
                    id="cashAdvanceAPR"
                    type="number"
                    value={inputs.cashAdvanceAPR}
                    onChange={(e) => handleInputChange('cashAdvanceAPR', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="25.99"
                    min="0"
                    max="35"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cashAdvanceFee" className="text-sm font-medium">
                    Cash Advance Fee (%)
                  </Label>
                  <input
                    id="cashAdvanceFee"
                    type="number"
                    value={inputs.cashAdvanceFee}
                    onChange={(e) => handleInputChange('cashAdvanceFee', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="5"
                    min="0"
                    max="10"
                    step="0.5"
                  />
                  <p className="text-xs text-gray-500">Typical: 5% of cash advance amount</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Button
            onClick={calculateAPR}
            disabled={!canCalculate}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 min-h-[44px] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate True APR
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          {!results ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Percent className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Enter your loan details and fees to calculate the true APR
                </p>
              </CardContent>
            </Card>
          ) : (
            <div id="apr-results" className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="shadow-lg border-l-4 border-blue-500">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">True APR</p>
                        <p className="text-3xl sm:text-4xl font-bold text-blue-600 break-all">
                          {results.trueAPR.toFixed(2)}%
                        </p>
                        <p className={`text-sm mt-1 font-medium ${getAPRRating(results.trueAPR).color}`}>
                          {getAPRRating(results.trueAPR).text}
                        </p>
                      </div>
                      <Percent className="h-8 w-8 text-blue-500 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-gray-500">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Nominal Rate</p>
                        <p className="text-3xl sm:text-4xl font-bold text-gray-700 break-all">
                          {results.nominalRate.toFixed(2)}%
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Stated rate (no fees)
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-gray-500 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-orange-500">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900 break-all">
                          ${results.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-orange-500 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-red-500">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Cost</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900 break-all">
                          ${results.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-red-500 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* APR Comparison */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-lg sm:text-xl">APR vs Nominal Rate</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">APR is {results.aprVsNominalDifference.toFixed(2)}% higher than nominal rate</p>
                        <p className="text-sm text-gray-700">True APR includes all fees and costs</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">True APR (with fees)</span>
                      <span className="text-lg font-bold text-blue-600">
                        {results.trueAPR.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Nominal Rate (stated)</span>
                      <span className="text-lg font-bold text-gray-900">
                        {results.nominalRate.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Effective APR (with compounding)</span>
                      <span className="text-lg font-bold text-green-600">
                        {results.effectiveAPR.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                  <CardTitle className="text-lg sm:text-xl">Cost Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Principal Amount</span>
                      <span className="text-lg font-bold text-blue-600">
                        ${results.costBreakdown.principal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Total Interest</span>
                      <span className="text-lg font-bold text-yellow-600">
                        ${results.costBreakdown.interest.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Total Fees</span>
                      <span className="text-lg font-bold text-orange-600">
                        ${results.costBreakdown.fees.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-2 border-red-200">
                      <span className="text-sm font-medium text-gray-900">Total Amount Paid</span>
                      <span className="text-xl font-bold text-red-600">
                        ${results.totalPaid.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[results.costBreakdown]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="principal" fill="#3b82f6" name="Principal" />
                        <Bar dataKey="interest" fill="#f59e0b" name="Interest" />
                        <Bar dataKey="fees" fill="#ef4444" name="Fees" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Credit Card APRs */}
              {results.creditCardAPRs && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                    <CardTitle className="text-lg sm:text-xl">Credit Card APR Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Purchase APR</span>
                        <span className="text-lg font-bold text-purple-600">
                          {results.creditCardAPRs.purchase.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Balance Transfer APR</span>
                        <span className="text-lg font-bold text-blue-600">
                          {results.creditCardAPRs.balanceTransfer.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Balance Transfer (with fee)</span>
                        <span className="text-lg font-bold text-indigo-600">
                          {results.creditCardAPRs.balanceTransferWithFee.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Cash Advance APR</span>
                        <span className="text-lg font-bold text-pink-600">
                          {results.creditCardAPRs.cashAdvance.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Cash Advance (with fee)</span>
                        <span className="text-lg font-bold text-red-600">
                          {results.creditCardAPRs.cashAdvanceWithFee.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* APR Comparison Chart */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                  <CardTitle className="text-lg sm:text-xl">Total Cost Comparison</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={results.comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="scenario" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="totalCost" fill="#3b82f6" name="Total Cost" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-2">💡 Cost Savings Potential</p>
                    <p className="text-sm text-gray-700">
                      Lowering your APR by 2% could save you{' '}
                      <strong className="text-green-600">
                        ${(results.totalPaid - results.comparisonData[3].totalCost).toLocaleString()}
                      </strong>
                      {' '}over the life of the loan.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card className="shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleSaveImage}
                      variant="outline"
                      className="flex-1 min-h-[44px]"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Save as Image
                    </Button>
                    <Button
                      onClick={handlePrint}
                      variant="outline"
                      className="flex-1 min-h-[44px]"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <Button
                      onClick={handleShare}
                      variant="outline"
                      className="flex-1 min-h-[44px]"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
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
}

