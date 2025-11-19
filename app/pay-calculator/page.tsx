import { Metadata } from "next";
import { getUrl, getOgImage } from '@/config/site';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from "next/link";
import { PayCalculator } from "@/components/Calculator/PayCalculator";

export const metadata: Metadata = {
  title: "Pay Calculator (Free, No signup) - Paycheck Calculator | AICalculator",
  description: "Free pay calculator with no sign-up required. Calculate your take-home pay after federal tax, state tax, FICA, 401(k), and other deductions. See your net pay by paycheck frequency: weekly, bi-weekly, semi-monthly, monthly, or annually.",
  keywords: [
    "paycheck calculator",
    "free paycheck calculator",
    "paycheck calculator no signup",
    "pay calculator",
    "net pay calculator",
    "take home pay calculator",
    "salary calculator after taxes",
    "paycheck calculator with taxes",
    "payroll calculator",
    "gross to net calculator",
    "paycheck withholding calculator",
    "free paycheck calculator",
    "net paycheck calculator",
    "take home salary calculator",
    "paycheck tax calculator",
    "401k paycheck calculator",
    "hourly paycheck calculator"
  ],
  openGraph: {
    title: "Pay Calculator (Free, No signup) - AICalculator",
    description: "Free pay calculator with no sign-up required. Calculate net pay after taxes and deductions. See your actual take-home pay by pay frequency.",
    type: "website",
    url: getUrl('/pay-calculator'),
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pay Calculator (Free, No signup) - AICalculator",
    description: "Free pay calculator with no sign-up required. Calculate your take-home pay with federal tax, state tax, FICA, and deductions.",
    site: "@aicalculator",
  },
  alternates: {
    canonical: getUrl('/pay-calculator'),
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

export default function PayCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Paycheck Calculator",
        "url": getUrl('/pay-calculator'),
        "description": "Free online paycheck calculator to calculate your net pay (take-home pay) after federal tax, state tax, FICA (Social Security and Medicare), 401(k) contributions, health insurance, and other deductions.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate net pay after all deductions",
          "Support multiple pay frequencies (weekly, bi-weekly, semi-monthly, monthly, annual)",
          "Federal, state, and local tax withholdings",
          "FICA tax calculation (Social Security + Medicare)",
          "401(k) and retirement contributions",
          "Health insurance premium deductions",
          "Take-home percentage calculation",
          "Annual, monthly, bi-weekly, and weekly breakdowns",
          "Share results via social media",
          "Export calculations as images"
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
            "name": "Paycheck Calculator",
            "item": getUrl('/pay-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate my net pay from gross pay?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate net pay from gross pay: 1) Start with your gross pay (total earnings before deductions). 2) Subtract federal income tax (typically 10-37% based on your tax bracket). 3) Subtract state income tax (0-13.3% depending on your state). 4) Subtract FICA taxes: Social Security (6.2% up to $168,600) and Medicare (1.45% on all earnings). 5) Subtract pre-tax deductions like 401(k) contributions and health insurance. 6) Subtract post-tax deductions like Roth 401(k), garnishments, or union dues. The remaining amount is your net pay or take-home pay."
            }
          },
          {
            "@type": "Question",
            "name": "What percentage of my paycheck goes to taxes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "On average, Americans pay 20-30% of their gross pay in taxes and deductions, though this varies significantly. Federal income tax ranges from 10-37% depending on your tax bracket. FICA (Social Security + Medicare) is 7.65% for most workers. State income tax ranges from 0% (9 states have no income tax) to 13.3% (California). Additional deductions include 401(k) contributions (typically 3-15%), health insurance ($100-500/month), and other voluntary deductions. A typical middle-class worker earning $60,000/year might take home about $45,000-48,000 (75-80% of gross pay)."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between gross pay and net pay?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Gross pay is your total earnings before any deductions - this is your salary or hourly rate multiplied by hours worked. Net pay (take-home pay) is what you actually receive in your bank account after all deductions. Deductions include: mandatory taxes (federal, state, local income tax, and FICA), pre-tax deductions (401k, traditional IRA, FSA, HSA, health insurance), and post-tax deductions (Roth 401k, life insurance, garnishments). For example, if your gross annual salary is $60,000 and you have $12,000 in total deductions, your net pay is $48,000 ($4,000/month). The difference between gross and net pay is crucial for budgeting because you can only spend your net pay."
            }
          },
          {
            "@type": "Question",
            "name": "How much federal tax is withheld from my paycheck?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Federal income tax withholding depends on your tax bracket, filing status, and W-4 form information. For 2024, tax brackets are: 10% (income up to $11,600), 12% ($11,600-$47,150), 22% ($47,150-$100,525), 24% ($100,525-$191,950), 32% ($191,950-$243,725), 35% ($243,725-$609,350), and 37% (over $609,350) for single filers. These are marginal rates, meaning you pay different rates on different portions of your income. Most employers withhold based on IRS Publication 15-T and your W-4 form. You can adjust withholding by submitting a new W-4. If too much is withheld, you'll get a refund when filing taxes; too little means you'll owe money."
            }
          },
          {
            "@type": "Question",
            "name": "What is FICA and how much is it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "FICA (Federal Insurance Contributions Act) is the combined tax for Social Security and Medicare, totaling 7.65% of your gross pay for most employees. It consists of: Social Security tax (6.2% on earnings up to $168,600 in 2024 - this wage base limit increases annually), and Medicare tax (1.45% on all earnings with no cap). High earners pay an Additional Medicare Tax of 0.9% on wages exceeding $200,000 (single) or $250,000 (married filing jointly). Self-employed individuals pay the full 15.3% (both employee and employer portions) but can deduct the employer portion. FICA taxes fund Social Security retirement benefits and Medicare health insurance for seniors. Unlike income tax, FICA is a flat rate with no deductions or exemptions."
            }
          },
          {
            "@type": "Question",
            "name": "Should I contribute to a 401(k) even if it reduces my take-home pay?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, contributing to a 401(k) is generally beneficial despite reducing take-home pay for several reasons: 1) Tax savings: Traditional 401(k) contributions are pre-tax, reducing your taxable income. For example, contributing $10,000 in the 22% tax bracket saves $2,200 in federal taxes, so your take-home only decreases by $7,800. 2) Employer match: Many employers match 50-100% of contributions up to 3-6% of salary - this is free money you shouldn't leave on the table. 3) Compound growth: Investments grow tax-deferred for decades. $500/month for 30 years at 7% annual return grows to $607,000. 4) 2024 contribution limits: $23,000 for those under 50, $30,500 for 50+. Financial experts recommend saving 10-15% of gross income for retirement. Even if budgets are tight, at minimum contribute enough to get the full employer match."
            }
          },
          {
            "@type": "Question",
            "name": "How does pay frequency affect my paycheck?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pay frequency determines how often you receive paychecks and affects the amount per check, though annual totals remain the same. Common frequencies: Weekly (52 paychecks/year) - smallest per-check amount but most frequent; Bi-weekly (26 paychecks/year) - most common, every two weeks, includes two 'extra' paychecks some months; Semi-monthly (24 paychecks/year) - typically 1st and 15th, consistent dates but varying days; Monthly (12 paychecks/year) - largest per-check amount, easier budgeting but requires discipline between checks. Tax withholding may be calculated differently: bi-weekly assumes 26 pay periods, while semi-monthly assumes 24. This can cause slight differences in withholding per check. Bi-weekly often results in two 'bonus' months per year with three paychecks, which many people use for savings or debt payoff."
            }
          },
          {
            "@type": "Question",
            "name": "What should I do if my paycheck seems incorrect?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If your paycheck seems wrong, follow these steps: 1) Review your pay stub carefully: Check gross pay matches your salary/hourly rate and hours worked. Verify all deductions are authorized and amounts are correct. Ensure tax withholdings match your W-4 form. 2) Common issues: Incorrect hours or overtime calculation, wrong tax withholding (check your W-4), unauthorized deductions, incorrect pay rate, missing bonuses or commissions, benefit deduction errors. 3) Action steps: Contact your HR or payroll department immediately with specific questions. Provide documentation (offer letter, W-4, benefits enrollment). Request a corrected pay stub if errors are confirmed. Keep records of all communications. 4) Legal recourse: If your employer refuses to correct errors, file a wage claim with your state's Department of Labor. Most states have strict deadlines (30-180 days). Document everything: pay stubs, time cards, communications. Employers are required by law to pay you correctly and on time."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Paycheck Calculator",
        "description": "Step-by-step guide to calculate your take-home pay",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Your Gross Pay",
            "text": "Input your gross pay amount before any deductions. This is your salary or hourly rate multiplied by hours worked. Choose the pay frequency that matches your paycheck schedule: weekly, bi-weekly, semi-monthly, monthly, or annually."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Set Tax Withholding Rates",
            "text": "Enter your federal tax rate (check your pay stub or use your tax bracket from IRS tables). Add your state tax rate (varies by state: 0-13.3%). Include local tax if applicable (city or county tax). FICA taxes (Social Security 6.2% + Medicare 1.45%) are pre-filled but can be adjusted."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Add Pre-Tax Deductions",
            "text": "Enter your 401(k) or 403(b) contribution percentage. Input health insurance premium amount per paycheck. Add any other pre-tax deductions like FSA, HSA, or commuter benefits."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Include Other Deductions",
            "text": "Add post-tax deductions like Roth 401(k) contributions, life insurance premiums, disability insurance, union dues, or wage garnishments. These reduce your take-home pay but may offer long-term benefits."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Calculate and Review Results",
            "text": "Click 'Calculate Pay' to see your net pay (take-home pay). Review the detailed breakdown showing all taxes and deductions. See your annual, monthly, bi-weekly, and weekly net pay amounts for budgeting purposes."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Share or Save Your Results",
            "text": "Use the share button to send your calculation to email, text, or social media. Save your results as an image for your records. Print a copy for budgeting or financial planning purposes."
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

      <h1 className="sr-only">Paycheck Calculator - Free Net Pay Calculator with Federal Tax, State Tax, and All Deductions</h1>

      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Pay Calculator (Free, No signup)"
        calculatorUrl="/pay-calculator"
      />

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Paycheck Calculator Tool">
        <div className="container mx-auto px-4">
          <PayCalculator />
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Your Paycheck and Take-Home Pay
            </h2>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Card 1: Gross vs Net Pay */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>💰</span>
                  Gross Pay vs Net Pay
                </h3>
                <p className="text-gray-700 mb-4">
                  <strong>Gross pay</strong> is your total earnings before any deductions - your salary or hourly wage multiplied by hours worked. <strong>Net pay</strong> (take-home pay) is what actually lands in your bank account after all mandatory and voluntary deductions.
                </p>
                <p className="text-gray-700">
                  The difference between gross and net pay typically ranges from 20-30% for most American workers. Understanding this difference is crucial for budgeting, as you can only spend your net pay. Learn more from <a href="https://www.dol.gov/general/topic/wages" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">US Department of Labor</a>.
                </p>
              </div>

              {/* Card 2: Federal Tax Withholding */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🏛️</span>
                  Federal Tax Withholding
                </h3>
                <p className="text-gray-700 mb-3">
                  Federal income tax is withheld from each paycheck based on your W-4 form and tax bracket. 2024 tax brackets:
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 10% - Up to $11,600</li>
                  <li>• 12% - $11,600 to $47,150</li>
                  <li>• 22% - $47,150 to $100,525</li>
                  <li>• 24% - $100,525 to $191,950</li>
                  <li>• 32% - $191,950 to $243,725</li>
                  <li>• 35% - $243,725 to $609,350</li>
                  <li>• 37% - Over $609,350</li>
                </ul>
              </div>

              {/* Card 3: FICA Taxes */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  FICA Taxes Explained
                </h3>
                <p className="text-gray-700 mb-3">
                  FICA (Federal Insurance Contributions Act) funds Social Security and Medicare:
                </p>
                <div className="space-y-2">
                  <div>
                    <p className="font-semibold text-gray-900">Social Security Tax: 6.2%</p>
                    <p className="text-sm text-gray-700">
                      On wages up to $168,600 (2024). Funds retirement, disability, and survivor benefits.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Medicare Tax: 1.45%</p>
                    <p className="text-sm text-gray-700">
                      On all wages, no cap. Plus 0.9% Additional Medicare Tax on income over $200,000.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4: State & Local Taxes */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🗺️</span>
                  State and Local Taxes
                </h3>
                <p className="text-gray-700 mb-3">
                  State income tax varies significantly by location. Nine states have no income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, Wyoming.
                </p>
                <p className="text-gray-700">
                  Highest state tax rates: California (13.3%), Hawaii (11%), New York (10.9%), New Jersey (10.75%). Some cities also impose local income tax, such as New York City (3.078-3.876%) and Philadelphia (3.8398%).
                </p>
              </div>

              {/* Card 5: Pre-Tax Deductions */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>💼</span>
                  Pre-Tax Deductions
                </h3>
                <p className="text-gray-700 mb-3">
                  Pre-tax deductions reduce your taxable income, saving you money on taxes:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>401(k)/403(b):</strong> Retirement savings (2024 limit: $23,000, or $30,500 if 50+)</li>
                  <li>• <strong>Health Insurance:</strong> Employer-sponsored premiums</li>
                  <li>• <strong>FSA:</strong> Flexible Spending Account for medical expenses ($3,200 limit)</li>
                  <li>• <strong>HSA:</strong> Health Savings Account ($4,150 individual, $8,300 family)</li>
                  <li>• <strong>Commuter Benefits:</strong> Transit and parking ($315/month limit)</li>
                </ul>
              </div>

              {/* Card 6: Pay Frequency Impact */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📅</span>
                  Pay Frequency Impact
                </h3>
                <p className="text-gray-700 mb-3">
                  How often you're paid affects per-paycheck amounts but not annual totals:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Weekly:</strong> 52 paychecks/year - smallest amounts, most frequent</li>
                  <li>• <strong>Bi-weekly:</strong> 26 paychecks/year - most common, every 2 weeks</li>
                  <li>• <strong>Semi-monthly:</strong> 24 paychecks/year - 1st and 15th typically</li>
                  <li>• <strong>Monthly:</strong> 12 paychecks/year - largest amounts, requires discipline</li>
                </ul>
                <p className="text-sm text-gray-700 mt-2">
                  Bi-weekly employees receive two "bonus" months with three paychecks, useful for savings or debt payoff.
                </p>
              </div>
            </div>

            {/* Take-Home Pay Percentage Table */}
            <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Typical Take-Home Pay Percentages by Income Level
              </h3>
              <p className="text-gray-700 text-center mb-4">
                Approximate net pay as percentage of gross (federal + state taxes + FICA only, no 401k)
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="px-4 py-3 font-bold text-gray-900">Annual Gross Salary</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Federal Tax Bracket</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Typical Take-Home %</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Example Net Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 text-gray-700">$40,000</td>
                      <td className="px-4 py-3 text-gray-700">12%</td>
                      <td className="px-4 py-3 text-green-600 font-semibold">~78%</td>
                      <td className="px-4 py-3 text-gray-900">$31,200</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-blue-50">
                      <td className="px-4 py-3 text-gray-700">$60,000</td>
                      <td className="px-4 py-3 text-gray-700">22%</td>
                      <td className="px-4 py-3 text-green-600 font-semibold">~75%</td>
                      <td className="px-4 py-3 text-gray-900">$45,000</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 text-gray-700">$80,000</td>
                      <td className="px-4 py-3 text-gray-700">22%</td>
                      <td className="px-4 py-3 text-green-600 font-semibold">~73%</td>
                      <td className="px-4 py-3 text-gray-900">$58,400</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">$100,000</td>
                      <td className="px-4 py-3 text-gray-700">24%</td>
                      <td className="px-4 py-3 text-green-600 font-semibold">~71%</td>
                      <td className="px-4 py-3 text-gray-900">$71,000</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 text-gray-700">$150,000</td>
                      <td className="px-4 py-3 text-gray-700">24-32%</td>
                      <td className="px-4 py-3 text-green-600 font-semibold">~68%</td>
                      <td className="px-4 py-3 text-gray-900">$102,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Percentages vary by state, local taxes, and individual deductions. California and New York residents typically see 5-10% lower take-home percentages.
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
                    How do I calculate my net pay from gross pay?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate net pay from gross pay: 1) Start with your gross pay (total earnings before deductions). 2) Subtract federal income tax (typically 10-37% based on your tax bracket). 3) Subtract state income tax (0-13.3% depending on your state). 4) Subtract FICA taxes: Social Security (6.2% up to $168,600) and Medicare (1.45% on all earnings). 5) Subtract pre-tax deductions like 401(k) contributions and health insurance. 6) Subtract post-tax deductions like Roth 401(k), garnishments, or union dues. The remaining amount is your net pay or take-home pay.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What percentage of my paycheck goes to taxes?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      On average, Americans pay 20-30% of their gross pay in taxes and deductions, though this varies significantly. Federal income tax ranges from 10-37% depending on your tax bracket. FICA (Social Security + Medicare) is 7.65% for most workers. State income tax ranges from 0% (9 states have no income tax) to 13.3% (California). Additional deductions include 401(k) contributions (typically 3-15%), health insurance ($100-500/month), and other voluntary deductions. A typical middle-class worker earning $60,000/year might take home about $45,000-48,000 (75-80% of gross pay).
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the difference between gross pay and net pay?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Gross pay is your total earnings before any deductions - this is your salary or hourly rate multiplied by hours worked. Net pay (take-home pay) is what you actually receive in your bank account after all deductions. Deductions include: mandatory taxes (federal, state, local income tax, and FICA), pre-tax deductions (401k, traditional IRA, FSA, HSA, health insurance), and post-tax deductions (Roth 401k, life insurance, garnishments). For example, if your gross annual salary is $60,000 and you have $12,000 in total deductions, your net pay is $48,000 ($4,000/month). The difference between gross and net pay is crucial for budgeting because you can only spend your net pay.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much federal tax is withheld from my paycheck?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Federal income tax withholding depends on your tax bracket, filing status, and W-4 form information. For 2024, tax brackets are: 10% (income up to $11,600), 12% ($11,600-$47,150), 22% ($47,150-$100,525), 24% ($100,525-$191,950), 32% ($191,950-$243,725), 35% ($243,725-$609,350), and 37% (over $609,350) for single filers. These are marginal rates, meaning you pay different rates on different portions of your income. Most employers withhold based on IRS Publication 15-T and your W-4 form. You can adjust withholding by submitting a new W-4. If too much is withheld, you'll get a refund when filing taxes; too little means you'll owe money.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is FICA and how much is it?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      FICA (Federal Insurance Contributions Act) is the combined tax for Social Security and Medicare, totaling 7.65% of your gross pay for most employees. It consists of: Social Security tax (6.2% on earnings up to $168,600 in 2024 - this wage base limit increases annually), and Medicare tax (1.45% on all earnings with no cap). High earners pay an Additional Medicare Tax of 0.9% on wages exceeding $200,000 (single) or $250,000 (married filing jointly). Self-employed individuals pay the full 15.3% (both employee and employer portions) but can deduct the employer portion. FICA taxes fund Social Security retirement benefits and Medicare health insurance for seniors. Unlike income tax, FICA is a flat rate with no deductions or exemptions.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Should I contribute to a 401(k) even if it reduces my take-home pay?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes, contributing to a 401(k) is generally beneficial despite reducing take-home pay for several reasons: 1) Tax savings: Traditional 401(k) contributions are pre-tax, reducing your taxable income. For example, contributing $10,000 in the 22% tax bracket saves $2,200 in federal taxes, so your take-home only decreases by $7,800. 2) Employer match: Many employers match 50-100% of contributions up to 3-6% of salary - this is free money you shouldn't leave on the table. 3) Compound growth: Investments grow tax-deferred for decades. $500/month for 30 years at 7% annual return grows to $607,000. 4) 2024 contribution limits: $23,000 for those under 50, $30,500 for 50+. Financial experts recommend saving 10-15% of gross income for retirement. Even if budgets are tight, at minimum contribute enough to get the full employer match.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How does pay frequency affect my paycheck?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Pay frequency determines how often you receive paychecks and affects the amount per check, though annual totals remain the same. Common frequencies: Weekly (52 paychecks/year) - smallest per-check amount but most frequent; Bi-weekly (26 paychecks/year) - most common, every two weeks, includes two 'extra' paychecks some months; Semi-monthly (24 paychecks/year) - typically 1st and 15th, consistent dates but varying days; Monthly (12 paychecks/year) - largest per-check amount, easier budgeting but requires discipline between checks. Tax withholding may be calculated differently: bi-weekly assumes 26 pay periods, while semi-monthly assumes 24. This can cause slight differences in withholding per check. Bi-weekly often results in two 'bonus' months per year with three paychecks, which many people use for savings or debt payoff.
                    </p>
                  </div>
                </div>

                <div 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What should I do if my paycheck seems incorrect?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      If your paycheck seems wrong, follow these steps: 1) Review your pay stub carefully: Check gross pay matches your salary/hourly rate and hours worked. Verify all deductions are authorized and amounts are correct. Ensure tax withholdings match your W-4 form. 2) Common issues: Incorrect hours or overtime calculation, wrong tax withholding (check your W-4), unauthorized deductions, incorrect pay rate, missing bonuses or commissions, benefit deduction errors. 3) Action steps: Contact your HR or payroll department immediately with specific questions. Provide documentation (offer letter, W-4, benefits enrollment). Request a corrected pay stub if errors are confirmed. Keep records of all communications. 4) Legal recourse: If your employer refuses to correct errors, file a wage claim with your state's Department of Labor. Most states have strict deadlines (30-180 days). Document everything: pay stubs, time cards, communications. Employers are required by law to pay you correctly and on time.
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
                <Link href="/salary-calculator" 
                   className="block p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Salary Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Convert between pay frequencies</p>
                </Link>
                <Link href="/tax-calculator" 
                   className="block p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Tax Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate federal and state taxes</p>
                </Link>
                <Link href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate tax rates and deductions</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

