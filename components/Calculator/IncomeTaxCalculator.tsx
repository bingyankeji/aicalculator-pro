'use client';

import { useState, useEffect } from 'react';
import { Share2, Download, Printer, ChevronDown, ChevronUp } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface TaxResult {
  // Income
  grossIncome: number;
  
  // Withheld (already paid)
  federalWithheld: number;
  stateWithheld: number;
  localWithheld: number;
  ficaWithheld: number;
  totalWithheld: number;
  
  // Deductions
  atlDeductions: number;
  standardDeduction: number;
  itemizedDeductions: number;
  totalDeductions: number;
  
  // Taxable Income
  agi: number;
  taxableIncome: number;
  
  // Tax Liability (what you owe)
  federalTaxLiability: number;
  stateTaxLiability: number;
  ficaTaxLiability: number;
  totalTaxLiability: number;
  
  // Credits
  totalCredits: number;
  
  // Final Result
  netTaxLiability: number; // After credits
  refundOrOwed: number; // Positive = Refund, Negative = Owed
  isRefund: boolean;
  
  // Rates
  effectiveTaxRate: number;
  marginalTaxRate: number;
  
  // Breakdown
  breakdown: {
    socialSecurity: number;
    medicare: number;
    federalTaxBrackets: Array<{ rate: number; amount: number; income: number }>;
    atlDeductionsDetail: { [key: string]: number };
    itemizedDetail: { [key: string]: number };
    creditsDetail: { [key: string]: number };
  };
  
  useItemized: boolean;
}

// 2025 Federal Tax Brackets
const federalTaxBrackets2025Single = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

const federalTaxBrackets2025Married = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
];

// 2025 Standard Deductions
const standardDeductions2025 = {
  single: 15000,
  married: 30000,
  hoh: 22500,
};

