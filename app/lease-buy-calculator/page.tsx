import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import LeaseBuyCalculator from '@/components/Calculator/LeaseBuyCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Lease vs Buy Calculator - Compare Car Leasing & Buying Costs | AICalculator',
  description: 'Free lease vs buy calculator to compare total costs of leasing vs buying a car. Calculate monthly payments, insurance, maintenance, and long-term savings.',
  keywords: [
    'lease vs buy calculator',
    'car lease calculator',
    'auto lease calculator',
    'lease or buy car',
    'vehicle lease calculator',
    'car buying calculator',
    'lease payment calculator',
    'lease comparison calculator',
    'should i lease or buy',
    'car lease vs buy',
    'auto financing calculator',
    'lease cost calculator',
    'car loan calculator',
    'vehicle financing',
    'lease vs purchase',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Lease vs Buy Calculator - Compare Car Costs',
    description: 'Compare leasing vs buying a car. Calculate total costs, monthly payments, and see which option saves you money.',
    type: 'website',
    url: getUrl('/lease-buy-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('lease-buy'),
      width: 1200,
      height: 630,
      alt: 'Lease vs Buy Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lease vs Buy Calculator',
    description: 'Compare car leasing vs buying costs',
    images: [getOgImage('lease-buy')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/lease-buy-calculator'),
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': getWebAppId('/lease-buy-calculator'),
      name: 'Lease vs Buy Calculator',
      url: getUrl('/lease-buy-calculator'),
      description: 'Compare total costs of leasing vs buying a vehicle including monthly payments, insurance, maintenance, mileage fees, and resale value.',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Lease cost calculation',
        'Buy cost calculation',
        'Monthly payment comparison',
        'Excess mileage fee calculator',
        'Insurance cost comparison',
        'Maintenance cost estimation',
        'Resale value consideration',
        'Total cost comparison',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/lease-buy-calculator'),
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
          name: 'Other',
          item: getUrl('/other'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Lease vs Buy Calculator',
          item: getUrl('/lease-buy-calculator'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/lease-buy-calculator'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is it better to lease or buy a car?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It depends on your situation. Leasing is better if you: drive less than 12,000 miles/year, want lower monthly payments, prefer new cars every 2-3 years, and don\'t want maintenance worries. Buying is better if you: drive a lot, want to build equity, plan to keep the car 5+ years, or want no mileage restrictions. Generally, buying is more economical long-term (7+ years), while leasing offers lower short-term costs and flexibility.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the hidden costs of leasing a car?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hidden lease costs include: excess mileage fees ($0.15-$0.30/mile over limit), wear and tear charges (scratches, dents, tire wear), disposition fee ($300-$500 at lease end), acquisition fee ($300-$1,000 upfront), early termination penalties (can be thousands), gap insurance requirements, and higher insurance premiums. Always read the lease agreement carefully and factor in these potential costs when comparing to buying.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does it cost to lease vs buy over 5 years?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For a $30,000 car over 5 years: Leasing typically costs $25,000-$30,000 (with nothing to show for it). Buying costs $32,000-$35,000 total, but you own a car worth $12,000-$15,000, making your net cost $17,000-$23,000. Buying saves $5,000-$10,000 over 5 years. However, leasing offers lower monthly payments ($300-$400 vs $500-$600) and includes warranty coverage.',
          },
        },
        {
          '@type': 'Question',
          name: 'What credit score do you need to lease vs buy a car?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leasing typically requires a higher credit score (680+) to qualify for good rates, as lessors view it as riskier. Buying is more flexible: 660+ gets decent rates, 600-659 may qualify with higher rates, and even 500-599 can get subprime loans (though expensive). If your credit score is below 660, buying may be easier to finance than leasing.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/lease-buy-calculator'),
      name: 'How to Compare Lease vs Buy Costs',
      description: 'Calculate and compare total costs of leasing vs buying a vehicle',
      totalTime: 'PT5M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      tool: {
        '@type': 'HowToTool',
        name: 'Lease vs Buy Calculator',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Enter Vehicle Price',
          text: 'Input the MSRP or negotiated price of the vehicle you\'re considering.',
          url: getStepUrl('/lease-buy-calculator', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Enter Lease Terms',
          text: 'Input monthly payment, down payment, lease term, mileage limits, and expected annual mileage.',
          url: getStepUrl('/lease-buy-calculator', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Enter Buy Terms',
          text: 'Input down payment, interest rate, loan term, and estimated resale value after the loan period.',
          url: getStepUrl('/lease-buy-calculator', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Compare Results',
          text: 'Review the total cost comparison and recommendation to see which option saves you more money.',
          url: getStepUrl('/lease-buy-calculator', 4),
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/lease-buy-calculator'),
      headline: 'Lease vs Buy Calculator - Complete Guide to Car Financing',
      description: 'Comprehensive guide to comparing leasing vs buying a car with cost analysis and decision factors.',
      author: {
        '@type': 'Organization',
        name: 'AICalculator.pro',
        url: getUrl('/'),
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
      dateModified: '2024-11-19',
      image: getOgImage('lease-buy'),
      articleBody: 'Deciding whether to lease or buy a car is one of the most important financial decisions car shoppers face...',
    },
  ],
};

export default function LeaseBuyCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <h1 className="sr-only">Lease vs Buy Calculator - Compare Car Leasing & Buying Costs</h1>
      
      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Lease vs Buy Calculator"
        calculatorUrl="/lease-buy-calculator"
      />

      <LeaseBuyCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lease vs Buy: Making the Right Decision</h2>
          <p className="text-gray-700 mb-4">
            Choosing between leasing and buying a car is a significant financial decision that affects your budget for years. Understanding the total costs, benefits, and drawbacks of each option helps you make an informed choice that aligns with your lifestyle and financial goals.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Cost Comparison Breakdown</h3>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Factor</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Leasing</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Buying</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Monthly Payment</td>
                  <td className="border border-gray-300 px-4 py-2">Lower ($300-$400)</td>
                  <td className="border border-gray-300 px-4 py-2">Higher ($500-$600)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Down Payment</td>
                  <td className="border border-gray-300 px-4 py-2">Lower ($0-$3,000)</td>
                  <td className="border border-gray-300 px-4 py-2">Higher ($3,000-$6,000)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Ownership</td>
                  <td className="border border-gray-300 px-4 py-2">No equity built</td>
                  <td className="border border-gray-300 px-4 py-2">Build equity, own asset</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Mileage</td>
                  <td className="border border-gray-300 px-4 py-2">10,000-15,000/year limit</td>
                  <td className="border border-gray-300 px-4 py-2">Unlimited</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Maintenance</td>
                  <td className="border border-gray-300 px-4 py-2">Covered by warranty</td>
                  <td className="border border-gray-300 px-4 py-2">Your responsibility</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">End of Term</td>
                  <td className="border border-gray-300 px-4 py-2">Return car, start over</td>
                  <td className="border border-gray-300 px-4 py-2">Own car, no payments</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">When Leasing Makes Sense</h3>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ <strong>Low annual mileage:</strong> Drive less than 12,000 miles per year</li>
              <li>✓ <strong>Want latest technology:</strong> Prefer new cars every 2-3 years</li>
              <li>✓ <strong>Lower upfront costs:</strong> Need minimal down payment</li>
              <li>✓ <strong>Business use:</strong> May qualify for tax deductions</li>
              <li>✓ <strong>Warranty coverage:</strong> Want maintenance included</li>
              <li>✓ <strong>Short-term need:</strong> Only need car for 2-4 years</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">When Buying Makes Sense</h3>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ <strong>High annual mileage:</strong> Drive more than 15,000 miles per year</li>
              <li>✓ <strong>Long-term ownership:</strong> Plan to keep car 5+ years</li>
              <li>✓ <strong>Build equity:</strong> Want to own an asset</li>
              <li>✓ <strong>Customization:</strong> Want to modify your vehicle</li>
              <li>✓ <strong>No restrictions:</strong> Don't want mileage or wear limits</li>
              <li>✓ <strong>Lower total cost:</strong> Save money over 7+ years</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Hidden Costs to Consider</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Leasing Hidden Costs</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Acquisition fee: $300-$1,000</li>
                <li>• Disposition fee: $300-$500</li>
                <li>• Excess mileage: $0.15-$0.30/mile</li>
                <li>• Wear and tear charges</li>
                <li>• Early termination penalty</li>
                <li>• Gap insurance requirement</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Buying Hidden Costs</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Sales tax: 5-10% of price</li>
                <li>• Registration fees: $50-$500/year</li>
                <li>• Depreciation: 15-25% first year</li>
                <li>• Maintenance after warranty</li>
                <li>• Repair costs as car ages</li>
                <li>• Resale hassle and costs</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Financial Impact Over Time</h3>
          <p className="text-gray-700 mb-4">
            <strong>Example: $30,000 vehicle over 10 years</strong>
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Leasing (3 leases):</strong></p>
              <p>• Total payments: $42,000 (3 × $14,000)</p>
              <p>• Equity at end: $0</p>
              <p className="font-semibold">Net cost: $42,000</p>
              
              <p className="pt-3 border-t border-purple-300"><strong>Buying (one purchase):</strong></p>
              <p>• Total payments: $35,000</p>
              <p>• Resale value after 10 years: $8,000</p>
              <p className="font-semibold">Net cost: $27,000</p>
              
              <p className="pt-3 border-t border-purple-300 text-green-700 font-bold">
                Buying saves: $15,000 over 10 years
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Tax Implications</h3>
          <p className="text-gray-700 mb-4">
            <strong>Business Use:</strong> If you use your vehicle for business, leasing may offer tax advantages. Lease payments are typically 100% deductible as a business expense, while buying only allows depreciation deductions (which are limited and spread over years). Consult a tax professional for your specific situation.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Personal Use:</strong> For personal use, there are no significant tax differences between leasing and buying. Sales tax applies to both (though calculated differently), and neither offers tax deductions for personal use.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Making Your Decision</h3>
          <p className="text-gray-700 mb-4">
            The right choice depends on your personal situation. Use our calculator to compare actual costs based on your specific terms. Consider not just the monthly payment, but the total cost over the time you'll have the vehicle, including all fees, maintenance, and potential resale value.
          </p>
          <p className="text-gray-700 mb-4">
            As a general rule: if you plan to keep the car less than 4 years and drive under 12,000 miles annually, leasing may be more convenient. If you plan to keep it 5+ years or drive over 15,000 miles annually, buying will likely save you money in the long run.
          </p>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/loan-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-900">Loan Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate loan payments</p>
          </a>
          <a href="/mortgage-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🏠</div>
            <h3 className="font-semibold text-gray-900">Mortgage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate mortgage payments</p>
          </a>
          <a href="/investment-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">Investment Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate investment returns</p>
          </a>
          <a href="/savings-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">💵</div>
            <h3 className="font-semibold text-gray-900">Savings Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate savings growth</p>
          </a>
        </div>
      </section>
    </div>
  );
}

