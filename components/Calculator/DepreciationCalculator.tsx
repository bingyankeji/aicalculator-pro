'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Download, DollarSign, Calendar, TrendingDown, Calculator, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';

interface DepreciationInputs {
  assetCost: number;
  salvageValue: number;
  usefulLife: number;
  depreciationMethod: 'straight-line' | 'double-declining' | 'sum-of-years' | 'units-of-production';
  unitsProduced?: number;
  totalUnits?: number;
  taxRate: number;
  purchaseDate: string;
}

interface DepreciationPeriod {
  year: number;
  beginningValue: number;
  depreciationExpense: number;
  accumulatedDepreciation: number;
  endingValue: number;
  taxSavings: number;
}

interface DepreciationResult {
  annualDepreciation: number;
  totalDepreciation: number;
  depreciationSchedule: DepreciationPeriod[];
  totalTaxSavings: number;
  method: string;
  recommendation: string;
  assetCategory: string;
}

// Straight-line depreciation
const calculateStraightLine = (cost: number, salvage: number, life: number): DepreciationPeriod[] => {
  const annualDepreciation = (cost - salvage) / life;
  const schedule: DepreciationPeriod[] = [];
  
  for (let year = 1; year <= life; year++) {
    const beginningValue = cost - (annualDepreciation * (year - 1));
    const accumulatedDepreciation = annualDepreciation * year;
    const endingValue = cost - accumulatedDepreciation;
    
    schedule.push({
      year,
      beginningValue,
      depreciationExpense: annualDepreciation,
      accumulatedDepreciation,
      endingValue: Math.max(endingValue, salvage),
      taxSavings: 0 // Will be calculated later
    });
  }
  
  return schedule;
};

// Double declining balance depreciation
const calculateDoubleDeclining = (cost: number, salvage: number, life: number): DepreciationPeriod[] => {
  const rate = 2 / life;
  const schedule: DepreciationPeriod[] = [];
  let bookValue = cost;
  let accumulatedDepreciation = 0;
  
  for (let year = 1; year <= life; year++) {
    const beginningValue = bookValue;
    let depreciationExpense = bookValue * rate;
    
    // Don't depreciate below salvage value
    if (bookValue - depreciationExpense < salvage) {
      depreciationExpense = bookValue - salvage;
    }
    
    accumulatedDepreciation += depreciationExpense;
    bookValue -= depreciationExpense;
    
    schedule.push({
      year,
      beginningValue,
      depreciationExpense,
      accumulatedDepreciation,
      endingValue: bookValue,
      taxSavings: 0
    });
    
    if (bookValue <= salvage) break;
  }
  
  return schedule;
};

// Sum of years digits depreciation
const calculateSumOfYears = (cost: number, salvage: number, life: number): DepreciationPeriod[] => {
  const depreciableBase = cost - salvage;
  const sumOfYears = (life * (life + 1)) / 2;
  const schedule: DepreciationPeriod[] = [];
  let accumulatedDepreciation = 0;
  
  for (let year = 1; year <= life; year++) {
    const beginningValue = cost - accumulatedDepreciation;
    const fraction = (life - year + 1) / sumOfYears;
    const depreciationExpense = depreciableBase * fraction;
    accumulatedDepreciation += depreciationExpense;
    const endingValue = cost - accumulatedDepreciation;
    
    schedule.push({
      year,
      beginningValue,
      depreciationExpense,
      accumulatedDepreciation,
      endingValue,
      taxSavings: 0
    });
  }
  
  return schedule;
};

// Units of production depreciation
const calculateUnitsOfProduction = (
  cost: number, 
  salvage: number, 
  totalUnits: number, 
  unitsProduced: number, 
  life: number
): DepreciationPeriod[] => {
  const depreciableBase = cost - salvage;
  const ratePerUnit = depreciableBase / totalUnits;
  const annualDepreciation = ratePerUnit * unitsProduced;
  
  // For simplicity, assume same production each year
  const schedule: DepreciationPeriod[] = [];
  let accumulatedDepreciation = 0;
  
  for (let year = 1; year <= life; year++) {
    const beginningValue = cost - accumulatedDepreciation;
    const depreciationExpense = Math.min(annualDepreciation, beginningValue - salvage);
    accumulatedDepreciation += depreciationExpense;
    const endingValue = cost - accumulatedDepreciation;
    
    schedule.push({
      year,
      beginningValue,
      depreciationExpense,
      accumulatedDepreciation,
      endingValue: Math.max(endingValue, salvage),
      taxSavings: 0
    });
    
    if (endingValue <= salvage) break;
  }
  
  return schedule;
};

