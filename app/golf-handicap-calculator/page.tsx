import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import GolfHandicapCalculator from '@/components/Calculator/GolfHandicapCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Golf Handicap Calculator - Calculate USGA/WHS Handicap Index | AICalculator',
  description: 'Free golf handicap calculator using USGA/WHS standards. Track rounds, calculate handicap index, analyze performance trends, and determine course handicap for any golf course.',
  keywords: [
    'golf handicap calculator',
    'USGA handicap calculator',
    'WHS handicap calculator',
    'golf handicap index',
    'calculate golf handicap',
    'handicap index calculator',
    'golf score tracker',
    'course handicap calculator',
    'slope rating calculator',
    'golf differential calculator',
    'handicap system',
    'golf scoring',
    'golf performance tracker',
    'golf stats calculator',
    'net score calculator',
    'golf round tracker',
    'handicap improvement',
    'golf course difficulty',
    'USGA system',
    'World Handicap System',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Golf Handicap Calculator - Calculate USGA/WHS Handicap Index',
    description: 'Track your golf rounds and calculate your official handicap index using USGA/WHS standards. Analyze performance trends and course handicaps.',
    type: 'website',
    url: getUrl('/golf-handicap-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('golf-handicap'),
      width: 1200,
      height: 630,
      alt: 'Golf Handicap Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Handicap Calculator - Calculate USGA/WHS Handicap Index',
    description: 'Track your golf rounds and calculate your official handicap index using USGA/WHS standards. Analyze performance trends and course handicaps.',
    images: [getOgImage('golf-handicap')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/golf-handicap-calculator'),
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
};

export default function GolfHandicapCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/golf-handicap-calculator'),
        name: 'Golf Handicap Calculator',
        url: getUrl('/golf-handicap-calculator'),
        description: 'Free golf handicap calculator using USGA/WHS standards. Track rounds, calculate handicap index, analyze performance, and determine course handicap.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate USGA/WHS Handicap Index',
          'Track unlimited golf rounds',
          'Score differential calculation',
          'Performance trend analysis',
          'Course handicap calculator',
          'Round history tracking',
          'Automatic handicap updates',
          'Multiple course comparison',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/golf-handicap-calculator'),
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: getUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Other',
            item: getUrl('/other'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Golf Handicap Calculator',
            item: getUrl('/golf-handicap-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/golf-handicap-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How is a golf handicap calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under the World Handicap System (WHS), your Handicap Index is calculated by averaging your best score differentials from your most recent 20 rounds. A Score Differential is calculated using the formula: (Adjusted Gross Score - Course Rating) × 113 ÷ Slope Rating. The system uses 8 of your best 20 differentials (fewer if you have under 20 rounds). For example, with 20 rounds, the average of your 8 lowest differentials becomes your Handicap Index. With only 5 rounds, your single best differential is used. The system automatically adjusts as you play more rounds, providing fair competition across courses of varying difficulty.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between Handicap Index and Course Handicap?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Handicap Index is your portable number that represents your demonstrated ability—it travels with you to any course. Course Handicap is the number of strokes you receive on a specific course, adjusted for that course difficulty. The formula is: Course Handicap = Handicap Index × (Slope Rating ÷ 113) + (Course Rating - Par). For example, a Handicap Index of 15.0 playing a course with Slope 130, Rating 72.5, Par 72 gives Course Handicap = 15.0 × (130 ÷ 113) + (72.5 - 72) = 17.8, rounded to 18 strokes. Harder courses (higher slope) give you more strokes; easier courses give fewer.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many rounds do I need to establish a handicap?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under WHS rules, you need a minimum of 3 rounds (54 holes) to establish an initial Handicap Index. With 3 rounds, your index equals your single best differential minus 2.0. With 4 rounds, use the best differential minus 1.0. With 5 rounds, use the best differential exactly. As you accumulate more rounds, more scores are used: 6 rounds uses 2 best, 9 rounds uses 3 best, and 20 rounds uses 8 best. Your handicap becomes more accurate and stable with more rounds. Most golf associations recommend maintaining 20 recent rounds for the most representative handicap.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are Course Rating and Slope Rating?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Course Rating is the expected score for a scratch golfer (0 Handicap Index) playing the course under normal conditions. For example, Rating 72.5 means a scratch golfer should score 72.5 strokes. Slope Rating measures course difficulty for bogey golfers relative to scratch golfers, ranging from 55 (easiest) to 155 (hardest), with 113 being standard. A Slope of 130 means the course is significantly harder for average players than for experts. These ratings are determined by certified course raters evaluating obstacles, length, forced carries, greens difficulty, and other factors. Both ratings appear on scorecards.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I improve my golf handicap?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Improving your handicap requires lowering your score differentials through better play and course management. Key strategies: 1) Practice short game—60% of strokes occur within 100 yards. 2) Manage course strategy—play to your strengths, avoid high-risk shots. 3) Track statistics—identify weaknesses (fairways hit, greens in regulation, putts per round). 4) Get professional lessons—fix fundamental swing flaws. 5) Play appropriate tees—challenge yourself without losing confidence. 6) Mental game—stay positive, focus on each shot. Most importantly, play regularly and post all scores to maintain an accurate handicap that reflects current ability.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why does my handicap change after each round?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Your Handicap Index updates after every round posted because WHS uses a rolling 20-round window. When you add a new score, it may replace an older score in your calculation, affecting which differentials are used. If your new differential is better than your worst differential currently used, your handicap improves. If worse, it may increase. Daily handicap revisions (vs. monthly updates in old systems) provide real-time accuracy reflecting current form. This responsive system prevents sandbagging and ensures fair competition. Track your trend over time rather than individual round-to-round changes—consistency matters more than occasional good or bad rounds.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/golf-handicap-calculator'),
        name: 'How to Calculate Your Golf Handicap Index',
        description: 'Learn how to calculate your official golf handicap index using USGA/WHS standards with our free calculator.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Golf Handicap Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Round Information',
            text: 'Input the date, course name, course rating, slope rating, and your adjusted gross score for each round. Find course rating and slope rating on the scorecard or course website.',
            url: getStepUrl('/golf-handicap-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Add Multiple Rounds',
            text: 'Record at least 3 rounds to establish an initial handicap. For most accurate results, track your most recent 20 rounds. The calculator automatically stores your round history.',
            url: getStepUrl('/golf-handicap-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Calculate Score Differentials',
            text: 'The calculator automatically computes Score Differential for each round using: (Adjusted Gross Score - Course Rating) × 113 ÷ Slope Rating.',
            url: getStepUrl('/golf-handicap-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Determine Best Differentials',
            text: 'The system selects your best differentials based on WHS rules: 8 of 20 for 20 rounds, proportionally fewer for less than 20 rounds.',
            url: getStepUrl('/golf-handicap-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'View Your Handicap Index',
            text: 'Your official Handicap Index is calculated as the average of your best differentials. Track your progress with performance trend charts.',
            url: getStepUrl('/golf-handicap-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Calculate Course Handicap',
            text: 'Use your Handicap Index to determine Course Handicap for any course using: Handicap Index × (Slope Rating ÷ 113) + (Course Rating - Par).',
            url: getStepUrl('/golf-handicap-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/golf-handicap-calculator'),
        headline: 'Complete Guide to Golf Handicap Calculation Using WHS/USGA Standards',
        description: 'Comprehensive guide to understanding and calculating your golf handicap index using the World Handicap System and USGA standards.',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
        datePublished: '2024-01-01',
        dateModified: '2024-11-18',
        image: getOgImage('golf-handicap'),
        articleBody: 'Learn how to calculate your golf handicap index using WHS/USGA standards, understand score differentials, course ratings, slope ratings, and improve your game.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Golf Handicap Calculator - Calculate USGA/WHS Handicap Index</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Golf Handicap Calculator"
        calculatorUrl="/golf-handicap-calculator"
      />

      {/* Calculator Component */}
      <GolfHandicapCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Golf Handicap Systems</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700">
              <strong>Quick Summary:</strong> Calculate your official golf handicap index using WHS/USGA standards with our free calculator. Track rounds, analyze performance trends, calculate course handicaps, and improve your game with data-driven insights.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What is a Golf Handicap?</h3>
          <p className="text-gray-700 mb-4">
            A golf handicap is a numerical measure of a golfer's potential playing ability based on past performance. It enables players of different skill levels to compete fairly by adjusting scores to account for ability differences. A lower handicap indicates better skill—scratch golfers have a 0 handicap, while higher handicaps (20+) represent recreational players still developing their game.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>The handicap system serves multiple purposes:</strong> It levels the playing field in tournaments, tracks improvement over time, provides motivation through measurable goals, enables betting and calcuttas in friendly competition, and standardizes player skill levels globally. With a handicap, a 20-handicap player can compete fairly against a 5-handicap player by receiving extra strokes on difficult holes.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">World Handicap System (WHS) Overview</h3>
          <p className="text-gray-700 mb-4">
            The World Handicap System, implemented globally in 2020, unified six previous handicap systems into one worldwide standard. Developed by the USGA and R&A, WHS provides consistency and portability—your handicap means the same whether you play in California, Scotland, or Australia.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key WHS Features</h4>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Daily handicap revisions:</strong> Your Handicap Index updates after every posted round (vs. monthly or bi-weekly under old systems), reflecting current form.</li>
            <li><strong>Rolling 20-round window:</strong> Uses your most recent 20 scores (or fewer if you have under 20), automatically dropping oldest rounds as new ones are added.</li>
            <li><strong>Best 8 of 20 calculation:</strong> For 20 rounds, your index equals the average of your 8 best Score Differentials, rewarding good rounds while minimizing bad ones.</li>
            <li><strong>Global portability:</strong> One system worldwide eliminates confusion when traveling—your index is valid everywhere.</li>
            <li><strong>Course and Playing Handicaps:</strong> Clear distinction between your portable index and strokes received on specific courses.</li>
            <li><strong>Exceptional Score Reduction:</strong> Automatic adjustment when you shoot significantly better than expected, keeping handicaps current.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding Course Rating and Slope Rating</h3>
          <p className="text-gray-700 mb-4">
            Course Rating and Slope Rating are fundamental to handicap calculations, representing course difficulty from different perspectives:
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Course Rating</h4>
          <p className="text-gray-700 mb-4">
            Course Rating represents the expected score for a scratch golfer (0.0 Handicap Index) under normal playing conditions. Certified course raters evaluate ten obstacles including topography, fairway width, green target size, recoverability, bunkers, water hazards, trees, rough, and psychological factors. A par-72 course typically has a Course Rating near 72, but could be 70.5 (easy) or 75.2 (hard) depending on difficulty.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Course Rating factors:</strong> Length (yardage), forced carries over hazards, green size and contour, bunker placement and depth, fairway width and landing areas, rough thickness and penalization, elevation changes, wind exposure, and green speeds. Ratings consider playing from specific tee sets—championship tees have higher ratings than forward tees on the same course.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Slope Rating</h4>
          <p className="text-gray-700 mb-4">
            Slope Rating measures the relative difficulty of a course for bogey golfers (approximately 20 Handicap Index for men, 24 for women) compared to scratch golfers. The scale ranges from 55 (easiest) to 155 (hardest), with 113 being standard difficulty. Higher slope means the course is disproportionately harder for average players versus experts.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Why Slope matters:</strong> Some courses challenge all players equally (moderate slope), while others are especially punishing for higher handicaps (high slope). For example, a tight, tree-lined course with severe penalties for missed fairways might have Slope 140—scratch golfers manage the narrow layout, but bogey golfers lose multiple balls. Conversely, an open links-style course might have Slope 115—relatively fair for all skill levels.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Calculating Score Differential</h3>
          <p className="text-gray-700 mb-4">
            Score Differential is the foundation of handicap calculation, representing how well you played relative to the course difficulty. The formula normalizes scores from different courses for fair comparison:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-center text-xl font-mono text-gray-900 mb-4">
              Score Differential = (Adjusted Gross Score - Course Rating) × 113 ÷ Slope Rating
            </p>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Adjusted Gross Score:</strong> Your actual score with ESC (Equitable Stroke Control) applied</p>
              <p><strong>Course Rating:</strong> Expected scratch golfer score from the tees played</p>
              <p><strong>113:</strong> Standard slope rating (normalizing factor)</p>
              <p><strong>Slope Rating:</strong> Relative difficulty for bogey vs. scratch golfers</p>
            </div>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Score Differential Example</h4>
          <p className="text-gray-700 mb-4">
            <strong>Scenario:</strong> You shoot 92 on a course with Course Rating 72.5 and Slope Rating 130.
          </p>
          <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Calculate differential:</strong> (92 - 72.5) × 113 ÷ 130 = 19.5 × 0.869 = 16.9</li>
            <li><strong>Interpretation:</strong> Your differential of 16.9 represents how many strokes over scratch-level you played, adjusted for course difficulty.</li>
            <li><strong>Comparison:</strong> Shooting 92 on a Slope 130 course (16.9 differential) is better than 88 on a Slope 105 course (16.8 differential)—the harder course gives you more credit.</li>
          </ol>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How Handicap Index is Calculated</h3>
          <p className="text-gray-700 mb-4">
            Your Handicap Index is calculated using your best Score Differentials from recent rounds. The number of differentials used depends on how many rounds you have posted:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold border-b">Rounds Played</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Differentials Used</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Additional Adjustment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">3</td>
                  <td className="px-4 py-3">Lowest 1</td>
                  <td className="px-4 py-3">-2.0</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">4</td>
                  <td className="px-4 py-3">Lowest 1</td>
                  <td className="px-4 py-3">-1.0</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">5</td>
                  <td className="px-4 py-3">Lowest 1</td>
                  <td className="px-4 py-3">None</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">6</td>
                  <td className="px-4 py-3">Lowest 2, average</td>
                  <td className="px-4 py-3">None</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">7-8</td>
                  <td className="px-4 py-3">Lowest 2, average</td>
                  <td className="px-4 py-3">None</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">9-11</td>
                  <td className="px-4 py-3">Lowest 3, average</td>
                  <td className="px-4 py-3">None</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">12-14</td>
                  <td className="px-4 py-3">Lowest 4, average</td>
                  <td className="px-4 py-3">None</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">15-16</td>
                  <td className="px-4 py-3">Lowest 5, average</td>
                  <td className="px-4 py-3">None</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">17-18</td>
                  <td className="px-4 py-3">Lowest 6, average</td>
                  <td className="px-4 py-3">None</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">19</td>
                  <td className="px-4 py-3">Lowest 7, average</td>
                  <td className="px-4 py-3">None</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">20</td>
                  <td className="px-4 py-3">Lowest 8, average</td>
                  <td className="px-4 py-3">None</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculation Example</h4>
          <p className="text-gray-700 mb-4">
            <strong>Scenario:</strong> You have 20 posted rounds with these 10 best differentials (sorted): 12.3, 13.1, 13.8, 14.2, 14.9, 15.3, 15.8, 16.1, 16.7, 17.2
          </p>
          <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Select best 8:</strong> 12.3, 13.1, 13.8, 14.2, 14.9, 15.3, 15.8, 16.1</li>
            <li><strong>Calculate average:</strong> (12.3 + 13.1 + 13.8 + 14.2 + 14.9 + 15.3 + 15.8 + 16.1) ÷ 8 = 14.4</li>
            <li><strong>Handicap Index:</strong> 14.4 (rounded to one decimal)</li>
            <li><strong>Result:</strong> Your official Handicap Index is 14.4</li>
          </ol>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Course Handicap vs. Handicap Index</h3>
          <p className="text-gray-700 mb-4">
            Understanding the distinction between Handicap Index and Course Handicap is crucial for applying your handicap correctly:
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Handicap Index</h4>
          <p className="text-gray-700 mb-4">
            Your Handicap Index is a portable number representing your demonstrated ability. It is NOT the number of strokes you receive—it is a reference number used to calculate strokes for any course. Think of it as your golf "skill rating" that travels with you globally. Your index might be 14.5, but you might receive 12 strokes on an easy course or 18 strokes on a championship course.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Course Handicap</h4>
          <p className="text-gray-700 mb-4">
            Course Handicap is the number of strokes you actually receive for a specific course and tee set. It adjusts your Handicap Index for course difficulty using the formula:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-center text-xl font-mono text-gray-900 mb-4">
              Course Handicap = Handicap Index × (Slope Rating ÷ 113) + (Course Rating - Par)
            </p>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Course Handicap Examples</h4>
          <p className="text-gray-700 mb-4">
            <strong>Handicap Index: 15.0</strong>
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3 text-gray-700">
            <li>
              <strong>Easy Course (Slope 100, Rating 68.5, Par 72):</strong>
              <p>15.0 × (100 ÷ 113) + (68.5 - 72) = 13.3 - 3.5 = 9.8 → 10 strokes</p>
              <p className="text-sm">Easier course = fewer strokes needed</p>
            </li>
            <li>
              <strong>Average Course (Slope 113, Rating 72.0, Par 72):</strong>
              <p>15.0 × (113 ÷ 113) + (72.0 - 72) = 15.0 + 0 = 15 strokes</p>
              <p className="text-sm">Standard difficulty = index equals strokes</p>
            </li>
            <li>
              <strong>Hard Course (Slope 135, Rating 75.2, Par 72):</strong>
              <p>15.0 × (135 ÷ 113) + (75.2 - 72) = 17.9 + 3.2 = 21.1 → 21 strokes</p>
              <p className="text-sm">Harder course = more strokes provided</p>
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How to Improve Your Handicap</h3>
          <p className="text-gray-700 mb-4">
            Lowering your handicap requires focused improvement in key scoring areas. Statistics show where most strokes are lost:
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Short Game Mastery</h4>
          <p className="text-gray-700 mb-4">
            <strong>Approximately 60-65% of strokes occur within 100 yards.</strong> Improving putting, chipping, pitching, and bunker play yields fastest handicap improvement. Practice routines: 50 putts daily from 3, 6, 9 feet; chip to various pins from different lies; hit 20 bunker shots to tight pins; pitch to targets at 30, 50, 70, 90 yards. Track up-and-down percentage (getting up-and-down in 2 strokes from off green)—improving from 20% to 40% saves 4+ strokes per round.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Course Management</h4>
          <p className="text-gray-700 mb-4">
            Smart decisions save more strokes than perfect swings. Play to your strengths: if you slice, aim left and let it curve to target. Avoid hero shots—laying up is often the lower-scoring option. Target fat part of greens rather than tight pins. On par-5s, think "three good shots" not "reach in two." Manage par-3s conservatively—middle of green is success. Track fairways hit and greens in regulation to identify where strategy improvements help most.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Practice with Purpose</h4>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Establish baseline statistics:</strong> Track fairways hit, greens in regulation, putts per round, scrambling percentage over 5 rounds.</li>
            <li><strong>Identify weaknesses:</strong> Missing most greens right? Work on draw. Three-putting often? Lag putting drills.</li>
            <li><strong>Structured practice:</strong> Don't just hit balls—simulate course situations. Hit driver, then 7-iron from rough, then chip.</li>
            <li><strong>Quality over quantity:</strong> 30 focused chips beats 100 mindless swings. Each shot needs target and feedback.</li>
            <li><strong>Get professional help:</strong> Even one lesson identifying major flaw (grip, alignment, swing path) accelerates improvement.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Handicap Posting Requirements</h3>
          <p className="text-gray-700 mb-4">
            Maintaining an accurate, current handicap requires proper posting practices:
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What Rounds to Post</h4>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Post ALL rounds:</strong> Casual, tournament, practice—if played under Rules of Golf, post it. Selective posting (only good scores) is sandbagging.</li>
            <li><strong>Minimum holes:</strong> Post rounds of 7+ holes (calculate 18-hole score equivalent for 7-13 holes).</li>
            <li><strong>Playing conditions:</strong> Post rounds in all weather unless course unplayable (standing water, temp play rules).</li>
            <li><strong>Competition rounds:</strong> Always post tournament scores—these often represent best effort.</li>
            <li><strong>Timely posting:</strong> Post within 24 hours while score fresh in memory and round details accurate.</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Rounds NOT to Post</h4>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Playing alone for pleasure (must have at least one partner, witness, or marker)</li>
            <li>Rounds with non-conforming equipment or rules modifications (foot wedge, gimmes, mulligans)</li>
            <li>Practice rounds where you hit multiple balls or experiment with technique</li>
            <li>Incomplete rounds under 7 holes due to weather, injury, or darkness</li>
            <li>Indoor simulator rounds (unless approved by golf association)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Resources</h3>
          <p className="text-gray-700 mb-4">
            For more information on golf handicaps and improvement:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <a href="https://www.usga.org/handicapping.html" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                USGA Handicapping
              </a> - Official rules and guidelines for the World Handicap System
            </li>
            <li>
              <a href="https://www.randa.org/en/whs" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                R&A World Handicap System
              </a> - International handicap system information
            </li>
            <li>
              <a href="https://www.pga.com/play/improve-your-game" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                PGA Instruction
              </a> - Professional tips and lessons for game improvement
            </li>
            <li>
              <a href="https://www.ghin.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                GHIN (Golf Handicap Information Network)
              </a> - Official USGA handicap tracking service
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/pace-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="font-semibold text-gray-900">Pace Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate running and walking pace</p>
          </a>
          
          <a 
            href="/sports-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚽</div>
            <h3 className="font-semibold text-gray-900">Sports Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Various sports statistics</p>
          </a>
          
          <a 
            href="/statistics-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Statistics Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate statistical measures</p>
          </a>
          
          <a 
            href="/score-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900">Score Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate scores and rankings</p>
          </a>
        </div>
      </section>
    </div>
  );
}

