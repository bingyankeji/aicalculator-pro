import { Metadata } from "next";
import { getUrl, getOgImage } from '@/config/site';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from "next/link";
import { EMICalculator } from "@/components/Calculator/EMICalculator";

export const metadata: Metadata = {
  title: "EMI Calculator (Free, No signup) - Monthly EMI | AICalculator",
  description: "Free EMI calculator with no sign-up required. Calculate EMI for home loans, car loans, and personal loans instantly. Get detailed breakup of principal and interest with amortization schedule. Includes DTI ratio analysis for affordability assessment.",
  keywords: [
    "emi calculator",
    "free emi calculator",
    "emi calculator no signup",
    "loan emi calculator",
    "home loan emi calculator",
    "car loan emi calculator",
    "personal loan emi calculator",
    "equated monthly installment calculator",
    "loan calculator",
    "monthly payment calculator",
    "emi calculator with interest rate",
    "emi calculator online",
    "free emi calculator",
    "dti ratio calculator",
    "amortization calculator",
    "loan repayment calculator",
    "monthly loan payment calculator"
  ],
  openGraph: {
    title: "EMI Calculator (Free, No signup) - AICalculator",
    description: "Free EMI calculator with no sign-up required. For home loans, car loans, and personal loans. Get instant EMI calculations with detailed principal and interest breakup.",
    type: "website",
    url: getUrl('/emi-calculator'),
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMI Calculator (Free, No signup) - AICalculator",
    description: "Free EMI calculator with no sign-up required. Calculate EMI for all types of loans with detailed amortization schedule and affordability analysis.",
    site: "@aicalculator",
  },
  alternates: {
    canonical: getUrl('/emi-calculator'),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'last-modified': new Date().toISOString(),
  },
};

