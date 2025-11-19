import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getCategoryUrl, getStepUrl } from '@/config/site';
import VO2MaxCalculator from '@/components/Calculator/VO2MaxCalculator';
import Link from 'next/link';
import { Activity, TrendingUp, Award, Heart, Zap, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'VO2 Max Calculator (Free, No signup) - Fitness Level | AICalculator',
  description: 'Free VO2 Max calculator with no sign-up required. Supports Cooper test, 1.5 mile run, Rockport walk test, and Harvard step test. Get personalized fitness recommendations and training plans based on your cardiovascular capacity.',
  keywords: [
    'vo2 max calculator',
    'free vo2 max calculator',
    'vo2 max calculator no signup',
    'vo2max calculator',
    'cardiovascular fitness test',
    'aerobic capacity calculator',
    'cooper test calculator',
    '1.5 mile run test',
    'rockport walk test',
    'harvard step test',
    'cardio fitness calculator',
    'endurance fitness test',
    'maximal oxygen uptake',
    'fitness level assessment',
    'vo2max test methods',
    'running fitness calculator',
    'aerobic fitness calculator',
  ],
  authors: [{ name: 'AICalculator.pro' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(getUrl('/')),
  alternates: {
    canonical: getUrl('/vo2-max-calculator'),
  },
  openGraph: {
    title: 'VO2 Max Calculator (Free, No signup) - AICalculator',
    description: 'Free VO2 Max calculator with no sign-up required. Calculate your VO2 Max with multiple test methods. Get personalized fitness level assessment, athlete comparisons, and training recommendations. Instant results.',
    url: getUrl('/vo2-max-calculator'),
    siteName: 'AICalculator.pro',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: getOgImage('vo2-max'),
        width: 1200,
        height: 630,
        alt: 'VO2 Max Calculator - Cardiovascular Fitness Assessment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VO2 Max Calculator (Free, No signup) - AICalculator',
    description: 'Free VO2 Max calculator with no sign-up required. Calculate your VO2 Max using Cooper test, 1.5 mile run, Rockport walk, or Harvard step test. Get instant fitness assessment and training plans.',
    images: [getOgImage('vo2-max')],
    creator: '@AICalculatorPro',
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

export default function VO2MaxCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/vo2-max-calculator'),
        name: 'VO2 Max Calculator',
        url: getUrl('/vo2-max-calculator'),
        description: 'Free online VO2 Max calculator supporting multiple test methods: Cooper 12-minute test, 1.5 mile run, Rockport walk test, and Harvard step test. Get instant cardiovascular fitness assessment with personalized recommendations.',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Multiple test methods (Cooper, 1.5 mile, Rockport, Harvard step)',
          'Instant VO2 Max calculation',
          'Age and gender-adjusted fitness standards',
          'Athlete comparison analysis',
          'Personalized training recommendations',
          'Cardiovascular health risk assessment',
          'Export results as image',
          'Share results via URL',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/vo2-max-calculator'),
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
            item: getCategoryUrl('health'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'VO2 Max Calculator',
            item: getUrl('/vo2-max-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/vo2-max-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is VO2 Max and why is it important?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'VO2 Max (maximal oxygen uptake) is the maximum amount of oxygen your body can utilize during intense exercise, measured in ml/kg/min. It is considered the gold standard for measuring cardiovascular fitness and aerobic endurance. A higher VO2 Max indicates better cardiovascular health, improved athletic performance, and lower risk of heart disease. Research shows that VO2 Max is one of the strongest predictors of longevity and overall health, making it an essential metric for athletes, fitness enthusiasts, and anyone concerned with their cardiovascular health.',
            },
          },
          {
            '@type': 'Question',
            name: 'How accurate is the VO2 Max calculator compared to lab testing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Online VO2 Max calculators provide estimates based on field tests, while lab testing offers the most accurate measurement. Lab tests using metabolic carts and graded exercise protocols can achieve ±2-3% accuracy. Field tests like Cooper, 1.5 mile run, and Rockport walk typically have ±10-15% accuracy when performed correctly. For most people, these field test estimates are sufficient for tracking fitness progress and setting training goals. Athletes seeking precise measurements for competition should consider laboratory testing.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which VO2 Max test method should I choose?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Choose your test based on fitness level and preference: Cooper 12-minute test (best for runners, high fitness); 1.5 mile run test (balanced for most fitness levels); Rockport 1-mile walk test (ideal for beginners, older adults, or those with joint issues); Harvard step test (convenient indoor option, requires step platform). The Cooper and 1.5 mile tests generally provide the most accurate estimates for active individuals, while the Rockport walk is excellent for those new to fitness testing or with mobility considerations.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a good VO2 Max score for my age and gender?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'VO2 Max standards vary significantly by age and gender. For example, men aged 20-29: Poor (<42), Fair (42-46), Good (47-51), Excellent (52-56), Superior (>56); Women aged 20-29: Poor (<34), Fair (34-37), Good (38-42), Excellent (43-48), Superior (>49). Values decrease with age naturally. Elite endurance athletes often achieve 70-85 ml/kg/min, while sedentary individuals may score below 30. Our calculator provides age and gender-specific percentile rankings to show how you compare to your demographic.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can I improve my VO2 Max?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Improving VO2 Max requires consistent aerobic training. Most effective methods include: High-Intensity Interval Training (HIIT) 1-2 times per week, long slow distance runs (30-60 minutes) 2-3 times weekly, tempo runs at 80-85% max heart rate, and cross-training (cycling, swimming). Beginners can expect 10-15% improvement in 3-6 months, while trained athletes may see 3-5% gains. Improvements require progressive overload, adequate recovery, proper nutrition, and consistency. Our calculator provides personalized training plans based on your current fitness level.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/vo2-max-calculator'),
        name: 'How to Calculate Your VO2 Max',
        description: 'Step-by-step guide to calculating your VO2 Max using field tests',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Your Test Method',
            text: 'Choose from Cooper 12-minute run, 1.5 mile run, Rockport 1-mile walk, or Harvard step test based on your fitness level and preference.',
            url: getStepUrl('/vo2-max-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Personal Information',
            text: 'Input your age, gender, and weight. These factors are essential for accurate VO2 Max calculation as standards vary by demographics.',
            url: getStepUrl('/vo2-max-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Perform the Test',
            text: 'Complete your chosen test: run 12 minutes (Cooper), run 1.5 miles (mile test), walk 1 mile (Rockport), or perform 5-minute step test (Harvard). Record your performance data.',
            url: getStepUrl('/vo2-max-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Input Test Results',
            text: 'Enter your test-specific data: distance covered, time taken, or recovery heart rate depending on the test method.',
            url: getStepUrl('/vo2-max-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'View Results and Recommendations',
            text: 'Review your VO2 Max score, fitness level classification, percentile ranking, athlete comparison, health risk assessment, and personalized training recommendations.',
            url: getStepUrl('/vo2-max-calculator', 5),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/vo2-max-calculator'),
        headline: 'VO2 Max Calculator - Complete Guide to Cardiovascular Fitness Testing',
        description: 'Comprehensive guide to VO2 Max testing, calculation methods, fitness standards, and training strategies for improving aerobic capacity.',
        image: getOgImage('vo2-max'),
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="VO2 Max Calculator (Free, No signup)"
        calculatorUrl="/vo2-max-calculator"
      />
        </div>
      </div>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">VO2 Max Calculator - Free Online Cardiovascular Fitness Test</h1>

      {/* Calculator Component */}
      <VO2MaxCalculator />

      {/* Educational Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-12">
          
          {/* What is VO2 Max */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Activity className="h-8 w-8 text-blue-600" />
              What is VO2 Max?
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="text-lg leading-relaxed">
                <strong>VO2 Max</strong> (maximal oxygen uptake) is the maximum amount of oxygen your body can utilize during intense exercise. Measured in milliliters per kilogram per minute (ml/kg/min), it represents your cardiovascular system's capacity to deliver oxygen to working muscles and your muscles' ability to use that oxygen for energy production.
              </p>
              <p className="leading-relaxed">
                VO2 Max is widely considered the <strong>gold standard measurement of cardiovascular fitness</strong> and aerobic endurance. Elite endurance athletes (marathon runners, Tour de France cyclists) typically have VO2 Max values of 70-85 ml/kg/min, while sedentary individuals may score below 30 ml/kg/min.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  Why VO2 Max Matters
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>• Longevity Predictor:</strong> Research shows VO2 Max is one of the strongest predictors of mortality risk</li>
                  <li><strong>• Cardiovascular Health:</strong> Higher VO2 Max correlates with lower risk of heart disease, stroke, and metabolic disorders</li>
                  <li><strong>• Athletic Performance:</strong> Determines endurance capacity and performance ceiling for aerobic sports</li>
                  <li><strong>• Fitness Progress:</strong> Objective metric to track cardiovascular fitness improvements over time</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Test Methods Comparison */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">VO2 Max Test Methods</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🏃 Cooper 12-Minute Test</h3>
                <p className="text-gray-700 mb-3">Run as far as possible in 12 minutes on a flat surface. Most accurate field test for runners.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><strong>Best for:</strong> Regular runners, high fitness levels</li>
                  <li><strong>Accuracy:</strong> ±10-12% compared to lab testing</li>
                  <li><strong>Requirements:</strong> Running track or measured route</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">⏱️ 1.5 Mile Run Test</h3>
                <p className="text-gray-700 mb-3">Run 1.5 miles (2.4 km) as fast as possible. Balanced test for most fitness levels.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><strong>Best for:</strong> Most fitness levels, military/police testing</li>
                  <li><strong>Accuracy:</strong> ±10-15% compared to lab testing</li>
                  <li><strong>Requirements:</strong> Track or measured 1.5 mile route</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🚶 Rockport Walk Test</h3>
                <p className="text-gray-700 mb-3">Walk 1 mile as fast as possible, measure heart rate. Ideal for beginners and older adults.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><strong>Best for:</strong> Beginners, older adults, joint issues</li>
                  <li><strong>Accuracy:</strong> ±12-15% compared to lab testing</li>
                  <li><strong>Requirements:</strong> Heart rate monitor recommended</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">📊 Harvard Step Test</h3>
                <p className="text-gray-700 mb-3">Step up/down on 20-inch platform for 5 minutes. Convenient indoor option.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><strong>Best for:</strong> Indoor testing, convenience</li>
                  <li><strong>Accuracy:</strong> ±15-20% compared to lab testing</li>
                  <li><strong>Requirements:</strong> 20-inch step platform</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Fitness Level Standards */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">VO2 Max Fitness Standards</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              VO2 Max values vary significantly by age, gender, and training status. Here are general guidelines from the American Heart Association and Cooper Institute:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Age Range</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Men (ml/kg/min)</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Women (ml/kg/min)</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Classification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">20-29 years</td>
                    <td className="px-6 py-4 text-sm text-gray-700">42-56+</td>
                    <td className="px-6 py-4 text-sm text-gray-700">34-49+</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Fair to Superior</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">30-39 years</td>
                    <td className="px-6 py-4 text-sm text-gray-700">40-53+</td>
                    <td className="px-6 py-4 text-sm text-gray-700">32-45+</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Fair to Superior</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">40-49 years</td>
                    <td className="px-6 py-4 text-sm text-gray-700">37-51+</td>
                    <td className="px-6 py-4 text-sm text-gray-700">30-43+</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Fair to Superior</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">50-59 years</td>
                    <td className="px-6 py-4 text-sm text-gray-700">35-48+</td>
                    <td className="px-6 py-4 text-sm text-gray-700">27-40+</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Fair to Superior</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">60+ years</td>
                    <td className="px-6 py-4 text-sm text-gray-700">31-44+</td>
                    <td className="px-6 py-4 text-sm text-gray-700">25-37+</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Fair to Superior</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">
              Note: Elite endurance athletes typically achieve 70-85+ ml/kg/min. Values naturally decline with age but can be maintained with consistent training.
            </p>
          </section>

          {/* How to Improve VO2 Max */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              How to Improve Your VO2 Max
            </h2>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Improving VO2 Max requires consistent, progressive aerobic training. Research shows that most people can improve their VO2 Max by 10-20% within 3-6 months of structured training.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">🔥 High-Intensity Interval Training (HIIT)</h3>
                  <p className="text-gray-700 text-sm mb-3">Most effective method for VO2 Max improvement</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 4-8 intervals of 3-5 minutes at 90-95% max HR</li>
                    <li>• Recovery periods equal to work intervals</li>
                    <li>• 1-2 sessions per week</li>
                    <li>• Can improve VO2 Max by 5-15% in 8-12 weeks</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">🏃 Long Slow Distance (LSD)</h3>
                  <p className="text-gray-700 text-sm mb-3">Builds aerobic base and capillary density</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 45-90 minutes at 60-75% max HR</li>
                    <li>• Comfortable, conversational pace</li>
                    <li>• 2-3 sessions per week</li>
                    <li>• Improves mitochondrial density and fat metabolism</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">⚡ Tempo Runs</h3>
                  <p className="text-gray-700 text-sm mb-3">Increases lactate threshold and stamina</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 20-40 minutes at 80-85% max HR</li>
                    <li>• "Comfortably hard" sustainable pace</li>
                    <li>• 1 session per week</li>
                    <li>• Teaches body to clear lactate efficiently</li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">🚴 Cross-Training</h3>
                  <p className="text-gray-700 text-sm mb-3">Variety reduces injury risk while maintaining gains</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Cycling, swimming, rowing, elliptical</li>
                    <li>• Similar intensity to running workouts</li>
                    <li>• 1-2 sessions per week</li>
                    <li>• Reduces overuse injuries, maintains motivation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-gray-900 mb-3">Expected Improvement Timeline</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>• Beginners (VO2 Max &lt;35):</strong> 10-15 ml/kg/min improvement possible in 6-12 months</li>
                  <li><strong>• Intermediate (VO2 Max 35-50):</strong> 5-8 ml/kg/min improvement in 4-6 months</li>
                  <li><strong>• Advanced (VO2 Max &gt;50):</strong> 2-4 ml/kg/min improvement in 6-12 months</li>
                  <li><strong>• Elite Athletes:</strong> 1-3 ml/kg/min improvements with optimized training</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is VO2 Max and why is it important?</h3>
                <p className="text-gray-700 leading-relaxed">
                  VO2 Max (maximal oxygen uptake) is the maximum amount of oxygen your body can utilize during intense exercise, measured in ml/kg/min. It's considered the gold standard for measuring cardiovascular fitness and aerobic endurance. A higher VO2 Max indicates better cardiovascular health, improved athletic performance, and lower risk of heart disease. Research shows that VO2 Max is one of the strongest predictors of longevity and overall health, making it an essential metric for athletes, fitness enthusiasts, and anyone concerned with their cardiovascular health.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How accurate is the VO2 Max calculator compared to lab testing?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Online VO2 Max calculators provide estimates based on field tests, while lab testing offers the most accurate measurement. Lab tests using metabolic carts and graded exercise protocols can achieve ±2-3% accuracy. Field tests like Cooper, 1.5 mile run, and Rockport walk typically have ±10-15% accuracy when performed correctly. For most people, these field test estimates are sufficient for tracking fitness progress and setting training goals. Athletes seeking precise measurements for competition should consider laboratory testing.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Which VO2 Max test method should I choose?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Choose your test based on fitness level and preference: Cooper 12-minute test (best for runners, high fitness); 1.5 mile run test (balanced for most fitness levels); Rockport 1-mile walk test (ideal for beginners, older adults, or those with joint issues); Harvard step test (convenient indoor option, requires step platform). The Cooper and 1.5 mile tests generally provide the most accurate estimates for active individuals, while the Rockport walk is excellent for those new to fitness testing or with mobility considerations.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is a good VO2 Max score for my age and gender?</h3>
                <p className="text-gray-700 leading-relaxed">
                  VO2 Max standards vary significantly by age and gender. For example, men aged 20-29: Poor (&lt;42), Fair (42-46), Good (47-51), Excellent (52-56), Superior (&gt;56); Women aged 20-29: Poor (&lt;34), Fair (34-37), Good (38-42), Excellent (43-48), Superior (&gt;49). Values decrease with age naturally. Elite endurance athletes often achieve 70-85 ml/kg/min, while sedentary individuals may score below 30. Our calculator provides age and gender-specific percentile rankings to show how you compare to your demographic.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How can I improve my VO2 Max?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Improving VO2 Max requires consistent aerobic training. Most effective methods include: High-Intensity Interval Training (HIIT) 1-2 times per week, long slow distance runs (30-60 minutes) 2-3 times weekly, tempo runs at 80-85% max heart rate, and cross-training (cycling, swimming). Beginners can expect 10-15% improvement in 3-6 months, while trained athletes may see 3-5% gains. Improvements require progressive overload, adequate recovery, proper nutrition, and consistency. Our calculator provides personalized training plans based on your current fitness level.
                </p>
              </div>
            </div>
          </section>

          {/* Related Calculators */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Health & Fitness Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link 
                href="/target-heart-rate-calculator"
                className="block p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="h-6 w-6 text-red-600" />
                  <h3 className="font-bold text-gray-900">Target Heart Rate Calculator</h3>
                </div>
                <p className="text-sm text-gray-600">Calculate optimal heart rate zones for different training intensities</p>
              </Link>

              <Link 
                href="/bmi-calculator"
                className="block p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="h-6 w-6 text-green-600" />
                  <h3 className="font-bold text-gray-900">BMI Calculator</h3>
                </div>
                <p className="text-sm text-gray-600">Check your Body Mass Index and weight category</p>
              </Link>

              <Link 
                href="/calorie-calculator"
                className="block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="h-6 w-6 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Calorie Calculator</h3>
                </div>
                <p className="text-sm text-gray-600">Calculate daily caloric needs based on activity level</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

