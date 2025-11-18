import { Metadata } from 'next';
import CanadianMortgageCalculator from '@/components/Calculator/CanadianMortgageCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Canadian Mortgage Calculator with CMHC Insurance & Stress Test | AICalculator',
  description: 'Free Canadian mortgage calculator with CMHC insurance, land transfer tax, and stress test qualification. Calculate monthly payments, compare payment frequencies, and estimate home affordability across all provinces.',
  keywords: [
    'canadian mortgage calculator',
    'canada mortgage calculator',
    'cmhc insurance calculator',
    'mortgage calculator canada',
    'canadian home loan calculator',
    'mortgage payment calculator canada',
    'canada home affordability calculator',
    'canadian mortgage stress test',
    'land transfer tax calculator',
    'accelerated mortgage payment',
    'biweekly mortgage payment canada',
    'first time home buyer canada',
    'fthbi calculator',
    'canadian mortgage rates',
    'mortgage calculator ontario',
    'mortgage calculator bc',
    'mortgage calculator alberta',
    'canadian mortgage amortization',
    'canada housing calculator',
    'mortgage qualifying income canada',
    'gds ratio calculator',
    'tds ratio calculator',
    'canadian mortgage payment',
    'mortgage calculator with cmhc',
    'provincial land transfer tax',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Canadian Mortgage Calculator - CMHC Insurance & Stress Test',
    description: 'Calculate Canadian mortgage payments with CMHC insurance, provincial taxes, and stress test qualification. Accurate calculations for all provinces.',
    type: 'website',
    url: getUrl('/canadian-mortgage-calculator'),
    siteName: 'AICalculator',
    locale: 'en_CA',
    images: [{
      url: getOgImage('canadian-mortgage'),
      width: 1200,
      height: 630,
      alt: 'Canadian Mortgage Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canadian Mortgage Calculator - CMHC Insurance & Stress Test',
    description: 'Calculate Canadian mortgage payments with CMHC insurance, provincial taxes, and stress test qualification.',
    images: [getOgImage('canadian-mortgage')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/canadian-mortgage-calculator'),
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
};

export default function CanadianMortgageCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/canadian-mortgage-calculator'),
        name: 'Canadian Mortgage Calculator',
        url: getUrl('/canadian-mortgage-calculator'),
        description: 'Professional Canadian mortgage calculator with CMHC insurance calculations, provincial land transfer tax estimates, mortgage stress test, accelerated payment options, and qualifying income requirements. Supports all Canadian provinces.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CAD',
        },
        featureList: [
          'CMHC mortgage default insurance calculation',
          'Provincial land transfer tax estimates',
          'Mortgage stress test qualification',
          'Accelerated payment options (bi-weekly, weekly)',
          'First-time home buyer rebates',
          'GDS and TDS ratio calculations',
          'Property tax and insurance estimates',
          'Detailed amortization schedule',
          'Monthly, bi-weekly, and weekly payment frequencies',
          'All Canadian provinces supported',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/canadian-mortgage-calculator'),
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
            name: 'Canadian Mortgage Calculator',
            item: getUrl('/canadian-mortgage-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/canadian-mortgage-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I calculate my Canadian mortgage payment?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Canadian mortgages use semi-annual compounding, which differs from the US monthly compounding. The formula accounts for: (1) Home price minus down payment equals loan amount, (2) Add CMHC insurance if down payment is less than 20%, (3) Calculate using semi-annual interest rate converted to your payment frequency (monthly, bi-weekly, weekly, accelerated bi-weekly, or accelerated weekly). For example, a $800,000 home with 20% down ($160,000), 5% interest rate, and 25-year amortization results in a monthly payment of approximately $3,722. The calculator automatically handles the Canadian-specific semi-annual compounding and provincial variations.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is CMHC insurance and when is it required?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'CMHC (Canada Mortgage and Housing Corporation) insurance is mortgage default insurance required when your down payment is less than 20% of the home price. The insurance protects lenders if you default on your mortgage. Insurance premiums vary based on your down payment: 4.0% for 5-9.99% down, 3.1% for 10-14.99% down, and 2.8% for 15-19.99% down. The premium is added to your mortgage amount and paid over the amortization period. For a $800,000 home with 10% down ($80,000), the loan is $720,000, and CMHC insurance at 3.1% adds $22,320, making your total mortgage $742,320. CMHC insurance allows Canadians to purchase homes with as little as 5% down, though maximum amortization is limited to 25 years for insured mortgages.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the Canadian mortgage stress test?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Canadian mortgage stress test requires borrowers to qualify at a higher interest rate than their actual contract rate to ensure they can afford payments if rates increase. You must qualify at the greater of: (1) Your contract rate plus 2%, or (2) 5.25%. For example, with a 5% contract rate, you must qualify at 7% (5% + 2%). If your contract rate is 3%, you must qualify at 5.25%. This means your monthly payment at the qualifying rate must not exceed 39% of your gross monthly income (GDS ratio) or 44% including all debts (TDS ratio). For a $640,000 mortgage at 5%, the actual monthly payment is $3,722, but you must qualify based on a payment of $4,524 at the 7% stress test rate, requiring a minimum annual income of approximately $143,000.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do accelerated payments save money on my Canadian mortgage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Accelerated payment options allow you to pay off your mortgage faster and save thousands in interest. Standard bi-weekly payments divide your monthly payment by two (26 payments yearly = 12 months). Accelerated bi-weekly takes your monthly payment, divides by two, resulting in one extra monthly payment per year (26 × biweekly = 13 monthly payments). Accelerated weekly divides your monthly payment by four, also resulting in extra payments. For a $640,000 mortgage at 5% over 25 years: monthly payments total $1,116,682 in interest, standard bi-weekly saves minimal interest, but accelerated bi-weekly can save approximately $50,000+ in interest and shave 3-4 years off your amortization. The extra payments directly reduce principal, creating compound savings. Most Canadian lenders allow accelerated payments without penalties.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much is land transfer tax in Canada?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Land transfer tax varies significantly by province: Ontario charges approximately 2% with rebates up to $4,000 for first-time buyers; British Columbia charges 2% with rebates up to $8,000 for first-time buyers; Alberta has no provincial land transfer tax (only registry fees); Quebec charges approximately 1.5% with no general rebate; Manitoba, Saskatchewan, Nova Scotia, New Brunswick, Newfoundland and Labrador, and Prince Edward Island have varying rates from 0.3% to 2%. For an $800,000 home in Ontario, land transfer tax is approximately $16,000, reduced to $12,000 for first-time buyers after the rebate. Toronto adds municipal land transfer tax, potentially doubling the cost. Always verify current rates with your province as policies change regularly.',
            },
          },
          {
            '@type': 'Question',
            name: 'What income do I need to qualify for a Canadian mortgage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Canadian lenders use Gross Debt Service (GDS) and Total Debt Service (TDS) ratios to determine qualifying income. GDS ratio should not exceed 39% and includes mortgage payment (at stress test rate), property taxes, heating costs, and 50% of condo fees. TDS ratio should not exceed 44% and adds all other debts (car loans, credit cards, student loans). For a $640,000 mortgage at 5% stress tested at 7%: monthly payment is $4,524, add property taxes ($200) and heating ($150), totaling $4,874. To meet the 39% GDS limit, you need gross monthly income of $12,497 or $149,964 annually. With additional debts of $500/month, your required income increases to approximately $156,000 to meet the 44% TDS limit. Self-employed borrowers may need to show two years of income history and may face additional scrutiny.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/canadian-mortgage-calculator'),
        name: 'How to Calculate Your Canadian Mortgage Payment with CMHC Insurance',
        description: 'Step-by-step guide to calculating Canadian mortgage payments, including CMHC insurance, land transfer tax, and stress test qualification.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'CAD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Canadian Mortgage Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Home Price and Down Payment',
            text: 'Enter your desired home price in Canadian dollars. Input your down payment as either a percentage or dollar amount. Remember that Canadian mortgages require a minimum 5% down payment, and down payments below 20% require CMHC insurance. For homes over $1 million, minimum down payment is 20%.',
            url: getStepUrl('/canadian-mortgage-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Select Interest Rate and Amortization',
            text: 'Enter the annual interest rate offered by your lender. Select your amortization period (typically 25 years, maximum 30 years if down payment is 20%+, maximum 25 years for CMHC-insured mortgages). Canadian mortgages use semi-annual compounding, which is automatically calculated.',
            url: getStepUrl('/canadian-mortgage-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Choose Payment Frequency',
            text: 'Select your preferred payment frequency: monthly, bi-weekly, weekly, accelerated bi-weekly, or accelerated weekly. Accelerated payments result in one extra monthly payment per year, significantly reducing total interest and amortization period. Most Canadian lenders offer all these options.',
            url: getStepUrl('/canadian-mortgage-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Select Province and First-Time Buyer Status',
            text: 'Choose your province to calculate accurate land transfer tax. Check the first-time home buyer box if eligible for provincial rebates (typically $4,000-$8,000 depending on province). Alberta has no land transfer tax. Quebec, Ontario, and BC have the highest rates.',
            url: getStepUrl('/canadian-mortgage-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Add Optional Costs',
            text: 'Toggle "Include Optional Costs" to add property taxes (typically 0.3-1.5% of home value annually), home insurance ($1,500-$3,000/year), condo fees if applicable, and other costs like utilities or maintenance. These help calculate your true monthly housing cost.',
            url: getStepUrl('/canadian-mortgage-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Review Results and Stress Test',
            text: 'Click Calculate to see your monthly payment, total costs, and detailed breakdown. Review CMHC insurance if applicable, land transfer tax for your province, total upfront costs needed, and stress test results showing the qualifying rate and minimum income required to get approved for your mortgage.',
            url: getStepUrl('/canadian-mortgage-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/canadian-mortgage-calculator'),
        headline: 'Complete Guide to Canadian Mortgages: CMHC Insurance, Stress Test, and Provincial Differences',
        description: 'Comprehensive guide to calculating Canadian mortgage payments, understanding CMHC insurance requirements, navigating the stress test, and comparing provincial land transfer taxes.',
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
        dateModified: '2024-11-18',
        image: getOgImage('canadian-mortgage'),
        articleBody: 'Learn everything about Canadian mortgages, including CMHC insurance calculations, mortgage stress test requirements, provincial land transfer taxes, and accelerated payment strategies.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Canadian Mortgage Calculator with CMHC Insurance and Stress Test</h1>
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" 
              itemScope itemType="https://schema.org/BreadcrumbList">
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
              <span itemProp="name" className="text-gray-900 font-semibold">
                Canadian Mortgage Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <CanadianMortgageCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Canadian Mortgages</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700">
              <strong>Quick Summary:</strong> Canadian mortgages differ from US mortgages in several key ways: semi-annual interest compounding, CMHC insurance for down payments below 20%, mandatory stress testing at qualifying rates, and provincial variations in land transfer taxes. Use this calculator to get accurate Canadian mortgage estimates for any province.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Makes Canadian Mortgages Unique?</h3>
          <p className="text-gray-700 mb-4">
            Canadian mortgages use <strong>semi-annual compounding</strong>, meaning interest is compounded twice per year rather than monthly as in the United States. This results in slightly lower effective interest rates. For example, a 5% annual rate with semi-annual compounding equals an effective rate of 4.89%, whereas US monthly compounding would yield 5.12%. While the difference seems small, over a 25-year mortgage, it can amount to thousands of dollars.
          </p>

          <p className="text-gray-700 mb-4">
            The Canadian mortgage system also features <strong>shorter default term lengths</strong>. While amortization periods can extend to 25-30 years, mortgage terms (the period during which your rate is guaranteed) typically range from 1 to 5 years. At the end of each term, you renegotiate your rate. This differs from the US 30-year fixed-rate mortgage that locks in your rate for the full period. Five-year terms are most common in Canada, balancing rate security with flexibility.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">CMHC Mortgage Default Insurance</h3>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold border-b">Down Payment</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">CMHC Premium Rate</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Example ($800,000 Home)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">20%+ ($160,000+)</td>
                  <td className="px-4 py-3 text-center font-bold text-green-700">0%</td>
                  <td className="px-4 py-3 text-sm">No insurance required</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">15-19.99% ($120,000-$159,999)</td>
                  <td className="px-4 py-3 text-center font-bold">2.80%</td>
                  <td className="px-4 py-3 text-sm">$17,920 insurance on $640,000 loan</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">10-14.99% ($80,000-$119,999)</td>
                  <td className="px-4 py-3 text-center font-bold">3.10%</td>
                  <td className="px-4 py-3 text-sm">$22,320 insurance on $720,000 loan</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">5-9.99% ($40,000-$79,999)</td>
                  <td className="px-4 py-3 text-center font-bold text-red-700">4.00%</td>
                  <td className="px-4 py-3 text-sm">$30,400 insurance on $760,000 loan</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mb-4">
            CMHC (Canada Mortgage and Housing Corporation) insurance is <strong>required when your down payment is less than 20%</strong> of the purchase price. The insurance protects lenders if you default on your mortgage. The premium is calculated as a percentage of your loan amount and is typically added to your mortgage principal, meaning you pay interest on it over your amortization period.
          </p>

          <p className="text-gray-700 mb-4">
            Two other insurers offer similar products: Sagen (formerly Genworth Canada) and Canada Guaranty. All three use identical premium structures regulated by federal law. <strong>For homes over $1 million, the maximum loan-to-value ratio is 80%,</strong> meaning a 20% down payment is mandatory regardless of insurance. Properties between $500,000 and $1 million have graduated down payment requirements: 5% on the first $500,000 and 10% on the portion above.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Canadian Mortgage Stress Test</h3>
          
          <p className="text-gray-700 mb-4">
            Introduced in 2018 and updated regularly, the <strong>mortgage stress test</strong> ensures borrowers can afford their mortgage payments if interest rates rise. You must qualify at the <strong>greater of your contract rate plus 2%, or the Bank of Canada's benchmark qualifying rate (currently 5.25%)</strong>. This applies to all insured mortgages and uninsured mortgages from federally regulated lenders.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-amber-900 mb-3">Stress Test Example</h4>
            
            <div className="space-y-3 text-sm text-amber-900">
              <div>
                <p className="font-semibold">Scenario: $800,000 home, 20% down ($160,000), 5% contract rate, 25-year amortization</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white rounded p-3">
                  <p className="text-xs text-gray-600 mb-1">Contract Rate Payment</p>
                  <p className="text-xl font-bold text-blue-700">$3,722/month</p>
                  <p className="text-xs mt-1">At your actual 5% rate</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="text-xs text-gray-600 mb-1">Qualifying Rate Payment</p>
                  <p className="text-xl font-bold text-red-700">$4,524/month</p>
                  <p className="text-xs mt-1">At 7% stress test rate</p>
                </div>
              </div>
              
              <div className="bg-white rounded p-3 mt-3">
                <p className="text-xs text-gray-600 mb-1">Minimum Qualifying Income (GDS ≤39%)</p>
                <p className="text-2xl font-bold text-green-700">$149,964/year</p>
                <p className="text-xs mt-1">Required to pass stress test</p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            The stress test uses your <strong>Gross Debt Service (GDS)</strong> and <strong>Total Debt Service (TDS)</strong> ratios. GDS includes your mortgage payment (at the qualifying rate), property taxes, heating costs, and 50% of condo fees, and must not exceed 39% of your gross monthly income. TDS adds all other debt payments (credit cards, car loans, student loans) and must not exceed 44% of gross monthly income.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Provincial Land Transfer Tax Comparison</h3>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold border-b">Province</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">Avg Rate</th>
                  <th className="px-4 py-3 text-right font-semibold border-b">$800K Home</th>
                  <th className="px-4 py-3 text-right font-semibold border-b">First-Time Buyer Rebate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Ontario</td>
                  <td className="px-4 py-3 text-center">~2.0%</td>
                  <td className="px-4 py-3 text-right font-bold">$16,000</td>
                  <td className="px-4 py-3 text-right text-green-700">Up to $4,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">British Columbia</td>
                  <td className="px-4 py-3 text-center">~2.0%</td>
                  <td className="px-4 py-3 text-right font-bold">$16,000</td>
                  <td className="px-4 py-3 text-right text-green-700">Up to $8,000</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-3">Alberta</td>
                  <td className="px-4 py-3 text-center font-bold text-green-700">0%</td>
                  <td className="px-4 py-3 text-right font-bold text-green-700">$0</td>
                  <td className="px-4 py-3 text-right">N/A</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Quebec</td>
                  <td className="px-4 py-3 text-center">~1.5%</td>
                  <td className="px-4 py-3 text-right font-bold">$12,000</td>
                  <td className="px-4 py-3 text-right">None</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Manitoba</td>
                  <td className="px-4 py-3 text-center">~2.0%</td>
                  <td className="px-4 py-3 text-right font-bold">$16,000</td>
                  <td className="px-4 py-3 text-right">None</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Saskatchewan</td>
                  <td className="px-4 py-3 text-center">~0.3%</td>
                  <td className="px-4 py-3 text-right font-bold">$2,400</td>
                  <td className="px-4 py-3 text-right">None</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mb-4">
            Land transfer tax varies dramatically by province and can add thousands to your closing costs. <strong>Ontario and Toronto</strong> are particularly expensive: Toronto levies both provincial and municipal land transfer tax, potentially doubling the cost. First-time home buyers in Ontario and BC receive rebates, significantly reducing the burden. <strong>Alberta is unique in having no provincial land transfer tax,</strong> only modest registry fees.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Accelerated Mortgage Payment Strategies</h3>
          
          <p className="text-gray-700 mb-4">
            Canadian lenders offer several payment frequency options that can dramatically reduce your total interest and amortization period:
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Monthly:</strong> 12 payments per year. Standard payment schedule, simplest to budget.</li>
            <li><strong>Bi-weekly:</strong> Payment every two weeks (26 payments/year). Divides monthly payment by 2.167 (26/12).</li>
            <li><strong>Weekly:</strong> Payment every week (52 payments/year). Divides monthly payment by 4.333 (52/12).</li>
            <li><strong>Accelerated Bi-weekly:</strong> Takes monthly payment, divides by 2. Results in 26 payments totaling 13 monthly payments annually.</li>
            <li><strong>Accelerated Weekly:</strong> Takes monthly payment, divides by 4. Results in 52 payments totaling 13 monthly payments annually.</li>
          </ul>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-green-900 mb-3">Accelerated Payment Savings Example</h4>
            <p className="text-sm text-green-900 mb-3">$640,000 mortgage at 5% over 25 years:</p>
            
            <div className="space-y-2 text-sm text-green-900">
              <div className="flex justify-between">
                <span>Monthly payments:</span>
                <span className="font-bold">$1,116,682 total interest</span>
              </div>
              <div className="flex justify-between">
                <span>Accelerated bi-weekly:</span>
                <span className="font-bold text-green-700">$1,063,420 total interest</span>
              </div>
              <div className="flex justify-between border-t border-green-200 pt-2">
                <span className="font-bold">Interest Saved:</span>
                <span className="font-bold text-xl text-green-700">$53,262</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Years Saved:</span>
                <span className="font-bold text-xl text-green-700">~3.5 years</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            The magic of accelerated payments lies in making one extra monthly payment per year. That extra payment goes entirely toward principal, creating a snowball effect. Over a 25-year mortgage, this seemingly small change can save tens of thousands in interest and shave years off your amortization.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">First-Time Home Buyer Programs</h3>
          
          <p className="text-gray-700 mb-4">
            Canada offers several programs to help first-time home buyers:
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Home Buyers' Plan (HBP):</strong> Withdraw up to $35,000 from your RRSP tax-free to purchase a home. Must repay over 15 years. Couples can each withdraw $35,000 for a combined $70,000.</li>
            <li><strong>First-Time Home Buyer Incentive (FTHBI):</strong> Government contributes 5-10% of purchase price (5% for existing homes, 10% for new builds). Repaid when you sell or after 25 years. Income and home price limits apply.</li>
            <li><strong>Land Transfer Tax Rebates:</strong> Ontario offers up to $4,000 rebate; BC offers up to $8,000. Toronto offers additional $4,475 municipal rebate for first-time buyers.</li>
            <li><strong>GST/HST New Housing Rebate:</strong> Rebate on GST/HST paid for new or substantially renovated homes. Reduces effective tax rate.</li>
            <li><strong>Provincial Programs:</strong> Some provinces offer additional down payment assistance, grants, or tax credits for first-time buyers. Check your provincial housing authority.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Choosing Between Fixed and Variable Rates</h3>
          
          <p className="text-gray-700 mb-4">
            Canadian mortgages offer both fixed and variable rate options, each with distinct advantages:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Fixed Rate Mortgages</h4>
              <ul className="text-sm text-blue-900 space-y-1 list-disc ml-5">
                <li>Interest rate locked for the term (1-5 years)</li>
                <li>Predictable payments for budgeting</li>
                <li>Protection from rate increases</li>
                <li>Typically 0.5-1% higher than variable rates</li>
                <li>Higher penalties for breaking the mortgage</li>
                <li>Best when rates are low or expected to rise</li>
              </ul>
            </div>

            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Variable Rate Mortgages</h4>
              <ul className="text-sm text-green-900 space-y-1 list-disc ml-5">
                <li>Rate fluctuates with Bank of Canada rate</li>
                <li>Initially lower than fixed rates</li>
                <li>Potential savings if rates drop or stay stable</li>
                <li>Payments may increase if rates rise</li>
                <li>Lower penalties for breaking (3 months interest)</li>
                <li>Best for risk-tolerant borrowers in stable rate environments</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            Historically, variable rate mortgages have saved borrowers money approximately 90% of the time over fixed rates. However, this comes with increased risk and payment uncertainty. Many financial advisors suggest fixed rates for first-time buyers who need budget predictability, and variable rates for financially secure borrowers who can weather rate fluctuations.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Resources</h3>
          <p className="text-gray-700 mb-4">
            For more information on Canadian mortgages and housing:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <a href="https://www.cmhc-schl.gc.ca/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                CMHC - Canada Mortgage and Housing Corporation
              </a> - Official government housing agency
            </li>
            <li>
              <a href="https://www.canada.ca/en/services/finance/manage/home-buyers-plan.html" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Home Buyers' Plan (HBP)
              </a> - RRSP withdrawal program
            </li>
            <li>
              <a href="https://www.bankofcanada.ca/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Bank of Canada
              </a> - Current policy rates and economic data
            </li>
            <li>
              <a href="https://www.fcac-acfc.gc.ca/Eng/forConsumers/topics/mortgages/Pages/Mortgage-Mortgage.aspx" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Financial Consumer Agency of Canada
              </a> - Mortgage education and tools
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/mortgage-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🏠</div>
            <h3 className="font-semibold text-gray-900">Mortgage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">US mortgage payment calculator</p>
          </a>
          
          <a 
            href="/home-affordability-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-900">Home Affordability Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">How much house can you afford?</p>
          </a>
          
          <a 
            href="/refinance-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-semibold text-gray-900">Refinance Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Should you refinance your mortgage?</p>
          </a>
          
          <a 
            href="/property-tax-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Property Tax Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Estimate your property taxes</p>
          </a>
        </div>
      </section>
    </div>
  );
}

