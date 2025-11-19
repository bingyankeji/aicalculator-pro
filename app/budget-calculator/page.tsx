import type { Metadata } from 'next';
import BudgetCalculator from '@/components/Calculator/BudgetCalculator';
import Link from 'next/link';
import { DollarSign, PiggyBank, Calculator, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Budget Calculator (Free, No signup) - Monthly Budget | AICalculator',
  description: 'Free budget calculator with no sign-up required. Track income, expenses, and savings. Create a monthly budget plan with expense categories, savings goals, and financial insights. Follow the 50/30/20 budgeting rule.',
  keywords: [
    'budget calculator',
    'free budget calculator',
    'budget calculator no signup',
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
    'expense tracker',
    'budget spreadsheet',
    'personal finance calculator',
    'budget worksheet',
    'spending plan calculator',
    'expense budget calculator',
    'income tracker',
    'budget management tool',
    'financial planning calculator',
    'expense manager',
  ],
  openGraph: {
    title: 'Budget Calculator (Free, No signup) - AICalculator',
    description: 'Free budget calculator with no sign-up required. Track income, expenses, and savings. Create a balanced budget and achieve your financial goals.',
    type: 'website',
    url: 'https://aicalculator.pro/budget-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Budget Calculator (Free, No signup) - AICalculator',
    description: 'Free budget calculator with no sign-up required. Track your budget and manage your finances effectively',
  },
  alternates: {
    canonical: 'https://aicalculator.pro/budget-calculator',
  },
};

