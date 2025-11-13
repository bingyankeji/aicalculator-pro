'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Share2, Printer, Download } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

type ConversionCategory = 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed';

interface Unit {
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

const conversionData: Record<ConversionCategory, { units: Record<string, Unit>; baseUnit: string }> = {
  length: {
    baseUnit: 'meter',
    units: {
      millimeter: { name: 'Millimeter', symbol: 'mm', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      centimeter: { name: 'Centimeter', symbol: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      meter: { name: 'Meter', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
      kilometer: { name: 'Kilometer', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      inch: { name: 'Inch', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      foot: { name: 'Foot', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      yard: { name: 'Yard', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      mile: { name: 'Mile', symbol: 'mi', toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
    },
  },
  weight: {
    baseUnit: 'kilogram',
    units: {
      milligram: { name: 'Milligram', symbol: 'mg', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      gram: { name: 'Gram', symbol: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      kilogram: { name: 'Kilogram', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
      ton: { name: 'Metric Ton', symbol: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      ounce: { name: 'Ounce', symbol: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
      pound: { name: 'Pound', symbol: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      stone: { name: 'Stone', symbol: 'st', toBase: (v) => v * 6.35029, fromBase: (v) => v / 6.35029 },
    },
  },
  temperature: {
    baseUnit: 'celsius',
    units: {
      celsius: { 
        name: 'Celsius', 
        symbol: '°C', 
        toBase: (v) => v, 
        fromBase: (v) => v 
      },
      fahrenheit: { 
        name: 'Fahrenheit', 
        symbol: '°F', 
        toBase: (v) => (v - 32) * 5/9, 
        fromBase: (v) => (v * 9/5) + 32 
      },
      kelvin: { 
        name: 'Kelvin', 
        symbol: 'K', 
        toBase: (v) => v - 273.15, 
        fromBase: (v) => v + 273.15 
      },
    },
  },
  area: {
    baseUnit: 'squareMeter',
    units: {
      squareMillimeter: { name: 'Square Millimeter', symbol: 'mm²', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      squareCentimeter: { name: 'Square Centimeter', symbol: 'cm²', toBase: (v) => v / 10000, fromBase: (v) => v * 10000 },
      squareMeter: { name: 'Square Meter', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
      squareKilometer: { name: 'Square Kilometer', symbol: 'km²', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      squareInch: { name: 'Square Inch', symbol: 'in²', toBase: (v) => v * 0.00064516, fromBase: (v) => v / 0.00064516 },
      squareFoot: { name: 'Square Foot', symbol: 'ft²', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      squareYard: { name: 'Square Yard', symbol: 'yd²', toBase: (v) => v * 0.836127, fromBase: (v) => v / 0.836127 },
      acre: { name: 'Acre', symbol: 'ac', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
      hectare: { name: 'Hectare', symbol: 'ha', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
    },
  },
  volume: {
    baseUnit: 'liter',
    units: {
      milliliter: { name: 'Milliliter', symbol: 'mL', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      liter: { name: 'Liter', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
      cubicMeter: { name: 'Cubic Meter', symbol: 'm³', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      teaspoon: { name: 'Teaspoon (US)', symbol: 'tsp', toBase: (v) => v * 0.00492892, fromBase: (v) => v / 0.00492892 },
      tablespoon: { name: 'Tablespoon (US)', symbol: 'tbsp', toBase: (v) => v * 0.0147868, fromBase: (v) => v / 0.0147868 },
      fluidOunce: { name: 'Fluid Ounce (US)', symbol: 'fl oz', toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
      cup: { name: 'Cup (US)', symbol: 'cup', toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
      pint: { name: 'Pint (US)', symbol: 'pt', toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
      quart: { name: 'Quart (US)', symbol: 'qt', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
      gallon: { name: 'Gallon (US)', symbol: 'gal', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
    },
  },
  speed: {
    baseUnit: 'metersPerSecond',
    units: {
      metersPerSecond: { name: 'Meters per Second', symbol: 'm/s', toBase: (v) => v, fromBase: (v) => v },
      kilometersPerHour: { name: 'Kilometers per Hour', symbol: 'km/h', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      milesPerHour: { name: 'Miles per Hour', symbol: 'mph', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      feetPerSecond: { name: 'Feet per Second', symbol: 'ft/s', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      knot: { name: 'Knot', symbol: 'kn', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    },
  },
};

export function UnitConverter() {
  const [category, setCategory] = useState<ConversionCategory>('length');
  const [fromUnit, setFromUnit] = useState<string>('meter');
  const [toUnit, setToUnit] = useState<string>('foot');
  const [fromValue, setFromValue] = useState<string>('1');
  const [toValue, setToValue] = useState<string>('');

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/unit-converter',
    getShareParams: () => ({
      c: category,
      f: fromUnit,
      t: toUnit,
      v: fromValue,
    }),
    getShareText: () => 
      toValue 
        ? `${fromValue} ${conversionData[category].units[fromUnit].symbol} = ${toValue} ${conversionData[category].units[toUnit].symbol}`
        : 'Check out this Unit Converter!',
  });

  // Update units when category changes (MUST BE FIRST)
  useEffect(() => {
    const units = Object.keys(conversionData[category].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setFromValue('1'); // Reset value
  }, [category]);

  // Convert units
  useEffect(() => {
    if (!fromValue || isNaN(parseFloat(fromValue))) {
      setToValue('');
      return;
    }

    const value = parseFloat(fromValue);
    const categoryData = conversionData[category];
    const fromUnitData = categoryData.units[fromUnit];
    const toUnitData = categoryData.units[toUnit];

    // Safety check
    if (!fromUnitData || !toUnitData) {
      setToValue('');
      return;
    }

    // Convert to base unit, then to target unit
    const baseValue = fromUnitData.toBase(value);
    const result = toUnitData.fromBase(baseValue);

    setToValue(result.toFixed(8).replace(/\.?0+$/, ''));
  }, [fromValue, fromUnit, toUnit, category]);

  // Load from URL params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const c = params.get('c') as ConversionCategory;
      const f = params.get('f');
      const t = params.get('t');
      const v = params.get('v');

      if (c && conversionData[c]) setCategory(c);
      if (f && conversionData[c || category].units[f]) setFromUnit(f);
      if (t && conversionData[c || category].units[t]) setToUnit(t);
      if (v) setFromValue(v);
    }
  }, []);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveImage = async () => {
    const element = document.getElementById('unit-converter-result');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const link = document.createElement('a');
      link.download = `unit-conversion-${category}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
    }
  };

  const currentCategoryData = conversionData[category];
  const units = Object.entries(currentCategoryData.units);
  
  // Safety check: ensure current units exist in current category
  const fromUnitData = currentCategoryData.units[fromUnit];
  const toUnitData = currentCategoryData.units[toUnit];
  
  if (!fromUnitData || !toUnitData) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Category Selection */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Select Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {(Object.keys(conversionData) as ConversionCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                category === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Converter */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Input */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">From</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {units.map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Value
              </label>
              <input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder="Enter value"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-4">
            <button
              onClick={swapUnits}
              className="p-3 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
              title="Swap units"
            >
              <ArrowLeftRight className="w-6 h-6 text-blue-600" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Convert To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {units.map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right: Result */}
        <div>
          <div id="unit-converter-result" className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Result</h3>
            
            {toValue ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 border-2 border-blue-300">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">From</div>
                    <div className="text-2xl font-bold text-gray-900 mb-4">
                      {fromValue} {fromUnitData.symbol}
                    </div>
                    
                    <div className="text-3xl text-blue-600 mb-4">=</div>
                    
                    <div className="text-sm text-gray-600 mb-2">To</div>
                    <div className="text-3xl font-bold text-blue-600">
                      {toValue} {toUnitData.symbol}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">Conversion Formula</div>
                  <div className="text-xs text-gray-500 font-mono">
                    1 {fromUnitData.symbol} = {
                      toUnitData.fromBase(
                        fromUnitData.toBase(1)
                      ).toFixed(8).replace(/\.?0+$/, '')
                    } {toUnitData.symbol}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Enter a value to see the conversion</p>
              </div>
            )}
          </div>

          {/* Actions */}
          {toValue && (
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">Share</span>
              </button>
              <button
                onClick={handleSaveImage}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Save</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span className="text-sm font-medium">Print</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Reference Table */}
      {toValue && (
        <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Quick Reference: {fromValue} {fromUnitData.symbol} in Other Units
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {units.map(([key, unit]) => {
              const baseValue = fromUnitData.toBase(parseFloat(fromValue));
              const convertedValue = unit.fromBase(baseValue);
              
              return (
                <div
                  key={key}
                  className={`p-3 rounded-lg border ${
                    key === toUnit ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="text-sm text-gray-600">{unit.name}</div>
                  <div className="text-lg font-bold text-gray-900">
                    {convertedValue.toFixed(6).replace(/\.?0+$/, '')} {unit.symbol}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Unit Converter"
      />
    </div>
  );
}
