'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Download, DollarSign, Percent, MapPin, Calculator } from 'lucide-react';
import html2canvas from 'html2canvas';

interface SalesTaxInputs {
  price: number;
  state: string;
  city: string;
  calculationType: 'add-tax' | 'remove-tax' | 'tax-only';
}

interface SalesTaxResult {
  originalPrice: number;
  stateTaxRate: number;
  localTaxRate: number;
  totalTaxRate: number;
  stateTaxAmount: number;
  localTaxAmount: number;
  totalTaxAmount: number;
  finalPrice: number;
  priceBeforeTax: number;
}

// US State sales tax rates (2024)
const stateSalesTaxRates: { [key: string]: { rate: number; name: string } } = {
  'AL': { rate: 0.04, name: 'Alabama' },
  'AK': { rate: 0.00, name: 'Alaska' },
  'AZ': { rate: 0.056, name: 'Arizona' },
  'AR': { rate: 0.065, name: 'Arkansas' },
  'CA': { rate: 0.075, name: 'California' },
  'CO': { rate: 0.029, name: 'Colorado' },
  'CT': { rate: 0.0635, name: 'Connecticut' },
  'DE': { rate: 0.00, name: 'Delaware' },
  'FL': { rate: 0.06, name: 'Florida' },
  'GA': { rate: 0.04, name: 'Georgia' },
  'HI': { rate: 0.04, name: 'Hawaii' },
  'ID': { rate: 0.06, name: 'Idaho' },
  'IL': { rate: 0.0625, name: 'Illinois' },
  'IN': { rate: 0.07, name: 'Indiana' },
  'IA': { rate: 0.06, name: 'Iowa' },
  'KS': { rate: 0.065, name: 'Kansas' },
  'KY': { rate: 0.06, name: 'Kentucky' },
  'LA': { rate: 0.0445, name: 'Louisiana' },
  'ME': { rate: 0.055, name: 'Maine' },
  'MD': { rate: 0.06, name: 'Maryland' },
  'MA': { rate: 0.0625, name: 'Massachusetts' },
  'MI': { rate: 0.06, name: 'Michigan' },
  'MN': { rate: 0.06875, name: 'Minnesota' },
  'MS': { rate: 0.07, name: 'Mississippi' },
  'MO': { rate: 0.04225, name: 'Missouri' },
  'MT': { rate: 0.00, name: 'Montana' },
  'NE': { rate: 0.055, name: 'Nebraska' },
  'NV': { rate: 0.0685, name: 'Nevada' },
  'NH': { rate: 0.00, name: 'New Hampshire' },
  'NJ': { rate: 0.06625, name: 'New Jersey' },
  'NM': { rate: 0.05125, name: 'New Mexico' },
  'NY': { rate: 0.04, name: 'New York' },
  'NC': { rate: 0.0475, name: 'North Carolina' },
  'ND': { rate: 0.05, name: 'North Dakota' },
  'OH': { rate: 0.0575, name: 'Ohio' },
  'OK': { rate: 0.045, name: 'Oklahoma' },
  'OR': { rate: 0.00, name: 'Oregon' },
  'PA': { rate: 0.06, name: 'Pennsylvania' },
  'RI': { rate: 0.07, name: 'Rhode Island' },
  'SC': { rate: 0.06, name: 'South Carolina' },
  'SD': { rate: 0.045, name: 'South Dakota' },
  'TN': { rate: 0.07, name: 'Tennessee' },
  'TX': { rate: 0.0625, name: 'Texas' },
  'UT': { rate: 0.0485, name: 'Utah' },
  'VT': { rate: 0.06, name: 'Vermont' },
  'VA': { rate: 0.053, name: 'Virginia' },
  'WA': { rate: 0.065, name: 'Washington' },
  'WV': { rate: 0.06, name: 'West Virginia' },
  'WI': { rate: 0.05, name: 'Wisconsin' },
  'WY': { rate: 0.04, name: 'Wyoming' }
};

