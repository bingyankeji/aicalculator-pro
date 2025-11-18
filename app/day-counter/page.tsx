import type { Metadata } from 'next';
import DayCounterCalculator from '@/components/Calculator/DayCounterCalculator';
import Link from 'next/link';
import { Calendar, Clock, TrendingUp, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Day Counter - Calculate Days Between Dates | Free Date Calculator',
  description: 'Free day counter to calculate days between dates, add or subtract days, count business days, and track important dates. Get accurate date calculations with weekday/weekend breakdown.',
  keywords: [
    'day counter',
    'days between dates',
    'date calculator',
    'countdown calculator',
    'business days calculator',
    'working days calculator',
    'date difference',
    'days until',
    'days since',
    'date interval calculator',
    'calendar days calculator',
    'weekday calculator',
    'date math',
    'add days to date',
    'subtract days from date',
    'day difference calculator',
    'how many days',
    'days counter',
    'date counter',
    'time between dates'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Day Counter - Calculate Days Between Dates',
    description: 'Calculate days between dates, add or subtract days, and count business days with our free day counter tool.',
    type: 'website',
    url: 'https://aicalculator.pro/day-counter',
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: 'https://aicalculator.pro/og-day-counter.jpg',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day Counter - Calculate Days Between Dates',
    description: 'Calculate days between dates, add or subtract days, and count business days.',
    images: ['https://aicalculator.pro/og-day-counter.jpg'],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: 'https://aicalculator.pro/day-counter',
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

export default function DayCounterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://aicalculator.pro/day-counter#webapp',
        name: 'Day Counter',
        url: 'https://aicalculator.pro/day-counter',
        description: 'Free day counter to calculate days between dates, add or subtract days, and count business days.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate days between two dates',
          'Add or subtract days from a date',
          'Count business days (weekdays)',
          'Exclude weekends from calculations',
          'Time breakdown (years, months, weeks, days)',
          'Weekday and weekend statistics',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://aicalculator.pro/day-counter#breadcrumb',
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
            name: 'Day Counter',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://aicalculator.pro/day-counter#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I calculate the number of days between two dates?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Enter your start date and end date in the Day Counter. The calculator will automatically compute the total days, weekdays, and weekends between the two dates. You can also choose to include or exclude the end date.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are business days?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Business days, also known as working days or weekdays, are Monday through Friday, excluding weekends (Saturday and Sunday). Our calculator can count business days only when you enable the appropriate option.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I add or subtract days from a date?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Switch to "Add/Subtract Days" mode, enter your starting date and the number of days to add or subtract. You can also choose to count only business days, which will skip weekends.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does the calculator account for holidays?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The calculator counts weekdays and weekends but does not automatically account for public holidays, as these vary by country and region. It counts Monday through Friday as business days.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': 'https://aicalculator.pro/day-counter#howto',
        name: 'How to Use the Day Counter',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Calculator Mode',
            text: 'Select either "Date Range" to calculate days between two dates, or "Add/Subtract Days" to calculate a future or past date.',
            url: 'https://aicalculator.pro/day-counter#step1',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Dates',
            text: 'For Date Range mode, enter start and end dates. For Add/Subtract mode, enter a base date and the number of days.',
            url: 'https://aicalculator.pro/day-counter#step2',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Configure Options',
            text: 'Choose whether to include the end day or count business days only, depending on your needs.',
            url: 'https://aicalculator.pro/day-counter#step3',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'View Results',
            text: 'Click Calculate to see total days, weekday/weekend breakdown, and time breakdown in years, months, weeks, and days.',
            url: 'https://aicalculator.pro/day-counter#step4',
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': 'https://aicalculator.pro/day-counter#article',
        headline: 'Understanding Day Calculations and Date Math',
        description: 'Comprehensive guide to calculating days between dates and understanding date arithmetic.',
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
          Day Counter - Calculate Days Between Dates, Add or Subtract Days
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
              <span className="text-gray-900">Day Counter</span>
            </li>
          </ol>
        </nav>

        {/* Calculator Component */}
        <DayCounterCalculator />

        {/* Educational Content */}
        <article className="max-w-7xl mx-auto px-4 py-12">
          {/* What is Day Counter */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What is a Day Counter?
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                A day counter is a tool that calculates the number of days between two dates or determines a future/past date by adding or subtracting days. It's essential for project planning, event countdown, contract management, and tracking important milestones.
              </p>
              <p>
                Our day counter provides accurate calculations including total days, business days (weekdays), weekends, and detailed time breakdowns in years, months, weeks, and days.
              </p>
            </div>
          </section>

          {/* Common Use Cases */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Common Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Event Countdown</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Calculate days until weddings, birthdays, vacations, holidays, or any special event. Track milestones and plan accordingly.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Project Management</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Calculate project duration, estimate completion dates, and track deadlines. Count business days for accurate work schedules.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-6 w-6 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Contract & Legal</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Calculate notice periods, contract durations, statute of limitations, and legal deadlines with precision.
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                  <h3 className="font-semibold text-gray-900">Financial Planning</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Calculate loan terms, investment periods, interest accrual days, and payment due dates for financial management.
                </p>
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How to Use the Day Counter
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📅 Date Range Mode</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Select your start date and end date</li>
                  <li>Choose whether to include the end day in the calculation</li>
                  <li>Click Calculate to see total days, weekdays, and weekends</li>
                  <li>View time breakdown in years, months, weeks, and days</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">➕➖ Add/Subtract Days Mode</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Enter your starting date</li>
                  <li>Choose whether to add or subtract days</li>
                  <li>Enter the number of days to calculate</li>
                  <li>Optionally enable "business days only" to skip weekends</li>
                  <li>Click Calculate to see the resulting date</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Understanding Business Days */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Understanding Business Days vs Calendar Days
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">📅 Calendar Days</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Calendar days include all days in the date range:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    <li>Monday through Sunday (all 7 days)</li>
                    <li>Includes weekends and holidays</li>
                    <li>Used for countdown timers and general date calculations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">💼 Business Days (Weekdays)</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Business days only count working days:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    <li>Monday through Friday only</li>
                    <li>Excludes Saturdays and Sundays</li>
                    <li>Used for project timelines and business calculations</li>
                    <li>Note: Does not automatically exclude public holidays</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Tips & Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Tips for Accurate Date Calculations
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <h3 className="font-semibold text-gray-900 mb-1">✓ Include End Day Decision</h3>
                <p className="text-gray-700 text-sm">
                  When counting days for contracts or deadlines, decide whether to include the end date. For example, a 30-day notice period starting January 1st could end on January 30th (30 days) or January 31st (31 days including end day).
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-600 p-4">
                <h3 className="font-semibold text-gray-900 mb-1">✓ Business vs Calendar Days</h3>
                <p className="text-gray-700 text-sm">
                  Always clarify whether deadlines are in business days or calendar days. "10 business days" is roughly 2 weeks in calendar days, but "10 calendar days" is exactly 10 days regardless of weekends.
                </p>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-600 p-4">
                <h3 className="font-semibold text-gray-900 mb-1">✓ Holiday Considerations</h3>
                <p className="text-gray-700 text-sm">
                  This calculator doesn't automatically account for public holidays. For critical business calculations, manually adjust for holidays specific to your region or organization.
                </p>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-600 p-4">
                <h3 className="font-semibold text-gray-900 mb-1">✓ Time Zone Awareness</h3>
                <p className="text-gray-700 text-sm">
                  Date calculations use your local time zone. When dealing with international dates or deadlines, be mindful of time zone differences that might affect the final date.
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
                  How accurate is the day counter?
                </h3>
                <p className="text-gray-700 text-sm">
                  Our day counter is 100% accurate for date calculations. It properly handles leap years, different month lengths, and correctly counts days between any two dates from the past to the future.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What's the difference between "Include end day" options?
                </h3>
                <p className="text-gray-700 text-sm">
                  Without "include end day": Counting from Jan 1 to Jan 3 gives 2 days (Jan 1→2, 2→3). With "include end day": The same range gives 3 days (Jan 1, 2, and 3). Use "include end day" when the end date should be counted in the total.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I calculate dates more than a year in the future?
                </h3>
                <p className="text-gray-700 text-sm">
                  Yes! You can calculate dates any number of days, weeks, months, or years into the future or past. The calculator handles long date ranges and provides detailed breakdowns.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How do leap years affect calculations?
                </h3>
                <p className="text-gray-700 text-sm">
                  The calculator automatically accounts for leap years (February 29th). When calculating days or adding/subtracting days, leap years are properly handled to ensure accurate results.
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
                href="/age-calculator"
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-3">🎂</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Age Calculator
                </h3>
                <p className="text-gray-600 text-sm">
                  Calculate exact age and time lived
                </p>
              </Link>
              <Link
                href="/time-calculator"
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-3">⏰</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Time Calculator
                </h3>
                <p className="text-gray-600 text-sm">
                  Add or subtract time durations
                </p>
              </Link>
              <Link
                href="/date-calculator"
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-3">📅</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Date Calculator
                </h3>
                <p className="text-gray-600 text-sm">
                  Calculate dates and durations
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

