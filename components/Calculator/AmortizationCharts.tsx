'use client';

import React, { useState } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AmortizationChartsProps {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  principalAndInterest: number;
  startMonth: number;
  startYear: number;
  propertyTax?: number; // 年度金额
  homeInsurance?: number; // 年度金额
  otherCosts?: number; // 年度金额
}

interface AnnualData {
  year: number;
  dateRange: string;
  interest: number;
  principal: number;
  balance: number;
}

interface MonthlyData {
  month: number;
  date: string;
  interest: number;
  principal: number;
  balance: number;
}

interface ChartData {
  year: number;
  balance: number;
  cumulativeInterest: number;
  cumulativePayment: number;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatCurrencyDecimal = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default function AmortizationCharts({
  loanAmount,
  interestRate,
  loanTerm,
  monthlyPayment,
  principalAndInterest,
  startMonth,
  startYear,
  propertyTax = 0,
  homeInsurance = 0,
  otherCosts = 0,
}: AmortizationChartsProps) {
  const [activeTab, setActiveTab] = useState<'annual' | 'monthly'>('annual');
  const [showAllRows, setShowAllRows] = useState(false);

  // Calculate monthly data
  const calculateAmortization = () => {
    const monthlyData: MonthlyData[] = [];
    const annualData: AnnualData[] = [];
    const chartData: ChartData[] = [];

    let balance = loanAmount;
    const monthlyRate = interestRate / 100 / 12;

    let currentMonth = startMonth;
    let currentYear = startYear;
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;
    let yearStartMonth = currentMonth;
    let yearStartYear = currentYear;
    let cumulativeInterest = 0;
    let cumulativePayment = 0;

    for (let month = 1; month <= loanTerm * 12; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = principalAndInterest - interestPayment;
      balance -= principalPayment;

      // Store monthly data
      monthlyData.push({
        month,
        date: `${currentMonth}/${currentYear}`,
        interest: interestPayment,
        principal: principalPayment,
        balance: Math.max(0, balance),
      });

      yearlyInterest += interestPayment;
      yearlyPrincipal += principalPayment;

      // Check if year is complete (12 months or end of loan)
      if (month % 12 === 0 || month === loanTerm * 12) {
        const yearEndMonth = currentMonth;
        const yearEndYear = currentYear;
        
        annualData.push({
          year: annualData.length + 1,
          dateRange: `${yearStartMonth}/${yearStartYear}-${yearEndMonth}/${yearEndYear}`,
          interest: yearlyInterest,
          principal: yearlyPrincipal,
          balance: Math.max(0, balance),
        });

        // 累计数据用于图表
        cumulativeInterest += yearlyInterest;
        cumulativePayment += yearlyInterest + yearlyPrincipal;
        
        chartData.push({
          year: annualData.length,
          balance: Math.max(0, balance),
          cumulativeInterest: cumulativeInterest,
          cumulativePayment: cumulativePayment,
        });

        yearlyInterest = 0;
        yearlyPrincipal = 0;
        yearStartMonth = currentMonth + 1;
        yearStartYear = currentYear;
        if (yearStartMonth > 12) {
          yearStartMonth = 1;
          yearStartYear++;
        }
      }

      // Increment month/year
      currentMonth++;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }
    }

    return { monthlyData, annualData, chartData };
  };

  const { monthlyData, annualData, chartData } = calculateAmortization();

  const displayedAnnualData = showAllRows ? annualData : annualData.slice(0, 15);
  const displayedMonthlyData = showAllRows ? monthlyData : monthlyData.slice(0, 24);

  // 饼图数据 - 月度费用分布
  const monthlyTax = propertyTax / 12;
  const monthlyIns = homeInsurance / 12;
  const monthlyOther = otherCosts / 12;

