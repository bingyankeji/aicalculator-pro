'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, Plus, Trash2, Globe, DollarSign } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface VATItem {
  id: string;
  description: string;
  amount: number;
  vatRate: number;
  vatCategory: string;
}

interface VATResults {
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
  effectiveVATRate: number;
  items: Array<{
    description: string;
    netAmount: number;
    vatRate: number;
    vatAmount: number;
    grossAmount: number;
    category: string;
  }>;
}

// VAT rates by country/region (2024)
const vatRatesByCountry: { [key: string]: { standard: number; reduced: number[]; categories: { [key: string]: number } } } = {
  'UK': { 
    standard: 20, 
    reduced: [5, 0], 
    categories: { 'Standard': 20, 'Reduced': 5, 'Zero-rated': 0, 'Exempt': 0 }
  },
  'EU-DE': { 
    standard: 19, 
    reduced: [7], 
    categories: { 'Standard': 19, 'Reduced (Food/Books)': 7, 'Zero-rated': 0 }
  },
  'EU-FR': { 
    standard: 20, 
    reduced: [10, 5.5, 2.1], 
    categories: { 'Standard': 20, 'Intermediate': 10, 'Reduced': 5.5, 'Super-reduced': 2.1 }
  },
  'EU-ES': { 
    standard: 21, 
    reduced: [10, 4], 
    categories: { 'Standard': 21, 'Reduced': 10, 'Super-reduced': 4 }
  },
  'EU-IT': { 
    standard: 22, 
    reduced: [10, 5, 4], 
    categories: { 'Standard': 22, 'Reduced': 10, 'Super-reduced (Food)': 5, 'Minimum': 4 }
  },
  'EU-NL': { 
    standard: 21, 
    reduced: [9], 
    categories: { 'Standard': 21, 'Reduced (Food/Books)': 9, 'Zero-rated': 0 }
  },
  'EU-BE': { 
    standard: 21, 
    reduced: [12, 6], 
    categories: { 'Standard': 21, 'Intermediate': 12, 'Reduced': 6 }
  },
  'EU-SE': { 
    standard: 25, 
    reduced: [12, 6], 
    categories: { 'Standard': 25, 'Reduced (Food)': 12, 'Super-reduced': 6 }
  },
  'EU-DK': { 
    standard: 25, 
    reduced: [], 
    categories: { 'Standard': 25 }
  },
  'EU-PL': { 
    standard: 23, 
    reduced: [8, 5], 
    categories: { 'Standard': 23, 'Reduced': 8, 'Super-reduced': 5 }
  },
  'CA': { 
    standard: 5, 
    reduced: [], 
    categories: { 'GST': 5, 'HST (ON/NB/NL/NS/PE)': 13, 'HST (BC)': 12, 'PST+GST (SK)': 11, 'PST+GST (QC)': 14.975 }
  },
  'AU': { 
    standard: 10, 
    reduced: [], 
    categories: { 'GST': 10, 'GST-free': 0 }
  },
  'NZ': { 
    standard: 15, 
    reduced: [], 
    categories: { 'GST': 15, 'Zero-rated': 0 }
  },
  'CH': { 
    standard: 8.1, 
    reduced: [2.6, 3.8], 
    categories: { 'Standard': 8.1, 'Reduced': 2.6, 'Special (Accommodation)': 3.8 }
  },
  'NO': { 
    standard: 25, 
    reduced: [15, 12], 
    categories: { 'Standard': 25, 'Reduced (Food)': 15, 'Raw food': 12 }
  },
  'JP': { 
    standard: 10, 
    reduced: [8], 
    categories: { 'Standard': 10, 'Reduced (Food/Newspapers)': 8 }
  },
  'SG': { 
    standard: 9, 
    reduced: [], 
    categories: { 'GST': 9, 'Zero-rated': 0 }
  },
  'IE': { 
    standard: 23, 
    reduced: [13.5, 9, 4.8], 
    categories: { 'Standard': 23, 'Reduced': 13.5, 'Second reduced': 9, 'Super-reduced': 4.8 }
  },
};

const countries = [
  { code: 'UK', name: 'United Kingdom' },
  { code: 'EU-DE', name: 'Germany' },
  { code: 'EU-FR', name: 'France' },
  { code: 'EU-ES', name: 'Spain' },
  { code: 'EU-IT', name: 'Italy' },
  { code: 'EU-NL', name: 'Netherlands' },
  { code: 'EU-BE', name: 'Belgium' },
  { code: 'EU-SE', name: 'Sweden' },
  { code: 'EU-DK', name: 'Denmark' },
  { code: 'EU-PL', name: 'Poland' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'NO', name: 'Norway' },
  { code: 'JP', name: 'Japan' },
  { code: 'SG', name: 'Singapore' },
  { code: 'IE', name: 'Ireland' },
];

