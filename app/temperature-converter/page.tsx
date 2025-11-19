import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import TemperatureConverter from '@/components/Calculator/TemperatureConverter';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Temperature Converter - Celsius, Fahrenheit, Kelvin & Rankine | AICalculator',
  description: 'Free temperature converter for Celsius, Fahrenheit, Kelvin, and Rankine. Instant conversions with formulas and reference temperatures.',
  keywords: [
    'temperature converter',
    'celsius to fahrenheit',
    'fahrenheit to celsius',
    'kelvin converter',
    'temperature conversion',
    'celsius fahrenheit converter',
    'temp converter',
    'temperature calculator',
    'c to f converter',
    'f to c converter',
    'celsius to kelvin',
    'fahrenheit to kelvin',
    'rankine converter',
    'temperature conversion calculator',
    'convert temperature',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Temperature Converter - Convert C, F, K, R',
    description: 'Convert between Celsius, Fahrenheit, Kelvin, and Rankine instantly with formulas and reference temperatures.',
    type: 'website',
    url: getUrl('/temperature-converter'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('temperature'),
      width: 1200,
      height: 630,
      alt: 'Temperature Converter',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Temperature Converter',
    description: 'Convert temperatures instantly',
    images: [getOgImage('temperature')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/temperature-converter'),
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
      '@id': getWebAppId('/temperature-converter'),
      name: 'Temperature Converter',
      url: getUrl('/temperature-converter'),
      description: 'Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine with instant results, conversion formulas, and reference temperatures.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Celsius to Fahrenheit conversion',
        'Fahrenheit to Celsius conversion',
        'Kelvin conversion',
        'Rankine conversion',
        'Bidirectional conversion',
        'Conversion formulas display',
        'Reference temperatures',
        'Temperature context',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/temperature-converter'),
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
          name: 'Temperature Converter',
          item: getUrl('/temperature-converter'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/temperature-converter'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do you convert Celsius to Fahrenheit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To convert Celsius to Fahrenheit, use the formula: °F = (°C × 9/5) + 32. For example, 20°C = (20 × 9/5) + 32 = 68°F. Quick method: multiply by 2 and add 30 for an approximate conversion (20°C × 2 + 30 = 70°F, close to 68°F).',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you convert Fahrenheit to Celsius?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To convert Fahrenheit to Celsius, use the formula: °C = (°F - 32) × 5/9. For example, 68°F = (68 - 32) × 5/9 = 20°C. Quick method: subtract 30 and divide by 2 for an approximate conversion (68°F - 30) / 2 = 19°C, close to 20°C).',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between Celsius and Kelvin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Kelvin and Celsius use the same scale size (1°C = 1K), but Kelvin starts at absolute zero (-273.15°C). To convert: K = °C + 273.15. For example, 0°C = 273.15K, and 100°C = 373.15K. Kelvin is used in scientific applications and never uses the degree symbol (just K, not °K).',
          },
        },
        {
          '@type': 'Question',
          name: 'Which countries use Fahrenheit vs Celsius?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Celsius is used by most countries worldwide (195+ countries). Fahrenheit is primarily used in the United States, and to a lesser extent in the Bahamas, Belize, Cayman Islands, and Palau. The US is the only major industrialized country still using Fahrenheit for everyday temperatures. Scientists worldwide use Celsius or Kelvin.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/temperature-converter'),
      name: 'How to Convert Temperature',
      description: 'Convert between different temperature scales',
      totalTime: 'PT1M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      tool: {
        '@type': 'HowToTool',
        name: 'Temperature Converter',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Enter Temperature',
          text: 'Type the temperature value you want to convert in the input field.',
          url: getStepUrl('/temperature-converter', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Select Source Unit',
          text: 'Choose the unit you are converting from: Celsius, Fahrenheit, Kelvin, or Rankine.',
          url: getStepUrl('/temperature-converter', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Convert',
          text: 'Click "Convert Temperature" to see the value in all temperature scales simultaneously.',
          url: getStepUrl('/temperature-converter', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'View Results',
          text: 'See your temperature converted to Celsius, Fahrenheit, Kelvin, and Rankine with context and comparisons.',
          url: getStepUrl('/temperature-converter', 4),
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/temperature-converter'),
      headline: 'Temperature Converter - Complete Guide to Temperature Scales',
      description: 'Comprehensive guide to converting between Celsius, Fahrenheit, Kelvin, and Rankine temperature scales.',
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
      image: getOgImage('temperature'),
      articleBody: 'Understanding temperature conversion is essential for international communication, scientific work, and everyday life...',
    },
  ],
};

export default function TemperatureConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <h1 className="sr-only">Temperature Converter - Celsius, Fahrenheit, Kelvin & Rankine</h1>
      
      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Temperature Converter"
        calculatorUrl="/temperature-converter"
      />

      <TemperatureConverter />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Temperature Scales</h2>
          <p className="text-gray-700 mb-4">
            Temperature is a measure of thermal energy, and different scales have been developed throughout history to measure it. Understanding how to convert between these scales is essential for international communication, scientific work, cooking, and everyday life.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">The Four Temperature Scales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">🌡️ Celsius (°C)</h4>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Used by:</strong> Most of the world (195+ countries)
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Water freezes at 0°C</li>
                <li>• Water boils at 100°C</li>
                <li>• Based on water's properties</li>
                <li>• Named after Anders Celsius</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">🌡️ Fahrenheit (°F)</h4>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Used by:</strong> United States, some Caribbean nations
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Water freezes at 32°F</li>
                <li>• Water boils at 212°F</li>
                <li>• 180 degrees between freeze/boil</li>
                <li>• Named after Daniel Fahrenheit</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">🌡️ Kelvin (K)</h4>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Used by:</strong> Scientists worldwide
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Starts at absolute zero (0K)</li>
                <li>• Water freezes at 273.15K</li>
                <li>• Water boils at 373.15K</li>
                <li>• SI unit for temperature</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">🌡️ Rankine (°R)</h4>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Used by:</strong> Some US engineering applications
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Starts at absolute zero (0°R)</li>
                <li>• Water freezes at 491.67°R</li>
                <li>• Water boils at 671.67°R</li>
                <li>• Rarely used today</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Conversion Formulas</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-900 mb-2">From Celsius:</p>
                <ul className="space-y-1 text-gray-700">
                  <li>• To Fahrenheit: °F = (°C × 9/5) + 32</li>
                  <li>• To Kelvin: K = °C + 273.15</li>
                  <li>• To Rankine: °R = (°C + 273.15) × 9/5</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">From Fahrenheit:</p>
                <ul className="space-y-1 text-gray-700">
                  <li>• To Celsius: °C = (°F - 32) × 5/9</li>
                  <li>• To Kelvin: K = (°F + 459.67) × 5/9</li>
                  <li>• To Rankine: °R = °F + 459.67</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Quick Mental Conversions</h3>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Celsius to Fahrenheit (Approximate)</h4>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Method:</strong> Multiply by 2 and add 30
            </p>
            <p className="text-sm text-gray-700">
              Example: 20°C → (20 × 2) + 30 = 70°F (actual: 68°F)
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Fahrenheit to Celsius (Approximate)</h4>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Method:</strong> Subtract 30 and divide by 2
            </p>
            <p className="text-sm text-gray-700">
              Example: 70°F → (70 - 30) / 2 = 20°C (actual: 21°C)
            </p>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Common Temperature References</h3>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">°C</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">°F</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">K</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Absolute Zero</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">-273.15</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">-459.67</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">0</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Dry Ice Sublimes</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">-78.5</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">-109.3</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">194.65</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Water Freezes</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">0</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">32</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">273.15</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Room Temperature</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">20-22</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">68-72</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">293-295</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Human Body Temp</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">37</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">98.6</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">310.15</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Water Boils (sea level)</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">100</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">212</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">373.15</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Oven Baking</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">180-220</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">350-425</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">453-493</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Historical Context</h3>
          <p className="text-gray-700 mb-4">
            <strong>Fahrenheit (1724):</strong> Daniel Fahrenheit created his scale using three reference points: the coldest temperature he could create with ice and salt (0°F), the freezing point of water (32°F), and human body temperature (originally 96°F, later adjusted to 98.6°F).
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Celsius (1742):</strong> Anders Celsius proposed a scale with 0° as water's boiling point and 100° as its freezing point. This was later inverted to the current system where 0°C is freezing and 100°C is boiling.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Kelvin (1848):</strong> William Thomson (Lord Kelvin) proposed an absolute temperature scale starting at absolute zero, the theoretical lowest possible temperature where molecular motion stops.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Practical Applications</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li><strong>Cooking:</strong> Recipe conversions between Celsius and Fahrenheit ovens</li>
            <li><strong>Weather:</strong> Understanding forecasts when traveling internationally</li>
            <li><strong>Science:</strong> Laboratory work requires Kelvin for absolute measurements</li>
            <li><strong>Medicine:</strong> Body temperature monitoring (37°C = 98.6°F = fever threshold)</li>
            <li><strong>HVAC:</strong> Setting thermostats in different regions</li>
            <li><strong>Manufacturing:</strong> Process control in international operations</li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/conversion-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-semibold text-gray-900">Unit Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert all units</p>
          </a>
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
          <a href="/volume-converter" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🧪</div>
            <h3 className="font-semibold text-gray-900">Volume Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert volume units</p>
          </a>
        </div>
      </section>
    </div>
  );
}

