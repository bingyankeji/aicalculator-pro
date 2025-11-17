import { Metadata } from 'next';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getCategoryUrl, getStepUrl } from '@/config/site';
import RunningCalculator from '@/components/Calculator/RunningCalculator';
import Link from 'next/link';
import { Activity, Timer, TrendingUp, Award, Target, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Running Calculator - Pace, Time & Distance Calculator | Free Running Tools',
  description: 'Free running calculator with pace, time, and distance calculations. Get race time predictions, training pace recommendations, split times, and calorie burn estimates. Perfect for 5K, 10K, half marathon, and marathon training.',
  keywords: [
    'running calculator',
    'pace calculator',
    'running pace calculator',
    'marathon pace calculator',
    'running time calculator',
    'race time predictor',
    '5k pace calculator',
    '10k pace calculator',
    'half marathon pace',
    'marathon time calculator',
    'training pace calculator',
    'running speed calculator',
    'km to mile pace',
    'split time calculator',
    'running calorie calculator',
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
    canonical: getUrl('/running-calculator'),
  },
  openGraph: {
    title: 'Running Calculator - Pace, Time & Distance Calculator',
    description: 'Calculate your running pace, predict race times, and get personalized training recommendations. Includes split times, calorie burn, and recovery time estimates.',
    url: getUrl('/running-calculator'),
    siteName: 'AICalculator.pro',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: getOgImage('running'),
        width: 1200,
        height: 630,
        alt: 'Running Calculator - Pace and Race Time Predictions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Running Calculator - Pace, Time & Distance Calculator',
    description: 'Calculate pace, predict race times, and get training recommendations for 5K to marathon distances.',
    images: [getOgImage('running')],
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

export default function RunningCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/running-calculator'),
        name: 'Running Calculator',
        url: getUrl('/running-calculator'),
        description: 'Free comprehensive running calculator with pace calculations, race time predictions, training pace recommendations, split times, and calorie burn estimates for all running distances.',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Pace calculator (min/km and min/mi)',
          'Race time predictions (5K, 10K, half marathon, marathon)',
          'Training pace recommendations',
          'Split time calculator',
          'Calorie burn estimation',
          'Distance and time calculator',
          'Recovery time recommendations',
          'Export results as image',
          'Share results via URL',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/running-calculator'),
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
            name: 'Running Calculator',
            item: getUrl('/running-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/running-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I calculate my running pace?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Running pace is calculated by dividing your total time by distance. The formula is: Pace = Time / Distance. For example, if you run 10 km in 50 minutes, your pace is 50 / 10 = 5 minutes per kilometer (5:00 min/km). Pace can be expressed in minutes per kilometer (min/km) or minutes per mile (min/mi). To convert between units: 1 km pace × 1.60934 = 1 mile pace. Our calculator automatically converts between both units and provides instant results for any distance.',
            },
          },
          {
            '@type': 'Question',
            name: 'How accurate are race time predictions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Race time predictions use the Riegel formula, which is approximately 90-95% accurate for most runners. The formula accounts for the fatigue factor in longer distances. Accuracy depends on your current fitness level, training consistency, race day conditions, and course terrain. Predictions are most accurate when based on a recent race performance at a similar effort level. For best results, use a time from a race completed within the last 4-6 weeks, ensure proper training for the target distance, and adjust for course difficulty and weather conditions.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the different training pace zones?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Training paces are based on Jack Daniels running formula. Easy runs (120% of race pace) build aerobic base and aid recovery. Tempo runs (95% of race pace) improve lactate threshold and stamina. Interval training (85% of race pace) boosts VO2 max and speed. Long runs (115% of race pace) build endurance for marathon distances. Each pace zone targets specific physiological adaptations. Easy runs should feel comfortable and conversational. Tempo runs are comfortably hard and sustainable for 20-40 minutes. Intervals are hard efforts with recovery periods.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many calories do I burn while running?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Calorie burn during running depends on weight, pace, and distance. The calculation uses Metabolic Equivalent of Task (MET) values: running at 8 km/h burns 8.0 MET, 10 km/h burns 9.8 MET, 12 km/h burns 11.0 MET, and faster paces burn 12.3+ MET. Formula: Calories = MET × weight (kg) × time (hours). A 70 kg person running 10 km at 5:00 min/km pace (12 km/h) for 50 minutes burns approximately 572 calories. Actual burn varies with running efficiency, terrain, and fitness level.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long should I rest after a long run?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Recovery time depends on distance and intensity. General guideline: 1 day rest per mile raced or hard run. After a 5K, rest 1-2 days. After a 10K, rest 2-3 days. After a half marathon, rest 5-7 days before hard training. After a marathon, rest 2-3 weeks before intense workouts. Easy runs can resume sooner. Listen to your body - signs you need more rest include persistent fatigue, elevated resting heart rate, decreased performance, and muscle soreness lasting over 48 hours. Adequate recovery prevents injury and allows for training adaptations.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/running-calculator'),
        name: 'How to Use the Running Calculator',
        description: 'Step-by-step guide to calculating pace, time, and distance for your runs',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Calculation Mode',
            text: 'Choose what you want to calculate: Pace (from distance and time), Time (from distance and pace), or Distance (from time and pace).',
            url: getStepUrl('/running-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Distance',
            text: 'Input your running distance in kilometers or miles. For race predictions, use your most recent race distance.',
            url: getStepUrl('/running-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Input Time or Pace',
            text: 'Enter your running time (hours, minutes, seconds) or pace (minutes per km/mile) depending on calculation mode.',
            url: getStepUrl('/running-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Add Optional Details',
            text: 'Optionally enter weight for calorie calculation and age for recovery time estimation.',
            url: getStepUrl('/running-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'View Results',
            text: 'Review your pace, speed, race time predictions, training paces, calorie burn, and split times.',
            url: getStepUrl('/running-calculator', 5),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/running-calculator'),
        headline: 'Running Calculator - Complete Guide to Pace and Performance',
        description: 'Comprehensive guide to calculating running pace, predicting race times, and optimizing training with personalized pace zones.',
        image: getOgImage('running'),
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={getCategoryUrl('health')} className="text-blue-600 hover:text-blue-800 transition-colors">
              Health & Fitness
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">Running Calculator</span>
          </nav>
        </div>
      </div>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Running Calculator - Free Online Pace and Race Time Calculator</h1>

      {/* Calculator Component */}
      <RunningCalculator />

      {/* Educational Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-12">
          
          {/* Understanding Running Pace */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Timer className="h-8 w-8 text-blue-600" />
              Understanding Running Pace
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="text-lg leading-relaxed">
                <strong>Running pace</strong> is the time it takes to cover a specific distance, typically expressed as minutes per kilometer (min/km) or minutes per mile (min/mi). Understanding and managing your pace is fundamental to successful running training and racing.
              </p>
              <p className="leading-relaxed">
                Pace is more intuitive than speed for runners because it directly relates to how you experience effort during a run. A 5:00 min/km pace means you take 5 minutes to complete each kilometer. This measurement helps you plan your runs, maintain consistent effort, and achieve your race goals.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  Key Pace Concepts
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>• Target Pace:</strong> The pace you aim to maintain during a race or workout</li>
                  <li><strong>• Current Pace:</strong> Your actual pace during a run (shown on watches/apps)</li>
                  <li><strong>• Average Pace:</strong> Total time divided by total distance</li>
                  <li><strong>• Split Pace:</strong> Pace for each segment (e.g., per kilometer or mile)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Race Time Predictions */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Race Time Predictions</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our calculator uses the <strong>Riegel formula</strong>, a widely-accepted method for predicting race times based on a recent performance. The formula accounts for the fatigue factor that increases with distance.
            </p>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">📊 How Race Predictions Work</h3>
              <p className="text-gray-700 mb-4">
                The Riegel formula: <strong>T2 = T1 × (D2 / D1)^1.06</strong>
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• T2 = Predicted time for target distance</li>
                <li>• T1 = Your known time</li>
                <li>• D2 = Target distance</li>
                <li>• D1 = Known distance</li>
                <li>• 1.06 = Fatigue factor</li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Distance</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Beginner</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Intermediate</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Advanced</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Elite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">5K</td>
                    <td className="px-6 py-4 text-sm text-gray-700">30-40 min</td>
                    <td className="px-6 py-4 text-sm text-gray-700">22-30 min</td>
                    <td className="px-6 py-4 text-sm text-gray-700">18-22 min</td>
                    <td className="px-6 py-4 text-sm text-gray-700">&lt;15 min</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">10K</td>
                    <td className="px-6 py-4 text-sm text-gray-700">60-80 min</td>
                    <td className="px-6 py-4 text-sm text-gray-700">45-60 min</td>
                    <td className="px-6 py-4 text-sm text-gray-700">37-45 min</td>
                    <td className="px-6 py-4 text-sm text-gray-700">&lt;30 min</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Half Marathon</td>
                    <td className="px-6 py-4 text-sm text-gray-700">2:15-3:00</td>
                    <td className="px-6 py-4 text-sm text-gray-700">1:45-2:15</td>
                    <td className="px-6 py-4 text-sm text-gray-700">1:20-1:45</td>
                    <td className="px-6 py-4 text-sm text-gray-700">&lt;1:05</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Marathon</td>
                    <td className="px-6 py-4 text-sm text-gray-700">4:30-6:00</td>
                    <td className="px-6 py-4 text-sm text-gray-700">3:30-4:30</td>
                    <td className="px-6 py-4 text-sm text-gray-700">2:50-3:30</td>
                    <td className="px-6 py-4 text-sm text-gray-700">&lt;2:20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Training Paces */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Target className="h-8 w-8 text-green-600" />
              Training Pace Zones
            </h2>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Different training paces target specific physiological adaptations. Following the <strong>Jack Daniels' Running Formula</strong>, here are the key training zones:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">🟢 Easy Pace (120% of race pace)</h3>
                  <p className="text-gray-700 text-sm mb-3"><strong>Purpose:</strong> Builds aerobic base, promotes recovery</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 65-75% max heart rate</li>
                    <li>• Conversational pace</li>
                    <li>• 70-80% of weekly mileage</li>
                    <li>• Essential for endurance development</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">🟡 Tempo Pace (95% of race pace)</h3>
                  <p className="text-gray-700 text-sm mb-3"><strong>Purpose:</strong> Improves lactate threshold</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 80-85% max heart rate</li>
                    <li>• Comfortably hard effort</li>
                    <li>• Sustainable for 20-40 minutes</li>
                    <li>• Once per week maximum</li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">🟠 Interval Pace (85% of race pace)</h3>
                  <p className="text-gray-700 text-sm mb-3"><strong>Purpose:</strong> Boosts VO2 max and speed</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 90-95% max heart rate</li>
                    <li>• Hard efforts with recovery</li>
                    <li>• 3-5 minute intervals typical</li>
                    <li>• Equal recovery between intervals</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">🔵 Long Run Pace (115% of race pace)</h3>
                  <p className="text-gray-700 text-sm mb-3"><strong>Purpose:</strong> Builds endurance and mental toughness</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 70-75% max heart rate</li>
                    <li>• Slightly slower than easy pace</li>
                    <li>• Duration: 90-180 minutes</li>
                    <li>• Mimics race day fatigue</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How do I calculate my running pace?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Running pace is calculated by dividing your total time by distance. The formula is: Pace = Time / Distance. For example, if you run 10 km in 50 minutes, your pace is 50 / 10 = 5 minutes per kilometer (5:00 min/km). Pace can be expressed in minutes per kilometer (min/km) or minutes per mile (min/mi). To convert between units: 1 km pace × 1.60934 = 1 mile pace. Our calculator automatically converts between both units and provides instant results for any distance.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How accurate are race time predictions?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Race time predictions use the Riegel formula, which is approximately 90-95% accurate for most runners. The formula accounts for the fatigue factor in longer distances. Accuracy depends on your current fitness level, training consistency, race day conditions, and course terrain. Predictions are most accurate when based on a recent race performance at a similar effort level. For best results, use a time from a race completed within the last 4-6 weeks, ensure proper training for the target distance, and adjust for course difficulty and weather conditions.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What are the different training pace zones?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Training paces are based on Jack Daniels running formula. Easy runs (120% of race pace) build aerobic base and aid recovery. Tempo runs (95% of race pace) improve lactate threshold and stamina. Interval training (85% of race pace) boosts VO2 max and speed. Long runs (115% of race pace) build endurance for marathon distances. Each pace zone targets specific physiological adaptations. Easy runs should feel comfortable and conversational. Tempo runs are comfortably hard and sustainable for 20-40 minutes. Intervals are hard efforts with recovery periods.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How many calories do I burn while running?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Calorie burn during running depends on weight, pace, and distance. The calculation uses Metabolic Equivalent of Task (MET) values: running at 8 km/h burns 8.0 MET, 10 km/h burns 9.8 MET, 12 km/h burns 11.0 MET, and faster paces burn 12.3+ MET. Formula: Calories = MET × weight (kg) × time (hours). A 70 kg person running 10 km at 5:00 min/km pace (12 km/h) for 50 minutes burns approximately 572 calories. Actual burn varies with running efficiency, terrain, and fitness level.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How long should I rest after a long run?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Recovery time depends on distance and intensity. General guideline: 1 day rest per mile raced or hard run. After a 5K, rest 1-2 days. After a 10K, rest 2-3 days. After a half marathon, rest 5-7 days before hard training. After a marathon, rest 2-3 weeks before intense workouts. Easy runs can resume sooner. Listen to your body - signs you need more rest include persistent fatigue, elevated resting heart rate, decreased performance, and muscle soreness lasting over 48 hours. Adequate recovery prevents injury and allows for training adaptations.
                </p>
              </div>
            </div>
          </section>

          {/* External Resources */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">External Resources & Further Reading</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              For more information about running training, pace calculation, and performance improvement, explore these trusted resources:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://www.runnersworld.com/training/a20801301/run-your-best/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">Runner's World - Training Guides</h3>
                <p className="text-sm text-gray-600 mb-2">Comprehensive training plans, pace guides, and running tips from the world's leading running magazine.</p>
                <span className="text-xs text-blue-600">runnersworld.com →</span>
              </a>

              <a 
                href="https://www.acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">American College of Sports Medicine</h3>
                <p className="text-sm text-gray-600 mb-2">Evidence-based guidelines for physical activity and exercise training from leading sports medicine professionals.</p>
                <span className="text-xs text-green-600">acsm.org →</span>
              </a>

              <a 
                href="https://www.heart.org/en/healthy-living/fitness/fitness-basics/aha-recs-for-physical-activity-in-adults"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg border border-red-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">American Heart Association - Fitness Basics</h3>
                <p className="text-sm text-gray-600 mb-2">Physical activity recommendations and cardiovascular health guidelines for runners and athletes.</p>
                <span className="text-xs text-red-600">heart.org →</span>
              </a>

              <a 
                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6627787/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">NIH - Running Performance Research</h3>
                <p className="text-sm text-gray-600 mb-2">Scientific research on running biomechanics, training adaptations, and performance optimization.</p>
                <span className="text-xs text-purple-600">ncbi.nlm.nih.gov →</span>
              </a>
            </div>
          </section>

          {/* Related Calculators */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Health & Fitness Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link 
                href="/vo2-max-calculator"
                className="block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="h-6 w-6 text-blue-600" />
                  <h3 className="font-bold text-gray-900">VO2 Max Calculator</h3>
                </div>
                <p className="text-sm text-gray-600">Measure your cardiovascular fitness and aerobic capacity</p>
              </Link>

              <Link 
                href="/target-heart-rate-calculator"
                className="block p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Timer className="h-6 w-6 text-red-600" />
                  <h3 className="font-bold text-gray-900">Heart Rate Calculator</h3>
                </div>
                <p className="text-sm text-gray-600">Calculate target heart rate zones for optimal training</p>
              </Link>

              <Link 
                href="/calorie-calculator"
                className="block p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-6 w-6 text-green-600" />
                  <h3 className="font-bold text-gray-900">Calorie Calculator</h3>
                </div>
                <p className="text-sm text-gray-600">Calculate daily caloric needs and burn rates</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

