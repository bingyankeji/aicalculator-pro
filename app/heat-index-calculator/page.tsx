import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import HeatIndexCalculator from '@/components/Calculator/HeatIndexCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Heat Index Calculator - Calculate Feels-Like Temperature | AICalculator',
  description: 'Free heat index calculator to estimate how hot it feels based on air temperature and humidity. Calculate heat stress risk, heat exhaustion warnings, and outdoor safety recommendations.',
  keywords: [
    'heat index calculator',
    'heat index',
    'feels like temperature',
    'heat stress calculator',
    'temperature humidity index',
    'apparent temperature calculator',
    'heat exhaustion calculator',
    'heat stroke risk',
    'humidity calculator',
    'heat index chart',
    'NWS heat index',
    'heat index formula',
    'how hot does it feel',
    'heat stress index',
    'heat index table',
    'heat index temperature',
    'humidex calculator',
    'wet bulb temperature',
    'heat danger calculator',
    'summer heat calculator',
    'heat safety calculator',
    'heat index conversion',
    'heat index degrees',
    'real feel temperature',
    'heat index weather',
    'outdoor heat safety',
    'heat illness prevention',
    'dehydration calculator',
    'heat index risk',
    'hot weather calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Heat Index Calculator - Calculate Feels-Like Temperature',
    description: 'Calculate heat index temperature and assess heat-related health risks based on temperature and humidity. Get safety recommendations for hot weather.',
    type: 'website',
    url: getUrl('/heat-index-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('heat-index'),
      width: 1200,
      height: 630,
      alt: 'Heat Index Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heat Index Calculator - Heat Stress & Safety',
    description: 'Calculate how hot it feels with heat index calculator. Assess heat exhaustion risk and get hot weather safety recommendations.',
    images: [getOgImage('heat-index')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/heat-index-calculator'),
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HeatIndexCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/heat-index-calculator'),
        name: 'Heat Index Calculator',
        url: getUrl('/heat-index-calculator'),
        description: 'Calculate heat index temperature and assess heat-related health risks based on air temperature and relative humidity. Get safety recommendations for hot weather conditions.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate heat index temperature',
          'Two calculation methods: relative humidity or dew point',
          'Assess heat-related health risks',
          'Temperature in Celsius or Fahrenheit',
          'Health risk level classification',
          'Safety recommendations',
          'Hydration needs estimation',
          'Heat exhaustion and heat stroke warnings',
          'Real-time calculations',
          'Save and print results',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/heat-index-calculator'),
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
            name: 'Heat Index Calculator',
            item: getUrl('/heat-index-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/heat-index-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the heat index and how is it calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The heat index is a measure of how hot it really feels when relative humidity is factored in with the actual air temperature. It\'s calculated using the Steadman-Rothfusz regression equation: HI = -42.379 + 2.04901523T + 10.14333127RH - 0.22475541T×RH - 6.83783×10⁻³T² - 5.481717×10⁻²RH² + 1.22874×10⁻³T²×RH + 8.5282×10⁻⁴T×RH² - 1.99×10⁻⁶T²×RH², where T is temperature in °F and RH is relative humidity as a percentage. For example, if the air temperature is 90°F with 70% humidity, the heat index is approximately 106°F. The formula is most accurate for temperatures above 80°F (27°C) and humidity above 40%.',
            },
          },
          {
            '@type': 'Question',
            name: 'At what heat index is it dangerous to be outside?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Heat index danger levels: Caution (80-90°F) - fatigue possible with prolonged exposure; Extreme Caution (90-103°F) - heat cramps and exhaustion possible; Danger (103-125°F) - heat cramps and exhaustion likely, heat stroke possible; Extreme Danger (above 125°F) - heat stroke highly likely. At Danger level and above, minimize outdoor activity and stay in air-conditioned spaces. Young children, elderly, obese individuals, and those with chronic health conditions face higher risk. Signs of heat exhaustion include heavy sweating, weakness, cold/pale/clammy skin, nausea, and fainting. Heat stroke symptoms include hot/dry skin, rapid pulse, confusion, and loss of consciousness - seek immediate medical attention.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why does humidity make heat feel worse?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Humidity makes heat feel worse because it inhibits the body\'s natural cooling mechanism - evaporation of sweat. Your body cools itself by producing sweat that evaporates from your skin, removing heat in the process. When humidity is high, the air is already saturated with moisture, making it harder for sweat to evaporate. This reduces cooling efficiency and causes your body to feel hotter than the actual air temperature. At 90°F with 90% humidity, sweat barely evaporates, making it feel like 122°F. At the same temperature with 40% humidity, better evaporation makes it feel like 91°F. This is why dry heat is often more tolerable than humid heat at the same temperature.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much water should I drink in high heat index conditions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hydration needs increase significantly with higher heat index: Caution level (80-90°F HI) - 8-10 glasses daily; Extreme Caution (90-103°F) - 10-12 glasses; Danger (103-125°F) - 12-16 glasses; Extreme Danger (above 125°F) - 16-20+ glasses. During physical activity, drink 7-10 ounces every 10-20 minutes. Start hydrating before you feel thirsty - thirst indicates you\'re already dehydrated. Choose water or sports drinks with electrolytes for prolonged activity. Avoid alcohol and caffeine as they promote dehydration. Signs of dehydration: dark urine, dizziness, dry mouth, fatigue, and decreased urination. Severe dehydration requires immediate medical attention.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between heat index and dew point?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Heat index and dew point are related but different measures. Heat index combines temperature and relative humidity to show how hot it feels to humans, focusing on heat stress and comfort. Dew point is the temperature at which air becomes saturated and water vapor condenses. Dew point is an absolute measure of moisture in the air, while relative humidity is relative to temperature. For comfort: dew point below 50°F feels dry; 50-60°F comfortable; 60-65°F sticky; 65-70°F uncomfortable; above 70°F oppressive. Heat index can be calculated from either relative humidity or dew point temperature. Dew point is often preferred by meteorologists because it doesn\'t change with temperature fluctuations throughout the day, providing a more stable measure of atmospheric moisture.',
            },
          },
          {
            '@type': 'Question',
            name: 'Who is most at risk during high heat index conditions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'High-risk groups for heat-related illness: Infants and young children (less efficient cooling systems); Elderly (65+) with reduced ability to sense/respond to temperature; People with chronic medical conditions (heart disease, obesity, mental illness); Those taking medications affecting temperature regulation (diuretics, antihistamines, beta-blockers); Athletes and outdoor workers; Homeless and socioeconomically disadvantaged without AC access; Pets (cannot sweat, rely on panting). These groups should limit outdoor exposure during high heat index, stay in air-conditioned environments, increase hydration, wear light clothing, and be monitored for heat illness symptoms. Never leave children or pets in vehicles - interior temperatures can reach 120°F+ in minutes.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/heat-index-calculator'),
        name: 'How to Calculate and Respond to Heat Index',
        description: 'Step-by-step guide for calculating heat index and taking appropriate safety measures.',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Heat Index Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Calculation Method',
            text: 'Select between two calculation methods: "Use Relative Humidity" if you know the percentage humidity (most common from weather forecasts), or "Use Dew Point Temperature" if you know the dew point (preferred by meteorologists for accuracy). Both methods provide equivalent results.',
            url: getStepUrl('/heat-index-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Air Temperature',
            text: 'Input the current or forecast air temperature in either Celsius or Fahrenheit. This should be the actual air temperature measured in the shade, not in direct sunlight. Weather apps and forecasts typically provide shade temperature. The heat index is most relevant for temperatures above 80°F (27°C).',
            url: getStepUrl('/heat-index-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Humidity or Dew Point',
            text: 'For the relative humidity method, enter the percentage humidity (0-100%). For the dew point method, enter the dew point temperature in your preferred unit. Higher humidity or dew point values result in higher heat index values. Humidity above 40% significantly increases the heat index.',
            url: getStepUrl('/heat-index-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate Heat Index',
            text: 'Click the Calculate button to determine the heat index temperature. The calculator uses the NWS (National Weather Service) Steadman-Rothfusz equation with adjustments for extreme humidity conditions. Results show the heat index in both Celsius and Fahrenheit, regardless of input units.',
            url: getStepUrl('/heat-index-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Review Health Risk Assessment',
            text: 'Check the risk level classification: Caution (80-90°F), Extreme Caution (90-103°F), Danger (103-125°F), or Extreme Danger (above 125°F). Review possible symptoms for your heat index level (fatigue, heat cramps, heat exhaustion, heat stroke) and note the recommended daily water intake.',
            url: getStepUrl('/heat-index-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Follow Safety Recommendations',
            text: 'Implement the safety advice provided for your heat index level. This includes: limiting outdoor activity during peak heat (10am-4pm), staying in air-conditioned spaces, increasing hydration, wearing light-colored loose clothing, taking frequent breaks, and monitoring for heat illness symptoms. Seek immediate medical attention for heat stroke symptoms: confusion, hot dry skin, rapid pulse, or loss of consciousness.',
            url: getStepUrl('/heat-index-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/heat-index-calculator'),
        headline: 'Heat Index Calculator: Calculate Feels-Like Temperature and Heat Stress Risk',
        description: 'Comprehensive guide to calculating heat index, understanding heat-related health risks, and staying safe in hot weather conditions.',
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
        dateModified: new Date().toISOString().split('T')[0],
        image: getOgImage('heat-index'),
        articleBody: 'Comprehensive guide covering heat index calculation, heat-related illness prevention, hydration guidelines, and safety measures for hot weather conditions.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Heat Index Calculator - Calculate Feels-Like Temperature and Heat Stress Risk</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Heat Index Calculator"
        calculatorUrl="/heat-index-calculator"
      />

      {/* Calculator Component */}
      <HeatIndexCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Heat Index and Hot Weather Safety</h2>
          
          <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              <strong>Heat index</strong> is a measure of how hot it really feels when relative humidity is factored in with the actual air temperature. 
              It helps assess the risk of heat-related illnesses like heat exhaustion and heat stroke by accounting for the body's reduced 
              ability to cool itself through sweat evaporation in humid conditions.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What is the Heat Index?</h3>
          <p className="text-gray-700 mb-4">
            The heat index, also known as the apparent temperature, combines air temperature and relative humidity to determine how hot 
            the weather actually feels to the human body. When humidity is high, sweat doesn't evaporate as quickly from the skin, 
            reducing the body's ability to cool itself. This makes the air feel hotter than the actual temperature reading.
          </p>

          <p className="text-gray-700 mb-6">
            The concept was developed by Robert G. Steadman in 1979 and refined by the National Weather Service using the Rothfusz regression 
            equation. The heat index is particularly important for public health and safety, helping people understand when outdoor activities 
            may be dangerous and when to take extra precautions to prevent heat-related illness.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Heat Index Formula</h3>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <p className="text-xs font-mono mb-2">HI = -42.379 + 2.04901523T + 10.14333127RH - 0.22475541T×RH</p>
            <p className="text-xs font-mono mb-2">     - 6.83783×10⁻³T² - 5.481717×10⁻²RH²</p>
            <p className="text-xs font-mono mb-2">     + 1.22874×10⁻³T²×RH + 8.5282×10⁻⁴T×RH² - 1.99×10⁻⁶T²×RH²</p>
            <p className="text-xs text-gray-600 mt-2">
              Where: T = Air Temperature (°F), RH = Relative Humidity (%)
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6 rounded-r-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Example Calculation:</h5>
            <p className="text-gray-700 mb-2">
              <strong>Conditions:</strong> Air temperature = 95°F, Relative humidity = 60%<br />
              <strong>Result:</strong> Heat Index = 114°F<br />
              <strong>Risk:</strong> Danger - Heat exhaustion and heat stroke likely<br />
              <strong>Action:</strong> Minimize outdoor activity, stay hydrated, seek air-conditioned spaces
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">When Heat Index Applies</h3>
          <p className="text-gray-700 mb-4">
            The heat index calculation is most accurate and relevant under specific conditions:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Condition</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Temperature</td>
                  <td className="px-6 py-4 text-sm text-gray-700">≥ 80°F (27°C)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Below this, heat stress is minimal</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Humidity</td>
                  <td className="px-6 py-4 text-sm text-gray-700">≥ 40%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Lower humidity allows efficient cooling</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Shade</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Measured in shade</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Direct sun adds 15°F to heat index</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Wind</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Light winds assumed</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Strong winds can reduce heat index</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Heat Index Risk Levels</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Caution (80-90°F / 27-32°C)</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Risk:</strong> Fatigue possible with prolonged exposure</p>
              <p className="text-sm text-gray-700">
                Extended outdoor activity can lead to fatigue. Stay hydrated and take breaks. Generally safe for most people 
                but monitor those at higher risk.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Extreme Caution (90-103°F / 32-39°C)</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Risk:</strong> Heat cramps and exhaustion possible</p>
              <p className="text-sm text-gray-700">
                Heat cramps and heat exhaustion are possible with prolonged exposure and physical activity. Limit strenuous 
                activity, especially during midday hours.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h4 className="font-semibold text-red-900 mb-2">Danger (103-125°F / 39-52°C)</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Risk:</strong> Heat exhaustion and stroke likely</p>
              <p className="text-sm text-gray-700">
                Heat cramps and heat exhaustion are likely; heat stroke is possible with continued activity. Minimize outdoor 
                activity. If you must be outside, take frequent breaks in shade or AC.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Extreme Danger (Above 125°F / 52°C)</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Risk:</strong> Heat stroke imminent</p>
              <p className="text-sm text-gray-700">
                Heat stroke is highly likely with continued exposure. This is a life-threatening situation. Stay indoors in 
                air conditioning. Avoid all outdoor activity.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding Heat-Related Illness</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Heat Cramps</h4>
          <p className="text-gray-700 mb-4">
            Heat cramps are painful muscle spasms, usually in the legs, arms, or abdomen, caused by loss of salt and water through sweating. 
            They often occur during or after intense exercise in hot weather.
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
            <li><strong>Symptoms:</strong> Painful muscle cramps and spasms, heavy sweating during intense exercise</li>
            <li><strong>Treatment:</strong> Stop activity, move to cool place, drink water or sports drink, gentle stretching</li>
            <li><strong>When to seek help:</strong> Cramps last longer than 1 hour, you have heart problems, or you're on a low-sodium diet</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Heat Exhaustion</h4>
          <p className="text-gray-700 mb-4">
            Heat exhaustion is a more serious condition that occurs when your body can't cool itself effectively. It can develop after 
            several days of exposure to high temperatures and inadequate or unbalanced fluid replacement.
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
            <li><strong>Symptoms:</strong> Heavy sweating, weakness, cold/pale/clammy skin, fast/weak pulse, nausea, vomiting, fainting</li>
            <li><strong>Treatment:</strong> Move to AC or shade, lie down, loosen clothing, cool with wet cloths, sip water slowly</li>
            <li><strong>When to seek help:</strong> Symptoms worsen or last longer than 1 hour, vomiting, or high-risk individual</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Heat Stroke</h4>
          <p className="text-gray-700 mb-4">
            Heat stroke is the most serious heat-related illness. It occurs when the body becomes unable to control its temperature, 
            which can rise to 106°F or higher within 10-15 minutes. Heat stroke is a medical emergency that can cause death or 
            permanent disability if not treated immediately.
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
            <li><strong>Symptoms:</strong> High body temperature (103°F+), hot/red/dry or damp skin, rapid/strong pulse, headache, dizziness, nausea, confusion, loss of consciousness</li>
            <li><strong>Treatment:</strong> Call 911 immediately. Move to shade/AC. Cool person rapidly with cool cloths or bath. Do NOT give fluids.</li>
            <li><strong>Critical:</strong> Heat stroke is LIFE-THREATENING. Every minute counts. Call emergency services immediately.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Hydration Guidelines</h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Daily Water Intake by Heat Index:</h4>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="font-medium">Caution (80-90°F):</span>
                <span className="text-blue-700 font-semibold">8-10 glasses (64-80 oz)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="font-medium">Extreme Caution (90-103°F):</span>
                <span className="text-orange-700 font-semibold">10-12 glasses (80-96 oz)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="font-medium">Danger (103-125°F):</span>
                <span className="text-red-700 font-semibold">12-16 glasses (96-128 oz)</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">Extreme Danger (125°F+):</span>
                <span className="text-purple-700 font-semibold">16-20+ glasses (128-160+ oz)</span>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Hydration Best Practices</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Drink before you're thirsty:</strong> Thirst means you're already dehydrated</li>
            <li><strong>Monitor urine color:</strong> Light yellow is good; dark yellow means drink more</li>
            <li><strong>During exercise:</strong> Drink 7-10 oz every 10-20 minutes</li>
            <li><strong>Electrolytes matter:</strong> For prolonged activity (>1 hour), use sports drinks with sodium and potassium</li>
            <li><strong>Avoid dehydrating beverages:</strong> Limit alcohol, coffee, and caffeinated sodas</li>
            <li><strong>Eat water-rich foods:</strong> Watermelon, cucumbers, oranges help hydration</li>
            <li><strong>Pre-hydrate:</strong> Drink 17-20 oz 2-3 hours before outdoor activity</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Hot Weather Safety Guidelines</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Clothing and Sun Protection</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Wear light-colored, loose-fitting clothing:</strong> Reflects sunlight and allows air circulation</li>
            <li><strong>Choose breathable fabrics:</strong> Cotton, linen, or moisture-wicking athletic wear</li>
            <li><strong>Wear a wide-brimmed hat:</strong> Protects face, ears, and neck from sun</li>
            <li><strong>Apply sunscreen (SPF 30+):</strong> Sunburn impairs your body's ability to cool itself</li>
            <li><strong>Wear sunglasses:</strong> Protects eyes from UV damage</li>
            <li><strong>Cover up:</strong> Long sleeves and pants offer more protection than sunscreen alone</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Activity Planning</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Avoid peak heat hours (10am-4pm):</strong> Schedule outdoor activities for early morning or evening</li>
            <li><strong>Gradually acclimate:</strong> Build up tolerance over 1-2 weeks when adjusting to hot weather</li>
            <li><strong>Take frequent breaks:</strong> Rest in shade or air-conditioned spaces every 30 minutes</li>
            <li><strong>Reduce exercise intensity:</strong> Lower your workout intensity and duration in heat</li>
            <li><strong>Never leave anyone in vehicles:</strong> Cars can reach 120°F+ in minutes, even with windows cracked</li>
            <li><strong>Check weather forecasts:</strong> Plan activities around heat advisories and warnings</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Indoor Cooling Strategies</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Use air conditioning:</strong> Most effective way to cool down; visit public cooling centers if needed</li>
            <li><strong>Close curtains and blinds:</strong> Block sunlight during hottest hours</li>
            <li><strong>Use fans effectively:</strong> Create cross-ventilation; point fan out window at night to exhaust hot air</li>
            <li><strong>Cool showers or baths:</strong> Lower body temperature quickly</li>
            <li><strong>Apply cool, wet cloths:</strong> To neck, wrists, ankles, and forehead</li>
            <li><strong>Stay on lowest floor:</strong> Hot air rises; basements and lower floors are cooler</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">High-Risk Populations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Infants and Young Children</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Bodies heat up 3-5 times faster than adults</li>
                <li>• May not communicate thirst or discomfort</li>
                <li>• Never leave in vehicles, even briefly</li>
                <li>• Dress in light, loose clothing</li>
                <li>• Keep in shade and well-hydrated</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Elderly (65+)</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Reduced ability to sense and respond to heat</li>
                <li>• May take medications affecting temperature regulation</li>
                <li>• Higher risk of chronic conditions</li>
                <li>• Check on elderly neighbors daily during heat waves</li>
                <li>• Ensure access to air conditioning</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">People with Chronic Conditions</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Heart disease, lung disease, kidney disease</li>
                <li>• Obesity (body retains more heat)</li>
                <li>• Mental illness (may not recognize danger)</li>
                <li>• Medications: diuretics, beta-blockers, antihistamines</li>
                <li>• Consult doctor about heat precautions</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Outdoor Workers and Athletes</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Prolonged exposure to extreme heat</li>
                <li>• Physical exertion increases heat production</li>
                <li>• May feel pressure to continue despite symptoms</li>
                <li>• Employers must provide breaks, shade, water</li>
                <li>• Use buddy system to watch for heat illness</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Emergency Warning Signs - Call 911:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="font-medium text-gray-900 mb-2">Heat Stroke Symptoms:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Body temperature 103°F or higher</li>
                  <li>• Hot, red, dry, or damp skin</li>
                  <li>• Rapid, strong pulse</li>
                  <li>• Headache, dizziness, confusion</li>
                  <li>• Nausea, unconsciousness</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-2">Immediate Actions:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Call 911 immediately</li>
                  <li>• Move person to cooler location</li>
                  <li>• Cool person rapidly with cool cloths/bath</li>
                  <li>• Do NOT give fluids</li>
                  <li>• Monitor until help arrives</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Myths and Facts</h3>
          
          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">❌ Myth: You can get used to any heat</h5>
              <p className="text-sm text-gray-700">
                <strong>✓ Fact:</strong> While acclimation improves heat tolerance over 1-2 weeks, extreme heat index values (125°F+) 
                remain dangerous regardless of acclimation. Your body has limits.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">❌ Myth: Drinking ice-cold water cools you faster</h5>
              <p className="text-sm text-gray-700">
                <strong>✓ Fact:</strong> Cool (not ice-cold) water is actually better. Ice-cold water can cause stomach cramps and may 
                slow absorption. Room temperature or cool water is optimal for hydration.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">❌ Myth: Beer or alcohol helps you stay hydrated</h5>
              <p className="text-sm text-gray-700">
                <strong>✓ Fact:</strong> Alcohol is a diuretic that promotes dehydration. Drinking alcohol in hot weather significantly 
                increases risk of heat-related illness. Stick to water and electrolyte drinks.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">❌ Myth: Only outdoor workers need to worry about heat</h5>
              <p className="text-sm text-gray-700">
                <strong>✓ Fact:</strong> Indoor heat can be just as dangerous, especially without air conditioning. Many heat-related 
                deaths occur indoors. Elderly in homes without AC are particularly vulnerable.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Resources and Further Information</h3>
          <p className="text-gray-700 mb-4">
            For official heat safety information and weather forecasts:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <a 
                href="https://www.weather.gov/safety/heat-index" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                National Weather Service - Heat Index Safety
              </a>
              {' '}- Official NWS heat index information and safety guidelines
            </li>
            <li>
              <a 
                href="https://www.cdc.gov/disasters/extremeheat/index.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                CDC - Extreme Heat Prevention
              </a>
              {' '}- Health guidelines for heat-related illness prevention
            </li>
            <li>
              <a 
                href="https://www.osha.gov/heat-exposure" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                OSHA - Heat Exposure Guidelines
              </a>
              {' '}- Workplace heat safety standards and recommendations
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/wind-chill-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🌬️</div>
            <h3 className="font-semibold text-gray-900">Wind Chill Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate how cold it feels with wind</p>
          </a>
          
          <a 
            href="/dew-point-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💧</div>
            <h3 className="font-semibold text-gray-900">Dew Point Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate dew point and humidity comfort</p>
          </a>
          
          <a 
            href="/temperature-converter" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🌡️</div>
            <h3 className="font-semibold text-gray-900">Temperature Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert between Celsius, Fahrenheit, Kelvin</p>
          </a>
          
          <a 
            href="/btu-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">❄️</div>
            <h3 className="font-semibold text-gray-900">BTU Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate cooling and heating needs</p>
          </a>
        </div>
      </section>
    </div>
  );
}

