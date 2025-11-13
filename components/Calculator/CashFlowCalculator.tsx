'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Download, DollarSign, TrendingUp, Calendar, Calculator, Plus, Minus } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CashFlowPeriod {
  period: number;
  cashFlow: number;
}

interface CashFlowInputs {
  initialInvestment: number;
  discountRate: number;
  periods: CashFlowPeriod[];
  calculationType: 'npv' | 'irr' | 'payback';
}

interface CashFlowResult {
  npv: number;
  irr: number;
  paybackPeriod: number;
  profitabilityIndex: number;
  totalCashFlow: number;
  cumulativeCashFlows: number[];
  recommendation: string;
  riskLevel: 'low' | 'medium' | 'high';
  investmentGrade: 'excellent' | 'good' | 'fair' | 'poor';
}

// NPV calculation
const calculateNPV = (initialInvestment: number, cashFlows: number[], discountRate: number): number => {
  let npv = -initialInvestment;
  cashFlows.forEach((cashFlow, index) => {
    npv += cashFlow / Math.pow(1 + discountRate / 100, index + 1);
  });
  return npv;
};

// IRR calculation using Newton-Raphson method
const calculateIRR = (initialInvestment: number, cashFlows: number[]): number => {
  const maxIterations = 100;
  const tolerance = 1e-6;
  let rate = 0.1; // Initial guess

  for (let i = 0; i < maxIterations; i++) {
    let npv = -initialInvestment;
    let dnpv = 0;

    cashFlows.forEach((cashFlow, period) => {
      const periodNum = period + 1;
      npv += cashFlow / Math.pow(1 + rate, periodNum);
      dnpv -= (periodNum * cashFlow) / Math.pow(1 + rate, periodNum + 1);
    });

    if (Math.abs(npv) < tolerance) {
      return rate * 100;
    }

    if (dnpv === 0) break;
    rate = rate - npv / dnpv;

    if (rate < -0.99) rate = -0.99; // Prevent extreme negative rates
  }

  return rate * 100;
};

// Payback period calculation
const calculatePaybackPeriod = (initialInvestment: number, cashFlows: number[]): number => {
  let cumulativeCashFlow = 0;
  
  for (let i = 0; i < cashFlows.length; i++) {
    cumulativeCashFlow += cashFlows[i];
    if (cumulativeCashFlow >= initialInvestment) {
      // Linear interpolation for fractional period
      const previousCumulative = cumulativeCashFlow - cashFlows[i];
      const fraction = (initialInvestment - previousCumulative) / cashFlows[i];
      return i + fraction;
    }
  }
  
  return -1; // Payback period not reached
};

const calculateCashFlow = (inputs: CashFlowInputs): CashFlowResult | null => {
  if (inputs.initialInvestment <= 0 || inputs.periods.length === 0) return null;

  const cashFlows = inputs.periods.map(p => p.cashFlow);
  const npv = calculateNPV(inputs.initialInvestment, cashFlows, inputs.discountRate);
  const irr = calculateIRR(inputs.initialInvestment, cashFlows);
  const paybackPeriod = calculatePaybackPeriod(inputs.initialInvestment, cashFlows);
  const totalCashFlow = cashFlows.reduce((sum, cf) => sum + cf, 0);
  const profitabilityIndex = (npv + inputs.initialInvestment) / inputs.initialInvestment;

  // Calculate cumulative cash flows
  const cumulativeCashFlows: number[] = [];
  let cumulative = -inputs.initialInvestment;
  cumulativeCashFlows.push(cumulative);
  
  cashFlows.forEach(cf => {
    cumulative += cf;
    cumulativeCashFlows.push(cumulative);
  });

  // Investment analysis
  let recommendation = '';
  let riskLevel: 'low' | 'medium' | 'high' = 'medium';
  let investmentGrade: 'excellent' | 'good' | 'fair' | 'poor' = 'fair';

  if (npv > 0 && irr > inputs.discountRate) {
    if (irr > inputs.discountRate + 10) {
      investmentGrade = 'excellent';
      recommendation = 'Highly recommended investment with strong returns and low risk.';
      riskLevel = 'low';
    } else if (irr > inputs.discountRate + 5) {
      investmentGrade = 'good';
      recommendation = 'Good investment opportunity with solid returns.';
      riskLevel = 'medium';
    } else {
      investmentGrade = 'fair';
      recommendation = 'Acceptable investment, but consider alternatives.';
      riskLevel = 'medium';
    }
  } else {
    investmentGrade = 'poor';
    recommendation = 'Not recommended. Negative NPV or IRR below required rate.';
    riskLevel = 'high';
  }

  return {
    npv,
    irr,
    paybackPeriod,
    profitabilityIndex,
    totalCashFlow,
    cumulativeCashFlows,
    recommendation,
    riskLevel,
    investmentGrade
  };
};

