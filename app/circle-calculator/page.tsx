import type { Metadata } from "next";
import CircleCalculator from "@/components/Calculator/CircleCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Circle Calculator - Calculate Area, Circumference, Diameter from Radius | AI Calculator",
  description:
    "Free circle calculator to find area, circumference, diameter, and radius. Enter any one value to calculate all circle properties with step-by-step solutions and formulas.",
  keywords: [
    "circle calculator",
    "circle area calculator",
    "circumference calculator",
    "circle diameter calculator",
    "radius calculator",
    "circle formula",
    "area of circle",
    "circumference formula",
    "pi calculator",
    "geometry calculator",
    "circle measurements",
    "circle properties",
    "circle math",
    "circular area",
    "perimeter of circle",
  ],
  openGraph: {
    title: "Circle Calculator - Calculate Area, Circumference, Diameter",
    description:
      "Calculate all circle properties from any known value. Find area, circumference, diameter, and radius with step-by-step solutions.",
    type: "website",
    url: "https://aicalculator.com/circle-calculator",
    siteName: "AI Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Circle Calculator - Area, Circumference, Diameter",
    description:
      "Free calculator for all circle properties. Enter radius, diameter, circumference, or area to find all values.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.com/circle-calculator",
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
      "name": "Circle Calculator",
      "url": "https://aicalculator.com/circle-calculator",
      "description": "Calculate circle area, circumference, diameter, and radius from any known value. Includes step-by-step solutions and visual representations.",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Calculate circle area from radius, diameter, or circumference",
        "Find circumference from any circle measurement",
        "Determine diameter and radius relationships",
        "Step-by-step calculation explanations",
        "Visual circle representation with labels",
        "Circle formula reference and examples",
        "Quick conversions between circle properties",
        "Real-world application examples"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://aicalculator.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Math & Numbers",
          "item": "https://aicalculator.com/math-numbers"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Circle Calculator",
          "item": "https://aicalculator.com/circle-calculator"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do you calculate the area of a circle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The area of a circle is calculated using the formula A = πr², where r is the radius and π (pi) ≈ 3.14159. For example, a circle with radius 5 has area = π × 5² = 25π ≈ 78.54 square units."
          }
        },
        {
          "@type": "Question",
          "name": "What is the formula for circumference of a circle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The circumference (perimeter) of a circle is calculated using C = 2πr or C = πd, where r is radius and d is diameter. For a circle with radius 5, circumference = 2π × 5 = 10π ≈ 31.42 units."
          }
        },
        {
          "@type": "Question",
          "name": "How do you find the radius from circumference?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To find radius from circumference, use the formula r = C/(2π). For example, if circumference is 31.42, then radius = 31.42/(2π) ≈ 5 units."
          }
        },
        {
          "@type": "Question",
          "name": "What is the relationship between diameter and radius?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The diameter is always twice the radius: d = 2r. Conversely, radius is half the diameter: r = d/2. This is a fundamental relationship in circle geometry."
          }
        },
        {
          "@type": "Question",
          "name": "How do you calculate circle area from diameter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To find area from diameter, first find radius (r = d/2), then use A = πr². Alternatively, use A = π(d/2)² = πd²/4. For diameter 10, area = π(10/2)² = 25π ≈ 78.54 square units."
          }
        },
        {
          "@type": "Question",
          "name": "What is pi (π) and why is it important in circle calculations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pi (π) is the ratio of a circle's circumference to its diameter, approximately 3.14159. It's a mathematical constant that appears in all circle formulas because it represents the fundamental relationship between circular measurements."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Calculate Circle Properties",
      "description": "Step-by-step guide to calculate area, circumference, and other circle properties",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Identify Known Value",
          "text": "Determine what measurement you have: radius, diameter, circumference, or area of the circle."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Choose Appropriate Formula",
          "text": "Select the correct formula based on your known value: A = πr² for area, C = 2πr for circumference, d = 2r for diameter."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Calculate Missing Values",
          "text": "Use the formulas to find all unknown circle properties. Remember that π ≈ 3.14159 for calculations."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Verify Results",
          "text": "Check your calculations by using different formulas or converting between measurements to ensure consistency."
        }
      ]
    }
  ]
} as const;