export default function BudgetCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Budget Calculator',
        description: 'Track income, expenses, and savings with a comprehensive budget planner',
        url: 'https://aicalculator.pro/budget-calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Track multiple income sources',
          'Categorize expenses',
          'Set budget limits',
          'Calculate savings rate',
          'Overbudget alerts',
          'Expense breakdown charts',
          'Savings goal tracking',
          'Budget recommendations',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://aicalculator.pro',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Budget Calculator',
            item: 'https://aicalculator.pro/budget-calculator',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the 50/30/20 budget rule?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The 50/30/20 budget rule is a simple budgeting method where you allocate 50% of your after-tax income to needs (housing, food, utilities), 30% to wants (entertainment, shopping, dining out), and 20% to savings and debt repayment. This rule provides a balanced approach to managing your money.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much should I save each month?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Financial experts recommend saving at least 10-20% of your income each month. Start with an emergency fund of 3-6 months of expenses, then focus on retirement savings, investments, and other financial goals. Even saving 5-10% is better than nothing if you\'re just starting out.',
            },
          },
          {
            '@type': 'Question',
            name: 'What expense categories should I include in my budget?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Essential categories include: Housing (rent/mortgage, utilities), Food (groceries, dining), Transportation (car payment, gas, insurance), Healthcare (insurance, medical expenses), Debt payments, Savings & investments, Entertainment, Personal care, Shopping, and Miscellaneous. Customize categories based on your lifestyle.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I stick to my budget?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To stick to your budget: 1) Track all expenses for awareness, 2) Use cash or debit for discretionary spending, 3) Review budget weekly, 4) Set realistic goals, 5) Automate savings, 6) Plan for irregular expenses, 7) Allow some flexibility for unexpected costs, 8) Adjust budget monthly based on actual spending patterns.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Create a Monthly Budget',
        description: 'Step-by-step guide to creating and managing your budget',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Calculate Total Income',
            text: 'List all income sources including salary, side income, investments, etc.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'List Fixed Expenses',
            text: 'Record recurring expenses like rent, utilities, insurance, and subscriptions',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Set Budget for Variable Expenses',
            text: 'Allocate budgets for food, entertainment, shopping, and other flexible categories',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Set Savings Goal',
            text: 'Determine how much you want to save each month (aim for 10-20% of income)',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Track and Adjust',
            text: 'Monitor actual spending, identify overbudget areas, and adjust as needed',
          },
        ],
      },
      {
        '@type': 'Article',
        headline: 'Complete Guide to Budget Planning and Money Management',
        description: 'Learn how to create an effective budget and manage your finances',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: 'https://aicalculator.pro/logo.png',
          },
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString(),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Budget Calculator - Free Monthly Budget Planner & Expense Tracker</h1>

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 py-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-blue-600">
              Home
              </Link>
            </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">Budget Calculator</li>
          </ol>
      </nav>

      {/* Calculator */}
      <BudgetCalculator />

      {/* Educational Content */}
      <article className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-blue-600" />
            What is a Budget Calculator?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            A Budget Calculator is a financial planning tool that helps you track income, manage expenses, and achieve 
            your savings goals. By categorizing your spending and comparing it against your budget, you gain clear 
            visibility into your financial health. This calculator helps you identify areas where you can save money, 
            avoid overspending, and build better financial habits.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding the 50/30/20 Budget Rule</h2>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">The Simple Way to Budget</h3>
            <p className="text-sm text-gray-700 mb-4">
              The 50/30/20 rule is a straightforward budgeting framework that divides your after-tax income into 
              three categories:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">50%</div>
                <div className="font-semibold text-gray-900 mb-2">Needs</div>
                <div className="text-xs text-gray-600">
                  Essential expenses like housing, groceries, utilities, healthcare, transportation, and minimum debt 
                  payments.
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">30%</div>
                <div className="font-semibold text-gray-900 mb-2">Wants</div>
                <div className="text-xs text-gray-600">
                  Discretionary spending like dining out, entertainment, shopping, hobbies, and subscriptions.
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">20%</div>
                <div className="font-semibold text-gray-900 mb-2">Savings</div>
                <div className="text-xs text-gray-600">
                  Emergency fund, retirement contributions, investments, and extra debt payments beyond minimums.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Budget Categories Explained</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🏠</span> Housing (25-35%)
              </h3>
              <p className="text-sm text-gray-600">
                Rent or mortgage, property taxes, home insurance, HOA fees, maintenance, and repairs. Housing 
                typically consumes the largest portion of your budget.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🚗</span> Transportation (10-15%)
              </h3>
              <p className="text-sm text-gray-600">
                Car payment, auto insurance, gas, maintenance, public transit, parking, and ride-sharing services.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🍔</span> Food (10-15%)
              </h3>
              <p className="text-sm text-gray-600">
                Groceries and household supplies. Dining out falls under "wants" in the 50/30/20 rule.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span> Utilities (5-10%)
              </h3>
              <p className="text-sm text-gray-600">
                Electricity, water, gas, internet, phone, and essential subscriptions.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">⚕️</span> Healthcare (5-10%)
              </h3>
              <p className="text-sm text-gray-600">
                Health insurance premiums, copays, prescriptions, dental, and vision care.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">💰</span> Savings (10-20%)
              </h3>
              <p className="text-sm text-gray-600">
                Emergency fund, retirement accounts (401k, IRA), investments, and sinking funds for future expenses.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use This Budget Calculator</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Add Your Income Sources</h3>
                <p className="text-gray-600 text-sm">
                  Enter all sources of income including salary, side hustles, rental income, investments, and any 
                  other regular income. Be sure to use after-tax amounts.
                </p>
              </div>
              </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Set Budget Amounts</h3>
                <p className="text-gray-600 text-sm">
                  For each expense category, enter your budget limit. You can use the "Use Recommended" button to 
                  apply suggested percentages based on your total income.
                </p>
              </div>
              </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Enter Actual Expenses</h3>
                <p className="text-gray-600 text-sm">
                  Track your actual spending in each category. Categories where actual exceeds budget will be 
                  highlighted in red for easy identification.
                </p>
              </div>
              </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                4
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Set Savings Goal</h3>
                <p className="text-gray-600 text-sm">
                  Define your monthly savings target. The calculator will show if you're meeting this goal based on 
                  your income minus expenses.
                </p>
              </div>
              </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                5
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Review Insights and Adjust</h3>
                <p className="text-gray-600 text-sm">
                  Check your balance, savings rate, overbudget alerts, and expense breakdown. Use these insights to 
                  adjust your spending habits and meet your financial goals.
                </p>
          </div>
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Budget Planning Tips</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Pay yourself first:</strong> Treat savings as a non-negotiable expense by automating transfers to savings accounts.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Track every dollar:</strong> Small purchases add up. Track all spending for at least one month to understand your patterns.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Build an emergency fund:</strong> Aim for 3-6 months of expenses in a high-yield savings account for unexpected costs.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Use the envelope system:</strong> Allocate cash to physical or digital "envelopes" for discretionary categories to prevent overspending.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Plan for irregular expenses:</strong> Set aside money monthly for annual costs like insurance, taxes, or vehicle maintenance.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Review monthly:</strong> Spend 30 minutes each month reviewing your budget, celebrating wins, and adjusting for next month.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Be realistic:</strong> Set achievable budgets based on your actual spending patterns, not ideal scenarios. Adjust gradually.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Include fun money:</strong> Budget for enjoyment to avoid feeling deprived. A sustainable budget includes reasonable wants.</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Budgeting Mistakes to Avoid</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-red-200 rounded-lg p-6 bg-red-50">
              <h3 className="font-semibold text-red-900 mb-2">❌ Not Tracking Small Expenses</h3>
              <p className="text-sm text-gray-700">
                $5 coffee daily = $150/month. Small purchases add up significantly over time.
              </p>
            </div>
            <div className="border border-red-200 rounded-lg p-6 bg-red-50">
              <h3 className="font-semibold text-red-900 mb-2">❌ Forgetting Irregular Expenses</h3>
              <p className="text-sm text-gray-700">
                Annual insurance, gifts, and car maintenance can derail your budget if not planned for.
              </p>
            </div>
            <div className="border border-red-200 rounded-lg p-6 bg-red-50">
              <h3 className="font-semibold text-red-900 mb-2">❌ Setting Unrealistic Goals</h3>
              <p className="text-sm text-gray-700">
                Cutting spending by 50% overnight rarely works. Make gradual, sustainable changes.
              </p>
            </div>
            <div className="border border-red-200 rounded-lg p-6 bg-red-50">
              <h3 className="font-semibold text-red-900 mb-2">❌ Not Adjusting the Budget</h3>
              <p className="text-sm text-gray-700">
                Life changes. Review and adjust your budget monthly to reflect current circumstances.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the 50/30/20 budget rule?</h3>
              <p className="text-sm text-gray-600">
                The 50/30/20 budget rule divides your after-tax income into three categories: 50% for needs (housing, 
                food, utilities), 30% for wants (entertainment, shopping, dining out), and 20% for savings and debt 
                repayment. This simple framework helps you maintain a balanced budget without tracking every penny.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How much should I save each month?</h3>
              <p className="text-sm text-gray-600">
                Aim to save at least 10-20% of your income each month. If you're just starting, even 5% is better 
                than nothing. Prioritize building an emergency fund of 3-6 months of expenses first, then focus on 
                retirement savings (aim for 15% including employer match), and finally other goals like down payments 
                or investments.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What expense categories should I include in my budget?</h3>
              <p className="text-sm text-gray-600">
                Essential categories include: Housing (30%), Transportation (15%), Food (15%), Utilities (10%), 
                Healthcare (8%), Savings (10-20%), Entertainment (5%), Shopping (5%), and Miscellaneous (2%). 
                Customize based on your lifestyle - add categories for childcare, pet expenses, education, or 
                whatever is relevant to your situation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I stick to my budget?</h3>
              <p className="text-sm text-gray-600">
                To maintain your budget: 1) Track all expenses to build awareness, 2) Use cash or debit cards for 
                discretionary spending to avoid debt, 3) Review your budget weekly, 4) Set realistic, achievable goals, 
                5) Automate savings transfers, 6) Plan and budget for irregular expenses, 7) Allow 5-10% flexibility 
                for unexpected costs, 8) Adjust monthly based on actual patterns. Remember, budgeting is a skill that 
                improves with practice.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What if my expenses exceed my income?</h3>
              <p className="text-sm text-gray-600">
                If expenses exceed income, take immediate action: 1) Identify non-essential expenses to cut, 2) Look 
                for ways to increase income (side hustle, asking for a raise), 3) Negotiate bills (insurance, phone, 
                cable), 4) Consider refinancing high-interest debt, 5) Downsize housing or transportation if needed. 
                Focus on the biggest expenses first - small changes there have the largest impact.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Calculators</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              href="/savings-calculator" 
              className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <PiggyBank className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Savings Calculator</h3>
              <p className="text-sm text-gray-600">Calculate how your savings will grow over time</p>
            </Link>
            <Link 
              href="/salary-calculator"
              className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <DollarSign className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Salary Calculator</h3>
              <p className="text-sm text-gray-600">Convert between hourly, monthly, and annual salary</p>
            </Link>
            <Link 
              href="/retirement-calculator" 
              className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <Calculator className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Retirement Calculator</h3>
              <p className="text-sm text-gray-600">Plan for your retirement savings goals</p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
