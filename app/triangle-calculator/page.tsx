import type { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import TriangleCalculator from "@/components/Calculator/TriangleCalculator";
import Link from "next/link";
import { getUrl } from '@/config/site';

export const metadata: Metadata = {
  title: "Triangle Calculator (Free, No signup) - Solve Triangles | AICalculator",
  description:
    "Free triangle calculator with no sign-up required. Solve any triangle using SSS, SAS, ASA methods. Calculate area, perimeter, angles, and sides with step-by-step solutions and formulas.",
  keywords: [
    "triangle calculator",
    "free triangle calculator",
    "triangle calculator no signup",
    "triangle solver",
    "SSS triangle calculator",
    "SAS triangle calculator",
    "ASA triangle calculator",
    "triangle area calculator",
    "triangle perimeter calculator",
    "law of cosines calculator",
    "law of sines calculator",
    "triangle angles calculator",
    "triangle sides calculator",
    "geometry calculator",
    "trigonometry calculator",
    "triangle formula",
    "solve triangle",
  ],
  openGraph: {
    title: "Triangle Calculator (Free, No signup) - AICalculator",
    description:
      "Free triangle calculator with no sign-up required. Calculate triangle area, perimeter, angles, and sides using SSS, SAS, ASA methods. Includes step-by-step solutions and triangle type identification.",
    type: "website",
    url: getUrl('/triangle-calculator'),
    siteName: "AI Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triangle Calculator (Free, No signup) - AICalculator",
    description:
      "Free triangle calculator with no sign-up required. Solve any triangle. Calculate area, perimeter, angles with step-by-step solutions.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: getUrl('/triangle-calculator'),
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
      "name": "Triangle Calculator",
      "url": getUrl('/triangle-calculator'),
      "description": "Solve any triangle using SSS, SAS, ASA methods. Calculate area, perimeter, angles, and sides with step-by-step mathematical solutions.",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "SSS triangle solver (three sides known)",
        "SAS triangle solver (side-angle-side)",
        "ASA triangle solver (angle-side-angle)",
        "Triangle area calculation with multiple methods",
        "Perimeter and angle calculations",
        "Triangle type identification (equilateral, isosceles, scalene)",
        "Step-by-step mathematical solutions",
        "Law of cosines and law of sines applications"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": getUrl('/')
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Math & Numbers",
          "item": getUrl('/math-numbers')
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Triangle Calculator",
          "item": getUrl('/triangle-calculator')
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do you solve a triangle with three sides (SSS)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To solve a triangle with three sides (SSS method), use the Law of Cosines to find the angles: cos(A) = (b² + c² - a²) / (2bc). Then calculate the area using Heron's formula: Area = √[s(s-a)(s-b)(s-c)] where s is the semi-perimeter."
          }
        },
        {
          "@type": "Question",
          "name": "What is the SAS triangle method?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SAS (Side-Angle-Side) method is used when you know two sides and the included angle. Use the Law of Cosines to find the third side: c² = a² + b² - 2ab·cos(C). Then use the Law of Sines to find the remaining angles."
          }
        },
        {
          "@type": "Question",
          "name": "How do you calculate triangle area?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Triangle area can be calculated using several methods: 1) Heron's formula with three sides, 2) ½ × base × height, 3) ½ab·sin(C) with two sides and included angle, or 4) Using coordinates with the shoelace formula."
          }
        },
        {
          "@type": "Question",
          "name": "What makes a valid triangle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A valid triangle must satisfy the triangle inequality theorem: the sum of any two sides must be greater than the third side. Also, the sum of all angles must equal 180 degrees, and each angle must be positive."
          }
        },
        {
          "@type": "Question",
          "name": "What are the different types of triangles?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Triangles are classified by sides (equilateral, isosceles, scalene) and by angles (acute, right, obtuse). Equilateral triangles have all sides equal, isosceles have two equal sides, and scalene have all different sides."
          }
        },
        {
          "@type": "Question",
          "name": "When do you use the Law of Cosines vs Law of Sines?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use Law of Cosines when you know: SSS (three sides), SAS (two sides and included angle), or to find angles from sides. Use Law of Sines when you know: ASA, AAS (two angles and a side), or to find sides from angles."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Solve Any Triangle",
      "description": "Step-by-step guide to solve triangles using different methods",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Identify Known Values",
          "text": "Determine what information you have: three sides (SSS), two sides and included angle (SAS), two angles and a side (ASA/AAS), or other combinations."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Choose the Method",
          "text": "Select the appropriate solving method based on your known values: SSS uses Law of Cosines, SAS uses Law of Cosines then Law of Sines, ASA/AAS use Law of Sines."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Calculate Missing Values",
          "text": "Apply the chosen method to find all missing sides and angles. Verify that angles sum to 180° and triangle inequality is satisfied."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Find Area and Perimeter",
          "text": "Calculate the triangle's area using appropriate formula (Heron's, ½ab·sin(C), etc.) and perimeter by summing all three sides."
        }
      ]
    }
  ]
} as const;

