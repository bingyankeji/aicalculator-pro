import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import SphereCalculator from '@/components/Calculator/SphereCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Sphere Calculator - Volume, Surface Area & Radius | AICalculator',
  description: 'Free sphere calculator to find volume, surface area, radius, and diameter. Enter any one value to calculate all sphere properties instantly with visual 3D representation.',
  keywords: [
    'sphere calculator',
    'sphere volume calculator',
    'sphere surface area calculator',
    'sphere radius calculator',
    'ball calculator',
    '3d sphere calculator',
    'sphere formula calculator',
    'sphere geometry calculator',
    'calculate sphere volume',
    'sphere area calculator',
    'sphere circumference',
    'sphere math calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Sphere Calculator - Volume & Surface Area',
    description: 'Calculate sphere volume, surface area, radius, and diameter instantly. Free 3D geometry calculator with visual representation.',
    type: 'website',
    url: getUrl('/sphere-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('sphere'),
      width: 1200,
      height: 630,
      alt: 'Sphere Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sphere Calculator',
    description: 'Calculate sphere properties instantly',
    images: [getOgImage('sphere')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/sphere-calculator'),
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

export default function SphereCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/sphere-calculator'),
        name: 'Sphere Calculator',
        url: getUrl('/sphere-calculator'),
        description: 'Calculate sphere volume, surface area, radius, diameter, and circumference using standard geometry formulas.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate volume from radius',
          'Calculate surface area',
          'Find radius from volume',
          'Find radius from surface area',
          'Calculate diameter and circumference',
          '3D visual representation',
          'Instant calculations',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/sphere-calculator'),
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
            name: 'Sphere Calculator',
            item: getUrl('/sphere-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/sphere-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I calculate the volume of a sphere?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The volume of a sphere is calculated using the formula V = (4/3)πr³, where r is the radius. For example, if the radius is 5 units, the volume is (4/3)π(5³) = (4/3)π(125) = 523.6 cubic units. Simply enter the radius in the calculator, and it will compute the volume automatically.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the formula for sphere surface area?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The surface area of a sphere is A = 4πr², where r is the radius. This formula calculates the total area of the outer surface. For a sphere with radius 5, the surface area is 4π(5²) = 4π(25) = 314.16 square units. The calculator can also find the radius if you know the surface area.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I find the radius from volume?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To find the radius from volume, use the inverse formula: r = ∛(3V/4π). For example, if the volume is 523.6 cubic units, then r = ∛(3×523.6/4π) = ∛(125) = 5 units. Our calculator automatically performs this calculation when you enter the volume.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between radius and diameter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The radius (r) is the distance from the center of the sphere to any point on its surface. The diameter (d) is the distance across the sphere through its center, which is exactly twice the radius: d = 2r. If the radius is 5 units, the diameter is 10 units.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is a sphere different from a circle?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A circle is a 2D shape (flat) with only area and circumference. A sphere is a 3D shape with volume and surface area. Think of a circle as a flat disk and a sphere as a ball. The sphere formulas use r³ (cube) for volume, while circle formulas use r² (square) for area.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/sphere-calculator'),
        name: 'How to Use the Sphere Calculator',
        description: 'Calculate sphere properties step by step',
        totalTime: 'PT2M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Sphere Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Known Value',
            text: 'Input any one known value: radius, diameter, volume, or surface area. The calculator works with any starting value.',
            url: getStepUrl('/sphere-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Click Calculate',
            text: 'Click the Calculate Sphere button to compute all other properties based on your input.',
            url: getStepUrl('/sphere-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'View Results',
            text: 'See all calculated values including radius, diameter, volume, surface area, and circumference with a 3D visual representation.',
            url: getStepUrl('/sphere-calculator', 3),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/sphere-calculator'),
        headline: 'Complete Guide to Sphere Calculations',
        description: 'Learn how to calculate sphere volume, surface area, and other properties',
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
        image: getOgImage('sphere'),
        articleBody: 'A comprehensive guide to calculating sphere properties including volume, surface area, radius, and diameter.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="sr-only">Sphere Calculator - Calculate Volume, Surface Area, Radius & Diameter</h1>

      {/* 面包屑导航 */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Sphere Calculator"
        calculatorUrl="/sphere-calculator"
      />

      {/* 计算器组件 */}
      <SphereCalculator />

      {/* 教育内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Spheres</h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What is a Sphere?</h3>
            <p className="text-gray-700 mb-4">
              A sphere is a perfectly round 3D shape where every point on the surface is the same distance from the center. Think of balls, planets, and bubbles - they're all spheres. Unlike a circle (which is flat), a sphere occupies space and has volume.
            </p>
            <p className="text-gray-700">
              The radius (r) is the distance from the center to any point on the surface. The diameter (d) is twice the radius and represents the distance across the sphere through its center.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Volume Formula</h3>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <p className="font-mono text-lg text-blue-900">V = (4/3)πr³</p>
              </div>
              <p className="text-gray-700 text-sm">
                The volume measures how much space is inside the sphere. It grows with the cube of the radius, so doubling the radius increases volume by 8 times (2³ = 8).
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Surface Area Formula</h3>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="font-mono text-lg text-green-900">A = 4πr²</p>
              </div>
              <p className="text-gray-700 text-sm">
                The surface area measures the total area of the sphere's outer surface. It's exactly 4 times the area of a circle with the same radius.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-World Applications</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Engineering:</strong> Calculating tank capacities and ball bearings</li>
              <li><strong>Astronomy:</strong> Estimating planet and star volumes</li>
              <li><strong>Medicine:</strong> Measuring cells, tumors, and drug particles</li>
              <li><strong>Sports:</strong> Designing balls for different sports (basketball, soccer, golf)</li>
              <li><strong>Architecture:</strong> Dome designs and spherical structures</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Quick Tips</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• A sphere has the smallest surface area for a given volume of any 3D shape</li>
              <li>• The volume formula has a factor of 4/3, not just π</li>
              <li>• Surface area is 4πr², exactly 4 times a circle's area (πr²)</li>
              <li>• Doubling the radius multiplies volume by 8 and surface area by 4</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 相关计算器 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/circle-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⭕</div>
            <h3 className="font-semibold text-gray-900">Circle Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate circle area and circumference</p>
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
            href="/surface-area-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📐</div>
            <h3 className="font-semibold text-gray-900">Surface Area Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate surface area of 3D objects</p>
          </a>

          <a
            href="/area-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📏</div>
            <h3 className="font-semibold text-gray-900">Area Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate areas of various shapes</p>
          </a>
        </div>
      </section>
    </div>
  );
}

