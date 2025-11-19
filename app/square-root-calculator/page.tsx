import { Metadata } from "next";
import { SquareRootCalculator } from "@/components/Calculator/SquareRootCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Square Root Calculator (Free, No signup) - Calculate Roots | AICalculator",
  description: "Free square root calculator with no sign-up required. Find √n, nth roots, and check perfect squares. Get step-by-step solutions, exact values, and mathematical analysis. Perfect for students and professionals.",
  keywords: [
    "square root calculator",
    "free square root calculator",
    "square root calculator no signup",
    "nth root calculator",
    "perfect square calculator",
    "cube root calculator",
    "radical calculator",
    "root solver",
    "square root finder",
    "irrational numbers",
    "principal square root",
    "math calculator",
    "algebra calculator",
    "geometry calculator",
    "radical simplifier",
    "root approximation",
    "mathematical roots",
  ],
  openGraph: {
    title: "Square Root Calculator (Free, No signup) - AICalculator",
    description: "Free square root calculator with no sign-up required. Online calculator with step-by-step solutions. Calculate square roots, nth roots, and check perfect squares with detailed mathematical analysis.",
    type: "website",
    url: "https://aicalculator.pro/square-root-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Square Root Calculator (Free, No signup) - AICalculator",
    description: "Free square root calculator with no sign-up required. Calculate square roots, nth roots, and check perfect squares with detailed step-by-step solutions and mathematical analysis.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.pro/square-root-calculator",
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
};

