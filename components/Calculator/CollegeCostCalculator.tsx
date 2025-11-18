'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Share2, Printer, GraduationCap, DollarSign } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface CollegeCostInputs {
  schoolType: string;
  totalAnnualCost: string;
  tuition: string;
  roomBoard: string;
  books: string;
  personal: string;
  transportation: string;
  years: string;
  inflationRate: string;
  currentSavings: string;
  monthlySavings: string;
  yearsUntilCollege: string;
  scholarships: string;
  returnRate: string;
}

// School type presets based on 2023-2024 averages
const SCHOOL_PRESETS = {
  'public-2year': {
    name: '2-year public',
    totalCost: 20570,
    tuition: 3800,
    roomBoard: 13000,
    books: 1200,
    personal: 1800,
    transportation: 770,
  },
  'public-instate': {
    name: '4-year in-state public',
    totalCost: 29910,
    tuition: 10940,
    roomBoard: 13000,
    books: 1200,
    personal: 2500,
    transportation: 2270,
  },
  'public-outstate': {
    name: '4-year out-of-state public',
    totalCost: 49080,
    tuition: 28240,
    roomBoard: 13000,
    books: 1200,
    personal: 2500,
    transportation: 4140,
  },
  'private': {
    name: '4-year private',
    totalCost: 62990,
    tuition: 39400,
    roomBoard: 14800,
    books: 1200,
    personal: 3000,
    transportation: 4590,
  },
  'custom': {
    name: 'Custom (enter your own)',
    totalCost: 0,
    tuition: 0,
    roomBoard: 0,
    books: 0,
    personal: 0,
    transportation: 0,
  },
};

interface YearlyCost {
  year: number;
  tuition: number;
  roomBoard: number;
  books: number;
  personal: number;
  transportation: number;
  total: number;
}

