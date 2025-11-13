import type { Metadata } from 'next';
import DepreciationCalculator from '@/components/Calculator/DepreciationCalculator';

export const metadata: Metadata = {
  title: 'Depreciation Calculator - Straight Line, Double Declining & Tax Savings | Free Tool',
  description: 'Free depreciation calculator with multiple methods: straight-line, double declining balance, sum of years digits, and units of production. Calculate tax savings and depreciation schedules.',
  keywords: [
    'depreciation calculator',
    'straight line depreciation',
    'double declining balance',
    'sum of years digits',
    'units of production depreciation',
    'depreciation schedule',
    'tax depreciation calculator',
    'asset depreciation',
    'depreciation methods',
    'tax savings calculator',
    'business depreciation',
    'accounting depreciation',
    'capital asset depreciation',
    'depreciation expense',
    'tax deduction calculator',
    'asset management',
    'depreciation comparison',
    'accelerated depreciation',
    'depreciation analysis',
    'business tax calculator'
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
    title: 'Free Depreciation Calculator - All Methods & Tax Savings',
    description: 'Calculate depreciation using straight-line, double declining, and other methods. Generate schedules and analyze tax savings for business assets.',
    url: 'https://calculator-tools.com/depreciation-calculator',
    siteName: 'Calculator Tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://calculator-tools.com/images/depreciation-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Depreciation Calculator - Asset Depreciation and Tax Savings Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Depreciation Calculator - All Methods',
    description: 'Calculate asset depreciation with multiple methods. Generate schedules and analyze tax savings for business planning.',
    images: ['https://calculator-tools.com/images/depreciation-calculator-twitter.jpg'],
    creator: '@CalculatorTools',
  },
  alternates: {
    canonical: 'https://calculator-tools.com/depreciation-calculator',
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
      '@id': 'https://calculator-tools.com/depreciation-calculator#webapp',
      name: 'Depreciation Calculator',
      description: 'Professional depreciation calculator supporting multiple methods including straight-line, double declining balance, sum of years digits, and units of production with tax savings analysis.',
      url: 'https://calculator-tools.com/depreciation-calculator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Straight-line depreciation calculation',
        'Double declining balance method',
        'Sum of years digits depreciation',
        'Units of production method',
        'Complete depreciation schedules',
        'Tax savings analysis',
        'Asset category classification',
        'Method comparison recommendations',
        'Annual and cumulative depreciation',
        'Salvage value considerations',
        'Business tax planning',
        'Save results as image',
        'Mobile-responsive design',
        'Real-time calculations',
        'Professional accounting standards'
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://calculator-tools.com/depreciation-calculator#breadcrumb',
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
          name: 'Depreciation Calculator',
          item: 'https://calculator-tools.com/depreciation-calculator',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://calculator-tools.com/depreciation-calculator#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is depreciation and why is it important?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Depreciation is the allocation of an asset\'s cost over its useful life. It\'s important for accurate financial reporting, tax deductions, and understanding the true cost of business operations. Depreciation reduces taxable income and provides cash flow benefits.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the different depreciation methods?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The main depreciation methods are: 1) Straight-line (equal annual amounts), 2) Double declining balance (accelerated), 3) Sum of years digits (accelerated with declining rate), and 4) Units of production (based on usage). Each method has different tax and cash flow implications.',
          },
        },
        {
          '@type': 'Question',
          name: 'When should I use accelerated depreciation methods?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use accelerated depreciation when you want higher tax deductions in early years, have strong current cash flow needs, or own assets that lose value quickly (like technology). Accelerated methods provide larger upfront tax savings but smaller deductions in later years.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I determine an asset\'s useful life and salvage value?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Useful life is based on IRS guidelines, manufacturer specifications, and business experience. Common useful lives: computers (3-5 years), vehicles (5 years), equipment (5-7 years), buildings (27.5-39 years). Salvage value is the estimated value at the end of useful life.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the tax benefits of depreciation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Depreciation reduces taxable income, creating tax savings equal to depreciation expense times your tax rate. For example, $10,000 depreciation at a 25% tax rate saves $2,500 in taxes. These savings improve cash flow and investment returns.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I change depreciation methods after starting?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Generally, you cannot change depreciation methods without IRS approval. You must be consistent with the method chosen in the first year. However, you can use different methods for different assets and for book vs. tax purposes (with proper reconciliation).',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': 'https://calculator-tools.com/depreciation-calculator#howto',
      name: 'How to Calculate Asset Depreciation and Tax Savings',
      description: 'Step-by-step guide to calculate depreciation using different methods and analyze tax benefits',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Enter Asset Information',
          text: 'Input the asset cost, salvage value, and useful life. The asset cost is the total purchase price including setup costs. Salvage value is the estimated value at the end of useful life.',
        },
        {
          '@type': 'HowToStep',
          name: 'Select Depreciation Method',
          text: 'Choose from straight-line, double declining balance, sum of years digits, or units of production. Consider your cash flow needs and tax strategy when selecting the method.',
        },
        {
          '@type': 'HowToStep',
          name: 'Set Tax Rate',
          text: 'Enter your business tax rate to calculate tax savings. This should include federal, state, and local tax rates that apply to your business income.',
        },
        {
          '@type': 'HowToStep',
          name: 'Review Depreciation Schedule',
          text: 'Examine the year-by-year depreciation schedule showing annual depreciation, accumulated depreciation, and tax savings for each period.',
        },
        {
          '@type': 'HowToStep',
          name: 'Analyze Results',
          text: 'Compare total tax savings, cash flow timing, and method recommendations to optimize your depreciation strategy for tax and financial planning.',
        },
      ],
    },
  ],
};

