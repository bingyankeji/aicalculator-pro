'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Download, DollarSign, Clock, AlertTriangle, Calculator, Users } from 'lucide-react';
import html2canvas from 'html2canvas';

interface OvertimeInputs {
  regularHours: number;
  overtimeHours: number;
  regularRate: number;
  overtimeMultiplier: number;
  payPeriod: 'weekly' | 'biweekly' | 'monthly';
  employeeType: 'non-exempt' | 'exempt';
  doubleTimeHours: number;
  doubleTimeMultiplier: number;
  state: string;
}

interface OvertimeResult {
  regularPay: number;
  overtimePay: number;
  doubleTimePay: number;
  totalPay: number;
  totalHours: number;
  effectiveHourlyRate: number;
  weeklyEquivalent: number;
  annualEquivalent: number;
  complianceStatus: 'compliant' | 'warning' | 'violation';
  complianceNotes: string[];
  costAnalysis: {
    regularCost: number;
    overtimePremium: number;
    totalPremium: number;
    costPercentage: number;
  };
}

// State-specific overtime rules (simplified)
const stateOvertimeRules: { [key: string]: { name: string; dailyOT: number; weeklyOT: number; notes: string } } = {
  'CA': { name: 'California', dailyOT: 8, weeklyOT: 40, notes: 'Daily OT after 8 hours, double time after 12 hours' },
  'AK': { name: 'Alaska', dailyOT: 8, weeklyOT: 40, notes: 'Daily OT after 8 hours' },
  'NV': { name: 'Nevada', dailyOT: 8, weeklyOT: 40, notes: 'Daily OT after 8 hours (if rate < 1.5x minimum wage)' },
  'CO': { name: 'Colorado', dailyOT: 12, weeklyOT: 40, notes: 'Daily OT after 12 hours' },
  'Federal': { name: 'Federal (FLSA)', dailyOT: 0, weeklyOT: 40, notes: 'Weekly OT after 40 hours only' }
};

const calculateOvertime = (inputs: OvertimeInputs): OvertimeResult | null => {
  if (inputs.regularRate <= 0) return null;

  const regularPay = inputs.regularHours * inputs.regularRate;
  const overtimePay = inputs.overtimeHours * inputs.regularRate * inputs.overtimeMultiplier;
  const doubleTimePay = inputs.doubleTimeHours * inputs.regularRate * inputs.doubleTimeMultiplier;
  const totalPay = regularPay + overtimePay + doubleTimePay;
  const totalHours = inputs.regularHours + inputs.overtimeHours + inputs.doubleTimeHours;
  const effectiveHourlyRate = totalHours > 0 ? totalPay / totalHours : 0;

  // Convert to weekly equivalent for analysis
  let weeklyMultiplier = 1;
  switch (inputs.payPeriod) {
    case 'biweekly':
      weeklyMultiplier = 0.5;
      break;
    case 'monthly':
      weeklyMultiplier = 12 / 52;
      break;
  }

  const weeklyEquivalent = totalPay * weeklyMultiplier;
  const annualEquivalent = weeklyEquivalent * 52;

  // Compliance analysis
  let complianceStatus: 'compliant' | 'warning' | 'violation' = 'compliant';
  const complianceNotes: string[] = [];

  const stateRule = stateOvertimeRules[inputs.state] || stateOvertimeRules['Federal'];
  const weeklyHours = totalHours * weeklyMultiplier;

  // Check weekly overtime compliance
  if (weeklyHours > stateRule.weeklyOT && inputs.overtimeHours === 0) {
    complianceStatus = 'violation';
    complianceNotes.push(`Weekly hours (${weeklyHours.toFixed(1)}) exceed ${stateRule.weeklyOT} without overtime pay`);
  }

  // Check daily overtime for applicable states
  if (stateRule.dailyOT > 0) {
    const dailyHours = totalHours / (inputs.payPeriod === 'weekly' ? 5 : inputs.payPeriod === 'biweekly' ? 10 : 22);
    if (dailyHours > stateRule.dailyOT && inputs.overtimeHours === 0) {
      complianceStatus = 'violation';
      complianceNotes.push(`Daily hours may exceed ${stateRule.dailyOT} without overtime pay`);
    }
  }

  // Check exempt employee overtime
  if (inputs.employeeType === 'exempt' && (inputs.overtimeHours > 0 || inputs.doubleTimeHours > 0)) {
    complianceStatus = 'warning';
    complianceNotes.push('Exempt employees typically not eligible for overtime pay');
  }

  // Check overtime rate compliance
  if (inputs.overtimeMultiplier < 1.5) {
    complianceStatus = 'violation';
    complianceNotes.push('Overtime rate must be at least 1.5x regular rate under FLSA');
  }

  // Cost analysis
  const regularCost = inputs.regularHours * inputs.regularRate;
  const overtimePremium = inputs.overtimeHours * inputs.regularRate * (inputs.overtimeMultiplier - 1);
  const doubleTimePremium = inputs.doubleTimeHours * inputs.regularRate * (inputs.doubleTimeMultiplier - 1);
  const totalPremium = overtimePremium + doubleTimePremium;
  const costPercentage = regularCost > 0 ? (totalPremium / regularCost) * 100 : 0;

  if (complianceNotes.length === 0) {
    complianceNotes.push('Appears compliant with federal and applicable state overtime laws');
  }

  return {
    regularPay,
    overtimePay,
    doubleTimePay,
    totalPay,
    totalHours,
    effectiveHourlyRate,
    weeklyEquivalent,
    annualEquivalent,
    complianceStatus,
    complianceNotes,
    costAnalysis: {
      regularCost,
      overtimePremium,
      totalPremium,
      costPercentage
    }
  };
};

