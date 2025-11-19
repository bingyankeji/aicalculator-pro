import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import RoundingCalculator from '@/components/Calculator/RoundingCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rounding Calculator - Round, Ceiling, Floor, Truncate Numbers | Free Tool',
  description: 'Free rounding calculator with multiple methods: standard round, ceiling, floor, truncate, banker\'s rounding, and significant figures. Round numbers to any decimal place with detailed explanations.',
  keywords: [
    'rounding calculator',
    'round numbers',
    'round to decimal places',
    'ceiling calculator',
    'floor calculator',
    'truncate calculator',
    'bankers rounding',
    'round half up',
    'round half to even',
    'significant figures calculator',
    'round decimals',
    'rounding methods',
    'round to nearest',
    'decimal rounding',
    'number rounding tool',
    'round to whole number',
    'round up calculator',
    'round down calculator',
    'batch rounding',
    'financial rounding',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Rounding Calculator - Multiple Rounding Methods',
    description: 'Free rounding calculator with 6 methods: round, ceiling, floor, truncate, banker\'s rounding, and significant figures.',
    type: 'website',
    url: getUrl('/rounding-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('rounding'),
      width: 1200,
      height: 630,
      alt: 'Rounding Calculator - Round Numbers'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rounding Calculator - Multiple Rounding Methods',
    description: 'Free calculator with 6 rounding methods. Round to any decimal place instantly.',
    images: [getOgImage('rounding')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/rounding-calculator'),
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

export default function RoundingCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/rounding-calculator'),
        name: 'Rounding Calculator',
        url: getUrl('/rounding-calculator'),
        description: 'Free online rounding calculator with multiple methods including standard round, ceiling, floor, truncate, banker\'s rounding, and significant figures. Round numbers to any decimal place with detailed explanations.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Standard rounding (half up)',
          'Ceiling (always round up)',
          'Floor (always round down)',
          'Truncate (remove decimals)',
          'Banker\'s rounding (round half to even)',
          'Significant figures rounding',
          'Batch number rounding',
          'Copy results to clipboard',
          'Detailed explanations',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/rounding-calculator'),
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
            name: 'Rounding Calculator',
            item: getUrl('/rounding-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/rounding-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is rounding and why is it important?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Rounding is the process of approximating a number to a specified level of precision by removing or simplifying digits. It\'s important in everyday life and professional fields for: making numbers easier to work with (e.g., $19.99 ≈ $20), representing measurements with appropriate precision, reducing calculation errors in long computations, presenting data in a readable format, and complying with financial and accounting standards. For example, when dealing with money, we round to 2 decimal places ($45.678 → $45.68). In science, we use significant figures to reflect measurement precision.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between standard rounding and banker\'s rounding?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Standard rounding (half up) always rounds 0.5 up to the next number: 2.5 → 3, 3.5 → 4. Banker\'s rounding (round half to even) rounds 0.5 to the nearest even number: 2.5 → 2, 3.5 → 4. Banker\'s rounding is preferred in financial calculations because it reduces cumulative bias. When you round many numbers with standard rounding, you tend to round up more often, creating an upward bias. Banker\'s rounding eliminates this bias by rounding up and down equally often (50% each way), which is especially important in large financial datasets.',
            },
          },
          {
            '@type': 'Question',
            name: 'When should I use ceiling vs floor rounding?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ceiling (round up) is used when you need to ensure a minimum requirement: calculating how many boxes needed for items (17.2 items → 18 boxes), estimating time for tasks (3.1 hours → 4 hours), pricing where fractions round up ($10.01 → $11). Floor (round down) is used when you need to stay within a maximum: calculating complete units produced (17.9 products → 17 complete products), age calculations (someone who is 25.9 years old is 25), discounts where fractions are removed (15.9% discount → 15%). The key difference: ceiling ensures you have enough, floor ensures you don\'t exceed limits.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are significant figures and how do I round to them?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Significant figures (sig figs) are the meaningful digits in a number that reflect measurement precision. To identify sig figs: all non-zero digits count (123 has 3 sig figs), zeros between non-zero digits count (1003 has 4 sig figs), leading zeros don\'t count (0.0025 has 2 sig figs), trailing zeros after a decimal count (2.500 has 4 sig figs). To round to 3 sig figs: 12345 → 12300, 0.0012345 → 0.00123, 1.2345 → 1.23. Sig figs are crucial in science because they indicate measurement accuracy. Using too many sig figs implies false precision; using too few loses important information.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does truncation differ from rounding?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Truncation (chopping) simply removes digits without considering their values, while rounding considers the value of removed digits. Examples: truncating 3.7 to 0 decimals gives 3 (remove .7), but rounding gives 4 (because .7 ≥ .5). Truncating 3.14159 to 2 decimals gives 3.14 (remove everything after), but rounding gives 3.14 (because next digit 1 < 5). Truncation is faster computationally and useful in programming (especially for integers), financial systems where fractional cents are dropped, and digital signal processing. However, truncation always biases downward for positive numbers, which can accumulate errors in calculations.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/rounding-calculator'),
        name: 'How to Round Numbers Using Different Methods',
        description: 'Step-by-step guide to rounding numbers using various rounding methods',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Your Number',
            text: 'Type the number you want to round in the input field. You can enter any positive or negative decimal number.',
            url: getStepUrl('/rounding-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Choose Rounding Method',
            text: 'Select your preferred rounding method: Standard Round (most common), Ceiling (always up), Floor (always down), Truncate (remove decimals), Banker\'s Round (financial), or Significant Figures (scientific).',
            url: getStepUrl('/rounding-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Set Precision',
            text: 'For most methods, specify the number of decimal places (0-10). For Significant Figures method, specify how many significant digits to keep (1-15).',
            url: getStepUrl('/rounding-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'View Results',
            text: 'Click "Round Number" to see your result. The calculator displays the original number, rounded result, method used, and a detailed explanation of how the rounding was performed.',
            url: getStepUrl('/rounding-calculator', 4),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/rounding-calculator'),
        headline: 'Complete Guide to Number Rounding Methods and Applications',
        description: 'Learn about different rounding methods, when to use each, and how to round numbers correctly',
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
      <h1 className="sr-only">Rounding Calculator - Round, Ceiling, Floor, Truncate Numbers with Multiple Methods</h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Rounding Calculator"
        calculatorUrl="/rounding-calculator"
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Calculator Component */}
        <RoundingCalculator />

        {/* Educational Content */}
        <div className="max-w-4xl mx-auto space-y-8 text-gray-700">
          {/* Understanding Rounding */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Different Rounding Methods</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">1. Standard Rounding (Half Up)</h4>
                <p className="mb-2">
                  The most common method. If the digit after the rounding position is 5 or greater, round up; otherwise, round down.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg font-mono text-sm">
                  <p><strong>Examples:</strong></p>
                  <p>3.14 → 3.1 (1 decimal place)</p>
                  <p>3.15 → 3.2 (1 decimal place)</p>
                  <p>2.449 → 2.45 (2 decimal places)</p>
                  <p>7.5 → 8 (0 decimal places)</p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">2. Ceiling (Round Up)</h4>
                <p className="mb-2">
                  Always rounds toward positive infinity. The result is never less than the original number.
                </p>
                <div className="bg-green-50 p-4 rounded-lg font-mono text-sm">
                  <p><strong>Examples:</strong></p>
                  <p>3.14 → 3.2 (1 decimal place)</p>
                  <p>3.01 → 3.1 (1 decimal place)</p>
                  <p>7.001 → 8 (0 decimal places)</p>
                  <p>Use case: Calculate minimum packages needed</p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">3. Floor (Round Down)</h4>
                <p className="mb-2">
                  Always rounds toward negative infinity. The result is never greater than the original number.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg font-mono text-sm">
                  <p><strong>Examples:</strong></p>
                  <p>3.99 → 3.9 (1 decimal place)</p>
                  <p>3.14 → 3.1 (1 decimal place)</p>
                  <p>7.999 → 7 (0 decimal places)</p>
                  <p>Use case: Calculate complete units produced</p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">4. Truncate (Chop)</h4>
                <p className="mb-2">
                  Simply removes digits after the specified position without any rounding logic.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg font-mono text-sm">
                  <p><strong>Examples:</strong></p>
                  <p>3.999 → 3.99 (2 decimal places)</p>
                  <p>3.14159 → 3.14 (2 decimal places)</p>
                  <p>7.999 → 7 (0 decimal places)</p>
                  <p>Use case: Remove fractional cents in billing</p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">5. Banker's Rounding (Round Half to Even)</h4>
                <p className="mb-2">
                  When the digit is exactly 5, rounds to the nearest even number. Reduces cumulative bias in large datasets.
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg font-mono text-sm">
                  <p><strong>Examples:</strong></p>
                  <p>2.5 → 2 (rounds to even)</p>
                  <p>3.5 → 4 (rounds to even)</p>
                  <p>4.5 → 4 (rounds to even)</p>
                  <p>Use case: Financial calculations, statistical analysis</p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">6. Significant Figures</h4>
                <p className="mb-2">
                  Rounds to a specified number of significant (meaningful) digits, regardless of decimal position.
                </p>
                <div className="bg-pink-50 p-4 rounded-lg font-mono text-sm">
                  <p><strong>Examples (3 sig figs):</strong></p>
                  <p>1234 → 1230</p>
                  <p>0.001234 → 0.00123</p>
                  <p>123.456 → 123</p>
                  <p>Use case: Scientific measurements, engineering</p>
                </div>
              </div>
            </div>
          </section>

          {/* When to Use Each Method */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">When to Use Each Rounding Method</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-2">💰 Finance & Business</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Banker's Rounding:</strong> Large transaction volumes</li>
                  <li>• <strong>Standard Round:</strong> Currency display ($19.99 → $20)</li>
                  <li>• <strong>Truncate:</strong> Remove fractional cents</li>
                  <li>• <strong>Ceiling:</strong> Minimum order quantities</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">🔬 Science & Engineering</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Significant Figures:</strong> Measurement precision</li>
                  <li>• <strong>Standard Round:</strong> General calculations</li>
                  <li>• <strong>Truncate:</strong> Digital signal processing</li>
                  <li>• <strong>Floor/Ceiling:</strong> Discrete quantities</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-700 mb-2">📊 Statistics & Data</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Banker's Rounding:</strong> Reduce cumulative error</li>
                  <li>• <strong>Standard Round:</strong> Data presentation</li>
                  <li>• <strong>Significant Figures:</strong> Survey data</li>
                  <li>• <strong>Floor:</strong> Histogram bins</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-700 mb-2">💻 Programming</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Truncate:</strong> Integer conversion</li>
                  <li>• <strong>Floor/Ceiling:</strong> Array indexing</li>
                  <li>• <strong>Standard Round:</strong> Display values</li>
                  <li>• <strong>Banker's Rounding:</strong> Financial APIs</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Rounding Mistakes to Avoid</h3>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="font-semibold text-red-900 mb-1">❌ Mistake #1: Rounding Multiple Times</p>
                <p className="text-red-800 text-sm">
                  <strong>Wrong:</strong> 3.14159 → 3.142 → 3.14<br />
                  <strong>Right:</strong> 3.14159 → 3.14 directly<br />
                  Multiple rounds accumulate errors. Always round once from the original number.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="font-semibold text-red-900 mb-1">❌ Mistake #2: Using Wrong Method</p>
                <p className="text-red-800 text-sm">
                  <strong>Wrong:</strong> Using standard rounding for large financial datasets<br />
                  <strong>Right:</strong> Use banker's rounding to prevent bias<br />
                  Standard rounding creates upward bias when processing millions of values.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="font-semibold text-red-900 mb-1">❌ Mistake #3: Too Many Significant Figures</p>
                <p className="text-red-800 text-sm">
                  <strong>Wrong:</strong> Measuring with a ruler (±1mm) → 15.73482 cm<br />
                  <strong>Right:</strong> Measuring with a ruler → 15.7 cm<br />
                  Don't imply false precision. Use sig figs that match your measurement tool.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="font-semibold text-red-900 mb-1">❌ Mistake #4: Confusing Floor and Truncate</p>
                <p className="text-red-800 text-sm">
                  For negative numbers, they differ:<br />
                  <strong>Floor:</strong> -3.7 → -4 (toward negative infinity)<br />
                  <strong>Truncate:</strong> -3.7 → -3 (toward zero)<br />
                  Know which one your application needs!
                </p>
              </div>
            </div>
          </section>

          {/* Batch Rounding Tips */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tips for Batch Rounding</h3>
            <div className="space-y-4">
              <p>
                Our calculator supports batch rounding of multiple numbers at once. Here are some tips:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>Separate numbers with commas, semicolons, or new lines</li>
                <li>Mix of positive and negative numbers is supported</li>
                <li>Invalid numbers are automatically skipped</li>
                <li>Use "Copy All Results" to get all rounded values at once</li>
                <li>Great for processing data from spreadsheets or lists</li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-2">Example Input:</p>
                <pre className="text-xs bg-white p-3 rounded border border-blue-200">
3.14159{'\n'}2.71828{'\n'}1.41421{'\n'}0.57721
                </pre>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Related Calculators</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link 
                href="/percentage-calculator"
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h4>
                <p className="text-sm text-gray-600">Calculate percentages easily</p>
              </Link>
              <Link 
                href="/scientific-calculator"
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">🔬</div>
                <h4 className="font-semibold text-gray-900 mb-1">Scientific Calculator</h4>
                <p className="text-sm text-gray-600">Advanced math operations</p>
              </Link>
              <Link 
                href="/standard-deviation-calculator"
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">📈</div>
                <h4 className="font-semibold text-gray-900 mb-1">Standard Deviation</h4>
                <p className="text-sm text-gray-600">Statistical calculations</p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

