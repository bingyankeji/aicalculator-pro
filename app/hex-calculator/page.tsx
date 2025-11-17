import { Metadata } from 'next';
import HexCalculator from '@/components/Calculator/HexCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hex Calculator - Hexadecimal Converter & Color Code Tool | Free Online',
  description: 'Free hexadecimal calculator for number conversion, hex arithmetic, and color code conversion. Convert between hex, decimal, binary, and octal. RGB to Hex converter with instant results.',
  keywords: [
    'hex calculator',
    'hexadecimal calculator',
    'hex to decimal',
    'decimal to hex',
    'hex converter',
    'hex to binary',
    'binary to hex',
    'hex arithmetic',
    'hex color converter',
    'RGB to hex',
    'hex to RGB',
    'color code converter',
    'hex addition',
    'hex subtraction',
    'hex multiplication',
    'hex division',
    'bitwise hex calculator',
    'programmer calculator',
    'memory address calculator',
    'base 16 calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Hex Calculator - Hexadecimal Converter & Color Code Tool',
    description: 'Free hex calculator for conversion and operations. Convert between hex, decimal, binary, octal. RGB to Hex color converter with visual preview.',
    type: 'website',
    url: getUrl('/hex-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('hex'),
      width: 1200,
      height: 630,
      alt: 'Hex Calculator - Hexadecimal Number Conversion'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hex Calculator - Hexadecimal Converter & Color Tool',
    description: 'Free hex calculator for number conversion and color codes. Convert hex, decimal, binary, octal.',
    images: [getOgImage('hex')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/hex-calculator'),
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

export default function HexCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/hex-calculator'),
        name: 'Hex Calculator',
        url: getUrl('/hex-calculator'),
        description: 'Free online hexadecimal calculator for number system conversion, hex arithmetic operations, color code conversion, and bitwise calculations. Convert between hex, decimal, binary, and octal number systems.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Number system conversion (Hex, Decimal, Binary, Octal)',
          'Hexadecimal arithmetic operations (Add, Subtract, Multiply, Divide)',
          'Color code converter (Hex to RGB, RGB to Hex)',
          'Bitwise operations (AND, OR, XOR, NOT)',
          'Visual color preview',
          'Memory address calculations',
          'Copy results to clipboard',
          'Mobile-friendly interface',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/hex-calculator'),
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
            name: 'Hex Calculator',
            item: getUrl('/hex-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/hex-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is hexadecimal and why is it used in computing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hexadecimal (hex) is a base-16 number system using digits 0-9 and letters A-F (where A=10, B=11, C=12, D=13, E=14, F=15). It\'s extensively used in computing because it provides a more compact way to represent binary data. Each hex digit represents exactly 4 binary bits, making conversion straightforward. For example, hex FF equals binary 11111111 (decimal 255). Hex is commonly used for memory addresses, color codes in web design (#FF0000 for red), MAC addresses, IPv6 addresses, error codes, and machine code representation. Programmers use hex because it\'s much easier to read and write than long strings of binary digits.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I convert hexadecimal to decimal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To convert hex to decimal, multiply each digit by 16 raised to its position (starting from 0 on the right) and add the results. For example, hex 2A3: (2×16²) + (10×16¹) + (3×16⁰) = 512 + 160 + 3 = 675 decimal. Remember that A=10, B=11, C=12, D=13, E=14, F=15. Using our calculator, simply enter your hex number (like 2A3 or #FF00FF), select "Hexadecimal" as input type, and click Convert to instantly get results in decimal, binary, and octal formats.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do hex color codes work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hex color codes represent colors using 6 hexadecimal digits in the format #RRGGBB, where RR (red), GG (green), and BB (blue) each range from 00 to FF (0-255 in decimal). For example, #FF0000 is pure red (255,0,0), #00FF00 is pure green (0,255,0), and #0000FF is pure blue (0,0,255). #FFFFFF is white (all colors at maximum), #000000 is black (all colors at minimum), and #808080 is gray (equal amounts of all colors). Our color converter lets you easily convert between hex codes and RGB values, with a visual preview to see the actual color.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are common uses of hexadecimal in programming?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hexadecimal is widely used in programming for: 1) Memory addresses (0x00A1B2C3), 2) Color codes in web/graphics (#FF5733), 3) Character encoding (Unicode: U+1F600 for 😀), 4) Binary file viewing and editing (hex editors), 5) MAC addresses (00:1A:2B:3C:4D:5E), 6) Bit flags and masks (0xFF = all bits set), 7) Error codes and debugging, 8) Cryptographic hashes (SHA-256 outputs), 9) Low-level hardware programming, 10) File signatures and magic numbers. The 0x prefix commonly indicates hex numbers in code (e.g., 0xFF means hex FF).',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I perform arithmetic operations with hexadecimal numbers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, you can perform all standard arithmetic operations with hex numbers just like decimal numbers. Our hex calculator supports addition, subtraction, multiplication, and division. For example: FF + 1 = 100, 200 - AB = 155, 10 × 10 = 100 (hex). When working with hex arithmetic, remember that each digit goes from 0 to F before carrying over. The calculator handles all conversions automatically and displays results in both hex and decimal formats, making it easy to verify your calculations.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/hex-calculator'),
        name: 'How to Convert and Calculate with Hexadecimal Numbers',
        description: 'Step-by-step guide to using the hex calculator for number conversion, arithmetic, and color codes',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Your Operation',
            text: 'Select the appropriate tab based on what you need: Number Conversion for changing between number systems, Arithmetic for hex math operations, Color Converter for hex color codes, or Bitwise for logical operations.',
            url: getStepUrl('/hex-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Your Values',
            text: 'For number conversion, enter your number and select the input type (Hex, Decimal, Binary, or Octal). For arithmetic, enter two hex numbers and select the operation. For colors, enter either a hex code (#RRGGBB) or RGB values (0-255 each).',
            url: getStepUrl('/hex-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Calculate and View Results',
            text: 'Click the Calculate or Convert button. Results are displayed instantly with all relevant conversions. For color conversion, you\'ll see a visual preview of the color along with both hex and RGB values.',
            url: getStepUrl('/hex-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Copy or Save Results',
            text: 'Use the copy button next to any result to copy it to your clipboard. You can also print the results page or share the calculator link with others.',
            url: getStepUrl('/hex-calculator', 4),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/hex-calculator'),
        headline: 'Complete Guide to Hexadecimal Calculator and Conversions',
        description: 'Learn everything about hexadecimal numbers, conversions, and practical applications',
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
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Hex Calculator - Hexadecimal Converter, Color Code Tool & Number System Calculator</h1>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600"
              itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/math-numbers" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Math & Numbers</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Hex Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Calculator Component */}
        <HexCalculator />

        {/* Educational Content */}
        <div className="max-w-4xl mx-auto space-y-8 text-gray-700">
          {/* What is Hexadecimal */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What is Hexadecimal?</h3>
            <div className="space-y-4">
              <p>
                Hexadecimal (hex) is a base-16 number system that uses 16 distinct symbols: digits 0-9 represent values zero to nine, and letters A-F represent values ten to fifteen. It's one of the most important number systems in computing and digital electronics.
              </p>
              <p>
                The term "hexadecimal" comes from the Greek "hex" (six) and Latin "decima" (ten), referring to the system's base of 16. Each hexadecimal digit represents exactly four binary bits (a nibble), making conversion between hex and binary particularly straightforward.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                <p className="font-semibold text-purple-900 mb-2">Quick Reference:</p>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Hex A</strong> = Decimal 10 = Binary 1010</li>
                  <li>• <strong>Hex F</strong> = Decimal 15 = Binary 1111</li>
                  <li>• <strong>Hex 10</strong> = Decimal 16 = Binary 10000</li>
                  <li>• <strong>Hex FF</strong> = Decimal 255 = Binary 11111111</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to Convert */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Convert Hexadecimal Numbers</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Hex to Decimal Conversion</h4>
                <p className="mb-2">
                  To convert hexadecimal to decimal, multiply each digit by 16 raised to its position power (starting from 0 on the right) and sum the results.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  <p><strong>Example: Convert 2A3F to decimal</strong></p>
                  <p className="mt-2">2A3F₁₆ = (2 × 16³) + (10 × 16²) + (3 × 16¹) + (15 × 16⁰)</p>
                  <p>= (2 × 4096) + (10 × 256) + (3 × 16) + (15 × 1)</p>
                  <p>= 8192 + 2560 + 48 + 15</p>
                  <p className="font-bold text-purple-600">= 10,815₁₀</p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Decimal to Hex Conversion</h4>
                <p className="mb-2">
                  To convert decimal to hexadecimal, repeatedly divide the number by 16 and record the remainders. Read the remainders in reverse order.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  <p><strong>Example: Convert 254 to hexadecimal</strong></p>
                  <p className="mt-2">254 ÷ 16 = 15 remainder 14 (E)</p>
                  <p>15 ÷ 16 = 0 remainder 15 (F)</p>
                  <p className="font-bold text-purple-600 mt-2">Result: FE₁₆</p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Hex to Binary Conversion</h4>
                <p className="mb-2">
                  Each hexadecimal digit converts to exactly 4 binary bits, making this conversion very straightforward.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-2">Hex</th>
                        <th className="text-left py-2">Binary</th>
                        <th className="text-left py-2">Hex</th>
                        <th className="text-left py-2">Binary</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono">
                      <tr><td>0</td><td>0000</td><td>8</td><td>1000</td></tr>
                      <tr><td>1</td><td>0001</td><td>9</td><td>1001</td></tr>
                      <tr><td>2</td><td>0010</td><td>A</td><td>1010</td></tr>
                      <tr><td>3</td><td>0011</td><td>B</td><td>1011</td></tr>
                      <tr><td>4</td><td>0100</td><td>C</td><td>1100</td></tr>
                      <tr><td>5</td><td>0101</td><td>D</td><td>1101</td></tr>
                      <tr><td>6</td><td>0110</td><td>E</td><td>1110</td></tr>
                      <tr><td>7</td><td>0111</td><td>F</td><td>1111</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Hex Color Codes */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Hex Color Codes</h3>
            <div className="space-y-4">
              <p>
                Hex color codes are six-digit hexadecimal numbers that represent colors in web design and digital graphics. The format is #RRGGBB, where:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>RR</strong> = Red component (00-FF / 0-255)</li>
                <li><strong>GG</strong> = Green component (00-FF / 0-255)</li>
                <li><strong>BB</strong> = Blue component (00-FF / 0-255)</li>
              </ul>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Common Colors:</p>
                  <ul className="space-y-2 text-sm font-mono">
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded" style={{backgroundColor: '#FF0000'}}></span>
                      #FF0000 - Red
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded" style={{backgroundColor: '#00FF00'}}></span>
                      #00FF00 - Green
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded" style={{backgroundColor: '#0000FF'}}></span>
                      #0000FF - Blue
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded border border-gray-300" style={{backgroundColor: '#FFFFFF'}}></span>
                      #FFFFFF - White
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded" style={{backgroundColor: '#000000'}}></span>
                      #000000 - Black
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Popular Web Colors:</p>
                  <ul className="space-y-2 text-sm font-mono">
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded" style={{backgroundColor: '#3B82F6'}}></span>
                      #3B82F6 - Blue
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded" style={{backgroundColor: '#10B981'}}></span>
                      #10B981 - Green
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded" style={{backgroundColor: '#F59E0B'}}></span>
                      #F59E0B - Orange
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded" style={{backgroundColor: '#EF4444'}}></span>
                      #EF4444 - Red
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded" style={{backgroundColor: '#8B5CF6'}}></span>
                      #8B5CF6 - Purple
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Common Uses */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Uses of Hexadecimal</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">🎨 Web Design & Graphics</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Color specifications (#FF5733)</li>
                  <li>• CSS styling</li>
                  <li>• Image editing tools</li>
                  <li>• Digital design software</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">💻 Programming</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Memory addresses (0x00A1B2C3)</li>
                  <li>• Character encoding (Unicode)</li>
                  <li>• Bit manipulation</li>
                  <li>• Error codes and debugging</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">🌐 Networking</h4>
                <ul className="space-y-2 text-sm">
                  <li>• MAC addresses</li>
                  <li>• IPv6 addresses</li>
                  <li>• Network configuration</li>
                  <li>• Protocol analysis</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">🔐 Security</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Cryptographic hashes</li>
                  <li>• Encryption keys</li>
                  <li>• Digital signatures</li>
                  <li>• Security tokens</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tips and Best Practices */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tips & Best Practices</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-semibold text-blue-900 mb-1">💡 Tip #1: The 0x Prefix</p>
                <p className="text-blue-800 text-sm">
                  In programming, hex numbers often use the "0x" prefix (e.g., 0xFF) to distinguish them from decimal numbers. This prevents confusion in code.
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-semibold text-green-900 mb-1">💡 Tip #2: Color Shorthand</p>
                <p className="text-green-800 text-sm">
                  When all RGB pairs are identical, you can use 3-digit shorthand: #FFF = #FFFFFF (white), #F00 = #FF0000 (red).
                </p>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                <p className="font-semibold text-purple-900 mb-1">💡 Tip #3: Memory Addresses</p>
                <p className="text-purple-800 text-sm">
                  Hex is perfect for memory addresses because each pair of hex digits represents one byte (8 bits), making it easy to calculate memory sizes.
                </p>
              </div>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <p className="font-semibold text-orange-900 mb-1">💡 Tip #4: Case Insensitive</p>
                <p className="text-orange-800 text-sm">
                  Hexadecimal letters A-F can be written in uppercase or lowercase (e.g., #FF00AA = #ff00aa). Both are valid and equivalent.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Related Calculators</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link 
                href="/binary-calculator"
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">💻</div>
                <h4 className="font-semibold text-gray-900 mb-1">Binary Calculator</h4>
                <p className="text-sm text-gray-600">Convert and calculate binary numbers</p>
              </Link>
              <Link 
                href="/percentage-calculator"
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h4>
                <p className="text-sm text-gray-600">Calculate percentages easily</p>
              </Link>
              <Link 
                href="/scientific-calculator"
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">🔬</div>
                <h4 className="font-semibold text-gray-900 mb-1">Scientific Calculator</h4>
                <p className="text-sm text-gray-600">Advanced mathematical operations</p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

