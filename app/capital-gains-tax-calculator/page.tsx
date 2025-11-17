import { Metadata } from 'next';
import CapitalGainsTaxCalculator from '@/components/Calculator/CapitalGainsTaxCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Capital Gains Tax Calculator - Calculate Short & Long Term Gains | AICalculator',
  description: 'Free capital gains tax calculator with federal & state rates, NIIT calculation, tax-loss harvesting strategies, and holding period analysis. Optimize your investment tax strategy.',
  keywords: [
    'capital gains tax calculator',
    'long term capital gains',
    'short term capital gains',
    'capital gains tax rate',
    'NIIT calculator',
    'net investment income tax',
    'tax loss harvesting',
    'cost basis calculator',
    'investment tax calculator',
    'stock tax calculator',
    'capital loss deduction',
    'holding period calculator',
    'federal capital gains',
    'state capital gains tax',
    'effective tax rate',
    'capital gains strategies',
    '1031 exchange calculator',
    'taxable investment gains',
    'capital gains exemption',
    'investment profit tax'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Capital Gains Tax Calculator - Optimize Your Investment Tax Strategy',
    description: 'Calculate capital gains taxes with federal & state rates, NIIT, and tax-saving strategies. Free, accurate, and comprehensive investment tax planning.',
    type: 'website',
    url: getUrl('/capital-gains-tax-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('capital-gains-tax'),
      width: 1200,
      height: 630,
      alt: 'Capital Gains Tax Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Capital Gains Tax Calculator - Free Investment Tax Planning Tool',
    description: 'Calculate short-term & long-term capital gains tax. Includes NIIT, state taxes, and optimization strategies.',
    images: [getOgImage('capital-gains-tax')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/capital-gains-tax-calculator'),
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': getWebAppId('/capital-gains-tax-calculator'),
      name: 'Capital Gains Tax Calculator',
      url: getUrl('/capital-gains-tax-calculator'),
      description: 'Advanced capital gains tax calculator for calculating federal and state taxes on investment gains, with NIIT calculation, tax-loss harvesting strategies, and holding period analysis.',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Short-term vs long-term capital gains calculation',
        'Federal tax rates (0%, 15%, 20%)',
        'Net Investment Income Tax (NIIT 3.8%)',
        'State capital gains tax (all 50 states)',
        'Cost basis adjustments',
        'Capital loss deduction ($3,000 limit)',
        'Holding period calculator',
        'Tax optimization strategies',
        'Scenario comparison',
        'Tax-loss harvesting analysis',
        'Effective tax rate calculation',
        'Real-time results'
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/capital-gains-tax-calculator'),
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
          name: 'Capital Gains Tax Calculator',
          item: getUrl('/capital-gains-tax-calculator'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/capital-gains-tax-calculator'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the difference between short-term and long-term capital gains?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Short-term capital gains apply to assets held for one year or less and are taxed at ordinary income tax rates (10%-37%). Long-term capital gains apply to assets held for more than one year and benefit from preferential tax rates of 0%, 15%, or 20% depending on your income level. For example, a single filer earning $50,000 would pay 12%-22% on short-term gains but only 15% on long-term gains, resulting in significant tax savings. The holding period is calculated from the day after purchase to the day of sale.'
          }
        },
        {
          '@type': 'Question',
          name: 'How are long-term capital gains taxed in 2024?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In 2024, long-term capital gains are taxed at three federal rates: 0% for single filers with taxable income up to $44,625 ($89,250 married), 15% for income between $44,626-$492,300 ($89,251-$553,850 married), and 20% for income above $492,300 ($553,850 married). Additionally, high earners may pay the 3.8% Net Investment Income Tax (NIIT) if their modified adjusted gross income exceeds $200,000 (single) or $250,000 (married). State taxes vary by location, ranging from 0% in states like Florida and Texas to over 13% in California.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is the Net Investment Income Tax (NIIT)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Net Investment Income Tax (NIIT) is a 3.8% surtax on investment income, including capital gains, dividends, interest, rental income, and passive business income. It applies to individuals with modified adjusted gross income (MAGI) exceeding $200,000 (single) or $250,000 (married filing jointly). The tax is calculated on the lesser of your net investment income or the amount by which your MAGI exceeds the threshold. For example, if you are single with $220,000 MAGI and $30,000 in capital gains, the NIIT would apply to $20,000 (the excess over $200,000), resulting in $760 in additional tax.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I calculate my cost basis for capital gains?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Your cost basis is the original purchase price of an asset plus any adjustments for improvements, fees, and commissions. For stocks, this includes the purchase price plus brokerage fees. For real estate, add the purchase price, closing costs, and the cost of significant improvements (not repairs). For example, if you bought a house for $300,000, paid $10,000 in closing costs, and spent $50,000 on renovations, your adjusted cost basis would be $360,000. When you sell for $450,000, your capital gain would be $90,000 ($450,000 - $360,000). Keep detailed records of all adjustments to maximize your cost basis and minimize taxable gains.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I deduct capital losses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, capital losses can offset capital gains dollar-for-dollar. If your losses exceed your gains, you can deduct up to $3,000 ($1,500 if married filing separately) of net capital losses against ordinary income per year. Any remaining losses can be carried forward indefinitely to future tax years. For example, if you have $10,000 in losses and $4,000 in gains, you have a $6,000 net loss. You can deduct $3,000 against ordinary income this year and carry forward the remaining $3,000 to next year. This strategy, called tax-loss harvesting, is commonly used to optimize investment portfolios and reduce tax liability.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is tax-loss harvesting?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tax-loss harvesting is a strategy where you intentionally sell investments at a loss to offset capital gains and reduce your tax bill. You can then reinvest in similar (but not identical) securities to maintain market exposure. For example, if you have $20,000 in capital gains from selling Stock A and $15,000 in unrealized losses in Stock B, you could sell Stock B to offset $15,000 of the gains, reducing your taxable gains to $5,000. Be aware of the wash sale rule: if you repurchase the same or substantially identical security within 30 days before or after the sale, the loss is disallowed. Tax-loss harvesting is most effective near year-end when you can assess your full tax situation.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do all states tax capital gains?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, nine states have no income tax and therefore no capital gains tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. All other states tax capital gains as ordinary income, with rates ranging from 2.9% in North Dakota to 13.3% in California. Some states offer preferential treatment: for example, Wisconsin excludes 30% of long-term gains, and Arizona allows a subtraction for certain capital gains. State tax treatment can significantly impact your after-tax returns, especially for high earners in high-tax states. Consider your state residency when planning large asset sales or relocations.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is a 1031 exchange and how does it defer capital gains tax?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A 1031 exchange (named after IRC Section 1031) allows real estate investors to defer capital gains taxes by reinvesting proceeds from a property sale into a "like-kind" replacement property. The exchange must meet strict requirements: both properties must be held for business or investment purposes (not personal residence), identification of replacement property within 45 days, and completion within 180 days. For example, if you sell a $500,000 rental property with a $200,000 cost basis, you would owe tax on $300,000 in gains. By completing a 1031 exchange into a $500,000+ replacement property, you defer all capital gains taxes. The deferred gain carries over to the new property. This strategy allows investors to continuously upgrade properties while deferring taxes, potentially until death when heirs receive a stepped-up basis.'
          }
        }
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/capital-gains-tax-calculator'),
      name: 'How to Calculate Capital Gains Tax',
      description: 'Step-by-step guide to calculating federal and state capital gains taxes on investment profits.',
      totalTime: 'PT5M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      tool: {
        '@type': 'HowToTool',
        name: 'Capital Gains Tax Calculator',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Enter Purchase Information',
          text: 'Input the original purchase price of your asset and the purchase date. Include any cost basis adjustments such as brokerage fees, commissions, or improvement costs (for real estate). The adjusted cost basis is crucial for accurate tax calculation.',
          url: getStepUrl('/capital-gains-tax-calculator', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Enter Sale Information',
          text: 'Input the sale price and sale date. The calculator automatically determines your holding period (short-term if ≤365 days, long-term if >365 days). The holding period significantly affects your tax rate, with long-term gains receiving preferential treatment.',
          url: getStepUrl('/capital-gains-tax-calculator', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Add Your Tax Information',
          text: 'Enter your annual income and filing status (single or married filing jointly). These determine your federal tax bracket and long-term capital gains rate. Income thresholds are critical: single filers under $44,625 pay 0% on long-term gains, while those over $492,300 pay 20%.',
          url: getStepUrl('/capital-gains-tax-calculator', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Select Your State',
          text: 'Choose your state of residence to calculate state capital gains tax. Tax rates vary dramatically by state, from 0% in nine states to over 13% in California. State taxes are always applied to net capital gains regardless of holding period.',
          url: getStepUrl('/capital-gains-tax-calculator', 4),
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Add Capital Losses (Optional)',
          text: 'If you have capital losses from other investments, enter the amount to see how they offset your gains. You can deduct unlimited losses against gains, plus up to $3,000 against ordinary income. Excess losses carry forward to future years.',
          url: getStepUrl('/capital-gains-tax-calculator', 5),
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Review NIIT Calculation',
          text: 'The calculator determines if you owe the 3.8% Net Investment Income Tax (NIIT). This surtax applies to high earners: single filers with MAGI over $200,000 or married filers over $250,000. The NIIT significantly increases effective tax rates for wealthy investors.',
          url: getStepUrl('/capital-gains-tax-calculator', 6),
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Analyze Tax Breakdown',
          text: 'Review your complete tax breakdown showing federal capital gains tax, NIIT, and state tax separately. The effective tax rate shows your total tax as a percentage of capital gain, helping you understand your true tax burden.',
          url: getStepUrl('/capital-gains-tax-calculator', 7),
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Compare Tax Strategies',
          text: 'Use the scenario comparison to see potential tax savings from holding investments longer, harvesting losses, or relocating to low-tax states. For short-term gains, see how much you could save by waiting to qualify for long-term rates.',
          url: getStepUrl('/capital-gains-tax-calculator', 8),
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/capital-gains-tax-calculator'),
      headline: 'Capital Gains Tax Calculator: Complete Guide to Investment Tax Planning',
      description: 'Comprehensive guide to calculating and minimizing capital gains taxes on stocks, real estate, and other investments.',
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
      dateModified: '2024-11-16',
      image: getOgImage('capital-gains-tax'),
      articleBody: 'Understanding capital gains tax is essential for investors looking to maximize their after-tax returns. This comprehensive guide covers short-term vs long-term capital gains, federal and state tax rates, the Net Investment Income Tax (NIIT), cost basis calculations, tax-loss harvesting strategies, and 1031 exchanges for real estate investors.',
    },
  ],
};

export default function CapitalGainsTaxCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">Capital Gains Tax Calculator - Calculate Short & Long Term Investment Taxes</h1>

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
                <span itemProp="name" className="text-gray-900 font-semibold">Capital Gains Tax Calculator</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>

        {/* Calculator Component */}
        <CapitalGainsTaxCalculator />

        {/* Educational Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Capital Gains Tax: A Comprehensive Guide</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <p className="text-lg text-blue-900">
                <strong>Capital gains tax</strong> is the tax levied on profits from selling investments, real estate, or other capital assets. Understanding how it works is crucial for maximizing your investment returns and minimizing your tax burden. This guide covers everything from basic concepts to advanced tax optimization strategies.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Short-Term vs Long-Term Capital Gains: The Critical Difference</h2>
            <p className="text-gray-700 mb-4">
              The IRS divides capital gains into two categories based on holding period, and the tax implications are dramatically different:
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Short-Term Capital Gains (Assets Held ≤365 Days)</h3>
            <p className="text-gray-700 mb-4">
              When you sell an asset you've held for one year or less, any profit is considered a short-term capital gain and is taxed at your ordinary income tax rate. For 2024, federal income tax rates range from 10% to 37% depending on your income bracket:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>10%</strong>: Income up to $11,000 (single) / $22,000 (married)</li>
              <li><strong>12%</strong>: $11,001-$44,725 / $22,001-$89,050</li>
              <li><strong>22%</strong>: $44,726-$95,375 / $89,051-$190,750</li>
              <li><strong>24%</strong>: $95,376-$182,100 / $190,751-$364,200</li>
              <li><strong>32%</strong>: $182,101-$231,250 / $364,201-$462,500</li>
              <li><strong>35%</strong>: $231,251-$578,125 / $462,501-$693,750</li>
              <li><strong>37%</strong>: Over $578,125 / Over $693,750</li>
            </ul>
            <p className="text-gray-700 mb-4">
              For active traders and short-term investors, this can mean paying more than double the tax rate compared to holding investments longer. A high-income earner in the 37% bracket pays nearly twice the maximum long-term rate of 20%.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Long-Term Capital Gains (Assets Held >365 Days)</h3>
            <p className="text-gray-700 mb-4">
              Assets held for more than one year qualify for preferential long-term capital gains rates of 0%, 15%, or 20%:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>0% Rate</strong>: Taxable income up to $44,625 (single) / $89,250 (married) - Yes, you read that right: zero tax on investment gains for lower earners!</li>
              <li><strong>15% Rate</strong>: Taxable income $44,626-$492,300 (single) / $89,251-$553,850 (married) - This is the "sweet spot" where most investors fall</li>
              <li><strong>20% Rate</strong>: Taxable income over $492,300 (single) / $553,850 (married) - Still significantly lower than the 37% top ordinary income rate</li>
            </ul>
            <p className="text-gray-700 mb-4">
              The tax savings from qualifying for long-term rates can be substantial. Consider this example: A single filer earning $100,000 sells stock for a $50,000 profit. If it's short-term, they pay $11,000 in federal tax (22% bracket). If long-term, they pay only $7,500 (15% rate) - a savings of $3,500. For wealthy investors in high brackets, the difference is even more dramatic: 37% vs 20% on potentially millions in gains.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Net Investment Income Tax (NIIT): The 3.8% Surtax</h2>
            <p className="text-gray-700 mb-4">
              High-income earners face an additional layer of tax known as the Net Investment Income Tax (NIIT), enacted as part of the Affordable Care Act. This 3.8% surtax applies to investment income, including capital gains, dividends, interest, rental income, and passive business income.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">NIIT Income Thresholds</h3>
            <p className="text-gray-700 mb-4">
              The NIIT applies when your Modified Adjusted Gross Income (MAGI) exceeds:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>$200,000</strong> for single filers and heads of household</li>
              <li><strong>$250,000</strong> for married filing jointly</li>
              <li><strong>$125,000</strong> for married filing separately</li>
            </ul>
            <p className="text-gray-700 mb-4">
              The tax is calculated on the lesser of (1) your net investment income or (2) the amount by which your MAGI exceeds the threshold. For example, if you're single with $220,000 MAGI and $30,000 in capital gains, the NIIT applies to $20,000 (the excess over $200,000), adding $760 to your tax bill.
            </p>
            <p className="text-gray-700 mb-4">
              For high earners, the NIIT significantly increases effective capital gains rates. A wealthy investor in the 20% long-term bracket effectively pays 23.8% (20% + 3.8%) on gains. Combined with state taxes, total rates can exceed 35% even on long-term gains in high-tax states like California.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">State Capital Gains Taxes: Geographic Tax Planning</h2>
            <p className="text-gray-700 mb-4">
              While federal capital gains rules are uniform nationwide, state treatment varies dramatically. Nine states have no income tax and therefore no capital gains tax:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Zero Tax States</strong>: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Among states that do tax capital gains, rates range from less than 3% to over 13%:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Low-Tax States (0-5%)</strong>: North Dakota (2.9%), Pennsylvania (3.07%), Indiana (3.23%), Ohio (3.99%)</li>
              <li><strong>Moderate-Tax States (5-8%)</strong>: Colorado (4.5%), Utah (4.85%), Illinois (4.95%), Michigan (4.25%)</li>
              <li><strong>High-Tax States (8%+)</strong>: Minnesota (9.85%), Oregon (9.9%), New York (10.9%), New Jersey (10.75%), California (13.3%)</li>
            </ul>
            <p className="text-gray-700 mb-4">
              For wealthy investors with large unrealized gains, relocating to a no-tax state before selling can save hundreds of thousands of dollars. However, states have residency rules (typically 183+ days) to prevent tax avoidance, and establishing bona fide residency requires more than just buying a vacation home. Consult a tax advisor before making such moves.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cost Basis: The Foundation of Capital Gains Calculation</h2>
            <p className="text-gray-700 mb-4">
              Your cost basis is the starting point for calculating capital gains. It typically equals the purchase price plus certain adjustments, but the details vary by asset type.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Stock and Securities Cost Basis</h3>
            <p className="text-gray-700 mb-4">
              For stocks and bonds, your cost basis includes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Purchase price</strong>: The actual amount paid per share</li>
              <li><strong>Brokerage commissions and fees</strong>: Trading costs increase your basis, reducing taxable gain</li>
              <li><strong>Reinvested dividends</strong>: If you reinvest dividends, each purchase creates a new tax lot with its own basis</li>
              <li><strong>Stock splits and dividends</strong>: These events require basis adjustments across new shares</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Example: You buy 100 shares at $50/share ($5,000) with a $10 commission. Your cost basis is $5,010, or $50.10 per share. If you sell at $70/share ($7,000) with a $10 commission (net proceeds $6,990), your gain is $1,980 ($6,990 - $5,010).
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Real Estate Cost Basis</h3>
            <p className="text-gray-700 mb-4">
              Real estate has more complex basis rules:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Purchase price</strong>: The amount paid for the property</li>
              <li><strong>Closing costs</strong>: Title insurance, attorney fees, recording fees, surveys, transfer taxes</li>
              <li><strong>Capital improvements</strong>: Major renovations, additions, new roof, HVAC system, landscaping (but NOT routine repairs)</li>
              <li><strong>Selling expenses</strong>: Realtor commissions, title fees, transfer taxes reduce your gain</li>
              <li><strong>Depreciation recapture</strong>: For rental properties, depreciation claimed must be subtracted from basis</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Example: You buy a home for $400,000, pay $15,000 in closing costs, spend $75,000 on a kitchen remodel and new roof, and later sell for $600,000 with $36,000 in selling costs. Your adjusted basis is $490,000 ($400,000 + $15,000 + $75,000), net proceeds are $564,000 ($600,000 - $36,000), and taxable gain is $74,000 ($564,000 - $490,000). Keep meticulous records of all improvements!
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Capital Loss Deductions: Turning Losses into Tax Savings</h2>
            <p className="text-gray-700 mb-4">
              When investments decline in value, selling them at a loss provides a silver lining: tax deductions that can offset gains and even reduce ordinary income.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Capital Loss Offset Rules</h3>
            <p className="text-gray-700 mb-4">
              Capital losses follow a specific ordering:
            </p>
            <ol className="list-decimal pl-6 mb-4 text-gray-700">
              <li><strong>Offset capital gains first</strong>: Short-term losses offset short-term gains, and long-term losses offset long-term gains</li>
              <li><strong>Cross-offset if needed</strong>: If one category has excess losses, they offset gains in the other category</li>
              <li><strong>$3,000 ordinary income deduction</strong>: If losses exceed gains, deduct up to $3,000 against wages, business income, etc. ($1,500 if married filing separately)</li>
              <li><strong>Carry forward indefinitely</strong>: Remaining losses carry forward to future years until fully used</li>
            </ol>
            <p className="text-gray-700 mb-4">
              Example: You have $30,000 in long-term gains, $10,000 in short-term gains, and $25,000 in long-term losses. The losses first offset the $30,000 long-term gains, leaving $5,000 excess losses. Those offset your $10,000 short-term gains, giving you net short-term gains of $5,000 to be taxed at ordinary rates. No carryforward or ordinary income deduction is needed.
            </p>
            <p className="text-gray-700 mb-4">
              Another example: You have $50,000 in losses and $10,000 in gains this year. Your net loss is $40,000. You can deduct $3,000 against ordinary income this year, reducing your taxable income. The remaining $37,000 carries forward: $3,000 deduction next year, $3,000 the year after, and so on until exhausted.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">The Wash Sale Rule: A Critical Limitation</h3>
            <p className="text-gray-700 mb-4">
              The wash sale rule prevents you from immediately repurchasing a security after selling it for a loss. If you sell a security at a loss and buy the same or a "substantially identical" security within 30 days before or after the sale (61-day window total), the loss is disallowed for tax purposes. Instead, the disallowed loss is added to the cost basis of the replacement shares.
            </p>
            <p className="text-gray-700 mb-4">
              Example: You sell 100 shares of XYZ stock for a $5,000 loss on December 15. On December 20, you repurchase 100 shares. The wash sale rule applies, so you can't deduct the $5,000 loss this year. Instead, it's added to the cost basis of your new shares, effectively deferring the tax benefit until you sell those shares.
            </p>
            <p className="text-gray-700 mb-4">
              To avoid wash sales while maintaining market exposure, consider: (1) waiting 31+ days to repurchase, (2) buying a similar but not identical security (e.g., a different tech stock or broad market ETF), or (3) for index fund investors, swapping to a different provider's fund tracking the same index (e.g., VTSAX to ITOT).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tax-Loss Harvesting: Proactive Tax Optimization</h2>
            <p className="text-gray-700 mb-4">
              Tax-loss harvesting is a powerful strategy where you intentionally realize losses to offset gains and reduce current-year taxes. Sophisticated investors harvest losses throughout the year, but it's especially valuable in December when you can assess your full-year tax picture.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">How Tax-Loss Harvesting Works</h3>
            <p className="text-gray-700 mb-4">
              The strategy involves four steps:
            </p>
            <ol className="list-decimal pl-6 mb-4 text-gray-700">
              <li><strong>Identify unrealized losses</strong>: Review your portfolio for positions trading below cost basis</li>
              <li><strong>Calculate tax benefit</strong>: Determine how much tax you'll save by realizing the loss</li>
              <li><strong>Sell the losing position</strong>: Execute the sale to realize the loss</li>
              <li><strong>Reinvest proceeds strategically</strong>: Either wait 31 days to repurchase or buy a similar (but not identical) security</li>
            </ol>
            <p className="text-gray-700 mb-4">
              Example scenario: You have $50,000 in realized capital gains from selling appreciated stock and $30,000 in unrealized losses from a poorly performing position. By selling the losing position before year-end, you reduce your taxable gains to $20,000. At a 15% federal rate, this saves $4,500 in taxes ($30,000 × 15%). You can reinvest in a similar fund to maintain market exposure.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Advanced Tax-Loss Harvesting Strategies</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Specific lot identification</strong>: When selling partial positions, identify high-basis lots to maximize losses (or low-basis lots to minimize gains)</li>
              <li><strong>Year-end harvesting</strong>: Review your portfolio in November-December to optimize your annual tax picture</li>
              <li><strong>Robo-advisor automation</strong>: Some platforms automatically harvest losses daily, potentially saving thousands annually</li>
              <li><strong>High-net-worth strategies</strong>: Coordinate with year-end bonuses, RSU vesting, and other income timing to maximize benefit</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1031 Exchange: Deferring Real Estate Gains</h2>
            <p className="text-gray-700 mb-4">
              For real estate investors, Section 1031 of the tax code offers a powerful tool to defer capital gains taxes indefinitely through "like-kind" exchanges. This strategy allows you to sell an investment or business property and reinvest the proceeds in a replacement property without triggering immediate tax liability.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">1031 Exchange Requirements</h3>
            <p className="text-gray-700 mb-4">
              To qualify for a 1031 exchange:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Like-kind property</strong>: Both properties must be held for business or investment purposes (not personal residence or flipping). "Like-kind" is broadly defined for real estate: you can exchange commercial for residential rental, land for apartment building, etc.</li>
              <li><strong>45-day identification period</strong>: Within 45 days of selling your property, you must identify potential replacement properties in writing to a qualified intermediary</li>
              <li><strong>180-day exchange period</strong>: You must complete the purchase of replacement property within 180 days of selling or by your tax return due date, whichever is earlier</li>
              <li><strong>Equal or greater value</strong>: To defer 100% of gain, the replacement property must be of equal or greater value, and you must reinvest all proceeds</li>
              <li><strong>No cash received</strong>: You cannot receive proceeds directly; a qualified intermediary must hold funds between transactions</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Example 1031 Exchange</h3>
            <p className="text-gray-700 mb-4">
              You own a rental property worth $800,000 with a $300,000 cost basis (after depreciation). Selling would trigger $500,000 in capital gains, resulting in roughly $100,000-150,000 in federal and state taxes (depending on holding period and state). Through a 1031 exchange into an $850,000 replacement property, you defer all taxes. Your new property has a $300,000 carryover basis (the old basis), preserving the deferred gain.
            </p>
            <p className="text-gray-700 mb-4">
              You can continue this strategy indefinitely, upgrading properties while deferring taxes. When you die, your heirs receive a stepped-up basis to fair market value, potentially eliminating the deferred gains entirely. This "swap til you drop" strategy is how many real estate fortunes are built while minimizing lifetime tax payments.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Strategies to Minimize Capital Gains Tax</h2>
            <p className="text-gray-700 mb-4">
              Beyond the specific strategies already discussed, here are additional ways to reduce your capital gains tax burden:
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">1. Hold Investments Long-Term</h3>
            <p className="text-gray-700 mb-4">
              The simplest and most powerful strategy: hold investments for more than one year to qualify for preferential long-term rates. For high earners, this can cut your federal rate in half (37% → 20%). Even a few extra days of holding can save thousands.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">2. Use Tax-Advantaged Accounts</h3>
            <p className="text-gray-700 mb-4">
              Investments in 401(k)s, IRAs, and Roth accounts grow tax-deferred or tax-free. Consider holding your highest-growth, highest-turnover investments in these accounts to avoid annual capital gains taxes. Use taxable accounts for buy-and-hold positions that generate minimal taxable events.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">3. Donate Appreciated Assets</h3>
            <p className="text-gray-700 mb-4">
              Donating appreciated stock directly to charity provides a double tax benefit: (1) you avoid paying capital gains tax on the appreciation, and (2) you get a charitable deduction for the full fair market value. This is far superior to selling the stock, paying tax, and then donating cash.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">4. Time Gains Across Tax Years</h3>
            <p className="text-gray-700 mb-4">
              If you anticipate lower income in a future year (retirement, sabbatical, career change), consider deferring gains until that year to take advantage of a lower tax bracket. Conversely, if you expect higher income, accelerate gains into the current year.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">5. Primary Residence Exclusion</h3>
            <p className="text-gray-700 mb-4">
              Homeowners can exclude up to $250,000 ($500,000 married) of capital gains on the sale of their primary residence if they've owned and lived in it for at least 2 of the past 5 years. This is one of the most generous tax breaks available and can be used repeatedly throughout your lifetime (with the 2-year waiting period between uses).
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">6. Opportunity Zone Investing</h3>
            <p className="text-gray-700 mb-4">
              The Opportunity Zone program allows investors to defer and potentially reduce capital gains by investing in designated economically distressed areas. You must invest within 180 days of realizing gains, but can defer tax until 2026 and eliminate tax on appreciation in the Opportunity Zone investment if held for 10+ years.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Capital Gains Tax Mistakes to Avoid</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Selling just before the 1-year mark</strong>: Selling at 364 days triggers short-term rates; waiting just one more day can save thousands</li>
              <li><strong>Ignoring cost basis adjustments</strong>: Forgetting to add improvements, fees, and reinvested dividends inflates your taxable gain</li>
              <li><strong>Not considering state residency</strong>: Moving from California to Texas before a large sale can save 13.3% in state taxes</li>
              <li><strong>Triggering wash sales</strong>: Repurchasing too quickly disallows tax-loss harvesting benefits</li>
              <li><strong>Missing the 1031 exchange deadlines</strong>: Even one day late disqualifies the entire exchange</li>
              <li><strong>Forgetting about NIIT</strong>: High earners often overlook the 3.8% surtax when calculating estimated taxes</li>
              <li><strong>Not keeping detailed records</strong>: Unable to prove cost basis years later can result in IRS treating the entire sale as gain</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Record Keeping Best Practices</h2>
            <p className="text-gray-700 mb-4">
              Proper documentation is essential for accurately calculating capital gains and surviving an audit:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Purchase documentation</strong>: Trade confirmations, closing statements, invoices</li>
              <li><strong>Improvement records</strong>: Receipts, contracts, before/after photos for real estate</li>
              <li><strong>Corporate actions</strong>: Stock splits, mergers, spinoffs that affect basis</li>
              <li><strong>Form 1099-B</strong>: Broker statements showing sales and basis reporting</li>
              <li><strong>Form 8949</strong>: Detailed capital gains/losses for your tax return</li>
              <li><strong>Digital backups</strong>: Scan all documents; paper can fade or be lost</li>
            </ul>
            <p className="text-gray-700 mb-4">
              The IRS recommends keeping records for at least 3 years after filing (6 years if they suspect underreporting), but for major purchases like real estate, keep records indefinitely.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conclusion: Mastering Capital Gains for Long-Term Wealth</h2>
            <p className="text-gray-700 mb-4">
              Capital gains tax is one of the most significant costs in building investment wealth, but it's also one of the most controllable. By understanding the rules around holding periods, tax rates, cost basis, loss deductions, and strategic planning techniques, you can dramatically reduce your lifetime tax burden.
            </p>
            <p className="text-gray-700 mb-4">
              The strategies discussed here—holding investments long-term, harvesting losses, using 1031 exchanges, timing income, and maximizing tax-advantaged accounts—can collectively save hundreds of thousands of dollars over an investing lifetime. Even simple actions like waiting a few extra days before selling or keeping meticulous records pay significant dividends.
            </p>
            <p className="text-gray-700 mb-4">
              Use our calculator to model different scenarios, understand your specific tax situation, and make informed decisions about when and how to sell investments. For complex situations involving large gains, real estate, or business interests, consult with a qualified CPA or tax attorney who specializes in capital gains planning.
            </p>
            <p className="text-gray-700 mb-4">
              Remember: the best tax strategy is one that balances tax efficiency with your broader financial goals. Don't let the tax tail wag the investment dog—make sound investment decisions first, then optimize for taxes within that framework.
            </p>

            <p>
              For complementary investment planning tools, explore our{' '}
              <a href="/investment-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Investment Calculator
              </a>,{' '}
              <a href="/roi-calculator" className="text-blue-600 hover:text-blue-800 underline">
                ROI Calculator
              </a>,{' '}
              <a href="/retirement-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Retirement Calculator
              </a>, and{' '}
              <a href="/tax-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Income Tax Calculator
              </a>
              {' '}to build a comprehensive financial plan.
            </p>

            <h3>Official Tax Resources</h3>
            <p>
              For authoritative information on capital gains taxes, visit the{' '}
              <a 
                href="https://www.irs.gov/taxtopics/tc409" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                IRS Topic 409 (Capital Gains and Losses)
              </a>, the{' '}
              <a 
                href="https://www.irs.gov/publications/p550" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                IRS Publication 550 (Investment Income and Expenses)
              </a>, and{' '}
              <a 
                href="https://www.sec.gov/reportspubs/investor-publications/investorpubstaxhtm.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                SEC Investment Taxation Guide
              </a>
              {' '}for detailed guidance on reporting investment gains and losses.
            </p>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a 
              href="/investment-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900">Investment Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate investment returns and growth</p>
            </a>
            
            <a 
              href="/roi-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900">ROI Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Measure return on investment percentage</p>
            </a>
            
            <a 
              href="/retirement-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">🏖️</div>
              <h3 className="font-semibold text-gray-900">Retirement Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Plan your retirement savings</p>
            </a>
            
            <a 
              href="/tax-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">🧾</div>
              <h3 className="font-semibold text-gray-900">Income Tax Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate federal and state taxes</p>
            </a>
            
            <a 
              href="/inflation-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900">Inflation Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Adjust for inflation over time</p>
            </a>
            
            <a 
              href="/savings-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">🐷</div>
              <h3 className="font-semibold text-gray-900">Savings Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate savings growth and goals</p>
            </a>
            
            <a 
              href="/401k-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">🏦</div>
              <h3 className="font-semibold text-gray-900">401k Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Plan 401k retirement contributions</p>
            </a>
            
            <a 
              href="/roth-ira-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">🏦</div>
              <h3 className="font-semibold text-gray-900">Roth IRA Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Compare Roth IRA vs Traditional IRA</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

