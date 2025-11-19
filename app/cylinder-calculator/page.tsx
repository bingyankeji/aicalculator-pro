import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import CylinderCalculator from '@/components/Calculator/CylinderCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Cylinder Calculator - Volume, Surface Area & Dimensions | AICalculator',
  description: 'Free cylinder calculator to find volume, surface area, radius, and height. Supports both solid and hollow cylinders with 3D visual representation.',
  keywords: [
    'cylinder calculator',
    'cylinder volume calculator',
    'cylinder surface area calculator',
    'hollow cylinder calculator',
    'pipe volume calculator',
    'tube calculator',
    'cylinder dimensions',
    'cylinder formula calculator',
    'calculate cylinder volume',
    'cylinder area calculator',
    'cylindrical tank calculator',
    '3d cylinder calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Cylinder Calculator - Volume & Surface Area',
    description: 'Calculate cylinder volume, surface area, and dimensions instantly. Supports solid and hollow cylinders with 3D visualization.',
    type: 'website',
    url: getUrl('/cylinder-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('cylinder'),
      width: 1200,
      height: 630,
      alt: 'Cylinder Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cylinder Calculator',
    description: 'Calculate cylinder properties instantly',
    images: [getOgImage('cylinder')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/cylinder-calculator'),
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

export default function CylinderCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/cylinder-calculator'),
        name: 'Cylinder Calculator',
        url: getUrl('/cylinder-calculator'),
        description: 'Calculate cylinder volume, surface area, and dimensions for both solid and hollow cylinders.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate volume from radius and height',
          'Calculate surface area',
          'Hollow cylinder support (pipes, tubes)',
          'Calculate dimensions from volume',
          '3D visual representation',
          'Base area and lateral area calculations',
          'Instant results',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/cylinder-calculator'),
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: getUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Math & Numbers',
            item: getUrl('/math-numbers'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Cylinder Calculator',
            item: getUrl('/cylinder-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/cylinder-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I calculate the volume of a cylinder?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The volume of a cylinder is V = πr²h, where r is the radius and h is the height. For example, if radius is 5 and height is 10, then V = π(5²)(10) = π(25)(10) = 785.4 cubic units. For hollow cylinders, subtract the inner cylinder\'s volume: V = π(r² - rᵢ²)h.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the surface area formula for a cylinder?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The surface area of a solid cylinder is A = 2πr² + 2πrh, which includes two circular bases (2πr²) and the lateral surface (2πrh). For a cylinder with radius 5 and height 10: A = 2π(5²) + 2π(5)(10) = 50π + 100π = 471.2 square units.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate a hollow cylinder (pipe or tube)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For a hollow cylinder, enter both the outer radius (r) and inner radius (rᵢ). The volume becomes V = π(r² - rᵢ²)h. For example, with outer radius 5, inner radius 3, and height 10: V = π(25 - 9)(10) = 160π = 502.7 cubic units. The calculator handles all hollow cylinder calculations automatically.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between lateral area and surface area?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Lateral area is only the curved side surface (2πrh), excluding the top and bottom. Surface area includes everything: both bases plus the lateral surface (2πr² + 2πrh). Lateral area is useful for calculating paint or wrapping material for just the sides.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I find the height if I know the volume and radius?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Rearrange the formula: h = V/(πr²). For example, if volume is 785.4 and radius is 5, then h = 785.4/(π × 25) = 785.4/78.54 = 10 units. Our calculator can compute any missing dimension when you provide the others.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/cylinder-calculator'),
        name: 'How to Use the Cylinder Calculator',
        description: 'Calculate cylinder properties step by step',
        totalTime: 'PT2M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Cylinder Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Dimensions',
            text: 'Input the radius and height of your cylinder. For hollow cylinders (pipes, tubes), also enter the inner radius.',
            url: getStepUrl('/cylinder-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Click Calculate',
            text: 'Click the Calculate button to compute volume, surface area, and other properties instantly.',
            url: getStepUrl('/cylinder-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'View Results & Visualization',
            text: 'See all calculated values including volume, surface area, lateral area, and base area with a 3D visual representation of your cylinder.',
            url: getStepUrl('/cylinder-calculator', 3),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/cylinder-calculator'),
        headline: 'Complete Guide to Cylinder Calculations',
        description: 'Learn how to calculate cylinder volume, surface area, and dimensions for solid and hollow cylinders',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
        datePublished: '2024-01-01',
        dateModified: '2024-11-19',
        image: getOgImage('cylinder'),
        articleBody: 'A comprehensive guide to calculating cylinder properties including volume, surface area, and support for hollow cylinders.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="sr-only">Cylinder Calculator - Calculate Volume, Surface Area & Dimensions</h1>

      {/* 面包屑导航 */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Cylinder Calculator"
        calculatorUrl="/cylinder-calculator"
      />

      {/* 计算器组件 */}
      <CylinderCalculator />

      {/* 教育内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-purple max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Cylinders</h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What is a Cylinder?</h3>
            <p className="text-gray-700 mb-4">
              A cylinder is a 3D shape with two parallel circular bases connected by a curved surface. Common examples include cans, pipes, tubes, tanks, and barrels. The cylinder is defined by its radius (r) and height (h).
            </p>
            <p className="text-gray-700">
              Cylinders can be solid (like a rod) or hollow (like a pipe). Hollow cylinders have an inner radius (rᵢ) in addition to the outer radius, creating a wall thickness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Volume Formula</h3>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
                <p className="font-mono text-lg text-purple-900 mb-2">Solid: V = πr²h</p>
                <p className="font-mono text-lg text-purple-900">Hollow: V = π(r² - rᵢ²)h</p>
              </div>
              <p className="text-gray-700 text-sm">
                Volume measures the space inside the cylinder. For hollow cylinders, subtract the inner cylinder's volume from the outer cylinder's volume.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Surface Area Formula</h3>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="font-mono text-lg text-green-900">A = 2πr² + 2πrh</p>
              </div>
              <p className="text-gray-700 text-sm">
                Surface area includes two circular bases (2πr²) plus the lateral (curved) surface (2πrh). Hollow cylinders have additional inner surfaces.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-World Applications</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Storage Tanks:</strong> Calculate fuel, water, or chemical storage capacity</li>
              <li><strong>Pipes & Tubes:</strong> Determine flow volume and material requirements</li>
              <li><strong>Cans & Containers:</strong> Design packaging with optimal dimensions</li>
              <li><strong>Construction:</strong> Calculate concrete volume for columns and piles</li>
              <li><strong>Manufacturing:</strong> Design cylindrical parts and estimate material costs</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">Quick Tips</h3>
            <ul className="space-y-2 text-purple-800">
              <li>• Base area is πr², and there are two bases in a cylinder</li>
              <li>• Lateral area (curved surface) is 2πrh, like "unrolling" the cylinder</li>
              <li>• For hollow cylinders: wall thickness = outer radius - inner radius</li>
              <li>• Doubling the radius multiplies volume by 4 (because r²)</li>
              <li>• Doubling the height doubles the volume (linear relationship)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 相关计算器 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/sphere-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚽</div>
            <h3 className="font-semibold text-gray-900">Sphere Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate sphere volume and area</p>
          </a>

          <a
            href="/cone-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔺</div>
            <h3 className="font-semibold text-gray-900">Cone Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate cone volume and surface area</p>
          </a>

          <a
            href="/volume-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📦</div>
            <h3 className="font-semibold text-gray-900">Volume Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate volume of various 3D shapes</p>
          </a>

          <a
            href="/circle-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⭕</div>
            <h3 className="font-semibold text-gray-900">Circle Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate circle area and circumference</p>
          </a>
        </div>
      </section>
    </div>
  );
}

