import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import SystemOfEquationsSolver from '@/components/Calculator/SystemOfEquationsSolver';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'System of Equations Solver - Gaussian Elimination | AICalculator',
  description: 'Solve 2×2 and 3×3 systems of linear equations with step-by-step Gaussian elimination. Visual matrix transformations and detailed solutions.',
  keywords: [
    'system of equations solver',
    'gaussian elimination calculator',
    'solve linear systems',
    '2x2 system solver',
    '3x3 system solver',
    'matrix solver',
    'simultaneous equations',
    'linear algebra calculator',
    'equation system calculator',
    'gauss elimination',
    'augmented matrix solver',
    'system solver with steps',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'System of Equations Solver - Gaussian Elimination',
    description: 'Solve systems of linear equations with visual Gaussian elimination process and step-by-step solutions.',
    type: 'website',
    url: getUrl('/system-of-equations-solver'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('system-equations'),
      width: 1200,
      height: 630,
      alt: 'System of Equations Solver',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System of Equations Solver',
    description: 'Solve systems with Gaussian elimination',
    images: [getOgImage('system-equations')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/system-of-equations-solver'),
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

export default function SystemOfEquationsSolverPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/system-of-equations-solver'),
        name: 'System of Equations Solver',
        url: getUrl('/system-of-equations-solver'),
        description: 'Solve systems of linear equations using Gaussian elimination with visual matrix transformations.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Solve 2×2 systems',
          'Solve 3×3 systems',
          'Gaussian elimination method',
          'Visual matrix transformations',
          'Step-by-step solutions',
          'Solution verification',
          'Augmented matrix display',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/system-of-equations-solver'),
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
            name: 'System of Equations Solver',
            item: getUrl('/system-of-equations-solver'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/system-of-equations-solver'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Gaussian elimination?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gaussian elimination is a systematic method for solving systems of linear equations. It transforms the augmented matrix into row echelon form (upper triangular) through row operations, then uses back substitution to find the solution. This calculator shows each transformation step visually.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I solve a 2×2 system?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Enter the coefficients for both equations in the form ax + by = c. For example, for the system "2x + 3y = 8" and "x - y = 1", enter a=2, b=3, c=8 for equation 1, and a=1, b=-1, c=1 for equation 2. Click Solve to see the solution with matrix transformations.',
            },
          },
          {
            '@type': 'Question',
            name: 'What does "no solution" mean?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A system has no solution when the equations represent parallel lines (2D) or parallel planes (3D) that never intersect. This occurs when the determinant of the coefficient matrix is zero and the equations are inconsistent.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/system-of-equations-solver'),
        name: 'How to Solve a System of Equations',
        description: 'Solve systems using Gaussian elimination',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'System of Equations Solver',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select System Size',
            text: 'Choose between a 2×2 system (2 equations, 2 variables) or 3×3 system (3 equations, 3 variables).',
            url: getStepUrl('/system-of-equations-solver', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Coefficients',
            text: 'Input the coefficients for each equation. For ax + by = c, enter values for a, b, and c.',
            url: getStepUrl('/system-of-equations-solver', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'View Solution Process',
            text: 'Click Solve to see the Gaussian elimination process with visual matrix transformations at each step.',
            url: getStepUrl('/system-of-equations-solver', 3),
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

      <h1 className="sr-only">System of Equations Solver - Gaussian Elimination with Visual Steps</h1>

      {/* 面包屑导航 */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="System of Equations Solver"
        calculatorUrl="/system-of-equations-solver"
      />

      {/* 计算器组件 */}
      <SystemOfEquationsSolver />

      {/* 教育内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Understanding Gaussian Elimination</h2>

          <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">What is a System of Equations?</h3>
            <p className="text-gray-700 mb-4">
              A system of equations is a collection of two or more equations with the same set of variables. Solving a system means finding values for the variables that satisfy all equations simultaneously.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-mono text-blue-900 text-sm">2x + 3y = 8</p>
              <p className="font-mono text-blue-900 text-sm">x - y = 1</p>
              <p className="text-xs text-gray-600 mt-2">Solution: x = 2.2, y = 1.2</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">The Gaussian Elimination Method</h3>
              <ol className="list-decimal pl-5 text-gray-700 space-y-2 text-sm">
                <li><strong>Form Augmented Matrix:</strong> Write equations as a matrix</li>
                <li><strong>Forward Elimination:</strong> Create zeros below diagonal</li>
                <li><strong>Back Substitution:</strong> Solve from bottom to top</li>
                <li><strong>Verify:</strong> Check solution in original equations</li>
              </ol>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Row Operations</h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>• <strong>Swap rows:</strong> Exchange two rows</li>
                <li>• <strong>Multiply row:</strong> Multiply all elements by a constant</li>
                <li>• <strong>Add rows:</strong> Add multiple of one row to another</li>
              </ul>
              <p className="text-xs text-gray-600 mt-3">These operations don't change the solution!</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Real-World Applications</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Economics:</strong> Supply-demand equilibrium, market analysis</li>
              <li><strong>Engineering:</strong> Electrical circuits, structural analysis</li>
              <li><strong>Chemistry:</strong> Balancing chemical equations</li>
              <li><strong>Computer Graphics:</strong> 3D transformations, rendering</li>
              <li><strong>Operations Research:</strong> Resource allocation, optimization</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Solver Features</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• <strong>Visual Matrix Display:</strong> See each transformation step</li>
              <li>• <strong>Color Highlighting:</strong> Track pivot elements and changes</li>
              <li>• <strong>Detailed Steps:</strong> Understand every operation</li>
              <li>• <strong>Automatic Verification:</strong> Solution checked in original equations</li>
              <li>• <strong>Error Detection:</strong> Identifies systems with no unique solution</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 相关计算器 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/linear-equation-solver"
            className="block p-4 bg-white border border-blue-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔢</div>
            <h3 className="font-semibold text-blue-900">Linear Equation Solver</h3>
            <p className="text-sm text-gray-600 mt-1">Solve 1-3 variable equations</p>
          </a>

          <a
            href="/matrix-calculator"
            className="block p-4 bg-white border border-blue-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔤</div>
            <h3 className="font-semibold text-blue-900">Matrix Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Matrix operations & determinants</p>
          </a>

          <a
            href="/graphing-calculator"
            className="block p-4 bg-white border border-blue-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-blue-900">Graphing Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Plot equations & functions</p>
          </a>

          <a
            href="/algebra-calculator"
            className="block p-4 bg-white border border-blue-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🧮</div>
            <h3 className="font-semibold text-blue-900">Algebra Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">General algebraic computations</p>
          </a>
        </div>
      </section>
    </div>
  );
}

