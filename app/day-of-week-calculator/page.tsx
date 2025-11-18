import type { Metadata } from 'next';
import DayOfWeekCalculator from '@/components/Calculator/DayOfWeekCalculator';
import Link from 'next/link';
import { Calendar, Clock, TrendingUp, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Day of the Week Calculator - Find What Day Any Date Falls On | Free Tool',
  description: 'Free day of the week calculator to find out what day any date falls on. Supports dates from 1900-2100 with interactive calendar view and date information.',
  keywords: [
    'day of week calculator',
    'what day was',
    'what day is',
    'day finder',
    'date to day',
    'weekday calculator',
    'calendar calculator',
    'day of week finder',
    'what day of the week',
    'date day calculator',
    'day name calculator',
    'weekday finder',
    'day calculator',
    'date weekday',
    'find day of week',
    'which day was',
    'which day is',
    'day of date',
    'calendar day finder',
    'day name finder',
    'weekday tool',
    'day of the week finder',
    'date to weekday',
    'zeller formula',
    'perpetual calendar',
    'day name tool',
    'weekday lookup',
    'calendar lookup',
    'day lookup tool',
    'date day finder'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Day of the Week Calculator - Find What Day Any Date Falls On',
    description: 'Find out what day of the week any date falls on with our free calculator. Supports historical and future dates.',
    type: 'website',
    url: 'https://aicalculator.pro/day-of-week-calculator',
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: 'https://aicalculator.pro/og-day-of-week-calculator.jpg',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day of the Week Calculator - Find What Day Any Date Falls On',
    description: 'Find out what day of the week any date falls on. Free calculator with calendar view.',
    images: ['https://aicalculator.pro/og-day-of-week-calculator.jpg'],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: 'https://aicalculator.pro/day-of-week-calculator',
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

export default function DayOfWeekCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://aicalculator.pro/day-of-week-calculator#webapp',
        name: 'Day of the Week Calculator',
        url: 'https://aicalculator.pro/day-of-week-calculator',
        description: 'Free calculator to find out what day of the week any date falls on, with interactive calendar view.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Find day of week for any date',
          'Interactive calendar view',
          'Date range: 1900-2100',
          'Weekend and weekday identification',
          'Month navigation',
          'Date information display',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://aicalculator.pro/day-of-week-calculator#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://aicalculator.pro',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Day of the Week Calculator',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://aicalculator.pro/day-of-week-calculator#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I find out what day of the week a date was?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Enter the date in the Day of the Week Calculator and click "Calculate". The calculator will instantly show you what day of the week that date falls on, along with a calendar view of the entire month.',
            },
          },
          {
            '@type': 'Question',
            name: 'What date range does this calculator support?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The calculator supports dates from January 1, 1900 to December 31, 2100, covering both historical and future dates.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is the day of the week calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The calculator uses mathematical algorithms (like Zeller\'s formula) to determine the day of the week. It accounts for leap years, different month lengths, and century changes to provide accurate results.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I see a calendar view of the month?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! After calculating, the tool displays a full calendar view of the selected date\'s month, with the selected date highlighted. You can also navigate to previous and next months.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': 'https://aicalculator.pro/day-of-week-calculator#howto',
        name: 'How to Use the Day of the Week Calculator',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select a Date',
            text: 'Use the date picker to select any date between 1900 and 2100.',
            url: 'https://aicalculator.pro/day-of-week-calculator#step1',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Click Calculate',
            text: 'Click the "Calculate" button to find out what day of the week your selected date falls on.',
            url: 'https://aicalculator.pro/day-of-week-calculator#step2',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'View Results',
            text: 'See the day of the week prominently displayed, along with a calendar view showing the entire month and date details.',
            url: 'https://aicalculator.pro/day-of-week-calculator#step3',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Explore the Calendar',
            text: 'Navigate through months using the arrows to explore other dates. Weekends are highlighted for easy reference.',
            url: 'https://aicalculator.pro/day-of-week-calculator#step4',
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': 'https://aicalculator.pro/day-of-week-calculator#article',
        headline: 'Understanding Day of the Week Calculations',
        description: 'Learn how to calculate what day of the week any date falls on and understand the algorithms behind it.',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString(),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Day of the Week Calculator - Find What Day Any Date Falls On
        </h1>

        {/* Breadcrumb Navigation */}
        <nav className="max-w-7xl mx-auto px-4 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900">Day of the Week Calculator</span>
            </li>
          </ol>
        </nav>

        {/* Calculator Component */}
        <DayOfWeekCalculator />

        {/* Educational Content */}
        <article className="max-w-7xl mx-auto px-4 py-12">
          {/* What is Day of Week Calculator */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What is a Day of the Week Calculator?
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                A day of the week calculator is a tool that determines which day of the week (Sunday through Saturday) a specific date falls on. Whether you're curious about historical dates, planning for future events, or need to know what day you were born, this calculator provides instant answers.
              </p>
              <p>
                Our calculator uses mathematical algorithms to accurately determine the day of the week for any date between 1900 and 2100, accounting for leap years, varying month lengths, and calendar system changes.
              </p>
            </div>
          </section>

          {/* Common Use Cases */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Common Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Historical Research</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Find out what day of the week historical events occurred, important dates in history, or discover what day you were born on.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Event Planning</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Plan future events by determining what day of the week a date will fall on. Perfect for scheduling weddings, meetings, or vacations.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Business Analysis</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Analyze business patterns by day of week, determine weekday vs weekend for sales data, or schedule reports based on specific weekdays.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <Info className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">General Curiosity</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Satisfy your curiosity about dates, verify calendar patterns, or settle debates about what day a memorable event occurred.
                </p>
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How to Use the Day of the Week Calculator
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-lg p-6 space-y-4 border border-blue-100">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📅 Simple Steps</h3>
                <ol className="list-decimal list-inside text-gray-700 text-sm space-y-2 ml-4">
                  <li>Select your desired date using the date picker</li>
                  <li>Click the "Calculate" button</li>
                  <li>View the day of the week result prominently displayed</li>
                  <li>Explore the calendar view to see the entire month</li>
                  <li>Navigate between months using the arrow buttons</li>
                </ol>
              </div>
              <div className="pt-4 border-t border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">💡 Pro Tips</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>The selected date is highlighted in blue on the calendar</li>
                  <li>Today's date is marked with a light blue background</li>
                  <li>Weekends (Saturday and Sunday) are shaded for easy identification</li>
                  <li>You can quickly navigate to different months to explore multiple dates</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Understanding the Algorithm */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How Day of Week Calculation Works
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                The day of the week for any date can be calculated using mathematical algorithms, the most famous being <strong>Zeller's formula</strong>. These algorithms take into account:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Leap Years:</strong> Years divisible by 4 are leap years (with exceptions for century years)</li>
                <li><strong>Month Lengths:</strong> Different months have different numbers of days (28-31)</li>
                <li><strong>Century Changes:</strong> Calendar adjustments that occurred over different centuries</li>
                <li><strong>Weekday Cycle:</strong> The 7-day week repeats in a predictable pattern</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Our calculator uses these principles to provide instant, accurate results for any date within the supported range (1900-2100).
              </p>
            </div>
          </section>

          {/* Interesting Facts */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Interesting Calendar Facts
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-gray-700 text-sm">
                  <strong>📅 Fact:</strong> Any date occurs on the same day of the week every 400 years in the Gregorian calendar.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-gray-700 text-sm">
                  <strong>🗓️ Fact:</strong> The 13th of any month is slightly more likely to fall on Friday than any other day of the week.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-gray-700 text-sm">
                  <strong>⏰ Fact:</strong> If you know what day January 1st falls on in any year, you can calculate what day any date in that year falls on.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-gray-700 text-sm">
                  <strong>🎯 Fact:</strong> The current calendar system (Gregorian) was introduced in 1582 to correct calendar drift from the Julian calendar.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Why do I need to know what day of the week a date is?
                </h3>
                <p className="text-gray-700 text-sm">
                  Knowing the day of the week is useful for planning events, understanding historical context, analyzing business patterns, scheduling recurring appointments, or simply satisfying curiosity about important dates in your life.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is this calculator accurate for all dates?
                </h3>
                <p className="text-gray-700 text-sm">
                  Yes! The calculator is 100% accurate for all dates between 1900 and 2100. It properly accounts for leap years, different month lengths, and calendar system rules during this period.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I use this for dates before 1900?
                </h3>
                <p className="text-gray-700 text-sm">
                  Our calculator supports dates from 1900 onwards. For dates before 1900, calendar systems varied by country and region, making accurate calculation more complex. The supported range covers most practical modern use cases.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What's the difference between weekdays and weekends?
                </h3>
                <p className="text-gray-700 text-sm">
                  In most Western countries, weekdays are Monday through Friday (typically business/work days), while weekends are Saturday and Sunday (typically rest days). Our calculator highlights weekends to help with planning.
                </p>
              </div>
            </div>
          </section>

          {/* Related Calculators */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Calculators
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/day-counter"
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-3">📅</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Day Counter
                </h3>
                <p className="text-gray-600 text-sm">
                  Calculate days between dates
                </p>
              </Link>
              <Link
                href="/age-calculator"
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-3">🎂</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Age Calculator
                </h3>
                <p className="text-gray-600 text-sm">
                  Calculate exact age from birth date
                </p>
              </Link>
              <Link
                href="/date-calculator"
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-3">📆</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Date Calculator
                </h3>
                <p className="text-gray-600 text-sm">
                  Add or subtract dates
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

