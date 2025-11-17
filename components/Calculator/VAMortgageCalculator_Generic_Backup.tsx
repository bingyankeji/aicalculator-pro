'use client';

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import AmortizationCharts from './AmortizationCharts';
import { AIAffordabilityAnalysis } from './AIAffordabilityAnalysis';

interface MortgageInputs {
  // Basic
  homePrice: number;
  downPayment: number;
  downPaymentType: 'dollar' | 'percent';
  loanTerm: number;
  interestRate: number;
  startMonth: number;
  startYear: number;
  
  // Advanced - Taxes & Costs
  includeTaxesAndCosts: boolean;
  propertyTax: number;
  propertyTaxType: 'dollar' | 'percent';
  homeInsurance: number;
  homeInsuranceType: 'dollar' | 'percent';
  pmiRate: number;
  pmiRateType: 'dollar' | 'percent';
  hoaFees: number;
  hoaFeesType: 'dollar' | 'percent';
  otherCosts: number;
  otherCostsType: 'dollar' | 'percent';
  
  // Advanced - Annual Increases
  propertyTaxIncrease: number;
  homeInsuranceIncrease: number;
  hoaFeeIncrease: number;
  otherCostsIncrease: number;
  
  // Advanced - Extra Payments
  extraMonthly: number;
  extraYearly: number;
  extraOneTime: number;
  extraOneTimeMonth: number;
  
  // Advanced - Biweekly
  showBiweekly: boolean;
  
  loanType: 'conventional' | 'fha' | 'va' | 'usda';
  purpose: 'purchase' | 'refinance';
}

interface CalculationResult {
  monthlyPayment: number;
  principalAndInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  monthlyOther: number;
  
  loanAmount: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  
  totalInterest: number;
  totalPayments: number;
  payoffDate: string;
  payoffMonths: number;
  
  totalTax: number;
  totalInsurance: number;
  totalPMI: number;
  totalHOA: number;
  totalOther: number;
  totalOutOfPocket: number;
  
  // With extra payments
  withExtraPayments?: {
    payoffMonths: number;
    totalInterest: number;
    interestSaved: number;
    monthsSaved: number;
    payoffDate: string;
  };
  
  // Biweekly
  biweekly?: {
    payment: number;
    totalInterest: number;
    payoffMonths: number;
    interestSaved: number;
  };
}

interface SavedScenario {
  id: string;
  name: string;
  inputs: MortgageInputs;
  result: CalculationResult;
  savedAt: Date;
}

