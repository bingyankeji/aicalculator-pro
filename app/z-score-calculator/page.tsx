import { Metadata } from 'next';
import ZScoreCalculator from '@/components/Calculator/ZScoreCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Z-Score Calculator - Standard Score & Percentile Calculator | AICalculator',
  description: 'Free Z-score calculator with normal distribution visualization. Convert raw scores to Z-scores, calculate percentiles, and interpret standard scores with interactive charts.',
  keywords: [
    'z score calculator',
    'z-score calculator',
    'standard score calculator',
    'percentile calculator',
    'normal distribution calculator',
    'z value calculator',
    'standard score',
    'percentile rank',
    'z score to percentile',
    'percentile to z score',
    'normal curve',
    'standard normal distribution',
    'z score interpretation',
    'z score table',
    'statistics z score',
    'exam percentile calculator',
    'test score percentile',
    'z score formula',
    'how to calculate z score',
    'z score meaning',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Z-Score Calculator - Statistical Standard Score Analysis',
    description: 'Calculate Z-scores and percentiles with visual normal distribution. Convert raw scores to standard scores and interpret statistical significance.',
    type: 'website',
    url: getUrl('/z-score-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [
      {
        url: getOgImage('z-score'),
        width: 1200,
        height: 630,
        alt: 'Z-Score Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Z-Score Calculator - Standard Score & Percentile',
    description: 'Calculate Z-scores with visual normal distribution. Understand percentile ranks and statistical significance.',
    images: [getOgImage('z-score')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/z-score-calculator'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ZScoreCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/z-score-calculator'),
        name: 'Z-Score Calculator',
        url: getUrl('/z-score-calculator'),
        description:
          'Free Z-score calculator for statistical analysis. Convert raw scores to standard scores, calculate percentiles, and visualize results on the normal distribution curve with comprehensive interpretation.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        featureList: [
          'Calculate Z-scores from raw scores',
          'Convert Z-scores to percentiles',
          'Bidirectional conversion (score to Z, Z to score)',
          'Normal distribution visualization',
          'Percentile rank interpretation',
          'Statistical significance assessment',
          'Interactive standard normal curve',
          'Detailed Z-score interpretation',
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/z-score-calculator'),
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
            name: 'Math & Statistics',
            item: getUrl('/math-statistics'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Z-Score Calculator',
            item: getUrl('/z-score-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/z-score-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a Z-score and how is it calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A Z-score is a statistical measurement that describes how many standard deviations a data point is from the mean. The formula is Z = (X - μ) / σ, where X is the raw score, μ (mu) is the population mean, and σ (sigma) is the standard deviation. For example, if a test score is 85, the class mean is 75, and the standard deviation is 10, then Z = (85 - 75) / 10 = 1.0. This means the score is 1 standard deviation above the mean. Z-scores allow you to compare data points from different distributions and determine statistical significance.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I interpret Z-scores and percentiles?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Z-scores tell you how unusual or typical a value is. A Z-score of 0 means the value equals the mean. Positive Z-scores are above average, negative ones below. In a normal distribution: Z between -1 and +1 covers 68% of data (average range); Z between -2 and +2 covers 95% (typical range); Z beyond ±2 is unusual (top/bottom 5%); Z beyond ±3 is extremely rare (top/bottom 0.3%). The percentile shows what percentage of data falls below your score. For example, a Z-score of 1.0 corresponds to the 84th percentile, meaning the score is better than 84% of all scores.',
            },
          },
          {
            '@type': 'Question',
            name: 'What does a negative Z-score mean?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A negative Z-score means the raw score is below the mean. The magnitude tells you how far below. For example, Z = -1.5 means the score is 1.5 standard deviations below average. This corresponds to approximately the 7th percentile, meaning only 7% of scores are lower. Negative Z-scores are not necessarily bad - their interpretation depends on context. In golf (where lower is better), a negative Z-score for strokes is good. For test scores, a negative Z-score indicates below-average performance. The key is understanding what the measurement represents.',
            },
          },
          {
            '@type': 'Question',
            name: 'When should I use Z-scores instead of raw scores?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Use Z-scores when you need to compare scores from different tests or distributions. For example, comparing a 1300 SAT score (mean 1050, SD 200) to a 28 ACT score (mean 21, SD 5) - raw scores cannot be compared directly. Converting to Z-scores: SAT Z = (1300-1050)/200 = 1.25; ACT Z = (28-21)/5 = 1.40. The ACT score is relatively better. Z-scores are also essential for identifying outliers, calculating probabilities, conducting statistical tests, and standardizing data before machine learning. Any time you need to assess relative standing or compare apples to oranges, Z-scores are the solution.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the 68-95-99.7 rule for Z-scores?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The 68-95-99.7 rule, also called the empirical rule, describes how data is distributed in a normal distribution. 68% of data falls within 1 standard deviation of the mean (Z between -1 and +1). 95% falls within 2 standard deviations (Z between -2 and +2). 99.7% falls within 3 standard deviations (Z between -3 and +3). This means only 0.3% of data has Z-scores beyond ±3, making such values extremely unusual. This rule is fundamental for quality control, hypothesis testing, and determining whether observations are typical or outliers. It applies specifically to normal distributions.',
            },
          },
          {
            '@type': 'Question',
            name: 'How are Z-scores used in standardized testing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Standardized tests like the SAT, ACT, IQ tests, and GRE use Z-scores to compare individual performance to the test-taking population. Test makers set a predetermined mean and standard deviation (e.g., SAT: mean 1050, SD 200; IQ: mean 100, SD 15), then convert raw scores to this scale. Your percentile rank comes from your Z-score - for example, SAT 1250 has Z = 1.0, placing you in the 84th percentile. This allows colleges to compare applicants fairly regardless of test difficulty variations. Z-scores also enable combining subscores (math, verbal) meaningfully and identifying gifted students (typically 2+ standard deviations above mean) for specialized programs.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/z-score-calculator'),
        name: 'How to Calculate and Interpret Z-Scores',
        description: 'Step-by-step guide to calculating Z-scores, converting them to percentiles, and interpreting standard scores for statistical analysis.',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Z-Score Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Calculation Direction',
            text: 'Select whether you want to convert a raw score to a Z-score (score to Z) or convert a Z-score back to a raw score (Z to score). For most cases analyzing test scores or measurements, you will use score to Z. Use Z to score when you know the Z-score and want to find the corresponding raw value.',
            url: getStepUrl('/z-score-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter the Raw Score',
            text: 'Input the actual measurement or test score you want to analyze. This could be an exam grade (e.g., 85), a height measurement (e.g., 72 inches), a test score (e.g., 1200 SAT), or any numerical value you want to standardize. This is the X in the formula Z = (X - μ) / σ.',
            url: getStepUrl('/z-score-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter the Mean',
            text: 'Input the population or sample mean (average). This is the central value of your distribution. For standardized tests, this is provided (SAT mean = 1050, IQ mean = 100). For your own data, calculate the average of all values. This is μ (mu) in the formula.',
            url: getStepUrl('/z-score-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Enter the Standard Deviation',
            text: 'Input the standard deviation, which measures how spread out the data is. For standardized tests, this is provided (SAT SD = 200, IQ SD = 15). For your own data, calculate the standard deviation of your dataset. Larger standard deviations mean more variability in the data. This is σ (sigma) in the formula.',
            url: getStepUrl('/z-score-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Calculate and View Z-Score',
            text: 'Click Calculate to compute your Z-score. The calculator shows your Z-score (how many standard deviations from the mean), percentile rank (percentage of scores below yours), and a visual representation on the normal distribution curve. Positive Z-scores are above average, negative ones below average.',
            url: getStepUrl('/z-score-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Interpret the Results',
            text: 'Review the interpretation provided. Z-scores between -1 and +1 are average (68% of population). Z-scores between 1 and 2 or -1 and -2 are moderately above or below average (27% of population). Z-scores beyond ±2 are unusual (5% of population). Use the percentile to understand your relative standing - 50th percentile is average, 84th percentile is very good (1 SD above mean), 98th percentile is excellent (2 SD above mean).',
            url: getStepUrl('/z-score-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/z-score-calculator'),
        headline: 'Z-Score Calculator - Complete Guide to Standard Scores and Percentiles',
        description:
          'Comprehensive guide to calculating and interpreting Z-scores. Learn how standard scores work, what percentiles mean, and how to use Z-scores for statistical analysis and comparing data from different distributions.',
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
        dateModified: '2024-11-17',
        image: getOgImage('z-score'),
        articleBody:
          'Z-scores are fundamental statistical tools that standardize data by expressing values in terms of standard deviations from the mean. This comprehensive guide explains Z-score calculation, interpretation, and applications in real-world scenarios.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        Z-Score Calculator - Calculate Standard Scores, Percentiles, and Interpret Normal Distribution
      </h1>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol
            className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a
                href="/math-statistics"
                itemProp="item"
                className="hover:text-blue-600 transition-colors"
              >
                <span itemProp="name">Math & Statistics</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Z-Score Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <ZScoreCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Z-Scores: A Complete Guide to Standard Scores
          </h2>

          <p className="text-gray-700 mb-4">
            Z-scores are one of the most powerful and widely used tools in statistics, enabling us
            to standardize data, compare values from different distributions, and determine how
            unusual or typical a particular observation is. Whether you are analyzing test scores,
            conducting quality control in manufacturing, comparing investment returns, or evaluating
            medical measurements, Z-scores provide a universal language for understanding where a
            value stands relative to its distribution. This comprehensive guide explains everything
            you need to know about Z-scores, from basic calculation to advanced interpretation.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            What is a Z-Score?
          </h3>

          <p className="text-gray-700 mb-4">
            A Z-score, also known as a standard score, is a statistical measurement that describes a
            value's relationship to the mean of a group of values. Specifically, it tells you how
            many standard deviations a data point is from the mean. The beauty of Z-scores lies in
            their ability to standardize different measurements onto a common scale, allowing direct
            comparisons between datasets that originally had different units, means, or scales.
          </p>

          <p className="text-gray-700 mb-4">
            The fundamental formula for calculating a Z-score is:
          </p>

          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 my-6 font-mono text-center">
            <div className="text-2xl mb-2">Z = (X - μ) / σ</div>
            <div className="text-sm text-gray-600 mt-2">
              where X = raw score, μ = population mean, σ = standard deviation
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            Breaking down this formula:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>X (raw score):</strong> The actual value or measurement you are analyzing
            </li>
            <li>
              <strong>μ (mu - population mean):</strong> The average of all values in the dataset
              or population
            </li>
            <li>
              <strong>σ (sigma - standard deviation):</strong> A measure of how spread out the
              values are from the mean
            </li>
            <li>
              <strong>Z (Z-score):</strong> The resulting standardized value expressing how many
              standard deviations X is from μ
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Practical Example
          </h4>

          <p className="text-gray-700 mb-4">
            Consider a student who scored 85 on a test where the class mean was 75 and the standard
            deviation was 10 points. To calculate the Z-score:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
            <li>X = 85 (the student's score)</li>
            <li>μ = 75 (class average)</li>
            <li>σ = 10 (standard deviation)</li>
            <li>Z = (85 - 75) / 10 = 10 / 10 = 1.0</li>
          </ul>

          <p className="text-gray-700 mb-4">
            The Z-score of 1.0 means this student scored exactly 1 standard deviation above the
            class mean. In a normal distribution, this places them approximately at the 84th
            percentile, meaning they scored better than about 84% of the class.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Interpreting Z-Scores: The Normal Distribution
          </h3>

          <p className="text-gray-700 mb-4">
            Z-scores are most powerful when data follows a normal distribution (the bell curve).
            While not all real-world data is perfectly normal, many phenomena approximate this
            distribution, making Z-score interpretation broadly applicable. Understanding the
            normal distribution is key to interpreting what your Z-score means.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            The 68-95-99.7 Rule (Empirical Rule)
          </h4>

          <p className="text-gray-700 mb-4">
            This fundamental rule describes how data is distributed in a normal distribution:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>68% of data</strong> falls within 1 standard deviation of the mean (Z between
              -1 and +1) - This is the typical or average range
            </li>
            <li>
              <strong>95% of data</strong> falls within 2 standard deviations (Z between -2 and +2)
              - This captures almost all typical values
            </li>
            <li>
              <strong>99.7% of data</strong> falls within 3 standard deviations (Z between -3 and
              +3) - Values beyond this are extremely rare
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Z-Score Interpretation Guide
          </h4>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Z-Score Range</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Percentile</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Interpretation</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Frequency</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Above +3.0</td>
                  <td className="border border-gray-300 px-4 py-2">99.9%+</td>
                  <td className="border border-gray-300 px-4 py-2">Extremely high/exceptional</td>
                  <td className="border border-gray-300 px-4 py-2">0.1% (1 in 1,000)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">+2.0 to +3.0</td>
                  <td className="border border-gray-300 px-4 py-2">97.7% - 99.9%</td>
                  <td className="border border-gray-300 px-4 py-2">Very high</td>
                  <td className="border border-gray-300 px-4 py-2">2.3% (1 in 44)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">+1.0 to +2.0</td>
                  <td className="border border-gray-300 px-4 py-2">84.1% - 97.7%</td>
                  <td className="border border-gray-300 px-4 py-2">Above average</td>
                  <td className="border border-gray-300 px-4 py-2">13.6% (1 in 7)</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-2">-1.0 to +1.0</td>
                  <td className="border border-gray-300 px-4 py-2">15.9% - 84.1%</td>
                  <td className="border border-gray-300 px-4 py-2">Average/typical</td>
                  <td className="border border-gray-300 px-4 py-2">68.3% (2 in 3)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">-2.0 to -1.0</td>
                  <td className="border border-gray-300 px-4 py-2">2.3% - 15.9%</td>
                  <td className="border border-gray-300 px-4 py-2">Below average</td>
                  <td className="border border-gray-300 px-4 py-2">13.6% (1 in 7)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">-3.0 to -2.0</td>
                  <td className="border border-gray-300 px-4 py-2">0.1% - 2.3%</td>
                  <td className="border border-gray-300 px-4 py-2">Very low</td>
                  <td className="border border-gray-300 px-4 py-2">2.3% (1 in 44)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Below -3.0</td>
                  <td className="border border-gray-300 px-4 py-2">0.1% or less</td>
                  <td className="border border-gray-300 px-4 py-2">Extremely low/unusual</td>
                  <td className="border border-gray-300 px-4 py-2">0.1% (1 in 1,000)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Real-World Applications of Z-Scores
          </h3>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            1. Standardized Testing (SAT, ACT, IQ)
          </h4>

          <p className="text-gray-700 mb-4">
            Standardized tests use Z-scores extensively to compare student performance:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>SAT:</strong> Mean = 1050, SD = 200. A score of 1250 gives Z = (1250 - 1050)
              / 200 = 1.0, placing you at the 84th percentile.
            </li>
            <li>
              <strong>ACT:</strong> Mean = 21, SD = 5. A score of 28 gives Z = (28 - 21) / 5 =
              1.4, placing you at approximately the 92nd percentile.
            </li>
            <li>
              <strong>IQ Tests:</strong> Mean = 100, SD = 15. An IQ of 130 gives Z = (130 - 100) /
              15 = 2.0, placing you at the 98th percentile (often considered gifted).
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            These standardized Z-scores allow colleges to compare applicants fairly, regardless of
            which test they took or minor variations in test difficulty across administrations.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            2. Medical and Health Measurements
          </h4>

          <p className="text-gray-700 mb-4">
            Healthcare professionals use Z-scores to assess whether measurements fall within normal
            ranges:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Bone Density (T-scores):</strong> T-scores are essentially Z-scores
              comparing your bone density to young adults. T-scores below -2.5 indicate
              osteoporosis.
            </li>
            <li>
              <strong>Child Growth Charts:</strong> Pediatricians use Z-scores to determine if a
              child's height or weight is within normal ranges compared to age and gender norms.
            </li>
            <li>
              <strong>Blood Pressure and Lab Values:</strong> Values beyond ±2 or ±3 standard
              deviations may indicate health concerns requiring intervention.
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            3. Quality Control and Manufacturing
          </h4>

          <p className="text-gray-700 mb-4">
            Industries use Z-scores (often called process capability indices) to monitor product
            quality:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              Products with measurements beyond ±3 standard deviations are typically rejected as
              defects
            </li>
            <li>
              Six Sigma quality programs aim for defect rates corresponding to Z-scores of ±6
              (3.4 defects per million)
            </li>
            <li>
              Control charts plot Z-scores over time to detect when processes drift out of
              specification
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            4. Finance and Investment Analysis
          </h4>

          <p className="text-gray-700 mb-4">
            Financial analysts use Z-scores to assess risk and compare investments:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Sharpe Ratio:</strong> Measures risk-adjusted returns using a Z-score
              framework
            </li>
            <li>
              <strong>Outlier Detection:</strong> Returns beyond ±2 or ±3 standard deviations
              signal unusual market events
            </li>
            <li>
              <strong>Credit Scoring:</strong> The Altman Z-score predicts bankruptcy probability
              for companies
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common Mistakes and Misconceptions
          </h3>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            1. Assuming All Data is Normal
          </h4>

          <p className="text-gray-700 mb-4">
            Z-score percentiles are most accurate for normally distributed data. Skewed
            distributions (income, housing prices, infection rates) may not follow the 68-95-99.7
            rule. For highly skewed data, percentiles should be calculated empirically rather than
            assuming normality.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            2. Confusing Z-Scores with Percentiles
          </h4>

          <p className="text-gray-700 mb-4">
            A Z-score of 2.0 does NOT mean you are in the 2nd percentile - it means you are in
            approximately the 98th percentile (2 standard deviations above mean). Always convert
            Z-scores to percentiles using the standard normal distribution table or calculator.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            3. Interpreting Negative Z-Scores as Bad
          </h4>

          <p className="text-gray-700 mb-4">
            Negative Z-scores simply mean below average - whether this is good or bad depends on
            context. For golf scores, expenses, or error rates, negative Z-scores (below average)
            are desirable. Always consider what the measurement represents before evaluating
            whether high or low Z-scores are preferable.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Comparing Scores from Different Distributions
          </h3>

          <p className="text-gray-700 mb-4">
            One of the most powerful applications of Z-scores is comparing performance across
            different tests or measurements. Consider a student deciding which standardized test
            score to submit to colleges:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>SAT Score: 1300 (mean = 1050, SD = 200) → Z = 1.25 (89th percentile)</li>
            <li>ACT Score: 28 (mean = 21, SD = 5) → Z = 1.40 (92nd percentile)</li>
          </ul>

          <p className="text-gray-700 mb-4">
            The raw scores cannot be directly compared (1300 vs 28 is meaningless), but the
            Z-scores reveal that the ACT score represents slightly stronger performance relative to
            each test's distribution. The student should submit the ACT score.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Additional Resources</h3>

          <p className="text-gray-700 mb-4">
            For more in-depth understanding of Z-scores, statistics, and normal distributions,
            consider these authoritative resources:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <a
                href="https://www.khanacademy.org/math/statistics-probability"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Khan Academy - Statistics and Probability
              </a>{' '}
              - Free comprehensive statistics courses
            </li>
            <li>
              <a
                href="https://www.statisticshowto.com/probability-and-statistics/z-score/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Statistics How To - Z-Score Guide
              </a>{' '}
              - Detailed explanations with examples
            </li>
            <li>
              <a
                href="https://www.mathsisfun.com/data/standard-normal-distribution.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Math is Fun - Standard Normal Distribution
              </a>{' '}
              - Visual explanations and interactive tools
            </li>
            <li>
              <a
                href="https://www.cdc.gov/growthcharts/clinical_charts.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                CDC - Growth Charts
              </a>{' '}
              - Real-world application in pediatric health
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/statistics-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Statistics Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate mean, median, mode, and standard deviation</p>
          </a>

          <a
            href="/standard-deviation-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">Standard Deviation Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Measure data spread and variability</p>
          </a>

          <a
            href="/percentile-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📉</div>
            <h3 className="font-semibold text-gray-900">Percentile Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Find percentile ranks and values</p>
          </a>

          <a
            href="/confidence-interval-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900">Confidence Interval Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate statistical confidence intervals</p>
          </a>

          <a
            href="/sample-size-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔬</div>
            <h3 className="font-semibold text-gray-900">Sample Size Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Determine required sample sizes for studies</p>
          </a>

          <a
            href="/t-test-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🧪</div>
            <h3 className="font-semibold text-gray-900">T-Test Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Compare means of two groups</p>
          </a>

          <a
            href="/normal-distribution-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📐</div>
            <h3 className="font-semibold text-gray-900">Normal Distribution Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate probabilities for normal distributions</p>
          </a>

          <a
            href="/probability-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎲</div>
            <h3 className="font-semibold text-gray-900">Probability Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Determine the likelihood of events</p>
          </a>
        </div>
      </section>
    </div>
  );
}

