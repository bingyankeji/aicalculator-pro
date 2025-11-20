'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import Script from "next/script";
import { allCalculators } from "@/lib/calculatorData";
import { getUrl } from '@/config/site';

export default function MathNumbersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamically filter Math calculators from calculatorData
  const mathCalculators = useMemo(() => {
    return allCalculators.filter(calc => calc.category === 'Math');
  }, []);

  const totalCalculators = mathCalculators.length;

  const filteredCalculators = useMemo(() => {
    if (!searchQuery.trim()) {
      return mathCalculators;
    }
    const query = searchQuery.toLowerCase().trim();
    return mathCalculators.filter(calc =>
      calc.name.toLowerCase().includes(query) ||
      calc.keywords.some(keyword => keyword.toLowerCase().includes(query))
    );
  }, [searchQuery, mathCalculators]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Math & Numbers Calculators",
    "description": "Free online math calculators for percentages, algebra, geometry, statistics, and more. 50+ professional math tools.",
    "url": getUrl('/math-numbers'),
    "breadcrumb": {
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
          "name": "Math & Numbers Calculators",
          "item": getUrl('/math-numbers')
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="structured-data-math"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <h1 className="sr-only">Math & Numbers Calculators - 50+ Free Online Math Tools</h1>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-purple-600 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-semibold">Math & Numbers Calculators</li>
            </ol>
          </div>
        </nav>

        {/* Header & Search */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">🔢 Math & Numbers Calculators</h2>
              <p className="text-gray-600 mb-4">
                {totalCalculators} calculators available
              </p>
            </div>
            
            {/* Search Box */}
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search math calculators... (e.g., percentage, fraction, algebra)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900"
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
                    className="group block bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-purple-300 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{calc.icon || '🔢'}</span>
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {calc.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No calculators found for "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-purple-600 hover:text-purple-800 font-semibold"
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Our Math Calculators?</h2>
                <p className="text-gray-700 mb-6">
                  Our comprehensive collection of 50+ math calculators helps students, teachers, and professionals solve mathematical problems quickly and accurately. From basic arithmetic to advanced algebra, geometry, and statistics, we've got you covered.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">Popular Math Calculators</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Percentage Calculator</strong> - Calculate percentages, increases, and decreases</li>
                  <li><strong>Scientific Calculator</strong> - Advanced math with trigonometric functions</li>
                  <li><strong>Fraction Calculator</strong> - Add, subtract, multiply, and divide fractions</li>
                  <li><strong>Quadratic Formula Calculator</strong> - Solve quadratic equations step-by-step</li>
                  <li><strong>Statistics Calculator</strong> - Mean, median, mode, standard deviation</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-8">Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ <strong>Instant Results</strong> - Get accurate answers in milliseconds</li>
                  <li>✅ <strong>Step-by-Step Solutions</strong> - Understand the math with detailed steps</li>
                  <li>✅ <strong>Educational Content</strong> - Learn concepts behind each calculation</li>
                  <li>✅ <strong>Mobile Friendly</strong> - Works perfectly on all devices</li>
                  <li>✅ <strong>100% Free</strong> - No limits, no ads, no registration</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