  const pieData = [
    { name: 'Principal & Interest', value: principalAndInterest, color: '#3b82f6' },
    { name: 'Property Taxes', value: monthlyTax, color: '#10b981' },
    { name: 'Home Insurance', value: monthlyIns, color: '#ef4444' },
    { name: 'Other Cost', value: monthlyOther, color: '#06b6d4' },
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-6">
      {/* Header with Tabs Only */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">📊 Amortization schedule</h3>
        
        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('annual')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'annual'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Annual Schedule
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Monthly Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col" style={{ height: '800px', maxHeight: '800px', overflow: 'hidden' }}>
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200 flex-shrink-0">
            <h4 className="text-lg font-bold text-gray-900">Payment Schedule</h4>
          </div>
          
          <div className="flex-1" style={{ minHeight: 0, overflow: 'auto' }}>
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    {activeTab === 'annual' ? 'Year' : 'Month'}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-right font-semibold">Interest</th>
                  <th className="px-4 py-3 text-right font-semibold">Principal</th>
                  <th className="px-4 py-3 text-right font-semibold">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeTab === 'annual'
                  ? displayedAnnualData.map((row, idx) => (
                      <tr 
                        key={row.year} 
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-150"
                      >
                        <td className="px-4 py-3 font-semibold text-blue-600">{row.year}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{row.dateRange}</td>
                        <td className="px-4 py-3 text-right font-medium text-red-600">{formatCurrency(row.interest)}</td>
                        <td className="px-4 py-3 text-right font-medium text-green-600">{formatCurrency(row.principal)}</td>
                        <td className="px-4 py-3 text-right font-bold text-gray-900">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))
                  : displayedMonthlyData.map((row, idx) => (
                      <tr 
                        key={row.month} 
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-150"
                      >
                        <td className="px-4 py-3 font-semibold text-blue-600">{row.month}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{row.date}</td>
                        <td className="px-4 py-3 text-right font-medium text-red-600">{formatCurrencyDecimal(row.interest)}</td>
                        <td className="px-4 py-3 text-right font-medium text-green-600">{formatCurrencyDecimal(row.principal)}</td>
                        <td className="px-4 py-3 text-right font-bold text-gray-900">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Show More/Less Button */}
          <div className="border-t border-gray-200 p-4 text-center bg-gray-50 flex-shrink-0">
            <button
              onClick={() => setShowAllRows(!showAllRows)}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {showAllRows ? '▲ Show Less' : `▼ Show All (${activeTab === 'annual' ? annualData.length : monthlyData.length} ${activeTab === 'annual' ? 'Years' : 'Months'})`}
            </button>
          </div>
        </div>

        {/* Chart - Loan Balance Over Time */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
            <h4 className="text-base font-bold text-gray-900 mb-4">
              ✅ Loan Balance & Payments Over Time
            </h4>
            <ResponsiveContainer width="100%" height={250} minHeight={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 11 }}
                  label={{ value: 'Year', position: 'insideBottom', offset: -5, fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ fontSize: 11, borderRadius: '8px', border: '1px solid #e5e7eb' }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: 11 }}
                  iconType="line"
                />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={false}
                  name="Balance"
                />
                <Line 
                  type="monotone" 
                  dataKey="cumulativeInterest" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={false}
                  name="Interest"
                />
                <Line 
                  type="monotone" 
                  dataKey="cumulativePayment" 
                  stroke="#dc2626" 
                  strokeWidth={3}
                  dot={false}
                  name="Payment"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Monthly Payment Breakdown */}
          {pieData.length > 0 && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Donut Chart */}
                <div>
                  <ResponsiveContainer width="100%" height={200} minHeight={180}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        labelLine={false}
                        label={({ percent }: any) => `${(percent * 100).toFixed(0)}%`}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={2}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => formatCurrencyDecimal(value)}
                        contentStyle={{ fontSize: 11, borderRadius: '8px', border: '1px solid #e5e7eb' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Right: Detailed Breakdown */}
                <div className="flex flex-col justify-center space-y-3">
                  {pieData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3 flex-1">
                        <div 
                          className="w-4 h-4 rounded-sm flex-shrink-0" 
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500">
                            {((item.value / monthlyPayment) * 100).toFixed(1)}% of total
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">{formatCurrency(item.value)}</div>
                        <div className="text-xs text-gray-500">per month</div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Total */}
                  <div className="pt-3 mt-3 border-t-2 border-gray-200">
                    <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                      <div className="text-sm font-bold text-gray-900">Total Monthly Payment</div>
                      <div className="text-lg font-bold text-blue-600">{formatCurrency(monthlyPayment)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
