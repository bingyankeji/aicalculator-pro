import { Metadata } from 'next';
import HomeAffordabilityCalculator from '@/components/Calculator/HomeAffordabilityCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Home Affordability Calculator - How Much House Can I Afford? | Free 2024',
  description: 'Calculate how much house you can afford based on income, debts, and down payment. Use the 28/36 rule to determine your home buying budget. Free home affordability calculator with DTI analysis.',
  keywords: ['home affordability calculator', 'how much house can i afford', 'home buying calculator', 'mortgage affordability calculator', 'house affordability calculator', 'home budget calculator', 'debt to income ratio calculator', '28/36 rule calculator', 'home loan affordability', 'mortgage payment calculator', 'home purchase calculator', 'housing budget calculator', 'first time home buyer calculator', 'home price calculator', 'affordable home calculator', 'income to home price calculator', 'home buying budget calculator', 'mortgage qualification calculator', 'home affordability estimator', 'real estate affordability calculator'],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Home Affordability Calculator - How Much House Can I Afford?',
    description: 'Calculate how much house you can afford using the 28/36 rule. Free home affordability calculator with DTI analysis.',
    type: 'website',
    url: getUrl('/home-affordability-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{ url: getOgImage('home-affordability'), width: 1200, height: 630, alt: 'Home Affordability Calculator' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Affordability Calculator - How Much House Can I Afford?',
    description: 'Calculate how much house you can afford using the 28/36 rule.',
    images: [getOgImage('home-affordability')],
    creator: '@aicalculator'
  },
  alternates: { canonical: getUrl('/home-affordability-calculator') },
  robots: { index: true, follow: true, nocache: false, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function HomeAffordabilityCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/home-affordability-calculator'),
        name: 'Home Affordability Calculator',
        url: getUrl('/home-affordability-calculator'),
        description: 'Free home affordability calculator that determines how much house you can afford based on income, debts, down payment, and the 28/36 rule. Calculate maximum home price, monthly payment, DTI ratios, and total cash needed.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        featureList: ['28/36 Rule Calculation', 'Front-end DTI Ratio', 'Back-end DTI Ratio', 'Maximum Home Price Calculation', 'Monthly Payment Breakdown', 'Cash Needed Estimation', 'Budget Range Recommendations', 'DTI Status Indicators', 'Property Tax Calculator', 'Home Insurance Estimator', 'PMI Calculator', 'HOA Fee Inclusion', 'Emergency Fund Planning', 'Closing Costs Estimation']
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/home-affordability-calculator'),
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: getUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Financial', item: getUrl('/financial') },
          { '@type': 'ListItem', position: 3, name: 'Home Affordability Calculator', item: getUrl('/home-affordability-calculator') }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/home-affordability-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much house can I afford based on my income?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The 28/36 rule is the industry standard for determining home affordability. The 28% front-end ratio means your monthly housing costs (mortgage, property taxes, insurance, HOA) should not exceed 28% of your gross monthly income. The 36% back-end ratio means your total monthly debt payments (housing costs plus car loans, student loans, credit cards, etc.) should not exceed 36% of gross income. Example: Annual income $75,000 = $6,250/month gross. Maximum housing cost: $6,250 × 28% = $1,750/month. Maximum total debt: $6,250 × 36% = $2,250/month. If you have $500 in other debts, you can afford $1,750/month in housing. If you have $1,000 in other debts, you can only afford $1,250/month in housing (limited by back-end ratio). According to <a href="https://www.consumerfinance.gov/owning-a-home/loan-options/" target="_blank" rel="noopener noreferrer">Consumer Financial Protection Bureau (CFPB)</a>, lenders typically use these ratios to assess mortgage qualification, though some programs allow higher DTI ratios up to 43% for qualified borrowers with strong credit and reserves.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the 28/36 rule and why does it matter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The 28/36 rule is a lending guideline that defines affordable home buying. It consists of two debt-to-income (DTI) ratios: Front-end ratio (28%): Housing expenses only. Includes principal, interest, property taxes, homeowners insurance, HOA fees, and PMI. Example: $6,000/month income × 28% = $1,680 max housing cost. Back-end ratio (36%): Total debt obligations. Includes housing expenses PLUS all other monthly debts (car loans, student loans, credit card minimums, personal loans, alimony, child support). Example: $6,000/month × 36% = $2,160 max total debt. Why it matters: Prevents over-leveraging: Ensures you can afford the home without becoming "house poor." Loan qualification: Most conventional loans require 28/36 compliance, though FHA allows up to 31/43 and some conventional loans accept 28/45 with strong credit. Financial stability: Leaves room for savings, emergencies, retirement, and quality of life. Stress reduction: Living within these limits reduces financial anxiety and default risk. The <a href="https://www.fanniemae.com/singlefamily/eligibility-matrix" target="_blank" rel="noopener noreferrer">Fannie Mae Eligibility Matrix</a> provides detailed DTI requirements by loan type. Breaking the rule: Some borrowers exceed 28/36 (especially in high-cost areas), but this increases financial risk, limits savings, and may result in higher interest rates or loan denial.'
            }
          },
          {
            '@type': 'Question',
            name: 'What factors affect how much house I can afford?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Home affordability depends on multiple financial factors, each with significant impact: 1. Annual Gross Income: Foundation of affordability calculation. Higher income = higher maximum home price. Example: $60,000 income affords ~$210,000 home. $100,000 income affords ~$350,000 home. Include all sources: salary, bonuses, commissions, rental income, investment income. 2. Existing Monthly Debts: Directly reduces housing budget through back-end DTI. $500/month in debts reduces max home price by ~$60,000-80,000. Includes: car loans, student loans, credit card minimums, personal loans, alimony, child support. NOT included: utilities, groceries, insurance (non-debt expenses). 3. Down Payment Amount: Larger down payment = higher affordable home price. 20% down avoids PMI and may secure better rates. Example: $40,000 down + $200,000 loan = $240,000 home. $60,000 down + $200,000 loan = $260,000 home (same loan, pricier home). Down payment assistance programs: FHA (3.5%), VA (0%), USDA (0%), conventional (3%). 4. Mortgage Interest Rate: Huge impact on monthly payment and affordability. 1% rate increase reduces buying power by ~10-15%. Example $300,000 loan: 6% rate = $1,799/month → afford $325,000 home. 7% rate = $1,996/month → afford $290,000 home ($35,000 less). 5. Property Taxes: Vary dramatically by location (0.3% to 2.5% of home value). High-tax states (NJ, IL, TX, CA) reduce affordability significantly. Example: $300,000 home. 0.5% tax = $125/month. 2% tax = $500/month (reduces affordable home price by ~$50,000). 6. Home Insurance: Required by lenders, typically $800-$2,000/year. Higher in disaster-prone areas (hurricanes, earthquakes, floods). Factor in when calculating total housing cost. 7. HOA Fees: Common in condos, townhomes, planned communities. $100-$500+/month. Directly reduces maximum home price. Example: $300/month HOA reduces affordable home by ~$40,000. 8. Credit Score: Determines interest rate qualification. Excellent (740+): Best rates (6% example). Good (680-739): +0.25-0.5% (6.25-6.5%). Fair (620-679): +0.5-1% (6.5-7%). Poor (<620): +1-2% or denied (7-8%). Impact: 1% higher rate on $250,000 loan = $180/month more, $64,000 more over 30 years.'
            }
          },
          {
            '@type': 'Question',
            name: 'How much down payment do I need to buy a house?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Down payment requirements vary by loan type, and contrary to popular belief, you do NOT always need 20% down. Down payment by loan type: Conventional Loans: Minimum 3-5% down for first-time buyers (Fannie Mae HomeReady, Freddie Mac Home Possible). 5-10% for repeat buyers. 20% to avoid PMI (Private Mortgage Insurance). FHA Loans: 3.5% minimum with credit score 580+. 10% with credit score 500-579. Requires mortgage insurance (MIP) regardless of down payment. VA Loans (Veterans): 0% down payment (no minimum required). No PMI required. Available to eligible veterans, active military, some spouses. USDA Loans (Rural Areas): 0% down payment. For homes in eligible rural areas. Income limits apply. USDA definition of rural covers ~97% of U.S. land. Jumbo Loans (High-Balance): Typically require 10-20% down. Stricter qualification requirements. Benefits of 20% down: Avoid PMI: Saves $100-$200/month on $300,000 home. Better interest rates: Often 0.25-0.5% lower than <20% down. Lower monthly payment: Less principal borrowed. Stronger negotiating position: Sellers prefer buyers with substantial down payment. Faster equity buildup: Start with 20% equity immediately. Example comparison ($300,000 home, 6.5% rate, 30-year): 3.5% down ($10,500): Loan $289,500. Monthly P&I: $1,831. PMI: ~$145/month. Total: $1,976/month + taxes + insurance. 20% down ($60,000): Loan $240,000. Monthly P&I: $1,517. No PMI. Total: $1,517/month + taxes + insurance. Savings: $459/month, $165,240 over 30 years. Down payment assistance programs: State/local housing finance agencies offer grants and low-interest loans. Employer programs (some companies offer down payment assistance). IRA withdrawal (first-time buyers can withdraw $10,000 penalty-free). Gift funds from family (must be documented). The <a href="https://www.hud.gov/topics/buying_a_home" target="_blank" rel="noopener noreferrer">HUD Homebuying Guide</a> provides comprehensive down payment resources and program listings by state.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is included in monthly housing costs (PITI)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Monthly housing costs include all expenses that make up your total housing payment, commonly referred to as PITI + HOA + PMI: 1. P = Principal: Portion of payment that pays down the loan balance. Builds equity with each payment. Example: $300,000 loan, first payment might have $750 toward principal. 2. I = Interest: Cost of borrowing money from the lender. Front-loaded in early years of mortgage. Example: $300,000 loan at 6.5%, first payment has ~$1,625 in interest. Over 30 years, total interest = $387,478 (more than principal!). 3. T = Taxes (Property Taxes): Annual property tax divided by 12 months. Held in escrow account by lender, paid annually to county. Varies by location: Texas: 1.6-2.5% of home value. California: 1-1.25% (Prop 13 limit). New Jersey: 2-2.5% (highest in U.S.). Example: $300,000 home at 1.5% tax = $4,500/year = $375/month. Increases with home value appreciation and local tax rate changes. 4. I = Insurance (Homeowners Insurance): Required by lenders to protect against fire, theft, damage. Typically $800-$2,000/year ($67-$167/month). Higher in disaster-prone areas: Florida (hurricanes): $3,000-$6,000/year. California (wildfires, earthquakes): $1,500-$4,000/year. 5. HOA Fees (if applicable): Homeowners Association fees for condos, townhomes, planned communities. $100-$500+/month depending on amenities. Covers: landscaping, pool, gym, trash, exterior maintenance, insurance. Not optional if property is in HOA. 6. PMI (Private Mortgage Insurance) - if <20% down: Protects lender if you default (NOT you). Costs 0.5-1% of loan amount annually. Example: $300,000 loan = $1,500-$3,000/year = $125-$250/month. Removed when you reach 20% equity (pay down or appreciation). FHA loans have MIP (mortgage insurance premium) that may last for life of loan. Example total monthly housing cost: Principal & Interest: $1,896. Property Taxes: $375. Homeowners Insurance: $125. HOA Fees: $150. PMI: $150. Total PITI + HOA + PMI = $2,696/month. With $6,500/month gross income: Front-end DTI = $2,696 / $6,500 = 41.5% (exceeds 28% guideline, may not qualify). Understanding total housing costs is crucial—many first-time buyers only consider P&I and are shocked by the true monthly payment.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does my debt-to-income ratio affect home buying?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Debt-to-Income (DTI) ratio is the most important metric lenders use to determine mortgage approval and how much you can borrow. It measures what percentage of your gross monthly income goes toward debt payments. Two types of DTI ratios: Front-end DTI (Housing Ratio): Formula: Monthly housing costs ÷ Gross monthly income. Guideline: Should be ≤28%. Example: $1,800 housing cost ÷ $6,500 income = 27.7% (GOOD). What it includes: P+I+T+I+HOA+PMI (all housing-related costs). What lenders see: Can you afford the house payment specifically? Back-end DTI (Total Debt Ratio): Formula: (Housing costs + all other debts) ÷ Gross monthly income. Guideline: Should be ≤36%. Example: ($1,800 housing + $600 other debts) ÷ $6,500 = 36.9% (MARGINAL). What it includes: Housing costs PLUS car loans, student loans, credit card minimums, personal loans, alimony, child support. What lenders see: Can you manage all debt obligations without risk? DTI Requirements by Loan Type: Conventional Loans: Maximum 28/36 typically. Up to 28/45 with excellent credit (720+) and reserves. Some lenders accept 28/50 for high earners. FHA Loans: Maximum 31/43 standard. Up to 31/50 with compensating factors (high credit score, large down payment, reserves). VA Loans: No front-end limit. Back-end maximum 41% (can go higher with residual income test). USDA Loans: Maximum 29/41. Jumbo Loans: Stricter, typically 28/36 or 28/43 maximum. How DTI affects your home buying: DTI < 28/36% (Ideal): Easy mortgage approval. Best interest rates. Multiple lender options. Strong negotiating position. Example: $7,000 income, $1,800 housing, $300 other debts = 26%/30%. DTI 28-36/36-43% (Acceptable): Likely approved but may require: Higher credit score (700+). Larger down payment (10-20%). Cash reserves (3-6 months expenses). Additional documentation. DTI 36-43/43-50% (Marginal): Difficult approval. Requires: Excellent credit (740+). Substantial reserves. Low-risk loan profile. Higher interest rates possible. Limited lender options. DTI >43/50% (Poor): Usually denied for conventional loans. May qualify for FHA with strong compensating factors. High risk of default in lender eyes. How to improve DTI before buying: Pay down debts: Each $100/month debt paid off increases home budget by $15,000-20,000. Example: Pay off $400/month car loan → can afford $60,000-80,000 more expensive home. Increase income: Side gig, raise, bonus (must be documented and consistent for 2+ years). Don't take on new debt: Avoid new car loans, credit cards, or personal loans before buying. Larger down payment: Reduces loan amount and monthly payment. Wait for debts to fall off: Car loan with 6 months left? Wait to apply. The <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-why-is-the-43-debt-to-income-ratio-important-en-1791/" target="_blank" rel="noopener noreferrer">CFPB Debt-to-Income Guide</a> provides detailed information on DTI requirements and how to improve your ratio.'
            }
          },
          {
            '@type': 'Question',
            name: 'How much cash do I need to buy a house?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Total cash needed to buy a house includes three major categories: down payment, closing costs, and reserves. Many first-time buyers underestimate the true amount needed. Breakdown of cash requirements: 1. Down Payment: 3.5-20% of home price depending on loan type. FHA: 3.5% ($10,500 on $300,000 home). Conventional: 5-20% ($15,000-$60,000 on $300,000 home). VA/USDA: $0 (but still need closing costs and reserves). 2. Closing Costs: 2-5% of home price (typically 3% average). Includes: Loan origination fees (0.5-1% of loan). Appraisal fee ($400-$600). Home inspection ($300-$500). Title insurance and search ($1,000-$3,000). Escrow fees ($500-$2,000). Recording fees ($100-$300). Prepaid items: First year homeowners insurance, Property tax reserves (2-6 months), Prepaid interest (pro-rated to month-end). Example: $300,000 home closing costs = $9,000-$15,000 (average $10,500). Some costs negotiable: Ask seller to pay closing costs (common in buyer markets). Shop for title insurance and escrow services. Choose own home inspector. 3. Cash Reserves (Post-Closing): Lenders require 2-6 months of housing payments in reserves. Conventional: 2-3 months typical. Investment properties: 6-12 months. Example: $2,500/month payment × 3 months = $7,500 reserves. Purpose: Proves you can handle unexpected expenses or income loss. 4. Moving Costs: $1,000-$5,000 depending on distance and amount. Local move (DIY): $300-$800. Local movers: $800-$2,000. Long-distance movers: $2,000-$8,000. 5. Immediate Home Expenses: $2,000-$5,000 for immediate needs. Includes: Minor repairs or improvements, New locks and security, Initial landscaping or cleaning, Window treatments, Basic furniture if needed. Total Cash Needed Examples: Example 1: $250,000 home, FHA loan (3.5% down): Down payment: $8,750. Closing costs: $7,500. Reserves: $6,000. Moving & immediate: $3,000. Total cash needed: $25,250. Example 2: $300,000 home, Conventional (10% down): Down payment: $30,000. Closing costs: $10,500. Reserves: $7,500. Moving & immediate: $3,500. Total cash needed: $51,500. Example 3: $400,000 home, Conventional (20% down): Down payment: $80,000. Closing costs: $14,000. Reserves: $9,000. Moving & immediate: $4,000. Total cash needed: $107,000. How to save for a home: Automate savings: Set up automatic transfers to dedicated savings account. High-yield savings account: Earn 4-5% APY while saving. Down payment assistance: State and local programs offer grants up to $15,000. Gift funds: Family can gift money (must be documented). Retirement accounts: First-time buyers can withdraw $10,000 from IRA penalty-free. Reduce expenses: Cut subscriptions, dining out, unnecessary spending. Side income: Freelance, gig work, side business. Employer programs: Some companies offer homebuying assistance. The <a href="https://www.hud.gov/program_offices/housing/sfh/buying/closingcosts" target="_blank" rel="noopener noreferrer">HUD Closing Costs Guide</a> provides detailed breakdowns and tips for reducing upfront costs. Rule of thumb: Budget 25-30% of home price in total cash for a comfortable home purchase (down payment + closing + reserves + moving + cushion).'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I afford a house with bad credit?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, you can buy a house with bad credit, but with significant limitations, higher costs, and reduced affordability. Understanding credit score impacts and improvement strategies is essential. Minimum credit scores by loan type: FHA Loans (Most Accessible): 580+ credit: 3.5% down payment minimum. 500-579 credit: 10% down payment required. Most forgiving loan type for bad credit. Allows recent bankruptcies (2+ years) and foreclosures (3+ years). VA Loans (Veterans): No official minimum, but most lenders require 580-620. More flexible for veterans with compensating factors. USDA Loans: Typically require 640+ (not ideal for bad credit). Conventional Loans: Minimum 620 credit usually required. 680+ for decent rates. Not recommended for bad credit borrowers. Impact of bad credit on home affordability: 1. Higher Interest Rates (HUGE IMPACT): Credit score directly affects rate, which affects affordability. Example $300,000 loan, 30-year fixed: 760+ credit: 6.5% rate → $1,896/month → afford $315,000 home. 680-700 credit: 7% rate → $1,996/month → afford $290,000 home. 620-650 credit: 7.5% rate → $2,098/month → afford $275,000 home. 580-620 credit: 8% rate → $2,201/month → afford $260,000 home. Impact: 100-point credit score difference = $55,000 less buying power + $305/month higher payment. Over 30 years: $110,000 more in interest (580 score vs 760 score). 2. Larger Down Payment Requirements: Bad credit may require 10-20% down (vs 3.5-5% for good credit). Reduces accessible loan programs. 3. Higher Insurance and PMI Costs: PMI rates increase with lower credit scores. 760+ credit: 0.3-0.5% PMI rate. 620 credit: 1-1.5% PMI rate (3x more expensive). Example: $300,000 loan, 760 credit = $90/month PMI. 620 credit = $300/month PMI ($210/month more). 4. Loan Denials and Limited Options: Many lenders won\'t approve <620 credit. Fewer rate-shopping options. Less negotiating power. How low credit affects total home cost: Example: $300,000 home, FHA loan, 30 years. 760 credit (6.5% rate, 0.5% PMI): Monthly: $1,896 P&I + $125 PMI = $2,021. Total paid over 30 years: $727,560. 620 credit (7.5% rate, 1.2% PMI): Monthly: $2,098 P&I + $300 PMI = $2,398. Total paid over 30 years: $863,280. Difference: $377/month more, $135,720 more over life of loan. Strategies to buy with bad credit: 1. FHA Loans (Best Option): Accepts 580 credit with 3.5% down. Manual underwriting available for unique situations. Work with FHA-approved lenders. 2. Improve Credit Before Buying (Most Cost-Effective): Even 6-12 months of improvement can save tens of thousands. Quick credit improvements: Pay down credit cards below 30% utilization: +20-50 points in 1-2 months. Pay all bills on time for 6+ months: +30-80 points. Dispute errors on credit report: +10-50 points if errors found. Become authorized user on good credit account: +15-40 points. Don\'t close old credit cards: Hurts credit age. Avoid new credit inquiries: Each hard pull = -5 points. Get free credit reports: AnnualCreditReport.com, Credit Karma, Credit Sesame. 3. Increase Down Payment: 10-20% down compensates for lower credit. Shows lender financial responsibility. May qualify for better rates. 4. Lower Debt-to-Income Ratio: Pay off credit cards, car loans, student loans. DTI <36% strengthens application despite bad credit. 5. Consider Co-Borrower: Spouse, partner, or family member with better credit. Their credit score can be used for loan qualification. Both parties liable for loan. 6. Build Cash Reserves: 6-12 months reserves compensates for credit risk. Shows lender financial stability. 7. Provide Explanations: Letter of explanation for credit issues (medical debt, divorce, job loss). Lenders consider extenuating circumstances. 8. Alternative Lenders: Credit unions often more flexible than big banks. Local community banks. Online lenders specializing in non-traditional borrowers. 9. Wait for Bankruptcy/Foreclosure Seasoning: FHA: 2 years post-bankruptcy, 3 years post-foreclosure. Conventional: 4 years post-bankruptcy, 7 years post-foreclosure. VA: 2 years post-bankruptcy, 2 years post-foreclosure. Credit Improvement Timeline to Home Purchase: 580-620 credit → 650+ credit: 6-12 months of: On-time payments, Pay down credit cards to <30% utilization, Dispute errors, Avoid new credit. Result: +70 points = $200-300/month savings, $50,000-70,000 more buying power. The <a href="https://www.myfico.com/credit-education/improve-your-credit-score" target="_blank" rel="noopener noreferrer">myFICO Credit Improvement Guide</a> and <a href="https://www.hud.gov/program_offices/housing/sfh/fha/fhahome" target="_blank" rel="noopener noreferrer">HUD FHA Loan Information</a> provide detailed strategies for buying with lower credit scores. Bottom line: Yes, you CAN buy with bad credit (580+), but IMPROVING credit for 6-12 months before buying will save you $100,000+ over the life of the loan. Patience pays—literally.'
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/home-affordability-calculator'),
        name: 'How to Calculate Home Affordability Using the 28/36 Rule',
        description: 'Step-by-step guide to determining how much house you can afford based on income, debts, down payment, and the 28/36 debt-to-income rule.',
        totalTime: 'PT8M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
        tool: { '@type': 'HowToTool', name: 'Home Affordability Calculator' },
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Enter Your Annual Gross Income', text: 'Input your total annual gross income (before taxes) including salary, bonuses, commissions, and any other recurring income. This is the foundation for determining how much house you can afford. Example: $75,000 annual salary + $5,000 bonuses = $80,000 gross income.', url: getStepUrl('/home-affordability-calculator', 1) },
          { '@type': 'HowToStep', position: 2, name: 'Add Monthly Debt Payments', text: 'Enter all recurring monthly debt obligations including car loans, student loans, credit card minimum payments, personal loans, alimony, and child support. Do NOT include utilities, groceries, or other non-debt expenses. These debts affect your back-end DTI ratio and reduce your home buying budget. Example: $350 car loan + $250 student loan + $100 credit card = $700/month total debts.', url: getStepUrl('/home-affordability-calculator', 2) },
          { '@type': 'HowToStep', position: 3, name: 'Input Down Payment Amount', text: 'Enter the amount you have saved for a down payment. A larger down payment increases your affordable home price and may help you avoid PMI if it reaches 20%. Minimum down payments: FHA 3.5%, Conventional 3-5%, VA/USDA 0%. Example: $40,000 saved for down payment.', url: getStepUrl('/home-affordability-calculator', 3) },
          { '@type': 'HowToStep', position: 4, name: 'Set Mortgage Interest Rate and Loan Term', text: 'Enter the current mortgage interest rate you expect to qualify for based on your credit score. Rates vary from 6-8% depending on credit and market conditions. Choose your loan term: 15, 20, or 30 years (30-year is most common). Lower rates and longer terms increase affordability. Example: 6.75% rate, 30-year term.', url: getStepUrl('/home-affordability-calculator', 4) },
          { '@type': 'HowToStep', position: 5, name: 'Add Local Property Costs', text: 'Input property tax rate (typical range: 0.5-2.5% of home value), annual home insurance ($800-$2,000), and HOA fees if applicable ($0-$500/month). These costs vary significantly by location and directly affect your monthly payment and affordability. Research local rates in your target area. Example: 1.2% property tax, $1,200 annual insurance, $150/month HOA.', url: getStepUrl('/home-affordability-calculator', 5) },
          { '@type': 'HowToStep', position: 6, name: 'Calculate and Review Maximum Home Price', text: 'Click "Calculate Affordability" to see your results: Maximum home price based on 28/36 rule, Monthly payment breakdown (P+I+T+I+HOA+PMI), Front-end and back-end DTI ratios with status indicators, Total cash needed (down payment + closing costs + reserves), Budget range recommendations (comfortable, stretch, aggressive). The calculator uses both the 28% housing ratio and 36% total debt ratio, showing you the limiting factor.', url: getStepUrl('/home-affordability-calculator', 6) },
          { '@type': 'HowToStep', position: 7, name: 'Analyze DTI Ratios and Adjust Inputs', text: 'Review your DTI ratios. Front-end DTI ≤28% and back-end DTI ≤36% are ideal for easy approval and financial comfort. If ratios exceed guidelines, adjust by: paying down debts, increasing down payment, looking at lower-priced homes, or waiting to save more. Use the budget ranges to understand comfortable vs stretch scenarios.', url: getStepUrl('/home-affordability-calculator', 7) }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/home-affordability-calculator'),
        headline: 'Home Affordability Calculator - Complete Guide to Buying a House',
        description: 'Comprehensive guide to determining home affordability using the 28/36 rule, calculating DTI ratios, understanding down payment requirements, and navigating the home buying process from pre-qualification to closing.',
        author: { '@type': 'Organization', name: 'AICalculator.pro', url: getUrl('/') },
        publisher: { '@type': 'Organization', name: 'AICalculator.pro', logo: { '@type': 'ImageObject', url: getUrl('/logo.png') } },
        datePublished: '2024-01-01',
        dateModified: '2025-11-17',
        image: getOgImage('home-affordability'),
        articleBody: 'Home affordability is determined by the 28/36 rule: housing costs should not exceed 28% of gross monthly income (front-end DTI), and total debt payments should not exceed 36% (back-end DTI). Key factors include annual income, existing debts, down payment, interest rate, property taxes, homeowners insurance, HOA fees, and credit score. Understanding these factors and using the 28/36 rule helps buyers determine maximum home price, monthly payments, and total cash needed while avoiding over-leveraging.'
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <h1 className="sr-only">Home Affordability Calculator - Calculate How Much House You Can Afford</h1>
        
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
                <span itemProp="name" className="text-gray-900 font-semibold">Home Affordability Calculator</span>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Home Affordability: The Complete Guide</h2>

            <p className="text-gray-700 mb-4">
              Buying a home is one of the biggest financial decisions you'll ever make. Our home affordability calculator uses the industry-standard 28/36 rule to help you determine how much house you can comfortably afford based on your income, debts, and financial situation. According to the{' '}
              <a href="https://www.consumerfinance.gov/owning-a-home/loan-options/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                Consumer Financial Protection Bureau (CFPB)
              </a>
              , understanding these ratios is crucial for responsible home buying.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <p className="text-lg font-semibold text-blue-900 mb-3">💡 What is the 28/36 Rule?</p>
              <ul className="list-none space-y-2 text-sm text-gray-700">
                <li><strong>28% Front-End Ratio:</strong> Housing costs ≤ 28% of gross monthly income</li>
                <li><strong>36% Back-End Ratio:</strong> Total debt payments ≤ 36% of gross monthly income</li>
                <li><strong>Example:</strong> $75,000 income → max $1,750/month housing, $2,250/month total debt</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The 28/36 Rule Explained in Detail</h3>

            <p className="text-gray-700 mb-4">
              The 28/36 rule is the lending standard used by most mortgage lenders to determine how much house you can afford. It consists of two debt-to-income (DTI) ratios:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Front-End DTI (28%):</strong> Your monthly housing costs should not exceed 28% of your gross monthly income. Housing costs include principal, interest, property taxes, homeowners insurance, HOA fees, and PMI.</li>
              <li><strong>Back-End DTI (36%):</strong> Your total monthly debt payments (housing costs plus car loans, student loans, credit cards, etc.) should not exceed 36% of your gross monthly income.</li>
            </ul>

            <p className="text-gray-700 mb-4">
              For detailed DTI requirements by loan type, review the{' '}
              <a href="https://www.fanniemae.com/singlefamily/eligibility-matrix" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                Fannie Mae Eligibility Matrix
              </a>.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Key Factors Affecting Home Affordability</h3>

            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded">
                <h5 className="font-semibold text-gray-900 mb-1">1. Annual Gross Income</h5>
                <p className="text-sm text-gray-700">Foundation of affordability. Higher income = higher maximum home price. Include salary, bonuses, commissions, rental income.</p>
            </div>

              <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded">
                <h5 className="font-semibold text-gray-900 mb-1">2. Existing Monthly Debts</h5>
                <p className="text-sm text-gray-700">Directly reduces housing budget. $500/month debts reduces max home price by ~$60,000-80,000. Includes car loans, student loans, credit cards.</p>
            </div>

              <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded">
                <h5 className="font-semibold text-gray-900 mb-1">3. Down Payment Amount</h5>
                <p className="text-sm text-gray-700">Larger down payment = higher affordable home price. 20% down avoids PMI. FHA: 3.5%, Conventional: 3-5%, VA/USDA: 0%.</p>
            </div>

              <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 p-4 rounded">
                <h5 className="font-semibold text-gray-900 mb-1">4. Mortgage Interest Rate</h5>
                <p className="text-sm text-gray-700">Huge impact. 1% rate increase reduces buying power by 10-15%. Shop around for best rates.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Down Payment Requirements by Loan Type</h3>

            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Minimum Down</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credit Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PMI Required?</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">FHA</td>
                  <td className="px-6 py-4 text-sm text-gray-700">3.5% (580+) / 10% (500-579)</td>
                  <td className="px-6 py-4 text-sm text-gray-700">500+</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Yes (MIP for life)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Conventional</td>
                  <td className="px-6 py-4 text-sm text-gray-700">3-5%</td>
                  <td className="px-6 py-4 text-sm text-gray-700">620+</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Yes (if <20% down)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">VA</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-semibold">0%</td>
                  <td className="px-6 py-4 text-sm text-gray-700">No minimum</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-semibold">No</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">USDA</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-semibold">0%</td>
                  <td className="px-6 py-4 text-sm text-gray-700">640+</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Yes (guarantee fee)</td>
                </tr>
              </tbody>
            </table>

            <p className="text-gray-700 mb-4">
              Learn more about down payment assistance programs at the{' '}
              <a href="https://www.hud.gov/topics/buying_a_home" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                HUD Homebuying Guide
              </a>.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Total Cash Needed to Buy a Home</h3>

            <p className="text-gray-700 mb-4">
              Many first-time buyers underestimate the total cash required. Here's the complete breakdown:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Down Payment:</strong> 3.5-20% of home price ($10,500-$60,000 on $300,000 home)</li>
              <li><strong>Closing Costs:</strong> 2-5% of home price ($6,000-$15,000 on $300,000 home)</li>
              <li><strong>Cash Reserves:</strong> 2-6 months of housing payments ($5,000-$15,000)</li>
              <li><strong>Moving Costs:</strong> $1,000-$5,000 depending on distance</li>
              <li><strong>Immediate Expenses:</strong> $2,000-$5,000 for repairs, furniture, improvements</li>
            </ul>

            <p className="text-gray-700 mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <strong>Example:</strong> For a $300,000 home with 10% down, expect to need $30,000 (down) + $10,500 (closing) + $7,500 (reserves) + $3,500 (moving) = <strong>$51,500 total cash</strong>.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Using This Calculator</h3>

            <p className="text-gray-700 mb-4">
              Our free home affordability calculator helps you:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Determine maximum home price:</strong> Based on 28/36 rule and your financial profile</li>
              <li><strong>See monthly payment breakdown:</strong> P+I+T+I+HOA+PMI itemized</li>
              <li><strong>Check DTI ratios:</strong> Front-end and back-end with status indicators</li>
              <li><strong>Estimate total cash needed:</strong> Down payment + closing + reserves</li>
              <li><strong>Compare budget scenarios:</strong> Comfortable, stretch, and aggressive options</li>
            </ul>

            <p className="text-gray-700 mb-4">
              For related tools, explore our{' '}
              <a href="/mortgage-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Mortgage Calculator
              </a>
              {' '}for detailed payment schedules,{' '}
              <a href="/dti-calculator" className="text-blue-600 hover:text-blue-800 underline">
                DTI Calculator
              </a>
              {' '}to analyze your debt-to-income ratio,{' '}
              <a href="/rent-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Rent Calculator
              </a>
              {' '}to compare rent vs buy, and{' '}
              <a href="/down-payment-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Down Payment Calculator
              </a>
              {' '}to plan your savings strategy.
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
              <p className="text-sm text-gray-600 mt-1">Calculate monthly payments</p>
            </a>

            <a href="/dti-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900">DTI Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Debt-to-income ratio</p>
            </a>

            <a href="/rent-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏘️</div>
              <h3 className="font-semibold text-gray-900">Rent Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Rent vs buy comparison</p>
            </a>

            <a href="/loan-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900">Loan Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">General loan payments</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
