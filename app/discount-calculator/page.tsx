import type { Metadata } from 'next';
import DiscountCalculator from '@/components/Calculator/DiscountCalculator';

export const metadata: Metadata = {
  title: "Discount Calculator - Calculate Sale Price, Savings & Discount Percentage",
  description: "Free discount calculator to find sale prices, calculate savings, and determine discount percentages. Perfect for shopping, sales, and price comparisons. Stack multiple discounts instantly.",
  keywords: [
    "discount calculator",
    "sale price calculator",
    "percent off calculator",
    "savings calculator",
    "price discount calculator",
    "calculate discount percentage",
    "final price calculator",
    "markdown calculator",
    "sale calculator",
    "percent discount",
    "how much is 20 percent off",
    "discount formula",
    "multiple discount calculator",
    "black friday calculator",
    "clearance price calculator",
  ],
  openGraph: {
    title: "Free Discount Calculator - Calculate Sale Prices & Savings",
    description: "Calculate discount percentages, sale prices, and total savings instantly. Stack multiple discounts and compare deals easily.",
    type: "website",
    url: "https://calculator-tools.com/discount-calculator",
    siteName: "Calculator Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discount Calculator - Find Sale Prices & Savings",
    description: "Calculate discounts, sale prices, and savings instantly. Perfect for shopping and comparing deals.",
    site: "@CalculatorTools",
  },
  alternates: {
    canonical: "https://calculator-tools.com/discount-calculator",
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

export default function DiscountCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Discount Calculator",
        "url": "https://calculator-tools.com/discount-calculator",
        "description": "Free online discount calculator to calculate sale prices, savings amounts, and discount percentages. Supports simple discounts, multiple discount stacking, and reverse discount percentage calculation.",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate sale price from discount percentage",
          "Calculate discount percentage from prices",
          "Stack multiple discounts",
          "Calculate total savings",
          "Quick discount buttons (10%, 20%, 25%, 50% off)",
          "Compare original vs sale price",
          "Show step-by-step discount breakdown",
          "Calculate effective discount rate",
          "Free forever, no registration required"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://calculator-tools.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Financial Calculators",
            "item": "https://calculator-tools.com/financial"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Discount Calculator",
            "item": "https://calculator-tools.com/discount-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate a discount percentage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate a discount percentage, use this formula: Discount % = (Discount Amount ÷ Original Price) × 100. For example, if an item originally costs $100 and is on sale for $80, the discount is $20. So: ($20 ÷ $100) × 100 = 20% off. Our calculator does this automatically – just enter the original and sale price."
            }
          },
          {
            "@type": "Question",
            "name": "How much is 20% off of $100?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "20% off of $100 is $20 in savings, making the final price $80. Calculate it as: $100 × 0.20 = $20 discount, then $100 - $20 = $80 final price. You can use our quick discount buttons to instantly calculate common percentages like 10%, 20%, 25%, 30%, and 50% off."
            }
          },
          {
            "@type": "Question",
            "name": "How do multiple discounts work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Multiple discounts apply sequentially, not additively. For example, 20% off + 10% off is NOT 30% off. Here's why: Starting with $100, take 20% off = $80. Then take 10% off of $80 (not $100) = $72 final price. This equals a 28% total discount, not 30%. Our calculator shows the step-by-step breakdown for stacked discounts."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between discount amount and discount percentage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Discount amount is the dollar value you save (e.g., $20 off), while discount percentage is the proportion of the original price (e.g., 20% off). For a $100 item with 20% off: Discount percentage = 20%, Discount amount = $20, Final price = $80. Both represent the same savings but expressed differently."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate the original price if I know the sale price and discount?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To find the original price, use this formula: Original Price = Sale Price ÷ (1 - Discount%). For example, if an item costs $80 after a 20% discount: $80 ÷ (1 - 0.20) = $80 ÷ 0.80 = $100 original price. Use our 'Find Discount %' mode to calculate this automatically."
            }
          },
          {
            "@type": "Question",
            "name": "What's a good discount percentage for sales?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Common retail discounts range from 10-75% depending on the situation: Regular sales: 10-30% off, Seasonal clearance: 30-50% off, End-of-season: 50-70% off, Black Friday/Cyber Monday: 25-70% off, Going out of business: 50-90% off. Discounts over 50% are typically considered excellent deals, while 20-30% off is standard for regular promotions."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this calculator for tax or tip calculations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While this calculator is optimized for discounts (subtracting percentages), it can work for additions too. However, for adding sales tax or tips, we recommend using our dedicated Tip Calculator or Tax Calculator for better accuracy and additional features specific to those use cases."
            }
          },
          {
            "@type": "Question",
            "name": "Is 40% off better than buy one get one 50% off?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It depends on quantity! For 1 item: 40% off is better (pay 60%). For 2 identical items: Buy one get one 50% off means you pay 100% + 50% = 150% for 2 items, or 75% per item (25% off each). So 40% off is still better. Use our calculator to compare different discount scenarios and find the best deal."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Calculate Discounts and Sale Prices",
        "description": "Learn how to calculate discount percentages, sale prices, and savings",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose Calculation Mode",
            "text": "Select the type of calculation you need: Simple Discount (calculate sale price from a percentage), Multiple Discounts (stack multiple discounts), or Find Discount % (calculate the discount percentage from original and sale prices)."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Values",
            "text": "For simple discounts: Enter the original price and discount percentage. For multiple discounts: Enter the original price and up to 3 discount percentages. For reverse calculation: Enter the original price and final sale price."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "View Results",
            "text": "Instantly see the final price, discount amount, and total savings. For multiple discounts, see the step-by-step breakdown showing how each discount is applied. Use quick discount buttons for common percentages like 20%, 25%, or 50% off."
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <h1 className="sr-only">Discount Calculator - Free Sale Price, Savings and Discount Percentage Calculator for Shopping and Price Comparison</h1>
      
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
              <span itemProp="name" className="text-gray-900 font-semibold">Discount Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <section className="py-8 md:py-12" aria-label="Discount Calculator Tool">
        <div className="container mx-auto px-4">
          <DiscountCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Discount Calculator Guide">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Complete Guide to Discount Calculations
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💰 What is a Discount?</h3>
                <p className="text-gray-700 mb-4">
                  A discount is a reduction in the original price of a product or service. It's typically expressed as either a percentage (20% off) or a dollar amount ($10 off). Discounts are used by retailers to attract customers, clear inventory, and increase sales volume.
                </p>
                <p className="text-gray-700">
                  <strong>Common discount types:</strong> Percentage discounts (most common), dollar-off discounts, buy-one-get-one (BOGO) deals, bundle discounts, loyalty rewards, and seasonal sales.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🧮 Discount Formula</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-blue-50 p-3 rounded">
                    <strong>Sale Price =</strong> Original Price - (Original Price × Discount %)
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <strong>Savings =</strong> Original Price × Discount %
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <strong>Discount % =</strong> (Savings ÷ Original Price) × 100
                  </div>
                  <p className="text-sm mt-3">
                    <strong>Example:</strong> $100 item with 25% off → Savings = $25, Final price = $75
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Reference Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Discount Reference Table</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">Original Price</th>
                      <th className="px-4 py-3 text-left">10% Off</th>
                      <th className="px-4 py-3 text-left">20% Off</th>
                      <th className="px-4 py-3 text-left">25% Off</th>
                      <th className="px-4 py-3 text-left">30% Off</th>
                      <th className="px-4 py-3 text-left">50% Off</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-semibold">$20</td>
                      <td className="px-4 py-3">$18.00</td>
                      <td className="px-4 py-3">$16.00</td>
                      <td className="px-4 py-3">$15.00</td>
                      <td className="px-4 py-3">$14.00</td>
                      <td className="px-4 py-3">$10.00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">$50</td>
                      <td className="px-4 py-3">$45.00</td>
                      <td className="px-4 py-3">$40.00</td>
                      <td className="px-4 py-3">$37.50</td>
                      <td className="px-4 py-3">$35.00</td>
                      <td className="px-4 py-3">$25.00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">$100</td>
                      <td className="px-4 py-3">$90.00</td>
                      <td className="px-4 py-3">$80.00</td>
                      <td className="px-4 py-3">$75.00</td>
                      <td className="px-4 py-3">$70.00</td>
                      <td className="px-4 py-3">$50.00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">$200</td>
                      <td className="px-4 py-3">$180.00</td>
                      <td className="px-4 py-3">$160.00</td>
                      <td className="px-4 py-3">$150.00</td>
                      <td className="px-4 py-3">$140.00</td>
                      <td className="px-4 py-3">$100.00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">$500</td>
                      <td className="px-4 py-3">$450.00</td>
                      <td className="px-4 py-3">$400.00</td>
                      <td className="px-4 py-3">$375.00</td>
                      <td className="px-4 py-3">$350.00</td>
                      <td className="px-4 py-3">$250.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Multiple Discounts Explanation */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-orange-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🔢 Understanding Multiple Discounts</h3>
              <p className="text-gray-700 mb-4">
                <strong>Important:</strong> Multiple discounts don't add up! Each subsequent discount applies to the already-discounted price.
              </p>
              
              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className="font-bold text-gray-900 mb-2">Example: 20% off + 10% off</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>❌ <strong>Wrong:</strong> 20% + 10% = 30% off → $70 final price</div>
                  <div>✅ <strong>Correct:</strong></div>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Start: $100</li>
                    <li>After 20% off: $100 - $20 = $80</li>
                    <li>After 10% off of $80: $80 - $8 = $72</li>
                    <li><strong>Final price: $72 (= 28% total discount, not 30%)</strong></li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Multiple Discount Formula:</h4>
                <p className="text-sm text-gray-700">
                  Final Price = Original Price × (1 - Discount₁) × (1 - Discount₂) × (1 - Discount₃)
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Example: $100 × (1 - 0.20) × (1 - 0.10) = $100 × 0.80 × 0.90 = $72
                </p>
              </div>
            </div>

            {/* Shopping Tips */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🛍️ Smart Shopping Tips</h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Compare unit prices:</strong> A 30% discount on a $50 item may be better value than 50% off a $20 item</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Stack coupons:</strong> Use manufacturer coupons with store sales for maximum savings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Time your purchases:</strong> Black Friday, end-of-season, and clearance sales offer deepest discounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Check price history:</strong> Some retailers inflate prices before sales to make discounts look bigger</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Calculate per-item cost:</strong> For BOGO deals, divide total by quantity to compare with regular discounts</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📅 Best Times to Shop Sales</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-blue-500 pl-3">
                    <strong className="text-gray-900">Black Friday/Cyber Monday:</strong>
                    <p className="text-gray-700">25-75% off electronics, appliances, clothing</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-3">
                    <strong className="text-gray-900">End of Season:</strong>
                    <p className="text-gray-700">50-70% off seasonal items (clothing, outdoor gear)</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-3">
                    <strong className="text-gray-900">Holiday Sales:</strong>
                    <p className="text-gray-700">30-60% off during Memorial Day, Labor Day, Presidents Day</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-3">
                    <strong className="text-gray-900">Clearance Events:</strong>
                    <p className="text-gray-700">60-90% off discontinued items and overstock</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-3">
                    <strong className="text-gray-900">Back to School:</strong>
                    <p className="text-gray-700">20-50% off supplies, electronics, clothing (July-August)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Discount Scenarios */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Discount Scenarios</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">🏷️ Standard Sale</h4>
                  <p className="text-sm text-gray-700 mb-2">Item: $80, Discount: 25% off</p>
                  <p className="text-sm text-green-600 font-semibold">You pay: $60 (Save $20)</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">🎁 BOGO 50% Off</h4>
                  <p className="text-sm text-gray-700 mb-2">2 items at $50 each</p>
                  <p className="text-sm text-green-600 font-semibold">You pay: $75 (Save $25 = 25% off)</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">💳 Additional Coupon</h4>
                  <p className="text-sm text-gray-700 mb-2">$100 item, 30% off + 10% coupon</p>
                  <p className="text-sm text-green-600 font-semibold">You pay: $63 (Save $37 = 37% total)</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">🔥 Clearance Stack</h4>
                  <p className="text-sm text-gray-700 mb-2">$200 item, 50% + 20% + 10% off</p>
                  <p className="text-sm text-green-600 font-semibold">You pay: $72 (Save $128 = 64% total)</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate a discount percentage?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate a discount percentage, use this formula: Discount % = (Discount Amount ÷ Original Price) × 100. For example, if an item originally costs $100 and is on sale for $80, the discount is $20. So: ($20 ÷ $100) × 100 = 20% off. Our calculator does this automatically – just enter the original and sale price.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much is 20% off of $100?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      20% off of $100 is $20 in savings, making the final price $80. Calculate it as: $100 × 0.20 = $20 discount, then $100 - $20 = $80 final price. You can use our quick discount buttons to instantly calculate common percentages like 10%, 20%, 25%, 30%, and 50% off.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do multiple discounts work?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Multiple discounts apply sequentially, not additively. For example, 20% off + 10% off is NOT 30% off. Here's why: Starting with $100, take 20% off = $80. Then take 10% off of $80 (not $100) = $72 final price. This equals a 28% total discount, not 30%. Our calculator shows the step-by-step breakdown for stacked discounts.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What's the difference between discount amount and discount percentage?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Discount amount is the dollar value you save (e.g., $20 off), while discount percentage is the proportion of the original price (e.g., 20% off). For a $100 item with 20% off: Discount percentage = 20%, Discount amount = $20, Final price = $80. Both represent the same savings but expressed differently.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate the original price if I know the sale price and discount?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To find the original price, use this formula: Original Price = Sale Price ÷ (1 - Discount%). For example, if an item costs $80 after a 20% discount: $80 ÷ (1 - 0.20) = $80 ÷ 0.80 = $100 original price. Use our 'Find Discount %' mode to calculate this automatically.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What's a good discount percentage for sales?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Common retail discounts range from 10-75% depending on the situation: Regular sales: 10-30% off, Seasonal clearance: 30-50% off, End-of-season: 50-70% off, Black Friday/Cyber Monday: 25-70% off, Going out of business: 50-90% off. Discounts over 50% are typically considered excellent deals, while 20-30% off is standard for regular promotions.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can I use this calculator for tax or tip calculations?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      While this calculator is optimized for discounts (subtracting percentages), it can work for additions too. However, for adding sales tax or tips, we recommend using our dedicated Tip Calculator or Tax Calculator for better accuracy and additional features specific to those use cases.
                    </p>
                  </div>
                </div>

                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Is 40% off better than buy one get one 50% off?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      It depends on quantity! For 1 item: 40% off is better (pay 60%). For 2 identical items: Buy one get one 50% off means you pay 100% + 50% = 150% for 2 items, or 75% per item (25% off each). So 40% off is still better. Use our calculator to compare different discount scenarios and find the best deal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate percentages and percentage changes</p>
                </a>
                <a href="/tip-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Tip Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate tips and split bills</p>
                </a>
                <a href="/sales-tax-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Sales Tax Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate sales tax by state</p>
                </a>
                <a href="/unit-converter" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Unit Converter</div>
                  <p className="text-xs text-gray-600 mt-1">Convert between different units</p>
                </a>
                <a href="/savings-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Savings Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate savings and interest</p>
                </a>
                <a href="/loan-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate loan payments and interest</p>
                </a>
              </div>
            </div>

            {/* External Links */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p className="mb-2">Learn more about smart shopping:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://www.consumer.ftc.gov/articles/0181-shopping-sales" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  FTC: Shopping Sales Tips →
                </a>
                <a href="https://www.nerdwallet.com/blog/shopping/best-times-to-buy/" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  NerdWallet: Best Times to Buy →
                </a>
                <a href="https://en.wikipedia.org/wiki/Discounts_and_allowances" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Wikipedia: Discounts →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

