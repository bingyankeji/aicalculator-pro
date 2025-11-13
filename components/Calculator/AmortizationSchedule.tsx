'use client';

import { useState } from 'react';

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface AmortizationScheduleProps {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
}

export function AmortizationSchedule({
  loanAmount,
  interestRate,
  loanTerm,
  monthlyPayment,
}: AmortizationScheduleProps) {
  const [viewMode, setViewMode] = useState<'monthly' | 'annual'>('annual');
  const [showAll, setShowAll] = useState(false);

  // Generate amortization schedule
  const generateSchedule = (): AmortizationRow[] => {
    const schedule: AmortizationRow[] = [];
    let balance = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTerm * 12;

    for (let month = 1; month <= totalMonths; month++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
      balance = balance - principal;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal,
        interest,
        balance: Math.max(0, balance),
      });
    }

    return schedule;
  };

  const schedule = generateSchedule();

  // Group by year for annual view
  const getAnnualSchedule = () => {
    const annual: Array<{
      year: number;
      payment: number;
      principal: number;
      interest: number;
      balance: number;
    }> = [];

    for (let year = 0; year < loanTerm; year++) {
      const startMonth = year * 12;
      const endMonth = Math.min((year + 1) * 12, schedule.length);
      const yearData = schedule.slice(startMonth, endMonth);

      const totalPayment = yearData.reduce((sum, row) => sum + row.payment, 0);
      const totalPrincipal = yearData.reduce((sum, row) => sum + row.principal, 0);
      const totalInterest = yearData.reduce((sum, row) => sum + row.interest, 0);
      const endingBalance = yearData[yearData.length - 1]?.balance || 0;

      annual.push({
        year: year + 1,
        payment: totalPayment,
        principal: totalPrincipal,
        interest: totalInterest,
        balance: endingBalance,
      });
    }

    return annual;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const annualSchedule = getAnnualSchedule();
  const displayData: (AmortizationRow | { year: number; payment: number; principal: number; interest: number; balance: number })[] = viewMode === 'annual' ? annualSchedule : schedule;
  const displayLimit = showAll ? displayData.length : 12;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Amortization Schedule</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('annual')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'annual'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Annual
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">
                {viewMode === 'annual' ? 'Year' : 'Month'}
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-900">Payment</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-900">Principal</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-900">Interest</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-900">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayData.slice(0, displayLimit).map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {viewMode === 'annual' ? (row as { year: number }).year : (row as AmortizationRow).month}
                </td>
                <td className="px-4 py-3 text-right text-gray-700">
                  {formatCurrency(row.payment)}
                </td>
                <td className="px-4 py-3 text-right text-green-700 font-medium">
                  {formatCurrency(row.principal)}
                </td>
                <td className="px-4 py-3 text-right text-red-700 font-medium">
                  {formatCurrency(row.interest)}
                </td>
                <td className="px-4 py-3 text-right text-blue-700 font-semibold">
                  {formatCurrency(row.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show More/Less Button */}
      {displayData.length > 12 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            {showAll ? '▲ Show Less' : `▼ Show All ${displayData.length} ${viewMode === 'annual' ? 'Years' : 'Months'}`}
          </button>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
        <div>
          <div className="text-xs text-gray-600 mb-1">Total Payments</div>
          <div className="text-lg font-bold text-gray-900">
            {formatCurrency(schedule.reduce((sum, row) => sum + row.payment, 0))}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-600 mb-1">Total Principal</div>
          <div className="text-lg font-bold text-green-700">
            {formatCurrency(loanAmount)}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-600 mb-1">Total Interest</div>
          <div className="text-lg font-bold text-red-700">
            {formatCurrency(schedule.reduce((sum, row) => sum + row.interest, 0))}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-600 mb-1">Payoff Date</div>
          <div className="text-lg font-bold text-blue-700">
            {new Date(new Date().setMonth(new Date().getMonth() + schedule.length)).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </div>
        </div>
      </div>

      {/* Visual Chart Placeholder */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>📊</span>
          <span className="font-medium">Interactive chart coming soon - showing principal vs interest breakdown over time</span>
        </div>
      </div>
    </div>
  );
}