export default function OvertimeCalculator() {
  const [inputs, setInputs] = useState<OvertimeInputs>({
    regularHours: 40,
    overtimeHours: 10,
    regularRate: 20,
    overtimeMultiplier: 1.5,
    payPeriod: 'weekly',
    employeeType: 'non-exempt',
    doubleTimeHours: 0,
    doubleTimeMultiplier: 2.0,
    state: 'Federal'
  });

  const result = useMemo(() => calculateOvertime(inputs), [inputs]);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSaveAsImage = async () => {
    if (!resultRef.current || !result) return;
    
    try {
      const canvas = await html2canvas(resultRef.current);
      
      const link = document.createElement('a');
      link.download = `overtime-calculation-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const getCalculationSummary = (): string => {
    if (!result) return '';
    
    const total = result.totalPay.toLocaleString();
    const hours = result.totalHours.toFixed(1);
    const rate = result.effectiveHourlyRate.toFixed(2);
    
    return `Total pay of $${total} for ${hours} hours (${inputs.regularHours} regular + ${inputs.overtimeHours} overtime) at effective rate of $${rate}/hour with ${result.costAnalysis.costPercentage.toFixed(1)}% overtime premium.`;
  };

  const handleInputChange = (field: keyof OvertimeInputs, value: number | string) => {
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
            {/* Basic Information */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Regular Hourly Rate ($)
                </label>
                <input
                  type="number"
                  value={inputs.regularRate}
                  onChange={(e) => handleInputChange('regularRate', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter hourly rate"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Regular Hours
                </label>
                <input
                  type="number"
                  value={inputs.regularHours}
                  onChange={(e) => handleInputChange('regularHours', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter regular hours"
                  min="0"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overtime Hours
                </label>
                <input
                  type="number"
                  value={inputs.overtimeHours}
                  onChange={(e) => handleInputChange('overtimeHours', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter overtime hours"
                  min="0"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overtime Multiplier
                </label>
                <select
                  value={inputs.overtimeMultiplier}
                  onChange={(e) => handleInputChange('overtimeMultiplier', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1.5}>1.5x (Time and a Half)</option>
                  <option value={2.0}>2.0x (Double Time)</option>
                  <option value={1.25}>1.25x (Quarter Time)</option>
                  <option value={1.0}>1.0x (Straight Time)</option>
                </select>
              </div>
            </div>

            {/* Double Time */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Double Time Hours (Optional)
                </label>
                <input
                  type="number"
                  value={inputs.doubleTimeHours}
                  onChange={(e) => handleInputChange('doubleTimeHours', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter double time hours"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pay Period
                </label>
                <select
                  value={inputs.payPeriod}
                  onChange={(e) => handleInputChange('payPeriod', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Type
                </label>
                <select
                  value={inputs.employeeType}
                  onChange={(e) => handleInputChange('employeeType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="non-exempt">Non-Exempt (Eligible for OT)</option>
                  <option value="exempt">Exempt (Salary/Management)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Jurisdiction
                </label>
                <select
                  value={inputs.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Federal">Federal (FLSA)</option>
                  <option value="CA">California</option>
                  <option value="AK">Alaska</option>
                  <option value="NV">Nevada</option>
                  <option value="CO">Colorado</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSaveAsImage}
              disabled={!result}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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

                {/* Pay Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Regular Pay</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      ${result.regularPay.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-700 mt-1">
                      {inputs.regularHours} hours × ${inputs.regularRate}
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Overtime Pay</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-900">
                      ${result.overtimePay.toLocaleString()}
                    </div>
                    <div className="text-xs text-orange-700 mt-1">
                      {inputs.overtimeHours} hours × ${(inputs.regularRate * inputs.overtimeMultiplier).toFixed(2)}
                    </div>
                  </div>

                  {result.doubleTimePay > 0 && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">Double Time Pay</span>
                      </div>
                      <div className="text-2xl font-bold text-red-900">
                        ${result.doubleTimePay.toLocaleString()}
                      </div>
                      <div className="text-xs text-red-700 mt-1">
                        {inputs.doubleTimeHours} hours × ${(inputs.regularRate * inputs.doubleTimeMultiplier).toFixed(2)}
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Total Pay</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      ${result.totalPay.toLocaleString()}
                    </div>
                    <div className="text-xs text-blue-700 mt-1">
                      Effective rate: ${result.effectiveHourlyRate.toFixed(2)}/hour
                    </div>
                  </div>
                </div>

                {/* Compliance Status */}
                <div className={`p-4 rounded-lg border ${
                  result.complianceStatus === 'compliant' ? 'bg-green-50 border-green-200' :
                  result.complianceStatus === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className={`w-4 h-4 ${
                      result.complianceStatus === 'compliant' ? 'text-green-600' :
                      result.complianceStatus === 'warning' ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                    <h4 className={`font-semibold ${
                      result.complianceStatus === 'compliant' ? 'text-green-900' :
                      result.complianceStatus === 'warning' ? 'text-yellow-900' :
                      'text-red-900'
                    }`}>
                      Compliance Status: {result.complianceStatus.charAt(0).toUpperCase() + result.complianceStatus.slice(1)}
                    </h4>
                  </div>
                  <ul className={`text-sm space-y-1 ${
                    result.complianceStatus === 'compliant' ? 'text-green-800' :
                    result.complianceStatus === 'warning' ? 'text-yellow-800' :
                    'text-red-800'
                  }`}>
                    {result.complianceNotes.map((note, index) => (
                      <li key={index}>• {note}</li>
                    ))}
                  </ul>
                </div>

                {/* Cost Analysis */}
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Cost Analysis
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-purple-800">Regular Time Cost:</span>
                      <span className="font-semibold text-purple-900 ml-2">
                        ${result.costAnalysis.regularCost.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-purple-800">Overtime Premium:</span>
                      <span className="font-semibold text-purple-900 ml-2">
                        ${result.costAnalysis.totalPremium.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-purple-800">Premium Percentage:</span>
                      <span className="font-semibold text-purple-900 ml-2">
                        {result.costAnalysis.costPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-purple-800">Total Labor Cost:</span>
                      <span className="font-semibold text-purple-900 ml-2">
                        ${result.totalPay.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Projections */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Pay Period Projections</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Current Period:</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        ${result.totalPay.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Weekly Equivalent:</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        ${result.weeklyEquivalent.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Annual Equivalent:</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        ${result.annualEquivalent.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* State Rules */}
                {inputs.state !== 'Federal' && stateOvertimeRules[inputs.state] && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      {stateOvertimeRules[inputs.state].name} Overtime Rules
                    </h4>
                    <p className="text-blue-800 text-sm">
                      {stateOvertimeRules[inputs.state].notes}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">⏰</div>
                <p className="text-gray-500">Enter work hours and rate to calculate overtime pay</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
