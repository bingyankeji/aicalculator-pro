import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import ConversionCalculator from '@/components/Calculator/ConversionCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Unit Converter - Convert Length, Weight, Volume & More | AICalculator',
  description: 'Free online unit converter for length, weight, volume, temperature, area, speed, pressure, and energy. Instant conversions with high precision.',
  keywords: [
    'unit converter',
    'conversion calculator',
    'length converter',
    'weight converter',
    'volume converter',
    'temperature converter',
    'metric converter',
    'imperial converter',
    'unit conversion',
    'convert units',
    'measurement converter',
    'online converter',
    'free converter',
    'area converter',
    'speed converter',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Unit Converter - Convert Any Unit Instantly',
    description: 'Convert between length, weight, volume, temperature, and more. Fast, accurate, and easy to use.',
    type: 'website',
    url: getUrl('/conversion-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('conversion'),
      width: 1200,
      height: 630,
      alt: 'Unit Converter',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unit Converter',
    description: 'Convert any unit instantly',
    images: [getOgImage('conversion')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/conversion-calculator'),
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
      '@id': getWebAppId('/conversion-calculator'),
      name: 'Unit Converter',
      url: getUrl('/conversion-calculator'),
      description: 'Comprehensive unit converter supporting 8 categories: length, weight, volume, temperature, area, speed, pressure, and energy conversions.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Length conversion (meters, feet, miles, etc.)',
        'Weight conversion (kg, pounds, ounces, etc.)',
        'Volume conversion (liters, gallons, etc.)',
        'Temperature conversion (Celsius, Fahrenheit, Kelvin)',
        'Area conversion (square meters, acres, etc.)',
        'Speed conversion (km/h, mph, m/s)',
        'Pressure conversion (Pa, psi, bar)',
        'Energy conversion (joules, calories, kWh)',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/conversion-calculator'),
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
          name: 'Conversion Calculator',
          item: getUrl('/conversion-calculator'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/conversion-calculator'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I convert between metric and imperial units?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Select your category (length, weight, etc.), enter the value in the "From" field, choose your starting unit (e.g., meters), and select your target unit (e.g., feet). The conversion happens automatically. Common conversions: 1 meter = 3.28 feet, 1 kilogram = 2.20 pounds, 1 liter = 0.26 gallons.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between Celsius and Fahrenheit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Celsius and Fahrenheit are temperature scales. Water freezes at 0°C (32°F) and boils at 100°C (212°F). To convert: °F = (°C × 9/5) + 32, or °C = (°F - 32) × 5/9. Celsius is used worldwide, while Fahrenheit is primarily used in the United States.',
          },
        },
        {
          '@type': 'Question',
          name: 'How accurate are the unit conversions?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our converter uses standard conversion factors with up to 6 decimal places of precision. For example, 1 inch = 0.0254 meters exactly, 1 pound = 0.453592 kg. This precision is suitable for most practical applications, from cooking to construction to scientific calculations.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I convert multiple units at once?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! When you enter a value, the calculator automatically shows conversions to all available units in that category. For example, entering 1 meter will show conversions to kilometers, centimeters, feet, inches, and more simultaneously.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/conversion-calculator'),
      name: 'How to Use Unit Converter',
      description: 'Convert between different units of measurement',
      totalTime: 'PT1M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      tool: {
        '@type': 'HowToTool',
        name: 'Unit Converter',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Select Category',
          text: 'Choose the type of conversion you need: Length, Weight, Volume, Temperature, Area, Speed, Pressure, or Energy.',
          url: getStepUrl('/conversion-calculator', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Enter Value',
          text: 'Type the value you want to convert in the "From" field and select the starting unit from the dropdown.',
          url: getStepUrl('/conversion-calculator', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Select Target Unit',
          text: 'Choose the unit you want to convert to from the "To" dropdown. The result appears automatically.',
          url: getStepUrl('/conversion-calculator', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'View All Conversions',
          text: 'See your value converted to all available units in the selected category for quick reference.',
          url: getStepUrl('/conversion-calculator', 4),
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/conversion-calculator'),
      headline: 'Unit Converter - Complete Guide to Unit Conversions',
      description: 'Comprehensive guide to converting between different units of measurement across multiple categories.',
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
      image: getOgImage('conversion'),
      articleBody: 'Unit conversion is essential in daily life, from cooking to construction to international communication...',
    },
  ],
};

export default function ConversionCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <h1 className="sr-only">Unit Converter - Convert Length, Weight, Volume & More</h1>
      
      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Unit Converter"
        calculatorUrl="/conversion-calculator"
      />

      <ConversionCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Unit Conversions</h2>
          <p className="text-gray-700 mb-4">
            Unit conversion is the process of converting a measurement from one unit to another. Whether you're traveling internationally, following a recipe, or working on a construction project, understanding how to convert between different measurement systems is essential.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Common Conversion Categories</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">📏 Length</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 1 meter = 3.28084 feet</li>
                <li>• 1 kilometer = 0.621371 miles</li>
                <li>• 1 inch = 2.54 centimeters</li>
                <li>• 1 yard = 0.9144 meters</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">⚖️ Weight</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 1 kilogram = 2.20462 pounds</li>
                <li>• 1 pound = 16 ounces</li>
                <li>• 1 metric ton = 1000 kg</li>
                <li>• 1 ounce = 28.3495 grams</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">🧪 Volume</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 1 liter = 0.264172 gallons (US)</li>
                <li>• 1 gallon (US) = 3.78541 liters</li>
                <li>• 1 cup = 236.588 milliliters</li>
                <li>• 1 cubic meter = 1000 liters</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">🌡️ Temperature</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 0°C = 32°F = 273.15 K</li>
                <li>• 100°C = 212°F = 373.15 K</li>
                <li>• °F = (°C × 9/5) + 32</li>
                <li>• °C = (°F - 32) × 5/9</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Metric vs Imperial Systems</h3>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Measurement</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Metric System</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Imperial System</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Length</td>
                  <td className="border border-gray-300 px-4 py-2">Meter (m), Kilometer (km)</td>
                  <td className="border border-gray-300 px-4 py-2">Foot (ft), Mile (mi)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Weight</td>
                  <td className="border border-gray-300 px-4 py-2">Gram (g), Kilogram (kg)</td>
                  <td className="border border-gray-300 px-4 py-2">Ounce (oz), Pound (lb)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Volume</td>
                  <td className="border border-gray-300 px-4 py-2">Liter (L), Milliliter (mL)</td>
                  <td className="border border-gray-300 px-4 py-2">Gallon (gal), Fluid Ounce (fl oz)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Temperature</td>
                  <td className="border border-gray-300 px-4 py-2">Celsius (°C)</td>
                  <td className="border border-gray-300 px-4 py-2">Fahrenheit (°F)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Practical Applications</h3>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Everyday Use Cases</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>Cooking & Baking:</strong> Convert recipe measurements between metric and imperial (cups to milliliters, ounces to grams)</li>
              <li><strong>Travel:</strong> Understand speed limits (km/h to mph), distances (kilometers to miles), and temperatures abroad</li>
              <li><strong>Shopping:</strong> Compare product sizes and weights when shopping internationally or online</li>
              <li><strong>Home Improvement:</strong> Convert measurements for materials (square feet to square meters, gallons to liters)</li>
              <li><strong>Fitness:</strong> Track weight in different units, convert running distances</li>
              <li><strong>Science & Education:</strong> Perform calculations requiring specific unit systems</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Conversion Tips</h3>
          <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Know Common Conversions:</strong> Memorize frequently used conversions for quick mental math (e.g., 1 kg ≈ 2.2 lbs)</li>
            <li><strong>Use Precision Appropriately:</strong> For cooking, round to practical measurements; for science, use full precision</li>
            <li><strong>Double-Check Critical Conversions:</strong> In professional settings, verify important conversions</li>
            <li><strong>Understand Context:</strong> Some units have regional variations (US gallon vs UK gallon)</li>
            <li><strong>Use Conversion Tables:</strong> Keep reference tables handy for complex or uncommon conversions</li>
          </ol>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Why Unit Conversion Matters</h3>
          <p className="text-gray-700 mb-4">
            Accurate unit conversion is crucial in many fields. In medicine, incorrect dosage conversions can be life-threatening. In engineering, conversion errors have caused project failures and accidents. The Mars Climate Orbiter was lost in 1999 due to a conversion error between metric and imperial units, costing $327 million.
          </p>
          <p className="text-gray-700 mb-4">
            Understanding unit conversions also promotes global communication and collaboration. While most countries use the metric system, the United States primarily uses imperial units. Being fluent in both systems facilitates international business, travel, and scientific cooperation.
          </p>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/length-converter" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📏</div>
            <h3 className="font-semibold text-gray-900">Length Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert length units</p>
          </a>
          <a href="/weight-converter" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold text-gray-900">Weight Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert weight units</p>
          </a>
          <a href="/bmi-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🏥</div>
            <h3 className="font-semibold text-gray-900">BMI Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate body mass index</p>
          </a>
          <a href="/percentage-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">%</div>
            <h3 className="font-semibold text-gray-900">Percentage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate percentages</p>
          </a>
        </div>
      </section>
    </div>
  );
}

