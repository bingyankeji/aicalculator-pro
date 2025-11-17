'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Share2, Printer, TrendingUp, Info } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts';

interface ZScoreInputs {
  calculationMode: 'scoreToZ' | 'zToScore';
  rawScore: string;
  mean: string;
  stdDev: string;
  zScore: string;
}

interface ZScoreResult {
  zScore: number;
  percentile: number;
  percentBelow: number;
  percentAbove: number;
  rawScore: number;
  interpretation: string;
  category: string;
  examples: string[];
}

export default function ZScoreCalculator() {
  const [inputs, setInputs] = useState<ZScoreInputs>({
    calculationMode: 'scoreToZ',
    rawScore: '85',
    mean: '75',
    stdDev: '10',
    zScore: '1.5',
  });

  const [result, setResult] = useState<ZScoreResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/z-score-calculator',
    getShareParams: () => ({
      mode: inputs.calculationMode,
      score: inputs.rawScore,
      mean: inputs.mean,
      sd: inputs.stdDev,
    }),
    getShareText: () => {
      if (result) {
        return `Z-score: ${result.zScore.toFixed(2)} (${result.percentile.toFixed(1)}th percentile). Calculate yours!`;
      }
      return 'Calculate Z-scores and percentiles with visual distributions!';
    },
  });

  const handleInputChange = (field: keyof ZScoreInputs, value: string | 'scoreToZ' | 'zToScore') => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  // Standard normal CDF approximation
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

  // Inverse normal CDF approximation
  const inverseNormalCDF = (p: number): number => {
    if (p <= 0 || p >= 1) return 0;
    
    const a = [
      -3.969683028665376e1, 2.209460984245205e2,
      -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1,
    ];
    const b = [
      -5.447609879822406e1, 1.615858368580409e2,
      -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1,
    ];
    const c = [
      -7.784894002430293e-3, -3.223964580411365e-1,
      -2.400758277161838, -2.549732539343734, 4.374664141464968,
    ];
    const d = [
      7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996,
      3.754408661907416,
    ];

    const pLow = 0.02425;
    const pHigh = 1 - pLow;

    let q, r, z;

    if (p < pLow) {
      q = Math.sqrt(-2 * Math.log(p));
      z =
        (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    } else if (p <= pHigh) {
      q = p - 0.5;
      r = q * q;
      z =
        (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r * q) /
        (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
    } else {
      q = Math.sqrt(-2 * Math.log(1 - p));
      z =
        -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }

    return z;
  };

  const getInterpretation = (zScore: number): { category: string; interpretation: string } => {
    const absZ = Math.abs(zScore);
    
    if (absZ < 1) {
      return {
        category: 'Average',
        interpretation: 'This score is within one standard deviation of the mean, which is considered typical or average.',
      };
    } else if (absZ < 1.5) {
      return {
        category: zScore > 0 ? 'Above Average' : 'Below Average',
        interpretation: `This score is ${zScore > 0 ? 'moderately above' : 'moderately below'} average, better than about ${(normalCDF(Math.abs(zScore)) * 100).toFixed(0)}% of the population.`,
      };
    } else if (absZ < 2) {
      return {
        category: zScore > 0 ? 'High' : 'Low',
        interpretation: `This score is ${zScore > 0 ? 'significantly above' : 'significantly below'} average, representing ${zScore > 0 ? 'high' : 'low'} performance.`,
      };
    } else if (absZ < 3) {
      return {
        category: zScore > 0 ? 'Very High' : 'Very Low',
        interpretation: `This score is ${zScore > 0 ? 'exceptionally high' : 'exceptionally low'}, in the ${zScore > 0 ? 'top' : 'bottom'} ${((1 - normalCDF(absZ)) * 100).toFixed(1)}% of the population.`,
      };
    } else {
      return {
        category: zScore > 0 ? 'Extremely High' : 'Extremely Low',
        interpretation: `This score is ${zScore > 0 ? 'extremely rare and exceptional' : 'extremely rare and unusual'}, representing less than 0.3% of the population.`,
      };
    }
  };

  const calculate = () => {
    if (inputs.calculationMode === 'scoreToZ') {
      const rawScore = parseFloat(inputs.rawScore);
      const mean = parseFloat(inputs.mean);
      const stdDev = parseFloat(inputs.stdDev);

      if (isNaN(rawScore) || isNaN(mean) || isNaN(stdDev) || stdDev <= 0) {
        alert('Please enter valid numbers. Standard deviation must be positive.');
        return;
      }

      const zScore = (rawScore - mean) / stdDev;
      const percentile = normalCDF(zScore) * 100;
      const { category, interpretation } = getInterpretation(zScore);

      const examples = [];
      if (Math.abs(zScore) < 1) {
        examples.push('68% of all scores fall within ±1 standard deviation (Z between -1 and 1)');
        examples.push('This is a very common score in a normal distribution');
      } else if (Math.abs(zScore) < 2) {
        examples.push('95% of all scores fall within ±2 standard deviations');
        examples.push('About 1 in 6 people score at this level or beyond');
      } else {
        examples.push('Only 5% of scores fall beyond ±2 standard deviations');
        examples.push('This represents unusual or exceptional performance');
      }

      setResult({
        zScore,
        percentile,
        percentBelow: percentile,
        percentAbove: 100 - percentile,
        rawScore,
        interpretation,
        category,
        examples,
      });
    } else {
      // Z to Score
      const zScore = parseFloat(inputs.zScore);
      const mean = parseFloat(inputs.mean);
      const stdDev = parseFloat(inputs.stdDev);

      if (isNaN(zScore) || isNaN(mean) || isNaN(stdDev) || stdDev <= 0) {
        alert('Please enter valid numbers. Standard deviation must be positive.');
        return;
      }

      const rawScore = zScore * stdDev + mean;
      const percentile = normalCDF(zScore) * 100;
      const { category, interpretation } = getInterpretation(zScore);

      setResult({
        zScore,
        percentile,
        percentBelow: percentile,
        percentAbove: 100 - percentile,
        rawScore,
        interpretation,
        category,
        examples: [],
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
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.download = `z-score-${new Date().toISOString().split('T')[0]}.png`;
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
      await new Promise((resolve) => setTimeout(resolve, 500));

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
              <title>Z-Score Analysis Results</title>
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

  // Generate normal distribution curve data
  const distributionData = result
    ? Array.from({ length: 81 }, (_, i) => {
        const z = (i - 40) / 10; // Range from -4 to 4
        const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z);
        return {
          z,
          probability: y,
          highlight: Math.abs(z - result.zScore) < 0.1 ? y : null,
        };
      })
    : [];

  const getCategoryColor = (category: string) => {
    if (category.includes('Extremely')) return 'text-purple-700 bg-purple-50 border-purple-200';
    if (category.includes('Very')) return 'text-red-700 bg-red-50 border-red-200';
    if (category === 'High' || category === 'Low') return 'text-orange-700 bg-orange-50 border-orange-200';
    if (category.includes('Above') || category.includes('Below')) return 'text-blue-700 bg-blue-50 border-blue-200';
    return 'text-green-700 bg-green-50 border-green-200';
  };

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
                <Label className="text-sm font-medium text-gray-700">
                  What do you want to calculate?
                </Label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleInputChange('calculationMode', 'scoreToZ')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all text-left ${
                      inputs.calculationMode === 'scoreToZ'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-semibold">Score → Z-score</div>
                    <div className="text-xs mt-1 opacity-90">
                      Convert raw score to Z-score and percentile
                    </div>
                  </button>
                  <button
                    onClick={() => handleInputChange('calculationMode', 'zToScore')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all text-left ${
                      inputs.calculationMode === 'zToScore'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-semibold">Z-score → Score</div>
                    <div className="text-xs mt-1 opacity-90">
                      Convert Z-score to raw score
                    </div>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Input Values</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {inputs.calculationMode === 'scoreToZ' ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="rawScore" className="text-sm font-medium text-gray-700">
                      Raw Score <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="rawScore"
                      type="number"
                      step="any"
                      value={inputs.rawScore}
                      onChange={(e) => handleInputChange('rawScore', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="85"
                    />
                    <p className="text-xs text-gray-500">The actual score or value</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mean" className="text-sm font-medium text-gray-700">
                      Mean (μ) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="mean"
                      type="number"
                      step="any"
                      value={inputs.mean}
                      onChange={(e) => handleInputChange('mean', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="75"
                    />
                    <p className="text-xs text-gray-500">Population or sample mean</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stdDev" className="text-sm font-medium text-gray-700">
                      Standard Deviation (σ) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="stdDev"
                      type="number"
                      step="any"
                      value={inputs.stdDev}
                      onChange={(e) => handleInputChange('stdDev', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10"
                    />
                    <p className="text-xs text-gray-500">Must be positive</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="zScore" className="text-sm font-medium text-gray-700">
                      Z-score <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="zScore"
                      type="number"
                      step="0.01"
                      value={inputs.zScore}
                      onChange={(e) => handleInputChange('zScore', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1.5"
                    />
                    <p className="text-xs text-gray-500">Standard score (typically -3 to +3)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meanZ" className="text-sm font-medium text-gray-700">
                      Mean (μ) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="meanZ"
                      type="number"
                      step="any"
                      value={inputs.mean}
                      onChange={(e) => handleInputChange('mean', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="75"
                    />
                    <p className="text-xs text-gray-500">Population or sample mean</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stdDevZ" className="text-sm font-medium text-gray-700">
                      Standard Deviation (σ) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="stdDevZ"
                      type="number"
                      step="any"
                      value={inputs.stdDev}
                      onChange={(e) => handleInputChange('stdDev', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10"
                    />
                    <p className="text-xs text-gray-500">Must be positive</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Z-Score
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          <div className="space-y-6">
            {result ? (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                    <CardContent className="p-6">
                      <p className="text-sm text-blue-600 font-medium mb-1">Z-Score</p>
                      <p className="text-4xl sm:text-5xl font-bold text-blue-700">
                        {result.zScore.toFixed(3)}
                      </p>
                      <p className="text-xs text-blue-600 mt-2">
                        {result.zScore > 0 ? '+' : ''}{result.zScore.toFixed(2)}σ from mean
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                    <CardContent className="p-6">
                      <p className="text-sm text-green-600 font-medium mb-1">Percentile Rank</p>
                      <p className="text-4xl sm:text-5xl font-bold text-green-700">
                        {result.percentile.toFixed(1)}%
                      </p>
                      <p className="text-xs text-green-600 mt-2">
                        Better than {result.percentBelow.toFixed(1)}% of population
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200">
                    <CardContent className="p-6">
                      <p className="text-sm text-amber-600 font-medium mb-1">Raw Score</p>
                      <p className="text-4xl sm:text-5xl font-bold text-amber-700 break-all">
                        {result.rawScore.toFixed(2)}
                      </p>
                      <p className="text-xs text-amber-600 mt-2">
                        Mean: {inputs.mean}, SD: {inputs.stdDev}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className={`shadow-lg border-2 ${getCategoryColor(result.category)}`}>
                    <CardContent className="p-6">
                      <p className="text-sm font-medium mb-1">Category</p>
                      <p className="text-2xl sm:text-3xl font-bold break-words">
                        {result.category}
                      </p>
                      <p className="text-xs mt-2">Performance level</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Normal Distribution Visualization */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">
                      📊 Standard Normal Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300} minHeight={250}>
                      <ComposedChart data={distributionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="z"
                          stroke="#6b7280"
                          tick={{ fontSize: 12 }}
                          label={{ value: 'Z-Score', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis
                          stroke="#6b7280"
                          tick={{ fontSize: 12 }}
                          label={{
                            value: 'Probability Density',
                            angle: -90,
                            position: 'insideLeft',
                          }}
                        />
                        <Tooltip
                          formatter={(value: number) => [value.toFixed(4), 'Density']}
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                          }}
                        />
                        <ReferenceLine x={0} stroke="#6b7280" strokeDasharray="5 5" />
                        <ReferenceLine
                          x={result.zScore}
                          stroke="#3b82f6"
                          strokeWidth={3}
                          label={{
                            value: `Z = ${result.zScore.toFixed(2)}`,
                            position: 'top',
                            fill: '#3b82f6',
                            fontSize: 12,
                            fontWeight: 'bold',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="probability"
                          fill="#93c5fd"
                          fillOpacity={0.3}
                          stroke="#3b82f6"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="highlight"
                          stroke="#ef4444"
                          strokeWidth={4}
                          dot={false}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-center">
                      <div className="p-2 bg-red-50 rounded border border-red-200">
                        <div className="font-semibold text-red-700">-2σ to -1σ</div>
                        <div className="text-gray-600">13.6%</div>
                      </div>
                      <div className="p-2 bg-green-50 rounded border border-green-200">
                        <div className="font-semibold text-green-700">-1σ to +1σ</div>
                        <div className="text-gray-600">68.3%</div>
                      </div>
                      <div className="p-2 bg-red-50 rounded border border-red-200">
                        <div className="font-semibold text-red-700">+1σ to +2σ</div>
                        <div className="text-gray-600">13.6%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Interpretation */}
                <Card className="shadow-lg border-2 border-blue-200 bg-blue-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-600" />
                      Interpretation
                    </h3>
                    <p className="text-gray-700 mb-4">{result.interpretation}</p>
                    {result.examples.length > 0 && (
                      <ul className="space-y-2 text-sm text-gray-700">
                        {result.examples.map((example, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>

                {/* Z-Score Reference Table */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">
                      📋 Z-Score Reference Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto overflow-y-hidden">
                      <table className="w-full min-w-[500px] text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-300">
                            <th className="px-4 py-3 text-left font-semibold text-gray-900">
                              Z-Score Range
                            </th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-900">
                              Percentile
                            </th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-900">
                              % of Population
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-900">
                              Interpretation
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200 hover:bg-blue-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">+3.0 and above</td>
                            <td className="px-4 py-3 text-center text-gray-700">99.9%</td>
                            <td className="px-4 py-3 text-center text-gray-700">0.1%</td>
                            <td className="px-4 py-3 text-gray-700">Extremely high</td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-blue-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">+2.0 to +3.0</td>
                            <td className="px-4 py-3 text-center text-gray-700">97.7-99.9%</td>
                            <td className="px-4 py-3 text-center text-gray-700">2.3%</td>
                            <td className="px-4 py-3 text-gray-700">Very high</td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-blue-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">+1.0 to +2.0</td>
                            <td className="px-4 py-3 text-center text-gray-700">84.1-97.7%</td>
                            <td className="px-4 py-3 text-center text-gray-700">13.6%</td>
                            <td className="px-4 py-3 text-gray-700">Above average</td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-blue-50 bg-green-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">-1.0 to +1.0</td>
                            <td className="px-4 py-3 text-center text-gray-700">15.9-84.1%</td>
                            <td className="px-4 py-3 text-center text-gray-700">68.3%</td>
                            <td className="px-4 py-3 text-gray-700">Average/typical</td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-blue-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">-2.0 to -1.0</td>
                            <td className="px-4 py-3 text-center text-gray-700">2.3-15.9%</td>
                            <td className="px-4 py-3 text-center text-gray-700">13.6%</td>
                            <td className="px-4 py-3 text-gray-700">Below average</td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-blue-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">-3.0 to -2.0</td>
                            <td className="px-4 py-3 text-center text-gray-700">0.1-2.3%</td>
                            <td className="px-4 py-3 text-center text-gray-700">2.3%</td>
                            <td className="px-4 py-3 text-gray-700">Very low</td>
                          </tr>
                          <tr className="hover:bg-blue-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">-3.0 and below</td>
                            <td className="px-4 py-3 text-center text-gray-700">0.1%</td>
                            <td className="px-4 py-3 text-center text-gray-700">0.1%</td>
                            <td className="px-4 py-3 text-gray-700">Extremely low</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Formula Card */}
                <Card className="shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                      📐 Z-Score Formula
                    </h3>
                    <div className="bg-white p-4 rounded-lg border-2 border-indigo-200 font-mono text-center mb-4">
                      <div className="text-2xl mb-2">Z = (X - μ) / σ</div>
                      <div className="text-sm text-gray-600">
                        where X = raw score, μ = mean, σ = standard deviation
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div className="bg-white p-3 rounded border border-indigo-200">
                        <div className="font-semibold text-indigo-700">Your Calculation:</div>
                        <div className="text-gray-700 mt-1">
                          Z = ({result.rawScore.toFixed(1)} - {inputs.mean}) / {inputs.stdDev}
                        </div>
                        <div className="text-gray-700 font-semibold mt-1">
                          = {result.zScore.toFixed(3)}
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded border border-indigo-200">
                        <div className="font-semibold text-indigo-700">Percentile:</div>
                        <div className="text-gray-700 mt-1">
                          Φ({result.zScore.toFixed(2)}) × 100
                        </div>
                        <div className="text-gray-700 font-semibold mt-1">
                          = {result.percentile.toFixed(1)}%
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded border border-indigo-200">
                        <div className="font-semibold text-indigo-700">Distance from Mean:</div>
                        <div className="text-gray-700 mt-1">
                          {Math.abs(result.zScore).toFixed(2)} standard deviations
                        </div>
                        <div className="text-gray-700 font-semibold mt-1">
                          {result.zScore > 0 ? 'above' : 'below'} average
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Results</CardTitle>
                </CardHeader>
                <CardContent className="p-12">
                  <div className="text-center text-gray-500">
                    <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg mb-4">
                      Enter your values and click "Calculate Z-Score" to see results
                    </p>
                    <p className="text-sm text-gray-400">
                      Choose a calculation mode and input your data to begin
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
        calculatorName="Z-Score Calculator"
      />
    </div>
  );
}

