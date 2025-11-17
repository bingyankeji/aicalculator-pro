'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Copy, Share2, Printer, Download, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface BudgetResult {
  monthlyIncome: number;
  totalExpenses: number;
  remainingBalance: number;
  savingsRate: number;
  needsTotal: number;
  wantsTotal: number;
  savingsTotal: number;
  needsPercentage: number;
  wantsPercentage: number;
  savingsPercentage: number;
  recommended503020: {
    needs: number;
    wants: number;
    savings: number;
  };
  financialHealth: {
    score: number;
    rating: string;
    color: string;
    recommendations: string[];
  };
}

export default function BudgetCalculator() {
  // Income
  const [salary, setSalary] = useState('');
  const [otherIncome, setOtherIncome] = useState('');

  // Needs (50%)
  const [housing, setHousing] = useState('');
  const [utilities, setUtilities] = useState('');
  const [groceries, setGroceries] = useState('');
  const [transportation, setTransportation] = useState('');
  const [insurance, setInsurance] = useState('');

  // Wants (30%)
  const [entertainment, setEntertainment] = useState('');
  const [diningOut, setDiningOut] = useState('');
  const [shopping, setShopping] = useState('');
  const [subscriptions, setSubscriptions] = useState('');

  // Savings & Debt (20%)
  const [savings, setSavings] = useState('');
  const [debtPayment, setDebtPayment] = useState('');
  const [investment, setInvestment] = useState('');

  const [result, setResult] = useState<BudgetResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/budget-calculator',
    getShareParams: () => ({
      s: salary || '',
      o: otherIncome || '',
      h: housing || '',
      u: utilities || '',
      g: groceries || '',
      t: transportation || '',
      i: insurance || '',
    }),
    getShareText: () => {
      return result
        ? `Budget Calculator: Income $${result.monthlyIncome.toLocaleString()}/mo | Expenses $${result.totalExpenses.toLocaleString()} | Balance $${result.remainingBalance.toLocaleString()} | Financial Health: ${result.financialHealth.rating}`
        : 'Plan your budget with the 50/30/20 rule and get personalized financial advice!';
    },
  });

  const calculate = () => {
    // Calculate income
    const monthlyIncome = (parseFloat(salary) || 0) + (parseFloat(otherIncome) || 0);

    if (monthlyIncome <= 0) {
      alert('Please enter your monthly income.');
      return;
    }

    // Calculate needs (50%)
    const needsTotal = 
      (parseFloat(housing) || 0) +
      (parseFloat(utilities) || 0) +
      (parseFloat(groceries) || 0) +
      (parseFloat(transportation) || 0) +
      (parseFloat(insurance) || 0);

    // Calculate wants (30%)
    const wantsTotal = 
      (parseFloat(entertainment) || 0) +
      (parseFloat(diningOut) || 0) +
      (parseFloat(shopping) || 0) +
      (parseFloat(subscriptions) || 0);

    // Calculate savings & debt (20%)
    const savingsTotal = 
      (parseFloat(savings) || 0) +
      (parseFloat(debtPayment) || 0) +
      (parseFloat(investment) || 0);

    const totalExpenses = needsTotal + wantsTotal + savingsTotal;
    const remainingBalance = monthlyIncome - totalExpenses;
    const savingsRate = (savingsTotal / monthlyIncome) * 100;

    // Calculate percentages
    const needsPercentage = (needsTotal / monthlyIncome) * 100;
    const wantsPercentage = (wantsTotal / monthlyIncome) * 100;
    const savingsPercentage = (savingsTotal / monthlyIncome) * 100;

    // Recommended 50/30/20 amounts
    const recommended503020 = {
      needs: monthlyIncome * 0.5,
      wants: monthlyIncome * 0.3,
      savings: monthlyIncome * 0.2
    };

    // Financial health score and recommendations
    const financialHealth = calculateFinancialHealth(
      monthlyIncome,
      needsPercentage,
      wantsPercentage,
      savingsPercentage,
      remainingBalance
    );

    setResult({
      monthlyIncome,
      totalExpenses,
      remainingBalance,
      savingsRate,
      needsTotal,
      wantsTotal,
      savingsTotal,
      needsPercentage,
      wantsPercentage,
      savingsPercentage,
      recommended503020,
      financialHealth
    });
  };

  const calculateFinancialHealth = (
    income: number,
    needsPct: number,
    wantsPct: number,
    savingsPct: number,
    balance: number
  ): BudgetResult['financialHealth'] => {
    let score = 100;
    const recommendations: string[] = [];

    // Check needs percentage (ideal: ≤50%)
    if (needsPct > 60) {
      score -= 25;
      recommendations.push('⚠️ Essential expenses exceed 60%. Consider reducing housing costs or finding ways to lower utilities.');
    } else if (needsPct > 50) {
      score -= 10;
      recommendations.push('💡 Essential expenses are above 50%. Try to find savings in transportation or grocery costs.');
    }

    // Check wants percentage (ideal: ≤30%)
    if (wantsPct > 40) {
      score -= 20;
      recommendations.push('⚠️ Discretionary spending exceeds 40%. Consider cutting back on entertainment, dining out, or subscriptions.');
    } else if (wantsPct > 30) {
      score -= 10;
      recommendations.push('💡 Discretionary spending is above 30%. Review entertainment and shopping expenses.');
    }

    // Check savings percentage (ideal: ≥20%)
    if (savingsPct < 10) {
      score -= 30;
      recommendations.push('🚨 Savings rate below 10% is concerning. Aim to save at least 20% of your income for financial security.');
    } else if (savingsPct < 15) {
      score -= 15;
      recommendations.push('💡 Savings rate below 15%. Try to increase to 20% by cutting non-essential expenses.');
    } else if (savingsPct >= 25) {
      recommendations.push('✅ Excellent savings rate! You\'re building strong financial security.');
    }

    // Check remaining balance
    if (balance < 0) {
      score -= 25;
      recommendations.push('🚨 Spending exceeds income! This is unsustainable. Immediately cut expenses or increase income.');
    } else if (balance < income * 0.05) {
      score -= 10;
      recommendations.push('⚠️ Very little buffer remaining. Unexpected expenses could cause problems.');
    }

    // Ensure score is between 0-100
    score = Math.max(0, Math.min(100, score));

    // Determine rating
    let rating: string;
    let color: string;
    if (score >= 80) {
      rating = 'Excellent';
      color = 'green';
    } else if (score >= 60) {
      rating = 'Good';
      color = 'blue';
    } else if (score >= 40) {
      rating = 'Fair';
      color = 'yellow';
    } else {
      rating = 'Needs Improvement';
      color = 'red';
    }

    if (recommendations.length === 0 && score >= 80) {
      recommendations.push('✅ Your budget is well-balanced! Keep up the good work.');
    }

    return { score, rating, color, recommendations };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Save as Image
  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `budget-calculator-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  // Print Results
  const handlePrint = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
              <title>Budget Calculator Results</title>
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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Left: Input Area (1 column) */}
        <div className="xl:col-span-1">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
              <CardTitle className="text-xl">Monthly Budget</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Enter your income and expenses</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Income Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm">💰 Monthly Income</h3>
                <div>
                  <Label htmlFor="salary" className="text-xs">
                    Salary/Wages <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="salary"
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                    placeholder="e.g., 5000"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label htmlFor="otherIncome" className="text-xs">
                    Other Income <span className="text-gray-400">- Optional</span>
                  </Label>
                  <input
                    id="otherIncome"
                    type="number"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                    placeholder="e.g., 500"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">Freelance, investments, etc.</p>
                </div>
              </div>

              {/* Needs Section (50%) */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-gray-900 text-sm">🏠 Needs (Target: 50%)</h3>
                <div>
                  <Label htmlFor="housing" className="text-xs">Housing (Rent/Mortgage)</Label>
                  <input
                    id="housing"
                    type="number"
                    value={housing}
                    onChange={(e) => setHousing(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                    placeholder="e.g., 1500"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="utilities" className="text-xs">Utilities</Label>
                    <input
                      id="utilities"
                      type="number"
                      value={utilities}
                      onChange={(e) => setUtilities(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      placeholder="150"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="groceries" className="text-xs">Groceries</Label>
                    <input
                      id="groceries"
                      type="number"
                      value={groceries}
                      onChange={(e) => setGroceries(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      placeholder="400"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="transportation" className="text-xs">Transportation</Label>
                    <input
                      id="transportation"
                      type="number"
                      value={transportation}
                      onChange={(e) => setTransportation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      placeholder="200"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insurance" className="text-xs">Insurance</Label>
                    <input
                      id="insurance"
                      type="number"
                      value={insurance}
                      onChange={(e) => setInsurance(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      placeholder="250"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              {/* Wants Section (30%) */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-gray-900 text-sm">🎉 Wants (Target: 30%)</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="entertainment" className="text-xs">Entertainment</Label>
                    <input
                      id="entertainment"
                      type="number"
                      value={entertainment}
                      onChange={(e) => setEntertainment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      placeholder="200"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="diningOut" className="text-xs">Dining Out</Label>
                    <input
                      id="diningOut"
                      type="number"
                      value={diningOut}
                      onChange={(e) => setDiningOut(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      placeholder="300"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="shopping" className="text-xs">Shopping</Label>
                    <input
                      id="shopping"
                      type="number"
                      value={shopping}
                      onChange={(e) => setShopping(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      placeholder="200"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subscriptions" className="text-xs">Subscriptions</Label>
                    <input
                      id="subscriptions"
                      type="number"
                      value={subscriptions}
                      onChange={(e) => setSubscriptions(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      placeholder="50"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              {/* Savings & Debt Section (20%) */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-gray-900 text-sm">💎 Savings & Debt (Target: 20%)</h3>
                <div>
                  <Label htmlFor="savings" className="text-xs">Savings/Emergency Fund</Label>
                  <input
                    id="savings"
                    type="number"
                    value={savings}
                    onChange={(e) => setSavings(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                    placeholder="e.g., 500"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="debtPayment" className="text-xs">Debt Payment</Label>
                    <input
                      id="debtPayment"
                      type="number"
                      value={debtPayment}
                      onChange={(e) => setDebtPayment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      placeholder="300"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="investment" className="text-xs">Investment</Label>
                    <input
                      id="investment"
                      type="number"
                      value={investment}
                      onChange={(e) => setInvestment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      placeholder="200"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={calculate}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 min-h-[44px]"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Analyze Budget
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right: Results Area (2 columns) */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl">Budget Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result ? (
                <div className="space-y-4">
                  {/* Financial Health Score */}
                  <div className={`rounded-lg border-2 p-4 ${
                    result.financialHealth.color === 'green' ? 'bg-green-50 border-green-400' :
                    result.financialHealth.color === 'blue' ? 'bg-blue-50 border-blue-400' :
                    result.financialHealth.color === 'yellow' ? 'bg-yellow-50 border-yellow-400' :
                    'bg-red-50 border-red-400'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Financial Health Score:</p>
                      <span className="text-2xl font-bold">{result.financialHealth.score}/100</span>
                    </div>
                    <p className={`text-xl font-bold ${
                      result.financialHealth.color === 'green' ? 'text-green-700' :
                      result.financialHealth.color === 'blue' ? 'text-blue-700' :
                      result.financialHealth.color === 'yellow' ? 'text-yellow-700' :
                      'text-red-700'
                    }`}>
                      {result.financialHealth.rating}
                    </p>
                  </div>

                  {/* Income vs Expenses */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-xs text-gray-600 mb-1">Monthly Income:</p>
                      <p className="font-mono text-xl font-bold text-green-700">
                        ${result.monthlyIncome.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-xs text-gray-600 mb-1">Total Expenses:</p>
                      <p className="font-mono text-xl font-bold text-orange-700">
                        ${result.totalExpenses.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-xs text-gray-600 mb-1">Remaining:</p>
                      <p className={`font-mono text-xl font-bold ${result.remainingBalance >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                        {result.remainingBalance >= 0 ? <TrendingUp className="inline h-5 w-5 mr-1" /> : <TrendingDown className="inline h-5 w-5 mr-1" />}
                        ${Math.abs(result.remainingBalance).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </p>
                    </div>
                  </div>

                  {/* Budget Breakdown - 50/30/20 Rule */}
                  <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">📊 50/30/20 Budget Rule Analysis</h3>
                    
                    {/* Needs */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">🏠 Needs</span>
                        <span className="text-sm">
                          ${result.needsTotal.toLocaleString(undefined, {minimumFractionDigits: 2})} 
                          <span className={`ml-2 font-bold ${result.needsPercentage <= 50 ? 'text-green-600' : result.needsPercentage <= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                            ({result.needsPercentage.toFixed(1)}%)
                          </span>
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${result.needsPercentage <= 50 ? 'bg-green-500' : result.needsPercentage <= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(result.needsPercentage, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Target: ${result.recommended503020.needs.toLocaleString(undefined, {minimumFractionDigits: 2})} (50%)
                      </p>
                    </div>

                    {/* Wants */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">🎉 Wants</span>
                        <span className="text-sm">
                          ${result.wantsTotal.toLocaleString(undefined, {minimumFractionDigits: 2})} 
                          <span className={`ml-2 font-bold ${result.wantsPercentage <= 30 ? 'text-green-600' : result.wantsPercentage <= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                            ({result.wantsPercentage.toFixed(1)}%)
                          </span>
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${result.wantsPercentage <= 30 ? 'bg-green-500' : result.wantsPercentage <= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(result.wantsPercentage, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Target: ${result.recommended503020.wants.toLocaleString(undefined, {minimumFractionDigits: 2})} (30%)
                      </p>
                    </div>

                    {/* Savings */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">💎 Savings & Debt</span>
                        <span className="text-sm">
                          ${result.savingsTotal.toLocaleString(undefined, {minimumFractionDigits: 2})} 
                          <span className={`ml-2 font-bold ${result.savingsPercentage >= 20 ? 'text-green-600' : result.savingsPercentage >= 15 ? 'text-yellow-600' : 'text-red-600'}`}>
                            ({result.savingsPercentage.toFixed(1)}%)
                          </span>
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${result.savingsPercentage >= 20 ? 'bg-green-500' : result.savingsPercentage >= 15 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(result.savingsPercentage, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Target: ${result.recommended503020.savings.toLocaleString(undefined, {minimumFractionDigits: 2})} (20%)
                      </p>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-blue-600" />
                      Personalized Recommendations
                    </h3>
                    <div className="space-y-2">
                      {result.financialHealth.recommendations.map((rec, index) => (
                        <p key={index} className="text-sm text-gray-700 leading-relaxed">
                          {rec}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Savings Rate */}
                  <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Savings Rate:</p>
                        <p className="text-2xl font-bold text-purple-700">
                          {result.savingsRate.toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Annual Savings:</p>
                        <p className="text-lg font-bold text-purple-700">
                          ${(result.savingsTotal * 12).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center text-gray-500">
                    <Calculator className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Enter your budget and click Analyze</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reference Card */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
          <CardTitle className="text-xl">50/30/20 Budget Rule</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border-2 border-green-200 p-4">
              <h3 className="text-lg font-semibold text-green-700 mb-3">🏠 Needs (50%)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Essential expenses you can't avoid:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Housing (rent/mortgage)</li>
                <li>• Utilities & phone</li>
                <li>• Groceries</li>
                <li>• Transportation</li>
                <li>• Insurance</li>
                <li>• Minimum debt payments</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">🎉 Wants (30%)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Discretionary spending:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Entertainment</li>
                <li>• Dining out</li>
                <li>• Shopping</li>
                <li>• Hobbies</li>
                <li>• Subscriptions</li>
                <li>• Vacations</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border-2 border-purple-200 p-4">
              <h3 className="text-lg font-semibold text-purple-700 mb-3">💎 Savings (20%)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Future financial security:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Emergency fund</li>
                <li>• Retirement (401k, IRA)</li>
                <li>• Investments</li>
                <li>• Extra debt payments</li>
                <li>• Down payment savings</li>
                <li>• College fund</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
        <Button 
          onClick={handleSaveAsImage} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Download className="h-4 w-4" />
          Save as Image
        </Button>
        
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Printer className="h-4 w-4" />
          Print Budget
        </Button>
        
        <Button 
          onClick={handleShare} 
          variant="outline" 
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share Calculator
        </Button>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Budget Calculator"
      />
    </div>
  );
}

