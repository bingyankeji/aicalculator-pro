import type { Metadata } from 'next';
import ProfitMarginCalculator from '@/components/Calculator/ProfitMarginCalculator';

export const metadata: Metadata = {
  title: 'Profit Margin Calculator - Calculate Gross, Operating & Net Margins | Free Business Tool',
  description: 'Free profit margin calculator to analyze gross margin, operating margin, and net profit margin. Compare with industry benchmarks, optimize pricing, and improve business profitability.',
  keywords: [
    'profit margin calculator',
    'gross margin calculator', 
    'net profit margin',
    'operating margin calculator',
    'business profitability',
    'pricing optimization',
    'markup calculator',
    'profit analysis',
    'business margins',
    'industry benchmarks',
    'cost analysis',
    'revenue optimization',
    'financial analysis',
    'business calculator',
    'profit planning',
    'margin analysis',
    'business metrics',
    'profitability calculator',
    'pricing strategy',
    'business performance'
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
    title: 'Free Profit Margin Calculator - Analyze Business Profitability',
    description: 'Calculate gross margin, operating margin, and net profit margin. Compare with industry benchmarks and get pricing optimization recommendations.',
    url: 'https://calculator-tools.com/profit-margin-calculator',
    siteName: 'Calculator Tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://calculator-tools.com/images/profit-margin-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Profit Margin Calculator - Business Profitability Analysis Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Profit Margin Calculator - Business Profitability Tool',
    description: 'Calculate and analyze profit margins with industry comparisons. Optimize pricing and improve business profitability.',
    images: ['https://calculator-tools.com/images/profit-margin-calculator-twitter.jpg'],
    creator: '@CalculatorTools',
  },
  alternates: {
    canonical: 'https://calculator-tools.com/profit-margin-calculator',
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
      '@id': 'https://calculator-tools.com/profit-margin-calculator#webapp',
      name: 'Profit Margin Calculator',
      description: 'Professional profit margin calculator for analyzing gross margin, operating margin, and net profit margin with industry benchmarks and pricing optimization.',
      url: 'https://calculator-tools.com/profit-margin-calculator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Calculate gross profit margin',
        'Calculate operating profit margin', 
        'Calculate net profit margin',
        'Industry benchmark comparison',
        'Pricing optimization recommendations',
        'Cost structure analysis',
        'Markup percentage calculation',
        'Business profitability assessment',
        'Multiple input methods (total vs per-unit)',
        'Save and compare scenarios',
        'Export analysis results',
        'Real-time calculations',
        'Mobile-responsive design',
        'Professional business insights',
        'Revenue impact analysis',
        'Performance ranking system'
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://calculator-tools.com/profit-margin-calculator#breadcrumb',
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
          name: 'Profit Margin Calculator',
          item: 'https://calculator-tools.com/profit-margin-calculator',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://calculator-tools.com/profit-margin-calculator#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is profit margin and how is it calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Profit margin is a profitability ratio that measures how much profit a company makes for every dollar of revenue. There are three main types: Gross Margin = (Revenue - Cost of Goods Sold) / Revenue × 100, Operating Margin = (Operating Income) / Revenue × 100, and Net Margin = (Net Income) / Revenue × 100.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good profit margin for my business?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Good profit margins vary by industry. Generally, gross margins of 50%+ are excellent, 30-50% are good, and below 30% may need improvement. Net margins of 20%+ are excellent, 10-20% are good, and 5-10% are average. Our calculator compares your margins with industry benchmarks.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I improve my profit margins?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can improve profit margins by: 1) Increasing prices strategically, 2) Reducing cost of goods sold through better suppliers or efficiency, 3) Optimizing operating expenses, 4) Improving product mix toward higher-margin items, 5) Increasing sales volume to spread fixed costs.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between markup and margin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Markup is the percentage added to cost to determine selling price: Markup = (Selling Price - Cost) / Cost × 100. Margin is the percentage of selling price that is profit: Margin = (Selling Price - Cost) / Selling Price × 100. A 50% markup equals a 33.3% margin.',
          },
        },
        {
          '@type': 'Question',
          name: 'Should I focus on gross margin or net margin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Both are important. Gross margin shows pricing power and product profitability, while net margin shows overall business efficiency. Focus on gross margin for pricing decisions and product strategy, and net margin for overall business health and operational efficiency.',
          },
        },
        {
          '@type': 'Question',
          name: 'How often should I calculate profit margins?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Calculate profit margins monthly for regular monitoring, quarterly for strategic reviews, and immediately when considering pricing changes or new products. Real-time monitoring helps identify trends and make timely adjustments to maintain profitability.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': 'https://calculator-tools.com/profit-margin-calculator#howto',
      name: 'How to Calculate and Analyze Profit Margins',
      description: 'Step-by-step guide to calculate profit margins and optimize business profitability',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Choose Input Method',
          text: 'Select between total amounts (revenue, costs) or per-unit calculations (price per unit, cost per unit, quantity sold).',
        },
        {
          '@type': 'HowToStep', 
          name: 'Enter Financial Data',
          text: 'Input your revenue, cost of goods sold, operating expenses, and other expenses. Select your industry for benchmark comparison.',
        },
        {
          '@type': 'HowToStep',
          name: 'Review Margin Analysis',
          text: 'Examine your gross margin, operating margin, and net margin. Compare with industry averages to assess performance.',
        },
        {
          '@type': 'HowToStep',
          name: 'Analyze Optimization Opportunities',
          text: 'Review pricing recommendations, cost structure analysis, and business insights to identify improvement areas.',
        },
        {
          '@type': 'HowToStep',
          name: 'Save and Compare Scenarios',
          text: 'Save different scenarios to compare pricing strategies, cost structures, or business models for optimal profitability.',
        },
      ],
    },
  ],
};

