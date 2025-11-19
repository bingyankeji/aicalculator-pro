import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from 'next/link';
import { AreaCalculator } from '@/components/Calculator/AreaCalculator';

export const metadata: Metadata = {
  title: 'Area Calculator (Free, No signup) - Calculate Area | AICalculator',
  description: 'Free area calculator with no sign-up required. Calculate area for rectangle, circle, triangle, trapezoid, parallelogram, and ellipse. With formulas, step-by-step calculations, and unit conversions. Perfect for students, contractors, and DIY projects.',
  keywords: [
    'area calculator',
    'free area calculator',
    'area calculator no signup',
    'area of rectangle calculator',
    'area of circle calculator',
    'area of triangle calculator',
    'area formula calculator',
    'square footage calculator',
    'area converter',
    'geometry calculator',
    'shape area calculator',
    'rectangle area',
    'circle area',
    'triangle area',
    'trapezoid area',
    'parallelogram area',
    'ellipse area',
    'area measurement',
    'surface area calculator',
  ],
  openGraph: {
    title: 'Area Calculator (Free, No signup) - AICalculator',
    description: 'Free area calculator with no sign-up required. Calculate area for rectangle, circle, triangle, trapezoid, parallelogram, and ellipse. Free tool with formulas and unit conversions.',
    type: 'website',
    url: 'https://aicalculator.pro/area-calculator',
    siteName: 'AICalculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Area Calculator (Free, No signup) - AICalculator',
    description: 'Free area calculator with no sign-up required. For rectangle, circle, triangle, trapezoid, parallelogram, and ellipse. Perfect for students and professionals.',
    site: '@AICalculator',
  },
  alternates: {
    canonical: 'https://aicalculator.pro/area-calculator',
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

export default function AreaCalculatorPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Area Calculator',
        url: 'https://aicalculator.pro/area-calculator',
        description:
          'Free area calculator for rectangle, circle, triangle, trapezoid, parallelogram, and ellipse. Calculate area with formulas, step-by-step calculations, and unit conversions.',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Rectangle area calculation',
          'Circle area calculation',
          'Triangle area calculation',
          'Trapezoid area calculation',
          'Parallelogram area calculation',
          'Ellipse area calculation',
          'Multiple unit support (feet, meters, inches, yards)',
          'Formula display and explanation',
          'Unit conversion (sq ft, sq m)',
          'Share and export results',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://aicalculator.pro',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Math & Numbers',
            item: 'https://aicalculator.pro/math-numbers',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Area Calculator',
            item: 'https://aicalculator.pro/area-calculator',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I calculate the area of a rectangle?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To calculate rectangle area: Area = Length × Width. Example: A rectangle 10 feet long × 8 feet wide = 80 square feet. Simply multiply the length by the width. This formula works for any rectangle, regardless of size. For squares (special rectangles), length equals width, so area = side².',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate the area of a circle?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Circle area formula: Area = π × r², where r is the radius (half the diameter). Example: A circle with radius 5 feet has area = π × 5² = 3.14159 × 25 = 78.54 square feet. If you know diameter instead: divide by 2 to get radius, then use the formula. π (pi) ≈ 3.14159.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate the area of a triangle?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Triangle area formula: Area = (Base × Height) ÷ 2. Example: A triangle with base 10 feet and height 8 feet has area = (10 × 8) ÷ 2 = 80 ÷ 2 = 40 square feet. The height is the perpendicular distance from the base to the opposite vertex. This formula works for all triangles.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate the area of a trapezoid?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Trapezoid area formula: Area = ((Base₁ + Base₂) × Height) ÷ 2. Example: A trapezoid with bases 10 feet and 8 feet, and height 6 feet has area = ((10 + 8) × 6) ÷ 2 = (18 × 6) ÷ 2 = 108 ÷ 2 = 54 square feet. The two bases are the parallel sides, and height is the perpendicular distance between them.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate the area of an irregular shape?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For irregular shapes: 1) Break the shape into basic shapes (rectangles, triangles, circles), 2) Calculate area of each basic shape separately, 3) Add all areas together for total area. For shapes with cutouts: Calculate full shape area, subtract cutout areas. Example: L-shaped room = Rectangle 1 + Rectangle 2. This method works for any complex shape.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between area and perimeter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Area measures the space inside a shape (square units like sq ft, sq m). Perimeter measures the distance around a shape (linear units like feet, meters). Example: A 10×8 ft rectangle has area = 80 sq ft (space inside) and perimeter = 36 ft (distance around). Area is 2D (length × width), perimeter is 1D (sum of all sides).',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I convert between different area units?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Common area unit conversions: 1 square foot = 0.0929 square meters, 1 square meter = 10.764 square feet, 1 square yard = 9 square feet, 1 acre = 43,560 square feet, 1 hectare = 10,000 square meters = 2.47 acres. To convert: Multiply by conversion factor. Example: 100 sq ft × 0.0929 = 9.29 sq m. Our calculator automatically converts between units.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I calculate area for 3D shapes?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'This calculator calculates 2D area (flat surfaces). For 3D shapes, you need surface area or volume: Surface area = sum of all face areas, Volume = area of base × height. Example: A box (rectangular prism) has 6 faces - calculate area of each face and add together for total surface area. For volume: length × width × height.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate Area',
        description: 'Step-by-step guide to calculating area for different shapes',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Shape',
            text: 'Choose the shape you want to calculate: Rectangle, Circle, Triangle, Trapezoid, Parallelogram, or Ellipse.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Choose Unit',
            text: 'Select your measurement unit: Feet, Meters, Inches, or Yards. All calculations will use this unit.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Dimensions',
            text: 'Input the required measurements for your selected shape. For rectangle: length and width. For circle: radius. For triangle: base and height. For trapezoid: both bases and height. For parallelogram: base and height. For ellipse: both radii (semi-major and semi-minor axes).',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate Area',
            text: "Click 'Calculate Area' to get instant results showing area in your chosen unit, plus conversions to square feet and square meters.",
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Review Formula',
            text: 'See the calculation formula used and step-by-step explanation. Use this to understand how the area was calculated.',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* SEO: Hidden H1 */}
      <h1 className="sr-only">
        Area Calculator - Free Area Calculator for Rectangle, Circle, Triangle, Trapezoid, Parallelogram, and Ellipse with Formulas and Unit Conversions
      </h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Area Calculator (Free, No signup)"
        calculatorUrl="/area-calculator"
      />

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <AreaCalculator />
        </div>
      </section>

      {/* Educational Content Section */}
      <section
        className="py-12 bg-gradient-to-b from-gray-50 to-white"
        aria-label="Educational Content"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Area and Area Calculations
            </h2>

            {/* What is Area */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What is Area?</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <strong>Area</strong> is the measurement of the space inside a two-dimensional shape. It's
                expressed in square units (square feet, square meters, square inches, etc.) and represents
                how much surface a shape covers.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Understanding area is essential for many real-world applications: calculating flooring
                needs, determining paint coverage, planning garden layouts, measuring property size, and
                solving geometry problems.
              </p>
            </div>

            {/* Area Formulas */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Area Formulas for Common Shapes</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">Rectangle</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Formula:</strong> Area = Length × Width
                  </p>
                  <p className="text-xs text-gray-600">
                    Example: A rectangle 10 ft × 8 ft = 80 sq ft
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-bold text-gray-900 mb-2">Circle</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Formula:</strong> Area = π × r² (where r = radius)
                  </p>
                  <p className="text-xs text-gray-600">
                    Example: A circle with radius 5 ft = π × 25 = 78.54 sq ft
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-2">Triangle</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Formula:</strong> Area = (Base × Height) ÷ 2
                  </p>
                  <p className="text-xs text-gray-600">
                    Example: A triangle with base 10 ft and height 8 ft = (10 × 8) ÷ 2 = 40 sq ft
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <h4 className="font-bold text-gray-900 mb-2">Trapezoid</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Formula:</strong> Area = ((Base₁ + Base₂) × Height) ÷ 2
                  </p>
                  <p className="text-xs text-gray-600">
                    Example: Bases 10 ft and 8 ft, height 6 ft = ((10 + 8) × 6) ÷ 2 = 54 sq ft
                  </p>
                </div>

                <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                  <h4 className="font-bold text-gray-900 mb-2">Parallelogram</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Formula:</strong> Area = Base × Height
                  </p>
                  <p className="text-xs text-gray-600">
                    Example: Base 10 ft, height 8 ft = 80 sq ft
                  </p>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                  <h4 className="font-bold text-gray-900 mb-2">Ellipse</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Formula:</strong> Area = π × a × b (where a and b are semi-axes)
                  </p>
                  <p className="text-xs text-gray-600">
                    Example: Semi-major axis 5 ft, semi-minor axis 3 ft = π × 5 × 3 = 47.12 sq ft
                  </p>
                </div>
              </div>
            </div>

            {/* Unit Conversions */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Area Unit Conversions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">
                        Unit
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-900">
                        Square Feet
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-900">
                        Square Meters
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">1 Square Foot</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1.00</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">0.0929</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">1 Square Meter</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">10.764</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1.00</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">1 Square Yard</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">9.00</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">0.836</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">1 Acre</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">43,560</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">4,047</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">1 Hectare</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">107,639</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">10,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Irregular Shapes */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Calculating Area of Irregular Shapes</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                For irregular or complex shapes, break them down into basic shapes (rectangles, triangles,
                circles) and calculate each separately:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                <li>Divide the irregular shape into basic geometric shapes</li>
                <li>Calculate the area of each basic shape</li>
                <li>Add all areas together for total area</li>
                <li>For shapes with cutouts, subtract cutout areas from total</li>
              </ol>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Example:</strong> An L-shaped room can be divided into two rectangles. Calculate
                  each rectangle's area separately, then add them together to get the total area.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate the area of a rectangle?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate rectangle area: Area = Length × Width. Example: A rectangle 10 feet
                      long × 8 feet wide = 80 square feet. Simply multiply the length by the width. This
                      formula works for any rectangle, regardless of size. For squares (special
                      rectangles), length equals width, so area = side².
                    </p>
                  </div>
                </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate the area of a circle?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Circle area formula: Area = π × r², where r is the radius (half the diameter).
                      Example: A circle with radius 5 feet has area = π × 5² = 3.14159 × 25 = 78.54 square
                      feet. If you know diameter instead: divide by 2 to get radius, then use the formula.
                      π (pi) ≈ 3.14159.
                    </p>
                  </div>
                </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate the area of a triangle?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Triangle area formula: Area = (Base × Height) ÷ 2. Example: A triangle with base 10
                      feet and height 8 feet has area = (10 × 8) ÷ 2 = 80 ÷ 2 = 40 square feet. The height
                      is the perpendicular distance from the base to the opposite vertex. This formula
                      works for all triangles.
                    </p>
                  </div>
                </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate the area of a trapezoid?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Trapezoid area formula: Area = ((Base₁ + Base₂) × Height) ÷ 2. Example: A trapezoid
                      with bases 10 feet and 8 feet, and height 6 feet has area = ((10 + 8) × 6) ÷ 2 =
                      (18 × 6) ÷ 2 = 108 ÷ 2 = 54 square feet. The two bases are the parallel sides, and
                      height is the perpendicular distance between them.
                    </p>
                  </div>
                </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate the area of an irregular shape?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      For irregular shapes: 1) Break the shape into basic shapes (rectangles, triangles,
                      circles), 2) Calculate area of each basic shape separately, 3) Add all areas
                      together for total area. For shapes with cutouts: Calculate full shape area, subtract
                      cutout areas. Example: L-shaped room = Rectangle 1 + Rectangle 2. This method works
                      for any complex shape.
                    </p>
                  </div>
                </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the difference between area and perimeter?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Area measures the space inside a shape (square units like sq ft, sq m). Perimeter
                      measures the distance around a shape (linear units like feet, meters). Example: A
                      10×8 ft rectangle has area = 80 sq ft (space inside) and perimeter = 36 ft (distance
                      around). Area is 2D (length × width), perimeter is 1D (sum of all sides).
                    </p>
                  </div>
                </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I convert between different area units?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Common area unit conversions: 1 square foot = 0.0929 square meters, 1 square meter =
                      10.764 square feet, 1 square yard = 9 square feet, 1 acre = 43,560 square feet, 1
                      hectare = 10,000 square meters = 2.47 acres. To convert: Multiply by conversion
                      factor. Example: 100 sq ft × 0.0929 = 9.29 sq m. Our calculator automatically
                      converts between units.
                    </p>
                  </div>
                </div>

                <div
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can I calculate area for 3D shapes?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      This calculator calculates 2D area (flat surfaces). For 3D shapes, you need surface
                      area or volume: Surface area = sum of all face areas, Volume = area of base ×
                      height. Example: A box (rectangular prism) has 6 faces - calculate area of each face
                      and add together for total surface area. For volume: length × width × height.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/square-footage-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">Square Footage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate room areas and material estimates</p>
                </Link>
                <Link
                  href="/percentage-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate percentages and ratios</p>
                </Link>
                <Link
                  href="/average-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">Average Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate mean, median, and mode</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

