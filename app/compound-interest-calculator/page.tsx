import type { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import CompoundInterestCalculator from "@/components/Calculator/CompoundInterestCalculator";
import Link from "next/link";
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
  title: "Compound Interest (Free, No signup) - Investment Growth | AICalculator",
  description:
    "Free compound interest calculator with no sign-up required. Advanced compound interest calculator with scenario saving and comparison. Calculate investment growth, compare multiple plans, and visualize compound vs simple interest with detailed analysis.",
  keywords: [
    "compound interest calculator",
    "free compound interest calculator",
    "compound interest calculator no signup",
    "investment scenario calculator",
    "save investment plans",
    "compare investment scenarios",
    "compound interest formula",
    "investment growth calculator",
    "retirement planning calculator",
    "savings calculator",
    "interest calculator",
    "compound annual growth rate",
    "time value of money",
    "investment returns",
    "financial planning tool",
    "compound vs simple interest",
    "investment comparison tool",
    "wealth building calculator",
    "money growth calculator",
    "compound interest formula calculator",
    "daily compound interest calculator",
    "monthly compound interest calculator",
    "annual compound interest calculator",
    "compound interest investment calculator",
    "compound interest savings calculator"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Compound Interest (Free, No signup) - AICalculator",
    description:
      "Free compound interest calculator with no sign-up required. Advanced calculator with scenario saving and comparison. Calculate investment growth, save multiple plans, and compare different investment strategies with detailed analysis.",
    type: "website",
    url: getUrl('/compound-interest-calculator'),
    siteName: "AI Calculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('compound-interest'),
        width: 1200,
        height: 630,
        alt: 'Free Compound Interest Calculator - No Sign-up Required',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compound Interest (Free, No signup) - AICalculator",
    description:
      "Free compound interest calculator with no sign-up required. Plan your financial future with detailed projections and investment growth analysis.",
    images: [getOgImage('compound-interest')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/compound-interest-calculator'),
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
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": getWebAppId('/compound-interest-calculator'),
      "name": "Compound Interest Calculator",
      "url": getUrl('/compound-interest-calculator'),
      "description": "Advanced compound interest calculator with scenario saving and comparison features. Calculate investment growth with regular contributions, save multiple investment plans, and compare different strategies with detailed analysis.",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Calculate compound interest with multiple frequencies",
        "Save and name multiple investment scenarios",
        "Compare different investment strategies side-by-side",
        "Investment growth projections with regular contributions",
        "Compare compound vs simple interest advantages",
        "Year-by-year breakdown and detailed analysis",
        "Visual growth charts and progress tracking",
        "Multiple compounding frequencies (daily, monthly, quarterly, annually)",
        "Investment planning presets (retirement, college, emergency fund)",
        "Effective annual rate calculations",
        "Real-time calculation with instant results",
        "Export and share investment scenarios"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": getBreadcrumbId('/compound-interest-calculator'),
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
          "name": "Compound Interest Calculator",
          "item": getUrl('/compound-interest-calculator')
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": getFaqId('/compound-interest-calculator'),
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is compound interest and how does it work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, compound interest allows your money to grow exponentially because you earn interest on your interest. The formula is A = P(1 + r/n)^(nt), where A is the final amount, P is principal, r is annual rate, n is compounding frequency, and t is time in years."
          }
        },
        {
          "@type": "Question",
          "name": "How often should interest be compounded for maximum growth?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Generally, more frequent compounding leads to higher returns. Daily compounding typically provides the best growth, followed by monthly, quarterly, semi-annually, and annually. However, the difference between daily and monthly compounding is often minimal for most investments. The key is to start investing early and consistently rather than focusing solely on compounding frequency."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between compound and simple interest?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simple interest is calculated only on the principal amount: Interest = Principal × Rate × Time. Compound interest is calculated on both principal and accumulated interest, creating exponential growth. For example, $1,000 at 5% for 10 years: Simple interest = $1,500 total, Compound interest (annually) = $1,628.89 total. The difference becomes more significant over longer periods."
          }
        },
        {
          "@type": "Question",
          "name": "How can I use compound interest for retirement planning?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Compound interest is crucial for retirement planning. Start early to maximize the compounding effect - even small amounts can grow significantly over 30-40 years. Contribute regularly to retirement accounts like 401(k)s or IRAs, take advantage of employer matching, and consider the power of tax-deferred growth. A $200 monthly contribution at 7% annual return for 30 years can grow to over $600,000."
          }
        },
        {
          "@type": "Question",
          "name": "What factors affect compound interest calculations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Key factors include: 1) Principal amount (initial investment), 2) Interest rate (annual percentage), 3) Time period (years invested), 4) Compounding frequency (how often interest is calculated), 5) Additional contributions (regular deposits), and 6) Contribution timing (beginning vs end of period). Higher rates, longer time periods, and more frequent compounding all increase returns."
          }
        },
        {
          "@type": "Question",
          "name": "How do regular contributions affect compound interest?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Regular contributions significantly boost compound interest growth through dollar-cost averaging and increased principal. Each contribution becomes a new principal amount that earns compound interest. Monthly contributions of $500 can be more powerful than a single large deposit because each payment has time to compound. The timing matters too - contributions at the beginning of periods earn slightly more than end-of-period contributions."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "@id": getHowToId('/compound-interest-calculator'),
      "name": "How to Calculate Compound Interest",
      "description": "Step-by-step guide to calculate compound interest for investment planning",
      "totalTime": "PT5M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "tool": {
        "@type": "HowToTool",
        "name": "Compound Interest Calculator"
      },
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Gather Investment Information",
          "text": "Collect your initial principal amount, expected annual interest rate, investment time period, and planned regular contributions.",
          "url": getStepUrl('/compound-interest-calculator', 1)
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Choose Compounding Frequency",
          "text": "Determine how often interest compounds: annually, semi-annually, quarterly, monthly, weekly, or daily. More frequent compounding generally yields higher returns.",
          "url": getStepUrl('/compound-interest-calculator', 2)
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Apply the Compound Interest Formula",
          "text": "Use A = P(1 + r/n)^(nt) for basic compound interest, or use a calculator for complex scenarios with regular contributions and varying rates.",
          "url": getStepUrl('/compound-interest-calculator', 3)
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Analyze and Plan",
          "text": "Review the results, compare different scenarios, and adjust your investment strategy based on your financial goals and risk tolerance.",
          "url": getStepUrl('/compound-interest-calculator', 4)
        }
      ]
    },
    {
      "@type": "Article",
      "@id": getArticleId('/compound-interest-calculator'),
      "headline": "Compound Interest Calculator - Complete Guide to Investment Growth",
      "description": "Comprehensive guide to compound interest with free calculator. Learn how compound interest works, compare investment scenarios, and maximize your wealth building strategy.",
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
      "image": getOgImage('compound-interest'),
      "articleBody": "Master compound interest calculations with our advanced calculator. Save and compare multiple investment scenarios, visualize growth over time, and understand the power of compounding for long-term wealth building."
    }
  ]
} as const;

