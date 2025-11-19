import type { Metadata } from 'next';
import { getUrl, getOgImage } from '@/config/site';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { HomeLoanCalculator } from '@/components/Calculator/HomeLoanCalculator';

export const metadata: Metadata = {
  title: 'Home Loan Calculator - Free Mortgage Analysis & Comparison Tool | AICalculator',
  description: 'Analyze home loan options, compare mortgage programs (Conventional, FHA, VA, USDA), check eligibility, and calculate monthly payments. Free professional loan analysis with approval probability.',
  keywords: [
    'home loan calculator',
    'mortgage calculator',
    'conventional loan',
    'FHA loan',
    'VA loan',
    'USDA loan',
    'mortgage comparison',
    'loan eligibility',
    'mortgage payment calculator',
    'home loan rates',
    'down payment calculator',
    'mortgage approval',
    'DTI calculator',
    'mortgage affordability',
    'first time home buyer',
    'mortgage pre-approval'
  ],
  openGraph: {
    title: 'Home Loan Calculator - Compare Mortgage Options',
    description: 'Free tool to analyze and compare home loan options. Get personalized recommendations and approval probability.',
    type: 'website',
    url: getUrl('/home-loan-calculator'),
    siteName: 'AICalculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Loan Calculator - Free Mortgage Analysis',
    description: 'Compare loan programs, check eligibility, and calculate payments. Get personalized recommendations.',
    site: '@AICalculator',
  },
  alternates: {
    canonical: getUrl('/home-loan-calculator'),
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

// Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": getUrl('/home-loan-calculator') + '#webapp',
      "name": "Home Loan Calculator",
      "url": getUrl('/home-loan-calculator'),
      "description": "Professional home loan calculator that analyzes mortgage options, compares loan programs, checks eligibility, and provides personalized recommendations with approval probability.",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Multiple loan program comparison",
        "Eligibility analysis",
        "Mortgage payment calculation",
        "DTI ratio analysis",
        "Credit score evaluation",
        "Down payment optimization",
        "Approval probability assessment",
        "Program-specific recommendations",
        "Professional loan guidance"
      ],
      "screenshot": getUrl('/images/home-loan-calculator-screenshot.png')
    },
    {
      "@type": "BreadcrumbList",
      "@id": getUrl('/home-loan-calculator') + '#breadcrumb',
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
          "name": "Home Loan Calculator",
          "item": getUrl('/home-loan-calculator')
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": getUrl('/home-loan-calculator') + '#faq',
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What types of home loans can I compare with this calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can compare four major loan types: Conventional Loans (3% down minimum), FHA Loans (3.5% down for lower credit scores), VA Loans (0% down for military members), and USDA Loans (0% down for rural properties). Each program has different eligibility requirements and benefits."
          }
        },
        {
          "@type": "Question",
          "name": "How does the home loan calculator determine my eligibility?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The calculator analyzes multiple factors including your credit score, down payment amount, debt-to-income ratio (DTI), employment history, property type, and loan amount requirements. Each loan program has specific eligibility criteria, and our tool matches your profile against these requirements."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good debt-to-income (DTI) ratio for mortgage approval?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For conventional loans, a DTI ratio below 36% is excellent, up to 43% is acceptable, and above 50% may disqualify you. FHA loans are more flexible, allowing DTI up to 50% in some cases. VA loans typically prefer DTI below 41%, while USDA loans require DTI under 41% for automatic approval."
          }
        },
        {
          "@type": "Question",
          "name": "How much down payment do I need for a home loan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Down payment requirements vary by loan type: Conventional loans require 3-20% (20% avoids PMI), FHA loans require 3.5% minimum, VA loans require 0% down for eligible borrowers, and USDA loans require 0% down for qualifying properties and income levels. Higher down payments can result in better interest rates and lower monthly payments."
          }
        },
        {
          "@type": "Question",
          "name": "What credit score do I need to qualify for a home loan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Credit score requirements vary: Conventional loans typically require 620+ (740+ for best rates), FHA loans accept 580+ (500+ with 10% down), VA loans prefer 620+, and USDA loans generally require 640+. Higher scores usually result in better interest rates and loan terms."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is the approval probability calculation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our approval probability calculation is based on standard lending guidelines and factors that lenders consider. While it's a strong indicator, actual approval depends on additional factors like specific lender requirements, property appraisal, documentation verification, and current market conditions. Use it as a guide to strengthen your application."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between APR and interest rate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Interest rate is the cost of borrowing the principal amount, while APR (Annual Percentage Rate) includes both the interest rate plus other loan costs like origination fees, discount points, and mortgage insurance. APR provides a more complete picture of the total cost of borrowing and is useful for comparing different loan offers."
          }
        },
        {
          "@type": "Question",
          "name": "How can I improve my chances of mortgage approval?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Improve your approval chances by: increasing your credit score, reducing existing debt, saving for a larger down payment, maintaining stable employment for 2+ years, avoiding new credit applications before applying, saving for closing costs and emergency funds, getting pre-approved before house hunting, and choosing a home within your budget."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "@id": "https://aicalculator.pro/home-loan-calculator#howto",
      "name": "How to Use the Home Loan Calculator",
      "description": "Step-by-step guide to analyze home loan options and find the best mortgage program for your situation.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Enter Property Information",
          "text": "Input the home price and your desired down payment amount or percentage. The calculator will automatically calculate the loan amount and down payment percentage."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Add Financial Details",
          "text": "Enter your monthly gross income, existing debt payments, credit score, employment type, and years of employment. This helps determine your eligibility and approval probability."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Select Property Preferences",
          "text": "Choose your property type (single-family, condo, townhouse, etc.) and intended use (primary residence, secondary home, or investment property)."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Choose Loan Programs",
          "text": "Select the loan programs you're interested in (Conventional, FHA, VA, USDA). The calculator will compare your eligibility for each program and recommend the best option."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Review Analysis Results",
          "text": "Examine the recommended loan program, monthly payment breakdown, eligibility score, and approval probability. Compare with alternative programs to make an informed decision."
        },
        {
          "@type": "HowToStep",
          "position": 6,
          "name": "Follow Recommendations",
          "text": "Review personalized tips to improve your approval chances, optimize your down payment, and prepare for the mortgage application process."
        }
      ]
    }
  ]
};

