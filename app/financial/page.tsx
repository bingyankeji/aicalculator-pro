'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import Script from "next/script";

// Financial Calculators - 80+ tools
const financialCalculators = [
  // Mortgage & Loans (15个)
  { name: "Mortgage Calculator", url: "/mortgage-calculator" },
  { name: "Home Loan Calculator", url: "/home-loan-calculator" },
  { name: "Loan Calculator", url: "/loan-calculator" },
  { name: "EMI Calculator", url: "/emi-calculator" },
  { name: "Mortgage Payoff Calculator", url: "/mortgage-payoff-calculator" },
        { name: "Payment Calculator", url: "/payment-calculator" },
        { name: "Auto Loan Calculator", url: "/auto-loan-calculator" },
  { name: "Student Loan Calculator", url: "/student-loan-calculator" },
  { name: "Personal Loan Calculator", url: "#" },
  { name: "FHA Loan Calculator", url: "#" },
  { name: "VA Mortgage Calculator", url: "#" },
  { name: "Home Affordability Calculator", url: "#" },
  { name: "Refinance Calculator", url: "/refinance-calculator" },
  { name: "Rent Calculator", url: "#" },
  { name: "Amortization Calculator", url: "#" },
  { name: "Down Payment Calculator", url: "#" },
  { name: "Debt Consolidation Calculator", url: "#" },
  { name: "Payback Period Calculator", url: "#" },
  
  // Investment & Savings (15个)
  { name: "Investment Calculator", url: "/investment-calculator" },
  { name: "Interest Calculator", url: "/interest-calculator" },
  { name: "Compound Interest Calculator", url: "/compound-interest-calculator" },
  { name: "Future Value Calculator", url: "/future-value-calculator" },
  { name: "Present Value Calculator", url: "/present-value-calculator" },
  { name: "Retirement Calculator", url: "/retirement-calculator" },
  { name: "401k Calculator", url: "/401k-calculator" },
  { name: "Roth IRA Calculator", url: "#" },
  { name: "IRA Calculator", url: "#" },
  { name: "Annuity Calculator", url: "#" },
  { name: "Savings Calculator", url: "/savings-calculator" },
  { name: "ROI Calculator", url: "/roi-calculator" },
  { name: "APR Calculator", url: "#" },
  { name: "Inflation Calculator", url: "/inflation-calculator" },
  { name: "NPV Calculator", url: "#" },
  
  // Salary & Tax (15个)
  { name: "Salary Calculator", url: "/salary-calculator" },
  { name: "Income Tax Calculator", url: "/tax-calculator" },
  { name: "Paycheck Calculator", url: "/pay-calculator" },
  { name: "Take-Home-Paycheck Calculator", url: "#" },
  { name: "Federal Tax Calculator", url: "/tax-calculator" },
  { name: "Property Tax Calculator", url: "#" },
  { name: "Capital Gains Tax Calculator", url: "#" },
  { name: "Social Security Calculator", url: "/social-security-calculator" },
  { name: "Estate Tax Calculator", url: "/estate-tax-calculator" },
  { name: "VAT Calculator", url: "/vat-calculator" },
  { name: "Pension Calculator", url: "/pension-calculator" },
  { name: "Commission Calculator", url: "/commission-calculator" },
  { name: "Hourly to Salary Calculator", url: "/hourly-to-salary-calculator" },
  
  // Credit Card & Debt (10个)
  { name: "Credit Card Calculator", url: "/credit-card-calculator" },
  { name: "Credit Card Payoff Calculator", url: "/credit-card-payoff-calculator" },
  { name: "Debt Payoff Calculator", url: "/debt-payoff-calculator" },
  { name: "Debt-to-Income Ratio Calculator", url: "/dti-calculator" },
  { name: "Minimum Payment Calculator", url: "/minimum-payment-calculator" },
  { name: "Balance Transfer Calculator", url: "/balance-transfer-calculator" },
  { name: "APR vs APY Calculator", url: "/apr-vs-apy-calculator" },
  { name: "Late Fee Calculator", url: "/late-fee-calculator" },
  { name: "Credit Utilization Calculator", url: "#" },
  { name: "FICO Score Estimator", url: "#" },
  
  // Business & Investment (15个)
  { name: "Business Loan Calculator", url: "/business-loan-calculator" },
  { name: "Break-even Calculator", url: "/breakeven-calculator" },
  { name: "Profit Margin Calculator", url: "/profit-margin-calculator" },
  { name: "Markup Calculator", url: "/markup-calculator" },
  { name: "Payroll Calculator", url: "/payroll-calculator" },
  { name: "Sales Tax Calculator", url: "/sales-tax-calculator" },
  { name: "Discount Calculator", url: "/discount-calculator" },
  { name: "Cash Flow Calculator", url: "/cash-flow-calculator" },
  { name: "Lease Calculator", url: "/lease-calculator" },
  { name: "Auto Lease Calculator", url: "#" },
  { name: "Equipment Lease Calculator", url: "#" },
  { name: "NPV Calculator", url: "#" },
  { name: "IRR Calculator", url: "#" },
  { name: "Depreciation Calculator", url: "/depreciation-calculator" },
  { name: "Overtime Calculator", url: "/overtime-calculator" },
  { name: "Amortization Calculator", url: "/amortization-calculator" },
  { name: "Present Value Calculator", url: "#" },
  { name: "Annuity Payout Calculator", url: "#" },
  
  // Other Financial (13个)
  { name: "Currency Converter", url: "/currency-converter" },
  { name: "Bond Calculator", url: "#" },
  { name: "Stock Calculator", url: "#" },
  { name: "Dividend Calculator", url: "#" },
  { name: "Options Calculator", url: "#" },
  { name: "Bitcoin Calculator", url: "#" },
  { name: "Margin Calculator", url: "#" },
  { name: "PIP Calculator", url: "#" },
  { name: "Rental Property Calculator", url: "#" },
  { name: "Cap Rate Calculator", url: "#" },
  { name: "Lottery Calculator", url: "#" },
  { name: "Tip Calculator", url: "/tip-calculator" },
  { name: "Unit Price Calculator", url: "#" },
];

