import type { Metadata } from 'next';
import SleepCalculator from '@/components/Calculator/SleepCalculator';
import Link from 'next/link';
import { Clock, Moon, Sun, Zap, Brain, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sleep Calculator - Calculate Optimal Bedtime & Wake Times | Free Sleep Cycle Tool',
  description: 'Free sleep calculator helps you determine the best bedtime or wake time based on 90-minute sleep cycles. Calculate optimal sleep schedule, improve sleep quality, and wake up refreshed with personalized recommendations by age.',
  keywords: [
    'sleep calculator',
    'sleep cycle calculator',
    'bedtime calculator',
    'wake time calculator',
    'sleep schedule',
    'optimal sleep time',
    '90 minute sleep cycle',
    'sleep quality',
    'sleep duration',
    'when should I sleep',
    'when should I wake up',
    'sleep recommendation',
    'sleep by age',
    'REM sleep calculator',
    'sleep timer',
    'sleep planner',
    'best time to sleep',
    'best time to wake up',
    'sleep cycle tracker'
  ],
  openGraph: {
    title: 'Sleep Calculator - Calculate Optimal Bedtime & Wake Times',
    description: 'Calculate the best bedtime or wake time based on 90-minute sleep cycles. Get personalized sleep recommendations and improve your sleep quality.',
    type: 'website',
    url: '/sleep-calculator',
  },
  alternates: {
    canonical: '/sleep-calculator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Sleep Calculator',
      description: 'Calculate optimal bedtime and wake times based on 90-minute sleep cycles',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Bedtime calculation based on wake time',
        'Wake time calculation based on bedtime',
        '90-minute sleep cycle optimization',
        'Age-based sleep recommendations',
        'Sleep quality assessment',
        'Personalized sleep tips',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: '/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Sleep Calculator',
          item: '/sleep-calculator',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the sleep calculator work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The sleep calculator uses 90-minute sleep cycles to determine optimal bedtimes and wake times. Sleep occurs in cycles of approximately 90 minutes, and waking up between cycles (rather than during one) helps you feel more refreshed and alert.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many hours of sleep do I need?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sleep needs vary by age: Adults (18-64) need 7-9 hours, teens (14-17) need 8-10 hours, school-age children (6-13) need 9-11 hours, and older adults (65+) need 7-8 hours. Our calculator provides personalized recommendations based on your age.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a sleep cycle?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A sleep cycle is approximately 90 minutes long and consists of different stages including light sleep, deep sleep, and REM (Rapid Eye Movement) sleep. A complete night\'s sleep typically includes 4-6 complete cycles.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do I feel groggy when I wake up?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Waking up during a sleep cycle (especially during deep sleep) can cause grogginess. Using this calculator to time your wake-up between sleep cycles can help you feel more refreshed and alert.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to fall asleep?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The average person takes about 15 minutes to fall asleep, which is already factored into the bedtime calculations in this sleep calculator.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to Use the Sleep Calculator',
      description: 'Step-by-step guide to calculate optimal sleep times',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Choose Calculation Type',
          text: 'Select whether you want to calculate your bedtime (based on wake time) or wake time (based on bedtime).',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Enter Time',
          text: 'Enter the time you want to wake up or go to bed using the time picker.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Enter Your Age',
          text: 'Input your age to get personalized sleep duration recommendations.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Calculate',
          text: 'Click "Calculate Sleep Times" to see optimal sleep schedules based on 90-minute cycles.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Review Results',
          text: 'Review the suggested times with quality ratings. Green-highlighted times are optimal for your age group.',
        },
      ],
    },
    {
      '@type': 'Article',
      headline: 'Understanding Sleep Cycles and Optimal Sleep Duration',
      description: 'Learn how to improve your sleep quality using sleep cycle science',
      author: {
        '@type': 'Organization',
        name: 'Online Calculator',
      },
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
    },
  ],
};

