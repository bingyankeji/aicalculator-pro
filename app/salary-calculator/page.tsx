import { Metadata } from "next";
import { getUrl, getOgImage } from '@/config/site';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from "next/link";
import { SalaryCalculator } from "@/components/Calculator/SalaryCalculator";

export const metadata: Metadata = {
  title: "Salary Calculator (Free, No signup) - Net Income | AICalculator",
  description: "Free salary calculator with no sign-up required. Convert between hourly, daily, weekly, monthly, and annual pay. Calculate adjusted salary with holidays and vacation days. Includes unadjusted and adjusted figures.",
  keywords: [
    "salary calculator",
    "free salary calculator",
    "salary calculator no signup",
    "hourly to annual salary",
    "annual to hourly calculator",
    "salary converter",
    "wage calculator",
    "pay calculator",
    "income calculator",
    "paycheck calculator",
    "hourly wage calculator",
    "monthly salary calculator",
    "yearly salary calculator",
    "salary conversion",
    "salary comparison",
    "adjusted salary calculator",
    "take home pay calculator"
  ],
  openGraph: {
    title: "Salary Calculator (Free, No signup) - AICalculator",
    description: "Free salary calculator with no sign-up required. Convert between hourly, monthly, and annual salary instantly. Calculate adjusted pay with holidays and vacation days.",
    type: "website",
    url: getUrl('/salary-calculator'),
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salary Calculator (Free, No signup) - AICalculator",
    description: "Free salary calculator with no sign-up required. Convert salary instantly with holiday and vacation adjustments.",
    site: "@aicalculator",
  },
  alternates: {
    canonical: getUrl('/salary-calculator'),
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

export default function SalaryCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Salary Calculator",
        "url": getUrl('/salary-calculator'),
        "description": "Free online salary calculator to convert between hourly, daily, weekly, monthly, and annual pay rates with holiday and vacation adjustments.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Convert hourly to annual salary",
          "Convert annual to hourly rate",
          "Calculate adjusted salary with holidays",
          "Account for vacation days",
          "Multiple payment frequencies",
          "Unadjusted and adjusted figures",
          "Real-time calculation",
          "Working days summary"
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
            "name": "Salary Calculator",
            "item": getUrl('/salary-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I convert hourly wage to annual salary?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Enter your hourly wage in the salary amount field, select 'per Hour' from the dropdown, and set your hours per week (typically 40). The calculator automatically displays your annual salary. For example, $50/hour × 40 hours/week × 52 weeks = $104,000/year."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between unadjusted and adjusted salary?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Unadjusted salary assumes you work all 52 weeks without accounting for time off. Adjusted salary factors in holidays and vacation days you actually take off, showing your effective hourly rate when considering unpaid time off. For salaried employees, adjusted figures show the true value per working hour."
            }
          },
          {
            "@type": "Question",
            "name": "How many hours per week should I enter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Enter your typical working hours per week. Standard full-time is 40 hours (8 hours/day × 5 days). Part-time might be 20-30 hours. If you work overtime regularly, include average overtime hours. The calculator uses this to convert between different pay periods accurately."
            }
          },
          {
            "@type": "Question",
            "name": "How do holidays affect my salary calculation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Holidays reduce your actual working days per year. The U.S. has 10 federal holidays. If you enter 10 holidays, the adjusted salary shows your effective pay rate across 250 working days instead of 260. This is important for hourly workers or calculating true compensation value."
            }
          },
          {
            "@type": "Question",
            "name": "Should I include paid vacation days?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, include all vacation days (paid or unpaid). The calculator shows how vacation time affects your effective hourly rate. For example, 15 vacation days means you work 245 days instead of 260, increasing your adjusted hourly rate since you earn the same annual amount in fewer working days."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate my monthly salary from hourly wage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Enter your hourly wage, select 'per Hour', and the calculator shows your monthly salary in the results. The calculation uses: Hourly rate × Hours per week × 52 weeks ÷ 12 months. For $50/hour at 40 hours/week, that's $50 × 40 × 52 ÷ 12 = $8,667/month."
            }
          },
          {
            "@type": "Question",
            "name": "What is semi-monthly pay?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Semi-monthly means you're paid twice per month (24 pay periods per year), typically on the 15th and last day. This differs from bi-weekly (every 2 weeks, 26 pay periods). Semi-monthly pay is your annual salary ÷ 24, while bi-weekly is annual ÷ 26."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this calculator for salary negotiations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Use it to compare different salary offers by converting them to the same pay period. For example, compare a $100K/year salary offer with a $50/hour contract job. The calculator shows equivalent rates across all periods, helping you make informed decisions about total compensation."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Salary Calculator",
        "description": "Step-by-step guide to convert salary between different payment frequencies",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Your Salary Amount",
            "text": "Type your salary amount in the input field and select the payment frequency from the dropdown (per Hour, Day, Week, Bi-week, Month, or Year). For example, enter '50' and select 'per Hour' for a $50/hour wage."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Set Working Hours",
            "text": "Enter your hours per week (typically 40 for full-time) and days per week (typically 5 for Monday-Friday). These values affect the conversion calculations between different pay periods."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Add Holidays and Vacation",
            "text": "Enter your holidays per year (U.S. federal holidays = 10) and vacation days per year (typical is 10-20 days). This calculates your adjusted salary that accounts for actual working days."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "View Results",
            "text": "The calculator instantly displays your salary in all payment frequencies. The 'Unadjusted' column shows standard calculations, while 'Adjusted' accounts for holidays and vacation, showing your true effective rate."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Compare and Analyze",
            "text": "Use the working days summary to see total working days vs. days off. Compare unadjusted and adjusted figures to understand how time off affects your effective hourly rate."
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

      <h1 className="sr-only">Salary Calculator - Convert Hourly, Monthly, Annual Salary Online Free</h1>

      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Salary Calculator (Free, No signup)"
        calculatorUrl="/salary-calculator"
      />

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Salary Calculator Tool">
        <div className="container mx-auto px-4">
          <h2 className="sr-only">Salary Calculator - Convert between hourly, daily, weekly, monthly, and annual salary with holiday and vacation adjustments.</h2>
          <SalaryCalculator />
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Salary Calculations</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What is a Salary Calculator?</h3>
                  <p className="text-gray-700 mb-4">
                    A salary calculator converts compensation between different pay periods (hourly, weekly, monthly, annual). It helps you understand your total annual income from an hourly wage, or your effective hourly rate from a yearly salary.
                  </p>
                  <p className="text-gray-700">
                    Our calculator provides both unadjusted figures (assuming 52 full weeks of work) and adjusted figures (accounting for holidays and vacation days), giving you a realistic view of your actual earnings per working hour.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Unadjusted vs Adjusted Salary</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>Unadjusted salary</strong> assumes you work every scheduled day (260 weekdays per year at 5 days/week). This is the standard calculation most people use.
                  </p>
                  <p className="text-gray-700">
                    <strong>Adjusted salary</strong> accounts for holidays and vacation days. If you have 10 holidays + 15 vacation days, you actually work only 235 days. This shows your true effective hourly rate since you earn your annual salary in fewer working days.
                  </p>
                </div>
              </div>
            </div>

            {/* Common Use Cases */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Use Cases</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
                  <div className="text-3xl mb-3">💼</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Job Offer Comparison</h3>
                  <p className="text-sm text-gray-700">
                    Compare multiple job offers with different pay structures. Convert all offers to the same time period (e.g., annual) to make apples-to-apples comparisons.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
                  <div className="text-3xl mb-3">🤝</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Salary Negotiation</h3>
                  <p className="text-sm text-gray-700">
                    Calculate your target salary for negotiations. If you want to earn $100K/year, you need roughly $48/hour at 40 hours/week. Use this for contract or freelance rate discussions.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-6">
                  <div className="text-3xl mb-3">📊</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Budget Planning</h3>
                  <p className="text-sm text-gray-700">
                    Convert your annual salary to monthly income for budgeting. Understanding your monthly take-home helps plan expenses, savings, and financial goals effectively.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200 p-6">
                  <div className="text-3xl mb-3">⏱️</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Freelance Rates</h3>
                  <p className="text-sm text-gray-700">
                    Convert your desired annual income to hourly freelance rates. Account for unpaid vacation, holidays, and non-billable hours to set competitive but sustainable rates.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200 p-6">
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Career Planning</h3>
                  <p className="text-sm text-gray-700">
                    Calculate salary growth needed to reach financial goals. If you earn $60K and want $80K, you need a $9.62/hour raise (at 40 hours/week).
                  </p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-200 p-6">
                  <div className="text-3xl mb-3">📈</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Compensation Analysis</h3>
                  <p className="text-sm text-gray-700">
                    Understand your true compensation value. A $100K salary with 4 weeks vacation means you earn $416/day, not $385/day (if vacations weren't paid).
                  </p>
                </div>
              </div>
            </div>

            {/* Salary Calculation Tips */}
            <div className="mb-12 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Salary Calculation Tips</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Standard Working Assumptions</h3>
                  <p className="text-gray-700 mb-3">
                    Most salary calculations assume a standard work year:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>52 weeks per year</strong> (some years have 53, but 52 is standard)</li>
                    <li><strong>40 hours per week</strong> for full-time employment (8 hours × 5 days)</li>
                    <li><strong>260 weekdays per year</strong> (52 weeks × 5 days)</li>
                    <li><strong>2,080 working hours per year</strong> (52 weeks × 40 hours)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Common Payment Frequencies</h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li><strong>Bi-weekly:</strong> Every 2 weeks (26 paychecks/year, 2-3 per month)</li>
                      <li><strong>Semi-monthly:</strong> Twice per month (24 paychecks/year, exactly 2 per month)</li>
                      <li><strong>Monthly:</strong> Once per month (12 paychecks/year)</li>
                      <li><strong>Weekly:</strong> Every week (52 paychecks/year)</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Typical Holidays and Vacation</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>U.S. Federal Holidays:</strong> 10 days (New Year's, MLK Day, Presidents Day, Memorial Day, Juneteenth, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving, Christmas)
                  </p>
                  <p className="text-gray-700">
                    <strong>Typical Vacation:</strong> 10-15 days for early career, 15-20 days mid-career, 20-25 days senior level. European countries often provide 25-30 days mandated by law.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I convert hourly wage to annual salary?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Enter your hourly wage in the salary amount field, select 'per Hour' from the dropdown, and set your hours per week (typically 40). The calculator automatically displays your annual salary. For example, $50/hour × 40 hours/week × 52 weeks = $104,000/year.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the difference between unadjusted and adjusted salary?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Unadjusted salary assumes you work all 52 weeks without accounting for time off. Adjusted salary factors in holidays and vacation days you actually take off, showing your effective hourly rate when considering unpaid time off. For salaried employees, adjusted figures show the true value per working hour.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How many hours per week should I enter?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Enter your typical working hours per week. Standard full-time is 40 hours (8 hours/day × 5 days). Part-time might be 20-30 hours. If you work overtime regularly, include average overtime hours. The calculator uses this to convert between different pay periods accurately.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do holidays affect my salary calculation?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Holidays reduce your actual working days per year. The U.S. has 10 federal holidays. If you enter 10 holidays, the adjusted salary shows your effective pay rate across 250 working days instead of 260. This is important for hourly workers or calculating true compensation value.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Should I include paid vacation days?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes, include all vacation days (paid or unpaid). The calculator shows how vacation time affects your effective hourly rate. For example, 15 vacation days means you work 245 days instead of 260, increasing your adjusted hourly rate since you earn the same annual amount in fewer working days.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate my monthly salary from hourly wage?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Enter your hourly wage, select 'per Hour', and the calculator shows your monthly salary in the results. The calculation uses: Hourly rate × Hours per week × 52 weeks ÷ 12 months. For $50/hour at 40 hours/week, that's $50 × 40 × 52 ÷ 12 = $8,667/month.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is semi-monthly pay?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Semi-monthly means you're paid twice per month (24 pay periods per year), typically on the 15th and last day. This differs from bi-weekly (every 2 weeks, 26 pay periods). Semi-monthly pay is your annual salary ÷ 24, while bi-weekly is annual ÷ 26.
                    </p>
                  </div>
                </div>

                <div 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can I use this calculator for salary negotiations?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes! Use it to compare different salary offers by converting them to the same pay period. For example, compare a $100K/year salary offer with a $50/hour contract job. The calculator shows equivalent rates across all periods, helping you make informed decisions about total compensation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/tax-calculator" 
                   className="block p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Income Tax Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate federal and state taxes</p>
                </Link>
                <Link href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate salary increases and bonuses</p>
                </Link>
                <Link href="/interest-calculator" 
                   className="block p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Interest Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate savings and investment growth</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

