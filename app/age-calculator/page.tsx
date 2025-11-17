import { Metadata } from "next";
import { AgeCalculator } from "@/components/Calculator/AgeCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Your Exact Age in Years, Months, Days & Hours",
  description: "Free age calculator to calculate your exact age in years, months, days, hours, and minutes. Find out when your next birthday is, your zodiac sign, Chinese zodiac, and fun statistics. Calculate age from date of birth instantly with our accurate age calculator online.",
  keywords: [
    "age calculator",
    "calculate age",
    "age calculator from date of birth",
    "how old am i",
    "exact age calculator",
    "age in days calculator",
    "birthday calculator",
    "age calculator online",
    "free age calculator",
    "date of birth calculator",
    "age finder",
    "age counter",
    "precise age calculator",
    "age calculator in years months days",
    "age difference calculator",
    "zodiac sign calculator",
    "chinese zodiac calculator",
    "next birthday calculator",
    "age calculator accurate",
    "age calculator with time",
  ],
  openGraph: {
    title: "Age Calculator - Calculate Your Exact Age Online (Free)",
    description: "Calculate your exact age in years, months, days, hours, and minutes. Find your zodiac sign, next birthday countdown, and fun lifetime statistics. Free and accurate age calculator.",
    type: "website",
    url: "https://aicalculator.pro/age-calculator",
    siteName: "Calculator Online - AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Age Calculator - Exact Age in Years, Months, Days",
    description: "Calculate your exact age from date of birth. Get next birthday countdown, zodiac signs, and lifetime statistics. Free online age calculator.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.pro/age-calculator",
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

export default function AgeCalculatorPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // WebApplication Schema
      {
        "@type": "WebApplication",
        "name": "Age Calculator",
        "url": "https://aicalculator.pro/age-calculator",
        "description": "Free online age calculator to calculate exact age in years, months, days, hours, and minutes from date of birth. Includes next birthday countdown, zodiac signs, and lifetime statistics.",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate exact age from date of birth",
          "Years, months, days, hours, and minutes precision",
          "Next birthday countdown",
          "Zodiac sign calculator",
          "Chinese zodiac calculator",
          "Lifetime statistics (heartbeats, breaths)",
          "Share and export results",
          "Mobile-friendly interface"
        ]
      },
      // BreadcrumbList Schema
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
            "name": "Age Calculator",
            "item": "https://aicalculator.pro/age-calculator"
          }
        ]
      },
      // FAQPage Schema
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate my exact age?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate your exact age, enter your date of birth in our age calculator. The calculator will automatically compute your age in years, months, days, hours, and minutes. It also shows total days lived, next birthday countdown, and other interesting statistics."
            }
          },
          {
            "@type": "Question",
            "name": "How is age calculated in years, months, and days?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Age is calculated by finding the difference between your birth date and the current date (or a specified date). The calculator subtracts the birth year from the current year, then adjusts for months and days to provide the exact age. For example, if you were born on January 15, 1990, and today is November 8, 2024, you are 34 years, 9 months, and 24 days old."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate age for a specific date?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our age calculator allows you to calculate age as of any specific date. Simply select your date of birth and choose the 'Calculate Age As Of' date. This is useful for calculating historical ages, planning future events, or determining age for official documents."
            }
          },
          {
            "@type": "Question",
            "name": "What is the most accurate way to calculate age?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The most accurate way to calculate age is to count the complete years, months, and days from birth date to current date, considering leap years and varying month lengths. Our calculator uses precise date arithmetic to ensure accuracy down to the minute, accounting for all calendar variations."
            }
          },
          {
            "@type": "Question",
            "name": "How can I find out my zodiac sign from my birth date?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your zodiac sign is determined by your birth date (month and day). Our age calculator automatically displays your Western zodiac sign (Aries, Taurus, etc.) and Chinese zodiac sign (based on birth year) when you enter your date of birth."
            }
          }
        ]
      },
      // HowTo Schema
      {
        "@type": "HowTo",
        "name": "How to Use the Age Calculator",
        "description": "Step-by-step guide to calculating your exact age",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Your Date of Birth",
            "text": "Select your birth date using the date picker. You can type the date or use the calendar interface."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Choose Calculation Date (Optional)",
            "text": "By default, age is calculated as of today. You can optionally select a different date to calculate your age as of that specific date."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Click Calculate Age",
            "text": "Click the 'Calculate Age' button to instantly see your exact age in years, months, days, hours, and minutes."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "View Detailed Results",
            "text": "Review your exact age, total days lived, next birthday countdown, zodiac signs, and fun lifetime statistics like total heartbeats and breaths."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Share or Save (Optional)",
            "text": "Use the share button to share your age calculation with friends, save results as an image, or print for your records."
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* SEO: Hidden H1 */}
      <h1 className="sr-only">
        Age Calculator - Calculate Your Exact Age in Years, Months, Days, Hours & Minutes from Date of Birth
      </h1>

      {/* Breadcrumb Navigation */}
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
              <span itemProp="name" className="text-gray-900 font-semibold">Age Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Age Calculator Tool">
        <div className="container mx-auto px-4">
          <AgeCalculator />
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Age Calculator Information">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* What is Age Calculator */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What is an Age Calculator?</h2>
                <p className="text-gray-700 mb-4">
                  An age calculator is a free online tool that calculates your exact age from your date of birth. 
                  It provides precise age in years, months, days, hours, and even minutes. Unlike simple age 
                  calculations that only show years, our calculator considers the complete time period including 
                  leap years and varying month lengths for accurate results.
                </p>
                <p className="text-gray-700">
                  Beyond basic age calculation, this tool also provides next birthday countdown, zodiac sign 
                  information, Chinese zodiac, and interesting lifetime statistics like total heartbeats and 
                  breaths. It's perfect for personal use, official documents, planning events, or just curiosity 
                  about your exact age.
                </p>
              </div>

              {/* How Age is Calculated */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How is Age Calculated?</h2>
                <p className="text-gray-700 mb-4">
                  Age calculation involves finding the time difference between two dates: your birth date and 
                  either today's date or a specified date. The calculation process:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li><strong>Years:</strong> Subtract birth year from current year</li>
                  <li><strong>Months:</strong> Calculate remaining months, adjusting for incomplete years</li>
                  <li><strong>Days:</strong> Count remaining days, accounting for different month lengths</li>
                  <li><strong>Hours & Minutes:</strong> Calculate total time elapsed for precise age</li>
                </ol>
                <p className="text-gray-700 mt-4">
                  Our calculator automatically handles leap years, varying month lengths (28-31 days), and 
                  time zones to ensure the most accurate age calculation possible.
                </p>
              </div>

              {/* Why Calculate Age */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Calculate Your Exact Age?</h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">📄</span>
                    <span><strong>Official Documents:</strong> Fill out forms requiring exact age in years, months, and days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">🎂</span>
                    <span><strong>Birthday Planning:</strong> Track days until your next birthday or milestone age</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">💼</span>
                    <span><strong>Retirement Planning:</strong> Calculate exact age for retirement eligibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">⭐</span>
                    <span><strong>Zodiac Signs:</strong> Discover your Western and Chinese zodiac signs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">📊</span>
                    <span><strong>Life Statistics:</strong> Learn interesting facts like total days lived and heartbeats</span>
                  </li>
                </ul>
              </div>

              {/* Age Milestones */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Age Milestones</h2>
                <div className="space-y-3 text-gray-700">
                  <div><strong>18 years:</strong> Legal adult in most countries, voting rights</div>
                  <div><strong>21 years:</strong> Legal drinking age in the US, full adult rights</div>
                  <div><strong>25 years:</strong> Car rental age, brain fully developed</div>
                  <div><strong>30 years:</strong> Milestone decade, career prime</div>
                  <div><strong>40 years:</strong> Middle age begins, health awareness</div>
                  <div><strong>50 years:</strong> AARP eligibility, half-century celebration</div>
                  <div><strong>65 years:</strong> Traditional retirement age, Medicare eligibility</div>
                  <div><strong>100 years:</strong> Centenarian status, exceptional longevity</div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions About Age Calculator
              </h2>
              
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                
                {/* FAQ 1 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate my exact age?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate your exact age, simply enter your date of birth in the calculator above and 
                      click "Calculate Age". The calculator will instantly show your age in years, months, days, 
                      hours, and minutes. It also displays total days lived, next birthday countdown, zodiac signs, 
                      and interesting lifetime statistics like heartbeats and breaths.
                    </p>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How is age calculated in years, months, and days?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Age is calculated by finding the difference between your birth date and the current date. 
                      First, we subtract the birth year from the current year. Then we adjust for months - if the 
                      current month is before your birth month, we subtract one year and add 12 to the months. 
                      Finally, we calculate remaining days, accounting for different month lengths. For example, 
                      if you were born on January 15, 1990, and today is November 8, 2024, you are exactly 34 years, 
                      9 months, and 24 days old.
                    </p>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can I calculate age for a specific date in the past or future?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes! Our age calculator includes a "Calculate Age As Of" field that lets you calculate age 
                      for any specific date. This is useful for determining age on a particular date for official 
                      documents, planning future events, or calculating historical ages. Simply select your date 
                      of birth and the date you want to calculate age for.
                    </p>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the most accurate way to calculate age?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The most accurate age calculation counts complete years, months, and days from birth to the 
                      current date, properly handling leap years and varying month lengths (28-31 days). Our 
                      calculator uses precise date arithmetic to ensure accuracy down to the minute. It accounts 
                      for all calendar variations including leap years (February 29), different month lengths, 
                      and daylight saving time adjustments.
                    </p>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How can I find my zodiac sign from my birth date?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Your zodiac sign is automatically calculated from your birth date. The Western zodiac sign 
                      (Aries, Taurus, Gemini, etc.) is determined by your birth month and day, while the Chinese 
                      zodiac sign (Rat, Ox, Tiger, etc.) is based on your birth year. Our age calculator displays 
                      both zodiac signs along with their emoji symbols when you enter your date of birth.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/date-calculator"
                      className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Date Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate days between dates</p>
                </Link>
                <Link href="/time-calculator"
                      className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Time Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Add or subtract time</p>
                </Link>
                <Link href="/percentage-calculator"
                      className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate percentages easily</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

