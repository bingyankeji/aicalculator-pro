'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Printer, Share2, RotateCcw, Zap, TrendingUp, DollarSign, Lightbulb } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Common appliances database
const APPLIANCES = [
  { name: 'Custom', power: 0, category: 'Custom' },
  // Kitchen
  { name: 'Refrigerator', power: 150, category: 'Kitchen' },
  { name: 'Freezer', power: 100, category: 'Kitchen' },
  { name: 'Microwave', power: 1000, category: 'Kitchen' },
  { name: 'Oven (Electric)', power: 2400, category: 'Kitchen' },
  { name: 'Dishwasher', power: 1800, category: 'Kitchen' },
  { name: 'Coffee Maker', power: 800, category: 'Kitchen' },
  { name: 'Toaster', power: 900, category: 'Kitchen' },
  { name: 'Electric Kettle', power: 1500, category: 'Kitchen' },
  // Climate Control
  { name: 'Air Conditioner (Window)', power: 1000, category: 'Climate' },
  { name: 'Air Conditioner (Central)', power: 3500, category: 'Climate' },
  { name: 'Space Heater', power: 1500, category: 'Climate' },
  { name: 'Electric Furnace', power: 15000, category: 'Climate' },
  { name: 'Ceiling Fan', power: 75, category: 'Climate' },
  { name: 'Dehumidifier', power: 300, category: 'Climate' },
  // Laundry
  { name: 'Washing Machine', power: 500, category: 'Laundry' },
  { name: 'Dryer (Electric)', power: 3000, category: 'Laundry' },
  { name: 'Iron', power: 1200, category: 'Laundry' },
  // Entertainment
  { name: 'TV (LED 32")', power: 50, category: 'Entertainment' },
  { name: 'TV (LED 55")', power: 100, category: 'Entertainment' },
  { name: 'TV (LED 75")', power: 200, category: 'Entertainment' },
  { name: 'Gaming Console', power: 150, category: 'Entertainment' },
  { name: 'Desktop Computer', power: 200, category: 'Entertainment' },
  { name: 'Laptop', power: 50, category: 'Entertainment' },
  { name: 'Cable Box', power: 30, category: 'Entertainment' },
  // Lighting
  { name: 'LED Bulb (60W equivalent)', power: 9, category: 'Lighting' },
  { name: 'LED Bulb (100W equivalent)', power: 14, category: 'Lighting' },
  { name: 'CFL Bulb (60W equivalent)', power: 15, category: 'Lighting' },
  { name: 'Incandescent Bulb (60W)', power: 60, category: 'Lighting' },
  { name: 'Incandescent Bulb (100W)', power: 100, category: 'Lighting' },
  // Other
  { name: 'Water Heater (Electric)', power: 4500, category: 'Other' },
  { name: 'Pool Pump', power: 1500, category: 'Other' },
  { name: 'Vacuum Cleaner', power: 1000, category: 'Other' },
  { name: 'Hair Dryer', power: 1500, category: 'Other' },
  { name: 'Electric Vehicle Charger', power: 7200, category: 'Other' },
];

interface ElectricityInputs {
  appliance: string;
  power: string;
  capacity: string;
  hoursPerDay: string;
  electricityPrice: string;
}

interface ElectricityResult {
  dailyEnergy: number;
  weeklyEnergy: number;
  monthlyEnergy: number;
  yearlyEnergy: number;
  dailyCost: number;
  weeklyCost: number;
  monthlyCost: number;
  yearlyCost: number;
  actualPower: number;
  categoryBreakdown: Array<{ name: string; value: number; percentage: number }>;
  costComparison: Array<{ period: string; cost: number }>;
  savingsTips: Array<{ tip: string; savings: number }>;
}

