import React from 'react';
import { Metadata } from 'next';
import RentCalculator from '@/components/Calculator/RentCalculator';
import Link from 'next/link';
import { generateCalculatorMetadata } from '@/lib/metadata';
import { generateCalculatorSchema } from '@/lib/schema';

// ✅ 使用 Metadata 生成器
export const metadata: Metadata = generateCalculatorMetadata({
  name: 'rent-calculator',
  path: '/rent-calculator',
  title: 'Rent Calculator - Calculate Rent Affordability & Compare Rent vs Buy | Free 2024',
  description: 'Calculate rent affordability using the 30% rule, compare rent vs buy costs, and analyze 5-year projections. Free rent calculator with move-in costs, inflation adjustment, and break-even analysis.',
  keywords: [
    'rent calculator',
    'rent affordability calculator',
    'how much rent can i afford',
    'rent to income ratio',
    '30% rent rule',
    'rent vs buy calculator',
    'apartment rent calculator',
    'monthly rent calculator',
    'rent payment calculator',
    'rental affordability calculator',
    'rent budget calculator',
    'rent cost calculator',
    'renters insurance calculator',
    'move in cost calculator',
    'rent inflation calculator',
    'rent comparison calculator',
    'break even rent vs buy',
    'rental cost analysis',
    'apartment affordability calculator',
    'housing rent calculator',
  ],
  category: 'financial',
});

