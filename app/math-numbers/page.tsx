'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import Script from "next/script";

// Math Calculators - 50+ tools
const mathCalculators = [
  // Basic Math (15个)
  { name: "Percentage Calculator", url: "/percentage-calculator" },
  { name: "Scientific Calculator", url: "/scientific-calculator" },
  { name: "Basic Calculator", url: "#" },
  { name: "Fraction Calculator", url: "#" },
  { name: "Ratio Calculator", url: "#" },
  { name: "Average Calculator", url: "#" },
  { name: "Percent Error Calculator", url: "#" },
  { name: "Binary Calculator", url: "#" },
  { name: "Hex Calculator", url: "#" },
  { name: "Rounding Calculator", url: "#" },
  { name: "Scientific Notation Calculator", url: "#" },
  { name: "Exponent Calculator", url: "#" },
  { name: "Root Calculator", url: "#" },
  { name: "Logarithm Calculator", url: "#" },
  { name: "Prime Factorization Calculator", url: "#" },
  
  // Algebra & Equations (11个)
  { name: "Graphing Calculator", url: "/graphing-calculator" },
  { name: "Quadratic Formula Calculator", url: "/quadratic-formula-calculator" },
  { name: "Linear Equation Solver", url: "#" },
  { name: "System of Equations Solver", url: "#" },
  { name: "Inequality Solver", url: "#" },
  { name: "Polynomial Calculator", url: "#" },
  { name: "Factor Calculator", url: "#" },
  { name: "Simplify Calculator", url: "#" },
  { name: "Expand Calculator", url: "#" },
  { name: "GCF Calculator", url: "#" },
  { name: "LCM Calculator", url: "#" },
  
  // Geometry & Trigonometry (12个)
  { name: "Area Calculator", url: "/area-calculator" },
  { name: "Volume Calculator", url: "/volume-calculator" },
  { name: "Pythagorean Theorem Calculator", url: "/pythagorean-calculator" },
  { name: "Triangle Calculator", url: "/triangle-calculator" },
  { name: "Right Triangle Calculator", url: "/pythagorean-calculator" },
  { name: "Circle Calculator", url: "/circle-calculator" },
  { name: "Sphere Calculator", url: "#" },
  { name: "Cylinder Calculator", url: "#" },
  { name: "Cone Calculator", url: "#" },
  { name: "Surface Area Calculator", url: "#" },
  { name: "Distance Calculator", url: "#" },
  { name: "Slope Calculator", url: "#" },
  
  // Statistics & Probability (8个)
  { name: "Statistics Calculator", url: "#" },
  { name: "Standard Deviation Calculator", url: "/standard-deviation-calculator" },
  { name: "Mean Median Mode Calculator", url: "#" },
  { name: "Probability Calculator", url: "#" },
  { name: "Z-score Calculator", url: "#" },
  { name: "Confidence Interval Calculator", url: "#" },
  { name: "Sample Size Calculator", url: "#" },
  { name: "P-value Calculator", url: "#" },
  
  // Academic & Education (3个)
  { name: "Grade Calculator", url: "/grade-calculator" },
  { name: "GPA Calculator", url: "/gpa-calculator" },
  { name: "Test Score Calculator", url: "#" },
  
  // Other Math (5个)
  { name: "Matrix Calculator", url: "#" },
  { name: "Vector Calculator", url: "#" },
  { name: "Permutation Calculator", url: "#" },
  { name: "Combination Calculator", url: "#" },
  { name: "Sequence Calculator", url: "#" },
];

export default function MathNumbersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const liveCalculators = mathCalculators.filter(calc => calc.url !== "#").length;
  const totalCalculators = mathCalculators.length;

  const filteredCalculators = useMemo(() => {
    if (!searchQuery.trim()) {
      return mathCalculators;
    }
    const query = searchQuery.toLowerCase().trim();
    return mathCalculators.filter(calc =>
      calc.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Math & Numbers Calculators",
    "description": "Free online math calculators for percentages, algebra, geometry, statistics, and more. 50+ professional math tools.",
    "url": "https://aicalculator.com/math-numbers",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://aicalculator.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Math & Numbers Calculators",
          "item": "https://aicalculator.com/math-numbers"
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
                {liveCalculators} / {totalCalculators} calculators available
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
                {filteredCalculators.map((calc) => {
                  const isLive = calc.url !== "#";
                  return isLive ? (
                    <Link
                      key={calc.name}
                      href={calc.url}
                      className="group block bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-purple-300 transition-all"
                    >
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {calc.name}
                      </h3>
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