export default function CompoundInterestCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Compound Interest Calculator - Investment Growth & Returns Calculator</h1>
      
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link href="/financial" className="hover:text-gray-700">Financial</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Compound Interest Calculator</span>
          </div>
        </div>
      </nav>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompoundInterestCalculator />
          
          {/* Educational Content Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding Compound Interest: The Power of Time and Money
            </h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p>
                Compound interest is often called the "eighth wonder of the world" because of its remarkable ability 
                to grow wealth over time. Unlike simple interest, which only earns returns on your initial investment, 
                compound interest allows you to earn returns on both your principal and previously earned interest. 
                This creates a snowball effect that can dramatically increase your wealth over long periods.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Compound Interest Formula</h3>
              
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900 mb-4">A = P(1 + r/n)^(nt)</div>
                  <div className="text-blue-800 space-y-1 text-left">
                    <p><strong>A</strong> = Final amount after time t</p>
                    <p><strong>P</strong> = Principal (initial investment)</p>
                    <p><strong>r</strong> = Annual interest rate (as decimal)</p>
                    <p><strong>n</strong> = Number of times interest compounds per year</p>
                    <p><strong>t</strong> = Time in years</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Compounding Frequency Impact</h3>
              
              <p>
                The frequency of compounding significantly affects your returns. Here's how $10,000 invested at 6% 
                annual interest for 10 years grows with different compounding frequencies:
              </p>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-2">Annual Compounding</h4>
                  <div className="text-2xl font-bold text-green-800 mb-1">$17,908</div>
                  <p className="text-green-700 text-sm">Interest compounds once per year</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-2">Monthly Compounding</h4>
                  <div className="text-2xl font-bold text-blue-800 mb-1">$18,194</div>
                  <p className="text-blue-700 text-sm">Interest compounds 12 times per year</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h4 className="text-lg font-bold text-purple-900 mb-2">Daily Compounding</h4>
                  <div className="text-2xl font-bold text-purple-800 mb-1">$18,221</div>
                  <p className="text-purple-700 text-sm">Interest compounds 365 times per year</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Power of Starting Early</h3>
              
              <p>
                Time is the most powerful factor in compound interest. Starting early, even with smaller amounts, 
                often beats starting later with larger amounts. Consider these two scenarios:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <h4 className="text-lg font-bold text-yellow-900 mb-3">👩 Early Starter (Age 25)</h4>
                  <ul className="text-yellow-800 space-y-2 text-sm">
                    <li>• Invests $200/month for 10 years</li>
                    <li>• Total contributions: $24,000</li>
                    <li>• Stops contributing at age 35</li>
                    <li>• 7% annual return, compounds monthly</li>
                    <li>• <strong>At age 65: $525,000</strong></li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                  <h4 className="text-lg font-bold text-orange-900 mb-3">👨 Late Starter (Age 35)</h4>
                  <ul className="text-orange-800 space-y-2 text-sm">
                    <li>• Invests $200/month for 30 years</li>
                    <li>• Total contributions: $72,000</li>
                    <li>• Contributes until age 65</li>
                    <li>• 7% annual return, compounds monthly</li>
                    <li>• <strong>At age 65: $492,000</strong></li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-200 mt-4">
                <p className="text-green-800 font-semibold">
                  💡 The early starter invests $48,000 less but ends up with $33,000 more! 
                  This demonstrates the incredible power of starting early and letting compound interest work.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Investment Strategies for Maximizing Compound Interest</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">🎯 Retirement Planning</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Maximize employer 401(k) matching</li>
                    <li>• Consider Roth IRA for tax-free growth</li>
                    <li>• Increase contributions with salary raises</li>
                    <li>• Target 10-15% of income for retirement</li>
                    <li>• Use target-date funds for automatic rebalancing</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">💰 General Investing</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Diversify across asset classes</li>
                    <li>• Reinvest dividends automatically</li>
                    <li>• Use dollar-cost averaging</li>
                    <li>• Minimize fees and taxes</li>
                    <li>• Stay invested during market volatility</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Compound Interest Applications</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h5 className="font-bold text-gray-900 mb-2">🏦 Savings Accounts & CDs</h5>
                  <p className="text-gray-700 text-sm">
                    Traditional savings accounts and certificates of deposit use compound interest, 
                    though rates are typically low. High-yield savings accounts and CDs offer better 
                    rates for emergency funds and short-term goals.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h5 className="font-bold text-gray-900 mb-2">📈 Stock Market Investments</h5>
                  <p className="text-gray-700 text-sm">
                    Long-term stock market returns average 7-10% annually. Through reinvested dividends 
                    and capital appreciation, your investments compound over time. Index funds and ETFs 
                    provide diversified exposure with low fees.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h5 className="font-bold text-gray-900 mb-2">🏠 Real Estate Investment</h5>
                  <p className="text-gray-700 text-sm">
                    Real estate appreciates over time and generates rental income. REITs (Real Estate 
                    Investment Trusts) allow you to invest in real estate with compound growth through 
                    reinvested distributions and property appreciation.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h5 className="font-bold text-gray-900 mb-2">💳 Debt Compound Interest (Negative)</h5>
                  <p className="text-gray-700 text-sm">
                    Credit card debt also compounds, but against you. With average rates of 18-24%, 
                    unpaid balances grow rapidly. Paying only minimums can result in paying thousands 
                    more than the original debt amount.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Factors That Affect Compound Interest</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900">✅ Factors You Can Control</h4>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li>• <strong>Starting amount:</strong> Higher principal = more growth</li>
                    <li>• <strong>Regular contributions:</strong> Consistent investing accelerates growth</li>
                    <li>• <strong>Time horizon:</strong> Longer periods = exponential growth</li>
                    <li>• <strong>Investment choices:</strong> Higher returns compound faster</li>
                    <li>• <strong>Fees and taxes:</strong> Lower costs = more money compounding</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900">⚠️ External Factors</h4>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li>• <strong>Market volatility:</strong> Returns vary year to year</li>
                    <li>• <strong>Inflation:</strong> Reduces purchasing power over time</li>
                    <li>• <strong>Interest rate changes:</strong> Affects bond and savings returns</li>
                    <li>• <strong>Economic cycles:</strong> Recessions and expansions impact returns</li>
                    <li>• <strong>Tax law changes:</strong> Can affect after-tax returns</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Practical Tips for Maximizing Compound Interest</h3>
              
              <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200 mt-6">
                <h4 className="text-lg font-bold text-indigo-900 mb-4">💡 Expert Strategies</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-indigo-800 space-y-2 text-sm">
                    <li>• <strong>Automate investments:</strong> Set up automatic transfers</li>
                    <li>• <strong>Increase contributions annually:</strong> Boost by 1-2% each year</li>
                    <li>• <strong>Reinvest all dividends:</strong> Don't spend investment income</li>
                    <li>• <strong>Use tax-advantaged accounts:</strong> 401(k), IRA, HSA</li>
                    <li>• <strong>Start with any amount:</strong> Even $25/month makes a difference</li>
                  </ul>
                  <ul className="text-indigo-800 space-y-2 text-sm">
                    <li>• <strong>Avoid early withdrawals:</strong> Preserve the compounding</li>
                    <li>• <strong>Rebalance periodically:</strong> Maintain target allocations</li>
                    <li>• <strong>Keep fees low:</strong> Choose low-cost index funds</li>
                    <li>• <strong>Stay disciplined:</strong> Don't panic during market downturns</li>
                    <li>• <strong>Educate yourself:</strong> Understand your investments</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Mistakes to Avoid</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-red-600 font-bold">❌</span>
                  <div>
                    <strong className="text-red-900">Waiting to start investing</strong>
                    <p className="text-red-700 text-sm">Every year you delay costs you thousands in potential compound growth.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-red-600 font-bold">❌</span>
                  <div>
                    <strong className="text-red-900">Trying to time the market</strong>
                    <p className="text-red-700 text-sm">Time in the market beats timing the market for compound growth.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-red-600 font-bold">❌</span>
                  <div>
                    <strong className="text-red-900">Cashing out during market downturns</strong>
                    <p className="text-red-700 text-sm">This locks in losses and interrupts the compounding process.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-red-600 font-bold">❌</span>
                  <div>
                    <strong className="text-red-900">Ignoring fees and expenses</strong>
                    <p className="text-red-700 text-sm">High fees can reduce your compound returns by hundreds of thousands over time.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Rule of 72</h3>
              
              <p>
                The Rule of 72 is a quick way to estimate how long it takes for an investment to double. 
                Simply divide 72 by your annual return rate:
              </p>

              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 mt-4">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-yellow-900">Years to Double = 72 ÷ Annual Return Rate</div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-yellow-900">6% Return</div>
                    <div className="text-yellow-700">72 ÷ 6 = 12 years</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-yellow-900">8% Return</div>
                    <div className="text-yellow-700">72 ÷ 8 = 9 years</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-yellow-900">10% Return</div>
                    <div className="text-yellow-700">72 ÷ 10 = 7.2 years</div>
                  </div>
                </div>
              </div>

              <p className="mt-6">
                Understanding compound interest is crucial for building long-term wealth. Whether you're saving 
                for retirement, a home, education, or other financial goals, the principles of compound interest 
                can help you make informed decisions and maximize your financial growth over time.
              </p>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-12 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border border-green-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Financial Calculators</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/investment-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Investment Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Calculate investment returns and growth</p>
              </Link>
              <Link href="/retirement-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Retirement Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Plan for retirement savings goals</p>
              </Link>
              <Link href="/savings-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Savings Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Calculate savings growth over time</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
