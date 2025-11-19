import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import SalesTaxCalculator from '@/components/Calculator/SalesTaxCalculator';

export const metadata: Metadata = {
  title: 'Sales Tax Calculator (Free, No signup) - Tax Amount | AICalculator',
  description: 'Free sales tax calculator with no sign-up required. For all US states and major cities. Calculate sales tax, add or remove tax from prices, and get accurate tax rates for business compliance.',
  keywords: [
    'sales tax calculator',
    'free sales tax calculator',
    'sales tax calculator no signup',
    'state sales tax',
    'local sales tax',
    'tax calculator',
    'sales tax rate',
    'add sales tax',
    'remove sales tax',
    'tax compliance',
    'business tax calculator',
    'retail tax calculator',
    'ecommerce tax calculator',
    'city sales tax',
    'county sales tax',
    'tax rate lookup',
    'sales tax by state',
    'tax calculation tool',
    'point of sale tax',
    'merchant tax calculator',
    'tax inclusive pricing',
    'tax exclusive pricing'
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
    title: 'Sales Tax Calculator (Free, No signup) - AICalculator',
    description: 'Free sales tax calculator with no sign-up required. Calculate accurate sales tax for all US states and major cities. Essential tool for businesses, retailers, and ecommerce compliance.',
    url: 'https://calculator-tools.com/sales-tax-calculator',
    siteName: 'Calculator Tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://calculator-tools.com/images/sales-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Sales Tax Calculator - State and Local Tax Calculation Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sales Tax Calculator (Free, No signup) - AICalculator',
    description: 'Free sales tax calculator with no sign-up required. Calculate sales tax for any US state and major cities. Perfect for business compliance and pricing decisions.',
    images: ['https://calculator-tools.com/images/sales-tax-calculator-twitter.jpg'],
    creator: '@CalculatorTools',
  },
  alternates: {
    canonical: 'https://calculator-tools.com/sales-tax-calculator',
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
      '@id': 'https://calculator-tools.com/sales-tax-calculator#webapp',
      name: 'Sales Tax Calculator',
      description: 'Professional sales tax calculator for calculating state and local sales tax across all US states and major cities with current tax rates.',
      url: 'https://calculator-tools.com/sales-tax-calculator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Calculate sales tax for all 50 US states',
        'Local tax rates for major cities',
        'Add sales tax to prices',
        'Remove sales tax from totals',
        'Calculate tax amount only',
        'Current 2024 tax rates',
        'State and local tax breakdown',
        'No sales tax state identification',
        'Business compliance tool',
        'Retail and ecommerce support',
        'Tax-inclusive and tax-exclusive pricing',
        'Save results as image',
        'Mobile-responsive design',
        'Real-time calculations',
        'Tax rate lookup by location'
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://calculator-tools.com/sales-tax-calculator#breadcrumb',
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
          name: 'Sales Tax Calculator',
          item: 'https://calculator-tools.com/sales-tax-calculator',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://calculator-tools.com/sales-tax-calculator#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I calculate sales tax on a purchase?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To calculate sales tax, multiply the purchase price by the sales tax rate. For example, if an item costs $100 and the sales tax rate is 8.5%, the sales tax would be $100 × 0.085 = $8.50, making the total $108.50.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which states have no sales tax?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Five states have no statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. However, some of these states allow local jurisdictions to impose sales taxes.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between state and local sales tax?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'State sales tax is imposed by the state government and applies statewide. Local sales tax is additional tax imposed by cities, counties, or special districts. The total sales tax rate is the combination of state and local rates.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I remove sales tax from a total price?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To remove sales tax from a total price, divide the total by (1 + tax rate). For example, if the total is $108.50 and the tax rate is 8.5%, the pre-tax price is $108.50 ÷ 1.085 = $100.',
          },
        },
        {
          '@type': 'Question',
          name: 'What states have the highest sales tax rates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'States with the highest combined state and local sales tax rates include Tennessee (9.55%), Louisiana (9.52%), Arkansas (9.47%), Washington (9.23%), and Alabama (9.22%). However, rates vary significantly by city and county.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need to collect sales tax for online sales?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, since the 2018 South Dakota v. Wayfair Supreme Court decision, businesses must collect sales tax in states where they have economic nexus, typically defined as $100,000 in sales or 200+ transactions annually.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': 'https://calculator-tools.com/sales-tax-calculator#howto',
      name: 'How to Calculate Sales Tax for Any Purchase',
      description: 'Step-by-step guide to calculate sales tax using our calculator',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Choose Calculation Type',
          text: 'Select whether you want to add sales tax to a price, remove tax from a total, or calculate the tax amount only.',
        },
        {
          '@type': 'HowToStep',
          name: 'Enter the Price Amount',
          text: 'Input the price amount. If removing tax, enter the total price including tax. If adding tax, enter the pre-tax price.',
        },
        {
          '@type': 'HowToStep',
          name: 'Select State and City',
          text: 'Choose your state from the dropdown to get the current state sales tax rate. Select a city if available to include local taxes.',
        },
        {
          '@type': 'HowToStep',
          name: 'Review Tax Calculation',
          text: 'View the detailed breakdown showing state tax, local tax, total tax amount, and final price with complete tax information.',
        },
        {
          '@type': 'HowToStep',
          name: 'Save Your Results',
          text: 'Save your sales tax calculation as an image for your records or business documentation.',
        },
      ],
    },
  ],
};