export default function RentCalculatorPage() {
  // ✅ 使用 Schema 生成器
  const jsonLd = generateCalculatorSchema({
    path: '/rent-calculator',
    name: 'Rent Calculator',
    description: 'Calculate rent affordability using the 30% rule, compare rent vs buy costs, and analyze 5-year projections with inflation adjustment.',
    category: 'financial',
    categoryName: 'Financial Calculators',
    faqs: [
      {
        question: 'How much rent can I afford based on my income?',
        answer: 'The 30% rule is the standard guideline: your monthly rent should not exceed 30% of your gross monthly income. For example, if you earn $5,000/month, you can afford up to $1,500/month in rent. Some experts suggest 25% for a more comfortable budget. If your rent exceeds 30%, you may be "rent burdened" and struggle with other expenses.',
      },
      {
        question: 'What is the 30% rent rule?',
        answer: 'The 30% rent rule states that you should spend no more than 30% of your gross monthly income on rent. This guideline is used by HUD (Department of Housing and Urban Development) to define housing affordability. Spending more than 30% is considered "cost-burdened," and spending more than 50% is "severely cost-burdened."',
      },
      {
        question: 'Should I rent or buy a home?',
        answer: 'Rent if: you plan to move within 3-5 years, lack down payment savings, prefer flexibility, or live in expensive markets where rent is much cheaper than buying. Buy if: you plan to stay 5+ years, have 10-20% down payment, want to build equity, and the break-even point is favorable. Use the rent vs buy comparison to calculate your specific situation.',
      },
      {
        question: 'What are typical move-in costs for renting?',
        answer: 'Typical move-in costs include: first month rent, last month rent (sometimes), security deposit (usually 1-2 months rent), application fees ($25-$100), moving costs ($500-$2,000), utility deposits ($100-$300), and renters insurance ($15-$30/month). Total move-in costs typically range from 2-4 times your monthly rent.',
      },
      {
        question: 'How much does rent increase each year?',
        answer: 'Average annual rent increases range from 2-5%, depending on location and market conditions. Hot markets may see 5-10% increases, while rent-controlled areas may be limited to 2-3%. Over 5 years, a $1,500/month rent at 3.5% annual increase would grow to $1,781/month, costing $96,000 total compared to $90,000 with no increases.',
      },
      {
        question: 'What is renters insurance and do I need it?',
        answer: 'Renters insurance covers your personal belongings, liability, and additional living expenses if your rental becomes uninhabitable. It typically costs $15-$30/month ($180-$360/year) and is often required by landlords. It covers theft, fire, water damage, and liability if someone is injured in your rental. It does NOT cover the building structure (that is the landlord responsibility).',
      },
      {
        question: 'What is the break-even point for rent vs buy?',
        answer: 'The break-even point is when the total cost of buying equals the total cost of renting, considering home appreciation and equity. Typically, this occurs after 3-7 years, depending on home prices, rent costs, mortgage rates, and appreciation rates. If you plan to stay longer than the break-even point, buying is usually more cost-effective.',
      },
      {
        question: 'How do I calculate total annual rent costs?',
        answer: 'Total annual rent costs include: monthly rent × 12, utilities × 12, renters insurance × 12, parking fees × 12, pet fees × 12, and any other recurring monthly charges. For example: $1,500 rent + $150 utilities + $20 insurance + $100 parking = $1,770/month × 12 = $21,240/year in total housing costs.',
      },
    ],
    howToSteps: [
      {
        name: 'Enter Monthly Income',
        text: 'Input your total monthly gross income. This is the foundation for calculating how much rent you can afford using the 30% rule.',
      },
      {
        name: 'Add Monthly Rent and Expenses',
        text: 'Enter your monthly rent, utilities, renters insurance, parking fees, and pet fees. These combine to form your total monthly housing cost.',
      },
      {
        name: 'Input Move-in Costs',
        text: 'Enter security deposit, moving costs, and expected rent inflation rate. This helps calculate your total move-in expenses and future rent increases.',
      },
      {
        name: 'Add Home Buying Comparison Data',
        text: 'Input home price, down payment, mortgage rate, property tax, insurance, HOA fees, maintenance costs, and expected home appreciation rate for comparison.',
      },
      {
        name: 'Calculate and Review Results',
        text: 'Click "Calculate Rent Analysis" to see your rent affordability status, annual costs, 5-year projection, and rent vs buy comparison with break-even point.',
      },
      {
        name: 'Analyze Break-Even Point',
        text: 'Review the break-even year to understand when buying becomes more cost-effective than renting, considering home appreciation and equity buildup.',
      },
    ],
    featureList: [
      'Rent Affordability Calculator (30% Rule)',
      'Rent vs Buy Comparison',
      '5-Year Cost Projection',
      'Rent Inflation Adjustment',
      'Move-in Cost Calculator',
      'Annual Rent Cost Breakdown',
      'Break-Even Point Analysis',
      'Investment Growth Calculator',
      'Rent-to-Income Ratio',
      'Security Deposit Calculator',
    ],
    articleBody: 'Rent affordability is determined by the 30% rule, which states that your monthly rent should not exceed 30% of your gross monthly income. This guideline helps ensure you have enough money for other expenses, savings, and emergencies. When comparing rent vs buy, consider factors including move-in costs, annual rent increases, home appreciation, mortgage payments, property taxes, maintenance, and the break-even point where buying becomes more cost-effective than renting.',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">Rent Calculator - Calculate Rent Affordability and Compare Rent vs Buy</h1>
        
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
                  Rent Calculator
                </span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>
        
        {/* Calculator Component */}
        <RentCalculator />

        {/* Educational Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Understanding Rent Affordability: The Complete Guide
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">What is Rent Affordability?</h3>
              <p className="text-gray-700">
                Rent affordability refers to the maximum rent you can comfortably pay based on your income without 
                becoming financially strained. The widely accepted standard is the 30% rule: your monthly rent should 
                not exceed 30% of your gross monthly income. This guideline ensures you have enough money left for 
                other essential expenses, savings, and emergencies.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">The 30% Rent Rule Explained</h3>
            <p className="text-gray-700 mb-4">
              The 30% rule is a guideline established by the U.S. Department of Housing and Urban Development (HUD):
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>
                <strong>Affordable Housing:</strong> Rent ≤ 30% of gross monthly income
              </li>
              <li>
                <strong>Cost-Burdened:</strong> Rent between 30-50% of income (financial strain likely)
              </li>
              <li>
                <strong>Severely Cost-Burdened:</strong> Rent > 50% of income (high risk of financial hardship)
              </li>
            </ul>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h4 className="text-lg font-semibold text-green-900 mb-3">Example Calculation</h4>
              <p className="text-gray-700 mb-3">
                If you earn $5,000 per month (gross income):
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Maximum Rent (30% Rule):</strong> $5,000 × 30% = $1,500/month</li>
                <li><strong>Conservative Budget (25%):</strong> $5,000 × 25% = $1,250/month</li>
                <li><strong>Stretched Budget (40%):</strong> $5,000 × 40% = $2,000/month (not recommended)</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included in Monthly Rent Costs?</h3>
            <p className="text-gray-700 mb-4">
              Total monthly housing costs include more than just base rent:
            </p>

            <div className="overflow-x-auto overflow-y-hidden mb-6">
              <table className="w-full min-w-[350px] text-sm border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left">Expense</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Typical Range</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Example ($1,500 rent)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Base Rent</td>
                    <td className="border border-gray-300 px-3 py-2">Varies by location</td>
                    <td className="border border-gray-300 px-3 py-2">$1,500</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Utilities</td>
                    <td className="border border-gray-300 px-3 py-2">$100-$300/month</td>
                    <td className="border border-gray-300 px-3 py-2">$150</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Renters Insurance</td>
                    <td className="border border-gray-300 px-3 py-2">$15-$30/month</td>
                    <td className="border border-gray-300 px-3 py-2">$20</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Parking Fee</td>
                    <td className="border border-gray-300 px-3 py-2">$50-$200/month</td>
                    <td className="border border-gray-300 px-3 py-2">$100</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Pet Fee</td>
                    <td className="border border-gray-300 px-3 py-2">$25-$100/month</td>
                    <td className="border border-gray-300 px-3 py-2">$50</td>
                  </tr>
                  <tr className="bg-gray-100 font-semibold">
                    <td className="border border-gray-300 px-3 py-2">Total Monthly Cost</td>
                    <td className="border border-gray-300 px-3 py-2">-</td>
                    <td className="border border-gray-300 px-3 py-2">$1,820</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Move-in Costs: What to Expect</h3>
            <p className="text-gray-700 mb-4">
              Moving into a rental requires significant upfront cash. Typical move-in costs include:
            </p>

            <h4 className="text-lg font-semibold text-gray-800 mb-3">1. First Month's Rent</h4>
            <p className="text-gray-700 mb-4">
              Required by all landlords. This is your rent for the first month of occupancy.
            </p>

            <h4 className="text-lg font-semibold text-gray-800 mb-3">2. Last Month's Rent</h4>
            <p className="text-gray-700 mb-4">
              Some landlords require last month's rent upfront (not allowed in all states). This serves as 
              prepayment for your final month when you move out.
            </p>

            <h4 className="text-lg font-semibold text-gray-800 mb-3">3. Security Deposit</h4>
            <p className="text-gray-700 mb-4">
              Typically 1-2 months' rent, held to cover damages beyond normal wear and tear. Refundable if 
              you leave the unit in good condition. Some states limit security deposits to 1 month's rent.
            </p>

            <h4 className="text-lg font-semibold text-gray-800 mb-3">4. Application Fees</h4>
            <p className="text-gray-700 mb-4">
              $25-$100 per applicant for credit and background checks. Non-refundable even if not approved.
            </p>

            <h4 className="text-lg font-semibold text-gray-800 mb-3">5. Moving Costs</h4>
            <p className="text-gray-700 mb-4">
              $500-$2,000+ depending on distance and amount of belongings:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>DIY Move:</strong> $200-$500 (truck rental, gas, supplies)</li>
              <li><strong>Local Movers:</strong> $500-$1,500 (3-5 hours, 2-3 movers)</li>
              <li><strong>Long-Distance Movers:</strong> $2,000-$5,000+ (cross-country)</li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h4 className="text-lg font-semibold text-yellow-900 mb-3">Example Move-in Costs</h4>
              <p className="text-gray-700 mb-3">
                For a $1,500/month apartment:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>First Month Rent:</strong> $1,500</li>
                <li><strong>Last Month Rent:</strong> $1,500</li>
                <li><strong>Security Deposit:</strong> $1,500</li>
                <li><strong>Application Fee:</strong> $50</li>
                <li><strong>Moving Costs:</strong> $800</li>
                <li><strong>Utility Deposits:</strong> $200</li>
                <li className="font-semibold text-yellow-900"><strong>Total Move-in Cost:</strong> $5,550</li>
              </ul>
              <p className="text-gray-700 mt-3">
                <strong>Tip:</strong> Budget 3-4 times your monthly rent for move-in expenses.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Rent Inflation: Planning for Increases</h3>
            <p className="text-gray-700 mb-4">
              Rent rarely stays the same. Understanding rent inflation is crucial for long-term budgeting:
            </p>

            <h4 className="text-lg font-semibold text-gray-800 mb-3">Average Rent Increases by Market</h4>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Stable Markets:</strong> 2-3% annually</li>
              <li><strong>Growing Markets:</strong> 4-6% annually</li>
              <li><strong>Hot Markets:</strong> 7-10%+ annually (Austin, Phoenix, Miami)</li>
              <li><strong>Rent-Controlled Areas:</strong> Limited to 2-5% (NYC, SF, LA)</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">5-Year Rent Projection Example</h4>
              <p className="text-gray-700 mb-3">
                Starting rent: $1,500/month with 3.5% annual increases:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Year 1:</strong> $1,500/month = $18,000/year</li>
                <li><strong>Year 2:</strong> $1,553/month = $18,630/year</li>
                <li><strong>Year 3:</strong> $1,607/month = $19,282/year</li>
                <li><strong>Year 4:</strong> $1,663/month = $19,957/year</li>
                <li><strong>Year 5:</strong> $1,721/month = $20,656/year</li>
                <li className="font-semibold text-blue-900"><strong>Total 5-Year Cost:</strong> $96,525</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Without increases, you would pay only $90,000 over 5 years—a difference of $6,525.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Rent vs Buy: The Ultimate Comparison</h3>
            <p className="text-gray-700 mb-4">
              One of the most important financial decisions is whether to rent or buy. Here's how to analyze it:
            </p>

            <h4 className="text-lg font-semibold text-gray-800 mb-3">When Renting Makes Sense</h4>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Short-term plans:</strong> Moving within 3-5 years</li>
                <li><strong>Flexibility needed:</strong> Job uncertainty or lifestyle changes</li>
                <li><strong>Limited savings:</strong> Can't afford 10-20% down payment</li>
                <li><strong>Expensive markets:</strong> Rent is much cheaper than buying (SF, NYC)</li>
                <li><strong>No maintenance:</strong> Landlord handles repairs and upkeep</li>
                <li><strong>Lower upfront costs:</strong> 3-4x monthly rent vs 20-25% of home price</li>
                <li><strong>Investment opportunity:</strong> Can invest the difference in stocks/bonds</li>
              </ul>
            </div>

            <h4 className="text-lg font-semibold text-gray-800 mb-3">When Buying Makes Sense</h4>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Long-term plans:</strong> Staying 5+ years</li>
                <li><strong>Stable income:</strong> Secure job and emergency fund</li>
                <li><strong>Down payment ready:</strong> 10-20% saved</li>
                <li><strong>Build equity:</strong> Monthly payments build ownership</li>
                <li><strong>Tax benefits:</strong> Mortgage interest and property tax deductions</li>
                <li><strong>Home appreciation:</strong> Property value increases over time</li>
                <li><strong>Fixed costs:</strong> 30-year fixed mortgage locks in payment</li>
                <li><strong>Customization:</strong> Freedom to renovate and personalize</li>
              </ul>
            </div>

            <h4 className="text-lg font-semibold text-gray-800 mb-3">Break-Even Point Analysis</h4>
            <p className="text-gray-700 mb-4">
              The break-even point is when the total cost of buying equals the total cost of renting. Key factors:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Down payment:</strong> Large upfront cost that could be invested elsewhere</li>
              <li><strong>Closing costs:</strong> 2-5% of home price</li>
              <li><strong>Monthly mortgage:</strong> Principal + interest + taxes + insurance + HOA</li>
              <li><strong>Maintenance:</strong> 1-2% of home value annually</li>
              <li><strong>Home appreciation:</strong> Typically 3-5% annually</li>
              <li><strong>Equity buildup:</strong> Paying down principal builds wealth</li>
              <li><strong>Rent increases:</strong> 2-5% annually</li>
              <li><strong>Opportunity cost:</strong> Could invest down payment at 7-10% return</li>
            </ul>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
              <h4 className="text-lg font-semibold text-purple-900 mb-3">Example Break-Even Scenario</h4>
              <p className="text-gray-700 mb-3">
                <strong>Renting:</strong> $1,500/month with 3.5% annual increases
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Buying:</strong> $350,000 home, $70,000 down (20%), 7% mortgage rate
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
                <li><strong>Monthly mortgage payment:</strong> $1,862 (P&I)</li>
                <li><strong>Property tax:</strong> $350/month (1.2%)</li>
                <li><strong>Home insurance:</strong> $100/month</li>
                <li><strong>Maintenance:</strong> $292/month (1%)</li>
                <li><strong>Total monthly cost:</strong> $2,604</li>
              </ul>
              <p className="text-gray-700 mb-3">
                <strong>5-Year Costs:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Renting:</strong> $96,525 (pure expense)</li>
                <li><strong>Buying:</strong> $156,240 total spent - $85,000 equity = $71,240 net cost</li>
                <li className="font-semibold text-purple-900"><strong>Break-Even:</strong> Year 4 (buying becomes cheaper)</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Strategies to Afford Higher Rent</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">💰 Increase Income</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Ask for a raise or promotion</li>
                  <li>Take on side gigs or freelance work</li>
                  <li>Get a roommate to split costs</li>
                  <li>Rent out a parking space or storage</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-green-900 mb-3">💳 Reduce Expenses</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Cut non-essential subscriptions</li>
                  <li>Cook at home instead of dining out</li>
                  <li>Use public transit instead of car</li>
                  <li>Shop for cheaper insurance rates</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-purple-900 mb-3">🏠 Adjust Housing</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Move to a less expensive neighborhood</li>
                  <li>Downsize to a smaller unit</li>
                  <li>Consider a studio or 1-bedroom</li>
                  <li>Look for rent specials (1 month free)</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-yellow-900 mb-3">📋 Negotiate</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Negotiate rent with landlord</li>
                  <li>Offer longer lease for lower rent</li>
                  <li>Ask for utilities to be included</li>
                  <li>Request waived fees (pet, parking)</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Renting Mistakes to Avoid</h3>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">❌</span>
                  <span><strong>Exceeding 30% of income:</strong> Leaves little room for savings, emergencies, or other goals.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">❌</span>
                  <span><strong>Forgetting additional costs:</strong> Utilities, insurance, parking, and pet fees add up quickly.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">❌</span>
                  <span><strong>Not budgeting for move-in costs:</strong> Need 3-4x monthly rent upfront.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">❌</span>
                  <span><strong>Skipping renters insurance:</strong> $20/month protects thousands in belongings.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">❌</span>
                  <span><strong>Ignoring rent increases:</strong> Budget for 3-5% annual increases.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">❌</span>
                  <span><strong>Not comparing rent vs buy:</strong> Buying may be cheaper long-term.</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Use This Calculator</h3>
            <ol className="list-decimal pl-6 mb-6 space-y-3 text-gray-700">
              <li>
                <strong>Enter your monthly income:</strong> Use gross income (before taxes).
              </li>
              <li>
                <strong>Add monthly rent and expenses:</strong> Include utilities, insurance, parking, and pet fees.
              </li>
              <li>
                <strong>Input move-in costs:</strong> Security deposit, moving costs, and expected rent inflation.
              </li>
              <li>
                <strong>Add home buying comparison data:</strong> Home price, down payment, mortgage rate, taxes, insurance, HOA, maintenance, and appreciation.
              </li>
              <li>
                <strong>Review affordability status:</strong> See if your rent is within the 30% guideline.
              </li>
              <li>
                <strong>Analyze 5-year projection:</strong> Understand how rent increases affect total costs.
              </li>
              <li>
                <strong>Compare rent vs buy:</strong> See the break-even point and net costs.
              </li>
              <li>
                <strong>Make an informed decision:</strong> Use the data to decide whether to rent or buy.
              </li>
            </ol>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">💡 Pro Tip</h4>
              <p className="text-gray-700">
                If renting is significantly cheaper than buying in your area, invest the difference in a diversified 
                portfolio (stocks, bonds, index funds). At 7% annual return, investing $1,000/month for 5 years 
                grows to $71,000+. This can become your future down payment or retirement fund.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
            
            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Is the 30% rent rule realistic in expensive cities?</h4>
                <p className="text-gray-700">
                  In high-cost cities like San Francisco, New York, or Los Angeles, the 30% rule is often impossible 
                  for average earners. Many residents spend 40-50% on rent. If this is your situation, prioritize 
                  building savings, avoid additional debt, and consider roommates or moving to a more affordable area 
                  when possible.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Should I use gross or net income for the 30% rule?</h4>
                <p className="text-gray-700">
                  The 30% rule uses gross income (before taxes). However, some financial advisors recommend using 
                  net income (after taxes) for a more conservative budget. Using net income typically results in 
                  a rent budget of about 20-25% of gross income, providing more financial cushion.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Can I negotiate rent with my landlord?</h4>
                <p className="text-gray-700">
                  Yes, especially in these situations: moving in during off-season (winter), signing a longer lease 
                  (18-24 months), paying several months upfront, being a model tenant with excellent credit, or when 
                  the unit has been vacant for a while. Research comparable rents in the area to make a strong case.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">What if I can't afford the security deposit?</h4>
                <p className="text-gray-700">
                  Some options: ask if the landlord accepts installment payments, use a security deposit alternative 
                  service (like Rhino or TheGuarantors), look for rentals with lower deposits, ask family for a loan, 
                  or consider a side gig to save up. Never skip renters insurance to save money—it's too important.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">How do I calculate the true cost of renting vs buying?</h4>
                <p className="text-gray-700">
                  Use this calculator's rent vs buy comparison. Key factors: down payment opportunity cost (could 
                  invest at 7-10% return), monthly mortgage vs rent, property taxes, insurance, maintenance (1-2% 
                  of home value), HOA fees, home appreciation (3-5% annually), equity buildup, rent increases 
                  (3-5% annually), and transaction costs (6% to sell).
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">What's the best way to save for a down payment while renting?</h4>
                <p className="text-gray-700">
                  Automate savings by setting up automatic transfers to a high-yield savings account (4-5% APY). 
                  Aim to save 20% of income. Cut expenses where possible. Consider a side hustle. Take advantage 
                  of first-time homebuyer programs (FHA 3.5% down, VA 0% down, USDA 0% down). Some states offer 
                  down payment assistance grants.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Related Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/home-affordability-calculator"
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-blue-600 mb-2">Home Affordability Calculator</h3>
              <p className="text-sm text-gray-600">Calculate how much house you can afford based on income</p>
            </Link>

            <Link
              href="/mortgage-calculator"
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-blue-600 mb-2">Mortgage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate monthly mortgage payments with taxes and insurance</p>
            </Link>

            <Link
              href="/debt-to-income-calculator"
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-blue-600 mb-2">DTI Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your debt-to-income ratio for loan qualification</p>
            </Link>

            <Link
              href="/savings-calculator"
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-blue-600 mb-2">Savings Calculator</h3>
              <p className="text-sm text-gray-600">Calculate how long it takes to save for a down payment</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

