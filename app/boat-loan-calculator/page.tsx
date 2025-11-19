import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import BoatLoanCalculator from '@/components/Calculator/BoatLoanCalculator';
import Link from 'next/link';
import { Anchor, DollarSign, Calculator, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Boat Loan Calculator - Calculate Marine Financing | Free Tool',
  description: 'Free boat loan calculator to calculate monthly payments, total costs including insurance, maintenance, and dockage. Compare new vs used boats and assess affordability.',
  keywords: [
    'boat loan calculator',
    'marine financing calculator',
    'yacht loan calculator',
    'sailboat loan calculator',
    'boat payment calculator',
    'marine loan calculator',
    'boat financing calculator',
    'vessel loan calculator',
    'boat mortgage calculator',
    'watercraft loan calculator',
    'boat purchase calculator',
    'marine payment calculator',
    'boat ownership cost',
    'boat insurance calculator',
    'boat maintenance cost',
    'dockage fee calculator',
    'boat depreciation calculator',
    'marine affordability calculator',
    'yacht financing calculator',
    'speedboat loan calculator',
  ],
  openGraph: {
    title: 'Boat Loan Calculator - Calculate Marine Financing',
    description: 'Free calculator for boat loans including insurance, maintenance, and dockage costs. Assess affordability and compare financing options.',
    type: 'website',
    url: 'https://aicalculator.pro/boat-loan-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boat Loan Calculator',
    description: 'Calculate boat loan payments and total ownership costs',
  },
  alternates: {
    canonical: 'https://aicalculator.pro/boat-loan-calculator',
  },
};

