import { Metadata } from 'next';
import PensionCalculator from '@/components/Calculator/PensionCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Pension Calculator (Free, No signup) - Retirement Income | AICalculator',
  description: 'Free pension calculator with no sign-up required. For defined benefit plans. Calculate monthly pension, compare lump sum vs annuity, survivor benefits, COLA adjustments, and tax impact. Plan your retirement income.',
  keywords: [
    'pension calculator',
    'free pension calculator',
    'pension calculator no signup',
    'defined benefit calculator',
    'pension estimator',
    'retirement pension calculator',
    'pension benefit calculator',
    'lump sum vs annuity',
    'survivor benefit calculator',
    'pension formula calculator',
    'early retirement pension',
    'COLA pension adjustment',
    'pension vs 401k',
    'pension tax calculator',
    'final average salary',
    'pension payout options',
    'lifetime pension value',
    'pension income calculator',
    'public pension calculator',
    'teacher pension calculator',
    'government pension calculator',
    'pension planning calculator'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Pension Calculator (Free, No signup) - AICalculator',
    description: 'Free pension calculator with no sign-up required. Calculate your defined benefit pension, compare payout options, analyze survivor benefits, and estimate retirement income with our comprehensive pension calculator.',
    type: 'website',
    url: getUrl('/pension-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('pension'),
      width: 1200,
      height: 630,
      alt: 'Pension Calculator - Calculate Defined Benefit Pension'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pension Calculator (Free, No signup) - AICalculator',
    description: 'Free pension calculator with no sign-up required. Calculate monthly pension benefits, compare lump sum options, and plan your retirement income. Defined benefit pension calculator.',
    images: [getOgImage('pension')],
    creator: '@aicalculator'
  },
  alternates: {
    canonical: getUrl('/pension-calculator')
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

export default function PensionCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/pension-calculator'),
        name: 'Pension Calculator',
        url: getUrl('/pension-calculator'),
        description: 'Free online pension calculator for defined benefit retirement plans. Calculate monthly pension benefits, compare lump sum vs annuity options, analyze survivor benefits, COLA adjustments, tax impact, and pension vs 401(k) comparison.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Defined benefit pension calculation',
          'Pension formula (Years × Multiplier × Final Average Salary)',
          'Early retirement reduction calculation',
          'COLA (Cost of Living Adjustment) projections',
          'Lump sum vs annuity comparison',
          'Survivor benefit analysis (single life, joint & survivor options)',
          'Break-even age calculation',
          'Pension vs 401(k) equivalent value',
          'Federal and state tax impact',
          'Lifetime pension value calculation',
          'Pension income projections with charts',
          'Multiple payout options comparison',
          'Net after-tax pension calculation'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/pension-calculator'),
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
            name: 'Pension Calculator',
            item: getUrl('/pension-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/pension-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How is my pension calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most defined benefit pensions use a formula: Years of Service × Benefit Multiplier × Final Average Salary. For example, with 30 years of service, 1.5% multiplier, and $75,000 final average salary: 30 × 1.5% × $75,000 = $33,750 annual pension ($2,813/month). The final average salary is typically your highest 3-5 years of earnings. The benefit multiplier varies by plan (usually 1.5% to 2.5% per year). Some plans use flat dollar amounts per year of service instead of a percentage formula.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the difference between single life and joint & survivor options?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Single Life pays the highest monthly amount but stops when you die, leaving nothing for your spouse. Joint & Survivor continues paying your spouse after your death but pays a reduced amount during your lifetime. Joint & 100% Survivor (spouse gets 100% of your pension) typically reduces your pension by ~10%. Joint & 50% Survivor (spouse gets 50%) reduces it by ~5%. Choose single life if unmarried or spouse has their own retirement income. Choose joint & survivor if your spouse depends on your pension for financial security.'
            }
          },
          {
            '@type': 'Question',
            name: 'Should I take a lump sum or monthly pension?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Key factors to consider: 1) Health and life expectancy - monthly pension pays more if you live longer than break-even age. 2) Financial discipline - lump sum requires self-management and investment risk. 3) Spouse protection - monthly pension with survivor option provides guaranteed income for spouse. 4) Investment opportunities - lump sum offers potential for higher returns but with risk. 5) Inflation protection - COLA pensions maintain purchasing power; lump sums do not. 6) Employer stability - if company bankruptcy risk exists, lump sum eliminates that risk (though PBGC insurance provides some protection). Generally, monthly pension is safer for those wanting guaranteed lifetime income; lump sum is better for those comfortable managing investments and wanting flexibility.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is COLA (Cost of Living Adjustment)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'COLA increases your pension annually to keep pace with inflation. For example, 2% COLA means your $3,000/month pension becomes $3,060 next year, $3,121 the following year, and so on. This maintains purchasing power over decades of retirement. Federal pensions (CSRS, FERS) typically have full COLA matching CPI. State/local pensions vary widely—some have no COLA, some have capped COLA (e.g., max 3%), some have conditional COLA (only if fund is well-funded). Private pensions rarely offer COLA. COLA dramatically increases lifetime pension value—a $36,000 annual pension with 2% COLA over 25 years provides $1.1M vs $900K without COLA.'
            }
          },
          {
            '@type': 'Question',
            name: 'How much is my pension reduced for early retirement?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most plans reduce benefits 5-6% for each year you retire before normal retirement age (typically 65). For example, retiring at 62 (3 years early) with 5% annual reduction: 3 × 5% = 15% reduction. A $40,000 pension becomes $34,000. Some plans have \"Rule of 85\" or similar allowing unreduced early retirement if age + years of service ≥ 85. Public safety (police, firefighters) often have younger normal retirement ages (50-55) allowing full benefits earlier. Early retirement reductions are actuarial adjustments because you\'ll receive payments longer. The reduction is permanent—it doesn\'t increase when you reach normal retirement age.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is my pension taxable?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, pension income is generally fully taxable as ordinary income at federal and state levels (if your state taxes income). Exceptions: 1) If you made after-tax contributions to the pension, a portion is tax-free (calculated using Simplified Method). 2) Some states don\'t tax pensions (Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, Wyoming). 3) Many states offer pension exclusions (e.g., $20,000-$40,000 exemption). 4) Military pensions may have special state tax treatment. Pension taxes are usually withheld from payments, but you may need to make estimated tax payments or adjust withholding. Consider Roth conversions and tax bracket management in retirement planning.'
            }
          },
          {
            '@type': 'Question',
            name: 'How much is my pension worth compared to a 401(k)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Calculate present value by dividing annual pension by a safe withdrawal rate (typically 4-5%). Example: $40,000/year pension ÷ 4% = $1,000,000 equivalent 401(k) value. This means you\'d need $1M in a 401(k) to generate the same $40,000 annual income safely. However, pensions have advantages not captured in simple math: guaranteed lifetime income regardless of market performance, no investment/longevity risk, survivor benefits, often COLA protection. A pension is typically worth 20-30% more than the calculated amount due to these insurance features. Use our calculator to see your pension\'s 401(k) equivalent and break-even analysis.'
            }
          },
          {
            '@type': 'Question',
            name: 'What happens to my pension if I die?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Depends on your payout option: Single Life - payments stop at death, nothing to spouse/heirs (highest monthly amount). Joint & Survivor - spouse continues receiving 50%, 75%, or 100% of your benefit for their lifetime (reduced monthly amount during your life). If both you and spouse die, payments stop—nothing to children/heirs. Some plans offer \"10-year certain\" or \"installment refund\" options guaranteeing minimum payout even if you die early. Lump sum option allows you to bequeath remaining balance to heirs. Most plans require spousal consent to elect single life option. Consider life insurance to protect spouse if taking single life for higher payment. Review beneficiary designations regularly.'
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/pension-calculator'),
        name: 'How to Calculate Your Pension Benefits',
        description: 'Step-by-step guide to calculating your defined benefit pension, comparing payout options, and planning your retirement income.',
        totalTime: 'PT10M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0'
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Pension Calculator'
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Years of Service',
            text: 'Input your total years of service with your employer. Include full years and fractions (e.g., 30.5 years). Most plans count full-time employment; part-time may count proportionally. Check your annual pension statement for the exact credited service.',
            url: getStepUrl('/pension-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Final Average Salary',
            text: 'Input your final average salary, which is typically the average of your highest 3-5 consecutive years of earnings. Check your pension plan documents for the exact definition. Include base salary, overtime if allowed, and other pensionable compensation.',
            url: getStepUrl('/pension-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Benefit Multiplier',
            text: 'Find your plan\'s benefit multiplier (also called accrual rate) in your pension plan documents. Typical range is 1.5% to 2.5% per year of service. For example, 1.5% means you earn 1.5% of final average salary for each year worked.',
            url: getStepUrl('/pension-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Set Retirement Ages',
            text: 'Enter your current age, planned retirement age, and normal retirement age (age for unreduced benefits, usually 65). If retiring before normal retirement age, the calculator will apply early retirement reductions (typically 5% per year).',
            url: getStepUrl('/pension-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Add COLA and Life Expectancy',
            text: 'Enter annual Cost of Living Adjustment (COLA) percentage if your plan offers it. Set life expectancy for lifetime value calculations (average is 85). These factors significantly impact your total retirement income.',
            url: getStepUrl('/pension-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Choose Payout Option',
            text: 'Select Single Life (highest monthly payment, ends at death) or Joint & Survivor (continues to spouse, ~5-10% reduction). If offered a lump sum, enter the amount to compare with monthly annuity option.',
            url: getStepUrl('/pension-calculator', 6)
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Review Results and Tax Impact',
            text: 'Analyze your monthly pension, lifetime value, break-even age, survivor benefits, and net after-tax income. Compare pension vs 401(k) equivalent value. Review income projections chart to see how COLA increases your pension over time.',
            url: getStepUrl('/pension-calculator', 7)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/pension-calculator'),
        headline: 'Pension Calculator - Complete Guide to Retirement Pension Planning',
        description: 'Learn how to calculate your defined benefit pension, understand payout options, compare lump sum vs annuity, maximize survivor benefits, and plan your retirement income with our comprehensive guide and free calculator.',
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
        image: getOgImage('pension'),
        articleBody: 'Comprehensive guide to understanding and calculating defined benefit pensions, including pension formulas, early retirement reductions, COLA adjustments, payout options comparison, survivor benefits, lump sum vs annuity decisions, tax implications, and pension vs 401(k) analysis for effective retirement planning.'
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
        <h1 className="sr-only">Pension Calculator - Calculate Your Defined Benefit Retirement Pension</h1>
        
        {/* Breadcrumb Navigation */}
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
                <span itemProp="name" className="text-gray-900 font-semibold">Pension Calculator</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>

        {/* Calculator Component */}
        <PensionCalculator />

        {/* Educational Content - 由于篇幅限制，这里会继续添加 */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Defined Benefit Pensions</h2>
            
            <p className="text-gray-700 mb-4">
              A defined benefit pension is a retirement plan where your employer promises a specific monthly benefit at retirement, calculated using a formula based on your salary and years of service. Unlike 401(k) plans where you bear investment risk, pensions provide guaranteed lifetime income. Understanding how your pension is calculated is crucial for retirement planning. The{' '}
              <a 
                href="https://www.dol.gov/general/topic/retirement/typesofplans" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Department of Labor
              </a>
              {' '}provides detailed information on different types of retirement plans.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How Pension Benefits Are Calculated</h3>
            <p className="text-gray-700 mb-4">
              Most defined benefit pensions use a formula with three key components:
            </p>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <p className="font-mono text-lg font-semibold text-gray-900 mb-4">
                Annual Pension = Years of Service × Benefit Multiplier × Final Average Salary
              </p>
              <p className="text-sm text-gray-700 mb-3"><strong>Example:</strong></p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• Years of Service: 30 years</li>
                <li>• Benefit Multiplier: 1.5% (0.015)</li>
                <li>• Final Average Salary: $75,000</li>
                <li className="font-semibold mt-2">= 30 × 0.015 × $75,000 = $33,750/year or $2,813/month</li>
              </ul>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Years of Service</h4>
            <p className="text-gray-700 mb-4">
              Total years you've worked for the employer sponsoring the pension. Most plans:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
              <li>Count full-time service (40 hours/week)</li>
              <li>May credit part-time service proportionally</li>
              <li>Include partial years (e.g., 30.5 years)</li>
              <li>Might allow purchasing additional service years</li>
              <li>May provide service credit for military service</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Benefit Multiplier (Accrual Rate)</h4>
            <p className="text-gray-700 mb-4">
              The percentage you earn per year of service, typically:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
              <li><strong>1.5%:</strong> Common for private sector plans</li>
              <li><strong>2.0%:</strong> Typical for state/local government plans</li>
              <li><strong>2.5%:</strong> Generous public sector plans (becoming rare)</li>
              <li><strong>Flat dollar amount:</strong> Some union plans (e.g., $50/month per year of service)</li>
            </ul>

            <p className="text-gray-700 mb-4">
              With a 2% multiplier, 30 years of service = 60% of final average salary (30 × 2% = 60%). Check your plan documents for your specific multiplier.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Final Average Salary (FAS)</h4>
            <p className="text-gray-700 mb-4">
              The average of your highest consecutive years of compensation, typically:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
              <li><strong>Highest 3 years:</strong> Most common (especially public sector)</li>
              <li><strong>Highest 5 years:</strong> Some private plans</li>
              <li><strong>Last 3 years:</strong> Some plans specify final years</li>
              <li><strong>Career average:</strong> Rare (average of all years worked)</li>
            </ul>

            <p className="text-gray-700 mb-4">
              FAS usually includes: base salary, regular overtime (if pensionable), shift differentials, and longevity pay. Typically excludes: bonuses, irregular overtime, lump-sum payments, and non-cash compensation.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Pension Payout Options</h3>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Single Life Annuity</h4>
            <p className="text-gray-700 mb-4">
              Provides the <strong>highest monthly payment</strong> but payments stop when you die. Nothing continues to your spouse or heirs.
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Pros:</strong> Maximum monthly income, simple</li>
              <li><strong>Cons:</strong> No survivor protection, spouse left with no pension income</li>
              <li><strong>Best for:</strong> Single individuals, or married couples where spouse has adequate retirement income</li>
              <li><strong>Consider:</strong> Purchasing life insurance to protect spouse if taking this option</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Joint & Survivor Annuity</h4>
            <p className="text-gray-700 mb-4">
              Pays a <strong>reduced monthly amount</strong> during your life but continues paying your spouse after your death.
            </p>

            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Option</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Your Reduction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spouse Benefit</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">100% Survivor</td>
                  <td className="px-6 py-4 text-sm text-gray-900">~10% reduction</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Spouse gets 100% of your benefit</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">75% Survivor</td>
                  <td className="px-6 py-4 text-sm text-gray-900">~7% reduction</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Spouse gets 75% of your benefit</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">50% Survivor</td>
                  <td className="px-6 py-4 text-sm text-gray-900">~5% reduction</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Spouse gets 50% of your benefit</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="text-sm text-gray-700">
                <strong>💡 Important:</strong> Federal law (REA) requires married participants to elect joint & survivor unless spouse signs a written waiver. This protects spouses from being left without income.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Early Retirement Reductions</h3>
            <p className="text-gray-700 mb-4">
              Retiring before your plan's normal retirement age (typically 65) results in reduced benefits:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Typical reduction:</strong> 5-6% per year before normal retirement age</li>
              <li><strong>Actuarial adjustment:</strong> Accounts for receiving payments over more years</li>
              <li><strong>Permanent reduction:</strong> Doesn't increase when you reach normal retirement age</li>
              <li><strong>Example:</strong> Retire at 62 with normal retirement at 65 = 3 years × 5% = 15% reduction</li>
            </ul>

            <div className="bg-gray-50 p-4 rounded-lg my-6">
              <p className="text-sm text-gray-700 mb-2"><strong>Calculation Example:</strong></p>
              <p className="text-sm text-gray-700">Base pension (age 65): $3,000/month</p>
              <p className="text-sm text-gray-700">Retire at age 62: 3 years early × 5% = 15% reduction</p>
              <p className="text-sm font-semibold text-red-600">Reduced pension: $3,000 × 0.85 = $2,550/month</p>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Unreduced Early Retirement</h4>
            <p className="text-gray-700 mb-4">
              Some plans allow unreduced early retirement if you meet certain criteria:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
              <li><strong>Rule of 85:</strong> Age + years of service ≥ 85 (e.g., age 60 with 25 years = 85)</li>
              <li><strong>Rule of 80:</strong> More generous threshold (age + years ≥ 80)</li>
              <li><strong>30-and-out:</strong> 30 years of service regardless of age</li>
              <li><strong>Public safety:</strong> Police/fire often have early retirement (age 50-55) with full benefits</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">COLA (Cost of Living Adjustment)</h3>
            <p className="text-gray-700 mb-4">
              COLA increases your pension annually to maintain purchasing power against inflation. Impact varies dramatically by plan:
            </p>

            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical COLA</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr><td className="px-6 py-4 text-sm text-gray-900">Federal CSRS</td><td className="px-6 py-4 text-sm text-gray-600">Full CPI increase</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">Federal FERS</td><td className="px-6 py-4 text-sm text-gray-600">CPI minus 1% (if CPI > 2%)</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">State/Local Government</td><td className="px-6 py-4 text-sm text-gray-600">Varies (0% to 3% caps common)</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">Private Sector</td><td className="px-6 py-4 text-sm text-gray-600">Rare (most have no COLA)</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">Military</td><td className="px-6 py-4 text-sm text-gray-600">Full CPI increase</td></tr>
              </tbody>
            </table>

            <div className="bg-green-50 p-4 rounded-lg my-6">
              <p className="text-sm text-gray-700 mb-2"><strong>COLA Impact Example (2% annual):</strong></p>
              <p className="text-sm text-gray-700">Initial pension: $3,000/month ($36,000/year)</p>
              <p className="text-sm text-gray-700">After 10 years: $3,657/month (+22%)</p>
              <p className="text-sm text-gray-700">After 20 years: $4,457/month (+49%)</p>
              <p className="text-sm font-semibold text-green-600">25-year total: $1.1M vs $900K without COLA</p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Lump Sum vs Monthly Annuity</h3>
            <p className="text-gray-700 mb-4">
              Many plans now offer a one-time lump sum payment instead of monthly benefits. This is a critical decision with no do-overs:
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Advantages of Lump Sum</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Control:</strong> You manage investments and withdrawal strategy</li>
              <li><strong>Flexibility:</strong> Access funds for large expenses or emergencies</li>
              <li><strong>Legacy:</strong> Remaining balance passes to heirs (not with annuity)</li>
              <li><strong>Portability:</strong> Take it to new employer or roll to IRA</li>
              <li><strong>Higher returns:</strong> Potential for better investment performance</li>
              <li><strong>Eliminate company risk:</strong> No worry about employer bankruptcy</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Advantages of Monthly Annuity</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Guaranteed income:</strong> Payments for life regardless of market performance</li>
              <li><strong>Longevity insurance:</strong> Can't outlive your money</li>
              <li><strong>Simplicity:</strong> No investment decisions or management required</li>
              <li><strong>Spouse protection:</strong> Joint & survivor option provides guaranteed income for both lives</li>
              <li><strong>COLA:</strong> Inflation protection if plan offers COLA</li>
              <li><strong>No investment risk:</strong> No worry about market crashes or poor returns</li>
              <li><strong>Discipline:</strong> Can't spend it all at once</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Break-Even Analysis</h4>
            <p className="text-gray-700 mb-4">
              Calculate break-even age: the age where cumulative annuity payments equal the lump sum:
            </p>

            <div className="bg-gray-50 p-4 rounded-lg my-6">
              <p className="text-sm text-gray-700 mb-2"><strong>Example:</strong></p>
              <p className="text-sm text-gray-700">Lump sum offer: $500,000</p>
              <p className="text-sm text-gray-700">Monthly annuity: $2,500/month ($30,000/year)</p>
              <p className="text-sm text-gray-700">Retirement age: 65</p>
              <p className="text-sm text-gray-700">Break-even: $500,000 ÷ $30,000 = 16.7 years</p>
              <p className="text-sm font-semibold text-blue-600">Break-even age: 65 + 17 = age 82</p>
              <p className="text-sm text-gray-600 mt-2">If you expect to live past 82, annuity pays more. If not, lump sum may be better.</p>
            </div>

            <p className="text-gray-700 mb-4">
              Consider using our{' '}
              <a href="/retirement-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Retirement Calculator
              </a>
              {' '}to model different scenarios and{' '}
              <a href="/401k-calculator" className="text-blue-600 hover:text-blue-800 underline">
                401(k) Calculator
              </a>
              {' '}to compare with defined contribution plans.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Pension vs 401(k) Comparison</h3>
            <p className="text-gray-700 mb-4">
              Understanding the equivalent 401(k) value of your pension helps evaluate your retirement security:
            </p>

            <div className="bg-blue-50 p-4 rounded-lg my-6">
              <p className="text-sm text-gray-700 mb-2"><strong>401(k) Equivalent Formula:</strong></p>
              <p className="font-mono text-sm text-gray-900">401(k) Value = Annual Pension ÷ Safe Withdrawal Rate</p>
              <p className="text-sm text-gray-700 mt-3"><strong>Example:</strong></p>
              <p className="text-sm text-gray-700">Annual pension: $40,000</p>
              <p className="text-sm text-gray-700">Safe withdrawal rate: 4%</p>
              <p className="text-sm font-semibold text-blue-600">401(k) equivalent: $40,000 ÷ 0.04 = $1,000,000</p>
              <p className="text-xs text-gray-600 mt-2">You'd need $1M in a 401(k) to generate $40,000/year safely</p>
            </div>

            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Feature</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Defined Benefit Pension</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">401(k)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Income guarantee</td>
                  <td className="px-6 py-4 text-sm text-green-600">✓ Lifetime guaranteed</td>
                  <td className="px-6 py-4 text-sm text-red-600">✗ Depends on balance & returns</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Investment risk</td>
                  <td className="px-6 py-4 text-sm text-green-600">✓ Employer bears risk</td>
                  <td className="px-6 py-4 text-sm text-red-600">✗ Employee bears risk</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Longevity risk</td>
                  <td className="px-6 py-4 text-sm text-green-600">✓ Protected (can't outlive)</td>
                  <td className="px-6 py-4 text-sm text-red-600">✗ Risk of outliving savings</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Portability</td>
                  <td className="px-6 py-4 text-sm text-red-600">✗ Tied to employer</td>
                  <td className="px-6 py-4 text-sm text-green-600">✓ Goes with you</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Inheritance</td>
                  <td className="px-6 py-4 text-sm text-red-600">✗ Ends at death (usually)</td>
                  <td className="px-6 py-4 text-sm text-green-600">✓ Balance to heirs</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Flexibility</td>
                  <td className="px-6 py-4 text-sm text-red-600">✗ Fixed payments</td>
                  <td className="px-6 py-4 text-sm text-green-600">✓ Withdraw as needed</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">COLA protection</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Some plans</td>
                  <td className="px-6 py-4 text-sm text-red-600">✗ None</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Pension Tax Considerations</h3>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Federal Taxation</h4>
            <p className="text-gray-700 mb-4">
              Pension income is generally fully taxable as ordinary income at your marginal tax rate. However:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>After-tax contributions:</strong> If you made after-tax contributions, a portion is tax-free (use Simplified Method to calculate)</li>
              <li><strong>Withholding:</strong> Federal tax is withheld from payments based on Form W-4P</li>
              <li><strong>Estimated taxes:</strong> May need to make quarterly payments if withholding is insufficient</li>
              <li><strong>Tax planning:</strong> Consider Roth conversions, tax bracket management, and timing of other income</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">State Taxation</h4>
            <p className="text-gray-700 mb-4">
              State treatment of pension income varies significantly. Check our{' '}
              <a href="/tax-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Tax Calculator
              </a>
              {' '}for state-specific calculations.
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
              <li><strong>No income tax states:</strong> AK, FL, NV, SD, TN, TX, WA, WY (pension not taxed)</li>
              <li><strong>No pension tax states:</strong> IL, MS, PA (exempt all pension income)</li>
              <li><strong>Partial exemptions:</strong> Many states exempt first $20K-$50K of pension income for retirees</li>
              <li><strong>Military pensions:</strong> Many states fully exempt military retirement pay</li>
              <li><strong>Age-based exemptions:</strong> Some states increase exemptions at age 62 or 65</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Maximizing Your Pension</h3>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Boost Final Average Salary</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Work overtime:</strong> If pensionable, overtime in final years increases FAS significantly</li>
              <li><strong>Accept promotions:</strong> Higher salary in final years has outsized impact</li>
              <li><strong>Timing:</strong> Understand your plan's FAS period (last 3 vs. highest 3 years)</li>
              <li><strong>Maximize contributions:</strong> Some plans allow purchasing service credits</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Optimize Retirement Timing</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Know your rules:</strong> Understand normal retirement age and early retirement reductions</li>
              <li><strong>Rule of 85/80:</strong> If available, work until you qualify for unreduced benefits</li>
              <li><strong>Bridge to Social Security:</strong> Consider retiring early if pension bridges to age 62-67</li>
              <li><strong>Healthcare coverage:</strong> Ensure health insurance (pre-Medicare age 65)</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Review Beneficiary Designations</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Update regularly:</strong> After marriage, divorce, births, deaths</li>
              <li><strong>Coordinate with spouse:</strong> Discuss joint & survivor vs. single life options</li>
              <li><strong>Consider life insurance:</strong> If taking single life, buy life insurance to protect spouse</li>
              <li><strong>Understand options:</strong> Some plans offer "pop-up" provisions if spouse predeceases you</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Pension Protection and Security</h3>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">PBGC Insurance</h4>
            <p className="text-gray-700 mb-4">
              The Pension Benefit Guaranty Corporation (PBGC) insures private sector defined benefit pensions:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Coverage:</strong> Protects if employer terminates underfunded pension</li>
              <li><strong>Maximum benefit (2024):</strong> $75,420/year for age 65 single life annuity</li>
              <li><strong>Lower at younger ages:</strong> $33,957 at age 55</li>
              <li><strong>Not covered:</strong> State/local government pensions, church plans</li>
              <li><strong>Limitations:</strong> May not cover full benefit if you have high pension</li>
            </ul>

            <p className="text-gray-700 mb-4">
              Learn more at the{' '}
              <a 
                href="https://www.pbgc.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                PBGC website
              </a>
              .
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Public Pension Plans</h4>
            <p className="text-gray-700 mb-4">
              State and local government pensions are not PBGC-insured but are typically well-funded and backed by government taxing authority. However:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
              <li>Check your plan's funded status (should be > 80%)</li>
              <li>Understand benefit guarantees in your state constitution</li>
              <li>Monitor pension reform legislation in your state</li>
              <li>Consider diversifying retirement income (401k, 457, IRA)</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Using This Pension Calculator</h3>
            <p className="text-gray-700 mb-4">
              Our pension calculator provides comprehensive analysis:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Accurate calculations:</strong> Based on standard pension formulas</li>
              <li><strong>Multiple payout options:</strong> Compare single life vs. joint & survivor</li>
              <li><strong>Lump sum analysis:</strong> Break-even age and 401(k) equivalent value</li>
              <li><strong>Tax impact:</strong> Federal and state tax estimates</li>
              <li><strong>COLA projections:</strong> See how inflation protection increases lifetime value</li>
              <li><strong>Visual charts:</strong> Understand income progression over retirement</li>
              <li><strong>Survivor benefits:</strong> Calculate spouse's continuing income</li>
            </ul>

            <p className="text-gray-700 mb-4">
              For comprehensive retirement planning, also use our{' '}
              <a href="/social-security-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Social Security Calculator
              </a>
              {' '}to estimate combined retirement income,{' '}
              <a href="/ira-calculator" className="text-blue-600 hover:text-blue-800 underline">
                IRA Calculator
              </a>
              {' '}for supplemental savings, and{' '}
              <a href="/investment-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Investment Calculator
              </a>
              {' '}to project portfolio growth.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="text-sm text-gray-700">
                <strong>💡 Disclaimer:</strong> This calculator provides estimates for planning purposes. Actual pension benefits depend on your specific plan rules, which can be complex. Always verify calculations with your plan administrator and review your official pension statements. Consult a qualified financial advisor or{' '}
                <a 
                  href="https://www.dol.gov/agencies/ebsa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  EBSA
                </a>
                {' '}for personalized retirement planning advice.
              </p>
            </div>
          </div>
        </section>

        {/* Related Calculators Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a 
              href="/retirement-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">🏖️</div>
              <h3 className="font-semibold text-gray-900">Retirement Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Plan your retirement savings</p>
            </a>
            
            <a 
              href="/social-security-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">👴</div>
              <h3 className="font-semibold text-gray-900">Social Security Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Estimate Social Security benefits</p>
            </a>
            
            <a 
              href="/401k-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900">401(k) Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate 401(k) retirement savings</p>
            </a>
            
            <a 
              href="/ira-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">🏦</div>
              <h3 className="font-semibold text-gray-900">IRA Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Compare Traditional vs Roth IRA</p>
            </a>

            <a 
              href="/investment-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900">Investment Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Project investment growth</p>
            </a>
            
            <a 
              href="/tax-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">💼</div>
              <h3 className="font-semibold text-gray-900">Tax Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Estimate federal and state tax</p>
            </a>
            
            <a 
              href="/payroll-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-semibold text-gray-900">Payroll Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate payroll and net pay</p>
            </a>
            
            <a 
              href="/estate-tax-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">🏛️</div>
              <h3 className="font-semibold text-gray-900">Estate Tax Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate estate tax liability</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

