import type { Metadata } from 'next';
import { getUrl, getOgImage } from '@/config/site';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { PaymentCalculator } from '@/components/Calculator/PaymentCalculator';

export const metadata: Metadata = {
  title: "Payment Calculator (Free, No signup) - Monthly Payment | AICalculator",
  description: "Free payment calculator with no sign-up required. Calculate loan payments for car loans, personal loans, and credit cards. Compare standard, interest-only, and balloon payments. See how extra payments save you money. Free online tool.",
  keywords: [
    "payment calculator",
    "free payment calculator",
    "payment calculator no signup",
    "monthly payment calculator",
    "loan payment calculator",
    "car payment calculator",
    "auto loan calculator",
    "personal loan payment",
    "credit card payment",
    "installment calculator",
    "extra payment calculator",
    "payment schedule",
    "amortization calculator",
    "bi-weekly payment",
    "free payment calculator",
  ],
  openGraph: {
    title: "Payment Calculator (Free, No signup) - AICalculator",
    description: "Free payment calculator with no sign-up required. For car loans, personal loans & more. Calculate monthly payments, see total interest, and explore extra payment benefits.",
    type: "website",
    url: getUrl('/payment-calculator'),
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment Calculator (Free, No signup) - AICalculator",
    description: "Free payment calculator with no sign-up required. Calculate payments for any loan. See how extra payments can save thousands in interest!",
  },
  alternates: {
    canonical: getUrl('/payment-calculator'),
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

export default function PaymentCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Payment Calculator",
        "url": getUrl('/payment-calculator'),
        "description": "Calculate loan payments for any type of installment loan including car loans, personal loans, mortgages, and credit cards. Compare payment frequencies, see extra payment impact, and explore different payment structures.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Standard amortized payment calculation",
          "Interest-only payment option",
          "Balloon payment structure",
          "Multiple payment frequencies (monthly, bi-weekly, weekly)",
          "Extra payment impact analysis",
          "Interest savings calculator",
          "Total cost breakdown",
          "Payoff date estimation",
          "Share and export results",
          "Instant calculation"
        ]
      },
      {
        "@type": "BreadcrumbList",
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
            "name": "Payment Calculator",
            "item": getUrl('/payment-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate my monthly payment on a loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate your monthly payment, you need: loan amount, annual interest rate, and loan term. The formula is: M = P * [r(1+r)^n] / [(1+r)^n-1], where M=monthly payment, P=principal, r=monthly interest rate (annual rate/12), n=total payments. Our calculator does this instantly—just enter your loan details and click Calculate."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between standard, interest-only, and balloon payments?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard amortized: Each payment includes principal and interest, fully paying off the loan by the end. Interest-only: You only pay interest each month; the full principal is due at term end. Balloon payment: Lower monthly payments but a large lump sum (balloon) due at the end. Standard is safest for most borrowers, while the others require planning for large future payments."
            }
          },
          {
            "@type": "Question",
            "name": "How much can I save by making extra payments?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Extra payments can save thousands! Even an extra $100/month on a $25,000 loan at 6.5% over 5 years saves approximately $800 in interest and pays off the loan 8 months early. The savings increase with larger loan amounts and higher interest rates. Use our calculator's 'Extra Payment' feature to see your specific savings."
            }
          },
          {
            "@type": "Question",
            "name": "Should I choose monthly, bi-weekly, or weekly payments?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bi-weekly payments (26 per year) result in 13 monthly equivalents instead of 12, paying off loans faster. This works well if you're paid bi-weekly. Weekly payments (52 per year) offer even more frequent reduction of principal, saving additional interest. Choose based on your pay schedule and cash flow—consistency matters more than frequency."
            }
          },
          {
            "@type": "Question",
            "name": "What types of loans can I calculate with this tool?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This calculator works for any installment loan: auto loans, personal loans, home equity loans, student loans, RV loans, boat loans, furniture financing, and more. It doesn't work for revolving credit (credit cards with variable payments) or adjustable-rate loans. For mortgages, we recommend our dedicated Mortgage Calculator for features like PMI and property taxes."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is this payment calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our calculator uses standard financial formulas and is highly accurate for fixed-rate loans. However, actual payments may vary slightly due to: lender-specific fees, insurance costs, payment due dates, prepayment penalties, or promotional rates. Always verify the final payment amount with your lender before signing. Use this calculator for planning and comparison purposes."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Payment Calculator",
        "description": "Calculate your loan payment and see how extra payments can save money",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter loan amount",
            "text": "Input the total amount you're borrowing in dollars."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter interest rate",
            "text": "Input the annual interest rate (APR) offered by your lender."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Enter loan term",
            "text": "Input the loan term in years (e.g., 5 years for a typical car loan)."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Select payment frequency",
            "text": "Choose monthly, bi-weekly, or weekly payments based on your preference."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Select payment type",
            "text": "Choose standard amortized, interest-only, or balloon payment structure."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Add extra payment (optional)",
            "text": "Enter any extra amount you plan to pay each period to see savings."
          },
          {
            "@type": "HowToStep",
            "position": 7,
            "name": "Calculate and review results",
            "text": "Click Calculate to see your payment amount, total interest, and payoff date."
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
      
      <h1 className="sr-only">Payment Calculator - Free Monthly Payment Calculator for Any Loan | Calculate Car Loan, Personal Loan & Credit Card Payments</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Payment Calculator (Free, No signup)"
        calculatorUrl="/payment-calculator"
      />

      <section className="py-8 md:py-12" aria-label="Payment Calculator Tool">
        <div className="container mx-auto px-4">
          <PaymentCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-white to-gray-50" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Loan Payments
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What is a Payment Calculator?</h3>
                <p className="text-gray-700 mb-4">
                  A payment calculator helps you determine how much you'll pay each month (or week/bi-week) on an installment loan. 
                  It considers three key factors:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>Loan Amount:</strong> The total you're borrowing</li>
                  <li><strong>Interest Rate:</strong> The cost of borrowing (APR)</li>
                  <li><strong>Loan Term:</strong> How long you have to repay</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Understanding your payment amount before borrowing helps you budget properly and avoid financial stress.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Three Payment Structures</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                    <h4 className="font-semibold text-blue-900">Standard Amortized</h4>
                    <p className="text-blue-800 text-sm">Equal payments each period. Part goes to principal, part to interest. Loan fully paid at term end. <strong>Best for most borrowers.</strong></p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3">
                    <h4 className="font-semibold text-yellow-900">Interest-Only</h4>
                    <p className="text-yellow-800 text-sm">Lower monthly payments (interest only), but full principal due at end. Risky—requires refinancing or large lump sum.</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-3">
                    <h4 className="font-semibold text-orange-900">Balloon Payment</h4>
                    <p className="text-orange-800 text-sm">Lowest monthly payments but huge final payment. Common in business loans. Plan carefully!</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Power of Extra Payments</h3>
                <p className="text-gray-700 mb-4">
                  Making extra payments is one of the smartest financial moves:
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-green-900 mb-2">Example: $25,000 Auto Loan</h4>
                  <p className="text-green-800 text-sm mb-2">Rate: 6.5% | Term: 5 years</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700">Regular payment:</span>
                      <strong className="text-green-900">$489.10/month</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Total interest:</span>
                      <strong className="text-green-900">$4,345.96</strong>
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-900 mb-2">With $100 Extra/Month</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Payment:</span>
                      <strong className="text-emerald-900">$589.10/month</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Total interest:</span>
                      <strong className="text-emerald-900">$3,533.64</strong>
                    </div>
                    <div className="flex justify-between border-t border-emerald-200 pt-2 mt-2">
                      <span className="text-emerald-700">💰 You save:</span>
                      <strong className="text-emerald-900 text-lg">$812.32</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">⏰ Pay off:</span>
                      <strong className="text-emerald-900">8 months earlier</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Frequency Comparison</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2 text-gray-900">Frequency</th>
                      <th className="text-center py-2 text-gray-900">Payments/Year</th>
                      <th className="text-center py-2 text-gray-900">Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 text-gray-700">Monthly</td>
                      <td className="text-center text-gray-700">12</td>
                      <td className="text-center text-gray-700">Standard</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 text-gray-700"><strong>Bi-Weekly</strong></td>
                      <td className="text-center text-gray-700">26</td>
                      <td className="text-center text-green-700"><strong>= 13 months</strong></td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 text-gray-700">Weekly</td>
                      <td className="text-center text-gray-700">52</td>
                      <td className="text-center text-green-700">Even faster</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-gray-600 text-sm mt-4">
                  <strong>Pro tip:</strong> Bi-weekly payments create an extra month of payment each year without feeling the strain, 
                  helping you pay off loans faster.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate my monthly payment on a loan?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate your monthly payment, you need: loan amount, annual interest rate, and loan term. The formula is: M = P * [r(1+r)^n] / [(1+r)^n-1], 
                      where M=monthly payment, P=principal, r=monthly interest rate (annual rate/12), n=total payments. Our calculator does this instantly—just enter 
                      your loan details and click Calculate. For a $25,000 loan at 6.5% over 5 years, the monthly payment is $489.10.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What's the difference between standard, interest-only, and balloon payments?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Standard amortized: Each payment includes principal and interest, fully paying off the loan by the end. This is the safest and most common structure. 
                      Interest-only: You only pay interest each month; the full principal is due at term end—risky as you're not building equity. 
                      Balloon payment: Lower monthly payments but a large lump sum (balloon) due at the end—requires careful planning and often refinancing. 
                      Standard is best for most borrowers, while the others require planning for large future payments.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much can I save by making extra payments?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Extra payments can save thousands! Even an extra $100/month on a $25,000 loan at 6.5% over 5 years saves approximately $812 in interest 
                      and pays off the loan 8 months early. The savings increase with larger loan amounts, higher interest rates, and longer terms. A $50,000 loan 
                      with $200 extra monthly could save $3,000-5,000 over the life of the loan. Use our calculator's 'Extra Payment' feature to see your specific savings.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Should I choose monthly, bi-weekly, or weekly payments?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Bi-weekly payments (26 per year) result in 13 monthly equivalents instead of 12, automatically creating an extra payment annually. 
                      This pays off loans faster without feeling the strain—great if you're paid bi-weekly. Weekly payments (52 per year) offer even more frequent 
                      reduction of principal, saving additional interest. Choose based on your pay schedule and cash flow. Consistency matters more than frequency. 
                      If you're paid monthly, stick with monthly payments to avoid budgeting complications.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What types of loans can I calculate with this tool?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      This calculator works for any fixed-rate installment loan: auto loans (new/used cars), personal loans, home equity loans, student loans (private), 
                      RV/boat loans, furniture/appliance financing, debt consolidation loans, and business equipment loans. It doesn't work for revolving credit 
                      (credit cards with variable payments), adjustable-rate loans, or mortgages with PMI/taxes (use our Mortgage Calculator for those). 
                      Perfect for comparing offers from different lenders.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How accurate is this payment calculator?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Our calculator uses standard financial formulas and is highly accurate (99.9%+) for fixed-rate loans. However, actual payments may vary slightly due to: 
                      origination fees, insurance costs, payment due date timing, prepayment penalties, or promotional rates. Always verify the final payment amount with your 
                      lender before signing any loan agreement. Use this calculator for planning, comparison shopping, and understanding how loans work—it's a powerful tool 
                      for informed borrowing decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Financial Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/loan-calculator" 
                   className="block p-4 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Advanced loan calculator with DTI analysis</p>
                </a>
                <a href="/mortgage-calculator" 
                   className="block p-4 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Mortgage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate home loans with PMI and taxes</p>
                </a>
                <a href="/interest-calculator" 
                   className="block p-4 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Interest Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate compound interest and returns</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

