import { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from "next/link";
import BondCalculator from "@/components/Calculator/BondCalculator";
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
  title: "Bond Calculator - Calculate Bond Price, Yield, Duration & Convexity | AICalculator",
  description: "Free bond calculator with pricing, YTM, duration, convexity, and cash flow analysis. Compare multiple bond scenarios, assess risks, and get investment recommendations. Save and compare different bond investments side-by-side.",
  keywords: [
    "bond calculator",
    "bond price calculator",
    "bond yield calculator",
    "ytm calculator",
    "yield to maturity calculator",
    "bond duration calculator",
    "modified duration calculator",
    "bond convexity calculator",
    "bond valuation calculator",
    "bond pricing calculator",
    "current yield calculator",
    "accrued interest calculator",
    "dirty price calculator",
    "clean price calculator",
    "bond investment calculator",
    "coupon bond calculator",
    "bond cash flow calculator",
    "bond comparison tool",
    "macaulay duration calculator",
    "bond risk calculator"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Bond Calculator - Price, Yield, Duration & Convexity Analysis",
    description: "Calculate bond pricing, YTM, duration, convexity with cash flow analysis. Save and compare multiple bond scenarios to find the best investment.",
    type: "website",
    url: getUrl('/bond-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('bond'),
        width: 1200,
        height: 630,
        alt: 'Bond Calculator',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bond Calculator with Duration & Convexity",
    description: "Professional bond valuation tool with pricing, yield, duration, convexity analysis and scenario comparison.",
    images: [getOgImage('bond')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/bond-calculator'),
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

export default function BondCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": getWebAppId('/bond-calculator'),
        "name": "Bond Calculator",
        "url": getUrl('/bond-calculator'),
        "description": "Professional bond calculator with price valuation, yield to maturity (YTM), duration, convexity, and comprehensive cash flow analysis. Save and compare multiple bond scenarios to optimize investment decisions.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate bond price and yield to maturity",
          "Compute Macaulay and Modified Duration",
          "Calculate convexity for price sensitivity",
          "Detailed cash flow timeline analysis",
          "Clean price and dirty price calculation",
          "Accrued interest computation",
          "Price-yield relationship visualization",
          "Interest rate risk assessment",
          "Save and compare multiple bond scenarios",
          "Side-by-side scenario comparison"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/bond-calculator'),
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
            "name": "Bond Calculator",
            "item": getUrl('/bond-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/bond-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate the price of a bond?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bond price is calculated as the present value of all future cash flows discounted at the yield to maturity. The formula is Price equals the sum of coupon payments divided by (1 plus yield) raised to the power of time, plus face value divided by (1 plus yield) raised to the power of total periods. For example, a $1,000 face value bond with 5% annual coupon, 10 years to maturity, and 6% YTM would have semiannual coupon payments of $25. Our calculator automates this process and provides detailed results including duration, convexity, and risk metrics."
            }
          },
          {
            "@type": "Question",
            "name": "What is yield to maturity and how is it different from coupon rate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yield to Maturity (YTM) is the total return you will receive if you hold a bond until maturity, accounting for all coupon payments and the difference between purchase price and face value. The coupon rate is the annual interest rate stated on the bond. For example, a bond with 5% coupon rate pays $50 annually per $1,000 face value. If you buy at $950 (discount), your YTM will be higher than 5%. When YTM exceeds coupon rate, bonds trade at discount; when YTM is below coupon rate, bonds trade at premium."
            }
          },
          {
            "@type": "Question",
            "name": "What is bond duration and why is it important?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bond duration measures price sensitivity to interest rate changes and represents the weighted average time until cash flows are received. There are two types: Macaulay Duration and Modified Duration. A bond with 7-year modified duration will change in price by approximately 7% for every 1% change in interest rates. Duration is crucial for managing interest rate risk. Longer-duration bonds are more volatile. Our calculator computes both duration types to help you assess and manage risk effectively."
            }
          },
          {
            "@type": "Question",
            "name": "What is convexity and how does it affect bond pricing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Convexity measures the curvature of the price-yield relationship. While duration assumes a linear relationship, convexity captures the actual curve. Positive convexity means prices rise more when yields fall than they decline when yields rise by the same amount. Higher convexity provides better upside potential and downside protection. Bonds with lower coupons, longer maturities, and lower yields typically have higher convexity."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between clean price and dirty price?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Clean price is the quoted price excluding accrued interest, while dirty price includes accrued interest and represents the actual amount you pay. Bonds accrue interest daily between coupon payment dates. When you buy a bond, you must compensate the seller for interest earned since the last payment. Clean price is used for trading quotes, while dirty price reflects true economic value."
            }
          },
          {
            "@type": "Question",
            "name": "How can I use this calculator to compare different bonds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our calculator features a scenario comparison tool. Calculate each bond and click Save as Scenario with a descriptive name. Repeat for up to 4 different bonds. Then select the bond cards you want to compare and click Compare Scenarios to view side-by-side metrics including price, YTM, duration, convexity, risk levels, and total returns. The comparison includes visual charts and overlaid price-yield curves to help you make data-driven investment decisions."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/bond-calculator'),
        "name": "How to Use the Bond Calculator",
        "description": "Step-by-step guide to calculate bond pricing, yield, duration, convexity, and compare different bond investments.",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": {
          "@type": "HowToTool",
          "name": "Bond Calculator"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Face Value",
            "text": "Input the bond face value (par value), typically $1,000 for corporate bonds. This is the principal amount that will be repaid at maturity.",
            "url": getStepUrl('/bond-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Input Coupon Rate",
            "text": "Enter the annual coupon rate as a percentage. This is the fixed interest rate stated on the bond.",
            "url": getStepUrl('/bond-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Set Years to Maturity",
            "text": "Specify how many years until the bond matures. Longer maturity typically means higher duration and greater interest rate sensitivity.",
            "url": getStepUrl('/bond-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Enter Yield to Maturity",
            "text": "Input the current market yield for the bond. This is the discount rate used to calculate present value.",
            "url": getStepUrl('/bond-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Select Payment Frequency",
            "text": "Choose how often the bond pays coupons: annually, semiannually (most common), quarterly, or monthly.",
            "url": getStepUrl('/bond-calculator', 5)
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Calculate and Review Results",
            "text": "Click Calculate to see comprehensive results: bond price, duration, convexity, current yield, accrued interest, and detailed cash flow timeline.",
            "url": getStepUrl('/bond-calculator', 6)
          },
          {
            "@type": "HowToStep",
            "position": 7,
            "name": "Save and Compare Scenarios",
            "text": "To compare multiple bonds, click Save as Scenario and give it a name. Select 2-4 bonds to view side-by-side comparison.",
            "url": getStepUrl('/bond-calculator', 7)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/bond-calculator'),
        "headline": "Bond Calculator - Complete Guide to Bond Valuation",
        "description": "Comprehensive guide to calculating bond prices, yields, duration, and convexity.",
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
        "datePublished": "2024-01-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "image": getOgImage('bond'),
        "articleBody": "Bonds are fixed-income securities representing loans made by investors to borrowers. Understanding bond valuation requires knowledge of price, yield to maturity, duration, and convexity. Bond prices move inversely to interest rates. This guide covers bond pricing formulas, yield calculations, risk assessment, and strategies for comparing different bond investments."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h1 className="sr-only">Bond Calculator - Calculate Bond Price, Yield, Duration, and Convexity</h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Bond Calculator"
        calculatorUrl="/bond-calculator"
      />

      <BondCalculator />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Bond Valuation and Investment</h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">What You Will Learn</h3>
            <ul className="space-y-2 text-blue-800">
              <li>✓ How bond pricing works and the present value formula</li>
              <li>✓ The difference between coupon rate and yield to maturity</li>
              <li>✓ Understanding duration and convexity for risk management</li>
              <li>✓ Clean price vs dirty price and accrued interest</li>
              <li>✓ Bond investment strategies and portfolio construction</li>
              <li>✓ How to compare multiple bond investments</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What is a Bond?</h3>
          
          <p className="text-gray-700 mb-4">
            A bond is a fixed-income security that represents a loan made by an investor to a borrower, typically corporations or governments. When you purchase a bond, you are lending money to the issuer in exchange for regular interest payments (called coupons) and the return of your principal at maturity. Bonds are considered one of the fundamental building blocks of a diversified investment portfolio, offering predictable income streams and generally lower volatility compared to stocks.
          </p>

          <p className="text-gray-700 mb-4">
            The bond market is actually larger than the stock market, with over $100 trillion in outstanding bonds worldwide. Bonds play a crucial role in financing government operations, infrastructure projects, and corporate expansion. For investors, bonds provide portfolio stability, regular income, and capital preservation. Understanding how to value bonds and assess their risks is essential for making informed investment decisions, whether you are building a retirement portfolio, seeking steady income, or diversifying away from equities.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Key Bond Features:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-800">✓ Face Value (Par Value)</p>
                <p className="text-gray-600">Principal amount repaid at maturity, typically $1,000</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">✓ Coupon Rate</p>
                <p className="text-gray-600">Fixed interest rate paid periodically to bondholders</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">✓ Maturity Date</p>
                <p className="text-gray-600">Date when principal is repaid, ranging from months to 30+ years</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">✓ Yield to Maturity</p>
                <p className="text-gray-600">Total return if bond is held until maturity</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How Bond Pricing Works</h3>

          <p className="text-gray-700 mb-4">
            Bond prices are determined by calculating the present value of all future cash flows (coupon payments and principal repayment) discounted at the current market yield. The fundamental pricing formula is: <strong>Price = Sum of [Coupon / (1+yield)^period] + [Face Value / (1+yield)^n]</strong>. This inverse relationship between price and yield is crucial: when market interest rates rise, bond prices fall, and vice versa.
          </p>

          <p className="text-gray-700 mb-4">
            For example, consider a $1,000 face value corporate bond with a 5% annual coupon, 10 years to maturity, paying semiannually. If the market yield (YTM) is 6%, the bond has 20 payment periods (10 years × 2) with $25 coupon payments ($1,000 × 5% / 2). Discounting each $25 payment and the final $1,000 principal at 3% per period (6% / 2) gives a bond price of approximately $925. The bond trades at a discount because the market demands a 6% return but the coupon only pays 5%.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Duration and Interest Rate Risk</h3>

          <p className="text-gray-700 mb-4">
            <strong>Duration</strong> is one of the most important bond metrics, measuring both the weighted average time until cash flows are received and the bond's price sensitivity to interest rate changes. Modified duration tells you approximately how much a bond's price will change for a 1% change in yield. For example, a bond with 7-year modified duration will decrease in price by about 7% if interest rates rise 1%, or increase 7% if rates fall 1%.
          </p>

          <p className="text-gray-700 mb-4">
            Duration is affected by maturity (longer = higher duration), coupon rate (lower coupon = higher duration), and yield level (lower yield = higher duration). Zero-coupon bonds have duration equal to their maturity since all cash flow comes at the end. Our calculator computes both Macaulay duration (weighted average time) and modified duration (price sensitivity), helping you assess and manage interest rate risk in your portfolio.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Convexity: Refining Duration Estimates</h3>

          <p className="text-gray-700 mb-4">
            While duration provides a linear approximation of price changes, the actual price-yield relationship is curved. <strong>Convexity</strong> measures this curvature and refines duration estimates, especially for large yield changes. Positive convexity (typical for standard bonds) means bond prices rise more when yields fall than they decline when yields rise by the same amount—an advantageous asymmetry for investors.
          </p>

          <p className="text-gray-700 mb-4">
            Bonds with higher convexity provide better upside potential and downside protection, making them more valuable. Factors that increase convexity include lower coupon rates, longer maturities, and lower yields. Professional bond investors are willing to pay a premium for bonds with higher convexity. Our calculator computes convexity and displays the curved price-yield relationship graphically, helping you visualize this important property.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Scenario Comparison Feature</h3>

          <p className="text-gray-700 mb-4">
            Our calculator's most powerful feature lets you save multiple bond calculations and compare them side-by-side. This is invaluable when choosing between different bond investments or building a diversified fixed-income portfolio. Calculate each potential bond investment, save it with a descriptive name (e.g., "Corp 10Y 5.5%", "Treasury 5Y 4.2%"), then click compare to view:
          </p>

          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Side-by-side comparison of price, YTM, duration, convexity, and total returns</li>
            <li>Visual charts showing relative pricing and risk metrics</li>
            <li>Overlaid price-yield curves revealing relative interest rate sensitivity</li>
            <li>Cash flow timelines for each bond</li>
          </ul>

          <p className="text-gray-700 mb-4">
            This comparison view helps you identify which bonds offer the best combination of yield and risk for your specific objectives—whether you are seeking maximum income, lowest duration, highest after-tax returns, or optimal risk-adjusted performance.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-6 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-4">Key Resources for Bond Investors:</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.treasurydirect.gov/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  TreasuryDirect.gov
                </a> - Buy U.S. Treasury bonds directly
              </li>
              <li>
                <a 
                  href="https://www.finra.org/investors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  FINRA
                </a> - Bond price transparency and education
              </li>
              <li>
                <a 
                  href="https://www.bloomberg.com/markets/rates-bonds" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Bloomberg
                </a> - Real-time bond market data
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I calculate the price of a bond?</h3>
            <p className="text-gray-700">
              Bond price is calculated as the present value of all future cash flows discounted at the yield to maturity. The formula sums the present value of each coupon payment plus the present value of the principal repayment. Our calculator automates this complex process and provides detailed results including duration, convexity, and risk metrics. You simply enter the face value, coupon rate, years to maturity, and yield to maturity to get comprehensive bond valuation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What is yield to maturity and how is it different from coupon rate?</h3>
            <p className="text-gray-700">
              Yield to Maturity (YTM) is the total return you will receive if you hold a bond until maturity, accounting for all coupon payments and the difference between purchase price and face value. The coupon rate is simply the annual interest rate stated on the bond, which determines the periodic interest payments. If you buy a bond at a discount (below face value), your YTM will be higher than the coupon rate because you also gain from the price appreciation to par at maturity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What is bond duration and why is it important?</h3>
            <p className="text-gray-700">
              Bond duration measures a bond's price sensitivity to interest rate changes and represents the weighted average time until cash flows are received. Modified duration tells you the approximate percentage price change for a 1% change in yield. For example, a bond with 7-year modified duration will decrease in price by about 7% if interest rates rise 1%. Duration is crucial for managing interest rate risk in portfolios. Our calculator computes both Macaulay and modified duration to help you assess risk.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What is convexity and how does it affect bond pricing?</h3>
            <p className="text-gray-700">
              Convexity measures the curvature of the price-yield relationship. While duration assumes a linear relationship, convexity captures the actual curve. Positive convexity means bond prices rise more when yields fall than they decline when yields rise by the same amount. This provides better upside potential and downside protection. Higher convexity is more valuable to investors. Bonds with lower coupons, longer maturities, and lower yields typically have higher convexity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What is the difference between clean price and dirty price?</h3>
            <p className="text-gray-700">
              Clean price is the quoted market price excluding accrued interest, while dirty price includes accrued interest and represents the actual amount you pay when purchasing a bond. Bonds accrue interest daily between coupon payment dates. When you buy a bond between payment dates, you must compensate the seller for interest earned since the last payment. Clean price is used for trading quotes to avoid daily fluctuations, while dirty price reflects true economic value for settlement.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">How can I use this calculator to compare different bonds?</h3>
            <p className="text-gray-700">
              Our calculator features a powerful scenario comparison tool. First, calculate each bond's metrics and click Save as Scenario with a descriptive name. Repeat for up to 4 different bonds. Then click on the bond cards you want to compare and click Compare Scenarios to view side-by-side metrics including price, YTM, duration, convexity, risk levels, and total returns. The comparison includes visual charts and overlaid price-yield curves to help you make data-driven investment decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Financial Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/cd-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🏦</div>
            <h3 className="font-semibold text-gray-900">CD Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate certificate of deposit returns</p>
          </Link>

          <Link
            href="/investment-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Investment Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Project investment returns and growth</p>
          </Link>

          <Link
            href="/mortgage-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🏠</div>
            <h3 className="font-semibold text-gray-900">Mortgage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate monthly mortgage payments</p>
          </Link>

          <Link
            href="/savings-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🐷</div>
            <h3 className="font-semibold text-gray-900">Savings Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate savings growth over time</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
