import { Metadata } from "next";
import { LoanCalculator } from "@/components/Calculator/LoanCalculator";

export const metadata: Metadata = {
  title: "Loan Calculator - Free Monthly Payment Calculator with Affordability Analysis",
  description: "Calculate your loan payments with our advanced calculator. Get instant affordability analysis, repayment strategies, DTI ratio calculation, and personalized recommendations. Free loan calculator with detailed amortization schedule.",
  keywords: [
    "loan calculator",
    "personal loan calculator",
    "loan payment calculator",
    "monthly payment calculator",
    "loan affordability calculator",
    "auto loan calculator",
    "student loan calculator",
    "debt calculator",
    "loan interest calculator",
    "loan repayment calculator",
    "DTI calculator",
    "debt to income ratio"
  ],
  openGraph: {
    title: "Loan Calculator - Instant Payment Analysis",
    description: "Calculate loan payments and get detailed affordability analysis, repayment strategies, and personalized recommendations.",
    type: "website",
    url: "https://aicalculator.com/loan-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan Calculator with Affordability Analysis",
    description: "Calculate loan payments and discover the best repayment strategy with detailed insights and recommendations.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.com/loan-calculator",
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

export default function LoanCalculatorPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Loan Calculator",
        "url": "https://aicalculator.com/loan-calculator",
        "description": "Free loan calculator with detailed affordability analysis, DTI ratio calculation, and personalized repayment strategies.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Monthly payment calculation",
          "Affordability analysis",
          "DTI ratio calculation",
          "Repayment strategies comparison",
          "Amortization schedule",
          "Interest savings calculator",
          "Extra payment scenarios"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://aicalculator.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Financial",
            "item": "https://aicalculator.com/financial"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Loan Calculator",
            "item": "https://aicalculator.com/loan-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate my monthly loan payment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate your monthly loan payment, you need three key pieces of information: the loan amount (principal), the annual interest rate, and the loan term in years. The calculator uses the standard loan amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1], where M is monthly payment, P is principal, r is monthly interest rate, and n is number of payments."
            }
          },
          {
            "@type": "Question",
            "name": "What is a good DTI ratio for a loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A good debt-to-income (DTI) ratio is typically below 36%, with no more than 28% of that going toward housing expenses. Lenders generally prefer DTI ratios of 43% or lower for most loans. A lower DTI indicates better financial health and makes you more attractive to lenders."
            }
          },
          {
            "@type": "Question",
            "name": "Should I make extra payments on my loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Making extra payments on your loan can save you thousands in interest and help you pay off the loan faster. However, ensure you don't have any prepayment penalties, have an emergency fund in place, and aren't neglecting higher-interest debts. Use our calculator to see how extra payments can impact your loan."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between APR and interest rate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The interest rate is the cost of borrowing the principal loan amount, while APR (Annual Percentage Rate) includes the interest rate plus other costs like fees, points, and mortgage insurance. APR gives you a more complete picture of the total cost of the loan."
            }
          },
          {
            "@type": "Question",
            "name": "How can I lower my monthly loan payment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can lower your monthly loan payment by: extending the loan term (though you'll pay more interest overall), refinancing to a lower interest rate, making a larger down payment to reduce the principal, or improving your credit score before applying to qualify for better rates."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Loan Calculator",
        "description": "Step-by-step guide to calculate your loan payments and analyze affordability",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Loan Details",
            "text": "Input the loan amount you need to borrow, the annual interest rate offered by your lender, and the loan term in years."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Add Your Income",
            "text": "Enter your gross monthly income to calculate your debt-to-income ratio and assess affordability."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Calculate Results",
            "text": "Click the Calculate button to see your monthly payment, total interest, and detailed affordability analysis."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Review Strategies",
            "text": "Explore different repayment strategies including extra payments and see how much interest you can save."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Check Amortization Schedule",
            "text": "View the detailed payment breakdown showing how much goes to principal vs interest each month."
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* SEO: Hidden H1 */}
      <h1 className="sr-only">Loan Calculator - Free Monthly Payment Calculator with Affordability Analysis and Repayment Strategies</h1>
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" 
              itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/financial" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Financial</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">Loan Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <LoanCalculator />
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" 
               aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Loan Calculations
            </h2>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Card 1: What is a Loan Calculator */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>💰</span>
                  What is a Loan Calculator?
                </h3>
                <p className="text-gray-700 mb-4">
                  A loan calculator is a financial tool that helps you determine your monthly payment amount for any type of loan. It uses the loan amount, interest rate, and term length to calculate how much you'll pay each month and the total interest over the life of the loan.
                </p>
                <p className="text-gray-700">
                  Our advanced calculator goes beyond basic calculations to provide affordability analysis, repayment strategies, and personalized recommendations to help you make informed borrowing decisions.
                </p>
              </div>

              {/* Card 2: How Loan Payments Work */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  How Loan Payments Work
                </h3>
                <p className="text-gray-700 mb-4">
                  Your monthly loan payment consists of two main components: principal and interest. Early in the loan term, a larger portion goes toward interest. As you continue making payments, more goes toward reducing the principal balance.
                </p>
                <p className="text-gray-700">
                  This is called amortization. Understanding how your payments are allocated helps you make better decisions about extra payments and refinancing opportunities.
                </p>
              </div>

              {/* Card 3: Debt-to-Income Ratio */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📈</span>
                  Debt-to-Income Ratio (DTI)
                </h3>
                <p className="text-gray-700 mb-4">
                  Your DTI ratio compares your monthly debt payments to your gross monthly income. Lenders use this metric to assess your ability to manage monthly payments and repay debts.
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>Excellent:</strong> Below 28%</li>
                  <li>• <strong>Good:</strong> 28% - 36%</li>
                  <li>• <strong>Fair:</strong> 37% - 43%</li>
                  <li>• <strong>Poor:</strong> Above 43%</li>
                </ul>
              </div>

              {/* Card 4: Repayment Strategies */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🎯</span>
                  Smart Repayment Strategies
                </h3>
                <p className="text-gray-700 mb-3">
                  Paying off your loan faster can save thousands in interest. Consider these strategies:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>Extra Monthly Payments:</strong> Add a fixed amount to each payment</li>
                  <li>• <strong>Biweekly Payments:</strong> Pay half your monthly payment every two weeks</li>
                  <li>• <strong>Lump Sum Payments:</strong> Apply bonuses or tax refunds to principal</li>
                  <li>• <strong>Refinancing:</strong> Lower your interest rate to reduce costs</li>
                </ul>
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
                    How do I calculate my monthly loan payment?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate your monthly loan payment, you need three key pieces of information: the loan amount (principal), the annual interest rate, and the loan term in years. The calculator uses the standard loan amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1], where M is monthly payment, P is principal, r is monthly interest rate, and n is number of payments.
                    </p>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is a good DTI ratio for a loan?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      A good debt-to-income (DTI) ratio is typically below 36%, with no more than 28% of that going toward housing expenses. Lenders generally prefer DTI ratios of 43% or lower for most loans. A lower DTI indicates better financial health and makes you more attractive to lenders.
                    </p>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Should I make extra payments on my loan?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Making extra payments on your loan can save you thousands in interest and help you pay off the loan faster. However, ensure you don't have any prepayment penalties, have an emergency fund in place, and aren't neglecting higher-interest debts. Use our calculator to see how extra payments can impact your loan.
                    </p>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What's the difference between APR and interest rate?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The interest rate is the cost of borrowing the principal loan amount, while APR (Annual Percentage Rate) includes the interest rate plus other costs like fees, points, and mortgage insurance. APR gives you a more complete picture of the total cost of the loan.
                    </p>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How can I lower my monthly loan payment?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      You can lower your monthly loan payment by: extending the loan term (though you'll pay more interest overall), refinancing to a lower interest rate, making a larger down payment to reduce the principal, or improving your credit score before applying to qualify for better rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Links */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/mortgage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Mortgage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate home loan payments with taxes and insurance</p>
                </a>
                <a href="/bmi-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">BMI Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Check your body mass index and health metrics</p>
                </a>
                <a href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate percentages for various scenarios</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

