import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import VATCalculator from '@/components/Calculator/VATCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'VAT Calculator - Add or Remove VAT for Any Country | Free VAT Tool',
  description: 'Free VAT calculator for UK, EU, and worldwide. Calculate VAT inclusive/exclusive prices, support multiple countries, batch calculations, and different VAT rates. Instant results for business and personal use.',
  keywords: [
    'vat calculator',
    'vat calculator uk',
    'vat calculator reverse',
    'add vat calculator',
    'remove vat calculator',
    'vat inclusive calculator',
    'vat exclusive calculator',
    'eu vat calculator',
    'gst calculator',
    'sales tax calculator',
    'value added tax calculator',
    'vat rate calculator',
    'hmrc vat calculator',
    'reverse vat calculator',
    'vat calculation formula',
    'calculate vat online',
    'business vat calculator',
    'vat refund calculator',
    'vat by country',
    'multiple vat rates calculator'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'VAT Calculator - Calculate VAT for Any Country',
    description: 'Free online VAT calculator. Add or remove VAT, support UK, EU, and 15+ countries. Calculate VAT inclusive/exclusive prices instantly.',
    type: 'website',
    url: getUrl('/vat-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('vat'),
      width: 1200,
      height: 630,
      alt: 'VAT Calculator - Add or Remove VAT for Any Country'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VAT Calculator - Instant VAT Calculation for Business',
    description: 'Calculate VAT for UK, EU, and 15+ countries. Add/remove VAT, batch calculations, multiple rates. Free online tool.',
    images: [getOgImage('vat')],
    creator: '@aicalculator'
  },
  alternates: {
    canonical: getUrl('/vat-calculator')
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

export default function VATCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/vat-calculator'),
        name: 'VAT Calculator',
        url: getUrl('/vat-calculator'),
        description: 'Free online VAT calculator to add or remove Value Added Tax (VAT) for any country. Calculate VAT-inclusive and VAT-exclusive prices, support multiple countries including UK, EU members, Canada, Australia, and more.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Add VAT to net amount (calculate gross from net)',
          'Remove VAT from gross amount (calculate net from gross)',
          'Support 18+ countries/regions',
          'UK VAT (20% standard, 5% reduced, 0% zero-rated)',
          'EU VAT rates (Germany, France, Spain, Italy, Netherlands, etc.)',
          'Canada GST/HST calculator',
          'Australia/New Zealand GST calculator',
          'Multiple VAT rates (standard, reduced, super-reduced)',
          'Batch calculation for multiple items',
          'Different VAT rates per item',
          'Preset rate categories (standard, food, books, etc.)',
          'Real-time calculation',
          'Formula explanation',
          'Export and share results'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/vat-calculator'),
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
            name: 'VAT Calculator',
            item: getUrl('/vat-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/vat-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I calculate VAT?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To add VAT: multiply the net amount by the VAT rate (e.g., 20% = 0.20), then add to the net amount. Formula: Gross = Net × (1 + VAT rate). To remove VAT: divide the gross amount by (1 + VAT rate). Formula: Net = Gross / (1 + VAT rate). For example, with 20% VAT: £100 net becomes £120 gross (£100 × 1.20). Or £120 gross becomes £100 net (£120 / 1.20).'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the UK VAT rate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The UK has three VAT rates: Standard rate 20% (most goods and services), Reduced rate 5% (domestic fuel, children\'s car seats, home energy), and Zero rate 0% (most food, children\'s clothes, books, newspapers, prescription medicines). Some items are VAT-exempt (insurance, education, health services). The standard 20% rate applies to most business transactions.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do I remove VAT from a price?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To remove VAT (calculate net from gross): divide the VAT-inclusive price by (1 + VAT rate as decimal). For 20% VAT: Net = Gross / 1.20. For example, a £120 gross price contains £20 VAT (£120 / 1.20 = £100 net, VAT = £120 - £100 = £20). This is also called "reverse VAT calculation" or "VAT exclusive calculation." Use our calculator\'s "Remove VAT" mode for instant results.'
            }
          },
          {
            '@type': 'Question',
            name: 'What countries use VAT?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Over 170 countries use VAT or similar consumption taxes. Major regions include: All 27 EU member states (rates 17-27%), United Kingdom (20%), Canada (5% GST + provincial taxes), Australia (10% GST), New Zealand (15% GST), Japan (10%), Switzerland (8.1%), Norway (25%), Singapore (9%). The USA does not have VAT but uses sales tax instead. VAT rates and rules vary significantly by country—some have multiple rates for different product categories.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the difference between VAT inclusive and VAT exclusive?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'VAT exclusive (net price) is the price before VAT is added—this is what businesses pay suppliers and what they report as revenue. VAT inclusive (gross price) is the final price including VAT—this is what customers pay. For example with 20% VAT: Net price £100 (VAT exclusive) → Customer pays £120 (VAT inclusive = £100 + £20 VAT). B2B transactions often quote net prices, while B2C (retail) prices are usually gross (VAT inclusive). Businesses must track both amounts for VAT returns.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I claim VAT back?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'VAT-registered businesses can reclaim VAT on eligible business purchases (input VAT) from the tax authority. You submit periodic VAT returns showing: Output VAT (VAT charged to customers) minus Input VAT (VAT paid on purchases) = VAT owed or refund due. Consumers generally cannot reclaim VAT except for specific cases like tourists leaving the EU (VAT refund scheme), medical equipment for disabled persons, or business travel expenses. Keep all VAT invoices as proof for claims. VAT must be reclaimed within time limits (typically 4 years in UK).'
            }
          },
          {
            '@type': 'Question',
            name: 'How do VAT rates differ across EU countries?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'EU countries set their own VAT rates within EU rules (minimum 15% standard rate). Standard rates range from 17% (Luxembourg) to 27% (Hungary). Most countries have multiple rates: Standard (17-27%), Reduced (5-13.5% for food, books, hotels), Super-reduced (2.1-4.8% for essentials), Zero (0%). Examples: Germany 19%/7%, France 20%/10%/5.5%/2.1%, Spain 21%/10%/4%, Italy 22%/10%/5%/4%, UK 20%/5%/0%. Digital services (e-books, online courses) use customer\'s country rate since 2015. Cross-border VAT rules are complex—consult local tax authorities.'
            }
          },
          {
            '@type': 'Question',
            name: 'Do I need to register for VAT?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'VAT registration requirements vary by country. In the UK: mandatory if your taxable turnover exceeds £90,000 (2024/25 threshold) in any 12-month period, or you expect to exceed it in the next 30 days. You can voluntarily register below the threshold to reclaim VAT on purchases. In the EU: each country sets its own threshold (€0-€85,000). Cross-border e-commerce has special rules—€10,000 annual threshold for distance sales before registering in customer\'s country, or use EU One-Stop Shop (OSS) scheme. Late registration penalties apply—register promptly when you reach the threshold.'
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/vat-calculator'),
        name: 'How to Calculate VAT for Your Business',
        description: 'Step-by-step guide to calculating Value Added Tax (VAT) for business transactions, including adding and removing VAT from prices.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0'
        },
        tool: {
          '@type': 'HowToTool',
          name: 'VAT Calculator'
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Calculation Mode',
            text: 'Select whether you want to add VAT (calculate gross from net) or remove VAT (calculate net from gross). Use "Add VAT" when you have a net price and need to know the customer price. Use "Remove VAT" when you have a customer price and need to extract the net amount for accounting.',
            url: getStepUrl('/vat-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Select Your Country',
            text: 'Choose your country or region from the dropdown. The calculator supports UK, EU countries (Germany, France, Spain, Italy, etc.), Canada, Australia, New Zealand, Switzerland, Norway, Japan, Singapore, and more. The standard VAT/GST rate for your country will be automatically selected.',
            url: getStepUrl('/vat-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Choose VAT Rate',
            text: 'Select the appropriate VAT rate category (Standard, Reduced, Super-reduced, Zero-rated) or enter a custom rate. Different rates apply to different products—for example, food and books often have reduced rates while luxury goods use standard rates.',
            url: getStepUrl('/vat-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Enter Amount',
            text: 'Input the amount you want to calculate. If adding VAT, enter the net amount (price before VAT). If removing VAT, enter the gross amount (price including VAT). You can enter any currency—the calculator works with any numeric value.',
            url: getStepUrl('/vat-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Add Multiple Items (Optional)',
            text: 'For batch calculations, click "Add Item" to enter multiple items with different amounts and VAT rates. This is useful for invoices with mixed rate items (e.g., standard rate services + reduced rate products). Name each item and assign the appropriate VAT rate.',
            url: getStepUrl('/vat-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Calculate and Review Results',
            text: 'Click "Calculate VAT" to see the breakdown showing: net amount (VAT exclusive), VAT amount, and gross amount (VAT inclusive). For multiple items, you\'ll see individual calculations plus totals. The calculator also displays the formula used so you can understand the calculation.',
            url: getStepUrl('/vat-calculator', 6)
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Export or Share Results',
            text: 'Save your calculation as an image for records, print it for physical documentation, or share the link with colleagues or clients. The calculation URL can be bookmarked for future reference with the same parameters.',
            url: getStepUrl('/vat-calculator', 7)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/vat-calculator'),
        headline: 'VAT Calculator - Complete Guide to Value Added Tax Calculation',
        description: 'Learn how to calculate VAT for any country, understand VAT rates, add or remove VAT from prices, and manage VAT for your business with our comprehensive guide and free calculator.',
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
        image: getOgImage('vat'),
        articleBody: 'Comprehensive guide to calculating Value Added Tax (VAT) for businesses and individuals, including formulas for adding and removing VAT, VAT rates by country, registration requirements, reclaiming VAT, and international VAT rules for cross-border transactions.'
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
        <h1 className="sr-only">VAT Calculator - Calculate Value Added Tax for Any Country</h1>
        
        {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="VAT Calculator"
        calculatorUrl="/vat-calculator"
      />

        {/* Calculator Component */}
        <VATCalculator />

        {/* Educational Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding VAT (Value Added Tax)</h2>
            
            <p className="text-gray-700 mb-4">
              Value Added Tax (VAT) is a consumption tax levied on goods and services at each stage of production and distribution. Unlike sales tax (which is only charged at final sale), VAT is collected incrementally throughout the supply chain. Understanding VAT is essential for businesses operating in{' '}
              <a 
                href="https://www.gov.uk/vat-rates" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                the UK
              </a>
              ,{' '}
              <a 
                href="https://taxation-customs.ec.europa.eu/taxation/vat_en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                the European Union
              </a>
              , or any of the 170+ countries that use VAT systems.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How VAT Works</h3>
            <p className="text-gray-700 mb-4">
              VAT operates on a chain system where:
            </p>
            <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Businesses charge VAT to customers</strong> (Output VAT) on taxable goods and services</li>
              <li><strong>Businesses pay VAT to suppliers</strong> (Input VAT) on their purchases</li>
              <li><strong>Businesses pay the difference</strong> (Output VAT - Input VAT) to tax authorities</li>
              <li><strong>The final consumer</strong> bears the full VAT cost, as they cannot reclaim it</li>
            </ol>

            <p className="text-gray-700 mb-4">
              <strong>Example:</strong> A manufacturer buys materials for £1,000 + £200 VAT (20%). They sell the finished product for £2,000 + £400 VAT. They pay HMRC: £400 (output) - £200 (input) = £200. The manufacturer recoups the VAT they paid on materials and passes the tax burden along the chain.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">UK VAT Rates</h3>
            <p className="text-gray-700 mb-4">
              The UK has three main VAT rates:
            </p>

            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applies To</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Standard Rate</td>
                  <td className="px-6 py-4 text-gray-900">20%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Most goods and services (default rate)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Reduced Rate</td>
                  <td className="px-6 py-4 text-gray-900">5%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Domestic fuel, children's car seats, home energy, sanitary products</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Zero Rate</td>
                  <td className="px-6 py-4 text-gray-900">0%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Most food, children's clothes, books, newspapers, prescription medicines</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Exempt</td>
                  <td className="px-6 py-4 text-gray-900">-</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Insurance, education, health services, postal services, finance</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="text-sm text-gray-700">
                <strong>💡 Important:</strong> Zero-rated goods still allow VAT reclaim on inputs (good for businesses), while exempt goods do not. This makes zero-rating more favorable for suppliers than exemption.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">VAT Rates by Country</h3>
            <p className="text-gray-700 mb-4">
              VAT rates vary significantly worldwide. Here are standard rates for major economies:
            </p>

            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country/Region</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Standard Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reduced Rates</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr><td className="px-6 py-4 text-sm text-gray-900">United Kingdom</td><td className="px-6 py-4 text-sm text-gray-900">20%</td><td className="px-6 py-4 text-sm text-gray-600">5%, 0%</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">Germany</td><td className="px-6 py-4 text-sm text-gray-900">19%</td><td className="px-6 py-4 text-sm text-gray-600">7%</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">France</td><td className="px-6 py-4 text-sm text-gray-900">20%</td><td className="px-6 py-4 text-sm text-gray-600">10%, 5.5%, 2.1%</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">Spain</td><td className="px-6 py-4 text-sm text-gray-900">21%</td><td className="px-6 py-4 text-sm text-gray-600">10%, 4%</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">Italy</td><td className="px-6 py-4 text-sm text-gray-900">22%</td><td className="px-6 py-4 text-sm text-gray-600">10%, 5%, 4%</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">Sweden</td><td className="px-6 py-4 text-sm text-gray-900">25%</td><td className="px-6 py-4 text-sm text-gray-600">12%, 6%</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">Denmark</td><td className="px-6 py-4 text-sm text-gray-900">25%</td><td className="px-6 py-4 text-sm text-gray-600">None</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">Canada (GST)</td><td className="px-6 py-4 text-sm text-gray-900">5%</td><td className="px-6 py-4 text-sm text-gray-600">+ Provincial taxes</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">Australia (GST)</td><td className="px-6 py-4 text-sm text-gray-900">10%</td><td className="px-6 py-4 text-sm text-gray-600">None</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">New Zealand (GST)</td><td className="px-6 py-4 text-sm text-gray-900">15%</td><td className="px-6 py-4 text-sm text-gray-600">None</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">Switzerland</td><td className="px-6 py-4 text-sm text-gray-900">8.1%</td><td className="px-6 py-4 text-sm text-gray-600">2.6%, 3.8%</td></tr>
                <tr><td className="px-6 py-4 text-sm text-gray-900">Japan</td><td className="px-6 py-4 text-sm text-gray-900">10%</td><td className="px-6 py-4 text-sm text-gray-600">8%</td></tr>
              </tbody>
            </table>

            <p className="text-gray-700 mb-4">
              The{' '}
              <a 
                href="https://www.oecd.org/tax/consumption/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                OECD reports
              </a>
              {' '}that over 170 countries worldwide now operate VAT or similar systems. The European Union requires member states to maintain a minimum standard rate of 15%, though many exceed this significantly.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">VAT Calculation Formulas</h3>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Adding VAT (Net to Gross)</h4>
            <p className="text-gray-700 mb-4">
              Use this when you have a net (VAT-exclusive) price and need to calculate the gross (VAT-inclusive) price that customers pay:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="font-mono text-sm mb-2">VAT Amount = Net Amount × (VAT Rate / 100)</p>
              <p className="font-mono text-sm mb-2">Gross Amount = Net Amount + VAT Amount</p>
              <p className="font-mono text-sm mb-4">Or simplified: Gross Amount = Net Amount × (1 + VAT Rate / 100)</p>
              <p className="text-sm text-gray-700"><strong>Example (20% VAT):</strong></p>
              <p className="text-sm text-gray-700">Net: £100</p>
              <p className="text-sm text-gray-700">VAT: £100 × 0.20 = £20</p>
              <p className="text-sm text-green-600 font-semibold">Gross: £100 + £20 = £120</p>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Removing VAT (Gross to Net)</h4>
            <p className="text-gray-700 mb-4">
              Use this for reverse VAT calculation when you have a VAT-inclusive price and need to extract the net amount:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="font-mono text-sm mb-2">Net Amount = Gross Amount / (1 + VAT Rate / 100)</p>
              <p className="font-mono text-sm mb-4">VAT Amount = Gross Amount - Net Amount</p>
              <p className="text-sm text-gray-700"><strong>Example (20% VAT):</strong></p>
              <p className="text-sm text-gray-700">Gross: £120</p>
              <p className="text-sm text-gray-700">Net: £120 / 1.20 = £100</p>
              <p className="text-sm text-orange-600 font-semibold">VAT: £120 - £100 = £20</p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">VAT Registration Requirements</h3>
            <p className="text-gray-700 mb-4">
              Businesses must register for VAT when their taxable turnover exceeds certain thresholds:
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">UK VAT Registration</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Mandatory threshold:</strong> £90,000 taxable turnover in any 12-month period (2024/25)</li>
              <li><strong>Voluntary registration:</strong> Can register below threshold to reclaim input VAT</li>
              <li><strong>Timeline:</strong> Must register within 30 days of exceeding threshold</li>
              <li><strong>Deregistration:</strong> Can deregister if turnover falls below £88,000 (2024/25)</li>
              <li><strong>Penalties:</strong> Late registration: up to 15% of VAT due, plus interest</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">EU VAT Registration</h4>
            <p className="text-gray-700 mb-4">
              Each EU country sets its own registration threshold, ranging from €0 (Germany, Netherlands) to €85,000 (Ireland, UK historically). Cross-border sellers face additional rules:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>€10,000 threshold:</strong> For distance sales to other EU countries before registration required in destination country</li>
              <li><strong>OSS (One Stop Shop):</strong> Register once in your country for all EU sales (simplified system since 2021)</li>
              <li><strong>Digital services:</strong> Subject to destination country VAT rate regardless of seller location</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Reclaiming VAT</h3>
            <p className="text-gray-700 mb-4">
              VAT-registered businesses can reclaim VAT on eligible purchases through periodic VAT returns:
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What You Can Reclaim</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
              <li>Goods and services used exclusively for business</li>
              <li>Business travel and accommodation</li>
              <li>Business vehicles (commercial vehicles: full VAT; cars: limited)</li>
              <li>Office supplies, equipment, and furniture</li>
              <li>Professional fees (legal, accounting, consulting)</li>
              <li>Marketing and advertising expenses</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What You Cannot Reclaim</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
              <li>Client entertainment (no VAT reclaim in UK)</li>
              <li>Personal/private use items</li>
              <li>Purchases made before VAT registration</li>
              <li>Goods received free of charge</li>
              <li>Blocked categories (cars purchased for employees, except if used 100% for business)</li>
            </ul>

            <p className="text-gray-700 mb-4">
              For business expense calculations that include VAT considerations, check our{' '}
              <a href="/sales-tax-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Sales Tax Calculator
              </a>
              {' '}for US-based businesses, or our{' '}
              <a href="/tax-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Income Tax Calculator
              </a>
              {' '}for overall tax planning.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">VAT Returns and Compliance</h3>
            <p className="text-gray-700 mb-4">
              VAT-registered businesses must file periodic VAT returns (typically quarterly) and pay the balance owed to tax authorities:
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">VAT Return Process</h4>
            <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Calculate Output VAT:</strong> Total VAT charged to customers on sales</li>
              <li><strong>Calculate Input VAT:</strong> Total VAT paid on eligible business purchases</li>
              <li><strong>Calculate Balance:</strong> Output VAT - Input VAT = Amount owed (or refund)</li>
              <li><strong>File Return:</strong> Submit online (UK: Making Tax Digital mandatory since 2022)</li>
              <li><strong>Pay or Reclaim:</strong> Payment due within 1 month and 7 days of period end</li>
            </ol>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Making Tax Digital (MTD)</h4>
            <p className="text-gray-700 mb-4">
              The UK requires all VAT-registered businesses to use compatible accounting software to keep digital records and submit VAT returns. Key requirements:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
              <li>Use MTD-compatible software for VAT record-keeping</li>
              <li>Maintain digital links between software and VAT return submissions</li>
              <li>Keep digital records for 6 years</li>
              <li>Submit returns through approved software only (no manual entry on HMRC portal)</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">International VAT Rules</h3>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Cross-Border B2B Transactions</h4>
            <p className="text-gray-700 mb-4">
              Business-to-business sales across borders follow the "reverse charge" mechanism:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Seller:</strong> Invoices without VAT (0% rate), states "reverse charge applies"</li>
              <li><strong>Buyer:</strong> Self-accounts for VAT in their country at local rate</li>
              <li><strong>Both parties:</strong> Must have valid VAT numbers and verify them (EU: VIES system)</li>
              <li><strong>Benefit:</strong> Avoids double taxation and cash flow issues</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Cross-Border B2C Transactions</h4>
            <p className="text-gray-700 mb-4">
              Business-to-consumer sales have different rules:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Within EU:</strong> Use OSS to charge destination country VAT rate</li>
              <li><strong>Goods:</strong> VAT charged where goods end up (destination principle)</li>
              <li><strong>Services:</strong> Generally taxed where customer is located</li>
              <li><strong>Digital services:</strong> Always charged at customer's country rate (since 2015)</li>
              <li><strong>Imports from outside EU:</strong> VAT collected at customs (or by marketplace)</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Marketplace VAT Collection</h4>
            <p className="text-gray-700 mb-4">
              Since July 2021, online marketplaces (Amazon, eBay, Etsy) are responsible for collecting VAT on low-value goods (≤€150) sold through their platforms by non-EU sellers to EU customers. This simplifies compliance for small sellers but requires marketplace operators to register for VAT in EU countries.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">VAT vs Sales Tax</h3>
            <p className="text-gray-700 mb-4">
              While VAT and sales tax both tax consumption, they work differently:
            </p>

            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aspect</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">VAT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales Tax (USA)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Collection point</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Every stage of supply chain</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Final sale only</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Business impact</td>
                  <td className="px-6 py-4 text-sm text-gray-900">No net cost (claim back input VAT)</td>
                  <td className="px-6 py-4 text-sm text-gray-900">No cost (exempt on wholesale)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Administration</td>
                  <td className="px-6 py-4 text-sm text-gray-900">More complex (track input/output)</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Simpler (charge at sale only)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Revenue efficiency</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Higher (collected at multiple points)</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Lower (easier to evade)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Geographic scope</td>
                  <td className="px-6 py-4 text-sm text-gray-900">170+ countries</td>
                  <td className="px-6 py-4 text-sm text-gray-900">USA, few others</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common VAT Mistakes to Avoid</h3>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Not Registering on Time</h4>
              <p className="text-red-800">
                Exceeding the VAT threshold without registering leads to hefty penalties (up to 15% of VAT owed) plus interest. Monitor turnover closely and register proactively when approaching the threshold.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Using Wrong VAT Rate</h4>
              <p className="text-red-800">
                Applying standard rate when reduced or zero rate applies (or vice versa) causes under/over-charging. Always verify the correct rate for your products—HMRC publishes detailed guidance and you can call their helpline for complex cases.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Missing VAT Invoices</h4>
              <p className="text-red-800">
                You cannot reclaim VAT without a valid VAT invoice showing: seller's VAT number, invoice date, unique invoice number, net amount, VAT rate, VAT amount. Missing any element = no reclaim. Keep all VAT invoices for 6 years.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Late VAT Returns</h4>
              <p className="text-red-800">
                Late filing or payment triggers surcharge liability (escalating penalties for repeat late submissions). Set calendar reminders and use accounting software with automatic alerts. Late filing penalties: £200+ depending on delay and turnover.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Using This VAT Calculator</h3>
            <p className="text-gray-700 mb-4">
              Our VAT calculator simplifies VAT calculations for businesses and individuals:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Add VAT:</strong> Calculate customer price from net amount (for pricing products)</li>
              <li><strong>Remove VAT:</strong> Extract net amount from customer price (for accounting/reporting)</li>
              <li><strong>18+ countries:</strong> UK, EU members, Canada, Australia, New Zealand, Switzerland, Japan, Singapore, and more</li>
              <li><strong>Multiple rates:</strong> Standard, reduced, super-reduced, zero-rated—all with presets</li>
              <li><strong>Batch calculations:</strong> Add multiple items with different rates for invoices</li>
              <li><strong>Formula display:</strong> Understand exactly how calculations work</li>
            </ul>

            <p className="text-gray-700 mb-4">
              For related business calculations, explore our{' '}
              <a href="/discount-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Discount Calculator
              </a>
              {' '}for pricing strategies,{' '}
              <a href="/markup-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Markup Calculator
              </a>
              {' '}for profit margins,{' '}
              <a href="/payroll-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Payroll Calculator
              </a>
              {' '}for employee costs, and{' '}
              <a href="/cash-flow-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Cash Flow Calculator
              </a>
              {' '}for investment decisions.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="text-sm text-gray-700">
                <strong>💡 Disclaimer:</strong> This calculator provides estimates for planning purposes. VAT rules and rates change periodically. Always verify current rates and rules with your local tax authority ({' '}
                <a 
                  href="https://www.gov.uk/topic/business-tax/vat" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  UK: HMRC
                </a>
                ,{' '}
                <a 
                  href="https://taxation-customs.ec.europa.eu/taxation/vat_en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  EU: European Commission
                </a>
                ). Consult a qualified tax advisor or accountant for business-specific VAT guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Related Calculators Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a 
              href="/sales-tax-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">🧾</div>
              <h3 className="font-semibold text-gray-900">Sales Tax Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate US sales tax by state</p>
            </a>
            
            <a 
              href="/discount-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">🏷️</div>
              <h3 className="font-semibold text-gray-900">Discount Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate sale prices and savings</p>
            </a>
            
            <a 
              href="/markup-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">💹</div>
              <h3 className="font-semibold text-gray-900">Markup Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate markup and profit margins</p>
            </a>
            
            <a 
              href="/payroll-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-semibold text-gray-900">Payroll Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate employee payroll and taxes</p>
            </a>

            <a 
              href="/tax-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">💼</div>
              <h3 className="font-semibold text-gray-900">Income Tax Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Estimate federal and state taxes</p>
            </a>
            
            <a 
              href="/cash-flow-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900">Cash Flow Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate NPV and IRR</p>
            </a>
            
            <a 
              href="/overtime-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">⏰</div>
              <h3 className="font-semibold text-gray-900">Overtime Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate overtime pay</p>
            </a>
            
            <a 
              href="/depreciation-calculator" 
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">📉</div>
              <h3 className="font-semibold text-gray-900">Depreciation Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate asset depreciation</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

