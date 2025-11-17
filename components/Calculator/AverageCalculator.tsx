'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Minus, TrendingUp, BarChart3, Calculator, Hash } from 'lucide-react';

interface StatisticsResult {
  mean: number;
  median: number;
  mode: number[];
  range: number;
  sum: number;
  count: number;
  min: number;
  max: number;
  variance: number;
  standardDeviation: number;
  sortedData: number[];
}

export function AverageCalculator() {
  const [numbers, setNumbers] = useState<string[]>(['10', '20', '30', '40', '50']);
  const [result, setResult] = useState<StatisticsResult | null>(null);

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

  // Calculate statistics
  const calculateStatistics = (data: number[]): StatisticsResult => {
    const sorted = [...data].sort((a, b) => a - b);
    const count = data.length;
    const sum = data.reduce((acc, val) => acc + val, 0);
    const mean = sum / count;

    // Median
    let median: number;
    const mid = Math.floor(count / 2);
    if (count % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }

    // Mode
    const frequency: { [key: number]: number } = {};
    data.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = Object.keys(frequency)
      .filter(key => frequency[parseFloat(key)] === maxFreq)
      .map(key => parseFloat(key));

    // Range
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    // Variance and Standard Deviation
    const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / count;
    const standardDeviation = Math.sqrt(variance);

    return {
      mean,
      median,
      mode: maxFreq > 1 ? mode : [],
      range,
      sum,
      count,
      min,
      max,
      variance,
      standardDeviation,
      sortedData: sorted,
    };
  };

  useEffect(() => {
    const validNumbers = numbers
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n));

    if (validNumbers.length > 0) {
      const stats = calculateStatistics(validNumbers);
      setResult(stats);
    } else {
      setResult(null);
    }
  }, [numbers]);

  const quickExamples = [
    { label: 'Test Scores', values: ['85', '90', '78', '92', '88'] },
    { label: 'Temperatures', values: ['68', '72', '75', '70', '73'] },
    { label: 'Prices', values: ['9.99', '12.50', '8.75', '11.25', '10.00'] },
    { label: 'Simple', values: ['1', '2', '3', '4', '5'] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4 md:space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 sm:p-4 md:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Enter Your Numbers</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-6">
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
                className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px]"
              />
              {numbers.length > 1 && (
                <button
                  onClick={() => removeNumber(index)}
                  className="flex-shrink-0 w-10 h-10 min-h-[44px] rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors flex items-center justify-center"
                  title="Remove"
                >
                  <Minus className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={addNumber}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium min-h-[44px]"
          >
            <Plus className="w-5 h-5" />
            Add Number
          </button>

          <button
            onClick={() => setNumbers([''])}
            className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium min-h-[44px]"
          >
            Clear All
          </button>
        </div>

        {/* Quick Examples */}
        <div className="mt-3 sm:mt-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Examples:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {quickExamples.map((example, idx) => (
              <button
                key={idx}
                onClick={() => setNumbers(example.values)}
                className="px-3 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg transition-colors text-sm font-medium"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <>
          {/* Main Statistics */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 sm:p-4 md:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Statistical Results</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 md:p-5 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <div className="text-sm text-blue-600 font-medium">Mean (Average)</div>
                </div>
                <div className="text-xl sm:text-2xl md:text-4xl font-bold text-blue-700 break-all">
                  {result.mean.toFixed(2)}
                </div>
                <div className="text-xs text-blue-600 mt-1">Sum ÷ Count</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 md:p-5 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="w-5 h-5 text-green-600" />
                  <div className="text-sm text-green-600 font-medium">Median</div>
                </div>
                <div className="text-xl sm:text-2xl md:text-4xl font-bold text-green-700 break-all">
                  {result.median.toFixed(2)}
                </div>
                <div className="text-xs text-green-600 mt-1">Middle value</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 md:p-5 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <div className="text-sm text-purple-600 font-medium">Mode</div>
                </div>
                <div className="text-xl sm:text-2xl md:text-4xl font-bold text-purple-700 break-all">
                  {result.mode.length > 0 ? result.mode.map(m => m.toFixed(2)).join(', ') : 'None'}
                </div>
                <div className="text-xs text-purple-600 mt-1">Most frequent</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 sm:p-4 md:p-5 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-5 h-5 text-orange-600" />
                  <div className="text-sm text-orange-600 font-medium">Range</div>
                </div>
                <div className="text-xl sm:text-2xl md:text-4xl font-bold text-orange-700 break-all">
                  {result.range.toFixed(2)}
                </div>
                <div className="text-xs text-orange-600 mt-1">Max - Min</div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Sum</div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 break-all">{result.sum.toFixed(2)}</div>
              </div>

              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Count</div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 break-all">{result.count}</div>
              </div>

              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Min / Max</div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 break-all">
                  {result.min.toFixed(2)} / {result.max.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Statistics */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 sm:p-4 md:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Advanced Statistics</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-3 sm:p-4 md:p-5 rounded-lg border border-indigo-200">
                <div className="text-sm text-indigo-600 mb-2 font-medium">Variance (σ²)</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-700 mb-2 break-all">
                  {result.variance.toFixed(4)}
                </div>
                <p className="text-xs text-indigo-600">
                  Measures how spread out the numbers are from the mean
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-3 sm:p-4 md:p-5 rounded-lg border border-pink-200">
                <div className="text-sm text-pink-600 mb-2 font-medium">Standard Deviation (σ)</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-700 mb-2 break-all">
                  {result.standardDeviation.toFixed(4)}
                </div>
                <p className="text-xs text-pink-600">
                  Square root of variance, shows typical distance from mean
                </p>
              </div>
            </div>
          </div>

          {/* Sorted Data */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 sm:p-4 md:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Sorted Data (Ascending Order)</h3>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {result.sortedData.map((num, idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-2 rounded-lg font-semibold text-xs sm:text-sm ${
                      num === result.min
                        ? 'bg-red-100 text-red-700 border-2 border-red-300'
                        : num === result.max
                        ? 'bg-green-100 text-green-700 border-2 border-green-300'
                        : num === result.median
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                        : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                  >
                    {num.toFixed(2)}
                    {num === result.min && <span className="text-xs ml-1">(Min)</span>}
                    {num === result.max && <span className="text-xs ml-1">(Max)</span>}
                    {num === result.median && result.count % 2 !== 0 && <span className="text-xs ml-1">(Median)</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Formulas */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-3 sm:p-4 md:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Calculation Formulas</h3>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                <strong className="text-blue-700">Mean (Average):</strong>
                <div className="font-mono mt-2 text-gray-700">
                  Mean = (Sum of all values) / (Number of values)
                </div>
                <div className="font-mono mt-1 text-gray-600 text-xs">
                  = {result.sum.toFixed(2)} / {result.count} = {result.mean.toFixed(2)}
                </div>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                <strong className="text-green-700">Median:</strong>
                <div className="font-mono mt-2 text-gray-700">
                  {result.count % 2 === 0
                    ? 'Median = (Middle two values) / 2'
                    : 'Median = Middle value (when sorted)'}
                </div>
                <div className="font-mono mt-1 text-gray-600 text-xs">
                  = {result.median.toFixed(2)}
                </div>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                <strong className="text-purple-700">Mode:</strong>
                <div className="font-mono mt-2 text-gray-700">
                  Mode = Most frequently occurring value(s)
                </div>
                <div className="font-mono mt-1 text-gray-600 text-xs">
                  = {result.mode.length > 0 ? result.mode.join(', ') : 'No mode (all values appear once)'}
                </div>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                <strong className="text-orange-700">Range:</strong>
                <div className="font-mono mt-2 text-gray-700">
                  Range = Maximum value - Minimum value
                </div>
                <div className="font-mono mt-1 text-gray-600 text-xs">
                  = {result.max.toFixed(2)} - {result.min.toFixed(2)} = {result.range.toFixed(2)}
                </div>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                <strong className="text-indigo-700">Variance:</strong>
                <div className="font-mono mt-2 text-gray-700">
                  σ² = Σ(x - mean)² / n
                </div>
                <div className="font-mono mt-1 text-gray-600 text-xs">
                  = {result.variance.toFixed(4)}
                </div>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                <strong className="text-pink-700">Standard Deviation:</strong>
                <div className="font-mono mt-2 text-gray-700">
                  σ = √(Variance)
                </div>
                <div className="font-mono mt-1 text-gray-600 text-xs">
                  = √{result.variance.toFixed(4)} = {result.standardDeviation.toFixed(4)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

