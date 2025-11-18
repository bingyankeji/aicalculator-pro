import { Metadata } from 'next';
import PValueCalculator from '@/components/Calculator/PValueCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'P-Value Calculator - Statistical Significance Testing | AICalculator',
  description: 'Free P-value calculator for t-test, z-test, chi-square, and F-test. Calculate statistical significance with detailed interpretation and visualization.',
  keywords: [
    'p value calculator',
    'p-value calculator',
    'statistical significance calculator',
    't test p value',
    'z test p value',
    'chi square p value',
    'f test p value',
    'hypothesis testing calculator',
    'significance level calculator',
    'statistical test calculator',
    'null hypothesis calculator',
    'p value interpretation',
    'p value meaning',
    'calculate p value',
    'statistical significance test',
    'two tailed p value',
    'one tailed p value',
    'p value formula',
    'significance testing',
    'statistical inference calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'P-Value Calculator - Statistical Significance Testing',
    description: 'Calculate P-values for hypothesis testing. Support for t-test, z-test, chi-square, and F-test with detailed interpretation.',
    type: 'website',
    url: getUrl('/p-value-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [
      {
        url: getOgImage('p-value'),
        width: 1200,
        height: 630,
        alt: 'P-Value Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'P-Value Calculator - Hypothesis Testing',
    description: 'Calculate P-values for statistical significance testing. Multiple test types with comprehensive interpretation.',
    images: [getOgImage('p-value')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/p-value-calculator'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PValueCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/p-value-calculator'),
        name: 'P-Value Calculator',
        url: getUrl('/p-value-calculator'),
        description:
          'Free P-value calculator for statistical hypothesis testing. Calculate P-values from Z-scores, t-tests, chi-square tests, and F-tests with detailed interpretation, visualization, and significance assessment.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        featureList: [
          'Quick Z-score to P-value conversion',
          'Calculate all P-value types (left-tail, right-tail, two-tail)',
          'Support for t-test, Z-test, chi-square, F-test',
          'Normal distribution visualization',
          'Statistical significance interpretation',
          'Hypothesis testing guidance',
          'Significance level assessment',
          'Detailed probability calculations',
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/p-value-calculator'),
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
            name: 'P-Value Calculator',
            item: getUrl('/p-value-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/p-value-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a P-value and how is it calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A P-value is the probability of obtaining test results at least as extreme as the observed results, assuming the null hypothesis is true. It quantifies the strength of evidence against the null hypothesis. P-values are calculated from test statistics (like t, Z, chi-square, or F values) using their respective probability distributions. For example, if you conduct a t-test and get a test statistic of 2.5 with 30 degrees of freedom, the P-value tells you how likely it is to observe a t-value of 2.5 or more extreme if there truly is no difference between groups. A small P-value (typically less than 0.05) suggests the observed data is unlikely under the null hypothesis, providing evidence to reject it.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I interpret P-values in hypothesis testing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'P-value interpretation depends on your chosen significance level (alpha, typically 0.05). If P-value less than alpha (e.g., P less than 0.05): The result is statistically significant. Reject the null hypothesis. The evidence suggests a real effect exists. If P-value greater than or equal to alpha: The result is not statistically significant. Fail to reject the null hypothesis. Insufficient evidence to conclude an effect exists. Important: A P-value does not tell you the size of an effect, the probability the hypothesis is true, or the importance of a finding. A P-value of 0.04 is not meaningfully different from 0.06, despite being on opposite sides of the 0.05 threshold. Always consider effect size, confidence intervals, and practical significance alongside P-values.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between one-tailed and two-tailed P-values?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The choice between one-tailed and two-tailed tests depends on your research hypothesis. Two-tailed test: Tests if the parameter is different in either direction (greater than OR less than). Used when you do not have a directional hypothesis. P-value considers both tails of the distribution. Example: Testing if a new drug has any effect (better or worse). One-tailed test (right-tailed): Tests if the parameter is greater than the null value. Used when you specifically hypothesize an increase. P-value considers only the right tail. Example: Testing if a training program improves scores. One-tailed test (left-tailed): Tests if the parameter is less than the null value. Used when you specifically hypothesize a decrease. Example: Testing if a diet reduces weight. Two-tailed P-values are generally twice the value of one-tailed P-values for the same test statistic. Use two-tailed tests unless you have strong theoretical justification for a directional hypothesis.',
            },
          },
          {
            '@type': 'Question',
            name: 'What does P equals 0.05 really mean?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'P equals 0.05 is a conventional threshold (alpha level) used to determine statistical significance, not a property of your data. It means you are willing to accept a 5% chance of incorrectly rejecting the null hypothesis when it is actually true (Type I error). The choice of 0.05 is arbitrary and historical - Ronald Fisher suggested it as a convenient benchmark in the 1920s. Different fields and contexts may use different thresholds: 0.10 for exploratory research, 0.01 for more stringent evidence requirements, 0.001 or lower for fields like particle physics. When your calculated P-value is less than 0.05, you have results that would occur less than 5% of the time by chance alone if the null hypothesis were true. This provides reasonable (but not definitive) evidence against the null hypothesis. The P equals 0.05 threshold should not be treated as an absolute dividing line between truth and falsehood.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are common misconceptions about P-values?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'P-values are widely misunderstood. Here are critical misconceptions to avoid: WRONG: P-value is the probability the null hypothesis is true. CORRECT: P-value is the probability of observing your data (or more extreme) IF the null hypothesis is true. WRONG: P equals 0.05 means there is a 5% chance your result is due to chance. CORRECT: It means results this extreme would occur 5% of the time if there truly is no effect. WRONG: A small P-value means the effect is large or important. CORRECT: P-values measure evidence strength, not effect size. Large samples can yield tiny P-values for trivial effects. WRONG: A non-significant result proves there is no effect. CORRECT: It means you lack sufficient evidence to detect an effect. The effect might exist but be too small to detect with your sample size. WRONG: P equals 0.049 is meaningfully different from P equals 0.051. CORRECT: These are essentially the same; treating 0.05 as a bright line is arbitrary. Always report exact P-values and consider effect sizes, confidence intervals, and study context alongside significance testing.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do P-values relate to confidence intervals?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'P-values and confidence intervals are complementary ways to assess statistical significance and provide different but related information. A 95% confidence interval corresponds to a two-tailed test at alpha equals 0.05. If a 95% confidence interval for a difference does not include zero, the two-tailed P-value will be less than 0.05 (statistically significant). If the confidence interval includes zero, the P-value will be greater than 0.05 (not significant). Confidence intervals are often more informative than P-values alone because they show: The estimated effect size (the point estimate), The precision of the estimate (width of the interval), The range of plausible values for the true parameter. For example, a study might report mean difference equals 5.2 points, 95% CI 1.3 to 9.1, P equals 0.01. This tells you the difference is statistically significant (P less than 0.05), the estimated effect is 5.2 points, and the true effect is likely between 1.3 and 9.1 points. Best practice is to report confidence intervals alongside P-values for complete statistical inference.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/p-value-calculator'),
        name: 'How to Calculate and Interpret P-Values',
        description: 'Step-by-step guide to calculating P-values from test statistics, interpreting statistical significance, and making informed decisions in hypothesis testing.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'P-Value Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Calculation Mode',
            text: 'Select between Quick Z-Score Mode for simple conversions from Z-scores to P-values, or Advanced Mode for specific statistical tests (t-test, chi-square, F-test). Quick mode is ideal when you already have a Z-score and want to see all related P-values instantly. Advanced mode is for hypothesis testing when you have test statistics and need to determine significance.',
            url: getStepUrl('/p-value-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Your Test Statistic or Z-Score',
            text: 'For Quick Mode: Enter your Z-score value (typically between -4 and +4). For Advanced Mode: Enter the test statistic from your analysis. This could be a t-value from a t-test, a Z-value from a z-test, a chi-square statistic, or an F-statistic. This value comes from your statistical analysis or research output.',
            url: getStepUrl('/p-value-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Specify Test Parameters (Advanced Mode)',
            text: 'If using Advanced Mode, select your test type (t-test, z-test, chi-square, or F-test) and enter required parameters like degrees of freedom. For t-tests and chi-square tests, enter degrees of freedom calculated from your sample size. Choose the tail type: two-tailed (testing for any difference), left-tailed (testing for decrease), or right-tailed (testing for increase).',
            url: getStepUrl('/p-value-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Set Your Significance Level',
            text: 'Choose your alpha level, typically 0.05 (5%), which represents your threshold for statistical significance. Common alternatives are 0.10 for exploratory research or 0.01 for more stringent requirements. This significance level determines what P-value threshold you will use to reject the null hypothesis. In Quick Mode, results show significance at standard levels automatically.',
            url: getStepUrl('/p-value-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Calculate and View P-Values',
            text: 'Click Calculate to compute your P-value. Quick Mode displays all five types of P-values (left-tail, right-tail, center, between, two-tail) with a visual distribution curve showing your Z-score position. Advanced Mode shows your P-value with a color-coded significance indicator (green for significant, yellow for marginal, red for not significant) based on your chosen alpha level.',
            url: getStepUrl('/p-value-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Interpret the Results',
            text: 'Compare your P-value to your significance level. If P-value is less than alpha (e.g., 0.05): Results are statistically significant, reject the null hypothesis. If P-value is greater than or equal to alpha: Results are not statistically significant, fail to reject the null hypothesis. Quick Mode provides automatic interpretation showing whether results meet common significance thresholds. Consider the P-value alongside effect size and confidence intervals for complete interpretation.',
            url: getStepUrl('/p-value-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/p-value-calculator'),
        headline: 'P-Value Calculator - Complete Guide to Statistical Significance Testing',
        description:
          'Comprehensive guide to calculating and interpreting P-values in hypothesis testing. Learn how to determine statistical significance, understand Type I and Type II errors, and avoid common P-value misconceptions in research and data analysis.',
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
        image: getOgImage('p-value'),
        articleBody:
          'P-values are fundamental tools in statistical hypothesis testing, helping researchers determine whether observed results are likely due to chance or represent real effects. This comprehensive guide explains P-value calculation, interpretation, common misconceptions, and best practices for statistical inference.',
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
        P-Value Calculator - Calculate Statistical Significance for Hypothesis Testing
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
                P-Value Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <PValueCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding P-Values: The Complete Guide to Statistical Significance
          </h2>

          <p className="text-gray-700 mb-4">
            P-values are among the most widely used (and misunderstood) concepts in statistical analysis. 
            They play a central role in hypothesis testing across virtually every scientific discipline, 
            from medical research and psychology to engineering and economics. A P-value helps researchers 
            answer a fundamental question: Is what I observed in my data likely to have occurred by random 
            chance alone, or does it represent a genuine pattern or effect? Despite their ubiquity, P-values 
            are frequently misinterpreted, leading to flawed conclusions and questionable research practices. 
            This comprehensive guide will explain what P-values really mean, how to calculate and interpret 
            them correctly, and how to avoid common pitfalls in statistical inference.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            What is a P-Value?
          </h3>

          <p className="text-gray-700 mb-4">
            A P-value is a probability that quantifies the strength of evidence against a null hypothesis. 
            Specifically, it is the probability of obtaining test results at least as extreme as the results 
            actually observed, under the assumption that the null hypothesis is correct. The null hypothesis 
            typically represents a statement of no effect, no difference, or no relationship. For example, 
            the null hypothesis might state that a new drug has no effect on blood pressure, that there is 
            no difference in test scores between two teaching methods, or that there is no correlation 
            between two variables.
          </p>

          <p className="text-gray-700 mb-4">
            To understand P-values, imagine you conduct an experiment comparing a new medication to a placebo. 
            You observe that patients taking the medication have lower blood pressure by an average of 5 mmHg. 
            The P-value answers this question: If the medication truly has no effect (null hypothesis is true), 
            what is the probability of observing a difference of 5 mmHg or larger purely due to random variation 
            in sampling? If this probability is very small (say, 0.01 or 1%), you have strong evidence that the 
            medication does have an effect, because such a large difference would be very unlikely to occur by 
            chance alone.
          </p>

          <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200 my-6">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              Critical Distinction
            </h4>
            <p className="text-gray-700 text-sm mb-2">
              The P-value is NOT the probability that the null hypothesis is true. It is the probability 
              of your data (or more extreme data) IF the null hypothesis is true. This is a crucial but 
              often confused distinction.
            </p>
            <ul className="text-sm text-gray-700 space-y-1 ml-6 list-disc">
              <li><strong>WRONG:</strong> P = 0.05 means there is a 5% chance the null hypothesis is true.</li>
              <li><strong>CORRECT:</strong> P = 0.05 means if the null hypothesis were true, results this extreme would occur 5% of the time by chance.</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How P-Values Are Calculated
          </h3>

          <p className="text-gray-700 mb-4">
            P-values are calculated from test statistics, which are numerical summaries of your data that 
            measure how far your observed results deviate from what the null hypothesis predicts. Common 
            test statistics include t-values (for t-tests), Z-values (for Z-tests), chi-square statistics 
            (for categorical data), and F-statistics (for ANOVA). The process involves three steps:
          </p>

          <ol className="list-decimal pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Calculate the test statistic:</strong> Based on your sample data and the null hypothesis, 
              compute an appropriate test statistic. For example, a t-test comparing two groups calculates a 
              t-value that measures how many standard errors the observed mean difference is from zero.
            </li>
            <li>
              <strong>Determine the sampling distribution:</strong> Under the null hypothesis, the test statistic 
              follows a known probability distribution (t-distribution, normal distribution, chi-square distribution, 
              etc.). This distribution describes all possible values the test statistic could take if you repeated 
              your study infinitely many times and the null hypothesis were true.
            </li>
            <li>
              <strong>Calculate the tail probability:</strong> The P-value is the area under the probability 
              distribution curve in the tail(s) beyond your observed test statistic. This area represents how 
              likely it is to observe a test statistic as extreme as or more extreme than what you actually got.
            </li>
          </ol>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            One-Tailed vs. Two-Tailed Tests
          </h4>

          <p className="text-gray-700 mb-4">
            The choice between one-tailed and two-tailed tests affects your P-value calculation:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Two-tailed test:</strong> Tests for any difference in either direction (greater than OR 
              less than). You calculate the probability of results as extreme as yours in both tails of the 
              distribution. This is the default and most conservative choice. Used when your hypothesis is 
              non-directional: Does the drug affect blood pressure (could increase or decrease)?
            </li>
            <li>
              <strong>One-tailed test (right-tailed):</strong> Tests for differences in one specific direction 
              (greater than only). You calculate the probability in only the right tail. Used when you have a 
              directional hypothesis: Does the training program increase test scores?
            </li>
            <li>
              <strong>One-tailed test (left-tailed):</strong> Tests for differences in the opposite direction 
              (less than only). You calculate the probability in only the left tail. Used for directional hypotheses: 
              Does the diet decrease weight?
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            For the same test statistic, a two-tailed P-value is exactly double a one-tailed P-value. For example, 
            if your one-tailed P-value is 0.025, your two-tailed P-value would be 0.05. Unless you have strong 
            theoretical justification for expecting an effect in only one direction, and you determined this before 
            seeing the data, you should use a two-tailed test.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Interpreting P-Values: The Significance Level
          </h3>

          <p className="text-gray-700 mb-4">
            To make a decision based on a P-value, researchers set a significance level (denoted α, alpha) before 
            conducting the study. The significance level is a threshold that defines what P-value will be considered 
            small enough to reject the null hypothesis. The most common significance level is α = 0.05 (5%), though 
            0.01 (1%) and 0.10 (10%) are also used depending on the field and context.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">P-Value</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">At α = 0.05</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Interpretation</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Evidence Against H₀</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-2">P &lt; 0.01</td>
                  <td className="border border-gray-300 px-4 py-2">Significant</td>
                  <td className="border border-gray-300 px-4 py-2">Highly significant</td>
                  <td className="border border-gray-300 px-4 py-2">Strong evidence</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-2">0.01 ≤ P &lt; 0.05</td>
                  <td className="border border-gray-300 px-4 py-2">Significant</td>
                  <td className="border border-gray-300 px-4 py-2">Statistically significant</td>
                  <td className="border border-gray-300 px-4 py-2">Moderate evidence</td>
                </tr>
                <tr className="bg-amber-50">
                  <td className="border border-gray-300 px-4 py-2">0.05 ≤ P &lt; 0.10</td>
                  <td className="border border-gray-300 px-4 py-2">Not Significant</td>
                  <td className="border border-gray-300 px-4 py-2">Marginally significant (trend)</td>
                  <td className="border border-gray-300 px-4 py-2">Weak evidence</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">P ≥ 0.10</td>
                  <td className="border border-gray-300 px-4 py-2">Not Significant</td>
                  <td className="border border-gray-300 px-4 py-2">Not statistically significant</td>
                  <td className="border border-gray-300 px-4 py-2">Little to no evidence</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Decision Rules
          </h4>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>If P-value &lt; α:</strong> The result is statistically significant. Reject the null 
              hypothesis. You have sufficient evidence to conclude an effect or difference exists.
            </li>
            <li>
              <strong>If P-value ≥ α:</strong> The result is not statistically significant. Fail to reject 
              the null hypothesis. You do not have sufficient evidence to conclude an effect exists (note: 
              this does not prove the null hypothesis is true).
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            The choice of α = 0.05 is conventional but arbitrary. It dates back to statistician Ronald Fisher 
            in the 1920s, who suggested 0.05 as a convenient benchmark. Different disciplines and research 
            contexts may warrant different thresholds: exploratory research might use 0.10, clinical trials 
            often use 0.01, and particle physics uses thresholds like 0.0000003 (5 sigma significance).
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common P-Value Misconceptions
          </h3>

          <p className="text-gray-700 mb-4">
            P-values are among the most misunderstood concepts in statistics. Here are critical misconceptions 
            to avoid:
          </p>

          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <p className="text-sm font-semibold text-red-900 mb-1">MISCONCEPTION 1:</p>
              <p className="text-sm text-gray-700 mb-2">P-value is the probability that the null hypothesis is true.</p>
              <p className="text-sm text-gray-700"><strong>REALITY:</strong> P-value is the probability of observing 
              data as extreme as yours IF the null hypothesis is true. It says nothing about the probability of 
              hypotheses being true or false.</p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <p className="text-sm font-semibold text-red-900 mb-1">MISCONCEPTION 2:</p>
              <p className="text-sm text-gray-700 mb-2">A small P-value means the effect is large or important.</p>
              <p className="text-sm text-gray-700"><strong>REALITY:</strong> P-values measure evidence strength, 
              not effect size. With a large enough sample, even tiny, trivial effects can have very small P-values. 
              Always examine effect size separately.</p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <p className="text-sm font-semibold text-red-900 mb-1">MISCONCEPTION 3:</p>
              <p className="text-sm text-gray-700 mb-2">P = 0.05 means there is a 5% chance your result is due to chance.</p>
              <p className="text-sm text-gray-700"><strong>REALITY:</strong> It means if there truly were no effect, 
              you would observe results this extreme 5% of the time. Your actual result is not due to chance - 
              it is real data - the question is whether it is consistent with the null hypothesis.</p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <p className="text-sm font-semibold text-red-900 mb-1">MISCONCEPTION 4:</p>
              <p className="text-sm text-gray-700 mb-2">A non-significant result (P &gt; 0.05) proves there is no effect.</p>
              <p className="text-sm text-gray-700"><strong>REALITY:</strong> Failing to reject the null hypothesis 
              means you lack sufficient evidence to detect an effect. The effect might exist but be too small to 
              detect with your sample size, or your study might lack statistical power.</p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <p className="text-sm font-semibold text-red-900 mb-1">MISCONCEPTION 5:</p>
              <p className="text-sm text-gray-700 mb-2">P = 0.049 is fundamentally different from P = 0.051.</p>
              <p className="text-sm text-gray-700"><strong>REALITY:</strong> These P-values represent essentially 
              the same evidence strength. Treating 0.05 as a bright dividing line between success and failure is 
              arbitrary and can lead to poor research practices. Always report exact P-values.</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Type I and Type II Errors
          </h3>

          <p className="text-gray-700 mb-4">
            Statistical hypothesis testing involves two types of potential errors:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2"></th>
                  <th className="border border-gray-300 px-4 py-2">H₀ is True</th>
                  <th className="border border-gray-300 px-4 py-2">H₀ is False</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Reject H₀</td>
                  <td className="border border-gray-300 px-4 py-2 bg-red-50">
                    <strong>Type I Error (α)</strong><br/>
                    False Positive<br/>
                    Probability = α (e.g., 0.05)
                  </td>
                  <td className="border border-gray-300 px-4 py-2 bg-green-50">
                    <strong>Correct Decision</strong><br/>
                    True Positive<br/>
                    Power = 1 - β
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Fail to Reject H₀</td>
                  <td className="border border-gray-300 px-4 py-2 bg-green-50">
                    <strong>Correct Decision</strong><br/>
                    True Negative<br/>
                    Probability = 1 - α
                  </td>
                  <td className="border border-gray-300 px-4 py-2 bg-amber-50">
                    <strong>Type II Error (β)</strong><br/>
                    False Negative<br/>
                    Probability = β
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Type I Error (False Positive):</strong> Rejecting the null hypothesis when it is actually 
              true. The probability of a Type I error is α (your significance level). Setting α = 0.05 means you 
              accept a 5% risk of false positives. Example: Concluding a drug works when it actually does not.
            </li>
            <li>
              <strong>Type II Error (False Negative):</strong> Failing to reject the null hypothesis when it is 
              actually false. The probability of a Type II error is β. Statistical power (1 - β) is the probability 
              of correctly rejecting a false null hypothesis. Example: Concluding a drug does not work when it actually does.
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            There is an inherent trade-off: Reducing α (being more conservative about claiming significance) increases 
            β (risk of missing real effects). Researchers typically prioritize controlling Type I errors (false positives) 
            over Type II errors, because false claims of effectiveness can be more harmful than failing to detect real 
            effects. However, this varies by context: in medical screening, false negatives (missing a disease) may be 
            more dangerous than false positives.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            P-Values and Effect Size
          </h3>

          <p className="text-gray-700 mb-4">
            A critical limitation of P-values is that they conflate effect size and sample size. A small P-value can 
            result from either a large effect in a small sample OR a tiny effect in a huge sample. To illustrate:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Scenario A:</strong> Testing if a new teaching method improves test scores. Sample: 50 students. 
              Observed difference: 10 points (0.5 standard deviations). P-value: 0.03 (significant). This represents a 
              meaningful, moderate effect size with reasonable evidence.
            </li>
            <li>
              <strong>Scenario B:</strong> Testing if a website button color affects click rates. Sample: 1 million users. 
              Observed difference: 0.1% (0.05 standard deviations). P-value: 0.0001 (highly significant). This is 
              statistically significant but practically trivial - the effect is real but too small to matter.
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            Both studies have small P-values, but Scenario A represents an important finding while Scenario B does not. 
            This is why researchers must report effect sizes (like Cohen d, odds ratios, or mean differences) alongside 
            P-values. Effect size tells you how large the difference or association is, while the P-value tells you how 
            confident you can be that it is not zero. Both pieces of information are essential for proper interpretation.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Best Practices for Using P-Values
          </h3>

          <ol className="list-decimal pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Set your α level before collecting data:</strong> Choosing your significance threshold after 
              seeing the results is p-hacking and invalidates the test.
            </li>
            <li>
              <strong>Always report exact P-values:</strong> Report P = 0.032, not P &lt; 0.05. Do not report 
              P = 0.000 (use P &lt; 0.001 instead). Exact values preserve information for meta-analyses and allow 
              readers to apply their own judgment.
            </li>
            <li>
              <strong>Report confidence intervals:</strong> Confidence intervals show effect size, precision, and 
              significance in one metric. A 95% CI that excludes zero is equivalent to P &lt; 0.05.
            </li>
            <li>
              <strong>Report effect sizes:</strong> Always include standardized effect sizes (Cohen d, odds ratio, 
              correlation coefficient, etc.) to show practical significance alongside statistical significance.
            </li>
            <li>
              <strong>Do not dichotomize at P = 0.05:</strong> Treat P-values as continuous measures of evidence 
              strength rather than pass/fail thresholds. P = 0.051 is not meaningfully different from P = 0.049.
            </li>
            <li>
              <strong>Consider multiple comparisons:</strong> If you conduct many statistical tests, some will be 
              significant by chance. Use corrections like Bonferroni or false discovery rate control when appropriate.
            </li>
            <li>
              <strong>Interpret non-significant results carefully:</strong> Absence of evidence is not evidence of 
              absence. A non-significant result means you did not find sufficient evidence, not that no effect exists.
            </li>
            <li>
              <strong>Consider statistical power:</strong> Studies with low power (small samples) may fail to detect 
              real effects. Report power analyses and interpret null results in this context.
            </li>
          </ol>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Real-World Applications
          </h3>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Medical Research
          </h4>

          <p className="text-gray-700 mb-4">
            Clinical trials use P-values to determine if new treatments are effective. A trial comparing a new 
            cholesterol medication to placebo might find that patients on the medication had LDL cholesterol reduced 
            by 30 mg/dL (95% CI: 22-38 mg/dL), with P &lt; 0.001. This indicates strong evidence that the medication 
            reduces cholesterol, with the true effect likely between 22 and 38 mg/dL. The FDA typically requires P &lt; 0.05 
            for drug approval, though they consider effect size and clinical relevance as well.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Psychology and Social Sciences
          </h4>

          <p className="text-gray-700 mb-4">
            Researchers use P-values to test theories about human behavior. For example, a study might test whether 
            a mindfulness intervention reduces anxiety. If anxiety scores decrease by 8 points on a validated scale 
            (Cohen d = 0.6) with P = 0.02, this provides evidence that mindfulness has a moderate effect on reducing 
            anxiety. The P-value shows the result is unlikely due to sampling variability, while the effect size shows 
            the intervention has a meaningful impact.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Business and A/B Testing
          </h4>

          <p className="text-gray-700 mb-4">
            Companies use P-values to make data-driven decisions. An e-commerce site might A/B test two homepage 
            designs, finding that Design B increases conversion rate from 2.0% to 2.3% (P = 0.001). While statistically 
            significant, the business must also consider whether a 0.3 percentage point increase justifies the cost of 
            redesign. Statistical significance does not automatically imply practical importance - the decision requires 
            both statistical evidence and business judgment.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Additional Resources</h3>

          <p className="text-gray-700 mb-4">
            For deeper understanding of P-values, hypothesis testing, and statistical inference:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <a
                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4877414/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                The ASA Statement on P-Values (American Statistical Association)
              </a>{' '}
              - Official guidance on proper P-value use and interpretation
            </li>
            <li>
              <a
                href="https://www.nature.com/articles/d41586-019-00857-9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Scientists Rise Up Against Statistical Significance (Nature)
              </a>{' '}
              - Important perspective on moving beyond P &lt; 0.05 thresholds
            </li>
            <li>
              <a
                href="https://www.khanacademy.org/math/statistics-probability/significance-tests-one-sample"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Khan Academy - Significance Tests
              </a>{' '}
              - Free video tutorials on hypothesis testing and P-values
            </li>
            <li>
              <a
                href="https://www.statology.org/p-value/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Statology - P-Value Guide
              </a>{' '}
              - Comprehensive explanations with practical examples
            </li>
            <li>
              <a
                href="https://rpsychologist.com/pvalue/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Understanding P-Values (Interactive Visualization)
              </a>{' '}
              - Interactive tool for visualizing P-value concepts
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/z-score-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Z-Score Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Convert scores to Z-scores and percentiles</p>
          </a>

          <a
            href="/confidence-interval-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900">Confidence Interval Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate confidence intervals for estimates</p>
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
            <p className="text-sm text-gray-600 mt-1">Compare means between two groups</p>
          </a>

          <a
            href="/statistics-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">Statistics Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate mean, median, mode, and standard deviation</p>
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
            href="/normal-distribution-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📐</div>
            <h3 className="font-semibold text-gray-900">Normal Distribution Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate probabilities for normal distributions</p>
          </a>

          <a
            href="/chi-square-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎲</div>
            <h3 className="font-semibold text-gray-900">Chi-Square Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Test relationships in categorical data</p>
          </a>
        </div>
      </section>
    </div>
  );
}

