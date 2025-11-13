'use client';

interface ExtraPaymentInput {
  monthlyExtra: number;
  yearlyExtra: number;
  oneTimeAmount: number;
  oneTimeMonth: number;
}

interface ExtraPaymentComparisonProps {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  extraPayments: ExtraPaymentInput;
  onExtraPaymentsChange: (extraPayments: ExtraPaymentInput) => void;
}

interface PayoffResult {
  totalMonths: number;
  totalInterest: number;
  totalPayment: number;
  monthsSaved: number;
  interestSaved: number;
}

export function ExtraPaymentComparison({
  loanAmount,
  interestRate,
  loanTerm,
  monthlyPayment,
  extraPayments,
  onExtraPaymentsChange,
}: ExtraPaymentComparisonProps) {
  // Calculate payoff with extra payments
  const calculatePayoff = (withExtra: boolean): PayoffResult => {
    let balance = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const maxMonths = loanTerm * 12;
    let month = 0;
    let totalInterest = 0;
    let totalPayment = 0;

    while (balance > 0 && month < maxMonths) {
      month++;
      const interest = balance * monthlyRate;
      let principal = monthlyPayment - interest;
      let payment = monthlyPayment;

      if (withExtra) {
        // Add monthly extra
        principal += extraPayments.monthlyExtra;
        payment += extraPayments.monthlyExtra;

        // Add yearly extra (every 12 months)
        if (month % 12 === 0) {
          principal += extraPayments.yearlyExtra;
          payment += extraPayments.yearlyExtra;
        }

        // Add one-time payment
        if (month === extraPayments.oneTimeMonth && extraPayments.oneTimeAmount > 0) {
          principal += extraPayments.oneTimeAmount;
          payment += extraPayments.oneTimeAmount;
        }
      }

      // Don't overpay
      if (principal > balance) {
        principal = balance;
        payment = balance + interest;
      }

      balance -= principal;
      totalInterest += interest;
      totalPayment += payment;
    }

    return {
      totalMonths: month,
      totalInterest,
      totalPayment,
      monthsSaved: 0,
      interestSaved: 0,
    };
  };

  const normalPayoff = calculatePayoff(false);
  const extraPayoff = calculatePayoff(true);
  
  const hasExtraPayments = 
    extraPayments.monthlyExtra > 0 || 
    extraPayments.yearlyExtra > 0 || 
    extraPayments.oneTimeAmount > 0;

  extraPayoff.monthsSaved = normalPayoff.totalMonths - extraPayoff.totalMonths;
  extraPayoff.interestSaved = normalPayoff.totalInterest - extraPayoff.totalInterest;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years} years ${remainingMonths} months`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
          💰
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Extra Payment Calculator</h3>
          <p className="text-sm text-gray-600">See how much you can save by paying extra</p>
        </div>
      </div>

      {/* Extra Payment Inputs */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Extra Payment
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={extraPayments.monthlyExtra}
              onChange={(e) => onExtraPaymentsChange({ ...extraPayments, monthlyExtra: Number(e.target.value) })}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Added to each monthly payment</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yearly Extra Payment
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={extraPayments.yearlyExtra}
              onChange={(e) => onExtraPaymentsChange({ ...extraPayments, yearlyExtra: Number(e.target.value) })}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Paid once per year</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            One-Time Payment
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={extraPayments.oneTimeAmount}
              onChange={(e) => onExtraPaymentsChange({ ...extraPayments, oneTimeAmount: Number(e.target.value) })}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0"
            />
          </div>
          <div className="mt-1">
            <select
              value={extraPayments.oneTimeMonth}
              onChange={(e) => onExtraPaymentsChange({ ...extraPayments, oneTimeMonth: Number(e.target.value) })}
              className="w-full px-3 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {Array.from({ length: loanTerm * 12 }, (_, i) => i + 1).slice(0, 60).map((month) => (
                <option key={month} value={month}>
                  Month {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Results */}
      {hasExtraPayments && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Without Extra Payments */}
          <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-3">Without Extra Payments</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Payoff Time:</span>
                <span className="text-sm font-semibold text-gray-900">{formatMonths(normalPayoff.totalMonths)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Interest:</span>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(normalPayoff.totalInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Cost:</span>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(normalPayoff.totalPayment)}</span>
              </div>
            </div>
          </div>

          {/* With Extra Payments */}
          <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
            <div className="text-sm font-medium text-green-900 mb-3">With Extra Payments</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Payoff Time:</span>
                <span className="text-sm font-bold text-green-900">{formatMonths(extraPayoff.totalMonths)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Total Interest:</span>
                <span className="text-sm font-bold text-green-900">{formatCurrency(extraPayoff.totalInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Total Cost:</span>
                <span className="text-sm font-bold text-green-900">{formatCurrency(extraPayoff.totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Savings Summary */}
      {hasExtraPayments && extraPayoff.interestSaved > 0 && (
        <div className="mt-6 p-5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🎉</span>
            <div className="text-xl font-bold">Your Savings</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-green-100">Interest Saved</div>
              <div className="text-3xl font-bold">{formatCurrency(extraPayoff.interestSaved)}</div>
            </div>
            <div>
              <div className="text-sm text-green-100">Time Saved</div>
              <div className="text-3xl font-bold">{formatMonths(extraPayoff.monthsSaved)}</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-green-100">
            By making extra payments, you'll pay off your mortgage{' '}
            <strong className="text-white">{formatMonths(extraPayoff.monthsSaved)}</strong> earlier and save{' '}
            <strong className="text-white">{formatCurrency(extraPayoff.interestSaved)}</strong> in interest!
          </div>
        </div>
      )}

      {/* Empty State */}
      {!hasExtraPayments && (
        <div className="p-8 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-4xl mb-3">💡</div>
          <div className="text-lg font-semibold text-gray-900 mb-2">Try Extra Payments</div>
          <p className="text-sm text-gray-600">
            Enter extra payment amounts above to see how much you can save in interest and time
          </p>
        </div>
      )}
    </div>
  );
}

