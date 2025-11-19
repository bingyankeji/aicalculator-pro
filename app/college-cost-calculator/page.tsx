import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import CollegeCostCalculator from '@/components/Calculator/CollegeCostCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'College Cost Calculator - Estimate Education Expenses | AICalculator',
  description: 'Free college cost calculator with inflation adjustment. Calculate total college expenses including tuition, room & board, books, and determine your funding gap.',
  keywords: [
    'college cost calculator',
    'college expense calculator',
    'university cost calculator',
    'education cost calculator',
    'college tuition calculator',
    'college savings calculator',
    'college planning calculator',
    'higher education cost',
    'college affordability calculator',
    'student loan calculator',
    'college budget calculator',
    'education expenses',
    'college fee calculator',
    'university tuition estimator',
    '529 plan calculator',
    'college funding calculator',
    'education savings calculator',
    'college investment calculator',
    'student budget planner',
    'college financial planning',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'College Cost Calculator - Education Expense Planning',
    description: 'Calculate total college costs with inflation adjustment. Plan your education funding with detailed cost breakdowns and savings analysis.',
    type: 'website',
    url: getUrl('/college-cost-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [
      {
        url: getOgImage('college-cost'),
        width: 1200,
        height: 630,
        alt: 'College Cost Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'College Cost Calculator - Plan Education Expenses',
    description: 'Estimate total college costs and plan your education funding. Free calculator with inflation adjustment.',
    images: [getOgImage('college-cost')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/college-cost-calculator'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CollegeCostCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/college-cost-calculator'),
        name: 'College Cost Calculator',
        url: getUrl('/college-cost-calculator'),
        description:
          'Calculate total college education costs including tuition, room and board, books, personal expenses, and transportation with inflation adjustment over multiple years. Includes savings planning and funding gap analysis.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        featureList: [
          'Calculate total college costs',
          'Inflation-adjusted projections',
          'Year-by-year cost breakdown',
          'Savings and scholarship planning',
          'Funding gap analysis',
          'Cost visualization charts',
          'Investment return calculation',
          'Multiple expense categories',
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/college-cost-calculator'),
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
            name: 'Financial',
            item: getUrl('/financial'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'College Cost Calculator',
            item: getUrl('/college-cost-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/college-cost-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much does college really cost per year?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The average cost of college varies significantly by institution type. For 2023-2024, public in-state universities average $10,940 per year for tuition and fees, public out-of-state averages $28,240, and private universities average $39,400. However, these figures only cover tuition and fees. When you include room and board (averaging $12,000-$14,000), books and supplies ($1,200), personal expenses ($2,000-$3,000), and transportation ($1,000-$2,000), the total annual cost ranges from $27,000 to $60,000 depending on the school type. Community colleges offer the most affordable option at around $3,800 per year for tuition, with total costs around $15,000-$20,000 when including living expenses.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why do I need to factor in inflation when calculating college costs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'College costs have historically risen faster than general inflation, averaging 3-4% annually over the past decade. If your child starts college in 10 years and tuition is currently $30,000 per year, with 3% annual inflation it will be approximately $40,300 per year when they enroll. Over the 4-year degree, total costs could be $170,000 instead of $120,000 at today\'s prices. Failing to account for this 42% increase leads to significant underfunding. The calculator uses compound inflation to project future costs year by year, ensuring your savings plan accounts for rising expenses throughout the entire college period.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a funding gap and how do I address it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A funding gap is the difference between your total projected college costs and your available resources (current savings, future contributions, scholarships). For example, if college will cost $180,000 and you have $100,000 in savings and scholarships, your funding gap is $80,000. To address a gap: increase monthly savings now, seek additional scholarships and grants, consider more affordable schools or starting at community college, explore federal student loans (currently 5-7% interest), have your student work part-time or participate in work-study programs, or use 529 plan tax benefits to maximize savings growth. Even small monthly savings increases compound significantly over time.',
            },
          },
          {
            '@type': 'Question',
            name: 'What expenses should I include beyond tuition?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A complete college budget includes more than just tuition. Major expense categories: Tuition and fees (the largest expense, varies by school), Room and board (housing and meal plans, or off-campus rent and groceries), Books and supplies ($1,200-$1,500 per year, though can be reduced with used books or rentals), Personal expenses (clothing, toiletries, entertainment, usually $2,000-$3,000 per year), Transportation (car expenses, gas, flights home, public transit), Technology (laptop, software, usually a one-time $1,000-$2,000 expense), Health insurance (if not covered by parents plan), Cell phone and internet. Students living off-campus may save on housing but incur additional costs for utilities, groceries, and furnishings. The calculator includes all major categories to provide a realistic total cost estimate.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can I reduce college costs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Multiple strategies can significantly reduce college expenses: Start at community college for 2 years then transfer to a 4-year university, saving $40,000-$80,000 on the first two years. Take Advanced Placement (AP) or dual enrollment courses in high school to earn college credits free or at reduced cost. Apply for scholarships aggressively - even small $500-$1,000 awards add up, and they are often renewable. Choose in-state public universities over private or out-of-state options. Live at home if possible, saving $12,000-$15,000 per year on room and board. Buy used textbooks, rent them, or use free online resources when available. Graduate in 4 years or less by taking appropriate course loads and planning carefully. Work part-time or summer jobs to cover personal expenses. Consider schools offering generous need-based or merit-based aid.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a 529 plan and should I use one?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A 529 plan is a tax-advantaged savings account specifically for education expenses. Contributions grow tax-free, and withdrawals for qualified education expenses (tuition, fees, room and board, books) are also tax-free. Many states offer tax deductions or credits for contributions. Benefits include: tax-free growth (similar to a Roth IRA but for education), high contribution limits (typically $300,000+ lifetime), flexibility to change beneficiaries, can be used for K-12 tuition (up to $10,000 per year) and qualified apprenticeship programs. Drawbacks: 10% penalty plus taxes on non-qualified withdrawals, investment returns not guaranteed, may impact financial aid eligibility slightly. Most financial experts recommend 529 plans as the primary college savings vehicle due to significant tax advantages. Start early to maximize compound growth - even $200 monthly from birth can grow to $80,000-$100,000 by college with reasonable returns.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/college-cost-calculator'),
        name: 'How to Calculate College Costs',
        description: 'Step-by-step guide to estimating total college expenses with inflation adjustment and determining your funding gap.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'College Cost Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Annual College Costs',
            text: 'Input the current annual costs for tuition and fees, room and board, books and supplies, personal expenses, and transportation. Use actual figures from your target schools published cost of attendance, or use national averages: public in-state $11,000 tuition, public out-of-state $28,000, private $39,000. Add approximately $12,000-$14,000 for room and board.',
            url: getStepUrl('/college-cost-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Set Time Frame',
            text: 'Enter the number of years in college (typically 4 for bachelor degree, 2 for associate) and years until college starts. If your child is currently 8 years old and will start college at 18, enter 10 years until college. This allows the calculator to apply inflation adjustments from now until enrollment.',
            url: getStepUrl('/college-cost-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Set Inflation Rate',
            text: 'Enter the expected annual inflation rate for college costs. Historical average is 3-4% per year, which is higher than general inflation. Use 3% as a conservative estimate. This rate compounds each year, significantly impacting future costs. For example, $30,000 tuition becomes $40,300 after 10 years at 3% inflation.',
            url: getStepUrl('/college-cost-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Enter Savings Information',
            text: 'Input your current college savings balance and monthly contribution amount. Include 529 plans, education savings accounts, and dedicated savings. Enter your expected investment return rate (5-7% is typical for balanced portfolios). The calculator projects how your savings will grow until college starts.',
            url: getStepUrl('/college-cost-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Add Expected Scholarships',
            text: 'Enter estimated annual scholarships and grants. Be conservative - only include highly likely awards like automatic merit scholarships based on current academic performance. Do not count uncertain scholarships. Many schools offer renewable merit awards of $5,000-$15,000 per year for strong students.',
            url: getStepUrl('/college-cost-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Review Results and Funding Gap',
            text: 'Click Calculate to see total projected costs adjusted for inflation, your total savings at college start, and your funding gap. The results show yearly cost breakdowns and a stacked bar chart visualizing expense categories. If you have a funding gap, consider increasing monthly savings, seeking more scholarships, or choosing more affordable schools.',
            url: getStepUrl('/college-cost-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/college-cost-calculator'),
        headline: 'College Cost Calculator - Complete Guide to Education Expense Planning',
        description:
          'Comprehensive guide to calculating and planning for college expenses. Learn how to estimate total costs, account for inflation, maximize savings, and close funding gaps for higher education.',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
        datePublished: '2024-01-01',
        dateModified: '2024-11-17',
        image: getOgImage('college-cost'),
        articleBody:
          'College costs continue to rise faster than inflation, making financial planning essential for families. This guide provides comprehensive strategies for calculating, saving, and funding higher education expenses.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        College Cost Calculator - Calculate Education Expenses and Plan Funding
      </h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="College Cost Calculator"
        calculatorUrl="/college-cost-calculator"
      />

      {/* Calculator Component */}
      <CollegeCostCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding College Costs and Financial Planning
          </h2>

          <p className="text-gray-700 mb-4">
            The cost of higher education continues to rise faster than general inflation, making financial 
            planning more critical than ever for families. Understanding the full scope of college expenses 
            and starting to save early can make the difference between graduating debt-free or facing 
            decades of student loan payments. This guide explains how to accurately estimate college costs, 
            account for inflation, and create a realistic savings plan.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            The True Cost of College
          </h3>

          <p className="text-gray-700 mb-4">
            Many families underestimate college costs by focusing only on tuition. A complete college 
            budget includes tuition and fees, room and board, books and supplies, personal expenses, and 
            transportation. For 2023-2024, total annual costs average $27,000 for public in-state students, 
            $45,000 for public out-of-state, and $58,000 for private universities. Over four years, this 
            translates to $108,000, $180,000, or $232,000 respectively - and these are current prices. 
            With 3% annual inflation, a child starting college in 10 years will face costs 34% higher.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            The Impact of Inflation on Education Costs
          </h3>

          <p className="text-gray-700 mb-4">
            College costs have historically increased 3-4% annually, outpacing general inflation of 2-3%. 
            This means a $30,000 annual tuition today becomes approximately $40,300 in 10 years at 3% 
            inflation. Over a 4-year degree starting in 10 years, total costs reach about $170,000 
            compared to $120,000 at today's prices. Failing to account for inflation leads families to 
            underfund college savings by 30-40%. The calculator applies compound inflation year by year, 
            providing realistic projections that increase as your child progresses through college.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Savings Strategies and 529 Plans
          </h3>

          <p className="text-gray-700 mb-4">
            Starting early dramatically reduces the monthly savings burden through compound growth. Saving 
            $200 monthly from a child's birth, assuming 6% returns, accumulates approximately $87,000 by 
            age 18. Starting at age 10 requires $900 monthly to reach the same amount. A 529 plan offers 
            the best vehicle for college savings with tax-free growth and withdrawals for education expenses. 
            Many states provide tax deductions for contributions. Unlike Roth IRAs or brokerage accounts, 
            529 plans have no income limits and high contribution caps, though they carry a 10% penalty on 
            non-education withdrawals.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Addressing Funding Gaps
          </h3>

          <p className="text-gray-700 mb-4">
            Most families face a funding gap between savings and total costs. Solutions include federal 
            student loans (currently 5-7% interest, capped annually), private student loans (rates vary, 
            use cautiously), work-study programs providing part-time campus employment, starting at 
            community college for 2 years then transferring (saving $40,000-$80,000), choosing in-state 
            public schools over private institutions, aggressive scholarship applications starting in 
            junior year of high school, and living at home if feasible (saving $12,000-$15,000 annually). 
            Even small cost reductions compound significantly over four years.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Cost Reduction Strategies
          </h3>

          <p className="text-gray-700 mb-4">
            Several proven strategies reduce college expenses without sacrificing education quality. 
            Advanced Placement and dual enrollment courses in high school earn college credits free or 
            at minimal cost. Community college transfer programs offer identical degrees at fraction of 
            the cost for the first two years. Merit scholarships from colleges, though competitive, are 
            renewable annually and can total $20,000-$60,000 over four years. Graduating in four years 
            rather than five or six saves an entire year of costs. Used textbooks, online resources, and 
            textbook rental services reduce book expenses by 50-70%. These strategies combined can reduce 
            total college costs by $50,000-$100,000.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Additional Resources</h3>

          <p className="text-gray-700 mb-4">
            For comprehensive college planning information and cost data:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <a
                href="https://nces.ed.gov/collegenavigator/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                College Navigator (U.S. Department of Education)
              </a>{' '}
              - Official college cost data and comparison tool
            </li>
            <li>
              <a
                href="https://studentaid.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Federal Student Aid
              </a>{' '}
              - Information on federal loans, grants, and FAFSA
            </li>
            <li>
              <a
                href="https://www.savingforcollege.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Saving for College
              </a>{' '}
              - 529 plan information and comparison
            </li>
            <li>
              <a
                href="https://bigfuture.collegeboard.org/pay-for-college/college-costs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                College Board - College Costs
              </a>{' '}
              - Annual trends in college pricing and financial aid
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/student-loan-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎓</div>
            <h3 className="font-semibold text-gray-900">Student Loan Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate loan payments and interest</p>
          </a>

          <a
            href="/savings-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🐷</div>
            <h3 className="font-semibold text-gray-900">Savings Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Plan your savings goals</p>
          </a>

          <a
            href="/investment-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Investment Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate investment returns</p>
          </a>

          <a
            href="/loan-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-900">Loan Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate loan payments</p>
          </a>

          <a
            href="/budget-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💼</div>
            <h3 className="font-semibold text-gray-900">Budget Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Plan your monthly budget</p>
          </a>

          <a
            href="/compound-interest-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">Compound Interest Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate compound growth</p>
          </a>

          <a
            href="/retirement-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🏖️</div>
            <h3 className="font-semibold text-gray-900">Retirement Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Plan for retirement savings</p>
          </a>

          <a
            href="/debt-payoff-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💸</div>
            <h3 className="font-semibold text-gray-900">Debt Payoff Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Plan to pay off debt</p>
          </a>
        </div>
      </section>
    </div>
  );
}

