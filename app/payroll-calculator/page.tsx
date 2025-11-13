import type { Metadata } from 'next';
import PayrollCalculator from '@/components/Calculator/PayrollCalculator';

export const metadata: Metadata = {
  title: 'Payroll Calculator - Calculate Net Pay, Taxes & Deductions | Free Payroll Tool',
  description: 'Free payroll calculator to calculate net pay, federal and state taxes, Social Security, Medicare, and other deductions. Supports all US states and multiple pay frequencies.',
  keywords: [
    'payroll calculator',
    'net pay calculator',
    'salary calculator',
    'tax calculator',
    'paycheck calculator',
    'take home pay calculator',
    'federal tax calculator',
    'state tax calculator',
    'social security calculator',
    'medicare calculator',
    'payroll tax calculator',
    '401k calculator',
    'health insurance deduction',
    'gross to net calculator',
    'employee payroll',
    'payroll deductions',
    'withholding calculator',
    'FICA calculator',
    'payroll processing',
    'wage calculator'
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
    title: 'Free Payroll Calculator - Calculate Net Pay & Tax Deductions',
    description: 'Calculate your net pay with accurate federal and state tax calculations. Supports all US states, multiple pay frequencies, and common deductions.',
    url: 'https://calculator-tools.com/payroll-calculator',
    siteName: 'Calculator Tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://calculator-tools.com/images/payroll-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Payroll Calculator - Net Pay and Tax Calculation Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Payroll Calculator - Net Pay & Tax Tool',
    description: 'Calculate your take-home pay with accurate tax calculations for all US states. Free payroll calculator with detailed breakdown.',
    images: ['https://calculator-tools.com/images/payroll-calculator-twitter.jpg'],
    creator: '@CalculatorTools',
  },
  alternates: {
    canonical: 'https://calculator-tools.com/payroll-calculator',
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
      '@id': 'https://calculator-tools.com/payroll-calculator#webapp',
      name: 'Payroll Calculator',
      description: 'Professional payroll calculator for calculating net pay, federal and state taxes, Social Security, Medicare, and other payroll deductions with support for all US states.',
      url: 'https://calculator-tools.com/payroll-calculator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Calculate net pay from gross salary',
        'Federal tax calculation with current tax brackets',
        'State tax calculation for all 50 US states',
        'Social Security and Medicare (FICA) calculations',
        'State disability insurance calculations',
        '401(k) retirement contribution calculations',
        'Health insurance premium deductions',
        'Multiple pay frequency support (weekly, bi-weekly, monthly, etc.)',
        'Filing status options (single, married, head of household)',
        'Additional withholding calculations',
        'Annual salary projections',
        'Take-home percentage analysis',
        'Detailed deduction breakdown',
        'Save results as image',
        'Mobile-responsive design'
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://calculator-tools.com/payroll-calculator#breadcrumb',
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
          name: 'Payroll Calculator',
          item: 'https://calculator-tools.com/payroll-calculator',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://calculator-tools.com/payroll-calculator#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How is net pay calculated from gross pay?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Net pay is calculated by subtracting all deductions from gross pay. Deductions include federal income tax, state income tax, Social Security (6.2%), Medicare (1.45%), state disability insurance (where applicable), and any pre-tax deductions like 401(k) contributions and health insurance premiums.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between gross pay and net pay?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Gross pay is your total earnings before any deductions. Net pay (take-home pay) is what you actually receive after all taxes and deductions are subtracted. The difference between gross and net pay represents your total tax burden and benefit contributions.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much federal tax is withheld from my paycheck?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Federal tax withholding depends on your income level, filing status, and allowances claimed. For 2024, tax rates range from 10% to 37% across different income brackets. Our calculator uses current federal tax brackets to provide accurate withholding estimates.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do all states have state income tax?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, nine states have no state income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. Our calculator accounts for state-specific tax rates and automatically applies zero tax for these states.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are FICA taxes and how much do I pay?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FICA taxes fund Social Security and Medicare. You pay 6.2% for Social Security (on wages up to $160,200 in 2024) and 1.45% for Medicare (on all wages). High earners pay an additional 0.9% Medicare tax on wages over $200,000 (single) or $250,000 (married filing jointly).',
          },
        },
        {
          '@type': 'Question',
          name: 'How do pre-tax deductions affect my taxes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pre-tax deductions like 401(k) contributions and health insurance premiums reduce your taxable income, which lowers your federal and state income taxes. However, you still pay Social Security and Medicare taxes on your gross pay before pre-tax deductions.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': 'https://calculator-tools.com/payroll-calculator#howto',
      name: 'How to Calculate Your Payroll and Net Pay',
      description: 'Step-by-step guide to calculate your take-home pay using our payroll calculator',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Enter Your Gross Salary',
          text: 'Input your gross salary amount and select your pay frequency (weekly, bi-weekly, semi-monthly, monthly, or annually).',
        },
        {
          '@type': 'HowToStep', 
          name: 'Select Your Location and Filing Status',
          text: 'Choose your state of employment and tax filing status (single, married filing jointly, or head of household) for accurate tax calculations.',
        },
        {
          '@type': 'HowToStep',
          name: 'Add Deductions and Benefits',
          text: 'Enter your 401(k) contribution percentage, health insurance premiums, and any additional withholding amounts.',
        },
        {
          '@type': 'HowToStep',
          name: 'Review Your Payroll Breakdown',
          text: 'Examine your detailed payroll breakdown including federal tax, state tax, FICA taxes, and all deductions to understand your net pay calculation.',
        },
        {
          '@type': 'HowToStep',
          name: 'Save or Share Your Results',
          text: 'Save your payroll calculation as an image for your records or share with your HR department or financial advisor.',
        },
      ],
    },
  ],
};

