import { Metadata } from "next";
import Link from "next/link";
import RMDCalculator from "@/components/Calculator/RMDCalculator";
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
  title: "RMD Calculator - Required Minimum Distribution Calculator for IRA & 401k | AICalculator",
  description: "Free RMD calculator for IRA, 401k, and 403b accounts. Calculate your required minimum distribution based on IRS life expectancy tables. Avoid 50% penalty with accurate RMD calculations.",
  keywords: [
    "rmd calculator",
    "required minimum distribution calculator",
    "ira rmd calculator",
    "401k rmd calculator",
    "rmd calculation",
    "retirement distribution calculator",
    "minimum distribution calculator",
    "irs rmd calculator"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "RMD Calculator - Required Minimum Distribution",
    description: "Calculate your required minimum distribution for retirement accounts. Based on IRS Publication 590-B.",
    type: "website",
    url: getUrl('/rmd-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [{ url: getOgImage('rmd'), width: 1200, height: 630, alt: 'RMD Calculator' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RMD Calculator",
    description: "Calculate required minimum distributions for IRA and 401k.",
    images: [getOgImage('rmd')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: { canonical: getUrl('/rmd-calculator') },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { 'last-modified': new Date().toISOString() },
};

export default function RMDCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "WebApplication",
      "@id": getWebAppId('/rmd-calculator'),
      "name": "RMD Calculator",
      "url": getUrl('/rmd-calculator'),
      "description": "Calculate required minimum distribution for retirement accounts based on IRS tables.",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "featureList": [
        "IRS Uniform Lifetime Table calculations",
        "Spouse beneficiary adjustments",
        "20-year RMD projections",
        "Account balance forecasting",
        "50% penalty risk calculation",
        "Tax strategy recommendations"
      ]
    }, {
      "@type": "BreadcrumbList",
      "@id": getBreadcrumbId('/rmd-calculator'),
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": getUrl('/') },
        { "@type": "ListItem", "position": 2, "name": "Financial Calculators", "item": getUrl('/category/financial') },
        { "@type": "ListItem", "position": 3, "name": "RMD Calculator", "item": getUrl('/rmd-calculator') }
      ]
    }, {
      "@type": "FAQPage",
      "@id": getFaqId('/rmd-calculator'),
      "mainEntity": [{
        "@type": "Question",
        "name": "What is RMD and when do I need to take it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Required Minimum Distribution (RMD) is the minimum amount you must withdraw from your retirement accounts each year starting at age 73 (or 72 if born before 1951). The IRS requires these distributions to ensure retirement funds are eventually taxed. Failure to take RMD results in a 50% excise tax penalty on the amount not withdrawn."
        }
      }, {
        "@type": "Question",
        "name": "How is RMD calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RMD is calculated by dividing your account balance as of December 31 of the previous year by your life expectancy factor from the IRS Uniform Lifetime Table. If your spouse is the sole beneficiary and more than 10 years younger, you use the Joint Life and Last Survivor Expectancy Table for a lower distribution requirement."
        }
      }, {
        "@type": "Question",
        "name": "Can I take more than the RMD amount?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can withdraw more than the required minimum distribution. However, excess withdrawals do not count toward future years RMDs. Each year requires its own minimum distribution calculation based on that year account balance and life expectancy factor."
        }
      }, {
        "@type": "Question",
        "name": "What accounts require RMD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RMD applies to Traditional IRAs, SEP IRAs, SIMPLE IRAs, 401k plans, 403b plans, 457b plans, and other defined contribution plans. Roth IRAs do not require RMDs during the owner lifetime, but inherited Roth IRAs do have RMD requirements."
        }
      }, {
        "@type": "Question",
        "name": "What is the penalty for missing RMD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The penalty for not taking your RMD is 50% of the amount you should have withdrawn. For example, if your RMD is $10,000 and you fail to withdraw it, you owe a $5,000 penalty plus the regular income tax on the distribution when you eventually take it."
        }
      }, {
        "@type": "Question",
        "name": "Can I donate my RMD to charity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, if you are age 70.5 or older, you can make a Qualified Charitable Distribution (QCD) up to $105,000 per year directly from your IRA to a qualified charity. The QCD counts toward your RMD requirement and is excluded from your taxable income, providing significant tax benefits."
        }
      }]
    }, {
      "@type": "HowTo",
      "@id": getHowToId('/rmd-calculator'),
      "name": "How to Calculate Required Minimum Distribution",
      "description": "Step-by-step guide to calculating your RMD",
      "step": [{
        "@type": "HowToStep",
        "position": 1,
        "name": "Determine Your Age",
        "text": "Calculate your age as of December 31 of the current year. RMD begins at age 73 (or 72 if born before 1951).",
        "url": getStepUrl('/rmd-calculator', 1)
      }, {
        "@type": "HowToStep",
        "position": 2,
        "name": "Find Account Balance",
        "text": "Locate your retirement account balance as of December 31 of the previous year. This is the balance before any distributions in the current year.",
        "url": getStepUrl('/rmd-calculator', 2)
      }, {
        "@type": "HowToStep",
        "position": 3,
        "name": "Look Up Life Expectancy Factor",
        "text": "Use the IRS Uniform Lifetime Table to find your distribution period based on your age. If your spouse is the sole beneficiary and more than 10 years younger, use the Joint Life Table.",
        "url": getStepUrl('/rmd-calculator', 3)
      }, {
        "@type": "HowToStep",
        "position": 4,
        "name": "Calculate RMD",
        "text": "Divide your account balance by the life expectancy factor. For example: $200,000 divided by 24.6 equals $8,130.08 RMD.",
        "url": getStepUrl('/rmd-calculator', 4)
      }, {
        "@type": "HowToStep",
        "position": 5,
        "name": "Take Distribution by Deadline",
        "text": "Withdraw the RMD amount by December 31. Your first RMD can be delayed until April 1 of the following year, but then you must take two RMDs that year.",
        "url": getStepUrl('/rmd-calculator', 5)
      }]
    }, {
      "@type": "Article",
      "@id": getArticleId('/rmd-calculator'),
      "headline": "Understanding Required Minimum Distributions for Retirement Accounts",
      "description": "Complete guide to RMD calculations, rules, strategies, and tax implications",
      "author": { "@type": "Organization", "name": "AICalculator.pro" },
      "publisher": { "@type": "Organization", "name": "AICalculator.pro", "logo": { "@type": "ImageObject", "url": getUrl('/logo.png') } },
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString()
    }]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <h1 className="sr-only">RMD Calculator - Calculate Your Required Minimum Distribution for IRA and 401k Retirement Accounts</h1>
      
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors"><span itemProp="name">Home</span></a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/financial" itemProp="item" className="hover:text-blue-600 transition-colors"><span itemProp="name">Financial</span></a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">RMD Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <RMDCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Required Minimum Distributions (RMD)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">📅 RMD Age Requirements</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Born before 1951:</strong> Age 72</li>
                <li><strong>Born 1951-1959:</strong> Age 73</li>
                <li><strong>Born 1960 or later:</strong> Age 75 (SECURE 2.0)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                The SECURE Act and SECURE 2.0 Act gradually increased the RMD starting age to allow retirement savings to grow longer.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">⚠️ Important Deadlines</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>First RMD:</strong> April 1 of year after turning 73</li>
                <li><strong>Subsequent RMDs:</strong> December 31 each year</li>
                <li><strong>Penalty:</strong> 50% excise tax on missed amount</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                Note: If you delay your first RMD to April 1, you must take two distributions that year.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">How RMD is Calculated</h3>
          <p className="text-gray-700 mb-4">
            The RMD amount is determined using a simple formula based on IRS life expectancy tables:
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
            <p className="font-mono text-lg text-gray-900">
              RMD = Account Balance (Dec 31) / Life Expectancy Factor
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Example: $200,000 / 24.6 = $8,130.08
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">IRS Life Expectancy Tables</h3>
          <p className="text-gray-700 mb-4">
            The IRS provides three tables for RMD calculations:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li><strong>Uniform Lifetime Table:</strong> Used by most account owners</li>
            <li><strong>Joint Life and Last Survivor Table:</strong> When spouse is sole beneficiary and more than 10 years younger</li>
            <li><strong>Single Life Table:</strong> Used by beneficiaries of inherited accounts</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Tax Strategies to Minimize RMD Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">🔄 Roth Conversions</h4>
              <p className="text-gray-700 text-sm">
                Convert traditional IRA funds to Roth IRA before RMD age. Roth IRAs have no RMD requirements during your lifetime, reducing future tax burden.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">❤️ Qualified Charitable Distributions</h4>
              <p className="text-gray-700 text-sm">
                If age 70.5+, donate up to $105,000 directly from IRA to charity. Counts toward RMD but excluded from taxable income.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">💼 Still Working Exception</h4>
              <p className="text-gray-700 text-sm">
                If you are still working and do not own 5%+ of the company, you may delay RMD from your current employer 401k until retirement.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">📊 Tax Bracket Management</h4>
              <p className="text-gray-700 text-sm">
                Take distributions strategically to stay within lower tax brackets. Consider taking more than RMD in low-income years.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Common RMD Mistakes to Avoid</h3>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
            <ul className="space-y-3 text-gray-700">
              <li><strong>❌ Missing the deadline:</strong> Results in 50% penalty plus regular income tax</li>
              <li><strong>❌ Using wrong account balance:</strong> Must use December 31 balance from previous year</li>
              <li><strong>❌ Not aggregating IRAs:</strong> Calculate RMD for each IRA but can withdraw total from one</li>
              <li><strong>❌ Forgetting inherited IRAs:</strong> Inherited accounts have separate RMD requirements</li>
              <li><strong>❌ Not updating beneficiaries:</strong> Affects life expectancy calculations for your heirs</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Multiple Account Considerations</h3>
          <p className="text-gray-700 mb-4">
            If you have multiple retirement accounts:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li><strong>IRAs:</strong> Calculate RMD for each, but can withdraw total from any combination</li>
            <li><strong>401k/403b:</strong> Must calculate and withdraw RMD separately from each account</li>
            <li><strong>Inherited accounts:</strong> Separate RMD calculations required for each inherited account</li>
            <li><strong>Roth IRAs:</strong> No RMD during owner lifetime (but inherited Roth IRAs do have RMDs)</li>
          </ul>
        </div>
      </section>

      {/* Related Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Retirement Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/retirement-calculator" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🏖️ Retirement Calculator</h3>
            <p className="text-sm text-gray-600">Plan your retirement savings goals and timeline</p>
          </Link>
          <Link href="/401k-calculator" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">💼 401k Calculator</h3>
            <p className="text-sm text-gray-600">Calculate 401k growth with employer matching</p>
          </Link>
          <Link href="/investment-calculator" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 Investment Calculator</h3>
            <p className="text-sm text-gray-600">Project investment returns over time</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

