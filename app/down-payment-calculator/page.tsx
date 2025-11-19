import React from 'react';
import { Metadata } from 'next';
import DownPaymentCalculator from '@/components/Calculator/DownPaymentCalculator';
import Link from 'next/link';
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

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Down Payment (Free, No signup) - Home Down Payment | AICalculator',
  description: 'Free down payment calculator with no sign-up required. Calculate down payment amount, savings timeline, PMI costs, and compare different down payment options. With closing costs, emergency fund planning, and investment opportunity analysis.',
  keywords: [
    'down payment calculator',
    'free down payment calculator',
    'down payment calculator no signup',
    'home down payment calculator',
    'down payment amount calculator',
    'how much down payment do i need',
    'down payment savings calculator',
    'PMI calculator',
    'avoid PMI calculator',
    '20% down payment calculator',
    'first time home buyer down payment',
    'down payment timeline calculator',
    'closing costs calculator',
    'home buying costs calculator',
    'down payment vs investment',
    'opportunity cost down payment',
    'down payment comparison',
    'FHA down payment calculator',
    'VA down payment calculator',
    'conventional loan down payment',
    'down payment assistance calculator',
    'save for down payment calculator',
    'minimum down payment calculator',
    'down payment percentage calculator',
    'total cash needed calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
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
  alternates: {
    canonical: getUrl('/down-payment-calculator'),
  },
  openGraph: {
    title: 'Down Payment (Free, No signup) - AICalculator',
    description: 'Free down payment calculator with no sign-up required. Calculate down payment amount, savings timeline, PMI costs, and compare different down payment options for home buying.',
    url: getUrl('/down-payment-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: getOgImage('down-payment'),
        width: 1200,
        height: 630,
        alt: 'Down Payment Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Down Payment (Free, No signup) - AICalculator',
    description: 'Free down payment calculator with no sign-up required. Calculate down payment amount, savings timeline, PMI costs, and compare different down payment options.',
    images: [getOgImage('down-payment')],
    creator: '@aicalculator',
  },
};

export default function DownPaymentCalculatorPage() {
  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // WebApplication Schema
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/down-payment-calculator'),
        name: 'Down Payment Calculator',
        url: getUrl('/down-payment-calculator'),
        description: 'Professional down payment calculator to calculate home down payment amount, savings timeline, PMI costs, closing costs, and compare different down payment options.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Down Payment Amount Calculator',
          'Savings Timeline Projection',
          'PMI Cost Analysis',
          'Closing Costs Estimation',
          'Emergency Fund Planning',
          'Investment Opportunity Cost Analysis',
          'Down Payment Options Comparison (3%, 5%, 10%, 20%)',
          'Monthly Payment Breakdown',
          'Total Cash Needed Calculator',
          'First-Time Home Buyer Support',
        ],
      },
      // BreadcrumbList Schema
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/down-payment-calculator'),
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: getUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Financial Calculators',
            item: getUrl('/financial'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Down Payment Calculator',
            item: getUrl('/down-payment-calculator'),
          },
        ],
      },
      // FAQPage Schema
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/down-payment-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much down payment do I need for a house?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The minimum down payment varies by loan type: Conventional loans require 3-5% down (3% for first-time buyers, 5% for repeat buyers), FHA loans require 3.5%, VA loans require 0% for eligible veterans, and USDA loans require 0% for rural properties. However, putting down 20% helps you avoid PMI (Private Mortgage Insurance), often secures better interest rates, and reduces your monthly payment. For a $300,000 home, a 20% down payment would be $60,000, while a 5% down payment would be $15,000. Consider your financial situation, emergency fund needs, and investment opportunities when deciding your down payment amount.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is PMI and how can I avoid it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'PMI (Private Mortgage Insurance) is insurance that protects the lender if you default on your loan. It\'s required when your down payment is less than 20% of the home price. PMI typically costs 0.3-1.5% of the loan amount annually, adding $50-$300+ to your monthly payment. To avoid PMI: 1) Save for a 20% down payment, 2) Use a piggyback loan (80-10-10 loan), 3) Consider lender-paid PMI (higher interest rate), 4) Use VA loans if you\'re a veteran (no PMI), 5) Use USDA loans for rural properties (no PMI), or 6) Request PMI removal once you reach 20% equity through payments or appreciation.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long will it take to save for a down payment?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Savings timeline depends on your monthly savings amount, current savings, and interest earned. For example: Saving $1,000/month with $10,000 current savings and 4.5% APY would reach $60,000 (20% down on $300,000 home) in about 46 months (3.8 years). Saving $1,500/month would reduce this to 30 months (2.5 years). To accelerate savings: 1) Increase income through side hustles or career advancement, 2) Reduce expenses and redirect savings to down payment fund, 3) Use high-yield savings accounts (4-5% APY), 4) Consider down payment assistance programs, 5) Receive gifts from family members (up to certain limits), and 6) Sell investments or assets. Use our calculator to see your personalized timeline based on your specific situation.',
            },
          },
          {
            '@type': 'Question',
            name: 'Should I put 20% down or invest the difference?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'This depends on several factors: 1) Investment returns vs. mortgage rate: If you can earn 8% investing but pay 7% mortgage interest, investing may be better. However, mortgage interest is guaranteed cost while investment returns vary. 2) PMI costs: If putting less than 20% down, factor in PMI costs (0.5-1.5% annually) which reduce the benefit of investing. 3) Risk tolerance: Paying down mortgage is guaranteed return, investing has risk. 4) Tax implications: Mortgage interest may be tax-deductible, investment gains are taxable. 5) Liquidity needs: Larger down payment reduces monthly payment but ties up cash. Example: $60,000 invested at 7% returns $4,200/year, while using it for 20% down payment saves ~$300/month in PMI ($3,600/year) plus reduces mortgage interest. Consider your complete financial picture including emergency fund, retirement savings, and risk tolerance.',
            },
          },
          {
            '@type': 'Question',
            name: 'What closing costs should I budget for?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Closing costs typically range from 2-5% of the home price and include: 1) Loan origination fees (0.5-1%), 2) Appraisal fee ($300-600), 3) Home inspection ($300-500), 4) Title insurance (0.5-1%), 5) Attorney fees ($500-1,500), 6) Recording fees ($100-300), 7) Property taxes (prorated), 8) Homeowners insurance (first year), 9) HOA fees (if applicable), and 10) Prepaid interest. For a $300,000 home, expect $6,000-15,000 in closing costs. Some costs are negotiable or can be rolled into the loan. First-time buyer programs may offer closing cost assistance. Always get a Loan Estimate within 3 days of applying to see exact costs.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much should I keep in emergency fund after down payment?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Financial experts recommend keeping 3-6 months of expenses in emergency fund even after making a down payment. As a homeowner, you should lean toward 6 months or more because: 1) Home repairs can be expensive (roof, HVAC, plumbing), 2) Property taxes and insurance increase over time, 3) HOA fees may have special assessments, 4) Job loss or income reduction still requires mortgage payments, and 5) Home equity is not easily accessible in emergencies. Calculate your monthly expenses including new mortgage payment, utilities, insurance, taxes, maintenance, and multiply by 6. For example, if monthly expenses are $4,000, keep $24,000 in emergency fund. Don\'t drain your savings completely for a larger down payment - financial security is more important than avoiding PMI.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the different down payment options?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Common down payment options include: 1) 3% Down (Conventional): Minimum for first-time buyers, requires PMI, higher monthly payment. Good for: buyers with limited savings who want to buy sooner. 2) 5% Down (Conventional): Standard minimum, requires PMI, moderate monthly payment. Good for: buyers balancing down payment and liquidity. 3) 10% Down: Reduces PMI costs and monthly payment, still requires PMI. Good for: buyers who can save more but not quite 20%. 4) 20% Down: Avoids PMI, lowest monthly payment, best interest rates. Good for: buyers with substantial savings who want lowest total cost. 5) 25%+ Down: May qualify for better rates, significantly lower monthly payment. Good for: buyers with high income or investment proceeds. Each option has trade-offs between upfront cost, monthly payment, PMI, and opportunity cost. Use our calculator to compare all options for your situation.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I use gift money for down payment?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, you can use gift money for down payment, but there are rules: 1) Gift must be from family member (parent, grandparent, sibling, spouse) or domestic partner, 2) Donor must provide gift letter stating money is a gift, not a loan, 3) You must document the transfer (bank statements showing deposit), 4) Some loan types have limits on gift amounts, 5) FHA loans allow 100% of down payment to be gifted, 6) Conventional loans may require you to contribute some of your own funds (varies by lender and down payment amount). For 2024, individuals can gift up to $18,000 per person ($36,000 per couple) without tax implications. Larger gifts may require filing gift tax return but rarely trigger actual tax. Always inform your lender about gift funds early in the process to ensure proper documentation.',
            },
          },
        ],
      },
      // HowTo Schema
      {
        '@type': 'HowTo',
        '@id': getHowToId('/down-payment-calculator'),
        name: 'How to Calculate Down Payment and Savings Timeline',
        description: 'Step-by-step guide to calculate your home down payment amount, savings timeline, PMI costs, and compare different down payment options.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Down Payment Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Home Price and Down Payment Percentage',
            text: 'Start by entering your target home price and desired down payment percentage. Common options are 3%, 5%, 10%, or 20%. The calculator will automatically compute your down payment amount. For example, a $300,000 home with 10% down requires $30,000 down payment.',
            url: getStepUrl('/down-payment-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Add Your Current Savings',
            text: 'Enter your current savings dedicated to home purchase. This is the amount you already have saved. If you\'re starting from zero, enter $0. The calculator will show how much more you need to save.',
            url: getStepUrl('/down-payment-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Set Monthly Savings Amount',
            text: 'Enter how much you can save each month toward your down payment. Be realistic - review your budget and consider your income, expenses, and other financial goals. The calculator will project your savings timeline.',
            url: getStepUrl('/down-payment-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Enter Savings Interest Rate',
            text: 'Input the annual percentage yield (APY) of your savings account. High-yield savings accounts currently offer 4-5% APY. This interest helps your savings grow faster over time.',
            url: getStepUrl('/down-payment-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Include Closing Costs and Additional Expenses',
            text: 'Click "Show Advanced Options" to add closing costs (typically 2-5% of home price), moving costs, and emergency fund requirements. This gives you a complete picture of total cash needed.',
            url: getStepUrl('/down-payment-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Add Loan Details for PMI Analysis',
            text: 'Enter mortgage rate, loan term, PMI rate, property tax, and home insurance to see complete monthly payment breakdown and PMI analysis. This helps you understand the true cost of different down payment options.',
            url: getStepUrl('/down-payment-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Review Savings Timeline',
            text: 'The calculator shows when you\'ll reach your down payment goal, including interest earned. You\'ll see month-by-month projection of your savings growth.',
            url: getStepUrl('/down-payment-calculator', 7),
          },
          {
            '@type': 'HowToStep',
            position: 8,
            name: 'Compare Down Payment Options',
            text: 'Review the comparison table showing 3%, 5%, 10%, and 20% down payment options. Compare monthly payments, PMI costs, total interest paid, and opportunity costs to make an informed decision.',
            url: getStepUrl('/down-payment-calculator', 8),
          },
        ],
      },
      // Article Schema
      {
        '@type': 'Article',
        '@id': getArticleId('/down-payment-calculator'),
        headline: 'Down Payment Calculator: Complete Guide to Home Down Payments, PMI, and Savings Strategies',
        description: 'Comprehensive guide to calculating down payment amounts, understanding PMI, planning savings timeline, and comparing different down payment options for home buying.',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
        datePublished: '2024-01-01',
        dateModified: '2024-11-16',
        image: getOgImage('down-payment'),
        articleBody: 'A down payment is the upfront cash payment you make when purchasing a home, typically expressed as a percentage of the home\'s purchase price. Understanding down payments, PMI requirements, savings strategies, and comparing different down payment options is crucial for successful home buying. This comprehensive guide covers everything you need to know about down payments, from minimum requirements to advanced strategies for optimizing your home purchase.',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">Down Payment Calculator - Calculate Home Down Payment and Savings Timeline</h1>
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto" 
                itemScope itemType="https://schema.org/BreadcrumbList">
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
                  Down Payment Calculator
                </span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>
        
        <DownPaymentCalculator />

        {/* Educational Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Down Payments</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">What is a Down Payment?</h3>
              <p className="text-blue-800">
                A down payment is the initial cash payment you make when purchasing a home, representing a percentage of the total purchase price. 
                The remaining amount is financed through a mortgage loan. Down payments typically range from 0% to 25% or more, depending on the loan type, 
                your financial situation, and lender requirements.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Minimum Down Payment Requirements by Loan Type</h3>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Loan Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Minimum Down Payment</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">PMI Required?</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Conventional (First-Time)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">3%</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Yes (if &lt; 20%)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">First-time buyers with good credit</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Conventional (Standard)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">5%</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Yes (if &lt; 20%)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Repeat buyers with good credit</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">FHA Loan</td>
                    <td className="px-6 py-4 text-sm text-gray-700">3.5%</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Yes (MIP for life if &lt; 10% down)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Buyers with lower credit scores</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">VA Loan</td>
                    <td className="px-6 py-4 text-sm text-gray-700">0%</td>
                    <td className="px-6 py-4 text-sm text-gray-700">No</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Veterans and active military</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">USDA Loan</td>
                    <td className="px-6 py-4 text-sm text-gray-700">0%</td>
                    <td className="px-6 py-4 text-sm text-gray-700">No (but has guarantee fee)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Rural property buyers</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Jumbo Loan</td>
                    <td className="px-6 py-4 text-sm text-gray-700">10-20%</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Varies by lender</td>
                    <td className="px-6 py-4 text-sm text-gray-700">High-value property buyers</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding PMI (Private Mortgage Insurance)</h3>
            
            <p className="text-gray-700 mb-4">
              Private Mortgage Insurance (PMI) is required by lenders when your down payment is less than 20% of the home&apos;s purchase price. 
              PMI protects the lender (not you) if you default on the loan. Here&apos;s what you need to know:
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-yellow-900 mb-3">PMI Costs and Impact</h4>
              <ul className="list-disc list-inside space-y-2 text-yellow-800">
                <li><strong>Cost:</strong> Typically 0.3% to 1.5% of the loan amount annually</li>
                <li><strong>Monthly Impact:</strong> Adds $50 to $300+ to your monthly payment</li>
                <li><strong>Duration:</strong> Required until you reach 20% equity (22% for automatic removal)</li>
                <li><strong>Tax Deductibility:</strong> Not tax-deductible for most taxpayers (as of 2024)</li>
              </ul>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mb-3">Ways to Avoid PMI</h4>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
              <li><strong>20% Down Payment:</strong> The most straightforward way - save until you have 20% down</li>
              <li><strong>Piggyback Loan (80-10-10):</strong> Take a first mortgage for 80%, second mortgage for 10%, and pay 10% down</li>
              <li><strong>Lender-Paid PMI:</strong> Lender pays PMI in exchange for higher interest rate (may be worth it if you plan to refinance soon)</li>
              <li><strong>VA Loan:</strong> If you&apos;re a veteran or active military, VA loans don&apos;t require PMI</li>
              <li><strong>USDA Loan:</strong> For rural properties, USDA loans don&apos;t have PMI (but have a guarantee fee)</li>
              <li><strong>Request Removal:</strong> Once you reach 20% equity through payments or appreciation, request PMI removal</li>
            </ol>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Savings Strategies for Down Payment</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-900 mb-3">Increase Income</h4>
                <ul className="list-disc list-inside space-y-2 text-green-800">
                  <li>Side hustle or freelance work</li>
                  <li>Ask for a raise or promotion</li>
                  <li>Sell unused items</li>
                  <li>Rent out a room or parking space</li>
                  <li>Take on overtime at work</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-900 mb-3">Reduce Expenses</h4>
                <ul className="list-disc list-inside space-y-2 text-purple-800">
                  <li>Cut subscription services</li>
                  <li>Reduce dining out and entertainment</li>
                  <li>Downgrade car or use public transit</li>
                  <li>Shop with coupons and buy generic</li>
                  <li>Eliminate unnecessary expenses</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">Optimize Savings</h4>
                <ul className="list-disc list-inside space-y-2 text-blue-800">
                  <li>Use high-yield savings account (4-5% APY)</li>
                  <li>Automate monthly transfers</li>
                  <li>Save windfalls (tax refunds, bonuses)</li>
                  <li>Consider short-term CDs</li>
                  <li>Track progress monthly</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-orange-900 mb-3">Alternative Sources</h4>
                <ul className="list-disc list-inside space-y-2 text-orange-800">
                  <li>Gift from family members</li>
                  <li>Down payment assistance programs</li>
                  <li>First-time buyer grants</li>
                  <li>Employer home buying programs</li>
                  <li>IRA withdrawal (first-time buyers)</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Down Payment vs. Investment: What&apos;s Better?</h3>
            
            <p className="text-gray-700 mb-4">
              One common dilemma is whether to make a larger down payment or invest the money instead. Here&apos;s a framework to help you decide:
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Favor Larger Down Payment If:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Your down payment is less than 20% (to avoid PMI)</li>
                <li>You have high-interest debt to pay off first</li>
                <li>You&apos;re risk-averse and prefer guaranteed savings</li>
                <li>Your mortgage rate is higher than expected investment returns</li>
                <li>You want lower monthly payments for cash flow</li>
                <li>You&apos;re close to retirement and want less debt</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Favor Investing If:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>You already have 20% down (no PMI)</li>
                <li>Your mortgage rate is low (below 5%)</li>
                <li>You have a long investment timeline (10+ years)</li>
                <li>You&apos;re comfortable with investment risk</li>
                <li>You&apos;re not maxing out retirement accounts</li>
                <li>Expected investment returns exceed mortgage rate by 2%+</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Example Comparison</h4>
              <p className="text-blue-800 mb-3">
                Scenario: $300,000 home, you have $60,000 available
              </p>
              <div className="space-y-3 text-blue-800">
                <div>
                  <strong>Option A: 20% Down ($60,000)</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Loan: $240,000 at 7%</li>
                    <li>Monthly payment: $1,597 (no PMI)</li>
                    <li>Total interest over 30 years: $334,900</li>
                  </ul>
                </div>
                <div>
                  <strong>Option B: 10% Down ($30,000) + Invest $30,000</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Loan: $270,000 at 7%</li>
                    <li>Monthly payment: $1,797 + $135 PMI = $1,932</li>
                    <li>Total interest over 30 years: $376,760</li>
                    <li>Investment value after 30 years at 8% return: $301,635</li>
                    <li>Net benefit: ~$260,000 (but with more risk)</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Total Cash Needed for Home Purchase</h3>
            
            <p className="text-gray-700 mb-4">
              Don&apos;t forget - you need more than just the down payment! Here&apos;s a complete breakdown of cash needed:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Expense Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Typical Cost</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Example ($300k Home)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Down Payment</td>
                    <td className="px-6 py-4 text-sm text-gray-700">3-20% of home price</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$9,000 - $60,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Closing Costs</td>
                    <td className="px-6 py-4 text-sm text-gray-700">2-5% of home price</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$6,000 - $15,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Home Inspection</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$300-600</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$450</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Appraisal</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$300-600</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$450</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Moving Costs</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$500-5,000</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$2,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Immediate Repairs/Updates</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$1,000-10,000</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$3,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Emergency Fund</td>
                    <td className="px-6 py-4 text-sm text-gray-700">6 months expenses</td>
                    <td className="px-6 py-4 text-sm text-gray-700">$24,000</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-bold">Total Cash Needed</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-bold">Varies</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-bold">$44,900 - $104,900</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Down Payment Assistance Programs</h3>
            
            <p className="text-gray-700 mb-4">
              Many first-time buyers qualify for down payment assistance programs that can provide grants or low-interest loans:
            </p>

            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900">Federal Programs</h4>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>FHA loans with 3.5% down</li>
                  <li>VA loans with 0% down for veterans</li>
                  <li>USDA loans with 0% down for rural properties</li>
                  <li>Good Neighbor Next Door (50% discount for public servants)</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900">State and Local Programs</h4>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>State housing finance agencies (vary by state)</li>
                  <li>County and city first-time buyer programs</li>
                  <li>Employer-assisted housing programs</li>
                  <li>Non-profit housing organizations</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900">Special Programs</h4>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Teacher Next Door programs</li>
                  <li>Healthcare worker assistance</li>
                  <li>Military and veteran programs</li>
                  <li>Native American home loan programs</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h4 className="text-lg font-semibold text-yellow-900 mb-2">⚠️ Important Considerations</h4>
              <ul className="list-disc list-inside space-y-2 text-yellow-800">
                <li>Many programs have income limits and property price limits</li>
                <li>Some require homebuyer education courses</li>
                <li>Assistance may be forgivable loans (become grants if you stay certain years)</li>
                <li>Some programs require you to live in the home as primary residence</li>
                <li>Research programs in your specific area - availability varies widely</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Down Payment Mistakes to Avoid</h3>
            
            <div className="space-y-4 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Draining All Savings</h4>
                <p className="text-red-800">
                  Don&apos;t use every penny for down payment. Keep 6 months emergency fund. Homes have unexpected expenses!
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Ignoring Closing Costs</h4>
                <p className="text-red-800">
                  Budget for 2-5% of home price in closing costs. These are due at closing and can&apos;t be financed in most cases.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Withdrawing from Retirement</h4>
                <p className="text-red-800">
                  Avoid raiding 401(k) or IRA. You&apos;ll pay taxes, penalties, and lose decades of compound growth. First-time buyers can withdraw $10,000 from IRA penalty-free, but still pay taxes.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Buying Too Soon</h4>
                <p className="text-red-800">
                  Don&apos;t rush to buy if you&apos;re not financially ready. Renting while saving more can lead to better home purchase terms and less financial stress.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Not Shopping Around</h4>
                <p className="text-red-800">
                  Compare multiple lenders. A 0.25% difference in rate on $300,000 loan saves $15,000+ over 30 years. Get at least 3 quotes.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Timeline: From Saving to Closing</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Months 1-3: Planning Phase</h4>
                  <p className="text-gray-700">Check credit score, create budget, research loan types, determine target home price and down payment goal.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Months 4-24: Saving Phase</h4>
                  <p className="text-gray-700">Automate savings, use high-yield account, increase income, reduce expenses, track progress monthly.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Month 25: Pre-Approval</h4>
                  <p className="text-gray-700">Get pre-approved for mortgage, shop multiple lenders, understand loan terms and closing costs.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Months 26-27: House Hunting</h4>
                  <p className="text-gray-700">Work with realtor, view homes, make offer, negotiate price, schedule inspection.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Month 28: Closing</h4>
                  <p className="text-gray-700">Complete final walkthrough, review closing documents, wire down payment and closing costs, receive keys!</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Calculate Your Down Payment?</h3>
              <p className="text-gray-700 mb-4">
                Use our calculator above to determine your down payment amount, savings timeline, PMI costs, and compare different down payment options. 
                Get a complete picture of your home buying journey and make informed decisions about your financial future.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/mortgage-calculator"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Calculate Monthly Payment
                </Link>
                <Link 
                  href="/home-affordability-calculator"
                  className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Check Affordability
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
