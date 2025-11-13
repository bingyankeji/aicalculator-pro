'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import { CalculatorPageSearch } from "@/components/CalculatorPageSearch";
import { allCalculators } from "@/lib/calculatorData";
import type { Calculator } from "@/lib/calculatorData";

// Calculator data organized by category (250+ calculators)
const calculatorCategories = [
  {
    id: "financial",
    name: "Financial Calculators",
    icon: "💰",
    description: "80+ financial planning tools",
    calculators: [
      // Mortgage & Loans (15个)
      { name: "Mortgage Calculator", url: "/mortgage-calculator" },
      { name: "Home Loan Calculator", url: "/home-loan-calculator" },
      { name: "Loan Calculator", url: "/loan-calculator" },
      { name: "EMI Calculator", url: "/emi-calculator" },
      { name: "Mortgage Payoff Calculator", url: "/mortgage-payoff-calculator" },
      { name: "Payment Calculator", url: "/payment-calculator" },
        { name: "Auto Loan Calculator", url: "/auto-loan-calculator" },
      { name: "Student Loan Calculator", url: "#" },
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
      
      // Investment & Savings (12个)
      { name: "Investment Calculator", url: "/investment-calculator" },
      { name: "Interest Calculator", url: "/interest-calculator" },
      { name: "Compound Interest Calculator", url: "/compound-interest-calculator" },
      { name: "Future Value Calculator", url: "/future-value-calculator" },
      { name: "Retirement Calculator", url: "/retirement-calculator" },
      { name: "401k Calculator", url: "/401k-calculator" },
      { name: "Roth IRA Calculator", url: "#" },
      { name: "IRA Calculator", url: "#" },
      { name: "Annuity Calculator", url: "#" },
      { name: "Savings Calculator", url: "/savings-calculator" },
      { name: "ROI Calculator", url: "/roi-calculator" },
      { name: "APR Calculator", url: "#" },
      { name: "Inflation Calculator", url: "/inflation-calculator" },
      
      // Salary & Tax (15个)
      { name: "Salary Calculator", url: "/salary-calculator" },
      { name: "Income Tax Calculator", url: "/tax-calculator" },
      { name: "Paycheck Calculator", url: "/pay-calculator" },
      { name: "Take-Home-Paycheck Calculator", url: "#" },
      { name: "Federal Tax Calculator", url: "/tax-calculator" },
      { name: "Property Tax Calculator", url: "#" },
      { name: "Capital Gains Tax Calculator", url: "#" },
      { name: "Social Security Calculator", url: "#" },
      { name: "Estate Tax Calculator", url: "#" },
      { name: "VAT Calculator", url: "#" },
      { name: "Pension Calculator", url: "#" },
      { name: "Commission Calculator", url: "#" },
      { name: "Hourly to Salary Calculator", url: "#" },
      
      // Credit Card & Debt (10个)
      { name: "Credit Card Calculator", url: "/credit-card-calculator" },
      { name: "Credit Card Payoff Calculator", url: "#" },
      { name: "Debt Payoff Calculator", url: "/debt-payoff-calculator" },
      { name: "Debt-to-Income Ratio Calculator", url: "#" },
      { name: "Minimum Payment Calculator", url: "#" },
      { name: "Balance Transfer Calculator", url: "#" },
      { name: "APR vs APY Calculator", url: "#" },
      { name: "Late Fee Calculator", url: "#" },
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
      { name: "Present Value Calculator", url: "/present-value-calculator" },
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
      { name: "Split Bill Calculator", url: "#" },
      { name: "Unit Price Calculator", url: "#" },
    ]
  },
  {
    id: "health",
    name: "Health & Fitness Calculators",
    icon: "🏥",
    description: "35+ health and wellness tools",
    calculators: [
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
      { name: "Pace Calculator", url: "/pace-calculator" },
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
    ]
  },
  {
    id: "math",
    name: "Math Calculators",
    icon: "📐",
    description: "50+ math and statistics tools",
    calculators: [
      // Basic Math (15个)
      { name: "Percentage Calculator", url: "/percentage-calculator" },
      { name: "Scientific Calculator", url: "/scientific-calculator" },
      { name: "Basic Calculator", url: "#" },
      { name: "Fraction Calculator", url: "/fraction-calculator" },
      { name: "Ratio Calculator", url: "#" },
      { name: "Average Calculator", url: "/average-calculator" },
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
      
      // Other Math (5个)
      { name: "Matrix Calculator", url: "#" },
      { name: "Vector Calculator", url: "#" },
      { name: "Permutation Calculator", url: "#" },
      { name: "Combination Calculator", url: "#" },
      { name: "Sequence Calculator", url: "#" },
    ]
  },
  {
    id: "other",
    name: "Other Calculators",
    icon: "🔧",
    description: "60+ utility and conversion tools",
    calculators: [
      // Date & Time (10个)
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
      
      // Unit Conversion (15个)
      { name: "Unit Converter", url: "/unit-converter" },
      { name: "Length Converter", url: "/unit-converter" },
      { name: "Weight Converter", url: "/unit-converter" },
      { name: "Temperature Converter", url: "/unit-converter" },
      { name: "Volume Converter", url: "/unit-converter" },
      { name: "Area Converter", url: "/unit-converter" },
      { name: "Speed Converter", url: "/unit-converter" },
      { name: "Pressure Converter", url: "#" },
      { name: "Energy Converter", url: "#" },
      { name: "Power Converter", url: "#" },
      { name: "Time Converter", url: "/unit-converter" },
      { name: "Data Storage Converter", url: "#" },
      { name: "Fuel Efficiency Converter", url: "#" },
      { name: "Shoe Size Converter", url: "#" },
      { name: "Bra Size Calculator", url: "#" },
      
      // Home & Living (12个)
      { name: "Square Footage Calculator", url: "/square-footage-calculator" },
      { name: "Tile Calculator", url: "#" },
      { name: "Concrete Calculator", url: "#" },
      { name: "Gravel Calculator", url: "#" },
      { name: "Mulch Calculator", url: "#" },
      { name: "Paint Calculator", url: "#" },
      { name: "Roofing Calculator", url: "#" },
      { name: "Stair Calculator", url: "#" },
      { name: "Fence Calculator", url: "#" },
      { name: "Flooring Calculator", url: "#" },
      { name: "Wallpaper Calculator", url: "#" },
      { name: "Carpet Calculator", url: "#" },
      
      // Auto & Transportation (8个)
      { name: "Gas Mileage Calculator", url: "#" },
      { name: "Fuel Cost Calculator", url: "#" },
      { name: "Car Loan Calculator", url: "#" },
      { name: "Lease vs Buy Calculator", url: "#" },
      { name: "Tire Size Calculator", url: "#" },
      { name: "Horsepower Calculator", url: "#" },
      { name: "Engine Calculator", url: "#" },
      { name: "Mileage Calculator", url: "#" },
      
      // Academic (5个)
      { name: "GPA Calculator", url: "/gpa-calculator" },
      { name: "Grade Calculator", url: "/grade-calculator" },
      { name: "Final Grade Calculator", url: "#" },
      { name: "Test Score Calculator", url: "#" },
      { name: "Weighted Average Calculator", url: "#" },
      
      // Fun & Misc (10个)
      { name: "Tip Calculator", url: "/tip-calculator" },
      { name: "Love Calculator", url: "#" },
      { name: "Life Expectancy Calculator", url: "#" },
      { name: "Carbon Footprint Calculator", url: "#" },
      { name: "Dog Age Calculator", url: "#" },
      { name: "Cat Age Calculator", url: "#" },
      { name: "Retirement Age Calculator", url: "#" },
      { name: "Zodiac Sign Calculator", url: "#" },
      { name: "Chinese Zodiac Calculator", url: "#" },
      { name: "Bio-rhythm Calculator", url: "#" },
    ]
  },
  {
    id: "professional",
    name: "Professional Tools",
    icon: "🔬",
    description: "25+ specialized tools",
    calculators: [
      // IT & Development (8个)
      { name: "IP Subnet Calculator", url: "#" },
      { name: "Password Generator", url: "#" },
      { name: "Hash Calculator", url: "#" },
      { name: "Base64 Encoder", url: "#" },
      { name: "URL Encoder", url: "#" },
      { name: "JSON Formatter", url: "#" },
      { name: "Regex Tester", url: "#" },
      { name: "Color Picker", url: "#" },
      
      // Science & Lab (6个)
      { name: "Molarity Calculator", url: "#" },
      { name: "Molecular Weight Calculator", url: "#" },
      { name: "pH Calculator", url: "#" },
      { name: "Dilution Calculator", url: "#" },
      { name: "Half-Life Calculator", url: "#" },
      { name: "Density Calculator", url: "#" },
      
      // Electrical & Engineering (10个)
      { name: "Ohms Law Calculator", url: "#" },
      { name: "Voltage Drop Calculator", url: "#" },
      { name: "Resistor Calculator", url: "#" },
      { name: "Electricity Calculator", url: "#" },
      { name: "BTU Calculator", url: "#" },
      { name: "Engine Horsepower Calculator", url: "#" },
      { name: "Bandwidth Calculator", url: "#" },
      { name: "Heat Index Calculator", url: "#" },
      { name: "Dew Point Calculator", url: "#" },
      { name: "Shipping Calculator", url: "#" },
    ]
  }
];

