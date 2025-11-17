import { Metadata } from "next";
import Link from "next/link";
import { FHALoanCalculator } from "@/components/Calculator/FHALoanCalculator";
import { 
  getUrl, 
  getOgImage, 
  getBreadcrumbId, 
  getWebAppId, 
  getFaqId, 
  getHowToId, 
  getArticleId,
  getStepUrl 
} from '@/config/site';

export const metadata: Metadata = {
  title: "FHA Loan Calculator - Calculate FHA Mortgage Payments & MIP",
  description: "Free FHA mortgage calculator with MIP calculations. Calculate monthly payments, mortgage insurance premiums, and compare FHA vs conventional loans. Perfect for first-time homebuyers.",
  keywords: [
    "FHA loan calculator",
    "FHA mortgage calculator",
    "FHA payment calculator",
    "MIP calculator",
    "FHA mortgage insurance calculator",
    "FHA home loan calculator",
    "FHA loan payment calculator",
    "FHA vs conventional calculator",
    "FHA down payment calculator",
    "FHA closing costs calculator",
    "FHA loan limits",
    "FHA qualification calculator",
    "FHA DTI calculator",
    "FHA credit score requirements",
    "first time homebuyer FHA",
    "FHA upfront MIP",
    "FHA annual MIP",
    "FHA loan requirements",
    "FHA mortgage rates",
    "FHA affordability calculator"
  ],
  openGraph: {
    title: "FHA Loan Calculator - Calculate FHA Mortgage Payments & MIP",
    description: "Free FHA mortgage calculator with MIP calculations. Calculate monthly payments, mortgage insurance premiums, and compare FHA vs conventional loans. Perfect for first-time homebuyers.",
    type: "website",
    url: getUrl('/fha-loan-calculator'),
    siteName: "AICalculator.pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "FHA Loan Calculator - Calculate FHA Mortgage Payments & MIP",
    description: "Free FHA mortgage calculator with MIP calculations. Perfect for first-time homebuyers with low down payments.",
    site: "@AICalculatorPro",
  },
  alternates: {
    canonical: getUrl('/fha-loan-calculator'),
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

export default function FHALoanCalculatorPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "FHA Loan Calculator",
        "@id": getWebAppId('/fha-loan-calculator'),
        "url": getUrl('/fha-loan-calculator'),
        "description": "Calculate FHA mortgage payments with MIP calculations. Perfect for first-time homebuyers with low down payments.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "FHA loan qualification check",
          "3.5% minimum down payment calculation",
          "Upfront MIP calculation (1.75%)",
          "Annual MIP calculation (0.45%-1.05%)",
          "Monthly payment breakdown",
          "DTI ratio verification",
          "FHA vs conventional comparison",
          "Closing costs estimation"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/fha-loan-calculator'),
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
            "name": "FHA Loan Calculator",
            "item": getUrl('/fha-loan-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/fha-loan-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is FHA loan and who qualifies?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "FHA loans are government-backed mortgages insured by the Federal Housing Administration. They require as little as 3.5% down payment with a credit score of 580+, or 10% down with scores 500-579. FHA loans are ideal for first-time homebuyers and those with limited savings."
            }
          },
          {
            "@type": "Question",
            "name": "What is MIP and how much does it cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "MIP (Mortgage Insurance Premium) is required on all FHA loans. It includes an upfront premium of 1.75% of the loan amount (can be financed) plus annual premiums of 0.45%-1.05% depending on loan amount, term, and LTV ratio. MIP protects lenders if you default on the loan."
            }
          },
          {
            "@type": "Question",
            "name": "What are FHA loan limits for 2024?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "FHA loan limits vary by county. For 2024, the standard limit is $498,257 in most areas, with high-cost areas up to $1,149,825. These limits are set annually by HUD and vary based on local median home prices."
            }
          },
          {
            "@type": "Question",
            "name": "FHA vs Conventional loan - which is better?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "FHA loans are better if you have lower credit scores (580-620) or limited down payment (3.5%). Conventional loans are better if you have good credit (720+) and 20% down payment, as they avoid mortgage insurance. Use our calculator to compare both options for your situation."
            }
          },
          {
            "@type": "Question",
            "name": "Can I remove FHA MIP?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For loans after June 2013 with less than 10% down, MIP lasts for the life of the loan. With 10%+ down, MIP can be removed after 11 years. The only way to eliminate MIP is to refinance to a conventional loan once you have 20% equity."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/fha-loan-calculator'),
        "name": "How to Use the FHA Loan Calculator",
        "description": "Step-by-step guide to calculating FHA mortgage payments with MIP",
        "totalTime": "PT4M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": {
          "@type": "HowToTool",
          "name": "FHA Loan Calculator"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Home Price",
            "text": "Input the purchase price of the home. FHA loans have county-specific limits, typically $472,030 for most areas and up to $1,089,300 in high-cost areas.",
            "url": getStepUrl('/fha-loan-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Set Down Payment",
            "text": "Enter your down payment amount. FHA requires minimum 3.5% down with credit score 580+, or 10% down with score 500-579.",
            "url": getStepUrl('/fha-loan-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Enter Interest Rate",
            "text": "Input the FHA mortgage interest rate. FHA rates are typically competitive with conventional loans, often 0.25-0.5% lower.",
            "url": getStepUrl('/fha-loan-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Calculate MIP",
            "text": "The calculator automatically adds upfront MIP (1.75% of loan amount) and annual MIP (0.45-1.05% based on loan amount and term).",
            "url": getStepUrl('/fha-loan-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Add Property Costs",
            "text": "Enter property tax rate, homeowners insurance, and HOA fees if applicable. These are included in your monthly PITI payment.",
            "url": getStepUrl('/fha-loan-calculator', 5)
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Review Total Payment",
            "text": "See your complete monthly payment including principal, interest, MIP, taxes, and insurance. Compare with conventional loan options.",
            "url": getStepUrl('/fha-loan-calculator', 6)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/fha-loan-calculator'),
        "headline": "FHA Loan Calculator - Complete Guide to FHA Mortgages & MIP",
        "description": "Comprehensive guide to FHA loans with free calculator. Learn about 3.5% down payments, mortgage insurance premiums, credit requirements, and how FHA loans help first-time homebuyers.",
        "author": {
          "@type": "Organization",
          "name": "AICalculator.pro",
          "url": getUrl('/')
        },
        "publisher": {
          "@type": "Organization",
          "name": "AICalculator.pro",
          "logo": {
            "@type": "ImageObject",
            "url": getUrl('/logo.png')
          }
        },
        "datePublished": "2025-11-16",
        "dateModified": "2025-11-16",
        "image": getOgImage('fha-loan'),
        "articleBody": "FHA loans are government-backed mortgages insured by the Federal Housing Administration, designed to help first-time homebuyers and those with lower credit scores. With just 3.5% down and flexible credit requirements, FHA loans make homeownership accessible. However, borrowers must pay mortgage insurance premiums (MIP) including 1.75% upfront and 0.45-1.05% annually."
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
      <h1 className="sr-only">
        FHA Loan Calculator - Calculate FHA Mortgage Payments & MIP
      </h1>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/category/financial" className="hover:text-blue-600 transition-colors">
                Financial
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-semibold">FHA Loan Calculator</li>
          </ol>
        </div>
      </nav>

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="FHA Loan Calculator Tool">
        <div className="container mx-auto px-4">
          <FHALoanCalculator />
        </div>
      </section>

      {/* Educational Content for SEO */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="FHA Loan Education and Resources">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding FHA Loans and First-Time Homebuyer Benefits
            </h2>

            {/* Main Content Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* FHA Loan Overview */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    💰
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">What Are Personal Loans?</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Personal loans are unsecured installment loans that provide a lump sum of money that you repay over a fixed term with regular monthly payments. They offer flexibility for various financial needs without requiring collateral.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Unsecured:</strong> No collateral required</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Fixed Terms:</strong> Predictable monthly payments</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Flexible Use:</strong> Various purposes allowed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Quick Funding:</strong> Fast approval process</span>
                  </div>
                </div>
              </div>

              {/* Loan Comparison */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                    📊
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Compare Loan Offers</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Our calculator helps you compare loan offers from different lenders by analyzing APR, monthly payments, total interest, and loan terms. This ensures you choose the most cost-effective option for your financial situation.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">📈</span>
                    <span><strong>APR Comparison:</strong> True cost of borrowing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">💰</span>
                    <span><strong>Monthly Payments:</strong> Affordability analysis</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">📊</span>
                    <span><strong>Total Cost:</strong> Interest over loan life</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">🎯</span>
                    <span><strong>Loan Terms:</strong> Find optimal duration</span>
                  </div>
                </div>
              </div>

              {/* Credit Score Impact */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border-2 border-blue-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-2xl text-white">
                    🏆
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Credit Score Requirements</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Your credit score significantly impacts your loan eligibility and interest rates. Understanding credit score requirements helps you gauge your approval chances and potential costs.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">🌟</span>
                    <span><strong>Excellent (720+):</strong> Best rates and terms</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">👍</span>
                    <span><strong>Good (690-719):</strong> Competitive rates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">📈</span>
                    <span><strong>Fair (630-689):</strong> Higher rates available</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">⚠️</span>
                    <span><strong>Poor (below 630):</strong> Limited options</span>
                  </div>
                </div>
              </div>

              {/* Loan Uses */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg border-2 border-purple-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-2xl text-white">
                    🎯
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Common Loan Uses</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Personal loans can be used for various purposes, making them versatile financial tools. Understanding common uses helps you determine if a personal loan fits your needs.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">💳</span>
                    <span><strong>Debt Consolidation:</strong> Combine high-interest debt</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">🏠</span>
                    <span><strong>Home Improvement:</strong> Renovations and repairs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">🚗</span>
                    <span><strong>Major Purchases:</strong> Cars, appliances, furniture</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">🎓</span>
                    <span><strong>Education:</strong> Courses and training</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Loan Statistics */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Personal Loan Market Overview
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$200 Billion</div>
                  <p className="text-gray-600">U.S. Personal Loan Market</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">21 Million</div>
                  <p className="text-gray-600">Americans with Personal Loans</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">9.41%</div>
                  <p className="text-gray-600">Average Interest Rate</p>
                </div>
              </div>
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong className="text-blue-900">💡 Key Insight:</strong> Personal loans have become increasingly popular for debt consolidation, with average loan amounts ranging from $5,000 to $40,000 depending on creditworthiness and purpose.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How do I calculate my personal loan monthly payment?
                  </h3>
                  <p className="text-gray-700">
                    To calculate your personal loan monthly payment, use the amortization formula: Payment = P × [r(1+r)^n] ÷ [(1+r)^n-1], where P is principal, r is monthly interest rate (APR ÷ 12), and n is number of payments. Our calculator does this automatically and shows you exactly how much you'll pay each month.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What is APR and why is it important?
                  </h3>
                  <p className="text-gray-700">
                    APR (Annual Percentage Rate) represents the true cost of borrowing, including interest rate and lender fees. It's more accurate than just the interest rate because it reflects the total cost of the loan. When comparing offers, always compare APRs rather than just interest rates to find the best deal.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How much can I borrow with a personal loan?
                  </h3>
                  <p className="text-gray-700">
                    Personal loan amounts typically range from $1,000 to $50,000, though some lenders offer up to $100,000. The amount you can borrow depends on your credit score, income, debt-to-income ratio, and other factors. Use our affordability calculator to determine how much you can comfortably borrow based on your financial situation.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What credit score do I need for a personal loan?
                  </h3>
                  <p className="text-gray-700">
                    While minimum requirements vary by lender, you'll generally need a credit score of 580-620 for approval. However, scores above 720 typically qualify for the best rates. Some lenders specialize in loans for borrowers with lower credit scores, though these come with higher interest rates and stricter terms.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How long does it take to get approved for a personal loan?
                  </h3>
                  <p className="text-gray-700">
                    The approval timeline varies by lender, but many online lenders offer same-day or next-day approval. Traditional banks may take 3-7 business days. Once approved, funding typically occurs within 1-3 business days, though some lenders offer expedited funding for qualified borrowers.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Should I use a personal loan for debt consolidation?
                  </h3>
                  <p className="text-gray-700">
                    Personal loans can be excellent for debt consolidation if you can get a lower APR than your current debts. This strategy simplifies payments into one monthly bill and can save money on interest. However, ensure the monthly payment fits your budget and avoid running up new debt on paid-off accounts.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Financial Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/loan-calculator"
                      className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="font-semibold text-gray-900">Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">General loan payment calculator</p>
                </Link>
                <Link href="/mortgage-calculator"
                      className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="font-semibold text-gray-900">Mortgage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Home loan payment calculator</p>
                </Link>
                <Link href="/debt-payoff-calculator"
                      className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">💸</div>
                  <div className="font-semibold text-gray-900">Debt Payoff Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Optimize your debt repayment strategy</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}