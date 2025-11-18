'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, AlertCircle, Plus, Trash2, Save, Check, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CashFlowEntry {
  id: string;
  type: 'deposit' | 'withdraw';
  amount: string;
  date: string;
}

interface ReturnEntry {
  id: string;
  return: string;
  years: string;
  months: string;
}

interface CashFlowResult {
  averageReturn: number;
  totalDays: number;
  startBalance: number;
  endBalance: number;
  totalGain: number;
  entries: CashFlowEntry[];
}

interface CumulativeResult {
  arithmeticMean: number;
  geometricMean: number; // CAGR
  totalReturn: number;
  totalPeriodYears: number;
  standardDeviation: number;
  sharpeRatio: number;
  maxDrawdown: number;
  schedule: {
    period: string;
    return: number;
    balance: number;
  }[];
}

interface SavedScenario {
  id: string;
  name: string;
  mode: 'cashflow' | 'cumulative';
  cashFlowResult?: CashFlowResult;
  cumulativeResult?: CumulativeResult;
  savedAt: Date;
}

export default function AverageReturnCalculator() {
  const [mode, setMode] = useState<'cashflow' | 'cumulative'>('cashflow');
  
  // Scenario Management
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  
  // Cash Flow Mode
  const [startBalance, setStartBalance] = useState('5600');
  const [endBalance, setEndBalance] = useState('18000');
  const [startDate, setStartDate] = useState('2022-01-01');
  const [endDate, setEndDate] = useState('2025-11-17');
  const [cashFlows, setCashFlows] = useState<CashFlowEntry[]>([
    { id: '1', type: 'deposit', amount: '5000', date: '2023-01-15' },
    { id: '2', type: 'withdraw', amount: '1500', date: '2023-06-01' },
    { id: '3', type: 'deposit', amount: '3800', date: '2024-01-18' },
  ]);
  
  // Cumulative Mode
  const [returns, setReturns] = useState<ReturnEntry[]>([
    { id: '1', return: '10', years: '1', months: '2' },
    { id: '2', return: '-2', years: '', months: '5' },
    { id: '3', return: '15', years: '2', months: '3' },
  ]);
  
  const [cashFlowResult, setCashFlowResult] = useState<CashFlowResult | null>(null);
  const [cumulativeResult, setCumulativeResult] = useState<CumulativeResult | null>(null);
  const [error, setError] = useState('');
  
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/average-return-calculator',
    getShareParams: () => ({ mode }),
    getShareText: () => {
      if (mode === 'cashflow' && cashFlowResult) {
        return `Average Return: ${cashFlowResult.averageReturn.toFixed(2)}% per year`;
      }
      if (mode === 'cumulative' && cumulativeResult) {
        return `CAGR: ${cumulativeResult.geometricMean.toFixed(2)}%`;
      }
      return 'Calculate investment returns!';
    },
  });

  // Load saved scenarios from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('averageReturnScenarios');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedScenarios(parsed.map((s: any) => ({
          ...s,
          savedAt: new Date(s.savedAt)
        })));
      } catch (e) {
        console.error('Failed to load scenarios:', e);
      }
    }
  }, []);

  // Save scenario
  const saveScenario = () => {
    if (!scenarioName.trim()) {
      setError('Please enter a scenario name');
      return;
    }

    const scenario: SavedScenario = {
      id: Date.now().toString(),
      name: scenarioName,
      mode,
      cashFlowResult: mode === 'cashflow' ? cashFlowResult || undefined : undefined,
      cumulativeResult: mode === 'cumulative' ? cumulativeResult || undefined : undefined,
      savedAt: new Date(),
    };

    const updated = [...savedScenarios, scenario];
    setSavedScenarios(updated);
    localStorage.setItem('averageReturnScenarios', JSON.stringify(updated));
    setScenarioName('');
    setShowSaveDialog(false);
  };

  // Delete scenario
  const deleteScenario = (id: string) => {
    const updated = savedScenarios.filter(s => s.id !== id);
    setSavedScenarios(updated);
    localStorage.setItem('averageReturnScenarios', JSON.stringify(updated));
    setSelectedScenarios(selectedScenarios.filter(sid => sid !== id));
  };

  // Toggle scenario selection
  const toggleScenarioSelection = (id: string) => {
    if (selectedScenarios.includes(id)) {
      setSelectedScenarios(selectedScenarios.filter(sid => sid !== id));
    } else if (selectedScenarios.length < 3) {
      setSelectedScenarios([...selectedScenarios, id]);
    }
  };

  const addCashFlow = () => {
    setCashFlows([...cashFlows, { id: Date.now().toString(), type: 'deposit', amount: '', date: '' }]);
  };

  const removeCashFlow = (id: string) => {
    setCashFlows(cashFlows.filter(cf => cf.id !== id));
  };

  const updateCashFlow = (id: string, field: keyof CashFlowEntry, value: string) => {
    setCashFlows(cashFlows.map(cf => cf.id === id ? { ...cf, [field]: value } : cf));
  };

  const addReturn = () => {
    setReturns([...returns, { id: Date.now().toString(), return: '', years: '', months: '' }]);
  };

  const removeReturn = (id: string) => {
    setReturns(returns.filter(r => r.id !== id));
  };

  const updateReturn = (id: string, field: keyof ReturnEntry, value: string) => {
    setReturns(returns.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const calculateCashFlow = () => {
    setError('');
    
    try {
      const start = parseFloat(startBalance);
      const end = parseFloat(endBalance);
      const startD = new Date(startDate);
      const endD = new Date(endDate);
      
      if (isNaN(start) || start < 0) {
        setError('Invalid starting balance');
        return;
      }
      
      if (isNaN(end) || end < 0) {
        setError('Invalid ending balance');
        return;
      }
      
      if (startD >= endD) {
        setError('End date must be after start date');
        return;
      }
      
      const totalDays = Math.floor((endD.getTime() - startD.getTime()) / (1000 * 60 * 60 * 24));
      const totalYears = totalDays / 365.25;
      
      // Calculate net cash flows
      let netCashFlow = 0;
      for (const cf of cashFlows) {
        const amount = parseFloat(cf.amount);
        if (!isNaN(amount)) {
          netCashFlow += cf.type === 'deposit' ? amount : -amount;
        }
      }
      
      // Simple average return calculation
      // (End Balance - Start Balance - Net Cash Flows) / Start Balance / Years
      const totalGain = end - start - netCashFlow;
      const averageReturn = (totalGain / start / totalYears) * 100;
      
      setCashFlowResult({
        averageReturn,
        totalDays,
        startBalance: start,
        endBalance: end,
        totalGain,
        entries: cashFlows.filter(cf => cf.amount && cf.date),
      });
      
    } catch (err: any) {
      setError(err.message || 'Calculation error');
    }
  };

  const calculateCumulative = () => {
    setError('');
    
    try {
      const validReturns = returns.filter(r => r.return && (r.years || r.months));
      
      if (validReturns.length === 0) {
        setError('Please enter at least one return period');
        return;
      }
      
      let totalYears = 0;
      let sumReturns = 0;
      let productReturns = 1;
      const returnValues: number[] = [];
      
      for (const r of validReturns) {
        const ret = parseFloat(r.return);
        const years = parseFloat(r.years || '0');
        const months = parseFloat(r.months || '0');
        
        if (isNaN(ret)) continue;
        
        const periodYears = years + months / 12;
        totalYears += periodYears;
        
        sumReturns += ret;
        productReturns *= (1 + ret / 100);
        returnValues.push(ret);
      }
      
      // Arithmetic Mean
      const arithmeticMean = sumReturns / validReturns.length;
      
      // Geometric Mean (CAGR)
      const totalReturn = (productReturns - 1) * 100;
      const geometricMean = totalYears > 0 ? (Math.pow(productReturns, 1 / totalYears) - 1) * 100 : 0;
      
      // Standard Deviation
      const variance = returnValues.reduce((sum, r) => sum + Math.pow(r - arithmeticMean, 2), 0) / returnValues.length;
      const standardDeviation = Math.sqrt(variance);
      
      // Sharpe Ratio (assuming risk-free rate = 2%)
      const riskFreeRate = 2;
      const sharpeRatio = standardDeviation > 0 ? (arithmeticMean - riskFreeRate) / standardDeviation : 0;
      
      // Max Drawdown
      let maxDrawdown = 0;
      let peak = 100;
      let balance = 100;
      
      for (const r of validReturns) {
        const ret = parseFloat(r.return);
        balance *= (1 + ret / 100);
        if (balance > peak) peak = balance;
        const drawdown = ((peak - balance) / peak) * 100;
        if (drawdown > maxDrawdown) maxDrawdown = drawdown;
      }
      
      // Build schedule starting with $100
      const schedule: { period: string; return: number; balance: number }[] = [];
      let currentBalance = 100;
      
      for (let i = 0; i < validReturns.length; i++) {
        const r = validReturns[i];
        const ret = parseFloat(r.return);
        const years = parseFloat(r.years || '0');
        const months = parseFloat(r.months || '0');
        
        currentBalance *= (1 + ret / 100);
        
        let periodStr = '';
        if (years > 0 && months > 0) {
          periodStr = `${years} year${years > 1 ? 's' : ''}, ${months} month${months > 1 ? 's' : ''}`;
        } else if (years > 0) {
          periodStr = `${years} year${years > 1 ? 's' : ''}`;
        } else {
          periodStr = `${months} month${months > 1 ? 's' : ''}`;
        }
        
        schedule.push({
          period: periodStr,
          return: ret,
          balance: currentBalance,
        });
      }
      
      setCumulativeResult({
        arithmeticMean,
        geometricMean,
        totalReturn,
        totalPeriodYears: totalYears,
        standardDeviation,
        sharpeRatio,
        maxDrawdown,
        schedule,
      });
      
    } catch (err: any) {
      setError(err.message || 'Calculation error');
    }
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
      link.download = `average-return-${mode}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
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
            <head><title>Average Return Calculation</title>
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

  // Cash Flow Chart Data
  const cashFlowChartData = cashFlowResult ? {
    labels: cashFlowResult.entries.map(e => e.date),
    datasets: [{
      label: 'Deposits & Withdrawals',
      data: cashFlowResult.entries.map(e => {
        const amount = parseFloat(e.amount);
        return e.type === 'deposit' ? amount : -amount;
      }),
      backgroundColor: cashFlowResult.entries.map(e => 
        e.type === 'deposit' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(239, 68, 68, 0.8)'
      ),
    }],
  } : null;

  // Cumulative Return Chart Data
  const cumulativeChartData = cumulativeResult ? {
    labels: cumulativeResult.schedule.map((_, i) => `Period ${i + 1}`),
    datasets: [{
      label: 'Portfolio Value ($100 start)',
      data: cumulativeResult.schedule.map(s => s.balance),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
    }],
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            return `${context.dataset.label}: $${Math.abs(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
          },
        },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Mode Selector */}
      <div className="mb-6">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <Button
                onClick={() => setMode('cashflow')}
                className={mode === 'cashflow' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}
              >
                📊 Cash Flow Based
              </Button>
              <Button
                onClick={() => setMode('cumulative')}
                className={mode === 'cumulative' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}
              >
                📈 Cumulative Returns
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              {mode === 'cashflow' 
                ? 'Calculate average return based on account balances and cash flows'
                : 'Calculate CAGR and statistics from multiple investment returns'
              }
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1">
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">
                {mode === 'cashflow' ? 'Cash Flow Inputs' : 'Return Periods'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {mode === 'cashflow' ? (
                <>
                  {/* Cash Flow Mode Inputs */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Starting Balance</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="text"
                        value={startBalance}
                        onChange={(e) => setStartBalance(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="5,600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Ending Balance</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="text"
                        value={endBalance}
                        onChange={(e) => setEndBalance(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="18,000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">End Date</Label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-sm font-medium text-gray-700">Deposits & Withdrawals</Label>
                      <Button onClick={addCashFlow} size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {cashFlows.map((cf, idx) => (
                        <div key={cf.id} className="flex gap-2 items-start">
                          <span className="text-sm text-gray-600 mt-2 w-6">{idx + 1}.</span>
                          <select
                            value={cf.type}
                            onChange={(e) => updateCashFlow(cf.id, 'type', e.target.value)}
                            className="flex-shrink-0 px-2 py-1.5 text-sm border border-gray-300 rounded-md"
                          >
                            <option value="deposit">Deposit</option>
                            <option value="withdraw">Withdraw</option>
                          </select>
                          <div className="relative flex-1">
                            <span className="absolute left-2 top-1.5 text-xs text-gray-500">$</span>
                            <input
                              type="text"
                              value={cf.amount}
                              onChange={(e) => updateCashFlow(cf.id, 'amount', e.target.value)}
                              className="w-full pl-5 pr-2 py-1.5 text-sm border border-gray-300 rounded-md"
                              placeholder="1,000"
                            />
                          </div>
                          <input
                            type="date"
                            value={cf.date}
                            onChange={(e) => updateCashFlow(cf.id, 'date', e.target.value)}
                            className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded-md"
                          />
                          <Button
                            onClick={() => removeCashFlow(cf.id)}
                            size="sm"
                            variant="outline"
                            className="flex-shrink-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  <Button
                    onClick={calculateCashFlow}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
                  </Button>
                </>
              ) : (
                <>
                  {/* Cumulative Returns Mode Inputs */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-700">Investment Returns</Label>
                      <Button onClick={addReturn} size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {returns.map((r, idx) => (
                        <div key={r.id} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Period {idx + 1}</span>
                            <Button
                              onClick={() => removeReturn(r.id)}
                              size="sm"
                              variant="outline"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <Label className="text-xs text-gray-600">Return (%)</Label>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={r.return}
                                  onChange={(e) => updateReturn(r.id, 'return', e.target.value)}
                                  className="w-full pr-6 px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                                  placeholder="10"
                                />
                                <span className="absolute right-3 top-1.5 text-xs text-gray-500">%</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label className="text-xs text-gray-600">Years</Label>
                                <input
                                  type="text"
                                  value={r.years}
                                  onChange={(e) => updateReturn(r.id, 'years', e.target.value)}
                                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                                  placeholder="1"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-gray-600">Months</Label>
                                <input
                                  type="text"
                                  value={r.months}
                                  onChange={(e) => updateReturn(r.id, 'months', e.target.value)}
                                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                                  placeholder="2"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  <Button
                    onClick={calculateCumulative}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          {mode === 'cashflow' && cashFlowResult ? (
            <div className="space-y-6">
              {/* Cash Flow Result */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
                  <CardTitle className="text-2xl text-gray-900">Result</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-white border-2 border-green-500 rounded-lg p-6 mb-6">
                    <p className="text-lg text-gray-700 mb-2">
                      The average return for the investment is
                    </p>
                    <p className="text-5xl font-bold text-green-600">
                      {cashFlowResult.averageReturn.toFixed(2)}%
                    </p>
                    <p className="text-lg text-gray-600 mt-1">per year</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Total Days</p>
                      <p className="text-2xl font-bold text-blue-900">{cashFlowResult.totalDays}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Total Gain</p>
                      <p className="text-2xl font-bold text-green-900">
                        ${cashFlowResult.totalGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Start Balance</p>
                      <p className="text-2xl font-bold text-purple-900">
                        ${cashFlowResult.startBalance.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">End Balance</p>
                      <p className="text-2xl font-bold text-orange-900">
                        ${cashFlowResult.endBalance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cash Flow Chart */}
              {cashFlowChartData && cashFlowResult.entries.length > 0 && (
                <Card className="border-gray-200">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-base text-gray-900">📊 Deposits and Withdrawals</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-80">
                      <Bar key="cashflow-chart" data={cashFlowChartData} options={chartOptions} />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  onClick={() => setShowSaveDialog(true)} 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Scenario
                </Button>
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
          ) : mode === 'cumulative' && cumulativeResult ? (
            <div className="space-y-6">
              {/* Cumulative Result */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                  <CardTitle className="text-2xl text-gray-900">Investment Performance</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white border-2 border-blue-500 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-600 mb-1">CAGR (Geometric Mean)</p>
                      <p className="text-4xl font-bold text-blue-600">
                        {cumulativeResult.geometricMean.toFixed(2)}%
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Compound Annual Growth Rate</p>
                    </div>

                    <div className="bg-white border-2 border-green-500 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-600 mb-1">Arithmetic Mean</p>
                      <p className="text-4xl font-bold text-green-600">
                        {cumulativeResult.arithmeticMean.toFixed(2)}%
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Simple Average Return</p>
                    </div>

                    <div className="bg-white border-2 border-purple-500 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-600 mb-1">Total Return</p>
                      <p className="text-4xl font-bold text-purple-600">
                        {cumulativeResult.totalReturn.toFixed(2)}%
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Cumulative Gain</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Total Period</p>
                      <p className="text-xl font-bold text-gray-900">
                        {cumulativeResult.totalPeriodYears.toFixed(1)} years
                      </p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Volatility (σ)</p>
                      <p className="text-xl font-bold text-orange-900">
                        {cumulativeResult.standardDeviation.toFixed(2)}%
                      </p>
                    </div>
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Sharpe Ratio</p>
                      <p className="text-xl font-bold text-teal-900">
                        {cumulativeResult.sharpeRatio.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Max Drawdown</p>
                      <p className="text-xl font-bold text-red-900">
                        {cumulativeResult.maxDrawdown.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Chart */}
              {cumulativeChartData && (
                <Card className="border-gray-200">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-base text-gray-900">📈 Portfolio Growth</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-80">
                      <Line key="cumulative-chart" data={cumulativeChartData} options={chartOptions} />
                    </div>
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      Starting with $100, showing growth through each investment period
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Schedule Table */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">📅 Schedule (Beginning with $100)</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 border-b-2 border-gray-300">
                        <tr>
                          <th className="px-4 py-3 text-left text-gray-700">Holding Period</th>
                          <th className="px-4 py-3 text-right text-gray-700">Return</th>
                          <th className="px-4 py-3 text-right text-gray-700">Ending Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cumulativeResult.schedule.map((s, idx) => (
                          <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900">{s.period}</td>
                            <td className="px-4 py-3 text-right text-gray-900 font-medium">
                              {s.return > 0 ? '+' : ''}{s.return}%
                            </td>
                            <td className="px-4 py-3 text-right text-gray-900 font-medium">
                              ${s.balance.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Metrics Explanation */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">📊 Understanding the Metrics</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">CAGR vs Arithmetic Mean</h4>
                      <p className="text-gray-700 text-xs">
                        CAGR (Geometric Mean) accounts for compounding and is more accurate for multi-period returns. 
                        Arithmetic mean is a simple average but can overstate actual performance.
                      </p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Standard Deviation (Volatility)</h4>
                      <p className="text-gray-700 text-xs">
                        Measures the dispersion of returns. Higher values indicate more volatile investments. 
                        Generally, σ &lt; 10% is low volatility, &gt; 20% is high.
                      </p>
                    </div>
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Sharpe Ratio</h4>
                      <p className="text-gray-700 text-xs">
                        Risk-adjusted return metric. Higher is better. &gt;1 is good, &gt;2 is very good, &gt;3 is excellent. 
                        Compares excess return to volatility.
                      </p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Maximum Drawdown</h4>
                      <p className="text-gray-700 text-xs">
                        Largest peak-to-trough decline. Shows worst-case scenario loss. Lower is better. 
                        Important for understanding downside risk.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  onClick={() => setShowSaveDialog(true)} 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Scenario
                </Button>
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
                <p className="text-lg font-medium mb-2">Calculate Your Average Investment Return</p>
                <p className="text-sm mb-6">
                  Choose between cash flow analysis or cumulative return calculation
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900 font-semibold mb-2">📊 Cash Flow Mode</p>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• Input starting and ending balances</li>
                      <li>• Add deposits and withdrawals</li>
                      <li>• Calculate time-weighted average return</li>
                      <li>• See cash flow timeline visualization</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-sm text-purple-900 font-semibold mb-2">📈 Cumulative Mode</p>
                    <ul className="text-xs text-purple-800 space-y-1">
                      <li>• Input returns for multiple periods</li>
                      <li>• Calculate CAGR and arithmetic mean</li>
                      <li>• Get risk metrics (Sharpe, volatility)</li>
                      <li>• View portfolio growth simulation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Saved Scenarios Management */}
      {savedScenarios.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-gray-900">💾 Saved Scenarios ({savedScenarios.length})</CardTitle>
                {selectedScenarios.length >= 2 && (
                  <Button 
                    onClick={() => setShowComparison(!showComparison)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    {showComparison ? 'Hide' : 'Compare'} Selected ({selectedScenarios.length})
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedScenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    onClick={() => toggleScenarioSelection(scenario.id)}
                    className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                      selectedScenarios.includes(scenario.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{scenario.name}</h3>
                        <p className="text-xs text-gray-500">
                          {new Date(scenario.savedAt).toLocaleDateString()} • {scenario.mode === 'cashflow' ? 'Cash Flow' : 'Cumulative'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedScenarios.includes(scenario.id) && (
                          <div className="bg-blue-500 text-white rounded-full p-1">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteScenario(scenario.id);
                          }}
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {scenario.mode === 'cashflow' && scenario.cashFlowResult && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg Return:</span>
                          <span className="font-semibold text-green-600">
                            {scenario.cashFlowResult.averageReturn.toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Gain:</span>
                          <span className="font-semibold text-gray-900">
                            ${scenario.cashFlowResult.totalGain.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {scenario.mode === 'cumulative' && scenario.cumulativeResult && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">CAGR:</span>
                          <span className="font-semibold text-blue-600">
                            {scenario.cumulativeResult.geometricMean.toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sharpe:</span>
                          <span className="font-semibold text-gray-900">
                            {scenario.cumulativeResult.sharpeRatio.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Volatility:</span>
                          <span className="font-semibold text-orange-600">
                            {scenario.cumulativeResult.standardDeviation.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {selectedScenarios.length > 0 && selectedScenarios.length < 2 && (
                <p className="text-sm text-gray-500 text-center mt-4">
                  Select at least 2 scenarios to compare (max 3)
                </p>
              )}
            </CardContent>
          </Card>

          {/* Comparison View */}
          {showComparison && selectedScenarios.length >= 2 && (
            <Card className="border-gray-200 mt-6">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                <CardTitle className="text-xl text-gray-900">📊 Scenario Comparison</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 border-b-2 border-gray-300">
                      <tr>
                        <th className="px-4 py-3 text-left text-gray-700 font-semibold">Metric</th>
                        {selectedScenarios.map(id => {
                          const scenario = savedScenarios.find(s => s.id === id);
                          return scenario ? (
                            <th key={id} className="px-4 py-3 text-right text-gray-700 font-semibold">
                              {scenario.name}
                            </th>
                          ) : null;
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {/* Check if all scenarios are cumulative */}
                      {selectedScenarios.every(id => {
                        const s = savedScenarios.find(sc => sc.id === id);
                        return s?.mode === 'cumulative';
                      }) ? (
                        <>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">CAGR</td>
                            {selectedScenarios.map(id => {
                              const scenario = savedScenarios.find(s => s.id === id);
                              return scenario?.cumulativeResult ? (
                                <td key={id} className="px-4 py-3 text-right text-blue-600 font-semibold">
                                  {scenario.cumulativeResult.geometricMean.toFixed(2)}%
                                </td>
                              ) : <td key={id} className="px-4 py-3 text-right text-gray-400">-</td>;
                            })}
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">Arithmetic Mean</td>
                            {selectedScenarios.map(id => {
                              const scenario = savedScenarios.find(s => s.id === id);
                              return scenario?.cumulativeResult ? (
                                <td key={id} className="px-4 py-3 text-right text-green-600 font-semibold">
                                  {scenario.cumulativeResult.arithmeticMean.toFixed(2)}%
                                </td>
                              ) : <td key={id} className="px-4 py-3 text-right text-gray-400">-</td>;
                            })}
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">Total Return</td>
                            {selectedScenarios.map(id => {
                              const scenario = savedScenarios.find(s => s.id === id);
                              return scenario?.cumulativeResult ? (
                                <td key={id} className="px-4 py-3 text-right text-purple-600 font-semibold">
                                  {scenario.cumulativeResult.totalReturn.toFixed(2)}%
                                </td>
                              ) : <td key={id} className="px-4 py-3 text-right text-gray-400">-</td>;
                            })}
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">Sharpe Ratio</td>
                            {selectedScenarios.map(id => {
                              const scenario = savedScenarios.find(s => s.id === id);
                              return scenario?.cumulativeResult ? (
                                <td key={id} className="px-4 py-3 text-right text-teal-600 font-semibold">
                                  {scenario.cumulativeResult.sharpeRatio.toFixed(2)}
                                </td>
                              ) : <td key={id} className="px-4 py-3 text-right text-gray-400">-</td>;
                            })}
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">Volatility (σ)</td>
                            {selectedScenarios.map(id => {
                              const scenario = savedScenarios.find(s => s.id === id);
                              return scenario?.cumulativeResult ? (
                                <td key={id} className="px-4 py-3 text-right text-orange-600 font-semibold">
                                  {scenario.cumulativeResult.standardDeviation.toFixed(2)}%
                                </td>
                              ) : <td key={id} className="px-4 py-3 text-right text-gray-400">-</td>;
                            })}
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">Max Drawdown</td>
                            {selectedScenarios.map(id => {
                              const scenario = savedScenarios.find(s => s.id === id);
                              return scenario?.cumulativeResult ? (
                                <td key={id} className="px-4 py-3 text-right text-red-600 font-semibold">
                                  {scenario.cumulativeResult.maxDrawdown.toFixed(2)}%
                                </td>
                              ) : <td key={id} className="px-4 py-3 text-right text-gray-400">-</td>;
                            })}
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">Total Period</td>
                            {selectedScenarios.map(id => {
                              const scenario = savedScenarios.find(s => s.id === id);
                              return scenario?.cumulativeResult ? (
                                <td key={id} className="px-4 py-3 text-right text-gray-700 font-semibold">
                                  {scenario.cumulativeResult.totalPeriodYears.toFixed(1)} years
                                </td>
                              ) : <td key={id} className="px-4 py-3 text-right text-gray-400">-</td>;
                            })}
                          </tr>
                        </>
                      ) : selectedScenarios.every(id => {
                        const s = savedScenarios.find(sc => sc.id === id);
                        return s?.mode === 'cashflow';
                      }) ? (
                        <>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">Average Return</td>
                            {selectedScenarios.map(id => {
                              const scenario = savedScenarios.find(s => s.id === id);
                              return scenario?.cashFlowResult ? (
                                <td key={id} className="px-4 py-3 text-right text-green-600 font-semibold">
                                  {scenario.cashFlowResult.averageReturn.toFixed(2)}%
                                </td>
                              ) : <td key={id} className="px-4 py-3 text-right text-gray-400">-</td>;
                            })}
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">Total Gain</td>
                            {selectedScenarios.map(id => {
                              const scenario = savedScenarios.find(s => s.id === id);
                              return scenario?.cashFlowResult ? (
                                <td key={id} className="px-4 py-3 text-right text-blue-600 font-semibold">
                                  ${scenario.cashFlowResult.totalGain.toLocaleString()}
                                </td>
                              ) : <td key={id} className="px-4 py-3 text-right text-gray-400">-</td>;
                            })}
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">Start Balance</td>
                            {selectedScenarios.map(id => {
                              const scenario = savedScenarios.find(s => s.id === id);
                              return scenario?.cashFlowResult ? (
                                <td key={id} className="px-4 py-3 text-right text-gray-700 font-semibold">
                                  ${scenario.cashFlowResult.startBalance.toLocaleString()}
                                </td>
                              ) : <td key={id} className="px-4 py-3 text-right text-gray-400">-</td>;
                            })}
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">End Balance</td>
                            {selectedScenarios.map(id => {
                              const scenario = savedScenarios.find(s => s.id === id);
                              return scenario?.cashFlowResult ? (
                                <td key={id} className="px-4 py-3 text-right text-gray-700 font-semibold">
                                  ${scenario.cashFlowResult.endBalance.toLocaleString()}
                                </td>
                              ) : <td key={id} className="px-4 py-3 text-right text-gray-400">-</td>;
                            })}
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">Total Days</td>
                            {selectedScenarios.map(id => {
                              const scenario = savedScenarios.find(s => s.id === id);
                              return scenario?.cashFlowResult ? (
                                <td key={id} className="px-4 py-3 text-right text-gray-700 font-semibold">
                                  {scenario.cashFlowResult.totalDays}
                                </td>
                              ) : <td key={id} className="px-4 py-3 text-right text-gray-400">-</td>;
                            })}
                          </tr>
                        </>
                      ) : (
                        <tr>
                          <td colSpan={selectedScenarios.length + 1} className="px-4 py-6 text-center text-gray-500">
                            Cannot compare scenarios of different types (Cash Flow vs Cumulative)
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {selectedScenarios.every(id => savedScenarios.find(s => s.id === id)?.mode === 'cumulative') && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedScenarios.map(id => {
                      const scenario = savedScenarios.find(s => s.id === id);
                      if (!scenario?.cumulativeResult) return null;
                      
                      const result = scenario.cumulativeResult;
                      let riskLevel = 'Low';
                      let riskColor = 'text-green-600';
                      if (result.standardDeviation > 20) {
                        riskLevel = 'High';
                        riskColor = 'text-red-600';
                      } else if (result.standardDeviation > 10) {
                        riskLevel = 'Moderate';
                        riskColor = 'text-yellow-600';
                      }

                      let sharpeLevel = 'Poor';
                      let sharpeColor = 'text-red-600';
                      if (result.sharpeRatio > 2) {
                        sharpeLevel = 'Very Good';
                        sharpeColor = 'text-green-600';
                      } else if (result.sharpeRatio > 1) {
                        sharpeLevel = 'Good';
                        sharpeColor = 'text-blue-600';
                      }

                      return (
                        <div key={id} className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-3 truncate">{scenario.name}</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Risk Level:</span>
                              <span className={`font-semibold ${riskColor}`}>{riskLevel}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Sharpe Rating:</span>
                              <span className={`font-semibold ${sharpeColor}`}>{sharpeLevel}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Risk/Reward:</span>
                              <span className="font-semibold text-gray-900">
                                {(result.geometricMean / result.standardDeviation).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">💾 Save Scenario</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="scenarioName" className="text-sm font-medium text-gray-700">
                    Scenario Name <span className="text-red-600">*</span>
                  </Label>
                  <input
                    id="scenarioName"
                    type="text"
                    value={scenarioName}
                    onChange={(e) => setScenarioName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Conservative Portfolio"
                    autoFocus
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={saveScenario}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      setShowSaveDialog(false);
                      setScenarioName('');
                      setError('');
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Average Return Calculator"
      />
    </div>
  );
}