export function IncomeTaxCalculator() {
  // Basic Info
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'hoh'>('single');
  const [youngDependents, setYoungDependents] = useState<string>('0');
  const [otherDependents, setOtherDependents] = useState<string>('0');
  const [age, setAge] = useState<string>('30');
  
  // Income Section
  const [wages, setWages] = useState<string>('80000');
  const [federalWithheld, setFederalWithheld] = useState<string>('9000');
  const [stateWithheld, setStateWithheld] = useState<string>('0');
  const [localWithheld, setLocalWithheld] = useState<string>('0');
  const [hasBusiness, setHasBusiness] = useState<boolean>(false);
  const [businessIncome, setBusinessIncome] = useState<string>('0');
  const [estimatedTaxPaid, setEstimatedTaxPaid] = useState<string>('0');
  const [medicareWages, setMedicareWages] = useState<string>('0');
  const [socialSecurityIncome, setSocialSecurityIncome] = useState<string>('0');
  const [interestIncome, setInterestIncome] = useState<string>('0');
  const [dividendsOrdinary, setDividendsOrdinary] = useState<string>('0');
  const [dividendsQualified, setDividendsQualified] = useState<string>('0');
  const [passiveIncome, setPassiveIncome] = useState<string>('0');
  const [capitalGainsShort, setCapitalGainsShort] = useState<string>('0');
  const [capitalGainsLong, setCapitalGainsLong] = useState<string>('0');
  const [otherIncome, setOtherIncome] = useState<string>('0');
  const [stateLocalTaxRate, setStateLocalTaxRate] = useState<string>('0');
  
  // Deductions & Credits
  const [tipsIncome, setTipsIncome] = useState<string>('0');
  const [overtimeIncome, setOvertimeIncome] = useState<string>('0');
  const [carLoanInterest, setCarLoanInterest] = useState<string>('0');
  const [iraContributions, setIraContributions] = useState<string>('0');
  const [realEstateTax, setRealEstateTax] = useState<string>('0');
  const [mortgageInterest, setMortgageInterest] = useState<string>('0');
  const [charitableDonations, setCharitableDonations] = useState<string>('0');
  const [studentLoanInterest, setStudentLoanInterest] = useState<string>('0');
  const [childCareExpenses, setChildCareExpenses] = useState<string>('0');
  const [educationExpense1, setEducationExpense1] = useState<string>('0');
  const [educationExpense2, setEducationExpense2] = useState<string>('0');
  const [educationExpense3, setEducationExpense3] = useState<string>('0');
  const [educationExpense4, setEducationExpense4] = useState<string>('0');
  const [otherDeductibles, setOtherDeductibles] = useState<string>('0');
  
  // UI State
  const [showDeductions, setShowDeductions] = useState(false);
  const [result, setResult] = useState<TaxResult | null>(null);

  // Share functionality
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/tax-calculator',
    getShareParams: () => ({
      fs: filingStatus,
      a: age,
      w: wages,
      fw: federalWithheld,
      sw: stateWithheld,
      lw: localWithheld,
    }),
    getShareText: () => 
      result 
        ? `My Tax Calculation: ${result.isRefund ? 'Refund' : 'Owed'} $${Math.abs(result.refundOrOwed).toLocaleString('en-US')} | Effective Rate ${result.effectiveTaxRate.toFixed(2)}%`
        : 'Check out my income tax calculation!',
  });

  const calculateFederalTax = (taxableIncome: number, status: 'single' | 'married' | 'hoh'): { tax: number; brackets: Array<{ rate: number; amount: number; income: number }> } => {
    const brackets = status === 'married' ? federalTaxBrackets2025Married : federalTaxBrackets2025Single;
    let tax = 0;
    const bracketDetails: Array<{ rate: number; amount: number; income: number }> = [];

    for (let i = 0; i < brackets.length; i++) {
      const bracket = brackets[i];
      if (taxableIncome > bracket.min) {
        const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        const taxInBracket = taxableInBracket * bracket.rate;
        tax += taxInBracket;
        
        if (taxInBracket > 0) {
          bracketDetails.push({
            rate: bracket.rate,
            amount: taxInBracket,
            income: taxableInBracket,
          });
        }
        
        if (taxableIncome <= bracket.max) break;
      }
    }

    return { tax, brackets: bracketDetails };
  };

  const getMarginalRate = (taxableIncome: number, status: 'single' | 'married' | 'hoh'): number => {
    const brackets = status === 'married' ? federalTaxBrackets2025Married : federalTaxBrackets2025Single;
    for (const bracket of brackets) {
      if (taxableIncome >= bracket.min && taxableIncome <= bracket.max) {
        return bracket.rate;
      }
    }
    return brackets[brackets.length - 1].rate;
  };

  const calculateTax = () => {
    // Parse all inputs
    const w = parseFloat(wages) || 0;
    const interest = parseFloat(interestIncome) || 0;
    const divOrd = parseFloat(dividendsOrdinary) || 0;
    const divQual = parseFloat(dividendsQualified) || 0;
    const capGainShort = parseFloat(capitalGainsShort) || 0;
    const capGainLong = parseFloat(capitalGainsLong) || 0;
    const passive = parseFloat(passiveIncome) || 0;
    const other = parseFloat(otherIncome) || 0;
    
    // Social Security Income (simplified: 85% taxable for high earners)
    const ssIncome = parseFloat(socialSecurityIncome) || 0;
    const taxableSS = ssIncome * 0.85; // Simplified approach
    
    // Business Income (parsed here, used later for SE tax calculation)
    const parsedBizIncome = parseFloat(businessIncome) || 0;
    
    // Gross Income (including business income and taxable SS)
    const grossIncome = w + parsedBizIncome + taxableSS + interest + divOrd + divQual + capGainShort + capGainLong + passive + other;
    
    if (grossIncome <= 0) {
      alert('Please enter a valid income amount');
      return;
    }
    
    // ATL Deductions (Above-the-Line)
    const atlDeductionsDetail: { [key: string]: number } = {};
    
    // IRA Contributions (up to $7,000 in 2025)
    const ira = Math.min(parseFloat(iraContributions) || 0, 7000);
    if (ira > 0) atlDeductionsDetail['IRA Contributions'] = ira;
    
    // Student Loan Interest (up to $2,500)
    let studentLoan = Math.min(parseFloat(studentLoanInterest) || 0, 2500);
    if (studentLoan > 0) atlDeductionsDetail['Student Loan Interest'] = studentLoan;
    
    // 2025 NEW: Tips Deduction (up to $25,000)
    let tips = Math.min(parseFloat(tipsIncome) || 0, 25000);
    if (tips > 0) atlDeductionsDetail['Qualified Tips Deduction'] = tips;
    
    // 2025 NEW: Overtime Compensation
    let overtime = Math.min(parseFloat(overtimeIncome) || 0, filingStatus === 'married' ? 25000 : 12500);
    if (overtime > 0) atlDeductionsDetail['Overtime Compensation Deduction'] = overtime;
    
    // 2025 NEW: Car Loan Interest (up to $10,000)
    let carLoan = Math.min(parseFloat(carLoanInterest) || 0, 10000);
    if (carLoan > 0) atlDeductionsDetail['Car Loan Interest Deduction'] = carLoan;
    
    // 2025 NEW: Seniors Deduction
    let seniorsDeduction = 0;
    const ageNum = parseInt(age) || 0;
    if (ageNum >= 65) {
      seniorsDeduction = filingStatus === 'married' ? 12000 : 6000;
      if (seniorsDeduction > 0) atlDeductionsDetail['Senior Deduction (65+)'] = seniorsDeduction;
    }
    
    // Self-Employment Tax Deduction (50% of SE tax is ATL deductible)
    const selfEmploymentTaxRate = 0.153; // 15.3% for self-employed
    const selfEmploymentTax = hasBusiness ? (parsedBizIncome * 0.9235 * selfEmploymentTaxRate) : 0;
    const selfEmploymentTaxDeduction = selfEmploymentTax * 0.5; // 50% deductible
    if (selfEmploymentTaxDeduction > 0) atlDeductionsDetail['Self-Employment Tax Deduction (50%)'] = selfEmploymentTaxDeduction;
    
    const totalATLDeductions = ira + studentLoan + tips + overtime + carLoan + seniorsDeduction + selfEmploymentTaxDeduction;
    
    // AGI (Adjusted Gross Income)
    const agi = grossIncome - totalATLDeductions;
    
    // BTL Deductions: Standard vs Itemized
    const standardDeduction = standardDeductions2025[filingStatus];
    
    // Itemized Deductions
    const itemizedDetail: { [key: string]: number } = {};
    
    // SALT Deduction (State and Local Tax) - Cap at $40,000 for 2025
    const realEstate = parseFloat(realEstateTax) || 0;
    const saltCap = 40000; // 2025 SALT cap
    const saltDeduction = Math.min(realEstate, saltCap);
    if (saltDeduction > 0) itemizedDetail['Real Estate Tax (SALT)'] = saltDeduction;
    
    // Mortgage Interest (capped at $750,000 loan)
    const mortgage = parseFloat(mortgageInterest) || 0;
    if (mortgage > 0) itemizedDetail['Mortgage Interest'] = mortgage;
    
    const charity = parseFloat(charitableDonations) || 0;
    if (charity > 0) itemizedDetail['Charitable Donations'] = charity;
    
    const otherDed = parseFloat(otherDeductibles) || 0;
    if (otherDed > 0) itemizedDetail['Other Deductibles'] = otherDed;
    
    const totalItemized = saltDeduction + mortgage + charity + otherDed;
    
    // Use the larger of standard or itemized
    const useItemized = totalItemized > standardDeduction;
    const totalDeductions = useItemized ? totalItemized : standardDeduction;
    
    // Taxable Income
    const taxableIncome = Math.max(0, agi - totalDeductions);
    
    // Federal Tax LIABILITY
    const { tax: federalTaxLiability, brackets: federalTaxBrackets } = calculateFederalTax(taxableIncome, filingStatus);
    
    // State + Local Tax LIABILITY
    const stateRate = parseFloat(stateLocalTaxRate) || 0;
    const stateTaxLiability = agi * (stateRate / 100);
    
    // FICA Tax (for informational purposes - already withheld from W-2 wages)
    const socialSecurityLimit = 176100; // 2025 limit
    const socialSecurityRate = 0.062;
    const medicareRate = 0.0145;
    const additionalMedicareRate = 0.009;
    
    // For W-2 wages (already withheld)
    const wageForFICA = parseFloat(medicareWages) || w; // Use Medicare Wages if provided
    const socialSecurity = Math.min(wageForFICA, socialSecurityLimit) * socialSecurityRate;
    const baseMedicare = wageForFICA * medicareRate;
    const medicareThreshold = filingStatus === 'married' ? 250000 : 200000;
    const additionalMedicare = wageForFICA > medicareThreshold ? (wageForFICA - medicareThreshold) * additionalMedicareRate : 0;
    const medicare = baseMedicare + additionalMedicare;
    
    // Self-Employment Tax (additional liability for business income)
    const seTaxLiability = selfEmploymentTax; // This is additional tax owed beyond what's already withheld
    
    // Total FICA (for display purposes)
    const ficaTaxLiability = socialSecurity + medicare + seTaxLiability;
    
    // Tax Credits
    const creditsDetail: { [key: string]: number } = {};
    
    // Child Tax Credit ($2,200 per child under 17)
    const youngDeps = parseInt(youngDependents) || 0;
    let childCredit = youngDeps * 2200;
    if (childCredit > 0) creditsDetail['Child Tax Credit'] = childCredit;
    
    // Child Care Credit
    const careExp = parseFloat(childCareExpenses) || 0;
    const careLimit = youngDeps >= 2 ? 6000 : 3000;
    const carePercent = agi < 50000 ? 0.50 : (agi < 100000 ? 0.35 : 0.20);
    const childCareCredit = Math.min(careExp, careLimit) * carePercent;
    if (childCareCredit > 0) creditsDetail['Child and Dependent Care Credit'] = childCareCredit;
    
    // Education Credit (American Opportunity Credit)
    // Formula: 100% of first $2,000 + 25% of next $2,000 = Max $2,500 per student
    const calculateAOC = (expense: number) => {
      if (expense <= 0) return 0;
      const first2k = Math.min(expense, 2000);
      const next2k = Math.max(0, Math.min(expense - 2000, 2000));
      return first2k + next2k * 0.25; // Max $2,500 per student
    };
    
    const edu1 = parseFloat(educationExpense1) || 0;
    const edu2 = parseFloat(educationExpense2) || 0;
    const edu3 = parseFloat(educationExpense3) || 0;
    const edu4 = parseFloat(educationExpense4) || 0;
    const educationCredit = calculateAOC(edu1) + calculateAOC(edu2) + calculateAOC(edu3) + calculateAOC(edu4);
    if (educationCredit > 0) creditsDetail['Education Credits (AOC)'] = educationCredit;
    
    const totalCredits = childCredit + childCareCredit + educationCredit;
    
    // Total Tax LIABILITY (before credits)
    // Note: FICA from W-2 wages is already withheld, only SE tax is additional liability
    const totalTaxLiability = federalTaxLiability + stateTaxLiability + seTaxLiability;
    
    // Net Tax LIABILITY (after credits)
    const netTaxLiability = Math.max(0, totalTaxLiability - totalCredits);
    
    // WITHHELD (already paid through paycheck or estimated tax)
    const fedWithheld = parseFloat(federalWithheld) || 0;
    const stWithheld = parseFloat(stateWithheld) || 0;
    const locWithheld = parseFloat(localWithheld) || 0;
    const estTaxPaid = parseFloat(estimatedTaxPaid) || 0; // For self-employed quarterly payments
    
    // FICA from W-2 is already withheld (not added to totalWithheld)
    // Only Federal, State, Local, and Estimated Tax payments count
    const totalWithheld = fedWithheld + stWithheld + locWithheld + estTaxPaid;
    
    // REFUND or OWED
    const refundOrOwed = totalWithheld - netTaxLiability;
    const isRefund = refundOrOwed > 0;
    
    const effectiveTaxRate = (netTaxLiability / grossIncome) * 100;
    const marginalTaxRate = getMarginalRate(taxableIncome, filingStatus) * 100;
    
    setResult({
      grossIncome,
      federalWithheld: fedWithheld,
      stateWithheld: stWithheld,
      localWithheld: locWithheld,
      ficaWithheld: ficaTaxLiability, // For display purposes only
      totalWithheld,
      atlDeductions: totalATLDeductions,
      standardDeduction,
      itemizedDeductions: totalItemized,
      totalDeductions,
      agi,
      taxableIncome,
      federalTaxLiability,
      stateTaxLiability,
      ficaTaxLiability,
      totalTaxLiability,
      totalCredits,
      netTaxLiability,
      refundOrOwed,
      isRefund,
      effectiveTaxRate,
      marginalTaxRate,
      breakdown: {
        socialSecurity,
        medicare,
        federalTaxBrackets,
        atlDeductionsDetail,
        itemizedDetail,
        creditsDetail,
      },
      useItemized,
    });
  };


  const handleSaveImage = async () => {
    const html2canvas = (await import('html2canvas')).default;
    const element = document.getElementById('tax-result');
    if (element) {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `income-tax-calculation-${new Date().getTime()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Calculator Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 mb-6">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg -mx-6 -mt-6 mb-6 md:-mx-8 md:-mt-8">
          <p className="text-center text-sm">ℹ️ Modify the values and click the Calculate button to use</p>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Income Tax Calculator</h2>
        
        {/* File Status */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">File Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="hoh">Head of Household</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">No. of Young Dependents</label>
            <input
              type="number"
              value={youngDependents}
              onChange={(e) => setYoungDependents(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">Age 0-16</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">No. of Other Dependents</label>
            <input
              type="number"
              value={otherDependents}
              onChange={(e) => setOtherDependents(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">Age 17 or older</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tax Year</label>
            <div className="flex flex-col gap-2 pt-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="taxYear" value="2025" defaultChecked />
                <span className="text-sm">2025 (return filed in 2026)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Income Section */}
        <div className="bg-blue-600 text-white px-4 py-2 mb-4">
          <h3 className="font-bold">Income</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="30"
            />
            <p className="text-xs text-gray-500 mt-1">(Age 65+ qualifies for additional deduction)</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Wages, Tips, Other Compensation ($)</label>
            <input
              type="number"
              value={wages}
              onChange={(e) => setWages(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="80000"
            />
            <p className="text-xs text-gray-500 mt-1 font-medium">(W-2 box 1)</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Federal Income Tax Withheld ($)</label>
            <input
              type="number"
              value={federalWithheld}
              onChange={(e) => setFederalWithheld(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="9000"
            />
            <p className="text-xs text-gray-500 mt-1 font-medium">(W-2 box 2)</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State Income Tax Withheld ($)</label>
            <input
              type="number"
              value={stateWithheld}
              onChange={(e) => setStateWithheld(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1 font-medium">(W-2 box 17)</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Local Income Tax Withheld ($)</label>
            <input
              type="number"
              value={localWithheld}
              onChange={(e) => setLocalWithheld(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1 font-medium">(W-2 box 19)</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State+Local Tax Rate (%)</label>
            <input
              type="number"
              value={stateLocalTaxRate}
              onChange={(e) => setStateLocalTaxRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              step="0.1"
            />
            <p className="text-xs text-gray-500 mt-1">(e.g. 5.5 for 5.5%, check your state tax website)</p>
          </div>
        </div>

        {/* Business or Self Employment Income */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-300">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Has Business or Self Employment Income?
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasBusiness"
                  checked={hasBusiness === true}
                  onChange={() => setHasBusiness(true)}
                  className="w-4 h-4"
                />
                <span className="text-sm">yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasBusiness"
                  checked={hasBusiness === false}
                  onChange={() => setHasBusiness(false)}
                  className="w-4 h-4"
                />
                <span className="text-sm">no</span>
              </label>
            </div>
          </div>

          {hasBusiness && (
            <div className="grid md:grid-cols-3 gap-4 mt-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Business Income ($)</label>
                <input
                  type="number"
                  value={businessIncome}
                  onChange={(e) => setBusinessIncome(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Estimated Tax Paid ($)</label>
                <input
                  type="number"
                  value={estimatedTaxPaid}
                  onChange={(e) => setEstimatedTaxPaid(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Medicare Wages ($)</label>
                <input
                  type="number"
                  value={medicareWages}
                  onChange={(e) => setMedicareWages(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1 font-medium">(W-2 box 5, use 0 if no W-2)</p>
              </div>
            </div>
          )}
        </div>

        {/* Additional Income Fields (collapsible) */}
        <button
          onClick={() => setShowDeductions(!showDeductions)}
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 mb-4"
        >
          {showDeductions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showDeductions ? 'Hide' : 'Show'} Additional Income & Deductions
        </button>

        {showDeductions && (
          <div className="space-y-6 mb-6">
            {/* Additional Income */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Social Security Income ($)</label>
                <input
                  type="number"
                  value={socialSecurityIncome}
                  onChange={(e) => setSocialSecurityIncome(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1 font-medium">SSA-1099, RRB-1099</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Interest Income ($)</label>
                <input
                  type="number"
                  value={interestIncome}
                  onChange={(e) => setInterestIncome(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1 font-medium">1099-INT</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Ordinary Dividends ($)</label>
                <input
                  type="number"
                  value={dividendsOrdinary}
                  onChange={(e) => setDividendsOrdinary(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1 font-medium">1099-DIV</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Qualified Dividends ($)</label>
                <input
                  type="number"
                  value={dividendsQualified}
                  onChange={(e) => setDividendsQualified(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1 font-medium">1099-DIV</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Passive Incomes ($)</label>
                <input
                  type="number"
                  value={passiveIncome}
                  onChange={(e) => setPassiveIncome(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1 font-medium">e.g. rentals and real estate, royalties</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Short-term Capital Gain ($)</label>
                <input
                  type="number"
                  value={capitalGainsShort}
                  onChange={(e) => setCapitalGainsShort(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">(Assets held ≤ 1 year, taxed as ordinary income)</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Long-term Capital Gain ($)</label>
                <input
                  type="number"
                  value={capitalGainsLong}
                  onChange={(e) => setCapitalGainsLong(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">(Assets held &gt; 1 year, preferential tax rate)</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Other Income ($)</label>
                <input
                  type="number"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1 font-medium">e.g. unemployment pay(1099-G), retirement pay (1099-R)</p>
              </div>
            </div>

            {/* Deductions & Credits Section */}
            <div className="bg-blue-600 text-white px-4 py-2">
              <h3 className="font-bold">Deductions & Credits</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Tips Income ($)</label>
                <input
                  type="number"
                  value={tipsIncome}
                  onChange={(e) => setTipsIncome(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">(2025 NEW: Deduct up to $25,000)</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Overtime Income ($)</label>
                <input
                  type="number"
                  value={overtimeIncome}
                  onChange={(e) => setOvertimeIncome(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">(2025 NEW: Deduct up to $12,500 single/$25,000 married)</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Car Loan Interest ($)</label>
                <input
                  type="number"
                  value={carLoanInterest}
                  onChange={(e) => setCarLoanInterest(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">Max $10,000 for qualified vehicle purchase</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">IRA Contributions ($)</label>
                <input
                  type="number"
                  value={iraContributions}
                  onChange={(e) => setIraContributions(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">(Max $7,000 in 2025)</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Real Estate Tax ($)</label>
                <input
                  type="number"
                  value={realEstateTax}
                  onChange={(e) => setRealEstateTax(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">(Property tax paid, part of SALT deduction)</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Mortgage Interest ($)</label>
                <input
                  type="number"
                  value={mortgageInterest}
                  onChange={(e) => setMortgageInterest(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">(On loans up to $750,000, Form 1098)</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Charitable Donations ($)</label>
                <input
                  type="number"
                  value={charitableDonations}
                  onChange={(e) => setCharitableDonations(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">(To qualified charities, keep receipts)</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Student Loan Interest ($)</label>
                <input
                  type="number"
                  value={studentLoanInterest}
                  onChange={(e) => setStudentLoanInterest(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">Max $2,500/Person</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Child & Dependent Care Expense ($)</label>
                <input
                  type="number"
                  value={childCareExpenses}
                  onChange={(e) => setChildCareExpenses(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">Max $3,000/Person, $6,000 total, up to age 13</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">College Education Expense - Student 1 ($)</label>
                <input
                  type="number"
                  value={educationExpense1}
                  onChange={(e) => setEducationExpense1(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">(Form 1098-T, up to $2,500 credit per student)</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">College Education Expense - Student 2 ($)</label>
                <input
                  type="number"
                  value={educationExpense2}
                  onChange={(e) => setEducationExpense2(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">College Education Expense - Student 3 ($)</label>
                <input
                  type="number"
                  value={educationExpense3}
                  onChange={(e) => setEducationExpense3(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">College Education Expense - Student 4 ($)</label>
                <input
                  type="number"
                  value={educationExpense4}
                  onChange={(e) => setEducationExpense4(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Other Deductibles ($)</label>
                <input
                  type="number"
                  value={otherDeductibles}
                  onChange={(e) => setOtherDeductibles(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">(Job expenses, investment expenses, etc.)</p>
              </div>
            </div>
          </div>
        )}

        {/* Calculate Button */}
        <div className="flex gap-3">
          <button
            onClick={calculateTax}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md flex items-center gap-2"
          >
            Calculate ▶
          </button>
          <button
            onClick={() => {
              // Clear form
              setWages('0');
              setFederalWithheld('0');
              setStateWithheld('0');
              setResult(null);
            }}
            className="px-8 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
          >
            Clear
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          * Tax calculations are estimates based on 2025 federal tax brackets and One Big Beautiful Bill provisions. 
          Consult a tax professional for personalized advice.
        </p>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Exportable Result - Only this will be saved/printed */}
          <div id="tax-result" className="space-y-6">
            {/* Summary Card */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Income Tax Summary</h3>
              </div>
              
              <div className="p-6">
                {/* Income Calculation */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Gross Income:</span>
                    <span className="font-semibold text-gray-900">${result.grossIncome.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  
                  {result.atlDeductions > 0 && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700">ATL Deductions:</span>
                      <span className="font-semibold text-gray-900">-${result.atlDeductions.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center py-2 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Adjusted Gross Income (AGI):</span>
                    <span className="font-bold text-gray-900">${result.agi.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">{result.useItemized ? 'Itemized' : 'Standard'} Deduction:</span>
                    <span className="font-semibold text-gray-900">-${result.totalDeductions.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-t border-gray-300 bg-gray-50 px-4 -mx-6">
                    <span className="font-bold text-gray-900">Taxable Income:</span>
                    <span className="font-bold text-gray-900 text-lg">${result.taxableIncome.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                </div>

                {/* Tax Calculation */}
                <div className="space-y-2 mb-6 pt-6 border-t-2 border-gray-200">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Federal Tax:</span>
                    <span className="font-semibold text-gray-900">${result.federalTaxLiability.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  
                  {result.stateTaxLiability > 0 && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700">State Tax:</span>
                      <span className="font-semibold text-gray-900">${result.stateTaxLiability.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center py-2 text-sm bg-blue-50 px-4 -mx-6 rounded">
                    <span className="text-gray-600">FICA Tax (Info):</span>
                    <span className="font-medium text-gray-600">${result.ficaTaxLiability.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  <div className="text-xs text-gray-500 italic px-4 -mx-6">
                    * FICA already withheld from W-2 wages
                  </div>
                  
                  {result.totalCredits > 0 && (
                    <div className="flex justify-between items-center py-2 mt-2">
                      <span className="text-gray-700">Tax Credits:</span>
                      <span className="font-semibold text-green-700">-${result.totalCredits.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center py-3 border-t border-gray-300 bg-gray-50 px-4 -mx-6">
                    <span className="font-bold text-gray-900">Total Tax Liability:</span>
                    <span className="font-bold text-gray-900 text-lg">${result.totalTaxLiability.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-t-2 border-gray-400 bg-gray-100 px-4 -mx-6">
                    <span className="font-bold text-gray-900 text-lg">Net Tax Liability:</span>
                    <span className="font-bold text-gray-900 text-2xl">${result.netTaxLiability.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                </div>

                {/* Final Result */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-gray-300">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Total Withheld</div>
                    <div className="text-2xl font-bold text-blue-600">${result.totalWithheld.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Net Tax Liability</div>
                    <div className="text-2xl font-bold text-gray-900">${result.netTaxLiability.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">{result.isRefund ? 'Estimated Refund' : 'Amount Owed'}</div>
                    <div className={`text-3xl font-bold ${result.isRefund ? 'text-green-600' : 'text-red-600'}`}>
                      {result.isRefund ? '+' : '-'}${Math.abs(result.refundOrOwed).toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </div>
                  </div>
                </div>

                {/* Tax Rates */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Effective Tax Rate</div>
                    <div className="text-2xl font-bold text-blue-600">{result.effectiveTaxRate.toFixed(2)}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Marginal Tax Rate</div>
                    <div className="text-2xl font-bold text-purple-600">{result.marginalTaxRate.toFixed(0)}%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Federal Tax Breakdown */}
              {result.breakdown.federalTaxBrackets.length > 0 && (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h4 className="font-bold text-gray-900">Federal Tax Brackets</h4>
                  </div>
                  <div className="p-4 space-y-2">
                    {result.breakdown.federalTaxBrackets.map((bracket, index) => (
                      <div key={index} className="py-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">{(bracket.rate * 100).toFixed(0)}% bracket:</span>
                          <span className="font-semibold text-gray-900">${bracket.amount.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          On ${bracket.income.toLocaleString(undefined, {maximumFractionDigits: 0})} of income
                        </div>
                      </div>
                    ))}
                    <div className="pt-2 mt-2 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">Total Federal:</span>
                        <span className="font-bold text-gray-900">${result.federalTaxLiability.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FICA Breakdown */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-bold text-gray-900">FICA Tax Breakdown</h4>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-700">Social Security (6.2%):</span>
                    <span className="font-semibold text-gray-900">${result.breakdown.socialSecurity.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-700">Medicare (1.45%+):</span>
                    <span className="font-semibold text-gray-900">${result.breakdown.medicare.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Total FICA:</span>
                      <span className="font-bold text-gray-900">${result.ficaTaxLiability.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ATL Deductions Detail */}
              {Object.keys(result.breakdown.atlDeductionsDetail).length > 0 && (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h4 className="font-bold text-gray-900">Above-the-Line Deductions</h4>
                  </div>
                  <div className="p-4 space-y-2">
                    {Object.entries(result.breakdown.atlDeductionsDetail).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-700">{key}:</span>
                        <span className="font-semibold text-gray-900">${value.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                      </div>
                    ))}
                    <div className="pt-2 mt-2 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">Total ATL:</span>
                        <span className="font-bold text-gray-900">${result.atlDeductions.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tax Credits Detail */}
              {Object.keys(result.breakdown.creditsDetail).length > 0 && (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h4 className="font-bold text-gray-900">Tax Credits</h4>
                  </div>
                  <div className="p-4 space-y-2">
                    {Object.entries(result.breakdown.creditsDetail).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-700">{key}:</span>
                        <span className="font-semibold text-green-700">${value.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                      </div>
                    ))}
                    <div className="pt-2 mt-2 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">Total Credits:</span>
                        <span className="font-bold text-green-700">${result.totalCredits.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* End of exportable content */}

          {/* Action Buttons - Not included in export */}
          <div className="flex flex-wrap gap-3 justify-center print:hidden">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share Result
            </button>
            <button
              onClick={handleSaveImage}
              className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Save as Image
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>

          {/* Tax Saving Tips - Not included in export */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 print:hidden">
            <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Tax Saving Strategies for 2025</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Max out 401(k):</strong> Contribute up to $23,500 (2025) to reduce taxable income</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>HSA Benefits:</strong> Triple tax advantage - $4,300 (single) or $8,550 (family)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>NEW: Tips Deduction:</strong> Deduct up to $25,000 in qualified tips (2025-2028)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>NEW: Overtime Deduction:</strong> Deduct up to $12,500 (single)/$25,000 (married)</span>
                </li>
              </ul>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>NEW: Car Loan Interest:</strong> Deduct up to $10,000 in interest (2025-2028)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>NEW: Seniors Deduction:</strong> Age 65+? Claim $6,000 (single)/$12,000 (married)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Itemize if beneficial:</strong> Your threshold is ${standardDeductions2025[filingStatus].toLocaleString()}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Tax Credits:</strong> Child Tax Credit ($2,200), Education Credits directly reduce tax</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Prompt when no calculation */}
      {!result && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-600 text-lg">
            Modify the values above and click the <strong>Calculate</strong> button to see your tax refund or amount owed
          </p>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Income Tax Calculator"
      />
    </div>
  );
}
