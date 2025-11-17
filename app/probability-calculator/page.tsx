import { Metadata } from 'next';
import ProbabilityCalculator from '@/components/Calculator/ProbabilityCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Probability Calculator - Calculate Event Probability, Odds & Statistics | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Free online probability calculator for basic probability, multiple events, conditional probability, dice, and coin flips. Includes step-by-step solutions and probability formulas.`,
  keywords: [
    'probability calculator',
    'calculate probability',
    'probability formula calculator',
    'event probability calculator',
    'odds calculator',
    'chance calculator',
    'likelihood calculator',
    'statistical probability',
    'conditional probability calculator',
    'independent events probability',
    'binomial probability calculator',
    'dice probability calculator',
    'coin flip probability',
    'probability of multiple events',
    'union probability',
    'intersection probability',
    'complement probability',
    'probability solver',
    'probability distribution calculator',
    'statistics calculator',
    'probability theory calculator',
    'random event probability',
    'favorable outcomes calculator'
  ],
  alternates: {
    canonical: getUrl('/probability-calculator')
  },
  openGraph: {
    title: `Probability Calculator - Event Probability & Statistics`,
    description: `Calculate probability for events, dice, coins with step-by-step solutions and formulas.`,
    url: getUrl('/probability-calculator'),
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Probability Calculator - Calculate Event Probability`,
    description: `Free calculator for probability, odds, dice, coins with detailed explanations.`,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ProbabilityCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/probability-calculator'),
        'name': 'Probability Calculator',
        'url': getUrl('/probability-calculator'),
        'description': `Calculate probability for various events including basic probability, multiple events, conditional probability, dice rolls, and coin flips. Provides step-by-step solutions and probability classifications.`,
        'applicationCategory': 'CalculatorApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          'Basic probability calculation',
          'Multiple events probability (union, intersection)',
          'Independent events probability',
          'Conditional probability P(A|B)',
          'Dice roll probability simulator',
          'Coin flip probability calculator',
          'Binomial probability',
          'Complement probability',
          'Odds calculation',
          'Probability classification',
          'Step-by-step solutions',
          'Multiple probability formulas'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/probability-calculator'),
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
            'name': 'Probability Calculator',
            'item': getUrl('/probability-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/probability-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is probability and how is it calculated?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Probability measures the likelihood of an event occurring, expressed as a number between 0 (impossible) and 1 (certain). The basic formula is P(E) = (Number of Favorable Outcomes) / (Total Number of Possible Outcomes). For example, the probability of rolling a 4 on a standard die is 1/6 or approximately 0.167 (16.7%), because there is 1 favorable outcome (rolling a 4) out of 6 total possible outcomes (1, 2, 3, 4, 5, 6). Probability can also be expressed as a percentage (16.7%) or as odds (1:5). Understanding probability is essential in statistics, decision-making, risk assessment, and many real-world applications from weather forecasting to gambling.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you calculate probability of multiple events?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `For multiple events, use different rules depending on the relationship: (1) Independent events (both A AND B): P(A ∩ B) = P(A) × P(B). Example: probability of rolling a 6 on two dice = (1/6) × (1/6) = 1/36. (2) Union (A OR B): P(A ∪ B) = P(A) + P(B) - P(A ∩ B). Example: probability of drawing a heart OR a king from a deck = (13/52) + (4/52) - (1/52) = 16/52. (3) Mutually exclusive events (cannot occur together): P(A or B) = P(A) + P(B). The key is identifying whether events are independent, dependent, or mutually exclusive to apply the correct formula.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is conditional probability?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Conditional probability measures the likelihood of event A occurring given that event B has already occurred, written as P(A|B) and calculated as P(A|B) = P(A ∩ B) / P(B). For example, if there are 3 red balls and 2 blue balls in a bag, and you draw one red ball (without replacement), the probability of drawing another red ball changes. Initially P(red) = 3/5 = 0.6. After removing one red ball, P(red|first red drawn) = 2/4 = 0.5. Conditional probability is crucial in medical diagnosis, quality control, and Bayesian statistics. It accounts for how prior events or knowledge affect current probabilities, making predictions more accurate in dependent scenarios.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the probability of rolling specific sums with dice?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `With two standard six-sided dice, the probability varies by sum because different numbers of combinations produce each sum. Total outcomes = 36 (6 × 6). Most likely sum is 7 with 6 ways (1+6, 2+5, 3+4, 4+3, 5+2, 6+1), giving probability 6/36 = 16.67%. Least likely are 2 and 12, each with 1 way (1+1 or 6+6), giving 1/36 = 2.78%. The distribution is symmetrical: P(sum=2) = P(sum=12), P(sum=3) = P(sum=11), etc. This explains why 7 is the most common roll in craps and why gamblers favor bets on 6, 7, and 8. Understanding dice probability is fundamental to game theory and probability education.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you calculate coin flip probability?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Coin flip probability uses binomial probability: P(X = k) = C(n,k) × p^k × (1-p)^(n-k), where n is number of flips, k is desired heads, p is probability of heads (0.5 for fair coins), and C(n,k) is combinations. For 3 coins getting exactly 2 heads: C(3,2) = 3, so P = 3 × (0.5)² × (0.5)¹ = 3/8 = 37.5%. The 3 ways are HHT, HTH, THH. For "at least k heads," sum probabilities for k, k+1, ..., n heads. Interestingly, with more flips, results cluster around 50% heads due to the law of large numbers, but short-term runs can vary significantly, explaining streaks in sports and gambling.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the difference between probability and odds?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Probability and odds express likelihood differently. Probability is the ratio of favorable outcomes to total outcomes: P = favorable / total, ranging from 0 to 1. Odds are the ratio of favorable to unfavorable outcomes: Odds = favorable : unfavorable. Example: Drawing an ace from a deck has probability 4/52 = 0.077 (7.7%) and odds 4:48 or 1:12. Converting between them: Odds = P / (1-P) and P = Odds / (1+Odds). Gambling typically uses odds (3:1 means win $3 for every $1 bet), while statistics uses probability. Understanding both is crucial for sports betting, risk assessment, and interpreting medical test results where odds ratios are common.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/probability-calculator'),
        'name': 'How to Calculate Probability',
        'description': 'Step-by-step guide to calculating probability for various types of events',
        'totalTime': 'PT3M',
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Choose Probability Type',
            'text': `Select the type of probability calculation you need: Basic (single event), Multiple Events (independent or union), Conditional, Dice, or Coins.`,
            'url': getStepUrl('/probability-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Enter Required Values',
            'text': `Input the necessary values for your calculation. For basic probability, enter favorable outcomes and total outcomes. For multiple events, enter individual probabilities.`,
            'url': getStepUrl('/probability-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Select Event Relationship',
            'text': `If calculating multiple events, specify the relationship: Independent (both A and B), Union (A or B), or Intersection (A and B together).`,
            'url': getStepUrl('/probability-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Calculate Probability',
            'text': `Click "Calculate Probability" to compute the result. The calculator will apply the appropriate formula based on your selected probability type.`,
            'url': getStepUrl('/probability-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            'position': 5,
            'name': 'Review Results and Classification',
            'text': `Examine the probability (as decimal and percentage), odds, and complement. The calculator classifies the probability as rare, unlikely, moderate, likely, or almost certain.`,
            'url': getStepUrl('/probability-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            'position': 6,
            'name': 'Study Step-by-Step Solution',
            'text': `Review the detailed calculation steps to understand how the probability was computed using the relevant formulas and principles.`,
            'url': getStepUrl('/probability-calculator', 6)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/probability-calculator'),
        'headline': 'Probability Calculator - Complete Guide to Calculating Probability',
        'description': `Comprehensive guide to calculating probability for single events, multiple events, conditional probability, dice, and coins with formulas, examples, and practical applications.`,
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
      <h1 className="sr-only">Probability Calculator - Calculate Event Probability, Odds & Statistics</h1>
      
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
                Probability Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <ProbabilityCalculator />

      {/* Educational Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Probability Calculator</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our <strong>Probability Calculator</strong> is a comprehensive, free online tool designed to calculate probabilities for various types of events including basic single-event probability, multiple independent or dependent events, conditional probability, dice rolls, and coin flips. Whether you're a student learning probability theory, a statistician analyzing data, a gambler calculating odds, or a professional assessing risks, our calculator provides instant, accurate results with detailed step-by-step explanations.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Understanding probability is fundamental to mathematics, statistics, science, and decision-making in everyday life. Our calculator not only computes probability values but also converts them to percentages and odds, calculates complements, classifies probability levels (rare to almost certain), and provides comprehensive explanations with formulas. With support for multiple calculation types and real-world scenarios like dice games and coin flips, it's an essential tool for learning and practical applications.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Probability: The Basics</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is Probability?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Probability is a measure of the likelihood that an event will occur. It quantifies uncertainty and ranges from 0 (impossible event) to 1 (certain event). Probability can be expressed as a decimal (0.5), fraction (1/2), or percentage (50%).
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="font-mono text-2xl text-center mb-4 text-gray-900">P(E) = n(E) / n(S)</p>
            <p className="text-gray-700 text-center text-sm">
              Where P(E) is probability of event E<br />
              n(E) is number of favorable outcomes<br />
              n(S) is total number of possible outcomes
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Probability Concepts</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Sample Space (S)</strong>: The set of all possible outcomes. For a die, S = {1, 2, 3, 4, 5, 6}.</li>
            <li><strong>Event (E)</strong>: A specific outcome or set of outcomes. Rolling an even number is event {2, 4, 6}.</li>
            <li><strong>Favorable Outcomes</strong>: Outcomes that satisfy the event condition.</li>
            <li><strong>Probability Range</strong>: Always between 0 and 1. P = 0 means impossible, P = 1 means certain, P = 0.5 means equally likely.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Basic Probability Calculation</h2>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            The fundamental probability formula divides favorable outcomes by total possible outcomes. This classical approach assumes all outcomes are equally likely.
          </p>

          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example: Drawing a Card</h4>
            <p className="text-gray-700 mb-3">What is the probability of drawing an Ace from a standard 52-card deck?</p>
            <div className="space-y-2 text-gray-700 font-mono text-sm">
              <p>Step 1: Identify favorable outcomes: 4 Aces in a deck</p>
              <p>Step 2: Identify total outcomes: 52 cards total</p>
              <p>Step 3: Apply formula: P(Ace) = 4/52 = 1/13</p>
              <p>Step 4: Convert: P(Ace) ≈ 0.0769 = 7.69%</p>
              <p className="text-green-700 font-bold">Answer: There is a 7.69% chance of drawing an Ace</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Complement Rule</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The complement of an event E is the probability that E does NOT occur, denoted as P(not E) or P(E').
          </p>
          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <p className="font-mono text-xl text-center mb-3 text-gray-900">P(not E) = 1 - P(E)</p>
            <p className="text-gray-700 text-sm">
              <strong>Example:</strong> If P(rain) = 0.3, then P(no rain) = 1 - 0.3 = 0.7 (70%)
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Probability of Multiple Events</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Independent Events</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Two events are independent if the occurrence of one doesn't affect the probability of the other. For independent events, the probability of both occurring is the product of their individual probabilities.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="font-mono text-xl text-center mb-3 text-gray-900">P(A and B) = P(A) × P(B)</p>
            <p className="text-gray-700 text-sm">
              <strong>Example:</strong> Probability of flipping heads twice in a row<br />
              P(H and H) = 0.5 × 0.5 = 0.25 (25%)
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Union of Events (A OR B)</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The probability that at least one of two events occurs uses the addition rule. We subtract the intersection to avoid double-counting.
          </p>
          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <p className="font-mono text-xl text-center mb-3 text-gray-900">P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</p>
            <p className="text-gray-700 text-sm">
              <strong>Example:</strong> Probability of drawing a heart OR a face card<br />
              P(heart) = 13/52, P(face) = 12/52, P(heart face) = 3/52<br />
              P(heart OR face) = 13/52 + 12/52 - 3/52 = 22/52 ≈ 42.3%
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mutually Exclusive Events</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Events that cannot occur simultaneously are mutually exclusive. For these events, P(A ∩ B) = 0, so the union formula simplifies.
          </p>
          <div className="bg-red-50 rounded-lg p-6 mb-6">
            <p className="font-mono text-xl text-center mb-3 text-gray-900">P(A or B) = P(A) + P(B)</p>
            <p className="text-gray-700 text-sm">
              <strong>Example:</strong> Probability of rolling a 2 OR a 5 on a die<br />
              P(2 or 5) = 1/6 + 1/6 = 2/6 = 1/3 ≈ 33.3%
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Conditional Probability</h2>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Conditional probability measures the likelihood of event A occurring given that event B has already occurred. This is written as P(A|B) and read as "probability of A given B."
          </p>

          <div className="bg-indigo-50 rounded-lg p-6 mb-6">
            <p className="font-mono text-xl text-center mb-3 text-gray-900">P(A|B) = P(A ∩ B) / P(B)</p>
            <p className="text-gray-700 text-center text-sm">
              Probability of A given that B has occurred
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Example: Drawing Cards Without Replacement</h4>
            <p className="text-gray-700 mb-3">
              A bag contains 5 red balls and 3 blue balls. If you draw one red ball, what's the probability the next ball is also red?
            </p>
            <div className="space-y-2 text-gray-700 text-sm">
              <p><strong>Initial state:</strong> 5 red, 3 blue (8 total)</p>
              <p><strong>After drawing 1 red:</strong> 4 red, 3 blue (7 total)</p>
              <p><strong>P(2nd red | 1st red) = 4/7 ≈ 57.1%</strong></p>
              <p className="mt-2 text-gray-600">
                Note: This differs from P(red on 2nd draw) = 5/8 = 62.5% because we have information about the first draw.
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Conditional probability is crucial in medical diagnosis (test results given disease presence), quality control (defect rates given batch conditions), and Bayesian inference (updating beliefs with new evidence).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Dice Probability</h2>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Dice probability is a classic application of probability theory. A standard die has 6 equally likely outcomes (1-6), each with probability 1/6 ≈ 16.67%.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Two Dice: Sum Probability Distribution</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3">Sum</th>
                  <th className="border border-gray-300 px-4 py-3">Ways to Roll</th>
                  <th className="border border-gray-300 px-4 py-3">Probability</th>
                  <th className="border border-gray-300 px-4 py-3">Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 text-center">2</td>
                  <td className="border border-gray-300 px-4 py-3">1 (1+1)</td>
                  <td className="border border-gray-300 px-4 py-3">1/36</td>
                  <td className="border border-gray-300 px-4 py-3">2.78%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-center">3</td>
                  <td className="border border-gray-300 px-4 py-3">2 (1+2, 2+1)</td>
                  <td className="border border-gray-300 px-4 py-3">2/36</td>
                  <td className="border border-gray-300 px-4 py-3">5.56%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 text-center">4</td>
                  <td className="border border-gray-300 px-4 py-3">3 (1+3, 2+2, 3+1)</td>
                  <td className="border border-gray-300 px-4 py-3">3/36</td>
                  <td className="border border-gray-300 px-4 py-3">8.33%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-center">5</td>
                  <td className="border border-gray-300 px-4 py-3">4</td>
                  <td className="border border-gray-300 px-4 py-3">4/36</td>
                  <td className="border border-gray-300 px-4 py-3">11.11%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 text-center">6</td>
                  <td className="border border-gray-300 px-4 py-3">5</td>
                  <td className="border border-gray-300 px-4 py-3">5/36</td>
                  <td className="border border-gray-300 px-4 py-3">13.89%</td>
                </tr>
                <tr className="bg-green-100">
                  <td className="border border-gray-300 px-4 py-3 text-center font-bold">7</td>
                  <td className="border border-gray-300 px-4 py-3 font-bold">6 (most likely)</td>
                  <td className="border border-gray-300 px-4 py-3 font-bold">6/36</td>
                  <td className="border border-gray-300 px-4 py-3 font-bold">16.67%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-center">8</td>
                  <td className="border border-gray-300 px-4 py-3">5</td>
                  <td className="border border-gray-300 px-4 py-3">5/36</td>
                  <td className="border border-gray-300 px-4 py-3">13.89%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 text-center">9</td>
                  <td className="border border-gray-300 px-4 py-3">4</td>
                  <td className="border border-gray-300 px-4 py-3">4/36</td>
                  <td className="border border-gray-300 px-4 py-3">11.11%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-center">10</td>
                  <td className="border border-gray-300 px-4 py-3">3</td>
                  <td className="border border-gray-300 px-4 py-3">3/36</td>
                  <td className="border border-gray-300 px-4 py-3">8.33%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 text-center">11</td>
                  <td className="border border-gray-300 px-4 py-3">2</td>
                  <td className="border border-gray-300 px-4 py-3">2/36</td>
                  <td className="border border-gray-300 px-4 py-3">5.56%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-center">12</td>
                  <td className="border border-gray-300 px-4 py-3">1 (6+6)</td>
                  <td className="border border-gray-300 px-4 py-3">1/36</td>
                  <td className="border border-gray-300 px-4 py-3">2.78%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Notice the symmetry: the distribution peaks at 7 and decreases symmetrically toward the extremes. This pattern is fundamental to craps and other dice games, where players bet on specific sums knowing 7 is most likely.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Coin Flip Probability (Binomial Probability)</h2>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Coin flip probability uses the binomial distribution, which models the number of successes in a fixed number of independent trials with constant probability.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="font-mono text-lg text-center mb-3 text-gray-900">P(X = k) = C(n,k) × p^k × (1-p)^(n-k)</p>
            <p className="text-gray-700 text-center text-sm">
              n = number of trials (coin flips)<br />
              k = number of successes (heads)<br />
              p = probability of success (0.5 for fair coins)<br />
              C(n,k) = n! / (k!(n-k)!) = combinations
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example: Three Coin Flips</h3>
          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-3"><strong>Question:</strong> What is the probability of getting exactly 2 heads when flipping 3 coins?</p>
            <div className="space-y-2 text-gray-700 text-sm font-mono">
              <p>Step 1: Calculate combinations: C(3,2) = 3!/(2!×1!) = 3</p>
              <p>Step 2: The 3 ways are: HHT, HTH, THH</p>
              <p>Step 3: Apply formula: P(2 heads) = 3 × (0.5)² × (0.5)¹</p>
              <p>Step 4: Calculate: P(2 heads) = 3 × 0.25 × 0.5 = 3/8 = 0.375</p>
              <p className="text-green-700 font-bold">Answer: 37.5% probability of getting exactly 2 heads</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Distribution for 4 Coin Flips</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>0 heads (TTTT):</strong> C(4,0) = 1, P = 1/16 = 6.25%</li>
            <li><strong>1 head:</strong> C(4,1) = 4, P = 4/16 = 25%</li>
            <li><strong>2 heads:</strong> C(4,2) = 6, P = 6/16 = 37.5% (most likely)</li>
            <li><strong>3 heads:</strong> C(4,3) = 4, P = 4/16 = 25%</li>
            <li><strong>4 heads (HHHH):</strong> C(4,4) = 1, P = 1/16 = 6.25%</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Probability vs. Odds</h2>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Probability and odds are related but express likelihood differently. Understanding both is important for gambling, medical statistics, and risk assessment.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Probability</h4>
              <p className="text-gray-700 mb-2"><strong>Definition:</strong> Ratio of favorable to total outcomes</p>
              <p className="font-mono text-lg">P = favorable / total</p>
              <p className="text-gray-700 mt-2"><strong>Range:</strong> 0 to 1 (or 0% to 100%)</p>
              <p className="text-gray-700 mt-2"><strong>Example:</strong> P(Ace) = 4/52 = 0.077 = 7.7%</p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Odds</h4>
              <p className="text-gray-700 mb-2"><strong>Definition:</strong> Ratio of favorable to unfavorable</p>
              <p className="font-mono text-lg">Odds = favorable : unfavorable</p>
              <p className="text-gray-700 mt-2"><strong>Range:</strong> Any positive numbers</p>
              <p className="text-gray-700 mt-2"><strong>Example:</strong> Odds(Ace) = 4:48 = 1:12</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Converting Between Probability and Odds</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Odds from Probability:</strong> Odds = P / (1 - P). Example: P = 0.25 → Odds = 0.25/0.75 = 1:3</li>
            <li><strong>Probability from Odds:</strong> P = Odds / (1 + Odds). Example: Odds = 2:3 → P = 2/5 = 0.4</li>
          </ul>

          <p className="text-gray-700 leading-relaxed">
            <strong>Gambling Context:</strong> "3 to 1 odds" in betting means you win $3 for every $1 wagered, implying a probability of 1/4 = 25%. Understanding this conversion helps evaluate betting value and expected returns.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Practical Applications of Probability</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Gambling and Gaming</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Casino Games:</strong> Understanding house edge, blackjack odds, roulette probabilities</li>
            <li><strong>Poker:</strong> Calculating pot odds, drawing odds, probability of specific hands</li>
            <li><strong>Sports Betting:</strong> Converting betting lines to probabilities, finding value bets</li>
            <li><strong>Lottery:</strong> Calculating astronomically low probabilities (e.g., Powerball: 1 in 292 million)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Medicine and Healthcare</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Diagnostic Testing:</strong> Sensitivity, specificity, positive/negative predictive values</li>
            <li><strong>Treatment Success:</strong> Survival rates, treatment efficacy probabilities</li>
            <li><strong>Risk Assessment:</strong> Disease probability given risk factors (conditional probability)</li>
            <li><strong>Clinical Trials:</strong> Statistical significance, p-values, confidence intervals</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Business and Finance</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Risk Management:</strong> Probability of default, credit scoring, insurance premiums</li>
            <li><strong>Quality Control:</strong> Defect rates, sampling inspection, process capability</li>
            <li><strong>Market Analysis:</strong> Probability of price movements, volatility modeling</li>
            <li><strong>Decision Trees:</strong> Expected value calculations for business decisions</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Weather and Climate</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Weather Forecasting:</strong> "30% chance of rain" is a probability statement</li>
            <li><strong>Hurricane Prediction:</strong> Probability cones for storm paths</li>
            <li><strong>Climate Models:</strong> Probability distributions for future temperatures</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Probability Misconceptions</h2>
          
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li>
              <strong>Gambler's Fallacy:</strong> Believing past independent events affect future probabilities. If a coin lands heads 5 times, the 6th flip is still 50% heads. Each flip is independent.
            </li>
            <li>
              <strong>Law of Averages Misunderstanding:</strong> The law of large numbers applies over many trials, not guaranteeing short-term results. Ten flips won't necessarily yield exactly 5 heads.
            </li>
            <li>
              <strong>Confusing P(A|B) with P(B|A):</strong> P(positive test | disease) ≠ P(disease | positive test). These are different conditional probabilities (prosecutor's fallacy).
            </li>
            <li>
              <strong>Ignoring Base Rates:</strong> Rare diseases have low probability even with positive tests. A 99% accurate test for a 0.1% prevalent disease still yields mostly false positives.
            </li>
            <li>
              <strong>Adding Non-Exclusive Probabilities:</strong> P(A or B) ≠ P(A) + P(B) unless events are mutually exclusive. Must subtract P(A and B) to avoid double-counting.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/statistics-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 mb-1">Statistics Calculator</h3>
              <p className="text-sm text-gray-600">Calculate mean, median, mode, standard deviation</p>
            </Link>
            
            <Link 
              href="/percentage-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">%</div>
              <h3 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate percentages and percent changes</p>
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
              href="/ratio-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">⚖️</div>
              <h3 className="font-semibold text-gray-900 mb-1">Ratio Calculator</h3>
              <p className="text-sm text-gray-600">Calculate and simplify ratios</p>
            </Link>
            
            <Link 
              href="/scientific-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🔬</div>
              <h3 className="font-semibold text-gray-900 mb-1">Scientific Calculator</h3>
              <p className="text-sm text-gray-600">Advanced mathematical calculations</p>
            </Link>
            
            <Link 
              href="/average-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 mb-1">Average Calculator</h3>
              <p className="text-sm text-gray-600">Calculate mean, median, mode</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <p className="text-gray-700 mb-4">
            For more information about probability theory and applications, visit these authoritative sources:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a 
                href="https://www.khanacademy.org/math/statistics-probability/probability-library" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Khan Academy - Probability
              </a>
              {' '}for comprehensive video lessons and practice
            </li>
            <li>
              <a 
                href="https://www.mathsisfun.com/data/probability.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Math is Fun - Probability
              </a>
              {' '}for interactive tutorials and examples
            </li>
            <li>
              <a 
                href="https://www.stat.berkeley.edu/~stark/SticiGui/Text/gloss.htm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                UC Berkeley Statistics Glossary
              </a>
              {' '}for formal definitions and concepts
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

