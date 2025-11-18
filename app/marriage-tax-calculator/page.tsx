import type { Metadata } from 'next';
import MarriageTaxCalculator from '@/components/Calculator/MarriageTaxCalculator';
import Link from 'next/link';
import { Heart, DollarSign, TrendingDown, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Marriage Tax Calculator - Calculate Tax Impact of Marriage | Free Tool',
  description: 'Free marriage tax calculator to compare tax filing as single vs married. Calculate marriage penalty or bonus, optimize tax strategy, and understand tax implications of marriage.',
  keywords: [
    'marriage tax calculator',
    'marriage penalty calculator',
    'marriage bonus calculator',
    'married vs single tax',
    'joint tax return calculator',
    'married filing jointly',
    'married filing separately',
    'tax impact of marriage',
    'marriage tax comparison',
    'wedding tax calculator',
    'couple tax calculator',
    'dual income tax',
    'marriage tax break',
    'filing status calculator',
    'tax penalty marriage',
    'marriage tax benefit',
    'married tax calculator',
    'joint filing calculator',
    'marriage tax savings',
    'couple income tax',
    'marriage tax liability',
    'spouse tax calculator',
    'newlywed tax',
    'marriage tax planning',
    'married couple tax',
    'joint return calculator',
    'marriage tax analysis',
    'tax marriage comparison',
    'married tax filing',
    'marriage tax estimator'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Marriage Tax Calculator - Calculate Tax Impact of Marriage',
    description: 'Compare tax filing as single vs married. Calculate marriage penalty or bonus and optimize your tax strategy.',
    type: 'website',
    url: 'https://aicalculator.pro/marriage-tax-calculator',
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: 'https://aicalculator.pro/og-marriage-tax-calculator.jpg',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marriage Tax Calculator - Calculate Tax Impact of Marriage',
    description: 'Compare tax filing as single vs married. Free calculator with marriage penalty/bonus analysis.',
    images: ['https://aicalculator.pro/og-marriage-tax-calculator.jpg'],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: 'https://aicalculator.pro/marriage-tax-calculator',
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

export default function MarriageTaxCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://aicalculator.pro/marriage-tax-calculator#webapp',
        name: 'Marriage Tax Calculator',
        url: 'https://aicalculator.pro/marriage-tax-calculator',
        description: 'Free calculator to compare tax implications of filing as single vs married filing jointly.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Compare single vs married tax filing',
          'Calculate marriage penalty or bonus',
          'Multiple income scenarios',
          'Federal and state tax calculation',
          'Retirement contribution analysis',
          'Effective tax rate comparison',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://aicalculator.pro/marriage-tax-calculator#breadcrumb',
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
            name: 'Marriage Tax Calculator',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://aicalculator.pro/marriage-tax-calculator#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the marriage tax penalty?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The marriage tax penalty occurs when a married couple pays more in taxes filing jointly than they would have paid as two single filers. This typically happens when both spouses have similar high incomes, pushing them into higher tax brackets.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the marriage tax bonus?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The marriage tax bonus occurs when a married couple pays less in taxes filing jointly than they would have as single filers. This often happens when there\'s a significant income disparity between spouses or when one spouse doesn\'t work.',
            },
          },
          {
            '@type': 'Question',
            name: 'Should we file jointly or separately?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most married couples benefit from filing jointly due to higher standard deductions and more favorable tax brackets. However, filing separately may be better in specific situations, such as when one spouse has significant medical expenses or student loan debt.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does marriage affect taxes?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Marriage affects taxes through combined income levels, different tax brackets, higher standard deductions, and potential changes in eligibility for certain credits and deductions. The overall impact depends on both spouses\' incomes and financial situations.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': 'https://aicalculator.pro/marriage-tax-calculator#howto',
        name: 'How to Use the Marriage Tax Calculator',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Spouse 1 Information',
            text: 'Input salary, business income, investments, and retirement contributions for the first spouse.',
            url: 'https://aicalculator.pro/marriage-tax-calculator#step1',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Spouse 2 Information',
            text: 'Input the same financial information for the second spouse.',
            url: 'https://aicalculator.pro/marriage-tax-calculator#step2',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Set Tax Rates',
            text: 'Enter your state and city tax rates for accurate calculations.',
            url: 'https://aicalculator.pro/marriage-tax-calculator#step3',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate and Compare',
            text: 'Click "Calculate" to see tax comparison between filing as single vs married filing jointly, including any marriage penalty or bonus.',
            url: 'https://aicalculator.pro/marriage-tax-calculator#step4',
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': 'https://aicalculator.pro/marriage-tax-calculator#article',
        headline: 'Understanding Marriage Tax Penalty and Bonus',
        description: 'Learn how marriage affects your taxes, understand marriage penalty and bonus, and optimize your tax filing strategy.',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString(),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Marriage Tax Calculator - Calculate Tax Impact of Marriage
        </h1>

        {/* Breadcrumb Navigation */}
        <nav className="max-w-7xl mx-auto px-4 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900">Marriage Tax Calculator</span>
            </li>
          </ol>
        </nav>

        {/* Calculator Component */}
        <MarriageTaxCalculator />

        {/* Educational Content */}
        <article className="max-w-7xl mx-auto px-4 py-12">
          {/* What is Marriage Tax Calculator */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What is a Marriage Tax Calculator?
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                A marriage tax calculator helps couples understand the tax implications of getting married by comparing their tax liability when filing as single individuals versus filing jointly as a married couple. This tool is essential for financial planning and can reveal whether you'll experience a marriage tax penalty or bonus.
              </p>
              <p>
                Our calculator uses current federal tax brackets and standard deductions to provide accurate comparisons, helping you make informed decisions about your financial future together.
              </p>
            </div>
          </section>

          {/* Common Use Cases */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Common Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Pre-Wedding Planning</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Understand tax implications before getting married. Plan your wedding date strategically based on potential tax savings or penalties.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Financial Planning</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Optimize your combined income strategy, retirement contributions, and deductions to minimize tax liability as a married couple.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingDown className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Tax Strategy</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Compare filing jointly vs separately to determine the most beneficial filing status for your specific situation.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <Info className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Income Scenarios</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Test different income combinations and scenarios to understand how changes in employment or earnings affect your tax situation.
                </p>
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How to Use the Marriage Tax Calculator
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-lg p-6 space-y-4 border border-blue-100">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">💑 Simple Steps</h3>
                <ol className="list-decimal list-inside text-gray-700 text-sm space-y-2 ml-4">
                  <li>Enter income information for Spouse 1 (salary, investments, rental income)</li>
                  <li>Enter income information for Spouse 2</li>
                  <li>Add retirement contributions (401K, IRA) for both spouses</li>
                  <li>Set your state and city tax rates</li>
                  <li>Click "Calculate" to see the comparison</li>
                </ol>
              </div>
              <div className="pt-4 border-t border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">💡 Pro Tips</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Include all income sources for accurate results</li>
                  <li>Consider retirement contributions to lower taxable income</li>
                  <li>Compare different scenarios by adjusting income levels</li>
                  <li>Factor in state taxes as they vary significantly by location</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Understanding Marriage Penalty and Bonus */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Understanding Marriage Penalty and Bonus
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Marriage Tax Penalty</h3>
              <p className="text-gray-700 mb-4">
                The marriage tax penalty occurs when a married couple pays more in combined taxes filing jointly than they would have paid as two single filers. This typically happens when:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>Both spouses earn similar high incomes</li>
                <li>Combined income pushes them into higher tax brackets</li>
                <li>Both spouses have substantial investment income</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mb-3">Marriage Tax Bonus</h3>
              <p className="text-gray-700 mb-4">
                The marriage tax bonus occurs when a married couple pays less in taxes filing jointly than as single filers. This often happens when:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>There's significant income disparity between spouses</li>
                <li>One spouse doesn't work or earns significantly less</li>
                <li>The couple benefits from doubled standard deduction</li>
                <li>Income splitting keeps them in lower tax brackets</li>
              </ul>
            </div>
          </section>

          {/* Tips for Tax Planning */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Marriage Tax Planning Tips
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-gray-700 text-sm">
                  <strong>💍 Tip:</strong> Consider timing your wedding strategically. If you expect a penalty, you might consider marrying early in the following year. If you expect a bonus, marry before December 31st.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-gray-700 text-sm">
                  <strong>💰 Tip:</strong> Maximize retirement contributions. These reduce your taxable income and can help offset marriage penalties while building retirement savings.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-gray-700 text-sm">
                  <strong>📊 Tip:</strong> Review your withholdings after marriage. Adjust your W-4 forms to ensure proper tax withholding based on your new filing status.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-gray-700 text-sm">
                  <strong>📝 Tip:</strong> Consider itemizing deductions if your combined expenses exceed the standard deduction, especially for mortgages and charitable donations.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How accurate is this calculator?
                </h3>
                <p className="text-gray-700 text-sm">
                  Our calculator uses current federal tax brackets and standard deductions to provide accurate estimates. However, individual tax situations can be complex, and this calculator provides estimates for planning purposes. Consult a tax professional for personalized advice.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  When should married couples file separately?
                </h3>
                <p className="text-gray-700 text-sm">
                  Filing separately may be beneficial if one spouse has significant medical expenses, student loan debt, or if you want to keep finances separate. However, most couples save more by filing jointly due to more favorable tax treatment and higher standard deductions.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Does the calculator include state taxes?
                </h3>
                <p className="text-gray-700 text-sm">
                  Yes! The calculator allows you to input your state and city tax rates to get a more accurate total tax picture. State tax laws vary significantly, so this helps provide a more complete analysis.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I avoid the marriage tax penalty?
                </h3>
                <p className="text-gray-700 text-sm">
                  While you can't completely avoid it if both spouses have high incomes, you can minimize the impact by maximizing retirement contributions, timing certain income and deductions, and carefully planning your filing strategy.
                </p>
              </div>
            </div>
          </section>

          {/* Related Calculators */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Calculators
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/tax-calculator"
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-3">💰</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Tax Calculator
                </h3>
                <p className="text-gray-600 text-sm">
                  Calculate your income tax
                </p>
              </Link>
              <Link
                href="/salary-calculator"
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-3">💵</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Salary Calculator
                </h3>
                <p className="text-gray-600 text-sm">
                  Calculate net salary after taxes
                </p>
              </Link>
              <Link
                href="/retirement-calculator"
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-3">🏖️</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Retirement Calculator
                </h3>
                <p className="text-gray-600 text-sm">
                  Plan your retirement savings
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

