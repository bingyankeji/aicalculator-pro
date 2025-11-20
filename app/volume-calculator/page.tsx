import type { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import VolumeCalculator from "@/components/Calculator/VolumeCalculator";
import Link from "next/link";
import { getUrl } from '@/config/site';

export const metadata: Metadata = {
  title: "Volume Calculator (Free, No signup) - 3D Volume | AICalculator",
  description:
    "Free volume calculator with no sign-up required. For 15+ 3D shapes including cube, sphere, cylinder, cone, pyramid. Calculate volume, surface area with step-by-step formulas and material estimates.",
  keywords: [
    "volume calculator",
    "free volume calculator",
    "volume calculator no signup",
    "3d shape calculator",
    "cube volume calculator",
    "sphere volume calculator",
    "cylinder volume calculator",
    "cone volume calculator",
    "surface area calculator",
    "geometry calculator",
    "volume formula",
    "cubic volume",
    "material calculator",
    "concrete calculator",
    "paint calculator",
    "capacity calculator",
    "3d geometry",
  ],
  openGraph: {
    title: "Volume Calculator (Free, No signup) - AICalculator",
    description:
      "Free volume calculator with no sign-up required. Calculate volume and surface area for cubes, spheres, cylinders, cones and more. Includes material estimates and real-world applications.",
    type: "website",
    url: getUrl('/volume-calculator'),
    siteName: "AI Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volume Calculator (Free, No signup) - AICalculator",
    description:
      "Free volume calculator with no sign-up required. For 15+ 3D shapes. Calculate volume, surface area with formulas and material estimates.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: getUrl('/volume-calculator'),
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
      "name": "Volume Calculator",
      "url": getUrl('/volume-calculator'),
      "description": "Calculate volume and surface area for 15+ 3D shapes including cubes, spheres, cylinders, cones, pyramids with step-by-step formulas.",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Calculate volume for 15+ 3D shapes",
        "Surface area calculations with formulas",
        "Material estimates (concrete, paint, water)",
        "Step-by-step formula explanations",
        "Real-world application examples",
        "Interactive 3D shape selection",
        "Unit conversions and measurements",
        "Share and save calculations"
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
          "name": "Volume Calculator",
          "item": getUrl('/volume-calculator')
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do you calculate the volume of a cube?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The volume of a cube is calculated using the formula V = s³, where s is the length of one side. For example, a cube with 5-unit sides has a volume of 5³ = 125 cubic units."
          }
        },
        {
          "@type": "Question",
          "name": "What is the formula for sphere volume?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The volume of a sphere is V = (4/3)πr³, where r is the radius. This formula calculates the space inside a perfectly round 3D object."
          }
        },
        {
          "@type": "Question",
          "name": "How do you find cylinder volume?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cylinder volume is calculated with V = πr²h, where r is the radius of the circular base and h is the height. This works for any cylindrical container or pipe."
          }
        },
        {
          "@type": "Question",
          "name": "What shapes can this volume calculator handle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our calculator supports 15+ shapes including cube, sphere, cylinder, cone, rectangular prism, triangular prism, pyramid, ellipsoid, hemisphere, and more."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate are the material estimates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Material estimates are based on standard conversions: 1 cubic yard = 27 cubic feet for concrete, 1 cubic foot = 7.48 gallons for water capacity, and surface area equals paint coverage in square feet."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use this for construction projects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! The calculator provides concrete volume in cubic yards, paint coverage in square feet, and water capacity in gallons - all useful for construction, landscaping, and DIY projects."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Calculate Volume of 3D Shapes",
      "description": "Step-by-step guide to calculate volume and surface area of common 3D shapes",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Select Shape",
          "text": "Choose the 3D shape you want to calculate from our selection of cubes, spheres, cylinders, cones, and more."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Enter Dimensions",
          "text": "Input the required measurements such as radius, height, length, width, or side length depending on your selected shape."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "View Results",
          "text": "Get instant volume and surface area calculations with step-by-step formulas and material estimates."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Apply Results",
          "text": "Use the calculations for your project with material estimates for concrete, paint, or water capacity."
        }
      ]
    }
  ]
} as const;