export default function BoatLoanCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Boat Loan Calculator',
        description: 'Calculate boat loan payments and total ownership costs',
        url: 'https://aicalculator.pro/boat-loan-calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate monthly boat loan payments',
          'Estimate insurance costs',
          'Calculate maintenance expenses',
          'Include dockage fees',
          'Assess loan affordability',
          'Compare new vs used boats',
          'Calculate depreciation',
          'Total ownership cost analysis',
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
            name: 'Boat Loan Calculator',
            item: 'https://aicalculator.pro/boat-loan-calculator',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much should I put down on a boat loan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Typically, lenders require 10-20% down payment for boat loans. A larger down payment (20-30%) can help you get better interest rates and lower monthly payments. For used boats, lenders may require a higher down payment.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are typical boat loan interest rates?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Boat loan interest rates typically range from 5% to 8% for qualified borrowers. Rates depend on your credit score, loan amount, loan term, and whether the boat is new or used. New boats generally qualify for lower rates than used boats.',
            },
          },
          {
            '@type': 'Question',
            name: 'Should I buy a new or used boat?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'New boats offer warranties and the latest features but depreciate faster (10-15% first year). Used boats are more affordable but may need more maintenance. Consider having a marine survey done for used boats. Your decision should balance budget, intended use, and maintenance capabilities.',
            },
          },
          {
            '@type': 'Question',
            name: 'What additional costs should I budget for boat ownership?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Beyond the loan payment, budget for: insurance (1-2% of boat value annually), maintenance (2-3% of value), dockage/storage fees ($1,000-$10,000+ per year), fuel, winterization, and unexpected repairs. Total annual costs typically run 10-15% of the boat\'s value.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate Boat Loan Payments',
        description: 'Step-by-step guide to calculating boat financing',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Boat Type and Condition',
            text: 'Choose the type of boat (sailboat, yacht, or speedboat) and condition (new or used)',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Boat Price and Down Payment',
            text: 'Input the boat price and desired down payment percentage (10-50%)',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Set Loan Terms',
            text: 'Enter the interest rate and loan term (typically 10-20 years for boats)',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Add Additional Costs',
            text: 'Include monthly dockage fees and your yearly income for affordability assessment',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Review Results',
            text: 'Analyze monthly payments, total ownership costs, depreciation, and affordability',
          },
        ],
      },
      {
        '@type': 'Article',
        headline: 'Understanding Boat Financing and Ownership Costs',
        description: 'Comprehensive guide to boat loans and marine financing',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: 'https://aicalculator.pro/logo.png',
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
      <h1 className="sr-only">Boat Loan Calculator - Calculate Marine Financing</h1>

      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Boat Loan Calculator"
        calculatorUrl="/boat-loan-calculator"
      />

      {/* Calculator */}
      <BoatLoanCalculator />

      {/* Educational Content */}
      <article className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-blue-600" />
            What is a Boat Loan Calculator?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            A Boat Loan Calculator helps you estimate the monthly payments and total costs of financing a boat purchase. 
            It calculates not just the loan payment, but also ongoing ownership costs like insurance, maintenance, and 
            dockage fees. This comprehensive view helps you understand the true cost of boat ownership and assess whether 
            you can afford the boat you're considering.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Boat Financing</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">⛵ Boat Types</h3>
              <p className="text-sm text-gray-600">
                Different types of boats depreciate at different rates. Sailboats typically depreciate 8% annually, 
                yachts around 10%, and speedboats about 12% per year. This affects resale value and loan terms.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">💰 Down Payment</h3>
              <p className="text-sm text-gray-600">
                Most lenders require 10-20% down for boat loans. Putting down 20% or more can help you qualify for 
                better interest rates and reduce your monthly payments significantly.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">📊 Interest Rates</h3>
              <p className="text-sm text-gray-600">
                Boat loan rates typically range from 5-8% depending on your credit, the boat's age, and loan amount. 
                New boats usually qualify for lower rates than used boats.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">⏰ Loan Terms</h3>
              <p className="text-sm text-gray-600">
                Boat loans typically range from 10-20 years. Longer terms mean lower monthly payments but more interest 
                paid over time. Consider the boat's expected lifespan when choosing a term.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Total Ownership Costs</h2>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Insurance</h3>
              <p className="text-sm text-gray-600">
                <strong>Cost:</strong> Typically 1-2% of the boat's value per year.
                <br />
                <strong>Factors:</strong> Boat type, value, usage area, and your experience level.
                <br />
                <strong>Coverage:</strong> Hull insurance, liability, personal property, and medical payments.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Maintenance</h3>
              <p className="text-sm text-gray-600">
                <strong>Cost:</strong> Budget 2-3% of boat value annually for routine maintenance.
                <br />
                <strong>Includes:</strong> Engine service, bottom paint, winterization, detailing, and repairs.
                <br />
                <strong>Rule of Thumb:</strong> "The happiest two days: the day you buy it and the day you sell it" - maintain properly to maximize enjoyment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Dockage & Storage</h3>
              <p className="text-sm text-gray-600">
                <strong>Range:</strong> $1,000-$10,000+ per year depending on location and boat size.
                <br />
                <strong>Options:</strong> Marina slip, mooring, dry storage, or trailer storage at home.
                <br />
                <strong>Additional:</strong> Some marinas require boat insurance and charge extra for utilities.
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
                <h3 className="font-semibold text-gray-900 mb-1">Select Boat Details</h3>
                <p className="text-gray-600 text-sm">
                  Choose the type of boat (sailboat, yacht, or speedboat) and whether it's new or used. This affects 
                  insurance rates, maintenance costs, and depreciation.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Enter Purchase Price and Down Payment</h3>
                <p className="text-gray-600 text-sm">
                  Input the boat's purchase price and your down payment percentage (typically 10-50%). A larger down 
                  payment reduces your monthly costs.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Set Loan Terms</h3>
                <p className="text-gray-600 text-sm">
                  Enter the interest rate and loan term. Shop around for rates - marine lenders, banks, and credit 
                  unions all offer boat financing with varying rates.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                4
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Add Ongoing Costs</h3>
                <p className="text-gray-600 text-sm">
                  Include monthly dockage fees and your yearly income. The calculator will assess whether the total 
                  monthly cost fits comfortably in your budget.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                5
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Review Complete Cost Analysis</h3>
                <p className="text-gray-600 text-sm">
                  See your monthly payment breakdown, total ownership costs, depreciation estimates, and an affordability 
                  assessment based on your income.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">New vs Used Boats</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🆕</span> New Boats
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-green-600 font-medium">Advantages:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Manufacturer warranty (typically 5-10 years)</li>
                  <li>Latest technology and features</li>
                  <li>Lower insurance rates initially</li>
                  <li>Better financing rates (5-6%)</li>
                  <li>No unknown history or hidden problems</li>
                </ul>
                <p className="text-red-600 font-medium mt-3">Disadvantages:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Higher purchase price</li>
                  <li>Steep depreciation (10-15% first year)</li>
                  <li>Higher property taxes in some states</li>
                </ul>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">♻️</span> Used Boats
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-green-600 font-medium">Advantages:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Lower purchase price (30-50% less)</li>
                  <li>Slower depreciation rate</li>
                  <li>More boat for your money</li>
                  <li>Previous owner absorbed initial depreciation</li>
                  <li>May include extras and upgrades</li>
                </ul>
                <p className="text-red-600 font-medium mt-3">Disadvantages:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>No or limited warranty</li>
                  <li>Higher maintenance costs (3-4% annually)</li>
                  <li>Slightly higher interest rates (6-8%)</li>
                  <li>Require professional survey ($500-$1,500)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Boat Financing Tips</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Improve your credit score:</strong> A credit score above 700 can qualify you for the best rates, potentially saving thousands in interest.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Shop multiple lenders:</strong> Compare rates from marine lenders, banks, and credit unions. Rates can vary significantly.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Consider the total cost:</strong> Monthly payment is just part of the equation. Factor in insurance, maintenance, fuel, and storage.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Don't overextend:</strong> Total monthly boat costs shouldn't exceed 15-20% of your gross monthly income.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Get a marine survey:</strong> For used boats, a professional survey can identify issues before purchase, potentially saving you from expensive repairs.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Time your purchase:</strong> Boat prices are typically lower in fall/winter when demand is down. You may negotiate better deals.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Understand depreciation:</strong> Boats typically lose 10-15% value in the first year, then 5-10% annually. Plan for long-term ownership.</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How much should I put down on a boat loan?</h3>
              <p className="text-sm text-gray-600">
                Typically, lenders require 10-20% down payment for boat loans. However, putting down 20-30% can help 
                you secure better interest rates and lower your monthly payments. For used boats, lenders may require 
                a higher down payment (20-25%). The more you put down, the less you'll pay in interest over the loan term.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What are typical boat loan interest rates?</h3>
              <p className="text-sm text-gray-600">
                Boat loan interest rates typically range from 5% to 8% for qualified borrowers with good credit. Rates 
                depend on several factors: your credit score (higher scores get better rates), loan amount, loan term, 
                boat age, and whether it's new or used. New boats generally qualify for rates 0.5-1% lower than used boats. 
                Marine lenders often offer competitive rates specifically for boat purchases.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Should I buy a new or used boat?</h3>
              <p className="text-sm text-gray-600">
                This depends on your budget and priorities. New boats offer warranties, latest features, and no hidden 
                history, but depreciate 10-15% in the first year alone. Used boats are 30-50% cheaper and have slower 
                depreciation, but may need more maintenance and come with higher insurance and interest rates. Consider 
                having a marine survey ($500-$1,500) done on any used boat before purchase. Generally, if you plan to 
                keep the boat long-term (10+ years), buying new makes more sense. For shorter ownership, used boats offer 
                better value.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What additional costs should I budget for boat ownership?</h3>
              <p className="text-sm text-gray-600">
                Beyond the loan payment, budget for: <strong>Insurance</strong> (1-2% of boat value annually), 
                <strong>Maintenance</strong> (2-3% of value for routine service, more for used boats), 
                <strong>Dockage/Storage</strong> ($1,000-$10,000+ per year depending on location), <strong>Fuel</strong> 
                (varies widely by usage), <strong>Winterization</strong> ($500-$1,000 in cold climates), and 
                <strong>Unexpected Repairs</strong> (set aside 5-10% of boat value as emergency fund). As a rule of thumb, 
                total annual costs typically run 10-15% of the boat's value. A $100,000 boat might cost $10,000-$15,000 
                per year beyond the loan payment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I get financing for a used boat?</h3>
              <p className="text-sm text-gray-600">
                Yes, most lenders offer financing for used boats, though typically with slightly higher interest rates 
                (0.5-1% higher than new boats). Lenders may have restrictions on boat age - many won't finance boats 
                older than 20-25 years. You'll likely need a higher down payment (20-25%) for used boats. Most lenders 
                will require a professional marine survey to verify the boat's condition and value before approving the loan.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How long can I finance a boat?</h3>
              <p className="text-sm text-gray-600">
                Boat loan terms typically range from 10-20 years, depending on the loan amount and boat value. Generally: 
                loans under $25,000 are limited to 10-12 years; loans $25,000-$50,000 can go 15 years; loans over $50,000 
                may extend to 20 years. However, it's wise not to finance beyond the boat's useful life. Consider that 
                longer terms mean significantly more interest paid. A 15-year loan at 6% interest doubles the total cost 
                compared to a 10-year loan.
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
              <Anchor className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Mortgage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate home loan payments</p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}

