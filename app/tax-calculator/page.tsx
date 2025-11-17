import { Metadata } from "next";
import { IncomeTaxCalculator } from "@/components/Calculator/IncomeTaxCalculator";
import Link from "next/link";
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
  title: "Income Tax Calculator - Free Federal & State Tax Calculator with Deductions",
  description: "Free income tax calculator. Calculate federal tax, state tax, FICA, AGI, itemized vs standard deductions, and tax credits. Includes One Big Beautiful Bill provisions: tips deduction, overtime, car loan interest, seniors deduction. Get accurate tax estimates instantly.",
  keywords: [
    "income tax calculator",
    "income tax calculator 2025",
    "tax calculator",
    "federal income tax calculator",
    "federal tax calculator",
    "state tax calculator",
    "tax calculator 2024",
    "paycheck tax calculator",
    "fica tax calculator",
    "take home pay calculator",
    "effective tax rate calculator",
    "marginal tax rate calculator",
    "tax bracket calculator",
    "tax estimator",
    "income tax estimator",
    "free tax calculator",
    "online tax calculator",
    "salary tax calculator",
    "tax deduction calculator",
    "social security tax calculator",
    "medicare tax calculator",
    "tax refund calculator",
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Income Tax Calculator - Free Federal & State Tax Calculator",
    description: "Calculate your income taxes instantly. Federal tax, state tax, FICA, AGI, and take-home pay. Free tax calculator with tax brackets, deductions, and credits.",
    type: "website",
    url: getUrl('/tax-calculator'),
    siteName: "Calculator Online - AICalculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('tax'),
        width: 1200,
        height: 630,
        alt: 'Income Tax Calculator',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Income Tax Calculator - Federal & State Tax Calculator",
    description: "Calculate your income taxes, take-home pay, and effective tax rate. Free tax calculator with federal and state tax estimates.",
    images: [getOgImage('tax')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/tax-calculator'),
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

export default function IncomeTaxCalculatorPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // WebApplication Schema
      {
        "@type": "WebApplication",
        "@id": getWebAppId('/tax-calculator'),
        "name": "Income Tax Calculator",
        "url": getUrl('/tax-calculator'),
        "description": "Free online income tax calculator. Calculate federal income tax, state tax, FICA tax, AGI, taxable income with ATL/BTL deductions, tax credits (Child Tax Credit, Education Credits), and take-home pay. Includes One Big Beautiful Bill provisions.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate federal income tax with 7 tax brackets",
          "State and local income tax calculation (user-defined rate)",
          "FICA tax calculator (Social Security + Medicare + Additional Medicare)",
          "ATL Deductions (IRA, Student Loan, Tips, Overtime, Car Loan, Seniors)",
          "BTL Deductions (Standard vs Itemized: Mortgage, Charity, Medical, SALT)",
          "Tax Credits (Child Tax Credit, Child Care Credit, Education Credits)",
          "AGI and Taxable Income calculation",
          "Effective and marginal tax rate analysis",
          "Take-home pay calculation",
          "One Big Beautiful Bill provisions",
          "Share and export results"
        ]
      },
      // BreadcrumbList Schema
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/tax-calculator'),
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
            "name": "Income Tax Calculator",
            "item": getUrl('/tax-calculator')
          }
        ]
      },
      // FAQPage Schema
      {
        "@type": "FAQPage",
        "@id": getFaqId('/tax-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate my income tax?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate your income tax, enter your annual gross income, select your filing status (single, married, or head of household), and enter your state/local tax rate percentage. The calculator will compute federal tax using 2025 tax brackets, state/local tax (using your entered rate), and FICA tax (Social Security and Medicare). Your take-home pay and effective tax rate will be displayed instantly."
            }
          },
          {
            "@type": "Question",
            "name": "What is the 2025 federal tax rate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The 2025 federal tax rates range from 10% to 37%, applied progressively across seven tax brackets. For single filers: 10% ($0-$11,600), 12% ($11,600-$47,150), 22% ($47,150-$100,525), 24% ($100,525-$191,950), 32% ($191,950-$243,725), 35% ($243,725-$609,350), and 37% (over $609,350). Married filing jointly has different brackets with higher income thresholds. Remember, only income within each bracket is taxed at that rate, not your entire income."
            }
          },
          {
            "@type": "Question",
            "name": "How is take-home pay calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Take-home pay is your gross income minus all taxes: federal income tax, state income tax, Social Security tax (6.2%), and Medicare tax (1.45%). The calculator applies 2024 tax brackets and standard deductions to determine your net income. For example, a $75,000 salary results in approximately $57,000-$62,000 take-home pay, depending on your state and filing status."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between effective and marginal tax rate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your marginal tax rate is the rate applied to your last dollar of income (your tax bracket). Your effective tax rate is the average rate you pay on all your income (total tax divided by gross income). For example, if you're in the 22% bracket but your effective rate is 15%, you pay an average of 15% on all income, but 22% on additional income above that bracket's threshold."
            }
          },
          {
            "@type": "Question",
            "name": "How can I reduce my tax liability?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Reduce taxes by maximizing 401(k) contributions (up to $23,000 in 2024), contributing to HSA accounts ($4,150 single/$8,300 family), claiming all eligible tax credits (child tax credit, education credits), and itemizing deductions if they exceed the standard deduction ($14,600 single/$29,200 married in 2024). Consider consulting a tax professional for personalized strategies."
            }
          }
        ]
      },
      // HowTo Schema
      {
        "@type": "HowTo",
        "@id": getHowToId('/tax-calculator'),
        "name": "How to Use the Income Tax Calculator",
        "description": "Calculate your income tax and take-home pay in 4 simple steps",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": {
          "@type": "HowToTool",
          "name": "Income Tax Calculator"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Your Annual Income",
            "text": "Input your gross annual income (before taxes). This is your total salary or wages before any deductions.",
            "url": getStepUrl('/tax-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Select Filing Status",
            "text": "Choose Single, Married Filing Jointly, or Head of Household. Your filing status affects tax brackets and standard deductions.",
            "url": getStepUrl('/tax-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Enter State+Local Tax Rate",
            "text": "Enter your state and local income tax rate percentage. You can find this on your previous tax return or state tax website. If you live in a state with no income tax (AK, FL, NV, SD, TN, TX, WA, WY, NH), enter 0.",
            "url": getStepUrl('/tax-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "View Your Tax Estimate",
            "text": "Click 'Calculate Taxes' to see your federal tax, state tax, FICA tax, total tax liability, take-home pay, effective tax rate, and tax saving tips.",
            "url": getStepUrl('/tax-calculator', 4)
          }
        ]
      },
      // Article Schema
      {
        "@type": "Article",
        "@id": getArticleId('/tax-calculator'),
        "headline": "Income Tax Calculator - Complete Guide to Federal & State Tax Calculation",
        "description": "Comprehensive guide to income tax calculation with free calculator. Learn how to calculate federal tax, state tax, FICA, understand tax brackets, deductions, and credits to optimize your tax strategy.",
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
        "image": getOgImage('tax'),
        "articleBody": "Calculate your income taxes accurately with our free tax calculator. Understand federal tax brackets, state taxes, FICA contributions, and learn how to maximize deductions and credits to reduce your tax liability and increase your take-home pay."
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
      <h1 className="sr-only">
        Income Tax Calculator - Free Federal and State Tax Calculator with ATL/BTL Deductions, Tax Credits, AGI and Taxable Income Calculator
      </h1>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" 
              itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/financial" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Financial</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">Tax Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Income Tax Calculator Tool">
        <div className="container mx-auto px-4">
          <IncomeTaxCalculator />
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Income Tax Calculator Information">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* What is Tax Calculator */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What is an Income Tax Calculator?</h2>
                <p className="text-gray-700 mb-4">
                  An income tax calculator is a free online tool that estimates your federal and state income taxes based on your 
                  gross income, filing status, deductions, credits, and location. It calculates Adjusted Gross Income (AGI), 
                  taxable income using the progressive tax bracket system, state income tax, and FICA taxes (Social Security, 
                  Medicare, and Additional Medicare Tax).
                </p>
                <p className="text-gray-700">
                  Our income tax calculator provides accurate estimates with Above-the-Line (ATL) deductions, Below-the-Line 
                  (BTL) deductions (Standard vs Itemized), tax credits, and includes the latest One Big Beautiful Bill 
                  provisions (tips deduction, overtime compensation, car loan interest, seniors deduction). It's perfect for tax 
                  planning, comparing job offers, budgeting, and understanding your tax liability and take-home pay.
                </p>
              </div>

              {/* How Tax is Calculated */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How is Income Tax Calculated?</h2>
                <p className="text-gray-700 mb-4">
                  Income tax calculation involves multiple steps with ATL/BTL deductions, tax credits, and progressive tax brackets:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li><strong>Gross Income:</strong> Wages + Interest + Dividends + Capital Gains + Other Income</li>
                  <li><strong>ATL Deductions:</strong> IRA contributions, student loan interest, tips, overtime, car loan interest, seniors deduction</li>
                  <li><strong>AGI (Adjusted Gross Income):</strong> Gross Income - ATL Deductions</li>
                  <li><strong>BTL Deductions:</strong> Standard ($15,000 single/$30,000 married) or Itemized (mortgage, charity, medical, SALT)</li>
                  <li><strong>Taxable Income:</strong> AGI - BTL Deductions</li>
                  <li><strong>Federal Tax:</strong> Applied progressively across 7 tax brackets (10% to 37%)</li>
                  <li><strong>State + Local Tax:</strong> User enters their combined state and local tax rate (0% to ~13%)</li>
                  <li><strong>FICA Tax:</strong> Social Security (6.2%, capped at $176,100) + Medicare (1.45% + 0.9% additional for high earners)</li>
                  <li><strong>Tax Credits:</strong> Subtract credits (Child Tax Credit, Education Credits, etc.) from total tax</li>
                </ol>
                <p className="text-gray-700 mt-4">
                  Your take-home pay is gross income minus all these taxes. The effective tax rate is your total tax 
                  divided by gross income, typically 15-25% for middle-income earners. State and local tax rates vary 
                  by location - enter your specific rate for accurate calculations.
                </p>
              </div>

              {/* Federal Tax Brackets */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Federal Tax Brackets</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Single Filers:</h3>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>10% - $0 to $11,600</li>
                      <li>12% - $11,600 to $47,150</li>
                      <li>22% - $47,150 to $100,525</li>
                      <li>24% - $100,525 to $191,950</li>
                      <li>32% - $191,950 to $243,725</li>
                      <li>35% - $243,725 to $609,350</li>
                      <li>37% - Over $609,350</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Married Filing Jointly:</h3>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>10% - $0 to $23,200</li>
                      <li>12% - $23,200 to $94,300</li>
                      <li>22% - $94,300 to $201,050</li>
                      <li>24% - $201,050 to $383,900</li>
                      <li>32% - $383,900 to $487,450</li>
                      <li>35% - $487,450 to $731,200</li>
                      <li>37% - Over $731,200</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tax Saving Strategies */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tax Saving Strategies</h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">💰</span>
                    <span><strong>401(k) Contributions:</strong> Max contribution $23,500 - reduces taxable income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">🏥</span>
                    <span><strong>HSA Accounts:</strong> Triple tax advantage - $4,300 (single) or $8,550 (family) limit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">🆕</span>
                    <span><strong>NEW: Tips Deduction:</strong> Deduct up to $25,000 in qualified tips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">🆕</span>
                    <span><strong>NEW: Overtime Deduction:</strong> Deduct up to $12,500 (single) or $25,000 (married)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">🆕</span>
                    <span><strong>NEW: Car Loan Interest:</strong> Deduct up to $10,000 in interest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">🆕</span>
                    <span><strong>NEW: Seniors Deduction:</strong> Age 65+? Claim $6,000 (single) or $12,000 (married)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">👨‍👩‍👧</span>
                    <span><strong>Child Tax Credit:</strong> Up to $2,200 per qualifying child</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">📚</span>
                    <span><strong>Education Credits:</strong> American Opportunity Credit ($2,500) or Lifetime Learning Credit ($2,000)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">🏠</span>
                    <span><strong>Itemize Deductions:</strong> Mortgage interest, property taxes, charitable donations</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions About Income Tax
              </h2>
              
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                
                {/* FAQ 1 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate my income tax?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate your income tax, enter your annual gross income, select your filing status (single, 
                      married, or head of household), and enter your state/local tax rate. The calculator will compute federal tax 
                      using current tax brackets, state/local tax (using your entered rate), and FICA tax (Social Security and Medicare). 
                      Your take-home pay and effective tax rate will be displayed instantly. The calculation accounts for the current 
                      standard deduction and progressive tax brackets.
                    </p>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the federal tax rate?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The federal tax rates range from 10% to 37%, applied progressively across seven tax brackets. 
                      For single filers: 10% ($0-$11,600), 12% ($11,600-$47,150), 22% ($47,150-$100,525), 24% ($100,525-$191,950), 
                      32% ($191,950-$243,725), 35% ($243,725-$609,350), and 37% (over $609,350). Married filing jointly has 
                      different brackets with higher income thresholds. Remember, only income within each bracket is taxed at 
                      that rate, not your entire income.
                    </p>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How is take-home pay calculated?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Take-home pay is your gross income minus all taxes: federal income tax, state/local income tax (based on 
                      your entered rate), Social Security tax (6.2%), and Medicare tax (1.45%). The calculator applies 2025 
                      tax brackets and standard deductions to determine your net income. For example, a $75,000 salary typically 
                      results in approximately $57,000-$62,000 take-home pay, depending on your state/local tax rate and filing 
                      status. Nine states (Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, Wyoming, and 
                      New Hampshire) have no state income tax (enter 0% for these states).
                    </p>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the difference between effective and marginal tax rate?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Your marginal tax rate is the rate applied to your last dollar of income (your highest tax bracket). 
                      Your effective tax rate is the average rate you pay on all your income (total tax divided by gross income). 
                      For example, if you earn $75,000, you might be in the 22% marginal bracket, but your effective rate might 
                      be only 15% because lower portions of your income are taxed at lower rates (10% and 12%). The marginal 
                      rate matters for decisions about earning additional income or taking deductions.
                    </p>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How can I reduce my tax liability?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Reduce taxes by maximizing 401(k) contributions (up to $23,500), contributing to HSA accounts 
                      ($4,300 single/$8,550 family), claiming all eligible tax credits (child tax credit up to $2,200 per child, 
                      education credits up to $2,500), and itemizing deductions if they exceed the standard deduction ($15,000 
                      single/$30,000 married). New deductions available: deduct up to $25,000 in qualified tips, $12,500/$25,000 in overtime, 
                      $10,000 in car loan interest, and $6,000/$12,000 seniors deduction (age 65+). Other strategies include tax-loss harvesting, 
                      charitable donations, and timing income and deductions. Consider consulting a tax professional for personalized strategies tailored 
                      to your situation.
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
                      className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Salary Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate gross to net salary</p>
                </Link>
                <Link href="/percentage-calculator" 
                      className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate tax percentages</p>
                </Link>
                <Link href="/mortgage-calculator" 
                      className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Mortgage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate mortgage with tax benefits</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