export default function DepreciationCalculatorPage() {
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
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2" itemProp="name">Depreciation Calculator</span>
                    <meta itemProp="position" content="3" />
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Depreciation Calculator - Calculate Asset Depreciation with Multiple Methods and Tax Savings Analysis
        </h1>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Depreciation Calculator
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate asset depreciation using multiple methods including straight-line, 
              double declining balance, and sum of years digits. Analyze tax savings and 
              generate complete depreciation schedules.
            </p>
          </div>

          <DepreciationCalculator />
        </div>

        {/* Educational Content */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Complete Guide to Asset Depreciation and Tax Planning
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Understanding Depreciation
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Depreciation is the systematic allocation of an asset's cost over its useful life. 
                    It reflects the decline in value due to wear, tear, and obsolescence, providing 
                    a more accurate picture of business expenses and profitability.
                  </p>
                  <p className="text-gray-700">
                    Our calculator supports all major depreciation methods, helping you choose the 
                    optimal approach for tax planning and financial reporting.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Key Depreciation Concepts
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Asset Cost:</strong> Total purchase price plus setup costs</li>
                    <li>• <strong>Salvage Value:</strong> Estimated value at end of useful life</li>
                    <li>• <strong>Useful Life:</strong> Expected years of productive use</li>
                    <li>• <strong>Depreciable Base:</strong> Cost minus salvage value</li>
                    <li>• <strong>Annual Depreciation:</strong> Yearly depreciation expense</li>
                    <li>• <strong>Accumulated Depreciation:</strong> Total depreciation to date</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Depreciation Methods Comparison
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-blue-900 mb-3">
                    Straight-Line Method
                  </h4>
                  <p className="text-blue-800 mb-3">
                    <strong>Formula:</strong> (Cost - Salvage Value) ÷ Useful Life
                  </p>
                  <div className="text-blue-700 text-sm space-y-1">
                    <p><strong>Advantages:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Simple and easy to calculate</li>
                      <li>Predictable annual expenses</li>
                      <li>Good for assets with steady usage</li>
                      <li>Matches revenue and expenses well</li>
                    </ul>
                    <p className="mt-2"><strong>Best for:</strong> Buildings, furniture, equipment with consistent use</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-green-900 mb-3">
                    Double Declining Balance
                  </h4>
                  <p className="text-green-800 mb-3">
                    <strong>Formula:</strong> Book Value × (2 ÷ Useful Life)
                  </p>
                  <div className="text-green-700 text-sm space-y-1">
                    <p><strong>Advantages:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Higher early-year deductions</li>
                      <li>Better tax benefits upfront</li>
                      <li>Matches rapid value decline</li>
                      <li>Improves early cash flow</li>
                    </ul>
                    <p className="mt-2"><strong>Best for:</strong> Technology, vehicles, equipment that loses value quickly</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-purple-900 mb-3">
                    Sum of Years Digits
                  </h4>
                  <p className="text-purple-800 mb-3">
                    <strong>Formula:</strong> (Remaining Life ÷ Sum of Years) × Depreciable Base
                  </p>
                  <div className="text-purple-700 text-sm space-y-1">
                    <p><strong>Advantages:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Accelerated but declining rate</li>
                      <li>More gradual than double declining</li>
                      <li>Good compromise method</li>
                      <li>Reaches salvage value exactly</li>
                    </ul>
                    <p className="mt-2"><strong>Best for:</strong> Assets with moderate acceleration needs</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-orange-900 mb-3">
                    Units of Production
                  </h4>
                  <p className="text-orange-800 mb-3">
                    <strong>Formula:</strong> (Units Produced ÷ Total Units) × Depreciable Base
                  </p>
                  <div className="text-orange-700 text-sm space-y-1">
                    <p><strong>Advantages:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Matches usage with expense</li>
                      <li>Variable based on production</li>
                      <li>Most accurate for some assets</li>
                      <li>Reflects actual wear and tear</li>
                    </ul>
                    <p className="mt-2"><strong>Best for:</strong> Manufacturing equipment, vehicles by mileage</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Tax Implications and Strategy
              </h3>

              <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-yellow-900 mb-3">
                  Section 179 and Bonus Depreciation
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-yellow-900 mb-2">Section 179 Deduction</h5>
                    <ul className="text-yellow-800 text-sm space-y-1">
                      <li>• Immediate expensing up to $1.16M (2023)</li>
                      <li>• Phase-out begins at $2.89M in purchases</li>
                      <li>• Limited to business income</li>
                      <li>• Applies to equipment, not buildings</li>
                      <li>• Must be used 50%+ for business</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-yellow-900 mb-2">Bonus Depreciation</h5>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• 80% immediate deduction (2023)</li>
                      <li>• Phases down 20% per year until 2027</li>
                      <li>• No income limitation</li>
                      <li>• Applies to new and used property</li>
                      <li>• Can combine with Section 179</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    MACRS System
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Modified Accelerated Cost Recovery System used for tax purposes
                  </p>
                  <ul className="text-gray-600 text-xs space-y-1">
                    <li>• 3, 5, 7, 10, 15, 20-year classes</li>
                    <li>• Half-year convention</li>
                    <li>• 200% or 150% declining balance</li>
                    <li>• Switches to straight-line when beneficial</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Book vs. Tax Depreciation
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Different methods for financial reporting vs. tax returns
                  </p>
                  <ul className="text-gray-600 text-xs space-y-1">
                    <li>• Book: Straight-line often preferred</li>
                    <li>• Tax: Accelerated methods for benefits</li>
                    <li>• Temporary differences</li>
                    <li>• Deferred tax considerations</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Asset Categories
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Common useful lives for different asset types
                  </p>
                  <ul className="text-gray-600 text-xs space-y-1">
                    <li>• Computers: 3-5 years</li>
                    <li>• Vehicles: 5 years</li>
                    <li>• Equipment: 5-7 years</li>
                    <li>• Buildings: 27.5-39 years</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Depreciation Planning Strategies
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Cash Flow Optimization
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Choose depreciation methods based on your cash flow needs:
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• <strong>Need early cash flow:</strong> Use accelerated methods</li>
                    <li>• <strong>Stable income:</strong> Straight-line provides consistency</li>
                    <li>• <strong>Variable production:</strong> Units of production matches costs</li>
                    <li>• <strong>High tax years:</strong> Maximize current deductions</li>
                    <li>• <strong>Future growth:</strong> Consider timing of tax benefits</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Record Keeping Requirements
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Maintain proper documentation for depreciation:
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Purchase invoices and contracts</li>
                    <li>• Installation and setup costs</li>
                    <li>• Asset placement in service dates</li>
                    <li>• Business use percentages</li>
                    <li>• Depreciation method elections</li>
                    <li>• Annual depreciation schedules</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-900 mb-4">
                  Start Optimizing Your Depreciation Strategy
                </h4>
                <p className="text-blue-800 mb-4">
                  Use our comprehensive depreciation calculator to analyze different methods and 
                  their tax implications. Make informed decisions about asset purchases and 
                  depreciation strategies to optimize your business tax planning.
                </p>
                <p className="text-blue-700">
                  Whether you're a small business owner, accountant, or financial planner, 
                  our calculator provides the analysis you need to maximize tax benefits 
                  while maintaining accurate financial records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
