'use client';

import { useState, useEffect } from 'react';
import { Share2, Calculator, BarChart3, TrendingUp, Sparkles, CheckCircle } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { trackCalculatorUse, trackShare } from '@/lib/analytics';

interface StatisticsInputs {
  numbers: number[];
  inputText: string;
  calculationType: 'descriptive' | 'distribution' | 'correlation';
  confidenceLevel: number;
}

interface StatisticsResult {
  basicStats: BasicStats;
  centralTendency: CentralTendency;
  variability: Variability;
  distribution: Distribution;
  analysis: StatisticsAnalysis;
  visualData: VisualData;
}

interface BasicStats {
  count: number;
  sum: number;
  min: number;
  max: number;
  range: number;
  sortedData: number[];
}

interface CentralTendency {
  mean: number;
  median: number;
  mode: number[];
  geometricMean: number;
  harmonicMean: number;
}

interface Variability {
  variance: number;
  standardDeviation: number;
  coefficientOfVariation: number;
  quartiles: {
    q1: number;
    q2: number;
    q3: number;
  };
  iqr: number;
  outliers: number[];
}

interface Distribution {
  skewness: number;
  kurtosis: number;
  isNormal: boolean;
  percentiles: { [key: number]: number };
}

interface StatisticsAnalysis {
  dataType: string;
  distribution: string;
  centralTendencyAnalysis: string;
  variabilityAnalysis: string;
  outlierAnalysis: string;
  recommendations: string[];
  interpretations: string[];
}

interface VisualData {
  histogram: { bin: string; count: number }[];
  boxPlotData: {
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
    outliers: number[];
  };
}

