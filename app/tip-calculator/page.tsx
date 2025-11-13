import { Metadata } from 'next';
import { TipCalculator } from '@/components/Calculator/TipCalculator';

export const metadata: Metadata = {
  title: "Tip Calculator - Free Restaurant Tip & Bill Splitter Calculator | AICalculator",
  description: "Calculate restaurant tips instantly with our free tip calculator. Split bills among friends, calculate tip before or after tax, and get service quality recommendations. Easy-to-use 15%, 18%, 20% tip calculator.",
  keywords: ["tip calculator", "restaurant tip calculator", "bill splitter", "gratuity calculator", "tip percentage calculator", "split bill calculator", "tip before tax", "tipping guide", "server tip calculator", "meal tip calculator", "dining tip calculator", "tip amount calculator", "calculate tip", "how much to tip", "tip calculator app"],
  openGraph: {
    title: "Free Tip Calculator - Split Bills & Calculate Gratuity",
    description: "Calculate restaurant tips and split bills easily. Get service quality recommendations and tipping guidelines. Free online tip calculator with bill splitting.",
    type: "website",
    url: "https://aicalculator.com/tip-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tip Calculator - Restaurant Tip & Bill Splitter",
    description: "Calculate tips and split bills instantly. Free tip calculator with service quality recommendations.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.com/tip-calculator",
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
  other: {
    'last-modified': new Date().toISOString(),
  },
};

export default function TipCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Tip Calculator",
        "url": "https://aicalculator.com/tip-calculator",
        "description": "Free online tip calculator to calculate restaurant tips, split bills among friends, and get service quality recommendations. Supports tip before/after tax calculations.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Restaurant tip calculation",
          "Bill splitting among multiple people",
          "Tip before or after tax",
          "Custom tip percentage",
          "Quick tip buttons (10%, 15%, 18%, 20%, 25%)",
          "Service quality recommendations",
          "Per person amount calculation",
          "Tax calculation",
          "US tipping guide",
          "Share and save results"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://aicalculator.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Financial",
            "item": "https://aicalculator.com/financial"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Tip Calculator",
            "item": "https://aicalculator.com/tip-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the standard tip percentage in restaurants?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In the United States, the standard tip percentage for restaurant service is 15-20%. For good service, 18% is typical, while 20% is for great service. Exceptional service may warrant 25% or more. Poor service may receive 10-12%, though it's customary to tip at least 15% unless service was truly inadequate."
            }
          },
          {
            "@type": "Question",
            "name": "Should I calculate tip before or after tax?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Traditionally, tips should be calculated on the pre-tax amount of your bill. However, many people calculate on the total including tax for simplicity. Our tip calculator offers both options so you can choose based on your preference. Calculating before tax typically results in a slightly lower tip amount."
            }
          },
          {
            "@type": "Question",
            "name": "How do I split a bill with a tip among friends?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To split a bill with tip: 1) Enter the total bill amount, 2) Select your desired tip percentage, 3) Enter the number of people splitting the bill. Our calculator automatically divides the total (bill + tip) by the number of people to show how much each person should pay. It also shows the tip amount per person."
            }
          },
          {
            "@type": "Question",
            "name": "What are the tipping customs for different service levels?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tipping customs by service quality: Poor service (10-12%), Fair service (15%), Good service (18%), Great service (20%), Excellent service (25%+). These percentages are guidelines for US restaurants. Factors affecting tip amount include attentiveness, food quality, order accuracy, and overall dining experience."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to tip on takeout orders?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tipping on takeout orders is optional but appreciated. A common practice is to tip 10% for takeout, as staff still prepare and package your order. For delivery, 15-20% is standard. During busy times or for large orders, consider tipping more. Some people tip a flat $2-5 regardless of order size for takeout."
            }
          },
          {
            "@type": "Question",
            "name": "Is tipping mandatory in the United States?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While tipping is not legally mandatory in most US restaurants, it is strongly expected and considered part of dining culture. Many servers earn below minimum wage and rely on tips for their income. Some restaurants include an automatic gratuity (usually 18-20%) for large parties. Always check your bill to see if gratuity has already been added."
            }
          },
          {
            "@type": "Question",
            "name": "How much should I tip for delivery services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For food delivery services, a standard tip is 15-20% of the order total, with a minimum of $3-5 even for small orders. Consider tipping more for bad weather, long distances, or large/complex orders. For services like UberEats, DoorDash, or GrubHub, you can adjust the tip after delivery based on service quality."
            }
          },
          {
            "@type": "Question",
            "name": "Can I adjust my tip after seeing the service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you should adjust your tip based on service quality. Start with the standard 18-20% in mind, then increase for exceptional service or decrease for poor service. If service was truly unacceptable (not just slow due to busyness), you can tip less, but consider speaking with a manager about the issues. Never withhold tips for kitchen errors beyond the server's control."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Tip Calculator",
        "description": "Calculate restaurant tips and split bills in 3 easy steps",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Bill Amount",
            "text": "Enter the total amount of your restaurant bill. If you want to calculate tip before tax, check the 'Calculate tip before tax' option and enter the tax rate."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Select Tip Percentage",
            "text": "Choose from quick tip options (10%, 15%, 18%, 20%, 25%) based on service quality, or enter a custom tip percentage. The calculator shows service quality labels for each percentage."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Split Bill (Optional)",
            "text": "If splitting the bill among multiple people, enter the number of people. The calculator will show the per-person amount including their share of the tip."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "View Results",
            "text": "See the calculated tip amount, total bill, and per-person amounts (if applicable). The results include a detailed breakdown of bill, tax, and tip amounts."
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* SEO: Hidden H1 */}
      <h1 className="sr-only">Tip Calculator - Free Restaurant Tip and Bill Splitter Calculator with Service Quality Guide</h1>
      
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
              <span itemProp="name" className="text-gray-900 font-semibold">Tip Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <TipCalculator />
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Content */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Restaurant Tipping
            </h2>

            {/* Content Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* What is Tipping */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What is Tipping?</h3>
                <p className="text-gray-700 mb-4">
                  Tipping, also called gratuity, is a voluntary sum of money given to service workers in addition to the base price of a service. In the United States, tipping is deeply ingrained in the service industry culture, particularly in restaurants, bars, and cafes.
                </p>
                <p className="text-gray-700 mb-4">
                  The practice originated in 18th-century England and became widespread in the US during the post-Civil War era. Today, many service workers receive a lower base wage with the expectation that tips will supplement their income to reach or exceed minimum wage.
                </p>
                <p className="text-gray-700">
                  <strong>Standard tipping rates:</strong> In US restaurants, the typical tip range is 15-20% of the pre-tax bill amount. This standard has evolved over time, with 15% being considered the baseline for adequate service, 18-20% for good service, and 25% or more for exceptional service.
                </p>
              </div>

              {/* Why Tipping Matters */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Tipping Matters</h3>
                <p className="text-gray-700 mb-4">
                  In many states, restaurant servers are paid a "tipped minimum wage" that can be as low as $2.13 per hour (federal tipped minimum), significantly below the standard minimum wage. Tips are not just appreciation—they're a crucial part of servers' income.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Economic impact:</strong> Servers typically must "tip out" a percentage of their tips to support staff including bussers, bartenders, and hosts. This means they don't keep 100% of their tips. When customers don't tip or tip poorly, it directly affects not just the server but the entire restaurant team.
                </p>
                <p className="text-gray-700">
                  <strong>Social expectations:</strong> Tipping is considered a social obligation in the US. Failing to tip appropriately (except in cases of truly poor service) is viewed as socially unacceptable and can be seen as taking advantage of workers who depend on tips for their livelihood.
                </p>
              </div>

              {/* Tipping Guidelines */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tipping Guidelines by Service Type</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-900">Full-Service Restaurants</div>
                      <div className="text-sm text-gray-600">Sit-down dining with table service</div>
                    </div>
                    <div className="text-blue-600 font-bold">15-20%</div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-900">Fine Dining</div>
                      <div className="text-sm text-gray-600">Upscale restaurants, sommelier service</div>
                    </div>
                    <div className="text-blue-600 font-bold">20-25%</div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-900">Delivery Services</div>
                      <div className="text-sm text-gray-600">Food delivery, minimum $3-5</div>
                    </div>
                    <div className="text-blue-600 font-bold">15-20%</div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-900">Takeout / Counter Service</div>
                      <div className="text-sm text-gray-600">Fast casual, coffee shops</div>
                    </div>
                    <div className="text-blue-600 font-bold">0-10%</div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-900">Bars & Bartenders</div>
                      <div className="text-sm text-gray-600">$1-2 per drink or 15-20% of tab</div>
                    </div>
                    <div className="text-blue-600 font-bold">$1-2/drink</div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-900">Buffets</div>
                      <div className="text-sm text-gray-600">Self-service with drink refills</div>
                    </div>
                    <div className="text-blue-600 font-bold">10-15%</div>
                  </div>
                </div>
              </div>

              {/* Bill Splitting Best Practices */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Bill Splitting Best Practices</h3>
                <p className="text-gray-700 mb-4">
                  When dining with a group, splitting the bill can be complex. Here are best practices to ensure fairness and proper tipping:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Equal split:</strong> Divide total bill + tip evenly among all diners. This works best when everyone ordered similarly-priced items.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Itemized split:</strong> Each person pays for their own items plus their share of tip and tax. More fair when there's a large price difference between orders.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Calculate tip on pre-split amount:</strong> Always calculate the tip percentage on the total bill before splitting, not on individual portions.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Round up:</strong> When splitting, round up your share to the nearest dollar to ensure the server receives full tip amount.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Use payment apps:</strong> Apps like Venmo, Cash App, or Splitwise make splitting bills easier and more accurate.</span>
                  </li>
                </ul>
              </div>

              {/* Tax Considerations */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tip Before or After Tax?</h3>
                <p className="text-gray-700 mb-4">
                  There's ongoing debate about whether to calculate tips on the pre-tax or post-tax amount. Here's what you need to know:
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">Pre-Tax Tipping (Traditional)</div>
                    <p className="text-gray-700 text-sm mb-2">
                      Traditionally, etiquette experts recommend calculating tips on the pre-tax amount since sales tax isn't part of the service cost. This method results in a slightly lower tip.
                    </p>
                    <p className="text-gray-700 text-sm">
                      <strong>Example:</strong> $100 bill + $8.50 tax = $108.50 total. 18% tip on $100 = $18.00 (not $19.53).
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">Post-Tax Tipping (Modern)</div>
                    <p className="text-gray-700 text-sm mb-2">
                      Many people now calculate on the total including tax for simplicity, especially since most payment terminals show suggested tips based on the total. This is perfectly acceptable and increasingly common.
                    </p>
                    <p className="text-gray-700 text-sm">
                      <strong>Quick tip:</strong> In high-tax areas (8-10% sales tax), the difference between pre-tax and post-tax tipping can be $1-3 on a typical $100 bill.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      <strong>Bottom line:</strong> Either method is acceptable. Choose what feels right to you, but be consistent. Most importantly, tip fairly based on service quality.
                    </p>
                  </div>
                </div>
              </div>

              {/* International Tipping */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tipping Around the World</h3>
                <p className="text-gray-700 mb-4">
                  Tipping customs vary dramatically by country. Understanding these differences is crucial for international travelers:
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-gray-900">United States & Canada</div>
                    <p className="text-sm text-gray-600">15-20% standard, tipping expected in most service industries</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Europe (General)</div>
                    <p className="text-sm text-gray-600">5-10% or round up, service charge often included</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Japan</div>
                    <p className="text-sm text-gray-600">No tipping (can be considered offensive), excellent service included</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Australia & New Zealand</div>
                    <p className="text-sm text-gray-600">Optional 10% for exceptional service, not expected</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Middle East</div>
                    <p className="text-sm text-gray-600">10-15% if service charge not included</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">South America</div>
                    <p className="text-sm text-gray-600">10% standard, often included in bill</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mt-4">
                  Always research local customs before traveling. What's generous in one country might be insulting in another.
                </p>
              </div>
            </div>

            {/* Quick Tips Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Reference: Tip Amounts</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Bill Amount</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">15% Tip</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">18% Tip</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">20% Tip</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-900">Total (20%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-semibold">$20</td>
                      <td className="px-4 py-3 text-center">$3.00</td>
                      <td className="px-4 py-3 text-center">$3.60</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-semibold">$4.00</td>
                      <td className="px-4 py-3 text-right">$24.00</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold">$50</td>
                      <td className="px-4 py-3 text-center">$7.50</td>
                      <td className="px-4 py-3 text-center">$9.00</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-semibold">$10.00</td>
                      <td className="px-4 py-3 text-right">$60.00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">$75</td>
                      <td className="px-4 py-3 text-center">$11.25</td>
                      <td className="px-4 py-3 text-center">$13.50</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-semibold">$15.00</td>
                      <td className="px-4 py-3 text-right">$90.00</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold">$100</td>
                      <td className="px-4 py-3 text-center">$15.00</td>
                      <td className="px-4 py-3 text-center">$18.00</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-semibold">$20.00</td>
                      <td className="px-4 py-3 text-right">$120.00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">$150</td>
                      <td className="px-4 py-3 text-center">$22.50</td>
                      <td className="px-4 py-3 text-center">$27.00</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-semibold">$30.00</td>
                      <td className="px-4 py-3 text-right">$180.00</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold">$200</td>
                      <td className="px-4 py-3 text-center">$30.00</td>
                      <td className="px-4 py-3 text-center">$36.00</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-semibold">$40.00</td>
                      <td className="px-4 py-3 text-right">$240.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                {/* FAQ 1 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the standard tip percentage in restaurants?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      In the United States, the standard tip percentage for restaurant service is 15-20%. For good service, 18% is typical, while 20% is for great service. Exceptional service may warrant 25% or more. Poor service may receive 10-12%, though it's customary to tip at least 15% unless service was truly inadequate.
                    </p>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Should I calculate tip before or after tax?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Traditionally, tips should be calculated on the pre-tax amount of your bill. However, many people calculate on the total including tax for simplicity. Our tip calculator offers both options so you can choose based on your preference. Calculating before tax typically results in a slightly lower tip amount.
                    </p>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I split a bill with a tip among friends?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To split a bill with tip: 1) Enter the total bill amount, 2) Select your desired tip percentage, 3) Enter the number of people splitting the bill. Our calculator automatically divides the total (bill + tip) by the number of people to show how much each person should pay. It also shows the tip amount per person.
                    </p>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What are the tipping customs for different service levels?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Tipping customs by service quality: Poor service (10-12%), Fair service (15%), Good service (18%), Great service (20%), Excellent service (25%+). These percentages are guidelines for US restaurants. Factors affecting tip amount include attentiveness, food quality, order accuracy, and overall dining experience.
                    </p>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Do I need to tip on takeout orders?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Tipping on takeout orders is optional but appreciated. A common practice is to tip 10% for takeout, as staff still prepare and package your order. For delivery, 15-20% is standard. During busy times or for large orders, consider tipping more. Some people tip a flat $2-5 regardless of order size for takeout.
                    </p>
                  </div>
                </div>

                {/* FAQ 6 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Is tipping mandatory in the United States?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      While tipping is not legally mandatory in most US restaurants, it is strongly expected and considered part of dining culture. Many servers earn below minimum wage and rely on tips for their income. Some restaurants include an automatic gratuity (usually 18-20%) for large parties. Always check your bill to see if gratuity has already been added.
                    </p>
                  </div>
                </div>

                {/* FAQ 7 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much should I tip for delivery services?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      For food delivery services, a standard tip is 15-20% of the order total, with a minimum of $3-5 even for small orders. Consider tipping more for bad weather, long distances, or large/complex orders. For services like UberEats, DoorDash, or GrubHub, you can adjust the tip after delivery based on service quality.
                    </p>
                  </div>
                </div>

                {/* FAQ 8 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can I adjust my tip after seeing the service?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes, you should adjust your tip based on service quality. Start with the standard 18-20% in mind, then increase for exceptional service or decrease for poor service. If service was truly unacceptable (not just slow due to busyness), you can tip less, but consider speaking with a manager about the issues. Never withhold tips for kitchen errors beyond the server's control.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate percentages and discounts</p>
                </a>
                <a href="/tax-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Tax Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate sales tax and total costs</p>
                </a>
                <a href="/salary-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Salary Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Convert between pay frequencies</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

