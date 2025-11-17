import { Metadata } from 'next';
import GCFCalculator from '@/components/Calculator/GCFCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `GCF Calculator - Greatest Common Factor Calculator with Steps | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Free online GCF calculator finds the greatest common factor of 2-10 numbers. Shows Euclidean algorithm, prime factorization, and all common factors.`,
  keywords: [
    'gcf calculator',
    'greatest common factor calculator',
    'calculate gcf',
    'gcf finder',
    'gcd calculator',
    'greatest common divisor',
    'gcf and lcm calculator',
    'gcf formula calculator',
    'find gcf',
    'common factor calculator',
    'gcf solver',
    'gcf of multiple numbers',
    'gcf calculator with steps',
    'euclidean algorithm calculator',
    'prime factorization gcf',
    'gcf math calculator',
    'fraction simplifier',
    'gcf tool',
    'hcf calculator',
    'greatest common measure'
  ],
  alternates: {
    canonical: getUrl('/gcf-calculator')
  },
  openGraph: {
    title: `GCF Calculator - Greatest Common Factor with Steps`,
    description: `Calculate GCF of 2-10 numbers with Euclidean algorithm and detailed explanations.`,
    url: getUrl('/gcf-calculator'),
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `GCF Calculator - Greatest Common Factor Calculator`,
    description: `Free calculator for GCF with step-by-step solutions and prime factorization.`,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function GCFCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/gcf-calculator'),
        'name': 'GCF Calculator',
        'url': getUrl('/gcf-calculator'),
        'description': `Calculate the greatest common factor (GCF) of 2-10 positive integers with Euclidean algorithm, prime factorization, all common factors list, and step-by-step solutions.`,
        'applicationCategory': 'CalculatorApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          'GCF calculation for 2-10 numbers',
          'Euclidean algorithm visualization',
          'Prime factorization display',
          'All common factors list',
          'LCM calculation and relationship',
          'Fraction simplification',
          'Step-by-step solutions',
          'Smart relationship detection'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/gcf-calculator'),
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
            'item': getUrl('/math-numbers')
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'GCF Calculator',
            'item': getUrl('/gcf-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/gcf-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is GCF (Greatest Common Factor)?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The Greatest Common Factor (GCF), also known as Greatest Common Divisor (GCD) or Highest Common Factor (HCF), is the largest positive integer that divides all given numbers evenly without leaving a remainder. For example, the GCF of 12 and 18 is 6, because 6 is the largest number that divides both 12 (12÷6=2) and 18 (18÷6=3) evenly. GCF is fundamental in mathematics for simplifying fractions, solving ratio problems, and understanding number relationships. Unlike LCM which is always ≥ the largest input, GCF is always ≤ the smallest input number.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you calculate GCF?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `There are three main methods to calculate GCF: (1) Euclidean Algorithm (most efficient for 2 numbers): Repeatedly divide and use remainders until reaching 0. Example: GCF(48,18): 48=18×2+12, 18=12×1+6, 12=6×2+0, so GCF=6. (2) Prime Factorization Method: Break numbers into prime factors and multiply the common ones with lowest powers. Example: 24=2³×3, 36=2²×3². Common: 2²×3=12, so GCF=12. (3) Listing Factors Method: List all factors of each number and find the greatest common one. Example: Factors of 12: 1,2,3,4,6,12. Factors of 16: 1,2,4,8,16. Common: 1,2,4. GCF=4. The Euclidean algorithm is fastest for large numbers, while prime factorization is best for understanding and multiple numbers.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the relationship between GCF and LCM?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `For any two positive integers a and b, there's a fundamental relationship: GCF(a,b) × LCM(a,b) = a × b. This means if you know one value, you can find the other. Example: For 12 and 18, GCF=6 and LCM=36. Check: 6×36=216, and 12×18=216 ✓. This relationship is useful for verification and quick calculations. If two numbers are coprime (GCF=1), their LCM equals their product. If one divides the other, GCF equals the smaller number and LCM equals the larger. This formula only works for exactly two numbers, not three or more.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you use GCF to simplify fractions?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `To simplify a fraction, divide both numerator and denominator by their GCF. Steps: (1) Find GCF of numerator and denominator, (2) Divide both by GCF, (3) Result is the simplified fraction. Example: Simplify 24/36. Find GCF(24,36)=12. Divide: 24÷12=2, 36÷12=3. Simplified: 2/3. The fraction is fully simplified when GCF=1 (numerator and denominator are coprime). If GCF>1, the fraction can be further simplified. This is why GCF is essential in fraction arithmetic—before adding or subtracting, simplify using GCF for easier calculations and cleaner answers.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the GCF of three or more numbers?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `To find GCF of three or more numbers, calculate progressively: find GCF of first two, then find GCF of that result with the third number, continue for all numbers. Example: Find GCF(24, 36, 60). Step 1: GCF(24,36)=12. Step 2: GCF(12,60)=12. Final answer: 12. Alternatively, use prime factorization: factor each number, then multiply common primes with lowest powers. Example: 24=2³×3, 36=2²×3², 60=2²×3×5. Common: 2²×3=12. The progressive method works well with calculators, while prime factorization helps visualize why the GCF is what it is. The GCF of multiple numbers is the largest number that divides all of them evenly.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What are real-world applications of GCF?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `GCF has many practical applications: (1) Fraction Simplification: Reduce 18/24 by dividing by GCF(18,24)=6 to get 3/4. (2) Equal Groups: Distribute 24 pencils and 36 erasers equally among students—GCF(24,36)=12, so maximum 12 students with 2 pencils and 3 erasers each. (3) Tile Layouts: Find largest square tile for a 24×36 inch space—GCF=12, use 12×12 inch tiles. (4) Recipe Scaling: Scale down a recipe calling for 8 cups flour and 6 cups sugar—GCF(8,6)=2, divide by 2 for half recipe. (5) Music: Simplify time signatures and rhythm ratios. (6) Modular Arithmetic: Solving Diophantine equations and number theory problems. Understanding GCF helps optimize resources, simplify problems, and find efficient solutions.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/gcf-calculator'),
        'name': 'How to Calculate GCF',
        'description': 'Step-by-step guide to finding the greatest common factor of numbers',
        'totalTime': 'PT3M',
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Enter Numbers',
            'text': `Input 2 to 10 positive integers in the calculator fields. You can add more fields using the "Add Number" button.`,
            'url': getStepUrl('/gcf-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Click Calculate',
            'text': `Press the "Calculate GCF" button to compute the greatest common factor and related information.`,
            'url': getStepUrl('/gcf-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Review GCF Result',
            'text': `The calculator displays the GCF prominently at the top, along with the LCM and verification formula.`,
            'url': getStepUrl('/gcf-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Check All Common Factors',
            'text': `See the complete list of all common factors, with the GCF highlighted in green.`,
            'url': getStepUrl('/gcf-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            'position': 5,
            'name': 'Study Euclidean Algorithm',
            'text': `For two numbers, review the Euclidean algorithm showing step-by-step division process.`,
            'url': getStepUrl('/gcf-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            'position': 6,
            'name': 'Apply to Fraction Simplification',
            'text': `Use the simplified fraction result to see how GCF simplifies the ratio of two numbers.`,
            'url': getStepUrl('/gcf-calculator', 6)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/gcf-calculator'),
        'headline': 'GCF Calculator - Complete Guide to Greatest Common Factor',
        'description': `Comprehensive guide to calculating GCF with Euclidean algorithm, formulas, methods, examples, and practical applications.`,
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
      <h1 className="sr-only">GCF Calculator - Greatest Common Factor Calculator with Steps</h1>
      
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
                GCF Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <GCFCalculator />

      {/* Educational Content - Abbreviated due to length, full content available */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About GCF Calculator</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our <strong>GCF Calculator</strong> is a free, comprehensive online tool designed to find the Greatest Common Factor (also known as GCD - Greatest Common Divisor or HCF - Highest Common Factor) of 2 to 10 positive integers instantly. Whether you're simplifying fractions, solving division problems, or learning number theory, our calculator provides accurate results with detailed explanations, Euclidean algorithm visualization, and step-by-step solutions.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding GCF: The Basics</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is GCF?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The <strong>Greatest Common Factor (GCF)</strong> is the largest positive integer that divides all given numbers evenly without leaving a remainder. It represents the biggest "building block" that all the numbers share.
          </p>

          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example</h4>
            <p className="text-gray-700 mb-2">Find GCF(12, 18):</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Factors of 12: 1, 2, 3, 4, <strong className="text-green-700">6</strong>, 12</li>
              <li>Factors of 18: 1, 2, 3, <strong className="text-green-700">6</strong>, 9, 18</li>
              <li>Common factors: 1, 2, 3, 6</li>
              <li><strong>GCF(12, 18) = 6</strong> (the largest common factor)</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Properties of GCF</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Always ≤ smallest input:</strong> GCF(a,b) ≤ min(a,b)</li>
            <li><strong>Divides all inputs:</strong> Every input number is divisible by the GCF</li>
            <li><strong>Uniqueness:</strong> There is only one GCF for any set of numbers</li>
            <li><strong>With 1:</strong> GCF(a, 1) = 1 for any positive integer a</li>
            <li><strong>With self:</strong> GCF(a, a) = a</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Methods to Calculate GCF</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Method 1: Euclidean Algorithm</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The <strong>Euclidean Algorithm</strong> is the most efficient method for finding GCF of two numbers. It uses repeated division to find the greatest common divisor.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example: GCF(48, 18)</h4>
            <div className="space-y-2 text-gray-700 font-mono text-sm">
              <p>Step 1: 48 = 18 × 2 + 12</p>
              <p>Step 2: 18 = 12 × 1 + 6</p>
              <p>Step 3: 12 = 6 × 2 + 0</p>
              <p className="text-blue-700 font-bold mt-3">GCF = 6 (last non-zero remainder)</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Method 2: Prime Factorization</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Break each number into prime factors, then multiply the common primes with their lowest powers.
          </p>
          
          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example: GCF(24, 36)</h4>
            <div className="space-y-2 text-gray-700 font-mono text-sm">
              <p>24 = 2³ × 3¹</p>
              <p>36 = 2² × 3²</p>
              <p className="mt-3">Take lowest powers of common primes:</p>
              <p>GCF = 2² × 3¹ = 4 × 3 = 12</p>
              <p className="text-purple-700 font-bold mt-3">GCF(24, 36) = 12</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Method 3: Listing Factors</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            List all factors of each number and identify the greatest common one. Best for small numbers.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">GCF and LCM Relationship</h2>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            For any two positive integers a and b:
          </p>

          <div className="bg-indigo-50 rounded-lg p-6 mb-6 text-center">
            <p className="font-mono text-2xl font-bold text-indigo-900 mb-2">
              GCF(a,b) × LCM(a,b) = a × b
            </p>
            <p className="text-sm text-gray-600">This relationship helps verify calculations and find one value from the other</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Practical Applications of GCF</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Simplifying Fractions</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The most common use of GCF is simplifying fractions by dividing both numerator and denominator by their GCF.
          </p>
          
          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example: Simplify 18/24</h4>
            <div className="space-y-2 text-gray-700">
              <p>Step 1: Find GCF(18, 24) = 6</p>
              <p>Step 2: Divide both by 6</p>
              <p>18 ÷ 6 = 3</p>
              <p>24 ÷ 6 = 4</p>
              <p className="font-bold">Result: 18/24 = 3/4</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Equal Distribution</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            GCF helps divide items into equal groups. Example: Distribute 24 apples and 36 oranges equally among students—GCF(24,36)=12, so maximum 12 students.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Tile and Layout Problems</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Find the largest square tile that fits perfectly. Example: For a 24×36 inch space, GCF=12, use 12×12 inch tiles.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/lcm-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🔢</div>
              <h3 className="font-semibold text-gray-900 mb-1">LCM Calculator</h3>
              <p className="text-sm text-gray-600">Find the least common multiple</p>
            </Link>
            
            <Link 
              href="/fraction-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">➗</div>
              <h3 className="font-semibold text-gray-900 mb-1">Fraction Calculator</h3>
              <p className="text-sm text-gray-600">Simplify and calculate fractions</p>
            </Link>
            
            <Link 
              href="/factor-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🔢</div>
              <h3 className="font-semibold text-gray-900 mb-1">Factor Calculator</h3>
              <p className="text-sm text-gray-600">Find all factors of a number</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <p className="text-gray-700 mb-4">
            For more information about GCF and number theory:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a 
                href="https://www.khanacademy.org/math/pre-algebra/pre-algebra-factors-multiples" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Khan Academy - GCF and LCM
              </a>
            </li>
            <li>
              <a 
                href="https://www.mathsisfun.com/greatest-common-factor.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Math is Fun - Greatest Common Factor
              </a>
            </li>
            <li>
              <a 
                href="https://en.wikipedia.org/wiki/Greatest_common_divisor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Wikipedia - Greatest Common Divisor
              </a>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

