'use client';

import { useState } from 'react';

interface AIAffordabilityAnalysisProps {
  inputs: {
    homePrice: number;
    downPayment: number;
    downPaymentType: 'dollar' | 'percent';
    loanTerm: number;
    interestRate: number;
    [key: string]: any;
  };
  result: {
    monthlyPayment: number;
    principalAndInterest: number;
    loanAmount: number;
    downPaymentAmount: number;
    downPaymentPercent: number;
    totalInterest: number;
    [key: string]: any;
  };
}

export function AIAffordabilityAnalysis({ inputs, result }: AIAffordabilityAnalysisProps) {
  const [showPanel, setShowPanel] = useState(false);
  
  // User inputs
  const [annualIncome, setAnnualIncome] = useState('');
  const [monthlyDebts, setMonthlyDebts] = useState('');
  
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = () => {
    const income = parseFloat(annualIncome) || 0;
    const debts = parseFloat(monthlyDebts) || 0;

    if (income === 0) return;

    const monthlyIncome = income / 12;
    const frontEndRatio = (result.monthlyPayment / monthlyIncome) * 100;
    const backEndRatio = ((result.monthlyPayment + debts) / monthlyIncome) * 100;
    
    // DTI Rating
    let rating = '';
    let ratingColor = '';
    let message = '';
    
    if (frontEndRatio <= 28 && backEndRatio <= 36) {
      rating = 'Excellent';
      ratingColor = 'green';
      message = 'Your debt-to-income ratios are within ideal ranges recommended by financial institutions. You have strong affordability for this mortgage.';
    } else if (frontEndRatio <= 33 && backEndRatio <= 43) {
      rating = 'Good';
      ratingColor = 'blue';
      message = 'Your debt ratios are acceptable and within qualification standards for most lenders. Monitor your debt levels carefully.';
    } else if (frontEndRatio <= 38 && backEndRatio <= 50) {
      rating = 'Fair';
      ratingColor = 'yellow';
      message = 'Your debt ratios are high and may impact loan approval. Consider reducing debts or choosing a less expensive property.';
    } else {
      rating = 'Poor';
      ratingColor = 'red';
      message = 'Your debt ratios exceed safe levels. This mortgage may be difficult to qualify for and carries significant financial risk.';
    }
    
    // Recommendations
    const recommendations = [];
    
    if (frontEndRatio > 28) {
      const targetPayment = monthlyIncome * 0.28;
      const difference = result.monthlyPayment - targetPayment;
      recommendations.push(`To meet the 28% housing ratio guideline, consider reducing your monthly payment by $${Math.round(difference).toLocaleString()} through a larger down payment or lower-priced property.`);
    }
    
    if (backEndRatio > 36) {
      const targetTotal = monthlyIncome * 0.36;
      const currentTotal = result.monthlyPayment + debts;
      const difference = currentTotal - targetTotal;
      recommendations.push(`Your total debt payments exceed 36% of income. Consider paying down $${Math.round(difference).toLocaleString()} in monthly debts before purchasing.`);
    }
    
    if (result.downPaymentPercent < 20) {
      recommendations.push(`Increasing your down payment to 20% would eliminate PMI insurance and reduce your monthly payment, improving your debt ratios.`);
    }
    
    if (inputs.loanTerm === 30 && frontEndRatio < 33) {
      recommendations.push(`You may qualify for a shorter loan term (15 or 20 years) which would save significant interest while keeping payments affordable.`);
    }
    
    // Warnings
    const warnings = [];
    
    if (backEndRatio > 43) {
      warnings.push('Your total debt-to-income ratio exceeds 43%, which may disqualify you from conventional mortgages. Most lenders require DTI below 43%.');
    }
    
    if (frontEndRatio > 35) {
      warnings.push('Your housing cost ratio is very high. This leaves minimal cushion for unexpected expenses or income changes.');
    }
    
    const remainingIncome = monthlyIncome - result.monthlyPayment - debts;
    const remainingPercent = (remainingIncome / monthlyIncome) * 100;
    
    if (remainingPercent < 20) {
      warnings.push(`After mortgage and debt payments, you'll have only ${remainingPercent.toFixed(1)}% of income remaining for all other expenses (food, utilities, transportation, savings).`);
    }
    
    setAnalysis({
      monthlyIncome,
      frontEndRatio,
      backEndRatio,
      rating,
      ratingColor,
      message,
      recommendations,
      warnings,
      remainingIncome,
      remainingPercent
    });
  };

  return (
    <div className="mt-8">
      {/* AI Analysis Banner */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🤖</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">AI Affordability Analysis</h3>
              <p className="text-sm text-gray-600">
                Professional debt-to-income (DTI) assessment and affordability evaluation
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPanel(!showPanel)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md"
          >
            {showPanel ? '▼ Hide Analysis' : '▶ Get AI Analysis'}
          </button>
        </div>
      </div>

      {/* Analysis Panel */}
      {showPanel && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Input Section */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-xl">💰</span>
              Your Financial Information
            </h4>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Gross Income ($)
                </label>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  placeholder="96,000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Your total annual income before taxes</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Debt Payments ($)
                </label>
                <input
                  type="number"
                  value={monthlyDebts}
                  onChange={(e) => setMonthlyDebts(e.target.value)}
                  placeholder="500"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Car loans, credit cards, student loans, etc.</p>
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!annualIncome}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
            >
              🎯 Generate Analysis
            </button>
          </div>

          {/* Results */}
          {analysis && (
            <div className="p-6 space-y-6">
              {/* DTI Ratios */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">📊</span>
                  Debt-to-Income (DTI) Ratios
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className={`rounded-lg p-4 border-2 ${
                    analysis.frontEndRatio <= 28 ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
                  }`}>
                    <div className="text-sm font-medium text-gray-600 mb-1">Front-End Ratio</div>
                    <div className={`text-4xl font-bold mb-2 ${
                      analysis.frontEndRatio <= 28 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analysis.frontEndRatio.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600 mb-2">Housing costs / Gross income</div>
                    <div className="text-sm font-medium">
                      {analysis.frontEndRatio <= 28 ? '✓ Within 28% guideline' : '⚠ Exceeds 28% guideline'}
                    </div>
                  </div>

                  <div className={`rounded-lg p-4 border-2 ${
                    analysis.backEndRatio <= 36 ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
                  }`}>
                    <div className="text-sm font-medium text-gray-600 mb-1">Back-End Ratio</div>
                    <div className={`text-4xl font-bold mb-2 ${
                      analysis.backEndRatio <= 36 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analysis.backEndRatio.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600 mb-2">All debts / Gross income</div>
                    <div className="text-sm font-medium">
                      {analysis.backEndRatio <= 36 ? '✓ Within 36% guideline' : '⚠ Exceeds 36% guideline'}
                    </div>
                  </div>
                </div>

                {/* Overall Rating */}
                <div className={`rounded-lg p-4 border-2 ${
                  analysis.ratingColor === 'green' ? 'bg-green-50 border-green-300' :
                  analysis.ratingColor === 'blue' ? 'bg-blue-50 border-blue-300' :
                  analysis.ratingColor === 'yellow' ? 'bg-yellow-50 border-yellow-300' :
                  'bg-red-50 border-red-300'
                }`}>
                  <div className="text-sm font-medium text-gray-600 mb-1">Affordability Rating</div>
                  <div className={`text-3xl font-bold mb-2 ${
                    analysis.ratingColor === 'green' ? 'text-green-600' :
                    analysis.ratingColor === 'blue' ? 'text-blue-600' :
                    analysis.ratingColor === 'yellow' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {analysis.rating}
                  </div>
                  <p className="text-sm text-gray-700">{analysis.message}</p>
                </div>
              </div>

              {/* Budget Breakdown */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">💵</span>
                  Monthly Budget Breakdown
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Gross Monthly Income</span>
                    <span className="text-lg font-bold text-gray-900">${analysis.monthlyIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Mortgage Payment</span>
                    <span className="text-lg font-bold text-blue-600">-${result.monthlyPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Other Debt Payments</span>
                    <span className="text-lg font-bold text-orange-600">-${parseFloat(monthlyDebts || '0').toLocaleString()}</span>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-lg border-2 ${
                    analysis.remainingPercent >= 30 ? 'bg-green-50 border-green-300' :
                    analysis.remainingPercent >= 20 ? 'bg-yellow-50 border-yellow-300' :
                    'bg-red-50 border-red-300'
                  }`}>
                    <span className="text-sm font-bold text-gray-900">Remaining for Living Expenses</span>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        analysis.remainingPercent >= 30 ? 'text-green-600' :
                        analysis.remainingPercent >= 20 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        ${Math.round(analysis.remainingIncome).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">({analysis.remainingPercent.toFixed(1)}% of income)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              {analysis.recommendations.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    Recommendations
                  </h4>
                  <ul className="space-y-3">
                    {analysis.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <span className="text-blue-600 font-bold text-lg flex-shrink-0">•</span>
                        <span className="text-sm text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warnings */}
              {analysis.warnings.length > 0 && (
                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">⚠️</span>
                    Important Warnings
                  </h4>
                  <ul className="space-y-3">
                    {analysis.warnings.map((warning: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border-l-4 border-red-500">
                        <span className="text-red-600 font-bold text-lg flex-shrink-0">!</span>
                        <span className="text-sm text-gray-700 font-medium">{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Standard Guidelines Reference */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">📋</span>
                  DTI Ratio Guidelines
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-white rounded-lg">
                    <div className="font-bold text-gray-900 mb-1">Front-End Ratio (Housing)</div>
                    <div className="text-gray-700">≤ 28% - Ideal</div>
                    <div className="text-gray-700">28-33% - Acceptable</div>
                    <div className="text-gray-700">&gt; 33% - High Risk</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="font-bold text-gray-900 mb-1">Back-End Ratio (All Debts)</div>
                    <div className="text-gray-700">≤ 36% - Ideal</div>
                    <div className="text-gray-700">36-43% - Acceptable</div>
                    <div className="text-gray-700">&gt; 43% - High Risk</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  These are general guidelines used by financial institutions globally. Specific requirements may vary by lender and region.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
