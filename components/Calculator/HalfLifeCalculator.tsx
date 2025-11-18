'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// 常见同位素数据库
const COMMON_ISOTOPES = [
  { name: 'Carbon-14', symbol: 'C-14', halfLife: 5730, unit: 'years', use: 'Archaeological dating' },
  { name: 'Uranium-235', symbol: 'U-235', halfLife: 703800000, unit: 'years', use: 'Nuclear fuel' },
  { name: 'Uranium-238', symbol: 'U-238', halfLife: 4468000000, unit: 'years', use: 'Dating rocks' },
  { name: 'Plutonium-239', symbol: 'Pu-239', halfLife: 24110, unit: 'years', use: 'Nuclear weapons' },
  { name: 'Cobalt-60', symbol: 'Co-60', halfLife: 5.27, unit: 'years', use: 'Cancer treatment' },
  { name: 'Iodine-131', symbol: 'I-131', halfLife: 8.02, unit: 'days', use: 'Thyroid treatment' },
  { name: 'Technetium-99m', symbol: 'Tc-99m', halfLife: 6, unit: 'hours', use: 'Medical imaging' },
  { name: 'Radon-222', symbol: 'Rn-222', halfLife: 3.82, unit: 'days', use: 'Geological research' },
];

interface CalculationResult {
  remainingAmount: number;
  initialAmount: number;
  timeElapsed: number;
  halfLife: number;
  decayedAmount: number;
  decayPercentage: number;
  numberOfHalfLives: number;
  decayCurve: { time: number; amount: number }[];
  halfLifeMilestones: { halfLife: number; amount: number; percentage: number }[];
  decayRate: 'Fast' | 'Medium' | 'Slow';
}

interface ConstantsResult {
  halfLife: number;
  meanLifetime: number;
  decayConstant: number;
}

