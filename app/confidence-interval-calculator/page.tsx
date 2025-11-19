import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import ConfidenceIntervalCalculator from '@/components/Calculator/ConfidenceIntervalCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Confidence Interval Calculator - Mean & Proportion CI Calculator | AICalculator',
  description: 'Free confidence interval calculator for means and proportions. Calculate CI with t-distribution or normal distribution, visualize intervals, and interpret results with statistical insights.',
  keywords: [
    'confidence interval calculator',
    'CI calculator',
    'confidence level calculator',
    'margin of error calculator',
    'mean confidence interval',
    'proportion confidence interval',
    't-distribution calculator',
    'normal distribution CI',
    'statistical confidence calculator',
    'confidence interval estimation',
    'standard error calculator',
    'critical value calculator',
    'interval estimation',
    'confidence bounds calculator',
    'sample mean CI',
    'population proportion CI',
    'statistical inference calculator',
    'confidence interval formula',
    'CI visualization',
    'precision calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Confidence Interval Calculator - Statistical CI Analysis',
    description: 'Calculate confidence intervals for means and proportions. Visualize statistical precision with t-distribution or normal distribution analysis.',
    type: 'website',
    url: getUrl('/confidence-interval-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [
      {
        url: getOgImage('confidence-interval'),
        width: 1200,
        height: 630,
        alt: 'Confidence Interval Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Confidence Interval Calculator - Mean & Proportion CI',
    description: 'Calculate confidence intervals with visual displays. Support for t-distribution, normal distribution, and comprehensive statistical analysis.',
    images: [getOgImage('confidence-interval')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/confidence-interval-calculator'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ConfidenceIntervalCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/confidence-interval-calculator'),
        name: 'Confidence Interval Calculator',
        url: getUrl('/confidence-interval-calculator'),
        description:
          'Professional confidence interval calculator for statistical analysis. Calculate intervals for means and proportions using t-distribution or normal distribution with comprehensive visualization and interpretation.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        featureList: [
          'Calculate confidence intervals for means',
          'Calculate confidence intervals for proportions',
          'Support for t-distribution and normal distribution',
          'Adjust confidence levels (90%, 95%, 99%)',
          'Visual interval comparison',
          'Standard error calculation',
          'Critical value determination',
          'Statistical interpretation guidance',
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/confidence-interval-calculator'),
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
            name: 'Confidence Interval Calculator',
            item: getUrl('/confidence-interval-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/confidence-interval-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a confidence interval and how do I interpret it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A confidence interval is a range of values that likely contains the true population parameter. For example, a 95% confidence interval of 45 to 55 means we are 95% confident the true population value falls within this range. The interpretation is probabilistic: if we repeated the study 100 times with new samples, approximately 95 of those confidence intervals would contain the true population value. A wider interval indicates less precision but higher confidence, while a narrower interval is more precise but may have lower confidence. The interval accounts for sampling variability and provides a practical range for decision-making rather than a single point estimate.',
            },
          },
          {
            '@type': 'Question',
            name: 'When should I use t-distribution versus normal distribution?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Use the t-distribution when: (1) sample size is small (typically less than 30), (2) population standard deviation is unknown, or (3) you want to be conservative with smaller samples. The t-distribution has heavier tails than the normal distribution, producing wider confidence intervals that account for uncertainty with limited data. As sample size increases, the t-distribution approaches the normal distribution. For samples larger than 30, the difference becomes negligible. Use the normal distribution (Z) when: (1) sample size is large (30 or more), (2) population standard deviation is known, or (3) working with proportions. Most real-world scenarios use t-distribution for means and normal distribution for proportions.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does confidence level affect the interval width?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Higher confidence levels produce wider intervals. For the same data with sample mean 50 and standard error 2: 90% CI (critical value 1.645) gives approximately 46.7 to 53.3 (width 6.6); 95% CI (critical value 1.96) gives approximately 46.1 to 53.9 (width 7.8); 99% CI (critical value 2.576) gives approximately 44.8 to 55.2 (width 10.4). This represents a tradeoff between confidence and precision. Higher confidence (99%) means we are more certain the interval contains the true value, but the interval is wider and less precise. Lower confidence (90%) gives a narrower, more precise interval, but with less certainty. Most research uses 95% as a balance, while 99% is reserved for critical decisions.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between margin of error and confidence interval?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The margin of error is half the width of the confidence interval. If your point estimate is 50 and your confidence interval is 45 to 55, the margin of error is 5. The relationship: Confidence Interval equals Point Estimate plus or minus Margin of Error. For example, mean equals 100, margin of error equals 5, gives CI of 95 to 105. The margin of error depends on: (1) confidence level (higher confidence equals larger margin), (2) sample size (larger sample equals smaller margin), and (3) data variability (higher standard deviation equals larger margin). Reducing margin of error requires increasing sample size, accepting lower confidence, or reducing data variability through better measurement.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate confidence intervals for proportions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For proportions, use the formula: CI equals p plus or minus Z times square root of (p times (1 minus p) divided by n), where p is the sample proportion, Z is the critical value (1.96 for 95%), and n is sample size. Example: Survey of 400 people, 240 say yes. Sample proportion p equals 240/400 equals 0.60. Standard error equals square root of (0.60 times 0.40 / 400) equals 0.0245. Margin of error equals 1.96 times 0.0245 equals 0.048. 95% CI equals 0.60 plus or minus 0.048 equals 0.552 to 0.648, or 55.2% to 64.8%. This means we are 95% confident the true population proportion who would say yes is between 55.2% and 64.8%. Always use normal distribution for proportions, and ensure np and n(1-p) are both at least 10.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why does sample size matter for confidence intervals?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sample size directly affects interval width through the standard error, which equals standard deviation divided by square root of n. Larger samples produce smaller standard errors and narrower intervals. Example with standard deviation 10 and 95% confidence: n equals 25 gives SE equals 2, CI width equals approximately 7.8; n equals 100 gives SE equals 1, CI width equals approximately 3.9 (50% narrower); n equals 400 gives SE equals 0.5, CI width equals approximately 2.0 (75% narrower than n equals 25). The relationship follows the square root law: to halve the interval width, you need 4 times the sample size. This creates diminishing returns - moving from 25 to 100 improves precision significantly, but moving from 400 to 1600 provides much less practical improvement.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/confidence-interval-calculator'),
        name: 'How to Calculate and Interpret Confidence Intervals',
        description: 'Step-by-step guide to calculating confidence intervals for means and proportions with proper interpretation.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Confidence Interval Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Calculation Type',
            text: 'Select whether you want to calculate a confidence interval for a mean (continuous data like height, weight, test scores) or a proportion (categorical data like yes/no responses, success rates). Means use t-distribution or normal distribution, while proportions typically use normal distribution.',
            url: getStepUrl('/confidence-interval-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Set Confidence Level',
            text: 'Choose your desired confidence level. 95% is standard for most research, providing a good balance between confidence and precision. Use 90% for exploratory studies or when precision is more important. Use 99% for critical decisions, safety studies, or regulatory requirements. Quick select buttons are available for common levels.',
            url: getStepUrl('/confidence-interval-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Sample Statistics',
            text: 'For means: enter your sample mean, sample standard deviation, and sample size. For proportions: enter the number of successes and total sample size. The calculator will compute the sample proportion automatically. Ensure your data meets assumptions - for proportions, both np and n(1-p) should be at least 10.',
            url: getStepUrl('/confidence-interval-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Select Distribution',
            text: 'For means with small samples (less than 30), use t-distribution. For large samples or known population standard deviation, you can use normal distribution. The calculator defaults to t-distribution for conservatism. The difference diminishes as sample size increases. Proportions always use normal distribution.',
            url: getStepUrl('/confidence-interval-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Calculate and Review Results',
            text: 'Click Calculate to see your confidence interval. Review the lower bound, upper bound, point estimate, and margin of error. The visualization shows the interval range and compares it to other confidence levels. Check the interpretation provided to understand what the interval means in practical terms.',
            url: getStepUrl('/confidence-interval-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Interpret the Interval',
            text: 'The confidence interval provides a range of plausible values for the population parameter. If the interval is 45 to 55 at 95% confidence, you can be 95% confident the true population value falls within this range. Consider the practical significance - is the interval narrow enough for your decision? Does it exclude important threshold values? Use the interval, not just the point estimate, for decision-making.',
            url: getStepUrl('/confidence-interval-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/confidence-interval-calculator'),
        headline: 'Confidence Interval Calculator - Complete Guide to Statistical Intervals',
        description:
          'Comprehensive guide to calculating and interpreting confidence intervals. Learn about t-distribution, normal distribution, margin of error, and how to use confidence intervals for statistical inference.',
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
        image: getOgImage('confidence-interval'),
        articleBody:
          'Confidence intervals are essential tools in statistics that provide a range of plausible values for population parameters. This guide explains how to calculate confidence intervals for means and proportions, when to use different distributions, and how to properly interpret results.',
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
        Confidence Interval Calculator - Calculate Mean and Proportion Confidence Intervals with Statistical Analysis
      </h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Confidence Interval Calculator"
        calculatorUrl="/confidence-interval-calculator"
      />

      {/* Calculator Component */}
      <ConfidenceIntervalCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Confidence Intervals: A Complete Statistical Guide
          </h2>

          <p className="text-gray-700 mb-4">
            Confidence intervals are one of the most important concepts in statistics, providing a
            range of plausible values for population parameters rather than relying on a single point
            estimate. Unlike a point estimate that gives you one number (like a sample mean of 50), a
            confidence interval acknowledges uncertainty and provides a range (like 45 to 55) along
            with a probability statement about how confident we are that the true population value
            falls within this range. This comprehensive guide will explain what confidence intervals
            are, how to calculate them correctly, and how to interpret them for meaningful
            decision-making.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            What is a Confidence Interval?
          </h3>

          <p className="text-gray-700 mb-4">
            A confidence interval is a range of values, derived from sample statistics, that is likely
            to contain the true population parameter. The general form is:
          </p>

          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 my-6 font-mono text-center">
            <div className="text-2xl mb-2">CI = Point Estimate ± Margin of Error</div>
            <div className="text-sm text-gray-600 mt-2">
              or equivalently: CI = Point Estimate ± (Critical Value × Standard Error)
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            The confidence level (typically 95%) tells us that if we were to repeat our study many
            times, approximately that percentage of the calculated confidence intervals would contain
            the true population parameter. It does NOT mean there is a 95% probability that the true
            value is in any one specific interval - the true value either is or is not in the interval.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Confidence Intervals for Means
          </h3>

          <p className="text-gray-700 mb-4">
            When calculating confidence intervals for a population mean, we use the formula:
          </p>

          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 my-6 font-mono text-center">
            <div className="text-2xl mb-2">CI = x̄ ± t × (s / √n)</div>
            <div className="text-sm text-gray-600 mt-2">
              where x̄ = sample mean, t = critical value from t-distribution,
              <br />
              s = sample standard deviation, n = sample size
            </div>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            When to Use T-Distribution vs Normal Distribution
          </h4>

          <p className="text-gray-700 mb-4">
            The choice between t-distribution and normal distribution (Z) depends on sample size and
            whether the population standard deviation is known:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Use t-distribution when:</strong> Sample size is small (typically n less than 30), population
              standard deviation is unknown (most real-world cases), or you want to be conservative.
              The t-distribution has heavier tails, producing wider intervals that account for
              additional uncertainty with limited data.
            </li>
            <li>
              <strong>Use normal distribution (Z) when:</strong> Sample size is large (n greater than or equal to 30), population
              standard deviation is known, or working with proportions. As sample size increases, the
              t-distribution converges to the normal distribution.
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Practical Example: Mean Confidence Interval
          </h4>

          <p className="text-gray-700 mb-4">
            Suppose a researcher measures the average time to complete a task in a sample of 25
            participants. The sample mean is 100 seconds with a standard deviation of 15 seconds.
            Calculate the 95% confidence interval:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
            <li>Sample mean (x̄) = 100 seconds</li>
            <li>Sample standard deviation (s) = 15 seconds</li>
            <li>Sample size (n) = 25</li>
            <li>Degrees of freedom (df) = n - 1 = 24</li>
            <li>Critical value (t) for 95% CI with df = 24: t = 2.064</li>
            <li>Standard error (SE) = s / √n = 15 / √25 = 15 / 5 = 3</li>
            <li>Margin of error = t × SE = 2.064 × 3 = 6.192</li>
            <li>95% CI = 100 ± 6.192 = (93.8, 106.2) seconds</li>
          </ul>

          <p className="text-gray-700 mb-4">
            Interpretation: We are 95% confident that the true population mean time to complete the
            task is between 93.8 and 106.2 seconds.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Confidence Intervals for Proportions
          </h3>

          <p className="text-gray-700 mb-4">
            For population proportions (percentages, rates, probabilities), we use the formula:
          </p>

          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 my-6 font-mono text-center">
            <div className="text-2xl mb-2">CI = p ± Z × √(p(1-p) / n)</div>
            <div className="text-sm text-gray-600 mt-2">
              where p = sample proportion, Z = critical value (1.96 for 95%),
              <br />
              n = sample size
            </div>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Practical Example: Proportion Confidence Interval
          </h4>

          <p className="text-gray-700 mb-4">
            A survey of 400 voters finds that 240 support a candidate. Calculate the 95% confidence
            interval for the true proportion of support:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
            <li>Number of supporters = 240</li>
            <li>Sample size (n) = 400</li>
            <li>Sample proportion (p) = 240/400 = 0.60 (60%)</li>
            <li>Critical value (Z) for 95% CI = 1.96</li>
            <li>Standard error = √(0.60 × 0.40 / 400) = √(0.24 / 400) = √0.0006 = 0.0245</li>
            <li>Margin of error = 1.96 × 0.0245 = 0.048 (4.8%)</li>
            <li>95% CI = 0.60 ± 0.048 = (0.552, 0.648) or (55.2%, 64.8%)</li>
          </ul>

          <p className="text-gray-700 mb-4">
            Interpretation: We are 95% confident that the true proportion of voters who support the
            candidate is between 55.2% and 64.8%. Note that this interval does not include 50%, so we
            can be fairly confident the candidate has majority support.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Factors Affecting Confidence Interval Width
          </h3>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            1. Confidence Level
          </h4>

          <p className="text-gray-700 mb-4">
            Higher confidence levels produce wider intervals. Using the same sample data (mean = 50,
            SE = 2):
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
            <li>90% CI (Z = 1.645): 50 ± 3.29 = (46.71, 53.29) - width 6.58</li>
            <li>95% CI (Z = 1.96): 50 ± 3.92 = (46.08, 53.92) - width 7.84</li>
            <li>99% CI (Z = 2.576): 50 ± 5.15 = (44.85, 55.15) - width 10.30</li>
          </ul>

          <p className="text-gray-700 mb-4">
            This represents the tradeoff between confidence and precision. Most research uses 95% as a
            reasonable balance.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            2. Sample Size
          </h4>

          <p className="text-gray-700 mb-4">
            Larger samples produce narrower intervals because standard error decreases with the square
            root of sample size. With standard deviation = 10 and 95% confidence:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
            <li>n = 25: SE = 10/5 = 2.0, CI width ≈ 7.8</li>
            <li>n = 100: SE = 10/10 = 1.0, CI width ≈ 3.9 (50% narrower)</li>
            <li>n = 400: SE = 10/20 = 0.5, CI width ≈ 2.0 (75% narrower than n=25)</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            3. Data Variability
          </h4>

          <p className="text-gray-700 mb-4">
            More variable data (larger standard deviation) produces wider intervals. With n = 100 and
            95% confidence:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
            <li>SD = 5: SE = 0.5, CI width ≈ 2.0</li>
            <li>SD = 10: SE = 1.0, CI width ≈ 3.9</li>
            <li>SD = 20: SE = 2.0, CI width ≈ 7.8</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common Misconceptions
          </h3>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            1. Misinterpreting the Confidence Level
          </h4>

          <p className="text-gray-700 mb-4">
            <strong>Incorrect:</strong> There is a 95% probability that the true value is in the
            interval 45 to 55.
          </p>

          <p className="text-gray-700 mb-4">
            <strong>Correct:</strong> If we repeated this study many times, 95% of the calculated
            intervals would contain the true population value. For any single interval, the true value
            either is or is not in the range - we just do not know which.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            2. Confusing Confidence Intervals with Prediction Intervals
          </h4>

          <p className="text-gray-700 mb-4">
            A confidence interval estimates where the population parameter lies. A prediction interval
            estimates where a future individual observation will fall. Prediction intervals are always
            wider because they account for both sampling variability and individual variability.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Additional Resources</h3>

          <p className="text-gray-700 mb-4">
            For more information on confidence intervals and statistical inference:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <a
                href="https://www.stat.yale.edu/Courses/1997-98/101/confint.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Yale Statistics - Confidence Intervals
              </a>
            </li>
            <li>
              <a
                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2689604/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                NIH - Understanding Confidence Intervals
              </a>
            </li>
            <li>
              <a
                href="https://www.cdc.gov/csels/dsepd/ss1978/lesson3/section3.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                CDC - Confidence Intervals
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/sample-size-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Sample Size Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Determine required sample sizes for studies</p>
          </a>

          <a
            href="/z-score-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">Z-Score Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Convert raw scores to standard scores</p>
          </a>

          <a
            href="/t-test-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔬</div>
            <h3 className="font-semibold text-gray-900">T-Test Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Compare means of two groups</p>
          </a>

          <a
            href="/statistics-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Statistics Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate descriptive statistics</p>
          </a>

          <a
            href="/standard-deviation-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📉</div>
            <h3 className="font-semibold text-gray-900">Standard Deviation Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Measure data spread and variability</p>
          </a>

          <a
            href="/p-value-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🅿️</div>
            <h3 className="font-semibold text-gray-900">P-value Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Determine statistical significance</p>
          </a>

          <a
            href="/margin-of-error-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">±</div>
            <h3 className="font-semibold text-gray-900">Margin of Error Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate survey precision</p>
          </a>

          <a
            href="/hypothesis-test-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🧪</div>
            <h3 className="font-semibold text-gray-900">Hypothesis Test Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Test statistical hypotheses</p>
          </a>
        </div>
      </section>
    </div>
  );
}