export default function HomeLoanCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Home Loan Calculator - Compare Mortgage Programs & Check Eligibility | Free Mortgage Analysis Tool</h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Home Loan Calculator"
        calculatorUrl="/home-loan-calculator"
      />

      {/* Calculator Tool Section */}
      <section className="py-8 md:py-12" aria-label="Home Loan Calculator Tool">
        <div className="container mx-auto px-4">
          <HomeLoanCalculator />
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Heading */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Home Loans and Mortgage Programs
            </h2>

            {/* Content Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Card 1: What is a Home Loan */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">What is a Home Loan?</h3>
                <p className="text-gray-700 mb-4">
                  A home loan, or mortgage, is a loan used to purchase real estate where the property itself serves as collateral. Home loans typically have long repayment terms (15-30 years) and come in various types to suit different borrower needs and qualifications.
                </p>
                <p className="text-gray-700">
                  Understanding home loan options is crucial for making informed decisions about one of the largest financial commitments most people will ever make. Each loan program has unique benefits, requirements, and costs that can significantly impact your monthly payment and total cost of homeownership.
                </p>
              </div>

              {/* Card 2: Types of Home Loans */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Types of Home Loans</h3>
                <p className="text-gray-700 mb-4">
                  There are four main types of home loans available in the United States, each designed for different borrower profiles and situations:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Conventional Loans:</strong> Not insured by the government, requiring 3-20% down payment and good credit scores.</li>
                  <li><strong>FHA Loans:</strong> Insured by the Federal Housing Administration, allowing lower credit scores and down payments as low as 3.5%.</li>
                  <li><strong>VA Loans:</strong> Guaranteed by the Department of Veterans Affairs, offering 0% down payment for eligible military service members.</li>
                  <li><strong>USDA Loans:</strong> Backed by the U.S. Department of Agriculture for rural property purchases with 0% down payment.</li>
                </ul>
              </div>
            </div>

            {/* Additional Content Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Card 3: Loan Eligibility Factors */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold mb-3 text-gray-900">Key Eligibility Factors</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Lenders evaluate multiple factors when determining loan eligibility: credit score, debt-to-income ratio, employment history, down payment amount, and income stability. Our calculator analyzes these factors to determine your eligibility for different loan programs and provide personalized recommendations.
                </p>
              </div>

              {/* Card 4: Down Payment Considerations */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold mb-3 text-gray-900">Down Payment Strategies</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  While 20% down payment eliminates PMI on conventional loans, many programs accept lower down payments. Consider saving for a larger down payment to reduce monthly payments, qualify for better rates, and avoid mortgage insurance costs.
                </p>
              </div>

              {/* Card 5: Interest Rate Factors */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold mb-3 text-gray-900">What Affects Interest Rates?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Interest rates vary based on credit score, down payment, loan type, loan term, and current market conditions. Higher credit scores and larger down payments typically result in lower interest rates, saving thousands over the life of the loan.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                {/* FAQ 1 */}
                <div className="border-b border-gray-200 pb-6"
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What types of home loans can I compare with this calculator?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      You can compare four major loan types: Conventional Loans (3% down minimum), FHA Loans (3.5% down for lower credit scores), VA Loans (0% down for military members), and USDA Loans (0% down for rural properties). Each program has different eligibility requirements and benefits.
                    </p>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-gray-200 pb-6"
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How does the home loan calculator determine my eligibility?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The calculator analyzes multiple factors including your credit score, down payment amount, debt-to-income ratio (DTI), employment history, property type, and loan amount requirements. Each loan program has specific eligibility criteria, and our tool matches your profile against these requirements.
                    </p>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="border-b border-gray-200 pb-6"
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is a good debt-to-income (DTI) ratio for mortgage approval?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      For conventional loans, a DTI ratio below 36% is excellent, up to 43% is acceptable, and above 50% may disqualify you. FHA loans are more flexible, allowing DTI up to 50% in some cases. VA loans typically prefer DTI below 41%, while USDA loans require DTI under 41% for automatic approval.
                    </p>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="border-b border-gray-200 pb-6"
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much down payment do I need for a home loan?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Down payment requirements vary by loan type: Conventional loans require 3-20% (20% avoids PMI), FHA loans require 3.5% minimum, VA loans require 0% down for eligible borrowers, and USDA loans require 0% down for qualifying properties and income levels. Higher down payments can result in better interest rates and lower monthly payments.
                    </p>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div className="border-b border-gray-200 pb-6"
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What credit score do I need to qualify for a home loan?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Credit score requirements vary: Conventional loans typically require 620+ (740+ for best rates), FHA loans accept 580+ (500+ with 10% down), VA loans prefer 620+, and USDA loans generally require 640+. Higher scores usually result in better interest rates and loan terms.
                    </p>
                  </div>
                </div>

                {/* FAQ 6 */}
                <div className="border-b border-gray-200 pb-6"
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How accurate is the approval probability calculation?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Our approval probability calculation is based on standard lending guidelines and factors that lenders consider. While it's a strong indicator, actual approval depends on additional factors like specific lender requirements, property appraisal, documentation verification, and current market conditions. Use it as a guide to strengthen your application.
                    </p>
                  </div>
                </div>

                {/* FAQ 7 */}
                <div className="border-b border-gray-200 pb-6"
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the difference between APR and interest rate?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Interest rate is the cost of borrowing the principal amount, while APR (Annual Percentage Rate) includes both the interest rate plus other loan costs like origination fees, discount points, and mortgage insurance. APR provides a more complete picture of the total cost of borrowing and is useful for comparing different loan offers.
                    </p>
                  </div>
                </div>

                {/* FAQ 8 */}
                <div className="pb-6"
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How can I improve my chances of mortgage approval?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Improve your approval chances by: increasing your credit score, reducing existing debt, saving for a larger down payment, maintaining stable employment for 2+ years, avoiding new credit applications before applying, saving for closing costs and emergency funds, getting pre-approved before house hunting, and choosing a home within your budget.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Calculators Section */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Financial Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/mortgage-calculator"
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Mortgage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Advanced mortgage analysis with amortization</p>
                </a>
                <a href="/loan-calculator"
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">General loan payment calculator</p>
                </a>
                <a href="/refinance-calculator"
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Refinance Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Analyze mortgage refinance options</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}