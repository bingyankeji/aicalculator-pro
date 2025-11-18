import type { Metadata } from 'next';
import TimeZoneCalculator from '@/components/Calculator/TimeZoneCalculator';
import Link from 'next/link';
import { Globe, Clock, Users, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Time Zone Calculator - Convert Time Between Time Zones | Free Tool',
  description: 'Free time zone calculator to convert time between different time zones worldwide. Automatic daylight saving time handling and instant time comparisons.',
  keywords: [
    'time zone calculator',
    'time zone converter',
    'world time converter',
    'timezone calculator',
    'time difference calculator',
    'world clock',
    'time converter',
    'timezone conversion',
    'international time',
    'time zone difference',
    'utc converter',
    'gmt converter',
    'time zone map',
    'global time',
    'world time zones',
    'time zone comparison',
    'convert time zones',
    'timezone tool',
    'time across world',
    'international clock',
    'time zone finder',
    'timezone lookup',
    'world time calculator',
    'meeting time calculator',
    'conference time',
    'daylight saving time',
    'dst calculator',
    'time zone chart',
    'timezone comparison',
    'global clock'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Time Zone Calculator - Convert Time Between Time Zones',
    description: 'Convert time between different time zones worldwide with automatic daylight saving time handling.',
    type: 'website',
    url: 'https://aicalculator.pro/time-zone-calculator',
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: 'https://aicalculator.pro/og-time-zone-calculator.jpg',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Zone Calculator - Convert Time Between Time Zones',
    description: 'Convert time between different time zones worldwide. Free calculator with automatic DST handling.',
    images: ['https://aicalculator.pro/og-time-zone-calculator.jpg'],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: 'https://aicalculator.pro/time-zone-calculator',
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

export default function TimeZoneCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://aicalculator.pro/time-zone-calculator#webapp',
        name: 'Time Zone Calculator',
        url: 'https://aicalculator.pro/time-zone-calculator',
        description: 'Free calculator to convert time between different time zones with automatic daylight saving time handling.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Convert time between time zones',
          'Compare multiple time zones',
          'Automatic DST handling',
          'Major cities worldwide',
          'Time difference calculation',
          'UTC offset display',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://aicalculator.pro/time-zone-calculator#breadcrumb',
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
            name: 'Time Zone Calculator',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://aicalculator.pro/time-zone-calculator#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I convert time between different time zones?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Select your source time zone and time, then choose the target time zones you want to compare with. Click "Convert" to see the converted times. The calculator automatically handles daylight saving time.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does this calculator handle daylight saving time?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! The calculator automatically detects and applies daylight saving time (DST) rules for all supported time zones, ensuring accurate time conversions year-round.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is UTC and GMT?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'UTC (Coordinated Universal Time) and GMT (Greenwich Mean Time) are time standards used as reference points for time zones worldwide. For most practical purposes, UTC and GMT are the same. All time zones are expressed as offsets from UTC (e.g., UTC+8, UTC-5).',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I find the best meeting time across time zones?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Use the time zone calculator to compare business hours across different locations. Look for times when all zones are within standard working hours (typically 9 AM - 5 PM). The calculator shows all times simultaneously for easy comparison.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': 'https://aicalculator.pro/time-zone-calculator#howto',
        name: 'How to Use the Time Zone Calculator',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Source Time Zone',
            text: 'Choose your current time zone from the dropdown list of major cities.',
            url: 'https://aicalculator.pro/time-zone-calculator#step1',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Set Time',
            text: 'Enter the time you want to convert using the time picker.',
            url: 'https://aicalculator.pro/time-zone-calculator#step2',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Choose Target Zones',
            text: 'Select up to 4 target time zones you want to compare with.',
            url: 'https://aicalculator.pro/time-zone-calculator#step3',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'View Results',
            text: 'Click "Convert" to see the converted times for all selected time zones, including UTC offsets and time differences.',
            url: 'https://aicalculator.pro/time-zone-calculator#step4',
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': 'https://aicalculator.pro/time-zone-calculator#article',
        headline: 'Understanding Time Zones and Time Conversion',
        description: 'Learn how time zones work, how to convert between them, and best practices for international scheduling.',
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
          Time Zone Calculator - Convert Time Between Different Time Zones
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
              <span className="text-gray-900">Time Zone Calculator</span>
            </li>
          </ol>
        </nav>

        {/* Calculator Component */}
        <TimeZoneCalculator />

        {/* Educational Content */}
        <article className="max-w-7xl mx-auto px-4 py-12">
          {/* What is Time Zone Calculator */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What is a Time Zone Calculator?
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                A time zone calculator is a tool that helps you convert time between different time zones around the world. Whether you're scheduling international meetings, coordinating with remote teams, or planning travel, this calculator makes it easy to understand what time it is anywhere in the world.
              </p>
              <p>
                Our calculator automatically handles daylight saving time (DST) changes, ensuring accurate conversions throughout the year. Simply select your source time zone and time, choose the locations you want to compare with, and instantly see the equivalent times.
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
                  <Users className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">International Meetings</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Schedule meetings across different time zones by finding times that work for all participants. Essential for remote teams and global businesses.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Travel Planning</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Plan your travel itinerary and understand local times at your destination. Perfect for booking flights and scheduling activities.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Remote Work</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Coordinate with colleagues and clients across different time zones. Know when your international team members are available.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <Info className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Event Scheduling</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Schedule webinars, conferences, and online events that accommodate participants from multiple time zones.
                </p>
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How to Use the Time Zone Calculator
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-lg p-6 space-y-4 border border-blue-100">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🌍 Simple Steps</h3>
                <ol className="list-decimal list-inside text-gray-700 text-sm space-y-2 ml-4">
                  <li>Select your source time zone from the list of major cities</li>
                  <li>Enter the time you want to convert</li>
                  <li>Choose up to 4 target time zones to compare with</li>
                  <li>Click "Convert" to see all times displayed simultaneously</li>
                  <li>Review UTC offsets and time differences between zones</li>
                </ol>
              </div>
              <div className="pt-4 border-t border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">💡 Pro Tips</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>The calculator automatically accounts for daylight saving time</li>
                  <li>Use the current time as a starting point for quick conversions</li>
                  <li>Compare multiple zones at once to find optimal meeting times</li>
                  <li>UTC offsets help you understand the time difference from UTC/GMT</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Understanding Time Zones */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Understanding Time Zones
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                The world is divided into time zones to standardize timekeeping across different regions. Key concepts include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>UTC (Coordinated Universal Time):</strong> The primary time standard by which the world regulates clocks and time</li>
                <li><strong>Time Zone Offset:</strong> The difference in hours and minutes from UTC (e.g., UTC+8, UTC-5)</li>
                <li><strong>Daylight Saving Time (DST):</strong> The practice of setting clocks forward by one hour during warmer months</li>
                <li><strong>Standard Time:</strong> The time observed when DST is not in effect</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Our calculator handles all these complexities automatically, giving you accurate time conversions without needing to understand the technical details.
              </p>
            </div>
          </section>

          {/* Tips for International Scheduling */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Tips for International Scheduling
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-gray-700 text-sm">
                  <strong>🕐 Tip:</strong> When scheduling meetings, aim for times that fall within normal business hours (9 AM - 5 PM) for all participants.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-gray-700 text-sm">
                  <strong>📅 Tip:</strong> Be mindful of DST changes. Not all countries observe DST, and those that do may change on different dates.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-gray-700 text-sm">
                  <strong>⏰ Tip:</strong> Use 24-hour time format to avoid AM/PM confusion in international communications.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-gray-700 text-sm">
                  <strong>🌍 Tip:</strong> Always specify the time zone when sharing meeting times (e.g., "3:00 PM EST" or "15:00 UTC").
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
                  Why are there different time zones?
                </h3>
                <p className="text-gray-700 text-sm">
                  Time zones exist because the Earth rotates, causing different parts of the world to experience daylight at different times. Time zones ensure that noon roughly corresponds to when the sun is highest in the sky, making daily schedules more practical for each region.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What is daylight saving time?
                </h3>
                <p className="text-gray-700 text-sm">
                  Daylight Saving Time (DST) is the practice of moving clocks forward one hour during warmer months so that darkness falls at a later time. This provides more daylight during evening hours. Not all regions observe DST, and those that do may change on different dates.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How accurate is this time zone calculator?
                </h3>
                <p className="text-gray-700 text-sm">
                  Our calculator uses your browser's built-in time zone database, which is kept up-to-date with the latest time zone rules and DST changes. This ensures highly accurate conversions for all supported time zones.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I convert historical or future dates?
                </h3>
                <p className="text-gray-700 text-sm">
                  Yes! The calculator can convert times for any date. It automatically applies the correct DST rules for the specific date you're converting, whether in the past or future.
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

