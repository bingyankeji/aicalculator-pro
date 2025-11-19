import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import TypingSpeedCalculator from '@/components/Calculator/TypingSpeedCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Typing Speed Test - WPM & Accuracy Calculator | AICalculator',
  description: 'Free typing speed test to measure your WPM (words per minute), CPM, and accuracy. Improve your typing skills with instant feedback and performance ratings.',
  keywords: [
    'typing speed test',
    'WPM test',
    'typing test',
    'words per minute',
    'typing speed calculator',
    'CPM test',
    'typing accuracy test',
    'keyboard speed test',
    'typing practice',
    'typing skills test',
    'online typing test',
    'free typing test',
    'typing speed checker',
    'typing performance',
    'touch typing test',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Typing Speed Test - Measure Your WPM',
    description: 'Test your typing speed and accuracy. Get instant WPM, CPM, and accuracy results with performance ratings.',
    type: 'website',
    url: getUrl('/typing-speed-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('typing-speed'),
      width: 1200,
      height: 630,
      alt: 'Typing Speed Test',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Typing Speed Test',
    description: 'Test your typing speed and accuracy',
    images: [getOgImage('typing-speed')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/typing-speed-calculator'),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': getWebAppId('/typing-speed-calculator'),
      name: 'Typing Speed Test',
      url: getUrl('/typing-speed-calculator'),
      description: 'Test your typing speed with real-time WPM, CPM, and accuracy measurements. Multiple difficulty levels and instant performance feedback.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'WPM (Words Per Minute) calculation',
        'CPM (Characters Per Minute) measurement',
        'Accuracy percentage',
        'Error tracking',
        'Multiple difficulty levels',
        'Real-time feedback',
        'Performance ratings',
        '60-second timed test',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/typing-speed-calculator'),
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
          name: 'Other',
          item: getUrl('/other'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Typing Speed Calculator',
          item: getUrl('/typing-speed-calculator'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/typing-speed-calculator'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a good typing speed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The average typing speed is 40 words per minute (WPM). A good typing speed is 50-60 WPM, while professional typists typically achieve 65-75 WPM. Expert typists can reach 80+ WPM. However, accuracy is equally important—maintaining 95%+ accuracy while typing at speed is the goal for most professionals.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is WPM calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WPM (Words Per Minute) is calculated by dividing the number of characters typed by 5 (average word length), then dividing by the time in minutes. For example, if you type 300 characters in 60 seconds, that equals 60 characters per minute, or 60 WPM (300 characters ÷ 5 characters per word ÷ 1 minute = 60 WPM).',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I improve my typing speed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To improve typing speed: 1) Learn touch typing and proper finger placement on home row keys (ASDF JKL;), 2) Practice daily for 15-30 minutes, 3) Focus on accuracy before speed, 4) Use online typing tutors and games, 5) Avoid looking at the keyboard, 6) Maintain good posture and ergonomics, 7) Take breaks to avoid fatigue. Consistent practice is key—most people see significant improvement within 2-3 weeks.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between WPM and CPM?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WPM (Words Per Minute) measures typing speed based on words, where one word equals 5 characters. CPM (Characters Per Minute) counts every character typed including spaces and punctuation. CPM is always higher than WPM—typically about 5 times higher. For example, 60 WPM equals approximately 300 CPM. CPM provides a more precise measurement of raw typing speed.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/typing-speed-calculator'),
      name: 'How to Use Typing Speed Test',
      description: 'Test your typing speed and accuracy in 60 seconds',
      totalTime: 'PT2M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      tool: {
        '@type': 'HowToTool',
        name: 'Typing Speed Test',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Select Difficulty',
          text: 'Choose your difficulty level: Easy, Medium, or Hard based on your typing experience.',
          url: getStepUrl('/typing-speed-calculator', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Start the Test',
          text: 'Click "Start Test" to begin the 60-second typing challenge. The timer starts immediately.',
          url: getStepUrl('/typing-speed-calculator', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Type the Text',
          text: 'Type the displayed text as quickly and accurately as possible. Correct characters turn green, errors turn red.',
          url: getStepUrl('/typing-speed-calculator', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'View Results',
          text: 'After 60 seconds or when you click "Finish Test", see your WPM, CPM, accuracy percentage, and performance rating.',
          url: getStepUrl('/typing-speed-calculator', 4),
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/typing-speed-calculator'),
      headline: 'Typing Speed Test - Improve Your Typing Skills',
      description: 'Complete guide to measuring and improving typing speed with WPM and accuracy metrics.',
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
      dateModified: '2024-11-19',
      image: getOgImage('typing-speed'),
      articleBody: 'Typing speed is a crucial skill in the digital age, affecting productivity and career opportunities...',
    },
  ],
};

