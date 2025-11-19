import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import WindChillCalculator from '@/components/Calculator/WindChillCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Wind Chill Calculator - Calculate Feels-Like Temperature | AICalculator',
  description: 'Free wind chill calculator to estimate how cold it feels based on wind speed and air temperature. Calculate frostbite risk, safety recommendations, and outdoor exposure times.',
  keywords: [
    'wind chill calculator',
    'wind chill temperature',
    'feels like temperature',
    'wind chill index',
    'wind chill chart',
    'frostbite calculator',
    'cold weather calculator',
    'windchill factor',
    'apparent temperature',
    'wind temperature calculator',
    'wind chill formula',
    'wind chill conversion',
    'cold exposure calculator',
    'wind chill risk',
    'frostbite time calculator',
    'wind chill index calculator',
    'cold weather safety',
    'winter temperature calculator',
    'wind chill chart calculator',
    'NWS wind chill',
    'wind chill table',
    'wind chill degrees',
    'wind chill temperature calculator',
    'how cold does it feel',
    'wind chill weather',
    'windchill index calculation',
    'wind chill mph',
    'wind chill km/h',
    'frostbite risk assessment',
    'cold weather exposure',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Wind Chill Calculator - Calculate Feels-Like Temperature',
    description: 'Calculate wind chill temperature and frostbite risk based on wind speed and air temperature. Get safety recommendations for cold weather exposure.',
    type: 'website',
    url: getUrl('/wind-chill-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('wind-chill'),
      width: 1200,
      height: 630,
      alt: 'Wind Chill Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wind Chill Calculator - Frostbite Risk & Safety',
    description: 'Calculate how cold it feels with wind chill calculator. Assess frostbite risk and get cold weather safety recommendations.',
    images: [getOgImage('wind-chill')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/wind-chill-calculator'),
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

export default function WindChillCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/wind-chill-calculator'),
        name: 'Wind Chill Calculator',
        url: getUrl('/wind-chill-calculator'),
        description: 'Calculate wind chill temperature and assess frostbite risk based on wind speed and air temperature. Get safety recommendations for cold weather conditions.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate wind chill temperature',
          'Assess frostbite risk levels',
          'Multiple wind speed units (km/h, mph, m/s, knots)',
          'Temperature in Celsius or Fahrenheit',
          'Safety recommendations',
          'Frostbite exposure time estimation',
          'Risk level classification',
          'Real-time calculations',
          'Save and print results',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/wind-chill-calculator'),
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
            name: 'Wind Chill Calculator',
            item: getUrl('/wind-chill-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/wind-chill-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is wind chill and how is it calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wind chill is the perceived decrease in air temperature felt by the body on exposed skin due to the flow of air. It\'s calculated using the formula: WC = 35.74 + 0.6215T - 35.75(V^0.16) + 0.4275T(V^0.16), where T is air temperature in °F and V is wind speed in mph. This formula, established by the National Weather Service in 2001, accounts for heat loss from exposed skin caused by wind and cold. For example, if the air temperature is 0°F with 15 mph winds, the wind chill is -19°F. Wind chill is only defined for temperatures at or below 50°F and wind speeds above 3 mph, as below these thresholds the cooling effect is negligible.',
            },
          },
          {
            '@type': 'Question',
            name: 'How quickly can frostbite occur in cold weather?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Frostbite occurrence time depends on wind chill temperature. At wind chills above 32°F, frostbite risk is low. Between 15°F and 32°F (moderate risk), frostbite can occur in 30+ minutes on exposed skin. At 0°F to 15°F (high risk), frostbite can develop in 10-30 minutes. At -20°F to 0°F (very high risk), frostbite can occur in just 5-10 minutes. Below -20°F (extreme danger), frostbite can happen in less than 5 minutes. Wind speeds above 40 mph have little additional chilling effect. Vulnerable areas include nose, ears, cheeks, chin, fingers, and toes. Children, elderly, and those with circulation problems are at higher risk.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why is wind chill only calculated below 50°F?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wind chill calculations apply only when air temperature is at or below 50°F (10°C) and wind speed exceeds 3 mph because above these thresholds, the cooling effect of wind on exposed skin is minimal or non-existent. At warmer temperatures, the body maintains comfortable heat balance despite wind. The wind chill formula was specifically developed to quantify dangerous cold exposure, not general comfort. Above 50°F, other indices like heat index (combining temperature and humidity) are more relevant. Wind speeds below 3 mph don\'t generate sufficient convective cooling to significantly lower perceived temperature. These thresholds ensure wind chill values are meaningful for assessing cold weather health risks.',
            },
          },
          {
            '@type': 'Question',
            name: 'What should I wear when wind chill is below freezing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For wind chills below 32°F, dress in multiple layers: start with moisture-wicking base layer, add insulating middle layer (fleece or down), and finish with windproof/waterproof outer shell. Cover all exposed skin - wear insulated gloves or mittens (mittens are warmer), warm hat covering ears, scarf or face mask, and insulated waterproof boots. At wind chills below 0°F, add face protection (balaclava or ski mask), goggles to protect eyes, hand and toe warmers, and consider limiting outdoor exposure. Avoid cotton which retains moisture; choose wool or synthetics. For extreme conditions below -20°F, double-layer gloves, heavy-duty winter gear, and minimize time outdoors. Check for numbness or white patches indicating frostbite.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does wind chill affect my car or home heating?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wind chill does not affect inanimate objects like cars, buildings, or water pipes. These objects cool only to the actual air temperature, not the wind chill temperature. However, wind does accelerate the rate of cooling, so objects reach the air temperature faster in windy conditions. For example, if the air temperature is 10°F with wind chill of -10°F, your car engine will cool to 10°F (not -10°F), but it will reach that temperature more quickly than on a calm day. Your home heating system responds to actual air temperature, not wind chill. That said, increased wind infiltration through gaps can increase heating costs. Protect outdoor pipes from actual freezing temperatures, not wind chill values. Wind chill is specifically a human and animal physiology measure.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the signs and symptoms of frostbite?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Early frostbite (frostnip) symptoms include: numbness, tingling or stinging sensation, pale or white skin patches, hard or waxy-feeling skin, and clumsiness due to joint/muscle stiffness. Advanced frostbite signs: skin that feels unusually firm or hard, complete loss of sensation, blisters after rewarming, and skin that turns black (indicating tissue death). Affected areas are typically extremities: fingers, toes, nose, ears, cheeks, and chin. If you suspect frostbite: get to a warm place immediately, don\'t rub the area (can cause tissue damage), remove wet clothing, immerse affected area in warm (not hot) water 98-105°F, and seek medical attention for anything beyond minor frostnip. Never rewarm if refreezing is possible - this causes severe damage.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/wind-chill-calculator'),
        name: 'How to Calculate Wind Chill Temperature',
        description: 'Step-by-step guide for calculating wind chill and assessing cold weather safety.',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Wind Chill Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Check Current Weather Conditions',
            text: 'Obtain the current air temperature and wind speed from a reliable weather source such as the National Weather Service, local weather stations, or weather apps. Ensure you have the actual air temperature (not feels-like) and sustained wind speed (not gusts). Wind chill calculations require temperatures at or below 50°F (10°C) and wind speeds above 3 mph (4.8 km/h).',
            url: getStepUrl('/wind-chill-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Wind Speed',
            text: 'Input the wind speed in your preferred unit: kilometers per hour (km/h), miles per hour (mph), meters per second (m/s), or knots. The calculator will automatically convert to the standard unit used in the wind chill formula. Use sustained wind speed rather than peak gusts for accurate results.',
            url: getStepUrl('/wind-chill-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Air Temperature',
            text: 'Input the actual air temperature in either Celsius or Fahrenheit. This should be the ambient temperature measured in the shade, not temperature affected by sun exposure or other heat sources. The calculator accepts temperatures between -50°F and 50°F (-45°C to 10°C).',
            url: getStepUrl('/wind-chill-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate Wind Chill',
            text: 'Click the Calculate button to determine the wind chill temperature. The calculator uses the North American wind chill formula (NWS 2001): WC = 35.74 + 0.6215T - 35.75(V^0.16) + 0.4275T(V^0.16), where T is temperature in °F and V is wind speed in mph. Results show both Celsius and Fahrenheit values.',
            url: getStepUrl('/wind-chill-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Review Risk Assessment',
            text: 'Check the risk level classification: Low Risk (above 32°F), Moderate Risk (15-32°F), High Risk (0-15°F), Very High Risk (-20 to 0°F), or Extreme Danger (below -20°F). Note the estimated frostbite exposure time and review specific safety recommendations provided for the calculated wind chill level.',
            url: getStepUrl('/wind-chill-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Take Appropriate Safety Measures',
            text: 'Follow the safety advice provided based on your wind chill result. This includes appropriate clothing recommendations, outdoor exposure time limits, and frostbite prevention measures. For high-risk conditions, consider postponing outdoor activities. Always monitor for signs of frostbite: numbness, white or grayish skin, or unusually firm skin.',
            url: getStepUrl('/wind-chill-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/wind-chill-calculator'),
        headline: 'Wind Chill Calculator: Calculate Feels-Like Temperature and Frostbite Risk',
        description: 'Comprehensive guide to calculating wind chill temperature, understanding frostbite risk, and staying safe in cold weather conditions.',
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
        image: getOgImage('wind-chill'),
        articleBody: 'Comprehensive guide covering wind chill calculation, frostbite risk assessment, cold weather safety, and protective measures for winter conditions.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Wind Chill Calculator - Calculate Feels-Like Temperature and Frostbite Risk</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Wind Chill Calculator"
        calculatorUrl="/wind-chill-calculator"
      />

      {/* Calculator Component */}
      <WindChillCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Wind Chill and Cold Weather Safety</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              <strong>Wind chill</strong> is the perceived decrease in air temperature felt by exposed skin due to the flow of air. 
              It quantifies how cold it actually feels when factoring in wind speed, helping you assess the risk of frostbite 
              and hypothermia in cold weather conditions.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What is Wind Chill?</h3>
          <p className="text-gray-700 mb-4">
            Wind chill describes how much colder air feels on human skin when factoring in the effects of wind. When wind blows 
            across exposed skin, it removes the thin layer of warm air that normally surrounds your body, accelerating heat loss. 
            The stronger the wind, the faster your body loses heat, making it feel colder than the actual air temperature.
          </p>

          <p className="text-gray-700 mb-6">
            The wind chill index was developed to help people understand the combined effect of cold and wind on the human body. 
            It's particularly important for outdoor activities, winter sports, and occupational safety in cold environments. The 
            current wind chill formula used in North America was implemented by the National Weather Service in 2001.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Wind Chill Formula</h3>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-sm font-mono text-center mb-2">WC = 35.74 + 0.6215T - 35.75(V^0.16) + 0.4275T(V^0.16)</p>
            <p className="text-xs text-gray-600 text-center">
              Where: T = Air Temperature (°F), V = Wind Speed (mph)
            </p>
          </div>

          <p className="text-gray-700 mb-4">
            This formula calculates the wind chill temperature based on:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Air Temperature:</strong> The actual ambient temperature measured in the shade</li>
            <li><strong>Wind Speed:</strong> The sustained wind speed at 5 feet above the ground (face height)</li>
            <li><strong>Heat Transfer:</strong> How quickly heat is lost from exposed skin</li>
          </ul>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6 rounded-r-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Example Calculation:</h5>
            <p className="text-gray-700 mb-2">
              <strong>Conditions:</strong> Air temperature = 0°F, Wind speed = 15 mph<br />
              <strong>Calculation:</strong> WC = 35.74 + 0.6215(0) - 35.75(15^0.16) + 0.4275(0)(15^0.16)<br />
              <strong>Result:</strong> Wind Chill = -19°F<br />
              <strong>Risk:</strong> High risk - frostbite possible in 10-30 minutes
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">When Wind Chill Applies</h3>
          <p className="text-gray-700 mb-4">
            Wind chill calculations are only valid under specific conditions:
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
                  <td className="px-6 py-4 text-sm text-gray-700">≤ 50°F (10°C)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Above this, cooling effect is minimal</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Wind Speed</td>
                  <td className="px-6 py-4 text-sm text-gray-700">≥ 3 mph (4.8 km/h)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Below this, insufficient cooling effect</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Maximum Wind</td>
                  <td className="px-6 py-4 text-sm text-gray-700">~40 mph effective</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Higher speeds add little additional cooling</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Exposure</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Bare skin required</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Applies only to exposed areas</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Frostbite Risk Levels</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
              <h4 className="font-semibold text-green-900 mb-2">Low Risk (32°F to 50°F)</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Frostbite Time:</strong> Low risk</p>
              <p className="text-sm text-gray-700">
                Uncomfortable cold but minimal frostbite risk. Dress warmly for comfort. No special precautions needed for healthy adults.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Moderate Risk (15°F to 32°F)</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Frostbite Time:</strong> 30+ minutes</p>
              <p className="text-sm text-gray-700">
                Frostbite possible on exposed skin after 30+ minutes. Wear hat, gloves, and warm layers. Limit exposure for children and elderly.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
              <h4 className="font-semibold text-orange-900 mb-2">High Risk (0°F to 15°F)</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Frostbite Time:</strong> 10-30 minutes</p>
              <p className="text-sm text-gray-700">
                Frostbite can occur in 10-30 minutes. Cover all exposed skin. Dress in multiple layers with windproof outer shell. Limit outdoor time.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
              <h4 className="font-semibold text-red-900 mb-2">Very High Risk (-20°F to 0°F)</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Frostbite Time:</strong> 5-10 minutes</p>
              <p className="text-sm text-gray-700">
                Frostbite can occur in 5-10 minutes. Minimize outdoor exposure. Full face and body coverage essential. Frequently check for frostbite signs.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg md:col-span-2">
              <h4 className="font-semibold text-purple-900 mb-2">Extreme Danger (Below -20°F)</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Frostbite Time:</strong> Less than 5 minutes</p>
              <p className="text-sm text-gray-700">
                Life-threatening conditions. Frostbite in less than 5 minutes. Avoid going outdoors. If necessary, full coverage of all exposed areas. 
                Hypothermia risk is high. Seek indoor shelter immediately if experiencing numbness or confusion.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding Frostbite</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">What is Frostbite?</h4>
          <p className="text-gray-700 mb-4">
            Frostbite is a cold-induced injury where body tissue freezes. It most commonly affects extremities: fingers, toes, nose, 
            ears, cheeks, and chin. As tissue freezes, ice crystals form in cells, damaging them and reducing blood flow to the area.
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Stages of Frostbite</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Frostnip (superficial):</strong> Skin becomes pale or red, feels numb or tingles. Reversible with rewarming.</li>
            <li><strong>Superficial frostbite:</strong> Skin feels hard and waxy, may develop clear blisters. Affects skin and tissue beneath.</li>
            <li><strong>Deep frostbite:</strong> Affects all layers of skin plus deeper tissues. Skin turns white/blue-gray, complete numbness. Blood-filled blisters may form. Requires immediate medical attention.</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Frostbite First Aid</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Move to a warm location immediately</li>
            <li>Remove wet clothing and jewelry</li>
            <li>Do NOT rub or massage the frostbitten area (causes tissue damage)</li>
            <li>Immerse affected area in warm (NOT hot) water: 98-105°F (37-40°C)</li>
            <li>Continue warming for 15-30 minutes until area becomes soft and sensation returns</li>
            <li>Never rewarm if there's risk of refreezing (causes severe damage)</li>
            <li>Seek medical attention for anything beyond minor frostnip</li>
            <li>Do NOT use direct heat (heating pad, fire, radiator)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Cold Weather Safety Guidelines</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Clothing Recommendations</h4>
          <p className="text-gray-700 mb-4">
            Proper clothing is your primary defense against cold weather:
          </p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h5 className="font-semibold text-gray-900 mb-3">Three-Layer System:</h5>
            <div className="space-y-3 text-gray-700">
              <div>
                <strong className="text-gray-900">1. Base Layer (Moisture Wicking):</strong>
                <ul className="list-disc pl-6 mt-1 text-sm">
                  <li>Synthetic fabrics or merino wool</li>
                  <li>Avoid cotton - it retains moisture and loses insulating properties when wet</li>
                  <li>Should fit snugly but not restrict movement</li>
                </ul>
              </div>
              <div>
                <strong className="text-gray-900">2. Middle Layer (Insulation):</strong>
                <ul className="list-disc pl-6 mt-1 text-sm">
                  <li>Fleece, down, or synthetic insulation</li>
                  <li>Traps warm air for insulation</li>
                  <li>Multiple thin layers better than one thick layer</li>
                </ul>
              </div>
              <div>
                <strong className="text-gray-900">3. Outer Layer (Wind/Water Protection):</strong>
                <ul className="list-disc pl-6 mt-1 text-sm">
                  <li>Windproof and water-resistant shell</li>
                  <li>Protects against wind chill and precipitation</li>
                  <li>Should be breathable to allow moisture escape</li>
                </ul>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Protect Extremities</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Head:</strong> Wear insulated hat covering ears (you lose 10% of body heat through your head)</li>
            <li><strong>Hands:</strong> Mittens are warmer than gloves. Consider hand warmers for extreme cold</li>
            <li><strong>Feet:</strong> Insulated waterproof boots with wool socks. Avoid tight footwear that restricts circulation</li>
            <li><strong>Face:</strong> Use balaclava, ski mask, or scarf to protect face and neck in severe conditions</li>
            <li><strong>Eyes:</strong> Goggles or sunglasses to protect from wind and glare off snow</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Activity Planning</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Check wind chill forecast before outdoor activities</li>
            <li>Plan shorter outdoor sessions in extreme cold</li>
            <li>Take frequent breaks in warm indoor spaces</li>
            <li>Stay dry - wet clothing dramatically increases heat loss</li>
            <li>Avoid overexertion and sweating which leads to moisture buildup</li>
            <li>Never go outdoors alone in extreme cold</li>
            <li>Tell someone your plans and expected return time</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Special Populations at Risk</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Children</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Lose heat faster due to higher surface-area-to-volume ratio</li>
                <li>• May not recognize frostbite symptoms</li>
                <li>• Need more frequent breaks and monitoring</li>
                <li>• Ensure proper clothing that covers all skin</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Elderly</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Reduced ability to sense cold and regulate temperature</li>
                <li>• Possible circulation issues increase risk</li>
                <li>• Medications may affect cold tolerance</li>
                <li>• Higher risk of hypothermia</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Medical Conditions</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Diabetes (reduced circulation and sensation)</li>
                <li>• Raynaud's disease (reduced blood flow to extremities)</li>
                <li>• Heart disease (reduced circulation)</li>
                <li>• Peripheral neuropathy (reduced sensation)</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Workers at Risk</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Outdoor construction workers</li>
                <li>• Emergency responders</li>
                <li>• Delivery and transportation workers</li>
                <li>• Agricultural workers</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Warning Signs of Hypothermia:</h4>
            <p className="text-gray-700 mb-2">Hypothermia occurs when body temperature drops below 95°F (35°C). Signs include:</p>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• Shivering (may stop in severe cases)</li>
              <li>• Confusion, drowsiness, or slurred speech</li>
              <li>• Weak pulse and shallow breathing</li>
              <li>• Loss of coordination or fumbling hands</li>
              <li>• Memory loss or irrational behavior</li>
              <li><strong>Seek immediate medical attention if these symptoms occur</strong></li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Myths and Misconceptions</h3>
          
          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">❌ Myth: Wind chill affects car engines and pipes</h5>
              <p className="text-sm text-gray-700">
                <strong>✓ Fact:</strong> Wind chill only affects living organisms. Inanimate objects cool only to the actual air temperature, 
                not the wind chill temperature. However, wind does make objects reach air temperature faster.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">❌ Myth: Rubbing frostbitten skin helps</h5>
              <p className="text-sm text-gray-700">
                <strong>✓ Fact:</strong> Never rub frostbitten skin - this causes further tissue damage. Rewarm gently in lukewarm water.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">❌ Myth: Alcohol warms you up in cold weather</h5>
              <p className="text-sm text-gray-700">
                <strong>✓ Fact:</strong> Alcohol dilates blood vessels, making you feel warmer temporarily but actually increasing heat loss 
                and hypothermia risk. Avoid alcohol before or during cold exposure.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">❌ Myth: You can't get frostbite if it's above 0°F</h5>
              <p className="text-sm text-gray-700">
                <strong>✓ Fact:</strong> Frostbite can occur at wind chills above 0°F if exposure is prolonged enough. At 15°F wind chill, 
                frostbite is possible after 30 minutes.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Resources and Further Information</h3>
          <p className="text-gray-700 mb-4">
            For official weather forecasts and cold weather safety information:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <a 
                href="https://www.weather.gov/safety/cold-wind-chill-chart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                National Weather Service - Wind Chill Chart
              </a>
              {' '}- Official NWS wind chill information and safety guidelines
            </li>
            <li>
              <a 
                href="https://www.cdc.gov/disasters/winter/staysafe/hypothermia.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                CDC - Hypothermia and Frostbite Prevention
              </a>
              {' '}- Health guidelines for cold weather exposure
            </li>
            <li>
              <a 
                href="https://www.osha.gov/cold-stress" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                OSHA - Cold Stress Guide
              </a>
              {' '}- Workplace cold weather safety standards
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/heat-index-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">☀️</div>
            <h3 className="font-semibold text-gray-900">Heat Index Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate how hot it feels with humidity</p>
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
            href="/dew-point-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💧</div>
            <h3 className="font-semibold text-gray-900">Dew Point Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate dew point and comfort level</p>
          </a>
          
          <a 
            href="/unit-converter" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-semibold text-gray-900">Unit Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert between various units</p>
          </a>
        </div>
      </section>
    </div>
  );
}

