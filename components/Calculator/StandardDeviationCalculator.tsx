'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Minus, TrendingUp, BarChart3, Calculator, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface StandardDeviationResult {
  mean: number;
  variance: number;
  populationStdDev: number;
  sampleStdDev: number;
  count: number;
  sum: number;
  min: number;
  max: number;
  range: number;
  sortedData: number[];
  deviations: number[];
  squaredDeviations: number[];
  outliers: number[];
  // Enhanced statistics
  median: number;
  mode: number[];
  q1: number;
  q3: number;
  iqr: number;
  skewness: number;
  kurtosis: number;
  coefficientOfVariation: number;
  // Percentiles
  percentile25: number;
  percentile75: number;
  percentile90: number;
  percentile95: number;
  // Z-scores
  zScores: number[];
  // Confidence intervals
  confidenceInterval95: { lower: number; upper: number };
  confidenceInterval99: { lower: number; upper: number };
}

export function StandardDeviationCalculator() {
  const [numbers, setNumbers] = useState<string[]>(['10', '20', '30', '40', '50']);
  const [result, setResult] = useState<StandardDeviationResult | null>(null);
  const [calculationType, setCalculationType] = useState<'population' | 'sample'>('sample');
  const [bulkInput, setBulkInput] = useState<string>('');
  const [inputMode, setInputMode] = useState<'individual' | 'bulk'>('individual');

  // Add new number input
  const addNumber = () => {
    setNumbers([...numbers, '']);
  };

  // Remove number input
  const removeNumber = (index: number) => {
    if (numbers.length > 1) {
      setNumbers(numbers.filter((_, i) => i !== index));
    }
  };

  // Update number value
  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  // Helper function to calculate percentile
  const calculatePercentile = (sortedData: number[], percentile: number): number => {
    const index = (percentile / 100) * (sortedData.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index % 1;
    
    if (upper >= sortedData.length) return sortedData[sortedData.length - 1];
    return sortedData[lower] * (1 - weight) + sortedData[upper] * weight;
  };

  // Helper function to calculate mode
  const calculateMode = (data: number[]): number[] => {
    const frequency: { [key: number]: number } = {};
    data.forEach(val => {
      frequency[val] = (frequency[val] || 0) + 1;
    });
    
    const maxFreq = Math.max(...Object.values(frequency));
    return Object.keys(frequency)
      .filter(key => frequency[Number(key)] === maxFreq)
      .map(Number);
  };

  // Calculate standard deviation with enhanced statistics
  const calculateStandardDeviation = (data: number[], type: 'population' | 'sample'): StandardDeviationResult => {
    const sorted = [...data].sort((a, b) => a - b);
    const count = data.length;
    const sum = data.reduce((acc, val) => acc + val, 0);
    const mean = sum / count;

    // Calculate deviations from mean
    const deviations = data.map(val => val - mean);
    const squaredDeviations = deviations.map(d => d * d);
    const sumSquaredDeviations = squaredDeviations.reduce((acc, val) => acc + val, 0);

    // Variance
    const variance = type === 'population' 
      ? sumSquaredDeviations / count 
      : sumSquaredDeviations / (count - 1);

    // Standard Deviation
    const populationStdDev = Math.sqrt(sumSquaredDeviations / count);
    const sampleStdDev = Math.sqrt(sumSquaredDeviations / (count - 1));
    const currentStdDev = type === 'population' ? populationStdDev : sampleStdDev;

    // Median
    const median = count % 2 === 0 
      ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2
      : sorted[Math.floor(count / 2)];

    // Mode
    const mode = calculateMode(data);

    // Quartiles
    const q1 = calculatePercentile(sorted, 25);
    const q3 = calculatePercentile(sorted, 75);
    const iqr = q3 - q1;

    // Percentiles
    const percentile25 = q1;
    const percentile75 = q3;
    const percentile90 = calculatePercentile(sorted, 90);
    const percentile95 = calculatePercentile(sorted, 95);

    // Detect outliers (using IQR method)
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    const outliers = sorted.filter(val => val < lowerBound || val > upperBound);

    // Skewness (Pearson's moment coefficient of skewness)
    const cubedDeviations = deviations.map(d => Math.pow(d, 3));
    const sumCubedDeviations = cubedDeviations.reduce((acc, val) => acc + val, 0);
    const skewness = (sumCubedDeviations / count) / Math.pow(currentStdDev, 3);

    // Kurtosis (excess kurtosis)
    const fourthDeviations = deviations.map(d => Math.pow(d, 4));
    const sumFourthDeviations = fourthDeviations.reduce((acc, val) => acc + val, 0);
    const kurtosis = (sumFourthDeviations / count) / Math.pow(currentStdDev, 4) - 3;

    // Coefficient of Variation
    const coefficientOfVariation = (currentStdDev / Math.abs(mean)) * 100;

    // Z-scores
    const zScores = data.map(val => (val - mean) / currentStdDev);

    // Confidence intervals (assuming normal distribution)
    const standardError = currentStdDev / Math.sqrt(count);
    const tValue95 = 1.96; // Approximate for large samples
    const tValue99 = 2.576; // Approximate for large samples
    
    const confidenceInterval95 = {
      lower: mean - tValue95 * standardError,
      upper: mean + tValue95 * standardError
    };
    
    const confidenceInterval99 = {
      lower: mean - tValue99 * standardError,
      upper: mean + tValue99 * standardError
    };

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    return {
      mean,
      variance,
      populationStdDev,
      sampleStdDev,
      count,
      sum,
      min,
      max,
      range,
      sortedData: sorted,
      deviations,
      squaredDeviations,
      outliers,
      // Enhanced statistics
      median,
      mode,
      q1,
      q3,
      iqr,
      skewness,
      kurtosis,
      coefficientOfVariation,
      // Percentiles
      percentile25,
      percentile75,
      percentile90,
      percentile95,
      // Z-scores
      zScores,
      // Confidence intervals
      confidenceInterval95,
      confidenceInterval99,
    };
  };

  useEffect(() => {
    const validNumbers = numbers
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n));

    if (validNumbers.length > 0) {
      const stats = calculateStandardDeviation(validNumbers, calculationType);
      setResult(stats);
    } else {
      setResult(null);
    }
  }, [numbers, calculationType]);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/standard-deviation-calculator',
    getShareParams: () => ({
      n: numbers.filter(n => n.trim()).join(','),
      t: calculationType,
    }),
    getShareText: () => {
      if (!result) return 'Check out my standard deviation calculation!';
      const stdDev = calculationType === 'population' ? result.populationStdDev : result.sampleStdDev;
      return `Mean: ${result.mean.toFixed(2)} | ${calculationType === 'population' ? 'Population' : 'Sample'} Std Dev: ${stdDev.toFixed(2)}`;
    },
  });

  const quickExamples = [
    { label: 'Test Scores', values: ['85', '90', '78', '92', '88', '87', '91'] },
    { label: 'Heights (cm)', values: ['165', '170', '175', '168', '172', '169', '171'] },
    { label: 'Prices ($)', values: ['9.99', '12.50', '8.75', '11.25', '10.00', '9.50'] },
    { label: 'Simple', values: ['1', '2', '3', '4', '5', '6'] },
  ];

  const loadExample = (values: string[]) => {
    setNumbers(values);
    setInputMode('individual');
    setBulkInput('');
  };

  // Handle bulk input processing
  const processBulkInput = (input: string) => {
    // Split by various delimiters: comma, space, newline, tab
    const values = input
      .split(/[,\s\n\t]+/)
      .map(v => v.trim())
      .filter(v => v !== '' && !isNaN(parseFloat(v)));
    
    setNumbers(values);
  };

  const handleBulkInputChange = (value: string) => {
    setBulkInput(value);
    if (value.trim()) {
      processBulkInput(value);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Enter Your Data</h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="radio"
                name="calcType"
                checked={calculationType === 'sample'}
                onChange={() => setCalculationType('sample')}
                className="w-4 h-4 text-blue-600"
              />
              Sample (n-1)
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="radio"
                name="calcType"
                checked={calculationType === 'population'}
                onChange={() => setCalculationType('population')}
                className="w-4 h-4 text-blue-600"
              />
              Population (n)
            </label>
          </div>
        </div>

        {/* Input Mode Toggle */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="radio"
                name="inputMode"
                checked={inputMode === 'individual'}
                onChange={() => setInputMode('individual')}
                className="w-4 h-4 text-green-600"
              />
              Individual Input
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="radio"
                name="inputMode"
                checked={inputMode === 'bulk'}
                onChange={() => setInputMode('bulk')}
                className="w-4 h-4 text-green-600"
              />
              Bulk Input (Paste Data)
            </label>
          </div>
        </div>

        {/* Individual Input Mode */}
        {inputMode === 'individual' && (
          <>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
            {numbers.map((num, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <input
                type="number"
                value={num}
                onChange={(e) => updateNumber(index, e.target.value)}
                placeholder="Enter number"
                step="any"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {numbers.length > 1 && (
                <button
                  onClick={() => removeNumber(index)}
                  className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors flex items-center justify-center"
                  title="Remove"
                >
                  <Minus className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={addNumber}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Number
            </button>
            <button
              onClick={() => setNumbers([''])}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Clear All
            </button>
          </div>
          </>
        )}

        {/* Bulk Input Mode */}
        {inputMode === 'bulk' && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Paste Your Data (separated by commas, spaces, or new lines)
            </label>
            <textarea
              value={bulkInput}
              onChange={(e) => handleBulkInputChange(e.target.value)}
              placeholder="Enter numbers separated by commas, spaces, or new lines&#10;Example: 10, 20, 30, 40, 50&#10;or&#10;10&#10;20&#10;30&#10;40&#10;50"
              className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
            <div className="mt-2 text-sm text-gray-600">
              Detected {numbers.filter(n => n.trim() && !isNaN(parseFloat(n))).length} valid numbers
            </div>
            <button
              onClick={() => setBulkInput('')}
              className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Clear
            </button>
          </div>
        )}

        {/* Quick Examples */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-3">Quick Examples:</p>
          <div className="flex flex-wrap gap-2">
            {quickExamples.map((example, idx) => (
              <button
                key={idx}
                onClick={() => loadExample(example.values)}
                className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              Results
            </h3>

            {/* Key Statistics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-blue-700 font-medium mb-1">Mean (μ)</div>
                <div className="text-2xl font-bold text-blue-900">{result.mean.toFixed(4)}</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="text-sm text-green-700 font-medium mb-1">
                  {calculationType === 'population' ? 'Population' : 'Sample'} Std Dev (σ)
                </div>
                <div className="text-2xl font-bold text-green-900">
                  {(calculationType === 'population' ? result.populationStdDev : result.sampleStdDev).toFixed(4)}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <div className="text-sm text-purple-700 font-medium mb-1">Variance (σ²)</div>
                <div className="text-2xl font-bold text-purple-900">{result.variance.toFixed(4)}</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                <div className="text-sm text-orange-700 font-medium mb-1">Count (n)</div>
                <div className="text-2xl font-bold text-orange-900">{result.count}</div>
              </div>
            </div>

            {/* Additional Statistics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Sum</div>
                <div className="text-xl font-semibold text-gray-900">{result.sum.toFixed(2)}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Min</div>
                <div className="text-xl font-semibold text-gray-900">{result.min.toFixed(2)}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Max</div>
                <div className="text-xl font-semibold text-gray-900">{result.max.toFixed(2)}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Range</div>
                <div className="text-xl font-semibold text-gray-900">{result.range.toFixed(2)}</div>
              </div>
            </div>

            {/* Enhanced Descriptive Statistics */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">📊 Descriptive Statistics</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 border border-teal-200">
                  <div className="text-sm text-teal-700 font-medium mb-1">Median</div>
                  <div className="text-2xl font-bold text-teal-900">{result.median.toFixed(4)}</div>
                  <div className="text-xs text-teal-600">Middle value</div>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                  <div className="text-sm text-indigo-700 font-medium mb-1">Mode</div>
                  <div className="text-lg font-bold text-indigo-900">
                    {result.mode.length === result.count ? 'No mode' : result.mode.map(m => m.toFixed(2)).join(', ')}
                  </div>
                  <div className="text-xs text-indigo-600">Most frequent</div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200">
                  <div className="text-sm text-pink-700 font-medium mb-1">IQR</div>
                  <div className="text-2xl font-bold text-pink-900">{result.iqr.toFixed(4)}</div>
                  <div className="text-xs text-pink-600">Q3 - Q1</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
                  <div className="text-sm text-amber-700 font-medium mb-1">CV</div>
                  <div className="text-2xl font-bold text-amber-900">{result.coefficientOfVariation.toFixed(2)}%</div>
                  <div className="text-xs text-amber-600">Coefficient of Variation</div>
                </div>
              </div>
            </div>

            {/* Quartiles and Percentiles */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">📈 Quartiles & Percentiles</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">Q1 (25th)</div>
                  <div className="text-xl font-bold text-blue-900">{result.q1.toFixed(4)}</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">Q3 (75th)</div>
                  <div className="text-xl font-bold text-blue-900">{result.q3.toFixed(4)}</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">90th Percentile</div>
                  <div className="text-xl font-bold text-blue-900">{result.percentile90.toFixed(4)}</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">95th Percentile</div>
                  <div className="text-xl font-bold text-blue-900">{result.percentile95.toFixed(4)}</div>
                </div>
              </div>
            </div>

            {/* Distribution Shape */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">📊 Distribution Shape</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
                  <div className="text-sm text-emerald-700 font-medium mb-1">Skewness</div>
                  <div className="text-2xl font-bold text-emerald-900">{result.skewness.toFixed(4)}</div>
                  <div className="text-xs text-emerald-600">
                    {Math.abs(result.skewness) < 0.5 ? 'Approximately symmetric' :
                     result.skewness > 0.5 ? 'Right-skewed (positive)' : 'Left-skewed (negative)'}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-lg p-4 border border-rose-200">
                  <div className="text-sm text-rose-700 font-medium mb-1">Kurtosis</div>
                  <div className="text-2xl font-bold text-rose-900">{result.kurtosis.toFixed(4)}</div>
                  <div className="text-xs text-rose-600">
                    {Math.abs(result.kurtosis) < 0.5 ? 'Mesokurtic (normal)' :
                     result.kurtosis > 0.5 ? 'Leptokurtic (peaked)' : 'Platykurtic (flat)'}
                  </div>
                </div>
              </div>
            </div>

            {/* Confidence Intervals */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">🎯 Confidence Intervals</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-lg p-4 border border-violet-200">
                  <div className="text-sm text-violet-700 font-medium mb-2">95% Confidence Interval</div>
                  <div className="text-sm text-violet-900 font-mono">
                    [{result.confidenceInterval95.lower.toFixed(4)}, {result.confidenceInterval95.upper.toFixed(4)}]
                  </div>
                  <div className="text-xs text-violet-600 mt-1">95% confident the true mean lies in this range</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 border border-cyan-200">
                  <div className="text-sm text-cyan-700 font-medium mb-2">99% Confidence Interval</div>
                  <div className="text-sm text-cyan-900 font-mono">
                    [{result.confidenceInterval99.lower.toFixed(4)}, {result.confidenceInterval99.upper.toFixed(4)}]
                  </div>
                  <div className="text-xs text-cyan-600 mt-1">99% confident the true mean lies in this range</div>
                </div>
              </div>
            </div>

            {/* Outliers Detection */}
            {result.outliers.length > 0 && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-900">Outliers Detected</span>
                </div>
                <p className="text-sm text-yellow-800 mb-2">
                  The following values are outliers (using IQR method):
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.outliers.map((outlier, idx) => (
                    <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-900 rounded-lg font-medium">
                      {outlier.toFixed(2)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Calculation Steps */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Calculation Steps</h4>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Step 1: Calculate Mean</div>
                  <div className="text-sm text-gray-600 font-mono">
                    μ = Σx / n = {result.sum.toFixed(2)} / {result.count} = {result.mean.toFixed(4)}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Step 2: Calculate Deviations</div>
                  <div className="text-sm text-gray-600 mb-2">For each value: (x - μ)</div>
                  <div className="text-xs text-gray-500 font-mono max-h-32 overflow-y-auto">
                    {result.deviations.map((dev, idx) => (
                      <div key={idx}>
                        ({result.sortedData[idx].toFixed(2)} - {result.mean.toFixed(4)}) = {dev.toFixed(4)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Step 3: Square Deviations</div>
                  <div className="text-sm text-gray-600 mb-2">For each deviation: (x - μ)²</div>
                  <div className="text-xs text-gray-500 font-mono max-h-32 overflow-y-auto">
                    {result.squaredDeviations.map((sqDev, idx) => (
                      <div key={idx}>
                        ({result.deviations[idx].toFixed(4)})² = {sqDev.toFixed(4)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Step 4: Calculate Variance</div>
                  <div className="text-sm text-gray-600 font-mono">
                    σ² = Σ(x - μ)² / {calculationType === 'population' ? 'n' : 'n-1'} = {result.squaredDeviations.reduce((a, b) => a + b, 0).toFixed(4)} / {calculationType === 'population' ? result.count : result.count - 1} = {result.variance.toFixed(4)}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Step 5: Calculate Standard Deviation</div>
                  <div className="text-sm text-gray-600 font-mono">
                    σ = √σ² = √{result.variance.toFixed(4)} = {(calculationType === 'population' ? result.populationStdDev : result.sampleStdDev).toFixed(4)}
                  </div>
                </div>
              </div>
            </div>

            {/* Share Button */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <TrendingUp className="w-5 h-5" />
                Share Results
              </button>
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
        calculatorName="Standard Deviation Calculator"
      />
    </div>
  );
}

