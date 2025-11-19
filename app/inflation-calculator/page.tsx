import type { Metadata } from 'next';
import Link from 'next/link';
import { InflationCalculator } from '@/components/Calculator/InflationCalculator';
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
  title: 'Inflation Calculator (Free, No signup) - Purchasing Power | AICalculator',
  description: 'Free inflation calculator with no sign-up required. Calculate inflation impact and purchasing power loss over time. Shows how much money loses value, future value calculations, and investment recommendations to beat inflation.',
  keywords: [
    'inflation calculator',
    'free inflation calculator',
    'inflation calculator no signup',
    'purchasing power calculator',
    'inflation rate calculator',
    'cost of living calculator',
    'money value calculator',
    'inflation adjustment calculator',
    'historical inflation calculator',
    'future value inflation',
    'CPI calculator',
    'consumer price index calculator',
    'inflation impact',
    'purchasing power loss',
    'inflation hedge',
    'inflation protected investments',
    'real value calculator',
    'inflation adjusted calculator',
    'inflation erosion calculator',
    'price inflation calculator',
    'inflation comparison calculator',
    'inflation over time calculator',
    'inflation investment calculator',
    'beat inflation calculator'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Inflation Calculator (Free, No signup) - AICalculator',
    description: 'Free inflation calculator with no sign-up required. Calculate how inflation affects your money over time. See purchasing power loss, future value projections, and get recommendations to protect wealth from inflation.',
    type: 'website',
    url: getUrl('/inflation-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [
      {
        url: getOgImage('inflation'),
        width: 1200,
        height: 630,
        alt: 'Free Inflation Calculator - No Sign-up Required',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inflation Calculator (Free, No signup) - AICalculator',
    description: 'Free inflation calculator with no sign-up required. Calculate inflation impact on money value. Get purchasing power analysis and investment recommendations to beat inflation.',
    images: [getOgImage('inflation')],
    site: '@AICalculator',
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/inflation-calculator'),
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

export default function InflationCalculatorPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/inflation-calculator'),
        name: 'Inflation Calculator',
        url: getUrl('/inflation-calculator'),
        description:
          'Calculate inflation impact on purchasing power. See how much money loses value over time and get investment recommendations to beat inflation.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Purchasing Power Calculator',
          'Future Value Projection',
          'Historical Inflation Analysis',
          'Yearly Breakdown Display',
          'Total Inflation Calculation',
          'Inflation Rate Presets',
          'Investment Recommendations',
          'Inflation Hedge Strategies',
          'CPI-Based Calculations',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/inflation-calculator'),
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: getUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Financial',
            item: getUrl('/financial'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Inflation Calculator',
            item: getUrl('/inflation-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/inflation-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much has inflation increased since 2000?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'From 2000 to 2024, cumulative inflation is approximately 75-80% at 3% average annual rate. This means $10,000 in 2000 requires about $17,500-$18,000 today for equivalent purchasing power. Actual U.S. inflation (2000-2024) averaged 2.5-3%, resulting in 75% cumulative price increase.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a good inflation rate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Federal Reserve targets 2% annual inflation as optimal for economic growth. Rates below 0% (deflation) signal recession, while rates above 5% erode purchasing power rapidly. Historical U.S. average (1913-2024) is ~3.3%. Current 2-3% inflation is considered healthy and manageable.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I protect my money from inflation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Best inflation hedges: 1) Stocks (average 10% return beats 3% inflation), 2) Real Estate (rents rise with inflation), 3) I-Bonds (rate adjusts with CPI every 6 months), 4) TIPS (Treasury Inflation-Protected Securities), 5) Commodities (gold, oil), 6) Dividend stocks (income grows). Keep only 3-6 months expenses in cash; invest the rest.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why is inflation bad for savers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inflation reduces purchasing power of saved cash. At 3% inflation, money loses 50% of its value in 23 years. If savings account pays 1% but inflation is 3%, you lose 2% real value annually. Example: $10,000 saved at 1% for 10 years = $11,046. But with 3% inflation, real purchasing power = $8,226 (26% loss). Always invest long-term savings to outpace inflation.',
            },
          },
          {
            '@type': 'Question',
            name: 'What causes inflation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Main causes: 1) Demand-pull inflation (demand exceeds supply), 2) Cost-push inflation (production costs rise), 3) Built-in inflation (wage-price spiral), 4) Monetary inflation (too much money printing). Recent examples: 2021-2022 inflation (supply chain issues + stimulus money + energy costs). Federal Reserve controls inflation through interest rates and money supply.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is inflation calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'U.S. inflation measured by CPI (Consumer Price Index) from Bureau of Labor Statistics. CPI tracks prices of 80,000+ items in 8 categories: food, housing, transportation, medical care, education, clothing, recreation, and other goods/services. Formula: ((CPI Year 2 - CPI Year 1) / CPI Year 1) × 100. Released monthly; affects Social Security, tax brackets, and wages.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between inflation and deflation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inflation = prices rise, money value falls (most common). Deflation = prices fall, money value rises (rare, often harmful). While deflation sounds good, it signals economic problems: job losses, business failures, debt burden increases. Japan experienced deflation (1990s-2010s) with lost decades of economic stagnation. Moderate inflation (2-3%) is healthier than deflation.',
            },
          },
          {
            '@type': 'Question',
            name: 'Should I invest differently during high inflation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. High inflation (>5%) strategy: 1) Reduce bonds (lose value in high inflation), 2) Increase stocks (companies raise prices), 3) Add commodities (gold, oil rise with inflation), 4) Invest in real assets (real estate, farmland), 5) Buy I-Bonds (government guarantee + inflation adjustment), 6) Consider inflation-linked ETFs. Low inflation (<2%): traditional 60/40 stocks/bonds works. Adjust allocation based on inflation outlook.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/inflation-calculator'),
        name: 'How to Calculate Inflation and Purchasing Power',
        description: 'Step-by-step guide to understanding inflation impact on money value',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0'
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Inflation Calculator'
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Starting Amount',
            text: 'Input the amount of money you had in the past or have today. This is your baseline for comparison.',
            url: getStepUrl('/inflation-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Set Time Period',
            text: 'Choose start year (when you had the money) and end year (target comparison year, often current year).',
            url: getStepUrl('/inflation-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Select Inflation Rate',
            text: 'Enter average annual inflation rate. Use 2% (Fed target), 3.3% (U.S. historical average), or custom rate. Quick presets available.',
            url: getStepUrl('/inflation-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Choose Calculation Type',
            text: 'Select: Purchasing Power Loss (see how much value was lost), Future Value Needed (amount needed to match current purchasing power), or Inflation Impact (total effect).',
            url: getStepUrl('/inflation-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Analyze Results',
            text: 'Review inflation-adjusted value, purchasing power loss percentage, yearly breakdown, and personalized investment recommendations to protect wealth.',
            url: getStepUrl('/inflation-calculator', 5)
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/inflation-calculator'),
        headline: 'Inflation Calculator - Complete Guide to Purchasing Power and Money Value',
        description: 'Comprehensive guide to inflation with free calculator. Learn how inflation erodes purchasing power, protect your wealth, and make smart investment decisions.',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/')
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png')
          }
        },
        datePublished: '2025-11-16',
        dateModified: '2025-11-16',
        image: getOgImage('inflation'),
        articleBody: 'Understand inflation impact on your money with our comprehensive calculator. Calculate purchasing power loss, compare historical inflation rates, and discover investment strategies to protect and grow your wealth during inflationary periods.'
      },
    ],
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
        Inflation Calculator - Free Purchasing Power Calculator with Historical Inflation Data and Investment Recommendations
      </h1>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol
            className="flex items-center space-x-2 text-sm text-gray-600"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link
                href="/financial"
                itemProp="item"
                className="hover:text-blue-600 transition-colors"
              >
                <span itemProp="name">Financial</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
              Inflation Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <InflationCalculator />
        </div>
      </section>

      {/* Educational Content Section */}
      <section
        className="py-12 bg-gradient-to-b from-gray-50 to-white"
        aria-label="Educational Content"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Inflation and Purchasing Power
            </h2>

            {/* What is Inflation */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What is Inflation?</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <strong>Inflation</strong> is the rate at which the general level of prices for goods and
                services is rising, and subsequently, the purchasing power of currency is falling. Central banks
                attempt to limit inflation, and avoid deflation, in order to keep the economy running smoothly.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Understanding inflation is crucial for financial planning. Even a low annual inflation rate can
                significantly erode the value of your savings and investments over time. This calculator helps
                you visualize that impact.
              </p>
            </div>

            {/* Types of Inflation */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Types of Inflation</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>Demand-Pull Inflation:</strong> Occurs when aggregate demand in an economy outpaces
                  aggregate supply.
                </li>
                <li>
                  <strong>Cost-Push Inflation:</strong> Occurs when the cost of producing goods and services
                  rises, leading to higher prices.
                </li>
                <li>
                  <strong>Built-In Inflation:</strong> Relates to adaptive expectations, where people expect
                  current inflation rates to continue.
                </li>
              </ul>
            </div>

            {/* Protecting Wealth */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Protecting Your Wealth from Inflation
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>Invest in Inflation-Protected Securities:</strong> Such as TIPS (Treasury
                  Inflation-Protected Securities).
                </li>
                <li>
                  <strong>Real Estate:</strong> Property values and rents tend to rise with inflation.
                </li>
                <li>
                  <strong>Stocks:</strong> Historically, stocks have outperformed inflation over the long term,
                  especially companies with pricing power.
                </li>
                <li>
                  <strong>Commodities:</strong> Gold, silver, and other raw materials can serve as a hedge
                  against inflation.
                </li>
                <li>
                  <strong>Diversification:</strong> A well-diversified portfolio is key to mitigating risk.
                </li>
              </ul>
              </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much has inflation increased since 2000?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      From 2000 to 2024, cumulative inflation is approximately 75-80% at 3% average annual
                      rate. This means $10,000 in 2000 requires about $17,500-$18,000 today for equivalent
                      purchasing power. Actual U.S. inflation (2000-2024) averaged 2.5-3%, resulting in 75%
                      cumulative price increase.
                    </p>
              </div>
              </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is a good inflation rate?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The Federal Reserve targets 2% annual inflation as optimal for economic growth. Rates
                      below 0% (deflation) signal recession, while rates above 5% erode purchasing power
                      rapidly. Historical U.S. average (1913-2024) is ~3.3%. Current 2-3% inflation is
                      considered healthy and manageable.
                    </p>
                  </div>
              </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I protect my money from inflation?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Best inflation hedges: 1) Stocks (average 10% return beats 3% inflation), 2) Real
                      Estate (rents rise with inflation), 3) I-Bonds (rate adjusts with CPI every 6 months), 4)
                      TIPS (Treasury Inflation-Protected Securities), 5) Commodities (gold, oil), 6) Dividend
                      stocks (income grows). Keep only 3-6 months expenses in cash; invest the rest.
                    </p>
              </div>
            </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Why is inflation bad for savers?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Inflation reduces purchasing power of saved cash. At 3% inflation, money loses 50% of
                      its value in 23 years. If savings account pays 1% but inflation is 3%, you lose 2% real
                      value annually. Example: $10,000 saved at 1% for 10 years = $11,046. But with 3% inflation,
                      real purchasing power = $8,226 (26% loss). Always invest long-term savings to outpace
                      inflation.
                    </p>
              </div>
            </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What causes inflation?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Main causes: 1) Demand-pull inflation (demand exceeds supply), 2) Cost-push inflation
                      (production costs rise), 3) Built-in inflation (wage-price spiral), 4) Monetary inflation
                      (too much money printing). Recent examples: 2021-2022 inflation (supply chain issues +
                      stimulus money + energy costs). Federal Reserve controls inflation through interest rates
                      and money supply.
                    </p>
            </div>
              </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How is inflation calculated?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      U.S. inflation measured by CPI (Consumer Price Index) from Bureau of Labor Statistics.
                      CPI tracks prices of 80,000+ items in 8 categories: food, housing, transportation,
                      medical care, education, clothing, recreation, and other goods/services. Formula: ((CPI
                      Year 2 - CPI Year 1) / CPI Year 1) × 100. Released monthly; affects Social Security, tax
                      brackets, and wages.
                    </p>
                  </div>
              </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the difference between inflation and deflation?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Inflation = prices rise, money value falls (most common). Deflation = prices fall, money
                      value rises (rare, often harmful). While deflation sounds good, it signals economic
                      problems: job losses, business failures, debt burden increases. Japan experienced deflation
                      (1990s-2010s) with lost decades of economic stagnation. Moderate inflation (2-3%) is
                      healthier than deflation.
                    </p>
              </div>
              </div>

                <div
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Should I invest differently during high inflation?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes. High inflation (&gt;5%) strategy: 1) Reduce bonds (lose value in high inflation), 2)
                      Increase stocks (companies raise prices), 3) Add commodities (gold, oil rise with
                      inflation), 4) Invest in real assets (real estate, farmland), 5) Buy I-Bonds (government
                      guarantee + inflation adjustment), 6) Consider inflation-linked ETFs. Low inflation (&lt;2%):
                      traditional 60/40 stocks/bonds works. Adjust allocation based on inflation outlook.
                    </p>
                  </div>
                </div>
              </div>
              </div>

            {/* Related Calculators */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/investment-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">Investment Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate investment returns and growth</p>
                </Link>
                <Link
                  href="/savings-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">Savings Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Plan savings with compound interest</p>
                </Link>
                <Link
                  href="/retirement-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">Retirement Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Estimate retirement savings needs</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
