'use client';

import { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calculator, Share2, Download, Printer } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

interface AmortizationEntry {
  period: number;
  interest: number;
  principal: number;
  endingBalance: number;
}

export default function BoatLoanCalculator() {
  // 计算模式
  const [calculationMode, setCalculationMode] = useState<'totalPrice' | 'monthlyPayment'>('totalPrice');
  
  // 基本贷款信息
  const [boatPrice, setBoatPrice] = useState<number>(35000);
  const [monthlyPaymentInput, setMonthlyPaymentInput] = useState<number>(350);
  const [loanTerm, setLoanTerm] = useState<number>(10);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [downPayment, setDownPayment] = useState<number>(7000);
  const [tradeInValue, setTradeInValue] = useState<number>(0);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(7);
  const [fees, setFees] = useState<number>(2000);
  const [includeFeesInLoan, setIncludeFeesInLoan] = useState<boolean>(false);
  
  // 摊销计划显示模式
  const [scheduleMode, setScheduleMode] = useState<'annual' | 'monthly'>('annual');
  
  // 计算结果
  const [result, setResult] = useState<any>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);
  
  // 分享功能 Hook
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/boat-loan-calculator',
    getShareParams: () => {
      if (!result) return {};
      return {
        price: result.boatPrice.toString(),
        term: loanTerm.toString(),
        rate: interestRate.toString(),
        down: downPayment.toString(),
        mode: calculationMode,
      };
    },
    getShareText: () => {
      if (!result) {
        return 'Calculate your boat loan payments with this free calculator!';
      }
      return `My boat loan calculation: ${formatCurrency(result.boatPrice)} boat with ${formatCurrency(result.monthlyPayment)}/month payment over ${loanTerm} years. Total interest: ${formatCurrency(result.totalInterest)}`;
    },
  });

  // 计算月供
  const calculateMonthlyPayment = (principal: number, rate: number, months: number): number => {
    if (rate === 0) return principal / months;
    const monthlyRate = rate / 100 / 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
           (Math.pow(1 + monthlyRate, months) - 1);
  };

  // 反向计算贷款金额（从月供计算）
  const calculateLoanAmountFromPayment = (payment: number, rate: number, months: number): number => {
    if (rate === 0) return payment * months;
    const monthlyRate = rate / 100 / 12;
    return payment * (Math.pow(1 + monthlyRate, months) - 1) / 
           (monthlyRate * Math.pow(1 + monthlyRate, months));
  };

  // 生成摊销计划
  const generateAmortizationSchedule = (
    principal: number,
    rate: number,
    months: number,
    monthlyPayment: number
  ): AmortizationEntry[] => {
    const schedule: AmortizationEntry[] = [];
    let balance = principal;
    const monthlyRate = rate / 100 / 12;

    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      // 确保最后一期余额为0
      if (i === months) {
        balance = 0;
      }

      schedule.push({
        period: i,
        interest: interestPayment,
        principal: principalPayment,
        endingBalance: Math.max(0, balance),
      });
    }

    return schedule;
  };

  // 执行计算
  const handleCalculate = () => {
    const months = loanTerm * 12;
    let actualBoatPrice: number;
    let loanAmount: number;
    let monthlyPayment: number;
    
    if (calculationMode === 'totalPrice') {
      // 模式1: 从船价计算月供
      actualBoatPrice = boatPrice;
      loanAmount = boatPrice - downPayment - tradeInValue + (includeFeesInLoan ? fees : 0);
      monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, months);
    } else {
      // 模式2: 从月供反向计算船价
      monthlyPayment = monthlyPaymentInput;
      loanAmount = calculateLoanAmountFromPayment(monthlyPayment, interestRate, months);
      // 反向计算船价: boatPrice = loanAmount + downPayment + tradeInValue - (includeFeesInLoan ? fees : 0)
      actualBoatPrice = loanAmount + downPayment + tradeInValue - (includeFeesInLoan ? fees : 0);
    }
    
    // 计算销售税
    const salesTaxAmount = actualBoatPrice * (salesTaxRate / 100);
    
    // 计算预付款（首付 + 折价 + 销售税 + 不包含在贷款中的费用）
    const upfrontPayment = downPayment + tradeInValue + salesTaxAmount + (includeFeesInLoan ? 0 : fees);
    
    const totalPayments = monthlyPayment * months;
    const totalInterest = totalPayments - loanAmount;
    
    // 计算总成本
    const totalCost = actualBoatPrice + totalInterest + salesTaxAmount + fees;
    
    // 生成摊销计划
    const fullSchedule = generateAmortizationSchedule(loanAmount, interestRate, months, monthlyPayment);
    
    // 生成年度摊销计划
    const annualSchedule: AmortizationEntry[] = [];
    for (let year = 1; year <= loanTerm; year++) {
      const startMonth = (year - 1) * 12;
      const endMonth = Math.min(year * 12, months);
      const yearEntries = fullSchedule.slice(startMonth, endMonth);
      
      const yearInterest = yearEntries.reduce((sum, entry) => sum + entry.interest, 0);
      const yearPrincipal = yearEntries.reduce((sum, entry) => sum + entry.principal, 0);
      const endingBalance = yearEntries[yearEntries.length - 1]?.endingBalance || 0;
      
      annualSchedule.push({
        period: year,
        interest: yearInterest,
        principal: yearPrincipal,
        endingBalance,
      });
    }
    
    setResult({
      boatPrice: actualBoatPrice,
      salesTaxAmount,
      upfrontPayment,
      loanAmount,
      monthlyPayment,
      totalPayments,
      totalInterest,
      totalCost,
      fullSchedule,
      annualSchedule,
    });
  };

  // 清空表单
  const handleClear = () => {
    setBoatPrice(35000);
    setMonthlyPaymentInput(350);
    setLoanTerm(10);
    setInterestRate(7);
    setDownPayment(7000);
    setTradeInValue(0);
    setSalesTaxRate(7);
    setFees(2000);
    setIncludeFeesInLoan(false);
    setResult(null);
  };

  // 格式化货币
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // 保存为图片
  const handleSaveAsImage = async () => {
    if (resultRef.current) {
      const canvas = await html2canvas(resultRef.current);
      const link = document.createElement('a');
      link.download = 'boat-loan-calculation.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // 打印
  const handlePrint = () => {
    window.print();
  };

  // 计算饼图百分比
  const getPieChartPercentages = () => {
    if (!result) return { principal: 0, interest: 0 };
    const total = result.totalPayments;
    const principalPercent = (result.loanAmount / total) * 100;
    const interestPercent = (result.totalInterest / total) * 100;
    return { principal: principalPercent, interest: interestPercent };
  };

  const pieChart = getPieChartPercentages();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 左侧：计算器输入 */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Calculator className="h-5 w-5" />
                Loan Details
              </CardTitle>
              {/* 模式切换标签 */}
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant={calculationMode === 'totalPrice' ? 'default' : 'outline'}
                  onClick={() => setCalculationMode('totalPrice')}
                  className="text-xs"
                >
                  Total Price
                </Button>
                <Button
                  size="sm"
                  variant={calculationMode === 'monthlyPayment' ? 'default' : 'outline'}
                  onClick={() => setCalculationMode('monthlyPayment')}
                  className="text-xs"
                >
                  Monthly Payment
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* Boat Information */}
              <div className="space-y-3 p-3 bg-white rounded-lg border border-gray-200">
                <h3 className="font-semibold text-sm text-center py-2 rounded bg-blue-50 text-blue-900">Boat Information</h3>
                
                {calculationMode === 'totalPrice' ? (
                  <div className="flex items-center gap-3">
                    <Label className="text-xs font-medium text-gray-700 w-40 flex-shrink-0">Boat Price</Label>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                      <Input
                        type="number"
                        value={boatPrice}
                        onChange={(e) => setBoatPrice(Number(e.target.value))}
                        className="h-9 text-sm pl-7 bg-white border-gray-300"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Label className="text-xs font-medium text-gray-700 w-40 flex-shrink-0">Monthly Payment</Label>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                      <Input
                        type="number"
                        value={monthlyPaymentInput}
                        onChange={(e) => setMonthlyPaymentInput(Number(e.target.value))}
                        className="h-9 text-sm pl-7 bg-white border-gray-300"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Label className="text-xs font-medium text-gray-700 w-40 flex-shrink-0">Loan Term</Label>
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="h-9 text-sm pr-16 bg-white border-gray-300"
                      min="1"
                      max="25"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">years</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Label className="text-xs font-medium text-gray-700 w-40 flex-shrink-0">Interest Rate</Label>
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="h-9 text-sm pr-8 bg-white border-gray-300"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Label className="text-xs font-medium text-gray-700 w-40 flex-shrink-0">Down Payment</Label>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <Input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="h-9 text-sm pl-7 bg-white border-gray-300"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Label className="text-xs font-medium text-gray-700 w-40 flex-shrink-0">Trade-in Value</Label>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <Input
                      type="number"
                      value={tradeInValue}
                      onChange={(e) => setTradeInValue(Number(e.target.value))}
                      className="h-9 text-sm pl-7 bg-white border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Costs */}
              <div className="space-y-3 p-3 bg-white rounded-lg border border-gray-200">
                <h3 className="font-semibold text-sm text-center py-2 rounded bg-gray-100 text-gray-900">Additional Costs</h3>
                
                <div className="flex items-center gap-3">
                  <Label className="text-xs font-medium text-gray-700 w-40 flex-shrink-0">Sales Tax</Label>
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      value={salesTaxRate}
                      onChange={(e) => setSalesTaxRate(Number(e.target.value))}
                      className="h-9 text-sm pr-8 bg-white border-gray-300"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Label className="text-xs font-medium text-gray-700 w-40 flex-shrink-0">Fees</Label>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <Input
                      type="number"
                      value={fees}
                      onChange={(e) => setFees(Number(e.target.value))}
                      className="h-9 text-sm pl-7 bg-white border-gray-300"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="includeFeesInLoan"
                    checked={includeFeesInLoan}
                    onChange={(e) => setIncludeFeesInLoan(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Label htmlFor="includeFeesInLoan" className="text-xs font-medium text-gray-700 cursor-pointer">
                    Include all fees in loan
                  </Label>
                </div>
              </div>

              {/* 按钮 */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleCalculate}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="flex-1"
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 右侧：计算结果 */}
          {result && (
            <div ref={resultRef} className="space-y-6">
              <Card>
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>Boat Price:</span>
                      <span className="text-2xl font-bold">{formatCurrency(result.boatPrice)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleSaveAsImage}
                        className="h-8 bg-white/10 hover:bg-white/20 border-white/30 text-white"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handlePrint}
                        className="h-8 bg-white/10 hover:bg-white/20 border-white/30 text-white"
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleShare}
                        className="h-8 bg-white/10 hover:bg-white/20 border-white/30 text-white"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {/* Summary */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Loan Amount</span>
                      <span className="font-semibold">{formatCurrency(result.loanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sale Tax</span>
                      <span className="font-semibold">{formatCurrency(result.salesTaxAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Upfront Payment</span>
                      <span className="font-semibold">{formatCurrency(result.upfrontPayment)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-600">Total of {loanTerm * 12} Loan Payments</span>
                      <span className="font-semibold">{formatCurrency(result.totalPayments)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Loan Interest</span>
                      <span className="font-semibold">{formatCurrency(result.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold text-gray-900">Total Cost (price, interest, tax, fees)</span>
                      <span className="font-bold text-green-600">{formatCurrency(result.totalCost)}</span>
                    </div>
                  </div>

                  {/* Loan Breakdown Pie Chart */}
                  <div className="pt-4">
                    <h3 className="font-semibold text-sm text-gray-900 mb-3 text-center">Loan Breakdown</h3>
                    <div className="flex items-center justify-center gap-6">
                      {/* SVG Pie Chart */}
                      <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90">
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="30"
                          strokeDasharray={`${pieChart.principal * 3.14} 314`}
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="#86EFAC"
                          strokeWidth="30"
                          strokeDasharray={`${pieChart.interest * 3.14} 314`}
                          strokeDashoffset={`-${pieChart.principal * 3.14}`}
                        />
                        {/* Inner white circle */}
                        <circle cx="60" cy="60" r="35" fill="white" />
                      </svg>
                      
                      {/* Legend */}
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span className="text-gray-700">Principal ({pieChart.principal.toFixed(0)}%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-300 rounded"></div>
                          <span className="text-gray-700">Interest ({pieChart.interest.toFixed(0)}%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Amortization Schedule */}
              <Card>
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-900 text-lg">Amortization Schedule</CardTitle>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant={scheduleMode === 'annual' ? 'default' : 'outline'}
                      onClick={() => setScheduleMode('annual')}
                      className="text-xs"
                    >
                      Annual Schedule
                    </Button>
                    <Button
                      size="sm"
                      variant={scheduleMode === 'monthly' ? 'default' : 'outline'}
                      onClick={() => setScheduleMode('monthly')}
                      className="text-xs"
                    >
                      Monthly Schedule
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-600 text-white">
                          <th className="p-2 text-left">{scheduleMode === 'annual' ? 'Year' : 'Month'}</th>
                          <th className="p-2 text-right">Interest</th>
                          <th className="p-2 text-right">Principal</th>
                          <th className="p-2 text-right">Ending Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(scheduleMode === 'annual' ? result.annualSchedule : result.fullSchedule.slice(0, 12)).map((entry: AmortizationEntry) => (
                          <tr key={entry.period} className="border-b hover:bg-gray-50">
                            <td className="p-2">{entry.period}</td>
                            <td className="p-2 text-right">{formatCurrency(entry.interest)}</td>
                            <td className="p-2 text-right">{formatCurrency(entry.principal)}</td>
                            <td className="p-2 text-right">{formatCurrency(entry.endingBalance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {scheduleMode === 'monthly' && result.fullSchedule.length > 12 && (
                    <p className="text-xs text-gray-500 text-center mt-4">
                      Showing first 12 months of {result.fullSchedule.length} total payments
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Boat Loan Calculator"
      />
    </div>
  );
}