export default function SleepCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        Sleep Calculator - Calculate Optimal Bedtime and Wake Times Based on Sleep Cycles
      </h1>

      {/* Breadcrumb Navigation */}
      <nav className="max-w-5xl mx-auto px-4 py-3 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-gray-600">
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Sleep Calculator</span>
          </li>
        </ol>
      </nav>

      <SleepCalculator />

      {/* Educational Content */}
      <article className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* About Sleep Cycles */}
        <section className="prose prose-blue max-w-none">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Moon className="h-8 w-8 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">
                What is a Sleep Cycle?
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sleep is not a uniform state but rather occurs in cycles of approximately <strong>90 minutes</strong> each. 
              During each cycle, you progress through different stages: light sleep, deep sleep, and REM (Rapid Eye Movement) sleep. 
              A typical night includes <strong>4-6 complete sleep cycles</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Waking up naturally between cycles (rather than during deep sleep) can help you feel more <strong>refreshed and alert</strong>. 
              This sleep calculator helps you time your bedtime or wake time to align with these natural cycles.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section className="prose prose-blue max-w-none">
          <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-8 w-8 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">
                How to Use the Sleep Calculator
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Sun className="h-5 w-5 text-orange-500" />
                  Calculate Bedtime
                </h3>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li><strong>1.</strong> Select "Bedtime" calculation mode</li>
                  <li><strong>2.</strong> Enter the time you need to wake up</li>
                  <li><strong>3.</strong> Enter your age for personalized recommendations</li>
                  <li><strong>4.</strong> Click "Calculate Sleep Times"</li>
                  <li><strong>5.</strong> Choose from the optimal bedtimes shown</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Moon className="h-5 w-5 text-indigo-500" />
                  Calculate Wake Time
                </h3>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li><strong>1.</strong> Select "Wake Time" calculation mode</li>
                  <li><strong>2.</strong> Enter the time you plan to go to bed</li>
                  <li><strong>3.</strong> Enter your age for personalized recommendations</li>
                  <li><strong>4.</strong> Click "Calculate Sleep Times"</li>
                  <li><strong>5.</strong> Set your alarm to one of the optimal wake times</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Sleep Duration by Age */}
        <section className="prose prose-blue max-w-none">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-8 w-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">
                Recommended Sleep Duration by Age
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Age Group</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Recommended Hours</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-purple-100">
                    <td className="py-3 px-4">Infants (0-1 year)</td>
                    <td className="py-3 px-4 font-medium">12-17 hours</td>
                  </tr>
                  <tr className="border-b border-purple-100">
                    <td className="py-3 px-4">Toddlers (1-2 years)</td>
                    <td className="py-3 px-4 font-medium">11-14 hours</td>
                  </tr>
                  <tr className="border-b border-purple-100">
                    <td className="py-3 px-4">Preschoolers (3-5 years)</td>
                    <td className="py-3 px-4 font-medium">10-13 hours</td>
                  </tr>
                  <tr className="border-b border-purple-100">
                    <td className="py-3 px-4">School-age (6-13 years)</td>
                    <td className="py-3 px-4 font-medium">9-11 hours</td>
                  </tr>
                  <tr className="border-b border-purple-100">
                    <td className="py-3 px-4">Teenagers (14-17 years)</td>
                    <td className="py-3 px-4 font-medium">8-10 hours</td>
                  </tr>
                  <tr className="border-b border-purple-100">
                    <td className="py-3 px-4">Adults (18-64 years)</td>
                    <td className="py-3 px-4 font-medium">7-9 hours</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Older Adults (65+ years)</td>
                    <td className="py-3 px-4 font-medium">7-8 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-600 mt-4 italic">
              * Based on recommendations from the National Sleep Foundation
            </p>
          </div>
        </section>

        {/* Sleep Tips */}
        <section className="prose prose-blue max-w-none">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-amber-600" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">
                Tips for Better Sleep Quality
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sleep Environment</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>🌡️ Keep your bedroom cool (60-67°F / 15-19°C)</li>
                  <li>🌑 Make your room as dark as possible</li>
                  <li>🔇 Minimize noise or use white noise</li>
                  <li>🛏️ Invest in a comfortable mattress and pillows</li>
                  <li>📱 Remove electronic devices from the bedroom</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sleep Habits</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>⏰ Maintain a consistent sleep schedule</li>
                  <li>☕ Avoid caffeine after 2 PM</li>
                  <li>🍷 Limit alcohol consumption before bed</li>
                  <li>🏃 Exercise regularly, but not close to bedtime</li>
                  <li>📵 Avoid screens 1 hour before bed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sleep Stages */}
        <section className="prose prose-blue max-w-none">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-cyan-600" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">
                Understanding Sleep Stages
              </h2>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Stage 1: Light Sleep (N1)</h3>
                <p className="text-sm text-gray-700">
                  The transition between wakefulness and sleep. Lasts 5-10 minutes. You can be easily awakened.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Stage 2: Light Sleep (N2)</h3>
                <p className="text-sm text-gray-700">
                  Your heart rate slows and body temperature drops. Lasts about 20 minutes per cycle.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Stage 3: Deep Sleep (N3)</h3>
                <p className="text-sm text-gray-700">
                  The most restorative sleep stage. Important for physical recovery and immune function. 
                  Waking during this stage causes grogginess.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Stage 4: REM Sleep</h3>
                <p className="text-sm text-gray-700">
                  Rapid Eye Movement sleep where most dreaming occurs. Important for memory consolidation and learning. 
                  Brain activity is similar to waking hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is 6 hours of sleep enough?
              </h3>
              <p className="text-gray-700 text-sm">
                For most adults, 6 hours is below the recommended 7-9 hours. While some rare individuals can function 
                on 6 hours, most people need at least 7 hours for optimal health, cognitive function, and well-being.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I catch up on sleep during weekends?
              </h3>
              <p className="text-gray-700 text-sm">
                While "catching up" can help reduce short-term sleep debt, it doesn't fully compensate for chronic 
                sleep deprivation. It's better to maintain a consistent sleep schedule throughout the week.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Why do I feel tired even after 8 hours of sleep?
              </h3>
              <p className="text-gray-700 text-sm">
                Several factors can affect sleep quality: sleep apnea, poor sleep environment, stress, inconsistent 
                sleep schedule, or waking during a deep sleep stage. Try timing your wake-up between sleep cycles 
                using this calculator.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What if I can't fall asleep at the calculated bedtime?
              </h3>
              <p className="text-gray-700 text-sm">
                Don't force it. If you can't fall asleep within 20 minutes, get up and do a quiet, relaxing activity 
                until you feel sleepy. The 15-minute fall-asleep time is an average; yours may vary.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are naps good or bad for sleep?
              </h3>
              <p className="text-gray-700 text-sm">
                Short naps (20-30 minutes) can be beneficial and won't interfere with nighttime sleep. However, 
                long naps or naps late in the day can make it harder to fall asleep at night.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/time-card-calculator"
              className="block p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-shadow no-underline"
            >
              <Clock className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Time Card Calculator</h3>
              <p className="text-sm text-gray-600">Track work hours and breaks</p>
            </Link>
            <Link
              href="/age-calculator"
              className="block p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-shadow no-underline"
            >
              <Brain className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Age Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your exact age</p>
            </Link>
            <Link
              href="/bmi-calculator"
              className="block p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-shadow no-underline"
            >
              <Heart className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">BMI Calculator</h3>
              <p className="text-sm text-gray-600">Calculate body mass index</p>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}