// Major cities local tax rates (simplified - in reality this varies greatly)
const cityTaxRates: { [key: string]: { [city: string]: number } } = {
  'CA': {
    'Los Angeles': 0.025,
    'San Francisco': 0.0125,
    'San Diego': 0.0075,
    'Sacramento': 0.0075,
    'Oakland': 0.0125
  },
  'NY': {
    'New York City': 0.045,
    'Buffalo': 0.03,
    'Rochester': 0.03,
    'Syracuse': 0.03,
    'Albany': 0.03
  },
  'TX': {
    'Houston': 0.0125,
    'Dallas': 0.0125,
    'Austin': 0.0125,
    'San Antonio': 0.0125,
    'Fort Worth': 0.0125
  },
  'FL': {
    'Miami': 0.01,
    'Orlando': 0.0065,
    'Tampa': 0.0075,
    'Jacksonville': 0.0075,
    'Fort Lauderdale': 0.01
  },
  'IL': {
    'Chicago': 0.0325,
    'Rockford': 0.01,
    'Peoria': 0.01,
    'Springfield': 0.01,
    'Elgin': 0.01
  }
};

const calculateSalesTax = (inputs: SalesTaxInputs): SalesTaxResult | null => {
  if (inputs.price <= 0) return null;

  const stateData = stateSalesTaxRates[inputs.state];
  if (!stateData) return null;

  const stateTaxRate = stateData.rate;
  const localTaxRate = cityTaxRates[inputs.state]?.[inputs.city] || 0;
  const totalTaxRate = stateTaxRate + localTaxRate;

  let originalPrice = inputs.price;
  let stateTaxAmount = 0;
  let localTaxAmount = 0;
  let totalTaxAmount = 0;
  let finalPrice = 0;
  let priceBeforeTax = 0;

  switch (inputs.calculationType) {
    case 'add-tax':
      // Add tax to the price
      priceBeforeTax = inputs.price;
      stateTaxAmount = inputs.price * stateTaxRate;
      localTaxAmount = inputs.price * localTaxRate;
      totalTaxAmount = stateTaxAmount + localTaxAmount;
      finalPrice = inputs.price + totalTaxAmount;
      break;

    case 'remove-tax':
      // Remove tax from the price (price includes tax)
      priceBeforeTax = inputs.price / (1 + totalTaxRate);
      totalTaxAmount = inputs.price - priceBeforeTax;
      stateTaxAmount = priceBeforeTax * stateTaxRate;
      localTaxAmount = priceBeforeTax * localTaxRate;
      finalPrice = inputs.price;
      originalPrice = priceBeforeTax;
      break;

    case 'tax-only':
      // Calculate only the tax amount
      priceBeforeTax = inputs.price;
      stateTaxAmount = inputs.price * stateTaxRate;
      localTaxAmount = inputs.price * localTaxRate;
      totalTaxAmount = stateTaxAmount + localTaxAmount;
      finalPrice = inputs.price + totalTaxAmount;
      break;

    default:
      return null;
  }

  return {
    originalPrice,
    stateTaxRate,
    localTaxRate,
    totalTaxRate,
    stateTaxAmount,
    localTaxAmount,
    totalTaxAmount,
    finalPrice,
    priceBeforeTax
  };
};

