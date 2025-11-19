import { Metadata } from "next";
import { PercentageCalculator } from "@/components/Calculator/PercentageCalculator";

export const metadata: Metadata = {
  title: "Percentage Calculator (Free, No signup) - Quick Math | AICalculator",
  description: "Free percentage calculator with no sign-up required. Calculate percentages instantly. Find what percent of X is Y, calculate X% of Y, or increase/decrease values by percentages. Includes formulas, examples, and instant results.",
  keywords: [
    "percentage calculator",
    "free percentage calculator",
    "percentage calculator no signup",
    "percent calculator",
    "calculate percentage",
    "percentage formula",
    "percent of",
    "what percent is",
    "percentage increase",
    "percentage decrease",
    "percentage change calculator",
    "percent difference",
    "online percentage calculator"
  ],
  openGraph: {
    title: "Percentage Calculator (Free, No signup) - AICalculator",
    description: "Free percentage calculator with no sign-up required. Calculate percentages with ease. Find what percent of X is Y, calculate X% of Y, or increase/decrease values.",
    type: "website",
    url: "https://aicalculator.pro/percentage-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Percentage Calculator (Free, No signup) - AICalculator",
    description: "Free percentage calculator with no sign-up required. Calculate percentages instantly. Find what percent, calculate X% of Y, or change values by percentages.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.pro/percentage-calculator",
  },
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
  other: {
    'last-modified': new Date().toISOString(),
  },
};

