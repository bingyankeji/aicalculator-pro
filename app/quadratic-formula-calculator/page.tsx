import { Metadata } from "next";
import Link from "next/link";
import { QuadraticCalculator } from "@/components/Calculator/QuadraticCalculator";
import { quadraticStructuredData as structuredData } from "./structuredData";

export const metadata: Metadata = {
  title: "Quadratic Formula (Free, No signup) - Solve Equations | AICalculator",
  description: "Free quadratic formula calculator with no sign-up required. Solve ax^2 + bx + c = 0. Shows discriminant, real/complex roots, and step-by-step calculation with explanations.",
  keywords: [
    "quadratic formula calculator",
    "free quadratic formula calculator",
    "quadratic formula calculator no signup",
    "quadratic equation solver",
    "solve ax^2 + bx + c",
    "discriminant calculator",
    "complex roots",
    "quadratic roots",
    "b^2 - 4ac",
    "algebra calculator",
    "math equation solver"
  ],
  openGraph: {
    title: "Quadratic Formula (Free, No signup) - AICalculator",
    description: "Free quadratic formula calculator with no sign-up required. Solve quadratic equations with discriminant and step-by-step solutions. Supports real and complex roots.",
    type: "website",
    url: "https://aicalculator.pro/quadratic-formula-calculator",
    siteName: "AICalculator"
  },
  twitter: {
    card: "summary_large_image",
    title: "Quadratic Formula (Free, No signup) - AICalculator",
    description: "Free quadratic formula calculator with no sign-up required. Instantly solve ax^2 + bx + c = 0 with steps, discriminant, and real/complex roots.",
    site: "@AICalculator"
  },
  alternates: { canonical: "https://aicalculator.pro/quadratic-formula-calculator" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  other: { 'last-modified': new Date().toISOString() }
};

export default function QuadraticFormulaCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <h1 className="sr-only">Quadratic Formula Calculator - Solve ax^2 + bx + c, discriminant, real and complex roots</h1>

      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors"><span itemProp="name">Home</span></a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/math-numbers" itemProp="item" className="hover:text-blue-600 transition-colors"><span itemProp="name">Math & Numbers</span></a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">Quadratic Formula Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <QuadraticCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Quadratic Equations Explained
            </h2>

            {/* Key concepts */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <article className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Discriminant D = b^2 - 4ac</h3>
                <p className="text-gray-700 mb-3">
                  The discriminant D summarizes how many and what type of roots a quadratic has:
                  D &gt; 0 → two distinct real roots; D = 0 → one repeated real root; D &lt; 0 → two
                  complex conjugate roots. Its magnitude also hints at the distance between roots.
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Large positive D → roots are far apart.</li>
                  <li>Small positive D → roots are close to each other.</li>
                  <li>Negative D → no real intersection with the x-axis.</li>
                </ul>
              </article>
              <article className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Vertex and Axis of Symmetry</h3>
                <p className="text-gray-700 mb-3">
                  The axis of symmetry is x = -b/(2a). The vertex sits on this line at
                  x_v = -b/(2a) and y_v = f(x_v). While our tool solves for the roots,
                  understanding the vertex helps with graphing and optimization problems.
                </p>
                <p className="text-gray-700">
                  If a &gt; 0 the parabola opens upward (minimum at the vertex); if a &lt; 0 it opens
                  downward (maximum at the vertex).
                </p>
              </article>
            </div>

            {/* Worked example */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold mb-3">Worked Example</h3>
              <p className="text-gray-700 mb-4">
                Solve 2x^2 - 5x - 3 = 0. Here a = 2, b = -5, c = -3. Discriminant:
                D = (-5)^2 - 4(2)(-3) = 25 + 24 = 49. Since D &gt; 0, there are two real roots.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 font-mono">
                <div>
                  x₁ = (-b + √D)/(2a) = (5 + 7) / 4 = 3
                </div>
                <div>
                  x₂ = (-b - √D)/(2a) = (5 - 7) / 4 = -0.5
                </div>
              </div>
            </div>

            {/* How to use */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold mb-3">How to Use This Calculator</h3>
              <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                <li>Enter the coefficients a, b, c (ensure a ≠ 0).</li>
                <li>Review the discriminant and solution steps shown below the inputs.</li>
                <li>Interpret the output: two reals, one repeated real, or two complex conjugates.</li>
                <li>Use the results for graphing, optimization, or equation modeling tasks.</li>
              </ol>
            </div>

            {/* FAQs */}
            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the quadratic formula?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      For ax^2 + bx + c = 0 with a ≠ 0, the solutions are
                      x = (-b ± √(b^2 - 4ac)) / (2a). The ± gives two branches, producing two
                      roots when the discriminant is positive.
                    </p>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    When are the roots complex?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      When the discriminant b^2 - 4ac is negative. The roots take the form
                      p ± qi where p and q are real numbers.
                    </p>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What does a = 0 mean?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Then the equation is linear (bx + c = 0) and not quadratic. Our tool
                      requires a ≠ 0 to use the quadratic formula.
                    </p>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do the coefficients affect the graph?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The coefficient a controls opening direction and vertical stretch; b shifts the
                      axis of symmetry; c is the y-intercept (0, c).
                    </p>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-0" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can I use the formula to complete the square?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes. Completing the square derives the quadratic formula and also provides
                      vertex form y = a(x - h)^2 + k for graphing and optimization.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Calculators</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/scientific-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Scientific Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Evaluate expressions and functions</p>
                </Link>
                <Link href="/percentage-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Percent change and ratio</p>
                </Link>
                <Link href="/average-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Average Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Mean, median, and mode</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
