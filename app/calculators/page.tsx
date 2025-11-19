'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import { CalculatorPageSearch } from "@/components/CalculatorPageSearch";
import { allCalculators } from "@/lib/calculatorData";
import type { Calculator } from "@/lib/calculatorData";
import { getCategoryStats } from "@/lib/categoryStats";

export default function CalculatorsPage() {
  const [searchResults, setSearchResults] = useState<Calculator[]>(allCalculators);
  
  const totalCalculators = allCalculators.length;
  const stats = getCategoryStats();

  // Convert allCalculators to the format needed for search
  const allCalcsWithKeywords = useMemo(() => {
    return allCalculators.map(calc => ({
      name: calc.name,
      url: calc.url,
      keywords: calc.keywords,
      category: calc.category,
      icon: calc.icon
    }));
  }, []);

  // Create dynamic categories from search results
  const filteredCategories = useMemo(() => {
    const categoryMap: Record<string, {id: string, name: string, icon: string, description: string, calculators: Calculator[]}> = {
      'Financial': { id: 'financial', name: 'Financial Calculators', icon: '💰', description: `${stats.Financial}+ free financial planning tools`, calculators: [] },
      'Health': { id: 'health', name: 'Health & Fitness Calculators', icon: '🏥', description: `${stats.Health}+ free health and wellness tools`, calculators: [] },
      'Math': { id: 'math', name: 'Math Calculators', icon: '📐', description: `${stats.Math}+ free math and statistics tools`, calculators: [] },
      'Other': { id: 'other', name: 'Other Calculators', icon: '🔧', description: `${stats.Other}+ free utility and conversion tools`, calculators: [] },
    };

    // Group filtered calculators by category
    searchResults.forEach(calc => {
      if (categoryMap[calc.category]) {
        categoryMap[calc.category].calculators.push(calc);
      }
    });

    // Return only categories with calculators
    return Object.values(categoryMap).filter(cat => cat.calculators.length > 0);
  }, [searchResults, stats]);

  const filteredTotalCount = searchResults.length;

  // Handle search results - convert to Calculator type
  const handleSearchResults = (results: Array<{name: string; url: string; keywords?: string[]; category?: string; icon?: string}>) => {
    const converted: Calculator[] = results.map(r => {
      const existing = allCalculators.find(ac => ac.url === r.url);
      return existing || {
        name: r.name,
        url: r.url,
        keywords: r.keywords || [],
        category: r.category || 'Other',
        icon: r.icon || '📊'
      };
    });
    setSearchResults(converted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* SEO: Hidden H1 */}
      <h1 className="sr-only">
        All Calculators - {totalCalculators}+ Free Online Calculator Tools with AI Analysis
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
            <li className="text-gray-900 font-semibold">All Calculators</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            All Calculator Tools
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse our complete collection of <strong>{totalCalculators}+ free online calculators</strong> with AI-powered analysis. 
            New calculators being added weekly.
          </p>
        </header>

        {/* Smart Search Box */}
        <div className="mb-8 max-w-2xl mx-auto">
          <CalculatorPageSearch
            calculators={allCalcsWithKeywords}
            onSearchResults={handleSearchResults}
            placeholder="🔍 Smart Search... Try: mortgage, BMI, percentage, retirement"
            enableDirectNavigation={true}
          />
        </div>

        {/* Quick Jump Navigation - Hide when searching */}
        {searchResults.length === allCalcsWithKeywords.length && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Jump to Category:</h3>
            <div className="flex flex-wrap gap-3">
              {filteredCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                >
                  {category.icon} {category.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Calculator Categories */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-3xl">{category.icon}</span>
                  {category.name}
                </h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.calculators.map((calc) => (
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
            </section>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>
            Showing {filteredTotalCount} of {totalCalculators} free calculators
          </p>
        </div>
      </div>
    </div>
  );
}
