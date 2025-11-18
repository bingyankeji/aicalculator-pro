'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useShare } from '@/hooks/useShare';
import { ShareModal } from '@/components/ShareModal';
import html2canvas from 'html2canvas';
import { Car, TrendingUp, Calculator, DollarSign } from 'lucide-react';

interface FuelInputs {
  distance: string;
  fuelEfficiency: string;
  fuelPrice: string;
  tripType: 'one-way' | 'round-trip' | 'daily-commute';
  workDaysPerWeek: string;
}

interface FuelResult {
  tripCost: number;
  fuelNeeded: number;
  dailyCost: number;
  weeklyCost: number;
  monthlyCost: number;
  yearlyCost: number;
  co2Emissions: number;
  efficiencyComparisons: EfficiencyComparison[];
}

interface EfficiencyComparison {
  efficiency: number;
  fuelNeeded: number;
  cost: number;
}

export default function FuelCostCalculator() {
  const [inputs, setInputs] = useState<FuelInputs>({
    distance: '30',
    fuelEfficiency: '25',
    fuelPrice: '3.50',
    tripType: 'round-trip',
    workDaysPerWeek: '5',
  });
  const [result, setResult] = useState<FuelResult | null>(null);
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const resultRef = useRef<HTMLDivElement>(null);
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/fuel-cost-calculator',
    getShareParams: () => ({
      d: inputs.distance,
      fe: inputs.fuelEfficiency,
      fp: inputs.fuelPrice,
      tt: inputs.tripType,
      u: unit,
    }),
    getShareText: () => result 
      ? `Calculate your fuel costs! Trip cost: $${result.tripCost.toFixed(2)} for ${inputs.distance} ${unit === 'imperial' ? 'miles' : 'km'}. Try our Fuel Cost Calculator!`
      : 'Calculate your fuel costs with our free Fuel Cost Calculator!',
  });

  const handleInputChange = (field: keyof FuelInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateFuelCost = () => {
    const distance = parseFloat(inputs.distance);
    const efficiency = parseFloat(inputs.fuelEfficiency);
    const price = parseFloat(inputs.fuelPrice);
    const workDays = parseFloat(inputs.workDaysPerWeek) || 5;

    if (isNaN(distance) || distance <= 0 || isNaN(efficiency) || efficiency <= 0 || isNaN(price) || price <= 0) {
      alert('Please enter valid positive numbers for all fields.');
      return;
    }

    // Calculate fuel needed and cost for the trip
    let tripDistance = distance;
    if (inputs.tripType === 'round-trip') {
      tripDistance = distance * 2;
    }

    // For imperial: MPG, for metric: L/100km
    let fuelNeeded: number;
    if (unit === 'imperial') {
      // MPG: miles per gallon
      fuelNeeded = tripDistance / efficiency;
    } else {
      // L/100km
      fuelNeeded = (tripDistance / 100) * efficiency;
    }

    const tripCost = fuelNeeded * price;

    // Calculate recurring costs
    let dailyCost = 0;
    let weeklyCost = 0;
    let monthlyCost = 0;
    let yearlyCost = 0;

    if (inputs.tripType === 'daily-commute') {
      dailyCost = tripCost;
      weeklyCost = dailyCost * workDays;
      monthlyCost = weeklyCost * 4.33; // Average weeks per month
      yearlyCost = weeklyCost * 52;
    } else {
      dailyCost = tripCost;
      weeklyCost = 0;
      monthlyCost = 0;
      yearlyCost = 0;
    }

    // Calculate CO2 emissions (approximate)
    // Average: 1 gallon of gas = 8.89 kg CO2
    // Average: 1 liter of gas = 2.31 kg CO2
    const co2PerUnit = unit === 'imperial' ? 8.89 : 2.31;
    const co2Emissions = fuelNeeded * co2PerUnit;

    // Generate efficiency comparisons
    const efficiencyComparisons: EfficiencyComparison[] = [];
    const comparisonValues = unit === 'imperial' 
      ? [50, 40, 35, 30, 25, 20, 15, 10] // MPG values
      : [3, 5, 7, 10, 15, 20, 30, 40]; // L/100km values
    
    comparisonValues.forEach(compEff => {
      let compFuelNeeded: number;
      if (unit === 'imperial') {
        compFuelNeeded = tripDistance / compEff;
      } else {
        compFuelNeeded = (tripDistance / 100) * compEff;
      }
      const compCost = compFuelNeeded * price;
      
      efficiencyComparisons.push({
        efficiency: compEff,
        fuelNeeded: compFuelNeeded,
        cost: compCost,
      });
    });

    setResult({
      tripCost,
      fuelNeeded,
      dailyCost,
      weeklyCost,
      monthlyCost,
      yearlyCost,
      co2Emissions,
      efficiencyComparisons,
    });
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `fuel-cost-result-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      });
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const distanceUnit = unit === 'imperial' ? 'miles' : 'km';
  const efficiencyUnit = unit === 'imperial' ? 'MPG' : 'L/100km';
  const fuelUnit = unit === 'imperial' ? 'gallons' : 'liters';
  const priceUnit = unit === 'imperial' ? 'gallon' : 'liter';

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl flex items-center gap-2">
                <Car className="h-5 w-5" />
                Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Unit Toggle */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Unit System</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => setUnit('imperial')}
                    className={`flex-1 ${unit === 'imperial' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Imperial (MPG)
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setUnit('metric')}
                    className={`flex-1 ${unit === 'metric' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Metric (L/100km)
                  </Button>
                </div>
              </div>

              {/* Trip Type */}
              <div className="space-y-2">
                <Label htmlFor="tripType" className="text-sm font-medium text-gray-700">
                  Trip Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="tripType"
                  value={inputs.tripType}
                  onChange={(e) => handleInputChange('tripType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="one-way">One-way Trip</option>
                  <option value="round-trip">Round Trip</option>
                  <option value="daily-commute">Daily Commute</option>
                </select>
              </div>

              {/* Distance */}
              <div className="space-y-2">
                <Label htmlFor="distance" className="text-sm font-medium text-gray-700">
                  Distance ({distanceUnit}) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="distance"
                  type="number"
                  value={inputs.distance}
                  onChange={(e) => handleInputChange('distance', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="30"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Fuel Efficiency */}
              <div className="space-y-2">
                <Label htmlFor="fuelEfficiency" className="text-sm font-medium text-gray-700">
                  Fuel Efficiency ({efficiencyUnit}) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="fuelEfficiency"
                  type="number"
                  value={inputs.fuelEfficiency}
                  onChange={(e) => handleInputChange('fuelEfficiency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={unit === 'imperial' ? '25' : '9.4'}
                  min="0"
                  step="0.1"
                />
                <p className="text-xs text-gray-500">
                  {unit === 'imperial' ? 'Higher is better' : 'Lower is better'}
                </p>
              </div>

              {/* Fuel Price */}
              <div className="space-y-2">
                <Label htmlFor="fuelPrice" className="text-sm font-medium text-gray-700">
                  Fuel Price (per {priceUnit}) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="fuelPrice"
                    type="number"
                    value={inputs.fuelPrice}
                    onChange={(e) => handleInputChange('fuelPrice', e.target.value)}
                    className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="3.50"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Work Days (only for daily commute) */}
              {inputs.tripType === 'daily-commute' && (
                <div className="space-y-2">
                  <Label htmlFor="workDays" className="text-sm font-medium text-gray-700">
                    Work Days per Week
                  </Label>
                  <input
                    id="workDays"
                    type="number"
                    value={inputs.workDaysPerWeek}
                    onChange={(e) => handleInputChange('workDaysPerWeek', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5"
                    min="1"
                    max="7"
                    step="1"
                  />
                </div>
              )}

              {/* Calculate Button */}
              <Button
                onClick={calculateFuelCost}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Fuel Cost
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={handleSaveAsImage}
              disabled={!result}
              className="flex-1 sm:flex-none"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Save as Image
            </Button>
            <Button
              variant="outline"
              onClick={handlePrint}
              disabled={!result}
              className="flex-1 sm:flex-none"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Result
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex-1 sm:flex-none"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Calculator
            </Button>
          </div>

          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Fuel Cost Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Trip Cost - Enhanced Display */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-8 text-center">
                      <p className="text-base text-gray-600 mb-2">
                        This trip will require <span className="font-bold text-green-700">{result.fuelNeeded.toFixed(1)} {fuelUnit}</span> of fuel
                      </p>
                      <p className="text-lg text-gray-700 mb-1">which amounts to a fuel cost of</p>
                      <p className="text-6xl font-bold text-green-700 my-4">
                        ${result.tripCost.toFixed(0)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {inputs.tripType === 'one-way' ? 'One-Way Trip' : inputs.tripType === 'round-trip' ? 'Round Trip' : 'Daily Commute'}
                      </p>
                    </div>

                    {/* Recurring Costs (only for daily commute) */}
                    {inputs.tripType === 'daily-commute' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Weekly Cost</p>
                          <p className="text-xl sm:text-2xl font-bold text-blue-700">
                            ${result.weeklyCost.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            ({inputs.workDaysPerWeek} days/week)
                          </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Monthly Cost</p>
                          <p className="text-xl sm:text-2xl font-bold text-blue-700">
                            ${result.monthlyCost.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            (~4.33 weeks/month)
                          </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:col-span-2">
                          <p className="text-xs text-gray-600 mb-1">Yearly Cost</p>
                          <p className="text-3xl font-bold text-orange-600">
                            ${result.yearlyCost.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            (52 weeks/year)
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Fuel Efficiency Comparison */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        Fuel Cost Comparison by Efficiency
                      </h3>
                      <div className="space-y-2">
                        {result.efficiencyComparisons.map((comp, index) => (
                          <div 
                            key={index}
                            className={`flex justify-between items-center p-3 rounded ${
                              Math.abs(comp.efficiency - parseFloat(inputs.fuelEfficiency)) < 0.1 
                                ? 'bg-green-100 border-2 border-green-400' 
                                : 'bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {Math.abs(comp.efficiency - parseFloat(inputs.fuelEfficiency)) < 0.1 && (
                                <span className="text-green-600 font-bold">→</span>
                              )}
                              <span className="text-sm text-gray-700">
                                If <span className="font-semibold">{comp.efficiency} {efficiencyUnit}</span>, it will use{' '}
                                <span className="font-semibold">{comp.fuelNeeded.toFixed(1)} {fuelUnit}</span> of fuel
                              </span>
                            </div>
                            <span className="text-base font-bold text-gray-900">
                              ${comp.cost.toFixed(0)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-4">
                        💡 Better fuel efficiency means lower costs. Compare different vehicles to see potential savings.
                      </p>
                    </div>

                    {/* Environmental Impact & Tips - Compact View */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-xs text-amber-700 mb-1 font-semibold">🌍 Environmental Impact</p>
                        <p className="text-xs text-amber-800">
                          CO₂: <span className="font-bold">{result.co2Emissions.toFixed(1)} kg</span>
                          {inputs.tripType === 'daily-commute' && (
                            <span className="block">
                              Yearly: <span className="font-bold">{(result.co2Emissions * parseFloat(inputs.workDaysPerWeek) * 52).toFixed(0)} kg</span>
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs text-blue-700 mb-1 font-semibold">💡 Fuel-Saving Tips</p>
                        <ul className="text-xs text-blue-800 space-y-0.5">
                          <li>• Steady speeds & proper tire pressure</li>
                          <li>• Remove weight & use cruise control</li>
                          <li>• Avoid traffic & consider carpooling</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Car className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg">Enter trip details to calculate fuel costs</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Fuel Cost Calculator"
      />
    </div>
  );
}

