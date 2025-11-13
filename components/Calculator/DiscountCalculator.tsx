'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Download, DollarSign, Percent, Tag, Calculator } from 'lucide-react';
import html2canvas from 'html2canvas';

interface DiscountInputs {
  originalPrice: number;
  discountPercent: number;
  finalPrice: number;
  calculationType: 'calculate-final' | 'calculate-discount' | 'multiple-discounts';
  discount1: number;
  discount2: number;
  discount3: number;
}

interface DiscountResult {
  originalPrice: number;
  discountPercent: number;
  discountAmount: number;
  finalPrice: number;
  savings: number;
  effectiveDiscount?: number;
  multipleSteps?: Array<{
    step: number;
    discount: number;
    before: number;
    discountAmount: number;
    after: number;
  }>;
}

const calculateDiscount = (inputs: DiscountInputs): DiscountResult | null => {
  switch (inputs.calculationType) {
    case 'calculate-final':
      if (inputs.originalPrice <= 0 || inputs.discountPercent < 0 || inputs.discountPercent > 100) return null;
      
      const discountAmount = inputs.originalPrice * (inputs.discountPercent / 100);
      const finalPrice = inputs.originalPrice - discountAmount;
      
      return {
        originalPrice: inputs.originalPrice,
        discountPercent: inputs.discountPercent,
        discountAmount,
        finalPrice,
        savings: discountAmount
      };

    case 'calculate-discount':
      if (inputs.originalPrice <= 0 || inputs.finalPrice < 0 || inputs.finalPrice >= inputs.originalPrice) return null;
      
      const savings = inputs.originalPrice - inputs.finalPrice;
      const discountPercent = (savings / inputs.originalPrice) * 100;
      
      return {
        originalPrice: inputs.originalPrice,
        discountPercent,
        discountAmount: savings,
        finalPrice: inputs.finalPrice,
        savings
      };

    case 'multiple-discounts':
      if (inputs.originalPrice <= 0) return null;
      
      let currentPrice = inputs.originalPrice;
      const steps: Array<{
        step: number;
        discount: number;
        before: number;
        discountAmount: number;
        after: number;
      }> = [];
      
      const discounts = [inputs.discount1, inputs.discount2, inputs.discount3].filter(d => d > 0 && d <= 100);
      
      discounts.forEach((discount, index) => {
        const discountAmount = currentPrice * (discount / 100);
        const newPrice = currentPrice - discountAmount;
        
        steps.push({
          step: index + 1,
          discount,
          before: currentPrice,
          discountAmount,
          after: newPrice
        });
        
        currentPrice = newPrice;
      });
      
      if (steps.length === 0) return null;
      
      const totalSavings = inputs.originalPrice - currentPrice;
      const effectiveDiscount = (totalSavings / inputs.originalPrice) * 100;
      
      return {
        originalPrice: inputs.originalPrice,
        discountPercent: effectiveDiscount,
        discountAmount: totalSavings,
        finalPrice: currentPrice,
        savings: totalSavings,
        effectiveDiscount,
        multipleSteps: steps
      };

    default:
      return null;
  }
};