export default function CalculatorsPage() {
  const [searchResults, setSearchResults] = useState<Calculator[]>(allCalculators);
  
  const totalCalculators = calculatorCategories.reduce((sum, cat) => sum + cat.calculators.length, 0);
  const liveCalculators = calculatorCategories.reduce((sum, cat) => 
    sum + cat.calculators.filter(calc => calc.url !== "#").length, 0
  );

  // Convert smart search results to calculator data with keywords
  const allCalcsWithKeywords = useMemo(() => {
    return calculatorCategories.flatMap(cat => 
      cat.calculators.map(calc => {
        const calcData = allCalculators.find(ac => ac.url === calc.url);
        return {
          name: calc.name,
          url: calc.url,
          keywords: calcData?.keywords || [],
          category: calcData?.category || cat.name,
          icon: calcData?.icon || cat.icon
        };
      })
    );
  }, []);

  // Filter categories based on search results
  const filteredCategories = useMemo(() => {
    const resultUrls = new Set(searchResults.map(r => r.url));
    
    return calculatorCategories.map(category => {
      const filteredCalculators = category.calculators.filter(calc =>
        resultUrls.has(calc.url)
      );
      
      return {
        ...category,
        calculators: filteredCalculators
      };
    }).filter(category => category.calculators.length > 0);
  }, [searchResults]);

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
        All Calculators - 250+ Free Online Calculator Tools with AI Analysis
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
            Browse our complete collection of {totalCalculators}+ free online calculators with AI-powered analysis. 
            New calculators being added weekly.
          </p>
        </header>

        {/* Smart Search Box */}
        <div className="mb-8 max-w-2xl mx-auto">
          <CalculatorPageSearch
            calculators={allCalcsWithKeywords}
            onSearchResults={handleSearchResults}
            placeholder="🔍 Smart Search... Try: mortgage, BMI, percentage, retirement"
          />
        </div>

        {/* Quick Jump Navigation - Hide when searching */}
        {searchResults.length === allCalcsWithKeywords.length && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Jump to Category:</h3>
            <div className="flex flex-wrap gap-3">
              {calculatorCategories.map((category) => (
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
                    key={calc.name}
                    href={calc.url}
                    className={`block p-4 rounded-lg border transition-all duration-200 ${
                      calc.url === '#' 
                        ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md text-gray-900 hover:text-blue-600'
                    }`}
                  >
                    <div className="font-medium">{calc.name}</div>
                    {calc.url === '#' && (
                      <div className="text-xs text-gray-400 mt-1">Coming Soon</div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>
            Showing {filteredTotalCount} of {totalCalculators} calculators ({liveCalculators} live)
          </p>
        </div>
      </div>
    </div>
  );
}