import type { Metadata } from "next";
import BusinessLoanCalculator from "@/components/Calculator/BusinessLoanCalculator";

export const metadata: Metadata = {
  title: "Business Loan Calculator - SBA, Term Loans, APR & Amortization | AI Calculator",
  description:
    "Free Business Loan Calculator to estimate payments, total interest, origination fee impact, and payoff time. Supports monthly/bi-weekly/weekly schedules with smart recommendations.",
  keywords: [
    "business loan calculator",
    "SBA loan",
    "loan payment",
    "APR",
    "amortization",
    "commercial loan",
    "origination fee",
    "prepayment",
    "bi-weekly payments",
    "weekly payments",
  ],
  openGraph: {
    title: "Business Loan Calculator - Payments, APR, and Amortization",
    description:
      "Estimate business loan payments and total cost. Includes origination fees, prepayments, and multiple repayment frequencies.",
    type: "website",
    url: "https://aicalculator.com/business-loan-calculator",
    siteName: "AI Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Loan Calculator - Payments & APR",
    description:
      "Free Business Loan Calculator for payments, total interest, and amortization with smart recommendations.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.com/business-loan-calculator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "last-modified": new Date().toISOString(),
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Business Loan Calculator",
      "url": "https://aicalculator.com/business-loan-calculator",
      "description": "Estimate business loan payments, total interest, origination fee impact, and payoff time with multiple repayment frequencies.",
      "applicationCategory": "FinancialApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Calculate monthly payments for term, SBA, equipment, and real estate loans",
        "Comprehensive financial analysis with debt service coverage ratio",
        "Multiple loan types: Term, SBA, Equipment, Working Capital, Real Estate",
        "Risk assessment with debt-to-income ratio analysis",
        "Business scenario templates for different industries",
        "Origination fee and total cost breakdown with effective APR",
        "Smart recommendations based on financial ratios",
        "Professional loan comparison and qualification analysis"
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
          "name": "Business Loan Calculator",
          "item": "https://aicalculator.com/business-loan-calculator"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is my business loan payment calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Payments are based on the principal, annual interest rate, term, and repayment frequency. The calculator supports monthly, bi-weekly, and weekly schedules."
          }
        },
        {
          "@type": "Question",
          "name": "What fees are included?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Origination fee can be configured. Total cost equals total payments plus origination fee."
          }
        },
        {
          "@type": "Question",
          "name": "Can I make prepayments?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. You can add extra monthly prepayments, which are frequency-adjusted to accelerate payoff and reduce interest."
          }
        },
        {
          "@type": "Question",
          "name": "Does this work for SBA loans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. While SBA loans may include additional fees, this calculator estimates payments, total interest, and total cost for standard amortized structures."
          }
        },
        {
          "@type": "Question",
          "name": "What is APR vs nominal interest?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "APR includes certain fees and reflects the true annual cost of borrowing, while nominal interest is the stated yearly rate used to compute periodic interest."
          }
        },
        {
          "@type": "Question",
          "name": "What is debt service coverage ratio (DSCR)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DSCR measures your business's ability to service debt payments. It's calculated as net operating income divided by total debt service. Lenders typically require DSCR of 1.25 or higher."
          }
        },
        {
          "@type": "Question",
          "name": "What types of business loans can I calculate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our calculator supports Term Loans, SBA Loans, Equipment Financing, Working Capital Loans, and Commercial Real Estate Loans with different terms and rates."
          }
        },
        {
          "@type": "Question",
          "name": "How do I qualify for an SBA loan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SBA loans typically require good credit (680+), strong cash flow, collateral, and the business must meet SBA size standards. They often offer better terms than conventional loans."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between equipment loans and term loans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Equipment loans are secured by the equipment purchased, often have lower rates and longer terms. Term loans are more flexible but may have higher rates and shorter terms."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to use the Business Loan Calculator",
      "description": "Enter loan details and see payments, total interest, and payoff time.",
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Enter loan amount", "text": "Input your desired loan principal (e.g., $250,000)." },
        { "@type": "HowToStep", "position": 2, "name": "Set interest and term", "text": "Provide annual interest rate and the term in years." },
        { "@type": "HowToStep", "position": 3, "name": "Choose repayment frequency", "text": "Select monthly, bi-weekly, or weekly schedule." },
        { "@type": "HowToStep", "position": 4, "name": "Add fees and prepayment", "text": "Optionally include origination fee and extra prepayment." },
        { "@type": "HowToStep", "position": 5, "name": "Review results", "text": "Check payment, total interest, amortization table, and recommendations." }
      ]
    }
  ]
};

