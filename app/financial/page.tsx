'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import Script from "next/script";
import { allCalculators } from "@/lib/calculatorData";

export default function FinancialPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamically filter Financial calculators from calculatorData
  const financialCalculators = useMemo(() => {
    return allCalculators.filter(calc => calc.category === 'Financial');
  }, []);

  const totalCalculators = financialCalculators.length;

  const filteredCalculators = useMemo(() => {
    if (!searchQuery.trim()) {
      return financialCalculators;
    }
    const query = searchQuery.toLowerCase().trim();
    return financialCalculators.filter(calc =>
      calc.name.toLowerCase().includes(query) ||
      calc.keywords.some(keyword => keyword.toLowerCase().includes(query))
    );
  }, [searchQuery, financialCalculators]);

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
                {totalCalculators} calculators available
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
                {filteredCalculators.map((calc) => (
                  <Link
                    key={calc.url}
                    href={calc.url}
                    className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-2xl">{calc.icon || '🎯'}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">{calc.name}</h3>
                        <p className="text-sm text-gray-500">{calc.name}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{calc.name}</p>
                  </Link>
                ))}
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
