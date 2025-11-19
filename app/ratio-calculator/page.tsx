import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import RatioCalculatorNew from '@/components/Calculator/RatioCalculatorNew';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId } from '@/config/site';
import Link from 'next/link';

const calculatorName = 'Ratio Calculator';
const calculatorDesc = 'Free online ratio calculator to simplify ratios, scale proportions, solve equations, and calculate golden ratio. Perfect for math, cooking, design, and architecture.';

export const metadata: Metadata = {
  title: `${calculatorName} - Simplify, Scale & Solve Ratios | Free Tool`,
  description: calculatorDesc,
  keywords: [
    'ratio calculator',
    'proportion calculator',
    'simplify ratio',
    'scale ratio',
    'golden ratio calculator',
    'aspect ratio calculator',
    'ratio solver',
    'ratio to percentage',
    'cooking ratio calculator',
    'recipe scaling',
    'screen aspect ratio',
    'image scaling',
    'design ratio',
    'architecture ratio',
    'math ratio calculator',
    'ratio converter',
    'ratio simplifier',
    'proportion solver',
    '3:2 ratio',
    '16:9 calculator',
  ],
  authors: [{ name: 'AI Calculator' }],
  creator: 'AI Calculator',
  publisher: 'AI Calculator',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: getUrl('/ratio-calculator'),
  },
  openGraph: {
    title: `${calculatorName} - Simplify, Scale & Solve Ratios`,
    description: calculatorDesc,
    url: getUrl('/ratio-calculator'),
    siteName: 'AI Calculator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: getOgImage(),
        width: 1200,
        height: 630,
        alt: calculatorName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${calculatorName} - Simplify, Scale & Solve Ratios`,
    description: calculatorDesc,
    images: [getOgImage()],
  },
};

export default function RatioCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/ratio-calculator'),
        name: calculatorName,
        url: getUrl('/ratio-calculator'),
        description: calculatorDesc,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Simplify ratios to lowest terms',
          'Scale ratios up or down',
          'Solve proportions (a:b = c:x)',
          'Golden ratio calculator (φ)',
          'Convert ratios to percentages',
          'Ratio visualization',
          'Save results as image',
          'Print results',
          'Share calculations',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/ratio-calculator'),
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
            name: 'Math Calculators',
            item: getUrl('/#math'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: calculatorName,
            item: getUrl('/ratio-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/ratio-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a ratio and how do you simplify it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A ratio is a comparison between two numbers, written as a:b. To simplify a ratio, divide both numbers by their greatest common divisor (GCD). For example, 12:8 simplifies to 3:2 because both numbers can be divided by 4. Simplified ratios make comparisons easier and are essential in cooking, design, and mathematics.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you solve proportions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To solve a proportion a:b = c:x, use cross-multiplication: x = (b × c) / a. For example, if 3:4 = 6:x, then x = (4 × 6) / 3 = 8. This method is useful for scaling recipes, converting units, and solving mathematical word problems.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the golden ratio and why is it important?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The golden ratio (φ) is approximately 1.618:1, a mathematical constant found throughout nature, art, and architecture. It creates aesthetically pleasing proportions and appears in the Fibonacci sequence, seashells, flower petals, and classic architecture like the Parthenon. Designers use it to create harmonious compositions.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I convert a ratio to a percentage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To convert a ratio to percentages: 1) Add both parts of the ratio, 2) Divide each part by the total, 3) Multiply by 100. For example, 3:2 → Total = 5 → First part: (3/5) × 100 = 60%, Second part: (2/5) × 100 = 40%. This is useful for understanding proportional distributions.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do aspect ratios work for screens and images?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Aspect ratio is the width-to-height ratio of screens or images. Common ratios include 16:9 (widescreen HD), 4:3 (standard TV), 21:9 (ultrawide), and 1:1 (square for Instagram). For example, a 1920×1080 screen has a 16:9 aspect ratio (1920÷1080 = 16÷9). Maintaining aspect ratios prevents image distortion.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I use ratios for recipe scaling?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Ratios are perfect for scaling recipes. If a recipe serves 4 people and uses 2 cups flour to 1 cup sugar (2:1 ratio), to serve 8 people, multiply both by 2: 4 cups flour to 2 cups sugar. Our calculator helps maintain proper ingredient proportions when adjusting serving sizes.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/#math" className="text-blue-600 hover:text-blue-800 hover:underline">
                Math Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 font-medium">{calculatorName}</span>
            </nav>
          </div>
        </div>

        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">{calculatorName}</h1>

        {/* Calculator Component */}
        <div className="py-8">
          <RatioCalculatorNew />
        </div>

        {/* Educational Content */}
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
          {/* What is a Ratio */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Ratios and Proportions</h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">What is a Ratio?</h3>
                <p>
                  A <strong>ratio</strong> compares two quantities by division, showing their relative sizes. Written as <strong>a:b</strong> (read as "a to b"), 
                  ratios express relationships like ingredient proportions, screen dimensions, or mixing instructions. For example, a 3:2 ratio means for every 3 units 
                  of the first quantity, there are 2 units of the second.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h4 className="text-xl font-semibold text-blue-900 mb-3">Key Ratio Concepts</h4>
                <ul className="space-y-2 text-blue-900">
                  <li><strong>Simplification:</strong> Reducing a ratio to its lowest terms (12:8 → 3:2)</li>
                  <li><strong>Equivalent Ratios:</strong> Different ratios representing the same relationship (1:2 = 2:4 = 3:6)</li>
                  <li><strong>Part-to-Part:</strong> Comparing two separate parts (boys:girls = 3:2)</li>
                  <li><strong>Part-to-Whole:</strong> Comparing one part to the total (boys:total = 3:5)</li>
                  <li><strong>Proportions:</strong> Two equal ratios forming an equation (a:b = c:d)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use This Ratio Calculator</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="text-3xl mb-3">📐</div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Simplify Ratios</h3>
                <p className="text-blue-800 mb-4">
                  Reduce any ratio to its simplest form by finding the greatest common divisor (GCD).
                </p>
                <div className="bg-white rounded-lg p-4 text-sm text-gray-800">
                  <strong>Example:</strong> 24:18 → 4:3
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-xl font-semibold text-green-900 mb-3">Scale Ratios</h3>
                <p className="text-green-800 mb-4">
                  Multiply or divide both parts of a ratio by the same factor to scale up or down.
                </p>
                <div className="bg-white rounded-lg p-4 text-sm text-gray-800">
                  <strong>Example:</strong> 3:2 × 4 = 12:8
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="text-xl font-semibold text-orange-900 mb-3">Solve Proportions</h3>
                <p className="text-orange-800 mb-4">
                  Find the missing value in a proportion using cross-multiplication.
                </p>
                <div className="bg-white rounded-lg p-4 text-sm text-gray-800">
                  <strong>Example:</strong> 3:4 = 9:x → x = 12
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                <div className="text-3xl mb-3">φ</div>
                <h3 className="text-xl font-semibold text-yellow-900 mb-3">Golden Ratio</h3>
                <p className="text-yellow-800 mb-4">
                  Calculate dimensions using the golden ratio (1.618:1) for harmonious proportions.
                </p>
                <div className="bg-white rounded-lg p-4 text-sm text-gray-800">
                  <strong>Example:</strong> Width 1000px → Height 618px
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Applications */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Applications</h2>
            
            <div className="space-y-6 text-gray-700">
              <div className="border-l-4 border-purple-500 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🍳 Cooking & Baking</h3>
                <p>
                  Scale recipes while maintaining proper ingredient ratios. A bread recipe with a 5:3 flour-to-water ratio will have the same 
                  texture whether you use 500g:300g or 1000g:600g. Perfect for adjusting serving sizes or converting between metric and imperial units.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🎨 Art & Design</h3>
                <p>
                  The golden ratio (φ ≈ 1.618) creates visually appealing compositions. Used by artists from Da Vinci to modern graphic designers, 
                  it's found in logo design, page layouts, and photography. Apply it to determine canvas sizes, crop photos, or design UI elements.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🖥️ Screen & Image Ratios</h3>
                <p>
                  Common aspect ratios include 16:9 (HD/4K), 4:3 (classic TV), 21:9 (ultrawide), and 1:1 (Instagram). Understanding these helps 
                  resize images without distortion, choose the right monitor, or export videos for different platforms. A 1920×1080 image is 16:9.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🏗️ Architecture & Engineering</h3>
                <p>
                  Blueprint scales use ratios like 1:100 (1cm on paper = 100cm in reality). Mixing concrete requires precise ratios 
                  (e.g., 1:2:3 for cement:sand:aggregate). Engineers use gear ratios to calculate mechanical advantage and speed reductions.
                </p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">💰 Finance & Business</h3>
                <p>
                  Financial ratios analyze business health: debt-to-equity ratios assess leverage, price-to-earnings ratios value stocks, 
                  and profit margins compare revenue to costs. Investment portfolios use asset allocation ratios (e.g., 60:40 stocks-to-bonds).
                </p>
              </div>

              <div className="border-l-4 border-teal-500 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🧪 Science & Medicine</h3>
                <p>
                  Dilution ratios prepare chemical solutions (1:10 means 1 part solute to 10 parts solvent). Medical dosages use 
                  body-weight ratios. Laboratory experiments require precise ingredient ratios for reproducible results.
                </p>
              </div>
            </div>
          </section>

          {/* Common Ratios Reference */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Ratios Reference Guide</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Screen Aspect Ratios</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>16:9</strong> — HD, Full HD, 4K, 8K</li>
                  <li><strong>16:10</strong> — Professional monitors</li>
                  <li><strong>21:9</strong> — Ultrawide monitors</li>
                  <li><strong>4:3</strong> — Classic TV, old monitors</li>
                  <li><strong>1:1</strong> — Square (Instagram posts)</li>
                  <li><strong>9:16</strong> — Vertical video (TikTok)</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Photography Ratios</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>3:2</strong> — DSLR standard (e.g., 6000×4000)</li>
                  <li><strong>4:3</strong> — Micro Four Thirds</li>
                  <li><strong>1:1</strong> — Square format</li>
                  <li><strong>5:4</strong> — Large format</li>
                  <li><strong>8:10</strong> — Portrait prints</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Paper Sizes (ISO 216)</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>√2:1</strong> — A-series (A4, A3, etc.)</li>
                  <li><strong>1:1.414</strong> — Same ratio when folded</li>
                  <li><strong>8.5:11</strong> — US Letter</li>
                  <li><strong>11:17</strong> — Tabloid</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-900 mb-3">Golden Ratio Applications</h3>
                <ul className="space-y-2 text-yellow-800 text-sm">
                  <li><strong>1.618:1</strong> — Classic golden ratio</li>
                  <li>Parthenon facade proportions</li>
                  <li>Mona Lisa composition</li>
                  <li>Apple logo design</li>
                  <li>Credit card dimensions</li>
                  <li>Book page layouts</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cooking Ratios</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>2:1</strong> — Rice to water</li>
                  <li><strong>3:2:1</strong> — Vinaigrette (oil:vinegar:other)</li>
                  <li><strong>5:3</strong> — Bread (flour:water)</li>
                  <li><strong>1:1:1</strong> — Pound cake</li>
                  <li><strong>3:2:1</strong> — Concrete mix</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Map & Model Scales</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>1:24,000</strong> — USGS topo maps</li>
                  <li><strong>1:50,000</strong> — Hiking maps</li>
                  <li><strong>1:100</strong> — Architectural plans</li>
                  <li><strong>1:12</strong> — Dollhouse scale</li>
                  <li><strong>1:64</strong> — Matchbox cars</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What is a ratio and how do you simplify it?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A ratio is a comparison between two numbers, written as a:b. To simplify a ratio, divide both numbers by their 
                  greatest common divisor (GCD). For example, 12:8 simplifies to 3:2 because both numbers can be divided by 4. 
                  Simplified ratios make comparisons easier and are essential in cooking, design, and mathematics.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How do you solve proportions?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To solve a proportion a:b = c:x, use cross-multiplication: x = (b × c) / a. For example, if 3:4 = 6:x, 
                  then x = (4 × 6) / 3 = 8. This method is useful for scaling recipes, converting units, and solving 
                  mathematical word problems.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What is the golden ratio and why is it important?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The golden ratio (φ) is approximately 1.618:1, a mathematical constant found throughout nature, art, and 
                  architecture. It creates aesthetically pleasing proportions and appears in the Fibonacci sequence, seashells, 
                  flower petals, and classic architecture like the Parthenon. Designers use it to create harmonious compositions.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How do I convert a ratio to a percentage?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To convert a ratio to percentages: 1) Add both parts of the ratio, 2) Divide each part by the total, 
                  3) Multiply by 100. For example, 3:2 → Total = 5 → First part: (3/5) × 100 = 60%, Second part: (2/5) × 100 = 40%. 
                  This is useful for understanding proportional distributions.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How do aspect ratios work for screens and images?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Aspect ratio is the width-to-height ratio of screens or images. Common ratios include 16:9 (widescreen HD), 
                  4:3 (standard TV), 21:9 (ultrawide), and 1:1 (square for Instagram). For example, a 1920×1080 screen has a 16:9 
                  aspect ratio (1920÷1080 = 16÷9). Maintaining aspect ratios prevents image distortion.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Can I use ratios for recipe scaling?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes! Ratios are perfect for scaling recipes. If a recipe serves 4 people and uses 2 cups flour to 1 cup sugar 
                  (2:1 ratio), to serve 8 people, multiply both by 2: 4 cups flour to 2 cups sugar. Our calculator helps maintain 
                  proper ingredient proportions when adjusting serving sizes.
                </p>
              </div>
            </div>
          </section>

          {/* External Resources */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">External Resources & Further Reading</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Educational Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-ratio-proportion"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Khan Academy - Ratios and Proportions
                    </a>
                    <p className="text-sm text-gray-600 ml-7 mt-1">Free video lessons and practice problems on ratios</p>
                  </li>
                  <li>
                    <a
                      href="https://www.mathsisfun.com/numbers/ratio.html"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Math Is Fun - Understanding Ratios
                    </a>
                    <p className="text-sm text-gray-600 ml-7 mt-1">Clear explanations with visual examples</p>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Design & Golden Ratio</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://www.canva.com/learn/what-is-the-golden-ratio/"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Canva - Golden Ratio in Design
                    </a>
                    <p className="text-sm text-gray-600 ml-7 mt-1">Practical guide for designers</p>
                  </li>
                  <li>
                    <a
                      href="https://en.wikipedia.org/wiki/Golden_ratio"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Wikipedia - Golden Ratio
                    </a>
                    <p className="text-sm text-gray-600 ml-7 mt-1">Comprehensive mathematical and historical reference</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-blue-300">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> These external links are provided for educational purposes. We are not affiliated with these organizations.
              </p>
            </div>
          </section>

          {/* Related Calculators */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/percentage-calculator"
                className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-3xl mb-2">📊</div>
                <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                  Percentage Calculator
                </div>
              </Link>
              
              <Link
                href="/fraction-calculator"
                className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-3xl mb-2">➗</div>
                <div className="font-semibold text-gray-900 group-hover:text-green-600">
                  Fraction Calculator
                </div>
              </Link>
              
              <Link
                href="/basic-calculator"
                className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-3xl mb-2">🔢</div>
                <div className="font-semibold text-gray-900 group-hover:text-purple-600">
                  Basic Calculator
                </div>
              </Link>
              
              <Link
                href="/pythagorean-calculator"
                className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-3xl mb-2">△</div>
                <div className="font-semibold text-gray-900 group-hover:text-orange-600">
                  Pythagorean Calculator
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