export default function VolumeCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Volume Calculator - Calculate 3D Shape Volume and Surface Area</h1>
      
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link href="/math-numbers" className="hover:text-gray-700">Math & Numbers</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Volume Calculator</span>
          </div>
        </div>
      </nav>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VolumeCalculator />
          
          {/* Educational Content Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding Volume and 3D Shape Calculations
            </h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p>
                Volume is the amount of three-dimensional space enclosed by a shape or object. 
                It's measured in cubic units such as cubic meters (m³), cubic feet (ft³), or cubic inches (in³). 
                Understanding volume calculations is essential for construction, engineering, manufacturing, 
                cooking, and many everyday applications.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common 3D Shapes and Their Volume Formulas</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">📦 Cube</h4>
                  <p className="text-blue-800 mb-2"><strong>Formula:</strong> V = s³</p>
                  <p className="text-blue-700 text-sm">Where s is the side length. All sides are equal in a cube.</p>
                  <p className="text-blue-700 text-sm mt-2"><strong>Example:</strong> A 4-foot cube has volume = 4³ = 64 ft³</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-3">⚽ Sphere</h4>
                  <p className="text-green-800 mb-2"><strong>Formula:</strong> V = (4/3)πr³</p>
                  <p className="text-green-700 text-sm">Where r is the radius from center to surface.</p>
                  <p className="text-green-700 text-sm mt-2"><strong>Example:</strong> A ball with 3-inch radius has volume ≈ 113.1 in³</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">🥫 Cylinder</h4>
                  <p className="text-purple-800 mb-2"><strong>Formula:</strong> V = πr²h</p>
                  <p className="text-purple-700 text-sm">Where r is base radius and h is height.</p>
                  <p className="text-purple-700 text-sm mt-2"><strong>Example:</strong> A can with 2-inch radius and 6-inch height has volume ≈ 75.4 in³</p>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                  <h4 className="text-lg font-bold text-orange-900 mb-3">🍦 Cone</h4>
                  <p className="text-orange-800 mb-2"><strong>Formula:</strong> V = (1/3)πr²h</p>
                  <p className="text-orange-700 text-sm">Where r is base radius and h is height from base to tip.</p>
                  <p className="text-orange-700 text-sm mt-2"><strong>Example:</strong> A cone with 3-foot radius and 9-foot height has volume ≈ 84.8 ft³</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Real-World Applications</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">🏗️ Construction</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Calculate concrete needed for foundations</li>
                    <li>• Determine paint coverage for surfaces</li>
                    <li>• Size storage tanks and containers</li>
                    <li>• Plan material quantities for projects</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">🎓 Education</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Geometry and mathematics learning</li>
                    <li>• Physics and engineering problems</li>
                    <li>• Science fair projects</li>
                    <li>• Homework and test preparation</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">🏠 Home & DIY</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Pool and spa capacity calculations</li>
                    <li>• Garden bed soil requirements</li>
                    <li>• Storage container sizing</li>
                    <li>• Cooking and baking measurements</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Volume vs Surface Area</h3>
              
              <p>
                While volume measures the space inside a 3D object, surface area measures the total area 
                of all surfaces that form the boundary of the object. Both measurements are important:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Volume</strong> helps determine capacity, material needs, and space requirements</li>
                <li><strong>Surface Area</strong> is crucial for painting, coating, heat transfer, and material covering</li>
                <li>Our calculator provides both measurements with accurate formulas for each shape</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tips for Accurate Measurements</h3>
              
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 mt-6">
                <ul className="text-yellow-800 space-y-2">
                  <li>• Always use consistent units (all in feet, meters, etc.)</li>
                  <li>• Measure twice to ensure accuracy, especially for expensive materials</li>
                  <li>• Add 5-10% extra for waste when ordering materials</li>
                  <li>• Consider irregular shapes by breaking them into simpler geometric forms</li>
                  <li>• Use our material estimates as starting points - consult professionals for critical projects</li>
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
                <p className="text-xs text-gray-600 mt-1">Calculate 2D shape areas</p>
              </Link>
              <Link href="/square-footage-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Square Footage Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Room and floor area calculations</p>
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
