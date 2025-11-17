import type { Metadata } from "next";
import PresentValueCalculator from "@/components/Calculator/PresentValueCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Present Value Calculator - NPV Analysis & Investment Decision Tool | AI Calculator",
  description:
    "Free present value calculator with NPV analysis and investment decision support. Calculate PV of single amounts, annuities, and cash flows with detailed financial analysis and recommendations.",
  keywords: [
    "present value calculator",
    "NPV calculator",
    "net present value calculator",
    "discounted cash flow calculator",
    "investment analysis tool",
    "present value formula",
    "annuity present value",
    "cash flow analysis",
    "discount rate calculator",
    "profitability index calculator",
    "investment decision tool",
    "financial calculator",
    "time value of money",
    "DCF calculator",
    "bond valuation calculator",
    "project evaluation tool",
  ],
  openGraph: {
    title: "Present Value Calculator - NPV Analysis & Investment Decisions",
    description:
      "Calculate present value and NPV with investment decision support. Analyze single amounts, annuities, and cash flows with detailed financial recommendations.",
    type: "website",
    url: "https://aicalculator.pro/present-value-calculator",
    siteName: "AI Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Present Value Calculator - Investment Analysis Tool",
    description:
      "Free NPV calculator with investment decision support. Analyze present value and make informed investment decisions.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.pro/present-value-calculator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Present Value Calculator",
      "url": "https://aicalculator.pro/present-value-calculator",
      "description": "Advanced present value calculator with NPV analysis and investment decision support. Calculate PV of single amounts, annuities, and cash flows with detailed financial analysis, profitability index, and investment recommendations.",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Calculate present value of single future amounts",
        "Annuity present value calculations",
        "Multi-period cash flow analysis",
        "Net Present Value (NPV) analysis",
        "Profitability Index calculations",
        "Investment decision recommendations",
        "Risk assessment and analysis",
        "Save and compare multiple scenarios",
        "Detailed cash flow breakdowns",
        "Discount factor calculations",
        "Investment project evaluation",
        "Bond valuation analysis",
        "Real-time calculation updates",
        "Export and share analysis results"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://aicalculator.pro"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Financial",
          "item": "https://aicalculator.pro/financial"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Present Value Calculator",
          "item": "https://aicalculator.pro/present-value-calculator"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is present value and how is it calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Present value (PV) is the current worth of a future sum of money or stream of cash flows given a specified rate of return (discount rate). For a single amount: PV = FV / (1 + r)^n. For annuities: PV = PMT × [(1 - (1 + r)^-n) / r]. Where FV is future value, PMT is payment, r is discount rate, and n is number of periods."
          }
        },
        {
          "@type": "Question",
          "name": "What is NPV and why is it important for investment decisions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Net Present Value (NPV) is the difference between the present value of cash inflows and outflows over a period of time. NPV = Sum of (Cash Flow / (1 + r)^t) - Initial Investment. A positive NPV indicates the investment will generate value, while a negative NPV suggests it will destroy value. NPV is crucial for comparing investment opportunities and making informed financial decisions."
          }
        },
        {
          "@type": "Question",
          "name": "How do I choose the right discount rate for present value calculations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The discount rate should reflect the required rate of return or cost of capital. Common approaches include: using the risk-free rate plus a risk premium, the company's weighted average cost of capital (WACC), or the expected return of alternative investments with similar risk. Higher risk investments require higher discount rates, which result in lower present values."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between present value and net present value?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Present Value (PV) is the current worth of future cash flows discounted at a specific rate. Net Present Value (NPV) is PV minus the initial investment or cost. PV tells you what future cash flows are worth today, while NPV tells you whether an investment will create or destroy value after accounting for the initial cost."
          }
        },
        {
          "@type": "Question",
          "name": "How does the profitability index help in investment decisions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Profitability Index (PI) is the ratio of present value of future cash flows to the initial investment (PI = PV of Cash Flows / Initial Investment). A PI greater than 1.0 indicates a profitable investment. PI is particularly useful when comparing projects of different sizes or when capital is limited, as it shows the value created per dollar invested."
          }
        },
        {
          "@type": "Question",
          "name": "When should I use present value analysis in business decisions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Present value analysis is essential for: evaluating investment projects, comparing different investment opportunities, valuing bonds and other securities, making lease vs. buy decisions, planning retirement savings, evaluating loan terms, and any situation where you need to compare money received or paid at different times. It's fundamental to capital budgeting and financial planning."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Calculate Present Value and Make Investment Decisions",
      "description": "Step-by-step guide to calculate present value and analyze investment opportunities",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Choose Analysis Type",
          "text": "Select the appropriate analysis type: Single Present Value for one future amount, Annuity Present Value for regular payments, or Cash Flow Analysis for multiple irregular payments."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Set Discount Rate",
          "text": "Determine the appropriate discount rate based on the risk level, cost of capital, or required rate of return. This rate reflects the time value of money and investment risk."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Input Cash Flow Data",
          "text": "Enter the future cash flows, payment amounts, or single future value depending on your analysis type. Include the time periods for each cash flow."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Enable NPV Analysis",
          "text": "For investment decisions, enable NPV analysis and enter the initial investment amount to get net present value, profitability index, and investment recommendations."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Analyze Results",
          "text": "Review the present value, NPV (if applicable), profitability index, and investment decision recommendation. Use the detailed breakdown to understand the analysis."
        }
      ]
    }
  ]
} as const;

