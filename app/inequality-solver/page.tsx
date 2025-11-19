import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import InequalitySolver from '@/components/Calculator/InequalitySolver';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Inequality Solver - Solve Linear & Quadratic Inequalities | AICalculator',
  description: 'Free inequality solver for linear, quadratic, and absolute value inequalities. Visual number line representation with step-by-step solutions.',
  keywords: [
    'inequality solver',
    'solve inequalities',
    'linear inequality calculator',
    'quadratic inequality solver',
    'absolute value inequality',
    'inequality calculator',
    'number line solver',
    'interval notation',
    'inequality graphing',
    'solve inequalities online',
    'inequality solutions',
    'math inequality solver',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Inequality Solver - Visual Number Line Solutions',
    description: 'Solve linear, quadratic, and absolute value inequalities with visual number line representation and interval notation.',
    type: 'website',
    url: getUrl('/inequality-solver'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('inequality'),
      width: 1200,
      height: 630,
      alt: 'Inequality Solver',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inequality Solver',
    description: 'Solve inequalities with visual solutions',
    images: [getOgImage('inequality')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/inequality-solver'),
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

export default function InequalitySolverPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/inequality-solver'),
        name: 'Inequality Solver',
        url: getUrl('/inequality-solver'),
        description: 'Solve linear, quadratic, and absolute value inequalities with visual number line and interval notation.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Solve linear inequalities',
          'Solve quadratic inequalities',
          'Solve absolute value inequalities',
          'Visual number line representation',
          'Interval notation',
          'Step-by-step solutions',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/inequality-solver'),
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
            name: 'Inequality Solver',
            item: getUrl('/inequality-solver'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/inequality-solver'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I solve a linear inequality?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To solve ax + b > 0, isolate x by subtracting b and dividing by a. Remember: if you divide by a negative number, flip the inequality sign! For example, 2x + 3 > 0 becomes x > -1.5.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is interval notation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Interval notation describes solution sets: (a, b) means a < x < b (open endpoints), [a, b] means a ≤ x ≤ b (closed endpoints). Use ∞ for infinity: (3, ∞) means x > 3. The symbol ∪ combines multiple intervals.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I read a number line solution?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A filled (solid) circle means the endpoint is included (≤ or ≥). An empty (hollow) circle means excluded (< or >). Shaded regions show where solutions exist. Arrows indicate the solution extends to infinity.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/inequality-solver'),
        name: 'How to Solve Inequalities',
        description: 'Solve inequalities step by step',
        totalTime: 'PT2M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Inequality Solver',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Type & Sign',
            text: 'Select inequality type (linear, quadratic, or absolute value) and comparison sign (<, ≤, >, ≥).',
            url: getStepUrl('/inequality-solver', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Coefficients',
            text: 'Input the coefficients for your inequality.',
            url: getStepUrl('/inequality-solver', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'View Solution',
            text: 'See the solution in interval notation with visual number line representation.',
            url: getStepUrl('/inequality-solver', 3),
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="sr-only">Inequality Solver - Solve Linear, Quadratic & Absolute Value Inequalities</h1>

      {/* 面包屑导航 */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Inequality Solver"
        calculatorUrl="/inequality-solver"
      />

      {/* 计算器组件 */}
      <InequalitySolver />

      {/* 教育内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-green max-w-none">
          <h2 className="text-3xl font-bold text-green-900 mb-6">Understanding Inequalities</h2>

          <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-green-900 mb-4">What is an Inequality?</h3>
            <p className="text-gray-700 mb-4">
              An inequality expresses that one value is less than, greater than, or not equal to another. Unlike equations which have specific solutions, inequalities often have a range of solutions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-green-50 border border-green-300 rounded p-2 text-center">
                <p className="font-bold text-green-900">&lt;</p>
                <p className="text-gray-600">Less than</p>
              </div>
              <div className="bg-green-50 border border-green-300 rounded p-2 text-center">
                <p className="font-bold text-green-900">≤</p>
                <p className="text-gray-600">Less or equal</p>
              </div>
              <div className="bg-green-50 border border-green-300 rounded p-2 text-center">
                <p className="font-bold text-green-900">&gt;</p>
                <p className="text-gray-600">Greater than</p>
              </div>
              <div className="bg-green-50 border border-green-300 rounded p-2 text-center">
                <p className="font-bold text-green-900">≥</p>
                <p className="text-gray-600">Greater or equal</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Linear Inequalities</h3>
              <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-3">
                <p className="font-mono text-sm text-green-900">ax + b &gt; 0</p>
              </div>
              <p className="text-gray-700 text-sm">
                Solve like equations, but flip the sign when dividing by negative numbers.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Quadratic Inequalities</h3>
              <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-3">
                <p className="font-mono text-sm text-green-900">ax² + bx + c &lt; 0</p>
              </div>
              <p className="text-gray-700 text-sm">
                Find roots and test intervals to determine solution regions.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Absolute Value</h3>
              <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-3">
                <p className="font-mono text-sm text-green-900">|ax + b| &lt; c</p>
              </div>
              <p className="text-gray-700 text-sm">
                Split into two cases: positive and negative expressions.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-green-900 mb-4">Interval Notation Guide</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <code className="bg-green-100 px-2 py-1 rounded font-mono">(a, b)</code>
                <span>Open interval: a &lt; x &lt; b (endpoints excluded)</span>
              </div>
              <div className="flex items-center gap-3">
                <code className="bg-green-100 px-2 py-1 rounded font-mono">[a, b]</code>
                <span>Closed interval: a ≤ x ≤ b (endpoints included)</span>
              </div>
              <div className="flex items-center gap-3">
                <code className="bg-green-100 px-2 py-1 rounded font-mono">(a, ∞)</code>
                <span>x &gt; a (extends to positive infinity)</span>
              </div>
              <div className="flex items-center gap-3">
                <code className="bg-green-100 px-2 py-1 rounded font-mono">(-∞, b)</code>
                <span>x &lt; b (extends to negative infinity)</span>
              </div>
              <div className="flex items-center gap-3">
                <code className="bg-green-100 px-2 py-1 rounded font-mono">(a, b) ∪ (c, d)</code>
                <span>Union: x in (a,b) OR x in (c,d)</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Key Rules</h3>
            <ul className="space-y-2 text-green-800">
              <li>• <strong>Adding/subtracting:</strong> Same number on both sides, sign stays same</li>
              <li>• <strong>Multiply/divide by positive:</strong> Sign stays same</li>
              <li>• <strong>Multiply/divide by negative:</strong> Flip the inequality sign!</li>
              <li>• <strong>Number line:</strong> Solid dot = included, hollow dot = excluded</li>
              <li>• <strong>Checking:</strong> Pick test points from each region to verify</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 相关计算器 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-green-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/linear-equation-solver"
            className="block p-4 bg-white border border-green-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔢</div>
            <h3 className="font-semibold text-green-900">Linear Equation Solver</h3>
            <p className="text-sm text-gray-600 mt-1">Solve linear equations</p>
          </a>

          <a
            href="/quadratic-calculator"
            className="block p-4 bg-white border border-green-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-green-900">Quadratic Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Solve quadratic equations</p>
          </a>

          <a
            href="/graphing-calculator"
            className="block p-4 bg-white border border-green-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-green-900">Graphing Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Plot functions & inequalities</p>
          </a>

          <a
            href="/algebra-calculator"
            className="block p-4 bg-white border border-green-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🧮</div>
            <h3 className="font-semibold text-green-900">Algebra Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">General algebra computations</p>
          </a>
        </div>
      </section>
    </div>
  );
}

