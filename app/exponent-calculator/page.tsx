import { Metadata } from 'next';
import ExponentCalculator from '@/components/Calculator/ExponentCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Exponent Calculator - Calculate Powers, Growth & Exponential Functions | Free Tool',
  description: 'Free exponent calculator for power calculations, exponential growth/decay, and exponent rules. Calculate x^y, negative exponents, fractional exponents with step-by-step solutions.',
  keywords: [
    'exponent calculator',
    'power calculator',
    'exponential calculator',
    'x to the power of y',
    'calculate exponents',
    'negative exponent calculator',
    'fractional exponent calculator',
    'exponent rules',
    'exponential growth calculator',
    'exponential decay calculator',
    'compound interest calculator',
    'power of calculator',
    'exponentiation calculator',
    'base and exponent calculator',
    'scientific notation exponents',
    'exponent solver',
    'exponent equation calculator',
    'raise to power calculator',
    'exponent laws',
    'exponent properties calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Exponent Calculator - Power & Exponential Growth Calculator',
    description: 'Calculate powers, exponential growth/decay, and apply exponent rules. Free tool with step-by-step solutions.',
    type: 'website',
    url: getUrl('/exponent-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('exponent'),
      width: 1200,
      height: 630,
      alt: 'Exponent Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exponent Calculator - Power & Exponential Growth',
    description: 'Calculate exponents, powers, and exponential growth. Free calculator with step-by-step solutions.',
    images: [getOgImage('exponent')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/exponent-calculator'),
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

export default function ExponentCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/exponent-calculator'),
        name: 'Exponent Calculator',
        url: getUrl('/exponent-calculator'),
        description: 'Free online exponent calculator for power calculations, exponential growth and decay, and applying exponent rules with step-by-step solutions.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate x to the power of y (x^y)',
          'Negative exponent calculations',
          'Fractional exponent (root) calculations',
          'Exponential growth and decay calculator',
          'Compound interest calculations',
          'Exponent rules and properties reference',
          'Step-by-step solution explanations',
          'Scientific notation output',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/exponent-calculator'),
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
            name: 'Exponent Calculator',
            item: getUrl('/exponent-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/exponent-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is an exponent and how do I calculate it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `An exponent represents repeated multiplication of a base number. In x^y, x is the base and y is the exponent (or power). For example, 2^3 means 2 × 2 × 2 = 8. To calculate exponents: for positive integers, multiply the base by itself y times; for negative exponents like 2^(-3), use the reciprocal: 1/2^3 = 1/8 = 0.125; for fractional exponents like 8^(1/3), take the root: ³√8 = 2. For zero exponents, any non-zero number raised to 0 equals 1 (x^0 = 1). Our calculator handles all types of exponents including decimals, negatives, and fractions, showing step-by-step solutions for each calculation.`,
            },
          },
          {
            '@type': 'Question',
            name: 'What are the main exponent rules?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The main exponent rules are: 1) Product Rule: x^a × x^b = x^(a+b) - when multiplying same bases, add exponents. 2) Quotient Rule: x^a ÷ x^b = x^(a-b) - when dividing same bases, subtract exponents. 3) Power Rule: (x^a)^b = x^(a×b) - power of a power means multiply exponents. 4) Zero Exponent: x^0 = 1 - any non-zero number to power 0 equals 1. 5) Negative Exponent: x^(-a) = 1/x^a - negative means reciprocal. 6) Fractional Exponent: x^(1/n) = ⁿ√x - fractional means root. 7) Power of Product: (xy)^a = x^a × y^a. 8) Power of Quotient: (x/y)^a = x^a / y^a. These rules are fundamental in algebra and are displayed with examples in our calculator.`,
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate exponential growth and decay?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Exponential growth and decay follow the formula A = P(1 + r/n)^(nt), where P is the initial value, r is the rate (as a decimal), n is the number of compounding periods per time unit, and t is time. For growth, r is positive (e.g., 5% = 0.05); for decay, r is negative (e.g., -3% = -0.03). Example: $1000 growing at 5% annually for 10 years with annual compounding (n=1): A = 1000(1 + 0.05/1)^(1×10) = 1000(1.05)^10 = $1628.89. For monthly compounding (n=12), use A = 1000(1 + 0.05/12)^(12×10) = $1647.01. Exponential growth is common in population studies, compound interest, and bacterial growth. Decay applies to radioactive decay, depreciation, and cooling.`,
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between exponential and linear growth?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Linear growth increases by a constant amount each period (y = mx + b), while exponential growth increases by a constant percentage (y = a × b^x). For example, adding $100 each year is linear: Year 1: $100, Year 2: $200, Year 3: $300. Growing by 10% each year is exponential: Year 1: $100, Year 2: $110, Year 3: $121. Exponential growth accelerates over time and eventually grows much faster than linear growth. Real-world exponential examples include compound interest, viral spread, and population growth. Linear examples include saving a fixed amount monthly or constant speed travel. Exponential growth shows a characteristic J-curve when graphed, while linear growth shows a straight line.`,
            },
          },
          {
            '@type': 'Question',
            name: 'How do negative and fractional exponents work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Negative exponents indicate reciprocals: x^(-n) = 1/x^n. Example: 5^(-2) = 1/5^2 = 1/25 = 0.04. This makes sense because x^a ÷ x^b = x^(a-b), so x^2 ÷ x^5 = x^(2-5) = x^(-3) = 1/x^3. Fractional exponents indicate roots: x^(1/n) means the nth root of x. Example: 16^(1/2) = √16 = 4, and 8^(1/3) = ³√8 = 2. For x^(m/n), take the nth root then raise to the mth power: 8^(2/3) = (³√8)^2 = 2^2 = 4. This connects exponents and radicals: √x = x^(1/2), ³√x = x^(1/3). Negative fractional exponents combine both: 16^(-1/2) = 1/16^(1/2) = 1/4 = 0.25.`,
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/exponent-calculator'),
        name: 'How to Calculate Exponents and Powers',
        description: 'Step-by-step guide to calculating exponents, exponential growth, and applying exponent rules',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Calculator Type',
            text: 'Select the Power tab for basic exponent calculations, Rules tab to view exponent properties, or Growth/Decay tab for exponential change calculations.',
            url: getStepUrl('/exponent-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Base and Exponent',
            text: 'For power calculations, enter the base (x) and exponent (y) values. The base can be any real number, and the exponent can be positive, negative, or fractional.',
            url: getStepUrl('/exponent-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Calculate Result',
            text: 'Click the Calculate button to compute x^y. The calculator will show the result in standard notation, scientific notation, and provide step-by-step explanation based on the type of exponent used.',
            url: getStepUrl('/exponent-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'For Growth/Decay Calculations',
            text: 'In the Growth/Decay tab, enter initial value, growth/decay rate (%), time period, and compounding frequency. The calculator applies the compound interest formula to show final amount and total change.',
            url: getStepUrl('/exponent-calculator', 4),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/exponent-calculator'),
        headline: 'Complete Guide to Exponents and Exponential Functions',
        description: 'Learn how to calculate exponents, apply exponent rules, and understand exponential growth and decay',
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

      <h1 className="sr-only">Exponent Calculator - Calculate Powers, Exponential Growth & Exponent Rules</h1>

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
                Exponent Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <ExponentCalculator />

        <div className="max-w-4xl mx-auto space-y-8 text-gray-700 mt-12">
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Exponents</h2>
            <div className="space-y-4">
              <p>
                An <strong>exponent</strong> (also called a power or index) indicates how many times a number (the base) is multiplied by itself. In the expression <strong>x^y</strong>, x is the base and y is the exponent.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold text-blue-900 mb-2">Basic Examples:</p>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>2^3</strong> = 2 × 2 × 2 = 8</li>
                  <li>• <strong>5^2</strong> = 5 × 5 = 25</li>
                  <li>• <strong>10^4</strong> = 10 × 10 × 10 × 10 = 10,000</li>
                  <li>• <strong>3^1</strong> = 3 (any number to power 1 is itself)</li>
                  <li>• <strong>7^0</strong> = 1 (any non-zero number to power 0 is 1)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Exponents</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Positive Integer Exponents</h3>
                <p className="text-sm">Represent repeated multiplication.</p>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                  4^3 = 4 × 4 × 4 = 64
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Negative Exponents</h3>
                <p className="text-sm">Represent reciprocals (1 divided by the positive power).</p>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                  2^(-3) = 1/2^3 = 1/8 = 0.125
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Fractional Exponents</h3>
                <p className="text-sm">Represent roots (1/n means nth root).</p>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                  16^(1/2) = √16 = 4<br />
                  8^(1/3) = ³√8 = 2
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Zero Exponent</h3>
                <p className="text-sm">Any non-zero number to power 0 equals 1.</p>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                  999^0 = 1<br />
                  (-5)^0 = 1
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exponent Rules Explained</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Rule</h3>
                <p className="text-sm mb-2">When multiplying powers with the same base, add the exponents:</p>
                <p className="font-mono text-sm bg-purple-50 p-3 rounded">
                  x^a × x^b = x^(a+b)<br />
                  Example: 3^2 × 3^4 = 3^(2+4) = 3^6 = 729
                </p>
              </div>

              <div className="border-l-4 border-pink-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quotient Rule</h3>
                <p className="text-sm mb-2">When dividing powers with the same base, subtract the exponents:</p>
                <p className="font-mono text-sm bg-pink-50 p-3 rounded">
                  x^a ÷ x^b = x^(a-b)<br />
                  Example: 5^7 ÷ 5^3 = 5^(7-3) = 5^4 = 625
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Power Rule</h3>
                <p className="text-sm mb-2">When raising a power to another power, multiply the exponents:</p>
                <p className="font-mono text-sm bg-blue-50 p-3 rounded">
                  (x^a)^b = x^(a×b)<br />
                  Example: (2^3)^2 = 2^(3×2) = 2^6 = 64
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Power of a Product</h3>
                <p className="text-sm mb-2">Distribute the exponent to each factor in the product:</p>
                <p className="font-mono text-sm bg-green-50 p-3 rounded">
                  (xy)^a = x^a × y^a<br />
                  Example: (2 × 3)^2 = 2^2 × 3^2 = 4 × 9 = 36
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exponential Growth and Decay</h2>
            <div className="space-y-4">
              <p>
                <strong>Exponential growth</strong> occurs when a quantity increases by a constant percentage over equal time periods. <strong>Exponential decay</strong> is the opposite - decreasing by a constant percentage.
              </p>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">The Compound Interest Formula:</h3>
                <p className="font-mono text-lg mb-2">A = P(1 + r/n)^(nt)</p>
                <ul className="text-sm space-y-1">
                  <li>• <strong>A</strong> = Final amount</li>
                  <li>• <strong>P</strong> = Initial principal (starting value)</li>
                  <li>• <strong>r</strong> = Annual interest rate (as a decimal)</li>
                  <li>• <strong>n</strong> = Number of times compounded per year</li>
                  <li>• <strong>t</strong> = Time in years</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Growth Example</h4>
                  <p className="text-sm mb-2">$1000 at 5% annual interest for 10 years:</p>
                  <p className="font-mono text-xs">
                    A = 1000(1 + 0.05/1)^(1×10)<br />
                    A = 1000(1.05)^10<br />
                    A = $1,628.89
                  </p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-2">Decay Example</h4>
                  <p className="text-sm mb-2">$1000 depreciating 5% annually for 10 years:</p>
                  <p className="font-mono text-xs">
                    A = 1000(1 - 0.05/1)^(1×10)<br />
                    A = 1000(0.95)^10<br />
                    A = $598.74
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Applications</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">💰 Finance</h3>
                <ul className="text-sm space-y-1">
                  <li>• Compound interest</li>
                  <li>• Investment growth</li>
                  <li>• Loan calculations</li>
                  <li>• Retirement planning</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">🔬 Science</h3>
                <ul className="text-sm space-y-1">
                  <li>• Bacterial growth</li>
                  <li>• Radioactive decay</li>
                  <li>• Population dynamics</li>
                  <li>• Chemical reactions</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">💻 Technology</h3>
                <ul className="text-sm space-y-1">
                  <li>• Computer algorithms</li>
                  <li>• Data compression</li>
                  <li>• Viral marketing</li>
                  <li>• Network effects</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link 
                href="/scientific-notation-calculator"
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">🔬</div>
                <h3 className="font-semibold text-gray-900 mb-1">Scientific Notation</h3>
                <p className="text-sm text-gray-600">Convert & calculate with E notation</p>
              </Link>
              <Link 
                href="/square-root-calculator"
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">√</div>
                <h3 className="font-semibold text-gray-900 mb-1">Square Root</h3>
                <p className="text-sm text-gray-600">Calculate roots and powers</p>
              </Link>
              <Link 
                href="/percentage-calculator"
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">%</div>
                <h3 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h3>
                <p className="text-sm text-gray-600">Calculate percentages</p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

