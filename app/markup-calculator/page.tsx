import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import MarkupCalculator from '@/components/Calculator/MarkupCalculator';

export const metadata: Metadata = {
  title: 'Markup Calculator - Calculate Markup Percentage, Cost & Selling Price | Free Business Tool',
  description: 'Free markup calculator to calculate markup percentage, cost, and selling price. Optimize pricing strategy, analyze profit margins, and make data-driven business decisions.',
  keywords: [
    'markup calculator',
    'markup percentage calculator',
    'cost calculator',
    'selling price calculator',
    'pricing calculator',
    'profit markup',
    'business markup',
    'retail markup',
    'wholesale markup',
    'markup vs margin',
    'pricing strategy',
    'cost analysis',
    'profit calculation',
    'business calculator',
    'pricing optimization',
    'markup formula',
    'retail pricing',
    'product pricing',
    'markup analysis',
    'business profitability'
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
    title: 'Free Markup Calculator - Calculate Markup Percentage & Optimize Pricing',
    description: 'Calculate markup percentage, cost, and selling price. Optimize your pricing strategy with our comprehensive markup analysis tool.',
    url: 'https://calculator-tools.com/markup-calculator',
    siteName: 'Calculator Tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://calculator-tools.com/images/markup-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Markup Calculator - Business Pricing Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Markup Calculator - Business Pricing Tool',
    description: 'Calculate markup percentage and optimize pricing strategy. Free business tool for retailers and entrepreneurs.',
    images: ['https://calculator-tools.com/images/markup-calculator-twitter.jpg'],
    creator: '@CalculatorTools',
  },
  alternates: {
    canonical: 'https://calculator-tools.com/markup-calculator',
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
      '@id': 'https://calculator-tools.com/markup-calculator#webapp',
      name: 'Markup Calculator',
      description: 'Professional markup calculator for calculating markup percentage, cost, and selling price with pricing optimization and competitive analysis.',
      url: 'https://calculator-tools.com/markup-calculator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Calculate markup percentage from cost and selling price',
        'Calculate selling price from cost and markup',
        'Calculate cost from selling price and markup',
        'Profit margin analysis',
        'Competitive pricing analysis',
        'Pricing optimization recommendations',
        'Multiple calculation methods',
        'Real-time calculations',
        'Business profitability insights',
        'Markup vs margin comparison',
        'Share calculation results',
        'Mobile-responsive design',
        'Professional business tool',
        'Free to use',
        'No registration required'
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://calculator-tools.com/markup-calculator#breadcrumb',
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
          name: 'Markup Calculator',
          item: 'https://calculator-tools.com/markup-calculator',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://calculator-tools.com/markup-calculator#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is markup and how is it calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Markup is the percentage added to the cost of a product to determine its selling price. The markup formula is: Markup % = (Selling Price - Cost) / Cost × 100. For example, if a product costs $100 and sells for $150, the markup is 50%.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between markup and margin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Markup is calculated based on cost, while margin is calculated based on selling price. Markup = (Price - Cost) / Cost × 100. Margin = (Price - Cost) / Price × 100. A 50% markup equals a 33.3% margin.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good markup percentage for retail?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Retail markup typically ranges from 50% to 100%, depending on the industry. Grocery stores often use 15-25% markup, while clothing retailers may use 100-300% markup. The key is balancing competitiveness with profitability.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I calculate selling price from cost and markup?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To calculate selling price: Selling Price = Cost × (1 + Markup% / 100). For example, if cost is $100 and markup is 50%, then Selling Price = $100 × (1 + 50/100) = $100 × 1.5 = $150.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use this calculator for wholesale pricing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, our markup calculator works for both retail and wholesale pricing. Wholesale markups are typically lower (20-50%) than retail markups, but the calculation method remains the same.',
          },
        },
        {
          '@type': 'Question',
          name: 'How often should I review my markup strategy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Review your markup strategy quarterly or when costs change significantly. Monitor competitor pricing, market conditions, and profit margins to ensure your markup remains competitive and profitable.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': 'https://calculator-tools.com/markup-calculator#howto',
      name: 'How to Calculate and Optimize Markup Percentage',
      description: 'Step-by-step guide to calculate markup and optimize pricing strategy',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Choose Calculation Method',
          text: 'Select what you want to calculate: selling price (from cost + markup), markup percentage (from cost + selling price), or cost (from selling price + markup).',
        },
        {
          '@type': 'HowToStep', 
          name: 'Enter Known Values',
          text: 'Input the values you know. For example, enter cost and desired markup percentage to calculate the selling price.',
        },
        {
          '@type': 'HowToStep',
          name: 'Review Results',
          text: 'Examine the calculated values including markup percentage, profit margin, and profit amount.',
        },
        {
          '@type': 'HowToStep',
          name: 'Analyze Competitiveness',
          text: 'Review the competitiveness and profitability analysis to understand if your markup is appropriate for your market.',
        },
        {
          '@type': 'HowToStep',
          name: 'Optimize Pricing Strategy',
          text: 'Use the recommendations to adjust your markup for optimal balance between competitiveness and profitability.',
        },
      ],
    },
  ],
};

