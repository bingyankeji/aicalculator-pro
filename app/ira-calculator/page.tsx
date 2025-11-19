import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import IRACalculator from '@/components/Calculator/IRACalculator';

export const metadata: Metadata = {
  title: 'IRA Calculator - Traditional vs Roth IRA Comparison & Retirement Planning | AICalculator.pro',
  description: 'Free IRA calculator. Compare Traditional vs Roth IRA, calculate retirement savings, RMDs, and tax implications. See which IRA type is best for your retirement goals.',
  keywords: [
    'ira calculator',
    'traditional ira calculator',
    'roth ira calculator',
    'ira comparison',
    'traditional vs roth ira',
    'ira contribution limit',
    'rmd calculator',
    'required minimum distribution',
    'ira tax calculator',
    'retirement calculator',
    'ira deduction',
    'ira withdrawal calculator',
    'ira growth calculator',
    'best ira',
    'ira vs 401k',
    'ira tax benefits',
    'ira retirement planning',
    'ira investment calculator',
    'ira savings calculator',
    'ira comparison tool',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
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
  alternates: {
    canonical: 'https://aicalculator.pro/ira-calculator',
  },
  openGraph: {
    title: 'IRA Calculator - Traditional vs Roth IRA Comparison | AICalculator.pro',
    description: 'Calculate and compare Traditional vs Roth IRA retirement savings. See tax implications, RMDs, and which IRA type is best for you.',
    url: 'https://aicalculator.pro/ira-calculator',
    siteName: 'AICalculator.pro',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://aicalculator.pro/og-ira.png',
        width: 1200,
        height: 630,
        alt: 'IRA Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IRA Calculator - Traditional vs Roth IRA Comparison',
    description: 'Calculate and compare Traditional vs Roth IRA retirement savings with tax implications.',
    images: ['https://aicalculator.pro/og-ira.png'],
    creator: '@aicalculator',
  },
};

export default function IRACalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://aicalculator.pro/ira-calculator#webapp',
        name: 'IRA Calculator',
        description: 'Free online IRA calculator to compare Traditional vs Roth IRA, calculate retirement savings, and analyze tax implications.',
        url: 'https://aicalculator.pro/ira-calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Traditional vs Roth IRA comparison',
          'Retirement balance projection',
          'Tax savings calculator',
          'RMD calculator',
          'Contribution limit checker',
          'Tax-deferred growth calculation',
          'After-tax value comparison',
          'Break-even analysis',
          'Yearly growth projections',
          'Visual comparison charts',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://aicalculator.pro/ira-calculator#breadcrumb',
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
            name: 'IRA Calculator',
            item: 'https://aicalculator.pro/ira-calculator',
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': 'https://aicalculator.pro/ira-calculator#howto',
        name: 'How to Use the IRA Calculator',
        description: 'Step-by-step guide to calculate and compare Traditional vs Roth IRA retirement savings',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'IRA Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Your Age Information',
            text: 'Input your current age and planned retirement age. This determines your investment timeline and contribution eligibility.',
            url: 'https://aicalculator.pro/ira-calculator#step1',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Current Balance and Contributions',
            text: 'Input your current IRA balance (if any) and planned annual contribution. 2024 limits: $7,000 (under 50) or $8,000 (50+).',
            url: 'https://aicalculator.pro/ira-calculator#step2',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Show Advanced Options (Optional)',
            text: 'Click Show Advanced Options to select IRA type (Traditional vs Roth), enter tax rates, and specify investment details.',
            url: 'https://aicalculator.pro/ira-calculator#step3',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Set Tax Rates and IRA Type',
            text: 'Enter your current and expected retirement tax rates. Choose between Traditional IRA (tax deduction now) or Roth IRA (tax-free withdrawals).',
            url: 'https://aicalculator.pro/ira-calculator#step4',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Calculate Retirement Savings',
            text: 'Click Calculate IRA to see your projected retirement balance, tax implications, and Traditional vs Roth comparison.',
            url: 'https://aicalculator.pro/ira-calculator#step5',
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Review Comparison and RMDs',
            text: 'Analyze the side-by-side comparison of Traditional vs Roth IRA, including after-tax values and RMD requirements.',
            url: 'https://aicalculator.pro/ira-calculator#step6',
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': 'https://aicalculator.pro/ira-calculator#article',
        headline: 'IRA Calculator - Traditional vs Roth IRA Comparison & Retirement Planning',
        description: 'Comprehensive guide to IRA with free calculator. Learn Traditional vs Roth IRA differences, contribution limits, tax benefits, and retirement planning strategies.',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: 'https://aicalculator.pro',
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: 'https://aicalculator.pro/logo.png',
          },
        },
        datePublished: '2025-11-16',
        dateModified: '2025-11-16',
        image: 'https://aicalculator.pro/og-ira.png',
        articleBody: 'An IRA (Individual Retirement Account) is a tax-advantaged retirement savings account. Use our free calculator to compare Traditional vs Roth IRA and determine which is best for your retirement goals.',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://aicalculator.pro/ira-calculator#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the difference between Traditional IRA and Roth IRA?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Traditional IRA: Contributions are tax-deductible now, but withdrawals in retirement are fully taxed. RMDs required at age 73. Roth IRA: Contributions are after-tax (no deduction), but all withdrawals in retirement are 100% tax-free. No RMDs during your lifetime. Choose Traditional if you expect lower taxes in retirement; choose Roth if you expect higher taxes or want tax-free income.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the IRA contribution limits for 2024?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For 2024, IRA contribution limits are: $7,000 for individuals under 50, and $8,000 for individuals 50 or older (includes $1,000 catch-up contribution). These limits apply to the total of Traditional and Roth IRA contributions combined - you cannot contribute $7,000 to each. If you have both types, your combined contributions cannot exceed the limit.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are Required Minimum Distributions (RMDs)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'RMDs are mandatory withdrawals from Traditional IRAs starting at age 73 (as of 2024). The IRS requires you to withdraw a minimum amount each year based on your account balance and life expectancy. Failure to take RMDs results in a 25% penalty on the amount not withdrawn. Roth IRAs have NO RMDs during the owner lifetime, making them ideal for legacy planning.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I contribute to both a Traditional IRA and Roth IRA?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, you can contribute to both Traditional and Roth IRA in the same year, but your combined contributions cannot exceed the annual limit ($7,000 or $8,000 for 2024). For example, you could contribute $4,000 to Traditional and $3,000 to Roth. However, Traditional IRA deductions may be limited if you or your spouse have a 401(k) and your income exceeds certain thresholds.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is a Traditional IRA tax-deductible if I have a 401(k)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'It depends on your income. If you have a 401(k), Traditional IRA contributions are fully deductible if your 2024 MAGI is under $77,000 (single) or $123,000 (married filing jointly). Partial deduction phases out between $77,000-$87,000 (single) or $123,000-$143,000 (married). Above these limits, contributions are non-deductible. If you do not have a 401(k), Traditional IRA is fully deductible regardless of income.',
            },
          },
          {
            '@type': 'Question',
            name: 'When should I choose Traditional IRA over Roth IRA?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Choose Traditional IRA if: 1) You need a tax deduction now to reduce current taxes, 2) You expect to be in a lower tax bracket in retirement, 3) You are in peak earning years with high income, 4) Your income exceeds Roth IRA limits and you do not want to do backdoor conversion. Traditional IRA is best for high earners who expect lower retirement income and want immediate tax savings.',
            },
          },
          {
            '@type': 'Question',
            name: 'When should I choose Roth IRA over Traditional IRA?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Choose Roth IRA if: 1) You expect higher tax rates in retirement, 2) You want 100% tax-free withdrawals, 3) You do not want RMDs, 4) You are young with decades of tax-free growth ahead, 5) You want to leave tax-free inheritance to heirs. Roth IRA is ideal for younger workers, those expecting career growth, and anyone who values tax-free retirement income and flexibility.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I convert Traditional IRA to Roth IRA?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, you can convert Traditional IRA to Roth IRA at any time through a Roth conversion. You will owe income tax on the converted amount in the year of conversion. This makes sense if: 1) You are in a low-income year, 2) You expect higher future tax rates, 3) You want to avoid RMDs, 4) You have cash to pay the conversion tax. Many people do partial conversions over several years to manage tax impact.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        IRA Calculator - Traditional vs Roth IRA Comparison & Retirement Planning Tool
      </h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="IRA Calculator"
        calculatorUrl="/ira-calculator"
      />

      {/* Calculator Component */}
      <IRACalculator />

      {/* Educational Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-blue max-w-none">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Understanding IRAs: Traditional vs Roth
          </h2>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
            <p className="text-lg text-blue-900 font-semibold mb-2">
              💡 Key Insight
            </p>
            <p className="text-blue-800">
              The choice between Traditional and Roth IRA is fundamentally a bet on your future tax rate. Traditional IRA gives you a tax break now; Roth IRA gives you tax-free income later.
            </p>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            What is an IRA?
          </h3>
          <p className="text-gray-700 mb-4">
            An IRA (Individual Retirement Account) is a tax-advantaged retirement savings account that allows your money to grow tax-deferred or tax-free. Unlike 401(k)s which are employer-sponsored, IRAs are opened individually and offer more investment flexibility. The two main types are Traditional IRA and Roth IRA, each with distinct tax treatments.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            Traditional IRA vs Roth IRA: Complete Comparison
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left">Feature</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Traditional IRA</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Roth IRA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Contributions</td>
                  <td className="border border-gray-300 px-4 py-3">Pre-tax (tax deduction)</td>
                  <td className="border border-gray-300 px-4 py-3">After-tax (no deduction)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Tax Benefit</td>
                  <td className="border border-gray-300 px-4 py-3">Reduce taxable income now</td>
                  <td className="border border-gray-300 px-4 py-3">Tax-free growth forever</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Withdrawals</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-700">Fully taxed as income</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-700 font-bold">100% tax-free</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">RMDs (age 73)</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-700">Required</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-700 font-bold">None</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Income Limits</td>
                  <td className="border border-gray-300 px-4 py-3">Deduction limits if have 401(k)</td>
                  <td className="border border-gray-300 px-4 py-3">Contribution limits (phase-out)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Early Withdrawal</td>
                  <td className="border border-gray-300 px-4 py-3">Tax + 10% penalty</td>
                  <td className="border border-gray-300 px-4 py-3">Contributions anytime tax/penalty-free</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Best For</td>
                  <td className="border border-gray-300 px-4 py-3">High earners now, lower retirement income</td>
                  <td className="border border-gray-300 px-4 py-3">Young earners, expect higher future taxes</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Legacy Planning</td>
                  <td className="border border-gray-300 px-4 py-3">Heirs pay tax on inheritance</td>
                  <td className="border border-gray-300 px-4 py-3">Tax-free inheritance to heirs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            2024 IRA Contribution Limits
          </h3>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-blue-500 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">Under Age 50</h4>
                <p className="text-3xl font-bold text-blue-600 mb-2">$7,000</p>
                <p className="text-sm text-gray-600">Maximum annual contribution</p>
                <p className="text-xs text-gray-500 mt-2">$583/month</p>
              </div>
              <div className="bg-white border-2 border-green-500 rounded-lg p-4">
                <h4 className="font-bold text-green-900 mb-2">Age 50 or Older</h4>
                <p className="text-3xl font-bold text-green-600 mb-2">$8,000</p>
                <p className="text-sm text-gray-600">Includes $1,000 catch-up</p>
                <p className="text-xs text-gray-500 mt-2">$667/month</p>
              </div>
            </div>
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> This limit is combined for Traditional and Roth IRA. You cannot contribute $7,000 to each - the total across both types cannot exceed the limit.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            Traditional IRA Tax Deduction Rules
          </h3>
          <p className="text-gray-700 mb-4">
            Whether your Traditional IRA contribution is tax-deductible depends on whether you (or your spouse) have a 401(k) and your income level:
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left">Scenario</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">2024 Income Limits</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Deduction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">No 401(k)</td>
                  <td className="border border-gray-300 px-4 py-3">Any income</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-700 font-bold">Fully deductible</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Have 401(k) - Single</td>
                  <td className="border border-gray-300 px-4 py-3">Under $77,000</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-700">Fully deductible</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Have 401(k) - Single</td>
                  <td className="border border-gray-300 px-4 py-3">$77,000 - $87,000</td>
                  <td className="border border-gray-300 px-4 py-3 text-yellow-700">Partially deductible</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Have 401(k) - Single</td>
                  <td className="border border-gray-300 px-4 py-3">Over $87,000</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-700">Not deductible</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Have 401(k) - Married</td>
                  <td className="border border-gray-300 px-4 py-3">Under $123,000</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-700">Fully deductible</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Have 401(k) - Married</td>
                  <td className="border border-gray-300 px-4 py-3">$123,000 - $143,000</td>
                  <td className="border border-gray-300 px-4 py-3 text-yellow-700">Partially deductible</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Have 401(k) - Married</td>
                  <td className="border border-gray-300 px-4 py-3">Over $143,000</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-700">Not deductible</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            Understanding Required Minimum Distributions (RMDs)
          </h3>
          <p className="text-gray-700 mb-4">
            One of the biggest differences between Traditional and Roth IRA is RMDs:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h4 className="font-bold text-red-900 mb-3">Traditional IRA RMDs</h4>
              <ul className="space-y-2 text-red-800 text-sm">
                <li>• Must start at age 73 (as of 2024)</li>
                <li>• Based on IRS life expectancy tables</li>
                <li>• Failure to take RMD = 25% penalty</li>
                <li>• Forces taxable income in retirement</li>
                <li>• Can push you into higher tax bracket</li>
                <li>• May affect Social Security taxation</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-bold text-green-900 mb-3">Roth IRA - No RMDs</h4>
              <ul className="space-y-2 text-green-800 text-sm">
                <li>• No RMDs during your lifetime</li>
                <li>• Money grows tax-free forever</li>
                <li>• Withdraw only when you want</li>
                <li>• Better for legacy planning</li>
                <li>• Heirs get tax-free inheritance</li>
                <li>• Maximum flexibility in retirement</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            Decision Framework: Which IRA is Right for You?
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-blue-900 mb-4">Choose Traditional IRA if:</h4>
            <ul className="space-y-2 text-blue-800 mb-6">
              <li className="flex items-start">
                <span className="font-bold mr-2">✓</span>
                <span>You are in your peak earning years (40s-50s) with high income</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">✓</span>
                <span>You need the tax deduction now to reduce current taxes</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">✓</span>
                <span>You expect to be in a lower tax bracket in retirement</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">✓</span>
                <span>You plan to retire in a state with no income tax</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">✓</span>
                <span>You do not mind RMDs and forced withdrawals</span>
              </li>
            </ul>

            <h4 className="font-bold text-blue-900 mb-4">Choose Roth IRA if:</h4>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="font-bold mr-2">✓</span>
                <span>You are young (20s-30s) with decades of tax-free growth ahead</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">✓</span>
                <span>You expect higher tax rates in the future (career growth, tax policy changes)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">✓</span>
                <span>You want 100% tax-free income in retirement</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">✓</span>
                <span>You do not want to be forced to take RMDs</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">✓</span>
                <span>You want to leave tax-free inheritance to heirs</span>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            Advanced Strategy: Roth Conversion
          </h3>
          <p className="text-gray-700 mb-4">
            You can convert Traditional IRA to Roth IRA at any time. This makes sense in certain situations:
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Best Times to Convert:</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• <strong>Low-income year:</strong> Job loss, sabbatical, early retirement - convert when in low tax bracket</li>
              <li>• <strong>Market downturn:</strong> Convert when account value is temporarily low, pay less tax</li>
              <li>• <strong>Before RMDs:</strong> Convert before age 73 to avoid forced withdrawals</li>
              <li>• <strong>Tax law changes:</strong> Convert before anticipated tax rate increases</li>
              <li>• <strong>Partial conversions:</strong> Convert small amounts yearly to manage tax impact</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            IRA vs 401(k): Can You Have Both?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes! You can contribute to both IRA and 401(k) in the same year. This is actually recommended:
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-green-900 mb-3">Optimal Contribution Strategy:</h4>
            <ol className="space-y-2 text-green-800">
              <li><strong>1. 401(k) to employer match</strong> - Free money, always max this first</li>
              <li><strong>2. Max out IRA</strong> - $7-8k/year, better investment options than 401(k)</li>
              <li><strong>3. Return to 401(k)</strong> - Max remaining 401(k) space ($23,000 limit for 2024)</li>
              <li><strong>4. Taxable accounts</strong> - After maxing tax-advantaged accounts</li>
            </ol>
            <p className="text-sm text-green-700 mt-4">
              <strong>Total possible:</strong> $30,000-$38,500/year in tax-advantaged retirement savings (401k + IRA combined)
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 mt-12">
            <h3 className="text-2xl font-bold mb-4">Ready to Plan Your IRA Strategy?</h3>
            <p className="text-blue-100 mb-6">
              Use our free IRA calculator above to compare Traditional vs Roth IRA for your specific situation. See exactly how much you can save and which IRA type maximizes your retirement wealth.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#top"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Calculate Your IRA
              </a>
            </div>
          </div>
        </article>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {jsonLd['@graph'][4].mainEntity.map((faq: any, index: number) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.name}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {faq.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/roth-ira-calculator"
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="text-2xl mb-2">🏦</div>
            <h3 className="font-semibold text-gray-900 mb-1">Roth IRA</h3>
            <p className="text-sm text-gray-600">Calculate Roth IRA</p>
          </a>
          <a
            href="/401k-calculator"
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="text-2xl mb-2">💼</div>
            <h3 className="font-semibold text-gray-900 mb-1">401(k)</h3>
            <p className="text-sm text-gray-600">Calculate 401k savings</p>
          </a>
          <a
            href="/retirement-calculator"
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="text-2xl mb-2">🏖️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Retirement</h3>
            <p className="text-sm text-gray-600">Plan retirement needs</p>
          </a>
          <a
            href="/investment-calculator"
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="text-2xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900 mb-1">Investment</h3>
            <p className="text-sm text-gray-600">Project investment growth</p>
          </a>
        </div>
      </section>
    </div>
  );
}

