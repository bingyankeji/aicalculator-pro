import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import LinearEquationSolver from '@/components/Calculator/LinearEquationSolver';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Linear Equation Solver - Solve Systems of Equations | AICalculator',
  description: 'Free linear equation solver for 1, 2, and 3 variable systems. Solve equations step-by-step with graphical representation using Cramer\'s Rule and elimination methods.',
  keywords: [
    'linear equation solver',
    'system of equations solver',
    'equation calculator',
    'solve equations online',
    'cramers rule calculator',
    '2x2 system solver',
    '3x3 system solver',
    'simultaneous equations solver',
    'algebra calculator',
    'equation solver with steps',
    'linear algebra calculator',
    'matrix equation solver',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Linear Equation Solver - Solve Systems of Equations',
    description: 'Solve linear equations and systems of equations instantly with step-by-step solutions and graphical representation.',
    type: 'website',
    url: getUrl('/linear-equation-solver'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('linear-equation'),
      width: 1200,
      height: 630,
      alt: 'Linear Equation Solver',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linear Equation Solver',
    description: 'Solve equations instantly with steps',
    images: [getOgImage('linear-equation')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/linear-equation-solver'),
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

export default function LinearEquationSolverPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/linear-equation-solver'),
        name: 'Linear Equation Solver',
        url: getUrl('/linear-equation-solver'),
        description: 'Solve linear equations and systems of equations with detailed step-by-step solutions.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Solve one-variable equations',
          'Solve 2x2 systems of equations',
          'Solve 3x3 systems of equations',
          'Cramer\'s Rule implementation',
          'Step-by-step solutions',
          'Graphical representation',
          'Solution type detection',
          'Instant results',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/linear-equation-solver'),
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
            name: 'Linear Equation Solver',
            item: getUrl('/linear-equation-solver'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/linear-equation-solver'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I solve a linear equation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For a simple equation like 2x + 3 = 0, subtract 3 from both sides to get 2x = -3, then divide by 2 to get x = -1.5. Our calculator shows each step and verifies the solution.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is Cramer\'s Rule?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cramer\'s Rule uses determinants to solve systems of linear equations. For a 2x2 system, it calculates the main determinant D and substitutes columns to find Dx and Dy, then x = Dx/D and y = Dy/D. Our solver uses this method automatically.',
            },
          },
          {
            '@type': 'Question',
            name: 'What does "no solution" mean?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A system has no solution when the equations represent parallel lines that never intersect. For example, x + y = 5 and x + y = 10 cannot both be true. The calculator detects this when the determinant is zero and equations are inconsistent.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are infinite solutions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Infinite solutions occur when equations are identical or represent the same line. For example, x + y = 5 and 2x + 2y = 10 are the same equation. Any point on that line is a solution.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/linear-equation-solver'),
        name: 'How to Use the Linear Equation Solver',
        description: 'Solve linear equations step by step',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Linear Equation Solver',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Equation Type',
            text: 'Choose whether you want to solve a one-variable equation, 2x2 system, or 3x3 system.',
            url: getStepUrl('/linear-equation-solver', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Coefficients',
            text: 'Input the coefficients for your equation(s). For example, for 2x + 3 = 0, enter a=2 and b=3.',
            url: getStepUrl('/linear-equation-solver', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'View Solution',
            text: 'Click Solve to see the solution with detailed steps, verification, and graphical representation (for 1 and 2 variable systems).',
            url: getStepUrl('/linear-equation-solver', 3),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/linear-equation-solver'),
        headline: 'Guide to Solving Linear Equations',
        description: 'Learn how to solve linear equations and systems using various methods',
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
        dateModified: '2024-11-19',
        image: getOgImage('linear-equation'),
        articleBody: 'A comprehensive guide to solving linear equations and systems of equations using algebraic methods.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="sr-only">Linear Equation Solver - Solve Systems of Equations Step-by-Step</h1>

      {/* 面包屑导航 */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Linear Equation Solver"
        calculatorUrl="/linear-equation-solver"
      />

      {/* 计算器组件 */}
      <LinearEquationSolver />

      {/* 教育内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Understanding Linear Equations</h2>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">What is a Linear Equation?</h3>
            <p className="text-slate-700 mb-4">
              A linear equation is an algebraic equation where each term is either a constant or the product of a constant and a single variable. Linear equations produce straight lines when graphed.
            </p>
            <div className="bg-slate-50 border-l-4 border-slate-500 p-4">
              <p className="font-mono text-slate-900 mb-2">One variable: ax + b = 0</p>
              <p className="font-mono text-slate-900 mb-2">Two variables: ax + by = c</p>
              <p className="font-mono text-slate-900">Three variables: ax + by + cz = d</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Solution Types</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>Unique Solution:</strong> Equations intersect at exactly one point
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">∞</span>
                  <div>
                    <strong>Infinite Solutions:</strong> Equations represent the same line
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <div>
                    <strong>No Solution:</strong> Equations are parallel and never intersect
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Cramer's Rule</h3>
              <p className="text-slate-700 text-sm mb-3">
                Cramer's Rule uses determinants to solve systems of linear equations efficiently. For a 2x2 system:
              </p>
              <div className="bg-slate-50 border border-slate-300 rounded p-3">
                <p className="font-mono text-xs text-slate-800">x = Dx / D</p>
                <p className="font-mono text-xs text-slate-800">y = Dy / D</p>
                <p className="text-xs text-slate-600 mt-2">Where D is the main determinant and Dx, Dy are column substitutions</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Real-World Applications</h3>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li><strong>Economics:</strong> Supply and demand equilibrium, cost analysis</li>
              <li><strong>Engineering:</strong> Circuit analysis, structural load calculations</li>
              <li><strong>Physics:</strong> Motion problems, force balance equations</li>
              <li><strong>Chemistry:</strong> Chemical reaction balancing, mixture problems</li>
              <li><strong>Business:</strong> Break-even analysis, resource allocation</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Solving Tips</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Always verify your solution by substituting back into the original equations</li>
              <li>• For 2 equations, check if lines are parallel (no solution) or identical (infinite solutions)</li>
              <li>• Cramer's Rule works best for small systems (2×2, 3×3)</li>
              <li>• If determinant = 0, the system either has no solution or infinite solutions</li>
              <li>• Graphing helps visualize the solution for 1 and 2-variable systems</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 相关计算器 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/matrix-calculator"
            className="block p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔤</div>
            <h3 className="font-semibold text-slate-900">Matrix Calculator</h3>
            <p className="text-sm text-slate-600 mt-1">Matrix operations and determinants</p>
          </a>

          <a
            href="/quadratic-calculator"
            className="block p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-slate-900">Quadratic Calculator</h3>
            <p className="text-sm text-slate-600 mt-1">Solve quadratic equations</p>
          </a>

          <a
            href="/graphing-calculator"
            className="block p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-slate-900">Graphing Calculator</h3>
            <p className="text-sm text-slate-600 mt-1">Plot and analyze functions</p>
          </a>

          <a
            href="/algebra-calculator"
            className="block p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔢</div>
            <h3 className="font-semibold text-slate-900">Algebra Calculator</h3>
            <p className="text-sm text-slate-600 mt-1">General algebraic computations</p>
          </a>
        </div>
      </section>
    </div>
  );
}

