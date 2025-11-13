'use client';

import { useState, useEffect } from 'react';
import { Share2, Printer, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface CalculationResult {
  futureValue: number;
  totalInterest: number;
  totalPrincipal: number;
  yearlyBreakdown: {
    year: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
  effectiveAnnualRate: number;
  futureValueAfterTax: number;
  buyingPower: number;
}

export function InterestCalculator() {
  // Input states
  const [principal, setPrincipal] = useState('20000');
  const [rate, setRate] = useState('5');
  const [time, setTime] = useState('5');
  const [timeUnit, setTimeUnit] = useState<'years' | 'months'>('years');
  const [compound, setCompound] = useState<'annually' | 'semiannually' | 'quarterly' | 'monthly' | 'daily' | 'continuously'>('annually');
  const [contribution, setContribution] = useState('5000');
  const [contributionFrequency, setContributionFrequency] = useState<'monthly' | 'yearly' | 'none'>('yearly');
  const [contributionTiming, setContributionTiming] = useState<'end' | 'beginning'>('beginning');
  const [taxRate, setTaxRate] = useState('0');
  const [inflationRate, setInflationRate] = useState('3');
  
  // Result state
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/interest-calculator',
    getShareParams: () => ({
      p: principal,
      r: rate,
      t: time,
      tu: timeUnit,
      cf: compound,
      c: contribution,
      fr: contributionFrequency,
      ct: contributionTiming,
      tax: taxRate,
      inf: inflationRate,
    }),
    getShareText: () => 
      result 
        ? `Interest Calculation: Principal $${Number(principal).toLocaleString('en-US')} | Future Value $${result.futureValue.toLocaleString('en-US')} | Total Interest $${result.totalInterest.toLocaleString('en-US')}`
        : 'Check out my interest calculation!',
  });

  // Load from URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('p');
    const r = params.get('r');
    const t = params.get('t');
    const tu = params.get('tu');
    const cf = params.get('cf');
    const contrib = params.get('c');
    const freq = params.get('fr');
    const timing = params.get('ct');
    const tax = params.get('tax');
    const inf = params.get('inf');
    
    if (p) setPrincipal(p);
    if (r) setRate(r);
    if (t) setTime(t);
    if (tu && (tu === 'years' || tu === 'months')) setTimeUnit(tu);
    if (cf && ['annually', 'semiannually', 'quarterly', 'monthly', 'daily', 'continuously'].includes(cf)) {
      setCompound(cf as any);
    }
    if (contrib) setContribution(contrib);
    if (freq && (freq === 'monthly' || freq === 'yearly' || freq === 'none')) {
      setContributionFrequency(freq as any);
    }
    if (timing && (timing === 'end' || timing === 'beginning')) {
      setContributionTiming(timing as any);
    }
    if (tax) setTaxRate(tax);
    if (inf) setInflationRate(inf);
    
    if (p && r && t) {
      setTimeout(() => handleCalculate(), 100);
    }
  }, []);

  const getCompoundingFrequency = (compoundType: string): number => {
    switch (compoundType) {
      case 'annually': return 1;
      case 'semiannually': return 2;
      case 'quarterly': return 4;
      case 'monthly': return 12;
      case 'daily': return 365;
      case 'continuously': return Infinity;
      default: return 1;
    }
  };

  const calculateCompoundInterest = (): CalculationResult => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const timeInYears = timeUnit === 'years' ? parseFloat(time) || 0 : (parseFloat(time) || 0) / 12;
    const n = getCompoundingFrequency(compound);
    const PMT = contributionFrequency === 'none' ? 0 : parseFloat(contribution) || 0;
    const paymentsPerYear = contributionFrequency === 'monthly' ? 12 : contributionFrequency === 'yearly' ? 1 : 0;
    const isBeginning = contributionTiming === 'beginning';

    let futureValue = 0;
    let totalInterest = 0;
    let totalPrincipal = P;

    // Calculate future value using year-by-year simulation for accuracy
    if (PMT > 0 && paymentsPerYear > 0) {
      // Year-by-year simulation with contributions
      let balance = P;
      const years = Math.ceil(timeInYears);
      
      for (let year = 1; year <= years; year++) {
        const t = Math.min(year, timeInYears) - (year - 1);
        const annualContribution = PMT * paymentsPerYear * t;
        
        if (isBeginning) {
          // Add contributions at beginning of year, then compound
          balance += annualContribution;
          balance = balance * Math.pow(1 + r / n, n * t);
        } else {
          // Compound first, then add contributions at end
          balance = balance * Math.pow(1 + r / n, n * t);
          balance += annualContribution;
        }
        
        totalPrincipal += annualContribution;
      }
      
      futureValue = balance;
    } else {
      // No contributions, simple compound interest
      if (compound === 'continuously') {
        futureValue = P * Math.exp(r * timeInYears);
      } else {
        futureValue = P * Math.pow(1 + r / n, n * timeInYears);
      }
    }

    totalInterest = futureValue - totalPrincipal;

    // Calculate yearly breakdown
    const yearlyBreakdown: CalculationResult['yearlyBreakdown'] = [];
    const years = Math.ceil(timeInYears);
    let runningBalance = P;
    let runningPrincipal = P;
    
    for (let year = 1; year <= years; year++) {
      const yearContribution = PMT * paymentsPerYear;
      
      if (isBeginning && PMT > 0 && paymentsPerYear > 0) {
        // Add contribution at beginning
        runningBalance += yearContribution;
        runningPrincipal += yearContribution;
      }
      
      // Compound for the year
      const startBalance = runningBalance;
      runningBalance = runningBalance * Math.pow(1 + r / n, n);
      const yearInterest = runningBalance - startBalance;
      
      if (!isBeginning && PMT > 0 && paymentsPerYear > 0) {
        // Add contribution at end
        runningBalance += yearContribution;
        runningPrincipal += yearContribution;
      }

      yearlyBreakdown.push({
        year,
        principal: runningPrincipal,
        interest: runningBalance - runningPrincipal,
        balance: runningBalance,
      });
    }

    // Calculate Effective Annual Rate (EAR)
    const effectiveAnnualRate = compound === 'continuously'
      ? Math.exp(r) - 1
      : Math.pow(1 + r / n, n) - 1;

    // Apply tax rate to interest earned
    const tax = (parseFloat(taxRate) || 0) / 100;
    const interestAfterTax = totalInterest * (1 - tax);
    const futureValueAfterTax = totalPrincipal + interestAfterTax;

    // Calculate buying power after inflation
    const inflation = (parseFloat(inflationRate) || 0) / 100;
    const buyingPower = futureValueAfterTax / Math.pow(1 + inflation, timeInYears);

    return {
      futureValue,
      totalInterest,
      totalPrincipal,
      yearlyBreakdown,
      effectiveAnnualRate: effectiveAnnualRate * 100,
      futureValueAfterTax,
      buyingPower,
    };
  };

  const handleCalculate = () => {
    const result = calculateCompoundInterest();
    setResult(result);
  };

  const handleSaveAsImage = async () => {
    const element = document.getElementById('interest-result');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = 'compound-interest-calculation.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = () => {
    const element = document.getElementById('interest-result');
    if (!element) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Compound Interest Calculation</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .result-card { margin-bottom: 20px; }
            h2 { color: #1e40af; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f3f4f6; }
            @media print { button { display: none; } }
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-[400px_1fr] gap-6">
        {/* Left Side - Input Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Compound Interest Calculator
          </h2>
          
          <div className="space-y-3">
            {/* Initial Investment */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Initial investment
              </label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="20000"
              />
            </div>

            {/* Annual Contribution */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Annual contribution
              </label>
              <input
                type="number"
                value={contributionFrequency === 'yearly' ? contribution : '0'}
                onChange={(e) => {
                  setContribution(e.target.value);
                  if (parseFloat(e.target.value) > 0) setContributionFrequency('yearly');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="5000"
              />
            </div>

            {/* Monthly Contribution */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Monthly contribution
              </label>
              <input
                type="number"
                value={contributionFrequency === 'monthly' ? contribution : '0'}
                onChange={(e) => {
                  setContribution(e.target.value);
                  if (parseFloat(e.target.value) > 0) setContributionFrequency('monthly');
                  else setContributionFrequency('none');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="0"
              />
            </div>

            {/* Contribution Timing */}
            {contributionFrequency !== 'none' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Contribute at the
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="beginning"
                      checked={contributionTiming === 'beginning'}
                      onChange={(e) => setContributionTiming(e.target.value as any)}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-gray-700">beginning</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="end"
                      checked={contributionTiming === 'end'}
                      onChange={(e) => setContributionTiming(e.target.value as any)}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-gray-700">end</span>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">of each compounding period</p>
              </div>
            )}

            {/* Interest Rate */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Interest rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="5"
                />
                <span className="absolute right-3 top-2 text-sm text-gray-500">%</span>
              </div>
            </div>

            {/* Compound Frequency */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Compound
              </label>
              <select
                value={compound}
                onChange={(e) => setCompound(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="annually">annually</option>
                <option value="semiannually">semiannually</option>
                <option value="quarterly">quarterly</option>
                <option value="monthly">monthly</option>
                <option value="daily">daily</option>
                <option value="continuously">continuously</option>
              </select>
            </div>

            {/* Investment Length */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Investment length
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="5"
                />
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value as 'years' | 'months')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="years">years</option>
                  <option value="months">months</option>
                </select>
              </div>
            </div>

            {/* Tax Rate */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Tax rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="0"
                />
                <span className="absolute right-3 top-2 text-sm text-gray-500">%</span>
              </div>
            </div>

            {/* Inflation Rate */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Inflation rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="3"
                />
                <span className="absolute right-3 top-2 text-sm text-gray-500">%</span>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleCalculate}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded transition-colors text-sm"
            >
              Calculate
            </button>
            <button
              onClick={() => {
                setPrincipal('10000');
                setRate('5');
                setTime('10');
                setTimeUnit('years');
                setCompound('annually');
                setContribution('100');
                setContributionFrequency('monthly');
                setTaxRate('0');
                setInflationRate('0');
                setResult(null);
              }}
              className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded transition-colors text-sm"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Right Side - Results */}
        <div className="lg:col-span-1">
          {result ? (
            <div id="interest-result" className="space-y-4">
              {/* Main Results Card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Results</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-3 border-b-2 border-green-600">
                    <span className="text-gray-700 font-medium">Ending balance</span>
                    <span className="text-2xl font-bold text-green-600">{formatCurrency(result.futureValue)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Total principal</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.totalPrincipal)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Total contributions</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.totalPrincipal - parseFloat(principal))}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Total interest</span>
                    <span className="font-semibold text-green-600">{formatCurrency(result.totalInterest)}</span>
                  </div>
                  
                  {/* Additional Metrics */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-gray-500">Interest of initial investment</span>
                    <span className="text-sm font-medium text-gray-700">{formatCurrency(result.futureValue - result.totalPrincipal)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 pb-3 border-b border-gray-200">
                    <span className="text-xs text-gray-500">Interest of the contributions</span>
                    <span className="text-sm font-medium text-gray-700">{formatCurrency(result.totalInterest - (result.futureValue - result.totalPrincipal))}</span>
                  </div>
                  
                  {/* EAR */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-gray-500">Effective Annual Rate (EAR)</span>
                    <span className="text-sm font-semibold text-blue-600">{result.effectiveAnnualRate.toFixed(3)}%</span>
                  </div>
                  
                  {/* After Tax */}
                  {parseFloat(taxRate) > 0 && (
                    <div className="flex justify-between items-center py-2 border-t border-gray-200">
                      <span className="text-xs text-gray-500">After-tax value ({taxRate}% tax)</span>
                      <span className="text-sm font-semibold text-purple-600">{formatCurrency(result.futureValueAfterTax)}</span>
                    </div>
                  )}
                  
                  {/* Buying Power */}
                  {parseFloat(inflationRate) > 0 && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs text-gray-500">Buying power ({inflationRate}% inflation)</span>
                      <span className="text-sm font-semibold text-orange-600">{formatCurrency(result.buyingPower)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 print:hidden">
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={handleSaveAsImage}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handlePrint}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>

              {/* Pie Chart */}
              <div className="bg-white rounded-xl p-4 mt-4 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">Balance Breakdown</h4>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Initial investment', value: parseFloat(principal) },
                        { name: 'Contributions', value: result.totalPrincipal - parseFloat(principal) },
                        { name: 'Interest', value: result.totalInterest }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                      label={({cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
                        const RADIAN = Math.PI / 180;
                        // Some Recharts versions type these as unknown; cast defensively.
                        const ir = (innerRadius as number) ?? 0;
                        const or = (outerRadius as number) ?? 0;
                        const cxx = (cx as number) ?? 0;
                        const cyy = (cy as number) ?? 0;
                        const angle = (midAngle as number) ?? 0;
                        const radius = ir + (or - ir) * 0.5;
                        const x = cxx + radius * Math.cos(-angle * RADIAN);
                        const y = cyy + radius * Math.sin(-angle * RADIAN);
                        
                        return (
                          <text 
                            x={x} 
                            y={y} 
                            fill="white" 
                            textAnchor="middle" 
                            dominantBaseline="central"
                            fontSize="14"
                            fontWeight="bold"
                          >
                            {`${(Number(percent ?? 0) * 100).toFixed(0)}%`}
                          </text>
                        );
                      }}
                      labelLine={false}
                    >
                      <Cell fill="#3B82F6" />
                      <Cell fill="#10B981" />
                      <Cell fill="#EF4444" />
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px 12px'
                      }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      iconType="circle"
                      formatter={(value: string) => (
                        <span className="text-xs text-gray-700">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
              <p className="text-gray-600 text-sm">
                Modify the values and click the Calculate button to use
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Charts and Analysis - Full Width Below */}
      {result && (
        <>
          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Growth Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={result.yearlyBreakdown.slice(0, 5).map(row => ({
                  year: row.year,
                  'Initial investment': parseFloat(principal),
                  'Contributions': row.principal - parseFloat(principal),
                  'Interest': row.interest
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="Initial investment" stackId="a" fill="#3B82F6" />
                  <Bar dataKey="Contributions" stackId="a" fill="#10B981" />
                  <Bar dataKey="Interest" stackId="a" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Intelligent Analysis */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg border border-blue-200 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Smart Analysis</h3>
              <div className="space-y-3 text-sm">
                {/* Interest Efficiency */}
                <div className="bg-white rounded-lg p-3">
                  <div className="font-semibold text-gray-900 mb-1">Interest Efficiency</div>
                  <p className="text-gray-700">
                    Your money will grow <span className="font-bold text-blue-600">{((result.futureValue / parseFloat(principal)) * 100).toFixed(0)}%</span> over {time} {timeUnit}. 
                    Interest accounts for <span className="font-bold text-green-600">{((result.totalInterest / result.futureValue) * 100).toFixed(0)}%</span> of your final balance.
                  </p>
                </div>

                {/* Contribution Impact */}
                {result.totalPrincipal > parseFloat(principal) && (
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-gray-900 mb-1">Contribution Power</div>
                    <p className="text-gray-700">
                      Your regular contributions of <span className="font-bold text-blue-600">{formatCurrency(parseFloat(contribution))}</span> {contributionFrequency === 'monthly' ? 'per month' : 'per year'} add up to <span className="font-bold text-green-600">{formatCurrency(result.totalPrincipal - parseFloat(principal))}</span> over time.
                    </p>
                  </div>
                )}

                {/* Tax Impact */}
                {parseFloat(taxRate) > 0 && (
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-gray-900 mb-1">⚠️ Tax Impact</div>
                    <p className="text-gray-700">
                      After {taxRate}% tax on interest, you'll lose <span className="font-bold text-red-600">{formatCurrency(result.futureValue - result.futureValueAfterTax)}</span> to taxes. 
                      Consider tax-advantaged accounts like IRA or 401(k).
                    </p>
                  </div>
                )}

                {/* Inflation Impact */}
                {parseFloat(inflationRate) > 0 && (
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-gray-900 mb-1">💰 Real Buying Power</div>
                    <p className="text-gray-700">
                      With {inflationRate}% inflation, your {formatCurrency(result.futureValueAfterTax || result.futureValue)} will have the buying power of <span className="font-bold text-orange-600">{formatCurrency(result.buyingPower)}</span> in today's dollars.
                    </p>
                  </div>
                )}

                {/* Recommendation */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-3 text-white">
                  <div className="font-semibold mb-1">💡 Smart Recommendation</div>
                  <p className="text-sm">
                    {result.totalInterest > result.totalPrincipal 
                      ? `Great job! Your investment strategy is working well. Interest earned exceeds your contributions.`
                      : `Consider increasing your contribution amount or finding a higher interest rate to maximize growth.`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Yearly Breakdown Table */}
          <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Accumulation Schedule</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Year</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Deposit</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Interest</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Ending balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="border-b border-gray-100">
                      <td className="px-3 py-2 text-gray-900">{row.year}</td>
                      <td className="px-3 py-2 text-right text-gray-900">{formatCurrency(row.principal)}</td>
                      <td className="px-3 py-2 text-right text-gray-900">{formatCurrency(row.interest)}</td>
                      <td className="px-3 py-2 text-right text-gray-900 font-semibold">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Interest Calculator"
      />
    </div>
  );
}

