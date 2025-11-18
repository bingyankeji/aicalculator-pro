'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Plus, Trash2, Download, Share2, Printer, TrendingUp, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FuelRecord {
  id: string;
  date: string;
  miles: number;
  gallons: number;
  mpg: number;
  cost?: number;
}

interface CalculationResult {
  mpg: number;
  lPer100km: number;
  kmPerL: number;
  averageMpg: number;
  totalMiles: number;
  totalGallons: number;
  totalCost: number;
  costPerMile: number;
  efficiency: string;
  rating: number;
  tips: string[];
}

export default function GasMileageCalculator() {
  const [inputs, setInputs] = useState({
    currentOdometer: '',
    previousOdometer: '',
    gallons: '',
    fuelCost: '',
  });
  
  const [fuelRecords, setFuelRecords] = useState<FuelRecord[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [unit, setUnit] = useState<'mpg' | 'l100km' | 'kmpl'>('mpg');
  const [inputUnit, setInputUnit] = useState<'us' | 'metric' | 'other'>('us'); // 输入单位系统
  const resultRef = useRef<HTMLDivElement>(null);

  // Load saved records from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gasMileageRecords');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFuelRecords(parsed);
      } catch (e) {
        console.error('Error loading saved records:', e);
      }
    }
  }, []);

  // Save records to localStorage
  useEffect(() => {
    if (fuelRecords.length > 0) {
      localStorage.setItem('gasMileageRecords', JSON.stringify(fuelRecords));
    }
  }, [fuelRecords]);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/gas-mileage-calculator',
    getShareParams: () => ({
      co: inputs.currentOdometer || '',
      po: inputs.previousOdometer || '',
      g: inputs.gallons || '',
      c: inputs.fuelCost || '',
    }),
    getShareText: () => {
      return result
        ? `My vehicle fuel efficiency: ${result.mpg.toFixed(1)} MPG (${result.lPer100km.toFixed(1)} L/100km)`
        : 'Calculate your vehicle fuel efficiency with this Gas Mileage Calculator!';
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const getEfficiencyRating = (mpg: number): { rating: number; efficiency: string } => {
    if (mpg >= 40) return { rating: 5, efficiency: 'Excellent' };
    if (mpg >= 30) return { rating: 4, efficiency: 'Good' };
    if (mpg >= 25) return { rating: 3, efficiency: 'Average' };
    if (mpg >= 20) return { rating: 2, efficiency: 'Below Average' };
    return { rating: 1, efficiency: 'Poor' };
  };

  const getTips = (mpg: number): string[] => {
    const tips: string[] = [];
    if (mpg < 30) {
      tips.push('Check tire pressure regularly - underinflated tires reduce fuel efficiency');
      tips.push('Remove excess weight from your vehicle');
      tips.push('Avoid aggressive acceleration and braking');
    }
    if (mpg < 25) {
      tips.push('Consider getting a tune-up - dirty air filters and spark plugs reduce efficiency');
      tips.push('Reduce highway speed - fuel economy drops significantly above 50 mph');
    }
    if (mpg < 20) {
      tips.push('Check for mechanical issues - low MPG may indicate engine problems');
      tips.push('Consider carpooling or using public transit for short trips');
    }
    tips.push('Use cruise control on highways to maintain consistent speed');
    tips.push('Plan routes to avoid traffic congestion');
    return tips;
  };

  const calculate = () => {
    const currentOdometer = parseFloat(inputs.currentOdometer);
    const previousOdometer = parseFloat(inputs.previousOdometer);
    const fuelAmount = parseFloat(inputs.gallons);
    const fuelCost = inputs.fuelCost ? parseFloat(inputs.fuelCost) : 0;

    if (isNaN(currentOdometer) || isNaN(previousOdometer) || isNaN(fuelAmount)) {
      alert('Please enter valid numbers.');
      return;
    }

    if (currentOdometer <= previousOdometer) {
      alert('Current odometer reading must be greater than previous reading.');
      return;
    }

    if (fuelAmount <= 0) {
      alert('Fuel amount must be greater than 0.');
      return;
    }

    let distance = currentOdometer - previousOdometer;
    let gallons = fuelAmount;

    // Convert to US units (miles and gallons) for calculation
    if (inputUnit === 'metric') {
      // Convert km to miles and liters to gallons
      distance = distance * 0.621371; // km to miles
      gallons = fuelAmount * 0.264172; // liters to gallons
    } else if (inputUnit === 'other') {
      // Convert km to miles (assuming km for other units)
      distance = distance * 0.621371; // km to miles
      gallons = fuelAmount * 0.264172; // liters to gallons
    }

    const miles = distance;

    // Calculate MPG
    const mpg = miles / gallons;
    
    // Convert to other units
    const lPer100km = 235.214 / mpg; // 1 MPG = 235.214 L/100km
    const kmPerL = 0.425144 * mpg; // 1 MPG = 0.425144 km/L

    // Calculate totals including this record
    const totalMiles = fuelRecords.reduce((sum, r) => sum + r.miles, 0) + miles;
    const totalGallons = fuelRecords.reduce((sum, r) => sum + r.gallons, 0) + gallons;
    const averageMpg = totalMiles / totalGallons;

    // Calculate costs
    const totalCost = fuelRecords.reduce((sum, r) => sum + (r.cost || 0), 0) + (fuelCost > 0 ? gallons * fuelCost : 0);
    const costPerMile = totalCost > 0 ? totalCost / totalMiles : 0;

    const { rating, efficiency } = getEfficiencyRating(mpg);
    const tips = getTips(mpg);

    const newResult: CalculationResult = {
      mpg,
      lPer100km,
      kmPerL,
      averageMpg,
      totalMiles,
      totalGallons,
      totalCost,
      costPerMile,
      efficiency,
      rating,
      tips,
    };

    setResult(newResult);
  };

  const addRecord = () => {
    const currentOdometer = parseFloat(inputs.currentOdometer);
    const previousOdometer = parseFloat(inputs.previousOdometer);
    const fuelAmount = parseFloat(inputs.gallons);
    const fuelCost = inputs.fuelCost ? parseFloat(inputs.fuelCost) : 0;

    if (isNaN(currentOdometer) || isNaN(previousOdometer) || isNaN(fuelAmount)) {
      alert('Please enter valid numbers.');
      return;
    }

    if (currentOdometer <= previousOdometer) {
      alert('Current odometer reading must be greater than previous reading.');
      return;
    }

    if (fuelAmount <= 0) {
      alert('Fuel amount must be greater than 0.');
      return;
    }

    let distance = currentOdometer - previousOdometer;
    let gallons = fuelAmount;

    // Convert to US units for calculation
    if (inputUnit === 'metric') {
      distance = distance * 0.621371;
      gallons = fuelAmount * 0.264172;
    } else if (inputUnit === 'other') {
      distance = distance * 0.621371;
      gallons = fuelAmount * 0.264172;
    }

    const miles = distance;
    const mpg = miles / gallons;
    const cost = fuelCost > 0 ? fuelAmount * fuelCost : 0;

    const newRecord: FuelRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      miles,
      gallons: fuelAmount, // Store original fuel amount
      mpg,
      cost: cost > 0 ? cost : undefined,
    };

    setFuelRecords(prev => [...prev, newRecord]);
    // Update previous odometer to current for next entry
    setInputs({ 
      currentOdometer: '', 
      previousOdometer: inputs.currentOdometer, 
      gallons: '', 
      fuelCost: inputs.fuelCost 
    });
    calculate();
  };

  const deleteRecord = (id: string) => {
    if (confirm('Delete this fuel record?')) {
      setFuelRecords(prev => prev.filter(r => r.id !== id));
      // Recalculate after deletion
      if (inputs.miles && inputs.gallons) {
        calculate();
      }
    }
  };

  const exportToCSV = () => {
    if (fuelRecords.length === 0) {
      alert('No records to export.');
      return;
    }

    const headers = ['Date', 'Miles', 'Gallons', 'MPG', 'Cost'];
    const rows = fuelRecords.map(r => [
      r.date,
      r.miles.toFixed(1),
      r.gallons.toFixed(2),
      r.mpg.toFixed(1),
      r.cost ? `$${r.cost.toFixed(2)}` : 'N/A',
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fuel-records-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
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

      const link = document.createElement('a');
      link.download = `gas-mileage-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Gas Mileage Results</title>
              <style>
                body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print {
                  body { padding: 0; }
                  img { max-width: 100%; page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" onload="window.print();"/>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
      alert('Failed to print. Please try again.');
    }
  };

  const convertValue = (mpg: number) => {
    switch (unit) {
      case 'l100km':
        return (235.214 / mpg).toFixed(1);
      case 'kmpl':
        return (0.425144 * mpg).toFixed(1);
      default:
        return mpg.toFixed(1);
    }
  };

  const getUnitLabel = () => {
    switch (unit) {
      case 'l100km':
        return 'L/100km';
      case 'kmpl':
        return 'km/L';
      default:
        return 'MPG';
    }
  };

  const getDistanceUnit = () => {
    switch (inputUnit) {
      case 'metric':
      case 'other':
        return 'kilometer';
      default:
        return 'miles';
    }
  };

  const getFuelUnit = () => {
    switch (inputUnit) {
      case 'metric':
      case 'other':
        return 'liter';
      default:
        return 'gallons';
    }
  };

  const getPriceUnit = () => {
    switch (inputUnit) {
      case 'metric':
      case 'other':
        return 'per liter';
      default:
        return 'per gallon';
    }
  };

  // Chart data
  const trendData = fuelRecords.slice(-10).map((r, idx) => ({
    record: `#${fuelRecords.length - 10 + idx + 1}`,
    mpg: r.mpg,
    date: r.date,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Trip Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Unit System Selector */}
              <div className="flex gap-2 mb-4">
                <Button
                  onClick={() => {
                    setInputUnit('us');
                    setUnit('mpg');
                  }}
                  variant={inputUnit === 'us' ? 'default' : 'outline'}
                  className="flex-1 text-xs sm:text-sm"
                >
                  US Units
                </Button>
                <Button
                  onClick={() => {
                    setInputUnit('metric');
                    setUnit('l100km');
                  }}
                  variant={inputUnit === 'metric' ? 'default' : 'outline'}
                  className="flex-1 text-xs sm:text-sm"
                >
                  Metric Units
                </Button>
                <Button
                  onClick={() => {
                    setInputUnit('other');
                    setUnit('l100km');
                  }}
                  variant={inputUnit === 'other' ? 'default' : 'outline'}
                  className="flex-1 text-xs sm:text-sm"
                >
                  Other Units
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentOdometer" className="text-sm font-medium">
                  Current Odometer Reading <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <input
                    id="currentOdometer"
                    type="number"
                    value={inputs.currentOdometer}
                    onChange={(e) => handleInputChange('currentOdometer', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-16"
                    placeholder={inputUnit === 'us' ? '12360' : '18900'}
                    step="0.1"
                    min="0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    {getDistanceUnit()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousOdometer" className="text-sm font-medium">
                  Previous Odometer Reading <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <input
                    id="previousOdometer"
                    type="number"
                    value={inputs.previousOdometer}
                    onChange={(e) => handleInputChange('previousOdometer', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-16"
                    placeholder={inputUnit === 'us' ? '12000' : '18300'}
                    step="0.1"
                    min="0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    {getDistanceUnit()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gallons" className="text-sm font-medium">
                  Gas Added to the Tank <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <input
                    id="gallons"
                    type="number"
                    value={inputs.gallons}
                    onChange={(e) => handleInputChange('gallons', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-20"
                    placeholder={inputUnit === 'us' ? '12.5' : '50'}
                    step="0.01"
                    min="0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    {getFuelUnit()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelCost" className="text-sm font-medium">
                  Gas Price <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    $
                  </span>
                  <input
                    id="fuelCost"
                    type="number"
                    value={inputs.fuelCost}
                    onChange={(e) => handleInputChange('fuelCost', e.target.value)}
                    className="w-full px-4 py-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-24"
                    placeholder={inputUnit === 'us' ? '3.50' : '1.00'}
                    step="0.01"
                    min="0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    {getPriceUnit()}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Enter to track fuel costs</p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={calculate}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate
                </Button>
                <Button
                  onClick={addRecord}
                  variant="outline"
                  className="flex-1 font-medium py-3 min-h-[44px]"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Record
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* Unit Selector */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-lg text-gray-900">Display Unit</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => setUnit('mpg')}
                  variant={unit === 'mpg' ? 'default' : 'outline'}
                  className="text-xs sm:text-sm"
                >
                  MPG
                </Button>
                <Button
                  onClick={() => setUnit('l100km')}
                  variant={unit === 'l100km' ? 'default' : 'outline'}
                  className="text-xs sm:text-sm"
                >
                  L/100km
                </Button>
                <Button
                  onClick={() => setUnit('kmpl')}
                  variant={unit === 'kmpl' ? 'default' : 'outline'}
                  className="text-xs sm:text-sm"
                >
                  km/L
                </Button>
              </div>
            </CardContent>
          </Card>

          <div ref={resultRef}>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Fuel Efficiency Results</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Current Efficiency */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 sm:p-6">
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">Current Trip Efficiency:</p>
                      <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 break-all">
                        {convertValue(result.mpg)} <span className="text-xl sm:text-2xl">{getUnitLabel()}</span>
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg sm:text-xl ${i < result.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className={`text-sm font-semibold ${
                          result.rating >= 4 ? 'text-green-600' :
                          result.rating >= 3 ? 'text-blue-600' :
                          'text-orange-600'
                        }`}>
                          {result.efficiency}
                        </span>
                      </div>
                    </div>

                    {/* Unit Conversions */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
                        <p className="text-xs text-gray-600 mb-1">MPG (US)</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{result.mpg.toFixed(1)}</p>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
                        <p className="text-xs text-gray-600 mb-1">L/100km</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{result.lPer100km.toFixed(1)}</p>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
                        <p className="text-xs text-gray-600 mb-1">km/L</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{result.kmPerL.toFixed(1)}</p>
                      </div>
                    </div>

                    {/* Statistics */}
                    {fuelRecords.length > 0 && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Overall Statistics</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-600">Average MPG:</p>
                            <p className="font-semibold text-gray-900">{result.averageMpg.toFixed(1)} MPG</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Miles:</p>
                            <p className="font-semibold text-gray-900">{result.totalMiles.toFixed(0)} mi</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Fuel:</p>
                            <p className="font-semibold text-gray-900">{result.totalGallons.toFixed(1)} gal</p>
                          </div>
                          {result.totalCost > 0 && (
                            <>
                              <div>
                                <p className="text-gray-600">Total Cost:</p>
                                <p className="font-semibold text-green-700">${result.totalCost.toFixed(2)}</p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-gray-600">Cost per Mile:</p>
                                <p className="font-semibold text-gray-900">${result.costPerMile.toFixed(3)}/mi</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Improvement Tips */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start gap-2 mb-3">
                        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <h3 className="font-semibold text-amber-900">Fuel Efficiency Tips</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-amber-900">
                        {result.tips.slice(0, 5).map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Trend Chart */}
                    {trendData.length >= 2 && (
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-4">Fuel Efficiency Trend</h3>
                        <ResponsiveContainer width="100%" height={200} minHeight={180}>
                          <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="record" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="mpg" stroke="#1e40af" strokeWidth={2} name="MPG" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Calculator className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>Enter miles and gallons to calculate fuel efficiency</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Fuel Records */}
          {fuelRecords.length > 0 && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-gray-900">
                    Fuel Records ({fuelRecords.length})
                  </CardTitle>
                  <Button onClick={exportToCSV} variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export CSV</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-2 px-2">Date</th>
                        <th className="text-right py-2 px-2">Miles</th>
                        <th className="text-right py-2 px-2">Gallons</th>
                        <th className="text-right py-2 px-2">MPG</th>
                        <th className="text-right py-2 px-2">Cost</th>
                        <th className="text-center py-2 px-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fuelRecords.slice().reverse().map((record) => (
                        <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-2 px-2">{record.date}</td>
                          <td className="text-right py-2 px-2">{record.miles.toFixed(1)}</td>
                          <td className="text-right py-2 px-2">{record.gallons.toFixed(2)}</td>
                          <td className="text-right py-2 px-2 font-semibold text-blue-700">
                            {record.mpg.toFixed(1)}
                          </td>
                          <td className="text-right py-2 px-2">
                            {record.cost ? `$${record.cost.toFixed(2)}` : '-'}
                          </td>
                          <td className="text-center py-2 px-2">
                            <Button
                              onClick={() => deleteRecord(record.id)}
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
        <Button
          onClick={handleSaveAsImage}
          variant="outline"
          className="gap-2"
          disabled={!result}
        >
          <Download className="h-4 w-4" />
          Save as Image
        </Button>

        <Button
          onClick={handlePrint}
          variant="outline"
          className="gap-2"
          disabled={!result}
        >
          <Printer className="h-4 w-4" />
          Print Results
        </Button>

        <Button onClick={handleShare} variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Calculator
        </Button>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Gas Mileage Calculator"
      />
    </div>
  );
}

