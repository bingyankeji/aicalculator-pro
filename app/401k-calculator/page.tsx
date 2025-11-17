import { Metadata } from 'next';
import { FourZeroOneKCalculator } from '@/components/Calculator/FourZeroOneKCalculator';
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
  title: "401k Calculator - Traditional vs Roth 401k Comparison | AICalculator",
  description: "Compare Traditional vs Roth 401k retirement accounts. Calculate future value, tax implications, and find the best 401k strategy. Free calculator with employer match.",
  keywords: [
    "401k calculator", 
    "roth 401k calculator", 
    "traditional 401k calculator", 
    "401k vs roth 401k", 
    "retirement calculator", 
    "401k contribution calculator", 
    "employer match calculator", 
    "401k comparison", 
    "retirement savings calculator", 
    "401k tax calculator", 
    "roth conversion calculator", 
    "401k planning",
    "401k retirement calculator",
    "401k investment calculator",
    "401k growth calculator",
    "401k contribution limits",
    "401k employer match",
    "401k withdrawal calculator",
    "401k savings calculator",
    "401k estimator",
    "retirement planning calculator",
    "401k account calculator"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Free 401k Calculator - Traditional vs Roth Comparison",
    description: "Compare 401k account types and calculate retirement savings with employer match and tax implications.",
    type: "website",
    url: getUrl('/401k-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('401k'),
        width: 1200,
        height: 630,
        alt: '401k Calculator',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "401k Calculator - Traditional vs Roth",
    description: "Compare 401k retirement accounts and optimize your retirement savings strategy. Free calculator.",
    images: [getOgImage('401k')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/401k-calculator'),
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

export default function FourZeroOneKCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": getWebAppId('/401k-calculator'),
        "name": "401k Calculator",
        "url": getUrl('/401k-calculator'),
        "description": "Free 401k calculator comparing Traditional vs Roth 401k accounts. Calculate retirement savings, employer match, tax implications, and find optimal contribution strategy.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Traditional 401k calculation",
          "Roth 401k calculation",
          "Side-by-side comparison",
          "Employer match calculator",
          "Tax impact analysis",
          "Contribution limit checker",
          "Growth projections",
          "After-tax value comparison",
          "Interactive charts",
          "Share and export results"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/401k-calculator'),
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
            "name": "401k Calculator",
            "item": getUrl('/401k-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/401k-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between Traditional and Roth 401k?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Traditional 401k: Contributions are pre-tax (reduce taxable income now), investments grow tax-deferred, withdrawals taxed as ordinary income in retirement. Roth 401k: Contributions are after-tax (no immediate tax benefit), investments grow tax-free, qualified withdrawals are completely tax-free in retirement. Key decision factor: Pay taxes now (Roth) or later (Traditional). Choose Roth if: You're in low tax bracket now, expect higher bracket in retirement, want tax-free income in retirement, are young with decades to grow tax-free. Choose Traditional if: You're in high tax bracket now, expect lower bracket in retirement, want immediate tax deduction, need to reduce current taxable income. Most experts recommend: Split contributions between both for tax diversification."
            }
          },
          {
            "@type": "Question",
            "name": "How much should I contribute to my 401k?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Minimum: Contribute enough to get full employer match (typically 3-6% of salary) - this is free money! Recommended: 15% of gross income for retirement (including employer match). Maximum 2024 limits: $23,000 if under 50 years old, $30,500 if 50 or older (includes $7,500 catch-up). Ideal progression: 1. Contribute to get full employer match, 2. Pay off high-interest debt, 3. Build emergency fund (3-6 months expenses), 4. Max out Roth IRA ($7,000 in 2024), 5. Max out 401k ($23,000), 6. Invest in taxable accounts. Reality check: Median 401k contribution is only 6% - most Americans save far too little. Even 10% is better than 6%. Start where you can, increase 1% annually until you reach 15%+."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/401k-calculator'),
        "name": "How to Use the 401k Calculator",
        "description": "Compare Traditional vs Roth 401k in 4 steps",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": {
          "@type": "HowToTool",
          "name": "401k Calculator"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose Account Type and Timeline",
            "text": "Select Traditional or Roth 401k to compare. Enter your current age and planned retirement age. Input your current 401k balance if you have one.",
            "url": getStepUrl('/401k-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Contributions",
            "text": "Input your annual salary and how much you plan to contribute annually. Enter your employer match percentage and the salary limit it applies to. Most employers match 50-100% of first 3-6% of salary.",
            "url": getStepUrl('/401k-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Set Returns and Tax Rates",
            "text": "Enter expected annual return (historical average: 7-10%). Input your current marginal tax rate and expected retirement tax rate. Tax rates are crucial for Traditional vs Roth decision.",
            "url": getStepUrl('/401k-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Compare Results",
            "text": "Review Traditional vs Roth projections with after-tax values. See which strategy produces higher retirement income. Consider tax implications, employer match value, and contribution limits.",
            "url": getStepUrl('/401k-calculator', 4)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/401k-calculator'),
        "headline": "401k Calculator - Complete Guide to Traditional vs Roth 401k",
        "description": "Comprehensive guide to 401k retirement planning with free calculator. Learn the differences between Traditional and Roth 401k, understand employer matching, and optimize your retirement savings strategy.",
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
        "image": getOgImage('401k'),
        "articleBody": "A 401k is a powerful retirement savings tool that offers tax advantages and employer matching. Use our calculator to compare Traditional vs Roth 401k accounts, understand the tax implications, and maximize your employer match. Make informed decisions about your retirement savings strategy."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <h1 className="sr-only">401k Calculator - Free Traditional vs Roth 401k Comparison Tool</h1>
      
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
              <span itemProp="name" className="text-gray-900 font-semibold">401k Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <FourZeroOneKCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              401k Retirement Planning Guide
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding 401k Plans</h3>
                <p className="text-gray-700 mb-4">
                  A 401k is an employer-sponsored retirement savings plan that offers tax advantages. Named after section 401(k) of the IRS code, it allows you to save and invest for retirement with pre-tax or after-tax dollars, depending on account type.
                </p>
                <p className="text-gray-700">
                  <strong>Key features:</strong> Tax-advantaged growth, employer matching contributions, automatic payroll deductions, investment options (stocks, bonds, target-date funds), portability when changing jobs, penalties for early withdrawal before age 59½, required minimum distributions (RMDs) starting at age 73.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Traditional vs Roth 401k</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-900 mb-1">Traditional 401k</div>
                    <div className="text-xs text-gray-700">
                      • Contributions reduce taxable income now<br/>
                      • Tax-deferred growth (no taxes until withdrawal)<br/>
                      • Withdrawals taxed as ordinary income<br/>
                      • Best if: High tax bracket now, lower in retirement
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-900 mb-1">Roth 401k</div>
                    <div className="text-xs text-gray-700">
                      • After-tax contributions (no immediate tax benefit)<br/>
                      • Tax-free growth forever<br/>
                      • Withdrawals completely tax-free in retirement<br/>
                      • Best if: Low tax bracket now, higher in retirement
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the difference between Traditional and Roth 401k?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Traditional 401k: Contributions are pre-tax (reduce taxable income now), investments grow tax-deferred, withdrawals taxed as ordinary income in retirement. Roth 401k: Contributions are after-tax (no immediate tax benefit), investments grow tax-free, qualified withdrawals are completely tax-free in retirement. Key decision factor: Pay taxes now (Roth) or later (Traditional). Choose Roth if: You're in low tax bracket now, expect higher bracket in retirement, want tax-free income in retirement, are young with decades to grow tax-free. Choose Traditional if: You're in high tax bracket now, expect lower bracket in retirement, want immediate tax deduction, need to reduce current taxable income. Most experts recommend: Split contributions between both for tax diversification.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much should I contribute to my 401k?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Minimum: Contribute enough to get full employer match (typically 3-6% of salary) - this is free money! Recommended: 15% of gross income for retirement (including employer match). Maximum 2024 limits: $23,000 if under 50 years old, $30,500 if 50 or older (includes $7,500 catch-up). Ideal progression: 1. Contribute to get full employer match, 2. Pay off high-interest debt, 3. Build emergency fund (3-6 months expenses), 4. Max out Roth IRA ($7,000 in 2024), 5. Max out 401k ($23,000), 6. Invest in taxable accounts. Reality check: Median 401k contribution is only 6% - most Americans save far too little. Even 10% is better than 6%. Start where you can, increase 1% annually until you reach 15%+.
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
                <a href="/retirement-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Retirement Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate total retirement savings needs</p>
                </a>
                <a href="/investment-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Investment Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Compare lump sum vs dollar-cost averaging</p>
                </a>
                <a href="/interest-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Compound Interest Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate compound growth and Rule of 72</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

