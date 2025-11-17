import { Metadata } from 'next';
import { BinaryCalculator } from '@/components/Calculator/BinaryCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Binary Calculator - Convert Binary, Decimal, Hex, Octal | Free Online Tool',
  description: 'Free binary calculator for number system conversion, binary arithmetic, and bitwise operations. Convert between binary, decimal, hexadecimal, and octal. Perform AND, OR, XOR, NOT operations with step-by-step solutions.',
  keywords: [
    'binary calculator',
    'binary to decimal',
    'decimal to binary',
    'hex to binary',
    'binary converter',
    'binary arithmetic',
    'bitwise calculator',
    'binary operations',
    'octal to binary',
    'binary to hex converter',
    'binary math',
    'binary addition calculator',
    'binary subtraction',
    'binary multiplication',
    'binary division',
    'AND OR XOR calculator',
    'bit manipulation',
    'programmer calculator',
    'number system converter',
    'base conversion calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Binary Calculator - Convert & Calculate Binary Numbers',
    description: 'Free binary calculator for conversion and operations. Convert between binary, decimal, hex, and octal. Perform bitwise AND, OR, XOR, NOT operations instantly.',
    type: 'website',
    url: getUrl('/binary-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('binary'),
      width: 1200,
      height: 630,
      alt: 'Binary Calculator - Number System Conversion'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Binary Calculator - Convert & Calculate Binary Numbers',
    description: 'Free binary calculator for conversion and bitwise operations. Convert between binary, decimal, hex, octal.',
    images: [getOgImage('binary')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/binary-calculator'),
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

export default function BinaryCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/binary-calculator'),
        name: 'Binary Calculator',
        url: getUrl('/binary-calculator'),
        description: 'Free online binary calculator for number system conversion, binary arithmetic operations, and bitwise calculations. Convert between binary, decimal, hexadecimal, and octal number systems.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Number system conversion (Binary, Decimal, Octal, Hexadecimal)',
          'Binary arithmetic operations (Add, Subtract, Multiply, Divide)',
          'Bitwise operations (AND, OR, XOR, NOT)',
          'Instant conversion results',
          'Copy results to clipboard',
          'Step-by-step calculation display',
          'Mobile-friendly interface',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/binary-calculator'),
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
            name: 'Binary Calculator',
            item: getUrl('/binary-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/binary-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is binary and how does the binary number system work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Binary is a base-2 number system that uses only two digits: 0 and 1. Each position in a binary number represents a power of 2, starting from the rightmost digit (2^0=1). For example, binary 1010 equals (1×2³) + (0×2²) + (1×2¹) + (0×2⁰) = 8+0+2+0 = 10 in decimal. Binary is fundamental to computer systems because digital circuits have two states: on (1) and off (0). All data in computers—numbers, text, images, programs—is ultimately represented in binary. Understanding binary is essential for programmers, computer engineers, and anyone working with digital systems.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I convert binary to decimal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To convert binary to decimal, multiply each digit by 2 raised to its position (starting from 0 on the right) and add the results. For example, binary 11001: (1×2⁴) + (1×2³) + (0×2²) + (0×2¹) + (1×2⁰) = 16 + 8 + 0 + 0 + 1 = 25 decimal. Using our calculator, simply enter your binary number, select "Binary" as input type, and click Convert to get instant results in decimal, octal, and hexadecimal formats.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are bitwise operations and when are they used?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bitwise operations perform operations on individual bits of binary numbers. AND returns 1 only if both bits are 1. OR returns 1 if at least one bit is 1. XOR returns 1 if bits are different. NOT inverts all bits. These operations are crucial in programming for: setting/clearing specific bits in hardware registers, creating bit masks, optimizing performance (bitwise operations are faster than arithmetic), implementing encryption algorithms, and manipulating pixel data in graphics. For example, 1010 AND 1100 = 1000, useful for checking if specific flags are set.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I perform binary addition?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Binary addition follows similar rules to decimal addition but with carrying: 0+0=0, 0+1=1, 1+0=1, 1+1=10 (0 with carry 1), and 1+1+1=11 (1 with carry 1). For example, 1011 + 0110: Start from right: 1+0=1, 1+1=10 (write 0, carry 1), 0+1+1=10 (write 0, carry 1), 1+0+1=10 (write 10), result: 10001. Our calculator performs this automatically, handling carries and displaying the result instantly. This is essential for understanding how computers perform arithmetic at the hardware level.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between binary, octal, and hexadecimal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'These are different number systems with different bases. Binary (base-2) uses 0-1, octal (base-8) uses 0-7, and hexadecimal (base-16) uses 0-9 and A-F. Hexadecimal is commonly used in programming because each hex digit represents exactly 4 binary digits, making it more compact. For example, binary 11111111 = octal 377 = hexadecimal FF = decimal 255. Programmers use hex for memory addresses, color codes (#FF0000 for red), and byte representations because it\'s more readable than long binary strings while maintaining a direct relationship with binary.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where can I learn more about binary systems and programming?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For comprehensive computer science fundamentals, visit MIT OpenCourseWare or Stanford\'s online courses. Khan Academy offers free binary and number systems tutorials. For programming-specific binary operations, check official documentation for your language (Python docs for bin(), hex(), oct() functions; Java\'s Integer class methods). IEEE and ACM publish research on computer arithmetic. Practice bitwise operations on platforms like LeetCode and HackerRank. Our calculator helps you verify your work and understand conversion patterns as you learn.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/binary-calculator'),
        name: 'How to Use the Binary Calculator',
        description: 'Step-by-step guide to convert numbers between different number systems and perform binary operations',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Binary Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter your number',
            text: 'In the Number System Conversion section, enter the number you want to convert in the input field. The calculator accepts binary (0-1), decimal (0-9), octal (0-7), or hexadecimal (0-9, A-F) input.',
            url: getStepUrl('/binary-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Select input type',
            text: 'Choose the number system of your input from the dropdown menu: Binary (Base 2), Decimal (Base 10), Octal (Base 8), or Hexadecimal (Base 16). Make sure your input matches the selected type.',
            url: getStepUrl('/binary-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Click Convert',
            text: 'Press the Convert button to instantly see your number converted to all four number systems: binary, decimal, octal, and hexadecimal. Results are displayed clearly with copy buttons for easy use.',
            url: getStepUrl('/binary-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Perform binary arithmetic',
            text: 'For binary addition, subtraction, multiplication, or division, enter two binary numbers in the Binary Arithmetic section, select your operation, and click Calculate to see the binary result.',
            url: getStepUrl('/binary-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Try bitwise operations',
            text: 'In the Bitwise Operations section, enter binary numbers and choose AND, OR, XOR, or NOT operations. The calculator shows both the operation performed and the binary result, helping you understand bit manipulation.',
            url: getStepUrl('/binary-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Copy or share results',
            text: 'Use the copy buttons next to results to quickly copy values to your clipboard. You can also print or share the calculator page using the buttons at the bottom of the page.',
            url: getStepUrl('/binary-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/binary-calculator'),
        headline: 'Understanding Binary: The Foundation of Digital Computing',
        description: 'Comprehensive guide to binary numbers, conversion methods, and bitwise operations for programmers and computer science students.',
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
        dateModified: '2024-11-16',
        image: getOgImage('binary'),
        articleBody: 'Binary is the fundamental number system used in computing and digital electronics. This calculator provides tools for converting between binary, decimal, octal, and hexadecimal systems, performing binary arithmetic, and executing bitwise operations essential for programming.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        Binary Calculator - Convert Binary to Decimal, Hex, Octal | Free Online Binary Converter
      </h1>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol
            className="flex items-center space-x-2 text-sm text-gray-600"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link
                href="/math-numbers"
                itemProp="item"
                className="hover:text-blue-600 transition-colors"
              >
                <span itemProp="name">Math & Numbers</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Binary Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <BinaryCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Binary Numbers and Number Systems
          </h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h3 className="text-xl font-semibold mb-3">What is Binary?</h3>
            <p className="text-gray-700">
              Binary (base-2) is the fundamental number system used in computing and digital
              electronics. Unlike the decimal system we use daily (base-10), binary uses only two
              digits: 0 and 1. This corresponds perfectly to the two states of electronic circuits:
              off (0) and on (1). Every piece of data in a computer—from numbers and text to images
              and programs—is ultimately represented in binary.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Number System Conversion Guide
          </h3>

          <h4 className="text-xl font-semibold text-gray-900 mb-3">
            Binary to Decimal Conversion
          </h4>
          <p className="text-gray-700 mb-4">
            To convert a binary number to decimal, multiply each digit by 2 raised to its position
            (counting from right to left, starting at 0) and sum the results. For example:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6 font-mono text-sm">
            <p>Binary: 1011</p>
            <p>= (1 × 2³) + (0 × 2²) + (1 × 2¹) + (1 × 2⁰)</p>
            <p>= (1 × 8) + (0 × 4) + (1 × 2) + (1 × 1)</p>
            <p>= 8 + 0 + 2 + 1</p>
            <p className="font-bold">= 11 (decimal)</p>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mb-3">
            Decimal to Binary Conversion
          </h4>
          <p className="text-gray-700 mb-4">
            To convert decimal to binary, repeatedly divide the number by 2 and record the
            remainders. The binary number is formed by reading the remainders from bottom to top:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6 font-mono text-sm">
            <p>Decimal: 13</p>
            <p>13 ÷ 2 = 6 remainder 1</p>
            <p>6 ÷ 2 = 3 remainder 0</p>
            <p>3 ÷ 2 = 1 remainder 1</p>
            <p>1 ÷ 2 = 0 remainder 1</p>
            <p className="font-bold">Binary: 1101 (reading remainders bottom to top)</p>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mb-3">
            Hexadecimal and Octal Systems
          </h4>
          <p className="text-gray-700 mb-4">
            Hexadecimal (base-16) and octal (base-8) are commonly used in programming because they
            provide more compact representations of binary numbers:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Hexadecimal:</strong> Uses digits 0-9 and letters A-F. Each hex digit
              represents exactly 4 binary digits. Example: Binary 11111111 = Hex FF = Decimal 255
            </li>
            <li>
              <strong>Octal:</strong> Uses digits 0-7. Each octal digit represents exactly 3 binary
              digits. Example: Binary 111101 = Octal 75 = Decimal 61
            </li>
            <li>
              <strong>Use Cases:</strong> Hex is used for memory addresses, color codes (#FF0000),
              and byte values. Octal is used in Unix file permissions (chmod 755).
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Binary Arithmetic Operations
          </h3>

          <h4 className="text-xl font-semibold text-gray-900 mb-3">Binary Addition</h4>
          <p className="text-gray-700 mb-4">Binary addition follows these rules:</p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6 font-mono text-sm">
            <p>0 + 0 = 0</p>
            <p>0 + 1 = 1</p>
            <p>1 + 0 = 1</p>
            <p>1 + 1 = 10 (0 with carry of 1)</p>
            <p>1 + 1 + 1 = 11 (1 with carry of 1)</p>
          </div>
          <p className="text-gray-700 mb-6">
            Example: Adding 1011 + 0110 = 10001. Start from the rightmost bit and work left,
            carrying when necessary, just like decimal addition but with base-2 rules.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mb-3">Binary Subtraction</h4>
          <p className="text-gray-700 mb-4">
            Binary subtraction can be performed using borrowing (similar to decimal) or by using
            two's complement for negative numbers. The borrowing rules are:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6 font-mono text-sm">
            <p>0 - 0 = 0</p>
            <p>1 - 0 = 1</p>
            <p>1 - 1 = 0</p>
            <p>0 - 1 = 1 (with borrow)</p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Bitwise Operations Explained
          </h3>

          <p className="text-gray-700 mb-4">
            Bitwise operations work on individual bits and are fundamental in low-level programming,
            hardware interfacing, and optimization:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-lg text-gray-900 mb-2">AND Operation (&)</h4>
              <p className="text-sm text-gray-700 mb-2">
                Returns 1 only if both bits are 1. Used for masking and checking specific bits.
              </p>
              <div className="bg-gray-50 p-2 rounded font-mono text-xs">
                <p>1010 AND 1100 = 1000</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-lg text-gray-900 mb-2">OR Operation (|)</h4>
              <p className="text-sm text-gray-700 mb-2">
                Returns 1 if at least one bit is 1. Used for setting specific bits.
              </p>
              <div className="bg-gray-50 p-2 rounded font-mono text-xs">
                <p>1010 OR 1100 = 1110</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-lg text-gray-900 mb-2">XOR Operation (^)</h4>
              <p className="text-sm text-gray-700 mb-2">
                Returns 1 only if bits are different. Used for toggling and encryption.
              </p>
              <div className="bg-gray-50 p-2 rounded font-mono text-xs">
                <p>1010 XOR 1100 = 0110</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-lg text-gray-900 mb-2">NOT Operation (~)</h4>
              <p className="text-sm text-gray-700 mb-2">
                Inverts all bits (0 becomes 1, 1 becomes 0). Used for complementing values.
              </p>
              <div className="bg-gray-50 p-2 rounded font-mono text-xs">
                <p>NOT 1010 = 0101</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Practical Applications of Binary
          </h3>

          <h4 className="text-xl font-semibold text-gray-900 mb-3">
            In Computer Programming
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Flags and Bitmasks:</strong> Using single bits to represent boolean states
              efficiently. For example, file permissions in Unix use 9 bits for read, write,
              execute permissions for owner, group, and others.
            </li>
            <li>
              <strong>Performance Optimization:</strong> Bitwise operations are significantly
              faster than arithmetic operations. Multiplying by 2 using left shift (x &lt;&lt; 1)
              is faster than (x * 2).
            </li>
            <li>
              <strong>Color Representation:</strong> Colors in web and graphics are often
              represented in hexadecimal (e.g., #FF5733 represents RGB values in hex: FF=255 red,
              57=87 green, 33=51 blue).
            </li>
            <li>
              <strong>Network Protocols:</strong> IP addresses, subnet masks, and packet headers
              use binary representation for efficient routing and processing.
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mb-3">
            In Digital Electronics
          </h4>
          <p className="text-gray-700 mb-6">
            Binary forms the foundation of digital circuits. Logic gates (AND, OR, NOT, XOR, NAND,
            NOR) perform binary operations on electrical signals. These gates combine to create
            complex circuits like adders, multiplexers, and memory units. Understanding binary is
            essential for hardware design, embedded systems programming, and digital signal
            processing.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
            <h4 className="text-lg font-semibold mb-3">💡 Pro Tips for Working with Binary</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Powers of Two:</strong> Memorize powers of 2 up to 2¹⁶ (65536) for quick
                mental conversions
              </li>
              <li>
                <strong>Hex Shortcuts:</strong> Convert binary to hex by grouping 4 bits at a time
                (nibbles)
              </li>
              <li>
                <strong>Practice:</strong> Try converting your age, birth year, or favorite numbers
                to binary
              </li>
              <li>
                <strong>Debugging:</strong> Use binary/hex representation when debugging low-level
                code or hardware
              </li>
              <li>
                <strong>Bit Counting:</strong> The number of 1s in a binary number is called
                "population count" or "Hamming weight"
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Common Binary Patterns</h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mb-8">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Decimal</th>
                  <th className="border border-gray-300 px-4 py-2">Binary</th>
                  <th className="border border-gray-300 px-4 py-2">Octal</th>
                  <th className="border border-gray-300 px-4 py-2">Hexadecimal</th>
                  <th className="border border-gray-300 px-4 py-2">Common Use</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="border border-gray-300 px-4 py-2">0</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">0000</td>
                  <td className="border border-gray-300 px-4 py-2">0</td>
                  <td className="border border-gray-300 px-4 py-2">0</td>
                  <td className="border border-gray-300 px-4 py-2">Zero, false, off</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">1</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">0001</td>
                  <td className="border border-gray-300 px-4 py-2">1</td>
                  <td className="border border-gray-300 px-4 py-2">1</td>
                  <td className="border border-gray-300 px-4 py-2">One, true, on</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">8</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">1000</td>
                  <td className="border border-gray-300 px-4 py-2">10</td>
                  <td className="border border-gray-300 px-4 py-2">8</td>
                  <td className="border border-gray-300 px-4 py-2">Byte boundary</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">15</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">1111</td>
                  <td className="border border-gray-300 px-4 py-2">17</td>
                  <td className="border border-gray-300 px-4 py-2">F</td>
                  <td className="border border-gray-300 px-4 py-2">Nibble all bits set</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">255</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">11111111</td>
                  <td className="border border-gray-300 px-4 py-2">377</td>
                  <td className="border border-gray-300 px-4 py-2">FF</td>
                  <td className="border border-gray-300 px-4 py-2">Max unsigned byte</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
            <h4 className="text-lg font-semibold mb-3">🎓 Learning Resources</h4>
            <p className="text-gray-700 mb-3">
              For deeper understanding of binary and computer arithmetic:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                Visit{' '}
                <a
                  href="https://ocw.mit.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  MIT OpenCourseWare
                </a>{' '}
                for computer science fundamentals
              </li>
              <li>
                Check Khan Academy for free tutorials on binary and number systems
              </li>
              <li>
                Practice bitwise operations on{' '}
                <a
                  href="https://leetcode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  LeetCode
                </a>{' '}
                and HackerRank
              </li>
              <li>
                Read IEEE and ACM publications for advanced computer arithmetic topics
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/scientific-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔬</div>
            <h3 className="font-semibold text-gray-900">Scientific Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Advanced mathematical calculations</p>
          </Link>

          <Link
            href="/percentage-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">%</div>
            <h3 className="font-semibold text-gray-900">Percentage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate percentages and ratios</p>
          </Link>

          <Link
            href="/fraction-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">➗</div>
            <h3 className="font-semibold text-gray-900">Fraction Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Add, subtract, multiply fractions</p>
          </Link>

          <Link
            href="/ratio-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold text-gray-900">Ratio Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Simplify and scale ratios</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

