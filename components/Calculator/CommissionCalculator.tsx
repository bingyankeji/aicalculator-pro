'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, Plus, Trash2, TrendingUp, DollarSign, Target } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface CommissionTier {
  id: string;
  from: number;
  to: number;
  rate: number;
}

interface Sale {
  id: string;
  description: string;
  amount: number;
  commissionRate: number;
}

interface CommissionResults {
  totalSales: number;
  totalCommission: number;
  baseSalary: number;
  totalIncome: number;
  averageCommissionRate: number;
  federalTax: number;
  stateTax: number;
  netIncome: number;
  salesByTier: Array<{
    tier: string;
    sales: number;
    commission: number;
    rate: number;
  }>;
  monthlyBreakdown: Array<{
    month: string;
    sales: number;
    commission: number;
    totalIncome: number;
  }>;
  targetProgress: {
    current: number;
    target: number;
    percentage: number;
    remaining: number;
  };
}

export default function CommissionCalculator() {
  const [commissionType, setCommissionType] = useState<'flat' | 'tiered' | 'individual'>('flat');
  const [inputs, setInputs] = useState({
    baseSalary: '3000',
    flatRate: '5',
    totalSales: '50000',
    salesTarget: '100000',
    filingStatus: 'single',
    stateWithholding: '5',
  });

  const [tiers, setTiers] = useState<CommissionTier[]>([
    { id: '1', from: 0, to: 25000, rate: 3 },
    { id: '2', from: 25000, to: 50000, rate: 5 },
    { id: '3', from: 50000, to: Infinity, rate: 7 },
  ]);

  const [sales, setSales] = useState<Sale[]>([
    { id: '1', description: 'Product A', amount: 10000, commissionRate: 5 },
  ]);

  const [results, setResults] = useState<CommissionResults | null>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/commission-calculator',
    getShareParams: () => ({
      type: commissionType,
      bs: inputs.baseSalary,
      rate: inputs.flatRate,
      sales: inputs.totalSales,
    }),
    getShareText: () => 
      results 
        ? `Commission Analysis: Total ${results.totalCommission.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} commission on ${results.totalSales.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} sales | Total income: ${results.totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}`
        : 'Check out my commission calculation!',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('type')) setCommissionType(params.get('type') as 'flat' | 'tiered' | 'individual');
    
    if (params.has('bs') || params.has('sales') || params.has('rate')) {
      const newInputs = { ...inputs };
      params.forEach((value, key) => {
        if (key in inputs) {
          newInputs[key as keyof typeof inputs] = value;
        }
      });
      setInputs(newInputs);
      setTimeout(calculateCommission, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const addTier = () => {
    const lastTier = tiers[tiers.length - 1];
    const newId = (Math.max(...tiers.map(t => parseInt(t.id)), 0) + 1).toString();
    setTiers([...tiers, {
      id: newId,
      from: lastTier.to === Infinity ? lastTier.from + 25000 : lastTier.to,
      to: Infinity,
      rate: lastTier.rate + 1
    }]);
  };

  const removeTier = (id: string) => {
    if (tiers.length > 1) {
      setTiers(tiers.filter(t => t.id !== id));
    }
  };

  const updateTier = (id: string, field: keyof CommissionTier, value: any) => {
    setTiers(tiers.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const addSale = () => {
    const newId = (Math.max(...sales.map(s => parseInt(s.id)), 0) + 1).toString();
    setSales([...sales, {
      id: newId,
      description: `Sale ${newId}`,
      amount: 0,
      commissionRate: 5
    }]);
  };

  const removeSale = (id: string) => {
    if (sales.length > 1) {
      setSales(sales.filter(s => s.id !== id));
    }
  };

  const updateSale = (id: string, field: keyof Sale, value: any) => {
    setSales(sales.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const calculateCommission = () => {
    const baseSalary = parseFloat(inputs.baseSalary) || 0;
    const salesTarget = parseFloat(inputs.salesTarget) || 0;
    const stateWithholding = parseFloat(inputs.stateWithholding) || 0;

    let totalSales = 0;
    let totalCommission = 0;
    let salesByTier: Array<{ tier: string; sales: number; commission: number; rate: number }> = [];

    if (commissionType === 'flat') {
      totalSales = parseFloat(inputs.totalSales) || 0;
      const flatRate = parseFloat(inputs.flatRate) || 0;
      totalCommission = (totalSales * flatRate) / 100;
      
      salesByTier = [{
        tier: `Flat ${flatRate}%`,
        sales: totalSales,
        commission: totalCommission,
        rate: flatRate
      }];
    } else if (commissionType === 'tiered') {
      totalSales = parseFloat(inputs.totalSales) || 0;
      
      // Sort tiers by 'from' value
      const sortedTiers = [...tiers].sort((a, b) => a.from - b.from);
      
      sortedTiers.forEach((tier, index) => {
        const tierStart = tier.from;
        const tierEnd = tier.to === Infinity ? totalSales : Math.min(tier.to, totalSales);
        
        if (totalSales > tierStart) {
          const salesInTier = Math.max(0, tierEnd - tierStart);
          const commissionInTier = (salesInTier * tier.rate) / 100;
          totalCommission += commissionInTier;
          
          salesByTier.push({
            tier: `Tier ${index + 1}: ${tier.from.toLocaleString()}-${tier.to === Infinity ? '∞' : tier.to.toLocaleString()} (${tier.rate}%)`,
            sales: salesInTier,
            commission: commissionInTier,
            rate: tier.rate
          });
        }
      });
    } else {
      // Individual sales
      sales.forEach(sale => {
        totalSales += sale.amount;
        const commission = (sale.amount * sale.commissionRate) / 100;
        totalCommission += commission;
      });

      salesByTier = sales.map(sale => ({
        tier: sale.description,
        sales: sale.amount,
        commission: (sale.amount * sale.commissionRate) / 100,
        rate: sale.commissionRate
      }));
    }

    const totalIncome = baseSalary + totalCommission;
    const averageCommissionRate = totalSales > 0 ? (totalCommission / totalSales) * 100 : 0;

    // Tax calculations
    const federalTax = calculateFederalTax(totalIncome, inputs.filingStatus);
    const stateTax = totalIncome * (stateWithholding / 100);
    const netIncome = totalIncome - federalTax - stateTax;

    // Target progress
    const targetProgress = {
      current: totalSales,
      target: salesTarget,
      percentage: salesTarget > 0 ? (totalSales / salesTarget) * 100 : 0,
      remaining: Math.max(0, salesTarget - totalSales)
    };

    // Monthly breakdown (simulated for demonstration)
    const monthlyBreakdown = [
      { month: 'Jan', sales: totalSales * 0.08, commission: totalCommission * 0.08, totalIncome: baseSalary + totalCommission * 0.08 },
      { month: 'Feb', sales: totalSales * 0.07, commission: totalCommission * 0.07, totalIncome: baseSalary + totalCommission * 0.07 },
      { month: 'Mar', sales: totalSales * 0.09, commission: totalCommission * 0.09, totalIncome: baseSalary + totalCommission * 0.09 },
      { month: 'Apr', sales: totalSales * 0.08, commission: totalCommission * 0.08, totalIncome: baseSalary + totalCommission * 0.08 },
      { month: 'May', sales: totalSales * 0.10, commission: totalCommission * 0.10, totalIncome: baseSalary + totalCommission * 0.10 },
      { month: 'Jun', sales: totalSales * 0.09, commission: totalCommission * 0.09, totalIncome: baseSalary + totalCommission * 0.09 },
      { month: 'Jul', sales: totalSales * 0.08, commission: totalCommission * 0.08, totalIncome: baseSalary + totalCommission * 0.08 },
      { month: 'Aug', sales: totalSales * 0.07, commission: totalCommission * 0.07, totalIncome: baseSalary + totalCommission * 0.07 },
      { month: 'Sep', sales: totalSales * 0.09, commission: totalCommission * 0.09, totalIncome: baseSalary + totalCommission * 0.09 },
      { month: 'Oct', sales: totalSales * 0.08, commission: totalCommission * 0.08, totalIncome: baseSalary + totalCommission * 0.08 },
      { month: 'Nov', sales: totalSales * 0.09, commission: totalCommission * 0.09, totalIncome: baseSalary + totalCommission * 0.09 },
      { month: 'Dec', sales: totalSales * 0.08, commission: totalCommission * 0.08, totalIncome: baseSalary + totalCommission * 0.08 },
    ];

    setResults({
      totalSales,
      totalCommission,
      baseSalary,
      totalIncome,
      averageCommissionRate,
      federalTax,
      stateTax,
      netIncome,
      salesByTier,
      monthlyBreakdown,
      targetProgress
    });

    // Update URL
    const params = new URLSearchParams();
    params.set('type', commissionType);
    Object.entries(inputs).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const calculateFederalTax = (income: number, filingStatus: string): number => {
    // Simplified 2024 federal tax brackets
    const brackets = filingStatus === 'married' 
      ? [
          { limit: 22000, rate: 0.10 },
          { limit: 89075, rate: 0.12 },
          { limit: 190750, rate: 0.22 },
          { limit: 364200, rate: 0.24 },
          { limit: 462500, rate: 0.32 },
          { limit: 693750, rate: 0.35 },
          { limit: Infinity, rate: 0.37 }
        ]
      : [
          { limit: 11000, rate: 0.10 },
          { limit: 44725, rate: 0.12 },
          { limit: 95375, rate: 0.22 },
          { limit: 182100, rate: 0.24 },
          { limit: 231250, rate: 0.32 },
          { limit: 578125, rate: 0.35 },
          { limit: Infinity, rate: 0.37 }
        ];

    let tax = 0;
    let previousLimit = 0;

    for (const bracket of brackets) {
      if (income <= previousLimit) break;
      
      const taxableInBracket = Math.min(income, bracket.limit) - previousLimit;
      tax += taxableInBracket * bracket.rate;
      previousLimit = bracket.limit;
      
      if (income <= bracket.limit) break;
    }

    return tax;
  };

  const handleSaveAsImage = async () => {
    const element = document.getElementById('commission-results');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = 'commission-calculator-results.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving as image:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="h-5 w-5 text-blue-600" />
                Commission Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="commissionType" className="text-sm font-medium">
                  Commission Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="commissionType"
                  value={commissionType}
                  onChange={(e) => setCommissionType(e.target.value as 'flat' | 'tiered' | 'individual')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="flat">Flat Rate</option>
                  <option value="tiered">Tiered/Stepped</option>
                  <option value="individual">Individual Sales</option>
                </select>
                <p className="text-xs text-gray-500">
                  {commissionType === 'flat' && 'Fixed percentage on all sales'}
                  {commissionType === 'tiered' && 'Different rates for sales ranges'}
                  {commissionType === 'individual' && 'Custom rate per sale'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="baseSalary" className="text-sm font-medium">
                  Base Salary ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="baseSalary"
                  type="number"
                  value={inputs.baseSalary}
                  onChange={(e) => handleInputChange('baseSalary', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3000"
                  min="0"
                  step="100"
                />
                <p className="text-xs text-gray-500">Monthly base salary (Default: $3,000)</p>
              </div>

              {commissionType === 'flat' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="totalSales" className="text-sm font-medium">
                      Total Sales ($) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="totalSales"
                      type="number"
                      value={inputs.totalSales}
                      onChange={(e) => handleInputChange('totalSales', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="50000"
                      min="0"
                      step="1000"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="flatRate" className="text-sm font-medium">
                      Commission Rate (%) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="flatRate"
                      type="number"
                      value={inputs.flatRate}
                      onChange={(e) => handleInputChange('flatRate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="5"
                      min="0"
                      max="100"
                      step="0.1"
                      required
                    />
                  </div>
                </>
              )}

              {commissionType === 'tiered' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="totalSales" className="text-sm font-medium">
                      Total Sales ($) <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="totalSales"
                      type="number"
                      value={inputs.totalSales}
                      onChange={(e) => handleInputChange('totalSales', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="50000"
                      min="0"
                      step="1000"
                      required
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="salesTarget" className="text-sm font-medium">
                  Sales Target ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="salesTarget"
                  type="number"
                  value={inputs.salesTarget}
                  onChange={(e) => handleInputChange('salesTarget', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="100000"
                  min="0"
                  step="1000"
                />
                <p className="text-xs text-gray-500">For tracking progress (Default: $100,000)</p>
              </div>
            </CardContent>
          </Card>

          {commissionType === 'tiered' && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Commission Tiers</CardTitle>
                  <Button onClick={addTier} size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Tier
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {tiers.map((tier, index) => (
                  <div key={tier.id} className="p-3 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">Tier {index + 1}</span>
                      {tiers.length > 1 && (
                        <Button 
                          onClick={() => removeTier(tier.id)}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">From ($)</Label>
                        <input
                          type="number"
                          value={tier.from}
                          onChange={(e) => updateTier(tier.id, 'from', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                          min="0"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">To ($)</Label>
                        <input
                          type="text"
                          value={tier.to === Infinity ? '∞' : tier.to}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateTier(tier.id, 'to', val === '∞' || val === 'Infinity' ? Infinity : parseFloat(val) || 0);
                          }}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                          placeholder="∞"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Rate (%)</Label>
                        <input
                          type="number"
                          value={tier.rate}
                          onChange={(e) => updateTier(tier.id, 'rate', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {commissionType === 'individual' && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Individual Sales</CardTitle>
                  <Button onClick={addSale} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Sale
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {sales.map((sale, index) => (
                  <div key={sale.id} className="p-3 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">Sale {index + 1}</span>
                      {sales.length > 1 && (
                        <Button 
                          onClick={() => removeSale(sale.id)}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={sale.description}
                      onChange={(e) => updateSale(sale.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                      placeholder="Description"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Amount ($)</Label>
                        <input
                          type="number"
                          value={sale.amount || ''}
                          onChange={(e) => updateSale(sale.id, 'amount', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                          placeholder="10000"
                          min="0"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Rate (%)</Label>
                        <input
                          type="number"
                          value={sale.commissionRate}
                          onChange={(e) => updateSale(sale.id, 'commissionRate', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                          placeholder="5"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
              <CardTitle className="text-xl">Tax Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="filingStatus" className="text-sm font-medium">
                  Filing Status <span className="text-red-500">*</span>
                </Label>
                <select
                  id="filingStatus"
                  value={inputs.filingStatus}
                  onChange={(e) => handleInputChange('filingStatus', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="single">Single</option>
                  <option value="married">Married Filing Jointly</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stateWithholding" className="text-sm font-medium">
                  State Tax Rate (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="stateWithholding"
                  type="number"
                  value={inputs.stateWithholding}
                  onChange={(e) => handleInputChange('stateWithholding', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5"
                  min="0"
                  max="15"
                  step="0.1"
                />
                <p className="text-xs text-gray-500">Default: 5%</p>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculateCommission}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Commission
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" id="commission-results">
          {results && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="shadow-lg border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {results.totalSales.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Commission</p>
                    <p className="text-2xl font-bold text-green-600">
                      {results.totalCommission.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{results.averageCommissionRate.toFixed(2)}% avg rate</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Income</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {results.totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Base + Commission</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Net After Tax</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {results.netIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Target Progress */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Sales Target Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Current Sales</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {results.targetProgress.current.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Target</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {results.targetProgress.target.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">{results.targetProgress.percentage.toFixed(1)}% Complete</span>
                        <span className="text-sm text-gray-600">
                          {results.targetProgress.remaining.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} remaining
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(results.targetProgress.percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {results.targetProgress.percentage >= 100 && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-semibold text-green-900">🎉 Target Achieved!</p>
                        <p className="text-xs text-green-700 mt-1">You've exceeded your sales target by {(results.targetProgress.percentage - 100).toFixed(1)}%</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Commission Breakdown */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle>Commission Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3">
                    {results.salesByTier.map((tier, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{tier.tier}</h4>
                          <span className="text-green-600 font-bold">
                            {tier.commission.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Sales: {tier.sales.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</span>
                          <span>Rate: {tier.rate}%</span>
                        </div>
                      </div>
                    ))}

                    <div className="p-4 bg-blue-50 border-t-2 border-blue-500 rounded-lg mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-bold">Total Commission</span>
                        <span className="text-xl font-bold text-blue-600">
                          {results.totalCommission.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Income & Tax Breakdown */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle>Income & Tax Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Base Salary</span>
                      <span className="font-semibold text-gray-900">
                        {results.baseSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700">Commission Earned</span>
                      <span className="font-semibold text-green-600">
                        +{results.totalCommission.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-t-2 border-gray-300">
                      <span className="text-gray-900 font-bold">Gross Income</span>
                      <span className="font-bold text-gray-900">
                        {results.totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-gray-700">Federal Tax</span>
                      <span className="font-semibold text-red-600">
                        -{results.federalTax.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-gray-700">State Tax</span>
                      <span className="font-semibold text-red-600">
                        -{results.stateTax.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 border-t-2 border-orange-500 rounded-lg">
                      <span className="text-gray-900 font-bold">Net Income</span>
                      <span className="text-xl font-bold text-orange-600">
                        {results.netIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Breakdown Chart */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle>Monthly Sales & Commission</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={results.monthlyBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
                        <Legend />
                        <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
                        <Bar dataKey="commission" fill="#10b981" name="Commission" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Export Actions */}
              <Card className="shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleSaveAsImage} variant="outline" className="flex-1 sm:flex-none min-h-[44px]">
                      <Download className="h-4 w-4 mr-2" />
                      Save as Image
                    </Button>
                    <Button onClick={handlePrint} variant="outline" className="flex-1 sm:flex-none min-h-[44px]">
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <Button onClick={handleShare} variant="outline" className="flex-1 sm:flex-none min-h-[44px]">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!results && (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  Enter your sales and commission structure, then click "Calculate Commission" to see your earnings breakdown.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Commission Calculator"
      />
    </div>
  );
}

