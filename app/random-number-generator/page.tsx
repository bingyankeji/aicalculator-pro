import { Metadata } from 'next';
import RandomNumberGenerator from '@/components/Calculator/RandomNumberGenerator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Random Number Generator - Generate Random Numbers Online | AICalculator',
  description: 'Free random number generator with multiple distribution types. Generate integers, decimals, normal distribution, and uniform distribution numbers with custom ranges.',
  keywords: [
    'random number generator',
    'random number',
    'number generator',
    'random integer generator',
    'random decimal generator',
    'normal distribution generator',
    'uniform distribution generator',
    'unique random numbers',
    'random number picker',
    'random number wheel',
    'generate random numbers',
    'random number between',
    'random sequence generator',
    'lottery number generator',
    'dice roller',
    'random sampling',
    'true random number',
    'pseudorandom generator',
    'random number with seed',
    'batch random numbers',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Random Number Generator - Generate Random Numbers',
    description: 'Generate random numbers with custom ranges, distributions, and options. Support for integers, decimals, normal and uniform distributions.',
    type: 'website',
    url: getUrl('/random-number-generator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [
      {
        url: getOgImage('random-number'),
        width: 1200,
        height: 630,
        alt: 'Random Number Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Number Generator - Online Tool',
    description: 'Generate random numbers instantly with custom ranges and distributions. Free online tool.',
    images: [getOgImage('random-number')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/random-number-generator'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RandomNumberGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/random-number-generator'),
        name: 'Random Number Generator',
        url: getUrl('/random-number-generator'),
        description:
          'Free online random number generator supporting multiple distribution types: integers, decimals, normal distribution, and uniform distribution with customizable ranges and batch generation.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        featureList: [
          'Generate random integers',
          'Generate random decimals',
          'Normal distribution generation',
          'Uniform distribution generation',
          'Unique number generation (no duplicates)',
          'Batch number generation up to 10,000',
          'Distribution visualization',
          'Statistical analysis of generated numbers',
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/random-number-generator'),
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
            name: 'Random Number Generator',
            item: getUrl('/random-number-generator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/random-number-generator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a random number generator and how does it work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A random number generator (RNG) is a tool that produces numbers in a way that cannot be predicted. This calculator uses pseudorandom number generation based on mathematical algorithms that simulate randomness. It supports multiple modes: Integer mode generates whole numbers within a specified range; Decimal mode produces floating-point numbers with customizable precision; Normal distribution mode creates numbers following a bell curve pattern defined by mean and standard deviation; Uniform distribution mode generates numbers with equal probability across the range. You can generate from 1 to 10,000 numbers at once, with options for unique values only (no duplicates) when generating integers. The calculator also provides statistical analysis and distribution visualization for batch generations.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between integer and decimal random numbers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Integer random numbers are whole numbers without decimal points (e.g., 1, 5, 42, 100). They are commonly used for scenarios like dice rolls, lottery picks, selecting winners, or any application requiring discrete values. Decimal (floating-point) random numbers include fractional parts (e.g., 3.14, 7.89, 45.6). They are used when continuous values are needed, such as scientific simulations, probability calculations, or generating coordinates. When generating decimals, you can specify the number of decimal places (0-10) for precision control. For example, 2 decimal places gives values like 15.47, while 5 decimal places gives 15.47829. Choose integers when you need countable quantities, and decimals when you need measurements or continuous values.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is normal distribution and when should I use it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Normal distribution, also called Gaussian distribution or bell curve, generates numbers that cluster around a central mean value with decreasing probability farther from the mean. It is defined by two parameters: mean (μ) - the center point where most values cluster, and standard deviation (σ) - how spread out values are from the mean. About 68% of values fall within 1 standard deviation, 95% within 2, and 99.7% within 3. Use normal distribution when modeling natural phenomena like human heights, test scores, measurement errors, or any data that tends to cluster around an average. For example, if generating test scores with mean 75 and standard deviation 10, most values will be near 75, with fewer values at extremes like 50 or 100. Do not use it for uniform random selection where all values should have equal probability.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I generate unique random numbers without duplicates?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'When generating integers, enable the "Generate unique numbers only" checkbox to ensure no duplicates appear in your results. This is useful for creating lottery tickets, selecting winners from a pool, shuffling a deck, or random sampling without replacement. Important limitation: the number of unique integers you request cannot exceed the range size. For example, if your range is 1-10, you can generate at most 10 unique numbers. Requesting 20 unique numbers from a range of 1-10 is impossible and will trigger an error. The algorithm uses Fisher-Yates shuffle for efficiency. This option only applies to integers; decimal and distribution modes always allow duplicates since the probability of exact decimal matches is essentially zero. For decimal uniqueness, you would need to manually filter results.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are common use cases for random number generators?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Random number generators have diverse applications across many fields. Gaming: dice rolls, card shuffling, loot drops, procedural content generation. Lotteries and contests: picking winners, generating ticket numbers, fair selection. Statistics and research: random sampling, experimental randomization, Monte Carlo simulations, bootstrapping. Education: creating practice problems, generating quiz questions, random seat assignments. Security: password generation (though cryptographic RNGs are preferred for production), creating test data. Everyday decisions: choosing what to eat, picking movie to watch, randomizing workout order. Science: simulating random processes, modeling uncertainty, generating test datasets. Each use case may require different settings - lotteries need unique integers, simulations may need normal distributions, and games often use simple integer ranges.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is this a true random number generator or pseudorandom?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'This calculator uses pseudorandom number generation (PRNG), which means it uses mathematical algorithms to produce numbers that appear random but are actually deterministic and reproducible if you know the starting seed. True random number generators (TRNGs) use physical phenomena like atmospheric noise or radioactive decay. For most practical purposes - games, simulations, random selection, education - pseudorandom generators are perfectly adequate and have advantages like speed and reproducibility for testing. However, for cryptographic applications like password generation, encryption keys, or high-security tokens, you should use cryptographically secure random number generators specifically designed for security. Modern browsers provide crypto.getRandomValues() for such purposes. The quality of this PRNG is suitable for statistical simulations, Monte Carlo methods, and general-purpose randomization tasks.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/random-number-generator'),
        name: 'How to Generate Random Numbers',
        description: 'Step-by-step guide to generating random numbers with custom ranges, distributions, and options.',
        totalTime: 'PT2M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Random Number Generator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Number Type',
            text: 'Choose the type of random numbers you want to generate: Integer for whole numbers like dice rolls or lottery picks; Decimal for floating-point numbers with fractional parts; Normal Distribution for bell-curve data common in statistics; Uniform Distribution for evenly distributed random values. Each type serves different purposes and applications.',
            url: getStepUrl('/random-number-generator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Set Range or Distribution Parameters',
            text: 'For Integer, Decimal, and Uniform types: Enter your minimum and maximum values to define the range. For Normal Distribution: Enter the mean (center point) and standard deviation (spread). For example, mean 100 and standard deviation 15 mimics IQ score distribution. Ensure minimum is less than maximum for range-based types.',
            url: getStepUrl('/random-number-generator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Specify Quantity',
            text: 'Enter how many random numbers you want to generate, from 1 to 10,000. For single random picks (like a dice roll), enter 1. For batch generation (like creating test data), enter larger quantities. Larger batches will show distribution charts to visualize the randomness pattern.',
            url: getStepUrl('/random-number-generator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Configure Optional Settings',
            text: 'For decimals and distributions, set the number of decimal places (0-10) for precision control. For integers, enable "unique numbers only" if you need no duplicates, useful for lottery numbers or random sampling. Note that unique mode limits you to generating at most as many numbers as your range size.',
            url: getStepUrl('/random-number-generator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Generate and View Results',
            text: 'Click "Generate Random Numbers" to create your numbers. Results appear instantly with each number displayed in an individual card for easy reading. The calculator automatically computes statistics (min, max, average, sum) and shows distribution charts for batches of 10 or more numbers to visualize the randomness pattern.',
            url: getStepUrl('/random-number-generator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Copy or Export Results',
            text: 'Use the "Copy All" button to copy all generated numbers to your clipboard for pasting into other applications. You can also save results as an image, print them, or share the calculator configuration with others. The statistics and distribution chart are included when saving or printing.',
            url: getStepUrl('/random-number-generator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/random-number-generator'),
        headline: 'Random Number Generator - Complete Guide to Generating Random Numbers',
        description:
          'Comprehensive guide to random number generation. Learn about different types of random numbers, distribution patterns, and practical applications for statistics, gaming, and research.',
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
        image: getOgImage('random-number'),
        articleBody:
          'Random number generators are essential tools in mathematics, statistics, science, gaming, and everyday decision-making. This guide explains how random number generation works and when to use different types.',
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
        Random Number Generator - Generate Random Numbers with Custom Ranges and Distributions
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
                Random Number Generator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <RandomNumberGenerator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Random Number Generation
          </h2>

          <p className="text-gray-700 mb-4">
            Random number generators (RNGs) are fundamental tools that produce unpredictable sequences 
            of numbers. They power everything from lottery draws and casino games to scientific simulations 
            and cryptographic security. While true randomness is challenging to achieve computationally, 
            modern pseudorandom number generators produce sequences that are statistically indistinguishable 
            from truly random data for most practical purposes.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Types of Random Number Generation
          </h3>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Integer Random Numbers
          </h4>

          <p className="text-gray-700 mb-4">
            Integer random numbers are whole numbers without fractional parts. They are the most common 
            type used in everyday applications. A 6-sided die produces integers from 1 to 6. Lottery 
            systems generate unique integers within a specific range (e.g., 1-49). Integer generators 
            are perfect for discrete choices, countable selections, and scenarios requiring whole-number 
            outcomes. When you need to randomly select items from a list, assign participants to groups, 
            or simulate dice rolls, integer generation is your tool.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Decimal (Floating-Point) Random Numbers
          </h4>

          <p className="text-gray-700 mb-4">
            Decimal random numbers include fractional components and are used when continuous values 
            are needed. Scientific simulations often require decimal precision for modeling physical 
            phenomena. Monte Carlo methods rely on decimal random numbers for numerical integration 
            and optimization. Machine learning uses random decimals for weight initialization and 
            stochastic gradient descent. When precision matters and your values can fall anywhere 
            on a continuum rather than at discrete points, decimal generation is appropriate.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Normal Distribution
          </h4>

          <p className="text-gray-700 mb-4">
            Normal distribution, the famous bell curve, generates numbers that cluster around a central 
            mean value. About 68% of values fall within one standard deviation of the mean, 95% within 
            two, and 99.7% within three. This pattern appears throughout nature: human heights, test 
            scores, measurement errors, IQ distributions, and countless biological and physical phenomena. 
            The normal distribution has two key parameters: the mean (μ) determines the center, and the 
            standard deviation (σ) controls the spread. Use normal distribution when modeling natural 
            variation, creating realistic test data that mimics real-world patterns, or implementing 
            statistical simulations.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Uniform Distribution
          </h4>

          <p className="text-gray-700 mb-4">
            Uniform distribution gives equal probability to every value within the specified range. 
            Unlike normal distribution which clusters around the mean, uniform distribution spreads 
            values evenly across the entire range. This is ideal for fair random selection where no 
            value should be favored, generating random coordinates in a defined space, simulating fair 
            dice or spinners, or creating unbiased random samples. When every outcome should have equal 
            likelihood, uniform distribution is the correct choice.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Practical Applications
          </h3>

          <p className="text-gray-700 mb-4">
            Random number generators serve countless real-world purposes. In gaming, they power dice 
            rolls, card shuffling, loot drops, and procedural world generation. Research and statistics 
            use RNGs for random sampling, clinical trial randomization, Monte Carlo simulations, and 
            bootstrapping techniques. Education benefits from random assignment of students to groups, 
            generation of practice problems with varying difficulty, and fair selection processes. 
            Security applications include password generation, creation of cryptographic keys, and 
            secure token generation (though these require cryptographically secure RNGs). Everyday 
            decisions like choosing what movie to watch, picking a restaurant, or randomizing workout 
            routines can all benefit from random selection.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Unique vs. Non-Unique Generation
          </h3>

          <p className="text-gray-700 mb-4">
            When generating integers, you can choose whether duplicates are allowed. Non-unique 
            generation allows the same number to appear multiple times, like rolling a die 10 times 
            where you might see "3" several times. Unique generation ensures each number appears at 
            most once, essential for lottery ticket generation, selecting winners from a pool without 
            replacement, or creating randomized ordered lists. The key constraint: you cannot generate 
            more unique numbers than the range allows. A range of 1-10 can produce at most 10 unique 
            integers. Attempting to generate 20 unique numbers from this range is mathematically impossible.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Pseudorandom vs. True Random
          </h3>

          <p className="text-gray-700 mb-4">
            Most computer-based random number generators, including this calculator, are pseudorandom. 
            They use mathematical algorithms (like the Mersenne Twister or Linear Congruential Generator) 
            that produce sequences appearing random but are actually deterministic - the same seed value 
            produces the same sequence. This is acceptable and even beneficial for most applications: 
            reproducibility for debugging and testing, speed and efficiency, statistical quality sufficient 
            for simulations, and predictability when needed for testing. However, pseudorandom generators 
            are not suitable for cryptographic security. True random number generators (TRNGs) harvest 
            entropy from physical processes like atmospheric noise, radioactive decay, or quantum phenomena, 
            providing genuine unpredictability for security-critical applications like encryption keys.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Best Practices
          </h3>

          <p className="text-gray-700 mb-4">
            Choose the right distribution for your needs. Use integers for discrete choices, decimals 
            for continuous measurements, normal distribution for natural phenomena, and uniform 
            distribution for fair selection. Verify your range makes sense - minimum should be less 
            than maximum, and standard deviation should be positive for normal distributions. When 
            generating unique integers, ensure your requested quantity does not exceed the range size. 
            For batch generations, examine the distribution chart to verify randomness quality. If you 
            see unexpected patterns, check your parameters. For statistical work, generate large samples 
            (1000+ values) to ensure properties like mean and variance converge to expected values.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Additional Resources</h3>

          <p className="text-gray-700 mb-4">
            For deeper understanding of random number generation and probability distributions:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <a
                href="https://www.random.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                RANDOM.ORG
              </a>{' '}
              - True random number service using atmospheric noise
            </li>
            <li>
              <a
                href="https://www.khanacademy.org/math/statistics-probability/random-variables-stats-library"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Khan Academy - Random Variables and Probability Distributions
              </a>{' '}
              - Free educational content on probability theory
            </li>
            <li>
              <a
                href="https://www.statisticshowto.com/probability-and-statistics/normal-distributions/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Statistics How To - Normal Distribution Guide
              </a>{' '}
              - Comprehensive explanation of normal distribution
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Pseudorandom_number_generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Wikipedia - Pseudorandom Number Generators
              </a>{' '}
              - Technical details and algorithms
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/probability-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎲</div>
            <h3 className="font-semibold text-gray-900">Probability Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate probability of events</p>
          </a>

          <a
            href="/statistics-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Statistics Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate mean, median, and standard deviation</p>
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
            href="/normal-distribution-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📐</div>
            <h3 className="font-semibold text-gray-900">Normal Distribution Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate probabilities for bell curves</p>
          </a>

          <a
            href="/z-score-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📉</div>
            <h3 className="font-semibold text-gray-900">Z-Score Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Convert scores to standard scores</p>
          </a>

          <a
            href="/percentage-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💯</div>
            <h3 className="font-semibold text-gray-900">Percentage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate percentages and ratios</p>
          </a>

          <a
            href="/sample-size-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔬</div>
            <h3 className="font-semibold text-gray-900">Sample Size Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Determine required sample sizes</p>
          </a>

          <a
            href="/p-value-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔬</div>
            <h3 className="font-semibold text-gray-900">P-Value Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate statistical significance</p>
          </a>
        </div>
      </section>
    </div>
  );
}