const calculateDepreciation = (inputs: DepreciationInputs): DepreciationResult | null => {
  if (inputs.assetCost <= 0 || inputs.usefulLife <= 0 || inputs.assetCost <= inputs.salvageValue) {
    return null;
  }

  let schedule: DepreciationPeriod[] = [];
  let method = '';

  switch (inputs.depreciationMethod) {
    case 'straight-line':
      schedule = calculateStraightLine(inputs.assetCost, inputs.salvageValue, inputs.usefulLife);
      method = 'Straight-Line Method';
      break;
    case 'double-declining':
      schedule = calculateDoubleDeclining(inputs.assetCost, inputs.salvageValue, inputs.usefulLife);
      method = 'Double Declining Balance Method';
      break;
    case 'sum-of-years':
      schedule = calculateSumOfYears(inputs.assetCost, inputs.salvageValue, inputs.usefulLife);
      method = 'Sum of Years Digits Method';
      break;
    case 'units-of-production':
      if (!inputs.totalUnits || !inputs.unitsProduced) return null;
      schedule = calculateUnitsOfProduction(
        inputs.assetCost, 
        inputs.salvageValue, 
        inputs.totalUnits, 
        inputs.unitsProduced, 
        inputs.usefulLife
      );
      method = 'Units of Production Method';
      break;
    default:
      return null;
  }

  // Calculate tax savings for each period
  schedule = schedule.map(period => ({
    ...period,
    taxSavings: period.depreciationExpense * (inputs.taxRate / 100)
  }));

  const totalDepreciation = inputs.assetCost - inputs.salvageValue;
  const annualDepreciation = schedule.length > 0 ? schedule[0].depreciationExpense : 0;
  const totalTaxSavings = schedule.reduce((sum, period) => sum + period.taxSavings, 0);

  // Asset category and recommendations
  let assetCategory = 'General Business Asset';
  let recommendation = '';

  if (inputs.assetCost > 100000) {
    assetCategory = 'Major Capital Asset';
    recommendation = 'Consider accelerated depreciation methods for larger tax benefits in early years.';
  } else if (inputs.usefulLife <= 3) {
    assetCategory = 'Short-Term Asset';
    recommendation = 'Straight-line method may be simplest for short-lived assets.';
  } else if (inputs.usefulLife >= 10) {
    assetCategory = 'Long-Term Asset';
    recommendation = 'Accelerated methods can provide significant early tax benefits for long-term assets.';
  } else {
    recommendation = 'Compare different methods to optimize tax benefits based on your cash flow needs.';
  }

  return {
    annualDepreciation,
    totalDepreciation,
    depreciationSchedule: schedule,
    totalTaxSavings,
    method,
    recommendation,
    assetCategory
  };
};

