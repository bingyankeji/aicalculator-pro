'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingDown, AlertCircle, Download, Share2 } from 'lucide-react';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';

interface CalculationResult {
  totalLoanAmount: number;
  saleTax: number;
  upfrontPayment: number;
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  totalCost: number;
}

const CashBackCalculator = () => {
  const [cashBackAmount, setCashBackAmount] = useState(1000);
  const [highInterestRate, setHighInterestRate] = useState(5);
  const [lowInterestRate, setLowInterestRate] = useState(2);
  const [autoPrice, setAutoPrice] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [downPayment, setDownPayment] = useState(10000);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [salesTax, setSalesTax] = useState(7);
  const [otherFees, setOtherFees] = useState(2000);
  const [includeFeesInLoan, setIncludeFeesInLoan] = useState(false);

  const [cashBackResult, setCashBackResult] = useState<CalculationResult | null>(null);
  const [lowRateResult, setLowRateResult] = useState<CalculationResult | null>(null);
  const [recommendation, setRecommendation] = useState<string>('');
  const resultsRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/cash-back-calculator',
    getShareParams: () => ({}),
    getShareText: () => {
      return 'Cash Back or Low Interest Calculator - Compare auto loan offers';
    },
  });

  const calculateMonthlyPayment = (principal: number, annualRate: number, months: number): number => {
    if (annualRate === 0) return principal / months;
    const monthlyRate = annualRate / 100 / 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  };

  const calculateLoanDetails = (interestRate: number, cashBack: number = 0): CalculationResult => {
    const saleTaxAmount = (autoPrice * salesTax) / 100;
    
    let loanAmount = autoPrice - downPayment - tradeInValue - cashBack;
    
    if (includeFeesInLoan) {
      loanAmount += otherFees;
    }
    
    // Upfront includes down payment, sales tax, and fees (if not included in loan)
    const upfront = downPayment + saleTaxAmount + (includeFeesInLoan ? 0 : otherFees);
    
    const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
    const totalPayments = monthlyPayment * loanTerm;
    const totalInterest = totalPayments - loanAmount;
    const totalCost = autoPrice + saleTaxAmount + otherFees + totalInterest;

    return {
      totalLoanAmount: loanAmount,
      saleTax: saleTaxAmount,
      upfrontPayment: upfront,
      monthlyPayment,
      totalPayments,
      totalInterest,
      totalCost,
    };
  };

  const handleCalculate = () => {
    const cashBackRes = calculateLoanDetails(highInterestRate, cashBackAmount);
    const lowRateRes = calculateLoanDetails(lowInterestRate, 0);

    setCashBackResult(cashBackRes);
    setLowRateResult(lowRateRes);

    const savings = cashBackRes.totalInterest - lowRateRes.totalInterest;
    if (Math.abs(savings) < 100) {
      setRecommendation('Both offers are very similar. Choose based on your cash flow preference.');
    } else if (savings > 0) {
      setRecommendation(`The low rate will save you ${formatCurrency(Math.abs(savings))} in interest, which is larger than the cash back of ${formatCurrency(cashBackAmount)}.`);
    } else {
      setRecommendation(`The cash back offer is better, saving you ${formatCurrency(Math.abs(savings))} compared to the low interest rate offer.`);
    }
  };

  const handleClear = () => {
    setCashBackAmount(1000);
    setHighInterestRate(5);
    setLowInterestRate(2);
    setAutoPrice(50000);
    setLoanTerm(60);
    setDownPayment(10000);
    setTradeInValue(0);
    setSalesTax(7);
    setOtherFees(2000);
    setIncludeFeesInLoan(false);
    setCashBackResult(null);
    setLowRateResult(null);
    setRecommendation('');
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
      link.download = `cash-back-comparison-${new Date().getTime()}.png`;
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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Input */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              Cash Back or Low Interest Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {/* Cash Back Offer */}
            <div className="space-y-2 p-3 bg-white rounded-lg border border-gray-200">
              <h3 className="font-semibold text-center text-sm py-2 rounded bg-blue-50 text-blue-900">Cash Back Offer</h3>
              
              <div className="flex items-center gap-3">
                <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Cash Back Amount</Label>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <Input
                    type="number"
                    value={cashBackAmount}
                    onChange={(e) => setCashBackAmount(Number(e.target.value))}
                    className="h-8 text-sm pl-7 bg-white border-gray-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Interest Rate (High)</Label>
                <div className="relative flex-1">
                  <Input
                    type="number"
                    value={highInterestRate}
                    onChange={(e) => setHighInterestRate(Number(e.target.value))}
                    className="h-8 text-sm pr-8 bg-white border-gray-300"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                </div>
              </div>
            </div>

            {/* Low Interest Rate Offer */}
            <div className="space-y-2 p-3 bg-white rounded-lg border border-gray-200">
              <h3 className="font-semibold text-center text-sm py-2 rounded bg-gray-100 text-gray-900">Low Interest Rate Offer</h3>
              
              <div className="flex items-center gap-3">
                <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Interest Rate (Low)</Label>
                <div className="relative flex-1">
                  <Input
                    type="number"
                    value={lowInterestRate}
                    onChange={(e) => setLowInterestRate(Number(e.target.value))}
                    className="h-8 text-sm pr-8 bg-white border-gray-300"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                </div>
              </div>
            </div>

            {/* Other Information */}
            <div className="space-y-2 p-3 bg-white rounded-lg border border-gray-200">
              <h3 className="font-semibold text-center text-sm py-2 rounded bg-gray-50 text-gray-900">Other Information</h3>
              
              <div className="flex items-center gap-3">
                <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Auto Price</Label>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <Input
                    type="number"
                    value={autoPrice}
                    onChange={(e) => setAutoPrice(Number(e.target.value))}
                    className="h-8 text-sm pl-7 bg-white border-gray-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Loan Term</Label>
                <div className="relative flex-1">
                  <Input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="h-8 text-sm pr-20 bg-white border-gray-300"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">months</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Down Payment</Label>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <Input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="h-8 text-sm pl-7 bg-white border-gray-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Trade-in Value</Label>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <Input
                    type="number"
                    value={tradeInValue}
                    onChange={(e) => setTradeInValue(Number(e.target.value))}
                    className="h-8 text-sm pl-7 bg-white border-gray-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Sales Tax</Label>
                <div className="relative flex-1">
                  <Input
                    type="number"
                    value={salesTax}
                    onChange={(e) => setSalesTax(Number(e.target.value))}
                    className="h-8 text-sm pr-8 bg-white border-gray-300"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Title, Registration and Other Fees</Label>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <Input
                    type="number"
                    value={otherFees}
                    onChange={(e) => setOtherFees(Number(e.target.value))}
                    className="h-8 text-sm pl-7 bg-white border-gray-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Label className="text-xs font-medium text-gray-700 w-48 flex-shrink-0">Include All Fees in Loan</Label>
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="checkbox"
                    checked={includeFeesInLoan}
                    onChange={(e) => setIncludeFeesInLoan(e.target.checked)}
                    className="w-4 h-4 text-blue-600"
                    id="includeFeesInLoan"
                  />
                  <Label htmlFor="includeFeesInLoan" className="text-xs text-gray-600 cursor-pointer">
                    Yes, include in loan
                  </Label>
                </div>
              </div>
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
          </CardContent>
        </Card>

        {/* Right Panel - Results */}
        <div>
          {cashBackResult && lowRateResult ? (
            <Card ref={resultsRef} className="shadow-sm border border-gray-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-50/50 border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                  Results
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Recommendation */}
                <div className="p-3 rounded-lg border bg-green-50 border-green-200">
                  <div className="font-semibold text-sm mb-1 text-red-600">
                    {cashBackResult.totalCost < lowRateResult.totalCost 
                      ? 'The Cash Back Offer is Better!'
                      : 'The Low Interest Rate Offer is Better!'}
                  </div>
                  <p className="text-xs text-gray-700">{recommendation}</p>
                </div>

                {/* Cash Back Offer Results */}
                <div className="space-y-2 p-3 bg-blue-50/30 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-sm text-gray-900 pb-2 border-b border-blue-200">With Cash Back Offer</h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Loan Amount</span>
                      <span className="font-medium text-gray-900">{formatCurrency(cashBackResult.totalLoanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sale Tax</span>
                      <span className="font-medium text-gray-900">{formatCurrency(cashBackResult.saleTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Upfront Payment</span>
                      <span className="font-medium text-gray-900">{formatCurrency(cashBackResult.upfrontPayment)}</span>
                    </div>
                    <div className="flex justify-between bg-blue-100 px-2 py-1.5 rounded">
                      <span className="font-semibold text-gray-900">Monthly Pay</span>
                      <span className="font-bold text-blue-600">{formatCurrency(cashBackResult.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total of {loanTerm} Loan Payments</span>
                      <span className="font-medium text-gray-900">{formatCurrency(cashBackResult.totalPayments)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Loan Interest</span>
                      <span className="font-medium text-gray-900">{formatCurrency(cashBackResult.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between border-t border-blue-200 pt-1.5 mt-1.5">
                      <span className="font-semibold text-gray-900">Total Cost (price, interest, tax, fees)</span>
                      <span className="font-bold text-gray-900">{formatCurrency(cashBackResult.totalCost)}</span>
                    </div>
                  </div>
                </div>

                {/* Low Interest Rate Offer Results */}
                <div className="space-y-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-sm text-gray-900 pb-2 border-b border-gray-300">With Low Interest Rate Offer</h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Loan Amount</span>
                      <span className="font-medium text-gray-900">{formatCurrency(lowRateResult.totalLoanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sale Tax</span>
                      <span className="font-medium text-gray-900">{formatCurrency(lowRateResult.saleTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Upfront Payment</span>
                      <span className="font-medium text-gray-900">{formatCurrency(lowRateResult.upfrontPayment)}</span>
                    </div>
                    <div className="flex justify-between bg-gray-200 px-2 py-1.5 rounded">
                      <span className="font-semibold text-gray-900">Monthly Pay</span>
                      <span className="font-bold text-green-600">{formatCurrency(lowRateResult.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total of {loanTerm} Loan Payments</span>
                      <span className="font-medium text-gray-900">{formatCurrency(lowRateResult.totalPayments)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Loan Interest</span>
                      <span className="font-medium text-gray-900">{formatCurrency(lowRateResult.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-1.5 mt-1.5">
                      <span className="font-semibold text-gray-900">Total Cost (price, interest, tax, fees)</span>
                      <span className="font-bold text-gray-900">{formatCurrency(lowRateResult.totalCost)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
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
                  <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No Results Yet</p>
                  <p className="text-gray-400 text-sm">
                    Enter loan information and click "Calculate" to compare offers
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

export default CashBackCalculator;

