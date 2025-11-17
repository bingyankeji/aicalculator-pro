import { Metadata } from 'next';
import APRCalculator from '@/components/Calculator/APRCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'APR Calculator - Calculate True Annual Percentage Rate | Free Loan APR Tool',
  description: 'Free APR calculator with all fees included. Calculate true APR vs nominal interest rate for personal loans, auto loans, mortgages, and credit cards. Compare APRs, understand TILA compliance, and see total loan costs.',
  keywords: ['apr calculator', 'annual percentage rate calculator', 'true apr calculator', 'loan apr calculator', 'apr vs interest rate', 'apr comparison tool', 'effective apr calculator', 'nominal rate to apr', 'credit card apr calculator', 'mortgage apr calculator', 'auto loan apr', 'personal loan apr', 'apr with fees', 'tila apr calculator', 'truth in lending calculator', 'apr cost calculator', 'lower apr calculator', 'best apr rates', 'apr reduction calculator', 'apr impact calculator'],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'APR Calculator - Calculate True Annual Percentage Rate',
    description: 'Free APR calculator with fees. Calculate true APR vs nominal rate and see total loan costs for all loan types.',
    type: 'website',
    url: getUrl('/apr-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{ url: getOgImage('apr'), width: 1200, height: 630, alt: 'APR Calculator - True Annual Percentage Rate Tool' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APR Calculator - True Annual Percentage Rate',
    description: 'Calculate true APR with all fees included. Compare APRs and understand total loan costs.',
    images: [getOgImage('apr')],
    creator: '@aicalculator'
  },
  alternates: { canonical: getUrl('/apr-calculator') },
  robots: { index: true, follow: true, nocache: false, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function APRCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/apr-calculator'),
        name: 'APR Calculator',
        url: getUrl('/apr-calculator'),
        description: 'Free APR (Annual Percentage Rate) calculator that calculates true APR including all loan fees and costs. Compare nominal interest rates vs true APR for personal loans, auto loans, mortgages, and credit cards. TILA-compliant calculations with cost breakdowns and APR comparison charts.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        featureList: ['True APR calculation with all fees', 'Nominal rate vs APR comparison', 'Personal loan, auto, mortgage, credit card APR', 'Origination fee, application fee, processing fee calculation', 'Closing costs and discount points (mortgages)', 'Credit card APR types (purchase, balance transfer, cash advance)', 'Effective APR with daily/monthly compounding', 'Total cost breakdown (principal, interest, fees)', 'APR impact on total loan cost', 'Side-by-side APR comparison', 'Monthly payment calculation', 'Cost savings from lower APR']
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/apr-calculator'),
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: getUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Financial', item: getUrl('/financial') },
          { '@type': 'ListItem', position: 3, name: 'APR Calculator', item: getUrl('/apr-calculator') }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/apr-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is APR and how is it different from interest rate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'APR (Annual Percentage Rate) represents the true annual cost of borrowing, including the interest rate plus all fees and costs. Interest rate is only the cost of borrowing the principal amount. Key differences: Interest Rate: Only the percentage charged on the loan principal. Excludes fees, points, and other costs. Example: 6% interest rate on $10,000 = $600/year in interest. APR: Interest rate PLUS all mandatory fees amortized over the loan term. Includes origination fees, application fees, processing fees, closing costs, discount points. Example: 6% interest + 1% origination fee = 6.12% APR. Why it matters: Two loans with the same interest rate can have very different APRs due to fees. A 5% loan with $1,000 in fees might have a 5.5% APR. A 5.5% loan with $0 fees has a 5.5% APR (lower total cost). According to the <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/" target="_blank" rel="noopener noreferrer">Consumer Financial Protection Bureau (CFPB)</a>, APR is the better metric for comparing loan offers because it captures the true cost of borrowing.'
            }
          },
          {
            '@type': 'Question',
            name: 'How is APR calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'APR is calculated using a complex formula that factors in all loan costs over the loan term. Formula concept: APR finds the interest rate that makes the present value of all loan payments equal to the net loan amount (loan amount minus fees). Step-by-step calculation: 1. Net loan amount = Loan principal - Upfront fees. Example: $10,000 loan - $200 origination fee = $9,800 received. 2. Monthly payment = Standard loan payment formula based on nominal rate. 3. True APR = Rate that makes present value of payments equal net loan amount. Uses iterative calculation (Newton-Raphson method). Example calculation: $10,000 loan, 6% nominal rate, 36 months, $200 origination fee. Monthly payment: $304.22 (based on 6% rate). Net amount received: $9,800. True APR: 6.54% (accounts for the $200 fee). Total paid: $10,952 vs $10,752 with no fees. Credit card APR: Different for purchases, balance transfers, and cash advances. Cash advance APR includes one-time fee (typically 5%) amortized over repayment period. Balance transfer APR includes transfer fee (typically 3%) amortized. According to the <a href="https://www.federalreserve.gov/pubs/leasing/resource/glossary.htm" target="_blank" rel="noopener noreferrer">Federal Reserve</a>, APR must be disclosed under the Truth in Lending Act (TILA) to help consumers compare loan costs.'
            }
          },
          {
            '@type': 'Question',
            name: 'What fees are included in APR?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'APR includes mandatory fees required to get the loan, but NOT optional fees or penalties. Fees INCLUDED in APR: Origination fees (1-8% of loan, most common). Application fees (flat fee, typically $25-$100). Processing fees (administrative costs). Discount points (voluntary, but included if paid). Mortgage insurance premiums (if required). Prepaid interest (if charged). Private mortgage insurance (PMI) first year. Document preparation fees. Underwriting fees. Loan broker fees (if applicable). Fees NOT INCLUDED in APR: Late payment fees. Prepayment penalties (disclosed separately). Optional insurance (credit life, disability). Title insurance and escrow fees (for mortgages). Home inspection and appraisal fees. Recording fees and transfer taxes. Credit card annual fees (disclosed separately, not in purchase APR). Credit card APR specifics: Purchase APR: Ongoing rate for purchases. Balance Transfer APR: Rate + one-time transfer fee (typically 3-5%). Cash Advance APR: Rate + one-time advance fee (typically 5-10%). Example impact: $10,000 loan at 7% interest with 2% origination fee ($200): True APR: 7.4%. $10,000 loan at 7.5% with $0 fees: APR = 7.5% (lower total cost despite higher rate). Always compare APRs, not just interest rates, when evaluating loan offers.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is a good APR for different loan types?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Good APRs vary significantly by loan type, credit score, and market conditions (2024 rates): Personal Loans: Excellent credit (720+): 6-10% APR. Good credit (660-719): 10-15% APR. Fair credit (620-659): 15-20% APR. Poor credit (<620): 20-36% APR. Average: 11-12% APR. Auto Loans (New): Excellent credit: 4-6% APR. Good credit: 6-8% APR. Fair credit: 8-12% APR. Poor credit: 12-18% APR. Average: 7-8% APR for 60-month term. Auto Loans (Used): Typically 1-3% higher than new car rates. Excellent credit: 5-8% APR. Average: 9-10% APR. Mortgages (30-year fixed): Excellent credit: 6.5-7.5% APR. Good credit: 7-8% APR. Fair credit: 8-9% APR. Average: 7.5% APR (varies with market rates). Credit Cards: Excellent credit: 13-17% APR. Good credit: 17-22% APR. Fair credit: 22-25% APR. Average: 20-24% APR for purchase APR. Cash advance APR: Typically 25-30% APR. Balance transfer: 0% introductory (15-21 months), then 18-25%. Factors affecting APR: Credit score (most important). Loan amount and term. Debt-to-income ratio. Loan type and purpose. Secured vs unsecured. Lender type (bank, credit union, online). Economic conditions (Federal Reserve rates). How to get better APR: Improve credit score (pay bills on time, reduce utilization). Compare multiple lenders. Consider shorter loan terms. Make larger down payment. Shop during promotional periods. Negotiate fees. Use credit unions (typically lower rates).'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I negotiate APR with lenders?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, APR is often negotiable, especially for borrowers with good credit and competing offers. What you can negotiate: 1. Interest rate itself: Ask for rate reduction (0.25-0.5% common). Show competing offers for leverage. 2. Origination fees: Often negotiable or waivable. Request fee reduction or elimination. Some lenders charge 0-1%, others 5-8%. 3. Application and processing fees: Frequently waivable for qualified borrowers. Ask lender to waive or reduce. 4. Discount points (mortgages): Voluntary - you choose whether to pay. Paying points lowers rate but increases upfront cost. Strategies for negotiating better APR: 1. Shop multiple lenders (3-5 quotes). Banks, credit unions, online lenders. Get written quotes to compare. 2. Leverage competing offers. "Lender X offered 6.5% APR, can you match or beat it?". Show documentation of better offers. 3. Highlight your strong credit profile. High credit score (720+). Stable income and employment. Low debt-to-income ratio. Significant assets. 4. Consider relationship discounts. Existing customers often get 0.25-0.5% discount. Combine checking, savings, and loan accounts. 5. Time your application strategically. Rate shopping within 14-45 days counts as one credit inquiry. Apply when rates are lower or during promotional periods. 6. Negotiate fees separately from rate. Even if rate is non-negotiable, fees often are. Request itemized fee breakdown. Ask which fees are mandatory vs optional. Example negotiation: Initial offer: 7% rate + 2% origination fee = 7.4% APR. After negotiation: 6.75% rate + 1% origination fee = 7% APR. Savings: $200-400 on a $10,000 loan. When negotiation works best: Strong credit (700+ score). Large loan amounts ($10,000+). Mortgage refinancing (highly competitive). Auto loans at dealership (they have flexibility). Credit unions (more willing to negotiate than large banks). When negotiation is limited: Poor credit scores. Small loan amounts. Fixed-rate government loans (FHA, VA). Credit card APRs (less flexible post-approval). Bottom line: Always ask. Worst case: They say no. Best case: Save hundreds or thousands in interest and fees.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the difference between APR and APY?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'APR and APY are both annual percentage rates, but used in opposite contexts and calculated differently: APR (Annual Percentage Rate): Used for BORROWING (loans, credit cards, mortgages). Represents the cost of borrowing money. Includes fees and costs. Does NOT compound - simple interest rate. Lower APR = better for borrowers. APY (Annual Percentage Yield): Used for SAVINGS (savings accounts, CDs, investments). Represents the amount you EARN on deposits. Includes compound interest effect. DOES compound - accounts for interest earned on interest. Higher APY = better for savers. Key formula differences: APR = Nominal rate + (Fees amortized over loan term). Simple interest, no compounding effect in basic APR. APY = (1 + r/n)^n - 1, where r = nominal rate, n = compounding periods. Accounts for compound interest. Example comparison: $10,000 at 5% APR (loan): Pay $500/year in interest ($10,000 × 5%). Total paid: $10,500 after 1 year (plus fees). $10,000 at 5% APY (savings): Earn $500 first year, but compounding increases actual yield. With monthly compounding: APY = 5.12% (earn $512). Practical implications: Borrowing: Look for LOWEST APR. Compare APRs across lenders to find cheapest loan. APR must be disclosed under Truth in Lending Act (TILA). Saving: Look for HIGHEST APY. APY shows true earning potential with compounding. Higher compounding frequency = higher APY for same nominal rate. Visual example: 6% nominal rate (savings account). Monthly compounding: 6.17% APY. Daily compounding: 6.18% APY. 6% APR (loan): Might be 6.5% true APR after fees. Bottom line: APR = what you PAY to borrow. APY = what you EARN on savings. Both help you compare financial products accurately.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does APR affect my monthly payment and total loan cost?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'APR directly impacts both your monthly payment and total loan cost. Higher APR = higher monthly payment and more total interest paid. Impact on monthly payment: Monthly payment increases with APR due to higher interest charges. Formula: M = P [r(1+r)^n] / [(1+r)^n - 1], where r = monthly APR/12. Example ($10,000 loan, 60 months): 5% APR: $188.71/month. 10% APR: $212.47/month ($24 more per month). 15% APR: $237.90/month ($49 more than 5%). Impact on total cost: Total paid = Monthly payment × Number of months + Upfront fees. Lower APR = less total interest paid over loan term. Example ($10,000 loan, 60 months): 5% APR: Total paid $11,322 (interest: $1,322). 10% APR: Total paid $12,748 (interest: $2,748). 15% APR: Total paid $14,274 (interest: $4,274). Difference: 15% APR costs $2,952 more than 5% APR (223% more interest). Long-term loan impact: Longer terms amplify APR differences. Example ($10,000 at 10% APR): 36 months: $323/month, $11,616 total. 60 months: $212/month, $12,748 total. 84 months: $162/month, $13,621 total. Credit card example ($5,000 balance, minimum payments): 15% APR: 18 years to pay off, $4,750 in interest. 20% APR: 22 years to pay off, $7,000 in interest. 25% APR: 27 years to pay off, $10,500 in interest. Mortgage impact (most dramatic): Example: $300,000, 30-year fixed. 6% APR: $1,799/month, $647,514 total paid. 7% APR: $1,996/month, $718,527 total paid. Difference: 1% APR increase = $197/month, $71,013 more over 30 years. Cost of a 1% APR increase: Personal loan ($10,000, 5 years): +$10-15/month, +$600-900 total. Auto loan ($25,000, 5 years): +$25-30/month, +$1,500-1,800 total. Mortgage ($300,000, 30 years): +$175-200/month, +$63,000-72,000 total. How to minimize APR impact: 1. Shop for lowest APR (compare 3-5 lenders). 2. Improve credit score before applying. 3. Make larger down payment (reduces amount borrowed). 4. Choose shorter loan term (lower total interest). 5. Make extra principal payments (reduces interest charged). 6. Refinance if rates drop (can save thousands). 7. Negotiate fees to lower effective APR. Even a 0.5% APR reduction on a large loan saves significant money. Example: $200,000 mortgage, 0.5% lower APR = $20,000+ saved over 30 years.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is TILA and how does it relate to APR?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'TILA (Truth in Lending Act) is a federal law requiring lenders to disclose APR and other loan terms in a standardized format. Enacted in 1968, administered by the CFPB. What TILA requires lenders to disclose: 1. APR (Annual Percentage Rate): Must be displayed prominently in all loan advertisements and documents. Must be calculated using standardized formula. Must include all mandatory fees. 2. Finance Charge: Total dollar amount of interest and fees over loan life. 3. Amount Financed: Net amount you actually receive (loan minus prepaid fees). 4. Total of Payments: Sum of all payments you will make over the loan term. 5. Payment Schedule: Number, amount, and due dates of payments. TILA disclosure requirements: Disclosure timing: Provided at application (preliminary disclosure). Provided again at closing (final disclosure). Must be given BEFORE you sign the loan. Standard format: All lenders must calculate APR the same way. Enables apples-to-apples comparison across lenders. Must be displayed as prominently as the interest rate. Right to rescind (for certain loans): 3-day cooling-off period for home equity loans and refinances. Can cancel without penalty within 3 days. Protection against misleading advertising: "Teaser rates" must clearly show APR will increase. All loan terms must be disclosed, not just low introductory rates. Example TILA disclosure ($10,000 personal loan): Loan Amount: $10,000. Interest Rate: 8%. APR: 8.75% (includes $200 origination fee). Finance Charge: $2,280 (total interest + fees over 5 years). Total of Payments: $12,280. Monthly Payment: $204.67 for 60 months. Why TILA matters for consumers: Protects against hidden fees: All costs must be disclosed upfront in APR. Enables comparison shopping: Same APR calculation across all lenders. Prevents deceptive practices: Lenders can\'t hide true cost of borrowing. Provides recourse: Violations can be reported to CFPB. Common TILA violations lenders make: Not disclosing fees in APR. Advertising low rates without showing APR. Changing terms after disclosure without new disclosure. Not providing 3-day rescission period for home equity loans. For more information on TILA and your rights as a borrower, visit the <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-truth-in-lending-act-en-1943/" target="_blank" rel="noopener noreferrer">Consumer Financial Protection Bureau (CFPB)</a> or <a href="https://www.federalreserve.gov/boarddocs/supmanual/cch/til.pdf" target="_blank" rel="noopener noreferrer">Federal Reserve Truth in Lending guidelines</a>. Bottom line: TILA ensures lenders disclose true cost of loans (APR) so consumers can make informed borrowing decisions. Always review the APR, not just the interest rate, before accepting a loan.'
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/apr-calculator'),
        name: 'How to Calculate True APR and Compare Loan Offers',
        description: 'Step-by-step guide to calculating true Annual Percentage Rate (APR) including all fees, understanding APR vs interest rate, and comparing loan offers to find the best deal.',
        totalTime: 'PT8M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
        tool: { '@type': 'HowToTool', name: 'APR Calculator' },
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Enter Loan Amount and Interest Rate', text: 'Input the loan principal (amount you want to borrow) and the nominal interest rate (stated rate from lender). Choose your loan type: Personal Loan, Auto Loan, Mortgage, or Credit Card. Enter the loan term in months or years. Example: $10,000 loan at 8% interest for 36 months.', url: getStepUrl('/apr-calculator', 1) },
          { '@type': 'HowToStep', position: 2, name: 'Add All Loan Fees', text: 'Enter all mandatory fees charged by the lender: Origination fee (typically 1-8%), Application fee, Processing fee, Closing costs (for mortgages), Discount points (if paying), Annual fees. Leave optional fees blank - they don\'t count toward APR. Example: 2% origination fee on $10,000 = $200.', url: getStepUrl('/apr-calculator', 2) },
          { '@type': 'HowToStep', position: 3, name: 'Calculate True APR', text: 'Click "Calculate True APR" to see the comprehensive analysis. The calculator uses the TILA-compliant formula to compute true APR including all fees. Review the difference between nominal rate and true APR. Example: 8% rate + $200 fee = 8.54% true APR on $10,000 loan.', url: getStepUrl('/apr-calculator', 3) },
          { '@type': 'HowToStep', position: 4, name: 'Review Cost Breakdown', text: 'Examine the cost breakdown showing: Principal amount, Total interest paid, Total fees, Total amount paid over loan life. See monthly payment amount. Understand how fees increase your total cost. Example: $10,000 becomes $11,540 total after interest and fees.', url: getStepUrl('/apr-calculator', 4) },
          { '@type': 'HowToStep', position: 5, name: 'Compare APRs Across Lenders', text: 'Get quotes from 3-5 lenders and compare true APRs, not just interest rates. Use the comparison chart to see how different APRs affect total cost. A loan with lower rate but high fees might have higher APR. Example: Lender A: 7% rate + $500 fees = 7.8% APR vs Lender B: 7.5% rate + $0 fees = 7.5% APR (Lender B is cheaper).', url: getStepUrl('/apr-calculator', 5) },
          { '@type': 'HowToStep', position: 6, name: 'For Credit Cards: Compare APR Types', text: 'If calculating for credit cards, compare three APR types: Purchase APR (regular purchases), Balance Transfer APR + transfer fee (typically 3-5%), Cash Advance APR + advance fee (typically 5-10%). Balance transfers and cash advances have effective APRs much higher than stated rates due to fees.', url: getStepUrl('/apr-calculator', 6) },
          { '@type': 'HowToStep', position: 7, name: 'Calculate Savings from Lower APR', text: 'Use the comparison scenarios to see potential savings. Lowering APR by 1-2% can save hundreds or thousands over the loan term. Example: $10,000 loan at 10% APR vs 8% APR saves $550 over 3 years. Negotiate fees or shop for better rates to achieve savings. Consider refinancing if you find a significantly lower APR after taking a loan.', url: getStepUrl('/apr-calculator', 7) }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/apr-calculator'),
        headline: 'APR Calculator - Complete Guide to True Annual Percentage Rate',
        description: 'Comprehensive guide to calculating and understanding Annual Percentage Rate (APR) including the difference between APR and interest rate, how fees affect APR, TILA compliance, and strategies to get the best APR on loans and credit cards.',
        author: { '@type': 'Organization', name: 'AICalculator.pro', url: getUrl('/') },
        publisher: { '@type': 'Organization', name: 'AICalculator.pro', logo: { '@type': 'ImageObject', url: getUrl('/logo.png') } },
        datePublished: '2024-01-01',
        dateModified: '2025-11-17',
        image: getOgImage('apr'),
        articleBody: 'Complete guide to Annual Percentage Rate (APR) calculations including true APR vs nominal interest rate, fee inclusion, TILA compliance, credit card APR types (purchase, balance transfer, cash advance), APR impact on loan costs, comparison strategies, and tips to negotiate lower APR.'
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <h1 className="sr-only">APR Calculator - Calculate True Annual Percentage Rate</h1>

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
                <span itemProp="name" className="text-gray-900 font-semibold">APR Calculator</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>

        {/* Calculator Component */}
        <APRCalculator />

        {/* Educational Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Annual Percentage Rate (APR)</h2>

            <p className="text-gray-700 mb-4">
              APR (Annual Percentage Rate) is the true annual cost of borrowing money, including both the interest rate and all mandatory fees. According to the{' '}
              <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                Consumer Financial Protection Bureau (CFPB)
              </a>
              , APR is a more accurate measure of loan cost than the interest rate alone because it captures all financing charges.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <p className="text-lg font-semibold text-blue-900 mb-3">💡 Why APR Matters More Than Interest Rate</p>
              <ul className="list-none space-y-2 text-sm text-gray-700">
                <li><strong>Captures true cost:</strong> Includes interest PLUS all mandatory fees</li>
                <li><strong>Enables comparison:</strong> Compare loans apples-to-apples across lenders</li>
                <li><strong>Legal requirement:</strong> Must be disclosed under Truth in Lending Act (TILA)</li>
                <li><strong>Prevents hidden fees:</strong> Lenders can't hide costs in fine print</li>
                <li><strong>Saves money:</strong> Lower APR = lower total cost, even if rate is higher</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">APR vs Interest Rate: Key Differences</h3>

            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aspect</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interest Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">APR</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">What it includes</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Interest charges only</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Interest + all mandatory fees</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Example (8% rate, 2% fee)</td>
                  <td className="px-6 py-4 text-sm text-gray-700">8.00%</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-semibold">8.54% (true cost)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Legal disclosure</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Optional in ads</td>
                  <td className="px-6 py-4 text-sm text-gray-700">MUST be disclosed (TILA)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Use for comparison</td>
                  <td className="px-6 py-4 text-sm text-red-600">❌ Incomplete picture</td>
                  <td className="px-6 py-4 text-sm text-green-600">✅ Accurate comparison</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Fees Are Included in APR?</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">✅</span> Fees INCLUDED in APR
                </h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Origination fees (1-8% of loan)</li>
                  <li>Application fees</li>
                  <li>Processing fees</li>
                  <li>Underwriting fees</li>
                  <li>Discount points (if paid)</li>
                  <li>Mortgage insurance premiums</li>
                  <li>Loan broker fees</li>
                  <li>Prepaid interest</li>
                </ul>
              </div>

              <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">❌</span> Fees NOT in APR
                </h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Late payment fees</li>
                  <li>Prepayment penalties</li>
                  <li>Credit card annual fees</li>
                  <li>Title insurance (mortgages)</li>
                  <li>Appraisal fees</li>
                  <li>Home inspection fees</li>
                  <li>Recording fees</li>
                  <li>Optional insurance products</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Good APR Ranges by Loan Type (2024)</h3>

            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded">
                <h5 className="font-semibold text-gray-900 mb-1">Personal Loans</h5>
                <p className="text-sm text-gray-700 mb-2">Excellent (720+): <strong>6-10% APR</strong> | Good (660-719): <strong>10-15%</strong> | Fair (620-659): <strong>15-20%</strong> | Average: <strong>11-12%</strong></p>
              </div>

              <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded">
                <h5 className="font-semibold text-gray-900 mb-1">Auto Loans (New)</h5>
                <p className="text-sm text-gray-700 mb-2">Excellent: <strong>4-6% APR</strong> | Good: <strong>6-8%</strong> | Fair: <strong>8-12%</strong> | Average: <strong>7-8%</strong></p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded">
                <h5 className="font-semibold text-gray-900 mb-1">Mortgages (30-year fixed)</h5>
                <p className="text-sm text-gray-700 mb-2">Excellent: <strong>6.5-7.5% APR</strong> | Good: <strong>7-8%</strong> | Fair: <strong>8-9%</strong> | Average: <strong>7.5%</strong></p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 p-4 rounded">
                <h5 className="font-semibold text-gray-900 mb-1">Credit Cards</h5>
                <p className="text-sm text-gray-700 mb-2">Excellent: <strong>13-17% APR</strong> | Good: <strong>17-22%</strong> | Fair: <strong>22-25%</strong> | Average: <strong>20-24%</strong> | Cash Advance: <strong>25-30%</strong></p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Credit Card APR Types Explained</h3>

            <p className="text-gray-700 mb-4">
              Credit cards have multiple APRs for different transaction types, and fees significantly increase the effective APR:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Purchase APR:</strong> Standard rate for regular purchases (13-25%). Applies to unpaid balance after grace period (typically 21-25 days).</li>
              <li><strong>Balance Transfer APR:</strong> Often 0% introductory (15-21 months), then 18-25%. PLUS 3-5% transfer fee. Effective APR with fee is much higher than stated rate.</li>
              <li><strong>Cash Advance APR:</strong> Highest rate (25-30%). PLUS 5-10% upfront fee. No grace period - interest starts immediately. Avoid unless emergency.</li>
              <li><strong>Penalty APR:</strong> Triggered by late payment or default. Can jump to 29.99% and apply to entire balance indefinitely.</li>
            </ul>

            <p className="text-gray-700 mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <strong>Example:</strong> $5,000 balance transfer at 0% APR with 3% fee ($150) for 12 months = 3% effective APR. After 12 months, 21% APR applies. If you don't pay off the balance, you'll pay $1,050 in interest year 2.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Truth in Lending Act (TILA) and Your Rights</h3>

            <p className="text-gray-700 mb-4">
              The{' '}
              <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-truth-in-lending-act-en-1943/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                Truth in Lending Act (TILA)
              </a>
              {' '}requires lenders to disclose APR and all loan terms in a standardized format before you commit to the loan.
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>APR disclosure:</strong> Must be displayed prominently and calculated using the federal formula.</li>
              <li><strong>Finance charge:</strong> Total dollar amount you'll pay in interest and fees over the loan life.</li>
              <li><strong>Payment schedule:</strong> Number, amount, and due dates of all payments.</li>
              <li><strong>Right to rescind:</strong> 3-day cooling-off period for home equity loans and refinances.</li>
              <li><strong>Protection from deception:</strong> Teaser rates must show the APR that will apply after the intro period.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Strategies to Get the Best APR</h3>

            <div className="space-y-6 mb-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">1️⃣</span> Improve Your Credit Score
                </h4>
                <p className="text-sm text-gray-700">Pay bills on time, reduce credit utilization below 30%, don't close old accounts. A 50-point score increase can lower APR by 1-2%.</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">2️⃣</span> Shop Multiple Lenders
                </h4>
                <p className="text-sm text-gray-700">Get quotes from 3-5 lenders within 14-45 days (counts as one credit inquiry). Compare APRs, not just rates. Online lenders often have lower APRs than banks.</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">3️⃣</span> Negotiate Fees
                </h4>
                <p className="text-sm text-gray-700">Even if the interest rate is fixed, origination fees are often negotiable. Ask lender to waive or reduce fees. Show competing offers for leverage.</p>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-lg border border-pink-200">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">4️⃣</span> Consider Secured Loans
                </h4>
                <p className="text-sm text-gray-700">Auto loans and mortgages (secured by collateral) have lower APRs than unsecured personal loans. Secured credit cards help build credit with lower APR.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Using This APR Calculator</h3>
            <p className="text-gray-700 mb-4">
              Our free APR calculator helps you:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Calculate true APR:</strong> See the real cost of borrowing including all fees</li>
              <li><strong>Compare loans:</strong> Evaluate offers from multiple lenders side-by-side</li>
              <li><strong>Understand costs:</strong> Break down principal, interest, and fees</li>
              <li><strong>Save money:</strong> See how much you'd save with a lower APR</li>
              <li><strong>Make informed decisions:</strong> Choose the loan with the lowest total cost</li>
            </ul>

            <p className="text-gray-700 mb-4">
              For related loan tools, explore our{' '}
              <a href="/loan-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Loan Calculator
              </a>
              {' '}for payment schedules,{' '}
              <a href="/apr-vs-apy-calculator" className="text-blue-600 hover:text-blue-800 underline">
                APR vs APY Calculator
              </a>
              {' '}to understand the difference,{' '}
              <a href="/interest-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Interest Calculator
              </a>
              {' '}for simple and compound interest, and{' '}
              <a href="/debt-consolidation-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Debt Consolidation Calculator
              </a>
              {' '}to compare consolidation options.
            </p>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/loan-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900">Loan Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Payment schedules & amortization</p>
            </a>

            <a href="/apr-vs-apy-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900">APR vs APY</h3>
              <p className="text-sm text-gray-600 mt-1">Compare borrowing vs savings rates</p>
            </a>

            <a href="/interest-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900">Interest Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Simple & compound interest</p>
            </a>

            <a href="/personal-loan-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💳</div>
              <h3 className="font-semibold text-gray-900">Personal Loan</h3>
              <p className="text-sm text-gray-600 mt-1">Personal loan payments</p>
            </a>

            <a href="/auto-loan-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🚗</div>
              <h3 className="font-semibold text-gray-900">Auto Loan</h3>
              <p className="text-sm text-gray-600 mt-1">Car financing calculator</p>
            </a>

            <a href="/mortgage-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏠</div>
              <h3 className="font-semibold text-gray-900">Mortgage Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Home loan payments</p>
            </a>

            <a href="/credit-card-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💳</div>
              <h3 className="font-semibold text-gray-900">Credit Card</h3>
              <p className="text-sm text-gray-600 mt-1">Credit card payoff calculator</p>
            </a>

            <a href="/debt-consolidation-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏦</div>
              <h3 className="font-semibold text-gray-900">Debt Consolidation</h3>
              <p className="text-sm text-gray-600 mt-1">Consolidate multiple debts</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

