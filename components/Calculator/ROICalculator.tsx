'use client';

import { useState, useRef } from 'react';
import { Share2, TrendingUp, DollarSign, Percent, Calendar } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

interface ROIInputs {
  initialInvestment: number;
  finalValue: number;
  additionalCosts: number;
  investmentLength: number;
  lengthUnit: 'days' | 'months' | 'years';
}

interface ROIResult {
  totalReturn: number;
  totalReturnPercentage: number;
  netProfit: number;
  roi: number;
  annualizedROI: number;
  yearsInvested: number;
  breakEvenMultiplier: number;
  recommendations: string[];
}

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    initialInvestment: 10000,
    finalValue: 15000,
    additionalCosts: 500,
    investmentLength: 3,
    lengthUnit: 'years',
  });

  const [result, setResult] = useState<ROIResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/roi-calculator',
    getShareParams: () => ({
      i: inputs.initialInvestment.toString(),
      f: inputs.finalValue.toString(),
      c: inputs.additionalCosts.toString(),
      l: inputs.investmentLength.toString(),
      u: inputs.lengthUnit,
    }),
    getShareText: () =>
      result
        ? `ROI Calculator Results:\n💰 Net Profit: $${result.netProfit.toLocaleString()}\n📊 ROI: ${result.roi.toFixed(2)}%\n📈 Annualized ROI: ${result.annualizedROI.toFixed(2)}%`
        : 'Check out this ROI Calculator!',
  });

  const handleInputChange = (field: keyof ROIInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateROI = () => {
    const { initialInvestment, finalValue, additionalCosts, investmentLength, lengthUnit } = inputs;

    // Convert investment length to years
    let yearsInvested: number;
    if (lengthUnit === 'days') {
      yearsInvested = investmentLength / 365;
    } else if (lengthUnit === 'months') {
      yearsInvested = investmentLength / 12;
    } else {
      yearsInvested = investmentLength;
    }

    // Calculate returns
    const totalReturn = finalValue - initialInvestment;
    const totalReturnPercentage = (totalReturn / initialInvestment) * 100;
    const netProfit = totalReturn - additionalCosts;
    const totalCost = initialInvestment + additionalCosts;
    
    // ROI = (Net Profit / Total Investment Cost) × 100
    const roi = (netProfit / totalCost) * 100;

    // Annualized ROI
    const annualizedROI = yearsInvested > 0
      ? (Math.pow(finalValue / totalCost, 1 / yearsInvested) - 1) * 100
      : 0;

    // Break-even multiplier (how many times initial to break even)
    const breakEvenMultiplier = totalCost / initialInvestment;

    // Generate recommendations
    const recommendations: string[] = [];

    if (roi > 20) {
      recommendations.push('✅ Excellent ROI! This investment has significantly outperformed most traditional investments.');
    } else if (roi > 10) {
      recommendations.push('👍 Good ROI. This investment has performed above average.');
    } else if (roi > 5) {
      recommendations.push('📊 Moderate ROI. This investment has performed reasonably well.');
    } else if (roi > 0) {
      recommendations.push('⚠️ Low ROI. Consider whether this investment meets your financial goals.');
    } else {
      recommendations.push('❌ Negative ROI. This investment has lost money. Review your investment strategy.');
    }

    if (annualizedROI > 15) {
      recommendations.push('🚀 Outstanding annualized return! This investment has exceptional long-term performance.');
    } else if (annualizedROI > 10) {
      recommendations.push('📈 Strong annualized return. Your investment is growing at a healthy rate.');
    } else if (annualizedROI > 7) {
      recommendations.push('💼 Solid annualized return, beating typical inflation (2-3%).');
    }

    if (additionalCosts > initialInvestment * 0.1) {
      recommendations.push('💡 Your additional costs exceed 10% of initial investment. Look for ways to reduce fees and expenses.');
    }

    if (yearsInvested < 1) {
      recommendations.push('⏱️ Short-term investment. Annualized returns may not reflect long-term performance.');
    } else if (yearsInvested > 10) {
      recommendations.push('📅 Long-term investment. Your patience has been rewarded with compound growth.');
    }

    if (roi < 7 * yearsInvested) {
      recommendations.push('🔍 Consider diversifying your portfolio or exploring higher-yield investment opportunities.');
    }

    setResult({
      totalReturn,
      totalReturnPercentage,
      netProfit,
      roi,
      annualizedROI,
      yearsInvested,
      breakEvenMultiplier,
      recommendations,
    });
  };

  const handleReset = () => {
    setInputs({
      initialInvestment: 10000,
      finalValue: 15000,
      additionalCosts: 500,
      investmentLength: 3,
      lengthUnit: 'years',
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
      link.download = 'roi-calculator-results.png';
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
              <title>ROI Calculator Results</title>
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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 sticky top-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 hidden lg:block">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Investment Details
            </h2>

            <div className="space-y-5">
              {/* Initial Investment */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Initial Investment <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={inputs.initialInvestment}
                    onChange={(e) => handleInputChange('initialInvestment', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="10000"
                    min="0"
                    step="100"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">The amount you invested initially</p>
              </div>

              {/* Final Value */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Final/Current Value <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={inputs.finalValue}
                    onChange={(e) => handleInputChange('finalValue', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="15000"
                    min="0"
                    step="100"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Current or final value of investment</p>
              </div>

              {/* Additional Costs */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Costs (Fees, Taxes)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={inputs.additionalCosts}
                    onChange={(e) => handleInputChange('additionalCosts', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="500"
                    min="0"
                    step="50"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Optional: Transaction fees, taxes, commissions</p>
              </div>

              {/* Investment Length */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Investment Duration <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={inputs.investmentLength}
                      onChange={(e) => handleInputChange('investmentLength', parseFloat(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="3"
                      min="1"
                    />
                  </div>
                  <select
                    value={inputs.lengthUnit}
                    onChange={(e) => handleInputChange('lengthUnit', e.target.value)}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="days">Days</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500 mt-1">How long you've held the investment</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={calculateROI}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Calculate ROI
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
        <div className="lg:col-span-2">
          {result ? (
            <div className="space-y-4">
              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleSaveAsImage}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Save as Image
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md font-medium"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Results Content (for export) */}
              <div ref={resultRef} className="space-y-4 bg-white p-6 rounded-xl">
                {/* Export Header */}
                <div className="border-b-2 border-gray-200 pb-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">ROI Calculator Results</h2>
                  <p className="text-sm text-gray-600">
                    Investment: ${inputs.initialInvestment.toLocaleString()} → ${inputs.finalValue.toLocaleString()} • Duration: {inputs.investmentLength} {inputs.lengthUnit}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* ROI */}
                  <div className={`rounded-xl border-2 p-6 ${result.roi >= 0 ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className={`w-5 h-5 ${result.roi >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                      <h3 className="text-lg font-bold text-gray-900">Return on Investment (ROI)</h3>
                    </div>
                    <div className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 break-all ${result.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.roi.toFixed(2)}%
                    </div>
                    <p className="text-sm text-gray-600">Net profit relative to total investment</p>
                  </div>

                  {/* Annualized ROI */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-bold text-gray-900">Annualized ROI</h3>
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-600 mb-2 break-all">
                      {result.annualizedROI.toFixed(2)}%
                    </div>
                    <p className="text-sm text-gray-600">Average yearly return ({result.yearsInvested.toFixed(2)} years)</p>
                  </div>
                </div>

                {/* Financial Breakdown */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    Financial Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-purple-100">
                      <span className="text-gray-700">Initial Investment:</span>
                      <span className="font-bold text-gray-900">${inputs.initialInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-purple-100">
                      <span className="text-gray-700">Additional Costs:</span>
                      <span className="font-bold text-gray-900">${inputs.additionalCosts.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b-2 border-purple-300">
                      <span className="text-gray-700 font-semibold">Total Investment Cost:</span>
                      <span className="font-bold text-gray-900">${(inputs.initialInvestment + inputs.additionalCosts).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-purple-100">
                      <span className="text-gray-700">Final Value:</span>
                      <span className="font-bold text-gray-900">${inputs.finalValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-purple-100">
                      <span className="text-gray-700">Total Return:</span>
                      <span className={`font-bold ${result.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${Math.abs(result.totalReturn).toLocaleString()} ({result.totalReturnPercentage.toFixed(2)}%)
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-white rounded-lg px-3 mt-2">
                      <span className="text-gray-900 font-bold text-lg">Net Profit:</span>
                      <span className={`font-bold text-2xl ${result.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {result.netProfit >= 0 ? '+' : '-'}${Math.abs(result.netProfit).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Indicators */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 p-5">
                    <h4 className="text-md font-bold text-gray-900 mb-3">📊 Break-Even Multiplier</h4>
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      {result.breakEvenMultiplier.toFixed(2)}x
                    </div>
                    <p className="text-sm text-gray-600">
                      You need to multiply your initial investment by {result.breakEvenMultiplier.toFixed(2)} to cover all costs
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl border border-cyan-200 p-5">
                    <h4 className="text-md font-bold text-gray-900 mb-3">⏱️ Investment Period</h4>
                    <div className="text-2xl font-bold text-teal-600 mb-2">
                      {result.yearsInvested.toFixed(2)} years
                    </div>
                    <p className="text-sm text-gray-600">
                      {inputs.investmentLength} {inputs.lengthUnit}
                      {result.yearsInvested >= 5 && ' (Long-term investment)'}
                    </p>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>💡</span>
                    Investment Analysis & Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-indigo-500 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> {/* End of Results Content for export */}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Calculate Your ROI?</h3>
              <p className="text-gray-600 mb-4">
                Enter your investment details and click "Calculate ROI" to analyze your returns
              </p>
              <p className="text-sm text-gray-500">
                We'll calculate ROI, annualized returns, and provide personalized investment insights
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
        calculatorName="ROI Calculator"
      />
    </div>
  );
}

