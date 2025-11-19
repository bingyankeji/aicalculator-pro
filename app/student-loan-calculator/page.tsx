import { Metadata } from "next";
import Link from "next/link";
import { StudentLoanCalculator } from "@/components/Calculator/StudentLoanCalculator";
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
  title: "Student Loan Calculator (Free, No signup) - Repayment | AICalculator",
  description: "Free student loan calculator with no sign-up required. Calculate your student loan payments with our comprehensive calculator. Compare Standard, Extended, Income-Driven, and PSLF repayment plans. Find the best repayment strategy, calculate forgiveness eligibility, and save money on student loans.",
  keywords: [
    "student loan calculator",
    "free student loan calculator",
    "student loan calculator no signup",
    "student loan repayment calculator",
    "PSLF calculator",
    "income driven repayment calculator",
    "student loan forgiveness",
    "student loan interest calculator",
    "student loan payment calculator",
    "federal student loan calculator",
    "student loan refinancing calculator",
    "student debt calculator",
    "loan repayment calculator",
    "student loan consolidation calculator",
    "REPAYE calculator",
    "PAYE calculator",
    "IBR calculator",
    "ICR calculator",
    "public service loan forgiveness calculator",
    "student loan monthly payment",
    "how to calculate student loan payment",
    "student loan interest rate calculator",
    "student loan amortization calculator",
    "student loan payoff calculator",
    "student loan refinance calculator",
    "government student loan calculator",
    "student loan budget calculator",
    "student loan help calculator",
    "student loan terms calculator"
  ],
  openGraph: {
    title: "Student Loan Calculator (Free, No signup) - AICalculator",
    description: "Free student loan calculator with no sign-up required. Compare multiple repayment plans. Find the best strategy for your federal student loans and calculate potential forgiveness.",
    type: "website",
    url: getUrl('/student-loan-calculator'),
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Loan Calculator (Free, No signup) - AICalculator",
    description: "Free student loan calculator with no sign-up required. Compare Standard, Income-Driven, and PSLF plans. Calculate monthly payments, total interest, and potential forgiveness.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: getUrl('/student-loan-calculator'),
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

export default function StudentLoanCalculatorPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Student Loan Calculator",
        "@id": getWebAppId('/student-loan-calculator'),
        "url": getUrl('/student-loan-calculator'),
        "description": "Comprehensive student loan calculator with multiple repayment plans comparison, forgiveness calculation, and personalized recommendations.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Multiple repayment plans comparison",
          "PSLF forgiveness calculator",
          "Income-driven repayment plans",
          "Extra payment analysis",
          "Loan amortization schedule",
          "Forgiveness eligibility check",
          "Monthly payment calculation",
          "Total interest analysis"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/student-loan-calculator'),
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
            "name": "Student Loan Calculator",
            "item": getUrl('/student-loan-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/student-loan-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate my student loan monthly payment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate your student loan monthly payment, multiply your loan amount by the monthly interest rate (annual rate ÷ 12), then use the amortization formula: Payment = P × [r(1+r)^n] ÷ [(1+r)^n-1], where P is principal, r is monthly rate, and n is number of payments. Our calculator does this automatically and shows payments for different repayment plans."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between Standard and Income-Driven repayment plans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard repayment has fixed monthly payments for 10 years, paying the least interest overall. Income-Driven Repayment (IDR) plans cap payments at 10-20% of your discretionary income and extend repayment to 20-25 years, with remaining balance forgiven. IDR plans result in lower monthly payments but potentially more total interest paid."
            }
          },
          {
            "@type": "Question",
            "name": "How do I qualify for PSLF (Public Service Loan Forgiveness)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To qualify for PSLF, you must: 1) Have federal Direct Loans, 2) Work full-time for a qualifying public service employer, 3) Make 120 qualifying monthly payments under an IDR plan, 4) Be current on your payments. After 120 payments (10 years), your remaining loan balance is forgiven tax-free. Use our PSLF calculator to check your eligibility."
            }
          },
          {
            "@type": "Question",
            "name": "Which student loan repayment plan is best?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The best repayment plan depends on your situation: Standard plan is best if you can afford higher payments (least total interest). Income-Driven plans are best if you need lower payments or work in public service (PSLF eligibility). Extended/Graduated plans offer middle-ground options. Our calculator compares all plans to find the most cost-effective option for your income and loan terms."
            }
          },
          {
            "@type": "Question",
            "name": "How much interest will I pay on my student loans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Student loan interest depends on your loan amount, interest rate, and repayment term. For example, a $30,000 loan at 4.99% for 10 years costs about $8,300 in total interest. Our calculator shows exact interest amounts for different repayment plans and helps you find strategies to minimize interest costs through extra payments or forgiveness programs."
            }
          },
          {
            "@type": "Question",
            "name": "Can I save money by making extra student loan payments?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, extra payments can save significant money. Even $100 extra per month can save thousands in interest and shorten your repayment period by several years. Extra payments go directly toward principal, reducing future interest. Our calculator shows exactly how much you can save with different extra payment amounts."
            }
          },
          {
            "@type": "Question",
            "name": "What are the different types of federal student loan repayment plans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Federal student loan repayment plans include: Standard (10 years fixed), Extended (up to 25 years), Graduated (payments increase over time), Income-Driven (REPAYE, PAYE, IBR, ICR based on income), and Public Service Loan Forgiveness (10 years with forgiveness). Each plan has different eligibility requirements, payment amounts, and forgiveness terms."
            }
          },
          {
            "@type": "Question",
            "name": "How does student loan forgiveness work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Student loan forgiveness programs cancel remaining loan balances after meeting specific requirements: PSLF forgives after 120 qualifying payments in public service (10 years), Income-Driven plans forgive after 20-25 years of payments, and Teacher Loan Forgiveness forgives up to $17,500 after 5 years of teaching. Our calculator estimates potential forgiveness amounts and eligibility."
            }
          },
          {
            "@type": "Question",
            "name": "Should I refinance my student loans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Consider refinancing if you have good credit, stable income, and can get a lower interest rate than your current federal loans. However, refinancing federal loans means losing access to income-driven plans, forgiveness programs, and other federal benefits. Use our calculator to compare your current federal payments with potential private refinance offers before deciding."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Student Loan Calculator",
        "description": "Step-by-step guide to calculating your student loan repayment options",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": {
          "@type": "HowToTool",
          "name": "Student Loan Calculator"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Loan Details",
            "text": "Input your total loan amount, interest rate, and desired loan term. Include all federal and private student loans for accurate calculations.",
            "url": getStepUrl('/student-loan-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Add Income Information",
            "text": "Enter your annual income and family size. This helps determine eligibility for income-driven repayment plans and calculate your discretionary income.",
            "url": getStepUrl('/student-loan-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Select Loan Type",
            "text": "Choose whether your loans are subsidized, unsubsidized, PLUS loans, or refinanced. This affects interest accrual during school and repayment options.",
            "url": getStepUrl('/student-loan-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Check PSLF Eligibility",
            "text": "Indicate if you work in public service to see if you qualify for Public Service Loan Forgiveness after 120 qualifying payments.",
            "url": getStepUrl('/student-loan-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Add Extra Payments",
            "text": "Enter any extra monthly payment amount to see how it affects your total interest paid and payoff timeline.",
            "url": getStepUrl('/student-loan-calculator', 5)
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Compare Repayment Plans",
            "text": "Review the comparison table showing monthly payments, total interest, and forgiveness amounts for all available repayment plans.",
            "url": getStepUrl('/student-loan-calculator', 6)
          },
          {
            "@type": "HowToStep",
            "position": 7,
            "name": "Choose Best Option",
            "text": "Select the repayment plan that offers the best combination of affordable monthly payments and total cost based on your financial situation.",
            "url": getStepUrl('/student-loan-calculator', 7)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/student-loan-calculator'),
        "headline": "Student Loan Calculator - Complete Guide to Repayment Plans & Forgiveness",
        "description": "Comprehensive guide to student loan repayment with free calculator. Compare Standard, Income-Driven, and PSLF plans. Learn strategies to save money and pay off loans faster.",
        "author": {
          "@type": "Organization",
          "name": "AICalculator",
          "url": getUrl('/')
        },
        "publisher": {
          "@type": "Organization",
          "name": "AICalculator",
          "logo": {
            "@type": "ImageObject",
            "url": getUrl('/logo.png')
          }
        },
        "datePublished": "2025-11-16",
        "dateModified": "2025-11-16",
        "image": getOgImage('student-loan'),
        "articleBody": "Student loans are a significant financial burden for millions of Americans. Use our comprehensive calculator to compare repayment plans including Standard, Extended, Graduated, Income-Driven (IDR), and Public Service Loan Forgiveness (PSLF). Make informed decisions about your student loan repayment strategy."
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
        Student Loan Calculator - Compare Repayment Plans & Find Best Options
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
              <span itemProp="name" className="text-gray-900 font-semibold">Student Loan Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Student Loan Calculator Tool">
        <div className="container mx-auto px-4">
          <StudentLoanCalculator />
        </div>
      </section>

      {/* Educational Content for SEO */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Student Loan Education and Resources">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Student Loan Repayment Options
            </h2>

            {/* Main Content Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Federal Student Loans Overview */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    🎓
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Federal Student Loans</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Federal student loans offer multiple repayment options, forgiveness programs, and borrower protections not available with private loans. Understanding these benefits is crucial for making informed repayment decisions.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Income-Driven Plans:</strong> Payments based on discretionary income</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Forgiveness Programs:</strong> PSLF and IDR forgiveness options</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Deferment/Forbearance:</strong> Temporary payment relief options</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Fixed Interest Rates:</strong> Predictable payment amounts</span>
                  </div>
                </div>
              </div>

              {/* Repayment Plan Types */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                    📊
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Repayment Plan Options</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Federal loans offer several repayment plans, each designed for different financial situations. Choosing the right plan can save thousands in interest and make payments more manageable.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">📈</span>
                    <span><strong>Standard Plan:</strong> 10 years, fixed payments, least interest</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">💰</span>
                    <span><strong>Extended Plan:</strong> Up to 25 years, lower monthly payments</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">📊</span>
                    <span><strong>Graduated Plan:</strong> Payments start low, increase over time</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">🎯</span>
                    <span><strong>Income-Driven:</strong> Based on income and family size</span>
                  </div>
                </div>
              </div>

              {/* PSLF Information */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border-2 border-blue-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-2xl text-white">
                    🏛️
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Public Service Loan Forgiveness (PSLF)</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  PSLF forgives remaining federal student loan balances after 120 qualifying payments while working full-time for qualifying public service employers.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">👷</span>
                    <span><strong>Eligible Employers:</strong> Government organizations, 501(c)(3) nonprofits</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">💼</span>
                    <span><strong>Qualifying Payments:</strong> 120 monthly payments (10 years)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✅</span>
                    <span><strong>Tax-Free Forgiveness:</strong> No income tax on forgiven amount</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">🎯</span>
                    <span><strong>Employment Certification:</strong> Required annually for PSLF</span>
                  </div>
                </div>
              </div>

              {/* Income-Driven Repayment Plans */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg border-2 border-purple-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-2xl text-white">
                    💳
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Income-Driven Repayment (IDR)</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  IDR plans cap monthly payments at a percentage of your discretionary income and forgive remaining balances after 20-25 years of qualifying payments.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">💡</span>
                    <span><strong>REPAYE:</strong> 10% of discretionary income, 20-year forgiveness</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">💡</span>
                    <span><strong>PAYE:</strong> 10% of discretionary income, 20-year forgiveness</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">💡</span>
                    <span><strong>IBR:</strong> 15% of discretionary income, 25-year forgiveness</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">💡</span>
                    <span><strong>ICR:</strong> 20% of discretionary income, 25-year forgiveness</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Loan Statistics */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Student Loan Statistics & Trends
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$1.75 Trillion</div>
                  <p className="text-gray-600">Total U.S. Student Loan Debt</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">46 Million</div>
                  <p className="text-gray-600">Americans with Student Loan Debt</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">$37,693</div>
                  <p className="text-gray-600">Average Borrower Balance</p>
                </div>
              </div>
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong className="text-blue-900">💡 Key Insight:</strong> The average student loan borrower takes 20 years to repay their loans, with many qualifying for forgiveness programs they may not know about. Use our calculator to explore your options.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                {/* FAQ 1 */}
                <div className="border-b border-gray-200 pb-6"
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate my student loan monthly payment?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate your student loan monthly payment, multiply your loan amount by the monthly interest rate (annual rate ÷ 12), then use the amortization formula: Payment = P × [r(1+r)^n] ÷ [(1+r)^n-1], where P is principal, r is monthly rate, and n is number of payments. Our calculator does this automatically and shows payments for different repayment plans.
                    </p>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-gray-200 pb-6"
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the difference between Standard and Income-Driven repayment plans?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Standard repayment has fixed monthly payments for 10 years, paying the least interest overall. Income-Driven Repayment (IDR) plans cap payments at 10-20% of your discretionary income and extend repayment to 20-25 years, with remaining balance forgiven. IDR plans result in lower monthly payments but potentially more total interest paid.
                    </p>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="border-b border-gray-200 pb-6"
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I qualify for PSLF (Public Service Loan Forgiveness)?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To qualify for PSLF, you must: 1) Have federal Direct Loans, 2) Work full-time for a qualifying public service employer, 3) Make 120 qualifying monthly payments under an IDR plan, 4) Be current on your payments. After 120 payments (10 years), your remaining loan balance is forgiven tax-free. Use our PSLF calculator to check your eligibility.
                    </p>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="border-b border-gray-200 pb-6"
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Which student loan repayment plan is best?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The best repayment plan depends on your situation: Standard plan is best if you can afford higher payments (least total interest). Income-Driven plans are best if you need lower payments or work in public service (PSLF eligibility). Extended/Graduated plans offer middle-ground options. Our calculator compares all plans to find the most cost-effective option for your income and loan terms.
                    </p>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much interest will I pay on my student loans?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Student loan interest depends on your loan amount, interest rate, and repayment term. For example, a $30,000 loan at 4.99% for 10 years costs about $8,300 in total interest. Our calculator shows exact interest amounts for different repayment plans and helps you find strategies to minimize interest costs through extra payments or forgiveness programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Financial Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/mortgage-calculator"
                      className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="font-semibold text-gray-900">Mortgage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate home loan payments</p>
                </Link>
                <Link href="/loan-calculator"
                      className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="font-semibold text-gray-900">Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Personal loan payment calculator</p>
                </Link>
                <Link href="/debt-payoff-calculator"
                      className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">💸</div>
                  <div className="font-semibold text-gray-900">Debt Payoff Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Optimize your debt repayment strategy</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}