export default function VATCalculator() {
  const [calculationMode, setCalculationMode] = useState<'add' | 'remove'>('add');
  const [country, setCountry] = useState('UK');
  const [singleAmount, setSingleAmount] = useState('1000');
  const [singleVATRate, setSingleVATRate] = useState('20');
  const [items, setItems] = useState<VATItem[]>([
    { id: '1', description: 'Item 1', amount: 1000, vatRate: 20, vatCategory: 'Standard' }
  ]);
  const [results, setResults] = useState<VATResults | null>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/vat-calculator',
    getShareParams: () => ({
      mode: calculationMode,
      country: country,
      amount: singleAmount,
      rate: singleVATRate,
    }),
    getShareText: () => 
      results 
        ? `VAT Calculation: Net ${results.netAmount.toFixed(2)} + VAT ${results.vatAmount.toFixed(2)} = Gross ${results.grossAmount.toFixed(2)} (${results.effectiveVATRate.toFixed(1)}% rate)`
        : 'Check out my VAT calculation!',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode')) setCalculationMode(params.get('mode') as 'add' | 'remove');
    if (params.get('country')) setCountry(params.get('country')!);
    if (params.get('amount')) setSingleAmount(params.get('amount')!);
    if (params.get('rate')) setSingleVATRate(params.get('rate')!);
    
    if (params.has('amount')) {
      setTimeout(calculateVAT, 100);
    }
  }, []);

  const addItem = () => {
    const newId = (Math.max(...items.map(i => parseInt(i.id)), 0) + 1).toString();
    const standardRate = vatRatesByCountry[country]?.standard || 20;
    setItems([...items, { 
      id: newId, 
      description: `Item ${newId}`, 
      amount: 0, 
      vatRate: standardRate,
      vatCategory: 'Standard'
    }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof VATItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const calculateVAT = () => {
    if (items.length === 1 && items[0].amount === 0) {
      // Single item mode
      const amount = parseFloat(singleAmount) || 0;
      const vatRate = parseFloat(singleVATRate) || 0;

      let netAmount: number;
      let vatAmount: number;
      let grossAmount: number;

      if (calculationMode === 'add') {
        // Add VAT to net amount
        netAmount = amount;
        vatAmount = (amount * vatRate) / 100;
        grossAmount = amount + vatAmount;
      } else {
        // Remove VAT from gross amount
        grossAmount = amount;
        netAmount = amount / (1 + vatRate / 100);
        vatAmount = amount - netAmount;
      }

      setResults({
        netAmount,
        vatAmount,
        grossAmount,
        effectiveVATRate: vatRate,
        items: [{
          description: 'Single Item',
          netAmount,
          vatRate,
          vatAmount,
          grossAmount,
          category: 'Standard'
        }]
      });
    } else {
      // Multiple items mode
      const itemResults = items.map(item => {
        let netAmount: number;
        let vatAmount: number;
        let grossAmount: number;

        if (calculationMode === 'add') {
          netAmount = item.amount;
          vatAmount = (item.amount * item.vatRate) / 100;
          grossAmount = item.amount + vatAmount;
        } else {
          grossAmount = item.amount;
          netAmount = item.amount / (1 + item.vatRate / 100);
          vatAmount = item.amount - netAmount;
        }

        return {
          description: item.description,
          netAmount,
          vatRate: item.vatRate,
          vatAmount,
          grossAmount,
          category: item.vatCategory
        };
      });

      const totalNet = itemResults.reduce((sum, item) => sum + item.netAmount, 0);
      const totalVAT = itemResults.reduce((sum, item) => sum + item.vatAmount, 0);
      const totalGross = itemResults.reduce((sum, item) => sum + item.grossAmount, 0);
      const effectiveRate = totalNet > 0 ? (totalVAT / totalNet) * 100 : 0;

      setResults({
        netAmount: totalNet,
        vatAmount: totalVAT,
        grossAmount: totalGross,
        effectiveVATRate: effectiveRate,
        items: itemResults
      });
    }

    // Update URL with current inputs
    const params = new URLSearchParams();
    params.set('mode', calculationMode);
    params.set('country', country);
    params.set('amount', singleAmount);
    params.set('rate', singleVATRate);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleSaveAsImage = async () => {
    const element = document.getElementById('vat-results');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = 'vat-calculator-results.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving as image:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const applyPresetRate = (category: string) => {
    const rate = vatRatesByCountry[country]?.categories[category];
    if (rate !== undefined) {
      setSingleVATRate(rate.toString());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Globe className="h-5 w-5 text-blue-600" />
                VAT Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="calculationMode" className="text-sm font-medium">
                  Calculation Mode <span className="text-red-500">*</span>
                </Label>
                <select
                  id="calculationMode"
                  value={calculationMode}
                  onChange={(e) => setCalculationMode(e.target.value as 'add' | 'remove')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="add">Add VAT (Net → Gross)</option>
                  <option value="remove">Remove VAT (Gross → Net)</option>
                </select>
                <p className="text-xs text-gray-500">
                  {calculationMode === 'add' 
                    ? 'Calculate gross price from net (excluding VAT)' 
                    : 'Calculate net price from gross (including VAT)'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium">
                  Country/Region <span className="text-red-500">*</span>
                </Label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    const standardRate = vatRatesByCountry[e.target.value]?.standard || 20;
                    setSingleVATRate(standardRate.toString());
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {countries.map(c => (
                    <option key={c.code} value={c.code}>
                      {c.name} ({vatRatesByCountry[c.code]?.standard}% standard)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">VAT Rate Presets</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(vatRatesByCountry[country]?.categories || {}).map(([category, rate]) => (
                    <Button
                      key={category}
                      onClick={() => applyPresetRate(category)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {category} ({rate}%)
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <DollarSign className="h-5 w-5 text-green-600" />
                Quick Calculation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="singleAmount" className="text-sm font-medium">
                  {calculationMode === 'add' ? 'Net Amount (Excluding VAT)' : 'Gross Amount (Including VAT)'} <span className="text-red-500">*</span>
                </Label>
                <input
                  id="singleAmount"
                  type="number"
                  value={singleAmount}
                  onChange={(e) => setSingleAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1000"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="singleVATRate" className="text-sm font-medium">
                  VAT Rate (%) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="singleVATRate"
                  type="number"
                  value={singleVATRate}
                  onChange={(e) => setSingleVATRate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="20"
                  min="0"
                  max="100"
                  step="0.1"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Multiple Items</CardTitle>
                <Button onClick={addItem} size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="p-3 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Item {index + 1}</span>
                    {items.length > 1 && (
                      <Button 
                        onClick={() => removeItem(item.id)}
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
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Description"
                  />

                  <input
                    type="number"
                    value={item.amount || ''}
                    onChange={(e) => updateItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder={calculationMode === 'add' ? 'Net Amount' : 'Gross Amount'}
                    min="0"
                    step="0.01"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={item.vatCategory}
                      onChange={(e) => {
                        const category = e.target.value;
                        const rate = vatRatesByCountry[country]?.categories[category] || item.vatRate;
                        updateItem(item.id, 'vatCategory', category);
                        updateItem(item.id, 'vatRate', rate);
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.keys(vatRatesByCountry[country]?.categories || {}).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>

                    <input
                      type="number"
                      value={item.vatRate}
                      onChange={(e) => updateItem(item.id, 'vatRate', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="VAT %"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-500 mt-2">
                Add multiple items with different VAT rates for batch calculation
              </p>
            </CardContent>
          </Card>

          <Button 
            onClick={calculateVAT}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate VAT
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" id="vat-results">
          {results && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="shadow-lg border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Net Amount (Excl. VAT)</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {results.netAmount.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">VAT Amount</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {results.vatAmount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{results.effectiveVATRate.toFixed(2)}% effective rate</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">Gross Amount (Incl. VAT)</p>
                    <p className="text-2xl font-bold text-green-600">
                      {results.grossAmount.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Breakdown */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle>Calculation Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3">
                    {results.items.map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.description}</h4>
                            <p className="text-xs text-gray-600">{item.category} - {item.vatRate}% VAT</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                          <div>
                            <p className="text-gray-600">Net</p>
                            <p className="font-semibold text-gray-900">{item.netAmount.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">VAT</p>
                            <p className="font-semibold text-orange-600">+{item.vatAmount.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Gross</p>
                            <p className="font-semibold text-green-600">{item.grossAmount.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {results.items.length > 1 && (
                    <div className="mt-6 p-4 bg-blue-50 border-t-2 border-blue-500 rounded-lg">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Total Net</p>
                          <p className="text-xl font-bold text-blue-600">{results.netAmount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Total VAT</p>
                          <p className="text-xl font-bold text-orange-600">{results.vatAmount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Total Gross</p>
                          <p className="text-xl font-bold text-green-600">{results.grossAmount.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Formula Explanation */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle>Formula Used</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {calculationMode === 'add' ? (
                    <div className="space-y-2">
                      <div className="p-3 bg-white border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">VAT Amount =</p>
                        <p className="font-mono text-sm">Net Amount × (VAT Rate / 100)</p>
                        <p className="font-mono text-sm mt-2 text-orange-600">
                          = {results.netAmount.toFixed(2)} × ({results.effectiveVATRate.toFixed(2)} / 100) = {results.vatAmount.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-3 bg-white border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Gross Amount =</p>
                        <p className="font-mono text-sm">Net Amount + VAT Amount</p>
                        <p className="font-mono text-sm mt-2 text-green-600">
                          = {results.netAmount.toFixed(2)} + {results.vatAmount.toFixed(2)} = {results.grossAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="p-3 bg-white border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Net Amount =</p>
                        <p className="font-mono text-sm">Gross Amount / (1 + VAT Rate / 100)</p>
                        <p className="font-mono text-sm mt-2 text-blue-600">
                          = {results.grossAmount.toFixed(2)} / (1 + {results.effectiveVATRate.toFixed(2)} / 100) = {results.netAmount.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-3 bg-white border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">VAT Amount =</p>
                        <p className="font-mono text-sm">Gross Amount - Net Amount</p>
                        <p className="font-mono text-sm mt-2 text-orange-600">
                          = {results.grossAmount.toFixed(2)} - {results.netAmount.toFixed(2)} = {results.vatAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
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
                  Enter amount and VAT rate, then click "Calculate VAT" to see the breakdown.
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
        calculatorName="VAT Calculator"
      />
    </div>
  );
}

