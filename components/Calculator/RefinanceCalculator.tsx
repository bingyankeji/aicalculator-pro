'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Home, DollarSign, Calendar, TrendingDown, Clock, Percent, AlertCircle, CheckCircle, Share2, Download, Printer } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';

interface RefinanceResult {
  // Current Loan
  currentMonthlyPayment: number;
  currentRemainingBalance: number;
  currentTotalPayments: number;
  currentTotalInterest: number;
  currentMonthsRemaining: number;
  
  // New Loan
  newMonthlyPayment: number;
  newTotalPayments: number;
  newTotalInterest: number;
  newLoanMonths: number;
  
  // Comparison
  monthlySavings: number;
  lifetimeSavings: number;
  totalCost: number;
  breakEvenMonths: number;
  worthIt: boolean;
  recommendation: string;
  savingsPercentage: number;
}

export function RefinanceCalculator() {
  // Current Loan
  const [currentBalance, setCurrentBalance] = useState<string>('250000');
  const [currentRate, setCurrentRate] = useState<string>('6.5');
  const [yearsRemaining, setYearsRemaining] = useState<string>('25');
  
  // New Loan
  const [newRate, setNewRate] = useState<string>('5.5');
  const [newTerm, setNewTerm] = useState<string>('30');
  const [closingCosts, setClosingCosts] = useState<string>('5000');
  const [cashOut, setCashOut] = useState<string>('0');
  
  const [result, setResult] = useState<RefinanceResult | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  // Calculate monthly payment
  const calculateMonthlyPayment = (principal: number, annualRate: number, months: number): number => {
    const monthlyRate = annualRate / 100 / 12;
    if (monthlyRate === 0) return principal / months;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  };

  // Calculate refinance comparison
  const calculateRefinance = () => {
    const balance = parseFloat(currentBalance);
    const oldRate = parseFloat(currentRate);
    const yearsLeft = parseFloat(yearsRemaining);
    const newInterestRate = parseFloat(newRate);
    const newLoanTerm = parseFloat(newTerm);
    const costs = parseFloat(closingCosts);
    const cashOutAmount = parseFloat(cashOut) || 0;

    if (!balance || !oldRate || !yearsLeft || !newInterestRate || !newLoanTerm || isNaN(costs)) {
      return null;
    }

    // Current loan calculations
    const currentMonths = yearsLeft * 12;
    const currentMonthlyPayment = calculateMonthlyPayment(balance, oldRate, currentMonths);
    const currentTotalPayments = currentMonthlyPayment * currentMonths;
    const currentTotalInterest = currentTotalPayments - balance;

    // New loan calculations
    const newLoanAmount = balance + costs + cashOutAmount;
    const newMonths = newLoanTerm * 12;
    const newMonthlyPayment = calculateMonthlyPayment(newLoanAmount, newInterestRate, newMonths);
    const newTotalPayments = newMonthlyPayment * newMonths;
    const newTotalInterest = newTotalPayments - newLoanAmount;

    // Comparison
    const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
    const lifetimeSavings = (currentTotalPayments - newTotalPayments) + costs + cashOutAmount;
    const totalCost = costs + cashOutAmount;
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(totalCost / monthlySavings) : 999;
    const savingsPercentage = ((currentMonthlyPayment - newMonthlyPayment) / currentMonthlyPayment) * 100;

    // Determine if worth it
    let worthIt = false;
    let recommendation = '';
    
    if (monthlySavings > 0 && breakEvenMonths < currentMonths) {
      worthIt = true;
      recommendation = `✅ Refinancing is worth it! You'll break even in ${breakEvenMonths} months and save ${formatCurrency(monthlySavings)} monthly. Perfect if you plan to stay in your home for at least ${Math.ceil(breakEvenMonths / 12)} years.`;
    } else if (monthlySavings > 0 && breakEvenMonths >= currentMonths) {
      recommendation = `⚠️ Refinancing might not be worth it. Break-even takes ${breakEvenMonths} months (${Math.ceil(breakEvenMonths / 12)} years), but you only have ${currentMonths} months left. Consider if you'll stay longer or need the lower monthly payment for cash flow.`;
    } else if (monthlySavings < 0) {
      recommendation = `❌ Refinancing is not recommended. Your monthly payment would increase by ${formatCurrency(Math.abs(monthlySavings))}. However, if you need cash-out or want to extend the loan term for flexibility, it might still make sense.`;
    } else {
      recommendation = `⚖️ Refinancing offers minimal savings. Consider if other benefits (cash-out, removing PMI, switching loan type) justify the closing costs.`;
    }

    return {
      currentMonthlyPayment,
      currentRemainingBalance: balance,
      currentTotalPayments,
      currentTotalInterest,
      currentMonthsRemaining: currentMonths,
      newMonthlyPayment,
      newTotalPayments,
      newTotalInterest,
      newLoanMonths: newMonths,
      monthlySavings,
      lifetimeSavings,
      totalCost,
      breakEvenMonths,
      worthIt,
      recommendation,
      savingsPercentage,
    };
  };

  useEffect(() => {
    const res = calculateRefinance();
    setResult(res);
    
    // Generate share URL
    if (res) {
      const params = new URLSearchParams({
        balance: currentBalance,
        oldRate: currentRate,
        years: yearsRemaining,
        newRate: newRate,
        newTerm: newTerm,
        costs: closingCosts,
        ...(cashOut !== '0' ? { cashOut } : {}),
      });
      setShareUrl(`${window.location.origin}/refinance-calculator?${params.toString()}`);
    }
  }, [currentBalance, currentRate, yearsRemaining, newRate, newTerm, closingCosts, cashOut]);

  // Load URL parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('balance')) setCurrentBalance(params.get('balance')!);
      if (params.get('oldRate')) setCurrentRate(params.get('oldRate')!);
      if (params.get('years')) setYearsRemaining(params.get('years')!);
      if (params.get('newRate')) setNewRate(params.get('newRate')!);
      if (params.get('newTerm')) setNewTerm(params.get('newTerm')!);
      if (params.get('costs')) setClosingCosts(params.get('costs')!);
      if (params.get('cashOut')) setCashOut(params.get('cashOut')!);
    }
  }, []);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Save as image
  const saveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `refinance-analysis-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  // Print results
  const printResults = () => {
    if (!resultRef.current) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print results.');
      return;
    }
    
    const content = resultRef.current.innerHTML;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Refinance Calculator Results</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            * {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
          </style>
        </head>
        <body>
          <h1 style="text-align: center; margin-bottom: 20px;">Refinance Calculator Results</h1>
          ${content}
          <div style="margin-top: 30px; text-align: center; color: #666; font-size: 12px;">
            <p>Generated by AICalculator.com on ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const shareText = result 
    ? `Refinancing could save me ${formatCurrency(result.monthlySavings)}/month! Check out this Refinance Calculator:`
    : '';

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Interactive Instructions */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-3xl">🎯</div>
          <h2 className="text-2xl font-bold">Calculate Your Refinance Savings</h2>
        </div>
        <p className="text-blue-100 text-sm md:text-base">
          👈 <strong>Edit the values on the left</strong> with your loan details. Results update instantly as you type!
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">✏️ Edit any field</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">⚡ Instant results</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">💾 Save & compare</span>
        </div>
      </div>

      {/* Main Layout: Left Input, Right Results */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT SIDE: Input Form */}
        <div className="space-y-6">
          {/* Current Loan */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">📝 Your Current Loan</h3>
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium animate-pulse">
                Editable
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Current Loan Balance</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={currentBalance}
                    onChange={(e) => setCurrentBalance(e.target.value)}
                    placeholder="250000"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <p className="text-xs text-gray-600">Amount you still owe</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Current Interest Rate (%)</label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={currentRate}
                    onChange={(e) => setCurrentRate(e.target.value)}
                    placeholder="6.5"
                    step="0.01"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Years Remaining</label>
                <input
                  type="number"
                  value={yearsRemaining}
                  onChange={(e) => setYearsRemaining(e.target.value)}
                  placeholder="25"
                  step="0.5"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <p className="text-xs text-gray-600">How many years left on your loan</p>
              </div>
            </div>
          </div>

          {/* New Loan */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">🆕 Your New Loan</h3>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                Try different rates
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">New Interest Rate (%)</label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={newRate}
                    onChange={(e) => setNewRate(e.target.value)}
                    placeholder="5.5"
                    step="0.01"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <p className="text-xs text-gray-600">Rate offered by new lender</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">New Loan Term (Years)</label>
                <input
                  type="number"
                  value={newTerm}
                  onChange={(e) => setNewTerm(e.target.value)}
                  placeholder="30"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <p className="text-xs text-gray-600">Common: 15, 20, or 30 years</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Closing Costs</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={closingCosts}
                    onChange={(e) => setClosingCosts(e.target.value)}
                    placeholder="5000"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <p className="text-xs text-gray-600">Typical: 2-5% of loan amount</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Cash-Out Amount (Optional)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={cashOut}
                    onChange={(e) => setCashOut(e.target.value)}
                    placeholder="0"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <p className="text-xs text-gray-600">Extra cash you want to take out</p>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
            <h4 className="font-bold text-blue-900 mb-2 text-sm">💡 Refinancing Tips:</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Refinance when rates drop 0.5-1% or more</li>
              <li>• Consider break-even point vs. how long you'll stay</li>
              <li>• Factor in closing costs (typically 2-5%)</li>
              <li>• 15-year term = higher payment but huge interest savings</li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE: Results */}
        <div className="space-y-6">
          {result ? (
            <>
              {/* Recommendation */}
              <div ref={resultRef} className={`rounded-xl border-2 p-5 sticky top-6 z-10 ${
                result.worthIt 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' 
                  : result.monthlySavings > 0
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300'
                  : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-300'
              }`}>
                <div className="mb-2">
                  <div className="text-xs text-gray-600 font-medium mb-1">📊 Based on Your Inputs:</div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {result.worthIt ? '✅ Worth It!' : result.monthlySavings > 0 ? '⚠️ Maybe' : '❌ Not Recommended'}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowShareModal(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm"
                      title="Share results"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={saveAsImage}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                      title="Save as image"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={printResults}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium shadow-sm"
                      title="Print results"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  {result.recommendation}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Monthly Savings</div>
                    <div className={`text-2xl font-bold ${result.monthlySavings > 0 ? 'text-green-700' : 'text-red-700'}`}>
                      {result.monthlySavings > 0 ? '+' : ''}{formatCurrency(result.monthlySavings)}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {result.savingsPercentage > 0 ? `${result.savingsPercentage.toFixed(1)}% less` : 'Higher payment'}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Break-Even Point</div>
                    <div className="text-2xl font-bold text-blue-700">
                      {result.breakEvenMonths < 600 ? `${result.breakEvenMonths}mo` : 'N/A'}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {result.breakEvenMonths < 600 ? `${Math.ceil(result.breakEvenMonths / 12)} years` : 'Never breaks even'}
                    </div>
                  </div>
                </div>

                <div className="mt-3 bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-600 mb-1">Closing Costs</div>
                  <div className="text-xl font-bold text-orange-700">
                    {formatCurrency(result.totalCost)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Upfront cost to refinance
                  </div>
                </div>
              </div>

              {/* Detailed Comparison */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Detailed Comparison</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-2">Monthly Payment</div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-gray-600">Current</div>
                        <div className="text-xl font-bold text-red-600">{formatCurrency(result.currentMonthlyPayment)}</div>
                      </div>
                      <span className="text-gray-400">→</span>
                      <div className="text-right">
                        <div className="text-xs text-gray-600">New</div>
                        <div className="text-xl font-bold text-green-600">{formatCurrency(result.newMonthlyPayment)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Total Interest Paid</div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-gray-600">Current</div>
                        <div className="text-lg font-bold text-red-600">{formatCurrency(result.currentTotalInterest)}</div>
                      </div>
                      <span className="text-gray-400">→</span>
                      <div className="text-right">
                        <div className="text-xs text-gray-600">New</div>
                        <div className="text-lg font-bold text-green-600">{formatCurrency(result.newTotalInterest)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Loan Term</div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-gray-600">Current</div>
                        <div className="text-lg font-bold text-gray-900">
                          {result.currentMonthsRemaining} months
                        </div>
                        <div className="text-xs text-gray-600">{(result.currentMonthsRemaining / 12).toFixed(1)} years</div>
                      </div>
                      <span className="text-gray-400">→</span>
                      <div className="text-right">
                        <div className="text-xs text-gray-600">New</div>
                        <div className="text-lg font-bold text-gray-900">
                          {result.newLoanMonths} months
                        </div>
                        <div className="text-xs text-gray-600">{(result.newLoanMonths / 12).toFixed(1)} years</div>
                      </div>
                    </div>
                  </div>

                  {result.lifetimeSavings !== 0 && (
                    <div className="border-t border-gray-200 pt-3">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Lifetime Impact</div>
                      <div className={`text-2xl font-bold ${result.lifetimeSavings > 0 ? 'text-green-700' : 'text-red-700'}`}>
                        {result.lifetimeSavings > 0 ? 'Save ' : 'Cost '}
                        {formatCurrency(Math.abs(result.lifetimeSavings))}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Over the life of the loan (including costs)
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Factors */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Factors to Consider</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    {result.breakEvenMonths < result.currentMonthsRemaining ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-semibold text-sm text-gray-900">Time in Home</div>
                      <div className="text-xs text-gray-600 mt-1">
                        You'll break even in {result.breakEvenMonths < 600 ? result.breakEvenMonths : '∞'} months. 
                        {result.breakEvenMonths < 600 && ` Plan to stay at least ${Math.ceil(result.breakEvenMonths / 12)} years for this to make sense.`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    {Math.abs(parseFloat(currentRate) - parseFloat(newRate)) >= 0.75 ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-semibold text-sm text-gray-900">Interest Rate Difference</div>
                      <div className="text-xs text-gray-600 mt-1">
                        Rate drops {Math.abs(parseFloat(currentRate) - parseFloat(newRate)).toFixed(2)}%. 
                        {Math.abs(parseFloat(currentRate) - parseFloat(newRate)) >= 0.75 
                          ? ' Good! Generally worth it at 0.75%+ reduction.' 
                          : ' Small drop. Consider if other benefits justify costs.'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    {result.monthlySavings > 0 ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-semibold text-sm text-gray-900">Monthly Cash Flow</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {result.monthlySavings > 0 
                          ? `Lower payment by ${formatCurrency(result.monthlySavings)}/month. Great for improving cash flow!`
                          : `Payment increases by ${formatCurrency(Math.abs(result.monthlySavings))}/month. Make sure you can afford it.`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm text-gray-900">Credit Score Impact</div>
                      <div className="text-xs text-gray-600 mt-1">
                        Refinancing requires a credit check. Ensure your credit score is good (680+) for best rates. Multiple inquiries within 45 days count as one.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-dashed border-blue-300 p-12 text-center">
              <div className="animate-bounce mb-4">
                <Home className="w-16 h-16 text-blue-500 mx-auto" />
              </div>
              <p className="text-gray-900 font-bold text-lg mb-2">👈 Start by entering your loan details</p>
              <p className="text-sm text-gray-600 mt-2">Fill in the form on the left to see your results here!</p>
              <div className="mt-4 flex justify-center gap-2">
                <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600">Current Balance</span>
                <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600">Interest Rate</span>
                <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600">Years Left</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Refinance Calculator"
      />
    </div>
  );
}

