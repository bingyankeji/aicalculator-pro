'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Share2, Printer, TrendingUp, Users, AlertCircle } from 'lucide-react';
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
  BarChart,
  Bar,
  Legend,
} from 'recharts';

interface SampleSizeInputs {
  calculationType: 'proportion' | 'mean' | 'abtest';
  confidenceLevel: string;
  marginError: string;
  populationSize: string;
  expectedProportion: string;
  populationStdDev: string;
  effectSize: string;
  power: string;
  useFiniteCorrection: boolean;
}

interface SampleSizeResult {
  sampleSize: number;
  adjustedSampleSize: number;
  responseRate: number;
  actualMarginError: number;
  confidenceLevel: number;
  statisticalPower: number;
  recommendations: string[];
  costEstimate: {
    low: number;
    medium: number;
    high: number;
  };
}

const SCENARIO_TEMPLATES = [
  {
    name: 'Market Research Survey',
    type: 'proportion' as const,
    confidence: '95',
    margin: '5',
    proportion: '50',
    population: '100000',
  },
  {
    name: 'User Experience Study',
    type: 'proportion' as const,
    confidence: '90',
    margin: '10',
    proportion: '50',
    population: '10000',
  },
  {
    name: 'Clinical Trial',
    type: 'mean' as const,
    confidence: '95',
    margin: '3',
    stdDev: '15',
    population: '1000000',
  },
  {
    name: 'A/B Testing',
    type: 'abtest' as const,
    confidence: '95',
    power: '80',
    effectSize: '0.5',
    proportion: '50',
  },
];

