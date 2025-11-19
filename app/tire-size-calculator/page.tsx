import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import TireSizeCalculator from '@/components/Calculator/TireSizeCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: "Tire Size Calculator - Compare Dimensions & Check Compatibility | AICalculator",
  description: "Free tire size calculator to compare dimensions, check compatibility, calculate speedometer error, and find alternative tire sizes. Convert tire sizes and compare specifications instantly.",
  keywords: [
    "tire size calculator",
    "tire comparison calculator",
    "tire size converter",
    "wheel size calculator",
    "tire diameter calculator",
    "speedometer error calculator",
    "tire fitment calculator",
    "tire size comparison",
    "tire compatibility checker",
    "plus size calculator",
    "tire circumference calculator",
    "rim size calculator",
    "tire aspect ratio calculator",
    "sidewall height calculator",
    "tire revolutions calculator",
    "alternative tire sizes",
    "tire size guide",
    "tire dimensions calculator",
    "odometer error calculator",
    "tire clearance calculator",
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Tire Size Calculator - Compare & Check Compatibility",
    description: "Calculate tire dimensions, compare sizes, and check speedometer accuracy. Find compatible tire sizes for your vehicle.",
    type: 'website',
    url: getUrl('/tire-size-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('tire-size'),
      width: 1200,
      height: 630,
      alt: "Tire Size Calculator"
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tire Size Calculator - Compare Dimensions",
    description: "Calculate tire dimensions, compare sizes, and check speedometer accuracy with our comprehensive tire calculator.",
    images: [getOgImage('tire-size')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/tire-size-calculator'),
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

export default function TireSizeCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/tire-size-calculator'),
        name: "Tire Size Calculator",
        url: getUrl('/tire-size-calculator'),
        description: "Comprehensive tire size calculator for comparing dimensions, checking compatibility, and calculating speedometer errors.",
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Tire dimension calculator',
          'Size comparison tool',
          'Speedometer error calculation',
          'Compatibility checker',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/tire-size-calculator'),
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
            name: "Tire Size Calculator",
            item: getUrl('/tire-size-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/tire-size-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: "How do I read tire size numbers?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Tire size format P265/70R17 breaks down as: P = Passenger tire, 265 = Width in millimeters, 70 = Aspect ratio (sidewall height as percentage of width), R = Radial construction, 17 = Rim diameter in inches. Example: 265/70R17 means 265mm wide, sidewall is 70% of 265mm (185.5mm), fits 17-inch rim. Total diameter = (185.5mm × 2) + (17 × 25.4mm) = 802.8mm or 31.6 inches.",
            },
          },
          {
            '@type': 'Question',
            name: "Can I change my tire size?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes, but keep within ±3% of original diameter to maintain speedometer accuracy and avoid clearance issues. Larger tires increase ground clearance but read slower on speedometer. Smaller tires decrease clearance and read faster. Example: 265/70R17 (31.6 inches) can safely switch to 255/75R17 (31.1 inches, -1.6%) or 285/70R17 (32.7 inches, +3.5%). Always check wheel well clearance and consult manufacturer guidelines.",
            },
          },
          {
            '@type': 'Question',
            name: "How does tire size affect speedometer?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Larger tires make speedometer read slower than actual speed. Formula: Error = ((New Circumference / Old Circumference) - 1) × 100%. Example: Changing from 265/70R17 (2522mm circumference) to 285/75R17 (2677mm circumference): Error = (2677/2522 - 1) × 100% = +6.1%. At indicated 60 mph, actual speed is 63.7 mph. This also affects odometer readings proportionally.",
            },
          },
          {
            '@type': 'Question',
            name: "What is tire aspect ratio?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Aspect ratio is sidewall height as percentage of tire width. Lower numbers = shorter sidewalls (sportier, stiffer ride). Higher numbers = taller sidewalls (smoother ride). Example: 265/70 has 70% aspect ratio, sidewall = 265mm × 0.70 = 185.5mm. 265/40 has 40% aspect ratio, sidewall = 265mm × 0.40 = 106mm. Lower aspect ratios improve handling but reduce comfort and are more expensive.",
            },
          },
          {
            '@type': 'Question',
            name: "How to calculate tire diameter?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Total diameter = (Sidewall Height × 2) + (Rim Diameter × 25.4). Sidewall Height = Width × Aspect Ratio / 100. Example for 265/70R17: Sidewall = 265 × 0.70 = 185.5mm. Diameter = (185.5 × 2) + (17 × 25.4) = 371 + 431.8 = 802.8mm = 31.6 inches. This determines speedometer calibration, ground clearance, and overall vehicle height.",
            },
          },
          {
            '@type': 'Question',
            name: "What are plus sizing and minus sizing?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Plus sizing increases rim diameter while decreasing aspect ratio to maintain overall diameter. Example: 265/70R17 (31.6 inch) to 265/55R20 (31.0 inch). Benefits: improved handling, appearance. Drawbacks: harsher ride, higher cost. Minus sizing reverses this for winter tires (narrower, taller sidewalls). Always maintain ±3% diameter tolerance for speedometer accuracy and proper ABS/traction control function.",
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/tire-size-calculator'),
        name: "How to Use Tire Size Calculator",
        description: "Guide to calculating tire dimensions and comparing sizes.",
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: "Tire Size Calculator",
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Original Tire Size',
            text: 'Input your current tire dimensions: width (mm), aspect ratio (%), construction type (R/D/B), and rim diameter (inches). Example: 265/70R17.',
            url: getStepUrl('/tire-size-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Choose Comparison Mode',
            text: 'Select whether to compare with a new tire size. Choose No for single tire specifications, or Yes to compare two sizes.',
            url: getStepUrl('/tire-size-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter New Tire Size',
            text: 'If comparing, input the new tire dimensions you are considering. This allows size comparison and compatibility checking.',
            url: getStepUrl('/tire-size-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate Specifications',
            text: 'Click Calculate to see detailed tire specifications including diameter, circumference, sidewall height, and revolutions per mile.',
            url: getStepUrl('/tire-size-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Review Comparison Results',
            text: 'If comparing, review diameter differences, speedometer error, odometer impact, and ground clearance changes.',
            url: getStepUrl('/tire-size-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Check Compatibility',
            text: 'Verify the compatibility indicator. Green (within ±3%) means safe replacement. Orange means caution required.',
            url: getStepUrl('/tire-size-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/tire-size-calculator'),
        headline: "Complete Guide to Tire Sizing",
        description: "Learn tire size calculations, compatibility, and selection.",
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
        image: getOgImage('tire-size'),
        articleBody: "Comprehensive guide to understanding tire sizes, calculating dimensions, and selecting compatible replacements.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Tire Size Calculator - Compare Dimensions & Check Compatibility</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Tire Size Calculator"
        calculatorUrl="/tire-size-calculator"
      />

      {/* Calculator Component */}
      <TireSizeCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Tire Sizes and Dimensions</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700">
              <strong>Quick Summary:</strong> Calculate tire dimensions, compare sizes, and check compatibility. Understand speedometer errors, ground clearance changes, and find alternative tire sizes for your vehicle.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How to Read Tire Sizes</h3>
          <p className="text-gray-700 mb-4">
            Tire size format (example: P265/70R17) contains crucial information: P indicates Passenger tire (LT for Light Truck), 265 is width in millimeters, 70 is aspect ratio (sidewall height as percentage of width), R means Radial construction, 17 is rim diameter in inches. This standardized format allows accurate calculations and comparisons.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Tire Size Calculations</h3>
          <p className="text-gray-700 mb-4">
            <strong>Sidewall Height</strong> = Width × Aspect Ratio / 100. Example: 265/70 tire has sidewall = 265mm × 0.70 = 185.5mm.
            <strong>Total Diameter</strong> = (Sidewall × 2) + (Rim Diameter × 25.4). Example: (185.5 × 2) + (17 × 25.4) = 802.8mm = 31.6 inches.
            <strong>Circumference</strong> = π × Diameter. This determines speedometer calibration and odometer readings.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Speedometer and Odometer Effects</h3>
          <p className="text-gray-700 mb-4">
            Changing tire size affects speedometer and odometer accuracy. Larger tires make your speedometer read slower than actual speed because the wheel completes fewer revolutions per mile. Formula: Error = ((New Circumference / Old Circumference) - 1) × 100%. Industry standard allows ±3% for proper ABS, traction control, and cruise control function. Exceeding this may require recalibration.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Resources</h3>
          <p className="text-gray-700 mb-4">
            For more information on tire sizing and vehicle safety:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <a href="https://www.nhtsa.gov/equipment/tires" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                NHTSA - Tire Safety Information
              </a>
            </li>
            <li>
              <a href="https://www.tirerack.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Tire Rack - Tire Information
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/gas-mileage-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⛽</div>
            <h3 className="font-semibold text-gray-900">Gas Mileage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate fuel efficiency and MPG</p>
          </a>
          
          <a 
            href="/speed-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900">Speed Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Convert speed units</p>
          </a>
          
          <a 
            href="/distance-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📏</div>
            <h3 className="font-semibold text-gray-900">Distance Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate distances</p>
          </a>
          
          <a 
            href="/unit-converter" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-semibold text-gray-900">Unit Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert all units</p>
          </a>
        </div>
      </section>
    </div>
  );
}

