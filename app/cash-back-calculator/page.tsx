import type { Metadata } from 'next';
import { getUrl, getOgImage } from '@/config/site';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import CashBackCalculator from '@/components/Calculator/CashBackCalculator';
import Link from 'next/link';
import { DollarSign, TrendingDown, Calculator, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cash Back or Low Interest Calculator - Compare Auto Loan Offers | Free Tool',
  description: 'Free calculator to compare cash back offers vs low interest rate offers for auto loans. Determine which option saves you more money over the life of your car loan.',
  keywords: [
    'cash back calculator',
    'low interest calculator',
    'auto loan calculator',
    'car loan calculator',
    'cash back vs low interest',
    'dealer incentive calculator',
    'car financing calculator',
    'rebate calculator',
    'auto financing comparison',
    'car loan comparison',
    'dealer cash back',
    'financing options calculator',
    'auto loan comparison',
    'car purchase calculator',
    'vehicle financing calculator',
    'cash rebate calculator',
    'auto loan interest calculator',
    'car loan interest calculator',
    'dealer incentive comparison',
    'auto financing options',
    'car loan offers',
    'best auto loan',
    'car financing options',
    'auto loan rebate',
    'vehicle loan calculator',
    'car purchase financing',
    'auto loan savings',
    'car loan savings',
    'dealer offers calculator',
    'auto incentives calculator',
  ],
  openGraph: {
    title: 'Cash Back or Low Interest Calculator - Compare Auto Loan Offers',
    description: 'Free calculator to compare cash back offers vs low interest rate offers for auto loans. Determine which option saves you more money.',
    type: 'website',
    url: getUrl('/cash-back-calculator'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cash Back or Low Interest Calculator',
    description: 'Compare cash back offers vs low interest rate offers for auto loans',
  },
  alternates: {
    canonical: getUrl('/cash-back-calculator'),
  },
};

export default function CashBackCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Cash Back or Low Interest Calculator',
        description: 'Compare cash back offers vs low interest rate offers for auto loans',
        url: getUrl('/cash-back-calculator'),
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Compare cash back vs low interest rate offers',
          'Calculate total loan costs',
          'Monthly payment comparison',
          'Interest savings calculation',
          'Total cost of ownership',
          'Recommendation based on savings',
        ],
      },
      {
        '@type': 'BreadcrumbList',
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
            name: 'Cash Back Calculator',
            item: getUrl('/cash-back-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Should I take the cash back or low interest rate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'It depends on the loan amount, term, and interest rate difference. Generally, for shorter loan terms (36-48 months), cash back is often better. For longer terms (60-72 months), the low interest rate usually saves more money. Use our calculator to compare both options based on your specific situation.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does cash back affect my auto loan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cash back reduces your loan amount but comes with a higher interest rate. The immediate savings from reduced principal must be weighed against the increased interest costs over the loan term. Our calculator shows you the total cost comparison.',
            },
          },
          {
            '@type': 'Question',
            name: 'What factors should I consider?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Consider: 1) Loan term length, 2) Interest rate difference, 3) Cash back amount, 4) Your down payment, 5) Monthly payment impact, 6) Total interest paid over the loan life, 7) Your personal cash flow needs.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does loan term affect which option is better?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, significantly. Shorter loan terms (36-48 months) often favor cash back because you pay less total interest. Longer terms (60-72 months) typically favor low interest rates because the lower rate saves more money over the extended period.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Compare Cash Back vs Low Interest Rate',
        description: 'Step-by-step guide to comparing auto loan offers',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Cash Back Details',
            text: 'Input the cash back amount and the associated interest rate',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Low Rate Details',
            text: 'Input the low interest rate offer',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Vehicle Information',
            text: 'Input auto price, down payment, trade-in value, and fees',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Compare Results',
            text: 'Review monthly payments, total interest, and total cost for both options',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Make Informed Decision',
            text: 'Choose the option that offers the best overall savings and fits your budget',
          },
        ],
      },
      {
        '@type': 'Article',
        headline: 'Cash Back vs Low Interest Rate: Making the Right Choice',
        description: 'Comprehensive guide to comparing auto loan financing options',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.aicalculator.pro/logo.png',
          },
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString(),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Cash Back or Low Interest Calculator - Compare Auto Loan Offers</h1>

      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Cash Back or Low Interest Calculator"
        calculatorUrl="/cash-back-calculator"
      />

      {/* Calculator */}
      <CashBackCalculator />

      {/* Educational Content */}
      <article className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-blue-600" />
            What is a Cash Back or Low Interest Calculator?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            A Cash Back or Low Interest Calculator helps car buyers compare two common dealer financing incentives: 
            cash back rebates with higher interest rates versus no cash back but lower interest rates. This tool 
            calculates the total cost of each option over the loan term, helping you make an informed decision that 
            saves you the most money.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">🚗 New Car Purchase</h3>
              <p className="text-sm text-gray-600">
                Compare manufacturer incentives to determine which financing option provides the best value for your new vehicle purchase.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">💰 Dealer Negotiations</h3>
              <p className="text-sm text-gray-600">
                Make informed decisions during negotiations by understanding the true cost of each financing offer.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">📊 Budget Planning</h3>
              <p className="text-sm text-gray-600">
                Compare monthly payments and total costs to choose the option that best fits your budget and financial goals.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">⏰ Loan Term Decisions</h3>
              <p className="text-sm text-gray-600">
                See how different loan terms affect which financing option provides better savings over time.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Enter Cash Back Offer Details</h3>
                <p className="text-gray-600 text-sm">
                  Input the cash back amount and the associated interest rate from the dealer or manufacturer.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Enter Low Interest Rate Offer</h3>
                <p className="text-gray-600 text-sm">
                  Input the alternative low interest rate offer (typically without cash back).
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Input Vehicle and Loan Details</h3>
                <p className="text-gray-600 text-sm">
                  Enter the auto price, loan term, down payment, trade-in value, sales tax, and any additional fees.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                4
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Review the Comparison</h3>
                <p className="text-gray-600 text-sm">
                  Compare monthly payments, total interest paid, and total cost for both financing options.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                5
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Make Your Decision</h3>
                <p className="text-gray-600 text-sm">
                  Choose the financing option that provides the best overall value and fits your budget.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Options</h2>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Cash Back Offer</h3>
              <p className="text-sm text-gray-600">
                <strong>Pros:</strong> Immediate savings, reduced loan amount, lower monthly payments initially.
                <br />
                <strong>Cons:</strong> Higher interest rate, more total interest paid over the loan term.
                <br />
                <strong>Best for:</strong> Shorter loan terms (36-48 months), buyers who value immediate savings.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Low Interest Rate Offer</h3>
              <p className="text-sm text-gray-600">
                <strong>Pros:</strong> Less total interest paid, lower total cost over the loan life.
                <br />
                <strong>Cons:</strong> Higher initial loan amount, potentially higher monthly payments.
                <br />
                <strong>Best for:</strong> Longer loan terms (60-72 months), buyers focused on total cost savings.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Auto Financing Tips</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Always compare total cost:</strong> Don't just focus on monthly payments; look at the total amount paid over the loan term.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Consider your timeline:</strong> How long do you plan to keep the vehicle? This affects which option is better.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Factor in opportunity cost:</strong> If you take cash back, could you invest it and earn returns?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Read the fine print:</strong> Ensure there are no hidden fees or restrictions on either offer.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Get pre-approved:</strong> Having outside financing options gives you negotiating leverage.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Check your credit score:</strong> Better credit scores may qualify you for even lower rates.</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Should I take the cash back or low interest rate?</h3>
              <p className="text-sm text-gray-600">
                It depends on the loan amount, term, and interest rate difference. Generally, for shorter loan terms (36-48 months), 
                cash back is often better. For longer terms (60-72 months), the low interest rate usually saves more money. Use our 
                calculator to compare both options based on your specific situation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does cash back affect my auto loan?</h3>
              <p className="text-sm text-gray-600">
                Cash back reduces your loan amount but comes with a higher interest rate. The immediate savings from reduced principal 
                must be weighed against the increased interest costs over the loan term. Our calculator shows you the total cost comparison.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What factors should I consider?</h3>
              <p className="text-sm text-gray-600">
                Consider: 1) Loan term length, 2) Interest rate difference, 3) Cash back amount, 4) Your down payment, 
                5) Monthly payment impact, 6) Total interest paid over the loan life, 7) Your personal cash flow needs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Does loan term affect which option is better?</h3>
              <p className="text-sm text-gray-600">
                Yes, significantly. Shorter loan terms (36-48 months) often favor cash back because you pay less total interest. 
                Longer terms (60-72 months) typically favor low interest rates because the lower rate saves more money over the extended period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I negotiate both the cash back and interest rate?</h3>
              <p className="text-sm text-gray-600">
                Typically, these are separate manufacturer or dealer incentives that can't be combined. However, you can negotiate 
                the vehicle price regardless of which financing option you choose. Getting the best price is always beneficial.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Should I consider outside financing?</h3>
              <p className="text-sm text-gray-600">
                Yes! Always check rates from banks and credit unions. Sometimes you can get an even better rate than the dealer's 
                low-interest offer, and still take advantage of cash back rebates. Compare all options before deciding.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Calculators</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/loan-calculator"
              className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <Calculator className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Loan Calculator</h3>
              <p className="text-sm text-gray-600">Calculate monthly payments for any loan</p>
            </Link>
            <Link
              href="/auto-loan-calculator"
              className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <DollarSign className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Auto Loan Calculator</h3>
              <p className="text-sm text-gray-600">Calculate car loan payments and costs</p>
            </Link>
            <Link
              href="/mortgage-calculator"
              className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <TrendingDown className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Mortgage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate home loan payments</p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}