export default function ElectricityCalculator() {
  const [inputs, setInputs] = useState<ElectricityInputs>({
    appliance: 'Custom',
    power: '',
    capacity: '100',
    hoursPerDay: '',
    electricityPrice: '0.15',
  });

  const [result, setResult] = useState<ElectricityResult | null>(null);
  const [savedAppliances, setSavedAppliances] = useState<Array<{id: string; name: string; power: number; hours: number; cost: number}>>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/electricity-calculator',
    getShareParams: () => ({
      a: inputs.appliance,
      p: inputs.power,
      c: inputs.capacity,
      h: inputs.hoursPerDay,
      pr: inputs.electricityPrice,
    }),
    getShareText: () => {
      if (result) {
        return `Electricity Cost: $${result.monthlyCost.toFixed(2)}/month for ${inputs.appliance} - Calculate yours at`;
      }
      return "Calculate electricity costs and power usage with our Electricity Calculator";
    },
  });

  const handleInputChange = (field: keyof ElectricityInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    
    // Auto-fill power when appliance is selected
    if (field === 'appliance') {
      const selected = APPLIANCES.find(a => a.name === value);
      if (selected && selected.power > 0) {
        setInputs(prev => ({ ...prev, power: selected.power.toString() }));
      }
    }
  };

  const calculate = () => {
    const power = parseFloat(inputs.power);
    const capacity = parseFloat(inputs.capacity);
    const hoursPerDay = parseFloat(inputs.hoursPerDay);
    const price = parseFloat(inputs.electricityPrice);

    if (isNaN(power) || power <= 0) {
      alert('Please enter a valid power value.');
      return;
    }
    if (isNaN(capacity) || capacity <= 0 || capacity > 100) {
      alert('Please enter a capacity between 1-100%.');
      return;
    }
    if (isNaN(hoursPerDay) || hoursPerDay <= 0 || hoursPerDay > 24) {
      alert('Please enter hours per day between 0-24.');
      return;
    }
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid electricity price.');
      return;
    }

    // Calculate actual power considering capacity
    const actualPower = (power * capacity) / 100;

    // Calculate energy consumption (kWh)
    const dailyEnergy = (actualPower * hoursPerDay) / 1000;
    const weeklyEnergy = dailyEnergy * 7;
    const monthlyEnergy = dailyEnergy * 30;
    const yearlyEnergy = dailyEnergy * 365;

    // Calculate costs
    const dailyCost = dailyEnergy * price;
    const weeklyCost = weeklyEnergy * price;
    const monthlyCost = monthlyEnergy * price;
    const yearlyCost = yearlyEnergy * price;

    // Category breakdown (for demonstration)
    const categoryBreakdown = [
      { name: 'Kitchen', value: 25, percentage: 25 },
      { name: 'Climate Control', value: 35, percentage: 35 },
      { name: 'Lighting', value: 15, percentage: 15 },
      { name: 'Entertainment', value: 15, percentage: 15 },
      { name: 'Other', value: 10, percentage: 10 },
    ];

    // Cost comparison periods
    const costComparison = [
      { period: 'Daily', cost: dailyCost },
      { period: 'Weekly', cost: weeklyCost },
      { period: 'Monthly', cost: monthlyCost },
      { period: 'Yearly', cost: yearlyCost },
    ];

    // Savings tips based on appliance type
    const savingsTips = [
      { tip: 'Use LED bulbs instead of incandescent', savings: yearlyEnergy * 0.75 * price },
      { tip: 'Unplug devices when not in use', savings: yearlyEnergy * 0.1 * price },
      { tip: 'Use power-saving modes', savings: yearlyEnergy * 0.15 * price },
      { tip: 'Optimize thermostat settings', savings: yearlyEnergy * 0.2 * price },
    ];

    setResult({
      dailyEnergy,
      weeklyEnergy,
      monthlyEnergy,
      yearlyEnergy,
      dailyCost,
      weeklyCost,
      monthlyCost,
      yearlyCost,
      actualPower,
      categoryBreakdown,
      costComparison,
      savingsTips,
    });
  };

  const handleReset = () => {
    setInputs({
      appliance: 'Custom',
      power: '',
      capacity: '100',
      hoursPerDay: '',
      electricityPrice: '0.15',
    });
    setResult(null);
  };

  const handleAddAppliance = () => {
    if (result) {
      const newAppliance = {
        id: Date.now().toString(),
        name: inputs.appliance || 'Custom Device',
        power: parseFloat(inputs.power),
        hours: parseFloat(inputs.hoursPerDay),
        cost: result.monthlyCost,
      };
      setSavedAppliances(prev => [...prev, newAppliance]);
    }
  };

  const handleRemoveAppliance = (id: string) => {
    setSavedAppliances(prev => prev.filter(a => a.id !== id));
  };

  const getTotalMonthlyCost = () => {
    return savedAppliances.reduce((sum, app) => sum + app.cost, 0);
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
      link.download = `electricity-cost-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Electricity Calculator Results</title>
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

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* Quick Result */}
          {result && (
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Estimated Monthly Cost</p>
                  <p className="text-4xl font-bold text-blue-700">
                    ${result.monthlyCost.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {result.monthlyEnergy.toFixed(1)} kWh/month
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Input Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Electricity Calculator
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Calculate electricity usage and costs based on power requirements and usage time.
              </p>

              {/* Appliance Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Typical Appliance
                </Label>
                <select
                  value={inputs.appliance}
                  onChange={(e) => handleInputChange('appliance', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <optgroup label="Custom">
                    <option value="Custom">Define your own</option>
                  </optgroup>
                  <optgroup label="Kitchen">
                    {APPLIANCES.filter(a => a.category === 'Kitchen').map(a => (
                      <option key={a.name} value={a.name}>{a.name} ({a.power}W)</option>
                    ))}
                  </optgroup>
                  <optgroup label="Climate Control">
                    {APPLIANCES.filter(a => a.category === 'Climate').map(a => (
                      <option key={a.name} value={a.name}>{a.name} ({a.power}W)</option>
                    ))}
                  </optgroup>
                  <optgroup label="Laundry">
                    {APPLIANCES.filter(a => a.category === 'Laundry').map(a => (
                      <option key={a.name} value={a.name}>{a.name} ({a.power}W)</option>
                    ))}
                  </optgroup>
                  <optgroup label="Entertainment">
                    {APPLIANCES.filter(a => a.category === 'Entertainment').map(a => (
                      <option key={a.name} value={a.name}>{a.name} ({a.power}W)</option>
                    ))}
                  </optgroup>
                  <optgroup label="Lighting">
                    {APPLIANCES.filter(a => a.category === 'Lighting').map(a => (
                      <option key={a.name} value={a.name}>{a.name} ({a.power}W)</option>
                    ))}
                  </optgroup>
                  <optgroup label="Other">
                    {APPLIANCES.filter(a => a.category === 'Other').map(a => (
                      <option key={a.name} value={a.name}>{a.name} ({a.power}W)</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Power */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Appliance Power <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.power}
                    onChange={(e) => handleInputChange('power', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1000"
                    step="1"
                    min="0"
                  />
                  <div className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-medium min-w-[80px] text-center">
                    watt [W]
                  </div>
                </div>
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Use/run at <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100"
                    step="1"
                    min="0"
                    max="100"
                  />
                  <div className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-medium min-w-[100px] text-center">
                    % capacity
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  100% = full power, 50% = half power, etc.
                </p>
              </div>

              {/* Usage */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Usage <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.hoursPerDay}
                    onChange={(e) => handleInputChange('hoursPerDay', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="24"
                    step="0.1"
                    min="0"
                    max="24"
                  />
                  <div className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-medium min-w-[140px] text-center">
                    hours per day
                  </div>
                </div>
              </div>

              {/* Electricity Price */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Electricity Price <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <div className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-medium">
                    $
                  </div>
                  <input
                    type="number"
                    value={inputs.electricityPrice}
                    onChange={(e) => handleInputChange('electricityPrice', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.15"
                    step="0.01"
                    min="0"
                  />
                  <div className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-medium min-w-[100px] text-center">
                    per kWh
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  US average: $0.15/kWh. Check your utility bill for exact rate.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Calculate & Reset Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={calculate}
              className="flex-1 bg-green-600 hover:bg-green-700 gap-2 py-6 text-lg"
            >
              <Calculator className="h-5 w-5" />
              Calculate
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="gap-2 py-6"
            >
              <RotateCcw className="h-5 w-5" />
              Clear
            </Button>
          </div>

          {/* Add to List Button */}
          {result && (
            <Button 
              onClick={handleAddAppliance}
              variant="outline"
              className="w-full gap-2"
            >
              <Zap className="h-4 w-4" />
              Add to My Appliances
            </Button>
          )}
        </div>

        {/* Results Section */}
        <div className="xl:col-span-3 space-y-6">
          <div ref={resultRef}>
            {result ? (
              <>
                {/* Main Results */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Energy Consumption & Costs</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Energy Consumption */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Energy Consumption</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Daily</p>
                          <p className="text-lg font-bold text-blue-700">{result.dailyEnergy.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">kWh</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Weekly</p>
                          <p className="text-lg font-bold text-blue-700">{result.weeklyEnergy.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">kWh</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Monthly</p>
                          <p className="text-lg font-bold text-blue-700">{result.monthlyEnergy.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">kWh</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Yearly</p>
                          <p className="text-lg font-bold text-blue-700">{result.yearlyEnergy.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">kWh</p>
                        </div>
                      </div>
                    </div>

                    {/* Costs */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Electricity Costs</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Daily</p>
                          <p className="text-lg font-bold text-green-700">${result.dailyCost.toFixed(2)}</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Weekly</p>
                          <p className="text-lg font-bold text-green-700">${result.weeklyCost.toFixed(2)}</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Monthly</p>
                          <p className="text-lg font-bold text-green-700">${result.monthlyCost.toFixed(2)}</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Yearly</p>
                          <p className="text-lg font-bold text-green-700">${result.yearlyCost.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Calculation Details */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Calculation Details</h3>
                      <div className="space-y-1 text-sm text-gray-700">
                        <p><strong>Rated Power:</strong> {inputs.power}W</p>
                        <p><strong>Actual Power:</strong> {result.actualPower.toFixed(0)}W ({inputs.capacity}% capacity)</p>
                        <p><strong>Daily Runtime:</strong> {inputs.hoursPerDay} hours</p>
                        <p><strong>Electricity Rate:</strong> ${inputs.electricityPrice}/kWh</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Formula: Energy (kWh) = Power (kW) × Time (hours)<br />
                          Cost = Energy (kWh) × Rate ($/kWh)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cost Comparison Chart */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Cost Breakdown by Period</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={result.costComparison}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="period" />
                        <YAxis label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                        <Bar dataKey="cost" fill="#3b82f6" name="Cost" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Savings Tips */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      Energy Saving Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {result.savingsTips.map((tip, idx) => (
                        <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm text-gray-700 flex-1">{tip.tip}</p>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">
                                ${tip.savings.toFixed(2)}
                              </p>
                              <p className="text-xs text-gray-500">potential yearly savings</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Typical Home Energy Use */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Typical Home Energy Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={result.categoryBreakdown}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percentage }) => `${name} (${percentage}%)`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {result.categoryBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="space-y-2 text-sm">
                        {result.categoryBreakdown.map((cat, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[idx] }}></div>
                            <span className="text-gray-700">{cat.name}: {cat.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No results yet</p>
                  <p className="text-gray-400 text-sm">
                    Enter appliance details and click Calculate to see energy consumption and costs
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* My Appliances List */}
          {savedAppliances.length > 0 && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-gray-900">
                    My Appliances ({savedAppliances.length})
                  </CardTitle>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Monthly Cost</p>
                    <p className="text-2xl font-bold text-blue-700">
                      ${getTotalMonthlyCost().toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {savedAppliances.map((app) => (
                    <div key={app.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{app.name}</h4>
                          <p className="text-sm text-gray-600">
                            {app.power}W • {app.hours}h/day
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">
                            ${app.cost.toFixed(2)}/mo
                          </p>
                          <Button
                            onClick={() => handleRemoveAppliance(app.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 text-xs mt-1"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {result && (
            <div className="flex flex-wrap gap-3 justify-center print:hidden">
              <Button 
                onClick={handleSaveAsImage} 
                variant="outline" 
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Save as Image
              </Button>
              
              <Button 
                onClick={handlePrint} 
                variant="outline" 
                className="gap-2"
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
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Electricity Calculator"
      />
    </div>
  );
}

