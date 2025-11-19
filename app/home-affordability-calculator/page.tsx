import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import HomeAffordabilityCalculator from '@/components/Calculator/HomeAffordabilityCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Home Affordability (Free, No signup) - Can I Afford? | AICalculator',
  description: 'Free home affordability calculator with no sign-up required. Calculate how much house you can afford based on income, debts, and down payment. Use the 28/36 rule to determine your home buying budget. With DTI analysis.',
  keywords: ['home affordability calculator', 'free home affordability calculator', 'home affordability calculator no signup', 'how much house can i afford', 'home buying calculator', 'mortgage affordability calculator', 'house affordability calculator', 'home budget calculator', 'debt to income ratio calculator', '28/36 rule calculator', 'home loan affordability', 'mortgage payment calculator', 'home purchase calculator', 'housing budget calculator', 'first time home buyer calculator', 'home price calculator', 'affordable home calculator'],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Home Affordability (Free, No signup) - AICalculator',
    description: 'Free home affordability calculator with no sign-up required. Calculate how much house you can afford using the 28/36 rule. With DTI analysis.',
    type: 'website',
    url: getUrl('/home-affordability-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{ url: getOgImage('home-affordability'), width: 1200, height: 630, alt: 'Home Affordability Calculator' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Affordability (Free, No signup) - AICalculator',
    description: 'Free home affordability calculator with no sign-up required. Calculate how much house you can afford using the 28/36 rule.',
    images: [getOgImage('home-affordability')],
    creator: '@aicalculator'
  },
  alternates: { canonical: getUrl('/home-affordability-calculator') },
  robots: { index: true, follow: true, nocache: false, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function HomeAffordabilityCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/home-affordability-calculator'),
        name: 'Home Affordability Calculator',
        url: getUrl('/home-affordability-calculator'),
        description: 'Free home affordability calculator that determines how much house you can afford based on income, debts, down payment, and the 28/36 rule.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        featureList: ['28/36 Rule Calculation', 'Front-end DTI Ratio', 'Back-end DTI Ratio', 'Maximum Home Price', 'Monthly Payment Breakdown', 'Cash Needed Estimation', 'Budget Range Recommendations']
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/home-affordability-calculator'),
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: getUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Financial', item: getUrl('/financial') },
          { '@type': 'ListItem', position: 3, name: 'Home Affordability Calculator', item: getUrl('/home-affordability-calculator') }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/home-affordability-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much house can I afford based on my income?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The 28/36 rule is the industry standard: your housing costs should not exceed 28% of gross monthly income (front-end ratio), and total debt payments should not exceed 36% (back-end ratio). For example, with $75,000 annual income ($6,250/month), you can afford up to $1,750/month in housing costs. If you have $500 in other debts, you still qualify at $1,750/month. If you have $1,000 in other debts, you're limited to $1,250/month housing (constrained by 36% back-end ratio). According to the <a href="https://www.consumerfinance.gov/owning-a-home/loan-options/" target="_blank" rel="noopener noreferrer">Consumer Financial Protection Bureau</a>, lenders use these ratios to assess mortgage qualification.`
            }
          },
          {
            '@type': 'Question',
            name: 'What is the 28/36 rule?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The 28/36 rule is a lending guideline: 28% front-end ratio means housing expenses (mortgage, taxes, insurance, HOA) should not exceed 28% of gross income. 36% back-end ratio means total debt payments (housing plus car loans, student loans, credit cards) should not exceed 36%. Example: $6,000/month income allows $1,680 max housing (28%) and $2,160 max total debt (36%). Most conventional loans require 28/36 compliance, though FHA allows up to 31/43 and some programs accept higher ratios with strong credit. The <a href="https://www.fanniemae.com/singlefamily/eligibility-matrix" target="_blank" rel="noopener noreferrer">Fannie Mae Eligibility Matrix</a> details DTI requirements by loan type.`
            }
          },
          {
            '@type': 'Question',
            name: 'What factors affect home affordability?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Key factors include: (1) Annual gross income - higher income means higher home price ($60K income affords ~$210K home, $100K affords ~$350K). (2) Existing monthly debts - $500/month debts reduces max price by $60K-80K. (3) Down payment - 20% avoids PMI and increases affordability. (4) Interest rate - 1% increase reduces buying power 10-15%. (5) Property taxes - vary 0.5-2.5% by location. (6) Credit score - determines rate qualification (740+ gets best rates). Each factor significantly impacts your maximum affordable home price and monthly payment.`
            }
          },
          {
            '@type': 'Question',
            name: 'How much down payment do I need?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Down payment requirements vary by loan type: FHA loans require 3.5% minimum (580+ credit) or 10% (500-579 credit). Conventional loans require 3-5% for first-time buyers, 5-20% for repeat buyers. VA loans (veterans) and USDA loans (rural areas) require 0% down. However, 20% down avoids PMI (saves $100-200/month on $300K home), secures better rates (0.25-0.5% lower), and strengthens your offer. The <a href="https://www.hud.gov/topics/buying_a_home" target="_blank" rel="noopener noreferrer">HUD Homebuying Guide</a> provides comprehensive down payment resources and assistance programs.`
            }
          },
          {
            '@type': 'Question',
            name: 'What is included in monthly housing costs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Monthly housing costs (PITI + HOA + PMI) include: Principal and Interest (pays down loan and cost of borrowing), Property Taxes (0.5-2.5% annually, varies by location - TX 2%, CA 1%, NJ 2.5%), Homeowners Insurance ($800-2,000/year, higher in disaster zones), HOA fees ($100-500/month if applicable), and PMI ($125-250/month if under 20% down). Example: $300K home with $1,896 P&I + $375 taxes + $125 insurance + $150 HOA + $150 PMI = $2,696/month total. Many first-time buyers only budget for P&I and are surprised by the full payment.`
            }
          },
          {
            '@type': 'Question',
            name: 'How does debt-to-income ratio affect approval?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `DTI ratio is critical for mortgage approval. Front-end DTI under 28% and back-end under 36% provides easy approval, best rates, and multiple lender options. DTI 28-36/36-43% is acceptable but may require higher credit (700+), larger down payment (10-20%), and cash reserves. DTI over 43/50% usually results in denial for conventional loans (may qualify for FHA with strong compensating factors). To improve DTI: pay down debts (each $100/month paid off adds $15K-20K buying power), increase income, avoid new debt, or make larger down payment. Visit the <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-why-is-the-43-debt-to-income-ratio-important-en-1791/" target="_blank" rel="noopener noreferrer">CFPB DTI Guide</a> for requirements.`
            }
          },
          {
            '@type': 'Question',
            name: 'How much cash do I need to buy a house?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Total cash needed includes: (1) Down payment - 3.5-20% of home price. (2) Closing costs - 2-5% of price (loan fees, appraisal, title insurance, escrow). (3) Cash reserves - 2-6 months housing payments required by lenders. (4) Moving costs - $1K-5K. (5) Immediate expenses - $2K-5K (repairs, furniture). Example: $300K home with 10% down needs $30K (down) + $10.5K (closing) + $7.5K (reserves) + $3.5K (moving) = $51.5K total. Budget 25-30% of home price in cash. The <a href="https://www.hud.gov/program_offices/housing/sfh/buying/closingcosts" target="_blank" rel="noopener noreferrer">HUD Closing Costs Guide</a> provides detailed breakdowns.`
            }
          },
          {
            '@type': 'Question',
            name: 'Can I afford a house with bad credit?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Yes, but with limitations. FHA loans accept 580+ credit (3.5% down) or 500-579 credit (10% down). However, lower credit means higher rates: 760+ credit gets 6.5%, 620 credit gets 7.5%+ (1% higher rate on $300K = $200/month more, $72K more over 30 years). Lower credit also requires higher PMI rates (3x more expensive) and larger down payments. Best strategy: improve credit 6-12 months before buying by paying down cards under 30% utilization, paying bills on time, and disputing errors. Even 50-point improvement saves $100-300/month. See the <a href="https://www.myfico.com/credit-education/improve-your-credit-score" target="_blank" rel="noopener noreferrer">myFICO Improvement Guide</a> for strategies.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/home-affordability-calculator'),
        name: 'How to Calculate Home Affordability',
        description: 'Step-by-step guide to determining how much house you can afford using the 28/36 rule.',
        totalTime: 'PT5M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
        tool: { '@type': 'HowToTool', name: 'Home Affordability Calculator' },
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Enter Annual Income', text: 'Input total annual gross income including salary, bonuses, and commissions. This is the foundation for calculating affordability.', url: getStepUrl('/home-affordability-calculator', 1) },
          { '@type': 'HowToStep', position: 2, name: 'Add Monthly Debts', text: 'Enter all recurring monthly debt obligations including car loans, student loans, credit cards. This affects back-end DTI ratio.', url: getStepUrl('/home-affordability-calculator', 2) },
          { '@type': 'HowToStep', position: 3, name: 'Input Down Payment', text: 'Enter amount saved for down payment. Larger down payment increases affordability and may avoid PMI at 20%.', url: getStepUrl('/home-affordability-calculator', 3) },
          { '@type': 'HowToStep', position: 4, name: 'Set Rate and Term', text: 'Enter mortgage rate and loan term (15, 20, or 30 years). Lower rates and longer terms increase affordability.', url: getStepUrl('/home-affordability-calculator', 4) },
          { '@type': 'HowToStep', position: 5, name: 'Add Local Costs', text: 'Input property tax rate, home insurance, and HOA fees for your target area. These vary significantly by location.', url: getStepUrl('/home-affordability-calculator', 5) },
          { '@type': 'HowToStep', position: 6, name: 'Calculate Results', text: 'Review maximum home price, monthly payment breakdown, DTI ratios, and total cash needed. Adjust inputs to optimize.', url: getStepUrl('/home-affordability-calculator', 6) }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/home-affordability-calculator'),
        headline: 'Home Affordability Calculator Guide',
        description: 'Guide to determining home affordability using the 28/36 rule and calculating DTI ratios.',
        author: { '@type': 'Organization', name: 'AICalculator.pro', url: getUrl('/') },
        publisher: { '@type': 'Organization', name: 'AICalculator.pro', logo: { '@type': 'ImageObject', url: getUrl('/logo.png') } },
        datePublished: '2024-01-01',
        dateModified: '2025-11-17',
        image: getOgImage('home-affordability'),
        articleBody: 'Home affordability is determined by the 28/36 rule: housing costs should not exceed 28% of gross income and total debt should not exceed 36%. Key factors include income, debts, down payment, interest rate, property taxes, and credit score.'
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <h1 className="sr-only">Home Affordability Calculator - Calculate How Much House You Can Afford</h1>

        {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Home Affordability (Free, No signup)"
        calculatorUrl="/home-affordability-calculator"
      />

        <HomeAffordabilityCalculator />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Home Affordability</h2>

            <p className="text-gray-700 mb-4">
              Our home affordability calculator uses the industry-standard 28/36 rule to determine how much house you can afford. According to the{' '}
              <a href="https://www.consumerfinance.gov/owning-a-home/loan-options/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                Consumer Financial Protection Bureau (CFPB)
              </a>
              , understanding these ratios is crucial for responsible home buying.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <p className="text-lg font-semibold text-blue-900 mb-3">💡 The 28/36 Rule</p>
              <ul className="list-none space-y-2 text-sm text-gray-700">
                <li><strong>28% Front-End:</strong> Housing costs ≤ 28% of gross monthly income</li>
                <li><strong>36% Back-End:</strong> Total debt ≤ 36% of gross monthly income</li>
                <li><strong>Example:</strong> $75,000 income → $1,750/month max housing</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Key Factors</h3>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Income:</strong> Foundation of affordability calculation</li>
              <li><strong>Debts:</strong> Reduces housing budget through back-end DTI</li>
              <li><strong>Down Payment:</strong> 20% avoids PMI and secures better rates</li>
              <li><strong>Interest Rate:</strong> 1% increase reduces buying power 10-15%</li>
              <li><strong>Property Taxes:</strong> Vary 0.5-2.5% by location</li>
              <li><strong>Credit Score:</strong> Determines rate qualification</li>
            </ul>

            <p className="text-gray-700 mb-4">
              For related tools, explore our{' '}
              <a href="/mortgage-calculator" className="text-blue-600 hover:text-blue-800 underline">Mortgage Calculator</a>,{' '}
              <a href="/dti-calculator" className="text-blue-600 hover:text-blue-800 underline">DTI Calculator</a>,{' '}
              <a href="/rent-calculator" className="text-blue-600 hover:text-blue-800 underline">Rent Calculator</a>, and{' '}
              <a href="/loan-calculator" className="text-blue-600 hover:text-blue-800 underline">Loan Calculator</a>.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/mortgage-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏠</div>
              <h3 className="font-semibold text-gray-900">Mortgage Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate monthly payments</p>
            </a>
            <a href="/dti-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900">DTI Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Debt-to-income ratio</p>
            </a>
            <a href="/rent-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏘️</div>
              <h3 className="font-semibold text-gray-900">Rent Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Rent vs buy comparison</p>
            </a>
            <a href="/loan-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900">Loan Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">General loan payments</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