export default function ProfitMarginCalculatorPage() {
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
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2" itemProp="name">Profit Margin Calculator</span>
                    <meta itemProp="position" content="3" />
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Profit Margin Calculator - Calculate Gross, Operating & Net Margins with Industry Benchmarks
        </h1>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Profit Margin Calculator
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Analyze your business profitability with our comprehensive profit margin calculator. 
              Calculate gross, operating, and net margins, compare with industry benchmarks, 
              and get pricing optimization recommendations.
            </p>
          </div>

          <ProfitMarginCalculator />
        </div>

        {/* Educational Content */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Complete Guide to Profit Margin Analysis
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Understanding Profit Margins
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Profit margins are essential financial metrics that measure your business's profitability 
                    and efficiency. They show how much profit you generate from each dollar of revenue, 
                    helping you make informed pricing, cost management, and strategic decisions.
                  </p>
                  <p className="text-gray-700">
                    Our calculator analyzes three critical margin types: gross margin (product profitability), 
                    operating margin (operational efficiency), and net margin (overall business health).
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Why Margin Analysis Matters
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Pricing Strategy:</strong> Determine optimal pricing for profitability</li>
                    <li>• <strong>Cost Control:</strong> Identify areas for cost reduction</li>
                    <li>• <strong>Performance Tracking:</strong> Monitor business health over time</li>
                    <li>• <strong>Competitive Analysis:</strong> Compare with industry standards</li>
                    <li>• <strong>Investment Decisions:</strong> Evaluate product and market opportunities</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Types of Profit Margins Explained
              </h3>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-blue-900 mb-3">
                  1. Gross Profit Margin
                </h4>
                <p className="text-blue-800 mb-3">
                  <strong>Formula:</strong> (Revenue - Cost of Goods Sold) ÷ Revenue × 100
                </p>
                <p className="text-blue-700">
                  Gross margin measures the profitability of your core products or services before 
                  considering operating expenses. It reflects your pricing power and production efficiency. 
                  Higher gross margins indicate better pricing strategies and cost management.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-green-900 mb-3">
                  2. Operating Profit Margin
                </h4>
                <p className="text-green-800 mb-3">
                  <strong>Formula:</strong> (Operating Income) ÷ Revenue × 100
                </p>
                <p className="text-green-700">
                  Operating margin shows profitability after accounting for operating expenses like 
                  salaries, rent, and marketing. It measures how efficiently you run your business 
                  operations and control overhead costs.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-purple-900 mb-3">
                  3. Net Profit Margin
                </h4>
                <p className="text-purple-800 mb-3">
                  <strong>Formula:</strong> (Net Income) ÷ Revenue × 100
                </p>
                <p className="text-purple-700">
                  Net margin is the ultimate profitability measure, showing how much profit remains 
                  after all expenses, including taxes and interest. It's the most comprehensive 
                  indicator of business financial health.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Industry Benchmark Comparison
              </h3>

              <p className="text-gray-700 mb-6">
                Our calculator compares your margins with industry averages to help you understand 
                your competitive position. Here are typical margin ranges by industry:
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Typical Gross Margin</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Typical Net Margin</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Software/SaaS</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">75-85%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15-25%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Consulting</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">65-75%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10-20%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Restaurant</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">55-65%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3-10%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">E-commerce</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">35-45%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8-15%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Manufacturing</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30-40%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5-12%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Retail</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20-30%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2-8%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Strategies to Improve Profit Margins
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Increase Revenue
                  </h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Strategic Pricing:</strong> Implement value-based pricing</li>
                    <li>• <strong>Premium Products:</strong> Develop higher-margin offerings</li>
                    <li>• <strong>Upselling:</strong> Increase average order value</li>
                    <li>• <strong>Market Expansion:</strong> Enter new profitable segments</li>
                    <li>• <strong>Customer Retention:</strong> Focus on repeat business</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Reduce Costs
                  </h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Supplier Negotiation:</strong> Secure better terms</li>
                    <li>• <strong>Process Optimization:</strong> Improve operational efficiency</li>
                    <li>• <strong>Technology Automation:</strong> Reduce labor costs</li>
                    <li>• <strong>Inventory Management:</strong> Minimize carrying costs</li>
                    <li>• <strong>Overhead Reduction:</strong> Eliminate unnecessary expenses</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Advanced Margin Analysis Techniques
              </h3>

              <p className="text-gray-700 mb-6">
                Beyond basic margin calculations, advanced analysis techniques can provide deeper 
                insights into your business performance and optimization opportunities.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Margin Trend Analysis
                </h4>
                <p className="text-gray-700 mb-4">
                  Track margin changes over time to identify trends, seasonal patterns, and the 
                  impact of business decisions. Look for:
                </p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Monthly and quarterly margin trends</li>
                  <li>• Impact of pricing changes on margins</li>
                  <li>• Seasonal variations in profitability</li>
                  <li>• Product mix effects on overall margins</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Product-Level Margin Analysis
                </h4>
                <p className="text-gray-700 mb-4">
                  Analyze margins at the product or service level to optimize your portfolio:
                </p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Identify high and low-margin products</li>
                  <li>• Focus marketing on profitable items</li>
                  <li>• Consider discontinuing low-margin products</li>
                  <li>• Develop pricing strategies by product category</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Common Margin Analysis Mistakes to Avoid
              </h3>

              <div className="bg-red-50 p-6 rounded-lg mb-8">
                <ul className="text-red-800 space-y-3">
                  <li>• <strong>Ignoring Hidden Costs:</strong> Failing to account for all direct and indirect costs</li>
                  <li>• <strong>Static Analysis:</strong> Not tracking margin changes over time</li>
                  <li>• <strong>Industry Ignorance:</strong> Not comparing with industry benchmarks</li>
                  <li>• <strong>Volume Confusion:</strong> Focusing only on percentage without considering volume impact</li>
                  <li>• <strong>Short-term Focus:</strong> Making decisions based on short-term margin fluctuations</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Using Our Profit Margin Calculator
              </h3>

              <p className="text-gray-700 mb-6">
                Our comprehensive profit margin calculator provides professional-grade analysis 
                with features designed for business owners, managers, and financial professionals:
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Multi-Margin Analysis</h4>
                  <p className="text-sm text-gray-600">Calculate gross, operating, and net margins simultaneously</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Industry Benchmarks</h4>
                  <p className="text-sm text-gray-600">Compare your performance with industry standards</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Smart Recommendations</h4>
                  <p className="text-sm text-gray-600">Get actionable insights for margin improvement</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-900 mb-4">
                  Start Optimizing Your Profit Margins Today
                </h4>
                <p className="text-blue-800 mb-4">
                  Use our free profit margin calculator to analyze your business profitability, 
                  compare with industry benchmarks, and discover optimization opportunities. 
                  Whether you're a startup or established business, understanding your margins 
                  is crucial for sustainable growth and success.
                </p>
                <p className="text-blue-700">
                  Save different scenarios, compare pricing strategies, and make data-driven 
                  decisions to improve your bottom line. Start your margin analysis now!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
