import type { Metadata } from 'next';
import CashFlowCalculator from '@/components/Calculator/CashFlowCalculator';

export const metadata: Metadata = {
  title: 'Cash Flow Calculator - NPV, IRR & Investment Analysis | Free Financial Tool',
  description: 'Free cash flow calculator for investment analysis. Calculate NPV, IRR, payback period, and profitability index. Make informed investment decisions with detailed cash flow projections.',
  keywords: [
    'cash flow calculator',
    'npv calculator',
    'irr calculator',
    'investment calculator',
    'payback period calculator',
    'profitability index calculator',
    'discounted cash flow',
    'net present value calculator',
    'internal rate of return',
    'investment analysis',
    'financial modeling',
    'capital budgeting',
    'project evaluation',
    'investment appraisal',
    'dcf calculator',
    'business valuation',
    'financial planning',
    'investment decision',
    'cash flow analysis',
    'roi calculator'
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
    title: 'Free Cash Flow Calculator - NPV & IRR Analysis',
    description: 'Calculate NPV, IRR, and payback period for investment decisions. Professional cash flow analysis with detailed projections and recommendations.',
    url: 'https://calculator-tools.com/cash-flow-calculator',
    siteName: 'Calculator Tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://calculator-tools.com/images/cash-flow-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Cash Flow Calculator - NPV and IRR Investment Analysis Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Cash Flow Calculator - Investment Analysis',
    description: 'Calculate NPV, IRR, and payback period. Professional investment analysis with detailed cash flow projections.',
    images: ['https://calculator-tools.com/images/cash-flow-calculator-twitter.jpg'],
    creator: '@CalculatorTools',
  },
  alternates: {
    canonical: 'https://calculator-tools.com/cash-flow-calculator',
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
      '@id': 'https://calculator-tools.com/cash-flow-calculator#webapp',
      name: 'Cash Flow Calculator',
      description: 'Professional cash flow calculator for investment analysis with NPV, IRR, payback period, and profitability index calculations for informed investment decisions.',
      url: 'https://calculator-tools.com/cash-flow-calculator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Calculate Net Present Value (NPV)',
        'Calculate Internal Rate of Return (IRR)',
        'Determine payback period',
        'Calculate profitability index',
        'Multi-period cash flow analysis',
        'Investment grade assessment',
        'Risk level evaluation',
        'Cumulative cash flow tracking',
        'Period-by-period breakdown',
        'Investment recommendations',
        'Discount rate sensitivity',
        'Save results as image',
        'Mobile-responsive design',
        'Real-time calculations',
        'Professional financial modeling'
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://calculator-tools.com/cash-flow-calculator#breadcrumb',
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
          name: 'Cash Flow Calculator',
          item: 'https://calculator-tools.com/cash-flow-calculator',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://calculator-tools.com/cash-flow-calculator#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Net Present Value (NPV) and how is it calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Net Present Value (NPV) is the difference between the present value of cash inflows and outflows over time. It\'s calculated by discounting future cash flows to present value using a discount rate, then subtracting the initial investment. A positive NPV indicates a profitable investment.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you calculate Internal Rate of Return (IRR)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'IRR is the discount rate that makes the NPV of an investment equal to zero. It\'s calculated iteratively using numerical methods. IRR represents the expected annual rate of return from the investment. If IRR exceeds your required rate of return, the investment is attractive.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good payback period for an investment?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A good payback period depends on the industry and risk level. Generally, shorter payback periods (2-4 years) are preferred for lower-risk investments, while longer periods (5-7 years) may be acceptable for higher-return investments. Compare with industry benchmarks and company policies.',
          },
        },
        {
          '@type': 'Question',
          name: 'What discount rate should I use for NPV calculations?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The discount rate should reflect the risk of the investment and your cost of capital. Common approaches include using the Weighted Average Cost of Capital (WACC), required rate of return, or risk-free rate plus risk premium. Typical rates range from 8-15% for most business investments.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is profitability index and how is it interpreted?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Profitability Index (PI) is the ratio of present value of cash inflows to initial investment. PI = (NPV + Initial Investment) / Initial Investment. A PI greater than 1.0 indicates a profitable investment. Higher PI values suggest better investment opportunities.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I interpret cash flow analysis results?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Positive NPV and IRR above discount rate indicate good investments. Short payback periods reduce risk. Consider all metrics together: NPV shows absolute value creation, IRR shows percentage return, payback shows risk, and PI helps compare different-sized investments.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': 'https://calculator-tools.com/cash-flow-calculator#howto',
      name: 'How to Perform Cash Flow Analysis for Investment Decisions',
      description: 'Step-by-step guide to analyze investment cash flows using NPV, IRR, and payback period',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Enter Initial Investment',
          text: 'Input the total upfront cost of the investment, including purchase price, setup costs, and any immediate expenses required to start the project.',
        },
        {
          '@type': 'HowToStep',
          name: 'Set Discount Rate',
          text: 'Enter your required rate of return or cost of capital. This should reflect the risk of the investment and alternative investment opportunities.',
        },
        {
          '@type': 'HowToStep',
          name: 'Input Cash Flow Projections',
          text: 'Enter expected cash flows for each period (typically years). Include all relevant inflows and outflows, considering revenue, expenses, taxes, and terminal value.',
        },
        {
          '@type': 'HowToStep',
          name: 'Review Analysis Results',
          text: 'Examine NPV, IRR, payback period, and profitability index. Consider the investment grade and risk assessment provided by the calculator.',
        },
        {
          '@type': 'HowToStep',
          name: 'Make Investment Decision',
          text: 'Use the comprehensive analysis to make an informed decision. Positive NPV and IRR above discount rate generally indicate attractive investments.',
        },
      ],
    },
  ],
};