export default function CashFlowCalculator() {
  const [inputs, setInputs] = useState<CashFlowInputs>({
    initialInvestment: 100000,
    discountRate: 10,
    periods: [
      { period: 1, cashFlow: 30000 },
      { period: 2, cashFlow: 35000 },
      { period: 3, cashFlow: 40000 },
      { period: 4, cashFlow: 45000 },
      { period: 5, cashFlow: 50000 }
    ],
    calculationType: 'npv'
  });

  const result = useMemo(() => calculateCashFlow(inputs), [inputs]);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSaveAsImage = async () => {
    if (!resultRef.current || !result) return;
    
    try {
      const canvas = await html2canvas(resultRef.current);
      
      const link = document.createElement('a');
      link.download = `cash-flow-analysis-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const getCalculationSummary = (): string => {
    if (!result) return '';
    
    const investment = inputs.initialInvestment.toLocaleString();
    const npvFormatted = result.npv.toLocaleString();
    const irrFormatted = result.irr.toFixed(1);
    const payback = result.paybackPeriod > 0 ? result.paybackPeriod.toFixed(1) : 'N/A';
    
    return `Investment of $${investment} generates NPV of $${npvFormatted}, IRR of ${irrFormatted}%, and payback period of ${payback} years at ${inputs.discountRate}% discount rate.`;
  };

  const handleInputChange = (field: keyof CashFlowInputs, value: number | string) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Number(value)
    }));
  };

  const handlePeriodChange = (index: number, field: 'period' | 'cashFlow', value: number) => {
    setInputs(prev => ({
      ...prev,
      periods: prev.periods.map((period, i) => 
        i === index ? { ...period, [field]: value } : period
      )
    }));
  };

  const addPeriod = () => {
    const nextPeriod = inputs.periods.length + 1;
    setInputs(prev => ({
      ...prev,
      periods: [...prev.periods, { period: nextPeriod, cashFlow: 0 }]
    }));
  };

  const removePeriod = (index: number) => {
    if (inputs.periods.length > 1) {
      setInputs(prev => ({
        ...prev,
        periods: prev.periods.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6 lg:items-start">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
            {/* Basic Inputs */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Investment ($)
                </label>
                <input
                  type="number"
                  value={inputs.initialInvestment}
                  onChange={(e) => handleInputChange('initialInvestment', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter initial investment"
                  min="0"
                  step="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Rate (%)
                </label>
                <input
                  type="number"
                  value={inputs.discountRate}
                  onChange={(e) => handleInputChange('discountRate', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter discount rate"
                  min="0"
                  max="50"
                  step="0.1"
                />
              </div>
            </div>

            {/* Cash Flow Periods */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Cash Flow Periods
                </label>
                <button
                  onClick={addPeriod}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add Period
                </button>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {inputs.periods.map((period, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={period.cashFlow}
                        onChange={(e) => handlePeriodChange(index, 'cashFlow', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder={`Year ${index + 1} cash flow`}
                        step="1000"
                      />
                    </div>
                    {inputs.periods.length > 1 && (
                      <button
                        onClick={() => removePeriod(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveAsImage}
              disabled={!result}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Save as Image
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          <div ref={resultRef} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            {result ? (
              <div className="space-y-6">
                {/* Calculation Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800 text-center font-medium">
                    {getCalculationSummary()}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Net Present Value</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      ${result.npv.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-700 mt-1">
                      {result.npv > 0 ? 'Positive NPV' : 'Negative NPV'}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Internal Rate of Return</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      {result.irr.toFixed(1)}%
                    </div>
                    <div className="text-xs text-blue-700 mt-1">
                      vs {inputs.discountRate}% required
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Payback Period</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">
                      {result.paybackPeriod > 0 ? `${result.paybackPeriod.toFixed(1)} years` : 'N/A'}
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Profitability Index</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-900">
                      {result.profitabilityIndex.toFixed(2)}
                    </div>
                    <div className="text-xs text-orange-700 mt-1">
                      {result.profitabilityIndex > 1 ? 'Profitable' : 'Unprofitable'}
                    </div>
                  </div>
                </div>

                {/* Investment Analysis */}
                <div className={`p-4 rounded-lg border ${
                  result.investmentGrade === 'excellent' ? 'bg-green-50 border-green-200' :
                  result.investmentGrade === 'good' ? 'bg-blue-50 border-blue-200' :
                  result.investmentGrade === 'fair' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <h4 className={`font-semibold mb-2 ${
                    result.investmentGrade === 'excellent' ? 'text-green-900' :
                    result.investmentGrade === 'good' ? 'text-blue-900' :
                    result.investmentGrade === 'fair' ? 'text-yellow-900' :
                    'text-red-900'
                  }`}>
                    Investment Grade: {result.investmentGrade.charAt(0).toUpperCase() + result.investmentGrade.slice(1)}
                  </h4>
                  <p className={`text-sm ${
                    result.investmentGrade === 'excellent' ? 'text-green-800' :
                    result.investmentGrade === 'good' ? 'text-blue-800' :
                    result.investmentGrade === 'fair' ? 'text-yellow-800' :
                    'text-red-800'
                  }`}>
                    {result.recommendation}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-medium">Risk Level:</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      result.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                      result.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Cash Flow Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Cash Flow Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Cash Inflow:</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        ${result.totalCashFlow.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Net Cash Flow:</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        ${(result.totalCashFlow - inputs.initialInvestment).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Number of Periods:</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        {inputs.periods.length} years
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Average Annual Cash Flow:</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        ${(result.totalCashFlow / inputs.periods.length).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Period-by-Period Breakdown */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Period-by-Period Analysis</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left">Period</th>
                          <th className="px-3 py-2 text-right">Cash Flow</th>
                          <th className="px-3 py-2 text-right">Cumulative</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-3 py-2 font-medium">Initial</td>
                          <td className="px-3 py-2 text-right text-red-600">
                            -${inputs.initialInvestment.toLocaleString()}
                          </td>
                          <td className="px-3 py-2 text-right text-red-600">
                            -${inputs.initialInvestment.toLocaleString()}
                          </td>
                        </tr>
                        {inputs.periods.map((period, index) => (
                          <tr key={index}>
                            <td className="px-3 py-2 font-medium">Year {period.period}</td>
                            <td className="px-3 py-2 text-right text-green-600">
                              ${period.cashFlow.toLocaleString()}
                            </td>
                            <td className={`px-3 py-2 text-right ${
                              result.cumulativeCashFlows[index + 1] >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              ${result.cumulativeCashFlows[index + 1].toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">💰</div>
                <p className="text-gray-500">Enter investment details to analyze cash flow</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
