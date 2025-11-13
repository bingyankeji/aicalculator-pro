'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Home, DollarSign, Calendar, TrendingDown, Clock, Percent, Save, X, BarChart2, Share2, Download, Printer } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';

interface PayoffResult {
  originalPayoffDate: Date;
  originalTotalPayment: number;
  originalTotalInterest: number;
  originalMonthsRemaining: number;
  newPayoffDate: Date;
  newTotalPayment: number;
  newTotalInterest: number;
  newMonthsRemaining: number;
  timeSaved: number;
  interestSaved: number;
  extraPaymentTotal: number;
}

interface SavedPlan {
  id: string;
  name: string;
  strategy: 'lumpsum' | 'monthly' | 'both';
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  yearsElapsed: string;
  extraMonthly: string;
  lumpSum: string;
  result: PayoffResult;
  savedAt: Date;
}

export function MortgagePayoffCalculator() {
  const [strategy, setStrategy] = useState<'lumpsum' | 'monthly' | 'both'>('monthly');
  
  // Loan details
  const [loanAmount, setLoanAmount] = useState<string>('300000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [yearsElapsed, setYearsElapsed] = useState<string>('5');
  
  // Extra payment options
  const [extraMonthly, setExtraMonthly] = useState<string>('200');
  const [lumpSum, setLumpSum] = useState<string>('10000');
  
  const [result, setResult] = useState<PayoffResult | null>(null);
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [planName, setPlanName] = useState('');
  const [showComparison, setShowComparison] = useState(false);
  
  // Share functionality
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  // Calculate monthly payment
  const calculateMonthlyPayment = (principal: number, annualRate: number, months: number): number => {
    const monthlyRate = annualRate / 100 / 12;
    if (monthlyRate === 0) return principal / months;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  };

  // Calculate remaining balance
  const calculateRemainingBalance = (
    originalPrincipal: number,
    monthlyPayment: number,
    annualRate: number,
    monthsPaid: number
  ): number => {
    const monthlyRate = annualRate / 100 / 12;
    if (monthlyRate === 0) {
      return originalPrincipal - (monthlyPayment * monthsPaid);
    }
    const remaining = originalPrincipal * Math.pow(1 + monthlyRate, monthsPaid) - 
                      monthlyPayment * (Math.pow(1 + monthlyRate, monthsPaid) - 1) / monthlyRate;
    return Math.max(0, remaining);
  };

  // Calculate payoff with extra payments
  const calculatePayoff = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const years = parseFloat(loanTerm);
    const elapsed = parseFloat(yearsElapsed);
    const extra = parseFloat(extraMonthly) || 0;
    const lump = parseFloat(lumpSum) || 0;

    if (!principal || !rate || !years || isNaN(elapsed)) return null;

    const totalMonths = years * 12;
    const monthsPaid = elapsed * 12;
    const monthlyRate = rate / 100 / 12;
    
    // Original monthly payment
    const originalPayment = calculateMonthlyPayment(principal, rate, totalMonths);
    
    // Current remaining balance
    let currentBalance = calculateRemainingBalance(principal, originalPayment, rate, monthsPaid);
    
    // Apply lump sum if selected
    if ((strategy === 'lumpsum' || strategy === 'both') && lump > 0) {
      currentBalance = Math.max(0, currentBalance - lump);
    }

    if (currentBalance === 0) return null;

    // Calculate original payoff (without extra payments)
    const originalMonthsRemaining = totalMonths - monthsPaid;
    const originalTotalPayment = originalPayment * originalMonthsRemaining;
    const originalTotalInterest = originalTotalPayment - currentBalance;
    
    // Calculate new payoff (with extra payments)
    let newBalance = currentBalance;
    let monthsToPayoff = 0;
    let totalPaid = 0;
    let extraPaymentAmount = 0;
    
    if (strategy === 'monthly' || strategy === 'both') {
      extraPaymentAmount = extra;
    }
    
    const newMonthlyPayment = originalPayment + extraPaymentAmount;
    
    while (newBalance > 0 && monthsToPayoff < 600) {
      monthsToPayoff++;
      const interestThisMonth = newBalance * monthlyRate;
      const principalThisMonth = Math.min(newMonthlyPayment - interestThisMonth, newBalance);
      
      if (principalThisMonth <= 0) break;
      
      totalPaid += interestThisMonth + principalThisMonth;
      newBalance -= principalThisMonth;
    }
    
    const newTotalInterest = totalPaid - (currentBalance - newBalance);
    const timeSaved = originalMonthsRemaining - monthsToPayoff;
    const interestSaved = originalTotalInterest - newTotalInterest;
    const extraPaymentTotal = lump + (extraPaymentAmount * monthsToPayoff);
    
    // Calculate dates
    const today = new Date();
    const originalPayoffDate = new Date(today);
    originalPayoffDate.setMonth(originalPayoffDate.getMonth() + originalMonthsRemaining);
    
    const newPayoffDate = new Date(today);
    newPayoffDate.setMonth(newPayoffDate.getMonth() + monthsToPayoff);
    
    return {
      originalPayoffDate,
      originalTotalPayment,
      originalTotalInterest,
      originalMonthsRemaining,
      newPayoffDate,
      newTotalPayment: totalPaid,
      newTotalInterest,
      newMonthsRemaining: monthsToPayoff,
      timeSaved,
      interestSaved,
      extraPaymentTotal,
    };
  };

  useEffect(() => {
    const res = calculatePayoff();
    setResult(res);
    
    // Generate share URL
    if (res) {
      const params = new URLSearchParams({
        loan: loanAmount,
        rate: interestRate,
        term: loanTerm,
        elapsed: yearsElapsed,
        strategy,
        ...(strategy === 'monthly' || strategy === 'both' ? { extra: extraMonthly } : {}),
        ...(strategy === 'lumpsum' || strategy === 'both' ? { lump: lumpSum } : {}),
      });
      setShareUrl(`${window.location.origin}/mortgage-payoff-calculator?${params.toString()}`);
    }
  }, [loanAmount, interestRate, loanTerm, yearsElapsed, extraMonthly, lumpSum, strategy]);

  // Load URL parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('loan')) setLoanAmount(params.get('loan')!);
      if (params.get('rate')) setInterestRate(params.get('rate')!);
      if (params.get('term')) setLoanTerm(params.get('term')!);
      if (params.get('elapsed')) setYearsElapsed(params.get('elapsed')!);
      if (params.get('strategy')) setStrategy(params.get('strategy') as any);
      if (params.get('extra')) setExtraMonthly(params.get('extra')!);
      if (params.get('lump')) setLumpSum(params.get('lump')!);
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

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Save current plan
  const savePlan = () => {
    if (!result || !planName.trim()) return;
    
    const newPlan: SavedPlan = {
      id: Date.now().toString(),
      name: planName.trim(),
      strategy,
      loanAmount,
      interestRate,
      loanTerm,
      yearsElapsed,
      extraMonthly,
      lumpSum,
      result,
      savedAt: new Date(),
    };
    
    setSavedPlans([...savedPlans, newPlan]);
    setPlanName('');
    setShowSaveModal(false);
  };

  // Delete saved plan
  const deletePlan = (id: string) => {
    setSavedPlans(savedPlans.filter(plan => plan.id !== id));
  };

  // Load saved plan
  const loadPlan = (plan: SavedPlan) => {
    setStrategy(plan.strategy);
    setLoanAmount(plan.loanAmount);
    setInterestRate(plan.interestRate);
    setLoanTerm(plan.loanTerm);
    setYearsElapsed(plan.yearsElapsed);
    setExtraMonthly(plan.extraMonthly);
    setLumpSum(plan.lumpSum);
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
      link.download = `mortgage-payoff-${Date.now()}.png`;
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
          <title>Mortgage Payoff Calculator Results</title>
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
          <h1 style="text-align: center; margin-bottom: 20px;">Mortgage Payoff Calculator Results</h1>
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

  const strategies = [
    { value: 'monthly', label: 'Extra Monthly', icon: Calendar },
    { value: 'lumpsum', label: 'One-Time Lump', icon: DollarSign },
    { value: 'both', label: 'Both Strategies', icon: TrendingDown },
  ] as const;

  const shareText = result 
    ? `I can save ${formatCurrency(result.interestSaved)} in interest by paying off my mortgage ${Math.floor(result.timeSaved / 12)} years ${result.timeSaved % 12} months early! Check out this Mortgage Payoff Calculator:`
    : '';

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Comparison View */}
      {showComparison && savedPlans.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">📊 Compare Saved Plans</h3>
            <button
              onClick={() => setShowComparison(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Close comparison"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Plan Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Strategy</th>
                  <th className="px-4 py-3 text-left font-semibold">Extra Payment</th>
                  <th className="px-4 py-3 text-left font-semibold">Interest Saved</th>
                  <th className="px-4 py-3 text-left font-semibold">Time Saved</th>
                  <th className="px-4 py-3 text-left font-semibold">ROI</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {savedPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{plan.name}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {plan.strategy === 'monthly' ? 'Monthly' : plan.strategy === 'lumpsum' ? 'Lump Sum' : 'Both'}
                      </span>
                    </td>
                    <td className="px-4 py-3">{formatCurrency(plan.result.extraPaymentTotal)}</td>
                    <td className="px-4 py-3 text-green-600 font-bold">
                      {formatCurrency(plan.result.interestSaved)}
                    </td>
                    <td className="px-4 py-3">
                      {Math.floor(plan.result.timeSaved / 12)}y {plan.result.timeSaved % 12}m
                    </td>
                    <td className="px-4 py-3 font-bold">
                      {((plan.result.interestSaved / plan.result.extraPaymentTotal) * 100).toFixed(1)}%
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => loadPlan(plan)}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => deletePlan(plan.id)}
                          className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main Layout: Left Input, Right Results */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT SIDE: Input Form */}
        <div className="space-y-6">
          {/* Strategy Selection */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Payoff Strategy</h3>
            <div className="grid grid-cols-3 gap-2">
              {strategies.map((strat) => {
                const Icon = strat.icon;
                return (
                  <button
                    key={strat.value}
                    onClick={() => setStrategy(strat.value as any)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      strategy === strat.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1 mx-auto ${strategy === strat.value ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div className="font-semibold text-xs text-center">{strat.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Loan Details */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Current Mortgage</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Original Loan Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="300000"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="6.5"
                    step="0.01"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Loan Term (Years)</label>
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    placeholder="30"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Years Paid</label>
                  <input
                    type="number"
                    value={yearsElapsed}
                    onChange={(e) => setYearsElapsed(e.target.value)}
                    placeholder="5"
                    step="0.1"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Extra Payment Options */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Extra Payments</h3>
            
            <div className="space-y-4">
              {(strategy === 'monthly' || strategy === 'both') && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Extra Monthly Payment</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={extraMonthly}
                      onChange={(e) => setExtraMonthly(e.target.value)}
                      placeholder="200"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <p className="text-xs text-gray-600">Add this to each payment</p>
                </div>
              )}

              {(strategy === 'lumpsum' || strategy === 'both') && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">One-Time Lump Sum</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={lumpSum}
                      onChange={(e) => setLumpSum(e.target.value)}
                      placeholder="10000"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <p className="text-xs text-gray-600">One-time principal payment</p>
                </div>
              )}

              {/* Quick Suggestions */}
              {(strategy === 'monthly' || strategy === 'both') && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">Quick amounts:</h4>
                  <div className="flex flex-wrap gap-2">
                    {[100, 200, 300, 500, 1000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setExtraMonthly(amount.toString())}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg transition-colors text-xs font-medium"
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Results */}
        <div className="space-y-6">
          {result ? (
            <>
              {/* Savings Summary - Exportable area */}
              <div ref={resultRef} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-green-900">💰 Your Savings</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowShareModal(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm"
                      title="Share results"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
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
                    <button
                      onClick={() => setShowSaveModal(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm"
                      title="Save plan"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <div className="text-xs text-green-600 font-medium">Interest Saved</div>
                    </div>
                    <div className="text-3xl font-bold text-green-700">
                      {formatCurrency(result.interestSaved)}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div className="text-xs text-blue-600 font-medium">Time Saved</div>
                    </div>
                    <div className="text-3xl font-bold text-blue-700">
                      {Math.floor(result.timeSaved / 12)}y {result.timeSaved % 12}m
                    </div>
                    <div className="text-xs text-blue-600 mt-1">{result.timeSaved} months earlier</div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown className="w-5 h-5 text-purple-600" />
                      <div className="text-xs text-purple-600 font-medium">ROI on Extra Payments</div>
                    </div>
                    <div className="text-3xl font-bold text-purple-700">
                      {((result.interestSaved / result.extraPaymentTotal) * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-purple-600 mt-1">
                      Pay {formatCurrency(result.extraPaymentTotal)} extra
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-white p-3 rounded-lg border border-green-200">
                  <div className="text-sm font-bold text-gray-900 mb-1">New Payoff Date:</div>
                  <div className="text-xl font-bold text-green-700">
                    {formatDate(result.newPayoffDate)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    vs {formatDate(result.originalPayoffDate)} (original)
                  </div>
                </div>
              </div>

              {/* Detailed Comparison */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Before vs After</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Months Remaining:</span>
                    <div className="flex gap-3">
                      <span className="text-sm text-red-600">{result.originalMonthsRemaining}</span>
                      <span className="text-sm text-gray-400">→</span>
                      <span className="text-sm font-bold text-green-600">{result.newMonthsRemaining}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Total Payment:</span>
                    <div className="flex gap-3">
                      <span className="text-sm text-red-600">{formatCurrency(result.originalTotalPayment)}</span>
                      <span className="text-sm text-gray-400">→</span>
                      <span className="text-sm font-bold text-green-600">{formatCurrency(result.newTotalPayment)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Total Interest:</span>
                    <div className="flex gap-3">
                      <span className="text-sm text-red-600">{formatCurrency(result.originalTotalInterest)}</span>
                      <span className="text-sm text-gray-400">→</span>
                      <span className="text-sm font-bold text-green-600">{formatCurrency(result.newTotalInterest)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compare Plans Button */}
              {savedPlans.length > 0 && (
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-lg"
                >
                  <BarChart2 className="w-5 h-5" />
                  {showComparison ? 'Hide' : 'Compare'} All Saved Plans ({savedPlans.length})
                </button>
              )}
            </>
          ) : (
            <>
              <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Enter your mortgage details</p>
                <p className="text-sm text-gray-500 mt-2">Results will appear here in real-time</p>
              </div>

              {/* Show Compare Button even when no current result */}
              {savedPlans.length > 0 && (
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-lg"
                >
                  <BarChart2 className="w-5 h-5" />
                  View Saved Plans ({savedPlans.length})
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Save Plan Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Save This Plan</h3>
              <button
                onClick={() => setShowSaveModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name</label>
                <input
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="e.g., Aggressive Payoff, Conservative Plan"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-sm">
                <div className="font-semibold text-blue-900 mb-2">This plan will save:</div>
                <div className="text-blue-800">
                  • {formatCurrency(result?.interestSaved || 0)} in interest<br/>
                  • {Math.floor((result?.timeSaved || 0) / 12)} years {(result?.timeSaved || 0) % 12} months
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={savePlan}
                  disabled={!planName.trim()}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Plan
                </button>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Mortgage Payoff Calculator"
      />
    </div>
  );
}
