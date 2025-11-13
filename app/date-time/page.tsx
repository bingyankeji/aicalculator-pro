'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import Script from "next/script";

// Date & Time Calculators - 10+ tools
const dateTimeCalculators = [
  { name: "Age Calculator", url: "/age-calculator" },
  { name: "Date Calculator", url: "/date-calculator" },
  { name: "Time Calculator", url: "/time-calculator" },
  { name: "Hours Calculator", url: "#" },
  { name: "Time Card Calculator", url: "#" },
  { name: "Time Duration Calculator", url: "#" },
  { name: "Time Zone Calculator", url: "#" },
  { name: "Day Counter", url: "#" },
  { name: "Day of the Week Calculator", url: "#" },
  { name: "Sleep Calculator", url: "#" },
];

export default function DateTimePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const liveCalculators = dateTimeCalculators.filter(calc => calc.url !== "#").length;
  const totalCalculators = dateTimeCalculators.length;

  const filteredCalculators = useMemo(() => {
    if (!searchQuery.trim()) {
      return dateTimeCalculators;
    }
    const query = searchQuery.toLowerCase().trim();
    return dateTimeCalculators.filter(calc =>
      calc.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Date & Time Calculators",
    "description": "Free online date and time calculators for age, date differences, time zones, and more. 10+ precise time tools.",
    "url": "https://aicalculator.com/date-time",
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
          "name": "Date & Time Calculators",
          "item": "https://aicalculator.com/date-time"
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="structured-data-datetime"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <h1 className="sr-only">Date & Time Calculators - 10+ Free Online Date & Time Tools</h1>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-indigo-600 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-semibold">Date & Time Calculators</li>
            </ol>
          </div>
        </nav>

        {/* Header & Search */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">⏰ Date & Time Calculators</h2>
              <p className="text-gray-600 mb-4">
                {liveCalculators} / {totalCalculators} calculators available
              </p>
            </div>
            
            {/* Search Box */}
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search date & time calculators... (e.g., age, date, time zone)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900"
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
                      className="group block bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-indigo-300 transition-all"
                    >
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
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
                  className="mt-4 text-indigo-600 hover:text-indigo-800 font-semibold"
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Our Date & Time Calculators?</h2>
                <p className="text-gray-700 mb-6">
                  Our collection of 10+ date and time calculators helps you calculate ages, date differences, time zones, and more with precision accuracy. Perfect for planning events, tracking milestones, and converting time across the globe.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">Popular Date & Time Calculators</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Age Calculator</strong> - Calculate your exact age in years, months, days, and hours</li>
                  <li><strong>Date Calculator</strong> - Add or subtract days, months, and years from any date</li>
                  <li><strong>Time Calculator</strong> - Add, subtract, and convert time in hours and minutes</li>
                  <li><strong>Time Zone Converter</strong> - Convert time between different time zones</li>
                  <li><strong>Day Counter</strong> - Count days between two dates</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-8">Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ <strong>Precision Accuracy</strong> - Calculate down to the second with precise algorithms</li>
                  <li>✅ <strong>Global Support</strong> - All time zones and international date formats</li>
                  <li>✅ <strong>Multiple Formats</strong> - Results in years, months, days, hours, minutes, seconds</li>
                  <li>✅ <strong>Instant Calculations</strong> - Real-time results as you type</li>
                  <li>✅ <strong>100% Free</strong> - No registration or limits</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
