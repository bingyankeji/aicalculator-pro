'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Download, Share2, Printer, TrendingUp, Home, DollarSign } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

interface RentVsBuyInputs {
  homePrice: string;
  downPaymentPercent: string;
  interestRate: string;
  loanTerm: string;
  monthlyRent: string;
  rentIncrease: string;
  homeAppreciation: string;
  propertyTax: string;
  homeInsurance: string;
  maintenance: string;
  hoaFees: string;
  years: string;
}

interface YearlyData {
  year: number;
  rentCost: number;
  buyCost: number;
  rentCumulative: number;
  buyCumulative: number;
  homeEquity: number;
  homeValue: number;
}

interface ComparisonResult {
  rentTotal: number;
  buyTotal: number;
  difference: number;
  breakEvenYear: number | null;
  homeEquity: number;
  homeValue: number;
  totalInterest: number;
  monthlyMortgage: number;
  downPayment: number;
  loanAmount: number;
  yearlyData: YearlyData[];
  recommendation: string;
}

export default function RentVsBuyCalculator() {
  const [inputs, setInputs] = useState<RentVsBuyInputs>({
    homePrice: '400000',
    downPaymentPercent: '20',
    interestRate: '6.5',
    loanTerm: '30',
    monthlyRent: '2000',
    rentIncrease: '3',
    homeAppreciation: '3',
    propertyTax: '1.2',
    homeInsurance: '1200',
    maintenance: '1',
    hoaFees: '0',
    years: '10',
  });

  const [result, setResult] = useState<ComparisonResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/rent-vs-buy-calculator',
    getShareParams: () => ({
      hp: inputs.homePrice,
      dp: inputs.downPaymentPercent,
      ir: inputs.interestRate,
      lt: inputs.loanTerm,
      mr: inputs.monthlyRent,
      ri: inputs.rentIncrease,
      ha: inputs.homeAppreciation,
      y: inputs.years,
    }),
    getShareText: () => {
      if (result) {
        return `Rent vs Buy Analysis: After ${inputs.years} years, ${
          result.difference > 0 ? 'buying saves' : 'renting saves'
        } $${Math.abs(result.difference).toLocaleString()}. Check it out!`;
      }
      return 'Compare renting vs buying a home with detailed cost analysis!';
    },
  });

  const handleInputChange = (field: keyof RentVsBuyInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const calculateMortgage = (
    principal: number,
    annualRate: number,
    years: number
  ): number => {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    if (monthlyRate === 0) return principal / numPayments;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    );
  };

  const calculate = () => {
    const homePrice = parseFloat(inputs.homePrice);
    const downPaymentPercent = parseFloat(inputs.downPaymentPercent);
    const interestRate = parseFloat(inputs.interestRate);
    const loanTerm = parseFloat(inputs.loanTerm);
    const monthlyRent = parseFloat(inputs.monthlyRent);
    const rentIncrease = parseFloat(inputs.rentIncrease) / 100;
    const homeAppreciation = parseFloat(inputs.homeAppreciation) / 100;
    const propertyTaxRate = parseFloat(inputs.propertyTax) / 100;
    const annualInsurance = parseFloat(inputs.homeInsurance);
    const maintenanceRate = parseFloat(inputs.maintenance) / 100;
    const monthlyHOA = parseFloat(inputs.hoaFees);
    const years = parseInt(inputs.years);

    if (
      !homePrice ||
      !downPaymentPercent ||
      !interestRate ||
      !loanTerm ||
      !monthlyRent ||
      years <= 0
    ) {
      alert('Please fill in all required fields with valid values.');
      return;
    }

    const downPayment = homePrice * (downPaymentPercent / 100);
    const loanAmount = homePrice - downPayment;
    const monthlyMortgage = calculateMortgage(loanAmount, interestRate, loanTerm);

    const yearlyData: YearlyData[] = [];
    let rentCumulative = 0;
    let buyCumulative = downPayment; // Include down payment in initial cost
    let currentHomeValue = homePrice;
    let remainingBalance = loanAmount;
    let currentRent = monthlyRent;

    for (let year = 1; year <= years; year++) {
      // Rent costs for this year
      const yearRentCost = currentRent * 12;
      rentCumulative += yearRentCost;

      // Buy costs for this year
      const yearPropertyTax = currentHomeValue * propertyTaxRate;
      const yearMaintenance = currentHomeValue * maintenanceRate;
      const yearMortgage = monthlyMortgage * 12;
      const yearHOA = monthlyHOA * 12;
      const yearBuyCost = yearMortgage + yearPropertyTax + annualInsurance + yearMaintenance + yearHOA;
      buyCumulative += yearBuyCost;

      // Calculate principal paid this year
      const monthlyRate = interestRate / 100 / 12;
      let principalPaid = 0;
      for (let month = 1; month <= 12; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyMortgage - interestPayment;
        principalPaid += principalPayment;
        remainingBalance = Math.max(0, remainingBalance - principalPayment);
      }

      // Update home value
      currentHomeValue *= 1 + homeAppreciation;

      // Calculate equity
      const homeEquity = currentHomeValue - remainingBalance;

      yearlyData.push({
        year,
        rentCost: yearRentCost,
        buyCost: yearBuyCost,
        rentCumulative,
        buyCumulative,
        homeEquity,
        homeValue: currentHomeValue,
      });

      // Update rent for next year
      currentRent *= 1 + rentIncrease;
    }

    // Find break-even point
    let breakEvenYear: number | null = null;
    for (let i = 0; i < yearlyData.length; i++) {
      const netBuyCost = yearlyData[i].buyCumulative - yearlyData[i].homeEquity;
      if (netBuyCost <= yearlyData[i].rentCumulative) {
        breakEvenYear = yearlyData[i].year;
        break;
      }
    }

    const finalYear = yearlyData[yearlyData.length - 1];
    const rentTotal = finalYear.rentCumulative;
    const buyNetCost = finalYear.buyCumulative - finalYear.homeEquity;
    const difference = rentTotal - buyNetCost;

    // Calculate total interest
    const totalPaid = monthlyMortgage * 12 * Math.min(years, loanTerm);
    const totalInterest = totalPaid - loanAmount;

    // Generate recommendation
    let recommendation = '';
    if (breakEvenYear && breakEvenYear <= years) {
      recommendation = `Buying is recommended! You'll break even in year ${breakEvenYear} and build ${finalYear.homeEquity.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })} in equity over ${years} years.`;
    } else if (difference > 0) {
      recommendation = `Buying may be better long-term. While you haven't reached break-even in ${years} years, you'll have ${finalYear.homeEquity.toLocaleString(
        'en-US',
        { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }
      )} in equity.`;
    } else {
      recommendation = `Renting may be more cost-effective for your ${years}-year timeline. Consider buying if you plan to stay longer or expect higher home appreciation.`;
    }

    setResult({
      rentTotal,
      buyTotal: finalYear.buyCumulative,
      difference,
      breakEvenYear,
      homeEquity: finalYear.homeEquity,
      homeValue: finalYear.homeValue,
      totalInterest,
      monthlyMortgage,
      downPayment,
      loanAmount,
      yearlyData,
      recommendation,
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
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.download = `rent-vs-buy-analysis-${new Date().toISOString().split('T')[0]}.png`;
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
      await new Promise((resolve) => setTimeout(resolve, 500));

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
              <title>Rent vs Buy Analysis Results</title>
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

  // Prepare radar chart data
  const radarData = result
    ? [
        {
          subject: 'Cost Efficiency',
          Renting: result.rentTotal < result.buyTotal - result.homeEquity ? 80 : 40,
          Buying: result.rentTotal < result.buyTotal - result.homeEquity ? 40 : 80,
        },
        {
          subject: 'Flexibility',
          Renting: 90,
          Buying: 30,
        },
        {
          subject: 'Asset Building',
          Renting: 20,
          Buying: 85,
        },
        {
          subject: 'Financial Risk',
          Renting: 70,
          Buying: 40,
        },
        {
          subject: 'Long-term Value',
          Renting: 30,
          Buying: 90,
        },
      ]
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-600" />
                Home Purchase Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="homePrice" className="text-sm font-medium text-gray-700">
                  Home Price <span className="text-red-500">*</span>
                </Label>
                <input
                  id="homePrice"
                  type="number"
                  value={inputs.homePrice}
                  onChange={(e) => handleInputChange('homePrice', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="400000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPaymentPercent" className="text-sm font-medium text-gray-700">
                  Down Payment (%) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="downPaymentPercent"
                  type="number"
                  value={inputs.downPaymentPercent}
                  onChange={(e) => handleInputChange('downPaymentPercent', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="20"
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate" className="text-sm font-medium text-gray-700">
                  Interest Rate (%) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  value={inputs.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="6.5"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTerm" className="text-sm font-medium text-gray-700">
                  Loan Term (years) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="loanTerm"
                  type="number"
                  value={inputs.loanTerm}
                  onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="30"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyTax" className="text-sm font-medium text-gray-700">
                  Property Tax Rate (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="propertyTax"
                  type="number"
                  step="0.1"
                  value={inputs.propertyTax}
                  onChange={(e) => handleInputChange('propertyTax', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1.2"
                />
                <p className="text-xs text-gray-500">Default: 1.2% (national average)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="homeInsurance" className="text-sm font-medium text-gray-700">
                  Annual Home Insurance ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="homeInsurance"
                  type="number"
                  value={inputs.homeInsurance}
                  onChange={(e) => handleInputChange('homeInsurance', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1200"
                />
                <p className="text-xs text-gray-500">Default: $1,200/year</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenance" className="text-sm font-medium text-gray-700">
                  Annual Maintenance (% of home value){' '}
                  <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="maintenance"
                  type="number"
                  step="0.1"
                  value={inputs.maintenance}
                  onChange={(e) => handleInputChange('maintenance', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1"
                />
                <p className="text-xs text-gray-500">Default: 1% of home value</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoaFees" className="text-sm font-medium text-gray-700">
                  Monthly HOA Fees ($) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="hoaFees"
                  type="number"
                  value={inputs.hoaFees}
                  onChange={(e) => handleInputChange('hoaFees', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500">Default: $0 (leave blank if none)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="homeAppreciation" className="text-sm font-medium text-gray-700">
                  Home Appreciation Rate (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="homeAppreciation"
                  type="number"
                  step="0.1"
                  value={inputs.homeAppreciation}
                  onChange={(e) => handleInputChange('homeAppreciation', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3"
                />
                <p className="text-xs text-gray-500">Default: 3% per year</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                Rental Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyRent" className="text-sm font-medium text-gray-700">
                  Monthly Rent <span className="text-red-500">*</span>
                </Label>
                <input
                  id="monthlyRent"
                  type="number"
                  value={inputs.monthlyRent}
                  onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rentIncrease" className="text-sm font-medium text-gray-700">
                  Annual Rent Increase (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="rentIncrease"
                  type="number"
                  step="0.1"
                  value={inputs.rentIncrease}
                  onChange={(e) => handleInputChange('rentIncrease', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3"
                />
                <p className="text-xs text-gray-500">Default: 3% per year</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="years" className="text-sm font-medium text-gray-700">
                  Analysis Period (years) <span className="text-red-500">*</span>
                </Label>
                <input
                  id="years"
                  type="number"
                  value={inputs.years}
                  onChange={(e) => handleInputChange('years', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10"
                  min="1"
                  max="30"
                  required
                />
                <p className="text-xs text-gray-500">How many years do you plan to stay?</p>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Comparison
          </Button>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2" ref={resultRef}>
          <div className="space-y-6">
            {result ? (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                    <CardContent className="p-6">
                      <p className="text-sm text-blue-600 font-medium mb-1">Total Rent Cost</p>
                      <p className="text-3xl sm:text-4xl font-bold text-blue-700 break-all">
                        ${result.rentTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-blue-600 mt-2">Over {inputs.years} years</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                    <CardContent className="p-6">
                      <p className="text-sm text-green-600 font-medium mb-1">Net Buy Cost</p>
                      <p className="text-3xl sm:text-4xl font-bold text-green-700 break-all">
                        $
                        {(result.buyTotal - result.homeEquity).toLocaleString('en-US', {
                          maximumFractionDigits: 0,
                        })}
                      </p>
                      <p className="text-xs text-green-600 mt-2">After subtracting equity</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
                    <CardContent className="p-6">
                      <p className="text-sm text-purple-600 font-medium mb-1">Home Equity Built</p>
                      <p className="text-3xl sm:text-4xl font-bold text-purple-700 break-all">
                        ${result.homeEquity.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-purple-600 mt-2">
                        Home value: ${result.homeValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`shadow-lg ${
                      result.difference > 0
                        ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-300'
                        : 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300'
                    }`}
                  >
                    <CardContent className="p-6">
                      <p
                        className={`text-sm font-medium mb-1 ${
                          result.difference > 0 ? 'text-green-600' : 'text-amber-600'
                        }`}
                      >
                        {result.difference > 0 ? 'Buying Saves' : 'Renting Saves'}
                      </p>
                      <p
                        className={`text-3xl sm:text-4xl font-bold break-all ${
                          result.difference > 0 ? 'text-green-700' : 'text-amber-700'
                        }`}
                      >
                        ${Math.abs(result.difference).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </p>
                      <p
                        className={`text-xs mt-2 ${
                          result.difference > 0 ? 'text-green-600' : 'text-amber-600'
                        }`}
                      >
                        {result.breakEvenYear
                          ? `Break-even year: ${result.breakEvenYear}`
                          : 'No break-even in period'}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendation Card */}
                <Card className="shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                          💡 Smart Recommendation
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{result.recommendation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mortgage Details */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">Mortgage Details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Monthly Payment</p>
                        <p className="text-xl font-bold text-gray-900">
                          ${result.monthlyMortgage.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Down Payment</p>
                        <p className="text-xl font-bold text-gray-900">
                          ${result.downPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Loan Amount</p>
                        <p className="text-xl font-bold text-gray-900">
                          ${result.loanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Interest</p>
                        <p className="text-xl font-bold text-gray-900">
                          ${result.totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cumulative Cost Comparison Chart */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">
                      📈 Cumulative Cost Over Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300} minHeight={250}>
                      <LineChart data={result.yearlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="year"
                          stroke="#6b7280"
                          tick={{ fontSize: 12 }}
                          label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis
                          stroke="#6b7280"
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) =>
                            `$${(value / 1000).toFixed(0)}k`
                          }
                        />
                        <Tooltip
                          formatter={(value: number) =>
                            `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
                          }
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="rentCumulative"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="Total Rent Cost"
                          dot={{ fill: '#3b82f6', r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="buyCumulative"
                          stroke="#10b981"
                          strokeWidth={2}
                          name="Total Buy Cost"
                          dot={{ fill: '#10b981', r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Home Equity Growth Chart */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">💰 Home Equity Growth</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300} minHeight={250}>
                      <BarChart data={result.yearlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="year"
                          stroke="#6b7280"
                          tick={{ fontSize: 12 }}
                          label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis
                          stroke="#6b7280"
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) =>
                            `$${(value / 1000).toFixed(0)}k`
                          }
                        />
                        <Tooltip
                          formatter={(value: number) =>
                            `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
                          }
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Bar dataKey="homeEquity" fill="#8b5cf6" name="Home Equity" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Radar Comparison Chart */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">
                      📊 Multi-Dimensional Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={350} minHeight={300}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6b7280' }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                        <Radar
                          name="Renting"
                          dataKey="Renting"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                        />
                        <Radar
                          name="Buying"
                          dataKey="Buying"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.3}
                        />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 text-sm text-gray-600 space-y-1">
                      <p>• <strong>Cost Efficiency:</strong> Which option costs less overall</p>
                      <p>• <strong>Flexibility:</strong> Ease of moving and lifestyle changes</p>
                      <p>• <strong>Asset Building:</strong> Wealth accumulation potential</p>
                      <p>• <strong>Financial Risk:</strong> Lower score = higher risk</p>
                      <p>• <strong>Long-term Value:</strong> Benefits over extended period</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Yearly Breakdown Table */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl text-gray-900">📋 Year-by-Year Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="overflow-x-auto overflow-y-hidden">
                      <table className="w-full min-w-[600px] text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-300">
                            <th className="px-2 sm:px-4 py-3 text-left font-semibold text-gray-900">
                              Year
                            </th>
                            <th className="px-2 sm:px-4 py-3 text-right font-semibold text-gray-900">
                              Rent Cost
                            </th>
                            <th className="px-2 sm:px-4 py-3 text-right font-semibold text-gray-900">
                              Buy Cost
                            </th>
                            <th className="px-2 sm:px-4 py-3 text-right font-semibold text-gray-900">
                              Home Value
                            </th>
                            <th className="px-2 sm:px-4 py-3 text-right font-semibold text-gray-900">
                              Home Equity
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.yearlyData.map((yearData) => (
                            <tr
                              key={yearData.year}
                              className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                            >
                              <td className="px-2 sm:px-4 py-3 text-gray-900 font-medium">
                                {yearData.year}
                              </td>
                              <td className="px-2 sm:px-4 py-3 text-right text-gray-700">
                                ${yearData.rentCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                              </td>
                              <td className="px-2 sm:px-4 py-3 text-right text-gray-700">
                                ${yearData.buyCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                              </td>
                              <td className="px-2 sm:px-4 py-3 text-right text-gray-700">
                                ${yearData.homeValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                              </td>
                              <td className="px-2 sm:px-4 py-3 text-right text-green-600 font-semibold">
                                ${yearData.homeEquity.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Considerations */}
                <Card className="shadow-lg border-2 border-amber-200 bg-amber-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
                      ⚠️ Important Considerations
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>Market Risk:</strong> Home values and rent can fluctuate based on economic
                        conditions and local market dynamics.
                      </p>
                      <p>
                        <strong>Liquidity Risk:</strong> Selling a home takes time and incurs transaction
                        costs (typically 6-10% of home value).
                      </p>
                      <p>
                        <strong>Opportunity Cost:</strong> The down payment could be invested elsewhere,
                        potentially earning returns.
                      </p>
                      <p>
                        <strong>Maintenance Surprises:</strong> Major repairs (roof, HVAC, foundation) can
                        exceed the 1% annual estimate.
                      </p>
                      <p>
                        <strong>Flexibility:</strong> Renting offers more mobility for career changes or
                        lifestyle adjustments.
                      </p>
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
                    <Home className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">Enter your details and click "Calculate Comparison" to see results</p>
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
        calculatorName="Rent vs Buy Calculator"
      />
    </div>
  );
}

