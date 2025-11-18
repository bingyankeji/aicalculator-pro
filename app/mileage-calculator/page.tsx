import { Metadata } from 'next';
import MileageCalculator from '@/components/Calculator/MileageCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Mileage Calculator - Track Fuel Efficiency & MPG | AICalculator',
  description: 'Free mileage calculator to track fuel efficiency, calculate MPG, monitor trip costs, and compare vehicle fuel economy. Save money with smart fuel tracking.',
  keywords: [
    'mileage calculator',
    'fuel efficiency calculator',
    'MPG calculator',
    'gas mileage calculator',
    'fuel economy calculator',
    'trip cost calculator',
    'fuel consumption calculator',
    'vehicle mileage tracker',
    'miles per gallon calculator',
    'L/100km calculator',
    'fuel cost calculator',
    'annual fuel cost',
    'fuel efficiency tracking',
    'gas usage calculator',
    'fuel savings calculator',
    'car mpg calculator',
    'fuel economy tracker',
    'mileage tracker',
    'fuel log',
    'trip mileage calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Mileage Calculator - Track Fuel Efficiency & MPG',
    description: 'Calculate fuel efficiency, track MPG, monitor trip costs, and compare vehicle fuel economy. Free mileage calculator with trip history and cost analysis.',
    type: 'website',
    url: getUrl('/mileage-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('mileage'),
      width: 1200,
      height: 630,
      alt: 'Mileage Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mileage Calculator - Track Fuel Efficiency & MPG',
    description: 'Calculate fuel efficiency, track MPG, monitor trip costs, and compare vehicle fuel economy. Free mileage calculator with trip history and cost analysis.',
    images: [getOgImage('mileage')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/mileage-calculator'),
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

export default function MileageCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/mileage-calculator'),
        name: 'Mileage Calculator',
        url: getUrl('/mileage-calculator'),
        description: 'Free online mileage calculator to track fuel efficiency, calculate MPG and L/100km, monitor trip costs, analyze annual fuel expenses, and compare vehicle fuel economy.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate MPG and L/100km fuel efficiency',
          'Track trip mileage and fuel costs',
          'Monitor trip history with trends',
          'Calculate annual fuel expenses',
          'Compare vehicle fuel economy',
          'CO2 emissions calculator',
          'Fuel-saving tips and recommendations',
          'Support for miles/km and gallons/liters',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/mileage-calculator'),
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
            name: 'Mileage Calculator',
            item: getUrl('/mileage-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/mileage-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I calculate my car MPG?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To calculate MPG (Miles Per Gallon): Fill up your tank completely and reset your trip meter. Drive normally until you need to refuel. Fill up again and note the gallons added and miles driven. Divide miles by gallons (e.g., 300 miles ÷ 10 gallons = 30 MPG). For accuracy, calculate over multiple fill-ups and average the results. This calculator automates this process and tracks your history to show fuel efficiency trends over time.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is good gas mileage for a car?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Good gas mileage depends on vehicle type: Compact cars average 30-40 MPG (excellent), midsize sedans 25-35 MPG (good), SUVs 20-28 MPG (average), trucks 15-22 MPG (typical), and hybrids 40-60 MPG (outstanding). Electric vehicles equivalent: 100+ MPGe. Factors affecting MPG: driving habits (aggressive driving reduces MPG by 15-30%), vehicle maintenance (proper tire inflation improves 3%), cargo weight (every 100 lbs reduces MPG 1-2%), and driving conditions (city vs highway). Highway driving typically yields 20-30% better MPG than city driving.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can I improve my fuel efficiency?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Top 10 fuel-saving techniques: 1) Maintain proper tire pressure (improves MPG by 3%), 2) Remove excess weight from trunk (100 lbs = 1-2% loss), 3) Avoid aggressive driving (smooth acceleration saves 15-30%), 4) Use cruise control on highways (maintains constant speed), 5) Avoid excessive idling (wastes 0.2-0.5 gallons/hour), 6) Replace air filters regularly (improves up to 10%), 7) Plan routes to avoid traffic, 8) Coast to red lights instead of braking, 9) Use recommended motor oil grade, 10) Combine errands into one trip (cold starts use more fuel). These changes can save $500-1000 annually.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between MPG and L/100km?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'MPG (Miles Per Gallon) measures distance traveled per unit of fuel—higher is better. Used in the US, UK, and Canada. L/100km (Liters per 100 kilometers) measures fuel consumed per distance—lower is better. Used in Europe, Australia, and most other countries. Conversion: MPG to L/100km = 235.2 ÷ MPG; L/100km to MPG = 235.2 ÷ L/100km. Examples: 30 MPG = 7.8 L/100km (good), 20 MPG = 11.8 L/100km (average), 40 MPG = 5.9 L/100km (excellent). Both measure efficiency but inversely—improving from 20 to 25 MPG saves more fuel than improving from 40 to 45 MPG.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate annual fuel costs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Calculate annual fuel costs in 3 steps: 1) Determine annual mileage (average: 12,000-15,000 miles/year), 2) Calculate fuel needed: annual miles ÷ MPG (15,000 miles ÷ 25 MPG = 600 gallons), 3) Multiply by fuel price: 600 gallons × $3.50 = $2,100/year. Cost per mile = Annual cost ÷ annual miles ($2,100 ÷ 15,000 = $0.14/mile). To save money: Increasing MPG from 25 to 30 saves $350/year. Shopping for cheaper fuel ($3.25 vs $3.50) saves $150/year. Reducing annual mileage by 3,000 saves $420/year. This calculator automates these calculations and compares different vehicles.',
            },
          },
          {
            '@type': 'Question',
            name: 'What factors affect my vehicle fuel economy?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Major factors affecting fuel economy: Driving behavior (40% impact)—aggressive acceleration/braking wastes fuel; Vehicle condition (25%)—worn spark plugs, dirty air filters, low tire pressure reduce efficiency; Trip type (20%)—short trips with cold starts use 2x more fuel; Environmental (10%)—wind resistance, temperature, terrain; Vehicle load (5%)—roof racks, cargo, passengers. Seasonal variations: Winter reduces MPG 12-15% (cold engine, winter fuel blends), summer improves 5-7%. Maintenance items: Oil changes, air filters, tire rotation, wheel alignment. Age matters: vehicles lose 1-2% efficiency per year without proper maintenance.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/mileage-calculator'),
        name: 'How to Track Your Vehicle Mileage',
        description: 'Learn how to calculate fuel efficiency, track MPG, and monitor your vehicle fuel costs over time.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Mileage Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Record Trip Distance',
            text: 'Enter the distance you drove on your trip. You can use miles or kilometers—the calculator supports both units and converts automatically for international comparisons.',
            url: getStepUrl('/mileage-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Fuel Used',
            text: 'Input the amount of fuel consumed during the trip. Enter gallons or liters depending on your region. For best accuracy, fill your tank completely at the start and end of your measurement period.',
            url: getStepUrl('/mileage-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Add Fuel Price (Optional)',
            text: 'Enter the price per gallon to calculate trip costs. This helps track your fuel expenses over time and identify trends in your spending. Default is $3.50/gallon but adjust to your local price.',
            url: getStepUrl('/mileage-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'View Fuel Efficiency Results',
            text: 'Instantly see your fuel efficiency in both MPG and L/100km formats, along with trip cost and CO2 emissions. The calculator rates your efficiency and provides personalized recommendations.',
            url: getStepUrl('/mileage-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Track Trip History',
            text: 'Add trips to your history to monitor fuel efficiency trends over time. The calculator displays your average MPG, total costs, and identifies patterns in your driving efficiency.',
            url: getStepUrl('/mileage-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Estimate Annual Costs',
            text: 'Use the annual estimator to project yearly fuel expenses based on your average mileage and MPG. Compare scenarios to see how improving efficiency or driving less impacts your budget.',
            url: getStepUrl('/mileage-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/mileage-calculator'),
        headline: 'Complete Guide to Tracking Vehicle Mileage and Fuel Efficiency',
        description: 'Comprehensive guide to calculating MPG, tracking fuel costs, improving fuel efficiency, and comparing vehicle fuel economy.',
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
        image: getOgImage('mileage'),
        articleBody: 'Learn how to calculate MPG, track fuel costs, improve fuel efficiency, estimate annual fuel expenses, and compare vehicle fuel economy to save money.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Mileage Calculator - Track Fuel Efficiency & MPG</h1>
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" 
              itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/other" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Other</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Mileage Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <MileageCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Vehicle Mileage and Fuel Efficiency</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700">
              <strong>Quick Summary:</strong> Track your vehicle&apos;s fuel efficiency with our free mileage calculator. Calculate MPG, monitor trip costs, analyze fuel consumption trends, estimate annual expenses, and compare vehicles to save money and reduce environmental impact.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What is MPG and Why Does It Matter?</h3>
          <p className="text-gray-700 mb-4">
            MPG (Miles Per Gallon) measures how far your vehicle travels on one gallon of fuel. It&apos;s the standard fuel efficiency metric in the United States, Canada, and the UK. Higher MPG means better fuel efficiency—your vehicle goes farther on less fuel, saving you money and reducing environmental impact.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Why tracking MPG matters:</strong> The average American spends $2,000-3,000 annually on gasoline. A vehicle averaging 25 MPG consumes 600 gallons for 15,000 miles/year. Improving to 30 MPG reduces consumption to 500 gallons—saving $350/year at $3.50/gallon. Over a vehicle&apos;s 10-year lifespan, that&apos;s $3,500 in fuel savings plus reduced maintenance costs from better driving habits.
          </p>
          <p className="text-gray-700 mb-4">
            Beyond savings, MPG directly impacts carbon footprint. Each gallon of gasoline produces 19.6 pounds of CO₂. The 100-gallon annual savings (25 vs 30 MPG) prevents 1,960 pounds of CO₂ emissions—equivalent to planting 90 trees. Monitoring MPG helps identify problems: sudden drops indicate mechanical issues like worn spark plugs, clogged air filters, or underinflated tires.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How to Calculate MPG Accurately</h3>
          <p className="text-gray-700 mb-4">
            Accurate MPG calculation requires consistent methodology. Follow these steps for reliable results:
          </p>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Step-by-Step MPG Calculation Method</h4>
          <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Fill tank completely:</strong> Fill until the pump automatically shuts off. Don&apos;t top off—extra fuel affects accuracy. Reset your trip odometer to zero.</li>
            <li><strong>Drive normally:</strong> Don&apos;t alter driving habits to get &quot;better&quot; numbers. Track real-world efficiency for meaningful data. Include typical city and highway driving.</li>
            <li><strong>Refill at same station:</strong> Different pumps shut off at slightly different levels. Using the same station/pump improves consistency.</li>
            <li><strong>Record data:</strong> Note gallons added (from pump receipt) and miles driven (from odometer). Round to one decimal place for both.</li>
            <li><strong>Calculate MPG:</strong> Divide miles by gallons. Example: 342.5 miles ÷ 11.2 gallons = 30.6 MPG.</li>
            <li><strong>Track multiple fill-ups:</strong> Single calculations can vary ±10% due to fill-up inconsistencies. Average 3-5 fill-ups for accurate baseline.</li>
          </ol>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Calculation Mistakes</h4>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Topping off the tank:</strong> Adding fuel after auto-shutoff introduces inconsistency. Different nozzles, angles, and fuel expansion affect the &quot;full&quot; point.</li>
            <li><strong>Using trip computer MPG:</strong> Built-in car computers estimate MPG but can be 5-15% inaccurate. Use them for real-time monitoring but verify with manual calculations.</li>
            <li><strong>Not resetting trip meter:</strong> If you forget to reset, calculate from fuel receipts over time, ensuring you account for all fill-ups between measurements.</li>
            <li><strong>Mixing city/highway data:</strong> City driving yields 20-30% worse MPG than highway. Track separately to understand your vehicle&apos;s performance in different conditions.</li>
            <li><strong>Short measurement periods:</strong> Calculating MPG on one tank is inconsistent. Seasonal changes, driving conditions, and fill-up variations skew results. Average over multiple tanks.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding L/100km (International Standard)</h3>
          <p className="text-gray-700 mb-4">
            Most countries outside the US use L/100km (Liters per 100 kilometers), which measures fuel consumed per distance traveled. Unlike MPG (where higher is better), lower L/100km indicates better efficiency.
          </p>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">MPG to L/100km Conversion</h4>
          <p className="text-gray-700 mb-4">
            <strong>Formula:</strong> L/100km = 235.2 ÷ MPG<br />
            <strong>Reverse:</strong> MPG = 235.2 ÷ L/100km
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">MPG (US)</th>
                  <th className="px-4 py-3 text-left font-semibold">L/100km</th>
                  <th className="px-4 py-3 text-left font-semibold">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">50 MPG</td>
                  <td className="px-4 py-3">4.7 L/100km</td>
                  <td className="px-4 py-3 text-green-700 font-semibold">Excellent (Hybrid)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">40 MPG</td>
                  <td className="px-4 py-3">5.9 L/100km</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">Very Good</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">30 MPG</td>
                  <td className="px-4 py-3">7.8 L/100km</td>
                  <td className="px-4 py-3 text-blue-600 font-semibold">Good (Compact)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">25 MPG</td>
                  <td className="px-4 py-3">9.4 L/100km</td>
                  <td className="px-4 py-3 text-amber-600 font-semibold">Average (Sedan)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">20 MPG</td>
                  <td className="px-4 py-3">11.8 L/100km</td>
                  <td className="px-4 py-3 text-orange-600 font-semibold">Below Average (SUV)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">15 MPG</td>
                  <td className="px-4 py-3">15.7 L/100km</td>
                  <td className="px-4 py-3 text-red-600 font-semibold">Poor (Truck)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>Why L/100km makes sense mathematically:</strong> When comparing fuel savings, L/100km is more intuitive. Improving from 15 to 12 L/100km saves 3 liters per 100km—easy to calculate savings. With MPG, improving from 15 to 19 MPG saves more fuel than improving from 30 to 38 MPG (both 4 MPG improvements), which is counterintuitive. L/100km directly shows consumption.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Factors Affecting Fuel Efficiency</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Driving Behavior (40% Impact)</h4>
          <p className="text-gray-700 mb-4">
            Your driving style is the single largest factor affecting fuel economy:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Aggressive acceleration:</strong> Rapid acceleration (0-60 in less than 8 seconds) uses 40% more fuel than gradual acceleration (12-15 seconds). Accelerate smoothly to keep RPMs below 3,000.</li>
            <li><strong>Hard braking:</strong> Every time you brake hard, you waste the fuel used to accelerate. Anticipate stops and coast down. Engine braking (downshifting) is free.</li>
            <li><strong>Speeding:</strong> Above 50 mph, aerodynamic drag increases exponentially. Driving 75 mph vs 65 mph reduces MPG by 15-20%. Each 5 mph over 50 mph costs $0.15-0.30 per gallon.</li>
            <li><strong>Idling:</strong> Idling wastes 0.2-0.5 gallons/hour ($0.70-1.75/hour). Turn off engine if stopped longer than 30 seconds. Modern fuel injection uses less fuel restarting than idling.</li>
            <li><strong>Cruise control:</strong> Maintains constant speed on highways, preventing unconscious speed fluctuations that waste fuel. Saves 7-14% on long trips.</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Vehicle Condition (25% Impact)</h4>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Tire pressure:</strong> Underinflated tires increase rolling resistance. Each PSI below recommended reduces MPG by 0.3%. Check monthly; cold weather drops pressure 1 PSI per 10°F decrease.</li>
            <li><strong>Engine maintenance:</strong> Dirty air filters reduce airflow, forcing engine to work harder (reduces MPG up to 10%). Replace every 15,000-30,000 miles or annually.</li>
            <li><strong>Spark plugs:</strong> Worn plugs cause incomplete combustion. Replace at manufacturer intervals (30,000-100,000 miles depending on type). Misfires waste fuel.</li>
            <li><strong>Motor oil:</strong> Use manufacturer-recommended grade. Wrong viscosity increases friction. Synthetic oils reduce friction 2-5%, especially in cold weather.</li>
            <li><strong>Wheel alignment:</strong> Misaligned wheels drag, increasing resistance. Align when installing new tires or after hitting potholes/curbs. Saves 2-3% fuel.</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Trip Type (20% Impact)</h4>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Cold starts:</strong> Engines are least efficient when cold. Short trips (less than 5 miles) never reach optimal temperature, using 2x more fuel per mile than long trips.</li>
            <li><strong>City vs highway:</strong> City driving (stop-and-go) gets 20-30% worse MPG than highway. Constant highway speeds at 55-65 mph are optimal for most vehicles.</li>
            <li><strong>Trip chaining:</strong> Combine errands into one trip. Three short trips from cold starts use more fuel than one continuous trip covering same distance.</li>
            <li><strong>Route planning:</strong> Avoid congestion. Sitting in traffic wastes fuel. Apps like Waze/Google Maps route around traffic, saving time and fuel.</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Environmental Factors (10% Impact)</h4>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Temperature:</strong> Cold weather (below 32°F) reduces MPG 12-15%. Engines take longer to warm up, transmission fluid thickens, and battery efficiency drops.</li>
            <li><strong>Wind:</strong> Headwinds increase aerodynamic resistance. A 10 mph headwind can reduce highway MPG by 5-10%. Tailwinds provide opposite benefit.</li>
            <li><strong>Terrain:</strong> Hills reduce MPG significantly. Every 1,000 ft elevation gain uses extra fuel. Descents recover some energy but not all.</li>
            <li><strong>Air conditioning:</strong> AC compressor draws engine power, reducing MPG 5-25% depending on usage. At low speeds (less than 40 mph), open windows; at high speeds, AC is more efficient.</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Vehicle Load (5% Impact)</h4>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Cargo weight:</strong> Every 100 lbs reduces MPG by 1-2%. Remove unnecessary items from trunk. Roof racks add weight and drag—remove when not in use.</li>
            <li><strong>Roof cargo:</strong> Roof carriers/boxes increase aerodynamic drag dramatically. At 65 mph, roof cargo can reduce MPG by 10-25%. Use hitch-mounted carriers when possible.</li>
            <li><strong>Passengers:</strong> Four passengers add 400-600 lbs. For small cars, this is 10-15% of vehicle weight, noticeably affecting acceleration and MPG.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Proven Fuel-Saving Techniques</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Immediate Actions (No Cost)</h4>
          <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Check tire pressure monthly:</strong> Proper inflation improves MPG 3%. Takes 5 minutes, saves $100+/year. Check when tires are cold (before driving).</li>
            <li><strong>Remove excess weight:</strong> Clean out trunk/cargo area. Golf clubs, tools, sandbags add up. Every 100 lbs = $40/year in wasted fuel (15,000 miles, 25 MPG, $3.50/gal).</li>
            <li><strong>Accelerate gradually:</strong> Take 10-15 seconds to reach cruising speed. Pretend there&apos;s an egg under the pedal. Saves 10-15% fuel in city driving.</li>
            <li><strong>Coast to stops:</strong> Release accelerator early when approaching red lights or stop signs. Let momentum carry you. Saves 5-10% fuel.</li>
            <li><strong>Use cruise control:</strong> On flat highways, cruise control prevents speed creep and fluctuations. Saves 7-14% on long trips.</li>
            <li><strong>Avoid idling:</strong> Turn off engine if stopped longer than 30 seconds (not at stoplights). Modern engines use negligible fuel restarting vs idling.</li>
            <li><strong>Observe speed limits:</strong> Every 5 mph over 50 mph costs $0.20-0.40 per gallon equivalent. Driving 65 vs 75 saves $150-300/year.</li>
            <li><strong>Plan routes:</strong> Use navigation apps to avoid traffic. Sitting in traffic wastes fuel. Sometimes a longer route is more fuel-efficient.</li>
            <li><strong>Combine trips:</strong> One 10-mile trip from warm engine uses less fuel than two 5-mile trips from cold starts. Plan errands efficiently.</li>
            <li><strong>Park in shade:</strong> Summer heat vaporizes fuel. Shaded parking reduces evaporation and AC load. Saves 1-2% fuel in hot climates.</li>
          </ol>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Maintenance Actions (Low Cost, High Return)</h4>
          <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Replace air filter ($15-30):</strong> Dirty filters starve engine of air. Replace every 15,000-30,000 miles. Improves MPG 4-10%, pays for itself in 500-1,000 miles.</li>
            <li><strong>Use correct motor oil ($25-50):</strong> Follow manufacturer-recommended grade. Synthetic oil reduces friction in cold weather. Improves MPG 1-2%.</li>
            <li><strong>Replace spark plugs ($50-150):</strong> At recommended intervals (30,000-100,000 miles). Worn plugs misfire, wasting fuel and reducing power. Improves MPG 3-4%.</li>
            <li><strong>Align wheels ($75-150):</strong> After hitting curbs/potholes or with new tires. Misalignment drags wheels, wasting fuel. Improves MPG 2-3%.</li>
            <li><strong>Clean fuel injectors ($50-100):</strong> Use fuel system cleaner or professional service every 30,000 miles. Clogged injectors reduce efficiency. Improves MPG 3-5%.</li>
          </ol>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Long-Term Strategies</h4>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Choose efficient vehicles:</strong> When buying, prioritize MPG. Difference between 20 and 30 MPG costs $750/year (15,000 miles, $3.50/gal). Over 10 years: $7,500.</li>
            <li><strong>Consider hybrids/EVs:</strong> Hybrids average 40-60 MPG. EVs equivalent to 100+ MPG. Higher upfront cost often recovered in 3-5 years through fuel savings.</li>
            <li><strong>Right-size your vehicle:</strong> Don&apos;t drive a truck if you rarely haul. Don&apos;t use SUV if sedan suffices. Each vehicle class averages 5-10 MPG difference.</li>
            <li><strong>Downsize when possible:</strong> Compact cars (35-40 MPG) vs full-size sedans (25-30 MPG) save $500-700/year in fuel alone.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Calculating Annual Fuel Costs</h3>
          <p className="text-gray-700 mb-4">
            Understanding your annual fuel expenses helps budget and identifies savings opportunities:
          </p>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Step-by-Step Annual Cost Calculation</h4>
          <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Determine annual mileage:</strong> Check odometer readings from one year apart, or estimate based on weekly driving. Average Americans drive 12,000-15,000 miles/year. Commuters often exceed 18,000.</li>
            <li><strong>Calculate your average MPG:</strong> Track 3-5 fill-ups and average results. Don&apos;t rely on trip computer—manually calculate for accuracy.</li>
            <li><strong>Calculate gallons needed:</strong> Annual miles ÷ MPG. Example: 15,000 miles ÷ 25 MPG = 600 gallons/year.</li>
            <li><strong>Find average fuel price:</strong> Check GasBuddy for local prices. Use average over past 6-12 months for accuracy (fuel prices fluctuate seasonally).</li>
            <li><strong>Calculate annual cost:</strong> Gallons × Price. Example: 600 gallons × $3.50 = $2,100/year.</li>
            <li><strong>Calculate cost per mile:</strong> Annual cost ÷ Annual miles. Example: $2,100 ÷ 15,000 = $0.14/mile. This helps compare against alternatives like rideshare or public transit.</li>
          </ol>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Comparing Scenarios</h4>
          <p className="text-gray-700 mb-4">
            Use this calculator to compare different scenarios and identify savings opportunities:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Improving MPG:</strong> 25 MPG → 30 MPG at 15,000 miles/year saves 100 gallons = $350/year</li>
            <li><strong>Reducing mileage:</strong> 15,000 → 12,000 miles at 25 MPG saves 120 gallons = $420/year (carpooling, work from home, better route planning)</li>
            <li><strong>Finding cheaper fuel:</strong> $3.50 → $3.25/gallon at 600 gallons/year saves $150/year (worth driving 2-3 miles to cheaper station)</li>
            <li><strong>Vehicle replacement:</strong> 20 MPG → 30 MPG at 15,000 miles/year saves 250 gallons = $875/year. Over 5 years: $4,375 (justifies $5,000-10,000 premium for efficient vehicle)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Vehicle Fuel Economy Comparison</h3>
          <p className="text-gray-700 mb-4">
            Understanding typical MPG by vehicle type helps set realistic expectations and make informed purchase decisions:
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Vehicle Type</th>
                  <th className="px-4 py-3 text-center font-semibold">Typical MPG</th>
                  <th className="px-4 py-3 text-right font-semibold">Annual Cost*</th>
                  <th className="px-4 py-3 text-right font-semibold">5-Year Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-medium">Electric (MPGe)</td>
                  <td className="px-4 py-3 text-center">100-120+</td>
                  <td className="px-4 py-3 text-right text-green-700 font-semibold">$500-700**</td>
                  <td className="px-4 py-3 text-right">$2,500-3,500</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Hybrid</td>
                  <td className="px-4 py-3 text-center">40-60</td>
                  <td className="px-4 py-3 text-right text-green-600 font-semibold">$875-1,300</td>
                  <td className="px-4 py-3 text-right">$4,375-6,500</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Compact Car</td>
                  <td className="px-4 py-3 text-center">30-40</td>
                  <td className="px-4 py-3 text-right text-blue-600 font-semibold">$1,300-1,750</td>
                  <td className="px-4 py-3 text-right">$6,500-8,750</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Midsize Sedan</td>
                  <td className="px-4 py-3 text-center">25-35</td>
                  <td className="px-4 py-3 text-right text-blue-600 font-semibold">$1,500-2,100</td>
                  <td className="px-4 py-3 text-right">$7,500-10,500</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Full-Size Sedan</td>
                  <td className="px-4 py-3 text-center">22-28</td>
                  <td className="px-4 py-3 text-right text-amber-600 font-semibold">$1,875-2,400</td>
                  <td className="px-4 py-3 text-right">$9,375-12,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Compact SUV</td>
                  <td className="px-4 py-3 text-center">24-32</td>
                  <td className="px-4 py-3 text-right text-amber-600 font-semibold">$1,650-2,200</td>
                  <td className="px-4 py-3 text-right">$8,250-11,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Midsize SUV</td>
                  <td className="px-4 py-3 text-center">20-27</td>
                  <td className="px-4 py-3 text-right text-orange-600 font-semibold">$1,950-2,625</td>
                  <td className="px-4 py-3 text-right">$9,750-13,125</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Full-Size SUV</td>
                  <td className="px-4 py-3 text-center">16-22</td>
                  <td className="px-4 py-3 text-right text-red-600 font-semibold">$2,400-3,300</td>
                  <td className="px-4 py-3 text-right">$12,000-16,500</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Pickup Truck</td>
                  <td className="px-4 py-3 text-center">15-22</td>
                  <td className="px-4 py-3 text-right text-red-600 font-semibold">$2,400-3,500</td>
                  <td className="px-4 py-3 text-right">$12,000-17,500</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Sports Car</td>
                  <td className="px-4 py-3 text-center">18-25</td>
                  <td className="px-4 py-3 text-right text-red-600 font-semibold">$2,100-2,900</td>
                  <td className="px-4 py-3 text-right">$10,500-14,500</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mb-4">
            *Based on 15,000 miles/year at $3.50/gallon<br />
            **Electric vehicles: Based on $0.13/kWh electricity cost, typical efficiency of 3 miles/kWh
          </p>

          <p className="text-gray-700 mb-4">
            <strong>Key insights:</strong> Over 5 years, the difference between a 20 MPG truck and a 40 MPG compact car is $6,125 in fuel costs alone (15,000 miles/year, $3.50/gal). This often exceeds the vehicle price premium. For high-mileage drivers (20,000 miles/year), the 5-year difference increases to $8,750—making fuel efficiency a critical purchase factor.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Environmental Impact: CO₂ Emissions</h3>
          <p className="text-gray-700 mb-4">
            Fuel consumption directly correlates with carbon dioxide emissions. Understanding your environmental impact helps make informed decisions:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>CO₂ per gallon:</strong> Burning one gallon of gasoline produces 19.6 pounds (8.887 kg) of CO₂. This includes emissions from extracting, refining, and transporting fuel.</li>
            <li><strong>Annual emissions:</strong> A vehicle averaging 25 MPG over 15,000 miles burns 600 gallons, producing 11,760 pounds (5.3 metric tons) of CO₂ annually.</li>
            <li><strong>Comparison to trees:</strong> One tree absorbs approximately 48 pounds of CO₂/year. Offsetting 600 gallons requires planting 245 trees and waiting 10 years for them to mature.</li>
            <li><strong>Improvement impact:</strong> Improving from 20 to 30 MPG reduces annual emissions by 3,920 pounds (1.78 metric tons)—equivalent to taking a second car off the road for 4 months.</li>
          </ul>

          <p className="text-gray-700 mb-4">
            <strong>Electric vs gasoline:</strong> Even accounting for electricity generation emissions (US average grid), electric vehicles produce 50-70% less lifetime CO₂ than gasoline vehicles. In states with clean energy grids (California, Washington, New York), EVs produce 80-90% less. Hybrids typically produce 30-40% less than equivalent gasoline vehicles.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Using This Mileage Calculator Effectively</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Track Every Fill-Up</h4>
          <p className="text-gray-700 mb-4">
            For meaningful data, track every refueling over 3-6 months. Add each trip to your history to identify:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Seasonal variations:</strong> Summer typically improves MPG 5-10% vs winter due to warmer temperatures and summer fuel blends.</li>
            <li><strong>Maintenance needs:</strong> Sudden MPG drops indicate problems: clogged air filter, worn spark plugs, underinflated tires, or mechanical issues.</li>
            <li><strong>Driving pattern impact:</strong> Compare highway trips vs city driving to understand your vehicle&apos;s performance in different conditions.</li>
            <li><strong>Behavior changes:</strong> After implementing fuel-saving techniques, tracking shows actual savings—motivating continued good habits.</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Analyze Trends</h4>
          <p className="text-gray-700 mb-4">
            The calculator&apos;s trend chart reveals patterns over time:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Declining MPG:</strong> Gradual decline suggests maintenance needs or aging vehicle systems. Address before problems worsen.</li>
            <li><strong>Improving MPG:</strong> Validates good driving habits or recent maintenance. Continue successful practices.</li>
            <li><strong>Fluctuating MPG:</strong> Inconsistent results may indicate driving condition variations (city vs highway) or measurement inconsistencies (different fill-up techniques).</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Compare Vehicles</h4>
          <p className="text-gray-700 mb-4">
            Use the vehicle comparison feature to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Purchase decisions:</strong> Compare your current vehicle against potential replacements. See concrete annual savings to justify purchase price premium.</li>
            <li><strong>Family fleet:</strong> Compare different household vehicles. Assign trips to the most efficient vehicle when possible.</li>
            <li><strong>Realistic expectations:</strong> Compare your actual MPG against typical values for your vehicle type. Significantly below-average performance indicates problems.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common Questions and Misconceptions</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Does Premium Gas Improve MPG?</h4>
          <p className="text-gray-700 mb-4">
            Only if your vehicle requires it. Premium gas (91-93 octane) prevents knocking in high-compression engines. If your manual specifies &quot;premium recommended&quot; or &quot;premium required&quot;, use it—the MPG improvement (0-5%) and engine protection justify the cost. If your manual says &quot;regular unleaded&quot; or &quot;87 octane or higher&quot;, premium provides zero benefit and wastes $0.40-0.60 per gallon ($200-300/year). Exception: Some turbocharged engines perform noticeably better on premium but check your manual first.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Does AC or Open Windows Use More Fuel?</h4>
          <p className="text-gray-700 mb-4">
            It depends on speed. Below 40 mph, open windows use less fuel than AC. Above 50 mph, aerodynamic drag from open windows exceeds AC power consumption—use AC at highway speeds. At 65 mph, open windows can reduce MPG by 10-20%, while AC typically costs 5-10%. Modern vehicles have efficient AC systems—don&apos;t avoid using it on highways. At city speeds, lower windows when comfortable.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Is Topping Off Bad for MPG?</h4>
          <p className="text-gray-700 mb-4">
            Topping off (adding fuel after auto-shutoff) doesn&apos;t improve MPG but ruins your calculations. Extra fuel enters vapor recovery system, potentially damaging charcoal canister ($300-800 repair). For accurate MPG tracking, fill only to automatic shutoff. Variations between fill-ups average out over multiple tanks. The 0.1-0.2 gallon difference from topping off causes wildly inconsistent MPG readings.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Do Fuel Additives Improve MPG?</h4>
          <p className="text-gray-700 mb-4">
            Most claims are overstated. Reputable fuel system cleaners (Chevron Techron, BG 44K, Seafoam) can restore 3-5% MPG if injectors are dirty—but modern detergent gasoline prevents buildup. Use cleaners every 30,000 miles or if you notice rough idle/poor performance. Avoid miracle additives promising 20%+ improvements—if it sounds too good to be true, it is. Regular maintenance (air filters, spark plugs, tire pressure) provides far better returns.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Resources</h3>
          <p className="text-gray-700 mb-4">
            For more information on fuel efficiency and vehicle maintenance:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <a href="https://www.fueleconomy.gov/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                FuelEconomy.gov
              </a> - Official US government source for fuel economy information, vehicle comparisons, and driving tips
            </li>
            <li>
              <a href="https://www.epa.gov/greenvehicles" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                EPA Green Vehicle Guide
              </a> - Environmental Protection Agency resources on vehicle emissions and fuel efficiency
            </li>
            <li>
              <a href="https://www.gasbuddy.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                GasBuddy
              </a> - Find cheapest gas prices near you, track price trends, and plan fuel stops
            </li>
            <li>
              <a href="https://www.nhtsa.gov/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                National Highway Traffic Safety Administration
              </a> - Vehicle safety and maintenance information
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/gas-mileage-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⛽</div>
            <h3 className="font-semibold text-gray-900">Gas Mileage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Track MPG and fuel consumption</p>
          </a>
          
          <a 
            href="/fuel-cost-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🚗</div>
            <h3 className="font-semibold text-gray-900">Fuel Cost Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate trip fuel expenses</p>
          </a>
          
          <a 
            href="/auto-loan-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🚙</div>
            <h3 className="font-semibold text-gray-900">Auto Loan Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate car loan payments</p>
          </a>
          
          <a 
            href="/speed-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900">Speed Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate speed, distance, and time</p>
          </a>
        </div>
      </section>
    </div>
  );
}