export default function TriangleCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Triangle Calculator - Solve Any Triangle with SSS, SAS, ASA Methods</h1>
      
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link href="/math-numbers" className="hover:text-gray-700">Math & Numbers</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Triangle Calculator</span>
          </div>
        </div>
      </nav>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TriangleCalculator />
          
          {/* Educational Content Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding Triangle Calculations and Geometry
            </h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p>
                Triangles are fundamental geometric shapes with three sides, three angles, and three vertices. 
                Understanding how to solve triangles is essential in mathematics, engineering, architecture, 
                navigation, and many other fields. Our triangle calculator uses proven mathematical methods 
                to find all unknown measurements when given sufficient information.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Triangle Solving Methods</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">📐 SSS Method</h4>
                  <p className="text-blue-800 mb-2"><strong>Given:</strong> All three sides (a, b, c)</p>
                  <p className="text-blue-700 text-sm mb-2"><strong>Uses:</strong> Law of Cosines + Heron's Formula</p>
                  <p className="text-blue-700 text-sm"><strong>Formula:</strong> cos(A) = (b² + c² - a²) / (2bc)</p>
                  <p className="text-blue-700 text-sm mt-2"><strong>Example:</strong> Sides 3, 4, 5 → Right triangle</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-3">📏 SAS Method</h4>
                  <p className="text-green-800 mb-2"><strong>Given:</strong> Two sides and included angle</p>
                  <p className="text-green-700 text-sm mb-2"><strong>Uses:</strong> Law of Cosines + Law of Sines</p>
                  <p className="text-green-700 text-sm"><strong>Formula:</strong> c² = a² + b² - 2ab·cos(C)</p>
                  <p className="text-green-700 text-sm mt-2"><strong>Example:</strong> Sides 3, 4 with 90° angle → Side 5</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">📐 ASA Method</h4>
                  <p className="text-purple-800 mb-2"><strong>Given:</strong> Two angles and included side</p>
                  <p className="text-purple-700 text-sm mb-2"><strong>Uses:</strong> Law of Sines</p>
                  <p className="text-purple-700 text-sm"><strong>Formula:</strong> a/sin(A) = b/sin(B) = c/sin(C)</p>
                  <p className="text-purple-700 text-sm mt-2"><strong>Note:</strong> Third angle = 180° - A - B</p>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                  <h4 className="text-lg font-bold text-orange-900 mb-3">📏 AAS Method</h4>
                  <p className="text-orange-800 mb-2"><strong>Given:</strong> Two angles and non-included side</p>
                  <p className="text-orange-700 text-sm mb-2"><strong>Uses:</strong> Law of Sines</p>
                  <p className="text-orange-700 text-sm"><strong>Similar to ASA:</strong> Find third angle first</p>
                  <p className="text-orange-700 text-sm mt-2"><strong>Then:</strong> Use Law of Sines for remaining sides</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Triangle Types and Properties</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">📏 By Sides</h4>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li><strong>Equilateral:</strong> All sides equal (a = b = c)</li>
                    <li><strong>Isosceles:</strong> Two sides equal</li>
                    <li><strong>Scalene:</strong> All sides different</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">📐 By Angles</h4>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li><strong>Acute:</strong> All angles &lt; 90°</li>
                    <li><strong>Right:</strong> One angle = 90°</li>
                    <li><strong>Obtuse:</strong> One angle &gt; 90°</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">🔢 Key Properties</h4>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li><strong>Angle Sum:</strong> Always 180°</li>
                    <li><strong>Triangle Inequality:</strong> a + b &gt; c</li>
                    <li><strong>Largest Angle:</strong> Opposite longest side</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Area Calculation Methods</h3>
              
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 mt-6">
                <h4 className="text-lg font-bold text-yellow-900 mb-4">Common Area Formulas</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-yellow-800 mb-2">1. Heron's Formula (SSS)</p>
                    <p className="font-mono text-yellow-700">Area = √[s(s-a)(s-b)(s-c)]</p>
                    <p className="text-yellow-600 text-xs mt-1">where s = (a+b+c)/2</p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-800 mb-2">2. SAS Formula</p>
                    <p className="font-mono text-yellow-700">Area = ½ab·sin(C)</p>
                    <p className="text-yellow-600 text-xs mt-1">Two sides and included angle</p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-800 mb-2">3. Base × Height</p>
                    <p className="font-mono text-yellow-700">Area = ½ × base × height</p>
                    <p className="text-yellow-600 text-xs mt-1">When height is known</p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-800 mb-2">4. Coordinate Formula</p>
                    <p className="font-mono text-yellow-700">Area = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|</p>
                    <p className="text-yellow-600 text-xs mt-1">Using vertex coordinates</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Real-World Applications</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">🏗️ Engineering & Construction</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Structural analysis and truss design</li>
                    <li>• Roof pitch and rafter calculations</li>
                    <li>• Bridge and tower construction</li>
                    <li>• Land surveying and property boundaries</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">🧭 Navigation & Physics</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• GPS triangulation and positioning</li>
                    <li>• Force vector analysis</li>
                    <li>• Astronomy and celestial navigation</li>
                    <li>• Computer graphics and 3D modeling</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mt-8">
                <h4 className="text-lg font-bold text-blue-900 mb-3">💡 Tips for Triangle Problem Solving</h4>
                <ul className="text-blue-800 space-y-2 text-sm">
                  <li>• Always check if your triangle is valid using the triangle inequality</li>
                  <li>• Draw a diagram to visualize the problem and label known values</li>
                  <li>• Choose the most appropriate method based on given information</li>
                  <li>• Verify your answer by checking that angles sum to 180°</li>
                  <li>• Use consistent units throughout your calculations</li>
                  <li>• Round final answers appropriately for your application</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Calculators</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/area-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Area Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Calculate areas of various shapes</p>
              </Link>
              <Link href="/volume-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Volume Calculator</div>
                <p className="text-xs text-gray-600 mt-1">3D shape volume calculations</p>
              </Link>
              <Link href="/percentage-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Percentage Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Calculate percentages and ratios</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