export default function BusinessLoanCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h1 className="sr-only">
        Business Loan Calculator - Payments, APR, Origination Fee, and Amortization Schedule
      </h1>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
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
              <span itemProp="name" className="text-gray-900 font-semibold">Business Loan Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator */}
      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <BusinessLoanCalculator />
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Business Loans: Rates, Terms, APR, Fees, and SBA Programs
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">What is a Business Loan?</h3>
                <p className="text-gray-700">
                  A business loan provides capital for working capital, expansion, equipment, or inventory. Common types
                  include term loans, SBA-backed loans, lines of credit, and equipment financing. Key variables are principal,
                  interest rate, term, repayment frequency, and fees.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">APR vs Nominal Interest</h3>
                <p className="text-gray-700">
                  Nominal interest is the stated annual rate used to calculate periodic interest. APR incorporates certain
                  fees and provides a more complete view of borrowing cost. Lower APRs generally indicate better total cost.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">Origination Fee Impact</h3>
                <p className="text-gray-700">
                  Many business loans include an origination fee (e.g., 1-3%). While it does not affect the periodic payment
                  directly, it adds to the total cost of borrowing. Negotiating this fee can materially reduce total cost.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">Prepayment and Payoff Time</h3>
                <p className="text-gray-700">
                  Extra payments reduce principal faster, cutting total interest and shortening payoff time. Even modest
                  prepayments can have outsized benefits over multi-year terms.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">SBA Fees Explained</h3>
                <p className="text-gray-700">
                  SBA-guaranteed loans often include a one-time guarantee fee and an annual servicing fee charged on the outstanding balance.
                  The guarantee fee increases upfront cost, while the annual fee behaves like a periodic surcharge on top of interest.
                  This page approximates both so you can compare effective costs across lenders.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">Cash Flow & DSCR</h3>
                <p className="text-gray-700">
                  DSCR (Debt Service Coverage Ratio) = EBITDA / Annual Debt Service. Lenders commonly look for at least 1.25x.
                  Improving EBITDA, extending term, or lowering the loan amount can raise DSCR and improve approval odds.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">What repayment frequencies are supported?</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">Monthly, bi-weekly, and weekly schedules are supported.</p>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">Do prepayments change the payment amount?</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">This tool models extra payments to reduce principal faster. Payment shown is scheduled plus extra.</p>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">Is APR the same as the interest rate?</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">No. APR typically includes certain fees while the nominal rate does not.</p>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">Can I use this for SBA loans?</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">Yes. Use the fee and rate fields to approximate SBA structures.</p>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">How accurate are the results?</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">Results are estimates using standard amortization formulas. Actual lender terms may vary.</p>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">What DSCR do lenders expect?</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Many lenders require DSCR ≥ 1.25x as a minimum. Higher DSCR indicates stronger repayment capacity and may qualify you for better terms.
                    </p>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">How can I reduce total borrowing cost?</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Compare multiple offers, negotiate origination/guarantee fees, consider longer terms for cash flow,
                      and use prepayments to reduce interest over time.
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
                <a href="/loan-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">General loan payments and amortization</p>
                </a>
                <a href="/roi-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">ROI Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Investment returns and annualized ROI</p>
                </a>
                <a href="/refinance-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Refinance Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Break-even and savings analysis</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


