import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import CommissionCalculator from '@/components/Calculator/CommissionCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Commission Calculator (Free, No signup) - Sales Income | AICalculator',
  description: 'Free commission calculator with no sign-up required. For sales professionals. Calculate flat, tiered, and individual sales commissions. Track targets, analyze earnings, compute after-tax income, and optimize your commission structure.',
  keywords: [
    'commission calculator',
    'free commission calculator',
    'commission calculator no signup',
    'sales commission calculator',
    'commission rate calculator',
    'tiered commission calculator',
    'flat commission calculator',
    'sales income calculator',
    'commission structure calculator',
    'base salary plus commission',
    'commission earnings calculator',
    'sales target tracker',
    'commission breakdown calculator',
    'sales incentive calculator',
    'commission vs salary calculator',
    'sales performance calculator',
    'commission tax calculator',
    'accelerated commission calculator',
    'draw vs commission',
    'commission split calculator',
    'sales quota calculator',
    'OTE calculator'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Commission Calculator (Free, No signup) - AICalculator',
    description: 'Free commission calculator with no sign-up required. Calculate your sales commission with flat, tiered, or individual rates. Track targets, analyze earnings, and see after-tax income. Perfect for sales professionals.',
    type: 'website',
    url: getUrl('/commission-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('commission'),
      width: 1200,
      height: 630,
      alt: 'Commission Calculator - Sales Commission & Earnings Tool'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commission Calculator (Free, No signup) - AICalculator',
    description: 'Free commission calculator with no sign-up required. Calculate your commission earnings with flat, tiered, or individual rates. Track targets and optimize your sales income.',
    images: [getOgImage('commission')],
    creator: '@aicalculator'
  },
  alternates: {
    canonical: getUrl('/commission-calculator')
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function CommissionCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/commission-calculator'),
        name: 'Sales Commission Calculator',
        url: getUrl('/commission-calculator'),
        description: 'Free online commission calculator to calculate flat rate, tiered, and individual sales commissions. Track sales targets, analyze earnings structure, and compute after-tax income for sales professionals.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Flat rate commission calculation (fixed percentage)',
          'Tiered/accelerated commission structure (3+ tiers)',
          'Individual sale commission tracking',
          'Base salary integration',
          'Sales target progress tracking',
          'Commission breakdown by tier',
          'After-tax income calculation',
          'Federal and state tax estimation',
          'Visual commission chart by sales volume',
          'Comparison of commission structures',
          'OTE (On-Target Earnings) calculation',
          'Export results functionality'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/commission-calculator'),
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: getUrl('/')
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Financial',
            item: getUrl('/financial')
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Commission Calculator',
            item: getUrl('/commission-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/commission-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do you calculate sales commission?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sales commission is calculated by multiplying your sales amount by the commission rate. For flat rate commissions, it\'s straightforward: Total Sales × Commission Rate = Commission. For example, $100,000 in sales at 5% commission equals $5,000. Tiered commissions are more complex: calculate each tier separately and sum them. For instance, if rates are 3% on $0-25K, 5% on $25-50K, and 7% above $50K, a $60K sale would earn: ($25K × 3%) + ($25K × 5%) + ($10K × 7%) = $750 + $1,250 + $700 = $2,700 total commission.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the standard commission rate for sales?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Standard commission rates vary widely by industry and sales role. Retail typically offers 5-10% commissions, real estate agents earn 5-6% (split with buyer\'s agent), car sales averages 20-25% of dealer profit, B2B software sales ranges from 5-15%, financial advisors receive 1-3% of assets, insurance agents earn 2-8% for property/casualty and up to 100% first-year premium for life insurance, and pharmaceutical sales offers $75K-120K salary plus 10-15% bonus. Commission-only roles typically offer higher rates (10-20%) than base-plus-commission structures (3-10%). The average commission rate across all industries is approximately 7%.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is OTE in sales and how is it calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'OTE (On-Target Earnings) represents your total expected compensation when you meet 100% of your sales quota. It combines base salary plus commission at quota achievement. For example, if your base salary is $60,000 and your commission at quota is $40,000, your OTE is $100,000. The split ratio (60/40 in this case) indicates how much is guaranteed versus at-risk. Common OTE splits include 50/50 (aggressive, commission-heavy), 60/40 (balanced), 70/30 (conservative, base-heavy), and 80/20 (mostly base, light commission). Top performers often earn 125-200% of OTE, while average performers hit 80-100%. When evaluating job offers, consider the OTE split, quota achievability, commission caps, and accelerators for exceeding quota.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is a tiered or accelerated commission structure?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A tiered or accelerated commission structure increases your commission rate as you reach higher sales thresholds, incentivizing sales reps to exceed quotas. For example: 0-$50K sales earn 5%, $50-100K earn 7%, $100-150K earn 10%, and above $150K earn 12%. If you sell $120K, you earn: ($50K × 5%) + ($50K × 7%) + ($20K × 10%) = $2,500 + $3,500 + $2,000 = $8,000 total commission (effective rate 6.67%). This structure is more motivating than flat rates because each additional sale earns progressively more. Common in B2B sales, enterprise software, and pharmaceutical sales. Most plans have 3-5 tiers, with rates increasing 2-5% per tier. Some companies use "cliff" tiers (rate applies to all sales once threshold reached) rather than graduated tiers.'
            }
          },
          {
            '@type': 'Question',
            name: 'How are commissions taxed?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Commission income is taxed as ordinary income, subject to federal income tax (10-37% brackets), state income tax (0-13.3% depending on state), FICA taxes (7.65% for employees: 6.2% Social Security + 1.45% Medicare), and additional Medicare tax (0.9% on income over $200K/$250K). Employers typically withhold commission payments at the supplemental wage rate: 22% federal for amounts under $1 million, 37% for amounts over $1 million. However, actual tax owed depends on your total annual income and tax bracket. Self-employed commission workers (1099 contractors) pay self-employment tax (15.3%) covering both employer and employee FICA portions, but can deduct business expenses. To optimize taxes: track deductible expenses (mileage, meals, client entertainment), make quarterly estimated tax payments if needed, maximize 401(k) contributions ($23,000 limit in 2024), and consider working with a CPA for high commission income.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is a draw against commission?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A draw against commission is an advance payment that allows sales reps to receive regular income while building their pipeline, later recovered from earned commissions. There are two types: 1) Recoverable Draw - you must pay back the draw from future commissions. If you don\'t earn enough commission, you owe money or carry a deficit forward. Common during ramp-up periods. 2) Non-Recoverable Draw - guaranteed minimum income not required to be repaid, essentially functioning as a base salary. For example, with a $5,000/month recoverable draw: Month 1 you earn $3,000 commission but receive $5,000 (deficit: $2,000). Month 2 you earn $8,000 commission, receive $6,000 after recovering the $2,000 deficit. Draws help new reps during initial months when commissions are low, but be cautious of accumulating large deficits that are difficult to recover.'
            }
          },
          {
            '@type': 'Question',
            name: 'Should I negotiate my commission structure?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, commission structures are often negotiable, especially for experienced sales professionals or high-demand roles. Key negotiation points include: 1) Commission rates - request 1-3% higher rates, especially if you have proven track record. 2) Accelerators - negotiate for higher rates (10-15% bump) when exceeding quota by 120%+. 3) Quota setting - ensure quotas are realistic and achievable (aim for 60-70% attainment rate across team). 4) Payment timing - request monthly vs quarterly payments for better cash flow. 5) Commission caps - negotiate removal of caps or higher thresholds ($250K+ typical). 6) Clawbacks - limit clawback periods to 90 days or less for customer cancellations. 7) Territory - negotiate for larger or more lucrative territory. Best time to negotiate is during job offer, annual review after strong performance, or when taking on additional responsibilities. Document everything in writing.'
            }
          },
          {
            '@type': 'Question',
            name: 'What expenses can I deduct from commission income?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'If you\'re self-employed or a 1099 contractor, you can deduct ordinary and necessary business expenses from commission income. Common deductions include: Vehicle expenses using standard mileage rate ($0.67/mile in 2024) or actual expenses (gas, maintenance, insurance, depreciation - must keep detailed records), business meals (50% deductible for client meals), travel expenses (flights, hotels, ground transportation for business trips), home office (if used exclusively and regularly for business, based on square footage), phone and internet (business-use percentage), professional development (sales training, courses, seminars, books), marketing and advertising, professional dues and subscriptions, and software/technology (CRM, sales tools). W-2 employees cannot deduct unreimbursed business expenses after 2017 tax reform. Keep meticulous records with receipts, mileage logs, and documentation of business purpose. Consult a tax professional to maximize legitimate deductions and ensure IRS compliance.'
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/commission-calculator'),
        name: 'How to Calculate Your Sales Commission',
        description: 'Step-by-step guide to calculating your sales commission earnings with flat, tiered, or individual commission structures.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0'
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Commission Calculator'
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Your Commission Structure',
            text: 'Choose your commission type: Flat Rate (single percentage on all sales), Tiered (increasing rates at different sales levels), or Individual Sales (different rates per product/service). Flat rate is simplest, tiered motivates exceeding quotas, and individual allows different margins per product.',
            url: getStepUrl('/commission-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Sales Amount or Target',
            text: 'Input your total sales amount for the period or set your sales target/quota. For tiered commissions, understanding where your sales fall relative to tier thresholds helps optimize your selling strategy. Track both current sales and remaining amount to next tier.',
            url: getStepUrl('/commission-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Set Commission Rates',
            text: 'For flat rate, enter your commission percentage (e.g., 5%). For tiered, define each tier\'s threshold and rate (e.g., $0-25K: 3%, $25-50K: 5%, $50K+: 7%). For individual sales, enter each sale amount and its commission rate. Ensure rates match your employment contract or agreement.',
            url: getStepUrl('/commission-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Add Base Salary (if applicable)',
            text: 'If you have a base salary plus commission structure, enter your annual or monthly base salary. This provides your total compensation picture (OTE - On-Target Earnings). Pure commission roles can skip this step.',
            url: getStepUrl('/commission-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Include Tax Information',
            text: 'Enter your federal tax rate (based on your bracket: 10%, 12%, 22%, 24%, 32%, 35%, or 37%), state tax rate (0-13.3% depending on state), and whether you\'re W-2 (employee) or 1099 (contractor). This calculates your after-tax commission income for accurate budget planning.',
            url: getStepUrl('/commission-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Review Commission Breakdown',
            text: 'Analyze your results: gross commission by tier, total commission earned, base salary (if applicable), total compensation, estimated taxes (federal, state, FICA), and after-tax income. For tiered structures, see how much each tier contributed and how close you are to the next tier for strategic selling.',
            url: getStepUrl('/commission-calculator', 6)
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Optimize Your Commission Strategy',
            text: 'Use insights to maximize earnings: identify which tier provides best return, focus on high-commission products, time large sales to maximize tier benefits, negotiate better rates at annual review, and track progress toward quota. Compare different scenarios to understand impact of additional sales.',
            url: getStepUrl('/commission-calculator', 7)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/commission-calculator'),
        headline: 'Sales Commission Calculator - Complete Guide to Commission Structures',
        description: 'Learn how to calculate sales commissions with flat, tiered, and individual rates. Understand commission structures, tax implications, OTE, draws, and strategies to maximize your sales earnings.',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/')
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png')
          }
        },
        datePublished: '2024-01-01',
        dateModified: '2025-11-16',
        image: getOgImage('commission'),
        articleBody: 'Comprehensive guide to understanding and calculating sales commissions, including flat rate, tiered, and individual commission structures, tax implications, OTE calculation, draws against commission, negotiation strategies, and tips to maximize commission earnings.'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <h1 className="sr-only">Commission Calculator - Calculate Sales Commission and Track Performance</h1>
        
        {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Commission Calculator (Free, No signup)"
        calculatorUrl="/commission-calculator"
      />

        {/* Calculator Component */}
        <CommissionCalculator />

        {/* Educational Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Sales Commission</h2>
            
            <p className="text-gray-700 mb-4">
              Sales commission is a performance-based compensation model where earnings are directly tied to sales results. For sales professionals, understanding commission structures is crucial for maximizing income and making informed career decisions. According to the{' '}
              <a 
                href="https://www.bls.gov/oes/current/oes419031.htm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Bureau of Labor Statistics
              </a>
              , sales representatives earn median annual wages of $62,890, but top performers in commission-based roles can earn significantly more.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Types of Commission Structures</h3>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Flat Rate Commission</h4>
            <p className="text-gray-700 mb-4">
              The simplest structure applies a fixed percentage to all sales regardless of volume. Common in retail, real estate, and direct sales.
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Example:</strong> 5% on all sales</li>
              <li><strong>Calculation:</strong> $100,000 sales × 5% = $5,000 commission</li>
              <li><strong>Pros:</strong> Simple to understand and calculate, predictable income</li>
              <li><strong>Cons:</strong> No incentive to exceed quotas, may not reward top performers adequately</li>
              <li><strong>Best for:</strong> Straightforward sales roles, consistent product pricing, retail environments</li>
            </ul>

            <p className="text-gray-700 mb-4">
              If you're in a flat-rate commission role, consider using our{' '}
              <a href="/salary-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Salary Calculator
              </a>
              {' '}to compare your annual earnings with salaried positions.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Tiered/Accelerated Commission</h4>
            <p className="text-gray-700 mb-4">
              Commission rates increase progressively as you reach higher sales thresholds, creating strong motivation to exceed quotas.
            </p>

            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales Range</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Example Earnings</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">$0 - $25,000</td>
                  <td className="px-6 py-4 text-sm text-gray-900">3%</td>
                  <td className="px-6 py-4 text-sm text-gray-900">$25K × 3% = $750</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">$25,001 - $50,000</td>
                  <td className="px-6 py-4 text-sm text-gray-900">5%</td>
                  <td className="px-6 py-4 text-sm text-gray-900">$25K × 5% = $1,250</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">$50,001 - $75,000</td>
                  <td className="px-6 py-4 text-sm text-gray-900">7%</td>
                  <td className="px-6 py-4 text-sm text-gray-900">$25K × 7% = $1,750</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">$75,001+</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">10%</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Every $1K = $100</td>
                </tr>
              </tbody>
            </table>

            <p className="text-gray-700 mb-4">
              <strong>Example calculation</strong> for $85,000 in sales:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>First $25K: $25,000 × 3% = $750</li>
              <li>Next $25K: $25,000 × 5% = $1,250</li>
              <li>Next $25K: $25,000 × 7% = $1,750</li>
              <li>Final $10K: $10,000 × 10% = $1,000</li>
              <li><strong>Total Commission: $4,750</strong> (effective rate: 5.59%)</li>
            </ul>

            <p className="text-gray-700 mb-4">
              <strong>Advantages:</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
              <li>Highly motivating for top performers</li>
              <li>Rewards exceeding quotas significantly</li>
              <li>Each additional sale worth progressively more</li>
              <li>Common in B2B sales, SaaS, and enterprise software</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Individual Sale Commission</h4>
            <p className="text-gray-700 mb-4">
              Different commission rates apply to different products, services, or deal sizes based on profit margins and strategic priorities.
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Premium Product A:</strong> 15% commission (high margin)</li>
              <li><strong>Standard Service B:</strong> 8% commission (medium margin)</li>
              <li><strong>Commodity Product C:</strong> 3% commission (low margin)</li>
              <li><strong>Add-on Services:</strong> 20% commission (pure profit)</li>
            </ul>
            <p className="text-gray-700 mb-4">
              This structure allows companies to incentivize sales of high-margin or strategic products while still rewarding all sales activity.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Base Salary vs Commission-Only Compensation</h3>
            
            <p className="text-gray-700 mb-4">
              Sales roles typically fall into three compensation models:
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Base + Commission</h4>
            <p className="text-gray-700 mb-4">
              Most common model provides guaranteed base salary plus commission on sales. Typical splits:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>80/20 Split:</strong> $80K base + $20K commission at quota ($100K OTE) - Conservative, mostly guaranteed</li>
              <li><strong>70/30 Split:</strong> $70K base + $30K commission at quota ($100K OTE) - Balanced</li>
              <li><strong>60/40 Split:</strong> $60K base + $40K commission at quota ($100K OTE) - Standard for B2B sales</li>
              <li><strong>50/50 Split:</strong> $50K base + $50K commission at quota ($100K OTE) - Aggressive, high earning potential</li>
            </ul>

            <p className="text-gray-700 mb-4">
              Use our{' '}
              <a href="/take-home-paycheck-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Take-Home Paycheck Calculator
              </a>
              {' '}to see your after-tax income from base salary and commissions combined.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Commission-Only</h4>
            <p className="text-gray-700 mb-4">
              All compensation tied to performance, typically offering higher commission rates (10-20%) to compensate for risk.
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Advantages:</strong> Unlimited earning potential, higher commission rates, more autonomy, flexible schedule</li>
              <li><strong>Disadvantages:</strong> Income volatility, no guaranteed pay, no benefits typically, high pressure, must cover own expenses</li>
              <li><strong>Best for:</strong> Experienced sellers, strong pipeline builders, insurance/real estate agents, 1099 contractors</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Salary + Bonus</h4>
            <p className="text-gray-700 mb-4">
              Guaranteed salary with discretionary or performance bonuses, more stable but lower upside than commission models. Common in account management and customer success roles.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding OTE (On-Target Earnings)</h3>
            <p className="text-gray-700 mb-4">
              OTE represents your total expected compensation when achieving 100% of quota. Critical for evaluating job offers and setting financial goals.
            </p>

            <p className="text-gray-700 mb-4">
              <strong>OTE Calculation:</strong> Base Salary + Commission at 100% Quota = OTE
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Example 1:</strong> $60K base + $40K commission at quota = $100K OTE (60/40 split)</li>
              <li><strong>Example 2:</strong> $80K base + $40K commission at quota = $120K OTE (67/33 split)</li>
              <li><strong>Example 3:</strong> $50K base + $100K commission at quota = $150K OTE (33/67 split - aggressive)</li>
            </ul>

            <p className="text-gray-700 mb-4">
              <strong>Important OTE considerations:</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Quota achievability:</strong> Research what percentage of team hits quota (aim for 60-70%)</li>
              <li><strong>Ramp time:</strong> How long until full quota assignment (typically 3-6 months)</li>
              <li><strong>Commission caps:</strong> Is there a maximum commission limit?</li>
              <li><strong>Accelerators:</strong> Do you earn higher rates above quota (e.g., 15% at 120% quota)?</li>
              <li><strong>Average attainment:</strong> What do average performers actually earn (typically 80-90% of OTE)</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Draw Against Commission</h3>
            <p className="text-gray-700 mb-4">
              A draw provides advance payments against future commissions, helping sales reps manage cash flow during ramp-up or slow periods.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Recoverable Draw</h4>
            <p className="text-gray-700 mb-4">
              You receive regular payments that must be repaid from future commissions. If you don't earn enough, you owe the company or carry a deficit.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="font-semibold text-gray-900 mb-2">Example:</p>
              <ul className="list-none space-y-1 text-sm text-gray-700">
                <li><strong>Month 1:</strong> $5,000 draw received, $2,000 commission earned → Deficit: $3,000</li>
                <li><strong>Month 2:</strong> $5,000 draw received, $4,000 commission earned → Total deficit: $4,000</li>
                <li><strong>Month 3:</strong> Commission earned $10,000 → $4,000 pays deficit, $6,000 paid to you</li>
              </ul>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Non-Recoverable Draw</h4>
            <p className="text-gray-700 mb-4">
              Guaranteed minimum payment not required to be repaid, essentially functioning as a base salary. If commissions exceed the draw, you receive the difference.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Tax Implications of Commission Income</h3>
            <p className="text-gray-700 mb-4">
              Commission income is taxed as ordinary income but often withheld differently than base salary. Understanding tax treatment helps with financial planning. The{' '}
              <a 
                href="https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                IRS guidelines on commission income
              </a>
              {' '}provide official tax information.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">W-2 Employee Commissions</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Federal withholding:</strong> Typically 22% supplemental wage rate (37% if annual supplemental wages exceed $1 million)</li>
              <li><strong>FICA taxes:</strong> 7.65% (6.2% Social Security up to $168,600 in 2024 + 1.45% Medicare)</li>
              <li><strong>Additional Medicare tax:</strong> 0.9% on income over $200K (single) or $250K (married)</li>
              <li><strong>State income tax:</strong> 0-13.3% depending on state</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1099 Contractor Commissions</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Self-employment tax:</strong> 15.3% (covers both employer and employee FICA portions)</li>
              <li><strong>Federal income tax:</strong> Based on your bracket (10-37%)</li>
              <li><strong>Quarterly estimated taxes:</strong> Required if you expect to owe $1,000+ in taxes</li>
              <li><strong>Deductible expenses:</strong> Home office, mileage ($0.67/mile in 2024), phone, internet, meals, travel, professional development</li>
            </ul>

            <p className="text-gray-700 mb-4">
              Calculate your tax liability with our{' '}
              <a href="/tax-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Tax Calculator
              </a>
              {' '}to understand your actual after-tax commission income.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Strategies to Maximize Commission Earnings</h3>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Understand Your Commission Structure Inside and Out</h4>
            <p className="text-gray-700 mb-4">
              Know exactly when tier thresholds kick in, which products have highest rates, and how timing affects your earnings.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Strategic Sale Timing</h4>
            <p className="text-gray-700 mb-4">
              In tiered structures, consider timing large deals to push you into higher commission brackets. For example, if you're at $48K in sales with a $50K threshold for the next tier, landing a $10K deal earns significantly more commission than two $5K deals spread across months.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Focus on High-Commission Products</h4>
            <p className="text-gray-700 mb-4">
              If your structure includes individual product commissions, prioritize high-rate items while still meeting overall quotas. Balance is key - don't ignore lower-commission products if they help relationship building.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Track Progress Continuously</h4>
            <p className="text-gray-700 mb-4">
              Monitor daily or weekly progress toward tier thresholds and quotas. Knowing you're $2K away from a higher tier motivates targeted effort and prevents end-of-period surprises.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Negotiate Your Structure Annually</h4>
            <p className="text-gray-700 mb-4">
              After proving strong performance, negotiate better terms:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
              <li>Higher commission rates (request 1-3% increase)</li>
              <li>Lower tier thresholds (easier to hit high-commission tiers)</li>
              <li>Accelerators for exceeding quota (e.g., 15% commission at 120% quota)</li>
              <li>Remove or raise commission caps</li>
              <li>Shorter clawback periods</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. Build a Strong Pipeline</h4>
            <p className="text-gray-700 mb-4">
              Consistent prospecting ensures steady commission income. Aim for a pipeline 3-5x your quota to account for deal slippage and typical close rates.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common Commission Structure Pitfalls</h3>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Not Understanding Clawbacks</h4>
              <p className="text-red-800">
                Many companies claw back commissions if customers cancel within 30-90 days. Understand your clawback terms and focus on quality deals that stick, not just quick closes.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Ignoring Commission Caps</h4>
              <p className="text-red-800">
                Some plans cap total commission at $200K-300K annually. If you're a top performer, this significantly limits earnings. Negotiate cap removal or higher thresholds.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Accepting Unrealistic Quotas</h4>
              <p className="text-red-800">
                If fewer than 50% of the team consistently hits quota, it may be unrealistic. Research team attainment rates before accepting the role or negotiate lower quotas.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Not Getting Terms in Writing</h4>
              <p className="text-red-800">
                Verbal commission agreements are meaningless. Ensure all terms (rates, quotas, accelerators, caps, clawbacks, payment timing) are documented in your offer letter or employment contract.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Industry-Specific Commission Benchmarks</h3>

            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Industry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Structure</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">SaaS/Software</td>
                  <td className="px-6 py-4 text-sm text-gray-900">8-15%</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Base + tiered commission</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Real Estate</td>
                  <td className="px-6 py-4 text-sm text-gray-900">5-6% (split)</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Commission-only</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Car Sales</td>
                  <td className="px-6 py-4 text-sm text-gray-900">20-25% of profit</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Small base + commission</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Insurance</td>
                  <td className="px-6 py-4 text-sm text-gray-900">5-15% first year</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Commission-only + renewals</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Retail</td>
                  <td className="px-6 py-4 text-sm text-gray-900">1-10%</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Base + flat commission</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Financial Services</td>
                  <td className="px-6 py-4 text-sm text-gray-900">1-3% AUM + bonuses</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Base + ongoing trail</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Using This Commission Calculator</h3>
            <p className="text-gray-700 mb-4">
              Our calculator helps you:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Compare structures:</strong> Model flat vs tiered to see which pays better at your sales level</li>
              <li><strong>Understand tax impact:</strong> See after-tax commission income for realistic budgeting</li>
              <li><strong>Track progress:</strong> Monitor where you are relative to tier thresholds</li>
              <li><strong>Optimize strategy:</strong> Identify which sales levels provide best return</li>
              <li><strong>Negotiate better:</strong> Use data to support requests for higher rates</li>
              <li><strong>Plan scenarios:</strong> Model "what if" situations to understand earning potential</li>
            </ul>

            <p className="text-gray-700 mb-4">
              For related calculations, explore our{' '}
              <a href="/salary-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Salary Calculator
              </a>
              {' '}to compare commission-based earnings with traditional salaries, and our{' '}
              <a href="/payroll-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Payroll Calculator
              </a>
              {' '}to understand full payroll implications if you're managing a sales team.
            </p>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/salary-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💼</div>
              <h3 className="font-semibold text-gray-900">Salary Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Compare salary with commission earnings</p>
            </a>
            
            <a href="/take-home-paycheck-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900">Take-Home Pay Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate net income after taxes</p>
            </a>
            
            <a href="/tax-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900">Tax Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Estimate federal and state taxes</p>
            </a>
            
            <a href="/payroll-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-semibold text-gray-900">Payroll Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate payroll taxes and deductions</p>
            </a>

            <a href="/overtime-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">⏰</div>
              <h3 className="font-semibold text-gray-900">Overtime Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate overtime pay earnings</p>
            </a>
            
            <a href="/hourly-to-salary-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🕐</div>
              <h3 className="font-semibold text-gray-900">Hourly to Salary</h3>
              <p className="text-sm text-gray-600 mt-1">Convert hourly wage to annual salary</p>
            </a>
            
            <a href="/budget-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💵</div>
              <h3 className="font-semibold text-gray-900">Budget Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Plan your monthly budget</p>
            </a>
            
            <a href="/savings-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏦</div>
              <h3 className="font-semibold text-gray-900">Savings Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Track savings growth over time</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
