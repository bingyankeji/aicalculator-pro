import { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { FractionCalculator } from "@/components/Calculator/FractionCalculator";

export const metadata: Metadata = {
  title: "Fraction Calculator (Free, No signup) - Math Tool | AICalculator",
  description: "Free fraction calculator with no sign-up required. Add, subtract, multiply, and divide fractions. Automatic simplification, mixed number conversion, and step-by-step solutions. Perfect for students and professionals.",
  keywords: [
    "fraction calculator",
    "free fraction calculator",
    "fraction calculator no signup",
    "add fractions",
    "subtract fractions",
    "multiply fractions",
    "divide fractions",
    "simplify fractions",
    "fraction to decimal",
    "mixed number calculator",
    "improper fraction calculator",
    "fraction math",
    "fraction solver",
    "fraction simplifier",
    "common denominator calculator",
    "fraction operations",
    "math fraction calculator",
  ],
  openGraph: {
    title: "Fraction Calculator (Free, No signup) - AICalculator",
    description: "Free fraction calculator with no sign-up required. Calculate fractions with automatic simplification and step-by-step solutions. Convert to decimals and mixed numbers instantly.",
    type: "website",
    url: "https://aicalculator.pro/fraction-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fraction Calculator (Free, No signup) - AICalculator",
    description: "Free fraction calculator with no sign-up required. Step-by-step solutions, simplification, and decimal conversion.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.pro/fraction-calculator",
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

export default function FractionCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Fraction Calculator",
        "url": "https://aicalculator.pro/fraction-calculator",
        "description": "Free online fraction calculator to add, subtract, multiply, and divide fractions. Features automatic simplification, mixed number conversion, decimal conversion, and step-by-step solutions for all fraction operations.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Add fractions with different denominators",
          "Subtract fractions",
          "Multiply fractions",
          "Divide fractions",
          "Automatic fraction simplification",
          "Convert to mixed numbers",
          "Convert fractions to decimals",
          "Step-by-step solutions",
          "Free forever, no registration required"
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
            "name": "Calculators",
            "item": "https://aicalculator.pro/calculators"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Fraction Calculator",
            "item": "https://aicalculator.pro/fraction-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do you add fractions with different denominators?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To add fractions with different denominators: 1) Find a common denominator (usually the least common multiple of both denominators), 2) Convert each fraction to an equivalent fraction with the common denominator, 3) Add the numerators while keeping the denominator the same, 4) Simplify if possible. Example: 1/2 + 1/3 → Find common denominator (6) → 3/6 + 2/6 = 5/6. Our calculator does all steps automatically."
            }
          },
          {
            "@type": "Question",
            "name": "How do you multiply fractions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To multiply fractions: 1) Multiply the numerators together, 2) Multiply the denominators together, 3) Simplify the result. Formula: a/b × c/d = (a × c)/(b × d). Example: 2/3 × 3/4 = (2 × 3)/(3 × 4) = 6/12 = 1/2 (simplified). You can simplify before multiplying by cross-canceling common factors to make calculation easier."
            }
          },
          {
            "@type": "Question",
            "name": "How do you divide fractions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To divide fractions, multiply by the reciprocal (flip) of the second fraction. Formula: a/b ÷ c/d = a/b × d/c = (a × d)/(b × c). Example: 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2. Remember the saying 'Keep, Change, Flip' - Keep the first fraction, Change division to multiplication, Flip the second fraction. Then multiply as normal."
            }
          },
          {
            "@type": "Question",
            "name": "How do you simplify fractions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To simplify a fraction, divide both the numerator and denominator by their Greatest Common Divisor (GCD). Example: 12/18 → GCD(12, 18) = 6 → 12÷6 / 18÷6 = 2/3. To find the GCD, list factors of both numbers or use the Euclidean algorithm. A fraction is fully simplified when the GCD of numerator and denominator is 1 (they share no common factors except 1). Our calculator automatically simplifies all results."
            }
          },
          {
            "@type": "Question",
            "name": "What is a mixed number?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A mixed number combines a whole number and a proper fraction, written like 2 1/2 (two and one-half). It represents an improper fraction (where numerator > denominator) in a more readable form. To convert improper fraction to mixed number: divide numerator by denominator → whole number is the quotient, remainder becomes the new numerator, denominator stays the same. Example: 7/3 = 2 1/3 (7÷3 = 2 remainder 1). To convert mixed to improper: multiply whole number by denominator, add numerator → 2 1/3 = (2×3 + 1)/3 = 7/3."
            }
          },
          {
            "@type": "Question",
            "name": "How do you convert fractions to decimals?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To convert a fraction to decimal, divide the numerator by the denominator. Example: 3/4 = 3 ÷ 4 = 0.75. Some fractions convert to terminating decimals (end after finite digits) like 1/2 = 0.5. Others become repeating decimals like 1/3 = 0.333... (indicated as 0.3̄). Common conversions to memorize: 1/2 = 0.5, 1/4 = 0.25, 1/3 ≈ 0.333, 1/5 = 0.2, 1/8 = 0.125. Our calculator shows the decimal equivalent automatically."
            }
          },
          {
            "@type": "Question",
            "name": "What is the least common denominator (LCD)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Least Common Denominator (LCD) is the smallest number that is a multiple of all denominators in a set of fractions. It's used when adding or subtracting fractions with different denominators. The LCD is the Least Common Multiple (LCM) of the denominators. Example: For 1/4 and 1/6, multiples of 4 are (4, 8, 12, 16...) and multiples of 6 are (6, 12, 18...). The LCD is 12. While any common multiple works, using the LCD keeps numbers smaller and simplifies calculations."
            }
          },
          {
            "@type": "Question",
            "name": "Can fractions be negative?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, fractions can be negative. The negative sign can be placed in three positions: -1/2, 1/-2, or -(1/2) - all represent the same value. By convention, we typically write the negative sign in front of the entire fraction or in the numerator, not the denominator. Example: -3/4 (standard) rather than 3/-4. When multiplying or dividing fractions, follow sign rules: negative × positive = negative, negative × negative = positive. Example: -1/2 × 2/3 = -2/6 = -1/3, but -1/2 × -2/3 = 2/6 = 1/3."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Fraction Calculator",
        "description": "Step-by-step guide to calculating fractions with automatic simplification",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select Operation",
            "text": "Choose whether you want to add (+), subtract (-), multiply (×), or divide (÷) fractions. Each operation has specific rules for combining fractions."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Fractions",
            "text": "Input the numerator (top number) and denominator (bottom number) for both fractions. You can use positive or negative numbers, and the calculator handles improper fractions automatically."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "View Results",
            "text": "See the original answer, simplified fraction, mixed number (if applicable), decimal equivalent, and step-by-step solution showing how the answer was calculated. Use the examples to practice common fraction operations."
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <h1 className="sr-only">Fraction Calculator - Free Math Tool to Add, Subtract, Multiply and Divide Fractions with Automatic Simplification</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Fraction Calculator (Free, No signup)"
        calculatorUrl="/fraction-calculator"
      />

      <section className="py-8 md:py-12" aria-label="Fraction Calculator Tool">
        <div className="container mx-auto px-4">
          <FractionCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Fraction Calculator Guide">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Complete Guide to Fraction Operations
            </h2>

            {/* Fraction Basics */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📐 What is a Fraction?</h3>
                <p className="text-gray-700 mb-3">
                  A fraction represents a part of a whole, expressed as one number (numerator) divided by another (denominator):
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-blue-700">3</div>
                      <div className="w-12 h-0.5 bg-blue-700 my-1"></div>
                      <div className="text-2xl font-bold text-blue-700">4</div>
                    </div>
                    <div className="text-gray-600">
                      <div className="text-sm">← Numerator (parts we have)</div>
                      <div className="text-sm mt-4">← Denominator (total parts)</div>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>Proper fraction:</strong> Numerator &lt; Denominator (1/2, 3/4)</li>
                  <li><strong>Improper fraction:</strong> Numerator ≥ Denominator (5/4, 7/3)</li>
                  <li><strong>Mixed number:</strong> Whole + Fraction (1 1/2, 2 1/3)</li>
                  <li><strong>Equivalent fractions:</strong> Same value (1/2 = 2/4 = 3/6)</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔢 Fraction Terminology</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-blue-500 pl-3">
                    <strong>Numerator:</strong> The top number, represents how many parts you have.
                  </div>
                  <div className="border-l-4 border-green-500 pl-3">
                    <strong>Denominator:</strong> The bottom number, represents total equal parts.
                  </div>
                  <div className="border-l-4 border-purple-500 pl-3">
                    <strong>GCD (Greatest Common Divisor):</strong> Largest number that divides both numerator and denominator evenly. Used for simplifying.
                  </div>
                  <div className="border-l-4 border-orange-500 pl-3">
                    <strong>LCM (Least Common Multiple):</strong> Smallest number that both denominators divide into evenly. Used for adding/subtracting.
                  </div>
                  <div className="border-l-4 border-red-500 pl-3">
                    <strong>Reciprocal:</strong> Fraction flipped upside down. Used for division (1/2 reciprocal is 2/1).
                  </div>
                </div>
              </div>
            </div>

            {/* Operation Rules */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Fraction Operation Rules</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Addition */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-blue-900 mb-2">➕ Addition</h4>
                  <div className="bg-gray-50 p-3 rounded mb-2 text-sm font-mono">
                    a/b + c/d = (a×d + b×c) / (b×d)
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Steps:</strong> 1) Find common denominator, 2) Convert both fractions, 3) Add numerators, 4) Keep denominator, 5) Simplify
                  </p>
                  <div className="bg-blue-50 p-2 rounded text-xs">
                    <strong>Example:</strong> 1/4 + 1/6 = 3/12 + 2/12 = 5/12
                  </div>
                </div>

                {/* Subtraction */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-bold text-green-900 mb-2">➖ Subtraction</h4>
                  <div className="bg-gray-50 p-3 rounded mb-2 text-sm font-mono">
                    a/b - c/d = (a×d - b×c) / (b×d)
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Steps:</strong> 1) Find common denominator, 2) Convert both fractions, 3) Subtract numerators, 4) Keep denominator, 5) Simplify
                  </p>
                  <div className="bg-green-50 p-2 rounded text-xs">
                    <strong>Example:</strong> 3/4 - 1/2 = 3/4 - 2/4 = 1/4
                  </div>
                </div>

                {/* Multiplication */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-bold text-purple-900 mb-2">✖️ Multiplication</h4>
                  <div className="bg-gray-50 p-3 rounded mb-2 text-sm font-mono">
                    a/b × c/d = (a×c) / (b×d)
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Steps:</strong> 1) Multiply numerators, 2) Multiply denominators, 3) Simplify. Tip: Cross-cancel common factors first to simplify calculation.
                  </p>
                  <div className="bg-purple-50 p-2 rounded text-xs">
                    <strong>Example:</strong> 2/3 × 3/4 = 6/12 = 1/2
                  </div>
                </div>

                {/* Division */}
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-bold text-orange-900 mb-2">➗ Division</h4>
                  <div className="bg-gray-50 p-3 rounded mb-2 text-sm font-mono">
                    a/b ÷ c/d = a/b × d/c = (a×d) / (b×c)
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Steps:</strong> 1) Keep first fraction, 2) Change ÷ to ×, 3) Flip second fraction (reciprocal), 4) Multiply, 5) Simplify
                  </p>
                  <div className="bg-orange-50 p-2 rounded text-xs">
                    <strong>Example:</strong> 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2
                  </div>
                </div>
              </div>
            </div>

            {/* Common Fraction Reference */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Fractions Reference</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">Fraction</th>
                      <th className="px-4 py-3 text-left">Decimal</th>
                      <th className="px-4 py-3 text-left">Percent</th>
                      <th className="px-4 py-3 text-left">Common Use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-semibold">1/2</td>
                      <td className="px-4 py-3">0.5</td>
                      <td className="px-4 py-3">50%</td>
                      <td className="px-4 py-3">Half, recipes, measurements</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">1/3</td>
                      <td className="px-4 py-3">0.333...</td>
                      <td className="px-4 py-3">33.3%</td>
                      <td className="px-4 py-3">One-third, splitting 3 ways</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">1/4</td>
                      <td className="px-4 py-3">0.25</td>
                      <td className="px-4 py-3">25%</td>
                      <td className="px-4 py-3">Quarter, 15 minutes, coins</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">1/5</td>
                      <td className="px-4 py-3">0.2</td>
                      <td className="px-4 py-3">20%</td>
                      <td className="px-4 py-3">Fifth, discounts, tips</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">1/8</td>
                      <td className="px-4 py-3">0.125</td>
                      <td className="px-4 py-3">12.5%</td>
                      <td className="px-4 py-3">Eighth, measurements, music</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">3/4</td>
                      <td className="px-4 py-3">0.75</td>
                      <td className="px-4 py-3">75%</td>
                      <td className="px-4 py-3">Three-quarters, 45 minutes</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">2/3</td>
                      <td className="px-4 py-3">0.666...</td>
                      <td className="px-4 py-3">66.7%</td>
                      <td className="px-4 py-3">Two-thirds, majority</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tips and Tricks */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✅ Fraction Tips & Tricks</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Cross-multiply to compare:</strong> For a/b vs c/d, compare a×d vs b×c</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Simplify before multiplying:</strong> Cancel common factors first to avoid large numbers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Use benchmarks:</strong> Compare to 0, 1/2, or 1 to estimate reasonableness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Remember "Keep, Change, Flip":</strong> For division, keep first, change to ×, flip second</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Convert mixed to improper:</strong> Multiply whole by denominator, add numerator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Find LCD efficiently:</strong> For small numbers, list multiples; for large, use prime factorization</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Common Fraction Mistakes</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Adding denominators:</strong> Never add denominators directly - find common denominator first</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Forgetting to simplify:</strong> Always reduce to lowest terms for final answer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Division confusion:</strong> Don't flip the first fraction, only flip the second (divisor)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Mixed number operations:</strong> Convert to improper fractions first before calculating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Zero denominator:</strong> Never use 0 as denominator - division by zero is undefined</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Sign errors:</strong> Track negative signs carefully - one negative makes result negative</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Real-World Applications */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🌍 Real-World Fraction Applications</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">🍳 Cooking & Recipes</h4>
                  <p className="text-sm text-gray-700">
                    Scaling recipes up or down, converting measurements (1/2 cup + 1/4 cup = 3/4 cup), adjusting ingredient ratios for different serving sizes.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">🔨 Construction & Carpentry</h4>
                  <p className="text-sm text-gray-700">
                    Measuring lumber (2×4 boards), calculating material needs, reading tape measures (7 1/8 inches), determining spacing between studs or joists.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">⏰ Time Management</h4>
                  <p className="text-sm text-gray-700">
                    Understanding time (1/4 hour = 15 minutes), calculating work hours (7 1/2 hours), dividing time blocks, planning schedules and deadlines.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">💰 Finance & Shopping</h4>
                  <p className="text-sm text-gray-700">
                    Calculating discounts (1/3 off sale), splitting bills among friends, understanding stock shares, comparing product sizes and unit prices.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">🎵 Music Theory</h4>
                  <p className="text-sm text-gray-700">
                    Note durations (whole, half, quarter, eighth notes), time signatures (3/4, 4/4), understanding rhythm patterns and beat divisions in compositions.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">📊 Data & Statistics</h4>
                  <p className="text-sm text-gray-700">
                    Expressing probabilities (1/6 chance), understanding proportions in surveys, representing population segments, calculating risk ratios.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you add fractions with different denominators?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To add fractions with different denominators: 1) Find a common denominator (usually the least common multiple of both denominators), 2) Convert each fraction to an equivalent fraction with the common denominator, 3) Add the numerators while keeping the denominator the same, 4) Simplify if possible. Example: 1/2 + 1/3 → Find common denominator (6) → 3/6 + 2/6 = 5/6. Our calculator does all steps automatically.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you multiply fractions?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To multiply fractions: 1) Multiply the numerators together, 2) Multiply the denominators together, 3) Simplify the result. Formula: a/b × c/d = (a × c)/(b × d). Example: 2/3 × 3/4 = (2 × 3)/(3 × 4) = 6/12 = 1/2 (simplified). You can simplify before multiplying by cross-canceling common factors to make calculation easier.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you divide fractions?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To divide fractions, multiply by the reciprocal (flip) of the second fraction. Formula: a/b ÷ c/d = a/b × d/c = (a × d)/(b × c). Example: 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2. Remember the saying 'Keep, Change, Flip' - Keep the first fraction, Change division to multiplication, Flip the second fraction. Then multiply as normal.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you simplify fractions?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To simplify a fraction, divide both the numerator and denominator by their Greatest Common Divisor (GCD). Example: 12/18 → GCD(12, 18) = 6 → 12÷6 / 18÷6 = 2/3. To find the GCD, list factors of both numbers or use the Euclidean algorithm. A fraction is fully simplified when the GCD of numerator and denominator is 1 (they share no common factors except 1). Our calculator automatically simplifies all results.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is a mixed number?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      A mixed number combines a whole number and a proper fraction, written like 2 1/2 (two and one-half). It represents an improper fraction (where numerator &gt; denominator) in a more readable form. To convert improper fraction to mixed number: divide numerator by denominator → whole number is the quotient, remainder becomes the new numerator, denominator stays the same. Example: 7/3 = 2 1/3 (7÷3 = 2 remainder 1). To convert mixed to improper: multiply whole number by denominator, add numerator → 2 1/3 = (2×3 + 1)/3 = 7/3.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you convert fractions to decimals?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To convert a fraction to decimal, divide the numerator by the denominator. Example: 3/4 = 3 ÷ 4 = 0.75. Some fractions convert to terminating decimals (end after finite digits) like 1/2 = 0.5. Others become repeating decimals like 1/3 = 0.333... (indicated as 0.3̄). Common conversions to memorize: 1/2 = 0.5, 1/4 = 0.25, 1/3 ≈ 0.333, 1/5 = 0.2, 1/8 = 0.125. Our calculator shows the decimal equivalent automatically.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the least common denominator (LCD)?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The Least Common Denominator (LCD) is the smallest number that is a multiple of all denominators in a set of fractions. It's used when adding or subtracting fractions with different denominators. The LCD is the Least Common Multiple (LCM) of the denominators. Example: For 1/4 and 1/6, multiples of 4 are (4, 8, 12, 16...) and multiples of 6 are (6, 12, 18...). The LCD is 12. While any common multiple works, using the LCD keeps numbers smaller and simplifies calculations.
                    </p>
                  </div>
                </div>

                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can fractions be negative?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes, fractions can be negative. The negative sign can be placed in three positions: -1/2, 1/-2, or -(1/2) - all represent the same value. By convention, we typically write the negative sign in front of the entire fraction or in the numerator, not the denominator. Example: -3/4 (standard) rather than 3/-4. When multiplying or dividing fractions, follow sign rules: negative × positive = negative, negative × negative = positive. Example: -1/2 × 2/3 = -2/6 = -1/3, but -1/2 × -2/3 = 2/6 = 1/3.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Math Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate percentages and fractions</p>
                </a>
                <a href="/average-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Average Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate mean, median, and mode</p>
                </a>
                <a href="/scientific-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Scientific Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Advanced math operations</p>
                </a>
                <a href="/gpa-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">GPA Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate grade point average</p>
                </a>
                <a href="/ratio-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Ratio Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate ratios and proportions</p>
                </a>
                <a href="/unit-converter" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Unit Converter</div>
                  <p className="text-xs text-gray-600 mt-1">Convert measurements</p>
                </a>
              </div>
            </div>

            {/* External Links */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p className="mb-2">Learn more about fractions:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://www.mathsisfun.com/fractions.html" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Math Is Fun: Fractions →
                </a>
                <a href="https://www.khanacademy.org/math/arithmetic/fraction-arithmetic" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Khan Academy: Fractions →
                </a>
                <a href="https://en.wikipedia.org/wiki/Fraction" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Wikipedia: Fractions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

