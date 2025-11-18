'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Share2, Printer, AlertCircle, CheckCircle, XCircle, Zap, Settings } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
  Line,
} from 'recharts';

interface PValueInputs {
  calculationMode: 'z-score' | 'advanced';
  zScore: string;
  testType: 't-test' | 'z-test' | 'chi-square' | 'f-test';
  testStatistic: string;
  degreesOfFreedom: string;
  degreesOfFreedom2: string;
  tailType: 'two-tailed' | 'left-tailed' | 'right-tailed';
  significanceLevel: string;
}

interface PValueResult {
  mode: 'z-score' | 'advanced';
  // For Z-score mode
  zScore?: number;
  pLeftTail?: number;
  pRightTail?: number;
  pCenter?: number;
  pBetween?: number;
  pTwoTails?: number;
  // For Advanced mode
  pValue?: number;
  testStatistic?: number;
  testType?: string;
  significance?: 'significant' | 'marginally-significant' | 'not-significant';
  interpretation?: string;
  recommendation?: string;
  criticalValue?: number;
  confidenceLevel?: number;
}

export default function PValueCalculator() {
  const [inputs, setInputs] = useState<PValueInputs>({
    calculationMode: 'z-score',
    zScore: '2.0',
    testType: 't-test',
    testStatistic: '2.5',
    degreesOfFreedom: '30',
    degreesOfFreedom2: '30',
    tailType: 'two-tailed',
    significanceLevel: '0.05',
  });

  const [result, setResult] = useState<PValueResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/p-value-calculator',
    getShareParams: () => ({
      mode: inputs.calculationMode,
      z: inputs.zScore,
      test: inputs.testType,
    }),
    getShareText: () => {
      if (result && result.mode === 'z-score') {
        return `Z-score: ${result.zScore?.toFixed(2)}, P(two-tailed): ${result.pTwoTails?.toFixed(4)}. Calculate yours!`;
      }
      return 'Calculate P-values for statistical hypothesis testing!';
    },
  });

  const handleInputChange = (field: keyof PValueInputs, value: any) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  // Normal CDF approximation
  const normalCDF = (z: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp((-z * z) / 2);
    const prob =
      d *
      t *
      (0.3193815 +
        t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - prob : prob;
  };

  // t-distribution CDF (simplified)
  const tCDF = (t: number, df: number): number => {
    const x = df / (df + t * t);
    const cdf = 0.5 * (1 + (t > 0 ? 1 : -1) * (1 - Math.pow(x, df / 2)));
    return cdf;
  };

  const calculate = () => {
    if (inputs.calculationMode === 'z-score') {
      // Z-score Quick Mode
      const z = parseFloat(inputs.zScore);

      if (isNaN(z)) {
        alert('Please enter a valid Z-score.');
        return;
      }

      // Calculate all P-values
      const pLeft = normalCDF(z);
      const pRight = 1 - pLeft;
      const pCenter = z >= 0 ? pLeft - 0.5 : 0.5 - pLeft;
      const pBetween = 2 * (normalCDF(Math.abs(z)) - 0.5);
      const pTwoTails = 2 * (1 - normalCDF(Math.abs(z)));

      setResult({
        mode: 'z-score',
        zScore: z,
        pLeftTail: pLeft,
        pRightTail: pRight,
        pCenter: pCenter,
        pBetween: pBetween,
        pTwoTails: pTwoTails,
      });
    } else {
      // Advanced Mode (original logic)
      const testStat = parseFloat(inputs.testStatistic);
      const alpha = parseFloat(inputs.significanceLevel);

      if (isNaN(testStat) || isNaN(alpha)) {
        alert('Please enter valid numbers.');
        return;
      }

      let pValue = 0;
      let criticalValue = 1.96;

      if (inputs.testType === 't-test' || inputs.testType === 'z-test') {
        const cdfValue = inputs.testType === 'z-test' 
          ? normalCDF(Math.abs(testStat))
          : tCDF(Math.abs(testStat), parseFloat(inputs.degreesOfFreedom));

        if (inputs.tailType === 'two-tailed') {
          pValue = 2 * (1 - cdfValue);
        } else if (inputs.tailType === 'right-tailed') {
          pValue = 1 - cdfValue;
        } else {
          pValue = cdfValue;
        }
      }

      pValue = Math.max(0, Math.min(1, pValue));

      let significance: 'significant' | 'marginally-significant' | 'not-significant';
      let interpretation = '';
      let recommendation = '';

      if (pValue < alpha) {
        significance = 'significant';
        interpretation = `The result is statistically significant (p = ${pValue.toFixed(4)}). We reject the null hypothesis.`;
        recommendation = 'The evidence supports rejecting the null hypothesis. Consider effect size before drawing conclusions.';
      } else if (pValue < alpha * 2) {
        significance = 'marginally-significant';
        interpretation = `The result is marginally significant (p = ${pValue.toFixed(4)}).`;
        recommendation = 'Exercise caution. Consider collecting more data or adjusting significance level.';
      } else {
        significance = 'not-significant';
        interpretation = `The result is not statistically significant (p = ${pValue.toFixed(4)}). We fail to reject the null hypothesis.`;
        recommendation = 'Insufficient evidence to reject the null hypothesis.';
      }

      setResult({
        mode: 'advanced',
        pValue,
        testStatistic: testStat,
        testType: inputs.testType,
        significance,
        interpretation,
        recommendation,
        criticalValue,
        confidenceLevel: (1 - alpha) * 100,
      });
    }
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `p-value-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current) return;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const canvas = await html2canvas(resultRef.current, { scale: 2, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html><head><title>P-Value Results</title>
          <style>body{margin:0;padding:20px;display:flex;justify-content:center;}
          img{max-width:100%;height:auto;}
          @media print{body{padding:0;}img{page-break-inside:avoid;}}</style>
          </head><body><img src="${imgData}" onload="window.print();"/></body></html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
    }
  };

  // Generate normal distribution data
  const distributionData = result?.mode === 'z-score' && result.zScore !== undefined
    ? Array.from({ length: 161 }, (_, i) => {
        const x = (i - 80) / 20; // Range from -4 to 4
        const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
        return { x, y };
      })
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                Calculation Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleInputChange('calculationMode', 'z-score')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all text-left ${
                      inputs.calculationMode === 'z-score'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <span className="font-semibold">Quick Z-Score Mode</span>
                    </div>
                    <div className="text-xs mt-1 opacity-90">
                      Calculate all P-values from Z-score instantly
                    </div>
                  </button>
                  <button
                    onClick={() => handleInputChange('calculationMode', 'advanced')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all text-left ${
                      inputs.calculationMode === 'advanced'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span className="font-semibold">Advanced Mode</span>
                    </div>
                    <div className="text-xs mt-1 opacity-90">
                      t-test, chi-square, F-test with custom parameters
                    </div>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {inputs.calculationMode === 'z-score' ? (
            // Z-Score Quick Mode Input
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Input Z-Score</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="zScore" className="text-sm font-medium text-gray-700">
                    Z-Score Value <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="zScore"
                    type="number"
                    step="0.01"
                    value={inputs.zScore}
                    onChange={(e) => handleInputChange('zScore', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="2.0"
                  />
                  <p className="text-xs text-gray-500">
                    Enter your Z-score (typically between -4 and 4)
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 font-medium mb-2">💡 Quick Reference:</p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Z = ±1.96 → p = 0.05 (95% confidence)</li>
                    <li>• Z = ±2.576 → p = 0.01 (99% confidence)</li>
                    <li>• Z = ±1.645 → p = 0.10 (90% confidence)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Advanced Mode Input
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Test Configuration</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Test Type</Label>
                  <select
                    value={inputs.testType}
                    onChange={(e) => handleInputChange('testType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="t-test">T-Test</option>
                    <option value="z-test">Z-Test</option>
                    <option value="chi-square">Chi-Square</option>
                    <option value="f-test">F-Test</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="testStatistic" className="text-sm font-medium text-gray-700">
                    Test Statistic <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="testStatistic"
                    type="number"
                    step="any"
                    value={inputs.testStatistic}
                    onChange={(e) => handleInputChange('testStatistic', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="2.5"
                  />
                </div>

                {(inputs.testType === 't-test' || inputs.testType === 'chi-square') && (
                  <div className="space-y-2">
                    <Label htmlFor="df" className="text-sm font-medium text-gray-700">
                      Degrees of Freedom <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="df"
                      type="number"
                      step="1"
                      min="1"
                      value={inputs.degreesOfFreedom}
                      onChange={(e) => handleInputChange('degreesOfFreedom', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="30"
                    />
                  </div>
                )}

                {(inputs.testType === 't-test' || inputs.testType === 'z-test') && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Tail Type</Label>
                    <select
                      value={inputs.tailType}
                      onChange={(e) => handleInputChange('tailType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="two-tailed">Two-Tailed</option>
                      <option value="left-tailed">Left-Tailed</option>
                      <option value="right-tailed">Right-Tailed</option>
                    </select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="alpha" className="text-sm font-medium text-gray-700">
                    Significance Level (α)
                  </Label>
                  <input
                    id="alpha"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={inputs.significanceLevel}
                    onChange={(e) => handleInputChange('significanceLevel', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2 mt-2">
                    {[0.1, 0.05, 0.01].map((level) => (
                      <button
                        key={level}
                        onClick={() => handleInputChange('significanceLevel', level.toString())}
                        className={`px-3 py-1 text-xs rounded border ${
                          inputs.significanceLevel === level.toString()
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate P-Value
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          <div className="space-y-6">
            {result ? (
              result.mode === 'z-score' ? (
                // Z-Score Mode Results
                <>
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">
                        📊 Normal Distribution Visualization
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <div className="mb-4 text-center">
                        <p className="text-sm text-gray-600 mb-2">Given Z = {result.zScore?.toFixed(3)}</p>
                      </div>
                      <ResponsiveContainer width="100%" height={250}>
                        <ComposedChart data={distributionData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="x" stroke="#6b7280" tick={{ fontSize: 11 }} />
                          <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="y"
                            fill="#93c5fd"
                            fillOpacity={0.3}
                            stroke="#3b82f6"
                            strokeWidth={2}
                          />
                          <ReferenceLine
                            x={result.zScore}
                            stroke="#ef4444"
                            strokeWidth={2}
                            label={{ value: `Z=${result.zScore?.toFixed(2)}`, position: 'top', fill: '#ef4444', fontSize: 12 }}
                          />
                          <ReferenceLine x={0} stroke="#9ca3af" strokeDasharray="3 3" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* P-Values Table */}
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">All P-Values</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Probability</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">P-Value</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-blue-50 transition-colors">
                              <td className="px-4 py-4 text-sm font-medium text-gray-900">P(x &lt; Z)</td>
                              <td className="px-4 py-4 text-lg font-bold text-blue-700">{result.pLeftTail?.toFixed(5)}</td>
                              <td className="px-4 py-4 text-sm text-gray-600">Left tail probability</td>
                            </tr>
                            <tr className="hover:bg-blue-50 transition-colors">
                              <td className="px-4 py-4 text-sm font-medium text-gray-900">P(x &gt; Z)</td>
                              <td className="px-4 py-4 text-lg font-bold text-blue-700">{result.pRightTail?.toFixed(5)}</td>
                              <td className="px-4 py-4 text-sm text-gray-600">Right tail probability</td>
                            </tr>
                            <tr className="hover:bg-blue-50 transition-colors">
                              <td className="px-4 py-4 text-sm font-medium text-gray-900">P(0 &lt; x &lt; Z)</td>
                              <td className="px-4 py-4 text-lg font-bold text-blue-700">{result.pCenter?.toFixed(5)}</td>
                              <td className="px-4 py-4 text-sm text-gray-600">Center to Z</td>
                            </tr>
                            <tr className="hover:bg-blue-50 transition-colors">
                              <td className="px-4 py-4 text-sm font-medium text-gray-900">P(-Z &lt; x &lt; Z)</td>
                              <td className="px-4 py-4 text-lg font-bold text-blue-700">{result.pBetween?.toFixed(5)}</td>
                              <td className="px-4 py-4 text-sm text-gray-600">Between -Z and +Z</td>
                            </tr>
                            <tr className="hover:bg-green-50 transition-colors bg-green-50">
                              <td className="px-4 py-4 text-sm font-medium text-gray-900">P(x &lt; -Z or x &gt; Z)</td>
                              <td className="px-4 py-4 text-lg font-bold text-green-700">{result.pTwoTails?.toFixed(5)}</td>
                              <td className="px-4 py-4 text-sm text-gray-600">Two tails (most common)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Interpretation */}
                  <Card className="shadow-lg border-2 border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">📝 Quick Interpretation</h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>
                            {result.pTwoTails && result.pTwoTails < 0.05 ? (
                              <span className="font-semibold text-green-700">Statistically significant at α = 0.05</span>
                            ) : (
                              <span className="font-semibold text-gray-700">Not significant at α = 0.05</span>
                            )}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>
                            Z = {result.zScore?.toFixed(2)} means the value is {Math.abs(result.zScore || 0).toFixed(2)} standard deviations {(result.zScore || 0) >= 0 ? 'above' : 'below'} the mean
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>
                            For two-tailed tests, use P(x &lt; -Z or x &gt; Z) = {result.pTwoTails?.toFixed(5)}
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </>
              ) : (
                // Advanced Mode Results
                <>
                  <Card className={`shadow-lg border-4 ${
                    result.significance === 'significant' ? 'border-green-300 bg-green-50' :
                    result.significance === 'marginally-significant' ? 'border-amber-300 bg-amber-50' :
                    'border-red-300 bg-red-50'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm font-medium mb-1">P-Value</p>
                          <p className="text-5xl font-bold">{result.pValue?.toFixed(4)}</p>
                        </div>
                        <div className="text-right">
                          {result.significance === 'significant' && <CheckCircle className="h-8 w-8 text-green-600 mb-2" />}
                          {result.significance === 'marginally-significant' && <AlertCircle className="h-8 w-8 text-amber-600 mb-2" />}
                          {result.significance === 'not-significant' && <XCircle className="h-8 w-8 text-red-600 mb-2" />}
                          <p className="text-sm font-semibold capitalize">
                            {result.significance?.replace('-', ' ')}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-white bg-opacity-50 rounded-lg">
                        <p className="text-sm">{result.interpretation}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">💡 Recommendation</h3>
                      <p className="text-gray-700">{result.recommendation}</p>
                    </CardContent>
                  </Card>
                </>
              )
            ) : (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Results</CardTitle>
                </CardHeader>
                <CardContent className="p-12">
                  <div className="text-center text-gray-500">
                    <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg mb-4">
                      Enter your values and click "Calculate P-Value"
                    </p>
                    <p className="text-sm text-gray-400">
                      Choose Z-Score mode for quick calculations or Advanced mode for detailed analysis
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {result && (
        <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
          <Button onClick={handleSaveAsImage} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Save as Image
          </Button>
          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print Results
          </Button>
          <Button onClick={handleShare} variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Calculator
          </Button>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="P-Value Calculator"
      />
    </div>
  );
}

