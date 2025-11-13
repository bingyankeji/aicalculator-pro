'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, TrendingDown, AlertCircle, DollarSign, Calendar, Percent } from 'lucide-react';

interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minPayment: number;
}

interface PayoffResult {
  strategy: 'avalanche' | 'snowball';
  totalMonths: number;
  totalPaid: number;
  totalInterest: number;
  payoffSchedule: {
    month: number;
    debts: {
      id: string;
      name: string;
      payment: number;
      balance: number;
      interestPaid: number;
    }[];
    totalRemaining: number;
  }[];
}

export function DebtPayoffCalculator() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card 1', balance: 5000, interestRate: 18.99, minPayment: 150 },
    { id: '2', name: 'Credit Card 2', balance: 3000, interestRate: 15.49, minPayment: 90 },
  ]);
  const [extraPayment, setExtraPayment] = useState<string>('200');
  const [strategy, setStrategy] = useState<'avalanche' | 'snowball'>('avalanche');
  const [result, setResult] = useState<PayoffResult | null>(null);
  const [comparisonResult, setComparisonResult] = useState<{
    avalanche: PayoffResult;
    snowball: PayoffResult;
  } | null>(null);

  // Add new debt
  const addDebt = () => {
    const newDebt: Debt = {
      id: Date.now().toString(),
      name: `Debt ${debts.length + 1}`,
      balance: 1000,
      interestRate: 10,
      minPayment: 50,
    };
    setDebts([...debts, newDebt]);
  };

  // Remove debt
  const removeDebt = (id: string) => {
    if (debts.length > 1) {
      setDebts(debts.filter(d => d.id !== id));
    }
  };

  // Update debt
  const updateDebt = (id: string, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  // Calculate payoff
  const calculatePayoff = (debts: Debt[], extra: number, strategyType: 'avalanche' | 'snowball'): PayoffResult => {
    const workingDebts = debts.map(d => ({ ...d }));
    const schedule: PayoffResult['payoffSchedule'] = [];
    let month = 0;
    let totalPaid = 0;
    let totalInterest = 0;

    while (workingDebts.some(d => d.balance > 0) && month < 600) {
      month++;
      const monthData: PayoffResult['payoffSchedule'][0] = {
        month,
        debts: [],
        totalRemaining: 0,
      };

      // Sort debts by strategy
      if (strategyType === 'avalanche') {
        workingDebts.sort((a, b) => b.interestRate - a.interestRate);
      } else {
        workingDebts.sort((a, b) => a.balance - b.balance);
      }

      let remainingExtra = extra;

      // Pay minimums on all debts
      for (const debt of workingDebts) {
        if (debt.balance <= 0) continue;

        const monthlyRate = debt.interestRate / 100 / 12;
        const interest = debt.balance * monthlyRate;
        totalInterest += interest;

        let payment = Math.min(debt.minPayment, debt.balance + interest);
        
        // Add extra to the first debt (highest priority)
        if (remainingExtra > 0 && debt === workingDebts.find(d => d.balance > 0)) {
          const maxExtra = debt.balance + interest - payment;
          const extraToApply = Math.min(remainingExtra, maxExtra);
          payment += extraToApply;
          remainingExtra -= extraToApply;
        }

        const principal = payment - interest;
        debt.balance = Math.max(0, debt.balance - principal);
        totalPaid += payment;

        monthData.debts.push({
          id: debt.id,
          name: debt.name,
          payment,
          balance: debt.balance,
          interestPaid: interest,
        });
      }

      monthData.totalRemaining = workingDebts.reduce((sum, d) => sum + d.balance, 0);
      schedule.push(monthData);

      if (monthData.totalRemaining === 0) break;
    }

    return {
      strategy: strategyType,
      totalMonths: month,
      totalPaid,
      totalInterest,
      payoffSchedule: schedule,
    };
  };

  useEffect(() => {
    const extra = parseFloat(extraPayment) || 0;
    if (debts.length > 0 && debts.every(d => d.balance > 0 && d.interestRate >= 0 && d.minPayment > 0)) {
      const avalancheResult = calculatePayoff(JSON.parse(JSON.stringify(debts)), extra, 'avalanche');
      const snowballResult = calculatePayoff(JSON.parse(JSON.stringify(debts)), extra, 'snowball');
      
      setResult(strategy === 'avalanche' ? avalancheResult : snowballResult);
      setComparisonResult({ avalanche: avalancheResult, snowball: snowballResult });
    }
  }, [debts, extraPayment, strategy]);

  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinPayment = debts.reduce((sum, d) => sum + d.minPayment, 0);
  const avgInterestRate = debts.length > 0
    ? debts.reduce((sum, d) => sum + (d.interestRate * d.balance), 0) / totalDebt
    : 0;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Strategy Selection */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Choose Your Debt Payoff Strategy</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setStrategy('avalanche')}
            className={`p-5 rounded-lg border-2 transition-all text-left ${
              strategy === 'avalanche'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <TrendingDown className={`w-6 h-6 mt-1 ${strategy === 'avalanche' ? 'text-blue-600' : 'text-gray-400'}`} />
              <div>
                <div className="font-bold text-gray-900 mb-1">Avalanche Method</div>
                <p className="text-sm text-gray-600 mb-2">
                  Pay off highest interest rate debts first
                </p>
                <div className="text-xs text-green-600 font-semibold">
                  💰 Saves the most money on interest
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setStrategy('snowball')}
            className={`p-5 rounded-lg border-2 transition-all text-left ${
              strategy === 'snowball'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <CreditCard className={`w-6 h-6 mt-1 ${strategy === 'snowball' ? 'text-purple-600' : 'text-gray-400'}`} />
              <div>
                <div className="font-bold text-gray-900 mb-1">Snowball Method</div>
                <p className="text-sm text-gray-600 mb-2">
                  Pay off smallest balance debts first
                </p>
                <div className="text-xs text-purple-600 font-semibold">
                  🎯 Quick wins boost motivation
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Debt List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Your Debts</h3>
          <button
            onClick={addDebt}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            + Add Debt
          </button>
        </div>

        <div className="space-y-4">
          {debts.map((debt, index) => (
            <div key={debt.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <input
                  type="text"
                  value={debt.name}
                  onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                  className="font-semibold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none"
                />
                {debts.length > 1 && (
                  <button
                    onClick={() => removeDebt(debt.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">Balance ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={debt.balance}
                      onChange={(e) => updateDebt(debt.id, 'balance', parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">Interest Rate (%)</label>
                  <div className="relative">
                    <Percent className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={debt.interestRate}
                      onChange={(e) => updateDebt(debt.id, 'interestRate', parseFloat(e.target.value) || 0)}
                      step="0.01"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">Min. Payment ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={debt.minPayment}
                      onChange={(e) => updateDebt(debt.id, 'minPayment', parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Extra Monthly Payment ($)</label>
            <p className="text-xs text-gray-600 mb-2">
              Additional amount beyond minimum payments to accelerate debt payoff
            </p>
            <div className="relative max-w-xs">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={extraPayment}
                onChange={(e) => setExtraPayment(e.target.value)}
                placeholder="200"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
          <div className="text-sm text-red-600 mb-1">Total Debt</div>
          <div className="text-2xl font-bold text-red-700">${totalDebt.toLocaleString()}</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-600 mb-1">Min. Payment</div>
          <div className="text-2xl font-bold text-blue-700">${totalMinPayment.toFixed(0)}/mo</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="text-sm text-purple-600 mb-1">Avg. Interest</div>
          <div className="text-2xl font-bold text-purple-700">{avgInterestRate.toFixed(2)}%</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="text-sm text-green-600 mb-1">Total Payment</div>
          <div className="text-2xl font-bold text-green-700">
            ${(totalMinPayment + (parseFloat(extraPayment) || 0)).toFixed(0)}/mo
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {strategy === 'avalanche' ? 'Avalanche' : 'Snowball'} Method Results
          </h3>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-600 mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Payoff Time
              </div>
              <div className="text-3xl font-bold text-blue-700">
                {Math.floor(result.totalMonths / 12)}y {result.totalMonths % 12}m
              </div>
              <div className="text-xs text-blue-600 mt-1">{result.totalMonths} months</div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-lg border border-red-200">
              <div className="text-sm text-red-600 mb-1 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Total Interest
              </div>
              <div className="text-3xl font-bold text-red-700">
                ${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-xs text-red-600 mt-1">
                {((result.totalInterest / totalDebt) * 100).toFixed(1)}% of principal
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border border-green-200">
              <div className="text-sm text-green-600 mb-1 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Total Paid
              </div>
              <div className="text-3xl font-bold text-green-700">
                ${result.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-xs text-green-600 mt-1">
                Principal + Interest
              </div>
            </div>
          </div>

          {/* Payoff Order */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Payoff Order:</h4>
            <div className="space-y-2">
              {(() => {
                const sortedDebts = [...debts].sort((a, b) => 
                  strategy === 'avalanche' 
                    ? b.interestRate - a.interestRate 
                    : a.balance - b.balance
                );
                return sortedDebts.map((debt, index) => (
                  <div key={debt.id} className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">{debt.name}</span>
                      <span className="text-gray-600 ml-2">
                        (${debt.balance.toLocaleString()} @ {debt.interestRate}%)
                      </span>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Strategy Comparison */}
          {comparisonResult && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-4">Strategy Comparison</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-blue-700 mb-2">Avalanche (Highest Interest First)</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{comparisonResult.avalanche.totalMonths} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest:</span>
                      <span className="font-medium text-red-600">
                        ${comparisonResult.avalanche.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-purple-700 mb-2">Snowball (Smallest Balance First)</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{comparisonResult.snowball.totalMonths} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest:</span>
                      <span className="font-medium text-red-600">
                        ${comparisonResult.snowball.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {comparisonResult.avalanche.totalInterest < comparisonResult.snowball.totalInterest && (
                <div className="mt-4 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                  💰 <strong>Avalanche saves you $
                  {(comparisonResult.snowball.totalInterest - comparisonResult.avalanche.totalInterest).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </strong> in interest compared to Snowball
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

