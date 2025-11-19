import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import RentalPropertyCalculator from '@/components/Calculator/RentalPropertyCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Rental Property Calculator - Real Estate Investment Analysis Tool | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Free rental property calculator analyzes real estate investments. Calculate cash flow, cap rate, ROI, cash-on-cash return, and DSCR. Get investment score and personalized recommendations.`,
  keywords: [
    'rental property calculator',
    'investment property calculator',
    'real estate calculator',
    'rental income calculator',
    'cap rate calculator',
    'cash on cash return calculator',
    'property investment calculator',
    'rental roi calculator',
    'landlord calculator',
    'buy to rent calculator',
    'rental yield calculator',
    'investment property analysis',
    'rental property analyzer',
    'real estate investment calculator',
    'property cash flow calculator',
    'dscr calculator',
    'grm calculator',
    'rental property roi',
    'investment property roi',
    'real estate investment analysis'
  ],
  alternates: {
    canonical: getUrl('/rental-property-calculator')
  },
  openGraph: {
    title: `Rental Property Calculator - Analyze Real Estate Investments`,
    description: `Calculate rental property ROI, cash flow, cap rate, and more. Get investment score and recommendations.`,
    url: getUrl('/rental-property-calculator'),
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Rental Property Calculator - Real Estate Investment Tool`,
    description: `Analyze rental investments with cash flow, cap rate, ROI, and DSCR calculations.`,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RentalPropertyCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/rental-property-calculator'),
        'name': 'Rental Property Calculator',
        'url': getUrl('/rental-property-calculator'),
        'description': `Professional rental property investment calculator analyzes real estate opportunities with comprehensive metrics: monthly cash flow, cap rate, cash-on-cash return, ROI, DSCR, GRM, and investment score with personalized recommendations for landlords and investors.`,
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          'Monthly cash flow calculation',
          'Cap rate (capitalization rate) analysis',
          'Cash-on-cash return percentage',
          'Annual ROI projection',
          'DSCR (Debt Service Coverage Ratio)',
          'GRM (Gross Rent Multiplier)',
          'Investment score (0-100)',
          'Personalized investment recommendations',
          'Purchase cost breakdown',
          'Annual projection analysis'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/rental-property-calculator'),
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': getUrl('/')
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Financial Calculators',
            'item': getUrl('/financial')
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Rental Property Calculator',
            'item': getUrl('/rental-property-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/rental-property-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is a good cap rate for rental property?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `A good cap rate (capitalization rate) for rental property typically ranges from 8-12%, though this varies by location and property type. Cap rate = (Net Operating Income / Property Price) × 100. Interpretation: Under 4% = Low return, often in high-demand markets like major cities. 4-8% = Average, typical for stable suburban markets. 8-12% = Excellent, strong income relative to price. Over 12% = Very high, but may indicate higher risk (poor location, property condition issues, high vacancy). Urban areas: 3-6% is common due to appreciation potential. Suburban: 6-10% is typical with steady returns. Rural/High-risk: 10-15%+ to compensate for lower demand. Remember: Cap rate doesn't account for mortgage payments or tax benefits. It's best used to compare similar properties in the same market. A lower cap rate in a growing area may appreciate faster, while a high cap rate property may have hidden costs.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How much cash flow should a rental property generate?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `A good rental property should generate at least $100-300 per month in positive cash flow after all expenses, though targets vary by investment strategy. Cash flow calculation: Monthly rent - (mortgage + taxes + insurance + maintenance + vacancy + management) = cash flow. Minimum targets by strategy: Conservative investors: $100-200/month per property. This provides cushion for unexpected expenses. Active investors: $200-400/month per property. Good balance of cash flow and appreciation. Aggressive investors: $400+/month per property. Focus on high cash flow, may sacrifice appreciation. The 1% Rule guideline: Monthly rent should be at least 1% of purchase price. Example: $200,000 property should rent for $2,000/month. This typically ensures positive cash flow. The 50% Rule: Estimate total expenses (excluding mortgage) as 50% of gross rent. Example: $2,000 rent - $1,000 expenses - $600 mortgage = $400 cash flow. Important: Negative cash flow can be acceptable if: (1) Strong appreciation expected, (2) Significant tax benefits, (3) Principal paydown exceeds losses. But for beginners, positive cash flow from day 1 is recommended for financial stability.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is cash-on-cash return and how is it calculated?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Cash-on-cash return measures the annual return on your actual cash invested in a rental property. Formula: Cash-on-Cash Return = (Annual Cash Flow / Total Cash Invested) × 100. Example calculation: Purchase price: $300,000. Down payment (20%): $60,000. Closing costs: $9,000. Repairs: $6,000. Total cash invested: $75,000. Annual rent: $36,000. Annual expenses: $27,600. Annual cash flow: $8,400. Cash-on-cash return = ($8,400 / $75,000) × 100 = 11.2%. Interpretation: Under 5% = Below average, may not beat stock market. 5-8% = Average, decent return with real estate benefits. 8-12% = Good, strong return on investment. 12-15%+ = Excellent, exceptional return. Advantages: Accounts for leverage (borrowed money). Shows actual return on YOUR money invested. Easy to compare different investment opportunities. Disadvantages: Doesn't include appreciation or tax benefits. Changes over time as you pay down mortgage. Doesn't account for property value increase. Target: Most investors aim for 8-12% cash-on-cash return. Higher returns often mean higher risk (worse location, more repairs needed). Compare against: S&P 500 long-term average (10%), high-yield savings (4-5%), bonds (4-6%).`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is DSCR and why do lenders care about it?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `DSCR (Debt Service Coverage Ratio) measures whether a property generates enough income to cover its debt obligations. Formula: DSCR = Net Operating Income (NOI) / Annual Debt Service. Example: Annual rent: $24,000. Annual operating expenses (not including mortgage): $8,000. NOI = $24,000 - $8,000 = $16,000. Annual mortgage payments: $12,000. DSCR = $16,000 / $12,000 = 1.33. Interpretation: DSCR below 1.0 = Property doesn't generate enough income to cover mortgage. Lenders will reject loan. DSCR 1.0-1.15 = Barely covers debt. Very risky, most lenders reject. DSCR 1.15-1.25 = Marginal. Some lenders accept with higher rates. DSCR 1.25-1.5 = Good. Most lenders approve at standard rates. DSCR 1.5+ = Excellent. Best loan terms, strong safety margin. Why lenders care: Predicts likelihood you can make payments even if vacancy occurs. Properties with DSCR under 1.25 are high default risk. Higher DSCR means lower risk for lender. Minimum requirements: Conventional loans: Usually require 1.25+ DSCR. Commercial loans: Often require 1.20-1.35 DSCR. Portfolio/hard money lenders: May accept 1.0-1.15 with higher rates. Improving DSCR: Increase rent, reduce operating expenses, make larger down payment (lower mortgage), negotiate lower interest rate.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How much should I budget for rental property expenses?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Budget 40-50% of gross rental income for operating expenses (excluding mortgage). Breakdown of typical expenses: Property taxes: 8-15% of rent (varies greatly by location). Insurance: 3-8% of rent (higher for older properties or high-risk areas). Maintenance/Repairs: 5-10% of rent (1% of property value annually). Use 10% for older properties (20+ years), 5% for newer. HOA fees: 0-10% of rent (if applicable). Property management: 8-10% of rent (if using manager), 0% if self-managing. Vacancy: 5-10% of rent (depends on local market). Use 8% as average. Utilities (if landlord pays): 5-15% of rent (depends on what's included). Capital expenditures (CapEx): 5-10% of rent. Set aside for big replacements: roof, HVAC, water heater, appliances. Example for $2,000/month rent: Property tax: $200, Insurance: $100, Maintenance: $150, Vacancy (8%): $160, Management: $180, CapEx: $150. Total expenses: $940 (47% of rent). If mortgage is $800, total monthly cost = $1,740. Cash flow = $2,000 - $1,740 = $260/month. The 50% Rule shortcut: Assume operating expenses equal 50% of rent, then subtract mortgage. This conservative estimate helps avoid overestimating profit. Always verify actual costs for specific property and market!`
            }
          },
          {
            '@type': 'Question',
            'name': 'Is a rental property a good investment in 2024?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Rental properties can be excellent investments in 2024, but success depends on market conditions, property selection, and your financial situation. Pros: Passive income: Monthly cash flow after expenses. Appreciation: Property values typically increase 3-5% annually. Leverage: Control $300K property with $60K down (20%). Tax benefits: Depreciation, mortgage interest deduction, expense write-offs. Inflation hedge: Rent increases with inflation, fixed-rate mortgage doesn't. Principal paydown: Tenants pay down your mortgage. Cons: High entry cost: Need 20-25% down for investment property (vs. 3-5% for primary residence). Interest rates: 2024 rates around 7-8% for investment properties (vs. 3% in 2020-2021). Cash flow challenges: Higher rates mean bigger payments, lower cash flow. Property management: Time-intensive if self-managing, expensive if hiring (8-10% of rent). Market risk: Some markets are overvalued and may see price corrections. Illiquid: Can't quickly sell like stocks; takes months. When it makes sense: Strong local rental market (low vacancy, high demand). Property cash flows positively at current rates. You have 6-12 months emergency fund. Planning to hold 5+ years minimum. You understand landlord responsibilities. When to avoid: Property barely breaks even or negative cash flow. Market shows signs of bubble (prices rising faster than rents). You need liquidity or may relocate soon. Bottom line: Rental properties remain solid long-term investments despite higher rates, but require more careful analysis than in low-rate era. Focus on strong cash flow markets and run conservative numbers.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/rental-property-calculator'),
        'name': 'How to Analyze a Rental Property Investment',
        'description': 'Step-by-step guide to evaluating rental property investments with key metrics and analysis',
        'totalTime': 'PT20M',
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Enter Purchase Details',
            'text': `Input the purchase price, down payment percentage, interest rate, loan term, closing costs, and any initial repair costs needed before renting the property.`,
            'url': getStepUrl('/rental-property-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Calculate Monthly Income',
            'text': `Enter expected monthly rent and any additional income (parking, laundry, storage fees). Research comparable properties in the area to ensure realistic rent estimates.`,
            'url': getStepUrl('/rental-property-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Input Monthly Expenses',
            'text': `Enter all operating expenses: property tax, insurance, HOA fees, maintenance, utilities (if landlord-paid), property management fees, and vacancy rate (typically 5-10%).`,
            'url': getStepUrl('/rental-property-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Review Cash Flow Analysis',
            'text': `Check monthly and annual cash flow. Positive cash flow means the property generates more income than expenses. Aim for at least $100-300/month after all costs.`,
            'url': getStepUrl('/rental-property-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            'position': 5,
            'name': 'Evaluate Investment Metrics',
            'text': `Review key metrics: Cap Rate (aim for 8-12%), Cash-on-Cash Return (aim for 8-12%), DSCR (lenders want 1.25+), and GRM (lower is better, typically 4-7).`,
            'url': getStepUrl('/rental-property-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            'position': 6,
            'name': 'Review Investment Score and Recommendations',
            'text': `Check your investment score (0-100) and read personalized recommendations. A score of 60+ indicates a viable investment, 80+ is excellent. Follow specific suggestions to improve the deal.`,
            'url': getStepUrl('/rental-property-calculator', 6)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/rental-property-calculator'),
        'headline': 'Rental Property Calculator - Complete Real Estate Investment Guide',
        'description': `Comprehensive guide to rental property investment analysis with cash flow calculations, ROI metrics, cap rate, DSCR, and investment strategies.`,
        'datePublished': '2024-01-01',
        'dateModified': new Date().toISOString().split('T')[0],
        'author': {
          '@type': 'Organization',
          'name': process.env.NEXT_PUBLIC_SITE_NAME
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Rental Property Calculator - Real Estate Investment Analysis Tool</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Rental Property Calculator"
        calculatorUrl="/rental-property-calculator"
      />

      {/* Calculator Component */}
      <RentalPropertyCalculator />

      {/* Educational Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Rental Property Calculator</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our <strong>Rental Property Calculator</strong> is a professional-grade investment analysis tool designed for real estate investors, landlords, and anyone considering purchasing rental property. Unlike basic calculators that only show cash flow, our tool provides comprehensive analysis with 10+ key metrics, an intelligent investment score, and personalized recommendations to help you make informed decisions.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Whether you're a first-time investor analyzing your first rental property or an experienced landlord evaluating your next acquisition, this calculator provides institutional-quality analysis that considers purchase costs, financing, operating expenses, vacancy rates, and multiple return metrics including cap rate, cash-on-cash return, DSCR, and GRM.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Investment Metrics Explained</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Cap Rate (Capitalization Rate)</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Cap rate</strong> is the most widely used metric in real estate investing. It measures a property's income-generating potential relative to its purchase price, independent of financing.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-6 border-2 border-blue-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Cap Rate Formula</h4>
            <p className="font-mono text-lg mb-3 text-blue-900">Cap Rate = (Net Operating Income / Property Price) × 100</p>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Example:</strong> Property price: $300,000. Annual rent: $30,000. Annual operating expenses: $9,000. NOI = $30,000 - $9,000 = $21,000. Cap Rate = ($21,000 / $300,000) × 100 = 7%</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Cap Rate Guidelines</h4>
            <ul className="space-y-2 text-gray-700">
              <li><strong className="text-red-700">Under 4%:</strong> Low return, typical in expensive markets (NYC, SF). High appreciation potential but low cash flow.</li>
              <li><strong className="text-yellow-700">4-6%:</strong> Below average. Common in stable suburban markets. Safe but limited returns.</li>
              <li><strong className="text-blue-700">6-8%:</strong> Average. Good balance of cash flow and appreciation potential.</li>
              <li><strong className="text-green-700">8-12%:</strong> Excellent. Strong income relative to price. Target range for most investors.</li>
              <li><strong className="text-purple-700">Over 12%:</strong> Very high. May indicate higher risk (location issues, property condition, high crime). Investigate thoroughly.</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Cash-on-Cash Return</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Cash-on-cash return</strong> measures your actual annual return on the cash you invested (down payment + closing costs + repairs). Unlike cap rate, it accounts for financing and shows return on YOUR money.
          </p>

          <div className="bg-purple-50 rounded-lg p-6 mb-6 border-2 border-purple-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Cash-on-Cash Formula</h4>
            <p className="font-mono text-lg mb-3 text-purple-900">CoC = (Annual Cash Flow / Total Cash Invested) × 100</p>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Example:</strong> Down payment: $60,000. Closing: $9,000. Repairs: $6,000. Total invested: $75,000. Annual cash flow after all expenses: $8,400. CoC = ($8,400 / $75,000) × 100 = 11.2%</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. DSCR (Debt Service Coverage Ratio)</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>DSCR</strong> is crucial for financing. It measures whether the property generates enough income to cover its mortgage payments. Lenders use this to assess loan risk.
          </p>

          <div className="bg-indigo-50 rounded-lg p-6 mb-6 border-2 border-indigo-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">DSCR Requirements</h4>
            <ul className="space-y-2 text-gray-700">
              <li><strong className="text-red-700">Below 1.0:</strong> Income doesn't cover debt. Lenders reject.</li>
              <li><strong className="text-orange-700">1.0-1.15:</strong> Barely covers debt. High risk, usually rejected or very high rates.</li>
              <li><strong className="text-yellow-700">1.15-1.25:</strong> Marginal. Some lenders accept with higher rates or larger down payment.</li>
              <li><strong className="text-blue-700">1.25-1.5:</strong> Good. Most lenders approve at standard investment property rates.</li>
              <li><strong className="text-green-700">1.5+:</strong> Excellent. Best loan terms, strong safety margin, preferred by all lenders.</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. Gross Rent Multiplier (GRM)</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>GRM</strong> is a quick valuation tool that compares property price to annual rent. Lower is better—it means you're paying less relative to rental income.
          </p>
          
          <div className="bg-orange-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">GRM Formula & Interpretation</h4>
            <p className="font-mono text-lg mb-3 text-orange-900">GRM = Purchase Price / Annual Gross Rent</p>
            <p className="text-sm text-gray-700 mb-3"><strong>Example:</strong> $300,000 property, $30,000 annual rent → GRM = 10</p>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• <strong>GRM 4-7:</strong> Good value, strong income relative to price</li>
              <li>• <strong>GRM 8-11:</strong> Average, typical for stable markets</li>
              <li>• <strong>GRM 12-15:</strong> Expensive, low rental yield</li>
              <li>• <strong>GRM 15+:</strong> Overpriced for rental income, avoid or negotiate</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Rental Property Expense Categories</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Accurately estimating expenses is critical. Most new investors underestimate costs and overestimate profits. Budget conservatively using these guidelines:
          </p>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-5 border-l-4 border-blue-500">
              <h4 className="font-semibold text-gray-900 mb-2">Property Taxes (8-15% of rent)</h4>
              <p className="text-sm text-gray-700">Varies dramatically by location. Check county records for actual amounts. Budget high—taxes typically increase over time.</p>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-green-500">
              <h4 className="font-semibold text-gray-900 mb-2">Insurance (3-8% of rent)</h4>
              <p className="text-sm text-gray-700">Landlord/investment property insurance costs more than homeowner's. Older properties or high-risk areas (flood, hurricane) cost more. Get actual quotes.</p>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-yellow-500">
              <h4 className="font-semibold text-gray-900 mb-2">Maintenance & Repairs (5-10% of rent)</h4>
              <p className="text-sm text-gray-700">Rule of thumb: 1% of property value annually. Use 10% for properties 20+ years old, 5% for newer properties. Covers routine repairs, not major replacements.</p>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-purple-500">
              <h4 className="font-semibold text-gray-900 mb-2">Vacancy (5-10% of rent)</h4>
              <p className="text-sm text-gray-700">Even with great tenants, properties sit empty during turnover. 8% is conservative average (1 month vacant per year). High-turnover areas may need 10-15%.</p>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-pink-500">
              <h4 className="font-semibold text-gray-900 mb-2">Property Management (8-10% of rent)</h4>
              <p className="text-sm text-gray-700">If hiring a manager: typically 8-10% of monthly rent plus first month's rent for new tenant placement. Budget this even if self-managing—your time has value.</p>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-red-500">
              <h4 className="font-semibold text-gray-900 mb-2">Capital Expenditures / CapEx (5-10% of rent)</h4>
              <p className="text-sm text-gray-700">Big-ticket replacements: roof ($8-15K, lasts 20 years), HVAC ($5-10K, 15 years), water heater ($1-2K, 10 years), appliances ($500-2K each, 10 years). Set aside monthly for these inevitable costs.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 mt-6 border-2 border-red-300">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">⚠️ The 50% Rule</h4>
            <p className="text-gray-700 mb-3">
              A conservative rule of thumb: <strong>Operating expenses (excluding mortgage) typically equal 50% of gross rental income.</strong>
            </p>
            <p className="text-sm text-gray-600">
              Example: $2,000 rent → expect $1,000 in operating expenses → if mortgage is $800, cash flow = $2,000 - $1,000 - $800 = $200/month. This rule helps you quickly screen properties without detailed expense analysis.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Investment Strategies & When to Buy</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cash Flow vs. Appreciation Strategy</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 rounded-lg p-6 border-2 border-green-300">
              <h4 className="text-xl font-semibold text-green-900 mb-3">Cash Flow Focus</h4>
              <p className="text-sm text-gray-700 mb-3"><strong>Goal:</strong> Monthly income now</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Target: $300-500+/month cash flow</li>
                <li>• Markets: Secondary cities, suburbs, Midwest/South</li>
                <li>• Cap rates: 8-12%+</li>
                <li>• Property prices: $100K-300K range</li>
                <li>• Best for: Retirees, income seekers, beginners</li>
                <li>• Example: $150K property in Indianapolis, $1,500/month rent, $400 cash flow</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-300">
              <h4 className="text-xl font-semibold text-blue-900 mb-3">Appreciation Focus</h4>
              <p className="text-sm text-gray-700 mb-3"><strong>Goal:</strong> Long-term wealth building</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Target: 5-10%+ annual appreciation</li>
                <li>• Markets: Major cities, high-growth metros, coastal</li>
                <li>• Cap rates: 3-6% (lower cash flow)</li>
                <li>• Property prices: $400K-1M+</li>
                <li>• Best for: High-income earners, long-term investors</li>
                <li>• Example: $600K property in Austin, $3,000 rent, $100 cash flow, but property appreciates $30-60K/year</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">The 1% Rule for Quick Screening</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The <strong>1% rule</strong> states that monthly rent should be at least 1% of the purchase price for a property to likely cash flow positively.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>$100,000 property → needs $1,000/month rent</li>
            <li>$200,000 property → needs $2,000/month rent</li>
            <li>$500,000 property → needs $5,000/month rent</li>
          </ul>
          <p className="text-gray-700 text-sm mb-4">
            <strong>Reality:</strong> The 1% rule is hard to achieve in 2024 in most markets (especially with 7-8% interest rates). 0.7-0.8% is more common now. Use it for initial screening, then run detailed numbers.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Real Estate Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/mortgage-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🏠</div>
              <h3 className="font-semibold text-gray-900 mb-1">Mortgage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate monthly mortgage payments</p>
            </Link>
            
            <Link 
              href="/roi-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900 mb-1">ROI Calculator</h3>
              <p className="text-sm text-gray-600">Calculate return on investment</p>
            </Link>
            
            <Link 
              href="/investment-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900 mb-1">Investment Calculator</h3>
              <p className="text-sm text-gray-600">Analyze investment returns</p>
            </Link>

            <Link 
              href="/loan-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">💳</div>
              <h3 className="font-semibold text-gray-900 mb-1">Loan Calculator</h3>
              <p className="text-sm text-gray-600">Calculate loan payments</p>
            </Link>

            <Link 
              href="/budget-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">💼</div>
              <h3 className="font-semibold text-gray-900 mb-1">Budget Calculator</h3>
              <p className="text-sm text-gray-600">Plan your finances</p>
            </Link>

            <Link 
              href="/tax-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🧾</div>
              <h3 className="font-semibold text-gray-900 mb-1">Tax Calculator</h3>
              <p className="text-sm text-gray-600">Estimate income tax and deductions</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <p className="text-gray-700 mb-4">
            For more information about rental property investing:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a 
                href="https://www.biggerpockets.com/real-estate-investing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                BiggerPockets - Real Estate Investing Community
              </a>
            </li>
            <li>
              <a 
                href="https://www.investopedia.com/investing/rental-property-how-smart-investment/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Investopedia - Rental Property Investment Guide
              </a>
            </li>
            <li>
              <a 
                href="https://www.nar.realtor/research-and-statistics" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                National Association of Realtors - Market Data & Statistics
              </a>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

