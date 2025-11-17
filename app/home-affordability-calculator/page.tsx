import React from 'react';
import { Metadata } from 'next';
import HomeAffordabilityCalculator from '@/components/Calculator/HomeAffordabilityCalculator';
import Link from 'next/link';
import { generateCalculatorMetadata } from '@/lib/metadata';
import { generateCalculatorSchema } from '@/lib/schema';

// ✅ 使用 Metadata 生成器（自动生成所有必需字段）
export const metadata: Metadata = generateCalculatorMetadata({
  name: 'home-affordability',
  path: '/home-affordability-calculator',
  title: 'Home Affordability Calculator - How Much House Can I Afford? | Free 2024',
  description: 'Calculate how much house you can afford based on income, debts, and down payment. Use the 28/36 rule to determine your home buying budget. Free home affordability calculator with DTI analysis.',
  keywords: [
    'home affordability calculator',
    'how much house can i afford',
    'home buying calculator',
    'mortgage affordability calculator',
    'house affordability calculator',
    'home budget calculator',
    'debt to income ratio calculator',
    '28/36 rule calculator',
    'home loan affordability',
    'mortgage payment calculator',
    'home purchase calculator',
    'housing budget calculator',
    'first time home buyer calculator',
    'home price calculator',
    'affordable home calculator',
    'income to home price calculator',
    'home buying budget calculator',
    'mortgage qualification calculator',
    'home affordability estimator',
    'real estate affordability calculator',
  ],
  category: 'financial',
});

