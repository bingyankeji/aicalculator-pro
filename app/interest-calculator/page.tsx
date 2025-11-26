import { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { InterestCalculator } from "@/components/Calculator/InterestCalculator";
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
  title: "Interest Calculator (Free, No signup) - Compound Interest | AICalculator",
  description: "Free interest calculator with no sign-up required. Compound interest calculator with tax and inflation adjustment. Calculate investment growth with compound interest, regular contributions, different compounding frequencies, tax impact, and inflation-adjusted buying power. See year-by-year breakdown, effective annual rate, Rule of 72, and total interest earned. Perfect for savings, investments, and retirement planning.",
  keywords: [
    "compound interest calculator",
    "free interest calculator",
    "interest calculator no signup",
    "interest calculator",
    "compound interest",
    "investment calculator",
    "savings calculator",
    "simple interest calculator",
    "compound interest formula",
    "interest rate calculator",
    "daily compound interest calculator",
    "monthly compound interest calculator",
    "investment growth calculator",
    "retirement savings calculator",
    "APY calculator",
    "effective interest rate calculator",
    "continuous compound interest",
    "compound interest calculator with regular contributions",
    "interest earned calculator",
    "free interest calculator",
    "online interest calculator",
    "rule of 72 calculator",
    "compound interest with tax",
    "inflation adjusted returns calculator",
    "after tax investment calculator",
    "real return calculator",
    "buying power calculator",
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Interest Calculator (Free, No signup) - AICalculator",
    description: "Free interest calculator with no sign-up required. Calculate compound interest and investment growth. With regular contributions, multiple compounding frequencies, and year-by-year breakdown.",
    type: "website",
    url: getUrl('/interest-calculator'),
    siteName: "Calculator Online - AICalculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('interest'),
        width: 1200,
        height: 630,
        alt: 'Interest Calculator',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interest Calculator (Free, No signup) - AICalculator",
    description: "Free interest calculator with no sign-up required. Calculate compound interest, investment growth, and savings with regular contributions. Detailed breakdown included.",
    images: [getOgImage('interest')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/interest-calculator'),
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

export default function InterestCalculatorPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // WebApplication Schema
      {
        "@type": "WebApplication",
        "name": "Compound Interest Calculator",
        "@id": getWebAppId('/interest-calculator'),
        "url": getUrl('/interest-calculator'),
        "description": "Free online compound interest calculator. Calculate investment growth with compound interest, regular contributions, different compounding frequencies (daily, monthly, quarterly, annually, continuously), effective annual rate (EAR), and year-by-year breakdown.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate compound interest with any initial principal",
          "Multiple compounding frequencies (daily, monthly, quarterly, annually, continuously)",
          "Regular contribution support (monthly or yearly)",
          "Effective Annual Rate (EAR) calculation",
          "Year-by-year balance breakdown",
          "Total interest earned calculation",
          "Simple and compound interest comparison",
          "Share and export results"
        ]
      },
      // BreadcrumbList Schema
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/interest-calculator'),
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
            "item": getUrl('/interest-calculator')
          }
        ]
      },
      // FAQPage Schema
      {
        "@type": "FAQPage",
        "@id": getFaqId('/interest-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate compound interest?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Compound interest is calculated using the formula: A = P(1 + r/n)^(nt), where A is the future value, P is the principal amount, r is the annual interest rate (decimal), n is the number of times interest is compounded per year, and t is time in years. For continuous compounding, use A = Pe^(rt). Our calculator handles all these calculations automatically and also accounts for regular contributions."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between simple and compound interest?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simple interest is calculated only on the principal amount: I = P × r × t. Compound interest is calculated on the principal plus accumulated interest, so you earn 'interest on interest'. For example, $10,000 at 5% for 10 years yields $5,000 with simple interest, but $6,288.95 with annual compound interest - a difference of $1,288.95. The more frequent the compounding, the more interest you earn."
            }
          },
          {
            "@type": "Question",
            "name": "How does compounding frequency affect my returns?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "More frequent compounding leads to higher returns. For example, $10,000 at 5% annual interest for 10 years yields: Annually $16,288.95, Semi-annually $16,386.16, Quarterly $16,436.19, Monthly $16,470.09, Daily $16,486.65, and Continuously $16,487.21. Daily compounding earns $197.70 more than annual compounding. The difference becomes more significant with higher interest rates and longer time periods."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Effective Annual Rate (EAR)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Effective Annual Rate (EAR) is the actual annual return, accounting for compounding. It's calculated as EAR = (1 + r/n)^n - 1. For example, a 5% interest rate compounded monthly has an EAR of 5.116%, meaning you actually earn 5.116% per year, not just 5%. EAR allows you to compare investments with different compounding frequencies on an apples-to-apples basis."
            }
          },
          {
            "@type": "Question",
            "name": "How can I maximize my investment growth with compound interest?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Maximize investment growth by: 1) Starting early - time is the most powerful factor in compounding. 2) Making regular contributions - even small monthly additions significantly boost growth. 3) Seeking higher interest rates - shop around for the best rates. 4) Choosing more frequent compounding - daily or monthly compounding earns more than annual. 5) Avoiding early withdrawals - let your money compound uninterrupted. 6) Reinvesting all earnings - don't withdraw interest, let it compound. A 25-year-old investing $200/month at 7% will have $528,000 at age 65, compared to only $244,000 if starting at age 35."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Rule of 72 and how do I use it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Rule of 72 is a simple formula to estimate how long it takes to double your money: divide 72 by your annual interest rate. For example, at 8% interest, your money doubles in approximately 72 ÷ 8 = 9 years. At 10%, it takes 72 ÷ 10 = 7.2 years. This rule works best for interest rates between 6% and 10%. It's a quick mental math tool for comparing investments without complex calculations."
            }
          },
          {
            "@type": "Question",
            "name": "How do taxes affect my investment returns?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Taxes significantly reduce investment returns. Interest income is typically taxed as ordinary income. For example, $10,000 earning 6% for 20 years grows to $32,071 tax-free, but only $26,533 after 25% taxes. Use tax-advantaged accounts like 401(k), IRA, or HSA to defer or eliminate taxes. For taxable accounts, hold investments over 1 year to qualify for lower long-term capital gains rates."
            }
          },
          {
            "@type": "Question",
            "name": "How does inflation impact my investment growth?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Inflation erodes purchasing power over time. With 3% inflation, your investment return must exceed inflation to grow real wealth. After accounting for 25% taxes, you need at least 4% annual returns to maintain purchasing power against 3% inflation. Always consider real return (return minus inflation) when evaluating investments."
            }
          }
        ]
      },
      // HowTo Schema
      {
        "@type": "HowTo",
        "@id": getHowToId('/interest-calculator'),
        "name": "How to Use the Compound Interest Calculator",
        "description": "Step-by-step guide to calculating compound interest and investment growth",
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
            "name": "Enter Initial Principal",
            "text": "Enter your starting investment amount in dollars. This is the initial sum you're investing or have saved.",
            "url": getStepUrl('/interest-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Set Interest Rate",
            "text": "Enter the annual interest rate as a percentage. For example, enter 5 for 5% annual interest.",
            "url": getStepUrl('/interest-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Choose Time Period",
            "text": "Enter the investment duration and select years or months from the dropdown.",
            "url": getStepUrl('/interest-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Select Compounding Frequency",
            "text": "Choose how often interest compounds: annually, semi-annually, quarterly, monthly, daily, or continuously. More frequent compounding yields higher returns.",
            "url": getStepUrl('/interest-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Add Regular Contributions (Optional)",
            "text": "Enter an amount for regular contributions and select monthly or yearly frequency. This simulates consistent investing.",
            "url": getStepUrl('/interest-calculator', 5)
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Calculate and Review Results",
            "text": "Click 'Calculate Compound Interest' to see your future value, total interest earned, effective annual rate, and year-by-year breakdown. Share or export your results as needed.",
            "url": getStepUrl('/interest-calculator', 6)
          }
        ]
      },
      // Article Schema
      {
        "@type": "Article",
        "@id": getArticleId('/interest-calculator'),
        "headline": "Compound Interest Calculator - Complete Guide to Investment Growth",
        "description": "Comprehensive guide to compound interest calculations with free calculator. Learn how compound interest works, understand different compounding frequencies, and maximize your investment returns.",
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
        "image": getOgImage('interest'),
        "articleBody": "Compound interest is the eighth wonder of the world. Use our calculator to see how your investments grow over time with compound interest, regular contributions, and different compounding frequencies. Understand the power of time and consistent investing for building wealth."
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
        Compound Interest Calculator - Free Investment Growth Calculator with Regular Contributions and Multiple Compounding Frequencies
      </h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Interest Calculator (Free, No signup)"
        calculatorUrl="/interest-calculator"
      />

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Compound Interest Calculator Tool">
        <div className="container mx-auto px-4">
          <InterestCalculator />
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Compound Interest Calculator Information">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* What is Compound Interest */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Compound Interest?</h2>
                <p className="text-gray-700 mb-4">
                  Compound interest is the interest calculated on the initial principal and also on the accumulated interest 
                  from previous periods. Often called "interest on interest," it makes your money grow faster than simple 
                  interest, which is calculated only on the principal amount. Albert Einstein reportedly called compound 
                  interest "the eighth wonder of the world."
                </p>
                <p className="text-gray-700">
                  The compound interest formula is: <strong>A = P(1 + r/n)^(nt)</strong>, where A is the future value, 
                  P is the principal, r is the annual interest rate (as a decimal), n is the number of compounding periods 
                  per year, and t is time in years. For continuous compounding, the formula becomes <strong>A = Pe^(rt)</strong>.
                </p>
              </div>

              {/* How Compounding Frequency Works */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How Compounding Frequency Affects Growth</h2>
                <p className="text-gray-700 mb-4">
                  The frequency of compounding significantly impacts your investment growth. More frequent compounding 
                  means interest is added to your principal more often, allowing you to earn interest on a larger balance.
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <div><strong>Example:</strong> $10,000 at 5% for 10 years:</div>
                  <div>• Annually: $16,288.95 (1x per year)</div>
                  <div>• Semi-annually: $16,386.16 (2x per year)</div>
                  <div>• Quarterly: $16,436.19 (4x per year)</div>
                  <div>• Monthly: $16,470.09 (12x per year)</div>
                  <div>• Daily: $16,486.65 (365x per year)</div>
                  <div>• Continuously: $16,487.21 (infinite)</div>
                </div>
                <p className="text-gray-700 mt-4">
                  Daily compounding earns $197.70 more than annual compounding - a 1.2% increase!
                </p>
              </div>

              {/* Compound vs Simple Interest */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Compound vs Simple Interest</h2>
                <p className="text-gray-700 mb-4">
                  Simple interest is calculated only on the principal: <strong>I = P × r × t</strong>. Compound interest 
                  is calculated on the principal plus accumulated interest, creating exponential growth.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="font-bold text-gray-900 mb-2">Example: $10,000 at 5% for 10 years</div>
                  <div className="space-y-1 text-sm text-gray-700">
                    <div>• <strong>Simple Interest:</strong> $15,000 total ($5,000 interest)</div>
                    <div>• <strong>Compound Interest:</strong> $16,288.95 total ($6,288.95 interest)</div>
                    <div className="text-green-600 font-semibold">Difference: $1,288.95 extra with compound interest!</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  The longer the time period and the higher the interest rate, the more significant this difference becomes.
                </p>
              </div>

              {/* The Power of Regular Contributions */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Power of Regular Contributions</h2>
                <p className="text-gray-700 mb-4">
                  Adding regular contributions dramatically accelerates wealth building. Even small monthly additions 
                  compound over time to create substantial growth through dollar-cost averaging.
                </p>
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <div className="font-bold text-gray-900 mb-2">Example: $10,000 initial + $200/month at 7% for 30 years</div>
                  <div className="space-y-1 text-sm text-gray-700">
                    <div>• Initial investment only: $76,122</div>
                    <div>• With $200/month contributions: $319,474</div>
                    <div>• Total contributions: $82,000</div>
                    <div className="text-green-600 font-semibold">Total interest earned: $237,474</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  Regular contributions more than quadruple your final amount, with nearly 75% of the final value coming from interest!
                </p>
              </div>

              {/* The Rule of 72 */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Rule of 72</h2>
                <p className="text-gray-700 mb-4">
                  The Rule of 72 is a quick mental math formula to estimate how long it takes to double your money. 
                  Simply divide 72 by your interest rate to get the approximate number of years.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="font-bold text-gray-900 mb-2">Formula: Years to Double = 72 ÷ Interest Rate</div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>• At 6% interest: 72 ÷ 6 = 12 years</div>
                    <div>• At 8% interest: 72 ÷ 8 = 9 years</div>
                    <div>• At 10% interest: 72 ÷ 10 = 7.2 years</div>
                    <div>• At 12% interest: 72 ÷ 12 = 6 years</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  This rule works best for interest rates between 6% and 10%, but provides reasonable estimates for rates 
                  below 20%. It's a handy tool for quick investment comparisons and planning.
                </p>
              </div>

              {/* Tax Impact */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Impact of Taxes on Investment Growth</h2>
                <p className="text-gray-700 mb-4">
                  Taxes significantly reduce investment returns. Interest earned on savings accounts, bonds, and CDs is 
                  typically taxed as ordinary income. Tax-advantaged accounts like 401(k) and IRA can help defer or eliminate taxes.
                </p>
                <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                  <div className="font-bold text-gray-900 mb-2">Example: $100,000 at 6% for 20 years</div>
                  <div className="space-y-1 text-sm text-gray-700">
                    <div>• Without tax: $320,714 (220.7% return)</div>
                    <div>• With 25% tax rate: $265,330 (165.3% return)</div>
                    <div className="text-red-600 font-semibold">Tax cost: $55,384 (25% of returns lost)</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  Minimize tax impact by using tax-advantaged retirement accounts, tax-free municipal bonds (for high earners), 
                  and holding investments long-term to qualify for lower capital gains rates.
                </p>
              </div>

              {/* Inflation Impact */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Inflation's Impact</h2>
                <p className="text-gray-700 mb-4">
                  Inflation erodes purchasing power over time. The average U.S. inflation rate has been around 3% over the 
                  past 100 years. Your investment return must exceed inflation to grow real wealth.
                </p>
                <div className="bg-orange-50 rounded-lg p-4 mb-4">
                  <div className="font-bold text-gray-900 mb-2">Example: $10,000 with 5% interest vs 3% inflation</div>
                  <div className="space-y-1 text-sm text-gray-700">
                    <div>• After 10 years nominal value: $16,289</div>
                    <div>• Buying power (adjusted): $12,141</div>
                    <div>• Real return: only 2% per year (5% - 3%)</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  For middle-class households with ~25% tax rates, you need at least 4% annual returns just to maintain 
                  purchasing power against 3% inflation. This highlights the importance of investing over saving in low-yield accounts.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions About Compound Interest
              </h2>
              
              <div className="space-y-6">
                
                {/* FAQ 1 */}
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How do I calculate compound interest?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Compound interest is calculated using the formula: A = P(1 + r/n)^(nt), where A is the future value, 
                      P is the principal amount, r is the annual interest rate (as a decimal), n is the number of times 
                      interest is compounded per year, and t is time in years. For continuous compounding, use A = Pe^(rt). 
                      Our calculator handles all these calculations automatically and also accounts for regular contributions.
                    </p>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What is the difference between simple and compound interest?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Simple interest is calculated only on the principal amount: I = P × r × t. Compound interest is 
                      calculated on the principal plus accumulated interest, so you earn "interest on interest." For example, 
                      $10,000 at 5% for 10 years yields $5,000 with simple interest, but $6,288.95 with annual compound 
                      interest - a difference of $1,288.95. The more frequent the compounding, the more interest you earn.
                    </p>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How does compounding frequency affect my returns?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      More frequent compounding leads to higher returns. For example, $10,000 at 5% annual interest for 
                      10 years yields: Annually $16,288.95, Semi-annually $16,386.16, Quarterly $16,436.19, Monthly $16,470.09, 
                      Daily $16,486.65, and Continuously $16,487.21. Daily compounding earns $197.70 more than annual compounding. 
                      The difference becomes more significant with higher interest rates and longer time periods.
                    </p>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What is the Effective Annual Rate (EAR)?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      The Effective Annual Rate (EAR) is the actual annual return, accounting for compounding. It's calculated 
                      as EAR = (1 + r/n)^n - 1. For example, a 5% interest rate compounded monthly has an EAR of 5.116%, 
                      meaning you actually earn 5.116% per year, not just 5%. EAR allows you to compare investments with 
                      different compounding frequencies on an apples-to-apples basis.
                    </p>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How can I maximize my investment growth with compound interest?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Maximize investment growth by: 1) Starting early - time is the most powerful factor in compounding. 
                      2) Making regular contributions - even small monthly additions significantly boost growth. 3) Seeking 
                      higher interest rates - shop around for the best rates. 4) Choosing more frequent compounding - daily 
                      or monthly compounding earns more than annual. 5) Avoiding early withdrawals - let your money compound 
                      uninterrupted. 6) Reinvesting all earnings - don't withdraw interest, let it compound. A 25-year-old 
                      investing $200/month at 7% will have $528,000 at age 65, compared to only $244,000 if starting at age 35.
                    </p>
                  </div>
                </div>

                {/* FAQ 6 - Rule of 72 */}
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What is the Rule of 72 and how do I use it?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      The Rule of 72 is a simple formula to estimate how long it takes to double your money: divide 72 by your 
                      annual interest rate. For example, at 8% interest, your money doubles in approximately 72 ÷ 8 = 9 years. 
                      At 10%, it takes 72 ÷ 10 = 7.2 years. This rule works best for interest rates between 6% and 10%. It's 
                      a quick mental math tool for comparing investments and understanding the power of compound interest without 
                      complex calculations.
                    </p>
                  </div>
                </div>

                {/* FAQ 7 - Tax Impact */}
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How do taxes affect my investment returns?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Taxes significantly reduce investment returns. Interest income from savings accounts, bonds, and CDs is 
                      typically taxed as ordinary income (up to 37% federal rate for high earners). For example, $10,000 
                      earning 6% for 20 years grows to $32,071 tax-free, but only $26,533 after 25% taxes - a loss of $5,538. 
                      Use tax-advantaged accounts like 401(k), IRA, or HSA to defer or eliminate taxes. Roth accounts provide 
                      tax-free growth. For taxable accounts, hold investments over 1 year to qualify for lower long-term capital 
                      gains rates (0%, 15%, or 20% vs ordinary income rates).
                    </p>
                  </div>
                </div>

                {/* FAQ 8 - Inflation Impact */}
                <div className="pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How does inflation impact my investment growth?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Inflation erodes purchasing power, meaning your money buys less over time. With 3% average inflation, 
                      $10,000 today will only have $7,441 of buying power in 10 years. Your investment return must exceed inflation 
                      to grow real wealth. For example, 5% nominal returns with 3% inflation equals only 2% real returns. After 
                      accounting for 25% taxes on interest, you need at least 4% annual returns to maintain purchasing power against 
                      3% inflation. This is why keeping large amounts in low-yield savings accounts (often under 1%) actually loses 
                      value over time. Always consider "real return" (return minus inflation) when evaluating investments.
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
                      className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate loan payments and interest</p>
                </Link>
                <Link href="/mortgage-calculator" 
                      className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Mortgage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate monthly mortgage payments</p>
                </Link>
                <Link href="/percentage-calculator" 
                      className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate percentages and interest rates</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