export default function TypingSpeedCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <h1 className="sr-only">Typing Speed Test - WPM & Accuracy Calculator</h1>
      
      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Typing Speed Test"
        calculatorUrl="/typing-speed-calculator"
      />

      <TypingSpeedCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Typing Speed</h2>
          <p className="text-gray-700 mb-4">
            Typing speed is measured in Words Per Minute (WPM) and is a critical skill in today's digital workplace. Whether you're a student, professional, or content creator, improving your typing speed can significantly boost your productivity and efficiency.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Typing Speed Benchmarks</h3>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Level</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">WPM Range</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Beginner</td>
                  <td className="border border-gray-300 px-4 py-2">0-20 WPM</td>
                  <td className="border border-gray-300 px-4 py-2">Just starting, hunt and peck typing</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Below Average</td>
                  <td className="border border-gray-300 px-4 py-2">20-40 WPM</td>
                  <td className="border border-gray-300 px-4 py-2">Developing skills, occasional keyboard glances</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Average</td>
                  <td className="border border-gray-300 px-4 py-2">40-60 WPM</td>
                  <td className="border border-gray-300 px-4 py-2">Competent for most jobs</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Above Average</td>
                  <td className="border border-gray-300 px-4 py-2">60-80 WPM</td>
                  <td className="border border-gray-300 px-4 py-2">Professional level, touch typing</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Expert</td>
                  <td className="border border-gray-300 px-4 py-2">80+ WPM</td>
                  <td className="border border-gray-300 px-4 py-2">Exceptional speed, transcription level</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Touch Typing Fundamentals</h3>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Home Row Position</h4>
            <p className="text-gray-700 mb-2">
              The foundation of touch typing is the home row: <strong>ASDF</strong> for the left hand and <strong>JKL;</strong> for the right hand. Your index fingers should rest on F and J (which have tactile bumps on most keyboards).
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Left pinky: A</li>
              <li>• Left ring: S</li>
              <li>• Left middle: D</li>
              <li>• Left index: F</li>
              <li>• Right index: J</li>
              <li>• Right middle: K</li>
              <li>• Right ring: L</li>
              <li>• Right pinky: ;</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Tips to Improve Your Typing Speed</h3>
          <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Master Touch Typing:</strong> Learn to type without looking at the keyboard. This is the single most important skill for speed improvement.</li>
            <li><strong>Focus on Accuracy First:</strong> Speed will naturally increase as you make fewer errors. Aim for 95%+ accuracy before pushing for speed.</li>
            <li><strong>Practice Daily:</strong> Consistent 15-30 minute practice sessions are more effective than occasional long sessions.</li>
            <li><strong>Use Proper Posture:</strong> Sit upright with feet flat on the floor, elbows at 90 degrees, and wrists straight.</li>
            <li><strong>Learn Keyboard Shortcuts:</strong> Common shortcuts (Ctrl+C, Ctrl+V, etc.) can significantly boost productivity.</li>
            <li><strong>Use Online Tools:</strong> Typing tutors, games, and tests provide structured practice and track progress.</li>
            <li><strong>Type Real Content:</strong> Practice with actual work documents, emails, or creative writing for practical improvement.</li>
          </ol>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Common Typing Mistakes to Avoid</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Looking at the keyboard instead of the screen</li>
            <li>Using incorrect finger placement</li>
            <li>Tensing up your hands and shoulders</li>
            <li>Typing too fast before mastering accuracy</li>
            <li>Neglecting to use all fingers (hunt and peck method)</li>
            <li>Poor posture and ergonomics</li>
            <li>Not taking breaks, leading to fatigue and RSI</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Benefits of Fast Typing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Career Advantages</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Increased productivity and efficiency</li>
                <li>• Competitive advantage in job market</li>
                <li>• Required skill for many professions</li>
                <li>• Faster communication and response times</li>
              </ul>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Personal Benefits</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Save hours of time weekly</li>
                <li>• Reduce frustration and stress</li>
                <li>• Better focus on content, not mechanics</li>
                <li>• Improved digital communication</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Ergonomics and Health</h3>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Prevent Repetitive Strain Injury (RSI)</h4>
            <p className="text-gray-700 mb-2">
              Long typing sessions can lead to RSI, carpal tunnel syndrome, and other injuries. Follow these guidelines:
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Take 5-minute breaks every 30 minutes</li>
              <li>• Stretch your hands, wrists, and fingers regularly</li>
              <li>• Use an ergonomic keyboard and mouse</li>
              <li>• Maintain proper wrist position (neutral, not bent)</li>
              <li>• Adjust monitor height to eye level</li>
              <li>• Consider a standing desk or adjustable workstation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/reading-time-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📖</div>
            <h3 className="font-semibold text-gray-900">Reading Time Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate reading and speaking time</p>
          </a>
          <a href="/character-counter" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-semibold text-gray-900">Character Counter</h3>
            <p className="text-sm text-gray-600 mt-1">Count characters and words</p>
          </a>
          <a href="/time-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">⏰</div>
            <h3 className="font-semibold text-gray-900">Time Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Add and subtract time</p>
          </a>
          <a href="/percentage-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">%</div>
            <h3 className="font-semibold text-gray-900">Percentage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate percentages</p>
          </a>
        </div>
      </section>
    </div>
  );
}

