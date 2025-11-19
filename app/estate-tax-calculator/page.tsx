import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import EstateTaxCalculator from '@/components/Calculator/EstateTaxCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Estate Tax Calculator - Calculate Federal & State Estate Tax | AICalculator',
  description: 'Free estate tax calculator to estimate federal and state estate taxes. Calculate exemptions, deductions, marital transfer, charitable donations, and tax minimization strategies. Plan your estate effectively.',
  keywords: [
    'estate tax calculator',
    'federal estate tax calculator',
    'estate tax estimator',
    'estate tax exemption',
    'inheritance tax calculator',
    'marital deduction calculator',
    'charitable deduction estate',
    'portability estate tax',
    'state estate tax',
    'estate planning calculator',
    'trust planning calculator',
    'lifetime gift tax',
    'ILIT calculator',
    'GRAT calculator',
    'estate tax strategies',
    'estate tax 2024',
    'estate exemption 2024',
    'estate tax threshold',
    'net estate calculator',
    'beneficiary inheritance calculator'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Estate Tax Calculator - Federal & State Estate Tax Estimator',
    description: 'Calculate your estate tax liability with our comprehensive calculator. Estimate federal and state taxes, exemptions, deductions, and discover tax minimization strategies.',
    type: 'website',
    url: getUrl('/estate-tax-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('estate-tax'),
      width: 1200,
      height: 630,
      alt: 'Estate Tax Calculator - Calculate Federal & State Estate Tax'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estate Tax Calculator - Estimate Estate Tax & Plan Effectively',
    description: 'Calculate federal and state estate taxes, exemptions, and deductions. Discover tax minimization strategies to protect your legacy.',
    images: [getOgImage('estate-tax')],
    creator: '@aicalculator'
  },
  alternates: {
    canonical: getUrl('/estate-tax-calculator')
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

export default function EstateTaxCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/estate-tax-calculator'),
        name: 'Estate Tax Calculator',
        url: getUrl('/estate-tax-calculator'),
        description: 'Free online estate tax calculator to estimate federal and state estate taxes, calculate exemptions and deductions, and discover tax minimization strategies for effective estate planning.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Federal estate tax calculation (18%-40% progressive rates)',
          'State estate tax calculation (12 states)',
          'Federal exemption ($13.61M in 2024)',
          'State exemption calculation by state',
          'Unlimited marital deduction for US citizen spouse',
          'Unlimited charitable deduction',
          'Portability calculation (deceased spouse exemption)',
          'Prior taxable gifts integration',
          'Asset breakdown (real estate, investments, business, other)',
          'Debt and liability deduction',
          'Tax minimization strategies',
          'ILIT and GRAT planning',
          'Lifetime gifting analysis',
          'Net estate to heirs calculation'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/estate-tax-calculator'),
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
            name: 'Estate Tax Calculator',
            item: getUrl('/estate-tax-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/estate-tax-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the federal estate tax exemption for 2024?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The federal estate tax exemption for 2024 is $13.61 million per individual ($27.22 million for married couples using portability). This means estates valued below this amount are not subject to federal estate tax. The exemption is indexed for inflation annually. Estates exceeding this exemption are taxed at progressive rates from 18% to 40% on the amount above the exemption. It\'s important to note that this high exemption is temporary and scheduled to sunset after 2025, potentially reverting to around $7 million (adjusted for inflation) unless Congress extends it.'
            }
          },
          {
            '@type': 'Question',
            name: 'Which states have estate tax?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'As of 2024, twelve states and the District of Columbia have estate taxes: Connecticut ($13.61M exemption), Hawaii ($5.49M), Illinois ($4M), Maine ($6.41M), Maryland ($5M), Massachusetts ($2M), Minnesota ($3M), New York ($6.94M), Oregon ($1M), Rhode Island ($1.73M), Vermont ($5M), and Washington ($2.19M). Each state has its own exemption amount (shown in parentheses) and tax rates. Some states like Massachusetts and Oregon have relatively low exemptions, meaning even moderate estates may face state estate tax. Six additional states have inheritance taxes instead, which are paid by beneficiaries rather than the estate.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the marital deduction for estate tax?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The marital deduction allows an unlimited amount of assets to be transferred to a surviving spouse free of federal estate tax, provided the spouse is a U.S. citizen. This means that no matter how large the estate, transfers to a U.S. citizen spouse are completely tax-free. However, if the surviving spouse is not a U.S. citizen, the marital deduction is limited, and a Qualified Domestic Trust (QDOT) must be used to defer taxes. When the surviving spouse later dies, their estate (including inherited assets) may be subject to estate tax, though portability allows transferring any unused exemption from the first spouse.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does portability work for estate tax?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Portability allows a surviving spouse to use any unused portion of their deceased spouse\'s federal estate tax exemption. For example, if the first spouse dies in 2024 with a $5 million estate (using $5M of the $13.61M exemption), the surviving spouse can transfer the unused $8.61M to their own exemption, giving them a combined $22.22M exemption ($13.61M + $8.61M). To elect portability, the executor must file Form 706 (estate tax return) within 9 months of death (or 15 months with extension), even if no estate tax is owed. Portability only applies to federal estate tax, not state estate taxes.'
            }
          },
          {
            '@type': 'Question',
            name: 'What assets are included in the taxable estate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The taxable estate includes virtually all assets owned at death: real estate, bank accounts, investments (stocks, bonds, mutual funds), retirement accounts (401k, IRA), business interests, life insurance proceeds (if you own the policy), personal property (vehicles, jewelry, art, collectibles), and digital assets. Assets held in revocable trusts are included. The gross estate is reduced by debts, funeral expenses, estate administration costs, property passing to spouse (marital deduction), and charitable donations (charitable deduction). Assets in irrevocable trusts, life insurance owned by others or in ILITs, and properly structured gifts are generally excluded from the taxable estate.'
            }
          },
          {
            '@type': 'Question',
            name: 'How can I reduce my estate tax?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Key strategies to reduce estate tax include: 1) Annual gifting using the $18,000/person exclusion (2024), removing assets from your estate without using your lifetime exemption. 2) Irrevocable Life Insurance Trust (ILIT) to exclude life insurance from your estate. 3) Charitable donations providing unlimited deductions. 4) Grantor Retained Annuity Trust (GRAT) to transfer appreciating assets at reduced values. 5) Family Limited Partnerships (FLP) for valuation discounts. 6) Qualified Personal Residence Trust (QPRT) to transfer home at discounted value. 7) Using portability to maximize spousal exemptions. 8) Direct payments for medical expenses and tuition (unlimited, no gift tax). Consult an estate planning attorney for personalized strategies.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the difference between estate tax and inheritance tax?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Estate tax is paid by the estate itself before assets are distributed to beneficiaries, based on the total value of the deceased\'s estate. It\'s a tax on the right to transfer property at death. In contrast, inheritance tax is paid by individual beneficiaries who receive assets, based on their relationship to the deceased and the value they inherit. The federal government and 12 states plus DC impose estate taxes. Six states (Iowa, Kentucky, Maryland, Nebraska, New Jersey, Pennsylvania) have inheritance taxes, with Maryland being the only state with both. Inheritance tax rates and exemptions typically vary by relationship—spouses are usually exempt, while more distant relatives pay higher rates.'
            }
          },
          {
            '@type': 'Question',
            name: 'When do I need to file an estate tax return?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You must file federal Form 706 (estate tax return) if the gross estate exceeds the filing threshold, which equals the estate tax exemption ($13.61M in 2024). The return is due 9 months after death, with a possible 6-month extension available. You should also file even if no tax is owed if: 1) You want to elect portability to transfer unused exemption to surviving spouse, or 2) The estate includes hard-to-value assets requiring special valuation. State estate tax returns have separate filing requirements and deadlines. The executor or administrator is responsible for filing and paying any tax owed. Penalties for late filing can be severe—5% per month up to 25% of unpaid tax.'
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/estate-tax-calculator'),
        name: 'How to Calculate Your Estate Tax',
        description: 'Step-by-step guide to calculating federal and state estate tax liability and planning effective tax minimization strategies.',
        totalTime: 'PT10M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0'
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Estate Tax Calculator'
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Calculate Total Estate Value',
            text: 'Enter your total estate value or itemize assets by category: real estate, investments (stocks, bonds, mutual funds), business interests, and other assets (vehicles, personal property, collectibles). Include all assets you own or have an interest in at death. The calculator automatically sums itemized assets if you prefer detailed tracking.',
            url: getStepUrl('/estate-tax-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Debts and Expenses',
            text: 'Input outstanding debts and liabilities (mortgages, loans, credit cards) and estimated funeral and estate administration expenses. These amounts are deductible from the gross estate. Typical funeral and administration costs range from $15,000-$50,000 depending on estate complexity.',
            url: getStepUrl('/estate-tax-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Select Marital Status',
            text: 'Choose your marital status and indicate if your spouse is a U.S. citizen. If married to a U.S. citizen, you qualify for the unlimited marital deduction, meaning assets passing to your spouse are completely tax-free. This allows deferring estate tax until the second spouse dies.',
            url: getStepUrl('/estate-tax-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Add Charitable Donations',
            text: 'Enter any charitable donations or bequests. Assets left to qualified charities receive an unlimited charitable deduction, reducing taxable estate dollar-for-dollar. This is a powerful strategy to reduce estate tax while supporting causes you care about.',
            url: getStepUrl('/estate-tax-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Select Your State',
            text: 'Choose your state of residence. Twelve states plus DC have separate estate taxes with their own exemptions and rates. Your calculator results will show both federal and applicable state estate tax. If you own property in multiple states, you may face estate tax in multiple jurisdictions.',
            url: getStepUrl('/estate-tax-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Include Prior Gifts and Portability',
            text: 'Enter any prior taxable lifetime gifts (above annual exclusion amounts) that used your federal exemption. If widowed, enter your deceased spouse\'s unused exemption amount if you elected portability. Portability allows transferring up to $13.61M additional exemption from your deceased spouse.',
            url: getStepUrl('/estate-tax-calculator', 6)
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Review Results and Tax Strategies',
            text: 'Analyze your federal and state estate tax liability, effective tax rate, and net estate passing to heirs. Review personalized tax minimization strategies including marital transfers, charitable giving, lifetime gifting, ILITs, GRATs, and other advanced techniques. Consult an estate planning attorney to implement appropriate strategies for your situation.',
            url: getStepUrl('/estate-tax-calculator', 7)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/estate-tax-calculator'),
        headline: 'Estate Tax Calculator - Comprehensive Estate Planning Guide',
        description: 'Learn how to calculate federal and state estate taxes, understand exemptions and deductions, and implement effective tax minimization strategies to protect your legacy and maximize inheritance for your beneficiaries.',
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
        image: getOgImage('estate-tax'),
        articleBody: 'Comprehensive guide to understanding and calculating federal and state estate taxes, including exemptions, deductions, marital transfers, portability, charitable giving, and advanced tax minimization strategies like ILITs, GRATs, and family limited partnerships.'
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
        <h1 className="sr-only">Estate Tax Calculator - Calculate Federal and State Estate Tax with Exemptions and Deductions</h1>
        
        {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Estate Tax Calculator"
        calculatorUrl="/estate-tax-calculator"
      />

        {/* Calculator Component */}
        <EstateTaxCalculator />

        {/* Educational Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Estate Tax</h2>
            
            <p className="text-gray-700 mb-4">
              Estate tax, sometimes called the "death tax," is a federal tax on the transfer of property at death. Understanding estate tax is crucial for effective estate planning, especially for high-net-worth individuals. The{' '}
              <a 
                href="https://www.irs.gov/businesses/small-businesses-self-employed/estate-tax" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                IRS estate tax rules
              </a>
              {' '}can be complex, but proper planning can significantly reduce or eliminate estate tax liability.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2024 Federal Estate Tax Exemption</h3>
            <p className="text-gray-700 mb-4">
              The federal estate tax exemption for 2024 is **$13.61 million** per individual ($27.22 million for married couples using portability). This means that estates valued below this threshold owe no federal estate tax. The exemption is indexed annually for inflation.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <p className="text-sm text-gray-700">
                <strong>⚠️ Important:</strong> The current high exemption is temporary and scheduled to sunset after 2025. Without Congressional action, it will revert to approximately $7 million (adjusted for inflation), potentially exposing many more estates to federal estate tax.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Estate Tax Rates</h3>
            <p className="text-gray-700 mb-4">
              Federal estate tax uses progressive rates from **18% to 40%** on the amount exceeding the exemption. Here's the breakdown:
            </p>

            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taxable Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tax Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr><td className="px-6 py-4 text-sm text-gray-900">$0 - $10,000</td><td className="px-6 py-4 text-sm text-gray-900">18%</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">$10,000 - $20,000</td><td className="px-6 py-4 text-sm text-gray-900">20%</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">$20,000 - $40,000</td><td className="px-6 py-4 text-sm text-gray-900">22%</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">$500,000 - $750,000</td><td className="px-6 py-4 text-sm text-gray-900">34%</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">$750,000 - $1,000,000</td><td className="px-6 py-4 text-sm text-gray-900">37%</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">Over $1,000,000</td><td className="px-6 py-4 text-sm font-bold text-red-600">40%</td></tr>
              </tbody>
            </table>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">State Estate Taxes</h3>
            <p className="text-gray-700 mb-4">
              Twelve states and the District of Columbia impose their own estate taxes with varying exemptions and rates:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Connecticut:</strong> $13.61M exemption (matches federal), 12% top rate</li>
              <li><strong>Hawaii:</strong> $5.49M exemption, 20% top rate</li>
              <li><strong>Illinois:</strong> $4M exemption, 16% top rate</li>
              <li><strong>Maine:</strong> $6.41M exemption, 12% top rate</li>
              <li><strong>Maryland:</strong> $5M exemption, 16% top rate (also has inheritance tax)</li>
              <li><strong>Massachusetts:</strong> $2M exemption (lowest), 16% top rate</li>
              <li><strong>Minnesota:</strong> $3M exemption, 16% top rate</li>
              <li><strong>New York:</strong> $6.94M exemption, 16% top rate</li>
              <li><strong>Oregon:</strong> $1M exemption (lowest), 16% top rate</li>
              <li><strong>Rhode Island:</strong> $1.73M exemption, 16% top rate</li>
              <li><strong>Vermont:</strong> $5M exemption, 16% top rate</li>
              <li><strong>Washington:</strong> $2.19M exemption, 20% top rate</li>
            </ul>

            <p className="text-gray-700 mb-4">
              States with low exemptions like Massachusetts ($2M) and Oregon ($1M) can result in estate tax liability even for moderate estates. You can find more information on{' '}
              <a 
                href="https://www.taxfoundation.org/state-estate-tax-rates-2024/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                state estate tax rates
              </a>
              {' '}from the Tax Foundation.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Marital Deduction</h3>
            <p className="text-gray-700 mb-4">
              The unlimited marital deduction allows tax-free transfer of any amount of assets to a surviving spouse who is a U.S. citizen. This is one of the most powerful estate planning tools, allowing couples to defer estate tax until the second spouse dies.
            </p>

            <p className="text-gray-700 mb-4">
              **Key benefits:**
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
              <li>No limit on amount transferred tax-free</li>
              <li>Applies to lifetime gifts and transfers at death</li>
              <li>Combined with portability, provides up to $27.22M exemption for couples</li>
              <li>Simple will provisions can maximize marital deduction</li>
            </ul>

            <p className="text-gray-700 mb-4">
              **Important limitation:** If the surviving spouse is not a U.S. citizen, the marital deduction is limited unless assets are transferred to a Qualified Domestic Trust (QDOT). You may want to use our{' '}
              <a href="/tax-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Tax Calculator
              </a>
              {' '}to understand income tax implications during estate administration.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Portability</h3>
            <p className="text-gray-700 mb-4">
              Portability allows a surviving spouse to use any unused portion of their deceased spouse's federal estate tax exemption. This effectively doubles the exemption for married couples to $27.22 million in 2024.
            </p>

            <p className="text-gray-700 mb-4">
              **How it works:**
            </p>
            <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
              <li>First spouse dies with estate below exemption ($13.61M in 2024)</li>
              <li>Executor files Form 706 electing portability (even if no tax owed)</li>
              <li>Unused exemption transfers to surviving spouse</li>
              <li>Surviving spouse now has combined exemption (their own + deceased spouse's unused)</li>
              <li>When surviving spouse dies, combined exemption applies to their estate</li>
            </ol>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="text-sm text-gray-700">
                <strong>💡 Pro Tip:</strong> You must file Form 706 within 9 months of death (or 15 months with extension) to elect portability. Miss this deadline and you lose the ability to transfer the unused exemption forever.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Charitable Deduction</h3>
            <p className="text-gray-700 mb-4">
              Assets left to qualified charitable organizations receive an unlimited charitable deduction, reducing your taxable estate dollar-for-dollar. This is an excellent strategy to reduce estate tax while supporting causes you care about.
            </p>

            <p className="text-gray-700 mb-4">
              **Popular charitable giving strategies:**
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Outright bequest:</strong> Leave assets directly to charity in your will</li>
              <li><strong>Charitable remainder trust (CRT):</strong> Provides income to you or beneficiaries, remainder to charity</li>
              <li><strong>Charitable lead trust (CLT):</strong> Provides income to charity for term, remainder to heirs</li>
              <li><strong>Private foundation:</strong> Create your own charitable organization</li>
              <li><strong>Donor-advised fund:</strong> Contribute now, recommend grants later</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Estate Tax Minimization Strategies</h3>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Annual Gifting</h4>
            <p className="text-gray-700 mb-4">
              The annual gift tax exclusion allows you to give $18,000 per recipient in 2024 ($36,000 per couple) without using any of your lifetime exemption or filing a gift tax return. A couple with three children and their spouses could gift $216,000 annually ($18,000 × 6 recipients × 2 donors), removing substantial assets from their estate.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Irrevocable Life Insurance Trust (ILIT)</h4>
            <p className="text-gray-700 mb-4">
              If you own a life insurance policy, the death benefit is included in your taxable estate. An ILIT removes the policy from your estate while still providing benefits to your heirs. The trust owns the policy, pays premiums (funded by your annual gift tax exclusion gifts), and distributes death benefits to beneficiaries estate-tax-free.
            </p>

            <p className="text-gray-700 mb-4">
              **Potential savings:** A $5 million life insurance policy could save $2 million in estate tax (40% of $5M) if properly structured in an ILIT.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Grantor Retained Annuity Trust (GRAT)</h4>
            <p className="text-gray-700 mb-4">
              A GRAT allows you to transfer appreciating assets to heirs at a reduced gift tax value. You transfer assets to the trust, receive annuity payments for a term (typically 2-10 years), and remaining assets pass to beneficiaries. If assets appreciate above the IRS assumed rate (Section 7520 rate), the excess passes to heirs tax-free.
            </p>

            <p className="text-gray-700 mb-4">
              **Example:** Transfer $10M in stock to a 5-year GRAT. You receive $2.2M/year (total $11M). Stock grows to $20M. Heirs receive $9M estate-tax-free ($20M - $11M annuity).
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Family Limited Partnership (FLP)</h4>
            <p className="text-gray-700 mb-4">
              FLPs allow you to transfer assets to family members at discounted values due to lack of control and marketability. You contribute assets (real estate, business interests) to the partnership, retain general partner control, and gift limited partnership interests to heirs at 20-40% valuation discounts.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Qualified Personal Residence Trust (QPRT)</h4>
            <p className="text-gray-700 mb-4">
              A QPRT allows you to transfer your home to heirs at a reduced gift tax value while continuing to live there for a specified term. After the term, the home passes to beneficiaries. If you outlive the term, the home is removed from your estate. You can continue living there by paying fair market rent to the new owners (further reducing your estate).
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Assets Are Included in the Taxable Estate?</h3>
            <p className="text-gray-700 mb-4">
              The taxable estate includes virtually everything you own at death:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
              <li><strong>Real estate:</strong> Primary residence, vacation homes, rental properties, land</li>
              <li><strong>Financial accounts:</strong> Bank accounts, brokerage accounts, money market funds</li>
              <li><strong>Investments:</strong> Stocks, bonds, mutual funds, hedge funds, private equity</li>
              <li><strong>Retirement accounts:</strong> 401(k), IRA, pension benefits (consider our{' '}
                <a href="/401k-calculator" className="text-blue-600 hover:text-blue-800 underline">
                  401(k) Calculator
                </a>
                {' '}and{' '}
                <a href="/ira-calculator" className="text-blue-600 hover:text-blue-800 underline">
                  IRA Calculator
                </a>
                )</li>
              <li><strong>Business interests:</strong> Sole proprietorships, partnerships, S-corp/C-corp stock</li>
              <li><strong>Life insurance:</strong> Death benefits from policies you own</li>
              <li><strong>Personal property:</strong> Vehicles, jewelry, art, collectibles, furniture</li>
              <li><strong>Digital assets:</strong> Cryptocurrency, domain names, online businesses</li>
              <li><strong>Receivables:</strong> Notes owed to you, trust interests, annuities</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Estate Tax vs. Inheritance Tax</h3>
            <p className="text-gray-700 mb-4">
              It's important to distinguish between estate tax and inheritance tax:
            </p>

            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aspect</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estate Tax</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inheritance Tax</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Who pays?</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Estate (before distribution)</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Beneficiaries (after receiving assets)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Based on</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Total estate value</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Relationship to deceased & amount inherited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Federal tax?</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Yes</td>
                  <td className="px-6 py-4 text-sm text-gray-900">No</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">States with tax</td>
                  <td className="px-6 py-4 text-sm text-gray-900">12 states + DC</td>
                  <td className="px-6 py-4 text-sm text-gray-900">6 states (IA, KY, MD, NE, NJ, PA)</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">When to File Estate Tax Returns</h3>
            <p className="text-gray-700 mb-4">
              You must file federal Form 706 if the gross estate exceeds $13.61 million in 2024. The return is due 9 months after death, with a possible 6-month extension. Key filing considerations:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Elect portability:</strong> File even if no tax owed to transfer unused exemption to spouse</li>
              <li><strong>Special valuation:</strong> File if using alternate valuation date or special use valuation</li>
              <li><strong>State returns:</strong> Separate state estate tax returns may be required with different deadlines</li>
              <li><strong>Generation-skipping tax:</strong> Additional Form 706-GS may be required</li>
              <li><strong>Penalties:</strong> Late filing incurs 5% penalty per month (up to 25%) plus interest</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Estate Planning for Different Net Worth Levels</h3>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">$2-5 Million (State Estate Tax Exposure)</h4>
            <p className="text-gray-700 mb-4">
              If you live in a state with low exemptions (MA, OR, MN, RI), focus on basic strategies: maximize annual gifting, use marital deduction, consider ILIT for life insurance, and potentially relocate to a no-estate-tax state. Our{' '}
              <a href="/retirement-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Retirement Calculator
              </a>
              {' '}can help assess if relocating makes financial sense.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">$5-15 Million (Near Federal Exemption)</h4>
            <p className="text-gray-700 mb-4">
              With the exemption scheduled to drop after 2025, consider "use it or lose it" gifting now. Strategies: maximize lifetime gifts, establish ILITs, create GRATs for appreciating assets, and consider charitable remainder trusts. Track with our{' '}
              <a href="/investment-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Investment Calculator
              </a>
              {' '}to project future estate growth.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">$15-50 Million (Significant Tax Exposure)</h4>
            <p className="text-gray-700 mb-4">
              Aggressive planning essential. Implement: FLPs for valuation discounts, multiple GRATs, intentionally defective grantor trusts (IDGTs), private foundations or donor-advised funds, and sophisticated life insurance planning. Annual planning reviews critical.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">$50 Million+ (Ultra-High Net Worth)</h4>
            <p className="text-gray-700 mb-4">
              Comprehensive multi-generational planning required. Strategies: dynasty trusts for multiple generations, private placement life insurance, offshore trusts (with caution), family offices for coordinated planning, and charitable foundations for legacy and tax benefits. Work with team of estate attorney, CPA, and wealth advisor.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common Estate Planning Mistakes</h3>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Not Planning Until Too Late</h4>
              <p className="text-red-800">
                Many people delay estate planning until serious illness or advanced age, when options are limited and tax benefits may be lost. Start planning now, especially if the exemption may drop in 2026.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Failing to File for Portability</h4>
              <p className="text-red-800">
                Missing the Form 706 filing deadline means losing the ability to transfer a deceased spouse's unused exemption, potentially costing millions in unnecessary estate tax.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Forgetting State Estate Tax</h4>
              <p className="text-red-800">
                Even if your estate is below the federal exemption, you may owe substantial state estate tax if you live in one of the 12 states with estate tax, especially those with low exemptions.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Owning Life Insurance Personally</h4>
              <p className="text-red-800">
                If you own your life insurance policy, the death benefit is included in your taxable estate. A $5M policy could trigger $2M in unnecessary estate tax. Use an ILIT instead.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Not Updating Estate Plan</h4>
              <p className="text-red-800">
                Estate plans should be reviewed every 3-5 years or after major life events (marriage, divorce, birth, death, significant wealth change, relocation). Tax laws change frequently—your 20-year-old plan may be obsolete.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Using This Estate Tax Calculator</h3>
            <p className="text-gray-700 mb-4">
              Our estate tax calculator provides comprehensive analysis of your federal and state estate tax liability. Key features:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Itemized assets:</strong> Break down estate by category or enter total value</li>
              <li><strong>Automatic calculations:</strong> Federal and state tax computed using actual tax tables</li>
              <li><strong>Deductions:</strong> Marital, charitable, debts, and funeral expenses automatically applied</li>
              <li><strong>Portability:</strong> Factor in deceased spouse's unused exemption</li>
              <li><strong>Tax strategies:</strong> Personalized recommendations with savings estimates</li>
              <li><strong>What-if scenarios:</strong> Test impact of charitable giving, lifetime gifts, etc.</li>
            </ul>

            <p className="text-gray-700 mb-4">
              For related calculations, explore our{' '}
              <a href="/capital-gains-tax-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Capital Gains Tax Calculator
              </a>
              {' '}for investment tax planning and{' '}
              <a href="/property-tax-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Property Tax Calculator
              </a>
              {' '}for real estate tax estimates.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="text-sm text-gray-700">
                <strong>💡 Disclaimer:</strong> This calculator provides estimates for planning purposes. Actual estate tax liability may vary based on specific circumstances, asset valuations, and applicable state laws. Consult a qualified estate planning attorney and CPA for personalized advice.
              </p>
            </div>
          </div>
        </section>

        {/* Related Calculators Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a 
              href="/capital-gains-tax-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900">Capital Gains Tax Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate investment gains tax</p>
            </a>
            
            <a 
              href="/tax-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">💼</div>
              <h3 className="font-semibold text-gray-900">Income Tax Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Estimate federal and state income tax</p>
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
              href="/investment-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900">Investment Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Project investment growth</p>
            </a>

            <a 
              href="/401k-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900">401(k) Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate retirement savings with 401(k)</p>
            </a>
            
            <a 
              href="/ira-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">🏦</div>
              <h3 className="font-semibold text-gray-900">IRA Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Compare Traditional vs Roth IRA</p>
            </a>
            
            <a 
              href="/property-tax-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">🏛️</div>
              <h3 className="font-semibold text-gray-900">Property Tax Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Estimate real estate property tax</p>
            </a>
            
            <a 
              href="/social-security-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">👴</div>
              <h3 className="font-semibold text-gray-900">Social Security Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Estimate Social Security benefits</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

