import { Metadata } from 'next';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import ArmyBodyFatCalculator from '@/components/Calculator/ArmyBodyFatCalculator';

export const metadata: Metadata = {
  title: 'Army Body Fat (Free, No signup) - Military Standards | AICalculator',
  description: 'Free Army Body Fat Calculator with no sign-up required. Calculate your body fat percentage using US military standards. Get instant results for Army, Navy, and Marine Corps body composition requirements with detailed analysis and improvement recommendations.',
  keywords: [
    'army body fat calculator',
    'free army body fat calculator',
    'army body fat calculator no signup',
    'military body fat calculator',
    'navy body fat calculator',
    'marine corps body fat calculator',
    'body composition calculator',
    'army body fat percentage',
    'military body composition',
    'army fat calculator',
    'navy body composition',
    'marine body fat',
    'body fat standards',
    'military fitness standards',
    'army circumference based body fat calculator',
    'tape test calculator',
    'army regulation 600-9',
    'dod body fat calculator',
    'armed forces body fat',
    'military weight standards',
    'body fat measurement military',
    'army physical fitness body fat',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Army Body Fat (Free, No signup) - AICalculator',
    description: 'Free Army Body Fat Calculator with no sign-up required. Calculate your body fat percentage using official US military standards. Instant results for Army, Navy, and Marine Corps requirements.',
    type: 'website',
    url: getUrl('/army-body-fat-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [
      {
        url: getOgImage('army-body-fat'),
        width: 1200,
        height: 630,
        alt: 'Army Body Fat Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Army Body Fat (Free, No signup) - AICalculator',
    description: 'Free Army Body Fat Calculator with no sign-up required. Calculate body fat percentage using US military standards. Get instant results and improvement recommendations.',
    images: [getOgImage('army-body-fat')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/army-body-fat-calculator'),
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': getWebAppId('/army-body-fat-calculator'),
      name: 'Army Body Fat Calculator',
      url: getUrl('/army-body-fat-calculator'),
      description: 'Professional Army Body Fat Calculator using official US military body composition standards. Calculate body fat percentage for Army, Navy, and Marine Corps with instant results.',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'US Army body fat calculation',
        'US Navy body composition assessment',
        'US Marine Corps body fat standards',
        'Multiple measurement systems (metric/imperial)',
        'Age-based standards comparison',
        'Body fat category classification',
        'Health risk assessment',
        'Improvement recommendations',
        'Military standards reference table',
        'Visual charts and graphs',
        'Pass/fail determination',
        'Printable results',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/army-body-fat-calculator'),
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
          name: 'Health & Fitness',
          item: getUrl('/health-fitness'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Army Body Fat Calculator',
          item: getUrl('/army-body-fat-calculator'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/army-body-fat-calculator'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the Army body fat calculator work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Army body fat calculator uses the circumference-based method specified in Army Regulation 600-9. For males, it measures height, neck, and waist circumference. For females, it measures height, neck, waist, and hip circumference. These measurements are used in a logarithmic formula to estimate body fat percentage. The formula for males is: Body Fat % = 86.010 × log₁₀(waist - neck) - 70.041 × log₁₀(height) + 36.76. For females: Body Fat % = 163.205 × log₁₀(waist + hip - neck) - 97.684 × log₁₀(height) - 78.387.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the Army body fat standards by age?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Army body fat standards vary by age and gender: Ages 17-20: Male max 20%, Female max 30% | Ages 21-27: Male max 22%, Female max 32% | Ages 28-39: Male max 24%, Female max 34% | Ages 40+: Male max 26%, Female max 36%. These are maximum allowed percentages according to Army Regulation 600-9; lower is better for military readiness and operational effectiveness.',
          },
        },
        {
          '@type': 'Question',
          name: 'How accurate is the military body fat calculator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The military circumference-based method has a standard error of approximately ±3-4%. While not as accurate as hydrostatic weighing or DEXA scans, it provides a consistent, practical field method for assessing body composition. The method is specifically validated for military populations and operational settings where more complex equipment is unavailable.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens if I fail the Army body fat test?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Failing the Army body fat assessment results in enrollment in the Army Body Composition Program (ABCP), which includes mandatory weight loss requirements, increased physical training, and dietary counseling. A flag is placed on your record preventing promotions, awards, and school attendance. Service members are given 6 months to meet standards; repeated failures may result in administrative separation.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does the military use body fat instead of BMI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The military uses body fat percentage because BMI doesn\'t distinguish between muscle and fat mass. Military training builds significant muscle, which increases weight but improves fitness. A muscular soldier might have a BMI of 28 (overweight) but only 15% body fat (athletic). Body fat measurement provides a more accurate assessment of physical readiness and health for active military populations.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I reduce body fat to meet military standards?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Healthy body fat reduction occurs at 1-2% per month through: consistent cardiovascular exercise (running, swimming) 3-5x weekly, strength training 3-4x weekly, moderate caloric deficit (300-500 calories/day), high protein intake (1-1.2g per lb body weight), adequate hydration, and 7-9 hours sleep. Focus on waist reduction through core work and overall fat loss. Consult military fitness resources or registered dietitians for personalized plans.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/army-body-fat-calculator'),
      name: 'How to Calculate Your Army Body Fat Percentage',
      description: 'Step-by-step guide to using the Army Body Fat Calculator and understanding military body composition standards',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Select Your Gender',
          text: 'Choose male or female, as different formulas apply for each gender in military body fat calculations.',
          url: getStepUrl('/army-body-fat-calculator', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose Measurement System',
          text: 'Select either Imperial (inches) or Metric (centimeters) based on your preference. Both systems provide accurate results.',
          url: getStepUrl('/army-body-fat-calculator', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Select Military Branch',
          text: 'Choose US Army, Navy, or Marine Corps to ensure correct standards are applied for your service branch.',
          url: getStepUrl('/army-body-fat-calculator', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Enter Your Age',
          text: 'Input your current age in years. Military body fat standards vary by age group (17-20, 21-27, 28-39, 40+).',
          url: getStepUrl('/army-body-fat-calculator', 4),
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Measure and Enter Height',
          text: 'Measure your height without shoes. Stand straight against a wall for accurate measurement. Enter value in selected unit system.',
          url: getStepUrl('/army-body-fat-calculator', 5),
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Measure Neck Circumference',
          text: 'Measure around the neck at the narrowest point, just below the larynx (Adam\'s apple). Keep the tape measure level and snug but not tight. Round to nearest 0.5 inch or 1 cm.',
          url: getStepUrl('/army-body-fat-calculator', 6),
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Measure Waist Circumference',
          text: 'For males: Measure horizontally at the level of the navel. For females: Measure at the narrowest part of the torso. Keep abdomen relaxed, do not hold breath. Ensure tape is level all around.',
          url: getStepUrl('/army-body-fat-calculator', 7),
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Measure Hip Circumference (Females Only)',
          text: 'For females only: Measure around the hips at the largest protrusion of the buttocks. Keep tape horizontal and level. This measurement is not required for males.',
          url: getStepUrl('/army-body-fat-calculator', 8),
        },
        {
          '@type': 'HowToStep',
          position: 9,
          name: 'Calculate Body Fat Percentage',
          text: 'Click the "Calculate Body Fat" button. The calculator will instantly compute your body fat percentage using the official military formula and determine if you meet standards for your age group.',
          url: getStepUrl('/army-body-fat-calculator', 9),
        },
        {
          '@type': 'HowToStep',
          position: 10,
          name: 'Review Results and Recommendations',
          text: 'Analyze your body fat percentage, pass/fail status, category classification, and health risk level. Review detailed recommendations for diet, exercise, and measurement improvements if needed. Track progress over time.',
          url: getStepUrl('/army-body-fat-calculator', 10),
        },
      ],
      totalTime: 'PT5M',
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/army-body-fat-calculator'),
      headline: 'Army Body Fat Calculator: Complete Guide to Military Body Composition Standards',
      description: 'Comprehensive guide to using the Army Body Fat Calculator, understanding military body composition standards, and meeting fitness requirements.',
      author: {
        '@type': 'Organization',
        name: 'AICalculator.pro Team',
      },
      publisher: {
        '@type': 'Organization',
        name: 'AICalculator.pro',
        logo: {
          '@type': 'ImageObject',
          url: getUrl('/logo.png'),
        },
      },
      datePublished: '2024-01-15',
      dateModified: new Date().toISOString().split('T')[0],
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': getUrl('/army-body-fat-calculator'),
      },
    },
  ],
};

export default function ArmyBodyFatCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <h1 className="sr-only">Army Body Fat Calculator</h1>

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                  <span itemProp="name">Home</span>
                </a>
                <meta itemProp="position" content="1" />
              </li>
              <li className="text-gray-400">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="/health-fitness" itemProp="item" className="hover:text-blue-600 transition-colors">
                  <span itemProp="name">Health & Fitness</span>
                </a>
                <meta itemProp="position" content="2" />
              </li>
              <li className="text-gray-400">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" className="text-gray-900 font-semibold">
                  Army Body Fat Calculator
                </span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>

        {/* Calculator Section */}
        <section className="py-8 md:py-12" aria-label="Army Body Fat Calculator Tool">
          <div className="container mx-auto px-4">
            <ArmyBodyFatCalculator />
          </div>
        </section>

        {/* Educational Content for SEO */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Army Body Fat Education and Resources">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
            {/* What is Army Body Fat Calculator */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">What is the Army Body Fat Calculator?</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Army Body Fat Calculator is a specialized tool designed to assess body composition according to official US military standards. Unlike simple BMI calculators, this tool uses the circumference-based measurement method specified in{' '}
                  <a 
                    href="https://armypubs.army.mil/epubs/DR_pubs/DR_a/pdf/web/ARN30964_AR600-9_Web_FINAL.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Army Regulation 600-9
                  </a>
                  {' '}(AR 600-9), which provides a more accurate assessment of body fat percentage for military personnel and fitness enthusiasts.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This calculator is essential for active duty service members, military recruits, ROTC cadets, and anyone preparing for military service. It helps determine if you meet the body composition standards required for military readiness and operational effectiveness. You may also want to check our{' '}
                  <a href="/bmi-calculator" className="text-blue-600 hover:text-blue-800 underline">
                    BMI Calculator
                  </a>
                  {' '}for additional body composition insights.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The circumference-based method is preferred by the military because it can be performed quickly in field conditions, requires minimal equipment (just a tape measure), and provides consistent results when measurements are taken properly. This method has been validated specifically for military populations and is more appropriate than BMI for individuals with higher muscle mass.
                </p>
              </div>
            </section>

            {/* How It Works */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">How Does the Army Body Fat Calculation Work?</h2>
              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">For Males:</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The male body fat percentage is calculated using three measurements:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li><strong>Height:</strong> Total body height measured without shoes</li>
                  <li><strong>Neck Circumference:</strong> Measured at the narrowest point below the larynx</li>
                  <li><strong>Waist Circumference:</strong> Measured horizontally at the level of the navel</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The formula uses logarithmic calculations to estimate body fat percentage:
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                  <p className="font-mono text-sm">
                    Body Fat % = 86.010 × log₁₀(waist - neck) - 70.041 × log₁₀(height) + 36.76
                  </p>
                </div>

                <h3 className="text-2xl font-semibold mb-4 text-gray-800 mt-8">For Females:</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Female body fat calculations require an additional measurement:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li><strong>Height:</strong> Total body height measured without shoes</li>
                  <li><strong>Neck Circumference:</strong> Measured at the narrowest point below the larynx</li>
                  <li><strong>Waist Circumference:</strong> Measured at the narrowest part of the torso</li>
                  <li><strong>Hip Circumference:</strong> Measured at the largest protrusion of the buttocks</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The female formula accounts for natural differences in body composition:
                </p>
                <div className="bg-pink-50 p-4 rounded-lg mb-4">
                  <p className="font-mono text-sm">
                    Body Fat % = 163.205 × log₁₀(waist + hip - neck) - 97.684 × log₁₀(height) - 78.387
                  </p>
                </div>
              </div>
            </section>

            {/* Military Standards */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Understanding Military Body Fat Standards</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  The US military maintains strict body composition standards to ensure operational readiness and physical fitness. These standards recognize that body fat requirements naturally increase slightly with age while maintaining high fitness levels. For more information, visit the{' '}
                  <a 
                    href="https://www.army.mil/bodycomposition/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    official US Army Body Composition Program page
                  </a>.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-800">US Army Standards (AR 600-9):</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead className="bg-green-700 text-white">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">Age Group</th>
                        <th className="border border-gray-300 px-4 py-2">Male Maximum</th>
                        <th className="border border-gray-300 px-4 py-2">Female Maximum</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">17-20 years</td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-semibold">20%</td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-semibold">30%</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">21-27 years</td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-semibold">22%</td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-semibold">32%</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">28-39 years</td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-semibold">24%</td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-semibold">34%</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">40+ years</td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-semibold">26%</td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-semibold">36%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Important Note:</strong> These are <em>maximum</em> allowed percentages. Service members are encouraged to maintain body fat levels well below these maximums for optimal health and fitness. Lower body fat percentages generally correlate with better physical performance, reduced injury risk, and improved overall health outcomes.
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                  <p className="text-yellow-800 font-semibold mb-2">⚠️ Branch Variations</p>
                  <p className="text-yellow-700 text-sm">
                    While the Navy and Marine Corps use similar circumference-based methods, specific measurement techniques and standards may vary slightly between branches. The Army calculator provides a general assessment, but service members should consult their branch-specific regulations for official standards. Visit{' '}
                    <a 
                      href="https://www.navy.mil/Resources/Fact-Files/Display-FactFiles/Article/2171808/navy-physical-readiness-program/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-yellow-800 underline"
                    >
                      Navy Physical Readiness Program
                    </a>
                    {' '}or{' '}
                    <a 
                      href="https://www.marines.mil/News/Messages/Messages-Display/Article/2109131/body-composition-and-military-appearance-program/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-yellow-800 underline"
                    >
                      Marine Corps Body Composition Program
                    </a>
                    {' '}for branch-specific information.
                  </p>
                </div>
              </div>
            </section>

            {/* Accurate Measurements */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">How to Take Accurate Body Measurements</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Accurate measurements are crucial for reliable body fat calculations. Follow these detailed guidelines for each measurement:
                </p>

                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-blue-900">📏 Height Measurement</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Remove shoes and stand with heels together</li>
                      <li>Stand straight against a wall, looking forward</li>
                      <li>Have someone mark the highest point of your head</li>
                      <li>Measure from floor to mark</li>
                      <li>Record to nearest 0.5 inch or 1 cm</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-green-900">📏 Neck Circumference</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Measure at the narrowest point of the neck</li>
                      <li>Position tape just below the larynx (Adam's apple)</li>
                      <li>Keep head in normal erect position, facing forward</li>
                      <li>Tape should be snug but not compressing the skin</li>
                      <li>Take measurement at end of normal breath out</li>
                      <li>Round to nearest 0.5 inch or 1 cm</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-purple-900">📏 Waist Circumference</h3>
                    <p className="text-gray-700 mb-3"><strong>For Males:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                      <li>Measure horizontally at the level of the navel</li>
                      <li>Abdomen should be relaxed, not sucked in</li>
                      <li>Do not hold breath during measurement</li>
                      <li>Tape should be level all the way around</li>
                      <li>Take at end of normal breath out</li>
                    </ul>
                    <p className="text-gray-700 mb-3"><strong>For Females:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Measure at the narrowest part of the torso</li>
                      <li>Usually between ribs and hips</li>
                      <li>Keep abdomen relaxed and natural</li>
                      <li>Ensure tape is horizontal and level</li>
                      <li>Take at end of normal breath out</li>
                    </ul>
                  </div>

                  <div className="bg-pink-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-pink-900">📏 Hip Circumference (Females Only)</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Measure around the hips at the largest protrusion of the buttocks</li>
                      <li>Feet should be together</li>
                      <li>Tape should be horizontal and level all around</li>
                      <li>Don't pull tape tight; keep it snug</li>
                      <li>Take measurement while standing</li>
                      <li>Round to nearest 0.5 inch or 1 cm</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mt-6">
                  <p className="text-orange-800 font-semibold mb-2">💡 Pro Tips for Accurate Measurements</p>
                  <ul className="list-disc list-inside space-y-1 text-orange-700 text-sm">
                    <li>Use a flexible, non-stretch measuring tape</li>
                    <li>Have another person take measurements when possible</li>
                    <li>Take measurements at the same time of day for consistency</li>
                    <li>Avoid measuring immediately after eating or exercising</li>
                    <li>Repeat each measurement 2-3 times and use the average</li>
                    <li>Record measurements for tracking progress over time</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Body Fat Categories */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Body Fat Percentage Categories and Health Implications</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Understanding where your body fat percentage falls within established categories helps you assess your current fitness level and set appropriate goals. For a comprehensive view of your overall health, also try our{' '}
                  <a href="/body-fat-percentage-calculator" className="text-blue-600 hover:text-blue-800 underline">
                    Body Fat Percentage Calculator
                  </a>
                  {' '}for additional calculation methods.
                </p>

                <div className="space-y-4">
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                    <h3 className="text-xl font-semibold mb-2 text-yellow-900">Essential Fat (2-5% Male, 10-13% Female)</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Description:</strong> Minimum fat necessary for basic physiological functions, including protecting organs, storing vitamins, and hormone regulation.
                    </p>
                    <p className="text-yellow-700 text-sm">
                      <strong>⚠️ Warning:</strong> This level is generally too low for sustained health and is typical only of elite endurance athletes during competition. Not recommended as a target.
                    </p>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <h3 className="text-xl font-semibold mb-2 text-green-900">Athletic (6-13% Male, 14-20% Female)</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Description:</strong> Typical range for athletes and highly active individuals. Optimal for sports performance and aesthetic goals.
                    </p>
                    <p className="text-green-700 text-sm">
                      <strong>✅ Benefits:</strong> Enhanced athletic performance, visible muscle definition, optimal strength-to-weight ratio, reduced injury risk.
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <h3 className="text-xl font-semibold mb-2 text-blue-900">Fitness (14-17% Male, 21-24% Female)</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Description:</strong> Fit and healthy range that's sustainable long-term. Ideal for most military personnel and fitness enthusiasts.
                    </p>
                    <p className="text-blue-700 text-sm">
                      <strong>✅ Benefits:</strong> Good health markers, solid fitness level, easier to maintain than athletic levels, generally meeting all military standards.
                    </p>
                  </div>

                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                    <h3 className="text-xl font-semibold mb-2 text-orange-900">Average (18-24% Male, 25-31% Female)</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Description:</strong> Acceptable range for general population. May approach or exceed military standards, especially in older age groups.
                    </p>
                    <p className="text-orange-700 text-sm">
                      <strong>⚠️ Caution:</strong> Higher risk of failing military body composition assessments. Consider lifestyle modifications to reach fitness range.
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <h3 className="text-xl font-semibold mb-2 text-red-900">Obese (25%+ Male, 32%+ Female)</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Description:</strong> Exceeds healthy ranges and all military standards. Associated with significant health risks.
                    </p>
                    <p className="text-red-700 text-sm">
                      <strong>⚠️ Health Risks:</strong> Increased risk of cardiovascular disease, diabetes, joint problems, sleep apnea, and reduced operational readiness. Immediate lifestyle changes recommended.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Improvement Strategies */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Strategies to Improve Body Composition for Military Standards</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  If you need to reduce body fat to meet military standards, a comprehensive approach addressing both exercise and nutrition is most effective. For detailed calorie tracking, use our{' '}
                  <a href="/calorie-calculator" className="text-blue-600 hover:text-blue-800 underline">
                    Calorie Calculator
                  </a>
                  {' '}to determine your daily caloric needs.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-800">💪 Exercise Recommendations</h3>
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold mb-3">Cardiovascular Training</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li><strong>Running:</strong> 3-5 sessions per week, 20-45 minutes. Include interval training for maximum fat burning.</li>
                    <li><strong>Swimming:</strong> Excellent low-impact option, especially for those with joint issues.</li>
                    <li><strong>Cycling:</strong> Alternative cardio that builds leg strength while burning calories.</li>
                    <li><strong>Rowing:</strong> Full-body cardio that prepares for military physical fitness tests.</li>
                  </ul>

                  <h4 className="font-semibold mb-3">Strength Training</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li><strong>Frequency:</strong> 3-4 sessions per week, targeting all major muscle groups</li>
                    <li><strong>Focus:</strong> Compound movements (squats, deadlifts, bench press, pull-ups)</li>
                    <li><strong>Benefit:</strong> Builds lean muscle mass, which increases metabolism and improves body composition ratio</li>
                    <li><strong>Military Prep:</strong> Include exercises from military fitness tests (push-ups, sit-ups, pull-ups)</li>
                  </ul>

                  <h4 className="font-semibold mb-3">High-Intensity Interval Training (HIIT)</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>2-3 sessions per week as part of cardio training</li>
                    <li>Alternates between intense bursts and recovery periods</li>
                    <li>Highly effective for fat loss while preserving muscle</li>
                    <li>Time-efficient workout option</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-semibold mb-4 text-gray-800">🍎 Nutrition Strategies</h3>
                <div className="bg-green-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold mb-3">Caloric Management</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li>Create moderate caloric deficit: 300-500 calories below maintenance</li>
                    <li>Track food intake using apps or food journals</li>
                    <li>Focus on nutrient-dense, whole foods</li>
                    <li>Avoid extreme calorie restriction (can reduce metabolism and muscle mass)</li>
                  </ul>

                  <h4 className="font-semibold mb-3">Macronutrient Balance</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li><strong>Protein:</strong> 1.0-1.2g per pound of body weight to preserve muscle during fat loss</li>
                    <li><strong>Carbohydrates:</strong> Focus on complex carbs (whole grains, vegetables) for sustained energy</li>
                    <li><strong>Fats:</strong> Include healthy fats (avocado, nuts, olive oil) for hormone function</li>
                  </ul>

                  <h4 className="font-semibold mb-3">Practical Nutrition Tips</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Meal prep to avoid unhealthy convenience food choices</li>
                    <li>Stay hydrated (8-10 glasses of water daily minimum)</li>
                    <li>Limit alcohol consumption (empty calories and impairs recovery)</li>
                    <li>Reduce processed foods, added sugars, and sodium</li>
                    <li>Time larger meals around training sessions for energy and recovery</li>
                    <li>Consider consulting a registered dietitian for personalized plans</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-semibold mb-4 text-gray-800">⏱️ Realistic Timelines</h3>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    <strong>Safe Body Fat Reduction Rate:</strong> Aim for 1-2% reduction per month through combined diet and exercise.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Short-term (1-3 months):</strong> Expect 2-6% body fat reduction with consistent effort</li>
                    <li><strong>Medium-term (3-6 months):</strong> Can achieve 6-12% reduction, reaching most military standards</li>
                    <li><strong>Long-term (6-12 months):</strong> Sustainable transformation to athletic or fitness levels</li>
                  </ul>
                  <p className="text-purple-700 mt-4 text-sm">
                    <strong>Note:</strong> Rapid weight loss is often unsustainable and can lead to muscle loss, metabolic slowdown, and rebound weight gain. Focus on gradual, consistent progress.
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
                  <p className="text-yellow-800 font-semibold mb-2">💡 Success Factors</p>
                  <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm">
                    <li><strong>Consistency:</strong> Regular, sustained effort trumps occasional intense effort</li>
                    <li><strong>Sleep:</strong> 7-9 hours nightly for recovery and hormone regulation</li>
                    <li><strong>Stress Management:</strong> High cortisol can impair fat loss</li>
                    <li><strong>Accountability:</strong> Track progress with regular measurements and photos</li>
                    <li><strong>Support System:</strong> Work with teammates, trainers, or nutritionists</li>
                    <li><strong>Patience:</strong> Body recomposition takes time; trust the process</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Army vs BMI */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Army Body Fat Method vs BMI: Which is Better?</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  The Army body fat calculation method and Body Mass Index (BMI) serve different purposes and have distinct advantages and limitations:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-blue-900">🎖️ Army Body Fat Method</h3>
                    <p className="text-sm font-semibold mb-3 text-gray-800">Advantages:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm mb-4">
                      <li>Estimates actual body fat percentage</li>
                      <li>More accurate for muscular individuals</li>
                      <li>Accounts for body composition differences</li>
                      <li>Field-applicable with minimal equipment</li>
                      <li>Validated for military populations</li>
                      <li>Provides actionable measurements for improvement</li>
                    </ul>
                    <p className="text-sm font-semibold mb-3 text-gray-800">Limitations:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                      <li>Requires proper measurement technique</li>
                      <li>±3-4% margin of error</li>
                      <li>More time-consuming than BMI</li>
                      <li>Can vary with measurer skill level</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-purple-900">📊 BMI Method</h3>
                    <p className="text-sm font-semibold mb-3 text-gray-800">Advantages:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm mb-4">
                      <li>Extremely simple calculation</li>
                      <li>Only requires height and weight</li>
                      <li>Quick screening tool</li>
                      <li>Useful for population studies</li>
                      <li>Widely recognized standard</li>
                    </ul>
                    <p className="text-sm font-semibold mb-3 text-gray-800">Limitations:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                      <li>Doesn't distinguish muscle from fat</li>
                      <li>Can misclassify athletic individuals</li>
                      <li>Doesn't account for body composition</li>
                      <li>Not suitable for military assessment</li>
                      <li>Ignores fat distribution patterns</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-green-900">✅ Why Military Uses Body Fat Method</h3>
                  <p className="text-gray-700 mb-4">
                    The military chose the circumference-based body fat method over BMI for several important reasons:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Operational Relevance:</strong> Physical fitness and body composition directly impact combat readiness and mission success</li>
                    <li><strong>Muscle Mass Consideration:</strong> Military training builds significant muscle mass, which increases weight but improves fitness. BMI would penalize this.</li>
                    <li><strong>Performance Correlation:</strong> Lower body fat percentages generally correlate with better physical performance in military tasks</li>
                    <li><strong>Health Indicators:</strong> Body fat percentage is a better predictor of health risks than BMI for active populations</li>
                    <li><strong>Fairness:</strong> The method accounts for individual body composition differences while maintaining objective standards</li>
                    <li><strong>Field Practicality:</strong> Can be performed anywhere with basic equipment, unlike more accurate but complex methods (DEXA, hydrostatic weighing)</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mt-6">
                  <p className="text-orange-800 font-semibold mb-2">📊 Comparison Example</p>
                  <p className="text-orange-700 text-sm">
                    A muscular soldier weighing 200 lbs at 5'10" would have a BMI of 28.7 (classified as "overweight"), but might have only 15% body fat (well within "athletic" range). The BMI would incorrectly suggest a fitness problem, while the body fat measurement accurately reflects excellent physical condition. This is why the military specifically uses body fat calculations for fitness assessments.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Calculators Section */}
            <section className="py-12 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Health & Fitness Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <a 
                  href="/bmi-calculator" 
                  className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="font-semibold text-gray-900">BMI Calculator</h3>
                  <p className="text-sm text-gray-600 mt-1">Calculate your Body Mass Index and weight category</p>
                </a>
                
                <a 
                  href="/body-fat-percentage-calculator" 
                  className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-2">📏</div>
                  <h3 className="font-semibold text-gray-900">Body Fat Percentage Calculator</h3>
                  <p className="text-sm text-gray-600 mt-1">Calculate body fat using multiple methods</p>
                </a>
                
                <a 
                  href="/calorie-calculator" 
                  className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-2">🔥</div>
                  <h3 className="font-semibold text-gray-900">Calorie Calculator</h3>
                  <p className="text-sm text-gray-600 mt-1">Determine your daily caloric needs for weight goals</p>
                </a>
                
                <a 
                  href="/tdee-calculator" 
                  className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-semibold text-gray-900">TDEE Calculator</h3>
                  <p className="text-sm text-gray-600 mt-1">Calculate Total Daily Energy Expenditure</p>
                </a>
                
                <a 
                  href="/ideal-weight-calculator" 
                  className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="font-semibold text-gray-900">Ideal Weight Calculator</h3>
                  <p className="text-sm text-gray-600 mt-1">Find your ideal body weight range</p>
                </a>
                
                <a 
                  href="/lean-body-mass-calculator" 
                  className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-2">💪</div>
                  <h3 className="font-semibold text-gray-900">Lean Body Mass Calculator</h3>
                  <p className="text-sm text-gray-600 mt-1">Calculate your muscle mass and lean tissue</p>
                </a>
                
                <a 
                  href="/protein-calculator" 
                  className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-2">🍗</div>
                  <h3 className="font-semibold text-gray-900">Protein Calculator</h3>
                  <p className="text-sm text-gray-600 mt-1">Determine your daily protein requirements</p>
                </a>
                
                <a 
                  href="/macro-calculator" 
                  className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-2">🥗</div>
                  <h3 className="font-semibold text-gray-900">Macro Calculator</h3>
                  <p className="text-sm text-gray-600 mt-1">Calculate optimal macronutrient ratios</p>
                </a>
              </div>
            </section>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
