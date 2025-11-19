import { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { DebtPayoffCalculator } from "@/components/Calculator/DebtPayoffCalculator";

export const metadata: Metadata = {
  title: "Debt Payoff Calculator (Free, No signup) - Get Debt Free | AICalculator",
  description: "Free debt payoff calculator with no sign-up required. Compare avalanche and snowball methods. Calculate debt-free date, total interest, and create a customized debt repayment plan. Pay off credit cards and loans faster.",
  keywords: [
    "debt payoff calculator",
    "free debt payoff calculator",
    "debt payoff calculator no signup",
    "debt repayment calculator",
    "avalanche method calculator",
    "snowball method calculator",
    "credit card payoff calculator",
    "debt free calculator",
    "debt elimination calculator",
    "pay off debt calculator",
    "debt reduction calculator",
    "debt snowball calculator",
    "debt avalanche calculator",
    "get out of debt calculator",
    "debt payment calculator",
    "multiple debt calculator",
    "credit card debt calculator",
  ],
  openGraph: {
    title: "Debt Payoff Calculator (Free, No signup) - AICalculator",
    description: "Free debt payoff calculator with no sign-up required. Compare debt repayment strategies and calculate your debt-free date. Find the fastest and cheapest way to pay off your debts.",
    type: "website",
    url: "https://aicalculator.pro/debt-payoff-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Debt Payoff Calculator (Free, No signup) - AICalculator",
    description: "Free debt payoff calculator with no sign-up required. Compare avalanche vs snowball methods and create your debt repayment plan.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.pro/debt-payoff-calculator",
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

export default function DebtPayoffCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Debt Payoff Calculator",
        "url": "https://aicalculator.pro/debt-payoff-calculator",
        "description": "Free online debt payoff calculator to compare avalanche and snowball debt repayment methods. Calculate your debt-free date, total interest costs, and create a personalized debt elimination plan.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Compare avalanche vs snowball debt payoff methods",
          "Calculate debt-free date",
          "Track multiple debts (credit cards, loans, etc.)",
          "Calculate total interest savings",
          "Customizable extra monthly payments",
          "Side-by-side strategy comparison",
          "Prioritized payoff order",
          "Visual debt elimination timeline",
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
            "item": "https://aicalculator.pro"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Calculators",
            "item": "https://aicalculator.pro/calculators"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Debt Payoff Calculator",
            "item": "https://aicalculator.pro/debt-payoff-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the debt avalanche method?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The debt avalanche method is a debt repayment strategy where you pay off debts with the highest interest rates first while making minimum payments on other debts. This method saves you the most money on interest over time. For example, if you have a credit card at 19.99% APR and a personal loan at 8% APR, you'd focus extra payments on the credit card first. Once paid off, you roll that payment to the next highest-rate debt."
            }
          },
          {
            "@type": "Question",
            "name": "What is the debt snowball method?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The debt snowball method prioritizes paying off your smallest balance debts first, regardless of interest rate. You make minimum payments on all debts but put extra money toward the smallest balance. Once that's paid off, you roll that payment to the next smallest debt, creating a 'snowball' effect. This method provides psychological wins through quick payoffs, which can boost motivation to stay debt-free."
            }
          },
          {
            "@type": "Question",
            "name": "Which debt payoff method is better - avalanche or snowball?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The avalanche method saves more money on interest (typically hundreds to thousands of dollars), making it mathematically superior. However, the snowball method provides faster psychological wins that help many people stay motivated. Choose avalanche if you're disciplined and want to minimize costs. Choose snowball if you need motivational boosts from quick wins. Our calculator shows you the exact savings difference for your specific debts."
            }
          },
          {
            "@type": "Question",
            "name": "How much extra payment should I make to pay off debt faster?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Aim to pay at least $100-200 extra per month if possible, but any amount helps. Even $50 extra monthly can save hundreds in interest and shave months off your payoff timeline. A good rule: pay 20% more than minimum payments. For example, if your minimums total $500/month, try to pay $600/month. Use our calculator to see exactly how different extra payment amounts affect your payoff date and total interest."
            }
          },
          {
            "@type": "Question",
            "name": "What types of debt should I include in my debt payoff plan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Include all unsecured debts with fixed balances: credit cards, personal loans, medical debt, student loans, payday loans, and collection accounts. Don't include mortgage or car loans in this calculator (use specialized calculators for those). Focus on high-interest debt first, especially credit cards which often charge 15-25% APR. Payday loans (often 400%+ APR) should be your highest priority."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to become debt-free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Debt payoff time varies widely based on your debt amount, interest rates, and monthly payments. Typical timelines: $5,000 debt with $200/month payments = 2-3 years, $15,000 debt with $500/month = 3-4 years, $30,000 debt with $800/month = 4-5 years. Increasing your monthly payment by even $100 can reduce payoff time by 6-18 months. Use our calculator with your specific numbers for an accurate timeline."
            }
          },
          {
            "@type": "Question",
            "name": "Should I save money or pay off debt first?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Build a small emergency fund ($500-1,000) first to avoid new debt from unexpected expenses. Then aggressively pay off high-interest debt (above 7-8% APR), especially credit cards. Once high-interest debt is gone, balance debt payoff with building a 3-6 month emergency fund. Low-interest debt (under 5% APR) can be paid normally while you save and invest more. This balanced approach prevents financial setbacks."
            }
          },
          {
            "@type": "Question",
            "name": "Can I negotiate lower interest rates on my debt?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Call your credit card companies and ask for a lower APR, especially if you have good payment history. Success rates are about 50-70% for rate reductions of 2-5%. Also consider balance transfer cards (0% APR for 12-18 months), debt consolidation loans (typically 6-12% APR), or credit counseling programs. Even a 5% rate reduction can save hundreds of dollars. Update your interest rates in our calculator to see potential savings."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Debt Payoff Calculator",
        "description": "Step-by-step guide to calculating your debt-free date and comparing repayment strategies",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose Your Strategy",
            "text": "Select between Avalanche Method (highest interest first - saves the most money) or Snowball Method (smallest balance first - provides quick wins). Both are effective; choose based on your personality and financial goals."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Your Debts",
            "text": "Add each debt with its current balance, interest rate (APR), and minimum monthly payment. Include credit cards, personal loans, medical bills, and other unsecured debts. You can add unlimited debts using the 'Add Debt' button."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Set Extra Payment Amount",
            "text": "Enter how much extra you can pay each month beyond minimum payments. Even $50-100 extra makes a big difference. This extra amount will be applied to your priority debt based on your chosen strategy."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Review Results and Compare",
            "text": "See your debt-free date, total interest costs, and payoff order. Compare avalanche vs snowball methods side-by-side to see the difference in interest savings. Use these insights to choose the best strategy for your situation."
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
      
      <h1 className="sr-only">Debt Payoff Calculator - Free Debt Repayment Planner with Avalanche and Snowball Methods for Credit Card and Loan Payoff</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Debt Payoff Calculator (Free, No signup)"
        calculatorUrl="/debt-payoff-calculator"
      />

      <section className="py-8 md:py-12" aria-label="Debt Payoff Calculator Tool">
        <div className="container mx-auto px-4">
          <DebtPayoffCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Debt Payoff Guide">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Complete Guide to Getting Out of Debt
            </h2>

            {/* Strategy Comparison */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-blue-700 mb-4">💎 Debt Avalanche Method</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>Strategy:</strong> Pay off debts with the highest interest rates first
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <strong className="text-blue-900">✅ Pros:</strong>
                    <ul className="list-disc list-inside text-sm text-blue-800 mt-1 space-y-1">
                      <li>Saves the most money on interest</li>
                      <li>Mathematically optimal approach</li>
                      <li>Fastest debt reduction by dollar amount</li>
                      <li>Best for financially disciplined people</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <strong className="text-red-900">❌ Cons:</strong>
                    <ul className="list-disc list-inside text-sm text-red-800 mt-1 space-y-1">
                      <li>Can take longer to see first debt paid off</li>
                      <li>May feel less motivating initially</li>
                      <li>Requires patience and discipline</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600 italic mt-3">
                    💰 Best for: Those who want to minimize total interest costs and have strong financial discipline
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-purple-700 mb-4">⚡ Debt Snowball Method</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>Strategy:</strong> Pay off debts with the smallest balances first
                  </p>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <strong className="text-purple-900">✅ Pros:</strong>
                    <ul className="list-disc list-inside text-sm text-purple-800 mt-1 space-y-1">
                      <li>Quick wins boost motivation</li>
                      <li>See progress faster</li>
                      <li>Simplifies finances quickly</li>
                      <li>Better psychological momentum</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <strong className="text-red-900">❌ Cons:</strong>
                    <ul className="list-disc list-inside text-sm text-red-800 mt-1 space-y-1">
                      <li>Costs more in interest over time</li>
                      <li>Not mathematically optimal</li>
                      <li>Takes longer to reduce high-interest debt</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600 italic mt-3">
                    🎯 Best for: Those who need motivational wins and struggle with sticking to financial plans
                  </p>
                </div>
              </div>
            </div>

            {/* Real Example */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-orange-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Real-World Example: $20,000 in Debt</h3>
              <div className="bg-white rounded-lg p-5 mb-4">
                <h4 className="font-bold text-gray-900 mb-3">Scenario:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span>Credit Card 1: $8,000</span>
                    <span className="font-semibold">19.99% APR</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Credit Card 2: $2,000</span>
                    <span className="font-semibold">15.49% APR</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Personal Loan: $10,000</span>
                    <span className="font-semibold">8.5% APR</span>
                  </div>
                  <div className="flex justify-between pt-2 font-bold">
                    <span>Total Monthly Payment:</span>
                    <span>$700 (minimum $500 + $200 extra)</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-2">Avalanche Method:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Time to debt-free:</span>
                      <strong>32 months</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Total interest:</span>
                      <strong className="text-red-600">$3,245</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Total paid:</span>
                      <strong>$23,245</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-bold text-purple-900 mb-2">Snowball Method:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Time to debt-free:</span>
                      <strong>33 months</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Total interest:</span>
                      <strong className="text-red-600">$3,567</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Total paid:</span>
                      <strong>$23,567</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                <strong className="text-green-700">💰 Avalanche saves $322 and pays off 1 month faster in this scenario</strong>
              </div>
            </div>

            {/* Step-by-Step Guide */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">5-Step Debt Elimination Plan</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">List All Your Debts</h4>
                    <p className="text-gray-700 text-sm">
                      Write down every debt: balance, interest rate, minimum payment, and due date. Include credit cards, personal loans, medical bills, student loans, and any other money owed. Don't forget store cards and collection accounts.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Build a Small Emergency Fund</h4>
                    <p className="text-gray-700 text-sm">
                      Save $500-1,000 first to handle small emergencies without adding new debt. Park this in a high-yield savings account. This prevents you from using credit cards when unexpected expenses arise, which would derail your debt payoff progress.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Choose Your Strategy</h4>
                    <p className="text-gray-700 text-sm">
                      Pick avalanche (minimize interest) or snowball (maximize motivation). Use our calculator to see the difference. Stick with your choice - consistency matters more than the perfect strategy. You can't fail if you keep paying extra every month.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Find Extra Money</h4>
                    <p className="text-gray-700 text-sm">
                      Review your budget to find $100-500/month extra. Cut subscriptions, reduce dining out, sell unused items, pick up a side gig, or use bonuses/tax refunds. Every extra dollar goes toward debt. Automate extra payments so you can't spend that money elsewhere.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Track Progress and Stay Motivated</h4>
                    <p className="text-gray-700 text-sm">
                      Update this calculator monthly to see your progress. Celebrate small wins (each debt paid off). Join debt-free communities for support. Visual trackers (charts, graphs) help maintain momentum. Remember: becoming debt-free is a marathon, not a sprint.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips to Pay Off Debt Faster */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 10 Ways to Pay Off Debt Faster</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Make bi-weekly payments</strong> - Pay half your monthly payment every 2 weeks (13 payments/year instead of 12)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Use windfalls</strong> - Put tax refunds, bonuses, and gifts toward debt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Start a side hustle</strong> - Freelance, gig work, or online business</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Sell unused items</strong> - eBay, Facebook Marketplace, garage sales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Cut one major expense</strong> - Cancel cable, downgrade car, move to cheaper housing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Negotiate bills</strong> - Call providers for better rates on phone, internet, insurance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Use cashback rewards</strong> - Put credit card cashback directly toward debt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Refinance or consolidate</strong> - Lower interest rates = more goes to principal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Pack lunch</strong> - Eating out less saves $200-400/month for most people</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Round up payments</strong> - Pay $105 instead of $100, $255 instead of $250</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Common Debt Payoff Mistakes</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Paying minimums only</strong> - You'll be in debt for 20+ years and pay 2-3x the balance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>No emergency fund</strong> - Unexpected costs force you to add new debt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Continuing to use credit cards</strong> - Stop using cards while paying them off</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Balance transfers without a plan</strong> - 0% APR doesn't help if you keep spending</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Draining retirement accounts</strong> - 401(k) loans have huge long-term costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Ignoring the root cause</strong> - Fix spending habits or debt returns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Debt consolidation scams</strong> - Research companies; many charge huge fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Being too aggressive</strong> - Leave room for fun or you'll burn out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Not tracking progress</strong> - Monthly check-ins keep you motivated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Giving up too soon</strong> - Most people quit after 3 months; push through!</span>
                  </li>
                </ul>
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
                    What is the debt avalanche method?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The debt avalanche method is a debt repayment strategy where you pay off debts with the highest interest rates first while making minimum payments on other debts. This method saves you the most money on interest over time. For example, if you have a credit card at 19.99% APR and a personal loan at 8% APR, you'd focus extra payments on the credit card first. Once paid off, you roll that payment to the next highest-rate debt.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the debt snowball method?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The debt snowball method prioritizes paying off your smallest balance debts first, regardless of interest rate. You make minimum payments on all debts but put extra money toward the smallest balance. Once that's paid off, you roll that payment to the next smallest debt, creating a 'snowball' effect. This method provides psychological wins through quick payoffs, which can boost motivation to stay debt-free.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Which debt payoff method is better - avalanche or snowball?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The avalanche method saves more money on interest (typically hundreds to thousands of dollars), making it mathematically superior. However, the snowball method provides faster psychological wins that help many people stay motivated. Choose avalanche if you're disciplined and want to minimize costs. Choose snowball if you need motivational boosts from quick wins. Our calculator shows you the exact savings difference for your specific debts.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much extra payment should I make to pay off debt faster?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Aim to pay at least $100-200 extra per month if possible, but any amount helps. Even $50 extra monthly can save hundreds in interest and shave months off your payoff timeline. A good rule: pay 20% more than minimum payments. For example, if your minimums total $500/month, try to pay $600/month. Use our calculator to see exactly how different extra payment amounts affect your payoff date and total interest.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What types of debt should I include in my debt payoff plan?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Include all unsecured debts with fixed balances: credit cards, personal loans, medical debt, student loans, payday loans, and collection accounts. Don't include mortgage or car loans in this calculator (use specialized calculators for those). Focus on high-interest debt first, especially credit cards which often charge 15-25% APR. Payday loans (often 400%+ APR) should be your highest priority.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How long does it take to become debt-free?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Debt payoff time varies widely based on your debt amount, interest rates, and monthly payments. Typical timelines: $5,000 debt with $200/month payments = 2-3 years, $15,000 debt with $500/month = 3-4 years, $30,000 debt with $800/month = 4-5 years. Increasing your monthly payment by even $100 can reduce payoff time by 6-18 months. Use our calculator with your specific numbers for an accurate timeline.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Should I save money or pay off debt first?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Build a small emergency fund ($500-1,000) first to avoid new debt from unexpected expenses. Then aggressively pay off high-interest debt (above 7-8% APR), especially credit cards. Once high-interest debt is gone, balance debt payoff with building a 3-6 month emergency fund. Low-interest debt (under 5% APR) can be paid normally while you save and invest more. This balanced approach prevents financial setbacks.
                    </p>
                  </div>
                </div>

                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can I negotiate lower interest rates on my debt?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes! Call your credit card companies and ask for a lower APR, especially if you have good payment history. Success rates are about 50-70% for rate reductions of 2-5%. Also consider balance transfer cards (0% APR for 12-18 months), debt consolidation loans (typically 6-12% APR), or credit counseling programs. Even a 5% rate reduction can save hundreds of dollars. Update your interest rates in our calculator to see potential savings.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Financial Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/loan-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate loan payments and amortization</p>
                </a>
                <a href="/interest-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Interest Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate compound interest and savings growth</p>
                </a>
                <a href="/savings-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Savings Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Plan your savings goals</p>
                </a>
                <a href="/mortgage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Mortgage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate home loan payments</p>
                </a>
                <a href="/auto-loan-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Auto Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate car loan payments</p>
                </a>
                <a href="/retirement-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Retirement Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Plan for retirement savings</p>
                </a>
              </div>
            </div>

            {/* External Links */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p className="mb-2">Learn more about debt management:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://www.consumerfinance.gov/debt-collection/" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  CFPB: Debt Collection →
                </a>
                <a href="https://www.debt.org/credit/loans/" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Debt.org: Debt Relief →
                </a>
                <a href="https://en.wikipedia.org/wiki/Debt_avalanche_method" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Wikipedia: Debt Avalanche →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

