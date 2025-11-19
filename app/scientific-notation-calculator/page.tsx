import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import ScientificNotationCalculator from '@/components/Calculator/ScientificNotationCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Scientific Notation Calculator - Convert & Calculate E Notation | Free Tool',
  description: 'Free scientific notation calculator for conversion and arithmetic. Convert between standard and scientific notation, perform calculations with E notation, and learn about engineering notation.',
  keywords: [
    'scientific notation calculator',
    'E notation calculator',
    'scientific calculator',
    'convert to scientific notation',
    'scientific notation converter',
    'engineering notation',
    'standard form calculator',
    'exponential notation',
    'scientific notation arithmetic',
    'scientific notation multiplication',
    'scientific notation division',
    'significant figures calculator',
    'E notation converter',
    'power of 10 calculator',
    'scientific notation addition',
    'scientific notation subtraction',
    'large numbers calculator',
    'small numbers calculator',
    'mantissa exponent calculator',
    'scientific notation operations',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Scientific Notation Calculator - E Notation Converter',
    description: 'Free scientific notation calculator with conversion and arithmetic operations. Supports E notation and engineering notation.',
    type: 'website',
    url: getUrl('/scientific-notation-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('scientific-notation'),
      width: 1200,
      height: 630,
      alt: 'Scientific Notation Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scientific Notation Calculator - E Notation Converter',
    description: 'Convert and calculate with scientific notation. Free tool with E notation support.',
    images: [getOgImage('scientific-notation')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/scientific-notation-calculator'),
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

export default function ScientificNotationCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/scientific-notation-calculator'),
        name: 'Scientific Notation Calculator',
        url: getUrl('/scientific-notation-calculator'),
        description: 'Free online scientific notation calculator for converting numbers to and from scientific notation, performing arithmetic operations, and understanding engineering notation with E notation support.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Standard to scientific notation conversion',
          'Scientific notation arithmetic (add, subtract, multiply, divide)',
          'E notation support (1.5E+10)',
          'Engineering notation (exponents of 3)',
          'Significant figures counting',
          'Step-by-step solutions',
          'Large and small number handling',
          'Copy results to clipboard',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/scientific-notation-calculator'),
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
            name: 'Math & Numbers',
            item: getUrl('/math-numbers'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Scientific Notation Calculator',
            item: getUrl('/scientific-notation-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/scientific-notation-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is scientific notation and why is it used?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Scientific notation is a way of expressing very large or very small numbers in the form a × 10^n, where 1 ≤ |a| < 10 and n is an integer. For example, 300,000,000 = 3 × 10^8 and 0.000005 = 5 × 10^-6. It's used extensively in science, engineering, and mathematics because it: makes very large/small numbers easier to read and write, clearly shows the precision of measurements (significant figures), simplifies calculations (especially multiplication and division), and prevents errors from counting zeros. For instance, the speed of light (299,792,458 m/s) is more concisely written as 2.998 × 10^8 m/s, and Avogadro's number (602,200,000,000,000,000,000,000) is written as 6.022 × 10^23.`,
            },
          },
          {
            '@type': 'Question',
            name: 'How do I convert a number to scientific notation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `To convert to scientific notation: 1) Move the decimal point until you have a number between 1 and 10 (the mantissa), 2) Count how many places you moved the decimal - this is the exponent, 3) If you moved left (large number), the exponent is positive; if you moved right (small number), the exponent is negative. Examples: 4,500 → move decimal 3 places left → 4.5 × 10^3. For 0.00067 → move decimal 4 places right → 6.7 × 10^-4. Our calculator automatically converts any number to scientific notation, handles E notation (1.5E+10), and also provides engineering notation (exponents are multiples of 3).`,
            },
          },
          {
            '@type': 'Question',
            name: 'How do I multiply and divide numbers in scientific notation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Multiplication: (a × 10^m) × (b × 10^n) = (a × b) × 10^(m+n). Multiply the mantissas and add the exponents. Example: (2 × 10^5) × (3 × 10^4) = 6 × 10^9. Division: (a × 10^m) ÷ (b × 10^n) = (a ÷ b) × 10^(m-n). Divide the mantissas and subtract the exponents. Example: (8 × 10^7) ÷ (2 × 10^3) = 4 × 10^4. If the result's mantissa is not between 1 and 10, adjust it: if 15 × 10^4, convert to 1.5 × 10^5. Our calculator performs these operations automatically and shows step-by-step solutions.`,
            },
          },
          {
            '@type': 'Question',
            name: 'What is E notation and how does it relate to scientific notation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `E notation (also called exponential notation) is a compact way to write scientific notation on computers and calculators where superscripts are unavailable. The "E" represents "× 10^" so 1.5E+10 means 1.5 × 10^10 (15 billion). The sign after E indicates the exponent: E+10 means 10^10 (positive exponent for large numbers), E-5 means 10^-5 (negative exponent for small numbers). Examples: 6.02E+23 = 6.02 × 10^23 (Avogadro's number), 1.6E-19 = 1.6 × 10^-19 (electron charge in coulombs). Most programming languages and scientific calculators use E notation. Our calculator accepts both formats and can convert between them.`,
            },
          },
          {
            '@type': 'Question',
            name: 'What is engineering notation and when should I use it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Engineering notation is similar to scientific notation but restricts exponents to multiples of 3 (-12, -9, -6, -3, 0, 3, 6, 9, 12, etc.). This aligns with SI metric prefixes: 10^-12 (pico, p), 10^-9 (nano, n), 10^-6 (micro, μ), 10^-3 (milli, m), 10^3 (kilo, k), 10^6 (mega, M), 10^9 (giga, G), 10^12 (tera, T). Example: 4,700,000 in scientific notation is 4.7 × 10^6, but in engineering notation it's 4.7 × 10^6 (4.7 M) or could be written as 4700 × 10^3 (4700 k). Engineering notation is preferred in electrical engineering, telecommunications, and when working with SI prefixes for easier metric conversions and real-world applications.`,
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/scientific-notation-calculator'),
        name: 'How to Use Scientific Notation Calculator',
        description: 'Step-by-step guide to converting and calculating with scientific notation',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Operation Type',
            text: 'Select the Conversion tab to convert between standard and scientific notation, or the Arithmetic tab to perform calculations with numbers in scientific notation.',
            url: getStepUrl('/scientific-notation-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Your Number',
            text: 'For conversion, enter any number in standard form (like 123000) or scientific notation (like 1.23E+5). For arithmetic, enter two numbers in scientific notation.',
            url: getStepUrl('/scientific-notation-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Select Operation (for Arithmetic)',
            text: 'If performing arithmetic, choose the operation: addition, subtraction, multiplication, or division. The calculator will apply the correct rules for scientific notation.',
            url: getStepUrl('/scientific-notation-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'View Results',
            text: 'Click Convert or Calculate to see results in scientific notation, engineering notation, and standard form. The calculator also shows significant figures and step-by-step solutions for arithmetic operations.',
            url: getStepUrl('/scientific-notation-calculator', 4),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/scientific-notation-calculator'),
        headline: 'Complete Guide to Scientific Notation and E Notation',
        description: 'Learn how to convert, calculate, and understand scientific notation for science and engineering',
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
        datePublished: '2024-01-15',
        dateModified: new Date().toISOString().split('T')[0],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="sr-only">Scientific Notation Calculator - Convert & Calculate E Notation Numbers</h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Scientific Notation Calculator"
        calculatorUrl="/scientific-notation-calculator"
      />

      <main className="container mx-auto px-4 py-8">
        <ScientificNotationCalculator />

        <div className="max-w-4xl mx-auto space-y-8 text-gray-700 mt-12">
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Scientific Notation</h2>
            <div className="space-y-4">
              <p>
                Scientific notation is a standardized way of writing numbers that makes very large or very small values more manageable. It expresses numbers in the form <strong>a × 10^n</strong>, where:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>a</strong> is the mantissa (coefficient): a number between 1 and 10</li>
                <li><strong>n</strong> is the exponent (power of 10): an integer that can be positive or negative</li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold text-blue-900 mb-2">Examples:</p>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Large number:</strong> 5,000,000 = 5 × 10^6</li>
                  <li>• <strong>Small number:</strong> 0.00003 = 3 × 10^-5</li>
                  <li>• <strong>Speed of light:</strong> 299,792,458 m/s ≈ 3.00 × 10^8 m/s</li>
                  <li>• <strong>Electron mass:</strong> 0.000000000000000000000000000000911 kg = 9.11 × 10^-31 kg</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Convert Numbers</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">From Standard to Scientific Notation</h3>
                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
                    <div>
                      <strong>Move the decimal point</strong> so that there is only one non-zero digit to the left of the decimal point.
                      <div className="bg-gray-50 p-3 rounded mt-2 font-mono text-sm">
                        4,500 → 4.500 (moved 3 places left)
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
                    <div>
                      <strong>Count the places moved</strong> - this becomes your exponent.
                      <div className="bg-gray-50 p-3 rounded mt-2 font-mono text-sm">
                        Moved 3 places → exponent is 3
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
                    <div>
                      <strong>Determine the sign</strong>: If you moved left (large number), exponent is positive. If moved right (small number), exponent is negative.
                      <div className="bg-gray-50 p-3 rounded mt-2 font-mono text-sm">
                        4,500 = 4.5 × 10^3 (moved left → positive)
                      </div>
                    </div>
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">From Scientific to Standard Notation</h3>
                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="font-bold text-green-600 flex-shrink-0">1.</span>
                    <div>
                      <strong>Look at the exponent</strong> to determine which direction to move the decimal.
                      <div className="bg-gray-50 p-3 rounded mt-2 font-mono text-sm">
                        6.7 × 10^4 → positive exponent, move right
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-green-600 flex-shrink-0">2.</span>
                    <div>
                      <strong>Move the decimal</strong> that many places, adding zeros as needed.
                      <div className="bg-gray-50 p-3 rounded mt-2 font-mono text-sm">
                        6.7 × 10^4 = 67,000 (moved 4 places right)
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Arithmetic Operations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Multiplication</h3>
                <div className="space-y-2 text-sm">
                  <p className="font-mono">(a × 10^m) × (b × 10^n)</p>
                  <p className="font-mono">= (a × b) × 10^(m+n)</p>
                  <div className="bg-white p-3 rounded mt-3">
                    <p className="font-semibold mb-1">Example:</p>
                    <p className="font-mono text-xs">
                      (3 × 10^5) × (2 × 10^3)<br/>
                      = (3 × 2) × 10^(5+3)<br/>
                      = 6 × 10^8
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Division</h3>
                <div className="space-y-2 text-sm">
                  <p className="font-mono">(a × 10^m) ÷ (b × 10^n)</p>
                  <p className="font-mono">= (a ÷ b) × 10^(m-n)</p>
                  <div className="bg-white p-3 rounded mt-3">
                    <p className="font-semibold mb-1">Example:</p>
                    <p className="font-mono text-xs">
                      (8 × 10^7) ÷ (2 × 10^3)<br/>
                      = (8 ÷ 2) × 10^(7-3)<br/>
                      = 4 × 10^4
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Addition/Subtraction</h3>
                <div className="space-y-2 text-sm">
                  <p>First convert to the same exponent, then add/subtract mantissas.</p>
                  <div className="bg-white p-3 rounded mt-3">
                    <p className="font-semibold mb-1">Example:</p>
                    <p className="font-mono text-xs">
                      (5 × 10^3) + (2 × 10^2)<br/>
                      = (5 × 10^3) + (0.2 × 10^3)<br/>
                      = 5.2 × 10^3
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">Adjusting Results</h3>
                <div className="space-y-2 text-sm">
                  <p>If mantissa ≥ 10 or &lt; 1, adjust to proper form.</p>
                  <div className="bg-white p-3 rounded mt-3">
                    <p className="font-semibold mb-1">Example:</p>
                    <p className="font-mono text-xs">
                      15 × 10^4 → adjust<br/>
                      = 1.5 × 10^5
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">E Notation vs Scientific Notation</h2>
            <div className="space-y-4">
              <p>
                E notation is a computer-friendly way to write scientific notation. The &quot;E&quot; stands for &quot;exponent&quot; or &quot;× 10^&quot;.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Standard</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Scientific</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">E Notation</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-sm">
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">6,020,000,000,000,000,000,000,000</td>
                      <td className="border border-gray-300 px-4 py-2">6.02 × 10^23</td>
                      <td className="border border-gray-300 px-4 py-2">6.02E+23</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">0.00000160</td>
                      <td className="border border-gray-300 px-4 py-2">1.60 × 10^-6</td>
                      <td className="border border-gray-300 px-4 py-2">1.60E-6</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">299,792,458</td>
                      <td className="border border-gray-300 px-4 py-2">2.998 × 10^8</td>
                      <td className="border border-gray-300 px-4 py-2">2.998E+8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Engineering Notation</h2>
            <div className="space-y-4">
              <p>
                Engineering notation is similar to scientific notation but restricts exponents to multiples of 3 (-12, -9, -6, -3, 0, 3, 6, 9, 12). This aligns with SI metric prefixes.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Exponent</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Prefix</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Symbol</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-gray-300 px-4 py-2">10^12</td><td className="border border-gray-300 px-4 py-2">tera</td><td className="border border-gray-300 px-4 py-2">T</td><td className="border border-gray-300 px-4 py-2">1 TB = 1×10^12 bytes</td></tr>
                    <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">10^9</td><td className="border border-gray-300 px-4 py-2">giga</td><td className="border border-gray-300 px-4 py-2">G</td><td className="border border-gray-300 px-4 py-2">1 GHz = 1×10^9 Hz</td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2">10^6</td><td className="border border-gray-300 px-4 py-2">mega</td><td className="border border-gray-300 px-4 py-2">M</td><td className="border border-gray-300 px-4 py-2">1 MW = 1×10^6 W</td></tr>
                    <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">10^3</td><td className="border border-gray-300 px-4 py-2">kilo</td><td className="border border-gray-300 px-4 py-2">k</td><td className="border border-gray-300 px-4 py-2">1 km = 1×10^3 m</td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2">10^-3</td><td className="border border-gray-300 px-4 py-2">milli</td><td className="border border-gray-300 px-4 py-2">m</td><td className="border border-gray-300 px-4 py-2">1 ms = 1×10^-3 s</td></tr>
                    <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">10^-6</td><td className="border border-gray-300 px-4 py-2">micro</td><td className="border border-gray-300 px-4 py-2">μ</td><td className="border border-gray-300 px-4 py-2">1 μm = 1×10^-6 m</td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2">10^-9</td><td className="border border-gray-300 px-4 py-2">nano</td><td className="border border-gray-300 px-4 py-2">n</td><td className="border border-gray-300 px-4 py-2">1 nm = 1×10^-9 m</td></tr>
                    <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">10^-12</td><td className="border border-gray-300 px-4 py-2">pico</td><td className="border border-gray-300 px-4 py-2">p</td><td className="border border-gray-300 px-4 py-2">1 pF = 1×10^-12 F</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link 
                href="/percentage-calculator"
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h3>
                <p className="text-sm text-gray-600">Calculate percentages</p>
              </Link>
              <Link 
                href="/rounding-calculator"
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">🔄</div>
                <h3 className="font-semibold text-gray-900 mb-1">Rounding Calculator</h3>
                <p className="text-sm text-gray-600">Round numbers with multiple methods</p>
              </Link>
              <Link 
                href="/square-root-calculator"
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">√</div>
                <h3 className="font-semibold text-gray-900 mb-1">Square Root Calculator</h3>
                <p className="text-sm text-gray-600">Calculate roots</p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

