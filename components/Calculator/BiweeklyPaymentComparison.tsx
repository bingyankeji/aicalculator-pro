'use client';

interface BiweeklyPaymentComparisonProps {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
}

export function BiweeklyPaymentComparison({
  loanAmount,
  interestRate,
  loanTerm,
  monthlyPayment,
}: BiweeklyPaymentComparisonProps) {
  // Calculate monthly payment results
  const calculateMonthlyResults = () => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTerm * 12;
    const totalInterest = monthlyPayment * totalMonths - loanAmount;
    
    return {
      payment: monthlyPayment,
      totalPayments: totalMonths,
      totalInterest,
      totalCost: monthlyPayment * totalMonths,
    };
  };

  // Calculate biweekly payment results
  const calculateBiweeklyResults = () => {
    const biweeklyPayment = monthlyPayment / 2;
    const biweeklyRate = interestRate / 100 / 26; // 26 periods per year
    
    let balance = loanAmount;
    let periods = 0;
    let totalInterest = 0;
    const maxPeriods = loanTerm * 26; // 26 biweekly periods per year

    while (balance > 0 && periods < maxPeriods) {
      periods++;
      const interest = balance * biweeklyRate;
      let principal = biweeklyPayment - interest;

      if (principal > balance) {
        principal = balance;
      }

      balance -= principal;
      totalInterest += interest;
    }

    const totalMonths = Math.ceil(periods / 2.167); // Convert biweekly periods to months
    const yearsMonths = {
      years: Math.floor(totalMonths / 12),
      months: totalMonths % 12,
    };

    return {
      payment: biweeklyPayment,
      totalPayments: periods,
      totalInterest,
      totalCost: biweeklyPayment * periods,
      totalMonths,
      yearsMonths,
    };
  };

  const monthly = calculateMonthlyResults();
  const biweekly = calculateBiweeklyResults();
  
  const monthsSaved = monthly.totalPayments - biweekly.totalMonths;
  const interestSaved = monthly.totalInterest - biweekly.totalInterest;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatTime = (years: number, months: number) => {
    if (years === 0) return `${months} months`;
    if (months === 0) return `${years} years`;
    return `${years} yrs ${months} mos`;
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg border-2 border-purple-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-2xl">
          📅
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Biweekly Payment Option</h3>
          <p className="text-sm text-gray-600">Pay every 2 weeks instead of monthly - make 13 months of payments per year</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Monthly Payment */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="text-sm font-medium text-gray-600 mb-3">Monthly Payment (12x/year)</div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-500">Payment Amount</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(monthly.payment)}</div>
              <div className="text-xs text-gray-500">per month</div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payoff Time:</span>
              <span className="font-semibold">{loanTerm} years</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Interest:</span>
              <span className="font-semibold">{formatCurrency(monthly.totalInterest)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Cost:</span>
              <span className="font-semibold">{formatCurrency(monthly.totalCost)}</span>
            </div>
          </div>
        </div>

        {/* Biweekly Payment */}
        <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg p-5 text-white">
          <div className="text-sm font-medium text-purple-100 mb-3">Biweekly Payment (26x/year)</div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-purple-100">Payment Amount</div>
              <div className="text-2xl font-bold">{formatCurrency(biweekly.payment)}</div>
              <div className="text-xs text-purple-100">every 2 weeks</div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-purple-100">Payoff Time:</span>
              <span className="font-bold">{formatTime(biweekly.yearsMonths.years, biweekly.yearsMonths.months)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-purple-100">Total Interest:</span>
              <span className="font-bold">{formatCurrency(biweekly.totalInterest)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-purple-100">Total Cost:</span>
              <span className="font-bold">{formatCurrency(biweekly.totalCost)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-5 text-white">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">✨</span>
          <div className="text-lg font-bold">Biweekly Payment Savings</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <div className="text-sm text-green-100">Interest Saved</div>
            <div className="text-2xl font-bold">{formatCurrency(interestSaved)}</div>
          </div>
          <div>
            <div className="text-sm text-green-100">Time Saved</div>
            <div className="text-2xl font-bold">{Math.floor(monthsSaved / 12)} years {monthsSaved % 12} mos</div>
          </div>
        </div>
        <div className="text-sm text-green-100">
          By paying biweekly, you'll save <strong className="text-white">{formatCurrency(interestSaved)}</strong> and pay off your mortgage{' '}
          <strong className="text-white">{Math.floor(monthsSaved / 12)} years {monthsSaved % 12} months</strong> earlier!
        </div>
      </div>

      {/* How it Works */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm font-semibold text-gray-900 mb-2">💡 How Biweekly Payments Work</div>
        <ul className="space-y-1 text-xs text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Pay half your monthly payment every 2 weeks instead of one full payment per month</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>With 52 weeks in a year, you'll make 26 payments = 13 full monthly payments</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>The extra payment goes directly to principal, reducing interest and payoff time</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Check with your lender to ensure they accept biweekly payments without fees</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

