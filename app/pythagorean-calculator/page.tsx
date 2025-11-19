import type { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import PythagoreanCalculator from "@/components/Calculator/PythagoreanCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pythagorean Calculator (Free, No signup) - Right Triangle | AICalculator",
  description:
    "Free Pythagorean theorem calculator with no sign-up required. Find missing sides of right triangles. Calculate hypotenuse or legs using a² + b² = c² with step-by-step solutions and visual diagrams.",
  keywords: [
    "pythagorean theorem calculator",
    "free pythagorean calculator",
    "pythagorean calculator no signup",
    "right triangle calculator",
    "hypotenuse calculator",
    "pythagorean calculator",
    "find missing side triangle",
    "a squared plus b squared equals c squared",
    "right triangle solver",
    "triangle leg calculator",
    "pythagorean theorem formula",
    "geometry calculator",
    "triangle calculator",
    "math calculator",
    "trigonometry calculator",
    "3-4-5 triangle",
    "right angle triangle",
  ],
  openGraph: {
    title: "Pythagorean Calculator (Free, No signup) - AICalculator",
    description:
      "Free Pythagorean theorem calculator with no sign-up required. Calculate missing sides of right triangles using the Pythagorean theorem. Find hypotenuse or legs with step-by-step solutions and visual diagrams.",
    type: "website",
    url: "https://aicalculator.pro/pythagorean-calculator",
    siteName: "AI Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pythagorean Calculator (Free, No signup) - AICalculator",
    description:
      "Free Pythagorean theorem calculator with no sign-up required. Find missing sides of right triangles with a² + b² = c² formula.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.pro/pythagorean-calculator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Pythagorean Theorem Calculator",
      "url": "https://aicalculator.pro/pythagorean-calculator",
      "description": "Calculate missing sides of right triangles using the Pythagorean theorem (a² + b² = c²). Includes step-by-step solutions and visual triangle diagrams.",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Find hypotenuse from two legs (c = √(a² + b²))",
        "Calculate missing leg from hypotenuse and other leg",
        "Verify if three sides form a right triangle",
        "Step-by-step calculation explanations",
        "Visual right triangle diagram with labels",
        "Calculate triangle area and perimeter",
        "Show all angles in degrees",
        "Multiple calculation modes"
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
          "name": "Pythagorean Theorem Calculator",
          "item": "https://aicalculator.pro/pythagorean-calculator"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Pythagorean theorem formula?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Pythagorean theorem states that in a right triangle, a² + b² = c², where 'a' and 'b' are the lengths of the two legs (sides forming the right angle), and 'c' is the length of the hypotenuse (the longest side opposite the right angle)."
          }
        },
        {
          "@type": "Question",
          "name": "How do you find the hypotenuse of a right triangle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To find the hypotenuse (c), use the formula c = √(a² + b²). Square both legs, add them together, then take the square root. For example, if a = 3 and b = 4, then c = √(3² + 4²) = √(9 + 16) = √25 = 5."
          }
        },
        {
          "@type": "Question",
          "name": "How do you find a missing leg in a right triangle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To find a missing leg when you know the hypotenuse and the other leg, use: a = √(c² - b²) or b = √(c² - a²). For example, if c = 5 and b = 4, then a = √(5² - 4²) = √(25 - 16) = √9 = 3."
          }
        },
        {
          "@type": "Question",
          "name": "What is a 3-4-5 triangle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A 3-4-5 triangle is the most famous Pythagorean triple - a right triangle with sides of length 3, 4, and 5. It demonstrates the theorem: 3² + 4² = 9 + 16 = 25 = 5². Other common Pythagorean triples include 5-12-13 and 8-15-17."
          }
        },
        {
          "@type": "Question",
          "name": "How do you verify if a triangle is a right triangle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To verify if a triangle is a right triangle, check if the Pythagorean theorem holds: a² + b² = c² (where c is the longest side). If the equation is true, it's a right triangle. If not, it's either acute (a² + b² > c²) or obtuse (a² + b² < c²)."
          }
        },
        {
          "@type": "Question",
          "name": "Who discovered the Pythagorean theorem?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "While named after the Greek mathematician Pythagoras (c. 570-495 BCE), the theorem was known to earlier civilizations including the Babylonians and Indians. Pythagoras is credited with providing the first formal proof of the theorem in ancient Greece."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Use the Pythagorean Theorem",
      "description": "Step-by-step guide to solve right triangle problems using the Pythagorean theorem",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Identify the Triangle Type",
          "text": "Confirm you have a right triangle (one 90° angle). Identify the hypotenuse (longest side, opposite the right angle) and the two legs."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Choose the Correct Formula",
          "text": "Use c = √(a² + b²) to find the hypotenuse, or a = √(c² - b²) to find a missing leg. For verification, check if a² + b² = c²."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Substitute and Calculate",
          "text": "Insert your known values into the formula and solve. Remember to take the square root when finding a side length."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Verify Your Answer",
          "text": "Check your result by substituting all three sides back into a² + b² = c² to ensure the equation holds true."
        }
      ]
    }
  ]
} as const;

