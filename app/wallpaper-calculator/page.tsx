import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import WallpaperCalculator from '@/components/Calculator/WallpaperCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Wallpaper Calculator - Calculate Rolls Needed for Your Walls | AICalculator',
  description: 'Free wallpaper calculator to estimate how many rolls you need. Calculate based on wall dimensions, pattern repeat, and match type with accurate waste calculations.',
  keywords: [
    'wallpaper calculator',
    'wallpaper estimator',
    'how much wallpaper do i need',
    'wallpaper roll calculator',
    'wallpaper coverage calculator',
    'wallpaper quantity calculator',
    'wallpaper cost calculator',
    'wallpaper pattern repeat',
    'wallpaper match calculator',
    'wallpaper measurement',
    'wallpaper estimate',
    'wall covering calculator',
    'wallpaper rolls needed',
    'wallpaper waste calculator',
    'wallpaper installation calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Wallpaper Calculator - Estimate Rolls Needed',
    description: 'Calculate how many wallpaper rolls you need for your walls. Get accurate estimates with pattern repeat and waste calculations.',
    type: 'website',
    url: getUrl('/wallpaper-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('wallpaper'),
      width: 1200,
      height: 630,
      alt: 'Wallpaper Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wallpaper Calculator',
    description: 'Calculate wallpaper rolls needed',
    images: [getOgImage('wallpaper')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/wallpaper-calculator'),
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': getWebAppId('/wallpaper-calculator'),
      name: 'Wallpaper Calculator',
      url: getUrl('/wallpaper-calculator'),
      description: 'Calculate wallpaper rolls needed based on wall dimensions, pattern repeat, match type, and waste rate. Includes cost estimation and installation tips.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Multiple wall support',
        'Automatic door and window deduction',
        'Pattern repeat calculation',
        'Straight and offset match types',
        'Waste rate adjustment',
        'Cost estimation',
        'Custom roll sizes',
        'Installation guide',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/wallpaper-calculator'),
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
          name: 'Wallpaper Calculator',
          item: getUrl('/wallpaper-calculator'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/wallpaper-calculator'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I calculate how much wallpaper I need?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To calculate wallpaper needed: 1) Measure wall length and height, 2) Calculate wall area (length × height), 3) Subtract doors and windows, 4) Add 10-20% for waste and pattern matching, 5) Divide by roll coverage area. Standard rolls are 20.5 inches wide and 33 feet long, covering about 56 square feet. For example, a 12×8 ft wall (96 sq ft) needs approximately 2 rolls.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is pattern repeat in wallpaper?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pattern repeat is the vertical distance between where a design element starts and where it repeats again. Common repeats range from 0 (no pattern) to 24+ inches. Larger pattern repeats create more waste because you must match the pattern at seams, potentially wasting significant portions of each strip. Small or no pattern repeats are more economical and easier to install.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between straight match and offset match?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Straight match (also called straight across match): the pattern aligns horizontally across adjacent strips at the same height, making it easier to install with less waste. Offset match (also called drop match or half-drop): the pattern on adjacent strips is offset vertically by half the pattern repeat, creating a diagonal or staggered effect. Offset match typically requires 15-20% more wallpaper due to increased waste.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much extra wallpaper should I buy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Always buy 10-20% extra wallpaper beyond your calculated needs. This accounts for: pattern matching waste, cutting mistakes, damaged sections, future repairs, and variations in wall measurements. Also buy 1-2 extra rolls from the same dye lot, as colors can vary between production batches. It\'s better to have extra than to be unable to find matching wallpaper later.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/wallpaper-calculator'),
      name: 'How to Calculate Wallpaper Needed',
      description: 'Calculate the number of wallpaper rolls required for your walls',
      totalTime: 'PT5M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      tool: {
        '@type': 'HowToTool',
        name: 'Wallpaper Calculator',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Measure Walls',
          text: 'Enter the length and height of each wall you want to wallpaper. You can add multiple walls.',
          url: getStepUrl('/wallpaper-calculator', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Count Openings',
          text: 'Enter the number of doors and windows on each wall. These areas will be automatically deducted.',
          url: getStepUrl('/wallpaper-calculator', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Enter Wallpaper Details',
          text: 'Input roll dimensions (standard is 20.5" × 33\'), pattern repeat size, match type (straight or offset), and waste rate.',
          url: getStepUrl('/wallpaper-calculator', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'View Results',
          text: 'Click "Calculate Wallpaper Needed" to see the number of rolls required and estimated cost.',
          url: getStepUrl('/wallpaper-calculator', 4),
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/wallpaper-calculator'),
      headline: 'Wallpaper Calculator - Complete Guide to Estimating Wallpaper',
      description: 'Learn how to accurately calculate wallpaper rolls needed for your project with our comprehensive guide.',
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
      image: getOgImage('wallpaper'),
      articleBody: 'Calculating the right amount of wallpaper is crucial for a successful wallpapering project...',
    },
  ],
};

export default function WallpaperCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <h1 className="sr-only">Wallpaper Calculator - Calculate Rolls Needed for Your Walls</h1>
      
      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Wallpaper Calculator"
        calculatorUrl="/wallpaper-calculator"
      />

      <WallpaperCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Calculate Wallpaper for Your Walls</h2>
          <p className="text-gray-700 mb-4">
            Calculating the correct amount of wallpaper ensures you have enough to complete your project while minimizing waste. Understanding pattern repeats, match types, and waste factors is essential for accurate estimation.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Standard Wallpaper Roll Sizes</h3>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Common Roll Dimensions</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>American Standard:</strong> 20.5 inches wide × 33 feet long (≈56 sq ft)</li>
              <li>• <strong>European Standard:</strong> 21 inches wide × 33 feet long (≈58 sq ft)</li>
              <li>• <strong>Commercial:</strong> 27 inches wide × 27 feet long (≈61 sq ft)</li>
              <li>• <strong>Mural/Custom:</strong> Varies by manufacturer</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Understanding Pattern Repeat</h3>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Pattern Repeat</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Waste Factor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">No Repeat (0")</td>
                  <td className="border border-gray-300 px-4 py-2">Solid colors, textures</td>
                  <td className="border border-gray-300 px-4 py-2">5-10%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Small (1-6")</td>
                  <td className="border border-gray-300 px-4 py-2">Tiny patterns, minimal matching</td>
                  <td className="border border-gray-300 px-4 py-2">10-15%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Medium (7-12")</td>
                  <td className="border border-gray-300 px-4 py-2">Standard patterns</td>
                  <td className="border border-gray-300 px-4 py-2">15-20%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Large (13-24")</td>
                  <td className="border border-gray-300 px-4 py-2">Bold designs</td>
                  <td className="border border-gray-300 px-4 py-2">20-25%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Extra Large (24"+)</td>
                  <td className="border border-gray-300 px-4 py-2">Oversized motifs</td>
                  <td className="border border-gray-300 px-4 py-2">25-30%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Match Types Explained</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">✅ Straight Match</h4>
              <p className="text-sm text-gray-700 mb-2">
                Pattern aligns horizontally at the same height on adjacent strips.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Easier to install</li>
                <li>• Less waste (10-15%)</li>
                <li>• Better for beginners</li>
                <li>• Faster installation</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">⚠️ Offset/Drop Match</h4>
              <p className="text-sm text-gray-700 mb-2">
                Pattern is offset by half the repeat on adjacent strips.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• More challenging to install</li>
                <li>• More waste (15-25%)</li>
                <li>• Requires experience</li>
                <li>• Creates diagonal flow</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Step-by-Step Calculation</h3>
          <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Measure Each Wall:</strong> Measure length and height in feet or meters</li>
            <li><strong>Calculate Area:</strong> Length × Height for each wall</li>
            <li><strong>Subtract Openings:</strong> Deduct doors (21 sq ft) and windows (15 sq ft)</li>
            <li><strong>Sum Total Area:</strong> Add all wall areas together</li>
            <li><strong>Add Waste Factor:</strong> Multiply by 1.10 to 1.25 (10-25% waste)</li>
            <li><strong>Divide by Roll Coverage:</strong> Typically 56 sq ft per standard roll</li>
            <li><strong>Round Up:</strong> Always round up to the nearest whole roll</li>
            <li><strong>Add Extra Rolls:</strong> Buy 1-2 additional rolls for future repairs</li>
          </ol>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Example Calculation</h3>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Living Room with 4 Walls</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p>Wall 1: 12' × 8' = 96 sq ft</p>
              <p>Wall 2: 15' × 8' = 120 sq ft</p>
              <p>Wall 3: 12' × 8' = 96 sq ft</p>
              <p>Wall 4: 15' × 8' = 120 sq ft</p>
              <p className="pt-2 border-t border-purple-300">Total: 432 sq ft</p>
              <p>Subtract 2 doors (42 sq ft) and 2 windows (30 sq ft): 432 - 72 = 360 sq ft</p>
              <p>Add 15% waste (medium pattern): 360 × 1.15 = 414 sq ft</p>
              <p>Divide by roll coverage: 414 ÷ 56 = 7.4 rolls</p>
              <p className="font-semibold pt-2 border-t border-purple-300">✓ Buy 8-9 rolls for this room</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Professional Installation Tips</h3>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>Check Dye Lots:</strong> Ensure all rolls are from the same production batch for color consistency</li>
              <li><strong>Prepare Walls:</strong> Clean, smooth, and prime walls before installation</li>
              <li><strong>Start from Center:</strong> Begin at the room's focal point and work outward</li>
              <li><strong>Use Plumb Line:</strong> Ensure first strip is perfectly vertical</li>
              <li><strong>Book the Paper:</strong> Let pasted wallpaper rest folded for 5-10 minutes</li>
              <li><strong>Smooth Carefully:</strong> Work from center outward to remove air bubbles</li>
              <li><strong>Trim Excess:</strong> Use sharp blade and change frequently</li>
              <li><strong>Clean Immediately:</strong> Wipe off excess paste before it dries</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Common Mistakes to Avoid</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Not accounting for pattern repeat - leads to shortages</li>
            <li>Buying from different dye lots - causes color variations</li>
            <li>Insufficient waste allowance - running short mid-project</li>
            <li>Not preparing walls properly - poor adhesion and bubbles</li>
            <li>Rushing the installation - misaligned patterns</li>
            <li>Using wrong adhesive type - peeling or damage</li>
            <li>Not saving extra rolls - unable to repair damage later</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Cost Considerations</h3>
          <p className="text-gray-700 mb-4">
            Wallpaper costs vary widely: budget options cost $15-30 per roll, mid-range wallpaper costs $30-60 per roll, and designer/luxury wallpaper costs $60-150+ per roll. While expensive wallpaper has higher upfront costs, quality wallpaper often lasts 10-15 years and can be easier to install and remove.
          </p>
          <p className="text-gray-700 mb-4">
            Additional costs include: wallpaper paste ($10-20), primer/sizing ($15-25), installation tools ($30-50), and professional installation ($2-7 per square foot if not DIY). For a typical 360 sq ft room, expect total material costs of $250-600 for mid-range wallpaper.
          </p>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/paint-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-semibold text-gray-900">Paint Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate paint needed</p>
          </a>
          <a href="/flooring-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🏠</div>
            <h3 className="font-semibold text-gray-900">Flooring Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate flooring materials</p>
          </a>
          <a href="/conversion-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-semibold text-gray-900">Unit Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert measurements</p>
          </a>
          <a href="/area-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📐</div>
            <h3 className="font-semibold text-gray-900">Area Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate area of shapes</p>
          </a>
        </div>
      </section>
    </div>
  );
}

