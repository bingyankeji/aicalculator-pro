import { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from "next/link";
import NumberSequenceCalculator from "@/components/Calculator/NumberSequenceCalculator";
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
  title: "Number Sequence Calculator - Arithmetic, Geometric, Fibonacci | AICalculator",
  description: "Free number sequence calculator for arithmetic, geometric, and Fibonacci sequences. Calculate nth term, sum of n terms, formulas, and visualize patterns with charts.",
  keywords: [
    "number sequence calculator",
    "arithmetic sequence calculator",
    "geometric sequence calculator",
    "fibonacci calculator",
    "nth term calculator",
    "sequence sum calculator",
    "sequence formula",
    "series calculator"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Number Sequence Calculator",
    description: "Calculate arithmetic, geometric, and Fibonacci sequences with formulas and visualizations.",
    type: "website",
    url: getUrl('/number-sequence-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('sequence'),
        width: 1200,
        height: 630,
        alt: 'Number Sequence Calculator',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Number Sequence Calculator",
    description: "Calculate and visualize number sequences.",
    images: [getOgImage('sequence')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/number-sequence-calculator'),
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

export default function NumberSequenceCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": getWebAppId('/number-sequence-calculator'),
        "name": "Number Sequence Calculator",
        "url": getUrl('/number-sequence-calculator'),
        "description": "Calculate arithmetic, geometric, and Fibonacci sequences. Find nth terms, sums, formulas, and visualize patterns.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Arithmetic sequence calculation",
          "Geometric sequence calculation",
          "Fibonacci sequence generation",
          "Nth term calculation",
          "Sum of n terms",
          "General formula display",
          "Convergence analysis",
          "Sequence visualization charts"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/number-sequence-calculator'),
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
            "name": "Math Calculators",
            "item": getUrl('/category/math')
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Number Sequence Calculator",
            "item": getUrl('/number-sequence-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/number-sequence-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an arithmetic sequence?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An arithmetic sequence is a sequence where each term differs from the previous term by a constant value called the common difference (d). Formula: an = a1 + (n-1) times d. Example: 2, 5, 8, 11, 14 has d equals 3. The sum of n terms is Sn equals n/2 times (2a1 plus (n-1)d)."
            }
          },
          {
            "@type": "Question",
            "name": "What is a geometric sequence?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A geometric sequence is a sequence where each term is multiplied by a constant value called the common ratio (r). Formula: an equals a1 times r raised to (n-1). Example: 3, 6, 12, 24 has r equals 2. The sum formula is Sn equals a1 times (r to the n minus 1) divided by (r minus 1) when r is not equal to 1."
            }
          },
          {
            "@type": "Question",
            "name": "How does the Fibonacci sequence work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Fibonacci sequence starts with 1, 1 and each subsequent term is the sum of the previous two terms. Sequence: 1, 1, 2, 3, 5, 8, 13, 21, 34. The ratio of consecutive terms converges to the Golden Ratio (approximately 1.618). It appears frequently in nature, art, and computer science."
            }
          },
          {
            "@type": "Question",
            "name": "How do I find the nth term of a sequence?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the general formula for your sequence type. Arithmetic: an equals a1 plus (n minus 1) times d. Geometric: an equals a1 times r to the power of (n minus 1). Fibonacci: calculate recursively or use Binets formula. Our calculator computes nth terms instantly for any sequence type."
            }
          },
          {
            "@type": "Question",
            "name": "When does a sequence converge?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Arithmetic sequences never converge (except constant sequences). Geometric sequences converge to 0 when the absolute value of r is less than 1, and the infinite sum converges to a1 divided by (1 minus r). Geometric sequences diverge when absolute value of r is greater than or equal to 1. Fibonacci sequence does not converge but the ratio of terms converges to the Golden Ratio."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/number-sequence-calculator'),
        "name": "How to Calculate Number Sequences",
        "description": "Step-by-step guide to calculating and analyzing number sequences.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose Sequence Type",
            "text": "Select arithmetic (linear), geometric (exponential), or Fibonacci sequence based on the pattern you need to analyze.",
            "url": getStepUrl('/number-sequence-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Initial Parameters",
            "text": "For arithmetic: enter first term and common difference. For geometric: enter first term and common ratio. Fibonacci uses fixed starting values 1, 1.",
            "url": getStepUrl('/number-sequence-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Specify Terms to Calculate",
            "text": "Enter how many terms to generate (1-100) and which specific term you want to find. The calculator will generate the sequence and highlight the requested term.",
            "url": getStepUrl('/number-sequence-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Review Results",
            "text": "See the nth term value, sum of n terms, general formula, sum formula, convergence analysis, and detailed properties of your sequence.",
            "url": getStepUrl('/number-sequence-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Analyze Visualizations",
            "text": "Study the sequence chart showing term values and cumulative sum chart. Review the complete table of generated terms and real-world applications.",
            "url": getStepUrl('/number-sequence-calculator', 5)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/number-sequence-calculator'),
        "headline": "Understanding Number Sequences: Arithmetic, Geometric, and Fibonacci",
        "description": "Learn how to calculate and analyze different types of number sequences with formulas and applications.",
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
        "image": getOgImage('sequence'),
        "articleBody": "Number sequences are ordered lists of numbers following specific patterns. The three most important types are arithmetic (constant difference), geometric (constant ratio), and Fibonacci (each term is sum of previous two). Understanding sequences is fundamental to mathematics, finance, and computer science."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h1 className="sr-only">
        Number Sequence Calculator - Arithmetic, Geometric, and Fibonacci Sequences
      </h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Number Sequence Calculator"
        calculatorUrl="/number-sequence-calculator"
      />

      <NumberSequenceCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Understanding Number Sequences
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4">
              A number sequence is an ordered list of numbers that follow a specific mathematical pattern or rule. 
              Sequences are fundamental to mathematics and appear in various fields including finance (compound interest), 
              computer science (algorithm analysis), and natural sciences (population growth, radioactive decay).
            </p>
            <p className="text-gray-700 mb-4">
              The three most important types of sequences are arithmetic sequences (where terms differ by a constant), 
              geometric sequences (where terms have a constant ratio), and the Fibonacci sequence (where each term is 
              the sum of the previous two). Understanding these patterns helps solve real-world problems and predict future values.
            </p>
          </div>
        </article>

        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Types of Number Sequences
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Arithmetic Sequence (Linear)
              </h3>
              <p className="text-gray-700 mb-2">
                Each term differs from the previous term by a constant value (common difference d).
              </p>
              <p className="text-sm font-mono bg-gray-50 p-2 rounded mb-2">
                aₙ = a₁ + (n - 1) × d
              </p>
              <p className="text-sm text-gray-600">
                Example: 2, 5, 8, 11, 14 (d = 3)
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Geometric Sequence (Exponential)
              </h3>
              <p className="text-gray-700 mb-2">
                Each term is multiplied by a constant value (common ratio r).
              </p>
              <p className="text-sm font-mono bg-gray-50 p-2 rounded mb-2">
                aₙ = a₁ × r^(n-1)
              </p>
              <p className="text-sm text-gray-600">
                Example: 3, 6, 12, 24, 48 (r = 2)
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fibonacci Sequence
              </h3>
              <p className="text-gray-700 mb-2">
                Each term is the sum of the previous two terms, starting with 1, 1.
              </p>
              <p className="text-sm font-mono bg-gray-50 p-2 rounded mb-2">
                aₙ = aₙ₋₁ + aₙ₋₂
              </p>
              <p className="text-sm text-gray-600">
                Example: 1, 1, 2, 3, 5, 8, 13, 21, 34
              </p>
            </div>
          </div>
        </article>

        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is an arithmetic sequence?
              </h3>
              <p className="text-gray-700">
                An arithmetic sequence is a sequence where each term differs from the previous term by a constant value 
                called the common difference (d). Formula: aₙ = a₁ + (n-1) × d. Example: 2, 5, 8, 11, 14 has d = 3. 
                The sum of n terms is Sₙ = n/2 × (2a₁ + (n-1)d).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is a geometric sequence?
              </h3>
              <p className="text-gray-700">
                A geometric sequence is a sequence where each term is multiplied by a constant value called the common 
                ratio (r). Formula: aₙ = a₁ × r^(n-1). Example: 3, 6, 12, 24 has r = 2. The sum formula is 
                Sₙ = a₁ × (r^n - 1)/(r - 1) when r ≠ 1.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does the Fibonacci sequence work?
              </h3>
              <p className="text-gray-700">
                The Fibonacci sequence starts with 1, 1 and each subsequent term is the sum of the previous two terms. 
                Sequence: 1, 1, 2, 3, 5, 8, 13, 21, 34. The ratio of consecutive terms converges to the Golden Ratio 
                (≈1.618). It appears frequently in nature, art, and computer science.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I find the nth term of a sequence?
              </h3>
              <p className="text-gray-700">
                Use the general formula for your sequence type. Arithmetic: aₙ = a₁ + (n-1) × d. 
                Geometric: aₙ = a₁ × r^(n-1). Fibonacci: calculate recursively or use Binet's formula. 
                Our calculator computes nth terms instantly for any sequence type.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                When does a sequence converge?
              </h3>
              <p className="text-gray-700">
                Arithmetic sequences never converge (except constant sequences). Geometric sequences converge to 0 when 
                |r| less than 1, and the infinite sum converges to a₁/(1-r). Geometric sequences diverge when |r| ≥ 1. 
                Fibonacci sequence does not converge but the ratio of terms converges to the Golden Ratio.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Related Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Related Math Calculators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/prime-factorization-calculator"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">🔢</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Prime Factorization Calculator
            </h3>
            <p className="text-gray-600 text-sm">
              Find prime factors and factor trees
            </p>
          </Link>

          <Link
            href="/matrix-calculator"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">🔤</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Matrix Calculator
            </h3>
            <p className="text-gray-600 text-sm">
              Perform matrix operations
            </p>
          </Link>

          <Link
            href="/percentage-calculator"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">%</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Percentage Calculator
            </h3>
            <p className="text-gray-600 text-sm">
              Calculate percentages easily
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}

