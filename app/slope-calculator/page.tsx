import { Metadata } from 'next';
import SlopeCalculator from '@/components/Calculator/SlopeCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Slope Calculator - Calculate Slope, Angle & Grade Between Two Points | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Free online slope calculator finds slope, angle, percent grade, and line equations between two points. Includes slope-intercept form, point-slope form, and practical applications for construction and design.`,
  keywords: [
    'slope calculator',
    'calculate slope',
    'slope formula calculator',
    'find slope between two points',
    'slope angle calculator',
    'percent grade calculator',
    'slope intercept calculator',
    'point slope calculator',
    'gradient calculator',
    'line slope calculator',
    'rise over run calculator',
    'slope of a line calculator',
    'slope from two points',
    'slope equation calculator',
    'vertical line slope',
    'horizontal line slope',
    'parallel lines slope',
    'perpendicular lines slope',
    'slope to angle converter',
    'percent slope calculator',
    'road grade calculator',
    'ramp slope calculator',
    'roof pitch calculator',
    'driveway slope calculator'
  ],
  alternates: {
    canonical: getUrl('/slope-calculator')
  },
  openGraph: {
    title: `Slope Calculator - Calculate Slope, Angle & Grade`,
    description: `Calculate slope, angle, percent grade, and line equations between two points with detailed step-by-step solutions.`,
    url: getUrl('/slope-calculator'),
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Slope Calculator - Find Slope & Angle Between Points`,
    description: `Free calculator for slope, angle, percent grade with applications for construction, design, and mathematics.`,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function SlopeCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/slope-calculator'),
        'name': 'Slope Calculator',
        'url': getUrl('/slope-calculator'),
        'description': `Calculate slope, angle, percent grade, and line equations between two coordinate points. Provides slope-intercept form, point-slope form, general form, and practical recommendations for construction and design applications.`,
        'applicationCategory': 'CalculatorApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          'Calculate slope between two points',
          'Convert slope to angle in degrees',
          'Calculate percent grade',
          'Slope-intercept form (y=mx+b)',
          'Point-slope form',
          'General form (Ax+By+C=0)',
          'Detect vertical and horizontal lines',
          'Identify parallel and perpendicular lines',
          'Slope category classification',
          'Practical application recommendations',
          'Step-by-step calculation breakdown',
          'Instant results with detailed explanations'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/slope-calculator'),
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
            'item': getUrl('/math-numbers')
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Slope Calculator',
            'item': getUrl('/slope-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/slope-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is slope and how is it calculated?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Slope (m) measures the steepness of a line and is calculated using the formula m = (y₂ - y₁) / (x₂ - x₁), also known as "rise over run." The numerator (y₂ - y₁) represents the vertical change (rise), while the denominator (x₂ - x₁) represents the horizontal change (run). For example, if a line passes through points (1, 2) and (4, 8), the slope is (8-2)/(4-1) = 6/3 = 2, meaning the line rises 2 units for every 1 unit it moves to the right. A positive slope indicates an upward trend, negative slope indicates a downward trend, zero slope is horizontal, and undefined slope (when x₂ = x₁) is vertical.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you find the slope of a line from two points?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `To find slope from two points: 1) Identify coordinates (x₁,y₁) and (x₂,y₂), 2) Subtract y-coordinates: y₂ - y₁ (rise), 3) Subtract x-coordinates: x₂ - x₁ (run), 4) Divide rise by run: m = (y₂-y₁)/(x₂-x₁). Example: Points (2,3) and (5,9). Rise = 9-3 = 6, Run = 5-2 = 3, Slope = 6/3 = 2. Important: If x₂ = x₁, the line is vertical with undefined slope. If y₂ = y₁, the line is horizontal with slope = 0. The order of points doesn't matter as long as you're consistent.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the difference between slope, angle, and percent grade?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Slope, angle, and percent grade are three ways to measure steepness. Slope (m) is the ratio of vertical to horizontal change (rise/run). Angle (θ) is the inclination in degrees, calculated as θ = arctan(m). For example, slope of 1 equals 45°. Percent grade is slope expressed as a percentage: Grade% = m × 100. A slope of 0.05 is 5% grade or about 2.86°. In construction, gentle slopes (0-5%) are used for wheelchair ramps, moderate slopes (5-15%) for driveways, steep slopes (15-30%) for ski slopes, and very steep (>30%) require stairs or special equipment.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What are parallel and perpendicular slopes?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Parallel lines have identical slopes (m₁ = m₂), meaning they never intersect and maintain constant distance. For example, lines with slopes 3 and 3 are parallel. Perpendicular lines have slopes that are negative reciprocals (m₁ × m₂ = -1), intersecting at 90° angles. If one line has slope 2, a perpendicular line has slope -1/2. This principle is crucial in construction for creating square corners and in coordinate geometry. Special cases: Horizontal lines (slope=0) are perpendicular to vertical lines (undefined slope). When designing roads, drainage, or structures, understanding parallel and perpendicular relationships ensures proper alignment and functionality.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is slope-intercept form and how is it used?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Slope-intercept form is y = mx + b, where m is slope and b is y-intercept (where the line crosses the y-axis). This is the most common form for linear equations because it clearly shows both the steepness (m) and starting point (b). To find b from two points: calculate slope m, then substitute one point into y = mx + b and solve for b. Example: Points (1,3) and (2,5) give slope m=2. Using point (1,3): 3 = 2(1) + b, so b=1. Final equation: y = 2x + 1. This form is essential for graphing lines, analyzing trends in data, and making predictions in fields like economics, physics, and engineering.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is a good slope for different applications?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Optimal slopes vary by application. Wheelchair ramps: maximum 8.33% (1:12 ratio) per ADA standards. Sidewalks: 1-2% for drainage without difficulty walking. Driveways: 5-15% maximum, steeper requires careful design. Roads: 3-8% typical, 15% maximum for mountain roads. Roofs: 4:12 to 12:12 pitch (33-100% grade) depending on materials and climate. Stairs: 30-35° angle (58-70% grade). Ski slopes: 20-25% (green/beginner), 40-50% (blue/intermediate), 70%+ (black/expert). Farmland: 3-8% prevents erosion while allowing drainage. Building codes and local regulations specify maximum slopes for safety, so always consult applicable standards for your project.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/slope-calculator'),
        'name': 'How to Calculate Slope Between Two Points',
        'description': 'Step-by-step guide to calculating slope, angle, and percent grade using coordinate points',
        'totalTime': 'PT3M',
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Identify the Two Points',
            'text': `Label your two points as (x₁, y₁) and (x₂, y₂). For example, Point 1 could be (2, 5) and Point 2 could be (6, 13). The order doesn't matter as long as you're consistent.`,
            'url': getStepUrl('/slope-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Enter First Point Coordinates',
            'text': `Input the x₁ and y₁ values for your first point into the calculator. These represent the horizontal and vertical position of your first coordinate.`,
            'url': getStepUrl('/slope-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Enter Second Point Coordinates',
            'text': `Input the x₂ and y₂ values for your second point. The calculator will use these coordinates along with the first point to calculate the slope.`,
            'url': getStepUrl('/slope-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Click Calculate',
            'text': `Press the "Calculate Slope" button to compute all slope-related values including slope (m), angle (θ), percent grade, and line equations in multiple forms.`,
            'url': getStepUrl('/slope-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            'position': 5,
            'name': 'Review Results and Recommendations',
            'text': `Examine the calculated slope, angle, and percent grade. The calculator categorizes the slope (gentle, moderate, steep, etc.) and provides practical recommendations for applications like ramps, driveways, or ski slopes.`,
            'url': getStepUrl('/slope-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            'position': 6,
            'name': 'View Line Equations',
            'text': `Check the slope-intercept form (y=mx+b), point-slope form, and general form (Ax+By+C=0) to use the line equation in your mathematical analysis or graphing needs.`,
            'url': getStepUrl('/slope-calculator', 6)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/slope-calculator'),
        'headline': 'Slope Calculator - Complete Guide to Calculating and Understanding Slope',
        'description': `Comprehensive guide to calculating slope, angle, and percent grade between two points, with formulas, examples, and practical applications for construction, design, and mathematics.`,
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
      <h1 className="sr-only">Slope Calculator - Calculate Slope, Angle & Percent Grade Between Two Points</h1>
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" 
              itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/math-numbers" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Math & Numbers</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Slope Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <SlopeCalculator />

      {/* Educational Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Slope Calculator</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our <strong>Slope Calculator</strong> is a comprehensive, free online tool designed to calculate the slope, angle, and percent grade between any two coordinate points. Whether you're a student learning coordinate geometry, an engineer designing roads and ramps, an architect planning accessible structures, or a construction professional calculating roof pitches, our calculator provides instant, accurate results with detailed step-by-step explanations and practical recommendations.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Understanding slope is fundamental to mathematics, engineering, construction, and design. Our calculator not only computes the slope value but also converts it to angles and percent grades, displays multiple forms of line equations (slope-intercept, point-slope, and general forms), categorizes slopes by steepness, and provides specific recommendations for real-world applications from wheelchair ramps to ski slopes.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Slope: The Basics</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is Slope?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Slope is a measure of the steepness or inclination of a line. It describes how much a line rises or falls vertically (y-direction) for every unit of horizontal movement (x-direction). In mathematical terms, slope is the ratio of the vertical change to the horizontal change, commonly expressed as "rise over run."
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="font-mono text-2xl text-center mb-4 text-gray-900">m = (y₂ - y₁) / (x₂ - x₁)</p>
            <p className="text-gray-700 text-center">
              Where m is slope, (x₁, y₁) and (x₂, y₂) are two points on the line
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Types of Slopes</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Positive Slope</strong> (m &gt; 0): The line rises from left to right. As x increases, y increases. Example: m = 2 means the line goes up 2 units for every 1 unit to the right.</li>
            <li><strong>Negative Slope</strong> (m &lt; 0): The line falls from left to right. As x increases, y decreases. Example: m = -3 means the line goes down 3 units for every 1 unit to the right.</li>
            <li><strong>Zero Slope</strong> (m = 0): A horizontal line. All points have the same y-coordinate. The line neither rises nor falls.</li>
            <li><strong>Undefined Slope</strong>: A vertical line. All points have the same x-coordinate. Division by zero makes the slope undefined.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Calculate Slope</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Step-by-Step Calculation</h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-6">
            <li><strong>Identify the two points:</strong> Label them as (x₁, y₁) and (x₂, y₂). The order doesn't matter as long as you're consistent.</li>
            <li><strong>Calculate the vertical change (rise):</strong> Subtract the y-coordinates: Δy = y₂ - y₁</li>
            <li><strong>Calculate the horizontal change (run):</strong> Subtract the x-coordinates: Δx = x₂ - x₁</li>
            <li><strong>Divide rise by run:</strong> m = Δy / Δx = (y₂ - y₁) / (x₂ - x₁)</li>
            <li><strong>Simplify if possible:</strong> Reduce the fraction to its simplest form</li>
          </ol>

          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example Calculation</h4>
            <p className="text-gray-700 mb-3">Find the slope of the line passing through points A(2, 3) and B(6, 11).</p>
            <div className="space-y-2 text-gray-700 font-mono text-sm">
              <p>Step 1: Identify points: (x₁, y₁) = (2, 3) and (x₂, y₂) = (6, 11)</p>
              <p>Step 2: Calculate rise: Δy = 11 - 3 = 8</p>
              <p>Step 3: Calculate run: Δx = 6 - 2 = 4</p>
              <p>Step 4: Calculate slope: m = 8 / 4 = 2</p>
              <p className="text-green-700 font-bold">Answer: The slope is 2 (or 2/1)</p>
            </div>
            <p className="text-gray-700 mt-3">
              This means for every 1 unit the line moves to the right, it rises 2 units upward.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Slope, Angle, and Percent Grade Conversions</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Converting Slope to Angle</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The angle of inclination (θ) is the angle a line makes with the positive x-axis. It's calculated using the arctangent (inverse tangent) function:
          </p>
          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <p className="font-mono text-xl text-center mb-3 text-gray-900">θ = arctan(m) = tan⁻¹(m)</p>
            <p className="text-gray-700 text-sm">
              <strong>Examples:</strong><br />
              • Slope m = 1 → θ = 45° (45-degree angle)<br />
              • Slope m = 0 → θ = 0° (horizontal line)<br />
              • Slope m = -1 → θ = -45° (downward 45 degrees)<br />
              • Slope m = ∞ → θ = 90° (vertical line)
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Converting Slope to Percent Grade</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Percent grade (or gradient) expresses slope as a percentage, commonly used in construction, civil engineering, and road design:
          </p>
          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <p className="font-mono text-xl text-center mb-3 text-gray-900">Grade% = m × 100%</p>
            <p className="text-gray-700 text-sm">
              <strong>Examples:</strong><br />
              • Slope m = 0.05 → 5% grade (gentle slope)<br />
              • Slope m = 0.15 → 15% grade (moderate slope)<br />
              • Slope m = 0.30 → 30% grade (steep slope)<br />
              • Slope m = 1.00 → 100% grade (45-degree angle)
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Forms of Linear Equations</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Slope-Intercept Form</h3>
          <p className="font-mono text-xl mb-3 text-gray-900">y = mx + b</p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Where <strong>m</strong> is the slope and <strong>b</strong> is the y-intercept (the point where the line crosses the y-axis). This is the most common and intuitive form for graphing lines and understanding their behavior.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>How to find b:</strong> Once you know the slope m and have one point (x₁, y₁), substitute into the equation and solve for b: b = y₁ - mx₁
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Point-Slope Form</h3>
          <p className="font-mono text-xl mb-3 text-gray-900">y - y₁ = m(x - x₁)</p>
          <p className="text-gray-700 leading-relaxed mb-6">
            This form is useful when you know the slope and one point on the line. You can directly plug in the values without finding the y-intercept first. It's particularly handy for writing equations quickly during problem-solving.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. General Form (Standard Form)</h3>
          <p className="font-mono text-xl mb-3 text-gray-900">Ax + By + C = 0</p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Where A, B, and C are constants (typically integers). This form is useful in advanced mathematics and for representing vertical lines (which can't be written in slope-intercept form). Any linear equation can be converted to this form by moving all terms to one side.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Parallel and Perpendicular Lines</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Parallel Lines</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Two lines are <strong>parallel</strong> if they have the same slope (m₁ = m₂) and never intersect. Parallel lines maintain a constant distance from each other at all points.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 mb-2"><strong>Example:</strong> Line 1: y = 3x + 2 and Line 2: y = 3x - 5</p>
            <p className="text-gray-700">Both have slope m = 3, so they are parallel lines.</p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Applications:</strong> Railroad tracks, ladder rungs, parking space lines, architectural designs requiring equidistant elements.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Perpendicular Lines</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Two lines are <strong>perpendicular</strong> if they intersect at a 90-degree angle. Their slopes are negative reciprocals: m₁ × m₂ = -1, or m₂ = -1/m₁.
          </p>
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 mb-2"><strong>Example:</strong> Line 1 has slope m₁ = 4</p>
            <p className="text-gray-700">A perpendicular line has slope m₂ = -1/4 = -0.25</p>
            <p className="text-gray-700 mt-2">Check: 4 × (-0.25) = -1 ✓</p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Special Cases:</strong> Horizontal lines (m = 0) are perpendicular to vertical lines (undefined slope). A line with slope 1 is perpendicular to a line with slope -1 (forming a perfect X shape at 45° angles).
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Applications:</strong> Building corners, square layouts, drafting right angles, structural supports, creating perpendicular axes in coordinate systems.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Practical Applications of Slope</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Construction and Architecture</h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
            <li>
              <strong>Wheelchair Ramps (ADA Compliance):</strong> The Americans with Disabilities Act (ADA) requires a maximum slope of 1:12 (8.33% grade or 4.76° angle) for wheelchair ramps. This ensures accessibility while maintaining safety. For every 12 inches of horizontal distance, the ramp can rise no more than 1 inch.
            </li>
            <li>
              <strong>Roof Pitch:</strong> Roof slopes are expressed as ratios like 4:12 (rise:run), meaning 4 inches of vertical rise for every 12 inches of horizontal run. Common pitches: 4:12 (18.4°) for low-slope roofs, 8:12 (33.7°) for standard roofs, 12:12 (45°) for steep roofs. Pitch affects water drainage, snow load capacity, and aesthetic appeal.
            </li>
            <li>
              <strong>Driveway Design:</strong> Residential driveways typically have slopes between 5-15%. Slopes under 10% are ideal for preventing vehicle scraping. Steeper driveways (>15%) may require textured surfaces for traction and can be challenging in icy conditions.
            </li>
            <li>
              <strong>Staircase Design:</strong> Optimal stair angles range from 30-35° (58-70% grade). This provides a comfortable rise-to-run ratio following the 7-11 rule: riser height of 7 inches with tread depth of 11 inches creates a safe, comfortable slope.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Civil Engineering and Transportation</h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
            <li>
              <strong>Road Gradients:</strong> Highway design standards specify maximum grades: 3% for major highways, 5-6% for secondary roads, up to 15% for mountain roads with switchbacks. Grades affect vehicle fuel efficiency, braking distance, and safety, especially for heavy trucks.
            </li>
            <li>
              <strong>Railroad Tracks:</strong> Railroads require very gentle slopes, typically under 2% (about 1.15°), because trains have limited climbing ability due to steel-on-steel wheel friction. Historic mountain railroads like the Cumbres & Toltec uses 4% grades, considered extremely steep for rail.
            </li>
            <li>
              <strong>Drainage Systems:</strong> Proper drainage requires minimum slopes: 0.5% (1:200) for flat surfaces, 1-2% for paved areas, 2-5% for swales and ditches. Adequate slope prevents standing water and ensures proper water runoff.
            </li>
            <li>
              <strong>Bike Paths and Trails:</strong> Comfortable cycling requires slopes under 5%. Mountain bike trails range from 5-15%, with short sections up to 20%. Grades over 20% are typically rated as "technical" and suitable only for experienced riders.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recreation and Sports</h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
            <li>
              <strong>Ski Slopes:</strong> Slopes are categorized by steepness: Green circles (beginner): 6-25% (3-14°), Blue squares (intermediate): 25-40% (14-22°), Black diamonds (advanced): 40%+ (22°+), Double black diamonds (expert): 50-100%+ (27-45°+).
            </li>
            <li>
              <strong>Golf Course Design:</strong> Green slopes shouldn't exceed 3% for putting, fairways typically 3-5%, and well-designed slopes ensure proper drainage and playability.
            </li>
            <li>
              <strong>Running Tracks:</strong> Olympic tracks are nearly flat (0-1% grade) for fair competition, while cross-country courses incorporate varied slopes to test endurance and running technique.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Slope Categories and Recommendations</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm mb-6">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left">Category</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Percent Grade</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Angle</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Applications</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Gentle (0-5%)</td>
                  <td className="border border-gray-300 px-4 py-3">0-5%</td>
                  <td className="border border-gray-300 px-4 py-3">0-2.86°</td>
                  <td className="border border-gray-300 px-4 py-3">Wheelchair ramps, sidewalks, bike paths, accessible routes</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Moderate (5-15%)</td>
                  <td className="border border-gray-300 px-4 py-3">5-15%</td>
                  <td className="border border-gray-300 px-4 py-3">2.86-8.53°</td>
                  <td className="border border-gray-300 px-4 py-3">Driveways, residential roads, hiking trails, low-pitch roofs</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Steep (15-30%)</td>
                  <td className="border border-gray-300 px-4 py-3">15-30%</td>
                  <td className="border border-gray-300 px-4 py-3">8.53-16.70°</td>
                  <td className="border border-gray-300 px-4 py-3">Mountain roads, beginner ski slopes, steep driveways (with traction)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Very Steep (>30%)</td>
                  <td className="border border-gray-300 px-4 py-3">>30%</td>
                  <td className="border border-gray-300 px-4 py-3">>16.70°</td>
                  <td className="border border-gray-300 px-4 py-3">Stairs, advanced ski slopes, climbing walls, require special design</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Slope Calculation Mistakes</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li><strong>Inconsistent Point Order:</strong> Using (y₁ - y₂) with (x₂ - x₁) instead of keeping the same order for both coordinates. Always use (y₂ - y₁) / (x₂ - x₁) or (y₁ - y₂) / (x₁ - x₂).</li>
            <li><strong>Forgetting Negative Signs:</strong> Slope can be negative. A line falling from left to right has a negative slope. Don't drop the negative sign.</li>
            <li><strong>Confusing Slope with Angle:</strong> Slope 1 doesn't mean 1 degree; it means 45 degrees. Always use arctan to convert slope to angle.</li>
            <li><strong>Division by Zero:</strong> When x₂ = x₁, the line is vertical and slope is undefined (not infinity). Vertical lines can't be expressed in slope-intercept form.</li>
            <li><strong>Rounding Too Early:</strong> Keep full precision until the final answer to avoid accumulation of rounding errors, especially in multi-step calculations.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <p className="text-gray-700 mb-6">
            Expand your mathematical calculations with these related tools:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/distance-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">📏</div>
              <h3 className="font-semibold text-gray-900 mb-1">Distance Calculator</h3>
              <p className="text-sm text-gray-600">Calculate distance between two points</p>
            </Link>
            
            <Link 
              href="/percentage-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">%</div>
              <h3 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate percentages and percent changes</p>
            </Link>
            
            <Link 
              href="/triangle-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">📐</div>
              <h3 className="font-semibold text-gray-900 mb-1">Triangle Calculator</h3>
              <p className="text-sm text-gray-600">Solve triangles using various methods</p>
            </Link>
            
            <Link 
              href="/pythagorean-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">📐</div>
              <h3 className="font-semibold text-gray-900 mb-1">Pythagorean Calculator</h3>
              <p className="text-sm text-gray-600">Calculate triangle sides using Pythagorean theorem</p>
            </Link>
            
            <Link 
              href="/scientific-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🔬</div>
              <h3 className="font-semibold text-gray-900 mb-1">Scientific Calculator</h3>
              <p className="text-sm text-gray-600">Advanced mathematical calculations</p>
            </Link>
            
            <Link 
              href="/fraction-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">➗</div>
              <h3 className="font-semibold text-gray-900 mb-1">Fraction Calculator</h3>
              <p className="text-sm text-gray-600">Add, subtract, multiply, and divide fractions</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <p className="text-gray-700 mb-4">
            For more information about slope, gradients, and their applications, visit these authoritative sources:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a 
                href="https://www.mathsisfun.com/gradient.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Math is Fun - Gradient (Slope) Explanation
              </a>
              {' '}for interactive slope tutorials
            </li>
            <li>
              <a 
                href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:linear-equations-graphs/x2f8bb11595b61c86:slope/v/slope-of-a-line" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Khan Academy - Slope of a Line
              </a>
              {' '}for video lessons and practice
            </li>
            <li>
              <a 
                href="https://www.access-board.gov/ada/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                ADA Accessibility Guidelines
              </a>
              {' '}for official slope requirements in construction
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

