'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, TrendingUp, Save, Trash2, BarChart3, ChevronDown, ChevronUp, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ComposedChart
} from 'recharts';

interface BondInputs {
  faceValue: string;
  couponRate: string;
  yearsToMaturity: string;
  yieldToMaturity: string;
  couponFrequency: 'annual' | 'semiannual' | 'quarterly' | 'monthly';
  dayCountConvention: '30/360' | 'Actual/360' | 'Actual/365' | 'Actual/Actual';
}

interface CashFlow {
  period: number;
  date: string;
  couponPayment: number;
  principal: number;
  totalPayment: number;
  presentValue: number;
}

interface CalculationResult {
  price: number;
  yieldToMaturity: number;
  currentYield: number;
  macaulayDuration: number;
  modifiedDuration: number;
  convexity: number;
  dirtyPrice: number;
  cleanPrice: number;
  accruedInterest: number;
  daysAccrued: number;
  cashFlows: CashFlow[];
  totalCashFlow: number;
  totalPresentValue: number;
  totalReturn: number;
  annualizedReturn: number;
  interestRateRisk: 'Low' | 'Medium' | 'High';
  creditRisk: 'Low' | 'Medium' | 'High';
  recommendation: string;
  priceYieldCurve: Array<{ yield: number; price: number }>;
}

interface SavedScenario {
  id: string;
  name: string;
  inputs: BondInputs;
  result: CalculationResult;
  savedAt: Date;
}

