'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Share2, Printer, Download, AlertCircle, Info } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface YearlyRMD {
  year: number;
  age: number;
  distributionPeriod: number;
  rmd: number;
  endBalance: number;
}

interface RMDResult {
  currentRMD: number;
  distributionPeriod: number;
  yearlyProjections: YearlyRMD[];
  totalRMD: number;
  penaltyRisk: number;
}

export default function RMDCalculator() {
  const [birthYear, setBirthYear] = useState('1950');
  const [rmdYear, setRmdYear] = useState('2025');
  const [accountBalance, setAccountBalance] = useState('200000');
  const [hasSpouse, setHasSpouse] = useState(true);
  const [spouseBirthYear, setSpouseBirthYear] = useState('1952');
  const [returnRate, setReturnRate] = useState('5');
  const [accountType, setAccountType] = useState<'IRA' | '401k' | '403b'>('IRA');
  
  const [result, setResult] = useState<RMDResult | null>(null);
  const [error, setError] = useState('');
  
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/rmd-calculator',
    getShareParams: () => ({ birthYear, rmdYear, balance: accountBalance }),
    getShareText: () => result ? `My RMD for ${rmdYear}: $${result.currentRMD.toLocaleString()}` : 'Calculate your Required Minimum Distribution!',
  });

  // IRS Uniform Lifetime Table (2024+)
  const uniformLifetimeTable: Record<number, number> = {
    72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.1,
    80: 20.2, 81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2, 87: 14.4,
    88: 13.7, 89: 12.9, 90: 12.2, 91: 11.5, 92: 10.8, 93: 10.1, 94: 9.5, 95: 8.9,
    96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4, 101: 6.0, 102: 5.6, 103: 5.2,
    104: 4.9, 105: 4.6, 106: 4.3, 107: 4.1, 108: 3.9, 109: 3.7, 110: 3.5, 111: 3.4,
    112: 3.3, 113: 3.1, 114: 3.0, 115: 2.9, 116: 2.8, 117: 2.7, 118: 2.5, 119: 2.3,
    120: 2.0
  };

  // Joint Life and Last Survivor Expectancy Table (for spouse > 10 years younger)
  const getJointLifeExpectancy = (ownerAge: number, spouseAge: number): number => {
    const ageDiff = ownerAge - spouseAge;
    if (ageDiff <= 10) return uniformLifetimeTable[ownerAge] || 2.0;
    
    // Simplified approximation for spouse more than 10 years younger
    const baseExpectancy = uniformLifetimeTable[ownerAge] || 2.0;
    return baseExpectancy + (ageDiff - 10) * 0.5;
  };

  const calculateRMD = () => {
    setError('');
    
    try {
      const birth = parseInt(birthYear);
      const rmdYearInt = parseInt(rmdYear);
      const balance = parseFloat(accountBalance);
      const rate = parseFloat(returnRate) / 100;
      
      if (isNaN(birth) || birth < 1900 || birth > 2010) {
        setError('Please enter a valid birth year (1900-2010)');
        return;
      }
      
      if (isNaN(rmdYearInt) || rmdYearInt < 2024 || rmdYearInt > 2050) {
        setError('Please enter a valid RMD year (2024-2050)');
        return;
      }
      
      if (isNaN(balance) || balance <= 0) {
        setError('Please enter a valid account balance');
        return;
      }
      
      if (isNaN(rate) || rate < -10 || rate > 20) {
        setError('Return rate must be between -10% and 20%');
        return;
      }
      
      const currentAge = rmdYearInt - birth;
      
      if (currentAge < 72) {
        setError('RMD is required starting at age 73 (born after 1950) or age 72 (born before 1951). You are too young for RMD.');
        return;
      }
      
      if (currentAge > 120) {
        setError('Invalid age');
        return;
      }
      
      // Calculate distribution period
      let distributionPeriod: number;
      
      if (hasSpouse && spouseBirthYear) {
        const spouseBirth = parseInt(spouseBirthYear);
        if (!isNaN(spouseBirth)) {
          const spouseAge = rmdYearInt - spouseBirth;
          distributionPeriod = getJointLifeExpectancy(currentAge, spouseAge);
        } else {
          distributionPeriod = uniformLifetimeTable[currentAge] || 2.0;
        }
      } else {
        distributionPeriod = uniformLifetimeTable[currentAge] || 2.0;
      }
      
      // Calculate current year RMD
      const currentRMD = balance / distributionPeriod;
      
      // Project future RMDs
      const yearlyProjections: YearlyRMD[] = [];
      let currentBalance = balance;
      let totalRMD = 0;
      
      for (let i = 0; i < 20 && (currentAge + i) <= 120; i++) {
        const yearAge = currentAge + i;
        const year = rmdYearInt + i;
        
        let period: number;
        if (hasSpouse && spouseBirthYear) {
          const spouseBirth = parseInt(spouseBirthYear);
          const spouseAge = year - spouseBirth;
          period = getJointLifeExpectancy(yearAge, spouseAge);
        } else {
          period = uniformLifetimeTable[yearAge] || 2.0;
        }
        
        const yearRMD = currentBalance / period;
        totalRMD += yearRMD;
        
        // Update balance: subtract RMD, add investment return
        const balanceAfterRMD = currentBalance - yearRMD;
        const endBalance = balanceAfterRMD * (1 + rate);
        
        yearlyProjections.push({
          year,
          age: yearAge,
          distributionPeriod: period,
          rmd: yearRMD,
          endBalance,
        });
        
        currentBalance = endBalance;
        
        if (currentBalance <= 0) break;
      }
      
      // Calculate 50% penalty if RMD not taken
      const penaltyRisk = currentRMD * 0.5;
      
      setResult({
        currentRMD,
        distributionPeriod,
        yearlyProjections,
        totalRMD,
        penaltyRisk,
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
      link.download = `rmd-${rmdYear}.png`;
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
            <head><title>RMD Calculation</title>
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 27 }, (_, i) => currentYear + i);

  // Chart data
  const chartData = result ? {
    labels: result.yearlyProjections.map(p => p.age),
    datasets: [
      {
        label: 'Account Balance',
        data: result.yearlyProjections.map(p => p.endBalance),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
      {
        label: 'RMD Amount',
        data: result.yearlyProjections.map(p => p.rmd),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: $${context.parsed.y.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
          },
        },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Your Age' } },
      y: {
        title: { display: true, text: 'Amount ($)' },
        ticks: {
          callback: (value: any) => '$' + value.toLocaleString(),
        },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1">
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">RMD Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="birthYear" className="text-sm font-medium text-gray-700">
                  Your year of birth <span className="text-red-600">*</span>
                </Label>
                <input
                  id="birthYear"
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1950"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rmdYear" className="text-sm font-medium text-gray-700">
                  Year of RMD <span className="text-red-600">*</span>
                </Label>
                <select
                  id="rmdYear"
                  value={rmdYear}
                  onChange={(e) => setRmdYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="balance" className="text-sm font-medium text-gray-700">
                  Account balance as of 12/31/{parseInt(rmdYear) - 1} <span className="text-red-600">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    id="balance"
                    type="text"
                    value={accountBalance}
                    onChange={(e) => setAccountBalance(e.target.value.replace(/[^0-9.]/g, ''))}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="200,000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Account type
                </Label>
                <select
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="IRA">Traditional IRA</option>
                  <option value="401k">401(k)</option>
                  <option value="403b">403(b)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Is your spouse the primary beneficiary?
                </Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={hasSpouse}
                      onChange={() => setHasSpouse(true)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!hasSpouse}
                      onChange={() => setHasSpouse(false)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {hasSpouse && (
                <div className="space-y-2">
                  <Label htmlFor="spouseBirth" className="text-sm font-medium text-gray-700">
                    Your spouse's date of birth
                  </Label>
                  <input
                    id="spouseBirth"
                    type="number"
                    value={spouseBirthYear}
                    onChange={(e) => setSpouseBirthYear(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1952"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="return" className="text-sm font-medium text-gray-700">
                  Estimated rate of return (Optional)
                </Label>
                <div className="relative">
                  <input
                    id="return"
                    type="number"
                    value={returnRate}
                    onChange={(e) => setReturnRate(e.target.value)}
                    className="w-full px-3 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-2 text-gray-500">%</span>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={calculateRMD}
                  className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
                <Button
                  onClick={() => {
                    setBirthYear('1950');
                    setRmdYear(currentYear.toString());
                    setAccountBalance('200000');
                    setHasSpouse(true);
                    setSpouseBirthYear('1952');
                    setReturnRate('5');
                    setResult(null);
                    setError('');
                  }}
                  variant="outline"
                  className="px-4"
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          {result ? (
            <div className="space-y-6">
              {/* Current RMD Result */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
                  <CardTitle className="text-2xl text-gray-900">Result</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-white border-2 border-green-500 rounded-lg p-6 mb-4">
                    <p className="text-lg text-gray-700 mb-2">
                      Your RMD for {rmdYear} is
                    </p>
                    <p className="text-5xl font-bold text-green-600">
                      ${result.currentRMD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Distribution Period</p>
                      <p className="text-3xl font-bold text-blue-900">
                        {result.distributionPeriod.toFixed(1)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">years</p>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">50% Penalty Risk</p>
                      <p className="text-3xl font-bold text-red-900">
                        ${result.penaltyRisk.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">if not withdrawn</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Calculation Formula:</p>
                    <p className="font-mono text-lg text-gray-900">
                      RMD = ${parseFloat(accountBalance).toLocaleString()} / {result.distributionPeriod.toFixed(1)} = ${result.currentRMD.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Chart */}
              {chartData && (
                <Card className="border-gray-200">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-base text-gray-900">📊 RMD Projection</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-80">
                      <Line key={`rmd-chart-${rmdYear}`} data={chartData} options={chartOptions} />
                    </div>
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      Future projections assume {returnRate}% annual return and withdrawal of RMD each year.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Yearly Table */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">📅 Year-by-Year Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 border-b-2 border-gray-300">
                        <tr>
                          <th className="px-4 py-3 text-left text-gray-700">Year</th>
                          <th className="px-4 py-3 text-left text-gray-700">Your Age</th>
                          <th className="px-4 py-3 text-right text-gray-700">Distribution Period</th>
                          <th className="px-4 py-3 text-right text-gray-700">RMD</th>
                          <th className="px-4 py-3 text-right text-gray-700">End of Year Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.yearlyProjections.map((proj, idx) => (
                          <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900">{proj.year}</td>
                            <td className="px-4 py-3 text-gray-900">{proj.age}</td>
                            <td className="px-4 py-3 text-right text-gray-900">{proj.distributionPeriod.toFixed(1)}</td>
                            <td className="px-4 py-3 text-right text-gray-900 font-medium">
                              ${proj.rmd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-4 py-3 text-right text-gray-900 font-medium">
                              ${proj.endBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Tax Strategies */}
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-base text-gray-900">💡 Tax Strategies</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">🔄 Roth Conversion</h4>
                      <p className="text-gray-700 text-xs">Convert traditional IRA to Roth IRA before age 73 to reduce future RMDs</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">❤️ Qualified Charitable Distribution</h4>
                      <p className="text-gray-700 text-xs">Donate up to $105,000 directly to charity, counts toward RMD, tax-free</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">📆 Timing Strategy</h4>
                      <p className="text-gray-700 text-xs">Take RMDs early in the year to allow more time for tax planning</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">⚠️ Avoid Penalty</h4>
                      <p className="text-gray-700 text-xs">50% excise tax on amounts not withdrawn. Deadline: December 31</p>
                    </div>
                  </div>
                </CardContent>
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
                <p className="text-lg font-medium mb-2">Calculate Your Required Minimum Distribution</p>
                <p className="text-sm">
                  Once you reach age 73 (or 72 if born before 1951), the IRS requires you to withdraw a minimum amount from your retirement accounts each year.
                </p>
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <p className="text-sm text-blue-900 font-semibold mb-2">💡 Important Notes:</p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• RMD calculations use IRS Publication 590-B tables</li>
                    <li>• Failure to take RMD results in 50% penalty tax</li>
                    <li>• RMD deadline: December 31 each year</li>
                    <li>• First RMD can be delayed until April 1 of following year</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="RMD Calculator"
      />
    </div>
  );
}