export default function DepreciationCalculator() {
  const [inputs, setInputs] = useState<DepreciationInputs>({
    assetCost: 50000,
    salvageValue: 5000,
    usefulLife: 5,
    depreciationMethod: 'straight-line',
    unitsProduced: 10000,
    totalUnits: 100000,
    taxRate: 25,
    purchaseDate: new Date().toISOString().split('T')[0]
  });

  const [result, setResult] = useState<DepreciationResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    const calculatedResult = calculateDepreciation(inputs);
    setResult(calculatedResult);
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current || !result) return;
    
    try {
      const canvas = await html2canvas(resultRef.current);
      
      const link = document.createElement('a');
      link.download = `depreciation-schedule-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const getCalculationSummary = (): string => {
    if (!result) return '';
    
    const cost = inputs.assetCost.toLocaleString();
    const salvage = inputs.salvageValue.toLocaleString();
    const totalDep = result.totalDepreciation.toLocaleString();
    const taxSavings = result.totalTaxSavings.toLocaleString();
    
    return `Asset costing $${cost} with $${salvage} salvage value depreciates $${totalDep} over ${inputs.usefulLife} years using ${result.method}, generating $${taxSavings} in total tax savings.`;
  };

  const handleInputChange = (field: keyof DepreciationInputs, value: number | string) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Number(value)
    }));
  };

  const depreciationMethods = [
    { value: 'straight-line', label: 'Straight-Line', description: 'Equal annual depreciation' },
    { value: 'double-declining', label: 'Double Declining Balance', description: 'Accelerated depreciation' },
    { value: 'sum-of-years', label: 'Sum of Years Digits', description: 'Accelerated with declining rate' },
    { value: 'units-of-production', label: 'Units of Production', description: 'Based on usage/production' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6 lg:items-start">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
            {/* Asset Information */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset Cost ($)
                </label>
                <input
                  type="number"
                  value={inputs.assetCost}
                  onChange={(e) => handleInputChange('assetCost', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter asset cost"
                  min="0"
                  step="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salvage Value ($)
                </label>
                <input
                  type="number"
                  value={inputs.salvageValue}
                  onChange={(e) => handleInputChange('salvageValue', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter salvage value"
                  min="0"
                  step="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Useful Life (Years)
                </label>
                <input
                  type="number"
                  value={inputs.usefulLife}
                  onChange={(e) => handleInputChange('usefulLife', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter useful life"
                  min="1"
                  max="50"
                  step="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={inputs.taxRate}
                  onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter tax rate"
                  min="0"
                  max="50"
                  step="0.1"
                />
              </div>
            </div>

            {/* Depreciation Method */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Depreciation Method
              </label>
              <div className="space-y-2">
                {depreciationMethods.map(method => (
                  <label key={method.value} className="flex items-start">
                    <input
                      type="radio"
                      name="depreciationMethod"
                      value={method.value}
                      checked={inputs.depreciationMethod === method.value}
                      onChange={(e) => handleInputChange('depreciationMethod', e.target.value)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">{method.label}</span>
                      <p className="text-xs text-gray-500">{method.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Units of Production specific fields */}
            {inputs.depreciationMethod === 'units-of-production' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Expected Units
                  </label>
                  <input
                    type="number"
                    value={inputs.totalUnits || ''}
                    onChange={(e) => handleInputChange('totalUnits', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Total units over asset life"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Units Produced
                  </label>
                  <input
                    type="number"
                    value={inputs.unitsProduced || ''}
                    onChange={(e) => handleInputChange('unitsProduced', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Units produced per year"
                    min="1"
                  />
                </div>
              </div>
            )}

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 mb-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg min-h-[44px]"
            >
              <Calculator className="w-5 h-5" />
              Calculate Depreciation
            </button>

            {/* Save as Image Button */}
            <button
              onClick={handleSaveAsImage}
              disabled={!result}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Save as Image
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          <div ref={resultRef} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            {result ? (
              <div className="space-y-6">
                {/* Calculation Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800 text-center font-medium">
                    {getCalculationSummary()}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Total Depreciation</span>
                    </div>
                    <div className="text-2xl font-bold text-red-900">
                      ${result.totalDepreciation.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Annual Depreciation</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      ${result.annualDepreciation.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-700 mt-1">
                      (First year for accelerated methods)
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Total Tax Savings</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">
                      ${result.totalTaxSavings.toLocaleString()}
                    </div>
                    <div className="text-xs text-purple-700 mt-1">
                      At {inputs.taxRate}% tax rate
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Depreciation Period</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      {inputs.usefulLife} years
                    </div>
                    <div className="text-xs text-blue-700 mt-1">
                      {result.method}
                    </div>
                  </div>
                </div>

                {/* Asset Analysis */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Asset Analysis</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-yellow-800">Asset Category:</span>
                      <span className="font-semibold text-yellow-900 ml-2">{result.assetCategory}</span>
                    </div>
                    <div>
                      <span className="text-yellow-800">Depreciation Method:</span>
                      <span className="font-semibold text-yellow-900 ml-2">{result.method}</span>
                    </div>
                  </div>
                  <p className="text-yellow-800 mt-3 text-sm">
                    <strong>Recommendation:</strong> {result.recommendation}
                  </p>
                </div>

                {/* Depreciation Schedule */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Depreciation Schedule
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left">Year</th>
                          <th className="px-3 py-2 text-right">Beginning Value</th>
                          <th className="px-3 py-2 text-right">Depreciation</th>
                          <th className="px-3 py-2 text-right">Accumulated</th>
                          <th className="px-3 py-2 text-right">Ending Value</th>
                          <th className="px-3 py-2 text-right">Tax Savings</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {result.depreciationSchedule.map((period, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-3 py-2 font-medium">{period.year}</td>
                            <td className="px-3 py-2 text-right">
                              ${period.beginningValue.toLocaleString()}
                            </td>
                            <td className="px-3 py-2 text-right text-red-600">
                              ${period.depreciationExpense.toLocaleString()}
                            </td>
                            <td className="px-3 py-2 text-right">
                              ${period.accumulatedDepreciation.toLocaleString()}
                            </td>
                            <td className="px-3 py-2 text-right">
                              ${period.endingValue.toLocaleString()}
                            </td>
                            <td className="px-3 py-2 text-right text-green-600">
                              ${period.taxSavings.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Method Comparison Tip */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Method Comparison Tips</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
                    <div>
                      <h5 className="font-semibold mb-1">Straight-Line:</h5>
                      <p>• Equal annual depreciation</p>
                      <p>• Simple and predictable</p>
                      <p>• Good for assets with steady usage</p>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">Accelerated Methods:</h5>
                      <p>• Higher early-year depreciation</p>
                      <p>• Better tax benefits upfront</p>
                      <p>• Good for rapidly depreciating assets</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">📊</div>
                <p className="text-gray-500">Enter asset details to calculate depreciation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