export default function SampleSizeCalculator() {
  const [inputs, setInputs] = useState<SampleSizeInputs>({
    calculationType: 'proportion',
    confidenceLevel: '95',
    marginError: '5',
    populationSize: '100000',
    expectedProportion: '50',
    populationStdDev: '15',
    effectSize: '0.5',
    power: '80',
    useFiniteCorrection: true,
  });

  const [result, setResult] = useState<SampleSizeResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/sample-size-calculator',
    getShareParams: () => ({
      type: inputs.calculationType,
      cl: inputs.confidenceLevel,
      me: inputs.marginError,
      p: inputs.expectedProportion,
    }),
    getShareText: () => {
      if (result) {
        return `For a study with ${inputs.confidenceLevel}% confidence and ${inputs.marginError}% margin of error, you need ${result.sampleSize} participants. Calculate your sample size!`;
      }
      return 'Calculate the perfect sample size for your research or survey with statistical precision!';
    },
  });

  const handleInputChange = (
    field: keyof SampleSizeInputs,
    value: string | boolean | 'proportion' | 'mean' | 'abtest'
  ) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const applyTemplate = (template: typeof SCENARIO_TEMPLATES[0]) => {
    setInputs((prev) => ({
      ...prev,
      calculationType: template.type,
      confidenceLevel: template.confidence,
      marginError: template.margin,
      expectedProportion: template.proportion || prev.expectedProportion,
      populationSize: template.population || prev.populationSize,
      populationStdDev: (template as any).stdDev || prev.populationStdDev,
      power: (template as any).power || prev.power,
      effectSize: (template as any).effectSize || prev.effectSize,
    }));
  };

  const getZScore = (confidenceLevel: number): number => {
    const zScores: { [key: number]: number } = {
      90: 1.645,
      95: 1.96,
      99: 2.576,
      99.9: 3.291,
    };
    return zScores[confidenceLevel] || 1.96;
  };

  const calculate = () => {
    const confidence = parseFloat(inputs.confidenceLevel);
    const margin = parseFloat(inputs.marginError) / 100;
    const population = parseFloat(inputs.populationSize);
    const proportion = parseFloat(inputs.expectedProportion) / 100;
    const stdDev = parseFloat(inputs.populationStdDev);
    const effectSize = parseFloat(inputs.effectSize);
    const power = parseFloat(inputs.power) / 100;

    if (!confidence || !margin) {
      alert('Please fill in required fields with valid values.');
      return;
    }

    const z = getZScore(confidence);
    let sampleSize = 0;

    // Calculate based on calculation type
    if (inputs.calculationType === 'proportion') {
      // Sample size for proportion estimation
      // n = (Z^2 * p * (1-p)) / E^2
      sampleSize = (Math.pow(z, 2) * proportion * (1 - proportion)) / Math.pow(margin, 2);
    } else if (inputs.calculationType === 'mean') {
      // Sample size for mean estimation
      // n = (Z^2 * σ^2) / E^2
      if (!stdDev) {
        alert('Please enter population standard deviation for mean estimation.');
        return;
      }
      sampleSize = (Math.pow(z, 2) * Math.pow(stdDev, 2)) / Math.pow(margin * stdDev, 2);
    } else if (inputs.calculationType === 'abtest') {
      // Sample size for A/B testing (per group)
      // n = 2 * (Zα/2 + Zβ)^2 * p * (1-p) / δ^2
      if (!effectSize || !power) {
        alert('Please enter effect size and power for A/B testing.');
        return;
      }
      const zBeta = getZScore(power * 100); // Convert power to confidence level equivalent
      sampleSize =
        (2 * Math.pow(z + zBeta, 2) * proportion * (1 - proportion)) / Math.pow(effectSize, 2);
    }

    // Apply finite population correction if needed
    let adjustedSampleSize = sampleSize;
    if (inputs.useFiniteCorrection && population > 0 && population < 1000000) {
      // n_adjusted = n / (1 + (n - 1) / N)
      adjustedSampleSize = sampleSize / (1 + (sampleSize - 1) / population);
    }

    // Round up to nearest integer
    sampleSize = Math.ceil(sampleSize);
    adjustedSampleSize = Math.ceil(adjustedSampleSize);

    // Account for expected response rate (assume 70% for surveys)
    const responseRate = inputs.calculationType === 'abtest' ? 100 : 70;
    const actualSampleSize =
      responseRate < 100 ? Math.ceil(adjustedSampleSize / (responseRate / 100)) : adjustedSampleSize;

    // Calculate actual margin of error with the calculated sample size
    let actualMargin = margin;
    if (inputs.calculationType === 'proportion') {
      actualMargin = z * Math.sqrt((proportion * (1 - proportion)) / adjustedSampleSize);
    }

    // Generate recommendations
    const recommendations: string[] = [];

    if (adjustedSampleSize < 30) {
      recommendations.push(
        '⚠️ Sample size is very small (n < 30). Consider increasing your sample or using non-parametric methods.'
      );
    } else if (adjustedSampleSize < 100) {
      recommendations.push(
        '📊 Sample size is adequate for basic analysis but may lack power for subgroup comparisons.'
      );
    } else if (adjustedSampleSize < 500) {
      recommendations.push(
        '✅ Good sample size for most standard analyses and subgroup comparisons.'
      );
    } else {
      recommendations.push(
        '🎯 Excellent sample size with high statistical power and precise estimates.'
      );
    }

    if (margin > 0.1) {
      recommendations.push(
        '⚠️ Large margin of error (>10%). Results will have lower precision. Consider increasing sample size.'
      );
    } else if (margin > 0.05) {
      recommendations.push(
        '📊 Moderate margin of error (5-10%). Acceptable for exploratory research.'
      );
    } else {
      recommendations.push('✅ Small margin of error (<5%). High precision estimates.');
    }

    if (inputs.calculationType === 'proportion' && (proportion < 0.1 || proportion > 0.9)) {
      recommendations.push(
        '💡 For extreme proportions (<10% or >90%), you may need larger samples to detect effects reliably.'
      );
    }

    if (inputs.calculationType === 'abtest') {
      recommendations.push(
        `🔬 For A/B testing, this is the sample size needed PER GROUP (total: ${actualSampleSize * 2}).`
      );
      recommendations.push(
        '⏱️ Run tests long enough to account for day-of-week and time-of-day variations.'
      );
    }

    recommendations.push(
      '📈 Always collect slightly more than calculated to account for incomplete responses and outliers.'
    );

    // Cost estimates (per participant)
    const costEstimate = {
      low: actualSampleSize * 2, // Online survey: $2 per response
      medium: actualSampleSize * 10, // Phone interview: $10 per response
      high: actualSampleSize * 50, // In-person interview: $50 per response
    };

    setResult({
      sampleSize: sampleSize,
      adjustedSampleSize: actualSampleSize,
      responseRate: responseRate,
      actualMarginError: actualMargin * 100,
      confidenceLevel: confidence,
      statisticalPower: inputs.calculationType === 'abtest' ? power * 100 : 0,
      recommendations,
      costEstimate,
    });
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
      link.download = `sample-size-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Sample Size Analysis Results</title>
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

  // Generate chart data for margin of error vs sample size
  const marginErrorData = result
    ? [50, 100, 200, 384, 500, 800, 1000, 1500, 2000].map((n) => {
        const z = getZScore(parseFloat(inputs.confidenceLevel));
        const p = parseFloat(inputs.expectedProportion) / 100;
        const margin = z * Math.sqrt((p * (1 - p)) / n) * 100;
        return {
          sampleSize: n,
          marginError: parseFloat(margin.toFixed(2)),
        };
      })
    : [];

  // Generate chart data for confidence levels comparison
  const confidenceComparisonData = result
    ? [90, 95, 99].map((conf) => {
        const z = getZScore(conf);
        const p = parseFloat(inputs.expectedProportion) / 100;
        const margin = parseFloat(inputs.marginError) / 100;
        const n = Math.ceil((Math.pow(z, 2) * p * (1 - p)) / Math.pow(margin, 2));
        return {
          confidence: `${conf}%`,
          sampleSize: n,
        };
      })
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          {/* Scenario Templates */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Quick Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {SCENARIO_TEMPLATES.map((template, index) => (
                <button
                  key={index}
                  onClick={() => applyTemplate(template)}
                  className="w-full px-4 py-2 text-left text-sm bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  {template.name}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                Calculation Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Calculation Type <span className="text-red-500">*</span>
                </Label>
                <select
                  value={inputs.calculationType}
                  onChange={(e) =>
                    handleInputChange(
                      'calculationType',
                      e.target.value as 'proportion' | 'mean' | 'abtest'
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="proportion">Proportion Estimation</option>
                  <option value="mean">Mean Estimation</option>
                  <option value="abtest">A/B Testing</option>
                </select>
                <p className="text-xs text-gray-500">
                  {inputs.calculationType === 'proportion' && 'For surveys with yes/no or categorical responses'}
                  {inputs.calculationType === 'mean' && 'For continuous numerical measurements'}
                  {inputs.calculationType === 'abtest' && 'For comparing two groups or variants'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confidenceLevel" className="text-sm font-medium text-gray-700">
                  Confidence Level <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-3">
                  <input
                    id="confidenceLevel"
                    type="range"
                    min="80"
                    max="99.9"
                    step="0.1"
                    value={inputs.confidenceLevel}
                    onChange={(e) => handleInputChange('confidenceLevel', e.target.value)}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-lg font-semibold text-blue-600 w-16 text-right">
                    {parseFloat(inputs.confidenceLevel).toFixed(1)}%
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Higher confidence requires larger sample sizes
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="marginError" className="text-sm font-medium text-gray-700">
                  Margin of Error (%) <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-3">
                  <input
                    id="marginError"
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={inputs.marginError}
                    onChange={(e) => handleInputChange('marginError', e.target.value)}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-lg font-semibold text-blue-600 w-16 text-right">
                    ±{parseFloat(inputs.marginError).toFixed(1)}%
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Smaller margin requires larger sample sizes
                </p>
              </div>

              {inputs.calculationType === 'proportion' && (
                <div className="space-y-2">
                  <Label htmlFor="expectedProportion" className="text-sm font-medium text-gray-700">
                    Expected Proportion (%)
                  </Label>
                  <input
                    id="expectedProportion"
                    type="number"
                    min="1"
                    max="99"
                    step="1"
                    value={inputs.expectedProportion}
                    onChange={(e) => handleInputChange('expectedProportion', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500">
                    Use 50% if unknown (most conservative estimate)
                  </p>
                </div>
              )}

              {inputs.calculationType === 'mean' && (
                <div className="space-y-2">
                  <Label htmlFor="populationStdDev" className="text-sm font-medium text-gray-700">
                    Population Std. Deviation <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="populationStdDev"
                    type="number"
                    min="0"
                    step="0.1"
                    value={inputs.populationStdDev}
                    onChange={(e) => handleInputChange('populationStdDev', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="15"
                  />
                  <p className="text-xs text-gray-500">
                    Estimate from pilot study or literature
                  </p>
                </div>
              )}

              {inputs.calculationType === 'abtest' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="effectSize" className="text-sm font-medium text-gray-700">
                      Effect Size <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="effectSize"
                      type="number"
                      min="0.01"
                      max="2"
                      step="0.01"
                      value={inputs.effectSize}
                      onChange={(e) => handleInputChange('effectSize', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.5"
                    />
                    <p className="text-xs text-gray-500">
                      Small: 0.2, Medium: 0.5, Large: 0.8
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="power" className="text-sm font-medium text-gray-700">
                      Statistical Power (%)
                    </Label>
                    <input
                      id="power"
                      type="number"
                      min="50"
                      max="99"
                      step="1"
                      value={inputs.power}
                      onChange={(e) => handleInputChange('power', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500">
                      Typically 80% (probability of detecting effect)
                    </p>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="populationSize" className="text-sm font-medium text-gray-700">
                  Population Size (Optional)
                </Label>
                <input
                  id="populationSize"
                  type="number"
                  min="0"
                  step="1"
                  value={inputs.populationSize}
                  onChange={(e) => handleInputChange('populationSize', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="100000"
                />
                <p className="text-xs text-gray-500">
                  Leave large (1M+) if population is unknown
                </p>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="useFiniteCorrection"
                  checked={inputs.useFiniteCorrection}
                  onChange={(e) => handleInputChange('useFiniteCorrection', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <Label htmlFor="useFiniteCorrection" className="text-sm text-gray-700 cursor-pointer">
                  Apply finite population correction
                </Label>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Sample Size
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
                      <p className="text-sm text-blue-600 font-medium mb-1 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Required Sample Size
                      </p>
                      <p className="text-4xl sm:text-5xl font-bold text-blue-700 break-all">
                        {result.adjustedSampleSize.toLocaleString()}
                      </p>
                      <p className="text-xs text-blue-600 mt-2">
                        {result.responseRate < 100
                          ? `Accounting for ${result.responseRate}% response rate`
                          : 'Participants needed'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                    <CardContent className="p-6">
                      <p className="text-sm text-green-600 font-medium mb-1">
                        Confidence Level
                      </p>
                      <p className="text-4xl sm:text-5xl font-bold text-green-700">
                        {result.confidenceLevel}%
                      </p>
                      <p className="text-xs text-green-600 mt-2">
                        ±{result.actualMarginError.toFixed(2)}% margin of error
                      </p>
                    </CardContent>
                  </Card>

                  {inputs.calculationType === 'abtest' && (
                    <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
                      <CardContent className="p-6">
                        <p className="text-sm text-purple-600 font-medium mb-1">
                          Total Sample (Both Groups)
                        </p>
                        <p className="text-4xl sm:text-5xl font-bold text-purple-700">
                          {(result.adjustedSampleSize * 2).toLocaleString()}
                        </p>
                        <p className="text-xs text-purple-600 mt-2">
                          {result.adjustedSampleSize.toLocaleString()} per group
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  <Card className="shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200">
                    <CardContent className="p-6">
                      <p className="text-sm text-amber-600 font-medium mb-1">
                        Estimated Cost Range
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-amber-700">
                        ${result.costEstimate.low.toLocaleString()} - ${result.costEstimate.high.toLocaleString()}
                      </p>
                      <p className="text-xs text-amber-600 mt-2">
                        Based on typical research costs
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Margin of Error Curve */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">
                      📈 Sample Size vs. Margin of Error
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300} minHeight={250}>
                      <LineChart data={marginErrorData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="sampleSize"
                          stroke="#6b7280"
                          tick={{ fontSize: 12 }}
                          label={{ value: 'Sample Size', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis
                          stroke="#6b7280"
                          tick={{ fontSize: 12 }}
                          label={{
                            value: 'Margin of Error (%)',
                            angle: -90,
                            position: 'insideLeft',
                          }}
                        />
                        <Tooltip
                          formatter={(value: number) => [`${value.toFixed(2)}%`, 'Margin of Error']}
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="marginError"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ fill: '#3b82f6', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <p className="text-sm text-gray-600 mt-4">
                      This curve shows how increasing sample size reduces margin of error. Notice
                      diminishing returns after ~400 participants.
                    </p>
                  </CardContent>
                </Card>

                {/* Confidence Level Comparison */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">
                      📊 Confidence Level Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300} minHeight={250}>
                      <BarChart data={confidenceComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="confidence" stroke="#6b7280" tick={{ fontSize: 12 }} />
                        <YAxis
                          stroke="#6b7280"
                          tick={{ fontSize: 12 }}
                          label={{
                            value: 'Sample Size',
                            angle: -90,
                            position: 'insideLeft',
                          }}
                        />
                        <Tooltip
                          formatter={(value: number) => [value.toLocaleString(), 'Sample Size']}
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Bar dataKey="sampleSize" fill="#3b82f6" name="Required Sample Size" />
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="text-sm text-gray-600 mt-4">
                      Higher confidence levels require larger samples. 95% is the standard in most
                      research.
                    </p>
                  </CardContent>
                </Card>

                {/* Cost-Benefit Analysis */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">
                      💰 Cost-Benefit Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                        <div>
                          <p className="font-semibold text-gray-900">Online Survey</p>
                          <p className="text-sm text-gray-600">Quick turnaround, lower cost</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-700">
                            ${result.costEstimate.low.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-600">~$2 per response</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                        <div>
                          <p className="font-semibold text-gray-900">Phone Interview</p>
                          <p className="text-sm text-gray-600">Better quality, moderate cost</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-700">
                            ${result.costEstimate.medium.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-600">~$10 per response</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                        <div>
                          <p className="font-semibold text-gray-900">In-Person Interview</p>
                          <p className="text-sm text-gray-600">Highest quality, premium cost</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-700">
                            ${result.costEstimate.high.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-600">~$50 per response</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="shadow-lg border-2 border-blue-200 bg-blue-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
                      💡 Recommendations & Best Practices
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Parameter Reference Table */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">
                      📋 Industry Parameter Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto overflow-y-hidden">
                      <table className="w-full min-w-[500px] text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-300">
                            <th className="px-4 py-3 text-left font-semibold text-gray-900">
                              Research Type
                            </th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-900">
                              Confidence
                            </th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-900">
                              Margin
                            </th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-900">
                              Typical N
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200 hover:bg-blue-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">
                              Political Polling
                            </td>
                            <td className="px-4 py-3 text-center text-gray-700">95%</td>
                            <td className="px-4 py-3 text-center text-gray-700">±3%</td>
                            <td className="px-4 py-3 text-center text-gray-700">~1,000</td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-blue-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">
                              Market Research
                            </td>
                            <td className="px-4 py-3 text-center text-gray-700">95%</td>
                            <td className="px-4 py-3 text-center text-gray-700">±5%</td>
                            <td className="px-4 py-3 text-center text-gray-700">~400</td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-blue-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">
                              UX Research
                            </td>
                            <td className="px-4 py-3 text-center text-gray-700">90%</td>
                            <td className="px-4 py-3 text-center text-gray-700">±10%</td>
                            <td className="px-4 py-3 text-center text-gray-700">~100</td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-blue-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">
                              Clinical Trial
                            </td>
                            <td className="px-4 py-3 text-center text-gray-700">99%</td>
                            <td className="px-4 py-3 text-center text-gray-700">±2%</td>
                            <td className="px-4 py-3 text-center text-gray-700">~2,500</td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-blue-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">A/B Testing</td>
                            <td className="px-4 py-3 text-center text-gray-700">95%</td>
                            <td className="px-4 py-3 text-center text-gray-700">—</td>
                            <td className="px-4 py-3 text-center text-gray-700">500-5,000</td>
                          </tr>
                          <tr className="hover:bg-blue-50">
                            <td className="px-4 py-3 text-gray-900 font-medium">
                              Exploratory Research
                            </td>
                            <td className="px-4 py-3 text-center text-gray-700">90%</td>
                            <td className="px-4 py-3 text-center text-gray-700">±10%</td>
                            <td className="px-4 py-3 text-center text-gray-700">~70</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Important Notes */}
                <Card className="shadow-lg border-2 border-amber-200 bg-amber-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                      Important Considerations
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>Response Rates:</strong> Typical response rates are 20-40% for
                        online surveys, 40-60% for phone surveys, and 60-80% for in-person
                        interviews. Plan your initial contact list accordingly.
                      </p>
                      <p>
                        <strong>Subgroup Analysis:</strong> If you plan to analyze subgroups
                        separately, ensure each subgroup has adequate sample size (typically n ≥
                        30-50).
                      </p>
                      <p>
                        <strong>Non-Response Bias:</strong> Large samples don't guarantee accuracy
                        if respondents differ systematically from non-respondents. Consider
                        follow-up strategies.
                      </p>
                      <p>
                        <strong>Statistical vs. Practical Significance:</strong> With very large
                        samples, you may detect statistically significant but practically trivial
                        differences. Consider effect sizes.
                      </p>
                      <p>
                        <strong>Budget Constraints:</strong> Balance statistical rigor with
                        practical constraints. Sometimes a smaller well-executed study beats a
                        larger poorly-executed one.
                      </p>
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
                    <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg mb-4">
                      Select your study parameters and click "Calculate Sample Size" to see results
                    </p>
                    <p className="text-sm text-gray-400">
                      Try one of the quick templates above to get started
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
        calculatorName="Sample Size Calculator"
      />
    </div>
  );
}

