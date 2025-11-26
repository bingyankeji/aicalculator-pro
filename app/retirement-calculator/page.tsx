import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { RetirementCalculator } from '@/components/Calculator/RetirementCalculator';
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
  title: "Retirement Calculator (Free, No signup) - Plan Ahead | AICalculator",
  description: "Free retirement calculator with no sign-up required. Plan your retirement with our comprehensive retirement calculator. Calculate retirement savings needs, analyze income gaps, optimize contributions, and ensure financial security. Free retirement planning tool with Social Security and pension integration.",
  keywords: [
    "retirement calculator", 
    "free retirement calculator",
    "retirement calculator no signup",
    "retirement planning calculator", 
    "retirement savings calculator", 
    "401k calculator", 
    "retirement income calculator", 
    "how much do I need to retire", 
    "retirement gap analysis", 
    "retirement planner", 
    "social security calculator", 
    "pension calculator", 
    "retirement age calculator", 
    "early retirement calculator",
    "retirement nest egg calculator",
    "retirement withdrawal calculator",
    "retirement planning tool",
    "retirement savings goal",
    "retirement investment calculator",
    "retirement budget calculator",
    "retirement readiness calculator",
    "retirement fund calculator",
    "retirement estimator",
    "retirement projection calculator"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Retirement Calculator (Free, No signup) - AICalculator",
    description: "Free retirement calculator with no sign-up required. Calculate retirement savings needs with gap analysis. Plan for Social Security, pensions, and investment returns.",
    type: "website",
    url: getUrl('/retirement-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('retirement'),
        width: 1200,
        height: 630,
        alt: 'Free Retirement Calculator - No Sign-up Required',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retirement Calculator (Free, No signup) - AICalculator",
    description: "Free retirement calculator with no sign-up required. Comprehensive retirement planning with gap analysis, Social Security, and pension integration.",
    images: [getOgImage('retirement')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/retirement-calculator'),
  },
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
  other: {
    'last-modified': new Date().toISOString(),
  },
};

export default function RetirementCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": getWebAppId('/retirement-calculator'),
        "name": "Retirement Calculator",
        "url": getUrl('/retirement-calculator'),
        "description": "Free comprehensive retirement calculator to plan retirement savings, analyze income gaps, optimize contributions, and ensure financial security with Social Security and pension integration.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Retirement savings projection",
          "Income gap analysis",
          "Social Security integration",
          "Pension calculator",
          "401k planning",
          "Employer match calculation",
          "Inflation adjustment",
          "4% withdrawal rule",
          "Contribution optimization",
          "Visual growth charts",
          "Share and export results"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/retirement-calculator'),
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": getUrl('/')
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Financial",
            "item": getUrl('/financial')
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Retirement Calculator",
            "item": getUrl('/retirement-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/retirement-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much do I need to retire comfortably?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A common rule of thumb is to plan for 70-80% of your pre-retirement income annually in retirement. More precisely, use the 25x rule: multiply your desired annual retirement spending by 25. For example, if you want $60,000/year in retirement, you need $1.5 million saved ($60,000 × 25). This is based on the 4% withdrawal rule - withdrawing 4% of your portfolio annually (adjusted for inflation) should last 30+ years. Factor in Social Security (average $1,800/month) and any pensions. If you want $5,000/month total and Social Security provides $1,800, you need savings to generate $3,200/month, requiring ~$960,000 in retirement accounts."
            }
          },
          {
            "@type": "Question",
            "name": "What is the 4% rule for retirement?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The 4% rule is a retirement withdrawal strategy stating you can withdraw 4% of your retirement portfolio in the first year, then adjust that dollar amount for inflation each subsequent year, with a high probability of not running out of money for 30 years. Created from the Trinity Study analyzing historical market returns, it assumes a balanced portfolio (50-75% stocks, 25-50% bonds). Example: $1 million portfolio allows $40,000 first year withdrawal. Year 2, if inflation is 3%, withdraw $41,200. The rule is conservative - many retirees end with more than they started. Modern variations suggest 3.5% for longer retirements (35+ years) or 5% for shorter periods (20 years)."
            }
          },
          {
            "@type": "Question",
            "name": "How much should I contribute to my 401k?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Financial experts recommend contributing 15% of gross income to retirement accounts (401k, IRA, etc.). Minimum: contribute enough to get full employer match - this is free money with 50-100% instant return. For 2024, 401k contribution limits are $23,000 (<50 years old) or $30,500 (50+). Ideal strategy: 1) Contribute to get full employer match, 2) Max out Roth IRA ($6,500 or $7,500 if 50+), 3) Return to 401k and increase until hitting 15% total or account max. If you start late (40s), aim for 20-25%. If behind on retirement savings, use catch-up contributions after age 50. Even increasing contributions by 1% per year can significantly impact retirement savings."
            }
          },
          {
            "@type": "Question",
            "name": "When can I retire with full Social Security benefits?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Full Retirement Age (FRA) for Social Security depends on birth year: Born 1943-1954: Age 66, Born 1955: Age 66 and 2 months, Born 1956: Age 66 and 4 months, Born 1957: Age 66 and 6 months, Born 1958: Age 66 and 8 months, Born 1959: Age 66 and 10 months, Born 1960 or later: Age 67. You can claim as early as 62, but benefits are reduced 25-30%. Waiting until 70 increases benefits by 8% per year past FRA (up to 32% increase total). Strategy: If healthy with family longevity, waiting until 70 maximizes lifetime benefits. If you need income or have health concerns, claiming at 62-65 may be better. Break-even analysis shows waiting pays off if you live past ~78-80."
            }
          },
          {
            "@type": "Question",
            "name": "What is the average retirement savings by age?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Average US retirement savings by age (Fidelity/Vanguard data): Age 20-29: $10,000-15,000, Age 30-39: $50,000-60,000, Age 40-49: $120,000-135,000, Age 50-59: $200,000-250,000, Age 60-69: $280,000-340,000. However, recommended targets are higher: Age 30: 1x annual salary, Age 40: 3x annual salary, Age 50: 6x annual salary, Age 60: 8x annual salary, Age 67: 10x annual salary. For example, if you earn $75,000 at age 40, you should have ~$225,000 saved. Many Americans are behind these targets. If you're behind, don't panic - increase contributions, delay retirement slightly, or reduce retirement expenses. Starting now is more important than starting perfectly."
            }
          },
          {
            "@type": "Question",
            "name": "Should I choose Traditional or Roth 401k?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Traditional 401k: Contributions are pre-tax (reduces current taxable income), grows tax-deferred, withdrawals taxed as ordinary income. Best if: you're in high tax bracket now, expect lower bracket in retirement, need current tax deduction. Roth 401k: Contributions are after-tax (no current deduction), grows tax-free, withdrawals are tax-free. Best if: you're in low/moderate tax bracket now, expect higher bracket in retirement, young with decades of tax-free growth, want tax diversification. Many experts recommend Roth for younger workers (<40) since tax-free growth compounds for decades. If your employer matches, the match always goes to Traditional 401k regardless of your choice. Ideal strategy: split contributions 50/50 for tax diversification, giving flexibility in retirement to manage tax brackets."
            }
          },
          {
            "@type": "Question",
            "name": "Can I retire early at 55?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Early retirement at 55 is possible but requires careful planning: Financial requirements: Need 30+ years of expenses saved (vs 20-25 for age 65 retirement). Use 3.5% withdrawal rule instead of 4% for longer timeframe. Calculate: annual expenses × 28.5 = amount needed. Healthcare: Major challenge - Medicare doesn't start until 65. Budget $700-1,500/month for private insurance or ACA marketplace plans. Early withdrawal penalties: 401k/IRA withdrawals before 59½ incur 10% penalty (exceptions: 55 rule for 401k, 72(t) SEPP distributions, Roth contributions). Social Security: Can't claim until 62, and taking at 62 reduces benefits 25-30% for life. Strategies for success: 1) Have taxable brokerage account for ages 55-59, 2) Build large Roth IRA ladder, 3) Maximize HSA for healthcare, 4) Consider part-time work to bridge gap."
            }
          },
          {
            "@type": "Question",
            "name": "How do I catch up on retirement savings if I started late?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If you're behind on retirement savings (starting in 40s-50s), use these catch-up strategies: 1) Maximize contributions: Use catch-up contributions after age 50 ($7,500 extra for 401k, $1,000 for IRA in 2024). Aim to save 20-30% of income. 2) Delay retirement: Working 3-5 extra years dramatically improves retirement security - more savings time, more compound growth, shorter retirement to fund, higher Social Security. 3) Reduce expenses: Downsize home, relocate to low-cost area, eliminate debt before retirement. 4) Increase income: Side hustles, freelancing, delayed claiming of Social Security (wait until 70 for 32% higher benefits). 5) Optimize investments: Ensure proper asset allocation for growth while managing risk. 6) Consider part-time work in retirement: Even $1,000-2,000/month reduces portfolio withdrawal needs significantly. Remember: starting now is better than waiting. Even aggressive saving for 10-15 years can build substantial nest egg."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/retirement-calculator'),
        "name": "How to Plan Your Retirement",
        "description": "Calculate retirement savings needs and create a comprehensive retirement plan in 4 steps",
        "totalTime": "PT10M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": {
          "@type": "HowToTool",
          "name": "Retirement Calculator"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Personal Information",
            "text": "Input your current age, desired retirement age (typically 65-67), and life expectancy (plan for 85-90 to be safe). These determine your savings timeline and retirement duration.",
            "url": getStepUrl('/retirement-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Input Current Savings and Contributions",
            "text": "Enter your current retirement savings across all accounts (401k, IRA, etc.). Add your monthly contribution amount and employer match. Always contribute enough to get full employer match - it's free money with immediate 50-100% return.",
            "url": getStepUrl('/retirement-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Set Investment and Economic Assumptions",
            "text": "Enter expected annual investment return (historical average: 7-10% for stocks, 3-5% for bonds, use 7% for balanced portfolio). Set inflation rate (historical average: 2-3%). These affect future value calculations.",
            "url": getStepUrl('/retirement-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Define Retirement Income Needs",
            "text": "Enter desired monthly income in today's dollars (rule of thumb: 70-80% of current income). Add expected Social Security (check SSA.gov for estimate) and any pension. The calculator will show if you're on track and how much extra to save if there's a gap.",
            "url": getStepUrl('/retirement-calculator', 4)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/retirement-calculator'),
        "headline": "Retirement Calculator - Complete Guide to Retirement Planning",
        "description": "Comprehensive guide to retirement planning with free calculator. Learn how much you need to retire, understand the 4% rule, optimize Social Security, and create a retirement savings strategy.",
        "author": {
          "@type": "Organization",
          "name": "AICalculator.pro",
          "url": getUrl('/')
        },
        "publisher": {
          "@type": "Organization",
          "name": "AICalculator.pro",
          "logo": {
            "@type": "ImageObject",
            "url": getUrl('/logo.png')
          }
        },
        "datePublished": "2025-11-16",
        "dateModified": "2025-11-16",
        "image": getOgImage('retirement'),
        "articleBody": "Retirement planning requires careful calculation of savings needs, investment returns, and income sources. Use our calculator to determine if you're on track for retirement, analyze income gaps, and optimize your savings strategy with Social Security and pension integration."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <h1 className="sr-only">Retirement Calculator - Free Comprehensive Retirement Planning Calculator with Income Gap Analysis and Social Security Integration</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Retirement Calculator (Free, No signup)"
        calculatorUrl="/retirement-calculator"
      />

      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <RetirementCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Complete Guide to Retirement Planning
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding Retirement Savings</h3>
                <p className="text-gray-700 mb-4">
                  Retirement planning is about ensuring you have enough money to maintain your desired lifestyle after you stop working. The earlier you start, the more time compound interest has to grow your wealth.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Key principle:</strong> Save 15% of gross income throughout your career. If you earn $75,000, that's $11,250 annually or ~$940/month. Combined with employer match and compound returns, this typically provides comfortable retirement.
                </p>
                <p className="text-gray-700">
                  The power of starting early is dramatic: Saving $500/month from age 25-65 at 7% return = $1.3 million. Starting at 35 = $612,000. Starting at 45 = $255,000. The first 10 years of saving are worth more than the last 20 years!
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">The 4% Withdrawal Rule</h3>
                <p className="text-gray-700 mb-4">
                  The 4% rule is the cornerstone of retirement planning. It states you can withdraw 4% of your retirement portfolio in the first year, then adjust for inflation annually, with 95% confidence your money will last 30+ years.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="font-semibold text-gray-900 mb-2">Example Calculation:</div>
                  <div className="text-sm space-y-1 text-gray-700">
                    <div>Retirement portfolio: $1,000,000</div>
                    <div>Year 1 withdrawal: $40,000 (4%)</div>
                    <div>If inflation is 3%:</div>
                    <div>Year 2 withdrawal: $41,200</div>
                    <div>Year 3 withdrawal: $42,436</div>
                    <div className="pt-2 border-t border-blue-300 font-semibold">
                      Portfolio should last 30+ years
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  This rule is based on the Trinity Study analyzing historical market returns from 1925-1995. It assumes a balanced portfolio (50-75% stocks, 25-50% bonds) and accounts for worst-case scenarios including the Great Depression and 1970s stagflation.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Social Security Strategy</h3>
                <p className="text-gray-700 mb-4">
                  Social Security provides ~40% of pre-retirement income for average earners. Timing when you claim significantly impacts lifetime benefits.
                </p>
                <div className="space-y-3 mb-4">
                  <div className="bg-red-50 rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-900 mb-1">Claim at 62 (Early)</div>
                    <div className="text-xs text-gray-700">Benefits reduced 25-30% permanently. Best if: you need income now, poor health, or no family longevity.</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-900 mb-1">Claim at 66-67 (Full Retirement Age)</div>
                    <div className="text-xs text-gray-700">100% of calculated benefit. Balanced approach for most people.</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-900 mb-1">Claim at 70 (Delayed)</div>
                    <div className="text-xs text-gray-700">Benefits increased 24-32% permanently (8% per year). Best if: healthy, working, have savings, or family longevity.</div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Break-even analysis shows waiting until 70 pays off if you live past ~80. Get your estimate at <a href="https://www.ssa.gov/myaccount/" target="_blank" rel="noopener" className="text-blue-600 underline">SSA.gov</a>.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Retirement Account Types</h3>
                <p className="text-gray-700 mb-4">
                  Understanding different retirement accounts helps optimize tax benefits:
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900">401(k) / 403(b) (Employer Plans)</div>
                    <div className="text-gray-700 ml-3 text-xs mt-1">
                      • 2024 limit: $23,000 ($30,500 if 50+)<br/>
                      • Employer match (typically 3-6% of salary)<br/>
                      • Traditional (pre-tax) or Roth (after-tax)<br/>
                      • Loans available from some plans<br/>
                      • Required Minimum Distributions (RMDs) at 73
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Traditional IRA</div>
                    <div className="text-gray-700 ml-3 text-xs mt-1">
                      • 2024 limit: $7,000 ($8,000 if 50+)<br/>
                      • Tax deduction if income qualifies<br/>
                      • Tax-deferred growth<br/>
                      • Withdrawals taxed as ordinary income<br/>
                      • RMDs at 73
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Roth IRA</div>
                    <div className="text-gray-700 ml-3 text-xs mt-1">
                      • Same limits as Traditional IRA<br/>
                      • No tax deduction, but tax-free growth<br/>
                      • Tax-free withdrawals in retirement<br/>
                      • No RMDs - can pass to heirs<br/>
                      • Income limits apply ($153K-$161K single)
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Health Savings Account (HSA)</div>
                    <div className="text-gray-700 ml-3 text-xs mt-1">
                      • Triple tax advantage (deduct, grow, withdraw tax-free)<br/>
                      • 2024 limit: $4,150 (individual), $8,300 (family)<br/>
                      • Requires high-deductible health plan<br/>
                      • Can be used as extra retirement account after 65
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Asset Allocation by Age</h3>
                <p className="text-gray-700 mb-4">
                  Your investment mix should shift from growth to stability as you age:
                </p>
                <div className="space-y-3">
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-900 mb-2">Ages 20-40 (Aggressive Growth)</div>
                    <div className="text-xs text-gray-700 space-y-1">
                      <div className="flex justify-between">
                        <span>Stocks:</span>
                        <span className="font-semibold">80-90%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bonds:</span>
                        <span className="font-semibold">10-20%</span>
                      </div>
                      <p className="pt-2">Time to recover from downturns. Focus on growth.</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-900 mb-2">Ages 40-60 (Moderate)</div>
                    <div className="text-xs text-gray-700 space-y-1">
                      <div className="flex justify-between">
                        <span>Stocks:</span>
                        <span className="font-semibold">60-70%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bonds:</span>
                        <span className="font-semibold">30-40%</span>
                      </div>
                      <p className="pt-2">Balance growth with stability. Peak earning years.</p>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-900 mb-2">Ages 60+ (Conservative)</div>
                    <div className="text-xs text-gray-700 space-y-1">
                      <div className="flex justify-between">
                        <span>Stocks:</span>
                        <span className="font-semibold">40-60%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bonds:</span>
                        <span className="font-semibold">40-60%</span>
                      </div>
                      <p className="pt-2">Preserve capital. Still need growth to outpace inflation.</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  <strong>Rule of thumb:</strong> Stocks = 110 - Your Age. At 40, that's 70% stocks, 30% bonds.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Common Retirement Mistakes</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-red-50 border-l-4 border-red-500 p-3">
                    <div className="font-semibold text-gray-900 mb-1">❌ Not Getting Full Employer Match</div>
                    <p className="text-xs text-gray-700">This is literally leaving free money on the table. If employer matches 50% up to 6%, and you contribute 3%, you're missing 1.5% free.</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-500 p-3">
                    <div className="font-semibold text-gray-900 mb-1">❌ Cashing Out 401k When Changing Jobs</div>
                    <p className="text-xs text-gray-700">$50K withdrawn at age 35: lose $5K penalty, $12K taxes, and $400K+ in lost growth by age 65.</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-500 p-3">
                    <div className="font-semibold text-gray-900 mb-1">❌ Underestimating Retirement Duration</div>
                    <p className="text-xs text-gray-700">Retiring at 65, living to 90 = 25 years to fund. Plan conservatively for longevity.</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-500 p-3">
                    <div className="font-semibold text-gray-900 mb-1">❌ Ignoring Healthcare Costs</div>
                    <p className="text-xs text-gray-700">Average couple spends $315,000 on healthcare in retirement (Fidelity estimate). Factor this in!</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-500 p-3">
                    <div className="font-semibold text-gray-900 mb-1">❌ All Eggs in One Basket</div>
                    <p className="text-xs text-gray-700">Don't keep everything in company stock or one asset class. Diversification reduces risk.</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-500 p-3">
                    <div className="font-semibold text-gray-900 mb-1">❌ Retiring with Debt</div>
                    <p className="text-xs text-gray-700">Mortgage, car loans, credit cards drain retirement income. Aim to be debt-free by retirement.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Retirement Savings Milestones */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Retirement Savings Milestones by Age</h3>
              <p className="text-gray-700 mb-4">
                Use these benchmarks to check if you're on track. These assume you want to maintain your current lifestyle in retirement:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Age</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">Target Savings</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">What This Means</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Action if Behind</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-semibold">30</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-bold">1x salary</td>
                      <td className="px-4 py-3 text-xs">If you earn $60K, have $60K saved</td>
                      <td className="px-4 py-3 text-xs">Max employer match, open Roth IRA</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold">35</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-bold">2x salary</td>
                      <td className="px-4 py-3 text-xs">$60K salary = $120K saved</td>
                      <td className="px-4 py-3 text-xs">Increase contributions to 15%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">40</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-bold">3x salary</td>
                      <td className="px-4 py-3 text-xs">$60K salary = $180K saved</td>
                      <td className="px-4 py-3 text-xs">Cut expenses, increase income</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold">45</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-bold">4x salary</td>
                      <td className="px-4 py-3 text-xs">$60K salary = $240K saved</td>
                      <td className="px-4 py-3 text-xs">Save 20%+, delay retirement 2-3 yrs</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">50</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-bold">6x salary</td>
                      <td className="px-4 py-3 text-xs">$60K salary = $360K saved</td>
                      <td className="px-4 py-3 text-xs">Max out 401k + catch-up contributions</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold">55</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-bold">7x salary</td>
                      <td className="px-4 py-3 text-xs">$60K salary = $420K saved</td>
                      <td className="px-4 py-3 text-xs">Aggressive saving, reduce expenses</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">60</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-bold">8x salary</td>
                      <td className="px-4 py-3 text-xs">$60K salary = $480K saved</td>
                      <td className="px-4 py-3 text-xs">Work longer, part-time in retirement</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="px-4 py-3 font-semibold">67</td>
                      <td className="px-4 py-3 text-center text-green-600 font-bold">10x salary</td>
                      <td className="px-4 py-3 text-xs">$60K salary = $600K saved</td>
                      <td className="px-4 py-3 text-xs">Ready to retire comfortably!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                Source: Fidelity Investments retirement savings guidelines. These are recommendations, not requirements. Your target may vary based on lifestyle, Social Security, pensions, and retirement age.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How much do I need to retire comfortably?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      A common rule of thumb is to plan for 70-80% of your pre-retirement income annually in retirement. More precisely, use the 25x rule: multiply your desired annual retirement spending by 25. For example, if you want $60,000/year in retirement, you need $1.5 million saved ($60,000 × 25). This is based on the 4% withdrawal rule - withdrawing 4% of your portfolio annually (adjusted for inflation) should last 30+ years. Factor in Social Security (average $1,800/month) and any pensions. If you want $5,000/month total and Social Security provides $1,800, you need savings to generate $3,200/month, requiring ~$960,000 in retirement accounts.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What is the 4% rule for retirement?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      The 4% rule is a retirement withdrawal strategy stating you can withdraw 4% of your retirement portfolio in the first year, then adjust that dollar amount for inflation each subsequent year, with a high probability of not running out of money for 30 years. Created from the Trinity Study analyzing historical market returns, it assumes a balanced portfolio (50-75% stocks, 25-50% bonds). Example: $1 million portfolio allows $40,000 first year withdrawal. Year 2, if inflation is 3%, withdraw $41,200. The rule is conservative - many retirees end with more than they started. Modern variations suggest 3.5% for longer retirements (35+ years) or 5% for shorter periods (20 years).
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How much should I contribute to my 401k?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Financial experts recommend contributing 15% of gross income to retirement accounts (401k, IRA, etc.). Minimum: contribute enough to get full employer match - this is free money with 50-100% instant return. For 2024, 401k contribution limits are $23,000 (&lt;50 years old) or $30,500 (50+). Ideal strategy: 1) Contribute to get full employer match, 2) Max out Roth IRA ($6,500 or $7,500 if 50+), 3) Return to 401k and increase until hitting 15% total or account max. If you start late (40s), aim for 20-25%. If behind on retirement savings, use catch-up contributions after age 50. Even increasing contributions by 1% per year can significantly impact retirement savings.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    When can I retire with full Social Security benefits?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Full Retirement Age (FRA) for Social Security depends on birth year: Born 1943-1954: Age 66, Born 1955: Age 66 and 2 months, Born 1956: Age 66 and 4 months, Born 1957: Age 66 and 6 months, Born 1958: Age 66 and 8 months, Born 1959: Age 66 and 10 months, Born 1960 or later: Age 67. You can claim as early as 62, but benefits are reduced 25-30%. Waiting until 70 increases benefits by 8% per year past FRA (up to 32% increase total). Strategy: If healthy with family longevity, waiting until 70 maximizes lifetime benefits. If you need income or have health concerns, claiming at 62-65 may be better. Break-even analysis shows waiting pays off if you live past ~78-80.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What is the average retirement savings by age?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Average US retirement savings by age (Fidelity/Vanguard data): Age 20-29: $10,000-15,000, Age 30-39: $50,000-60,000, Age 40-49: $120,000-135,000, Age 50-59: $200,000-250,000, Age 60-69: $280,000-340,000. However, recommended targets are higher: Age 30: 1x annual salary, Age 40: 3x annual salary, Age 50: 6x annual salary, Age 60: 8x annual salary, Age 67: 10x annual salary. For example, if you earn $75,000 at age 40, you should have ~$225,000 saved. Many Americans are behind these targets. If you're behind, don't panic - increase contributions, delay retirement slightly, or reduce retirement expenses. Starting now is more important than starting perfectly.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Should I choose Traditional or Roth 401k?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Traditional 401k: Contributions are pre-tax (reduces current taxable income), grows tax-deferred, withdrawals taxed as ordinary income. Best if: you're in high tax bracket now, expect lower bracket in retirement, need current tax deduction. Roth 401k: Contributions are after-tax (no current deduction), grows tax-free, withdrawals are tax-free. Best if: you're in low/moderate tax bracket now, expect higher bracket in retirement, young with decades of tax-free growth, want tax diversification. Many experts recommend Roth for younger workers (&lt;40) since tax-free growth compounds for decades. If your employer matches, the match always goes to Traditional 401k regardless of your choice. Ideal strategy: split contributions 50/50 for tax diversification, giving flexibility in retirement to manage tax brackets.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Can I retire early at 55?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Early retirement at 55 is possible but requires careful planning: Financial requirements: Need 30+ years of expenses saved (vs 20-25 for age 65 retirement). Use 3.5% withdrawal rule instead of 4% for longer timeframe. Calculate: annual expenses × 28.5 = amount needed. Healthcare: Major challenge - Medicare doesn't start until 65. Budget $700-1,500/month for private insurance or ACA marketplace plans. Early withdrawal penalties: 401k/IRA withdrawals before 59½ incur 10% penalty (exceptions: 55 rule for 401k, 72(t) SEPP distributions, Roth contributions). Social Security: Can't claim until 62, and taking at 62 reduces benefits 25-30% for life. Strategies for success: 1) Have taxable brokerage account for ages 55-59, 2) Build large Roth IRA ladder, 3) Maximize HSA for healthcare, 4) Consider part-time work to bridge gap.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How do I catch up on retirement savings if I started late?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      If you're behind on retirement savings (starting in 40s-50s), use these catch-up strategies: 1) Maximize contributions: Use catch-up contributions after age 50 ($7,500 extra for 401k, $1,000 for IRA in 2024). Aim to save 20-30% of income. 2) Delay retirement: Working 3-5 extra years dramatically improves retirement security - more savings time, more compound growth, shorter retirement to fund, higher Social Security. 3) Reduce expenses: Downsize home, relocate to low-cost area, eliminate debt before retirement. 4) Increase income: Side hustles, freelancing, delayed claiming of Social Security (wait until 70 for 32% higher benefits). 5) Optimize investments: Ensure proper asset allocation for growth while managing risk. 6) Consider part-time work in retirement: Even $1,000-2,000/month reduces portfolio withdrawal needs significantly. Remember: starting now is better than waiting. Even aggressive saving for 10-15 years can build substantial nest egg.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/401k-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">401k Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate 401k growth and tax benefits</p>
                </a>
                <a href="/savings-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Savings Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate future savings with compound interest</p>
                </a>
                <a href="/investment-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Investment Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Compare lump sum vs dollar-cost averaging</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

