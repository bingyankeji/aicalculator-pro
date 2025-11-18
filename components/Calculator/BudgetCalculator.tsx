'use client';

import { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calculator, Share2, Download, Printer } from 'lucide-react';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
import html2canvas from 'html2canvas';

export default function BudgetCalculator() {
  // 收入
  const [salary, setSalary] = useState(80000);
  const [salaryPeriod, setSalaryPeriod] = useState<'Year' | 'Month'>('Year');
  const [pension, setPension] = useState(0);
  const [pensionPeriod, setPensionPeriod] = useState<'Year' | 'Month'>('Year');
  const [investments, setInvestments] = useState(1000);
  const [investmentsPeriod, setInvestmentsPeriod] = useState<'Year' | 'Month'>('Year');
  const [otherIncome, setOtherIncome] = useState(2000);
  const [otherIncomePeriod, setOtherIncomePeriod] = useState<'Year' | 'Month'>('Year');
  const [taxRate, setTaxRate] = useState(28);

  // Housing & Utilities
  const [mortgage, setMortgage] = useState(0);
  const [mortgagePeriod, setMortgagePeriod] = useState<'Year' | 'Month'>('Month');
  const [propertyTax, setPropertyTax] = useState(0);
  const [propertyTaxPeriod, setPropertyTaxPeriod] = useState<'Year' | 'Month'>('Year');
  const [rental, setRental] = useState(1400);
  const [rentalPeriod, setRentalPeriod] = useState<'Year' | 'Month'>('Month');
  const [insurance, setInsurance] = useState(200);
  const [insurancePeriod, setInsurancePeriod] = useState<'Year' | 'Month'>('Year');
  const [hoaFee, setHoaFee] = useState(0);
  const [hoaFeePeriod, setHoaFeePeriod] = useState<'Year' | 'Month'>('Year');
  const [homeMaintenance, setHomeMaintenance] = useState(0);
  const [homeMaintenancePeriod, setHomeMaintenancePeriod] = useState<'Year' | 'Month'>('Month');
  const [utilities, setUtilities] = useState(250);
  const [utilitiesPeriod, setUtilitiesPeriod] = useState<'Year' | 'Month'>('Month');

  // Transportation
  const [autoLoan, setAutoLoan] = useState(250);
  const [autoLoanPeriod, setAutoLoanPeriod] = useState<'Year' | 'Month'>('Month');
  const [autoInsurance, setAutoInsurance] = useState(700);
  const [autoInsurancePeriod, setAutoInsurancePeriod] = useState<'Year' | 'Month'>('Year');
  const [gasoline, setGasoline] = useState(100);
  const [gasolinePeriod, setGasolinePeriod] = useState<'Year' | 'Month'>('Month');
  const [autoMaintenance, setAutoMaintenance] = useState(600);
  const [autoMaintenancePeriod, setAutoMaintenancePeriod] = useState<'Year' | 'Month'>('Year');
  const [parking, setParking] = useState(20);
  const [parkingPeriod, setParkingPeriod] = useState<'Year' | 'Month'>('Month');
  const [otherTransport, setOtherTransport] = useState(0);
  const [otherTransportPeriod, setOtherTransportPeriod] = useState<'Year' | 'Month'>('Month');

  // Debt & Loan Payments
  const [creditCard, setCreditCard] = useState(0);
  const [creditCardPeriod, setCreditCardPeriod] = useState<'Year' | 'Month'>('Month');
  const [studentLoan, setStudentLoan] = useState(250);
  const [studentLoanPeriod, setStudentLoanPeriod] = useState<'Year' | 'Month'>('Month');
  const [otherLoans, setOtherLoans] = useState(0);
  const [otherLoansPeriod, setOtherLoansPeriod] = useState<'Year' | 'Month'>('Month');

  // Living Expenses
  const [food, setFood] = useState(400);
  const [foodPeriod, setFoodPeriod] = useState<'Year' | 'Month'>('Month');
  const [clothing, setClothing] = useState(100);
  const [clothingPeriod, setClothingPeriod] = useState<'Year' | 'Month'>('Month');
  const [household, setHousehold] = useState(100);
  const [householdPeriod, setHouseholdPeriod] = useState<'Year' | 'Month'>('Month');
  const [mealsOut, setMealsOut] = useState(200);
  const [mealsOutPeriod, setMealsOutPeriod] = useState<'Year' | 'Month'>('Month');
  const [livingOther, setLivingOther] = useState(200);
  const [livingOtherPeriod, setLivingOtherPeriod] = useState<'Year' | 'Month'>('Month');

  // Healthcare
  const [medicalInsurance, setMedicalInsurance] = useState(0);
  const [medicalInsurancePeriod, setMedicalInsurancePeriod] = useState<'Year' | 'Month'>('Month');
  const [medicalSpending, setMedicalSpending] = useState(200);
  const [medicalSpendingPeriod, setMedicalSpendingPeriod] = useState<'Year' | 'Month'>('Month');

  // Children & Education
  const [childCare, setChildCare] = useState(0);
  const [childCarePeriod, setChildCarePeriod] = useState<'Year' | 'Month'>('Month');
  const [tuition, setTuition] = useState(0);
  const [tuitionPeriod, setTuitionPeriod] = useState<'Year' | 'Month'>('Month');
  const [childSupport, setChildSupport] = useState(0);
  const [childSupportPeriod, setChildSupportPeriod] = useState<'Year' | 'Month'>('Month');
  const [educationOther, setEducationOther] = useState(100);
  const [educationOtherPeriod, setEducationOtherPeriod] = useState<'Year' | 'Month'>('Month');

  // Savings & Investments
  const [retirement401k, setRetirement401k] = useState(10000);
  const [retirement401kPeriod, setRetirement401kPeriod] = useState<'Year' | 'Month'>('Year');
  const [collegeSaving, setCollegeSaving] = useState(0);
  const [collegeSavingPeriod, setCollegeSavingPeriod] = useState<'Year' | 'Month'>('Year');
  const [investmentsSavings, setInvestmentsSavings] = useState(0);
  const [investmentsSavingsPeriod, setInvestmentsSavingsPeriod] = useState<'Year' | 'Month'>('Year');
  const [emergencyFund, setEmergencyFund] = useState(0);
  const [emergencyFundPeriod, setEmergencyFundPeriod] = useState<'Year' | 'Month'>('Month');

  // Miscellaneous
  const [pet, setPet] = useState(200);
  const [petPeriod, setPetPeriod] = useState<'Year' | 'Month'>('Month');
  const [gifts, setGifts] = useState(300);
  const [giftsPeriod, setGiftsPeriod] = useState<'Year' | 'Month'>('Year');
  const [hobbies, setHobbies] = useState(100);
  const [hobbiesPeriod, setHobbiesPeriod] = useState<'Year' | 'Month'>('Month');
  const [entertainment, setEntertainment] = useState(100);
  const [entertainmentPeriod, setEntertainmentPeriod] = useState<'Year' | 'Month'>('Month');
  const [travel, setTravel] = useState(2000);
  const [travelPeriod, setTravelPeriod] = useState<'Year' | 'Month'>('Year');
  const [miscOther, setMiscOther] = useState(100);
  const [miscOtherPeriod, setMiscOtherPeriod] = useState<'Year' | 'Month'>('Month');

  const [result, setResult] = useState<any>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // 分享功能
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/budget-calculator',
    getShareParams: () => {
      if (!result) return {};
      return {
        income: result.totalBeforeTaxAnnual.toString(),
        expenses: result.totalExpensesAnnual.toString(),
      };
    },
    getShareText: () => {
      if (!result) return 'Create your budget with this professional calculator!';
      return `My budget: $${result.totalAfterTaxAnnual.toFixed(0)}/year income, $${result.totalExpensesAnnual.toFixed(0)} expenses. DTI: ${result.dtiRatio.toFixed(1)}%`;
    },
  });

  // 转换为年度金额
  const toAnnual = (amount: number, period: 'Year' | 'Month') => {
    return period === 'Month' ? amount * 12 : amount;
  };

  // 计算
  const handleCalculate = () => {
    // 收入（年度）
    const salaryAnnual = toAnnual(salary, salaryPeriod);
    const pensionAnnual = toAnnual(pension, pensionPeriod);
    const investmentsAnnual = toAnnual(investments, investmentsPeriod);
    const otherIncomeAnnual = toAnnual(otherIncome, otherIncomePeriod);
    const totalBeforeTaxAnnual = salaryAnnual + pensionAnnual + investmentsAnnual + otherIncomeAnnual;
    const taxAmount = totalBeforeTaxAnnual * (taxRate / 100);
    const totalAfterTaxAnnual = totalBeforeTaxAnnual - taxAmount;

    // 支出（年度）
    const housingAnnual = toAnnual(mortgage, mortgagePeriod) + toAnnual(propertyTax, propertyTaxPeriod) +
      toAnnual(rental, rentalPeriod) + toAnnual(insurance, insurancePeriod) +
      toAnnual(hoaFee, hoaFeePeriod) + toAnnual(homeMaintenance, homeMaintenancePeriod) +
      toAnnual(utilities, utilitiesPeriod);

    const transportAnnual = toAnnual(autoLoan, autoLoanPeriod) + toAnnual(autoInsurance, autoInsurancePeriod) +
      toAnnual(gasoline, gasolinePeriod) + toAnnual(autoMaintenance, autoMaintenancePeriod) +
      toAnnual(parking, parkingPeriod) + toAnnual(otherTransport, otherTransportPeriod);

    const debtAnnual = toAnnual(creditCard, creditCardPeriod) + toAnnual(studentLoan, studentLoanPeriod) +
      toAnnual(otherLoans, otherLoansPeriod);

    const livingAnnual = toAnnual(food, foodPeriod) + toAnnual(clothing, clothingPeriod) +
      toAnnual(household, householdPeriod) + toAnnual(mealsOut, mealsOutPeriod) +
      toAnnual(livingOther, livingOtherPeriod);

    const healthcareAnnual = toAnnual(medicalInsurance, medicalInsurancePeriod) +
      toAnnual(medicalSpending, medicalSpendingPeriod);

    const childrenAnnual = toAnnual(childCare, childCarePeriod) + toAnnual(tuition, tuitionPeriod) +
      toAnnual(childSupport, childSupportPeriod) + toAnnual(educationOther, educationOtherPeriod);

    const savingsAnnual = toAnnual(retirement401k, retirement401kPeriod) +
      toAnnual(collegeSaving, collegeSavingPeriod) + toAnnual(investmentsSavings, investmentsSavingsPeriod) +
      toAnnual(emergencyFund, emergencyFundPeriod);

    const miscAnnual = toAnnual(pet, petPeriod) + toAnnual(gifts, giftsPeriod) +
      toAnnual(hobbies, hobbiesPeriod) + toAnnual(entertainment, entertainmentPeriod) +
      toAnnual(travel, travelPeriod) + toAnnual(miscOther, miscOtherPeriod);

    const totalExpensesAnnual = housingAnnual + transportAnnual + debtAnnual + livingAnnual +
      healthcareAnnual + childrenAnnual + savingsAnnual + miscAnnual;

    const netAnnual = totalAfterTaxAnnual - totalExpensesAnnual;

    // DTI计算
    const monthlyDebt = debtAnnual / 12;
    const monthlyGrossIncome = totalBeforeTaxAnnual / 12;
    const monthlyHousing = housingAnnual / 12;
    const dtiRatio = (monthlyDebt / monthlyGrossIncome) * 100;
    const frontEndDTI = (monthlyHousing / monthlyGrossIncome) * 100;

    // 支出分类
    const categories = [
      { name: 'Housing & Utilities', annual: housingAnnual, color: '#4A90E2' },
      { name: 'Transportation', annual: transportAnnual, color: '#E27A4A' },
      { name: 'Other Debt & Loan Payments', annual: debtAnnual, color: '#C73E4A' },
      { name: 'Living Expenses', annual: livingAnnual, color: '#5BC0EB' },
      { name: 'Healthcare', annual: healthcareAnnual, color: '#E24A7A' },
      { name: 'Children & Education', annual: childrenAnnual, color: '#C44AE2' },
      { name: 'Savings & Investments', annual: savingsAnnual, color: '#4AE282' },
      { name: 'Miscellaneous Expenses', annual: miscAnnual, color: '#9B9B9B' },
    ].filter(cat => cat.annual > 0).map(cat => ({
      ...cat,
      percent: (cat.annual / totalExpensesAnnual) * 100,
      percentOfIncome: (cat.annual / totalBeforeTaxAnnual) * 100,
    }));

    // 特殊项（Food & Meals Out）
    const foodAndMealsOutAnnual = toAnnual(food, foodPeriod) + toAnnual(mealsOut, mealsOutPeriod);

    setResult({
      totalBeforeTaxAnnual,
      totalAfterTaxAnnual,
      totalExpensesAnnual,
      netAnnual,
      dtiRatio,
      frontEndDTI,
      categories,
      housingAnnual,
      transportAnnual,
      livingAnnual,
      foodAndMealsOutAnnual,
      debtAnnual,
      healthcareAnnual,
      childrenAnnual,
      savingsAnnual,
      miscAnnual,
    });
  };

  // 格式化货币
  const fc = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // 保存为图片
  const handleSaveAsImage = async () => {
    if (resultRef.current) {
      const canvas = await html2canvas(resultRef.current);
      const link = document.createElement('a');
      link.download = 'budget-report.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // 打印
  const handlePrint = () => {
    window.print();
  };

  // 输入组件
  const InputRow = ({ 
    label, 
    value, 
    onChange, 
    period, 
    onPeriodChange,
    hint 
  }: any) => (
    <div className="grid grid-cols-[180px,1fr] gap-2 items-center">
      <Label className="text-xs text-gray-700">{label}</Label>
      <div className="flex gap-1 items-center">
        <div className="relative flex-1">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="h-8 text-xs pl-5 pr-1 bg-white border-gray-300"
          />
        </div>
        <span className="text-gray-400 text-xs">/</span>
        <select
          value={period}
          onChange={(e) => onPeriodChange(e.target.value)}
          className="h-8 text-xs bg-white border border-gray-300 rounded px-2 min-w-[70px]"
        >
          <option>Month</option>
          <option>Year</option>
        </select>
        {hint && <span className="text-xs text-gray-500 ml-2">{hint}</span>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr,420px] gap-6">
          {/* 左侧：输入 */}
          <div className="space-y-4">
            {/* 收入 */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 p-3">
                <CardTitle className="text-white text-sm">Incomes (Before Tax)</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-2 bg-gray-100">
                <InputRow label="Salary & Earned Income" value={salary} onChange={setSalary} period={salaryPeriod} onPeriodChange={setSalaryPeriod} />
                <InputRow label="Pension & Social Security" value={pension} onChange={setPension} period={pensionPeriod} onPeriodChange={setPensionPeriod} />
                <InputRow label="Investments & Savings" value={investments} onChange={setInvestments} period={investmentsPeriod} onPeriodChange={setInvestmentsPeriod} hint="interest, capital gain, dividend, rental income..." />
                <InputRow label="Other Income" value={otherIncome} onChange={setOtherIncome} period={otherIncomePeriod} onPeriodChange={setOtherIncomePeriod} hint="gift, alimony, child support, tax return..." />
                <div className="grid grid-cols-[180px,1fr] gap-2 items-center pt-2">
                  <Label className="text-xs text-gray-700">Income Tax Rate:</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="h-8 text-xs bg-white border-gray-300 w-20"
                    />
                    <span className="text-xs text-gray-600">% federal + state + local</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expenses标题 */}
            <div className="bg-blue-600 text-white px-3 py-2 rounded">
              <h3 className="text-sm font-semibold">Expenses</h3>
            </div>

            {/* Housing & Utilities */}
            <Card>
              <CardHeader className="bg-gray-700 p-2">
                <CardTitle className="text-white text-xs">Housing & Utilities</CardTitle>
              </CardHeader>
              <CardContent className="pt-3 space-y-2 bg-gray-100">
                <InputRow label="Mortgage" value={mortgage} onChange={setMortgage} period={mortgagePeriod} onPeriodChange={setMortgagePeriod} />
                <InputRow label="Property Tax" value={propertyTax} onChange={setPropertyTax} period={propertyTaxPeriod} onPeriodChange={setPropertyTaxPeriod} />
                <InputRow label="Rental" value={rental} onChange={setRental} period={rentalPeriod} onPeriodChange={setRentalPeriod} />
                <InputRow label="Insurance" value={insurance} onChange={setInsurance} period={insurancePeriod} onPeriodChange={setInsurancePeriod} hint="home owner, renters, home warranty, etc." />
                <InputRow label="HOA/Co-Op Fee" value={hoaFee} onChange={setHoaFee} period={hoaFeePeriod} onPeriodChange={setHoaFeePeriod} />
                <InputRow label="Home Maintenance" value={homeMaintenance} onChange={setHomeMaintenance} period={homeMaintenancePeriod} onPeriodChange={setHomeMaintenancePeriod} hint="repair, landscape, cleaning, furniture, appliance..." />
                <InputRow label="Utilities" value={utilities} onChange={setUtilities} period={utilitiesPeriod} onPeriodChange={setUtilitiesPeriod} hint="electricity, gas, water, phone, cable, heating..." />
              </CardContent>
            </Card>

            {/* Transportation */}
            <Card>
              <CardHeader className="bg-gray-700 p-2">
                <CardTitle className="text-white text-xs">Transportation</CardTitle>
              </CardHeader>
              <CardContent className="pt-3 space-y-2 bg-gray-100">
                <InputRow label="Auto Loan" value={autoLoan} onChange={setAutoLoan} period={autoLoanPeriod} onPeriodChange={setAutoLoanPeriod} />
                <InputRow label="Auto Insurance" value={autoInsurance} onChange={setAutoInsurance} period={autoInsurancePeriod} onPeriodChange={setAutoInsurancePeriod} />
                <InputRow label="Gasoline" value={gasoline} onChange={setGasoline} period={gasolinePeriod} onPeriodChange={setGasolinePeriod} />
                <InputRow label="Auto Maintenance" value={autoMaintenance} onChange={setAutoMaintenance} period={autoMaintenancePeriod} onPeriodChange={setAutoMaintenancePeriod} />
                <InputRow label="Parking/Tolls" value={parking} onChange={setParking} period={parkingPeriod} onPeriodChange={setParkingPeriod} />
                <InputRow label="Other Transportation Costs" value={otherTransport} onChange={setOtherTransport} period={otherTransportPeriod} onPeriodChange={setOtherTransportPeriod} hint="ticket, taxi, registration, etc." />
              </CardContent>
            </Card>

            {/* Other Debt & Loan Payments */}
            <Card>
              <CardHeader className="bg-gray-700 p-2">
                <CardTitle className="text-white text-xs">Other Debt & Loan Payments</CardTitle>
              </CardHeader>
              <CardContent className="pt-3 space-y-2 bg-gray-100">
                <InputRow label="Credit Card" value={creditCard} onChange={setCreditCard} period={creditCardPeriod} onPeriodChange={setCreditCardPeriod} hint="the recurring part to payback balance only" />
                <InputRow label="Student Loan" value={studentLoan} onChange={setStudentLoan} period={studentLoanPeriod} onPeriodChange={setStudentLoanPeriod} />
                <InputRow label="Other Loans & Liabilities" value={otherLoans} onChange={setOtherLoans} period={otherLoansPeriod} onPeriodChange={setOtherLoansPeriod} hint="personal loan, store card, etc." />
              </CardContent>
            </Card>

            {/* Living Expenses */}
            <Card>
              <CardHeader className="bg-gray-700 p-2">
                <CardTitle className="text-white text-xs">Living Expenses</CardTitle>
              </CardHeader>
              <CardContent className="pt-3 space-y-2 bg-gray-100">
                <InputRow label="Food" value={food} onChange={setFood} period={foodPeriod} onPeriodChange={setFoodPeriod} />
                <InputRow label="Clothing" value={clothing} onChange={setClothing} period={clothingPeriod} onPeriodChange={setClothingPeriod} />
                <InputRow label="Household Supplies" value={household} onChange={setHousehold} period={householdPeriod} onPeriodChange={setHouseholdPeriod} />
                <InputRow label="Meals Out" value={mealsOut} onChange={setMealsOut} period={mealsOutPeriod} onPeriodChange={setMealsOutPeriod} />
                <InputRow label="Other" value={livingOther} onChange={setLivingOther} period={livingOtherPeriod} onPeriodChange={setLivingOtherPeriod} hint="laundry, barber, beauty, alcohol, tobacco, etc." />
              </CardContent>
            </Card>

            {/* Healthcare */}
            <Card>
              <CardHeader className="bg-gray-700 p-2">
                <CardTitle className="text-white text-xs">Healthcare</CardTitle>
              </CardHeader>
              <CardContent className="pt-3 space-y-2 bg-gray-100">
                <InputRow label="Medical Insurance" value={medicalInsurance} onChange={setMedicalInsurance} period={medicalInsurancePeriod} onPeriodChange={setMedicalInsurancePeriod} />
                <InputRow label="Medical Spending" value={medicalSpending} onChange={setMedicalSpending} period={medicalSpendingPeriod} onPeriodChange={setMedicalSpendingPeriod} hint="copay, uncovered doctor visit or drugs, etc." />
              </CardContent>
            </Card>

            {/* Children & Education */}
            <Card>
              <CardHeader className="bg-gray-700 p-2">
                <CardTitle className="text-white text-xs">Children & Education</CardTitle>
              </CardHeader>
              <CardContent className="pt-3 space-y-2 bg-gray-100">
                <InputRow label="Child & Personal Care" value={childCare} onChange={setChildCare} period={childCarePeriod} onPeriodChange={setChildCarePeriod} />
                <InputRow label="Tuition & Supplies" value={tuition} onChange={setTuition} period={tuitionPeriod} onPeriodChange={setTuitionPeriod} />
                <InputRow label="Child Support Payments" value={childSupport} onChange={setChildSupport} period={childSupportPeriod} onPeriodChange={setChildSupportPeriod} />
                <InputRow label="Other Spending" value={educationOther} onChange={setEducationOther} period={educationOtherPeriod} onPeriodChange={setEducationOtherPeriod} hint="book, software, magazine, device, etc." />
              </CardContent>
            </Card>

            {/* Savings & Investments */}
            <Card>
              <CardHeader className="bg-gray-700 p-2">
                <CardTitle className="text-white text-xs">Savings & Investments</CardTitle>
              </CardHeader>
              <CardContent className="pt-3 space-y-2 bg-gray-100">
                <InputRow label="401k & IRA" value={retirement401k} onChange={setRetirement401k} period={retirement401kPeriod} onPeriodChange={setRetirement401kPeriod} hint="before tax contribution" />
                <InputRow label="College Saving" value={collegeSaving} onChange={setCollegeSaving} period={collegeSavingPeriod} onPeriodChange={setCollegeSavingPeriod} hint="before tax contribution" />
                <InputRow label="Investments" value={investmentsSavings} onChange={setInvestmentsSavings} period={investmentsSavingsPeriod} onPeriodChange={setInvestmentsSavingsPeriod} hint="stock, bond, funds, real estate, etc." />
                <InputRow label="Emergency Fund & Other" value={emergencyFund} onChange={setEmergencyFund} period={emergencyFundPeriod} onPeriodChange={setEmergencyFundPeriod} hint="savings, CD, house or major purchase, etc." />
              </CardContent>
            </Card>

            {/* Miscellaneous Expenses */}
            <Card>
              <CardHeader className="bg-gray-700 p-2">
                <CardTitle className="text-white text-xs">Miscellaneous Expenses</CardTitle>
              </CardHeader>
              <CardContent className="pt-3 space-y-2 bg-gray-100">
                <InputRow label="Pet" value={pet} onChange={setPet} period={petPeriod} onPeriodChange={setPetPeriod} />
                <InputRow label="Gifts & Donations" value={gifts} onChange={setGifts} period={giftsPeriod} onPeriodChange={setGiftsPeriod} />
                <InputRow label="Hobbies & Sports" value={hobbies} onChange={setHobbies} period={hobbiesPeriod} onPeriodChange={setHobbiesPeriod} hint="Including tickets, gym membership, etc." />
                <InputRow label="Entertainment & Tickets" value={entertainment} onChange={setEntertainment} period={entertainmentPeriod} onPeriodChange={setEntertainmentPeriod} />
                <InputRow label="Travel & Vacation" value={travel} onChange={setTravel} period={travelPeriod} onPeriodChange={setTravelPeriod} />
                <InputRow label="Other Expenses" value={miscOther} onChange={setMiscOther} period={miscOtherPeriod} onPeriodChange={setMiscOtherPeriod} />
              </CardContent>
            </Card>

            {/* 按钮 */}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleCalculate} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button onClick={() => window.location.reload()} variant="outline" className="px-8">
                Clear
              </Button>
            </div>
          </div>

          {/* 右侧：结果 */}
          {result && (
            <div ref={resultRef} className="space-y-4">
              <Card>
                <CardHeader className="bg-green-600 p-3">
                  <CardTitle className="flex items-center justify-between text-white">
                    <span className="text-sm">Results</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={handleSaveAsImage} className="h-7 px-2 bg-white/20 hover:bg-white/30 border-white/30 text-white">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handlePrint} className="h-7 px-2 bg-white/20 hover:bg-white/30 border-white/30 text-white">
                        <Printer className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleShare} className="h-7 px-2 bg-white/20 hover:bg-white/30 border-white/30 text-white">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {/* Summary */}
                  <div>
                    <h3 className="font-semibold text-sm mb-2">Summary</h3>
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-blue-600 text-white">
                          <th className="p-2 text-left"></th>
                          <th className="p-2 text-right">Annual</th>
                          <th className="p-2 text-right">Monthly</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs">
                        <tr className="bg-gray-50">
                          <td className="p-2">Total Before Tax Income</td>
                          <td className="p-2 text-right font-semibold">{fc(result.totalBeforeTaxAnnual)}</td>
                          <td className="p-2 text-right font-semibold">{fc(result.totalBeforeTaxAnnual / 12)}</td>
                        </tr>
                        <tr>
                          <td className="p-2">Total After Tax Income</td>
                          <td className="p-2 text-right font-semibold">{fc(result.totalAfterTaxAnnual)}</td>
                          <td className="p-2 text-right font-semibold">{fc(result.totalAfterTaxAnnual / 12)}</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="p-2">Total Expenses</td>
                          <td className="p-2 text-right font-semibold">{fc(result.totalExpensesAnnual)}</td>
                          <td className="p-2 text-right font-semibold">{fc(result.totalExpensesAnnual / 12)}</td>
                        </tr>
                        <tr className="border-t-2">
                          <td className="p-2 font-bold">Net {result.netAnnual < 0 ? '(Deficit)' : ''}</td>
                          <td className={`p-2 text-right font-bold ${result.netAnnual >= 0 ? 'text-blue-600' : 'text-red-600'}`}>{fc(result.netAnnual)}</td>
                          <td className={`p-2 text-right font-bold ${result.netAnnual >= 0 ? 'text-blue-600' : 'text-red-600'}`}>{fc(result.netAnnual / 12)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* DTI */}
                  <div>
                    <h3 className="font-semibold text-sm mb-2">Debt-to-Income (DTI) Ratio</h3>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>DTI Ratio</span>
                        <span className="font-semibold">{result.dtiRatio.toFixed(2)}% <span className="text-gray-600">{result.dtiRatio < 36 ? 'Your DTI ratio is good.' : 'Your DTI ratio is high.'}</span></span>
                      </div>
                      <div className="flex justify-between">
                        <span>Front-End DTI Ratio</span>
                        <span className="font-semibold">{result.frontEndDTI.toFixed(2)}% <span className="text-gray-600">housing costs by gross income</span></span>
                      </div>
                    </div>
                  </div>

                  {/* 饼图 */}
                  <div>
                    <h3 className="font-semibold text-sm mb-3">Expenses Breakdown</h3>
                    <div className="flex justify-center mb-4">
                      <svg width="180" height="180" viewBox="0 0 180 180">
                        {result.categories.reduce((acc: any[], cat: any, i: number) => {
                          const prevPercent = i === 0 ? 0 : acc[i - 1].endPercent;
                          const startAngle = (prevPercent / 100) * 360;
                          const endAngle = startAngle + (cat.percent / 100) * 360;
                          const startRad = (startAngle - 90) * Math.PI / 180;
                          const endRad = (endAngle - 90) * Math.PI / 180;
                          const x1 = 90 + 70 * Math.cos(startRad);
                          const y1 = 90 + 70 * Math.sin(startRad);
                          const x2 = 90 + 70 * Math.cos(endRad);
                          const y2 = 90 + 70 * Math.sin(endRad);
                          const largeArc = cat.percent > 50 ? 1 : 0;
                          
                          acc.push({
                            ...cat,
                            endPercent: prevPercent + cat.percent,
                            path: `M 90 90 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`
                          });
                          return acc;
                        }, []).map((cat, i) => (
                          <path key={i} d={cat.path} fill={cat.color} />
                        ))}
                        <circle cx="90" cy="90" r="40" fill="white" />
                      </svg>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {result.categories.map((cat: any, i: number) => (
                        <div key={i} className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded" style={{ backgroundColor: cat.color }}></div>
                          <span className="text-xs">{cat.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 详细支出表 */}
                  <div>
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-blue-600 text-white">
                          <th className="p-2 text-left"></th>
                          <th className="p-2 text-right">Annual</th>
                          <th className="p-2 text-right">Monthly</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.categories.map((cat: any, i: number) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                            <td className="p-2">{cat.name}</td>
                            <td className="p-2 text-right font-semibold">{fc(cat.annual)}</td>
                            <td className="p-2 text-right">{fc(cat.annual / 12)} <span className="text-gray-600">{cat.percentOfIncome.toFixed(2)}% of income</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Budget Calculator"
      />
    </div>
  );
}