export default function CollegeCostCalculator() {
  const [inputs, setInputs] = useState<CollegeCostInputs>({
    schoolType: 'public-instate',
    totalAnnualCost: '29910',
    tuition: '10940',
    roomBoard: '13000',
    books: '1200',
    personal: '2500',
    transportation: '2270',
    years: '4',
    inflationRate: '3',
    currentSavings: '10000',
    monthlySavings: '500',
    yearsUntilCollege: '5',
    scholarships: '5000',
    returnRate: '5',
  });

  const [result, setResult] = useState<{
    yearlyCosts: YearlyCost[];
    totalCost: number;
    totalSavings: number;
    gap: number;
    scholarshipTotal: number;
  } | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/college-cost-calculator',
    getShareParams: () => ({
      t: inputs.tuition,
      rb: inputs.roomBoard,
      y: inputs.years,
    }),
    getShareText: () => {
      if (result) {
        return `Estimated college cost: $${result.totalCost.toLocaleString()} over ${inputs.years} years. Calculate yours!`;
      }
      return 'Calculate your college education costs with inflation adjustment!';
    },
  });

  const handleInputChange = (field: keyof CollegeCostInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  // When breakdown fields change, update total
  const handleBreakdownChange = (field: keyof CollegeCostInputs, value: string) => {
    setInputs((prev) => {
      const updated = { ...prev, [field]: value };
      // Recalculate total from breakdown
      const sum = 
        (parseFloat(updated.tuition) || 0) +
        (parseFloat(updated.roomBoard) || 0) +
        (parseFloat(updated.books) || 0) +
        (parseFloat(updated.personal) || 0) +
        (parseFloat(updated.transportation) || 0);
      return {
        ...updated,
        totalAnnualCost: sum > 0 ? sum.toString() : updated.totalAnnualCost,
      };
    });
  };

  const handleSchoolTypeChange = (schoolType: string) => {
    const preset = SCHOOL_PRESETS[schoolType as keyof typeof SCHOOL_PRESETS];
    if (preset) {
      setInputs((prev) => ({
        ...prev,
        schoolType,
        totalAnnualCost: preset.totalCost.toString(),
        tuition: preset.tuition.toString(),
        roomBoard: preset.roomBoard.toString(),
        books: preset.books.toString(),
        personal: preset.personal.toString(),
        transportation: preset.transportation.toString(),
      }));
    }
  };

  const calculate = () => {
    const totalAnnualCost = parseFloat(inputs.totalAnnualCost);
    const tuition = parseFloat(inputs.tuition) || 0;
    const roomBoard = parseFloat(inputs.roomBoard) || 0;
    const books = parseFloat(inputs.books) || 0;
    const personal = parseFloat(inputs.personal) || 0;
    const transportation = parseFloat(inputs.transportation) || 0;
    const years = parseInt(inputs.years);
    const inflationRate = parseFloat(inputs.inflationRate) / 100;
    const currentSavings = parseFloat(inputs.currentSavings) || 0;
    const monthlySavings = parseFloat(inputs.monthlySavings) || 0;
    const yearsUntilCollege = parseInt(inputs.yearsUntilCollege) || 0;
    const scholarships = parseFloat(inputs.scholarships) || 0;
    const returnRate = parseFloat(inputs.returnRate) / 100 || 0;

    if (
      isNaN(totalAnnualCost) ||
      totalAnnualCost <= 0 ||
      isNaN(years) ||
      years < 1 ||
      years > 10
    ) {
      alert('Please enter valid numbers. Total annual cost must be positive. Years must be between 1-10.');
      return;
    }

    // Always use totalAnnualCost as the source of truth
    // Breakdown is only for display purposes
    const detailSum = tuition + roomBoard + books + personal + transportation;
    const hasBreakdown = detailSum > 0;
    
    // Calculate breakdown percentages for display
    let breakdownRatios = {
      tuition: 0.40,
      roomBoard: 0.35,
      books: 0.10,
      personal: 0.10,
      transportation: 0.05,
    };
    
    if (hasBreakdown) {
      // Use actual breakdown ratios from input
      breakdownRatios = {
        tuition: tuition / detailSum,
        roomBoard: roomBoard / detailSum,
        books: books / detailSum,
        personal: personal / detailSum,
        transportation: transportation / detailSum,
      };
    }

    // Calculate yearly costs with inflation - always based on totalAnnualCost
    const yearlyCosts: YearlyCost[] = [];
    let totalCost = 0;

    for (let year = 1; year <= years; year++) {
      const inflationMultiplier = Math.pow(1 + inflationRate, yearsUntilCollege + year - 1);
      const inflatedTotal = totalAnnualCost * inflationMultiplier;

      const yearCost = {
        year,
        tuition: inflatedTotal * breakdownRatios.tuition,
        roomBoard: inflatedTotal * breakdownRatios.roomBoard,
        books: inflatedTotal * breakdownRatios.books,
        personal: inflatedTotal * breakdownRatios.personal,
        transportation: inflatedTotal * breakdownRatios.transportation,
        total: inflatedTotal,
      };

      yearlyCosts.push(yearCost);
      totalCost += yearCost.total;
    }

    // Calculate total savings
    let totalSavings = currentSavings;

    // Savings growth until college
    for (let i = 0; i < yearsUntilCollege * 12; i++) {
      totalSavings = totalSavings * (1 + returnRate / 12) + monthlySavings;
    }

    // Total scholarships over college years
    const scholarshipTotal = scholarships * years;

    // Calculate gap
    const gap = totalCost - totalSavings - scholarshipTotal;

    setResult({
      yearlyCosts,
      totalCost,
      totalSavings,
      gap,
      scholarshipTotal,
    });
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `college-cost-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current) return;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html><head><title>College Cost Analysis</title>
          <style>body{margin:0;padding:20px;display:flex;justify-content:center;}
          img{max-width:100%;height:auto;}
          @media print{body{padding:0;}img{page-break-inside:avoid;}}</style>
          </head><body><img src="${imgData}" onload="window.print();"/></body></html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
    }
  };

  // Prepare chart data
  const chartData = result
    ? result.yearlyCosts.map((year) => ({
        name: `Year ${year.year}`,
        Tuition: Math.round(year.tuition),
        'Room & Board': Math.round(year.roomBoard),
        Books: Math.round(year.books),
        Personal: Math.round(year.personal),
        Transportation: Math.round(year.transportation),
      }))
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                Annual College Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  School Type <span className="text-red-500">*</span>
                </Label>
                <select
                  value={inputs.schoolType}
                  onChange={(e) => handleSchoolTypeChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="public-2year">2-year public: $20,570/year</option>
                  <option value="public-instate">4-year in-state public: $29,910/year</option>
                  <option value="public-outstate">4-year out-of-state public: $49,080/year</option>
                  <option value="private">4-year private: $62,990/year</option>
                  <option value="custom">Custom (enter your own)</option>
                </select>
                <p className="text-xs text-gray-500">Average U.S. college costs 2023-2024</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalAnnualCost" className="text-sm font-medium text-gray-700">
                  Total Annual Cost <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="totalAnnualCost"
                    type="number"
                    min="0"
                    step="1000"
                    value={inputs.totalAnnualCost}
                    onChange={(e) => handleInputChange('totalAnnualCost', e.target.value)}
                    className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="29910"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  💡 This is the only value used for calculation
                </p>
              </div>

              <details className="border border-gray-200 rounded-lg p-3">
                <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700">
                  ▸ Cost Breakdown Reference (Optional)
                </summary>
                <div className="mt-4 space-y-3">
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-3">
                    <p className="text-xs text-blue-800">
                      ℹ️ These fields show how the total cost breaks down. Modify them to see different distributions in the chart, and the total will auto-update.
                    </p>
                  </div>
              <div className="space-y-2">
                <Label htmlFor="tuition" className="text-sm font-medium text-gray-700">
                  Tuition & Fees
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="tuition"
                    type="number"
                    min="0"
                    step="1000"
                    value={inputs.tuition}
                    onChange={(e) => handleBreakdownChange('tuition', e.target.value)}
                    className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="10940"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomBoard" className="text-sm font-medium text-gray-700">
                  Room & Board
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="roomBoard"
                    type="number"
                    min="0"
                    step="1000"
                    value={inputs.roomBoard}
                    onChange={(e) => handleBreakdownChange('roomBoard', e.target.value)}
                    className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="13000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="books" className="text-sm font-medium text-gray-700">
                  Books & Supplies
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="books"
                    type="number"
                    min="0"
                    step="100"
                    value={inputs.books}
                    onChange={(e) => handleBreakdownChange('books', e.target.value)}
                    className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="1200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="personal" className="text-sm font-medium text-gray-700">
                  Personal Expenses
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="personal"
                    type="number"
                    min="0"
                    step="100"
                    value={inputs.personal}
                    onChange={(e) => handleBreakdownChange('personal', e.target.value)}
                    className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="2500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transportation" className="text-sm font-medium text-gray-700">
                  Transportation
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="transportation"
                    type="number"
                    min="0"
                    step="100"
                    value={inputs.transportation}
                    onChange={(e) => handleBreakdownChange('transportation', e.target.value)}
                    className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="2270"
                  />
                </div>
              </div>
                </div>
              </details>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                Planning Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="years" className="text-sm font-medium text-gray-700">
                  Years in College <span className="text-red-500">*</span>
                </Label>
                <input
                  id="years"
                  type="number"
                  min="1"
                  max="10"
                  value={inputs.years}
                  onChange={(e) => handleInputChange('years', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="4"
                />
                <p className="text-xs text-gray-500">Typically 4 years for bachelor's</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsUntilCollege" className="text-sm font-medium text-gray-700">
                  Years Until College <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="yearsUntilCollege"
                  type="number"
                  min="0"
                  max="18"
                  value={inputs.yearsUntilCollege}
                  onChange={(e) => handleInputChange('yearsUntilCollege', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="5"
                />
                <p className="text-xs text-gray-500">Default: 5 years</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inflationRate" className="text-sm font-medium text-gray-700">
                  Annual Inflation Rate (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="inflationRate"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={inputs.inflationRate}
                  onChange={(e) => handleInputChange('inflationRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="3"
                />
                <p className="text-xs text-gray-500">Default: 3% (typical education inflation)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentSavings" className="text-sm font-medium text-gray-700">
                  Current Savings <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="currentSavings"
                    type="number"
                    min="0"
                    step="1000"
                    value={inputs.currentSavings}
                    onChange={(e) => handleInputChange('currentSavings', e.target.value)}
                    className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="10000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlySavings" className="text-sm font-medium text-gray-700">
                  Monthly Savings <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="monthlySavings"
                    type="number"
                    min="0"
                    step="50"
                    value={inputs.monthlySavings}
                    onChange={(e) => handleInputChange('monthlySavings', e.target.value)}
                    className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="returnRate" className="text-sm font-medium text-gray-700">
                  Investment Return Rate (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="returnRate"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={inputs.returnRate}
                  onChange={(e) => handleInputChange('returnRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="5"
                />
                <p className="text-xs text-gray-500">Default: 5% annual return</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scholarships" className="text-sm font-medium text-gray-700">
                  Annual Scholarships <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="scholarships"
                    type="number"
                    min="0"
                    step="1000"
                    value={inputs.scholarships}
                    onChange={(e) => handleInputChange('scholarships', e.target.value)}
                    className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="5000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate College Costs
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          <div className="space-y-6">
            {result ? (
              <>
                {/* Total Cost Summary */}
                <Card className="shadow-lg border-2 border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Cost Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Total Cost ({inputs.years} years)</p>
                        <p className="text-3xl font-bold text-blue-700">
                          ${result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>

                      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Total Savings</p>
                        <p className="text-3xl font-bold text-green-700">
                          ${result.totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>

                      {result.scholarshipTotal > 0 && (
                        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Total Scholarships</p>
                          <p className="text-3xl font-bold text-amber-700">
                            ${result.scholarshipTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                      )}

                      <div
                        className={`rounded-lg p-4 border-2 ${
                          result.gap <= 0
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <p className="text-xs text-gray-600 mb-1">
                          {result.gap <= 0 ? 'Surplus' : 'Funding Gap'}
                        </p>
                        <p
                          className={`text-3xl font-bold ${
                            result.gap <= 0 ? 'text-green-700' : 'text-red-700'
                          }`}
                        >
                          ${Math.abs(result.gap).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>

                    {result.gap > 0 && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <p className="text-sm text-amber-800 font-medium mb-2">💡 Funding Options:</p>
                        <ul className="text-xs text-amber-700 space-y-1">
                          <li>• Consider student loans or payment plans</li>
                          <li>• Apply for additional scholarships and grants</li>
                          <li>• Look into work-study programs</li>
                          <li>• Start at community college then transfer</li>
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Cost Breakdown Chart */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Cost Breakdown by Year</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 11 }} />
                        <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
                        <Tooltip
                          formatter={(value: number) =>
                            `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                          }
                        />
                        <Legend />
                        <Bar dataKey="Tuition" stackId="a" fill="#2563eb" />
                        <Bar dataKey="Room & Board" stackId="a" fill="#10b981" />
                        <Bar dataKey="Books" stackId="a" fill="#f59e0b" />
                        <Bar dataKey="Personal" stackId="a" fill="#8b5cf6" />
                        <Bar dataKey="Transportation" stackId="a" fill="#ec4899" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Yearly Breakdown Table */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Detailed Yearly Costs</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                              Year
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">
                              Tuition
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">
                              Room & Board
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">
                              Other
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {result.yearlyCosts.map((year) => (
                            <tr key={year.year} className="hover:bg-blue-50 transition-colors">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                Year {year.year}
                              </td>
                              <td className="px-4 py-3 text-sm text-right text-gray-700">
                                ${year.tuition.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </td>
                              <td className="px-4 py-3 text-sm text-right text-gray-700">
                                ${year.roomBoard.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </td>
                              <td className="px-4 py-3 text-sm text-right text-gray-700">
                                $
                                {(year.books + year.personal + year.transportation).toLocaleString(undefined, {
                                  maximumFractionDigits: 0,
                                })}
                              </td>
                              <td className="px-4 py-3 text-sm text-right font-bold text-blue-700">
                                ${year.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl text-gray-900">Results</CardTitle>
                </CardHeader>
                <CardContent className="p-12">
                  <div className="text-center text-gray-500">
                    <GraduationCap className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg mb-2">No results yet</p>
                    <p className="text-sm text-gray-400">
                      Enter your college costs and click "Calculate College Costs"
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {result && (
        <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
          <Button onClick={handleSaveAsImage} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Save as Image
          </Button>
          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print Results
          </Button>
          <Button onClick={handleShare} variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Calculator
          </Button>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="College Cost Calculator"
      />
    </div>
  );
}