export default function FinancialPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const liveCalculators = financialCalculators.filter(calc => calc.url !== "#").length;
  const totalCalculators = financialCalculators.length;

  const filteredCalculators = useMemo(() => {
    if (!searchQuery.trim()) {
      return financialCalculators;
    }
    const query = searchQuery.toLowerCase().trim();
    return financialCalculators.filter(calc =>
      calc.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Financial Calculators",
    "description": "Free online financial calculators for mortgage, loans, taxes, investments, and more. 80+ professional financial planning tools.",
    "url": "https://aicalculator.pro/financial",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://aicalculator.pro"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Financial Calculators",
          "item": "https://aicalculator.pro/financial"
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="structured-data-financial"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <h1 className="sr-only">Financial Calculators - 80+ Free Online Financial Planning Tools</h1>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-semibold">Financial Calculators</li>
            </ol>
          </div>
        </nav>

        {/* Header & Search */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">💰 Financial Calculators</h2>
              <p className="text-gray-600 mb-4">
                {liveCalculators} / {totalCalculators} calculators available
              </p>
            </div>
            
            {/* Search Box */}
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search financial calculators... (e.g., mortgage, loan, tax)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
              />
            </div>
          </div>
        </section>

        {/* Calculators Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredCalculators.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredCalculators.map((calc) => {
                  const isLive = calc.url !== "#";
                  return isLive ? (
                    <Link
                      key={calc.name}
                      href={calc.url}
                      className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                          <span className="text-2xl">🎯</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">{calc.name}</h3>
                          <p className="text-sm text-gray-500">{calc.name}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{calc.name}</p>
                    </Link>
                  ) : (
                    <div
                      key={calc.name}
                      className="block bg-gray-50 rounded-lg border border-gray-200 p-4 opacity-60"
                    >
                      <h3 className="text-sm font-semibold text-gray-500">
                        {calc.name}
                        <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                          Soon
                        </span>
                      </h3>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No calculators found for "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Educational Content (SEO) */}
        {!searchQuery && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-gray">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Our Financial Calculators?</h2>
                <p className="text-gray-700 mb-6">
                  Our comprehensive collection of 80+ financial calculators helps you make smart money decisions. From mortgage planning to retirement savings, tax calculations to investment returns, we provide professional-grade tools that are completely free and easy to use.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">Popular Financial Calculators</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Mortgage Calculator</strong> - Calculate monthly payments, total interest, and affordability</li>
                  <li><strong>Loan Calculator</strong> - Compare amortized, deferred, and bond loan options</li>
                  <li><strong>Income Tax Calculator</strong> - Federal and state tax calculations with deductions</li>
                  <li><strong>Interest Calculator</strong> - Compound interest with contributions and tax impact</li>
                  <li><strong>Retirement Calculator</strong> - Plan your retirement savings and investment strategy</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-8">Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ <strong>100% Free</strong> - All calculators are completely free with no registration required</li>
                  <li>✅ <strong>Accurate Formulas</strong> - Industry-standard calculations you can trust</li>
                  <li>✅ <strong>Smart Analysis</strong> - Get personalized insights and recommendations</li>
                  <li>✅ <strong>Visual Reports</strong> - Interactive charts and detailed breakdowns</li>
                  <li>✅ <strong>Private & Secure</strong> - All calculations happen in your browser</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
