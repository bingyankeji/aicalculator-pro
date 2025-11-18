import { Metadata } from "next";
import Link from "next/link";
import PrimeFactorizationCalculator from "@/components/Calculator/PrimeFactorizationCalculator";
import {
  getUrl,
  getOgImage,
  getBreadcrumbId,
  getWebAppId,
  getFaqId,
  getHowToId,
  getArticleId,
  getStepUrl
} from '@/config/site';

export const metadata: Metadata = {
  title: "Prime Factorization Calculator - Factor Numbers into Primes | AICalculator",
  description: "Free prime factorization calculator with factor tree visualization. Find prime factors, check if a number is prime, and see detailed factorization steps. Perfect for students and math enthusiasts.",
  keywords: [
    "prime factorization calculator",
    "prime factors calculator",
    "factor tree calculator",
    "prime number calculator",
    "factorization calculator",
    "factor calculator",
    "prime decomposition",
    "prime factors",
    "factoring calculator",
    "number factorization",
    "prime factorization",
    "factor tree",
    "prime checker",
    "composite number calculator",
    "divisor calculator"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Prime Factorization Calculator with Factor Tree",
    description: "Calculate prime factorization instantly. Visualize factor trees, find all divisors, and learn about prime numbers with step-by-step solutions.",
    type: "website",
    url: getUrl('/prime-factorization-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('prime'),
        width: 1200,
        height: 630,
        alt: 'Prime Factorization Calculator',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Factorization Calculator",
    description: "Calculate prime factors with visual factor trees and detailed steps.",
    images: [getOgImage('prime')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/prime-factorization-calculator'),
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
  other: {
    'last-modified': new Date().toISOString(),
  },
};

export default function PrimeFactorizationCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": getWebAppId('/prime-factorization-calculator'),
        "name": "Prime Factorization Calculator",
        "url": getUrl('/prime-factorization-calculator'),
        "description": "Free prime factorization calculator with factor tree visualization, prime number checker, and step-by-step factorization process. Find all prime factors and divisors instantly.",
        "applicationCategory": "EducationApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Prime factorization calculation",
          "Factor tree visualization",
          "Prime number detection",
          "All divisors finder",
          "Step-by-step factorization",
          "Exponent notation display",
          "Support for large numbers"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/prime-factorization-calculator'),
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": getUrl('/')
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Math",
            "item": getUrl('/math')
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Prime Factorization Calculator",
            "item": getUrl('/prime-factorization-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/prime-factorization-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is prime factorization?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Prime factorization is the process of breaking down a composite number into its prime factors - the prime numbers that multiply together to give the original number. For example, the prime factorization of 12 is 2 × 2 × 3, or written with exponents as 2² × 3. Every composite number has a unique prime factorization according to the Fundamental Theorem of Arithmetic. Prime factorization is useful in finding greatest common divisors, least common multiples, simplifying fractions, and solving various mathematical problems."
            }
          },
          {
            "@type": "Question",
            "name": "How do I find the prime factors of a number?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To find prime factors, start by dividing the number by the smallest prime (2) as many times as possible. Then try the next prime (3), then 5, 7, 11, and so on, until you reach 1. For example, for 60: divide by 2 to get 30, divide by 2 again to get 15, divide by 3 to get 5, and 5 is prime. So 60 equals 2 × 2 × 3 × 5, or 2² × 3 × 5. Our calculator automates this process and shows you each step, along with a visual factor tree representation."
            }
          },
          {
            "@type": "Question",
            "name": "What is a factor tree?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A factor tree is a visual diagram that shows how a composite number breaks down into its prime factors. You start with the original number at the top, then branch it into two factors. Continue breaking down each composite factor until you reach only prime numbers at the bottom branches. For example, a factor tree for 36 might show: 36 branches to 6 and 6, each 6 branches to 2 and 3. The prime factors (leaves of the tree) are 2, 2, 3, and 3. Factor trees help visualize the factorization process and are commonly used in teaching mathematics."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between factors and prime factors?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Factors are all numbers that divide evenly into a given number, while prime factors are specifically the prime numbers that multiply together to create the original number. For example, the factors of 12 are 1, 2, 3, 4, 6, and 12 (all numbers that divide 12 evenly). However, the prime factors of 12 are only 2 and 3, because 12 equals 2 × 2 × 3. Prime factors are always prime numbers, whereas regular factors can be any divisor including composite numbers and 1."
            }
          },
          {
            "@type": "Question",
            "name": "How do I check if a number is prime?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A number is prime if it has exactly two factors: 1 and itself. To check if a number is prime, try dividing it by all prime numbers up to its square root. If none of these divisions result in a whole number, the number is prime. For example, to check if 29 is prime, test divisibility by 2, 3, and 5 (primes up to square root of 29, which is about 5.4). Since 29 is not divisible by any of these, it is prime. Our calculator automatically detects prime numbers and displays them with special highlighting."
            }
          },
          {
            "@type": "Question",
            "name": "Why is prime factorization unique?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Fundamental Theorem of Arithmetic states that every integer greater than 1 has a unique prime factorization (except for the order of factors). This means that regardless of which factors you break down first, you will always end up with the same set of prime factors. For example, 60 can be factored as 2 × 30, 3 × 20, 4 × 15, or 5 × 12, but ultimately all paths lead to the unique prime factorization of 2² × 3 × 5. This property makes prime factorization a fundamental concept in number theory and cryptography."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/prime-factorization-calculator'),
        "name": "How to Use the Prime Factorization Calculator",
        "description": "Step-by-step guide to finding prime factors and understanding factor trees.",
        "totalTime": "PT2M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": {
          "@type": "HowToTool",
          "name": "Prime Factorization Calculator"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Your Number",
            "text": "Type any positive integer you want to factor into the input field. The calculator supports numbers up to 1 billion.",
            "url": getStepUrl('/prime-factorization-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Click Calculate",
            "text": "Press the Calculate button to start the prime factorization process. The calculator will immediately analyze your number.",
            "url": getStepUrl('/prime-factorization-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "View Prime Factorization",
            "text": "See the complete prime factorization in standard form with exponents, such as 2² × 3 × 5 for the number 60.",
            "url": getStepUrl('/prime-factorization-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Explore the Factor Tree",
            "text": "Examine the visual factor tree diagram showing how the number breaks down step by step into its prime factors.",
            "url": getStepUrl('/prime-factorization-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Review All Factors",
            "text": "Check the complete list of all factors (divisors) of your number, not just the prime factors.",
            "url": getStepUrl('/prime-factorization-calculator', 5)
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Study the Steps",
            "text": "Follow the detailed calculation steps to understand exactly how the factorization was performed.",
            "url": getStepUrl('/prime-factorization-calculator', 6)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/prime-factorization-calculator'),
        "headline": "Prime Factorization Calculator - Complete Guide",
        "description": "Learn about prime factorization, factor trees, and how to find prime factors of any number.",
        "author": {
          "@type": "Organization",
          "name": "AICalculator.pro",
          "url": getUrl('/')
        },
        "publisher": {
          "@type": "Organization",
          "name": "AICalculator.pro",
          "logo": {
            "@type": "ImageObject",
            "url": getUrl('/logo.png')
          }
        },
        "datePublished": "2024-01-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "image": getOgImage('prime'),
        "articleBody": "Prime factorization is the process of expressing a composite number as a product of prime numbers. Understanding prime factorization is fundamental to many areas of mathematics including number theory, algebra, and cryptography. This guide covers factor trees, prime detection, and practical applications of prime factorization."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h1 className="sr-only">Prime Factorization Calculator - Factor Numbers into Prime Factors</h1>

      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/math" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Math</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Prime Factorization Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <PrimeFactorizationCalculator />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Prime Factorization</h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">What You Will Learn</h3>
            <ul className="space-y-2 text-blue-800">
              <li>✓ What prime factorization is and why it matters</li>
              <li>✓ How to find prime factors of any number</li>
              <li>✓ Understanding and creating factor trees</li>
              <li>✓ The Fundamental Theorem of Arithmetic</li>
              <li>✓ Practical applications of prime factorization</li>
              <li>✓ Tips and tricks for quick factorization</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What is Prime Factorization?</h3>
          
          <p className="text-gray-700 mb-4">
            Prime factorization, also known as prime decomposition, is the process of expressing a composite number as a product of prime numbers. A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. When we break down a composite number into its prime factors, we are essentially finding the building blocks that multiply together to create that number.
          </p>

          <p className="text-gray-700 mb-4">
            For example, the number 60 can be expressed as 2 × 2 × 3 × 5, or in exponential form as 2² × 3 × 5. This representation is unique for every number according to the Fundamental Theorem of Arithmetic, which states that every integer greater than 1 either is prime itself or can be represented as a unique product of prime numbers (up to the order of the factors).
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Find Prime Factors</h3>

          <p className="text-gray-700 mb-4">
            The process of finding prime factors follows a systematic approach:
          </p>

          <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
            <li><strong>Start with the smallest prime (2):</strong> Divide your number by 2 as many times as possible until it is no longer divisible by 2.</li>
            <li><strong>Move to the next prime (3):</strong> Continue dividing by 3 as many times as possible.</li>
            <li><strong>Continue with successive primes:</strong> Try 5, 7, 11, 13, and so on, only testing prime numbers.</li>
            <li><strong>Stop at the square root:</strong> You only need to test primes up to the square root of your remaining number.</li>
            <li><strong>Collect all factors:</strong> All the prime numbers you divided by are your prime factors.</li>
          </ol>

          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Example: Factoring 360</h4>
            <div className="space-y-2 text-sm font-mono text-gray-800">
              <p>360 ÷ 2 = 180</p>
              <p>180 ÷ 2 = 90</p>
              <p>90 ÷ 2 = 45</p>
              <p>45 ÷ 3 = 15</p>
              <p>15 ÷ 3 = 5</p>
              <p>5 is prime</p>
              <p className="mt-4 pt-4 border-t border-gray-300 font-bold">
                Result: 360 = 2³ × 3² × 5
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding Factor Trees</h3>

          <p className="text-gray-700 mb-4">
            A factor tree is a visual representation of the prime factorization process. It is called a tree because it branches out, with each composite number splitting into two factors until only prime numbers remain at the ends of the branches (the leaves).
          </p>

          <p className="text-gray-700 mb-4">
            Factor trees are particularly useful for teaching and learning because they make the abstract process of factorization concrete and visual. Different people might create different-looking factor trees for the same number (by choosing different initial factors), but all factor trees will ultimately produce the same set of prime factors.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Applications of Prime Factorization</h3>

          <p className="text-gray-700 mb-4">
            Prime factorization is not just a mathematical exercise—it has numerous practical applications:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg border border-gray-300">
              <h4 className="font-semibold text-gray-900 mb-3">🔐 Cryptography</h4>
              <p className="text-sm text-gray-700">
                Modern encryption systems like RSA rely on the difficulty of factoring large numbers into primes. The security of online transactions depends on this mathematical principle.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-300">
              <h4 className="font-semibold text-gray-900 mb-3">🔢 Finding GCD and LCM</h4>
              <p className="text-sm text-gray-700">
                Prime factorization makes it easy to find the Greatest Common Divisor and Least Common Multiple of numbers, essential for fraction operations and problem solving.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-300">
              <h4 className="font-semibold text-gray-900 mb-3">📊 Simplifying Fractions</h4>
              <p className="text-sm text-gray-700">
                Prime factors help identify common factors in numerators and denominators, making it easier to reduce fractions to their simplest form.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-300">
              <h4 className="font-semibold text-gray-900 mb-3">🎓 Number Theory</h4>
              <p className="text-sm text-gray-700">
                Prime factorization is fundamental to understanding divisibility, perfect numbers, and many other concepts in advanced mathematics.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tips for Quick Factorization</h3>

          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li><strong>Divisibility by 2:</strong> Any even number is divisible by 2</li>
            <li><strong>Divisibility by 3:</strong> If the sum of digits is divisible by 3, the number is divisible by 3</li>
            <li><strong>Divisibility by 5:</strong> Numbers ending in 0 or 5 are divisible by 5</li>
            <li><strong>Use our calculator:</strong> For large numbers or quick verification, our calculator provides instant results with visual factor trees</li>
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What is prime factorization?</h3>
            <p className="text-gray-700">
              Prime factorization is the process of breaking down a composite number into its prime factors. Every composite number has a unique prime factorization. For example, 12 equals 2 × 2 × 3, which can be written as 2² × 3. Our calculator shows you the complete factorization along with a visual factor tree.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I find the prime factors of a number?</h3>
            <p className="text-gray-700">
              Start by dividing the number by the smallest prime (2) repeatedly until it is no longer divisible. Then try 3, 5, 7, and other primes in order. Continue until you reach 1. For example, to factor 60: divide by 2 twice to get 15, then divide by 3 to get 5, which is prime. Result: 60 equals 2² × 3 × 5.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What is a factor tree?</h3>
            <p className="text-gray-700">
              A factor tree is a visual diagram showing how a number breaks down into prime factors. You start with the original number, branch it into two factors, and continue breaking down composite factors until only primes remain. Our calculator generates interactive factor trees automatically.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What is the difference between factors and prime factors?</h3>
            <p className="text-gray-700">
              Factors are all numbers that divide evenly into a given number, while prime factors are only the prime numbers that multiply together to create the original number. For 12, the factors are 1, 2, 3, 4, 6, and 12, but the prime factors are only 2 and 3.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I check if a number is prime?</h3>
            <p className="text-gray-700">
              A number is prime if it has exactly two factors: 1 and itself. To check, try dividing by all primes up to its square root. If none divide evenly, the number is prime. Our calculator automatically detects and highlights prime numbers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Why is prime factorization unique?</h3>
            <p className="text-gray-700">
              The Fundamental Theorem of Arithmetic guarantees that every integer greater than 1 has a unique prime factorization (except for order). No matter which factors you break down first, you will always end up with the same prime factors. This makes prime factorization a fundamental concept in mathematics.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Math Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/percentage-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">%</div>
            <h3 className="font-semibold text-gray-900">Percentage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate percentages easily</p>
          </Link>

          <Link
            href="/fraction-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">¼</div>
            <h3 className="font-semibold text-gray-900">Fraction Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Add, subtract, multiply fractions</p>
          </Link>

          <Link
            href="/scientific-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔬</div>
            <h3 className="font-semibold text-gray-900">Scientific Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Advanced calculations</p>
          </Link>

          <Link
            href="/lcm-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔢</div>
            <h3 className="font-semibold text-gray-900">LCM Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Least common multiple</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

