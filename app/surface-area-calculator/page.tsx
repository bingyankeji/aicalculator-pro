import { Metadata } from 'next';
import SurfaceAreaCalculator from '@/components/Calculator/SurfaceAreaCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Surface Area Calculator - Calculate 3D Shape Surface Areas | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Free online surface area calculator for 3D shapes including cube, sphere, cylinder, cone, rectangular prism, and pyramid. Calculate surface areas with step-by-step solutions and formulas.`,
  keywords: [
    'surface area calculator',
    '3d surface area',
    'cube surface area',
    'sphere surface area',
    'cylinder surface area',
    'cone surface area',
    'rectangular prism surface area',
    'pyramid surface area',
    'geometry calculator',
    'area calculator 3d',
    'total surface area',
    'lateral surface area',
    'paint calculator',
    'wrapping calculator',
    'material calculator',
    'geometry formulas',
    '3d shapes calculator',
    'prism surface area',
    'solid geometry',
    'calculate surface area'
  ],
  alternates: {
    canonical: getUrl('/surface-area-calculator')
  },
  openGraph: {
    title: `Surface Area Calculator - Calculate 3D Shape Surface Areas`,
    description: `Free online surface area calculator for 3D shapes including cube, sphere, cylinder, cone, rectangular prism, and pyramid. Calculate surface areas with step-by-step solutions.`,
    url: getUrl('/surface-area-calculator'),
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Surface Area Calculator - Calculate 3D Shape Surface Areas`,
    description: `Free online surface area calculator for 3D shapes with step-by-step solutions and formulas.`,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function SurfaceAreaCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/surface-area-calculator'),
        'name': 'Surface Area Calculator',
        'url': getUrl('/surface-area-calculator'),
        'description': `Calculate surface areas of 3D shapes including cube, sphere, cylinder, cone, rectangular prism, and pyramid with step-by-step solutions.`,
        'applicationCategory': 'CalculatorApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          'Cube surface area calculation',
          'Rectangular prism surface area',
          'Sphere surface area calculation',
          'Cylinder surface area calculation',
          'Cone surface area calculation',
          'Square pyramid surface area',
          'Step-by-step solutions',
          'Formula display',
          'Multiple 3D shapes support',
          'Instant results'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/surface-area-calculator'),
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': getUrl('/')
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Math Calculators',
            'item': getUrl('/calculators/math')
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Surface Area Calculator',
            'item': getUrl('/surface-area-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/surface-area-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is surface area?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Surface area is the total area that the surface of a three-dimensional object occupies. It is measured in square units (e.g., square inches, square meters). For example, a cube with side length 5 has a surface area of 6 × 5² = 150 square units because it has 6 identical square faces.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you calculate the surface area of a cube?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The surface area of a cube is calculated using the formula SA = 6a², where a is the length of one side. Since a cube has 6 identical square faces, and each face has an area of a², the total surface area is 6 times the area of one face.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the formula for the surface area of a sphere?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The surface area of a sphere is calculated using the formula SA = 4πr², where r is the radius of the sphere. This formula represents the total area of the curved surface of the sphere.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you find the surface area of a cylinder?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The surface area of a cylinder is calculated using the formula SA = 2πr(r + h), where r is the radius and h is the height. This includes both circular bases (2πr²) and the lateral surface area (2πrh). The formula can be expanded as SA = 2πr² + 2πrh.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the difference between surface area and volume?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Surface area measures the total area of all surfaces of a 3D object and is expressed in square units (e.g., cm²). Volume measures the space inside a 3D object and is expressed in cubic units (e.g., cm³). Surface area tells you how much material you need to cover an object, while volume tells you how much space it occupies.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you calculate the surface area of a cone?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The surface area of a cone is calculated using the formula SA = πr(r + l), where r is the radius of the base and l is the slant height. This includes the circular base (πr²) and the lateral surface area (πrl). The slant height is the distance from the edge of the base to the apex along the surface.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the surface area formula for a rectangular prism?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The surface area of a rectangular prism (box) is calculated using the formula SA = 2(lw + lh + wh), where l is length, w is width, and h is height. This formula accounts for all 6 rectangular faces: 2 faces of area lw, 2 faces of area lh, and 2 faces of area wh.`
            }
          },
          {
            '@type': 'Question',
            'name': 'Why do we need to calculate surface area?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Surface area calculations are essential for many practical applications: determining how much paint is needed to cover a surface, calculating material requirements for packaging or wrapping, estimating heat transfer rates, designing efficient cooling systems, calculating drug dissolution rates in medicine, and determining the amount of material needed for construction projects.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/surface-area-calculator'),
        'name': 'How to Calculate Surface Area of 3D Shapes',
        'description': 'Learn how to calculate surface areas of various 3D shapes step by step',
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Select the Shape',
            'text': `Choose the 3D shape you want to calculate: cube, rectangular prism, sphere, cylinder, cone, or pyramid.`
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Enter Dimensions',
            'text': `Enter the required dimensions for your selected shape (e.g., side length for cube, radius and height for cylinder).`
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Calculate',
            'text': `Click the "Calculate Surface Area" button to compute the result instantly.`
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Review Results',
            'text': `View the surface area result, along with the formula used and step-by-step calculation breakdown.`
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/surface-area-calculator'),
        'headline': 'Surface Area Calculator - Complete Guide to 3D Shape Surface Areas',
        'description': `Comprehensive guide to calculating surface areas of 3D shapes including cubes, spheres, cylinders, cones, and prisms with formulas and examples.`,
        'datePublished': '2024-01-01',
        'dateModified': new Date().toISOString().split('T')[0],
        'author': {
          '@type': 'Organization',
          'name': process.env.NEXT_PUBLIC_SITE_NAME
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Surface Area Calculator - Calculate 3D Shape Surface Areas with Step-by-Step Solutions</h1>
      
      {/* Calculator Component */}
      <SurfaceAreaCalculator />

      {/* SEO Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Surface Area Calculator</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our <strong>Surface Area Calculator</strong> is a comprehensive and free online tool designed to calculate the surface areas 
            of various three-dimensional shapes including cubes, rectangular prisms, spheres, cylinders, cones, and pyramids. Whether 
            you're a student learning geometry, an engineer working on design projects, or a professional calculating material 
            requirements, our calculator provides instant, accurate results with detailed step-by-step explanations.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Understanding surface area is crucial for many real-world applications, from determining how much paint is needed to cover 
            a surface to calculating material requirements for packaging. Our calculator not only computes surface areas but also 
            shows you the formulas and calculation steps, making it an excellent learning tool.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Supported 3D Shapes</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li><strong>Cube:</strong> Calculate surface area using SA = 6a², where a is the side length</li>
            <li><strong>Rectangular Prism:</strong> Find surface area with SA = 2(lw + lh + wh)</li>
            <li><strong>Sphere:</strong> Compute surface area using SA = 4πr²</li>
            <li><strong>Cylinder:</strong> Calculate total surface area with SA = 2πr(r + h)</li>
            <li><strong>Cone:</strong> Find surface area using SA = πr(r + l), where l is slant height</li>
            <li><strong>Square Pyramid:</strong> Calculate surface area with SA = b² + 2bl</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li><strong>Multiple 3D Shapes:</strong> Support for 6 common three-dimensional shapes</li>
            <li><strong>Step-by-Step Solutions:</strong> Detailed calculation breakdowns for learning</li>
            <li><strong>Formula Display:</strong> See the exact formula used for each shape</li>
            <li><strong>Instant Results:</strong> Get accurate surface area calculations immediately</li>
            <li><strong>Easy Shape Switching:</strong> Quick tabs to switch between different shapes</li>
            <li><strong>Educational Explanations:</strong> Understand why each formula works</li>
            <li><strong>Formula Reference:</strong> Quick access to all surface area formulas</li>
            <li><strong>Mobile-Friendly:</strong> Works perfectly on all devices</li>
            <li><strong>100% Free:</strong> No registration or payment required</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Surface Area</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is Surface Area?</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Surface area is the total area that the surface of a three-dimensional object occupies. It represents the sum of the 
            areas of all faces or surfaces of the object and is measured in square units (e.g., square inches, square meters, square 
            feet). Understanding surface area is essential for practical applications such as determining material requirements, 
            calculating costs for painting or coating, and designing efficient packaging.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Surface Area vs. Volume</h3>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <ul className="space-y-3 text-gray-700">
              <li><strong>Surface Area:</strong> Measures the exterior area (2D measurement in square units)</li>
              <li><strong>Volume:</strong> Measures the interior space (3D measurement in cubic units)</li>
              <li><strong>Example:</strong> A cube with side 5 has surface area 150 units² and volume 125 units³</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Practical Applications</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li><strong>Construction & Architecture:</strong> Calculate paint, siding, or roofing material requirements</li>
            <li><strong>Packaging & Shipping:</strong> Determine wrapping paper or material needed for boxes</li>
            <li><strong>Manufacturing:</strong> Estimate coating, plating, or finishing material costs</li>
            <li><strong>Engineering:</strong> Design heat exchangers, cooling systems, and surface treatments</li>
            <li><strong>Medicine:</strong> Calculate drug dissolution rates and bioavailability</li>
            <li><strong>Environmental Science:</strong> Measure surface exposure in pollution studies</li>
            <li><strong>Education:</strong> Learn geometry and spatial reasoning concepts</li>
            <li><strong>Interior Design:</strong> Calculate wallpaper, tile, or flooring requirements</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Surface Area Formulas Explained</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Cube: SA = 6a²</h3>
          <p className="text-gray-700 mb-4">
            A cube has 6 identical square faces. Each face has an area of a², so the total surface area is 6 × a². 
            Example: A cube with side 5 has SA = 6 × 25 = 150 square units.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Rectangular Prism: SA = 2(lw + lh + wh)</h3>
          <p className="text-gray-700 mb-4">
            A rectangular prism has 6 rectangular faces: 2 faces of area lw, 2 of area lh, and 2 of area wh. 
            The formula accounts for all faces by calculating 2(lw + lh + wh).
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Sphere: SA = 4πr²</h3>
          <p className="text-gray-700 mb-4">
            A sphere's surface area is 4 times the area of its largest circle (πr²). This formula represents the 
            continuous curved surface of the sphere.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. Cylinder: SA = 2πr(r + h)</h3>
          <p className="text-gray-700 mb-4">
            A cylinder has two circular bases (total area 2πr²) and a lateral surface (area 2πrh). The formula 
            2πr(r + h) = 2πr² + 2πrh accounts for both components.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">5. Cone: SA = πr(r + l)</h3>
          <p className="text-gray-700 mb-4">
            A cone has a circular base (area πr²) and a lateral surface (area πrl, where l is the slant height). 
            The total is πr² + πrl = πr(r + l).
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">6. Square Pyramid: SA = b² + 2bl</h3>
          <p className="text-gray-700 mb-4">
            A square pyramid has a square base (area b²) and 4 triangular faces. The total area of the 4 triangular 
            faces is 2bl, making the total surface area b² + 2bl.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Tips for Calculating Surface Area</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li><strong>Identify the Shape:</strong> Correctly determine which 3D shape you're working with</li>
            <li><strong>Measure Carefully:</strong> Ensure all measurements use the same units</li>
            <li><strong>Know Your Formulas:</strong> Memorize or have quick access to the relevant formulas</li>
            <li><strong>Break Down Complex Shapes:</strong> Divide complex objects into simpler geometric shapes</li>
            <li><strong>Check Your Units:</strong> Surface area is always in square units (units²)</li>
            <li><strong>Use π Accurately:</strong> Use at least 3.14159 for π, or keep π symbolic until the final step</li>
            <li><strong>Verify Results:</strong> Does your answer make sense for the given dimensions?</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Surface Area Calculations</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Cube Examples:</h3>
            <p className="text-gray-700 mb-4 font-mono text-sm">
              Side 1: SA = 6 units²<br />
              Side 2: SA = 24 units²<br />
              Side 5: SA = 150 units²<br />
              Side 10: SA = 600 units²
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Sphere Examples:</h3>
            <p className="text-gray-700 font-mono text-sm">
              Radius 1: SA ≈ 12.57 units²<br />
              Radius 5: SA ≈ 314.16 units²<br />
              Radius 10: SA ≈ 1256.64 units²
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Use Our Surface Area Calculator?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our Surface Area Calculator stands out for its ease of use, accuracy, and educational value. Unlike basic calculators 
            that only show final results, we provide comprehensive step-by-step solutions that help you understand the mathematical 
            process. The intuitive interface allows you to quickly switch between different 3D shapes, making it perfect for students, 
            educators, and professionals.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you need to calculate surface area for a homework assignment, design project, or real-world application, our 
            calculator provides instant, accurate results with clear explanations. The formula reference section ensures you always 
            have quick access to the surface area formulas you need. Best of all, it's completely free and works perfectly on any device.
          </p>
        </section>
      </article>
    </div>
  );
}

