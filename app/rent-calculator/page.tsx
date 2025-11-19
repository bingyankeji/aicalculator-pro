import { Metadata } from 'next';
import RentCalculator from '@/components/Calculator/RentCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Rent Calculator (Free, No signup) - Rent Affordability | AICalculator',
  description: 'Free rent calculator with no sign-up required. Calculate rent affordability using the 30% rule, compare rent vs buy costs, and analyze 5-year projections. With move-in costs, inflation adjustment, and break-even analysis.',
  keywords: ['rent calculator', 'free rent calculator', 'rent calculator no signup', 'rent affordability calculator', 'how much rent can i afford', 'rent to income ratio', '30% rent rule', 'rent vs buy calculator', 'apartment rent calculator', 'monthly rent calculator', 'rental affordability calculator', 'rent budget calculator', 'move in cost calculator', 'rent inflation calculator', 'break even rent vs buy'],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Rent Calculator (Free, No signup) - AICalculator',
    description: 'Free rent calculator with no sign-up required. With 30% rule, rent vs buy comparison, and 5-year cost projections.',
    type: 'website',
    url: getUrl('/rent-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{ url: getOgImage('rent'), width: 1200, height: 630, alt: 'Rent Calculator - Rent Affordability Tool' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent Calculator (Free, No signup) - AICalculator',
    description: 'Free rent calculator with no sign-up required. Calculate rent affordability and compare rent vs buy costs with 5-year projections.',
    images: [getOgImage('rent')],
    creator: '@aicalculator'
  },
  alternates: { canonical: getUrl('/rent-calculator') },
  robots: { index: true, follow: true, nocache: false, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function RentCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/rent-calculator'),
        name: 'Rent Calculator',
        url: getUrl('/rent-calculator'),
        description: 'Free rent calculator that determines rent affordability using the 30% rule, compares rent vs buy costs with break-even analysis, and calculates 5-year rent projections.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        featureList: ['Rent Affordability (30% Rule)', 'Rent-to-Income Ratio', 'Rent vs Buy Comparison', '5-Year Projection', 'Rent Inflation Adjustment', 'Move-in Cost Calculator', 'Break-Even Analysis']
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/rent-calculator'),
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: getUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Financial', item: getUrl('/financial') },
          { '@type': 'ListItem', position: 3, name: 'Rent Calculator', item: getUrl('/rent-calculator') }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/rent-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much rent can I afford based on my income?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The 30% rule is the standard guideline used by the <a href="https://www.hud.gov/topics/rental_assistance/phprog" target="_blank" rel="noopener noreferrer">U.S. Department of Housing and Urban Development (HUD)</a>: monthly rent should not exceed 30% of gross monthly income. Example: $3,000/month income = $900 max rent, $5,000/month = $1,500 max rent, $7,000/month = $2,100 max rent. Conservative approach uses 25% for more financial flexibility. Include all housing costs (rent, utilities, insurance, parking, pet fees) in the 30%. Spending over 30% is considered cost-burdened, over 50% is severely cost-burdened.`
            }
          },
          {
            '@type': 'Question',
            name: 'What is the 30% rent rule?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The 30% rent rule, established by HUD, states you should spend no more than 30% of gross monthly income on rent and housing costs. Formula: Maximum rent = Gross income × 30%. Example: $60,000 annual ($5,000/month) allows $1,500 rent. This ensures 70% remains for food (10-15%), transportation (10-15%), savings (10-20%), debt (5-10%), healthcare (5-10%), and discretionary spending (10-15%). According to the <a href="https://www.jchs.harvard.edu/state-nations-housing-2023" target="_blank" rel="noopener noreferrer">Harvard Joint Center for Housing Studies</a>, nearly 50% of U.S. renters are cost-burdened (paying over 30%).`
            }
          },
          {
            '@type': 'Question',
            name: 'Should I rent or buy a home?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Rent if: staying under 3-5 years, need flexibility, lack down payment (10-20% required), or live in expensive markets where rent is significantly cheaper (price-to-rent ratio over 20). Buy if: staying 5+ years, have 10-20% down saved, stable income, want to build equity, and break-even point is favorable (typically 3-7 years). Break-even is when total buying cost equals total renting cost after accounting for equity and appreciation. Key factors: down payment opportunity cost, monthly costs, property appreciation (3-5% annually), rent increases (2-5% annually), and transaction costs. Use this calculator to compare your specific situation.`
            }
          },
          {
            '@type': 'Question',
            name: 'What are typical move-in costs for renting?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Budget 3-4 times monthly rent for move-in costs. Example for $1,500/month: First month rent ($1,500), Security deposit ($1,500, typically 1-2 months), Last month rent ($1,500 if required), Application fees ($25-100), Moving costs ($500-2,000), Utility deposits ($100-300), Renters insurance ($20/month, $240/year), Total: $5,120-7,040. According to the <a href="https://www.apartments.com/rental-manager/resources/article/renters-moving-costs" target="_blank" rel="noopener noreferrer">Apartments.com Moving Guide</a>, renters should budget at least 3-4× monthly rent. Negotiate: Ask to waive fees, reduce deposit, or pay deposit in installments.`
            }
          },
          {
            '@type': 'Question',
            name: 'How much does rent increase each year?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Average annual rent increases: Stable markets 2-3%, Growing markets 4-6%, Hot markets 7-10%+, Rent-controlled areas 2-5% (limited by law). Example: $1,500/month at 3.5% annual increase becomes $1,781/month in year 5 (18.7% total increase). 5-year total: $96,525 vs $90,000 with no increases ($6,525 more). Factors affecting increases: local market conditions, property type, lease terms, tenant history, and vacancy rates. Good tenants often get lower increases (2-3%) to retain reliability. See the <a href="https://www.rent.com/blog/average-rent-increases/" target="_blank" rel="noopener noreferrer">Rent.com Rent Increase Guide</a> for negotiation strategies.`
            }
          },
          {
            '@type': 'Question',
            name: 'What is renters insurance and do I need it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Renters insurance covers personal belongings ($20K-50K typical), liability protection ($100K-500K), and additional living expenses if rental becomes uninhabitable. Costs only $15-30/month ($180-360/year). Required by most landlords. Covers: theft, fire, water damage, vandalism, liability if guest injured. Does NOT cover: floods (separate policy), earthquakes, landlord property, roommate belongings. Example scenario: Apartment fire destroys $30,000 in belongings. Without insurance: $30,000 loss. With insurance: $29,500 recovered (minus $500 deductible). Essential protection costing only $0.50-1.00/day. DO NOT skip this.`
            }
          },
          {
            '@type': 'Question',
            name: 'What is the break-even point for rent vs buy?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Break-even is when total buying cost equals total renting cost (after equity and appreciation). Typically occurs at 3-7 years. Factors: down payment (high upfront cost), closing costs (2-5% buying, 6-8% selling), monthly mortgage vs rent, home appreciation (3-5% annually), rent increases (2-5% annually), opportunity cost (down payment could earn 7-10% invested). Example: $350,000 home, 20% down, 7% rate vs $1,800/month rent with 3.5% increases. Year 5: Rent costs $101,228 (no equity), Buy costs $166,620 but has $140,000 equity (net $26,620). Break-even at year 4. After break-even, buying advantage grows rapidly.`
            }
          },
          {
            '@type': 'Question',
            name: 'How do I calculate total annual rent costs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Total annual rent = (Monthly rent + Utilities + Insurance + Parking + Pet fees + Other) × 12. Example: $1,800 rent + $200 utilities + $25 insurance + $100 parking + $50 pet + $40 other = $2,215/month × 12 = $26,580/year. This is 23% higher than base rent alone ($21,600). Many renters underestimate by 20-40% by only considering base rent. Apply 30% rule to TOTAL housing cost, not just base rent. Example: $6,250 income × 30% = $1,875 max affordable. $2,215 actual = 35.4% (cost-burdened). Include ALL recurring housing expenses for accurate affordability calculation.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/rent-calculator'),
        name: 'How to Calculate Rent Affordability',
        description: 'Step-by-step guide to determining rent affordability using the 30% rule and comparing rent vs buy.',
        totalTime: 'PT5M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
        tool: { '@type': 'HowToTool', name: 'Rent Calculator' },
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Enter Monthly Income', text: 'Input total monthly gross income (before taxes) from all sources. This is used to calculate the 30% affordability rule.', url: getStepUrl('/rent-calculator', 1) },
          { '@type': 'HowToStep', position: 2, name: 'Add Housing Expenses', text: 'Enter monthly rent, utilities, insurance, parking, and pet fees. Include ALL recurring monthly housing costs.', url: getStepUrl('/rent-calculator', 2) },
          { '@type': 'HowToStep', position: 3, name: 'Input Move-In Costs', text: 'Enter security deposit, moving costs, and expected annual rent inflation rate (2-5% typical).', url: getStepUrl('/rent-calculator', 3) },
          { '@type': 'HowToStep', position: 4, name: 'Add Buy Comparison', text: 'To compare rent vs buy, input home price, down payment, mortgage rate, taxes, insurance, and appreciation rate.', url: getStepUrl('/rent-calculator', 4) },
          { '@type': 'HowToStep', position: 5, name: 'Review Affordability', text: 'Check rent-to-income ratio and status (affordable/cost-burdened). Review 5-year projection and break-even analysis.', url: getStepUrl('/rent-calculator', 5) }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/rent-calculator'),
        headline: 'Rent Calculator Guide',
        description: 'Guide to calculating rent affordability using the 30% rule and comparing rent vs buy.',
        author: { '@type': 'Organization', name: 'AICalculator.pro', url: getUrl('/') },
        publisher: { '@type': 'Organization', name: 'AICalculator.pro', logo: { '@type': 'ImageObject', url: getUrl('/logo.png') } },
        datePublished: '2024-01-01',
        dateModified: '2025-11-17',
        image: getOgImage('rent'),
        articleBody: 'Rent affordability is determined by the 30% rule: monthly rent should not exceed 30% of gross income. Move-in costs typically equal 3-4 times monthly rent. Annual rent increases average 2-5%. Rent vs buy break-even typically occurs at 3-7 years.'
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <h1 className="sr-only">Rent Calculator - Calculate Rent Affordability and Compare Rent vs Buy</h1>

        <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                  <span itemProp="name">Home</span>
                </a>
                <meta itemProp="position" content="1" />
              </li>
              <li className="text-gray-400">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="/financial" itemProp="item" className="hover:text-blue-600 transition-colors">
                  <span itemProp="name">Financial</span>
                </a>
                <meta itemProp="position" content="2" />
              </li>
              <li className="text-gray-400">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" className="text-gray-900 font-semibold">Rent Calculator</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>

        <RentCalculator />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Rent Affordability</h2>

            <p className="text-gray-700 mb-4">
              Our rent calculator uses the industry-standard 30% rule established by the{' '}
              <a href="https://www.hud.gov/topics/rental_assistance/phprog" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                U.S. Department of Housing and Urban Development (HUD)
              </a>
              {' '}to help you determine affordable rent and compare rent vs buy costs.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <p className="text-lg font-semibold text-blue-900 mb-3">💡 The 30% Rent Rule</p>
              <ul className="list-none space-y-2 text-sm text-gray-700">
                <li><strong>Formula:</strong> Maximum rent = Gross income × 30%</li>
                <li><strong>Example:</strong> $5,000/month income → $1,500 max rent</li>
                <li><strong>Cost-Burdened:</strong> Over 30% = financial strain</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Total Housing Costs</h3>

            <p className="text-gray-700 mb-4">
              Include ALL recurring expenses in your 30% calculation:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Base Rent:</strong> Monthly rent amount</li>
              <li><strong>Utilities:</strong> $100-300/month (electric, gas, water, internet)</li>
              <li><strong>Renters Insurance:</strong> $15-30/month (required by most landlords)</li>
              <li><strong>Parking:</strong> $0-300/month (urban areas higher)</li>
              <li><strong>Pet Fees:</strong> $25-75/month per pet</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Move-In Costs</h3>

            <p className="text-gray-700 mb-4">
              Budget 3-4 times monthly rent for move-in expenses. Learn more at the{' '}
              <a href="https://www.apartments.com/rental-manager/resources/article/renters-moving-costs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                Apartments.com Moving Guide
              </a>.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Rent vs Buy</h3>

            <p className="text-gray-700 mb-4">
              Break-even typically occurs at 3-7 years. According to the{' '}
              <a href="https://www.jchs.harvard.edu/state-nations-housing-2023" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                Harvard Joint Center for Housing Studies
              </a>
              , understanding this comparison is crucial for financial planning.
            </p>

            <p className="text-gray-700 mb-4">
              For related tools, explore our{' '}
              <a href="/home-affordability-calculator" className="text-blue-600 hover:text-blue-800 underline">Home Affordability Calculator</a>,{' '}
              <a href="/mortgage-calculator" className="text-blue-600 hover:text-blue-800 underline">Mortgage Calculator</a>,{' '}
              <a href="/dti-calculator" className="text-blue-600 hover:text-blue-800 underline">DTI Calculator</a>, and{' '}
              <a href="/savings-calculator" className="text-blue-600 hover:text-blue-800 underline">Savings Calculator</a>.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/home-affordability-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏠</div>
              <h3 className="font-semibold text-gray-900">Home Affordability</h3>
              <p className="text-sm text-gray-600 mt-1">How much house can I afford?</p>
            </a>
            <a href="/mortgage-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900">Mortgage Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate monthly payments</p>
            </a>
            <a href="/dti-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900">DTI Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Debt-to-income ratio</p>
            </a>
            <a href="/savings-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💵</div>
              <h3 className="font-semibold text-gray-900">Savings Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Save for down payment</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

