'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Download, DollarSign, Percent, TrendingUp } from 'lucide-react';
import html2canvas from 'html2canvas';

interface MarkupInputs {
  cost: number;
  markupPercent: number;
  markupAmount: number;
  calculationType: 'cost-percent' | 'cost-amount';
}

interface MarkupResult {
  cost: number;
  markupPercent: number;
  markupAmount: number;
  sellingPrice: number;
  profit: number;
  marginPercent: number;
}

const calculateMarkup = (inputs: MarkupInputs): MarkupResult | null => {
  const { cost, markupPercent, markupAmount, calculationType } = inputs;
  
  if (cost <= 0) return null;
  
  let finalMarkupPercent = markupPercent;
  let finalMarkupAmount = markupAmount;
  let sellingPrice = 0;
  
  // Calculate based on input type
  switch (calculationType) {
    case 'cost-percent':
      if (markupPercent < 0) return null;
      finalMarkupAmount = cost * (markupPercent / 100);
      sellingPrice = cost + finalMarkupAmount;
      break;
    case 'cost-amount':
      if (markupAmount < 0) return null;
      finalMarkupPercent = (markupAmount / cost) * 100;
      sellingPrice = cost + markupAmount;
      break;
    default:
      return null;
  }
  
  const profit = sellingPrice - cost;
  const marginPercent = (profit / sellingPrice) * 100;
  
  return {
    cost,
    markupPercent: finalMarkupPercent,
    markupAmount: finalMarkupAmount,
    sellingPrice,
    profit,
    marginPercent
  };
};

export default function MarkupCalculator() {
  const [inputs, setInputs] = useState<MarkupInputs>({
    cost: 100,
    markupPercent: 50,
    markupAmount: 50,
    calculationType: 'cost-percent'
  });

  const result = useMemo(() => calculateMarkup(inputs), [inputs]);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleSaveAsImage = async () => {
    if (!resultRef.current || !result) return;
    
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const link = document.createElement('a');
      link.download = `markup-calculation-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const getCalculationSummary = (): string => {
    if (!result) return '';
    
    if (inputs.calculationType === 'cost-percent') {
      return `With a cost of $${result.cost.toFixed(2)} and a ${result.markupPercent.toFixed(1)}% markup, your selling price is $${result.sellingPrice.toFixed(2)} with a profit of $${result.profit.toFixed(2)}.`;
    } else {
      return `With a cost of $${result.cost.toFixed(2)} and a $${result.markupAmount.toFixed(2)} markup, your selling price is $${result.sellingPrice.toFixed(2)} with a ${result.markupPercent.toFixed(1)}% markup rate.`;
    }
  };

  const handleInputChange = (field: keyof MarkupInputs, value: number | string) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Number(value)
    }));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6 lg:items-start">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
            {/* Calculation Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Markup Method
              </label>
              <div className="space-y-2">
                {[
                  { value: 'cost-percent', label: 'Percentage Markup (e.g., add 20%)' },
                  { value: 'cost-amount', label: 'Fixed Amount Markup (e.g., add $30)' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="calculationType"
                      value={option.value}
                      checked={inputs.calculationType === option.value}
                      onChange={(e) => handleInputChange('calculationType', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost ($)
                </label>
                <input
                  type="number"
                  value={inputs.cost}
                  onChange={(e) => handleInputChange('cost', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter cost amount"
                  min="0"
                  step="0.01"
                />
              </div>

              {inputs.calculationType === 'cost-percent' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Markup Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={inputs.markupPercent}
                    onChange={(e) => handleInputChange('markupPercent', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter markup percentage"
                    min="0"
                    step="0.1"
                  />
                </div>
              )}

              {inputs.calculationType === 'cost-amount' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Markup Amount ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.markupAmount}
                    onChange={(e) => handleInputChange('markupAmount', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter markup amount"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleSaveAsImage}
              disabled={!result}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Cost</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      ${result.cost.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Markup</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      {result.markupPercent.toFixed(1)}%
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Selling Price</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">
                      ${result.sellingPrice.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Profit Margin</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-900">
                      {result.marginPercent.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Profit Display */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <div className="text-center">
                    <div className="text-sm font-medium text-green-800 mb-2">Profit</div>
                    <div className="text-3xl font-bold text-green-900">
                      ${result.profit.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">📊</div>
                <p className="text-gray-500">Enter values to see markup calculation</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