export default function CashFlowCalculatorPage() {
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
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2" itemProp="name">Cash Flow Calculator</span>
                    <meta itemProp="position" content="3" />
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Cash Flow Calculator - NPV, IRR & Investment Analysis Tool for Financial Decision Making
        </h1>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cash Flow Calculator
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Analyze investment opportunities with professional cash flow analysis. 
              Calculate NPV, IRR, payback period, and profitability index to make 
              informed investment decisions.
            </p>
          </div>

          <CashFlowCalculator />
        </div>

        {/* Educational Content */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Complete Guide to Cash Flow Analysis and Investment Evaluation
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Understanding Cash Flow Analysis
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Cash flow analysis is the foundation of investment decision-making. It evaluates 
                    the timing and magnitude of cash inflows and outflows to determine an investment's 
                    profitability and risk profile.
                  </p>
                  <p className="text-gray-700">
                    Our calculator uses advanced financial modeling techniques to provide comprehensive 
                    investment analysis, helping you make informed decisions based on quantitative metrics.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Key Financial Metrics
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>NPV:</strong> Net Present Value - absolute value creation</li>
                    <li>• <strong>IRR:</strong> Internal Rate of Return - percentage return</li>
                    <li>• <strong>Payback Period:</strong> Time to recover investment</li>
                    <li>• <strong>Profitability Index:</strong> Return per dollar invested</li>
                    <li>• <strong>Discount Rate:</strong> Required rate of return</li>
                    <li>• <strong>Risk Assessment:</strong> Investment grade evaluation</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Investment Decision Framework
              </h3>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-blue-900 mb-3">
                  NPV Decision Rule
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded border border-blue-200">
                    <h5 className="font-semibold text-green-900">NPV &gt; 0</h5>
                    <p className="text-sm text-green-700">Accept the investment</p>
                    <p className="text-xs text-green-600">Creates value for investors</p>
                  </div>
                  <div className="bg-white p-4 rounded border border-blue-200">
                    <h5 className="font-semibold text-yellow-900">NPV = 0</h5>
                    <p className="text-sm text-yellow-700">Indifferent decision</p>
                    <p className="text-xs text-yellow-600">Breaks even at discount rate</p>
                  </div>
                  <div className="bg-white p-4 rounded border border-blue-200">
                    <h5 className="font-semibold text-red-900">NPV &lt; 0</h5>
                    <p className="text-sm text-red-700">Reject the investment</p>
                    <p className="text-xs text-red-600">Destroys shareholder value</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-green-900 mb-4">
                    IRR Interpretation
                  </h4>
                  <p className="text-green-800 mb-3">
                    Internal Rate of Return represents the discount rate at which NPV equals zero:
                  </p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• <strong>IRR &gt; Discount Rate:</strong> Accept investment</li>
                    <li>• <strong>IRR = Discount Rate:</strong> Indifferent</li>
                    <li>• <strong>IRR &lt; Discount Rate:</strong> Reject investment</li>
                    <li>• Higher IRR indicates better returns</li>
                    <li>• Compare IRR with cost of capital</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-purple-900 mb-4">
                    Payback Period Analysis
                  </h4>
                  <p className="text-purple-800 mb-3">
                    Time required to recover the initial investment:
                  </p>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• <strong>Shorter periods:</strong> Lower risk, faster recovery</li>
                    <li>• <strong>Industry benchmarks:</strong> Compare with standards</li>
                    <li>• <strong>Liquidity consideration:</strong> Cash flow timing</li>
                    <li>• Doesn't consider time value of money</li>
                    <li>• Use alongside NPV and IRR</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Discount Rate Selection Guide
              </h3>

              <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-yellow-900 mb-3">
                  Choosing the Right Discount Rate
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-yellow-900 mb-2">Common Approaches</h5>
                    <ul className="text-yellow-800 text-sm space-y-1">
                      <li>• <strong>WACC:</strong> Weighted Average Cost of Capital</li>
                      <li>• <strong>CAPM:</strong> Capital Asset Pricing Model</li>
                      <li>• <strong>Risk-Free Rate + Premium:</strong> Treasury + Risk</li>
                      <li>• <strong>Hurdle Rate:</strong> Company minimum return</li>
                      <li>• <strong>Opportunity Cost:</strong> Best alternative return</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-yellow-900 mb-2">Typical Ranges</h5>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• <strong>Low Risk:</strong> 6-10% (bonds, utilities)</li>
                      <li>• <strong>Medium Risk:</strong> 10-15% (established business)</li>
                      <li>• <strong>High Risk:</strong> 15-25% (startups, new markets)</li>
                      <li>• <strong>Venture Capital:</strong> 25-40% (early stage)</li>
                      <li>• Adjust for inflation and country risk</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Advanced Cash Flow Considerations
              </h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Tax Implications
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Consider after-tax cash flows for accurate analysis
                  </p>
                  <ul className="text-gray-600 text-xs space-y-1">
                    <li>• Depreciation tax shields</li>
                    <li>• Capital gains treatment</li>
                    <li>• Operating income taxes</li>
                    <li>• Tax timing differences</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Inflation Effects
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Adjust for purchasing power changes
                  </p>
                  <ul className="text-gray-600 text-xs space-y-1">
                    <li>• Real vs nominal rates</li>
                    <li>• Inflation-adjusted cash flows</li>
                    <li>• Price escalation factors</li>
                    <li>• Cost inflation impacts</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Terminal Value
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Value beyond explicit forecast period
                  </p>
                  <ul className="text-gray-600 text-xs space-y-1">
                    <li>• Perpetual growth method</li>
                    <li>• Exit multiple approach</li>
                    <li>• Salvage value estimation</li>
                    <li>• Long-term assumptions</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Investment Analysis Best Practices
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Sensitivity Analysis
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Test how changes in key variables affect investment returns:
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Revenue growth rate variations</li>
                    <li>• Cost structure changes</li>
                    <li>• Discount rate sensitivity</li>
                    <li>• Market condition scenarios</li>
                    <li>• Timing assumption impacts</li>
                    <li>• Break-even analysis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Risk Assessment
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Evaluate investment risks comprehensively:
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Market and competitive risks</li>
                    <li>• Operational and execution risks</li>
                    <li>• Financial and liquidity risks</li>
                    <li>• Regulatory and legal risks</li>
                    <li>• Technology and obsolescence risks</li>
                    <li>• Macroeconomic factors</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-900 mb-4">
                  Start Your Investment Analysis Today
                </h4>
                <p className="text-blue-800 mb-4">
                  Use our comprehensive cash flow calculator to evaluate investment opportunities 
                  with professional-grade financial analysis. Make informed decisions based on 
                  NPV, IRR, payback period, and profitability index calculations.
                </p>
                <p className="text-blue-700">
                  Whether you're evaluating business investments, real estate opportunities, 
                  or capital projects, our calculator provides the analytical framework you need 
                  for confident investment decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