export default function BondCalculator() {
  const [inputs, setInputs] = useState<BondInputs>({
    faceValue: '1000',
    couponRate: '5',
    yearsToMaturity: '10',
    yieldToMaturity: '6',
    couponFrequency: 'semiannual',
    dayCountConvention: '30/360',
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showCashFlow, setShowCashFlow] = useState(false);
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  
  const resultRef = useRef<HTMLDivElement>(null);

  // Load saved scenarios from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bondScenarios');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSavedScenarios(parsed.map((s: SavedScenario) => ({
        ...s,
        savedAt: new Date(s.savedAt)
      })));
    }
  }, []);

  // Save scenarios to localStorage
  useEffect(() => {
    if (savedScenarios.length > 0) {
      localStorage.setItem('bondScenarios', JSON.stringify(savedScenarios));
    }
  }, [savedScenarios]);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/bond-calculator',
    getShareParams: () => ({
      fv: inputs.faceValue,
      cr: inputs.couponRate,
      y: inputs.yearsToMaturity,
      ytm: inputs.yieldToMaturity,
      f: inputs.couponFrequency.charAt(0),
    }),
    getShareText: () => {
      if (result) {
        return `Bond: $${inputs.faceValue} face, ${inputs.couponRate}% coupon, ${inputs.yearsToMaturity}y = Price: $${result.price.toFixed(2)}, YTM: ${result.yieldToMaturity.toFixed(2)}%`;
      }
      return 'Calculate bond pricing, yield, duration, and convexity!';
    },
  });

  const handleInputChange = (field: keyof BondInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = () => {
    const faceValue = parseFloat(inputs.faceValue) || 0;
    const couponRate = parseFloat(inputs.couponRate) || 0;
    const yearsToMaturity = parseFloat(inputs.yearsToMaturity) || 0;
    const yieldToMaturity = parseFloat(inputs.yieldToMaturity) || 0;

    if (faceValue <= 0 || yearsToMaturity <= 0) {
      alert('Please enter valid positive numbers for face value and years to maturity.');
      return;
    }

    const paymentsPerYear = inputs.couponFrequency === 'annual' ? 1 :
                            inputs.couponFrequency === 'semiannual' ? 2 :
                            inputs.couponFrequency === 'quarterly' ? 4 : 12;

    const totalPeriods = Math.ceil(yearsToMaturity * paymentsPerYear);
    const couponPayment = (faceValue * couponRate / 100) / paymentsPerYear;
    const yieldPerPeriod = yieldToMaturity / 100 / paymentsPerYear;

    // Calculate bond price
    let price = 0;
    const cashFlows: CashFlow[] = [];
    let totalPresentValue = 0;
    let weightedTimeValue = 0;

    for (let i = 1; i <= totalPeriods; i++) {
      const payment = i === totalPeriods ? couponPayment + faceValue : couponPayment;
      const pv = payment / Math.pow(1 + yieldPerPeriod, i);
      price += pv;
      totalPresentValue += pv;
      weightedTimeValue += (i / paymentsPerYear) * pv;

      const monthsToPayment = (i * 12) / paymentsPerYear;
      const paymentDate = new Date();
      paymentDate.setMonth(paymentDate.getMonth() + monthsToPayment);

      cashFlows.push({
        period: i,
        date: paymentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
        couponPayment: i === totalPeriods ? couponPayment : couponPayment,
        principal: i === totalPeriods ? faceValue : 0,
        totalPayment: payment,
        presentValue: pv,
      });
    }

    // Calculate durations
    const macaulayDuration = weightedTimeValue / price;
    const modifiedDuration = macaulayDuration / (1 + yieldPerPeriod);

    // Calculate convexity
    let convexity = 0;
    for (let i = 1; i <= totalPeriods; i++) {
      const payment = i === totalPeriods ? couponPayment + faceValue : couponPayment;
      const pv = payment / Math.pow(1 + yieldPerPeriod, i);
      convexity += (i * (i + 1) / Math.pow(paymentsPerYear, 2)) * pv;
    }
    convexity = convexity / (price * Math.pow(1 + yieldPerPeriod, 2));

    const annualCoupon = faceValue * couponRate / 100;
    const currentYield = (annualCoupon / price) * 100;

    const daysInPeriod = 365 / paymentsPerYear;
    const daysAccrued = Math.floor(daysInPeriod / 3);
    const accruedInterest = (couponPayment * daysAccrued) / daysInPeriod;
    
    const dirtyPrice = price;
    const cleanPrice = price - accruedInterest;
    const totalCashFlow = cashFlows.reduce((sum, cf) => sum + cf.totalPayment, 0);
    const totalReturn = ((totalCashFlow - price) / price) * 100;
    const annualizedReturn = (Math.pow(totalCashFlow / price, 1 / yearsToMaturity) - 1) * 100;

    const interestRateRisk: 'Low' | 'Medium' | 'High' = 
      modifiedDuration < 5 ? 'Low' : modifiedDuration < 10 ? 'Medium' : 'High';
    
    const creditRisk: 'Low' | 'Medium' | 'High' = 
      couponRate >= 6 ? 'High' : couponRate >= 4 ? 'Medium' : 'Low';

    // Generate recommendation
    let recommendation = '';
    if (price < faceValue) {
      recommendation = `Trading at ${((1 - price / faceValue) * 100).toFixed(1)}% discount. `;
      recommendation += yieldToMaturity > couponRate ? 
        'YTM exceeds coupon rate, offering attractive returns.' :
        'Consider market conditions carefully.';
    } else if (price > faceValue) {
      recommendation = `Trading at ${((price / faceValue - 1) * 100).toFixed(1)}% premium. `;
      recommendation += couponRate > yieldToMaturity ?
        'Higher coupon justifies premium for income-focused investors.' :
        'Evaluate if premium is justified by market rates.';
    } else {
      recommendation = 'Trading at par. Coupon rate equals YTM, offering predictable returns.';
    }

    if (interestRateRisk === 'High') {
      recommendation += ` High rate sensitivity (duration: ${modifiedDuration.toFixed(2)}y).`;
    }

    // Generate price-yield curve
    const priceYieldCurve = Array.from({ length: 11 }, (_, i) => {
      const yieldValue = Math.max(0.5, yieldToMaturity - 5 + i);
      const yieldPerPeriod = yieldValue / 100 / paymentsPerYear;
      
      let curvePrice = 0;
      for (let j = 1; j <= totalPeriods; j++) {
        const payment = j === totalPeriods ? couponPayment + faceValue : couponPayment;
        curvePrice += payment / Math.pow(1 + yieldPerPeriod, j);
      }
      
      return {
        yield: parseFloat(yieldValue.toFixed(1)),
        price: Math.round(curvePrice * 100) / 100,
      };
    });

    setResult({
      price: Math.round(price * 100) / 100,
      yieldToMaturity,
      currentYield: Math.round(currentYield * 100) / 100,
      macaulayDuration: Math.round(macaulayDuration * 100) / 100,
      modifiedDuration: Math.round(modifiedDuration * 100) / 100,
      convexity: Math.round(convexity * 100) / 100,
      dirtyPrice: Math.round(dirtyPrice * 100) / 100,
      cleanPrice: Math.round(cleanPrice * 100) / 100,
      accruedInterest: Math.round(accruedInterest * 100) / 100,
      daysAccrued,
      cashFlows,
      totalCashFlow: Math.round(totalCashFlow * 100) / 100,
      totalPresentValue: Math.round(totalPresentValue * 100) / 100,
      totalReturn: Math.round(totalReturn * 100) / 100,
      annualizedReturn: Math.round(annualizedReturn * 100) / 100,
      interestRateRisk,
      creditRisk,
      recommendation,
      priceYieldCurve,
    });
  };

  const handleSaveScenario = () => {
    if (!result) {
      alert('Please calculate first before saving.');
      return;
    }

    if (!scenarioName.trim()) {
      alert('Please enter a scenario name.');
      return;
    }

    const newScenario: SavedScenario = {
      id: Date.now().toString(),
      name: scenarioName.trim(),
      inputs: { ...inputs },
      result: { ...result },
      savedAt: new Date(),
    };

    setSavedScenarios(prev => [...prev, newScenario]);
    setScenarioName('');
    setShowSaveDialog(false);
  };

  const handleDeleteScenario = (id: string) => {
    if (confirm('Delete this scenario?')) {
      setSavedScenarios(prev => prev.filter(s => s.id !== id));
      setSelectedScenarios(prev => prev.filter(sid => sid !== id));
    }
  };

  const handleLoadScenario = (scenario: SavedScenario) => {
    setInputs(scenario.inputs);
    setResult(scenario.result);
    setShowComparison(false);
  };

  const toggleScenarioSelection = (id: string) => {
    setSelectedScenarios(prev => {
      if (prev.includes(id)) {
        return prev.filter(sid => sid !== id);
      } else if (prev.length < 4) {
        return [...prev, id];
      } else {
        alert('Maximum 4 scenarios for comparison.');
        return prev;
      }
    });
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `bond-calculator-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

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
            <head><title>Bond Calculator Results</title>
              <style>body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print { body { padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imgData}" onload="window.print();"/></body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
    }
  };

  const comparisonScenarios = savedScenarios.filter(s => selectedScenarios.includes(s.id));

  // Comparison mode - Full screen overlay
  if (showComparison && selectedScenarios.length >= 2) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <h2 className="text-2xl font-bold text-gray-900">
              Scenario Comparison ({selectedScenarios.length} bonds)
            </h2>
            <Button onClick={() => setShowComparison(false)} variant="outline" size="sm">
              <X className="h-4 w-4 mr-2" />
              Close Comparison
            </Button>
          </div>

          {/* Comparison Content */}
          <div className="space-y-8">
            {/* Key Metrics Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-gray-50">Metric</th>
                        {comparisonScenarios.map((scenario) => (
                          <th key={scenario.id} className="px-4 py-3 text-right font-semibold text-gray-700 bg-gray-50">
                            {scenario.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Bond Price</td>
                        {comparisonScenarios.map((s) => (
                          <td key={s.id} className="px-4 py-3 text-right font-semibold text-blue-700">
                            ${s.result.price.toFixed(2)}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">YTM (%)</td>
                        {comparisonScenarios.map((s) => (
                          <td key={s.id} className="px-4 py-3 text-right">{s.result.yieldToMaturity.toFixed(2)}%</td>
                        ))}
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Current Yield (%)</td>
                        {comparisonScenarios.map((s) => (
                          <td key={s.id} className="px-4 py-3 text-right">{s.result.currentYield.toFixed(2)}%</td>
                        ))}
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Modified Duration (yrs)</td>
                        {comparisonScenarios.map((s) => (
                          <td key={s.id} className="px-4 py-3 text-right">{s.result.modifiedDuration.toFixed(2)}</td>
                        ))}
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Convexity</td>
                        {comparisonScenarios.map((s) => (
                          <td key={s.id} className="px-4 py-3 text-right">{s.result.convexity.toFixed(2)}</td>
                        ))}
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Total Return (%)</td>
                        {comparisonScenarios.map((s) => (
                          <td key={s.id} className="px-4 py-3 text-right text-green-700 font-semibold">
                            {s.result.totalReturn.toFixed(2)}%
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Annualized Return (%)</td>
                        {comparisonScenarios.map((s) => (
                          <td key={s.id} className="px-4 py-3 text-right text-green-700 font-semibold">
                            {s.result.annualizedReturn.toFixed(2)}%
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Interest Rate Risk</td>
                        {comparisonScenarios.map((s) => (
                          <td key={s.id} className="px-4 py-3 text-right">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                              s.result.interestRateRisk === 'Low' ? 'bg-green-100 text-green-800' :
                              s.result.interestRateRisk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {s.result.interestRateRisk}
                            </span>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Visual Comparison Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Price & Duration Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Price & Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={comparisonScenarios.map(s => ({
                      name: s.name.substring(0, 12),
                      price: s.result.price,
                      duration: s.result.modifiedDuration * 100,
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" style={{ fontSize: '12px' }} />
                      <YAxis yAxisId="left" stroke="#1e40af" label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }} />
                      <YAxis yAxisId="right" orientation="right" stroke="#64748b" label={{ value: 'Duration (x100)', angle: 90, position: 'insideRight' }} />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="price" fill="#1e40af" name="Price" />
                      <Bar yAxisId="right" dataKey="duration" fill="#64748b" name="Duration (x100)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Return Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Return Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={comparisonScenarios.map(s => ({
                      name: s.name.substring(0, 12),
                      ytm: s.result.yieldToMaturity,
                      totalReturn: s.result.totalReturn,
                      annualizedReturn: s.result.annualizedReturn,
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" style={{ fontSize: '12px' }} />
                      <YAxis label={{ value: 'Return (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="ytm" fill="#1e40af" name="YTM" />
                      <Bar dataKey="annualizedReturn" fill="#059669" name="Annualized Return" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Price-Yield Curves Overlay */}
            <Card>
              <CardHeader>
                <CardTitle>Price-Yield Curves Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="yield" 
                      type="number"
                      domain={['dataMin', 'dataMax']}
                      label={{ value: 'Yield to Maturity (%)', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    {comparisonScenarios.map((scenario, idx) => {
                      const colors = ['#1e40af', '#059669', '#d97706', '#dc2626'];
                      return (
                        <Line
                          key={scenario.id}
                          data={scenario.result.priceYieldCurve}
                          type="monotone"
                          dataKey="price"
                          stroke={colors[idx % colors.length]}
                          strokeWidth={2}
                          name={scenario.name.substring(0, 15)}
                          dot={false}
                        />
                      );
                    })}
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-gray-600 mt-3 text-center">
                  Overlaid price-yield curves show relative sensitivity to interest rate changes
                </p>
              </CardContent>
            </Card>

            {/* Cash Flow Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Total Cash Flow Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comparisonScenarios.map((s, idx) => (
                    <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                      <div>
                        <p className="font-semibold text-gray-900">{s.name}</p>
                        <p className="text-sm text-gray-600">
                          {s.result.cashFlows.length} payments over {s.inputs.yearsToMaturity} years
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${s.result.totalCashFlow.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-sm text-gray-600">
                          PV: ${s.result.totalPresentValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Main calculator view
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1">
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">Bond Parameters</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* Face Value */}
              <div className="space-y-2">
                <Label htmlFor="faceValue" className="text-sm font-medium text-gray-700">
                  Face Value ($) <span className="text-red-600">*</span>
                </Label>
                <input
                  id="faceValue"
                  type="number"
                  value={inputs.faceValue}
                  onChange={(e) => handleInputChange('faceValue', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1000"
                />
              </div>

              {/* Coupon Rate */}
              <div className="space-y-2">
                <Label htmlFor="couponRate" className="text-sm font-medium text-gray-700">
                  Coupon Rate (%) <span className="text-red-600">*</span>
                </Label>
                <input
                  id="couponRate"
                  type="number"
                  value={inputs.couponRate}
                  onChange={(e) => handleInputChange('couponRate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5"
                  step="0.1"
                />
              </div>

              {/* Years to Maturity */}
              <div className="space-y-2">
                <Label htmlFor="yearsToMaturity" className="text-sm font-medium text-gray-700">
                  Years to Maturity <span className="text-red-600">*</span>
                </Label>
                <input
                  id="yearsToMaturity"
                  type="number"
                  value={inputs.yearsToMaturity}
                  onChange={(e) => handleInputChange('yearsToMaturity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10"
                  step="0.5"
                />
              </div>

              {/* Yield to Maturity */}
              <div className="space-y-2">
                <Label htmlFor="yieldToMaturity" className="text-sm font-medium text-gray-700">
                  Yield to Maturity (%) <span className="text-red-600">*</span>
                </Label>
                <input
                  id="yieldToMaturity"
                  type="number"
                  value={inputs.yieldToMaturity}
                  onChange={(e) => handleInputChange('yieldToMaturity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="6"
                  step="0.1"
                />
              </div>

              {/* Payment Frequency */}
              <div className="space-y-2">
                <Label htmlFor="couponFrequency" className="text-sm font-medium text-gray-700">
                  Payment Frequency
                </Label>
                <select
                  id="couponFrequency"
                  value={inputs.couponFrequency}
                  onChange={(e) => handleInputChange('couponFrequency', e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="annual">Annual</option>
                  <option value="semiannual">Semiannual (Common)</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              {/* Day Count Convention */}
              <div className="space-y-2">
                <Label htmlFor="dayCountConvention" className="text-sm font-medium text-gray-700">
                  Day Count Convention
                </Label>
                <select
                  id="dayCountConvention"
                  value={inputs.dayCountConvention}
                  onChange={(e) => handleInputChange('dayCountConvention', e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="30/360">30/360</option>
                  <option value="Actual/360">Actual/360</option>
                  <option value="Actual/365">Actual/365</option>
                  <option value="Actual/Actual">Actual/Actual</option>
                </select>
              </div>

              <Button
                onClick={calculate}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>

              {result && (
                <Button
                  onClick={() => setShowSaveDialog(true)}
                  variant="outline"
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Scenario
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          {result ? (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-gray-200">
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-600 mb-1">Bond Price</p>
                    <p className="text-xl font-bold text-blue-700">
                      ${result.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-600 mb-1">YTM</p>
                    <p className="text-xl font-bold text-gray-900">
                      {result.yieldToMaturity.toFixed(2)}%
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-600 mb-1">Duration</p>
                    <p className="text-xl font-bold text-gray-900">
                      {result.modifiedDuration.toFixed(2)}y
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-600 mb-1">Convexity</p>
                    <p className="text-xl font-bold text-gray-900">
                      {result.convexity.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Price Details - Collapsible */}
              <Card className="border-gray-200">
                <CardHeader 
                  className="cursor-pointer bg-gray-50 border-b hover:bg-gray-100 transition-colors"
                  onClick={() => setShowPriceDetails(!showPriceDetails)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-gray-900">Price Analysis</CardTitle>
                    {showPriceDetails ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                  </div>
                </CardHeader>
                {showPriceDetails && (
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Clean Price:</span>
                        <span className="font-semibold">${result.cleanPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dirty Price:</span>
                        <span className="font-semibold">${result.dirtyPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Accrued Interest:</span>
                        <span className="font-semibold">${result.accruedInterest.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Yield:</span>
                        <span className="font-semibold">{result.currentYield.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Macaulay Duration:</span>
                        <span className="font-semibold">{result.macaulayDuration.toFixed(2)}y</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Return:</span>
                        <span className="font-semibold text-green-700">{result.totalReturn.toFixed(2)}%</span>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Risk Assessment */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Interest Rate Risk</p>
                      <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                        result.interestRateRisk === 'Low' ? 'bg-green-100 text-green-800' :
                        result.interestRateRisk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {result.interestRateRisk}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Credit Risk Indicator</p>
                      <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                        result.creditRisk === 'Low' ? 'bg-green-100 text-green-800' :
                        result.creditRisk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {result.creditRisk}
                      </span>
                    </div>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded">
                    <p className="text-sm text-gray-700">{result.recommendation}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Price-Yield Curve */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">Price-Yield Relationship</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={result.priceYieldCurve}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1e40af" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#1e40af" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="yield" label={{ value: 'Yield (%)', position: 'insideBottom', offset: -5 }} style={{ fontSize: '12px' }} />
                      <YAxis label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }} style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="price" stroke="#1e40af" strokeWidth={2} fill="url(#colorPrice)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Cash Flow Table - Collapsible */}
              <Card className="border-gray-200">
                <CardHeader 
                  className="cursor-pointer bg-gray-50 border-b hover:bg-gray-100 transition-colors"
                  onClick={() => setShowCashFlow(!showCashFlow)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-gray-900">
                      Cash Flow Timeline ({result.cashFlows.length} payments)
                    </CardTitle>
                    {showCashFlow ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                  </div>
                </CardHeader>
                {showCashFlow && (
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Period</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Date</th>
                            <th className="px-3 py-2 text-right font-semibold text-gray-700">Coupon</th>
                            <th className="px-3 py-2 text-right font-semibold text-gray-700">Principal</th>
                            <th className="px-3 py-2 text-right font-semibold text-gray-700">Total</th>
                            <th className="px-3 py-2 text-right font-semibold text-gray-700">PV</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.cashFlows.map((cf) => (
                            <tr key={cf.period} className="border-b hover:bg-gray-50">
                              <td className="px-3 py-2">{cf.period}</td>
                              <td className="px-3 py-2 text-gray-600">{cf.date}</td>
                              <td className="px-3 py-2 text-right">${cf.couponPayment.toFixed(2)}</td>
                              <td className="px-3 py-2 text-right">${cf.principal.toFixed(2)}</td>
                              <td className="px-3 py-2 text-right font-semibold">${cf.totalPayment.toFixed(2)}</td>
                              <td className="px-3 py-2 text-right text-blue-700">${cf.presentValue.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-gray-100 font-semibold border-t-2">
                            <td colSpan={4} className="px-3 py-2">Total</td>
                            <td className="px-3 py-2 text-right">${result.totalCashFlow.toFixed(2)}</td>
                            <td className="px-3 py-2 text-right text-blue-700">${result.totalPresentValue.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={handleSaveAsImage} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Save Image
                </Button>
                <Button onClick={handlePrint} variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button onClick={handleShare} variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          ) : (
            <Card className="border-gray-200">
              <CardContent className="p-12 text-center text-gray-500">
                <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Enter bond parameters and click Calculate</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Saved Scenarios Section */}
      {savedScenarios.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Saved Scenarios ({savedScenarios.length})</h3>
            {selectedScenarios.length >= 2 && (
              <Button onClick={() => setShowComparison(true)} className="bg-blue-700 hover:bg-blue-800">
                <BarChart3 className="h-4 w-4 mr-2" />
                Compare {selectedScenarios.length} Scenarios
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {savedScenarios.map((scenario) => (
              <Card 
                key={scenario.id} 
                className={`cursor-pointer transition-all ${
                  selectedScenarios.includes(scenario.id)
                    ? 'border-blue-500 border-2 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => toggleScenarioSelection(scenario.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <input
                      type="checkbox"
                      checked={selectedScenarios.includes(scenario.id)}
                      onChange={() => {}}
                      className="mt-1 pointer-events-none"
                      readOnly
                    />
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteScenario(scenario.id);
                      }}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">{scenario.name}</h4>
                  
                  <div className="space-y-1 text-xs text-gray-600 mb-3">
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="font-semibold text-blue-700">${scenario.result.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>YTM:</span>
                      <span className="font-semibold">{scenario.result.yieldToMaturity.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-semibold">{scenario.result.modifiedDuration.toFixed(2)}y</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLoadScenario(scenario);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                  >
                    Load
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Scenario</h3>
            <input
              type="text"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              placeholder="e.g., Corporate 10Y 5%"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <Button onClick={() => { setShowSaveDialog(false); setScenarioName(''); }} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleSaveScenario} className="bg-blue-700 hover:bg-blue-800">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Bond Calculator"
      />
    </div>
  );
}