export default function HalfLifeCalculator() {
  // 主计算器状态 - 4个值中输入任意3个
  const [mainInputs, setMainInputs] = useState({
    remainingAmount: '25',
    initialAmount: '100',
    timeElapsed: '',
    halfLife: '5730',
  });

  // 常数转换状态
  const [constants, setConstants] = useState({
    halfLife: '',
    meanLifetime: '',
    decayConstant: '',
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [constantsResult, setConstantsResult] = useState<ConstantsResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/half-life-calculator',
    getShareParams: () => ({
      r: mainInputs.remainingAmount,
      i: mainInputs.initialAmount,
      t: mainInputs.timeElapsed,
      h: mainInputs.halfLife,
    }),
    getShareText: () => {
      return result
        ? `Half-life calculation: ${result.remainingAmount.toFixed(2)} remains after ${result.timeElapsed} time units`
        : 'Calculate radioactive decay with this Half-Life Calculator!';
    },
  });

  const handleMainInputChange = (field: string, value: string) => {
    setMainInputs(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConstantsChange = (field: string, value: string) => {
    setConstants(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleIsotopeSelect = (isotope: typeof COMMON_ISOTOPES[0]) => {
    setMainInputs(prev => ({
      ...prev,
      halfLife: isotope.halfLife.toString(),
    }));
  };

  // 主计算器 - 输入任意3个值计算第4个
  const calculateMain = () => {
    const Nt = mainInputs.remainingAmount ? parseFloat(mainInputs.remainingAmount) : null;
    const N0 = mainInputs.initialAmount ? parseFloat(mainInputs.initialAmount) : null;
    const t = mainInputs.timeElapsed ? parseFloat(mainInputs.timeElapsed) : null;
    const t_half = mainInputs.halfLife ? parseFloat(mainInputs.halfLife) : null;

    const filledCount = [Nt, N0, t, t_half].filter(v => v !== null && !isNaN(v)).length;

    if (filledCount < 3) {
      alert('Please provide at least 3 values to calculate the 4th value.');
      return;
    }

    let calculatedNt = Nt;
    let calculatedN0 = N0;
    let calculatedT = t;
    let calculatedTHalf = t_half;

    // 公式: Nt = N0 * (1/2)^(t/t_half)
    // 或: t = t_half * log(Nt/N0) / log(0.5)
    // 或: t_half = t * log(0.5) / log(Nt/N0)
    // 或: N0 = Nt / (1/2)^(t/t_half)

    try {
      if (Nt === null || isNaN(Nt!)) {
        // 计算 Nt
        if (N0 && t && t_half) {
          calculatedNt = N0 * Math.pow(0.5, t / t_half);
        }
      } else if (N0 === null || isNaN(N0!)) {
        // 计算 N0
        if (Nt && t && t_half) {
          calculatedN0 = Nt / Math.pow(0.5, t / t_half);
        }
      } else if (t === null || isNaN(t!)) {
        // 计算 t
        if (Nt && N0 && t_half && Nt <= N0) {
          calculatedT = t_half * (Math.log(Nt / N0) / Math.log(0.5));
        } else {
          alert('Remaining amount must be less than or equal to initial amount.');
          return;
        }
      } else if (t_half === null || isNaN(t_half!)) {
        // 计算 t_half
        if (Nt && N0 && t && Nt <= N0) {
          calculatedTHalf = t * (Math.log(0.5) / Math.log(Nt / N0));
        } else {
          alert('Remaining amount must be less than or equal to initial amount.');
          return;
        }
      }

      if (!calculatedNt || !calculatedN0 || !calculatedT || !calculatedTHalf) {
        alert('Invalid calculation. Please check your input values.');
        return;
      }

      // 更新输入框显示计算出的值
      setMainInputs({
        remainingAmount: calculatedNt.toString(),
        initialAmount: calculatedN0.toString(),
        timeElapsed: calculatedT.toString(),
        halfLife: calculatedTHalf.toString(),
      });

      // 生成结果数据
      const numberOfHalfLives = calculatedT / calculatedTHalf;
      const decayedAmount = calculatedN0 - calculatedNt;
      const decayPercentage = (decayedAmount / calculatedN0) * 100;

      // 生成衰减曲线
      const maxTime = Math.max(calculatedT, calculatedTHalf * 10);
      const steps = 100;
      const decayCurve = Array.from({ length: steps + 1 }, (_, i) => {
        const time = (maxTime / steps) * i;
        const amount = calculatedN0 * Math.pow(0.5, time / calculatedTHalf);
        return { time: parseFloat(time.toFixed(2)), amount: parseFloat(amount.toFixed(4)) };
      });

      // 生成半衰期里程碑
      const halfLifeMilestones = Array.from({ length: 11 }, (_, i) => {
        const amount = calculatedN0 * Math.pow(0.5, i);
        return {
          halfLife: i,
          amount: parseFloat(amount.toFixed(4)),
          percentage: parseFloat(((amount / calculatedN0) * 100).toFixed(2)),
        };
      });

      // 衰减速率分类
      let decayRate: 'Fast' | 'Medium' | 'Slow';
      if (calculatedTHalf < 1) {
        decayRate = 'Fast';
      } else if (calculatedTHalf < 365) {
        decayRate = 'Medium';
      } else {
        decayRate = 'Slow';
      }

      setResult({
        remainingAmount: calculatedNt,
        initialAmount: calculatedN0,
        timeElapsed: calculatedT,
        halfLife: calculatedTHalf,
        decayedAmount,
        decayPercentage,
        numberOfHalfLives,
        decayCurve,
        halfLifeMilestones,
        decayRate,
      });
    } catch (error) {
      alert('Error in calculation. Please check your input values.');
      console.error(error);
    }
  };

  // 常数转换计算
  const calculateConstants = () => {
    const t_half = constants.halfLife ? parseFloat(constants.halfLife) : null;
    const tau = constants.meanLifetime ? parseFloat(constants.meanLifetime) : null;
    const lambda = constants.decayConstant ? parseFloat(constants.decayConstant) : null;

    const filledCount = [t_half, tau, lambda].filter(v => v !== null && !isNaN(v) && v > 0).length;

    if (filledCount !== 1) {
      alert('Please provide exactly one positive value to calculate the other two constants.');
      return;
    }

    let calcHalfLife: number;
    let calcMeanLifetime: number;
    let calcDecayConstant: number;

    // 公式关系:
    // t_1/2 = ln(2) / λ = τ * ln(2)
    // τ = 1 / λ = t_1/2 / ln(2)
    // λ = ln(2) / t_1/2 = 1 / τ

    const LN2 = Math.log(2);

    if (t_half && t_half > 0) {
      calcHalfLife = t_half;
      calcMeanLifetime = t_half / LN2;
      calcDecayConstant = LN2 / t_half;
    } else if (tau && tau > 0) {
      calcMeanLifetime = tau;
      calcHalfLife = tau * LN2;
      calcDecayConstant = 1 / tau;
    } else if (lambda && lambda > 0) {
      calcDecayConstant = lambda;
      calcHalfLife = LN2 / lambda;
      calcMeanLifetime = 1 / lambda;
    } else {
      alert('Invalid input value.');
      return;
    }

    setConstants({
      halfLife: calcHalfLife.toString(),
      meanLifetime: calcMeanLifetime.toString(),
      decayConstant: calcDecayConstant.toString(),
    });

    setConstantsResult({
      halfLife: calcHalfLife,
      meanLifetime: calcMeanLifetime,
      decayConstant: calcDecayConstant,
    });
  };

  const handleResetMain = () => {
    setMainInputs({
      remainingAmount: '25',
      initialAmount: '100',
      timeElapsed: '',
      halfLife: '5730',
    });
    setResult(null);
  };

  const handleResetConstants = () => {
    setConstants({
      halfLife: '',
      meanLifetime: '',
      decayConstant: '',
    });
    setConstantsResult(null);
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.download = `half-life-calculator-${new Date().toISOString().split('T')[0]}.png`;
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
            <head>
              <title>Half-Life Calculator Results</title>
              <style>
                body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print {
                  body { padding: 0; }
                  img { max-width: 100%; page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" onload="window.print();"/>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
      alert('Failed to print. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          {/* Main Half-Life Calculator */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">Half-Life Calculator</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Provide any three values to calculate the fourth
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Quantity Remains (Nt) */}
              <div className="space-y-2">
                <Label htmlFor="remainingAmount" className="text-sm font-medium text-gray-700 flex items-center justify-between">
                  <span>
                    Quantity Remains (N<sub>t</sub>)
                  </span>
                  <span className="text-xs text-gray-500">Optional</span>
                </Label>
                <input
                  id="remainingAmount"
                  type="number"
                  value={mainInputs.remainingAmount}
                  onChange={e => handleMainInputChange('remainingAmount', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="25"
                  step="any"
                />
              </div>

              {/* Initial Quantity (N0) */}
              <div className="space-y-2">
                <Label htmlFor="initialAmount" className="text-sm font-medium text-gray-700 flex items-center justify-between">
                  <span>
                    Initial Quantity (N<sub>0</sub>)
                  </span>
                  <span className="text-xs text-gray-500">Optional</span>
                </Label>
                <input
                  id="initialAmount"
                  type="number"
                  value={mainInputs.initialAmount}
                  onChange={e => handleMainInputChange('initialAmount', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="100"
                  step="any"
                />
              </div>

              {/* Time (t) */}
              <div className="space-y-2">
                <Label htmlFor="timeElapsed" className="text-sm font-medium text-gray-700 flex items-center justify-between">
                  <span>Time (t)</span>
                  <span className="text-xs text-gray-500">Optional</span>
                </Label>
                <input
                  id="timeElapsed"
                  type="number"
                  value={mainInputs.timeElapsed}
                  onChange={e => handleMainInputChange('timeElapsed', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Leave blank to calculate"
                  step="any"
                />
              </div>

              {/* Half-Life (t1/2) */}
              <div className="space-y-2">
                <Label htmlFor="halfLife" className="text-sm font-medium text-gray-700 flex items-center justify-between">
                  <span>
                    Half-Life (t<sub>1/2</sub>)
                  </span>
                  <span className="text-xs text-gray-500">Optional</span>
                </Label>
                <input
                  id="halfLife"
                  type="number"
                  value={mainInputs.halfLife}
                  onChange={e => handleMainInputChange('halfLife', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5730"
                  step="any"
                />
              </div>

              <Button
                onClick={calculateMain}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate
              </Button>

              <Button
                onClick={handleResetMain}
                variant="outline"
                className="w-full font-medium py-3 min-h-[44px]"
              >
                Clear
              </Button>
            </CardContent>
          </Card>

          {/* Constants Conversion Calculator */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">Constants Conversion</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Provide one positive value to calculate the others
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Half-Life */}
              <div className="space-y-2">
                <Label htmlFor="const-halfLife" className="text-sm font-medium text-gray-700">
                  Half-Life (t<sub>1/2</sub>)
                </Label>
                <input
                  id="const-halfLife"
                  type="number"
                  value={constants.halfLife}
                  onChange={e => handleConstantsChange('halfLife', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5730"
                  step="any"
                />
              </div>

              {/* Mean Lifetime */}
              <div className="space-y-2">
                <Label htmlFor="meanLifetime" className="text-sm font-medium text-gray-700">
                  Mean Lifetime (τ)
                </Label>
                <input
                  id="meanLifetime"
                  type="number"
                  value={constants.meanLifetime}
                  onChange={e => handleConstantsChange('meanLifetime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="8267"
                  step="any"
                />
              </div>

              {/* Decay Constant */}
              <div className="space-y-2">
                <Label htmlFor="decayConstant" className="text-sm font-medium text-gray-700">
                  Decay Constant (λ)
                </Label>
                <input
                  id="decayConstant"
                  type="number"
                  value={constants.decayConstant}
                  onChange={e => handleConstantsChange('decayConstant', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.000121"
                  step="any"
                />
              </div>

              <Button
                onClick={calculateConstants}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate
              </Button>

              <Button
                onClick={handleResetConstants}
                variant="outline"
                className="w-full font-medium py-3 min-h-[44px]"
              >
                Clear
              </Button>
            </CardContent>
          </Card>

          {/* Common Isotopes */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">Common Isotopes</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {COMMON_ISOTOPES.map(isotope => (
                <button
                  key={isotope.symbol}
                  onClick={() => handleIsotopeSelect(isotope)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-semibold text-sm text-gray-900">{isotope.symbol}</div>
                  <div className="text-xs text-gray-600">
                    t½: {isotope.halfLife} {isotope.unit}
                  </div>
                  <div className="text-xs text-gray-500">{isotope.use}</div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Calculation Results</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result ? (
                <div className="space-y-6">
                  {/* Key Results */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">
                        Remaining Amount (N<sub>t</sub>):
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-700 break-all">
                        {result.remainingAmount.toFixed(6)}
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">
                        Initial Amount (N<sub>0</sub>):
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-700 break-all">
                        {result.initialAmount.toFixed(6)}
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Time Elapsed (t):</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-700 break-all">
                        {result.timeElapsed.toFixed(6)}
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">
                        Half-Life (t<sub>1/2</sub>):
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-700 break-all">
                        {result.halfLife.toFixed(6)}
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Decay Percentage:</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-700">
                        {result.decayPercentage.toFixed(2)}%
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Number of Half-Lives:</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-700">
                        {result.numberOfHalfLives.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Decay Rate Badge */}
                  <div className="flex items-center justify-center">
                    <div
                      className={`px-6 py-3 rounded-lg font-semibold ${
                        result.decayRate === 'Fast'
                          ? 'bg-red-100 text-red-700'
                          : result.decayRate === 'Medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      Decay Rate: {result.decayRate}
                    </div>
                  </div>

                  {/* Decay Curve */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Decay Curve</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={result.decayCurve}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="time"
                          label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis label={{ value: 'Amount', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="amount"
                          stroke="#1e40af"
                          strokeWidth={2}
                          name="Remaining Amount"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Half-Life Milestones */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Half-Life Milestones</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[350px] text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-300">
                            <th className="text-left py-2 px-2">Half-Lives</th>
                            <th className="text-right py-2 px-2">Amount</th>
                            <th className="text-right py-2 px-2">Remaining %</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.halfLifeMilestones.map(milestone => (
                            <tr key={milestone.halfLife} className="border-b border-gray-200">
                              <td className="py-2 px-2">{milestone.halfLife}</td>
                              <td className="text-right py-2 px-2 font-semibold text-blue-700">
                                {milestone.amount.toFixed(4)}
                              </td>
                              <td className="text-right py-2 px-2">{milestone.percentage}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Bar Chart: First 6 Half-Lives */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Amount Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={result.halfLifeMilestones.slice(0, 6)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="halfLife"
                          label={{ value: 'Half-Lives', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis label={{ value: 'Amount', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#1e40af" name="Remaining Amount" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
        <Button onClick={handleSaveAsImage} variant="outline" className="gap-2" disabled={!result}>
          <Download className="h-4 w-4" />
          Save as Image
        </Button>

        <Button onClick={handlePrint} variant="outline" className="gap-2" disabled={!result}>
          <Printer className="h-4 w-4" />
          Print Results
        </Button>

        <Button onClick={handleShare} variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Calculator
        </Button>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Half-Life Calculator"
      />
    </div>
  );
}
