import type { Metadata } from 'next';
import AmortizationCalculator from '@/components/Calculator/AmortizationCalculator';

export const metadata: Metadata = {
  title: 'Amortization Calculator - Loan Payment Schedule & Extra Payment Analysis | Free Tool',
  description: 'Free amortization calculator with payment schedules and extra payment analysis. Calculate loan payments, interest savings, and payoff dates for mortgages and loans.',
  keywords: [
    'amortization calculator',
    'loan amortization schedule',
    'mortgage payment calculator',
    'loan payment schedule',
    'extra payment calculator',
    'loan payoff calculator',
    'amortization table',
    'mortgage amortization',
    'loan interest calculator',
    'payment breakdown calculator',
    'principal and interest calculator',
    'loan term calculator',
    'early payoff calculator',
    'biweekly payment calculator',
    'loan analysis tool',
    'mortgage schedule',
    'debt payoff planner',
    'loan comparison calculator',
    'interest savings calculator',
    'refinance analysis'
  ],
  authors: [{ name: 'Calculator Tools Team' }],
  creator: 'Calculator Tools',
  publisher: 'Calculator Tools',
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
  openGraph: {
    title: 'Free Amortization Calculator - Loan Payment Schedules',
    description: 'Calculate loan amortization schedules with extra payment analysis. See payment breakdowns, interest savings, and payoff dates.',
    url: 'https://calculator-tools.com/amortization-calculator',
    siteName: 'Calculator Tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://calculator-tools.com/images/amortization-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amortization Calculator - Loan Payment Schedule Analysis Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Amortization Calculator - Payment Schedules',
    description: 'Calculate loan amortization with extra payment analysis. See detailed payment schedules and interest savings.',
    images: ['https://calculator-tools.com/images/amortization-calculator-twitter.jpg'],
    creator: '@CalculatorTools',
  },
  alternates: {
    canonical: 'https://calculator-tools.com/amortization-calculator',
  },
  other: {
    'last-modified': new Date().toISOString(),
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://calculator-tools.com/amortization-calculator#webapp',
      name: 'Amortization Calculator',
      description: 'Professional amortization calculator for generating detailed loan payment schedules with extra payment analysis and interest savings calculations.',
      url: 'https://calculator-tools.com/amortization-calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Complete amortization schedules',
        'Monthly, bi-weekly, and weekly payments',
        'Extra payment analysis',
        'Interest savings calculations',
        'Loan payoff date projections',
        'Principal and interest breakdown',
        'Payment frequency comparisons',
        'Early payoff benefits',
        'Detailed payment tables',
        'Total cost analysis',
        'Time savings calculations',
        'Save results as image',
        'Mobile-responsive design',
        'Real-time calculations',
        'Mortgage and loan planning'
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://calculator-tools.com/amortization-calculator#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Calculator Tools',
          item: 'https://calculator-tools.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Financial Calculators',
          item: 'https://calculator-tools.com/financial',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Amortization Calculator',
          item: 'https://calculator-tools.com/amortization-calculator',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://calculator-tools.com/amortization-calculator#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is loan amortization?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Loan amortization is the process of paying off a debt through regular payments over time. Each payment covers both principal (loan amount) and interest, with the proportion changing over the loan term. Early payments have more interest, while later payments have more principal.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do extra payments affect my loan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Extra payments go directly toward principal reduction, which decreases the remaining balance faster. This results in less interest charged over the loan term and can significantly shorten the payoff period. Even small extra payments can save thousands in interest.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between monthly and bi-weekly payments?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bi-weekly payments result in 26 payments per year (equivalent to 13 monthly payments), while monthly payments result in 12 per year. The extra payment each year with bi-weekly scheduling can save significant interest and reduce loan term by several years.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is the monthly payment calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Monthly payment is calculated using the PMT formula: M = P[r(1+r)^n]/[(1+r)^n-1], where M = monthly payment, P = principal, r = monthly interest rate, and n = number of payments. This ensures the loan is fully paid off over the specified term.',
          },
        },
        {
          '@type': 'Question',
          name: 'Should I make extra payments or invest the money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'This depends on your loan interest rate versus potential investment returns. If your loan rate is higher than expected investment returns (after taxes), paying extra on the loan provides a guaranteed return. Consider your risk tolerance and overall financial situation.',
          },
        },
        {
          '@type': 'Question',
          name: 'What information do I need to create an amortization schedule?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You need the loan amount (principal), annual interest rate, loan term in years, and payment frequency. Optional information includes extra payment amounts and start date for more detailed analysis and planning.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': 'https://calculator-tools.com/amortization-calculator#howto',
      name: 'How to Create and Analyze Loan Amortization Schedules',
      description: 'Step-by-step guide to calculate loan payments and analyze amortization schedules with extra payment benefits',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Enter Loan Details',
          text: 'Input the loan amount, annual interest rate, and loan term in years. These three values determine your base payment amount and total loan cost.',
        },
        {
          '@type': 'HowToStep',
          name: 'Choose Payment Frequency',
          text: 'Select monthly, bi-weekly, or weekly payments. Bi-weekly and weekly payments can significantly reduce interest costs and loan term.',
        },
        {
          '@type': 'HowToStep',
          name: 'Add Extra Payments (Optional)',
          text: 'Enter any extra payment amount to see the impact on interest savings and payoff time. Even small extra payments can have large long-term benefits.',
        },
        {
          '@type': 'HowToStep',
          name: 'Review Payment Schedule',
          text: 'Examine the detailed amortization schedule showing payment breakdown, remaining balance, and cumulative interest for each payment period.',
        },
        {
          '@type': 'HowToStep',
          name: 'Analyze Savings Opportunities',
          text: 'Compare different payment strategies and extra payment amounts to optimize your loan payoff strategy and maximize interest savings.',
        },
      ],
    },
  ],
};