export default function MarkupCalculatorPage() {
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
            {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Markup Calculator"
        calculatorUrl="/markup-calculator"
      />
          </div>
        </div>

        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Markup Calculator - Calculate Markup Percentage, Cost & Selling Price for Business Pricing
        </h1>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Markup Calculator
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate markup percentage, cost, and selling price with our comprehensive markup calculator. 
              Optimize your pricing strategy and analyze profit margins for better business decisions.
            </p>
          </div>

          <MarkupCalculator />
        </div>

        {/* Educational Content */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Complete Guide to Markup Calculation and Pricing Strategy
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Understanding Markup
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Markup is the amount added to the cost of a product to determine its selling price. 
                    It's typically expressed as a percentage of the cost and is crucial for business 
                    profitability and pricing strategy.
                  </p>
                  <p className="text-gray-700">
                    Our calculator helps you determine the optimal markup for your products by analyzing 
                    cost, selling price, and profit margins to ensure competitive yet profitable pricing.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Why Markup Matters
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Profitability:</strong> Ensures adequate profit margins</li>
                    <li>• <strong>Competitiveness:</strong> Balances profit with market pricing</li>
                    <li>• <strong>Cost Recovery:</strong> Covers all business expenses</li>
                    <li>• <strong>Growth Funding:</strong> Provides capital for business expansion</li>
                    <li>• <strong>Market Positioning:</strong> Reflects product value and quality</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Markup vs. Margin: Key Differences
              </h3>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-blue-900 mb-3">
                  Markup Calculation
                </h4>
                <p className="text-blue-800 mb-3">
                  <strong>Formula:</strong> Markup % = (Selling Price - Cost) ÷ Cost × 100
                </p>
                <p className="text-blue-700">
                  Markup is calculated based on the cost of the product. It tells you how much 
                  you're adding to the cost to determine the selling price. A 50% markup means 
                  you're adding 50% of the cost to determine the selling price.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-green-900 mb-3">
                  Margin Calculation
                </h4>
                <p className="text-green-800 mb-3">
                  <strong>Formula:</strong> Margin % = (Selling Price - Cost) ÷ Selling Price × 100
                </p>
                <p className="text-green-700">
                  Margin is calculated based on the selling price. It tells you what percentage 
                  of the selling price is profit. A 50% markup equals a 33.3% margin.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Industry-Specific Markup Guidelines
              </h3>

              <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Typical Markup Range</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Grocery/Food</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15-25%</td>
                      <td className="px-6 py-4 text-sm text-gray-500">High volume, low margin</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Electronics</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25-50%</td>
                      <td className="px-6 py-4 text-sm text-gray-500">Competitive market</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Clothing/Fashion</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">100-300%</td>
                      <td className="px-6 py-4 text-sm text-gray-500">Brand and style premium</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jewelry</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">200-400%</td>
                      <td className="px-6 py-4 text-sm text-gray-500">Luxury positioning</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Restaurants</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">200-400%</td>
                      <td className="px-6 py-4 text-sm text-gray-500">Covers labor and overhead</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Software/SaaS</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">500-1000%</td>
                      <td className="px-6 py-4 text-sm text-gray-500">High development costs</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Factors Affecting Markup Decisions
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Market Factors
                  </h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Competition Level:</strong> More competition = lower markup</li>
                    <li>• <strong>Market Demand:</strong> High demand allows higher markup</li>
                    <li>• <strong>Product Uniqueness:</strong> Unique products support premium pricing</li>
                    <li>• <strong>Customer Price Sensitivity:</strong> Luxury vs. budget markets</li>
                    <li>• <strong>Economic Conditions:</strong> Recession vs. growth periods</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Business Factors
                  </h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Operating Costs:</strong> Rent, labor, utilities coverage</li>
                    <li>• <strong>Volume Expectations:</strong> High volume = lower markup</li>
                    <li>• <strong>Brand Positioning:</strong> Premium vs. value positioning</li>
                    <li>• <strong>Inventory Turnover:</strong> Fast-moving vs. slow-moving items</li>
                    <li>• <strong>Payment Terms:</strong> Cash vs. credit considerations</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Markup Optimization Strategies
              </h3>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Dynamic Pricing Approach
                </h4>
                <p className="text-gray-700 mb-4">
                  Implement flexible markup strategies based on various factors:
                </p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Seasonal adjustments for demand fluctuations</li>
                  <li>• Volume-based pricing for bulk purchases</li>
                  <li>• Competitive response pricing</li>
                  <li>• New product introduction pricing</li>
                  <li>• Clearance and promotional pricing</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Cost-Plus Pricing Strategy
                </h4>
                <p className="text-gray-700 mb-4">
                  Ensure your markup covers all costs and desired profit:
                </p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Calculate total cost including overhead allocation</li>
                  <li>• Add desired profit margin percentage</li>
                  <li>• Consider market acceptance of final price</li>
                  <li>• Adjust markup based on competitive analysis</li>
                  <li>• Monitor and adjust based on performance</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Common Markup Mistakes to Avoid
              </h3>

              <div className="bg-red-50 p-6 rounded-lg mb-8">
                <ul className="text-red-800 space-y-3">
                  <li>• <strong>Ignoring All Costs:</strong> Not including overhead, labor, and hidden costs</li>
                  <li>• <strong>One-Size-Fits-All:</strong> Using same markup for all products</li>
                  <li>• <strong>Ignoring Competition:</strong> Not researching competitor pricing</li>
                  <li>• <strong>Static Pricing:</strong> Never adjusting markup based on market changes</li>
                  <li>• <strong>Margin Confusion:</strong> Confusing markup percentage with margin percentage</li>
                  <li>• <strong>Volume Ignorance:</strong> Not considering sales volume impact on profitability</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Using Our Markup Calculator Effectively
              </h3>

              <p className="text-gray-700 mb-6">
                Our markup calculator provides three calculation methods to help you make informed 
                pricing decisions based on the information you have available:
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cost + Markup → Price</h4>
                  <p className="text-sm text-gray-600">Calculate selling price from known cost and desired markup</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cost + Price → Markup</h4>
                  <p className="text-sm text-gray-600">Determine markup percentage from cost and selling price</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Price + Markup → Cost</h4>
                  <p className="text-sm text-gray-600">Calculate maximum cost from selling price and markup</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-900 mb-4">
                  Start Optimizing Your Pricing Strategy Today
                </h4>
                <p className="text-blue-800 mb-4">
                  Use our free markup calculator to analyze your pricing strategy, ensure adequate 
                  profit margins, and make data-driven pricing decisions. Whether you're a retailer, 
                  manufacturer, or service provider, understanding markup is essential for business success.
                </p>
                <p className="text-blue-700">
                  Experiment with different markup scenarios, compare profitability, and find the 
                  optimal balance between competitiveness and profitability for your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
