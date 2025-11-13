'use client';

import { useState, useMemo, useRef, useEffect } from "react";
import { DollarSign, RotateCcw, Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface SalaryResult {
  unadjusted: {
    hourly: number;
    daily: number;
    weekly: number;
    biweekly: number;
    semiMonthly: number;
    monthly: number;
    quarterly: number;
    annual: number;
  };
  adjusted: {
    hourly: number;
    daily: number;
    weekly: number;
    biweekly: number;
    semiMonthly: number;
    monthly: number;
    quarterly: number;
    annual: number;
  };
  workingDays: {
    totalDays: number;
    workingDays: number;
    holidaysAndVacation: number;
  };
}

export function SalaryCalculator() {
  const resultRef = useRef<HTMLDivElement>(null);
  const [salaryAmount, setSalaryAmount] = useState('50');
  const [payFrequency, setPayFrequency] = useState<'hour' | 'day' | 'week' | 'biweek' | 'month' | 'year'>('hour');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [daysPerWeek, setDaysPerWeek] = useState('5');
  const [holidaysPerYear, setHolidaysPerYear] = useState('10');
  const [vacationDaysPerYear, setVacationDaysPerYear] = useState('15');

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/salary-calculator',
    getShareParams: () => ({
      sa: salaryAmount,
      pf: payFrequency,
      hpw: hoursPerWeek,
      dpw: daysPerWeek,
      hpy: holidaysPerYear,
      vpy: vacationDaysPerYear,
    }),
    getShareText: () => {
      const result = calculateSalary();
      return result 
        ? `Salary Conversion: $${result.adjusted.hourly}/hr | $${result.adjusted.annual.toLocaleString('en-US')}/year`
        : 'Check out my salary calculation!';
    },
  });

  const clearAll = () => {
    setSalaryAmount('50');
    setPayFrequency('hour');
    setHoursPerWeek('40');
    setDaysPerWeek('5');
    setHolidaysPerYear('10');
    setVacationDaysPerYear('15');
  };

  // Load from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sa = params.get('sa');
    const pf = params.get('pf');
    const hw = params.get('hw');
    const dw = params.get('dw');
    const hp = params.get('hp');
    const vd = params.get('vd');

    if (sa) setSalaryAmount(sa);
    if (pf) setPayFrequency(pf as any);
    if (hw) setHoursPerWeek(hw);
    if (dw) setDaysPerWeek(dw);
    if (hp) setHolidaysPerYear(hp);
    if (vd) setVacationDaysPerYear(vd);
  }, []);

  const calculateSalary = (): SalaryResult | null => {
    try {
      const amount = parseFloat(salaryAmount) || 0;
      const hoursWeek = parseFloat(hoursPerWeek) || 40;
      const daysWeek = parseFloat(daysPerWeek) || 5;
      const holidays = parseFloat(holidaysPerYear) || 0;
      const vacation = parseFloat(vacationDaysPerYear) || 0;

      if (amount <= 0) return null;

      // Calculate hourly rate based on input frequency
      let hourlyRate = 0;
      switch (payFrequency) {
        case 'hour':
          hourlyRate = amount;
          break;
        case 'day':
          hourlyRate = amount / (hoursWeek / daysWeek);
          break;
        case 'week':
          hourlyRate = amount / hoursWeek;
          break;
        case 'biweek':
          hourlyRate = amount / (hoursWeek * 2);
          break;
        case 'month':
          hourlyRate = amount / (hoursWeek * 52 / 12);
          break;
        case 'year':
          hourlyRate = amount / (hoursWeek * 52);
          break;
      }

      // Unadjusted calculations (assumes 52 weeks or 260 weekdays)
      const unadjusted = {
        hourly: hourlyRate,
        daily: hourlyRate * (hoursWeek / daysWeek),
        weekly: hourlyRate * hoursWeek,
        biweekly: hourlyRate * hoursWeek * 2,
        semiMonthly: hourlyRate * hoursWeek * 52 / 24,
        monthly: hourlyRate * hoursWeek * 52 / 12,
        quarterly: hourlyRate * hoursWeek * 52 / 4,
        annual: hourlyRate * hoursWeek * 52
      };

      // Calculate working days (accounting for holidays and vacation)
      const totalWorkingDays = 52 * daysWeek;
      const adjustedWorkingDays = totalWorkingDays - holidays - vacation;
      const adjustmentFactor = adjustedWorkingDays / totalWorkingDays;

      // Adjusted calculations (accounting for holidays and paid vacation)
      const adjusted = {
        hourly: unadjusted.hourly * adjustmentFactor,
        daily: unadjusted.daily * adjustmentFactor,
        weekly: unadjusted.weekly * adjustmentFactor,
        biweekly: unadjusted.biweekly * adjustmentFactor,
        semiMonthly: unadjusted.semiMonthly * adjustmentFactor,
        monthly: unadjusted.monthly * adjustmentFactor,
        quarterly: unadjusted.quarterly * adjustmentFactor,
        annual: unadjusted.annual * adjustmentFactor
      };

      return {
        unadjusted,
        adjusted,
        workingDays: {
          totalDays: totalWorkingDays,
          workingDays: adjustedWorkingDays,
          holidaysAndVacation: holidays + vacation
        }
      };
    } catch {
      return null;
    }
  };

  const result = useMemo(() => calculateSalary(), [
    salaryAmount,
    payFrequency,
    hoursPerWeek,
    daysPerWeek,
    holidaysPerYear,
    vacationDaysPerYear
  ]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Save as Image
  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;

    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `salary-calculation-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  // Share functionality

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Salary Calculator</h3>
          </div>
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Salary Amount
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={salaryAmount}
                    onChange={(e) => setSalaryAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="50"
                  />
                </div>
                <select
                  value={payFrequency}
                  onChange={(e) => setPayFrequency(e.target.value as any)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="hour">per Hour</option>
                  <option value="day">per Day</option>
                  <option value="week">per Week</option>
                  <option value="biweek">per Bi-week</option>
                  <option value="month">per Month</option>
                  <option value="year">per Year</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Hours per Week
                </label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="40"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Days per Week
                </label>
                <input
                  type="number"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Holidays per Year
                </label>
                <input
                  type="number"
                  value={holidaysPerYear}
                  onChange={(e) => setHolidaysPerYear(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Vacation Days per Year
                </label>
                <input
                  type="number"
                  value={vacationDaysPerYear}
                  onChange={(e) => setVacationDaysPerYear(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="15"
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700">
              <p className="font-medium mb-1">Calculation Notes:</p>
              <ul className="space-y-1 text-xs">
                <li>• Assumes 52 working weeks per year</li>
                <li>• Unadjusted: Ignores holidays and vacation</li>
                <li>• Adjusted: Accounts for holidays and paid vacation days</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4" ref={resultRef}>
            {result ? (
              <>
                {/* Main Result Card - 更直观 */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                  <div className="text-sm opacity-90 mb-2">Your Annual Salary</div>
                  <div className="text-4xl font-bold mb-4">
                    {formatCurrency(result.unadjusted.annual)}
                  </div>
                  <div className="flex items-center justify-between text-sm opacity-90">
                    <div>
                      <div className="font-medium">{formatCurrency(result.unadjusted.hourly)}/hour</div>
                      <div className="text-xs">Hourly Rate</div>
                    </div>
                    <div>
                      <div className="font-medium">{formatCurrency(result.unadjusted.monthly)}/month</div>
                      <div className="text-xs">Monthly Income</div>
                    </div>
                    <div>
                      <div className="font-medium">{result.workingDays.totalDays} days</div>
                      <div className="text-xs">Total Days</div>
                    </div>
                  </div>
                </div>

                {/* Working Days Summary */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-4">
                  <div className="text-sm font-medium text-gray-700 mb-3">Working Days Summary</div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-gray-900">{result.workingDays.totalDays}</div>
                      <div className="text-xs text-gray-500 mt-1">Total Days</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center border-2 border-green-200">
                      <div className="text-2xl font-bold text-green-600">{result.workingDays.workingDays}</div>
                      <div className="text-xs text-gray-500 mt-1">Working Days</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-orange-600">{result.workingDays.holidaysAndVacation}</div>
                      <div className="text-xs text-gray-500 mt-1">Days Off</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-600 text-center">
                    💡 {holidaysPerYear} holidays + {vacationDaysPerYear} vacation days
                  </div>
                </div>

                {/* Detailed Breakdown - 直接展示 */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="font-medium text-gray-900 mb-3">
                    📊 Detailed Breakdown (All Pay Periods)
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Period</th>
                          <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700">Unadjusted</th>
                          <th className="text-right py-2 px-2 text-sm font-semibold text-blue-600">Adjusted</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50">
                          <td className="py-2 px-2 text-sm text-gray-700">Hourly</td>
                          <td className="py-2 px-2 text-sm text-right text-gray-600">{formatCurrency(result.unadjusted.hourly)}</td>
                          <td className="py-2 px-2 text-sm text-right text-blue-600 font-medium">{formatCurrency(result.adjusted.hourly)}</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-2 px-2 text-sm text-gray-700">Daily</td>
                          <td className="py-2 px-2 text-sm text-right text-gray-600">{formatCurrency(result.unadjusted.daily)}</td>
                          <td className="py-2 px-2 text-sm text-right text-blue-600 font-medium">{formatCurrency(result.adjusted.daily)}</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-2 px-2 text-sm text-gray-700">Weekly</td>
                          <td className="py-2 px-2 text-sm text-right text-gray-600">{formatCurrency(result.unadjusted.weekly)}</td>
                          <td className="py-2 px-2 text-sm text-right text-blue-600 font-medium">{formatCurrency(result.adjusted.weekly)}</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-2 px-2 text-sm text-gray-700">Bi-weekly</td>
                          <td className="py-2 px-2 text-sm text-right text-gray-600">{formatCurrency(result.unadjusted.biweekly)}</td>
                          <td className="py-2 px-2 text-sm text-right text-blue-600 font-medium">{formatCurrency(result.adjusted.biweekly)}</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-2 px-2 text-sm text-gray-700">Semi-monthly</td>
                          <td className="py-2 px-2 text-sm text-right text-gray-600">{formatCurrency(result.unadjusted.semiMonthly)}</td>
                          <td className="py-2 px-2 text-sm text-right text-blue-600 font-medium">{formatCurrency(result.adjusted.semiMonthly)}</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-2 px-2 text-sm text-gray-700">Monthly</td>
                          <td className="py-2 px-2 text-sm text-right text-gray-600">{formatCurrency(result.unadjusted.monthly)}</td>
                          <td className="py-2 px-2 text-sm text-right text-blue-600 font-medium">{formatCurrency(result.adjusted.monthly)}</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-2 px-2 text-sm text-gray-700">Quarterly</td>
                          <td className="py-2 px-2 text-sm text-right text-gray-600">{formatCurrency(result.unadjusted.quarterly)}</td>
                          <td className="py-2 px-2 text-sm text-right text-blue-600 font-medium">{formatCurrency(result.adjusted.quarterly)}</td>
                        </tr>
                        <tr className="bg-blue-50 border-t-2 border-blue-200">
                          <td className="py-3 px-2 text-sm font-bold text-gray-900">Annual</td>
                          <td className="py-3 px-2 text-sm text-right font-semibold text-gray-900">{formatCurrency(result.unadjusted.annual)}</td>
                          <td className="py-3 px-2 text-sm text-right font-bold text-blue-600">{formatCurrency(result.adjusted.annual)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveAsImage}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Save as Image
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-gray-400 py-16">
                <div>
                  <DollarSign className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="text-lg font-medium">Enter salary amount to calculate</p>
                  <p className="text-sm mt-1">Results will appear here instantly</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Salary Calculator"
      />
    </div>
  );
}