export default function PresentValueCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Present Value Calculator - NPV Analysis & Investment Decision Tool</h1>
      
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link href="/financial" className="hover:text-gray-700">Financial</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Present Value Calculator</span>
          </div>
        </div>
      </nav>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PresentValueCalculator />
          
          {/* Educational Content Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding Present Value: The Foundation of Investment Analysis
            </h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p>
                Present value is one of the most fundamental concepts in finance, representing the current worth 
                of future cash flows discounted at a specific rate. This powerful tool enables investors, 
                businesses, and individuals to make informed financial decisions by comparing the value of 
                money received or paid at different times.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Present Value Formulas and Applications</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">💰 Single Present Value</h4>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-900 mb-2">PV = FV / (1 + r)^n</div>
                    <div className="text-blue-800 text-sm space-y-1">
                      <p><strong>PV</strong> = Present Value</p>
                      <p><strong>FV</strong> = Future Value</p>
                      <p><strong>r</strong> = Discount Rate</p>
                      <p><strong>n</strong> = Number of Periods</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-3">📅 Annuity Present Value</h4>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-900 mb-2">PV = PMT × [(1 - (1 + r)^-n) / r]</div>
                    <div className="text-green-800 text-sm space-y-1">
                      <p><strong>PMT</strong> = Payment per period</p>
                      <p><strong>r</strong> = Discount rate per period</p>
                      <p><strong>n</strong> = Number of periods</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">📊 Net Present Value</h4>
                  <div className="text-center">
                    <div className="text-sm font-bold text-purple-900 mb-2">NPV = Σ [CFt / (1 + r)^t] - I0</div>
                    <div className="text-purple-800 text-sm space-y-1">
                      <p><strong>CFt</strong> = Cash flow at time t</p>
                      <p><strong>I0</strong> = Initial investment</p>
                      <p><strong>r</strong> = Discount rate</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Investment Decision Applications</h3>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">🏢 Capital Budgeting</h4>
                  <p className="text-gray-700 mb-4">
                    Present value analysis is essential for evaluating investment projects and capital allocation decisions.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-gray-300">
                    <h5 className="font-bold text-gray-900 mb-2">Example: Manufacturing Equipment Investment</h5>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Initial cost: $500,000</li>
                      <li>• Annual cash flows: $150,000 for 5 years</li>
                      <li>• Discount rate: 10%</li>
                      <li>• <strong>NPV: $68,618 (Accept - positive NPV)</strong></li>
                      <li>• <strong>PI: 1.14 (Good return per dollar invested)</strong></li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">💎 Bond Valuation</h4>
                  <p className="text-gray-700 mb-4">
                    Calculate the fair value of bonds by discounting future coupon payments and principal repayment.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-gray-300">
                    <h5 className="font-bold text-gray-900 mb-2">Example: Corporate Bond Analysis</h5>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Face value: $1,000</li>
                      <li>• Annual coupon: $60 (6%)</li>
                      <li>• Years to maturity: 10</li>
                      <li>• Required yield: 7%</li>
                      <li>• <strong>Present Value: $929.76 (Bond trades at discount)</strong></li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">🏠 Real Estate Investment</h4>
                  <p className="text-gray-700 mb-4">
                    Evaluate rental property investments by analyzing future rental income and property appreciation.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-gray-300">
                    <h5 className="font-bold text-gray-900 mb-2">Example: Rental Property Analysis</h5>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Purchase price: $300,000</li>
                      <li>• Annual net rental income: $24,000</li>
                      <li>• Property appreciation: 3% annually</li>
                      <li>• Holding period: 10 years</li>
                      <li>• Required return: 8%</li>
                      <li>• <strong>NPV: $62,089 (Profitable investment)</strong></li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Investment Decision Metrics</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900">📈 Net Present Value (NPV)</h4>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="space-y-2 text-sm">
                      <div><strong>NPV &gt; 0:</strong> Accept the investment (creates value)</div>
                      <div><strong>NPV = 0:</strong> Indifferent (breaks even)</div>
                      <div><strong>NPV &lt; 0:</strong> Reject the investment (destroys value)</div>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-900">📊 Profitability Index (PI)</h4>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="space-y-2 text-sm">
                      <div><strong>PI &gt; 1.0:</strong> Accept (generates positive returns)</div>
                      <div><strong>PI = 1.0:</strong> Break-even point</div>
                      <div><strong>PI &lt; 1.0:</strong> Reject (negative returns)</div>
                      <div><strong>Higher PI:</strong> Better return per dollar invested</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900">🎯 Discount Rate Selection</h4>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li>• <strong>Risk-free rate + Risk premium:</strong> Government bonds + additional risk compensation</li>
                    <li>• <strong>Cost of capital (WACC):</strong> Weighted average cost of debt and equity</li>
                    <li>• <strong>Opportunity cost:</strong> Return from alternative investments</li>
                    <li>• <strong>Industry benchmarks:</strong> Typical returns in the sector</li>
                    <li>• <strong>Risk assessment:</strong> Higher risk = higher discount rate</li>
                  </ul>
                  
                  <h4 className="text-lg font-bold text-gray-900">⚠️ Risk Considerations</h4>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li>• <strong>Market risk:</strong> Economic and market volatility</li>
                    <li>• <strong>Credit risk:</strong> Counterparty default probability</li>
                    <li>• <strong>Liquidity risk:</strong> Ability to convert to cash</li>
                    <li>• <strong>Inflation risk:</strong> Purchasing power erosion</li>
                    <li>• <strong>Regulatory risk:</strong> Changes in laws and regulations</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Advanced Present Value Techniques</h3>
              
              <div className="space-y-4">
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                  <h4 className="text-lg font-bold text-indigo-900 mb-4">🔬 Sensitivity Analysis</h4>
                  <p className="text-indigo-800 mb-3">
                    Test how changes in key assumptions affect NPV and investment decisions.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="text-indigo-800 space-y-1 text-sm">
                      <li>• <strong>Discount rate sensitivity:</strong> ±1-2% rate changes</li>
                      <li>• <strong>Cash flow scenarios:</strong> Best/worst/most likely cases</li>
                      <li>• <strong>Timing variations:</strong> Earlier or delayed cash flows</li>
                    </ul>
                    <ul className="text-indigo-800 space-y-1 text-sm">
                      <li>• <strong>Break-even analysis:</strong> Minimum required returns</li>
                      <li>• <strong>Scenario modeling:</strong> Multiple outcome probabilities</li>
                      <li>• <strong>Monte Carlo simulation:</strong> Statistical outcome ranges</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <h4 className="text-lg font-bold text-yellow-900 mb-4">💡 Best Practices for Present Value Analysis</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="text-yellow-800 space-y-2 text-sm">
                      <li>• <strong>Use appropriate discount rates:</strong> Match risk level to required return</li>
                      <li>• <strong>Consider all cash flows:</strong> Include taxes, maintenance, and terminal values</li>
                      <li>• <strong>Account for inflation:</strong> Use real vs. nominal rates consistently</li>
                      <li>• <strong>Validate assumptions:</strong> Base projections on realistic data</li>
                    </ul>
                    <ul className="text-yellow-800 space-y-2 text-sm">
                      <li>• <strong>Compare alternatives:</strong> Evaluate multiple investment options</li>
                      <li>• <strong>Consider timing:</strong> Earlier cash flows are more valuable</li>
                      <li>• <strong>Review regularly:</strong> Update analysis as conditions change</li>
                      <li>• <strong>Document decisions:</strong> Record assumptions and rationale</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Mistakes to Avoid</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-red-600 font-bold">❌</span>
                  <div>
                    <strong className="text-red-900">Using inappropriate discount rates</strong>
                    <p className="text-red-700 text-sm">Failing to match the discount rate to the investment's risk profile.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-red-600 font-bold">❌</span>
                  <div>
                    <strong className="text-red-900">Ignoring cash flow timing</strong>
                    <p className="text-red-700 text-sm">Not properly accounting for when cash flows occur within periods.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-red-600 font-bold">❌</span>
                  <div>
                    <strong className="text-red-900">Mixing real and nominal rates</strong>
                    <p className="text-red-700 text-sm">Inconsistently applying inflation adjustments to cash flows and discount rates.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-red-600 font-bold">❌</span>
                  <div>
                    <strong className="text-red-900">Overestimating cash flows</strong>
                    <p className="text-red-700 text-sm">Being overly optimistic about future performance and returns.</p>
                  </div>
                </div>
              </div>

              <p className="mt-6">
                Present value analysis is a powerful tool for making informed financial decisions. By properly 
                discounting future cash flows and considering risk factors, investors and businesses can evaluate 
                opportunities objectively and allocate capital efficiently. Regular practice with different 
                scenarios will improve your ability to make sound investment decisions.
              </p>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Financial Calculators</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/future-value-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Future Value Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Calculate future value of investments</p>
              </Link>
              <Link href="/compound-interest-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Compound Interest Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Analyze compound growth over time</p>
              </Link>
              <Link href="/investment-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Investment Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Comprehensive investment analysis</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
