'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, RotateCcw, Plus, Trash2, TrendingUp } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TripRecord {
  id: string;
  date: string;
  distance: number;
  fuel: number;
  cost: number;
  mpg: number;
  lPer100km: number;
}

interface VehicleComparison {
  name: string;
  mpg: number;
  type: string;
}

const PRESET_VEHICLES: VehicleComparison[] = [
  { name: 'Compact Car', mpg: 35, type: 'Gasoline' },
  { name: 'Sedan', mpg: 30, type: 'Gasoline' },
  { name: 'SUV', mpg: 24, type: 'Gasoline' },
  { name: 'Hybrid', mpg: 50, type: 'Hybrid' },
  { name: 'Electric', mpg: 120, type: 'Electric' },
  { name: 'Truck', mpg: 20, type: 'Gasoline' },
];

export default function MileageCalculator() {
  // Current trip inputs
  const [distance, setDistance] = useState('');
  const [fuel, setFuel] = useState('');
  const [fuelPrice, setFuelPrice] = useState('3.50');
  const [distanceUnit, setDistanceUnit] = useState<'miles' | 'km'>('miles');
  const [fuelUnit, setFuelUnit] = useState<'gallons' | 'liters'>('gallons');
  
  // Annual calculation
  const [annualDistance, setAnnualDistance] = useState('');
  const [avgMpg, setAvgMpg] = useState('');
  
  // Trip history
  const [tripHistory, setTripHistory] = useState<TripRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Comparison
  const [compareVehicles, setCompareVehicles] = useState<VehicleComparison[]>([]);

  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/mileage-calculator',
    getShareParams: () => ({
      d: distance,
      f: fuel,
      p: fuelPrice,
      du: distanceUnit,
      fu: fuelUnit,
    }),
    getShareText: () => {
      if (distance && fuel) {
        const mpg = calculateMPG();
        return `My fuel efficiency: ${mpg.toFixed(1)} MPG - Calculate yours at`;
      }
      return 'Calculate your vehicle fuel efficiency and track mileage at';
    },
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mileageHistory');
    if (saved) {
      const parsed = JSON.parse(saved);
      setTripHistory(parsed.map((t: TripRecord) => ({ ...t, date: t.date })));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (tripHistory.length > 0) {
      localStorage.setItem('mileageHistory', JSON.stringify(tripHistory));
    }
  }, [tripHistory]);

  const calculateMPG = () => {
    const d = parseFloat(distance);
    const f = parseFloat(fuel);
    
    if (!d || !f || f === 0) return 0;
    
    // Convert to miles and gallons
    const miles = distanceUnit === 'km' ? d * 0.621371 : d;
    const gallons = fuelUnit === 'liters' ? f * 0.264172 : f;
    
    return miles / gallons;
  };

  const calculateLPer100km = () => {
    const d = parseFloat(distance);
    const f = parseFloat(fuel);
    
    if (!d || !f || d === 0) return 0;
    
    // Convert to km and liters
    const km = distanceUnit === 'miles' ? d * 1.60934 : d;
    const liters = fuelUnit === 'gallons' ? f * 3.78541 : f;
    
    return (liters / km) * 100;
  };

  const calculateCost = () => {
    const f = parseFloat(fuel);
    const price = parseFloat(fuelPrice);
    
    if (!f || !price) return 0;
    
    const gallons = fuelUnit === 'liters' ? f * 0.264172 : f;
    return gallons * price;
  };

  const calculateCO2 = () => {
    const f = parseFloat(fuel);
    if (!f) return 0;
    
    // CO2 emissions: ~8.887 kg per gallon of gasoline
    const gallons = fuelUnit === 'liters' ? f * 0.264172 : f;
    return gallons * 8.887;
  };

  const calculateAnnualCost = () => {
    const d = parseFloat(annualDistance);
    const mpg = parseFloat(avgMpg);
    const price = parseFloat(fuelPrice);
    
    if (!d || !mpg || !price || mpg === 0) return null;
    
    const miles = distanceUnit === 'km' ? d * 0.621371 : d;
    const gallonsNeeded = miles / mpg;
    const annualCost = gallonsNeeded * price;
    const annualCO2 = gallonsNeeded * 8.887;
    
    return {
      gallonsNeeded,
      annualCost,
      annualCO2,
      costPerMile: annualCost / miles,
    };
  };

  const handleAddTrip = () => {
    const d = parseFloat(distance);
    const f = parseFloat(fuel);
    
    if (!d || !f) {
      alert('Please enter distance and fuel used.');
      return;
    }
    
    const mpg = calculateMPG();
    const lPer100km = calculateLPer100km();
    const cost = calculateCost();
    
    const newTrip: TripRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      distance: d,
      fuel: f,
      cost,
      mpg,
      lPer100km,
    };
    
    setTripHistory([newTrip, ...tripHistory]);
    
    // Reset inputs
    setDistance('');
    setFuel('');
  };

  const handleDeleteTrip = (id: string) => {
    if (confirm('Delete this trip record?')) {
      setTripHistory(tripHistory.filter(t => t.id !== id));
    }
  };

  const getTripStats = () => {
    if (tripHistory.length === 0) return null;
    
    const totalDistance = tripHistory.reduce((sum, t) => sum + t.distance, 0);
    const totalFuel = tripHistory.reduce((sum, t) => sum + t.fuel, 0);
    const totalCost = tripHistory.reduce((sum, t) => sum + t.cost, 0);
    const avgMpg = tripHistory.reduce((sum, t) => sum + t.mpg, 0) / tripHistory.length;
    const avgLPer100km = tripHistory.reduce((sum, t) => sum + t.lPer100km, 0) / tripHistory.length;
    
    return {
      totalDistance,
      totalFuel,
      totalCost,
      avgMpg,
      avgLPer100km,
      tripCount: tripHistory.length,
    };
  };

  const handleAddComparison = (vehicle: VehicleComparison) => {
    if (!compareVehicles.find(v => v.name === vehicle.name)) {
      setCompareVehicles([...compareVehicles, vehicle]);
    }
  };

  const getComparisonData = () => {
    const d = parseFloat(annualDistance) || 15000;
    const price = parseFloat(fuelPrice);
    
    return compareVehicles.map(v => {
      const gallonsNeeded = d / v.mpg;
      const annualCost = gallonsNeeded * price;
      const co2 = gallonsNeeded * 8.887;
      
      return {
        name: v.name,
        mpg: v.mpg,
        cost: annualCost,
        co2: co2,
        gallons: gallonsNeeded,
      };
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
      
      const link = document.createElement('a');
      link.download = `mileage-calculator-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Mileage Calculator Results</title>
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

  const handleReset = () => {
    setDistance('');
    setFuel('');
    setFuelPrice('3.50');
    setAnnualDistance('');
    setAvgMpg('');
  };

  const mpg = calculateMPG();
  const lPer100km = calculateLPer100km();
  const cost = calculateCost();
  const co2 = calculateCO2();
  const annualStats = calculateAnnualCost();
  const tripStats = getTripStats();
  const comparisonData = getComparisonData();

  const hasCurrentResult = distance && fuel;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          {/* Trip Calculator */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Trip Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Distance <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="300"
                    step="0.1"
                  />
                  <select
                    value={distanceUnit}
                    onChange={(e) => setDistanceUnit(e.target.value as 'miles' | 'km')}
                    className="px-4 py-3 border border-gray-300 rounded-lg"
                  >
                    <option value="miles">Miles</option>
                    <option value="km">Kilometers</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Fuel Used <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10"
                    step="0.1"
                  />
                  <select
                    value={fuelUnit}
                    onChange={(e) => setFuelUnit(e.target.value as 'gallons' | 'liters')}
                    className="px-4 py-3 border border-gray-300 rounded-lg"
                  >
                    <option value="gallons">Gallons</option>
                    <option value="liters">Liters</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Fuel Price (per gallon) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="3.50"
                    step="0.01"
                  />
                </div>
                <p className="text-xs text-gray-500">Default: $3.50/gallon</p>
              </div>

              <Button
                onClick={handleAddTrip}
                disabled={!distance || !fuel}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to History
              </Button>
            </CardContent>
          </Card>

          {/* Annual Estimator */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Annual Cost Estimator</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Annual Distance
                </Label>
                <input
                  type="number"
                  value={annualDistance}
                  onChange={(e) => setAnnualDistance(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder={`15000 ${distanceUnit}`}
                  step="100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Average MPG
                </Label>
                <input
                  type="number"
                  value={avgMpg}
                  onChange={(e) => setAvgMpg(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="30"
                  step="0.1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Reset Button */}
          <Button 
            onClick={handleReset}
            variant="outline"
            className="w-full gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          <div ref={resultRef}>
            {/* Current Trip Results */}
            {hasCurrentResult && (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Current Trip Results</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-600 mb-1">Fuel Efficiency (MPG)</p>
                      <p className="text-3xl font-bold text-blue-700">{mpg.toFixed(1)}</p>
                      <p className="text-xs text-gray-500 mt-1">Miles per gallon</p>
                    </div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-600 mb-1">Fuel Efficiency (L/100km)</p>
                      <p className="text-3xl font-bold text-green-700">{lPer100km.toFixed(1)}</p>
                      <p className="text-xs text-gray-500 mt-1">Liters per 100km</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-600 mb-1">Trip Cost</p>
                      <p className="text-2xl font-bold text-amber-700">${cost.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-600 mb-1">CO₂ Emissions</p>
                      <p className="text-2xl font-bold text-gray-700">{co2.toFixed(1)} kg</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Efficiency Rating</h3>
                    <div className="space-y-2">
                      {mpg >= 40 && (
                        <p className="text-sm text-green-700">🌟 Excellent efficiency! Your vehicle is very fuel-efficient.</p>
                      )}
                      {mpg >= 30 && mpg < 40 && (
                        <p className="text-sm text-blue-700">👍 Good efficiency. Above average for most vehicles.</p>
                      )}
                      {mpg >= 20 && mpg < 30 && (
                        <p className="text-sm text-amber-700">⚠️ Average efficiency. Consider eco-driving techniques.</p>
                      )}
                      {mpg < 20 && (
                        <p className="text-sm text-red-700">❗ Below average efficiency. Check tire pressure and driving habits.</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Annual Cost Estimate */}
            {annualStats && (
              <Card className="shadow-lg mt-6">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Annual Cost Estimate</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Annual Fuel Cost</p>
                      <p className="text-3xl font-bold text-red-700">${annualStats.annualCost.toFixed(0)}</p>
                      <p className="text-xs text-gray-500 mt-1">${annualStats.costPerMile.toFixed(3)} per mile</p>
                    </div>
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Fuel Needed</p>
                      <p className="text-3xl font-bold text-blue-700">{annualStats.gallonsNeeded.toFixed(0)}</p>
                      <p className="text-xs text-gray-500 mt-1">gallons per year</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:col-span-2">
                      <p className="text-xs text-gray-600 mb-1">Annual CO₂ Emissions</p>
                      <p className="text-2xl font-bold text-gray-700">{annualStats.annualCO2.toFixed(0)} kg</p>
                      <p className="text-xs text-gray-500 mt-1">{(annualStats.annualCO2 / 1000).toFixed(2)} metric tons</p>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">💡 Money-Saving Tips</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Improving MPG by 5 saves ${(annualStats.annualCost * 0.15).toFixed(0)}/year</li>
                      <li>• Proper tire inflation can improve MPG by 3%</li>
                      <li>• Removing 100 lbs reduces fuel consumption by 1-2%</li>
                      <li>• Avoid aggressive driving to improve MPG by 10-30%</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trip History */}
            {tripHistory.length > 0 && (
              <Card className="shadow-lg mt-6">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900">Trip History ({tripHistory.length})</CardTitle>
                    <Button
                      onClick={() => setShowHistory(!showHistory)}
                      variant="outline"
                      size="sm"
                    >
                      {showHistory ? 'Hide' : 'Show'} History
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {tripStats && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600">Total Distance</p>
                        <p className="text-xl font-bold text-blue-700">{tripStats.totalDistance.toFixed(0)}</p>
                        <p className="text-xs text-gray-500">{distanceUnit}</p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600">Avg MPG</p>
                        <p className="text-xl font-bold text-green-700">{tripStats.avgMpg.toFixed(1)}</p>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600">Total Cost</p>
                        <p className="text-xl font-bold text-red-700">${tripStats.totalCost.toFixed(0)}</p>
                      </div>
                    </div>
                  )}

                  {showHistory && (
                    <div className="space-y-3">
                      <div className="max-h-96 overflow-y-auto space-y-2">
                        {tripHistory.map((trip) => (
                          <div key={trip.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900">{trip.date}</p>
                              <p className="text-xs text-gray-600">
                                {trip.distance.toFixed(1)} {distanceUnit} • {trip.fuel.toFixed(1)} {fuelUnit} • {trip.mpg.toFixed(1)} MPG
                              </p>
                              <p className="text-xs text-gray-500">${trip.cost.toFixed(2)}</p>
                            </div>
                            <Button
                              onClick={() => handleDeleteTrip(trip.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      {tripHistory.length >= 3 && (
                        <div className="mt-6">
                          <h3 className="font-semibold text-gray-900 mb-3">MPG Trend</h3>
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={[...tripHistory].reverse().slice(-10)}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="mpg" stroke="#1e40af" strokeWidth={2} dot={{ r: 4 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Vehicle Comparison */}
            <Card className="shadow-lg mt-6">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">Vehicle Type Comparison</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {PRESET_VEHICLES.map((vehicle) => (
                    <Button
                      key={vehicle.name}
                      onClick={() => handleAddComparison(vehicle)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      disabled={compareVehicles.find(v => v.name === vehicle.name) !== undefined}
                    >
                      {vehicle.name} ({vehicle.mpg} MPG)
                    </Button>
                  ))}
                </div>

                {compareVehicles.length > 0 && comparisonData.length > 0 && (
                  <div className="space-y-4 mt-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Based on {annualDistance || '15000'} {distanceUnit}/year
                      </p>
                      <Button
                        onClick={() => setCompareVehicles([])}
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                      >
                        Clear All
                      </Button>
                    </div>

                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="cost" fill="#1e40af" name="Annual Cost ($)" />
                        <Bar yAxisId="right" dataKey="mpg" fill="#059669" name="MPG" />
                      </BarChart>
                    </ResponsiveContainer>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-3 py-2 text-left">Vehicle</th>
                            <th className="px-3 py-2 text-right">MPG</th>
                            <th className="px-3 py-2 text-right">Annual Cost</th>
                            <th className="px-3 py-2 text-right">CO₂ (kg)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {comparisonData.map((v) => (
                            <tr key={v.name}>
                              <td className="px-3 py-2 font-medium">{v.name}</td>
                              <td className="px-3 py-2 text-right">{v.mpg.toFixed(1)}</td>
                              <td className="px-3 py-2 text-right">${v.cost.toFixed(0)}</td>
                              <td className="px-3 py-2 text-right">{v.co2.toFixed(0)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center print:hidden">
            <Button 
              onClick={handleSaveAsImage} 
              variant="outline" 
              className="gap-2"
              disabled={!hasCurrentResult}
            >
              <Download className="h-4 w-4" />
              Save as Image
            </Button>
            
            <Button 
              onClick={handlePrint} 
              variant="outline" 
              className="gap-2"
              disabled={!hasCurrentResult}
            >
              <Printer className="h-4 w-4" />
              Print Results
            </Button>
            
            <Button 
              onClick={handleShare} 
              variant="outline" 
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share Calculator
            </Button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Mileage Calculator"
      />
    </div>
  );
}