export default function SquareRootCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Square Root Calculator",
        "url": "https://aicalculator.pro/square-root-calculator",
        "description": "Free online square root calculator to calculate √n, nth roots, and check perfect squares with step-by-step solutions and mathematical analysis.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate square roots (√n)",
          "Calculate nth roots (ⁿ√n)",
          "Check perfect squares",
          "Step-by-step solutions",
          "Exact and approximate values",
          "Mathematical property analysis",
          "Real-world applications",
          "Related value calculations"
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
            "name": "Math Calculators",
            "item": "https://aicalculator.pro/math-numbers"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Square Root Calculator",
            "item": "https://aicalculator.pro/square-root-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do you calculate a square root?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate a square root, find the number that when multiplied by itself gives the original number. For perfect squares like 16, √16 = 4 because 4 × 4 = 16. For non-perfect squares, use approximation methods or a calculator to find the decimal approximation."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between principal and negative square roots?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Every positive number has two square roots: positive and negative. The principal square root (√) always refers to the positive root. For example, √25 = 5 (principal root), while the complete solution to x² = 25 is x = ±5 (both +5 and -5)."
            }
          },
          {
            "@type": "Question",
            "name": "What is a perfect square?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A perfect square is a number that is the square of an integer. Examples include 1, 4, 9, 16, 25, 36, etc. These numbers have exact integer square roots. For instance, 36 is a perfect square because √36 = 6 exactly."
            }
          },
          {
            "@type": "Question",
            "name": "Can you find square roots of negative numbers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In real numbers, square roots of negative numbers don't exist because no real number multiplied by itself gives a negative result. However, in complex numbers, √(-1) = i (imaginary unit), and √(-n) = i√n for positive n."
            }
          },
          {
            "@type": "Question",
            "name": "What is an nth root?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An nth root of a number is a value that, when raised to the power n, gives the original number. For example, the 3rd root (cube root) of 27 is 3 because 3³ = 27. The nth root of x is written as ⁿ√x or x^(1/n)."
            }
          },
          {
            "@type": "Question",
            "name": "How do you simplify square root expressions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To simplify square roots, factor out perfect squares from under the radical. For example, √72 = √(36 × 2) = √36 × √2 = 6√2. Look for the largest perfect square factor and extract it from under the radical sign."
            }
          },
          {
            "@type": "Question",
            "name": "What are the properties of square roots?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Key properties include: √(ab) = √a × √b, √(a/b) = √a / √b, √(a²) = |a|, and (√a)² = a for non-negative a. These properties help in simplifying and manipulating square root expressions."
            }
          },
          {
            "@type": "Question",
            "name": "When are square roots used in real life?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Square roots are used in geometry (finding side lengths), physics (calculating velocities and distances), statistics (standard deviation), engineering (signal processing), finance (risk calculations), and construction (diagonal measurements and area calculations)."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Square Root Calculator",
        "description": "Step-by-step guide to calculating square roots and nth roots using our online calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose Calculation Type",
            "text": "Select whether you want to calculate a square root (√), nth root (ⁿ√), or check if a number is a perfect square. Each option provides different calculation methods."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Your Number",
            "text": "Input the number you want to find the root of. For square roots, use positive numbers. For nth roots, negative numbers are allowed for odd roots (like cube roots)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Set Root Value (if applicable)",
            "text": "For nth root calculations, specify the root value (n). Use 2 for square root, 3 for cube root, 4 for fourth root, etc."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Calculate Results",
            "text": "Click 'Calculate Root' to see your results including the exact or approximate value, step-by-step solution, and mathematical analysis."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Review Analysis",
            "text": "Examine the mathematical properties, related values, and real-world applications to better understand the root and its significance."
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
      
      <h1 className="sr-only">Square Root Calculator - Free Online Root Calculator</h1>
      
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" 
              itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-purple-600 transition-colors">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/math-numbers" itemProp="item" className="hover:text-purple-600 transition-colors">
                <span itemProp="name">Math Calculators</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">Square Root Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <SquareRootCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Square Roots and Radicals
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What is a Square Root?</h3>
                <p className="text-gray-700 mb-4">
                  A square root of a number is a value that, when multiplied by itself, gives the original number. The square root symbol (√) represents the principal (positive) square root.
                </p>
                <p className="text-gray-700">
                  For example, √16 = 4 because 4 × 4 = 16. Every positive number has two square roots (positive and negative), but the radical symbol always refers to the positive root.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Perfect Squares</h3>
                <p className="text-gray-700 mb-4">
                  Perfect squares are numbers that have exact integer square roots. The first few perfect squares are: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100...
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm font-mono text-gray-800">
                    1² = 1, 2² = 4, 3² = 9, 4² = 16<br/>
                    5² = 25, 6² = 36, 7² = 49, 8² = 64
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Nth Roots</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-1">Cube Root (∛)</h4>
                    <p className="text-sm text-gray-700">∛27 = 3 because 3³ = 27</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-900 mb-1">Fourth Root (⁴√)</h4>
                    <p className="text-sm text-gray-700">⁴√81 = 3 because 3⁴ = 81</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-1">General Form</h4>
                    <p className="text-sm text-gray-700">ⁿ√x = x^(1/n)</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Square Root Properties</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span><strong>Product Rule:</strong> √(ab) = √a × √b</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span><strong>Quotient Rule:</strong> √(a/b) = √a / √b</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span><strong>Power Rule:</strong> √(a²) = |a|</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span><strong>Inverse Property:</strong> (√a)² = a (for a ≥ 0)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you calculate a square root?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate a square root, find the number that when multiplied by itself gives the original number. For perfect squares like 16, √16 = 4 because 4 × 4 = 16. For non-perfect squares, use approximation methods or a calculator to find the decimal approximation.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the difference between principal and negative square roots?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Every positive number has two square roots: positive and negative. The principal square root (√) always refers to the positive root. For example, √25 = 5 (principal root), while the complete solution to x² = 25 is x = ±5 (both +5 and -5).
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is a perfect square?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      A perfect square is a number that is the square of an integer. Examples include 1, 4, 9, 16, 25, 36, etc. These numbers have exact integer square roots. For instance, 36 is a perfect square because √36 = 6 exactly.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can you find square roots of negative numbers?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      In real numbers, square roots of negative numbers don't exist because no real number multiplied by itself gives a negative result. However, in complex numbers, √(-1) = i (imaginary unit), and √(-n) = i√n for positive n.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is an nth root?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      An nth root of a number is a value that, when raised to the power n, gives the original number. For example, the 3rd root (cube root) of 27 is 3 because 3³ = 27. The nth root of x is written as ⁿ√x or x^(1/n).
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you simplify square root expressions?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To simplify square roots, factor out perfect squares from under the radical. For example, √72 = √(36 × 2) = √36 × √2 = 6√2. Look for the largest perfect square factor and extract it from under the radical sign.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What are the properties of square roots?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Key properties include: √(ab) = √a × √b, √(a/b) = √a / √b, √(a²) = |a|, and (√a)² = a for non-negative a. These properties help in simplifying and manipulating square root expressions.
                    </p>
                  </div>
                </div>

                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    When are square roots used in real life?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Square roots are used in geometry (finding side lengths), physics (calculating velocities and distances), statistics (standard deviation), engineering (signal processing), finance (risk calculations), and construction (diagonal measurements and area calculations).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Math Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/scientific-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Scientific Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Advanced mathematical operations</p>
                </Link>
                <Link href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate percentages and ratios</p>
                </Link>
                <Link href="/pythagorean-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Pythagorean Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Right triangle calculations</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
