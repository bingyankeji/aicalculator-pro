'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Copy, Share2, Printer, Download, TrendingUp, TrendingDown, Home } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface LongTermProjection {
  year: number;
  propertyValue: number;
  annualRent: number;
  annualExpenses: number;
  annualCashFlow: number;
  cumulativeCashFlow: number;
  equityBuildup: number;
}

interface RentalResult {
  // Purchase Details
  totalPurchaseCost: number;
  downPayment: number;
  loanAmount: number;
  monthlyMortgage: number;
  useLoan: boolean;

  // Year 1 Cash Flow
  monthlyRent: number;
  totalMonthlyExpenses: number;
  monthlyCashFlow: number;
  annualRent: number;
  annualExpenses: number;
  annualCashFlow: number;
  annualROI: number;

  // Investment Metrics
  capRate: number;
  cashOnCashReturn: number;
  grossRentMultiplier: number;
  debtServiceCoverageRatio: number;

  // Long-term Analysis
  holdingYears: number;
  futurePropertyValue: number;
  totalAppreciation: number;
  totalCashFlow: number;
  totalEquityBuildup: number;
  sellCosts: number;
  netProceedsFromSale: number;
  totalReturn: number;
  totalReturnPercentage: number;
  averageAnnualReturn: number;

  // Projections
  projections: LongTermProjection[];

  // Performance Rating
  investmentRating: {
    score: number;
    rating: string;
    color: string;
    recommendations: string[];
  };
}