export default function PythagoreanCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Pythagorean Theorem Calculator - Find Missing Side of Right Triangle</h1>
      
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link href="/math-numbers" className="hover:text-gray-700">Math & Numbers</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Pythagorean Theorem Calculator</span>
          </div>
        </div>
      </nav>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PythagoreanCalculator />
          
          {/* Educational Content Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding the Pythagorean Theorem
            </h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p>
                The Pythagorean theorem is one of the most fundamental and widely used principles in mathematics. 
                Named after the ancient Greek mathematician Pythagoras, this theorem describes the relationship 
                between the sides of a right triangle. It states that in any right triangle, the square of the 
                hypotenuse (the side opposite the right angle) is equal to the sum of squares of the other two sides.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Pythagorean Theorem Formula</h3>
              
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900 mb-4">a² + b² = c²</div>
                  <div className="text-blue-800 space-y-1">
                    <p><strong>a</strong> and <strong>b</strong> = lengths of the two legs (sides forming the right angle)</p>
                    <p><strong>c</strong> = length of the hypotenuse (longest side, opposite the right angle)</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Applications</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-3">🔍 Finding the Hypotenuse</h4>
                  <p className="text-green-800 mb-2"><strong>Formula:</strong> c = √(a² + b²)</p>
                  <p className="text-green-700 text-sm mb-2"><strong>When to use:</strong> You know both legs</p>
                  <p className="text-green-700 text-sm"><strong>Example:</strong> a = 3, b = 4 → c = √(9 + 16) = 5</p>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                  <h4 className="text-lg font-bold text-orange-900 mb-3">📏 Finding a Leg</h4>
                  <p className="text-orange-800 mb-2"><strong>Formula:</strong> a = √(c² - b²)</p>
                  <p className="text-orange-700 text-sm mb-2"><strong>When to use:</strong> You know hypotenuse and one leg</p>
                  <p className="text-orange-700 text-sm"><strong>Example:</strong> c = 5, b = 4 → a = √(25 - 16) = 3</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">✓ Verification</h4>
                  <p className="text-purple-800 mb-2"><strong>Check:</strong> Does a² + b² = c²?</p>
                  <p className="text-purple-700 text-sm mb-2"><strong>When to use:</strong> Verify if triangle is right</p>
                  <p className="text-purple-700 text-sm"><strong>Example:</strong> 3² + 4² = 9 + 16 = 25 = 5² ✓</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Famous Pythagorean Triples</h3>
              
              <p>
                Pythagorean triples are sets of three positive integers that satisfy the Pythagorean theorem. 
                These combinations are particularly useful in construction, navigation, and various practical applications.
              </p>

              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 mt-6">
                <h4 className="text-lg font-bold text-yellow-900 mb-4">Common Pythagorean Triples</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-yellow-800 mb-2">Basic Triples</p>
                    <ul className="text-yellow-700 space-y-1">
                      <li>• <strong>3-4-5:</strong> 3² + 4² = 9 + 16 = 25 = 5²</li>
                      <li>• <strong>5-12-13:</strong> 5² + 12² = 25 + 144 = 169 = 13²</li>
                      <li>• <strong>8-15-17:</strong> 8² + 15² = 64 + 225 = 289 = 17²</li>
                      <li>• <strong>7-24-25:</strong> 7² + 24² = 49 + 576 = 625 = 25²</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-800 mb-2">Scaled Multiples</p>
                    <ul className="text-yellow-700 space-y-1">
                      <li>• <strong>6-8-10:</strong> 2 × (3-4-5)</li>
                      <li>• <strong>9-12-15:</strong> 3 × (3-4-5)</li>
                      <li>• <strong>10-24-26:</strong> 2 × (5-12-13)</li>
                      <li>• <strong>15-20-25:</strong> 5 × (3-4-5)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Real-World Applications</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">🏗️ Construction & Engineering</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Ensuring structures are square and level</li>
                    <li>• Calculating roof rafter lengths</li>
                    <li>• Determining diagonal bracing requirements</li>
                    <li>• Foundation layout and corner verification</li>
                    <li>• Staircase design and handrail placement</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">🧭 Navigation & Surveying</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• GPS distance calculations</li>
                    <li>• Property boundary measurements</li>
                    <li>• Ship and aircraft navigation</li>
                    <li>• Triangulation in mapping</li>
                    <li>• Shortest path calculations</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step-by-Step Problem Solving</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h5 className="font-bold text-gray-900 mb-2">Example 1: Finding the Hypotenuse</h5>
                  <div className="text-gray-700 text-sm space-y-1">
                    <p><strong>Problem:</strong> A right triangle has legs of 6 and 8 units. Find the hypotenuse.</p>
                    <p><strong>Solution:</strong></p>
                    <p>1. Use the formula: c = √(a² + b²)</p>
                    <p>2. Substitute: c = √(6² + 8²) = √(36 + 64) = √100</p>
                    <p>3. Calculate: c = 10 units</p>
                    <p><strong>Verification:</strong> 6² + 8² = 36 + 64 = 100 = 10² ✓</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h5 className="font-bold text-gray-900 mb-2">Example 2: Finding a Missing Leg</h5>
                  <div className="text-gray-700 text-sm space-y-1">
                    <p><strong>Problem:</strong> A right triangle has a hypotenuse of 13 and one leg of 5. Find the other leg.</p>
                    <p><strong>Solution:</strong></p>
                    <p>1. Use the formula: b = √(c² - a²)</p>
                    <p>2. Substitute: b = √(13² - 5²) = √(169 - 25) = √144</p>
                    <p>3. Calculate: b = 12 units</p>
                    <p><strong>Verification:</strong> 5² + 12² = 25 + 144 = 169 = 13² ✓</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Historical Context</h3>
              
              <p>
                While the theorem bears Pythagoras's name (c. 570-495 BCE), evidence suggests that the relationship 
                was known to earlier civilizations. Babylonian tablets from around 1800 BCE show knowledge of 
                Pythagorean triples, and ancient Indian texts also reference the theorem. Pythagoras is credited 
                with providing the first formal mathematical proof in ancient Greece.
              </p>

              <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200 mt-6">
                <h4 className="text-lg font-bold text-indigo-900 mb-3">💡 Tips for Using the Pythagorean Theorem</h4>
                <ul className="text-indigo-800 space-y-2 text-sm">
                  <li>• Always identify the hypotenuse first - it's the longest side opposite the right angle</li>
                  <li>• Remember that the theorem only applies to right triangles (90° angle)</li>
                  <li>• When finding a leg, ensure the hypotenuse is longer than the known leg</li>
                  <li>• Use Pythagorean triples for quick mental calculations</li>
                  <li>• Double-check your work by verifying a² + b² = c²</li>
                  <li>• In practical applications, consider measurement precision and rounding</li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Beyond Basic Applications</h3>
              
              <p>
                The Pythagorean theorem extends beyond simple triangle calculations. It forms the foundation for 
                distance formulas in coordinate geometry, appears in vector mathematics, and is essential in 
                trigonometry. In three dimensions, it generalizes to the distance formula: 
                d = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²].
              </p>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Calculators</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/triangle-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Triangle Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Solve triangles with SSS, SAS, ASA</p>
              </Link>
              <Link href="/area-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Area Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Calculate areas of various shapes</p>
              </Link>
              <Link href="/circle-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Circle Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Find circle area, circumference, radius</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
