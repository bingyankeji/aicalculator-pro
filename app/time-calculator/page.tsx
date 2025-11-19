import { Metadata } from "next";
import Link from "next/link";
import { TimeCalculator } from "@/components/Calculator/TimeCalculator";

export const metadata: Metadata = {
  title: "Time Calculator (Free, No signup) - Add/Subtract Time | AICalculator",
  description: "Free time calculator with no sign-up required. Add, subtract, and convert time units (seconds, minutes, hours, days). Calculate durations, dates, and plan schedules efficiently. Perfect for project planning and time management.",
  keywords: [
    "time calculator",
    "free time calculator",
    "time calculator no signup",
    "add time",
    "subtract time",
    "time converter",
    "duration calculator",
    "time difference calculator",
    "hours minutes seconds calculator",
    "time conversion",
    "date time calculator",
    "work hours calculator",
    "time management tool",
    "elapsed time calculator",
    "time units converter",
    "seconds to hours",
    "hours to days"
  ],
  openGraph: {
    title: "Time Calculator (Free, No signup) - AICalculator",
    description: "Free time calculator with no sign-up required. Add/subtract time, convert units, calculate dates. Smart analysis with time management tips.",
    type: "website",
    url: "https://aicalculator.pro/time-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Time Calculator (Free, No signup) - AICalculator",
    description: "Free time calculator with no sign-up required. Perfect for precise time calculations, scheduling and project planning.",
    site: "@aicalculator",
  },
  alternates: {
    canonical: "https://aicalculator.pro/time-calculator",
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

export default function TimeCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Time Calculator",
        "url": "https://aicalculator.pro/time-calculator",
        "description": "Free online time calculator to add, subtract, and convert time units instantly. Perfect for project planning and scheduling.",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Add and subtract time in days, hours, minutes, seconds",
          "Date and time calculation with calendar picker",
          "Unit converter (seconds, minutes, hours, days)",
          "Expression calculator for complex time operations",
          "Four calculator modes in one page",
          "Modern, intuitive interface",
          "One-click clear function",
          "Real-time calculation"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://aicalculator.pro"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Date & Time",
            "item": "https://aicalculator.pro/date-time"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Time Calculator",
            "item": "https://aicalculator.pro/time-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I add time in the calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To add time: 1) Select 'Add/Subtract' mode, 2) Enter Time 1 values (days, hours, minutes, seconds), 3) Click 'Add (+)' button, 4) Enter Time 2 values, 5) The result displays automatically. Example: 2d 5h 30m + 1d 3h 45m = 3d 9h 15m."
            }
          },
          {
            "@type": "Question",
            "name": "What is the time unit converter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The time unit converter allows you to convert between seconds, minutes, hours, and days instantly. Enter a value, select the unit (e.g., 10000 seconds), and see it converted to all other units: 2h 46m 40s, 166.67 minutes, 0.11 days, and 10,000,000 milliseconds."
            }
          },
          {
            "@type": "Question",
            "name": "How does the expression calculator work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The expression calculator allows complex time calculations using text format. Use 'd' for days, 'h' for hours, 'm' for minutes, 's' for seconds. Example: '2d 5h 30m + 3h 45m - 1h 15m' calculates to 2 days, 8 hours, 0 minutes. Use + and - operators freely."
            }
          },
          {
            "@type": "Question",
            "name": "How do I clear the calculator inputs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each calculator mode has a 'Clear' button in the top-right corner. Click it to instantly reset all input fields to blank, allowing you to start a new calculation quickly."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate time across different dates?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Use the 'Date + Time' mode. Select a start date and time, choose Add or Subtract, enter a duration (days, hours, minutes), and see the resulting date and time. Perfect for planning deadlines, scheduling events, or calculating project timelines."
            }
          },
          {
            "@type": "Question",
            "name": "Why are there four separate calculators?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each calculator serves a different purpose: Add/Subtract for basic time operations, Date+Time for calendar-based calculations, Converter for unit conversions, and Expression for complex formulas. All four are displayed vertically for easy access without switching tabs."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is the time calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The time calculator is 100% accurate for all calculations. It converts all inputs to seconds, performs calculations, then converts back to days, hours, minutes, and seconds. Results are precise down to the second level."
            }
          },
          {
            "@type": "Question",
            "name": "Is my data saved or stored?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. All calculations are performed entirely in your browser using JavaScript. No data is sent to servers or stored anywhere. Your calculations remain private and are cleared when you close the browser tab."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Time Calculator",
        "description": "Step-by-step guide to calculate time efficiently",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose Calculator Mode",
            "text": "Select one of four modes: Add/Subtract Time (basic operations), Date + Time (calendar calculations), Converter (unit conversions), or Expression (text-based calculations)."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Time Values",
            "text": "Input your time values in days, hours, minutes, and seconds. Leave fields blank or enter 0 for unused units. All fields accept positive numbers."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Select Operation",
            "text": "For Add/Subtract and Date+Time modes, choose whether to Add (+) or Subtract (-) the time values using the toggle buttons."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "View Results",
            "text": "Results display automatically in the right panel showing the calculated time in standard format, plus total seconds, minutes, hours, and days."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Clear and Recalculate",
            "text": "Use the 'Clear' button in any calculator to reset inputs and start a new calculation. Switch between the four calculator modes as needed without losing focus."
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

      <h1 className="sr-only">Time Calculator - Add, Subtract & Convert Time Units Online Free</h1>

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
              <span itemProp="name" className="text-gray-900 font-semibold">Time Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Time Calculator Tool">
        <div className="container mx-auto px-4">
          <h2 className="sr-only">Time Calculator - Add, subtract, and convert time instantly. Calculate durations, convert units, and plan your schedule efficiently.</h2>
          <TimeCalculator />
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Time Calculation</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What is a Time Calculator?</h3>
                  <p className="text-gray-700 mb-4">
                    A time calculator is a digital tool that performs arithmetic operations on time values. Unlike standard calculators that work with decimal numbers, time calculators handle the sexagesimal (base-60) system used for measuring time.
                  </p>
                  <p className="text-gray-700">
                    This is essential because time units don't convert simply: 60 seconds = 1 minute, 60 minutes = 1 hour, but 24 hours = 1 day. Our calculator handles all these conversions automatically, making complex time calculations effortless.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">How Time is Measured</h3>
                  <p className="text-gray-700 mb-4">
                    Time measurement is based on the sexagesimal (base-60) numeral system, originated from ancient Sumer in the 3rd millennium BC. This system was adopted by the Babylonians and is still used today for measuring time and angles.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">Standard Time Units:</div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 1 day = 24 hours = 1,440 minutes = 86,400 seconds</li>
                      <li>• 1 hour = 60 minutes = 3,600 seconds</li>
                      <li>• 1 week = 7 days = 168 hours</li>
                      <li>• 1 month (avg) ≈ 30.4 days ≈ 730 hours</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Use Cases */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Practical Applications</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
                  <div className="text-3xl mb-3">📊</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Project Management</h3>
                  <p className="text-sm text-gray-700">
                    Calculate total project hours, estimate completion dates, and track time across multiple tasks. Convert between work days and calendar days for accurate planning.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
                  <div className="text-3xl mb-3">✈️</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Travel Planning</h3>
                  <p className="text-sm text-gray-700">
                    Calculate flight durations, layover times, and arrival times across time zones. Plan itineraries with accurate time calculations for better trip organization.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-6">
                  <div className="text-3xl mb-3">🍳</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Cooking & Timing</h3>
                  <p className="text-sm text-gray-700">
                    Add cooking times for multiple dishes, calculate preparation schedules, and plan meal timing to ensure everything is ready simultaneously.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200 p-6">
                  <div className="text-3xl mb-3">💪</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Fitness Training</h3>
                  <p className="text-sm text-gray-700">
                    Track workout durations, rest periods, and training intervals. Calculate total exercise time and plan workout schedules with precision.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200 p-6">
                  <div className="text-3xl mb-3">💼</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Work Hours Tracking</h3>
                  <p className="text-sm text-gray-700">
                    Calculate billable hours, track overtime, and compute payroll time. Subtract lunch breaks and convert to work days for accurate reporting.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-200 p-6">
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Time Management</h3>
                  <p className="text-sm text-gray-700">
                    Use Pomodoro technique calculations, plan focused work sessions, and balance work-rest ratios for optimal productivity.
                  </p>
                </div>
              </div>
            </div>

            {/* Time Management Tips */}
            <div className="mb-12 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Time Management Best Practices</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">The Pomodoro Technique</h3>
                  <p className="text-gray-700 mb-3">
                    Work in 25-minute focused intervals (Pomodoros) followed by 5-minute breaks. After 4 Pomodoros, take a longer 15-30 minute break. This technique improves focus and prevents burnout.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Example:</strong> An 8-hour workday = 16 Pomodoros = 6h 40m focused work + 1h 20m breaks
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Time Blocking</h3>
                  <p className="text-gray-700 mb-3">
                    Divide your day into blocks of time, each dedicated to specific tasks or activities. Calculate block durations to ensure balanced time allocation across priorities.
                  </p>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Recommended Split:</strong> 8 hours work, 8 hours personal time, 8 hours sleep
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Peak Productivity Hours</h3>
                  <p className="text-gray-700">
                    Most people experience peak cognitive performance during specific hours. Schedule demanding tasks during your peak hours (typically 9am-12pm and 2pm-5pm) and routine tasks during lower-energy periods.
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
                    How do I add time in the calculator?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To add time: 1) Select 'Add/Subtract' mode, 2) Enter Time 1 values (days, hours, minutes, seconds), 3) Click 'Add (+)' button, 4) Enter Time 2 values, 5) The result displays automatically. Example: 2d 5h 30m + 1d 3h 45m = 3d 9h 15m.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the time unit converter?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The time unit converter allows you to convert between seconds, minutes, hours, and days instantly. Enter a value, select the unit (e.g., 10000 seconds), and see it converted to all other units: 2h 46m 40s, 166.67 minutes, 0.11 days, and 10,000,000 milliseconds.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How does the expression calculator work?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The expression calculator allows complex time calculations using text format. Use 'd' for days, 'h' for hours, 'm' for minutes, 's' for seconds. Example: '2d 5h 30m + 3h 45m - 1h 15m' calculates to 2 days, 8 hours, 0 minutes. Use + and - operators freely.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I clear the calculator inputs?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Each calculator mode has a 'Clear' button in the top-right corner. Click it to instantly reset all input fields to blank, allowing you to start a new calculation quickly.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can I calculate time across different dates?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes! Use the 'Date + Time' mode. Select a start date and time, choose Add or Subtract, enter a duration (days, hours, minutes), and see the resulting date and time. Perfect for planning deadlines, scheduling events, or calculating project timelines.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Why are there four separate calculators?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Each calculator serves a different purpose: Add/Subtract for basic time operations, Date+Time for calendar-based calculations, Converter for unit conversions, and Expression for complex formulas. All four are displayed vertically for easy access without switching tabs.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How accurate is the time calculator?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The time calculator is 100% accurate for all calculations. It converts all inputs to seconds, performs calculations, then converts back to days, hours, minutes, and seconds. Results are precise down to the second level.
                    </p>
                  </div>
                </div>

                <div 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Is my data saved or stored?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      No. All calculations are performed entirely in your browser using JavaScript. No data is sent to servers or stored anywhere. Your calculations remain private and are cleared when you close the browser tab.
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
                <Link href="/date-calculator" 
                   className="block p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Date Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate date differences and add/subtract days</p>
                </Link>
                <Link href="/age-calculator" 
                   className="block p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Age Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate exact age in years, months, and days</p>
                </Link>
                <Link href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate percentages and percentage changes</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

