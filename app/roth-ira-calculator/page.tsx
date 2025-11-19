import React from 'react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { Metadata } from 'next';
import RothIRACalculator from '@/components/Calculator/RothIRACalculator';
import Link from 'next/link';
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

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Roth IRA Calculator (Free, No signup) - Retirement | AICalculator',
  description: 'Free Roth IRA calculator with no sign-up required. Calculate Roth IRA tax-free retirement savings, contribution limits, MAGI eligibility, compound growth, and compare Roth vs Traditional IRA. With backdoor Roth analysis.',
  keywords: [
    'roth ira calculator',
    'free roth ira calculator',
    'roth ira calculator no signup',
    'roth ira contribution calculator',
    'roth ira eligibility calculator',
    'roth ira vs traditional ira calculator',
    'roth ira growth calculator',
    'roth ira retirement calculator',
    'roth ira compound interest calculator',
    'roth ira contribution limits 2024',
    'roth ira MAGI calculator',
    'backdoor roth ira calculator',
    'roth ira conversion calculator',
    'roth ira tax calculator',
    'roth ira savings calculator',
    'roth ira investment calculator',
    'roth ira withdrawal calculator',
    'roth ira comparison calculator',
    'roth ira planning calculator',
    'roth ira benefit calculator',
    'tax-free retirement calculator',
    'roth ira phase out calculator',
    'roth ira catch up contribution',
    'mega backdoor roth calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
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
  alternates: {
    canonical: getUrl('/roth-ira-calculator'),
  },
  openGraph: {
    title: 'Roth IRA Calculator (Free, No signup) - AICalculator',
    description: 'Free Roth IRA calculator with no sign-up required. Calculate Roth IRA tax-free retirement savings, contribution limits, MAGI eligibility, and compare Roth vs Traditional IRA.',
    url: getUrl('/roth-ira-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: getOgImage('roth-ira'),
        width: 1200,
        height: 630,
        alt: 'Roth IRA Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roth IRA Calculator (Free, No signup) - AICalculator',
    description: 'Free Roth IRA calculator with no sign-up required. Calculate Roth IRA tax-free retirement savings, contribution limits, and compare Roth vs Traditional IRA.',
    images: [getOgImage('roth-ira')],
    creator: '@aicalculator',
  },
};

export default function RothIRACalculatorPage() {
  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // WebApplication Schema
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/roth-ira-calculator'),
        name: 'Roth IRA Calculator',
        url: getUrl('/roth-ira-calculator'),
        description: 'Professional Roth IRA calculator to calculate tax-free retirement savings, contribution limits, MAGI eligibility, compound growth projections, and compare Roth vs Traditional IRA strategies.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Roth IRA Contribution Calculator',
          'MAGI Eligibility Check',
          'Contribution Limit Calculator (2024)',
          'Tax-Free Growth Projection',
          'Compound Interest Calculator',
          'Roth vs Traditional IRA Comparison',
          'Backdoor Roth IRA Analysis',
          'Catch-Up Contribution Calculator (Age 50+)',
          'Withdrawal Tax Savings Calculator',
          'Retirement Income Projection',
        ],
      },
      // BreadcrumbList Schema
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/roth-ira-calculator'),
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: getUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Financial Calculators',
            item: getUrl('/financial'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Roth IRA Calculator',
            item: getUrl('/roth-ira-calculator'),
          },
        ],
      },
      // FAQPage Schema
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/roth-ira-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a Roth IRA and how does it work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A Roth IRA (Individual Retirement Account) is a retirement savings account where you contribute after-tax money, and all future withdrawals in retirement are completely tax-free. Unlike Traditional IRA where you get a tax deduction now but pay taxes later, Roth IRA works in reverse: you pay taxes now but enjoy tax-free growth and tax-free withdrawals forever. Key benefits: 1) Tax-free growth - your investments grow without any tax drag, 2) Tax-free withdrawals - at age 59.5+ you can withdraw all money tax-free, 3) No Required Minimum Distributions (RMDs) - you never have to withdraw if you do not want to, 4) Flexibility - you can withdraw contributions (not earnings) anytime without penalty, 5) Estate planning - pass tax-free wealth to heirs. Example: If you contribute $7,000 annually for 30 years earning 8% returns, you will have $850,000+ completely tax-free in retirement. In a taxable account at 24% tax rate, you would owe $200,000+ in taxes on the gains.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the Roth IRA contribution limits for 2024?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '2024 Roth IRA contribution limits: $7,000 if you are under age 50, $8,000 if you are age 50 or older (includes $1,000 catch-up contribution). However, these limits phase out at higher income levels based on your Modified Adjusted Gross Income (MAGI): Single filers: Full contribution if MAGI is under $146,000, Partial contribution if MAGI is $146,000-$161,000, No contribution if MAGI is over $161,000. Married filing jointly: Full contribution if MAGI is under $230,000, Partial contribution if MAGI is $230,000-$240,000, No contribution if MAGI is over $240,000. Partial contribution formula: Maximum contribution times (Phase-out limit minus Your MAGI) divided by Phase-out range. Example: Single filer with $150,000 MAGI can contribute $7,000 times ($161,000 minus $150,000) divided by $15,000 equals $5,133. If you exceed income limits, consider Backdoor Roth IRA strategy.',
            },
          },
          {
            '@type': 'Question',
            name: 'Should I choose Roth IRA or Traditional IRA?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Choose Roth IRA if: 1) You expect to be in a higher tax bracket in retirement (most young professionals), 2) You want tax-free withdrawals and no RMDs, 3) You are young with decades for tax-free growth, 4) You have already maxed out pre-tax 401k contributions, 5) You want flexibility to withdraw contributions if needed, 6) You want to leave tax-free inheritance to heirs. Choose Traditional IRA if: 1) You need immediate tax deduction to reduce current taxes, 2) You expect to be in a lower tax bracket in retirement, 3) You are close to retirement with less time for growth, 4) Your income is too high for Roth (consider Backdoor Roth instead), 5) You want to maximize current tax savings. Example comparison: $7,000 annual contribution for 30 years at 8% return. Roth IRA: Pay taxes now (24% bracket means $1,680 in taxes), Accumulate $850,000 tax-free, Withdraw $850,000 tax-free in retirement, Net benefit: $850,000. Traditional IRA: Save $1,680 in taxes now, Accumulate $850,000 tax-deferred, Pay taxes in retirement (assume 24% bracket means $204,000 in taxes), Net benefit: $646,000 plus $1,680 tax savings. Roth wins by $200,000+ if tax rates stay the same or increase.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a Backdoor Roth IRA and how does it work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Backdoor Roth IRA is a legal strategy for high-income earners who exceed Roth IRA income limits to still get money into a Roth IRA. How it works: 1) Contribute to Traditional IRA (no income limits for contributions, just deductibility), 2) Immediately convert Traditional IRA to Roth IRA (no income limits for conversions), 3) Pay taxes on any earnings during the brief period between contribution and conversion (usually minimal). Example: You earn $300,000 (above Roth limit). Step 1: Contribute $7,000 to non-deductible Traditional IRA. Step 2: Immediately convert $7,000 to Roth IRA. Step 3: Pay taxes on any growth (if it grew to $7,050, pay taxes on $50). Result: You now have $7,000 in Roth IRA growing tax-free forever. Important considerations: 1) Pro-rata rule: If you have existing pre-tax Traditional IRA balances, conversions are partially taxable, 2) Timing: Do contribution and conversion in same tax year, 3) Documentation: Keep records showing non-deductible contribution, 4) Mega Backdoor Roth: If your 401k allows, you can contribute up to $46,000 additional via after-tax 401k contributions and in-plan conversions.',
            },
          },
          {
            '@type': 'Question',
            name: 'When can I withdraw from my Roth IRA without penalty?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Roth IRA withdrawal rules are more flexible than Traditional IRA: Contributions: Can withdraw anytime, any age, tax-free and penalty-free (you already paid taxes on this money). Earnings: Must meet two requirements for tax-free and penalty-free withdrawal: 1) Age 59.5 or older, AND 2) Account open for at least 5 years. Exceptions allowing early withdrawal of earnings without 10% penalty (but still owe taxes): 1) First-time home purchase (up to $10,000 lifetime), 2) Qualified education expenses, 3) Birth or adoption expenses (up to $5,000), 4) Disability, 5) Death (beneficiaries), 6) Substantially equal periodic payments (SEPP), 7) Unreimbursed medical expenses exceeding 7.5% of AGI, 8) Health insurance premiums while unemployed. Example: You contributed $50,000 over 10 years, account grew to $80,000. You can withdraw $50,000 anytime tax-free and penalty-free. The $30,000 in earnings can only be withdrawn tax-free and penalty-free after age 59.5 and 5-year rule. Before that, earnings withdrawal triggers taxes plus 10% penalty (unless exception applies).',
            },
          },
          {
            '@type': 'Question',
            name: 'How much will my Roth IRA be worth at retirement?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Roth IRA value depends on: contribution amount, years until retirement, and investment return. Examples assuming 8% annual return: Age 25, retire at 65 (40 years): $7,000 annual contribution grows to $2,000,000+ tax-free. Age 30, retire at 65 (35 years): $7,000 annual contribution grows to $1,300,000+ tax-free. Age 40, retire at 65 (25 years): $7,000 annual contribution grows to $550,000+ tax-free. Age 50, retire at 65 (15 years): $8,000 annual contribution grows to $220,000+ tax-free. The power of compound growth: A 25-year-old contributing $7,000 annually will contribute $280,000 total but end up with $2,000,000+ - that is $1,720,000 in tax-free growth! At 24% tax rate, that saves $413,000 in taxes compared to taxable account. Factors affecting returns: 1) Asset allocation (stocks vs bonds), 2) Investment fees (use low-cost index funds), 3) Market performance (8% is historical average), 4) Contribution consistency (automate contributions), 5) Starting early (compound growth is exponential). Use our calculator to see your personalized projection based on your age, contribution amount, and expected returns.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I have both a Roth IRA and a 401(k)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can and should contribute to both if possible. They have separate contribution limits: 401(k) limit (2024): $23,000 (under 50) or $30,500 (50+), Roth IRA limit (2024): $7,000 (under 50) or $8,000 (50+). Total possible retirement savings: $30,000 (under 50) or $38,500 (50+) annually. Optimal strategy: 1) Contribute to 401(k) up to employer match (free money), 2) Max out Roth IRA ($7,000-8,000), 3) Return to 401(k) and max it out ($23,000-30,500), 4) If still have money, consider taxable brokerage or HSA. Example: You earn $100,000, employer matches 50% up to 6% of salary. Step 1: Contribute $6,000 to 401(k) (get $3,000 match). Step 2: Max Roth IRA at $7,000. Step 3: Contribute remaining $17,000 to 401(k) (total $23,000). Result: $30,000 in retirement savings plus $3,000 employer match equals $33,000 total. This diversifies your tax situation: pre-tax 401(k) money and tax-free Roth IRA money give you flexibility in retirement to manage tax brackets. You can also have Roth 401(k) option if your employer offers it, giving you even more tax-free growth potential.',
            },
          },
          {
            '@type': 'Question',
            name: 'What investments should I hold in my Roth IRA?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Best investments for Roth IRA are those with highest growth potential since all gains are tax-free: 1) Stock index funds (S&P 500, Total Stock Market): Highest long-term returns, all gains tax-free. Recommended: 70-90% of portfolio when young. 2) Small-cap and international stocks: Higher growth potential, more volatile, perfect for tax-free account. 3) REITs (Real Estate Investment Trusts): Generate high taxable dividends, much better in Roth than taxable account. 4) Individual growth stocks: High-risk high-reward, if they succeed all gains are tax-free. Avoid in Roth IRA: 1) Municipal bonds: Already tax-free, wasting Roth tax advantage. 2) Low-return investments: Savings accounts, CDs - not utilizing tax-free growth potential. Asset location strategy: Roth IRA: High-growth stocks, REITs, taxable bonds. Traditional IRA/401(k): Bonds, dividend stocks, balanced funds. Taxable account: Tax-efficient index funds, municipal bonds, long-term hold stocks. Example portfolio for 30-year-old: 80% Total Stock Market Index Fund, 10% International Stock Index Fund, 10% REIT Index Fund. As you age, gradually shift to more bonds (in Traditional IRA, not Roth). By retirement: Roth IRA stays aggressive (you may not need this money for decades), Traditional IRA becomes conservative (this is your near-term income source).',
            },
          },
        ],
      },
      // HowTo Schema
      {
        '@type': 'HowTo',
        '@id': getHowToId('/roth-ira-calculator'),
        name: 'How to Calculate Roth IRA Growth and Plan Your Retirement',
        description: 'Step-by-step guide to calculate Roth IRA contributions, check eligibility, project tax-free growth, and compare Roth vs Traditional IRA strategies.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Roth IRA Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Your Current Age and Retirement Age',
            text: 'Start by entering your current age and target retirement age (typically 65-67). This determines your investment timeline and the power of compound growth. The longer your timeline, the more dramatic the tax-free growth.',
            url: getStepUrl('/roth-ira-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Input Your Annual Contribution Amount',
            text: 'Enter how much you plan to contribute annually. Maximum is $7,000 if under 50, or $8,000 if 50 or older (2024 limits). Even if you cannot max it out, any contribution is valuable. The calculator will show how this grows over time.',
            url: getStepUrl('/roth-ira-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Your Current Roth IRA Balance',
            text: 'If you already have a Roth IRA, enter your current balance. If you are just starting, enter $0. The calculator will project growth from this starting point plus your future contributions.',
            url: getStepUrl('/roth-ira-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Set Expected Annual Return Rate',
            text: 'Enter your expected annual investment return. Historical stock market average is 8-10%. Conservative estimate is 6-7%, aggressive is 9-10%. The calculator will show how different return rates affect your final balance.',
            url: getStepUrl('/roth-ira-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Check MAGI Eligibility',
            text: 'Click "Show Advanced Options" and enter your Modified Adjusted Gross Income (MAGI) to check if you are eligible for full, partial, or no Roth IRA contribution. The calculator will show your exact contribution limit based on income.',
            url: getStepUrl('/roth-ira-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Compare Roth vs Traditional IRA',
            text: 'Enter your current tax rate and expected retirement tax rate. The calculator will compare Roth IRA (pay taxes now) vs Traditional IRA (pay taxes later) to show which saves you more money based on your tax situation.',
            url: getStepUrl('/roth-ira-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Review Tax-Free Growth Projection',
            text: 'The calculator shows your total contributions, total growth, and final balance - all completely tax-free in a Roth IRA. Compare this to taxable account to see tax savings. You will see year-by-year growth projection.',
            url: getStepUrl('/roth-ira-calculator', 7),
          },
          {
            '@type': 'HowToStep',
            position: 8,
            name: 'Plan Your Retirement Income',
            text: 'See how much tax-free income your Roth IRA can provide in retirement. The calculator shows sustainable withdrawal amounts using 4% rule and compares to Traditional IRA after-tax income. Make informed decisions about your retirement strategy.',
            url: getStepUrl('/roth-ira-calculator', 8),
          },
        ],
      },
      // Article Schema
      {
        '@type': 'Article',
        '@id': getArticleId('/roth-ira-calculator'),
        headline: 'Roth IRA Calculator: Complete Guide to Tax-Free Retirement Savings, Contribution Limits, and Investment Strategies',
        description: 'Comprehensive guide to Roth IRA, including contribution limits, eligibility requirements, tax-free growth calculations, Roth vs Traditional IRA comparison, and optimal investment strategies.',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
        datePublished: '2024-01-01',
        dateModified: '2024-11-16',
        image: getOgImage('roth-ira'),
        articleBody: 'A Roth IRA is one of the most powerful retirement savings vehicles available, offering tax-free growth and tax-free withdrawals in retirement. Understanding contribution limits, eligibility requirements, tax implications, and investment strategies is crucial for maximizing your retirement savings. This comprehensive guide covers everything you need to know about Roth IRAs, from basic concepts to advanced strategies like Backdoor Roth conversions.',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">Roth IRA Calculator - Calculate Tax-Free Retirement Growth</h1>
        
        {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Roth IRA Calculator (Free, No signup)"
        calculatorUrl="/roth-ira-calculator"
      />
        
        <RothIRACalculator />

        {/* Educational Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Roth IRA</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">What is a Roth IRA?</h3>
              <p className="text-blue-800">
                A Roth IRA (Individual Retirement Account) is a retirement savings account where you contribute after-tax dollars, 
                and all future qualified withdrawals are completely tax-free. Unlike Traditional IRA where you get a tax deduction 
                now but pay taxes later, Roth IRA offers tax-free growth and tax-free withdrawals in retirement - one of the most 
                powerful wealth-building tools available.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2024 Roth IRA Contribution Limits</h3>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Age</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Contribution Limit</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Under 50</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$7,000</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Standard contribution limit</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">50 and Older</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$8,000</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Includes $1,000 catch-up contribution</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Income Limits and Phase-Out Ranges (2024)</h3>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Filing Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Full Contribution</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Partial Contribution</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">No Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Single / Head of Household</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Under $146,000</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$146,000 - $161,000</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Over $161,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Married Filing Jointly</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Under $230,000</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$230,000 - $240,000</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Over $240,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Married Filing Separately</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$0</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$0 - $10,000</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Over $10,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h4 className="text-lg font-semibold text-yellow-900 mb-2">💡 Partial Contribution Calculation</h4>
              <p className="text-yellow-800 mb-2">
                If your MAGI falls in the phase-out range, your contribution limit is reduced proportionally:
              </p>
              <p className="text-yellow-800 font-mono text-sm bg-yellow-100 p-3 rounded">
                Allowed Contribution = Maximum Contribution × (Phase-out Limit - Your MAGI) ÷ Phase-out Range
              </p>
              <p className="text-yellow-800 mt-2">
                <strong>Example:</strong> Single filer with $150,000 MAGI can contribute: 
                $7,000 × ($161,000 - $150,000) ÷ $15,000 = $5,133
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Roth IRA vs Traditional IRA: Which is Better?</h3>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Feature</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Roth IRA</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Traditional IRA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Tax Treatment</td>
                    <td className="px-6 py-4 text-sm text-gray-700">After-tax contributions, tax-free withdrawals</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Pre-tax contributions, taxed on withdrawal</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Tax Deduction Now</td>
                    <td className="px-6 py-4 text-sm text-gray-700">No</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Yes (if eligible)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Tax on Withdrawals</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Tax-free (if qualified)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Fully taxable as income</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Required Minimum Distributions (RMDs)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">None</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Yes, starting at age 73</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Income Limits</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Yes (see table above)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">No (but deduction may be limited)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Early Withdrawal of Contributions</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Anytime, tax-free and penalty-free</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Taxed + 10% penalty (with exceptions)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Best For</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Young earners, expecting higher future tax rates</td>
                    <td className="px-6 py-4 text-sm text-gray-700">High earners now, expecting lower future tax rates</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Power of Tax-Free Growth</h3>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-green-900 mb-3">Example: 25-Year-Old Contributing $7,000 Annually</h4>
              <p className="text-green-800 mb-3">Assumptions: 8% annual return, retire at age 65 (40 years)</p>
              <div className="space-y-2 text-green-800">
                <p><strong>Total Contributions:</strong> $280,000</p>
                <p><strong>Total Growth:</strong> $1,720,000</p>
                <p><strong>Final Balance:</strong> $2,000,000 (completely tax-free!)</p>
                <p><strong>Tax Savings vs Taxable Account (24% rate):</strong> $413,000</p>
                <p><strong>Tax Savings vs Traditional IRA (24% rate):</strong> $480,000</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">Age 30</h4>
                <p className="text-sm text-blue-800">35 years to retirement</p>
                <p className="text-2xl font-bold text-blue-900 mt-2">$1.3M</p>
                <p className="text-xs text-blue-700">$7,000/year at 8% return</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">Age 40</h4>
                <p className="text-sm text-blue-800">25 years to retirement</p>
                <p className="text-2xl font-bold text-blue-900 mt-2">$550K</p>
                <p className="text-xs text-blue-700">$7,000/year at 8% return</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">Age 50</h4>
                <p className="text-sm text-blue-800">15 years to retirement</p>
                <p className="text-2xl font-bold text-blue-900 mt-2">$220K</p>
                <p className="text-xs text-blue-700">$8,000/year at 8% return</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Backdoor Roth IRA Strategy</h3>
            
            <p className="text-gray-700 mb-4">
              If your income exceeds Roth IRA limits, you can still contribute using the Backdoor Roth IRA strategy:
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Contribute to Traditional IRA</h4>
                  <p className="text-gray-700">Make a non-deductible contribution to Traditional IRA (no income limits for contributions).</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Convert to Roth IRA</h4>
                  <p className="text-gray-700">Immediately convert the Traditional IRA to Roth IRA (no income limits for conversions).</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Pay Taxes on Growth</h4>
                  <p className="text-gray-700">Pay taxes on any earnings between contribution and conversion (usually minimal if done quickly).</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <h4 className="text-lg font-semibold text-red-900 mb-2">⚠️ Pro-Rata Rule Warning</h4>
              <p className="text-red-800">
                If you have existing pre-tax Traditional IRA balances, the pro-rata rule applies, making part of your conversion taxable. 
                Consider rolling pre-tax IRA balances into your 401(k) before doing Backdoor Roth, or accept the partial taxation.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Withdrawal Rules</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-900 mb-3">✅ Contributions (Anytime)</h4>
                <ul className="list-disc list-inside space-y-2 text-green-800">
                  <li>Withdraw anytime, any age</li>
                  <li>Always tax-free</li>
                  <li>Always penalty-free</li>
                  <li>No waiting period</li>
                  <li>You already paid taxes on this money</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-yellow-900 mb-3">⚠️ Earnings (Restrictions Apply)</h4>
                <ul className="list-disc list-inside space-y-2 text-yellow-800">
                  <li>Must be age 59.5 or older</li>
                  <li>Account must be 5+ years old</li>
                  <li>Otherwise: taxes + 10% penalty</li>
                  <li>Exceptions: disability, death, first home ($10k)</li>
                  <li>Order: contributions withdrawn first</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Best Investment Strategies for Roth IRA</h3>
            
            <p className="text-gray-700 mb-4">
              Since Roth IRA offers tax-free growth, prioritize high-growth investments:
            </p>

            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900">🎯 Best: Stock Index Funds</h4>
                <p className="text-gray-700">S&P 500, Total Stock Market - highest long-term returns, all gains tax-free. Recommended: 70-90% when young.</p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900">🎯 Great: Growth Stocks & Small-Cap</h4>
                <p className="text-gray-700">Higher growth potential, more volatile - perfect for tax-free account. Let winners run without tax consequences.</p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900">🎯 Good: REITs</h4>
                <p className="text-gray-700">Generate high taxable dividends - much better in Roth than taxable account. Avoid in taxable accounts.</p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-gray-900">❌ Avoid: Municipal Bonds</h4>
                <p className="text-gray-700">Already tax-free - wasting Roth tax advantage. Put these in taxable accounts instead.</p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-gray-900">❌ Avoid: Low-Return Investments</h4>
                <p className="text-gray-700">Savings accounts, CDs - not utilizing tax-free growth potential. Use high-yield savings outside Roth.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Mistakes to Avoid</h3>
            
            <div className="space-y-4 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Not Starting Early Enough</h4>
                <p className="text-red-800">
                  Compound growth is exponential. Starting at 25 vs 35 can mean $700,000+ difference at retirement. Start NOW, even with small amounts.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Not Maxing Out Contributions</h4>
                <p className="text-red-800">
                  $7,000 per year is only $583 per month. Cut expenses, increase income, or reduce other savings to max out Roth IRA first - it is the best tax-advantaged account.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Being Too Conservative</h4>
                <p className="text-red-800">
                  Do not hold bonds or cash in Roth IRA when young. You have decades for recovery - maximize growth potential with stocks. Save conservative investments for Traditional IRA.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Withdrawing Contributions Early</h4>
                <p className="text-red-800">
                  While you CAN withdraw contributions anytime, you should not. Every dollar withdrawn loses decades of tax-free compound growth. Build separate emergency fund.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Ignoring Backdoor Roth</h4>
                <p className="text-red-800">
                  If your income exceeds limits, do not skip Roth IRA - use Backdoor Roth strategy. It is legal, IRS-approved, and worth the extra paperwork.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Plan Your Tax-Free Retirement?</h3>
              <p className="text-gray-700 mb-4">
                Use our Roth IRA calculator above to see exactly how much tax-free wealth you can build. Calculate contribution limits, 
                check eligibility, project growth, and compare Roth vs Traditional IRA to make the best decision for your retirement.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/retirement-calculator"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Retirement Calculator
                </Link>
                <Link 
                  href="/401k-calculator"
                  className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  401(k) Calculator
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
