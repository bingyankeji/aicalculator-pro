import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import MulchCalculator from '@/components/Calculator/MulchCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Mulch Calculator - Calculate Mulch Needed for Garden & Landscaping | AICalculator',
  description: 'Free mulch calculator to estimate cubic yards, bags, and cost. Calculate mulch needed for garden beds, landscaping, and playgrounds. Compare wood chips, bark, rubber, and stone mulch.',
  keywords: [
    'mulch calculator',
    'mulch needed calculator',
    'how much mulch do i need',
    'mulch coverage calculator',
    'cubic yards mulch calculator',
    'mulch cost calculator',
    'garden mulch calculator',
    'landscaping mulch calculator',
    'mulch bags calculator',
    'mulch depth calculator',
    'wood chip calculator',
    'bark mulch calculator',
    'rubber mulch calculator',
    'stone mulch calculator',
    'mulch estimator',
    'mulch volume calculator',
    'mulch yardage calculator',
    'playground mulch calculator',
    'flower bed mulch calculator',
    'mulch material calculator',
    'mulch quantity calculator',
    'mulch price calculator',
    'landscaping material calculator',
    'garden bed calculator',
    'mulching calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Mulch Calculator - Calculate Mulch Needed for Your Garden',
    description: 'Calculate how much mulch you need for garden beds and landscaping. Compare materials, estimate costs, and get shopping lists.',
    type: 'website',
    url: getUrl('/mulch-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('mulch'),
      width: 1200,
      height: 630,
      alt: 'Mulch Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mulch Calculator - Calculate Mulch Needed for Your Garden',
    description: 'Calculate how much mulch you need for garden beds and landscaping. Compare materials and estimate costs.',
    images: [getOgImage('mulch')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/mulch-calculator'),
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

export default function MulchCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/mulch-calculator'),
        name: 'Mulch Calculator',
        url: getUrl('/mulch-calculator'),
        description: 'Professional mulch calculator for estimating cubic yards, bags, and costs. Calculate mulch needed for garden beds, landscaping, playgrounds, and commercial projects. Compare wood chips, bark, rubber, stone, straw, and cocoa hull mulch.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Multiple area shapes (rectangle, circle, triangle)',
          'Add multiple areas for complex projects',
          'Material comparison (wood, bark, rubber, stone)',
          'Cost estimation with custom pricing',
          'Depth recommendations (2-6 inches)',
          'Cubic yards and bags calculation',
          'Weight estimation',
          'Shopping list generation',
          'Material pros and cons analysis',
          'Coverage area visualization',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/mulch-calculator'),
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
            name: 'Other',
            item: getUrl('/other'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Mulch Calculator',
            item: getUrl('/mulch-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/mulch-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much mulch do I need for my garden?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To calculate mulch needed, measure the length and width of your garden bed in feet, then multiply to get square footage. Multiply square footage by desired depth in feet (3 inches = 0.25 feet, 4 inches = 0.33 feet) to get cubic feet. Divide by 27 to convert to cubic yards, the standard unit for bulk mulch. Example: 20 ft × 10 ft bed at 3 inches deep: 200 sq ft × 0.25 ft = 50 cubic feet ÷ 27 = 1.85 cubic yards. For bagged mulch (typically 2 cubic feet per bag), divide cubic feet by 2: 50 ÷ 2 = 25 bags needed. Always order 10-15% extra to account for settling and uneven coverage.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the best depth for mulch?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The ideal mulch depth is 3-4 inches for most landscaping applications. This depth effectively suppresses weeds, retains soil moisture, regulates soil temperature, and prevents erosion. Two inches is the minimum for adequate weed control but less effective. Six inches may be appropriate for high-traffic areas or playgrounds but can suffocate plant roots and prevent water penetration in garden beds. Apply mulch around trees and shrubs starting 2-3 inches from trunks to prevent rot and pest issues. For vegetable gardens, 2-3 inches is sufficient since you will replant seasonally. Annual mulch replenishment maintains proper depth as decomposition occurs.',
            },
          },
          {
            '@type': 'Question',
            name: 'What type of mulch should I use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Mulch selection depends on your specific needs and budget. Wood chips ($35/cubic yard) are most affordable, decompose to enrich soil, but need annual replenishment. Bark mulch ($45/cubic yard) lasts 2-3 years, looks attractive, and stays in place well. Rubber mulch ($85/cubic yard) is ideal for playgrounds as it lasts 10+ years and provides excellent safety cushioning but does not enrich soil. Stone/rock ($60/cubic yard) is permanent, modern-looking, and maintenance-free but heats up soil and provides no organic matter. Straw ($25/cubic yard) works well for vegetable gardens as a single-season option. Cocoa hulls ($75/cubic yard) offer beautiful dark color and chocolate aroma but are toxic to dogs and can blow away. Consider your budget, aesthetic preferences, maintenance willingness, and specific plant needs.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much does mulch cost?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Mulch costs vary significantly by material type and purchase method. Bulk mulch (by cubic yard) is most economical for large projects: wood chips $25-40, bark mulch $35-50, dyed mulch $40-60, rubber mulch $75-100, stone $50-75 per cubic yard. Delivery typically adds $50-100. Bagged mulch (2 cubic feet) costs $3-8 per bag at garden centers, convenient for small projects but expensive for large areas (one cubic yard = 13.5 bags). Premium materials like cocoa hulls or cedar bark command higher prices. Many municipalities offer free wood chip mulch from tree trimming operations. Professional installation adds $30-50 per cubic yard for labor. Annual mulch replacement for typical 1,000 sq ft garden at 3 inches depth requires 9.3 cubic yards, costing $230-560 for materials plus delivery.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many bags of mulch equal a cubic yard?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'One cubic yard equals 27 cubic feet, and standard mulch bags contain 2 cubic feet, so one cubic yard equals 13.5 bags. Some bags hold 3 cubic feet (9 bags per yard). To determine bags needed, calculate cubic feet required (length × width × depth in feet), then divide by bag size. Example: 200 square foot bed at 3 inches (0.25 feet) deep requires 50 cubic feet, or 25 bags (2 cu ft each). Bulk mulch is significantly cheaper for large projects: 13.5 bags at $4 each costs $54 versus $35 for one cubic yard of bulk mulch delivered. Bagged mulch works well for small projects, allows precise purchasing, and stores easily. Bulk mulch is economical for projects requiring 3+ cubic yards and reduces packaging waste.',
            },
          },
          {
            '@type': 'Question',
            name: 'When is the best time to apply mulch?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The best time to apply mulch is mid-to-late spring after soil warms (above 65°F) and plants begin active growth. Spring mulching suppresses emerging weeds and retains moisture through summer. Fall mulching (September-October) protects plant roots during winter and prevents soil erosion from freeze-thaw cycles. Avoid early spring mulching when soil is cold and wet, as mulch insulates and delays soil warming, harming early growth. Wait until after spring bulbs emerge to avoid blocking growth. Remove old mulch or rake it aside before applying new layers to prevent excessive depth. In vegetable gardens, apply mulch after soil warms and young plants establish (2-3 weeks after transplanting). For new plantings, apply mulch immediately after installation to reduce transplant shock and conserve moisture.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/mulch-calculator'),
        name: 'How to Calculate and Apply Mulch for Your Garden',
        description: 'Step-by-step guide to calculating mulch quantity, selecting the right material, and applying mulch properly for optimal garden health.',
        totalTime: 'PT10M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Mulch Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Measure Your Garden Areas',
            text: 'Measure each area you want to mulch. For rectangular beds, measure length and width in feet. For circular areas, measure the radius (half the diameter). For irregular shapes, divide into rectangles and circles, or use a triangle approximation. Write down all measurements.',
            url: getStepUrl('/mulch-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Add Areas to Calculator',
            text: 'Enter each area into the calculator with a descriptive name (e.g., "Front Flower Bed", "Around Oak Tree"). Select the appropriate shape (rectangle, circle, or triangle) and input dimensions. Click Add Area for each section. The calculator displays total coverage area.',
            url: getStepUrl('/mulch-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Choose Mulch Depth',
            text: 'Select your desired mulch depth: 3-4 inches is ideal for most gardens, 2 inches minimum for weed control, 4-6 inches for high-traffic areas or playgrounds. The calculator provides depth recommendations based on your input.',
            url: getStepUrl('/mulch-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Select Mulch Material',
            text: 'Choose from wood chips, bark mulch, rubber mulch, stone, straw, or cocoa hulls. Review material pros, cons, lifespan, and cost. Consider your budget, aesthetic preferences, and maintenance willingness. Enter custom pricing if you found a different price.',
            url: getStepUrl('/mulch-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Review Results and Shopping List',
            text: 'Click Calculate to see total cubic yards, cubic meters, bag count, estimated cost, and weight. Review the shopping list including optional items like landscape fabric and edging. Add 10-15% extra for settling and uneven areas.',
            url: getStepUrl('/mulch-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Apply Mulch Properly',
            text: 'Before mulching, remove weeds and old mulch if necessary. Optional: lay landscape fabric for better weed control. Spread mulch evenly to desired depth using a rake. Keep mulch 2-3 inches away from plant stems and tree trunks to prevent rot. Water lightly to help mulch settle.',
            url: getStepUrl('/mulch-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/mulch-calculator'),
        headline: 'Complete Guide to Mulch: Types, Benefits, and How Much You Need',
        description: 'Comprehensive guide to choosing and calculating mulch for your garden. Learn about different mulch types, proper depth, application techniques, and cost savings.',
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
        dateModified: '2024-11-18',
        image: getOgImage('mulch'),
        articleBody: 'Learn everything about mulch calculation, selection, and application for healthy gardens and beautiful landscaping.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Mulch Calculator - Calculate Mulch Needed for Your Garden</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Mulch Calculator"
        calculatorUrl="/mulch-calculator"
      />

      {/* Calculator Component */}
      <MulchCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Mulch Calculation and Selection</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700">
              <strong>Quick Summary:</strong> Calculate how much mulch you need by multiplying length × width × depth (in feet) and dividing by 27 to get cubic yards. A 200 sq ft bed at 3 inches deep needs 1.85 cubic yards or 25 bags. Choose between wood chips, bark, rubber, or stone based on your budget and needs.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What is Mulch and Why Use It?</h3>
          <p className="text-gray-700 mb-4">
            Mulch is a protective layer of material spread on top of soil around plants, trees, and garden beds. Organic mulches (wood chips, bark, straw) decompose over time, enriching soil with nutrients and improving structure. Inorganic mulches (rubber, stone) provide permanent coverage without soil enhancement. Mulching offers numerous benefits that make it essential for healthy gardens and landscapes.
          </p>

          <p className="text-gray-700 mb-4">
            <strong>Key benefits of mulching:</strong> Suppresses weeds by blocking sunlight (reducing weed growth by 90%+), retains soil moisture (reducing watering needs by 25-50%), regulates soil temperature (keeping soil cooler in summer, warmer in winter), prevents erosion from wind and rain, improves soil fertility as organic mulch decomposes, gives landscapes a finished, professional appearance, and protects plant roots from temperature extremes. These benefits lead to healthier plants, reduced maintenance, lower water bills, and more attractive gardens.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Types of Mulch: Comprehensive Comparison</h3>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold border-b">Material</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">Cost/yd³</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">Lifespan</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-medium">Wood Chips</td>
                  <td className="px-4 py-3 text-center">$25-40</td>
                  <td className="px-4 py-3 text-center">1-2 years</td>
                  <td className="px-4 py-3 text-sm">General landscaping, around trees, slopes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Bark Mulch</td>
                  <td className="px-4 py-3 text-center">$35-50</td>
                  <td className="px-4 py-3 text-center">2-3 years</td>
                  <td className="px-4 py-3 text-sm">Flower beds, shrubs, decorative areas</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Rubber Mulch</td>
                  <td className="px-4 py-3 text-center">$75-100</td>
                  <td className="px-4 py-3 text-center">10+ years</td>
                  <td className="px-4 py-3 text-sm">Playgrounds, high-traffic areas</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Stone/Rock</td>
                  <td className="px-4 py-3 text-center">$50-75</td>
                  <td className="px-4 py-3 text-center">Permanent</td>
                  <td className="px-4 py-3 text-sm">Modern landscapes, xeriscape, pathways</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Straw</td>
                  <td className="px-4 py-3 text-center">$15-30</td>
                  <td className="px-4 py-3 text-center">1 season</td>
                  <td className="px-4 py-3 text-sm">Vegetable gardens, annual beds</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Cocoa Hulls</td>
                  <td className="px-4 py-3 text-center">$60-80</td>
                  <td className="px-4 py-3 text-center">1 year</td>
                  <td className="px-4 py-3 text-sm">Flower beds, acid-loving plants</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How to Calculate Mulch Quantity</h3>
          <p className="text-gray-700 mb-4">
            Accurate mulch calculation prevents over-ordering (wasted money) or under-ordering (project delays). Follow this simple formula:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Mulch Calculation Formula</h4>
            
            <div className="space-y-3">
              <div>
                <p className="font-mono text-lg text-blue-700 mb-2">Step 1: Calculate Area (sq ft)</p>
                <p className="text-sm text-gray-700">Rectangle: Length × Width</p>
                <p className="text-sm text-gray-700">Circle: π × Radius²</p>
                <p className="text-sm text-gray-700">Triangle: (Base × Height) ÷ 2</p>
              </div>
              
              <div>
                <p className="font-mono text-lg text-green-700 mb-2">Step 2: Calculate Volume (cubic feet)</p>
                <p className="text-sm text-gray-700">Area (sq ft) × Depth (inches) ÷ 12</p>
                <p className="text-sm text-gray-700">Example: 200 sq ft × 3 inches ÷ 12 = 50 cubic feet</p>
              </div>
              
              <div>
                <p className="font-mono text-lg text-amber-700 mb-2">Step 3: Convert to Cubic Yards</p>
                <p className="text-sm text-gray-700">Cubic Feet ÷ 27 = Cubic Yards</p>
                <p className="text-sm text-gray-700">Example: 50 ÷ 27 = 1.85 cubic yards</p>
              </div>
              
              <div className="pt-3 border-t border-gray-300">
                <p className="font-mono text-lg text-red-700 mb-2">For Bagged Mulch (2 cu ft bags)</p>
                <p className="text-sm text-gray-700">Cubic Feet ÷ 2 = Number of Bags</p>
                <p className="text-sm text-gray-700">Example: 50 ÷ 2 = 25 bags</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Recommended Mulch Depths by Application</h3>
          
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Flower and Shrub Beds:</strong> 3-4 inches. Optimal for weed suppression, moisture retention, and visual appeal. Replenish annually as organic mulch decomposes.</li>
            <li><strong>Vegetable Gardens:</strong> 2-3 inches. Thinner layer allows soil to warm faster in spring. Use straw or untreated wood chips. Replace each season.</li>
            <li><strong>Around Trees:</strong> 3-4 inches in a donut shape. Keep mulch 2-3 inches away from trunk to prevent rot and pest issues. Extend mulch to tree drip line for maximum benefit.</li>
            <li><strong>Playgrounds:</strong> 6-12 inches of rubber mulch or engineered wood fiber. Provides safety cushioning for falls. Follow ASTM F1292 standards for critical height.</li>
            <li><strong>Pathways and High-Traffic Areas:</strong> 4-6 inches. Extra depth prevents bare spots from foot traffic. Stone or rubber mulch works best for durability.</li>
            <li><strong>Slopes and Erosion Control:</strong> 3-4 inches of chunky mulch (bark nuggets, wood chips). Heavier pieces resist washing away. Consider erosion control fabric underneath.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Bulk vs. Bagged Mulch: Cost Analysis</h3>
          
          <p className="text-gray-700 mb-4">
            Choosing between bulk and bagged mulch significantly impacts your project cost:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Bulk Mulch (by cubic yard)</h4>
              <ul className="text-sm text-blue-900 space-y-1 list-disc ml-5">
                <li>Economical for large projects (3+ yards)</li>
                <li>Delivered directly to your property</li>
                <li>$25-75 per cubic yard + delivery fee</li>
                <li>One yard = 13.5 bags (2 cu ft)</li>
                <li>Less packaging waste, eco-friendly</li>
                <li>Must use within days (no storage)</li>
              </ul>
            </div>

            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Bagged Mulch (2 cu ft bags)</h4>
              <ul className="text-sm text-green-900 space-y-1 list-disc ml-5">
                <li>Convenient for small projects</li>
                <li>Easy transport in car trunk</li>
                <li>$3-8 per bag at garden centers</li>
                <li>Store indefinitely for future use</li>
                <li>Precise quantity purchasing</li>
                <li>Expensive for large areas ($40-108/yard)</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-green-900 mb-3">Cost Comparison Example</h4>
            <p className="text-sm text-green-900 mb-3">For 200 sq ft bed at 3 inches deep (1.85 cubic yards needed):</p>
            
            <div className="space-y-2 text-sm text-green-900">
              <div className="flex justify-between">
                <span><strong>Bulk mulch:</strong> 2 yards @ $35/yard + $75 delivery</span>
                <span className="font-bold">$145</span>
              </div>
              <div className="flex justify-between">
                <span><strong>Bagged mulch:</strong> 25 bags @ $5/bag</span>
                <span className="font-bold">$125</span>
              </div>
              <div className="border-t border-green-300 pt-2 flex justify-between">
                <span className="font-bold">Bulk becomes cheaper at ~3 yards</span>
                <span className="font-bold text-green-700">Break-even point</span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Mulch Application Best Practices</h3>
          
          <p className="text-gray-700 mb-4">
            Proper mulch application maximizes benefits and prevents common problems:
          </p>

          <div className="space-y-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">1. Prepare the Area</h4>
              <p className="text-sm text-gray-700">Remove existing weeds by hand or with herbicide. Rake old mulch aside or remove if depth exceeds 4 inches. Optional: install landscape fabric (not plastic) for enhanced weed control, cutting X-shaped slits for existing plants. Edge beds with metal, plastic, or stone edging to contain mulch and create clean borders.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">2. Avoid Mulch Volcanoes</h4>
              <p className="text-sm text-gray-700">Never pile mulch against tree trunks or plant stems. Create a 2-3 inch gap around trunks to prevent moisture buildup, which causes rot, invites pests, and harbors diseases. Shape mulch like a donut, not a volcano. This common mistake kills thousands of trees annually.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">3. Spread Evenly</h4>
              <p className="text-sm text-gray-700">Dump mulch in piles throughout the area, then spread with a rake to desired depth. Use a measuring stick or ruler to verify consistent depth. Pay special attention to edges where depth often varies. Smooth surface for professional appearance.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">4. Water After Application</h4>
              <p className="text-sm text-gray-700">Lightly water newly applied mulch to help it settle and prevent wind displacement. Avoid heavy watering which can float lightweight mulches. This initial watering also begins the decomposition process for organic mulches, starting nutrient release into soil.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">5. Annual Maintenance</h4>
              <p className="text-sm text-gray-700">Rake and fluff mulch in spring to refresh appearance and prevent matting. Add 1-2 inches new mulch annually as old mulch decomposes. Remove and replace mulch every 2-3 years if it becomes compacted or develops mold. Monitor for pests like termites in wood mulches near structures.</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common Mulching Mistakes to Avoid</h3>
          
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Using too much mulch:</strong> Depths over 4 inches (except playgrounds) suffocate roots, prevent water penetration, and create pest habitats. More is not better.</li>
            <li><strong>Touching plants with mulch:</strong> Direct contact causes stem rot, attracts insects, and creates disease entry points. Always maintain a 2-3 inch gap around all plants.</li>
            <li><strong>Using fresh wood chips:</strong> Freshly chipped wood robs soil nitrogen during decomposition. Age wood chips 3-6 months or use commercially composted products.</li>
            <li><strong>Mulching too early in spring:</strong> Mulch insulates soil. Early application keeps soil cold and delays plant growth. Wait until soil warms and plants emerge.</li>
            <li><strong>Ignoring landscape fabric quality:</strong> Cheap plastic sheeting prevents water and air penetration, kills beneficial organisms, and deteriorates quickly. Use quality woven landscape fabric if needed.</li>
            <li><strong>Using dyed mulch near edibles:</strong> Some dyes contain heavy metals or arsenic from treated wood. Use natural, untreated mulch for vegetable gardens and fruit trees.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Resources</h3>
          <p className="text-gray-700 mb-4">
            For more information on mulching and landscaping:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <a href="https://extension.umn.edu/planting-and-growing-guides/using-mulches-garden" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                University of Minnesota Extension - Using Mulches in Gardens
              </a> - Research-based mulching guidance
            </li>
            <li>
              <a href="https://www.usda.gov/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                USDA - United States Department of Agriculture
              </a> - Agricultural and horticultural resources
            </li>
            <li>
              <a href="https://www.epa.gov/saferchoice/safer-ingredients" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                EPA Safer Choice
              </a> - Information on safe gardening products
            </li>
            <li>
              <a href="https://www.arborday.org/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Arbor Day Foundation
              </a> - Tree care and mulching best practices
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/gravel-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🪨</div>
            <h3 className="font-semibold text-gray-900">Gravel Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate gravel and stone needed</p>
          </a>
          
          <a 
            href="/square-footage-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📐</div>
            <h3 className="font-semibold text-gray-900">Square Footage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate area of any shape</p>
          </a>
          
          <a 
            href="/soil-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🌱</div>
            <h3 className="font-semibold text-gray-900">Soil Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate soil and topsoil volume</p>
          </a>
          
          <a 
            href="/concrete-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🏗️</div>
            <h3 className="font-semibold text-gray-900">Concrete Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate concrete volume needed</p>
          </a>
        </div>
      </section>
    </div>
  );
}

