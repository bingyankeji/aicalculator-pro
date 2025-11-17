import { Metadata } from 'next';
import RootCalculator from '@/components/Calculator/RootCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Root Calculator - Square Root, Cube Root & nth Root Calculator | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Free online root calculator for square roots (√), cube roots (∛), and nth roots. Calculate roots with step-by-step solutions, simplify radicals, and perform root operations. Perfect for students and professionals.`,
  keywords: [
    'root calculator',
    'square root calculator',
    'cube root calculator',
    'nth root calculator',
    'radical calculator',
    'root simplifier',
    'calculate square root',
    'calculate cube root',
    'fourth root calculator',
    'radical simplification',
    'root operations calculator',
    'sqrt calculator',
    'radicand calculator',
    'root index calculator',
    'perfect square root',
    'perfect cube root',
    'root to exponent converter',
    'fractional exponent calculator',
    'simplify radicals',
    'root multiplication calculator'
  ],
  alternates: {
    canonical: getUrl('/root-calculator')
  },
  openGraph: {
    title: `Root Calculator - Square Root, Cube Root & nth Root Calculator`,
    description: `Free online root calculator for square roots (√), cube roots (∛), and nth roots. Calculate roots with step-by-step solutions, simplify radicals, and perform root operations.`,
    url: getUrl('/root-calculator'),
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Root Calculator - Square Root, Cube Root & nth Root Calculator`,
    description: `Free online root calculator for square roots (√), cube roots (∛), and nth roots. Calculate roots with step-by-step solutions.`,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/root-calculator'),
        'name': 'Root Calculator',
        'url': getUrl('/root-calculator'),
        'description': `Calculate square roots, cube roots, and nth roots with step-by-step solutions. Includes root simplification and operations.`,
        'applicationCategory': 'CalculatorApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          'Square root calculation (√)',
          'Cube root calculation (∛)',
          'nth root calculation',
          'Root simplification',
          'Root operations (multiply, divide, add, subtract)',
          'Exponent form conversion',
          'Step-by-step solutions',
          'Perfect root detection',
          'Instant results',
          'Mobile-friendly interface'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/root-calculator'),
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': getUrl('/')
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Math Calculators',
            'item': getUrl('/calculators/math')
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Root Calculator',
            'item': getUrl('/root-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/root-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is a root in mathematics?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `A root is the inverse operation of exponentiation. The nth root of a number x is a value that, when raised to the power n, equals x. For example, the square root (√) is the 2nd root, and the cube root (∛) is the 3rd root. The notation ⁿ√x represents the nth root of x.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do I calculate a square root?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `To calculate a square root (√x), find the number that when multiplied by itself equals x. For example, √16 = 4 because 4 × 4 = 16. Our calculator provides instant square root calculations with step-by-step solutions and shows both exact and decimal forms.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the difference between square root and cube root?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `A square root (√x) is the number that when multiplied by itself equals x (2nd root). A cube root (∛x) is the number that when multiplied by itself three times equals x (3rd root). For example: √16 = 4 (because 4² = 16) and ∛27 = 3 (because 3³ = 27).`
            }
          },
          {
            '@type': 'Question',
            'name': 'Can you take the square root of a negative number?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `No, you cannot take an even root (square root, 4th root, 6th root, etc.) of a negative number in real numbers - the result would be a complex number. However, you can take odd roots (cube root, 5th root, etc.) of negative numbers. For example: ∛(-8) = -2 because (-2)³ = -8.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you simplify radicals?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `To simplify a radical, factor the radicand (number under the root) into perfect powers matching your root index. For example, to simplify √72: factor 72 = 36 × 2 = 6² × 2, so √72 = √(6² × 2) = 6√2. Our calculator automatically shows simplified forms and step-by-step simplification process.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the relationship between roots and exponents?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Roots can be expressed as fractional exponents: the nth root of x equals x raised to the power of 1/n. For example, √x = x^(1/2), ∛x = x^(1/3), and ⁿ√x = x^(1/n). This allows you to use exponent rules when working with roots.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you multiply roots together?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `When multiplying roots with the same index, multiply the radicands: ⁿ√a × ⁿ√b = ⁿ√(a×b). For example: √2 × √8 = √(2×8) = √16 = 4. If roots have different indices, convert to decimal first or use exponent form. Our calculator handles all root operations automatically.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is a perfect square or perfect cube?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `A perfect square is a number whose square root is an integer (e.g., 4, 9, 16, 25). A perfect cube is a number whose cube root is an integer (e.g., 8, 27, 64, 125). Perfect nth powers are numbers whose nth root is an integer. Our calculator automatically detects perfect roots.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/root-calculator'),
        'name': 'How to Calculate Roots',
        'description': 'Learn how to calculate square roots, cube roots, and nth roots step by step',
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Enter the Number',
            'text': `Enter the number (radicand) for which you want to calculate the root in the "Number" field.`
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Select Root Index',
            'text': `Choose the root index (n): 2 for square root (√), 3 for cube root (∛), or any other positive integer for nth root.`
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Calculate',
            'text': `Click the "Calculate Root" button to compute the result instantly.`
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Review Results',
            'text': `View the decimal result, exact form, exponent form, and step-by-step solution showing how the root was calculated.`
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/root-calculator'),
        'headline': 'Root Calculator - Complete Guide to Square Roots, Cube Roots & nth Roots',
        'description': `Comprehensive guide to calculating and understanding roots, including square roots, cube roots, and higher-order roots with practical examples.`,
        'datePublished': '2024-01-01',
        'dateModified': new Date().toISOString().split('T')[0],
        'author': {
          '@type': 'Organization',
          'name': process.env.NEXT_PUBLIC_SITE_NAME
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Root Calculator - Square Root, Cube Root & nth Root Calculator with Step-by-Step Solutions</h1>
      
      {/* Calculator Component */}
      <RootCalculator />

      {/* SEO Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Root Calculator</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our <strong>Root Calculator</strong> is a powerful and free online tool designed to calculate square roots (√), cube roots (∛), 
            and nth roots of any number. Whether you're a student learning algebra, a professional engineer, or simply need quick root 
            calculations, our calculator provides instant, accurate results with detailed step-by-step solutions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Understanding roots is fundamental to mathematics, science, and engineering. A root is the inverse operation of raising a 
            number to a power. For example, the square root of 16 is 4 because 4² = 16. Our calculator handles all types of roots and 
            provides multiple result formats including decimal, exact radical form, and exponent notation.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li><strong>Square Root Calculator (√):</strong> Calculate square roots instantly with perfect square detection</li>
            <li><strong>Cube Root Calculator (∛):</strong> Compute cube roots including negative numbers</li>
            <li><strong>nth Root Calculator:</strong> Calculate any root index (4th root, 5th root, etc.)</li>
            <li><strong>Root Operations:</strong> Multiply, divide, add, and subtract roots with automatic simplification</li>
            <li><strong>Multiple Result Formats:</strong> View results in decimal, exact radical form, and exponent notation</li>
            <li><strong>Step-by-Step Solutions:</strong> Understand the calculation process with detailed explanations</li>
            <li><strong>Perfect Root Detection:</strong> Automatically identifies perfect squares, cubes, and higher powers</li>
            <li><strong>Root Simplification:</strong> Simplifies radical expressions automatically</li>
            <li><strong>Mobile-Friendly:</strong> Works seamlessly on all devices</li>
            <li><strong>100% Free:</strong> No registration or payment required</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Roots</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is a Root?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            A root is a mathematical operation that finds a value which, when raised to a specific power, produces the original number. 
            The notation ⁿ√x represents the nth root of x, where:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>n</strong> is the root index (degree of the root)</li>
            <li><strong>x</strong> is the radicand (the number under the radical sign)</li>
            <li><strong>ⁿ√x = y</strong> means that y^n = x</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Types of Roots</h3>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <ul className="space-y-3 text-gray-700">
              <li><strong>Square Root (√x or ²√x):</strong> The most common root. √16 = 4 because 4² = 16</li>
              <li><strong>Cube Root (∛x or ³√x):</strong> ∛27 = 3 because 3³ = 27</li>
              <li><strong>Fourth Root (⁴√x):</strong> ⁴√16 = 2 because 2⁴ = 16</li>
              <li><strong>Fifth Root (⁵√x):</strong> ⁵√32 = 2 because 2⁵ = 32</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Root Properties and Rules</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Product Rule</h3>
          <p className="text-gray-700 mb-4">
            <strong>ⁿ√(a × b) = ⁿ√a × ⁿ√b</strong><br />
            The root of a product equals the product of the roots.<br />
            Example: √(4 × 9) = √4 × √9 = 2 × 3 = 6
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Quotient Rule</h3>
          <p className="text-gray-700 mb-4">
            <strong>ⁿ√(a ÷ b) = ⁿ√a ÷ ⁿ√b</strong><br />
            The root of a quotient equals the quotient of the roots.<br />
            Example: √(64 ÷ 4) = √64 ÷ √4 = 8 ÷ 2 = 4
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Power Rule</h3>
          <p className="text-gray-700 mb-4">
            <strong>(ⁿ√a)^m = ⁿ√(a^m)</strong><br />
            A root raised to a power can be rewritten as the root of the radicand raised to that power.<br />
            Example: (√2)² = 2
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. Exponent Form</h3>
          <p className="text-gray-700 mb-4">
            <strong>ⁿ√x = x^(1/n)</strong><br />
            Any root can be expressed as a fractional exponent.<br />
            Example: √16 = 16^(1/2) = 4, ∛8 = 8^(1/3) = 2
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Practical Applications</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li><strong>Geometry:</strong> Calculate side lengths of squares and cubes from their areas and volumes</li>
            <li><strong>Physics:</strong> Compute velocities, distances, and other physical quantities</li>
            <li><strong>Engineering:</strong> Structural calculations, electrical impedance, and design parameters</li>
            <li><strong>Finance:</strong> Calculate compound interest rates and investment growth factors</li>
            <li><strong>Statistics:</strong> Standard deviation and root mean square calculations</li>
            <li><strong>Computer Science:</strong> Algorithm complexity analysis and data structure operations</li>
            <li><strong>Architecture:</strong> Proportion calculations and scale factor determinations</li>
            <li><strong>Chemistry:</strong> Molecular calculations and reaction rate computations</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Tips for Working with Roots</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li><strong>Identify Perfect Powers:</strong> Recognize perfect squares (4, 9, 16, 25...) and cubes (8, 27, 64...) for quick mental calculations</li>
            <li><strong>Simplify First:</strong> Factor the radicand to identify perfect powers before calculating</li>
            <li><strong>Use Exponent Form:</strong> Convert roots to fractional exponents for easier algebraic manipulation</li>
            <li><strong>Check Sign Rules:</strong> Remember that even roots of negative numbers are undefined in real numbers</li>
            <li><strong>Rationalize Denominators:</strong> When a root appears in a denominator, multiply by the conjugate to rationalize</li>
            <li><strong>Approximate First:</strong> Estimate the result before calculating to verify your answer makes sense</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Root Values Reference</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Perfect Squares:</h3>
            <p className="text-gray-700 mb-4 font-mono text-sm">
              √1=1, √4=2, √9=3, √16=4, √25=5, √36=6, √49=7, √64=8, √81=9, √100=10
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Perfect Cubes:</h3>
            <p className="text-gray-700 mb-4 font-mono text-sm">
              ∛1=1, ∛8=2, ∛27=3, ∛64=4, ∛125=5, ∛216=6, ∛343=7, ∛512=8, ∛729=9, ∛1000=10
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Use Our Root Calculator?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our Root Calculator stands out for its accuracy, speed, and comprehensive features. Unlike basic calculators that only 
            provide decimal results, we show multiple representations including exact radical form and exponent notation. The 
            step-by-step solutions help you understand the calculation process, making it an excellent learning tool.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you need to calculate a simple square root or perform complex root operations, our calculator handles it all 
            with ease. The intuitive interface works perfectly on desktop and mobile devices, ensuring you can perform calculations 
            wherever you are. Best of all, it's completely free with no registration required.
          </p>
        </section>
      </article>
    </div>
  );
}