export function MortgageCalculatorV2() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  const [inputs, setInputs] = useState<MortgageInputs>({
    homePrice: 350000,
    downPayment: 20,
    downPaymentType: 'percent',
    loanTerm: 30,
    interestRate: 6.5,
    startMonth: currentMonth,
    startYear: currentYear,
    
    includeTaxesAndCosts: true,
    propertyTax: 1.25,
    propertyTaxType: 'percent',
    homeInsurance: 1200,
    homeInsuranceType: 'dollar',
    pmiRate: 0.5,
    pmiRateType: 'percent',
    hoaFees: 250,
    hoaFeesType: 'dollar',
    otherCosts: 0,
    otherCostsType: 'dollar',
    
    propertyTaxIncrease: 0,
    homeInsuranceIncrease: 0,
    hoaFeeIncrease: 0,
    otherCostsIncrease: 0,
    
    extraMonthly: 0,
    extraYearly: 0,
    extraOneTime: 0,
    extraOneTimeMonth: 12,
    
    showBiweekly: false,
    
    loanType: 'conventional',
    purpose: 'purchase',
  });
  
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [calculatedResult, setCalculatedResult] = useState<CalculationResult | null>(null);
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [viewingScenario, setViewingScenario] = useState<SavedScenario | null>(null);
  
  // Share functionality
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Ref for export
  const resultRef = useRef<HTMLDivElement>(null);

  // Load data from URL parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const hp = params.get('hp'); // home price
    const dp = params.get('dp'); // down payment
    const dt = params.get('dt'); // down payment type
    const lt = params.get('lt'); // loan term
    const ir = params.get('ir'); // interest rate

    if (hp || dp || lt || ir) {
      const newInputs: MortgageInputs = {
        ...inputs,
        homePrice: hp ? parseFloat(hp) : inputs.homePrice,
        downPayment: dp ? parseFloat(dp) : inputs.downPayment,
        downPaymentType: dt === 'd' ? 'dollar' : 'percent',
        loanTerm: lt ? parseInt(lt) : inputs.loanTerm,
        interestRate: ir ? parseFloat(ir) : inputs.interestRate,
      };
      setInputs(newInputs);
      
      // Auto-calculate after a short delay
      setTimeout(() => {
        handleCalculateWithInputs(newInputs);
      }, 100);
    }
  }, []);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Export functions
  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      // Add a small delay to ensure all styles are loaded
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        windowWidth: resultRef.current.scrollWidth,
        windowHeight: resultRef.current.scrollHeight,
      });
      
      const link = document.createElement('a');
      link.download = `mortgage-calculation-${new Date().toISOString().split('T')[0]}.png`;
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
      // Generate image first (same as save function)
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        windowWidth: resultRef.current.scrollWidth,
        windowHeight: resultRef.current.scrollHeight,
      });
      
      // Convert to image URL
      const imageUrl = canvas.toDataURL('image/png', 1.0);
      
      // Create print window with image
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Mortgage Calculation Report</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: flex-start;
                  min-height: 100vh;
                  background: #ffffff;
                }
                img {
                  max-width: 100%;
                  height: auto;
                  display: block;
                  margin: 0 auto;
                }
                @media print {
                  body {
                    margin: 0;
                    padding: 0;
                  }
                  img {
                    max-width: 100%;
                    page-break-inside: avoid;
                  }
                }
              </style>
            </head>
            <body>
              <img src="${imageUrl}" alt="Mortgage Calculation Report" />
            </body>
          </html>
        `);
        printWindow.document.close();
        
        // Wait for image to load before printing
        const img = printWindow.document.querySelector('img');
        if (img) {
          img.onload = () => {
            setTimeout(() => {
              printWindow.print();
            }, 250);
          };
        }
      }
    } catch (error) {
      console.error('Error printing:', error);
      alert('Failed to print. Please try again.');
    }
  };

  // Share functions
  const handleShare = () => {
    if (typeof window === 'undefined') return;
    
    // Get base URL (use environment variable if available, otherwise use current origin)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    
    // Build URL with parameters (shortened)
    const params = new URLSearchParams({
      hp: inputs.homePrice.toString(), // home price
      dp: inputs.downPayment.toString(), // down payment
      dt: inputs.downPaymentType === 'dollar' ? 'd' : 'p', // down payment type
      lt: inputs.loanTerm.toString(), // loan term
      ir: inputs.interestRate.toString(), // interest rate
    });
    
    const url = `${baseUrl}/mortgage-calculator?${params.toString()}`;
    setShareUrl(url);
    setShowShareModal(true);
    setCopySuccess(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy link. Please copy manually.');
    }
  };

  const handleSocialShare = (platform: 'facebook' | 'twitter' | 'whatsapp' | 'email') => {
    const text = `Check out my mortgage calculation: $${calculatedResult?.monthlyPayment.toFixed(0)}/month`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent('My Mortgage Calculation')}&body=${encodedText}%20${encodedUrl}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  // 计算函数
  const calculate = (customInputs?: MortgageInputs): CalculationResult => {
    const currentInputs = customInputs || inputs;
    // Calculate down payment
    const downPaymentAmount = currentInputs.downPaymentType === 'dollar' 
      ? currentInputs.downPayment 
      : (currentInputs.homePrice * currentInputs.downPayment / 100);
    
    const downPaymentPercent = (downPaymentAmount / currentInputs.homePrice) * 100;
    const loanAmount = currentInputs.homePrice - downPaymentAmount;
    
    // Calculate monthly P&I
    const monthlyRate = currentInputs.interestRate / 100 / 12;
    const numberOfPayments = currentInputs.loanTerm * 12;
    const principalAndInterest = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    // Calculate other monthly costs
    let monthlyTax = 0;
    let monthlyInsurance = 0;
    let monthlyPMI = 0;
    let monthlyHOA = 0;
    let monthlyOther = 0;
    
    if (currentInputs.includeTaxesAndCosts) {
      // Property Tax
      if (currentInputs.propertyTaxType === 'percent') {
        monthlyTax = (currentInputs.homePrice * currentInputs.propertyTax / 100) / 12;
      } else {
        monthlyTax = currentInputs.propertyTax / 12;
      }
      
      // Home Insurance
      if (currentInputs.homeInsuranceType === 'percent') {
        monthlyInsurance = (currentInputs.homePrice * currentInputs.homeInsurance / 100) / 12;
      } else {
      monthlyInsurance = currentInputs.homeInsurance / 12;
      }
      
      // PMI
      if (downPaymentPercent < 20 && currentInputs.loanType !== 'va') {
        if (currentInputs.pmiRateType === 'percent') {
          monthlyPMI = (loanAmount * currentInputs.pmiRate / 100) / 12;
        } else {
          monthlyPMI = currentInputs.pmiRate / 12;
        }
      } else {
        monthlyPMI = 0;
      }
      
      // HOA Fee
      if (currentInputs.hoaFeesType === 'percent') {
        monthlyHOA = (currentInputs.homePrice * currentInputs.hoaFees / 100) / 12;
      } else {
      monthlyHOA = currentInputs.hoaFees;
      }
      
      // Other Costs
      if (currentInputs.otherCostsType === 'percent') {
        monthlyOther = (currentInputs.homePrice * currentInputs.otherCosts / 100) / 12;
      } else {
      monthlyOther = currentInputs.otherCosts / 12;
      }
    }
    
    const monthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance + 
                          monthlyPMI + monthlyHOA + monthlyOther;
    
    // Calculate totals (without extra payments first)
    const totalInterest = principalAndInterest * numberOfPayments - loanAmount;
    const totalTax = monthlyTax * numberOfPayments;
    const totalInsurance = monthlyInsurance * numberOfPayments;
    const totalPMI = monthlyPMI * numberOfPayments;
    const totalHOA = monthlyHOA * numberOfPayments;
    const totalOther = monthlyOther * numberOfPayments;
    const totalPayments = monthlyPayment * numberOfPayments;
    const totalOutOfPocket = currentInputs.homePrice + totalInterest + totalTax + 
                            totalInsurance + totalPMI + totalHOA + totalOther;
    
    // Payoff date
    const payoffDate = new Date(currentInputs.startYear, currentInputs.startMonth + numberOfPayments);
    const payoffDateString = `${months[payoffDate.getMonth()]}, ${payoffDate.getFullYear()}`;
    
    const result: CalculationResult = {
      monthlyPayment,
      principalAndInterest,
      monthlyTax,
      monthlyInsurance,
      monthlyPMI,
      monthlyHOA,
      monthlyOther,
      
      loanAmount,
      downPaymentAmount,
      downPaymentPercent,
      
      totalInterest,
      totalPayments: numberOfPayments,
      payoffDate: payoffDateString,
      payoffMonths: numberOfPayments,
      
      totalTax,
      totalInsurance,
      totalPMI,
      totalHOA,
      totalOther,
      totalOutOfPocket,
    };
    
    // Calculate with extra payments if any
    const hasExtraPayments = currentInputs.extraMonthly > 0 || currentInputs.extraYearly > 0 || currentInputs.extraOneTime > 0;
    if (hasExtraPayments) {
      result.withExtraPayments = calculateWithExtraPayments();
    }
    
    // Calculate biweekly if enabled
    if (currentInputs.showBiweekly) {
      result.biweekly = calculateBiweekly(principalAndInterest);
    }
    
    return result;
  };
  
  const calculateWithExtraPayments = () => {
    let balance = inputs.homePrice - (inputs.downPaymentType === 'dollar' ? inputs.downPayment : inputs.homePrice * inputs.downPayment / 100);
    const monthlyRate = inputs.interestRate / 100 / 12;
    const basePrincipalAndInterest = balance * 
      (monthlyRate * Math.pow(1 + monthlyRate, inputs.loanTerm * 12)) /
      (Math.pow(1 + monthlyRate, inputs.loanTerm * 12) - 1);
    
    let month = 0;
    let totalInterest = 0;
    
    while (balance > 0 && month < inputs.loanTerm * 12) {
      month++;
      const interest = balance * monthlyRate;
      let principal = basePrincipalAndInterest - interest;
      
      // Add extra payments
      principal += inputs.extraMonthly;
      if (month % 12 === 0) principal += inputs.extraYearly;
      if (month === inputs.extraOneTimeMonth) principal += inputs.extraOneTime;
      
      if (principal > balance) principal = balance;
      
      balance -= principal;
      totalInterest += interest;
    }
    
    const normalMonths = inputs.loanTerm * 12;
    const normalInterest = basePrincipalAndInterest * normalMonths - (inputs.homePrice - (inputs.downPaymentType === 'dollar' ? inputs.downPayment : inputs.homePrice * inputs.downPayment / 100));
    
    const payoffDate = new Date(inputs.startYear, inputs.startMonth + month);
    
    return {
      payoffMonths: month,
      totalInterest,
      interestSaved: normalInterest - totalInterest,
      monthsSaved: normalMonths - month,
      payoffDate: `${months[payoffDate.getMonth()]}, ${payoffDate.getFullYear()}`,
    };
  };
  
  const calculateBiweekly = (principalAndInterest: number) => {
    const biweeklyPayment = principalAndInterest / 2;
    const loanAmount = inputs.homePrice - (inputs.downPaymentType === 'dollar' ? inputs.downPayment : inputs.homePrice * inputs.downPayment / 100);
    const biweeklyRate = inputs.interestRate / 100 / 26;
    
    let balance = loanAmount;
    let periods = 0;
    let totalInterest = 0;
    
    while (balance > 0 && periods < inputs.loanTerm * 26) {
      periods++;
      const interest = balance * biweeklyRate;
      let principal = biweeklyPayment - interest;
      
      if (principal > balance) principal = balance;
      
      balance -= principal;
      totalInterest += interest;
    }
    
    const normalInterest = principalAndInterest * inputs.loanTerm * 12 - loanAmount;
    
    return {
      payment: biweeklyPayment,
      totalInterest,
      payoffMonths: Math.ceil(periods / 2.167),
      interestSaved: normalInterest - totalInterest,
    };
  };

  const handleCalculate = () => {
    const result = calculate();
    setCalculatedResult(result);
  };
  
  const handleCalculateWithInputs = (customInputs: MortgageInputs) => {
    const result = calculate(customInputs);
    setCalculatedResult(result);
  };
  
  const handleSaveScenario = () => {
    if (!calculatedResult) return;
    
    const name = prompt('Enter a name for this scenario:');
    if (!name) return;
    
    const scenario: SavedScenario = {
      id: Date.now().toString(),
      name,
      inputs: { ...inputs },
      result: calculatedResult,
      savedAt: new Date(),
    };
    
    setSavedScenarios([...savedScenarios, scenario]);
  };
  
  const toggleScenarioSelection = (id: string) => {
    if (selectedScenarios.includes(id)) {
      setSelectedScenarios(selectedScenarios.filter(s => s !== id));
    } else {
      if (selectedScenarios.length < 2) {
        setSelectedScenarios([...selectedScenarios, id]);
      } else {
        // Replace the first selected with the new one
        setSelectedScenarios([selectedScenarios[1], id]);
      }
    }
  };
  
  const handleCompare = () => {
    if (selectedScenarios.length === 2) {
      setShowComparison(true);
      setViewingScenario(null);
    }
  };
  
  const handleViewScenario = (scenario: SavedScenario) => {
    setViewingScenario(scenario);
    setShowComparison(false);
  };
  
  const handleDeleteScenario = (id: string) => {
    setSavedScenarios(savedScenarios.filter(s => s.id !== id));
    setSelectedScenarios(selectedScenarios.filter(s => s !== id));
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  const formatCurrencyWhole = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 hidden lg:block">Mortgage Calculator</h2>
            
             {/* Tooltip Component */}
             {(() => {
               const Tooltip = ({ text }: { text: string }) => (
                 <div className="group relative inline-block ml-1">
                   <span className="cursor-help text-gray-400 hover:text-gray-600 text-xs border border-gray-300 rounded-full w-4 h-4 inline-flex items-center justify-center">
                     ?
                   </span>
                   <div className="invisible group-hover:visible absolute z-50 w-64 p-2 mt-1 text-xs text-white bg-gray-800 rounded shadow-lg -left-24 top-5">
                     {text}
                     <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-24"></div>
                   </div>
                 </div>
               );
               
               return null;
             })()}

             {/* Basic Inputs - Responsive Layout */}
             <div className="space-y-3 sm:space-y-2.5">
               {/* Home Price */}
               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                 <label className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                   Home Price
                   <div className="group relative inline-block ml-1">
                     <span className="cursor-help text-gray-400 hover:text-gray-600 text-xs border border-gray-300 rounded-full w-4 h-4 inline-flex items-center justify-center">?</span>
                     <div className="invisible group-hover:visible absolute z-50 w-64 p-2 mt-1 text-xs text-white bg-gray-800 rounded shadow-lg -left-24 top-5">
                       The total purchase price of the home you want to buy.
                       <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-24"></div>
                     </div>
                   </div>
                 </label>
                 <div className="relative flex-1">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                   <input
                     type="number"
                     value={inputs.homePrice}
                     onChange={(e) => setInputs({ ...inputs, homePrice: Number(e.target.value) })}
                     className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                   />
                 </div>
               </div>

               {/* Down Payment */}
               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                 <label className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                   Down Payment
                   <div className="group relative inline-block ml-1">
                     <span className="cursor-help text-gray-400 hover:text-gray-600 text-xs border border-gray-300 rounded-full w-4 h-4 inline-flex items-center justify-center">?</span>
                     <div className="invisible group-hover:visible absolute z-50 w-64 p-2 mt-1 text-xs text-white bg-gray-800 rounded shadow-lg -left-24 top-5">
                       The upfront payment of the purchase, usually a percentage of the total price. Typically, lenders want 20% or more. Less than 20% usually requires PMI.
                       <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-24"></div>
                     </div>
                   </div>
                 </label>
                 <div className="flex gap-2 flex-1">
                   <div className="relative flex-1">
                     {inputs.downPaymentType === 'dollar' && (
                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                     )}
                     <input
                       type="number"
                       value={inputs.downPayment}
                       onChange={(e) => setInputs({ ...inputs, downPayment: Number(e.target.value) })}
                       className={`w-full ${inputs.downPaymentType === 'dollar' ? 'pl-7' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500`}
                     />
                     {inputs.downPaymentType === 'percent' && (
                       <span className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                     )}
                   </div>
                   <select
                     value={inputs.downPaymentType}
                     onChange={(e) => setInputs({ ...inputs, downPaymentType: e.target.value as 'dollar' | 'percent' })}
                     className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                   >
                     <option value="dollar">$</option>
                     <option value="percent">%</option>
                   </select>
                 </div>
               </div>

               {/* Loan Term */}
               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                 <label className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                   Loan Term
                   <div className="group relative inline-block ml-1">
                     <span className="cursor-help text-gray-400 hover:text-gray-600 text-xs border border-gray-300 rounded-full w-4 h-4 inline-flex items-center justify-center">?</span>
                     <div className="invisible group-hover:visible absolute z-50 w-64 p-2 mt-1 text-xs text-white bg-gray-800 rounded shadow-lg -left-24 top-5">
                       The amount of time over which the loan must be repaid in full. Most common terms are 15 or 30 years. Shorter terms have lower interest rates but higher monthly payments.
                       <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-24"></div>
                     </div>
                   </div>
                 </label>
                 <div className="flex gap-2 items-center flex-1">
                   <input
                     type="number"
                     value={inputs.loanTerm}
                     onChange={(e) => setInputs({ ...inputs, loanTerm: Number(e.target.value) })}
                     className="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                   />
                   <span className="text-sm text-gray-600">years</span>
                 </div>
               </div>

               {/* Interest Rate */}
               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                 <label className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                   Interest Rate
                   <div className="group relative inline-block ml-1">
                     <span className="cursor-help text-gray-400 hover:text-gray-600 text-xs border border-gray-300 rounded-full w-4 h-4 inline-flex items-center justify-center">?</span>
                     <div className="invisible group-hover:visible absolute z-50 w-64 p-2 mt-1 text-xs text-white bg-gray-800 rounded shadow-lg -left-24 top-5">
                       The percentage of the loan charged as a cost of borrowing, expressed as Annual Percentage Rate (APR). Lower rates mean lower monthly payments and less interest paid over time.
                       <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-24"></div>
                     </div>
                   </div>
                 </label>
                 <div className="relative flex-1">
                   <input
                     type="number"
                     step="0.001"
                     value={inputs.interestRate}
                     onChange={(e) => setInputs({ ...inputs, interestRate: Number(e.target.value) })}
                     className="w-full px-3 pr-9 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

             {/* Start Date */}
               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                 <label className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                   Start Date
                   <div className="group relative inline-block ml-1">
                     <span className="cursor-help text-gray-400 hover:text-gray-600 text-xs border border-gray-300 rounded-full w-4 h-4 inline-flex items-center justify-center">?</span>
                     <div className="invisible group-hover:visible absolute z-50 w-64 p-2 mt-1 text-xs text-white bg-gray-800 rounded shadow-lg -left-24 top-5">
                       The month and year when the loan payments will begin. This affects the payoff date calculation.
                       <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-24"></div>
                     </div>
                   </div>
                 </label>
                 <div className="grid grid-cols-2 gap-2 flex-1">
                   <select
                     value={inputs.startMonth}
                     onChange={(e) => setInputs({ ...inputs, startMonth: Number(e.target.value) })}
                     className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                   >
                     {months.map((month, index) => (
                       <option key={index} value={index}>{month}</option>
                     ))}
                   </select>
                   <input
                     type="number"
                     value={inputs.startYear}
                     onChange={(e) => setInputs({ ...inputs, startYear: Number(e.target.value) })}
                     className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                   />
                 </div>
               </div>
             </div>

             {/* Include Taxes & Costs - Always Visible */}
             <div className="mt-4 pt-4 border-t border-gray-200">
               <div className="mb-3">
                 <label className="flex items-center gap-2">
                   <input
                     type="checkbox"
                     checked={inputs.includeTaxesAndCosts}
                     onChange={(e) => setInputs({ ...inputs, includeTaxesAndCosts: e.target.checked })}
                     className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-xs font-medium text-gray-900">Include Taxes & Costs Below</span>
                </label>
              </div>

                 {inputs.includeTaxesAndCosts && (
                   <div className="space-y-2.5">
                     <div className="text-sm font-semibold text-gray-900 mb-2">Annual Tax & Cost</div>
                     
                     {/* Property Taxes */}
                     <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                       <label className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                         Property Taxes
                         <div className="group relative inline-block ml-1">
                           <span className="cursor-help text-gray-400 hover:text-gray-600 text-xs border border-gray-300 rounded-full w-4 h-4 inline-flex items-center justify-center">?</span>
                           <div className="invisible group-hover:visible absolute z-50 w-64 p-2 mt-1 text-xs text-white bg-gray-800 rounded shadow-lg -left-24 top-5">
                             A tax that property owners pay to governing authorities. On average, Americans pay about 1.1% of their property's value as property tax each year. Varies by location.
                             <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-24"></div>
                           </div>
                         </div>
                       </label>
                       <div className="flex gap-2 flex-1">
                         <input
                           type="number"
                           step="0.1"
                           value={inputs.propertyTax}
                           onChange={(e) => setInputs({ ...inputs, propertyTax: Number(e.target.value) })}
                           className="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                         />
                         <select
                           value={inputs.propertyTaxType}
                           onChange={(e) => setInputs({ ...inputs, propertyTaxType: e.target.value as 'dollar' | 'percent' })}
                           className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                         >
                           <option value="percent">%</option>
                           <option value="dollar">$</option>
                         </select>
                       </div>
                     </div>

                     {/* Home Insurance */}
                     <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                       <label className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                         Home Insurance
                         <div className="group relative inline-block ml-1">
                           <span className="cursor-help text-gray-400 hover:text-gray-600 text-xs border border-gray-300 rounded-full w-4 h-4 inline-flex items-center justify-center">?</span>
                           <div className="invisible group-hover:visible absolute z-50 w-64 p-2 mt-1 text-xs text-white bg-gray-800 rounded shadow-lg -left-24 top-5">
                             Insurance policy that protects the owner from accidents that may happen to their property. Cost varies by location, condition, and coverage amount.
                             <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-24"></div>
                           </div>
                         </div>
                       </label>
                       <div className="flex gap-2 flex-1">
                         <input
                           type="number"
                           step="0.1"
                           value={inputs.homeInsurance}
                           onChange={(e) => setInputs({ ...inputs, homeInsurance: Number(e.target.value) })}
                           className="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                         />
                         <select
                           value={inputs.homeInsuranceType}
                           onChange={(e) => setInputs({ ...inputs, homeInsuranceType: e.target.value as 'dollar' | 'percent' })}
                           className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                         >
                           <option value="dollar">$</option>
                           <option value="percent">%</option>
                         </select>
                       </div>
                     </div>

                     {/* PMI Insurance */}
                     <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                       <label className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                         PMI Insurance
                         <div className="group relative inline-block ml-1">
                           <span className="cursor-help text-gray-400 hover:text-gray-600 text-xs border border-gray-300 rounded-full w-4 h-4 inline-flex items-center justify-center">?</span>
                           <div className="invisible group-hover:visible absolute z-50 w-64 p-2 mt-1 text-xs text-white bg-gray-800 rounded shadow-lg -left-24 top-5">
                             Private Mortgage Insurance protects the lender if you can't repay. Required if down payment is less than 20%. Annual cost typically ranges from 0.3% to 1.9% of the loan amount.
                             <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-24"></div>
                           </div>
                         </div>
                       </label>
                       <div className="flex gap-2 flex-1">
                         <input
                           type="number"
                           step="0.1"
                           value={inputs.pmiRate}
                           onChange={(e) => setInputs({ ...inputs, pmiRate: Number(e.target.value) })}
                           className="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                           placeholder="0"
                         />
                         <select
                           value={inputs.pmiRateType}
                           onChange={(e) => setInputs({ ...inputs, pmiRateType: e.target.value as 'dollar' | 'percent' })}
                           className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                         >
                           <option value="percent">%</option>
                           <option value="dollar">$</option>
                         </select>
                       </div>
                     </div>

                     {/* HOA Fee */}
                     <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                       <label className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                         HOA Fee
                         <div className="group relative inline-block ml-1">
                           <span className="cursor-help text-gray-400 hover:text-gray-600 text-xs border border-gray-300 rounded-full w-4 h-4 inline-flex items-center justify-center">?</span>
                           <div className="invisible group-hover:visible absolute z-50 w-64 p-2 mt-1 text-xs text-white bg-gray-800 rounded shadow-lg -left-24 top-5">
                             Fee imposed by a Homeowner's Association to maintain and improve the property and environment. Condos, townhomes, and some single-family homes require HOA fees.
                             <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-24"></div>
                           </div>
                         </div>
                       </label>
                       <div className="flex gap-2 flex-1">
                         <input
                           type="number"
                           step="0.1"
                           value={inputs.hoaFees}
                           onChange={(e) => setInputs({ ...inputs, hoaFees: Number(e.target.value) })}
                           className="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                           placeholder="0"
                         />
                         <select
                           value={inputs.hoaFeesType}
                           onChange={(e) => setInputs({ ...inputs, hoaFeesType: e.target.value as 'dollar' | 'percent' })}
                           className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                         >
                           <option value="dollar">$</option>
                           <option value="percent">%</option>
                         </select>
                       </div>
                     </div>

                     {/* Other Costs */}
                     <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                       <label className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
                         Other Costs
                         <div className="group relative inline-block ml-1">
                           <span className="cursor-help text-gray-400 hover:text-gray-600 text-xs border border-gray-300 rounded-full w-4 h-4 inline-flex items-center justify-center">?</span>
                           <div className="invisible group-hover:visible absolute z-50 w-64 p-2 mt-1 text-xs text-white bg-gray-800 rounded shadow-lg -left-24 top-5">
                             Includes utilities, home maintenance costs, and anything pertaining to the general upkeep of the property. Common to spend 1% or more of property value on annual maintenance.
                             <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-24"></div>
                           </div>
                         </div>
                       </label>
                       <div className="flex gap-2 flex-1">
                         <input
                           type="number"
                           step="0.1"
                           value={inputs.otherCosts}
                           onChange={(e) => setInputs({ ...inputs, otherCosts: Number(e.target.value) })}
                           className="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                         />
                         <select
                           value={inputs.otherCostsType}
                           onChange={(e) => setInputs({ ...inputs, otherCostsType: e.target.value as 'dollar' | 'percent' })}
                           className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                         >
                           <option value="dollar">$</option>
                           <option value="percent">%</option>
                         </select>
                       </div>
                     </div>
                   </div>
                 )}
             </div>

             {/* More Options Toggle */}
             <button
               onClick={() => setShowMoreOptions(!showMoreOptions)}
               className="w-full mt-4 py-1.5 text-blue-600 hover:text-blue-700 font-medium text-xs flex items-center justify-center gap-2"
             >
               {showMoreOptions ? '− Fewer Options' : '+ More Options'}
             </button>

             {/* Advanced Options - Only in More Options */}
             {showMoreOptions && (
               <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                 {/* Annual Increases */}
                 {inputs.includeTaxesAndCosts && (
                   <div className="space-y-3">
                     <div className="text-xs font-semibold text-gray-900 mb-2">Annual Tax & Cost Increase</div>
                     
                     <div className="grid grid-cols-2 gap-2">
                       <div>
                         <label className="block text-xs text-gray-700 mb-1">Property Taxes Increase</label>
                         <div className="relative">
                           <input
                             type="number"
                             step="0.1"
                             value={inputs.propertyTaxIncrease}
                             onChange={(e) => setInputs({ ...inputs, propertyTaxIncrease: Number(e.target.value) })}
                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                             placeholder="0"
                           />
                           <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">%</span>
                         </div>
                       </div>

                       <div>
                         <label className="block text-xs text-gray-700 mb-1">Home Insurance Increase</label>
                         <div className="relative">
                           <input
                             type="number"
                             step="0.1"
                             value={inputs.homeInsuranceIncrease}
                             onChange={(e) => setInputs({ ...inputs, homeInsuranceIncrease: Number(e.target.value) })}
                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                             placeholder="0"
                           />
                           <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">%</span>
                         </div>
                       </div>

                       <div>
                         <label className="block text-xs text-gray-700 mb-1">HOA Fee Increase</label>
                         <div className="relative">
                           <input
                             type="number"
                             step="0.1"
                             value={inputs.hoaFeeIncrease}
                             onChange={(e) => setInputs({ ...inputs, hoaFeeIncrease: Number(e.target.value) })}
                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                             placeholder="0"
                           />
                           <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">%</span>
                         </div>
                       </div>

                       <div>
                         <label className="block text-xs text-gray-700 mb-1">Other Costs Increase</label>
                         <div className="relative">
                           <input
                             type="number"
                             step="0.1"
                             value={inputs.otherCostsIncrease}
                             onChange={(e) => setInputs({ ...inputs, otherCostsIncrease: Number(e.target.value) })}
                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                             placeholder="0"
                           />
                           <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">%</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 )}

                 {/* Extra Payments */}
                 <div className="space-y-3">
                   <div className="text-xs font-semibold text-gray-900 mb-2">Extra Payments</div>
                   
                   <div>
                     <label className="block text-xs text-gray-700 mb-1">Extra Monthly Pay</label>
                     <div className="relative">
                       <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                       <input
                         type="number"
                         value={inputs.extraMonthly}
                         onChange={(e) => setInputs({ ...inputs, extraMonthly: Number(e.target.value) })}
                         className="w-full pl-6 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                         placeholder="0"
                       />
                     </div>
                     <div className="flex items-center gap-1 mt-1">
                       <span className="text-xs text-gray-600">from</span>
                       <select
                         value={inputs.startMonth}
                         className="px-1 py-0.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                       >
                         {months.map((month, index) => (
                           <option key={index} value={index}>{month}</option>
                         ))}
                       </select>
                       <input
                         type="number"
                         value={inputs.startYear}
                         className="w-14 px-1 py-0.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                       />
                     </div>
                   </div>

                   <div>
                     <label className="block text-xs text-gray-700 mb-1">Extra Yearly Pay</label>
                     <div className="relative">
                       <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                       <input
                         type="number"
                         value={inputs.extraYearly}
                         onChange={(e) => setInputs({ ...inputs, extraYearly: Number(e.target.value) })}
                         className="w-full pl-6 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                         placeholder="0"
                       />
                     </div>
                     <div className="flex items-center gap-1 mt-1">
                       <span className="text-xs text-gray-600">from</span>
                       <select
                         value={inputs.startMonth}
                         className="px-1 py-0.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                       >
                         {months.map((month, index) => (
                           <option key={index} value={index}>{month}</option>
                         ))}
                       </select>
                       <input
                         type="number"
                         value={inputs.startYear}
                         className="w-14 px-1 py-0.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                       />
                     </div>
                   </div>

                   <div>
                     <label className="block text-xs text-gray-700 mb-1">Extra One-time Pay</label>
                     <div className="relative">
                       <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                       <input
                         type="number"
                         value={inputs.extraOneTime}
                         onChange={(e) => setInputs({ ...inputs, extraOneTime: Number(e.target.value) })}
                         className="w-full pl-6 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                         placeholder="0"
                       />
                     </div>
                     <div className="flex items-center gap-1 mt-1">
                       <span className="text-xs text-gray-600">in</span>
                       <select
                         value={inputs.startMonth}
                         className="px-1 py-0.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                       >
                         {months.map((month, index) => (
                           <option key={index} value={index}>{month}</option>
                         ))}
                       </select>
                       <input
                         type="number"
                         value={inputs.startYear}
                         className="w-14 px-1 py-0.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                       />
                     </div>
                   </div>
                 </div>

                 {/* Biweekly Payments */}
                 <div>
                   <label className="flex items-center gap-2">
                     <input
                       type="checkbox"
                       checked={inputs.showBiweekly}
                       onChange={(e) => setInputs({ ...inputs, showBiweekly: e.target.checked })}
                       className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                     />
                     <span className="text-sm font-medium text-gray-900">Show Biweekly Payback Results</span>
                   </label>
                 </div>
               </div>
             )}

            {/* Calculate Button */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleCalculate}
                className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded text-sm flex items-center justify-center gap-2"
              >
                <span>▶</span>
                Calculate
              </button>
              <button
                onClick={() => setInputs({ ...inputs, homePrice: 400000, downPayment: 80000 })}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded text-sm"
              >
                Clear
              </button>
            </div>

            {/* Save Scenario Button */}
            {calculatedResult && (
              <button
                onClick={handleSaveScenario}
                className="w-full mt-2 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded text-xs"
              >
                💾 Save This Scenario
              </button>
            )}
          </div>
        </div>

         {/* Results */}
         <div className="xl:col-span-2">
           {calculatedResult ? (
             <div className="space-y-4 sm:space-y-6">
               {/* Export & Share Buttons */}
               <div className="flex gap-3 justify-end mb-4 flex-wrap">
                 <button
                   onClick={handleShare}
                   className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md font-medium"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                   </svg>
                   Share
                 </button>
                 <button
                   onClick={handleSaveAsImage}
                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                   Save as Image
                 </button>
                 <button
                   onClick={handlePrint}
                   className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                   </svg>
                   Print
                 </button>
               </div>
               
              {/* Result Content - Wrapped for Export */}
              <div ref={resultRef} className="space-y-4 bg-white p-8 rounded-xl shadow-lg">
                {/* Export Header */}
                <div className="border-b-2 border-gray-200 pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Mortgage Calculation Report</h2>
                  <p className="text-sm text-gray-600">
                    Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                
                {/* Monthly Payment Cards - Clear Distinction */}
                <div className="space-y-4">
                 {/* Mortgage Payment (P&I Only) */}
                 <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-xl p-6 text-white">
                   <div className="flex items-center justify-between">
                     <div>
                       <div className="flex items-center gap-2 mb-2">
                         <span className="text-2xl">🏦</span>
                         <div className="text-lg font-semibold">Mortgage Payment</div>
                       </div>
                       <div className="text-xs opacity-75 mb-3">Principal & Interest Only</div>
                       <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{formatCurrency(calculatedResult.principalAndInterest)}</div>
                     </div>
                     <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                       <div className="text-xs opacity-90">per month</div>
                     </div>
                   </div>
                 </div>

                 {/* Plus Symbol and Breakdown */}
                 {(calculatedResult.monthlyTax > 0 || calculatedResult.monthlyInsurance > 0 || calculatedResult.monthlyOther > 0) && (
                   <div className="flex items-center justify-center">
                     <div className="flex items-center gap-4 text-gray-600 text-sm">
                       <span className="text-lg sm:text-xl md:text-2xl font-bold">+</span>
                       <div className="flex gap-2 flex-wrap">
                         {calculatedResult.monthlyTax > 0 && (
                           <span className="bg-gray-100 px-3 py-1 rounded-full">Tax: {formatCurrency(calculatedResult.monthlyTax)}</span>
                         )}
                         {calculatedResult.monthlyInsurance > 0 && (
                           <span className="bg-gray-100 px-3 py-1 rounded-full">Insurance: {formatCurrency(calculatedResult.monthlyInsurance)}</span>
                         )}
                         {calculatedResult.monthlyPMI > 0 && (
                           <span className="bg-gray-100 px-3 py-1 rounded-full">PMI: {formatCurrency(calculatedResult.monthlyPMI)}</span>
                         )}
                         {calculatedResult.monthlyOther > 0 && (
                           <span className="bg-gray-100 px-3 py-1 rounded-full">Other: {formatCurrency(calculatedResult.monthlyOther)}</span>
                         )}
                       </div>
                     </div>
                   </div>
                 )}

                 {/* Total Monthly Payment (All Costs) */}
                 <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-xl p-6 text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                   <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20"></div>
                   <div className="relative">
                     <div className="flex items-center justify-between">
                       <div>
                         <div className="flex items-center gap-2 mb-2">
                           <span className="text-3xl">💰</span>
                           <div className="text-lg font-semibold">Total Monthly Payment</div>
                         </div>
                         <div className="text-xs opacity-75 mb-2 sm:mb-3">Including All Taxes & Costs</div>
                         <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold break-all">{formatCurrency(calculatedResult.monthlyPayment)}</div>
                       </div>
                       <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                         <div className="text-xs opacity-90">per month</div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Extra Payments Summary */}
               {calculatedResult.withExtraPayments && (
                 <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                   <p className="text-sm text-gray-800">
                     With the extra payment(s), the loan will be paid off in{' '}
                     <strong className="text-blue-700">
                       {Math.floor(calculatedResult.withExtraPayments.payoffMonths / 12)} years and {calculatedResult.withExtraPayments.payoffMonths % 12} months
                     </strong>, 
                     and <strong className="text-blue-700">{formatCurrencyWhole(calculatedResult.withExtraPayments.interestSaved)}</strong> interest will be saved.
                   </p>
                 </div>
               )}

               {/* Receipt-Style Detailed Breakdown */}
               <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                 {/* Table Header */}
                 <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                   <div className="flex justify-between items-center">
                     <div className="text-sm font-semibold text-gray-600">Item</div>
                     <div className="flex gap-20">
                       <div className="text-sm font-semibold text-gray-600 w-24 text-right">First Month</div>
                       <div className="text-sm font-semibold text-gray-600 w-28 text-right">Total</div>
                     </div>
                   </div>
                 </div>

                 {/* Receipt Body */}
                 <div className="px-6 py-4 space-y-3">
                   {/* Mortgage Payment */}
                   <div className="flex justify-between items-center">
                     <div className="text-sm font-medium text-gray-900">Mortgage Payment</div>
                     <div className="flex gap-20">
                       <div className="w-24 text-right text-sm font-medium">{formatCurrency(calculatedResult.principalAndInterest)}</div>
                       <div className="w-28 text-right text-sm font-medium">{formatCurrencyWhole(calculatedResult.principalAndInterest * calculatedResult.totalPayments)}</div>
                     </div>
                   </div>

                   {/* Extra Payment */}
                   {calculatedResult.withExtraPayments && (
                     <div className="flex justify-between items-center">
                       <div className="text-sm font-medium text-gray-900">Extra Payment</div>
                       <div className="flex gap-20">
                         <div className="w-24 text-right text-sm font-medium text-blue-600">
                           {formatCurrency((inputs.extraMonthly || 0) + (inputs.extraYearly ? inputs.extraYearly / 12 : 0))}
                         </div>
                         <div className="w-28 text-right text-sm font-medium text-blue-600">
                           {formatCurrencyWhole(
                             (inputs.extraMonthly * calculatedResult.withExtraPayments.payoffMonths) + 
                             (inputs.extraYearly * Math.floor(calculatedResult.withExtraPayments.payoffMonths / 12)) +
                             (inputs.extraOneTime || 0)
                           )}
                         </div>
                       </div>
                     </div>
                   )}

                   {/* Property Tax */}
                   {calculatedResult.monthlyTax > 0 && (
                     <div className="flex justify-between items-center">
                       <div className="text-sm font-medium text-gray-900">Property Tax</div>
                       <div className="flex gap-20">
                         <div className="w-24 text-right text-sm">{formatCurrency(calculatedResult.monthlyTax)}</div>
                         <div className="w-28 text-right text-sm">{formatCurrencyWhole(calculatedResult.totalTax)}</div>
                       </div>
                     </div>
                   )}

                   {/* Home Insurance */}
                   {calculatedResult.monthlyInsurance > 0 && (
                     <div className="flex justify-between items-center">
                       <div className="text-sm font-medium text-gray-900">Home Insurance</div>
                       <div className="flex gap-20">
                         <div className="w-24 text-right text-sm">{formatCurrency(calculatedResult.monthlyInsurance)}</div>
                         <div className="w-28 text-right text-sm">{formatCurrencyWhole(calculatedResult.totalInsurance)}</div>
                       </div>
                     </div>
                   )}

                   {/* Other Costs */}
                   {calculatedResult.monthlyOther > 0 && (
                     <div className="flex justify-between items-center">
                       <div className="text-sm font-medium text-gray-900">Other Costs</div>
                       <div className="flex gap-20">
                         <div className="w-24 text-right text-sm">{formatCurrency(calculatedResult.monthlyOther)}</div>
                         <div className="w-28 text-right text-sm">{formatCurrencyWhole(calculatedResult.totalOther)}</div>
                       </div>
                     </div>
                   )}

                   {/* Total Line */}
                   <div className="pt-3 mt-3 border-t-2 border-gray-300">
                     <div className="flex justify-between items-center">
                       <div className="text-base font-bold text-gray-900">Total Out-of-Pocket</div>
                       <div className="flex gap-20">
                         <div className="w-24 text-right text-base font-bold text-gray-900">{formatCurrency(calculatedResult.monthlyPayment)}</div>
                         <div className="w-28 text-right text-base font-bold text-gray-900">{formatCurrencyWhole(calculatedResult.totalOutOfPocket)}</div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Summary Information */}
               <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                 <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                   <div className="flex justify-between border-b border-gray-100 pb-2">
                     <span className="text-gray-600">House Price</span>
                     <span className="font-semibold text-gray-900">{formatCurrencyWhole(inputs.homePrice)}</span>
                   </div>
                   <div className="flex justify-between border-b border-gray-100 pb-2">
                     <span className="text-gray-600">Loan Amount</span>
                     <span className="font-semibold text-gray-900">{formatCurrencyWhole(calculatedResult.loanAmount)}</span>
                   </div>
                   <div className="flex justify-between border-b border-gray-100 pb-2">
                     <span className="text-gray-600">Down Payment</span>
                     <span className="font-semibold text-gray-900">{formatCurrencyWhole(calculatedResult.downPaymentAmount)}</span>
                   </div>
                   <div className="flex justify-between border-b border-gray-100 pb-2">
                     <span className="text-gray-600">Total of {calculatedResult.totalPayments} Mortgage Payments</span>
                     <span className="font-semibold text-gray-900">{formatCurrencyWhole(calculatedResult.principalAndInterest * calculatedResult.totalPayments)}</span>
                   </div>
                   <div className="flex justify-between border-b border-gray-100 pb-2">
                     <span className="text-gray-600">Total Interest</span>
                     <span className="font-semibold text-gray-900">{formatCurrencyWhole(calculatedResult.totalInterest)}</span>
                   </div>
                   {calculatedResult.withExtraPayments && (
                     <div className="flex justify-between border-b border-gray-100 pb-2">
                       <span className="text-gray-600">Total Extra Payments</span>
                       <span className="font-semibold text-blue-700">
                         {formatCurrencyWhole(
                           (inputs.extraMonthly * calculatedResult.withExtraPayments.payoffMonths) + 
                           (inputs.extraYearly * Math.floor(calculatedResult.withExtraPayments.payoffMonths / 12)) +
                           (inputs.extraOneTime || 0)
                         )}
                       </span>
                     </div>
                   )}
                   <div className="flex justify-between">
                     <span className="text-gray-600">Mortgage Payoff Date</span>
                     <span className="font-semibold text-gray-900">
                       {calculatedResult.withExtraPayments ? calculatedResult.withExtraPayments.payoffDate : calculatedResult.payoffDate}
                     </span>
                   </div>
                 </div>
               </div>

               {/* Biweekly Payment Comparison */}
               {calculatedResult.biweekly && (
                 <div className="bg-gray-50 rounded-lg border border-gray-300 p-6">
                   <h4 className="text-base font-bold text-gray-900 mb-4">If Payback Biweekly without Extra Payments</h4>
                   
                   <div className="space-y-2 mb-4">
                     <div className="flex justify-between text-sm">
                       <span className="text-gray-700">Biweekly Payment</span>
                       <span className="font-semibold text-gray-900">{formatCurrency(calculatedResult.biweekly.payment)}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-gray-700">Total Interest</span>
                       <span className="font-semibold text-gray-900">{formatCurrencyWhole(calculatedResult.biweekly.totalInterest)}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-gray-700">Payoff Length</span>
                       <span className="font-semibold text-gray-900">
                         {(calculatedResult.biweekly.payoffMonths / 12).toFixed(2)} years
                       </span>
                     </div>
                   </div>

                   <div className="pt-4 border-t border-gray-300">
                     <h5 className="text-sm font-bold text-gray-900 mb-2">Interest to be Saved</h5>
                     {calculatedResult.withExtraPayments && (
                       <div className="flex justify-between text-sm mb-1">
                         <span className="text-gray-700">With the extra payment(s)</span>
                         <span className="font-semibold text-green-600">{formatCurrencyWhole(calculatedResult.withExtraPayments.interestSaved)}</span>
                       </div>
                     )}
                     <div className="flex justify-between text-sm">
                       <span className="text-gray-700">With Biweekly Payment Only</span>
                       <span className="font-semibold text-green-600">{formatCurrencyWhole(calculatedResult.biweekly.interestSaved)}</span>
                     </div>
                     <p className="text-xs text-gray-500 mt-2">(without Extra Payments)</p>
                   </div>
                 </div>
               )}
              </div>
              {/* End of export content wrapper */}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
              <div className="text-5xl mb-4">🏠</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate</div>
             <p className="text-gray-600">Adjust the loan parameters on the left and click the "Calculate" button to view your personalized mortgage analysis</p>
            </div>
          )}
        </div>
      </div>

      {/* Amortization Charts */}
      {calculatedResult && (
        <div className="mt-8">
          <AmortizationCharts
            loanAmount={calculatedResult.loanAmount}
            interestRate={inputs.interestRate}
            loanTerm={inputs.loanTerm}
            monthlyPayment={calculatedResult.monthlyPayment}
            principalAndInterest={calculatedResult.principalAndInterest}
            startMonth={inputs.startMonth}
            startYear={inputs.startYear}
            propertyTax={inputs.includeTaxesAndCosts ? (inputs.propertyTaxType === 'percent' ? inputs.homePrice * inputs.propertyTax / 100 : inputs.propertyTax) : 0}
            homeInsurance={inputs.includeTaxesAndCosts ? (inputs.homeInsuranceType === 'percent' ? inputs.homePrice * inputs.homeInsurance / 100 : inputs.homeInsurance) : 0}
            otherCosts={inputs.includeTaxesAndCosts ? (inputs.otherCostsType === 'percent' ? inputs.homePrice * inputs.otherCosts / 100 : inputs.otherCosts) : 0}
          />
          
          {/* AI Affordability Analysis */}
          <AIAffordabilityAnalysis
            inputs={inputs}
            result={calculatedResult}
          />
        </div>
      )}

      {/* Saved Scenarios Section */}
       {savedScenarios.length > 0 && (
         <div className="mt-8">
           <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
             {/* Header with Compare Button - Always Visible */}
             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
               <div>
                 <h3 className="text-xl font-bold text-gray-900 mb-2">
                   Saved Scenarios ({savedScenarios.length})
                 </h3>
                 <p className="text-sm text-gray-600">
                   💡 Select 2 scenarios using checkboxes to compare them side-by-side
                 </p>
               </div>
               <div className="flex items-center gap-3">
                 <button
                   onClick={handleCompare}
                   disabled={selectedScenarios.length !== 2}
                   className={`px-6 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                     selectedScenarios.length === 2
                       ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                       : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                   }`}
                 >
                   {selectedScenarios.length === 0 && '📊 Compare Scenarios (0/2)'}
                   {selectedScenarios.length === 1 && '📊 Compare Scenarios (1/2)'}
                   {selectedScenarios.length === 2 && '📊 Compare Now!'}
                 </button>
               </div>
             </div>
             
             {/* Quick Start Guide - Only show if user has 2+ scenarios but hasn't selected any */}
             {savedScenarios.length >= 2 && selectedScenarios.length === 0 && (
               <div className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
                 <div className="flex items-start gap-3">
                   <span className="text-2xl">💡</span>
                   <div>
                     <h4 className="font-semibold text-gray-900 mb-1">Compare Your Scenarios</h4>
                     <p className="text-sm text-gray-700">
                       Click on any 2 scenario cards below to select them, then click the{' '}
                       <strong>"Compare Now!"</strong> button above to see a detailed side-by-side comparison.
                     </p>
                   </div>
                 </div>
               </div>
             )}
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {savedScenarios.map((scenario) => (
                 <div
                   key={scenario.id}
                   className={`relative border-2 rounded-lg p-4 transition-all cursor-pointer ${
                     selectedScenarios.includes(scenario.id)
                       ? 'border-blue-500 bg-blue-50 shadow-md'
                       : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                   }`}
                   onClick={() => toggleScenarioSelection(scenario.id)}
                 >
                   {/* Checkbox with Label */}
                   <div className="absolute top-3 left-3 flex items-center gap-1">
                     <input
                       type="checkbox"
                       checked={selectedScenarios.includes(scenario.id)}
                       onChange={() => {}}
                       className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 pointer-events-none"
                     />
                     {selectedScenarios.includes(scenario.id) && (
                       <span className="text-xs font-medium text-blue-600">Selected</span>
                     )}
                   </div>
                   
                   {/* Delete Button */}
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       handleDeleteScenario(scenario.id);
                     }}
                     className="absolute top-3 right-3 text-gray-400 hover:text-red-600 z-10"
                   >
                     <span className="text-xl">×</span>
                   </button>
                   
                   <div className="pl-8 pr-6">
                     <h4 className="font-semibold text-gray-900 mb-2">{scenario.name}</h4>
                     <div className="space-y-1 text-sm text-gray-600 mb-3">
                       <div>Home Price: {formatCurrencyWhole(scenario.inputs.homePrice)}</div>
                       <div>Down: {formatCurrencyWhole(scenario.result.downPaymentAmount)}</div>
                       <div>Rate: {scenario.inputs.interestRate}%</div>
                       <div>Term: {scenario.inputs.loanTerm} years</div>
                     </div>
                     <div className="text-lg font-bold text-green-600 mb-3">
                       {formatCurrency(scenario.result.monthlyPayment)}/mo
                     </div>
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         handleViewScenario(scenario);
                       }}
                       className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded font-medium text-sm"
                     >
                       👁️ View Details
                     </button>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
       )}

       {/* Comparison View */}
       {showComparison && selectedScenarios.length === 2 && (
         <div className="mt-8">
           <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-xl font-bold text-gray-900">Scenario Comparison</h3>
               <button
                 onClick={() => setShowComparison(false)}
                 className="text-gray-500 hover:text-gray-700"
               >
                 <span className="text-2xl">×</span>
               </button>
             </div>
             
             {(() => {
               const scenario1 = savedScenarios.find(s => s.id === selectedScenarios[0])!;
               const scenario2 = savedScenarios.find(s => s.id === selectedScenarios[1])!;
               
               return (
                 <div className="overflow-x-auto overflow-y-hidden">
                   <table className="w-full min-w-[400px] text-xs sm:text-sm">
                     <thead className="bg-gray-100">
                       <tr>
                         <th className="px-4 py-3 text-left font-semibold">Metric</th>
                         <th className="px-4 py-3 text-right font-semibold text-blue-700">
                           {scenario1.name}
                         </th>
                         <th className="px-4 py-3 text-right font-semibold text-green-700">
                           {scenario2.name}
                         </th>
                         <th className="px-4 py-3 text-right font-semibold text-purple-700">
                           Difference
                         </th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-200">
                       {/* Home Price */}
                       <tr>
                         <td className="px-4 py-3 font-medium">Home Price</td>
                         <td className="px-4 py-3 text-right">{formatCurrencyWhole(scenario1.inputs.homePrice)}</td>
                         <td className="px-4 py-3 text-right">{formatCurrencyWhole(scenario2.inputs.homePrice)}</td>
                         <td className="px-4 py-3 text-right font-semibold text-purple-700">
                           {formatCurrencyWhole(Math.abs(scenario2.inputs.homePrice - scenario1.inputs.homePrice))}
                         </td>
                       </tr>
                       
                       {/* Down Payment */}
                       <tr>
                         <td className="px-4 py-3 font-medium">Down Payment</td>
                         <td className="px-4 py-3 text-right">{formatCurrencyWhole(scenario1.result.downPaymentAmount)}</td>
                         <td className="px-4 py-3 text-right">{formatCurrencyWhole(scenario2.result.downPaymentAmount)}</td>
                         <td className="px-4 py-3 text-right font-semibold text-purple-700">
                           {formatCurrencyWhole(Math.abs(scenario2.result.downPaymentAmount - scenario1.result.downPaymentAmount))}
                         </td>
                       </tr>
                       
                       {/* Loan Amount */}
                       <tr>
                         <td className="px-4 py-3 font-medium">Loan Amount</td>
                         <td className="px-4 py-3 text-right">{formatCurrencyWhole(scenario1.result.loanAmount)}</td>
                         <td className="px-4 py-3 text-right">{formatCurrencyWhole(scenario2.result.loanAmount)}</td>
                         <td className="px-4 py-3 text-right font-semibold text-purple-700">
                           {formatCurrencyWhole(Math.abs(scenario2.result.loanAmount - scenario1.result.loanAmount))}
                         </td>
                       </tr>
                       
                       {/* Interest Rate */}
                       <tr>
                         <td className="px-4 py-3 font-medium">Interest Rate</td>
                         <td className="px-4 py-3 text-right">{scenario1.inputs.interestRate}%</td>
                         <td className="px-4 py-3 text-right">{scenario2.inputs.interestRate}%</td>
                         <td className="px-4 py-3 text-right font-semibold text-purple-700">
                           {Math.abs(scenario2.inputs.interestRate - scenario1.inputs.interestRate).toFixed(3)}%
                         </td>
                       </tr>
                       
                       {/* Loan Term */}
                       <tr>
                         <td className="px-4 py-3 font-medium">Loan Term</td>
                         <td className="px-4 py-3 text-right">{scenario1.inputs.loanTerm} years</td>
                         <td className="px-4 py-3 text-right">{scenario2.inputs.loanTerm} years</td>
                         <td className="px-4 py-3 text-right font-semibold text-purple-700">
                           {Math.abs(scenario2.inputs.loanTerm - scenario1.inputs.loanTerm)} years
                         </td>
                       </tr>
                       
                       {/* Monthly Payment */}
                       <tr className="bg-green-50">
                         <td className="px-4 py-3 font-bold">Monthly Payment</td>
                         <td className="px-4 py-3 text-right font-bold text-green-700">
                           {formatCurrency(scenario1.result.monthlyPayment)}
                         </td>
                         <td className="px-4 py-3 text-right font-bold text-green-700">
                           {formatCurrency(scenario2.result.monthlyPayment)}
                         </td>
                         <td className="px-4 py-3 text-right font-bold text-purple-700">
                           {formatCurrency(Math.abs(scenario2.result.monthlyPayment - scenario1.result.monthlyPayment))}
                         </td>
                       </tr>
                       
                       {/* Principal & Interest */}
                       <tr>
                         <td className="px-4 py-3 font-medium">Principal & Interest</td>
                         <td className="px-4 py-3 text-right">{formatCurrency(scenario1.result.principalAndInterest)}</td>
                         <td className="px-4 py-3 text-right">{formatCurrency(scenario2.result.principalAndInterest)}</td>
                         <td className="px-4 py-3 text-right font-semibold text-purple-700">
                           {formatCurrency(Math.abs(scenario2.result.principalAndInterest - scenario1.result.principalAndInterest))}
                         </td>
                       </tr>
                       
                       {/* Property Tax */}
                       <tr>
                         <td className="px-4 py-3 font-medium">Property Tax (Monthly)</td>
                         <td className="px-4 py-3 text-right">{formatCurrency(scenario1.result.monthlyTax)}</td>
                         <td className="px-4 py-3 text-right">{formatCurrency(scenario2.result.monthlyTax)}</td>
                         <td className="px-4 py-3 text-right font-semibold text-purple-700">
                           {formatCurrency(Math.abs(scenario2.result.monthlyTax - scenario1.result.monthlyTax))}
                         </td>
                       </tr>
                       
                       {/* Home Insurance */}
                       <tr>
                         <td className="px-4 py-3 font-medium">Home Insurance (Monthly)</td>
                         <td className="px-4 py-3 text-right">{formatCurrency(scenario1.result.monthlyInsurance)}</td>
                         <td className="px-4 py-3 text-right">{formatCurrency(scenario2.result.monthlyInsurance)}</td>
                         <td className="px-4 py-3 text-right font-semibold text-purple-700">
                           {formatCurrency(Math.abs(scenario2.result.monthlyInsurance - scenario1.result.monthlyInsurance))}
                         </td>
                       </tr>
                       
                       {/* PMI */}
                       {(scenario1.result.monthlyPMI > 0 || scenario2.result.monthlyPMI > 0) && (
                         <tr>
                           <td className="px-4 py-3 font-medium">PMI (Monthly)</td>
                           <td className="px-4 py-3 text-right">{formatCurrency(scenario1.result.monthlyPMI)}</td>
                           <td className="px-4 py-3 text-right">{formatCurrency(scenario2.result.monthlyPMI)}</td>
                           <td className="px-4 py-3 text-right font-semibold text-purple-700">
                             {formatCurrency(Math.abs(scenario2.result.monthlyPMI - scenario1.result.monthlyPMI))}
                           </td>
                         </tr>
                       )}
                       
                       {/* Total Interest */}
                       <tr className="bg-yellow-50">
                         <td className="px-4 py-3 font-bold">Total Interest Paid</td>
                         <td className="px-4 py-3 text-right font-bold text-orange-700">
                           {formatCurrencyWhole(scenario1.result.totalInterest)}
                         </td>
                         <td className="px-4 py-3 text-right font-bold text-orange-700">
                           {formatCurrencyWhole(scenario2.result.totalInterest)}
                         </td>
                         <td className="px-4 py-3 text-right font-bold text-purple-700">
                           {formatCurrencyWhole(Math.abs(scenario2.result.totalInterest - scenario1.result.totalInterest))}
                         </td>
                       </tr>
                       
                       {/* Total Out-of-Pocket */}
                       <tr className="bg-red-50">
                         <td className="px-4 py-3 font-bold">Total Out-of-Pocket</td>
                         <td className="px-4 py-3 text-right font-bold text-red-700">
                           {formatCurrencyWhole(scenario1.result.totalOutOfPocket)}
                         </td>
                         <td className="px-4 py-3 text-right font-bold text-red-700">
                           {formatCurrencyWhole(scenario2.result.totalOutOfPocket)}
                         </td>
                         <td className="px-4 py-3 text-right font-bold text-purple-700">
                           {formatCurrencyWhole(Math.abs(scenario2.result.totalOutOfPocket - scenario1.result.totalOutOfPocket))}
                         </td>
                       </tr>
                       
                       {/* Payoff Date */}
                       <tr>
                         <td className="px-4 py-3 font-medium">Payoff Date</td>
                         <td className="px-4 py-3 text-right">{scenario1.result.payoffDate}</td>
                         <td className="px-4 py-3 text-right">{scenario2.result.payoffDate}</td>
                         <td className="px-4 py-3 text-right font-semibold text-purple-700">
                           {Math.abs(scenario2.result.payoffMonths - scenario1.result.payoffMonths)} months
                         </td>
                       </tr>
                       
                       {/* Extra Payments Impact */}
                       {(scenario1.result.withExtraPayments || scenario2.result.withExtraPayments) && (
                         <>
                           <tr className="bg-blue-50">
                             <td className="px-4 py-3 font-bold" colSpan={4}>With Extra Payments</td>
                           </tr>
                           <tr>
                             <td className="px-4 py-3 font-medium">Interest Saved</td>
                             <td className="px-4 py-3 text-right">
                               {scenario1.result.withExtraPayments ? formatCurrencyWhole(scenario1.result.withExtraPayments.interestSaved) : 'N/A'}
                             </td>
                             <td className="px-4 py-3 text-right">
                               {scenario2.result.withExtraPayments ? formatCurrencyWhole(scenario2.result.withExtraPayments.interestSaved) : 'N/A'}
                             </td>
                             <td className="px-4 py-3 text-right font-semibold text-purple-700">
                               {scenario1.result.withExtraPayments && scenario2.result.withExtraPayments
                                 ? formatCurrencyWhole(Math.abs(scenario2.result.withExtraPayments.interestSaved - scenario1.result.withExtraPayments.interestSaved))
                                 : '—'}
                             </td>
                           </tr>
                           <tr>
                             <td className="px-4 py-3 font-medium">Months Saved</td>
                             <td className="px-4 py-3 text-right">
                               {scenario1.result.withExtraPayments ? scenario1.result.withExtraPayments.monthsSaved + ' months' : 'N/A'}
                             </td>
                             <td className="px-4 py-3 text-right">
                               {scenario2.result.withExtraPayments ? scenario2.result.withExtraPayments.monthsSaved + ' months' : 'N/A'}
                             </td>
                             <td className="px-4 py-3 text-right font-semibold text-purple-700">
                               {scenario1.result.withExtraPayments && scenario2.result.withExtraPayments
                                 ? Math.abs(scenario2.result.withExtraPayments.monthsSaved - scenario1.result.withExtraPayments.monthsSaved) + ' months'
                                 : '—'}
                             </td>
                           </tr>
                         </>
                       )}
                       
                       {/* Biweekly Payments Impact */}
                       {(scenario1.result.biweekly || scenario2.result.biweekly) && (
                         <>
                           <tr className="bg-purple-50">
                             <td className="px-4 py-3 font-bold" colSpan={4}>Biweekly Payment Option</td>
                           </tr>
                           <tr>
                             <td className="px-4 py-3 font-medium">Biweekly Payment</td>
                             <td className="px-4 py-3 text-right">
                               {scenario1.result.biweekly ? formatCurrency(scenario1.result.biweekly.payment) : 'N/A'}
                             </td>
                             <td className="px-4 py-3 text-right">
                               {scenario2.result.biweekly ? formatCurrency(scenario2.result.biweekly.payment) : 'N/A'}
                             </td>
                             <td className="px-4 py-3 text-right font-semibold text-purple-700">
                               {scenario1.result.biweekly && scenario2.result.biweekly
                                 ? formatCurrency(Math.abs(scenario2.result.biweekly.payment - scenario1.result.biweekly.payment))
                                 : '—'}
                             </td>
                           </tr>
                           <tr>
                             <td className="px-4 py-3 font-medium">Interest Saved (vs Monthly)</td>
                             <td className="px-4 py-3 text-right">
                               {scenario1.result.biweekly ? formatCurrencyWhole(scenario1.result.biweekly.interestSaved) : 'N/A'}
                             </td>
                             <td className="px-4 py-3 text-right">
                               {scenario2.result.biweekly ? formatCurrencyWhole(scenario2.result.biweekly.interestSaved) : 'N/A'}
                             </td>
                             <td className="px-4 py-3 text-right font-semibold text-purple-700">
                               {scenario1.result.biweekly && scenario2.result.biweekly
                                 ? formatCurrencyWhole(Math.abs(scenario2.result.biweekly.interestSaved - scenario1.result.biweekly.interestSaved))
                                 : '—'}
                             </td>
                           </tr>
                         </>
                       )}
                     </tbody>
                   </table>
                   
                   {/* Summary */}
                   <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                     <h4 className="font-bold text-gray-900 mb-2">Comparison Summary</h4>
                     <div className="text-sm text-gray-700 space-y-1">
                       {scenario1.result.monthlyPayment < scenario2.result.monthlyPayment ? (
                         <p>
                           💰 <strong>{scenario1.name}</strong> has a lower monthly payment by{' '}
                           <strong>{formatCurrency(scenario2.result.monthlyPayment - scenario1.result.monthlyPayment)}</strong>
                         </p>
                       ) : (
                         <p>
                           💰 <strong>{scenario2.name}</strong> has a lower monthly payment by{' '}
                           <strong>{formatCurrency(scenario1.result.monthlyPayment - scenario2.result.monthlyPayment)}</strong>
                         </p>
                       )}
                       
                       {scenario1.result.totalInterest < scenario2.result.totalInterest ? (
                         <p>
                           📊 <strong>{scenario1.name}</strong> saves{' '}
                           <strong>{formatCurrencyWhole(scenario2.result.totalInterest - scenario1.result.totalInterest)}</strong>{' '}
                           in total interest
                         </p>
                       ) : (
                         <p>
                           📊 <strong>{scenario2.name}</strong> saves{' '}
                           <strong>{formatCurrencyWhole(scenario1.result.totalInterest - scenario2.result.totalInterest)}</strong>{' '}
                           in total interest
                         </p>
                       )}
                       
                       {scenario1.result.totalOutOfPocket < scenario2.result.totalOutOfPocket ? (
                         <p>
                           🏆 <strong>{scenario1.name}</strong> has a lower total out-of-pocket cost by{' '}
                           <strong>{formatCurrencyWhole(scenario2.result.totalOutOfPocket - scenario1.result.totalOutOfPocket)}</strong>
                         </p>
                       ) : (
                         <p>
                           🏆 <strong>{scenario2.name}</strong> has a lower total out-of-pocket cost by{' '}
                           <strong>{formatCurrencyWhole(scenario1.result.totalOutOfPocket - scenario2.result.totalOutOfPocket)}</strong>
                         </p>
                       )}
                     </div>
                   </div>
                 </div>
               );
             })()}
           </div>
         </div>
       )}

       {/* Single Scenario View */}
       {viewingScenario && (
         <div className="mt-8">
           <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-xl font-bold text-gray-900">
                 Scenario Details: {viewingScenario.name}
               </h3>
               <button
                 onClick={() => setViewingScenario(null)}
                 className="text-gray-500 hover:text-gray-700"
               >
                 <span className="text-2xl">×</span>
               </button>
             </div>
             
             <div className="space-y-6">
               {/* Monthly Payment */}
               <div className="bg-green-600 rounded-xl shadow-xl p-6 text-white">
                 <div className="text-lg mb-2">Monthly Pay:</div>
                 <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">{formatCurrency(viewingScenario.result.monthlyPayment)}</div>
               </div>

               {/* Input Summary */}
               <div className="bg-gray-50 rounded-lg p-4">
                 <h4 className="font-semibold text-gray-900 mb-3">Loan Details</h4>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                   <div>
                     <div className="text-gray-600">Home Price</div>
                     <div className="font-semibold">{formatCurrencyWhole(viewingScenario.inputs.homePrice)}</div>
                   </div>
                   <div>
                     <div className="text-gray-600">Down Payment</div>
                     <div className="font-semibold">{formatCurrencyWhole(viewingScenario.result.downPaymentAmount)}</div>
                   </div>
                   <div>
                     <div className="text-gray-600">Interest Rate</div>
                     <div className="font-semibold">{viewingScenario.inputs.interestRate}%</div>
                   </div>
                   <div>
                     <div className="text-gray-600">Loan Term</div>
                     <div className="font-semibold">{viewingScenario.inputs.loanTerm} years</div>
                   </div>
                 </div>
               </div>

               {/* Detailed Results Table */}
               <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto overflow-y-hidden">
                 <table className="w-full min-w-[350px] text-xs sm:text-sm">
                   <thead className="bg-gray-100">
                     <tr>
                       <th className="px-4 py-3 text-left font-semibold"></th>
                       <th className="px-4 py-3 text-right font-semibold">First Month</th>
                       <th className="px-4 py-3 text-right font-semibold">Total</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200">
                     <tr>
                       <td className="px-4 py-3 font-medium">Mortgage Payment</td>
                       <td className="px-4 py-3 text-right">{formatCurrency(viewingScenario.result.principalAndInterest)}</td>
                       <td className="px-4 py-3 text-right">{formatCurrencyWhole(viewingScenario.result.principalAndInterest * viewingScenario.result.totalPayments)}</td>
                     </tr>
                     <tr>
                       <td className="px-4 py-3 font-medium">Property Tax</td>
                       <td className="px-4 py-3 text-right">{formatCurrency(viewingScenario.result.monthlyTax)}</td>
                       <td className="px-4 py-3 text-right">{formatCurrencyWhole(viewingScenario.result.totalTax)}</td>
                     </tr>
                     <tr>
                       <td className="px-4 py-3 font-medium">Home Insurance</td>
                       <td className="px-4 py-3 text-right">{formatCurrency(viewingScenario.result.monthlyInsurance)}</td>
                       <td className="px-4 py-3 text-right">{formatCurrencyWhole(viewingScenario.result.totalInsurance)}</td>
                     </tr>
                     {viewingScenario.result.monthlyPMI > 0 && (
                       <tr>
                         <td className="px-4 py-3 font-medium">PMI</td>
                         <td className="px-4 py-3 text-right">{formatCurrency(viewingScenario.result.monthlyPMI)}</td>
                         <td className="px-4 py-3 text-right">{formatCurrencyWhole(viewingScenario.result.totalPMI)}</td>
                       </tr>
                     )}
                     {viewingScenario.result.monthlyOther > 0 && (
                       <tr>
                         <td className="px-4 py-3 font-medium">Other Costs</td>
                         <td className="px-4 py-3 text-right">{formatCurrency(viewingScenario.result.monthlyOther)}</td>
                         <td className="px-4 py-3 text-right">{formatCurrencyWhole(viewingScenario.result.totalOther)}</td>
                       </tr>
                     )}
                     <tr className="bg-gray-50 font-bold">
                       <td className="px-4 py-3">Total Out-of-Pocket</td>
                       <td className="px-4 py-3 text-right">{formatCurrency(viewingScenario.result.monthlyPayment)}</td>
                       <td className="px-4 py-3 text-right">{formatCurrencyWhole(viewingScenario.result.totalOutOfPocket)}</td>
                     </tr>
                   </tbody>
                 </table>
               </div>

               {/* House Details */}
               <div className="bg-white rounded-xl border border-gray-200 p-6">
                 <h4 className="font-semibold text-gray-900 mb-4">Summary</h4>
                 <div className="grid grid-cols-2 gap-4 text-sm">
                   <div>
                     <div className="text-gray-600">Loan Amount</div>
                     <div className="font-semibold text-gray-900">{formatCurrencyWhole(viewingScenario.result.loanAmount)}</div>
                   </div>
                   <div>
                     <div className="text-gray-600">Total Interest</div>
                     <div className="font-semibold text-gray-900">{formatCurrencyWhole(viewingScenario.result.totalInterest)}</div>
                   </div>
                   <div>
                     <div className="text-gray-600">Total Payments</div>
                     <div className="font-semibold text-gray-900">{viewingScenario.result.totalPayments} months</div>
                   </div>
                   <div>
                     <div className="text-gray-600">Payoff Date</div>
                     <div className="font-semibold text-gray-900">{viewingScenario.result.payoffDate}</div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Share Your Results</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-4 text-sm">
              Share your mortgage calculation with friends and family. They'll see your inputs and can calculate their own mortgage.
            </p>

            {/* Copy Link */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Share Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    copySuccess
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copySuccess ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
              {copySuccess && (
                <p className="text-green-600 text-xs mt-2 font-medium">✓ Link copied to clipboard!</p>
              )}
            </div>

            {/* Social Share Buttons */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Share via</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
                
                <button
                  onClick={() => handleSocialShare('twitter')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1A91DA] transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </button>
                
                <button
                  onClick={() => handleSocialShare('whatsapp')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#22C55E] transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </button>
                
                <button
                  onClick={() => handleSocialShare('email')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600">
                <strong className="text-blue-600">💡 Tip:</strong> The link will auto-fill your friend's calculator with your data. They can then adjust and calculate their own mortgage.
              </p>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 }

// Export with VA-specific name for compatibility
export const VAMortgageCalculator = MortgageCalculatorV2;
