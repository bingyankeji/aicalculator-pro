import { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from "next/link";
import AverageReturnCalculator from "@/components/Calculator/AverageReturnCalculator";
import {
  getUrl,
  getOgImage,
  getBreadcrumbId,
  getWebAppId,
  getFaqId,
  getHowToId,
  getArticleId,
  getStepUrl
} from '@/config/site';

export const metadata: Metadata = {
  title: "Average Return Calculator - CAGR & Investment Return Calculator | AICalculator",
  description: "Free average return calculator with CAGR, arithmetic mean, Sharpe ratio, and risk metrics. Calculate investment returns using cash flow or cumulative return methods.",
  keywords: [
    "average return calculator",
    "cagr calculator",
    "investment return calculator",
    "compound annual growth rate calculator",
    "sharpe ratio calculator",
    "portfolio return calculator",
    "roi calculator",
    "geometric mean calculator"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Average Return Calculator - CAGR & Investment Returns",
    description: "Calculate CAGR, arithmetic mean, Sharpe ratio and investment risk metrics.",
    type: "website",
    url: getUrl('/average-return-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [{ url: getOgImage('return'), width: 1200, height: 630, alt: 'Average Return Calculator' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Average Return Calculator",
    description: "Calculate CAGR and investment returns with risk analysis.",
    images: [getOgImage('return')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: { canonical: getUrl('/average-return-calculator') },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { 'last-modified': new Date().toISOString() },
};

export default function AverageReturnCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "WebApplication",
      "@id": getWebAppId('/average-return-calculator'),
      "name": "Average Return Calculator",
      "url": getUrl('/average-return-calculator'),
      "description": "Calculate CAGR, arithmetic mean, Sharpe ratio, and investment risk metrics with two calculation modes.",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "featureList": [
        "Cash flow based return calculation",
        "Cumulative return analysis",
        "CAGR (Compound Annual Growth Rate)",
        "Arithmetic and geometric mean",
        "Sharpe ratio and volatility metrics",
        "Maximum drawdown analysis",
        "Portfolio growth visualization"
      ]
    }, {
      "@type": "BreadcrumbList",
      "@id": getBreadcrumbId('/average-return-calculator'),
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": getUrl('/') },
        { "@type": "ListItem", "position": 2, "name": "Financial Calculators", "item": getUrl('/category/financial') },
        { "@type": "ListItem", "position": 3, "name": "Average Return Calculator", "item": getUrl('/average-return-calculator') }
      ]
    }, {
      "@type": "FAQPage",
      "@id": getFaqId('/average-return-calculator'),
      "mainEntity": [{
        "@type": "Question",
        "name": "What is the difference between arithmetic mean and CAGR?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Arithmetic mean is a simple average of returns, while CAGR (Compound Annual Growth Rate) is the geometric mean that accounts for compounding. CAGR is more accurate for measuring investment performance over multiple periods because it reflects the actual growth rate needed to reach the ending value from the starting value."
        }
      }, {
        "@type": "Question",
        "name": "How is CAGR calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CAGR is calculated using the formula: CAGR = (Ending Value / Beginning Value)^(1/n) - 1, where n is the number of years. For example, if an investment grows from $100 to $150 over 3 years, the CAGR would be approximately 14.47% per year."
        }
      }, {
        "@type": "Question",
        "name": "What is a good Sharpe ratio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Sharpe ratio above 1 is considered good, above 2 is very good, and above 3 is excellent. The Sharpe ratio measures risk-adjusted returns by comparing excess returns (above risk-free rate) to volatility. Higher values indicate better risk-adjusted performance."
        }
      }, {
        "@type": "Question",
        "name": "What does standard deviation tell me about my investment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard deviation measures volatility - how much returns vary from the average. A higher standard deviation means more volatile and potentially risky investment. Generally, standard deviation below 10% is low volatility, 10-20% is moderate, and above 20% is high volatility."
        }
      }, {
        "@type": "Question",
        "name": "What is maximum drawdown?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Maximum drawdown is the largest peak-to-trough decline in portfolio value during a specific period. It shows the worst-case scenario loss an investor would have experienced. For example, a 25% max drawdown means the portfolio fell 25% from its highest point."
        }
      }, {
        "@type": "Question",
        "name": "When should I use cash flow mode vs cumulative mode?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use cash flow mode when you have actual account balances and transaction history (deposits/withdrawals). Use cumulative mode when you have return percentages for different periods and want to calculate overall performance metrics like CAGR, volatility, and risk-adjusted returns."
        }
      }]
    }, {
      "@type": "HowTo",
      "@id": getHowToId('/average-return-calculator'),
      "name": "How to Calculate Investment Returns",
      "description": "Step-by-step guide to calculating average returns and CAGR",
      "step": [{
        "@type": "HowToStep",
        "position": 1,
        "name": "Choose Calculation Method",
        "text": "Select either Cash Flow mode (for actual account data) or Cumulative mode (for return percentages).",
        "url": getStepUrl('/average-return-calculator', 1)
      }, {
        "@type": "HowToStep",
        "position": 2,
        "name": "Enter Investment Data",
        "text": "For cash flow: input starting balance, ending balance, and dates. For cumulative: enter return percentages and holding periods.",
        "url": getStepUrl('/average-return-calculator', 2)
      }, {
        "@type": "HowToStep",
        "position": 3,
        "name": "Add Transactions or Periods",
        "text": "Add deposits/withdrawals (cash flow mode) or additional return periods (cumulative mode) as needed.",
        "url": getStepUrl('/average-return-calculator', 3)
      }, {
        "@type": "HowToStep",
        "position": 4,
        "name": "Calculate Returns",
        "text": "Click Calculate to see average return, CAGR, risk metrics, and visualizations.",
        "url": getStepUrl('/average-return-calculator', 4)
      }, {
        "@type": "HowToStep",
        "position": 5,
        "name": "Analyze Results",
        "text": "Review CAGR, Sharpe ratio, volatility, and max drawdown to understand both returns and risk.",
        "url": getStepUrl('/average-return-calculator', 5)
      }]
    }, {
      "@type": "Article",
      "@id": getArticleId('/average-return-calculator'),
      "headline": "Understanding Investment Returns: CAGR, Sharpe Ratio, and Risk Metrics",
      "description": "Complete guide to calculating and analyzing investment returns including CAGR, volatility, and risk-adjusted performance",
      "author": { "@type": "Organization", "name": "AICalculator.pro" },
      "publisher": { "@type": "Organization", "name": "AICalculator.pro", "logo": { "@type": "ImageObject", "url": getUrl('/logo.png') } },
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString()
    }]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <h1 className="sr-only">Average Return Calculator - Calculate CAGR, Sharpe Ratio, and Investment Risk Metrics</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Average Return Calculator"
        calculatorUrl="/average-return-calculator"
      />

      <AverageReturnCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Investment Returns</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 CAGR vs Arithmetic Mean</h3>
              <p className="text-gray-700 text-sm mb-3">
                <strong>CAGR (Compound Annual Growth Rate)</strong> reflects the actual growth rate with compounding:
              </p>
              <div className="bg-blue-50 p-3 rounded mb-3">
                <p className="font-mono text-sm">CAGR = (End/Start)^(1/years) - 1</p>
              </div>
              <p className="text-gray-700 text-sm">
                <strong>Arithmetic Mean</strong> is a simple average but can overstate performance when returns vary.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Risk-Adjusted Returns</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li><strong>Sharpe Ratio:</strong> Excess return per unit of risk</li>
                <li><strong>Standard Deviation:</strong> Volatility measure</li>
                <li><strong>Max Drawdown:</strong> Worst peak-to-trough loss</li>
                <li><strong>Risk-Free Rate:</strong> Typically 2-3% (Treasury)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Two Calculation Methods</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">📊 Cash Flow Method</h4>
              <p className="text-gray-700 text-sm mb-3">Best for analyzing actual account performance:</p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Input starting and ending balances</li>
                <li>• Add all deposits and withdrawals</li>
                <li>• Specify transaction dates</li>
                <li>• Get time-weighted average return</li>
              </ul>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6">
              <h4 className="text-lg font-semibold text-purple-900 mb-3">📈 Cumulative Method</h4>
              <p className="text-gray-700 text-sm mb-3">Best for analyzing return series:</p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Input return percentages by period</li>
                <li>• Specify holding duration (years/months)</li>
                <li>• Get CAGR and arithmetic mean</li>
                <li>• Calculate risk metrics and volatility</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Risk Metrics</h3>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Sharpe Ratio Interpretation</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-900">below 1</p>
                <p className="text-sm text-gray-600">Poor</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-900">1 - 2</p>
                <p className="text-sm text-gray-600">Good</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-900">2 - 3</p>
                <p className="text-sm text-gray-600">Very Good</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-900">above 3</p>
                <p className="text-sm text-gray-600">Excellent</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Standard Deviation (Volatility)</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-gray-700">Low (below 10%)</div>
                <div className="flex-1 bg-green-100 h-6 rounded flex items-center px-3">
                  <span className="text-xs text-green-900">Stable, lower returns</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-gray-700">Moderate (10-20%)</div>
                <div className="flex-1 bg-yellow-100 h-6 rounded flex items-center px-3">
                  <span className="text-xs text-yellow-900">Balanced risk/return</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-gray-700">High (above 20%)</div>
                <div className="flex-1 bg-red-100 h-6 rounded flex items-center px-3">
                  <span className="text-xs text-red-900">Volatile, higher potential</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-World Examples</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Conservative Portfolio</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>CAGR: 5-7%</li>
                <li>Volatility: 5-8%</li>
                <li>Sharpe: 0.5-1.0</li>
                <li>Max DD: 5-10%</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Balanced Portfolio</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>CAGR: 8-10%</li>
                <li>Volatility: 10-15%</li>
                <li>Sharpe: 0.7-1.5</li>
                <li>Max DD: 15-25%</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Aggressive Portfolio</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>CAGR: 10-15%+</li>
                <li>Volatility: 18-25%+</li>
                <li>Sharpe: 0.5-1.2</li>
                <li>Max DD: 30-50%</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h3>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
            <ul className="space-y-3 text-gray-700">
              <li><strong>❌ Ignoring risk metrics:</strong> High returns mean nothing without considering volatility and drawdowns</li>
              <li><strong>❌ Using arithmetic mean for multi-period returns:</strong> Always use CAGR for accurate long-term performance</li>
              <li><strong>❌ Forgetting about taxes and fees:</strong> These significantly reduce actual returns</li>
              <li><strong>❌ Comparing different time periods:</strong> Ensure fair comparisons by using same timeframes</li>
              <li><strong>❌ Overlooking survivorship bias:</strong> Past performance does not guarantee future results</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Investment Concepts</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">📊 Time-Weighted Return (TWR)</h4>
              <p className="text-gray-700 text-sm mb-3">
                Best for evaluating investment manager performance. Eliminates the impact of cash flows (deposits/withdrawals) by breaking the measurement period into sub-periods.
              </p>
              <div className="bg-blue-50 p-3 rounded text-xs text-gray-700">
                <strong>Formula:</strong> TWR = [(1 + R₁) × (1 + R₂) × ... × (1 + Rₙ)] - 1
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">💰 Money-Weighted Return (MWR)</h4>
              <p className="text-gray-700 text-sm mb-3">
                Also known as Internal Rate of Return (IRR). Accounts for the timing and size of cash flows. Better for evaluating your personal investment performance.
              </p>
              <div className="bg-green-50 p-3 rounded text-xs text-gray-700">
                <strong>Use when:</strong> You control timing of deposits/withdrawals
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">📉 Sortino Ratio</h4>
              <p className="text-gray-700 text-sm mb-3">
                Similar to Sharpe ratio but only considers downside volatility. Focuses on harmful volatility (losses) rather than total volatility.
              </p>
              <div className="bg-purple-50 p-3 rounded text-xs text-gray-700">
                <strong>Formula:</strong> (Return - Target) / Downside Deviation
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">📊 Calmar Ratio</h4>
              <p className="text-gray-700 text-sm mb-3">
                Compares annualized return to maximum drawdown. Higher is better. Helps assess if returns justify the worst-case risk.
              </p>
              <div className="bg-orange-50 p-3 rounded text-xs text-gray-700">
                <strong>Formula:</strong> CAGR / |Maximum Drawdown|
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Investment Return Formulas</h3>
          
          <div className="space-y-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Simple Return</h4>
              <div className="bg-gray-50 p-4 rounded mb-3">
                <p className="font-mono text-sm">R = (Ending Value - Beginning Value) / Beginning Value</p>
              </div>
              <p className="text-sm text-gray-700">Example: $100 grows to $110, return = ($110 - $100) / $100 = 10%</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">CAGR (Compound Annual Growth Rate)</h4>
              <div className="bg-gray-50 p-4 rounded mb-3">
                <p className="font-mono text-sm">CAGR = (Ending Value / Beginning Value)^(1/n) - 1</p>
              </div>
              <p className="text-sm text-gray-700">Example: $100 grows to $150 in 3 years, CAGR = ($150/$100)^(1/3) - 1 ≈ 14.47%</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Standard Deviation</h4>
              <div className="bg-gray-50 p-4 rounded mb-3">
                <p className="font-mono text-sm">σ = √[Σ(Rᵢ - R̄)² / n]</p>
              </div>
              <p className="text-sm text-gray-700">Measures the dispersion of returns around the mean. Higher σ = higher volatility</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Sharpe Ratio</h4>
              <div className="bg-gray-50 p-4 rounded mb-3">
                <p className="font-mono text-sm">Sharpe = (Rₚ - Rᶠ) / σₚ</p>
              </div>
              <p className="text-sm text-gray-700">Where: Rₚ = portfolio return, Rᶠ = risk-free rate, σₚ = portfolio standard deviation</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">When to Use Each Calculation Method</h3>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Scenario</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Use This Method</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-gray-900">Evaluating fund manager</td>
                  <td className="px-6 py-4 text-gray-900">Time-Weighted Return</td>
                  <td className="px-6 py-4 text-gray-700 text-sm">Eliminates cash flow timing impact</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-900">Personal portfolio performance</td>
                  <td className="px-6 py-4 text-gray-900">Money-Weighted Return (IRR)</td>
                  <td className="px-6 py-4 text-gray-700 text-sm">Accounts for your contribution timing</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-900">Comparing multiple investments</td>
                  <td className="px-6 py-4 text-gray-900">CAGR</td>
                  <td className="px-6 py-4 text-gray-700 text-sm">Standardized annualized measure</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-900">Quick average calculation</td>
                  <td className="px-6 py-4 text-gray-900">Arithmetic Mean</td>
                  <td className="px-6 py-4 text-gray-700 text-sm">Simple but may overstate performance</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-900">Risk-adjusted comparison</td>
                  <td className="px-6 py-4 text-gray-900">Sharpe Ratio</td>
                  <td className="px-6 py-4 text-gray-700 text-sm">Balances return with volatility</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Practical Tips for Investors</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
              <h4 className="font-semibold text-blue-900 mb-3">✅ Do This</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Use CAGR for multi-year comparisons</li>
                <li>• Consider both return AND risk metrics</li>
                <li>• Track performance consistently</li>
                <li>• Account for fees and taxes in calculations</li>
                <li>• Compare to appropriate benchmarks</li>
                <li>• Review performance quarterly</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h4 className="font-semibold text-red-900 mb-3">❌ Avoid This</h4>
              <ul className="space-y-2 text-sm text-red-800">
                <li>• Chasing last year hot performers</li>
                <li>• Ignoring volatility and drawdowns</li>
                <li>• Using arithmetic mean for long periods</li>
                <li>• Comparing different time periods</li>
                <li>• Overlooking survivorship bias</li>
                <li>• Making decisions on short-term results</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Benchmark Comparisons</h3>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <p className="text-gray-700 mb-4">
              Historical annual returns (1928-2023 average):
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                <span className="text-gray-900 font-medium">S&P 500 (US Large Cap)</span>
                <span className="text-blue-900 font-bold">~10.3%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                <span className="text-gray-900 font-medium">Small Cap Stocks</span>
                <span className="text-green-900 font-bold">~12.1%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                <span className="text-gray-900 font-medium">International Stocks</span>
                <span className="text-purple-900 font-bold">~8.5%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                <span className="text-gray-900 font-medium">Corporate Bonds</span>
                <span className="text-yellow-900 font-bold">~6.2%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-900 font-medium">Treasury Bills</span>
                <span className="text-gray-900 font-bold">~3.3%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                <span className="text-gray-900 font-medium">Inflation (CPI)</span>
                <span className="text-red-900 font-bold">~3.0%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              *Past performance does not guarantee future results. Source: Historical market data
            </p>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Investment Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/investment-calculator" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 Investment Calculator</h3>
            <p className="text-sm text-gray-600">Calculate future investment value with compound growth</p>
          </Link>
          <Link href="/retirement-calculator" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🏖️ Retirement Calculator</h3>
            <p className="text-sm text-gray-600">Plan your retirement savings and income needs</p>
          </Link>
          <Link href="/rmd-calculator" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 RMD Calculator</h3>
            <p className="text-sm text-gray-600">Calculate required minimum distributions</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