export default function AmortizationCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3" itemScope itemType="https://schema.org/BreadcrumbList">
                <li className="inline-flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600" itemProp="item">
                    <span itemProp="name">Home</span>
                  </a>
                  <meta itemProp="position" content="1" />
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <a href="/financial" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2" itemProp="item">
                      <span itemProp="name">Financial</span>
                    </a>
                    <meta itemProp="position" content="2" />
                  </div>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2" itemProp="name">Amortization Calculator</span>
                    <meta itemProp="position" content="3" />
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Amortization Calculator - Loan Payment Schedule and Extra Payment Analysis Tool
        </h1>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Amortization Calculator
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Generate detailed loan payment schedules and analyze the impact of 
              extra payments. See how different payment frequencies can save you 
              thousands in interest and years of payments.
            </p>
          </div>

          <AmortizationCalculator />
        </div>

        {/* Educational Content */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Complete Guide to Loan Amortization and Payment Strategies
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Understanding Amortization
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Loan amortization is the process of gradually paying off a debt through 
                    regular payments over time. Each payment covers both principal (the amount 
                    borrowed) and interest, with the proportion changing throughout the loan term.
                  </p>
                  <p className="text-gray-700">
                    Our calculator shows you exactly how each payment is allocated, helping you 
                    understand the true cost of borrowing and identify opportunities to save money.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Key Amortization Concepts
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Principal:</strong> The original loan amount</li>
                    <li>• <strong>Interest:</strong> The cost of borrowing money</li>
                    <li>• <strong>Payment:</strong> Fixed amount paid each period</li>
                    <li>• <strong>Term:</strong> Length of time to repay the loan</li>
                    <li>• <strong>Balance:</strong> Remaining amount owed</li>
                    <li>• <strong>Amortization Schedule:</strong> Payment breakdown table</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Payment Frequency Strategies
              </h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-blue-900 mb-3">
                    Monthly Payments
                  </h4>
                  <p className="text-blue-800 mb-3">
                    <strong>12 payments per year</strong>
                  </p>
                  <div className="text-blue-700 text-sm space-y-1">
                    <p><strong>Advantages:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Easy to budget and plan</li>
                      <li>Aligns with most income schedules</li>
                      <li>Standard loan structure</li>
                      <li>Predictable payment dates</li>
                    </ul>
                    <p className="mt-2"><strong>Best for:</strong> Most borrowers seeking predictable payments</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-green-900 mb-3">
                    Bi-Weekly Payments
                  </h4>
                  <p className="text-green-800 mb-3">
                    <strong>26 payments per year</strong>
                  </p>
                  <div className="text-green-700 text-sm space-y-1">
                    <p><strong>Advantages:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Equivalent to 13 monthly payments</li>
                      <li>Significant interest savings</li>
                      <li>Shorter loan term</li>
                      <li>Aligns with bi-weekly paychecks</li>
                    </ul>
                    <p className="mt-2"><strong>Best for:</strong> Borrowers paid bi-weekly wanting to save interest</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-purple-900 mb-3">
                    Weekly Payments
                  </h4>
                  <p className="text-purple-800 mb-3">
                    <strong>52 payments per year</strong>
                  </p>
                  <div className="text-purple-700 text-sm space-y-1">
                    <p><strong>Advantages:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Maximum interest savings</li>
                      <li>Fastest loan payoff</li>
                      <li>Smaller individual payments</li>
                      <li>Frequent principal reduction</li>
                    </ul>
                    <p className="mt-2"><strong>Best for:</strong> Weekly income earners with disciplined budgeting</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Extra Payment Strategies
              </h3>

              <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-yellow-900 mb-3">
                  Impact of Extra Payments
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-yellow-900 mb-2">$300,000 Loan Example</h5>
                    <div className="text-yellow-800 text-sm space-y-1">
                      <p>• <strong>Loan:</strong> $300,000 at 6.5% for 30 years</p>
                      <p>• <strong>Monthly Payment:</strong> $1,896</p>
                      <p>• <strong>Total Interest:</strong> $382,633</p>
                      <p>• <strong>Total Cost:</strong> $682,633</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-yellow-900 mb-2">With $200 Extra Monthly</h5>
                    <div className="text-yellow-700 text-sm space-y-1">
                      <p>• <strong>New Payment:</strong> $2,096</p>
                      <p>• <strong>Time Saved:</strong> 8 years 4 months</p>
                      <p>• <strong>Interest Saved:</strong> $129,000+</p>
                      <p>• <strong>New Total Cost:</strong> $553,000</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Extra Payment Options
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• <strong>Fixed Monthly Extra:</strong> Add same amount each month</li>
                    <li>• <strong>Annual Lump Sum:</strong> Use tax refunds or bonuses</li>
                    <li>• <strong>Bi-Weekly Strategy:</strong> Split monthly payment in half</li>
                    <li>• <strong>Round-Up Payments:</strong> Round payments to nearest $50 or $100</li>
                    <li>• <strong>Windfall Payments:</strong> Apply raises, bonuses, or gifts</li>
                    <li>• <strong>Graduated Payments:</strong> Increase extra amount annually</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    When to Make Extra Payments
                  </h4>
                  <div className="text-gray-700 space-y-2 text-sm">
                    <p><strong>Good Times:</strong></p>
                    <ul className="list-disc list-inside space-y-1 mb-3">
                      <li>High-interest loans (&gt;6%)</li>
                      <li>Stable income and emergency fund</li>
                      <li>No higher-interest debt</li>
                      <li>Limited investment opportunities</li>
                    </ul>
                    <p><strong>Consider Alternatives When:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Low-interest loans (&lt;4%)</li>
                      <li>High-return investment opportunities</li>
                      <li>Insufficient emergency savings</li>
                      <li>Other high-interest debt exists</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Amortization Schedule Analysis
              </h3>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Reading Your Amortization Schedule
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Early Years Pattern</h5>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Higher proportion goes to interest</li>
                      <li>• Slower principal reduction</li>
                      <li>• Balance decreases gradually</li>
                      <li>• Extra payments have maximum impact</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Later Years Pattern</h5>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Higher proportion goes to principal</li>
                      <li>• Faster balance reduction</li>
                      <li>• Lower interest charges</li>
                      <li>• Extra payments less impactful</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="text-lg font-semibold text-red-900 mb-3">
                    Early Payment Focus
                  </h4>
                  <p className="text-red-800 text-sm mb-2">
                    First 10 years of a 30-year loan
                  </p>
                  <ul className="text-red-700 text-xs space-y-1">
                    <li>• 70-80% of payment is interest</li>
                    <li>• Principal reduction is slow</li>
                    <li>• Extra payments save most interest</li>
                    <li>• Refinancing may be beneficial</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="text-lg font-semibold text-yellow-900 mb-3">
                    Middle Years Balance
                  </h4>
                  <p className="text-yellow-800 text-sm mb-2">
                    Years 10-20 of a 30-year loan
                  </p>
                  <ul className="text-yellow-700 text-xs space-y-1">
                    <li>• 50-70% of payment is interest</li>
                    <li>• Moderate principal reduction</li>
                    <li>• Extra payments still valuable</li>
                    <li>• Consider investment alternatives</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="text-lg font-semibold text-green-900 mb-3">
                    Late Payment Focus
                  </h4>
                  <p className="text-green-800 text-sm mb-2">
                    Final 10 years of a 30-year loan
                  </p>
                  <ul className="text-green-700 text-xs space-y-1">
                    <li>• 20-50% of payment is interest</li>
                    <li>• Rapid principal reduction</li>
                    <li>• Extra payments less impactful</li>
                    <li>• Focus on other financial goals</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-900 mb-4">
                  Start Optimizing Your Loan Strategy Today
                </h4>
                <p className="text-blue-800 mb-4">
                  Use our comprehensive amortization calculator to understand your loan structure 
                  and identify opportunities to save money. Whether you're planning a new loan or 
                  optimizing an existing one, our detailed analysis helps you make informed decisions.
                </p>
                <p className="text-blue-700">
                  Explore different payment frequencies and extra payment strategies to find the 
                  approach that best fits your financial goals and budget. Small changes in your 
                  payment strategy can result in significant long-term savings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
