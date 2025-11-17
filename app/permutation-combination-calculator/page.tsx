import { Metadata } from 'next';
import PermutationCombinationCalculator from '@/components/Calculator/PermutationCombinationCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Permutation & Combination Calculator - nPr, nCr, Factorial | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Free permutation and combination calculator solves P(n,r), C(n,r), and factorials instantly. Step-by-step solutions with formulas and explanations for math, probability, and statistics.`,
  keywords: [
    'permutation calculator',
    'combination calculator',
    'nPr calculator',
    'nCr calculator',
    'factorial calculator',
    'permutation and combination',
    'permutation formula',
    'combination formula',
    'permutation vs combination',
    'how to calculate permutation',
    'how to calculate combination',
    'permutation combination difference',
    'binomial coefficient calculator',
    'arrangement calculator',
    'selection calculator',
    'probability calculator',
    'statistics calculator',
    'math calculator',
    'combinatorics calculator',
    'permutation with repetition'
  ],
  alternates: {
    canonical: getUrl('/permutation-combination-calculator')
  },
  openGraph: {
    title: `Permutation & Combination Calculator`,
    description: `Calculate permutations, combinations, and factorials with step-by-step solutions.`,
    url: getUrl('/permutation-combination-calculator'),
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Permutation & Combination Calculator`,
    description: `Instant P(n,r), C(n,r), and factorial calculations with detailed explanations.`,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function PermutationCombinationCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/permutation-combination-calculator'),
        'name': 'Permutation and Combination Calculator',
        'url': getUrl('/permutation-combination-calculator'),
        'description': `Professional permutation and combination calculator computes P(n,r) permutations, C(n,r) combinations, and n! factorials with step-by-step solutions. Includes detailed explanations of when order matters vs. when it doesn't, real-world examples, and insights into the differences between arrangements and selections.`,
        'applicationCategory': 'EducationApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          'Calculate permutations P(n,r)',
          'Calculate combinations C(n,r)',
          'Calculate factorials n!',
          'Step-by-step solutions',
          'Formula explanations',
          'Order matters vs order doesn\'t matter',
          'Real-world application examples',
          'Intelligent insights and comparisons',
          'Large number support (up to 170!)',
          'Copy results to clipboard'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/permutation-combination-calculator'),
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
            'name': 'Permutation & Combination Calculator',
            'item': getUrl('/permutation-combination-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/permutation-combination-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is the difference between permutation and combination?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The key difference is whether order matters. Permutations count arrangements where order is important - "ABC" and "CBA" are different. The formula is P(n,r) = n!/(n-r)!. Combinations count selections where order doesn't matter - {A,B,C} and {C,B,A} are the same. The formula is C(n,r) = n!/((n-r)!×r!). For example, choosing 3 people from 5 for specific roles (President, VP, Secretary) uses permutation: P(5,3) = 60 ways. Choosing 3 people from 5 for a committee (no specific roles) uses combination: C(5,3) = 10 ways. Permutations always give larger results than combinations because P(n,r) = C(n,r) × r!.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you calculate permutation P(n,r)?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Permutation P(n,r) calculates the number of ways to arrange r items from n total items. Formula: P(n,r) = n!/(n-r)!. Steps: 1) Calculate n! (factorial of total items). 2) Calculate (n-r)! (factorial of remaining items). 3) Divide: P(n,r) = n!/(n-r)!. Example: P(5,2) = 5!/(5-2)! = 120/6 = 20 ways. This means there are 20 different ways to arrange 2 items from 5 items when order matters. Real-world uses: race podium winners (1st, 2nd, 3rd), password combinations with position-specific characters, seating arrangements where position matters.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you calculate combination C(n,r)?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Combination C(n,r) calculates the number of ways to choose r items from n total items. Formula: C(n,r) = n!/((n-r)!×r!). Steps: 1) Calculate n!. 2) Calculate (n-r)!. 3) Calculate r!. 4) Divide: C(n,r) = n!/((n-r)!×r!). Example: C(5,2) = 5!/(3!×2!) = 120/(6×2) = 10 ways. This means there are 10 different ways to choose 2 items from 5 items when order doesn't matter. Real-world uses: lottery number selection, choosing team members (no specific roles), selecting committee members, card poker hands. Note: C(n,r) = C(n,n-r) by symmetry property.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is factorial and how is it calculated?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Factorial (n!) is the product of all positive integers from 1 to n. Formula: n! = n × (n-1) × (n-2) × ... × 2 × 1. Special case: 0! = 1 by definition. Examples: 3! = 3×2×1 = 6. 5! = 5×4×3×2×1 = 120. 10! = 3,628,800. Factorials grow extremely fast: 20! = 2.4 quintillion. Maximum calculable: 170! (larger values exceed number limits). Real-world meaning: n! represents the total number of ways to arrange n distinct items in a row. For example, 5! = 120 means there are 120 different ways to arrange 5 books on a shelf.`
            }
          },
          {
            '@type': 'Question',
            'name': 'When should I use permutation vs combination?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Use permutation when order/position matters: race results (1st, 2nd, 3rd places are different), password digits (123 ≠ 321), seating arrangements (who sits where matters), PIN codes, lock combinations (despite the name!), arranging books on a shelf. Use combination when order doesn't matter: lottery numbers (order drawn doesn't affect winning), selecting team members without roles, choosing pizza toppings, poker hands (suit order irrelevant), committee selection, choosing items from a menu. Quick test: If swapping two items creates a different outcome, use permutation. If swapping creates the same outcome, use combination. Example: Choosing 3 students from 10 for roles (President, VP, Secretary) = P(10,3) = 720. Choosing 3 students from 10 for a group project = C(10,3) = 120.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What are common real-world applications of permutations and combinations?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Permutation applications: Password security (8-character password with 26 letters: P(26,8) = 62 billion options). Race outcomes (Marathon with 100 runners, top 3 finishers). Scheduling (Arranging 5 presentations in order). DNA sequencing (Order of base pairs matters). Combination applications: Lottery (Pick 6 numbers from 49: C(49,6) = 13.9 million combinations). Poker hands (C(52,5) = 2.6 million possible hands). Team selection (Choose 11 players from 20: C(20,11) = 167,960). Menu choices (Select 3 appetizers from 10). Probability and Statistics: Calculating odds, sample spaces, event probabilities. Genetics: Gene combinations. Network theory: Possible connections. Computer Science: Algorithm analysis, data structure optimization.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/permutation-combination-calculator'),
        'name': 'How to Calculate Permutations and Combinations',
        'description': 'Step-by-step guide to using the permutation and combination calculator',
        'totalTime': 'PT2M',
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Choose Calculation Type',
            'text': `Select whether you need Permutation (order matters), Combination (order doesn't matter), or Factorial (total arrangements).`,
            'url': getStepUrl('/permutation-combination-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Enter Total Items (n)',
            'text': `Input the total number of items available. This is the "n" value in P(n,r) or C(n,r).`,
            'url': getStepUrl('/permutation-combination-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Enter Items to Select (r)',
            'text': `Input how many items you want to arrange (permutation) or choose (combination). This is the "r" value. Note: r must be ≤ n.`,
            'url': getStepUrl('/permutation-combination-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Calculate Result',
            'text': `Click the calculate button to get your result. The calculator handles large numbers up to 170!.`,
            'url': getStepUrl('/permutation-combination-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            'position': 5,
            'name': 'Review Step-by-Step Solution',
            'text': `See the complete formula, step-by-step calculations, and detailed explanation of how the result was obtained.`,
            'url': getStepUrl('/permutation-combination-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            'position': 6,
            'name': 'Understand the Insights',
            'text': `Read the intelligent insights to understand real-world applications, compare permutation vs combination, and see special properties.`,
            'url': getStepUrl('/permutation-combination-calculator', 6)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/permutation-combination-calculator'),
        'headline': 'Permutation and Combination Calculator - Complete Guide',
        'description': `Comprehensive guide to calculating permutations, combinations, and factorials with formulas, examples, and real-world applications.`,
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
      <h1 className="sr-only">Permutation and Combination Calculator - nPr, nCr, Factorial Calculator</h1>
      
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
                Permutation & Combination Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <PermutationCombinationCalculator />

      {/* Educational Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Permutation & Combination Calculator</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our <strong>Permutation and Combination Calculator</strong> is a comprehensive tool for solving P(n,r), C(n,r), and factorial calculations. Whether you're a student studying probability and statistics, a teacher preparing lessons, or a professional working with combinatorics, this calculator provides instant, accurate results with detailed step-by-step explanations.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Understanding when to use permutations versus combinations is crucial in mathematics, probability theory, and real-world applications. This calculator not only computes the results but also explains the difference, shows the complete solution process, and provides intelligent insights to deepen your understanding.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Permutations</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is a Permutation?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>permutation</strong> is an arrangement of items in a specific order. When calculating permutations, the order of selection matters, meaning "ABC" and "CBA" are considered different arrangements.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-6 border-2 border-blue-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Permutation Formula</h4>
            <p className="font-mono text-lg text-blue-700 mb-3">P(n, r) = n! / (n - r)!</p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><strong>n</strong> = total number of items</li>
              <li><strong>r</strong> = number of items to arrange</li>
              <li><strong>n!</strong> = n factorial = n × (n-1) × (n-2) × ... × 2 × 1</li>
            </ul>
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mb-3">Permutation Examples</h4>
          <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
            <p className="text-gray-700 mb-3"><strong>Example 1: Race Results</strong></p>
            <p className="text-sm text-gray-600 mb-2">How many ways can 3 medals (Gold, Silver, Bronze) be awarded to 8 runners?</p>
            <p className="font-mono text-sm text-gray-800 mb-1">P(8, 3) = 8! / (8-3)! = 8! / 5!</p>
            <p className="font-mono text-sm text-gray-800 mb-1">= (8 × 7 × 6 × 5!) / 5!</p>
            <p className="font-mono text-sm text-gray-800 mb-1">= 8 × 7 × 6 = <strong>336 ways</strong></p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Combinations</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is a Combination?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>combination</strong> is a selection of items where the order does NOT matter. When calculating combinations, {`{A, B, C}`} and {`{C, B, A}`} are considered the same selection.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-6 border-2 border-blue-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Combination Formula</h4>
            <p className="font-mono text-lg text-blue-700 mb-3">C(n, r) = n! / ((n - r)! × r!)</p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><strong>n</strong> = total number of items</li>
              <li><strong>r</strong> = number of items to choose</li>
              <li><strong>C(n, r)</strong> is also called binomial coefficient, written as <span className="font-mono">(n r)</span></li>
            </ul>
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mb-3">Combination Examples</h4>
          <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
            <p className="text-gray-700 mb-3"><strong>Example 2: Lottery</strong></p>
            <p className="text-sm text-gray-600 mb-2">How many ways can you choose 6 numbers from 49 numbers (order doesn't matter)?</p>
            <p className="font-mono text-sm text-gray-800 mb-1">C(49, 6) = 49! / (43! × 6!)</p>
            <p className="font-mono text-sm text-gray-800 mb-1">= <strong>13,983,816 ways</strong></p>
            <p className="text-xs text-gray-600 mt-2">This is why lottery odds are so low!</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Permutation vs Combination: Key Differences</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 px-4 py-3 text-left text-gray-900">Aspect</th>
                  <th className="border border-gray-300 px-4 py-3 text-left text-gray-900">Permutation</th>
                  <th className="border border-gray-300 px-4 py-3 text-left text-gray-900">Combination</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">Order</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Matters</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Doesn't Matter</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">Formula</td>
                  <td className="border border-gray-300 px-4 py-3 font-mono text-sm text-gray-700">P(n,r) = n!/(n-r)!</td>
                  <td className="border border-gray-300 px-4 py-3 font-mono text-sm text-gray-700">C(n,r) = n!/((n-r)!×r!)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">Result Size</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Larger</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Smaller (P(n,r) = C(n,r)×r!)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">Example Use</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Password, Race podium</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Lottery, Team selection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Math Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/probability-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🎲</div>
              <h3 className="font-semibold text-gray-900 mb-1">Probability Calculator</h3>
              <p className="text-sm text-gray-600">Calculate event probabilities</p>
            </Link>
            
            <Link 
              href="/factor-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🔢</div>
              <h3 className="font-semibold text-gray-900 mb-1">Factor Calculator</h3>
              <p className="text-sm text-gray-600">Find factors and prime factorization</p>
            </Link>
            
            <Link 
              href="/gcf-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🔣</div>
              <h3 className="font-semibold text-gray-900 mb-1">GCF Calculator</h3>
              <p className="text-sm text-gray-600">Greatest Common Factor</p>
            </Link>

            <Link 
              href="/lcm-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🔢</div>
              <h3 className="font-semibold text-gray-900 mb-1">LCM Calculator</h3>
              <p className="text-sm text-gray-600">Least Common Multiple</p>
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
              <p className="text-sm text-gray-600">Add, subtract fractions</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <p className="text-gray-700 mb-4">
            For more information about permutations, combinations, and combinatorics:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a 
                href="https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:prob-comb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Khan Academy - Probability and Combinatorics
              </a>
            </li>
            <li>
              <a 
                href="https://en.wikipedia.org/wiki/Permutation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Wikipedia - Permutations
              </a>
            </li>
            <li>
              <a 
                href="https://mathworld.wolfram.com/Combination.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Wolfram MathWorld - Combinations
              </a>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

