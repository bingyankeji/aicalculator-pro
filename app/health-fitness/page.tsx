'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import Script from "next/script";

// Health & Fitness Calculators - 35+ tools
const healthCalculators = [
  // Weight & Body Composition (10个)
  { name: "BMI Calculator", url: "/bmi-calculator" },
  { name: "Body Fat Calculator", url: "/body-fat-calculator" },
  { name: "Ideal Weight Calculator", url: "/ideal-weight-calculator" },
  { name: "Lean Body Mass Calculator", url: "#" },
  { name: "Healthy Weight Calculator", url: "#" },
  { name: "Body Surface Area Calculator", url: "#" },
  { name: "Body Type Calculator", url: "#" },
  { name: "Anorexic BMI Calculator", url: "#" },
  { name: "Overweight Calculator", url: "#" },
  { name: "One Rep Max Calculator", url: "#" },
  
  // Calorie & Nutrition (8个)
  { name: "Calorie Calculator", url: "/calorie-calculator" },
  { name: "BMR Calculator", url: "/bmr-calculator" },
  { name: "TDEE Calculator", url: "/tdee-calculator" },
  { name: "Macro Calculator", url: "/macro-calculator" },
  { name: "Protein Calculator", url: "/protein-calculator" },
  { name: "Carbohydrate Calculator", url: "#" },
  { name: "Fat Intake Calculator", url: "#" },
  { name: "Calories Burned Calculator", url: "#" },
  
  // Fitness & Exercise (7个)
  { name: "Pace Calculator", url: "#" },
  { name: "Target Heart Rate Calculator", url: "#" },
  { name: "Army Body Fat Calculator", url: "#" },
  { name: "VO2 Max Calculator", url: "#" },
  { name: "Running Calculator", url: "#" },
  { name: "Swimming Calculator", url: "#" },
  { name: "Cycling Calculator", url: "#" },
  
  // Pregnancy & Baby (6个)
  { name: "Pregnancy Calculator", url: "#" },
  { name: "Due Date Calculator", url: "#" },
  { name: "Pregnancy Conception Calculator", url: "#" },
  { name: "Pregnancy Weight Gain Calculator", url: "#" },
  { name: "Ovulation Calculator", url: "#" },
  { name: "Period Calculator", url: "#" },
  
  // Other Health (4个)
  { name: "BAC Calculator", url: "#" },
  { name: "GFR Calculator", url: "#" },
  { name: "Weight Watcher Points Calculator", url: "#" },
  { name: "Conception Calculator", url: "#" },
];

export default function HealthFitnessPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const liveCalculators = healthCalculators.filter(calc => calc.url !== "#").length;
  const totalCalculators = healthCalculators.length;

  const filteredCalculators = useMemo(() => {
    if (!searchQuery.trim()) {
      return healthCalculators;
    }
    const query = searchQuery.toLowerCase().trim();
    return healthCalculators.filter(calc =>
      calc.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Health & Fitness Calculators",
    "description": "Free online health and fitness calculators for BMI, calories, body composition, and more. 35+ science-based health tools.",
    "url": "https://aicalculator.pro/health-fitness",
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
          "name": "Health & Fitness Calculators",
          "item": "https://aicalculator.pro/health-fitness"
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="structured-data-health"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <h1 className="sr-only">Health & Fitness Calculators - 35+ Free Online Health Tools</h1>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-green-600 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-semibold">Health & Fitness Calculators</li>
            </ol>
          </div>
        </nav>

        {/* Header & Search */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">💪 Health & Fitness Calculators</h2>
              <p className="text-gray-600 mb-4">
                {liveCalculators} / {totalCalculators} calculators available
              </p>
            </div>
            
            {/* Search Box */}
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search health calculators... (e.g., BMI, calorie, pregnancy)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900"
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
                      className="group block bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-green-300 transition-all"
                    >
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
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
                  className="mt-4 text-green-600 hover:text-green-800 font-semibold"
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Our Health & Fitness Calculators?</h2>
                <p className="text-gray-700 mb-6">
                  Our collection of 35+ health and fitness calculators uses scientifically validated formulas and WHO guidelines to help you track your health metrics, achieve fitness goals, and make informed decisions about your wellbeing.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">Popular Health Calculators</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>BMI Calculator</strong> - Calculate Body Mass Index with personalized health analysis</li>
                  <li><strong>Calorie Calculator</strong> - Determine daily calorie needs based on activity level</li>
                  <li><strong>Body Fat Calculator</strong> - Estimate body fat percentage using multiple methods</li>
                  <li><strong>Pregnancy Calculator</strong> - Calculate due date and track pregnancy milestones</li>
                  <li><strong>BMR Calculator</strong> - Find your Basal Metabolic Rate and energy needs</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-8">Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ <strong>Evidence-Based</strong> - Scientifically validated formulas and WHO standards</li>
                  <li>✅ <strong>Personalized Results</strong> - Recommendations based on your age, gender, and goals</li>
                  <li>✅ <strong>Track Progress</strong> - Save and compare results over time</li>
                  <li>✅ <strong>100% Private</strong> - Your health data never leaves your device</li>
                  <li>✅ <strong>Expert Insights</strong> - Smart analysis with actionable health tips</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
