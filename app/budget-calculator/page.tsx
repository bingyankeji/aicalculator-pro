import { Metadata } from 'next';
import BudgetCalculator from '@/components/Calculator/BudgetCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Budget Calculator - Monthly Budget Planner with 50/30/20 Rule | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Free budget calculator helps you plan monthly expenses using the 50/30/20 rule. Track income, expenses, savings, and get personalized financial recommendations instantly.`,
  keywords: [
    'budget calculator',
    'monthly budget calculator',
    'budget planner',
    '50/30/20 budget calculator',
    'personal budget calculator',
    'budget tracker',
    'expense calculator',
    'income expense calculator',
    'financial budget calculator',
    'household budget calculator',
    'family budget calculator',
    'budget planning tool',
    'money management calculator',
    'spending calculator',
    'savings calculator',
    'budget analyzer',
    'financial planner calculator',
    'monthly expense calculator',
    'budget breakdown calculator',
    'free budget calculator'
  ],
  alternates: {
    canonical: getUrl('/budget-calculator')
  },
  openGraph: {
    title: `Budget Calculator - Plan Your Monthly Budget with 50/30/20 Rule`,
    description: `Smart budget calculator with financial health analysis and personalized recommendations.`,
    url: getUrl('/budget-calculator'),
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Budget Calculator - Monthly Budget Planner`,
    description: `Plan your budget with 50/30/20 rule. Track income, expenses, and get financial insights.`,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function BudgetCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/budget-calculator'),
        'name': 'Budget Calculator',
        'url': getUrl('/budget-calculator'),
        'description': `Free monthly budget calculator helps you plan and manage your finances using the proven 50/30/20 rule. Track income, categorize expenses, analyze spending habits, and receive personalized recommendations for better financial health.`,
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          'Monthly budget planning with 50/30/20 rule',
          'Income and expense tracking',
          'Needs, wants, and savings categorization',
          'Financial health score (0-100)',
          'Personalized budget recommendations',
          'Visual budget breakdown with progress bars',
          'Savings rate calculation',
          'Budget vs. actual comparison',
          'Detailed expense categories'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/budget-calculator'),
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
            'name': 'Budget Calculator',
            'item': getUrl('/budget-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/budget-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is the 50/30/20 budget rule?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The 50/30/20 budget rule is a simple and effective budgeting method that divides your after-tax income into three categories: 50% for Needs (essential expenses like housing, utilities, groceries, transportation, insurance), 30% for Wants (discretionary spending like entertainment, dining out, shopping, subscriptions), and 20% for Savings & Debt (emergency fund, retirement savings, investments, extra debt payments). Created by Senator Elizabeth Warren, this rule provides a balanced approach to managing money, ensuring you cover essentials, enjoy life, and build financial security. It's flexible—if your housing costs are higher, you can adjust other categories, but aim to stay close to these percentages for optimal financial health.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do I calculate my monthly budget?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `To calculate your monthly budget: (1) Calculate total monthly income: Add salary, freelance income, investments, and other sources. Use net income (after taxes). (2) List all expenses: Essential needs (housing, utilities, groceries, transportation, insurance), discretionary wants (entertainment, dining, shopping), and savings/debt (emergency fund, retirement, debt payments). (3) Apply 50/30/20 rule: Multiply income by 0.50, 0.30, and 0.20 to get target amounts for each category. (4) Compare actual vs. target: See where you overspend or underspend. (5) Calculate remaining balance: Income minus total expenses. Positive is good, negative means you're overspending. (6) Adjust as needed: Cut wants, reduce needs, or increase income to balance budget. Our calculator automates all these steps and provides personalized recommendations.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What should I do if my needs exceed 50% of my income?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `If your needs exceed 50% of income, you have several options: (1) Reduce housing costs: Consider downsizing, getting a roommate, refinancing mortgage, or moving to a lower-cost area. Housing is typically the biggest expense. (2) Cut transportation: Use public transit, carpool, buy a fuel-efficient car, or move closer to work. (3) Lower utility bills: Switch providers, use energy-efficient appliances, adjust thermostat, unplug devices. (4) Shop smarter for groceries: Buy generic brands, meal plan, use coupons, shop sales, reduce food waste. (5) Review insurance: Shop for better rates, increase deductibles (if you have emergency fund), bundle policies. (6) Increase income: Ask for raise, find higher-paying job, start side hustle, freelance. (7) Adjust 50/30/20 ratios: Temporarily go 60/20/20 while working to reduce needs. The key is having a plan—our calculator helps identify specific areas to target.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How much should I save each month?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Aim to save at least 20% of your gross income each month, per the 50/30/20 rule. For someone earning $5,000/month, that is $1,000 in savings. This 20% should be split between: Emergency fund (3-6 months expenses), Retirement accounts (401k, IRA, HSA), Investments (stocks, bonds, real estate), Extra debt payments (beyond minimums), and Specific goals (house down payment, education). Minimum recommendations: Start with at least 10% if 20% is impossible. Try to increase by 1% each year. Ideal target: Aim for 25-30% if you want early retirement or aggressive wealth building. Many experts recommend 15% minimum just for retirement. Remember: Save FIRST (pay yourself first principle), before spending on wants. Set up automatic transfers on payday. If you cannot save 20%, focus on cutting wants and reducing needs. Our calculator shows exactly where your money goes so you can find savings opportunities.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is a good financial health score?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Financial health scores in our calculator range from 0-100: Excellent (80-100): Spending aligned with 50/30/20 rule, saving 20%+, positive cash flow. You have strong financial habits and security. Good (60-79): Mostly on track with minor deviations. Savings rate 15-20%, needs under 55%. Room for small improvements. Fair (40-59): Significant budget issues. Either needs exceed 60%, wants exceed 40%, or savings below 10%. Needs immediate attention to avoid problems. Needs Improvement (0-39): Critical financial situation. Spending exceeds income, savings under 5%, or needs exceed 65%. Urgent action required to avoid debt spiral. Factors affecting score: Needs percentage (ideal ≤50%), Wants percentage (ideal ≤30%), Savings rate (ideal ≥20%), Cash flow (positive vs. negative balance). Improving score: Focus on the specific recommendations provided. Small changes compound—cutting one subscription saves $120-180/year. Our calculator gives personalized advice based on your exact situation.`
            }
          },
          {
            '@type': 'Question',
            'name': 'Should I pay off debt or save first?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The answer depends on your specific situation: SAVE FIRST (small emergency fund): Build $1,000-2,000 emergency fund before aggressive debt payoff. This prevents going deeper into debt when unexpected expenses arise. PAY DEBT if high-interest: If you have credit card debt (15-25% APR) or payday loans (400%+ APR), prioritize paying these off after small emergency fund. The interest costs more than investment returns. BALANCE BOTH for medium interest: For debt at 6-8% (auto loans, student loans), split your 20% savings allocation: 10% to debt, 10% to retirement/emergency fund. This balances progress on both fronts. SAVE MORE if low interest: If mortgage is 3-4% or student loans under 5%, minimum payments are fine. Focus on maximizing retirement accounts and investments—your returns will exceed interest costs. EMPLOYER MATCH priority: Always contribute enough to 401k to get full employer match (free money!) before extra debt payments. Recommended order: (1) $1,000-2,000 starter emergency fund, (2) Employer 401k match, (3) High-interest debt (>7%), (4) Full emergency fund (3-6 months), (5) Medium interest debt and retirement simultaneously, (6) Low interest debt and investments, (7) Max out retirement accounts. Our calculator helps you see how much is going to debt vs. savings in your current budget.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/budget-calculator'),
        'name': 'How to Create a Monthly Budget',
        'description': 'Step-by-step guide to creating and managing a monthly budget using the 50/30/20 rule',
        'totalTime': 'PT15M',
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Calculate Total Monthly Income',
            'text': `Enter your monthly salary/wages and any additional income (freelance, investments, side business). Use net income after taxes, not gross pay.`,
            'url': getStepUrl('/budget-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'List Essential Needs',
            'text': `Input all essential expenses: housing (rent/mortgage), utilities, groceries, transportation, and insurance. These should total around 50% of income.`,
            'url': getStepUrl('/budget-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Track Discretionary Wants',
            'text': `Enter discretionary spending: entertainment, dining out, shopping, and subscriptions. Target 30% of income for lifestyle expenses.`,
            'url': getStepUrl('/budget-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Plan Savings and Debt Payments',
            'text': `Input savings contributions, debt payments, and investments. Aim for 20% of income toward building wealth and financial security.`,
            'url': getStepUrl('/budget-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            'position': 5,
            'name': 'Review Financial Health Score',
            'text': `Check your personalized financial health score (0-100) and see how your actual spending compares to the 50/30/20 targets.`,
            'url': getStepUrl('/budget-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            'position': 6,
            'name': 'Implement Recommendations',
            'text': `Follow the personalized recommendations to improve your budget. Focus on reducing overspending categories and increasing savings rate.`,
            'url': getStepUrl('/budget-calculator', 6)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/budget-calculator'),
        'headline': 'Budget Calculator - Complete Guide to Monthly Budget Planning',
        'description': `Comprehensive guide to budget planning with 50/30/20 rule, expense tracking, savings strategies, and financial health optimization.`,
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
      <h1 className="sr-only">Budget Calculator - Monthly Budget Planner with 50/30/20 Rule</h1>
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" 
              itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/financial" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Financial Calculators</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Budget Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <BudgetCalculator />

      {/* Educational Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Budget Calculator</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our <strong>Budget Calculator</strong> is a free, comprehensive financial planning tool designed to help you take control of your money using the proven <strong>50/30/20 budget rule</strong>. Whether you're creating your first budget, struggling to save, or looking to optimize your finances, our calculator provides instant analysis, personalized recommendations, and a clear financial health score to guide your decisions.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Unlike simple expense trackers, our intelligent budget calculator analyzes your spending patterns against proven financial guidelines, identifies problem areas, and provides specific, actionable recommendations to improve your financial situation. Input your income and expenses, and receive a comprehensive financial health assessment in seconds.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding the 50/30/20 Budget Rule</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is the 50/30/20 Rule?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The <strong>50/30/20 budget rule</strong> is a simple yet powerful budgeting framework created by U.S. Senator Elizabeth Warren in her book "All Your Worth: The Ultimate Lifetime Money Plan." This method divides your after-tax income into three categories, providing a balanced approach to managing money that ensures you cover necessities, enjoy life, and build financial security.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
              <h4 className="text-xl font-bold text-green-700 mb-3">🏠 50% - Needs</h4>
              <p className="text-sm text-gray-700 mb-3">Essential expenses you cannot avoid:</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><strong>Housing:</strong> Rent or mortgage payment</li>
                <li><strong>Utilities:</strong> Electric, water, gas, internet</li>
                <li><strong>Groceries:</strong> Food and household essentials</li>
                <li><strong>Transportation:</strong> Car payment, gas, public transit</li>
                <li><strong>Insurance:</strong> Health, auto, life, renters/homeowners</li>
                <li><strong>Minimum debt:</strong> Required loan/credit card payments</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
              <h4 className="text-xl font-bold text-blue-700 mb-3">🎉 30% - Wants</h4>
              <p className="text-sm text-gray-700 mb-3">Discretionary spending that enhances life:</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><strong>Entertainment:</strong> Movies, concerts, hobbies</li>
                <li><strong>Dining out:</strong> Restaurants, coffee shops, bars</li>
                <li><strong>Shopping:</strong> Clothes, gadgets, home decor</li>
                <li><strong>Subscriptions:</strong> Streaming, gym, apps</li>
                <li><strong>Vacations:</strong> Travel and experiences</li>
                <li><strong>Luxury items:</strong> Upgrades and non-essentials</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
              <h4 className="text-xl font-bold text-purple-700 mb-3">💎 20% - Savings</h4>
              <p className="text-sm text-gray-700 mb-3">Building future financial security:</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><strong>Emergency fund:</strong> 3-6 months of expenses</li>
                <li><strong>Retirement:</strong> 401(k), IRA, Roth IRA</li>
                <li><strong>Investments:</strong> Stocks, bonds, real estate</li>
                <li><strong>Extra debt:</strong> Payments beyond minimums</li>
                <li><strong>Down payments:</strong> House, car savings</li>
                <li><strong>Education fund:</strong> College, certifications</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why the 50/30/20 Rule Works</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            This budgeting method is effective because it's:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Simple to understand:</strong> Only three categories, not dozens of line items</li>
            <li><strong>Flexible:</strong> Adjust percentages based on your situation (60/20/20 if housing is expensive)</li>
            <li><strong>Balanced:</strong> Ensures you save while still enjoying life</li>
            <li><strong>Evidence-based:</strong> Based on research into financial stability</li>
            <li><strong>Goal-oriented:</strong> Clear targets make it easy to track progress</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Create Your Budget</h2>
          
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step-by-Step Budget Process</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Calculate Net Monthly Income</h4>
                  <p className="text-sm text-gray-700">
                    Add all income sources: salary (after taxes), freelance work, investments, side businesses. Use take-home pay, not gross salary.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Track Every Expense</h4>
                  <p className="text-sm text-gray-700">
                    Review bank statements, credit card bills, and receipts from the past 1-3 months. Categorize each expense as Need, Want, or Savings.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Apply 50/30/20 Targets</h4>
                  <p className="text-sm text-gray-700">
                    Calculate your target amounts: Income × 0.50 for needs, × 0.30 for wants, × 0.20 for savings. Compare actual vs. target.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Identify Problem Areas</h4>
                  <p className="text-sm text-gray-700">
                    Find categories where you overspend. Common issues: housing over 35%, wants over 40%, or savings under 10%.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Make Adjustments</h4>
                  <p className="text-sm text-gray-700">
                    Cut expenses in overspending categories. Start with wants (easiest), then optimize needs (more difficult), or increase income.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">6</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Automate and Monitor</h4>
                  <p className="text-sm text-gray-700">
                    Set up automatic transfers for savings and bills. Review budget monthly, adjust as needed. Track progress toward financial goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Budget Challenges & Solutions</h2>
          
          <div className="space-y-6">
            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
              <h3 className="text-xl font-semibold text-red-900 mb-3">🚨 Problem: Housing Costs Over 50%</h3>
              <p className="text-gray-700 mb-3">
                <strong>Solution:</strong> Consider downsizing, getting a roommate, negotiating rent, refinancing mortgage, or relocating to lower-cost area. If impossible, adjust to 60/20/20 temporarily while working to reduce housing expenses.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
              <h3 className="text-xl font-semibold text-yellow-900 mb-3">⚠️ Problem: Cannot Save 20%</h3>
              <p className="text-gray-700 mb-3">
                <strong>Solution:</strong> Start with 5-10% and increase 1% every few months. Cut one subscription ($15/month = $180/year), pack lunch 3x/week (save $600/year), cancel unused gym membership ($50/month = $600/year).
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold text-orange-900 mb-3">🔥 Problem: Spending More Than Income</h3>
              <p className="text-gray-700 mb-3">
                <strong>Solution:</strong> Immediate action required. Cut all wants to zero temporarily, reduce needs aggressively, sell unused items, find additional income source. This is unsustainable and will lead to debt.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold text-purple-900 mb-3">💳 Problem: High Credit Card Debt</h3>
              <p className="text-gray-700 mb-3">
                <strong>Solution:</strong> Temporarily shift to 50/20/30 (reduce wants to 20%, increase savings/debt to 30%). Focus extra 10% on highest-interest debt first (avalanche method) or smallest balance first (snowball method for motivation).
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Financial Health Optimization</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Improving Your Financial Health Score</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our calculator provides a financial health score from 0-100 based on multiple factors. Here's how to improve:
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Score Breakdown</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <span className="font-bold text-green-600 text-lg">80-100:</span>
                <span><strong>Excellent</strong> - Budget well-balanced, saving 20%+, minimal overspending. Keep it up!</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-blue-600 text-lg">60-79:</span>
                <span><strong>Good</strong> - Mostly on track with minor issues. Focus on increasing savings or reducing one overspending category.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-yellow-600 text-lg">40-59:</span>
                <span><strong>Fair</strong> - Significant imbalances. Either needs too high, wants excessive, or savings too low. Needs attention now.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-red-600 text-lg">0-39:</span>
                <span><strong>Needs Improvement</strong> - Critical situation. Spending exceeds income or savings nearly zero. Urgent action required.</span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quick Wins to Boost Your Score</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Cancel 3 unused subscriptions:</strong> Instantly save $30-60/month ($360-720/year)</li>
            <li><strong>Meal prep lunches:</strong> Save $200-300/month vs. buying lunch daily</li>
            <li><strong>Negotiate bills:</strong> Call providers for discounts (internet, phone, insurance)</li>
            <li><strong>Use cash-back credit cards:</strong> Earn 1-5% on purchases you'd make anyway</li>
            <li><strong>Automate savings:</strong> Transfer to savings account on payday before spending</li>
            <li><strong>Shop with a list:</strong> Avoid impulse purchases that blow the budget</li>
            <li><strong>Use energy-efficient settings:</strong> Lower electric bill by $20-50/month</li>
            <li><strong>Refinance high-interest debt:</strong> Save hundreds per month in interest</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Financial Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/mortgage-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🏠</div>
              <h3 className="font-semibold text-gray-900 mb-1">Mortgage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate home loan payments</p>
            </Link>
            
            <Link 
              href="/savings-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900 mb-1">Savings Calculator</h3>
              <p className="text-sm text-gray-600">Plan your savings goals</p>
            </Link>
            
            <Link 
              href="/loan-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">💳</div>
              <h3 className="font-semibold text-gray-900 mb-1">Loan Calculator</h3>
              <p className="text-sm text-gray-600">Calculate loan payments and interest</p>
            </Link>

            <Link 
              href="/debt-payoff-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">📉</div>
              <h3 className="font-semibold text-gray-900 mb-1">Debt Payoff Calculator</h3>
              <p className="text-sm text-gray-600">Plan debt elimination strategy</p>
            </Link>

            <Link 
              href="/retirement-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-1">Retirement Calculator</h3>
              <p className="text-sm text-gray-600">Plan for retirement savings</p>
            </Link>

            <Link 
              href="/investment-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900 mb-1">Investment Calculator</h3>
              <p className="text-sm text-gray-600">Calculate investment returns</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <p className="text-gray-700 mb-4">
            For more information about budgeting and personal finance:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a 
                href="https://www.consumerfinance.gov/consumer-tools/budget-calculator/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Consumer Financial Protection Bureau - Budget Worksheet
              </a>
            </li>
            <li>
              <a 
                href="https://www.mint.com/blog/budgeting/50-30-20-rule-budget" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Mint - Complete Guide to 50/30/20 Budget
              </a>
            </li>
            <li>
              <a 
                href="https://www.nerdwallet.com/article/finance/nerdwallet-budget-calculator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                NerdWallet - Budget Calculator and Tips
              </a>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

