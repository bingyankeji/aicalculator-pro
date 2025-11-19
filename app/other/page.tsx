'use client';

import { useMemo } from "react";
import Link from "next/link";
import { allCalculators } from "@/lib/calculatorData";

export default function OtherCalculatorsPage() {
  // Filter only "Other" category calculators
  const otherCalculators = useMemo(() => {
    return allCalculators.filter(calc => calc.category === 'Other');
  }, []);

  const totalCount = otherCalculators.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* SEO: Hidden H1 */}
      <h1 className="sr-only">
        Other Calculators - {totalCount}+ Free Utility and Conversion Tools
      </h1>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/calculators" className="hover:text-blue-600 transition-colors">
                All Calculators
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-semibold">Other Calculators</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">🔧</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Other Calculators
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            Browse <strong>{totalCount}+ free utility and conversion tools</strong> including date calculators, 
            unit converters, and various practical tools for everyday use.
          </p>
        </header>

        {/* Calculators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherCalculators.map((calc) => (
            <Link
              key={calc.url}
              href={calc.url}
              className="block p-4 rounded-lg border transition-all duration-200 bg-white border-gray-200 hover:border-blue-300 hover:shadow-md text-gray-900 hover:text-blue-600"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{calc.icon}</span>
                <span className="font-medium">{calc.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link 
            href="/calculators"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← View All Calculators
          </Link>
        </div>
      </div>
    </div>
  );
}

