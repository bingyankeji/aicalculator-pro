import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from 'next/link';
import { ROICalculator } from '@/components/Calculator/ROICalculator';

export const metadata: Metadata = {
  title: 'ROI Calculator (Free, No signup) - Return on Investment | AICalculator',
  description: 'Free ROI calculator with no sign-up required. Calculate ROI (Return on Investment). Compute net profit, percentage returns, annualized ROI, and break-even analysis. Perfect for stocks, real estate, business investments, and more.',
  keywords: [
    'roi calculator',
    'free roi calculator',
    'roi calculator no signup',
    'return on investment calculator',
    'investment return calculator',
    'roi calculation',
    'annualized roi calculator',
    'investment profit calculator',
    'net profit calculator',
    'investment performance calculator',
    'stock roi calculator',
    'real estate roi calculator',
    'business roi calculator',
    'calculate roi percentage',
    'roi formula calculator',
    'investment gain calculator',
    'portfolio return calculator',
  ],
  openGraph: {
    title: 'ROI Calculator (Free, No signup) - AICalculator',
    description: 'Free ROI calculator with no sign-up required. Calculate investment returns, ROI percentage, annualized returns, and net profit. Analyze investment performance with detailed breakdowns and recommendations.',
    type: 'website',
    url: 'https://aicalculator.pro/roi-calculator',
    siteName: 'AICalculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROI Calculator (Free, No signup) - AICalculator',
    description: 'Free ROI calculator with no sign-up required. Calculate ROI, annualized returns, and net profit for your investments with detailed analysis.',
    site: '@AICalculator',
  },
  alternates: {
    canonical: 'https://aicalculator.pro/roi-calculator',
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

export default function ROICalculatorPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'ROI Calculator',
        url: 'https://aicalculator.pro/roi-calculator',
        description:
          'Calculate Return on Investment (ROI) with our free calculator. Get ROI percentage, annualized returns, net profit analysis, and investment recommendations.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'ROI Percentage Calculation',
          'Annualized ROI (CAGR)',
          'Net Profit Analysis',
          'Break-even Multiplier',
          'Investment Performance Rating',
          'Multiple Investment Types Support',
          'Flexible Time Units (Days/Months/Years)',
          'Cost Tracking (Fees & Taxes)',
          'Share and Export Results',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://aicalculator.pro',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Financial',
            item: 'https://aicalculator.pro/financial',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'ROI Calculator',
            item: 'https://aicalculator.pro/roi-calculator',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a good ROI percentage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "A 'good' ROI depends on context, but generally: 7-10% annualized ROI is considered good (matching stock market averages), 10-20% is excellent, and 20%+ is exceptional. However, higher ROI often means higher risk.",
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate ROI?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ROI = (Net Profit / Total Investment Cost) × 100. Net Profit = Final Value - Initial Investment - Additional Costs. For example, if you invest $10,000, sell for $15,000, and pay $500 in fees, your ROI = (($15,000 - $10,000 - $500) / $10,500) × 100 = 42.86%.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between ROI and annualized ROI?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ROI shows total return over the entire period, while annualized ROI adjusts for time, showing average yearly return. A 50% ROI over 5 years is only 8.45% annualized, while 50% ROI in 1 year is 50% annualized.',
            },
          },
          {
            '@type': 'Question',
            name: 'Should I include taxes in ROI calculations?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, for accurate ROI, include all costs like capital gains tax, dividend tax, and transaction fees. These reduce your net profit and give a realistic picture of investment performance.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can ROI be negative?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, negative ROI means the investment lost money. For example, if you invest $10,000 and the final value is $8,000, your ROI is -20%. This indicates a loss and may warrant reconsidering the investment.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is ROI different from profit?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Profit is the absolute dollar amount gained (e.g., $5,000), while ROI is the percentage return relative to investment cost (e.g., 50%). ROI allows comparing investments of different sizes.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a realistic ROI for real estate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Real estate typically delivers 8-12% annualized ROI when including rental income and property appreciation. However, this varies by location, property type, and market conditions. Factor in maintenance, property tax, and insurance.',
            },
          },
          {
            '@type': 'Question',
            name: 'How often should I calculate ROI?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Review ROI quarterly or annually for long-term investments. For active trading or business projects, monthly reviews can help identify trends and adjust strategy. Consistent tracking helps optimize investment decisions.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate ROI',
        description: 'Step-by-step guide to calculating Return on Investment (ROI)',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Initial Investment',
            text: 'Input the amount you invested at the beginning (e.g., $10,000 for stocks, $50,000 for real estate down payment)',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Final Value',
            text: 'Input the current or final value of your investment (e.g., current stock value, property sale price)',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Add Additional Costs',
            text: 'Include transaction fees, taxes, commissions, maintenance costs, or closing costs',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Specify Investment Duration',
            text: "Enter how long you've held the investment (in days, months, or years)",
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Calculate ROI',
            text: "Click 'Calculate ROI' to get instant results showing ROI percentage, annualized returns, net profit, and investment analysis",
          },
        ],
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
        ROI Calculator - Free Return on Investment Calculator with Annualized Returns and Net Profit Analysis
      </h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="ROI Calculator (Free, No signup)"
        calculatorUrl="/roi-calculator"
      />

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <ROICalculator />
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
              Understanding ROI (Return on Investment)
            </h2>

            {/* What is ROI */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What is ROI?</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <strong>ROI (Return on Investment)</strong> is a financial metric that measures the
                profitability of an investment relative to its cost. It's expressed as a percentage and helps
                investors evaluate the efficiency and performance of their investments.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <p className="font-mono text-lg">ROI = (Net Profit / Total Investment Cost) × 100</p>
                <p className="text-sm text-gray-600 mt-2">
                  Where: Net Profit = Final Value - Initial Investment - Additional Costs
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                A positive ROI indicates profit, while a negative ROI indicates a loss. Higher ROI percentages
                generally represent better investment performance, though they should be evaluated alongside risk
                factors and time horizon.
              </p>
            </div>

            {/* ROI vs Annualized ROI */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">ROI vs. Annualized ROI</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <strong>Simple ROI</strong> shows the total return over the entire investment period without
                accounting for time. A 50% ROI could be achieved in 1 year or 10 years—simple ROI doesn't
                distinguish between them.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Annualized ROI</strong> normalizes returns to a per-year basis, making it easier to
                compare investments with different time horizons. It accounts for compound growth and provides a
                more accurate measure of long-term performance.
              </p>
            </div>

            {/* Good ROI Benchmarks */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What is a Good ROI?</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                A "good" ROI depends on the investment type, risk level, and market conditions. Here are
                general benchmarks:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Annualized ROI</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Performance</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Benchmark</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 px-4 py-2 font-bold">20%+</td>
                      <td className="border border-gray-300 px-4 py-2">Exceptional</td>
                      <td className="border border-gray-300 px-4 py-2">
                        Top-performing stocks, successful startups
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-bold">10-20%</td>
                      <td className="border border-gray-300 px-4 py-2">Excellent</td>
                      <td className="border border-gray-300 px-4 py-2">Above stock market average</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-bold">7-10%</td>
                      <td className="border border-gray-300 px-4 py-2">Good</td>
                      <td className="border border-gray-300 px-4 py-2">S&P 500 historical average</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-bold">5-7%</td>
                      <td className="border border-gray-300 px-4 py-2">Moderate</td>
                      <td className="border border-gray-300 px-4 py-2">
                        Beats inflation, conservative growth
                      </td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td className="border border-gray-300 px-4 py-2 font-bold">2-5%</td>
                      <td className="border border-gray-300 px-4 py-2">Low</td>
                      <td className="border border-gray-300 px-4 py-2">Slightly above inflation (~2-3%)</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="border border-gray-300 px-4 py-2 font-bold">Below 2%</td>
                      <td className="border border-gray-300 px-4 py-2">Poor</td>
                      <td className="border border-gray-300 px-4 py-2">May not beat inflation</td>
                    </tr>
                    <tr className="bg-red-100">
                      <td className="border border-gray-300 px-4 py-2 font-bold">Negative</td>
                      <td className="border border-gray-300 px-4 py-2">Loss</td>
                      <td className="border border-gray-300 px-4 py-2">Investment lost value</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                    What is a good ROI percentage?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      A "good" ROI depends on context, but generally: 7-10% annualized ROI is considered good
                      (matching stock market averages), 10-20% is excellent, and 20%+ is exceptional. However,
                      higher ROI often means higher risk.
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
                    How do I calculate ROI?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      ROI = (Net Profit / Total Investment Cost) × 100. Net Profit = Final Value - Initial
                      Investment - Additional Costs. For example, if you invest $10,000, sell for $15,000, and
                      pay $500 in fees, your ROI = (($15,000 - $10,000 - $500) / $10,500) × 100 = 42.86%.
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
                    What's the difference between ROI and annualized ROI?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      ROI shows total return over the entire period, while annualized ROI adjusts for time,
                      showing average yearly return. A 50% ROI over 5 years is only 8.45% annualized, while 50%
                      ROI in 1 year is 50% annualized.
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
                    Should I include taxes in ROI calculations?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes, for accurate ROI, include all costs like capital gains tax, dividend tax, and
                      transaction fees. These reduce your net profit and give a realistic picture of investment
                      performance.
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
                    Can ROI be negative?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes, negative ROI means the investment lost money. For example, if you invest $10,000 and
                      the final value is $8,000, your ROI is -20%. This indicates a loss and may warrant
                      reconsidering the investment.
                    </p>
                  </div>
                </div>

                <div
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How is ROI different from profit?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Profit is the absolute dollar amount gained (e.g., $5,000), while ROI is the percentage
                      return relative to investment cost (e.g., 50%). ROI allows comparing investments of
                      different sizes.
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
                  <p className="text-xs text-gray-600 mt-1">
                    Calculate investment growth with compound interest
                  </p>
                </Link>
                <Link
                  href="/savings-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">Savings Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Plan your savings goals with interest</p>
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
