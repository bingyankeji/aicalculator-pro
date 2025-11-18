import { Metadata } from 'next';
import HalfLifeCalculator from '@/components/Calculator/HalfLifeCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Half-Life Calculator - Calculate Radioactive Decay & Remaining Amount | AICalculator',
  description: 'Free half-life calculator for radioactive decay calculations. Calculate remaining amount, decay time, and half-life period with exponential decay curves. Perfect for physics, chemistry, and nuclear science.',
  keywords: [
    'half-life calculator',
    'radioactive decay calculator',
    'exponential decay',
    'nuclear decay calculator',
    'carbon-14 dating',
    'isotope decay',
    'decay constant',
    'half-life formula',
    'remaining amount calculator',
    'decay time calculator',
    'nuclear physics calculator',
    'radioactivity calculator',
    'decay curve',
    'uranium decay',
    'plutonium half-life',
    'cobalt-60 calculator',
    'iodine-131 decay',
    'technetium-99m',
    'archaeological dating',
    'nuclear medicine calculator',
    'decay percentage',
    'exponential function',
    'logarithmic decay',
    'nuclear chemistry',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Half-Life Calculator - Radioactive Decay Calculator',
    description: 'Calculate radioactive decay with our free half-life calculator. Includes decay curves, isotope database, and time calculations for nuclear science.',
    type: 'website',
    url: getUrl('/half-life-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [
      {
        url: getOgImage('half-life'),
        width: 1200,
        height: 630,
        alt: 'Half-Life Calculator - Radioactive Decay Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Half-Life Calculator - Radioactive Decay Calculator',
    description: 'Calculate radioactive decay with our free half-life calculator. Includes decay curves, isotope database, and time calculations.',
    images: [getOgImage('half-life')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/half-life-calculator'),
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function HalfLifeCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/half-life-calculator'),
        name: 'Half-Life Calculator',
        url: getUrl('/half-life-calculator'),
        description:
          'A comprehensive calculator for radioactive decay calculations including half-life, remaining amount, decay time, and exponential decay curves.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate remaining amount after radioactive decay',
          'Find time required for specific decay',
          'Determine half-life from measurements',
          'Interactive decay curve visualization',
          'Common isotopes database (C-14, U-235, etc.)',
          'Multiple time units (seconds to years)',
          'Half-life milestones table',
          'Decay rate classification',
          'Exponential decay formula',
          'Print and export results',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/half-life-calculator'),
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
            name: 'Math & Numbers',
            item: getUrl('/math-numbers'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Half-Life Calculator',
            item: getUrl('/half-life-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/half-life-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is half-life and how does radioactive decay work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Half-life is the time required for half of a radioactive substance to decay. Radioactive decay follows an exponential pattern described by the formula N(t) = N₀ × (1/2)^(t/T), where N(t) is the remaining amount, N₀ is the initial amount, t is time elapsed, and T is the half-life period. This means that after one half-life, 50% remains; after two half-lives, 25% remains; after three, 12.5% remains, and so on. The decay is a random process at the atomic level, but becomes predictable for large numbers of atoms. Each radioactive isotope has a unique half-life ranging from fractions of a second to billions of years.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I use the half-life calculator?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Using the half-life calculator is simple: First, select your calculation type (remaining amount, time required, or half-life determination). Enter the initial amount of substance, choose your time unit (seconds, minutes, hours, days, or years), and input either the half-life and elapsed time, or the remaining amount depending on what you want to calculate. You can also select from common isotopes like Carbon-14 or Uranium-235 to auto-fill half-life values. Click Calculate to see results including decay curves, milestone tables, and percentage breakdowns. The calculator provides both numerical results and visual representations of the exponential decay process.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are common isotopes and their half-lives?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Common radioactive isotopes have vastly different half-lives for different applications. Carbon-14 (t½ = 5,730 years) is used for archaeological dating of organic materials up to 50,000 years old. Uranium-235 (t½ = 703.8 million years) is used in nuclear reactors and dating ancient rocks. Uranium-238 (t½ = 4.47 billion years) helps date the Earth itself. For medical applications, Iodine-131 (t½ = 8.02 days) treats thyroid conditions, Technetium-99m (t½ = 6 hours) is used in medical imaging, and Cobalt-60 (t½ = 5.27 years) is used in radiation therapy. Each half-life makes the isotope suitable for specific practical applications.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is Carbon-14 dating used in archaeology?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Carbon-14 dating works by measuring the remaining C-14 in organic materials. Living organisms continuously absorb C-14 from the atmosphere, maintaining a constant ratio. When they die, C-14 intake stops and the isotope begins to decay with a half-life of 5,730 years. By measuring how much C-14 remains compared to stable Carbon-12, scientists can calculate when the organism died. For example, if a sample has 25% of the original C-14 (two half-lives), it is approximately 11,460 years old. This method is accurate for dating materials between 500 and 50,000 years old, making it invaluable for archaeology and paleontology. Factors like contamination and atmospheric C-14 variations are accounted for using calibration curves.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the decay constant and how does it relate to half-life?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The decay constant (λ) is the probability that a single atom will decay per unit time, related to half-life by the formula λ = ln(2)/T, where T is the half-life. The decay constant appears in the exponential decay equation N(t) = N₀ × e^(-λt). A larger decay constant means faster decay and a shorter half-life. For example, if λ = 0.693 per year, the half-life is 1 year. The decay constant is fundamental in nuclear physics because it represents an intrinsic property of the isotope, independent of the amount present. Understanding this relationship helps in converting between different representations of radioactive decay rates used in various scientific fields.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is radioactive decay used in nuclear medicine?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nuclear medicine uses radioactive isotopes with specific half-lives for diagnosis and treatment. Short half-life isotopes like Technetium-99m (6 hours) are ideal for imaging because they provide strong signals while clearing from the body quickly, minimizing radiation exposure. Iodine-131 (8 days) treats thyroid cancer by concentrating in thyroid tissue and delivering targeted radiation. Cobalt-60 (5.3 years) and other isotopes treat various cancers through external beam radiation. The half-life must be long enough for medical procedures but short enough to avoid long-term radiation exposure. Calculating decay helps doctors determine proper dosing, timing, and when radioactive materials can be safely disposed of or have decayed to safe levels.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/half-life-calculator'),
        name: 'How to Use the Half-Life Calculator',
        description: 'Step-by-step guide to calculating radioactive decay and half-life',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Half-Life Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Calculation Type',
            text: 'Choose what you want to calculate: remaining amount after decay, time required for specific decay, or the half-life itself from measurements.',
            url: getStepUrl('/half-life-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Initial Amount',
            text: 'Input the starting quantity of radioactive material in any unit (grams, atoms, becquerels, etc.). This represents the amount at time zero.',
            url: getStepUrl('/half-life-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Choose Time Unit',
            text: 'Select the appropriate time unit for your calculation: seconds, minutes, hours, days, or years. Match this to your half-life data.',
            url: getStepUrl('/half-life-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Input Half-Life or Use Preset',
            text: 'Enter the half-life value, or select from common isotopes like Carbon-14 (5,730 years), Uranium-235 (703.8 million years), or Technetium-99m (6 hours).',
            url: getStepUrl('/half-life-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Enter Time or Remaining Amount',
            text: 'Depending on your calculation type, enter either the elapsed time or the remaining amount. The calculator will solve for the unknown variable.',
            url: getStepUrl('/half-life-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'View Results and Decay Curve',
            text: 'Click Calculate to see remaining amount, decay percentage, number of half-lives, and interactive decay curves showing exponential decay over time.',
            url: getStepUrl('/half-life-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Analyze Milestones',
            text: 'Review the half-life milestones table showing remaining amounts at 1, 2, 3... half-lives, and the decay rate classification (fast/medium/slow).',
            url: getStepUrl('/half-life-calculator', 7),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/half-life-calculator'),
        headline: 'Understanding Half-Life and Radioactive Decay Calculations',
        description:
          'Comprehensive guide to half-life calculations, radioactive decay formulas, and practical applications in science and medicine.',
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
        image: getOgImage('half-life'),
        articleBody:
          'Half-life is a fundamental concept in nuclear physics and chemistry that describes the time required for half of a radioactive substance to decay. This comprehensive guide covers the exponential decay formula, common isotopes, calculation methods, and practical applications in fields ranging from archaeology to nuclear medicine.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        Half-Life Calculator - Calculate Radioactive Decay and Remaining Amount
      </h1>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol
            className="flex items-center space-x-2 text-sm text-gray-600"
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
              <a href="/math-numbers" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Math & Numbers</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Half-Life Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <HalfLifeCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Half-Life and Radioactive Decay</h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700 mb-0">
              Half-life is one of the most important concepts in nuclear physics, describing how quickly radioactive
              materials decay over time. This fundamental principle has applications ranging from carbon dating ancient
              artifacts to treating cancer with radiation therapy.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What is Half-Life?</h3>
          <p className="text-gray-700 mb-4">
            Half-life (t½) is defined as the time required for exactly half of a radioactive substance to undergo decay.
            This is a constant property for each radioactive isotope, independent of the initial amount or external
            conditions like temperature or pressure. For example, if you start with 100 grams of a substance with a
            half-life of 10 years, after 10 years you'll have 50 grams remaining, after 20 years you'll have 25 grams,
            and after 30 years you'll have 12.5 grams.
          </p>
          <p className="text-gray-700 mb-4">
            The decay process follows an exponential pattern, which means it never truly reaches zero—theoretically, there
            are always infinitesimally small amounts remaining. However, after about 10 half-lives, less than 0.1% of the
            original substance remains, which is often considered negligible for practical purposes.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Exponential Decay Formula</h3>
          <p className="text-gray-700 mb-4">
            Radioactive decay is described by the exponential decay equation:
          </p>
          <div className="bg-gray-100 p-6 rounded-lg mb-6 font-mono text-center">
            <p className="text-xl mb-2">N(t) = N₀ × (1/2)^(t/T)</p>
            <p className="text-sm text-gray-600 mt-4">or equivalently</p>
            <p className="text-xl mt-2">N(t) = N₀ × e^(-λt)</p>
          </div>
          <p className="text-gray-700 mb-4">Where:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>N(t)</strong> = remaining amount at time t
            </li>
            <li>
              <strong>N₀</strong> = initial amount at time 0
            </li>
            <li>
              <strong>t</strong> = elapsed time
            </li>
            <li>
              <strong>T</strong> = half-life period
            </li>
            <li>
              <strong>λ</strong> = decay constant = ln(2)/T ≈ 0.693/T
            </li>
            <li>
              <strong>e</strong> = Euler's number (approximately 2.71828)
            </li>
          </ul>
          <p className="text-gray-700 mb-4">
            Both formulas are equivalent, with the first being more intuitive for understanding half-lives, and the second
            being more common in advanced physics. The decay constant λ represents the probability that a single atom will
            decay per unit time.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Radioactive Isotopes and Their Half-Lives</h3>
          <p className="text-gray-700 mb-4">
            Different radioactive isotopes have vastly different half-lives, making them suitable for different
            applications:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Isotope</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Half-Life</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Primary Use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Carbon-14</td>
                  <td className="border border-gray-300 px-4 py-2">5,730 years</td>
                  <td className="border border-gray-300 px-4 py-2">Archaeological dating</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Uranium-235</td>
                  <td className="border border-gray-300 px-4 py-2">703.8 million years</td>
                  <td className="border border-gray-300 px-4 py-2">Nuclear fuel, geological dating</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Uranium-238</td>
                  <td className="border border-gray-300 px-4 py-2">4.47 billion years</td>
                  <td className="border border-gray-300 px-4 py-2">Dating Earth's age</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Plutonium-239</td>
                  <td className="border border-gray-300 px-4 py-2">24,110 years</td>
                  <td className="border border-gray-300 px-4 py-2">Nuclear weapons, research</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Cobalt-60</td>
                  <td className="border border-gray-300 px-4 py-2">5.27 years</td>
                  <td className="border border-gray-300 px-4 py-2">Cancer radiation therapy</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Iodine-131</td>
                  <td className="border border-gray-300 px-4 py-2">8.02 days</td>
                  <td className="border border-gray-300 px-4 py-2">Thyroid treatment</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Technetium-99m</td>
                  <td className="border border-gray-300 px-4 py-2">6 hours</td>
                  <td className="border border-gray-300 px-4 py-2">Medical diagnostic imaging</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Radon-222</td>
                  <td className="border border-gray-300 px-4 py-2">3.82 days</td>
                  <td className="border border-gray-300 px-4 py-2">Geological research, home safety</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Carbon-14 Dating: Archaeological Applications</h3>
          <p className="text-gray-700 mb-4">
            One of the most well-known applications of half-life is radiocarbon dating using Carbon-14. Living organisms
            continuously absorb carbon from the atmosphere, including a small amount of radioactive C-14 alongside stable
            C-12. While alive, the ratio of C-14 to C-12 remains constant. When an organism dies, it stops taking in new
            carbon, and the C-14 begins to decay with a half-life of 5,730 years.
          </p>
          <p className="text-gray-700 mb-4">
            By measuring the remaining C-14 in organic materials (wood, bone, textiles, etc.) and comparing it to the
            expected amount, scientists can calculate when the organism died. For example:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>50% remaining = 1 half-life = ~5,730 years old</li>
            <li>25% remaining = 2 half-lives = ~11,460 years old</li>
            <li>12.5% remaining = 3 half-lives = ~17,190 years old</li>
            <li>6.25% remaining = 4 half-lives = ~22,920 years old</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Carbon-14 dating is effective for materials between 500 and 50,000 years old. Beyond this range, too little
            C-14 remains for accurate measurement. For more information on carbon dating methodology, visit the{' '}
            <a
              href="https://www.aps.org/publications/apsnews/200810/physicshistory.cfm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              American Physical Society's article on radiocarbon dating
            </a>
            .
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Medical Applications of Radioactive Decay</h3>
          <p className="text-gray-700 mb-4">
            Nuclear medicine relies heavily on understanding half-lives to safely use radioactive materials for diagnosis
            and treatment:
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Diagnostic Imaging</h4>
          <p className="text-gray-700 mb-4">
            Technetium-99m (t½ = 6 hours) is the most widely used medical radioisotope. Its short half-life means it
            produces strong signals for imaging while clearing from the body quickly, minimizing radiation exposure.
            Patients receive an injection of Tc-99m attached to specific molecules that concentrate in organs or tissues
            being examined. After 24 hours (4 half-lives), less than 10% of the radioactivity remains, and after 48 hours
            it's essentially gone.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Cancer Treatment</h4>
          <p className="text-gray-700 mb-4">
            Iodine-131 (t½ = 8.02 days) treats thyroid cancer because the thyroid naturally concentrates iodine. The
            radiation from I-131 decay kills cancer cells while having minimal effect on surrounding tissues. Cobalt-60
            (t½ = 5.27 years) provides external beam radiation therapy. Its intermediate half-life makes it practical for
            medical facilities—long enough that sources don't need frequent replacement, but short enough that they can be
            safely disposed of after use.
          </p>
          <p className="text-gray-700 mb-4">
            For authoritative information on medical uses of radioactive isotopes, see the{' '}
            <a
              href="https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              National Cancer Institute's guide to radiation therapy
            </a>
            .
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Geological Dating and Earth Science</h3>
          <p className="text-gray-700 mb-4">
            Isotopes with extremely long half-lives help scientists date rocks and determine Earth's age:
          </p>
          <p className="text-gray-700 mb-4">
            Uranium-238 (t½ = 4.47 billion years) decays into lead-206 through a series of intermediate steps. By
            measuring the ratio of U-238 to Pb-206 in rocks, geologists can determine their age. This method has shown
            that the oldest Earth rocks are about 4.0 billion years old, and meteorites are around 4.5 billion years old,
            providing our best estimate of when the solar system formed.
          </p>
          <p className="text-gray-700 mb-4">
            Potassium-40 (t½ = 1.25 billion years) decays to argon-40 and is used for potassium-argon dating of volcanic
            rocks. This technique has been crucial in dating important archaeological sites, particularly in Africa where
            early human fossils are found in volcanic layers.
          </p>
          <p className="text-gray-700 mb-4">
            For more information on geological dating methods, visit the{' '}
            <a
              href="https://www.usgs.gov/faqs/how-do-scientists-determine-ages-rocks-and-fossils"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              U.S. Geological Survey's explanation of rock dating techniques
            </a>
            .
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Nuclear Power and Waste Management</h3>
          <p className="text-gray-700 mb-4">
            Understanding half-lives is critical for nuclear power generation and managing radioactive waste:
          </p>
          <p className="text-gray-700 mb-4">
            Uranium-235 (t½ = 703.8 million years) and Plutonium-239 (t½ = 24,110 years) are fissile materials used in
            nuclear reactors. Their long half-lives mean they remain radioactive for geological timescales, creating
            significant challenges for waste disposal. Nuclear waste containing these isotopes must be isolated from the
            environment for tens of thousands of years.
          </p>
          <p className="text-gray-700 mb-4">
            Some nuclear waste products have much shorter half-lives. Iodine-131 (t½ = 8 days) and Xenon-133 (t½ = 5
            days) from nuclear fission become non-hazardous relatively quickly. After 10 half-lives (about 80 days for
            I-131), they've decayed to less than 0.1% of their original radioactivity. However, waste also contains
            long-lived isotopes like Plutonium-239, requiring long-term storage solutions.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Calculation Methods: Forward and Inverse Problems
          </h3>
          <p className="text-gray-700 mb-4">
            There are three main types of half-life calculations, each useful for different scenarios:
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Forward Calculation (Finding Remaining Amount)</h4>
          <p className="text-gray-700 mb-4">Given initial amount, half-life, and elapsed time, find remaining amount:</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono">
            <p>N(t) = N₀ × (1/2)^(t/T)</p>
          </div>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> Starting with 100 grams of C-14 (t½ = 5,730 years), how much remains after 17,190
            years?
          </p>
          <p className="text-gray-700 mb-4">
            Solution: N(17,190) = 100 × (1/2)^(17,190/5,730) = 100 × (1/2)^3 = 12.5 grams
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Finding Time Required</h4>
          <p className="text-gray-700 mb-4">
            Given initial amount, half-life, and remaining amount, find elapsed time:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono">
            <p>t = T × log(N/N₀) / log(0.5)</p>
            <p className="text-sm text-gray-600 mt-2">or equivalently: t = T × log₂(N₀/N)</p>
          </div>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> An artifact has 25% of its original C-14. How old is it?
          </p>
          <p className="text-gray-700 mb-4">
            Solution: t = 5,730 × log(0.25) / log(0.5) = 5,730 × 2 = 11,460 years
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Determining Half-Life</h4>
          <p className="text-gray-700 mb-4">
            Given initial amount, remaining amount, and elapsed time, find half-life:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono">
            <p>T = t × log(0.5) / log(N/N₀)</p>
          </div>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> A sample decreases from 1000 to 250 units in 20 days. What's the half-life?
          </p>
          <p className="text-gray-700 mb-4">
            Solution: T = 20 × log(0.5) / log(0.25) = 20 × 0.5 = 10 days
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Decay Rate Classification</h3>
          <p className="text-gray-700 mb-4">Radioactive isotopes can be classified by their decay rates:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Fast Decay:</strong> Half-life less than 1 day (Tc-99m, I-131) - Used for medical procedures
            </li>
            <li>
              <strong>Medium Decay:</strong> Half-life between 1 day and 1 year (Radon-222) - Environmental concerns
            </li>
            <li>
              <strong>Slow Decay:</strong> Half-life greater than 1 year (C-14, U-238) - Dating applications
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Practical Tips for Using the Calculator</h3>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Match your time units consistently (don't mix years and days)</li>
            <li>Use scientific notation for very large or small numbers</li>
            <li>For archaeological dating, consider that practical measurements become difficult below 1% remaining</li>
            <li>In medical applications, assume radioactivity is negligible after 10 half-lives</li>
            <li>Save results using the export functions for documentation</li>
            <li>Select common isotopes from the database for quick calculations</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Safety Considerations</h3>
          <p className="text-gray-700 mb-4">
            While this calculator helps understand radioactive decay mathematically, working with actual radioactive
            materials requires:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Proper licensing and training</li>
            <li>Radiation monitoring equipment</li>
            <li>Appropriate shielding and containment</li>
            <li>Following local and national regulations</li>
            <li>Understanding ALARA (As Low As Reasonably Achievable) principles</li>
          </ul>
          <p className="text-gray-700 mb-4">
            For information about radiation safety, consult the{' '}
            <a
              href="https://www.nrc.gov/about-nrc/radiation/health-effects.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              U.S. Nuclear Regulatory Commission
            </a>{' '}
            or your country's nuclear safety authority.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Related Calculations</h3>
          <p className="text-gray-700 mb-4">
            For related mathematical and scientific calculations, you might find these calculators helpful:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <a href="/exponential-growth-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Exponential Growth Calculator
              </a>{' '}
              - For growth processes (opposite of decay)
            </li>
            <li>
              <a href="/logarithm-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Logarithm Calculator
              </a>{' '}
              - Essential for inverse decay calculations
            </li>
            <li>
              <a href="/scientific-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Scientific Calculator
              </a>{' '}
              - For complex mathematical operations
            </li>
            <li>
              <a href="/percentage-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Percentage Calculator
              </a>{' '}
              - Calculate decay percentages
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/exponential-growth-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">Exponential Growth</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate growth processes</p>
          </a>

          <a
            href="/logarithm-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📐</div>
            <h3 className="font-semibold text-gray-900">Logarithm Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Solve logarithmic equations</p>
          </a>

          <a
            href="/scientific-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔬</div>
            <h3 className="font-semibold text-gray-900">Scientific Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Advanced mathematical functions</p>
          </a>

          <a
            href="/percentage-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">%</div>
            <h3 className="font-semibold text-gray-900">Percentage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate percentages and ratios</p>
          </a>
        </div>
      </section>
    </div>
  );
}

