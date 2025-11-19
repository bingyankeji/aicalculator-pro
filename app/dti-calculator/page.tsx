import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import DTICalculator from '@/components/Calculator/DTICalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'DTI Calculator - Debt-to-Income Ratio Calculator | Loan Qualification Tool',
  description: 'Free debt-to-income ratio calculator. Check mortgage and loan qualification for FHA, VA, conventional, USDA loans. Calculate front-end and back-end DTI with personalized improvement tips.',
  keywords: [
    'dti calculator',
    'debt to income ratio calculator',
    'debt to income calculator',
    'dti ratio calculator',
    'loan qualification calculator',
    'mortgage qualification calculator',
    'fha dti requirements',
    'va loan dti calculator',
    'conventional loan dti',
    'front end dti calculator',
    'back end dti calculator',
    'housing ratio calculator',
    'debt ratio calculator',
    'mortgage approval calculator',
    'income to debt ratio',
    'qualify for mortgage',
    'dti requirements',
    'loan approval calculator',
    'mortgage dti calculator',
    'debt income ratio'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'DTI Calculator - Check Your Debt-to-Income Ratio for Loan Qualification',
    description: 'Calculate your debt-to-income ratio and check loan qualification. Includes FHA, VA, conventional, and USDA loan requirements with improvement strategies.',
    type: 'website',
    url: getUrl('/dti-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('dti'),
      width: 1200,
      height: 630,
      alt: 'DTI Calculator - Debt-to-Income Ratio Tool'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DTI Calculator - Debt-to-Income Ratio for Loans',
    description: 'Calculate your DTI ratio and check if you qualify for mortgages and loans. Includes improvement tips and lender requirements.',
    images: [getOgImage('dti')],
    creator: '@aicalculator'
  },
  alternates: {
    canonical: getUrl('/dti-calculator')
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

export default function DTICalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/dti-calculator'),
        name: 'Debt-to-Income Ratio Calculator',
        url: getUrl('/dti-calculator'),
        description: 'Free DTI calculator to determine debt-to-income ratio for mortgage and loan qualification. Calculate front-end housing ratio and back-end total debt ratio with lender requirements for conventional, FHA, VA, and USDA loans.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Front-end DTI calculation (housing ratio)',
          'Back-end DTI calculation (total debt ratio)',
          'Loan qualification checker',
          'Conventional loan requirements (28/36 rule)',
          'FHA loan requirements (31/43)',
          'VA loan requirements (41% back-end)',
          'USDA loan requirements (29/41)',
          'Debt breakdown analysis',
          'Income calculation tools',
          'Personalized improvement suggestions',
          'Maximum affordable housing calculation',
          'Required debt reduction calculator'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/dti-calculator'),
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
            name: 'DTI Calculator',
            item: getUrl('/dti-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/dti-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a good debt-to-income ratio?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A good debt-to-income (DTI) ratio is generally 36% or lower, with 28% or less for housing expenses alone. DTI categories: Excellent (0-20%): Strong financial position, easily qualifies for best loan terms and lowest rates. Good (20-36%): Healthy debt level, qualifies for most loans with competitive rates. Fair (37-43%): May qualify but with higher rates or larger down payment requirements. Some loan types (FHA) allow up to 43% with strong compensating factors. Poor (44-49%): Difficult to qualify, limited loan options, requires significant improvement. Very Poor (50%+): Generally disqualifies from most loans, urgent debt reduction needed. Real example: $5,000 monthly income with $1,200 in debt = 24% DTI (good). Same income with $2,500 debt = 50% DTI (very poor). Most conventional lenders prefer 36% or lower. FHA loans may allow up to 43%, while VA loans can stretch to 41% for qualified veterans. Lower DTI means better loan terms, lower interest rates, higher approval probability, and more financial flexibility.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the difference between front-end and back-end DTI?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Front-end DTI (housing ratio) includes only housing-related expenses divided by gross monthly income: mortgage principal and interest, property taxes, homeowners insurance, HOA fees, and PMI (if applicable). Formula: Housing Expenses ÷ Gross Income. Example: $1,400 housing costs ÷ $5,000 income = 28% front-end DTI. Lenders prefer ≤28%. Back-end DTI (total debt ratio) includes ALL monthly debt obligations: all front-end housing costs plus car loans/leases, student loans, credit card minimum payments, personal loans, child support/alimony, and other recurring debt. Formula: Total Debt Payments ÷ Gross Income. Example: $1,400 housing + $600 other debts = $2,000 ÷ $5,000 = 40% back-end DTI. Lenders prefer ≤36% (conventional) or ≤43% (FHA). Both ratios matter: Front-end ensures you can afford the house itself, while back-end ensures you can manage all debts plus housing. Lenders evaluate both. A common standard is the 28/36 rule: 28% front-end max, 36% back-end max. Exceeding back-end limits is more serious than front-end, as it indicates overall debt burden.'
            }
          },
          {
            '@type': 'Question',
            name: 'What debts are included in DTI calculation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'DTI includes all recurring monthly debt obligations reported to credit bureaus. Included debts: Mortgage/rent (principal, interest, taxes, insurance, HOA), car loans and leases (full payment), student loans (actual payment, not deferred), credit cards (minimum payment required, typically 1-3% of balance), personal loans, home equity loans/HELOCs (if drawing), child support and alimony (court-ordered), and other installment loans. NOT included: Utilities (electric, gas, water, internet), groceries and food, transportation costs (gas, insurance), medical expenses (unless installment debt), streaming services and subscriptions, and phone bills. Special cases: Student loans in deferment: Some lenders use 0.5-1% of balance as payment, income-based repayment at $0/month: Lender policies vary, some still calculate payment, and authorized user accounts: May or may not count depending on lender. Example calculation: $6,000 monthly income. Debts: $1,200 mortgage + $350 car loan + $200 student loan + $100 credit card minimums = $1,850 total. DTI = $1,850 ÷ $6,000 = 30.8%. Note: Lenders verify debts through credit reports and may require documentation for non-credit-report debts like child support.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are DTI requirements for different loan types?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Loan types have different DTI requirements based on risk profiles and government backing. Conventional Loans: Front-end ≤28%, back-end ≤36% (standard 28/36 rule). May allow up to 45% with excellent credit (740+), large down payment (20%+), and significant reserves. Best for: Traditional borrowers with good credit and stable income. FHA Loans (Federal Housing Administration): Front-end ≤31%, back-end ≤43% (31/43 rule). May stretch to 50% with strong compensating factors: excellent payment history, minimal increase from rent to mortgage, or significant reserves. Easier qualification than conventional. Best for: First-time buyers, lower credit scores (580+), smaller down payments (3.5%). VA Loans (Veterans Affairs): No front-end limit (housing ratio not capped), back-end ≤41% typically, some lenders allow up to 60% with strong residual income. Focus on residual income calculation unique to VA loans. Best for: Veterans and active military, no down payment required. USDA Loans (Rural Development): Front-end ≤29%, back-end ≤41% (29/41 rule). Stricter than FHA, properties must be in eligible rural areas. Best for: Low-to-moderate income buyers in qualifying rural areas. Jumbo Loans: Front-end ≤28%, back-end ≤36% or lower. Stricter standards than conventional, may require ≤30-33% DTI. Best for: High-value properties over conforming loan limits.'
            }
          },
          {
            '@type': 'Question',
            name: 'How can I improve my debt-to-income ratio?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Improving DTI requires either reducing debt or increasing income - or both. Debt Reduction Strategies: Pay off smallest debts first (eliminates entire payment from DTI), pay down credit cards (even without payoff, reduces minimum payments), avoid new debt (don\'t open credit cards or loans before mortgage), consider debt consolidation (lower overall payment), sell vehicles or downgrade (eliminate/reduce car payments), and refinance high-payment debts (lower monthly obligations). Payoff priority example: $200/month car loan with 6 months left - pay it off completely to eliminate the entire payment from DTI calculation. Income Increase Strategies: Ask for a raise or promotion (permanently increases income), take on side gig or second job (must have 2-year history for most lenders), add overtime (must be consistent and documented), include bonus/commission income (needs 2-year history), add co-borrower with income (spouse or family member), and document additional income (rental, investments). Example improvement plan: Starting: $5,000 income, $2,000 debts = 40% DTI. Step 1: Pay off $200 car loan → 36% DTI. Step 2: Pay down credit cards by $150/month → 33% DTI. Step 3: Side income adds $500/month → 30% DTI. Result: From unqualified to easily qualified in 6-12 months. Timeline: Debt payoff is fastest (immediate impact), income increase takes 2-12 months to document, and combination approach typically takes 3-6 months.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does my income affect my DTI ratio?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, income is the denominator in DTI calculation, so higher income directly lowers your ratio with the same debt. DTI Formula: Total Monthly Debt ÷ Gross Monthly Income × 100. Example with $2,000 debt: $4,000 income → 50% DTI (poor), $5,000 income → 40% DTI (fair), $6,000 income → 33% DTI (good), and $8,000 income → 25% DTI (excellent). What income counts for DTI: Base salary/wages (W-2 income), overtime and bonuses (with 2-year history), commission (with 2-year history and stability), self-employment income (average of 2 years, after expenses), part-time job income (2-year history required), rental income (75% of rental income after expenses), Social Security and pension (if continuing 3+ years), alimony/child support (with documentation, continuing 3+ years). What income does NOT count: One-time bonuses or windfalls, recent raises (may need 30-day history), income from job starting in less than 30 days, and non-recurring income. Verification requirements: 2 years tax returns for self-employed/bonus/commission, recent pay stubs (30 days), W-2s for past 2 years, and 1099s for contract work. Strategy: Document all eligible income sources to maximize the denominator and lower your DTI. Even $500/month extra documented income significantly improves qualification.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I get a mortgage with high DTI?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, but options are limited and require strong compensating factors. High DTI means above 43% for most loan types. Loan options with high DTI: FHA loans (up to 50% with compensating factors like excellent credit 680+, minimal housing payment increase from current rent, significant cash reserves 3-6 months, stable employment 2+ years, or energy-efficient home with lower utilities), VA loans (up to 50-60% with strong residual income calculation, excellent credit, and stable income), Portfolio/Non-QM loans (some lenders go to 50-55% DTI, higher rates and fees, larger down payments required 20%+), and manual underwriting (case-by-case review with strong overall profile). Compensating factors lenders consider: Excellent credit score (720+), large down payment (15-20%+), significant reserves (6-12 months payments in savings), stable employment (5+ years same field), minimal housing payment increase, high residual income (for VA), strong payment history (no lates 12+ months), and increasing income trajectory. Real example: 48% DTI approved for FHA loan because: 740 credit score, 15% down payment, $50,000 in reserves, 10-year stable employment, rent was $1,800, new mortgage only $2,000. If you can\'t qualify: Reduce debt (pay off cars, credit cards), increase income (document side income), wait 6-12 months while improving (use time to strengthen profile), or consider less expensive property (lower mortgage = lower DTI).'
            }
          },
          {
            '@type': 'Question',
            name: 'How do lenders verify my debt-to-income ratio?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Lenders use multiple verification methods to ensure accurate DTI calculation and prevent fraud. Debt Verification: Credit report pull (shows all credit accounts with balances and minimum payments), payment history verification (confirms reported payments match actual), pay stubs for payroll deductions (401k, garnishments, etc.), court orders (child support, alimony), lease agreements (for auto leases), and loan statements (for mortgages, student loans). Income Verification: Pay stubs (most recent 30 days), W-2 forms (past 2 years), tax returns (2 years for self-employed, bonus, commission), 1099 forms (contract income), bank statements (2 months for deposits verification), employer verification (phone call or written confirmation), profit & loss statements (self-employed), and social security/pension award letters. Special scrutiny areas: Self-employment income (heavily documented, 2-year average after expenses), recent job changes (may require 30-day pay history), bonus/commission (2-year history to count), large unexplained deposits (require explanation letters or proof), and debt not on credit report (child support often requires court orders). Common verification timeline: Application → preliminary credit pull (same day), income documentation submitted (days 1-3), verification of employment (days 3-5), final credit pull before closing (ensures no new debt), and final verification of income (confirms still employed). Red flags that trigger extra scrutiny: Debt payments don\'t match credit report, recent credit inquiries (new accounts), income discrepancies between sources, unexplained deposits, and DTI calculation errors by applicant. Be honest: Lenders will discover discrepancies, fraudulent information disqualifies you entirely, and accurate upfront information speeds approval.'
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/dti-calculator'),
        name: 'How to Calculate Your Debt-to-Income Ratio',
        description: 'Step-by-step guide to calculating your debt-to-income ratio, understanding front-end and back-end DTI, and checking loan qualification requirements.',
        totalTime: 'PT10M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0'
        },
        tool: {
          '@type': 'HowToTool',
          name: 'DTI Calculator'
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Calculate Your Gross Monthly Income',
            text: 'Determine your total monthly income BEFORE taxes and deductions. For salaried employees: Annual salary ÷ 12. For hourly workers: Hourly rate × hours per week × 52 weeks ÷ 12 months. Include ALL income: base salary, overtime (if consistent), bonuses and commissions (2-year average), rental income (75% of gross), Social Security, pensions, and alimony/child support received. Use gross income (before taxes), not take-home pay. Example: $65,000 salary ÷ 12 = $5,417/month.',
            url: getStepUrl('/dti-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'List All Monthly Debt Payments',
            text: 'Gather statements for ALL recurring monthly debt obligations: mortgage/rent (including taxes, insurance, HOA), car loans and leases, student loans (actual payment, not $0 if deferred), credit card minimum payments (from statements), personal loans, home equity loans/HELOCs, and child support/alimony paid. Do NOT include utilities, groceries, insurance (except mortgage-related), or phone bills. Pull your credit report to ensure you don\'t miss any accounts at AnnualCreditReport.com.',
            url: getStepUrl('/dti-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Calculate Front-End DTI (Housing Ratio)',
            text: 'Add up only housing-related expenses: proposed mortgage payment (principal + interest), property taxes (monthly), homeowners insurance (monthly), PMI if down payment < 20%, and HOA fees. Divide housing costs by gross monthly income, multiply by 100. Example: $1,400 housing ÷ $5,417 income = 25.8% front-end DTI. Conventional loans prefer ≤28%. If this is over 28%, you may need a less expensive home or larger down payment.',
            url: getStepUrl('/dti-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate Back-End DTI (Total Debt Ratio)',
            text: 'Add ALL monthly debt payments including housing costs from step 3 plus all other debts from step 2. Divide total monthly debts by gross monthly income, multiply by 100. Example: $1,400 housing + $400 car + $250 student loans + $150 credit cards = $2,200 total debt. $2,200 ÷ $5,417 = 40.6% back-end DTI. This is the most important number for lenders.',
            url: getStepUrl('/dti-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Compare to Loan Requirements',
            text: 'Check your DTI against loan type requirements: Conventional (28% front, 36% back), FHA (31% front, 43% back), VA (no front limit, 41% back), USDA (29% front, 41% back). If you exceed limits: Conventional → Consider FHA (higher limits), Over 43% → Need to reduce debt or increase income, Between 43-50% → May qualify with strong compensating factors (high credit, large down payment, significant reserves).',
            url: getStepUrl('/dti-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Identify Improvement Opportunities',
            text: 'If your DTI is too high, create an action plan: Quick wins (0-3 months): Pay off small debts completely, pay down credit card balances to reduce minimums, avoid new debt. Medium-term (3-6 months): Save for larger down payment (lowers mortgage payment), increase income (document side income, get raise), pay off car loans. Long-term (6-12 months): Significantly reduce debt, build 2-year history of higher income, improve credit score to qualify with higher DTI. Use our calculator to model different scenarios and see the impact.',
            url: getStepUrl('/dti-calculator', 6)
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Get Pre-Approved with Your DTI',
            text: 'Once your DTI is in acceptable range, get pre-approved for a mortgage. Gather documentation: 2 recent pay stubs, 2 years W-2s or tax returns, 2 months bank statements, list of all debts with account numbers and balances. Contact multiple lenders (at least 3) to compare. Pre-approval shows sellers you\'re a serious buyer and helps you understand your true buying power based on your actual DTI and complete financial profile.',
            url: getStepUrl('/dti-calculator', 7)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/dti-calculator'),
        headline: 'DTI Calculator - Complete Guide to Debt-to-Income Ratio',
        description: 'Learn how to calculate debt-to-income ratio, understand lender requirements for different loan types, and discover strategies to improve your DTI for mortgage qualification.',
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
        image: getOgImage('dti'),
        articleBody: 'Comprehensive guide to debt-to-income ratio calculation, including front-end and back-end DTI, loan qualification requirements for conventional, FHA, VA, and USDA loans, improvement strategies, and lender verification processes.'
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
        <h1 className="sr-only">Debt-to-Income Ratio Calculator - Check Loan Qualification</h1>
        
        {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="DTI Calculator"
        calculatorUrl="/dti-calculator"
      />

        {/* Calculator Component */}
        <DTICalculator />

        {/* Educational Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Debt-to-Income Ratio (DTI)</h2>
            
            <p className="text-gray-700 mb-4">
              Your debt-to-income (DTI) ratio is one of the most critical factors lenders evaluate when considering your loan application. According to the{' '}
              <a 
                href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-why-is-the-43-debt-to-income-ratio-important-en-1791/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Consumer Financial Protection Bureau (CFPB)
              </a>
              , DTI measures the percentage of your monthly gross income that goes toward paying debts and is a key indicator of your ability to manage monthly payments.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                DTI Formula
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Debt-to-Income Ratio = (Total Monthly Debt Payments ÷ Gross Monthly Income) × 100</strong>
              </p>
              <p className="text-sm text-gray-700">
                Example: $2,000 monthly debt ÷ $6,000 monthly income = 33.3% DTI
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Two Types of DTI Ratios</h3>
            
            <p className="text-gray-700 mb-4">
              Lenders evaluate two distinct DTI calculations to assess your financial capacity:
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Front-End DTI (Housing Ratio)</h4>
            <p className="text-gray-700 mb-4">
              Front-end DTI, also called the housing ratio, focuses exclusively on housing-related expenses as a percentage of income. This ratio helps lenders determine if you can afford the home you want to purchase.
            </p>

            <p className="text-gray-700 mb-4">
              <strong>Front-End DTI Includes:</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Principal and Interest (P&I):</strong> Your monthly mortgage payment</li>
              <li><strong>Property Taxes:</strong> Annual taxes divided by 12 months</li>
              <li><strong>Homeowners Insurance:</strong> Annual premium divided by 12</li>
              <li><strong>HOA Fees:</strong> Homeowners association dues if applicable</li>
              <li><strong>PMI:</strong> Private mortgage insurance if down payment is less than 20%</li>
            </ul>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="font-semibold text-gray-900 mb-3">Front-End DTI Example:</p>
              <ul className="list-none space-y-1 text-sm text-gray-700">
                <li><strong>Gross monthly income:</strong> $6,500</li>
                <li><strong>Mortgage P&I:</strong> $1,200</li>
                <li><strong>Property taxes:</strong> $250/month</li>
                <li><strong>Insurance:</strong> $100/month</li>
                <li><strong>HOA:</strong> $50/month</li>
                <li className="pt-2"><strong>Total housing:</strong> $1,600</li>
                <li className="font-bold text-blue-900"><strong>Front-End DTI:</strong> $1,600 ÷ $6,500 = 24.6%</li>
              </ul>
            </div>

            <p className="text-gray-700 mb-4">
              <strong>Ideal Front-End DTI:</strong> Most lenders prefer 28% or lower, though FHA allows up to 31%.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Back-End DTI (Total Debt Ratio)</h4>
            <p className="text-gray-700 mb-4">
              Back-end DTI, or total debt ratio, is the more comprehensive metric that includes ALL your monthly debt obligations, not just housing. This is typically the decisive factor in loan approval.
            </p>

            <p className="text-gray-700 mb-4">
              <strong>Back-End DTI Includes:</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>All housing expenses</strong> from front-end calculation</li>
              <li><strong>Auto loans and leases:</strong> Monthly car payments</li>
              <li><strong>Student loans:</strong> Actual payment amount (or 0.5-1% of balance if deferred)</li>
              <li><strong>Credit card minimums:</strong> Required minimum payment from each card</li>
              <li><strong>Personal loans:</strong> Any installment loan payments</li>
              <li><strong>Home equity loans/HELOCs:</strong> If you're drawing on the line</li>
              <li><strong>Child support or alimony:</strong> Court-ordered payments</li>
              <li><strong>Other installment debts:</strong> Medical bills in payment plans, etc.</li>
            </ul>

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <p className="font-semibold text-gray-900 mb-3">Back-End DTI Example (Same Borrower):</p>
              <ul className="list-none space-y-1 text-sm text-gray-700">
                <li><strong>Housing expenses:</strong> $1,600 (from above)</li>
                <li><strong>Car loan:</strong> $400/month</li>
                <li><strong>Student loans:</strong> $250/month</li>
                <li><strong>Credit card minimums:</strong> $120/month</li>
                <li className="pt-2"><strong>Total monthly debt:</strong> $2,370</li>
                <li className="font-bold text-green-900"><strong>Back-End DTI:</strong> $2,370 ÷ $6,500 = 36.5%</li>
              </ul>
            </div>

            <p className="text-gray-700 mb-4">
              <strong>Ideal Back-End DTI:</strong> 36% or lower for conventional loans, up to 43% for FHA loans.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">DTI Requirements by Loan Type</h3>
            <p className="text-gray-700 mb-4">
              Different loan programs have varying DTI requirements based on their risk profiles and government backing. Understanding these thresholds helps you determine which loan type you qualify for.
            </p>

            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Front-End DTI</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Back-End DTI</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Conventional</td>
                  <td className="px-6 py-4 text-sm text-gray-900">≤28%</td>
                  <td className="px-6 py-4 text-sm text-gray-900">≤36%</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Can go to 45% with excellent credit</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">FHA</td>
                  <td className="px-6 py-4 text-sm text-gray-900">≤31%</td>
                  <td className="px-6 py-4 text-sm text-gray-900">≤43%</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Up to 50% with compensating factors</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">VA</td>
                  <td className="px-6 py-4 text-sm text-gray-900">No limit</td>
                  <td className="px-6 py-4 text-sm text-gray-900">≤41%</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Focus on residual income</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">USDA</td>
                  <td className="px-6 py-4 text-sm text-gray-900">≤29%</td>
                  <td className="px-6 py-4 text-sm text-gray-900">≤41%</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Rural properties only</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Jumbo</td>
                  <td className="px-6 py-4 text-sm text-gray-900">≤28%</td>
                  <td className="px-6 py-4 text-sm text-gray-900">≤33-36%</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Stricter requirements</td>
                </tr>
              </tbody>
            </table>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Conventional Loans (28/36 Rule)</h4>
            <p className="text-gray-700 mb-4">
              Conventional loans follow the traditional "28/36 rule": 28% front-end, 36% back-end. These are loans not backed by government agencies, conforming to{' '}
              <a 
                href="https://www.fanniemae.com/singlefamily/underwriting-guidelines" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Fannie Mae
              </a>
              {' '}or Freddie Mac guidelines. With excellent credit (740+), large down payments (20%+), and significant cash reserves, lenders may approve up to 45% DTI.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">FHA Loans (31/43 Rule)</h4>
            <p className="text-gray-700 mb-4">
              Federal Housing Administration loans are more lenient: 31% front-end, 43% back-end. Designed for first-time buyers and those with lower credit scores (580+) or smaller down payments (3.5%). With strong compensating factors (excellent payment history, minimal rent-to-mortgage increase, significant reserves), FHA may approve up to 50% DTI.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">VA Loans (No Front-End Limit, 41% Back-End)</h4>
            <p className="text-gray-700 mb-4">
              Veterans Affairs loans focus primarily on back-end DTI (41% typical maximum) and use a unique "residual income" calculation that considers family size and regional living costs. Some VA lenders approve up to 50-60% DTI if residual income is strong.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">USDA Loans (29/41 Rule)</h4>
            <p className="text-gray-700 mb-4">
              USDA Rural Development loans follow 29% front-end, 41% back-end limits. These loans require properties in eligible rural areas and are designed for low-to-moderate income buyers.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Debts Are Included in DTI?</h3>
            
            <p className="text-gray-700 mb-4">
              Understanding exactly which expenses count toward your DTI is critical for accurate calculation.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">✅ Debts INCLUDED in DTI</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Mortgage/Rent:</strong> Including taxes, insurance, HOA fees</li>
              <li><strong>Auto loans and leases:</strong> All vehicle payment obligations</li>
              <li><strong>Student loans:</strong> Actual monthly payment (or 0.5-1% of balance if deferred)</li>
              <li><strong>Credit card minimums:</strong> Required minimum payments, not full balances</li>
              <li><strong>Personal loans:</strong> All installment loan payments</li>
              <li><strong>Home equity loans/HELOCs:</strong> If actively drawing</li>
              <li><strong>Child support/alimony:</strong> Court-ordered payments</li>
              <li><strong>Co-signed loans:</strong> Any debt you're legally obligated to pay</li>
              <li><strong>Tax liens or judgments:</strong> Active payment plans</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">❌ Expenses NOT Included in DTI</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Utilities:</strong> Electric, gas, water, internet</li>
              <li><strong>Groceries and food:</strong> Regular living expenses</li>
              <li><strong>Transportation:</strong> Gas, auto insurance, maintenance</li>
              <li><strong>Medical expenses:</strong> Unless structured as installment debt</li>
              <li><strong>Phone bills:</strong> Cell phone and landline</li>
              <li><strong>Subscriptions:</strong> Streaming services, gym memberships</li>
              <li><strong>Insurance:</strong> Life, health, auto (except mortgage insurance)</li>
              <li><strong>Childcare or daycare:</strong> Not counted in DTI</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How to Improve Your DTI Ratio</h3>
            <p className="text-gray-700 mb-4">
              If your DTI is too high for loan qualification, implementing strategic improvements can make you eligible within 3-12 months.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Strategy 1: Reduce Debt (Immediate Impact)</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Pay off small debts completely:</strong> Eliminates entire payment from DTI calculation. A $150/month debt paid off provides immediate 2-3% DTI improvement.</li>
              <li><strong>Pay down credit cards:</strong> Even partial paydown reduces minimum payment requirements.</li>
              <li><strong>Avoid new debt:</strong> Don't open new credit cards, auto loans, or personal loans before mortgage application.</li>
              <li><strong>Refinance high-payment debts:</strong> Lower monthly obligations even if balance remains similar.</li>
              <li><strong>Sell or trade down vehicles:</strong> Eliminates or reduces auto loan payments.</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Strategy 2: Increase Income (Takes 2-12 Months)</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Ask for a raise:</strong> Permanently increases income and lowers DTI.</li>
              <li><strong>Side gig or second job:</strong> Must have 2-year history for most lenders to count.</li>
              <li><strong>Document overtime:</strong> Consistent overtime with 2-year history counts toward income.</li>
              <li><strong>Include all income sources:</strong> Bonuses, commissions (2-year average), rental income (75% of gross).</li>
              <li><strong>Add co-borrower:</strong> Spouse or family member's income counts if they're on the loan.</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Strategy 3: Adjust Home Budget</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Target less expensive home:</strong> Lower mortgage payment significantly impacts front-end DTI.</li>
              <li><strong>Increase down payment:</strong> Reduces loan amount and monthly payment. 20% down also eliminates PMI.</li>
              <li><strong>Consider different loan types:</strong> If conventional DTI is too high, explore FHA options (higher limits).</li>
              <li><strong>Buy points:</strong> Pay upfront to lower interest rate and monthly payment.</li>
            </ul>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6">
              <p className="text-sm text-gray-700">
                <strong>💡 Real Example:</strong> Sarah has $5,000 monthly income and $2,250 debt (45% DTI - too high for most loans). She pays off her $200 car loan (6 months early) and reduces credit card minimums by $100 through balance transfer. New debt: $1,950. New DTI: 39% (now qualifies for FHA). Timeline: 3 months. This improvement enabled her mortgage approval.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common DTI Mistakes and Misconceptions</h3>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Using Net Income Instead of Gross</h4>
              <p className="text-red-800">
                DTI calculation uses gross (before-tax) income, not take-home pay. Using net income artificially inflates your DTI. Always use your gross salary or hourly rate × hours before any deductions.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Forgetting Deferred Student Loans</h4>
              <p className="text-red-800">
                Even if your student loans are in deferment with $0 current payment, lenders typically calculate 0.5-1% of the balance as a monthly payment for DTI purposes. $40,000 in deferred loans = $200-400 monthly payment in DTI calculation.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Opening New Credit Before Mortgage</h4>
              <p className="text-red-800">
                New credit inquiries and accounts before mortgage closing can disqualify you. Lenders pull credit again right before closing. A new car loan or credit card can sink your approval. Wait until after closing to open new accounts.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Ignoring Full Credit Card Balances</h4>
              <p className="text-red-800">
                DTI uses minimum payments, but lenders also evaluate overall credit utilization. $10,000 credit card debt with $200 minimums impacts DTI differently than approval chances. High balances suggest financial stress even with low minimums.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Using This DTI Calculator</h3>
            <p className="text-gray-700 mb-4">
              Our comprehensive DTI calculator provides:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Front-end and back-end calculations:</strong> See both housing and total debt ratios</li>
              <li><strong>Loan qualification checker:</strong> Instant feedback for Conventional, FHA, VA, USDA loans</li>
              <li><strong>Debt breakdown:</strong> Categorize debts to identify reduction opportunities</li>
              <li><strong>Improvement suggestions:</strong> Personalized strategies based on your situation</li>
              <li><strong>Maximum affordable housing:</strong> Calculate the highest housing payment your DTI allows</li>
              <li><strong>Scenario modeling:</strong> Test "what if" scenarios (pay off car, increase income, etc.)</li>
            </ul>

            <p className="text-gray-700 mb-4">
              For related calculations, explore our{' '}
              <a href="/mortgage-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Mortgage Calculator
              </a>
              {' '}to estimate monthly payments,{' '}
              <a href="/credit-card-payoff-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Credit Card Payoff Calculator
              </a>
              {' '}to reduce debt faster,{' '}
              <a href="/loan-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Loan Calculator
              </a>
              {' '}for consolidation options, and{' '}
              <a href="/budget-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Budget Calculator
              </a>
              {' '}to find money for debt paydown.
            </p>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/mortgage-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏠</div>
              <h3 className="font-semibold text-gray-900">Mortgage Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Estimate monthly payments</p>
            </a>
            
            <a href="/credit-card-payoff-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💳</div>
              <h3 className="font-semibold text-gray-900">Credit Card Payoff</h3>
              <p className="text-sm text-gray-600 mt-1">Reduce debt faster</p>
            </a>
            
            <a href="/loan-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900">Loan Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate loan payments</p>
            </a>
            
            <a href="/budget-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💵</div>
              <h3 className="font-semibold text-gray-900">Budget Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Find money for debt payoff</p>
            </a>

            <a href="/debt-consolidation-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏦</div>
              <h3 className="font-semibold text-gray-900">Debt Consolidation</h3>
              <p className="text-sm text-gray-600 mt-1">Consolidate multiple debts</p>
            </a>
            
            <a href="/home-affordability-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏡</div>
              <h3 className="font-semibold text-gray-900">Home Affordability</h3>
              <p className="text-sm text-gray-600 mt-1">How much house can you afford</p>
            </a>
            
            <a href="/take-home-paycheck-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900">Take-Home Pay</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate net income</p>
            </a>
            
            <a href="/savings-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏦</div>
              <h3 className="font-semibold text-gray-900">Savings Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Plan for down payment</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
