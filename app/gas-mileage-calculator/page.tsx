import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import GasMileageCalculator from '@/components/Calculator/GasMileageCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Gas Mileage Calculator - Calculate MPG & Fuel Efficiency | AICalculator',
  description: 'Free gas mileage calculator to track your vehicle fuel efficiency. Calculate MPG, L/100km, km/L. Track fuel costs, view trends, get efficiency tips. Perfect for monitoring vehicle performance.',
  keywords: [
    'gas mileage calculator',
    'fuel efficiency calculator',
    'MPG calculator',
    'fuel economy calculator',
    'gas calculator',
    'fuel consumption calculator',
    'car fuel calculator',
    'vehicle mileage calculator',
    'miles per gallon calculator',
    'L/100km calculator',
    'fuel cost calculator',
    'fuel tracker',
    'gas tracker app',
    'fuel log',
    'mileage tracker',
    'fuel efficiency tracking',
    'car mpg calculator',
    'gas usage calculator',
    'fuel savings calculator',
    'vehicle efficiency calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Gas Mileage Calculator - Track Fuel Efficiency & MPG',
    description: 'Calculate your vehicle fuel efficiency. Track MPG, costs, and trends. Get personalized tips to improve fuel economy.',
    type: 'website',
    url: getUrl('/gas-mileage-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [
      {
        url: getOgImage('gas-mileage'),
        width: 1200,
        height: 630,
        alt: 'Gas Mileage Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gas Mileage Calculator - MPG & Fuel Efficiency Tracker',
    description: 'Track vehicle fuel efficiency. Calculate MPG, L/100km, km/L. Monitor costs and get efficiency tips.',
    images: [getOgImage('gas-mileage')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/gas-mileage-calculator'),
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

export default function GasMileageCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/gas-mileage-calculator'),
        name: 'Gas Mileage Calculator',
        url: getUrl('/gas-mileage-calculator'),
        description:
          'Free online gas mileage calculator to track vehicle fuel efficiency. Calculate MPG, L/100km, km/L with historical tracking and cost analysis.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate fuel efficiency in MPG, L/100km, km/L',
          'Track multiple fuel records with dates',
          'Calculate total fuel costs and cost per mile',
          'View fuel efficiency trends over time',
          'Export fuel records to CSV',
          'Get personalized efficiency improvement tips',
          'Fuel efficiency rating system',
          'Historical data tracking',
          'Cost analysis and projections',
          'Unit conversion between MPG, L/100km, km/L',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/gas-mileage-calculator'),
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
            name: 'Gas Mileage Calculator',
            item: getUrl('/gas-mileage-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/gas-mileage-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I calculate gas mileage (MPG)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gas mileage (MPG) is calculated by dividing miles driven by gallons used: MPG = Miles ÷ Gallons. For example, if you drove 350 miles and used 12.5 gallons, your MPG is 28 (350 ÷ 12.5 = 28 MPG). Reset your trip odometer when you fill up, drive normally, then divide miles by gallons at your next fill-up. For accurate results, track multiple fill-ups and calculate average MPG over time.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is good gas mileage for a car?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Good gas mileage varies by vehicle type. For sedans, 30+ MPG is excellent, 25-30 is good, 20-25 is average. SUVs: 25+ is excellent, 20-25 is good, 15-20 is average. Trucks: 20+ is excellent, 15-20 is good. Hybrids typically achieve 40-50 MPG, while electric vehicles measure efficiency in MPGe (miles per gallon equivalent). Modern fuel-efficient cars often exceed 35 MPG highway, while performance vehicles may average 15-20 MPG.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can I improve my gas mileage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To improve gas mileage: 1) Maintain proper tire pressure (improves MPG by 3%), 2) Remove excess weight (100 lbs reduces MPG by 1%), 3) Avoid aggressive driving (can lower MPG by 33% on highways), 4) Use cruise control on highways, 5) Replace air filters regularly, 6) Reduce highway speeds (MPG drops above 50 mph), 7) Combine trips to avoid cold starts, 8) Use recommended motor oil grade, 9) Keep your engine tuned, 10) Close windows at high speeds to reduce drag.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I convert MPG to L/100km?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Convert MPG to L/100km using the formula: L/100km = 235.214 ÷ MPG. For example, 30 MPG = 7.84 L/100km (235.214 ÷ 30). Note that lower L/100km is better (opposite of MPG). Common conversions: 20 MPG = 11.76 L/100km, 25 MPG = 9.41 L/100km, 30 MPG = 7.84 L/100km, 35 MPG = 6.72 L/100km, 40 MPG = 5.88 L/100km. Our calculator automatically shows all three units (MPG, L/100km, km/L).',
            },
          },
          {
            '@type': 'Question',
            name: 'Why track fuel mileage records?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tracking fuel records helps: 1) Identify trends and efficiency changes over time, 2) Detect mechanical problems early (sudden MPG drops indicate issues), 3) Calculate true fuel costs for budgeting, 4) Compare efficiency between seasons or driving conditions, 5) Evaluate the impact of maintenance or driving habit changes, 6) Provide documentation for business mileage tax deductions, 7) Determine optimal times for vehicle replacement. Regular tracking typically reveals 10-20% variations based on driving conditions and habits.',
            },
          },
          {
            '@type': 'Question',
            name: 'What affects gas mileage the most?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Main factors affecting MPG: 1) Driving style - aggressive acceleration/braking reduces MPG by 15-30%, 2) Speed - MPG decreases significantly above 50 mph, 3) Vehicle maintenance - dirty air filters reduce MPG by 10%, 4) Tire pressure - underinflation by 1 PSI reduces MPG by 0.3%, 5) Vehicle weight - every 100 lbs reduces MPG by 1%, 6) Weather - cold weather reduces MPG by 12-20%, 7) Terrain - hills and mountains reduce efficiency, 8) Engine condition - worn spark plugs reduce MPG by 30%.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/gas-mileage-calculator'),
        name: 'How to Calculate and Track Your Vehicle Gas Mileage',
        description:
          'Learn how to accurately calculate your vehicle fuel efficiency and track MPG over time for optimal fuel economy.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Gas Mileage Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Fill Up Your Tank Completely',
            text: 'Start with a full tank of gas. Reset your trip odometer to zero, or record your current odometer reading. This establishes your starting point for accurate mileage calculation.',
            url: getStepUrl('/gas-mileage-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Drive Normally',
            text: 'Drive your vehicle as you normally would until you need to refuel. For more accurate results, try to drive at least 100-200 miles before refueling. Avoid mixing highway and city driving significantly if you want to measure specific conditions.',
            url: getStepUrl('/gas-mileage-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Record Miles Driven',
            text: 'When you refuel, note the miles on your trip odometer (or subtract your starting odometer reading from current reading). Enter this value in the "Miles Driven" field. For example, if you drove 350 miles, enter 350.',
            url: getStepUrl('/gas-mileage-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Fill Tank and Record Gallons',
            text: 'Fill your tank completely again. The pump will display gallons used - this is the amount needed to refill your tank. Enter this value in "Gallons Used". For example, if the pump shows 12.5 gallons, enter 12.5.',
            url: getStepUrl('/gas-mileage-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Enter Fuel Cost (Optional)',
            text: 'To track fuel expenses, enter the price per gallon in "Fuel Price per Gallon". The calculator will compute your total cost and cost per mile. This helps budget fuel expenses and evaluate cost-saving measures.',
            url: getStepUrl('/gas-mileage-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Calculate Your MPG',
            text: 'Click "Calculate" to see your fuel efficiency. The calculator displays MPG, L/100km, and km/L conversions. You\'ll also see an efficiency rating (1-5 stars) comparing your results to typical vehicle performance.',
            url: getStepUrl('/gas-mileage-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Add Record for Tracking',
            text: 'Click "Add Record" to save this fill-up data. Build a history of fuel records to identify trends, spot anomalies, and track improvements. The calculator will show your average MPG over all recorded fill-ups.',
            url: getStepUrl('/gas-mileage-calculator', 7),
          },
          {
            '@type': 'HowToStep',
            position: 8,
            name: 'Review Trends and Tips',
            text: 'View the fuel efficiency trend chart to see how your MPG changes over time. Review personalized efficiency tips based on your results. Export records to CSV for detailed analysis or tax documentation.',
            url: getStepUrl('/gas-mileage-calculator', 8),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/gas-mileage-calculator'),
        headline: 'Gas Mileage Calculator - Track Vehicle Fuel Efficiency and MPG',
        description:
          'Comprehensive guide to calculating and improving your vehicle gas mileage. Learn MPG calculation, tracking methods, and efficiency optimization.',
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
        dateModified: '2024-11-18',
        image: getOgImage('gas-mileage'),
        articleBody:
          'Gas mileage calculation is essential for monitoring vehicle fuel efficiency, budgeting fuel costs, and detecting mechanical issues. This comprehensive calculator helps you track MPG, convert between units, analyze trends, and improve fuel economy through actionable insights.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="sr-only">Gas Mileage Calculator - Calculate Fuel Efficiency MPG and Track Vehicle Performance</h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Gas Mileage Calculator"
        calculatorUrl="/gas-mileage-calculator"
      />

      {/* Calculator Component */}
      <GasMileageCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Understanding Gas Mileage and Fuel Efficiency
          </h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 mb-8 rounded-r-lg">
            <p className="text-gray-700">
              <strong>Quick Answer:</strong> Gas mileage (MPG - Miles Per Gallon) measures how many miles your vehicle travels on one gallon of fuel. To calculate: divide miles driven by gallons used. For example, 350 miles ÷ 12.5 gallons = 28 MPG. Higher MPG means better fuel efficiency and lower fuel costs.
            </p>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
            What is Gas Mileage (MPG)?
          </h3>
          <p className="text-gray-700 mb-4">
            Gas mileage, commonly measured in <strong>Miles Per Gallon (MPG)</strong>, is a standard metric for vehicle fuel efficiency in the United States. It represents the distance your vehicle can travel using one gallon of gasoline. The higher the MPG, the more fuel-efficient your vehicle is, and the less you spend on fuel.
          </p>
          <p className="text-gray-700 mb-4">
            Other countries use different units: <strong>Liters per 100 kilometers (L/100km)</strong> is standard in Europe and Canada, while <strong>kilometers per liter (km/L)</strong> is used in Asia. Note that for L/100km, lower numbers indicate better efficiency (opposite of MPG).
          </p>

          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
            How to Calculate Gas Mileage
          </h3>
          <p className="text-gray-700 mb-4">
            Calculating gas mileage is straightforward using this formula:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 mb-6">
            <p className="text-center text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              MPG = Miles Driven ÷ Gallons Used
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Example:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>You fill up your gas tank completely</li>
              <li>You drive 350 miles</li>
              <li>You fill up again and the pump shows 12.5 gallons</li>
              <li>MPG = 350 ÷ 12.5 = 28 MPG</li>
            </ul>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Step-by-Step: Accurate MPG Calculation
          </h3>
          <div className="space-y-4 mb-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Step 1: Fill Tank Completely</h4>
              <p className="text-gray-700">
                Start with a full tank. Some pumps stop at different levels, so ensure the tank is genuinely full. Reset your trip odometer to zero (or record your current odometer reading).
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Step 2: Drive Normally</h4>
              <p className="text-gray-700">
                Drive your vehicle as you typically would. For accurate results, drive at least 100-200 miles before refueling. Mixing significantly different driving conditions (highway vs. city) may affect accuracy.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Step 3: Refuel and Record</h4>
              <p className="text-gray-700">
                When you need gas, note the trip odometer miles (or calculate difference from starting odometer). Fill the tank completely again and record the gallons from the pump.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Step 4: Calculate MPG</h4>
              <p className="text-gray-700">
                Divide miles driven by gallons used. Use our calculator to instantly see MPG along with L/100km and km/L conversions.
              </p>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
            What is Good Gas Mileage?
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Vehicle Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Excellent</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Good</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Average</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Compact Cars</td>
                  <td className="border border-gray-300 px-4 py-2">35+ MPG</td>
                  <td className="border border-gray-300 px-4 py-2">30-35 MPG</td>
                  <td className="border border-gray-300 px-4 py-2">25-30 MPG</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Mid-Size Sedans</td>
                  <td className="border border-gray-300 px-4 py-2">32+ MPG</td>
                  <td className="border border-gray-300 px-4 py-2">27-32 MPG</td>
                  <td className="border border-gray-300 px-4 py-2">22-27 MPG</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">SUVs</td>
                  <td className="border border-gray-300 px-4 py-2">28+ MPG</td>
                  <td className="border border-gray-300 px-4 py-2">23-28 MPG</td>
                  <td className="border border-gray-300 px-4 py-2">18-23 MPG</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Pickup Trucks</td>
                  <td className="border border-gray-300 px-4 py-2">25+ MPG</td>
                  <td className="border border-gray-300 px-4 py-2">20-25 MPG</td>
                  <td className="border border-gray-300 px-4 py-2">15-20 MPG</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Hybrid Vehicles</td>
                  <td className="border border-gray-300 px-4 py-2">50+ MPG</td>
                  <td className="border border-gray-300 px-4 py-2">40-50 MPG</td>
                  <td className="border border-gray-300 px-4 py-2">35-40 MPG</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Sports Cars</td>
                  <td className="border border-gray-300 px-4 py-2">25+ MPG</td>
                  <td className="border border-gray-300 px-4 py-2">20-25 MPG</td>
                  <td className="border border-gray-300 px-4 py-2">15-20 MPG</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
            10 Proven Ways to Improve Your Gas Mileage
          </h3>
          <div className="space-y-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">1. Maintain Proper Tire Pressure</h4>
              <p className="text-gray-700">
                Underinflated tires increase rolling resistance and reduce fuel efficiency by up to 3%. Check tire pressure monthly and inflate to manufacturer recommendations (found on driver door jamb).
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">2. Reduce Vehicle Weight</h4>
              <p className="text-gray-700">
                Every 100 pounds of extra weight reduces MPG by about 1%. Remove unnecessary items from your trunk and cargo area. Avoid carrying roof racks when not in use.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">3. Drive Smoothly</h4>
              <p className="text-gray-700">
                Aggressive acceleration and hard braking can lower gas mileage by 15-30% on highways and 10-40% in stop-and-go traffic. Accelerate gradually and anticipate stops.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">4. Observe Speed Limits</h4>
              <p className="text-gray-700">
                Gas mileage decreases rapidly above 50 mph. For every 5 mph over 50, you pay an additional $0.24 per gallon (at $3.50/gallon). Use cruise control on highways to maintain consistent speed.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">5. Use the Right Motor Oil</h4>
              <p className="text-gray-700">
                Use the manufacturer-recommended grade of motor oil. Using the wrong oil can reduce MPG by 1-2%. Look for "Energy Conserving" on the API performance label.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">6. Replace Air Filters Regularly</h4>
              <p className="text-gray-700">
                A clogged air filter can reduce fuel economy by up to 10% on older vehicles. Replace air filters every 15,000-30,000 miles or as recommended by manufacturer.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">7. Minimize Air Conditioning Use</h4>
              <p className="text-gray-700">
                Air conditioning can reduce MPG by up to 25% in hot weather. Use it judiciously. At highway speeds, closed windows with AC is more efficient than open windows creating drag.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">8. Combine Trips</h4>
              <p className="text-gray-700">
                Cold engine starts are less efficient. Combining errands into one trip and planning routes to minimize backtracking improves overall fuel economy.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">9. Keep Engine Tuned</h4>
              <p className="text-gray-700">
                Regular maintenance improves performance and fuel economy. Fixing serious issues like faulty oxygen sensors can improve MPG by as much as 40%.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">10. Reduce Idling</h4>
              <p className="text-gray-700">
                Idling gets 0 MPG. If you\'ll be stopped for more than 30 seconds, turn off the engine. Modern engines don\'t need more than 30 seconds to warm up.
              </p>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Understanding Unit Conversions
          </h3>
          <p className="text-gray-700 mb-4">
            Different regions use different fuel efficiency units. Here\'s how to convert between them:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 mb-6">
            <p className="font-semibold text-gray-900 mb-3">Conversion Formulas:</p>
            <ul className="space-y-2 text-gray-700">
              <li><strong>MPG to L/100km:</strong> L/100km = 235.214 ÷ MPG</li>
              <li><strong>MPG to km/L:</strong> km/L = 0.425144 × MPG</li>
              <li><strong>L/100km to MPG:</strong> MPG = 235.214 ÷ L/100km</li>
              <li><strong>km/L to MPG:</strong> MPG = km/L ÷ 0.425144</li>
            </ul>
            <p className="text-gray-700 mt-4">
              <strong>Note:</strong> With MPG and km/L, higher numbers are better. With L/100km, lower numbers are better.
            </p>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Why Track Fuel Mileage Over Time?
          </h3>
          <p className="text-gray-700 mb-4">
            Consistently tracking your gas mileage provides valuable insights beyond simple fuel efficiency:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li><strong>Early Problem Detection:</strong> A sudden drop in MPG often indicates mechanical issues before they become serious</li>
            <li><strong>Seasonal Patterns:</strong> Identify how weather affects your vehicle (cold weather typically reduces MPG by 12-20%)</li>
            <li><strong>Driving Habit Impact:</strong> See how your driving style affects efficiency and adjust accordingly</li>
            <li><strong>Maintenance Verification:</strong> Confirm that tune-ups and repairs actually improve performance</li>
            <li><strong>Budget Planning:</strong> Accurate fuel cost tracking helps budget monthly transportation expenses</li>
            <li><strong>Tax Documentation:</strong> Business mileage requires detailed records for IRS deductions</li>
            <li><strong>Vehicle Comparison:</strong> Compare efficiency when considering purchasing a new vehicle</li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Factors That Affect Gas Mileage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Vehicle Factors</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>Engine size and type</li>
                <li>Vehicle weight</li>
                <li>Transmission type (manual vs automatic)</li>
                <li>Aerodynamic design</li>
                <li>Tire type and condition</li>
                <li>Engine condition and age</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Driving Factors</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>Driving speed</li>
                <li>Acceleration/braking patterns</li>
                <li>Highway vs city driving</li>
                <li>Traffic conditions</li>
                <li>Cargo weight</li>
                <li>Use of AC/heating</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Environmental Factors</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>Outside temperature</li>
                <li>Wind resistance</li>
                <li>Terrain and elevation</li>
                <li>Fuel quality</li>
                <li>Road surface conditions</li>
                <li>Humidity levels</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Maintenance Factors</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>Tire pressure</li>
                <li>Air filter condition</li>
                <li>Spark plug condition</li>
                <li>Oxygen sensor function</li>
                <li>Engine oil quality</li>
                <li>Wheel alignment</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Common Gas Mileage Myths
          </h3>
          <div className="space-y-4 mb-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="font-semibold text-red-900 mb-2">Myth: Premium gas improves MPG in regular vehicles</p>
              <p className="text-red-800">
                <strong>Fact:</strong> Unless your vehicle specifically requires premium fuel, using it won\'t improve MPG. Use the octane rating recommended by your manufacturer.
              </p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="font-semibold text-red-900 mb-2">Myth: Manual transmissions always get better MPG</p>
              <p className="text-red-800">
                <strong>Fact:</strong> Modern automatic transmissions often match or exceed manual transmission efficiency due to advanced technology and optimized gear ratios.
              </p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="font-semibold text-red-900 mb-2">Myth: Filling up in the morning gives you more gas</p>
              <p className="text-red-800">
                <strong>Fact:</strong> Underground storage tanks maintain constant temperature. Time of day has negligible impact on fuel volume.
              </p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="font-semibold text-red-900 mb-2">Myth: Fuel additives significantly improve MPG</p>
              <p className="text-red-800">
                <strong>Fact:</strong> Most modern gasolines already contain necessary additives. Aftermarket additives rarely provide measurable MPG improvements.
              </p>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Real-World MPG Examples
          </h3>
          <p className="text-gray-700 mb-4">
            Here are typical fuel economy ranges for popular vehicle categories based on EPA estimates and real-world data:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Vehicle Model (Example)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">City MPG</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Highway MPG</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Combined</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Toyota Prius (Hybrid)</td>
                  <td className="border border-gray-300 px-4 py-2">54 MPG</td>
                  <td className="border border-gray-300 px-4 py-2">50 MPG</td>
                  <td className="border border-gray-300 px-4 py-2">52 MPG</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Honda Civic (Sedan)</td>
                  <td className="border border-gray-300 px-4 py-2">32 MPG</td>
                  <td className="border border-gray-300 px-4 py-2">42 MPG</td>
                  <td className="border border-gray-300 px-4 py-2">36 MPG</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Ford F-150 (Pickup)</td>
                  <td className="border border-gray-300 px-4 py-2">20 MPG</td>
                  <td className="border border-gray-300 px-4 py-2">26 MPG</td>
                  <td className="border border-gray-300 px-4 py-2">22 MPG</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Toyota RAV4 (SUV)</td>
                  <td className="border border-gray-300 px-4 py-2">28 MPG</td>
                  <td className="border border-gray-300 px-4 py-2">35 MPG</td>
                  <td className="border border-gray-300 px-4 py-2">31 MPG</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Tesla Model 3 (Electric)</td>
                  <td className="border border-gray-300 px-4 py-2" colSpan={3}>
                    132 MPGe (miles per gallon equivalent)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 mb-8 rounded-r-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Pro Tip: Track Multiple Tanks</h4>
            <p className="text-blue-800">
              A single fill-up can give inaccurate results due to pump shutoff differences. Track at least 3-5 consecutive fill-ups and calculate average MPG for the most accurate picture of your vehicle\'s fuel efficiency.
            </p>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
            When to Seek Professional Help
          </h3>
          <p className="text-gray-700 mb-4">
            If you notice any of these signs, your vehicle may need professional inspection:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li><strong>Sudden MPG drop of 20% or more</strong> without obvious cause</li>
            <li><strong>Check Engine Light</strong> illuminated along with poor fuel economy</li>
            <li><strong>Excessive exhaust smoke</strong> (black, blue, or white)</li>
            <li><strong>Engine running rough</strong> or misfiring</li>
            <li><strong>Strong fuel smell</strong> indicating possible leak</li>
            <li><strong>Difficulty starting</strong> combined with poor efficiency</li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">How accurate are EPA fuel economy estimates?</h4>
              <p className="text-gray-700">
                EPA estimates are laboratory-based and serve as standardized comparisons between vehicles. Real-world MPG typically varies 10-20% from EPA estimates due to individual driving habits, conditions, and vehicle maintenance. EPA updated testing procedures in 2008 to better reflect real-world conditions.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Does gas mileage improve after break-in period?</h4>
              <p className="text-gray-700">
                Yes, new vehicles typically see 1-2 MPG improvement after the first 5,000-10,000 miles as engine components seat properly. Follow manufacturer break-in recommendations for optimal long-term efficiency.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">How does weather affect gas mileage?</h4>
              <p className="text-gray-700">
                Cold weather (below 20°F) can reduce fuel economy by 12-20% for short trips as engines take longer to reach optimal operating temperature. Hot weather (above 95°F) increases AC use, reducing MPG by up to 25%. Moderate temperatures (60-80°F) provide optimal fuel efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/speed-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🏃</div>
            <h3 className="font-semibold text-gray-900">Speed Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate speed, distance, and time</p>
          </a>

          <a
            href="/distance-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📏</div>
            <h3 className="font-semibold text-gray-900">Distance Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate distances between points</p>
          </a>

          <a
            href="/time-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="font-semibold text-gray-900">Time Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate time duration and intervals</p>
          </a>

          <a
            href="/tip-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-900">Tip Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate tips and split bills</p>
          </a>
        </div>
      </section>
    </div>
  );
}

