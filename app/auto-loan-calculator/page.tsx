import { Metadata } from 'next';
import { AutoLoanCalculator } from '@/components/Calculator/AutoLoanCalculator';
import { 
  getUrl, 
  getOgImage, 
  getBreadcrumbId, 
  getWebAppId, 
  getFaqId, 
  getHowToId, 
  getArticleId,
  getStepUrl 
} from '@/config/site';

export const metadata: Metadata = {
  title: "Auto Loan Calculator - Free Car Loan Calculator with Depreciation Analysis | AICalculator",
  description: "Calculate your car loan payments with our free auto loan calculator. Features vehicle depreciation tracking, trade-in value, down payment analysis, and monthly payment breakdown. Plan your car purchase wisely.",
  keywords: [
    "auto loan calculator",
    "car loan calculator",
    "vehicle loan calculator",
    "car payment calculator",
    "auto financing calculator",
    "car lease calculator",
    "used car loan calculator",
    "new car loan calculator",
    "car depreciation calculator",
    "trade in value calculator",
    "down payment calculator",
    "monthly car payment",
    "auto loan payment calculator",
    "car finance calculator",
    "vehicle financing calculator",
    "car loan interest calculator",
    "auto loan interest calculator",
    "car affordability calculator",
    "vehicle payment calculator",
    "car loan amortization calculator",
    "auto loan estimator",
    "car purchase calculator"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Free Auto Loan Calculator - Car Payment & Depreciation",
    description: "Calculate car loan payments with depreciation analysis. Include trade-in value, down payment, and see total cost. Free auto loan calculator.",
    type: "website",
    url: getUrl('/auto-loan-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('auto-loan'),
        width: 1200,
        height: 630,
        alt: 'Auto Loan Calculator',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto Loan Calculator - Car Payment Calculator",
    description: "Calculate car loan payments with vehicle depreciation tracking. Free calculator with trade-in analysis.",
    images: [getOgImage('auto-loan')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/auto-loan-calculator'),
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

export default function AutoLoanCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": getWebAppId('/auto-loan-calculator'),
        "name": "Auto Loan Calculator",
        "url": getUrl('/auto-loan-calculator'),
        "description": "Free online auto loan calculator to calculate car loan payments, vehicle depreciation, trade-in value impact, and total cost of ownership. Features new vs used car analysis.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Monthly car payment calculation",
          "Vehicle depreciation tracking",
          "Trade-in value calculator",
          "Down payment analysis",
          "New vs used car comparison",
          "Sales tax calculation",
          "Total interest calculation",
          "Amortization schedule",
          "Loan term comparison",
          "Share and export results"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/auto-loan-calculator'),
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": getUrl('/')
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Financial",
            "item": getUrl('/financial')
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Auto Loan Calculator",
            "item": getUrl('/auto-loan-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/auto-loan-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a good interest rate for a car loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "As of 2024, good auto loan rates vary by credit score and vehicle type. New car loans: Excellent credit (720+) gets 5-6%, good credit (680-719) gets 6-8%, fair credit (620-679) gets 8-12%. Used car loans are typically 1-3% higher. Credit unions often offer the best rates, sometimes 0.5-1% lower than banks. Dealer financing can have promotional 0% APR but may require sacrificing rebates. Shop multiple lenders to compare rates - even 1% difference saves thousands over the loan term."
            }
          },
          {
            "@type": "Question",
            "name": "How much should I put down on a car?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Financial experts recommend a 20% down payment for new cars and 10% for used cars. This helps you: 1) Avoid being upside-down on the loan (owing more than car's worth), 2) Lower monthly payments, 3) Pay less interest overall, 4) Potentially qualify for better interest rates. For a $30,000 car, that's $6,000 down. If you can't afford 20%, aim for at least 10% minimum. Larger down payments are especially important for new cars which lose 20% value in year one. Consider saving longer rather than buying with minimal down payment."
            }
          },
          {
            "@type": "Question",
            "name": "What is the best car loan term length?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The ideal car loan term is 36-48 months (3-4 years) to balance affordable payments with total interest cost. Shorter terms (24-36 months) save the most interest but have higher monthly payments. Longer terms (60-84 months) have lower monthly payments but you'll pay significantly more interest and risk being upside-down longer. For example, a $25,000 loan at 7%: 36 months = $773/month, $2,817 interest; 72 months = $420/month, $5,213 interest. Never exceed the vehicle's useful life - ideally, you should own the car outright before it needs major repairs."
            }
          },
          {
            "@type": "Question",
            "name": "Should I buy new or used car for better value?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Used cars typically offer better value due to avoiding steep first-year depreciation. New cars lose 20% value driving off the lot and 15% per year for years 2-3, totaling 50-60% depreciation in 5 years. A 2-3 year old certified pre-owned (CPO) car offers the sweet spot: significant depreciation already occurred, still under warranty, modern features, and lower price. However, new cars have advantages: lower interest rates (often 2-3% less), full warranty, latest safety/tech, no hidden issues. Calculate total 5-year cost including purchase, financing, insurance, and depreciation to compare true value."
            }
          },
          {
            "@type": "Question",
            "name": "How does my trade-in affect my car loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your trade-in value directly reduces the loan amount needed, lowering monthly payments and total interest paid. If your trade-in is worth $5,000 and you're buying a $30,000 car, you only finance $25,000 (plus tax/fees). Important considerations: 1) Research your car's value using KBB or Edmunds before visiting dealerships, 2) If you still owe money (upside-down), that negative equity may roll into new loan, 3) Sometimes selling privately gets $1,000-2,000 more than dealer trade-in, 4) Trading at same brand dealership may get better value. Get trade-in offer in writing before negotiating new car price."
            }
          },
          {
            "@type": "Question",
            "name": "What is being upside-down on a car loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Being upside-down (or underwater) means owing more on your loan than the car is worth. Example: You owe $20,000 but the car is only worth $15,000 - you're $5,000 upside-down. This happens from: minimal down payment, long loan terms (72-84 months), high interest rates, or rapid depreciation. It's problematic if you need to sell/trade the car - you must pay the difference out of pocket. If the car is totaled, insurance pays current value ($15,000) but you still owe the lender $5,000 (unless you have GAP insurance). Avoid by: 20% down payment, shorter loan terms, and not rolling negative equity from previous loans."
            }
          },
          {
            "@type": "Question",
            "name": "Should I get GAP insurance for my car loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GAP (Guaranteed Asset Protection) insurance is highly recommended if: 1) You put less than 20% down, 2) You're financing for 60+ months, 3) You bought a car that depreciates quickly (luxury cars, EVs), 4) You rolled negative equity into the loan. GAP covers the difference between insurance payout and loan balance if car is totaled/stolen. Example: Car totaled, worth $15,000, owe $22,000 - GAP pays the $7,000 difference. Cost is $400-700 for loan term (don't buy dealer GAP at $600-900; get from insurance company for $20/year instead). Skip GAP if you put 20%+ down or are almost paid off."
            }
          },
          {
            "@type": "Question",
            "name": "How much car can I afford on my salary?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Financial experts recommend the 20/4/10 rule: 20% down payment, finance for no more than 4 years, and total monthly vehicle expenses (payment + insurance + gas + maintenance) should not exceed 10% of gross monthly income. Alternative rule: total car payment shouldn't exceed 15-20% of take-home pay. Example: $60,000 annual salary = $5,000/month gross. Maximum total vehicle cost = $500/month. If insurance is $150 and gas/maintenance is $150, car payment should be $200 or less. Consider: buying used saves on purchase price and insurance; higher credit scores get lower rates; longer commutes increase gas/maintenance costs."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/auto-loan-calculator'),
        "name": "How to Calculate Your Auto Loan Payment",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": {
          "@type": "HowToTool",
          "name": "Auto Loan Calculator"
        },
        "description": "Calculate car loan payments and total costs in 4 steps",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Vehicle Details",
            "text": "Input the vehicle price and select whether it's new or used (affects depreciation calculations). Enter your state's sales tax rate - this is added to the loan amount in most states.",
            "url": getStepUrl('/auto-loan-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Add Down Payment and Trade-In",
            "text": "Enter your down payment amount (recommended 20% for new, 10% for used). If trading in your current vehicle, enter its trade-in value to reduce the loan amount needed.",
            "url": getStepUrl('/auto-loan-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Set Loan Terms",
            "text": "Enter the annual interest rate (check your credit score for typical rates). Choose loan term length - shorter terms (36-48 months) cost less interest but have higher monthly payments.",
            "url": getStepUrl('/auto-loan-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Review Results and Depreciation",
            "text": "See your monthly payment, total interest cost, and total amount paid. Review the depreciation schedule to understand how your vehicle's value changes over time compared to your loan balance.",
            "url": getStepUrl('/auto-loan-calculator', 4)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/auto-loan-calculator'),
        "headline": "Auto Loan Calculator - Complete Guide to Car Financing and Depreciation",
        "description": "Comprehensive guide to auto loans with free calculator. Learn how to calculate car payments, understand vehicle depreciation, and make smart financing decisions.",
        "author": {
          "@type": "Organization",
          "name": "AICalculator.pro",
          "url": getUrl('/')
        },
        "publisher": {
          "@type": "Organization",
          "name": "AICalculator.pro",
          "logo": {
            "@type": "ImageObject",
            "url": getUrl('/logo.png')
          }
        },
        "datePublished": "2025-11-16",
        "dateModified": "2025-11-16",
        "image": getOgImage('auto-loan'),
        "articleBody": "Make informed car buying decisions with our comprehensive auto loan calculator. Understand monthly payments, total interest costs, vehicle depreciation, and the impact of down payments and trade-ins on your financing."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <h1 className="sr-only">Auto Loan Calculator - Free Car Loan Payment Calculator with Vehicle Depreciation Analysis and Trade-In Value</h1>
      
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
              <span itemProp="name" className="text-gray-900 font-semibold">Auto Loan Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <AutoLoanCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Auto Loans & Car Financing
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How Auto Loans Work</h3>
                <p className="text-gray-700 mb-4">
                  An auto loan is a secured loan where the vehicle serves as collateral. You borrow money to purchase a car and repay it over time with interest. The lender holds the car's title until the loan is fully paid.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Key components:</strong> Principal (amount borrowed), Interest rate (annual percentage charged), Loan term (repayment period in months), Monthly payment (principal + interest divided by months), and Down payment (upfront cash to reduce loan amount).
                </p>
                <p className="text-gray-700">
                  Most auto loans use <strong>simple interest</strong> (not compound), calculated daily on the remaining balance. When you make a payment, interest is paid first, then the remainder reduces principal. Early in the loan, more goes to interest; later, more goes to principal.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">The 20/4/10 Rule</h3>
                <p className="text-gray-700 mb-4">
                  Financial experts recommend the <strong>20/4/10 rule</strong> for car buying to ensure affordability and avoid financial strain:
                </p>
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">20% Down Payment</div>
                    <p className="text-sm text-gray-700">Put at least 20% down to avoid being upside-down and reduce monthly payments.</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">4-Year Maximum Loan</div>
                    <p className="text-sm text-gray-700">Finance for no more than 48 months to minimize interest and own the car sooner.</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">10% of Gross Income</div>
                    <p className="text-sm text-gray-700">Total vehicle expenses (payment + insurance + gas + maintenance) shouldn't exceed 10% of gross monthly income.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Vehicle Depreciation Explained</h3>
                <p className="text-gray-700 mb-4">
                  Depreciation is the loss of a vehicle's value over time. It's the single largest cost of car ownership, often exceeding fuel and maintenance costs combined.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <div className="font-semibold text-gray-900 mb-2">Typical Depreciation Schedule:</div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Driving off the lot (new car):</span>
                      <span className="font-bold text-orange-600">-20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>End of Year 1:</span>
                      <span className="font-bold">-20-30% total</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Year 2:</span>
                      <span className="font-bold">-15% additional</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Year 3:</span>
                      <span className="font-bold">-15% additional</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Years 4-5:</span>
                      <span className="font-bold">-10% per year</span>
                    </div>
                    <div className="flex justify-between border-t border-orange-300 pt-2 mt-2">
                      <span><strong>After 5 years:</strong></span>
                      <span className="font-bold text-orange-600">-50-60% total</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  A $30,000 new car is worth ~$24,000 after year 1, ~$18,000 after year 2, and ~$12,000-15,000 after 5 years. Used cars depreciate slower since the steepest depreciation already occurred.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">New vs Used Cars: Total Cost</h3>
                <p className="text-gray-700 mb-4">
                  While used cars have lower purchase prices, comparing total 5-year costs reveals the true financial picture:
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">New Car Advantages:</div>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-green-600">✓</span><span>Lower interest rates (5-6% vs 8-10%)</span></li>
                      <li className="flex gap-2"><span className="text-green-600">✓</span><span>Full manufacturer warranty (3-5 years)</span></li>
                      <li className="flex gap-2"><span className="text-green-600">✓</span><span>Latest safety and technology features</span></li>
                      <li className="flex gap-2"><span className="text-green-600">✓</span><span>Lower maintenance costs early on</span></li>
                      <li className="flex gap-2"><span className="text-green-600">✓</span><span>Potential manufacturer incentives</span></li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">Used Car Advantages:</div>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-blue-600">✓</span><span>Avoid steep first-year depreciation</span></li>
                      <li className="flex gap-2"><span className="text-blue-600">✓</span><span>Lower purchase price (30-40% less for 2-3 year old)</span></li>
                      <li className="flex gap-2"><span className="text-blue-600">✓</span><span>Lower insurance costs</span></li>
                      <li className="flex gap-2"><span className="text-blue-600">✓</span><span>More car for your budget</span></li>
                      <li className="flex gap-2"><span className="text-blue-600">✓</span><span>CPO options offer warranty + lower price</span></li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mt-4">
                  <strong>Sweet spot:</strong> 2-3 year old certified pre-owned (CPO) vehicles offer the best value - significant depreciation already occurred, still under warranty, and 30-40% cheaper than new.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding Interest Rates</h3>
                <p className="text-gray-700 mb-4">
                  Your auto loan interest rate significantly impacts total cost. A $25,000 loan over 60 months at different rates shows the impact:
                </p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between bg-green-50 rounded px-3 py-2">
                    <span>3% APR (Excellent credit):</span>
                    <span className="font-bold">$449/mo, $1,910 interest</span>
                  </div>
                  <div className="flex justify-between bg-blue-50 rounded px-3 py-2">
                    <span>6% APR (Good credit):</span>
                    <span className="font-bold">$483/mo, $3,968 interest</span>
                  </div>
                  <div className="flex justify-between bg-yellow-50 rounded px-3 py-2">
                    <span>9% APR (Fair credit):</span>
                    <span className="font-bold">$519/mo, $6,124 interest</span>
                  </div>
                  <div className="flex justify-between bg-red-50 rounded px-3 py-2">
                    <span>12% APR (Poor credit):</span>
                    <span className="font-bold">$556/mo, $8,394 interest</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  The difference between excellent and poor credit is $107/month or $6,484 in total interest! Improve your credit score before buying to save thousands. Even 1% rate difference saves ~$1,400 over 5 years on a $25,000 loan.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Trade-In Strategy Tips</h3>
                <p className="text-gray-700 mb-4">
                  Maximizing your trade-in value requires research and negotiation skills:
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">1. Research Your Car's Value</div>
                    <p className="text-sm text-gray-700">Use KBB.com, Edmunds, or NADA to find your car's trade-in value. Check "Trade-In" value, not "Private Party" (which is higher).</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">2. Consider Private Sale</div>
                    <p className="text-sm text-gray-700">Selling privately typically nets $1,000-2,000 more than trade-in, but requires time, effort, and handling paperwork. Worth it for higher-value vehicles.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">3. Get Multiple Offers</div>
                    <p className="text-sm text-gray-700">Get trade-in quotes from multiple dealers, CarMax, Carvana, and Vroom. Dealers may offer more if you're buying from them.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">4. Negotiate Separately</div>
                    <p className="text-sm text-gray-700">Negotiate new car price first, THEN discuss trade-in. Don't let dealer combine them - you'll lose track of the actual deal.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">5. Clean and Detail Your Car</div>
                    <p className="text-sm text-gray-700">A $150 professional detail can increase trade-in value by $300-500. First impressions matter to dealers.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">6. Timing Matters</div>
                    <p className="text-sm text-gray-700">Trade in before major repairs needed. End of month/quarter, dealers may offer more to hit sales targets. SUVs worth more in fall/winter, convertibles in spring/summer.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Loan Term Comparison Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Impact of Loan Term Length</h3>
              <p className="text-gray-700 mb-4">
                Comparison based on $25,000 loan at 7% APR:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Loan Term</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">Monthly Payment</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">Total Interest</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">Total Paid</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-green-50">
                      <td className="px-4 py-3 font-semibold">36 months (3 years)</td>
                      <td className="px-4 py-3 text-center font-bold">$773</td>
                      <td className="px-4 py-3 text-center text-green-600 font-bold">$2,817</td>
                      <td className="px-4 py-3 text-center">$27,817</td>
                      <td className="px-4 py-3 text-xs">Best for minimizing interest</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">48 months (4 years)</td>
                      <td className="px-4 py-3 text-center font-bold">$599</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-bold">$3,752</td>
                      <td className="px-4 py-3 text-center">$28,752</td>
                      <td className="px-4 py-3 text-xs">Balanced choice (recommended)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold">60 months (5 years)</td>
                      <td className="px-4 py-3 text-center font-bold">$495</td>
                      <td className="px-4 py-3 text-center text-orange-600 font-bold">$4,716</td>
                      <td className="px-4 py-3 text-center">$29,716</td>
                      <td className="px-4 py-3 text-xs">Common but expensive</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">72 months (6 years)</td>
                      <td className="px-4 py-3 text-center font-bold">$420</td>
                      <td className="px-4 py-3 text-center text-red-600 font-bold">$5,213</td>
                      <td className="px-4 py-3 text-center">$30,213</td>
                      <td className="px-4 py-3 text-xs">High risk of being upside-down</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="px-4 py-3 font-semibold">84 months (7 years)</td>
                      <td className="px-4 py-3 text-center font-bold">$367</td>
                      <td className="px-4 py-3 text-center text-red-600 font-bold">$5,830</td>
                      <td className="px-4 py-3 text-center">$30,830</td>
                      <td className="px-4 py-3 text-xs">Not recommended - avoid</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                <strong>Key insight:</strong> The $353/month savings from 36 to 84 months costs you $3,013 more in interest. Shorter terms save thousands!
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is a good interest rate for a car loan?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      As of 2024, good auto loan rates vary by credit score and vehicle type. New car loans: Excellent credit (720+) gets 5-6%, good credit (680-719) gets 6-8%, fair credit (620-679) gets 8-12%. Used car loans are typically 1-3% higher. Credit unions often offer the best rates, sometimes 0.5-1% lower than banks. Dealer financing can have promotional 0% APR but may require sacrificing rebates. Shop multiple lenders to compare rates - even 1% difference saves thousands over the loan term.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much should I put down on a car?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Financial experts recommend a 20% down payment for new cars and 10% for used cars. This helps you: 1) Avoid being upside-down on the loan (owing more than car's worth), 2) Lower monthly payments, 3) Pay less interest overall, 4) Potentially qualify for better interest rates. For a $30,000 car, that's $6,000 down. If you can't afford 20%, aim for at least 10% minimum. Larger down payments are especially important for new cars which lose 20% value in year one. Consider saving longer rather than buying with minimal down payment.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the best car loan term length?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The ideal car loan term is 36-48 months (3-4 years) to balance affordable payments with total interest cost. Shorter terms (24-36 months) save the most interest but have higher monthly payments. Longer terms (60-84 months) have lower monthly payments but you'll pay significantly more interest and risk being upside-down longer. For example, a $25,000 loan at 7%: 36 months = $773/month, $2,817 interest; 72 months = $420/month, $5,213 interest. Never exceed the vehicle's useful life - ideally, you should own the car outright before it needs major repairs.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Should I buy new or used car for better value?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Used cars typically offer better value due to avoiding steep first-year depreciation. New cars lose 20% value driving off the lot and 15% per year for years 2-3, totaling 50-60% depreciation in 5 years. A 2-3 year old certified pre-owned (CPO) car offers the sweet spot: significant depreciation already occurred, still under warranty, modern features, and lower price. However, new cars have advantages: lower interest rates (often 2-3% less), full warranty, latest safety/tech, no hidden issues. Calculate total 5-year cost including purchase, financing, insurance, and depreciation to compare true value.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How does my trade-in affect my car loan?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Your trade-in value directly reduces the loan amount needed, lowering monthly payments and total interest paid. If your trade-in is worth $5,000 and you're buying a $30,000 car, you only finance $25,000 (plus tax/fees). Important considerations: 1) Research your car's value using KBB or Edmunds before visiting dealerships, 2) If you still owe money (upside-down), that negative equity may roll into new loan, 3) Sometimes selling privately gets $1,000-2,000 more than dealer trade-in, 4) Trading at same brand dealership may get better value. Get trade-in offer in writing before negotiating new car price.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is being upside-down on a car loan?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Being upside-down (or underwater) means owing more on your loan than the car is worth. Example: You owe $20,000 but the car is only worth $15,000 - you're $5,000 upside-down. This happens from: minimal down payment, long loan terms (72-84 months), high interest rates, or rapid depreciation. It's problematic if you need to sell/trade the car - you must pay the difference out of pocket. If the car is totaled, insurance pays current value ($15,000) but you still owe the lender $5,000 (unless you have GAP insurance). Avoid by: 20% down payment, shorter loan terms, and not rolling negative equity from previous loans.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Should I get GAP insurance for my car loan?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      GAP (Guaranteed Asset Protection) insurance is highly recommended if: 1) You put less than 20% down, 2) You're financing for 60+ months, 3) You bought a car that depreciates quickly (luxury cars, EVs), 4) You rolled negative equity into the loan. GAP covers the difference between insurance payout and loan balance if car is totaled/stolen. Example: Car totaled, worth $15,000, owe $22,000 - GAP pays the $7,000 difference. Cost is $400-700 for loan term (don't buy dealer GAP at $600-900; get from insurance company for $20/year instead). Skip GAP if you put 20%+ down or are almost paid off.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much car can I afford on my salary?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Financial experts recommend the 20/4/10 rule: 20% down payment, finance for no more than 4 years, and total monthly vehicle expenses (payment + insurance + gas + maintenance) should not exceed 10% of gross monthly income. Alternative rule: total car payment shouldn't exceed 15-20% of take-home pay. Example: $60,000 annual salary = $5,000/month gross. Maximum total vehicle cost = $500/month. If insurance is $150 and gas/maintenance is $150, car payment should be $200 or less. Consider: buying used saves on purchase price and insurance; higher credit scores get lower rates; longer commutes increase gas/maintenance costs.
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
                <a href="/loan-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate any type of loan payment</p>
                </a>
                <a href="/payment-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Payment Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">General installment calculator</p>
                </a>
                <a href="/interest-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Interest Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate compound interest</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

