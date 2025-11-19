import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import ResistorCalculator from '@/components/Calculator/ResistorCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Resistor Color Code Calculator - 4, 5 & 6 Band Decoder | AICalculator',
  description: 'Free resistor calculator with color code decoder for 4, 5, and 6 band resistors. Calculate resistance values, tolerance, power ratings, and series/parallel combinations instantly.',
  keywords: [
    'resistor calculator',
    'resistor color code',
    'color code calculator',
    '4 band resistor',
    '5 band resistor',
    '6 band resistor',
    'resistor decoder',
    'resistance calculator',
    'ohm calculator',
    'resistor value calculator',
    'color band decoder',
    'resistor tolerance',
    'power rating calculator',
    'series resistor calculator',
    'parallel resistor calculator',
    'E12 series',
    'E24 series',
    'E96 series',
    'resistor power',
    'electronics calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Resistor Color Code Calculator - Decode 4, 5 & 6 Band Resistors',
    description: 'Calculate resistor values from color codes instantly. Supports 4, 5, and 6 band resistors with tolerance, power ratings, and series/parallel calculations.',
    type: 'website',
    url: getUrl('/resistor-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('resistor'),
      width: 1200,
      height: 630,
      alt: 'Resistor Color Code Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resistor Color Code Calculator - Decode 4, 5 & 6 Band Resistors',
    description: 'Calculate resistor values from color codes instantly. Supports 4, 5, and 6 band resistors with tolerance, power ratings, and series/parallel calculations.',
    images: [getOgImage('resistor')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/resistor-calculator'),
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

export default function ResistorCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/resistor-calculator'),
        name: 'Resistor Color Code Calculator',
        url: getUrl('/resistor-calculator'),
        description: 'Free online resistor calculator that decodes 4, 5, and 6 band color codes to calculate resistance values, tolerance, temperature coefficient, and power ratings.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          '4, 5, and 6 band resistor color code decoder',
          'Visual resistor representation',
          'Tolerance and temperature coefficient calculation',
          'Power dissipation calculator',
          'Series and parallel resistance calculator',
          'Standard E12, E24, and E96 series values',
          'Real-time resistance value updates',
          'Min/max resistance range calculator',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/resistor-calculator'),
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
            name: 'Resistor Calculator',
            item: getUrl('/resistor-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/resistor-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I read resistor color codes?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Resistor color codes use colored bands to indicate resistance values. For 4-band resistors: the first two bands are digits (0-9), the third is the multiplier (10^n), and the fourth is tolerance. For 5-band resistors: three digit bands, one multiplier, and tolerance. For 6-band resistors: add a temperature coefficient band. Each color represents a number: Black=0, Brown=1, Red=2, Orange=3, Yellow=4, Green=5, Blue=6, Violet=7, Gray=8, White=9. Gold multiplier=0.1, Silver=0.01. For tolerance: Gold=±5%, Silver=±10%, Brown=±1%, Red=±2%.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between 4, 5, and 6 band resistors?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '4-band resistors provide basic resistance values with ±5% or ±10% tolerance, suitable for general circuits. 5-band resistors offer more precision with three significant digits and tighter tolerances (±1%, ±2%), ideal for precision applications. 6-band resistors add a temperature coefficient band (ppm/°C), indicating how resistance changes with temperature, crucial for high-stability circuits. Use 4-band for general purposes, 5-band for precision work, and 6-band for temperature-sensitive applications like instrumentation and measurement circuits.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are E12, E24, and E96 resistor series?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'E-series are international standards defining resistor values. E12 series has 12 values per decade (10Ω to 82Ω, then 100Ω to 820Ω, etc.) with ±10% tolerance, covering most general needs. E24 series doubles the selection with 24 values per decade and ±5% tolerance for better precision. E96 series offers 96 values per decade with ±1% tolerance for high-precision applications. The series number indicates how many standard values exist within each decade (factor of 10). Choose E12 for cost-effective general circuits, E24 for better accuracy, and E96 for precision electronics.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate resistor power rating?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Power rating determines how much heat a resistor can safely dissipate. Calculate using P = V²/R (if you know voltage) or P = I²×R (if you know current). For safety, use a resistor rated at least 2x the calculated power. Common ratings: 1/8W (0.125W) for small signal circuits, 1/4W (0.25W) for general use, 1/2W (0.5W) for moderate power, and 1W+ for high-power applications. Exceeding the power rating causes overheating and failure. Consider ambient temperature and heat dissipation; in confined spaces or high temperatures, derate the power rating by 50% or more.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do series and parallel resistor connections work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Series resistors add directly: R_total = R1 + R2 + R3... The same current flows through all resistors, and total resistance increases. Use series connections to increase resistance or create voltage dividers. Parallel resistors use the reciprocal formula: 1/R_total = 1/R1 + 1/R2 + 1/R3... For two resistors: R_total = (R1×R2)/(R1+R2). Total resistance is always less than the smallest resistor. Current divides among paths, and voltage is the same across all resistors. Use parallel connections to decrease resistance or split current. Combining series and parallel allows creating any desired resistance value.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is resistor tolerance and why does it matter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tolerance indicates the maximum deviation from the nominal resistance value. A 100Ω resistor with ±5% tolerance can be anywhere from 95Ω to 105Ω. Common tolerances: ±20% (no band, very loose), ±10% (silver band), ±5% (gold band), ±2% (red band), ±1% (brown band), ±0.5% and tighter for precision resistors. In general circuits, ±5% or ±10% is acceptable. For precision applications like filters, amplifiers, or measurement circuits, use ±1% or tighter. Tolerance affects circuit performance—use tighter tolerances when exact resistance matters, but they cost more.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/resistor-calculator'),
        name: 'How to Use the Resistor Calculator',
        description: 'Learn how to decode resistor color codes and calculate resistance values using our free online calculator.',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Resistor Color Code Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Resistor Type',
            text: 'Choose the number of color bands on your resistor: 4 bands (standard), 5 bands (precision), or 6 bands (high-precision with temperature coefficient). Most common resistors have 4 bands.',
            url: getStepUrl('/resistor-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Identify First Color Band',
            text: 'Starting from the end closest to a band (not the middle), identify the first color band. Select this color from the dropdown. This represents the first significant digit of the resistance value.',
            url: getStepUrl('/resistor-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Select Remaining Color Bands',
            text: 'Continue selecting colors for the remaining bands in order. For 4-band: 2nd digit, multiplier, tolerance. For 5-band: 2nd digit, 3rd digit, multiplier, tolerance. For 6-band: add temperature coefficient as the last band.',
            url: getStepUrl('/resistor-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'View Calculated Resistance',
            text: 'The calculator instantly displays the resistance value in Ω, kΩ, or MΩ with the appropriate tolerance percentage. See the min/max resistance range and nearest standard E-series values.',
            url: getStepUrl('/resistor-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Calculate Power Rating (Optional)',
            text: 'Enter voltage or current to calculate power dissipation. This helps you select a resistor with adequate power rating (1/8W, 1/4W, 1/2W, 1W, etc.) to prevent overheating.',
            url: getStepUrl('/resistor-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Use Series/Parallel Calculator (Optional)',
            text: 'Add multiple resistor values to calculate total series resistance (sum) or parallel resistance (reciprocal sum). Useful for creating custom resistance values or analyzing circuits.',
            url: getStepUrl('/resistor-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/resistor-calculator'),
        headline: 'Complete Guide to Resistor Color Codes and Calculations',
        description: 'Comprehensive guide to reading resistor color codes, understanding tolerance, calculating power ratings, and working with series and parallel resistor combinations.',
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
        image: getOgImage('resistor'),
        articleBody: 'Learn how to read resistor color codes, calculate resistance values, understand tolerance and power ratings, and work with series and parallel resistor combinations.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Resistor Color Code Calculator - 4, 5 & 6 Band Decoder</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Resistor Color Code Calculator"
        calculatorUrl="/resistor-calculator"
      />

      {/* Calculator Component */}
      <ResistorCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Resistor Color Codes</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700">
              <strong>Quick Summary:</strong> Resistor color codes use colored bands to indicate resistance values, tolerance, and temperature coefficients. This calculator helps you decode 4, 5, and 6 band resistors instantly, calculate power ratings, and work with series/parallel combinations.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Are Resistor Color Codes?</h3>
          <p className="text-gray-700 mb-4">
            Resistor color codes are an international standard (IEC 60062) for marking the resistance values of fixed resistors. Instead of printing numbers on small components, manufacturers use colored bands that represent digits, multipliers, and tolerance levels. This system dates back to the 1920s when resistors were too small for numeric printing.
          </p>
          <p className="text-gray-700 mb-4">
            The color code system uses 10 colors (black through white) to represent digits 0-9, plus gold and silver for special multipliers and tolerances. Reading from left to right, the first bands indicate significant digits, followed by a multiplier band, a tolerance band, and optionally a temperature coefficient band.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Color Code Chart</h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Color</th>
                  <th className="px-4 py-3 text-left font-semibold">Digit</th>
                  <th className="px-4 py-3 text-left font-semibold">Multiplier</th>
                  <th className="px-4 py-3 text-left font-semibold">Tolerance</th>
                  <th className="px-4 py-3 text-left font-semibold">Temp Coeff (ppm/°C)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3"><span className="inline-block w-16 h-4 bg-black border"></span> Black</td>
                  <td className="px-4 py-3">0</td>
                  <td className="px-4 py-3">×1</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="inline-block w-16 h-4 border" style={{backgroundColor: '#8B4513'}}></span> Brown</td>
                  <td className="px-4 py-3">1</td>
                  <td className="px-4 py-3">×10</td>
                  <td className="px-4 py-3">±1%</td>
                  <td className="px-4 py-3">100</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="inline-block w-16 h-4 bg-red-600 border"></span> Red</td>
                  <td className="px-4 py-3">2</td>
                  <td className="px-4 py-3">×100</td>
                  <td className="px-4 py-3">±2%</td>
                  <td className="px-4 py-3">50</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="inline-block w-16 h-4 bg-orange-500 border"></span> Orange</td>
                  <td className="px-4 py-3">3</td>
                  <td className="px-4 py-3">×1k</td>
                  <td className="px-4 py-3">±0.05%</td>
                  <td className="px-4 py-3">15</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="inline-block w-16 h-4 bg-yellow-400 border"></span> Yellow</td>
                  <td className="px-4 py-3">4</td>
                  <td className="px-4 py-3">×10k</td>
                  <td className="px-4 py-3">±0.02%</td>
                  <td className="px-4 py-3">25</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="inline-block w-16 h-4 bg-green-600 border"></span> Green</td>
                  <td className="px-4 py-3">5</td>
                  <td className="px-4 py-3">×100k</td>
                  <td className="px-4 py-3">±0.5%</td>
                  <td className="px-4 py-3">-</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="inline-block w-16 h-4 bg-blue-600 border"></span> Blue</td>
                  <td className="px-4 py-3">6</td>
                  <td className="px-4 py-3">×1M</td>
                  <td className="px-4 py-3">±0.25%</td>
                  <td className="px-4 py-3">10</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="inline-block w-16 h-4 bg-purple-600 border"></span> Violet</td>
                  <td className="px-4 py-3">7</td>
                  <td className="px-4 py-3">×10M</td>
                  <td className="px-4 py-3">±0.1%</td>
                  <td className="px-4 py-3">5</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="inline-block w-16 h-4 bg-gray-500 border"></span> Gray</td>
                  <td className="px-4 py-3">8</td>
                  <td className="px-4 py-3">×100M</td>
                  <td className="px-4 py-3">±0.01%</td>
                  <td className="px-4 py-3">-</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="inline-block w-16 h-4 bg-white border border-gray-400"></span> White</td>
                  <td className="px-4 py-3">9</td>
                  <td className="px-4 py-3">×1G</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="inline-block w-16 h-4 border" style={{backgroundColor: '#FFD700'}}></span> Gold</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">×0.1</td>
                  <td className="px-4 py-3">±5%</td>
                  <td className="px-4 py-3">-</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="inline-block w-16 h-4 border" style={{backgroundColor: '#C0C0C0'}}></span> Silver</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">×0.01</td>
                  <td className="px-4 py-3">±10%</td>
                  <td className="px-4 py-3">-</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">None</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">±20%</td>
                  <td className="px-4 py-3">-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4-Band vs 5-Band vs 6-Band Resistors</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4-Band Resistors (Standard)</h4>
          <p className="text-gray-700 mb-4">
            <strong>Band 1 & 2:</strong> First and second significant digits<br />
            <strong>Band 3:</strong> Multiplier (power of 10)<br />
            <strong>Band 4:</strong> Tolerance (typically gold ±5% or silver ±10%)
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> Brown-Black-Red-Gold = 10 × 100Ω = 1,000Ω (1kΩ) ±5%
          </p>
          <p className="text-gray-700 mb-4">
            4-band resistors are the most common type, suitable for general-purpose electronics where high precision isn't critical. They're cost-effective and adequate for hobbyist projects, basic circuits, and consumer electronics. The ±5% or ±10% tolerance is acceptable for most applications.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5-Band Resistors (Precision)</h4>
          <p className="text-gray-700 mb-4">
            <strong>Band 1, 2 & 3:</strong> Three significant digits<br />
            <strong>Band 4:</strong> Multiplier<br />
            <strong>Band 5:</strong> Tolerance (typically brown ±1% or red ±2%)
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> Brown-Black-Black-Brown-Brown = 100 × 10Ω = 1,000Ω (1kΩ) ±1%
          </p>
          <p className="text-gray-700 mb-4">
            5-band resistors offer three significant figures, providing more precise values. They're essential for precision circuits like audio amplifiers, filters, measurement equipment, and analog signal processing. The tighter tolerance (±1% or ±2%) ensures consistent performance in critical applications where exact resistance values matter.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6-Band Resistors (High Precision)</h4>
          <p className="text-gray-700 mb-4">
            <strong>Band 1, 2 & 3:</strong> Three significant digits<br />
            <strong>Band 4:</strong> Multiplier<br />
            <strong>Band 5:</strong> Tolerance<br />
            <strong>Band 6:</strong> Temperature coefficient (ppm/°C)
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> Brown-Black-Black-Brown-Brown-Brown = 100 × 10Ω = 1,000Ω ±1%, 100ppm/°C
          </p>
          <p className="text-gray-700 mb-4">
            6-band resistors add temperature coefficient information, indicating how much resistance changes with temperature (in parts per million per degree Celsius). They're crucial for temperature-sensitive applications like precision instrumentation, medical devices, aerospace electronics, and scientific equipment where environmental changes must be accounted for. Lower ppm/°C values indicate better stability.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding Tolerance</h3>
          <p className="text-gray-700 mb-4">
            Tolerance indicates the maximum deviation from the nominal resistance value. It's a critical specification that affects circuit performance and cost:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>±20% (No band):</strong> Very loose tolerance, rare in modern electronics. A 100Ω resistor could be anywhere from 80Ω to 120Ω.</li>
            <li><strong>±10% (Silver):</strong> Standard tolerance for non-critical applications. Acceptable for power supplies, LED current limiting, and pullup/pulldown resistors.</li>
            <li><strong>±5% (Gold):</strong> Most common tolerance for general-purpose circuits. Good balance between cost and accuracy for typical hobby and consumer electronics.</li>
            <li><strong>±2% (Red):</strong> Precision grade for better accuracy in audio circuits, voltage dividers, and analog circuits.</li>
            <li><strong>±1% (Brown):</strong> High precision for filters, amplifiers, measurement circuits, and professional audio equipment.</li>
            <li><strong>±0.5%, ±0.25%, ±0.1%:</strong> Ultra-precision for critical applications like instrumentation amplifiers, reference circuits, and scientific equipment.</li>
          </ul>
          <p className="text-gray-700 mb-4">
            <strong>When to use each:</strong> For general circuits (power supplies, digital logic pullups, LED resistors), ±5% or ±10% is fine and cost-effective. For analog circuits (audio, filters, precision voltage dividers), use ±1% or ±2%. For measurement and instrumentation, consider ±0.5% or tighter. Remember: tighter tolerance costs more, so only specify what's actually needed.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">E-Series Standard Values</h3>
          <p className="text-gray-700 mb-4">
            To limit manufacturing costs and inventory, resistors are produced in standardized values called E-series (IEC 60063). These series ensure that the entire resistance range can be covered with a manageable number of values, while accounting for tolerance overlap.
          </p>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">E12 Series (±10% tolerance)</h4>
          <p className="text-gray-700 mb-4">
            12 values per decade: <strong>10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82</strong>
          </p>
          <p className="text-gray-700 mb-4">
            The E12 series provides adequate coverage for general-purpose circuits where ±10% tolerance is acceptable. Each decade (1-10, 10-100, 100-1k, etc.) repeats these values. For example: 10Ω, 12Ω, 15Ω... then 100Ω, 120Ω, 150Ω... then 1kΩ, 1.2kΩ, 1.5kΩ, and so on. This series covers most hobbyist and basic electronics needs.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">E24 Series (±5% tolerance)</h4>
          <p className="text-gray-700 mb-4">
            24 values per decade: <strong>10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, 43, 47, 51, 56, 62, 68, 75, 82, 91</strong>
          </p>
          <p className="text-gray-700 mb-4">
            E24 doubles the E12 selection, providing finer granularity for circuits requiring better precision. The ±5% tolerance ensures that adjacent values don't overlap excessively. This series is widely used in consumer electronics, audio equipment, and professional circuits where accuracy matters but ultra-precision isn't required.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">E96 Series (±1% tolerance)</h4>
          <p className="text-gray-700 mb-4">
            96 values per decade (too many to list, but includes values like 100, 102, 105, 107, 110, 113, 115, 118, 121...)
          </p>
          <p className="text-gray-700 mb-4">
            E96 provides very fine resolution with 96 distinct values per decade. Each value is approximately 2% apart, perfect for ±1% tolerance resistors. This series is essential for precision analog circuits, measurement equipment, professional audio, and applications where exact resistance values directly affect performance. While more expensive, E96 resistors eliminate the need for parallel/series combinations to achieve specific values.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Power Rating and Dissipation</h3>
          <p className="text-gray-700 mb-4">
            Power rating indicates how much electrical power a resistor can safely dissipate as heat without damage. Exceeding this rating causes overheating, which can lead to resistance drift, component failure, or even fire. Calculate power using these formulas:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>P = V² / R</strong> - When you know voltage across the resistor</li>
            <li><strong>P = I² × R</strong> - When you know current through the resistor</li>
            <li><strong>P = V × I</strong> - When you know both voltage and current</li>
          </ul>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Power Ratings</h4>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>1/8 Watt (0.125W):</strong> Small surface-mount and through-hole resistors for signal processing, low-current circuits, and sensor applications. Physical size: very small (1-3mm).</li>
            <li><strong>1/4 Watt (0.25W):</strong> Most common size for hobbyist and general electronics. Suitable for LED current limiting (up to ~20mA), digital logic, and low-power analog circuits. Physical size: 6mm length.</li>
            <li><strong>1/2 Watt (0.5W):</strong> Medium power applications like voltage dividers in power supplies, base resistors for transistors, and moderate current circuits. Physical size: 9mm length.</li>
            <li><strong>1 Watt:</strong> Higher power circuits, LED drivers, motor controls, and power supplies. Noticeably warmer during operation. Physical size: 12mm length.</li>
            <li><strong>2 Watt and above:</strong> Specialized power resistors with ceramic or wirewound construction. Used in power electronics, heaters, braking resistors, and high-current applications. May require heatsinking.</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Power Derating</h4>
          <p className="text-gray-700 mb-4">
            <strong>Safety Rule:</strong> Never operate a resistor at its maximum power rating continuously. Use at least 50% derating (if rated for 1W, use it at ≤0.5W) for reliability and longevity. Additional derating is needed for:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>High ambient temperature:</strong> Above 25°C, derate by 1-2% per degree Celsius increase</li>
            <li><strong>Poor ventilation:</strong> Enclosed spaces trap heat; derate by 30-50%</li>
            <li><strong>High altitude:</strong> Thinner air reduces cooling; derate accordingly</li>
            <li><strong>Continuous operation:</strong> 24/7 operation requires more derating than intermittent use</li>
          </ul>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> If your calculation shows 0.3W dissipation, use a 1W resistor (not 0.5W) for safe continuous operation with margin for temperature variations.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Series and Parallel Resistor Calculations</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Series Resistors</h4>
          <p className="text-gray-700 mb-4">
            When resistors are connected end-to-end (series), they add directly:<br />
            <strong>R_total = R1 + R2 + R3 + ...</strong>
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Key characteristics:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>Same current flows through all resistors</li>
            <li>Total resistance is the sum (always larger than any individual resistor)</li>
            <li>Voltage divides proportionally across resistors</li>
            <li>Power dissipation in each resistor depends on its individual resistance</li>
          </ul>
          <p className="text-gray-700 mb-4">
            <strong>Common applications:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Voltage dividers:</strong> Create reference voltages or scale down sensor outputs</li>
            <li><strong>Increasing resistance:</strong> Achieve higher values not available as single resistors</li>
            <li><strong>Power distribution:</strong> Split high power across multiple lower-wattage resistors</li>
            <li><strong>Current limiting:</strong> Control current in LED strings or charging circuits</li>
          </ul>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> To get 3.3kΩ, you can series-connect 2.2kΩ + 1.1kΩ = 3.3kΩ. For a voltage divider giving 2.5V from 5V, use two equal resistors (5V × R2/(R1+R2) = 5V × 0.5 = 2.5V).
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Parallel Resistors</h4>
          <p className="text-gray-700 mb-4">
            When resistors are connected side-by-side (parallel), use the reciprocal formula:<br />
            <strong>1/R_total = 1/R1 + 1/R2 + 1/R3 + ...</strong><br />
            For two resistors: <strong>R_total = (R1 × R2) / (R1 + R2)</strong> (product over sum)
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Key characteristics:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>Same voltage across all resistors</li>
            <li>Total resistance is always less than the smallest resistor</li>
            <li>Current divides inversely proportional to resistance (more current through lower resistance)</li>
            <li>Total current is the sum of individual branch currents</li>
          </ul>
          <p className="text-gray-700 mb-4">
            <strong>Common applications:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Decreasing resistance:</strong> Achieve lower values not available as single resistors</li>
            <li><strong>Fine-tuning values:</strong> Adjust resistance by adding parallel resistors</li>
            <li><strong>Current sharing:</strong> Distribute high current across multiple resistors for higher power handling</li>
            <li><strong>Impedance matching:</strong> Create specific impedances for RF or audio circuits</li>
          </ul>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> Two 1kΩ resistors in parallel give 500Ω (1000×1000)/(1000+1000) = 500Ω. To get ~330Ω, parallel 470Ω and 1kΩ: (470×1000)/(470+1000) ≈ 320Ω. For high power, parallel four 1W 100Ω resistors to get 25Ω at 4W capacity.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Series-Parallel Combinations</h4>
          <p className="text-gray-700 mb-4">
            Complex circuits often use both series and parallel connections. Solve these step by step:
          </p>
          <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">
            <li>Identify parallel groups and calculate their equivalent resistance</li>
            <li>Identify series groups and add them</li>
            <li>Repeat until you have a single equivalent resistance</li>
          </ol>
          <p className="text-gray-700 mb-4">
            This technique allows creating virtually any resistance value from standard E-series values. For example, you might need 750Ω but only have 1kΩ and 2.2kΩ resistors. Three 2.2kΩ in parallel gives 733Ω (close to 750Ω).
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Practical Applications</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">LED Current Limiting</h4>
          <p className="text-gray-700 mb-4">
            LEDs require current-limiting resistors to prevent burnout. Calculate using:<br />
            <strong>R = (V_supply - V_led) / I_led</strong>
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> Red LED (V_led = 2V, I_led = 20mA) from 5V supply:<br />
            R = (5V - 2V) / 0.02A = 150Ω → Use 150Ω or 180Ω (next E24 value)<br />
            Power: P = I² × R = (0.02)² × 150 = 0.06W → Use 1/4W resistor
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Voltage Dividers</h4>
          <p className="text-gray-700 mb-4">
            Create reference voltages or scale sensor outputs:<br />
            <strong>V_out = V_in × (R2 / (R1 + R2))</strong>
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> Get 3.3V from 5V for a microcontroller:<br />
            Use R1 = 1kΩ, R2 = 2kΩ: V_out = 5V × (2k/(1k+2k)) = 3.33V<br />
            Note: Voltage dividers draw continuous current; use high values to minimize power waste.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Pull-up and Pull-down Resistors</h4>
          <p className="text-gray-700 mb-4">
            Digital inputs need defined states when switches or sensors are disconnected. Pull-up resistors (to V+) default inputs to HIGH; pull-down resistors (to GND) default to LOW. Typical values: 1kΩ to 10kΩ. Lower values (1-4.7kΩ) provide faster switching and better noise immunity but waste more power. Higher values (10kΩ+) save power but may be affected by noise or input capacitance. For I2C buses, use 2.2kΩ to 4.7kΩ depending on bus capacitance and speed.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Resistors in Filters</h4>
          <p className="text-gray-700 mb-4">
            RC filters (resistor-capacitor) create frequency-dependent circuits. The cutoff frequency is f_c = 1/(2πRC). For audio applications, use ±1% or ±2% tolerance resistors to maintain precise filter characteristics. For a 1kHz low-pass filter with C = 100nF: R = 1/(2π × 1000 × 100×10⁻⁹) ≈ 1.6kΩ (use 1.5kΩ or 1.8kΩ from E24 series).
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Sensing and Measurement</h4>
          <p className="text-gray-700 mb-4">
            <strong>Current sensing:</strong> Low-value, high-precision resistors (0.01Ω to 1Ω) in series with the load create a measurable voltage drop (V = I × R). Use resistors with ±1% tolerance and low temperature coefficient. Power rating must handle I²R losses.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Thermistors and RTDs:</strong> Temperature-sensing resistors that change value with temperature. RTDs (Resistance Temperature Detectors) use precision resistors (typically 100Ω, 1000Ω) as references. Bridge circuits require matched resistors with ±0.1% tolerance.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Choosing the Right Resistor</h3>
          <p className="text-gray-700 mb-4">
            Consider these factors when selecting resistors:
          </p>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Resistance Value</h4>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>Calculate exact value needed using Ohm's Law</li>
            <li>Choose nearest standard E-series value (E12, E24, or E96)</li>
            <li>Consider using series/parallel combinations for non-standard values</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Tolerance</h4>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>±10% (silver) or ±5% (gold) for general circuits</li>
            <li>±1% or ±2% for analog circuits, filters, precision voltage dividers</li>
            <li>±0.1% to ±0.5% for instrumentation and measurement</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Power Rating</h4>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>Calculate maximum power: P = V²/R or P = I²R</li>
            <li>Choose resistor rated at least 2× calculated power</li>
            <li>Consider ambient temperature and ventilation</li>
            <li>Use multiple resistors in parallel for high power</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Temperature Coefficient</h4>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>Not critical for most general circuits</li>
            <li>Important for precision applications: use ≤100 ppm/°C</li>
            <li>Critical for instrumentation: use ≤25 ppm/°C or metal film resistors</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Resistor Type</h4>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Carbon film:</strong> General purpose, inexpensive, ±5% typical</li>
            <li><strong>Metal film:</strong> Better stability, low noise, ±1% typical, lower temp coefficient</li>
            <li><strong>Wirewound:</strong> High power (≥2W), excellent for current sensing, inductive at high frequencies</li>
            <li><strong>SMD (Surface mount):</strong> Compact, automated assembly, 0402 to 2512 sizes</li>
            <li><strong>Thick/Thin film:</strong> Precision applications, tight tolerance, stable</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common Mistakes to Avoid</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Reading bands from wrong end:</strong> Start from the end with bands closer together, or with the tolerance band (usually gold/silver) on the right</li>
            <li><strong>Confusing orange and red:</strong> Orange is brighter/lighter; red is darker. Use good lighting.</li>
            <li><strong>Ignoring power rating:</strong> A burning smell means your resistor is overheating—recalculate and use higher wattage</li>
            <li><strong>Using wrong tolerance:</strong> Don't use ±10% resistors in precision circuits like filters or voltage references</li>
            <li><strong>Forgetting derating:</strong> Don't run resistors at maximum power continuously</li>
            <li><strong>Ignoring series vs parallel:</strong> Series increases resistance, parallel decreases it—mixing them up changes your circuit drastically</li>
            <li><strong>Not checking actual resistance:</strong> Always measure with a multimeter when precision matters; manufacturing tolerances mean actual values vary</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Resources</h3>
          <p className="text-gray-700 mb-4">
            For more information on resistors and electronics fundamentals, visit these authoritative resources:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <a href="https://www.electronics-tutorials.ws/resistor/resistor.html" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Electronics Tutorials - Resistor Theory
              </a>
            </li>
            <li>
              <a href="https://www.allaboutcircuits.com/textbook/direct-current/chpt-2/voltage-current-resistance-relate/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                All About Circuits - Ohm's Law and Resistors
              </a>
            </li>
            <li>
              <a href="https://www.eia.org/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Electronic Components Industry Association (ECIA)
              </a> - Industry standards and specifications
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/ohms-law-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900">Ohm's Law Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate voltage, current, resistance, and power</p>
          </a>
          
          <a 
            href="/voltage-drop-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📉</div>
            <h3 className="font-semibold text-gray-900">Voltage Drop Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate voltage drop in wire and cable</p>
          </a>
          
          <a 
            href="/electricity-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💡</div>
            <h3 className="font-semibold text-gray-900">Electricity Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate electricity costs and power usage</p>
          </a>
          
          <a 
            href="/led-resistor-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💡</div>
            <h3 className="font-semibold text-gray-900">LED Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate LED current limiting resistors</p>
          </a>
        </div>
      </section>
    </div>
  );
}