export default function SalesTaxCalculatorPage() {
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
            {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Sales Tax Calculator (Free, No signup)"
        calculatorUrl="/sales-tax-calculator"
      />
          </div>
        </div>

        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Sales Tax Calculator - Calculate State & Local Sales Tax Rates for All US States
        </h1>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sales Tax Calculator
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate accurate sales tax for all US states and major cities. 
              Add or remove tax from prices, get current tax rates, and ensure 
              business compliance with our comprehensive tax calculator.
            </p>
          </div>

          <SalesTaxCalculator />
        </div>

        {/* Educational Content */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Complete Guide to Sales Tax Calculation and Compliance
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Understanding Sales Tax
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Sales tax is a consumption tax imposed by state and local governments on the sale 
                    of goods and services. The tax is typically collected by the retailer at the 
                    point of sale and remitted to the appropriate tax authority.
                  </p>
                  <p className="text-gray-700">
                    Our sales tax calculator provides current rates for all 50 US states and major 
                    cities, helping businesses ensure compliance and accurate pricing.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Key Sales Tax Components
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>State Sales Tax:</strong> Imposed by state governments</li>
                    <li>• <strong>Local Sales Tax:</strong> Additional tax by cities/counties</li>
                    <li>• <strong>Combined Rate:</strong> Total of state and local taxes</li>
                    <li>• <strong>Tax Base:</strong> The amount subject to taxation</li>
                    <li>• <strong>Exemptions:</strong> Items not subject to sales tax</li>
                    <li>• <strong>Use Tax:</strong> Tax on items purchased out-of-state</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Sales Tax Rates by State
              </h3>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-blue-900 mb-3">
                  No Sales Tax States
                </h4>
                <p className="text-blue-800 mb-4">
                  Five states have no statewide sales tax, though some allow local sales taxes:
                </p>
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <h5 className="font-semibold text-blue-900">Alaska</h5>
                    <p className="text-sm text-blue-700">0% state tax</p>
                    <p className="text-xs text-blue-600">Local taxes allowed</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <h5 className="font-semibold text-blue-900">Delaware</h5>
                    <p className="text-sm text-blue-700">0% state tax</p>
                    <p className="text-xs text-blue-600">No local taxes</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <h5 className="font-semibold text-blue-900">Montana</h5>
                    <p className="text-sm text-blue-700">0% state tax</p>
                    <p className="text-xs text-blue-600">Local taxes allowed</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <h5 className="font-semibold text-blue-900">New Hampshire</h5>
                    <p className="text-sm text-blue-700">0% state tax</p>
                    <p className="text-xs text-blue-600">No local taxes</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <h5 className="font-semibold text-blue-900">Oregon</h5>
                    <p className="text-sm text-blue-700">0% state tax</p>
                    <p className="text-xs text-blue-600">No local taxes</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-red-900 mb-4">
                    Highest Combined Tax Rates
                  </h4>
                  <p className="text-red-800 mb-3">
                    States with highest average combined state and local rates:
                  </p>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• <strong>Tennessee:</strong> 9.55% average</li>
                    <li>• <strong>Louisiana:</strong> 9.52% average</li>
                    <li>• <strong>Arkansas:</strong> 9.47% average</li>
                    <li>• <strong>Washington:</strong> 9.23% average</li>
                    <li>• <strong>Alabama:</strong> 9.22% average</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-green-900 mb-4">
                    Lowest State Tax Rates
                  </h4>
                  <p className="text-green-800 mb-3">
                    States with lowest statewide sales tax rates:
                  </p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• <strong>Colorado:</strong> 2.9% state rate</li>
                    <li>• <strong>Georgia:</strong> 4.0% state rate</li>
                    <li>• <strong>Hawaii:</strong> 4.0% state rate</li>
                    <li>• <strong>New York:</strong> 4.0% state rate</li>
                    <li>• <strong>Wyoming:</strong> 4.0% state rate</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Business Sales Tax Compliance
              </h3>

              <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-yellow-900 mb-3">
                  Economic Nexus Rules
                </h4>
                <p className="text-yellow-800 mb-4">
                  Since the 2018 South Dakota v. Wayfair Supreme Court decision, businesses must 
                  collect sales tax in states where they have economic nexus, typically defined as:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-yellow-900 mb-2">Common Thresholds</h5>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• $100,000 in annual sales, OR</li>
                      <li>• 200+ separate transactions</li>
                      <li>• Some states have different thresholds</li>
                      <li>• Rules vary by state</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-yellow-900 mb-2">Compliance Requirements</h5>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• Register for sales tax permit</li>
                      <li>• Collect appropriate tax rates</li>
                      <li>• File regular tax returns</li>
                      <li>• Remit collected taxes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Sales Tax Calculation Methods
              </h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Adding Sales Tax
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Formula:</strong> Price × (1 + Tax Rate)
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Example:</strong> $100 × (1 + 0.08) = $108
                  </p>
                  <p className="text-gray-600 text-xs">
                    Use when you have the pre-tax price and need the total
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Removing Sales Tax
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Formula:</strong> Total ÷ (1 + Tax Rate)
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Example:</strong> $108 ÷ (1 + 0.08) = $100
                  </p>
                  <p className="text-gray-600 text-xs">
                    Use when you have the total and need the pre-tax price
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Tax Amount Only
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Formula:</strong> Price × Tax Rate
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Example:</strong> $100 × 0.08 = $8
                  </p>
                  <p className="text-gray-600 text-xs">
                    Use when you only need the tax amount
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Special Sales Tax Considerations
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Tax-Exempt Items
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Many states exempt certain items from sales tax:
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Groceries and food items</li>
                    <li>• Prescription medications</li>
                    <li>• Medical devices and equipment</li>
                    <li>• Educational materials</li>
                    <li>• Clothing (in some states)</li>
                    <li>• Services (varies by state)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Digital Products & Services
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Tax treatment varies significantly:
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Software downloads</li>
                    <li>• Digital media and entertainment</li>
                    <li>• Cloud-based services</li>
                    <li>• Online subscriptions</li>
                    <li>• Professional services</li>
                    <li>• Consulting and advisory services</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-900 mb-4">
                  Start Calculating Sales Tax Today
                </h4>
                <p className="text-blue-800 mb-4">
                  Use our comprehensive sales tax calculator to ensure accurate pricing and 
                  compliance across all US states and major cities. Our calculator includes 
                  current tax rates and handles both simple and complex tax scenarios.
                </p>
                <p className="text-blue-700">
                  Whether you're a small business owner, retailer, or ecommerce seller, 
                  our sales tax calculator provides the accuracy and reliability you need 
                  for proper tax compliance and business operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
