import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import SpeedCalculator from '@/components/Calculator/SpeedCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Speed Calculator - Calculate Speed, Distance & Time | Free Online Tool',
  description: 'Free speed calculator for accurate speed, distance, and time calculations. Convert between km/h, mph, m/s, knots with instant results. Perfect for travel planning and physics.',
  keywords: [
    'speed calculator',
    'velocity calculator',
    'distance calculator',
    'time calculator',
    'average speed calculator',
    'speed distance time calculator',
    'mph to kmh converter',
    'speed converter',
    'travel time calculator',
    'driving time calculator',
    'km/h to mph',
    'meters per second calculator',
    'knots converter',
    'running pace calculator',
    'cycling speed calculator',
    'physics calculator',
    'speed formula calculator',
    'acceleration calculator',
    'speed unit converter',
    'trip calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Speed Calculator - Calculate Speed, Distance & Time',
    description: 'Free speed calculator for accurate speed, distance, and time calculations. Convert between km/h, mph, m/s, knots with instant results.',
    type: 'website',
    url: getUrl('/speed-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('speed'),
      width: 1200,
      height: 630,
      alt: 'Speed Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speed Calculator - Calculate Speed, Distance & Time',
    description: 'Free speed calculator for accurate speed, distance, and time calculations with multiple unit conversions.',
    images: [getOgImage('speed')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/speed-calculator'),
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
  category: 'calculator',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': getWebAppId('/speed-calculator'),
      name: 'Speed Calculator',
      url: getUrl('/speed-calculator'),
      description: 'Calculate speed, distance, and time with support for multiple units including km/h, mph, m/s, and knots.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Calculate speed from distance and time',
        'Calculate distance from speed and time',
        'Calculate time from speed and distance',
        'Multiple speed units: km/h, mph, m/s, knots',
        'Multiple distance units: km, miles, meters, feet',
        'Speed comparisons with common objects',
        'Speed unit converter',
        'Real-time calculations',
        'Mobile-friendly interface',
        'Share and export results',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/speed-calculator'),
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
          name: 'Other Calculators',
          item: getUrl('/other'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Speed Calculator',
          item: getUrl('/speed-calculator'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/speed-calculator'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the formula for calculating speed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Speed = Distance / Time. This fundamental formula calculates average speed by dividing the total distance traveled by the total time taken. For example, if you travel 100 km in 2 hours, your average speed is 50 km/h.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I convert km/h to mph?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To convert km/h to mph, multiply the speed by 0.621371. For example, 100 km/h = 62.14 mph. To convert mph to km/h, multiply by 1.60934. Our calculator handles these conversions automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between speed and velocity?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Speed is a scalar quantity that only measures how fast something is moving, while velocity is a vector quantity that includes both speed and direction. For most practical purposes, speed and velocity are used interchangeably.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I calculate travel time?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Travel Time = Distance / Speed. For example, to travel 300 km at 100 km/h, it will take 3 hours. Our calculator allows you to input distance and speed to automatically calculate the travel time.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are knots and how do they relate to other speed units?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A knot is a unit of speed equal to one nautical mile per hour, commonly used in marine and aviation contexts. 1 knot = 1.852 km/h = 1.151 mph. Our calculator can convert between knots and other common speed units.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can this calculator handle different units for inputs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! The calculator supports multiple units for both distance (kilometers, miles, meters, feet) and speed (km/h, mph, m/s, knots). Simply select your preferred unit from the dropdown menus.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/speed-calculator'),
      name: 'How to Calculate Speed',
      description: 'Step-by-step guide to calculating speed, distance, or time using the speed calculator',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Select Calculation Mode',
          text: 'Choose whether you want to calculate speed, distance, or time based on the values you have.',
          url: getStepUrl('/speed-calculator', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Enter Known Values',
          text: 'Input the values you know. For speed calculation, enter distance and time. For distance, enter speed and time. For time, enter speed and distance.',
          url: getStepUrl('/speed-calculator', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Select Units',
          text: 'Choose the appropriate units for your inputs from the dropdown menus (km, miles, km/h, mph, etc.).',
          url: getStepUrl('/speed-calculator', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Calculate Result',
          text: 'Click the Calculate button to get your result. The calculator will show the answer in multiple units automatically.',
          url: getStepUrl('/speed-calculator', 4),
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Review Conversions',
          text: 'Check the automatic unit conversions and speed comparisons to better understand the result.',
          url: getStepUrl('/speed-calculator', 5),
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/speed-calculator'),
      headline: 'Speed Calculator - Complete Guide to Speed, Distance & Time Calculations',
      description: 'Comprehensive guide to using the speed calculator for accurate speed, distance, and time calculations with multiple units.',
      author: {
        '@type': 'Organization',
        name: 'AICalculator.pro Team',
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
      dateModified: new Date().toISOString(),
    },
  ],
};

export default function SpeedCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* SEO H1 - Hidden but present for SEO */}
          <h1 className="sr-only">Speed Calculator - Calculate Speed, Distance & Time with Multiple Units</h1>
          
          {/* Breadcrumbs */}
          {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Speed Calculator"
        calculatorUrl="/speed-calculator"
      />

          {/* Calculator Component */}
          <SpeedCalculator />

          {/* Educational Content */}
          <div className="mt-12 max-w-4xl mx-auto space-y-8">
            {/* About Section */}
            <section className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                About the Speed Calculator
              </h2>
              <div className="prose prose-blue max-w-none text-gray-700 space-y-4">
                <p>
                  Our <strong>Speed Calculator</strong> is a comprehensive tool designed to help you calculate speed, distance, and time with ease. Whether you're planning a road trip, analyzing athletic performance, or solving physics problems, this calculator provides accurate results in multiple units.
                </p>
                <p>
                  The calculator supports three calculation modes: <strong>Find Speed</strong> (calculate speed from distance and time), <strong>Find Distance</strong> (calculate distance from speed and time), and <strong>Find Time</strong> (calculate time from speed and distance). Each mode provides automatic unit conversions and helpful insights.
                </p>
                <p>
                  With support for multiple units including kilometers per hour (km/h), miles per hour (mph), meters per second (m/s), and knots, the calculator adapts to your needs whether you're measuring highway speeds, running pace, or maritime navigation.
                </p>
              </div>
            </section>

            {/* Formulas Section */}
            <section className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Speed, Distance, and Time Formulas
              </h2>
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Calculate Speed</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Formula:</strong> Speed = Distance ÷ Time
                  </p>
                  <p className="text-gray-600 text-sm">
                    Example: If you travel 150 km in 2 hours, your speed is 150 ÷ 2 = 75 km/h
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Calculate Distance</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Formula:</strong> Distance = Speed × Time
                  </p>
                  <p className="text-gray-600 text-sm">
                    Example: At 60 km/h for 3 hours, you travel 60 × 3 = 180 km
                  </p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Calculate Time</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Formula:</strong> Time = Distance ÷ Speed
                  </p>
                  <p className="text-gray-600 text-sm">
                    Example: To travel 200 km at 80 km/h takes 200 ÷ 80 = 2.5 hours (2 hours 30 minutes)
                  </p>
                </div>
              </div>
            </section>

            {/* Unit Conversion Guide */}
            <section className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Speed Unit Conversions
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">From</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">To</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Multiply by</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">km/h</td>
                      <td className="border border-gray-300 px-4 py-2">mph</td>
                      <td className="border border-gray-300 px-4 py-2">0.621371</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">mph</td>
                      <td className="border border-gray-300 px-4 py-2">km/h</td>
                      <td className="border border-gray-300 px-4 py-2">1.60934</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">km/h</td>
                      <td className="border border-gray-300 px-4 py-2">m/s</td>
                      <td className="border border-gray-300 px-4 py-2">0.277778</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">m/s</td>
                      <td className="border border-gray-300 px-4 py-2">km/h</td>
                      <td className="border border-gray-300 px-4 py-2">3.6</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">knots</td>
                      <td className="border border-gray-300 px-4 py-2">km/h</td>
                      <td className="border border-gray-300 px-4 py-2">1.852</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">km/h</td>
                      <td className="border border-gray-300 px-4 py-2">knots</td>
                      <td className="border border-gray-300 px-4 py-2">0.539957</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Use Cases */}
            <section className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Common Use Cases
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">🚗 Travel Planning</h3>
                  <p className="text-gray-700">
                    Calculate travel time for road trips, estimate arrival times, and plan rest stops based on average driving speeds.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">🏃 Athletic Training</h3>
                  <p className="text-gray-700">
                    Track running pace, cycling speed, and swimming velocity to monitor training progress and set performance goals.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">📚 Physics & Education</h3>
                  <p className="text-gray-700">
                    Solve physics problems involving kinematics, verify homework calculations, and understand motion concepts.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">⛵ Maritime & Aviation</h3>
                  <p className="text-gray-700">
                    Convert between knots and other speed units for navigation, flight planning, and maritime applications.
                  </p>
                </div>
              </div>
            </section>

            {/* Tips Section */}
            <section className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Tips for Accurate Speed Calculations
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold text-xl">•</span>
                  <p className="text-gray-700">
                    <strong>Use consistent units:</strong> Make sure all inputs use compatible units before calculating. Our calculator handles conversions automatically.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold text-xl">•</span>
                  <p className="text-gray-700">
                    <strong>Account for stops:</strong> When calculating trip time, remember that average speed includes all time, including stops and delays.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold text-xl">•</span>
                  <p className="text-gray-700">
                    <strong>Consider conditions:</strong> Actual travel speeds vary with traffic, weather, terrain, and road conditions.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold text-xl">•</span>
                  <p className="text-gray-700">
                    <strong>Use the converter:</strong> The built-in speed converter helps you understand speeds in different measurement systems.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold text-xl">•</span>
                  <p className="text-gray-700">
                    <strong>Safety first:</strong> Always follow posted speed limits and adjust your speed for current conditions.
                  </p>
                </li>
              </ul>
            </section>

            {/* FAQ Section */}
            <section className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    What is the formula for calculating speed?
                  </h3>
                  <p className="text-gray-700">
                    Speed = Distance / Time. This fundamental formula calculates average speed by dividing the total distance traveled by the total time taken. For example, if you travel 100 km in 2 hours, your average speed is 50 km/h.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    How do I convert km/h to mph?
                  </h3>
                  <p className="text-gray-700">
                    To convert km/h to mph, multiply the speed by 0.621371. For example, 100 km/h = 62.14 mph. To convert mph to km/h, multiply by 1.60934. Our calculator handles these conversions automatically.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    What is the difference between speed and velocity?
                  </h3>
                  <p className="text-gray-700">
                    Speed is a scalar quantity that only measures how fast something is moving, while velocity is a vector quantity that includes both speed and direction. For most practical purposes, speed and velocity are used interchangeably.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    How do I calculate travel time?
                  </h3>
                  <p className="text-gray-700">
                    Travel Time = Distance / Speed. For example, to travel 300 km at 100 km/h, it will take 3 hours. Our calculator allows you to input distance and speed to automatically calculate the travel time.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    What are knots and how do they relate to other speed units?
                  </h3>
                  <p className="text-gray-700">
                    A knot is a unit of speed equal to one nautical mile per hour, commonly used in marine and aviation contexts. 1 knot = 1.852 km/h = 1.151 mph. Our calculator can convert between knots and other common speed units.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Can this calculator handle different units for inputs?
                  </h3>
                  <p className="text-gray-700">
                    Yes! The calculator supports multiple units for both distance (kilometers, miles, meters, feet) and speed (km/h, mph, m/s, knots). Simply select your preferred unit from the dropdown menus.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Calculators */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Related Calculators
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="/gas-mileage-calculator" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">⛽</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Gas Mileage Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate fuel efficiency and consumption</p>
                </a>
                <a href="/time-calculator" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">⏰</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Time Calculator</h3>
                  <p className="text-sm text-gray-600">Add, subtract, and convert time units</p>
                </a>
                <a href="/percentage-calculator" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">%</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate percentages easily</p>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