export default function EMICalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "EMI Calculator",
        "url": getUrl('/emi-calculator'),
        "description": "Free online EMI calculator to compute Equated Monthly Installment for home loans, car loans, and personal loans with detailed amortization schedule and affordability analysis.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate EMI for home loans, car loans, and personal loans",
          "Detailed principal and interest breakup",
          "Complete amortization schedule",
          "Debt-to-Income (DTI) ratio analysis",
          "Affordability assessment",
          "Total interest calculation",
          "Share results via social media",
          "Export calculations as images",
          "Print-friendly calculation reports",
          "Real-time EMI calculation"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": getUrl('/')
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Financial",
            "item": getUrl('/financial')
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "EMI Calculator",
            "item": getUrl('/emi-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is EMI and how is it calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each month. EMI is calculated using the formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1], where P is the principal loan amount, R is the monthly interest rate (annual rate ÷ 12 ÷ 100), and N is the loan tenure in months. For example, a $300,000 loan at 6.5% annual interest for 30 years results in an EMI of approximately $1,896."
            }
          },
          {
            "@type": "Question",
            "name": "What is a good EMI to income ratio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Financial experts recommend keeping your EMI to income ratio (also called Debt-to-Income or DTI ratio) below 40% of your monthly income. Ideally, it should be below 30-35% to maintain financial stability. If your EMI exceeds 50% of your income, it's considered risky as it leaves little room for other expenses, savings, and emergencies. Banks typically approve loans where EMI doesn't exceed 40-50% of your net monthly income."
            }
          },
          {
            "@type": "Question",
            "name": "How can I reduce my EMI amount?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can reduce your EMI in several ways: 1) Increase your down payment to reduce the principal loan amount. 2) Negotiate a lower interest rate with your lender. 3) Extend the loan tenure (though this increases total interest paid). 4) Make prepayments whenever possible to reduce principal. 5) Compare offers from multiple banks to find the best interest rate. 6) Improve your credit score (above 750) to qualify for better rates. For home loans, even a 0.5% reduction in interest rate can save thousands of dollars over the loan tenure."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between flat rate and reducing balance interest?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In flat rate interest, interest is calculated on the original principal amount throughout the loan tenure. In reducing balance (most common for EMIs), interest is calculated on the outstanding principal, which decreases with each payment. Reducing balance results in lower overall interest. For example, on a $100,000 loan at 10% for 5 years: Flat rate EMI ≈ $2,500 with total interest $50,000, while reducing balance EMI ≈ $2,125 with total interest $27,500. Always check which method your lender uses."
            }
          },
          {
            "@type": "Question",
            "name": "Should I choose a longer or shorter loan tenure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Shorter tenure (5-10 years) means higher EMI but lower total interest paid, helping you become debt-free faster. Longer tenure (15-30 years) means lower EMI but significantly higher total interest. Choose based on your financial situation: If you have high disposable income and want to save on interest, choose shorter tenure. If you need manageable monthly payments and want financial flexibility, choose longer tenure. You can always prepay to reduce tenure later. For home loans, longer tenure (20-25 years) is common; for car/personal loans, 3-7 years is typical."
            }
          },
          {
            "@type": "Question",
            "name": "What is an amortization schedule?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An amortization schedule is a complete table showing each EMI payment broken down into principal and interest components, along with the remaining loan balance. In the early years of a loan, a larger portion of your EMI goes toward interest, and a smaller portion toward principal. As the loan progresses, this ratio reverses. For example, on a $300,000 loan at 6.5% for 30 years, your first EMI of $1,896 might have $1,625 as interest and only $271 as principal. The schedule helps you understand how your debt reduces over time."
            }
          },
          {
            "@type": "Question",
            "name": "Can I prepay my loan to reduce EMI or tenure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, most loans allow prepayment (full or partial) to either reduce EMI or reduce tenure. Prepayment directly reduces your principal, saving you interest. You can typically choose: 1) Reduce EMI while keeping tenure same (better for monthly budget relief), or 2) Reduce tenure while keeping EMI same (pay off debt faster, save more on interest). Home loans often have no prepayment charges after 6-12 months. Personal loans may have 2-4% prepayment penalty. Even small regular prepayments ($5,000-10,000 annually) can reduce your total interest by tens of thousands of dollars and help you become debt-free years earlier."
            }
          },
          {
            "@type": "Question",
            "name": "What documents are needed for a loan application?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard loan documents include: 1) Identity Proof: Aadhaar Card, PAN Card, Passport, or Voter ID. 2) Address Proof: Utility bills, rental agreement, or Aadhaar. 3) Income Proof: Last 6 months' salary slips, 2 years' ITR for self-employed, bank statements. 4) Employment Proof: Employment letter, offer letter, or business registration. 5) For Home Loans: Property documents, sale deed, NOC from builder. 6) For Co-borrowers: All above documents for each co-borrower. 7) Photographs: 2-3 recent passport-size photos. Banks may ask for additional documents based on your profile and loan type."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the EMI Calculator",
        "description": "Step-by-step guide to calculate your Equated Monthly Installment for any loan",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Loan Amount",
            "text": "Input the total loan amount you want to borrow in US Dollars ($). For home loans, this is typically the property price minus your down payment. For car/personal loans, enter the amount you need."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Set Interest Rate",
            "text": "Enter the annual interest rate offered by your lender. Current rates: Home loans 8-10%, Car loans 7-12%, Personal loans 10-18%. Check with your bank for exact rates based on your credit score."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Choose Loan Tenure",
            "text": "Select the loan repayment period in years or months. Home loans: typically 15-30 years. Car loans: 3-7 years. Personal loans: 1-5 years. Longer tenure means lower EMI but higher total interest."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Add Monthly Income (Optional)",
            "text": "Enter your monthly income to calculate Debt-to-Income (DTI) ratio. This helps assess loan affordability. Ideally, EMI should be 30-40% of your monthly income for comfortable repayment."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Calculate and Review Results",
            "text": "Click 'Calculate EMI' to see your monthly payment, total interest, total payment, and DTI ratio. Review the principal vs interest breakup to understand how your money is allocated."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "View Amortization Schedule",
            "text": "Click 'Show Schedule' to see month-by-month breakdown of your payments. This shows how much principal and interest you pay each month and your remaining loan balance."
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h1 className="sr-only">EMI Calculator - Free Equated Monthly Installment Calculator for Home, Car & Personal Loans</h1>

      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="EMI Calculator (Free, No signup)"
        calculatorUrl="/emi-calculator"
      />

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="EMI Calculator Tool">
        <div className="container mx-auto px-4">
          <EMICalculator />
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding EMI and Loan Calculations
            </h2>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Card 1: What is EMI */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>💰</span>
                  What is EMI?
                </h3>
                <p className="text-gray-700 mb-4">
                  EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs consist of both principal and interest components, calculated to ensure the loan is fully repaid by the end of the tenure. Learn more about loan basics from <a href="https://www.consumerfinance.gov/owning-a-home/loan-options/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Consumer Financial Protection Bureau</a>.
                </p>
                <p className="text-gray-700">
                  The EMI amount remains constant throughout the loan tenure, but the proportion of principal and interest changes. Initially, a larger portion goes toward interest, and gradually, more goes toward principal repayment as the outstanding balance decreases.
                </p>
              </div>

              {/* Card 2: EMI Formula */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📐</span>
                  EMI Calculation Formula
                </h3>
                <p className="text-gray-700 mb-3">
                  The standard EMI formula used by banks and financial institutions:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-3 font-mono text-sm">
                  EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>P</strong> = Principal loan amount</li>
                  <li>• <strong>R</strong> = Monthly interest rate (Annual rate ÷ 12 ÷ 100)</li>
                  <li>• <strong>N</strong> = Loan tenure in months</li>
                </ul>
              </div>

              {/* Card 3: Types of Loans */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🏠</span>
                  Common Loan Types
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Home Loans</p>
                    <p className="text-sm text-gray-700">
                      Interest Rate: 6-8% | Tenure: 15-30 years | Loan up to 80-97% of property value
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Car Loans</p>
                    <p className="text-sm text-gray-700">
                      Interest Rate: 5-10% | Tenure: 3-7 years | Loan up to 90% of vehicle price
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Personal Loans</p>
                    <p className="text-sm text-gray-700">
                      Interest Rate: 8-15% | Tenure: 1-5 years | Unsecured, based on creditworthiness
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4: DTI Ratio */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  Debt-to-Income (DTI) Ratio
                </h3>
                <p className="text-gray-700 mb-4">
                  DTI ratio is the percentage of your monthly income that goes toward paying EMIs and other debts. It's a crucial factor banks consider when approving loans.
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>Excellent (&lt;28%):</strong> Highly affordable, strong financial position</li>
                  <li>• <strong>Good (28-36%):</strong> Comfortable repayment capacity</li>
                  <li>• <strong>Fair (36-43%):</strong> Manageable but limited savings</li>
                  <li>• <strong>Risky (&gt;43%):</strong> High financial strain, approval difficult</li>
                </ul>
              </div>

              {/* Card 5: Interest Rates */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📈</span>
                  Factors Affecting Interest Rates
                </h3>
                <p className="text-gray-700 mb-3">Several factors determine your loan interest rate according to <a href="https://www.federalreserve.gov/faqs/credit_12866.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Federal Reserve guidelines</a>:</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Credit Score:</strong> 750+ gets best rates, below 650 faces higher rates</li>
                  <li>• <strong>Income Level:</strong> Higher income = lower risk = better rates</li>
                  <li>• <strong>Loan-to-Value Ratio:</strong> Lower LTV (more down payment) = better rates</li>
                  <li>• <strong>Employment Type:</strong> Salaried vs self-employed affects rates</li>
                  <li>• <strong>Loan Amount & Tenure:</strong> Larger loans and longer tenures may have higher rates</li>
                  <li>• <strong>Federal Funds Rate:</strong> Federal Reserve rate directly impacts lending rates</li>
                </ul>
              </div>

              {/* Card 6: Prepayment Benefits */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>💡</span>
                  Benefits of Loan Prepayment
                </h3>
                <p className="text-gray-700 mb-3">
                  Prepaying your loan can save thousands of dollars in interest and reduce your debt burden:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Interest Savings:</strong> Even $10,000 prepayment can save $20,000-30,000 in interest</li>
                  <li>• <strong>Reduced Tenure:</strong> Become debt-free years earlier</li>
                  <li>• <strong>Lower EMI:</strong> Option to reduce monthly payment instead</li>
                  <li>• <strong>Improved Credit Score:</strong> Faster loan closure improves creditworthiness</li>
                  <li>• <strong>Financial Freedom:</strong> Less debt means more disposable income</li>
                </ul>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Loan Tenure Impact on Total Interest
              </h3>
              <p className="text-gray-700 text-center mb-4">
                Example: $300,000 loan at 6.5% annual interest
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="px-4 py-3 font-bold text-gray-900">Tenure</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Monthly EMI</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Total Interest</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Total Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 text-gray-700">10 years</td>
                      <td className="px-4 py-3 text-gray-700">$3,390</td>
                      <td className="px-4 py-3 text-red-600 font-semibold">$106,800</td>
                      <td className="px-4 py-3 text-gray-900">$406,800</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-blue-50">
                      <td className="px-4 py-3 text-gray-700">15 years</td>
                      <td className="px-4 py-3 text-gray-700">$2,613</td>
                      <td className="px-4 py-3 text-red-600 font-semibold">$170,340</td>
                      <td className="px-4 py-3 text-gray-900">$470,340</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 text-gray-700">20 years</td>
                      <td className="px-4 py-3 text-gray-700">$2,246</td>
                      <td className="px-4 py-3 text-red-600 font-semibold">$239,040</td>
                      <td className="px-4 py-3 text-gray-900">$539,040</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">25 years</td>
                      <td className="px-4 py-3 text-gray-700">$2,021</td>
                      <td className="px-4 py-3 text-red-600 font-semibold">$306,300</td>
                      <td className="px-4 py-3 text-gray-900">$606,300</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 text-gray-700">30 years</td>
                      <td className="px-4 py-3 text-gray-700">$1,896</td>
                      <td className="px-4 py-3 text-red-600 font-semibold">$382,560</td>
                      <td className="px-4 py-3 text-gray-900">$682,560</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Notice: Shorter tenure means higher EMI but significantly lower total interest paid.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What is EMI and how is it calculated?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each month. EMI is calculated using the formula: EMI = [P × R × (1+R)^N] / [(1+R)^N-1], where P is the principal loan amount, R is the monthly interest rate (annual rate ÷ 12 ÷ 100), and N is the loan tenure in months. For example, a $300,000 loan at 6.5% annual interest for 30 years results in an EMI of approximately $1,896.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What is a good EMI to income ratio?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Financial experts recommend keeping your EMI to income ratio (also called Debt-to-Income or DTI ratio) below 40% of your monthly income. Ideally, it should be below 30-35% to maintain financial stability. If your EMI exceeds 50% of your income, it's considered risky as it leaves little room for other expenses, savings, and emergencies. Banks typically approve loans where EMI doesn't exceed 40-50% of your net monthly income.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How can I reduce my EMI amount?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      You can reduce your EMI in several ways: 1) Increase your down payment to reduce the principal loan amount. 2) Negotiate a lower interest rate with your lender. 3) Extend the loan tenure (though this increases total interest paid). 4) Make prepayments whenever possible to reduce principal. 5) Compare offers from multiple banks to find the best interest rate. 6) Improve your credit score (above 750) to qualify for better rates. For home loans, even a 0.5% reduction in interest rate can save thousands of dollars over the loan tenure.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What is the difference between flat rate and reducing balance interest?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      In flat rate interest, interest is calculated on the original principal amount throughout the loan tenure. In reducing balance (most common for EMIs), interest is calculated on the outstanding principal, which decreases with each payment. Reducing balance results in lower overall interest. For example, on a $100,000 loan at 10% for 5 years: Flat rate EMI ≈ $2,500 with total interest $50,000, while reducing balance EMI ≈ $2,125 with total interest $27,500. Always check which method your lender uses.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Should I choose a longer or shorter loan tenure?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Shorter tenure (5-10 years) means higher EMI but lower total interest paid, helping you become debt-free faster. Longer tenure (15-30 years) means lower EMI but significantly higher total interest. Choose based on your financial situation: If you have high disposable income and want to save on interest, choose shorter tenure. If you need manageable monthly payments and want financial flexibility, choose longer tenure. You can always prepay to reduce tenure later. For home loans, longer tenure (20-25 years) is common; for car/personal loans, 3-7 years is typical.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What is an amortization schedule?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      An amortization schedule is a complete table showing each EMI payment broken down into principal and interest components, along with the remaining loan balance. In the early years of a loan, a larger portion of your EMI goes toward interest, and a smaller portion toward principal. As the loan progresses, this ratio reverses. For example, on a $300,000 loan at 6.5% for 30 years, your first EMI of $1,896 might have $1,625 as interest and only $271 as principal. The schedule helps you understand how your debt reduces over time.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Can I prepay my loan to reduce EMI or tenure?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Yes, most loans allow prepayment (full or partial) to either reduce EMI or reduce tenure. Prepayment directly reduces your principal, saving you interest. You can typically choose: 1) Reduce EMI while keeping tenure same (better for monthly budget relief), or 2) Reduce tenure while keeping EMI same (pay off debt faster, save more on interest). Home loans often have no prepayment charges after 6-12 months. Personal loans may have 2-4% prepayment penalty. Even small regular prepayments ($5,000-10,000 annually) can reduce your total interest by tens of thousands of dollars and help you become debt-free years earlier.
                    </p>
                  </div>
                </div>

                <div 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What documents are needed for a loan application?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Standard loan documents include: 1) Identity Proof: Aadhaar Card, PAN Card, Passport, or Voter ID. 2) Address Proof: Utility bills, rental agreement, or Aadhaar. 3) Income Proof: Last 6 months' salary slips, 2 years' ITR for self-employed, bank statements. 4) Employment Proof: Employment letter, offer letter, or business registration. 5) For Home Loans: Property documents, sale deed, NOC from builder. 6) For Co-borrowers: All above documents for each co-borrower. 7) Photographs: 2-3 recent passport-size photos. Banks may ask for additional documents based on your profile and loan type.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/loan-calculator" 
                   className="block p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate loan payments with amortization</p>
                </Link>
                <Link href="/mortgage-calculator" 
                   className="block p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Mortgage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate home loan with PITI breakdown</p>
                </Link>
                <Link href="/interest-calculator" 
                   className="block p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Interest Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate simple and compound interest</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