export default function PercentageCalculatorPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Percentage Calculator",
        "url": "https://aicalculator.pro/percentage-calculator",
        "description": "Free online percentage calculator with multiple calculation modes, formulas, and instant results.",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "What is X% of Y? - Calculate percentage values instantly",
          "X is what % of Y? - Find percentages of any number",
          "X is Y% of what? - Find the whole from a percentage",
          "Percentage Difference Calculator - Compare two values",
          "Increase/Decrease by percentage - Apply percentage changes",
          "Step-by-step formulas and explanations",
          "Real-time calculation as you type",
          "Clear data function for quick resets",
          "Share results via social media",
          "Export calculations as images",
          "Print-friendly calculation reports"
        ]
      },
      {
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
            "name": "Math & Numbers",
            "item": "https://aicalculator.pro/math-numbers"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Percentage Calculator",
            "item": "https://aicalculator.pro/percentage-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do you calculate percentage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate a percentage, divide the part by the whole and multiply by 100. For example, to find what percent 25 is of 100: (25 ÷ 100) × 100 = 25%. You can also calculate X% of Y by multiplying: (X ÷ 100) × Y."
            }
          },
          {
            "@type": "Question",
            "name": "What is 20% of 100?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "20% of 100 is 20. To calculate this, multiply 100 by 0.20 (which is 20% as a decimal), or use the formula: (20 ÷ 100) × 100 = 20."
            }
          },
          {
            "@type": "Question",
            "name": "How do you calculate percentage increase?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate percentage increase: 1) Find the difference between the new and original value, 2) Divide the difference by the original value, 3) Multiply by 100. Formula: ((New Value - Original Value) ÷ Original Value) × 100. For example, if a value increases from 50 to 75: ((75 - 50) ÷ 50) × 100 = 50% increase."
            }
          },
          {
            "@type": "Question",
            "name": "How do you calculate percentage decrease?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate percentage decrease, use the same formula as percentage increase but the result will be negative: ((New Value - Original Value) ÷ Original Value) × 100. For example, if a value decreases from 100 to 80: ((80 - 100) ÷ 100) × 100 = -20% (a 20% decrease)."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between percentage and percent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "There is no mathematical difference between 'percentage' and 'percent' - they mean the same thing. 'Percent' is typically used with numbers (e.g., '50 percent'), while 'percentage' is often used as a noun (e.g., 'What percentage is this?'). Both represent a fraction of 100."
            }
          },
          {
            "@type": "Question",
            "name": "How do you find what number a percentage represents?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To find what number a percentage represents (e.g., '25 is 25% of what?'), divide the part by the percentage (as a decimal). Formula: Part ÷ (Percent ÷ 100) = Whole. For example: 25 ÷ 0.25 = 100. So 25 is 25% of 100."
            }
          },
          {
            "@type": "Question",
            "name": "What is percentage difference and how do you calculate it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Percentage difference measures the relative change between two values. Formula: |Value1 - Value2| ÷ ((Value1 + Value2) ÷ 2) × 100. For example, the percentage difference between 100 and 120 is: |100-120| ÷ ((100+120)÷2) × 100 = 18.18%. This is useful for comparing prices, measurements, or statistics."
            }
          },
          {
            "@type": "Question",
            "name": "How do you calculate discount percentage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate discount percentage: ((Original Price - Sale Price) ÷ Original Price) × 100. For example, if an item costs $100 and is on sale for $75, the discount is ((100-75)÷100)×100 = 25% off. You can also calculate the final price by subtracting the discount percentage: $100 - (25% of $100) = $75."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Percentage Calculator",
        "description": "Step-by-step guide to calculate percentages using different modes",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select Calculation Mode",
            "text": "Choose one of three modes: 'What percent of Y is X?', 'What is X% of Y?', or 'Increase/Decrease X by Y%' based on your calculation needs."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Values",
            "text": "Input your numbers in the two value fields. The labels will change based on your selected mode to guide you."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Choose Operation (if applicable)",
            "text": "For percentage change mode, select whether you want to increase or decrease the value."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Calculate Result",
            "text": "Click the Calculate button to see your instant result with detailed explanation and formula."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Review and Share",
            "text": "See the formula used and examples. Share your calculation via social media or export as an image."
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* SEO: Hidden H1 */}
      <h1 className="sr-only">Percentage Calculator - Free Online Percentage Calculator with Formulas and Examples</h1>
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" 
              itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/math-numbers" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Math & Numbers</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">Percentage Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <PercentageCalculator />
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" 
               aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Percentage Calculations
            </h2>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Card 1: What is a Percentage */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🔢</span>
                  What is a Percentage?
                </h3>
                <p className="text-gray-700 mb-4">
                  A percentage is a way of expressing a number as a fraction of 100. The word "percent" comes from the Latin "per centum," meaning "by the hundred." Percentages are used in everyday life to express proportions, compare values, and calculate changes in quantities.
                </p>
                <p className="text-gray-700">
                  For example, 50% means 50 out of 100, or half. Percentages are essential in finance, statistics, science, and many other fields where we need to compare different quantities on a standardized scale.
                </p>
              </div>

              {/* Card 2: Basic Percentage Formulas */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📐</span>
                  Basic Percentage Formulas
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">Find the Percentage:</p>
                    <p className="text-gray-700 font-mono text-sm bg-gray-50 p-2 rounded mt-1">
                      (Part ÷ Whole) × 100 = Percentage
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Calculate Percent of Value:</p>
                    <p className="text-gray-700 font-mono text-sm bg-gray-50 p-2 rounded mt-1">
                      (Percent ÷ 100) × Value = Result
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Percentage Change:</p>
                    <p className="text-gray-700 font-mono text-sm bg-gray-50 p-2 rounded mt-1">
                      ((New - Old) ÷ Old) × 100 = % Change
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Percentage in Daily Life */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🛍️</span>
                  Percentages in Daily Life
                </h3>
                <p className="text-gray-700 mb-3">
                  Percentages are everywhere in our daily lives:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>Shopping:</strong> Sales discounts (30% off), sales tax (8.5%)</li>
                  <li>• <strong>Finance:</strong> Interest rates (4% APR), investment returns (12% annually)</li>
                  <li>• <strong>Health:</strong> Body fat percentage, daily nutrient values</li>
                  <li>• <strong>Education:</strong> Test scores (95%), grade percentages</li>
                  <li>• <strong>Statistics:</strong> Population growth, survey results</li>
                </ul>
              </div>

              {/* Card 4: Tips for Percentage Calculations */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>💡</span>
                  Quick Calculation Tips
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>10%:</strong> Move decimal point one place left (10% of 50 = 5)</li>
                  <li>• <strong>50%:</strong> Divide by 2 (50% of 80 = 40)</li>
                  <li>• <strong>25%:</strong> Divide by 4 (25% of 100 = 25)</li>
                  <li>• <strong>5%:</strong> Calculate 10% and divide by 2</li>
                  <li>• <strong>1%:</strong> Divide by 100 (1% of 200 = 2)</li>
                  <li>• <strong>Convert to decimal:</strong> Divide percent by 100 (75% = 0.75)</li>
                </ul>
              </div>
            </div>

            {/* Common Percentage Conversions Table */}
            <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Common Percentage Conversions
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="px-4 py-3 font-bold text-gray-900">Percentage</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Decimal</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Fraction</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Example (of 100)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 text-gray-700">10%</td>
                      <td className="px-4 py-3 text-gray-700">0.10</td>
                      <td className="px-4 py-3 text-gray-700">1/10</td>
                      <td className="px-4 py-3 text-gray-700">10</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">25%</td>
                      <td className="px-4 py-3 text-gray-700">0.25</td>
                      <td className="px-4 py-3 text-gray-700">1/4</td>
                      <td className="px-4 py-3 text-gray-700">25</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 text-gray-700">50%</td>
                      <td className="px-4 py-3 text-gray-700">0.50</td>
                      <td className="px-4 py-3 text-gray-700">1/2</td>
                      <td className="px-4 py-3 text-gray-700">50</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">75%</td>
                      <td className="px-4 py-3 text-gray-700">0.75</td>
                      <td className="px-4 py-3 text-gray-700">3/4</td>
                      <td className="px-4 py-3 text-gray-700">75</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 text-gray-700">100%</td>
                      <td className="px-4 py-3 text-gray-700">1.00</td>
                      <td className="px-4 py-3 text-gray-700">1/1</td>
                      <td className="px-4 py-3 text-gray-700">100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                {/* FAQ 1 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you calculate percentage?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate a percentage, divide the part by the whole and multiply by 100. For example, to find what percent 25 is of 100: (25 ÷ 100) × 100 = 25%. You can also calculate X% of Y by multiplying: (X ÷ 100) × Y.
                    </p>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is 20% of 100?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      20% of 100 is 20. To calculate this, multiply 100 by 0.20 (which is 20% as a decimal), or use the formula: (20 ÷ 100) × 100 = 20.
                    </p>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you calculate percentage increase?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate percentage increase: 1) Find the difference between the new and original value, 2) Divide the difference by the original value, 3) Multiply by 100. Formula: ((New Value - Original Value) ÷ Original Value) × 100. For example, if a value increases from 50 to 75: ((75 - 50) ÷ 50) × 100 = 50% increase.
                    </p>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you calculate percentage decrease?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate percentage decrease, use the same formula as percentage increase but the result will be negative: ((New Value - Original Value) ÷ Original Value) × 100. For example, if a value decreases from 100 to 80: ((80 - 100) ÷ 100) × 100 = -20% (a 20% decrease).
                    </p>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the difference between percentage and percent?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      There is no mathematical difference between 'percentage' and 'percent' - they mean the same thing. 'Percent' is typically used with numbers (e.g., '50 percent'), while 'percentage' is often used as a noun (e.g., 'What percentage is this?'). Both represent a fraction of 100.
                    </p>
                  </div>
                </div>

                {/* FAQ 6 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you find what number a percentage represents?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To find what number a percentage represents (e.g., '25 is 25% of what?'), divide the part by the percentage (as a decimal). Formula: Part ÷ (Percent ÷ 100) = Whole. For example: 25 ÷ 0.25 = 100. So 25 is 25% of 100.
                    </p>
                  </div>
                </div>

                {/* FAQ 7 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is percentage difference and how do you calculate it?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Percentage difference measures the relative change between two values. Formula: |Value1 - Value2| ÷ ((Value1 + Value2) ÷ 2) × 100. For example, the percentage difference between 100 and 120 is: |100-120| ÷ ((100+120)÷2) × 100 = 18.18%. This is useful for comparing prices, measurements, or statistics.
                    </p>
                  </div>
                </div>

                {/* FAQ 8 */}
                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you calculate discount percentage?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate discount percentage: ((Original Price - Sale Price) ÷ Original Price) × 100. For example, if an item costs $100 and is on sale for $75, the discount is ((100-75)÷100)×100 = 25% off. You can also calculate the final price by subtracting the discount percentage: $100 - (25% of $100) = $75.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Links */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/mortgage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Mortgage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate home loan payments with percentages</p>
                </a>
                <a href="/loan-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate loan interest and payment percentages</p>
                </a>
                <a href="/bmi-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">BMI Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate body mass index percentiles</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

