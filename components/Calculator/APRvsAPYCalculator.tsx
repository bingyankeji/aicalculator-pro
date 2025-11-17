'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, TrendingUp, AlertCircle, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface APRvsAPYResults {
  apr: number;
  apy: number;
  difference: number;
  percentageDifference: number;
  principal: number;
  timeYears: number;
  interestEarned: number;
  finalBalance: number;
  compoundingFrequency: string;
  compoundingPerYear: number;
  byFrequency: Array<{
    frequency: string;
    periodsPerYear: number;
    apy: number;
    interestEarned: number;
    finalBalance: number;
  }>;
  monthlyBreakdown: Array<{
    month: number;
    balance: number;
    interestEarned: number;
  }>;
}

export default function APRvsAPYCalculator() {
  const [calculationType, setCalculationType] = useState<'savings' | 'loan'>('savings');
  const [inputs, setInputs] = useState({
    apr: '5.0',
    principal: '10000',
    timeYears: '5',
    compoundingFrequency: 'monthly',
  });

  const [results, setResults] = useState<APRvsAPYResults | null>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/apr-vs-apy-calculator',
    getShareParams: () => ({
      apr: inputs.apr,
      type: calculationType,
    }),
    getShareText: () => 
      results 
        ? `${inputs.apr}% APR = ${results.apy.toFixed(3)}% APY with ${inputs.compoundingFrequency} compounding | Real difference: ${results.percentageDifference.toFixed(2)}%`
        : 'Check out APR vs APY comparison!',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newInputs = { ...inputs };
    let hasParams = false;

    if (params.has('type')) {
      setCalculationType(params.get('type') as 'savings' | 'loan');
    }

    params.forEach((value, key) => {
      if (key in inputs && key !== 'type') {
        newInputs[key as keyof typeof inputs] = value;
        hasParams = true;
      }
    });

    if (hasParams) {
      setInputs(newInputs);
      setTimeout(calculateAPY, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const getCompoundingPeriodsPerYear = (frequency: string): number => {
    const frequencies: { [key: string]: number } = {
      daily: 365,
      monthly: 12,
      quarterly: 4,
      semiannually: 2,
      annually: 1,
    };
    return frequencies[frequency] || 12;
  };

  const calculateAPY = () => {
    const apr = parseFloat(inputs.apr) || 0;
    const principal = parseFloat(inputs.principal) || 0;
    const timeYears = parseFloat(inputs.timeYears) || 0;
    const n = getCompoundingPeriodsPerYear(inputs.compoundingFrequency);

    if (apr <= 0 || principal <= 0 || timeYears <= 0) {
      alert('Please enter valid APR, principal, and time period');
      return;
    }

    const r = apr / 100;

    // Calculate APY: APY = (1 + r/n)^n - 1
    const apy = (Math.pow(1 + r / n, n) - 1) * 100;

    // Calculate final balance: A = P(1 + r/n)^(nt)
    const finalBalance = principal * Math.pow(1 + r / n, n * timeYears);
    const interestEarned = finalBalance - principal;

    const difference = apy - apr;
    const percentageDifference = ((apy - apr) / apr) * 100;

    // Calculate for all compounding frequencies
    const frequencies = [
      { frequency: 'Daily', periodsPerYear: 365 },
      { frequency: 'Monthly', periodsPerYear: 12 },
      { frequency: 'Quarterly', periodsPerYear: 4 },
      { frequency: 'Semi-annually', periodsPerYear: 2 },
      { frequency: 'Annually', periodsPerYear: 1 },
    ];

    const byFrequency = frequencies.map(({ frequency, periodsPerYear }) => {
      const apyForFreq = (Math.pow(1 + r / periodsPerYear, periodsPerYear) - 1) * 100;
      const finalBalanceForFreq = principal * Math.pow(1 + r / periodsPerYear, periodsPerYear * timeYears);
      const interestForFreq = finalBalanceForFreq - principal;

      return {
        frequency,
        periodsPerYear,
        apy: apyForFreq,
        interestEarned: interestForFreq,
        finalBalance: finalBalanceForFreq,
      };
    });

    // Calculate monthly breakdown
    const monthlyBreakdown = [];
    const totalMonths = Math.ceil(timeYears * 12);
    let currentBalance = principal;

    for (let month = 0; month <= Math.min(totalMonths, 60); month++) {
      const years = month / 12;
      const balance = principal * Math.pow(1 + r / n, n * years);
      const interest = balance - principal;

      monthlyBreakdown.push({
        month,
        balance,
        interestEarned: interest,
      });
    }

    setResults({
      apr,
      apy,
      difference,
      percentageDifference,
      principal,
      timeYears,
      interestEarned,
      finalBalance,
      compoundingFrequency: inputs.compoundingFrequency,
      compoundingPerYear: n,
      byFrequency,
      monthlyBreakdown,
    });

    // Update URL
    const params = new URLSearchParams();
    params.set('type', calculationType);
    Object.entries(inputs).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleSaveAsImage = async () => {
    const element = document.getElementById('apr-apy-results');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = 'apr-vs-apy-results.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving as image:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <DollarSign className="h-5 w-5 text-blue-600" />
                Calculation Type
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Choose Type <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCalculationType('savings')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      calculationType === 'savings'
                        ? 'border-green-500 bg-green-50 text-green-900'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-green-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">💰</div>
                    <div className="font-semibold text-sm">Savings</div>
                    <div className="text-xs">You earn interest</div>
                  </button>
                  <button
                    onClick={() => setCalculationType('loan')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      calculationType === 'loan'
                        ? 'border-red-500 bg-red-50 text-red-900'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-red-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">🏦</div>
                    <div className="font-semibold text-sm">Loan</div>
                    <div className="text-xs">You pay interest</div>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calculator className="h-5 w-5 text-purple-600" />
                Input Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apr" className="text-sm font-medium">
                  {calculationType === 'savings' ? 'Annual Interest Rate (APR)' : 'Annual Percentage Rate (APR)'} (%) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="apr"
                  type="number"
                  value={inputs.apr}
                  onChange={(e) => handleInputChange('apr', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5.0"
                  min="0"
                  max="30"
                  step="0.01"
                  required
                />
                <p className="text-xs text-gray-500">
                  {calculationType === 'savings' ? 'Stated annual interest rate' : 'Stated annual loan rate'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="principal" className="text-sm font-medium">
                  {calculationType === 'savings' ? 'Initial Deposit' : 'Loan Amount'} ($) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="principal"
                  type="number"
                  value={inputs.principal}
                  onChange={(e) => handleInputChange('principal', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10000"
                  min="0"
                  step="100"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeYears" className="text-sm font-medium">
                  Time Period (years) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="timeYears"
                  type="number"
                  value={inputs.timeYears}
                  onChange={(e) => handleInputChange('timeYears', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5"
                  min="0.1"
                  max="50"
                  step="0.5"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="compoundingFrequency" className="text-sm font-medium">
                  Compounding Frequency <span className="text-red-500">*</span>
                </Label>
                <select
                  id="compoundingFrequency"
                  value={inputs.compoundingFrequency}
                  onChange={(e) => handleInputChange('compoundingFrequency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="daily">Daily (365 times/year)</option>
                  <option value="monthly">Monthly (12 times/year)</option>
                  <option value="quarterly">Quarterly (4 times/year)</option>
                  <option value="semiannually">Semi-annually (2 times/year)</option>
                  <option value="annually">Annually (1 time/year)</option>
                </select>
                <p className="text-xs text-gray-500">How often interest compounds</p>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculateAPY}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate APY
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" id="apr-apy-results">
          {results && (
            <div className="space-y-6">
              {/* Educational Banner */}
              <Card className="shadow-lg border-l-4 border-l-blue-500 bg-blue-50">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-blue-900 mb-2">Understanding the Difference</h3>
                      <p className="text-sm text-blue-800">
                        <strong>APR (Annual Percentage Rate)</strong> is the stated annual rate without considering compounding. 
                        <strong> APY (Annual Percentage Yield)</strong> accounts for compound interest and shows the actual rate you earn or pay.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-lg border-2 border-gray-300">
                  <CardHeader className="bg-gray-100">
                    <CardTitle className="text-gray-900">APR (Stated Rate)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-center">
                      <p className="text-6xl font-bold text-gray-900 mb-2">
                        {results.apr.toFixed(3)}%
                      </p>
                      <p className="text-sm text-gray-600">Annual Percentage Rate</p>
                      <p className="text-xs text-gray-500 mt-2">Simple annual rate</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`shadow-lg border-2 ${calculationType === 'savings' ? 'border-green-500' : 'border-red-500'}`}>
                  <CardHeader className={calculationType === 'savings' ? 'bg-green-100' : 'bg-red-100'}>
                    <CardTitle className={calculationType === 'savings' ? 'text-green-900' : 'text-red-900'}>
                      APY (Effective Rate)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-center">
                      <p className={`text-6xl font-bold mb-2 ${calculationType === 'savings' ? 'text-green-600' : 'text-red-600'}`}>
                        {results.apy.toFixed(3)}%
                      </p>
                      <p className="text-sm text-gray-600">Annual Percentage Yield</p>
                      <p className={`text-sm font-medium mt-2 ${calculationType === 'savings' ? 'text-green-700' : 'text-red-700'}`}>
                        +{results.difference.toFixed(3)}% higher ({results.percentageDifference.toFixed(2)}% more)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Financial Impact */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle>
                    {calculationType === 'savings' ? 'Your Earnings' : 'Your Cost'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">
                        {calculationType === 'savings' ? 'Initial Deposit' : 'Loan Amount'}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {results.principal.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>

                    <div className={`p-4 border rounded-lg ${calculationType === 'savings' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <p className="text-sm text-gray-600 mb-1">
                        {calculationType === 'savings' ? 'Interest Earned' : 'Interest Paid'}
                      </p>
                      <p className={`text-2xl font-bold ${calculationType === 'savings' ? 'text-green-600' : 'text-red-600'}`}>
                        {results.interestEarned.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">over {results.timeYears} years</p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">
                        {calculationType === 'savings' ? 'Final Balance' : 'Total Repayment'}
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {results.finalBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Compounding:</strong> {inputs.compoundingFrequency.charAt(0).toUpperCase() + inputs.compoundingFrequency.slice(1)} 
                      ({results.compoundingPerYear}× per year)
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      More frequent compounding = {calculationType === 'savings' ? 'Higher earnings' : 'Higher cost'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Comparison by Frequency */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                  <CardTitle>APY by Compounding Frequency</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3">
                    {results.byFrequency.map((freq, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border-2 ${
                          freq.frequency.toLowerCase() === inputs.compoundingFrequency.replace('-', ' ')
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-900">{freq.frequency}</p>
                            <p className="text-xs text-gray-600">{freq.periodsPerYear} times/year</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-blue-600">{freq.apy.toFixed(3)}%</p>
                            <p className="text-sm text-gray-600">
                              {freq.interestEarned.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Key Insight:</strong> Daily compounding yields {results.byFrequency[0].apy.toFixed(3)}% 
                      vs annual compounding at {results.byFrequency[4].apy.toFixed(3)}%, 
                      a difference of {(results.byFrequency[0].apy - results.byFrequency[4].apy).toFixed(3)}% APY.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Growth Chart */}
              {results.monthlyBreakdown.length > 0 && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardTitle>
                      {calculationType === 'savings' ? 'Balance Growth Over Time' : 'Total Cost Over Time'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={results.monthlyBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="month" 
                          label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis 
                          label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip 
                          formatter={(value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="balance" 
                          stroke="#10b981" 
                          strokeWidth={2} 
                          name={calculationType === 'savings' ? 'Account Balance' : 'Total Owed'}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* Formula Explanation */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardTitle>The Math Behind It</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-white border border-gray-200 rounded-lg">
                      <p className="font-semibold text-gray-900 mb-2">APY Formula:</p>
                      <p className="text-sm text-gray-700 font-mono bg-gray-50 p-2 rounded">
                        APY = (1 + r/n)^n - 1
                      </p>
                      <p className="text-xs text-gray-600 mt-2">
                        Where: r = APR (as decimal), n = compounding periods per year
                      </p>
                    </div>

                    <div className="p-4 bg-white border border-gray-200 rounded-lg">
                      <p className="font-semibold text-gray-900 mb-2">Your Calculation:</p>
                      <p className="text-sm text-gray-700">
                        APY = (1 + {results.apr}/100 / {results.compoundingPerYear})^{results.compoundingPerYear} - 1
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        APY = <strong>{results.apy.toFixed(5)}%</strong>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Export Actions */}
              <Card className="shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleSaveAsImage} variant="outline" className="flex-1 sm:flex-none min-h-[44px]">
                      <Download className="h-4 w-4 mr-2" />
                      Save as Image
                    </Button>
                    <Button onClick={handlePrint} variant="outline" className="flex-1 sm:flex-none min-h-[44px]">
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <Button onClick={handleShare} variant="outline" className="flex-1 sm:flex-none min-h-[44px]">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!results && (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <TrendingUp className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">
                  Understand the true cost or return of your money!
                </p>
                <p className="text-sm text-gray-500">
                  APY reveals the real rate after accounting for compound interest.
                </p>
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
        calculatorName="APR vs APY Calculator"
      />
    </div>
  );
}

