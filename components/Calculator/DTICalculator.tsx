'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, Home, Car, CreditCard, DollarSign, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface DTIResults {
  monthlyIncome: number;
  totalMonthlyDebt: number;
  housingExpenses: number;
  otherDebts: number;
  frontEndDTI: number;
  backEndDTI: number;
  qualification: {
    fha: { qualifies: boolean; limit: number };
    va: { qualifies: boolean; limit: number };
    conventional: { qualifies: boolean; limit: number };
    usda: { qualifies: boolean; limit: number };
  };
  recommendations: string[];
  debtBreakdown: Array<{ name: string; amount: number; percentage: number }>;
  targetMetrics: {
    idealDTI: number;
    maxDebtAllowed: number;
    currentOverage: number;
    debtToReduce: number;
    incomeToIncrease: number;
  };
}

export default function DTICalculator() {
  const [inputs, setInputs] = useState({
    grossMonthlyIncome: '5000',
    otherIncome: '0',
    mortgage: '1200',
    propertyTax: '200',
    homeInsurance: '100',
    hoaFees: '0',
    carLoans: '400',
    studentLoans: '300',
    creditCards: '150',
    personalLoans: '0',
    otherDebts: '0',
    childSupport: '0',
  });

  const [results, setResults] = useState<DTIResults | null>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/dti-calculator',
    getShareParams: () => ({
      income: inputs.grossMonthlyIncome,
      debt: (parseFloat(inputs.mortgage || '0') + parseFloat(inputs.carLoans || '0')).toString(),
    }),
    getShareText: () => 
      results 
        ? `My DTI Ratio: ${results.backEndDTI.toFixed(1)}% | Front-End: ${results.frontEndDTI.toFixed(1)}% | ${results.qualification.conventional.qualifies ? 'Qualifies for conventional loan ✅' : 'Working on DTI improvement 💪'}`
        : 'Check out my DTI calculation!',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newInputs = { ...inputs };
    let hasParams = false;

    params.forEach((value, key) => {
      if (key in inputs) {
        newInputs[key as keyof typeof inputs] = value;
        hasParams = true;
      }
    });

    if (hasParams) {
      setInputs(newInputs);
      setTimeout(calculateDTI, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateDTI = () => {
    const grossMonthlyIncome = parseFloat(inputs.grossMonthlyIncome) || 0;
    const otherIncome = parseFloat(inputs.otherIncome) || 0;
    const totalIncome = grossMonthlyIncome + otherIncome;

    if (totalIncome <= 0) {
      alert('Please enter your monthly income');
      return;
    }

    // Housing expenses (front-end)
    const mortgage = parseFloat(inputs.mortgage) || 0;
    const propertyTax = parseFloat(inputs.propertyTax) || 0;
    const homeInsurance = parseFloat(inputs.homeInsurance) || 0;
    const hoaFees = parseFloat(inputs.hoaFees) || 0;
    const housingExpenses = mortgage + propertyTax + homeInsurance + hoaFees;

    // Other debts
    const carLoans = parseFloat(inputs.carLoans) || 0;
    const studentLoans = parseFloat(inputs.studentLoans) || 0;
    const creditCards = parseFloat(inputs.creditCards) || 0;
    const personalLoans = parseFloat(inputs.personalLoans) || 0;
    const otherDebts = parseFloat(inputs.otherDebts) || 0;
    const childSupport = parseFloat(inputs.childSupport) || 0;
    const otherDebtsTotal = carLoans + studentLoans + creditCards + personalLoans + otherDebts + childSupport;

    // Total monthly debt
    const totalMonthlyDebt = housingExpenses + otherDebtsTotal;

    // Calculate DTI ratios
    const frontEndDTI = (housingExpenses / totalIncome) * 100;
    const backEndDTI = (totalMonthlyDebt / totalIncome) * 100;

    // Loan qualification
    const qualification = {
      fha: { qualifies: backEndDTI <= 43, limit: 43 }, // FHA allows up to 43% with compensating factors
      va: { qualifies: backEndDTI <= 41, limit: 41 }, // VA prefers 41% but can go higher
      conventional: { qualifies: backEndDTI <= 36 && frontEndDTI <= 28, limit: 36 }, // Traditional 28/36 rule
      usda: { qualifies: backEndDTI <= 41 && frontEndDTI <= 29, limit: 41 }, // USDA rural loans
    };

    // Recommendations
    const recommendations: string[] = [];
    
    if (backEndDTI > 43) {
      recommendations.push('⚠️ Your DTI is very high. Consider debt consolidation or increasing income.');
      recommendations.push('🎯 Aim to reduce monthly debt by $' + ((totalMonthlyDebt - (totalIncome * 0.36)).toFixed(0)) + ' to reach 36% DTI.');
    } else if (backEndDTI > 36) {
      recommendations.push('⚠️ Your DTI is above the ideal 36%. You may qualify for FHA/VA loans but not conventional.');
      recommendations.push('💡 Reduce debt or increase income to improve loan options and rates.');
    } else if (backEndDTI > 28) {
      recommendations.push('✅ Your DTI is good! You qualify for most loan types.');
      recommendations.push('💪 Try to get below 28% for the best rates and terms.');
    } else {
      recommendations.push('🎉 Excellent DTI! You qualify for all loan types with favorable terms.');
      recommendations.push('💰 You have strong financial flexibility for future borrowing.');
    }

    if (frontEndDTI > 28) {
      recommendations.push('🏠 Your housing costs are high relative to income (>' + frontEndDTI.toFixed(0) + '%).');
      recommendations.push('📉 Consider refinancing or looking for a less expensive home.');
    }

    // Debt breakdown
    const debtBreakdown = [
      { name: 'Mortgage/Rent', amount: mortgage, percentage: (mortgage / totalMonthlyDebt) * 100 },
      { name: 'Property Tax', amount: propertyTax, percentage: (propertyTax / totalMonthlyDebt) * 100 },
      { name: 'Home Insurance', amount: homeInsurance, percentage: (homeInsurance / totalMonthlyDebt) * 100 },
      { name: 'HOA Fees', amount: hoaFees, percentage: (hoaFees / totalMonthlyDebt) * 100 },
      { name: 'Car Loans', amount: carLoans, percentage: (carLoans / totalMonthlyDebt) * 100 },
      { name: 'Student Loans', amount: studentLoans, percentage: (studentLoans / totalMonthlyDebt) * 100 },
      { name: 'Credit Cards', amount: creditCards, percentage: (creditCards / totalMonthlyDebt) * 100 },
      { name: 'Personal Loans', amount: personalLoans, percentage: (personalLoans / totalMonthlyDebt) * 100 },
      { name: 'Child Support', amount: childSupport, percentage: (childSupport / totalMonthlyDebt) * 100 },
      { name: 'Other Debts', amount: otherDebts, percentage: (otherDebts / totalMonthlyDebt) * 100 },
    ].filter(item => item.amount > 0);

    // Target metrics
    const idealDTI = 36;
    const maxDebtAllowed = totalIncome * (idealDTI / 100);
    const currentOverage = Math.max(0, totalMonthlyDebt - maxDebtAllowed);
    const debtToReduce = currentOverage;
    const incomeToIncrease = backEndDTI > idealDTI ? (totalMonthlyDebt / (idealDTI / 100)) - totalIncome : 0;

    setResults({
      monthlyIncome: totalIncome,
      totalMonthlyDebt,
      housingExpenses,
      otherDebts: otherDebtsTotal,
      frontEndDTI,
      backEndDTI,
      qualification,
      recommendations,
      debtBreakdown,
      targetMetrics: {
        idealDTI,
        maxDebtAllowed,
        currentOverage,
        debtToReduce,
        incomeToIncrease
      }
    });

    // Update URL
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([key, value]) => {
      if (value && parseFloat(value) > 0) params.set(key, value);
    });
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleSaveAsImage = async () => {
    const element = document.getElementById('dti-results');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = 'dti-ratio-results.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving as image:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  const getDTIStatus = (dti: number) => {
    if (dti <= 28) return { label: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle };
    if (dti <= 36) return { label: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: CheckCircle };
    if (dti <= 43) return { label: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: AlertCircle };
    return { label: 'High Risk', color: 'text-red-600', bgColor: 'bg-red-50', icon: XCircle };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <DollarSign className="h-5 w-5 text-blue-600" />
                Monthly Income
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="grossMonthlyIncome" className="text-sm font-medium">
                  Gross Monthly Income ($) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="grossMonthlyIncome"
                  type="number"
                  value={inputs.grossMonthlyIncome}
                  onChange={(e) => handleInputChange('grossMonthlyIncome', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5000"
                  min="0"
                  step="100"
                  required
                />
                <p className="text-xs text-gray-500">Before taxes and deductions</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherIncome" className="text-sm font-medium">
                  Other Income ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="otherIncome"
                  type="number"
                  value={inputs.otherIncome}
                  onChange={(e) => handleInputChange('otherIncome', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  step="100"
                />
                <p className="text-xs text-gray-500">Bonuses, rental income, etc. (Default: $0)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Home className="h-5 w-5 text-green-600" />
                Housing Expenses
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mortgage" className="text-sm font-medium">
                  Mortgage/Rent Payment ($) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="mortgage"
                  type="number"
                  value={inputs.mortgage}
                  onChange={(e) => handleInputChange('mortgage', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1200"
                  min="0"
                  step="50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyTax" className="text-sm font-medium">
                  Property Tax ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="propertyTax"
                  type="number"
                  value={inputs.propertyTax}
                  onChange={(e) => handleInputChange('propertyTax', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="200"
                  min="0"
                  step="10"
                />
                <p className="text-xs text-gray-500">Monthly portion (Default: $0)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="homeInsurance" className="text-sm font-medium">
                  Home Insurance ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="homeInsurance"
                  type="number"
                  value={inputs.homeInsurance}
                  onChange={(e) => handleInputChange('homeInsurance', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="100"
                  min="0"
                  step="10"
                />
                <p className="text-xs text-gray-500">Monthly premium (Default: $0)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoaFees" className="text-sm font-medium">
                  HOA Fees ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="hoaFees"
                  type="number"
                  value={inputs.hoaFees}
                  onChange={(e) => handleInputChange('hoaFees', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  step="10"
                />
                <p className="text-xs text-gray-500">If applicable (Default: $0)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CreditCard className="h-5 w-5 text-orange-600" />
                Other Monthly Debts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="carLoans" className="text-sm font-medium">
                  Car Loans ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="carLoans"
                  type="number"
                  value={inputs.carLoans}
                  onChange={(e) => handleInputChange('carLoans', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="400"
                  min="0"
                  step="50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentLoans" className="text-sm font-medium">
                  Student Loans ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="studentLoans"
                  type="number"
                  value={inputs.studentLoans}
                  onChange={(e) => handleInputChange('studentLoans', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="300"
                  min="0"
                  step="50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="creditCards" className="text-sm font-medium">
                  Credit Card Minimum Payments ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="creditCards"
                  type="number"
                  value={inputs.creditCards}
                  onChange={(e) => handleInputChange('creditCards', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="150"
                  min="0"
                  step="25"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="personalLoans" className="text-sm font-medium">
                  Personal Loans ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="personalLoans"
                  type="number"
                  value={inputs.personalLoans}
                  onChange={(e) => handleInputChange('personalLoans', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  step="50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="childSupport" className="text-sm font-medium">
                  Child Support/Alimony ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="childSupport"
                  type="number"
                  value={inputs.childSupport}
                  onChange={(e) => handleInputChange('childSupport', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  step="50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherDebts" className="text-sm font-medium">
                  Other Debts ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="otherDebts"
                  type="number"
                  value={inputs.otherDebts}
                  onChange={(e) => handleInputChange('otherDebts', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  step="50"
                />
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculateDTI}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate DTI Ratio
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" id="dti-results">
          {results && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-lg border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {results.monthlyIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Monthly Debt</p>
                    <p className="text-2xl font-bold text-red-600">
                      {results.totalMonthlyDebt.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Front-End DTI</p>
                    <p className="text-2xl font-bold text-green-600">
                      {results.frontEndDTI.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Housing only</p>
                  </CardContent>
                </Card>

                <Card className={`shadow-lg border-l-4 ${getDTIStatus(results.backEndDTI).color.replace('text-', 'border-l-')}`}>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Back-End DTI</p>
                    <p className={`text-2xl font-bold ${getDTIStatus(results.backEndDTI).color}`}>
                      {results.backEndDTI.toFixed(1)}%
                    </p>
                    <p className={`text-xs font-medium mt-1 ${getDTIStatus(results.backEndDTI).color}`}>
                      {getDTIStatus(results.backEndDTI).label}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* DTI Status Banner */}
              <Card className={`shadow-lg border-l-4 ${getDTIStatus(results.backEndDTI).color.replace('text-', 'border-l-')}`}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    {React.createElement(getDTIStatus(results.backEndDTI).icon, { 
                      className: `h-6 w-6 ${getDTIStatus(results.backEndDTI).color} flex-shrink-0 mt-0.5` 
                    })}
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold mb-2 ${getDTIStatus(results.backEndDTI).color}`}>
                        DTI Status: {getDTIStatus(results.backEndDTI).label}
                      </h3>
                      <div className="space-y-2">
                        {results.recommendations.map((rec, index) => (
                          <p key={index} className="text-sm text-gray-700">{rec}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Loan Qualification */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle>Loan Qualification Status</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg border-2 ${results.qualification.conventional.qualifies ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">Conventional Loan</h4>
                        {results.qualification.conventional.qualifies ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-700">
                        Requires: Front-End ≤28%, Back-End ≤36%
                      </p>
                      <p className={`text-xs font-medium mt-1 ${results.qualification.conventional.qualifies ? 'text-green-600' : 'text-red-600'}`}>
                        {results.qualification.conventional.qualifies ? '✅ You Qualify' : '❌ Does Not Qualify'}
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${results.qualification.fha.qualifies ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">FHA Loan</h4>
                        {results.qualification.fha.qualifies ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-700">
                        Requires: Back-End ≤43%
                      </p>
                      <p className={`text-xs font-medium mt-1 ${results.qualification.fha.qualifies ? 'text-green-600' : 'text-red-600'}`}>
                        {results.qualification.fha.qualifies ? '✅ You Qualify' : '❌ Does Not Qualify'}
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${results.qualification.va.qualifies ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">VA Loan</h4>
                        {results.qualification.va.qualifies ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-700">
                        Requires: Back-End ≤41%
                      </p>
                      <p className={`text-xs font-medium mt-1 ${results.qualification.va.qualifies ? 'text-green-600' : 'text-red-600'}`}>
                        {results.qualification.va.qualifies ? '✅ You Qualify' : '❌ Does Not Qualify'}
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${results.qualification.usda.qualifies ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">USDA Loan</h4>
                        {results.qualification.usda.qualifies ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-700">
                        Requires: Front-End ≤29%, Back-End ≤41%
                      </p>
                      <p className={`text-xs font-medium mt-1 ${results.qualification.usda.qualifies ? 'text-green-600' : 'text-red-600'}`}>
                        {results.qualification.usda.qualifies ? '✅ You Qualify' : '❌ Does Not Qualify'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Debt Breakdown */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle>Debt Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={results.debtBreakdown}
                            dataKey="amount"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={(entry) => `${entry.name}: ${entry.percentage.toFixed(0)}%`}
                          >
                            {results.debtBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                      {results.debtBreakdown.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-900">
                              {item.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </p>
                            <p className="text-xs text-gray-600">{item.percentage.toFixed(1)}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Improvement Targets */}
              {results.backEndDTI > 36 && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                      How to Improve Your DTI
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Target: 36% DTI (Ideal)</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          At 36% DTI, your monthly debt should not exceed:
                        </p>
                        <p className="text-2xl font-bold text-blue-600">
                          {results.targetMetrics.maxDebtAllowed.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}/month
                        </p>
                      </div>

                      {results.targetMetrics.currentOverage > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Option 1: Reduce Debt</h4>
                            <p className="text-sm text-gray-700 mb-2">Pay down debt by:</p>
                            <p className="text-xl font-bold text-red-600">
                              {results.targetMetrics.debtToReduce.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}/month
                            </p>
                          </div>

                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Option 2: Increase Income</h4>
                            <p className="text-sm text-gray-700 mb-2">Raise income to:</p>
                            <p className="text-xl font-bold text-green-600">
                              {(results.monthlyIncome + results.targetMetrics.incomeToIncrease).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}/month
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              (+{results.targetMetrics.incomeToIncrease.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })})
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

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
                <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  Enter your monthly income and debt obligations, then click "Calculate DTI Ratio" to see your qualification status!
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
        calculatorName="DTI Calculator"
      />
    </div>
  );
}

