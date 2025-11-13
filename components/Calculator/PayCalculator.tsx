'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calculator, DollarSign, Share2, Download, Printer, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface PayInputs {
  grossPay: number;
  payFrequency: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'annually';
  federalTaxRate: number;
  stateTaxRate: number;
  localTaxRate: number;
  socialSecurityRate: number; // 6.2%
  medicareRate: number; // 1.45%
  retirement401k: number; // percentage
  healthInsurance: number; // dollar amount
  otherDeductions: number; // dollar amount
}

interface PayResult {
  grossPay: number;
  federalTax: number;
  stateTax: number;
  localTax: number;
  socialSecurity: number;
  medicare: number;
  totalFICA: number;
  retirement401k: number;
  healthInsurance: number;
  otherDeductions: number;
  totalDeductions: number;
  netPay: number;
  takeHomePercentage: number;
  // Annual equivalents
  annualGross: number;
  annualNet: number;
  monthlyNet: number;
  biweeklyNet: number;
  weeklyNet: number;
}

export function PayCalculator() {
  const resultRef = useRef<HTMLDivElement>(null);

  const [inputs, setInputs] = useState<PayInputs>({
    grossPay: 5000,
    payFrequency: 'monthly',
    federalTaxRate: 22, // 22% federal bracket
    stateTaxRate: 5,    // 5% state tax
    localTaxRate: 0,    // Optional
    socialSecurityRate: 6.2,
    medicareRate: 1.45,
    retirement401k: 10, // 10% to 401k
    healthInsurance: 200, // $200/month
    otherDeductions: 0,
  });

  const [result, setResult] = useState<PayResult | null>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/pay-calculator',
    getShareParams: () => ({
      gp: inputs.grossPay.toString(),
      pf: inputs.payFrequency,
      ft: inputs.federalTaxRate.toString(),
      st: inputs.stateTaxRate.toString(),
      lt: inputs.localTaxRate.toString(),
      ss: inputs.socialSecurityRate.toString(),
      mc: inputs.medicareRate.toString(),
      r4: inputs.retirement401k.toString(),
      hi: inputs.healthInsurance.toString(),
      od: inputs.otherDeductions.toString(),
    }),
    getShareText: () => 
      result 
        ? `My Paycheck Calculation: Gross $${result.grossPay.toLocaleString('en-US')} | Net $${result.netPay.toLocaleString('en-US')} (${result.takeHomePercentage.toFixed(1)}% take-home)`
        : 'Check out my paycheck calculation!',
  });

  // Calculate pay based on frequency
  const calculatePay = useMemo(() => {
    const { grossPay, payFrequency, federalTaxRate, stateTaxRate, localTaxRate, 
            socialSecurityRate, medicareRate, retirement401k, healthInsurance, otherDeductions } = inputs;

    if (grossPay <= 0) return null;

    // Convert to annual gross for consistent calculation
    let annualGross = grossPay;
    switch (payFrequency) {
      case 'weekly':
        annualGross = grossPay * 52;
        break;
      case 'biweekly':
        annualGross = grossPay * 26;
        break;
      case 'semimonthly':
        annualGross = grossPay * 24;
        break;
      case 'monthly':
        annualGross = grossPay * 12;
        break;
      case 'annually':
        annualGross = grossPay;
        break;
    }

    // Calculate deductions
    const federalTax = annualGross * (federalTaxRate / 100);
    const stateTax = annualGross * (stateTaxRate / 100);
    const localTax = annualGross * (localTaxRate / 100);
    const socialSecurity = Math.min(annualGross * (socialSecurityRate / 100), 10453.2); // 2024 max
    const medicare = annualGross * (medicareRate / 100);
    const totalFICA = socialSecurity + medicare;
    
    // Pre-tax deductions (401k reduces taxable income, but we simplified here for clarity)
    const retirement = annualGross * (retirement401k / 100);
    
    // Convert per-paycheck deductions to annual
    let annualHealthInsurance = healthInsurance;
    switch (payFrequency) {
      case 'weekly':
        annualHealthInsurance = healthInsurance * 52;
        break;
      case 'biweekly':
        annualHealthInsurance = healthInsurance * 26;
        break;
      case 'semimonthly':
        annualHealthInsurance = healthInsurance * 24;
        break;
      case 'monthly':
        annualHealthInsurance = healthInsurance * 12;
        break;
      case 'annually':
        annualHealthInsurance = healthInsurance;
        break;
    }

    let annualOtherDeductions = otherDeductions;
    switch (payFrequency) {
      case 'weekly':
        annualOtherDeductions = otherDeductions * 52;
        break;
      case 'biweekly':
        annualOtherDeductions = otherDeductions * 26;
        break;
      case 'semimonthly':
        annualOtherDeductions = otherDeductions * 24;
        break;
      case 'monthly':
        annualOtherDeductions = otherDeductions * 12;
        break;
      case 'annually':
        annualOtherDeductions = otherDeductions;
        break;
    }

    const totalDeductions = federalTax + stateTax + localTax + totalFICA + 
                           retirement + annualHealthInsurance + annualOtherDeductions;
    const annualNet = annualGross - totalDeductions;
    const takeHomePercentage = (annualNet / annualGross) * 100;

    // Convert to different pay frequencies
    const monthlyNet = annualNet / 12;
    const biweeklyNet = annualNet / 26;
    const weeklyNet = annualNet / 52;

    return {
      grossPay,
      federalTax: Math.round(federalTax),
      stateTax: Math.round(stateTax),
      localTax: Math.round(localTax),
      socialSecurity: Math.round(socialSecurity),
      medicare: Math.round(medicare),
      totalFICA: Math.round(totalFICA),
      retirement401k: Math.round(retirement),
      healthInsurance: Math.round(annualHealthInsurance),
      otherDeductions: Math.round(annualOtherDeductions),
      totalDeductions: Math.round(totalDeductions),
      netPay: Math.round(annualNet),
      takeHomePercentage: Math.round(takeHomePercentage * 10) / 10,
      annualGross: Math.round(annualGross),
      annualNet: Math.round(annualNet),
      monthlyNet: Math.round(monthlyNet),
      biweeklyNet: Math.round(biweeklyNet),
      weeklyNet: Math.round(weeklyNet),
    };
  }, [inputs]);

  const handleCalculate = () => {
    const calculatedResult = calculatePay;
    if (calculatedResult) {
      setResult(calculatedResult);
    }
  };

  const handleReset = () => {
    setInputs({
      grossPay: 5000,
      payFrequency: 'monthly',
      federalTaxRate: 22,
      stateTaxRate: 5,
      localTaxRate: 0,
      socialSecurityRate: 6.2,
      medicareRate: 1.45,
      retirement401k: 10,
      healthInsurance: 200,
      otherDeductions: 0,
    });
    setResult(null);
  };


  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;

    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `paycheck-calculation-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Load from URL params
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('gp')) {
      const newInputs: PayInputs = {
        grossPay: parseFloat(params.get('gp') || '5000'),
        payFrequency: (params.get('pf') || 'monthly') as PayInputs['payFrequency'],
        federalTaxRate: parseFloat(params.get('ft') || '22'),
        stateTaxRate: parseFloat(params.get('st') || '5'),
        localTaxRate: parseFloat(params.get('lt') || '0'),
        socialSecurityRate: 6.2,
        medicareRate: 1.45,
        retirement401k: parseFloat(params.get('r401k') || '10'),
        healthInsurance: parseFloat(params.get('hi') || '200'),
        otherDeductions: 0,
      };
      setInputs(newInputs);
      setTimeout(() => {
        handleCalculate();
      }, 100);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Input Form (3 columns) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Gross Pay Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Pay Information</h3>
            
            {/* Gross Pay */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gross Pay ($)
              </label>
              <input
                type="number"
                value={inputs.grossPay}
                onChange={(e) => setInputs({ ...inputs, grossPay: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="5000"
                min="0"
                step="100"
              />
              <p className="text-xs text-gray-500 mt-1">Enter your gross pay before any deductions</p>
            </div>

            {/* Pay Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pay Frequency
              </label>
              <select
                value={inputs.payFrequency}
                onChange={(e) => setInputs({ ...inputs, payFrequency: e.target.value as PayInputs['payFrequency'] })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                <option value="weekly">Weekly (52 paychecks/year)</option>
                <option value="biweekly">Bi-weekly (26 paychecks/year)</option>
                <option value="semimonthly">Semi-monthly (24 paychecks/year)</option>
                <option value="monthly">Monthly (12 paychecks/year)</option>
                <option value="annually">Annually (1 paycheck/year)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">How often you receive your paycheck</p>
            </div>
          </div>

          {/* Tax Withholdings Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tax Withholdings</h3>
            
            {/* Federal Tax */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Federal Tax Rate (%)
              </label>
              <input
                type="number"
                value={inputs.federalTaxRate}
                onChange={(e) => setInputs({ ...inputs, federalTaxRate: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="22"
                min="0"
                max="37"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">2024 rates: 10%, 12%, 22%, 24%, 32%, 35%, 37%</p>
            </div>

            {/* State Tax */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State Tax Rate (%)
              </label>
              <input
                type="number"
                value={inputs.stateTaxRate}
                onChange={(e) => setInputs({ ...inputs, stateTaxRate: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="5"
                min="0"
                max="13"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">Varies by state: 0-13.3% (CA highest)</p>
            </div>

            {/* Local Tax */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local Tax Rate (%) <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="number"
                value={inputs.localTaxRate}
                onChange={(e) => setInputs({ ...inputs, localTaxRate: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0"
                min="0"
                max="5"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">City/county tax if applicable</p>
            </div>
          </div>

          {/* Deductions Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Deductions</h3>
            
            {/* 401k */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                401(k) Contribution (%)
              </label>
              <input
                type="number"
                value={inputs.retirement401k}
                onChange={(e) => setInputs({ ...inputs, retirement401k: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="10"
                min="0"
                max="100"
                step="1"
              />
              <p className="text-xs text-gray-500 mt-1">2024 limit: $23,000 (under 50) or $30,500 (50+)</p>
            </div>

            {/* Health Insurance */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Health Insurance ($)
              </label>
              <input
                type="number"
                value={inputs.healthInsurance}
                onChange={(e) => setInputs({ ...inputs, healthInsurance: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="200"
                min="0"
                step="10"
              />
              <p className="text-xs text-gray-500 mt-1">Per paycheck premium amount</p>
            </div>

            {/* Other Deductions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Deductions ($) <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="number"
                value={inputs.otherDeductions}
                onChange={(e) => setInputs({ ...inputs, otherDeductions: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0"
                min="0"
                step="10"
              />
              <p className="text-xs text-gray-500 mt-1">FSA, HSA, union dues, etc. (per paycheck)</p>
            </div>
          </div>

          {/* Calculate Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleCalculate}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md font-medium text-lg"
            >
              <Calculator className="w-5 h-5" />
              Calculate Pay
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>

        {/* Right: Results (2 columns) */}
        <div className="lg:col-span-2">
          <div className="sticky top-4 space-y-6">
            {!result ? (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">
                  Enter your pay information and click "Calculate Pay" to see your take-home pay and detailed breakdown.
                </p>
              </div>
            ) : (
              <div ref={resultRef} className="space-y-6">
                {/* Main Net Pay Result */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Your Take-Home Pay</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
                      <span className="text-white font-bold">Annual Net Pay</span>
                      <span className="text-2xl font-bold text-white">${result.annualNet.toLocaleString('en-US')}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">Monthly</span>
                      <span className="text-xl font-bold text-gray-900">${result.monthlyNet.toLocaleString('en-US')}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">Bi-weekly</span>
                      <span className="text-xl font-bold text-gray-900">${result.biweeklyNet.toLocaleString('en-US')}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">Weekly</span>
                      <span className="text-xl font-bold text-gray-900">${result.weeklyNet.toLocaleString('en-US')}</span>
                    </div>

                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Take-Home:</span> {result.takeHomePercentage}% of gross pay
                      </p>
                    </div>
                  </div>
                </div>

                {/* Deductions Breakdown */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Annual Deductions Breakdown</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700">Federal Tax</span>
                      <span className="font-semibold text-red-600">${result.federalTax.toLocaleString('en-US')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700">State Tax</span>
                      <span className="font-semibold text-red-600">${result.stateTax.toLocaleString('en-US')}</span>
                    </div>
                    {result.localTax > 0 && (
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-700">Local Tax</span>
                        <span className="font-semibold text-red-600">${result.localTax.toLocaleString('en-US')}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700">Social Security (6.2%)</span>
                      <span className="font-semibold text-orange-600">${result.socialSecurity.toLocaleString('en-US')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700">Medicare (1.45%)</span>
                      <span className="font-semibold text-orange-600">${result.medicare.toLocaleString('en-US')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700">401(k) Contribution</span>
                      <span className="font-semibold text-blue-600">${result.retirement401k.toLocaleString('en-US')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700">Health Insurance</span>
                      <span className="font-semibold text-purple-600">${result.healthInsurance.toLocaleString('en-US')}</span>
                    </div>
                    {result.otherDeductions > 0 && (
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-700">Other Deductions</span>
                        <span className="font-semibold text-gray-600">${result.otherDeductions.toLocaleString('en-US')}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-3 bg-gray-50 rounded-lg px-3 mt-2">
                      <span className="text-gray-900 font-bold">Total Deductions</span>
                      <span className="text-xl font-bold text-red-600">${result.totalDeductions.toLocaleString('en-US')}</span>
                    </div>
                  </div>
                </div>

                {/* Gross vs Net Visual */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Pay Breakdown</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Take-Home ({result.takeHomePercentage}%)</span>
                        <span className="font-semibold">${result.annualNet.toLocaleString('en-US')}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-600 h-3 rounded-full"
                          style={{ width: `${result.takeHomePercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Deductions ({(100 - result.takeHomePercentage).toFixed(1)}%)</span>
                        <span className="font-semibold">${result.totalDeductions.toLocaleString('en-US')}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-red-500 h-3 rounded-full"
                          style={{ width: `${100 - result.takeHomePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={handleShare}
                    className="flex flex-col items-center gap-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-xs font-medium">Share</span>
                  </button>
                  <button
                    onClick={handleSaveAsImage}
                    className="flex flex-col items-center gap-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-xs font-medium">Save</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex flex-col items-center gap-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
                  >
                    <Printer className="w-4 h-4" />
                    <span className="text-xs font-medium">Print</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Paycheck Calculator"
      />
    </div>
  );
}