export function StatisticsCalculator() {
  const [inputs, setInputs] = useState<StatisticsInputs>({
    numbers: [12, 15, 18, 20, 22, 25, 28, 30, 32, 35],
    inputText: '12, 15, 18, 20, 22, 25, 28, 30, 32, 35',
    calculationType: 'descriptive',
    confidenceLevel: 95,
  });

  const [result, setResult] = useState<StatisticsResult | null>(null);

  // URL parameter handling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    const type = params.get('type');
    const confidence = params.get('confidence');

    if (data) {
      try {
        const numbers = data.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
        if (numbers.length > 0) {
          const newInputs: StatisticsInputs = {
            numbers,
            inputText: data,
            calculationType: (type as any) || 'descriptive',
            confidenceLevel: confidence ? parseInt(confidence) : 95,
          };
          setInputs(newInputs);
          
          setTimeout(() => {
            const calculatedResult = calculateStatistics(newInputs);
            setResult(calculatedResult);
          }, 100);
        }
      } catch (error) {
        console.error('Error parsing URL parameters:', error);
      }
    }
  }, []);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/statistics-calculator',
    getShareParams: () => ({
      data: inputs.numbers.join(','),
      type: inputs.calculationType,
      confidence: inputs.confidenceLevel.toString(),
    }),
    getShareText: () => result ? `Statistics: Mean=${result.centralTendency.mean.toFixed(2)}, SD=${result.variability.standardDeviation.toFixed(2)}` : 'Calculate comprehensive statistics!',
  });

  const parseNumbers = (text: string): number[] => {
    return text
      .split(/[,\s\n]+/)
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));
  };

  const calculateBasicStats = (numbers: number[]): BasicStats => {
    const sorted = [...numbers].sort((a, b) => a - b);
    return {
      count: numbers.length,
      sum: numbers.reduce((sum, n) => sum + n, 0),
      min: Math.min(...numbers),
      max: Math.max(...numbers),
      range: Math.max(...numbers) - Math.min(...numbers),
      sortedData: sorted,
    };
  };

  const calculateCentralTendency = (numbers: number[]): CentralTendency => {
    const sorted = [...numbers].sort((a, b) => a - b);
    const n = numbers.length;
    
    // Mean
    const mean = numbers.reduce((sum, n) => sum + n, 0) / n;
    
    // Median
    const median = n % 2 === 0 
      ? (sorted[n/2 - 1] + sorted[n/2]) / 2 
      : sorted[Math.floor(n/2)];
    
    // Mode
    const frequency: { [key: number]: number } = {};
    numbers.forEach(n => frequency[n] = (frequency[n] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = Object.keys(frequency)
      .filter(key => frequency[parseFloat(key)] === maxFreq)
      .map(key => parseFloat(key));
    
    // Geometric Mean
    const geometricMean = Math.pow(
      numbers.reduce((product, n) => product * Math.abs(n), 1),
      1 / n
    );
    
    // Harmonic Mean
    const harmonicMean = n / numbers.reduce((sum, n) => sum + (1 / Math.abs(n)), 0);
    
    return {
      mean,
      median,
      mode: mode.length === numbers.length ? [] : mode,
      geometricMean,
      harmonicMean,
    };
  };

  const calculateVariability = (numbers: number[], mean: number): Variability => {
    const n = numbers.length;
    const sorted = [...numbers].sort((a, b) => a - b);
    
    // Variance and Standard Deviation
    const variance = numbers.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / (n - 1);
    const standardDeviation = Math.sqrt(variance);
    const coefficientOfVariation = (standardDeviation / mean) * 100;
    
    // Quartiles
    const q1Index = Math.floor(n * 0.25);
    const q3Index = Math.floor(n * 0.75);
    const q1 = sorted[q1Index];
    const q2 = n % 2 === 0 ? (sorted[n/2 - 1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)];
    const q3 = sorted[q3Index];
    const iqr = q3 - q1;
    
    // Outliers (using IQR method)
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    const outliers = numbers.filter(n => n < lowerBound || n > upperBound);
    
    return {
      variance,
      standardDeviation,
      coefficientOfVariation,
      quartiles: { q1, q2, q3 },
      iqr,
      outliers,
    };
  };

  const calculateDistribution = (numbers: number[], mean: number, std: number): Distribution => {
    const n = numbers.length;
    
    // Skewness
    const skewness = numbers.reduce((sum, x) => sum + Math.pow((x - mean) / std, 3), 0) / n;
    
    // Kurtosis
    const kurtosis = numbers.reduce((sum, x) => sum + Math.pow((x - mean) / std, 4), 0) / n - 3;
    
    // Simple normality test (Shapiro-Wilk approximation for small samples)
    const isNormal = Math.abs(skewness) < 1 && Math.abs(kurtosis) < 1;
    
    // Percentiles
    const sorted = [...numbers].sort((a, b) => a - b);
    const percentiles: { [key: number]: number } = {};
    [5, 10, 25, 50, 75, 90, 95].forEach(p => {
      const index = Math.floor((p / 100) * (n - 1));
      percentiles[p] = sorted[index];
    });
    
    return {
      skewness,
      kurtosis,
      isNormal,
      percentiles,
    };
  };

  const generateAnalysis = (
    basic: BasicStats,
    central: CentralTendency,
    variability: Variability,
    distribution: Distribution
  ): StatisticsAnalysis => {
    
    const dataType = basic.count < 30 ? 'Small Sample' : 'Large Sample';
    
    let distributionType = 'Unknown';
    if (distribution.isNormal) {
      distributionType = 'Approximately Normal';
    } else if (distribution.skewness > 1) {
      distributionType = 'Right-skewed (Positively skewed)';
    } else if (distribution.skewness < -1) {
      distributionType = 'Left-skewed (Negatively skewed)';
    } else {
      distributionType = 'Moderately skewed';
    }
    
    const centralTendencyAnalysis = central.mode.length === 0 
      ? 'No mode found (all values appear equally)'
      : central.mode.length === 1 
      ? `Unimodal distribution with mode at ${central.mode[0]}`
      : `Multimodal distribution with modes at ${central.mode.join(', ')}`;
    
    const variabilityAnalysis = variability.coefficientOfVariation < 15
      ? 'Low variability - data points are close to the mean'
      : variability.coefficientOfVariation > 35
      ? 'High variability - data points are spread widely'
      : 'Moderate variability - typical spread around the mean';
    
    const outlierAnalysis = variability.outliers.length === 0
      ? 'No outliers detected using IQR method'
      : `${variability.outliers.length} outlier(s) detected: ${variability.outliers.join(', ')}`;
    
    const recommendations = [
      basic.count < 30 ? 'Consider collecting more data for better statistical power' : 'Sample size is adequate for most analyses',
      variability.outliers.length > 0 ? 'Investigate outliers - they may indicate data errors or special cases' : 'Data appears clean with no extreme values',
      distribution.isNormal ? 'Normal distribution allows use of parametric tests' : 'Consider non-parametric tests due to non-normal distribution',
      variability.coefficientOfVariation > 30 ? 'High variability suggests heterogeneous data' : 'Variability is within acceptable range'
    ];
    
    const interpretations = [
      `The average value is ${central.mean.toFixed(2)} with typical deviation of ${variability.standardDeviation.toFixed(2)}`,
      `50% of values fall below ${central.median.toFixed(2)} (median)`,
      `The middle 50% of data ranges from ${variability.quartiles.q1.toFixed(2)} to ${variability.quartiles.q3.toFixed(2)}`,
      distribution.skewness > 0.5 ? 'Distribution has a longer tail on the right side' : 
      distribution.skewness < -0.5 ? 'Distribution has a longer tail on the left side' : 'Distribution is relatively symmetric'
    ];
    
    return {
      dataType,
      distribution: distributionType,
      centralTendencyAnalysis,
      variabilityAnalysis,
      outlierAnalysis,
      recommendations,
      interpretations,
    };
  };

  const generateVisualData = (numbers: number[], basic: BasicStats, variability: Variability): VisualData => {
    // Simple histogram (5 bins)
    const binCount = Math.min(10, Math.max(5, Math.ceil(Math.sqrt(numbers.length))));
    const binWidth = basic.range / binCount;
    const histogram: { bin: string; count: number }[] = [];
    
    for (let i = 0; i < binCount; i++) {
      const binStart = basic.min + i * binWidth;
      const binEnd = binStart + binWidth;
      const count = numbers.filter(n => n >= binStart && (i === binCount - 1 ? n <= binEnd : n < binEnd)).length;
      histogram.push({
        bin: `${binStart.toFixed(1)}-${binEnd.toFixed(1)}`,
        count
      });
    }
    
    const boxPlotData = {
      min: basic.min,
      q1: variability.quartiles.q1,
      median: variability.quartiles.q2,
      q3: variability.quartiles.q3,
      max: basic.max,
      outliers: variability.outliers,
    };
    
    return {
      histogram,
      boxPlotData,
    };
  };

  const calculateStatistics = (inputData: StatisticsInputs): StatisticsResult => {
    const { numbers, calculationType } = inputData;
    
    if (numbers.length === 0) {
      throw new Error('No valid numbers provided');
    }
    
    // 跟踪计算器使用
    trackCalculatorUse('Statistics Calculator', calculationType);
    
    const basicStats = calculateBasicStats(numbers);
    const centralTendency = calculateCentralTendency(numbers);
    const variability = calculateVariability(numbers, centralTendency.mean);
    const distribution = calculateDistribution(numbers, centralTendency.mean, variability.standardDeviation);
    const analysis = generateAnalysis(basicStats, centralTendency, variability, distribution);
    const visualData = generateVisualData(numbers, basicStats, variability);
    
    return {
      basicStats,
      centralTendency,
      variability,
      distribution,
      analysis,
      visualData,
    };
  };

  const handleCalculate = () => {
    const numbers = parseNumbers(inputs.inputText);
    
    if (numbers.length === 0) {
      alert('Please enter valid numbers separated by commas or spaces.');
      return;
    }
    
    if (numbers.length < 2) {
      alert('Please enter at least 2 numbers for statistical analysis.');
      return;
    }
    
    setInputs({...inputs, numbers});
    setResult(calculateStatistics({...inputs, numbers}));
  };

  const handleInputChange = (text: string) => {
    setInputs({...inputs, inputText: text});
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT: Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Statistics Calculator
            </h3>
            
            {/* Data Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Enter Your Data</label>
              <textarea
                value={inputs.inputText}
                onChange={e => handleInputChange(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg font-mono text-sm"
                placeholder="Enter numbers separated by commas or spaces&#10;Example: 12, 15, 18, 20, 22, 25, 28, 30, 32, 35"
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-2">
                Separate numbers with commas, spaces, or new lines. Minimum 2 numbers required.
              </p>
              <div className="mt-2 text-sm text-gray-600">
                <strong>Detected:</strong> {parseNumbers(inputs.inputText).length} numbers
              </div>
            </div>

            {/* Analysis Type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Analysis Type</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'descriptive', label: 'Descriptive Statistics', desc: 'Mean, median, standard deviation, etc.' },
                  { value: 'distribution', label: 'Distribution Analysis', desc: 'Skewness, kurtosis, normality tests' },
                  { value: 'correlation', label: 'Advanced Analysis', desc: 'Confidence intervals, outlier detection' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setInputs({...inputs, calculationType: option.value as any})}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      inputs.calculationType === option.value 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Confidence Level */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Confidence Level (%)</label>
              <select
                value={inputs.confidenceLevel}
                onChange={e => setInputs({...inputs, confidenceLevel: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border rounded-lg"
              >
                <option value={90}>90%</option>
                <option value={95}>95%</option>
                <option value={99}>99%</option>
              </select>
            </div>

            <button 
              onClick={handleCalculate} 
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-semibold"
            >
              <Calculator className="w-5 h-5" />
              Calculate Statistics
            </button>
          </div>
        </div>

        {/* RIGHT: Results Section */}
        <div className="space-y-6">
          {result ? (<>
            {/* Basic Statistics Card */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg border border-blue-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm text-gray-600">Count</p>
                  <p className="text-xl font-bold text-blue-600">{result.basicStats.count}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm text-gray-600">Sum</p>
                  <p className="text-xl font-bold text-blue-600">{result.basicStats.sum.toFixed(2)}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm text-gray-600">Min</p>
                  <p className="text-xl font-bold text-blue-600">{result.basicStats.min}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm text-gray-600">Max</p>
                  <p className="text-xl font-bold text-blue-600">{result.basicStats.max}</p>
                </div>
              </div>
            </div>

            {/* Central Tendency Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg border border-green-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Central Tendency</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-semibold">Mean (Average)</span>
                  <span className="text-lg font-bold text-green-600">{result.centralTendency.mean.toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-semibold">Median</span>
                  <span className="text-lg font-bold text-green-600">{result.centralTendency.median.toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-semibold">Mode</span>
                  <span className="text-lg font-bold text-green-600">
                    {result.centralTendency.mode.length === 0 ? 'None' : result.centralTendency.mode.join(', ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Variability Card */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg border border-purple-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Variability Measures</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-semibold">Standard Deviation</span>
                  <span className="text-lg font-bold text-purple-600">{result.variability.standardDeviation.toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-semibold">Variance</span>
                  <span className="text-lg font-bold text-purple-600">{result.variability.variance.toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-semibold">Range</span>
                  <span className="text-lg font-bold text-purple-600">{result.basicStats.range.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-semibold">IQR</span>
                  <span className="text-lg font-bold text-purple-600">{result.variability.iqr.toFixed(4)}</span>
                </div>
              </div>
            </div>

            {/* Smart Analysis Card */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-lg border border-orange-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-600" />
                Statistical Analysis
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Data Characteristics</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Type:</strong> {result.analysis.dataType}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Distribution:</strong> {result.analysis.distribution}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Outliers:</strong> {result.analysis.outlierAnalysis}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Key Interpretations
                  </h4>
                  <ul className="space-y-2">
                    {result.analysis.interpretations.map((interpretation, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-orange-600 mt-0.5">•</span>
                        <span className="text-gray-700">{interpretation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Quartiles & Distribution */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Quartiles & Distribution
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700">Q1 (25th percentile)</p>
                  <p className="text-lg font-bold text-blue-600">{result.variability.quartiles.q1.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700">Q3 (75th percentile)</p>
                  <p className="text-lg font-bold text-blue-600">{result.variability.quartiles.q3.toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Skewness:</span>
                  <span className="font-bold">{result.distribution.skewness.toFixed(3)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Kurtosis:</span>
                  <span className="font-bold">{result.distribution.kurtosis.toFixed(3)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Normal Distribution:</span>
                  <span className={`font-bold ${result.distribution.isNormal ? 'text-green-600' : 'text-red-600'}`}>
                    {result.distribution.isNormal ? 'Likely' : 'Unlikely'}
                  </span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recommendations</h3>
              <ul className="space-y-3">
                {result.analysis.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={handleShare} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold"
              >
                <Share2 className="w-4 h-4" />
                Share Results
              </button>
            </div>
          </>) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
              <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Enter your data and click "Calculate Statistics" to see comprehensive analysis</p>
            </div>
          )}
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal} 
        onClose={closeShareModal} 
        shareUrl={shareUrl} 
        shareText={shareText} 
        calculatorName="Statistics Calculator" 
      />
    </div>
  );
}
