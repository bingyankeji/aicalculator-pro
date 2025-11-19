import type { Metadata } from 'next';
import { getUrl, getOgImage } from '@/config/site';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import MortgageCalculatorUK from '@/components/Calculator/MortgageCalculatorUK';
import Link from 'next/link';
import { Home, Calculator, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'UK Mortgage Calculator - Calculate Monthly Payments & Stamp Duty | Free Tool',
  description: 'Free UK mortgage calculator for British Pound currency. Calculate monthly repayments, interest-only payments, stamp duty, and total costs. Includes detailed amortization schedule.',
  keywords: [
    'uk mortgage calculator',
    'british mortgage calculator',
    'mortgage calculator uk',
    'uk home loan calculator',
    'stamp duty calculator',
    'british pound mortgage',
    'uk property calculator',
    'mortgage repayment calculator uk',
    'interest only mortgage calculator',
    'uk mortgage payment calculator',
    'british home loan calculator',
    'mortgage affordability calculator uk',
    'uk mortgage interest calculator',
    'repayment mortgage calculator',
    'uk house payment calculator',
    'british mortgage payment',
    'uk loan calculator',
    'mortgage uk calculator',
    'uk property loan calculator',
    'british property mortgage',
  ],
  openGraph: {
    title: 'UK Mortgage Calculator - Calculate Monthly Payments',
    description: 'Calculate UK mortgage payments in British Pounds. Includes stamp duty, insurance, and detailed amortization schedule.',
    type: 'website',
    url: getUrl('/mortgage-calculator-uk'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Mortgage Calculator',
    description: 'Calculate UK mortgage payments and stamp duty',
  },
  alternates: {
    canonical: getUrl('/mortgage-calculator-uk'),
  },
};

export default function MortgageCalculatorUKPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'UK Mortgage Calculator',
        description: 'Calculate UK mortgage payments with stamp duty and detailed amortization',
        url: getUrl('/mortgage-calculator-uk'),
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'GBP',
        },
        featureList: [
          'Calculate monthly mortgage repayments',
          'Interest-only payment calculation',
          'Stamp duty calculator',
          'Property tax and insurance',
          'Detailed amortization schedule',
          'Annual and monthly payment breakdown',
          'Total cost analysis',
          'UK-specific mortgage features',
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
            name: 'UK Mortgage Calculator',
            item: getUrl('/mortgage-calculator-uk'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much can I borrow for a UK mortgage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'UK lenders typically allow you to borrow 4-4.5 times your annual income. The exact amount depends on your income, credit score, existing debts, and deposit size. A larger deposit (20%+) usually qualifies you for better rates. First-time buyers may access Help to Buy schemes.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is stamp duty in the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Stamp Duty Land Tax (SDLT) is a tax paid when buying property in England and Northern Ireland. Rates vary by property value: £0-£250,000 (0%), £250,001-£925,000 (5%), £925,001-£1.5m (10%), £1.5m+ (12%). First-time buyers get relief on properties up to £625,000.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between repayment and interest-only mortgages?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Repayment mortgage: Monthly payments cover both interest and principal, gradually paying off the loan. You own the property outright at term end. Interest-only mortgage: You only pay interest monthly; the principal remains unchanged. You must have a repayment plan for the loan amount at term end.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much deposit do I need for a UK mortgage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Minimum deposit is typically 5-10% of property value, but 15-20% deposits secure better interest rates. First-time buyers can access 95% LTV mortgages with government backing. Larger deposits (25%+) offer the best rates and lower monthly payments.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate UK Mortgage Payments',
        description: 'Step-by-step guide to calculating UK mortgage costs',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Property Details',
            text: 'Input the home price in British Pounds and your deposit percentage (typically 10-25%)',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Set Loan Terms',
            text: 'Enter the loan term (typically 25 years) and interest rate (currently 4-6% for most mortgages)',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Add Optional Costs',
            text: 'Include property taxes, home insurance, mortgage insurance, and other annual costs',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate Payments',
            text: 'Click Calculate to see both interest-only and full repayment amounts',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Review Amortization',
            text: 'Check the detailed payment schedule showing how interest and principal change over time',
          },
        ],
      },
      {
        '@type': 'Article',
        headline: 'Complete Guide to UK Mortgages and Home Financing',
        description: 'Everything you need to know about UK mortgage calculations',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
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
      <h1 className="sr-only">UK Mortgage Calculator - Calculate Monthly Payments & Stamp Duty</h1>

      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="UK Mortgage Calculator"
        calculatorUrl="/mortgage-calculator-uk"
      />

      {/* Calculator */}
      <MortgageCalculatorUK />

      {/* Educational Content */}
      <article className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-blue-600" />
            Understanding UK Mortgages
          </h2>
          <p className="text-gray-600 leading-relaxed">
            A UK mortgage is a loan secured against property in the United Kingdom, denominated in British Pounds (£). 
            This calculator helps you estimate monthly payments, total interest, and additional costs like stamp duty, 
            insurance, and property taxes. Whether you're buying your first home or remortgaging, understanding your 
            monthly obligations is crucial for financial planning.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mortgage Types in the UK</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Repayment Mortgage</h3>
              <p className="text-sm text-gray-600 mb-3">
                Each monthly payment covers both interest and a portion of the principal. By the end of the term, 
                you've paid off the entire loan and own the property outright.
              </p>
              <p className="text-xs text-gray-600">
                <strong>Pros:</strong> Guaranteed to pay off loan, builds equity faster<br />
                <strong>Cons:</strong> Higher monthly payments initially
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Interest-Only Mortgage</h3>
              <p className="text-sm text-gray-600 mb-3">
                Monthly payments only cover the interest; the principal remains unchanged. You must have a plan to 
                repay the loan amount at the end of the term.
              </p>
              <p className="text-xs text-gray-600">
                <strong>Pros:</strong> Lower monthly payments<br />
                <strong>Cons:</strong> Must repay full amount at end, more interest over time
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stamp Duty Land Tax (SDLT)</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-600 mb-4">
              Stamp Duty is a tax paid when purchasing property in England and Northern Ireland. Rates in 2024:
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Property Value</th>
                  <th className="text-right p-2">SDLT Rate</th>
                  <th className="text-right p-2">Tax on Portion</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Up to £250,000</td>
                  <td className="p-2 text-right">0%</td>
                  <td className="p-2 text-right">£0</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">£250,001 to £925,000</td>
                  <td className="p-2 text-right">5%</td>
                  <td className="p-2 text-right">Up to £33,750</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">£925,001 to £1,500,000</td>
                  <td className="p-2 text-right">10%</td>
                  <td className="p-2 text-right">Up to £57,500</td>
                </tr>
                <tr>
                  <td className="p-2">Above £1,500,000</td>
                  <td className="p-2 text-right">12%</td>
                  <td className="p-2 text-right">Remaining amount</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-600 mt-4">
              <strong>First-time buyers:</strong> Relief available on properties up to £625,000 (no tax on first £425,000)
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">UK Mortgage Tips</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Save a larger deposit:</strong> 20%+ deposit unlocks better interest rates and reduces monthly payments significantly.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Check your credit score:</strong> A score of 700+ qualifies for the best rates. Fix any errors before applying.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Get an Agreement in Principle:</strong> Shows sellers you're a serious buyer and how much you can borrow.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Compare mortgage rates:</strong> Use comparison sites to find the best deals across different lenders.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Consider mortgage term length:</strong> Shorter terms mean higher monthly payments but less interest overall.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Factor in additional costs:</strong> Budget for solicitor fees (£500-£1,500), survey (£400-£1,500), and moving costs.</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How much can I borrow for a UK mortgage?</h3>
              <p className="text-sm text-gray-600">
                UK lenders typically allow you to borrow 4-4.5 times your annual income. For example, with a £50,000 
                salary, you could borrow £200,000-£225,000. The exact amount depends on your income, credit score, 
                existing debts, and deposit size. Some lenders offer up to 5.5x income for high earners or certain 
                professions. A larger deposit (20%+) usually qualifies you for better rates.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is stamp duty and who pays it?</h3>
              <p className="text-sm text-gray-600">
                Stamp Duty Land Tax (SDLT) is a tax paid by the buyer when purchasing property in England and Northern 
                Ireland. It's calculated on a tiered system based on property value. First-time buyers get relief on 
                properties up to £625,000 (no tax on first £425,000, then 5% on the portion up to £625,000). Scotland 
                has Land and Buildings Transaction Tax (LBTT), and Wales has Land Transaction Tax (LTT) with different 
                rates.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Should I choose a fixed or variable rate mortgage?</h3>
              <p className="text-sm text-gray-600">
                <strong>Fixed rate:</strong> Your interest rate and monthly payment stay the same for the fixed period 
                (typically 2-5 years). Provides certainty and protection against rate rises, but you won't benefit if 
                rates fall. <strong>Variable rate:</strong> Your rate can change based on the Bank of England base rate 
                or the lender's standard variable rate (SVR). Can be cheaper initially but carries more risk. Most 
                borrowers choose fixed rates for stability, especially when rates are low.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How much deposit do I need for a UK mortgage?</h3>
              <p className="text-sm text-gray-600">
                Minimum deposit is typically 5-10% of the property value, but larger deposits secure better rates. 
                With a 5% deposit, you need a 95% LTV (loan-to-value) mortgage, which has higher interest rates and 
                stricter criteria. A 10% deposit (90% LTV) opens more options. At 15-20% deposit, you access 
                significantly better rates. The sweet spot is often 25% deposit (75% LTV) for the best rates and 
                lowest monthly payments.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Calculators</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/mortgage-calculator"
              className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <Home className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">US Mortgage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate mortgage payments in US dollars</p>
            </Link>
            <Link
              href="/loan-calculator"
              className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <Calculator className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Loan Calculator</h3>
              <p className="text-sm text-gray-600">Calculate any type of loan payment</p>
            </Link>
            <Link
              href="/real-estate-calculator"
              className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <Home className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Real Estate Calculator</h3>
              <p className="text-sm text-gray-600">Analyze property investments</p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}

