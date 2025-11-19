import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import RightTriangleCalculator from '@/components/Calculator/RightTriangleCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Right Triangle Calculator - Solve Sides, Angles & Area | AICalculator',
  description: 'Free right triangle calculator to find missing sides, angles, area, and perimeter. Solve using Pythagorean theorem, trigonometric functions, or any 2 known values. Get instant results with step-by-step explanations.',
  keywords: [
    'right triangle calculator',
    'pythagorean theorem calculator',
    'right angle triangle calculator',
    'triangle side calculator',
    'triangle angle calculator',
    'hypotenuse calculator',
    '90 degree triangle',
    'right triangle solver',
    'triangle area calculator',
    'trigonometry calculator',
    'sine cosine tangent calculator',
    'triangle perimeter calculator',
    'geometry calculator',
    'math triangle calculator',
    'triangle calculator online',
    'free triangle calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Right Triangle Calculator - Solve Sides & Angles',
    description: 'Calculate right triangle sides, angles, area, and perimeter instantly. Uses Pythagorean theorem and trigonometry. Free online tool.',
    type: 'website',
    url: getUrl('/right-triangle-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('right-triangle'),
      width: 1200,
      height: 630,
      alt: 'Right Triangle Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Right Triangle Calculator',
    description: 'Calculate right triangle properties instantly',
    images: [getOgImage('right-triangle')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/right-triangle-calculator'),
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

export default function RightTriangleCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/right-triangle-calculator'),
        name: 'Right Triangle Calculator',
        url: getUrl('/right-triangle-calculator'),
        description: 'Calculate right triangle sides, angles, area, perimeter, and other properties using the Pythagorean theorem and trigonometric functions.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate missing sides using Pythagorean theorem',
          'Find angles using trigonometric functions',
          'Calculate area and perimeter',
          'Determine altitude to hypotenuse',
          'Calculate inradius and circumradius',
          'Verify Pythagorean theorem',
          'Support any 2 known values',
          'Step-by-step calculations',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/right-triangle-calculator'),
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
            name: 'Right Triangle Calculator',
            item: getUrl('/right-triangle-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/right-triangle-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I calculate a right triangle with only 2 known values?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can solve a right triangle with any 2 known values using the Pythagorean theorem (a² + b² = c²) and trigonometric functions. If you know two sides, use the theorem to find the third side, then use inverse trig functions to find angles. If you know one side and one angle, use sine, cosine, or tangent to find the other sides. The calculator automatically determines which formulas to use based on your inputs.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the Pythagorean theorem and how is it used?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Pythagorean theorem states that in a right triangle, the square of the hypotenuse (c) equals the sum of squares of the other two sides (a and b): a² + b² = c². This fundamental formula is used to find a missing side when two sides are known. For example, if a=3 and b=4, then c=√(3²+4²)=√(9+16)=√25=5. This only works for right triangles (triangles with a 90° angle).',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I find angles in a right triangle?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To find angles in a right triangle, use inverse trigonometric functions. If you know the sides, use: sin⁻¹(opposite/hypotenuse) for angle A, cos⁻¹(adjacent/hypotenuse) for angle A, or tan⁻¹(opposite/adjacent) for angle A. Remember that angle C is always 90°, and the sum of all three angles equals 180°, so angle B = 90° - angle A. The calculator handles these calculations automatically.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the special right triangles?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The two special right triangles are 30-60-90 and 45-45-90 triangles. In a 45-45-90 triangle, the two legs are equal and the hypotenuse is √2 times a leg. In a 30-60-90 triangle, if the shortest side is x, the other leg is x√3, and the hypotenuse is 2x. These ratios are constant and useful for quick calculations without a calculator.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate the area of a right triangle?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The area of a right triangle is calculated using the formula: Area = (base × height) / 2. For a right triangle, you can use the two perpendicular sides (legs a and b) as the base and height: Area = (a × b) / 2. For example, if a=6 and b=8, then Area = (6 × 8) / 2 = 24 square units. This formula is simpler than the general triangle area formula because the two legs form a right angle.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/right-triangle-calculator'),
        name: 'How to Use the Right Triangle Calculator',
        description: 'Learn how to calculate right triangle properties step by step',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Right Triangle Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Known Values',
            text: 'Input at least 2 known values. You can enter sides (a, b, or c) or angles (A or B). The right angle C is always 90°.',
            url: getStepUrl('/right-triangle-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Click Calculate',
            text: 'Click the Calculate Triangle button. The calculator will determine which formulas to use based on your inputs.',
            url: getStepUrl('/right-triangle-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'View Results',
            text: 'Review all calculated values including missing sides, angles, area, perimeter, altitude, and radii. The Pythagorean theorem verification confirms accuracy.',
            url: getStepUrl('/right-triangle-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Save or Share',
            text: 'Use the Save as Image, Print, or Share buttons to export your results for future reference or to share with others.',
            url: getStepUrl('/right-triangle-calculator', 4),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/right-triangle-calculator'),
        headline: 'Complete Guide to Right Triangle Calculations',
        description: 'Learn how to solve right triangles using the Pythagorean theorem and trigonometry',
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
        image: getOgImage('right-triangle'),
        articleBody: 'A comprehensive guide to calculating right triangle properties including sides, angles, area, and special ratios.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="sr-only">Right Triangle Calculator - Calculate Sides, Angles, Area & Perimeter</h1>

      {/* 面包屑导航 */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Right Triangle Calculator"
        calculatorUrl="/right-triangle-calculator"
      />

      {/* 计算器组件 */}
      <RightTriangleCalculator />

      {/* 教育内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Right Triangles</h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What is a Right Triangle?</h3>
            <p className="text-gray-700 mb-4">
              A right triangle is a triangle with one angle measuring exactly 90 degrees (a right angle). This special property makes right triangles fundamental in geometry, trigonometry, and real-world applications. The side opposite the right angle is called the hypotenuse (c), which is always the longest side. The other two sides are called legs (a and b).
            </p>
            <p className="text-gray-700">
              The right angle is typically denoted by a small square in the corner at vertex C. The two acute angles (A and B) always sum to 90 degrees, making them complementary angles.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">The Pythagorean Theorem</h3>
            <p className="text-gray-700 mb-4">
              The Pythagorean theorem is the cornerstone of right triangle calculations. It states that the square of the hypotenuse equals the sum of the squares of the other two sides:
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="font-mono text-lg text-blue-900">a² + b² = c²</p>
            </div>
            <p className="text-gray-700 mb-4">
              This theorem allows you to find any side of a right triangle if you know the other two sides. For example:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>If a = 3 and b = 4, then c = √(3² + 4²) = √(9 + 16) = √25 = 5</li>
              <li>If a = 5 and c = 13, then b = √(13² - 5²) = √(169 - 25) = √144 = 12</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Trigonometric Functions</h3>
            <p className="text-gray-700 mb-4">
              Right triangles are the basis for trigonometry. The three primary trigonometric functions relate the angles to the side ratios:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Sine (sin)</h4>
                <p className="text-sm text-gray-700">sin(A) = opposite / hypotenuse</p>
                <p className="text-sm text-gray-700">sin(A) = a / c</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Cosine (cos)</h4>
                <p className="text-sm text-gray-700">cos(A) = adjacent / hypotenuse</p>
                <p className="text-sm text-gray-700">cos(A) = b / c</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Tangent (tan)</h4>
                <p className="text-sm text-gray-700">tan(A) = opposite / adjacent</p>
                <p className="text-sm text-gray-700">tan(A) = a / b</p>
              </div>
            </div>
            <p className="text-gray-700">
              These functions allow you to find angles when you know the sides, or find sides when you know an angle. Use inverse functions (sin⁻¹, cos⁻¹, tan⁻¹) to find angles from side ratios.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Special Right Triangles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">45-45-90 Triangle</h4>
                <p className="text-gray-700 mb-2">
                  Also called an isosceles right triangle. Both legs are equal in length.
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Angles: 45°, 45°, 90°</li>
                  <li>Side ratio: 1 : 1 : √2</li>
                  <li>If leg = x, then hypotenuse = x√2</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">30-60-90 Triangle</h4>
                <p className="text-gray-700 mb-2">
                  Half of an equilateral triangle. Has convenient side ratios.
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Angles: 30°, 60°, 90°</li>
                  <li>Side ratio: 1 : √3 : 2</li>
                  <li>If shortest side = x, then hypotenuse = 2x</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-World Applications</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Construction:</strong> Ensuring walls are perpendicular and roofs have correct pitch</li>
              <li><strong>Navigation:</strong> Calculating distances and bearings between locations</li>
              <li><strong>Physics:</strong> Resolving forces and velocities into components</li>
              <li><strong>Surveying:</strong> Measuring heights and distances indirectly</li>
              <li><strong>Architecture:</strong> Designing stable structures and determining dimensions</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Pro Tips</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• Always verify your answer using the Pythagorean theorem</li>
              <li>• Remember that the hypotenuse is always the longest side</li>
              <li>• The two acute angles always sum to 90°</li>
              <li>• Use inverse trig functions to find angles from side ratios</li>
              <li>• Special triangles (30-60-90, 45-45-90) have memorizable ratios</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 相关计算器 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/triangle-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📐</div>
            <h3 className="font-semibold text-gray-900">Triangle Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate any triangle properties</p>
          </a>

          <a
            href="/pythagorean-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔺</div>
            <h3 className="font-semibold text-gray-900">Pythagorean Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Apply Pythagorean theorem</p>
          </a>

          <a
            href="/area-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📏</div>
            <h3 className="font-semibold text-gray-900">Area Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate areas of various shapes</p>
          </a>

          <a
            href="/slope-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Slope Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate slope and angles</p>
          </a>
        </div>
      </section>
    </div>
  );
}

