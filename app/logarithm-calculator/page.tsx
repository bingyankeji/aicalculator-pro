import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import LogarithmCalculator from '@/components/Calculator/LogarithmCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Logarithm Calculator - Log, Ln & Change of Base Calculator | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Free online logarithm calculator for common log (log₁₀), natural log (ln), and any base logarithms. Calculate logs with step-by-step solutions, convert between exponential and logarithmic forms. Perfect for students and professionals.`,
  keywords: [
    'logarithm calculator',
    'log calculator',
    'natural log calculator',
    'ln calculator',
    'common logarithm',
    'log base 10',
    'log base 2',
    'calculate logarithm',
    'logarithm solver',
    'change of base formula',
    'log rules',
    'logarithm properties',
    'exponential to logarithm',
    'log to exponential',
    'logarithm converter',
    'log laws calculator',
    'logarithmic equations',
    'log₁₀ calculator',
    'logₑ calculator',
    'binary logarithm'
  ],
  alternates: {
    canonical: getUrl('/logarithm-calculator')
  },
  openGraph: {
    title: `Logarithm Calculator - Log, Ln & Change of Base Calculator`,
    description: `Free online logarithm calculator for common log (log₁₀), natural log (ln), and any base logarithms. Calculate logs with step-by-step solutions.`,
    url: getUrl('/logarithm-calculator'),
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Logarithm Calculator - Log, Ln & Change of Base Calculator`,
    description: `Free online logarithm calculator for common log (log₁₀), natural log (ln), and any base logarithms. Calculate logs with step-by-step solutions.`,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function LogarithmCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/logarithm-calculator'),
        'name': 'Logarithm Calculator',
        'url': getUrl('/logarithm-calculator'),
        'description': `Calculate common logarithms (log₁₀), natural logarithms (ln), and any base logarithms with step-by-step solutions. Convert between exponential and logarithmic forms.`,
        'applicationCategory': 'CalculatorApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          'Common logarithm calculation (log₁₀)',
          'Natural logarithm calculation (ln)',
          'Any base logarithm calculation',
          'Change of base formula',
          'Exponential to logarithmic conversion',
          'Logarithmic to exponential conversion',
          'Step-by-step solutions',
          'Logarithm rules reference',
          'Instant results',
          'Mobile-friendly interface'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/logarithm-calculator'),
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
            'name': 'Logarithm Calculator',
            'item': getUrl('/logarithm-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/logarithm-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is a logarithm?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `A logarithm is the inverse operation of exponentiation. The logarithm base a of x (written as log_a(x)) is the exponent to which a must be raised to produce x. In other words, if a^y = x, then log_a(x) = y. For example, log₁₀(100) = 2 because 10² = 100.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the difference between log and ln?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `"log" typically refers to the common logarithm with base 10 (log₁₀), while "ln" is the natural logarithm with base e (approximately 2.71828). So log(100) = 2 because 10² = 100, and ln(e) = 1 because e¹ = e. Natural logarithms are widely used in calculus, physics, and exponential growth/decay problems.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you calculate a logarithm with a different base?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Use the change of base formula: log_a(x) = log_b(x) / log_b(a), where b is any convenient base (usually 10 or e). For example, to calculate log₂(8), you can use log₂(8) = log₁₀(8) / log₁₀(2) = 0.903 / 0.301 ≈ 3. Our calculator handles this automatically for any base.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What are the basic logarithm rules?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The main logarithm rules are: 1) Product Rule: log_a(xy) = log_a(x) + log_a(y), 2) Quotient Rule: log_a(x/y) = log_a(x) - log_a(y), 3) Power Rule: log_a(x^n) = n × log_a(x), 4) Change of Base: log_a(x) = log_b(x) / log_b(a), and 5) Special values: log_a(1) = 0 and log_a(a) = 1.`
            }
          },
          {
            '@type': 'Question',
            'name': 'Can logarithms be negative?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Yes, logarithms can be negative. A logarithm is negative when the input is between 0 and 1. For example, log₁₀(0.1) = -1 because 10⁻¹ = 0.1. However, logarithms are only defined for positive numbers - you cannot take the logarithm of zero or a negative number in real numbers.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you convert between exponential and logarithmic forms?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The exponential form a^b = c is equivalent to the logarithmic form log_a(c) = b. To convert: from exponential to logarithmic, identify the base (a), exponent (b), and result (c), then write log_base(result) = exponent. To convert from logarithmic to exponential, rewrite as base^exponent = result. For example, 2³ = 8 converts to log₂(8) = 3.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the natural logarithm used for?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The natural logarithm (ln, base e) is extensively used in calculus, continuous compound interest, exponential growth and decay models, probability theory, and many physics equations. It appears naturally in derivatives and integrals of exponential functions. The number e (≈2.71828) is fundamental to mathematics and describes continuous growth rates.`
            }
          },
          {
            '@type': 'Question',
            'name': 'Why is log(0) undefined?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `log(0) is undefined because there is no exponent that makes a positive base equal to zero. For any base a > 0, a^x approaches 0 as x approaches negative infinity, but never actually equals 0. Similarly, log of negative numbers is undefined in real numbers (though defined in complex numbers). Logarithms are only defined for positive real numbers.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/logarithm-calculator'),
        'name': 'How to Calculate Logarithms',
        'description': 'Learn how to calculate logarithms with different bases step by step',
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Select the Base',
            'text': `Choose the logarithm base: 10 for common log (log₁₀), e for natural log (ln), 2 for binary log, or enter a custom base.`
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Enter the Value',
            'text': `Enter the positive number for which you want to calculate the logarithm in the "Value" field.`
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Calculate',
            'text': `Click the "Calculate Logarithm" button to compute the result instantly.`
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Review Results',
            'text': `View the result in both logarithmic and exponential forms, along with a detailed step-by-step solution explaining the calculation process.`
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/logarithm-calculator'),
        'headline': 'Logarithm Calculator - Complete Guide to Common, Natural & Base Logarithms',
        'description': `Comprehensive guide to calculating and understanding logarithms, including common log, natural log, and change of base formula with practical examples.`,
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
      <h1 className="sr-only">Logarithm Calculator - Calculate Log, Ln & Any Base Logarithms with Step-by-Step Solutions</h1>
      
      {/* Calculator Component */}
      <LogarithmCalculator />

      {/* SEO Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Logarithm Calculator</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our <strong>Logarithm Calculator</strong> is a comprehensive and free online tool designed to calculate common logarithms 
            (log₁₀), natural logarithms (ln), binary logarithms (log₂), and logarithms with any custom base. Whether you're a student 
            learning algebra, a scientist working with exponential data, or an engineer solving complex equations, our calculator 
            provides instant, accurate results with detailed step-by-step explanations.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Understanding logarithms is essential for mathematics, science, engineering, and computer science. A logarithm answers the 
            question: "To what power must we raise the base to get this number?" Our calculator not only computes logarithms but also 
            helps you convert between exponential and logarithmic forms, making it an excellent learning tool.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li><strong>Common Logarithm (log₁₀):</strong> Calculate base-10 logarithms instantly</li>
            <li><strong>Natural Logarithm (ln):</strong> Compute base-e logarithms for calculus and science</li>
            <li><strong>Binary Logarithm (log₂):</strong> Essential for computer science and information theory</li>
            <li><strong>Custom Base Logarithms:</strong> Calculate logarithms with any positive base</li>
            <li><strong>Change of Base Formula:</strong> Automatically converts between different bases</li>
            <li><strong>Form Conversion:</strong> Convert between exponential (a^b = c) and logarithmic (log_a(c) = b) forms</li>
            <li><strong>Multiple Result Formats:</strong> View results in both logarithmic and exponential notation</li>
            <li><strong>Step-by-Step Solutions:</strong> Understand the calculation process with detailed explanations</li>
            <li><strong>Logarithm Rules Reference:</strong> Quick access to all important logarithm properties</li>
            <li><strong>100% Free:</strong> No registration or payment required</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Logarithms</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is a Logarithm?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            A logarithm is the inverse operation of exponentiation. The logarithm base <em>a</em> of <em>x</em>, written as 
            log<sub>a</sub>(x), answers the question: "What power must we raise <em>a</em> to in order to get <em>x</em>?"
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Mathematically: If a<sup>y</sup> = x, then log<sub>a</sub>(x) = y
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Types of Logarithms</h3>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <ul className="space-y-3 text-gray-700">
              <li><strong>Common Logarithm (log or log₁₀):</strong> Base 10 logarithm. Example: log₁₀(100) = 2</li>
              <li><strong>Natural Logarithm (ln or logₑ):</strong> Base e (≈2.71828) logarithm. Example: ln(e) = 1</li>
              <li><strong>Binary Logarithm (log₂):</strong> Base 2 logarithm. Example: log₂(8) = 3</li>
              <li><strong>Custom Base Logarithm (log_a):</strong> Any positive base. Example: log₅(125) = 3</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Logarithm Properties and Rules</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Product Rule</h3>
          <p className="text-gray-700 mb-4">
            <strong>log<sub>a</sub>(xy) = log<sub>a</sub>(x) + log<sub>a</sub>(y)</strong><br />
            The logarithm of a product equals the sum of the logarithms.<br />
            Example: log₁₀(100) = log₁₀(10 × 10) = log₁₀(10) + log₁₀(10) = 1 + 1 = 2
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Quotient Rule</h3>
          <p className="text-gray-700 mb-4">
            <strong>log<sub>a</sub>(x/y) = log<sub>a</sub>(x) - log<sub>a</sub>(y)</strong><br />
            The logarithm of a quotient equals the difference of the logarithms.<br />
            Example: log₁₀(100/10) = log₁₀(100) - log₁₀(10) = 2 - 1 = 1
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Power Rule</h3>
          <p className="text-gray-700 mb-4">
            <strong>log<sub>a</sub>(x<sup>n</sup>) = n × log<sub>a</sub>(x)</strong><br />
            The logarithm of a power equals the exponent times the logarithm.<br />
            Example: log₁₀(100²) = 2 × log₁₀(100) = 2 × 2 = 4
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. Change of Base Formula</h3>
          <p className="text-gray-700 mb-4">
            <strong>log<sub>a</sub>(x) = log<sub>b</sub>(x) / log<sub>b</sub>(a)</strong><br />
            Convert a logarithm to any base.<br />
            Example: log₂(8) = log₁₀(8) / log₁₀(2) = 0.903 / 0.301 ≈ 3
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">5. Special Values</h3>
          <p className="text-gray-700 mb-4">
            <strong>log<sub>a</sub>(1) = 0</strong> (any base raised to 0 equals 1)<br />
            <strong>log<sub>a</sub>(a) = 1</strong> (any base raised to 1 equals itself)<br />
            Example: log₁₀(1) = 0, log₁₀(10) = 1
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Practical Applications</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li><strong>Science:</strong> Measuring pH levels, earthquake magnitude (Richter scale), sound intensity (decibels)</li>
            <li><strong>Finance:</strong> Compound interest calculations, exponential growth models, investment analysis</li>
            <li><strong>Computer Science:</strong> Algorithm complexity analysis, binary search, data compression</li>
            <li><strong>Engineering:</strong> Signal processing, control systems, exponential decay models</li>
            <li><strong>Statistics:</strong> Log transformations, exponential distributions, survival analysis</li>
            <li><strong>Chemistry:</strong> Reaction kinetics, half-life calculations, chemical equilibrium</li>
            <li><strong>Biology:</strong> Population growth models, pharmacokinetics, enzyme kinetics</li>
            <li><strong>Physics:</strong> Entropy calculations, radioactive decay, wave behavior</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Tips for Working with Logarithms</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li><strong>Check Input Values:</strong> Remember that logarithms are only defined for positive numbers</li>
            <li><strong>Use the Right Base:</strong> Choose log₁₀ for general calculations, ln for calculus and continuous growth</li>
            <li><strong>Apply Rules Carefully:</strong> Use product, quotient, and power rules to simplify complex expressions</li>
            <li><strong>Convert When Needed:</strong> Use change of base formula to work with unfamiliar bases</li>
            <li><strong>Understand the Inverse:</strong> Remember that logarithms and exponentials are inverse operations</li>
            <li><strong>Verify Results:</strong> Check your answer by converting back to exponential form</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Logarithm Values Reference</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Powers of 10:</h3>
            <p className="text-gray-700 mb-4 font-mono text-sm">
              log₁₀(1) = 0, log₁₀(10) = 1, log₁₀(100) = 2, log₁₀(1000) = 3, log₁₀(10000) = 4
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Natural Logarithms:</h3>
            <p className="text-gray-700 mb-4 font-mono text-sm">
              ln(1) = 0, ln(e) ≈ 1, ln(e²) = 2, ln(10) ≈ 2.303
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Powers of 2:</h3>
            <p className="text-gray-700 font-mono text-sm">
              log₂(1) = 0, log₂(2) = 1, log₂(4) = 2, log₂(8) = 3, log₂(16) = 4, log₂(32) = 5
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Use Our Logarithm Calculator?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our Logarithm Calculator stands out for its versatility, accuracy, and educational value. Unlike basic calculators that 
            only show decimal results, we provide comprehensive explanations in both logarithmic and exponential forms. The step-by-step 
            solutions help you understand the mathematical process, making it an excellent tool for learning.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you need to calculate a simple common logarithm or perform complex conversions between exponential and logarithmic 
            forms, our calculator handles it all with ease. The intuitive interface works perfectly on desktop and mobile devices, 
            ensuring you can solve logarithm problems wherever you are. Best of all, it's completely free with no registration required.
          </p>
        </section>
      </article>
    </div>
  );
}