export default function CircleCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Circle Calculator - Calculate Area, Circumference, Diameter from Radius</h1>
      
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link href="/math-numbers" className="hover:text-gray-700">Math & Numbers</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Circle Calculator</span>
          </div>
        </div>
      </nav>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CircleCalculator />
          
          {/* Educational Content Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding Circle Geometry and Calculations
            </h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p>
                A circle is one of the most fundamental shapes in geometry, defined as the set of all points 
                that are equidistant from a central point. Understanding circle properties and calculations 
                is essential in mathematics, engineering, architecture, and many real-world applications. 
                Our circle calculator helps you find any circle measurement when you know just one value.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Essential Circle Formulas</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">🔵 Area Formula</h4>
                  <p className="text-blue-800 mb-2"><strong>Formula:</strong> A = πr²</p>
                  <p className="text-blue-700 text-sm mb-2"><strong>Where:</strong> A = area, r = radius, π ≈ 3.14159</p>
                  <p className="text-blue-700 text-sm"><strong>Example:</strong> Circle with radius 4 → Area = π × 4² = 16π ≈ 50.27</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-3">⭕ Circumference Formula</h4>
                  <p className="text-green-800 mb-2"><strong>Formula:</strong> C = 2πr or C = πd</p>
                  <p className="text-green-700 text-sm mb-2"><strong>Where:</strong> C = circumference, r = radius, d = diameter</p>
                  <p className="text-green-700 text-sm"><strong>Example:</strong> Circle with radius 4 → C = 2π × 4 = 8π ≈ 25.13</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">↔️ Diameter Formula</h4>
                  <p className="text-purple-800 mb-2"><strong>Formula:</strong> d = 2r</p>
                  <p className="text-purple-700 text-sm mb-2"><strong>Where:</strong> d = diameter, r = radius</p>
                  <p className="text-purple-700 text-sm"><strong>Example:</strong> Circle with radius 4 → Diameter = 2 × 4 = 8</p>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                  <h4 className="text-lg font-bold text-orange-900 mb-3">📏 Radius Formula</h4>
                  <p className="text-orange-800 mb-2"><strong>From diameter:</strong> r = d/2</p>
                  <p className="text-orange-800 mb-2"><strong>From circumference:</strong> r = C/(2π)</p>
                  <p className="text-orange-800 mb-2"><strong>From area:</strong> r = √(A/π)</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Circle Properties and Relationships</h3>
              
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 mt-6">
                <h4 className="text-lg font-bold text-yellow-900 mb-4">Key Circle Relationships</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-yellow-800 mb-2">Diameter and Radius</p>
                    <p className="text-yellow-700">• Diameter = 2 × Radius</p>
                    <p className="text-yellow-700">• Radius = Diameter ÷ 2</p>
                    <p className="text-yellow-700">• Diameter passes through center</p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-800 mb-2">Pi (π) Relationships</p>
                    <p className="text-yellow-700">• π = Circumference ÷ Diameter</p>
                    <p className="text-yellow-700">• π ≈ 3.14159265359...</p>
                    <p className="text-yellow-700">• π is an irrational number</p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-800 mb-2">Area and Circumference</p>
                    <p className="text-yellow-700">• Area grows with radius squared</p>
                    <p className="text-yellow-700">• Circumference grows linearly</p>
                    <p className="text-yellow-700">• Both involve π constant</p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-800 mb-2">Circle vs Square</p>
                    <p className="text-yellow-700">• Circle has maximum area for perimeter</p>
                    <p className="text-yellow-700">• Square inscribed: side = r√2</p>
                    <p className="text-yellow-700">• Square circumscribed: side = 2r</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Real-World Applications</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">🏗️ Engineering & Construction</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Pipe and tank capacity calculations</li>
                    <li>• Circular foundation design</li>
                    <li>• Wheel and gear specifications</li>
                    <li>• Circular building layouts</li>
                    <li>• Drainage and sewer systems</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">🎨 Design & Manufacturing</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Logo and graphic design</li>
                    <li>• Circular product dimensions</li>
                    <li>• Material usage calculations</li>
                    <li>• Packaging design optimization</li>
                    <li>• Circular cutting patterns</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">🌍 Science & Nature</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Planetary orbit calculations</li>
                    <li>• Cell and organism measurements</li>
                    <li>• Circular motion physics</li>
                    <li>• Garden and landscape design</li>
                    <li>• Sports field dimensions</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Circle Calculations</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h5 className="font-bold text-blue-900 mb-2">Finding Area from Different Measurements</h5>
                  <div className="text-blue-800 text-sm space-y-1">
                    <p>• <strong>From radius:</strong> A = πr²</p>
                    <p>• <strong>From diameter:</strong> A = π(d/2)² = πd²/4</p>
                    <p>• <strong>From circumference:</strong> A = C²/(4π)</p>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h5 className="font-bold text-green-900 mb-2">Converting Between Measurements</h5>
                  <div className="text-green-800 text-sm space-y-1">
                    <p>• <strong>Radius to diameter:</strong> d = 2r</p>
                    <p>• <strong>Diameter to circumference:</strong> C = πd</p>
                    <p>• <strong>Area to radius:</strong> r = √(A/π)</p>
                    <p>• <strong>Circumference to area:</strong> A = C²/(4π)</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tips for Circle Calculations</h3>
              
              <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200 mt-6">
                <ul className="text-indigo-800 space-y-2 text-sm">
                  <li>• Remember that π ≈ 3.14159, but use more decimal places for precision</li>
                  <li>• Always check your units - area is in square units, circumference in linear units</li>
                  <li>• For practical applications, consider rounding to appropriate precision</li>
                  <li>• Use the relationship C/d = π to verify your circumference calculations</li>
                  <li>• When measuring real circles, measure diameter for better accuracy than radius</li>
                  <li>• Double-check calculations by working backwards from your result</li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Historical Context</h3>
              
              <p>
                The study of circles dates back to ancient civilizations. The Babylonians approximated π as 3, 
                while the ancient Egyptians used 22/7. Archimedes (287-212 BCE) was the first to calculate π 
                accurately using inscribed and circumscribed polygons. Today, we know π to trillions of decimal 
                places, though 3.14159 is sufficient for most practical applications.
              </p>
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
              <Link href="/triangle-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Triangle Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Solve triangles with SSS, SAS, ASA</p>
              </Link>
              <Link href="/volume-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Volume Calculator</div>
                <p className="text-xs text-gray-600 mt-1">3D shape volume calculations</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