export default function HomeAffordabilityCalculatorPage() {
  // ✅ 使用 Schema 生成器（自动生成所有5个核心 Schema）
  const jsonLd = generateCalculatorSchema({
    path: '/home-affordability-calculator',
    name: 'Home Affordability Calculator',
    description: 'Calculate how much house you can afford based on your income, debts, and down payment using the 28/36 rule.',
    category: 'financial',
    categoryName: 'Financial Calculators',
    faqs: [
      {
        question: 'How much house can I afford based on my income?',
        answer: 'A general rule is the 28/36 rule: your housing costs should not exceed 28% of your gross monthly income, and your total debt payments should not exceed 36%. For example, with a $75,000 annual income ($6,250/month), you can afford up to $1,750/month in housing costs.',
      },
      {
        question: 'What is the 28/36 rule in home buying?',
        answer: 'The 28/36 rule is a guideline used by lenders: 28% refers to the front-end ratio (housing costs should not exceed 28% of gross income), and 36% refers to the back-end ratio (total debt payments including housing should not exceed 36% of gross income).',
      },
      {
        question: 'What factors affect how much house I can afford?',
        answer: 'Key factors include: annual gross income, existing monthly debt payments, down payment amount, mortgage interest rate, loan term, property taxes, home insurance, HOA fees, and credit score. Higher income and down payment increase affordability, while higher debts and interest rates decrease it.',
      },
      {
        question: 'How much down payment do I need to buy a house?',
        answer: 'Minimum down payments vary: conventional loans require 3-5%, FHA loans require 3.5%, VA loans require 0%, and USDA loans require 0%. However, putting down 20% helps you avoid PMI (Private Mortgage Insurance) and often secures better interest rates.',
      },
      {
        question: 'What is included in monthly housing costs?',
        answer: 'Monthly housing costs include: principal and interest on the mortgage, property taxes, homeowners insurance, HOA fees (if applicable), and PMI (if down payment is less than 20%). This is often referred to as PITI (Principal, Interest, Taxes, Insurance).',
      },
      {
        question: 'How does my debt-to-income ratio affect home buying?',
        answer: 'Lenders use DTI to assess your ability to manage monthly payments. A front-end DTI below 28% and back-end DTI below 36% is ideal. Higher DTI ratios may result in loan denial or higher interest rates. Some lenders accept up to 43% DTI for qualified borrowers.',
      },
      {
        question: 'How much cash do I need to buy a house?',
        answer: 'Total cash needed includes: down payment (3-20% of home price), closing costs (2-5% of home price), and emergency fund (3-6 months of expenses). For a $300,000 home with 10% down, you might need $30,000 (down) + $10,500 (closing) + $15,000 (emergency) = $55,500 total.',
      },
      {
        question: 'Can I afford a house with bad credit?',
        answer: 'Yes, but with limitations. FHA loans accept credit scores as low as 580 (500 with 10% down). However, lower credit scores result in higher interest rates, which reduces affordability. Improving your credit score before buying can save thousands in interest over the loan term.',
      },
    ],
    howToSteps: [
      {
        name: 'Enter Annual Income',
        text: 'Input your total annual gross income including salary, bonuses, and commissions. This is the foundation for calculating how much house you can afford.',
      },
      {
        name: 'Add Monthly Debt Payments',
        text: 'Enter all recurring monthly debt obligations including credit cards, car loans, student loans, and personal loans. This affects your back-end debt-to-income ratio.',
      },
      {
        name: 'Input Down Payment',
        text: 'Enter the amount you have saved for a down payment. A larger down payment increases affordability and may help you avoid PMI if it reaches 20%.',
      },
      {
        name: 'Set Interest Rate and Loan Term',
        text: 'Enter the current mortgage interest rate and choose your loan term (15, 20, or 30 years). Lower rates and longer terms increase affordability.',
      },
      {
        name: 'Add Local Costs',
        text: 'Input property tax rate, annual home insurance, and HOA fees for your target area. These costs vary significantly by location and affect your monthly payment.',
      },
      {
        name: 'Calculate and Review Results',
        text: 'Click "Calculate Affordability" to see your maximum home price, monthly payment breakdown, DTI ratios, and total cash needed. Review the budget range recommendations.',
      },
    ],
    featureList: [
      '28/36 Rule Calculation',
      'Debt-to-Income Ratio Analysis',
      'Maximum Home Price Calculation',
      'Monthly Payment Breakdown',
      'Cash Needed Estimation',
      'Budget Range Recommendations',
      'DTI Status Indicators',
      'Emergency Fund Planning',
    ],
    articleBody: 'Home affordability refers to the maximum home price you can comfortably purchase based on your income, debts, down payment, and other financial factors. The 28/36 rule is a time-tested guideline used by mortgage lenders: 28% front-end ratio means your monthly housing costs should not exceed 28% of your gross monthly income, and 36% back-end ratio means your total monthly debt payments should not exceed 36% of your gross monthly income. Key factors that affect home affordability include annual gross income, existing monthly debts, down payment amount, mortgage interest rate, loan term, property taxes, home insurance, HOA fees, and credit score.',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">Home Affordability Calculator - Calculate How Much House You Can Afford</h1>
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto" 
                itemScope itemType="https://schema.org/BreadcrumbList">
              {/* Home */}
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                  <span itemProp="name">Home</span>
                </a>
                <meta itemProp="position" content="1" />
              </li>
              <li className="text-gray-400">/</li>
              
              {/* Financial Category */}
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="/financial" itemProp="item" className="hover:text-blue-600 transition-colors">
                  <span itemProp="name">Financial</span>
                </a>
                <meta itemProp="position" content="2" />
              </li>
              <li className="text-gray-400">/</li>
              
              {/* Current Calculator */}
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" className="text-gray-900 font-semibold">
                  Home Affordability Calculator
                </span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>
        
        {/* Calculator Component */}
        <HomeAffordabilityCalculator />

        {/* Educational Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Understanding Home Affordability: The Complete Guide
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">What is Home Affordability?</h3>
              <p className="text-gray-700">
                Home affordability refers to the maximum home price you can comfortably purchase based on your income, 
                debts, down payment, and other financial factors. It's not just about getting approved for a loan—it's 
                about ensuring you can maintain your lifestyle while making mortgage payments.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">The 28/36 Rule Explained</h3>
            <p className="text-gray-700 mb-4">
              The 28/36 rule is a time-tested guideline used by mortgage lenders to determine how much you can afford:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>
                <strong>28% Front-End Ratio:</strong> Your monthly housing costs (mortgage payment, property taxes, 
                insurance, HOA fees) should not exceed 28% of your gross monthly income.
              </li>
              <li>
                <strong>36% Back-End Ratio:</strong> Your total monthly debt payments (housing costs plus car loans, 
                student loans, credit cards, etc.) should not exceed 36% of your gross monthly income.
              </li>
            </ul>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h4 className="text-lg font-semibold text-green-900 mb-3">Example Calculation</h4>
              <p className="text-gray-700 mb-3">
                Let's say you earn $75,000 per year ($6,250/month):
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Maximum Housing Cost:</strong> $6,250 × 28% = $1,750/month</li>
                <li><strong>Maximum Total Debt:</strong> $6,250 × 36% = $2,250/month</li>
                <li><strong>If you have $500 in other debts:</strong> You can afford $1,750/month in housing costs</li>
                <li><strong>If you have $1,000 in other debts:</strong> You can afford $1,250/month in housing costs</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Factors That Affect Home Affordability</h3>
            
            <h4 className="text-lg font-semibold text-gray-800 mb-3">1. Annual Gross Income</h4>
            <p className="text-gray-700 mb-4">
              Your income is the foundation of affordability. Lenders use gross income (before taxes) to calculate 
              debt-to-income ratios. Include all sources: salary, bonuses, commissions, rental income, and investment income.
            </p>

            <h4 className="text-lg font-semibold text-gray-800 mb-3">2. Existing Monthly Debts</h4>
            <p className="text-gray-700 mb-4">
              All recurring monthly obligations count toward your back-end DTI: car loans, student loans, credit card 
              minimum payments, personal loans, child support, and alimony. Lower debts mean higher affordability.
            </p>

            <h4 className="text-lg font-semibold text-gray-800 mb-3">3. Down Payment Amount</h4>
            <p className="text-gray-700 mb-4">
              A larger down payment directly increases the home price you can afford. It also helps you:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Avoid PMI (Private Mortgage Insurance) with 20% down</li>
              <li>Secure better interest rates</li>
              <li>Reduce monthly payments</li>
              <li>Build equity faster</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-800 mb-3">4. Mortgage Interest Rate</h4>
            <p className="text-gray-700 mb-4">
              Interest rates significantly impact affordability. A 1% rate increase can reduce your buying power by 10-15%. 
              Shop around for the best rates and consider rate locks when you find a favorable rate.
            </p>

            <h4 className="text-lg font-semibold text-gray-800 mb-3">5. Property Taxes and Insurance</h4>
            <p className="text-gray-700 mb-4">
              These costs vary widely by location. Property taxes can range from 0.5% to 2%+ of home value annually. 
              Research local rates before house hunting to avoid surprises.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Strategies to Increase Home Affordability</h3>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-yellow-900 mb-3">1. Pay Down Existing Debts</h4>
              <p className="text-gray-700">
                Reducing monthly debt payments directly increases your back-end DTI ratio. Focus on high-interest debts 
                first, especially credit cards and personal loans.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-yellow-900 mb-3">2. Increase Your Down Payment</h4>
              <p className="text-gray-700">
                Save more for a larger down payment. Consider gifts from family, down payment assistance programs, 
                or using retirement account funds (with caution).
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-yellow-900 mb-3">3. Improve Your Credit Score</h4>
              <p className="text-gray-700">
                A higher credit score qualifies you for better interest rates. Pay bills on time, reduce credit 
                utilization, and dispute any errors on your credit report.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-yellow-900 mb-3">4. Consider Different Loan Types</h4>
              <p className="text-gray-700">
                FHA loans (3.5% down), VA loans (0% down for veterans), and USDA loans (0% down for rural areas) 
                can make homeownership more accessible.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Common Mistakes to Avoid</h3>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Maxing Out Your Budget</h4>
              <p className="text-gray-700">
                Just because you qualify for a certain amount doesn't mean you should borrow it all. Leave room for 
                unexpected expenses, lifestyle changes, and savings goals.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Forgetting About Closing Costs</h4>
              <p className="text-gray-700">
                Closing costs typically run 2-5% of the home price. Budget for these in addition to your down payment 
                and emergency fund.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Ignoring Maintenance Costs</h4>
              <p className="text-gray-700">
                Budget 1-2% of home value annually for maintenance and repairs. A $300,000 home might need $3,000-$6,000 
                per year for upkeep.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Skipping Pre-Approval</h4>
              <p className="text-gray-700">
                Get pre-approved before house hunting. It shows sellers you're serious and helps you avoid falling in 
                love with homes you can't afford.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Next Steps</h3>
            <p className="text-gray-700 mb-4">
              After calculating your home affordability:
            </p>
            <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
              <li>Get pre-approved by 2-3 lenders to compare rates</li>
              <li>Research neighborhoods within your budget</li>
              <li>Build your down payment and emergency fund</li>
              <li>Work with a real estate agent familiar with your target area</li>
              <li>Stay flexible and be patient—the right home will come</li>
            </ol>

            <div className="bg-blue-100 border border-blue-300 rounded-lg p-6 mt-8">
              <p className="text-gray-800 font-semibold mb-2">
                💡 Pro Tip: Conservative Approach
              </p>
              <p className="text-gray-700">
                Consider aiming for 25% of gross income for housing instead of 28%. This provides a financial cushion 
                for unexpected expenses and helps you maintain your quality of life while building wealth.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