export default function SalesTaxCalculator() {
  const [inputs, setInputs] = useState<SalesTaxInputs>({
    price: 100,
    state: 'CA',
    city: 'Los Angeles',
    calculationType: 'add-tax'
  });

  const result = useMemo(() => calculateSalesTax(inputs), [inputs]);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSaveAsImage = async () => {
    if (!resultRef.current || !result) return;
    
    try {
      const canvas = await html2canvas(resultRef.current);
      
      const link = document.createElement('a');
      link.download = `sales-tax-calculation-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const getCalculationSummary = (): string => {
    if (!result) return '';
    
    const stateName = stateSalesTaxRates[inputs.state]?.name || inputs.state;
    const cityText = inputs.city ? ` in ${inputs.city}` : '';
    
    switch (inputs.calculationType) {
      case 'add-tax':
        return `Adding ${(result.totalTaxRate * 100).toFixed(2)}% sales tax to $${result.priceBeforeTax.toFixed(2)}${cityText}, ${stateName} results in a final price of $${result.finalPrice.toFixed(2)} (tax: $${result.totalTaxAmount.toFixed(2)}).`;
      case 'remove-tax':
        return `Removing ${(result.totalTaxRate * 100).toFixed(2)}% sales tax from $${result.finalPrice.toFixed(2)}${cityText}, ${stateName} shows the pre-tax price was $${result.priceBeforeTax.toFixed(2)} (tax: $${result.totalTaxAmount.toFixed(2)}).`;
      case 'tax-only':
        return `The sales tax on $${result.priceBeforeTax.toFixed(2)}${cityText}, ${stateName} is $${result.totalTaxAmount.toFixed(2)} at a rate of ${(result.totalTaxRate * 100).toFixed(2)}%.`;
      default:
        return '';
    }
  };

  const handleInputChange = (field: keyof SalesTaxInputs, value: number | string) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Number(value)
    }));
  };

  const availableCities = cityTaxRates[inputs.state] ? Object.keys(cityTaxRates[inputs.state]) : [];
  const noSalesTaxStates = ['AK', 'DE', 'MT', 'NH', 'OR'];

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
                  { value: 'add-tax', label: 'Add sales tax to price' },
                  { value: 'remove-tax', label: 'Remove sales tax from total' },
                  { value: 'tax-only', label: 'Calculate tax amount only' }
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
                  {inputs.calculationType === 'remove-tax' ? 'Total Price (with tax)' : 'Price'} ($)
                </label>
                <input
                  type="number"
                  value={inputs.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter price amount"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select
                  value={inputs.state}
                  onChange={(e) => {
                    handleInputChange('state', e.target.value);
                    // Reset city when state changes
                    setInputs(prev => ({ ...prev, state: e.target.value, city: '' }));
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.entries(stateSalesTaxRates).map(([code, data]) => (
                    <option key={code} value={code}>
                      {data.name} ({code}) - {(data.rate * 100).toFixed(2)}%
                    </option>
                  ))}
                </select>
              </div>

              {availableCities.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City (Optional)
                  </label>
                  <select
                    value={inputs.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a city</option>
                    {availableCities.map(city => (
                      <option key={city} value={city}>
                        {city} (+{(cityTaxRates[inputs.state][city] * 100).toFixed(2)}%)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {noSalesTaxStates.includes(inputs.state) && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800 text-sm">
                    <strong>{stateSalesTaxRates[inputs.state].name}</strong> has no state sales tax!
                    {inputs.city && cityTaxRates[inputs.state]?.[inputs.city] && 
                      ` However, ${inputs.city} may have local taxes.`
                    }
                  </p>
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

                {/* Key Results */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        {inputs.calculationType === 'remove-tax' ? 'Price Before Tax' : 'Original Price'}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      ${result.priceBeforeTax.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Total Tax</span>
                    </div>
                    <div className="text-2xl font-bold text-red-900">
                      ${result.totalTaxAmount.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Tax Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">
                      {(result.totalTaxRate * 100).toFixed(2)}%
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

                {/* Tax Breakdown */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Tax Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        {stateSalesTaxRates[inputs.state].name} State Tax ({(result.stateTaxRate * 100).toFixed(2)}%):
                      </span>
                      <span className="font-semibold text-gray-900">${result.stateTaxAmount.toFixed(2)}</span>
                    </div>
                    {result.localTaxAmount > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          {inputs.city} Local Tax ({(result.localTaxRate * 100).toFixed(2)}%):
                        </span>
                        <span className="font-semibold text-gray-900">${result.localTaxAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-300 pt-2 mt-2">
                      <div className="flex justify-between items-center font-semibold">
                        <span className="text-gray-900">Total Tax:</span>
                        <span className="text-gray-900">${result.totalTaxAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Info */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Location Information</h4>
                  <p className="text-yellow-800 text-sm">
                    <strong>State:</strong> {stateSalesTaxRates[inputs.state].name} ({(result.stateTaxRate * 100).toFixed(2)}% state tax)
                    {inputs.city && result.localTaxAmount > 0 && (
                      <>
                        <br />
                        <strong>City:</strong> {inputs.city} (+{(result.localTaxRate * 100).toFixed(2)}% local tax)
                      </>
                    )}
                    <br />
                    <strong>Combined Rate:</strong> {(result.totalTaxRate * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">🧾</div>
                <p className="text-gray-500">Enter price and location to calculate sales tax</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
