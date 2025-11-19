import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import ConcreteCalculator from '@/components/Calculator/ConcreteCalculator';

export const metadata: Metadata = {
  title: 'Concrete Calculator (Free, No signup) - Calculate Concrete Volume | AICalculator',
  description: 'Free concrete calculator with no sign-up required. Calculate volume, bags, materials, and cost for slabs, footings, columns, stairs. Supports cubic yards/meters. 100% free, unlimited use.',
  keywords: [
    'concrete calculator',
    'concrete volume calculator',
    'how much concrete do I need',
    'concrete slab calculator',
    'concrete footing calculator',
    'cubic yards concrete',
    'concrete bags calculator',
    'concrete cost calculator',
    'concrete mix calculator',
    'ready mix concrete calculator',
    'concrete stairs calculator',
    'concrete column calculator',
    'circular slab calculator',
    'concrete yardage calculator',
    'concrete material calculator',
    'concrete estimator',
    'concrete truck calculator',
    'concrete pour calculator',
    'DIY concrete calculator',
    'construction concrete calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  
  openGraph: {
    title: 'Concrete Calculator (Free, No signup) - Volume & Cost Estimator',
    description: 'Free concrete calculator for slabs, footings, columns, and stairs. Calculate volume, bags needed, materials, and cost estimates. No sign-up required.',
    type: 'website',
    url: getUrl('/concrete-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('concrete'),
      width: 1200,
      height: 630,
      alt: 'Concrete Calculator - Volume and Cost Estimator',
    }],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Concrete Calculator (Free, No signup) - Volume & Cost',
    description: 'Free concrete calculator. Calculate volume, bags, materials, and costs for any concrete project.',
    images: [getOgImage('concrete')],
    creator: '@aicalculator',
  },
  
  alternates: {
    canonical: getUrl('/concrete-calculator'),
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

export default function ConcreteCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/concrete-calculator'),
        'name': 'Concrete Calculator - Free Volume and Cost Estimator',
        'url': getUrl('/concrete-calculator'),
        'description': 'Free concrete calculator supporting multiple shapes: slabs, footings, columns, stairs, curbs. Calculate concrete volume in cubic yards or cubic meters, estimate bags needed, material breakdown (cement, sand, gravel), and project costs. No sign-up required.',
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'Any',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
        'featureList': [
          '5 shape types: Slab/Wall, Circular Slab, Column, Stairs, Curb & Gutter',
          'Imperial (feet, inches) and Metric (meters, cm) units',
          'Concrete volume in cubic yards and cubic meters',
          'Pre-mixed bag calculations (40lb, 60lb, 80lb)',
          'Material breakdown: cement, sand, gravel, water',
          '3 concrete types: Standard, Rapid Set, High-Strength',
          'Cost estimation: materials and labor',
          'Mixer truck delivery calculations',
          'Wastage/overage adjustments (10-15%)',
          'Construction tips and best practices',
          'Safety warnings and weather requirements',
          'No sign-up or registration required',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/concrete-calculator'),
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': getUrl('/'),
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Construction',
            'item': getUrl('/construction'),
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Concrete Calculator',
            'item': getUrl('/concrete-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/concrete-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How do I calculate how much concrete I need?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'To calculate concrete volume: (1) Measure dimensions: For slabs - length × width × thickness (convert thickness to feet: inches ÷ 12). For example, a 10ft × 12ft slab that is 4 inches thick = 10 × 12 × (4/12) = 40 cubic feet. (2) Convert to cubic yards: Divide cubic feet by 27. Example: 40 ÷ 27 = 1.48 cubic yards. (3) Add 10-15% wastage: 1.48 × 1.10 = 1.63 cubic yards. Round up to nearest 0.5 yards. Order 2.0 cubic yards. For circular slabs, use πr²h. For stairs, calculate as triangular prism. Always add extra for spillage and uneven subgrade.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How many 80lb bags of concrete do I need?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'One 80lb bag of pre-mixed concrete yields approximately 0.6 cubic feet when mixed. To calculate bags needed: (1) Calculate total cubic feet needed. (2) Divide by 0.6 to get number of bags. Example: For 40 cubic feet: 40 ÷ 0.6 = 67 bags. Alternatively, per cubic yard: 1 cubic yard (27 cubic feet) requires approximately 45 bags of 80lb concrete, 60 bags of 60lb concrete, or 90 bags of 40lb concrete. For large projects (>2 cubic yards), ready-mix delivery is more economical than bags. Bags are best for small repairs and projects under 1 cubic yard.',
            },
          },
          {
            '@type': 'Question',
            'name': 'What is the concrete mix ratio for 3000 PSI?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Standard 3000 PSI concrete uses a 1:2:3 mix ratio by volume: 1 part Portland cement, 2 parts sand (fine aggregate), 3 parts gravel (coarse aggregate), plus water at 0.5 water-cement ratio. For a typical batch: 94 lbs cement (1 bag), 188 lbs sand, 282 lbs gravel, plus about 6 gallons (47 lbs) water. This produces approximately 4.5 cubic feet of concrete. For 4000 PSI (stronger), use 1:1.5:2.5 ratio. For rapid-set concrete, use 1:2:2.5 ratio. Never exceed 0.6 water-cement ratio as excess water weakens concrete. Use clean, potable water. Mix thoroughly until uniform consistency with no dry pockets.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How much does a cubic yard of concrete cost?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Ready-mix concrete costs vary by location and type: Standard concrete (3000-4000 PSI): $125-$150 per cubic yard. Rapid-set concrete: $150-$175 per cubic yard. High-strength concrete (5000+ PSI): $175-$200 per cubic yard. Additional costs: Delivery fee: $60-$100 per load. Small load fee (<1 cubic yard): $50-$100 extra. Waiting time: $2-$5 per minute if delayed. Weekend/holiday: 10-20% surcharge. Colored or stamped concrete: +$25-$75 per yard. Labor costs: DIY: $0 (your time). Professional installation: $4-$8 per square foot. Total project cost including labor: typically $4-$8/sq ft for basic slab, $8-$18/sq ft for decorative/stamped.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How thick should a concrete slab be?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Standard concrete slab thicknesses by application: Residential walkways: 3-4 inches thick. Patios and porches: 4 inches thick. Garage floors: 4-6 inches thick (4" for cars, 6" for trucks/RVs). Driveways: 4 inches for cars, 5-6 inches for heavy vehicles. Basement floors: 4 inches thick. Commercial floors: 6-8 inches depending on load. Industrial/warehouse: 6-12 inches with reinforcement. Reinforcement recommendations: 4" slab: Wire mesh (6×6 W1.4×W1.4). 5-6" slab: #3 or #4 rebar on 18" grid. Thicker slabs: Engineered rebar placement. Always use compacted gravel base (4-6 inches) beneath slab. For poor soil, consider thicker slab or additional reinforcement.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How long does concrete take to cure?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Concrete curing timeline and strength development: Initial set: 24-48 hours - can walk on surface carefully. Light traffic: 3-7 days - foot traffic okay, no heavy loads. Full strength: 28 days - reaches 100% design strength (e.g., 3000 PSI). Strength development: 1 day: ~20% strength. 3 days: ~40% strength. 7 days: ~70% strength. 28 days: ~100% strength. Curing requirements for optimal strength: Keep concrete moist for 7 days minimum (spray with water 2-3 times daily). Cover with plastic sheeting or apply curing compound. Protect from freezing (below 40°F) for first 7 days. Avoid heavy loads for 7 days, full loads for 28 days. Rapid-set concrete: achieves high early strength in 1-3 days but still needs curing. Proper curing increases final strength by 50% compared to uncured concrete.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/concrete-calculator'),
        'name': 'How to Calculate Concrete Volume and Materials',
        'description': 'Step-by-step guide to calculating concrete volume, bags needed, and estimating project costs for slabs, footings, and other concrete projects.',
        'totalTime': 'PT5M',
        'estimatedCost': {
          '@type': 'MonetaryAmount',
          'currency': 'USD',
          'value': '0',
        },
        'tool': {
          '@type': 'HowToTool',
          'name': 'Measuring tape and project dimensions',
        },
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Select Shape Type',
            'text': 'Choose the shape that matches your project: Slab/Wall for flat rectangular areas, Circular Slab for round areas or tubes, Column for cylindrical pillars, Stairs for stairways, or Curb & Gutter for roadside installations.',
            'url': getStepUrl('/concrete-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Choose Measurement System',
            'text': 'Select Imperial (feet and inches) or Metric (meters and centimeters) based on your measurements and location. The calculator will automatically handle unit conversions.',
            'url': getStepUrl('/concrete-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Measure and Enter Dimensions',
            'text': 'Carefully measure your project dimensions. For slabs: measure length, width, and thickness. For circular: measure diameter and depth. Ensure measurements are accurate as errors compound in volume calculations.',
            'url': getStepUrl('/concrete-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Enter Quantity',
            'text': 'If you have multiple identical shapes (e.g., 4 identical columns), enter the quantity. The calculator will multiply the volume accordingly.',
            'url': getStepUrl('/concrete-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            'position': 5,
            'name': 'Select Concrete Type',
            'text': 'Choose concrete type based on your project: Standard (3000-4000 PSI) for most applications, Rapid Set for quick projects, or High-Strength (5000+ PSI) for heavy loads. Each type has different mix ratios and curing times.',
            'url': getStepUrl('/concrete-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            'position': 6,
            'name': 'Add Wastage',
            'text': 'Enable wastage adjustment and set percentage (recommended 10-15%). This accounts for spillage, uneven ground, and measurement errors. It\'s always better to have extra concrete than to run short during the pour.',
            'url': getStepUrl('/concrete-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            'position': 7,
            'name': 'Calculate and Review Results',
            'text': 'Click "Calculate Concrete" to see: total volume needed (cubic yards/meters), number of pre-mixed bags (40lb/60lb/80lb options), material breakdown (cement, sand, gravel, water), cost estimates, and mixer truck requirements.',
            'url': getStepUrl('/concrete-calculator', 7),
          },
          {
            '@type': 'HowToStep',
            'position': 8,
            'name': 'Review Construction Tips',
            'text': 'Review the provided construction tips, safety warnings, and curing requirements. Follow best practices for site preparation, pouring technique, and curing to ensure a strong, durable concrete structure.',
            'url': getStepUrl('/concrete-calculator', 8),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/concrete-calculator'),
        'headline': 'Complete Guide to Concrete Calculations and Construction',
        'description': 'Comprehensive guide to calculating concrete volume, estimating materials, understanding mix ratios, and following best practices for successful concrete projects.',
        'author': {
          '@type': 'Organization',
          'name': 'AICalculator.pro',
          'url': getUrl('/'),
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'AICalculator.pro',
          'logo': {
            '@type': 'ImageObject',
            'url': getUrl('/logo.png'),
          },
        },
        'datePublished': '2024-01-01',
        'dateModified': new Date().toISOString().split('T')[0],
        'image': getOgImage('concrete'),
        'articleBody': 'Concrete is one of the most versatile building materials, used in everything from sidewalks to skyscrapers. This comprehensive guide covers concrete calculations, material estimation, mix ratios, and construction best practices for successful projects.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SEO: Hidden H1 */}
      <h1 className="sr-only">
        Concrete Calculator - Free Concrete Volume and Cost Calculator for Slabs, Footings, and Construction (No Sign-up Required)
      </h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Concrete Calculator (Free, No signup)"
        calculatorUrl="/concrete-calculator"
      />

      {/* Calculator Component */}
      <ConcreteCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Concrete Calculations
          </h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Accurate concrete calculations are essential for any construction project. Whether you're pouring a patio, 
              building a foundation, or creating decorative elements, knowing exactly how much concrete you need saves 
              money, reduces waste, and ensures project success. This guide covers everything from basic volume calculations 
              to advanced material estimation and construction techniques.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why Accurate Concrete Calculations Matter
          </h3>

          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
            <li><strong>Cost Control:</strong> Concrete is sold by the cubic yard—overordering wastes money, underordering causes project delays</li>
            <li><strong>Project Planning:</strong> Knowing volume helps schedule delivery, crew size, and equipment needs</li>
            <li><strong>Quality:</strong> Proper material ratios ensure concrete meets strength requirements</li>
            <li><strong>Waste Reduction:</strong> Accurate calculations minimize excess concrete disposal costs</li>
            <li><strong>Professional Estimates:</strong> Contractors need precise calculations for accurate bids</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Concrete Shapes and Volume Formulas
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                📐 Slabs, Walls, and Rectangular Footings
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 font-mono text-sm">
                Volume = Length × Width × Thickness
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Example:</strong> Patio slab 12ft × 10ft × 4 inches thick
                <br />Volume = 12 × 10 × (4÷12) = 40 cubic feet = 1.48 cubic yards
              </p>
              <p className="text-xs text-gray-600">
                <strong>Common Uses:</strong> Patios, driveways, basement floors, walkways, walls, square footings
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                ⭕ Circular Slabs and Tubes
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 font-mono text-sm">
                Volume = π × r² × depth
                <br /><span className="text-xs">(For tubes: subtract inner circle volume)</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Example:</strong> Circular patio 10ft diameter × 4 inches deep
                <br />Volume = 3.14159 × 5² × (4÷12) = 26.18 cubic feet = 0.97 cubic yards
              </p>
              <p className="text-xs text-gray-600">
                <strong>Common Uses:</strong> Round patios, planter beds, circular pools, concrete tubes
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                🏛️ Columns and Round Footings
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 font-mono text-sm">
                Volume = π × r² × height
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Example:</strong> Column 12 inches diameter × 8ft tall
                <br />Volume = 3.14159 × 0.5² × 8 = 6.28 cubic feet = 0.23 cubic yards
              </p>
              <p className="text-xs text-gray-600">
                <strong>Common Uses:</strong> Columns, posts, cylindrical footings, deck supports
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                🪜 Stairs
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 font-mono text-sm text-xs">
                Volume = 0.5 × (total run) × (total rise) × width
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Example:</strong> 5 steps, 11" run, 7" rise, 4ft wide
                <br />Volume = 0.5 × (55÷12) × (35÷12) × 4 = 26.74 cubic feet = 0.99 cubic yards
              </p>
              <p className="text-xs text-gray-600">
                <strong>Common Uses:</strong> Outdoor stairs, entrance steps, tiered landscaping
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-300 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <span className="text-xl">💡</span> Pro Tip: Always Add Wastage
            </h4>
            <p className="text-sm text-amber-900 mb-3">
              Never order exactly the calculated amount. Always add 10-15% extra for:
            </p>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Spillage during transport and pouring</li>
              <li>• Uneven subgrade requiring more depth in spots</li>
              <li>• Measurement errors and irregular shapes</li>
              <li>• Forms that aren't perfectly level or square</li>
              <li>• Loss during mixing and finishing</li>
            </ul>
            <p className="text-sm font-semibold text-amber-900 mt-3">
              It's much better (and cheaper) to have extra concrete than to run short mid-pour!
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Pre-Mixed Bags vs. Ready-Mix Delivery
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-purple-900 mb-4">
                📦 Pre-Mixed Concrete Bags
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-purple-900 mb-1">Bag Sizes:</p>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• 40 lb bag: yields ~0.3 cubic feet (90 bags/yard)</li>
                    <li>• 60 lb bag: yields ~0.45 cubic feet (60 bags/yard)</li>
                    <li>• 80 lb bag: yields ~0.6 cubic feet (45 bags/yard)</li>
                  </ul>
                </div>
                <div className="bg-white border border-purple-200 rounded-lg p-3">
                  <p className="font-semibold text-purple-900 mb-2">Best For:</p>
                  <ul className="text-xs text-purple-800 space-y-1">
                    <li>✓ Small projects (&lt;1 cubic yard)</li>
                    <li>✓ Repairs and patches</li>
                    <li>✓ Setting posts</li>
                    <li>✓ DIY projects</li>
                    <li>✓ No delivery access</li>
                  </ul>
                </div>
                <div className="bg-white border border-purple-200 rounded-lg p-3">
                  <p className="font-semibold text-purple-900 mb-2">Advantages:</p>
                  <ul className="text-xs text-purple-800 space-y-1">
                    <li>+ No minimum order</li>
                    <li>+ Mix as needed</li>
                    <li>+ Available at hardware stores</li>
                    <li>+ No delivery fees</li>
                  </ul>
                </div>
                <div className="bg-white border border-purple-200 rounded-lg p-3">
                  <p className="font-semibold text-purple-900 mb-2">Disadvantages:</p>
                  <ul className="text-xs text-purple-800 space-y-1">
                    <li>- Expensive for large projects</li>
                    <li>- Labor-intensive mixing</li>
                    <li>- Inconsistent batches</li>
                    <li>- Time-consuming</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-orange-900 mb-4">
                🚚 Ready-Mix Delivery
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-orange-900 mb-1">Truck Capacity:</p>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• Standard mixer truck: 10 cubic yards</li>
                    <li>• Short load minimum: typically 1-2 yards</li>
                    <li>• Multiple trucks for large projects</li>
                  </ul>
                </div>
                <div className="bg-white border border-orange-200 rounded-lg p-3">
                  <p className="font-semibold text-orange-900 mb-2">Best For:</p>
                  <ul className="text-xs text-orange-800 space-y-1">
                    <li>✓ Large projects (>2 cubic yards)</li>
                    <li>✓ Driveways and patios</li>
                    <li>✓ Foundations and slabs</li>
                    <li>✓ Commercial projects</li>
                    <li>✓ Professional installations</li>
                  </ul>
                </div>
                <div className="bg-white border border-orange-200 rounded-lg p-3">
                  <p className="font-semibold text-orange-900 mb-2">Advantages:</p>
                  <ul className="text-xs text-orange-800 space-y-1">
                    <li>+ Cost-effective for volume</li>
                    <li>+ Consistent mix quality</li>
                    <li>+ Fast pour (saves labor)</li>
                    <li>+ Professional strength testing</li>
                  </ul>
                </div>
                <div className="bg-white border border-orange-200 rounded-lg p-3">
                  <p className="font-semibold text-orange-900 mb-2">Disadvantages:</p>
                  <ul className="text-xs text-orange-800 space-y-1">
                    <li>- Minimum order requirements</li>
                    <li>- Delivery fees ($60-$100)</li>
                    <li>- Small load surcharges</li>
                    <li>- Must use entire load</li>
                    <li>- Access requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-green-900 mb-3">📊 Cost Comparison Example</h4>
            <p className="text-sm text-green-800 mb-3">
              For a 3 cubic yard concrete project:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">Pre-Mixed Bags (80lb)</p>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Bags needed: 135 bags</li>
                  <li>• Cost per bag: $4.50</li>
                  <li>• <strong>Total: $607.50</strong></li>
                  <li>• Plus: Hours of mixing labor</li>
                </ul>
              </div>
              <div className="bg-white border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">Ready-Mix Delivery</p>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Concrete: 3 yards × $130</li>
                  <li>• Delivery: $75</li>
                  <li>• <strong>Total: $465</strong></li>
                  <li>• Plus: 30-minute pour time</li>
                </ul>
              </div>
            </div>
            <p className="text-sm font-semibold text-green-900 mt-3">
              💡 Ready-mix saves $142 and countless hours of labor for this project!
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Concrete Types and PSI Ratings
          </h3>

          <div className="space-y-4 mb-8">
            <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-blue-900 mb-3">
                2500-3000 PSI - Standard Concrete
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Applications:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Residential walkways</li>
                    <li>• Patios and porches</li>
                    <li>• Non-structural slabs</li>
                    <li>• Residential footings</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Mix Ratio:</p>
                  <p className="text-sm text-gray-700">1:2.5:3.5</p>
                  <p className="text-xs text-gray-600">(Cement:Sand:Gravel)</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Cost:</p>
                  <p className="text-sm text-gray-700">$115-$130 per yard</p>
                  <p className="text-xs text-gray-600">Most economical option</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-green-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-green-900 mb-3">
                3000-4000 PSI - General Purpose
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Applications:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Residential driveways</li>
                    <li>• Garage floors</li>
                    <li>• Foundation walls</li>
                    <li>• Most residential uses</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Mix Ratio:</p>
                  <p className="text-sm text-gray-700">1:2:3</p>
                  <p className="text-xs text-gray-600">(Cement:Sand:Gravel)</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Cost:</p>
                  <p className="text-sm text-gray-700">$125-$145 per yard</p>
                  <p className="text-xs text-gray-600">Standard pricing</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-orange-900 mb-3">
                4000-5000 PSI - High-Strength
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Applications:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Commercial driveways</li>
                    <li>• Heavy equipment pads</li>
                    <li>• Commercial foundations</li>
                    <li>• Parking structures</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Mix Ratio:</p>
                  <p className="text-sm text-gray-700">1:1.5:2.5</p>
                  <p className="text-xs text-gray-600">(More cement)</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Cost:</p>
                  <p className="text-sm text-gray-700">$150-$180 per yard</p>
                  <p className="text-xs text-gray-600">Premium pricing</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-purple-900 mb-3">
                Rapid-Set Concrete
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Applications:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Quick repairs</li>
                    <li>• Post setting</li>
                    <li>• Emergency fixes</li>
                    <li>• Cold weather pours</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Set Time:</p>
                  <p className="text-sm text-gray-700">20-40 minutes</p>
                  <p className="text-xs text-gray-600">Walk-on in 1-4 hours</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Cost:</p>
                  <p className="text-sm text-gray-700">$150-$175 per yard</p>
                  <p className="text-xs text-gray-600">Premium for speed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-blue-900 mb-3 text-xl">
              📚 Related Resources
            </h4>
            <ul className="space-y-2 text-sm text-blue-900">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  <strong>American Concrete Institute (ACI):</strong> Professional standards and best practices
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  <strong>Portland Cement Association:</strong> Technical resources and mix designs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  <strong>Local Building Codes:</strong> Always check local requirements for thickness and reinforcement
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/tile-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔲</div>
            <h3 className="font-semibold text-gray-900">Tile Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate tiles needed</p>
          </a>

          <a
            href="/gravel-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🪨</div>
            <h3 className="font-semibold text-gray-900">Gravel Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Estimate gravel volume</p>
          </a>

          <a
            href="/paint-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-semibold text-gray-900">Paint Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate paint needed</p>
          </a>

          <a
            href="/area-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📐</div>
            <h3 className="font-semibold text-gray-900">Area Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate area and perimeter</p>
          </a>
        </div>
      </section>
    </div>
  );
}

