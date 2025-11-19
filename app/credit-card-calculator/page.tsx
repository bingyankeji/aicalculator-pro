import type { Metadata } from 'next';
import { CreditCardCalculator } from '@/components/Calculator/CreditCardCalculator';
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
  title: 'Credit Card Calculator (Free, No signup) - Payoff Plan | AICalculator',
  description: 'Free credit card calculator with no sign-up required. Calculate credit card payoff time, total interest, and compare payment strategies. Shows how much you can save by paying more than the minimum. Plan your debt freedom today.',
  keywords: [
    'credit card calculator',
    'free credit card calculator',
    'credit card calculator no signup',
    'credit card payoff calculator',
    'credit card payment calculator',
    'credit card interest calculator',
    'minimum payment calculator',
    'debt payoff calculator',
    'credit card debt calculator',
    'how long to pay off credit card',
    'credit card interest savings',
    'pay off credit card faster',
    'credit card repayment calculator',
    'balance transfer calculator',
    'credit card apr calculator',
    'debt free calculator',
    'credit card strategy calculator',
    'credit card paydown calculator',
    'credit card consolidation calculator',
    'credit card debt relief calculator',
    'credit card monthly payment calculator',
    'credit card balance calculator',
    'credit card debt payoff planner',
    'credit card interest rate calculator'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Credit Card Calculator (Free, No signup) - AICalculator',
    description: 'Free credit card calculator with no sign-up required. Calculate your credit card payoff time, compare payment strategies, and discover how much interest you can save. Get personalized recommendations for debt freedom.',
    type: 'website',
    url: getUrl('/credit-card-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [
      {
        url: getOgImage('credit-card'),
        width: 1200,
        height: 630,
        alt: 'Free Credit Card Calculator - No Sign-up Required',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Card Calculator (Free, No signup) - AICalculator',
    description: 'Free credit card calculator with no sign-up required. Calculate payoff time, compare strategies, and save thousands in interest with personalized recommendations.',
    images: [getOgImage('credit-card')],
    site: '@AICalculator',
    creator: '@aicalculator',
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
  alternates: {
    canonical: getUrl('/credit-card-calculator'),
  },
  other: {
    'last-modified': new Date().toISOString(),
  },
};

export default function CreditCardCalculatorPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Credit Card Calculator",
        "@id": getWebAppId('/credit-card-calculator'),
        "url": getUrl('/credit-card-calculator'),
        "description": "Calculate credit card payoff time, total interest, and compare payment strategies. See how much you can save by paying more than the minimum payment.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Payoff Time Calculator",
          "Total Interest Calculation",
          "Minimum vs Custom Payment Comparison",
          "4 Payment Strategies Analysis",
          "Interest Savings Calculator",
          "APR Impact Analysis",
          "Debt Freedom Timeline",
          "Personalized Recommendations",
          "Balance Transfer Advice"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/credit-card-calculator'),
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
            "name": "Financial Calculators",
            "item": getUrl('/financial')
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Credit Card Calculator",
            "item": getUrl('/credit-card-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/credit-card-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long will it take to pay off my credit card?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Payoff time depends on your balance, interest rate, and monthly payment. Paying only the minimum (typically 2% of balance) can take 10-20+ years. For example, a $5,000 balance at 18% APR with $100 minimum payment takes 94 months (7.8 years). Increasing payment to $200/month reduces it to 31 months (2.6 years) and saves $2,400 in interest."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if I only pay the minimum payment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Paying only the minimum extends debt for years and costs thousands in interest. Most minimum payments are 2-3% of balance, which barely covers interest charges. On a $5,000 balance at 18% APR, you'd pay $3,200+ in interest over 7-8 years. Even a small increase saves significantly—$150/month pays off in 4 years with $1,400 interest."
            }
          },
          {
            "@type": "Question",
            "name": "How can I pay off credit card debt faster?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To pay off credit card debt faster: 1) Pay more than the minimum (even $50 extra helps), 2) Consider balance transfer to 0% APR card (12-18 months), 3) Use debt avalanche method (highest rate first), 4) Cut expenses and apply savings to debt, 5) Consider debt consolidation loan (8-12% vs 18-25% credit card rates), 6) Avoid new charges while paying off existing debt."
            }
          },
          {
            "@type": "Question",
            "name": "What is a good interest rate for a credit card?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Credit card APR ranges: Excellent credit (12-15%), Good credit (15-20%), Fair credit (20-25%), Poor credit (25-30%). The average is around 18-20%. Anything below 15% is good. If your rate exceeds 20%, consider balance transfer cards with 0% intro APR (12-21 months) or personal loans (typically 8-15% for good credit)."
            }
          },
          {
            "@type": "Question",
            "name": "Should I do a balance transfer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Balance transfer makes sense if: 1) You have good credit (670+), 2) Current APR is high (18%+), 3) You have large balance ($3,000+), 4) You can pay off during 0% period (12-21 months), 5) Transfer fee (3-5%) is less than interest saved. Example: $5,000 at 20% APR costs $1,000/year interest. 3% transfer fee ($150) saves $850 first year if paid off during promo period."
            }
          },
          {
            "@type": "Question",
            "name": "What is the minimum payment on a credit card?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Minimum payment is typically 2-3% of your balance or $25-$35 (whichever is higher). For example, on a $2,000 balance with 2% minimum, you'd pay $40/month. Some cards use formula: 1% of balance + interest + fees. While minimum keeps account in good standing, it extends payoff time significantly and maximizes interest charges. Always pay more than minimum when possible."
            }
          },
          {
            "@type": "Question",
            "name": "How much interest will I pay on my credit card?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Total interest depends on balance, APR, and payment amount. Example: $5,000 at 18.99% APR. Minimum payment ($100/mo): $3,263 interest over 94 months. Double payment ($200/mo): $956 interest over 31 months—saves $2,307! Use our calculator to see your exact numbers. Higher APR and lower payments = more interest. Even small payment increases save hundreds to thousands in interest."
            }
          },
          {
            "@type": "Question",
            "name": "Is it better to pay off credit card or save money?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Generally, pay off high-interest credit card debt first (18-25% APR) before aggressive saving (1-5% interest). Exception: Keep $1,000 emergency fund first to avoid new debt. Strategy: 1) Save $1,000 emergency fund, 2) Pay minimum on all debts, 3) Attack highest-rate debt with extra payments, 4) Once debt-free, build 3-6 month emergency fund, 5) Then maximize savings/investing. Credit card interest (18%+) costs more than savings earn (1-5%)."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/credit-card-calculator'),
        "name": "How to Use Credit Card Payoff Calculator",
        "description": "Step-by-step guide to calculating credit card payoff time and interest savings",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": {
          "@type": "HowToTool",
          "name": "Credit Card Calculator"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Current Balance",
            "text": "Input your total credit card debt amount. If you have multiple cards, you can calculate each separately or combine balances.",
            "url": getStepUrl('/credit-card-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Interest Rate (APR)",
            "text": "Input your Annual Percentage Rate (APR), found on your credit card statement. This is the yearly interest rate charged on your balance.",
            "url": getStepUrl('/credit-card-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Set Minimum Payment",
            "text": "Choose percentage (typically 2-3% of balance) or fixed dollar amount. Check your statement for your card's minimum payment calculation method.",
            "url": getStepUrl('/credit-card-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Enter Your Monthly Payment",
            "text": "Input how much you plan to pay each month. Always pay more than the minimum to save interest and pay off faster.",
            "url": getStepUrl('/credit-card-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Calculate and Compare",
            "text": "Click 'Calculate Payoff' to see 4 payment strategies: minimum payment, your custom payment, 3-year payoff, and 1-year payoff. Compare interest savings and payoff times.",
            "url": getStepUrl('/credit-card-calculator', 5)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/credit-card-calculator'),
        "headline": "Credit Card Calculator - Complete Guide to Paying Off Credit Card Debt",
        "description": "Comprehensive guide to credit card debt payoff with free calculator. Learn strategies to eliminate debt faster, save thousands in interest, and achieve financial freedom.",
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
        "image": getOgImage('credit-card'),
        "articleBody": "Eliminate credit card debt with smart payment strategies. Compare minimum payments vs aggressive payoff plans, understand how interest compounds, and discover proven methods to become debt-free faster while saving thousands in interest charges."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* SEO: Hidden H1 */}
      <h1 className="sr-only">Credit Card Calculator - Free Credit Card Payoff Calculator with Interest Savings and Payment Strategy Comparison</h1>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <a href="/" className="hover:text-blue-600 transition-colors">
                Home
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <a href="/financial" className="hover:text-blue-600 transition-colors">
                Financial Calculators
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-semibold">Credit Card Calculator</li>
          </ol>
        </div>
      </nav>

      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Calculator Component */}
          <CreditCardCalculator />

        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto prose prose-lg">
          {/* What is Credit Card Calculator */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What is a Credit Card Payoff Calculator?</h2>
            <p className="text-gray-700 mb-4">
              A <strong>Credit Card Payoff Calculator</strong> helps you understand how long it will take to eliminate your credit card debt and how much interest you'll pay based on your monthly payment amount. It compares different payment strategies to show you the fastest and most cost-effective way to become debt-free.
            </p>
            <p className="text-gray-700 mb-4">
              This calculator is essential for anyone carrying credit card balances, as it reveals the true cost of minimum payments and shows how even small payment increases can save thousands of dollars in interest charges.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="text-gray-700">
                <strong>Key Insight:</strong> Paying only the minimum on a $5,000 balance at 18% APR takes 7.8 years and costs $3,263 in interest. Doubling your payment cuts time to 2.6 years and saves $2,307!
              </p>
            </div>
          </section>

          {/* How Credit Card Interest Works */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Credit Card Interest Works</h2>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Annual Percentage Rate (APR)</h3>
            <p className="text-gray-700 mb-4">
              APR is the yearly interest rate charged on your outstanding balance. Credit card companies calculate interest daily using your APR divided by 365, then multiply by your daily balance.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
              <p className="font-bold text-gray-900 mb-2">Interest Calculation Formula:</p>
              <p className="font-mono text-sm">Daily Rate = APR ÷ 365</p>
              <p className="font-mono text-sm">Daily Interest = Balance × Daily Rate</p>
              <p className="font-mono text-sm">Monthly Interest ≈ Balance × (APR ÷ 12)</p>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">Typical APR Ranges</h3>
            <table className="min-w-full border-collapse border border-gray-300 mb-4">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Credit Score</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Typical APR Range</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Example</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-2">Excellent (750+)</td>
                  <td className="border border-gray-300 px-4 py-2">12-15%</td>
                  <td className="border border-gray-300 px-4 py-2">Premium rewards cards</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Good (700-749)</td>
                  <td className="border border-gray-300 px-4 py-2">15-20%</td>
                  <td className="border border-gray-300 px-4 py-2">Standard credit cards</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Fair (650-699)</td>
                  <td className="border border-gray-300 px-4 py-2">20-25%</td>
                  <td className="border border-gray-300 px-4 py-2">Higher-rate cards</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border border-gray-300 px-4 py-2">Poor (Below 650)</td>
                  <td className="border border-gray-300 px-4 py-2">25-30%+</td>
                  <td className="border border-gray-300 px-4 py-2">Secured/subprime cards</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Minimum Payment Trap */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Minimum Payment Trap</h2>
            <p className="text-gray-700 mb-4">
              Minimum payments keep you in debt for years. They're designed to barely cover interest charges, keeping your principal balance high and maximizing the bank's profit.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mb-3">Real-World Example</h3>
            <div className="bg-red-50 p-6 rounded-lg mb-4">
              <p className="font-bold text-gray-900 mb-2">Scenario: $8,000 balance at 22% APR</p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Minimum Payment Only ($160/month):</strong></p>
                <p className="ml-4">• Payoff Time: 18.5 years</p>
                <p className="ml-4">• Total Interest: $15,432</p>
                <p className="ml-4">• Total Paid: $23,432</p>
              </div>
              <div className="mt-4 space-y-2 text-gray-700">
                <p><strong>$300/month Payment:</strong></p>
                <p className="ml-4">• Payoff Time: 3.4 years</p>
                <p className="ml-4">• Total Interest: $2,846</p>
                <p className="ml-4">• Total Paid: $10,846</p>
                <p className="mt-2 font-bold text-green-600">💰 Saves $12,586 and 15 years!</p>
              </div>
            </div>
          </section>

          {/* Payment Strategies */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Credit Card Payoff Strategies</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">1. Debt Avalanche Method (Highest Interest First)</h3>
                <p className="text-gray-700 mb-2">
                  Pay minimums on all cards, then put extra money toward the highest APR card. Mathematically optimal—saves the most money.
                </p>
                <p className="text-sm text-gray-600">Best for: Maximizing interest savings</p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">2. Debt Snowball Method (Smallest Balance First)</h3>
                <p className="text-gray-700 mb-2">
                  Pay minimums on all cards, then attack the smallest balance first. Quick wins boost motivation.
                </p>
                <p className="text-sm text-gray-600">Best for: Psychological momentum and motivation</p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">3. Balance Transfer to 0% APR</h3>
                <p className="text-gray-700 mb-2">
                  Transfer high-interest balances to a 0% intro APR card (12-21 months). Pay 3-5% transfer fee but save on interest if paid off during promo period.
                </p>
                <p className="text-sm text-gray-600">Best for: Good credit (670+) with payoff plan</p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">4. Debt Consolidation Loan</h3>
                <p className="text-gray-700 mb-2">
                  Take personal loan (8-15% APR) to pay off multiple high-interest credit cards (18-25% APR). One fixed payment, lower rate.
                </p>
                <p className="text-sm text-gray-600">Best for: Multiple cards, good credit, need simplified payments</p>
              </div>
            </div>
          </section>

          {/* Tips to Pay Off Faster */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">10 Tips to Pay Off Credit Card Debt Faster</h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">1.</span>
                <span><strong>Pay More Than Minimum:</strong> Even $25-50 extra monthly saves hundreds in interest</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">2.</span>
                <span><strong>Make Biweekly Payments:</strong> Pay half your monthly amount every two weeks = 13 payments/year instead of 12</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">3.</span>
                <span><strong>Use Windfalls:</strong> Apply tax refunds, bonuses, or gifts directly to principal</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">4.</span>
                <span><strong>Cut Expenses:</strong> Cancel unused subscriptions, reduce dining out, redirect savings to debt</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">5.</span>
                <span><strong>Increase Income:</strong> Side hustle, freelance work, sell unused items—100% to debt</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">6.</span>
                <span><strong>Stop New Charges:</strong> Freeze card or remove from wallet while paying off balance</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">7.</span>
                <span><strong>Negotiate Lower APR:</strong> Call card issuer, ask for rate reduction (works 50% of the time)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">8.</span>
                <span><strong>Automate Payments:</strong> Set up automatic payments higher than minimum—never miss a payment</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">9.</span>
                <span><strong>Track Progress:</strong> Use our calculator monthly to see debt shrinking—stay motivated</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">10.</span>
                <span><strong>Consider Credit Counseling:</strong> Nonprofit agencies offer free debt management plans if overwhelmed</span>
              </li>
            </ol>
          </section>

          {/* Balance Transfer Guide */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Balance Transfer Guide: Is It Right for You?</h2>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-3">When Balance Transfer Makes Sense</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Credit score 670+ (needed for approval)</li>
              <li>Current APR is 18%+ (high-interest debt)</li>
              <li>Balance $3,000+ (makes transfer fee worthwhile)</li>
              <li>Can pay off during 0% period (12-21 months)</li>
              <li>Won't charge new purchases during payoff</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">Balance Transfer Math Example</h3>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="font-bold text-gray-900 mb-2">Scenario: $10,000 at 20% APR</p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Option 1: Keep Current Card</strong></p>
                <p className="ml-4">• 18 months of interest (if paid $600/mo): $1,800</p>
                
                <p className="mt-3"><strong>Option 2: Balance Transfer (3% fee, 0% for 18 months)</strong></p>
                <p className="ml-4">• Transfer Fee: $300</p>
                <p className="ml-4">• Interest: $0 (if paid off in 18 months)</p>
                <p className="ml-4">• Total Cost: $300</p>
                
                <p className="mt-2 font-bold text-green-600">💰 Saves $1,500!</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
              <p className="text-gray-700">
                <strong>Warning:</strong> Balance transfer only works if you pay off balance before 0% ends. After promo period, rates jump to 18-25%. Create strict payoff plan before transferring.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQ)</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">1. How long will it take to pay off my credit card?</h3>
                <p className="text-gray-700">
                  Payoff time depends on your balance, interest rate, and monthly payment. Paying only the minimum (typically 2% of balance) can take 10-20+ years. For example, a $5,000 balance at 18% APR with $100 minimum payment takes 94 months (7.8 years). Increasing payment to $200/month reduces it to 31 months (2.6 years) and saves $2,400 in interest.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">2. What happens if I only pay the minimum payment?</h3>
                <p className="text-gray-700">
                  Paying only the minimum extends debt for years and costs thousands in interest. Most minimum payments are 2-3% of balance, which barely covers interest charges. On a $5,000 balance at 18% APR, you'd pay $3,200+ in interest over 7-8 years. Even a small increase saves significantly—$150/month pays off in 4 years with $1,400 interest.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">3. How can I pay off credit card debt faster?</h3>
                <p className="text-gray-700">
                  To pay off credit card debt faster: 1) Pay more than the minimum (even $50 extra helps), 2) Consider balance transfer to 0% APR card (12-18 months), 3) Use debt avalanche method (highest rate first), 4) Cut expenses and apply savings to debt, 5) Consider debt consolidation loan (8-12% vs 18-25% credit card rates), 6) Avoid new charges while paying off existing debt.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">4. What is a good interest rate for a credit card?</h3>
                <p className="text-gray-700">
                  Credit card APR ranges: Excellent credit (12-15%), Good credit (15-20%), Fair credit (20-25%), Poor credit (25-30%). The average is around 18-20%. Anything below 15% is good. If your rate exceeds 20%, consider balance transfer cards with 0% intro APR (12-21 months) or personal loans (typically 8-15% for good credit).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">5. Should I do a balance transfer?</h3>
                <p className="text-gray-700">
                  Balance transfer makes sense if: 1) You have good credit (670+), 2) Current APR is high (18%+), 3) You have large balance ($3,000+), 4) You can pay off during 0% period (12-21 months), 5) Transfer fee (3-5%) is less than interest saved. Example: $5,000 at 20% APR costs $1,000/year interest. 3% transfer fee ($150) saves $850 first year if paid off during promo period.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">6. What is the minimum payment on a credit card?</h3>
                <p className="text-gray-700">
                  Minimum payment is typically 2-3% of your balance or $25-$35 (whichever is higher). For example, on a $2,000 balance with 2% minimum, you'd pay $40/month. Some cards use formula: 1% of balance + interest + fees. While minimum keeps account in good standing, it extends payoff time significantly and maximizes interest charges. Always pay more than minimum when possible.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">7. How much interest will I pay on my credit card?</h3>
                <p className="text-gray-700">
                  Total interest depends on balance, APR, and payment amount. Example: $5,000 at 18.99% APR. Minimum payment ($100/mo): $3,263 interest over 94 months. Double payment ($200/mo): $956 interest over 31 months—saves $2,307! Use our calculator to see your exact numbers. Higher APR and lower payments = more interest. Even small payment increases save hundreds to thousands in interest.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">8. Is it better to pay off credit card or save money?</h3>
                <p className="text-gray-700">
                  Generally, pay off high-interest credit card debt first (18-25% APR) before aggressive saving (1-5% interest). Exception: Keep $1,000 emergency fund first to avoid new debt. Strategy: 1) Save $1,000 emergency fund, 2) Pay minimum on all debts, 3) Attack highest-rate debt with extra payments, 4) Once debt-free, build 3-6 month emergency fund, 5) Then maximize savings/investing. Credit card interest (18%+) costs more than savings earn (1-5%).
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Financial Calculators</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/debt-payoff-calculator" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-600 mb-2">💸 Debt Payoff Calculator</h3>
                <p className="text-sm text-gray-600">Compare debt snowball vs avalanche methods for multiple debts</p>
              </a>
              <a href="/loan-calculator" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-600 mb-2">💰 Loan Calculator</h3>
                <p className="text-sm text-gray-600">Calculate personal loan payments and compare to credit card debt</p>
              </a>
              <a href="/interest-calculator" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-600 mb-2">📈 Interest Calculator</h3>
                <p className="text-sm text-gray-600">Understand compound interest and savings growth</p>
              </a>
              <a href="/savings-calculator" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-600 mb-2">🐷 Savings Calculator</h3>
                <p className="text-sm text-gray-600">Plan your savings goals after becoming debt-free</p>
              </a>
            </div>
          </section>
        </div>
        </div>
      </div>
    </div>
  );
}

