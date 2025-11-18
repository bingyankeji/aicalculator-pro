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
  year: number;
  date: string;
  interest: number;
  principal: number;
  endingBalance: number;
}

export default function MortgageCalculatorUK() {
  const [homePrice, setHomePrice] = useState(500000);
  const [depositPercent, setDepositPercent] = useState(25);
  const [loanTerm, setLoanTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(5);
  
  const [includeOptionals, setIncludeOptionals] = useState(true);
  const [taxesPercent, setTaxesPercent] = useState(1.2);
  const [homeInsurance, setHomeInsurance] = useState(2500);
  const [mortgageInsurance, setMortgageInsurance] = useState(0);
  const [otherCosts, setOtherCosts] = useState(6000);
  const [startMonth, setStartMonth] = useState('Nov');
  const [startYear, setStartYear] = useState(2025);
  
  const [result, setResult] = useState<any>(null);
  const [scheduleMode, setScheduleMode] = useState<'annual' | 'monthly'>('annual');
  const resultRef = useRef<HTMLDivElement>(null);
  
  // 分享功能
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/mortgage-calculator-uk',
    getShareParams: () => {
      if (!result) return {};
      return {
        price: homePrice.toString(),
        deposit: depositPercent.toString(),
        term: loanTerm.toString(),
        rate: interestRate.toString(),
      };
    },
    getShareText: () => {
      if (!result) return 'Calculate UK mortgage with this free calculator!';
      return `UK Mortgage: £${homePrice.toLocaleString()} home, £${result.monthlyRepayment.toFixed(2)}/month payment, £${result.totalInterest.toFixed(0)} total interest over ${loanTerm} years`;
    },
  });

  // 计算月供（本息）
  const calculateMonthlyPayment = (principal: number, rate: number, months: number): number => {
    if (rate === 0) return principal / months;
    const monthlyRate = rate / 100 / 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
           (Math.pow(1 + monthlyRate, months) - 1);
  };

  // 生成摊销计划
  const generateAmortizationSchedule = (
    principal: number,
    rate: number,
    months: number,
    monthlyPayment: number,
    startMonth: string,
    startYear: number
  ): AmortizationEntry[] => {
    const schedule: AmortizationEntry[] = [];
    let balance = principal;
    const monthlyRate = rate / 100 / 12;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const startMonthIndex = monthNames.indexOf(startMonth);

    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      if (i === months) balance = 0;

      const currentMonthIndex = (startMonthIndex + i - 1) % 12;
      const currentYear = startYear + Math.floor((startMonthIndex + i - 1) / 12);
      const monthName = monthNames[currentMonthIndex];
      
      schedule.push({
        year: Math.ceil(i / 12),
        date: `${monthName.slice(0, 2)}/${currentYear.toString().slice(-2)}`,
        interest: interestPayment,
        principal: principalPayment,
        endingBalance: Math.max(0, balance),
      });
    }

    return schedule;
  };

  // 计算
  const handleCalculate = () => {
    const deposit = homePrice * (depositPercent / 100);
    const loanAmount = homePrice - deposit;
    const months = loanTerm * 12;
    
    // 本息还款
    const monthlyRepayment = calculateMonthlyPayment(loanAmount, interestRate, months);
    const totalRepayment = monthlyRepayment * months;
    const totalInterest = totalRepayment - loanAmount;
    
    // 只还利息
    const interestOnly = (loanAmount * (interestRate / 100)) / 12;
    
    // 可选成本（月度）
    const monthlyTaxes = includeOptionals ? (homePrice * (taxesPercent / 100)) / 12 : 0;
    const monthlyHomeInsurance = includeOptionals ? homeInsurance / 12 : 0;
    const monthlyMortgageInsurance = includeOptionals ? mortgageInsurance / 12 : 0;
    const monthlyOtherCosts = includeOptionals ? otherCosts / 12 : 0;
    
    // 总月度支出
    const totalMonthly = monthlyRepayment + monthlyTaxes + monthlyHomeInsurance + 
                         monthlyMortgageInsurance + monthlyOtherCosts;
    
    // 总成本
    const totalTaxes = monthlyTaxes * months;
    const totalHomeInsurance = monthlyHomeInsurance * months;
    const totalMortgageInsurance = monthlyMortgageInsurance * months;
    const totalOtherCosts = monthlyOtherCosts * months;
    const totalOutOfPocket = totalRepayment + totalTaxes + totalHomeInsurance + 
                             totalMortgageInsurance + totalOtherCosts;
    
    // 生成摊销计划
    const fullSchedule = generateAmortizationSchedule(loanAmount, interestRate, months, monthlyRepayment, startMonth, startYear);
    
    // 年度摊销计划
    const annualSchedule: AmortizationEntry[] = [];
    for (let year = 1; year <= loanTerm; year++) {
      const startMonth = (year - 1) * 12;
      const endMonth = Math.min(year * 12, months);
      const yearEntries = fullSchedule.slice(startMonth, endMonth);
      
      const yearInterest = yearEntries.reduce((sum, entry) => sum + entry.interest, 0);
      const yearPrincipal = yearEntries.reduce((sum, entry) => sum + entry.principal, 0);
      const endingBalance = yearEntries[yearEntries.length - 1]?.endingBalance || 0;
      const lastEntry = yearEntries[yearEntries.length - 1];
      
      annualSchedule.push({
        year,
        date: lastEntry.date,
        interest: yearInterest,
        principal: yearPrincipal,
        endingBalance,
      });
    }
    
    setResult({
      interestOnly,
      monthlyRepayment,
      loanAmount,
      deposit,
      totalInterest,
      monthlyTaxes,
      monthlyHomeInsurance,
      monthlyMortgageInsurance,
      monthlyOtherCosts,
      totalMonthly,
      totalTaxes,
      totalHomeInsurance,
      totalMortgageInsurance,
      totalOtherCosts,
      totalOutOfPocket,
      fullSchedule,
      annualSchedule,
    });
  };

  // 清空
  const handleClear = () => {
    setHomePrice(500000);
    setDepositPercent(25);
    setLoanTerm(25);
    setInterestRate(5);
    setIncludeOptionals(true);
    setTaxesPercent(1.2);
    setHomeInsurance(2500);
    setMortgageInsurance(0);
    setOtherCosts(6000);
    setStartMonth('Nov');
    setStartYear(2025);
    setResult(null);
  };

  // 格式化货币（英镑）
  const formatGBP = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // 保存为图片
  const handleSaveAsImage = async () => {
    if (resultRef.current) {
      const canvas = await html2canvas(resultRef.current);
      const link = document.createElement('a');
      link.download = 'uk-mortgage-calculation.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // 打印
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* 标题 */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Mortgage Calculator UK</h1>
          <p className="text-sm text-gray-600 mt-2">
            The UK Mortgage Calculator is mainly intended for United Kingdom residents using the British Pound currency.
          </p>
        </div>

        <div className="bg-blue-600 text-white p-3 rounded-t flex items-center gap-2 mb-0">
          <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-sm">✓</span>
          </div>
          <span className="text-sm">Modify the values and click the Calculate button to use</span>
        </div>

        <div className="grid lg:grid-cols-[380px,1fr] gap-0 border border-gray-300">
          {/* 左侧：输入 */}
          <div className="bg-gray-100 p-6 space-y-4">
            {/* 基本输入 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Home Price £:</Label>
                <Input
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-40 h-9 bg-white border-gray-300"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Mortgage Deposit</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={depositPercent}
                    onChange={(e) => setDepositPercent(Number(e.target.value))}
                    className="w-24 h-9 bg-white border-gray-300"
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Loan Term</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-24 h-9 bg-white border-gray-300"
                  />
                  <span className="text-sm">years</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Interest Rate</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    step="0.1"
                    className="w-24 h-9 bg-white border-gray-300"
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>
            </div>

            {/* 可选项 */}
            <div className="pt-4 border-t border-gray-300">
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  id="includeOptionals"
                  checked={includeOptionals}
                  onChange={(e) => setIncludeOptionals(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="includeOptionals" className="text-sm font-semibold cursor-pointer">
                  Include Optionals Below
                </Label>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Taxes</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={taxesPercent}
                      onChange={(e) => setTaxesPercent(Number(e.target.value))}
                      disabled={!includeOptionals}
                      className="w-24 h-9 bg-white border-gray-300"
                      step="0.1"
                    />
                    <span className="text-sm">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">Home Insurance £:</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={homeInsurance}
                      onChange={(e) => setHomeInsurance(Number(e.target.value))}
                      disabled={!includeOptionals}
                      className="w-24 h-9 bg-white border-gray-300"
                    />
                    <span className="text-xs text-gray-600">/year</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">Mortgage Insurance £:</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={mortgageInsurance}
                      onChange={(e) => setMortgageInsurance(Number(e.target.value))}
                      disabled={!includeOptionals}
                      className="w-24 h-9 bg-white border-gray-300"
                    />
                    <span className="text-xs text-gray-600">/year</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">Other Costs £:</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={otherCosts}
                      onChange={(e) => setOtherCosts(Number(e.target.value))}
                      disabled={!includeOptionals}
                      className="w-24 h-9 bg-white border-gray-300"
                    />
                    <span className="text-xs text-gray-600">/year</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">Start Date</Label>
                  <div className="flex items-center gap-2">
                    <select
                      value={startMonth}
                      onChange={(e) => setStartMonth(e.target.value)}
                      className="h-9 px-2 bg-white border border-gray-300 rounded"
                    >
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <Input
                      type="number"
                      value={startYear}
                      onChange={(e) => setStartYear(Number(e.target.value))}
                      className="w-24 h-9 bg-white border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 按钮 */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleCalculate}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white h-11"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="px-8 h-11"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* 右侧：结果 */}
          {result && (
            <div ref={resultRef} className="p-6 space-y-6">
              {/* Interest Only & Monthly Repayment */}
              <div className="space-y-3">
                <div className="bg-green-600 text-white p-3 rounded flex items-center justify-between">
                  <span className="text-sm font-semibold">Interest Only:</span>
                  <span className="text-2xl font-bold">{formatGBP(result.interestOnly)}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSaveAsImage}
                    className="h-8 bg-white/20 hover:bg-white/30 border-white/30 text-white"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="bg-green-600 text-white p-3 rounded flex items-center justify-between">
                  <span className="text-sm font-semibold">Monthly Repayment:</span>
                  <span className="text-2xl font-bold">{formatGBP(result.monthlyRepayment)}</span>
                </div>
              </div>

              {/* 详细表格 */}
              <div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-left p-2"></th>
                      <th className="text-right p-2 font-semibold">Monthly</th>
                      <th className="text-right p-2 font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-100">
                      <td className="p-2 font-medium">Mortgage Payment</td>
                      <td className="p-2 text-right">{formatGBP(result.monthlyRepayment)}</td>
                      <td className="p-2 text-right">{formatGBP(result.monthlyRepayment * loanTerm * 12)}</td>
                    </tr>
                    {includeOptionals && (
                      <>
                        <tr>
                          <td className="p-2">Taxes</td>
                          <td className="p-2 text-right">{formatGBP(result.monthlyTaxes)}</td>
                          <td className="p-2 text-right">{formatGBP(result.totalTaxes)}</td>
                        </tr>
                        <tr className="bg-gray-100">
                          <td className="p-2">Home Insurance</td>
                          <td className="p-2 text-right">{formatGBP(result.monthlyHomeInsurance)}</td>
                          <td className="p-2 text-right">{formatGBP(result.totalHomeInsurance)}</td>
                        </tr>
                        <tr>
                          <td className="p-2">Other Costs</td>
                          <td className="p-2 text-right">{formatGBP(result.monthlyOtherCosts)}</td>
                          <td className="p-2 text-right">{formatGBP(result.totalOtherCosts)}</td>
                        </tr>
                      </>
                    )}
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-2">Total Out-of-Pocket</td>
                      <td className="p-2 text-right">{formatGBP(result.totalMonthly)}</td>
                      <td className="p-2 text-right">{formatGBP(result.totalOutOfPocket)}</td>
                    </tr>
                    <tr className="border-t-2">
                      <td className="p-2">Loan Amount</td>
                      <td className="p-2 text-right"></td>
                      <td className="p-2 text-right font-medium">{formatGBP(result.loanAmount)}</td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="p-2">Mortgage Deposit</td>
                      <td className="p-2 text-right"></td>
                      <td className="p-2 text-right font-medium">{formatGBP(result.deposit)}</td>
                    </tr>
                    <tr>
                      <td className="p-2">Total Interest</td>
                      <td className="p-2 text-right"></td>
                      <td className="p-2 text-right font-medium">{formatGBP(result.totalInterest)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 饼图 */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    {(() => {
                      const data = [
                        { name: 'Mortgage Repayment', value: result.monthlyRepayment * loanTerm * 12, color: '#5B9BD5' },
                        { name: 'Taxes', value: result.totalTaxes, color: '#92D050' },
                        { name: 'Other Cost', value: result.totalOtherCosts, color: '#FFC000' },
                        { name: 'Home Insurance', value: result.totalHomeInsurance, color: '#00B0F0' },
                      ].filter(d => d.value > 0);
                      
                      const total = data.reduce((sum, d) => sum + d.value, 0);
                      let currentAngle = -90;
                      
                      return data.map((item, i) => {
                        const percent = (item.value / total) * 100;
                        const angle = (percent / 100) * 360;
                        const startAngle = currentAngle;
                        const endAngle = currentAngle + angle;
                        
                        const startRad = (startAngle * Math.PI) / 180;
                        const endRad = (endAngle * Math.PI) / 180;
                        
                        const x1 = 100 + 80 * Math.cos(startRad);
                        const y1 = 100 + 80 * Math.sin(startRad);
                        const x2 = 100 + 80 * Math.cos(endRad);
                        const y2 = 100 + 80 * Math.sin(endRad);
                        
                        const largeArc = angle > 180 ? 1 : 0;
                        const path = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;
                        
                        currentAngle = endAngle;
                        
                        return (
                          <g key={i}>
                            <path d={path} fill={item.color} />
                            {percent > 5 && (
                              <text
                                x={100 + 55 * Math.cos((startRad + endRad) / 2)}
                                y={100 + 55 * Math.sin((startRad + endRad) / 2)}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="white"
                                fontSize="14"
                                fontWeight="bold"
                              >
                                {percent.toFixed(0)}%
                              </text>
                            )}
                          </g>
                        );
                      });
                    })()}
                    <circle cx="100" cy="100" r="50" fill="white" />
                  </svg>
                </div>
                
                {/* 图例 */}
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-[#5B9BD5]"></div>
                    <span>Mortgage Repayment</span>
                  </div>
                  {result.totalTaxes > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-[#92D050]"></div>
                      <span>Taxes</span>
                    </div>
                  )}
                  {result.totalOtherCosts > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-[#FFC000]"></div>
                      <span>Other Cost</span>
                    </div>
                  )}
                  {result.totalHomeInsurance > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-[#00B0F0]"></div>
                      <span>Home Insurance</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Amortization Schedule */}
        {result && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Amortization schedule</h2>
            <div className="bg-white border border-gray-300 rounded p-6">
              <div className="flex gap-4 mb-4">
                <Button
                  variant={scheduleMode === 'annual' ? 'default' : 'outline'}
                  onClick={() => setScheduleMode('annual')}
                  className="text-sm"
                >
                  Annual Schedule
                </Button>
                <Button
                  variant={scheduleMode === 'monthly' ? 'default' : 'outline'}
                  onClick={() => setScheduleMode('monthly')}
                  className="text-sm"
                >
                  Monthly Schedule
                </Button>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-2 text-left">Year</th>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-right">Interest</th>
                    <th className="p-2 text-right">Principal</th>
                    <th className="p-2 text-right">Ending Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {(scheduleMode === 'annual' ? result.annualSchedule : result.fullSchedule.slice(0, 24)).map((entry: AmortizationEntry, i: number) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="p-2">{entry.year}</td>
                      <td className="p-2">{entry.date}</td>
                      <td className="p-2 text-right">{formatGBP(entry.interest)}</td>
                      <td className="p-2 text-right">{formatGBP(entry.principal)}</td>
                      <td className="p-2 text-right">{formatGBP(entry.endingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {scheduleMode === 'monthly' && result.fullSchedule.length > 24 && (
                <p className="text-xs text-gray-500 text-center mt-4">
                  Showing first 24 months of {result.fullSchedule.length} total payments
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Mortgage Calculator UK"
      />
    </div>
  );
}

