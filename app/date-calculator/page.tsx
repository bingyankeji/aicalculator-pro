import { Metadata } from "next";
import Link from "next/link";
import { DateCalculator } from "@/components/Calculator/DateCalculator";

export const metadata: Metadata = {
  title: "Date Calculator - Calculate Date Difference, Add or Subtract Days Online Free",
  description: "Free online date calculator to find the difference between dates, add or subtract days/months/years, and find weekdays. Calculate age, business days, and plan events with precision.",
  keywords: [
    "date calculator",
    "date difference calculator",
    "days between dates",
    "add days to date",
    "subtract days from date",
    "date to date calculator",
    "calendar calculator",
    "business days calculator",
    "weekday finder",
    "day counter",
    "date duration calculator",
    "date interval calculator",
    "age calculator from date",
    "days until calculator",
    "work days calculator"
  ],
  openGraph: {
    title: "Date Calculator - Calculate Date Difference & Add/Subtract Days",
    description: "Calculate days between dates, add or subtract time, find weekdays, and plan events. Free, accurate, and easy-to-use date calculator.",
    type: "website",
    url: "https://aicalculator.com/date-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Date Calculator - Calculate Date Difference Online",
    description: "Calculate days between dates, add or subtract time, and find weekdays easily.",
    site: "@aicalculator",
  },
  alternates: {
    canonical: "https://aicalculator.com/date-calculator",
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
  other: {
    'last-modified': new Date().toISOString(),
  },
};

export default function DateCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Date Calculator",
        "url": "https://aicalculator.com/date-calculator",
        "description": "Free online date calculator to calculate the difference between dates, add or subtract days/months/years, and find weekday information.",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate days between two dates",
          "Add or subtract years, months, weeks, days",
          "Find weekday for any date",
          "Calculate business days and weekends",
          "Week number and day of year",
          "Real-time calculation",
          "Clear button for each calculator",
          "No registration required"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://aicalculator.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Date & Time",
            "item": "https://aicalculator.com/date-time"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Date Calculator",
            "item": "https://aicalculator.com/date-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate the number of days between two dates?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the Date Difference Calculator: 1) Enter your start date, 2) Enter your end date, 3) Check 'Include end day' if needed, 4) The result shows years, months, days, total days, weekdays, and weekend days automatically. Our calculator includes a detailed breakdown showing exact time periods."
            }
          },
          {
            "@type": "Question",
            "name": "How do I add days to a date?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the Add/Subtract Calculator: 1) Enter your start date, 2) Click 'Add (+)', 3) Enter the number of years, months, weeks, and days to add, 4) The result date displays immediately with the exact date and total days added. You can mix different time units (e.g., 1 year 6 months 2 weeks)."
            }
          },
          {
            "@type": "Question",
            "name": "What day of the week was I born?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the Weekday Finder: 1) Enter your birthdate, 2) The calculator instantly shows the weekday (Monday-Sunday), week number of that year, day of year, and which quarter it falls in. You can also see if it was a weekend day."
            }
          },
          {
            "@type": "Question",
            "name": "Does the calculator account for leap years?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our date calculator automatically accounts for leap years (366 days) and regular years (365 days) when calculating date differences or adding/subtracting time. The Gregorian calendar rules are fully implemented, ensuring accurate calculations across centuries."
            }
          },
          {
            "@type": "Question",
            "name": "How many business days are between two dates?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Date Difference Calculator shows both weekdays (Monday-Friday) and weekend days separately. The 'Weekdays' count gives you the number of business days, excluding Saturdays and Sundays. Note: This does not account for public holidays, which vary by region."
            }
          },
          {
            "@type": "Question",
            "name": "Can I subtract dates to find age?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Enter your birthdate as the start date and today's date as the end date in the Date Difference Calculator. The result shows your exact age in years, months, and days. For a more detailed age calculation with next birthday countdown, use our dedicated Age Calculator."
            }
          },
          {
            "@type": "Question",
            "name": "What is the 'Include end day' option?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "By default, the calculator counts from start date up to (but not including) the end date. Checking 'Include end day' adds 1 day to the count. Example: Jan 1 to Jan 5 normally gives 4 days, but with 'Include end day' checked, it gives 5 days."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is the date calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our date calculator is 100% accurate and follows the Gregorian calendar system used worldwide. It correctly handles leap years, month lengths (28-31 days), and all calendar edge cases. Calculations are performed using JavaScript's native Date object with additional validation."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Date Calculator",
        "description": "Step-by-step guide to calculate date differences and add/subtract days",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose Calculator Type",
            "text": "Select from three calculators: Date Difference (find days between dates), Add/Subtract (calculate future/past dates), or Weekday Finder (find day of week). All three are displayed vertically for easy access."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Your Dates",
            "text": "Use the date picker to select dates. For Date Difference, enter both start and end dates. For Add/Subtract, enter a start date and the duration. For Weekday Finder, enter any date."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Configure Options",
            "text": "Choose relevant options: 'Include end day' for date difference calculations, 'Add' or 'Subtract' for date arithmetic. Enter years, months, weeks, and days as needed."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "View Results Instantly",
            "text": "Results appear automatically as you enter data. See detailed breakdowns including years, months, days, total days, weekdays, weekend days, and more. All calculations update in real-time."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Clear and Recalculate",
            "text": "Use the 'Clear' button in each calculator to reset inputs and start a new calculation. All three calculators work independently, so you can use them simultaneously."
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h1 className="sr-only">Date Calculator - Calculate Date Difference, Add or Subtract Days Online Free</h1>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" 
              itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/date-time" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Date & Time</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">Date Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Date Calculator Tool">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">📅 Date Calculator</h2>
            <p className="text-lg text-gray-600">
              Calculate days between dates, add or subtract time, and find weekday information instantly.
            </p>
          </div>
          <DateCalculator />
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Date Calculations</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What is a Date Calculator?</h3>
                  <p className="text-gray-700 mb-4">
                    A date calculator is a tool that performs arithmetic operations on calendar dates. Unlike simple math calculators, date calculators account for varying month lengths (28-31 days), leap years, and calendar system rules.
                  </p>
                  <p className="text-gray-700">
                    Our calculator uses the Gregorian calendar, the most widely used civil calendar worldwide, adopted in 1582 and now standard in most countries. It handles complex calculations like "What date is 3 months and 15 days from today?" or "How many days until Christmas?" instantly and accurately.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">The Gregorian Calendar System</h3>
                  <p className="text-gray-700 mb-4">
                    The Gregorian calendar reformed the Julian calendar to better align with Earth's orbit around the sun. A standard year has 365 days, with leap years adding a 366th day every 4 years (with exceptions for century years).
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">Month Lengths:</div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 31 days: Jan, Mar, May, Jul, Aug, Oct, Dec</li>
                      <li>• 30 days: Apr, Jun, Sep, Nov</li>
                      <li>• 28/29 days: Feb (29 in leap years)</li>
                      <li>• Leap year rule: Divisible by 4, except centuries (unless divisible by 400)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Use Cases */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Use Cases</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
                  <div className="text-3xl mb-3">🎂</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Age Calculation</h3>
                  <p className="text-sm text-gray-700">
                    Calculate exact age in years, months, and days. Find out how many days you've been alive or plan milestone celebrations with precision.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
                  <div className="text-3xl mb-3">📆</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Event Planning</h3>
                  <p className="text-sm text-gray-700">
                    Calculate event countdowns, set reminder dates, plan project timelines, and schedule meetings by adding or subtracting specific durations.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-6">
                  <div className="text-3xl mb-3">💼</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Business Days</h3>
                  <p className="text-sm text-gray-700">
                    Calculate working days between dates, excluding weekends. Essential for project management, contract deadlines, and delivery estimates.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200 p-6">
                  <div className="text-3xl mb-3">🏖️</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Vacation Planning</h3>
                  <p className="text-sm text-gray-700">
                    Calculate vacation duration, plan return dates, count days off, and schedule time away from work with accurate day counts.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200 p-6">
                  <div className="text-3xl mb-3">📝</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Legal & Financial</h3>
                  <p className="text-sm text-gray-700">
                    Calculate contract periods, loan durations, grace periods, payment due dates, and statute of limitation deadlines accurately.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-200 p-6">
                  <div className="text-3xl mb-3">🎓</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Academic Calendar</h3>
                  <p className="text-sm text-gray-700">
                    Calculate semester lengths, days until exams, graduation countdowns, and school break durations for better academic planning.
                  </p>
                </div>
              </div>
            </div>

            {/* Date Calculation Tips */}
            <div className="mb-12 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Date Calculation Tips & Tricks</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Understanding Leap Years</h3>
                  <p className="text-gray-700 mb-3">
                    Leap years occur every 4 years to keep the calendar synchronized with Earth's orbit. However, century years (1700, 1800, 1900) are NOT leap years unless divisible by 400 (2000, 2400 ARE leap years).
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Example:</strong> February 2024 has 29 days (leap year), but February 2100 will have only 28 days (not a leap year, despite being divisible by 4).
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Business Day Calculations</h3>
                  <p className="text-gray-700 mb-3">
                    Business days typically exclude weekends (Saturday and Sunday). Our calculator shows weekday count separately. For accurate business day calculations including holidays, you'll need to manually subtract public holidays specific to your region.
                  </p>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Tip:</strong> The U.S. has 10 federal holidays. Subtract these from the weekday count for accurate working day estimates.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Date Arithmetic Gotchas</h3>
                  <p className="text-gray-700">
                    Adding "1 month" to January 31st gives February 28th (or 29th in leap years), not March 2nd or 3rd. This is because February doesn't have 31 days. Our calculator handles these edge cases correctly, adjusting to the last valid day of the target month.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate the number of days between two dates?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Use the Date Difference Calculator: 1) Enter your start date, 2) Enter your end date, 3) Check 'Include end day' if needed, 4) The result shows years, months, days, total days, weekdays, and weekend days automatically. Our calculator includes a detailed breakdown showing exact time periods.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I add days to a date?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Use the Add/Subtract Calculator: 1) Enter your start date, 2) Click 'Add (+)', 3) Enter the number of years, months, weeks, and days to add, 4) The result date displays immediately with the exact date and total days added. You can mix different time units (e.g., 1 year 6 months 2 weeks).
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What day of the week was I born?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Use the Weekday Finder: 1) Enter your birthdate, 2) The calculator instantly shows the weekday (Monday-Sunday), week number of that year, day of year, and which quarter it falls in. You can also see if it was a weekend day.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Does the calculator account for leap years?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes! Our date calculator automatically accounts for leap years (366 days) and regular years (365 days) when calculating date differences or adding/subtracting time. The Gregorian calendar rules are fully implemented, ensuring accurate calculations across centuries.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How many business days are between two dates?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The Date Difference Calculator shows both weekdays (Monday-Friday) and weekend days separately. The 'Weekdays' count gives you the number of business days, excluding Saturdays and Sundays. Note: This does not account for public holidays, which vary by region.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can I subtract dates to find age?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes! Enter your birthdate as the start date and today's date as the end date in the Date Difference Calculator. The result shows your exact age in years, months, and days. For a more detailed age calculation with next birthday countdown, use our dedicated Age Calculator.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the 'Include end day' option?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      By default, the calculator counts from start date up to (but not including) the end date. Checking 'Include end day' adds 1 day to the count. Example: Jan 1 to Jan 5 normally gives 4 days, but with 'Include end day' checked, it gives 5 days.
                    </p>
                  </div>
                </div>

                <div 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How accurate is the date calculator?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Our date calculator is 100% accurate and follows the Gregorian calendar system used worldwide. It correctly handles leap years, month lengths (28-31 days), and all calendar edge cases. Calculations are performed using JavaScript's native Date object with additional validation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/time-calculator" 
                   className="block p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Time Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Add, subtract, and convert time units</p>
                </Link>
                <Link href="/age-calculator" 
                   className="block p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Age Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate exact age with countdown</p>
                </Link>
                <Link href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate percentages and changes</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

