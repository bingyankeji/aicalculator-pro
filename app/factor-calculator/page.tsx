import { Metadata } from 'next';
import FactorCalculator from '@/components/Calculator/FactorCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Factor Calculator - Find All Factors & Prime Factorization | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Free factor calculator finds all factors, prime factorization, factor pairs, and divisors of any number. Instant analysis with perfect number detection and factor visualization.`,
  keywords: [
    'factor calculator',
    'factorization calculator',
    'prime factorization calculator',
    'find factors',
    'divisor calculator',
    'factor pairs',
    'prime factors',
    'number factorization',
    'factor finder',
    'factors of a number',
    'prime number calculator',
    'composite number',
    'perfect number',
    'factor tree',
    'greatest common factor',
    'math calculator',
    'number theory',
    'factoring calculator',
    'divisibility calculator',
    'factor analysis'
  ],
  alternates: {
    canonical: getUrl('/factor-calculator')
  },
  openGraph: {
    title: `Factor Calculator - Complete Factorization Tool`,
    description: `Find all factors and prime factorization instantly. Perfect for students and teachers.`,
    url: getUrl('/factor-calculator'),
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Factor Calculator - Factorization & Prime Factors`,
    description: `Instant factor analysis with prime factorization and perfect number detection.`,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function FactorCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/factor-calculator'),
        'name': 'Factor Calculator',
        'url': getUrl('/factor-calculator'),
        'description': `Professional factor calculator finds all factors, divisors, and prime factorization of any positive integer up to 10 million. Instantly analyzes numbers to identify primes, composites, perfect squares, perfect numbers, and more. Displays factor pairs, prime factor breakdown, and sum of divisors with detailed explanations.`,
        'applicationCategory': 'EducationApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          'Find all factors of any number',
          'Prime factorization with exponents',
          'Factor pairs visualization',
          'Prime number detection',
          'Perfect number identification',
          'Perfect square and cube detection',
          'Sum of all factors',
          'Sum of proper divisors',
          'Abundant and deficient number classification',
          'Intelligent number insights'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/factor-calculator'),
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
            'item': getUrl('/math')
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Factor Calculator',
            'item': getUrl('/factor-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/factor-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What are factors of a number?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Factors (or divisors) are whole numbers that divide evenly into another number without leaving a remainder. When you multiply two factors together, you get the original number. Key properties of factors: (1) Every number has at least two factors: 1 and itself. (2) Factors always come in pairs that multiply to give the original number. (3) The number 1 is a factor of every number. (4) Every number is a factor of itself. Example: Factors of 12: The factors of 12 are 1, 2, 3, 4, 6, and 12 because: 1 × 12 = 12, 2 × 6 = 12, 3 × 4 = 12. Each of these numbers divides 12 evenly: 12 ÷ 1 = 12, 12 ÷ 2 = 6, 12 ÷ 3 = 4, 12 ÷ 4 = 3, 12 ÷ 6 = 2, 12 ÷ 12 = 1. How to find factors: Start with 1 and the number itself. Try dividing by 2, 3, 4, etc., up to the square root. When you find a divisor, both the divisor and the quotient are factors. Our calculator automates this process and shows all factors instantly, along with factor pairs, prime factorization, and special number properties.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is prime factorization?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Prime factorization is the process of breaking down a composite number into a product of prime numbers. Every composite number has a unique prime factorization (Fundamental Theorem of Arithmetic). Prime factorization format: Number = p₁^a₁ × p₂^a₂ × p₃^a₃ × ... where p₁, p₂, p₃ are prime numbers and a₁, a₂, a₃ are their exponents (how many times each prime appears). Examples: 12 = 2² × 3 = 2 × 2 × 3. The prime factors are 2 and 3. 2 appears twice (exponent 2), 3 appears once (exponent 1). 24 = 2³ × 3 = 2 × 2 × 2 × 3. The prime factors are 2 and 3. 2 appears three times, 3 appears once. 100 = 2² × 5² = 2 × 2 × 5 × 5. The prime factors are 2 and 5, each appearing twice. How to find prime factorization: Divide by the smallest prime (2) as many times as possible. Continue with the next smallest primes (3, 5, 7, 11...). Stop when the remaining number is 1. Why prime factorization is useful: Finding GCF and LCM of multiple numbers. Simplifying fractions and radicals. Solving number theory problems. Understanding divisibility rules. Cryptography (RSA encryption uses prime factorization). Our calculator shows complete prime factorization with exponents, lists all prime factors, and explains the breakdown step by step.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the difference between prime and composite numbers?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Prime and composite numbers are two fundamental classifications in number theory. Prime Numbers: Definition: A prime number has exactly 2 factors: 1 and itself. Cannot be divided evenly by any other number. Properties: All primes except 2 are odd (2 is the only even prime). Primes are the building blocks of all numbers. There are infinitely many prime numbers. Examples: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47... Composite Numbers: Definition: A composite number has more than 2 factors. Can be divided evenly by numbers other than 1 and itself. Can be broken down into prime factors. Properties: All even numbers except 2 are composite. Has at least 3 factors (1, itself, and at least one other). Examples: 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25... Special case - The number 1: 1 is neither prime nor composite. It has only 1 factor (itself). It is called a unit in number theory. Quick identification: Numbers ending in 0, 2, 4, 6, 8 (except 2) are composite. Numbers ending in 5 (except 5) are composite. Use divisibility rules for 3, 7, 11, etc., to test larger numbers. Real-world importance: Primes are used in cryptography and computer security. Composite numbers appear in patterns, arrays, and rectangular arrangements. Prime testing is crucial for random number generation and coding theory. Our calculator instantly identifies whether a number is prime or composite and shows all factors for composite numbers.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What are perfect numbers?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `A perfect number is a positive integer that equals the sum of its proper divisors (all factors except the number itself). Perfect numbers are rare and have fascinated mathematicians for over 2,000 years. First perfect numbers: 6: Proper divisors are 1, 2, 3. Sum: 1 + 2 + 3 = 6 ✓. 28: Proper divisors are 1, 2, 4, 7, 14. Sum: 1 + 2 + 4 + 7 + 14 = 28 ✓. 496: Proper divisors sum to 496 ✓. 8128: Proper divisors sum to 8128 ✓. The fifth perfect number is 33,550,336. Related classifications: Perfect: Sum of proper divisors equals the number. Abundant: Sum of proper divisors is greater than the number (e.g., 12: 1+2+3+4+6 = 16 > 12). Deficient: Sum of proper divisors is less than the number (e.g., 8: 1+2+4 = 7 < 8). Properties of perfect numbers: All known perfect numbers are even. Every even perfect number has the form 2^(p-1) × (2^p - 1) where 2^p - 1 is a prime (Mersenne prime). It is unknown whether any odd perfect numbers exist. Only 51 perfect numbers are currently known (as of 2023). The largest known perfect number has over 49 million digits. Historical significance: Known to ancient Greek mathematicians (Euclid, ~300 BCE). Studied by Pythagoreans for mystical properties. Connected to Mersenne primes in modern number theory. Used in computer science for testing algorithms. Our calculator automatically detects perfect numbers and classifies all numbers as perfect, abundant, or deficient.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do I find factor pairs?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Factor pairs are two numbers that multiply together to give the original number. Every factor has a corresponding pair, and finding factor pairs is a systematic way to identify all factors. Method to find factor pairs: Start with 1 and the number itself (always a factor pair). Test each integer from 2 up to the square root of the number. For each divisor found, pair it with the quotient (number ÷ divisor). Stop when you reach the square root (to avoid duplicates). Example: Factor pairs of 24. Start: 1 × 24 = 24. Test 2: 2 × 12 = 24. Test 3: 3 × 8 = 24. Test 4: 4 × 6 = 24. Stop at √24 ≈ 4.9. Factor pairs: (1, 24), (2, 12), (3, 8), (4, 6). All factors: 1, 2, 3, 4, 6, 8, 12, 24. Special case - Perfect squares: Perfect squares have an odd number of factors because one factor pairs with itself. Example: 36 = 6 × 6. Factor pairs: (1, 36), (2, 18), (3, 12), (4, 9), (6, 6). The factor 6 pairs with itself. Why factor pairs are useful: Factoring quadratic expressions (x² + bx + c). Finding dimensions of rectangles with a given area. Solving problems involving arrays and groups. Understanding divisibility and multiplication. Simplifying algebraic fractions. Optimization problems (maximizing area with fixed perimeter). Our calculator displays all factor pairs in an organized grid, making it easy to see the relationship between factors and understand the structure of the number.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the sum of divisors function?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The sum of divisors function, denoted σ(n), is the sum of all positive divisors (factors) of a number n, including 1 and the number itself. This function is important in number theory and has many applications. Sum of divisors notation: σ(n) = sum of all divisors of n. Example: σ(12) = 1 + 2 + 3 + 4 + 6 + 12 = 28. Sum of proper divisors: Often denoted s(n) or σ(n) - n. This excludes the number itself, only summing proper divisors. Example: s(12) = 1 + 2 + 3 + 4 + 6 = 16. Properties and formulas: For a prime p: σ(p) = p + 1 (only factors are 1 and p). For a prime power p^k: σ(p^k) = 1 + p + p² + ... + p^k = (p^(k+1) - 1) / (p - 1). For coprime numbers: σ(mn) = σ(m) × σ(n) (multiplicative function). Example: σ(6) = σ(2 × 3) = σ(2) × σ(3) = (1+2) × (1+3) = 3 × 4 = 12. Applications: Perfect number test: n is perfect if σ(n) = 2n, or equivalently s(n) = n. Abundant number: σ(n) > 2n, or s(n) > n. Deficient number: σ(n) < 2n, or s(n) < n. Amicable numbers: Two numbers where s(a) = b and s(b) = a. Example: s(220) = 284 and s(284) = 220. Used in cryptography, computer algorithms, and pure mathematics research. Historical examples: σ(6) = 1 + 2 + 3 + 6 = 12 = 2 × 6 → 6 is perfect. σ(28) = 1 + 2 + 4 + 7 + 14 + 28 = 56 = 2 × 28 → 28 is perfect. σ(12) = 1 + 2 + 3 + 4 + 6 + 12 = 28 > 2 × 12 = 24 → 12 is abundant. σ(8) = 1 + 2 + 4 + 8 = 15 < 2 × 8 = 16 → 8 is deficient. Our calculator computes both σ(n) (sum of all factors) and s(n) (sum of proper divisors), and uses these to classify the number as perfect, abundant, or deficient with clear explanations.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/factor-calculator'),
        'name': 'How to Find All Factors of a Number',
        'description': 'Step-by-step guide to finding factors and prime factorization',
        'totalTime': 'PT2M',
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Enter the Number',
            'text': `Input any positive integer from 1 to 10,000,000 that you want to factorize.`,
            'url': getStepUrl('/factor-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Click Calculate',
            'text': `Press the Calculate Factors button to analyze the number. The calculator will instantly find all factors.`,
            'url': getStepUrl('/factor-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Review All Factors',
            'text': `See the complete list of factors (divisors) displayed in numerical order. Prime factors are highlighted in purple.`,
            'url': getStepUrl('/factor-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Check Factor Pairs',
            'text': `View factor pairs that multiply to give your number. Perfect for understanding divisibility and multiplication relationships.`,
            'url': getStepUrl('/factor-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            'position': 5,
            'name': 'See Prime Factorization',
            'text': `Review the prime factorization showing the number as a product of prime powers (e.g., 24 = 2³ × 3).`,
            'url': getStepUrl('/factor-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            'position': 6,
            'name': 'Understand Number Properties',
            'text': `Learn whether the number is prime, composite, perfect, abundant, deficient, a perfect square, or has other special properties.`,
            'url': getStepUrl('/factor-calculator', 6)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/factor-calculator'),
        'headline': 'Factor Calculator - Complete Guide to Factorization',
        'description': `Comprehensive guide to finding factors, understanding prime factorization, and analyzing number properties including perfect numbers and divisors.`,
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
      <h1 className="sr-only">Factor Calculator - Find All Factors & Prime Factorization</h1>
      
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
              <Link href="/math" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Math Calculators</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Factor Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <FactorCalculator />

      {/* Educational Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Factor Calculator</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our <strong>Factor Calculator</strong> is a comprehensive tool for finding all factors, divisors, and prime factorization of any positive integer. Whether you're a student learning about number theory, a teacher preparing math lessons, or anyone working with divisibility and factorization, this calculator provides instant, detailed analysis of any number up to 10 million.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator not only lists all factors but also identifies special number properties like prime numbers, perfect squares, perfect numbers, and provides complete prime factorization with visual representation. It's perfect for homework help, test preparation, and understanding the fundamental structure of numbers.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Factors</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What are Factors?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Factors</strong> (also called divisors) are whole numbers that divide evenly into another number without leaving a remainder. When you multiply two factors together, you get the original number.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-6 border-2 border-blue-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example: Factors of 24</h4>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Factors:</strong> 1, 2, 3, 4, 6, 8, 12, 24</li>
              <li><strong>Factor Pairs:</strong> (1×24), (2×12), (3×8), (4×6)</li>
              <li><strong>Prime Factorization:</strong> 2³ × 3 = 2 × 2 × 2 × 3</li>
              <li><strong>Factor Count:</strong> 8 factors total</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Prime Factorization</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Every composite number can be expressed as a unique product of prime numbers. This is called <strong>prime factorization</strong> and is guaranteed by the Fundamental Theorem of Arithmetic.
          </p>

          <div className="bg-purple-50 rounded-lg p-6 mb-6 border-2 border-purple-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Prime Factorization Examples</h4>
            <ul className="space-y-2 text-gray-700 font-mono text-sm">
              <li>12 = 2² × 3</li>
              <li>24 = 2³ × 3</li>
              <li>100 = 2² × 5²</li>
              <li>144 = 2⁴ × 3²</li>
              <li>1000 = 2³ × 5³</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Numbers</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Prime vs. Composite</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">🌟 Prime Numbers</h4>
              <p className="text-sm text-gray-700 mb-2">Have exactly 2 factors: 1 and itself</p>
              <p className="text-xs text-gray-600">Examples: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29...</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">🔢 Composite Numbers</h4>
              <p className="text-sm text-gray-700 mb-2">Have more than 2 factors</p>
              <p className="text-xs text-gray-600">Examples: 4, 6, 8, 9, 10, 12, 14, 15, 16, 18...</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Perfect Numbers</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>perfect number</strong> equals the sum of its proper divisors (all factors except the number itself). These rare numbers have fascinated mathematicians for over 2,000 years.
          </p>

          <div className="bg-green-50 rounded-lg p-6 mb-6 border-2 border-green-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">First Perfect Numbers</h4>
            <ul className="space-y-2 text-gray-700">
              <li><strong>6:</strong> 1 + 2 + 3 = 6</li>
              <li><strong>28:</strong> 1 + 2 + 4 + 7 + 14 = 28</li>
              <li><strong>496:</strong> Sum of proper divisors = 496</li>
              <li><strong>8128:</strong> Sum of proper divisors = 8128</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Math Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/gcf-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🔢</div>
              <h3 className="font-semibold text-gray-900 mb-1">GCF Calculator</h3>
              <p className="text-sm text-gray-600">Greatest Common Factor</p>
            </Link>
            
            <Link 
              href="/lcm-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🔣</div>
              <h3 className="font-semibold text-gray-900 mb-1">LCM Calculator</h3>
              <p className="text-sm text-gray-600">Least Common Multiple</p>
            </Link>
            
            <Link 
              href="/prime-number-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🌟</div>
              <h3 className="font-semibold text-gray-900 mb-1">Prime Number Checker</h3>
              <p className="text-sm text-gray-600">Test if number is prime</p>
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
              href="/fraction-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">➗</div>
              <h3 className="font-semibold text-gray-900 mb-1">Fraction Calculator</h3>
              <p className="text-sm text-gray-600">Add, subtract, multiply fractions</p>
            </Link>

            <Link 
              href="/exponent-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">^</div>
              <h3 className="font-semibold text-gray-900 mb-1">Exponent Calculator</h3>
              <p className="text-sm text-gray-600">Calculate powers</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <p className="text-gray-700 mb-4">
            For more information about factors and number theory:
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
            </li>
            <li>
              <a 
                href="https://en.wikipedia.org/wiki/Divisor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Wikipedia - Divisors and Factorization
              </a>
            </li>
            <li>
              <a 
                href="https://mathworld.wolfram.com/PrimeFactorization.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Wolfram MathWorld - Prime Factorization
              </a>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

