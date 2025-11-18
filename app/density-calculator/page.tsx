import type { Metadata } from 'next';
import DensityCalculator from '@/components/Calculator/DensityCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Density Calculator - Calculate Density, Volume & Mass | Free Online Tool',
  description: 'Free density calculator for accurate density, volume, and mass calculations. Convert between kg/m³, g/cm³, lb/ft³ with instant results. Perfect for physics, chemistry, and engineering.',
  keywords: [
    'density calculator',
    'density formula calculator',
    'calculate density',
    'mass volume density calculator',
    'density conversion',
    'density unit converter',
    'kg/m3 to g/cm3',
    'density equation calculator',
    'material density calculator',
    'physics density calculator',
    'chemistry density calculator',
    'volume calculator',
    'mass calculator',
    'density to mass',
    'density to volume',
    'specific gravity calculator',
    'density converter',
    'density units',
    'calculate mass from density',
    'calculate volume from density',
    'density measurement',
    'bulk density calculator',
    'liquid density calculator',
    'solid density calculator',
    'density calculation formula',
    'online density calculator',
    'free density calculator',
    'density calculator with units',
    'g/ml to kg/m3',
    'density science calculator',
    'density physics tool',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Density Calculator - Calculate Density, Volume & Mass',
    description: 'Free density calculator for accurate density, volume, and mass calculations with multiple unit conversions.',
    type: 'website',
    url: getUrl('/density-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('density'),
      width: 1200,
      height: 630,
      alt: 'Density Calculator - Calculate Density, Volume & Mass',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Density Calculator - Calculate Density, Volume & Mass',
    description: 'Free density calculator for accurate calculations with multiple unit conversions.',
    images: [getOgImage('density')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/density-calculator'),
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

export default function DensityCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/density-calculator'),
        name: 'Density Calculator',
        description: 'Calculate density, volume, or mass using the density formula. Supports multiple units including kg/m³, g/cm³, and lb/ft³.',
        url: getUrl('/density-calculator'),
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate density from mass and volume',
          'Calculate volume from mass and density',
          'Calculate mass from density and volume',
          'Multiple unit conversions (kg/m³, g/cm³, lb/ft³)',
          'Instant calculation results',
          'Share and export results',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/density-calculator'),
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
            name: 'Density Calculator',
            item: getUrl('/density-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/density-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is density and how do you calculate it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Density is the mass per unit volume of a substance. The formula is: Density (ρ) = Mass (m) / Volume (V). For example, if an object has a mass of 100 kg and a volume of 0.5 m³, its density is 200 kg/m³.',
            },
          },
          {
            '@type': 'Question',
            name: 'What units are commonly used for density?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Common density units include kg/m³ (kilograms per cubic meter), g/cm³ (grams per cubic centimeter), g/mL (grams per milliliter), and lb/ft³ (pounds per cubic foot). Our calculator supports all these units and more.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you convert between different density units?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To convert between density units, use conversion factors: 1 g/cm³ = 1000 kg/m³, 1 lb/ft³ = 16.0185 kg/m³, 1 kg/L = 1000 kg/m³. Our calculator automatically converts between all supported units.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the density of water?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The density of water at room temperature (20°C/68°F) is approximately 1000 kg/m³ or 1 g/cm³ or 1 g/mL. This makes water a useful reference point for comparing densities of other materials.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does temperature affect density?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Temperature affects density because most substances expand when heated (increasing volume) and contract when cooled. As volume changes while mass remains constant, density decreases with heating and increases with cooling. This effect is most pronounced in gases.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between density and specific gravity?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Density is the mass per unit volume with specific units (like kg/m³), while specific gravity is the ratio of a substance\'s density to the density of water, making it dimensionless. Specific gravity = Density of substance / Density of water.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/density-calculator'),
        name: 'How to Calculate Density',
        description: 'Learn how to calculate density, volume, or mass using the density formula.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Calculation Mode',
            text: 'Choose whether you want to calculate density, volume, or mass.',
            url: getStepUrl('/density-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Known Values',
            text: 'Input the known values (mass, volume, or density) with appropriate units.',
            url: getStepUrl('/density-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Click Calculate',
            text: 'Press the Calculate button to get your result.',
            url: getStepUrl('/density-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'View Results',
            text: 'Review the calculated result and automatic unit conversions.',
            url: getStepUrl('/density-calculator', 4),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/density-calculator'),
        headline: 'Complete Guide to Density Calculations',
        description: 'Comprehensive guide to calculating density, volume, and mass with practical examples.',
        url: getUrl('/density-calculator'),
        datePublished: '2024-01-01T00:00:00Z',
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-gray-600">
              <li><a href="/" className="hover:text-blue-600 transition-colors">Home</a></li>
              <li><span className="mx-2">/</span></li>
              <li><a href="/other" className="hover:text-blue-600 transition-colors">Other</a></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-gray-900 font-medium">Density Calculator</li>
            </ol>
          </nav>

          {/* SEO H1 (visually hidden but important for SEO) */}
          <h1 className="sr-only">Density Calculator - Calculate Density, Volume & Mass with Unit Conversions</h1>

          {/* Calculator Component */}
          <DensityCalculator />

          {/* Educational Content */}
          <div className="mt-12 max-w-4xl mx-auto">
            <article className="prose prose-blue max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Density</h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">What is Density?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Density is a fundamental physical property that describes how much mass is contained in a given volume. 
                  It's expressed by the formula: <strong>ρ = m / V</strong>, where ρ (rho) is density, m is mass, and V is volume. 
                  Objects with higher density have more mass packed into the same volume.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">How to Use This Calculator</h3>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Three Calculation Modes:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="font-semibold text-blue-600 mr-2">1.</span>
                    <div>
                      <strong>Find Density:</strong> Enter mass and volume to calculate density. 
                      Example: A 100g object with 50cm³ volume has density of 2 g/cm³.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-blue-600 mr-2">2.</span>
                    <div>
                      <strong>Find Volume:</strong> Enter mass and density to calculate volume. 
                      Example: A 500g object with density 2.5 g/cm³ has volume of 200 cm³.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-blue-600 mr-2">3.</span>
                    <div>
                      <strong>Find Mass:</strong> Enter density and volume to calculate mass. 
                      Example: An object with density 7.8 g/cm³ and volume 10 cm³ has mass of 78g.
                    </div>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Common Material Densities</h3>
              
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Material</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Density (g/cm³)</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Density (kg/m³)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Water (20°C)</td>
                      <td className="px-6 py-4 text-sm text-gray-700">1.00</td>
                      <td className="px-6 py-4 text-sm text-gray-700">1000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Aluminum</td>
                      <td className="px-6 py-4 text-sm text-gray-700">2.70</td>
                      <td className="px-6 py-4 text-sm text-gray-700">2700</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Iron</td>
                      <td className="px-6 py-4 text-sm text-gray-700">7.87</td>
                      <td className="px-6 py-4 text-sm text-gray-700">7870</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Copper</td>
                      <td className="px-6 py-4 text-sm text-gray-700">8.96</td>
                      <td className="px-6 py-4 text-sm text-gray-700">8960</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Lead</td>
                      <td className="px-6 py-4 text-sm text-gray-700">11.34</td>
                      <td className="px-6 py-4 text-sm text-gray-700">11340</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Gold</td>
                      <td className="px-6 py-4 text-sm text-gray-700">19.32</td>
                      <td className="px-6 py-4 text-sm text-gray-700">19320</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Air (20°C, 1 atm)</td>
                      <td className="px-6 py-4 text-sm text-gray-700">0.0012</td>
                      <td className="px-6 py-4 text-sm text-gray-700">1.2</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Practical Applications</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">🔬 Science & Engineering</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Material identification and quality control</li>
                    <li>• Chemical composition analysis</li>
                    <li>• Structural engineering calculations</li>
                    <li>• Fluid dynamics and hydraulics</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">🏭 Industry & Manufacturing</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Quality control in production</li>
                    <li>• Packaging and shipping calculations</li>
                    <li>• Material selection for products</li>
                    <li>• Cost estimation based on weight</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">🧪 Chemistry & Physics</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Concentration calculations</li>
                    <li>• Buoyancy and flotation studies</li>
                    <li>• Phase transition analysis</li>
                    <li>• Mixture composition determination</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">🌍 Environmental Science</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Soil and water quality testing</li>
                    <li>• Pollution concentration monitoring</li>
                    <li>• Oceanography and marine studies</li>
                    <li>• Atmospheric research</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
              
              <div className="space-y-4 mb-8">
                <details className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
                  <summary className="font-semibold text-gray-900 text-lg">
                    Why do objects float or sink?
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">
                    An object will float in a fluid if its density is less than the fluid's density, and sink if it's denser. 
                    This is why wood (density ~0.6 g/cm³) floats in water (1 g/cm³), while metal (density 2-20 g/cm³) sinks.
                  </p>
                </details>
                
                <details className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
                  <summary className="font-semibold text-gray-900 text-lg">
                    How accurate should my measurements be?
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">
                    For scientific purposes, use precise measurements with appropriate significant figures. For everyday calculations, 
                    2-3 decimal places are usually sufficient. Remember that measurement accuracy affects calculation accuracy.
                  </p>
                </details>
                
                <details className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
                  <summary className="font-semibold text-gray-900 text-lg">
                    Can I use this calculator for gases?
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">
                    Yes, but note that gas density varies significantly with temperature and pressure. Standard conditions 
                    (0°C, 1 atm) are typically used for reference. For precise gas calculations, consider using the ideal gas law.
                  </p>
                </details>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Related Calculators</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="/volume-calculator" className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow border border-gray-200">
                  <span className="text-2xl mb-2 block">📦</span>
                  <span className="text-sm font-medium text-gray-900">Volume Calculator</span>
                </a>
                <a href="/mass-calculator" className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow border border-gray-200">
                  <span className="text-2xl mb-2 block">⚖️</span>
                  <span className="text-sm font-medium text-gray-900">Mass Calculator</span>
                </a>
                <a href="/weight-calculator" className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow border border-gray-200">
                  <span className="text-2xl mb-2 block">🏋️</span>
                  <span className="text-sm font-medium text-gray-900">Weight Calculator</span>
                </a>
                <a href="/conversion-calculator" className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow border border-gray-200">
                  <span className="text-2xl mb-2 block">🔄</span>
                  <span className="text-sm font-medium text-gray-900">Unit Converter</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

