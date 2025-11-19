import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import PaintCalculator from '@/components/Calculator/PaintCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Paint Calculator - Calculate Paint Needed for Your Room | AICalculator',
  description: 'Free paint calculator to estimate how much paint you need for your walls. Calculate gallons, liters, and costs based on room dimensions, coats, and coverage rate.',
  keywords: [
    'paint calculator',
    'paint estimator',
    'how much paint do i need',
    'paint coverage calculator',
    'wall paint calculator',
    'room paint calculator',
    'paint cost calculator',
    'paint gallon calculator',
    'interior paint calculator',
    'paint quantity calculator',
    'paint estimate',
    'painting calculator',
    'paint needed',
    'paint coverage',
    'primer calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Paint Calculator - Estimate Paint Needed',
    description: 'Calculate how much paint you need for your walls. Get accurate estimates in gallons and liters with cost breakdown.',
    type: 'website',
    url: getUrl('/paint-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('paint'),
      width: 1200,
      height: 630,
      alt: 'Paint Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paint Calculator',
    description: 'Calculate paint needed for your room',
    images: [getOgImage('paint')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/paint-calculator'),
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
      '@id': getWebAppId('/paint-calculator'),
      name: 'Paint Calculator',
      url: getUrl('/paint-calculator'),
      description: 'Calculate paint needed for walls based on room dimensions, number of coats, coverage rate, and automatically deduct doors and windows.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Multiple room support',
        'Automatic door and window deduction',
        'Paint and primer calculation',
        'Coverage rate customization',
        'Cost estimation',
        'Gallons and liters conversion',
        'Latex and oil-based paint options',
        '1-3 coat selection',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/paint-calculator'),
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
          name: 'Paint Calculator',
          item: getUrl('/paint-calculator'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/paint-calculator'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much paint do I need for a room?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To calculate paint needed: 1) Measure room length, width, and height, 2) Calculate wall area = (2 × length + 2 × width) × height, 3) Subtract doors (21 sq ft each) and windows (15 sq ft each), 4) Divide by coverage rate (typically 350-400 sq ft per gallon), 5) Multiply by number of coats. For example, a 12×15 ft room with 8 ft ceilings needs approximately 2-3 gallons for 2 coats.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much area does one gallon of paint cover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'One gallon of paint typically covers 350-400 square feet per coat on smooth surfaces. Coverage varies based on: surface texture (rough surfaces use more paint), paint quality (premium paints often cover better), application method (spraying uses more than rolling), and surface porosity (new drywall absorbs more paint). Always check the manufacturer\'s coverage rate on the paint can.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need primer before painting?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Primer is recommended when: painting new drywall or bare wood, making dramatic color changes (especially dark to light), covering stains or marks, painting over glossy surfaces, or using a significantly different paint type. Primer improves paint adhesion, provides uniform coverage, and can reduce the number of paint coats needed. For minor repaints in similar colors, primer may not be necessary.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between latex and oil-based paint?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Latex (water-based) paint: dries quickly (1-2 hours), easy cleanup with water, low odor, flexible and breathable, ideal for most interior walls. Oil-based paint: takes 6-8 hours to dry, requires mineral spirits for cleanup, stronger odor, more durable finish, better for high-traffic areas and trim. Most homeowners prefer latex for walls due to ease of use and lower VOCs.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/paint-calculator'),
      name: 'How to Calculate Paint Needed',
      description: 'Calculate the amount of paint required for your room',
      totalTime: 'PT5M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      tool: {
        '@type': 'HowToTool',
        name: 'Paint Calculator',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Measure Room Dimensions',
          text: 'Enter the length, width, and height of each room you want to paint. You can add multiple rooms.',
          url: getStepUrl('/paint-calculator', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Count Doors and Windows',
          text: 'Enter the number of doors and windows in each room. These areas will be automatically deducted from the total wall area.',
          url: getStepUrl('/paint-calculator', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Select Paint Options',
          text: 'Choose number of coats (1-3), paint type (latex or oil-based), coverage rate, and whether you need primer.',
          url: getStepUrl('/paint-calculator', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'View Results',
          text: 'Click "Calculate Paint Needed" to see the amount of paint in gallons and liters, plus estimated cost.',
          url: getStepUrl('/paint-calculator', 4),
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/paint-calculator'),
      headline: 'Paint Calculator - Complete Guide to Estimating Paint',
      description: 'Learn how to accurately calculate paint needed for your painting project with our comprehensive guide.',
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
      image: getOgImage('paint'),
      articleBody: 'Calculating the right amount of paint is essential for any painting project to avoid waste and extra trips to the store...',
    },
  ],
};

export default function PaintCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <h1 className="sr-only">Paint Calculator - Calculate Paint Needed for Your Room</h1>
      
      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Paint Calculator"
        calculatorUrl="/paint-calculator"
      />

      <PaintCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Calculate Paint for Your Room</h2>
          <p className="text-gray-700 mb-4">
            Calculating the right amount of paint ensures you have enough to complete your project without excessive waste or multiple store trips. Our paint calculator makes this process simple and accurate.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Paint Coverage Basics</h3>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Standard Coverage Rates</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>Smooth walls:</strong> 400 sq ft per gallon</li>
              <li>• <strong>Average texture:</strong> 350 sq ft per gallon</li>
              <li>• <strong>Rough/textured walls:</strong> 300 sq ft per gallon</li>
              <li>• <strong>Primer:</strong> 350-400 sq ft per gallon</li>
              <li>• <strong>Ceiling paint:</strong> 350-400 sq ft per gallon</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Step-by-Step Calculation</h3>
          <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Measure Your Room:</strong> Measure length, width, and height in feet or meters</li>
            <li><strong>Calculate Wall Area:</strong> (Length + Width) × 2 × Height = Total wall area</li>
            <li><strong>Subtract Openings:</strong> Deduct doors (21 sq ft each) and windows (15 sq ft each)</li>
            <li><strong>Determine Paint Needed:</strong> Divide net area by coverage rate (usually 350 sq ft/gallon)</li>
            <li><strong>Multiply by Coats:</strong> Most projects need 2 coats for best results</li>
            <li><strong>Add Extra:</strong> Buy 10-15% extra for touch-ups and future repairs</li>
          </ol>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Example Calculation</h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">12' × 15' Room with 8' Ceilings</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p>1. Wall perimeter: (12 + 15) × 2 = 54 feet</p>
              <p>2. Total wall area: 54 × 8 = 432 sq ft</p>
              <p>3. Subtract 1 door (21 sq ft) and 2 windows (30 sq ft): 432 - 51 = 381 sq ft</p>
              <p>4. Paint for 1 coat: 381 ÷ 350 = 1.09 gallons</p>
              <p>5. Paint for 2 coats: 1.09 × 2 = 2.18 gallons</p>
              <p className="font-semibold pt-2 border-t border-green-300">✓ Buy 2.5-3 gallons for this room</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Paint Types Comparison</h3>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Feature</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Latex (Water-Based)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Oil-Based</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Drying Time</td>
                  <td className="border border-gray-300 px-4 py-2">1-2 hours</td>
                  <td className="border border-gray-300 px-4 py-2">6-8 hours</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Cleanup</td>
                  <td className="border border-gray-300 px-4 py-2">Soap and water</td>
                  <td className="border border-gray-300 px-4 py-2">Mineral spirits</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Odor</td>
                  <td className="border border-gray-300 px-4 py-2">Low/Minimal</td>
                  <td className="border border-gray-300 px-4 py-2">Strong</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Durability</td>
                  <td className="border border-gray-300 px-4 py-2">Good</td>
                  <td className="border border-gray-300 px-4 py-2">Excellent</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Best For</td>
                  <td className="border border-gray-300 px-4 py-2">Walls, ceilings</td>
                  <td className="border border-gray-300 px-4 py-2">Trim, doors, cabinets</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">When to Use Primer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">✅ Primer Recommended</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• New drywall or plaster</li>
                <li>• Bare wood surfaces</li>
                <li>• Dark to light color changes</li>
                <li>• Covering stains or marks</li>
                <li>• Glossy surfaces</li>
                <li>• Porous surfaces (brick, concrete)</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">⚠️ Primer Optional</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Previously painted walls in good condition</li>
                <li>• Similar color repainting</li>
                <li>• Using paint + primer combo</li>
                <li>• Light to dark color changes</li>
                <li>• Touch-up work</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Professional Painting Tips</h3>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>Buy Quality Paint:</strong> Premium paint covers better and lasts longer, often requiring fewer coats</li>
              <li><strong>Two Thin Coats:</strong> Better than one thick coat for even coverage and durability</li>
              <li><strong>Keep Extra Paint:</strong> Store leftover paint for touch-ups (label with room name and date)</li>
              <li><strong>Proper Preparation:</strong> Clean walls, fill holes, and sand for best results</li>
              <li><strong>Use Right Tools:</strong> Quality brushes and rollers make application easier and smoother</li>
              <li><strong>Test Colors:</strong> Buy sample sizes to test colors before committing to full gallons</li>
              <li><strong>Calculate Ceiling Separately:</strong> If painting ceiling, calculate its area separately</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Cost Considerations</h3>
          <p className="text-gray-700 mb-4">
            Paint costs vary widely based on quality and brand. Budget paint costs $15-25 per gallon, mid-range paint costs $25-40 per gallon, and premium paint costs $40-80+ per gallon. While premium paint costs more upfront, it often provides better coverage, requiring fewer coats and less total paint, potentially saving money overall.
          </p>
          <p className="text-gray-700 mb-4">
            Don't forget additional costs: primer ($20-30/gallon), painter's tape ($5-10), drop cloths ($10-20), brushes and rollers ($15-30), and paint trays ($5-10). For professional painting, labor typically costs 2-3 times the material cost.
          </p>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/wallpaper-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📜</div>
            <h3 className="font-semibold text-gray-900">Wallpaper Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate wallpaper rolls needed</p>
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

