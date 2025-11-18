import { Metadata } from "next";
import Link from "next/link";
import LongDivisionCalculator from "@/components/Calculator/LongDivisionCalculator";
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
  title: "Long Division Calculator - Step-by-Step Solution | AICalculator",
  description: "Free long division calculator with detailed step-by-step solutions. Learn how to divide numbers with our interactive tool showing the complete division process.",
  keywords: [
    "long division calculator",
    "division calculator",
    "long division with steps",
    "division with remainder",
    "step by step division",
    "long division solver",
    "division calculator with steps"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Long Division Calculator",
    description: "Calculate long division with detailed step-by-step solutions and visual explanations.",
    type: "website",
    url: getUrl('/long-division-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('division'),
        width: 1200,
        height: 630,
        alt: 'Long Division Calculator',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Long Division Calculator",
    description: "Calculate and learn long division step-by-step.",
    images: [getOgImage('division')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/long-division-calculator'),
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

export default function LongDivisionCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": getWebAppId('/long-division-calculator'),
        "name": "Long Division Calculator",
        "url": getUrl('/long-division-calculator'),
        "description": "Interactive long division calculator showing complete step-by-step solutions with visual explanations.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Step-by-step division solution",
          "Visual long division format",
          "Quotient and remainder calculation",
          "Interactive step progression",
          "Educational explanations",
          "Answer verification"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/long-division-calculator'),
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
            "name": "Long Division Calculator",
            "item": getUrl('/long-division-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/long-division-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is long division?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Long division is a method for dividing large numbers by breaking down the division process into smaller steps. It involves dividing, multiplying, subtracting, and bringing down the next digit repeatedly until all digits are processed. The result includes a quotient (answer) and possibly a remainder."
            }
          },
          {
            "@type": "Question",
            "name": "How do you check if your long division answer is correct?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To verify your long division answer, use this formula: (Quotient times Divisor) plus Remainder equals Dividend. For example, if 17 divided by 5 equals 3 R 2, check: (3 times 5) plus 2 equals 15 plus 2 equals 17. If the result matches the original dividend, your answer is correct."
            }
          },
          {
            "@type": "Question",
            "name": "What are the steps in long division?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The long division process follows five main steps: 1) Divide - determine how many times the divisor goes into the current number. 2) Multiply - multiply the divisor by the quotient digit. 3) Subtract - subtract the product from the current number. 4) Bring Down - bring down the next digit. 5) Repeat - continue until all digits are used. The final result is the quotient plus any remainder."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between quotient and remainder?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The quotient is the whole number result of division, while the remainder is what is left over after division. For example, 17 divided by 5 equals 3 with remainder 2. The quotient is 3 (how many complete groups of 5 fit into 17) and the remainder is 2 (what is left over)."
            }
          },
          {
            "@type": "Question",
            "name": "Can you do long division with decimals?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can perform long division with decimals by treating them as whole numbers initially. For division with decimal dividends, divide as normal and place the decimal point in the quotient directly above its position in the dividend. For decimal divisors, multiply both dividend and divisor by 10, 100, etc. to make the divisor a whole number, then proceed with normal long division."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/long-division-calculator'),
        "name": "How to Perform Long Division",
        "description": "Step-by-step guide to solving long division problems.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Set Up the Problem",
            "text": "Write the dividend (number being divided) inside the division bracket and the divisor (number dividing) outside on the left.",
            "url": getStepUrl('/long-division-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Divide",
            "text": "Determine how many times the divisor goes into the first digit or digits of the dividend. Write this number above the division bracket.",
            "url": getStepUrl('/long-division-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Multiply",
            "text": "Multiply the divisor by the quotient digit you just wrote. Write the product below the dividend digits you divided into.",
            "url": getStepUrl('/long-division-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Subtract",
            "text": "Subtract the product from the dividend digits above it. Write the difference below. This becomes your new working number.",
            "url": getStepUrl('/long-division-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Bring Down and Repeat",
            "text": "Bring down the next digit of the dividend next to the difference. Repeat steps 2-4 until all digits have been brought down. The final difference is the remainder.",
            "url": getStepUrl('/long-division-calculator', 5)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/long-division-calculator'),
        "headline": "Mastering Long Division: A Complete Guide",
        "description": "Learn how to perform long division with step-by-step explanations and examples.",
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
        "image": getOgImage('division'),
        "articleBody": "Long division is a fundamental mathematical skill that breaks down complex division problems into manageable steps. By following the divide, multiply, subtract, and bring down process, students can solve any division problem systematically."
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
        Long Division Calculator - Step-by-Step Division Solution
      </h1>

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
                Long Division Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <LongDivisionCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What is Long Division?
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4">
              Long division is a systematic method for dividing large numbers that may not divide evenly. 
              It breaks down complex division problems into a series of simpler steps, making it easier to 
              find both the quotient (the result) and remainder (what is left over).
            </p>
            <p className="text-gray-700 mb-4">
              This method is particularly useful when dividing large numbers that cannot be easily divided 
              mentally, and it provides a clear step-by-step process that can be followed for any division problem.
            </p>
          </div>
        </article>

        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is long division?
              </h3>
              <p className="text-gray-700">
                Long division is a method for dividing large numbers by breaking down the division process into 
                smaller steps. It involves dividing, multiplying, subtracting, and bringing down the next digit 
                repeatedly until all digits are processed. The result includes a quotient (answer) and possibly 
                a remainder.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do you check if your long division answer is correct?
              </h3>
              <p className="text-gray-700">
                To verify your long division answer, use this formula: (Quotient × Divisor) + Remainder = Dividend. 
                For example, if 17 ÷ 5 = 3 R 2, check: (3 × 5) + 2 = 15 + 2 = 17. If the result matches the 
                original dividend, your answer is correct.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What are the steps in long division?
              </h3>
              <p className="text-gray-700">
                The long division process follows five main steps: 1) Divide - determine how many times the divisor 
                goes into the current number. 2) Multiply - multiply the divisor by the quotient digit. 3) Subtract - 
                subtract the product from the current number. 4) Bring Down - bring down the next digit. 5) Repeat - 
                continue until all digits are used. The final result is the quotient plus any remainder.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is the difference between quotient and remainder?
              </h3>
              <p className="text-gray-700">
                The quotient is the whole number result of division, while the remainder is what is left over after 
                division. For example, 17 ÷ 5 = 3 with remainder 2. The quotient is 3 (how many complete groups of 5 
                fit into 17) and the remainder is 2 (what is left over).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can you do long division with decimals?
              </h3>
              <p className="text-gray-700">
                Yes, you can perform long division with decimals by treating them as whole numbers initially. For 
                division with decimal dividends, divide as normal and place the decimal point in the quotient directly 
                above its position in the dividend. For decimal divisors, multiply both dividend and divisor by 10, 100, 
                etc. to make the divisor a whole number, then proceed with normal long division.
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
            href="/number-sequence-calculator"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">🔢</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Number Sequence Calculator
            </h3>
            <p className="text-gray-600 text-sm">
              Calculate arithmetic and geometric sequences
            </p>
          </Link>

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

