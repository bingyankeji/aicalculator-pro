'use client';

import { useState, useRef } from 'react';
import { Share2, TrendingUp, TrendingDown } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

interface InflationInputs {
  calculationType: 'purchasing-power' | 'inflation-rate' | 'future-value';
  amount: number;
  startYear: number;
  endYear: number;
  inflationRate: number;
}

interface InflationResult {
  calculationType: string;
  originalAmount: number;
  adjustedAmount: number;
  startYear: number;
  endYear: number;
  years: number;
  inflationRate: number;
  totalInflation: number;
  purchasingPowerLoss: number;
  equivalentToBuy: string;
  yearlyBreakdown: { year: number; value: number; cumInflation: number }[];
  recommendations: string[];
}

export function InflationCalculator() {
  const [inputs, setInputs] = useState<InflationInputs>({
    calculationType: 'purchasing-power',
    amount: 10000,
    startYear: 2000,
    endYear: 2024,
    inflationRate: 3.0,
  });

  const [result, setResult] = useState<InflationResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/inflation-calculator',
    getShareParams: () => ({
      ct: inputs.calculationType,
      a: inputs.amount.toString(),
      sy: inputs.startYear.toString(),
      ey: inputs.endYear.toString(),
      ir: inputs.inflationRate.toString(),
    }),
    getShareText: () =>
      result
        ? `Inflation Analysis: $${result.originalAmount.toLocaleString()} (${result.startYear}) = $${result.adjustedAmount.toLocaleString()} (${result.endYear}) | ${result.purchasingPowerLoss.toFixed(1)}% loss in purchasing power`
        : 'Calculate inflation and purchasing power changes!',
  });

  const handleInputChange = (field: keyof InflationInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateInflation = () => {
    const { calculationType, amount, startYear, endYear, inflationRate } = inputs;
    const years = endYear - startYear;

    if (years <= 0) {
      alert('End year must be after start year!');
      return;
    }

    let adjustedAmount: number;
    let totalInflation: number;
    let calculatedInflationRate: number = inflationRate;

    if (calculationType === 'purchasing-power') {
      // Calculate future value with inflation
      adjustedAmount = amount * Math.pow(1 + inflationRate / 100, years);
      totalInflation = ((adjustedAmount - amount) / amount) * 100;
    } else if (calculationType === 'inflation-rate') {
      // Calculate inflation rate between two values
      // If user enters amount in start year and adjusted amount in end year
      // We need to reverse calculate the inflation rate
      // For simplicity, we'll show what the amount would be worth
      adjustedAmount = amount * Math.pow(1 + inflationRate / 100, years);
      totalInflation = ((adjustedAmount - amount) / amount) * 100;
    } else {
      // future-value: Calculate what you need in future to match today's purchasing power
      adjustedAmount = amount * Math.pow(1 + inflationRate / 100, years);
      totalInflation = ((adjustedAmount - amount) / amount) * 100;
    }

    const purchasingPowerLoss = (1 - amount / adjustedAmount) * 100;

    // Yearly breakdown (show every 5 years or all if less than 10 years)
    const yearlyBreakdown: { year: number; value: number; cumInflation: number }[] = [];
    const step = years <= 10 ? 1 : Math.max(1, Math.floor(years / 5));
    
    for (let i = 0; i <= years; i += step) {
      const year = startYear + i;
      const value = amount * Math.pow(1 + inflationRate / 100, i);
      const cumInflation = i === 0 ? 0 : ((value - amount) / amount) * 100;
      yearlyBreakdown.push({ year, value, cumInflation });
    }
    
    // Always include the last year if not already included
    if (yearlyBreakdown[yearlyBreakdown.length - 1].year !== endYear) {
      const value = amount * Math.pow(1 + inflationRate / 100, years);
      const cumInflation = ((value - amount) / amount) * 100;
      yearlyBreakdown.push({ year: endYear, value, cumInflation });
    }

    // Generate equivalent buying power description
    const equivalentToBuy = calculateEquivalentPurchase(amount, adjustedAmount);

    // Generate recommendations
    const recommendations = generateRecommendations(inflationRate, years, purchasingPowerLoss);

    setResult({
      calculationType,
      originalAmount: amount,
      adjustedAmount,
      startYear,
      endYear,
      years,
      inflationRate: calculatedInflationRate,
      totalInflation,
      purchasingPowerLoss,
      equivalentToBuy,
      yearlyBreakdown,
      recommendations,
    });
  };

  const calculateEquivalentPurchase = (original: number, adjusted: number): string => {
    const ratio = adjusted / original;
    
    if (ratio >= 3) {
      return `What cost $${original.toLocaleString()} then would cost $${adjusted.toLocaleString()} today. A $100 item then costs $${(100 * ratio).toFixed(0)} now!`;
    } else if (ratio >= 2) {
      return `Prices have doubled! A $${original.toLocaleString()} purchase then requires $${adjusted.toLocaleString()} today.`;
    } else if (ratio >= 1.5) {
      return `A $${original.toLocaleString()} item then costs $${adjusted.toLocaleString()} today—50%+ increase!`;
    } else {
      return `What cost $${original.toLocaleString()} then requires $${adjusted.toLocaleString()} today.`;
    }
  };

  const generateRecommendations = (rate: number, years: number, lossPercent: number): string[] => {
    const recs: string[] = [];

    // Inflation rate assessment
    if (rate > 5) {
      recs.push('⚠️ High inflation rate (>5%)! Your money loses value rapidly. Prioritize inflation-hedging investments like stocks, real estate, commodities, and I-Bonds.');
    } else if (rate > 3) {
      recs.push('📊 Moderate inflation (3-5%). This is above the Federal Reserve\'s 2% target. Consider diversifying into inflation-protected assets.');
    } else if (rate > 2) {
      recs.push('✅ Normal inflation (2-3%). This is healthy for the economy. Keep a balanced portfolio with stocks (60-70%) and bonds (30-40%).');
    } else {
      recs.push('🔵 Low inflation (<2%). While good for purchasing power, it may signal economic slowdown. Diversify investments.');
    }

    // Purchasing power loss warning
    if (lossPercent > 50) {
      recs.push(`🚨 Major purchasing power loss: ${lossPercent.toFixed(1)}%! Cash held over ${years} years lost more than half its value. Always invest excess cash.`);
    } else if (lossPercent > 30) {
      recs.push(`⚠️ Significant purchasing power loss: ${lossPercent.toFixed(1)}%. Never leave large cash amounts uninvested for long periods.`);
    } else if (lossPercent > 15) {
      recs.push(`💡 Noticeable purchasing power loss: ${lossPercent.toFixed(1)}%. Emergency funds and short-term savings are acceptable, but invest long-term money.`);
    }

    // Investment recommendations based on time horizon
    if (years >= 20) {
      recs.push('📈 Long-term horizon (20+ years): Stocks historically beat inflation by 5-7% annually. Consider low-cost index funds (S&P 500, Total Market) for maximum growth.');
    } else if (years >= 10) {
      recs.push('📊 Medium-term horizon (10-20 years): Balance growth and stability. Mix stocks (70%), bonds (20%), and real assets (10%) to outpace inflation.');
    } else if (years >= 5) {
      recs.push('💼 Short-medium term (5-10 years): Consider I-Bonds (adjust with inflation), TIPS (Treasury Inflation-Protected Securities), and dividend stocks.');
    }

    // Specific inflation hedges
    if (rate > 3) {
      recs.push('🏠 Inflation hedges to consider: Real Estate (rents increase with inflation), Commodities (gold, oil), I-Bonds (rate adjusts every 6 months), and TIPS (principal adjusts with CPI).');
    }

    // Cash holding warning
    recs.push('💰 Rule of thumb: Keep 3-6 months expenses in cash emergency fund. Invest everything else to beat inflation. High-yield savings (4-5%) can offset moderate inflation.');

    // Historical context
    if (rate >= 2 && rate <= 4) {
      recs.push('📚 Historical note: Average U.S. inflation (1913-2024) is ~3.3%. Your rate is close to historical average. Diversified portfolio needed to preserve wealth.');
    }

    return recs;
  };

  const handleReset = () => {
    setInputs({
      calculationType: 'purchasing-power',
      amount: 10000,
      startYear: 2000,
      endYear: 2024,
      inflationRate: 3.0,
    });
    setResult(null);
  };

  // Save as Image
  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = 'inflation-calculator-results.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  // Print Results
  const handlePrint = async () => {
    if (!resultRef.current) return;
    
    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Inflation Calculator Results</title>
              <style>
                body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print {
                  body { padding: 0; }
                  img { max-width: 100%; page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" onload="window.print();"/>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
      alert('Failed to print. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 sm:p-4 md:p-6 sticky top-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Inflation Calculator
            </h2>

            <div className="space-y-4 sm:space-y-5">
              {/* Calculation Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Calculation Type
                </label>
                <select
                  value={inputs.calculationType}
                  onChange={(e) => handleInputChange('calculationType', e.target.value as any)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="purchasing-power">Purchasing Power Loss</option>
                  <option value="future-value">Future Value Needed</option>
                  <option value="inflation-rate">Inflation Impact</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {inputs.calculationType === 'purchasing-power' && 'Calculate how much money loses value over time'}
                  {inputs.calculationType === 'future-value' && 'Calculate future amount needed to match today\'s purchasing power'}
                  {inputs.calculationType === 'inflation-rate' && 'Calculate total inflation impact between two years'}
                </p>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.amount}
                    onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="10000"
                    min="0"
                    step="100"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {inputs.calculationType === 'future-value' 
                    ? 'Today\'s amount (what you have now)'
                    : 'Starting amount (in start year)'}
                </p>
              </div>

              {/* Start Year */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={inputs.startYear}
                  onChange={(e) => handleInputChange('startYear', parseInt(e.target.value) || 2000)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="2000"
                  min="1900"
                  max={new Date().getFullYear()}
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">Year when you had this amount</p>
              </div>

              {/* End Year */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={inputs.endYear}
                  onChange={(e) => handleInputChange('endYear', parseInt(e.target.value) || 2024)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="2024"
                  min={inputs.startYear + 1}
                  max={2100}
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">Target year for comparison</p>
              </div>

              {/* Inflation Rate */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Annual Inflation Rate <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={inputs.inflationRate}
                    onChange={(e) => handleInputChange('inflationRate', parseFloat(e.target.value) || 0)}
                    className="w-full pl-4 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="3.0"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Average annual inflation rate (U.S. avg: ~3.3%)</p>
                
                {/* Quick presets */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleInputChange('inflationRate', 2.0)}
                    className="flex-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  >
                    2% (Target)
                  </button>
                  <button
                    onClick={() => handleInputChange('inflationRate', 3.3)}
                    className="flex-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  >
                    3.3% (Avg)
                  </button>
                  <button
                    onClick={() => handleInputChange('inflationRate', 5.0)}
                    className="flex-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  >
                    5% (High)
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={calculateInflation}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Calculate
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          {result ? (
            <div className="space-y-3 sm:space-y-4">
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3">
                <button
                  onClick={handleSaveAsImage}
                  className="flex items-center justify-center gap-2 px-3 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium min-h-[44px] w-full sm:w-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Save as Image
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 px-3 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium min-h-[44px] w-full sm:w-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-3 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md font-medium min-h-[44px] w-full sm:w-auto"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Results Content (for export) */}
              <div ref={resultRef} className="space-y-3 sm:space-y-4 bg-white p-3 sm:p-4 md:p-6 rounded-xl">
                {/* Export Header */}
                <div className="border-b-2 border-gray-200 pb-3 sm:pb-4 mb-3 sm:mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Inflation Analysis Results</h2>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Period: {result.startYear} - {result.endYear} ({result.years} years) • Inflation Rate: {result.inflationRate}%/year
                  </p>
                </div>

                {/* Main Results */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border-2 border-red-200 p-3 sm:p-4 md:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                    Purchasing Power Analysis
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
                    <div className="text-center p-3 sm:p-6 bg-white rounded-lg border-2 border-gray-200">
                      <div className="text-sm text-gray-600 mb-2">{result.startYear} Amount</div>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 break-all">
                        ${result.originalAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Original Value</div>
                    </div>

                    <div className="text-center p-3 sm:p-6 bg-white rounded-lg border-2 border-red-200">
                      <div className="text-sm text-gray-600 mb-2">{result.endYear} Equivalent</div>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 break-all">
                        ${result.adjustedAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Inflation-Adjusted Value</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                    <div className="p-3 sm:p-5 bg-white rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-600 mb-2">Total Inflation</div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600">
                        +{result.totalInflation.toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Price increase over {result.years} years</div>
                    </div>

                    <div className="p-3 sm:p-5 bg-white rounded-lg border border-red-200">
                      <div className="text-sm text-gray-600 mb-2">Purchasing Power Loss</div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600">
                        -{result.purchasingPowerLoss.toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-500 mt-2">What you can buy with same money</div>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-6 p-3 sm:p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-xs sm:text-sm text-gray-700">
                      <strong>💡 What this means:</strong> {result.equivalentToBuy}
                    </p>
                  </div>
                </div>

                {/* Yearly Breakdown */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-3 sm:p-4 md:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <span>📊</span>
                    Inflation Over Time
                  </h3>

                  <div className="overflow-x-auto overflow-y-hidden">
                    <table className="w-full min-w-[350px] text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b-2 border-blue-200">
                          <th className="px-2 sm:px-4 py-2 text-left text-sm font-semibold text-gray-700">Year</th>
                          <th className="px-2 sm:px-4 py-2 text-right text-sm font-semibold text-gray-700">Equivalent Value</th>
                          <th className="px-2 sm:px-4 py-2 text-right text-sm font-semibold text-gray-700">Cumulative Inflation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.yearlyBreakdown.map((row, index) => (
                          <tr
                            key={row.year}
                            className={`border-b border-blue-100 ${
                              index === result.yearlyBreakdown.length - 1 ? 'bg-blue-100 font-semibold' : ''
                            }`}
                          >
                            <td className="px-2 sm:px-4 py-2 text-gray-900">{row.year}</td>
                            <td className="px-2 sm:px-4 py-2 text-right text-gray-900">
                              ${row.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </td>
                            <td className="px-2 sm:px-4 py-2 text-right text-red-600">
                              {row.cumInflation > 0 ? `+${row.cumInflation.toFixed(1)}%` : '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-3 sm:p-4 md:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <span>💡</span>
                    Personalized Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> {/* End of Results Content for export */}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6 sm:p-8 md:p-12 text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4">📉</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Ready to Calculate Inflation Impact?</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Enter your amount, time period, and inflation rate to see how purchasing power changes
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Understand how inflation erodes money value and get investment recommendations
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Inflation Calculator"
      />
    </div>
  );
}

