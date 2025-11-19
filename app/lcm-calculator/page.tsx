import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import LCMCalculator from '@/components/Calculator/LCMCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `LCM Calculator - Least Common Multiple Calculator with Steps | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Free online LCM calculator finds the least common multiple of 2-10 numbers. Shows prime factorization, GCF relationship, and step-by-step solutions.`,
  keywords: [
    'lcm calculator',
    'least common multiple calculator',
    'calculate lcm',
    'lcm finder',
    'lowest common multiple',
    'lcm and gcf calculator',
    'lcm formula calculator',
    'find lcm',
    'common multiple calculator',
    'lcm solver',
    'lcm of multiple numbers',
    'lcm calculator with steps',
    'prime factorization lcm',
    'lcm math calculator',
    'fraction lcm calculator',
    'lcm tool',
    'multiple numbers lcm',
    'least common divisor',
    'lcm gcf calculator',
    'common denominator calculator'
  ],
  alternates: {
    canonical: getUrl('/lcm-calculator')
  },
  openGraph: {
    title: `LCM Calculator - Least Common Multiple with Steps`,
    description: `Calculate LCM of 2-10 numbers with prime factorization and detailed explanations.`,
    url: getUrl('/lcm-calculator'),
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `LCM Calculator - Least Common Multiple Calculator`,
    description: `Free calculator for LCM with step-by-step solutions and prime factorization.`,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function LCMCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/lcm-calculator'),
        'name': 'LCM Calculator',
        'url': getUrl('/lcm-calculator'),
        'description': `Calculate the least common multiple (LCM) of 2-10 positive integers with prime factorization, GCF relationship, and step-by-step solutions. Includes multiple visualization and educational content.`,
        'applicationCategory': 'CalculatorApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          'LCM calculation for 2-10 numbers',
          'GCF calculation and relationship',
          'Prime factorization display',
          'Multiple visualization',
          'Step-by-step solutions',
          'Formula verification',
          'Smart relationship detection',
          'Educational explanations'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/lcm-calculator'),
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
            'name': 'LCM Calculator',
            'item': getUrl('/lcm-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/lcm-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is LCM (Least Common Multiple)?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The Least Common Multiple (LCM), also known as the Lowest Common Multiple, is the smallest positive integer that is divisible by all given numbers without a remainder. For example, the LCM of 4 and 6 is 12, because 12 is the smallest number that both 4 and 6 divide into evenly (4×3=12, 6×2=12). LCM is essential in mathematics for adding and subtracting fractions with different denominators, solving scheduling problems, and understanding number relationships. The LCM is always greater than or equal to the largest number in the set.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you calculate LCM?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `There are three main methods to calculate LCM: (1) Listing Multiples Method: List multiples of each number until you find the smallest common one. Example: Multiples of 6: 6, 12, 18, 24... Multiples of 8: 8, 16, 24... LCM = 24. (2) Prime Factorization Method: Break each number into prime factors, then multiply the highest powers of all primes. Example: 12 = 2² × 3, 18 = 2 × 3². LCM = 2² × 3² = 36. (3) GCF Formula Method (for 2 numbers): LCM(a,b) = (a × b) / GCF(a,b). Example: LCM(12,18) = (12×18) / 6 = 36. The GCF method is fastest for two numbers, while prime factorization works best for multiple numbers.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the relationship between LCM and GCF?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `LCM and GCF (Greatest Common Factor) have a fundamental mathematical relationship: LCM(a,b) × GCF(a,b) = a × b. This means if you know the LCM, you can find the GCF, and vice versa. Example: For 12 and 18, LCM = 36 and GCF = 6. Check: 36 × 6 = 216, and 12 × 18 = 216 ✓. This relationship only holds for two numbers. For coprime numbers (GCF = 1), the LCM equals their product. For numbers where one divides the other, the LCM equals the larger number. Understanding this relationship helps verify calculations and provides insight into number theory.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you find LCM of fractions?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `To find the LCM of fractions, use this formula: LCM of fractions = LCM(numerators) / GCF(denominators). Steps: (1) Find the LCM of all numerators, (2) Find the GCF of all denominators, (3) Divide LCM of numerators by GCF of denominators. Example: Find LCM of 2/3 and 4/6. Numerators: 2, 4 → LCM = 4. Denominators: 3, 6 → GCF = 3. LCM = 4/3. However, when adding/subtracting fractions, you typically need the LCM of just the denominators (called the Least Common Denominator or LCD). Example: 1/4 + 1/6 needs LCD of 4 and 6, which is 12. Convert to 3/12 + 2/12 = 5/12.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the LCM of three or more numbers?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `To find the LCM of three or more numbers, calculate progressively: find LCM of first two numbers, then find LCM of that result with the third number, and so on. Example: Find LCM(4, 6, 9). Step 1: LCM(4, 6) = 12. Step 2: LCM(12, 9) = 36. Final answer: 36. Alternatively, use prime factorization: write each number as a product of primes, then multiply the highest power of each prime factor. Example: 4 = 2², 6 = 2×3, 9 = 3². LCM = 2² × 3² = 4 × 9 = 36. The prime factorization method is often more efficient for multiple numbers and helps visualize why the LCM is what it is.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What are real-world applications of LCM?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `LCM has many practical applications: (1) Fractions: Finding common denominators for adding 1/4 + 1/6 requires LCM(4,6) = 12. (2) Scheduling: If one bus arrives every 15 minutes and another every 20 minutes, they arrive together every LCM(15,20) = 60 minutes. (3) Music: Synchronizing different rhythms requires finding LCM of beat counts. (4) Gears: When two gears with different teeth counts mesh, they return to original position after LCM rotations. (5) Tile Patterns: Creating repeating patterns with tiles of different sizes uses LCM to find the smallest repeat unit. (6) Production Planning: Scheduling machines that run at different cycle times. Understanding LCM helps solve these problems efficiently and recognize patterns in periodic phenomena.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/lcm-calculator'),
        'name': 'How to Calculate LCM',
        'description': 'Step-by-step guide to finding the least common multiple of numbers',
        'totalTime': 'PT3M',
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Enter Numbers',
            'text': `Input 2 to 10 positive integers in the calculator fields. You can add more fields using the "Add Number" button.`,
            'url': getStepUrl('/lcm-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Click Calculate',
            'text': `Press the "Calculate LCM" button to compute the least common multiple and related information.`,
            'url': getStepUrl('/lcm-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Review LCM Result',
            'text': `The calculator displays the LCM prominently at the top, along with the GCF and verification formula.`,
            'url': getStepUrl('/lcm-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Check Prime Factorization',
            'text': `Review how each number breaks down into prime factors, which helps understand why the LCM is what it is.`,
            'url': getStepUrl('/lcm-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            'position': 5,
            'name': 'Study Step-by-Step Solution',
            'text': `Examine the detailed calculation steps showing how the LCM was computed using the appropriate method.`,
            'url': getStepUrl('/lcm-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            'position': 6,
            'name': 'Visualize Multiples',
            'text': `For two numbers, see the first 10 multiples of each highlighted, with the LCM shown in green as the first common multiple.`,
            'url': getStepUrl('/lcm-calculator', 6)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/lcm-calculator'),
        'headline': 'LCM Calculator - Complete Guide to Least Common Multiple',
        'description': `Comprehensive guide to calculating LCM with formulas, methods, examples, and practical applications in math and real life.`,
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
      <h1 className="sr-only">LCM Calculator - Least Common Multiple Calculator with Steps</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Lcm Calculator"
        calculatorUrl="/lcm-calculator"
      />

      {/* Calculator Component */}
      <LCMCalculator />

      {/* Educational Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About LCM Calculator</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our <strong>LCM Calculator</strong> is a free, comprehensive online tool designed to find the Least Common Multiple of 2 to 10 positive integers instantly. Whether you're a student learning number theory, a teacher creating math exercises, or anyone needing to find common multiples for fractions or scheduling problems, our calculator provides accurate results with detailed explanations, prime factorization, and step-by-step solutions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Understanding LCM is fundamental to many areas of mathematics and practical applications. Our calculator not only computes the LCM but also shows the relationship with GCF (Greatest Common Factor), visualizes multiples, displays prime factorizations, and provides comprehensive educational content to help you understand the underlying concepts and methods.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding LCM: The Basics</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is LCM?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The <strong>Least Common Multiple (LCM)</strong>, also called the Lowest Common Multiple or Smallest Common Multiple, is the smallest positive integer that is a multiple of all given numbers. In other words, it's the smallest number that all the input numbers divide into evenly without leaving a remainder.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example</h4>
            <p className="text-gray-700 mb-2">Find LCM(6, 8):</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Multiples of 6: 6, 12, 18, <strong className="text-blue-700">24</strong>, 30, 36...</li>
              <li>Multiples of 8: 8, 16, <strong className="text-blue-700">24</strong>, 32, 40...</li>
              <li><strong>LCM(6, 8) = 24</strong> (the first number that appears in both lists)</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Properties of LCM</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Always ≥ largest input:</strong> LCM(a,b) ≥ max(a,b)</li>
            <li><strong>Divisibility:</strong> The LCM is divisible by all input numbers</li>
            <li><strong>Uniqueness:</strong> There is only one LCM for any set of numbers</li>
            <li><strong>Commutative:</strong> LCM(a,b) = LCM(b,a)</li>
            <li><strong>With 1:</strong> LCM(a, 1) = a for any positive integer a</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Methods to Calculate LCM</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Method 1: Listing Multiples</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The simplest method is to list the multiples of each number until you find the smallest common one. This works well for small numbers.
          </p>
          
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example: LCM(4, 6)</h4>
            <div className="space-y-2 text-gray-700">
              <p><strong>Multiples of 4:</strong> 4, 8, <span className="font-bold text-green-700">12</span>, 16, 20, 24...</p>
              <p><strong>Multiples of 6:</strong> 6, <span className="font-bold text-green-700">12</span>, 18, 24...</p>
              <p className="text-green-700 font-bold mt-3">LCM(4, 6) = 12</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Method 2: Prime Factorization</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Break each number into prime factors, then take the highest power of each prime that appears. This is the most efficient method for multiple numbers.
          </p>
          
          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example: LCM(12, 18, 20)</h4>
            <div className="space-y-2 text-gray-700 font-mono text-sm">
              <p>Step 1: Prime factorization</p>
              <p>12 = 2² × 3¹</p>
              <p>18 = 2¹ × 3²</p>
              <p>20 = 2² × 5¹</p>
              <p className="mt-3">Step 2: Take highest powers</p>
              <p>Highest power of 2: 2²</p>
              <p>Highest power of 3: 3²</p>
              <p>Highest power of 5: 5¹</p>
              <p className="mt-3">Step 3: Multiply</p>
              <p>LCM = 2² × 3² × 5¹ = 4 × 9 × 5 = 180</p>
              <p className="text-purple-700 font-bold mt-3">LCM(12, 18, 20) = 180</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Method 3: GCF Formula (for 2 numbers)</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            For two numbers, use the relationship: <strong>LCM(a,b) = (a × b) / GCF(a,b)</strong>
          </p>
          
          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example: LCM(24, 36)</h4>
            <div className="space-y-2 text-gray-700 font-mono text-sm">
              <p>Step 1: Find GCF(24, 36) = 12</p>
              <p>Step 2: Apply formula</p>
              <p>LCM(24, 36) = (24 × 36) / 12</p>
              <p>LCM(24, 36) = 864 / 12</p>
              <p className="text-yellow-700 font-bold mt-3">LCM(24, 36) = 72</p>
              <p className="mt-3">Verification: 72 × 12 = 864 = 24 × 36 ✓</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">LCM and GCF Relationship</h2>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            For any two positive integers a and b, there's a beautiful mathematical relationship:
          </p>

          <div className="bg-indigo-50 rounded-lg p-6 mb-6 text-center">
            <p className="font-mono text-2xl font-bold text-indigo-900 mb-2">
              LCM(a,b) × GCF(a,b) = a × b
            </p>
            <p className="text-sm text-gray-600">This relationship holds true for any pair of positive integers</p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why This Relationship Matters</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Verification:</strong> Use it to check if your LCM calculation is correct</li>
            <li><strong>Finding GCF from LCM:</strong> If you know the LCM, you can calculate GCF = (a × b) / LCM</li>
            <li><strong>Finding LCM from GCF:</strong> If you know the GCF, you can calculate LCM = (a × b) / GCF</li>
            <li><strong>Understanding number theory:</strong> It reveals the deep connection between multiplication and common factors</li>
          </ul>

          <div className="bg-red-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example Verification</h4>
            <p className="text-gray-700 mb-3">For numbers 15 and 25:</p>
            <div className="space-y-2 text-gray-700">
              <p>• LCM(15, 25) = 75</p>
              <p>• GCF(15, 25) = 5</p>
              <p>• Check: 75 × 5 = 375</p>
              <p>• Also: 15 × 25 = 375</p>
              <p className="text-red-700 font-bold mt-3">✓ Relationship verified: LCM × GCF = a × b</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            <strong>Important Note:</strong> This simple product relationship only works for two numbers. For three or more numbers, the relationship becomes more complex and doesn't follow this simple formula.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Special Cases and Patterns</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Coprime Numbers (GCF = 1)</h3>
              <p className="text-gray-700 mb-2">
                When two numbers have no common factors other than 1, their LCM equals their product.
              </p>
              <p className="text-gray-700 font-mono text-sm">
                Example: LCM(7, 11) = 7 × 11 = 77
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">One Number Divides Another</h3>
              <p className="text-gray-700 mb-2">
                If one number is a multiple of the other, the LCM is the larger number.
              </p>
              <p className="text-gray-700 font-mono text-sm">
                Example: LCM(6, 18) = 18 (because 18 = 6 × 3)
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Identical Numbers</h3>
              <p className="text-gray-700 mb-2">
                The LCM of a number with itself is that number.
              </p>
              <p className="text-gray-700 font-mono text-sm">
                Example: LCM(5, 5) = 5
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Powers of Same Base</h3>
              <p className="text-gray-700 mb-2">
                For powers of the same base, the LCM is the highest power.
              </p>
              <p className="text-gray-700 font-mono text-sm">
                Example: LCM(2³, 2⁵) = LCM(8, 32) = 32 = 2⁵
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Consecutive Numbers</h3>
              <p className="text-gray-700 mb-2">
                Consecutive numbers are always coprime, so their LCM is their product.
              </p>
              <p className="text-gray-700 font-mono text-sm">
                Example: LCM(8, 9) = 8 × 9 = 72
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Practical Applications of LCM</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Adding and Subtracting Fractions</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The most common use of LCM is finding the <strong>Least Common Denominator (LCD)</strong> when adding or subtracting fractions with different denominators.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example: 1/4 + 1/6</h4>
            <div className="space-y-2 text-gray-700">
              <p>Step 1: Find LCD = LCM(4, 6) = 12</p>
              <p>Step 2: Convert fractions</p>
              <p>1/4 = 3/12 (multiply by 3/3)</p>
              <p>1/6 = 2/12 (multiply by 2/2)</p>
              <p>Step 3: Add</p>
              <p className="font-bold">3/12 + 2/12 = 5/12</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Scheduling and Timing Problems</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            LCM helps determine when periodic events occur simultaneously.
          </p>
          
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example: Bus Schedule</h4>
            <p className="text-gray-700 mb-3">
              Bus A arrives every 15 minutes, Bus B arrives every 20 minutes. When do they arrive together?
            </p>
            <div className="space-y-2 text-gray-700">
              <p>LCM(15, 20) = 60 minutes</p>
              <p className="font-bold">They arrive together every 60 minutes (1 hour)</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Music and Rhythm</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Musicians use LCM to synchronize different rhythms and find when beats align.
          </p>
          
          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example: Polyrhythm</h4>
            <p className="text-gray-700 mb-3">
              A drummer plays a pattern every 3 beats while another plays every 4 beats. When do they sync?
            </p>
            <div className="space-y-2 text-gray-700">
              <p>LCM(3, 4) = 12 beats</p>
              <p className="font-bold">The patterns align every 12 beats</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. Gear and Mechanical Systems</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            In mechanical engineering, LCM determines when gears with different tooth counts return to their starting position.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">5. Tiling and Pattern Design</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            When creating repeating patterns with tiles of different sizes, LCM finds the smallest repeat unit.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Mistakes and How to Avoid Them</h2>
          
          <div className="space-y-4">
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
              <h4 className="font-semibold text-gray-900 mb-2">❌ Mistake: Confusing LCM with GCF</h4>
              <p className="text-sm text-gray-700">
                LCM is the smallest common <strong>multiple</strong> (larger than inputs), while GCF is the largest common <strong>factor</strong> (smaller than inputs).
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
              <h4 className="font-semibold text-gray-900 mb-2">❌ Mistake: Simply multiplying numbers</h4>
              <p className="text-sm text-gray-700">
                LCM(6, 8) ≠ 48. The correct answer is 24. Only multiply when numbers are coprime.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
              <h4 className="font-semibold text-gray-900 mb-2">❌ Mistake: Missing prime factors</h4>
              <p className="text-sm text-gray-700">
                When using prime factorization, ensure you include all primes from all numbers, using the highest power of each.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
              <h4 className="font-semibold text-gray-900 mb-2">❌ Mistake: Applying 2-number formula to 3+ numbers</h4>
              <p className="text-sm text-gray-700">
                The formula LCM(a,b) × GCF(a,b) = a × b only works for exactly 2 numbers, not more.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/gcf-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🔢</div>
              <h3 className="font-semibold text-gray-900 mb-1">GCF Calculator</h3>
              <p className="text-sm text-gray-600">Find the greatest common factor</p>
            </Link>
            
            <Link 
              href="/fraction-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">➗</div>
              <h3 className="font-semibold text-gray-900 mb-1">Fraction Calculator</h3>
              <p className="text-sm text-gray-600">Add, subtract, multiply fractions</p>
            </Link>
            
            <Link 
              href="/factor-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🔢</div>
              <h3 className="font-semibold text-gray-900 mb-1">Factor Calculator</h3>
              <p className="text-sm text-gray-600">Find all factors of a number</p>
            </Link>
            
            <Link 
              href="/prime-factorization-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🔢</div>
              <h3 className="font-semibold text-gray-900 mb-1">Prime Factorization</h3>
              <p className="text-sm text-gray-600">Break numbers into prime factors</p>
            </Link>
            
            <Link 
              href="/percentage-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">%</div>
              <h3 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate percentages</p>
            </Link>
            
            <Link 
              href="/ratio-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">⚖️</div>
              <h3 className="font-semibold text-gray-900 mb-1">Ratio Calculator</h3>
              <p className="text-sm text-gray-600">Simplify and calculate ratios</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <p className="text-gray-700 mb-4">
            For more information about LCM and number theory, visit these authoritative sources:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a 
                href="https://www.khanacademy.org/math/pre-algebra/pre-algebra-factors-multiples" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Khan Academy - Factors and Multiples
              </a>
              {' '}for comprehensive video lessons
            </li>
            <li>
              <a 
                href="https://www.mathsisfun.com/least-common-multiple.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Math is Fun - Least Common Multiple
              </a>
              {' '}for interactive tutorials
            </li>
            <li>
              <a 
                href="https://en.wikipedia.org/wiki/Least_common_multiple" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Wikipedia - Least Common Multiple
              </a>
              {' '}for in-depth mathematical concepts
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

