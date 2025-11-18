import { Metadata } from "next";
import Link from "next/link";
import CDCalculator from "@/components/Calculator/CDCalculator";
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
  title: "CD Calculator - Certificate of Deposit Calculator with APY & Interest | AICalculator",
  description: "Free CD (Certificate of Deposit) calculator to calculate maturity value, APY, and interest earnings. Compare CD rates, analyze early withdrawal penalties, and plan your savings strategy. Get detailed growth projections and rate sensitivity analysis.",
  keywords: [
    "cd calculator",
    "certificate of deposit calculator",
    "cd interest calculator",
    "cd maturity calculator",
    "apy calculator",
    "cd apy calculator",
    "certificate of deposit",
    "cd rates calculator",
    "cd earnings calculator",
    "savings calculator",
    "time deposit calculator",
    "cd investment calculator",
    "early withdrawal penalty calculator",
    "cd comparison calculator",
    "best cd rates",
    "cd calculator with apy",
    "compound interest cd",
    "cd return calculator",
    "cd yield calculator",
    "savings certificate calculator"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "CD Calculator - Calculate Certificate of Deposit Returns",
    description: "Calculate your CD returns, APY, and maturity value. Compare rates, analyze penalties, and optimize your savings strategy with detailed projections.",
    type: "website",
    url: getUrl('/cd-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('cd'),
        width: 1200,
        height: 630,
        alt: 'CD Calculator',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CD Calculator with APY & Interest Projections",
    description: "Calculate Certificate of Deposit returns, compare rates, and plan your savings strategy with detailed analysis.",
    images: [getOgImage('cd')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/cd-calculator'),
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

export default function CDCalculatorPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": getWebAppId('/cd-calculator'),
        "name": "CD Calculator",
        "url": getUrl('/cd-calculator'),
        "description": "Free Certificate of Deposit (CD) calculator with APY calculation, maturity projections, and early withdrawal penalty analysis. Compare rates and optimize your savings strategy.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate CD maturity value and interest earnings",
          "Compute Annual Percentage Yield (APY)",
          "Analyze early withdrawal penalties",
          "Compare different compounding frequencies",
          "Interactive growth charts and projections",
          "Interest rate sensitivity analysis",
          "Month-by-month balance breakdown",
          "Share and save calculations"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/cd-calculator'),
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
            "name": "CD Calculator",
            "item": getUrl('/cd-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/cd-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Certificate of Deposit (CD) and how does it work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Certificate of Deposit (CD) is a time deposit offered by banks and credit unions that pays a fixed interest rate for a specified term (typically 3 months to 5 years). When you open a CD, you deposit a lump sum that remains locked until the maturity date. In exchange for keeping your money untouched, the bank pays you a higher interest rate compared to regular savings accounts. Interest compounds based on the bank's schedule (daily, monthly, quarterly, or annually), and at maturity, you receive your principal plus all accrued interest. The Annual Percentage Yield (APY) accounts for compound interest, showing your actual yearly return. CDs are FDIC-insured up to $250,000, making them a safe, predictable investment for conservative savers."
            }
          },
          {
            "@type": "Question",
            "name": "How do I use the CD calculator to calculate my returns?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Using our CD calculator is straightforward: 1) Enter your deposit amount (minimum typically $500-$1,000). 2) Input the annual interest rate offered by your bank (check current rates at Bankrate.com or your financial institution). 3) Select the CD term in months (common terms: 6, 12, 24, 36, or 60 months). 4) Choose the compounding frequency (daily offers the highest APY). 5) Optionally, enter the early withdrawal penalty (typically 3-6 months of interest). Click 'Calculate CD Returns' to see your maturity value, total interest earned, APY, and detailed projections. The calculator shows interactive charts of balance growth, earnings breakdown, and rate sensitivity analysis to help you compare options and optimize your savings strategy."
            }
          },
          {
            "@type": "Question",
            "name": "What is APY and why is it different from the interest rate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "APY (Annual Percentage Yield) represents your actual annual return including compound interest, while the stated interest rate does not account for compounding. For example, a 4.5% interest rate compounded monthly yields an APY of 4.59% because interest earned each month also earns interest in subsequent months. The formula is: APY = (1 + r/n)^n - 1, where r is the interest rate and n is the compounding frequency. Daily compounding produces the highest APY, followed by monthly, quarterly, and annual. When comparing CDs, always look at APY rather than interest rate to understand your true earnings. A CD with 4.5% interest compounded daily (APY 4.60%) will earn more than 4.6% compounded annually (APY 4.60% only if not reinvested). Use APY to make apples-to-apples comparisons between different CD offers."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if I withdraw my CD early?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Early withdrawal from a CD before maturity typically incurs a penalty, which is usually a specified number of months of interest (commonly 3-6 months for terms under 2 years, and 6-12 months for longer terms). For example, if you have a 12-month CD earning 4.5% annually and the penalty is 3 months of interest, you would forfeit approximately $112.50 on a $10,000 deposit. Some banks allow penalty-free withdrawals in specific circumstances (death, disability), while no-penalty CDs let you withdraw without fees but usually offer lower rates. Before opening a CD, carefully review the early withdrawal terms and ensure you won't need the funds during the term. If you might need access to your money, consider CD laddering (multiple CDs with staggered maturity dates) or high-yield savings accounts as more flexible alternatives."
            }
          },
          {
            "@type": "Question",
            "name": "How can I maximize my CD returns and choose the best CD?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To maximize CD returns: 1) Shop around - Online banks often offer rates 0.5-1% higher than traditional banks. Check comparison sites like Bankrate, NerdWallet, and DepositAccounts.com. 2) Consider CD laddering - Split your funds across multiple CDs with staggered maturity dates (e.g., 6, 12, 24, 36 months) for liquidity and rate optimization. 3) Choose daily compounding - It yields the highest APY compared to monthly or quarterly. 4) Time your purchase - CD rates tend to follow Federal Reserve interest rate trends. 5) Verify FDIC/NCUA insurance - Ensure your funds are protected up to $250,000. 6) Compare APY, not interest rates - APY reflects your true return. 7) Consider promotional rates - Some banks offer higher rates for new customers. For amounts over $10,000, a 0.5% rate difference equals $50+ annually, so comparison shopping pays off significantly over time."
            }
          },
          {
            "@type": "Question",
            "name": "Should I invest in a CD or other savings options?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CDs are best for risk-averse savers who can lock funds for a specific period and want guaranteed returns. Choose CDs when: 1) You have an emergency fund already established. 2) You won't need the money before maturity. 3) You want FDIC-insured protection. 4) You're saving for a near-term goal (1-5 years out). Consider alternatives if: High-yield savings accounts offer similar rates with full liquidity - good for emergency funds. Money market accounts provide flexibility with competitive rates. Treasury bonds (I-Bonds, T-Bills) may offer better rates and tax advantages. Investment accounts (stocks, bonds, mutual funds) suit longer time horizons (5+ years) despite volatility. For most savers, a balanced approach works best: emergency fund in high-yield savings, short-term goals in CDs or T-Bills, and long-term wealth building in diversified investments. Compare current CD rates to high-yield savings - if the difference is minimal (under 0.5%), flexibility may outweigh the slight rate advantage."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/cd-calculator'),
        "name": "How to Use the CD Calculator",
        "description": "Step-by-step guide to calculate your Certificate of Deposit returns, APY, and optimize your savings strategy.",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": {
          "@type": "HowToTool",
          "name": "CD Calculator"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Deposit Amount",
            "text": "Input the amount you plan to deposit into the CD. Most banks require a minimum of $500-$1,000, though some offer lower minimums or higher minimums for premium rates. Consider your savings goals and how much you can afford to lock away for the entire term without needing access.",
            "url": getStepUrl('/cd-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Input Annual Interest Rate",
            "text": "Enter the annual interest rate (APR) offered by the bank. You can find current CD rates on bank websites or comparison platforms like Bankrate.com. Online banks typically offer higher rates than traditional banks. Remember that the stated rate differs from APY, which our calculator will compute for you.",
            "url": getStepUrl('/cd-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Select CD Term",
            "text": "Choose the term length in months. Common CD terms include 6, 12, 18, 24, 36, and 60 months. Longer terms generally offer higher rates but lock your money for extended periods. Consider your financial goals, upcoming expenses, and the interest rate environment when selecting a term.",
            "url": getStepUrl('/cd-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Choose Compounding Frequency",
            "text": "Select how often interest is compounded: daily (365 times/year), monthly (12 times/year), quarterly (4 times/year), or annually (once/year). Daily compounding yields the highest APY because interest earns interest more frequently. Most competitive CDs offer daily compounding, which maximizes your returns.",
            "url": getStepUrl('/cd-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Set Early Withdrawal Penalty",
            "text": "Enter the penalty for early withdrawal, typically expressed as a number of months of interest (commonly 3-6 months). This information is in the CD's terms and conditions. Understanding the penalty helps you assess the liquidity risk and make informed decisions about term selection.",
            "url": getStepUrl('/cd-calculator', 5)
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Calculate and Review Results",
            "text": "Click 'Calculate CD Returns' to see your maturity value, total interest earned, APY, and maturity date. Review the interactive charts showing balance growth over time, earnings breakdown, and rate sensitivity analysis. Use these insights to compare different CD options and optimize your savings strategy.",
            "url": getStepUrl('/cd-calculator', 6)
          },
          {
            "@type": "HowToStep",
            "position": 7,
            "name": "Compare and Optimize",
            "text": "Experiment with different rates, terms, and compounding frequencies to find the best option for your needs. Consider CD laddering (splitting funds across multiple CDs with staggered maturity dates) for better liquidity and rate optimization. Save or share your calculations to compare offers from multiple banks.",
            "url": getStepUrl('/cd-calculator', 7)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/cd-calculator'),
        "headline": "CD Calculator - Complete Guide to Certificate of Deposit Returns",
        "description": "Comprehensive guide to calculating Certificate of Deposit (CD) returns, understanding APY, comparing rates, and optimizing your savings strategy with detailed projections and analysis.",
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
        "image": getOgImage('cd'),
        "articleBody": "A Certificate of Deposit (CD) is a time deposit offered by banks and credit unions that provides a fixed interest rate for a specified term. CDs are FDIC-insured savings vehicles that offer higher rates than traditional savings accounts in exchange for locking your money for a predetermined period. Understanding how to calculate CD returns, compare APY, and analyze early withdrawal penalties is essential for maximizing your savings. This comprehensive guide covers CD calculations, rate comparisons, optimal term selection, and advanced strategies like CD laddering to help you make informed decisions about your savings goals."
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

      {/* SEO H1 - Hidden but accessible */}
      <h1 className="sr-only">CD Calculator - Certificate of Deposit Interest & APY Calculator</h1>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
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
              <span itemProp="name" className="text-gray-900 font-semibold">
                CD Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <CDCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Certificate of Deposit (CD) Calculations</h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">What You'll Learn</h3>
            <ul className="space-y-2 text-blue-800">
              <li>✓ How CDs work and why they offer higher rates than savings accounts</li>
              <li>✓ The difference between interest rate and APY (Annual Percentage Yield)</li>
              <li>✓ How compounding frequency affects your returns</li>
              <li>✓ Early withdrawal penalties and how to avoid them</li>
              <li>✓ CD laddering strategies for liquidity and rate optimization</li>
              <li>✓ How to compare CD offers from different banks</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What is a Certificate of Deposit (CD)?</h3>
          
          <p className="text-gray-700 mb-4">
            A Certificate of Deposit (CD) is a time deposit account offered by banks and credit unions that pays a fixed interest rate for a predetermined term, typically ranging from 3 months to 5 years. Unlike regular savings accounts where you can withdraw money anytime, CDs require you to leave your deposit untouched until the maturity date. In exchange for this commitment, banks reward you with significantly higher interest rates compared to regular savings accounts—often 0.5% to 2% higher depending on market conditions.
          </p>

          <p className="text-gray-700 mb-4">
            CDs are considered one of the safest investment vehicles because they are FDIC-insured up to $250,000 per depositor, per institution. This means your principal and accrued interest are protected even if the bank fails. The predictable, guaranteed returns make CDs an excellent choice for conservative savers, short-term financial goals, and as a diversification tool within a broader investment portfolio. However, the trade-off is liquidity—accessing your money before maturity usually incurs a penalty, which is why choosing the right term length is crucial.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Key CD Features:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-800">✓ Fixed Interest Rate</p>
                <p className="text-gray-600">Rate locked for entire term, immune to market fluctuations</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">✓ FDIC Insurance</p>
                <p className="text-gray-600">Protected up to $250,000 per depositor, per institution</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">✓ Predictable Returns</p>
                <p className="text-gray-600">Know exactly how much you'll earn at maturity</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">✓ Various Terms</p>
                <p className="text-gray-600">Choose from 3 months to 10 years to match your goals</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How CD Interest is Calculated: The Compound Interest Formula</h3>

          <p className="text-gray-700 mb-4">
            CD interest is calculated using the compound interest formula, which means you earn interest on both your initial deposit and on previously earned interest. The formula is: <strong>A = P(1 + r/n)^(nt)</strong>, where:
          </p>

          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>A</strong> = Final amount (maturity value)</li>
            <li><strong>P</strong> = Principal (initial deposit)</li>
            <li><strong>r</strong> = Annual interest rate (as a decimal)</li>
            <li><strong>n</strong> = Number of times interest compounds per year</li>
            <li><strong>t</strong> = Time in years</li>
          </ul>

          <p className="text-gray-700 mb-4">
            For example, let's say you deposit <strong>$10,000</strong> into a 12-month CD with a <strong>4.5% annual interest rate</strong> that compounds <strong>monthly</strong>. Using the formula:
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-6 border border-blue-200">
            <p className="font-mono text-sm mb-2">A = 10,000 × (1 + 0.045/12)^(12×1)</p>
            <p className="font-mono text-sm mb-2">A = 10,000 × (1.00375)^12</p>
            <p className="font-mono text-sm mb-2">A = 10,000 × 1.0459</p>
            <p className="font-mono text-sm font-bold">A = $10,459.03</p>
            <p className="text-gray-700 mt-3">Your total interest earned = <strong>$459.03</strong></p>
          </div>

          <p className="text-gray-700 mb-4">
            The compounding effect means each month's interest earns additional interest in subsequent months, resulting in slightly higher returns than simple interest. This is why daily compounding yields more than monthly, which yields more than quarterly or annual compounding—more frequent compounding leads to more opportunities for interest to earn interest.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding APY vs. Interest Rate</h3>

          <p className="text-gray-700 mb-4">
            One of the most important concepts when comparing CDs is the difference between the stated <strong>interest rate (APR)</strong> and the <strong>Annual Percentage Yield (APY)</strong>. The interest rate tells you the nominal rate the bank pays, but APY reveals your actual annual return after accounting for compound interest. APY is always equal to or higher than the interest rate, and the difference grows with more frequent compounding.
          </p>

          <p className="text-gray-700 mb-4">
            The APY formula is: <strong>APY = (1 + r/n)^n - 1</strong>. Let's compare how compounding frequency affects APY for a 4.5% interest rate:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Compounding Frequency</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Times per Year (n)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">APY</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Earnings on $10,000</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Annually</td>
                  <td className="border border-gray-300 px-4 py-2">1</td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">4.50%</td>
                  <td className="border border-gray-300 px-4 py-2">$450.00</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Quarterly</td>
                  <td className="border border-gray-300 px-4 py-2">4</td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">4.58%</td>
                  <td className="border border-gray-300 px-4 py-2">$457.66</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Monthly</td>
                  <td className="border border-gray-300 px-4 py-2">12</td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">4.59%</td>
                  <td className="border border-gray-300 px-4 py-2">$459.03</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Daily</td>
                  <td className="border border-gray-300 px-4 py-2">365</td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">4.60%</td>
                  <td className="border border-gray-300 px-4 py-2">$459.95</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mb-4">
            As you can see, daily compounding earns you an extra <strong>$9.95</strong> compared to annual compounding on a $10,000 deposit over one year. While this might seem small, the difference becomes more significant with larger deposits and longer terms. Always compare CDs using APY, not the stated interest rate, to make accurate comparisons between different offers. A CD advertising "4.5% interest compounded daily" is better than one offering "4.55% compounded annually" because the former has a higher APY (4.60% vs. 4.55%).
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Early Withdrawal Penalties: What You Need to Know</h3>

          <p className="text-gray-700 mb-4">
            Early withdrawal penalties are the price you pay for accessing your CD funds before the maturity date. Federal regulations require banks to impose a penalty of at least 7 days of interest on CDs with terms less than 1 year, but most banks impose much steeper penalties—typically <strong>3 to 6 months of interest</strong> for short-term CDs and <strong>6 to 12 months</strong> for longer terms. Some banks even charge a percentage of the principal for very long-term CDs (5+ years).
          </p>

          <p className="text-gray-700 mb-4">
            Here's how an early withdrawal penalty works: Suppose you have a 12-month CD with $10,000 at 4.5% annual interest, and the penalty is 3 months of interest. After 6 months, you need to withdraw your funds. The penalty would be approximately <strong>$112.50</strong> (3 months × $37.50 monthly interest). If you've only earned 6 months of interest ($225), you'd receive your principal ($10,000) plus the remaining $112.50 after the penalty is deducted.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6 rounded-r-lg">
            <h4 className="font-semibold text-amber-900 mb-2">⚠️ Important Early Withdrawal Considerations:</h4>
            <ul className="space-y-2 text-amber-800 text-sm">
              <li><strong>Penalty timing:</strong> Some banks calculate penalties from the date of deposit, others from the withdrawal date.</li>
              <li><strong>Partial withdrawals:</strong> Most CDs don't allow partial withdrawals—it's usually all or nothing.</li>
              <li><strong>Grace periods:</strong> CDs typically have a 7-10 day grace period after maturity to withdraw without penalty.</li>
              <li><strong>Exceptions:</strong> Some banks waive penalties for death or disability; verify your bank's policy.</li>
              <li><strong>No-penalty CDs:</strong> These allow early withdrawals without fees but offer lower rates (typically 0.25-0.5% less).</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">CD Laddering: A Strategy for Liquidity and Rate Optimization</h3>

          <p className="text-gray-700 mb-4">
            CD laddering is a strategy where you split your savings across multiple CDs with staggered maturity dates, combining the higher rates of longer-term CDs with the flexibility of short-term access. Instead of putting $20,000 into a single 5-year CD, you might create a ladder with four $5,000 CDs maturing in 1, 2, 3, and 4 years. Each year, when a CD matures, you reinvest it into a new 4-year CD at the top of your ladder. After the initial setup period, you'll have a CD maturing every year, providing regular liquidity while maintaining higher long-term rates.
          </p>

          <p className="text-gray-700 mb-4">
            A typical 5-rung ladder might look like this:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">CD Position</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Initial Term</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Sample Rate</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Maturity Year</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="border border-gray-300 px-4 py-2">CD #1</td>
                  <td className="border border-gray-300 px-4 py-2">1 year</td>
                  <td className="border border-gray-300 px-4 py-2">$4,000</td>
                  <td className="border border-gray-300 px-4 py-2">4.00%</td>
                  <td className="border border-gray-300 px-4 py-2">Year 1</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">CD #2</td>
                  <td className="border border-gray-300 px-4 py-2">2 years</td>
                  <td className="border border-gray-300 px-4 py-2">$4,000</td>
                  <td className="border border-gray-300 px-4 py-2">4.25%</td>
                  <td className="border border-gray-300 px-4 py-2">Year 2</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">CD #3</td>
                  <td className="border border-gray-300 px-4 py-2">3 years</td>
                  <td className="border border-gray-300 px-4 py-2">$4,000</td>
                  <td className="border border-gray-300 px-4 py-2">4.50%</td>
                  <td className="border border-gray-300 px-4 py-2">Year 3</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">CD #4</td>
                  <td className="border border-gray-300 px-4 py-2">4 years</td>
                  <td className="border border-gray-300 px-4 py-2">$4,000</td>
                  <td className="border border-gray-300 px-4 py-2">4.75%</td>
                  <td className="border border-gray-300 px-4 py-2">Year 4</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">CD #5</td>
                  <td className="border border-gray-300 px-4 py-2">5 years</td>
                  <td className="border border-gray-300 px-4 py-2">$4,000</td>
                  <td className="border border-gray-300 px-4 py-2">5.00%</td>
                  <td className="border border-gray-300 px-4 py-2">Year 5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mb-4">
            CD laddering offers several advantages: 1) <strong>Liquidity</strong> - Access to funds every year without penalties. 2) <strong>Rate averaging</strong> - Mitigate interest rate risk by not locking all funds at one rate. 3) <strong>Flexibility</strong> - Adjust strategy based on changing rates when each CD matures. 4) <strong>Higher returns</strong> - Benefit from higher rates on longer-term CDs while maintaining regular access. The main downside is complexity—you'll need to manage multiple CDs and track maturity dates. However, many online banks offer automated ladder creation and management tools to simplify the process.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Comparing CD Rates: Where to Find the Best Deals</h3>

          <p className="text-gray-700 mb-4">
            CD rates vary significantly between institutions, with online banks typically offering rates 0.5% to 1.5% higher than traditional brick-and-mortar banks due to lower overhead costs. As of 2024, competitive 12-month CD rates range from 4.5% to 5.5% APY, while 5-year CDs might offer 4.0% to 4.75% APY. It's crucial to shop around because even a 0.5% rate difference translates to $50 per year on a $10,000 deposit—$250 over 5 years plus compounding effects.
          </p>

          <p className="text-gray-700 mb-4">
            When comparing CDs, consider these factors beyond just the rate: 1) <strong>Minimum deposit requirements</strong> - Some high-rate CDs require $25,000+ deposits. 2) <strong>FDIC/NCUA insurance</strong> - Ensure your funds are protected (verify on{' '}
            <a 
              href="https://www.fdic.gov/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              FDIC.gov
            </a>
            ). 3) <strong>Early withdrawal penalties</strong> - Lower penalties provide more flexibility. 4) <strong>Bank reputation</strong> - Check reviews on sites like Bankrate or NerdWallet. 5) <strong>Promotional rates</strong> - Some banks offer temporary higher rates for new customers.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-6 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">Top Resources for Comparing CD Rates:</h4>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>
                <strong>
                  <a 
                    href="https://www.bankrate.com/banking/cds/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Bankrate.com
                  </a>
                </strong> - Comprehensive CD rate comparisons updated daily
              </li>
              <li>
                <strong>
                  <a 
                    href="https://www.nerdwallet.com/banking/cd-rates" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    NerdWallet
                  </a>
                </strong> - Expert reviews and rate comparisons
              </li>
              <li>
                <strong>
                  <a 
                    href="https://www.depositaccounts.com/cd/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    DepositAccounts.com
                  </a>
                </strong> - Detailed database of CD rates across the US
              </li>
              <li>
                <strong>
                  <a 
                    href="https://www.fdic.gov/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    FDIC.gov
                  </a>
                </strong> - Verify bank insurance coverage and health
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">CD vs. Other Savings Options: Making the Right Choice</h3>

          <p className="text-gray-700 mb-4">
            Choosing between CDs and other savings vehicles depends on your financial goals, time horizon, and liquidity needs. Here's how CDs compare to popular alternatives:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Option</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Typical Rate</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Liquidity</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Best For</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">CDs</td>
                  <td className="border border-gray-300 px-4 py-2">4.5-5.5% APY</td>
                  <td className="border border-gray-300 px-4 py-2">Low (penalties apply)</td>
                  <td className="border border-gray-300 px-4 py-2">Short-term goals (1-5 years), guaranteed returns</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">High-Yield Savings</td>
                  <td className="border border-gray-300 px-4 py-2">4.0-4.5% APY</td>
                  <td className="border border-gray-300 px-4 py-2">High (unlimited withdrawals)</td>
                  <td className="border border-gray-300 px-4 py-2">Emergency funds, flexible savings</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Money Market</td>
                  <td className="border border-gray-300 px-4 py-2">3.5-4.5% APY</td>
                  <td className="border border-gray-300 px-4 py-2">High (check writing, debit card)</td>
                  <td className="border border-gray-300 px-4 py-2">Operating funds, frequent access</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Treasury Bills</td>
                  <td className="border border-gray-300 px-4 py-2">4.5-5.0% (varies)</td>
                  <td className="border border-gray-300 px-4 py-2">Medium (can sell on secondary market)</td>
                  <td className="border border-gray-300 px-4 py-2">Tax advantages (exempt from state/local taxes)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">I-Bonds</td>
                  <td className="border border-gray-300 px-4 py-2">Inflation-adjusted</td>
                  <td className="border border-gray-300 px-4 py-2">Low (1-year lock, penalties before 5 years)</td>
                  <td className="border border-gray-300 px-4 py-2">Inflation protection, long-term savings</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Stock Market</td>
                  <td className="border border-gray-300 px-4 py-2">~10% avg. (highly variable)</td>
                  <td className="border border-gray-300 px-4 py-2">High (but volatile)</td>
                  <td className="border border-gray-300 px-4 py-2">Long-term growth (5+ years), higher risk tolerance</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>When CDs are the best choice:</strong> You have a specific savings goal 1-5 years away (e.g., home down payment, car purchase, wedding), you want guaranteed returns with zero market risk, you already have an adequate emergency fund in liquid accounts, or you're in or near retirement and prioritize capital preservation over growth. <strong>When to consider alternatives:</strong> You might need access to your funds unexpectedly (choose high-yield savings), you're saving for retirement 10+ years away (consider investment accounts for higher growth potential), or you want inflation protection (I-Bonds or TIPS).
          </p>

          <p className="text-gray-700 mb-4">
            A balanced approach often works best: maintain 3-6 months of expenses in a high-yield savings account for emergencies, use CDs or short-term bonds for near-term goals, and invest in diversified portfolios for long-term wealth building. As of 2024, with CD rates around 4.5-5.5%, they're competitive with historical stock market returns (10% average) on a risk-adjusted basis, making them attractive for conservative portions of your portfolio.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tax Considerations for CD Interest</h3>

          <p className="text-gray-700 mb-4">
            CD interest is considered ordinary income and is fully taxable at your federal income tax rate (10% to 37%) and any applicable state income taxes. Banks report interest earnings on Form 1099-INT when you earn more than $10 in a year. Unlike capital gains from stocks (which are taxed at preferential rates of 0%, 15%, or 20%), CD interest receives no special tax treatment, which makes CDs less attractive for high-income earners in high tax brackets.
          </p>

          <p className="text-gray-700 mb-4">
            For example, if you earn $500 in CD interest and you're in the 22% federal tax bracket plus a 5% state tax bracket, you'll owe $135 in taxes ($500 × 27%), reducing your effective return. This tax drag is important to consider when comparing CDs to tax-advantaged alternatives like municipal bonds (often tax-free) or I-Bonds (which defer taxes until redemption or maturity). However, for most middle-income savers, the higher base rates of CDs still result in competitive after-tax returns compared to most savings alternatives.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-6 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">Tax-Smart CD Strategies:</h4>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li><strong>IRA CDs:</strong> Hold CDs in tax-deferred IRAs to avoid annual tax on interest (pay taxes on withdrawal in retirement).</li>
              <li><strong>Roth IRA CDs:</strong> Earn completely tax-free returns if held in a Roth IRA and withdrawn after age 59½.</li>
              <li><strong>Timing maturities:</strong> Consider maturity dates to manage taxable income across years (especially near retirement).</li>
              <li><strong>Loss harvesting:</strong> If you paid an early withdrawal penalty, it may be tax-deductible as an adjustment to income.</li>
              <li><strong>Compare after-tax returns:</strong> Calculate effective yield after taxes when comparing CDs to tax-advantaged alternatives.</li>
            </ul>
            <p className="text-blue-800 text-sm mt-3">
              Consult with a tax professional or visit{' '}
              <a 
                href="https://www.irs.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                IRS.gov
              </a>
              {' '}for detailed tax guidance on CD interest income.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Maximizing Your CD Returns: Pro Tips</h3>

          <p className="text-gray-700 mb-4">
            To get the most out of your CD investments, follow these expert strategies:
          </p>

          <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-3">
            <li>
              <strong>Shop online banks first:</strong> Online-only banks consistently offer rates 0.5-1.5% higher than traditional banks due to lower operating costs. Ally Bank, Marcus by Goldman Sachs, Discover, and Capital One 360 are reputable options with competitive rates and FDIC insurance.
            </li>
            <li>
              <strong>Time your CD purchases:</strong> CD rates tend to track Federal Reserve interest rate policies. When the Fed is raising rates, consider shorter-term CDs (6-12 months) to maintain flexibility to reinvest at higher rates. When rates are stable or falling, lock in longer terms to secure current rates.
            </li>
            <li>
              <strong>Build a CD ladder:</strong> As discussed earlier, split funds across multiple CDs with staggered maturities (e.g., 1, 2, 3, 4, 5 years). This provides annual liquidity while capturing higher rates on longer-term CDs.
            </li>
            <li>
              <strong>Verify FDIC/NCUA coverage:</strong> Ensure your deposits are fully insured by checking on{' '}
              <a 
                href="https://www.fdic.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                FDIC.gov
              </a>
              {' '}or{' '}
              <a 
                href="https://www.ncua.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                NCUA.gov
              </a>
              . If you have over $250,000, spread funds across multiple institutions to maximize protection.
            </li>
            <li>
              <strong>Choose daily compounding:</strong> Always opt for daily compounding when available—it maximizes APY and earnings compared to monthly, quarterly, or annual compounding.
            </li>
            <li>
              <strong>Read the fine print:</strong> Understand grace periods (usually 7-10 days after maturity), auto-renewal terms, and early withdrawal penalty calculations before opening a CD.
            </li>
            <li>
              <strong>Consider no-penalty CDs for flexibility:</strong> If there's any chance you'll need the funds, no-penalty CDs (like Ally's 11-month or Marcus's 13-month options) offer liquidity at the cost of slightly lower rates (typically 0.25-0.5% less).
            </li>
            <li>
              <strong>Monitor maturity dates:</strong> Set calendar reminders for maturity dates. Most CDs auto-renew at current rates, which may be lower than your original rate. Use the grace period to shop for better rates or withdraw funds if needed.
            </li>
          </ol>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common CD Mistakes to Avoid</h3>

          <p className="text-gray-700 mb-4">
            Even experienced savers make these common CD mistakes:
          </p>

          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-3">
            <li>
              <strong>Locking up emergency funds:</strong> Never put your entire emergency fund in CDs. Maintain 3-6 months of expenses in a liquid high-yield savings account or money market account before considering CDs.
            </li>
            <li>
              <strong>Ignoring the rate environment:</strong> Opening a 5-year CD at 4.0% when rates are trending upward can lead to regret. Consider shorter terms during rising-rate periods to maintain flexibility.
            </li>
            <li>
              <strong>Comparing interest rates instead of APY:</strong> A 4.5% rate compounded daily (4.60% APY) beats a 4.55% rate compounded annually (4.55% APY). Always compare APY for accurate returns.
            </li>
            <li>
              <strong>Missing grace periods:</strong> If you want to move funds at maturity, you must act during the grace period (typically 7-10 days). Missing it means your CD auto-renews for another full term.
            </li>
            <li>
              <strong>Not diversifying maturity dates:</strong> Putting all funds in one CD creates illiquidity risk. Use laddering or split across multiple terms to ensure regular access.
            </li>
            <li>
              <strong>Falling for promotional rates:</strong> Some banks offer high "teaser rates" for initial terms but much lower renewal rates. Read renewal terms carefully and shop around at maturity.
            </li>
            <li>
              <strong>Forgetting about inflation:</strong> In high-inflation environments (3%+), CD returns may be negative in real terms. Consider I-Bonds or TIPS for inflation protection if this is a concern.
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conclusion: Is a CD Right for You?</h3>

          <p className="text-gray-700 mb-4">
            Certificates of Deposit remain one of the safest, most predictable savings vehicles available, offering guaranteed returns backed by FDIC insurance. They're ideal for short-term to medium-term savings goals (1-5 years), capital preservation, and as a stabilizing component of a diversified portfolio. With rates in the 4.5-5.5% range as of 2024, CDs offer competitive returns for risk-averse savers, especially when compared to the volatility of stock markets or the minimal returns of traditional savings accounts.
          </p>

          <p className="text-gray-700 mb-4">
            However, CDs are not a one-size-fits-all solution. They lack the liquidity of savings accounts, the tax advantages of municipal bonds or Roth IRAs, and the long-term growth potential of stocks and real estate. The key is understanding your financial situation, goals, and timeline. Use our CD calculator to model different scenarios, compare APY across institutions, and understand how factors like term length and compounding frequency affect your returns. For most savers, a balanced approach—combining liquid emergency savings, CDs for near-term goals, and growth investments for the long term—provides the best of all worlds.
          </p>

          <p className="text-gray-700 mb-4">
            Ready to start earning higher returns on your savings? Use our calculator above to compare CD options, experiment with different terms and rates, and find the optimal strategy for your financial goals. With proper planning and the strategies outlined in this guide, CDs can be a valuable tool in your financial toolkit, delivering predictable returns and peace of mind in an uncertain economic landscape.
          </p>

        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Financial Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/savings-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🐷</div>
            <h3 className="font-semibold text-gray-900">Savings Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate savings growth over time</p>
          </Link>

          <Link
            href="/interest-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">Interest Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate compound and simple interest</p>
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
            href="/retirement-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🏖️</div>
            <h3 className="font-semibold text-gray-900">Retirement Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Plan your retirement savings strategy</p>
          </Link>

          <Link
            href="/inflation-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">Inflation Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate purchasing power and inflation impact</p>
          </Link>

          <Link
            href="/roi-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">ROI Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Measure return on investment percentage</p>
          </Link>

          <Link
            href="/budget-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💼</div>
            <h3 className="font-semibold text-gray-900">Budget Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Plan and track your monthly budget</p>
          </Link>

          <Link
            href="/roth-ira-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🏦</div>
            <h3 className="font-semibold text-gray-900">Roth IRA Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate tax-free retirement growth</p>
          </Link>
        </div>
      </section>

    </div>
  );
}