export default function RentalPropertyCalculator() {
  // Purchase Costs
  const [purchasePrice, setPurchasePrice] = useState('');
  const [useLoan, setUseLoan] = useState(true);
  const [downPaymentPercent, setDownPaymentPercent] = useState('20');
  const [interestRate, setInterestRate] = useState('7');
  const [loanTerm, setLoanTerm] = useState('30');
  const [closingCosts, setClosingCosts] = useState('');
  const [repairCosts, setRepairCosts] = useState('');

  // Monthly Income
  const [monthlyRent, setMonthlyRent] = useState('');
  const [rentGrowthRate, setRentGrowthRate] = useState('3');
  const [otherMonthlyIncome, setOtherMonthlyIncome] = useState('');

  // Monthly Expenses
  const [propertyTax, setPropertyTax] = useState('');
  const [taxGrowthRate, setTaxGrowthRate] = useState('3');
  const [insurance, setInsurance] = useState('');
  const [insuranceGrowthRate, setInsuranceGrowthRate] = useState('3');
  const [hoaFees, setHoaFees] = useState('');
  const [hoaGrowthRate, setHoaGrowthRate] = useState('3');
  const [maintenance, setMaintenance] = useState('');
  const [maintenanceGrowthRate, setMaintenanceGrowthRate] = useState('3');
  const [utilities, setUtilities] = useState('');
  const [propertyManagement, setPropertyManagement] = useState('');
  const [vacancy, setVacancy] = useState('8');

  // Long-term Parameters
  const [appreciationRate, setAppreciationRate] = useState('3');
  const [holdingYears, setHoldingYears] = useState('10');
  const [sellCostPercent, setSellCostPercent] = useState('8');

  const [result, setResult] = useState<RentalResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/rental-property-calculator',
    getShareParams: () => ({
      p: purchasePrice || '',
      r: monthlyRent || '',
      d: downPaymentPercent || '',
      i: interestRate || '',
      h: holdingYears || '',
    }),
    getShareText: () => {
      return result
        ? `Rental Property: $${result.purchasePrice.toLocaleString()} property | ${result.holdingYears}-year return: ${result.totalReturnPercentage.toFixed(1)}% | Annual return: ${result.averageAnnualReturn.toFixed(1)}% | Year 1 cash flow: $${result.annualCashFlow.toLocaleString()}`
        : 'Analyze rental property investment returns with this comprehensive calculator!';
    },
  });

  const calculate = () => {
    const price = parseFloat(purchasePrice) || 0;
    const dpPercent = parseFloat(downPaymentPercent) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseInt(loanTerm) || 0;

    if (price <= 0) {
      alert('Please enter a valid purchase price.');
      return;
    }

    // Calculate purchase costs
    const downPayment = useLoan ? price * (dpPercent / 100) : price;
    const loanAmount = useLoan ? price - downPayment : 0;
    const closing = parseFloat(closingCosts) || 0;
    const repairs = parseFloat(repairCosts) || 0;
    const totalPurchaseCost = price + closing + repairs;
    const totalCashNeeded = downPayment + closing + repairs;

    // Calculate monthly mortgage payment (P&I)
    let monthlyMortgage = 0;
    if (useLoan && loanAmount > 0) {
      const monthlyRate = rate / 100 / 12;
      const numPayments = term * 12;
      monthlyMortgage = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    // Year 1 income and expenses
    const rent = parseFloat(monthlyRent) || 0;
    const otherIncome = parseFloat(otherMonthlyIncome) || 0;
    const totalMonthlyIncome = rent + otherIncome;

    const tax = parseFloat(propertyTax) || 0;
    const insuranceExp = parseFloat(insurance) || 0;
    const hoa = parseFloat(hoaFees) || 0;
    const maintenanceExp = parseFloat(maintenance) || 0;
    const util = parseFloat(utilities) || 0;
    const mgmt = parseFloat(propertyManagement) || 0;
    const vacancyRate = parseFloat(vacancy) || 0;
    const vacancyLoss = rent * (vacancyRate / 100);

    const totalMonthlyExpenses =
      monthlyMortgage + tax + insuranceExp + hoa + maintenanceExp + util + mgmt + vacancyLoss;

    const monthlyCashFlow = totalMonthlyIncome - totalMonthlyExpenses;
    const annualRent = totalMonthlyIncome * 12;
    const annualExpenses = totalMonthlyExpenses * 12;
    const annualCashFlow = monthlyCashFlow * 12;

    // Investment metrics
    const annualNOI = annualRent - (annualExpenses - monthlyMortgage * 12);
    const capRate = price > 0 ? (annualNOI / price) * 100 : 0;
    const cashOnCashReturn = totalCashNeeded > 0 ? (annualCashFlow / totalCashNeeded) * 100 : 0;
    const annualROI = totalCashNeeded > 0 ? (annualCashFlow / totalCashNeeded) * 100 : 0;
    const grossRentMultiplier = annualRent > 0 ? price / annualRent : 0;
    const annualDebtService = monthlyMortgage * 12;
    const debtServiceCoverageRatio = annualDebtService > 0 ? annualNOI / annualDebtService : 0;

    // Long-term analysis
    const years = parseInt(holdingYears) || 10;
    const appRate = parseFloat(appreciationRate) / 100 || 0.03;
    const rentGrowth = parseFloat(rentGrowthRate) / 100 || 0.03;
    const taxGrowth = parseFloat(taxGrowthRate) / 100 || 0.03;
    const insuranceGrowth = parseFloat(insuranceGrowthRate) / 100 || 0.03;
    const hoaGrowth = parseFloat(hoaGrowthRate) / 100 || 0.03;
    const maintenanceGrowth = parseFloat(maintenanceGrowthRate) / 100 || 0.03;
    const sellCost = parseFloat(sellCostPercent) / 100 || 0.08;

    // Calculate year-by-year projections
    const projections: LongTermProjection[] = [];
    let cumulativeCashFlow = 0;
    let remainingLoanBalance = loanAmount;

    for (let year = 1; year <= years; year++) {
      // Property value with appreciation
      const propertyValue = price * Math.pow(1 + appRate, year);

      // Income with growth
      const yearlyRent = annualRent * Math.pow(1 + rentGrowth, year - 1);

      // Expenses with growth (excluding mortgage)
      const yearlyTax = tax * 12 * Math.pow(1 + taxGrowth, year - 1);
      const yearlyInsurance = insuranceExp * 12 * Math.pow(1 + insuranceGrowth, year - 1);
      const yearlyHoa = hoa * 12 * Math.pow(1 + hoaGrowth, year - 1);
      const yearlyMaintenance = maintenanceExp * 12 * Math.pow(1 + maintenanceGrowth, year - 1);
      const yearlyUtil = util * 12;
      const yearlyMgmt = mgmt * 12;
      const yearlyVacancy = (yearlyRent / 12) * (vacancyRate / 100) * 12;

      const yearlyExpenses = annualDebtService + yearlyTax + yearlyInsurance + yearlyHoa + 
                             yearlyMaintenance + yearlyUtil + yearlyMgmt + yearlyVacancy;

      const yearlyCashFlow = yearlyRent - yearlyExpenses;
      cumulativeCashFlow += yearlyCashFlow;

      // Calculate equity buildup (principal paydown)
      if (useLoan && loanAmount > 0) {
        const monthlyRate = rate / 100 / 12;
        for (let month = 1; month <= 12; month++) {
          const interestPayment = remainingLoanBalance * monthlyRate;
          const principalPayment = monthlyMortgage - interestPayment;
          remainingLoanBalance -= principalPayment;
        }
      }
      const equityBuildup = loanAmount - remainingLoanBalance;

      projections.push({
        year,
        propertyValue,
        annualRent: yearlyRent,
        annualExpenses: yearlyExpenses,
        annualCashFlow: yearlyCashFlow,
        cumulativeCashFlow,
        equityBuildup
      });
    }

    // Final year values
    const finalYear = projections[projections.length - 1];
    const futurePropertyValue = finalYear.propertyValue;
    const totalAppreciation = futurePropertyValue - price;
    const totalCashFlow = finalYear.cumulativeCashFlow;
    const totalEquityBuildup = finalYear.equityBuildup;
    const sellCosts = futurePropertyValue * sellCost;
    const netProceedsFromSale = futurePropertyValue - remainingLoanBalance - sellCosts;
    const totalReturn = netProceedsFromSale + totalCashFlow - totalCashNeeded;
    const totalReturnPercentage = totalCashNeeded > 0 ? (totalReturn / totalCashNeeded) * 100 : 0;
    const averageAnnualReturn = totalReturnPercentage / years;

    // Investment rating
    const investmentRating = calculateInvestmentRating(
      monthlyCashFlow,
      capRate,
      cashOnCashReturn,
      debtServiceCoverageRatio,
      vacancyRate,
      averageAnnualReturn
    );

    setResult({
      totalPurchaseCost,
      downPayment: totalCashNeeded,
      loanAmount,
      monthlyMortgage,
      useLoan,
      monthlyRent: totalMonthlyIncome,
      totalMonthlyExpenses,
      monthlyCashFlow,
      annualRent,
      annualExpenses,
      annualCashFlow,
      annualROI,
      capRate,
      cashOnCashReturn,
      grossRentMultiplier,
      debtServiceCoverageRatio,
      holdingYears: years,
      futurePropertyValue,
      totalAppreciation,
      totalCashFlow,
      totalEquityBuildup,
      sellCosts,
      netProceedsFromSale,
      totalReturn,
      totalReturnPercentage,
      averageAnnualReturn,
      projections,
      investmentRating,
    });
  };

  const calculateInvestmentRating = (
    cashFlow: number,
    cap: number,
    coc: number,
    dscr: number,
    vacancy: number,
    avgAnnualReturn: number
  ): RentalResult['investmentRating'] => {
    let score = 100;
    const recommendations: string[] = [];

    // Cash flow analysis
    if (cashFlow < 0) {
      score -= 40;
      recommendations.push('🚨 Negative cash flow! This property loses money monthly. Increase rent or reduce expenses immediately.');
    } else if (cashFlow < 100) {
      score -= 20;
      recommendations.push('⚠️ Very low cash flow. Consider negotiating better purchase price or finding ways to increase rent.');
    } else if (cashFlow >= 300) {
      recommendations.push('✅ Strong monthly cash flow! This indicates a healthy rental investment.');
    }

    // Cap rate analysis
    if (cap < 4) {
      score -= 20;
      recommendations.push('⚠️ Low cap rate (<4%). Property may be overpriced for the rental income it generates.');
    } else if (cap < 6) {
      score -= 10;
      recommendations.push('💡 Below-average cap rate (4-6%). Consider negotiating a lower purchase price.');
    } else if (cap >= 8 && cap <= 12) {
      recommendations.push('✅ Excellent cap rate (8-12%)! Strong income relative to property value.');
    }

    // Average annual return
    if (avgAnnualReturn < 5) {
      score -= 15;
      recommendations.push('💡 Low average annual return (<5%). May not beat inflation or stock market returns over long term.');
    } else if (avgAnnualReturn >= 10 && avgAnnualReturn <= 20) {
      recommendations.push('✅ Excellent long-term return (10-20% annually)! This outperforms most traditional investments.');
    } else if (avgAnnualReturn > 20) {
      recommendations.push('🌟 Outstanding return (20%+ annually)! Verify all assumptions are realistic.');
    }

    // DSCR
    if (dscr < 1.0 && dscr > 0) {
      score -= 20;
      recommendations.push('🚨 DSCR below 1.0 means income doesn\'t cover debt. Lenders may reject this deal.');
    } else if (dscr >= 1.0 && dscr < 1.25) {
      score -= 10;
      recommendations.push('⚠️ DSCR below 1.25. Property barely covers debt obligations. Very tight margins.');
    } else if (dscr >= 1.5) {
      recommendations.push('✅ Strong DSCR (1.5+)! Income comfortably covers mortgage payments.');
    }

    score = Math.max(0, Math.min(100, score));

    let rating: string;
    let color: string;
    if (score >= 80) {
      rating = 'Excellent Investment';
      color = 'green';
    } else if (score >= 60) {
      rating = 'Good Investment';
      color = 'blue';
    } else if (score >= 40) {
      rating = 'Fair Investment';
      color = 'yellow';
    } else {
      rating = 'Poor Investment';
      color = 'red';
    }

    if (recommendations.length === 0 && score >= 80) {
      recommendations.push('✅ This property shows strong investment fundamentals across all key metrics!');
    }

    return { score, rating, color, recommendations };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Save as Image
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
      link.download = `rental-property-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  // Print Results
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
              <title>Rental Property Calculator Results</title>
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Left: Input Area (1 column) */}
        <div className="xl:col-span-1">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl">Property Details</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Enter investment property information</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Purchase Costs */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm">🏠 Purchase Costs</h3>
                <div>
                  <Label htmlFor="purchasePrice" className="text-xs">
                    Purchase Price <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="purchasePrice"
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="e.g., 300000"
                    min="0"
                    step="1000"
                  />
                </div>
                
                {/* Use Loan Toggle */}
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                  <Label className="text-xs font-semibold">Use Loan?</Label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={useLoan}
                        onChange={() => setUseLoan(true)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={!useLoan}
                        onChange={() => setUseLoan(false)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">No (All Cash)</span>
                    </label>
                  </div>
                </div>

                {useLoan && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="downPaymentPercent" className="text-xs">Down Payment %</Label>
                        <input
                          id="downPaymentPercent"
                          type="number"
                          value={downPaymentPercent}
                          onChange={(e) => setDownPaymentPercent(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="20"
                          min="0"
                          max="100"
                          step="1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="interestRate" className="text-xs">Interest Rate %</Label>
                        <input
                          id="interestRate"
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="7"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="loanTerm" className="text-xs">Loan Term (years)</Label>
                      <input
                        id="loanTerm"
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="30"
                        min="1"
                        max="40"
                      />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="closingCosts" className="text-xs">Closing Costs</Label>
                    <input
                      id="closingCosts"
                      type="number"
                      value={closingCosts}
                      onChange={(e) => setClosingCosts(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="9000"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="repairCosts" className="text-xs">Repair Costs</Label>
                    <input
                      id="repairCosts"
                      type="number"
                      value={repairCosts}
                      onChange={(e) => setRepairCosts(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="5000"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Monthly Income */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-gray-900 text-sm">💰 Monthly Income</h3>
                <div>
                  <Label htmlFor="monthlyRent" className="text-xs">
                    Monthly Rent <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="monthlyRent"
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="e.g., 2000"
                    min="0"
                    step="50"
                  />
                </div>
                <div>
                  <Label htmlFor="rentGrowthRate" className="text-xs">Rent Annual Increase %</Label>
                  <input
                    id="rentGrowthRate"
                    type="number"
                    value={rentGrowthRate}
                    onChange={(e) => setRentGrowthRate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="3"
                    min="0"
                    max="20"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical: 2-4% per year</p>
                </div>
                <div>
                  <Label htmlFor="otherMonthlyIncome" className="text-xs">Other Income</Label>
                  <input
                    id="otherMonthlyIncome"
                    type="number"
                    value={otherMonthlyIncome}
                    onChange={(e) => setOtherMonthlyIncome(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              {/* Monthly Expenses */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-gray-900 text-sm">💸 Monthly Expenses</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <Label htmlFor="propertyTax" className="text-xs">Property Tax</Label>
                    <input
                      id="propertyTax"
                      type="number"
                      value={propertyTax}
                      onChange={(e) => setPropertyTax(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="300"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxGrowthRate" className="text-xs">Increase %</Label>
                    <input
                      id="taxGrowthRate"
                      type="number"
                      value={taxGrowthRate}
                      onChange={(e) => setTaxGrowthRate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="3"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <Label htmlFor="insurance" className="text-xs">Insurance</Label>
                    <input
                      id="insurance"
                      type="number"
                      value={insurance}
                      onChange={(e) => setInsurance(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="150"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insuranceGrowthRate" className="text-xs">Increase %</Label>
                    <input
                      id="insuranceGrowthRate"
                      type="number"
                      value={insuranceGrowthRate}
                      onChange={(e) => setInsuranceGrowthRate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="3"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <Label htmlFor="hoaFees" className="text-xs">HOA Fees</Label>
                    <input
                      id="hoaFees"
                      type="number"
                      value={hoaFees}
                      onChange={(e) => setHoaFees(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hoaGrowthRate" className="text-xs">Increase %</Label>
                    <input
                      id="hoaGrowthRate"
                      type="number"
                      value={hoaGrowthRate}
                      onChange={(e) => setHoaGrowthRate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="3"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <Label htmlFor="maintenance" className="text-xs">Maintenance</Label>
                    <input
                      id="maintenance"
                      type="number"
                      value={maintenance}
                      onChange={(e) => setMaintenance(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="100"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maintenanceGrowthRate" className="text-xs">Increase %</Label>
                    <input
                      id="maintenanceGrowthRate"
                      type="number"
                      value={maintenanceGrowthRate}
                      onChange={(e) => setMaintenanceGrowthRate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="3"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="utilities" className="text-xs">Utilities</Label>
                    <input
                      id="utilities"
                      type="number"
                      value={utilities}
                      onChange={(e) => setUtilities(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyManagement" className="text-xs">Property Mgmt</Label>
                    <input
                      id="propertyManagement"
                      type="number"
                      value={propertyManagement}
                      onChange={(e) => setPropertyManagement(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="vacancy" className="text-xs">Vacancy Rate %</Label>
                  <input
                    id="vacancy"
                    type="number"
                    value={vacancy}
                    onChange={(e) => setVacancy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="8"
                    min="0"
                    max="100"
                    step="1"
                  />
                </div>
              </div>

              {/* Long-term Parameters */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-gray-900 text-sm">📊 Long-term Analysis</h3>
                <div>
                  <Label htmlFor="appreciationRate" className="text-xs">Property Appreciation %/year</Label>
                  <input
                    id="appreciationRate"
                    type="number"
                    value={appreciationRate}
                    onChange={(e) => setAppreciationRate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="3"
                    min="0"
                    max="20"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical: 3-5% per year</p>
                </div>
                <div>
                  <Label htmlFor="holdingYears" className="text-xs">Holding Period (years)</Label>
                  <select
                    id="holdingYears"
                    value={holdingYears}
                    onChange={(e) => setHoldingYears(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="5">5 years</option>
                    <option value="10">10 years</option>
                    <option value="15">15 years</option>
                    <option value="20">20 years</option>
                    <option value="30">30 years</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="sellCostPercent" className="text-xs">Cost to Sell %</Label>
                  <input
                    id="sellCostPercent"
                    type="number"
                    value={sellCostPercent}
                    onChange={(e) => setSellCostPercent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="8"
                    min="0"
                    max="20"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Agent fees, closing costs (typical: 6-8%)</p>
                </div>
              </div>

              <Button
                onClick={calculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px]"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Analyze Investment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right: Results Area (2 columns) */}
        <div className="xl:col-span-2" ref={resultRef}>
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl">Investment Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {result ? (
                <div className="space-y-4">
                  {/* Investment Rating */}
                  <div className={`rounded-lg border-2 p-4 ${
                    result.investmentRating.color === 'green' ? 'bg-green-50 border-green-400' :
                    result.investmentRating.color === 'blue' ? 'bg-blue-50 border-blue-400' :
                    result.investmentRating.color === 'yellow' ? 'bg-yellow-50 border-yellow-400' :
                    'bg-red-50 border-red-400'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Investment Score:</p>
                      <span className="text-2xl font-bold">{result.investmentRating.score}/100</span>
                    </div>
                    <p className={`text-xl font-bold ${
                      result.investmentRating.color === 'green' ? 'text-green-700' :
                      result.investmentRating.color === 'blue' ? 'text-blue-700' :
                      result.investmentRating.color === 'yellow' ? 'text-yellow-700' :
                      'text-red-700'
                    }`}>
                      {result.investmentRating.rating}
                    </p>
                  </div>

                  {/* Long-term Returns Summary - MOST IMPORTANT */}
                  <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-lg border-2 border-purple-400 p-5">
                    <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-purple-700" />
                      {result.holdingYears}-Year Total Return
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white/80 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Total Profit:</p>
                        <p className="font-mono text-2xl font-bold text-green-700">
                          ${result.totalReturn.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {result.totalReturnPercentage.toFixed(1)}% total return
                        </p>
                      </div>
                      <div className="bg-white/80 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Average Annual Return:</p>
                        <p className="font-mono text-2xl font-bold text-purple-700">
                          {result.averageAnnualReturn.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Per year over {result.holdingYears} years
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-white/60 rounded p-2">
                        <p className="text-gray-600">Cash Flow:</p>
                        <p className="font-bold text-green-700">${result.totalCashFlow.toLocaleString(undefined, {minimumFractionDigits: 0})}</p>
                      </div>
                      <div className="bg-white/60 rounded p-2">
                        <p className="text-gray-600">Appreciation:</p>
                        <p className="font-bold text-blue-700">${result.totalAppreciation.toLocaleString(undefined, {minimumFractionDigits: 0})}</p>
                      </div>
                      <div className="bg-white/60 rounded p-2">
                        <p className="text-gray-600">Equity Buildup:</p>
                        <p className="font-bold text-purple-700">${result.totalEquityBuildup.toLocaleString(undefined, {minimumFractionDigits: 0})}</p>
                      </div>
                    </div>
                  </div>

                  {/* Year 1 Cash Flow */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-xs text-gray-600 mb-1">Year 1 Monthly Cash Flow:</p>
                      <p className={`font-mono text-xl font-bold ${result.monthlyCashFlow >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                        {result.monthlyCashFlow >= 0 ? <TrendingUp className="inline h-5 w-5 mr-1" /> : <TrendingDown className="inline h-5 w-5 mr-1" />}
                        ${Math.abs(result.monthlyCashFlow).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-xs text-gray-600 mb-1">Cap Rate:</p>
                      <p className="font-mono text-xl font-bold text-blue-700">
                        {result.capRate.toFixed(2)}%
                      </p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-xs text-gray-600 mb-1">Cash-on-Cash Return:</p>
                      <p className="font-mono text-xl font-bold text-purple-700">
                        {result.cashOnCashReturn.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  {/* Purchase & Sale Summary */}
                  <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">🏠 Purchase & Sale Analysis</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600 text-xs">Initial Investment:</p>
                        <p className="font-mono font-bold text-gray-900">${result.downPayment.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Purchase Price:</p>
                        <p className="font-mono font-bold text-gray-900">${result.totalPurchaseCost.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Future Value (Yr {result.holdingYears}):</p>
                        <p className="font-mono font-bold text-green-700">${result.futurePropertyValue.toLocaleString(undefined, {minimumFractionDigits: 0})}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Net Sale Proceeds:</p>
                        <p className="font-mono font-bold text-purple-700">${result.netProceedsFromSale.toLocaleString(undefined, {minimumFractionDigits: 0})}</p>
                      </div>
                    </div>
                  </div>

                  {/* Investment Metrics */}
                  <div className="bg-indigo-50 rounded-lg border border-indigo-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">📈 Key Metrics</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">GRM:</p>
                        <p className="font-mono font-bold text-gray-900">{result.grossRentMultiplier.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Lower is better</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">DSCR:</p>
                        <p className="font-mono font-bold text-gray-900">{result.debtServiceCoverageRatio.toFixed(2)}x</p>
                        <p className="text-xs text-gray-500">Need &gt;1.25</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">{result.useLoan ? 'Loan Amount:' : 'Paid Cash:'}</p>
                        <p className="font-mono font-bold text-gray-900">${result.loanAmount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{result.useLoan ? `$${result.monthlyMortgage.toFixed(0)}/mo` : 'No mortgage'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Year-by-Year Projection Table */}
                  <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">📊 Year-by-Year Projection</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 text-left">Year</th>
                            <th className="p-2 text-right">Property Value</th>
                            <th className="p-2 text-right">Annual Rent</th>
                            <th className="p-2 text-right">Cash Flow</th>
                            <th className="p-2 text-right">Cumulative</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.projections.map((proj) => (
                            <tr key={proj.year} className={proj.year % 5 === 0 ? 'bg-blue-50 font-semibold' : ''}>
                              <td className="p-2">{proj.year}</td>
                              <td className="p-2 text-right font-mono">${(proj.propertyValue / 1000).toFixed(0)}K</td>
                              <td className="p-2 text-right font-mono">${(proj.annualRent / 1000).toFixed(1)}K</td>
                              <td className={`p-2 text-right font-mono ${proj.annualCashFlow >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                ${(proj.annualCashFlow / 1000).toFixed(1)}K
                              </td>
                              <td className="p-2 text-right font-mono text-purple-700">
                                ${(proj.cumulativeCashFlow / 1000).toFixed(0)}K
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      ✓ Values shown in thousands (K). Bold rows are 5-year intervals.
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Home className="h-5 w-5 text-blue-600" />
                      Investment Recommendations
                    </h3>
                    <div className="space-y-2">
                      {result.investmentRating.recommendations.map((rec, index) => (
                        <p key={index} className="text-sm text-gray-700 leading-relaxed">
                          {rec}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center text-gray-500">
                    <Calculator className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Enter property details and click Analyze</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reference Card */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardTitle className="text-xl">Understanding Long-term Returns</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">💰 Cash Flow</h3>
              <p className="text-sm text-gray-700 mb-2">
                Monthly/annual rental income minus all expenses (mortgage, taxes, insurance, maintenance, vacancy).
              </p>
              <p className="text-xs text-gray-600">
                Accumulates over time and provides passive income during holding period.
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-purple-200 p-4">
              <h3 className="text-lg font-semibold text-purple-700 mb-3">📈 Appreciation</h3>
              <p className="text-sm text-gray-700 mb-2">
                Property value increase over time. Typical: 3-5% annually, but varies by location and market conditions.
              </p>
              <p className="text-xs text-gray-600">
                Often the largest source of profit in real estate investing.
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-green-200 p-4">
              <h3 className="text-lg font-semibold text-green-700 mb-3">🏦 Equity Buildup</h3>
              <p className="text-sm text-gray-700 mb-2">
                Mortgage principal paid down by tenants over time. Builds your equity even with no appreciation.
              </p>
              <p className="text-xs text-gray-600">
                On a $200K loan at 7%, you pay down ~$50K in 10 years.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
          Print Analysis
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

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Rental Property Calculator"
      />
    </div>
  );
}
