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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';

interface ConfidenceIntervalInputs {
  calculationType: 'mean' | 'proportion';
  sampleMean: string;
  sampleStdDev: string;
  sampleSize: string;
  confidenceLevel: string;
  // For proportion
  successes: string;
  // Distribution type
  distributionType: 'normal' | 't';
}

interface ConfidenceIntervalResult {
  lowerBound: number;
  upperBound: number;
  pointEstimate: number;
  marginOfError: number;
  confidenceLevel: number;
  standardError: number;
  criticalValue: number;
  interpretation: string;
  intervalWidth: number;
  sampleSize: number;
}

export default function ConfidenceIntervalCalculator() {
  const [inputs, setInputs] = useState<ConfidenceIntervalInputs>({
    calculationType: 'mean',
    sampleMean: '100',
    sampleStdDev: '15',
    sampleSize: '30',
    confidenceLevel: '95',
    successes: '60',
    distributionType: 't',
  });

  const [result, setResult] = useState<ConfidenceIntervalResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/confidence-interval-calculator',
    getShareParams: () => ({
      type: inputs.calculationType,
      mean: inputs.sampleMean,
      sd: inputs.sampleStdDev,
      n: inputs.sampleSize,
      cl: inputs.confidenceLevel,
    }),
    getShareText: () => {
      if (result) {
        return `${result.confidenceLevel}% CI: [${result.lowerBound.toFixed(2)}, ${result.upperBound.toFixed(2)}]. Calculate confidence intervals!`;
      }
      return 'Calculate confidence intervals for means and proportions with visual displays!';
    },
  });

  const handleInputChange = (
    field: keyof ConfidenceIntervalInputs,
    value: string | 'mean' | 'proportion' | 'normal' | 't'
  ) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  // t-distribution critical value approximation
  const getTCriticalValue = (df: number, alpha: number): number => {
    // For common confidence levels, use accurate values
    const confidenceLevel = (1 - alpha) * 100;
    
    if (df >= 120) {
      // Use normal approximation for large df
      return getZCriticalValue(alpha);
    }

    // Lookup table for common values
    const tTable: { [key: number]: { [key: string]: number } } = {
      1: { '90': 6.314, '95': 12.706, '99': 63.657 },
      2: { '90': 2.920, '95': 4.303, '99': 9.925 },
      3: { '90': 2.353, '95': 3.182, '99': 5.841 },
      4: { '90': 2.132, '95': 2.776, '99': 4.604 },
      5: { '90': 2.015, '95': 2.571, '99': 4.032 },
      10: { '90': 1.812, '95': 2.228, '99': 3.169 },
      15: { '90': 1.753, '95': 2.131, '99': 2.947 },
      20: { '90': 1.725, '95': 2.086, '99': 2.845 },
      25: { '90': 1.708, '95': 2.060, '99': 2.787 },
      30: { '90': 1.697, '95': 2.042, '99': 2.750 },
      40: { '90': 1.684, '95': 2.021, '99': 2.704 },
      50: { '90': 1.676, '95': 2.009, '99': 2.678 },
      60: { '90': 1.671, '95': 2.000, '99': 2.660 },
      80: { '90': 1.664, '95': 1.990, '99': 2.639 },
      100: { '90': 1.660, '95': 1.984, '99': 2.626 },
    };

    const clStr = confidenceLevel.toString();
    
    // Exact match
    if (tTable[df] && tTable[df][clStr]) {
      return tTable[df][clStr];
    }

    // Interpolate for missing values
    const dfKeys = Object.keys(tTable).map(Number).sort((a, b) => a - b);
    let lowerDf = dfKeys[0];
    let upperDf = dfKeys[dfKeys.length - 1];

    for (let i = 0; i < dfKeys.length - 1; i++) {
      if (df >= dfKeys[i] && df <= dfKeys[i + 1]) {
        lowerDf = dfKeys[i];
        upperDf = dfKeys[i + 1];
        break;
      }
    }

    if (df > upperDf) {
      return tTable[upperDf][clStr] || getZCriticalValue(alpha);
    }

    // Linear interpolation
    const t1 = tTable[lowerDf][clStr];
    const t2 = tTable[upperDf][clStr];
    return t1 + ((df - lowerDf) / (upperDf - lowerDf)) * (t2 - t1);
  };

  // Z-distribution critical value
  const getZCriticalValue = (alpha: number): number => {
    // Common critical values
    const criticalValues: { [key: string]: number } = {
      '0.10': 1.645, // 90%
      '0.05': 1.960, // 95%
      '0.01': 2.576, // 99%
      '0.001': 3.291, // 99.9%
    };

    return criticalValues[alpha.toFixed(3)] || 1.96;
  };

  const calculate = () => {
    const confidenceLevel = parseFloat(inputs.confidenceLevel);
    const sampleSize = parseFloat(inputs.sampleSize);

    if (isNaN(confidenceLevel) || confidenceLevel <= 0 || confidenceLevel >= 100) {
      alert('Confidence level must be between 0 and 100.');
      return;
    }

    if (isNaN(sampleSize) || sampleSize < 2) {
      alert('Sample size must be at least 2.');
      return;
    }

    const alpha = (100 - confidenceLevel) / 100;

    if (inputs.calculationType === 'mean') {
      const mean = parseFloat(inputs.sampleMean);
      const stdDev = parseFloat(inputs.sampleStdDev);

      if (isNaN(mean) || isNaN(stdDev) || stdDev <= 0) {
        alert('Please enter valid numbers. Standard deviation must be positive.');
        return;
      }

      const standardError = stdDev / Math.sqrt(sampleSize);
      let criticalValue: number;

      if (inputs.distributionType === 't' || sampleSize < 30) {
        // Use t-distribution
        const df = sampleSize - 1;
        criticalValue = getTCriticalValue(df, alpha / 2);
      } else {
        // Use normal distribution
        criticalValue = getZCriticalValue(alpha / 2);
      }

      const marginOfError = criticalValue * standardError;
      const lowerBound = mean - marginOfError;
      const upperBound = mean + marginOfError;
      const intervalWidth = upperBound - lowerBound;

      const distributionUsed = inputs.distributionType === 't' || sampleSize < 30 ? 't-distribution' : 'normal distribution';
      const interpretation = `We are ${confidenceLevel}% confident that the true population mean lies between ${lowerBound.toFixed(2)} and ${upperBound.toFixed(2)}. This means that if we were to repeat this sampling process many times, approximately ${confidenceLevel}% of the calculated confidence intervals would contain the true population mean. Used ${distributionUsed} with ${sampleSize - 1} degrees of freedom.`;

      setResult({
        lowerBound,
        upperBound,
        pointEstimate: mean,
        marginOfError,
        confidenceLevel,
        standardError,
        criticalValue,
        interpretation,
        intervalWidth,
        sampleSize,
      });
    } else {
      // Proportion
      const successes = parseFloat(inputs.successes);

      if (isNaN(successes) || successes < 0 || successes > sampleSize) {
        alert('Number of successes must be between 0 and sample size.');
        return;
      }

      const proportion = successes / sampleSize;
      const standardError = Math.sqrt((proportion * (1 - proportion)) / sampleSize);
      const criticalValue = getZCriticalValue(alpha / 2);
      const marginOfError = criticalValue * standardError;
      const lowerBound = Math.max(0, proportion - marginOfError);
      const upperBound = Math.min(1, proportion + marginOfError);
      const intervalWidth = upperBound - lowerBound;

      const interpretation = `We are ${confidenceLevel}% confident that the true population proportion lies between ${(lowerBound * 100).toFixed(2)}% and ${(upperBound * 100).toFixed(2)}%. Based on ${successes} successes out of ${sampleSize} trials, the sample proportion is ${(proportion * 100).toFixed(2)}%. If we repeated this study many times, approximately ${confidenceLevel}% of the confidence intervals would contain the true population proportion.`;

      setResult({
        lowerBound,
        upperBound,
        pointEstimate: proportion,
        marginOfError,
        confidenceLevel,
        standardError,
        criticalValue,
        interpretation,
        intervalWidth,
        sampleSize,
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
      link.download = `confidence-interval-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Confidence Interval Results</title>
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

  // Generate comparison data for different confidence levels
  const comparisonData = result
    ? [90, 95, 99].map((cl) => {
        const alpha = (100 - cl) / 100;
        let criticalValue: number;

        if (inputs.calculationType === 'mean') {
          if (inputs.distributionType === 't' || result.sampleSize < 30) {
            const df = result.sampleSize - 1;
            criticalValue = getTCriticalValue(df, alpha / 2);
          } else {
            criticalValue = getZCriticalValue(alpha / 2);
          }
        } else {
          criticalValue = getZCriticalValue(alpha / 2);
        }

        const marginOfError = criticalValue * result.standardError;
        const lower = result.pointEstimate - marginOfError;
        const upper = result.pointEstimate + marginOfError;

        return {
          level: `${cl}%`,
          lowerBound: inputs.calculationType === 'proportion' ? lower * 100 : lower,
          upperBound: inputs.calculationType === 'proportion' ? upper * 100 : upper,
          pointEstimate: inputs.calculationType === 'proportion' ? result.pointEstimate * 100 : result.pointEstimate,
          width: upper - lower,
          isSelected: cl === result.confidenceLevel,
        };
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
                Calculation Type
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  What do you want to calculate?
                </Label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleInputChange('calculationType', 'mean')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all text-left ${
                      inputs.calculationType === 'mean'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-semibold">Mean CI</div>
                    <div className="text-xs mt-1 opacity-90">
                      Confidence interval for population mean
                    </div>
                  </button>
                  <button
                    onClick={() => handleInputChange('calculationType', 'proportion')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all text-left ${
                      inputs.calculationType === 'proportion'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-semibold">Proportion CI</div>
                    <div className="text-xs mt-1 opacity-90">
                      Confidence interval for population proportion
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
              <div className="space-y-2">
                <Label htmlFor="confidenceLevel" className="text-sm font-medium text-gray-700">
                  Confidence Level (%) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="confidenceLevel"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={inputs.confidenceLevel}
                  onChange={(e) => handleInputChange('confidenceLevel', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="95"
                />
                <div className="flex gap-2 mt-2">
                  {[90, 95, 99].map((level) => (
                    <button
                      key={level}
                      onClick={() => handleInputChange('confidenceLevel', level.toString())}
                      className={`px-3 py-1 text-xs rounded border ${
                        inputs.confidenceLevel === level.toString()
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                      }`}
                    >
                      {level}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sampleSize" className="text-sm font-medium text-gray-700">
                  Sample Size (n) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="sampleSize"
                  type="number"
                  step="1"
                  min="2"
                  value={inputs.sampleSize}
                  onChange={(e) => handleInputChange('sampleSize', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="30"
                />
                <p className="text-xs text-gray-500">Number of observations in sample</p>
              </div>

              {inputs.calculationType === 'mean' ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="sampleMean" className="text-sm font-medium text-gray-700">
                      Sample Mean (x̄) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="sampleMean"
                      type="number"
                      step="any"
                      value={inputs.sampleMean}
                      onChange={(e) => handleInputChange('sampleMean', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="100"
                    />
                    <p className="text-xs text-gray-500">Average of your sample data</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sampleStdDev" className="text-sm font-medium text-gray-700">
                      Sample Std. Deviation (s) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="sampleStdDev"
                      type="number"
                      step="any"
                      min="0"
                      value={inputs.sampleStdDev}
                      onChange={(e) => handleInputChange('sampleStdDev', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="15"
                    />
                    <p className="text-xs text-gray-500">Measure of data spread</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Distribution</Label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleInputChange('distributionType', 't')}
                        className={`flex-1 px-3 py-2 text-sm rounded border ${
                          inputs.distributionType === 't'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                        }`}
                      >
                        t-distribution
                      </button>
                      <button
                        onClick={() => handleInputChange('distributionType', 'normal')}
                        className={`flex-1 px-3 py-2 text-sm rounded border ${
                          inputs.distributionType === 'normal'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                        }`}
                      >
                        Normal (Z)
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">Use t for small samples (n &lt; 30)</p>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="successes" className="text-sm font-medium text-gray-700">
                    Number of Successes <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="successes"
                    type="number"
                    step="1"
                    min="0"
                    value={inputs.successes}
                    onChange={(e) => handleInputChange('successes', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="60"
                  />
                  <p className="text-xs text-gray-500">
                    Number of favorable outcomes (≤ sample size)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Confidence Interval
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          <div className="space-y-6">
            {result ? (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                    <CardContent className="p-6">
                      <p className="text-sm text-green-600 font-medium mb-1">Lower Bound</p>
                      <p className="text-4xl sm:text-5xl font-bold text-green-700 break-all">
                        {inputs.calculationType === 'proportion'
                          ? `${(result.lowerBound * 100).toFixed(2)}%`
                          : result.lowerBound.toFixed(3)}
                      </p>
                      <p className="text-xs text-green-600 mt-2">
                        {result.confidenceLevel}% CI lower limit
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                    <CardContent className="p-6">
                      <p className="text-sm text-blue-600 font-medium mb-1">Upper Bound</p>
                      <p className="text-4xl sm:text-5xl font-bold text-blue-700 break-all">
                        {inputs.calculationType === 'proportion'
                          ? `${(result.upperBound * 100).toFixed(2)}%`
                          : result.upperBound.toFixed(3)}
                      </p>
                      <p className="text-xs text-blue-600 mt-2">
                        {result.confidenceLevel}% CI upper limit
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200">
                    <CardContent className="p-6">
                      <p className="text-sm text-amber-600 font-medium mb-1">Point Estimate</p>
                      <p className="text-4xl sm:text-5xl font-bold text-amber-700 break-all">
                        {inputs.calculationType === 'proportion'
                          ? `${(result.pointEstimate * 100).toFixed(2)}%`
                          : result.pointEstimate.toFixed(3)}
                      </p>
                      <p className="text-xs text-amber-600 mt-2">
                        {inputs.calculationType === 'proportion' ? 'Sample proportion' : 'Sample mean'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
                    <CardContent className="p-6">
                      <p className="text-sm text-purple-600 font-medium mb-1">Margin of Error</p>
                      <p className="text-4xl sm:text-5xl font-bold text-purple-700 break-all">
                        ±
                        {inputs.calculationType === 'proportion'
                          ? `${(result.marginOfError * 100).toFixed(2)}%`
                          : result.marginOfError.toFixed(3)}
                      </p>
                      <p className="text-xs text-purple-600 mt-2">Precision of estimate</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Visualization */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">
                      📊 Confidence Interval Visualization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <div className="flex items-center justify-center gap-4 flex-wrap">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Lower</div>
                          <div className="text-2xl font-bold text-green-700">
                            {inputs.calculationType === 'proportion'
                              ? `${(result.lowerBound * 100).toFixed(2)}%`
                              : result.lowerBound.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-[200px] max-w-md">
                          <div className="relative h-8 bg-gradient-to-r from-green-300 via-amber-300 to-blue-300 rounded-full border-2 border-gray-400">
                            <div
                              className="absolute top-1/2 -translate-y-1/2 w-1 h-10 bg-amber-600 border-2 border-amber-800"
                              style={{ left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}
                            >
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-amber-700">
                                Estimate
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Upper</div>
                          <div className="text-2xl font-bold text-blue-700">
                            {inputs.calculationType === 'proportion'
                              ? `${(result.upperBound * 100).toFixed(2)}%`
                              : result.upperBound.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-600 mb-4">
                      We are {result.confidenceLevel}% confident the true population{' '}
                      {inputs.calculationType === 'proportion' ? 'proportion' : 'mean'} falls within
                      this interval
                    </div>
                  </CardContent>
                </Card>

                {/* Comparison of Confidence Levels */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">
                      📈 Confidence Level Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300} minHeight={250}>
                      <BarChart data={comparisonData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          type="number"
                          stroke="#6b7280"
                          tick={{ fontSize: 12 }}
                          label={{
                            value: inputs.calculationType === 'proportion' ? 'Proportion (%)' : 'Value',
                            position: 'insideBottom',
                            offset: -5,
                          }}
                        />
                        <YAxis
                          type="category"
                          dataKey="level"
                          stroke="#6b7280"
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                          formatter={(value: number) => [
                            inputs.calculationType === 'proportion'
                              ? `${value.toFixed(2)}%`
                              : value.toFixed(2),
                            'Value',
                          ]}
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                          }}
                        />
                        <ReferenceLine
                          x={
                            inputs.calculationType === 'proportion'
                              ? result.pointEstimate * 100
                              : result.pointEstimate
                          }
                          stroke="#f59e0b"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                        <Bar dataKey="lowerBound" stackId="a" fill="#10b981" />
                        <Bar dataKey="upperBound" stackId="a" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-amber-500 rounded"></div>
                        <span>Point Estimate (dashed line)</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Higher confidence levels produce wider intervals (more certainty, less
                        precision)
                      </p>
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
                  </CardContent>
                </Card>

                {/* Statistical Details */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">
                      📋 Statistical Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">Standard Error (SE)</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {result.standardError.toFixed(4)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {inputs.calculationType === 'proportion'
                            ? 'SE = √[p(1-p)/n]'
                            : 'SE = s/√n'}
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">Critical Value</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {result.criticalValue.toFixed(3)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {inputs.calculationType === 'mean' &&
                          (inputs.distributionType === 't' || result.sampleSize < 30)
                            ? `t-value (df=${result.sampleSize - 1})`
                            : 'Z-value'}
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">Interval Width</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {inputs.calculationType === 'proportion'
                            ? `${(result.intervalWidth * 100).toFixed(2)}%`
                            : result.intervalWidth.toFixed(3)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Upper - Lower bound</div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">Sample Size</div>
                        <div className="text-2xl font-bold text-gray-900">{result.sampleSize}</div>
                        <div className="text-xs text-gray-500 mt-1">Number of observations</div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Formula Used:</h4>
                      <div className="font-mono text-sm bg-white p-3 rounded border border-indigo-200 overflow-x-auto">
                        {inputs.calculationType === 'proportion' ? (
                          <>
                            <div>CI = p ± Z × SE</div>
                            <div className="text-xs text-gray-600 mt-2">
                              where p = {(result.pointEstimate * 100).toFixed(2)}%, Z ={' '}
                              {result.criticalValue.toFixed(3)}, SE ={' '}
                              {result.standardError.toFixed(4)}
                            </div>
                          </>
                        ) : (
                          <>
                            <div>CI = x̄ ± t × SE</div>
                            <div className="text-xs text-gray-600 mt-2">
                              where x̄ = {result.pointEstimate.toFixed(2)},{' '}
                              {inputs.distributionType === 't' || result.sampleSize < 30 ? 't' : 'Z'}{' '}
                              = {result.criticalValue.toFixed(3)}, SE ={' '}
                              {result.standardError.toFixed(4)}
                            </div>
                          </>
                        )}
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
                      Enter your values and click "Calculate Confidence Interval" to see results
                    </p>
                    <p className="text-sm text-gray-400">
                      Choose calculation type and input your sample data to begin
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
        calculatorName="Confidence Interval Calculator"
      />
    </div>
  );
}

