'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, CreditCard, TrendingDown, AlertCircle, Plus, X } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface CreditCard {
  id: string;
  name: string;
  balance: number;
  apr: number;
  minimumPayment: number;
}

interface PayoffResults {
  strategy: 'minimum' | 'fixed' | 'snowball' | 'avalanche';
  cards: Array<{
    name: string;
    balance: number;
    apr: number;
    monthsToPayoff: number;
    totalInterest: number;
    totalPaid: number;
    payoffOrder?: number;
  }>;
  summary: {
    totalMonthsToPayoff: number;
    totalInterestPaid: number;
    totalPaid: number;
    monthlyPayment: number;
  };
  comparison?: {
    minimumVsFixed: {
      monthsSaved: number;
      interestSaved: number;
    };
  };
  paymentSchedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
  cardPayoffTimeline: Array<{
    month: number;
    [key: string]: number;
  }>;
}

export default function CreditCardPayoffCalculator() {
  const [cards, setCards] = useState<CreditCard[]>([
    { id: '1', name: 'Card 1', balance: 5000, apr: 18.99, minimumPayment: 150 }
  ]);
  
  const [inputs, setInputs] = useState({
    strategy: 'avalanche' as 'minimum' | 'fixed' | 'snowball' | 'avalanche',
    fixedMonthlyPayment: '300',
    extraPayment: '0',
  });

  const [results, setResults] = useState<PayoffResults | null>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/credit-card-payoff-calculator',
    getShareParams: () => ({
      strategy: inputs.strategy,
      balance: cards[0]?.balance.toString() || '5000',
      apr: cards[0]?.apr.toString() || '18.99',
    }),
    getShareText: () => 
      results 
        ? `Credit Card Payoff: ${results.summary.totalMonthsToPayoff} months to debt-free | Save ${results.summary.totalInterestPaid.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} in interest!`
        : 'Check out my credit card payoff plan!',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('strategy')) {
      setInputs(prev => ({ ...prev, strategy: params.get('strategy') as any }));
    }
    
    if (params.has('balance') || params.has('apr')) {
      const newCards = [...cards];
      if (params.has('balance')) newCards[0].balance = parseFloat(params.get('balance') || '5000');
      if (params.has('apr')) newCards[0].apr = parseFloat(params.get('apr') || '18.99');
      setCards(newCards);
      setTimeout(calculatePayoff, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCard = () => {
    const newCard: CreditCard = {
      id: Date.now().toString(),
      name: `Card ${cards.length + 1}`,
      balance: 0,
      apr: 18.99,
      minimumPayment: 0
    };
    setCards([...cards, newCard]);
  };

  const removeCard = (id: string) => {
    if (cards.length > 1) {
      setCards(cards.filter(card => card.id !== id));
    }
  };

  const updateCard = (id: string, field: keyof CreditCard, value: string | number) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateMinimumPayment = (balance: number, apr: number): number => {
    // Typical minimum: greater of $25 or 1% of balance + interest
    const interestCharge = (balance * (apr / 100)) / 12;
    const principalPayment = balance * 0.01;
    return Math.max(25, principalPayment + interestCharge);
  };

  const calculatePayoff = () => {
    const strategy = inputs.strategy;
    const fixedPayment = parseFloat(inputs.fixedMonthlyPayment) || 0;
    const extraPayment = parseFloat(inputs.extraPayment) || 0;

    // Validate cards
    const validCards = cards.filter(card => card.balance > 0 && card.apr > 0);
    if (validCards.length === 0) {
      alert('Please add at least one card with balance and APR');
      return;
    }

    // Calculate for each strategy
    let cardResults: PayoffResults['cards'] = [];
    let paymentSchedule: PayoffResults['paymentSchedule'] = [];
    let cardPayoffTimeline: PayoffResults['cardPayoffTimeline'] = [];

    if (strategy === 'minimum') {
      // Minimum payment strategy
      const workingCards = validCards.map(card => ({
        ...card,
        remainingBalance: card.balance,
        minimumPmt: card.minimumPayment > 0 ? card.minimumPayment : calculateMinimumPayment(card.balance, card.apr)
      }));

      let month = 0;
      let totalInterest = 0;
      const maxMonths = 600; // 50 years max

      while (workingCards.some(card => card.remainingBalance > 0.01) && month < maxMonths) {
        month++;
        let monthlyPayment = 0;
        let monthlyInterest = 0;
        let monthlyPrincipal = 0;
        const timelineEntry: any = { month };

        workingCards.forEach(card => {
          if (card.remainingBalance > 0.01) {
            const interest = (card.remainingBalance * (card.apr / 100)) / 12;
            const payment = Math.min(card.minimumPmt, card.remainingBalance + interest);
            const principal = payment - interest;

            card.remainingBalance -= principal;
            monthlyPayment += payment;
            monthlyInterest += interest;
            monthlyPrincipal += principal;
            totalInterest += interest;

            timelineEntry[card.name] = card.remainingBalance;
          } else {
            timelineEntry[card.name] = 0;
          }
        });

        if (month <= 120) { // Store first 10 years of schedule
          paymentSchedule.push({
            month,
            payment: monthlyPayment,
            principal: monthlyPrincipal,
            interest: monthlyInterest,
            balance: workingCards.reduce((sum, card) => sum + card.remainingBalance, 0)
          });
        }

        if (month <= 60) { // Store first 5 years of timeline
          cardPayoffTimeline.push(timelineEntry);
        }
      }

      cardResults = validCards.map(card => {
        const workingBalance = card.balance;
        const monthlyRate = (card.apr / 100) / 12;
        const minPmt = card.minimumPayment > 0 ? card.minimumPayment : calculateMinimumPayment(card.balance, card.apr);
        
        // Calculate individual card payoff
        let balance = workingBalance;
        let months = 0;
        let interest = 0;
        const maxMonths = 600;

        while (balance > 0.01 && months < maxMonths) {
          months++;
          const interestCharge = balance * monthlyRate;
          const payment = Math.min(minPmt, balance + interestCharge);
          const principal = payment - interestCharge;
          balance -= principal;
          interest += interestCharge;
        }

        return {
          name: card.name,
          balance: card.balance,
          apr: card.apr,
          monthsToPayoff: months,
          totalInterest: interest,
          totalPaid: card.balance + interest
        };
      });

      const totalMonths = month;
      const totalBalance = validCards.reduce((sum, card) => sum + card.balance, 0);
      const avgMonthlyPayment = validCards.reduce((sum, card) => 
        sum + (card.minimumPayment > 0 ? card.minimumPayment : calculateMinimumPayment(card.balance, card.apr)), 0
      );

      setResults({
        strategy: 'minimum',
        cards: cardResults,
        summary: {
          totalMonthsToPayoff: totalMonths,
          totalInterestPaid: totalInterest,
          totalPaid: totalBalance + totalInterest,
          monthlyPayment: avgMonthlyPayment
        },
        paymentSchedule,
        cardPayoffTimeline
      });

    } else if (strategy === 'fixed') {
      // Fixed payment strategy
      const totalBalance = validCards.reduce((sum, card) => sum + card.balance, 0);
      const totalMinPayment = validCards.reduce((sum, card) => 
        sum + (card.minimumPayment > 0 ? card.minimumPayment : calculateMinimumPayment(card.balance, card.apr)), 0
      );

      if (fixedPayment < totalMinPayment) {
        alert(`Fixed payment must be at least ${totalMinPayment.toFixed(2)} (sum of minimum payments)`);
        return;
      }

      const workingCards = validCards.map(card => ({
        ...card,
        remainingBalance: card.balance,
        minimumPmt: card.minimumPayment > 0 ? card.minimumPayment : calculateMinimumPayment(card.balance, card.apr),
        totalInterestPaid: 0
      })).sort((a, b) => b.apr - a.apr); // Avalanche: highest APR first

      let month = 0;
      let totalInterest = 0;
      const maxMonths = 600;

      while (workingCards.some(card => card.remainingBalance > 0.01) && month < maxMonths) {
        month++;
        let remainingPayment = fixedPayment + extraPayment;
        let monthlyInterest = 0;
        let monthlyPrincipal = 0;
        const timelineEntry: any = { month };

        // Pay minimum on all cards first
        workingCards.forEach(card => {
          if (card.remainingBalance > 0.01) {
            const interest = (card.remainingBalance * (card.apr / 100)) / 12;
            const minPayment = Math.min(card.minimumPmt, card.remainingBalance + interest);
            const principal = minPayment - interest;

            card.remainingBalance -= principal;
            card.totalInterestPaid += interest;
            remainingPayment -= minPayment;
            monthlyInterest += interest;
            monthlyPrincipal += principal;
            totalInterest += interest;
          }
        });

        // Apply extra payment to highest APR card
        for (const card of workingCards) {
          if (card.remainingBalance > 0.01 && remainingPayment > 0) {
            const extraPrincipal = Math.min(remainingPayment, card.remainingBalance);
            card.remainingBalance -= extraPrincipal;
            monthlyPrincipal += extraPrincipal;
            remainingPayment -= extraPrincipal;
            break;
          }
        }

        workingCards.forEach(card => {
          timelineEntry[card.name] = card.remainingBalance > 0 ? card.remainingBalance : 0;
        });

        if (month <= 120) {
          paymentSchedule.push({
            month,
            payment: fixedPayment + extraPayment,
            principal: monthlyPrincipal,
            interest: monthlyInterest,
            balance: workingCards.reduce((sum, card) => sum + card.remainingBalance, 0)
          });
        }

        if (month <= 60) {
          cardPayoffTimeline.push(timelineEntry);
        }
      }

      cardResults = workingCards.map((card, index) => ({
        name: card.name,
        balance: validCards.find(c => c.id === card.id)!.balance,
        apr: card.apr,
        monthsToPayoff: month,
        totalInterest: card.totalInterestPaid,
        totalPaid: validCards.find(c => c.id === card.id)!.balance + card.totalInterestPaid,
        payoffOrder: index + 1
      }));

      setResults({
        strategy: 'fixed',
        cards: cardResults,
        summary: {
          totalMonthsToPayoff: month,
          totalInterestPaid: totalInterest,
          totalPaid: totalBalance + totalInterest,
          monthlyPayment: fixedPayment + extraPayment
        },
        paymentSchedule,
        cardPayoffTimeline
      });

    } else if (strategy === 'snowball' || strategy === 'avalanche') {
      // Snowball (lowest balance first) or Avalanche (highest APR first)
      const totalBalance = validCards.reduce((sum, card) => sum + card.balance, 0);
      const totalMinPayment = validCards.reduce((sum, card) => 
        sum + (card.minimumPayment > 0 ? card.minimumPayment : calculateMinimumPayment(card.balance, card.apr)), 0
      );

      const monthlyPayment = fixedPayment > 0 ? fixedPayment : totalMinPayment;

      if (monthlyPayment < totalMinPayment) {
        alert(`Payment must be at least ${totalMinPayment.toFixed(2)} (sum of minimum payments)`);
        return;
      }

      const workingCards = validCards.map(card => ({
        ...card,
        remainingBalance: card.balance,
        minimumPmt: card.minimumPayment > 0 ? card.minimumPayment : calculateMinimumPayment(card.balance, card.apr),
        totalInterestPaid: 0,
        paidOff: false,
        payoffMonth: 0
      })).sort((a, b) => 
        strategy === 'snowball' 
          ? a.balance - b.balance  // Snowball: lowest balance first
          : b.apr - a.apr          // Avalanche: highest APR first
      );

      let month = 0;
      let totalInterest = 0;
      const maxMonths = 600;
      let payoffOrder = 0;

      while (workingCards.some(card => !card.paidOff) && month < maxMonths) {
        month++;
        let remainingPayment = monthlyPayment + extraPayment;
        let monthlyInterest = 0;
        let monthlyPrincipal = 0;
        const timelineEntry: any = { month };

        // Calculate interest for all cards
        workingCards.forEach(card => {
          if (!card.paidOff) {
            const interest = (card.remainingBalance * (card.apr / 100)) / 12;
            card.totalInterestPaid += interest;
            monthlyInterest += interest;
            totalInterest += interest;
          }
        });

        // Pay minimum on all cards
        workingCards.forEach(card => {
          if (!card.paidOff) {
            const minPayment = Math.min(card.minimumPmt, card.remainingBalance);
            card.remainingBalance -= minPayment;
            monthlyPrincipal += minPayment;
            remainingPayment -= minPayment;
          }
        });

        // Apply extra payment to target card
        for (const card of workingCards) {
          if (!card.paidOff && remainingPayment > 0) {
            const extraPrincipal = Math.min(remainingPayment, card.remainingBalance);
            card.remainingBalance -= extraPrincipal;
            monthlyPrincipal += extraPrincipal;
            remainingPayment -= extraPrincipal;

            if (card.remainingBalance < 0.01) {
              card.paidOff = true;
              card.payoffMonth = month;
              payoffOrder++;
              card.payoffOrder = payoffOrder;
            }
            break;
          }
        }

        workingCards.forEach(card => {
          timelineEntry[card.name] = card.paidOff ? 0 : card.remainingBalance;
        });

        if (month <= 120) {
          paymentSchedule.push({
            month,
            payment: monthlyPayment + extraPayment,
            principal: monthlyPrincipal,
            interest: monthlyInterest,
            balance: workingCards.reduce((sum, card) => sum + (card.paidOff ? 0 : card.remainingBalance), 0)
          });
        }

        if (month <= 60) {
          cardPayoffTimeline.push(timelineEntry);
        }
      }

      cardResults = workingCards.map(card => ({
        name: card.name,
        balance: validCards.find(c => c.id === card.id)!.balance,
        apr: card.apr,
        monthsToPayoff: card.payoffMonth,
        totalInterest: card.totalInterestPaid,
        totalPaid: validCards.find(c => c.id === card.id)!.balance + card.totalInterestPaid,
        payoffOrder: card.payoffOrder
      })).sort((a, b) => (a.payoffOrder || 0) - (b.payoffOrder || 0));

      setResults({
        strategy,
        cards: cardResults,
        summary: {
          totalMonthsToPayoff: month,
          totalInterestPaid: totalInterest,
          totalPaid: totalBalance + totalInterest,
          monthlyPayment: monthlyPayment + extraPayment
        },
        paymentSchedule,
        cardPayoffTimeline
      });
    }

    // Update URL
    const params = new URLSearchParams();
    params.set('strategy', inputs.strategy);
    if (cards[0]) {
      params.set('balance', cards[0].balance.toString());
      params.set('apr', cards[0].apr.toString());
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleSaveAsImage = async () => {
    const element = document.getElementById('payoff-results');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = 'credit-card-payoff-results.png';
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

  const getStrategyDescription = (strategy: string) => {
    switch (strategy) {
      case 'minimum':
        return 'Pay only minimum on each card. Takes longest and costs most in interest.';
      case 'fixed':
        return 'Pay a fixed amount monthly, focusing extra on highest APR card.';
      case 'snowball':
        return 'Pay minimums on all cards, extra goes to smallest balance. Quick wins boost motivation!';
      case 'avalanche':
        return 'Pay minimums on all cards, extra goes to highest APR. Saves most on interest!';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CreditCard className="h-5 w-5 text-blue-600" />
                Your Credit Cards
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {cards.map((card, index) => (
                <div key={card.id} className="p-4 border border-gray-200 rounded-lg space-y-3 relative">
                  {cards.length > 1 && (
                    <Button
                      onClick={() => removeCard(card.id)}
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor={`name-${card.id}`} className="text-sm font-medium">
                      Card Name
                    </Label>
                    <input
                      id={`name-${card.id}`}
                      type="text"
                      value={card.name}
                      onChange={(e) => updateCard(card.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Chase Freedom"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`balance-${card.id}`} className="text-sm font-medium">
                      Balance ($) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id={`balance-${card.id}`}
                      type="number"
                      value={card.balance}
                      onChange={(e) => updateCard(card.id, 'balance', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="5000"
                      min="0"
                      step="100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`apr-${card.id}`} className="text-sm font-medium">
                      APR (%) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id={`apr-${card.id}`}
                      type="number"
                      value={card.apr}
                      onChange={(e) => updateCard(card.id, 'apr', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="18.99"
                      min="0"
                      max="36"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`minimum-${card.id}`} className="text-sm font-medium">
                      Minimum Payment ($) <span className="text-gray-500 text-xs">- Optional</span>
                    </Label>
                    <input
                      id={`minimum-${card.id}`}
                      type="number"
                      value={card.minimumPayment}
                      onChange={(e) => updateCard(card.id, 'minimumPayment', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Auto-calculated"
                      min="0"
                      step="5"
                    />
                    <p className="text-xs text-gray-500">
                      Leave blank to auto-calculate (~2% of balance)
                    </p>
                  </div>
                </div>
              ))}

              <Button
                onClick={addCard}
                variant="outline"
                className="w-full border-dashed border-2 min-h-[44px]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Card
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingDown className="h-5 w-5 text-green-600" />
                Payoff Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="strategy" className="text-sm font-medium">
                  Strategy <span className="text-red-500">*</span>
                </Label>
                <select
                  id="strategy"
                  value={inputs.strategy}
                  onChange={(e) => handleInputChange('strategy', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="avalanche">🏔️ Avalanche (Highest APR First) - Best Savings</option>
                  <option value="snowball">⛄ Snowball (Lowest Balance First) - Quick Wins</option>
                  <option value="fixed">💰 Fixed Payment</option>
                  <option value="minimum">⚠️ Minimum Payments Only</option>
                </select>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-700">{getStrategyDescription(inputs.strategy)}</p>
                </div>
              </div>

              {(inputs.strategy === 'fixed' || inputs.strategy === 'snowball' || inputs.strategy === 'avalanche') && (
                <div className="space-y-2">
                  <Label htmlFor="fixedMonthlyPayment" className="text-sm font-medium">
                    Monthly Payment ($) <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="fixedMonthlyPayment"
                    type="number"
                    value={inputs.fixedMonthlyPayment}
                    onChange={(e) => handleInputChange('fixedMonthlyPayment', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="300"
                    min="0"
                    step="10"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Total amount you can pay monthly toward all cards
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="extraPayment" className="text-sm font-medium">
                  Extra Monthly Payment ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="extraPayment"
                  type="number"
                  value={inputs.extraPayment}
                  onChange={(e) => handleInputChange('extraPayment', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  step="10"
                />
                <p className="text-xs text-gray-500">Any extra you can contribute (Default: $0)</p>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculatePayoff}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Payoff Plan
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" id="payoff-results">
          {results && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-lg border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Time to Debt-Free</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {results.summary.totalMonthsToPayoff} months
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(results.summary.totalMonthsToPayoff / 12).toFixed(1)} years
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                    <p className="text-2xl font-bold text-red-600">
                      {results.summary.totalInterestPaid.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
                    <p className="text-2xl font-bold text-green-600">
                      {results.summary.monthlyPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Paid</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {results.summary.totalPaid.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Strategy Info */}
              <Card className="shadow-lg border-l-4 border-l-blue-500">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {inputs.strategy === 'avalanche' && '🏔️ Avalanche Method'}
                        {inputs.strategy === 'snowball' && '⛄ Snowball Method'}
                        {inputs.strategy === 'fixed' && '💰 Fixed Payment Method'}
                        {inputs.strategy === 'minimum' && '⚠️ Minimum Payments Only'}
                      </h3>
                      <p className="text-sm text-gray-700">{getStrategyDescription(inputs.strategy)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card-by-Card Breakdown */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle>Card-by-Card Payoff Details</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    {results.cards.map((card, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{card.name}</h4>
                            {card.payoffOrder && (
                              <span className="text-xs text-blue-600 font-medium">
                                Payoff Order: #{card.payoffOrder}
                              </span>
                            )}
                          </div>
                          <span className="text-sm font-medium text-gray-600">{card.apr}% APR</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-600">Starting Balance</p>
                            <p className="font-semibold text-gray-900">
                              {card.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Months to Payoff</p>
                            <p className="font-semibold text-gray-900">{card.monthsToPayoff}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Interest Paid</p>
                            <p className="font-semibold text-red-600">
                              {card.totalInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Paid</p>
                            <p className="font-semibold text-gray-900">
                              {card.totalPaid.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Schedule Chart */}
              {results.paymentSchedule.length > 0 && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle>Balance Over Time</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={results.paymentSchedule}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="month" 
                          label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis 
                          label={{ value: 'Balance ($)', angle: -90, position: 'insideLeft' }}
                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip 
                          formatter={(value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} name="Remaining Balance" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* Payment Breakdown Chart */}
              {results.paymentSchedule.length > 0 && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardTitle>Principal vs Interest</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={results.paymentSchedule.slice(0, 24)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="month" 
                          label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis 
                          label={{ value: 'Payment ($)', angle: -90, position: 'insideLeft' }}
                          tickFormatter={(value) => `$${value.toFixed(0)}`}
                        />
                        <Tooltip 
                          formatter={(value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}
                        />
                        <Legend />
                        <Bar dataKey="principal" stackId="a" fill="#10b981" name="Principal" />
                        <Bar dataKey="interest" stackId="a" fill="#ef4444" name="Interest" />
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-600 text-center mt-2">First 24 months shown</p>
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
                <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  Add your credit card details and choose a payoff strategy to see your debt-free plan!
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
        calculatorName="Credit Card Payoff Calculator"
      />
    </div>
  );
}