export default function PayrollCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2" itemProp="name">Payroll Calculator</span>
                    <meta itemProp="position" content="3" />
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Payroll Calculator - Calculate Net Pay, Federal & State Taxes, FICA Deductions
        </h1>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Payroll Calculator
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate your net pay with accurate federal and state tax calculations. 
              Get detailed breakdown of all deductions including FICA taxes, 401(k) contributions, 
              and health insurance premiums for all US states.
            </p>
          </div>

          <PayrollCalculator />
        </div>

        {/* Educational Content */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Complete Guide to Payroll Calculations and Tax Deductions
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Understanding Your Paycheck
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Your paycheck reflects various deductions from your gross pay to arrive at your net pay. 
                    Understanding these deductions helps you plan your finances and optimize your tax strategy 
                    through pre-tax benefits and retirement contributions.
                  </p>
                  <p className="text-gray-700">
                    Our payroll calculator provides accurate calculations for all US states, accounting for 
                    federal tax brackets, state-specific tax rates, and current FICA tax rates.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Key Payroll Components
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Gross Pay:</strong> Total earnings before deductions</li>
                    <li>• <strong>Federal Income Tax:</strong> Based on tax brackets and filing status</li>
                    <li>• <strong>State Income Tax:</strong> Varies by state (9 states have no income tax)</li>
                    <li>• <strong>FICA Taxes:</strong> Social Security (6.2%) and Medicare (1.45%)</li>
                    <li>• <strong>Pre-tax Deductions:</strong> 401(k), health insurance, FSA</li>
                    <li>• <strong>Net Pay:</strong> Your take-home amount after all deductions</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Federal Tax Brackets and Calculations
              </h3>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-blue-900 mb-3">
                  2024 Federal Tax Brackets
                </h4>
                <p className="text-blue-800 mb-4">
                  Federal income tax uses a progressive tax system with rates from 10% to 37%. 
                  Your effective tax rate is typically lower than your marginal rate due to the 
                  progressive structure.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-blue-200 rounded">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-blue-900">Tax Rate</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-blue-900">Single Filers</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-blue-900">Married Filing Jointly</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-200">
                      <tr>
                        <td className="px-4 py-2 text-sm text-blue-800">10%</td>
                        <td className="px-4 py-2 text-sm text-blue-700">$0 - $11,000</td>
                        <td className="px-4 py-2 text-sm text-blue-700">$0 - $22,000</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-blue-800">12%</td>
                        <td className="px-4 py-2 text-sm text-blue-700">$11,001 - $47,150</td>
                        <td className="px-4 py-2 text-sm text-blue-700">$22,001 - $94,300</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-blue-800">22%</td>
                        <td className="px-4 py-2 text-sm text-blue-700">$47,151 - $100,525</td>
                        <td className="px-4 py-2 text-sm text-blue-700">$94,301 - $201,050</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-blue-800">24%</td>
                        <td className="px-4 py-2 text-sm text-blue-700">$100,526 - $191,950</td>
                        <td className="px-4 py-2 text-sm text-blue-700">$201,051 - $383,900</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                State Tax Considerations
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-green-900 mb-4">
                    No State Income Tax States
                  </h4>
                  <p className="text-green-800 mb-3">
                    Nine states don't impose state income tax on wages:
                  </p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Alaska</li>
                    <li>• Florida</li>
                    <li>• Nevada</li>
                    <li>• New Hampshire*</li>
                    <li>• South Dakota</li>
                    <li>• Tennessee*</li>
                    <li>• Texas</li>
                    <li>• Washington</li>
                    <li>• Wyoming</li>
                  </ul>
                  <p className="text-xs text-green-600 mt-2">
                    *NH and TN tax investment income only
                  </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-orange-900 mb-4">
                    Highest State Tax Rates
                  </h4>
                  <p className="text-orange-800 mb-3">
                    States with highest marginal tax rates:
                  </p>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• California: 13.3%</li>
                    <li>• Hawaii: 11%</li>
                    <li>• New Jersey: 10.75%</li>
                    <li>• Oregon: 9.9%</li>
                    <li>• Minnesota: 9.85%</li>
                    <li>• New York: 8.82%</li>
                  </ul>
                  <p className="text-xs text-orange-600 mt-2">
                    Rates shown are top marginal rates
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                FICA Taxes and Social Security
              </h3>

              <div className="bg-purple-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-purple-900 mb-3">
                  Understanding FICA Contributions
                </h4>
                <p className="text-purple-800 mb-4">
                  FICA (Federal Insurance Contributions Act) taxes fund Social Security and Medicare programs. 
                  Both you and your employer contribute equal amounts.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-purple-900 mb-2">Social Security Tax</h5>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Rate: 6.2% (employee) + 6.2% (employer)</li>
                      <li>• 2024 wage base: $160,200</li>
                      <li>• Maximum annual contribution: $9,932.40</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-purple-900 mb-2">Medicare Tax</h5>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Rate: 1.45% (employee) + 1.45% (employer)</li>
                      <li>• No wage base limit</li>
                      <li>• Additional 0.9% on high earners</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Pre-Tax Benefits and Deductions
              </h3>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Maximizing Pre-Tax Savings
                </h4>
                <p className="text-gray-700 mb-4">
                  Pre-tax deductions reduce your taxable income, lowering your federal and state income taxes. 
                  Common pre-tax benefits include:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Retirement Contributions</h5>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• 401(k): $23,000 limit (2024)</li>
                      <li>• 403(b): $23,000 limit (2024)</li>
                      <li>• Catch-up contributions: Additional $7,500 (age 50+)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Health Benefits</h5>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Health insurance premiums</li>
                      <li>• Health Savings Account (HSA)</li>
                      <li>• Flexible Spending Account (FSA)</li>
                      <li>• Dependent care assistance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Payroll Calculation Tips
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Optimize Your Withholding
                  </h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Review W-4:</strong> Update after life changes</li>
                    <li>• <strong>Adjust Allowances:</strong> Avoid large refunds or payments</li>
                    <li>• <strong>Additional Withholding:</strong> Use for side income</li>
                    <li>• <strong>Quarterly Reviews:</strong> Check year-to-date totals</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Maximize Take-Home Pay
                  </h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>401(k) Match:</strong> Always get full employer match</li>
                    <li>• <strong>HSA Contributions:</strong> Triple tax advantage</li>
                    <li>• <strong>Pre-tax Benefits:</strong> Use all available options</li>
                    <li>• <strong>State Considerations:</strong> Factor in state tax rates</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-900 mb-4">
                  Start Calculating Your Payroll Today
                </h4>
                <p className="text-blue-800 mb-4">
                  Use our comprehensive payroll calculator to understand your take-home pay and optimize 
                  your tax strategy. Our calculator accounts for current tax rates, all US states, 
                  and common deductions to provide accurate results for your financial planning.
                </p>
                <p className="text-blue-700">
                  Whether you're evaluating a job offer, planning your budget, or optimizing your 
                  withholding, our payroll calculator provides the detailed breakdown you need to 
                  make informed financial decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
