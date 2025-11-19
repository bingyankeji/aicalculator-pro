import { Metadata } from "next";
import Link from "next/link";
import { MortgageCalculatorV2 } from "@/components/Calculator/MortgageCalculatorV2";
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
  title: "Mortgage Calculator (Free, No signup) - Monthly Payments | AICalculator",
  description: "Free mortgage calculator with no sign-up required. Calculate your monthly mortgage payment with our advanced calculator. Get instant affordability analysis, risk assessment, DTI ratio calculation, and personalized recommendations. Free mortgage calculator with PMI, property tax, and insurance.",
  keywords: [
    "mortgage calculator",
    "free mortgage calculator",
    "mortgage calculator no signup",
    "home loan calculator",
    "mortgage payment calculator",
    "house affordability calculator",
    "can I afford a house",
    "mortgage affordability calculator",
    "home loan payment calculator",
    "mortgage rates calculator",
    "house payment calculator",
    "mortgage estimator",
    "home buying calculator",
    "PMI calculator",
    "DTI calculator",
    "debt to income ratio calculator",
    "mortgage payment estimator",
    "monthly mortgage payment",
    "home mortgage calculator",
    "mortgage amortization calculator",
    "refinance calculator",
    "mortgage interest calculator",
    "home loan estimator",
    "mortgage cost calculator",
    "house loan calculator"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Mortgage Calculator (Free, No signup) - AICalculator",
    description: "Free mortgage calculator with no sign-up required. Calculate mortgage payments and get detailed affordability analysis, risk assessment, and personalized home buying recommendations.",
    type: "website",
    url: getUrl('/mortgage-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('mortgage'),
        width: 1200,
        height: 630,
        alt: 'Free Mortgage Calculator - No Sign-up Required',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mortgage Calculator (Free, No signup) - AICalculator",
    description: "Free mortgage calculator with no sign-up required. Calculate mortgage payments and discover how much house you can afford with detailed insights and recommendations.",
    images: [getOgImage('mortgage')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/mortgage-calculator'),
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

export default function MortgageCalculatorPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": getWebAppId('/mortgage-calculator'),
        "name": "Mortgage Calculator",
        "url": getUrl('/mortgage-calculator'),
        "description": "Free mortgage calculator with detailed affordability analysis, DTI ratio calculation, and personalized recommendations for home buyers.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Monthly payment calculation",
          "Affordability analysis",
          "DTI ratio calculation",
          "PMI calculation",
          "Amortization schedule",
          "Extra payment scenarios",
          "Biweekly payment comparison"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/mortgage-calculator'),
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
            "name": "Mortgage Calculator",
            "item": getUrl('/mortgage-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/mortgage-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is PITI in a mortgage payment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PITI stands for Principal, Interest, Taxes, and Insurance. These are the four main components of your monthly mortgage payment. Principal is the amount borrowed, Interest is the cost of borrowing, Taxes are property taxes paid to local government, and Insurance is homeowners insurance to protect your investment."
            }
          },
          {
            "@type": "Question",
            "name": "What is PMI and when is it required?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Private Mortgage Insurance (PMI) is typically required when your down payment is less than 20% of the home's purchase price. PMI costs between 0.5% to 1.5% of the loan amount annually, which translates to $50-$200+ per month. PMI can be removed once you reach 20% equity in your home."
            }
          },
          {
            "@type": "Question",
            "name": "How much house can I afford?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Financial experts recommend that housing costs shouldn't exceed 28% of your gross monthly income (front-end ratio), and total debt shouldn't exceed 36% of gross monthly income (back-end ratio). These are general guidelines, and your specific affordability depends on your income, debts, credit score, and down payment amount."
            }
          },
          {
            "@type": "Question",
            "name": "Should I choose a 15-year or 30-year mortgage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A 15-year mortgage has higher monthly payments but lower interest rates and significantly less total interest paid over the life of the loan. A 30-year mortgage offers lower monthly payments, providing more flexibility in your budget, but you'll pay more interest over time. Choose based on your financial goals, monthly budget, and long-term plans."
            }
          },
          {
            "@type": "Question",
            "name": "How can I save money on my mortgage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can save money by: 1) Increasing your down payment to 20% to eliminate PMI, 2) Choosing a shorter loan term (15 vs 30 years), 3) Making extra principal payments monthly, 4) Shopping around for the best interest rates, and 5) Considering bi-weekly payments instead of monthly payments."
            }
          },
          {
            "@type": "Question",
            "name": "What credit score do I need for a mortgage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most conventional loans require a minimum credit score of 620, though you'll get better interest rates with scores above 740. FHA loans may accept scores as low as 580 with a 3.5% down payment, or 500-579 with 10% down. VA and USDA loans typically require scores of 620 or higher. Higher credit scores can save you thousands in interest over the life of your loan."
            }
          },
          {
            "@type": "Question",
            "name": "Should I choose a 15-year or 30-year mortgage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A 15-year mortgage has higher monthly payments but significantly lower total interest costs and builds equity faster. A 30-year mortgage offers lower monthly payments and more financial flexibility but costs more in interest over time. Choose 15-year if you can afford higher payments and want to pay off your home faster. Choose 30-year if you need lower payments or want to invest the difference elsewhere."
            }
          },
          {
            "@type": "Question",
            "name": "What is included in my monthly mortgage payment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your monthly mortgage payment typically includes four components (PITI): Principal (loan amount repayment), Interest (cost of borrowing), property Taxes (paid to local government), and Insurance (homeowners insurance). If your down payment is less than 20%, you'll also pay PMI (Private Mortgage Insurance). Some payments may include HOA fees if applicable."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/mortgage-calculator'),
        "name": "How to Use a Mortgage Calculator",
        "description": "Step-by-step guide to calculating your mortgage payment and affordability",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": {
          "@type": "HowToTool",
          "name": "Mortgage Calculator"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Home Price",
            "text": "Input the purchase price of the home you're considering buying. This is the total cost before your down payment.",
            "url": getStepUrl('/mortgage-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Set Down Payment",
            "text": "Enter your down payment as a percentage or dollar amount. 20% is recommended to avoid PMI (Private Mortgage Insurance).",
            "url": getStepUrl('/mortgage-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Choose Loan Term",
            "text": "Select your loan term, typically 15 or 30 years. Shorter terms have higher monthly payments but lower total interest.",
            "url": getStepUrl('/mortgage-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Enter Interest Rate",
            "text": "Input the annual interest rate offered by your lender. Current rates vary based on credit score and market conditions.",
            "url": getStepUrl('/mortgage-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Add Property Taxes and Insurance",
            "text": "Include annual property taxes, home insurance, PMI (if down payment is less than 20%), HOA fees, and other costs.",
            "url": getStepUrl('/mortgage-calculator', 5)
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Calculate and Analyze",
            "text": "Click Calculate to see your monthly payment, total costs, amortization schedule, and affordability analysis with DTI ratio.",
            "url": getStepUrl('/mortgage-calculator', 6)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/mortgage-calculator'),
        "headline": "Mortgage Calculator - Complete Guide to Home Loan Payments & Affordability",
        "description": "Comprehensive guide to mortgage calculations with free calculator. Learn how to calculate monthly payments, understand amortization, analyze affordability, and make informed home buying decisions.",
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
        "image": getOgImage('mortgage'),
        "articleBody": "A mortgage calculator helps you estimate your monthly home loan payment including principal, interest, property taxes, insurance, and PMI. Understanding your mortgage payment is crucial for home buying decisions. Use our calculator to analyze affordability, compare loan terms, and plan your home purchase budget."
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
      
      {/* SEO: Hidden H1 for search engines */}
      <h1 className="sr-only">Mortgage Calculator - Free Home Loan Payment Calculator with Affordability Analysis</h1>
      
      {/* Breadcrumb Navigation for SEO */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
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
              <span itemProp="name" className="text-gray-900 font-semibold">Mortgage Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Mortgage Calculator Tool">
        <div className="container mx-auto px-4">
          <MortgageCalculatorV2 />
        </div>
      </section>

      {/* Educational Content for SEO */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Mortgage Education and Resources">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Your Mortgage Payment
            </h2>

            {/* Main Content Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* PITI Card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    🏦
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">What is PITI?</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Your monthly mortgage payment typically includes four components:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">P</div>
                    <div>
                      <div className="font-semibold text-gray-900">Principal</div>
                      <div className="text-sm text-gray-600">The amount borrowed to purchase your home</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">I</div>
                    <div>
                      <div className="font-semibold text-gray-900">Interest</div>
                      <div className="text-sm text-gray-600">The cost of borrowing money from the lender</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">T</div>
                    <div>
                      <div className="font-semibold text-gray-900">Taxes</div>
                      <div className="text-sm text-gray-600">Property taxes paid to local government</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">I</div>
                    <div>
                      <div className="font-semibold text-gray-900">Insurance</div>
                      <div className="text-sm text-gray-600">Homeowners insurance to protect your investment</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PMI Card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl">
                    🛡️
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">What is PMI?</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Private Mortgage Insurance (PMI) is typically required when your down payment is less than 20%.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 text-lg">•</span>
                    <span className="text-gray-700"><strong>Cost:</strong> 0.5% - 1.5% of loan amount annually ($50-$200+/month)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 text-lg">•</span>
                    <span className="text-gray-700"><strong>Removal:</strong> Can be removed once you reach 20% equity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 text-lg">•</span>
                    <span className="text-gray-700"><strong>Purpose:</strong> Protects the lender, not the borrower</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-gray-600">
                    <strong className="text-blue-900">ℹ️ Note:</strong> PMI requirements may vary by region and lender
                  </p>
                </div>
              </div>

              {/* Affordability Guidelines Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg border-2 border-green-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-2xl">
                    📊
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Affordability Guidelines</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Financial experts recommend following these rules:
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      28%
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Front-End Ratio</div>
                      <div className="text-gray-600">Housing costs shouldn't exceed 28% of gross monthly income</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      36%
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Back-End Ratio</div>
                      <div className="text-gray-600">Total debt shouldn't exceed 36% of gross monthly income</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      20%
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Down Payment</div>
                      <div className="text-gray-600">Aim for 20% to avoid PMI</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Money Saving Tips Card */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg border-2 border-purple-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-2xl">
                    💰
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">How to Save Money</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Smart strategies to reduce your mortgage costs:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Increase down payment to 20% to eliminate PMI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Choose a shorter loan term (15 vs 30 years)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Make extra principal payments monthly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Shop around for the best interest rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Consider bi-weekly payments instead of monthly</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Calculator Features Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl p-6 text-white mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  📊
                </div>
                <div>
                  <h3 className="text-xl font-bold">Advanced Calculator Features</h3>
                  <p className="text-sm text-white/90">Professional mortgage analysis beyond basic calculations</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-300">✓</span>
                  <span>Affordability analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-300">✓</span>
                  <span>Risk assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-300">✓</span>
                  <span>Personalized insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-300">✓</span>
                  <span>Money-saving strategies</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-300">✓</span>
                  <span>DTI ratio calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-300">✓</span>
                  <span>Detailed amortization</span>
                </div>
              </div>
            </div>

            {/* Regional Information */}
            <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>ℹ️</span>
                Regional Considerations
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Mortgage terms and requirements vary by region. This calculator uses common mortgage principles, but specific policies may differ based on your location.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border border-blue-200 p-4">
                  <div className="text-2xl mb-2">📋</div>
                  <div className="font-semibold text-gray-900 mb-2">Down Payment</div>
                  <p className="text-xs text-gray-600">Requirements typically range from 3% to 50% depending on loan type and region</p>
                </div>
                <div className="bg-white rounded-lg border border-blue-200 p-4">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="font-semibold text-gray-900 mb-2">Insurance</div>
                  <p className="text-xs text-gray-600">PMI, CMHC, or other mortgage insurance may be required for low down payments</p>
                </div>
                <div className="bg-white rounded-lg border border-blue-200 p-4">
                  <div className="text-2xl mb-2">📅</div>
                  <div className="font-semibold text-gray-900 mb-2">Loan Terms</div>
                  <p className="text-xs text-gray-600">Common loan terms range from 10 to 35 years depending on local regulations</p>
                </div>
              </div>
              <p className="text-xs text-blue-700 mt-4 font-medium">
                💡 Tip: Always consult with local lenders for specific requirements in your area
              </p>
            </div>

            {/* Detailed Educational Content */}
            <div className="mt-12 space-y-8">
              {/* What is a Mortgage */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What is a Mortgage?</h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 mb-4">
                    A <strong>mortgage</strong> is a loan secured by property, usually real estate. Lenders define it as the money borrowed to pay for real estate. In essence, the lender helps the buyer pay the seller of a house, and the buyer agrees to repay the money borrowed over a period of time, usually 15 or 30 years.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Each month, a payment is made from buyer to lender. A portion of the monthly payment is called the <strong>principal</strong>, which is the original amount borrowed. The other portion is the <strong>interest</strong>, which is the cost paid to the lender for using the money. There may be an escrow account involved to cover the cost of property taxes and insurance.
                  </p>
                  <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 mt-4">
                    <p className="text-sm text-gray-700">
                      <strong>💡 Did you know?</strong> The buyer cannot be considered the full owner of the mortgaged property until the last monthly payment is made. The most common mortgage loan is the conventional 30-year fixed-interest loan, representing 70% to 90% of all mortgages.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mortgage Components */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Mortgage Calculator Components</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Loan Amount</h4>
                    <p className="text-sm text-gray-700">
                      The amount borrowed from a lender or bank. In a mortgage, this equals the purchase price minus any down payment. The maximum loan amount typically correlates with household income and affordability.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Down Payment</h4>
                    <p className="text-sm text-gray-700">
                      The upfront payment of the purchase, usually a percentage of the total price. Lenders typically want 20% or more. If less than 20%, PMI is usually required. Higher down payments often mean better interest rates and loan approval odds.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Loan Term</h4>
                    <p className="text-sm text-gray-700">
                      The amount of time to repay the loan in full. Most fixed-rate mortgages are 15, 20, or 30 years. Shorter periods typically include lower interest rates but higher monthly payments.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Interest Rate</h4>
                    <p className="text-sm text-gray-700">
                      The percentage charged as borrowing cost. Fixed-rate mortgages (FRM) keep the same rate throughout, while adjustable-rate mortgages (ARM) start lower but can change based on market conditions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Costs Associated with Home Ownership */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Costs Associated with Home Ownership</h3>
                
                {/* Recurring Costs */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Recurring Costs</h4>
                  <p className="text-gray-700 mb-4">
                    Most recurring costs persist throughout and beyond the life of a mortgage. They are significant financial factors that increase over time due to inflation.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-1">Property Taxes</div>
                      <p className="text-sm text-gray-700">Taxes paid to governing authorities, usually managed by municipal or county governments. Varies by location.</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-1">Home Insurance</div>
                      <p className="text-sm text-gray-700">Protects the owner from accidents and property damage. May include personal liability coverage for injuries on/off the property.</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-1">HOA Fees</div>
                      <p className="text-sm text-gray-700">Fees imposed by homeowner's associations for maintaining common areas and amenities. Common in condos and townhomes.</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-1">Maintenance & Utilities</div>
                      <p className="text-sm text-gray-700">General upkeep, repairs, utilities, and maintenance. Commonly 1% or more of property value annually.</p>
                    </div>
                  </div>
                </div>

                {/* Non-Recurring Costs */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Non-Recurring Costs</h4>
                  <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <div className="font-semibold text-gray-900 mb-2">🏛️ Closing Costs</div>
                        <p className="text-xs text-gray-700">Attorney fees, title service, recording fee, appraisal, inspection, points, and more. Can be significant ($10,000+ on a $400,000 transaction).</p>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-2">🔨 Initial Renovations</div>
                        <p className="text-xs text-gray-700">Flooring, painting, kitchen updates, or complete overhauls. Optional but can add up quickly.</p>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-2">📦 Moving & Furnishing</div>
                        <p className="text-xs text-gray-700">New furniture, appliances, moving costs, and initial repairs.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Early Repayment Strategies */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Early Repayment and Extra Payments</h3>
                <p className="text-gray-700 mb-6">
                  Many mortgage borrowers want to pay off mortgages earlier to save on interest, sell their home, or refinance. Our calculator can factor in monthly, annual, or one-time extra payments. However, understand both advantages and disadvantages.
                </p>

                {/* Strategies */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Three Main Strategies</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg border border-green-200 p-4">
                      <div className="text-3xl mb-2">💵</div>
                      <div className="font-bold text-gray-900 mb-2">Extra Payments</div>
                      <p className="text-xs text-gray-700">Make additional payments beyond the monthly requirement. Decreases loan balance, reduces interest, and shortens loan term.</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                      <div className="text-3xl mb-2">📅</div>
                      <div className="font-bold text-gray-900 mb-2">Biweekly Payments</div>
                      <p className="text-xs text-gray-700">Pay half the monthly payment every two weeks. Results in 26 payments (13 months) per year, reducing interest and loan term.</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
                      <div className="text-3xl mb-2">🔄</div>
                      <div className="font-bold text-gray-900 mb-2">Refinance Shorter Term</div>
                      <p className="text-xs text-gray-700">Take out a new loan with a shorter term (e.g., 15 years). Lower interest rate but higher monthly payments.</p>
                    </div>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-green-700 mb-3">✓ Advantages</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">•</span>
                        <span><strong>Lower interest costs:</strong> Save thousands in interest over the loan term</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">•</span>
                        <span><strong>Shorter repayment period:</strong> Own your home faster</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">•</span>
                        <span><strong>Personal satisfaction:</strong> Freedom from debt obligations</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-red-700 mb-3">⚠️ Drawbacks</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">•</span>
                        <span><strong>Prepayment penalties:</strong> Some loans charge fees for early payoff</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">•</span>
                        <span><strong>Opportunity costs:</strong> Could invest money elsewhere for higher returns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">•</span>
                        <span><strong>Capital locked up:</strong> Money put in house can't be spent elsewhere</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">•</span>
                        <span><strong>Loss of tax deduction:</strong> Lower interest means less tax deduction</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section for SEO */}
            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                {/* FAQ 1 */}
                <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is PITI in a mortgage payment?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      PITI stands for <strong>Principal</strong>, <strong>Interest</strong>, <strong>Taxes</strong>, and <strong>Insurance</strong>. These are the four main components of your monthly mortgage payment. Principal is the amount borrowed, Interest is the cost of borrowing, Taxes are property taxes paid to local government, and Insurance is homeowners insurance to protect your investment.
                    </p>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is PMI and when is it required?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      <strong>Private Mortgage Insurance (PMI)</strong> is typically required when your down payment is less than 20% of the home's purchase price. PMI costs between 0.5% to 1.5% of the loan amount annually, which translates to $50-$200+ per month. PMI can be removed once you reach 20% equity in your home.
                    </p>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much house can I afford?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Financial experts recommend that housing costs shouldn't exceed <strong>28% of your gross monthly income</strong> (front-end ratio), and total debt shouldn't exceed <strong>36% of gross monthly income</strong> (back-end ratio). These are general guidelines, and your specific affordability depends on your income, debts, credit score, and down payment amount.
                    </p>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Should I choose a 15-year or 30-year mortgage?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      A <strong>15-year mortgage</strong> has higher monthly payments but lower interest rates and significantly less total interest paid over the life of the loan. A <strong>30-year mortgage</strong> offers lower monthly payments, providing more flexibility in your budget, but you'll pay more interest over time. Choose based on your financial goals, monthly budget, and long-term plans.
                    </p>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How can I save money on my mortgage?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <div className="text-gray-700" itemProp="text">
                      <p className="mb-3">You can save money on your mortgage through several strategies:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li><strong>Increase your down payment to 20%</strong> to eliminate PMI</li>
                        <li><strong>Choose a shorter loan term</strong> (15 vs 30 years)</li>
                        <li><strong>Make extra principal payments</strong> monthly or annually</li>
                        <li><strong>Shop around for the best interest rates</strong> from multiple lenders</li>
                        <li><strong>Consider bi-weekly payments</strong> instead of monthly payments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Links for SEO */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/" className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">🧮</div>
                  <div className="font-semibold text-gray-900">Basic Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Scientific and basic calculations</p>
                </Link>
                <Link href="/calculators" className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="font-semibold text-gray-900">All Calculators</div>
                  <p className="text-xs text-gray-600 mt-1">Browse all calculator tools</p>
                </Link>
                <Link href="/blog" className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">📚</div>
                  <div className="font-semibold text-gray-900">Financial Blog</div>
                  <p className="text-xs text-gray-600 mt-1">Tips and guides for home buying</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

