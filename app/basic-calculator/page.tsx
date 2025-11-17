import { Metadata } from 'next';
import Link from 'next/link';
import BasicCalculator from '@/components/Calculator/BasicCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl, getCategoryUrl } from '@/config/site';

const calculatorUrl = '/basic-calculator';
const calculatorName = 'Basic Calculator';

export const metadata: Metadata = {
  title: 'Basic Calculator - Free Online Calculator for Math & Arithmetic',
  description: 'Free online basic calculator for simple and complex math calculations. Perform addition, subtraction, multiplication, division, percentages, and square roots with keyboard support and calculation history.',
  keywords: ['basic calculator', 'online calculator', 'free calculator', 'math calculator', 'simple calculator', 'arithmetic calculator', 'web calculator', 'calculator online', 'addition calculator', 'subtraction calculator', 'multiplication calculator', 'division calculator', 'percentage calculator', 'square root calculator', 'calculator with memory', 'calculator keyboard', 'scientific calculator basic', 'easy calculator', 'quick calculator', 'calculator tool'],
  authors: [{ name: 'Calculator Tools' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  robots: 'index, follow',
  alternates: {
    canonical: getUrl(calculatorUrl),
  },
  openGraph: {
    title: 'Basic Calculator - Free Online Calculator',
    description: 'Free online calculator for all your math needs. Simple, fast, and reliable with keyboard support and calculation history.',
    url: getUrl(calculatorUrl),
    siteName: 'Calculator Tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: getOgImage(),
        width: 1200,
        height: 630,
        alt: 'Basic Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Basic Calculator - Free Online Calculator',
    description: 'Free online calculator for all your math needs. Simple, fast, and reliable with keyboard support and calculation history.',
    images: [getOgImage()],
  },
};

export default function BasicCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId(calculatorUrl),
        name: calculatorName,
        url: getUrl(calculatorUrl),
        description: 'Free online basic calculator for performing arithmetic operations including addition, subtraction, multiplication, division, percentages, and square roots.',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Basic arithmetic operations (+, -, ×, ÷)',
          'Percentage calculations',
          'Square root function',
          'Memory functions (M+, M-, MR, MC)',
          'Keyboard support',
          'Calculation history',
          'Clear and Clear Entry functions',
          'Sign toggle (±)',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId(calculatorUrl),
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
            name: 'Math & Science',
            item: getUrl(getCategoryUrl('math')),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: calculatorName,
            item: getUrl(calculatorUrl),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId(calculatorUrl),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I use the basic calculator?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Click number buttons (0-9) to input numbers, use operation buttons (+, -, ×, ÷) for calculations, and press = to get the result. You can also use your keyboard for faster input. The calculator supports decimal points, percentages, square roots, and memory functions.',
            },
          },
          {
            '@type': 'Question',
            name: 'What keyboard shortcuts are available?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can use number keys (0-9) for digits, +, -, *, / for operations, Enter or = for equals, Esc or C for clear all, Backspace for clear entry, . for decimal point, and % for percentage. This makes calculations faster and more convenient.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the memory functions (M+, M-, MR, MC)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Memory functions let you store and recall values: M+ adds the current value to memory, M- subtracts from memory, MR recalls the stored value, and MC clears memory. This is useful for complex calculations where you need to temporarily store intermediate results.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between C and CE buttons?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'C (Clear) clears everything including the current calculation and stored operation, resetting the calculator completely. CE (Clear Entry) only clears the current number being entered, allowing you to re-enter it without losing your previous calculation.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I see my calculation history?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! The calculator automatically saves your last 10 calculations in the history panel. Each entry shows the expression (e.g., "5 + 3") and the result. You can clear the history at any time using the "Clear History" button.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId(calculatorUrl),
        name: 'How to Perform Basic Calculations',
        description: 'Step-by-step guide to using the online basic calculator.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter First Number',
            text: 'Click number buttons or use your keyboard to enter the first number.',
            url: getStepUrl(calculatorUrl, 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Choose Operation',
            text: 'Click an operation button (+, -, ×, ÷) to select the mathematical operation.',
            url: getStepUrl(calculatorUrl, 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Second Number',
            text: 'Enter the second number using buttons or keyboard.',
            url: getStepUrl(calculatorUrl, 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Get Result',
            text: 'Press = or Enter to calculate and display the result.',
            url: getStepUrl(calculatorUrl, 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Continue or Clear',
            text: 'Continue with more calculations or press C to clear and start fresh.',
            url: getStepUrl(calculatorUrl, 5),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId(calculatorUrl),
        headline: 'Basic Calculator Guide: Mastering Arithmetic Operations Online',
        description: 'Comprehensive guide to using online calculators for basic math operations and calculations.',
        author: {
          '@type': 'Organization',
          name: 'Calculator Tools',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Calculator Tools',
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={getCategoryUrl('math')} className="text-blue-600 hover:text-blue-800 transition-colors">
              Math & Science
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">Basic Calculator</span>
          </nav>
        </div>
      </div>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Basic Calculator - Free Online Calculator for Math & Arithmetic</h1>

      {/* Calculator Component */}
      <BasicCalculator />

      {/* Educational Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-12">
          {/* What is Basic Calculator */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is a Basic Calculator?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                A <strong>basic calculator</strong> is an essential tool for performing fundamental arithmetic operations including addition, subtraction, multiplication, and division. Our free online calculator provides a simple, intuitive interface that works on any device—computer, tablet, or smartphone—without requiring any downloads or installations.
              </p>
              <p>
                Beyond basic arithmetic, our calculator includes useful features like <strong>percentage calculations</strong>, <strong>square root function</strong>, <strong>memory storage</strong> (M+, M-, MR, MC), and <strong>keyboard support</strong> for faster input. The built-in calculation history keeps track of your last 10 operations, making it easy to review and verify your work.
              </p>
              <p>
                Whether you're a student doing homework, a professional handling finances, or anyone needing quick calculations, our basic calculator offers the perfect balance of simplicity and functionality. The clean, modern design ensures easy readability, while keyboard shortcuts enable power users to work efficiently.
              </p>
            </div>
          </section>

          {/* How to Use */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Calculator</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Input Numbers</h3>
                    <p className="text-sm text-gray-700">Click number buttons (0-9) or use your keyboard to enter numbers. Use the decimal point (.) for fractions.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Select Operation</h3>
                    <p className="text-sm text-gray-700">Choose an operation: + (add), - (subtract), × (multiply), or ÷ (divide).</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Get Results</h3>
                    <p className="text-sm text-gray-700">Press = or Enter to calculate. The result appears instantly in the display.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Use Advanced Features</h3>
                    <p className="text-sm text-gray-700">Try memory functions, percentages, square roots, and check your calculation history.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Calculator Features */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Calculator Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔢 Basic Operations</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Addition (+):</strong> Add two or more numbers together</li>
                  <li>• <strong>Subtraction (-):</strong> Find the difference between numbers</li>
                  <li>• <strong>Multiplication (×):</strong> Multiply numbers quickly</li>
                  <li>• <strong>Division (÷):</strong> Divide with error handling for division by zero</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🧮 Advanced Functions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Percentage (%):</strong> Convert numbers to percentages instantly</li>
                  <li>• <strong>Square Root (√):</strong> Calculate square roots with one click</li>
                  <li>• <strong>Sign Toggle (±):</strong> Switch between positive and negative</li>
                  <li>• <strong>Decimal Support:</strong> Work with fractions and decimals</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💾 Memory Functions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>M+:</strong> Add current value to memory</li>
                  <li>• <strong>M-:</strong> Subtract current value from memory</li>
                  <li>• <strong>MR:</strong> Recall the value stored in memory</li>
                  <li>• <strong>MC:</strong> Clear memory (reset to 0)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">⌨️ User Experience</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Keyboard Support:</strong> Type numbers and operations directly</li>
                  <li>• <strong>Calculation History:</strong> Review your last 10 calculations</li>
                  <li>• <strong>Clear Functions:</strong> C (clear all) and CE (clear entry)</li>
                  <li>• <strong>Responsive Design:</strong> Works on all devices and screen sizes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Calculations */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Calculations & Examples</h2>
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-8 border-2 border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Basic Arithmetic Examples:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="font-mono bg-white p-3 rounded border">25 + 17 = <strong>42</strong></li>
                    <li className="font-mono bg-white p-3 rounded border">100 - 37 = <strong>63</strong></li>
                    <li className="font-mono bg-white p-3 rounded border">8 × 12 = <strong>96</strong></li>
                    <li className="font-mono bg-white p-3 rounded border">144 ÷ 12 = <strong>12</strong></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Advanced Examples:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="font-mono bg-white p-3 rounded border">50% of 200 = 200 × 0.5 = <strong>100</strong></li>
                    <li className="font-mono bg-white p-3 rounded border">√144 = <strong>12</strong></li>
                    <li className="font-mono bg-white p-3 rounded border">-25 (±) = <strong>25</strong></li>
                    <li className="font-mono bg-white p-3 rounded border">3.14 + 2.86 = <strong>6</strong></li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>💡 Tip:</strong> For complex calculations, use memory functions to store intermediate results. For example, to calculate (25 + 30) × (40 - 15), first calculate 25 + 30 = 55, press M+ to store it, then calculate 40 - 15 = 25, and finally press MR × 25 = to get 1375.
                </p>
              </div>
            </div>
          </section>

          {/* External Resources */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">External Resources & Further Learning</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Enhance your math skills and learn more about arithmetic operations with these educational resources:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://www.khanacademy.org/math/arithmetic"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">Khan Academy - Arithmetic</h3>
                <p className="text-sm text-gray-600 mb-2">Free comprehensive lessons on basic math operations, fractions, decimals, and more with practice exercises.</p>
                <span className="text-xs text-blue-600">khanacademy.org →</span>
              </a>

              <a
                href="https://www.mathsisfun.com/calculator-precision.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">Math Is Fun - Calculator Guide</h3>
                <p className="text-sm text-gray-600 mb-2">Learn about calculator precision, order of operations, and advanced calculation techniques.</p>
                <span className="text-xs text-green-600">mathsisfun.com →</span>
              </a>

              <a
                href="https://www.wolframalpha.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">Wolfram Alpha</h3>
                <p className="text-sm text-gray-600 mb-2">Computational knowledge engine for complex mathematical calculations, equations, and data analysis.</p>
                <span className="text-xs text-orange-600">wolframalpha.com →</span>
              </a>

              <a
                href="https://www.purplemath.com/modules/orderops.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">Purple Math - Order of Operations</h3>
                <p className="text-sm text-gray-600 mb-2">Detailed lessons on PEMDAS/BODMAS and proper order of mathematical operations.</p>
                <span className="text-xs text-purple-600">purplemath.com →</span>
              </a>
            </div>
          </section>

          {/* Related Calculators */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/percentage-calculator"
                className="block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">%</div>
                <h3 className="font-bold text-gray-900 mb-2">Percentage Calculator</h3>
                <p className="text-sm text-gray-600">Calculate percentages, discounts, and percentage changes</p>
              </Link>

              <Link
                href="/fraction-calculator"
                className="block p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">⅓</div>
                <h3 className="font-bold text-gray-900 mb-2">Fraction Calculator</h3>
                <p className="text-sm text-gray-600">Add, subtract, multiply, and divide fractions</p>
              </Link>

              <Link
                href="/scientific-calculator"
                className="block p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">🔬</div>
                <h3 className="font-bold text-gray-900 mb-2">Scientific Calculator</h3>
                <p className="text-sm text-gray-600">Advanced functions for scientific and engineering calculations</p>
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How do I use the basic calculator?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Click number buttons (0-9) to input numbers, use operation buttons (+, -, ×, ÷) for calculations, and press = to get the result. You can also use your keyboard for faster input. The calculator supports decimal points, percentages, square roots, and memory functions.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What keyboard shortcuts are available?</h3>
                <p className="text-gray-700 leading-relaxed">
                  You can use number keys (0-9) for digits, +, -, *, / for operations, Enter or = for equals, Esc or C for clear all, Backspace for clear entry, . for decimal point, and % for percentage. This makes calculations faster and more convenient.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What are the memory functions (M+, M-, MR, MC)?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Memory functions let you store and recall values: M+ adds the current value to memory, M- subtracts from memory, MR recalls the stored value, and MC clears memory. This is useful for complex calculations where you need to temporarily store intermediate results.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is the difference between C and CE buttons?</h3>
                <p className="text-gray-700 leading-relaxed">
                  C (Clear) clears everything including the current calculation and stored operation, resetting the calculator completely. CE (Clear Entry) only clears the current number being entered, allowing you to re-enter it without losing your previous calculation.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I see my calculation history?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes! The calculator automatically saves your last 10 calculations in the history panel. Each entry shows the expression (e.g., "5 + 3") and the result. You can clear the history at any time using the "Clear History" button.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Is this calculator accurate for scientific calculations?</h3>
                <p className="text-gray-700 leading-relaxed">
                  This basic calculator is designed for everyday arithmetic and is highly accurate for standard operations. For advanced scientific calculations involving trigonometry, logarithms, or complex mathematical functions, use our Scientific Calculator instead.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

