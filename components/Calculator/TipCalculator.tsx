'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, Users, Percent, TrendingUp, Share2, Save, Printer } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

interface TipInputs {
  billAmount: number;
  tipPercentage: number;
  numberOfPeople: number;
  beforeTax: boolean;
  taxRate: number;
}

interface TipResult {
  tipAmount: number;
  totalAmount: number;
  perPersonAmount: number;
  perPersonTip: number;
  billBeforeTax: number;
  taxAmount: number;
  serviceQuality: string;
}

export function TipCalculator() {
  const [inputs, setInputs] = useState<TipInputs>({
    billAmount: 100,
    tipPercentage: 18,
    numberOfPeople: 1,
    beforeTax: false,
    taxRate: 8.5,
  });

  const [result, setResult] = useState<TipResult | null>(null);
  const [customTip, setCustomTip] = useState<string>('');

  // Predefined tip percentages
  const quickTips = [
    { value: 10, label: '10%', quality: 'Poor Service' },
    { value: 15, label: '15%', quality: 'Fair Service' },
    { value: 18, label: '18%', quality: 'Good Service' },
    { value: 20, label: '20%', quality: 'Great Service' },
    { value: 25, label: '25%', quality: 'Excellent Service' },
  ];

  const calculate = () => {
    let baseBill = inputs.billAmount;
    let taxAmount = 0;
    let billBeforeTax = inputs.billAmount;

    // Calculate tax if tip is before tax
    if (inputs.beforeTax && inputs.taxRate > 0) {
      billBeforeTax = inputs.billAmount / (1 + inputs.taxRate / 100);
      taxAmount = inputs.billAmount - billBeforeTax;
      baseBill = billBeforeTax;
    } else if (inputs.taxRate > 0) {
      taxAmount = inputs.billAmount * (inputs.taxRate / 100);
    }

    const tipAmount = baseBill * (inputs.tipPercentage / 100);
    const totalAmount = inputs.beforeTax 
      ? inputs.billAmount + tipAmount 
      : inputs.billAmount + tipAmount;
    
    const perPersonAmount = totalAmount / inputs.numberOfPeople;
    const perPersonTip = tipAmount / inputs.numberOfPeople;

    // Determine service quality
    let serviceQuality = 'Custom';
    if (inputs.tipPercentage <= 10) serviceQuality = 'Poor Service';
    else if (inputs.tipPercentage <= 15) serviceQuality = 'Fair Service';
    else if (inputs.tipPercentage <= 18) serviceQuality = 'Good Service';
    else if (inputs.tipPercentage <= 20) serviceQuality = 'Great Service';
    else serviceQuality = 'Excellent Service';

    setResult({
      tipAmount,
      totalAmount,
      perPersonAmount,
      perPersonTip,
      billBeforeTax,
      taxAmount,
      serviceQuality,
    });
  };

  // Auto-calculate on input change
  useEffect(() => {
    if (inputs.billAmount > 0) {
      calculate();
    }
  }, [inputs]);

  const handleQuickTip = (percentage: number) => {
    setInputs({ ...inputs, tipPercentage: percentage });
    setCustomTip('');
  };

  const handleCustomTip = (value: string) => {
    setCustomTip(value);
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
      setInputs({ ...inputs, tipPercentage: parsed });
    }
  };

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/tip-calculator',
    getShareParams: () => ({
      b: inputs.billAmount.toString(),
      t: inputs.tipPercentage.toString(),
      p: inputs.numberOfPeople.toString(),
      bt: inputs.beforeTax ? '1' : '0',
      tr: inputs.taxRate.toString(),
    }),
    getShareText: () =>
      result
        ? `Tip: $${result.tipAmount.toFixed(2)} | Total: $${result.totalAmount.toFixed(2)} | Per Person: $${result.perPersonAmount.toFixed(2)}`
        : 'Check out my tip calculation!',
  });

  // Save as image
  const handleSaveImage = async () => {
    const element = document.getElementById('tip-result');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'tip-calculation.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-5 gap-6">
        {/* Input Section - 3 columns */}
        <div className="md:col-span-3 space-y-6">
          {/* Bill Amount */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Bill Amount
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Bill Amount ($)
                </label>
                <input
                  type="number"
                  value={inputs.billAmount || ''}
                  onChange={(e) => setInputs({ ...inputs, billAmount: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                  placeholder="100.00"
                  step="0.01"
                  min="0"
                />
              </div>

              {/* Tax Options */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputs.beforeTax}
                    onChange={(e) => setInputs({ ...inputs, beforeTax: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Calculate tip before tax</span>
                </label>
              </div>

              {inputs.beforeTax && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    value={inputs.taxRate || ''}
                    onChange={(e) => setInputs({ ...inputs, taxRate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="8.5"
                    step="0.1"
                    min="0"
                    max="30"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Tip Percentage */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Percent className="w-5 h-5 text-green-600" />
              Tip Percentage
            </h3>
            
            {/* Quick Tip Buttons */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {quickTips.map((tip) => (
                <button
                  key={tip.value}
                  onClick={() => handleQuickTip(tip.value)}
                  className={`px-3 py-3 rounded-lg font-semibold transition-all ${
                    inputs.tipPercentage === tip.value && !customTip
                      ? 'bg-green-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tip.label}
                </button>
              ))}
            </div>

            {/* Service Quality Labels */}
            <div className="grid grid-cols-5 gap-2 mb-4 text-xs text-center text-gray-600">
              {quickTips.map((tip) => (
                <div key={tip.value}>{tip.quality.replace(' Service', '')}</div>
              ))}
            </div>

            {/* Custom Tip */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Tip (%)
              </label>
              <input
                type="number"
                value={customTip}
                onChange={(e) => handleCustomTip(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter custom percentage"
                step="0.1"
                min="0"
                max="100"
              />
            </div>

            <div className="mt-4 text-center">
              <div className="text-sm text-gray-600">Current Tip</div>
              <div className="text-3xl font-bold text-green-600">{inputs.tipPercentage}%</div>
              <div className="text-xs text-gray-500 mt-1">{result?.serviceQuality}</div>
            </div>
          </div>

          {/* Number of People */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Split Bill
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of People
              </label>
              <input
                type="number"
                value={inputs.numberOfPeople || ''}
                onChange={(e) => setInputs({ ...inputs, numberOfPeople: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold"
                placeholder="1"
                min="1"
                max="100"
              />
              <p className="text-xs text-gray-500 mt-2">
                {inputs.numberOfPeople > 1 
                  ? `Bill will be split among ${inputs.numberOfPeople} people`
                  : 'No split - single payment'}
              </p>
            </div>
          </div>
        </div>

        {/* Results Section - 2 columns */}
        <div className="md:col-span-2 space-y-6">
          {result && (
            <>
              <div id="tip-result" className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow-lg border border-blue-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Calculation Results
                </h3>

                <div className="space-y-4">
                  {/* Tip Amount */}
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="text-sm text-gray-600 mb-1">Tip Amount</div>
                    <div className="text-3xl font-bold text-green-600">
                      ${result.tipAmount.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {inputs.tipPercentage}% of ${result.billBeforeTax.toFixed(2)}
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                    <div className="text-3xl font-bold text-blue-600">
                      ${result.totalAmount.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Bill + Tip{result.taxAmount > 0 && ' + Tax'}
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-sm font-semibold text-gray-900 mb-3">Breakdown</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bill{inputs.beforeTax ? ' (before tax)' : ''}:</span>
                        <span className="font-semibold">${result.billBeforeTax.toFixed(2)}</span>
                      </div>
                      {result.taxAmount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax ({inputs.taxRate}%):</span>
                          <span className="font-semibold">${result.taxAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tip ({inputs.tipPercentage}%):</span>
                        <span className="font-semibold text-green-600">${result.tipAmount.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-300 pt-2 flex justify-between">
                        <span className="text-gray-900 font-bold">Total:</span>
                        <span className="font-bold text-blue-600">${result.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Per Person */}
                  {inputs.numberOfPeople > 1 && (
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="text-sm font-semibold text-gray-900 mb-3">
                        Per Person ({inputs.numberOfPeople} people)
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Each pays:</span>
                          <span className="font-bold text-purple-600 text-lg">
                            ${result.perPersonAmount.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Each tip:</span>
                          <span className="font-semibold">${result.perPersonTip.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Service Quality */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                    <div className="text-sm font-semibold text-gray-900 mb-2">Service Quality</div>
                    <div className="text-lg font-bold text-orange-600">{result.serviceQuality}</div>
                    <p className="text-xs text-gray-600 mt-2">
                      {inputs.tipPercentage >= 20 && 'Generous tip for exceptional service!'}
                      {inputs.tipPercentage >= 15 && inputs.tipPercentage < 20 && 'Standard tip for good service.'}
                      {inputs.tipPercentage < 15 && 'Consider tipping more for better service.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleShare}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Calculation
                  </button>
                  <button
                    onClick={handleSaveImage}
                    className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save as Image
                  </button>
                  <button
                    onClick={handlePrint}
                    className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                </div>
              </div>

              {/* Tipping Guide */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">💡 US Tipping Guide</h3>
                <div className="space-y-2 text-xs text-gray-700">
                  <div className="flex justify-between">
                    <span>Poor Service:</span>
                    <span className="font-semibold">10-12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fair Service:</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Good Service:</span>
                    <span className="font-semibold">18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Great Service:</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Excellent Service:</span>
                    <span className="font-semibold">25%+</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-4 italic">
                  Note: Tipping customs vary by country. In the US, 15-20% is standard for restaurants.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Tip Calculator"
      />
    </div>
  );
}

