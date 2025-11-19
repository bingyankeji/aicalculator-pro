import { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from "next/link";
import { PersonalLoanCalculator } from "@/components/Calculator/PersonalLoanCalculator";
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
  title: "Personal Loan (Free, No signup) - Monthly Payments | AICalculator",
  description: "Free personal loan calculator with no sign-up required. Calculate personal loan payments, compare offers from top lenders, and analyze affordability. With APR comparison, amortization schedules, and loan qualification analysis.",
  keywords: [
    "personal loan calculator",
    "free personal loan calculator",
    "personal loan calculator no signup",
    "loan payment calculator",
    "APR calculator",
    "loan interest calculator",
    "monthly payment calculator",
    "loan comparison calculator",
    "personal loan rates",
    "loan amortization calculator",
    "debt consolidation calculator",
    "loan qualification calculator",
    "personal loan APR",
    "unsecured loan calculator",
    "fixed rate personal loan",
    "personal loan interest rate",
    "loan affordability calculator",
    "personal loan payoff calculator",
    "early payoff calculator",
    "loan refinance calculator",
    "personal loan terms",
    "best personal loan rates",
    "personal loan eligibility",
    "personal loan comparison tool"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Personal Loan (Free, No signup) - AICalculator",
    description: "Free personal loan calculator with no sign-up required. Calculate personal loan payments, compare offers from top lenders, and analyze affordability.",
    type: "website",
    url: getUrl('/personal-loan-calculator'),
    siteName: "AICalculator.pro",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('personal-loan'),
        width: 1200,
        height: 630,
        alt: 'Personal Loan Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Loan (Free, No signup) - AICalculator',
    description: 'Free personal loan calculator with no sign-up required. Calculate personal loan payments, compare APRs, and analyze affordability.',
    images: [getOgImage('personal-loan')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/personal-loan-calculator'),
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
};

export default function PersonalLoanCalculatorPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Personal Loan Calculator",
        "@id": getWebAppId('/personal-loan-calculator'),
        "url": getUrl('/personal-loan-calculator'),
        "description": "Calculate personal loan payments, compare offers from top lenders, and analyze affordability with our comprehensive personal loan calculator.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Monthly payment calculation",
          "APR comparison",
          "Amortization schedule",
          "Early payoff analysis",
          "Loan comparison",
          "Affordability assessment",
          "Credit score impact analysis",
          "Total interest calculation"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/personal-loan-calculator'),
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
            "name": "Personal Loan Calculator",
            "item": getUrl('/personal-loan-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/personal-loan-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate my personal loan monthly payment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate your personal loan monthly payment, use the amortization formula: Payment = P × [r(1+r)^n] ÷ [(1+r)^n-1], where P is principal, r is monthly interest rate (APR ÷ 12), and n is number of payments. Our calculator does this automatically and shows you exactly how much you'll pay each month."
            }
          },
          {
            "@type": "Question",
            "name": "What is APR and why is it important?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "APR (Annual Percentage Rate) represents the true cost of borrowing, including interest rate and lender fees. It's more accurate than just the interest rate because it reflects the total cost of the loan. When comparing offers, always compare APRs rather than just interest rates to find the best deal."
            }
          },
          {
            "@type": "Question",
            "name": "How much can I borrow with a personal loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Personal loan amounts typically range from $1,000 to $50,000, though some lenders offer up to $100,000. The amount you can borrow depends on your credit score, income, debt-to-income ratio, and other factors. Use our affordability calculator to determine how much you can comfortably borrow based on your financial situation."
            }
          },
          {
            "@type": "Question",
            "name": "What credit score do I need for a personal loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While minimum requirements vary by lender, you'll generally need a credit score of 580-620 for approval. However, scores above 720 typically qualify for the best rates. Some lenders specialize in loans for borrowers with lower credit scores, though these come with higher interest rates and stricter terms."
            }
          },
          {
            "@type": "Question",
            "name": "Should I use a personal loan for debt consolidation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Personal loans can be excellent for debt consolidation if you can get a lower APR than your current debts. This strategy simplifies payments into one monthly bill and can save money on interest. However, ensure the monthly payment fits your budget and avoid running up new debt on paid-off accounts."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/personal-loan-calculator'),
        "name": "How to Use the Personal Loan Calculator",
        "description": "Step-by-step guide to calculating personal loan payments and comparing offers",
        "totalTime": "PT3M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": {
          "@type": "HowToTool",
          "name": "Personal Loan Calculator"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Loan Amount",
            "text": "Input the total amount you want to borrow. Personal loans typically range from $1,000 to $50,000.",
            "url": getStepUrl('/personal-loan-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Set Interest Rate (APR)",
            "text": "Enter the Annual Percentage Rate (APR) offered by the lender. This includes interest and fees. Rates typically range from 6% to 36% based on credit score.",
            "url": getStepUrl('/personal-loan-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Choose Loan Term",
            "text": "Select the repayment period in months or years. Common terms are 12, 24, 36, 48, or 60 months. Longer terms mean lower monthly payments but more total interest.",
            "url": getStepUrl('/personal-loan-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Add Origination Fees (Optional)",
            "text": "Enter any upfront fees charged by the lender, typically 1-8% of the loan amount. This affects your total borrowing cost.",
            "url": getStepUrl('/personal-loan-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Calculate Monthly Payment",
            "text": "Click Calculate to see your monthly payment, total interest, and amortization schedule. Compare multiple offers to find the best deal.",
            "url": getStepUrl('/personal-loan-calculator', 5)
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Analyze Affordability",
            "text": "Review the results to ensure the monthly payment fits your budget. Your total debt payments should not exceed 36% of your gross monthly income.",
            "url": getStepUrl('/personal-loan-calculator', 6)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/personal-loan-calculator'),
        "headline": "Personal Loan Calculator - Complete Guide to Rates, Payments & Comparison",
        "description": "Comprehensive guide to personal loans with free calculator. Learn how to calculate payments, compare APRs, and find the best loan for your needs.",
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
        "image": getOgImage('personal-loan'),
        "articleBody": "Personal loans are versatile financial tools for debt consolidation, home improvements, medical expenses, and more. Use our free calculator to compare loan offers, calculate monthly payments, and analyze total borrowing costs. Understanding APR, loan terms, and fees helps you make informed borrowing decisions."
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
        Personal Loan Calculator - Compare Rates & Calculate Monthly Payments
      </h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Personal Loan (Free, No signup)"
        calculatorUrl="/personal-loan-calculator"
      />

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Personal Loan Calculator Tool">
        <div className="container mx-auto px-4">
          <PersonalLoanCalculator />
        </div>
      </section>

      {/* Educational Content for SEO */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Personal Loan Education and Resources">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Personal Loans and Making Smart Borrowing Decisions
            </h2>

            {/* Main Content Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Personal Loan Overview */}
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