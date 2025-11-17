import { Metadata } from "next";
import Link from "next/link";
import { VAMortgageCalculator } from "@/components/Calculator/VAMortgageCalculator";
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
  title: "VA Mortgage Calculator - Calculate VA Loan Payments & Funding Fees",
  description: "Free VA mortgage calculator for veterans, active duty & military families. Calculate payments, funding fees, and see how much you can save with zero-down VA loans.",
  keywords: [
    "VA mortgage calculator",
    "VA loan calculator",
    "VA home loan calculator",
    "VA funding fee calculator",
    "veterans mortgage calculator",
    "military home loan calculator",
    "VA loan payment calculator",
    "VA mortgage rates",
    "VA loan eligibility",
    "zero down mortgage calculator",
    "VA loan benefits",
    "VA certificate of eligibility",
    "VA loan limits",
    "VA refinance calculator",
    "IRRRL calculator",
    "VA cash out refinance",
    "VA loan requirements",
    "military mortgage calculator",
    "veteran home buying",
    "VA loan closing costs"
  ],
  openGraph: {
    title: "VA Mortgage Calculator - Calculate VA Loan Payments & Funding Fees",
    description: "Free VA mortgage calculator for veterans, active duty & military families. Calculate payments, funding fees, and see how much you can save with zero-down VA loans.",
    type: "website",
    url: getUrl('/va-mortgage-calculator'),
    siteName: "AICalculator.pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "VA Mortgage Calculator - Calculate VA Loan Payments & Funding Fees",
    description: "Free VA mortgage calculator for veterans, active duty & military families. Calculate payments, funding fees, and see how much you can save with zero-down VA loans.",
    site: "@AICalculatorPro",
  },
  alternates: {
    canonical: getUrl('/va-mortgage-calculator'),
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

export default function VAMortgageCalculatorPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "VA Mortgage Calculator",
        "@id": getWebAppId('/va-mortgage-calculator'),
        "url": getUrl('/va-mortgage-calculator'),
        "description": "Calculate VA loan payments, funding fees, and savings for veterans and military families. Zero down payment, no PMI required.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Zero down payment calculation",
          "VA funding fee calculation (0%-3.3%)",
          "No PMI savings analysis",
          "Disability exemption check",
          "VA loan limits verification",
          "Military status selection",
          "VA vs conventional comparison",
          "Monthly payment breakdown"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/va-mortgage-calculator'),
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
            "name": "VA Mortgage Calculator",
            "item": getUrl('/va-mortgage-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/va-mortgage-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do I need a down payment for a VA loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, VA loans offer 100% financing with zero down payment required. This is one of the most significant benefits of VA loans, allowing eligible veterans and service members to purchase a home without saving for a down payment. However, making a down payment can reduce your funding fee and monthly payments."
            }
          },
          {
            "@type": "Question",
            "name": "What is the VA funding fee and can it be waived?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The VA funding fee is a one-time payment that ranges from 1.25% to 3.3% of the loan amount, depending on your service type, down payment, and whether it's your first VA loan. Veterans with a service-connected disability rating of 10% or higher are exempt from this fee. The fee can be rolled into your loan amount."
            }
          },
          {
            "@type": "Question",
            "name": "What are the VA loan limits for 2024?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For 2024, the VA loan limit is $766,550 in most counties. However, if you have full VA loan entitlement, there's technically no limit to how much you can borrow without a down payment, though lenders will still consider your income and debt-to-income ratio. High-cost counties have higher limits up to $1,149,250."
            }
          },
          {
            "@type": "Question",
            "name": "What credit score do I need for a VA loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While the VA doesn't set a minimum credit score, most lenders require at least 620. However, some VA-approved lenders may work with scores as low as 580. VA loans are generally more flexible with credit requirements compared to conventional loans, and lenders focus more on your overall financial picture."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use a VA loan more than once?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can use your VA loan benefit multiple times. Your entitlement restores when you sell the home and pay off the VA loan, or you may have remaining entitlement to use for another purchase. You can even have two VA loans at the same time in certain circumstances, such as when relocating for military orders."
            }
          },
          {
            "@type": "Question",
            "name": "What types of properties can I buy with a VA loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "VA loans can be used to purchase single-family homes, condos (if VA-approved), townhouses, and multi-unit properties (up to 4 units) as long as you occupy one unit as your primary residence. The property must meet VA minimum property requirements and be move-in ready. Investment properties and vacation homes are not eligible."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/va-mortgage-calculator'),
        "name": "How to Use the VA Mortgage Calculator",
        "description": "Step-by-step guide to calculating VA loan payments and benefits",
        "totalTime": "PT4M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": {
          "@type": "HowToTool",
          "name": "VA Mortgage Calculator"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Home Price",
            "text": "Input the purchase price of the home. VA loans have no maximum limit, but lenders may have their own limits. County loan limits are $766,550 (standard) to $1,149,250 (high-cost).",
            "url": getStepUrl('/va-mortgage-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Set Down Payment (Optional)",
            "text": "VA loans allow 0% down payment, but you can put money down to reduce the funding fee or lower monthly payments. Any down payment is optional.",
            "url": getStepUrl('/va-mortgage-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Select Military Status",
            "text": "Choose your service type (Active Duty, Veteran, Reserve/National Guard). This affects the VA funding fee percentage (0-3.3%).",
            "url": getStepUrl('/va-mortgage-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Check Disability Status",
            "text": "If you have a 10%+ VA disability rating, you are exempt from the funding fee, saving thousands of dollars. Select Yes if applicable.",
            "url": getStepUrl('/va-mortgage-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Enter Interest Rate",
            "text": "Input the VA mortgage interest rate. VA rates are typically 0.25-0.5% lower than conventional loans due to government backing.",
            "url": getStepUrl('/va-mortgage-calculator', 5)
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Compare with Conventional",
            "text": "Review the comparison showing VA loan savings vs conventional loans. VA loans save money by eliminating PMI and allowing zero down payment.",
            "url": getStepUrl('/va-mortgage-calculator', 6)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/va-mortgage-calculator'),
        "headline": "VA Mortgage Calculator - Complete Guide to VA Loans for Veterans",
        "description": "Comprehensive guide to VA loans with free calculator. Learn about zero down payment, no PMI, funding fees, disability exemptions, and how VA loans help veterans and military families buy homes.",
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
        "image": getOgImage('va-mortgage'),
        "articleBody": "VA loans are government-backed mortgages guaranteed by the Department of Veterans Affairs, exclusively for veterans, active duty service members, and eligible surviving spouses. With 0% down payment, no PMI, competitive interest rates, and disability exemptions, VA loans offer unmatched benefits for military families. The VA funding fee (0-3.3%) is the only additional cost, and it can be financed into the loan."
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
        VA Mortgage Calculator - Calculate VA Loan Payments & Funding Fees
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
              <Link href="/category/mortgage" className="hover:text-blue-600 transition-colors">
                Mortgage
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-semibold">VA Mortgage Calculator</li>
          </ol>
        </div>
      </nav>

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="VA Mortgage Calculator Tool">
        <div className="container mx-auto px-4">
          <VAMortgageCalculator />
        </div>
      </section>

      {/* Educational Content for SEO */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="VA Loan Education and Resources">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding VA Loans and Military Home Buying Benefits
            </h2>

            {/* Main Content Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* VA Loan Overview */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    🎖️
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">What Are VA Loans?</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  VA loans are mortgage loans guaranteed by the U.S. Department of Veterans Affairs, designed exclusively for veterans, active-duty service members, and eligible surviving spouses. They offer exceptional benefits that make homeownership more accessible.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Zero Down Payment:</strong> 100% financing available</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>No PMI:</strong> Save hundreds monthly</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Competitive Rates:</strong> Lower than conventional loans</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Flexible Credit:</strong> More lenient requirements</span>
                  </div>
                </div>
              </div>

              {/* VA Funding Fee */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                    💵
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">VA Funding Fee</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  The VA funding fee is a one-time payment that helps keep the VA loan program running. It varies based on your service type, down payment, and whether it's your first VA loan. Our calculator includes this fee in your estimates.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">💰</span>
                    <span><strong>First-Time Use:</strong> 2.15% with zero down</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">🔄</span>
                    <span><strong>Subsequent Use:</strong> 3.3% with zero down</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">📉</span>
                    <span><strong>With Down Payment:</strong> Lower fee rates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">🎖️</span>
                    <span><strong>Disabled Veterans:</strong> Fee waived</span>
                  </div>
                </div>
              </div>

              {/* VA Loan Eligibility */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border-2 border-blue-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-2xl text-white">
                    ✅
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">VA Loan Eligibility</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  VA loans are available to veterans, active-duty service members, National Guard and Reserve members, and eligible surviving spouses. You'll need a Certificate of Eligibility (COE) to apply.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">🎖️</span>
                    <span><strong>Veterans:</strong> 90+ days active wartime or 181+ days peacetime</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">⚔️</span>
                    <span><strong>Active Duty:</strong> 90+ continuous days of service</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">🛡️</span>
                    <span><strong>Guard/Reserve:</strong> 6+ years of service</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">💙</span>
                    <span><strong>Surviving Spouses:</strong> Of service members who died in service or from service-related disability</span>
                  </div>
                </div>
              </div>

              {/* VA Loan Types */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg border-2 border-purple-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-2xl text-white">
                    🏡
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">VA Loan Types</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  VA loans come in several types to meet different needs, from purchasing your first home to refinancing an existing mortgage. Each type offers unique benefits for eligible borrowers.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">🏠</span>
                    <span><strong>Purchase Loan:</strong> Buy a home with zero down</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">🔄</span>
                    <span><strong>IRRRL:</strong> Streamline refinance for lower rates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">💰</span>
                    <span><strong>Cash-Out Refinance:</strong> Access home equity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">🔨</span>
                    <span><strong>Native American Direct Loan:</strong> For tribal lands</span>
                  </div>
                </div>
              </div>
            </div>

            {/* VA Loan Program Statistics */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                VA Loan Program Statistics
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">24+ Million</div>
                  <p className="text-gray-600">VA Loans Guaranteed Since 1944</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">0%</div>
                  <p className="text-gray-600">Down Payment Required</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">$766,550</div>
                  <p className="text-gray-600">2024 Loan Limit (Most Counties)</p>
                </div>
              </div>
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong className="text-blue-900">💡 Key Insight:</strong> VA loans typically offer interest rates 0.5-1% lower than conventional loans, and the lack of PMI can save borrowers $100-300 per month on a typical home purchase.
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
                    Do I need a down payment for a VA loan?
                  </h3>
                  <p className="text-gray-700">
                    No, VA loans offer 100% financing with zero down payment required. This is one of the most significant benefits of VA loans, allowing eligible veterans and service members to purchase a home without saving for a down payment. However, making a down payment can reduce your funding fee and monthly payments.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What is the VA funding fee and can it be waived?
                  </h3>
                  <p className="text-gray-700">
                    The VA funding fee is a one-time payment that ranges from 1.25% to 3.3% of the loan amount, depending on your service type, down payment, and whether it's your first VA loan. Veterans with a service-connected disability rating of 10% or higher are exempt from this fee. The fee can be rolled into your loan amount.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What are the VA loan limits for 2024?
                  </h3>
                  <p className="text-gray-700">
                    For 2024, the VA loan limit is $766,550 in most counties. However, if you have full VA loan entitlement, there's technically no limit to how much you can borrow without a down payment, though lenders will still consider your income and debt-to-income ratio. High-cost counties have higher limits.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What credit score do I need for a VA loan?
                  </h3>
                  <p className="text-gray-700">
                    While the VA doesn't set a minimum credit score, most lenders require at least 620. However, some VA-approved lenders may work with scores as low as 580. VA loans are generally more flexible with credit requirements compared to conventional loans, and lenders focus more on your overall financial picture.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Can I use a VA loan more than once?
                  </h3>
                  <p className="text-gray-700">
                    Yes, you can use your VA loan benefit multiple times. Your entitlement restores when you sell the home and pay off the VA loan, or you may have remaining entitlement to use for another purchase. You can even have two VA loans at the same time in certain circumstances, such as when relocating for military orders.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What types of properties can I buy with a VA loan?
                  </h3>
                  <p className="text-gray-700">
                    VA loans can be used to purchase single-family homes, condos (if VA-approved), townhouses, and multi-unit properties (up to 4 units) as long as you occupy one unit as your primary residence. The property must meet VA minimum property requirements and be move-in ready. Investment properties and vacation homes are not eligible.
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
                <Link href="/fha-loan-calculator"
                      className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">🏘️</div>
                  <div className="font-semibold text-gray-900">FHA Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate FHA mortgage payments</p>
                </Link>
                <Link href="/mortgage-calculator"
                      className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="font-semibold text-gray-900">Mortgage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Home loan payment calculator</p>
                </Link>
                <Link href="/refinance-calculator"
                      className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">🔄</div>
                  <div className="font-semibold text-gray-900">Refinance Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate refinance savings</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}