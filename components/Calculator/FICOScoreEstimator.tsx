'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, AlertCircle, CheckCircle2, Share2, Download, Printer, Info } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import html2canvas from 'html2canvas';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';

interface FICOInputs {
  paymentHistory: number; // 0-100
  creditUtilization: number; // 0-100
  creditHistoryLength: number; // years
  newCredit: number; // number of recent inquiries
  creditMix: number; // 1-5 rating
}

interface FICOResults {
  estimatedScore: number;
  scoreRange: 'Poor' | 'Fair' | 'Good' | 'Very Good' | 'Exceptional';
  rangeColor: string;
  factorScores: Array<{
    factor: string;
    weight: number;
    score: number;
    impact: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    impactColor: string;
  }>;
  recommendations: string[];
  loanQualification: {
    mortgage: { qualified: boolean; rate: string; description: string };
    auto: { qualified: boolean; rate: string; description: string };
    creditCard: { qualified: boolean; rate: string; description: string };
    personal: { qualified: boolean; rate: string; description: string };
  };
  improvementPotential: number;
  timeToImprove: string;
}

export default function FICOScoreEstimator() {
  const [inputs, setInputs] = useState<FICOInputs>({
    paymentHistory: 100,
    creditUtilization: 30,
    creditHistoryLength: 5,
    newCredit: 0,
    creditMix: 3,
  });
  const [results, setResults] = useState<FICOResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/fico-score-estimator',
    getShareParams: () => ({
      paymentHistory: inputs.paymentHistory.toString(),
      utilization: inputs.creditUtilization.toString(),
      historyLength: inputs.creditHistoryLength.toString(),
      newCredit: inputs.newCredit.toString(),
      creditMix: inputs.creditMix.toString(),
    }),
    getShareText: () => {
      if (!results) return 'Check out my estimated FICO score!';
      return `My estimated FICO score is ${results.estimatedScore} (${results.scoreRange}). ${results.recommendations[0]}`;
    },
  });

  const handleInputChange = (field: keyof FICOInputs, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setInputs(prev => ({ ...prev, [field]: numValue }));
    }
  };

  const getScoreRange = (score: number): { range: 'Poor' | 'Fair' | 'Good' | 'Very Good' | 'Exceptional', color: string } => {
    if (score >= 800) return { range: 'Exceptional', color: '#10b981' };
    if (score >= 740) return { range: 'Very Good', color: '#3b82f6' };
    if (score >= 670) return { range: 'Good', color: '#8b5cf6' };
    if (score >= 580) return { range: 'Fair', color: '#f59e0b' };
    return { range: 'Poor', color: '#ef4444' };
  };

  const getFactorImpact = (score: number): { impact: 'Excellent' | 'Good' | 'Fair' | 'Poor', color: string } => {
    if (score >= 90) return { impact: 'Excellent', color: '#10b981' };
    if (score >= 70) return { impact: 'Good', color: '#3b82f6' };
    if (score >= 50) return { impact: 'Fair', color: '#f59e0b' };
    return { impact: 'Poor', color: '#ef4444' };
  };

  const calculateFICOScore = () => {
    // Payment History (35%)
    const paymentHistoryScore = inputs.paymentHistory;
    
    // Credit Utilization (30%)
    let utilizationScore = 100;
    if (inputs.creditUtilization <= 10) utilizationScore = 100;
    else if (inputs.creditUtilization <= 30) utilizationScore = 85;
    else if (inputs.creditUtilization <= 50) utilizationScore = 65;
    else if (inputs.creditUtilization <= 75) utilizationScore = 40;
    else utilizationScore = 20;

    // Credit History Length (15%)
    let historyScore = 100;
    if (inputs.creditHistoryLength >= 10) historyScore = 100;
    else if (inputs.creditHistoryLength >= 7) historyScore = 85;
    else if (inputs.creditHistoryLength >= 5) historyScore = 70;
    else if (inputs.creditHistoryLength >= 3) historyScore = 55;
    else if (inputs.creditHistoryLength >= 1) historyScore = 40;
    else historyScore = 20;

    // New Credit (10%)
    let newCreditScore = 100;
    if (inputs.newCredit === 0) newCreditScore = 100;
    else if (inputs.newCredit === 1) newCreditScore = 85;
    else if (inputs.newCredit === 2) newCreditScore = 70;
    else if (inputs.newCredit <= 4) newCreditScore = 50;
    else newCreditScore = 30;

    // Credit Mix (10%)
    const creditMixScore = (inputs.creditMix / 5) * 100;

    // Calculate weighted FICO score
    const weightedScore = 
      (paymentHistoryScore * 0.35) +
      (utilizationScore * 0.30) +
      (historyScore * 0.15) +
      (newCreditScore * 0.10) +
      (creditMixScore * 0.10);

    // Convert to FICO scale (300-850)
    const ficoScore = Math.round(300 + (weightedScore / 100) * 550);
    const scoreInfo = getScoreRange(ficoScore);

    // Factor scores with impact
    const factorScores = [
      {
        factor: 'Payment History',
        weight: 35,
        score: paymentHistoryScore,
        ...getFactorImpact(paymentHistoryScore),
      },
      {
        factor: 'Credit Utilization',
        weight: 30,
        score: utilizationScore,
        ...getFactorImpact(utilizationScore),
      },
      {
        factor: 'Credit History Length',
        weight: 15,
        score: historyScore,
        ...getFactorImpact(historyScore),
      },
      {
        factor: 'New Credit',
        weight: 10,
        score: newCreditScore,
        ...getFactorImpact(newCreditScore),
      },
      {
        factor: 'Credit Mix',
        weight: 10,
        score: creditMixScore,
        ...getFactorImpact(creditMixScore),
      },
    ];

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (paymentHistoryScore < 90) {
      recommendations.push('🔴 Critical: Make all future payments on time. Payment history is the most important factor (35% of score).');
    }
    
    if (utilizationScore < 70) {
      recommendations.push(`💳 Pay down credit card balances to below 30% utilization. Currently at ${inputs.creditUtilization}%.`);
    }
    
    if (historyScore < 70) {
      recommendations.push('⏳ Keep old accounts open to increase average age of credit history.');
    }
    
    if (newCreditScore < 70) {
      recommendations.push('🆕 Avoid opening new credit accounts or making hard inquiries for the next 6-12 months.');
    }
    
    if (creditMixScore < 60) {
      recommendations.push('🔀 Consider diversifying credit types (credit cards, installment loans, mortgage) over time.');
    }

    if (recommendations.length === 0) {
      recommendations.push('✅ Excellent! Your credit profile is strong across all factors. Maintain these habits!');
    }

    // Loan qualification
    const loanQualification = {
      mortgage: {
        qualified: ficoScore >= 620,
        rate: ficoScore >= 760 ? '6.5-7%' : ficoScore >= 700 ? '7-7.5%' : ficoScore >= 660 ? '7.5-8%' : ficoScore >= 620 ? '8-9%' : 'Not qualified',
        description: ficoScore >= 760 ? 'Best rates available' : ficoScore >= 700 ? 'Good rates' : ficoScore >= 660 ? 'Average rates' : ficoScore >= 620 ? 'Higher rates' : 'May not qualify',
      },
      auto: {
        qualified: ficoScore >= 550,
        rate: ficoScore >= 720 ? '5-6%' : ficoScore >= 680 ? '6-8%' : ficoScore >= 620 ? '8-12%' : ficoScore >= 550 ? '12-18%' : 'Not qualified',
        description: ficoScore >= 720 ? 'Prime rates' : ficoScore >= 680 ? 'Near-prime rates' : ficoScore >= 620 ? 'Subprime rates' : ficoScore >= 550 ? 'Deep subprime' : 'May not qualify',
      },
      creditCard: {
        qualified: ficoScore >= 580,
        rate: ficoScore >= 720 ? '14-18%' : ficoScore >= 670 ? '18-22%' : ficoScore >= 620 ? '22-26%' : ficoScore >= 580 ? '26-29.99%' : 'Not qualified',
        description: ficoScore >= 720 ? 'Premium cards, rewards' : ficoScore >= 670 ? 'Good cards, some rewards' : ficoScore >= 620 ? 'Secured or high-fee cards' : ficoScore >= 580 ? 'Secured cards only' : 'May not qualify',
      },
      personal: {
        qualified: ficoScore >= 600,
        rate: ficoScore >= 720 ? '6-10%' : ficoScore >= 680 ? '10-15%' : ficoScore >= 640 ? '15-20%' : ficoScore >= 600 ? '20-36%' : 'Not qualified',
        description: ficoScore >= 720 ? 'Best rates' : ficoScore >= 680 ? 'Good rates' : ficoScore >= 640 ? 'Average rates' : ficoScore >= 600 ? 'High rates' : 'May not qualify',
      },
    };

    // Improvement potential
    const maxPossibleScore = 850;
    const improvementPotential = maxPossibleScore - ficoScore;

    // Time to improve
    let timeToImprove = '';
    if (ficoScore >= 800) {
      timeToImprove = 'Maintain current habits';
    } else if (paymentHistoryScore < 90) {
      timeToImprove = '12-24 months with perfect payment history';
    } else if (utilizationScore < 70) {
      timeToImprove = '1-2 months by reducing credit utilization';
    } else {
      timeToImprove = '6-12 months with consistent positive habits';
    }

    const resultsData: FICOResults = {
      estimatedScore: ficoScore,
      scoreRange: scoreInfo.range,
      rangeColor: scoreInfo.color,
      factorScores,
      recommendations,
      loanQualification,
      improvementPotential,
      timeToImprove,
    };

    setResults(resultsData);
    setShowResults(true);

    // Update URL
    const params = new URLSearchParams({
      paymentHistory: inputs.paymentHistory.toString(),
      utilization: inputs.creditUtilization.toString(),
      historyLength: inputs.creditHistoryLength.toString(),
      newCredit: inputs.newCredit.toString(),
      creditMix: inputs.creditMix.toString(),
    });
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleSaveImage = async () => {
    const element = document.getElementById('results-section');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'fico-score-estimate.png';
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
    if (params.has('paymentHistory')) {
      setInputs({
        paymentHistory: parseFloat(params.get('paymentHistory') || '100'),
        creditUtilization: parseFloat(params.get('utilization') || '30'),
        creditHistoryLength: parseFloat(params.get('historyLength') || '5'),
        newCredit: parseFloat(params.get('newCredit') || '0'),
        creditMix: parseFloat(params.get('creditMix') || '3'),
      });
      setTimeout(() => calculateFICOScore(), 100);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <Calculator className="h-6 w-6 text-purple-600" />
                FICO Score Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Payment History - 35% */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="paymentHistory" className="text-sm font-medium">
                    Payment History (35%) <span className="text-red-500">*</span>
                  </Label>
                  <span className="text-sm text-purple-600 font-semibold">{inputs.paymentHistory}%</span>
                </div>
                <input
                  id="paymentHistory"
                  type="range"
                  value={inputs.paymentHistory}
                  onChange={(e) => handleInputChange('paymentHistory', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  min="0"
                  max="100"
                  step="5"
                />
                <p className="text-xs text-gray-500">
                  0% = Many late payments | 100% = Perfect payment history
                </p>
              </div>

              {/* Credit Utilization - 30% */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="creditUtilization" className="text-sm font-medium">
                    Credit Utilization (30%) <span className="text-red-500">*</span>
                  </Label>
                  <span className="text-sm text-purple-600 font-semibold">{inputs.creditUtilization}%</span>
                </div>
                <input
                  id="creditUtilization"
                  type="range"
                  value={inputs.creditUtilization}
                  onChange={(e) => handleInputChange('creditUtilization', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  min="0"
                  max="100"
                  step="5"
                />
                <p className="text-xs text-gray-500">
                  % of credit limits currently used (lower is better)
                </p>
              </div>

              {/* Credit History Length - 15% */}
              <div className="space-y-2">
                <Label htmlFor="creditHistoryLength" className="text-sm font-medium">
                  Credit History Length (15%) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <input
                    id="creditHistoryLength"
                    type="number"
                    value={inputs.creditHistoryLength}
                    onChange={(e) => handleInputChange('creditHistoryLength', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="5"
                    min="0"
                    max="50"
                    step="0.5"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">years</span>
                </div>
                <p className="text-xs text-gray-500">
                  Average age of all credit accounts
                </p>
              </div>

              {/* New Credit - 10% */}
              <div className="space-y-2">
                <Label htmlFor="newCredit" className="text-sm font-medium">
                  Recent Credit Inquiries (10%) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="newCredit"
                  type="number"
                  value={inputs.newCredit}
                  onChange={(e) => handleInputChange('newCredit', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  max="20"
                  step="1"
                />
                <p className="text-xs text-gray-500">
                  Number of hard inquiries in past 12 months (fewer is better)
                </p>
              </div>

              {/* Credit Mix - 10% */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="creditMix" className="text-sm font-medium">
                    Credit Mix Diversity (10%) <span className="text-red-500">*</span>
                  </Label>
                  <span className="text-sm text-purple-600 font-semibold">{inputs.creditMix}/5</span>
                </div>
                <input
                  id="creditMix"
                  type="range"
                  value={inputs.creditMix}
                  onChange={(e) => handleInputChange('creditMix', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  min="1"
                  max="5"
                  step="1"
                />
                <div className="text-xs text-gray-600 space-y-1">
                  <p>1 = One type only | 3 = Average mix | 5 = Excellent diversity</p>
                  <p className="text-gray-500">(Credit cards, auto loan, mortgage, student loan, personal loan)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculateFICOScore}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 sm:py-4 text-base sm:text-lg min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Estimate FICO Score
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

              {/* Estimated Score */}
              <Card className="shadow-lg border-l-4" style={{ borderLeftColor: results.rangeColor }}>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">Your Estimated FICO Score</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg">
                    <div className="text-6xl sm:text-7xl font-bold mb-2" style={{ color: results.rangeColor }}>
                      {results.estimatedScore}
                    </div>
                    <div className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-1">
                      {results.scoreRange}
                    </div>
                    <div className="text-sm text-gray-600 mt-3">
                      Score Range: 300 - 850
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
                    <div className={`p-3 rounded-lg ${results.scoreRange === 'Poor' ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-100'}`}>
                      <div className="font-semibold text-red-600">Poor</div>
                      <div className="text-gray-600">300-579</div>
                    </div>
                    <div className={`p-3 rounded-lg ${results.scoreRange === 'Fair' ? 'bg-orange-100 border-2 border-orange-500' : 'bg-gray-100'}`}>
                      <div className="font-semibold text-orange-600">Fair</div>
                      <div className="text-gray-600">580-669</div>
                    </div>
                    <div className={`p-3 rounded-lg ${results.scoreRange === 'Good' ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-100'}`}>
                      <div className="font-semibold text-purple-600">Good</div>
                      <div className="text-gray-600">670-739</div>
                    </div>
                    <div className={`p-3 rounded-lg ${results.scoreRange === 'Very Good' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'}`}>
                      <div className="font-semibold text-blue-600">Very Good</div>
                      <div className="text-gray-600">740-799</div>
                    </div>
                    <div className={`p-3 rounded-lg ${results.scoreRange === 'Exceptional' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'}`}>
                      <div className="font-semibold text-green-600">Exceptional</div>
                      <div className="text-gray-600">800-850</div>
                    </div>
                  </div>

                  {results.improvementPotential > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-900">
                        <strong>Improvement Potential:</strong> +{results.improvementPotential} points | 
                        <strong> Timeline:</strong> {results.timeToImprove}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Factor Breakdown */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Score Factor Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.factorScores.map((factor, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">{factor.factor}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{factor.weight}% weight</span>
                            <span className="text-lg font-bold" style={{ color: factor.impactColor }}>
                              {factor.score.toFixed(0)}/100
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                          <div
                            className="h-3 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${factor.score}%`,
                              backgroundColor: factor.impactColor 
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Impact on your score</span>
                          <span className="font-medium" style={{ color: factor.impactColor }}>{factor.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Loan Qualification */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Loan Qualification & Expected Rates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[350px] text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="px-4 py-3 text-left font-semibold">Loan Type</th>
                          <th className="px-4 py-3 text-left font-semibold">Qualification</th>
                          <th className="px-4 py-3 text-left font-semibold">Expected Rate</th>
                          <th className="px-4 py-3 text-left font-semibold">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 font-medium">Mortgage</td>
                          <td className="px-4 py-3">
                            {results.loanQualification.mortgage.qualified ? (
                              <span className="text-green-600 flex items-center gap-1">
                                <CheckCircle2 className="h-4 w-4" /> Yes
                              </span>
                            ) : (
                              <span className="text-red-600 flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" /> No
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 font-semibold">{results.loanQualification.mortgage.rate}</td>
                          <td className="px-4 py-3 text-gray-600">{results.loanQualification.mortgage.description}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 font-medium">Auto Loan</td>
                          <td className="px-4 py-3">
                            {results.loanQualification.auto.qualified ? (
                              <span className="text-green-600 flex items-center gap-1">
                                <CheckCircle2 className="h-4 w-4" /> Yes
                              </span>
                            ) : (
                              <span className="text-red-600 flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" /> No
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 font-semibold">{results.loanQualification.auto.rate}</td>
                          <td className="px-4 py-3 text-gray-600">{results.loanQualification.auto.description}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 font-medium">Credit Card</td>
                          <td className="px-4 py-3">
                            {results.loanQualification.creditCard.qualified ? (
                              <span className="text-green-600 flex items-center gap-1">
                                <CheckCircle2 className="h-4 w-4" /> Yes
                              </span>
                            ) : (
                              <span className="text-red-600 flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" /> No
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 font-semibold">{results.loanQualification.creditCard.rate}</td>
                          <td className="px-4 py-3 text-gray-600">{results.loanQualification.creditCard.description}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium">Personal Loan</td>
                          <td className="px-4 py-3">
                            {results.loanQualification.personal.qualified ? (
                              <span className="text-green-600 flex items-center gap-1">
                                <CheckCircle2 className="h-4 w-4" /> Yes
                              </span>
                            ) : (
                              <span className="text-red-600 flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" /> No
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 font-semibold">{results.loanQualification.personal.rate}</td>
                          <td className="px-4 py-3 text-gray-600">{results.loanQualification.personal.description}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple-600" />
                    Personalized Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-purple-600 font-bold mt-1">•</span>
                        <span className="text-gray-700 flex-1">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Factor Weight Chart */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>FICO Score Factor Weights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={results.factorScores}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ factor, weight }) => `${factor}: ${weight}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="weight"
                      >
                        {results.factorScores.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.impactColor} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {!showResults && (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center text-gray-500">
                <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">Adjust the credit factors and click "Estimate FICO Score" to see your estimated credit score.</p>
                <p className="text-sm mt-2 text-gray-400">This is an estimate based on typical FICO scoring models.</p>
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
        calculatorName="FICO Score Estimator"
      />
    </div>
  );
}