export default function DiscountCalculator() {
  const [inputs, setInputs] = useState<DiscountInputs>({
    originalPrice: 100,
    discountPercent: 20,
    finalPrice: 80,
    calculationType: 'calculate-final',
    discount1: 20,
    discount2: 10,
    discount3: 0
  });

  const result = useMemo(() => calculateDiscount(inputs), [inputs]);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSaveAsImage = async () => {
    if (!resultRef.current || !result) return;
    
    try {
      const canvas = await html2canvas(resultRef.current);
      
      const link = document.createElement('a');
      link.download = `discount-calculation-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const getCalculationSummary = (): string => {
    if (!result) return '';
    
    switch (inputs.calculationType) {
      case 'calculate-final':
        return `A ${result.discountPercent.toFixed(1)}% discount on $${result.originalPrice.toFixed(2)} saves you $${result.savings.toFixed(2)}, bringing the final price to $${result.finalPrice.toFixed(2)}.`;
      case 'calculate-discount':
        return `The discount from $${result.originalPrice.toFixed(2)} to $${result.finalPrice.toFixed(2)} is ${result.discountPercent.toFixed(1)}%, saving you $${result.savings.toFixed(2)}.`;
      case 'multiple-discounts':
        return `Multiple discounts result in an effective ${result.effectiveDiscount?.toFixed(1)}% discount, reducing $${result.originalPrice.toFixed(2)} to $${result.finalPrice.toFixed(2)} (total savings: $${result.savings.toFixed(2)}).`;
      default:
        return '';
    }
  };

  const handleInputChange = (field: keyof DiscountInputs, value: number | string) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Number(value)
    }));
  };

  const quickDiscounts = [10, 15, 20, 25, 30, 40, 50, 75];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6 lg:items-start">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
            {/* Calculation Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Calculation Type
              </label>
              <div className="space-y-2">
                {[
                  { value: 'calculate-final', label: 'Calculate final price' },
                  { value: 'calculate-discount', label: 'Find discount percentage' },
                  { value: 'multiple-discounts', label: 'Multiple stacked discounts' }
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
              {inputs.calculationType !== 'multiple-discounts' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.originalPrice}
                    onChange={(e) => handleInputChange('originalPrice', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter original price"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}

              {inputs.calculationType === 'calculate-final' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      value={inputs.discountPercent}
                      onChange={(e) => handleInputChange('discountPercent', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter discount percentage"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>

                  {/* Quick Discount Buttons */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quick Discounts
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {quickDiscounts.map(discount => (
                        <button
                          key={discount}
                          onClick={() => handleInputChange('discountPercent', discount)}
                          className="px-2 py-1 text-xs bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded transition-colors"
                        >
                          {discount}%
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {inputs.calculationType === 'calculate-discount' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sale Price ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.finalPrice}
                    onChange={(e) => handleInputChange('finalPrice', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter sale price"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}

              {inputs.calculationType === 'multiple-discounts' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price ($)
                    </label>
                    <input
                      type="number"
                      value={inputs.originalPrice}
                      onChange={(e) => handleInputChange('originalPrice', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter original price"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Discount (%)
                    </label>
                    <input
                      type="number"
                      value={inputs.discount1}
                      onChange={(e) => handleInputChange('discount1', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter first discount"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Second Discount (%) - Optional
                    </label>
                    <input
                      type="number"
                      value={inputs.discount2}
                      onChange={(e) => handleInputChange('discount2', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter second discount"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Third Discount (%) - Optional
                    </label>
                    <input
                      type="number"
                      value={inputs.discount3}
                      onChange={(e) => handleInputChange('discount3', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter third discount"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </>
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

                {/* Key Results */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Original Price</span>
                    </div>
                    <div className="text-2xl font-bold text-red-900">
                      ${result.originalPrice.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Discount</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      {result.discountPercent.toFixed(1)}%
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">You Save</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">
                      ${result.savings.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Final Price</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      ${result.finalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Multiple Discounts Breakdown */}
                {result.multipleSteps && result.multipleSteps.length > 0 && (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-900 mb-3">Discount Breakdown</h4>
                    <div className="space-y-2">
                      {result.multipleSteps.map((step, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-yellow-800">
                            Step {step.step}: ${step.before.toFixed(2)} - {step.discount}%
                          </span>
                          <span className="font-semibold text-yellow-900">
                            = ${step.after.toFixed(2)}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-yellow-300 pt-2 mt-2">
                        <div className="flex justify-between items-center font-semibold">
                          <span className="text-yellow-900">Effective Discount:</span>
                          <span className="text-yellow-900">{result.effectiveDiscount?.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-yellow-100 rounded border border-yellow-300">
                      <p className="text-xs text-yellow-800">
                        💡 <strong>Note:</strong> Multiple discounts are applied sequentially, not additively. 
                        A 20% + 10% discount is not 30% off - the second discount applies to the already-discounted price.
                      </p>
                    </div>
                  </div>
                )}

                {/* Calculation Formula */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Calculation</h4>
                  <p className="text-gray-700 text-sm">
                    {inputs.calculationType === 'calculate-final' && 
                      `$${result.originalPrice.toFixed(2)} - (${result.discountPercent}% × $${result.originalPrice.toFixed(2)}) = $${result.finalPrice.toFixed(2)}`
                    }
                    {inputs.calculationType === 'calculate-discount' && 
                      `Discount % = ($${result.savings.toFixed(2)} ÷ $${result.originalPrice.toFixed(2)}) × 100 = ${result.discountPercent.toFixed(1)}%`
                    }
                    {inputs.calculationType === 'multiple-discounts' && 
                      `Sequential discounts applied: ${result.multipleSteps?.map(s => s.discount + '%').join(' → ')}`
                    }
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">🏷️</div>
                <p className="text-gray-500">Enter values to calculate discount</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
