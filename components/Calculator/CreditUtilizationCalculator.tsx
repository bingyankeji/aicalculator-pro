'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Plus, Trash2, TrendingUp, AlertTriangle, CheckCircle2, Share2, Download, Printer } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';

interface CreditCard {
  id: string;
  name: string;
  balance: string;
  limit: string;
}

interface UtilizationResults {
  perCardUtilization: Array<{
    name: string;
    utilization: number;
    balance: number;
    limit: number;
    status: 'excellent' | 'good' | 'fair' | 'poor';
    statusText: string;
    color: string;
  }>;
  overallUtilization: number;
  totalBalance: number;
  totalLimit: number;
  overallStatus: 'excellent' | 'good' | 'fair' | 'poor';
  overallStatusText: string;
  creditScoreImpact: string;
  recommendations: string[];
  targetBalance: number;
  balanceReduction: number;
  limitIncrease: number;
  utilizationGoals: Array<{
    target: number;
    targetBalance: number;
    balanceReduction: number;
    limitIncrease: number;
    benefit: string;
  }>;
}

export default function CreditUtilizationCalculator() {
  const [cards, setCards] = useState<CreditCard[]>([
    { id: '1', name: 'Card 1', balance: '', limit: '' },
  ]);
  const [results, setResults] = useState<UtilizationResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/credit-utilization-calculator',
    getShareParams: () => {
      const params: Record<string, string> = {};
      cards.forEach((card, index) => {
        if (card.balance && card.limit) {
          params[`card${index + 1}_name`] = card.name;
          params[`card${index + 1}_balance`] = card.balance;
          params[`card${index + 1}_limit`] = card.limit;
        }
      });
      return params;
    },
    getShareText: () => {
      if (!results) return 'Check out my credit utilization analysis!';
      return `My credit utilization is ${results.overallUtilization.toFixed(1)}% (${results.overallStatusText}). Total balance: $${results.totalBalance.toLocaleString()}, Total limit: $${results.totalLimit.toLocaleString()}`;
    },
  });

  const addCard = () => {
    const newCard: CreditCard = {
      id: Date.now().toString(),
      name: `Card ${cards.length + 1}`,
      balance: '',
      limit: '',
    };
    setCards([...cards, newCard]);
  };

  const removeCard = (id: string) => {
    if (cards.length > 1) {
      setCards(cards.filter(card => card.id !== id));
    }
  };

  const updateCard = (id: string, field: keyof CreditCard, value: string) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const getUtilizationStatus = (utilization: number): { status: 'excellent' | 'good' | 'fair' | 'poor', text: string, color: string } => {
    if (utilization <= 10) {
      return { status: 'excellent', text: 'Excellent', color: '#10b981' };
    } else if (utilization <= 30) {
      return { status: 'good', text: 'Good', color: '#3b82f6' };
    } else if (utilization <= 50) {
      return { status: 'fair', text: 'Fair', color: '#f59e0b' };
    } else {
      return { status: 'poor', text: 'Poor', color: '#ef4444' };
    }
  };

  const getCreditScoreImpact = (utilization: number): string => {
    if (utilization <= 10) {
      return 'Minimal to no negative impact. May actually help your score.';
    } else if (utilization <= 30) {
      return 'Low impact. This is considered the "safe zone" for credit utilization.';
    } else if (utilization <= 50) {
      return 'Moderate impact. Your score could improve significantly by reducing utilization.';
    } else if (utilization <= 75) {
      return 'High impact. Utilization this high can lower your score by 50-100 points.';
    } else {
      return 'Severe impact. Maxed out cards can lower your score by 100+ points.';
    }
  };

  const getRecommendations = (utilization: number, totalBalance: number, totalLimit: number): string[] => {
    const recommendations: string[] = [];

    if (utilization > 30) {
      recommendations.push('Pay down balances below 30% total utilization to improve your credit score.');
    }

    if (utilization > 50) {
      recommendations.push('Consider making multiple payments per month to keep balances low.');
    }

    if (utilization <= 10) {
      recommendations.push('Excellent! Your utilization is in the optimal range. Keep it up!');
    }

    if (utilization > 30) {
      const target30Balance = totalLimit * 0.30;
      const reductionNeeded = totalBalance - target30Balance;
      recommendations.push(`Pay down $${reductionNeeded.toFixed(2)} to reach 30% utilization.`);
    }

    if (utilization > 10) {
      const target10Balance = totalLimit * 0.10;
      const reductionNeeded = totalBalance - target10Balance;
      recommendations.push(`Pay down $${reductionNeeded.toFixed(2)} to reach the ideal 10% utilization.`);
    }

    recommendations.push('Request credit limit increases from your card issuers (if your payment history is good).');
    recommendations.push('Avoid closing old credit cards, as this reduces your total available credit.');
    recommendations.push('Set up balance alerts to stay aware of your utilization throughout the month.');

    return recommendations;
  };

  const calculateUtilization = () => {
    const validCards = cards.filter(card => {
      const balance = parseFloat(card.balance);
      const limit = parseFloat(card.limit);
      return !isNaN(balance) && !isNaN(limit) && limit > 0;
    });

    if (validCards.length === 0) {
      alert('Please enter valid balance and limit for at least one card.');
      return;
    }

    let totalBalance = 0;
    let totalLimit = 0;

    const perCardUtilization = validCards.map(card => {
      const balance = parseFloat(card.balance);
      const limit = parseFloat(card.limit);
      const utilization = (balance / limit) * 100;
      const statusInfo = getUtilizationStatus(utilization);

      totalBalance += balance;
      totalLimit += limit;

      return {
        name: card.name,
        balance,
        limit,
        utilization,
        status: statusInfo.status,
        statusText: statusInfo.text,
        color: statusInfo.color,
      };
    });

    const overallUtilization = (totalBalance / totalLimit) * 100;
    const overallStatusInfo = getUtilizationStatus(overallUtilization);

    // Calculate goals
    const utilizationGoals = [
      {
        target: 30,
        targetBalance: totalLimit * 0.30,
        balanceReduction: Math.max(0, totalBalance - (totalLimit * 0.30)),
        limitIncrease: Math.max(0, (totalBalance / 0.30) - totalLimit),
        benefit: 'Good credit utilization (recommended maximum)',
      },
      {
        target: 10,
        targetBalance: totalLimit * 0.10,
        balanceReduction: Math.max(0, totalBalance - (totalLimit * 0.10)),
        limitIncrease: Math.max(0, (totalBalance / 0.10) - totalLimit),
        benefit: 'Excellent utilization (ideal for best credit score)',
      },
    ];

    const resultsData: UtilizationResults = {
      perCardUtilization,
      overallUtilization,
      totalBalance,
      totalLimit,
      overallStatus: overallStatusInfo.status,
      overallStatusText: overallStatusInfo.text,
      creditScoreImpact: getCreditScoreImpact(overallUtilization),
      recommendations: getRecommendations(overallUtilization, totalBalance, totalLimit),
      targetBalance: totalLimit * 0.30,
      balanceReduction: Math.max(0, totalBalance - (totalLimit * 0.30)),
      limitIncrease: Math.max(0, (totalBalance / 0.30) - totalLimit),
      utilizationGoals,
    };

    setResults(resultsData);
    setShowResults(true);

    // Update URL with parameters
    const params = new URLSearchParams();
    validCards.forEach((card, index) => {
      params.set(`card${index + 1}_name`, card.name);
      params.set(`card${index + 1}_balance`, card.balance);
      params.set(`card${index + 1}_limit`, card.limit);
    });
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleSaveImage = async () => {
    const element = document.getElementById('results-section');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'credit-utilization-results.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };


  // Load URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loadedCards: CreditCard[] = [];
    
    let index = 1;
    while (params.has(`card${index}_balance`) && params.has(`card${index}_limit`)) {
      loadedCards.push({
        id: index.toString(),
        name: params.get(`card${index}_name`) || `Card ${index}`,
        balance: params.get(`card${index}_balance`) || '',
        limit: params.get(`card${index}_limit`) || '',
      });
      index++;
    }

    if (loadedCards.length > 0) {
      setCards(loadedCards);
      // Auto-calculate if URL params are present
      setTimeout(() => {
        const calculateButton = document.querySelector('button[type="button"]') as HTMLButtonElement;
        if (calculateButton && calculateButton.textContent?.includes('Calculate')) {
          calculateButton.click();
        }
      }, 100);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <Calculator className="h-6 w-6 text-blue-600" />
                Credit Card Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {cards.map((card, index) => (
                <div key={card.id} className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={card.name}
                      onChange={(e) => updateCard(card.id, 'name', e.target.value)}
                      className="font-semibold text-gray-900 bg-transparent border-b border-dashed border-gray-400 focus:outline-none focus:border-blue-600"
                      placeholder="Card name"
                    />
                    {cards.length > 1 && (
                      <button
                        onClick={() => removeCard(card.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Remove card"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`balance-${card.id}`} className="text-sm font-medium">
                      Current Balance <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id={`balance-${card.id}`}
                        type="number"
                        value={card.balance}
                        onChange={(e) => updateCard(card.id, 'balance', e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`limit-${card.id}`} className="text-sm font-medium">
                      Credit Limit <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id={`limit-${card.id}`}
                        type="number"
                        value={card.limit}
                        onChange={(e) => updateCard(card.id, 'limit', e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                        min="1"
                        step="1"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                onClick={addCard}
                variant="outline"
                className="w-full border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Card
              </Button>
            </CardContent>
          </Card>

          <Button 
            onClick={calculateUtilization}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 sm:py-4 text-base sm:text-lg min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Utilization
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" id="results-section">
          {showResults && results && (
            <div className="space-y-6">
              {/* Export Buttons */}
              <div className="flex flex-wrap gap-3 print:hidden">
                <Button onClick={handleSaveImage} variant="outline" className="flex-1 sm:flex-none">
                  <Download className="h-4 w-4 mr-2" />
                  Save as Image
                </Button>
                <Button onClick={handlePrint} variant="outline" className="flex-1 sm:flex-none">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button onClick={handleShare} variant="outline" className="flex-1 sm:flex-none">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Overall Utilization */}
              <Card className="shadow-lg border-l-4" style={{ borderLeftColor: getUtilizationStatus(results.overallUtilization).color }}>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">Overall Credit Utilization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                    <div className="text-5xl sm:text-6xl font-bold mb-2" style={{ color: getUtilizationStatus(results.overallUtilization).color }}>
                      {results.overallUtilization.toFixed(1)}%
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold text-gray-700 mb-1">
                      {results.overallStatusText}
                    </div>
                    <div className="text-sm text-gray-600 mt-3">
                      ${results.totalBalance.toLocaleString()} / ${results.totalLimit.toLocaleString()} total
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">Total Balance</div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">
                        ${results.totalBalance.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">Total Credit</div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">
                        ${results.totalLimit.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">Available Credit</div>
                      <div className="text-xl sm:text-2xl font-bold text-green-600">
                        ${(results.totalLimit - results.totalBalance).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Credit Score Impact */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Credit Score Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{results.creditScoreImpact}</p>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">
                      <strong>Note:</strong> Credit utilization accounts for approximately 30% of your FICO credit score, making it the second most important factor after payment history.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Per-Card Utilization */}
              {results.perCardUtilization.length > 1 && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Individual Card Utilization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {results.perCardUtilization.map((card, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">{card.name}</span>
                            <span className="text-lg font-bold" style={{ color: card.color }}>
                              {card.utilization.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                            <div
                              className="h-3 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${Math.min(card.utilization, 100)}%`,
                                backgroundColor: card.color 
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>${card.balance.toLocaleString()} / ${card.limit.toLocaleString()}</span>
                            <span className="font-medium" style={{ color: card.color }}>{card.statusText}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Utilization Goals */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>How to Reach Target Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.utilizationGoals.map((goal, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-semibold text-gray-900">Target: {goal.target}% Utilization</h4>
                          {goal.target === 10 ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-6 w-6 text-orange-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{goal.benefit}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <div className="text-gray-600 mb-1">Option 1: Pay Down Balance</div>
                            <div className="text-xl font-bold text-blue-600">
                              ${goal.balanceReduction.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              to reach target balance of ${goal.targetBalance.toLocaleString()}
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <div className="text-gray-600 mb-1">Option 2: Increase Limit</div>
                            <div className="text-xl font-bold text-green-600">
                              ${goal.limitIncrease.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              to reach required limit of ${(results.totalBalance / (goal.target / 100)).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Personalized Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-blue-600 font-bold mt-1">•</span>
                        <span className="text-gray-700 flex-1">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Visualization */}
              {results.perCardUtilization.length > 1 && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Balance Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={results.perCardUtilization.map(card => ({
                            name: card.name,
                            value: card.balance,
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {results.perCardUtilization.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {!showResults && (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center text-gray-500">
                <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">Enter your credit card information and click "Calculate Utilization" to see your results.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Credit Utilization Calculator"
      />
    </div>
  );
}

