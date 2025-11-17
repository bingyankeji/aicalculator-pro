import { Metadata } from 'next';
import SampleSizeCalculator from '@/components/Calculator/SampleSizeCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Sample Size Calculator - Statistical Power & Research Sample Calculator | AICalculator',
  description: 'Free sample size calculator for surveys, research studies, and A/B testing. Calculate required participants with confidence levels, margin of error, and statistical power analysis.',
  keywords: [
    'sample size calculator',
    'survey sample size',
    'research sample calculator',
    'statistical power calculator',
    'sample size estimation',
    'margin of error calculator',
    'confidence level calculator',
    'A/B test sample size',
    'proportion sample size',
    'mean sample size calculator',
    'survey methodology',
    'research design calculator',
    'statistical significance',
    'power analysis',
    'sample size determination',
    'market research calculator',
    'clinical trial sample size',
    'population sampling',
    'finite population correction',
    'statistical calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Sample Size Calculator - Research & Survey Sample Size',
    description: 'Calculate the perfect sample size for your research study, survey, or A/B test. Get statistical power analysis and confidence intervals.',
    type: 'website',
    url: getUrl('/sample-size-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [
      {
        url: getOgImage('sample-size'),
        width: 1200,
        height: 630,
        alt: 'Sample Size Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sample Size Calculator - Statistical Power Analysis',
    description: 'Calculate required sample size for surveys, research, and A/B testing with confidence levels and margin of error.',
    images: [getOgImage('sample-size')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/sample-size-calculator'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SampleSizeCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/sample-size-calculator'),
        name: 'Sample Size Calculator',
        url: getUrl('/sample-size-calculator'),
        description:
          'Professional sample size calculator for research studies, surveys, and A/B testing. Calculate required participants with confidence levels, margin of error, statistical power, and finite population corrections.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        featureList: [
          'Calculate sample size for proportion estimation',
          'Calculate sample size for mean estimation',
          'A/B testing sample size with power analysis',
          'Confidence level and margin of error adjustment',
          'Finite population correction',
          'Cost-benefit analysis for different research methods',
          'Interactive visualizations of sample size relationships',
          'Industry-specific parameter recommendations',
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/sample-size-calculator'),
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
            name: 'Sample Size Calculator',
            item: getUrl('/sample-size-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/sample-size-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What sample size do I need for my survey?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The required sample size depends on your confidence level, margin of error, and population size. For a standard market research survey with 95% confidence and plus or minus 5% margin of error, you typically need 384 participants from a large population. For a narrower plus or minus 3% margin, you need approximately 1,067 participants. Use 50% for expected proportion if unknown, as this provides the most conservative estimate. Smaller populations require fewer participants due to finite population correction. For example, surveying a company of 500 employees would require only 217 responses for plus or minus 5% margin at 95% confidence.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does confidence level affect sample size?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Confidence level directly impacts required sample size. Higher confidence requires larger samples. Common levels: 90% confidence (Z equals 1.645) requires about 271 participants for plus or minus 5% margin; 95% confidence (Z equals 1.96) requires about 384 participants; 99% confidence (Z equals 2.576) requires about 663 participants. The relationship is quadratic - increasing confidence from 95% to 99% (21% increase) requires 72% more participants. Most research uses 95% as it balances confidence with practical sample size requirements. Clinical trials often use 99% for critical safety endpoints.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is margin of error and how does it work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Margin of error quantifies the precision of your estimate. A plus or minus 5% margin means if 60% of your sample says yes, the true population value is likely between 55% and 65% at your chosen confidence level. Smaller margins require exponentially larger samples: plus or minus 10% needs about 96 participants, plus or minus 5% needs about 384, plus or minus 3% needs about 1,067, plus or minus 1% needs about 9,604 (all at 95% confidence). There are diminishing returns - reducing margin from 5% to 3% requires 3 times more participants but only improves precision by 2 percentage points. Consider whether that precision gain justifies the additional cost and time.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate sample size for A/B testing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A/B testing sample size requires: (1) baseline conversion rate, (2) minimum detectable effect (e.g., improving from 5% to 6% equals 20% relative increase), (3) significance level (typically 95%), and (4) statistical power (typically 80%). Power is the probability of detecting a true effect. For a baseline 10% conversion rate, detecting a 20% relative improvement (10% to 12%) at 95% confidence with 80% power requires approximately 3,850 participants per variant (7,700 total). Smaller effect sizes require much larger samples - detecting a 10% relative improvement would need about 15,300 per variant. Run tests long enough to capture weekly patterns (minimum 1 to 2 weeks).',
            },
          },
          {
            '@type': 'Question',
            name: 'What is statistical power and why does it matter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Statistical power is the probability of detecting a true effect when it exists (avoiding a false negative or Type II error). Standard power is 80%, meaning an 80% chance of detecting a real effect. Higher power (90%, 95%) reduces the risk of missing real effects but requires larger samples. Power depends on: (1) sample size (larger equals higher power), (2) effect size (larger effects easier to detect), (3) significance level (alpha equals 0.05 standard), and (4) variability in data. Low power (less than 60%) risks concluding no effect when one exists. For exploratory research, 70 to 80% power may suffice; for confirmatory studies or safety-critical decisions, aim for 90%+ power.',
            },
          },
          {
            '@type': 'Question',
            name: 'Should I use finite population correction?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Use finite population correction when your sample will be a significant fraction (more than 5%) of the total population. The correction formula: n adjusted equals n divided by (1 + (n - 1) / N), where n is uncorrected sample size and N is population size. For example, surveying 500 employees: uncorrected formula suggests 384 participants for plus or minus 5% margin at 95% confidence, but finite correction reduces this to 217 (44% reduction). The correction becomes negligible for large populations - for populations over 100,000, it reduces sample size by less than 1%. Always apply the correction for small, defined populations (companies, schools, associations) but not for general public surveys where the population is millions.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/sample-size-calculator'),
        name: 'How to Calculate Sample Size for Your Research Study',
        description: 'Step-by-step guide to determining the appropriate sample size for surveys, research studies, and experiments.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Sample Size Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Calculation Type',
            text: 'Select the appropriate calculation method: Proportion Estimation (for surveys with yes/no or categorical questions), Mean Estimation (for continuous numerical measurements like height or age), or A/B Testing (for comparing two groups or variants). For most surveys and market research, use Proportion Estimation.',
            url: getStepUrl('/sample-size-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Set Confidence Level',
            text: 'Choose your desired confidence level, typically 95%. This represents how certain you want to be that your results reflect the true population. 90% is acceptable for exploratory research, 95% is standard for most studies, and 99% is used for critical decisions or regulatory requirements. Higher confidence requires larger samples.',
            url: getStepUrl('/sample-size-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Determine Margin of Error',
            text: 'Set your acceptable margin of error (precision). Plus or minus 5% is standard for market research, plus or minus 3% for political polling, and plus or minus 10% for quick exploratory studies. Smaller margins provide more precise estimates but require significantly larger samples. Consider the practical impact of different margins on your decision-making.',
            url: getStepUrl('/sample-size-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Enter Expected Proportion or Parameters',
            text: 'For proportion estimation, enter your expected proportion (use 50% if unknown, as this gives the most conservative estimate). For mean estimation, enter the expected population standard deviation from pilot studies or literature. For A/B testing, enter effect size and desired statistical power (typically 80%).',
            url: getStepUrl('/sample-size-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Input Population Size (If Known)',
            text: 'If surveying a finite, defined population (like employees of a company or members of an association), enter the total population size. For general public surveys or very large populations (more than 100,000), leave this at a large number or select infinite population. The calculator will apply finite population correction if appropriate.',
            url: getStepUrl('/sample-size-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Calculate Results',
            text: 'Click Calculate to see your required sample size. Review the adjusted sample size (accounting for response rates), visualizations showing the relationship between sample size and precision, and cost estimates for different data collection methods. Check recommendations for your specific scenario.',
            url: getStepUrl('/sample-size-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Account for Response Rate',
            text: 'Account for expected response rates when planning initial contacts. Online surveys typically get 20 to 40% response, phone surveys 40 to 60%, and in-person 60 to 80%. If you need 384 completed surveys and expect 30% response rate, plan to contact 384 divided by 0.30 equals 1,280 potential participants.',
            url: getStepUrl('/sample-size-calculator', 7),
          },
          {
            '@type': 'HowToStep',
            position: 8,
            name: 'Consider Subgroup Analysis',
            text: 'If you plan to analyze subgroups separately (e.g., men vs. women, age groups, regions), ensure each subgroup has adequate sample size. As a rule of thumb, aim for at least 30 to 50 participants per subgroup. Your total sample size may need to be larger to accommodate this requirement.',
            url: getStepUrl('/sample-size-calculator', 8),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/sample-size-calculator'),
        headline: 'Sample Size Calculator - Complete Guide to Research Sample Determination',
        description:
          'Comprehensive guide to calculating sample sizes for surveys, research studies, and experiments. Learn about confidence levels, margin of error, statistical power, and best practices.',
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
        image: getOgImage('sample-size'),
        articleBody:
          'Sample size determination is a critical step in research design that affects the validity, reliability, and cost-effectiveness of studies. This comprehensive calculator helps researchers, marketers, and analysts determine appropriate sample sizes for surveys, experiments, and A/B tests using validated statistical methods.',
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
        Sample Size Calculator - Calculate Survey, Research, and A/B Test Sample Sizes with Statistical Power Analysis
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
                Sample Size Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <SampleSizeCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Sample Size: Why It Matters for Your Research
          </h2>

          <p className="text-gray-700 mb-4">
            Determining the correct sample size is one of the most crucial steps in designing any
            research study, survey, or experiment. A well-calculated sample size ensures that your
            results are statistically significant, reliable, and generalizable to the larger population
            you are studying. Too small a sample risks missing important effects and wasting resources
            on inconclusive research, while too large a sample unnecessarily increases costs without
            meaningful improvements in precision. This comprehensive guide will walk you through the key
            concepts, formulas, and practical considerations for calculating sample size effectively.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            What is Sample Size and Why is it Important?
          </h3>

          <p className="text-gray-700 mb-4">
            The sample size is the number of individuals or observations included in a study. It is a
            subset of the population that is chosen to represent the entire group. The importance of
            an appropriate sample size cannot be overstated, as it directly impacts three critical factors:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Statistical Power:</strong> The probability of detecting a true effect when it
              exists. Larger samples increase power, reducing the risk of false negatives (Type II
              errors). With adequate power, you are less likely to conclude no effect when a real effect
              exists.
            </li>
            <li>
              <strong>Precision:</strong> The width of your confidence intervals and margin of error.
              Larger samples provide more precise estimates, allowing you to make more confident
              conclusions about population parameters.
            </li>
            <li>
              <strong>Cost-Effectiveness:</strong> An optimal sample size balances the need for
              statistical rigor with practical constraints like budget, time, and resources. Too large a
              sample wastes resources, while too small a sample yields inconclusive results.
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Key Concepts in Sample Size Determination
          </h3>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Confidence Level (Reliability)
          </h4>

          <p className="text-gray-700 mb-4">
            The confidence level indicates how confident you can be that your sample results accurately
            reflect the true population. It is expressed as a percentage (e.g., 90%, 95%, 99%). A 95%
            confidence level means that if you were to repeat the study 100 times, 95 of those times,
            your results would fall within the specified margin of error.
          </p>

          <p className="text-gray-700 mb-4">
            Common confidence levels and their corresponding Z-scores:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
            <li><strong>90% confidence:</strong> Z = 1.645</li>
            <li><strong>95% confidence:</strong> Z = 1.96 (most commonly used)</li>
            <li><strong>99% confidence:</strong> Z = 2.576 (used for critical decisions, safety studies)</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Margin of Error (Precision)
          </h4>

          <p className="text-gray-700 mb-4">
            The margin of error defines how much difference is acceptable between the sample result and
            the actual population value. For example, a plus or minus 3% margin of error means your
            estimate is likely within 3 percentage points of the true population value.
          </p>

          <p className="text-gray-700 mb-4">
            The relationship between sample size and margin of error is inverse and non-linear. Halving
            the margin of error requires quadrupling the sample size, creating strong diminishing
            returns.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Sample Size Formulas
          </h3>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            For Proportion Estimation
          </h4>

          <p className="text-gray-700 mb-4">
            This is used for categorical data, such as survey questions with Yes/No answers:
          </p>

          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 my-6 font-mono text-center">
            <div className="text-2xl mb-2">n = (Z² × p × (1-p)) / E²</div>
            <div className="text-sm text-gray-600 mt-2">
              where n = sample size, Z = Z-score, p = expected proportion, E = margin of error
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            For example, with 95% confidence, 5% margin of error, and 50% expected proportion:
            n = (1.96² × 0.5 × 0.5) / 0.05² = 384 participants
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Finite Population Correction
          </h3>

          <p className="text-gray-700 mb-4">
            When your sample size is a significant proportion (typically more than 5%) of the total
            population, you can apply a finite population correction to reduce the required sample size.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 my-6 font-mono text-center">
            <div className="text-2xl mb-2">n_adjusted = n / (1 + (n-1)/N)</div>
            <div className="text-sm text-gray-600 mt-2">
              where n = uncorrected sample size, N = population size
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Additional Resources</h3>

          <p className="text-gray-700 mb-4">
            For more information on sample size and research methodology, visit:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <a
                href="https://www.cdc.gov/nchs/data/series/sr_02/sr02_145.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                CDC - Sample Design and Estimation
              </a>
            </li>
            <li>
              <a
                href="https://www.pewresearch.org/our-methods/u-s-surveys/writing-survey-questions/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Pew Research - Survey Methodology
              </a>
            </li>
            <li>
              <a
                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3774870/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                NIH - Sample Size in Clinical Trials
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
            href="/statistics-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Statistics Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate mean, median, mode, and standard deviation</p>
          </a>

          <a
            href="/confidence-interval-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900">Confidence Interval Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Estimate population parameters with ranges</p>
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
            href="/p-value-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🅿️</div>
            <h3 className="font-semibold text-gray-900">P-value Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Determine statistical significance</p>
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
            href="/chi-square-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">χ²</div>
            <h3 className="font-semibold text-gray-900">Chi-Square Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Test for association between variables</p>
          </a>

          <a
            href="/anova-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">ANOVA Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Compare means across multiple groups</p>
          </a>

          <a
            href="/standard-deviation-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📉</div>
            <h3 className="font-semibold text-gray-900">Standard Deviation Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Measure data spread and variability</p>
          </a>
        </div>
      </section>
    </div>
  );
}

